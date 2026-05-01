# 04_EPISODE_STORY — 에피소드/스토리 매핑

> **원칙**: 스토리는 `fullloop.html` + `v6.html` + `js/story.js`에서 데이터만 추출, JSON으로 정제.
> 그래픽/렌더링은 전부 재작성 (참고 금지).

---

## 1. 4부작 구조

| EP | 제목 | 시대 | 주인공 | 동료 | 적 |
|----|------|------|--------|------|-----|
| 1 | 환웅의 시험 | 신화, BC 2333 前 | 환웅 | 풍백·우사·운사 | 천무장·뇌공·화신·산령·수장 |
| 2 | 단군의 건국 | BC 2333 | 단군왕검 | 웅녀·신하장군·풍백 | 호족군·토착 부족장 |
| 3 | 위만의 진출 | BC 194 | 위만 | 연나라 유민 장수들 | 조선상 역계경·한의 사자 |
| 4 | 부여·삼한 | BC 2~AD 3세기 | 부여왕 해모수/박혁거세 | 각 부족 족장 | 한사군·낙랑 |

---

## 2. EP.1 환웅의 시험 — MVP 타겟 ★

### 2-1. 구조
```
[타이틀] → [오프닝 시네마틱: 환인·환웅 대화 4컷]
       → [전투 맵 페이드인]
       → [튜토리얼 대사: 진형·병력 개념]
       → [전투 (턴제 4vs5)]
       → [승리 시네마틱: 천부인·동료 합류]
       → [엔딩 → EP.2 예고]
```

### 2-2. 대사 (story_ep1.json)

```json
{
  "id": "ep1",
  "title": "환웅의 시험",
  "scenes": [
    {
      "id": "opening_1",
      "type": "dialogue",
      "camera": "tactical",
      "lines": [
        { "speaker": "환인", "portrait": "hwanin", "text": "아들아, 어찌 북방 거친 땅을 원하느냐. 남쪽이 뭐가 좋다고." },
        { "speaker": "환웅", "portrait": "hwanwoong", "text": "홍익인간 — 널리 인간을 이롭게 하고자 합니다." },
        { "speaker": "환인", "portrait": "hwanin", "text": "말이 아닌 몸으로 보여라. 천장들이 네 길을 막을 것이다." },
        { "speaker": "환인", "portrait": "hwanin", "text": "천무장, 뇌공, 화신, 산령, 수장 — 다섯 시련이다." }
      ]
    },
    {
      "id": "tutorial",
      "type": "tutorial",
      "lines": [
        { "speaker": "해설", "text": "진형 버튼으로 쐐기진(공격+30%) / 방어진(방어+50%)을 전환하십시오." },
        { "speaker": "해설", "text": "병력이 0이 되면 해당 부대는 전멸합니다. 잘 지키십시오." }
      ]
    },
    {
      "id": "battle",
      "type": "battle",
      "mapId": "ep1_trial",
      "camera": "tactical_locked",
      "allies": ["hwanwoong", "pungbaek", "usa", "unsa"],
      "enemies": ["cheonmujang", "noigong", "hwashin", "sanryeong", "sujang"],
      "victoryCondition": "defeat_all",
      "defeatCondition": "allies_wiped",
      "weather": "clear",
      "bgm": "battle"
    },
    {
      "id": "victory",
      "type": "dialogue",
      "camera": "character_hwanwoong",
      "lines": [
        { "speaker": "환인", "portrait": "hwanin", "text": "훌륭하다. 천부인을 가져가거라 — 거울, 방울, 검." },
        { "speaker": "환인", "portrait": "hwanin", "text": "풍백·우사·운사 삼천 무리와 태백산 신단수로 내려가라." },
        { "speaker": "환웅", "portrait": "hwanwoong", "text": "홍익인간의 뜻, 반드시 이루겠습니다." }
      ],
      "rewards": { "items": ["cheonbuin"], "unlock_companions": ["pungbaek","usa","unsa"] }
    },
    {
      "id": "ending",
      "type": "cinematic",
      "camera": "squad",
      "narration": "환웅 일행은 태백산 신단수 아래 신시를 열었다. 인간 세상에 새벽이 밝았으니 — 고조선의 서막이었다.",
      "next": "ep2"
    }
  ]
}
```

### 2-3. 전투 맵 스펙 (ep1_trial)
- 크기: **10×10 타일**
- 지형:
  - 중앙: 길 + 풀 (평탄)
  - 외곽: 산 (이동불가 벽)
  - 한쪽 강 (수장 배치)
  - 숲 2곳 (방어 보너스)
- 아군 배치: 좌하단 2×2
- 적 배치: 우상단 3×2 (천무장 중앙)
- 특수 타일: 신단수 1개 (우상단, HP 턴당 +5 — 아군만)

### 2-4. 유닛 스탯 (units.json 발췌)

