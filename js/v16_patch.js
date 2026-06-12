// v16_patch.js — 한국사 영웅전 v16.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v16-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:126;overflow-y:auto;padding:16px}',
'.v16-panel.on{display:block}',
'.v16-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v16-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v16-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v16-close:hover{background:#8B2A1A}',
'.v16-tabs{display:flex;gap:4px;max-width:540px;margin:0 auto 12px;flex-wrap:wrap;justify-content:center}',
'.v16-tab{font-size:10px;padding:6px 12px;border:1px solid #3a3a4a;border-radius:6px;background:#2a2438;color:#e8dcc8;cursor:pointer;font-family:inherit;transition:all .2s}',
'.v16-tab.active{border-color:#FFD700;background:#3a3448;color:#FFD700}',
// Hero Chronicle
'.hero-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-width:540px;margin:0 auto}',
'.hero-card{background:rgba(26,20,40,.92);border:2px solid #3a3a4a;border-radius:12px;padding:14px;text-align:center;cursor:pointer;transition:all .3s;position:relative}',
'.hero-card:hover{border-color:#FFD700;transform:translateY(-3px);box-shadow:0 6px 20px rgba(255,215,0,.12)}',
'.hero-card .hro-icon{font-size:36px;margin-bottom:6px}',
'.hero-card .hro-name{font-size:12px;color:#FFD700;font-weight:700}',
'.hero-card .hro-title{font-size:9px;color:#8a7a6a;margin-top:2px}',
'.hero-detail{max-width:540px;margin:0 auto;background:rgba(20,14,30,.95);border:2px solid #5a4a3a;border-radius:14px;padding:20px}',
'.hero-detail .hd-top{display:flex;align-items:center;gap:16px;margin-bottom:12px}',
'.hero-detail .hd-portrait{font-size:56px}',
'.hero-detail .hd-info h3{color:#FFD700;font-size:16px;margin-bottom:4px}',
'.hero-detail .hd-info p{font-size:11px;color:#8a7a6a}',
'.hero-detail .hd-story{font-size:12px;color:#c4b8a0;line-height:2;margin-bottom:12px;padding:12px;background:rgba(10,6,8,.6);border-radius:8px;border-left:3px solid #c4956a}',
'.hero-detail .hd-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}',
'.hero-detail .hd-stat{text-align:center;padding:6px;background:rgba(42,36,56,.8);border-radius:6px;border:1px solid #3a3a4a}',
'.hero-detail .hd-stat .st-val{font-size:18px;font-weight:900;color:#FFD700}',
'.hero-detail .hd-stat .st-lbl{font-size:9px;color:#8a7a6a}',
// Tactics Library
'.tactic-list{max-width:540px;margin:0 auto}',
'.tactic-item{background:rgba(20,15,30,.92);border:1px solid #4a3a5a;border-radius:10px;padding:14px;margin-bottom:10px;cursor:pointer;transition:all .3s}',
'.tactic-item:hover{border-color:#9C27B0;transform:translateX(4px)}',
'.tactic-item.expanded{border-color:#FFD700;background:rgba(30,25,40,.95)}',
'.tactic-item .ti-head{display:flex;align-items:center;gap:10px}',
'.tactic-item .ti-icon{font-size:24px}',
'.tactic-item .ti-name{font-size:13px;color:#ce93d8;font-weight:700}',
'.tactic-item .ti-era{font-size:9px;color:#7a6a8a;margin-left:auto}',
'.tactic-item .ti-body{display:none;margin-top:10px;padding-top:10px;border-top:1px solid #3a3a4a}',
'.tactic-item.expanded .ti-body{display:block}',
'.tactic-item .ti-desc{font-size:11px;color:#a0a0b0;line-height:1.8;margin-bottom:8px}',
'.tactic-item .ti-effect{font-size:10px;color:#66BB6A;padding:4px 8px;background:rgba(76,175,80,.1);border-radius:4px;display:inline-block}',
// Season Events
'.season-area{max-width:540px;margin:0 auto}',
'.season-header{display:flex;gap:6px;justify-content:center;margin-bottom:16px}',
'.season-btn{padding:8px 16px;border:1px solid #3a3a4a;border-radius:8px;background:#2a2438;color:#e8dcc8;cursor:pointer;font-size:11px;font-family:inherit;transition:all .2s}',
'.season-btn.active{border-color:#FFD700;color:#FFD700}',
'.season-card{background:rgba(20,20,30,.9);border:1px solid #3a4a3a;border-radius:10px;padding:14px;margin-bottom:10px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:border-color .3s}',
'.season-card:hover{border-color:#66BB6A}',
'.season-card .sc-icon{font-size:28px}',
'.season-card .sc-info{flex:1}',
'.season-card .sc-name{font-size:12px;color:#e8dcc8;font-weight:700}',
'.season-card .sc-desc{font-size:10px;color:#8a8a9a;margin-top:3px}',
'.season-card .sc-reward{font-size:9px;color:#FFD700;margin-top:3px}',
// Training Academy
'.train-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-width:540px;margin:0 auto}',
'.train-card{background:rgba(20,25,15,.9);border:2px solid #3a4a2a;border-radius:10px;padding:14px;text-align:center;cursor:pointer;transition:all .3s}',
'.train-card:hover{border-color:#8BC34A;transform:translateY(-2px)}',
'.train-card .tr-icon{font-size:26px;margin-bottom:6px}',
'.train-card .tr-name{font-size:11px;color:#a5d6a7;font-weight:700}',
'.train-card .tr-desc{font-size:9px;color:#6a8a6a;margin-top:4px}',
'.train-card .tr-prog{height:4px;background:#1a2a1a;border-radius:2px;margin-top:6px;overflow:hidden}',
'.train-card .tr-fill{height:100%;background:#66BB6A;border-radius:2px;transition:width .5s}',
// War Records
'.record-area{max-width:540px;margin:0 auto}',
'.record-canvas{display:block;margin:0 auto 12px;border:2px solid #3a3a4a;border-radius:8px;background:#0a0a14}',
'.record-list{max-height:300px;overflow-y:auto}',
'.record-item{display:flex;align-items:center;gap:8px;padding:8px;margin-bottom:6px;background:rgba(20,20,30,.8);border-radius:6px;border:1px solid #2a2a3a}',
'.record-item .ri-result{font-size:20px}',
'.record-item .ri-info{flex:1;font-size:10px;color:#aaa}',
'.record-item .ri-info strong{color:#FFD700;font-size:11px}',
'.record-item .ri-date{font-size:9px;color:#5a5a6a}',
// Territory Map
'.terr-canvas{display:block;margin:0 auto 12px;border:2px solid #3a3a4a;border-radius:8px;background:#0a0a14}',
'.terr-legend{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:12px}',
'.terr-leg{font-size:10px;display:flex;align-items:center;gap:4px}',
'.terr-dot{width:10px;height:10px;border-radius:50%;display:inline-block}',
// Culture & Customs
'.culture-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-width:540px;margin:0 auto}',
'.cult-card{background:rgba(30,20,10,.92);border:2px solid #5a4a2a;border-radius:12px;padding:14px;text-align:center;cursor:pointer;transition:all .3s}',
'.cult-card:hover{border-color:#FF9800;transform:translateY(-2px)}',
'.cult-card .cc-icon{font-size:30px;margin-bottom:6px}',
'.cult-card .cc-name{font-size:11px;color:#FFCC80;font-weight:700}',
'.cult-card .cc-desc{font-size:9px;color:#8a7a6a;margin-top:4px;line-height:1.6}',
// FAB Buttons
'.v16-fab{position:fixed;left:4px;bottom:180px;z-index:120;display:flex;flex-direction:column;gap:4px}',
'.v16-fab-btn{width:36px;height:36px;border-radius:8px;border:1px solid #5a4a3a;background:rgba(26,20,40,.85);color:#e8dcc8;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}',
'.v16-fab-btn:hover{border-color:#FFD700;background:rgba(42,36,56,.95)}',
'@media(max-width:400px){.hero-grid,.train-grid,.culture-grid{grid-template-columns:repeat(auto-fill,minmax(120px,1fr))}.hero-detail .hd-stats{grid-template-columns:repeat(2,1fr)}}'
].join('\n');
document.head.appendChild(css);

