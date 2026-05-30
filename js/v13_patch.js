// v13_patch.js — 한국사 영웅전 v13.0 Enhancement Patch
// Formation System + Hero Awakening + Artifact Collection + War Chronicles + Unit Compendium
// + Battle Dashboard + Campaign Mode + Era Progress + Quiz 15 + Achievement 12 + SFX 6
(function(){
'use strict';

// =============================================
// SECTION 1: CSS INJECTION
// =============================================
var css=document.createElement('style');
css.textContent=[
'.v13-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:120;overflow-y:auto;padding:16px}',
'.v13-panel.on{display:block}',
'.v13-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v13-subtitle{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v13-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v13-close:hover{background:#8B2A1A}',

'.fmt-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;max-width:520px;margin:0 auto}',
'.fmt-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:10px;padding:14px;text-align:center;cursor:pointer;transition:all .3s}',
'.fmt-card:hover{border-color:#FFD700;transform:translateY(-3px);box-shadow:0 6px 20px rgba(255,215,0,.1)}',
'.fmt-card.active{border-color:#FFD700;background:rgba(42,36,56,.95)}',
'.fmt-icon{font-size:40px;margin-bottom:6px}',
'.fmt-name{font-size:13px;font-weight:700;color:#FFD700;margin-bottom:4px}',
'.fmt-desc{font-size:10px;color:#8a7a6a;line-height:1.6}',
'.fmt-bonus{font-size:9px;color:#88ff88;margin-top:6px;padding:4px 8px;background:rgba(42,90,42,.15);border:1px solid rgba(42,90,42,.3);border-radius:6px}',
'.fmt-canvas-wrap{max-width:400px;margin:12px auto;text-align:center}',
'.fmt-canvas{width:100%;border-radius:8px;border:1px solid #3a3a4a}',

'.awaken-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;max-width:520px;margin:0 auto}',
'.awaken-card{background:rgba(26,20,40,.9);border:2px solid #3a3a4a;border-radius:12px;padding:14px;text-align:center;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}',
'.awaken-card:hover{border-color:#aa88ff;transform:translateY(-3px)}',
'.awaken-card.awakened{border-color:#FFD700;background:linear-gradient(180deg,rgba(42,36,56,.95),rgba(26,20,40,.95))}',
'.awaken-card.awakened::after{content:"";position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:conic-gradient(from 0deg,transparent,rgba(255,215,0,.05),transparent,rgba(255,215,0,.05));animation:awSpin 8s linear infinite}',
'@keyframes awSpin{100%{transform:rotate(360deg)}}',
'.awaken-portrait{font-size:36px;margin-bottom:4px;position:relative;z-index:1}',
'.awaken-name{font-size:12px;font-weight:700;color:#FFD700;position:relative;z-index:1}',
'.awaken-tier{font-size:9px;padding:2px 8px;border-radius:4px;margin-top:4px;display:inline-block;position:relative;z-index:1}',
'.tier-ssr{background:rgba(255,215,0,.15);color:#FFD700;border:1px solid #FFD70044}',
'.tier-sr{background:rgba(170,136,255,.15);color:#aa88ff;border:1px solid #aa88ff44}',
'.tier-r{background:rgba(136,170,255,.15);color:#88aaff;border:1px solid #88aaff44}',
'.awaken-skill{font-size:9px;color:#ff88aa;margin-top:6px;position:relative;z-index:1}',
'.awaken-detail{max-width:500px;margin:8px auto;background:rgba(26,20,40,.95);border:2px solid #aa88ff;border-radius:12px;padding:16px;display:none}',
'.awaken-detail.on{display:block}',
'.awaken-detail h3{color:#FFD700;font-size:16px;margin-bottom:8px;text-align:center}',
'.aw-stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}',
'.aw-stat{font-size:10px;color:#e8dcc8;padding:6px 8px;background:rgba(0,0,0,.2);border-radius:6px}',
'.aw-stat b{color:#FFD700}',
'.aw-stat .aw-up{color:#88ff88;font-size:9px}',

'.art-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;max-width:600px;margin:0 auto}',
'.art-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:all .3s}',
'.art-card:hover{border-color:#c4956a}',
'.art-card.locked{opacity:.35;filter:grayscale(.8)}',
'.art-icon{font-size:32px;margin-bottom:4px}',
'.art-name{font-size:11px;font-weight:700;color:#FFD700;margin-bottom:2px}',
'.art-era{font-size:8px;color:#8a7a6a}',
'.art-detail{max-width:500px;margin:12px auto;background:rgba(26,20,40,.95);border:2px solid #c4956a;border-radius:12px;padding:16px;display:none}',
'.art-detail.on{display:block}',
'.art-detail h3{color:#FFD700;font-size:15px;margin-bottom:6px;text-align:center}',
'.art-detail p{font-size:11px;color:#e8dcc8;line-height:2}',
'.art-effect{font-size:10px;color:#88ff88;margin-top:8px;padding:6px 10px;background:rgba(42,90,42,.12);border:1px solid rgba(42,90,42,.25);border-radius:6px}',

'.war-timeline{max-width:500px;margin:0 auto;position:relative;padding-left:40px}',
'.war-line{position:absolute;left:18px;top:0;bottom:0;width:2px;background:linear-gradient(180deg,#c4956a,#FFD700,#c4956a)}',
'.war-entry{position:relative;margin:16px 0;padding:14px;background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:10px;cursor:pointer;transition:all .3s}',
'.war-entry:hover{border-color:#FFD700;background:rgba(42,36,56,.9)}',
'.war-entry::before{content:"";position:absolute;left:-28px;top:18px;width:12px;height:12px;border-radius:50%;background:#FFD700;border:2px solid #0a0608}',
'.war-year{font-size:9px;color:#c4956a;letter-spacing:2px;margin-bottom:4px}',
'.war-title{font-size:14px;font-weight:700;color:#FFD700;margin-bottom:4px}',
'.war-desc{font-size:11px;color:#8a7a6a;line-height:1.7}',
'.war-forces{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap}',
'.war-force{font-size:9px;padding:3px 8px;border-radius:6px;border:1px solid #3a3a4a;color:#e8dcc8}',
'.war-expand{display:none;margin-top:10px;padding:12px;background:rgba(0,0,0,.2);border-radius:8px;font-size:11px;color:#e8dcc8;line-height:2}',
'.war-expand.on{display:block}',

'.unit-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-width:600px;margin:0 auto}',
'.unit-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:10px;padding:14px;text-align:center;cursor:pointer;transition:all .3s}',
'.unit-card:hover{border-color:#5FA0FF;transform:translateY(-2px)}',
'.unit-icon{font-size:36px;margin-bottom:4px}',
'.unit-name{font-size:12px;font-weight:700;color:#5FA0FF}',
'.unit-type{font-size:9px;color:#8a7a6a;margin-top:2px}',
'.unit-detail{max-width:500px;margin:12px auto;background:rgba(26,20,40,.95);border:2px solid #5FA0FF;border-radius:12px;padding:16px;display:none}',
'.unit-detail.on{display:block}',
'.unit-detail h3{color:#5FA0FF;font-size:15px;margin-bottom:8px;text-align:center}',
'.unit-bars{margin:8px 0}',
'.unit-bar-row{display:flex;align-items:center;gap:8px;margin:4px 0;font-size:10px}',
'.unit-bar-label{width:40px;color:#8a7a6a;text-align:right}',
'.unit-bar{flex:1;height:8px;background:#1a1a2e;border-radius:4px;overflow:hidden}',
'.unit-bar-fill{height:100%;border-radius:4px;transition:width .5s}',
'.unit-bar-val{width:30px;color:#e8dcc8;font-weight:700}',

'.dash-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px;max-width:520px;margin:0 auto 16px}',
'.dash-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:10px;padding:14px;text-align:center}',
'.dash-val{font-size:24px;font-weight:900;color:#FFD700;margin-bottom:2px}',
'.dash-label{font-size:10px;color:#8a7a6a}',
'.dash-chart-wrap{max-width:500px;margin:0 auto}',
'.dash-chart{width:100%;border-radius:8px;border:1px solid #3a3a4a}',

'.era-bar-wrap{max-width:500px;margin:0 auto 16px}',
'.era-bar{height:32px;background:#1a1a2e;border-radius:16px;overflow:hidden;position:relative;border:1px solid #3a3a4a}',
'.era-fill{height:100%;border-radius:16px;transition:width .8s;background:linear-gradient(90deg,#8B6B3D,#C4956A,#FFD700)}',
'.era-label{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:12px;font-weight:700;color:#e8dcc8;text-shadow:0 1px 3px #000}',
'.era-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;max-width:520px;margin:12px auto}',
'.era-item{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:10px;text-align:center;font-size:10px}',
'.era-item.current{border-color:#FFD700;background:rgba(42,36,56,.95)}',
'.era-item.locked{opacity:.4}',
'.era-item h4{color:#FFD700;font-size:12px;margin-bottom:4px}',
'.era-item p{color:#8a7a6a;line-height:1.5}',

'.camp-list{max-width:500px;margin:0 auto}',
'.camp-card{display:flex;align-items:center;gap:12px;background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:10px;padding:14px;margin:8px 0;cursor:pointer;transition:all .3s}',
'.camp-card:hover{border-color:#FF5FA2;transform:translateY(-2px)}',
'.camp-card.cleared{border-color:#4f4}',
'.camp-card.locked{opacity:.4;cursor:not-allowed}',
'.camp-num{font-size:20px;font-weight:900;color:#FFD700;min-width:36px;text-align:center}',
'.camp-info h4{color:#FFD700;font-size:13px;margin-bottom:3px}',
'.camp-info p{color:#8a7a6a;font-size:10px;line-height:1.6}',
'.camp-status{font-size:9px;padding:2px 8px;border-radius:4px;display:inline-block;margin-top:4px}',
'.camp-done{background:#2a5a2a;color:#4f4;border:1px solid #4f444}',
'.camp-new{background:#5a3a1a;color:#fa0;border:1px solid #fa044}',
'.camp-lock{background:#3a2a2a;color:#888;border:1px solid #88844}',

'@keyframes achSlide13{from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}',
'@media(max-width:400px){.fmt-grid,.awaken-grid,.art-grid,.unit-grid,.era-grid{grid-template-columns:repeat(auto-fill,minmax(120px,1fr))}.fmt-card,.awaken-card,.art-card,.unit-card{padding:10px}}'
].join('\n');
document.head.appendChild(css);

// =============================================
// SECTION 2: FORMATION DATA
// =============================================
var FORMATIONS=[
{id:'crane',nm:'학익진(鶴翼陣)',ic:'🦅',desc:'학이 날개를 펼친 형태. V자 대형으로 적을 포위하며 양익에서 협공한다.',bonus:'공격 +15%, 포위 보너스 2배',atk:15,def:0,spd:0,
detail:'이순신 장군이 명량해전에서 사용한 진형으로도 유명하다. 중앙의 주력이 적을 유인하고, 양 날개가 적의 측면과 후방을 공격하는 전술. 궁병을 날개에 배치하면 효과적.'},
{id:'fish',nm:'어린진(魚鱗陣)',ic:'🐟',desc:'물고기 비늘처럼 촘촘한 밀집 대형. 정면 돌파에 최적화.',bonus:'공격 +20%, 방어 -10%',atk:20,def:-10,spd:0,
detail:'전체 병력을 삼각형 형태로 밀집시켜 적의 중앙을 관통하는 공격적 진형. 돌파력은 극대화되지만 측면이 취약하다. 기마병 위주 편성 시 효과적.'},
{id:'square',nm:'방진(方陣)',ic:'🛡️',desc:'사각형 대형. 전방위 방어에 특화된 안정적 진형.',bonus:'방어 +20%, 이동 -1',atk:0,def:20,spd:-1,
detail:'사방에서 적의 공격에 대응할 수 있는 수비적 진형. 보병을 외곽에, 궁병과 지원병을 중앙에 배치한다. 수적 열세 시 유리하지만 기동력이 떨어진다.'},
{id:'wedge',nm:'추형진(錐形陣)',ic:'🔺',desc:'뾰족한 쐐기 형태. 적 진형을 꿰뚫는 돌격 대형.',bonus:'공격 +10%, 이동 +1, 방어 -10%',atk:10,def:-10,spd:1,
detail:'가장 강한 유닛을 선두에 세우고 뒤따르는 병력이 벌려진 틈으로 쏟아지는 진형. 기마병 선봉이 적 진형을 뚫으면 보병이 뒤따라 확장한다.'},
{id:'moon',nm:'언월진(偃月陣)',ic:'🌙',desc:'초승달 형태의 방어적 포위 진형. 적을 끌어들여 가둔다.',bonus:'방어 +10%, 반격 피해 +20%',atk:0,def:10,spd:0,
detail:'초승달처럼 휘어진 진형으로 적을 끌어들인 후 양 끝이 닫히며 포위한다. 반격 시 추가 피해를 주는 것이 특징. 방어적이면서도 공격적 전환이 가능한 유연한 진형.'},
{id:'long',nm:'장사진(長蛇陣)',ic:'🐍',desc:'뱀처럼 길게 늘어선 대형. 기동성과 유연성에 특화.',bonus:'이동 +2, 지형 보너스 +10%',atk:0,def:0,spd:2,
detail:'병력을 일렬로 길게 늘어뜨려 적의 측면을 빠르게 우회하거나 좁은 지형에서 유리한 진형. 머리가 공격당하면 꼬리가 구원하고, 꼬리가 공격당하면 머리가 돌아와 지원한다.'}
];

// =============================================
// SECTION 3: HERO AWAKENING DATA
// =============================================
var HEROES=[
{id:'hwanung',nm:'환웅',ic:'👑',tier:'SSR',cls:'천신',awakened:false,
baseStats:{hp:250,atk:45,def:35,spd:6,mp:80},
awakenStats:{hp:350,atk:65,def:48,spd:7,mp:120},
skill:'천부신권(天符神權)',skillDesc:'천부인의 힘으로 전 아군 HP 30% 회복 + 2턴간 공격 +20%',
lore:'환인천제의 서자. 홍익인간의 뜻을 품고 인간 세상으로 내려온 신. 바람, 비, 구름을 다스리며 곡식, 생명, 질병, 형벌, 선악을 주관한다.'},
{id:'ungnyeo',nm:'웅녀',ic:'🌸',tier:'SSR',cls:'치유사',awakened:false,
baseStats:{hp:180,atk:25,def:28,spd:5,mp:100},
awakenStats:{hp:280,atk:38,def:42,spd:6,mp:150},
skill:'모성의 가호',skillDesc:'단일 아군 HP 완전 회복 + 상태이상 해제 + 3턴간 방어 +30%',
lore:'21일 동안 쑥과 마늘만 먹으며 인내한 곰의 화신. 환웅과 혼인하여 단군왕검을 낳았다. 인내와 모성의 상징.'},
{id:'dangun',nm:'단군왕검',ic:'🏛️',tier:'SSR',cls:'왕',awakened:false,
baseStats:{hp:280,atk:42,def:40,spd:5,mp:90},
awakenStats:{hp:400,atk:60,def:55,spd:6,mp:140},
skill:'홍익인간',skillDesc:'전 아군 전 스탯 +15% (5턴) + 적 전체 사기 -20%',
lore:'고조선의 시조. 환웅과 웅녀의 아들. BC 2333년 아사달에 도읍하여 나라를 세우고 팔조법금을 제정하였다. 1,500년간 나라를 다스렸다는 전설.'},
{id:'pungbaek',nm:'풍백',ic:'🌬️',tier:'SR',cls:'원거리',awakened:false,
baseStats:{hp:160,atk:38,def:22,spd:7,mp:70},
awakenStats:{hp:240,atk:55,def:32,spd:8,mp:100},
skill:'폭풍의 일격',skillDesc:'3x3 범위 바람 피해 + 적 이동력 -2 (2턴)',
lore:'바람을 다스리는 신. 환웅의 충실한 부하로, 풍백이 바람을 불면 적의 화살이 되돌아가고, 아군의 배는 순풍을 탄다.'},
{id:'usa',nm:'우사',ic:'🌧️',tier:'SR',cls:'치유사',awakened:false,
baseStats:{hp:150,atk:20,def:25,spd:5,mp:90},
awakenStats:{hp:230,atk:30,def:38,spd:6,mp:130},
skill:'치유의 비',skillDesc:'십자 범위 아군 HP 40% 회복 + 독/화상 해제',
lore:'비를 다스리는 신. 가뭄이 들면 우사가 비를 내려 백성을 살리고, 전투에서는 아군의 상처를 치유하는 치유의 비를 내린다.'},
{id:'unsa',nm:'운사',ic:'☁️',tier:'SR',cls:'마법사',awakened:false,
baseStats:{hp:140,atk:42,def:20,spd:6,mp:85},
awakenStats:{hp:220,atk:60,def:30,spd:7,mp:120},
skill:'뇌운의 진노',skillDesc:'일직선 범위 번개 피해 + 40% 확률 기절',
lore:'구름과 번개를 다스리는 신. 전장에 먹구름을 몰아와 번개를 떨어뜨리며, 적을 혼란에 빠뜨리는 디버퍼이자 마법 공격수.'},
{id:'seonggi',nm:'성기장군',ic:'⚔️',tier:'SR',cls:'전사',awakened:false,
baseStats:{hp:220,atk:48,def:30,spd:5,mp:50},
awakenStats:{hp:320,atk:68,def:45,spd:6,mp:75},
skill:'불굴의 의지',skillDesc:'HP 30% 이하 시 자동 발동: 공격 +50%, 방어 +30% (3턴)',
lore:'고조선 최후의 명장. 한 무제의 대군에 맞서 왕검성에서 1년간 항전하였다. 끝까지 항복을 거부하고 최후를 맞이한 비운의 장수.'},
{id:'buyeo_wang',nm:'부여왕',ic:'👑',tier:'SR',cls:'기마',awakened:false,
baseStats:{hp:200,atk:40,def:32,spd:7,mp:60},
awakenStats:{hp:300,atk:58,def:45,spd:8,mp:90},
skill:'기마 돌격',skillDesc:'직선 3칸 돌파 공격 + 관통 피해 (뒤 적에게 50%)',
lore:'만주 쑹화강 유역에서 부여를 건국한 왕. 4부족(마가, 우가, 저가, 구가)을 통합하고 영고 제천행사를 주관한 초원의 왕.'},
{id:'wiman',nm:'위만',ic:'🏯',tier:'SR',cls:'전사',awakened:false,
baseStats:{hp:230,atk:44,def:35,spd:5,mp:55},
awakenStats:{hp:330,atk:62,def:48,spd:6,mp:80},
skill:'정변의 일격',skillDesc:'단일 적 치명타 확정 (2배 피해) + 2턴간 적 방어 -30%',
lore:'연나라 출신. 상투를 틀고 조선인 복장으로 위장하여 준왕의 신임을 얻은 뒤 왕위를 찬탈한 야심가. 철기문화와 중계무역으로 국력을 키웠다.'},
{id:'junwang',nm:'준왕',ic:'👑',tier:'R',cls:'왕',awakened:false,
baseStats:{hp:190,atk:32,def:30,spd:4,mp:65},
awakenStats:{hp:270,atk:45,def:42,spd:5,mp:95},
skill:'남천(南遷)',skillDesc:'전투 이탈 + 아군 전원 HP 20% 회복 (긴급 철수)',
lore:'기자조선의 마지막 왕. 위만에게 왕위를 빼앗기고 배를 타고 남쪽으로 도망하여 마한의 왕을 자칭했다고 전해진다.'},
{id:'ugeowang',nm:'우거왕',ic:'💀',tier:'R',cls:'왕',awakened:false,
baseStats:{hp:210,atk:36,def:33,spd:4,mp:55},
awakenStats:{hp:290,atk:50,def:46,spd:5,mp:80},
skill:'최후의 명령',skillDesc:'아군 전원 공격 +30% (3턴) + 자신 HP 50% 소모',
lore:'위만의 손자. 위만조선의 마지막 왕. 한 무제의 침공에 맞서 항전하였으나, 내부 배신으로 살해당하고 고조선은 멸망하였다.'},
{id:'cheongun',nm:'천군',ic:'🗿',tier:'R',cls:'제사장',awakened:false,
baseStats:{hp:170,atk:28,def:26,spd:5,mp:95},
awakenStats:{hp:250,atk:40,def:38,spd:6,mp:140},
skill:'소도의 결계',skillDesc:'3x3 범위 2턴간 무적 (아군만) + 적 진입 불가',
lore:'삼한 시대 소도(신성구역)를 관장하는 제사장. 천군이 다스리는 소도에서는 도망친 죄인도 잡아갈 수 없는 신성불가침 영역이었다.'}
];

// =============================================
// SECTION 4: ARTIFACT DATA
// =============================================
var ARTIFACTS=[
{id:'cheonbuin',nm:'천부인',ic:'🔮',era:'BC 2333',desc:'환인이 환웅에게 내린 세 가지 신물. 하늘의 권위와 통치의 정당성을 상징한다.',effect:'전 유닛 공격 +5%',ch:1},
{id:'bipahyeong',nm:'비파형동검',ic:'🗡️',era:'BC 10C~BC 3C',desc:'요령식 동검이라고도 한다. 고조선의 세력 범위를 추정하는 대표적 유물. 날이 비파(악기) 모양이라 이 이름이 붙었다.',effect:'전사 공격 +10%',ch:1},
{id:'goindol',nm:'고인돌',ic:'🪨',era:'BC 10C~',desc:'세계 고인돌의 약 40%가 한반도에 집중. 지배층의 무덤이자 권력의 상징. 강화·고창·화순 고인돌이 UNESCO 세계유산.',effect:'방어 +8%',ch:2},
{id:'segyeom',nm:'세형동검',ic:'⚔️',era:'BC 4C~BC 1C',desc:'한국식 동검. 비파형동검에서 발전한 형태로, 날이 좁고 예리하다. 청동기 후기 한반도의 독자적 발전을 보여준다.',effect:'치명타 확률 +5%',ch:2},
{id:'cheongdong',nm:'청동거울',ic:'🪞',era:'BC 5C~BC 1C',desc:'잔무늬거울(다뉴세문경). 매우 정밀한 기하학적 무늬가 새겨진 청동 거울. 고조선의 뛰어난 금속 공예 기술을 보여준다.',effect:'마법 공격 +8%',ch:2},
{id:'cheolgi',nm:'철제 무기',ic:'🔨',era:'BC 3C~',desc:'위만조선 시기 본격적으로 사용된 철제 무기. 청동기에 비해 단단하고 날카로워 전투력을 크게 향상시켰다.',effect:'전 유닛 공격 +7%',ch:3},
{id:'banwol',nm:'반달돌칼',ic:'🌙',era:'BC 10C~',desc:'청동기 시대의 농기구. 반달 모양의 돌로 만든 칼로, 곡식의 이삭을 따는 데 사용. 농경 사회의 증거.',effect:'회복량 +10%',ch:1},
{id:'misongri',nm:'미송리식토기',ic:'🏺',era:'BC 10C~BC 3C',desc:'고조선의 대표적 토기. 팽이 모양의 민무늬토기. 주로 요동~한반도 서북부에서 발견되어 고조선의 영역 추정에 사용.',effect:'일일 도전 XP +20%',ch:2},
{id:'gwireol',nm:'귀걸이(금제이식)',ic:'💎',era:'BC 3C~',desc:'삼한 시대의 정교한 금 귀걸이. 세공 기술이 매우 뛰어나며, 지배층의 신분을 상징하는 장신구.',effect:'경험치 +5%',ch:4},
{id:'cheoljeong',nm:'철정(鐵鋌)',ic:'🔩',era:'BC 2C~AD 3C',desc:'변한(가야)의 덩이쇠. 화폐처럼 사용되었으며, 낙랑·왜 등과의 교역에서 중요한 교환 수단이 되었다.',effect:'상점 할인 -10%',ch:4},
{id:'sogeum',nm:'소금(옥저)',ic:'🧂',era:'BC 2C~',desc:'옥저의 주요 특산물. 해안 지역에서 생산된 소금은 내륙과의 교역에서 중요한 자원이었다.',effect:'HP 자연 회복 +3/턴',ch:4},
{id:'dangung',nm:'단궁(동예)',ic:'🏹',era:'BC 2C~',desc:'동예의 특산물인 짧은 활. 작지만 강력한 관통력을 가져 명궁의 무기로 사랑받았다.',effect:'궁병 사거리 +1',ch:4},
{id:'gwahama',nm:'과하마(동예)',ic:'🐴',era:'BC 2C~',desc:'동예의 작은 말. 키가 작아 과일나무 아래를 지나갈 수 있다 하여 이름 붙여짐. 산악 지형에 적합한 기마.',effect:'기마병 이동 +1',ch:4},
{id:'okcheok',nm:'옥저 직물',ic:'🧵',era:'BC 2C~',desc:'옥저에서 생산된 삼베. 고구려에 공물로 바쳤다. 옥저인의 뛰어난 직물 기술을 보여준다.',effect:'방어 +5%',ch:4},
{id:'jeondolmun',nm:'점토대토기',ic:'🫖',era:'BC 3C~BC 1C',desc:'삼한 시대의 토기. 구연부에 점토대를 붙인 독특한 형태. 철기문화와 함께 한반도 남부에 확산.',effect:'퀴즈 힌트 확률 +10%',ch:4}
];

// =============================================
// SECTION 5: WAR CHRONICLES DATA
// =============================================
var WAR_CHRONICLES=[
{id:'w1',year:'BC 2333',nm:'고조선 건국',desc:'단군왕검이 아사달에 도읍하여 최초의 국가 고조선을 건국',forces:['고조선'],
detail:'환웅과 웅녀의 아들 단군왕검이 아사달(현재의 평양 또는 요동 지역으로 추정)에 도읍을 정하고 고조선을 건국하였다. 홍익인간의 이념으로 나라를 다스리며, 팔조법금을 제정하여 법치 국가의 기틀을 마련하였다.'},
{id:'w2',year:'BC 194',nm:'위만의 정변',desc:'연나라 출신 위만이 준왕을 몰아내고 왕위를 찬탈',forces:['위만 세력','기자조선'],
detail:'위만은 연나라에서 천여 명의 무리를 이끌고 패수를 건너와 준왕에게 의탁하였다. 서쪽 변경의 수비를 맡았으나, 세력을 키운 뒤 왕검성을 기습하여 준왕을 몰아내었다. 준왕은 남쪽으로 도주하여 마한의 왕을 자칭하였다.'},
{id:'w3',year:'BC 128',nm:'창해군 설치 시도',desc:'한 무제가 예(濊) 지역에 창해군 설치를 시도하나 실패',forces:['한(漢)','예(濊)'],
detail:'한 무제가 동이 지역에 대한 지배력을 확대하기 위해 예군 남려의 항복을 계기로 창해군 설치를 시도하였다. 그러나 현지의 저항과 재정 부담으로 2년 만에 폐지하고 말았다.'},
{id:'w4',year:'BC 109',nm:'한 무제의 고조선 침공',desc:'육군 5만 + 수군 7천으로 고조선 전면 침공',forces:['한(漢) 5만+7천','위만조선'],
detail:'한 무제가 섭하를 보내 외교 교섭을 시도하였으나 결렬되자, 좌장군 순체에게 육군 5만, 누선장군 양복에게 수군 7천을 주어 고조선을 침공하였다. 양복의 수군이 먼저 왕검성을 공격하였으나 대패하고, 육군도 고전하였다.'},
{id:'w5',year:'BC 108',nm:'왕검성 함락',desc:'1년간의 항전 끝에 내부 반란으로 왕검성 함락',forces:['한(漢)','위만조선 항전파','위만조선 항복파'],
detail:'왕검성은 1년간 한나라 대군에 맞서 항전하였다. 성기장군과 항전파가 결사 항전을 이끌었으나, 대신 성기와 왕겹 등 항복파가 반란을 일으켜 우거왕을 살해하였다. 결국 왕검성은 함락되고, 한나라는 낙랑·진번·임둔·현도의 한사군을 설치하였다.'},
{id:'w6',year:'BC 82',nm:'한사군 축소',desc:'진번·임둔 폐지, 낙랑·현도만 남음',forces:['한(漢)','토착 세력'],
detail:'한사군 설치 후 현지의 끊임없는 저항으로 진번군과 임둔군이 폐지되고, 낙랑군과 현도군만 남게 되었다. 현도군도 점차 서쪽으로 이동하게 되었다.'},
{id:'w7',year:'BC 2C~AD 1C',nm:'부여의 부상',desc:'만주 쑹화강 유역에서 부여가 강국으로 성장',forces:['부여','고구려 초기'],
detail:'고조선이 멸망한 뒤 만주 지역에서 부여가 강력한 국가로 성장하였다. 5부족 연맹 체제를 갖추고, 한나라와 조공 관계를 유지하면서 독립을 보전하였다. 후에 고구려와 백제의 건국 모체가 되었다.'},
{id:'w8',year:'BC 1C~AD 3C',nm:'삼한의 발전',desc:'마한 54국·진한 12국·변한 12국 총 78개 소국',forces:['마한','진한','변한'],
detail:'한반도 중남부에 마한·진한·변한의 세 집단이 형성되었다. 마한의 목지국이 명목상 맹주 역할을 하였고, 진한의 사로국은 신라로, 변한의 구야국은 가야로 발전하였다. 철 생산과 교역이 활발하였다.'}
];

// =============================================
// SECTION 6: UNIT COMPENDIUM DATA
// =============================================
var UNITS=[
{id:'infantry',nm:'보병',ic:'🛡️',type:'근접',strong:'기마병',weak:'궁병',
stats:{hp:85,atk:60,def:75,spd:40,range:15},
desc:'근접 전투의 주력. 방어력이 높고 기마병에 상성 우위. 숲/요새 지형 보너스 극대화.'},
{id:'archer',nm:'궁병',ic:'🏹',type:'원거리',strong:'보병',weak:'기마병',
stats:{hp:55,atk:75,def:40,spd:55,range:90},
desc:'원거리 공격의 핵심. 보병에 상성 우위. 사거리가 길어 안전한 후방에서 공격 가능.'},
{id:'cavalry',nm:'기마병',ic:'🐎',type:'기동',strong:'궁병',weak:'보병',
stats:{hp:70,atk:70,def:50,spd:90,range:20},
desc:'빠른 기동력의 돌격대. 궁병에 상성 우위. 넓은 이동 범위로 측면 공격과 후방 차단에 탁월.'},
{id:'healer',nm:'치유사',ic:'💚',type:'지원',strong:'-',weak:'직접 공격',
stats:{hp:45,atk:25,def:35,spd:45,range:60},
desc:'아군을 회복하는 지원병. 전투의 지속력을 책임진다. 후방 배치 필수.'},
{id:'mage',nm:'마법사',ic:'🔮',type:'마법',strong:'밀집 대형',weak:'단독 교전',
stats:{hp:50,atk:85,def:30,spd:50,range:70},
desc:'범위 마법 공격의 달인. 밀집한 적에게 극대화된 피해를 준다. HP와 방어가 낮아 보호 필요.'},
{id:'general',nm:'장수',ic:'⚔️',type:'만능',strong:'밸런스',weak:'약점 없음',
stats:{hp:90,atk:80,def:70,spd:60,range:25},
desc:'파티의 핵심 유닛. 균형 잡힌 스탯과 강력한 스킬을 보유. 장수가 쓰러지면 패배.'},
{id:'scout',nm:'척후병',ic:'👁️',type:'정찰',strong:'정보',weak:'전투력',
stats:{hp:50,atk:45,def:35,spd:95,range:30},
desc:'전장의 눈. 최고의 기동력으로 적진 정찰 및 안개 해제. 전투력은 약하지만 정보가 승리의 열쇠.'},
{id:'siege',nm:'공성병',ic:'🏗️',type:'공성',strong:'건물/요새',weak:'기동 유닛',
stats:{hp:75,atk:90,def:55,spd:20,range:80},
desc:'요새 지형 파괴 및 대형 피해 특화. 이동이 매우 느리지만 파괴력은 최고. 호위가 필수.'}
];

// =============================================
// SECTION 7: CAMPAIGN DATA
// =============================================
var CAMPAIGNS=[
{id:'c1',nm:'신시 건설',desc:'환웅이 태백산에 내려와 신시를 건설하는 첫 전투',ch:1,diff:'초급',reward:'천부인 획득'},
{id:'c2',nm:'범족 토벌전',desc:'범족(호랑이 부족)과의 첫 번째 대규모 전투',ch:1,diff:'초급',reward:'풍백 합류'},
{id:'c3',nm:'아사달 전투',desc:'단군왕검의 고조선 건국을 위한 결전',ch:2,diff:'중급',reward:'팔조법금 제정'},
{id:'c4',nm:'요동 방어전',desc:'연나라의 침입에 맞선 고조선의 방어전',ch:2,diff:'중급',reward:'세형동검 획득'},
{id:'c5',nm:'위만의 반란',desc:'위만이 일으킨 정변. 준왕을 보호하라',ch:3,diff:'고급',reward:'준왕 탈출'},
{id:'c6',nm:'한나라 선봉대',desc:'한 무제 선봉대와의 첫 교전',ch:3,diff:'고급',reward:'철제 무기 획득'},
{id:'c7',nm:'왕검성 공방전',desc:'1년간의 왕검성 방어전. 최후의 결전',ch:3,diff:'최고급',reward:'성기장군의 유산'},
{id:'c8',nm:'삼한 통일전',desc:'마한·진한·변한의 연합 작전',ch:4,diff:'최고급',reward:'삼한의 맹주'}
];

// =============================================
// SECTION 8: ERA PROGRESS DATA
// =============================================
var ERAS=[
{id:'stone',nm:'신석기 시대',era:'BC 8000~BC 2000',icon:'🪨',desc:'빗살무늬토기, 정착 생활의 시작',pct:0},
{id:'bronze_early',nm:'청동기 초기',era:'BC 2000~BC 1000',icon:'🔔',desc:'고인돌, 비파형동검의 시대',pct:15},
{id:'gojoseon_early',nm:'고조선 전기',era:'BC 2333~BC 194',icon:'🏛️',desc:'단군왕검의 건국, 팔조법금',pct:30},
{id:'gojoseon_late',nm:'위만조선',era:'BC 194~BC 108',icon:'🏯',desc:'철기문화, 중계무역의 전성기',pct:50},
{id:'hansagun',nm:'한사군 시기',era:'BC 108~BC 82',icon:'⚔️',desc:'낙랑·진번·임둔·현도',pct:65},
{id:'buyeo_era',nm:'부여 시대',era:'BC 2C~AD 5C',icon:'👑',desc:'영고 제천행사, 5부족 연맹',pct:80},
{id:'samhan',nm:'삼한 시대',era:'BC 1C~AD 3C',icon:'🗿',desc:'78국 소국, 철 교역',pct:90},
{id:'three_kingdoms',nm:'삼국 시대 서막',era:'AD 1C~',icon:'🌅',desc:'고구려·백제·신라 건국',pct:100}
];

// =============================================
// SECTION 9: ADDITIONAL QUIZ (15문, 75→90)
// =============================================
var QUIZ_V13=[
{q:'고조선의 건국 이념 &quot;홍익인간&quot;의 뜻은?',a:['널리 인간을 이롭게 하라','강한 군대를 만들라','하늘의 뜻에 따르라','왕의 권위를 세우라'],c:0},
{q:'환웅이 다스린 360여 가지 일 중 포함되지 않는 것은?',a:['군사','곡식','질병','형벌'],c:0},
{q:'부여의 4부족 중 &quot;소를 다스리는 자&quot;를 뜻하는 것은?',a:['우가(牛加)','마가(馬加)','저가(猪加)','구가(狗加)'],c:0},
{q:'삼한에서 농사의 풍요를 비는 제천행사는?',a:['5월 수릿날과 10월 계절제','영고','무천','동맹'],c:0},
{q:'학익진(鶴翼陣)의 특징은?',a:['V자 형태로 포위','일렬 종대','사각 밀집','원형 방어'],c:0},
{q:'고조선의 법률 &quot;팔조법금&quot; 중 현재 전해지는 조항 수는?',a:['3개','5개','8개','1개'],c:0},
{q:'위만조선의 독점한 중계무역 대상 지역은?',a:['진번과 한(漢) 사이','일본과 중국','신라와 백제','부여와 옥저'],c:0},
{q:'동예의 제천행사 이름은?',a:['무천','영고','동맹','수릿날'],c:0},
{q:'진한 12국 중 후에 신라의 중심이 된 나라는?',a:['사로국','구야국','목지국','비리국'],c:0},
{q:'비파형동검과 세형동검의 차이는?',a:['세형동검이 더 좁고 예리함','비파형이 더 작음','재질이 다름','용도가 다름'],c:0},
{q:'고인돌의 종류 중 북방식의 특징은?',a:['탁자처럼 생긴 형태','바둑판처럼 납작한 형태','돌을 쌓은 형태','동굴 형태'],c:0},
{q:'옥저의 혼인 풍습은?',a:['민며느리혼','데릴사위제','약탈혼','매매혼'],c:0},
{q:'한 무제의 고조선 침공 시 수군을 이끈 장수는?',a:['누선장군 양복','좌장군 순체','대장군 위청','표기장군 곽거병'],c:0},
{q:'부여의 형벌 중 도둑질에 대한 처벌은?',a:['12배 배상','사형','추방','채찍 100대'],c:0},
{q:'삼한 시대 철의 주요 수출 대상은?',a:['낙랑과 왜','한나라','부여','고구려'],c:0}
];

// =============================================
// SECTION 10: ADDITIONAL ACHIEVEMENTS (12개, 36→48)
// =============================================
var ACH_V13=[
{id:'formation_master',nm:'진형의 달인',ds:'모든 진형 열람',ic:'🦅'},
{id:'awakening_first',nm:'첫 각성',ds:'영웅 1명 각성',ic:'⚡'},
{id:'awakening_all',nm:'전원 각성',ds:'모든 영웅 각성',ic:'🌟'},
{id:'artifact_5',nm:'유물 수집가',ds:'유물 5개 수집',ic:'🔮'},
{id:'artifact_all',nm:'고고학자',ds:'모든 유물 수집',ic:'🏛️'},
{id:'war_reader',nm:'전쟁사 학자',ds:'전쟁사 연대기 전체 열람',ic:'📜'},
{id:'unit_expert',nm:'병과 전문가',ds:'유닛 도감 전체 열람',ic:'⚔️'},
{id:'campaign_3',nm:'전역 3개 클리어',ds:'캠페인 3개 완료',ic:'🎖️'},
{id:'campaign_all',nm:'전역 완전 정복',ds:'캠페인 전체 완료',ic:'🏆'},
{id:'era_samhan',nm:'삼한 시대 도달',ds:'시대 진보: 삼한 시대',ic:'🗿'},
{id:'quiz_90',nm:'역사 마스터',ds:'퀴즈 90문 정답 누적',ic:'🎓'},
{id:'all_v13',nm:'v13 마스터',ds:'v13 기능 전부 체험',ic:'💎'}
];

// =============================================
// SECTION 11: DOM INJECTION
// =============================================
var panels={};
['formation','awakening','artifact','warchronicle','unitcomp','dashboard','eraprogress','campaign'].forEach(function(id){
var el=document.createElement('div');
el.id='v13-'+id;
el.className='v13-panel';
el.setAttribute('role','dialog');
document.body.appendChild(el);
panels[id]=el;
});

// =============================================
// SECTION 12: RENDER - FORMATION SYSTEM
// =============================================
function renderFormation(){
var state=getV13State();
var active=state.activeFormation||null;
var p=panels.formation;
p.innerHTML='<h2>&#128038; &#51652;&#54805; &#49884;&#49828;&#53596;</h2>'+
'<div class="v13-subtitle">&#51204;&#53804; &#51204; &#51652;&#54805;&#51012; &#49440;&#53469;&#54616;&#47732; &#54028;&#54000; &#51204;&#52404;&#50640; &#48372;&#45320;&#49828;&#44032; &#51201;&#50857;&#46121;&#45768;&#45796;</div>'+
'<div class="fmt-grid">'+FORMATIONS.map(function(f){
return '<div class="fmt-card'+(active===f.id?' active':'')+'" onclick="window._v13.selectFormation(\''+f.id+'\')" role="button" tabindex="0">'+
'<div class="fmt-icon">'+f.ic+'</div>'+
'<div class="fmt-name">'+f.nm+'</div>'+
'<div class="fmt-desc">'+f.desc+'</div>'+
'<div class="fmt-bonus">'+f.bonus+'</div>'+
'</div>';
}).join('')+'</div>'+
'<div class="fmt-canvas-wrap"><canvas class="fmt-canvas" id="fmt-cvs" width="400" height="300"></canvas></div>'+
'<button class="v13-close" onclick="document.getElementById(\'v13-formation\').classList.remove(\'on\')">&#45803;&#44592;</button>';
drawFormation(active);
trackV13('formation_viewed',true);
}

function drawFormation(id){
var cvs=document.getElementById('fmt-cvs');
if(!cvs)return;
var ctx=cvs.getContext('2d');
var w=400,h=300;
ctx.clearRect(0,0,w,h);
ctx.fillStyle='#0a1428';ctx.fillRect(0,0,w,h);
ctx.strokeStyle='#3a3a4a44';ctx.lineWidth=1;
for(var i=0;i<20;i++){ctx.beginPath();ctx.moveTo(i*20,0);ctx.lineTo(i*20,h);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i*20);ctx.lineTo(w,i*20);ctx.stroke()}
if(!id){ctx.fillStyle='#5a5a6a';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.fillText('진형을 선택하세요',w/2,h/2);return}
var positions={
crane:[[200,80],[120,140],[280,140],[80,200],[160,200],[240,200],[320,200]],
fish:[[200,60],[160,120],[240,120],[120,180],[200,180],[280,180],[200,240]],
square:[[120,80],[200,80],[280,80],[120,160],[280,160],[120,240],[200,240],[280,240]],
wedge:[[200,60],[160,120],[240,120],[120,180],[200,180],[280,180],[200,240]],
moon:[[80,120],[140,80],[260,80],[320,120],[100,200],[200,240],[300,200]],
long:[[200,40],[200,80],[200,120],[200,160],[200,200],[200,240],[200,280]]
};
var pts=positions[id]||positions.crane;
var colors=['#FFD700','#88aaff','#88aaff','#ff88aa','#ff88aa','#88ff88','#88ff88','#88ff88'];
pts.forEach(function(p,i){
ctx.beginPath();ctx.arc(p[0],p[1],12,0,Math.PI*2);
ctx.fillStyle=colors[i%colors.length]+'44';ctx.fill();
ctx.strokeStyle=colors[i%colors.length];ctx.lineWidth=2;ctx.stroke();
ctx.beginPath();ctx.arc(p[0],p[1],4,0,Math.PI*2);
ctx.fillStyle=colors[i%colors.length];ctx.fill();
});
var f=FORMATIONS.find(function(x){return x.id===id});
if(f){ctx.fillStyle='#c4956a';ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.fillText(f.nm,w/2,h-10)}
}

function selectFormation(id){
var s=getV13State();s.activeFormation=id;saveV13State(s);
if(typeof sfx==='function')sfx('formation_select');
showV13Toast(FORMATIONS.find(function(f){return f.id===id}).nm+' 선택!');
renderFormation();
trackV13('formation_selected',id);
}

// =============================================
// SECTION 13: RENDER - HERO AWAKENING
// =============================================
function renderAwakening(){
var state=getV13State();
var aw=state.awakened||{};
var p=panels.awakening;
p.innerHTML='<h2>&#9889; &#50689;&#50885; &#44033;&#49457;</h2>'+
'<div class="v13-subtitle">&#50689;&#50885;&#51012; &#44033;&#49457;&#54616;&#47732; &#49828;&#53455;&#51060; &#45824;&#54253; &#49345;&#49849;&#54616;&#44256; &#44256;&#50976; &#49828;&#53420;&#51060; &#54644;&#44552;&#46121;&#45768;&#45796;</div>'+
'<div class="awaken-grid">'+HEROES.map(function(h){
var isAw=!!aw[h.id];
return '<div class="awaken-card'+(isAw?' awakened':'')+'" onclick="window._v13.showHeroDetail(\''+h.id+'\')" role="button" tabindex="0">'+
'<div class="awaken-portrait">'+h.ic+'</div>'+
'<div class="awaken-name">'+h.nm+'</div>'+
'<span class="awaken-tier tier-'+(h.tier.toLowerCase())+'">'+h.tier+' '+h.cls+'</span>'+
(isAw?'<div class="awaken-skill">&#9889; '+h.skill+'</div>':'')+
'</div>';
}).join('')+'</div>'+
'<div class="awaken-detail" id="aw-detail"></div>'+
'<button class="v13-close" onclick="document.getElementById(\'v13-awakening\').classList.remove(\'on\')">&#45803;&#44592;</button>';
trackV13('awakening_viewed',true);
}

function showHeroDetail(id){
var h=HEROES.find(function(x){return x.id===id});
if(!h)return;
var state=getV13State();
var aw=state.awakened||{};
var isAw=!!aw[h.id];
var dt=document.getElementById('aw-detail');
dt.className='awaken-detail on';
dt.innerHTML='<h3>'+h.ic+' '+h.nm+' <span class="awaken-tier tier-'+h.tier.toLowerCase()+'">'+h.tier+'</span></h3>'+
'<p style="font-size:11px;color:#e8dcc8;line-height:2;margin-bottom:8px">'+h.lore+'</p>'+
'<div class="aw-stat-grid">'+
['hp','atk','def','spd','mp'].map(function(k){
var base=h.baseStats[k],awVal=h.awakenStats[k];
var labels={hp:'HP',atk:'공격',def:'방어',spd:'속도',mp:'MP'};
return '<div class="aw-stat"><b>'+labels[k]+'</b> '+base+(isAw?' <span class="aw-up">&#8594; '+awVal+' (+'+((awVal-base))+')</span>':' &#8594; <span style="color:#5a5a6a">'+awVal+'</span>')+'</div>';
}).join('')+'</div>'+
'<div style="margin-top:10px;padding:10px;background:rgba(255,136,170,.08);border:1px solid rgba(255,136,170,.25);border-radius:8px">'+
'<div style="font-size:11px;font-weight:700;color:#ff88aa;margin-bottom:4px">&#9889; '+h.skill+'</div>'+
'<div style="font-size:10px;color:#e8dcc8;line-height:1.8">'+h.skillDesc+'</div>'+
'</div>'+
(!isAw?'<button style="display:block;margin:12px auto 0;padding:8px 24px;border:2px solid #aa88ff;border-radius:8px;background:rgba(170,136,255,.15);color:#aa88ff;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer" onclick="window._v13.awakenHero(\''+h.id+'\')">&#9889; &#44033;&#49457;&#54616;&#44592;</button>':'<div style="text-align:center;color:#FFD700;font-size:12px;font-weight:700;margin-top:8px">&#10024; &#44033;&#49457; &#50756;&#47308;</div>');
if(typeof sfx==='function')sfx('hero_view');
}

function awakenHero(id){
var s=getV13State();if(!s.awakened)s.awakened={};
s.awakened[id]=true;saveV13State(s);
if(typeof sfx==='function')sfx('awakening');
showV13Toast(HEROES.find(function(h){return h.id===id}).nm+' 각성 완료!');
renderAwakening();
checkV13Ach();
}

// =============================================
// SECTION 14: RENDER - ARTIFACT COLLECTION
// =============================================
function renderArtifacts(){
var state=getV13State();var collected=state.artifacts||[];
var p=panels.artifact;
p.innerHTML='<h2>&#128302; &#50976;&#47932; &#46020;&#44048;</h2>'+
'<div class="v13-subtitle">&#128275; '+collected.length+' / '+ARTIFACTS.length+' &#49688;&#51665;</div>'+
'<div class="art-grid">'+ARTIFACTS.map(function(a){
var has=collected.indexOf(a.id)>=0;
return '<div class="art-card'+(has?'':' locked')+'" onclick="'+(has?'window._v13.showArtifact(\''+a.id+'\')':'')+'" role="button" tabindex="0">'+
'<div class="art-icon">'+(has?a.ic:'&#128274;')+'</div>'+
'<div class="art-name">'+(has?a.nm:'???')+'</div>'+
'<div class="art-era">'+(has?a.era:'&#52285;&#53552; '+a.ch+' &#51652;&#54665; &#49884; &#54925;&#46301;')+'</div>'+
'</div>';
}).join('')+'</div>'+
'<div class="art-detail" id="art-detail-v13"></div>'+
'<button class="v13-close" onclick="document.getElementById(\'v13-artifact\').classList.remove(\'on\')">&#45803;&#44592;</button>';
trackV13('artifacts_viewed',true);
}

function showArtifact(id){
var a=ARTIFACTS.find(function(x){return x.id===id});if(!a)return;
if(typeof sfx==='function')sfx('artifact_view');
var dt=document.getElementById('art-detail-v13');
dt.className='art-detail on';
dt.innerHTML='<h3>'+a.ic+' '+a.nm+'</h3>'+
'<p>'+a.desc+'</p>'+
'<div class="art-effect">&#128161; &#54952;&#44284;: '+a.effect+'</div>'+
'<div style="font-size:9px;color:#8a7a6a;margin-top:6px;text-align:center">&#128197; '+a.era+'</div>';
}

function collectArtifact(id){
var s=getV13State();if(!s.artifacts)s.artifacts=[];
if(s.artifacts.indexOf(id)<0){s.artifacts.push(id);saveV13State(s);checkV13Ach()}
}

// =============================================
// SECTION 15: RENDER - WAR CHRONICLES
// =============================================
function renderWarChronicles(){
var state=getV13State();var read=state.warRead||[];
var p=panels.warchronicle;
p.innerHTML='<h2>&#128220; &#51204;&#51137;&#49324; &#50672;&#45824;&#44592;</h2>'+
'<div class="v13-subtitle">&#44256;&#51312;&#49440;&#48512;&#53552; &#49340;&#54620;&#44620;&#51648; &#51452;&#50836; &#51204;&#51137;&#44284; &#49324;&#44148;&#51012; &#49884;&#44036;&#49692;&#51004;&#47196; &#49332;&#54196;&#48393;&#45768;&#45796;</div>'+
'<div class="war-timeline">'+
'<div class="war-line"></div>'+
WAR_CHRONICLES.map(function(w,i){
var isRead=read.indexOf(w.id)>=0;
return '<div class="war-entry" onclick="window._v13.toggleWar('+i+')" role="button" tabindex="0">'+
'<div class="war-year">'+w.year+'</div>'+
'<div class="war-title">'+(isRead?'&#9989; ':'')+w.nm+'</div>'+
'<div class="war-desc">'+w.desc+'</div>'+
'<div class="war-forces">'+w.forces.map(function(f){return '<span class="war-force">'+f+'</span>'}).join('')+'</div>'+
'<div class="war-expand" id="war-exp-'+i+'">'+w.detail+'</div>'+
'</div>';
}).join('')+
'</div>'+
'<button class="v13-close" onclick="document.getElementById(\'v13-warchronicle\').classList.remove(\'on\')">&#45803;&#44592;</button>';
trackV13('war_viewed',true);
}

function toggleWar(idx){
var el=document.getElementById('war-exp-'+idx);
if(!el)return;
el.classList.toggle('on');
if(el.classList.contains('on')){
if(typeof sfx==='function')sfx('war_expand');
var s=getV13State();if(!s.warRead)s.warRead=[];
var wid=WAR_CHRONICLES[idx].id;
if(s.warRead.indexOf(wid)<0){s.warRead.push(wid);saveV13State(s);checkV13Ach()}
}
}

// =============================================
// SECTION 16: RENDER - UNIT COMPENDIUM
// =============================================
function renderUnitComp(){
var p=panels.unitcomp;
p.innerHTML='<h2>&#9876;&#65039; &#50976;&#45787; &#46020;&#44048;</h2>'+
'<div class="v13-subtitle">&#44033; &#48337;&#44284;&#51032; &#49345;&#49464; &#49828;&#53455;&#44284; &#49345;&#49457; &#44288;&#44228;&#47484; &#54869;&#51064;&#54616;&#49464;&#50836;</div>'+
'<div class="unit-grid">'+UNITS.map(function(u){
return '<div class="unit-card" onclick="window._v13.showUnit(\''+u.id+'\')" role="button" tabindex="0">'+
'<div class="unit-icon">'+u.ic+'</div>'+
'<div class="unit-name">'+u.nm+'</div>'+
'<div class="unit-type">'+u.type+'</div>'+
'</div>';
}).join('')+'</div>'+
'<div class="unit-detail" id="unit-detail-v13"></div>'+
'<button class="v13-close" onclick="document.getElementById(\'v13-unitcomp\').classList.remove(\'on\')">&#45803;&#44592;</button>';
trackV13('unit_viewed',true);
}

function showUnit(id){
var u=UNITS.find(function(x){return x.id===id});if(!u)return;
if(typeof sfx==='function')sfx('unit_view');
var dt=document.getElementById('unit-detail-v13');
dt.className='unit-detail on';
var colors={hp:'#44bb44',atk:'#ff6644',def:'#5FA0FF',spd:'#FFD700',range:'#aa88ff'};
var labels={hp:'HP',atk:'공격',def:'방어',spd:'속도',range:'사거리'};
dt.innerHTML='<h3>'+u.ic+' '+u.nm+' <span style="font-size:10px;color:#8a7a6a">('+u.type+')</span></h3>'+
'<p style="font-size:11px;color:#e8dcc8;line-height:2;margin-bottom:8px">'+u.desc+'</p>'+
'<div class="unit-bars">'+Object.keys(u.stats).map(function(k){
return '<div class="unit-bar-row">'+
'<span class="unit-bar-label">'+labels[k]+'</span>'+
'<div class="unit-bar"><div class="unit-bar-fill" style="width:'+u.stats[k]+'%;background:'+(colors[k]||'#c4956a')+'"></div></div>'+
'<span class="unit-bar-val">'+u.stats[k]+'</span>'+
'</div>';
}).join('')+'</div>'+
'<div style="display:flex;gap:8px;margin-top:8px;font-size:10px;flex-wrap:wrap">'+
'<div style="padding:4px 10px;background:rgba(42,90,42,.15);border:1px solid rgba(42,90,42,.3);border-radius:6px;color:#88ff88">&#9650; '+u.strong+'&#50640; &#44053;</div>'+
'<div style="padding:4px 10px;background:rgba(90,42,42,.15);border:1px solid rgba(90,42,42,.3);border-radius:6px;color:#ff8888">&#9660; '+u.weak+'&#50640; &#50557;</div>'+
'</div>';
trackV13('unit_detail_'+id,true);
}

// =============================================
// SECTION 17: RENDER - BATTLE DASHBOARD
// =============================================
function renderDashboard(){
var st=loadStats13();
var ach=loadAch13();
var p=panels.dashboard;
var totalBattles=(st.wins||0)+(st.losses||0);
var winRate=totalBattles>0?Math.round((st.wins||0)/totalBattles*100):0;
p.innerHTML='<h2>&#128202; &#51204;&#53804; &#53685;&#44228;</h2>'+
'<div class="dash-cards">'+
[{v:st.wins||0,l:'&#49849;&#47532;'},{v:st.losses||0,l:'&#54056;&#48176;'},{v:winRate+'%',l:'&#49849;&#47456;'},{v:st.turns||0,l:'&#52509; &#53556;'},{v:st.quizOk||0,l:'&#53300;&#51592; &#51221;&#45813;'},{v:ach.length,l:'&#50629;&#51201;'}].map(function(d){
return '<div class="dash-card"><div class="dash-val">'+d.v+'</div><div class="dash-label">'+d.l+'</div></div>';
}).join('')+
'</div>'+
'<div class="dash-chart-wrap"><canvas class="dash-chart" id="dash-cvs" width="500" height="200"></canvas></div>'+
'<button class="v13-close" onclick="document.getElementById(\'v13-dashboard\').classList.remove(\'on\')">&#45803;&#44592;</button>';
drawDashChart(st);
trackV13('dashboard_viewed',true);
}

function drawDashChart(st){
var cvs=document.getElementById('dash-cvs');if(!cvs)return;
var ctx=cvs.getContext('2d');
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,500,200);
ctx.fillStyle='#c4956a';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
ctx.fillText('&#51204;&#53804; &#44592;&#47197; (&#52572;&#44540; 7&#51204;&#53804;)',250,18);
var data=st.recentBattles||[0,0,0,0,0,0,0];
var max=Math.max.apply(null,data.concat([1]));
var bw=40,gap=20,startX=60;
var labels=['6&#51204;','5&#51204;','4&#51204;','3&#51204;','2&#51204;','1&#51204;','&#52572;&#44540;'];
data.forEach(function(v,i){
var h=v/max*130;
var x=startX+i*(bw+gap);
var grd=ctx.createLinearGradient(x,180-h,x,180);
grd.addColorStop(0,'#FFD700');grd.addColorStop(1,'#c4956a');
ctx.fillStyle=grd;
ctx.fillRect(x,180-h,bw,h);
ctx.fillStyle='#e8dcc8';ctx.font='10px sans-serif';
ctx.fillText(v,x+bw/2,175-h);
ctx.fillStyle='#8a7a6a';ctx.font='8px sans-serif';
ctx.fillText(labels[i],x+bw/2,195);
});
}

