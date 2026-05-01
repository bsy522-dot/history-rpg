// verify_mobile.mjs
// 모바일 viewport(iPhone 12 / Galaxy S20)로 v8 빌드 작동 검증.
// - 무한 로딩 여부 (v8-loading 사라짐)
// - 콘솔 에러 수집
// - 타이틀/배틀/UI 스크린샷

import { pathToFileURL } from 'url';
import fs from 'fs';
import path from 'path';
const pwPath = pathToFileURL('D:/AI/03_신사업/문센파인더/node_modules/playwright-core/index.mjs').href;
const { chromium, devices } = await import(pwPath);

const OUT = 'D:/AI/04_게임/한국사RPG/_test';
const BASE = 'http://localhost:8765/korean-rpg-v8.html?debug=1';

const PROFILES = [
  { name: 'iphone12', label: 'iPhone 12',     viewport: { width: 390, height: 844 }, dpr: 3, ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15' },
  { name: 'galaxys20', label: 'Galaxy S20',    viewport: { width: 360, height: 800 }, dpr: 3, ua: 'Mozilla/5.0 (Linux; Android 11; SM-G981B) AppleWebKit/537.36' },
  { name: 'tablet',    label: 'iPad Mini',     viewport: { width: 768, height: 1024 }, dpr: 2, ua: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15' },
];

function ts() { return new Date().toISOString().slice(11, 23); }
function log(m) { console.log(`[${ts()}] ${m}`); }

const report = { url: BASE, profiles: {} };

for (const p of PROFILES) {
  log(`=== ${p.label} (${p.viewport.width}x${p.viewport.height}) ===`);
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
  });
  const ctx = await browser.newContext({
    viewport: p.viewport,
    deviceScaleFactor: p.dpr,
    userAgent: p.ua,
    isMobile: p.name !== 'tablet',
    hasTouch: true,
  });
  const page = await ctx.newPage();

  const errors = [];
  const warnings = [];
  page.on('console', m => {
    if (m.type() === 'error') errors.push(m.text());
    if (m.type() === 'warning') warnings.push(m.text());
  });
  page.on('pageerror', e => errors.push('[pageerror] ' + e.message));

  let loadOk = false;
  let loadingHidden = false;
  let titleVisible = false;

  try {
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 });
    loadOk = true;
  } catch (e) {
    errors.push('[goto] ' + e.message);
  }

  // 로딩 오버레이 사라질 때까지 (최대 12초)
  try {
    await page.waitForFunction(() => {
      const el = document.getElementById('v8-loading');
      if (!el) return true;
      const s = getComputedStyle(el);
      return s.display === 'none' || s.visibility === 'hidden' || el.classList.contains('v8-hidden');
    }, { timeout: 12000 });
    loadingHidden = true;
  } catch (e) {
    log('  WARN: 로딩 오버레이 12초 후에도 visible');
  }

  await page.waitForTimeout(1500);

  titleVisible = await page.evaluate(() => {
    const t = document.getElementById('v8-title');
    if (!t) return false;
    const s = getComputedStyle(t);
    return s.display !== 'none' && s.visibility !== 'hidden';
  });

  const shot = path.join(OUT, `mobile_${p.name}_01_title.png`);
  await page.screenshot({ path: shot });
  log(`  shot ${path.basename(shot)} (${(fs.statSync(shot).size/1024).toFixed(1)}KB)`);

  // EP.1 버튼 클릭 시도
  let ep1Clicked = false;
  let battleShot = null;
  try {
    const btn = page.locator('button.v8-start-btn[data-action="ep1"]').first();
    if (await btn.count() > 0) {
      await btn.click({ timeout: 3000 });
      await page.waitForTimeout(2500);
      ep1Clicked = true;
      battleShot = path.join(OUT, `mobile_${p.name}_02_after_ep1.png`);
      await page.screenshot({ path: battleShot });
      log(`  shot ${path.basename(battleShot)} (${(fs.statSync(battleShot).size/1024).toFixed(1)}KB)`);
    } else {
      log('  WARN: EP.1 버튼 없음');
    }
  } catch (e) {
    log(`  WARN: EP.1 클릭 실패 — ${e.message.slice(0, 100)}`);
  }

  report.profiles[p.name] = {
    label: p.label,
    viewport: p.viewport,
    loadOk,
    loadingHidden,
    titleVisible,
    ep1Clicked,
    errors,
    warnings: warnings.slice(0, 10),
    titleShot: path.basename(shot),
    battleShot: battleShot ? path.basename(battleShot) : null,
  };

  await browser.close();
}

const reportPath = path.join(OUT, 'mobile_report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
log('=== SUMMARY ===');
for (const [k, r] of Object.entries(report.profiles)) {
  const ok = r.loadOk && r.loadingHidden && r.titleVisible;
  log(`  ${k.padEnd(10)} load:${r.loadOk?'Y':'N'} hide:${r.loadingHidden?'Y':'N'} title:${r.titleVisible?'Y':'N'} ep1:${r.ep1Clicked?'Y':'N'} err:${r.errors.length} ${ok?'PASS':'FAIL'}`);
  if (r.errors.length) for (const e of r.errors.slice(0, 3)) log(`    ERR: ${e.slice(0, 140)}`);
}
log(`report → ${reportPath}`);
