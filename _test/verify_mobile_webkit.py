"""verify_mobile_webkit.py -- WebKit (iOS Safari engine) mobile v8-error reproduction.

Background:
  User reported a red #v8-error overlay on a real phone with message
  "going out the gate triggers an error". Chromium-based scripts
  (verify_mobile.py / verify_mobile_edge.py) all PASS with errors=0 and
  fail to reproduce. Hypothesis: the phone is an iPhone => real browser is
  iOS Safari = WebKit engine. WebGL2 / touch behavior differs from Chromium.
  Playwright can drive the WebKit engine via playwright.webkit.

This script:
  - launches playwright.webkit
  - iPhone 13 device profile (playwright.devices)
  - flow: opening_1/2 dialogue -> town_scene -> walk to gate(8,8) ->
    press A / exitScene -> next scene (tutorial)
  - extra scenarios:
      * virtual joystick real drag via TouchScreen (grab + rotate)
      * touchcancel during a drag (tap a 2nd point mid-drag)
      * viewport rotation portrait -> landscape
  - at every step: #v8-error visible? + innerText, console errors collected
  - screenshots saved to _test/webkit_*.png

Output:
  - _test/webkit_*.png
  - _test/webkit_report.json

ASCII-only logs (cp949-safe console). Sync Playwright API throughout.
"""
from playwright.sync_api import sync_playwright
import json, os, time

OUT = os.path.dirname(os.path.abspath(__file__))
BASE = 'http://localhost:8766/korean-rpg-v8.html?debug=1'


def now():
    return time.strftime('%H:%M:%S')


def log(m):
    print(f'[{now()}] {m}', flush=True)


# --- DOM helpers -------------------------------------------------

def _advance_dialogue_once(page):
    try:
        page.evaluate("""() => {
          const dlg = document.getElementById('v8-dialogue');
          if (dlg && dlg.classList.contains('v8-visible')) dlg.click();
        }""")
    except Exception:
        pass


def _dialogue_active(page):
    try:
        return page.evaluate("""() => {
          const dlg = document.getElementById('v8-dialogue');
          return !!(dlg && dlg.classList.contains('v8-visible'));
        }""")
    except Exception:
        return False


def _v8_error_state(page):
    """#v8-error visibility + full textContent."""
    try:
        return page.evaluate("""() => {
          const e = document.getElementById('v8-error');
          const m = document.getElementById('v8-error-msg');
          if (!e) return { visible: false, msg: '' };
          const visible = e.classList.contains('v8-visible') ||
                          (getComputedStyle(e).display !== 'none');
          return { visible, msg: (m ? m.textContent : '') };
        }""")
    except Exception as e:
        return {'visible': False, 'msg': '', 'probe_err': str(e)}


def _scene_info(page):
    try:
        return page.evaluate("""() => ({
          mode: window.__v8State?.mode || null,
          scene: window.__v8CurrentScene || null,
          lastTrigger: window.__lastTrigger || null,
          webgl: window.__webglState || null,
        })""")
    except Exception:
        return {}


def _last_pos(page):
    try:
        return page.evaluate("""() => {
          const lt = window.__lastTrigger || '';
          const m = /@(\\d+),(\\d+)/.exec(lt);
          return m ? { x: +m[1], y: +m[2] } : null;
        }""")
    except Exception:
        return None


def _press_key(page, key, hold_ms=120):
    """Dispatch KeyboardEvent down+up on window."""
    page.evaluate("""(k) => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));
    }""", key)
    page.wait_for_timeout(hold_ms)
    page.evaluate("""(k) => {
      window.dispatchEvent(new KeyboardEvent('keyup', { key: k, bubbles: true }));
    }""", key)


def _walk_player(page, key, times):
    """Direction key dispatch -- one grid step per call (180ms debounce aware)."""
    for _ in range(times):
        page.evaluate("""(k) => {
          window.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));
        }""", key)
        page.wait_for_timeout(130)
        page.evaluate("""(k) => {
          window.dispatchEvent(new KeyboardEvent('keyup', { key: k, bubbles: true }));
        }""", key)
        page.wait_for_timeout(250)


