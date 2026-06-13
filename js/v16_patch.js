// v16_patch.js — 한국사 영웅전 v16.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v16-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:130;overflow-y:auto;padding:16px}',
'.v16-panel.on{display:block}',
'.v16-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v16-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v16-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v16-close:hover{background:#8B2A1A}',

'.tech-tree{max-width:560px;margin:0 auto;position:relative}',
'.tech-row{display:flex;gap:8px;justify-content:center;margin-bottom:12px;flex-wrap:wrap}',
'.tech-node{width:110px;background:rgba(20,15,30,.9);border:2px solid #3a3a5a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s;position:relative}',
'.tech-node:hover{border-color:#5FA0FF;transform:translateY(-2px)}',
'.tech-node.researched{border-color:#4CAF50;background:rgba(20,40,20,.9);box-shadow:0 0 10px rgba(76,175,80,.2)}',
'.tech-node.available{border-color:#FFD700;animation:techPulse 2s infinite}',
'.tech-node.locked{opacity:.4;cursor:not-allowed}',
'@keyframes techPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,215,0,.2)}50%{box-shadow:0 0 12px 3px rgba(255,215,0,.15)}}',
'.tech-node .tn-icon{font-size:24px;margin-bottom:4px}',
'.tech-node .tn-name{font-size:10px;color:#e8dcc8;font-weight:700}',
'.tech-node .tn-eff{font-size:8px;color:#8a7a8a;margin-top:2px}',
'.tech-node .tn-cost{font-size:9px;color:#FFD700;margin-top:4px}',
'.tech-arrow{text-align:center;color:#5a5a6a;font-size:14px;margin:2px 0}',

'.faction-canvas-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.faction-canvas-wrap canvas{border:2px solid #3a3a4a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.faction-legend{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:12px}',
'.fl-item{font-size:10px;padding:4px 10px;border-radius:6px;border:1px solid #3a3a4a;background:rgba(26,20,40,.8)}',

'.culture-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;max-width:560px;margin:0 auto}',
'.culture-card{background:rgba(30,20,15,.9);border:2px solid #5a4a2a;border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:all .3s}',
'.culture-card:hover{border-color:#FFD700;transform:translateY(-2px)}',
'.culture-card.built{border-color:#FF9800;box-shadow:0 0 10px rgba(255,152,0,.2)}',
'.culture-card .cc-icon{font-size:28px;margin-bottom:4px}',
'.culture-card .cc-name{font-size:11px;color:#e8dcc8;font-weight:700}',
'.culture-card .cc-eff{font-size:9px;color:#8a7a6a;margin-top:4px}',
'.culture-score{text-align:center;margin-bottom:12px;padding:12px;background:rgba(40,30,15,.8);border-radius:10px;max-width:560px;margin:0 auto 12px}',
'.culture-score .cs-val{font-size:28px;font-weight:900;color:#FFD700}',
'.culture-score .cs-label{font-size:10px;color:#8a7a6a}',

'.golden-banner{max-width:560px;margin:0 auto;text-align:center;padding:20px;background:linear-gradient(135deg,rgba(255,215,0,.08),rgba(255,152,0,.04));border:2px solid #FFD70044;border-radius:14px}',
'.golden-banner .gb-icon{font-size:48px;margin-bottom:8px}',
'.golden-banner .gb-title{font-size:18px;font-weight:900;color:#FFD700;margin-bottom:4px}',
'.golden-banner .gb-desc{font-size:12px;color:#c4956a;line-height:1.8}',
'.golden-banner .gb-timer{font-size:14px;color:#FF9800;margin-top:8px;font-weight:700}',
'.golden-trigger{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:12px}',
'.golden-btn{padding:8px 16px;border:1px solid #5a4a2a;border-radius:6px;background:#3a2a0a;color:#e8dcc8;font-size:11px;cursor:pointer;font-family:inherit}',
'.golden-btn:hover{border-color:#FFD700;background:#4a3a1a}',
'.golden-btn:disabled{opacity:.3;cursor:not-allowed}',

'.form-sim{max-width:560px;margin:0 auto;text-align:center}',
'.form-sim canvas{border:2px solid #3a3a4a;border-radius:8px;background:#0a0a14;display:block;margin:0 auto 12px}',
'.form-selector{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:12px}',
'.form-btn{padding:6px 14px;border:1px solid #4a3a5a;border-radius:6px;background:#2a1a3a;color:#e8dcc8;font-size:11px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.form-btn:hover,.form-btn.active{border-color:#aa88ff;background:#3a2a4a;color:#FFD700}',

'.hero-scroll{max-width:560px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px}',
'.hero-card{background:linear-gradient(135deg,rgba(30,20,10,.95),rgba(20,10,5,.95));border:2px solid #6a5a3a;border-radius:12px;padding:14px;text-align:center;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}',
'.hero-card:hover{border-color:#FFD700;transform:translateY(-3px);box-shadow:0 8px 24px rgba(196,149,106,.15)}',
'.hero-card::after{content:"";position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(45deg,transparent,rgba(255,215,0,.03),transparent);transform:rotate(45deg);transition:transform .5s}',
'.hero-card:hover::after{transform:rotate(45deg) translateY(-20%)}',
'.hero-card .hrc-icon{font-size:36px;margin-bottom:6px}',
'.hero-card .hrc-name{font-size:13px;color:#FFD700;font-weight:900}',
'.hero-card .hrc-title{font-size:10px;color:#c4956a;margin:2px 0}',
'.hero-card .hrc-story{font-size:9px;color:#8a7a6a;line-height:1.6;margin-top:6px}',
'.hero-card .hrc-stat{font-size:9px;color:#5FA0FF;margin-top:4px}',

'.report-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.report-wrap canvas{border:2px solid #3a3a4a;border-radius:10px;background:#0a0a14;display:block;margin:0 auto 12px}',
'.report-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:400px;margin:0 auto 12px}',
'.rs-item{background:rgba(26,20,40,.8);border:1px solid #3a3a4a;border-radius:8px;padding:8px;text-align:center}',
'.rs-item .rs-val{font-size:18px;font-weight:900;color:#FFD700}',
'.rs-item .rs-label{font-size:9px;color:#8a7a6a}',

