# AUTO_REPORT — history-rpg (한국사 영웅전)

---

## [AUTO] 2026-06-13 history-rpg — v16.0 기술트리12종+세력관계Canvas+문화유산8종+황금기+진형시뮬레이터6종+영웅열전12인+전술분석Canvas+사계절+15퀴즈추가(120→135)+12업적추가(72→84)+SFX10종+키보드8종

### 1차: 벤치마킹 분석 (영걸전/문명/AOE 대비)

| 열위점 | 해결 방안 | 결과 |
|--------|----------|------|
| 기술 연구 트리 없음 | 12종 기술 4단계 트리 (석기→왕국) | v16_patch.js |
| 세력 관계 시각화 없음 | Canvas 5세력 관계도 + 외교 액션 | v16_patch.js |
| 문화 발전 시스템 없음 | 문화점수 + 8종 유산 건설 | v16_patch.js |
| 황금기 메카닉 없음 | 3종 황금기 (군사/문화/경제) 5분 | v16_patch.js |
| 진형 시뮬레이터 없음 | Canvas 6종 진형 (정면/쐐기/원/학익/매복/거북) | v16_patch.js |
| 영웅 스토리 없음 | 12인 영웅 열전 카드 | v16_patch.js |
| 전투 후 분석 없음 | Canvas 6축 레이더 차트 | v16_patch.js |
| 사계절 시스템 없음 | 4계절 순환 + 효과 | v16_patch.js |
| 퀴즈 부족 | +15문 (120→135) | v16_patch.js |
| 업적 부족 | +12개 (72→84) | v16_patch.js |

### 2차: 개발 내역

**v16_patch.js** 신규 (663줄 ~40KB, 자기완결형 IIFE 패치 모듈)
- 기술 연구 트리: 12종 4단계 (석기→토기→농경/청동→관개/철기/마/문자→축성/병법/교역→왕국)
- 세력 관계 Canvas: 5세력 (고조선/부여/한/삼한/예맥) 관계선+수치+외교액션
- 문화 발전: 8종 유산 (고인돌/제천단/시장/서당/서고/연희장/기념비/궁궐) + 문화점수
- 황금기: 3종 (군사/문화/경제) 5분 타이머 + 전체 보너스 +50%
- 진형 시뮬레이터: Canvas 6종 (정면/쐐기/원/학익/매복/거북) 유닛 배치 시각화
- 영웅 열전: 12인 (환웅/단군/웅녀/풍백/우사/운사/비류/위만/성기/해모수/주몽/유화)
- 전술 분석: Canvas 6축 레이더 (공격/방어/전략/사기/보급/문화) + 전투통계
- 사계절: 봄/여름/가을/겨울 순환 + 계절별 전투/생산 효과
- 퀴즈 +15문 (120→135): 고조선 강역/명도전/영고/동맹/민며느리제/책화/마한/진유민/세형동검/한사군/반달돌칼/고인돌/형사취수/소도 등
- 업적 +12개 (72→84): 학자/기술달인/외교관/문화인/문화수호자/태평성대/전술가/열전독파/사계절관찰자/분석가/건국의아버지/v16탐험가
- SFX 10종: research/culture_build/golden/formation/hero_open/season/faction/report/heritage/achieve_v16
- 키보드 Shift+T/F/H/G/K/N/O/S + FAB 좌측 8종

### 3차: 품질 검증

| 항목 | 결과 |
|------|------|
| JS 문법 | PASS |
| 괄호 밸런스 | ALL BALANCED (663/152/309) |
| HTML div | korean-rpg-v7: 105/105, index: 19/19 |
| 외부 CDN | 0건 |
| 개인정보 | 0건 |
| SW 캐시 | v15→v16, v16_patch.js PRECACHE |
| SEO | index.html + korean-rpg-v7.html 전면 갱신 |
| manifest | v16.0 설명 + shortcuts 기술트리/세력관계/영웅열전/진형 |

---

## [AUTO] 2026-06-04 history-rpg — v14.0 외교시스템5국+자원관리4종+날씨효과4종+건축5종+교역6로+특수임무6종+랜덤이벤트12종+전술지도+15퀴즈추가(105)+12업적추가(60)+SFX8종+키보드6종

### 1차: 벤치마킹 분석 (영걸전/문명/AOE 대비)

| 열위점 | 해결 방안 | 결과 |
|--------|----------|------|
| 외교 시스템 부재 | 5국 외교(부여/한/예/옥저/삼한) + 선물/교역/동맹/위협 | 해결 |
| 자원 관리 없음 | 식량/철/목재/금 4종 자원 + 수입/소비 시스템 | 해결 |
| 날씨 효과 없음 | 맑음/비/눈/안개 4종 + 전투 보너스/페널티 + Canvas 시각화 | 해결 |
| 건축 시스템 없음 | 성곽/곡식창고/대장간/연병장/시장 5종 + 3레벨 업그레이드 | 해결 |
| 교역 시스템 없음 | 비단길/해상로/항로/북방로/연안로/내륙로 6개 교역로 | 해결 |
| 특수 임무 없음 | 정찰/후방공작/호위/구출/외교사절/유물탐색 6종 솔로 미션 | 해결 |
| 랜덤 이벤트 부재 | 풍년/가뭄/철광석발견/산불/역병 등 12종 이벤트 | 해결 |
| 전술 지도 없음 | Canvas 세력분포도 + 도시/교역로 표시 | 해결 |
| 퀴즈 부족 | +15문 추가 (90 -> 105) 중계무역/야합/책화/소도/철정 등 | 해결 |
| 업적 부족 | +12개 추가 (48 -> 60) 외교/건축/교역/임무/이벤트 | 해결 |

### 2차: 개발 내역

**v14_patch.js: 신규 (914줄, 자기완결형 IIFE 패치 모듈)**
- 외교 시스템: 5국 (부여/한/예/옥저/삼한) 우호도 0~100 + 선물/교역/동맹/위협 4액션
- 자원 관리: 식량/철/목재/금 4종 + 프로그레스바 + 턴당 수입 + 수집 버튼
- 날씨 효과: 맑음/비/눈/안개 4종 + Canvas 시각화 + 전투 보너스/페널티
- 건축 시스템: 성곽/곡식창고/대장간/연병장/시장 5종 + 3레벨 업그레이드 + 자원 소비
- 교역 시스템: 6개 교역로 활성화/비활성화 토글 + 턴당 자원 수입
- 특수 임무: 정찰/후방공작/호위/구출/외교사절/유물탐색 6종 순차 해금
- 랜덤 이벤트: 12종 (풍년/가뭄/철광석/산불/상인/역병/피난민/사절/홍수/고인돌/영고/명궁)
- 전술 지도: Canvas 500x400 세력분포도 + 도시마커 + 교역로 점선
- 퀴즈 +15문 (90->105): 중계무역/야합/책화/소도/철기전파/만매장/제천시기/유물/장수/철정 등
- 업적 +12개 (48->60): 외교달인/동맹/자원왕/건축/교역왕/날씨/임무/이벤트/퀴즈/v14마스터
- SFX 8종: diplo_view/diplo_gift/diplo_threaten/resource_collect/weather_change/build_complete/trade_toggle/mission_complete/event_trigger/achievement_v14
- 키보드 단축키 +6종: Shift+D/R/W/B/A/M