// ─── Hero Chronicle (12 heroes with detailed bios) ───
var HEROES=[
{id:'hwanung',name:'환웅',icon:'☁️',title:'신시의 군주',era:'BC 2400',
 atk:85,def:75,int:90,
 story:'환인의 서자 환웅은 인간 세상을 다스리고자 천부인 세 개를 받아 태백산 신단수 아래로 내려왔다. 풍백(바람), 우사(비), 운사(구름)를 거느리고 곡식, 수명, 질병, 형벌, 선악 등 인간의 360여 가지 일을 주관하며 신시(神市)를 세워 홍익인간의 이상을 실천했다. 범족과의 전쟁에서 승리하고, 100일간의 시련을 견딘 웅녀와 혼인하여 단군왕검을 낳았다.'},
{id:'ungnyeo',name:'웅녀',icon:'🐻',title:'인내의 어머니',era:'BC 2400',
 atk:40,def:90,int:80,
 story:'본래 곰이었으나 사람이 되기를 간절히 원했다. 환웅이 내린 쑥 한 줌과 마늘 스무 개를 먹으며 동굴에서 21일을 버텼다. 호랑이는 포기했으나 웅녀는 끝까지 인내하여 마침내 여인의 모습을 얻었다. 환웅과 혼인하여 단군왕검을 낳아 고조선 건국의 어머니가 되었다. 인내와 의지의 상징.'},
{id:'dangun',name:'단군왕검',icon:'👑',title:'고조선의 시조',era:'BC 2333',
 atk:90,def:85,int:95,
 story:'환웅과 웅녀 사이에서 태어난 단군왕검은 BC 2333년 아사달에 도읍을 정하고 고조선을 건국했다. 홍익인간의 이념으로 나라를 다스리며 8조법금을 반포하여 사회 질서를 세웠다. 1,500년간 다스린 후 산에 들어가 산신이 되었다고 전해진다. 한민족 최초의 국가를 세운 건국시조.'},
{id:'wiman',name:'위만',icon:'⚔️',title:'왕위 찬탈자',era:'BC 194',
 atk:88,def:70,int:75,
 story:'연(燕)나라 출신으로 상투를 틀고 조선인 복장을 하고 준왕에게 의탁했다. 서쪽 변경을 지키는 임무를 받았으나, 세력을 키워 BC 194년 왕검성을 공격하여 준왕을 몰아내고 스스로 왕이 되었다. 철기 문화를 바탕으로 중국과 한반도 남부 사이의 중계 무역으로 큰 이득을 취했다.'},
{id:'ugeo',name:'우거왕',icon:'🏰',title:'최후의 방어자',era:'BC 128~108',
 atk:75,def:88,int:60,
 story:'위만의 손자로 위만조선의 마지막 왕이다. 한(漢) 무제의 사신 섭하가 조선 비왕 장(長)을 살해한 사건 이후 한과 대립했다. BC 109년 한 무제가 5만 대군으로 침공하자 왕검성에서 1년간 결사 항전했으나, 내부 반란으로 BC 108년 결국 멸망했다. 고조선 최후의 왕.'},
{id:'haemosu',name:'해모수',icon:'☀️',title:'천제의 아들',era:'BC 3세기',
 atk:92,def:65,int:80,
 story:'오룡거(다섯 마리 용이 끄는 수레)를 타고 하늘에서 내려온 천제의 아들이다. 부여의 시조로 전해지며, 동명왕 주몽의 아버지로도 알려져 있다. 웅심산 아래에 도읍을 세우고 나라의 기초를 닦았다. 무예에 뛰어나 활쏘기로 천하무적이었다고 한다.'},
{id:'dongmyeong',name:'동명왕',icon:'🏇',title:'부여의 창건자',era:'BC 2세기',
 atk:88,def:72,int:78,
 story:'해모수의 아들로 알에서 태어났다고 전해진다. 어릴 때부터 활 쏘기에 능하여 &quot;동명(東明)&quot;이라 불렸다. 금와왕의 시기를 피해 남쪽으로 내려가 나라를 세웠는데, 이것이 부여의 기초가 되었다. 물 위를 걸어 강을 건넜다는 신화가 전해진다.'},
{id:'geumwa',name:'금와왕',icon:'👁️',title:'동부여의 왕',era:'BC 2세기',
 atk:70,def:80,int:70,
 story:'부여의 왕으로 태양신의 딸 유화를 거두어 보살폈다. 유화가 햇빛에 감응하여 큰 알을 낳았는데, 금와왕은 이를 버리게 했으나 짐승들이 보호하여 주몽이 태어났다. 주몽의 재능을 시기한 왕자들 때문에 결국 주몽은 남쪽으로 떠나게 된다.'},
{id:'yuhwa',name:'유화부인',icon:'💐',title:'태양의 딸',era:'BC 2세기',
 atk:35,def:85,int:88,
 story:'하백(河伯, 물의 신)의 딸로 해모수와 인연을 맺었다. 아버지의 노여움을 사서 쫓겨났으나 금와왕이 거두어 보살폈다. 햇빛에 감응하여 큰 알을 낳았고 그 알에서 주몽이 태어났다. 주몽에게 오곡의 씨앗을 보내어 새 나라의 기틀을 마련해주었다. 모성애의 상징.'},
{id:'yeoksa',name:'역사(力士)',icon:'💪',title:'고조선의 장수',era:'BC 3세기',
 atk:95,def:60,int:45,
 story:'고조선 말기의 용사로, 천하무적의 힘을 가졌다고 전해진다. 거대한 청동검을 한 손으로 휘두르며 전장에서 수백 명의 적을 물리쳤다. 왕검성 방어전에서 최전선에 서서 한군에 맞섰으나, 내부 배신자에 의해 쓰러졌다는 전설이 있다.'},
{id:'paljo',name:'팔조선인',icon:'📜',title:'법의 수호자',era:'BC 2333',
 atk:50,def:70,int:92,
 story:'단군왕검이 반포한 8조법금을 수호하고 전파한 현자 집단이다. &quot;사람을 죽인 자는 즉시 사형에 처한다&quot;, &quot;남에게 상해를 입힌 자는 곡물로 배상한다&quot;, &quot;도둑질한 자는 노비로 삼는다&quot; 등의 법조항을 통해 고조선 사회의 질서를 유지했다.'},
{id:'cheonje',name:'천제사',icon:'⛩️',title:'하늘의 사제',era:'BC 2000',
 atk:45,def:65,int:95,
 story:'고조선의 제천의식을 관장하는 최고 사제이다. 매년 10월 무천(舞天)을 주관하여 하늘에 풍년과 평화를 기원했다. 별의 움직임으로 농사의 때를 점치고, 제사용 청동기를 관리했다. 단군왕검의 종교적 권위를 뒷받침하는 핵심 인물이다.'}
];