'.season-display{max-width:560px;margin:0 auto;text-align:center}',
'.season-current{padding:20px;border-radius:14px;margin-bottom:12px;transition:all .5s}',
'.season-current .sc-icon{font-size:48px}',
'.season-current .sc-name{font-size:20px;font-weight:900;margin:8px 0}',
'.season-current .sc-effect{font-size:12px;line-height:1.8}',
'.season-forecast{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}',
'.sf-card{padding:10px;border-radius:8px;border:1px solid #3a3a4a;background:rgba(20,15,30,.8);text-align:center;cursor:pointer;transition:all .2s}',
'.sf-card:hover{border-color:#FFD700}',
'.sf-card.current{border-color:#FF9800;background:rgba(40,30,15,.8)}',
'.sf-card .sf-icon{font-size:22px}',
'.sf-card .sf-name{font-size:10px;color:#e8dcc8;margin-top:4px}'
].join('\n');
document.head.appendChild(css);

// ─── 1. Tech Tree System (12 technologies) ───
var TECH_DATA=[
{id:'stone_tool',name:'석기 제작',icon:'🪨',effect:'기초 공격력 +5',cost:0,tier:0,requires:[]},
{id:'pottery',name:'토기 제작',icon:'🏺',effect:'식량 저장 +20%',cost:100,tier:0,requires:[]},
{id:'agriculture',name:'농경 기술',icon:'🌾',effect:'식량 생산 +25%',cost:150,tier:1,requires:['stone_tool']},
{id:'bronze_work',name:'청동 제련',icon:'🔥',effect:'청동 무기 해금',cost:250,tier:1,requires:['stone_tool','pottery']},
{id:'irrigation',name:'관개 수로',icon:'💧',effect:'농업 효율 +30%',cost:300,tier:2,requires:['agriculture']},
{id:'iron_smelt',name:'철기 제련',icon:'⚒️',effect:'철제 무기/갑옷 해금',cost:400,tier:2,requires:['bronze_work']},
{id:'horse_tame',name:'말 길들이기',icon:'🐴',effect:'기병 부대 해금',cost:350,tier:2,requires:['agriculture']},
{id:'writing',name:'문자 발명',icon:'📜',effect:'외교 효율 +20%',cost:300,tier:2,requires:['pottery']},
{id:'fortify',name:'축성술',icon:'🏰',effect:'성벽 방어 +40%',cost:500,tier:3,requires:['iron_smelt','irrigation']},
{id:'strategy',name:'병법',icon:'📖',effect:'전술 효과 +25%',cost:450,tier:3,requires:['writing','horse_tame']},
{id:'trade_route',name:'교역로 개척',icon:'🛤️',effect:'금화 수입 +30%',cost:400,tier:3,requires:['writing','iron_smelt']},
{id:'kingdom',name:'왕국 건설',icon:'👑',effect:'모든 능력 +15%',cost:800,tier:4,requires:['fortify','strategy','trade_route']}
];

var researched=[];
function loadTech(){var d=JSON.parse(localStorage.getItem('kRPG_tech')||'[]');if(Array.isArray(d))researched=d;}
function saveTech(){localStorage.setItem('kRPG_tech',JSON.stringify(researched))}

function canResearch(tech){
if(researched.indexOf(tech.id)>=0)return false;
return tech.requires.every(function(r){return researched.indexOf(r)>=0});
}

function researchTech(techId){
var tech=TECH_DATA.find(function(t){return t.id===techId});
if(!tech)return;
if(researched.indexOf(techId)>=0){v16Toast('이미 연구 완료!','#FF9800');return;}
if(!canResearch(tech)){v16Toast('선행 기술을 먼저 연구하세요','#F44336');return;}
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
if((state.gold||0)<tech.cost){v16Toast('금화 부족! (필요: '+tech.cost+')','#F44336');return;}
state.gold-=tech.cost;localStorage.setItem('kRPG_state',JSON.stringify(state));
researched.push(techId);saveTech();
v16SFX('research');
v16Toast('📚 연구 완료: '+tech.name+' → '+tech.effect,'#2196F3');
v16CheckAch('scholar');
renderTechTree();
}

// ─── 2. Faction Relations Canvas ───
var FACTIONS=[
{id:'gojoseon',name:'고조선',color:'#FFD700',x:280,y:80},
{id:'buyeo',name:'부여',color:'#4CAF50',x:440,y:140},
{id:'han',name:'한(漢)',color:'#F44336',x:120,y:140},
{id:'samhan',name:'삼한',color:'#2196F3',x:200,y:250},
{id:'yemaek',name:'예맥',color:'#9C27B0',x:360,y:250}
];

var factionRelations={
'gojoseon-buyeo':60,'gojoseon-han':-40,'gojoseon-samhan':50,'gojoseon-yemaek':30,
'buyeo-han':-20,'buyeo-samhan':10,'buyeo-yemaek':40,
'han-samhan':-30,'han-yemaek':-10,'samhan-yemaek':20
};

function loadFactionRel(){var d=JSON.parse(localStorage.getItem('kRPG_factions')||'null');if(d)factionRelations=d;}
function saveFactionRel(){localStorage.setItem('kRPG_factions',JSON.stringify(factionRelations))}

function getRelKey(a,b){return a<b?a+'-'+b:b+'-'+a}

function drawFactionCanvas(canvas){
var ctx=canvas.getContext('2d');
ctx.clearRect(0,0,560,320);
ctx.fillStyle='#0a0814';ctx.fillRect(0,0,560,320);

ctx.font='bold 10px monospace';ctx.textAlign='center';
ctx.fillStyle='#3a3a4a';ctx.fillText('세력 관계도 — 고조선 시대',280,16);

var keys=Object.keys(factionRelations);
keys.forEach(function(key){
var parts=key.split('-');
var f1=FACTIONS.find(function(f){return f.id===parts[0]});
var f2=FACTIONS.find(function(f){return f.id===parts[1]});
if(!f1||!f2)return;
var val=factionRelations[key];
ctx.beginPath();ctx.moveTo(f1.x,f1.y);ctx.lineTo(f2.x,f2.y);
ctx.strokeStyle=val>30?'rgba(76,175,80,0.6)':val>0?'rgba(255,235,59,0.4)':val>-30?'rgba(255,152,0,0.5)':'rgba(244,67,54,0.6)';
ctx.lineWidth=Math.abs(val)/20+1;
ctx.setLineDash(val<0?[5,5]:[]);
ctx.stroke();ctx.setLineDash([]);
var mx=(f1.x+f2.x)/2,my=(f1.y+f2.y)/2;
ctx.fillStyle=val>=0?'#8BC34A':'#EF5350';
ctx.font='9px monospace';ctx.fillText((val>=0?'+':'')+val,mx,my-4);
});

FACTIONS.forEach(function(f){
ctx.beginPath();ctx.arc(f.x,f.y,22,0,Math.PI*2);
var grad=ctx.createRadialGradient(f.x,f.y,5,f.x,f.y,22);
grad.addColorStop(0,f.color);grad.addColorStop(1,f.color+'44');
ctx.fillStyle=grad;ctx.fill();
ctx.strokeStyle=f.color;ctx.lineWidth=2;ctx.stroke();
ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
ctx.fillText(f.name,f.x,f.y+4);
});
}

