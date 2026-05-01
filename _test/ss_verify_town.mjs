import { chromium } from 'file:///D:/AI/03_신사업/문센파인더/node_modules/playwright/index.mjs';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const url = 'http://localhost:8765/korean-rpg-v8.html?debug=1&t=' + Date.now();
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
const btn = await page.locator('button').filter({ hasText: /EP\.?1|환웅/ }).first();
await btn.click();
await page.waitForTimeout(1000);
// opening_1: 4 lines, opening_2: 6 lines = 10+ clicks
for (let i = 0; i < 25; i++) {
  await page.keyboard.press('Space');
  await page.waitForTimeout(400);
}
await page.waitForTimeout(1500);  // let town settle
await page.screenshot({ path: '_test/ss_town_final.png' });
// Now walk a bit and then interact with council
await page.keyboard.down('w'); await page.waitForTimeout(100); await page.keyboard.up('w');
await page.waitForTimeout(300);
await page.screenshot({ path: '_test/ss_town_walk.png' });
// Check state
const s = await page.evaluate(() => {
  const g = window.v8?.GameState || {};
  return {
    sceneId: g.currentScene?.id,
    sceneType: g.currentScene?.type,
    mode: window.v8?.State?.mode,
    hasTownGroup: !!g.townGroup,
    playerPos: g.playerUnit ? { x: g.playerUnit.x, y: g.playerUnit.y } : null,
    sceneCount: document.querySelectorAll('#v8-dialogue').length,
    dialogVisible: !!document.querySelector('#v8-dialogue:not(.v8-hidden)'),
  };
});
console.log(JSON.stringify(s, null, 2));
await browser.close();