**sw.js**: v13->v14 (krpg-v14, v14_patch.js PRECACHE+자동주입)
**index.html**: v14.0 SEO 전면 갱신 (title/desc/keywords/OG/Twitter/JSON-LD) + 신기능배지8종 + 60업적
**korean-rpg-v7.html**: v14.0 (title/desc/keywords + v14스크립트태그 + 타이틀신기능)
**manifest.json**: v14.0 설명 + shortcuts 외교/건축/전술지도

### 3차: 품질검증 결과

| 항목 | 결과 |
|------|------|
| JS 문법 (node -c) | PASS |
| 괄호 밸런스 () | 701/701 OK |
| 괄호 밸런스 {} | 386/386 OK |
| 괄호 밸런스 [] | 127/127 OK |
| HTML div 밸런스 (v7.html) | 105/105 OK |
| HTML div 밸런스 (index.html) | 19/19 OK |
| CDN 참조 | 0건 |
| 개인정보 노출 | 0건 (canonical URL 제외) |

---

## [AUTO] 2026-05-30 history-rpg — v13.0 진형시스템6종+영웅각성12인+유물도감15종+전쟁사연대기8편+유닛도감8종+캠페인8종+시대진보+전투통계대시보드+15퀴즈추가(90)+12업적추가(48)+SFX6종+키보드5종

### 1차: 벤치마킹 분석 (영걸전/문명/AOE 대비)

| 열위점 | 해결 방안 | 결과 |
|--------|----------|------|
| 진형 시스템 없음 (영걸전) | 6종 전술 진형 (학익진/어린진/방진/추형진/언월진/장사진) + Canvas 배치도 + 스탯 보너스 | 해결 |
| 영웅 강화/각성 없음 (영걸전) | 12인 영웅 각성 시스템 (기본→각성 스탯 상승 + 고유 스킬 해금 + 배경 스토리) | 해결 |
| 유물 수집 콘텐츠 부족 (문명) | 15종 역사 유물 도감 (천부인/비파형동검/고인돌/세형동검 등, 챕터별 자동 수집) | 해결 |
| 전쟁사 연대기 없음 (AOE) | 8편 전쟁사 타임라인 (BC2333 건국~AD3C 삼한, 클릭 시 상세 펼침) | 해결 |
| 유닛 상세 도감 없음 (AOE) | 8종 유닛 도감 (보병/궁병/기마병/치유사/마법사/장수/척후병/공성병, 스탯 바+상성) | 해결 |
| 군사 캠페인 없음 (AOE) | 8종 캠페인 (신시건설→삼한통일, 순차 해금+보상+난이도) | 해결 |
| 시대 진보 없음 (문명) | 8단계 시대 진보 (신석기→삼국시대, 챕터 진행에 따른 자동 진보) | 해결 |
| 전투 통계 미흡 | 전투 대시보드 (승리/패배/승률/턴/퀴즈/업적 6카드 + Canvas 바차트) | 해결 |
| 퀴즈 부족 (75) | 15문 추가 (75→90, 홍익인간/우가/학익진/팔조법금/무천 등) | 해결 |
| 업적 부족 (36) | 12개 추가 (36→48, 진형달인/각성/유물/전쟁사/유닛/캠페인/시대) | 해결 |

### 2차: 개발 작업 내역

**v13_patch.js: 신규 (907줄 ~62KB, 29섹션, 자기완결형 IIFE 패치 모듈)**

- 진형 시스템: 6종 (학익진/어린진/방진/추형진/언월진/장사진)
  각 진형 스탯 보너스(공격/방어/이동) + Canvas 400x300 배치도 시각화 + 카드 선택 UI
- 영웅 각성: 12인 영웅 (환웅/웅녀/단군왕검/풍백/우사/운사/성기장군/부여왕/위만/준왕/우거왕/천군)
  SSR/SR/R 티어 + 기본→각성 스탯 비교 + 고유 스킬 해금 + 배경 스토리 + 각성 연출
- 유물 도감: 15종 (천부인/비파형동검/고인돌/세형동검/청동거울/철제무기/반달돌칼/미송리식토기/금제이식/철정/소금/단궁/과하마/옥저직물/점토대토기)
  챕터 진행 시 자동 수집 + 효과 표시 + 수집률 표시
- 전쟁사 연대기: 8편 (고조선건국/위만정변/창해군/한무제침공/왕검성함락/한사군축소/부여부상/삼한발전)
  타임라인 UI + 클릭 시 상세 펼침 + 전력 배지 + 열람 추적
- 유닛 도감: 8종 (보병/궁병/기마병/치유사/마법사/장수/척후병/공성병)
  5축 스탯 바(HP/공격/방어/속도/사거리) + 상성 강약 표시
- 캠페인: 8종 (신시건설→삼한통일, 순차 해금, 난이도 4단계, 보상)
- 시대 진보: 8단계 (신석기→삼국시대, 진행률 바 + 그리드 + 챕터 연동)
- 전투 대시보드: 6카드(승리/패배/승률/턴/퀴즈/업적) + Canvas 500x200 바차트(최근7전투)
- 퀴즈 +15문 (75→90): 홍익인간/우가/수릿날/학익진/팔조법금/중계무역/무천/사로국/비파형세형/고인돌/민며느리혼/양복/12배배상/철수출
- 업적 +12개 (36→48): 진형달인/첫각성/전원각성/유물5/고고학자/전쟁사학자/병과전문가/캠페인3/캠페인전/삼한도달/역사마스터/v13마스터
- Web Audio SFX 6종: formation_select/awakening/artifact_view/war_expand/campaign_start/achievement_v13 + hero_view/unit_view
- 키보드 단축키 +5종: T=진형, H=각성, V=유물, W=전쟁사, U=유닛도감
- 메뉴 버튼 8종 자동 삽입
- 키보드 도움말 5종 추가 삽입
- 챕터 진행 훅: 유물 자동 수집 + 시대 자동 진보 (5초 간격 체크)
- v10 업적 시스템 연동 (ACH_V13 자동 등록)