function changeFactionRel(f1,f2,delta){
var key=getRelKey(f1,f2);
factionRelations[key]=Math.max(-100,Math.min(100,(factionRelations[key]||0)+delta));
saveFactionRel();
}

// ─── 3. Culture Development System (8 heritage) ───
var CULTURE_HERITAGE=[
{id:'dolmen',name:'고인돌',icon:'🪨',effect:'문화 +10, 관광 +5',cost:200,points:10},
{id:'altar',name:'제천단',icon:'⛩️',effect:'신앙 +15, 사기 +10',cost:300,points:15},
{id:'market',name:'시장',icon:'🏪',effect:'교역 +20%, 금화 +10/턴',cost:250,points:12},
{id:'school',name:'서당',icon:'🏫',effect:'연구 속도 +25%',cost:350,points:18},
{id:'library',name:'서고',icon:'📚',effect:'퀴즈 보상 +30%',cost:400,points:20},
{id:'theater',name:'연희장',icon:'🎭',effect:'문화 +25, 행복 +15',cost:450,points:25},
{id:'monument',name:'기념비',icon:'🗿',effect:'명성 +20, 외교 +10',cost:500,points:22},
{id:'palace',name:'궁궐',icon:'🏛️',effect:'모든 보너스 +10%',cost:800,points:35}
];

var cultureScore=0;var builtHeritage=[];
function loadCulture(){var d=JSON.parse(localStorage.getItem('kRPG_culture')||'{}');cultureScore=d.score||0;builtHeritage=d.built||[];}
function saveCulture(){localStorage.setItem('kRPG_culture',JSON.stringify({score:cultureScore,built:builtHeritage}))}

function buildHeritage(hId){
var h=CULTURE_HERITAGE.find(function(x){return x.id===hId});if(!h)return;
if(builtHeritage.indexOf(hId)>=0){v16Toast('이미 건설됨!','#FF9800');return;}
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
if((state.gold||0)<h.cost){v16Toast('금화 부족!','#F44336');return;}
state.gold-=h.cost;localStorage.setItem('kRPG_state',JSON.stringify(state));
builtHeritage.push(hId);cultureScore+=h.points;saveCulture();
v16SFX('culture_build');
v16Toast('🏛️ '+h.name+' 건설 완료! 문화 +'+h.points,'#FF9800');
v16CheckAch('culturist');
renderCulturePanel();
}

// ─── 4. Golden Age System ───
var goldenAge={active:false,endTime:0,count:0};
function loadGoldenAge(){var d=JSON.parse(localStorage.getItem('kRPG_golden')||'{}');if(d.active!==undefined)goldenAge=d;}
function saveGoldenAge(){localStorage.setItem('kRPG_golden',JSON.stringify(goldenAge))}

function triggerGoldenAge(type){
if(goldenAge.active&&Date.now()<goldenAge.endTime){v16Toast('이미 황금기 진행 중!','#FF9800');return;}
var costs={military:500,culture:400,economy:350};
var cost=costs[type]||400;
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
if((state.gold||0)<cost){v16Toast('금화 부족!','#F44336');return;}
state.gold-=cost;localStorage.setItem('kRPG_state',JSON.stringify(state));
goldenAge.active=true;goldenAge.endTime=Date.now()+300000;goldenAge.count++;saveGoldenAge();
v16SFX('golden');
v16Toast('🌟 황금기 시작! 5분간 모든 보너스 +50%','#FFD700');
v16CheckAch('golden_ruler');
}

function checkGoldenActive(){
if(goldenAge.active&&Date.now()>=goldenAge.endTime){goldenAge.active=false;saveGoldenAge();}
return goldenAge.active;
}

// ─── 5. Formation Simulator (6 formations, Canvas) ───
var FORMATIONS=[
{id:'frontal',name:'정면진',icon:'▬',desc:'균형 공방. 기본 진형',units:[[2,1],[3,1],[4,1],[5,1],[2,2],[3,2],[4,2],[5,2],[3,3],[4,3]]},
{id:'arrow',name:'쐐기진(鶴翼)',icon:'▲',desc:'선봉 돌파. 공격 +30%',units:[[3.5,0.5],[2.5,1.5],[4.5,1.5],[1.5,2.5],[5.5,2.5],[2,3.5],[5,3.5],[1,4],[3.5,3],[6,4]]},
{id:'circle',name:'원진',icon:'◯',desc:'사방 방어. 방어 +40%',units:[[3.5,0.5],[5.5,1],[6,2.5],[5.5,4],[3.5,4.5],[1.5,4],[1,2.5],[1.5,1],[3.5,2.5],[4.5,2.5]]},
{id:'crane',name:'학익진',icon:'🦅',desc:'포위 공격. 궁병 +25%',units:[[3.5,1],[2,1.5],[5,1.5],[1,2.5],[6,2.5],[0.5,3.5],[6.5,3.5],[1,4.5],[6,4.5],[3.5,2]]},
{id:'ambush',name:'매복진',icon:'🌿',desc:'기습 공격. 선제 +50%',units:[[1,1],[1,2],[1,3],[6,1],[6,2],[6,3],[3,4],[4,4],[2,4.5],[5,4.5]]},
{id:'turtle',name:'거북진',icon:'🐢',desc:'철벽 방어. 피해 -50%',units:[[3,1],[4,1],[2,2],[5,2],[3,2],[4,2],[2,3],[5,3],[3,3],[4,3]]}
];

var currentFormation=0;
var formCanvas=null;

function drawFormation(canvas,fIdx){
var ctx=canvas.getContext('2d');var f=FORMATIONS[fIdx];
ctx.clearRect(0,0,480,300);
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,480,300);

ctx.strokeStyle='#1a1a2a';ctx.lineWidth=1;
for(var gx=0;gx<8;gx++){for(var gy=0;gy<6;gy++){
ctx.strokeRect(gx*60+10,gy*50+5,58,48);
}}

