import { chromium } from 'file:///D:/AI/03_신사업/문센파인더/node_modules/playwright/index.mjs';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

const errors = [];
const warnings = [];
const logs = [];
page.on('console', m => {
  const t = m.type();
  const text = m.text();
  if (t === 'error') errors.push(text);
  else if (t === 'warning') warnings.push(text);
  else logs.push(`[${t}] ${text}`);
});
page.on('pageerror', e => errors.push(`[PAGEERROR] ${e.message}\n${e.stack?.slice(0,800)}`));
page.on('requestfailed', r => errors.push(`[REQ FAIL] ${r.url()} — ${r.failure()?.errorText}`));

const url = 'http://localhost:8765/korean-rpg-v8.html?debug=1&t=' + Date.now();
await page.goto(url, { waitUntil: 'networkidle' }).catch(e => errors.push('[GOTO] ' + e.message));
await page.waitForTimeout(4000);

const state = await page.evaluate(() => ({
  loadingVisible: !!document.querySelector('#v8-loading:not([style*="display: none"])'),
  loadingInDOM: !!document.querySelector('#v8-loading'),
  titleVisible: document.querySelector('#v8-title') && !document.querySelector('#v8-title.v8-hidden'),
  errorVisible: !!document.querySelector('#v8-error.v8-visible'),
  errorText: document.querySelector('#v8-error pre')?.textContent?.slice(0,500),
  hasV8Global: !!window.v8,
  dataLoaded: window.v8?.DATA ? Object.keys(window.v8.DATA) : null,
}));

console.log('=== STATE ===');
console.log(JSON.stringify(state, null, 2));

console.log('\n=== ERRORS (' + errors.length + ') ===');
errors.forEach(e => console.log(e));

console.log('\n=== REQ WARNINGS ===');
warnings.filter(w => !w.includes('AudioContext') && !w.includes('GL Driver')).slice(0,20).forEach(w => console.log(w));

console.log('\n=== KEY LOGS ===');
logs.filter(l => l.includes('[v8]') || l.includes('[log]')).slice(0,20).forEach(l => console.log(l));

await page.screenshot({ path: '_test/ss_diag_load.png' });
await browser.close();