```json
{
  "hwanwoong": {
    "name": "환웅", "title": "천왕", "class": "신장",
    "hp": 50, "mp": 20, "atk": 22, "def": 8, "mov": 4, "rng": 2,
    "skills": [
      { "id": "heavens_thunder", "name": "천부인·뇌격", "dmg": 28, "rng": 2, "mp": 20, "element": "thunder", "type": "aoe_area", "rad": 1 },
      { "id": "hongik_light",    "name": "홍익신광",    "amount": 25, "mp": 15, "type": "heal_area", "rad": 1 }
    ]
  },
  "pungbaek": { "name": "풍백", "class": "풍백", "hp": 40, "mp": 18, "atk": 20, "def": 7, "mov": 5, "rng": 1, "skills": [{ "id": "storm", "name": "폭풍", "dmg": 22, "rng": 3, "mp": 12, "type": "aoe_area", "rad": 1 }] },
  "usa":      { "name": "우사", "class": "우사", "hp": 38, "mp": 22, "atk": 16, "def": 6, "mov": 3, "rng": 3, "skills": [{ "id": "rain_heal", "name": "치유의 비", "amount": 20, "mp": 10, "type": "heal_area", "rad": 1 }] },
  "unsa":     { "name": "운사", "class": "운사", "hp": 35, "mp": 18, "atk": 24, "def": 5, "mov": 4, "rng": 2, "skills": [{ "id": "thundercloud", "name": "뇌운", "dmg": 32, "rng": 2, "mp": 10, "type": "single" }] },
  "cheonmujang": { "name": "천무장", "class": "보병", "hp": 60, "mp": 0, "atk": 26, "def": 12, "mov": 3, "rng": 1 },
  "noigong":     { "name": "뇌공",   "class": "궁병", "hp": 38, "mp": 0, "atk": 22, "def": 6, "mov": 4, "rng": 3 },
  "hwashin":     { "name": "화신",   "class": "신장", "hp": 45, "mp": 15, "atk": 25, "def": 8, "mov": 4, "rng": 2, "skills": [{ "id": "fire", "name": "화염", "dmg": 24, "rng": 2, "mp": 12, "type": "aoe_area", "element": "fire", "rad": 1 }] },
  "sanryeong":   { "name": "산령",   "class": "보병", "hp": 50, "mp": 0, "atk": 20, "def": 14, "mov": 2, "rng": 1 },
  "sujang":      { "name": "수장",   "class": "궁병", "hp": 35, "mp": 0, "atk": 22, "def": 5, "mov": 4, "rng": 3 }
}
```

---

## 3. EP.2 단군의 건국 — 마을+전투

### 3-1. 구조
```
[마을(신시) 탐색 ★] → NPC 대화 · 상점 · 정보수집
       → [회의장 이벤트] → [출진 선택]
       → [전투] → [승리] → [다음 지역 해금]
```

### 3-2. 마을 구현 (NO 마리오)
- **3D 맵**: 12×10 타일, 건물 6종 (오두막/주점/상점/고인돌/신단수/회의장)
- **캐릭터 이동**: WASD or 터치 드래그 (Character 카메라)
- **NPC**: 오버헤드 아이콘 (말풍선 !), 상호작용 `E` 키
- **상점**: 건물 진입 시 패널 UI (회복약·무기 3종만, MVP엔 3종 한정)

### 3-3. 동료 영입
- 웅녀 (기본 영입)
- 신하장군 (퀘스트)
- 추가 풍백·우사 합류 이벤트

---

## 4. EP.3 위만의 진출 — Phase 2+

단군 → 부여·삼한 사이의 "이민자 영웅" 스토리. 연나라 유민 위만이 조선에 귀화 → 세력 확장 → 왕검성 점령.

- 맵: 3~5개 전장
- 특이 규칙: 외교 선택지 (항복 권유 vs 전투)

---

## 5. EP.4 부여·삼한 — Phase 3

- 여러 소왕국 선택제 (해모수 부여 vs 박혁거세 신라 vs 김수로 가야)
- 플레이어 루트 분기 → 엔딩 3종
- 한사군 격퇴 최종 보스

---

## 6. 스토리 데이터 이식 체크리스트

기존 파일에서 JSON으로 추출 대상:

- [ ] `korean-rpg-fullloop.html` — DLG_COUNCIL, DLG_TAVERN, 개막/승리 대사
- [ ] `korean-rpg-v6.html` — 4챕터 대사, 단군·위만·부여 텍스트
- [ ] `js/story.js` (58KB) — 가장 확장된 스토리, 퀘스트 데이터
- [ ] `js/config.js` — 유닛 스탯 (PROMOTIONS 제외 — MVP 동결)
- [ ] `korean-rpg-allinone.html` — EP.2 살수대첩 (임시 자료, EP.2 단군으로 교체)

**주의**: 살수대첩(allinone EP.2)은 고조선 시대가 아니므로 **EP.5(차차기)로 이월**. v8 EP.2는 단군 건국.

---

## 7. 저장/이어하기

- `localStorage` key: `history-rpg-save-v8`
- 저장 시점: 에피소드 완료 / 마을 도착 / 수동 저장
- 데이터: `{ episode, completedScenes, partyLevels, inventory, gold }`
- **자동 저장**: 5분마다 (Quiet save, 알림 없음)