ctx.fillStyle='#2a3a2a';ctx.font='10px monospace';ctx.textAlign='center';
ctx.fillText('아군 진형',240,18);

f.units.forEach(function(pos,i){
var px=pos[0]*60+40,py=pos[1]*50+35;
ctx.beginPath();ctx.arc(px,py,14,0,Math.PI*2);
var grad=ctx.createRadialGradient(px,py,3,px,py,14);
grad.addColorStop(0,'#5FA0FF');grad.addColorStop(1,'#2a4a8a');
ctx.fillStyle=grad;ctx.fill();
ctx.strokeStyle='#5FA0FF';ctx.lineWidth=2;ctx.stroke();
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';
ctx.fillText(String(i+1),px,py+4);
});

ctx.fillStyle='#FFD700';ctx.font='bold 14px sans-serif';
ctx.fillText(f.name,240,285);
ctx.fillStyle='#8a7a6a';ctx.font='11px sans-serif';
ctx.fillText(f.desc,240,270);
}

// ─── 6. Hero Chronicles (12 heroes) ───
var HEROES=[
{id:'hwanung',name:'환웅',title:'천왕(天王)',icon:'☁️',story:'하늘에서 인간 세상으로 내려와 신시를 세운 신인. 풍백, 우사, 운사를 거느리고 곡식, 수명, 질병, 선악을 다스렸다.',stat:'통솔 95 | 무력 88 | 지력 92'},
{id:'dangun',name:'단군왕검',title:'최초의 왕',icon:'👑',story:'환웅과 웅녀 사이에서 태어난 고조선의 건국자. 아사달에 도읍을 정하고 홍익인간의 이념으로 나라를 세웠다.',stat:'통솔 99 | 무력 85 | 지력 95'},
{id:'ungnyeo',name:'웅녀',title:'인내의 어머니',icon:'🐻',story:'21일간 쑥과 마늘만 먹고 인간이 된 곰 여인. 끈기와 인내의 상징으로 고조선 왕비가 되었다.',stat:'통솔 78 | 무력 65 | 지력 90'},
{id:'pungbaek',name:'풍백',title:'바람의 신장',icon:'🌬️',story:'환웅의 세 신장 중 바람을 다스리는 장수. 적의 진형을 흐트러뜨리는 풍백전(風伯戰)의 달인.',stat:'통솔 82 | 무력 90 | 지력 75'},
{id:'usa',name:'우사',title:'비의 신장',icon:'🌧️',story:'비를 관장하는 신장. 기우제를 지내고 홍수를 막으며, 농업의 풍요를 책임졌다.',stat:'통솔 80 | 무력 72 | 지력 88'},
{id:'unsa',name:'운사',title:'구름의 신장',icon:'⛅',story:'구름을 부리는 신장. 전장에 안개를 드리워 아군을 숨기는 전술의 대가.',stat:'통솔 78 | 무력 70 | 지력 92'},
{id:'biru',name:'비류',title:'바다의 개척자',icon:'⛵',story:'고조선의 해양 무역을 개척한 장수. 먼 바다를 건너 새로운 땅과 교역로를 발견했다.',stat:'통솔 85 | 무력 78 | 지력 82'},
{id:'wiman',name:'위만',title:'찬탈자',icon:'⚔️',story:'연나라 출신 장수. 준왕의 신임을 얻은 뒤 정변을 일으켜 왕위를 찬탈한 야심가.',stat:'통솔 90 | 무력 92 | 지력 88'},
{id:'seonggi',name:'성기',title:'왕검성의 수호자',icon:'🛡️',story:'한 무제의 침공에 맞서 왕검성을 끝까지 지킨 충신. 최후까지 항전하다 장렬히 전사했다.',stat:'통솔 88 | 무력 94 | 지력 80'},
{id:'haemosu',name:'해모수',title:'천제의 아들',icon:'☀️',story:'하늘에서 내려온 천제의 아들. 부여를 건국하고 북방의 강자로 군림했다.',stat:'통솔 93 | 무력 91 | 지력 86'},
{id:'jumong',name:'주몽',title:'신궁(神弓)',icon:'🏹',story:'동명성왕. 부여에서 탈출해 고구려를 건국. 활의 명수로 신궁이라 불렸다.',stat:'통솔 96 | 무력 98 | 지력 90'},
{id:'yuhwa',name:'유화',title:'물의 여신',icon:'💧',story:'하백의 딸이자 주몽의 어머니. 해모수와의 비련 끝에 주몽을 낳고 지혜로운 어머니가 되었다.',stat:'통솔 75 | 무력 60 | 지력 96'}
];

// ─── 7. Tactical Analysis Report (Canvas Radar) ───
var battleStats={wins:0,losses:0,totalDmg:0,totalHeal:0,maxCombo:0,perfectWins:0};
function loadBattleStats(){var d=JSON.parse(localStorage.getItem('kRPG_v16stats')||'{}');if(d.wins!==undefined)battleStats=d;}
function saveBattleStats(){localStorage.setItem('kRPG_v16stats',JSON.stringify(battleStats))}

function drawRadarChart(canvas){
var ctx=canvas.getContext('2d');
ctx.clearRect(0,0,400,400);
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,400,400);

var cx=200,cy=200,R=140;
var labels=['공격력','방어력','전략','사기','보급','문화'];
var values=[
Math.min(100,battleStats.totalDmg/100),
Math.min(100,battleStats.totalHeal/50),
Math.min(100,researched.length*10),
Math.min(100,(goldenAge.count||0)*20+30),
Math.min(100,(function(){var s=JSON.parse(localStorage.getItem('kRPG_supply')||'{}');var total=0;['food','iron','wood','gold_ore','horse'].forEach(function(k){total+=(s[k]||0)});return total/25})()),
Math.min(100,cultureScore*2)
];

