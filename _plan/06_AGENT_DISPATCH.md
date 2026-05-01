# 06_AGENT_DISPATCH — 에이전트 병렬 배분

> **지시**: "에이전트 돌려가면서 시간은 돈이니깐 토큰 아끼지 말고 미친듯이 빨리짜고" — 병석님.
> 5단계 결재라인 통과 후만 보고.

---

## 1. 에이전트 팀 구성

| 에이전트 | 담당 | 입력 | 출력 |
|----------|------|------|------|
| **A** | 엔진 + 그래픽 표준 | `00_MASTER`, `01_GRAPHICS` | `js-v8/core/*`, `js-v8/graphics/*` |
| **B** | 카메라 3모드 | `03_CAMERA_MODES` | `js-v8/camera/*` |
| **C** | 전투 시스템 | `02_BATTLE_SYSTEM` | `js-v8/battle/*` |
| **D** | 데이터 추출 | `04_EPISODE_STORY` | `js-v8/data/*.json` |
| **E** | UI/오디오 | `05_IMPLEMENTATION §6` | `js-v8/ui/*`, `js-v8/core/audio.js` |
| **F** | 통합·빌드 | 전부 | `korean-rpg-v8.html` |
| **QA1** | 품질팀(그래픽) | `01_GRAPHICS` QA 체크리스트 | 스크린샷 3장 + 합/불합 보고 |
| **QA2** | 품질팀(전투) | `02_BATTLE_SYSTEM` | 플레이 로그 + 엣지케이스 |
| **비서B** | 비판 검증 | 전체 | 퇴보 의심점 리포트 |

---

## 2. 병렬 의존 그래프

```
M1: A (엔진)
    ↓
M2: A (그래픽) ┐
M3: B (카메라) ┤── 모두 완료 → M4
M4: C (전투)  ──┘   ↓
M5: E (UI/오디오)   ↓
D (데이터) ← M1~M3와 병렬
    ↓
M6: F (통합) → QA1 → QA2 → 비서B → 병석님 보고
```

---

## 3. 각 에이전트 프롬프트 템플릿

### 3-1. 에이전트 A (엔진 + 그래픽)
```
[역할] 한국사 영웅전 v8 엔진/그래픽 개발팀.
[참고] D:\AI\04_게임\한국사RPG\_plan\00_MASTER.md, 01_GRAPHICS_STANDARD.md
[참고 코드] korean-rpg-3d.html, korean-rpg-squad-3d.html, korean-rpg-3d-epic.html
[산출물] js-v8/core/engine.js, js-v8/graphics/{materials,lighting,unit_builder,terrain,buildings,effects}.js
[검증]
  1. 01_GRAPHICS_STANDARD §7 QA 체크리스트 전항목 통과
  2. test_graphics.html 로컬 실행 → 스크린샷 3장
  3. 폴리곤 카운터 + FPS 오버레이 포함
[금지]
  - 2D Canvas 사용 (HUD 오버레이 제외)
  - MeshBasicMaterial 사용
  - 폴리곤 세그먼트 § 기준 미달
  - Segoe UI 폰트
[완료 보고] 파일 경로, 라인수, 스크린샷 경로, QA 체크리스트 결과
```

### 3-2. 에이전트 B (카메라)
```
[역할] 한국사 영웅전 v8 카메라 3모드 개발팀.
[참고] 03_CAMERA_MODES.md
[참고 코드] korean-rpg-3d.html (Orthographic), korean-rpg-3d-epic.html (Ortho 확장), korean-rpg-fullloop-3d.html (분대)
[산출물] js-v8/camera/{tactical_cam,character_cam,squad_cam,switcher}.js + 설정 UI
[검증]
  1. test_cameras.html → 3모드 토글 · 전환 애니메이션 600ms
  2. 단축키 1/2/3 동작
  3. 모바일 제스처 (핀치/드래그/2지 회전)
  4. 컷인 자동 전환 스텁
[금지]
  - 고정 카메라 (회전/줌 없음)
  - 즉시 전환 (반드시 보간)
[완료 보고] 파일 경로, 전환 GIF or 스크린샷 시퀀스, 테스트 로그
```

### 3-3. 에이전트 C (전투)
```
[역할] 한국사 영웅전 v8 전투 시스템 개발팀.
[참고] 02_BATTLE_SYSTEM.md
[참고 코드] korean-rpg-allinone.html (executeAttack), korean-rpg-3d.html (calcMoveRange, showCutin), js/battle.js (지형/AI)
[산출물] js-v8/battle/{turn_manager,movement,attack,skills,xp_level,ai}.js
[검증]
  1. 유닛 선택 → 이동 → 공격 → 데미지 적용 → XP → 레벨업 루프 완주
  2. 반격 트리거 조건 정확 (사거리 + 생존)
  3. 적 AI Normal 난이도 (약한 아군 우선)
  4. 날씨 효과 반영 (맑음/비/눈/안개)
[금지]
  - 렌더링 코드 포함 (A의 영역)
  - UI 조작 코드 포함 (E의 영역)
[완료 보고] 파일 경로, 밸런스 시뮬 결과 (100회 평균 턴수)
```