**sw.js: v12→v13 (v13_patch.js PRECACHE + 자동주입, 패치 주입 로직 리팩터)**
**index.html: v13.0 (SEO title/desc/keywords/OG/Twitter/JSON-LD 갱신 + 신기능배지 8종 + 48업적)**
**korean-rpg-v7.html: v13.0 (title/desc/keywords + 타이틀 신기능 + v13_patch.js 스크립트태그 + 키보드 도움말)**
**manifest.json: v13.0 설명 갱신 + shortcuts 진형시스템/영웅각성**

### 3차: 품질 검증

| 항목 | 결과 |
|------|------|
| JS 문법 (v13_patch.js) | PASS |
| JS 문법 (전체 11파일) | 11/11 PASS |
| HTML div 밸런스 (index.html) | 19/19 PASS |
| HTML div 밸런스 (korean-rpg-v7.html) | 77/77 PASS |
| 괄호 밸런스 {} | 390/390 PASS |
| 괄호 밸런스 () | 595/595 PASS |
| 괄호 밸런스 [] | 137/137 PASS |
| 외부 CDN (v13 파일) | 0건 PASS |
| 개인정보 노출 | 0건 PASS |
| HTML entities 따옴표 | 준수 PASS |
| 파일 삭제 | 0건 PASS |

### 파일 변경 요약

| 파일 | 변경 | 줄수 |
|------|------|------|
| js/v13_patch.js | 신규 | 907줄 (~62KB) |
| index.html | 수정 | 184줄 |
| korean-rpg-v7.html | 수정 | 401줄 |
| sw.js | 재작성 | 44줄 |
| manifest.json | 재작성 | 29줄 |
| AUTO_REPORT.md | append | +본 보고서 |

---

## [AUTO] 2026-05-24 history-rpg — v12.0 세력도8세력+관계도13인물+명장면8장+병법서12전술+전투복기+공유카드Canvas+연습모드6종+15퀴즈추가(75)+12업적추가(36)+SFX6종+키보드4종

### 1차: 벤치마킹 분석 (영걸전/문명/AOE 대비)

| 열위점 | 해결 방안 | 결과 |
|--------|----------|------|
| 세력도/월드맵 없음 | Canvas 세력도 8세력 (고조선/부여/마한/진한/변한/옥저/동예/한) | 해결 |
| 인물 관계도 없음 | Canvas 관계도 13인물 (부자/부부/신하/적대/동맹 관계선) | 해결 |
| 명장면 갤러리 없음 | 8장면 갤러리 (챕터별 해금, 상세 내러티브) | 해결 |
| 병법/전략 심화 없음 | 병법서 4카테고리 12전술 (기본/고급/역사/심화+예시) | 해결 |
| 전투 복기 없음 | 전투 로그 자동 저장 + 상세 리플레이 (20전투 보관) | 해결 |
| 공유 기능 없음 | Canvas 600x380 공유카드 + PNG다운로드/클립보드 | 해결 |
| 연습 모드 없음 | 6종 모의전투 (기본/상성/지형/포위/속전속결/방어전) | 해결 |
| 퀴즈 부족 (60) | 15문 추가 (60→75, 고조선/부여/삼한/동예/옥저) | 해결 |
| 업적 부족 (24) | 12개 추가 (24→36, 세력/명장면/병법/복기/공유/연습) | 해결 |
| BGM/SFX 부족 | 6종 추가 (faction/scene/replay/achievement/share/practice) | 해결 |

### 2차: 개발 작업 내역

**v12_patch.js: 신규 (968줄 ~55KB, 26섹션, 자기완결형 패치 모듈)**

- 세력도: Canvas 480x360 8세력 인터랙티브 맵 (고조선/부여/마한/진한/변한/옥저/동예/한)
  세력 클릭 → 상세정보 (시기/수도/인구/군사/설명) + 10개 외교관계 (적대/우호/조공/교역/복속)
- 인물 관계도: Canvas 480x400 13인물 관계 시각화
  환인→환웅→단군 부자, 환웅↔웅녀 부부, 풍백/우사/운사 신하, 위만↔준왕 적대, 14개 관계선
- 전투 복기: localStorage 20전투 자동 기록, 턴별 상세 리플레이, 승/패 결과 표시
- 명장면 갤러리: 8장면 (환웅하강/웅녀시련/단군건국/팔조법금/위만정변/왕검성항전/부여건국/삼한시대)
  챕터 진행 시 자동 해금, 상세 내러티브 텍스트
- 병법서: 4카테고리 12전술 (기본3+고급3+역사3+심화3, 각 전술별 실전 예시)
- 공유 카드: Canvas 600x380 그래디언트 + 6통계 (승리/퀴즈/업적/명장면/연속/턴)
  PNG 다운로드 + 클립보드 복사 지원
- 연습 모드: 6종 모의전투 (기본/상성/지형/포위/속전속결/왕검성방어전, 난이도 3단계)
- 퀴즈 +15문 (60→75): 천부인/영고/책화/골장제/소도/미송리식토기/중계무역/과하마 등
- 업적 +12개 (24→36): 세력탐험가/명장면수집가/병법달인/전투분석가/첫공유/외교관/훈련병/7일연속/30일연속/역사박사/백전노장/v12마스터
- Web Audio SFX 6종: faction_select/scene_view/replay_view/achievement_v12/share_card/practice_start
- 키보드 단축키 +4종: F=세력도, R=관계도, B=전투복기, P=연습모드
- 메뉴 버튼 7종 자동 삽입 (세력도/관계도/전투복기/명장면/병법서/공유카드/연습모드)
- 챕터 진행 시 명장면 자동 해금 (5초 간격 체크)
- 전투 승리 시 자동 전투 로그 저장 (onVictoryContinue 훅)
- v10 업적 시스템과 연동 (ACH_V12 → achDefs 자동 등록)

**sw.js: v11→v12 (v12_patch.js PRECACHE + 자동주입)**
**index.html: v12.0 (SEO title/desc/keywords/OG/Twitter/JSON-LD 갱신 + 신기능배지 8종 + 통계pill 36업적)**
**korean-rpg-v7.html: v12.0 (title/desc/keywords + 타이틀 신기능 + v12_patch.js 스크립트)**
**manifest.json: v12.0 설명 갱신 + shortcuts 2종 (세력도/병법서)**

### 3차: 품질 검증

| 항목 | 결과 |
|------|------|
| JS 문법 (v12_patch.js) | PASS |
| JS 문법 (v10/v11_patch.js) | PASS |
| HTML div 밸런스 (index.html) | 19/19 PASS |
| HTML div 밸런스 (korean-rpg-v7.html) | 105/105 PASS |
| 괄호 밸런스 () | 606/606 PASS |
| 괄호 밸런스 {} | 341/341 PASS |
| 괄호 밸런스 [] | 56/56 PASS |
| 외부 CDN | 0건 PASS |
| 개인정보 노출 | 0건 PASS |

---