// =============================================
// SECTION 18: RENDER - ERA PROGRESS
// =============================================
function renderEraProgress(){
var state=getV13State();
var currentEra=state.currentEra||'gojoseon_early';
var curIdx=ERAS.findIndex(function(e){return e.id===currentEra});
if(curIdx<0)curIdx=2;
var pct=ERAS[curIdx].pct;
var p=panels.eraprogress;
p.innerHTML='<h2>&#128197; &#49884;&#45824; &#51652;&#48372;</h2>'+
'<div class="v13-subtitle">&#52264;&#53552;&#47484; &#51652;&#54665;&#54616;&#47732; &#49884;&#45824;&#44032; &#48156;&#51204;&#54633;&#45768;&#45796;</div>'+
'<div class="era-bar-wrap"><div class="era-bar"><div class="era-fill" style="width:'+pct+'%"></div><div class="era-label">'+ERAS[curIdx].nm+' ('+pct+'%)</div></div></div>'+
'<div class="era-grid">'+ERAS.map(function(e,i){
return '<div class="era-item'+(i===curIdx?' current':'')+(i>curIdx?' locked':'')+'">'+
'<h4>'+e.icon+' '+e.nm+'</h4>'+
'<p>'+e.era+'<br>'+e.desc+'</p>'+
'</div>';
}).join('')+'</div>'+
'<button class="v13-close" onclick="document.getElementById(\'v13-eraprogress\').classList.remove(\'on\')">&#45803;&#44592;</button>';
trackV13('era_viewed',true);
}