def _attach_listeners(page, bucket):
    def on_console(m):
        t = m.type
        if t == 'error':
            bucket['errors'].append(m.text)
        elif t == 'warning':
            bucket['warnings'].append(m.text)
    def on_pageerr(e):
        bucket['errors'].append('[pageerror] ' + (getattr(e, 'message', None) or str(e)))
    def on_resp(resp):
        try:
            if resp.status >= 400:
                bucket['net_4xx'].append(f"{resp.status} {resp.url}")
        except Exception:
            pass
    page.on('console', on_console)
    page.on('pageerror', on_pageerr)
    page.on('response', on_resp)


def _start_game(page, base=BASE, wait_loading=20000):
    page.goto(base, wait_until='domcontentloaded', timeout=25000)
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
    page.wait_for_timeout(900)
    try:
        btn = page.locator('button.v8-start-btn[data-action="ep1"]').first
        if btn.count() > 0:
            btn.click(timeout=4000)
            page.wait_for_timeout(1600)
            return True
    except Exception:
        pass
    return False


def _walk_to_town_phase(page, max_taps=45):
    """Advance opening_1/opening_2 dialogue until exploration scene reached."""
    for _ in range(max_taps):
        info = _scene_info(page)
        sc = str(info.get('scene') or '')
        if info.get('mode') == 'exploration' or 'exploration' in sc:
            return True
        _advance_dialogue_once(page)
        page.wait_for_timeout(230)
    return False


def _flush_dialogue(page, max_taps=25):
    for _ in range(max_taps):
        if not _dialogue_active(page):
            return True
        _advance_dialogue_once(page)
        page.wait_for_timeout(290)
    return False


def _player_pos(page):
    """Live player grid position. GameState is module-scoped but mirrored on
    State.game; State itself is not on window either. Fallback: parse the
    @x,y that _stepPlayer writes into __lastTrigger on every move."""
    return _last_pos(page)


# --- joystick geometry -------------------------------------------

def _joy_center(page):
    """Returns {cx,cy,visible} of #v8-joystick in CSS px."""
    try:
        return page.evaluate("""() => {
          const j = document.getElementById('v8-joystick');
          if (!j) return { visible: false };
          const r = j.getBoundingClientRect();
          const root = document.getElementById('v8-dpad-root');
          const onScreen = r.width > 0 && r.height > 0;
          const rootOn = root && getComputedStyle(root).display !== 'none';
          return {
            visible: !!(onScreen && rootOn),
            cx: r.left + r.width / 2,
            cy: r.top + r.height / 2,
            w: r.width, h: r.height,
          };
        }""")
    except Exception as e:
        return {'visible': False, 'err': str(e)}


def _dpad_a_center(page):
    try:
        return page.evaluate("""() => {
          const a = document.querySelector('#v8-dpad-ab .v8-dpad-a');
          if (!a) return null;
          const r = a.getBoundingClientRect();
          return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
        }""")
    except Exception:
        return None


# --- real touch events --------------------------------------------
# WebKit forbids `new Touch()` / `new TouchEvent()` in page JS
# (TypeError: Illegal constructor). Playwright's page.dispatch_event
# synthesizes a proper TouchEvent internally -> use that for the
# joystick touchstart/touchmove/touchend/touchcancel path.

def _touch(page, selector, kind, x, y):
    """Dispatch ONE touch phase on selector. kind: start|move|end|cancel."""
    name = {'start': 'touchstart', 'move': 'touchmove',
            'end': 'touchend', 'cancel': 'touchcancel'}[kind]
    # touchend/touchcancel: touches list is empty (finger lifted)
    touches = [] if kind in ('end', 'cancel') else [{'clientX': x, 'clientY': y}]
    page.dispatch_event(selector, name, {
        'cancelable': True,
        'bubbles': True,
        'touches': touches,
        'targetTouches': touches,
        'changedTouches': [{'clientX': x, 'clientY': y}],
    })


def _joy_drag(page, joy_sel, cx, cy, direction, count):
    """Grab the joystick and hold it in `direction` to walk `count` grid steps.
    direction: 'up'|'down'|'left'|'right'. One grab per step keeps it precise
    (joystick STEP_MS=180 would over-walk on a long single hold)."""
    off = {'up': (0, -46), 'down': (0, 46), 'left': (-46, 0), 'right': (46, 0)}[direction]
    for _ in range(count):
        _touch(page, joy_sel, 'start', cx, cy)
        _touch(page, joy_sel, 'move', cx + off[0], cy + off[1])
        page.wait_for_timeout(150)         # < STEP_MS so only the initial emit fires
        _touch(page, joy_sel, 'end', cx + off[0], cy + off[1])
        page.wait_for_timeout(260)         # move animation 220ms


