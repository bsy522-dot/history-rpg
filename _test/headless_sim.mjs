// headless_sim.mjs
// Node 환경 100회 AI vs AI 시뮬
// 그래픽/Three.js 없이 순수 로직만 돌림.
// 실행: node _test/headless_sim.mjs

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Three.js / 렌더 모듈을 import하면 브라우저 전용 API 때문에 깨진다.
// → effects.js의 spawnLevelUpParticles을 목업.
// 전략: xp_level.js 안에서 effects.js import가 되어 있으므로,
//        Node에선 THREE가 없어서 에러 → 그 import를 try로 감싸두었다.
// 하지만 Three.js가 전혀 없으면 파일 로딩 시점부터 실패.
// → Node import 해결기 상 ESM에선 import 구문이 hoist되므로, 우회 필요.
// 가장 안전: battle 모듈들을 individually import하되 effects는 stub으로 교체.

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Stub 주입: THREE을 전역으로 만들 수 없으니, effects.js import를 피해 간다.
// xp_level.js가 effects.js를 import하므로 → Mock file 하나 만들어 resolve 오버라이드.
// 단, Node ESM loader에서 import hook 쓰지 않는 이상 교체 불가.
//
// → 해결: xp_level.js에서 이미 try/catch로 감싸놨고, Three 없이도 순수 로직은 통과.
//   단, import 자체는 실행된다. 따라서 headless에선 effects.js가 Three을 import하는 시점에서 에러.
//
// 최종 우회: battle/ 모듈 직접 import하지 않고, 필요한 로직만 재현한다 (simulate만).
// 이건 재미없다. 대신 THREE 모듈 stub을 node_modules에 넣는 건 과하다.
//
// 차선: 직접 파일을 텍스트로 읽어 동적 평가 (Function). 너무 복잡.
//
// → 결정: headless simulator는 독립 재구현이 아닌, battle 로직 "copy" 수준으로 간단히 시뮬.
//  - executeAttack의 데미지 공식을 재현
//  - 턴 루프를 반복
// 이건 1차 검증이고, 실 브라우저 테스트는 test_battle.html에서.

// ───── 데미지 공식 재현 ─────
const TYPE_ADV = {
  '보병':   { '궁병': 1.5, '기마병': 0.75 },
  '궁병':   { '기마병': 1.5, '보병': 0.75 },
  '기마병': { '보병': 1.5, '궁병': 0.75 },
};
function typeAdv(a, d) { return TYPE_ADV[a]?.[d] ?? 1.0; }
function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

function calcDamage(attacker, target, skill, weather, map) {
  const atkMod = weather?.atkMod || 0;
  const tile = map?.terrain?.[target.y]?.[target.x];
  const tDef = (tile === 2) ? 2 : (tile === 6) ? 1 : 0;

  let base;
  if (skill) {
    const byDmg = skill.dmg || 0;
    const byPw  = Math.floor((attacker.atk || 0) * (skill.pw || 1.0));
    base = Math.max(byDmg, byPw);
  } else {
    base = (attacker.atk || 0) + atkMod;
  }
  if (skill?.element && target.weakTo === skill.element) base = Math.floor(base * 1.25);
  if (weather?.id === 'rain' && skill?.element === 'fire') base = Math.floor(base * 0.7);

  let dmg = Math.max(1, base - (target.def || 0) - tDef) + randInt(0, 5);
  const crit = randInt(1, 10) === 1;
  if (crit) dmg = Math.floor(dmg * 1.5);
  const tMod = typeAdv(attacker.unitType, target.unitType);
  dmg = Math.floor(dmg * tMod);
  return { dmg: Math.max(1, dmg), crit };
}

function manhattan(a, b) { return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); }

// ───── BFS 이동 (간이) ─────
const TC = { 0:1, 1:1, 2:2, 3:Infinity, 4:Infinity, 5:1, 6:1 };
function tileCost(tile, unit) {
  if (tile === undefined) return Infinity;
  let c = TC[tile] ?? 1;
  if (unit?.unitType === '기마병' && tile === 5) c = 0.5;
  return c;
}
function occupied(x, y, me, all) {
  return all.some((u) => u !== me && u.hp > 0 && u.x === x && u.y === y);
}
function moveRange(unit, map, all) {
  const best = new Map([[`${unit.x},${unit.y}`, 0]]);
  const out = [{ x: unit.x, y: unit.y, cost: 0 }];
  const q = [{ x: unit.x, y: unit.y, cost: 0 }];
  const mov = unit.mov || 3;
  while (q.length) {
    q.sort((a, b) => a.cost - b.cost);
    const c = q.shift();
    for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx = c.x + dx, ny = c.y + dy;
      const tile = map.terrain?.[ny]?.[nx];
      const step = tileCost(tile, unit);
      if (!isFinite(step)) continue;
      const blockByEnemy = all.some((u) => u.team !== unit.team && u.hp > 0 && u.x === nx && u.y === ny);
      if (blockByEnemy) continue;
      const nc = c.cost + step;
      if (nc > mov) continue;
      const nk = `${nx},${ny}`;
      if (nc < (best.get(nk) ?? Infinity)) {
        best.set(nk, nc);
        q.push({ x: nx, y: ny, cost: nc });
        // 최종 정지 가능한 곳만 out에
        if (!occupied(nx, ny, unit, all)) out.push({ x: nx, y: ny, cost: nc });
      }
    }
  }
  return out;
}