// =============================================
// SECTION 19: RENDER - CAMPAIGN
// =============================================
function renderCampaign(){
var state=getV13State();var cleared=state.campaignsCleared||[];
var p=panels.campaign;
p.innerHTML='<h2>&#127942; &#44400;&#49324; &#52896;&#54168;&#51064;</h2>'+
'<div class="v13-subtitle">&#44256;&#51312;&#49440; &#49884;&#45824;&#51032; &#51452;&#50836; &#51204;&#50669;&#51012; &#52404;&#54744;&#54616;&#49464;&#50836;</div>'+
'<div class="camp-list">'+CAMPAIGNS.map(function(c,i){
var isDone=cleared.indexOf(c.id)>=0;
var isLocked=i>0&&cleared.indexOf(CAMPAIGNS[i-1].id)<0&&!isDone;
return '<div class="camp-card'+(isDone?' cleared':'')+(isLocked?' locked':'')+'" onclick="'+(isLocked?'':'window._v13.startCampaign(\''+c.id+'\')')+'" role="button" tabindex="0">'+
'<div class="camp-num">'+(i+1)+'</div>'+
'<div class="camp-info">'+
'<h4>'+c.nm+'</h4>'+
'<p>'+c.desc+'</p>'+
'<span class="camp-status '+(isDone?'camp-done':isLocked?'camp-lock':'camp-new')+'">'+(isDone?'&#9989; &#50756;&#47308;':isLocked?'&#128274; &#51060;&#51204; &#51204;&#50669; &#54596;&#50836;':'&#9654; &#46020;&#51204;')+'</span>'+
'<div style="font-size:9px;color:#8a7a6a;margin-top:2px">&#128161; &#48372;&#49345;: '+c.reward+' | &#45212;&#51060;&#46020;: '+c.diff+'</div>'+
'</div></div>';
}).join('')+'</div>'+
'<button class="v13-close" onclick="document.getElementById(\'v13-campaign\').classList.remove(\'on\')">&#45803;&#44592;</button>';
trackV13('campaign_viewed',true);
}