for(var ring=1;ring<=5;ring++){
ctx.beginPath();
for(var i=0;i<=6;i++){
var angle=Math.PI*2*i/6-Math.PI/2;
var r=R*ring/5;
var x=cx+Math.cos(angle)*r,y=cy+Math.sin(angle)*r;
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.closePath();ctx.strokeStyle='rgba(90,80,100,0.3)';ctx.stroke();
}

for(var a=0;a<6;a++){
var angle=Math.PI*2*a/6-Math.PI/2;
ctx.beginPath();ctx.moveTo(cx,cy);
ctx.lineTo(cx+Math.cos(angle)*R,cy+Math.sin(angle)*R);
ctx.strokeStyle='rgba(90,80,100,0.2)';ctx.stroke();
ctx.fillStyle='#c4956a';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
var lx=cx+Math.cos(angle)*(R+18),ly=cy+Math.sin(angle)*(R+18);
ctx.fillText(labels[a],lx,ly+4);
}

ctx.beginPath();
for(var v=0;v<6;v++){
var angle=Math.PI*2*v/6-Math.PI/2;
var r=R*values[v]/100;
var x=cx+Math.cos(angle)*r,y=cy+Math.sin(angle)*r;
if(v===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.closePath();
ctx.fillStyle='rgba(95,160,255,0.15)';ctx.fill();
ctx.strokeStyle='rgba(95,160,255,0.8)';ctx.lineWidth=2;ctx.stroke();

for(var v=0;v<6;v++){
var angle=Math.PI*2*v/6-Math.PI/2;
var r=R*values[v]/100;
var x=cx+Math.cos(angle)*r,y=cy+Math.sin(angle)*r;
ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fillStyle='#5FA0FF';ctx.fill();
ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.stroke();
}

ctx.fillStyle='#FFD700';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
var avg=Math.round(values.reduce(function(s,v){return s+v},0)/6);
ctx.fillText('종합 전력: '+avg+'/100',200,380);
}

// ─── 8. Four Seasons System ───
var SEASONS=[
{id:'spring',name:'봄',icon:'🌸',color:'#E91E63',bgStart:'#1a0a14',bgEnd:'#2a1a24',effects:'식량 +20%, 사기 +10%'},
{id:'summer',name:'여름',icon:'☀️',color:'#FF9800',bgStart:'#1a1408',bgEnd:'#2a2418',effects:'이동력 +1, 궁병 명중 +15%'},
{id:'autumn',name:'가을',icon:'🍂',color:'#FF5722',bgStart:'#1a0e08',bgEnd:'#2a1e18',effects:'수확 +30%, 교역 +20%'},
{id:'winter',name:'겨울',icon:'❄️',color:'#2196F3',bgStart:'#08101a',bgEnd:'#18202a',effects:'이동력 -1, 방어 +20%, 식량소모 +50%'}
];

var currentSeason=0;
function loadSeason(){var d=localStorage.getItem('kRPG_season');if(d!==null)currentSeason=parseInt(d)||0;}
function saveSeason(){localStorage.setItem('kRPG_season',String(currentSeason))}

function advanceSeason(){
currentSeason=(currentSeason+1)%4;saveSeason();
v16SFX('season');
v16Toast('계절 변화: '+SEASONS[currentSeason].icon+' '+SEASONS[currentSeason].name,'#FF9800');
v16CheckAch('season_watcher');
}

// ─── Quiz (15 new questions: 121~135) ───
var V16_QUIZ=[
{q:'고조선의 강역은 어디까지 미쳤는가?',a:['요동~한반도 북부','제주도~일본','중국 전역','동남아시아'],c:0},
{q:'명도전(明刀錢)은 어느 나라의 화폐인가?',a:['연(燕)','고조선','한(漢)','진(秦)'],c:0},
{q:'부여의 제천행사 이름은?',a:['영고','동맹','무천','팔관회'],c:0},
{q:'고구려의 건국 연도는?',a:['BC 37','BC 57','BC 18','AD 42'],c:0},
{q:'옥저의 특이한 결혼 풍습은?',a:['민며느리제','데릴사위제','시집살이','자유혼'],c:0},
{q:'동예의 법률에서 다른 부족 영역 침범 시 벌칙은?',a:['책화(責禍)','유배','사형','벌금'],c:0},
{q:'삼한 중 가장 큰 나라는?',a:['마한','진한','변한','가야'],c:0},
{q:'진한 사람들이 스스로를 무엇의 후예라 했는가?',a:['진(秦) 유민','한(漢) 유민','흉노 후예','고조선 왕족'],c:0},
{q:'세형동검은 어느 문화의 특징인가?',a:['한국식 청동기','중국식 청동기','일본 청동기','시베리아'],c:0},
{q:'고조선의 중심지 이동 순서는?',a:['요동→대동강','한강→낙동강','대동강→요동','경주→서울'],c:0},
{q:'한사군 중 가장 오래 존속한 것은?',a:['낙랑군','현도군','임둔군','진번군'],c:0},
{q:'선사시대 대표적 농경 도구는?',a:['반달돌칼','비파형동검','골각기','빗살무늬토기'],c:0},
{q:'고인돌의 주요 기능은?',a:['무덤(지배자 매장)','주거지','곡식 저장','종교 시설'],c:0},
{q:'부여의 왕위 계승 방식은?',a:['형사취수','부자상속','선거','추대'],c:0},
{q:'삼한의 소도(蘇塗)의 특징은?',a:['천군이 다스리는 제사 구역','군사 훈련장','시장','외교관 숙소'],c:0}
];

function registerV16Quiz(){
if(window.QUIZ_DATA&&Array.isArray(window.QUIZ_DATA)){
V16_QUIZ.forEach(function(q){var exists=window.QUIZ_DATA.some(function(eq){return eq.q===q.q});if(!exists)window.QUIZ_DATA.push(q);});
}
}

// ─── Achievements (12 new: 73~84) ───
var V16_ACH=[
{id:'scholar',name:'학자',desc:'기술 5개 이상 연구',icon:'📚'},
{id:'tech_master',name:'기술의 달인',desc:'모든 기술 연구 완료',icon:'🔬'},
{id:'diplomat_v16',name:'외교관',desc:'세력 관계 5회 변경',icon:'🤝'},
{id:'culturist',name:'문화인',desc:'문화유산 4개 이상 건설',icon:'🏛️'},
{id:'culture_master',name:'문화의 수호자',desc:'모든 문화유산 건설',icon:'🏆'},
{id:'golden_ruler',name:'태평성대',desc:'황금기 3회 발동',icon:'🌟'},
{id:'tactician',name:'전술가',desc:'6종 진형 모두 확인',icon:'🎯'},
{id:'hero_reader',name:'열전 독파',desc:'영웅 열전 12인 모두 읽기',icon:'📖'},
{id:'season_watcher',name:'사계절의 관찰자',desc:'계절 변화 4회 경험',icon:'🌸'},
{id:'analyst',name:'분석가',desc:'전술 분석 리포트 5회 확인',icon:'📊'},
{id:'kingdom_builder',name:'건국의 아버지',desc:'왕국 건설 기술 연구',icon:'👑'},
{id:'v16_explorer',name:'v16 탐험가',desc:'v16 기능 8개 모두 사용',icon:'🗺️'}
];

var v16AchProgress={};
function loadV16Ach(){var d=JSON.parse(localStorage.getItem('kRPG_v16ach')||'{}');v16AchProgress=d;}
function saveV16Ach(){localStorage.setItem('kRPG_v16ach',JSON.stringify(v16AchProgress))}
function v16CheckAch(type){
if(!v16AchProgress[type])v16AchProgress[type]=0;
v16AchProgress[type]++;saveV16Ach();
var thresholds={scholar:5,culturist:4,golden_ruler:3,season_watcher:4,analyst:5,diplomat_v16:5,hero_reader:12};
if(thresholds[type]&&v16AchProgress[type]>=thresholds[type]){
var ach=V16_ACH.find(function(a){return a.id===type});
if(ach)v16Toast('🏆 업적 달성: '+ach.name,'#FFD700');
}
}

// ─── SFX Engine (10 new sounds) ───
var v16Audio=null;
function getV16Ctx(){if(!v16Audio)v16Audio=new(window.AudioContext||window.webkitAudioContext)();return v16Audio;}

function v16SFX(type){
try{
var ctx=getV16Ctx();var osc=ctx.createOscillator();var gain=ctx.createGain();
osc.connect(gain);gain.connect(ctx.destination);var now=ctx.currentTime;
gain.gain.setValueAtTime(0.12,now);
switch(type){
case'research':osc.type='sine';osc.frequency.setValueAtTime(392,now);osc.frequency.setValueAtTime(523,now+0.1);osc.frequency.setValueAtTime(659,now+0.2);gain.gain.exponentialRampToValueAtTime(0.001,now+0.4);break;
case'culture_build':osc.type='triangle';osc.frequency.setValueAtTime(330,now);osc.frequency.setValueAtTime(440,now+0.15);osc.frequency.setValueAtTime(554,now+0.3);gain.gain.exponentialRampToValueAtTime(0.001,now+0.5);break;
case'golden':osc.type='sine';osc.frequency.setValueAtTime(523,now);osc.frequency.setValueAtTime(659,now+0.1);osc.frequency.setValueAtTime(784,now+0.2);osc.frequency.setValueAtTime(1047,now+0.3);gain.gain.exponentialRampToValueAtTime(0.001,now+0.5);break;
case'formation':osc.type='square';osc.frequency.setValueAtTime(200,now);osc.frequency.setValueAtTime(250,now+0.05);osc.frequency.setValueAtTime(300,now+0.1);gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);break;
case'hero_open':osc.type='sine';osc.frequency.setValueAtTime(440,now);osc.frequency.linearRampToValueAtTime(880,now+0.2);gain.gain.exponentialRampToValueAtTime(0.001,now+0.35);break;
case'season':osc.type='triangle';osc.frequency.setValueAtTime(262,now);osc.frequency.setValueAtTime(330,now+0.15);osc.frequency.setValueAtTime(392,now+0.3);gain.gain.exponentialRampToValueAtTime(0.001,now+0.5);break;
case'faction':osc.type='sawtooth';osc.frequency.setValueAtTime(150,now);osc.frequency.linearRampToValueAtTime(300,now+0.15);gain.gain.setValueAtTime(0.06,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.25);break;
case'report':osc.type='sine';osc.frequency.setValueAtTime(600,now);osc.frequency.setValueAtTime(500,now+0.1);osc.frequency.setValueAtTime(700,now+0.2);gain.gain.exponentialRampToValueAtTime(0.001,now+0.3);break;
case'heritage':osc.type='triangle';osc.frequency.setValueAtTime(440,now);osc.frequency.setValueAtTime(554,now+0.12);osc.frequency.setValueAtTime(659,now+0.24);gain.gain.exponentialRampToValueAtTime(0.001,now+0.4);break;
case'achieve_v16':osc.type='sine';osc.frequency.setValueAtTime(523,now);osc.frequency.setValueAtTime(659,now+0.08);osc.frequency.setValueAtTime(784,now+0.16);osc.frequency.setValueAtTime(1047,now+0.24);gain.gain.exponentialRampToValueAtTime(0.001,now+0.5);break;
}
osc.start(now);osc.stop(now+0.7);
}catch(e){}
}

// ─── Toast ───
function v16Toast(msg,color){
var t=document.createElement('div');
t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:'+(color||'#333')+';color:#fff;padding:10px 20px;border-radius:20px;font-size:12px;z-index:9999;pointer-events:none;opacity:0;transition:opacity .3s;max-width:320px;text-align:center;font-family:inherit';
t.textContent=msg;document.body.appendChild(t);
requestAnimationFrame(function(){t.style.opacity='1'});
setTimeout(function(){t.style.opacity='0';setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t)},300)},2500);
}