### 3-4. 에이전트 D (데이터 추출)
```
[역할] 한국사 영웅전 v8 데이터 큐레이터.
[참고] 04_EPISODE_STORY.md
[참고 코드] korean-rpg-fullloop.html (대사), korean-rpg-v6.html (4챕터), js/story.js (58KB), js/config.js (유닛)
[산출물] js-v8/data/{story_ep1,story_ep2,units,skills,items,maps}.json
[검증]
  1. JSON lint 통과 (node -e "JSON.parse(fs.readFileSync('file'))")
  2. story_ep1.json scenes[].type 스키마 준수
  3. units.json 모든 유닛 hp/atk/def/mov/rng 필드 완비
  4. 역사 고증 (BC 2333, 홍익인간, 풍백/우사/운사 등)
[금지]
  - 대사 내 emoji (포트레이트는 별도 필드)
  - 하드코딩된 JS (순수 JSON만)
[완료 보고] 파일 경로, 파일 크기, 스키마 검증 로그
```

### 3-5. 에이전트 E (UI/오디오)
```
[역할] 한국사 영웅전 v8 UI/오디오 개발팀.
[참고] 05_IMPLEMENTATION §6
[참고 코드] korean-rpg-allinone.html (AudioManager), korean-rpg-3d.html (HUD), korean-rpg-fullloop-3d.html (대사)
[산출물] js-v8/ui/{hud,dialogue,menus,settings}.js, js-v8/core/audio.js
[검증]
  1. 폰트 Noto Serif KR 적용
  2. 대사 타이핑 30ms/글자, 스킵 지원
  3. 설정 메뉴 localStorage 저장/로드
  4. BGM 4종 + SFX 8종 구현
  5. 모바일 오디오 언락 (최초 터치)
[금지]
  - Segoe UI / Arial 사용
  - 원색 단독 버튼 (팔레트 준수)
  - v6 "삑삑" MIDI 하드코딩
[완료 보고] 파일 경로, UI 스크린샷, 오디오 파형 스펙트로그램
```

### 3-6. 에이전트 F (통합 빌더)
```
[역할] 한국사 영웅전 v8 통합 빌더.
[참고] 00_MASTER.md, 05_IMPLEMENTATION §7
[입력] A~E 산출물 전부
[산출물] korean-rpg-v8.html (단일 진입점)
[검증]
  1. EP.1 플레이 풀 완주 (타이틀 → 오프닝 → 전투 → 승리 → 엔딩)
  2. FPS ≥ 60 (데스크탑), ≥ 30 (모바일)
  3. 브라우저 콘솔 에러 0
  4. Three.js CDN 로드 + 폴백
  5. 스크린샷 5장 (단계별)
[금지]
  - js-v8/ 외부 import
  - 모듈 하드 복사 (relative import만)
[완료 보고] HTML 경로, 플레이 영상 or GIF, FPS 측정치, 5단계 결재 요청
```

---

## 4. 품질 게이트 에이전트

### QA1 (그래픽 품질팀)
```
[역할] 그래픽 표준 감사.
[입력] 에이전트 F 산출물
[작업]
  1. 01_GRAPHICS_STANDARD §7 체크리스트 전항목 측정
  2. 스크린샷 3장 (전투/마을/메뉴) — 각 FPS·폴리곤 카운트 오버레이
  3. 퇴보 비교: v7 (2D) 대비 진보 확인, 3d.html 대비 퇴보 없음 확인
[출력] PASS/FAIL + 상세 리포트
```

### QA2 (전투 품질팀)
```
[역할] 전투 플레이 테스트.
[입력] 에이전트 F 산출물
[작업]
  1. EP.1 10회 플레이 (승리율 기록)
  2. 엣지케이스: 아군 1명만 남음, 적 신단수 점령, 크리티컬 연타 등
  3. 밸런스: 난이도 적절성 (너무 쉬움/어려움 지적)
[출력] 승률·평균턴·발견 버그 리스트
```

### 비서B (비판)
```
[역할] 퇴보 의심점 감별.
[입력] 에이전트 F 산출물 + QA1/QA2 리포트
[작업]
  1. v6 교훈 재발 체크 (3D→2D, 기능 폭증, UI 촌스러움)
  2. 사용자 피드백 불반영 항목 색출
  3. 잠재 리스크 3가지 이상 제시
[출력] 비판 리포트 (찬성 에이전트A 리포트와 대립)
```

---

## 5. 실행 명령 (승인 후)

```python
# 순차 실행 예시 (실제론 병렬 Agent tool)
1. Agent A → js-v8/core + graphics     (M1+M2)
2. Agent B → js-v8/camera               (M3, A와 병렬)
3. Agent D → js-v8/data                 (M1+와 병렬 시작 가능)
4. Agent C → js-v8/battle               (A·D 완료 후)
5. Agent E → js-v8/ui + audio           (A 완료 후)
6. Agent F → korean-rpg-v8.html         (A~E 완료 후)
7. QA1 (그래픽) + QA2 (전투) + 비서B    (F 완료 후, 병렬)
8. 비서 종합 보고 → 병석님 최종 승인
```

---

## 6. 예상 시간 (에이전트 병렬 기준)

- M1~M2 (A): 단일 작업 중 가장 김
- M3 (B), D (데이터): A와 병렬
- M4 (C): A 완료 후
- M5 (E): A 완료 후
- M6 (F): 전부 완료 후 통합

**병렬 최적화 시 MVP 1회 라운드 내 도달 가능성 높음.**
