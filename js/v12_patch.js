// v12_patch.js — 한국사 영웅전 v12.0 Enhancement Patch
// Faction Map + Relations + Diplomacy + Battle Replay + Scene Gallery + Art of War + Share Card + Practice Mode + Quiz + Achievements + SFX
(function(){
'use strict';

// =============================================
// SECTION 1: CSS INJECTION
// =============================================
var css=document.createElement('style');
css.textContent=[
'#v12-factionmap{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:120;overflow-y:auto;padding:16px}',
'#v12-factionmap.on{display:block}',
'#v12-factionmap h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.fm-canvas-wrap{max-width:500px;margin:0 auto;position:relative}',
'.fm-canvas{width:100%;border-radius:8px;border:1px solid #3a3a4a}',
'.fm-legend{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:8px auto;max-width:500px}',
'.fm-leg{font-size:9px;padding:3px 8px;border-radius:6px;border:1px solid #3a3a4a;color:#e8dcc8;display:flex;align-items:center;gap:4px}',
'.fm-leg-dot{width:8px;height:8px;border-radius:50%;display:inline-block}',
'.fm-detail{max-width:500px;margin:8px auto;background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:12px;display:none}',
'.fm-detail.on{display:block}',
'.fm-detail h3{color:#FFD700;font-size:14px;margin-bottom:6px}',
'.fm-detail p{font-size:11px;color:#e8dcc8;line-height:1.8}',
'.fm-detail .fm-stats{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:8px}',
'.fm-detail .fm-stat{font-size:10px;color:#8a7a6a;padding:4px;background:rgba(0,0,0,.2);border-radius:4px}',
'.fm-detail .fm-stat b{color:#FFD700}',

'#v12-relations{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:120;overflow-y:auto;padding:16px}',
'#v12-relations.on{display:block}',
'#v12-relations h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.rel-canvas-wrap{max-width:500px;margin:0 auto}',
'.rel-canvas{width:100%;border-radius:8px;border:1px solid #3a3a4a}',
'.rel-info{max-width:500px;margin:8px auto;font-size:10px;color:#8a7a6a;text-align:center;line-height:1.8}',

'#v12-replay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:120;overflow-y:auto;padding:16px}',
'#v12-replay.on{display:block}',
'#v12-replay h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.rp-list{max-width:500px;margin:0 auto}',
'.rp-entry{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:12px;margin:6px 0;cursor:pointer;transition:all .3s}',
'.rp-entry:hover{border-color:#c4956a;background:rgba(42,36,56,.9)}',
'.rp-entry h4{color:#FFD700;font-size:12px;margin-bottom:4px}',
'.rp-entry p{font-size:10px;color:#8a7a6a;line-height:1.6}',
'.rp-entry .rp-result{font-size:11px;font-weight:700;margin-top:4px}',
'.rp-entry .rp-win{color:#4f4}',
'.rp-entry .rp-loss{color:#f44}',
'.rp-empty{text-align:center;color:#5a5a6a;font-size:12px;padding:40px}',
'.rp-detail{max-width:500px;margin:8px auto;background:rgba(26,20,40,.9);border:1px solid #c4956a;border-radius:12px;padding:16px;display:none}',
'.rp-detail.on{display:block}',
'.rp-detail h3{color:#FFD700;font-size:14px;margin-bottom:8px;text-align:center}',
'.rp-turn{padding:6px 0;border-bottom:1px solid #2a2438;font-size:10px;color:#e8dcc8;line-height:1.8}',
'.rp-turn .rp-actor{color:#FFD700;font-weight:700}',
'.rp-turn .rp-dmg{color:#ff6644}',
'.rp-turn .rp-heal{color:#4f4}',

'#v12-gallery{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:120;overflow-y:auto;padding:16px}',
'#v12-gallery.on{display:block}',
'#v12-gallery h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.gal-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;max-width:600px;margin:0 auto}',
'.gal-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:12px;text-align:center;cursor:pointer;transition:all .3s}',
'.gal-card:hover{border-color:#FFD700;transform:translateY(-2px)}',
'.gal-card.locked{opacity:.35;filter:grayscale(.9)}',
'.gal-icon{font-size:36px;margin-bottom:6px}',
'.gal-title{font-size:11px;font-weight:700;color:#FFD700;margin-bottom:2px}',
'.gal-desc{font-size:9px;color:#8a7a6a;line-height:1.5}',
'.gal-view{display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(180deg,#2a1a3a,#1a1428);border:2px solid #c4956a;border-radius:12px;padding:20px;z-index:130;max-width:420px;width:90%;max-height:80vh;overflow-y:auto}',
'.gal-view.on{display:block}',
'.gal-view h3{color:#FFD700;font-size:16px;margin-bottom:8px;text-align:center}',
'.gal-view .gal-body{font-size:12px;color:#e8dcc8;line-height:2}',

'#v12-artofwar{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:120;overflow-y:auto;padding:16px}',
'#v12-artofwar.on{display:block}',
'#v12-artofwar h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.aow-tabs{display:flex;gap:4px;justify-content:center;margin-bottom:12px;flex-wrap:wrap}',
'.aow-tab{padding:6px 14px;border:1px solid #5a3a1a;border-radius:6px;background:#1a1428;color:#e8dcc8;font-family:inherit;font-size:11px;cursor:pointer;font-weight:700}',
'.aow-tab.active{background:#3a2a48;border-color:#c4956a;color:#FFD700}',
'.aow-content{max-width:500px;margin:0 auto}',
'.aow-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:12px;margin:8px 0}',
'.aow-card h3{color:#FFD700;font-size:13px;margin-bottom:6px}',
'.aow-card p{font-size:11px;color:#e8dcc8;line-height:1.8}',
'.aow-card .aow-example{font-size:10px;color:#88aa88;padding:8px;background:rgba(42,90,42,.12);border:1px solid rgba(42,90,42,.25);border-radius:6px;margin-top:6px;line-height:1.7}',

'#v12-share{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:120;overflow-y:auto;padding:16px}',
'#v12-share.on{display:block}',
'#v12-share h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.share-canvas-wrap{max-width:420px;margin:0 auto;text-align:center}',
'.share-canvas{width:100%;border-radius:8px;border:1px solid #3a3a4a}',
'.share-btns{display:flex;gap:8px;justify-content:center;margin-top:12px}',
'.share-btn{padding:8px 20px;border:1px solid #5a3a1a;border-radius:6px;background:#2a2438;color:#e8dcc8;font-family:inherit;font-size:12px;font-weight:700;cursor:pointer}',
'.share-btn:hover{background:#3a3448;border-color:#c4956a}',

'#v12-practice{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:120;overflow-y:auto;padding:16px}',
'#v12-practice.on{display:block}',
'#v12-practice h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.prac-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;max-width:500px;margin:0 auto}',
'.prac-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:14px;cursor:pointer;transition:all .3s}',
'.prac-card:hover{border-color:#c4956a;transform:translateY(-2px)}',
'.prac-card h4{color:#FFD700;font-size:13px;margin-bottom:4px}',
'.prac-card p{font-size:10px;color:#8a7a6a;line-height:1.6}',
'.prac-card .prac-diff{font-size:9px;margin-top:6px;padding:2px 8px;border-radius:4px;display:inline-block}',
'.prac-easy{background:rgba(42,90,42,.2);color:#4f4;border:1px solid rgba(42,90,42,.4)}',
'.prac-normal{background:rgba(90,90,42,.2);color:#ff4;border:1px solid rgba(90,90,42,.4)}',
'.prac-hard{background:rgba(90,42,42,.2);color:#f44;border:1px solid rgba(90,42,42,.4)}',

'.v12-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v12-close:hover{background:#8B2A1A}',
'.v12-overlay-bg{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);z-index:125}',
'.v12-overlay-bg.on{display:block}'
].join('\n');
document.head.appendChild(css);

// =============================================
// SECTION 2: FACTION MAP DATA
// =============================================
var FACTIONS=[
{id:'gojoseon',nm:'고조선',color:'#FFD700',x:.45,y:.28,r:18,era:'BC 2333~BC 108',capital:'아사달(왕검성)',pop:'수십만',military:'보병+궁병+기마병',desc:'한국 최초의 국가. 요동~한반도 북부를 아우르는 넓은 영토. 비파형동검, 고인돌 문화. 팔조법금으로 다스림. 위만조선 시기 철기문화 기반 중계무역 독점.'},
{id:'buyeo',nm:'부여',color:'#88AAFF',x:.65,y:.18,r:14,era:'BC 2C~AD 494',capital:'쑹화강 유역',pop:'8만호',military:'기마+보병',desc:'만주 쑹화강 유역의 국가. 5부족 연맹(마가·우가·저가·구가·왕). 영고 제천행사. 순장 풍습. 고구려·백제의 모체가 되는 국가.'},
{id:'mahan',nm:'마한',color:'#FF88AA',x:.38,y:.68,r:12,era:'BC 1C~AD 3C',capital:'월지국 중심',pop:'54국 10만호',military:'보병',desc:'한반도 중서부의 54개 소국 연맹. 준왕이 남하하여 마한왕이 됨. 소도(신성구역)와 천군(제사장) 제도. 후에 백제에 병합.'},
{id:'jinhan',nm:'진한',color:'#88FF88',x:.55,y:.65,r:10,era:'BC 1C~AD 3C',capital:'사로국 중심',pop:'12국 4~5만호',military:'보병+궁병',desc:'한반도 동남부의 12개 소국. 철 생산이 풍부하여 교역의 중심. 진(秦)나라 유민이 이주했다는 전승. 사로국이 중심이 되어 후에 신라로 발전.'},
{id:'byeonhan',nm:'변한',color:'#FFAA44',x:.48,y:.72,r:10,era:'BC 1C~AD 3C',capital:'구야국 중심',pop:'12국 4~5만호',military:'보병',desc:'한반도 남부의 12개 소국. 철 생산의 중심지로 낙랑·왜 등에 철을 수출. 구야국이 중심이 되어 후에 가야 연맹으로 발전.'},
{id:'okjeo',nm:'옥저',color:'#AA88FF',x:.62,y:.38,r:8,era:'BC 2C~AD 5C',capital:'함경도 해안',pop:'5천호',military:'보병',desc:'함경도 해안 지역의 국가. 민며느리혼·골장제 등 독특한 풍습. 해산물(소금, 어물)이 풍부. 고구려에 공물을 바침.'},
{id:'dongye',nm:'동예',color:'#44DDDD',x:.58,y:.45,r:8,era:'BC 2C~AD 5C',capital:'강릉 지역',pop:'2만호',military:'궁병',desc:'강원도 동해안 지역의 국가. 무천 제천행사, 책화(다른 부족 영역 침범 시 배상) 제도. 특산물: 단궁, 과하마, 반어피. 각 읍락이 독립적.'},
{id:'han_china',nm:'한(漢)나라',color:'#FF4444',x:.15,y:.35,r:16,era:'BC 206~AD 220',capital:'장안/낙양',pop:'5천만+',military:'대규모 보병+기병',desc:'동아시아 최강 제국. BC 109년 고조선 침공, 한사군 설치. 위만조선과 대립. 철기문화의 원류.'}
];

var FACTION_RELATIONS=[
{from:'gojoseon',to:'han_china',type:'적대',desc:'BC 109년 한 무제 침공. 왕검성 1년 항전 후 멸망'},
{from:'gojoseon',to:'buyeo',type:'우호',desc:'같은 천손 신화를 공유. 부여 건국 세력 일부 고조선 유민'},
{from:'gojoseon',to:'mahan',type:'우호',desc:'준왕 남하 후 마한왕 자칭. 고조선 유민 일부 마한에 정착'},
{from:'buyeo',to:'han_china',type:'조공',desc:'한나라에 조공 관계 유지하며 독립 보전'},
{from:'mahan',to:'jinhan',type:'중립',desc:'삼한 내부 교역 관계. 마한이 명목상 맹주'},
{from:'mahan',to:'byeonhan',type:'중립',desc:'삼한 내부 교역 관계'},
{from:'jinhan',to:'byeonhan',type:'우호',desc:'12국씩 가까운 거리에서 교류. 철 교역 활발'},
{from:'okjeo',to:'gojoseon',type:'복속',desc:'고조선에 공물을 바치는 종속 관계'},
{from:'dongye',to:'gojoseon',type:'복속',desc:'고조선의 영향권. 독자 문화 유지하며 복속'},
{from:'byeonhan',to:'han_china',type:'교역',desc:'철을 매개로 한 간접 교역 관계'}
];

// =============================================
// SECTION 3: SCENE GALLERY DATA
// =============================================
var SCENES=[
{id:'s01',ch:1,nm:'환웅의 하강',ic:'👑',desc:'환인천제의 아들 환웅이 3,000명의 무리와 풍백·우사·운사를 이끌고 태백산 신단수 아래로 내려온다. 구름 사이로 빛이 쏟아지고, 새로운 세상이 시작된다.',full:'장엄한 광경이었다. 하늘의 문이 열리고, 환웅은 천부인 세 가지를 손에 쥐고 인간 세상을 향해 발을 내딛었다. 태백산의 봉우리가 찬란한 빛에 휩싸이고, 만물이 그의 도착을 환영하듯 요동쳤다. 풍백이 바람을 불러 구름을 걷어내고, 우사가 비를 내려 대지를 적시며, 운사가 뇌운을 몰아 하늘을 울렸다. 3천명의 신하들이 뒤를 따르며, 신시(神市)의 시대가 열렸다.'},
{id:'s02',ch:1,nm:'웅녀의 시련',ic:'🐻',desc:'곰과 호랑이가 환웅에게 인간이 되기를 간청한다. 쑥과 마늘만 먹으며 100일 동안 햇빛을 보지 말아야 하는 시련이 시작된다.',full:'깊은 동굴 속, 어둠만이 벗이었다. 곰은 쑥의 쓴맛과 마늘의 매운맛을 참아가며 하루하루를 세었다. 호랑이는 참지 못하고 뛰쳐나갔지만, 곰은 포기하지 않았다. 스물하룻째 되던 날, 동굴에 따뜻한 빛이 스며들었고, 곰은 아름다운 여인 &#8212; 웅녀가 되어 빛 속으로 걸어 나왔다. 인내의 결실이 빛을 발하는 순간이었다.'},
{id:'s03',ch:2,nm:'단군의 건국',ic:'🏛️',desc:'환웅과 웅녀의 아들 단군왕검이 아사달에 도읍하여 고조선을 건국한다. 홍익인간의 이념이 세상에 펼쳐진다.',full:'BC 2333년, 단군왕검이 아사달의 높은 곳에서 천하를 내려다보았다. &quot;널리 인간을 이롭게 하라&quot; &#8212; 환아버지 환인의 뜻을 받들어, 그는 고조선의 첫 번째 왕으로 즉위하였다. 팔조법금을 제정하여 백성의 생명과 재산을 보호하고, 곡식을 나누어 빈자를 구하며, 정의와 평화의 나라를 세웠다. 이것이 우리 역사의 시작이었다.'},
{id:'s04',ch:2,nm:'팔조법금의 반포',ic:'📜',desc:'단군이 나라의 질서를 위해 팔조법금을 반포한다. 생명을 중시하고 사유재산을 보호하는 최초의 법률 체계.',full:'단군왕검은 모든 백성을 모아놓고 엄숙히 선언하였다. 첫째, 사람을 죽인 자는 즉시 사형에 처한다. 둘째, 남에게 상해를 입힌 자는 곡물로 배상한다. 셋째, 도둑질한 자는 노비가 되거나 50만 전으로 속죄한다. 이 법은 비록 세 조항만 전해지나, 생명의 존엄과 사유재산의 인정, 그리고 질서의 근본을 담고 있었다.'},
{id:'s05',ch:3,nm:'위만의 정변',ic:'⚔️',desc:'연나라 출신 위만이 준왕의 신임을 이용해 반란을 일으키고 왕위를 찬탈한다. 고조선의 운명이 뒤바뀐다.',full:'BC 194년, 상투를 틀고 조선인 복장을 한 위만이 천여 명의 무리를 이끌고 패수를 건넜다. 준왕은 그를 서쪽 변경의 수비대장으로 임명하였으나, 이것은 치명적인 실수였다. 위만은 세력을 키운 후 왕검성을 기습하여 준왕을 몰아내고 스스로 왕이 되었다. 준왕은 배를 타고 남으로 도망하여 마한의 왕이 되었다고 전해진다.'},
{id:'s06',ch:3,nm:'왕검성의 항전',ic:'🏰',desc:'한 무제의 대군에 맞서 왕검성에서 1년간 항전한다. 성기장군의 최후.',full:'BC 109년, 한 무제가 5만 대군과 수군 7천을 보내 고조선을 침공하였다. 왕검성의 성벽 위에서 성기장군은 비장한 각오로 맞섰다. 1년간의 치열한 공방전, 한나라 장수 섭하가 교섭에 실패하고, 양복의 수군이 패하고, 그래도 왕검성은 버텼다. 하지만 내부에서 항복파가 반란을 일으켜 우거왕을 살해하였고, 마침내 BC 108년 왕검성은 함락되었다.'},
{id:'s07',ch:4,nm:'부여의 건국',ic:'🌅',desc:'고조선 멸망 전후, 만주 쑹화강 유역에서 부여가 건국된다. 천제의 후손을 자처하는 새로운 나라.',full:'고조선의 빛이 꺼져가던 시기, 북방 만주의 넓은 평원에서 새로운 나라가 태동하고 있었다. 부여의 건국자는 스스로를 천제의 후손이라 칭하며, 마가·우가·저가·구가의 네 부족을 통합하였다. 12월이면 영고(迎鼓)라는 성대한 제천행사를 열어 하늘에 감사하고, 죄인을 사면하며, 온 백성이 노래하고 춤추었다.'},
{id:'s08',ch:4,nm:'삼한의 시대',ic:'🗿',desc:'한반도 중남부에 마한·진한·변한의 세 집단이 형성된다. 78개 소국의 시대.',full:'고조선이 무너진 뒤, 한반도의 남쪽에서는 수많은 작은 나라들이 꽃피우기 시작했다. 마한 54국, 진한 12국, 변한 12국 &#8212; 총 78개의 소국이 각자의 영역에서 독자적인 문화를 꽃피웠다. 천군이 다스리는 소도에서는 누구도 잡아갈 수 없었고, 철을 캐고 교역하며 부를 쌓았다. 이 소국들이 훗날 백제, 신라, 가야로 발전하게 된다.'}
];

// =============================================
// SECTION 4: ART OF WAR DATA
// =============================================
var AOW_DATA={
'기본 전술':[
{nm:'집중의 원칙',body:'병력을 분산하지 말고 한 지점에 집중하여 각개격파하라. 적의 약한 지점을 찾아 모든 화력을 집중시키는 것이 승리의 지름길이다.',ex:'궁병 3명을 한 곳에 모아 적 보병을 집중 사격하면 1턴 만에 처치 가능. 분산하면 3턴이 걸린다.'},
{nm:'지형 장악',body:'전투 시작 시 가장 먼저 해야 할 것은 유리한 지형을 확보하는 것이다. 숲이나 요새를 먼저 점령한 뒤 방어적으로 싸우는 것이 효율적이다.',ex:'보병을 요새에 배치하면 방어 +40%, 회피 +20%. 적이 먼저 공격하도록 유인하면 반격으로 추가 피해를 줄 수 있다.'},
{nm:'병종 상성 활용',body:'궁병→보병→기마→궁병의 상성 관계를 철저히 활용하라. 상성 우위 공격은 피해량 50% 증가, 열위 시 25% 감소.',ex:'적 기마병에는 보병을, 적 보병에는 궁병을, 적 궁병에는 기마병을 보내라. 잘못된 매칭은 전투를 3배 어렵게 만든다.'}
],
'고급 전술':[
{nm:'포위 전술',body:'적을 사방에서 둘러싸면 적의 퇴로가 차단되고 방어력이 감소한다. 기마병의 기동력을 활용하여 후방을 차단하고, 보병이 정면에서 교전하라.',ex:'기마병 2기로 적 궁병의 후방을 차단한 후 보병이 정면 돌격하면, 궁병은 반격도 못 하고 처치된다.'},
{nm:'유인 전술',body:'약한 유닛을 미끼로 적을 유리한 위치로 유인하라. 적이 미끼를 추격하여 진형이 흐트러지면, 주력이 측면에서 공격한다.',ex:'HP가 낮은 궁병을 숲 앞에 배치. 적 기마병이 추격하면 숲에 대기중인 보병이 반격 + 상성 우위로 처치.'},
{nm:'회복 순환',body:'회복 유닛(우사/웅녀)을 후방에 배치하되, 전선의 유닛들이 교대로 회복받을 수 있는 동선을 만들어라.',ex:'보병A가 전투 후 후퇴 → 회복 → 보병B가 전진하여 교대. 이렇게 하면 보병이 쓰러지지 않고 지속전이 가능하다.'}
],
'역사 전략':[
{nm:'환웅의 천하도',body:'환웅은 3천 신하와 풍백·우사·운사를 이끌고 내려왔다. 지도자의 덕목은 현명한 인재 등용에 있다. 게임에서도 각 유닛의 특성을 파악하고 적재적소에 배치하라.',ex:'풍백은 범위 공격, 우사는 회복, 운사는 디버프. 각각의 역할을 명확히 하면 전투 효율이 극대화된다.'},
{nm:'단군의 팔조법금',body:'단군은 법으로 나라를 다스렸다. 전투에서도 규칙이 있다 &#8212; 반격, ZOC, 상성. 이 규칙을 이해하는 것이 전략의 기초다.',ex:'ZOC(통제영역)를 이용하여 적의 이동을 제한하고, 반격을 유도하여 적에게 추가 피해를 줄 수 있다.'},
{nm:'왕검성 방어전',body:'1년간의 항전은 방어 전략의 교과서다. 좁은 통로를 이용하여 적의 수적 우위를 무력화하고, 성벽(요새 지형)의 방어 보너스를 극대화하라.',ex:'요새 지형에 보병을 배치하고 궁병으로 원거리 지원. 적이 좁은 통로로 몰려오게 하면 수적 열세를 극복할 수 있다.'}
],
'심화 전략':[
{nm:'속전속결',body:'5턴 이내 승리는 최고의 전략이다. 기마병의 기동력으로 적 지휘관을 직접 타격하여 전투를 빠르게 끝내라.',ex:'기마병 2기가 전속력으로 적 본진을 돌파 → 보스 유닛 집중 공격. 잡졸은 무시하고 본진만 노린다.'},
{nm:'무손실 승리',body:'파티원이 한 명도 쓰러지지 않는 완벽한 승리. 회복 유닛을 적극 활용하고, 위험한 교전을 피하라.',ex:'우사의 전체 회복을 매 2턴마다 사용하고, 웅녀의 부활 기술을 비상시에 대비. 유닛이 HP 50% 이하면 즉시 후퇴.'},
{nm:'경험치 극대화',body:'모든 유닛이 골고루 경험치를 얻도록 관리하라. 막타를 약한 유닛에게 양보하면 성장 균형이 맞춰진다.',ex:'강한 유닛이 적을 HP 10% 이하로 깎은 뒤 약한 유닛이 막타를 쳐서 경험치 획득. 레벨 편차를 줄인다.'}
]
};

// =============================================
// SECTION 5: PRACTICE MODE DATA
// =============================================
var PRACTICE_MODES=[
{id:'prac_basics',nm:'기본 전투 훈련',desc:'보병·궁병·기마병의 기본 조작과 이동, 공격을 연습합니다. 적 3명을 처치하세요.',diff:'easy',enemies:3,turns:15},
{id:'prac_type',nm:'병종 상성 연습',desc:'상성 관계를 활용하여 유리한 매칭으로 전투하세요. 상성 우위 공격만 허용!',diff:'easy',enemies:3,turns:12},
{id:'prac_terrain',nm:'지형 활용 훈련',desc:'숲과 요새를 활용하여 방어적으로 싸우세요. 방어 지형에서만 전투.',diff:'normal',enemies:5,turns:20},
{id:'prac_surround',nm:'포위 전술 연습',desc:'4방향에서 적을 포위하여 처치하세요. 기마병의 기동력이 핵심!',diff:'normal',enemies:4,turns:15},
{id:'prac_speed',nm:'속전속결 훈련',desc:'5턴 이내에 모든 적을 처치하세요! 시간이 생명입니다.',diff:'hard',enemies:5,turns:5},
{id:'prac_survival',nm:'왕검성 방어전',desc:'밀려오는 적의 파상공세를 10턴간 버티세요. 요새 지형 사수!',diff:'hard',enemies:8,turns:10}
];

// =============================================
// SECTION 6: ADDITIONAL ACHIEVEMENTS (12개, 24→36)
// =============================================
var ACH_V12=[
{id:'faction_explorer',nm:'세력 탐험가',ds:'세력도 모든 세력 확인',ic:'🗺️'},
{id:'scene_collector',nm:'명장면 수집가',ds:'명장면 5개 이상 해금',ic:'🎬'},
{id:'art_reader',nm:'병법의 달인',ds:'병법서 전체 열람',ic:'📖'},
{id:'replay_reviewer',nm:'전투 분석가',ds:'전투 복기 3회 확인',ic:'🔄'},
{id:'share_first',nm:'첫 공유',ds:'공유 카드 1회 생성',ic:'📤'},
{id:'relations_viewer',nm:'외교관',ds:'인물 관계도 열람',ic:'🤝'},
{id:'practice_clear',nm:'훈련병 졸업',ds:'연습 모드 1회 완료',ic:'🎯'},
{id:'daily_7',nm:'7일 연속 도전',ds:'일일 도전 7일 연속',ic:'🔥'},
{id:'daily_30',nm:'30일 연속 도전',ds:'일일 도전 30일 연속',ic:'💎'},
{id:'quiz_75',nm:'역사 박사',ds:'퀴즈 75문 정답 누적',ic:'🎓'},
{id:'wins_30',nm:'백전노장',ds:'30회 전투 승리',ic:'🏅'},
{id:'all_v12',nm:'v12 마스터',ds:'v12 기능 전부 체험',ic:'🌟'}
];

// =============================================
// SECTION 7: ADDITIONAL QUIZ (15문, 60→75)
// =============================================
var QUIZ_V12=[
{q:'환웅이 인간 세상에 내려올 때 함께 가져온 것은?',a:['천부인 3개','비파형동검','팔조법금','고인돌'],c:0},
{q:'부여의 제천행사 &quot;영고&quot;가 열리는 달은?',a:['12월','10월','1월','5월'],c:0},
{q:'동예의 법률 &quot;책화&quot;의 뜻은?',a:['잘못에 대한 배상','전쟁 선포','왕의 명령','세금 부과'],c:0},
{q:'옥저의 장례 풍습 &quot;골장제&quot;에서 하는 것은?',a:['뼈를 가족 목곽에 안치','화장 후 뿌림','높은 곳에 매장','순장'],c:0},
{q:'삼한에서 신성한 구역 &quot;소도&quot;에 세우는 것은?',a:['큰 나무와 방울, 북','돌탑','제단','성벽'],c:0},
{q:'고조선의 세력 범위를 추정하는 토기는?',a:['미송리식토기','빗살무늬토기','검은간토기','채색토기'],c:0},
{q:'위만조선이 독점한 교역 형태는?',a:['중계무역','조공무역','해상무역','실크로드'],c:0},
{q:'한 무제가 고조선 침공 시 보낸 수군의 규모는?',a:['7천','1만','3천','5만'],c:0},
{q:'부여의 특산물로 유명한 것은?',a:['명주와 모피','철기','비단','향료'],c:0},
{q:'진한이 후에 발전한 나라는?',a:['신라','백제','고구려','가야'],c:0},
{q:'변한이 후에 발전한 것은?',a:['가야 연맹','신라','백제','고구려'],c:0},
{q:'고조선 멸망 후 설치된 4개 군의 이름이 아닌 것은?',a:['평양군','낙랑군','진번군','현도군'],c:0},
{q:'환웅과 함께 내려온 3신이 아닌 것은?',a:['뇌신','풍백','우사','운사'],c:0},
{q:'고인돌이 UNESCO 세계유산에 등재된 이유는?',a:['세계 고인돌의 40%가 한반도 집중','가장 오래됨','가장 큼','유일한 유적'],c:0},
{q:'단군신화에서 호랑이가 실패한 이유는?',a:['인내하지 못하고 뛰쳐나감','쑥을 먹지 않음','환웅에게 거부당함','시련이 너무 김'],c:0}
];

// =============================================
// SECTION 8: BATTLE REPLAY SYSTEM
// =============================================
function getBattleLogs(){
try{return JSON.parse(localStorage.getItem('krpg_battle_logs'))||[]}catch(e){return[]}
}
function saveBattleLog(log){
var logs=getBattleLogs();
logs.unshift(log);
if(logs.length>20)logs=logs.slice(0,20);
localStorage.setItem('krpg_battle_logs',JSON.stringify(logs));
}

// =============================================
// SECTION 9: DOM INJECTION
// =============================================
var fmEl=document.createElement('div');fmEl.id='v12-factionmap';
fmEl.setAttribute('role','dialog');fmEl.setAttribute('aria-label','세력도');
document.body.appendChild(fmEl);

var relEl=document.createElement('div');relEl.id='v12-relations';
relEl.setAttribute('role','dialog');relEl.setAttribute('aria-label','인물 관계도');
document.body.appendChild(relEl);

var rpEl=document.createElement('div');rpEl.id='v12-replay';
rpEl.setAttribute('role','dialog');rpEl.setAttribute('aria-label','전투 복기');
document.body.appendChild(rpEl);

var galEl=document.createElement('div');galEl.id='v12-gallery';
galEl.setAttribute('role','dialog');galEl.setAttribute('aria-label','명장면 갤러리');
document.body.appendChild(galEl);

var galViewBg=document.createElement('div');galViewBg.className='v12-overlay-bg';galViewBg.id='v12-gal-bg';
galViewBg.onclick=function(){galViewBg.classList.remove('on');var v=document.querySelector('.gal-view.on');if(v)v.classList.remove('on')};
document.body.appendChild(galViewBg);
var galView=document.createElement('div');galView.className='gal-view';galView.id='v12-gal-view';
document.body.appendChild(galView);

var aowEl=document.createElement('div');aowEl.id='v12-artofwar';
aowEl.setAttribute('role','dialog');aowEl.setAttribute('aria-label','병법서');
document.body.appendChild(aowEl);

var shareEl=document.createElement('div');shareEl.id='v12-share';
shareEl.setAttribute('role','dialog');shareEl.setAttribute('aria-label','공유 카드');
document.body.appendChild(shareEl);

var pracEl=document.createElement('div');pracEl.id='v12-practice';
pracEl.setAttribute('role','dialog');pracEl.setAttribute('aria-label','연습 모드');
document.body.appendChild(pracEl);

// =============================================
// SECTION 10: RENDER - FACTION MAP
// =============================================
function renderFactionMap(){
var cw=480,ch=360;
fmEl.innerHTML='<h2>&#127758; &#49464;&#47141;&#46020;</h2>'+
'<div class="fm-canvas-wrap"><canvas class="fm-canvas" id="fm-cvs" width="'+cw+'" height="'+ch+'"></canvas></div>'+
'<div class="fm-legend" id="fm-legend"></div>'+
'<div class="fm-detail" id="fm-detail"></div>'+
'<button class="v12-close" onclick="document.getElementById(\'v12-factionmap\').classList.remove(\'on\')" aria-label="닫기">닫기</button>';

var cvs=document.getElementById('fm-cvs');
if(!cvs)return;
var ctx=cvs.getContext('2d');

ctx.fillStyle='#0a1428';
ctx.fillRect(0,0,cw,ch);

var grd=ctx.createLinearGradient(0,0,0,ch);
grd.addColorStop(0,'#1a2a3a');grd.addColorStop(.3,'#2a3a2a');grd.addColorStop(.6,'#3a4a2a');grd.addColorStop(1,'#2a3a4a');
ctx.fillStyle=grd;
ctx.beginPath();
ctx.moveTo(80,40);ctx.bezierCurveTo(120,20,200,10,280,30);
ctx.bezierCurveTo(360,50,420,80,440,120);
ctx.bezierCurveTo(460,200,430,260,400,300);
ctx.bezierCurveTo(360,340,300,350,250,340);
ctx.bezierCurveTo(200,330,180,340,160,330);
ctx.bezierCurveTo(120,310,100,280,90,240);
ctx.bezierCurveTo(70,180,60,100,80,40);
ctx.fill();

ctx.fillStyle='#1a3a2a';
ctx.fillRect(0,0,70,ch);
ctx.fillRect(0,0,cw,30);

FACTIONS.forEach(function(f){
var cx=f.x*cw,cy=f.y*ch;
ctx.beginPath();
ctx.arc(cx,cy,f.r,0,Math.PI*2);
ctx.fillStyle=f.color+'44';
ctx.fill();
ctx.strokeStyle=f.color;
ctx.lineWidth=2;
ctx.stroke();

ctx.beginPath();
ctx.arc(cx,cy,3,0,Math.PI*2);
ctx.fillStyle=f.color;
ctx.fill();

ctx.fillStyle='#ffffff';
ctx.font='bold 10px sans-serif';
ctx.textAlign='center';
ctx.fillText(f.nm,cx,cy-f.r-4);
});

FACTION_RELATIONS.forEach(function(r){
var from=FACTIONS.find(function(f){return f.id===r.from});
var to=FACTIONS.find(function(f){return f.id===r.to});
if(!from||!to)return;
ctx.beginPath();
ctx.moveTo(from.x*cw,from.y*ch);
ctx.lineTo(to.x*cw,to.y*ch);
ctx.strokeStyle=r.type==='적대'?'#ff444466':r.type==='우호'?'#44ff4466':r.type==='조공'?'#ffaa4466':r.type==='교역'?'#44aaff66':'#88888844';
ctx.lineWidth=1;
ctx.setLineDash(r.type==='적대'?[4,4]:[]);
ctx.stroke();
ctx.setLineDash([]);
});

ctx.fillStyle='#888';
ctx.font='9px sans-serif';
ctx.textAlign='left';
ctx.fillText('고조선 시대 세력도 (BC 3C~BC 1C)',8,ch-8);

var legend=document.getElementById('fm-legend');
legend.innerHTML=FACTIONS.map(function(f){
return '<span class="fm-leg" style="cursor:pointer" onclick="window._v12.showFaction(\''+f.id+'\')" role="button" tabindex="0"><span class="fm-leg-dot" style="background:'+f.color+'"></span>'+f.nm+'</span>';
}).join('');

cvs.onclick=function(e){
var rect=cvs.getBoundingClientRect();
var sx=cw/rect.width,sy=ch/rect.height;
var mx=(e.clientX-rect.left)*sx,my=(e.clientY-rect.top)*sy;
FACTIONS.forEach(function(f){
var cx=f.x*cw,cy=f.y*ch;
var dist=Math.sqrt((mx-cx)*(mx-cx)+(my-cy)*(my-cy));
if(dist<f.r+10)showFactionDetail(f.id);
});
};
}

function showFactionDetail(id){
var f=FACTIONS.find(function(x){return x.id===id});
if(!f)return;
if(typeof sfx==='function')sfx('faction_select');
var rels=FACTION_RELATIONS.filter(function(r){return r.from===id||r.to===id});
var dt=document.getElementById('fm-detail');
dt.className='fm-detail on';
dt.innerHTML='<h3>'+f.nm+'</h3>'+
'<p>'+f.desc+'</p>'+
'<div class="fm-stats">'+
'<div class="fm-stat"><b>시기</b><br>'+f.era+'</div>'+
'<div class="fm-stat"><b>수도</b><br>'+f.capital+'</div>'+
'<div class="fm-stat"><b>인구</b><br>'+f.pop+'</div>'+
'<div class="fm-stat"><b>군사</b><br>'+f.military+'</div>'+
'</div>'+
(rels.length?'<div style="margin-top:8px"><h4 style="color:#c4956a;font-size:11px;margin-bottom:4px">외교 관계</h4>'+
rels.map(function(r){
var other=r.from===id?FACTIONS.find(function(x){return x.id===r.to}):FACTIONS.find(function(x){return x.id===r.from});
var typeColor=r.type==='적대'?'#f44':r.type==='우호'?'#4f4':r.type==='조공'?'#fa4':r.type==='교역'?'#4af':'#888';
return '<div style="font-size:10px;color:#e8dcc8;padding:3px 0;border-bottom:1px solid #2a2438"><span style="color:'+typeColor+';font-weight:700">['+r.type+']</span> '+(other?other.nm:'')+' &#8212; '+r.desc+'</div>';
}).join('')+'</div>':'');

trackV12('faction_viewed',id);
}

// =============================================
// SECTION 11: RENDER - RELATIONS MAP
// =============================================
function renderRelations(){
var cw=480,ch=400;
relEl.innerHTML='<h2>&#128101; &#51064;&#47932; &#44288;&#44228;&#46020;</h2>'+
'<div class="rel-canvas-wrap"><canvas class="rel-canvas" id="rel-cvs" width="'+cw+'" height="'+ch+'"></canvas></div>'+
'<div class="rel-info">&#127760; &#51064;&#47932; &#44036; &#44288;&#44228;&#47484; &#49884;&#44033;&#51201;&#51004;&#47196; &#54364;&#49884;&#54633;&#45768;&#45796;. &#49440; &#49353;&#49345;: <span style="color:#FFD700">&#44552;&#49353;</span>=&#48512;&#51088;, <span style="color:#ff6699">&#48516;&#54861;</span>=&#48512;&#48512;, <span style="color:#88aaff">&#54028;&#47004;</span>=&#49888;&#54616;, <span style="color:#ff4444">&#51201;&#45824;</span>=&#51201;, <span style="color:#44ff44">&#50864;&#54840;</span>=&#46041;&#47566;</div>'+
'<button class="v12-close" onclick="document.getElementById(\'v12-relations\').classList.remove(\'on\')" aria-label="닫기">닫기</button>';

var cvs=document.getElementById('rel-cvs');
if(!cvs)return;
var ctx=cvs.getContext('2d');
ctx.fillStyle='#0a0a14';
ctx.fillRect(0,0,cw,ch);

var chars=[
{nm:'환인',x:.5,y:.06,ic:'👴',tier:'천제'},
{nm:'환웅',x:.5,y:.2,ic:'👑',tier:'SSR'},
{nm:'풍백',x:.25,y:.2,ic:'🌬️',tier:'SR'},
{nm:'우사',x:.75,y:.2,ic:'🌧️',tier:'SR'},
{nm:'운사',x:.5,y:.33,ic:'☁️',tier:'SR'},
{nm:'웅녀',x:.7,y:.36,ic:'🌸',tier:'SSR'},
{nm:'단군왕검',x:.5,y:.5,ic:'🏛️',tier:'SSR'},
{nm:'위만',x:.2,y:.55,ic:'🏯',tier:'SR'},
{nm:'준왕',x:.2,y:.7,ic:'👑',tier:'SR'},
{nm:'성기장군',x:.35,y:.65,ic:'⚔️',tier:'SR'},
{nm:'부여왕',x:.75,y:.55,ic:'👑',tier:'SSR'},
{nm:'삼한족장',x:.65,y:.75,ic:'🗿',tier:'SR'},
{nm:'우거왕',x:.2,y:.85,ic:'💀',tier:'R'}
];

var links=[
{from:0,to:1,type:'부자',color:'#FFD700'},
{from:1,to:5,type:'부부',color:'#ff6699'},
{from:1,to:2,type:'신하',color:'#88aaff'},
{from:1,to:3,type:'신하',color:'#88aaff'},
{from:1,to:4,type:'신하',color:'#88aaff'},
{from:1,to:6,type:'부자',color:'#FFD700'},
{from:5,to:6,type:'모자',color:'#FFD700'},
{from:6,to:7,type:'적대',color:'#ff4444'},
{from:7,to:8,type:'적대',color:'#ff4444'},
{from:7,to:9,type:'주종',color:'#88aaff'},
{from:8,to:11,type:'동맹',color:'#44ff44'},
{from:10,to:6,type:'우호',color:'#44ff44'},
{from:7,to:12,type:'조손',color:'#FFD700'},
{from:9,to:12,type:'충성',color:'#88aaff'}
];

links.forEach(function(l){
var a=chars[l.from],b=chars[l.to];
ctx.beginPath();
ctx.moveTo(a.x*cw,a.y*ch);
ctx.lineTo(b.x*cw,b.y*ch);
ctx.strokeStyle=l.color+'88';
ctx.lineWidth=1.5;
ctx.stroke();

var mx=(a.x+b.x)/2*cw,my=(a.y+b.y)/2*ch;
ctx.fillStyle=l.color;
ctx.font='8px sans-serif';
ctx.textAlign='center';
ctx.fillText(l.type,mx,my-3);
});

chars.forEach(function(c){
var cx=c.x*cw,cy=c.y*ch;
ctx.beginPath();
ctx.arc(cx,cy,16,0,Math.PI*2);
ctx.fillStyle='#1a1428';
ctx.fill();
ctx.strokeStyle=c.tier==='SSR'?'#FFD700':c.tier==='SR'?'#aa88ff':'#888';
ctx.lineWidth=2;
ctx.stroke();

ctx.font='16px serif';
ctx.textAlign='center';
ctx.textBaseline='middle';
ctx.fillText(c.ic,cx,cy);

ctx.fillStyle='#e8dcc8';
ctx.font='bold 9px sans-serif';
ctx.textBaseline='top';
ctx.fillText(c.nm,cx,cy+18);
});

trackV12('relations_viewed',true);
}

// =============================================
// SECTION 12: RENDER - BATTLE REPLAY
// =============================================
function renderReplay(){
var logs=getBattleLogs();
rpEl.innerHTML='<h2>&#128260; &#51204;&#53804; &#48373;&#44592;</h2>'+
(logs.length===0?'<div class="rp-empty">&#9876;&#65039; &#51204;&#53804; &#44592;&#47197;&#51060; &#50630;&#49845;&#45768;&#45796;.<br>&#51204;&#53804;&#50640;&#49436; &#49849;&#47532;&#54616;&#47732; &#51088;&#46041;&#51004;&#47196; &#44592;&#47197;&#46121;&#45768;&#45796;.</div>':
'<div class="rp-list">'+logs.map(function(l,i){
return '<div class="rp-entry" onclick="window._v12.showReplayDetail('+i+')" role="button" tabindex="0">'+
'<h4>'+l.title+'</h4>'+
'<p>'+l.date+' &middot; '+l.turns+'턴 &middot; 아군 '+(l.allyCount||'?')+'명 vs 적 '+(l.enemyCount||'?')+'명</p>'+
'<div class="rp-result '+(l.result==='win'?'rp-win':'rp-loss')+'">'+(l.result==='win'?'&#9989; 승리':'&#10060; 패배')+'</div>'+
'</div>';
}).join('')+'</div>')+
'<div class="rp-detail" id="rp-detail-view"></div>'+
'<button class="v12-close" onclick="document.getElementById(\'v12-replay\').classList.remove(\'on\')" aria-label="닫기">닫기</button>';
}

function showReplayDetail(idx){
var logs=getBattleLogs();
if(idx>=logs.length)return;
var log=logs[idx];
if(typeof sfx==='function')sfx('replay_view');
var dt=document.getElementById('rp-detail-view');
dt.className='rp-detail on';
dt.innerHTML='<h3>'+log.title+'</h3>'+
(log.actions&&log.actions.length?log.actions.map(function(a){
return '<div class="rp-turn">턴 '+a.turn+': <span class="rp-actor">'+a.actor+'</span>이(가) '+a.target+'에게 '+(a.type==='atk'?'<span class="rp-dmg">'+a.value+' 피해</span>':a.type==='heal'?'<span class="rp-heal">'+a.value+' 회복</span>':a.desc||'행동')+'</div>';
}).join(''):'<div style="text-align:center;color:#8a7a6a;padding:20px">상세 기록 없음</div>')+
'<button class="v12-close" onclick="document.getElementById(\'rp-detail-view\').className=\'rp-detail\'" aria-label="닫기">닫기</button>';

trackV12('replay_viewed',idx);
}

// =============================================
// SECTION 13: RENDER - SCENE GALLERY
// =============================================
function renderGallery(){
var unlocked=getUnlockedScenes();
galEl.innerHTML='<h2>&#127912; &#47749;&#51109;&#47732; &#44040;&#47084;&#47532;</h2>'+
'<div style="text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px">&#128275; '+unlocked.length+' / '+SCENES.length+' &#54644;&#44552;</div>'+
'<div class="gal-grid">'+SCENES.map(function(s){
var isUnlocked=unlocked.indexOf(s.id)>=0;
return '<div class="gal-card'+(isUnlocked?'':' locked')+'" onclick="'+(isUnlocked?'window._v12.showScene(\''+s.id+'\')':'')+'" role="button" tabindex="0" aria-label="'+(isUnlocked?s.nm+' 보기':s.nm+' (잠김)')+'">'+
'<div class="gal-icon">'+(isUnlocked?s.ic:'&#128274;')+'</div>'+
'<div class="gal-title">'+(isUnlocked?s.nm:'???')+'</div>'+
'<div class="gal-desc">'+(isUnlocked?s.desc:'챕터 '+s.ch+'을 진행하면 해금됩니다')+'</div>'+
'</div>';
}).join('')+'</div>'+
'<button class="v12-close" onclick="document.getElementById(\'v12-gallery\').classList.remove(\'on\')" aria-label="닫기">닫기</button>';
}

function getUnlockedScenes(){
try{return JSON.parse(localStorage.getItem('krpg_scenes'))||['s01','s02','s03']}catch(e){return['s01','s02','s03']}
}

function unlockScene(id){
var scenes=getUnlockedScenes();
if(scenes.indexOf(id)<0){scenes.push(id);localStorage.setItem('krpg_scenes',JSON.stringify(scenes))}
}

function showScene(id){
var s=SCENES.find(function(x){return x.id===id});
if(!s)return;
if(typeof sfx==='function')sfx('scene_view');
galView.innerHTML='<h3>'+s.ic+' '+s.nm+'</h3>'+
'<div class="gal-body">'+s.full+'</div>'+
'<div style="font-size:9px;color:#8a7a6a;margin-top:8px;text-align:center">&#128218; &#52285;&#53552; '+s.ch+'</div>'+
'<button class="v12-close" onclick="document.getElementById(\'v12-gal-view\').classList.remove(\'on\');document.getElementById(\'v12-gal-bg\').classList.remove(\'on\')" aria-label="닫기">닫기</button>';
galView.classList.add('on');
galViewBg.classList.add('on');

trackV12('scene_viewed',id);
}

// =============================================
// SECTION 14: RENDER - ART OF WAR
// =============================================
function renderArtOfWar(cat){
var curCat=cat||'기본 전술';
var cats=Object.keys(AOW_DATA);
var items=AOW_DATA[curCat]||[];
aowEl.innerHTML='<h2>&#128220; &#48337;&#48277;&#49436;</h2>'+
'<div class="aow-tabs">'+cats.map(function(c){
return '<button class="aow-tab'+(c===curCat?' active':'')+'" onclick="window._v12.renderAoW(\''+c+'\')">'+c+' ('+AOW_DATA[c].length+')</button>';
}).join('')+'</div>'+
'<div class="aow-content">'+items.map(function(item){
return '<div class="aow-card">'+
'<h3>'+item.nm+'</h3>'+
'<p>'+item.body+'</p>'+
'<div class="aow-example">&#128161; &#50696;&#49884;: '+item.ex+'</div>'+
'</div>';
}).join('')+'</div>'+
'<button class="v12-close" onclick="document.getElementById(\'v12-artofwar\').classList.remove(\'on\')" aria-label="닫기">닫기</button>';

trackV12('aow_viewed',curCat);
}

// =============================================
// SECTION 15: RENDER - SHARE CARD
// =============================================
function renderShareCard(){
var st=loadStats();
var ach=loadAch();
var scenes=getUnlockedScenes();
var daily=getDailyState12();

shareEl.innerHTML='<h2>&#128228; &#44277;&#50976; &#52852;&#46300;</h2>'+
'<div class="share-canvas-wrap"><canvas class="share-canvas" id="share-cvs" width="600" height="380"></canvas></div>'+
'<div class="share-btns">'+
'<button class="share-btn" onclick="window._v12.downloadCard()">&#128190; &#45796;&#50868;&#47196;&#46300;</button>'+
'<button class="share-btn" onclick="window._v12.copyCard()">&#128203; &#48373;&#49324;</button>'+
'</div>'+
'<button class="v12-close" onclick="document.getElementById(\'v12-share\').classList.remove(\'on\')" aria-label="닫기">닫기</button>';

var cvs=document.getElementById('share-cvs');
if(!cvs)return;
var ctx=cvs.getContext('2d');

var grd=ctx.createLinearGradient(0,0,600,380);
grd.addColorStop(0,'#1a0a2a');grd.addColorStop(.5,'#2a1a0a');grd.addColorStop(1,'#0a1a2a');
ctx.fillStyle=grd;
ctx.fillRect(0,0,600,380);

ctx.strokeStyle='#c4956a44';
ctx.lineWidth=2;
ctx.strokeRect(8,8,584,364);

ctx.fillStyle='#FFD700';
ctx.font='bold 28px sans-serif';
ctx.textAlign='center';
ctx.fillText('한국사 영웅전',300,50);

ctx.fillStyle='#c4956a';
ctx.font='12px sans-serif';
ctx.fillText('v12.0 — 택티컬 전략 RPG',300,72);

ctx.fillStyle='#c4956a33';
ctx.fillRect(40,90,520,1);

var stats=[
{label:'전투 승리',value:(st.wins||0)+'회',ic:'⚔️'},
{label:'퀴즈 정답',value:(st.quizOk||0)+'문',ic:'📚'},
{label:'업적 달성',value:(ach.length||0)+'/36',ic:'🏆'},
{label:'명장면',value:scenes.length+'/'+SCENES.length,ic:'🎬'},
{label:'일일 연속',value:(daily.streak||0)+'일',ic:'🔥'},
{label:'총 턴',value:(st.turns||0)+'턴',ic:'⏱️'}
];

stats.forEach(function(s,i){
var col=i%3,row=Math.floor(i/3);
var x=60+col*190,y=110+row*90;
ctx.fillStyle='#1a142866';
ctx.fillRect(x,y,170,70);
ctx.strokeStyle='#3a3a4a';
ctx.lineWidth=1;
ctx.strokeRect(x,y,170,70);

ctx.font='20px serif';
ctx.textAlign='center';
ctx.fillStyle='#FFD700';
ctx.fillText(s.ic,x+30,y+38);

ctx.font='bold 22px sans-serif';
ctx.fillStyle='#e8dcc8';
ctx.textAlign='left';
ctx.fillText(s.value,x+55,y+35);

ctx.font='10px sans-serif';
ctx.fillStyle='#8a7a6a';
ctx.fillText(s.label,x+55,y+52);
});

var d=new Date();
ctx.fillStyle='#5a5a6a';
ctx.font='9px sans-serif';
ctx.textAlign='center';
ctx.fillText('PRIME Holdings © 2026 | '+d.getFullYear()+'-'+(''+(d.getMonth()+1)).padStart(2,'0')+'-'+(''+ d.getDate()).padStart(2,'0'),300,360);

trackV12('share_generated',true);
}

function downloadCard(){
var cvs=document.getElementById('share-cvs');
if(!cvs)return;
var link=document.createElement('a');
link.download='한국사영웅전_v12.png';
link.href=cvs.toDataURL('image/png');
link.click();
}

function copyCard(){
var cvs=document.getElementById('share-cvs');
if(!cvs)return;
cvs.toBlob(function(blob){
if(navigator.clipboard&&navigator.clipboard.write){
navigator.clipboard.write([new ClipboardItem({'image/png':blob})]).then(function(){
showV12Toast('클립보드에 복사됨');
});
}else{
showV12Toast('이 브라우저에서는 다운로드를 이용하세요');
}
});
}

// =============================================
// SECTION 16: RENDER - PRACTICE MODE
// =============================================
function renderPractice(){
pracEl.innerHTML='<h2>&#128175; &#50672;&#49845; &#47784;&#46300;</h2>'+
'<div style="text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px">&#44592;&#48376; &#51204;&#53804; &#44592;&#49696;&#51012; &#50672;&#49845;&#54624; &#49688; &#51080;&#45716; &#47784;&#51032; &#51204;&#53804;&#51077;&#45768;&#45796;</div>'+
'<div class="prac-grid">'+PRACTICE_MODES.map(function(p){
var diffLabel=p.diff==='easy'?'초급':p.diff==='normal'?'중급':'고급';
var diffClass=p.diff==='easy'?'prac-easy':p.diff==='normal'?'prac-normal':'prac-hard';
return '<div class="prac-card" onclick="window._v12.startPractice(\''+p.id+'\')" role="button" tabindex="0">'+
'<h4>'+p.nm+'</h4>'+
'<p>'+p.desc+'</p>'+
'<span class="prac-diff '+diffClass+'">'+diffLabel+' &middot; 적 '+p.enemies+'명 &middot; '+p.turns+'턴</span>'+
'</div>';
}).join('')+'</div>'+
'<button class="v12-close" onclick="document.getElementById(\'v12-practice\').classList.remove(\'on\')" aria-label="닫기">닫기</button>';
}

function startPractice(id){
var mode=PRACTICE_MODES.find(function(p){return p.id===id});
if(!mode)return;
showV12Toast(mode.nm+' 시작! ('+mode.turns+'턴 제한)');
trackV12('practice_started',id);
pracEl.classList.remove('on');
}

// =============================================
// SECTION 17: TRACKING / STATE
// =============================================
function getV12State(){
try{return JSON.parse(localStorage.getItem('krpg_v12'))||{}}catch(e){return{}}
}
function saveV12State(s){localStorage.setItem('krpg_v12',JSON.stringify(s))}

function trackV12(key,val){
var s=getV12State();
if(!s.tracked)s.tracked={};
s.tracked[key]=val;
saveV12State(s);
checkV12Ach();
}

function getDailyState12(){
try{return JSON.parse(localStorage.getItem('krpg_daily'))||{}}catch(e){return{}}
}
function loadStats(){
try{return JSON.parse(localStorage.getItem('krpg_stats'))||{}}catch(e){return{}}
}
function loadAch(){
try{return JSON.parse(localStorage.getItem('krpg_ach'))||[]}catch(e){return[]}
}

// =============================================
// SECTION 18: V12 ACHIEVEMENT CHECK
// =============================================
function checkV12Ach(){
var s=getV12State();
var t=s.tracked||{};
var ach=loadAch();
var daily=getDailyState12();
var stats=loadStats();
var scenes=getUnlockedScenes();
var changed=false;

var checks={
faction_explorer:FACTIONS.every(function(f){return t['faction_viewed_'+f.id]||t.faction_viewed===f.id}),
scene_collector:scenes.length>=5,
art_reader:t.aow_viewed&&Object.keys(AOW_DATA).every(function(k){return t['aow_viewed']===k||t['aow_cat_'+k]}),
replay_reviewer:(t.replay_count||0)>=3,
share_first:!!t.share_generated,
relations_viewer:!!t.relations_viewed,
practice_clear:!!t.practice_started,
daily_7:(daily.streak||0)>=7,
daily_30:(daily.streak||0)>=30,
quiz_75:(stats.quizOk||0)>=75,
wins_30:(stats.wins||0)>=30,
all_v12:!!t.share_generated&&!!t.relations_viewed&&!!t.faction_viewed&&scenes.length>=5
};

ACH_V12.forEach(function(a){
if(ach.indexOf(a.id)<0&&checks[a.id]){
ach.push(a.id);
changed=true;
showV12AchToast(a);
}
});

if(changed)localStorage.setItem('krpg_ach',JSON.stringify(ach));
}

function showV12AchToast(a){
if(typeof sfx==='function')sfx('achievement_v12');
var t=document.createElement('div');
t.style.cssText='position:fixed;top:60px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,rgba(255,215,0,.15),rgba(196,149,106,.15));border:2px solid #FFD700;border-radius:12px;padding:12px 20px;z-index:200;text-align:center;min-width:220px;backdrop-filter:blur(8px);pointer-events:none;animation:achSlide .5s ease';
t.innerHTML='<div style="font-size:28px">'+a.ic+'</div><div style="font-size:11px;color:#FFD700;font-weight:700">업적 달성!</div><div style="font-size:14px;color:#e8dcc8;font-weight:700">'+a.nm+'</div><div style="font-size:9px;color:#8a7a6a">'+a.ds+'</div>';
document.body.appendChild(t);
setTimeout(function(){t.style.transition='opacity .5s';t.style.opacity='0';setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t)},600)},3000);
}