function startCampaign(id){
var c=CAMPAIGNS.find(function(x){return x.id===id});if(!c)return;
if(typeof sfx==='function')sfx('campaign_start');
showV13Toast(c.nm+' &#49884;&#51089;! (&#45212;&#51060;&#46020;: '+c.diff+')');
panels.campaign.classList.remove('on');
trackV13('campaign_started',id);
}

// =============================================
// SECTION 20: STATE MANAGEMENT
// =============================================
function getV13State(){try{return JSON.parse(localStorage.getItem('krpg_v13'))||{}}catch(e){return{}}}
function saveV13State(s){localStorage.setItem('krpg_v13',JSON.stringify(s))}
function trackV13(key,val){var s=getV13State();if(!s.tracked)s.tracked={};s.tracked[key]=val;saveV13State(s);checkV13Ach()}
function loadStats13(){try{return JSON.parse(localStorage.getItem('krpg_stats'))||{}}catch(e){return{}}}
function loadAch13(){try{return JSON.parse(localStorage.getItem('krpg_ach'))||[]}catch(e){return[]}}

// =============================================
// SECTION 21: ACHIEVEMENT CHECK
// =============================================
function checkV13Ach(){
var s=getV13State();var t=s.tracked||{};
var aw=s.awakened||{};var arts=s.artifacts||[];
var warRead=s.warRead||[];var camps=s.campaignsCleared||[];
var stats=loadStats13();var ach=loadAch13();
var changed=false;
var checks={
formation_master:FORMATIONS.every(function(f){return t['formation_selected']===f.id||t['fmt_'+f.id]}),
awakening_first:Object.keys(aw).length>=1,
awakening_all:Object.keys(aw).length>=HEROES.length,
artifact_5:arts.length>=5,
artifact_all:arts.length>=ARTIFACTS.length,
war_reader:warRead.length>=WAR_CHRONICLES.length,
unit_expert:UNITS.every(function(u){return t['unit_detail_'+u.id]}),
campaign_3:camps.length>=3,
campaign_all:camps.length>=CAMPAIGNS.length,
era_samhan:s.currentEra==='samhan'||s.currentEra==='three_kingdoms',
quiz_90:(stats.quizOk||0)>=90,
all_v13:!!t.formation_viewed&&!!t.awakening_viewed&&!!t.artifacts_viewed&&!!t.war_viewed&&!!t.unit_viewed&&!!t.dashboard_viewed&&!!t.era_viewed&&!!t.campaign_viewed
};
ACH_V13.forEach(function(a){
if(ach.indexOf(a.id)<0&&checks[a.id]){ach.push(a.id);changed=true;showV13AchToast(a)}
});
if(changed)localStorage.setItem('krpg_ach',JSON.stringify(ach));
}

