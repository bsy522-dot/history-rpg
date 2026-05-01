"""verify_remote.py — 실제 LevelPlay 배포 URL에서 로딩 진단."""
from playwright.sync_api import sync_playwright
import os, time

OUT = r'D:\AI\04_게임\한국사RPG\_test'
URLS = [
    ('ghpages_v8b', 'https://bsy522-dot.github.io/levelplay/games/korean-rpg-v8b/?debug=1'),
    ('ghpages_v8',  'https://bsy522-dot.github.io/levelplay/games/korean-rpg-v8/?debug=1'),
    ('ghpages_root','https://bsy522-dot.github.io/levelplay/'),
]

def now(): return time.strftime('%H:%M:%S')
def log(m): print(f'[{now()}] {m}', flush=True)

with sync_playwright() as pw:
    for name, url in URLS:
        log(f'=== {name} :: {url} ===')
        b = pw.chromium.launch(headless=True, args=['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'])
        ctx = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=3, is_mobile=True, has_touch=True)
        page = ctx.new_page()
        errors, net4xx = [], []
        page.on('console', lambda m: errors.append(f'[{m.type}] {m.text}') if m.type in ('error', 'warning') else None)
        page.on('pageerror', lambda e: errors.append('[pageerror] ' + e.message))
        page.on('response', lambda r: net4xx.append(f'{r.status} {r.url}') if r.status >= 400 else None)
        try:
            page.goto(url, wait_until='domcontentloaded', timeout=20000)
        except Exception as e:
            log(f'  goto err: {e}')
        try:
            page.wait_for_function("""() => {
              const el = document.getElementById('v8-loading');
              if (!el) return true;
              const s = getComputedStyle(el);
              return s.display === 'none' || s.visibility === 'hidden' || el.classList.contains('v8-hidden');
            }""", timeout=15000)
            log('  loading hidden: YES')
        except Exception:
            msg = page.evaluate("() => { const e = document.querySelector('#v8-loading p'); return e ? e.textContent : null; }")
            log(f'  loading hidden: NO  (msg: {msg})')
        page.wait_for_timeout(1500)
        title_visible = page.evaluate("() => { const t = document.getElementById('v8-title'); if (!t) return false; const s = getComputedStyle(t); return s.display !== 'none' && s.visibility !== 'hidden'; }")
        err_overlay = page.evaluate("() => { const e = document.getElementById('v8-error'); return e && e.classList.contains('v8-visible') ? document.getElementById('v8-error-msg').textContent : null; }")
        shot = os.path.join(OUT, f'remote_{name}.png')
        page.screenshot(path=shot)
        log(f'  shot {os.path.basename(shot)}')
        log(f'  title visible: {title_visible}')
        if err_overlay: log(f'  ERROR OVERLAY: {err_overlay[:300]}')
        for e in errors[:8]: log(f'    {e[:200]}')
        for n in net4xx[:8]: log(f'    4xx: {n[:200]}')
        b.close()