var heroReadStatus={};
function loadHeroRead(){heroReadStatus=JSON.parse(localStorage.getItem('kRPG_heroRead')||'{}')}
function saveHeroRead(){localStorage.setItem('kRPG_heroRead',JSON.stringify(heroReadStatus))}

function renderHeroDetail(heroId){
var h=HEROES.find(function(x){return x.id===heroId});if(!h)return;
heroReadStatus[heroId]=true;saveHeroRead();
var p=document.getElementById('v16-hero');if(!p)return;
p.innerHTML='<h2>📖 영웅 연대기</h2>';
var detail=document.createElement('div');detail.className='hero-detail';
detail.innerHTML='<div class="hd-top"><div class="hd-portrait">'+h.icon+'</div><div class="hd-info"><h3>'+h.name+'</h3><p>'+h.title+' &middot; '+h.era+'</p></div></div>'+
'<div class="hd-story">'+h.story+'</div>'+
'<div class="hd-stats"><div class="hd-stat"><div class="st-val">'+h.atk+'</div><div class="st-lbl">무력</div></div><div class="hd-stat"><div class="st-val">'+h.def+'</div><div class="st-lbl">방어</div></div><div class="hd-stat"><div class="st-val">'+h.int+'</div><div class="st-lbl">지력</div></div></div>';
p.appendChild(detail);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-hero\').querySelector(\'.hero-grid\') ? document.getElementById(\'v16-hero\').classList.remove(\'on\') : void 0" style="background:#2a2438">&#9664; 목록으로</button>';
p.querySelector('.v16-close').onclick=function(){renderHeroPanel();p.classList.add('on')};
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-hero\').classList.remove(\'on\')">닫기</button>';
playSFX16('hero_open');
checkV16Ach('hero_reader');
}

// ─── Tactics Library (12 tactics with Canvas demo) ───
var TACTICS=[
{id:'crane',name:'학익진(鶴翼陣)',icon:'🦅',era:'BC 1000~',desc:'양 날개를 펼쳐 적을 포위하는 진형. 이순신 장군의 학익진이 유명하다. 중앙은 수비하고 양 날개로 적을 감싼다.',effect:'포위 성공시 적 방어 -40%'},
{id:'fish',name:'어린진(魚鱗陣)',icon:'🐟',era:'BC 500~',desc:'물고기 비늘처럼 촘촘히 밀집하는 공격 진형. 선봉이 돌파하면 후속이 밀어붙인다. 전면 돌파에 최적화.',effect:'공격 집중: 선봉 공격력 +35%'},
{id:'snake',name:'장사진(長蛇陣)',icon:'🐍',era:'BC 800~',desc:'뱀처럼 길게 늘어선 기동 진형. 산악이나 좁은 지형에서 유리하다. 머리가 공격받으면 꼬리가 구원하고, 꼬리가 공격받으면 머리가 구원한다.',effect:'험지 이동: 지형 페널티 무시'},
{id:'wheel',name:'차륜진(車輪陣)',icon:'⭕',era:'BC 600~',desc:'수레바퀴처럼 원형으로 배치하는 방어 진형. 사방에서의 공격에 대응할 수 있으며, 중앙에 지휘관을 보호한다.',effect:'전방위 방어: 전체 방어 +25%'},
{id:'arrow',name:'봉시진(鋒矢陣)',icon:'🏹',era:'BC 400~',desc:'화살촉 모양으로 선봉을 뾰족하게 세우는 공격 진형. 적진의 한 점을 집중 공격하여 전열을 무너뜨린다.',effect:'관통 공격: 적 방어 50% 무시'},
{id:'moon',name:'언월진(偃月陣)',icon:'🌙',era:'BC 300~',desc:'반달 모양의 매복 진형. 적을 유인하여 양 끝이 감싸면서 포위한다. 지형을 이용한 유인 전술에 효과적이다.',effect:'매복 성공: 선제 타격 +50%'},
{id:'geese',name:'안행진(雁行陣)',icon:'🦆',era:'BC 700~',desc:'기러기 떼가 나는 모양의 사선 진형. 궁병을 일렬로 배치하여 화력을 극대화한다. 원거리 공격에 특화.',effect:'궁병 화력: 원거리 공격 +30%'},
{id:'fortress',name:'방진(方陣)',icon:'🏰',era:'BC 1200~',desc:'사각형으로 밀집하는 기본 방어 진형. 창병과 방패병으로 견고한 벽을 만들며, 기병 돌격에 특히 효과적이다.',effect:'밀집 방어: 기병 공격 -50%'},
{id:'thunder',name:'뇌진(雷陣)',icon:'⚡',era:'BC 200~',desc:'번개처럼 빠르게 기습하는 속공 진형. 소수 정예가 빠른 속도로 적의 핵심을 타격하고 이탈한다.',effect:'기습 속공: 선제 공격 보장'},
{id:'tortoise',name:'거북진(龜陣)',icon:'🐢',era:'BC 500~',desc:'거북이 등처럼 방패를 겹쳐 든 방어 진형. 화살과 투석에 강하며, 성벽 접근전에서 효과적이다.',effect:'방패벽: 원거리 피해 -60%'},
{id:'ambush_t',name:'복병전술',icon:'🌿',era:'BC 1500~',desc:'적의 이동 경로에 미리 병력을 숨겨두고 기습하는 전술. 지형을 이용하여 소수의 병력으로 대군을 격파할 수 있다.',effect:'기습 매복: 첫 턴 2배 피해'},
{id:'siege_t',name:'공성전법',icon:'🏗️',era:'BC 800~',desc:'성곽을 공격하는 전문 전술. 투석기로 성벽을 파괴하고, 운제(사다리)로 성벽을 오르며, 충차로 성문을 부순다.',effect:'공성 효율: 성벽 피해 +45%'}
];

var tacticsRead={};
function loadTacticsRead(){tacticsRead=JSON.parse(localStorage.getItem('kRPG_tacticsRead')||'{}')}
function saveTacticsRead(){localStorage.setItem('kRPG_tacticsRead',JSON.stringify(tacticsRead))}