# --- scenarios ---------------------------------------------------

def _new_ctx(pw, device):
    """WebKit browser + iPhone device context."""
    browser = pw.webkit.launch(headless=True)
    ctx = browser.new_context(**device)
    return browser, ctx


def scenario_W1_gate_exit(pw, device, label):
    """W1: opening -> town -> walk to gate(8,8) -> press A => exitScene -> tutorial.
    Pure keyboard-dispatch path on WebKit engine."""
    log(f"=== W1 gate-exit ({label}) ===")
    bucket = {'errors': [], 'warnings': [], 'net_4xx': []}
    browser, ctx = _new_ctx(pw, device)
    page = ctx.new_page()
    _attach_listeners(page, bucket)
    result = {'scenario': 'W1_gate_exit', 'profile': label, 'steps': [], 'final_error': None}
    try:
        ok = _start_game(page)
        result['steps'].append(f"start_ep1={ok}")
        in_town = _walk_to_town_phase(page)
        result['steps'].append(f"in_town={in_town}")
        result['steps'].append(f"webgl={_scene_info(page).get('webgl')}")
        page.wait_for_timeout(700)
        page.screenshot(path=os.path.join(OUT, 'webkit_W1_01_town_in.png'))

        if in_town:
            # playerStart (5,10). gate building 2x2 at (8,8)-(9,9).
            # route: right x3 -> (8,10), up x1 -> (8,9) adjacent to gate.
            _walk_player(page, 'ArrowRight', 4)
            result['steps'].append(f"after_right={_last_pos(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W1_02_after_right.png'))
            _walk_player(page, 'ArrowUp', 1)
            result['steps'].append(f"after_up={_last_pos(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W1_03_at_gate.png'))

            # press A (E key) at gate => exitTrigger match => _requestExit
            _press_key(page, 'e', hold_ms=300)
            page.wait_for_timeout(1400)
            result['steps'].append(f"after_press_A={_scene_info(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W1_04_after_A.png'))

            _flush_dialogue(page, max_taps=12)
            page.wait_for_timeout(2500)
            result['steps'].append(f"after_exit={_scene_info(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W1_05_next_scene.png'))

            # advance tutorial dialogue
            for _ in range(20):
                if not _dialogue_active(page):
                    break
                _advance_dialogue_once(page)
                page.wait_for_timeout(290)
            page.wait_for_timeout(2500)
            result['steps'].append(f"after_tutorial={_scene_info(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W1_06_battle.png'))

        err = _v8_error_state(page)
        result['final_error'] = err
        if err.get('visible'):
            log(f"  !!! v8-error visible: {err.get('msg','')[:300]}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W1_99_v8error.png'))
    except Exception as e:
        bucket['errors'].append(f'[scenario_exception] {e}')
    finally:
        result['console_errors'] = bucket['errors']
        result['warnings'] = bucket['warnings'][:12]
        result['net_4xx'] = bucket['net_4xx']
        browser.close()
    return result


def _tap(page, x, y):
    """A real finger tap: touchstart + touchend at the same point on <body>.
    Used for A/B buttons -- _bindButton binds touchstart/touchend."""
    # dispatch on the element under the point so the right listener fires
    sel = page.evaluate("""(p) => {
      const el = document.elementFromPoint(p.x, p.y);
      if (!el) return null;
      // tag the element so we can address it from dispatch_event
      el.setAttribute('data-wk-tap', '1');
      return '[data-wk-tap="1"]';
    }""", {'x': x, 'y': y})
    if not sel:
        return False
    _touch(page, sel, 'start', x, y)
    page.wait_for_timeout(60)
    _touch(page, sel, 'end', x, y)
    page.evaluate("""() => {
      const el = document.querySelector('[data-wk-tap="1"]');
      if (el) el.removeAttribute('data-wk-tap');
    }""")
    return True


def scenario_W2_joystick_drag(pw, device, label):
    """W2: real touch joystick drag on WebKit.
    opening -> town -> grab joystick, rotate to walk player toward gate
    via real TouchEvents (page.dispatch_event) on #v8-joystick, then press
    the A button by real touch -> gate exit. Exercises the dpad.js
    touchstart/touchmove/touchend joystick path on the WebKit engine."""
    log(f"=== W2 joystick-drag ({label}) ===")
    bucket = {'errors': [], 'warnings': [], 'net_4xx': []}
    browser, ctx = _new_ctx(pw, device)
    page = ctx.new_page()
    _attach_listeners(page, bucket)
    result = {'scenario': 'W2_joystick_drag', 'profile': label, 'steps': [], 'final_error': None}
    try:
        ok = _start_game(page)
        result['steps'].append(f"start_ep1={ok}")
        in_town = _walk_to_town_phase(page)
        result['steps'].append(f"in_town={in_town}")
        page.wait_for_timeout(800)
        page.screenshot(path=os.path.join(OUT, 'webkit_W2_01_town_in.png'))

        joy = _joy_center(page)
        result['steps'].append(f"joystick={joy}")
        log(f"  joystick: {joy}")

        JOY = '#v8-joystick'
        if in_town and joy.get('visible'):
            cx, cy = joy['cx'], joy['cy']

            # playerStart (5,10). gate building 2x2 at (8,8)-(9,9).
            # walk right 3 -> (8,10): directly below gate, distance 1 -> A works.
            _joy_drag(page, JOY, cx, cy, 'right', 3)
            result['steps'].append(f"after_drag_right={_last_pos(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W2_02_drag_right.png'))

            # nudge up 1 -> (8,9) adjacent to gate (in case 2x2 occupies (8,9))
            _joy_drag(page, JOY, cx, cy, 'up', 1)
            result['steps'].append(f"after_drag_up={_last_pos(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W2_03_drag_up.png'))

            # press A button via a real finger tap -> _tryInteract at gate
            a = _dpad_a_center(page)
            result['steps'].append(f"dpad_a={a}")
            if a:
                tapped = _tap(page, a['cx'], a['cy'])
                result['steps'].append(f"a_tapped={tapped}")
                page.wait_for_timeout(1400)
            result['steps'].append(f"after_A={_scene_info(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W2_04_after_A.png'))
            _flush_dialogue(page, max_taps=12)
            page.wait_for_timeout(2800)
            result['steps'].append(f"after_exit={_scene_info(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W2_05_after_exit.png'))

        err = _v8_error_state(page)
        result['final_error'] = err
        if err.get('visible'):
            log(f"  !!! v8-error visible: {err.get('msg','')[:300]}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W2_99_v8error.png'))
    except Exception as e:
        bucket['errors'].append(f'[scenario_exception] {e}')
    finally:
        result['console_errors'] = bucket['errors']
        result['warnings'] = bucket['warnings'][:12]
        result['net_4xx'] = bucket['net_4xx']
        browser.close()
    return result


def scenario_W3_touchcancel(pw, device, label):
    """W3: trigger touchcancel mid joystick drag.
    Hypothesis: dpad joystick touchcancel leaves the dpad DOM ref stuck /
    rafId leaking. Sequence: touchstart on joystick -> touchmove -> a 2nd
    touch elsewhere fires touchcancel -> then try to walk + press A."""
    log(f"=== W3 touchcancel ({label}) ===")
    bucket = {'errors': [], 'warnings': [], 'net_4xx': []}
    browser, ctx = _new_ctx(pw, device)
    page = ctx.new_page()
    _attach_listeners(page, bucket)
    result = {'scenario': 'W3_touchcancel', 'profile': label, 'steps': [], 'final_error': None}
    try:
        ok = _start_game(page)
        result['steps'].append(f"start_ep1={ok}")
        in_town = _walk_to_town_phase(page)
        result['steps'].append(f"in_town={in_town}")
        page.wait_for_timeout(800)
        page.screenshot(path=os.path.join(OUT, 'webkit_W3_01_town_in.png'))

        joy = _joy_center(page)
        result['steps'].append(f"joystick={joy}")

        JOY = '#v8-joystick'
        if in_town and joy.get('visible'):
            cx, cy = joy['cx'], joy['cy']

            # 1) start drag right, then abruptly fire touchcancel mid-drag
            #    (simulates an OS/system gesture stealing the touch).
            for i in range(3):
                _touch(page, JOY, 'start', cx, cy)
                _touch(page, JOY, 'move', cx + 46, cy)
                _touch(page, JOY, 'move', cx + 48, cy + 4)
                page.wait_for_timeout(300)
                _touch(page, JOY, 'cancel', cx + 48, cy + 4)  # touchcancel mid-drag
                page.wait_for_timeout(260)
            result['steps'].append(f"after_cancelled_drags={_last_pos(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W3_02_after_cancel.png'))

            # 2) after the touchcancel storm, is the joystick still responsive?
            #    grab again and walk a controlled route to the gate.
            #    playerStart (5,10) -> right 3 -> (8,10) below gate.
            _joy_drag(page, JOY, cx, cy, 'right', 3)
            result['steps'].append(f"after_recovery_drag={_last_pos(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W3_03_recovery.png'))

            _joy_drag(page, JOY, cx, cy, 'up', 1)
            result['steps'].append(f"after_up={_last_pos(page)}")

            # 3) interleave: start a drag and DON'T end it, then press A
            #    (touchstart still 'open' -> joystick active==true while A tapped).
            _touch(page, JOY, 'start', cx, cy)
            _touch(page, JOY, 'move', cx + 30, cy)
            a = _dpad_a_center(page)
            if a:
                _tap(page, a['cx'], a['cy'])
                page.wait_for_timeout(1400)
            _touch(page, JOY, 'cancel', cx + 30, cy)  # finally cancel the open drag
            result['steps'].append(f"after_A={_scene_info(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W3_04_after_A.png'))
            _flush_dialogue(page, max_taps=12)
            page.wait_for_timeout(2500)
            result['steps'].append(f"after_exit={_scene_info(page)}")

        err = _v8_error_state(page)
        result['final_error'] = err
        if err.get('visible'):
            log(f"  !!! v8-error visible: {err.get('msg','')[:300]}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W3_99_v8error.png'))
    except Exception as e:
        bucket['errors'].append(f'[scenario_exception] {e}')
    finally:
        result['console_errors'] = bucket['errors']
        result['warnings'] = bucket['warnings'][:12]
        result['net_4xx'] = bucket['net_4xx']
        browser.close()
    return result


def scenario_W4_rotate(pw, device, label):
    """W4: portrait -> landscape rotation mid-town, then walk + gate exit.
    Rotation re-fits the tactical camera; WebGL resize on WebKit may differ."""
    log(f"=== W4 rotate ({label}) ===")
    bucket = {'errors': [], 'warnings': [], 'net_4xx': []}
    browser = pw.webkit.launch(headless=True)
    # start portrait
    ctx = browser.new_context(**device)
    page = ctx.new_page()
    _attach_listeners(page, bucket)
    result = {'scenario': 'W4_rotate', 'profile': label, 'steps': [], 'final_error': None}
    try:
        ok = _start_game(page)
        result['steps'].append(f"start_ep1={ok}")
        in_town = _walk_to_town_phase(page)
        result['steps'].append(f"in_town={in_town}")
        page.wait_for_timeout(700)
        page.screenshot(path=os.path.join(OUT, 'webkit_W4_01_portrait.png'))

        # rotate: swap viewport w/h + fire resize + orientationchange
        vp = page.viewport_size
        page.set_viewport_size({'width': vp['height'], 'height': vp['width']})
        page.evaluate("""() => {
          window.dispatchEvent(new Event('resize'));
          window.dispatchEvent(new Event('orientationchange'));
        }""")
        page.wait_for_timeout(1400)
        result['steps'].append(f"after_rotate={_scene_info(page)}")
        page.screenshot(path=os.path.join(OUT, 'webkit_W4_02_landscape.png'))

        if in_town:
            _walk_player(page, 'ArrowRight', 4)
            _walk_player(page, 'ArrowUp', 1)
            result['steps'].append(f"after_walk={_last_pos(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W4_03_at_gate.png'))
            _press_key(page, 'e', hold_ms=300)
            page.wait_for_timeout(1400)
            _flush_dialogue(page, max_taps=12)
            page.wait_for_timeout(2500)
            result['steps'].append(f"after_exit={_scene_info(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W4_04_after_exit.png'))

        err = _v8_error_state(page)
        result['final_error'] = err
        if err.get('visible'):
            log(f"  !!! v8-error visible: {err.get('msg','')[:300]}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W4_99_v8error.png'))
    except Exception as e:
        bucket['errors'].append(f'[scenario_exception] {e}')
    finally:
        result['console_errors'] = bucket['errors']
        result['warnings'] = bucket['warnings'][:12]
        result['net_4xx'] = bucket['net_4xx']
        browser.close()
    return result


def scenario_W5_webgl_probe(pw, device, label):
    """W5: WebGL2 capability probe on the WebKit engine before/after load.
    Captures __webglState, renderer string, and whether THREE init throws.
    No interaction -- isolates a 'WebGL off' style v8-error path."""
    log(f"=== W5 webgl-probe ({label}) ===")
    bucket = {'errors': [], 'warnings': [], 'net_4xx': []}
    browser, ctx = _new_ctx(pw, device)
    page = ctx.new_page()
    _attach_listeners(page, bucket)
    result = {'scenario': 'W5_webgl_probe', 'profile': label, 'steps': [], 'final_error': None}
    try:
        page.goto(BASE, wait_until='domcontentloaded', timeout=25000)
        page.wait_for_timeout(1500)
        probe = page.evaluate("""() => {
          const out = {};
          try {
            const c = document.createElement('canvas');
            const gl2 = c.getContext('webgl2');
            const gl1 = c.getContext('webgl') || c.getContext('experimental-webgl');
            out.webgl2 = !!gl2;
            out.webgl1 = !!gl1;
            const gl = gl2 || gl1;
            if (gl) {
              const dbg = gl.getExtension('WEBGL_debug_renderer_info');
              out.renderer = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : 'masked';
              out.version = gl.getParameter(gl.VERSION);
              out.maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            }
          } catch (e) { out.err = String(e); }
          out.engineWebglState = window.__webglState || null;
          return out;
        }""")
        result['steps'].append(f"webgl_probe={probe}")
        log(f"  webgl probe: {probe}")
        # wait for loading to settle / error to surface
        page.wait_for_timeout(8000)
        result['steps'].append(f"scene_after_load={_scene_info(page)}")
        page.screenshot(path=os.path.join(OUT, 'webkit_W5_01_loaded.png'))
        err = _v8_error_state(page)
        result['final_error'] = err
        if err.get('visible'):
            log(f"  !!! v8-error visible: {err.get('msg','')[:300]}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W5_99_v8error.png'))
    except Exception as e:
        bucket['errors'].append(f'[scenario_exception] {e}')
    finally:
        result['console_errors'] = bucket['errors']
        result['warnings'] = bucket['warnings'][:12]
        result['net_4xx'] = bucket['net_4xx']
        browser.close()
    return result


def scenario_W6_gate_stress(pw, device, label):
    """W6: gate stress -- rapid A-spam at the gate + B button (ESC) + try to
    walk straight into the gate building tiles. Hits exitScene re-entrancy
    (multiple _requestExit), the B/ESC _requestExit('esc') path, and blocked
    movement into a 2x2 building. Matches 'going out the gate triggers error'."""
    log(f"=== W6 gate-stress ({label}) ===")
    bucket = {'errors': [], 'warnings': [], 'net_4xx': []}
    browser, ctx = _new_ctx(pw, device)
    page = ctx.new_page()
    _attach_listeners(page, bucket)
    result = {'scenario': 'W6_gate_stress', 'profile': label, 'steps': [], 'final_error': None}
    try:
        ok = _start_game(page)
        result['steps'].append(f"start_ep1={ok}")
        in_town = _walk_to_town_phase(page)
        result['steps'].append(f"in_town={in_town}")
        page.wait_for_timeout(800)
        page.screenshot(path=os.path.join(OUT, 'webkit_W6_01_town_in.png'))

        joy = _joy_center(page)
        JOY = '#v8-joystick'
        if in_town and joy.get('visible'):
            cx, cy = joy['cx'], joy['cy']
            # walk to (8,10) below the gate
            _joy_drag(page, JOY, cx, cy, 'right', 3)
            result['steps'].append(f"at_gate_below={_last_pos(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W6_02_at_gate.png'))

            # try to walk UP straight into the gate building tiles (blocked).
            # gate occupies (8,8)-(9,9); from (8,10) up is (8,9) gate tile.
            for _ in range(3):
                _joy_drag(page, JOY, cx, cy, 'up', 1)
            result['steps'].append(f"after_walk_into_gate={_last_pos(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W6_03_walk_into.png'))

            # rapid A-spam: _tryInteract / exitScene re-entrancy
            a = _dpad_a_center(page)
            result['steps'].append(f"dpad_a={a}")
            if a:
                for _ in range(6):
                    _tap(page, a['cx'], a['cy'])
                    page.wait_for_timeout(160)
            page.wait_for_timeout(1200)
            result['steps'].append(f"after_A_spam={_scene_info(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W6_04_after_A_spam.png'))

            # press B (ESC) -> _requestExit('esc') during/after the depart
            b = page.evaluate("""() => {
              const el = document.querySelector('#v8-dpad-ab .v8-dpad-b');
              if (!el) return null;
              const r = el.getBoundingClientRect();
              return { cx: r.left + r.width/2, cy: r.top + r.height/2 };
            }""")
            result['steps'].append(f"dpad_b={b}")
            if b:
                _tap(page, b['cx'], b['cy'])
                page.wait_for_timeout(800)
            result['steps'].append(f"after_B={_scene_info(page)}")

            _flush_dialogue(page, max_taps=15)
            page.wait_for_timeout(3000)
            result['steps'].append(f"after_settle={_scene_info(page)}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W6_05_settle.png'))

        err = _v8_error_state(page)
        result['final_error'] = err
        if err.get('visible'):
            log(f"  !!! v8-error visible: {err.get('msg','')[:300]}")
            page.screenshot(path=os.path.join(OUT, 'webkit_W6_99_v8error.png'))
    except Exception as e:
        bucket['errors'].append(f'[scenario_exception] {e}')
    finally:
        result['console_errors'] = bucket['errors']
        result['warnings'] = bucket['warnings'][:12]
        result['net_4xx'] = bucket['net_4xx']
        browser.close()
    return result


# --- main --------------------------------------------------------

def main():
    report = {'url': BASE, 'engine': 'webkit', 'results': []}
    with sync_playwright() as pw:
        iphone13 = pw.devices['iPhone 13']
        iphone_se = pw.devices['iPhone SE']
        log(f"iPhone 13 device profile: viewport={iphone13.get('viewport')} "
            f"dpr={iphone13.get('device_scale_factor')} "
            f"mobile={iphone13.get('is_mobile')} touch={iphone13.get('has_touch')}")
        log(f"iPhone SE device profile: viewport={iphone_se.get('viewport')} "
            f"dpr={iphone_se.get('device_scale_factor')}")

        report['device'] = {
            'name': 'iPhone 13',
            'viewport': iphone13.get('viewport'),
            'dpr': iphone13.get('device_scale_factor'),
            'ua': iphone13.get('user_agent'),
        }

        # W5 first: pure WebGL capability probe (cheapest, isolates GL path)
        report['results'].append(scenario_W5_webgl_probe(pw, iphone13, 'iPhone 13'))
        # W1: keyboard-dispatch gate exit
        report['results'].append(scenario_W1_gate_exit(pw, iphone13, 'iPhone 13'))
        # W2: real touch joystick drag to the gate
        report['results'].append(scenario_W2_joystick_drag(pw, iphone13, 'iPhone 13'))
        # W3: touchcancel storm mid-drag
        report['results'].append(scenario_W3_touchcancel(pw, iphone13, 'iPhone 13'))
        # W4: portrait->landscape rotation then gate exit
        report['results'].append(scenario_W4_rotate(pw, iphone13, 'iPhone 13'))
        # W6: gate stress -- A-spam + B/ESC + walk into gate building
        report['results'].append(scenario_W6_gate_stress(pw, iphone13, 'iPhone 13'))
        # W7: iPhone SE (small viewport) gate exit -- W6 stress repeated
        report['results'].append(scenario_W6_gate_stress(pw, iphone_se, 'iPhone SE'))

    out_path = os.path.join(OUT, 'webkit_report.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    log('=== SUMMARY ===')
    for r in report['results']:
        fe = r.get('final_error') or {}
        visible = fe.get('visible', False)
        tag = 'V8ERR' if visible else 'no_err'
        errs = len(r.get('console_errors', []))
        log(f"  {r['scenario']:22s} {r['profile']:12s} {tag:6s} console_errors={errs}")
        for s in r.get('steps', []):
            log(f"    step: {s}")
        if visible:
            head = (fe.get('msg') or '').replace('\n', ' | ')
            log(f"    v8-error msg: {head}")
        for e in r.get('console_errors', [])[:8]:
            log(f"    ERR: {str(e)[:240]}")
        for n in r.get('net_4xx', [])[:6]:
            log(f"    4xx: {str(n)[:200]}")
    log(f"report -> {out_path}")


if __name__ == '__main__':
    main()