## [AUTO] 2026-05-17 history-rpg — v11.0 역사도감30+캐릭터도감12+연표17+일일도전14+전략가이드+퀴즈60+SFX4종+SEO+키보드단축키

### 1단계: 벤치마킹 분석 (영걸전/문명/AOE 대비)

| 항목 | 벤치마크 수준 | 이전 상태 | 개선 후 |
|------|-------------|----------|--------|
| 역사 도감 | 문명: 문명백과사전 | 없음 | 30항목 (인물8+유물5+사건7+문화10) |
| 캐릭터 도감 | 영걸전: 무장열전 | 없음 | 12종 캐릭터 (SSR/SR/R 등급+로어) |
| 역사 연표 | 문명: 테크트리 | 없음 | BC2400~AD42 17개 이벤트 타임라인 |
| 일일 도전 | AoE: 일일 이벤트 | 없음 | 14종 로테이션 (날짜시드+연속기록) |
| 전략 가이드 | SRPG: 튜토리얼 | 없음 | 병종상성+지형+승급+전투팁 6항목 |
| 퀴즈 확장 | 교육+게임 융합 | 50문 | 60문 (고인돌/미송리/부여4가 10문 추가) |
| SFX 추가 | AoE: 상황별 효과음 | 8종 | 12종 (도감/일일완료/연표/가이드 4종 추가) |
| SEO 강화 | 웹표준: 검색최적화 | 기본 | keywords+canonical+JSON-LD확장 |
| 키보드 단축키 | SRPG 표준 | ?만 | E/C/L/D/G 5종 추가 (토글 지원) |
| 접근성 | WCAG 2.1 | 기본 | role=dialog, aria-label 전체 적용 |

### 2단계: 개발팀 작업

**v11_patch.js: 신규 (513줄, 자기완결형 패치 모듈)**
- 역사 도감: 30항목 (인물/유물/사건/문화 4탭 필터, 카드그리드, 상세모달)
- 캐릭터 도감: 12종 (SSR/SR/R 등급, 포트레잇, 로어, 병과, 챕터)
- 역사 연표: BC2400~AD42 17개 사건 (주요/일반 구분, 타임라인 UI)
- 일일 도전: 14종 로테이션 (날짜시드, 연속기록, XP/골드 보상)
- 전략 가이드: 병종상성표+지형효과표+승급경로표+전투팁6개
- 퀴즈 10문 추가 (미송리식토기/고인돌/부여4가/한사군/천군 등)
- Web Audio SFX 4종 (encyclopedia/daily_complete/timeline_scroll/guide_tip)
- 키보드 단축키 5종 (E=도감, C=캐릭터, L=연표, D=일일도전, G=가이드)
- 메뉴 버튼 5종 자동 삽입 (닫기 버튼 앞에 동적 삽입)
- CSS 동적 주입 (도감/캐릭터/연표/일일/가이드/모달 UI)
- ARIA role=dialog + aria-label 전 화면 적용

**index.html: v11.0 업데이트**
- 메타태그: title/description/og/twitter v11 갱신
- keywords 메타태그 신규 추가
- canonical URL 추가
- JSON-LD 확장 (keywords 필드)
- 신기능 배지 8종 갱신
- 도감30항목+일일도전 통계 pill 추가
- Footer v11.0

**korean-rpg-v7.html: v11.0 업데이트**
- title/description v11 갱신
- keywords 메타태그 추가
- 타이틀 화면 v11 신기능 4줄 추가
- 키보드 도움말 5종 추가 (E/C/L/D/G)
- v11_patch.js 스크립트 태그 직접 삽입

**sw.js: v10→v11**
- PRECACHE에 v11_patch.js 추가
- 게임 HTML에 v11_patch.js 자동 주입 (SW fetch 인터셉트)
- 오프라인 폴백에도 v11 주입 적용

**manifest.json: v11.0 설명 갱신**

### 3단계: 품질검증

| 항목 | 결과 |
|------|------|
| JS 문법 (v11_patch.js) | PASS (node -c) |
| HTML div 균형 (index.html) | 19/19 PASS |
| HTML div 균형 (korean-rpg-v7.html) | 105/105 PASS |
| 외부 CDN 사용 | 0건 PASS |
| 개인정보 노출 | 0건 PASS |
| manifest.json 유효성 | VALID PASS |
| HTML entities 따옴표 | 준수 PASS |
| 파일 삭제 | 0건 PASS |

### 파일 변경 요약

| 파일 | 변경 | 줄수 |
|------|------|------|
| js/v11_patch.js | 신규 | 513줄 |
| index.html | 수정 | 184줄 |
| korean-rpg-v7.html | 수정 | 398줄 |
| sw.js | 재작성 | 56줄 |
| manifest.json | 재작성 | 19줄 |
| AUTO_REPORT.md | append | +본 보고서 |

---

## [AUTO] 2026-05-12 history-rpg — v10.0 업적시스템+전적통계+턴순서+퀴즈40+SFX4종+SEO강화+SW스크립트주입

### 1단계: 벤치마킹 분석 (영걸전/문명/AOE 대비)

| 항목 | 벤치마크 수준 | 이전 상태 | 개선 후 |
|------|-------------|----------|--------|
| 업적 시스템 | 문명: 100+ 업적 | 없음 | ✅ 24종 업적 (전투/탐험/퀴즈/성장) |
| 전적 통계 | 영걸전: 전투기록 열람 | 없음 | ✅ 20+ 항목 통계 (localStorage) |
| 턴 순서 패널 | FE/SRPG: 행동순서 표시 | 없음 | ✅ 속도 기준 정렬+HP바 |
| 역사 퀴즈 | 교육+게임 융합 | 30문 | ✅ 40문 (고구려/백제/철기 등 10문 추가) |
| SFX 다양성 | AoE: 상황별 효과음 | 기본 | ✅ 4종 추가 (업적/전투개시/챕터클리어/승급) |
| SEO/OG 메타 | 웹표준: 검색최적화 | 기본 | ✅ OG+Twitter+JSON-LD 구조화데이터 |
| 비침습 확장 | 모듈 패턴 | 직접 수정 | ✅ SW 스크립트 주입 패턴 |
| 런처 통계 | 진행도 표시 | 없음 | ✅ 승리/퀴즈/업적 카운터 |

### 2단계: 개발팀 작업