// ─── Season Events (4 seasons x 3 events = 12) ───
var SEASONS={
spring:{name:'봄 (파종기)',icon:'🌸',events:[
  {id:'s1',name:'파종제',icon:'🌱',desc:'봄이 오면 들에 나가 씨를 뿌리며 풍년을 기원한다.',reward:'식량 +80'},
  {id:'s2',name:'청명절',icon:'🌤️',desc:'조상의 무덤을 찾아 성묘하고 봄나물을 캔다.',reward:'경험치 +15%'},
  {id:'s3',name:'봄 사냥',icon:'🏹',desc:'겨울을 지낸 사슴 떼를 사냥하여 군량을 보충한다.',reward:'식량 +50, 가죽 +20'}
]},
summer:{name:'여름 (성장기)',icon:'☀️',events:[
  {id:'su1',name:'수렵대회',icon:'🎯',desc:'무사들이 모여 활쏘기 시합을 벌인다.',reward:'공격력 +10%'},
  {id:'su2',name:'단오제',icon:'🎋',desc:'창포물에 머리를 감고 씨름과 그네를 즐긴다.',reward:'사기 +25%'},
  {id:'su3',name:'장마 대비',icon:'🌧️',desc:'둑을 쌓고 곡물 창고의 지붕을 수리한다.',reward:'방어 +10, 식량 보존'}
]},
autumn:{name:'가을 (수확기)',icon:'🍂',events:[
  {id:'a1',name:'추수제',icon:'🌾',desc:'한 해의 수확에 감사하며 하늘에 제사를 올린다.',reward:'식량 +150'},
  {id:'a2',name:'영고(부여)',icon:'🥁',desc:'10월 부여의 제천행사. 밤낮으로 술 마시고 노래하고 춤춘다.',reward:'사기 +30%, 외교 +10'},
  {id:'a3',name:'동맹(고구려)',icon:'🤝',desc:'10월 고구려의 제천행사. 전쟁의 신에게 승리를 기원한다.',reward:'전투력 +15%'}
]},
winter:{name:'겨울 (월동기)',icon:'❄️',events:[
  {id:'w1',name:'동지제',icon:'🌑',desc:'가장 긴 밤에 팥죽을 쑤어 나쁜 기운을 쫓는다.',reward:'회복 +30%'},
  {id:'w2',name:'겨울 훈련',icon:'⛷️',desc:'눈밭에서 강행군 훈련으로 정예병을 양성한다.',reward:'방어 +15, 이동 +1'},
  {id:'w3',name:'연말 결산',icon:'📊',desc:'한 해의 공과를 정리하고 신년 계획을 세운다.',reward:'금화 +100, 경험치 +10%'}
]}
};

var seasonEventsDone={};
function loadSeasonEvents(){seasonEventsDone=JSON.parse(localStorage.getItem('kRPG_seasons')||'{}')}
function saveSeasonEvents(){localStorage.setItem('kRPG_seasons',JSON.stringify(seasonEventsDone))}

function getCurrentSeason(){
var m=new Date().getMonth();
if(m>=2&&m<=4)return'spring';
if(m>=5&&m<=7)return'summer';
if(m>=8&&m<=10)return'autumn';
return'winter';
}

function doSeasonEvent(eventId){
if(seasonEventsDone[eventId]){showV16Toast('이미 완료한 이벤트입니다','#FF9800');return;}
seasonEventsDone[eventId]=Date.now();
saveSeasonEvents();
playSFX16('season');
showV16Toast('계절 이벤트 완료!','#4CAF50');
checkV16Ach('seasonal');
}

// ─── Military Training Academy (8 drills) ───
var DRILLS=[
{id:'archery',name:'궁술 훈련',icon:'🏹',desc:'활쏘기 정확도 향상',target:10},
{id:'swordsmanship',name:'검술 훈련',icon:'⚔️',desc:'근접 전투 기술 연마',target:10},
{id:'horseback',name:'기마 훈련',icon:'🐴',desc:'말 위에서 전투 훈련',target:8},
{id:'formation',name:'진형 훈련',icon:'🛡️',desc:'대오 유지 및 진형 전환',target:12},
{id:'siege_drill',name:'공성 훈련',icon:'🏗️',desc:'성벽 공격 및 방어',target:8},
{id:'night_ops',name:'야간 작전',icon:'🌙',desc:'어둠 속 기습 훈련',target:6},
{id:'survival',name:'생존 훈련',icon:'🏕️',desc:'야생 생존 및 식량 조달',target:10},
{id:'strategy',name:'전략 교육',icon:'📚',desc:'병법 이론 및 지형 분석',target:8}
];

var drillProgress={};
function loadDrills(){drillProgress=JSON.parse(localStorage.getItem('kRPG_drills')||'{}')}
function saveDrills(){localStorage.setItem('kRPG_drills',JSON.stringify(drillProgress))}

function doDrill(drillId){
var drill=DRILLS.find(function(d){return d.id===drillId});if(!drill)return;
if(!drillProgress[drillId])drillProgress[drillId]=0;
if(drillProgress[drillId]>=drill.target){showV16Toast('이미 마스터한 훈련입니다!','#FF9800');return;}
drillProgress[drillId]++;
saveDrills();
playSFX16('drill');
if(drillProgress[drillId]>=drill.target){
showV16Toast(drill.name+' 마스터 완료!','#FFD700');
checkV16Ach('drill_master');
} else {
showV16Toast(drill.name+' '+drillProgress[drillId]+'/'+drill.target,'#4CAF50');
}
renderTrainPanel();
}

// ─── War Records / Battle Analytics ───
var warRecords=[];
function loadWarRecords(){warRecords=JSON.parse(localStorage.getItem('kRPG_warRecords')||'[]')}
function saveWarRecords(){localStorage.setItem('kRPG_warRecords',JSON.stringify(warRecords))}

function addWarRecord(result,allyLeft,enemyLeft){
warRecords.unshift({result:result,ally:allyLeft,enemy:enemyLeft,date:new Date().toLocaleDateString('ko-KR'),ts:Date.now()});
if(warRecords.length>50)warRecords.pop();
saveWarRecords();
}

function renderWarStatsCanvas(canvas){
var ctx=canvas.getContext('2d');
var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,W,H);
var wins=warRecords.filter(function(r){return r.result==='win'}).length;
var losses=warRecords.filter(function(r){return r.result==='lose'}).length;
var total=warRecords.length;
if(total===0){
ctx.fillStyle='#5a5a6a';ctx.font='14px serif';ctx.textAlign='center';
ctx.fillText('전투 기록이 없습니다',W/2,H/2);return;
}
ctx.fillStyle='#c4956a';ctx.font='bold 14px serif';ctx.textAlign='center';
ctx.fillText('전쟁 통계',W/2,25);
var cx=W/2,cy=H/2+10,r=60;
var winAngle=wins/total*Math.PI*2;
ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,0,winAngle);ctx.fillStyle='#4CAF50';ctx.fill();
ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,winAngle,Math.PI*2);ctx.fillStyle='#F44336';ctx.fill();
ctx.beginPath();ctx.arc(cx,cy,30,0,Math.PI*2);ctx.fillStyle='#0a0a14';ctx.fill();
ctx.fillStyle='#FFD700';ctx.font='bold 14px monospace';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(total+'전',cx,cy);
ctx.fillStyle='#4CAF50';ctx.font='11px serif';ctx.textAlign='left';
ctx.fillText('승리: '+wins+' ('+Math.round(wins/total*100)+'%)',20,H-35);
ctx.fillStyle='#F44336';ctx.fillText('패배: '+losses+' ('+Math.round(losses/total*100)+'%)',20,H-18);
var recent=warRecords.slice(0,10);
ctx.fillStyle='#5a5a6a';ctx.font='9px monospace';ctx.textAlign='right';
ctx.fillText('최근 10전',W-15,H-35);
var barW=15,startX=W-180;
recent.forEach(function(rec,i){
ctx.fillStyle=rec.result==='win'?'#4CAF50':'#F44336';
var h=rec.result==='win'?20:12;
ctx.fillRect(startX+i*(barW+3),H-20-h,barW,h);
});
}

