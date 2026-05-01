// fullloop-3d 스타일 이식 검증 — 마을/전투/설정 3장
import { chromium } from 'file:///D:/AI/03_신사업/문센파인더/node_modules/playwright/index.mjs';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();

const logs = [];
page.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', e => logs.push(`[PAGEERROR] ${e.message}`));

const url = 'http://localhost:8765/korean-rpg-v8.html?debug=1&t=' + Date.now();
console.log('Loading:', url);

// 분대 모드 기본값으로 localStorage 세팅
await page.goto(url);
await page.evaluate(() => {
  localStorage.setItem('history-rpg-settings-v8', JSON.stringify({
    cameraMode: 'tactical', autoCutin: true, bgmVolume: 50, sfxVolume: 70,
    language: 'ko', cameraLocked: false, battleDisplay: 'squad'
  }));
});
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

// ── (1) 타이틀 → 설정 메뉴 열기 (분대 라디오 확인)
console.log('[step] Open settings from title');
const settingsBtn = await page.locator('button.v8-start-btn[data-action=settings]').first();
await settingsBtn.click();
await page.waitForTimeout(600);
await page.screenshot({ path: '_test/ss_v8_settings_squad.png', fullPage: false });
console.log('[ss] settings_squad captured');

// 설정 닫기
const cancelBtn = await page.locator('.v8-btn[data-cancel]').first();
if (await cancelBtn.count()) await cancelBtn.click();
await page.waitForTimeout(500);

// ── (2) EP.1 시작 → 오프닝 대사 다 스킵 → 마을 진입
console.log('[step] Start EP.1');
const ep1Btn = await page.locator('button.v8-start-btn[data-action=ep1]').first();
await ep1Btn.click();
await page.waitForTimeout(1000);

// opening_1 + opening_2 대사 = 10줄 + 여유 → Space 25회
for (let i = 0; i < 25; i++) {
  await page.keyboard.press('Space');
  await page.waitForTimeout(200);
}
await page.waitForTimeout(1500);

// 마을 씬 확인
let state = await page.evaluate(() => {
  const gs = window.v8?.GameState || {};
  return {
    sceneId: gs.currentScene?.id,
    sceneType: gs.currentScene?.type,
    mapId: gs.map?.id,
    hasTownGroup: !!gs.townGroup,
    playerPos: gs.playerUnit ? { x: gs.playerUnit.x, y: gs.playerUnit.y } : null,
  };
});
console.log('[state after opening]', JSON.stringify(state));

// 마을 씬이면 stage camera tactical로 바꿔서 전경 잘 보이게 (tactical 강제)
if (state.hasTownGroup) {
  await page.evaluate(() => {
    try {
      const sw = window.v8?.GameState?.switcher;
      if (sw) { sw.setLockMode(null); sw.switchTo('tactical', 400, { force: true }); }
    } catch (e) { console.error(e); }
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: '_test/ss_v8_town_new.png', fullPage: false });
  console.log('[ss] town_new captured');
} else {
  console.warn('[warn] Town scene not reached, current scene:', state.sceneId);
  await page.screenshot({ path: '_test/ss_v8_town_new.png', fullPage: false });
}

// ── (3) 마을에서 ESC로 출진 → 전투씬 진입
// 출진하려면 풍백과 대화(council_done) 필요. 일단 강제로 exploration 종료.
// 간단히 마을 NPC와 대화(풍백) 후 출진문 트리거.
console.log('[step] Force exit town — go to battle');
// 편의상 flag와 requestExit 호출 시뮬
await page.evaluate(() => {
  try {
    const gs = window.v8?.GameState;
    if (gs) {
      gs.flags = gs.flags || {};
      gs.flags.council_done = true;
    }
  } catch (e) { console.error(e); }
});
// 플레이어가 gate 근처로 이동 후 E: 복잡하므로, 그냥 Escape로 강제 종료
await page.keyboard.press('Escape');
await page.waitForTimeout(1500);

// tutorial 대사 스킵
for (let i = 0; i < 10; i++) {
  await page.keyboard.press('Space');
  await page.waitForTimeout(200);
}
// preLines 스킵
for (let i = 0; i < 5; i++) {
  await page.keyboard.press('Space');
  await page.waitForTimeout(200);
}
await page.waitForTimeout(2000);

state = await page.evaluate(() => {
  const gs = window.v8?.GameState || {};
  return {
    sceneId: gs.currentScene?.id,
    sceneType: gs.currentScene?.type,
    mapId: gs.map?.id,
    allyCount: (gs.allies || []).length,
    enemyCount: (gs.enemies || []).length,
    display: gs.battleDisplay,
    allyMeshType: gs.allies?.[0]?.mesh?.userData?.type,
  };
});
console.log('[state after battle enter]', JSON.stringify(state));

// tactical 카메라 확인
await page.waitForTimeout(800);
await page.screenshot({ path: '_test/ss_v8_battle_squad.png', fullPage: false });
console.log('[ss] battle_squad captured');

// 로그 요약
console.log('\n=== LOGS (errors) ===');
const errs = logs.filter(l => l.startsWith('[error]') || l.startsWith('[PAGEERROR]'));
errs.forEach(l => console.log(l));
console.log('Errors count:', errs.length);

await browser.close();
console.log('\n=== DONE ===');
