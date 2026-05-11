# ComfyUI Portrait 양산 가이드 (한국사RPG)

코에이 영걸전(三國志 英傑伝/孔明伝)풍 정면 흉상 만화체 portrait 26개를 ComfyUI(Z-Image 등)로 직접 생성하기 위한 작업 매뉴얼.

기준 자산: `assets/portraits/hwanoong.png` (환웅) — 이 그림의 톤·채도·붓터치·구도가 26개 캐릭터의 스타일 레퍼런스.

---

## 1. 공통 스타일 (모든 캐릭터 공통 적용)

### 출력 규격
- 해상도: **1024×1024** (정사각, 기본) 또는 **768×1024** (세로, 대화창 큰 컷용)
- 형식: **PNG** (투명배경 권장, 불가시 단색 무지 배경 — 각 캐릭터 `bgColor` 참고)
- 구도: **정면 흉상 (bust shot, head-and-shoulders)**, 카메라 시선 정면, 얼굴 중심 화면 상단 1/3 지점

### Positive Prompt (앞에 항상 붙임)
```
masterpiece, best quality, koei eiketsuden style, sangokushi eiketsuden portrait,
anime manga illustration, ancient korean mythology, gojoseon era,
bust shot, front view, head and shoulders, centered composition,
soft cel shading, clean lineart, warm oriental color palette,
solid plain background, detailed face, expressive eyes,
{캐릭터별 추가어}
```

### Negative Prompt (공통)
```
lowres, blurry, jpeg artifacts, watermark, signature, text, logo,
3d render, photorealistic, photograph, western cartoon, chibi, sd,
full body, multiple characters, crowd, complex background, landscape,
deformed face, extra fingers, bad anatomy, cropped head, side view, back view,
modern clothing, hanbok joseon, modern hairstyle
```

### Sampler 권장값 (Z-Image / SDXL 계열)
| 항목 | 값 |
|---|---|
| Sampler | `dpmpp_2m_karras` 또는 `euler_a` |
| Steps | 28~35 |
| CFG | 6.0~7.5 |
| Denoise | 1.0 (txt2img), 0.55~0.7 (img2img 변형) |
| Seed | **캐릭터별 고정** (동일성 유지용. 처음 마음에 든 시드 메모) |
| Hi-Res Fix | 1.5x, denoise 0.4 (얼굴 디테일 보강) |

### 일관성 유지 팁
1. 환웅 그림을 **IP-Adapter** 또는 **Reference-Only ControlNet** 으로 묶어 톤/채도 통일.
2. 종족별로 시드를 묶기: 천계 5신장은 시드대역 A, 호족 5인은 시드대역 B, NPC는 자유.
3. 같은 캐릭터 재생성 시 **시드+프롬프트 100% 동일**하게 유지(머리색·옷색 흔들리면 게임 내 동일 인물로 안 보임).
4. 이마·눈·턱선 위치를 환웅과 비슷한 비율로 맞춰야 cutin/빌보드에서 자연스러움.

---

## 2. 캐릭터별 프롬프트 표 (26명)

### Phase E — 천상계 (환웅 제외 7명)

| key | 한국어 설명 | 영문 추가어 (Positive append) | 저장 파일명 |
|---|---|---|---|
| `hwanin` | 환인 — 하늘의 아버지 | elder sky god, long white beard, golden crown, divine aura, gold-yellow robe, benevolent expression, supreme deity | `hwanin.png` |
| `pungbaek` | 풍백 — 바람의 신장 | wind general, flowing blue-grey robes, wind swirls around head, sharp eyes, slender warrior, pale blue tone | `pungbaek.png` |
| `usa` | 우사 — 비의 신장 | rain general, dark blue robe with water droplet patterns, wet hair strands, calm cool expression, indigo palette | `usa.png` |
| `unsa` | 운사 — 구름의 신장 | cloud general, soft grey-white robe, cloud motifs floating around shoulders, gentle mystical face, pale lavender tone | `unsa.png` |
| `cheonmujang` | 천무장 — 하늘의 장수 | heavenly captain, red lacquered armor, fierce warrior face, ornate shoulder guards, sword hilt visible, crimson palette | `cheonmujang.png` |
| `noigong` | 뇌공 — 천둥 궁수 | thunder archer, dark teal robe, lightning patterns, bow over shoulder, intense focused eyes, electric blue accents | `noigong.png` |
| `hwashin` | 화신 — 불의 신장 | fire god, red-orange robe, flame motifs in hair, glowing fierce eyes, burning aura, vermilion palette | `hwashin.png` |
| `sanryeong` | 산령 — 산의 영령 | mountain spirit, earthy brown robe, antlers or stag horns, weathered wise face, moss-green accents, ancient aura | `sanryeong.png` |
| `sujang` | 수장 — 물의 궁수 | water archer, deep blue robe with wave patterns, wet braided hair, bow in hand, serene cool gaze, aqua palette | `sujang.png` |