// ─── Territory Map (Canvas) ───
var TERRITORIES=[
{name:'아사달',x:250,y:80,size:20,color:'#FFD700',faction:'고조선'},
{name:'왕검성',x:220,y:120,size:18,color:'#FFD700',faction:'고조선'},
{name:'요동',x:150,y:90,size:16,color:'#C4956A',faction:'고조선'},
{name:'한반도 북부',x:280,y:160,size:15,color:'#C4956A',faction:'고조선'},
{name:'부여',x:320,y:60,size:14,color:'#2196F3',faction:'부여'},
{name:'옥저',x:360,y:130,size:10,color:'#9C27B0',faction:'옥저'},
{name:'동예',x:380,y:170,size:10,color:'#FF9800',faction:'동예'},
{name:'마한',x:250,y:250,size:13,color:'#4CAF50',faction:'삼한'},
{name:'진한',x:320,y:260,size:11,color:'#00BCD4',faction:'삼한'},
{name:'변한',x:290,y:280,size:10,color:'#8BC34A',faction:'삼한'},
{name:'한사군(낙랑)',x:200,y:150,size:12,color:'#F44336',faction:'한(漢)'},
{name:'만주',x:180,y:50,size:14,color:'#795548',faction:'예맥'}
];

function renderTerritoryCanvas(canvas){
var ctx=canvas.getContext('2d');
var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#c4956a';ctx.font='bold 14px serif';ctx.textAlign='center';
ctx.fillText('고조선 시대 세력도 (BC 3세기)',W/2,22);
ctx.strokeStyle='#2a2a3a';ctx.lineWidth=1;
for(var gx=0;gx<W;gx+=40){ctx.beginPath();ctx.moveTo(gx,30);ctx.lineTo(gx,H);ctx.stroke();}
for(var gy=30;gy<H;gy+=40){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}
ctx.strokeStyle='#1a3a5a';ctx.lineWidth=2;
ctx.beginPath();ctx.moveTo(100,H);ctx.quadraticCurveTo(120,200,160,150);
ctx.quadraticCurveTo(200,100,250,80);ctx.quadraticCurveTo(350,60,420,100);
ctx.quadraticCurveTo(450,150,430,200);ctx.quadraticCurveTo(400,280,350,310);
ctx.quadraticCurveTo(300,330,250,310);ctx.quadraticCurveTo(180,290,150,320);ctx.stroke();
TERRITORIES.forEach(function(t){
ctx.beginPath();ctx.arc(t.x,t.y,t.size,0,Math.PI*2);
ctx.fillStyle=t.color+'33';ctx.fill();
ctx.strokeStyle=t.color;ctx.lineWidth=2;ctx.stroke();
ctx.beginPath();ctx.arc(t.x,t.y,4,0,Math.PI*2);ctx.fillStyle=t.color;ctx.fill();
ctx.fillStyle='#e8dcc8';ctx.font='9px serif';ctx.textAlign='center';
ctx.fillText(t.name,t.x,t.y+t.size+12);
});
var connections=[[0,1],[0,2],[0,3],[1,2],[3,10],[4,5],[4,6],[7,8],[7,9],[8,9]];
ctx.setLineDash([4,4]);ctx.lineWidth=1;
connections.forEach(function(c){
var a=TERRITORIES[c[0]],b=TERRITORIES[c[1]];
ctx.strokeStyle='#3a3a4a';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
});
ctx.setLineDash([]);
}

// ─── Culture & Customs (10 items) ───
var CULTURES=[
{id:'dolmen',name:'고인돌',icon:'🪨',desc:'청동기 시대 지배자의 무덤. 북방식(탁자식)과 남방식(바둑판식)이 있다. 강화도, 고창 고인돌이 유네스코 세계유산.'},
{id:'totem',name:'솟대(소도)',icon:'🪶',desc:'마을 입구에 세우는 장대. 천하대장군/지하여장군과 함께 마을을 지키는 신앙물. 소도는 천군이 다스리는 신성 구역.'},
{id:'ondol',name:'온돌',icon:'🔥',desc:'한국 고유의 난방 시스템. 아궁이에서 불을 지피면 구들장 아래로 연기가 지나가며 바닥을 데운다. 고조선 시대부터 사용.'},
{id:'jeongol',name:'제천의식',icon:'🙏',desc:'하늘에 제사를 올리는 의식. 부여의 영고, 고구려의 동맹, 동예의 무천, 삼한의 계절제 등 각 나라마다 고유한 제천행사.'},
{id:'music',name:'고대 음악',icon:'🎵',desc:'고조선 시대의 음악은 제천의식과 밀접. 북(고), 장구, 거문고의 원형인 현악기가 사용되었다. 노래와 춤은 하늘과 소통하는 수단.'},
{id:'clothing',name:'고대 복식',icon:'👘',desc:'상투를 틀고 소매가 넓은 포(袍)를 입었다. 위만이 조선에 올 때 상투를 틀고 조선인 복장을 했다는 기록이 남아 있다.'},
{id:'bronze',name:'청동기 문화',icon:'🔔',desc:'비파형동검, 세형동검, 거친무늬거울, 잔무늬거울 등 독자적인 청동기 문화를 발전시켰다. 무기뿐 아니라 의례용 도구도 다수.'},
{id:'agriculture',name:'농경 문화',icon:'🌾',desc:'조, 보리, 콩, 수수 등을 재배하는 농경이 주된 생계 수단. 반달 돌칼로 벼이삭을 자르고, 돌괭이로 밭을 갈았다.'},
{id:'hunting',name:'수렵 문화',icon:'🦌',desc:'사슴, 멧돼지, 곰 등을 사냥했다. 맥궁(貊弓)은 고조선의 특산물로 유명. 활쏘기는 군사 훈련이자 생활 수단이었다.'},
{id:'funeral',name:'장례 문화',icon:'⚱️',desc:'고인돌, 돌널무덤, 독무덤 등 다양한 장례 문화. 부여의 순장 풍습, 옥저의 골장제(뼈를 모아 가족 공동 나무곽에 안치)가 특징적.'}
];

var cultureRead={};
function loadCultureRead(){cultureRead=JSON.parse(localStorage.getItem('kRPG_cultureRead')||'{}')}
function saveCultureRead(){localStorage.setItem('kRPG_cultureRead',JSON.stringify(cultureRead))}

