# -*- coding: utf-8 -*-
"""
한국사RPG Phase E - 환웅 캐릭터 2D 이미지 자동 생성
ComfyUI Z-Image Turbo 워크플로우 호출.
출력: E:/AI/ComfyUI_Output/history_comic/hwanoong_*.png

websocket 없이 polling 방식 (urllib만 사용 — 의존성 0).
"""
import json
import time
import urllib.request
import urllib.parse
from pathlib import Path

HOST = "127.0.0.1:8188"
CLIENT_ID = "claude-phase-e-hwanoong"
WORKFLOW = Path("D:/AI/08_컨텐츠/workflows/history_comic/zimage_korean.json")
OUT_PATH = Path("E:/AI/ComfyUI_Output/history_comic/hwanoong.png")
TIMEOUT = 1800  # 30분 (Wan 2.2 비디오 작업이 큐 앞에 있을 수 있음)
QUEUE_RETRY = 5
QUEUE_RETRY_INTERVAL = 30

# ─── 환웅 프롬프트 (역사고증 + image-to-3D 친화) ───
PROMPT_POS = (
    "ancient Korean warrior Hwanoong, "
    "Bronze Age tribal leader, traditional Korean bronze armor with mandolin sword, "
    "hanbok beneath armor, divine descent from heaven theme, "
    "full body standing T-pose, front view, neutral grey background, "
    "ink painting style, museum quality, single character, no shadow"
)
PROMPT_NEG = (
    "modern clothing, western style, low quality, multiple figures, "
    "blurry, dynamic pose, action pose, complex background, low res"
)


def main():
    if not WORKFLOW.exists():
        print(f"FATAL: workflow not found: {WORKFLOW}")
        return 1

    wf = json.loads(WORKFLOW.read_text(encoding="utf-8"))

    # 패치
    wf["6"]["inputs"]["text"] = PROMPT_POS
    wf["7"]["inputs"]["text"] = PROMPT_NEG
    wf["3"]["inputs"]["seed"] = 42
    wf["5"]["inputs"]["width"] = 1024
    wf["5"]["inputs"]["height"] = 1024
    wf["9"]["inputs"]["filename_prefix"] = "history_comic/hwanoong"

    # Queue (재시도)
    data = json.dumps({"prompt": wf, "client_id": CLIENT_ID}).encode("utf-8")
    prompt_id = None
    for attempt in range(QUEUE_RETRY):
        req = urllib.request.Request(
            f"http://{HOST}/prompt",
            data=data,
            headers={"Content-Type": "application/json"},
        )
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                resp = json.loads(r.read())
            prompt_id = resp.get("prompt_id")
            if prompt_id:
                print(f"[gen_hwanoong] queued prompt_id={prompt_id} (attempt {attempt+1})")
                break
        except Exception as e:
            print(f"[gen_hwanoong] queue attempt {attempt+1}/{QUEUE_RETRY} failed: {e}")
            if attempt < QUEUE_RETRY - 1:
                time.sleep(QUEUE_RETRY_INTERVAL)

    if not prompt_id:
        print(f"FATAL: queue failed after {QUEUE_RETRY} attempts (ComfyUI busy?)")
        return 1

    # Polling: history에 결과 나타날 때까지 (5초 간격)
    t0 = time.time()
    history = None
    while time.time() - t0 < TIMEOUT:
        time.sleep(5)
        try:
            with urllib.request.urlopen(f"http://{HOST}/history/{prompt_id}", timeout=15) as r:
                h = json.loads(r.read())
            if prompt_id in h:
                history = h[prompt_id]
                # outputs가 채워졌는지 확인
                if history.get("outputs"):
                    print(f"[gen_hwanoong] done in {time.time()-t0:.1f}s")
                    break
        except Exception as e:
            print(f"[gen_hwanoong] poll err (계속): {e}")

    if not history or not history.get("outputs"):
        print(f"FATAL: timeout {TIMEOUT}s without output")
        return 1

    # 결과 다운로드
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    saved = False
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
                    OUT_PATH.write_bytes(content)
                    print(f"[gen_hwanoong] saved {OUT_PATH} ({len(content)//1024} KB)")
                    saved = True
                    break
            except Exception as e:
                print(f"[gen_hwanoong] view err: {e}")
        if saved:
            break

    return 0 if saved else 1


if __name__ == "__main__":
    import sys
    sys.exit(main())
