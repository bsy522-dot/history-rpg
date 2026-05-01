// EP.1 플레이 흐름 추적 — 마을 씬 도달 여부 확인
import { chromium } from 'file:///D:/AI/03_신사업/문센파인더/node_modules/playwright/index.mjs';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const page = await ctx.newPage();

const logs = [];
page.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', e => logs.push(`[PAGEERROR] ${e.message}\n${e.stack}`));

const url = 'http://localhost:8765/korean-rpg-v8.html?debug=1&t=' + Date.now();
console.log('Loading:', url);
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

// 타이틀 → EP.1 시작
await page.screenshot({ path: '_test/ss_trace_01_title.png' });
console.log('[1] Title loaded, clicking EP.1...');

// 정확한 버튼 찾기
const btn = await page.locator('button, [role=button], #v8-ep1-start, .v8-btn').filter({ hasText: /EP\.?1|환웅|시작/ }).first();
if (await btn.count() === 0) {
  // fallback: check v8-title
  await page.evaluate(() => {
    const btns = document.querySelectorAll('button, [onclick], .v8-title-btn, .game-card');
    console.log('BUTTONS FOUND:', btns.length);
    btns.forEach((b,i) => console.log('  btn', i, b.textContent?.slice(0,40), b.outerHTML.slice(0,100)));
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '_test/ss_trace_diag.png' });
} else {
  await btn.click();
}
await page.waitForTimeout(1500);
await page.screenshot({ path: '_test/ss_trace_02_afterclick.png' });

// 대사 스킵 30회 (opening_1 4줄 + opening_2 6줄, 여유)
console.log('[2] Clicking through opening dialogues...');
for (let i = 0; i < 30; i++) {
  await page.keyboard.press('Space');
  await page.waitForTimeout(250);
}

await page.waitForTimeout(1500);
await page.screenshot({ path: '_test/ss_trace_03_after_opening.png' });

// 현재 씬 확인
const state = await page.evaluate(() => {
  const v8 = window.v8 || {};
  const gs = v8.GameState || {};
  return {
    currentSceneId: gs.currentScene?.id,
    currentSceneType: gs.currentScene?.type,
    currentEp: gs.currentEp,
    hasTownGroup: !!gs.townGroup,
    hasPlayerMesh: !!gs.playerMesh,
    mapId: gs.map?.id,
    mode: v8.State?.mode,
    allyCount: (gs.battle?.allies || []).length,
    enemyCount: (gs.battle?.enemies || []).length,
  };
});
console.log('[3] GameState after opening:', JSON.stringify(state, null, 2));

await page.waitForTimeout(1000);
await page.screenshot({ path: '_test/ss_trace_04_final.png' });

console.log('\n=== CONSOLE LOGS ===');
logs.forEach(l => console.log(l));

await browser.close();
