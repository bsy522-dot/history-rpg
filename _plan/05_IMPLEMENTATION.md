# 05_IMPLEMENTATION — 구현 체크리스트 + 마일스톤

---

## 1. 마일스톤 (MVP = M6까지)

| M# | 이름 | 산출물 | 검증 |
|----|------|--------|------|
| M0 | 계획 승인 | `_plan/` 6개 MD | 병석님 승인 ✔ |
| M1 | 엔진 뼈대 | `js-v8/core/*` + 빈 씬 렌더 | 브라우저 검은 화면 + Three.js 씬 구동 |
| M2 | 그래픽 표준 | `graphics/*` + 샘플 캐릭터/건물/타일 | 스크린샷 3장, QA 체크리스트 |
| M3 | 카메라 3모드 | `camera/*` + 설정 UI | 3모드 토글 실증, 키/마우스/터치 |
| M4 | 전투 코어 | `battle/*` + EP.1 배치 | 환웅 vs 천무장 1턴 완주 |
| M5 | UI/대사/오디오 | `ui/*` + `audio.js` | 대사 박스 + BGM + SFX |
| M6 | **EP.1 완결** | 오프닝→전투→승리→엔딩 | 플레이 가능 빌드 ★ |
| M7 | 마을 탐색 (EP.2 준비) | `world/town.js` | 3D 신시 마을 + NPC 대화 |
| M8 | EP.2 단군 | `story_ep2.json` + 전투 | 플레이 가능 |
| M9+ | EP.3 위만 / EP.4 부여삼한 | (차기) | |

---

## 2. M1 엔진 뼈대 (상세)

### 2-1. 파일
- `js-v8/core/engine.js`

### 2-2. 체크
- [ ] Three.js r160 CDN 로드 (`unpkg.com/three@0.160.0`)
- [ ] WebGLRenderer 생성 + shadowMap + ACES 톤매핑 + sRGB
- [ ] Scene 생성 + 배경색 `#1a1428`
- [ ] 카메라 매니저 (Orthographic + Perspective 2개 유지)
- [ ] 애니메이션 루프 (`requestAnimationFrame`)
- [ ] 리사이즈 핸들러
- [ ] FPS 카운터 오버레이 (디버그 모드)
- [ ] 스텁 `State` 객체 (`mode: 'title' | 'explore' | 'battle' | 'dialogue' | 'menu'`)

### 2-3. 검증
```bash
# 브라우저에서 열어 확인
start "" "D:\AI\04_게임\한국사RPG\korean-rpg-v8.html"
# 콘솔 에러 0, FPS ≥ 60, 빈 씬이지만 렌더 진행
```

---

## 3. M2 그래픽 표준

### 3-1. 파일
- `js-v8/graphics/materials.js` — MAT 팔레트
- `js-v8/graphics/lighting.js` — LIGHT_PRESETS
- `js-v8/graphics/unit_builder.js` — `buildUnit(isAlly, isLeader, config)`
- `js-v8/graphics/terrain.js` — `buildTile(type, x, y)`
- `js-v8/graphics/buildings.js` — `buildHut()`, `buildShop()`, `buildGodTree()` 등

### 3-2. 체크
- [ ] 01_GRAPHICS_STANDARD 모든 기준 반영
- [ ] 샘플 씬 (test_graphics.html): 캐릭터 6명 + 건물 4개 + 타일 10×10 + 조명 3프리셋 토글
- [ ] 폴리곤 카운터 오버레이 (디버그)

---

## 4. M3 카메라 3모드

### 4-1. 파일
- `js-v8/camera/tactical_cam.js`
- `js-v8/camera/character_cam.js`
- `js-v8/camera/squad_cam.js`
- `js-v8/camera/switcher.js` — `switchCamera(from, to, duration)`

### 4-2. 체크
- [ ] 3모드 독립 업데이트 로직
- [ ] 부드러운 전환 (600ms easeInOutCubic)
- [ ] 컷인 자동 전환 + 복귀
- [ ] 키 단축키 `1/2/3`
- [ ] 설정 UI (localStorage 저장)
- [ ] 모바일 제스처 (핀치/드래그/2지 회전)