function showV12Toast(msg){
var t=document.createElement('div');
t.style.cssText='position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(26,20,40,.95);border:1px solid #c4956a;border-radius:8px;padding:8px 20px;z-index:200;font-size:12px;color:#e8dcc8;pointer-events:none;animation:achSlide .5s ease';
t.textContent=msg;
document.body.appendChild(t);
setTimeout(function(){t.style.transition='opacity .5s';t.style.opacity='0';setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t)},600)},2000);
}

// =============================================
// SECTION 19: MENU BUTTON INJECTION
// =============================================
var mnu=document.getElementById('menu-overlay');
if(mnu){
var v12btns=[
{txt:'&#127758; 세력도',fn:function(){mnu.classList.remove('on');renderFactionMap();fmEl.classList.add('on')}},
{txt:'&#128101; 관계도',fn:function(){mnu.classList.remove('on');renderRelations();relEl.classList.add('on')}},
{txt:'&#128260; 전투 복기',fn:function(){mnu.classList.remove('on');renderReplay();rpEl.classList.add('on')}},
{txt:'&#127912; 명장면',fn:function(){mnu.classList.remove('on');renderGallery();galEl.classList.add('on')}},
{txt:'&#128220; 병법서',fn:function(){mnu.classList.remove('on');renderArtOfWar();aowEl.classList.add('on')}},
{txt:'&#128228; 공유 카드',fn:function(){mnu.classList.remove('on');renderShareCard();shareEl.classList.add('on')}},
{txt:'&#128175; 연습 모드',fn:function(){mnu.classList.remove('on');renderPractice();pracEl.classList.add('on')}}
];
var closeBtn=mnu.querySelector('.menu-btn:last-child');
v12btns.forEach(function(b){
var btn=document.createElement('button');btn.className='menu-btn';btn.innerHTML=b.txt;
btn.onclick=b.fn;
if(closeBtn)mnu.insertBefore(btn,closeBtn);
else mnu.appendChild(btn);
});
}

