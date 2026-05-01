# 00_MASTER — 한국사 영웅전 v8 통합 마스터플랜

> **작성**: 2026-04-17 · 기조실 비서 보고 · PRIME Holdings
> **지시자**: 병석님
> **상태**: **계획 단계 — 승인 대기**

---

## 1. 현황 진단 (왜 퇴화했나)

### 1-1. 버전 계보
| 파일 | 엔진 | 라인 | 상태 | 평가 |
|------|------|------|------|------|
| `korean-rpg-3d.html` | Three.js | 815 | 보존 | EP.1 전투 "느낌" 최적 ★ |
| `korean-rpg-3d-epic.html` | Three.js | 770 | 보존 | **캐릭터 중심 뷰** 원본 ★ |
| `korean-rpg-fullloop-3d.html` | Three.js | 675 | 보존 | **분대 표현** 원본, 단 조명/폴리곤 퇴화 |
| `korean-rpg-squad-3d.html` | Three.js | 656 | 보존 | **전체 게임 플로우** 기준점 ★★★ |
| `korean-rpg-fullloop.html` | 2D Canvas | ~500 | 그래픽 폐기 | 스토리 데이터만 추출 |
| `korean-rpg-allinone.html` | Phaser 2D | 1,778 | v2.0 | 오디오/레벨업/컷인 이식할 것 |
| `korean-rpg-v6.html` | 2D Canvas | 2,296 | **퇴화** | 3D → 2D 회귀. 교훈만 |
| `js/*.js` (현재) | 2D Canvas | ~155KB | **퇴화 유지** | v7 모듈화 했으나 2D. 로직만 이식 |

### 1-2. 퇴화 3대 원인 (재발 금지)
1. **엔진 회귀**: Three.js → 2D Canvas (v6 단계) → 이후 모든 빌드 2D 고착
2. **기능 폭증**: 4챕터 + 승급 + 상점 + 인벤토리 + 미니게임 5종 동시 착수 → 전부 1/4 완성도
3. **그래픽 디폴트 빈곤**: "마리오 타일" (fullloop.html) · "노란/보라 버튼" (v6) · 글꼴 Segoe UI

---

## 2. v8 비전 (이번 빌드 목표)

### 2-1. 한 줄 정의
> **"Three.js 기반 저폴리 3D 택티컬 RPG, 카메라 3모드 토글, 4에피소드 스토리."**

### 2-2. 핵심 3원칙
| 원칙 | 의미 |
|------|------|
| **① 3D 엔진 고정 (NO 회귀)** | Three.js r160 단일 엔진. 2D Canvas는 UI/HUD 오버레이만. |
| **② 그래픽 일관성** | 재질·조명·폴리곤 버짓을 `01_GRAPHICS_STANDARD` 표준으로 강제. 모든 씬 통과 필수. |
| **③ 기능 동결 (MVP 우선)** | EP.1 완성 전에 승급/상점 등 확장 금지. `02_BATTLE_SYSTEM` 코어만. |

### 2-3. 사용자 선호 정밀 반영
| 사용자 언급 | 반영 방식 |
|------|------|
| "첫 에피소드는 3d.html 느낌 무조건 좋음" | EP.1 기본 카메라: **택티컬 아이소메트릭** (3d.html 프리셋) |
| "2에피소드부터는 캐릭터 중심 or 분대 표현 선택" | **설정 + 전투 중 토글**: `Tactical` / `Character` / `Squad` 3모드 |
| "전체 게임은 squad-3d가 맘에 들어" | squad-3d.html의 **상태머신 + 씬 구성**을 뼈대로 |
| "전투는 allinone 처럼 발전" | 레벨업/XP/크리티컬/날씨/오디오 이식 |
| "스토리는 fullloop, 그래픽은 참고 말 것" | `story.json` 데이터만 추출, 렌더링은 3D |
| "마을/상점 마리오 금지" | 3D 건물 (고인돌·울타리·탑) — `squad-3d.html` 스타일 |
| "그래픽 퇴화 말고 동일성 유지" | **시각 표준 QA 체크리스트** 강제 |

---

## 3. 모듈 구조