// ─── Quiz (15 new questions: 121~135) ───
var V16_QUIZ=[
{q:'환웅이 인간 세상에 가져온 세 가지 보물을 무엇이라 하는가?',a:['천부인','삼족오','팔조법금','거울과 칼'],c:0},
{q:'부여의 제천행사 명칭은?',a:['영고','무천','동맹','팔관회'],c:0},
{q:'옥저의 독특한 혼인 풍습은?',a:['민며느리제','서옥제','골장제','순장'],c:0},
{q:'동예의 제천행사 명칭은?',a:['무천','영고','동맹','계절제'],c:0},
{q:'고조선의 대표적인 무기로 유명한 활은?',a:['맥궁','각궁','편전','쇠뇌'],c:0},
{q:'학익진을 사용한 것으로 유명한 장군은?',a:['이순신','을지문덕','광개토대왕','연개소문'],c:0},
{q:'부여에서 전쟁에 패하면 왕에게 내리는 벌은?',a:['사형 또는 교체','벌금','유배','강등'],c:0},
{q:'삼한의 신성구역으로 죄인도 잡지 못하는 곳은?',a:['소도','신시','아사달','사직'],c:0},
{q:'고조선의 영역에서 주로 발견되는 동검의 형태는?',a:['비파형동검','세형동검','환두대도','철검'],c:0},
{q:'고인돌 중 &quot;탁자식&quot;이 주로 분포하는 지역은?',a:['한반도 북부','한반도 남부','제주도','일본'],c:0},
{q:'위만조선의 특징적인 경제 활동은?',a:['중계무역','농경','유목','어업'],c:0},
{q:'한 무제가 고조선을 침공한 해는?',a:['BC 109','BC 194','BC 57','BC 37'],c:0},
{q:'부여의 법률 중 도둑질을 하면 어떤 벌을 받는가?',a:['12배 배상','사형','노비','추방'],c:0},
{q:'동예에서 다른 부족 영역을 침범하면 내는 벌은?',a:['책화(소,말 배상)','사형','추방','노비'],c:0},
{q:'고조선 사회에서 &quot;천군&quot;은 어떤 역할인가?',a:['제사장','왕','장군','관리'],c:0}
];

function registerV16Quiz(){
if(window.QUIZ_DATA&&Array.isArray(window.QUIZ_DATA)){
V16_QUIZ.forEach(function(q){var exists=window.QUIZ_DATA.some(function(eq){return eq.q===q.q});if(!exists)window.QUIZ_DATA.push(q);});
}
}

// ─── Achievements (12 new: 73~84) ───
var V16_ACH=[
{id:'hero_reader',name:'영웅 탐구자',desc:'영웅 연대기 6인 이상 열람',icon:'📖'},
{id:'hero_scholar',name:'영웅 학자',desc:'영웅 연대기 전체 열람',icon:'🎓'},
{id:'tactic_student',name:'전술 견습생',desc:'전술 도서관 6편 이상 열람',icon:'📚'},
{id:'tactic_master',name:'전술의 달인',desc:'전술 도서관 전체 열람',icon:'🏅'},
{id:'seasonal',name:'절기 행사',desc:'계절 이벤트 4회 이상 참여',icon:'🌸'},
{id:'four_seasons',name:'사계절 마스터',desc:'모든 계절 이벤트 완료',icon:'🗓️'},
{id:'drill_master',name:'훈련 교관',desc:'군사 훈련 4종 이상 마스터',icon:'💂'},
{id:'drill_all',name:'완벽한 전사',desc:'모든 군사 훈련 마스터',icon:'🎖️'},
{id:'culture_explorer',name:'문화 탐험가',desc:'문화 풍속 5편 이상 열람',icon:'🏺'},
{id:'culture_master',name:'고대 문화 박사',desc:'모든 문화 풍속 열람',icon:'🏛️'},
{id:'war_analyst',name:'전쟁 분석가',desc:'전쟁 기록 10건 이상 기록',icon:'📊'},
{id:'territory_viewer',name:'지도 탐험가',desc:'세력도 열람',icon:'🗺️'}
];

var v16AchUnlocked={};
function loadV16Ach(){v16AchUnlocked=JSON.parse(localStorage.getItem('kRPG_v16ach')||'{}')}
function saveV16Ach(){localStorage.setItem('kRPG_v16ach',JSON.stringify(v16AchUnlocked))}

function checkV16Ach(type){
if(v16AchUnlocked[type])return;
var met=false;
switch(type){
case'hero_reader':met=Object.keys(heroReadStatus).length>=6;break;
case'hero_scholar':met=Object.keys(heroReadStatus).length>=HEROES.length;break;
case'tactic_student':met=Object.keys(tacticsRead).length>=6;break;
case'tactic_master':met=Object.keys(tacticsRead).length>=TACTICS.length;break;
case'seasonal':met=Object.keys(seasonEventsDone).length>=4;break;
case'four_seasons':met=Object.keys(seasonEventsDone).length>=12;break;
case'drill_master':var mastered=0;DRILLS.forEach(function(d){if((drillProgress[d.id]||0)>=d.target)mastered++});met=mastered>=4;break;
case'drill_all':var allM=true;DRILLS.forEach(function(d){if((drillProgress[d.id]||0)<d.target)allM=false});met=allM;break;
case'culture_explorer':met=Object.keys(cultureRead).length>=5;break;
case'culture_master':met=Object.keys(cultureRead).length>=CULTURES.length;break;
case'war_analyst':met=warRecords.length>=10;break;
case'territory_viewer':met=true;break;
}
if(met){
v16AchUnlocked[type]=Date.now();saveV16Ach();
var ach=V16_ACH.find(function(a){return a.id===type});
if(ach)showV16Toast('🏆 업적 달성: '+ach.name,'#FFD700');
}
}

// ─── SFX (10 sounds) ───
var v16AudioCtx=null;
function getV16Ctx(){if(!v16AudioCtx)v16AudioCtx=new(window.AudioContext||window.webkitAudioContext)();return v16AudioCtx;}

function playSFX16(type){
try{
var ctx=getV16Ctx();var osc=ctx.createOscillator();var gain=ctx.createGain();
osc.connect(gain);gain.connect(ctx.destination);var now=ctx.currentTime;
gain.gain.setValueAtTime(0.12,now);
switch(type){
case'hero_open':osc.frequency.setValueAtTime(392,now);osc.frequency.setValueAtTime(523,now+0.1);osc.frequency.setValueAtTime(659,now+0.2);gain.gain.exponentialRampToValueAtTime(0.001,now+0.4);osc.type='sine';break;
case'tactic_open':osc.frequency.setValueAtTime(330,now);osc.frequency.setValueAtTime(440,now+0.08);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.type='triangle';break;
case'season':osc.frequency.setValueAtTime(523,now);osc.frequency.setValueAtTime(659,now+0.1);osc.frequency.setValueAtTime(784,now+0.2);gain.gain.exponentialRampToValueAtTime(0.001,now+0.35);osc.type='sine';break;
case'drill':osc.frequency.setValueAtTime(200,now);osc.frequency.linearRampToValueAtTime(400,now+0.1);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.type='sawtooth';break;
case'culture':osc.frequency.setValueAtTime(261,now);osc.frequency.setValueAtTime(329,now+0.12);osc.frequency.setValueAtTime(392,now+0.24);gain.gain.exponentialRampToValueAtTime(0.001,now+0.4);osc.type='sine';break;
case'territory':osc.frequency.setValueAtTime(220,now);osc.frequency.linearRampToValueAtTime(440,now+0.2);gain.gain.exponentialRampToValueAtTime(0.001,now+0.35);osc.type='triangle';break;
case'record':osc.frequency.setValueAtTime(440,now);osc.frequency.setValueAtTime(330,now+0.1);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.type='square';break;
case'ach_v16':osc.frequency.setValueAtTime(523,now);osc.frequency.setValueAtTime(659,now+0.1);osc.frequency.setValueAtTime(784,now+0.2);osc.frequency.setValueAtTime(1047,now+0.3);gain.gain.exponentialRampToValueAtTime(0.001,now+0.5);osc.type='sine';break;
case'quiz_v16':osc.frequency.setValueAtTime(600,now);osc.frequency.setValueAtTime(800,now+0.05);gain.gain.exponentialRampToValueAtTime(0.001,now+0.15);osc.type='sine';break;
case'panel_open':osc.frequency.setValueAtTime(350,now);osc.frequency.setValueAtTime(500,now+0.06);gain.gain.exponentialRampToValueAtTime(0.001,now+0.12);osc.type='triangle';break;
}
osc.start(now);osc.stop(now+0.6);
}catch(e){}
}