> 참고: Phase E 묶음 = 천상계 5신장(풍백·우사·운사·천무장·뇌공·화신·산령·수장 중 시나리오상 5인) + 환인.

### Phase F — 단군 시조 3인

| key | 한국어 설명 | 영문 추가어 | 저장 파일명 |
|---|---|---|---|
| `dangun` | 단군왕검 — 왕 | young king dangun, golden royal crown, embroidered yellow robe, noble dignified face, gojoseon founder, regal aura | `dangun.png` |
| `ungnyeo` | 웅녀 — 지모신 | bear-turned-goddess, long dark hair, pink-rose robe, gentle maternal face, subtle bear ear motif on hairpin, mother earth aura | `ungnyeo.png` |
| `sinha_general` | 신하장군 — 단군의 충직한 기마 대장군 (황금 갑옷·투구·창, 콧수염, 사슴 흉부 자수) | dangun's loyal cavalry grand general, golden ochre armor with deer/stag chest emblem, ornate horned helmet, thick black moustache, spear in hand, red cape, veteran horseback commander, gold-amber palette, dignified bearded face | `sinha_general.png` |

### Phase G — 호족 5인 (적대 부족, 호랑이족)

| key | 한국어 설명 | 영문 추가어 | 저장 파일명 |
|---|---|---|---|
| `hojok_chief` | 호족 부족장 — 범족장 | tiger tribe chieftain, tiger fur cloak, fierce scarred face, dark red war paint, savage but proud, crimson-brown palette | `hojok_chief.png` |
| `hojok_warrior` | 호족 전사 | tiger tribe warrior, leather armor with tiger fur trim, rough male face, war scar, dark brown palette | `hojok_warrior.png` |
| `hojok_archer` | 호족 궁수 | tiger tribe archer, hide vest, focused narrow eyes, arrow quiver on back, earthy ochre palette | `hojok_archer.png` |
| `hojok_rider` | 호족 기마 | tiger tribe horse rider, leather riding gear, windswept hair, confident smirk, saddle strap visible, tan-brown palette | `hojok_rider.png` |
| `hojok_shaman` | 호족 샤먼 | tiger tribe shaman, bone mask pushed back, dark purple ritual robe, feather and tooth necklace, mystical eerie eyes, dark violet palette | `hojok_shaman.png` |

### Phase H — NPC 8인 (마을 사람들)

| key | 한국어 설명 | 영문 추가어 | 저장 파일명 |
|---|---|---|---|
| `elder` | 마을 어른 | village elder, white beard, faded beige hanbok-like robe, kind wise eyes, walking staff hint, warm earth tone | `elder.png` |
| `hunter` | 사냥꾼 | village hunter, green hide vest, rugged tanned face, bow over shoulder, alert eyes, forest green palette | `hunter.png` |
| `shopkeeper` | 상인 | village shopkeeper, golden-yellow vest, plump friendly merchant face, coin pouch at belt, cheerful smile, gold tone | `shopkeeper.png` |
| `tavern_master` | 주막 주인 | tavern keeper, brown apron over tunic, hearty middle-aged man, sake gourd at side, welcoming grin, amber-brown palette | `tavern_master.png` |
| `merchant` | 도구상 상인 | tool merchant, sandy beige robe with tool pouches, thin shrewd face, eyeglass or magnifier, neutral tan palette | `merchant.png` |
| `traveler` | 나그네 — EP1 신시 주점의 떠돌이 손님 (적 정보를 흘리는 익명 여행자, 옆 테이블 손님 느낌) | anonymous wandering traveler sitting at tavern side table, brown hooded cloak half-down, dusty weatherbeaten face, travel backpack strap visible, sake cup in hand, knowing half-smile of an information-broker, sepia-earth palette, low-key common-folk vibe (no royal aura) | `traveler.png` |
| `gatekeeper` | 문지기 | village gatekeeper, grey leather armor, helmeted stoic guard, spear haft visible, neutral grey palette | `gatekeeper.png` |
| `narrator` | 내레이션 — 장면/시대/오브젝트 설명 시스템 텍스트 (캐릭터 아님) | (portrait 불필요 — 텍스트 전용. 시나리오 분석 결과 narrator는 한 번도 캐릭터로 등장하지 않고 모든 대사가 "BC 2370년...", "신단수가 바람에 흔들린다" 같은 장면 묘사·튜토리얼 지시뿐. 대화창에서 emoji 📜 + 회색 톤 기본값만 사용. 생성 보류) | `narrator.png` (생성 보류) |

---

## 3. 통합 절차 (생성 → 게임 반영)

### 단계 1: ComfyUI 생성
1. 위 표의 영문 추가어를 공통 Positive Prompt 끝에 붙여 ComfyUI 실행.
2. 마음에 드는 결과의 **시드 번호를 메모** (`<key>_seed.txt` 같이 따로 적어두면 좋음).
3. 결과 PNG를 **저장 파일명**대로 저장.

