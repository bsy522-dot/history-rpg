# -*- coding: utf-8 -*-
"""
한국사RPG Phase F - EP.1 캐릭터 5체 + 마을 건물 3종 일괄 자동 생성
ComfyUI Z-Image Turbo로 8개 2D 이미지 순차 생성.
다음 단계 (Hunyuan3D 변환)는 별도 스크립트로.

출력: E:/AI/ComfyUI_Output/history_comic/{key}.png
"""
import json
import time
import urllib.request
import urllib.parse
from pathlib import Path

HOST = "127.0.0.1:8188"
CLIENT_ID = "claude-phase-f-batch"
WORKFLOW = Path("D:/AI/08_컨텐츠/workflows/history_comic/zimage_korean.json")
OUT_DIR = Path("E:/AI/ComfyUI_Output/history_comic")

PER_TIMEOUT = 600        # 1체당 10분 timeout
QUEUE_RETRY = 6
QUEUE_RETRY_INTERVAL = 30

NEG = "modern clothing, western style, low quality, multiple figures, blurry, dynamic pose, complex background, low res, watermark"

# ─── 프롬프트 (역사고증 + image-to-3D 친화: T-pose, neutral background) ───
ASSETS = [
    ("hwanoong",
     "ancient Korean warrior Hwanoong, Bronze Age tribal leader, traditional Korean bronze armor, mandolin sword, hanbok beneath armor, divine descent from heaven theme, full body T-pose, front view, neutral grey background, ink painting style, museum quality, single character"),
    ("dangun",
     "ancient Korean king Dangun Wanggeom, founder of Gojoseon kingdom 2333 BC, traditional bronze armor with embroidered hanbok, wooden staff, regal pose, wise elder, full body T-pose, front view, neutral grey background, ink painting style, single character"),
    ("wiman",
     "ancient Korean general Wiman, Han dynasty refugee turned king of Wiman Joseon 194 BC, bronze armor with iron accents, scholarly warrior, full body T-pose, front view, neutral grey background, ink painting style, single character"),
    ("bear_woman",
     "Korean mythology Ungnyeo bear-turned-woman, mother of Dangun, traditional white hanbok, gentle expression, long black hair, full body T-pose, front view, neutral grey background, ink painting style, single character"),
    ("tiger_chief",
     "Korean mythology Bronze Age tiger tribe chieftain, fierce warrior with tiger fur cape, bone necklace, leather armor, stone axe, full body T-pose, front view, neutral grey background, ink painting style, single character"),
    ("dolmen",
     "Korean Bronze Age dolmen tomb monument, two stone supports with massive flat capstone, ancient megalithic structure, weathered grey granite, isolated on neutral grey background, side view, ink painting style"),
    ("hut",
     "ancient Korean Bronze Age circular wooden hut, thatched conical roof, wooden post entrance, simple primitive dwelling, isolated on neutral grey background, three-quarter view, ink painting style"),
    ("godtree",
     "Korean mythology Sindansu divine sandalwood tree, massive ancient tree with twisted branches, sacred shamanic shrine, prayer ribbons hanging, isolated on neutral grey background, ink painting style"),
]


def gen_one(key: str, prompt: str) -> bool:
    out_path = OUT_DIR / f"{key}.png"
    if out_path.exists() and out_path.stat().st_size > 10_000:
        print(f"[batch] {key} already exists ({out_path.stat().st_size//1024} KB) — skip")
        return True

    wf = json.loads(WORKFLOW.read_text(encoding="utf-8"))
    wf["6"]["inputs"]["text"] = prompt
    wf["7"]["inputs"]["text"] = NEG
    wf["3"]["inputs"]["seed"] = 42 + sum(ord(c) for c in key)  # 결정적 seed
    wf["5"]["inputs"]["width"] = 1024
    wf["5"]["inputs"]["height"] = 1024
    wf["9"]["inputs"]["filename_prefix"] = f"history_comic/{key}"

    # Queue (재시도)
    data = json.dumps({"prompt": wf, "client_id": f"{CLIENT_ID}-{key}"}).encode("utf-8")
    prompt_id = None
    for attempt in range(QUEUE_RETRY):
        try:
            req = urllib.request.Request(
                f"http://{HOST}/prompt",
                data=data,
                headers={"Content-Type": "application/json"},
            )
            with urllib.request.urlopen(req, timeout=20) as r:
                resp = json.loads(r.read())
            prompt_id = resp.get("prompt_id")
            if prompt_id:
                print(f"[batch] {key} queued {prompt_id} (attempt {attempt+1})")
                break
        except Exception as e:
            print(f"[batch] {key} queue {attempt+1}/{QUEUE_RETRY} fail: {e}")
            if attempt < QUEUE_RETRY - 1:
                time.sleep(QUEUE_RETRY_INTERVAL)
    if not prompt_id:
        print(f"[batch] {key} FAIL — queue refused after {QUEUE_RETRY} attempts")
        return False

    # Polling
    t0 = time.time()
    history = None
    while time.time() - t0 < PER_TIMEOUT:
        time.sleep(5)
        try:
            with urllib.request.urlopen(f"http://{HOST}/history/{prompt_id}", timeout=15) as r:
                h = json.loads(r.read())
            if prompt_id in h and h[prompt_id].get("outputs"):
                history = h[prompt_id]
                print(f"[batch] {key} done in {time.time()-t0:.1f}s")
                break
        except Exception:
            pass
    if not history:
        print(f"[batch] {key} TIMEOUT {PER_TIMEOUT}s")
        return False

    # Save
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for node_out in history["outputs"].values():
        for img in node_out.get("images", []):
            qs = urllib.parse.urlencode({
                "filename":  img["filename"],
                "subfolder": img.get("subfolder", ""),
                "type":      img.get("type", "output"),
            })
            try:
                with urllib.request.urlopen(f"http://{HOST}/view?{qs}", timeout=60) as r:
                    content = r.read()
                if len(content) > 10_000:
                    out_path.write_bytes(content)
                    print(f"[batch] {key} saved ({len(content)//1024} KB)")
                    return True
            except Exception as e:
                print(f"[batch] {key} view err: {e}")
    return False


def main():
    print(f"[batch] start {len(ASSETS)} assets → {OUT_DIR}")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    results = []
    for key, prompt in ASSETS:
        ok = gen_one(key, prompt)
        results.append((key, ok))
    print("\n[batch] === SUMMARY ===")
    for key, ok in results:
        print(f"  {'✓' if ok else '✗'}  {key}")
    n_ok = sum(1 for _, ok in results if ok)
    print(f"[batch] {n_ok}/{len(ASSETS)} succeeded")
    return 0 if n_ok == len(ASSETS) else 1


if __name__ == "__main__":
    import sys
    sys.exit(main())