function showV13AchToast(a){
if(typeof sfx==='function')sfx('achievement_v13');
var t=document.createElement('div');
t.style.cssText='position:fixed;top:60px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,rgba(170,136,255,.15),rgba(255,215,0,.15));border:2px solid #aa88ff;border-radius:12px;padding:12px 20px;z-index:200;text-align:center;min-width:220px;backdrop-filter:blur(8px);pointer-events:none;animation:achSlide13 .5s ease';
t.innerHTML='<div style="font-size:28px">'+a.ic+'</div><div style="font-size:11px;color:#aa88ff;font-weight:700">&#50629;&#51201; &#45804;&#49457;!</div><div style="font-size:14px;color:#e8dcc8;font-weight:700">'+a.nm+'</div><div style="font-size:9px;color:#8a7a6a">'+a.ds+'</div>';
document.body.appendChild(t);
setTimeout(function(){t.style.transition='opacity .5s';t.style.opacity='0';setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t)},600)},3000);
}

function showV13Toast(msg){
var t=document.createElement('div');
t.style.cssText='position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(26,20,40,.95);border:1px solid #aa88ff;border-radius:8px;padding:8px 20px;z-index:200;font-size:12px;color:#e8dcc8;pointer-events:none;animation:achSlide13 .5s ease';
t.textContent=msg;
document.body.appendChild(t);
setTimeout(function(){t.style.transition='opacity .5s';t.style.opacity='0';setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t)},600)},2000);
}