```
D:\AI\04_게임\한국사RPG\
├── index.html                       (런처 — 유지, v8 링크 추가)
├── korean-rpg-v8.html               (신규 메인 — Three.js 통합)
├── js-v8/
│   ├── core/
│   │   ├── engine.js                (Three.js 씬/렌더러/카메라 매니저)
│   │   ├── state.js                 (게임 상태머신)
│   │   ├── input.js                 (입력/터치/제스처)
│   │   └── audio.js                 (allinone AudioManager 이식)
│   ├── graphics/
│   │   ├── materials.js             (표준 재질 팔레트)
│   │   ├── lighting.js              (표준 조명 프리셋)
│   │   ├── unit_builder.js          (캐릭터 메시 생성, 3d-epic buildUnit 이식)
│   │   ├── terrain.js               (타일/지형 빌더, 3d.html)
│   │   ├── buildings.js             (마을/고인돌/탑/오두막, squad-3d)
│   │   └── effects.js               (파티클/컷인/레벨업)
│   ├── camera/
│   │   ├── tactical_cam.js          (Orthographic 45도)
│   │   ├── character_cam.js         (3인칭 오버숄더)
│   │   ├── squad_cam.js             (분대 포메이션 뷰)
│   │   └── switcher.js              (3모드 전환 + 보간)
│   ├── battle/
│   │   ├── turn_manager.js
│   │   ├── movement.js              (BFS)
│   │   ├── attack.js                (allinone executeAttack 이식)
│   │   ├── skills.js
│   │   ├── xp_level.js              (레벨업 시스템)
│   │   └── ai.js                    (적 AI, squad-3d 참고)
│   ├── world/
│   │   ├── town.js                  (3D 마을 탐색)
│   │   ├── npc.js
│   │   └── shop.js                  (NO 마리오 — 건물 진입 UI)
│   ├── ui/
│   │   ├── hud.js                   (HP/MP/XP 표시)
│   │   ├── menus.js                 (인벤토리/설정/세이브)
│   │   ├── dialogue.js              (대사 시스템)
│   │   └── settings.js              (카메라모드/볼륨/언어 토글)
│   └── data/
│       ├── units.json               (아군/적군 스탯)
│       ├── skills.json
│       ├── items.json
│       ├── story_ep1.json           (환웅)
│       ├── story_ep2.json           (단군)
│       ├── story_ep3.json           (위만)
│       ├── story_ep4.json           (부여·삼한)
│       └── maps.json
├── _plan/                           (이 폴더)
│   ├── 00_MASTER.md                 (이 파일)
│   ├── 01_GRAPHICS_STANDARD.md
│   ├── 02_BATTLE_SYSTEM.md
│   ├── 03_CAMERA_MODES.md
│   ├── 04_EPISODE_STORY.md
│   ├── 05_IMPLEMENTATION.md
│   └── 06_AGENT_DISPATCH.md
└── _deleted_files/                  (구버전 퇴역 대기 — 삭제 NO)
```

---

## 4. 작업 범위 (Scope)

### 4-1. v8 MVP (이번 스프린트)
- [x] 분석 완료 (본 문서)
- [ ] Three.js 엔진 뼈대 (`js-v8/core/engine.js`)
- [ ] 그래픽 표준 구현 (`materials.js`, `lighting.js`)
- [ ] 캐릭터/타일/건물 빌더 3종
- [ ] 카메라 3모드 + 스위처
- [ ] EP.1 환웅 시험 (전투 1회 완결)
- [ ] 마을 탐색 모드 (3D, 비-마리오)
- [ ] HUD/대사/설정 UI
- [ ] allinone 오디오 + 레벨업 이식

### 4-2. v8 차기 (EP.2~4)
- [ ] 단군 에피소드
- [ ] 위만 조선 에피소드
- [ ] 부여·삼한 에피소드

### 4-3. v8 동결 (나중 빌드로 이월)
- ❌ 클래스 승급 (v6에서 과했음)
- ❌ 상점 인벤토리 확장 (MVP엔 치유약 1종만)
- ❌ 미니게임 5종 (퀴즈/인내/제천 등 전부 이월)
- ❌ 세이브/로드 (MVP 이후)

---

## 5. 품질 게이트 (5단계 결재라인)

각 에이전트 산출물은 **5단계 전부 패스 후만** 병석님께 보고.

| 단계 | 검증 항목 |
|------|-----------|
| **① 팀원** | 문법/실행 (Node parse, 브라우저 콘솔 무에러), 기능 작동, 시각 렌더링 |
| **② 팀장** | 퇴보 여부 (직전 빌드 대비 FPS/폴리곤/조명 감소 없음), 모듈 의존성 |
| **③ 품질팀** | 그래픽 표준 일치 (01_GRAPHICS_STANDARD 체크리스트), 스크린샷 3장+ (전투/마을/메뉴) |
| **④ 사장** | 비즈니스/UX — "재미있나? 스토리 몰입되나?" |
| **⑤ 비서** | 비서A 찬성 + 비서B 비판 (퇴화 가능성·엣지케이스 지적) |

---

## 6. 보고 형식 (매 마일스톤)

```
[v8 진행 보고 — YYYY-MM-DD HH:MM]
- 완료: 모듈명, 라인수, 스크린샷 N장
- 검증 결과: ①②③④⑤ 패스/실패 사유
- 그래픽 표준 체크: (체크리스트 결과)
- FPS/폴리곤: 측정치
- 다음 예정: 모듈명
- 리스크: 있음/없음 — 상세
```

---

## 7. 승인 요청

이 마스터플랜 + 6개 세부문서(`01~06`)에 대한 **승인**을 요청드립니다.
승인 시 에이전트 병렬 착수:
1. Agent A → `js-v8/core/` + `graphics/`
2. Agent B → `js-v8/camera/` 3모드
3. Agent C → `js-v8/battle/` 이식
4. Agent D → `data/story_ep1.json` 추출
5. Agent E → 통합 `korean-rpg-v8.html` 빌드

**예상 1차 산출물 — EP.1 환웅 시험 완결 플레이 가능 빌드.**
