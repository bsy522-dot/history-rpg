"""verify_mobile_edge.py — 모바일 edge-case 시나리오로 v8-error 재현 시도.

verify_mobile.py가 errors=[] PASS한 케이스 외에 사용자 보고한 '문밖으로 나가려니깐 오류'
재현을 위한 4개 edge 시나리오:

 A. 마을 진입 후 남쪽 외곽(autoFence gate)으로 이동·gate 건물 상호작용 시도
 B. portrait PNG 라우팅 — assets/portraits/*.png 를 404로 강제 후 hwanwoong dialogue
 C. portrait → landscape viewport 회전 후 dpad 사용
 D. iPhone SE 320x568 (작은 viewport) 에서 시나리오 A 반복

각 시나리오에서:
 - console errors 누적
 - #v8-error visible? + innerText 캡처
 - 진행 단계마다 screenshot

출력:
 - _test/edge_<scenario>_*.png
 - _test/edge_report.json
"""
from playwright.sync_api import sync_playwright
import json, os, time

OUT = r'D:\AI\04_게임\한국사RPG\_test'
BASE = 'http://localhost:8766/korean-rpg-v8.html?debug=1'

def now():
    return time.strftime('%H:%M:%S')

def log(m):
    # cp949 safe — ASCII only
    print(f'[{now()}] {m}', flush=True)

# ─── 공통 헬퍼 ────────────────────────────────────────────

def _advance_dialogue_once(page):
    """한 번 dialogue를 클릭해서 다음 line 진행."""
    try:
        page.evaluate("""() => {
          const dlg = document.getElementById('v8-dialogue');
          if (dlg && dlg.classList.contains('v8-visible')) dlg.click();
        }""")
    except Exception:
        pass

def _dialogue_active(page):
    return page.evaluate("""() => {
      const dlg = document.getElementById('v8-dialogue');
      return !!(dlg && dlg.classList.contains('v8-visible'));
    }""")

def _v8_error_state(page):
    """#v8-error 가시여부 + textContent 반환."""
    return page.evaluate("""() => {
      const e = document.getElementById('v8-error');
      const m = document.getElementById('v8-error-msg');
      if (!e) return { visible: false, msg: '' };
      const visible = e.classList.contains('v8-visible') ||
                      (getComputedStyle(e).display !== 'none');
      return { visible, msg: (m ? m.textContent : '') };
    }""")

def _scene_info(page):
    return page.evaluate("""() => ({
      mode: window.__v8State?.mode || null,
      scene: window.__v8CurrentScene || null,
      lastTrigger: window.__lastTrigger || null,
    })""")

def _last_pos(page):
    """__lastTrigger '_stepPlayer(dx,dy)@x,y' 에서 x,y 파싱.
    이동/interact가 _lastTrigger를 갱신하므로 _stepPlayer 갱신 후가 의미 있음."""
    return page.evaluate("""() => {
      const lt = window.__lastTrigger || '';
      const m = /@(\\d+),(\\d+)/.exec(lt);
      return m ? { x: +m[1], y: +m[2] } : null;
    }""")

def _press_key(page, key, hold_ms=80):
    """KeyboardEvent dispatch (down + up) — 모바일 emulation에서도 동작."""
    page.evaluate(f"""(args) => {{
      const ev = new KeyboardEvent('keydown', {{ key: args.key, bubbles: true }});
      window.dispatchEvent(ev);
    }}""", { 'key': key })
    page.wait_for_timeout(hold_ms)
    page.evaluate(f"""(args) => {{
      const ev = new KeyboardEvent('keyup', {{ key: args.key, bubbles: true }});
      window.dispatchEvent(ev);
    }}""", { 'key': key })

def _walk_to_town_phase(page, max_taps=40):
    """opening_1, opening_2 dialogue advance → town_scene 진입까지.
    반환: True if town에 도착."""
    for i in range(max_taps):
        info = _scene_info(page)
        if info['mode'] == 'exploration' or (info['scene'] and 'exploration' in str(info['scene'])):
            return True
        _advance_dialogue_once(page)
        page.wait_for_timeout(220)
    return False