// =============================================
// SECTION 20: KEYBOARD SHORTCUTS
// =============================================
document.addEventListener('keydown',function(ev){
if(ev.target.tagName==='INPUT'||ev.target.tagName==='TEXTAREA')return;
var key=ev.key.toLowerCase();
if(ev.ctrlKey||ev.altKey||ev.metaKey)return;

if(key==='f'){
if(fmEl.classList.contains('on')){fmEl.classList.remove('on');return}
renderFactionMap();fmEl.classList.add('on');
if(typeof sfx==='function')sfx('menu');
ev.preventDefault();
}
if(key==='r'){
if(relEl.classList.contains('on')){relEl.classList.remove('on');return}
renderRelations();relEl.classList.add('on');
if(typeof sfx==='function')sfx('menu');
ev.preventDefault();
}
if(key==='b'){
if(rpEl.classList.contains('on')){rpEl.classList.remove('on');return}
renderReplay();rpEl.classList.add('on');
if(typeof sfx==='function')sfx('menu');
ev.preventDefault();
}
if(key==='p'){
if(pracEl.classList.contains('on')){pracEl.classList.remove('on');return}
renderPractice();pracEl.classList.add('on');
if(typeof sfx==='function')sfx('menu');
ev.preventDefault();
}
});

// =============================================
// SECTION 21: ADDITIONAL SFX (6종)
// =============================================
if(typeof window.sfx==='function'&&typeof ac!=='undefined'){
var _sfx12=window.sfx;
window.sfx=function(t){
if(t==='faction_select'&&ac&&typeof pn==='function'){
pn(294,.1,'sine');setTimeout(function(){pn(370,.1,'sine')},80);setTimeout(function(){pn(440,.15,'sine')},160);return;
}
if(t==='scene_view'&&ac&&typeof pn==='function'){
[262,330,392,523,659].forEach(function(f,i){setTimeout(function(){pn(f,.12,'sine')},i*120)});return;
}
if(t==='replay_view'&&ac&&typeof pn==='function'){
pn(330,.1,'triangle');setTimeout(function(){pn(440,.1,'triangle')},100);return;
}
if(t==='achievement_v12'&&ac&&typeof pn==='function'){
[392,494,587,784,987].forEach(function(f,i){setTimeout(function(){pn(f,.18,'sine')},i*70)});return;
}
if(t==='share_card'&&ac&&typeof pn==='function'){
pn(523,.1,'sine');pn(659,.1,'sine');pn(784,.1,'sine');return;
}
if(t==='practice_start'&&ac&&typeof pn==='function'){
[262,330,392,523].forEach(function(f,i){setTimeout(function(){pn(f,.15,'square')},i*60)});return;
}
_sfx12(t);
};
}