// =============================================
// SECTION 22: MENU BUTTON INJECTION
// =============================================
var mnu=document.getElementById('menu-overlay');
if(mnu){
var v13btns=[
{txt:'&#128038; &#51652;&#54805; &#49884;&#49828;&#53596;',fn:function(){mnu.classList.remove('on');renderFormation();panels.formation.classList.add('on')}},
{txt:'&#9889; &#50689;&#50885; &#44033;&#49457;',fn:function(){mnu.classList.remove('on');renderAwakening();panels.awakening.classList.add('on')}},
{txt:'&#128302; &#50976;&#47932; &#46020;&#44048;',fn:function(){mnu.classList.remove('on');renderArtifacts();panels.artifact.classList.add('on')}},
{txt:'&#128220; &#51204;&#51137;&#49324;',fn:function(){mnu.classList.remove('on');renderWarChronicles();panels.warchronicle.classList.add('on')}},
{txt:'&#9876;&#65039; &#50976;&#45787; &#46020;&#44048;',fn:function(){mnu.classList.remove('on');renderUnitComp();panels.unitcomp.classList.add('on')}},
{txt:'&#128202; &#51204;&#53804; &#53685;&#44228;',fn:function(){mnu.classList.remove('on');renderDashboard();panels.dashboard.classList.add('on')}},
{txt:'&#128197; &#49884;&#45824; &#51652;&#48372;',fn:function(){mnu.classList.remove('on');renderEraProgress();panels.eraprogress.classList.add('on')}},
{txt:'&#127942; &#44400;&#49324; &#52896;&#54168;&#51064;',fn:function(){mnu.classList.remove('on');renderCampaign();panels.campaign.classList.add('on')}}
];
var closeBtn=mnu.querySelector('.menu-btn:last-child');
v13btns.forEach(function(b){
var btn=document.createElement('button');btn.className='menu-btn';btn.innerHTML=b.txt;
btn.onclick=b.fn;
if(closeBtn)mnu.insertBefore(btn,closeBtn);else mnu.appendChild(btn);
});
}

