# Phase E + F 실행 런북

한국사RPG v8 그래픽 자산 자동 생성 절차서. Phase A~D 완료 상태 가정.

## 사전 점검

- [x] **ComfyUI** v0.19.3 동작 (`http://127.0.0.1:8188`)
- [x] **Hunyuan3D-2-WinPortable** 설치 (`E:\AI\Hunyuan3D-2-WinPortable\Hunyuan3D2_WinPortable\RUN.bat`)
- [x] **Blender 4.5.9 LTS** 설치 (`D:\AI\06_도구\Blender\blender-4.5.9-windows-x64\blender.exe`)
- [x] **gltf-transform CLI** (`gltf-transform --version`)
- [x] **gen_hwanoong_image.py / gen_assets_batch.py** 작성
- [x] **blend_postprocess.py** 작성
- [x] **manifest.json** 8개 자산 placeholder 등록

## Phase E — 환웅 1체 (검증)

### Step 1. 환웅 2D 이미지 생성 (~30초)
```bash
"D:/AI/06_도구/ComfyUI/python_embeded/python.exe" \
  "D:/AI/04_게임/한국사RPG/scripts/gen_hwanoong_image.py"
```
- 출력: `E:/AI/ComfyUI_Output/history_comic/hwanoong.png`
- ComfyUI에 다른 작업 진행 중이면 큐 대기 (스크립트가 자동 재시도)

### Step 2. Hunyuan3D Gradio 부팅 (첫 실행 ~10~30분)
```cmd
cd /d "E:\AI\Hunyuan3D-2-WinPortable\Hunyuan3D2_WinPortable"
RUN.bat
```
- 첫 실행 시 HuggingFace에서 모델 자동 다운로드 (~10GB)
- 부팅 완료 시 `http://127.0.0.1:7860` LISTENING

### Step 3. 환웅 .glb 변환
- **수동(권장 첫 사용)**: 브라우저로 `http://127.0.0.1:7860` 접속 → "Image to 3D" → `hwanoong.png` 업로드 → 생성 → `.glb` 다운로드 → `D:/AI/04_게임/한국사RPG/assets/models/raw/hwanoong_raw.glb`로 저장
- **자동(다음 세션)**: Gradio API 호출 (`gradio_client` 사용), 파이썬 스크립트 작성 필요

### Step 4. Blender bpy 후처리 (폴리곤 5K + Draco)
```bash
"D:/AI/06_도구/Blender/blender-4.5.9-windows-x64/blender.exe" \
  -b -P "D:/AI/08_컨텐츠/Mozart_MV_Project/scripts/3d/blend_postprocess.py" -- \
  "D:/AI/04_게임/한국사RPG/assets/models/raw/hwanoong_raw.glb" \
  "D:/AI/04_게임/한국사RPG/assets/models/unit_hwanoong.glb" \
  5000
```

### Step 5. Three.js 통합 검증
1. 한국사RPG `korean-rpg-v8.html` 브라우저에서 열기
2. 콘솔: `import('./js-v8/graphics/unit_async.js').then(m => m.buildUnitAsync({unitData:{modelKey:'hwanoong'}}).then(g => State.scene.add(g)))`
3. 스크린샷 비교 (박스 vs .glb)

## Phase F — EP.1 5체 + 건물 3종 (일괄)

### 일괄 2D 이미지 생성 (~5~30분, ComfyUI 부하 따라)
```bash
"D:/AI/06_도구/ComfyUI/python_embeded/python.exe" \
  "D:/AI/04_게임/한국사RPG/scripts/gen_assets_batch.py"
```
- 8개 자산 순차 생성 (이미 있는 건 skip)
- 출력: `E:/AI/ComfyUI_Output/history_comic/{key}.png` × 8

### 일괄 .glb 변환 (Hunyuan3D Gradio 사용)
- 8개 `.png` 각각 Hunyuan3D Gradio에 업로드 → `.glb` 다운로드
- 또는 `gradio_client` 자동화 (스크립트 작성 필요)
- 저장: `assets/models/raw/{key}_raw.glb`

### 일괄 Blender 후처리 (bash 루프)
```bash
for key in hwanoong dangun wiman bear_woman tiger_chief dolmen hut godtree; do
  "D:/AI/06_도구/Blender/blender-4.5.9-windows-x64/blender.exe" \
    -b -P "D:/AI/08_컨텐츠/Mozart_MV_Project/scripts/3d/blend_postprocess.py" -- \
    "D:/AI/04_게임/한국사RPG/assets/models/raw/${key}_raw.glb" \
    "D:/AI/04_게임/한국사RPG/assets/models/${key}.glb" \
    5000
done
```

### 한국사RPG 통합 (data/units.json 패치)
- `units.json` 각 캐릭터에 `"modelKey": "hwanoong"` 등 필드 추가
- `buildUnit({unitData})` 호출처를 `await buildUnitAsync({unitData})`로 점진 마이그레이션 (Phase B 폴백 보장)

### 5단계 결재 자동 보고
- FPS ≥ 60 / 폴리곤 ≤ 50K / AmbientLight ≥ 0.55 (메모리 표준)
- Before/After 스크린샷 3장 (전투/마을/메뉴)

## 트러블슈팅

| 증상 | 원인 | 해결 |
|---|---|---|
| `WinError 10061` (connection refused) | ComfyUI 다른 작업 무거움 | 스크립트 재시도 자동, 수동 시 30~60초 대기 |
| Hunyuan3D 7860 응답 없음 | 첫 부팅 + 모델 다운로드 (~10GB) | RUN.bat 콘솔 창 진행 상황 확인, 인내 |
| `.glb` 로드 실패 → 박스 폴백 | 파일 없음, manifest 미등록, CORS 등 | 콘솔 로그 확인, 자동 폴백이라 게임은 계속 동작 |
| Blender bpy import 에러 | Python 버전 불일치 | Blender 내장 Python 사용 (4.5.9 = Python 3.11) |
| Wan 2.2 작업이 큐 점령 | Mozart MV 작업 진행 중 | Mozart 작업 끝날 때까지 대기 또는 ComfyUI 재시작 |

## Godot 트랙 (Phase D, 별도)

신규 게임 만들 때:
```cmd
cd /d "D:\AI\GameDev\Studios_repo"
"D:\AI\06_도구\Godot\Godot_v4.6.2-stable_win64.exe" --editor --path .
```
- 새 Godot 프로젝트 생성
- `Project > Project Settings > Plugins > Godot AI` 활성화 (`D:\AI\GameDev\godot-ai-mcp\plugin\addons\godot_ai`를 새 프로젝트의 `addons/`에 복사)
- Godot AI dock에서 "Configure all" → Claude Code 자동 등록
- Game Studios 49 에이전트는 `Studios_repo/.claude/agents/`에서 인식

## Blender MCP

Blender 실행 후 `Edit > Preferences > Add-ons > Install` → `D:\AI\GameDev\blender-mcp\addon.py` 추가 → Blender 사이드바 BlenderMCP에서 "Connect to MCP server".

settings.json `mcpServers.blender-mcp` 이미 등록 완료 → Claude Code 재시작 시 활성.
