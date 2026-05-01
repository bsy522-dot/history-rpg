# 03_CAMERA_MODES — 카메라 3모드 시스템

> **핵심 지시**: "설정모드나 전투화면에서 선택할수 있게" — 병석님.
> EP.1은 택티컬 강제, EP.2부터 자유 토글.

---

## 1. 3모드 요약

| 모드 | 출처 | 느낌 | 용도 |
|------|------|------|------|
| **Tactical** | 3d.html, squad-3d.html | 아이소메트릭 탑다운 | 전체 파악, 전술 결정 |
| **Character** | 3d-epic.html | 3인칭 오버숄더 | 공격/스킬 시 몰입 |
| **Squad** | fullloop-3d.html | 분대 후방 추적 | 진군감, 포메이션 표시 |

---

## 2. Tactical (택티컬)

```javascript
// OrthographicCamera — 투시 왜곡 없음
const camSize = 7;  // 기본. 휠로 3~12 조정
const aspect = W() / H();
const cam = new THREE.OrthographicCamera(
  -camSize*aspect, camSize*aspect, camSize, -camSize, 0.1, 100
);
cam.position.set(14, 11, 14);  // 대각 45도 상부
cam.lookAt(mapCenter);
```

- **회전**: 우클릭 드래그 (Y축만, X축 고정) → 맵을 돌려보기
- **줌**: 마우스 휠 → camSize 3~12
- **키보드**: `WASD` 팬, `Q/E` 회전, `+/-` 줌
- **모바일**: 1지 드래그 팬, 2지 핀치 줌, 2지 회전

---

## 3. Character (캐릭터 중심)

```javascript
// PerspectiveCamera — 3인칭 오버숄더
const cam = new THREE.PerspectiveCamera(50, W()/H(), 0.1, 100);
function updateCharCam(target) {
  const offset = new THREE.Vector3(-2, 2.5, -3);  // 뒤-위-옆
  const worldOffset = offset.applyQuaternion(target.quaternion);
  cam.position.lerp(target.position.clone().add(worldOffset), 0.15);
  cam.lookAt(target.position.clone().add(new THREE.Vector3(0, 0.8, 0)));
}
```

- **타겟**: 현재 선택된 유닛 (없으면 전방 중앙)
- **자동 전환**: 공격/스킬 컷인 시 임시 전환
- **DOF**: 약한 블러 (선택 유닛 외 배경 흐림)
- **충돌 방지**: raycast로 벽/지형과 겹치면 카메라 앞으로

---

## 4. Squad (분대)

```javascript
// PerspectiveCamera — 분대 후방 추적
const cam = new THREE.PerspectiveCamera(60, W()/H(), 0.1, 100);
function updateSquadCam(squadCenter, squadForward) {
  const back = squadForward.clone().multiplyScalar(-5);
  const up = new THREE.Vector3(0, 3.5, 0);
  const target = squadCenter.clone().add(back).add(up);
  cam.position.lerp(target, 0.12);
  cam.lookAt(squadCenter.clone().add(new THREE.Vector3(0, 1, 0)));
}
```

- **squadCenter**: 아군 분대의 평균 위치
- **squadForward**: 진군 방향 (이동 후 갱신)
- **넓은 FOV 60**: 분대 전원이 화면에 들어오도록
- **포메이션 표시**: 쐐기진/방어진 시각화

---

## 5. 모드 전환 (Switcher)

### 5-1. 전환 위치
- **설정 메뉴**: 기본 모드 저장 (localStorage)
- **전투 HUD 버튼**: `[카메라: 택티컬 ▼]` 드롭다운
- **키보드**: `1` `2` `3` 단축키
- **이벤트 기반 자동 전환**:
  - 컷인 → Character (300ms 트랜지션)
  - 컷인 종료 → 원래 모드 복귀
  - 턴 시작 배너 → Tactical 강제 (전체 파악)

### 5-2. 전환 연출

```javascript
async function switchCamera(from, to, duration = 600) {
  const startPos = from.position.clone();
  const startQuat = from.quaternion.clone();
  const targetPos = computeTargetPos(to);
  const targetQuat = computeTargetQuat(to);

  const startTime = performance.now();
  return new Promise(resolve => {
    function step() {
      const t = Math.min(1, (performance.now() - startTime) / duration);
      const e = easeInOutCubic(t);
      activeCam.position.lerpVectors(startPos, targetPos, e);
      activeCam.quaternion.slerpQuaternions(startQuat, targetQuat, e);
      if (t < 1) requestAnimationFrame(step);
      else { activeCam = to; resolve(); }
    }
    step();
  });
}
```

**중요**: Orthographic ↔ Perspective 전환은 내부적으로 **두 카메라 유지** + 씬 교체.

---

## 6. 에피소드별 기본 모드

| 에피소드 | 기본 모드 | 이유 |
|----------|-----------|------|
| EP.1 환웅 시험 | **Tactical 고정** | 시련 — 거리감·엄숙함, 사용자 명시 |
| EP.2 단군 건국 | Squad (Character 토글 가능) | 분대감 강조 |
| EP.3 위만 조선 | Character (Tactical 토글) | 개별 영웅 강조 |
| EP.4 부여·삼한 | 3모드 완전 자유 | |

설정에서 사용자가 덮어쓸 수 있음. EP.1만 "시스템 잠금".

---

## 7. 컷인 카메라 (전용)

전투 컷인 전용 카메라는 **Character의 특수 버전**:

```javascript
function cutinCamera(attacker, target) {
  const mid = attacker.position.clone().lerp(target.position, 0.5);
  const side = new THREE.Vector3().subVectors(target.position, attacker.position)
    .cross(new THREE.Vector3(0,1,0)).normalize().multiplyScalar(2.5);
  cutinCam.position.copy(mid.clone().add(side).add(new THREE.Vector3(0, 1.5, 0)));
  cutinCam.lookAt(mid);
  cutinCam.fov = 45;  // 약간 망원 → 드라마틱
}
```

---

## 8. 설정 UI

```
┌─────────────────────────────────┐
│ ⚙ 설정                          │
├─────────────────────────────────┤
│ 카메라 모드                     │
│   ○ 택티컬 (전체 파악)          │
│   ● 캐릭터 (몰입감)             │
│   ○ 분대 (진군감)               │
│                                 │
│ 자동 전환 (컷인 시 캐릭터) [ON]  │
│                                 │
│ BGM         ▓▓▓▓▓▓░░ 70%       │
│ SFX         ▓▓▓▓▓▓▓░ 80%       │
│                                 │
│ [저장]            [취소]        │
└─────────────────────────────────┘
```

---

## 9. 테스트 시나리오

1. EP.1 시작 → Tactical 고정 확인 (설정에서 바꿔도 무시)
2. EP.2 시작 → 기본 Squad, 설정 메뉴 접근 → Character 변경 → 즉시 반영
3. 전투 중 HUD 드롭다운 → Tactical → 부드럽게 전환 (600ms)
4. 공격 실행 → 자동 Character 전환 (컷인) → 복귀 시 원 모드로
5. 키 `1/2/3` 단축키 동작
6. 모바일 핀치/회전 제스처 — Tactical에서만 활성