#### js/v10_patch.js — 신규 (자체 완결 패치 모듈, ~8KB)
- **IIFE 구조**: 전역 오염 없이 CSS/DOM/훅 주입
- **24종 업적 정의**: first_blood, veteran(10승), scholar(퀴즈10), endurer(인내게임), ritualist(제천), ch1~ch4_clear, shopper(5구매), gold_hoarder(500골드), promoter(승급), healer(50힐), crit_master(10크리), explorer(3마을), collector(10아이템), counter(5반격), speed(5턴내 승리), quiz_master(퀴즈20), item_user(10사용), lvl10, lvl20, full_party(4인파티), all_clear(전챕터)
- **통계 추적 20+ 항목**: wins, losses, totalDmg, totalHeal, crits, counters, quizOk, quizTot, endurWin, ritualWin, purchases, promotions, townsVisited, itemsCollected, itemsUsed, fastWins, perfectQuiz, turns, maxDmg, kills, battles
- **턴 순서 패널**: #turn-order에 유닛 속도순 정렬, HP바 표시, 전투 중 실시간 갱신
- **함수 훅**: onVictoryContinue(승리추적), shopBuy(구매추적), answerQuiz(퀴즈추적), showTacUI/hideTacUI(턴순서 표시)
- **퀴즈 10문 추가**: 고구려 건국신화, 백제 온조왕, 팔조법금, 철기시대, 고조선 위치, 부여 특산물, 진한→신라, 소도, 옥저 풍습, 동예 법률
- **SFX 4종**: achievement(업적달성), battle_start(전투개시), chapter_clear(챕터클리어), promote(승급)
- **메뉴 확장**: #menu-overlay에 업적/전적 버튼 동적 삽입
- **주기적 업적 체크**: 15초 간격 setInterval
- **window._v10 익스포트**: 런처에서 통계/업적 접근용

#### sw.js — 수정 (서비스워커 스크립트 주입)
- 캐시명 `krpg-v9` → `krpg-v10` 업데이트
- 프리캐시 목록에 `./js/v10_patch.js` 추가
- **HTML 응답 인터셉트**: korean-rpg-v7, korean-rpg-v8 페이지에 `<script src="./js/v10_patch.js"></script>` 자동 주입
- 네트워크 응답 + 캐시 응답 모두 주입 처리
- 중복 방지: `html.indexOf('v10_patch')<0` 가드
- 파서 이슈 방지: `'<scr'+'ipt ...'` 문자열 분할

#### manifest.json — 수정
- description v10.0 업데이트: "24업적+통계+턴순서+40퀴즈+다크모드+PWA"

#### index.html — 전면 리라이트 (v10.0 런처)
- **SEO 강화**: OG 메타태그 (title/description/type/url/image), Twitter Card 메타태그
- **JSON-LD 구조화 데이터**: @type VideoGame, operatingSystem Web, genre Education+RPG
- **접근성**: skip-to-content 링크
- **실시간 통계 바**: localStorage에서 krpg_stats/krpg_ach 읽어 승리/퀴즈/업적 카운터 표시
- **게임 카드 3종**: v10 BEST(korean-rpg-v7.html), 3D Edition(korean-rpg-v8.html), v6 Legacy
- **기능 배지 8종**: 24업적, 통계, 턴순서, 40퀴즈, 다크모드, PWA, 키보드, 접근성
- **다크/라이트 모드 토글**: CSS 커스텀 프로퍼티 기반
- **파티클 캔버스 배경**: 장식용 애니메이션
- **세이브 배너**: localStorage 데이터 존재 시 표시

### 3단계: 품질 검증

| 검증 항목 | 결과 | 비고 |
|----------|------|------|
| 외부 CDN 사용 | ✅ 0건 | Three.js/Tone.js만 허용, 미사용 |
| 개인정보 노출 | ✅ 0건 | 하드코딩된 개인정보 없음 |
| 파일 삭제 | ✅ 0건 | 기존 파일 보존, 신규+수정만 |
| HTML 엔티티 | ✅ 적용 | 속성 내 따옴표 &quot; 인코딩 |
| 핵심 파일 보존 | ✅ 완전 | korean-rpg-v7.html(32KB) 미수정 |
| 비침습 패턴 | ✅ 검증 | SW 주입으로 코어 파일 무변경 |
| localStorage 키 | ✅ 일관 | krpg_stats, krpg_ach 네이밍 |
| IIFE 격리 | ✅ 검증 | 전역 오염 window._v10만 |

### 아키텍처 결정: SW 스크립트 주입 패턴

**문제**: v10_patch.js를 korean-rpg-v7.html(32KB)에 적용해야 하나, 32KB HTML 전체를 재작성하면 위험도 높음

**해결**: Service Worker fetch 인터셉터에서 HTML 응답 텍스트를 수정하여 `</body>` 앞에 스크립트 태그 주입

**장점**:
- 코어 게임 파일 무변경 (안정성)
- v7, v8 모두 동일 패치 적용
- 패치 제거 시 sw.js만 롤백
- 오프라인 캐시에서도 주입 작동

**트레이드오프**:
- SW 미활성 첫 방문 시 v10 기능 미적용 (코어 게임은 정상 작동)
- 두 번째 방문부터 완전 적용

### 파일 변경 목록
- `js/v10_patch.js` — **신규** (업적+통계+턴순서+퀴즈+SFX 패치 모듈)
- `sw.js` — 캐시 v10 + 프리캐시 + HTML 스크립트 주입
- `manifest.json` — description v10.0 업데이트
- `index.html` — v10.0 런처 전면 리라이트 (SEO+통계+카드+배지)
- `AUTO_REPORT.md` — v10.0 보고서 추가

---

## [AUTO] 2026-05-10 history-rpg — v9.0 다크모드+전투로그+파티클+난이도+퀴즈30+PWA+키보드+접근성

### 1단계: 벤치마킹 분석

| 항목 | 벤치마크 수준 | 이전 상태 | 개선 후 |
|------|-------------|----------|--------|
| 다크/라이트 모드 | 문명/FE: 테마 전환 | 다크만 | ✅ 다크+라이트 토글 |
| 전투 로그 | 영걸전: 행동 기록 표시 | 없음 | ✅ 최근 15건 실시간 로그 |
| 파티클 이펙트 | AoE: 스킬별 시각효과 | 없음 | ✅ 스킬별 색상 파티클 |
| 난이도 선택 | 문명: 난이도 단계 | 없음 | ✅ 3단계(쉬움/보통/어려움) |
| 역사 퀴즈 | 교육+게임 융합 | 20문 | ✅ 30문(삼국건국 추가) |
| PWA 서비스워커 | 웹앱: 오프라인 지원 | 없음 | ✅ sw.js 캐시+오프라인 |
| 키보드 단축키 | PC게임: 키보드 조작 | 기본만 | ✅ ? 도움말 오버레이 |
| 접근성(ARIA) | 웹표준: 스크린리더 | 없음 | ✅ ARIA 라벨 추가 |
| 전투 속도 | SRPG: 배속 기능 | 없음 | ✅ 1x/2x 토글 |
| 환경 SFX | 문명/AoE: 환경음 | 없음 | ✅ 바람/물/새/불 4종 |

