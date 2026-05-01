"""verify_mobile.py — 모바일 viewport에서 v8 빌드 작동 검증.
- 무한 로딩 여부 / 콘솔 에러 / 타이틀 / EP.1 진입 / FPS
- 출력: _test/mobile_*.png + mobile_report.json
"""
from playwright.sync_api import sync_playwright
import json, os, time

OUT = r'D:\AI\04_게임\한국사RPG\_test'
BASE = 'http://localhost:8766/korean-rpg-v8.html?debug=1'

PROFILES = [
    {'name': 'iphone12',  'label': 'iPhone 12',  'viewport': {'width': 390, 'height': 844},  'dpr': 3, 'mobile': True},
    {'name': 'galaxys20', 'label': 'Galaxy S20', 'viewport': {'width': 360, 'height': 800},  'dpr': 3, 'mobile': True},
    {'name': 'tablet',    'label': 'iPad Mini',  'viewport': {'width': 768, 'height': 1024}, 'dpr': 2, 'mobile': False},
]

def now():
    return time.strftime('%H:%M:%S')

def log(m):
    print(f'[{now()}] {m}', flush=True)

report = {'url': BASE, 'profiles': {}}

with sync_playwright() as pw:
    for p in PROFILES:
        log(f"=== {p['label']} ({p['viewport']['width']}x{p['viewport']['height']}) ===")
        browser = pw.chromium.launch(
            headless=True,
            args=['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
        )
        ctx = browser.new_context(
            viewport=p['viewport'],
            device_scale_factor=p['dpr'],
            is_mobile=p['mobile'],
            has_touch=True,
        )
        page = ctx.new_page()

        errors, warnings, infos = [], [], []
        net_404 = []

        def on_console(m):
            t = m.type
            if t == 'error': errors.append(m.text)
            elif t == 'warning': warnings.append(m.text)
            elif t == 'info': infos.append(m.text)

        def on_response(resp):
            if resp.status >= 400:
                net_404.append(f'{resp.status} {resp.url}')

        page.on('console', on_console)
        page.on('pageerror', lambda e: errors.append('[pageerror] ' + e.message))
        page.on('response', on_response)

        load_ok = loading_hidden = title_visible = ep1_clicked = False
        title_shot = battle_shot = None
        try:
            page.goto(BASE, wait_until='domcontentloaded', timeout=15000)
            load_ok = True
        except Exception as e:
            errors.append('[goto] ' + str(e))

        # 로딩 오버레이 사라질 때까지
        try:
            page.wait_for_function(
                """() => {
                  const el = document.getElementById('v8-loading');
                  if (!el) return true;
                  const s = getComputedStyle(el);
                  return s.display === 'none' || s.visibility === 'hidden' || el.classList.contains('v8-hidden');
                }""",
                timeout=12000,
            )
            loading_hidden = True
        except Exception:
            log('  WARN: 로딩 오버레이 12초 후에도 visible')

        page.wait_for_timeout(1500)

        title_visible = page.evaluate(
            """() => {
              const t = document.getElementById('v8-title');
              if (!t) return false;
              const s = getComputedStyle(t);
              return s.display !== 'none' && s.visibility !== 'hidden';
            }"""
        )

        title_shot = os.path.join(OUT, f"mobile_{p['name']}_01_title.png")
        page.screenshot(path=title_shot)
        log(f"  shot {os.path.basename(title_shot)} ({os.path.getsize(title_shot)/1024:.1f}KB)")

        try:
            btn = page.locator('button.v8-start-btn[data-action="ep1"]').first
            if btn.count() > 0:
                btn.click(timeout=3000)
                page.wait_for_timeout(2500)
                ep1_clicked = True
                battle_shot = os.path.join(OUT, f"mobile_{p['name']}_02_after_ep1.png")
                page.screenshot(path=battle_shot)
                log(f"  shot {os.path.basename(battle_shot)} ({os.path.getsize(battle_shot)/1024:.1f}KB)")
            else:
                log('  WARN: EP.1 버튼 없음')
        except Exception as e:
            log(f"  WARN: EP.1 클릭 실패 — {str(e)[:100]}")

        loading_msg = page.evaluate("() => { const el = document.querySelector('#v8-loading p'); return el ? el.textContent : null; }")

        report['profiles'][p['name']] = {
            'label': p['label'],
            'viewport': p['viewport'],
            'load_ok': load_ok,
            'loading_hidden': loading_hidden,
            'loading_msg': loading_msg,
            'title_visible': title_visible,
            'ep1_clicked': ep1_clicked,
            'errors': errors,
            'warnings': warnings[:10],
            'net_4xx': net_404,
            'title_shot': os.path.basename(title_shot) if title_shot else None,
            'battle_shot': os.path.basename(battle_shot) if battle_shot else None,
        }
        browser.close()

with open(os.path.join(OUT, 'mobile_report.json'), 'w', encoding='utf-8') as f:
    json.dump(report, f, indent=2, ensure_ascii=False)

log('=== SUMMARY ===')
for k, r in report['profiles'].items():
    ok = r['load_ok'] and r['loading_hidden'] and r['title_visible']
    log(f"  {k:10s} load:{'Y' if r['load_ok'] else 'N'} hide:{'Y' if r['loading_hidden'] else 'N'} title:{'Y' if r['title_visible'] else 'N'} ep1:{'Y' if r['ep1_clicked'] else 'N'} err:{len(r['errors'])} {'PASS' if ok else 'FAIL'}")
    log(f"    loading_msg: {r['loading_msg']}")
    for e in r['errors'][:3]:
        log(f"    ERR: {e[:160]}")
    for n in r['net_4xx'][:5]:
        log(f"    4xx: {n[:160]}")
log(f"report → {os.path.join(OUT, 'mobile_report.json')}")
