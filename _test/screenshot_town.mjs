// screenshot_town.mjs
// EP.1 신시 마을 씬 검증 — 오프닝 대사 스킵 → town_scene 진입 → 스크린샷
// 실행: node _test/screenshot_town.mjs

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
function log(m) { console.log(`[${ts()}] ${m}`); }

async function saveShot(page, name) {
  const p = path.join(OUT_DIR, name);
  await page.screenshot({ path: p, fullPage: false });
  log(`shot ${name}  ${(fs.statSync(p).size/1024).toFixed(1)} KB`);
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']
  });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await ctx.newPage();
  page.on('console', m => {
    consoleLogs.push(`[${m.type()}] ${m.text()}`);
    if (m.type()==='error') console.log('  [ERR]', m.text());
  });
  page.on('pageerror', e => {
    pageErrors.push(e.message);
    console.log('  [PAGE ERROR]', e.message);
  });

  log(`navigating to ${BASE}`);
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2500);
  try {
    await page.waitForFunction(() => {
      const el = document.getElementById('v8-loading');
      if (!el) return true;
      const s = getComputedStyle(el);
      return s.display === 'none' || s.visibility === 'hidden' || el.classList.contains('v8-hidden');
    }, { timeout: 8000 });
  } catch (e) { log('loading overlay timeout'); }

  // EP.1 시작
  const ep1Count = await page.locator('button.v8-start-btn[data-action="ep1"]').count();
  log(`ep1 buttons: ${ep1Count}`);
  if (ep1Count === 0) { log('FATAL: EP.1 button missing'); await browser.close(); return; }
  await page.click('button.v8-start-btn[data-action="ep1"]');
  await page.waitForTimeout(1500);

  // 대사 스킵 — exploration 씬(= mode='exploration')에 도달할 때까지 Space 누름
  log('skipping dialogues until exploration mode...');
  let modeHistory = [];
  let reachedTown = false;
  for (let i = 0; i < 100; i++) {
    await page.keyboard.press('Space');
    await page.waitForTimeout(180);
    const cur = await page.evaluate(() => {
      try {
        const v8 = window.v8;
        if (!v8) return null;
        // setMode가 set하는 곳 참조
        const sc = v8.GameState && v8.GameState.currentScene;
        return {
          sceneId: sc ? sc.id : null,
          sceneType: sc ? sc.type : null,
          mapId: v8.GameState && v8.GameState.map ? v8.GameState.map.id : null,
          camMode: v8.GameState && v8.GameState.switcher ? v8.GameState.switcher.currentMode : null,
        };
      } catch (e) { return { err: e.message }; }
    });
    if (i % 8 === 0) log(`  iter ${i}: ${JSON.stringify(cur)}`);
    if (cur && cur.sceneType === 'exploration') {
      log(`  reached exploration (iter ${i}): ${JSON.stringify(cur)}`);
      reachedTown = true;
      break;
    }
  }
  if (!reachedTown) {
    log('WARN: did not reach exploration scene');
  }

  // Three.js 안정화 대기
  await page.waitForTimeout(2500);

  // 스크린샷: 마을 전경
  await saveShot(page, 'ss_v8_08_town.png');

  // 회의장으로 이동 시도 (WASD W 여러 번)
  // playerStart (5,7) → 회의장 (2,2)로는 멀지만, 간단히 몇 칸만 이동해서 상호작용 가능 범위 체크
  log('testing interact: walking toward council...');
  for (let i = 0; i < 4; i++) { await page.keyboard.press('w'); await page.waitForTimeout(300); }
  for (let i = 0; i < 3; i++) { await page.keyboard.press('a'); await page.waitForTimeout(300); }
  await page.waitForTimeout(500);
  await saveShot(page, 'ss_v8_09_town_walk.png');

  // E 상호작용 시도 — 회의장 NPC (환웅)
  await page.keyboard.press('e');
  await page.waitForTimeout(1500);
  await saveShot(page, 'ss_v8_10_town_interact.png');

  // 회의장 대화 끝까지 진행 (Space 10번)
  log('advancing council dialogue to completion...');
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Space');
    await page.waitForTimeout(250);
  }
  await page.waitForTimeout(500);

  // GameState.flags 확인 — council_done이 찍혀야 함
  const flagsAfter = await page.evaluate(() => {
    try {
      const v8 = window.v8;
      return {
        flags: v8 && v8.GameState ? v8.GameState.flags : null,
        inventory: v8 && v8.GameState ? v8.GameState.inventory : null,
      };
    } catch (e) { return { err: e.message }; }
  });
  log('state after council: ' + JSON.stringify(flagsAfter));

  await saveShot(page, 'ss_v8_11_town_after_council.png');

  // 직접 trigger 강제 실행으로 grant/조건분기 검증
  //  → exploration handler 내부 closure에 접근하기 어려우므로
  //    trigger 객체 구조 파싱 + inventory/flags 수동 조작 대신
  //    scene.triggers 배열을 읽어 예상 grant/flag를 시뮬레이션한 뒤 비교.
  const simResult = await page.evaluate(() => {
    try {
      const v8 = window.v8;
      const sc = v8 && v8.GameState && v8.GameState.currentScene;
      if (!sc) return { err: 'no scene' };
      const triggers = sc.triggers || {};
      const sim = { flags: {...v8.GameState.flags}, inventory: {...v8.GameState.inventory} };
      // 상점 trigger 시뮬레이션
      const shop = triggers.ep1_shop;
      if (shop && shop.grant) {
        for (const g of shop.grant) {
          sim.inventory[g.id] = (sim.inventory[g.id]||0) + g.amount;
        }
        if (shop.setFlag) sim.flags[shop.setFlag] = true;
      }
      // 출진문 조건 — council_done true이므로 ifMet 선택
      const depart = triggers.ep1_depart;
      const gateReady = depart && depart.type === 'condition'
        && sim.flags[depart.requireFlag] === true;
      return {
        triggersKeys: Object.keys(triggers),
        sim,
        gateReady,
        shopGrantStructure: shop ? { type: shop.type, grant: shop.grant, setFlag: shop.setFlag } : null,
        departStructure: depart ? { type: depart.type, requireFlag: depart.requireFlag, ifMetHasExit: depart.ifMet?.exitScene === true } : null,
      };
    } catch (e) { return { err: e.message }; }
  });
  log('trigger structure check: ' + JSON.stringify(simResult, null, 2));

  const flags = flagsAfter;

  await browser.close();

  const summary = {
    reachedTown,
    flags,
    consoleErrors: consoleLogs.filter(l => l.startsWith('[error]')),
    pageErrors,
  };
  console.log('\n===== SUMMARY =====');
  console.log(JSON.stringify(summary, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, 'ss_v8_town_report.json'), JSON.stringify(summary, null, 2));
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