// ─── Panel Rendering ───
function v16Panel(id,title,sub){
var el=document.getElementById(id);
if(!el){el=document.createElement('div');el.id=id;el.className='v16-panel';document.body.appendChild(el);}
el.innerHTML='<h2>'+title+'</h2>'+(sub?'<p class="v16-sub">'+sub+'</p>':'');
return el;
}

function renderTechTree(){
var p=v16Panel('v16-tech','📚 기술 연구 트리','문명을 발전시키세요 &middot; 연구 완료: '+researched.length+'/'+TECH_DATA.length);
var tree=document.createElement('div');tree.className='tech-tree';

var tiers=[0,1,2,3,4];
tiers.forEach(function(tier){
var row=document.createElement('div');row.className='tech-row';
TECH_DATA.filter(function(t){return t.tier===tier}).forEach(function(tech){
var isRes=researched.indexOf(tech.id)>=0;
var canRes=canResearch(tech);
var node=document.createElement('div');
node.className='tech-node'+(isRes?' researched':canRes?' available':' locked');
node.innerHTML='<div class="tn-icon">'+tech.icon+'</div><div class="tn-name">'+tech.name+'</div><div class="tn-eff">'+tech.effect+'</div><div class="tn-cost">'+(isRes?'✅ 완료':canRes?'💰 '+tech.cost:'🔒')+'</div>';
node.onclick=function(){researchTech(tech.id)};
row.appendChild(node);
});
tree.appendChild(row);
if(tier<4){var arrow=document.createElement('div');arrow.className='tech-arrow';arrow.textContent='▼';tree.appendChild(arrow);}
});
p.appendChild(tree);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-tech\').classList.remove(\'on\')">닫기</button>';
}

