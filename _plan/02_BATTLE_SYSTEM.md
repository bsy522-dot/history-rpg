# 02_BATTLE_SYSTEM — 전투 시스템 통합 설계

> **목표**: allinone(v2.0)의 정제된 전투 로직 + 3d.html의 3D 렌더 + squad-3d의 분대감.

---

## 1. 전투 루프 상태머신

```
[타이틀] → [에피소드 선택] → [출격 준비(배치)] → [전투 시작]
                                                    ↓
[턴 배너: 아군 N턴]
    ↓
[유닛 선택 (ally_select)] → 클릭 한 유닛
    ↓
[이동 (ally_move)] ← BFS 이동범위 하이라이트 (파랑)
    ↓
[행동 (ally_action)]
    ├─ 공격 (select_target) → [컷인] → [데미지 적용] → [XP획득/레벨업] → [finishAction]
    ├─ 스킬 (select_target_or_area) → [컷인 or 범위 이펙트] → [finishAction]
    ├─ 아이템 (item_select) → [효과 적용] → [finishAction]
    └─ 대기 → [finishAction]
    ↓
모든 아군 acted? → NO 루프 / YES 다음
    ↓
[턴 배너: 적 N턴] → [AI 루프] → [turn++] → 아군 턴
```

승리 조건: 적 전멸 / 보스 처치
패배 조건: 아군 전멸 / (선택) 턴 제한 초과

---

## 2. 데미지 공식 (allinone 기반 + 수정)

```javascript
function calcDamage(attacker, target, skill, weather, terrain) {
  const atkMod = (weather?.atkMod) || 0;
  const terrainDef = terrain?.defBonus || 0;

  let base = skill ? skill.dmg : attacker.atk + atkMod;
  if (skill?.element && target.weakTo === skill.element) base *= 1.25;

  let dmg = Math.max(1, base - target.def - terrainDef) + randInt(0, 5);

  const crit = randInt(1, 10) === 1;
  if (crit) dmg = Math.floor(dmg * 1.5);

  const typeMod = typeAdv(attacker.unitType, target.unitType);  // 1.5 / 0.75 / 1
  dmg = Math.floor(dmg * typeMod);

  return { dmg, crit, typeMod };
}
```

**반격**: 근접 유닛이 살아있고 사거리 안이면 자동 반격 (dmg 감소 `-2`).

---

## 3. 레벨업 시스템

| 행동 | 획득 XP |
|------|---------|
| 일반 타격 | +10 |
| 격파 | +50 |
| 스킬 사용 (데미지) | +15 |
| 힐 스킬 | +15 |
| 위험 회피 (반격 받음) | +5 |

레벨업: XP 100 도달 시 — **HP+3, ATK+2, DEF+1, MP+2**
이펙트: 황금 파티클 8방향 + "LEVEL UP!" 텍스트 부양 + SFX `levelup`.

---

## 4. 스킬 스펙 (유형별)

### 4-1. 단일 공격 (`single`)
- 타겟 1명, 데미지 `pw * atk`
- 예: 환웅 "천부인·화" (pw:2.5, rng:2)

### 4-2. 범위 공격 (`aoe_area`)
- 중심 타겟 + 반경 `rad` 내 모든 적
- 예: 환웅 "천부인·뇌" (pw:1.3, rng:4, rad:1)

### 4-3. 다단 히트 (`multi`)
- N회 연속 타격, 각 `pw` 배율
- 예: 궁병 "연사" (h:2, pw:0.7)

### 4-4. 힐 (`heal_single` / `heal_area`)
- 아군 HP 회복, 경험치 +15
- 예: 우사 "치유의 비" (pw:0.8, rad:1)

### 4-5. 버프 (`buff_def`, `buff_mov`, `buff_eva`)
- 3턴 지속, 자기/범위
- 예: 보병 "방패막기" (def +50%)

### 4-6. 소환/부활 (`revive`)
- MVP에선 웅녀 "생명의 빛" 1종만

### 4-7. 디버프 (`debuff_area`)
- 적중률/이속 감소
- 예: 운사 "안개"

**MVP 스킬 수**: EP.1에 캐릭터당 2~3개. 레벨업으로 스킬 해금은 Phase 2 이후.

---

## 5. 적 AI (squad-3d 개선)