### 단계 2: 파일 배치
- 저장 경로: `D:\AI\04_게임\한국사RPG\assets\portraits\<key>.png`
- 예: `assets/portraits/dangun.png`, `assets/portraits/hojok_chief.png`

### 단계 3: portraits.json 등록
`js-v8/data/portraits.json` 에서 해당 줄에 `"image"` 필드 추가 (환웅 줄이 예시).

**한 줄 예시** (단군 추가 시):
```json
"dangun":  { "emoji": "🏛️", "color": "#aa8a2a", "bgColor": "#fff0cc", "desc": "단군왕검 — 왕", "image": "./assets/portraits/dangun.png" },
```

> 핵심: 기존 줄 끝 `}` 앞에 `, "image": "./assets/portraits/<key>.png"` 만 추가하면 됨. 이모지/색상은 fallback이므로 그대로 둔다.

### 단계 4: 게임 확인
- 대화창 큰 portrait: 자동 사용 (cutin.js / dialogue.js 가 image 필드 우선 로드).
- cutin: 공격 시 큰 컷인으로도 동일 이미지 재사용.
- 빌보드(머리 위): 작은 썸네일 자동 다운스케일.

---

## 4. 권장 배치 순서 (병석님 우선순위)

| Phase | 묶음 | 캐릭터 | 권장 작업 시점 |
|---|---|---|---|
| **E** | 천상계 | `hwanin`, `pungbaek`, `usa`, `unsa`, `cheonmujang`, `noigong`, `hwashin`, `sanryeong`, `sujang` | 1순위 — 환웅과 같은 천상계, 스타일 통일성 검증용 |
| **F** | 단군 시조 | `dangun`, `ungnyeo`, `sinha_general` | 2순위 — 주역 3인, 대화 빈도 최고 |
| **G** | 호족 | `hojok_chief`, `hojok_warrior`, `hojok_archer`, `hojok_rider`, `hojok_shaman` | 3순위 — 전투/적 진영 |
| **H** | 마을 NPC | `elder`, `hunter`, `shopkeeper`, `tavern_master`, `merchant`, `traveler`, `gatekeeper`, `narrator` | 4순위 — 사이드 NPC, 마지막 |

**전체: 26개** (환인 1 + 천계신장 8 + 단군3 + 호족5 + NPC8 = 25 본문 + 환인 = 합계는 위 표 참조)

---

## 5. 품질 체크리스트 (각 캐릭터 완성 후)

- [ ] 1024×1024 또는 768×1024 PNG
- [ ] 정면 흉상 (얼굴 잘림 없음)
- [ ] 환웅 기준 톤 ±20% 이내 (너무 화려·너무 칙칙 X)
- [ ] 단색/투명 배경 (복잡한 풍경 X)
- [ ] 얼굴이 화면 상단 1/3 ~ 1/2 영역에 위치
- [ ] 시드/프롬프트 메모 저장 (재생성 대비)
- [ ] `portraits.json` 에 `"image"` 경로 추가
- [ ] 게임 실행해서 대화창·cutin·빌보드 3군데 모두 정상 표시

---

## 시나리오 결정 (2026-05-12)

- **sinha_general**: 단군의 충직한 기마 대장군으로 확정. 근거 — `units.json:158-170` (team=ally, unitType=기마병, skills=charge/war_cry, atk24·spd12), `story_ep2.json:58,71,108`에서 단군에게 "단군님" 호칭 + "명 받듭니다" + 출진·승리 보고를 도맡고, `portrait_art.js:433-464` SVG가 이미 황금 갑옷·투구·창·콧수염·사슴 자수로 묘사. 디자인은 이 SVG를 ComfyUI로 충실 재현.
- **traveler**: EP1 신시 주점의 익명 여행 손님으로 확정. 근거 — `story_ep1.json:62`에서 `ep1_tavern` 트리거 안에만 등장해 주점주인 대사 사이에 끼어들어 "뇌공·수장 원거리 주의" 정보를 흘림. `maps.json` npc 배열엔 미등록 → 마을 고정 NPC가 아니라 주점 내 옆 테이블 손님. 평민·정보 브로커 톤으로 디자인.
- **narrator**: 캐릭터가 아닌 시스템 내레이션으로 확정 — portrait 불필요. 근거 — `story_ep1.json`(32,33,105,112,122-126)과 `story_ep2.json`(21,49,52) 모든 대사가 "환웅 일행이...도착했다", "BC 2370년...", "고인돌 아래 옛 신장들의 뼈가 묻혀 있다", "유닛을 클릭해..." 등 시간·공간·오브젝트 묘사 및 튜토리얼 지시뿐. 캐릭터 발화 0건. 대화창에서는 emoji 📜 + 회색 톤 기본값으로 충분, ComfyUI 생성 보류.