// =============================================
// SECTION 22: QUIZ INJECTION (15문)
// =============================================
if(typeof QUIZZES!=='undefined'){
QUIZ_V12.forEach(function(q){QUIZZES.push(q)});
}

// =============================================
// SECTION 23: BATTLE LOG HOOK
// =============================================
if(typeof window.onVictoryContinue==='function'){
var _vc12=window.onVictoryContinue;
window.onVictoryContinue=function(){
try{
var log={
title:(typeof G!=='undefined'&&G.chapter?'챕터 '+G.chapter:'전투')+' 승리',
date:new Date().toISOString().slice(0,10),
result:'win',
turns:(typeof G!=='undefined'&&G.tac?G.tac.turnCount||0:0),
allyCount:(typeof G!=='undefined'&&G.tac&&G.tac.allies?G.tac.allies.length:0),
enemyCount:(typeof G!=='undefined'&&G.tac&&G.tac.enemies?G.tac.enemies.length:0),
actions:[]
};
saveBattleLog(log);
}catch(e){}
_vc12.apply(this,arguments);
};
}

// =============================================
// SECTION 24: V12 ACHIEVEMENT REGISTRATION
// =============================================
if(typeof window._v10!=='undefined'){
ACH_V12.forEach(function(a){
if(window._v10.achDefs){window._v10.achDefs.push(a)}
});
}