```
각 적 유닛 턴에:
1. 가장 가까운 아군 탐색 (맨해튼 거리)
2. 사거리 안 → 공격 (HP 40% 이하 동료 있으면 힐 우선)
3. 사거리 밖 → 이동 (아군 방향 BFS, 최대 `mov`칸)
4. 이동 후 사거리 안이면 공격
5. 대기
```

**난이도별 옵션**:
- **Easy**: 30% 확률로 대기 (튜토리얼)
- **Normal**: 기본 로직
- **Hard**: 체력 낮은 아군 우선 타겟 + 포메이션 유지

---

## 6. 컷인 시스템 (3d.html 3단 타이밍)

```
[300ms]  공격자·방어자 좌우 슬라이드인, 배경 암막
[600ms]  공격자 좌우 진동 + 타격음 → 방어자 shake
          · 데미지 숫자 팝업 (크리티컬이면 빨강+확대)
          · 스킬명 텍스트
          · 원소 파티클 (fire/thunder/wind/water)
[500ms]  반격 있으면 역방향 반복
[300ms]  페이드아웃 → 씬 복귀
```

씬은 항상 **character_cam**으로 임시 전환 후 복귀.

---

## 7. 오디오 (allinone AudioManager 이식)

**BGM** (Web Audio API 펜타토닉 생성):
- `title` (평화)
- `battle` (긴박)
- `boss` (웅장)
- `victory` (개선)

**SFX 8종**:
`hit` / `skill` / `heal` / `death` / `click` / `levelup` / `victory` / `crit`

**규칙**:
- 모바일 자동 mute (터치 전)
- 설정 메뉴에 BGM/SFX 볼륨 슬라이더
- v6의 "삑삑 게임보이" 하드코딩 MIDI 금지 — 펜타토닉 + ADSR 엔벨로프

---

## 8. 이동 범위 BFS (3d.html 이식)

```javascript
function calcMoveRange(unit, map, allUnits) {
  const visited = new Set();
  const queue = [[unit.x, unit.y, unit.mov]];
  const result = [];
  while (queue.length) {
    const [x, y, m] = queue.shift();
    const key = `${x},${y}`;
    if (visited.has(key) || m < 0) continue;
    visited.add(key);
    if (!canPass(map, x, y, allUnits, unit.team)) continue;
    result.push({ x, y });
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy]) => {
      const terrainCost = TERRAIN_COST[map[y+dy]?.[x+dx]] || 1;
      queue.push([x+dx, y+dy, m - terrainCost]);
    });
  }
  return result;
}
```

지형 이동 비용: 평지 1, 숲 2, 산 3, 물 통과불가, 길 1 (기마 0.5).

---

## 9. 날씨 시스템 (allinone 이식)

| 날씨 | atkMod | movMod | 특수 |
|------|--------|--------|------|
| 맑음 | 0 | 0 | - |
| 비 | 0 | -1 | 불 스킬 데미지 -30% |
| 눈 | -2 | -1 | - |
| 안개 | 0 | 0 | 시야 3칸 (fog of war) |

에피소드마다 고정 or 랜덤. EP.1 환웅은 "맑음" 고정 (시련 순수 난이도).

---

## 10. HUD (2D 오버레이)

```
┌─────────────────────────────────────────────────┐
│ [턴] 1 · 아군                 [날씨] ☀️ [⚙] │
├─────────────────────────────────────────────────┤
│                                                 │
│          3D 전투 씬 (Three.js)                  │
│                                                 │
│                                    [미니맵]    │
├─────────────────────────────────────────────────┤
│  👑 환웅 Lv.3  HP 48/50  MP 20/20  XP ▓▓▓░ 60/100│
│  [공격] [스킬▼] [아이템] [대기]    [카메라: 택티컬▼]│
└─────────────────────────────────────────────────┘
```

---

## 11. 보상 & 전후 씬

**승리 시**:
1. 전투 결과 화면 (각 유닛 XP 증가 표시)
2. 레벨업 연출 (있으면)
3. 드롭 (EP.1은 고정 보상: 회복약 +3 / EP.2부터 랜덤)
4. 엔딩 대사 → 맵 복귀

**패배 시**:
1. 페이드아웃 → "패배" 타이틀
2. [재도전] [맵으로] 버튼
3. 자동 리플레이 X (모바일 배터리)