def _walk_player(page, key, times):
    """방향키 dispatch — 한 번 호출에 한 칸씩 이동 보장.
    stepTickWrapper의 180ms 디바운스를 회피해 정확히 N step 발생시키려면
    각 step 사이에 lastStepTime 디바운스 (180ms) 이상 + INPUT_GRACE 고려해 200ms 짧게 hold."""
    for _ in range(times):
        page.evaluate("""(k) => {
          window.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));
        }""", key)
        # 120ms hold (1번만 stepTick에 잡히도록 짧게)
        page.wait_for_timeout(120)
        page.evaluate("""(k) => {
          window.dispatchEvent(new KeyboardEvent('keyup', { key: k, bubbles: true }));
        }""", key)
        # debounce + 애니메이션 220ms — 충분히 대기 (총 cycle 약 360ms)
        page.wait_for_timeout(240)


# ─── 시나리오 실행 ───────────────────────────────────────

def _make_context(pw, profile):
    browser = pw.chromium.launch(
        headless=True,
        args=['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
    )
    ctx = browser.new_context(
        viewport=profile['viewport'],
        device_scale_factor=profile.get('dpr', 2),
        is_mobile=profile.get('mobile', True),
        has_touch=True,
    )
    return browser, ctx

def _attach_listeners(page, bucket):
    def on_console(m):
        t = m.type
        if t == 'error':
            bucket['errors'].append(m.text)
        elif t == 'warning':
            bucket['warnings'].append(m.text)
    def on_pageerr(e):
        bucket['errors'].append('[pageerror] ' + (e.message or str(e)))
    def on_resp(resp):
        if resp.status >= 400:
            bucket['net_4xx'].append(f"{resp.status} {resp.url}")
    page.on('console', on_console)
    page.on('pageerror', on_pageerr)
    page.on('response', on_resp)

def _start_game(page, base=BASE, wait_loading=12000):
    page.goto(base, wait_until='domcontentloaded', timeout=15000)
    try:
        page.wait_for_function(
            """() => {
              const el = document.getElementById('v8-loading');
              if (!el) return true;
              const s = getComputedStyle(el);
              return s.display === 'none' || s.visibility === 'hidden';
            }""",
            timeout=wait_loading,
        )
    except Exception:
        pass
    page.wait_for_timeout(800)
    # 타이틀 → EP.1
    try:
        btn = page.locator('button.v8-start-btn[data-action="ep1"]').first
        if btn.count() > 0:
            btn.click(timeout=3000)
            page.wait_for_timeout(1500)
            return True
    except Exception:
        pass
    return False

def _flush_dialogue(page, max_taps=20):
    """대화 활성이면 끝까지 advance."""
    for _ in range(max_taps):
        if not _dialogue_active(page): return True
        _advance_dialogue_once(page)
        page.wait_for_timeout(280)
    return False

def scenario_A_south_gate(pw, profile, label, out_prefix):
    """A: 마을 진입 → council 미완 상태로 gate (8,8) 인접 도달 → A버튼 = ep1_depart (ifNotMet) → gatekeeper 대화."""
    log(f"=== Scenario A ({label}) ===")
    bucket = {'errors': [], 'warnings': [], 'net_4xx': []}
    browser, ctx = _make_context(pw, profile)
    page = ctx.new_page()
    _attach_listeners(page, bucket)

    result = {'scenario': 'A_south_gate', 'profile': label, 'steps': [], 'final_error': None}
    try:
        ok = _start_game(page)
        result['steps'].append(f"start_ep1={ok}")
        in_town = _walk_to_town_phase(page)
        result['steps'].append(f"in_town={in_town}")
        page.wait_for_timeout(700)
        shot = os.path.join(OUT, f"{out_prefix}_01_town_in.png")
        page.screenshot(path=shot)

        if in_town:
            # playerStart (5,10) → 우측으로 3칸 → (8,10). 거기서 위로 1칸 → (8,9) (gate 인접)
            # 단, (5,8) campfire_s 와 (8,8) gate 등 빌딩 통과 안되므로 우측 이동 시도.
            _walk_player(page, 'ArrowRight', 4)  # (5,10)→(6,10)→(7,10)→(8,10)→(9,10)
            pos = _last_pos(page)
            result['steps'].append(f"after_right4={pos}")
            shot2 = os.path.join(OUT, f"{out_prefix}_02_after_right.png")
            page.screenshot(path=shot2)

            _walk_player(page, 'ArrowUp', 1)  # (8,10)→(8,9) — gate (8,8) 인접 distance=1
            pos = _last_pos(page)
            result['steps'].append(f"after_up1={pos}")
            shot3 = os.path.join(OUT, f"{out_prefix}_03_at_gate_adjacent.png")
            page.screenshot(path=shot3)

            # A버튼 (E key) → _tryInteract → ep1_depart (council 미완 → gatekeeper)
            _press_key(page, 'e', hold_ms=250)
            page.wait_for_timeout(1200)
            info_after = _scene_info(page)
            result['steps'].append(f"after_press_A={info_after}")
            shot4 = os.path.join(OUT, f"{out_prefix}_04_after_press_A.png")
            page.screenshot(path=shot4)

            _flush_dialogue(page, max_taps=10)
            page.wait_for_timeout(500)

        err = _v8_error_state(page)
        result['final_error'] = err
        if err['visible']:
            log(f"  !!! v8-error visible — msg head: {err['msg'][:200]}")
            shot_err = os.path.join(OUT, f"{out_prefix}_99_v8error.png")
            page.screenshot(path=shot_err)
    except Exception as e:
        bucket['errors'].append(f'[scenario_exception] {e}')
    finally:
        result['console_errors'] = bucket['errors']
        result['warnings'] = bucket['warnings'][:10]
        result['net_4xx'] = bucket['net_4xx']
        browser.close()
    return result


def scenario_A2_council_then_exit(pw, profile, label, out_prefix, route_portrait_404=False):
    """A2: council 먼저 → council_done → gate (8,8) → ep1_depart (ifMet) → exitScene → 다음 씬 진입 검증.
    route_portrait_404=True 면 portrait PNG를 강제 404."""
    log(f"=== Scenario A2 ({label}) council->gate->exit route404={route_portrait_404} ===")
    bucket = {'errors': [], 'warnings': [], 'net_4xx': []}
    browser, ctx = _make_context(pw, profile)
    page = ctx.new_page()
    _attach_listeners(page, bucket)

    if route_portrait_404:
        def _route_404(route, request):
            if '/assets/portraits/' in request.url and request.url.endswith('.png'):
                route.fulfill(status=404, body='')
            else:
                route.continue_()
        page.route('**/*', _route_404)

    label_full = label + ('+404' if route_portrait_404 else '')
    result = {'scenario': 'A2_council_exit', 'profile': label_full, 'steps': [], 'final_error': None}
    try:
        ok = _start_game(page)
        result['steps'].append(f"start_ep1={ok}")
        in_town = _walk_to_town_phase(page)
        result['steps'].append(f"in_town={in_town}")
        page.wait_for_timeout(700)
        shot = os.path.join(OUT, f"{out_prefix}_01_town_in.png")
        page.screenshot(path=shot)

        if in_town:
            # playerStart (5,10) → (5,9) (위 1, building_floor) → (4,9) (좌 1) → (4,8)(4,7)(4,6)(4,5)(4,4) (위 5).
            # (4,4) 에서 pungbaek (3,4) 인접 distance=1 → ep1_council 발화.
            _walk_player(page, 'ArrowUp', 1)
            _walk_player(page, 'ArrowLeft', 1)
            _walk_player(page, 'ArrowUp', 5)
            pos = _last_pos(page)
            result['steps'].append(f"after_walk_to_council={pos}")
            shot2 = os.path.join(OUT, f"{out_prefix}_02_at_council.png")
            page.screenshot(path=shot2)

            # A 시도 (council trigger 발화)
            _press_key(page, 'e', hold_ms=250)
            page.wait_for_timeout(1200)
            info_pre = _scene_info(page)
            result['steps'].append(f"after_press_A_council={info_pre}")
            flushed = _flush_dialogue(page, max_taps=30)
            result['steps'].append(f"council_flushed={flushed}")
            page.wait_for_timeout(800)
            shot3 = os.path.join(OUT, f"{out_prefix}_03_council_done.png")
            page.screenshot(path=shot3)

            # 이제 gate (8,8) — 현재 (4,4) 부근. 우로 4 → 아래로 5 정도. 단 sindansu (5,5,2x2)와 campfire_n (6,3) 등 우회.
            # (4,4) → (4,5) → 차단 sindansu 점유 (5,5),(6,5),(5,6),(6,6). (4,5) 자유.
            # 우회: (4,4) → 위로 1 → (4,3) → (5,3) 차단? terrain[3][5]=2 road. campfire_n(6,3) 차단. (5,3) → (6,3) 차단 → 우 stop.
            # → 아래 (5,3)→(5,4): hwanwoong_npc (6,4) 인접. (5,4): no building no npc 통과. → (5,5) 차단.
            # 깔끔한 경로: (4,4) → 아래 5칸 → (4,9) → 우 4 → (8,9) 기대. building map에서 (8,9)는 gate 일부 → 차단.
            # 인접에서 멈춤: (7,9) 또는 (8,10).
            _walk_player(page, 'ArrowDown', 5)
            _walk_player(page, 'ArrowRight', 5)
            pos2 = _last_pos(page)
            result['steps'].append(f"after_walk_to_gate={pos2}")
            shot4 = os.path.join(OUT, f"{out_prefix}_04_at_gate.png")
            page.screenshot(path=shot4)

            # A 누르기 → ep1_depart (council_done set이면 ifMet → exitScene)
            _press_key(page, 'e', hold_ms=250)
            page.wait_for_timeout(1200)
            info_gate = _scene_info(page)
            result['steps'].append(f"after_press_A_gate={info_gate}")
            shot5 = os.path.join(OUT, f"{out_prefix}_05_after_gate_A.png")
            page.screenshot(path=shot5)

            # 출진 dialogue 끝까지 → exitScene → 다음 씬 (전투?) 진입
            flushed2 = _flush_dialogue(page, max_taps=10)
            result['steps'].append(f"depart_flushed={flushed2}")
            page.wait_for_timeout(3000)
            info_final = _scene_info(page)
            result['steps'].append(f"after_exitScene={info_final}")
            shot6 = os.path.join(OUT, f"{out_prefix}_06_after_exit.png")
            page.screenshot(path=shot6)

            # 다음 씬 (tutorial 5 lines) 진행 → battle 시작
            for _ in range(20):
                if not _dialogue_active(page): break
                _advance_dialogue_once(page)
                page.wait_for_timeout(280)
            page.wait_for_timeout(2500)
            info_battle = _scene_info(page)
            result['steps'].append(f"after_tutorial={info_battle}")
            shot7 = os.path.join(OUT, f"{out_prefix}_07_battle_in.png")
            page.screenshot(path=shot7)

        err = _v8_error_state(page)
        result['final_error'] = err
        if err['visible']:
            log(f"  !!! v8-error visible — msg head: {err['msg'][:200]}")
            shot_err = os.path.join(OUT, f"{out_prefix}_99_v8error.png")
            page.screenshot(path=shot_err)
    except Exception as e:
        bucket['errors'].append(f'[scenario_exception] {e}')
    finally:
        result['console_errors'] = bucket['errors']
        result['warnings'] = bucket['warnings'][:10]
        result['net_4xx'] = bucket['net_4xx']
        browser.close()
    return result


def scenario_B_portrait_404(pw, profile, label, out_prefix):
    """B: assets/portraits/*.png 를 강제 404로 응답 → opening 대화 → town → 환웅 NPC 대화까지."""
    log(f"=== Scenario B ({label}) portrait 404 ===")
    bucket = {'errors': [], 'warnings': [], 'net_4xx': []}
    browser, ctx = _make_context(pw, profile)
    page = ctx.new_page()
    _attach_listeners(page, bucket)

    # 404 라우팅 — assets/portraits/*.png 모두 404
    def _route_404(route, request):
        if '/assets/portraits/' in request.url and request.url.endswith('.png'):
            route.fulfill(status=404, body='')
        else:
            route.continue_()
    page.route('**/*', _route_404)

    result = {'scenario': 'B_portrait_404', 'profile': label, 'steps': [], 'final_error': None}
    try:
        ok = _start_game(page)
        result['steps'].append(f"start_ep1={ok}")
        in_town = _walk_to_town_phase(page)
        result['steps'].append(f"in_town={in_town}")
        page.wait_for_timeout(700)
        shot = os.path.join(OUT, f"{out_prefix}_01_after_opening.png")
        page.screenshot(path=shot)

        if in_town:
            # (5,10) → 위1 → (5,9) → 좌1 → (4,9) → 위5 → (4,4) → 우1 → (5,4). 환웅 (6,4) 인접 distance=1.
            _walk_player(page, 'ArrowUp', 1)
            _walk_player(page, 'ArrowLeft', 1)
            _walk_player(page, 'ArrowUp', 5)
            _walk_player(page, 'ArrowRight', 1)
            pos = _last_pos(page)
            result['steps'].append(f"near_hwanwoong={pos}")
            _press_key(page, 'e', hold_ms=250)
            page.wait_for_timeout(1500)
            info = _scene_info(page)
            result['steps'].append(f"after_press_A={info}")
            shot2 = os.path.join(OUT, f"{out_prefix}_02_hwanwoong_dialogue.png")
            page.screenshot(path=shot2)
            _flush_dialogue(page, max_taps=15)
            page.wait_for_timeout(500)

        err = _v8_error_state(page)
        result['final_error'] = err
        # 4xx 발생 카운트
        portrait_404_count = sum(1 for u in bucket['net_4xx'] if '/assets/portraits/' in u)
        result['portrait_404_count'] = portrait_404_count
        if err['visible']:
            log(f"  !!! v8-error visible — msg head: {err['msg'][:200]}")
            shot_err = os.path.join(OUT, f"{out_prefix}_99_v8error.png")
            page.screenshot(path=shot_err)
    except Exception as e:
        bucket['errors'].append(f'[scenario_exception] {e}')
    finally:
        result['console_errors'] = bucket['errors']
        result['warnings'] = bucket['warnings'][:10]
        result['net_4xx'] = bucket['net_4xx']
        browser.close()
    return result


def scenario_C_rotate(pw, profile_portrait, profile_landscape, label, out_prefix):
    """C: portrait 시작 → town 진입 후 viewport 를 landscape로 회전 → dpad 사용."""
    log(f"=== Scenario C ({label}) portrait->landscape rotate ===")
    bucket = {'errors': [], 'warnings': [], 'net_4xx': []}
    browser = pw.chromium.launch(
        headless=True,
        args=['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
    )
    ctx = browser.new_context(
        viewport=profile_portrait['viewport'],
        device_scale_factor=profile_portrait.get('dpr', 2),
        is_mobile=True,
        has_touch=True,
    )
    page = ctx.new_page()
    _attach_listeners(page, bucket)

    result = {'scenario': 'C_rotate', 'profile': label, 'steps': [], 'final_error': None}
    try:
        ok = _start_game(page)
        result['steps'].append(f"start_ep1={ok}")
        in_town = _walk_to_town_phase(page)
        result['steps'].append(f"in_town={in_town}")
        shot = os.path.join(OUT, f"{out_prefix}_01_town_portrait.png")
        page.screenshot(path=shot)

        # 회전 — viewport 변경 + resize event 강제
        page.set_viewport_size(profile_landscape['viewport'])
        page.evaluate("""() => { window.dispatchEvent(new Event('resize')); }""")
        page.wait_for_timeout(1200)
        shot2 = os.path.join(OUT, f"{out_prefix}_02_after_rotate.png")
        page.screenshot(path=shot2)
        info = _scene_info(page)
        result['steps'].append(f"after_rotate={info}")

        if in_town:
            _walk_player(page, 'ArrowDown', 2)
            _walk_player(page, 'ArrowRight', 2)
            shot3 = os.path.join(OUT, f"{out_prefix}_03_after_walk.png")
            page.screenshot(path=shot3)

        err = _v8_error_state(page)
        result['final_error'] = err
        if err['visible']:
            log(f"  !!! v8-error visible — msg head: {err['msg'][:200]}")
            shot_err = os.path.join(OUT, f"{out_prefix}_99_v8error.png")
            page.screenshot(path=shot_err)
    except Exception as e:
        bucket['errors'].append(f'[scenario_exception] {e}')
    finally:
        result['console_errors'] = bucket['errors']
        result['warnings'] = bucket['warnings'][:10]
        result['net_4xx'] = bucket['net_4xx']
        browser.close()
    return result


# ─── 메인 ────────────────────────────────────────────

PROFILES = {
    'iphone12':    {'viewport': {'width': 390, 'height': 844}, 'dpr': 3, 'mobile': True},
    'iphone12_ls': {'viewport': {'width': 844, 'height': 390}, 'dpr': 3, 'mobile': True},
    'iphone_se':   {'viewport': {'width': 320, 'height': 568}, 'dpr': 2, 'mobile': True},
    'galaxy_fold': {'viewport': {'width': 280, 'height': 653}, 'dpr': 3, 'mobile': True},
}

def main():
    report = {'url': BASE, 'results': []}
    with sync_playwright() as pw:
        # A. iphone12에서 council 미완 상태로 gate 인접 A 버튼 (ifNotMet → gatekeeper)
        report['results'].append(scenario_A_south_gate(pw, PROFILES['iphone12'], 'iPhone12', 'edge_A_iphone12'))
        # A2. iphone12에서 council → gate → exitScene (ifMet) 까지
        report['results'].append(scenario_A2_council_then_exit(pw, PROFILES['iphone12'], 'iPhone12', 'edge_A2_iphone12'))
        # B. iphone12에서 portrait 404 라우팅 (환웅 NPC 대화 시 image 404)
        report['results'].append(scenario_B_portrait_404(pw, PROFILES['iphone12'], 'iPhone12', 'edge_B_iphone12_404'))
        # C. iphone12 portrait → landscape rotate
        report['results'].append(scenario_C_rotate(pw, PROFILES['iphone12'], PROFILES['iphone12_ls'], 'iPhone12_rotate', 'edge_C_rotate'))
        # D. iphone SE 작은 viewport 남쪽 게이트
        report['results'].append(scenario_A_south_gate(pw, PROFILES['iphone_se'], 'iPhone SE 320x568', 'edge_D_iphone_se'))
        # E. galaxy fold (280px) — 매우 작은
        report['results'].append(scenario_A_south_gate(pw, PROFILES['galaxy_fold'], 'Galaxy Fold 280x653', 'edge_E_fold'))
        # F. iphone SE 에서 A2 (council->gate)
        report['results'].append(scenario_A2_council_then_exit(pw, PROFILES['iphone_se'], 'iPhone SE 320x568', 'edge_F_se_a2'))
        # G. iphone12 A2 + portrait 404 — battle cutin 등에서 PNG 요청 → 404 시 영향
        report['results'].append(scenario_A2_council_then_exit(pw, PROFILES['iphone12'], 'iPhone12+404', 'edge_G_ip12_a2_404', route_portrait_404=True))

    out_path = os.path.join(OUT, 'edge_report.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    log('=== SUMMARY ===')
    for r in report['results']:
        fe = r.get('final_error') or {}
        visible = fe.get('visible', False)
        ok = 'V8ERR' if visible else 'no_err'
        errs = len(r.get('console_errors', []))
        p404 = r.get('portrait_404_count', None)
        extra = f" p404={p404}" if p404 is not None else ''
        log(f"  {r['scenario']:24s} {r['profile']:24s} {ok:6s} console_errors={errs}{extra}")
        for s in r.get('steps', []):
            log(f"    step: {s}")
        if visible:
            head = (fe.get('msg') or '')[:400].replace('\n', ' | ')
            log(f"    v8-error msg: {head}")
        for e in r.get('console_errors', [])[:5]:
            log(f"    ERR: {str(e)[:200]}")
        for n in r.get('net_4xx', [])[:5]:
            log(f"    4xx: {str(n)[:200]}")
    log(f"report -> {out_path}")

if __name__ == '__main__':
    main()