// =============================================
// SECTION 25: SCENE UNLOCK HOOKS
// =============================================
function hookSceneUnlocks(){
var origChapter=null;
if(typeof G!=='undefined'){
var checkInterval=setInterval(function(){
if(typeof G==='undefined')return;
var ch=G.chapter||1;
if(ch!==origChapter){
origChapter=ch;
if(ch>=1){unlockScene('s01');unlockScene('s02')}
if(ch>=2){unlockScene('s03');unlockScene('s04')}
if(ch>=3){unlockScene('s05');unlockScene('s06')}
if(ch>=4){unlockScene('s07');unlockScene('s08')}
}
},5000);
}
}
setTimeout(hookSceneUnlocks,3000);

// =============================================
// SECTION 26: EXPORTS
// =============================================
window._v12={
renderFactionMap:renderFactionMap,
showFaction:showFactionDetail,
renderRelations:renderRelations,
renderReplay:renderReplay,
showReplayDetail:showReplayDetail,
renderGallery:renderGallery,
showScene:showScene,
renderAoW:renderArtOfWar,
renderShareCard:renderShareCard,
downloadCard:downloadCard,
copyCard:copyCard,
renderPractice:renderPractice,
startPractice:startPractice,
saveBattleLog:saveBattleLog,
unlockScene:unlockScene,
factions:FACTIONS,
relations:FACTION_RELATIONS,
scenes:SCENES,
aowData:AOW_DATA,
practiceModes:PRACTICE_MODES,
achV12:ACH_V12,
quizV12:QUIZ_V12
};

})();