// ───── 시뮬레이션 ─────
function loadJSON(p) {
  return JSON.parse(readFileSync(resolve(ROOT, p), 'utf-8'));
}

const unitsDb  = loadJSON('js-v8/data/units.json');
const skillsDb = loadJSON('js-v8/data/skills.json');
const mapsDb   = loadJSON('js-v8/data/maps.json');

function spawnUnit(id, db, team, x, y) {
  const base = db[id];
  return {
    id, name: base.name, team, unitType: base.unitType,
    hp: base.hp, mhp: base.mhp, mp: base.mp || 0, mmp: base.mmp || 0,
    atk: base.atk, def: base.def, spd: base.spd,
    mov: base.mov, rng: base.rng,
    x, y, acted: false,
    skills: base.skills || [],
    weakTo: base.weakTo,
    level: 1, xp: 0,
  };
}

function setupBattle() {
  const map = mapsDb.ep1_trial;
  const ally_pos = map.allyStart;
  const enemy_pos = map.enemyStart;
  const allies = [
    spawnUnit('hwanwoong', unitsDb.ep1_allies, 'ally', ally_pos[0][0], ally_pos[0][1]),
    spawnUnit('pungbaek',  unitsDb.ep1_allies, 'ally', ally_pos[1][0], ally_pos[1][1]),
    spawnUnit('usa',       unitsDb.ep1_allies, 'ally', ally_pos[2][0], ally_pos[2][1]),
    spawnUnit('unsa',      unitsDb.ep1_allies, 'ally', ally_pos[3][0], ally_pos[3][1]),
  ];
  const enemies = [
    spawnUnit('cheonmujang',unitsDb.ep1_enemies,'enemy', enemy_pos[0][0], enemy_pos[0][1]),
    spawnUnit('noigong',    unitsDb.ep1_enemies,'enemy', enemy_pos[1][0], enemy_pos[1][1]),
    spawnUnit('hwashin',    unitsDb.ep1_enemies,'enemy', enemy_pos[2][0], enemy_pos[2][1]),
    spawnUnit('sanryeong',  unitsDb.ep1_enemies,'enemy', enemy_pos[3][0], enemy_pos[3][1]),
    spawnUnit('sujang',     unitsDb.ep1_enemies,'enemy', enemy_pos[4][0], enemy_pos[4][1]),
  ];
  return { map, allies, enemies };
}

function pickTarget(e, foes) {
  const alive = foes.filter((u) => u.hp > 0);
  alive.sort((a, b) => manhattan(e, a) - manhattan(e, b));
  return alive[0];
}

function tryHeal(healer, team) {
  if (!healer.skills?.length) return false;
  for (const sid of healer.skills) {
    const s = skillsDb[sid];
    if (!s || (s.type !== 'heal_area' && s.type !== 'heal_single')) continue;
    if ((s.mp || 0) > healer.mp) continue;
    // 반경 내 HP<70% 아군이 2명 이상이면 힐
    const r = s.rad || 1;
    const needy = team.filter((u) => u.hp > 0 && (u.hp / u.mhp) < 0.7 && manhattan(healer, u) <= r);
    if (needy.length >= 2 || (needy.length >= 1 && healer === needy[0])) {
      healer.mp -= s.mp;
      const amt = Math.floor((s.amount || 20) * (s.pw || 1.0));
      for (const n of needy) n.hp = Math.min(n.mhp, n.hp + amt);
      healer.xp += 15;
      while (healer.xp >= 100) { healer.xp -= 100; healer.level++; healer.atk += 2; healer.def += 1; healer.mhp += 3; healer.hp += 3; }
      return true;
    }
  }
  return false;
}