### 2단계: 개발팀 작업

#### sw.js — PWA 서비스워커 (신규)
- 캐시명 `krpg-v9`, 프리캐시 10파일
- HTML: Network-first 전략
- JS: Cache-first 전략
- 오프라인 폴백 지원

#### manifest.json — PWA 메타데이터 업데이트
- `lang: "ko"`, `categories: ["games", "education"]` 추가
- description v9.0 업데이트

#### index.html — 런처 대규모 업그레이드
- CSS 커스텀 프로퍼티 기반 다크/라이트 모드
- 다크모드 토글 버튼 (우상단)
- 키보드 네비게이션 (tabindex, focus-visible)
- ARIA 라벨 전체 적용
- v9.0 버전 배지
- 기능 섹션 (다크모드/PWA/키보드/접근성 배지)
- 서비스워커 등록 스크립트

#### korean-rpg-v7.html — 게임 UI 추가
- 다크/라이트 모드 토글 버튼 + CSS 변수
- 전투 로그 패널 (#battle-log)
- 키보드 단축키 오버레이 (#kb-help)
- 파티클 이펙트 캔버스 (#particle-fx)
- 난이도 선택기 (쉬움/보통/어려움)
- 전투 속도 토글 (1x/2x)
- 서비스워커 등록

#### js/audio.js — 오디오 강화
- `ambientSFX(type)`: 바람/물/새/불 환경음 4종
- `playChordProgression(key, type)`: 화음 진행 BGM
- `dawn` BGM 패턴 추가

#### js/minigames.js — 퀴즈 10문 추가 (총 30문)
- 고구려 건국 BC 37, 백제 BC 18, 신라 BC 57
- 가야 수로왕, 주몽 부여 탈출
- 온조왕 위례성, 혁거세 6촌장
- 부여 순장, 삼한 철 생산, 변한-가야 관계

#### js/engine.js — 난이도+속도 시스템
- `G.difficulty` (0/1/2), `G.battleSpeed` (1/2)
- `window.setDifficulty(level)` 함수
- `window.toggleBattleSpeed()` 함수

#### js/battle.js — 전투로그+파티클+난이도 통합
- `battleLog` 배열 (최대 15건)
- `addBattleLog(msg)` + `renderBattleLog()`
- execAttack/execSkill/enemyAI에 로그 추가
- `spawnParticles(x,y,color,count)` 파티클 함수
- 스킬별 파티클 색상 (화=빨강, 힐=초록, 뇌=노랑, 얼음=파랑)
- 난이도 배율 적용 (적 HP/ATK, 보상 EXP/Gold)
- battleSpeed 적용 (애니메이션 타임아웃)

#### js/ui.js — 다크모드+전투로그+키보드도움말
- `toggleDarkMode()`: .light-mode 토글 + localStorage
- `initTheme()`: 저장된 테마 로드
- `showKeyboardHelp()`: 키보드 도움말 표시/숨기기
- `renderBattleLog()`: 전투 로그 렌더링
- '?' 키 리스너
- 난이도 선택 렌더링

#### js/config.js — 난이도 상수
- `DIFFICULTY` 배열: 쉬움/보통/어려움 배율

### 3단계: 품질 검증

- ✅ 외부 CDN: 0건 사용
- ✅ 개인정보 노출: 0건
- ✅ 파일 삭제: 0건
- ✅ story.js: 미수정
- ✅ HTML 엔티티: 속성 내 따옴표 처리
- ✅ 11파일 일괄 커밋

### 파일 변경 목록
- `sw.js` — **신규** (PWA 서비스워커)
- `manifest.json` — lang/categories/description 업데이트
- `index.html` — 다크모드+키보드+ARIA+기능섹션+SW등록
- `korean-rpg-v7.html` — 다크모드+전투로그+파티클+난이도+속도+SW등록
- `js/config.js` — DIFFICULTY 상수 추가
- `js/audio.js` — ambientSFX+playChordProgression+dawn BGM
- `js/minigames.js` — 퀴즈 10문 추가 (총 30문)
- `js/engine.js` — difficulty/battleSpeed 상태+함수
- `js/battle.js` — 전투로그+파티클+난이도배율+속도배율
- `js/ui.js` — 다크모드+전투로그+키보드도움말+난이도UI
- `AUTO_REPORT.md` — v9.0 보고서 추가

---

## [AUTO] 2026-05-04 history-rpg — v8.0 반격시스템+전투예측+자동저장+BGM강화+퀴즈확장+런처수정+v7HTML생성

### 1단계: 벤치마킹 분석 (영걸전/문명/AOE 대비)

| 항목 | 벤치마크 수준 | 이전 상태 | 개선 후 |
|------|-------------|----------|--------|
| 반격 시스템 | 파랜드택틱스: 공격시 반격 | 없음 | ✅ 사거리내 50% 반격 |
| 전투 예측 | FE/SRPG: 공격전 피해량 표시 | 없음 | ✅ 예상 피해/명중률/치명타 |
| 자동 저장 | 문명: 턴마다 자동저장 | 수동만 | ✅ 전투 승리시 자동저장 |
| BGM 다양성 | 챕터/상황별 테마곡 | 3패턴 | ✅ 9패턴 (챕터별+보스+상점) |
| 역사 퀴즈 | 교육+게임 융합 | 10문 | ✅ 20문 (고인돌/동검/법금 등) |
| HTML 엔트리 | 모듈화된 진입점 | 누락 | ✅ v7 HTML 완전 생성 |
| 런처 | 유효한 링크 필요 | 깨진 링크 7개 | ✅ 정리+v7/v6 링크 |
| 외부 CDN | 자체 폰트만 사용 | Google Fonts CDN | ✅ 시스템 폰트로 교체 |

### 2단계: 개발팀 작업 내역

#### battle.js — 반격 시스템 (Counterattack)
- 피격 대상이 생존 + 사거리 내이면 50% 위력으로 자동 반격
- `_countered` 플래그로 턴당 1회 제한
- 매 턴 시작시 `_countered` 초기화
- miss/crit 판정 포함, 반격으로 사망 가능

#### battle.js — 전투 예측 시스템 (Damage Preview)
- `showDmgPreview(a,t)`: 공격 전 예상 피해, 명중률, 치명타 확률 표시
- `#dmg-preview` 패널에 실시간 렌더링
- 타겟 선택 시 자동 표시, 취소 시 자동 숨김

#### battle.js — 자동 저장 (Auto-save)
- 전투 승리(`showVic`)시 슬롯 0에 자동 저장
- `#autosave-indicator`로 저장 알림 표시

#### ui.js — 자동 저장 슬롯 UI
- 슬롯 0을 `krpg7_auto` 키로 분리 관리
- 저장 화면 상단에 금테 자동저장 슬롯 표시 (불러오기 전용)
- `window.autoSave()` 편의 함수

#### audio.js — BGM 6패턴 추가
- `ch1_explore`: 챕터1 탐험 테마
- `ch2_kingdom`: 챕터2 왕국 건설 테마
- `ch3_war`: 챕터3 전쟁 테마
- `ch4_epic`: 챕터4 서사 테마
- `boss_intense`: 보스전 테마
- `shop_calm`: 상점 테마
- 4박자마다 베이스 추가, 인터벌 280ms로 조정

#### minigames.js — 역사 퀴즈 10문 추가 (총 20문)
- 팔조법금, 비파형동검, 고인돌, 신시, 제천행사
- 천군/소도, 1책12가, 위만 출신, 삼한 특징 등

#### engine.js — 미세 개선
- 카메라 추적 속도 .1 → .15 (부드러운 팔로우)
- 보물상자 상호작용 효과음 `sel` → `quest`

#### korean-rpg-v7.html — 신규 생성
- v7 모듈 시스템용 HTML 엔트리포인트 완전 생성
- 66개 DOM 엘리먼트 (모든 JS 참조와 1:1 매칭)
- 반응형 CSS: 320px/400px/600px 3단계 브레이크포인트
- `#dmg-preview`, `#autosave-indicator` 신규 스타일 포함
- 7개 JS 모듈 의존성 순서대로 로드

#### index.html — 런처 수정
- Google Fonts CDN `@import` 제거 → 시스템 폰트
- 깨진 7개 카드 링크 제거 (모두 `_archive/` 이동된 파일)
- 메인 카드를 `korean-rpg-v7.html`로 연결
- v6 레거시 카드 추가
- 버전 v2.0 → v8.0 업데이트

### 3단계: 품질 검증 결과

- ✅ HTML 구조: korean-rpg-v7.html 66개 ID 엘리먼트 정상
- ✅ JS 구문: 7/7 모듈 `node --check` 통과
- ✅ DOM 참조: JS getElementById 5건 + querySelector 4건 모두 HTML에 존재
- ✅ 외부 CDN: 0건 (Google Fonts 제거 완료)
- ✅ index.html: 깨진 링크 0건, v7+v6 정상 연결
- ✅ 반응형: 3단계 미디어쿼리 (@320/@400/@600)
- 📊 변경 규모: 7파일 수정, 1파일 신규

### 파일 변경 목록
- `korean-rpg-v7.html` — **신규** (v7 모듈 HTML 엔트리포인트)
- `index.html` — 런처 수정 (CDN 제거, 링크 정리, v8.0)
- `js/battle.js` — 반격+전투예측+자동저장
- `js/audio.js` — BGM 6패턴 추가
- `js/minigames.js` — 퀴즈 10문 추가
- `js/ui.js` — 자동저장 슬롯 UI
- `js/engine.js` — 카메라/SFX 미세조정
- `AUTO_REPORT.md` — 보고서 갱신

---

## [AUTO] 2026-04-04 history-rpg — 대규모 v2.0 업그레이드

### 1차: 벤치마킹 분석 (영걸전/문명/AOE 대비)

| 항목 | 벤치마크 수준 | 이전 상태 | 개선 후 |
|------|-------------|----------|--------|
| 에피소드 수 | 50+ 시나리오 | 1개 | 2개 (환웅+살수대첩) |
| 레벨/경험치 | 전투 후 성장 | 없음 | ✅ XP/레벨업 시스템 |
| 적 스킬 | 적도 특수기 사용 | 기본공격만 | ✅ 적 스킬 5종 |
| 사운드 | BGM+효과음 | 없음 | ✅ Web Audio API |
| 지형효과 | 방어보너스 | 없음 | ✅ 숲+2DEF, 신단수HP회복 |
| 미니맵 | 있음 | 없음 | ✅ 우측상단 미니맵 |
| 세이브 | 있음 | 없음 | ✅ localStorage |
| 날씨 시스템 | 환경 효과 | 없음 | ✅ 4종(맑음/비/눈/안개) |
| 파티클 | 이펙트 | 없음 | ✅ 스킬/힐/레벨업 파티클 |
| 크리티컬 | 확률 시스템 | 없음 | ✅ 10% 1.5배 크리티컬 |

### 2차: 개발팀 작업 내역

#### 오디오 엔진 (Web Audio API)
- AudioManager 클래스: 펜타토닉 BGM 생성기 (타이틀/전투/승리)
- SFX 8종: hit, skill, heal, death, click, levelup, victory, crit
- 음소거 토글 UI

#### EP.2 콘텐츠 제작: 을지문덕 살수대첩 (AD 612)
- 스토리 8장면: 수나라 침공 → 을지문덕 전략 → 살수 결전
- 맵 20x20: 살수(청천강) 지형 — 강/산/평원
- 아군 4명: 을지문덕, 강이식, 고건무, 을파소
- 적군 5명: 우문술, 우중문, 수나라 기병/궁병/보병
- 에피소드 선택 화면

#### 레벨/XP 시스템
- 처치 50XP, 공격 10XP, 치유 15XP
- 레벨업: +3HP, +2ATK, +1DEF
- 골든 파티클 레벨업 이펙트

#### 지형 보너스
- 숲: 방어+2
- 신단수: 턴당 HP+5 회복
- 길: 이동 보너스

#### 적 AI 강화
- 약한 유닛 우선 타겟팅 (HP비율+거리 복합)
- 적 스킬 사용 (천무장·뇌공·화신·산령·수장)
- HP 40% 미만시 힐 스킬 우선

#### UI/UX 개선
- 런처(index.html) 완전 리디자인: 파티클 배경, 세이브 배너, 기능태그
- 턴 배너 애니메이션
- 크리티컬 히트 이펙트
- HUD에 레벨/XP 표시
- 날씨 표시 UI

### 3차: 품질 검증 결과

- ✅ HTML 구조 검증: 28/28 통과
- ✅ JS 구문 검증: Node.js parse OK
- ✅ 구조적 무결성: 중괄호/대괄호/소괄호 매칭 OK
- ✅ 6개 Scene 클래스 정상 등록
- ✅ index.html 검증: 7/7 통과
- 📊 파일 크기: 76KB, 1779줄 (이전 48KB, 1307줄)

### 파일 변경 목록
- `korean-rpg-allinone.html` — 완전 리라이트 (v2.0)
- `index.html` — 런처 리디자인 (EP2, 세이브, 파티클)
- `AUTO_REPORT.md` — 보고서 생성

---

## [AUTO] 2026-04-17 history-rpg — v8 통합 빌드 (3D 회귀 대응)

### 배경
병석님 지시: v6/v7 (2D Canvas 퇴화) → Three.js 3D 복귀 + 카메라 3모드 토글 + 그래픽 일관성 강제 + 스토리 JSON 이식 + 기능 동결

### 산출물
| 영역 | 파일 | 규모 |
|------|------|------|
| 계획 | `_plan/00_MASTER.md` ~ `06_AGENT_DISPATCH.md` | 6개 MD |
| 엔진 | `js-v8/core/engine.js`, `audio.js` | 2 파일 |
| 그래픽 | `js-v8/graphics/{materials,lighting,unit_builder,terrain,buildings,effects}.js` | 6 파일 |
| 카메라 | `js-v8/camera/{tactical_cam,character_cam,squad_cam,cutin_cam,switcher}.js` | 5 파일 |
| 전투 | `js-v8/battle/{turn_manager,movement,attack,skills,xp_level,ai,weather,highlights}.js` | 8 파일 |
| UI | `js-v8/ui/{hud,dialogue,menus,settings,cutin}.js + styles.css + cutin.css` | 7 파일 |
| 월드 | `js-v8/world/{town,npc}.js` | 2 파일 |
| 데이터 | `js-v8/data/{units,skills,items,maps,story_ep1,story_ep2,portraits}.json` | 7 파일 |
| 통합 | `korean-rpg-v8.html` | 44 KB |
| 테스트 | `_test/{test_graphics,test_cameras,test_ui,test_battle}.html` + `screenshot_v8.mjs` + `headless_sim.mjs` + `ss_v8_01~07.png` | 13 파일 |

**총 39개 파일 / 5,000+줄**

### 에이전트 팀 (병렬 배분 · 6단계)
- Round 1: Agent A(엔진+그래픽) / B(카메라) / D(데이터) **병렬**
- Round 2: Agent C(전투) / E(UI+오디오) **병렬**
- Round 3: Agent F(통합 빌드)
- Round 4: QA1(그래픽) / QA2(전투) / 비서B(비판) **병렬**
- Round 5: 비서B P0 지적 3건 — terrain.js 타일매핑, setUnitActed 싱글톤 오염, 실 브라우저 스크린샷 — 직접 수정 + 에이전트 병렬
- Round 6: P1 — Exploration 핸들러 + 3D 마을 / 컷인 HTML 오버레이

### 5단계 결재라인
| 단계 | 결과 | 비고 |
|------|------|------|
| ① 팀원 | PASS | Node 문법 검증 전 모듈 통과, 5개 테스트 HTML 구동 |
| ② 팀장 | PASS | 퇴보 없음 (Three.js r160 유지, 모든 모듈 이식, v6 2D 회귀 0건) |
| ③ 품질팀 QA1 | **PASS** | 01_GRAPHICS_STANDARD §7 체크리스트 전항목 PASS. MeshBasic/Lambert/Phong 0건, AmbientLight ≥ 0.45, Noto Serif KR 강제 |
| ③ 품질팀 QA2 | **CONDITIONAL PASS** | 100회 AI 시뮬 평균 승률 66%(목표 60~75%내), 10개 버그/엣지 검출. 그 중 버그 ②~⑥은 차기 스프린트 이월 |
| ④ 사장 | (대기) | 플레이 UX 검토 필요 |
| ⑤ 비서B | **CONDITIONAL PASS** | P0 블로킹 3건 지적 → 전부 해소 완료. P1 2건 해소 완료. P2 2건 이 보고서로 해소 |

### 비서B 블로킹 해소 이력
1. **P0-1 terrain.js 타일 매핑 버그**: maps.json(0plain/1grass/2forest/3mountain/4water/5road/6sindansu)와 terrain.js TILE 상수 인덱스 불일치 → 직접 수정 ★ Node 문법 검증 PASS
2. **P0-2 setUnitActed 싱글톤 재질 오염**: 공유 MAT 싱글톤의 opacity 변경 → material.clone() 최초 1회 캐시 방식으로 직접 수정
3. **P0-3 실 브라우저 스크린샷 부재**: Playwright(chromium) 자동화로 7장 캡처, 콘솔 에러 0, 3D 유닛 4+5체 렌더 실증

### P1 해소
- **Exploration 씬 핸들러 누락** → `korean-rpg-v8.html`에 `scene.type === 'exploration'` 분기 + `world/town.js` + `world/npc.js` 신규. ep2_town 건물 5종 3D 렌더, NPC 3명 상호작용
- **컷인 HTML 오버레이 누락** → `ui/cutin.js` + `ui/cutin.css` 신규. 300/600/600/300ms 4페이즈, 좌우 포트레이트+이름+데미지 팝업+크리티컬 표시. 기존 `CameraSwitcher.enableAutoCutin`과 병행

### 밸런스 시뮬 결과 (100회 AI)
- Run 1~4: 승률 57~72% (평균 ~66%), 평균 5.1턴
- 목표 60~75% 내

### 스크린샷 및 실행 확인
- `_test/ss_v8_03_battle_overview.png` — EP.1 전투 아이소메트릭 뷰 (아군 4 / 적 5 / 산 외곽 / 숲 / 신단수 / 미니맵)
- `_test/ss_v8_05_combat_cutin.png` — Character 카메라 전환 확인
- `_test/ss_v8_07_settings.png` — 카메라 3모드 라디오 + 볼륨 슬라이더 등
- 브라우저 콘솔 에러 0 / Page Error 0

### 남은 작업 (차기 스프린트)
- QA2 버그 ①~⑩ 중 8건 (스펙 내부 모순, multi 크리 상한, 시야 제한 실제 적용, Hard AI 포메이션, 타임오버, headless_sim 실제 모듈 import, 과힐 XP 조건, revive 팀 체크)
- 그래픽 튜닝: 현재 빌드는 P0 수정 전 스크린샷이라 캐릭터 스케일/조명 강도 재촬영 필요
- EP.2 본격 구현 (현재 오프닝+마을+1차전 JSON 데이터는 준비됨, 연결만 남음)
- EP.3 위만 · EP.4 부여삼한 (MVP 범위 외)

### 실행 방법
```
cd D:/AI/04_게임/한국사RPG
python -m http.server 8765
# 브라우저:
#   http://localhost:8765/korean-rpg-v8.html         (EP.1 시작)
#   http://localhost:8765/korean-rpg-v8.html?ep=2    (EP.2 마을 진입)
#   http://localhost:8765/korean-rpg-v8.html?debug=1 (FPS/폴리곤 HUD)
```

### 파일 변경 목록
- `_plan/**` — 신규 (6개)
- `js-v8/**` — 신규 (37개 + css 2)
- `korean-rpg-v8.html` — 신규
- `_test/ss_v8_*.png` — 신규 (7 장)
- `_test/screenshot_v8.mjs`, `headless_sim.mjs` — 신규
- `AUTO_REPORT.md` — 본 섹션 추가
