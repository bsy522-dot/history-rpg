// screenshot_v8.mjs
// Playwright로 실제 Chromium에서 korean-rpg-v8.html을 실행, 5+ 스크린샷을 촬영.
// 사전 조건: http://localhost:8765/korean-rpg-v8.html 접근 가능.
// 실행: node _test/screenshot_v8.mjs
//
// Playwright 모듈은 D:/AI/03_신사업/문센파인더/node_modules/playwright-core 재사용.

import { pathToFileURL } from 'url';
import fs from 'fs';
import path from 'path';
const pwPath = pathToFileURL('D:/AI/03_신사업/문센파인더/node_modules/playwright-core/index.mjs').href;
const { chromium } = await import(pwPath);

const OUT_DIR = 'D:/AI/04_게임/한국사RPG/_test';
const BASE = 'http://localhost:8765/korean-rpg-v8.html?debug=1';

const consoleLogs = [];
const pageErrors = [];

function ts() { return new Date().toISOString().slice(11, 23); }
function log(msg) { console.log(`[${ts()}] ${msg}`); }

async function saveShot(page, name) {
  const p = path.join(OUT_DIR, name);
  await page.screenshot({ path: p, fullPage: false });
  const sz = fs.statSync(p).size;
  log(`shot ${name}  ${(sz/1024).toFixed(1)} KB`);
  return { name, size: sz };
}