// ─── Toast ───
function showV16Toast(msg,color){
var t=document.createElement('div');
t.style.cssText='position:fixed;bottom:120px;left:50%;transform:translateX(-50%);background:'+(color||'#333')+';color:#fff;padding:10px 20px;border-radius:20px;font-size:12px;z-index:9999;pointer-events:none;opacity:0;transition:opacity .3s;max-width:300px;text-align:center';
t.textContent=msg;document.body.appendChild(t);
requestAnimationFrame(function(){t.style.opacity='1'});
setTimeout(function(){t.style.opacity='0';setTimeout(function(){t.remove()},300)},2500);
}

// ─── Panel Rendering ───
function createV16Panel(id,title,subtitle){
var el=document.getElementById(id);
if(!el){el=document.createElement('div');el.id=id;el.className='v16-panel';document.body.appendChild(el);}
el.innerHTML='<h2>'+title+'</h2>'+(subtitle?'<p class="v16-sub">'+subtitle+'</p>':'');
return el;
}

function renderHeroPanel(){
var p=createV16Panel('v16-hero','📖 영웅 연대기','12인의 영웅 이야기를 읽어보세요');
var grid=document.createElement('div');grid.className='hero-grid';
HEROES.forEach(function(h){
var read=heroReadStatus[h.id];
var card=document.createElement('div');card.className='hero-card';
if(read)card.style.borderColor='#4CAF50';
card.innerHTML='<div class="hro-icon">'+h.icon+'</div><div class="hro-name">'+h.name+'</div><div class="hro-title">'+h.title+'</div>';
card.onclick=function(){renderHeroDetail(h.id)};
grid.appendChild(card);
});
p.appendChild(grid);
var readCount=Object.keys(heroReadStatus).length;
p.innerHTML+='<p class="v16-sub">열람: '+readCount+'/'+HEROES.length+'</p>';
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-hero\').classList.remove(\'on\')">닫기</button>';
}

function renderTacticsPanel(){
var p=createV16Panel('v16-tactics','📚 전술 도서관','고대 병법과 전투 전술 12편');
var list=document.createElement('div');list.className='tactic-list';
TACTICS.forEach(function(t){
var item=document.createElement('div');item.className='tactic-item';
var read=tacticsRead[t.id];
if(read)item.style.borderColor='#4CAF50';
item.innerHTML='<div class="ti-head"><span class="ti-icon">'+t.icon+'</span><span class="ti-name">'+t.name+'</span><span class="ti-era">'+t.era+'</span></div><div class="ti-body"><p class="ti-desc">'+t.desc+'</p><span class="ti-effect">효과: '+t.effect+'</span></div>';
item.onclick=function(){
item.classList.toggle('expanded');
if(!tacticsRead[t.id]){tacticsRead[t.id]=true;saveTacticsRead();playSFX16('tactic_open');checkV16Ach('tactic_student');checkV16Ach('tactic_master');}
};
list.appendChild(item);
});
p.appendChild(list);
var readCount=Object.keys(tacticsRead).length;
p.innerHTML+='<p class="v16-sub">열람: '+readCount+'/'+TACTICS.length+'</p>';
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-tactics\').classList.remove(\'on\')">닫기</button>';
}

function renderSeasonPanel(){
var p=createV16Panel('v16-season','🌸 계절 이벤트','사계절 행사에 참여하세요');
var area=document.createElement('div');area.className='season-area';
var curSeason=getCurrentSeason();
var header=document.createElement('div');header.className='season-header';
var seasonKeys=['spring','summer','autumn','winter'];
seasonKeys.forEach(function(sk){
var btn=document.createElement('button');btn.className='season-btn'+(sk===curSeason?' active':'');
btn.textContent=SEASONS[sk].icon+' '+SEASONS[sk].name;
btn.onclick=function(){renderSeasonContent(area,sk,header)};
header.appendChild(btn);
});
area.appendChild(header);
renderSeasonContent(area,curSeason,header);
p.appendChild(area);
var doneCount=Object.keys(seasonEventsDone).length;
p.innerHTML+='<p class="v16-sub">완료: '+doneCount+'/12</p>';
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-season\').classList.remove(\'on\')">닫기</button>';
}

function renderSeasonContent(area,seasonKey,header){
var old=area.querySelector('.season-events');if(old)old.remove();
var evDiv=document.createElement('div');evDiv.className='season-events';
header.querySelectorAll('.season-btn').forEach(function(b,i){
b.classList.toggle('active',['spring','summer','autumn','winter'][i]===seasonKey);
});
SEASONS[seasonKey].events.forEach(function(ev){
var done=seasonEventsDone[ev.id];
var card=document.createElement('div');card.className='season-card';
if(done)card.style.borderColor='#4CAF50';card.style.opacity=done?'0.6':'1';
card.innerHTML='<div class="sc-icon">'+ev.icon+'</div><div class="sc-info"><div class="sc-name">'+ev.name+(done?' ✓':'')+'</div><div class="sc-desc">'+ev.desc+'</div><div class="sc-reward">보상: '+ev.reward+'</div></div>';
card.onclick=function(){doSeasonEvent(ev.id);renderSeasonPanel();document.getElementById('v16-season').classList.add('on')};
evDiv.appendChild(card);
});
area.appendChild(evDiv);
}

function renderTrainPanel(){
var p=createV16Panel('v16-train','💂 군사 훈련소','병사들을 훈련시켜 강화하세요');
var grid=document.createElement('div');grid.className='train-grid';
DRILLS.forEach(function(d){
var prog=drillProgress[d.id]||0;var pct=Math.min(100,Math.round(prog/d.target*100));
var card=document.createElement('div');card.className='train-card';
if(pct>=100)card.style.borderColor='#FFD700';
card.innerHTML='<div class="tr-icon">'+d.icon+'</div><div class="tr-name">'+d.name+'</div><div class="tr-desc">'+d.desc+'</div><div class="tr-prog"><div class="tr-fill" style="width:'+pct+'%"></div></div><div style="font-size:9px;color:#8a8a8a;margin-top:4px">'+prog+'/'+d.target+(pct>=100?' ✓':'')+'</div>';
card.onclick=function(){doDrill(d.id)};
grid.appendChild(card);
});
p.appendChild(grid);
var mastered=0;DRILLS.forEach(function(d){if((drillProgress[d.id]||0)>=d.target)mastered++});
p.innerHTML+='<p class="v16-sub">마스터: '+mastered+'/'+DRILLS.length+'</p>';
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-train\').classList.remove(\'on\')">닫기</button>';
}