// =============================================
// SECTION 23: KEYBOARD SHORTCUTS
// =============================================
document.addEventListener('keydown',function(ev){
if(ev.target.tagName==='INPUT'||ev.target.tagName==='TEXTAREA')return;
if(ev.ctrlKey||ev.altKey||ev.metaKey)return;
var key=ev.key.toLowerCase();
if(key==='t'){panels.formation.classList.toggle('on');if(panels.formation.classList.contains('on'))renderFormation();ev.preventDefault()}
if(key==='h'){panels.awakening.classList.toggle('on');if(panels.awakening.classList.contains('on'))renderAwakening();ev.preventDefault()}
if(key==='v'){panels.artifact.classList.toggle('on');if(panels.artifact.classList.contains('on'))renderArtifacts();ev.preventDefault()}
if(key==='w'){panels.warchronicle.classList.toggle('on');if(panels.warchronicle.classList.contains('on'))renderWarChronicles();ev.preventDefault()}
if(key==='u'){panels.unitcomp.classList.toggle('on');if(panels.unitcomp.classList.contains('on'))renderUnitComp();ev.preventDefault()}
});

// =============================================
// SECTION 24: SFX (6종)
// =============================================
if(typeof window.sfx==='function'&&typeof ac!=='undefined'){
var _sfx13=window.sfx;
window.sfx=function(t){
if(t==='formation_select'&&ac&&typeof pn==='function'){
[330,440,554,660].forEach(function(f,i){setTimeout(function(){pn(f,.12,'triangle')},i*60)});return;
}
if(t==='awakening'&&ac&&typeof pn==='function'){
[262,330,392,523,659,784,987].forEach(function(f,i){setTimeout(function(){pn(f,.15+(i*.02),'sine')},i*80)});return;
}
if(t==='artifact_view'&&ac&&typeof pn==='function'){
pn(523,.1,'sine');setTimeout(function(){pn(659,.12,'sine')},100);setTimeout(function(){pn(784,.15,'sine')},200);return;
}
if(t==='war_expand'&&ac&&typeof pn==='function'){
pn(220,.08,'triangle');setTimeout(function(){pn(277,.08,'triangle')},80);setTimeout(function(){pn(330,.1,'triangle')},160);return;
}
if(t==='campaign_start'&&ac&&typeof pn==='function'){
[294,370,440,554,659].forEach(function(f,i){setTimeout(function(){pn(f,.15,'square')},i*50)});return;
}
if(t==='achievement_v13'&&ac&&typeof pn==='function'){
[523,659,784,987,1175].forEach(function(f,i){setTimeout(function(){pn(f,.18,'sine')},i*60)});return;
}
if(t==='hero_view'&&ac&&typeof pn==='function'){
pn(392,.1,'sine');setTimeout(function(){pn(494,.1,'sine')},100);return;
}
if(t==='unit_view'&&ac&&typeof pn==='function'){
pn(330,.08,'square');setTimeout(function(){pn(440,.08,'square')},80);return;
}
_sfx13(t);
};
}