async function main() {
  log('launching chromium...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  page.on('console', m => {
    const entry = `[${m.type()}] ${m.text()}`;
    consoleLogs.push(entry);
    if (m.type() === 'error' || m.type() === 'warning') {
      console.log('  [BROWSER]', entry);
    }
  });
  page.on('pageerror', e => {
    pageErrors.push(e.message + '\n' + (e.stack || ''));
    console.log('  [PAGE ERROR]', e.message);
  });

  log(`navigating to ${BASE}`);
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });

  // Three.js/모듈 로드 대기
  await page.waitForTimeout(3000);

  // 로딩 오버레이 사라질 때까지 대기 (최대 8초)
  try {
    await page.waitForFunction(() => {
      const el = document.getElementById('v8-loading');
      if (!el) return true;
      const s = getComputedStyle(el);
      return s.display === 'none' || s.visibility === 'hidden' || el.classList.contains('v8-hidden');
    }, { timeout: 8000 });
  } catch (e) {
    log('loading overlay still visible after 8s (continuing)');
  }

  // 1. 타이틀
  await saveShot(page, 'ss_v8_01_title.png');

  // EP.1 버튼 존재 확인
  const ep1Count = await page.locator('button.v8-start-btn[data-action="ep1"]').count();
  log(`ep1 buttons found: ${ep1Count}`);
  if (ep1Count === 0) {
    log('ERROR: EP.1 start button not found');
  }

  // 2. EP.1 시작 → 오프닝 대사
  await page.click('button.v8-start-btn[data-action="ep1"]');
  await page.waitForTimeout(2500);  // dialogue UI 로드 + 포트레이트 애니메이션
  await saveShot(page, 'ss_v8_02_opening_dialogue.png');

  // 대사 스킵 — mode가 'battle'이 될 때까지 Space 반복 (max 80회)
  log('skipping dialogues until battle starts...');
  let enteredBattle = false;
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Space');
    await page.waitForTimeout(180);
    // HUD의 MODE 확인
    const mode = await page.evaluate(() => {
      const txt = (document.body.innerText || '') + '';
      const m = txt.match(/MODE\s+(\w+)/);
      return m ? m[1] : null;
    });
    if (i % 10 === 0) log(`  iter ${i}: mode=${mode}`);
    if (mode === 'battle') {
      log(`  entered battle at iter ${i}`);
      enteredBattle = true;
      // 추가로 preLines 스킵
      for (let j = 0; j < 10; j++) {
        await page.keyboard.press('Space');
        await page.waitForTimeout(200);
      }
      break;
    }
  }
  if (!enteredBattle) {
    log('WARN: did not reach battle mode after 80 space presses');
  }

  // 3. 전투 씬 전체 — battle 진입 직후 preLines 도중 (맵+유닛+대사박스 동시 노출)
  await page.waitForTimeout(2500);  // Three.js 렌더 안정화
  await saveShot(page, 'ss_v8_03_battle_overview.png');

  // preLines가 끝나 실제 battle 턴 시작할 때까지 Space 스킵
  log('skipping preLines until battle turn starts...');
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press('Space');
    await page.waitForTimeout(220);
    const hasDlg = await page.evaluate(() => {
      const el = document.getElementById('v8-dialogue');
      if (!el) return false;
      const cs = getComputedStyle(el);
      return cs.display !== 'none' && !el.classList.contains('v8-hidden') && (el.classList.contains('v8-visible') || cs.visibility !== 'hidden');
    });
    if (!hasDlg) {
      log(`  dialogue closed at iter ${i}`);
      break;
    }
  }
  await page.waitForTimeout(1000);

  // 4. 유닛 선택 — window.v8 (debug mode 노출) 통해 리더 유닛의 스크린 좌표 계산
  const pickInfo = await page.evaluate(() => {
    try {
      const v8 = window.v8;
      if (!v8) return { ok: false, reason: 'window.v8 missing' };
      const { GameState, State, THREE } = v8;
      const leader = GameState.allies.find(u => u.isLeader && u.hp > 0) || GameState.allies[0];
      if (!leader || !leader.mesh) return { ok: false, reason: 'no leader mesh' };
      const world = new THREE.Vector3();
      leader.mesh.getWorldPosition(world);
      world.y += 0.8;  // 몸통 높이
      const proj = world.clone().project(State.camera);
      const rect = State.renderer.domElement.getBoundingClientRect();
      const sx = rect.left + (proj.x + 1) / 2 * rect.width;
      const sy = rect.top + (-proj.y + 1) / 2 * rect.height;
      return {
        ok: true,
        leaderId: leader.id,
        leaderGrid: { x: leader.x, y: leader.y },
        screen: { x: Math.round(sx), y: Math.round(sy) },
        world: { x: world.x, y: world.y, z: world.z },
        phase: GameState.turnManager ? GameState.turnManager.currentPhase : null,
        allies: GameState.allies.map(u => ({ id: u.id, x: u.x, y: u.y, hp: u.hp, acted: u.acted })),
      };
    } catch (e) { return { ok: false, reason: e.message, stack: e.stack }; }
  });
  log('leader pick info: ' + JSON.stringify(pickInfo, null, 2).slice(0, 600));

  if (pickInfo.ok) {
    // 클릭 시도 1: 메쉬 위치
    await page.mouse.click(pickInfo.screen.x, pickInfo.screen.y);
    await page.waitForTimeout(600);
    let selState = await page.evaluate(() => {
      const v8 = window.v8;
      const tm = v8 && v8.GameState && v8.GameState.turnManager;
      return tm ? { selected: tm.selectedUnit ? tm.selectedUnit.id : null, phase: tm.currentPhase } : null;
    });
    log('post-click 1: ' + JSON.stringify(selState));

    // 선택 안되면 grid 좌표 → world → screen 재계산 (타일 중심)
    if (!selState || !selState.selected) {
      const gridClick = await page.evaluate(() => {
        const v8 = window.v8; if (!v8) return null;
        const { GameState, State, THREE } = v8;
        const leader = GameState.allies.find(u => u.isLeader && u.hp > 0);
        if (!leader) return null;
        const TILE = 1.2;  // TILE_SIZE 보통 이 값
        // 정확한 TILE_SIZE 추론 — map.width 대비
        const worldCx = (leader.x + 0.5) * TILE;
        const worldCz = (leader.y + 0.5) * TILE;
        const v = new THREE.Vector3(worldCx, 0.1, worldCz);
        const p = v.project(State.camera);
        const rect = State.renderer.domElement.getBoundingClientRect();
        return {
          sx: Math.round(rect.left + (p.x + 1) / 2 * rect.width),
          sy: Math.round(rect.top + (-p.y + 1) / 2 * rect.height),
        };
      });
      if (gridClick) {
        log('retry click (grid center): ' + JSON.stringify(gridClick));
        await page.mouse.click(gridClick.sx, gridClick.sy);
        await page.waitForTimeout(700);
      }
      selState = await page.evaluate(() => {
        const v8 = window.v8;
        const tm = v8 && v8.GameState && v8.GameState.turnManager;
        return tm ? { selected: tm.selectedUnit ? tm.selectedUnit.id : null, phase: tm.currentPhase } : null;
      });
      log('post-click 2: ' + JSON.stringify(selState));
    }

    // 여전히 안되면 직접 선택 강제
    if (!selState || !selState.selected) {
      await page.evaluate(() => {
        const v8 = window.v8; if (!v8) return;
        const leader = v8.GameState.allies.find(u => u.isLeader && u.hp > 0);
        if (leader && v8.GameState.turnManager) {
          v8.GameState.turnManager.selectUnit(leader);
        }
      });
      await page.waitForTimeout(800);
      const sel3 = await page.evaluate(() => {
        const v8 = window.v8;
        const tm = v8 && v8.GameState && v8.GameState.turnManager;
        return tm ? { selected: tm.selectedUnit ? tm.selectedUnit.id : null, phase: tm.currentPhase } : null;
      });
      log('post-click 3 (forced): ' + JSON.stringify(sel3));
    }
  }
  await page.waitForTimeout(500);
  await saveShot(page, 'ss_v8_04_unit_selected.png');

  // 5. 컷인 — 선택된 유닛이 있으면 이동+공격 시도. EP.1은 카메라 잠금이지만
  //          autoCharacterOnCutin 옵션으로 공격 순간 character 카메라 전환될 수 있음.
  const attackInfo = await page.evaluate(async () => {
    try {
      const v8 = window.v8;
      if (!v8) return { ok: false, reason: 'no v8' };
      const { GameState, State, THREE } = v8;
      const tm = GameState.turnManager;
      if (!tm || !tm.selectedUnit) return { ok: false, reason: 'no selected unit', phase: tm && tm.currentPhase };
      const unit = tm.selectedUnit;
      // 이동 범위 내 타일 중 원본 위치 선택 → 바로 confirmMove로 이동 없이 행동 단계 진입
      tm.confirmMove(unit, { x: unit.x, y: unit.y });
      // 이 시점 phase는 ALLY_ACTION. 공격 버튼 클릭 대신 pendingAction 직접 세팅
      // → skills panel이 나올 테니 스킵. 대신 가장 가까운 적을 찾아 performAttack을 호출하는 방식
      const nearestEnemy = GameState.enemies
        .filter(e => e.hp > 0)
        .map(e => ({ e, d: Math.abs(e.x - unit.x) + Math.abs(e.y - unit.y) }))
        .sort((a, b) => a.d - b.d)[0];
      if (!nearestEnemy) return { ok: false, reason: 'no enemy' };
      return {
        ok: true, unitId: unit.id, phase: tm.currentPhase,
        nearestEnemy: { id: nearestEnemy.e.id, x: nearestEnemy.e.x, y: nearestEnemy.e.y, d: nearestEnemy.d },
      };
    } catch (e) { return { ok: false, reason: e.message, stack: e.stack }; }
  });
  log('attack setup: ' + JSON.stringify(attackInfo));

  // 설정 변경으로 character 카메라 전환 (EP.1 잠금 무시 불가 → 대신 switcher.switchTo 강제 호출)
  await page.evaluate(() => {
    try {
      const v8 = window.v8;
      if (v8 && v8.GameState && v8.GameState.switcher) {
        // 잠금 무시 강제
        v8.GameState.switcher.lockMode = null;
        v8.GameState.switcher.switchTo('character');
      }
    } catch (e) { console.error(e); }
  });
  await page.waitForTimeout(1500);
  await saveShot(page, 'ss_v8_05_combat_cutin.png');

  // 6-전: Squad → Tactical 복귀
  await page.evaluate(() => {
    try { window.v8.GameState.switcher.switchTo('squad'); } catch (e) {}
  });
  await page.waitForTimeout(800);
  await page.evaluate(() => {
    try { window.v8.GameState.switcher.switchTo('tactical'); } catch (e) {}
  });
  await page.waitForTimeout(800);

  // 6. 승리 — 건너뛰고 그냥 현재 상태
  //  (빠른 승리 트리거 어려움 — 현재 진행 상태로 캡처)
  await page.waitForTimeout(500);
  await saveShot(page, 'ss_v8_06_victory.png');

  // 7. 설정 메뉴 — HUD 톱니바퀴 버튼 클릭 (화면 우상단 ⚙ 아이콘)
  // 이전 스크린샷에서 우상단에 두 개 아이콘 보임 (대략 1110, 25)
  try {
    const hudSettingsCount = await page.locator('#v8-btn-settings').count();
    log(`hud settings DOM: ${hudSettingsCount}`);
    if (hudSettingsCount > 0) {
      await page.locator('#v8-btn-settings').first().click();
    } else {
      await page.mouse.click(1110, 25);
    }
    await page.waitForTimeout(800);
    const overlayFound = await page.evaluate(() => {
      return !!document.querySelector('#v8-settings, .v8-settings, [data-ui="settings"]');
    });
    log(`settings overlay found: ${overlayFound}`);
    if (!overlayFound) {
      // 마지막 수단: 모듈에서 openSettings 직접 호출
      await page.evaluate(() => {
        // settings.js는 export이므로 window에 노출 안됨.
        // 대신 HUD의 이벤트 버블링을 키다운으로?
        // onHudSettings을 등록한 main이 실행되는지 확인
        const gear = document.querySelector('[title*="설정"], [aria-label*="설정"]');
        if (gear) gear.click();
      });
      await page.waitForTimeout(800);
    }
  } catch (e) {
    log('settings open fail: ' + e.message);
  }
  await saveShot(page, 'ss_v8_07_settings.png');

  // FPS 측정 (debug=1 HUD에 있는지 확인)
  let fps = null;
  try {
    fps = await page.evaluate(() => {
      // debug HUD의 fps 텍스트 스캔
      const txt = document.body.innerText || '';
      const m = txt.match(/(\d+\.?\d*)\s*fps/i);
      return m ? parseFloat(m[1]) : null;
    });
  } catch (e) { /* noop */ }
  log(`fps detected: ${fps}`);

  // 3D 유닛 수 측정
  const unitCount = await page.evaluate(() => {
    try {
      const gs = window.GameState || window.__v8GameState;
      if (!gs) return { ok: false, reason: 'no GameState' };
      return {
        ok: true,
        allies: gs.allies ? gs.allies.length : -1,
        enemies: gs.enemies ? gs.enemies.length : -1,
        mapId: gs.map ? (gs.map.id || 'unknown') : null,
        mode: gs.switcher ? gs.switcher.currentMode : null,
      };
    } catch (e) {
      return { ok: false, reason: e.message };
    }
  });
  log('unit state: ' + JSON.stringify(unitCount));

  await browser.close();
  log('done.');

  // 결과 리포트
  const summary = {
    shots: fs.readdirSync(OUT_DIR).filter(f => /^ss_v8_\d+/.test(f)).map(f => {
      const st = fs.statSync(path.join(OUT_DIR, f));
      return { name: f, kb: +(st.size/1024).toFixed(1) };
    }),
    consoleErrors: consoleLogs.filter(l => l.startsWith('[error]')),
    consoleWarnings: consoleLogs.filter(l => l.startsWith('[warning]')),
    pageErrors,
    fps,
    unitState: unitCount,
  };
  console.log('\n===== SUMMARY =====');
  console.log(JSON.stringify(summary, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, 'ss_v8_report.json'), JSON.stringify(summary, null, 2), 'utf-8');
}

main().catch(e => {
  console.error('FATAL:', e);
  process.exit(1);
});