---

## 5. M4 전투 코어

### 5-1. 파일
- `js-v8/battle/turn_manager.js`
- `js-v8/battle/movement.js` (BFS)
- `js-v8/battle/attack.js` (data-driven)
- `js-v8/battle/skills.js`
- `js-v8/battle/xp_level.js`
- `js-v8/battle/ai.js`

### 5-2. 체크
- [ ] 이동 범위 하이라이트 (파랑 반투명 타일)
- [ ] 공격 범위 하이라이트 (빨강)
- [ ] 스킬 범위 하이라이트 (보라)
- [ ] 데미지 계산 공식 (02_BATTLE_SYSTEM §2)
- [ ] 컷인 애니메이션 (Character cam + 파티클)
- [ ] 반격 로직
- [ ] XP 획득 + 레벨업 이펙트
- [ ] 턴 배너 애니메이션
- [ ] 적 AI (Normal 난이도 기본)

---

## 6. M5 UI/대사/오디오

### 6-1. 파일
- `js-v8/ui/hud.js`
- `js-v8/ui/dialogue.js`
- `js-v8/ui/menus.js`
- `js-v8/ui/settings.js`
- `js-v8/core/audio.js` (allinone AudioManager 이식)

### 6-2. 체크
- [ ] 폰트 Noto Serif KR 강제
- [ ] HUD: 턴·날씨·설정 버튼 (상단), 유닛 정보·액션 (하단)
- [ ] 대사 박스: 화자명 금색 + 타이핑 효과 (30ms/글자)
- [ ] 설정 메뉴: 카메라/볼륨/자동저장
- [ ] BGM 4종 + SFX 8종
- [ ] 모바일 최초 터치 시 오디오 언락

---

## 7. M6 EP.1 완결

### 7-1. 파일
- `js-v8/data/story_ep1.json`
- `js-v8/data/units.json` (EP.1 9명)
- `js-v8/data/maps.json` (ep1_trial)
- `korean-rpg-v8.html` (통합)

### 7-2. 체크
- [ ] 타이틀 → "EP.1 시작" 버튼
- [ ] 오프닝 시네마틱 (환인 대화 4컷)
- [ ] 전투 맵 로드 + 아군/적 배치
- [ ] 튜토리얼 대사 (진형 설명)
- [ ] 플레이어 승리 가능 (밸런스 테스트)
- [ ] 승리 시네마틱 (천부인 획득)
- [ ] 엔딩 → 타이틀 복귀
- [ ] 세이브 (MVP엔 "EP.1 클리어" 플래그만)

---

## 8. 위험 요소 & 대응

| 위험 | 대응 |
|------|------|
| Three.js 번들 용량 (CDN 600KB) | ES 모듈 + 트리쉐이킹 or 구버전 고정 |
| 모바일 성능 저하 | pixelRatio cap + LOD + shadowMap 해상도 조정 |
| 카메라 전환 시 사용자 혼란 | 600ms 슬로우 전환 + 미니 아이콘 표시 |
| v6처럼 기능 폭증 | ★ 동결 목록 엄수 — 승급/상점/미니게임 NO |
| 퇴화 재발 | 매 M 마일스톤마다 QA 체크리스트 통과 강제 |

---

## 9. 파일 명명 규약

- HTML: `korean-rpg-v8.html` (단일 진입)
- 테스트: `_test/test_<module>.html` (git 미커밋)
- 데이터: `js-v8/data/*.json`
- 모듈: `js-v8/<domain>/<feature>.js` (camelCase 함수, PascalCase 클래스)
- 삭제 대상: `_deleted_files/<timestamp>_<old_file>` — 절대 삭제 금지

---

## 10. 테스트 계획

- **로컬**: `start korean-rpg-v8.html` — 크롬·엣지
- **모바일**: 로컬 HTTP 서버 (`python -m http.server 8000`) + 갤럭시 Z Flip6 접속
- **성능**: FPS 카운터 + Chrome DevTools Performance 탭
- **회귀**: M6 직전 스크린샷 3장 (전투/마을/메뉴) → 매 마일스톤마다 비교