function renderFactionPanel(){
var p=v16Panel('v16-faction','🤝 세력 관계도','외교를 통해 관계를 변화시키세요');
var wrap=document.createElement('div');wrap.className='faction-canvas-wrap';
var canvas=document.createElement('canvas');canvas.width=560;canvas.height=320;
drawFactionCanvas(canvas);wrap.appendChild(canvas);
var legend=document.createElement('div');legend.className='faction-legend';
FACTIONS.forEach(function(f){
var item=document.createElement('span');item.className='fl-item';
item.style.borderColor=f.color;item.textContent=f.name;
legend.appendChild(item);
});
wrap.appendChild(legend);

var actions=document.createElement('div');actions.style.cssText='display:flex;gap:6px;justify-content:center;flex-wrap:wrap';
[{label:'고조선↔부여 +10',fn:function(){changeFactionRel('gojoseon','buyeo',10)}},
{label:'고조선↔한 -10',fn:function(){changeFactionRel('gojoseon','han',-10)}},
{label:'삼한↔예맥 +10',fn:function(){changeFactionRel('samhan','yemaek',10)}}
].forEach(function(act){
var btn=document.createElement('button');btn.className='form-btn';btn.textContent=act.label;
btn.onclick=function(){act.fn();v16SFX('faction');v16CheckAch('diplomat_v16');drawFactionCanvas(canvas);};
actions.appendChild(btn);
});
wrap.appendChild(actions);
p.appendChild(wrap);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-faction\').classList.remove(\'on\')">닫기</button>';
}

function renderCulturePanel(){
var p=v16Panel('v16-culture','🏛️ 문화 발전','문화유산을 건설하고 문명을 빛내세요');
var scoreDiv=document.createElement('div');scoreDiv.className='culture-score';
scoreDiv.innerHTML='<div class="cs-val">'+cultureScore+'</div><div class="cs-label">문화 점수 &middot; 건설 '+builtHeritage.length+'/'+CULTURE_HERITAGE.length+'</div>';
p.appendChild(scoreDiv);
var grid=document.createElement('div');grid.className='culture-grid';
CULTURE_HERITAGE.forEach(function(h){
var isBuilt=builtHeritage.indexOf(h.id)>=0;
var card=document.createElement('div');card.className='culture-card'+(isBuilt?' built':'');
card.innerHTML='<div class="cc-icon">'+h.icon+'</div><div class="cc-name">'+h.name+'</div><div class="cc-eff">'+h.effect+'</div><div class="eq-cost">'+(isBuilt?'✅ 건설됨':'💰 '+h.cost)+'</div>';
card.onclick=function(){buildHeritage(h.id)};grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-culture\').classList.remove(\'on\')">닫기</button>';
}

function renderGoldenPanel(){
var p=v16Panel('v16-golden','🌟 황금기','조건을 달성하고 태평성대를 이끄세요');
var banner=document.createElement('div');banner.className='golden-banner';
var isActive=checkGoldenActive();
if(isActive){
var remain=Math.ceil((goldenAge.endTime-Date.now())/1000);
var min=Math.floor(remain/60),sec=remain%60;
banner.innerHTML='<div class="gb-icon">🌟</div><div class="gb-title">황금기 진행 중!</div><div class="gb-desc">모든 생산, 전투, 외교 보너스 +50%</div><div class="gb-timer">남은 시간: '+min+'분 '+sec+'초</div>';
}else{
banner.innerHTML='<div class="gb-icon">⏳</div><div class="gb-title">황금기 대기</div><div class="gb-desc">금화를 투자하여 황금기를 발동하세요.<br>5분간 모든 보너스 +50% 적용</div><div class="gb-timer">발동 횟수: '+(goldenAge.count||0)+'회</div>';
}
p.appendChild(banner);
var triggers=document.createElement('div');triggers.className='golden-trigger';
[{type:'military',label:'⚔️ 군사 황금기 (500G)',desc:'전투력 +50%'},
{type:'culture',label:'🏛️ 문화 황금기 (400G)',desc:'문화/연구 +50%'},
{type:'economy',label:'💰 경제 황금기 (350G)',desc:'자원/교역 +50%'}
].forEach(function(g){
var btn=document.createElement('button');btn.className='golden-btn';btn.textContent=g.label;
btn.disabled=isActive;
btn.onclick=function(){triggerGoldenAge(g.type);renderGoldenPanel();p.classList.add('on');};
triggers.appendChild(btn);
});
p.appendChild(triggers);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-golden\').classList.remove(\'on\')">닫기</button>';
}

function renderFormationPanel(){
var p=v16Panel('v16-form','🎯 진형 시뮬레이터','전투 대형을 선택하고 시뮬레이션하세요');
var sim=document.createElement('div');sim.className='form-sim';
var canvas=document.createElement('canvas');canvas.width=480;canvas.height=300;
drawFormation(canvas,currentFormation);sim.appendChild(canvas);

var selector=document.createElement('div');selector.className='form-selector';
FORMATIONS.forEach(function(f,i){
var btn=document.createElement('button');btn.className='form-btn'+(i===currentFormation?' active':'');
btn.textContent=f.icon+' '+f.name;
btn.onclick=function(){currentFormation=i;v16SFX('formation');drawFormation(canvas,i);
selector.querySelectorAll('.form-btn').forEach(function(b,j){b.className='form-btn'+(j===i?' active':'')});
v16CheckAch('tactician');
};
selector.appendChild(btn);
});
sim.appendChild(selector);
p.appendChild(sim);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-form\').classList.remove(\'on\')">닫기</button>';
}

function renderHeroPanel(){
var p=v16Panel('v16-hero','📖 영웅 열전','고조선 시대의 영웅들');
var scroll=document.createElement('div');scroll.className='hero-scroll';
HEROES.forEach(function(h){
var card=document.createElement('div');card.className='hero-card';
card.innerHTML='<div class="hrc-icon">'+h.icon+'</div><div class="hrc-name">'+h.name+'</div><div class="hrc-title">'+h.title+'</div><div class="hrc-story">'+h.story+'</div><div class="hrc-stat">'+h.stat+'</div>';
card.onclick=function(){v16SFX('hero_open');v16CheckAch('hero_reader');v16Toast(h.name+': '+h.title,'#c4956a');};
scroll.appendChild(card);
});
p.appendChild(scroll);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-hero\').classList.remove(\'on\')">닫기</button>';
}

function renderReportPanel(){
var p=v16Panel('v16-report','📊 전술 분석 리포트','종합 전력을 분석합니다');
var wrap=document.createElement('div');wrap.className='report-wrap';
var canvas=document.createElement('canvas');canvas.width=400;canvas.height=400;
drawRadarChart(canvas);wrap.appendChild(canvas);

var stats=document.createElement('div');stats.className='report-stats';
[{label:'승리',val:battleStats.wins},{label:'패배',val:battleStats.losses},{label:'총 피해',val:battleStats.totalDmg},
{label:'총 회복',val:battleStats.totalHeal},{label:'최대 콤보',val:battleStats.maxCombo},{label:'완벽 승리',val:battleStats.perfectWins}
].forEach(function(s){
var item=document.createElement('div');item.className='rs-item';
item.innerHTML='<div class="rs-val">'+s.val+'</div><div class="rs-label">'+s.label+'</div>';
stats.appendChild(item);
});
wrap.appendChild(stats);
p.appendChild(wrap);
v16CheckAch('analyst');
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-report\').classList.remove(\'on\')">닫기</button>';
}

function renderSeasonPanel(){
var p=v16Panel('v16-season','🌸 사계절 시스템','계절에 따라 전투와 생산이 달라집니다');
var display=document.createElement('div');display.className='season-display';
var current=SEASONS[currentSeason];
var sc=document.createElement('div');sc.className='season-current';
sc.style.background='linear-gradient(135deg,'+current.bgStart+','+current.bgEnd+')';
sc.style.border='2px solid '+current.color;
sc.innerHTML='<div class="sc-icon">'+current.icon+'</div><div class="sc-name" style="color:'+current.color+'">'+current.name+'</div><div class="sc-effect" style="color:#c4956a">'+current.effects+'</div>';
display.appendChild(sc);

var nextBtn=document.createElement('button');nextBtn.className='form-btn';nextBtn.textContent='▶ 다음 계절로';nextBtn.style.margin='12px auto';nextBtn.style.display='block';
nextBtn.onclick=function(){advanceSeason();renderSeasonPanel();p.classList.add('on');};
display.appendChild(nextBtn);

var forecast=document.createElement('div');forecast.className='season-forecast';
SEASONS.forEach(function(s,i){
var card=document.createElement('div');card.className='sf-card'+(i===currentSeason?' current':'');
card.innerHTML='<div class="sf-icon">'+s.icon+'</div><div class="sf-name">'+s.name+'</div>';
forecast.appendChild(card);
});
display.appendChild(forecast);
p.appendChild(display);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-season\').classList.remove(\'on\')">닫기</button>';
}

// ─── Keyboard Shortcuts (8: Shift+T/F/H/G/K/N/O/S mapped to 8 features) ───
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
var map={
'KeyT':['v16-tech',renderTechTree],
'KeyF':['v16-faction',renderFactionPanel],
'KeyH':['v16-culture',renderCulturePanel],
'KeyG':['v16-golden',renderGoldenPanel],
'KeyK':['v16-form',renderFormationPanel],
'KeyN':['v16-hero',renderHeroPanel],
'KeyO':['v16-report',renderReportPanel],
'KeyS':['v16-season',renderSeasonPanel]
};
if(map[e.code]){
e.preventDefault();var id=map[e.code][0],fn=map[e.code][1];
var el=document.getElementById(id);
if(el&&el.classList.contains('on')){el.classList.remove('on');}
else{fn();document.getElementById(id).classList.add('on');}
}
});