// =============================================
// SECTION 25: QUIZ INJECTION
// =============================================
if(typeof QUIZZES!=='undefined'){
QUIZ_V13.forEach(function(q){QUIZZES.push(q)});
}

// =============================================
// SECTION 26: ACHIEVEMENT REGISTRATION
// =============================================
if(typeof window._v10!=='undefined'&&window._v10.achDefs){
ACH_V13.forEach(function(a){window._v10.achDefs.push(a)});
}

// =============================================
// SECTION 27: CHAPTER HOOK FOR ARTIFACTS & ERA
// =============================================
function hookChapterProgress(){
if(typeof G==='undefined')return;
setInterval(function(){
if(typeof G==='undefined')return;
var ch=G.chapter||1;
var s=getV13State();
ARTIFACTS.forEach(function(a){if(a.ch<=ch)collectArtifact(a.id)});
var eraMap={1:'gojoseon_early',2:'gojoseon_late',3:'hansagun',4:'samhan'};
if(eraMap[ch]&&s.currentEra!==eraMap[ch]){s.currentEra=eraMap[ch];saveV13State(s);checkV13Ach()}
},5000);
}
setTimeout(hookChapterProgress,3000);

// =============================================
// SECTION 28: KEYBOARD HELP UPDATE
// =============================================
var kbHelp=document.getElementById('kb-help');
if(kbHelp){
var extra=[
{key:'T',desc:'진형 시스템'},
{key:'H',desc:'영웅 각성'},
{key:'V',desc:'유물 도감'},
{key:'W',desc:'전쟁사 연대기'},
{key:'U',desc:'유닛 도감'}
];
var closeBtn=kbHelp.querySelector('.kb-close');
extra.forEach(function(e){
var row=document.createElement('div');row.className='kb-row';
row.innerHTML='<span class="kb-key">'+e.key+'</span> '+e.desc;
if(closeBtn)kbHelp.insertBefore(row,closeBtn);else kbHelp.appendChild(row);
});
}

// =============================================
// SECTION 29: EXPORTS
// =============================================
window._v13={
renderFormation:renderFormation,
selectFormation:selectFormation,
renderAwakening:renderAwakening,
showHeroDetail:showHeroDetail,
awakenHero:awakenHero,
renderArtifacts:renderArtifacts,
showArtifact:showArtifact,
collectArtifact:collectArtifact,
renderWarChronicles:renderWarChronicles,
toggleWar:toggleWar,
renderUnitComp:renderUnitComp,
showUnit:showUnit,
renderDashboard:renderDashboard,
renderEraProgress:renderEraProgress,
renderCampaign:renderCampaign,
startCampaign:startCampaign,
formations:FORMATIONS,
heroes:HEROES,
artifacts:ARTIFACTS,
warChronicles:WAR_CHRONICLES,
units:UNITS,
campaigns:CAMPAIGNS,
eras:ERAS,
achV13:ACH_V13,
quizV13:QUIZ_V13
};

})();