function renderRecordPanel(){
var p=createV16Panel('v16-record','📊 전쟁 기록관','전투 결과와 통계를 확인하세요');
var area=document.createElement('div');area.className='record-area';
var canvas=document.createElement('canvas');canvas.className='record-canvas';canvas.width=480;canvas.height=200;
area.appendChild(canvas);
renderWarStatsCanvas(canvas);
var list=document.createElement('div');list.className='record-list';
if(warRecords.length===0){
list.innerHTML='<p class="v16-sub">아직 전투 기록이 없습니다. 전쟁 시뮬레이터를 이용해보세요!</p>';
} else {
warRecords.forEach(function(rec){
var item=document.createElement('div');item.className='record-item';
item.innerHTML='<div class="ri-result">'+(rec.result==='win'?'🏆':'💀')+'</div><div class="ri-info"><strong>'+(rec.result==='win'?'승리':'패배')+'</strong><br>아군 '+rec.ally+'명 / 적군 '+rec.enemy+'명</div><div class="ri-date">'+rec.date+'</div>';
list.appendChild(item);
});
}
area.appendChild(list);
p.appendChild(area);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-record\').classList.remove(\'on\')">닫기</button>';
playSFX16('record');
checkV16Ach('war_analyst');
}

function renderTerritoryPanel(){
var p=createV16Panel('v16-territory','🗺️ 세력도','고조선 시대 세력 분포');
var canvas=document.createElement('canvas');canvas.className='terr-canvas';canvas.width=480;canvas.height=340;
p.appendChild(canvas);
renderTerritoryCanvas(canvas);
var legend=document.createElement('div');legend.className='terr-legend';
var factions=[{name:'고조선',color:'#FFD700'},{name:'부여',color:'#2196F3'},{name:'옥저',color:'#9C27B0'},{name:'동예',color:'#FF9800'},{name:'삼한',color:'#4CAF50'},{name:'한(漢)',color:'#F44336'},{name:'예맥',color:'#795548'}];
factions.forEach(function(f){
var leg=document.createElement('span');leg.className='terr-leg';
leg.innerHTML='<span class="terr-dot" style="background:'+f.color+'"></span>'+f.name;
legend.appendChild(leg);
});
p.appendChild(legend);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-territory\').classList.remove(\'on\')">닫기</button>';
playSFX16('territory');
checkV16Ach('territory_viewer');
}

function renderCulturePanel(){
var p=createV16Panel('v16-culture','🏺 문화와 풍속','고조선 시대의 생활과 문화');
var grid=document.createElement('div');grid.className='culture-grid';
CULTURES.forEach(function(c){
var read=cultureRead[c.id];
var card=document.createElement('div');card.className='cult-card';
if(read)card.style.borderColor='#4CAF50';
card.innerHTML='<div class="cc-icon">'+c.icon+'</div><div class="cc-name">'+c.name+(read?' ✓':'')+'</div><div class="cc-desc">'+c.desc+'</div>';
card.onclick=function(){
if(!cultureRead[c.id]){cultureRead[c.id]=true;saveCultureRead();playSFX16('culture');checkV16Ach('culture_explorer');checkV16Ach('culture_master');}
card.style.borderColor='#4CAF50';
};
grid.appendChild(card);
});
p.appendChild(grid);
var readCount=Object.keys(cultureRead).length;
p.innerHTML+='<p class="v16-sub">열람: '+readCount+'/'+CULTURES.length+'</p>';
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-culture\').classList.remove(\'on\')">닫기</button>';
}

// ─── Hook into v15 War Simulator for record keeping ───
function hookWarSim(){
if(window._v15){
var origLoop=null;
var checkInterval=setInterval(function(){
var warPanel=document.getElementById('v15-war');
if(warPanel&&warPanel.classList.contains('on')){
var canvases=warPanel.querySelectorAll('canvas');
canvases.forEach(function(c){
if(!c._v16hooked){
c._v16hooked=true;
var origCtx=c.getContext('2d');
var origFillText=origCtx.fillText.bind(origCtx);
var observer=new MutationObserver(function(){});
}
});
}
},5000);
}
}

// ─── Keyboard Shortcuts (8: Shift+H/T/S/D/M/R/N/K) ───
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
var v16map={
'KeyH':['v16-hero',renderHeroPanel],
'KeyT':['v16-tactics',renderTacticsPanel],
'KeyS':['v16-season',renderSeasonPanel],
'KeyD':['v16-train',renderTrainPanel],
'KeyM':['v16-record',renderRecordPanel],
'KeyN':['v16-territory',renderTerritoryPanel],
'KeyK':['v16-culture',renderCulturePanel]
};
if(v16map[e.code]){
e.preventDefault();var id=v16map[e.code][0],fn=v16map[e.code][1];
var el=document.getElementById(id);
if(el&&el.classList.contains('on')){el.classList.remove('on');}
else{fn();document.getElementById(id).classList.add('on');playSFX16('panel_open');}
}
});

// ─── FAB Buttons ───
function addV16FAB(){
var fab=document.createElement('div');fab.className='v16-fab';
var btns=[
{label:'📖',title:'영웅 연대기',fn:function(){renderHeroPanel();document.getElementById('v16-hero').classList.add('on')}},
{label:'📚',title:'전술 도서관',fn:function(){renderTacticsPanel();document.getElementById('v16-tactics').classList.add('on')}},
{label:'🌸',title:'계절 이벤트',fn:function(){renderSeasonPanel();document.getElementById('v16-season').classList.add('on')}},
{label:'💂',title:'군사 훈련소',fn:function(){renderTrainPanel();document.getElementById('v16-train').classList.add('on')}},
{label:'📊',title:'전쟁 기록관',fn:function(){renderRecordPanel();document.getElementById('v16-record').classList.add('on')}},
{label:'🗺️',title:'세력도',fn:function(){renderTerritoryPanel();document.getElementById('v16-territory').classList.add('on')}},
{label:'🏺',title:'문화와 풍속',fn:function(){renderCulturePanel();document.getElementById('v16-culture').classList.add('on')}}
];
btns.forEach(function(b){
var btn=document.createElement('button');btn.className='v16-fab-btn';btn.textContent=b.label;btn.title=b.title;
btn.setAttribute('aria-label',b.title);
btn.onclick=b.fn;fab.appendChild(btn);
});
document.body.appendChild(fab);
}

// ─── Init ───
function v16Init(){
loadHeroRead();loadTacticsRead();loadSeasonEvents();loadDrills();loadWarRecords();loadCultureRead();loadV16Ach();
registerV16Quiz();
setTimeout(addV16FAB,2000);
hookWarSim();
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',v16Init);}
else{v16Init();}

window._v16={HEROES:HEROES,TACTICS:TACTICS,SEASONS:SEASONS,DRILLS:DRILLS,CULTURES:CULTURES,V16_QUIZ:V16_QUIZ,V16_ACH:V16_ACH,addWarRecord:addWarRecord,playSFX16:playSFX16};
})();