function tryAttack(atk, foes, map, allUnits) {
  const tgts = foes.filter((u) => u.hp > 0 && manhattan(atk, u) <= (atk.rng || 1));
  if (!tgts.length) return false;
  tgts.sort((a, b) => a.hp - b.hp);  // 약한 적 우선
  const target = tgts[0];

  // 스킬 선택 (60% 확률로 사용 가능 공격스킬)
  let skill = null;
  if (atk.skills.length && Math.random() < 0.6) {
    // AOE 우선
    const viable = atk.skills
      .map((id) => skillsDb[id])
      .filter((s) => s && (s.mp || 0) <= atk.mp &&
        (s.type === 'single' || s.type === 'aoe_area' || s.type === 'multi' || s.type === 'charge' || s.type === 'debuff_area') &&
        manhattan(atk, target) <= (s.rng || 1));
    // aoe_area 우선
    viable.sort((a, b) => {
      const aw = a.type === 'aoe_area' ? 2 : a.type === 'multi' ? 1 : 0;
      const bw = b.type === 'aoe_area' ? 2 : b.type === 'multi' ? 1 : 0;
      return bw - aw;
    });
    skill = viable[0] || null;
  }

  // AOE 스킬은 범위 내 적 전원
  if (skill?.type === 'aoe_area') {
    atk.mp -= skill.mp;
    const center = target;
    const rad = skill.rad || 1;
    const victims = foes.filter((u) => u.hp > 0 && manhattan(u, center) <= rad);
    for (const v of victims) {
      const r = calcDamage(atk, v, skill, { atkMod: 0 }, map);
      v.hp = Math.max(0, v.hp - r.dmg);
      if (v.hp <= 0) atk.xp += 50;
    }
    atk.xp += 15;
    while (atk.xp >= 100) { atk.xp -= 100; atk.level++; atk.atk += 2; atk.def += 1; atk.mhp += 3; atk.hp += 3; }
    return true;
  }

  if (skill) atk.mp -= skill.mp;
  const hits = skill?.type === 'multi' ? (skill.h || 2) : 1;
  for (let i = 0; i < hits; i++) {
    if (target.hp <= 0) break;
    const r = calcDamage(atk, target, skill, { atkMod: 0 }, map);
    target.hp = Math.max(0, target.hp - r.dmg);
  }
  if (target.hp <= 0) atk.xp += 50;
  atk.xp += skill ? 15 : 10;
  while (atk.xp >= 100) { atk.xp -= 100; atk.level++; atk.atk += 2; atk.def += 1; atk.mhp += 3; atk.hp += 3; }

  // 반격 (평타, 대상 생존, 사거리)
  if (!skill && target.hp > 0 && manhattan(target, atk) <= (target.rng || 1)) {
    const r = calcDamage(target, atk, null, { atkMod: 0 }, map);
    r.dmg = Math.max(1, r.dmg - 2);
    atk.hp = Math.max(0, atk.hp - r.dmg);
  }
  return true;
}

function doTurn(team, foes, map, all) {
  const actors = team.filter((u) => u.hp > 0);
  for (const u of actors) {
    if (u.hp <= 0) continue;
    u.acted = false;

    // 힐러 우선: 힐 가능한 상황이면 힐
    if (tryHeal(u, team)) { u.acted = true; continue; }

    // 이미 사거리 내?
    if (!tryAttack(u, foes, map, all)) {
      // 이동
      const target = pickTarget(u, foes);
      if (!target) continue;
      const range = moveRange(u, map, all);
      range.sort((a, b) => manhattan(a, target) - manhattan(b, target));
      const best = range[0];
      if (best) { u.x = best.x; u.y = best.y; }
      tryAttack(u, foes, map, all);
    }
    u.acted = true;
  }
}

function simulateOne() {
  const { map, allies, enemies } = setupBattle();
  const all = [...allies, ...enemies];
  let turn = 1;
  const t0 = Date.now();

  while (turn <= 30) {
    // 아군 턴
    doTurn(allies, enemies, map, all);
    if (!enemies.some((e) => e.hp > 0)) return { winner: 'ally', turns: turn, ms: Date.now() - t0 };
    // 신단수 힐 (우상단 8,1 인접)
    for (const a of allies) if (a.hp > 0 && manhattan(a, {x:8,y:1}) <= 1) a.hp = Math.min(a.mhp, a.hp + 5);

    // 적 턴
    doTurn(enemies, allies, map, all);
    if (!allies.some((a) => a.hp > 0)) return { winner: 'enemy', turns: turn, ms: Date.now() - t0 };

    turn++;
  }
  return { winner: 'draw', turns: turn, ms: Date.now() - t0 };
}

// ───── 실행 ─────
const N = Number(process.argv[2] || 100);
const results = [];
const startAll = Date.now();
for (let i = 0; i < N; i++) results.push(simulateOne());

const allyWins  = results.filter((r) => r.winner === 'ally').length;
const enemyWins = results.filter((r) => r.winner === 'enemy').length;
const draws     = results.filter((r) => r.winner === 'draw').length;
const avgTurns  = (results.reduce((s, r) => s + r.turns, 0) / N).toFixed(1);
const avgMs     = (results.reduce((s, r) => s + r.ms, 0) / N).toFixed(1);
const totalMs   = Date.now() - startAll;

console.log(`┌─────────────────────────────────────────┐`);
console.log(`│ 한국사 영웅전 v8 · 100회 AI 시뮬 결과  │`);
console.log(`├─────────────────────────────────────────┤`);
console.log(`│ 시행 횟수: ${N}                         │`);
console.log(`│ 아군 승리: ${allyWins}회 (${((allyWins/N)*100).toFixed(1)}%)`);
console.log(`│ 적군 승리: ${enemyWins}회 (${((enemyWins/N)*100).toFixed(1)}%)`);
console.log(`│ 무승부:    ${draws}회 (${((draws/N)*100).toFixed(1)}%)`);
console.log(`│ 평균 턴수: ${avgTurns}                  │`);
console.log(`│ 평균 시간: ${avgMs}ms                   │`);
console.log(`│ 전체 시간: ${totalMs}ms                 │`);
console.log(`└─────────────────────────────────────────┘`);