// ─── Quick Action Buttons (FAB) ───
function addV16QuickActions(){
var container=document.createElement('div');
container.id='v16-quick-actions';
container.style.cssText='position:fixed;left:4px;top:50%;transform:translateY(-50%);z-index:120;display:flex;flex-direction:column;gap:4px';

var actions=[
{label:'📚',title:'기술트리',fn:function(){renderTechTree();document.getElementById('v16-tech').classList.add('on')}},
{label:'🤝',title:'세력관계',fn:function(){renderFactionPanel();document.getElementById('v16-faction').classList.add('on')}},
{label:'🏛️',title:'문화',fn:function(){renderCulturePanel();document.getElementById('v16-culture').classList.add('on')}},
{label:'🌟',title:'황금기',fn:function(){renderGoldenPanel();document.getElementById('v16-golden').classList.add('on')}},
{label:'🎯',title:'진형',fn:function(){renderFormationPanel();document.getElementById('v16-form').classList.add('on')}},
{label:'📖',title:'영웅열전',fn:function(){renderHeroPanel();document.getElementById('v16-hero').classList.add('on')}},
{label:'📊',title:'분석',fn:function(){renderReportPanel();document.getElementById('v16-report').classList.add('on')}},
{label:'🌸',title:'계절',fn:function(){renderSeasonPanel();document.getElementById('v16-season').classList.add('on')}}
];

actions.forEach(function(a){
var btn=document.createElement('button');
btn.textContent=a.label;btn.title=a.title;
btn.style.cssText='width:32px;height:32px;border-radius:8px;border:1px solid #5a4a3a;background:rgba(26,20,40,.85);color:#e8dcc8;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;transition:all .2s';
btn.onmouseenter=function(){btn.style.borderColor='#FFD700';btn.style.transform='scale(1.15)'};
btn.onmouseleave=function(){btn.style.borderColor='#5a4a3a';btn.style.transform='scale(1)'};
btn.onclick=a.fn;container.appendChild(btn);
});

var existing=document.getElementById('v16-quick-actions');
if(existing)existing.remove();
document.body.appendChild(container);
}

// ─── Init ───
function v16Init(){
loadTech();loadFactionRel();loadCulture();loadGoldenAge();loadSeason();loadBattleStats();loadV16Ach();registerV16Quiz();
setTimeout(addV16QuickActions,1800);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',v16Init);}
else{v16Init();}

window._v16={
TECH_DATA:TECH_DATA,FACTIONS:FACTIONS,CULTURE_HERITAGE:CULTURE_HERITAGE,SEASONS:SEASONS,
HEROES:HEROES,FORMATIONS:FORMATIONS,V16_QUIZ:V16_QUIZ,V16_ACH:V16_ACH,
researched:researched,v16SFX:v16SFX,checkGoldenActive:checkGoldenActive,battleStats:battleStats
};
})();
