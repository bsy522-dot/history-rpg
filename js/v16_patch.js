// v16_patch.js — 한국사 영웅전 v16.0 Enhancement Patch
// TechTree + HeroPedia + HistoryEncyclopedia + FormationEditor + FactionMap
// + BattleReplay + DailyMissions + RankingBoard + StrategyGuide + StatsDashboard
// + Quiz 15 + Achievement 12 + SFX 10 + Keyboard 8
(function(){
'use strict';

// =============================================
// SECTION 1: CSS INJECTION
// =============================================
var css=document.createElement('style');
css.textContent=[
'.v16-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:130;overflow-y:auto;padding:16px}',
'.v16-panel.on{display:block}',
'.v16-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v16-subtitle{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v16-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v16-close:hover{background:#8B2A1A}',
'.v16-tabs{display:flex;gap:4px;max-width:560px;margin:0 auto 12px;flex-wrap:wrap;justify-content:center}',
'.v16-tab{font-size:10px;padding:6px 12px;border:1px solid #3a3a4a;border-radius:6px;background:#2a2438;color:#e8dcc8;cursor:pointer;font-family:inherit;transition:all .2s}',
'.v16-tab.active{border-color:#FFD700;background:#3a3448;color:#FFD700}',
'.v16-card{background:rgba(26,20,40,.9);border:2px solid #3a3a4a;border-radius:12px;padding:14px;margin-bottom:10px;max-width:540px;margin-left:auto;margin-right:auto;transition:all .3s}',
'.v16-card:hover{border-color:#c4956a;transform:translateY(-2px)}',
'.v16-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;max-width:560px;margin:0 auto}',
'.v16-list{max-width:560px;margin:0 auto}',
'.v16-search{display:block;width:100%;max-width:400px;margin:0 auto 12px;padding:8px 16px;border:1px solid #5a4a3a;border-radius:20px;background:rgba(26,20,40,.9);color:#e8dcc8;font-size:12px;font-family:inherit}',
'.v16-search::placeholder{color:#5a5a6a}',
'.v16-search:focus{outline:none;border-color:#FFD700}',
'.v16-badge{display:inline-block;font-size:8px;padding:2px 6px;border-radius:8px;margin-left:4px;font-weight:700}',

'.tt-canvas-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.tt-canvas-wrap canvas{border:2px solid #3a3a4a;border-radius:8px;background:#0a0a14;display:block;margin:0 auto 10px;cursor:pointer}',
'.tt-info{max-width:500px;margin:8px auto;background:rgba(26,20,40,.9);border:2px solid #5a4a3a;border-radius:10px;padding:12px;display:none}',
'.tt-info.on{display:block}',
'.tt-info h4{color:#FFD700;font-size:13px;margin-bottom:4px}',
'.tt-info p{font-size:11px;color:#8a7a6a;line-height:1.6}',
'.tt-info .tt-cost{font-size:10px;color:#ff9800;margin-top:4px}',
'.tt-info .tt-btn{padding:6px 16px;border:1px solid #4a3a2a;border-radius:6px;background:#2a5a2a;color:#e8dcc8;font-size:11px;cursor:pointer;font-family:inherit;margin-top:6px}',
'.tt-info .tt-btn:disabled{opacity:.3;cursor:not-allowed}',
'.tt-info .tt-btn:hover:not(:disabled){background:#3a6a3a}',

'.hero-card{background:rgba(26,20,40,.9);border:2px solid #3a3a4a;border-radius:14px;padding:16px;text-align:center;transition:all .3s;cursor:pointer}',
'.hero-card:hover{border-color:#FFD700;transform:translateY(-3px);box-shadow:0 8px 24px rgba(255,215,0,.1)}',
'.hero-card .hc-portrait{font-size:42px;margin-bottom:6px}',
'.hero-card .hc-name{font-size:13px;font-weight:900;color:#FFD700}',
'.hero-card .hc-title{font-size:10px;color:#c4956a;margin-top:2px}',
'.hero-card .hc-class{font-size:9px;color:#5FA0FF;margin-top:4px}',

'.enc-item{background:rgba(20,16,30,.9);border:1px solid #3a3a4a;border-radius:10px;padding:12px 14px;margin-bottom:8px;cursor:pointer;transition:all .3s}',
'.enc-item:hover{border-color:#c4956a}',
'.enc-item .ei-head{display:flex;align-items:center;gap:8px}',
'.enc-item .ei-icon{font-size:20px}',
'.enc-item .ei-title{font-size:12px;font-weight:700;color:#e8dcc8}',
'.enc-item .ei-cat{font-size:9px;color:#8a7a6a;margin-left:auto}',
'.enc-item .ei-body{font-size:11px;color:#8a7a6a;line-height:1.6;margin-top:8px;display:none}',
'.enc-item.open .ei-body{display:block}',

'.form-editor{max-width:560px;margin:0 auto;text-align:center}',
'.form-editor canvas{border:2px solid #3a3a4a;border-radius:8px;background:#0a0a14;display:block;margin:0 auto 10px;cursor:pointer}',
'.form-controls{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:8px}',
'.form-ctrl-btn{padding:6px 12px;border:1px solid #4a3a2a;border-radius:6px;background:#2a2438;color:#e8dcc8;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.form-ctrl-btn:hover{border-color:#FFD700;background:#3a3448}',
'.form-ctrl-btn.active{border-color:#FFD700;color:#FFD700}',

'.fmap-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.fmap-wrap canvas{border:2px solid #3a3a4a;border-radius:8px;background:#0a0a14;display:block;margin:0 auto 10px}',
'.fmap-legend{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:6px}',
'.fmap-leg-item{font-size:9px;padding:3px 8px;border-radius:6px;border:1px solid #3a3a4a;background:rgba(26,20,40,.8);color:#e8dcc8}',

'.replay-list{max-width:500px;margin:0 auto}',
'.replay-item{display:flex;align-items:center;gap:10px;background:rgba(20,16,30,.9);border:1px solid #3a3a4a;border-radius:8px;padding:10px 14px;margin-bottom:6px;cursor:pointer;transition:all .3s}',
'.replay-item:hover{border-color:#ff6644}',
'.replay-item .rp-icon{font-size:18px}',
'.replay-item .rp-info{flex:1}',
'.replay-item .rp-title{font-size:11px;color:#e8dcc8;font-weight:700}',
'.replay-item .rp-date{font-size:9px;color:#5a5a6a}',
'.replay-detail{max-width:500px;margin:8px auto;background:rgba(20,16,30,.9);border:2px solid #ff6644;border-radius:10px;padding:14px;display:none}',
'.replay-detail.on{display:block}',
'.replay-log{max-height:200px;overflow-y:auto;font-size:10px;color:#8a8a9a;line-height:1.8}',
'.replay-log .rp-ally{color:#88ff88}',
'.replay-log .rp-enemy{color:#ff8888}',

'.daily-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;max-width:400px;margin:0 auto}',
'.daily-card{background:rgba(26,20,40,.9);border:2px solid #3a3a4a;border-radius:12px;padding:14px;text-align:center;transition:all .3s}',
'.daily-card.done{border-color:#4CAF50;background:rgba(20,40,20,.9)}',
'.daily-card .dc-icon{font-size:24px;margin-bottom:4px}',
'.daily-card .dc-title{font-size:11px;color:#e8dcc8;font-weight:700}',
'.daily-card .dc-desc{font-size:9px;color:#8a7a6a;margin-top:4px}',
'.daily-card .dc-prog{height:6px;background:#1a1a2e;border-radius:3px;overflow:hidden;margin-top:6px}',
'.daily-card .dc-fill{height:100%;background:linear-gradient(90deg,#4CAF50,#81C784);border-radius:3px;transition:width .5s}',
'.daily-streak{text-align:center;font-size:12px;color:#FFD700;margin:12px 0}',

'.rank-table{max-width:500px;margin:0 auto}',
'.rank-row{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid #2a2438;transition:background .2s}',
'.rank-row:hover{background:rgba(42,36,56,.5)}',
'.rank-row.player{background:rgba(255,215,0,.08);border:1px solid #FFD70044;border-radius:6px}',
'.rank-pos{width:24px;font-size:14px;font-weight:900;text-align:center}',
'.rank-pos.gold{color:#FFD700}',
'.rank-pos.silver{color:#C0C0C0}',
'.rank-pos.bronze{color:#CD7F32}',
'.rank-name{flex:1;font-size:12px;color:#e8dcc8;font-weight:700}',
'.rank-score{font-size:11px;color:#c4956a;font-weight:700}',
'.rank-grade{font-size:9px;padding:2px 8px;border-radius:8px;font-weight:700}',

'.guide-section{max-width:540px;margin:0 auto}',
'.guide-item{background:rgba(20,16,30,.9);border:1px solid #3a3a4a;border-radius:10px;padding:12px 14px;margin-bottom:8px;cursor:pointer;transition:all .3s}',
'.guide-item:hover{border-color:#5FA0FF}',
'.guide-item .gi-head{display:flex;align-items:center;gap:8px}',
'.guide-item .gi-icon{font-size:18px}',
'.guide-item .gi-title{font-size:12px;font-weight:700;color:#5FA0FF}',
'.guide-item .gi-body{font-size:11px;color:#8a7a6a;line-height:1.8;margin-top:8px;display:none}',
'.guide-item.open .gi-body{display:block}',

'.stats-dash{max-width:560px;margin:0 auto}',
'.stats-row{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:12px}',
'.stat-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:10px;padding:12px 16px;text-align:center;flex:1;min-width:100px}',
'.stat-card .sc-val{font-size:24px;font-weight:900;color:#FFD700}',
'.stat-card .sc-label{font-size:10px;color:#8a7a6a;margin-top:4px}',
'.stats-chart-wrap{text-align:center;margin:12px 0}',
'.stats-chart-wrap canvas{border:2px solid #3a3a4a;border-radius:8px;background:#0a0a14;display:block;margin:0 auto}'
].join('\n');
document.head.appendChild(css);

// =============================================
// SECTION 2: SFX ENGINE (10 types)
// =============================================
var audioCtx=null;
function getAudioCtx(){if(!audioCtx){try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}return audioCtx}
function playSFX(type){
var ctx=getAudioCtx();if(!ctx)return;
var o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);
var t=ctx.currentTime;g.gain.setValueAtTime(0.15,t);
var configs={
tech_unlock:{f:523,dur:.3,wave:'triangle',up:660},
hero_open:{f:440,dur:.25,wave:'sine',up:550},
enc_browse:{f:392,dur:.15,wave:'triangle',up:440},
form_place:{f:330,dur:.1,wave:'square',up:370},
fmap_hover:{f:262,dur:.1,wave:'sine',up:294},
replay_play:{f:494,dur:.2,wave:'triangle',up:587},
daily_done:{f:587,dur:.4,wave:'triangle',up:784},
rank_view:{f:349,dur:.2,wave:'sine',up:440},
guide_open:{f:370,dur:.15,wave:'triangle',up:415},
stats_view:{f:415,dur:.25,wave:'sine',up:523}
};
var c=configs[type]||configs.tech_unlock;
o.type=c.wave;o.frequency.setValueAtTime(c.f,t);o.frequency.linearRampToValueAtTime(c.up,t+c.dur*.6);
g.gain.exponentialRampToValueAtTime(0.001,t+c.dur);o.start(t);o.stop(t+c.dur);
}

// =============================================
// SECTION 3: TECH TREE (4 ages, 24 technologies)
// =============================================
var TECH_TREE=[
{id:'tt_stone_tools',name:'석기 제작',icon:'🪨',age:1,x:50,y:40,cost:50,desc:'기본 도구 제작. 공격력+2',effect:{atk:2},prereq:[],unlocked:false},
{id:'tt_fire',name:'불의 발견',icon:'🔥',age:1,x:180,y:40,cost:80,desc:'화공 기술. 스킬데미지+10%',effect:{skillDmg:10},prereq:['tt_stone_tools'],unlocked:false},
{id:'tt_agriculture',name:'농경 시작',icon:'🌾',age:1,x:310,y:40,cost:100,desc:'식량 생산+20%',effect:{food:20},prereq:['tt_stone_tools'],unlocked:false},
{id:'tt_pottery',name:'토기 제작',icon:'🏺',age:1,x:440,y:40,cost:70,desc:'자원 보관 용량+30%',effect:{storage:30},prereq:[],unlocked:false},
{id:'tt_animal',name:'가축 사육',icon:'🐂',age:1,x:120,y:100,cost:120,desc:'이동력+1',effect:{move:1},prereq:['tt_agriculture'],unlocked:false},
{id:'tt_weaving',name:'직조 기술',icon:'🧵',age:1,x:370,y:100,cost:90,desc:'방어력+3',effect:{def:3},prereq:['tt_pottery'],unlocked:false},
{id:'tt_bronze_cast',name:'청동 주조',icon:'⚒️',age:2,x:50,y:180,cost:200,desc:'청동 무기 사용. 공격력+5',effect:{atk:5},prereq:['tt_fire','tt_stone_tools'],unlocked:false},
{id:'tt_bronze_armor',name:'청동 갑옷',icon:'🛡️',age:2,x:180,y:180,cost:220,desc:'방어력+6',effect:{def:6},prereq:['tt_bronze_cast'],unlocked:false},
{id:'tt_chariot',name:'전차 운용',icon:'🏇',age:2,x:310,y:180,cost:280,desc:'기병 유닛 해금',effect:{unit:'cavalry'},prereq:['tt_animal','tt_bronze_cast'],unlocked:false},
{id:'tt_irrigation',name:'관개 수로',icon:'🚰',age:2,x:440,y:180,cost:180,desc:'식량+40%. 인구+10%',effect:{food:40,pop:10},prereq:['tt_agriculture'],unlocked:false},
{id:'tt_writing',name:'문자 체계',icon:'📜',age:2,x:120,y:240,cost:250,desc:'퀴즈 정답 힌트 제공',effect:{hint:true},prereq:['tt_pottery'],unlocked:false},
{id:'tt_astrology',name:'천문 관측',icon:'🔭',age:2,x:370,y:240,cost:200,desc:'날씨 예측. 선공확률+15%',effect:{firstStrike:15},prereq:['tt_agriculture','tt_fire'],unlocked:false},
{id:'tt_iron_smelt',name:'철기 제련',icon:'⛏️',age:3,x:50,y:320,cost:400,desc:'공격력+8. 철기 무기 해금',effect:{atk:8},prereq:['tt_bronze_cast'],unlocked:false},
{id:'tt_fortress',name:'성곽 축조',icon:'🏰',age:3,x:180,y:320,cost:450,desc:'방어력+10. 성곽전 해금',effect:{def:10},prereq:['tt_bronze_armor'],unlocked:false},
{id:'tt_navy',name:'수군 편성',icon:'⛵',age:3,x:310,y:320,cost:380,desc:'해상 교역로 개방',effect:{trade:'sea'},prereq:['tt_chariot'],unlocked:false},
{id:'tt_medicine',name:'의술 발전',icon:'💊',age:3,x:440,y:320,cost:300,desc:'전투 후 HP 회복+30%',effect:{heal:30},prereq:['tt_agriculture','tt_writing'],unlocked:false},
{id:'tt_law',name:'법률 제정',icon:'⚖️',age:3,x:120,y:380,cost:350,desc:'외교 효과+20%',effect:{diplo:20},prereq:['tt_writing'],unlocked:false},
{id:'tt_cavalry_armor',name:'기병 중장',icon:'🐎',age:3,x:370,y:380,cost:420,desc:'기병 방어+8',effect:{cavDef:8},prereq:['tt_chariot','tt_iron_smelt'],unlocked:false},
{id:'tt_steel',name:'강철 제련',icon:'🗡️',age:4,x:50,y:460,cost:600,desc:'최강 무기. 공격력+12',effect:{atk:12},prereq:['tt_iron_smelt'],unlocked:false},
{id:'tt_siege',name:'공성 병기',icon:'💣',age:4,x:180,y:460,cost:650,desc:'성곽 파괴력+50%',effect:{siege:50},prereq:['tt_fortress','tt_iron_smelt'],unlocked:false},
{id:'tt_academy',name:'학당 설립',icon:'🏛️',age:4,x:310,y:460,cost:500,desc:'경험치+25%. 퀴즈 보너스',effect:{xp:25},prereq:['tt_writing','tt_law'],unlocked:false},
{id:'tt_trade_route',name:'교역망 확장',icon:'🛤️',age:4,x:440,y:460,cost:550,desc:'금 수입+50%',effect:{gold:50},prereq:['tt_navy','tt_law'],unlocked:false},
{id:'tt_great_wall',name:'장성 건설',icon:'🧱',age:4,x:120,y:520,cost:800,desc:'전체 방어+15. 침략 방어',effect:{def:15,invade:true},prereq:['tt_fortress','tt_siege'],unlocked:false},
{id:'tt_empire',name:'제국 선포',icon:'👑',age:4,x:370,y:520,cost:1000,desc:'모든 능력+10%. 최종 기술',effect:{all:10},prereq:['tt_steel','tt_academy','tt_trade_route'],unlocked:false}
];

var techState={};
function loadTechState(){try{techState=JSON.parse(localStorage.getItem('krpg_tech'))||{}}catch(e){techState={}}
TECH_TREE.forEach(function(t){if(techState[t.id])t.unlocked=true})}
function saveTechState(){var s={};TECH_TREE.forEach(function(t){if(t.unlocked)s[t.id]=true});localStorage.setItem('krpg_tech',JSON.stringify(s))}

var techCanvas=null,techCtx=null;
function initTechCanvas(){
techCanvas=document.createElement('canvas');techCanvas.width=520;techCanvas.height=580;
techCtx=techCanvas.getContext('2d');
techCanvas.addEventListener('click',function(e){
var r=techCanvas.getBoundingClientRect();
var mx=(e.clientX-r.left)*(520/r.width),my=(e.clientY-r.top)*(580/r.height);
TECH_TREE.forEach(function(t){
var dx=mx-t.x,dy=my-t.y;
if(dx*dx+dy*dy<400){showTechInfo(t)}
});
});
}

function drawTechTree(){
if(!techCtx)initTechCanvas();
var ctx=techCtx;
ctx.clearRect(0,0,520,580);
var ageColors=['#4a6a4a','#6a5a3a','#5a3a5a','#6a3a3a'];
var ageLabels=['석기시대','청동기시대','철기시대','고대국가'];
for(var a=0;a<4;a++){
ctx.fillStyle=ageColors[a]+'33';
ctx.fillRect(0,a*145,520,140);
ctx.fillStyle=ageColors[a];ctx.font='bold 10px sans-serif';ctx.textAlign='left';
ctx.fillText(ageLabels[a],8,a*145+14);
}
TECH_TREE.forEach(function(t){
t.prereq.forEach(function(pid){
var parent=TECH_TREE.find(function(p){return p.id===pid});
if(parent){
ctx.beginPath();ctx.moveTo(parent.x,parent.y);ctx.lineTo(t.x,t.y);
ctx.strokeStyle=t.unlocked&&parent.unlocked?'#FFD70088':'#3a3a4a66';
ctx.lineWidth=t.unlocked&&parent.unlocked?2:1;
ctx.setLineDash(t.unlocked?[]:[4,4]);ctx.stroke();ctx.setLineDash([]);
}
});
});
TECH_TREE.forEach(function(t){
var canUnlock=t.prereq.every(function(pid){var p=TECH_TREE.find(function(x){return x.id===pid});return p&&p.unlocked});
ctx.beginPath();ctx.arc(t.x,t.y,18,0,Math.PI*2);
if(t.unlocked){ctx.fillStyle='#2a5a2a';ctx.strokeStyle='#4CAF50';
}else if(canUnlock){ctx.fillStyle='#3a3a1a';ctx.strokeStyle='#FFD700';
}else{ctx.fillStyle='#2a2438';ctx.strokeStyle='#3a3a4a';}
ctx.lineWidth=2;ctx.fill();ctx.stroke();
ctx.font='16px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(t.icon,t.x,t.y);
ctx.font='bold 8px sans-serif';ctx.fillStyle=t.unlocked?'#4CAF50':'#8a8a9a';
ctx.fillText(t.name,t.x,t.y+28);
});
}

var techInfoEl=null;
function showTechInfo(tech){
playSFX('tech_unlock');
if(!techInfoEl){techInfoEl=document.createElement('div');techInfoEl.className='tt-info';}
techInfoEl.className='tt-info on';
var canUnlock=tech.prereq.every(function(pid){var p=TECH_TREE.find(function(x){return x.id===pid});return p&&p.unlocked});
var gold=0;try{var st=JSON.parse(localStorage.getItem('krpg_stats'))||{};gold=st.gold||0}catch(e){}
techInfoEl.innerHTML='<h4>'+tech.icon+' '+tech.name+(tech.unlocked?' <span style="color:#4CAF50">[연구 완료]</span>':'')+'</h4>'+
'<p>'+tech.desc+'</p>'+
'<p class="tt-cost">비용: '+tech.cost+' 금 (보유: '+gold+')</p>'+
(tech.unlocked?'':'<button class="tt-btn" id="tt-research-btn" '+(canUnlock&&gold>=tech.cost?'':'disabled')+'>연구 시작</button>');
if(!tech.unlocked){
setTimeout(function(){
var btn=document.getElementById('tt-research-btn');
if(btn)btn.onclick=function(){researchTech(tech)};
},50);
}
var wrap=techCanvas.parentElement;
if(wrap&&!wrap.contains(techInfoEl))wrap.appendChild(techInfoEl);
}

function researchTech(tech){
try{var st=JSON.parse(localStorage.getItem('krpg_stats'))||{};
if((st.gold||0)<tech.cost){showToast('금이 부족합니다!','#c0392b');return}
st.gold=(st.gold||0)-tech.cost;localStorage.setItem('krpg_stats',JSON.stringify(st));
}catch(e){return}
tech.unlocked=true;saveTechState();drawTechTree();showTechInfo(tech);
playSFX('tech_unlock');showToast(tech.name+' 연구 완료!','#2a5a2a');
checkV16Ach('tech_first');
var cnt=TECH_TREE.filter(function(t){return t.unlocked}).length;
if(cnt>=12)checkV16Ach('tech_half');
if(cnt>=24)checkV16Ach('tech_all');
}

// =============================================
// SECTION 4: HERO ENCYCLOPEDIA (12 heroes)
// =============================================
var HEROES=[
{id:'hwanwoong',name:'환웅',title:'천왕의 아들',icon:'👑',cls:'지휘관',era:'신시시대',hp:120,atk:18,def:15,spd:12,skill:'천부인',skillDesc:'하늘의 힘으로 아군 전체 버프. 공격력/방어력+20% 3턴',lore:'환인의 아들로 태백산에 하강하여 신시를 열고 인간 세상을 다스림. 풍백, 우사, 운사를 거느림.'},
{id:'dangun',name:'단군왕검',icon:'🏛️',title:'고조선 건국시조',cls:'군주',era:'고조선 건국기',hp:150,atk:20,def:18,spd:10,skill:'건국의 위엄',skillDesc:'적 전체 사기 저하. 공격력-15% 3턴',lore:'환웅과 웅녀의 아들. BC2333년 아사달에 도읍하여 고조선을 건국. 1500년간 통치 후 산신이 됨.'},
{id:'biru',name:'비류왕',icon:'⚔️',title:'부여의 용장',cls:'전사',era:'부여시대',hp:130,atk:22,def:12,spd:14,skill:'돌격 진형',skillDesc:'단일 적에게 공격력 200% 피해',lore:'부여 왕족 출신의 맹장. 기마전술에 능하고 창술의 달인으로 전장을 휩쓸었다.'},
{id:'yurihwa',name:'유리화',icon:'🏹',title:'신궁의 여전사',cls:'궁수',era:'고조선 중기',hp:90,atk:24,def:8,spd:18,skill:'관통사격',skillDesc:'일직선 3체 관통. 각 70% 데미지',lore:'고조선 최고의 궁수. 맥궁을 사용하여 100보 밖의 새를 맞추었다는 전설의 사수.'},
{id:'hwarang',name:'화랑',icon:'🌸',title:'풍월의 검객',cls:'검객',era:'고조선 후기',hp:100,atk:20,def:14,spd:16,skill:'풍월참',skillDesc:'연속 3회 공격. 각 60% 데미지',lore:'무예와 학문을 겸비한 청년 무사단. 심신을 수련하고 산천을 유람하며 의리를 다짐.'},
{id:'ungnyeo',name:'웅녀',icon:'🐻',title:'곰에서 인간이 된 여인',cls:'치유사',era:'신시시대',hp:80,atk:10,def:12,spd:8,skill:'신약 조제',skillDesc:'아군 1인 HP 50% 회복',lore:'100일간 쑥과 마늘만 먹고 인간이 된 곰. 환웅과 혼인하여 단군을 낳음.'},
{id:'haemosu',name:'해모수',icon:'☀️',title:'천제의 아들',cls:'기사',era:'부여 건국기',hp:140,atk:19,def:16,spd:13,skill:'오룡거',skillDesc:'기마 돌격. 범위 내 적 전체에 피해',lore:'하늘에서 내려온 전사. 오룡거를 타고 다녔으며, 동부여를 세운 천제의 아들.'},
{id:'wiman',name:'위만',icon:'🗡️',title:'위만조선 건국자',cls:'전략가',era:'위만조선',hp:110,atk:16,def:14,spd:11,skill:'권모술수',skillDesc:'적 1인 3턴간 행동불능',lore:'연나라 출신으로 준왕을 몰아내고 왕검성에서 위만조선을 세움. 철기문화를 적극 수용.'},
{id:'namryeo',name:'남려',icon:'🛡️',title:'고조선의 수비장',cls:'방패병',era:'고조선 후기',hp:160,atk:12,def:25,spd:7,skill:'철벽방어',skillDesc:'5턴간 아군 전체 피해 40% 감소',lore:'왕검성 방어의 최후 보루. 한나라 대군을 상대로 1년간 성을 지킨 전설의 방어 명장.'},
{id:'gyebaek',name:'계백',icon:'⚡',title:'결사대의 장군',cls:'돌격대장',era:'고조선 말기',hp:120,atk:23,def:10,spd:15,skill:'결사항전',skillDesc:'HP 30% 이하시 공격력 2배',lore:'죽음을 두려워하지 않는 결사대를 이끌고 적진으로 돌격하는 불굴의 장군.'},
{id:'soseono',name:'소서노',icon:'👸',title:'고구려의 어머니',cls:'정치가',era:'부여-고구려',hp:100,atk:14,def:16,spd:12,skill:'외교술',skillDesc:'아군 전체 사기+30%. 적 1인 투항 시도',lore:'졸본 부여 출신. 주몽을 도와 고구려를 건국하고, 이후 백제 건국을 지원한 위대한 여인.'},
{id:'jumong',name:'주몽',icon:'🏹',title:'고구려 건국시조',cls:'신궁',era:'고구려 건국기',hp:130,atk:25,def:13,spd:17,skill:'신궁의 일격',skillDesc:'치명타 확률 100%. 데미지 250%',lore:'동부여 금와왕의 양자. 뛰어난 활솜씨로 주몽(활 잘 쏘는 사람)이라 불림. BC37년 고구려 건국.'}
];

// =============================================
// SECTION 5: HISTORY ENCYCLOPEDIA (30 entries)
// =============================================
var ENCYCLOPEDIA=[
{id:'enc_gojoseon',title:'고조선 건국',icon:'🏛️',cat:'국가',body:'BC2333년 단군왕검이 아사달에 도읍하여 세운 한국 최초의 국가. 홍익인간의 건국이념을 내세우고 팔조법금으로 사회질서를 유지했다.'},
{id:'enc_dangun_myth',title:'단군신화',icon:'📖',cat:'신화',body:'환인의 아들 환웅이 태백산에 내려와 신시를 열었다. 곰과 호랑이가 인간이 되길 원했고, 곰이 100일간 수련하여 웅녀가 되어 환웅과 혼인, 단군을 낳았다.'},
{id:'enc_bronze_dagger',title:'비파형 동검',icon:'🗡️',cat:'유물',body:'고조선의 대표적 청동기 유물. 칼날이 비파 모양인 것이 특징. 요령 지방에서 한반도까지 분포하며 고조선의 세력 범위를 보여준다.'},
{id:'enc_dolmen',title:'고인돌',icon:'🪨',cat:'유물',body:'청동기 시대의 무덤. 한반도에 세계 고인돌의 40% 이상이 집중. 탁자식(북방식)과 바둑판식(남방식)이 있다. 지배층의 무덤으로 추정.'},
{id:'enc_8laws',title:'팔조법금',icon:'⚖️',cat:'제도',body:'고조선의 법률. 현재 3조만 전해짐: 사람을 죽인 자는 사형, 상해를 입힌 자는 곡물로 배상, 도둑질한 자는 노비가 됨. 생명과 사유재산을 중시했음을 보여준다.'},
{id:'enc_wiman',title:'위만조선',icon:'👤',cat:'국가',body:'BC194년 연나라 사람 위만이 준왕을 몰아내고 세운 나라. 철기문화를 수용하고 중계무역으로 번성했으나 BC108년 한나라 무제의 침략으로 멸망.'},
{id:'enc_4_commanderies',title:'한사군',icon:'🗺️',cat:'역사',body:'BC108년 한나라가 위만조선 멸망 후 설치한 4개 군현. 낙랑, 진번, 임둔, 현도. 대부분 토착민의 저항으로 조기 폐지되고 낙랑군만 313년까지 존속.'},
{id:'enc_buyeo',title:'부여',icon:'🏔️',cat:'국가',body:'만주 송화강 유역에 세워진 고대 국가. 5부족 연맹체로 왕이 다스렸다. 영고라는 제천행사를 거행. 순장 풍습이 있었으며 고구려, 백제의 원류가 됨.'},
{id:'enc_samhan',title:'삼한',icon:'🌿',cat:'국가',body:'한반도 남부의 마한, 진한, 변한. 마한이 가장 컸으며 54개국, 진한과 변한은 각 12개국. 철기문화가 발달했으며 특히 변한은 철 생산과 수출로 유명.'},
{id:'enc_yeonggo',title:'영고',icon:'🎶',cat:'문화',body:'부여의 제천행사. 12월에 하늘에 제사를 지내고 가무를 즐기며 죄수를 풀어주었다. 동예의 무천, 고구려의 동맹, 삼한의 계절제와 유사한 성격.'},
{id:'enc_iron_culture',title:'철기 문화',icon:'⛏️',cat:'기술',body:'BC3세기경 한반도에 전래. 철제 농기구로 농업 생산력이 비약적으로 향상되고, 철제 무기로 군사력이 강화됨. 변한의 철은 화폐처럼 사용됨.'},
{id:'enc_ondol',title:'온돌',icon:'🔥',cat:'기술',body:'한반도 고유의 난방 시스템. 아궁이에서 불을 때면 연기가 방 바닥 아래 고래를 통과하며 바닥을 데움. 고조선 시대부터 원시적 형태가 존재.'},
{id:'enc_soodo',title:'소도',icon:'⛩️',cat:'문화',body:'삼한의 신성 지역. 큰 나무에 방울과 북을 매달아 천신에 제사. 죄인이 이곳으로 도망치면 잡아가지 못하는 성역. 제정분리의 증거.'},
{id:'enc_jeongol',title:'정골 문화',icon:'🦴',cat:'문화',body:'고조선의 장례 문화. 큰 돌무덤(고인돌), 돌무지무덤 등 다양한 형태. 부장품으로 청동검, 거울, 꺾창 등을 함께 매장하여 내세를 믿었음을 보여줌.'},
{id:'enc_mac_bow',title:'맥궁',icon:'🏹',cat:'무기',body:'고조선의 대표적 활. 강한 탄력의 합성궁으로 사거리와 관통력이 뛰어남. 후에 고구려의 맥궁으로 이어져 중국에서도 두려움의 대상이 됨.'},
{id:'enc_bronze_mirror',title:'다뉴세문경',icon:'🪞',cat:'유물',body:'청동기 시대의 거울. 잔무늬가 세밀하게 새겨진 것이 특징. 1만 3천여 개의 선이 새겨져 당시의 뛰어난 금속 가공 기술을 보여주는 국보급 유물.'},
{id:'enc_jumong',title:'주몽의 건국',icon:'🏹',cat:'역사',body:'BC37년 주몽이 졸본에서 고구려를 건국. 동부여에서 탈출하여 비류, 온조와 함께 남하. 뛰어난 활솜씨와 리더십으로 건국의 기틀을 마련.'},
{id:'enc_wanggeom',title:'왕검성 전투',icon:'⚔️',cat:'전투',body:'BC109~108년 한나라 무제의 위만조선 침략 전쟁. 수륙 양면 공격을 받았으나 1년간 항전. 내부 분열로 우거왕이 살해되며 결국 함락.'},
{id:'enc_trade',title:'중계무역',icon:'🛤️',cat:'경제',body:'위만조선은 한반도 남부의 진국과 한나라 사이에서 중계무역을 독점. 이를 통해 막대한 부를 축적했으나 한나라의 침략 원인이 되기도 함.'},
{id:'enc_cheonshin',title:'천신 숭배',icon:'☀️',cat:'신앙',body:'고조선의 핵심 신앙. 하늘을 최고신으로 숭배하고 제천의식을 거행. 환인(하늘신)-환웅-단군으로 이어지는 천손 사상이 건국이념의 근간.'},
{id:'enc_sodo_chief',title:'천군',icon:'🧙',cat:'제도',body:'삼한에서 소도를 관할하는 제사장. 정치적 지배자인 군장과는 별개로 종교적 권위를 가짐. 제정분리의 전형적 사례.'},
{id:'enc_gojoseon_territory',title:'고조선의 영토',icon:'🗺️',cat:'역사',body:'초기에는 요동~한반도 북부. 전성기에는 요하 이동~한반도 중부까지 확장. 비파형동검, 미송리식 토기 등의 분포를 통해 영토 범위를 추정.'},
{id:'enc_mumun',title:'민무늬 토기',icon:'🏺',cat:'유물',body:'청동기~초기 철기 시대의 대표 토기. 무늬가 없는 것이 특징. 빗살무늬토기에서 발전한 형태로 농경 생활의 확산과 관련.'},
{id:'enc_misongri',title:'미송리식 토기',icon:'🫖',cat:'유물',body:'고조선의 대표적 토기 양식. 팽이형 토기라고도 함. 요동~한반도 서북부에 분포하여 고조선의 중심지와 영역을 파악하는 중요한 유물.'},
{id:'enc_yeongje',title:'제천의식',icon:'🎭',cat:'문화',body:'고대 국가들의 하늘 제사. 고구려 동맹(10월), 동예 무천(10월), 부여 영고(12월), 삼한 계절제. 공동체의 결속과 농사의 풍년을 기원.'},
{id:'enc_okjeo',title:'옥저',icon:'🐟',cat:'국가',body:'함경도 해안 지역의 소국. 어물, 소금 등 해산물이 풍부. 민며느리제(데릴사위제)와 골장제(가족 공동 무덤)라는 독특한 풍습이 있었음.'},
{id:'enc_dongye',title:'동예',icon:'🐯',cat:'국가',body:'강원도 영동 지역의 소국. 단궁, 과하마, 반어피 등 특산물이 유명. 무천이라는 제천행사를 거행. 같은 부족끼리 혼인하는 족외혼 금지(동성불혼).'},
{id:'enc_hongik',title:'홍익인간',icon:'💡',cat:'이념',body:'널리 인간을 이롭게 한다는 뜻. 고조선의 건국이념이자 한국 교육의 기본 이념. 삼국유사에 기록되어 있으며 민주주의적 정신의 원류로 평가.'},
{id:'enc_menhir',title:'선돌',icon:'🗿',cat:'유물',body:'청동기 시대의 대표적 석조물. 큰 돌을 세워 경계 표시, 신앙의 대상, 기념물로 사용. 고인돌과 함께 지석묘 문화의 핵심 요소.'},
{id:'enc_gungye',title:'궁예',icon:'👁️',cat:'역사',body:'후고구려(태봉)의 건국자. 미륵불을 자처하며 관심법을 사용했다고 전해짐. 폭정으로 왕건에게 축출되었으나 고구려 계승의식을 보여줌.'}
];

// =============================================
// SECTION 6: FORMATION EDITOR (Canvas)
// =============================================
var FORMATIONS=[
{id:'crane_wing',name:'학익진',icon:'🦅',desc:'양쪽 날개로 포위. 공격+15%',bonus:{atk:15}},
{id:'fish_scale',name:'어인진',icon:'🐟',desc:'촘촘한 비늘처럼 방어. 방어+20%',bonus:{def:20}},
{id:'long_snake',name:'장사진',icon:'🐍',desc:'긴 줄로 기동. 이동+2',bonus:{move:2}},
{id:'square',name:'방원진',icon:'⬜',desc:'사각형 균형 진형. 공방+10%',bonus:{atk:10,def:10}},
{id:'arrow',name:'추형진',icon:'🔺',desc:'화살촉 돌격. 공격+25% 방어-10%',bonus:{atk:25,def:-10}},
{id:'circle',name:'원진',icon:'⭕',desc:'원형 수비. 방어+30% 이동-1',bonus:{def:30,move:-1}}
];
var currentFormation='crane_wing';
function loadFormation(){try{currentFormation=localStorage.getItem('krpg_formation')||'crane_wing'}catch(e){}}
function saveFormation(){localStorage.setItem('krpg_formation',currentFormation)}

var formCanvas=null,formCtx=null;
function initFormCanvas(){
formCanvas=document.createElement('canvas');formCanvas.width=400;formCanvas.height=300;
formCtx=formCanvas.getContext('2d');
}

function drawFormation(fid){
if(!formCtx)initFormCanvas();
var ctx=formCtx;ctx.clearRect(0,0,400,300);
ctx.fillStyle='#0a1a0a';ctx.fillRect(0,0,400,300);
for(var gx=0;gx<400;gx+=40){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,300);ctx.strokeStyle='#1a2a1a';ctx.stroke()}
for(var gy=0;gy<300;gy+=40){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(400,gy);ctx.strokeStyle='#1a2a1a';ctx.stroke()}

var positions={
crane_wing:[[200,80],[120,120],[280,120],[80,180],[320,180],[120,220],[280,220],[160,160],[240,160]],
fish_scale:[[200,60],[160,100],[240,100],[120,140],[200,140],[280,140],[160,180],[240,180],[200,220]],
long_snake:[[200,40],[200,80],[200,120],[200,160],[200,200],[200,240],[160,120],[240,120],[160,200]],
square:[[120,80],[200,80],[280,80],[120,160],[280,160],[120,240],[200,240],[280,240],[200,160]],
arrow:[[200,60],[160,120],[240,120],[120,180],[200,140],[280,180],[160,240],[240,240],[200,200]],
circle:[[200,60],[280,100],[320,180],[280,260],[200,280],[120,260],[80,180],[120,100],[200,170]]
};
var pts=positions[fid]||positions.crane_wing;
var icons=['👑','⚔️','🏹','🛡️','🗡️','🔮','🐎','🪓','⚡'];
pts.forEach(function(p,i){
ctx.beginPath();ctx.arc(p[0],p[1],16,0,Math.PI*2);
ctx.fillStyle=i===0?'rgba(255,215,0,.15)':'rgba(95,160,255,.1)';
ctx.strokeStyle=i===0?'#FFD700':'#5FA0FF';ctx.lineWidth=2;ctx.fill();ctx.stroke();
ctx.font='14px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(icons[i],p[0],p[1]);
});
var form=FORMATIONS.find(function(f){return f.id===fid});
if(form){
ctx.font='bold 14px sans-serif';ctx.fillStyle='#FFD700';ctx.textAlign='center';
ctx.fillText(form.icon+' '+form.name,200,20);
ctx.font='10px sans-serif';ctx.fillStyle='#8a7a6a';
ctx.fillText(form.desc,200,290);
}
}

// =============================================
// SECTION 7: FACTION RELATIONS MAP (Canvas)
// =============================================
var FACTIONS=[
{id:'gojoseon',name:'고조선',x:260,y:80,color:'#FFD700',size:22},
{id:'buyeo',name:'부여',x:400,y:60,color:'#5FA0FF',size:18},
{id:'han',name:'한나라',x:100,y:140,color:'#ff4444',size:20},
{id:'samhan',name:'삼한',x:300,y:240,color:'#66BB6A',size:16},
{id:'ye',name:'예',x:440,y:160,color:'#ce93d8',size:14},
{id:'okjeo',name:'옥저',x:460,y:100,color:'#4dd0e1',size:12},
{id:'dongye',name:'동예',x:420,y:220,color:'#ffb74d',size:14},
{id:'jinhan',name:'진한',x:350,y:280,color:'#a5d6a7',size:12}
];
var RELATIONS=[
{from:'gojoseon',to:'buyeo',type:'ally',label:'우호'},
{from:'gojoseon',to:'han',type:'hostile',label:'대립'},
{from:'gojoseon',to:'samhan',type:'neutral',label:'교류'},
{from:'buyeo',to:'okjeo',type:'ally',label:'복속'},
{from:'han',to:'samhan',type:'neutral',label:'교역'},
{from:'samhan',to:'dongye',type:'neutral',label:'교류'},
{from:'ye',to:'okjeo',type:'ally',label:'우호'},
{from:'gojoseon',to:'ye',type:'neutral',label:'조공'},
{from:'buyeo',to:'dongye',type:'neutral',label:'인접'}
];
var fmapCanvas=null,fmapCtx=null;
function initFmapCanvas(){fmapCanvas=document.createElement('canvas');fmapCanvas.width=520;fmapCanvas.height=340;fmapCtx=fmapCanvas.getContext('2d')}

function drawFactionMap(){
if(!fmapCtx)initFmapCanvas();
var ctx=fmapCtx;ctx.clearRect(0,0,520,340);
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,520,340);
RELATIONS.forEach(function(r){
var f1=FACTIONS.find(function(f){return f.id===r.from});
var f2=FACTIONS.find(function(f){return f.id===r.to});
if(!f1||!f2)return;
ctx.beginPath();ctx.moveTo(f1.x,f1.y);ctx.lineTo(f2.x,f2.y);
ctx.strokeStyle=r.type==='ally'?'#4CAF5066':r.type==='hostile'?'#f4433666':'#FFD70033';
ctx.lineWidth=r.type==='hostile'?2:1;
ctx.setLineDash(r.type==='neutral'?[4,4]:[]);ctx.stroke();ctx.setLineDash([]);
var mx=(f1.x+f2.x)/2,my=(f1.y+f2.y)/2;
ctx.font='8px sans-serif';ctx.fillStyle='#5a5a6a';ctx.textAlign='center';
ctx.fillText(r.label,mx,my-4);
});
FACTIONS.forEach(function(f){
ctx.beginPath();ctx.arc(f.x,f.y,f.size,0,Math.PI*2);
ctx.fillStyle=f.color+'22';ctx.strokeStyle=f.color;ctx.lineWidth=2;ctx.fill();ctx.stroke();
ctx.font='bold 11px sans-serif';ctx.fillStyle=f.color;ctx.textAlign='center';
ctx.fillText(f.name,f.x,f.y+f.size+14);
});
ctx.font='bold 12px sans-serif';ctx.fillStyle='#5a4a3a';ctx.textAlign='left';
ctx.fillText('고대 한반도 세력 관계도',10,20);
}

// =============================================
// SECTION 8: BATTLE REPLAY
// =============================================
var battleLogs=[];
function loadBattleLogs(){try{battleLogs=JSON.parse(localStorage.getItem('krpg_replays'))||[]}catch(e){battleLogs=[]}}
function saveBattleLogs(){localStorage.setItem('krpg_replays',JSON.stringify(battleLogs.slice(-20)))}

function recordBattle(title,log){
battleLogs.push({
id:Date.now(),
title:title,
date:new Date().toLocaleDateString('ko-KR'),
log:log,
result:log[log.length-1]&&log[log.length-1].indexOf('승리')>=0?'win':'lose'
});
saveBattleLogs();
checkV16Ach('replay_first');
}

// =============================================
// SECTION 9: DAILY MISSIONS (4 types)
// =============================================
var DAILY_MISSIONS=[
{id:'dm_battle',title:'전투 3회',icon:'⚔️',desc:'전투에서 3회 승리하세요',target:3,key:'wins'},
{id:'dm_quiz',title:'퀴즈 5문제',icon:'📝',desc:'퀴즈를 5문제 맞추세요',target:5,key:'quizOk'},
{id:'dm_tech',title:'기술 연구',icon:'🔬',desc:'기술 1개를 연구하세요',target:1,key:'techResearched'},
{id:'dm_explore',title:'도감 열람',icon:'📖',desc:'백과사전 3개 항목 열람',target:3,key:'encViewed'}
];

var dailyState={};
function getDailyKey(){return 'krpg_daily_'+new Date().toISOString().slice(0,10)}
function loadDailyState(){try{dailyState=JSON.parse(localStorage.getItem(getDailyKey()))||{};
if(!dailyState.streak)dailyState.streak=0}catch(e){dailyState={streak:0}}}
function saveDailyState(){localStorage.setItem(getDailyKey(),JSON.stringify(dailyState))}
function updateDailyProgress(key,amount){
loadDailyState();
dailyState[key]=(dailyState[key]||0)+amount;
var allDone=DAILY_MISSIONS.every(function(m){return(dailyState[m.key]||0)>=m.target});
if(allDone&&!dailyState.allDone){dailyState.allDone=true;dailyState.streak=(dailyState.streak||0)+1;
playSFX('daily_done');showToast('일일 임무 전체 완료! 연속 '+dailyState.streak+'일','#2a5a2a');
checkV16Ach('daily_all');}
saveDailyState();
}

// =============================================
// SECTION 10: RANKING BOARD (AI 10 opponents)
// =============================================
var AI_PLAYERS=[
{name:'태왕 고주몽',score:9500,grade:'S'},
{name:'명궁 유리화',score:8800,grade:'S'},
{name:'철벽 남려장군',score:8200,grade:'A'},
{name:'광개토대제',score:7800,grade:'A'},
{name:'무열 김춘추',score:7200,grade:'A'},
{name:'해동성국 대조영',score:6500,grade:'B'},
{name:'풍월주 김유신',score:5800,grade:'B'},
{name:'삼별초 배중손',score:5200,grade:'B'},
{name:'충무공 이순신',score:4500,grade:'C'},
{name:'세종대왕',score:3800,grade:'C'}
];

function getPlayerScore(){
try{var st=JSON.parse(localStorage.getItem('krpg_stats'))||{};
var ach=JSON.parse(localStorage.getItem('krpg_ach'))||[];
return (st.wins||0)*100+(st.quizOk||0)*50+ach.length*30+(st.gold||0)}catch(e){return 0}
}

function getPlayerGrade(score){
if(score>=9000)return 'S';if(score>=7000)return 'A';if(score>=5000)return 'B';if(score>=3000)return 'C';return 'D';
}

// =============================================
// SECTION 11: STRATEGY GUIDE (12 tips)
// =============================================
var STRATEGY_GUIDE=[
{title:'진형 선택의 기본',icon:'🦅',body:'학익진은 공격, 어인진은 방어에 유리합니다. 상대 편성을 보고 진형을 바꾸세요. 궁수가 많으면 장사진으로 빠르게 접근하는 것이 좋습니다.'},
{title:'자원 관리 전략',icon:'💰',body:'금은 기술 연구에 우선 투자하세요. 석기→청동기→철기 순서로 진행하면 전투력이 급상승합니다. 식량은 안정적으로 유지하세요.'},
{title:'영웅 조합 가이드',icon:'👥',body:'탱커(남려)+딜러(주몽)+힐러(웅녀) 기본 조합이 안정적입니다. PvE에서는 화랑의 연속 공격이 보스전에 효과적입니다.'},
{title:'보스전 공략법',icon:'👹',body:'보스전에서는 방어 위주로 시작하세요. 보스의 패턴을 파악한 후 스킬을 집중 사용합니다. 아이템(회복약)을 아끼지 마세요.'},
{title:'퀴즈 고득점 비결',icon:'📝',body:'역사 백과사전을 먼저 읽으면 퀴즈가 쉬워집니다. 기술 트리에서 학당을 연구하면 힌트가 제공됩니다.'},
{title:'외교 활용법',icon:'🤝',body:'부여와 우호관계를 유지하면 병력 지원을 받을 수 있습니다. 한나라와는 필요시에만 교역하고, 삼한과의 교류로 자원을 확보하세요.'},
{title:'장비 강화 순서',icon:'⚔️',body:'무기→갑옷→장신구 순으로 강화하세요. 철검+철갑옷 조합이 가성비 최고입니다. 옥비수는 금이 충분할 때 구입하세요.'},
{title:'첩보 운용 전략',icon:'🕵️',body:'정찰 임무를 먼저 수행하여 적의 약점을 파악하세요. 이간계는 강력하지만 실패 시 외교 관계가 악화됩니다.'},
{title:'야영 시스템 활용',icon:'⛺',body:'큰 전투 전에 반드시 야영하여 HP를 회복하세요. 훈련으로 경험치를 얻고, 정비로 장비 효과를 높일 수 있습니다.'},
{title:'카드 게임 필승법',icon:'🃏',body:'전설급 카드(단군의 축복, 천부인)는 보스전에 아껴두세요. 일반 카드는 잡졸전에 소비하고, 희귀 카드는 중간 보스에 사용합니다.'},
{title:'기술 트리 우선순위',icon:'🔬',body:'초기에는 농경→청동주조→관개수로 순서가 효율적. 중반부터 철기제련→성곽축조로 군사력을 확보하세요.'},
{title:'일일 미션 빠른 완료',icon:'📋',body:'전투 3회→퀴즈 5문제→기술 연구→도감 열람 순서로 진행하면 가장 빠릅니다. 연속 달성 시 보너스가 누적됩니다.'}
];

// =============================================
// SECTION 12: STATS DASHBOARD (Canvas radar)
// =============================================
var statsCanvas=null,statsCtx=null;
function initStatsCanvas(){statsCanvas=document.createElement('canvas');statsCanvas.width=360;statsCanvas.height=360;statsCtx=statsCanvas.getContext('2d')}

function drawStatsRadar(){
if(!statsCtx)initStatsCanvas();
var ctx=statsCtx;ctx.clearRect(0,0,360,360);
var cx=180,cy=180,maxR=130;
var labels=['전투력','지식','외교','자원','업적','기술'];
var st;try{st=JSON.parse(localStorage.getItem('krpg_stats'))||{}}catch(e){st={}}
var ach;try{ach=JSON.parse(localStorage.getItem('krpg_ach'))||[]}catch(e){ach=[]}
var techCnt=TECH_TREE.filter(function(t){return t.unlocked}).length;
var vals=[
Math.min((st.wins||0)/20,1),
Math.min((st.quizOk||0)/50,1),
Math.min((st.diploActions||0)/30,1),
Math.min((st.gold||0)/5000,1),
Math.min(ach.length/84,1),
Math.min(techCnt/24,1)
];
for(var ring=1;ring<=5;ring++){
ctx.beginPath();
for(var i=0;i<6;i++){
var angle=Math.PI*2/6*i-Math.PI/2;
var r=maxR*ring/5;
var px=cx+Math.cos(angle)*r,py=cy+Math.sin(angle)*r;
if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
}
ctx.closePath();ctx.strokeStyle='#2a2a3a';ctx.stroke();
}
for(var i=0;i<6;i++){
var angle=Math.PI*2/6*i-Math.PI/2;
ctx.beginPath();ctx.moveTo(cx,cy);
ctx.lineTo(cx+Math.cos(angle)*maxR,cy+Math.sin(angle)*maxR);
ctx.strokeStyle='#2a2a3a';ctx.stroke();
ctx.font='bold 10px sans-serif';ctx.fillStyle='#8a7a6a';ctx.textAlign='center';
var lx=cx+Math.cos(angle)*(maxR+18),ly=cy+Math.sin(angle)*(maxR+18);
ctx.fillText(labels[i],lx,ly+4);
}
ctx.beginPath();
for(var i=0;i<6;i++){
var angle=Math.PI*2/6*i-Math.PI/2;
var r=maxR*vals[i];
var px=cx+Math.cos(angle)*r,py=cy+Math.sin(angle)*r;
if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
}
ctx.closePath();ctx.fillStyle='rgba(255,215,0,.15)';ctx.fill();
ctx.strokeStyle='#FFD700';ctx.lineWidth=2;ctx.stroke();
for(var i=0;i<6;i++){
var angle=Math.PI*2/6*i-Math.PI/2;
var r=maxR*vals[i];
ctx.beginPath();ctx.arc(cx+Math.cos(angle)*r,cy+Math.sin(angle)*r,4,0,Math.PI*2);
ctx.fillStyle='#FFD700';ctx.fill();
}
}

// =============================================
// SECTION 13: QUIZ v16 (+15 questions, 120→135)
// =============================================
var V16_QUIZ=[
{q:'고조선의 건국이념은?',a:['홍익인간','충효사상','인의예지','선비정신'],c:0},
{q:'비파형동검이 분포하는 지역은?',a:['요동~한반도','일본열도','중앙아시아','동남아시아'],c:0},
{q:'부여의 제천행사 이름은?',a:['영고','무천','동맹','팔관회'],c:0},
{q:'삼한에서 천신을 모시는 성역은?',a:['소도','사직','종묘','성황당'],c:0},
{q:'위만조선이 멸망한 해는?',a:['BC108년','BC194년','BC57년','BC37년'],c:0},
{q:'한사군 중 가장 오래 존속한 것은?',a:['낙랑군','진번군','임둔군','현도군'],c:0},
{q:'다뉴세문경은 어떤 재질인가?',a:['청동','철','금','옥'],c:0},
{q:'고인돌의 북방식 형태는?',a:['탁자식','바둑판식','돌무지식','적석식'],c:0},
{q:'옥저의 독특한 혼인 풍습은?',a:['민며느리제','족외혼','서옥제','데릴사위'],c:0},
{q:'동예의 특산물이 아닌 것은?',a:['비단','단궁','과하마','반어피'],c:0},
{q:'고조선의 법률은?',a:['팔조법금','대전회통','경국대전','율령'],c:0},
{q:'천군이 관할하는 곳은?',a:['소도','왕궁','시장','군영'],c:0},
{q:'주몽이 건국한 나라는?',a:['고구려','백제','신라','부여'],c:0},
{q:'변한이 유명한 특산물은?',a:['철','소금','비단','인삼'],c:0},
{q:'미송리식 토기의 별명은?',a:['팽이형토기','빗살무늬','무문토기','흑도'],c:0}
];

function registerV16Quiz(){
try{
var quizBank=JSON.parse(localStorage.getItem('krpg_quiz_bank'))||[];
V16_QUIZ.forEach(function(q){
var exists=quizBank.some(function(e){return e.q===q.q});
if(!exists)quizBank.push(q);
});
localStorage.setItem('krpg_quiz_bank',JSON.stringify(quizBank));
}catch(e){}
if(window._v10&&window._v10.addQuizQuestions){window._v10.addQuizQuestions(V16_QUIZ)}
}

// =============================================
// SECTION 14: ACHIEVEMENTS (+12, 72→84)
// =============================================
var V16_ACH=[
{id:'tech_first',name:'첫 연구',desc:'기술을 처음으로 연구했다',icon:'🔬'},
{id:'tech_half',name:'중견 학자',desc:'기술 12개 이상 연구',icon:'📚'},
{id:'tech_all',name:'만물박사',desc:'기술 24개 전부 연구 완료',icon:'🎓'},
{id:'hero_viewer',name:'영웅 탐험가',desc:'영웅 도감을 열어보았다',icon:'👤'},
{id:'enc_reader',name:'역사 덕후',desc:'백과사전 10개 이상 열람',icon:'📖'},
{id:'enc_master',name:'역사학자',desc:'백과사전 30개 전부 열람',icon:'🏛️'},
{id:'form_changer',name:'진형 전문가',desc:'6개 진형 모두 시험',icon:'🦅'},
{id:'replay_first',name:'전투 기록관',desc:'전투 리플레이 1회 이상',icon:'📹'},
{id:'daily_all',name:'일일 달성',desc:'일일 임무 전부 완료',icon:'✅'},
{id:'rank_top3',name:'상위 3위',desc:'랭킹 3위 이내 달성',icon:'🥇'},
{id:'guide_reader',name:'전략의 달인',desc:'전략 가이드 전부 열람',icon:'📋'},
{id:'v16_explorer',name:'v16 탐험가',desc:'v16 기능 8개 이상 사용',icon:'🌟'}
];

var v16AchState=[];
function loadV16Ach(){try{v16AchState=JSON.parse(localStorage.getItem('krpg_v16_ach'))||[]}catch(e){v16AchState=[]}}
function saveV16Ach(){localStorage.setItem('krpg_v16_ach',JSON.stringify(v16AchState))}
function checkV16Ach(id){
if(v16AchState.indexOf(id)>=0)return;
var ach=V16_ACH.find(function(a){return a.id===id});
if(!ach)return;
v16AchState.push(id);saveV16Ach();
try{var all=JSON.parse(localStorage.getItem('krpg_ach'))||[];
if(all.indexOf('v16_'+id)<0){all.push('v16_'+id);localStorage.setItem('krpg_ach',JSON.stringify(all))}
}catch(e){}
playSFX('daily_done');showToast('업적 달성: '+ach.icon+' '+ach.name,'#5a3a1a');
}

// =============================================
// SECTION 15: PANEL RENDERERS
// =============================================
function createPanel(id,title,subtitle){
var existing=document.getElementById(id);if(existing)existing.remove();
var p=document.createElement('div');p.id=id;p.className='v16-panel';
p.innerHTML='<h2>'+title+'</h2><p class="v16-subtitle">'+subtitle+'</p>';
document.body.appendChild(p);return p;
}

function renderTechTreePanel(){
var p=createPanel('v16-tech','🔬 기술 트리','4시대 24개 기술을 연구하세요');
var wrap=document.createElement('div');wrap.className='tt-canvas-wrap';
drawTechTree();wrap.appendChild(techCanvas);p.appendChild(wrap);
p.innerHTML+='<p class="v16-subtitle">연구 완료: '+TECH_TREE.filter(function(t){return t.unlocked}).length+'/24</p>';
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-tech\').classList.remove(\'on\')">닫기</button>';
checkV16Ach('v16_explorer');
}

function renderHeroPediaPanel(){
var p=createPanel('v16-heroes','👑 영웅 도감','고대 한국의 영웅들');
var grid=document.createElement('div');grid.className='v16-grid';
HEROES.forEach(function(h){
var card=document.createElement('div');card.className='hero-card';
card.innerHTML='<div class="hc-portrait">'+h.icon+'</div><div class="hc-name">'+h.name+'</div>'+
'<div class="hc-title">'+h.title+'</div><div class="hc-class">'+h.cls+' | '+h.era+'</div>';
card.onclick=function(){showHeroDetail(h,p)};
grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-heroes\').classList.remove(\'on\')">닫기</button>';
playSFX('hero_open');checkV16Ach('hero_viewer');
}

function showHeroDetail(hero,panel){
var existing=panel.querySelector('.hero-detail');if(existing)existing.remove();
var d=document.createElement('div');d.className='hero-detail';
d.style.cssText='max-width:500px;margin:12px auto;background:rgba(26,20,40,.95);border:2px solid #FFD700;border-radius:12px;padding:16px';
d.innerHTML='<div style="text-align:center;font-size:48px;margin-bottom:8px">'+hero.icon+'</div>'+
'<h3 style="color:#FFD700;text-align:center;font-size:16px">'+hero.name+'</h3>'+
'<p style="color:#c4956a;text-align:center;font-size:11px;margin-bottom:8px">'+hero.title+' | '+hero.cls+' | '+hero.era+'</p>'+
'<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:10px">'+
'<span style="font-size:10px;color:#ff6644">HP '+hero.hp+'</span>'+
'<span style="font-size:10px;color:#ff9800">ATK '+hero.atk+'</span>'+
'<span style="font-size:10px;color:#5FA0FF">DEF '+hero.def+'</span>'+
'<span style="font-size:10px;color:#66BB6A">SPD '+hero.spd+'</span></div>'+
'<div style="background:rgba(100,60,20,.2);border:1px solid #5a4a3a;border-radius:8px;padding:10px;margin-bottom:8px">'+
'<p style="font-size:11px;color:#FFD700;font-weight:700">'+hero.skill+'</p>'+
'<p style="font-size:10px;color:#8a7a6a">'+hero.skillDesc+'</p></div>'+
'<p style="font-size:11px;color:#8a7a6a;line-height:1.8">'+hero.lore+'</p>';
panel.querySelector('.v16-grid').before(d);
}

function renderEncyclopediaPanel(){
var p=createPanel('v16-enc','📖 역사 백과사전','고조선~삼한 시대의 모든 것');
var search=document.createElement('input');search.className='v16-search';search.type='text';
search.placeholder='검색어를 입력하세요...';p.appendChild(search);
var tabs=document.createElement('div');tabs.className='v16-tabs';
var cats=['전체','국가','유물','문화','역사','제도','기술','신앙','전투','경제','무기','이념'];
var currentCat='전체';
cats.forEach(function(cat){
var btn=document.createElement('button');btn.className='v16-tab'+(cat==='전체'?' active':'');btn.textContent=cat;
btn.onclick=function(){
tabs.querySelectorAll('.v16-tab').forEach(function(b){b.classList.remove('active')});
btn.classList.add('active');currentCat=cat;filterEnc()};
tabs.appendChild(btn);
});
p.appendChild(tabs);
var list=document.createElement('div');list.className='v16-list';list.id='v16-enc-list';p.appendChild(list);

var encViewed={};
try{encViewed=JSON.parse(localStorage.getItem('krpg_enc_viewed'))||{}}catch(e){}

function filterEnc(){
var q=(search.value||'').toLowerCase();
list.innerHTML='';
ENCYCLOPEDIA.forEach(function(e){
if(currentCat!=='전체'&&e.cat!==currentCat)return;
if(q&&e.title.toLowerCase().indexOf(q)<0&&e.body.toLowerCase().indexOf(q)<0)return;
var item=document.createElement('div');item.className='enc-item'+(encViewed[e.id]?' open':'');
item.innerHTML='<div class="ei-head"><span class="ei-icon">'+e.icon+'</span>'+
'<span class="ei-title">'+e.title+'</span><span class="ei-cat">'+e.cat+'</span></div>'+
'<div class="ei-body">'+e.body+'</div>';
item.onclick=function(){
item.classList.toggle('open');playSFX('enc_browse');
if(!encViewed[e.id]){encViewed[e.id]=true;localStorage.setItem('krpg_enc_viewed',JSON.stringify(encViewed));
updateDailyProgress('encViewed',1);
var cnt=Object.keys(encViewed).length;
if(cnt>=10)checkV16Ach('enc_reader');
if(cnt>=30)checkV16Ach('enc_master');
}};
list.appendChild(item);
});
if(list.childNodes.length===0)list.innerHTML='<p style="text-align:center;color:#5a5a6a;font-size:11px;padding:20px">검색 결과가 없습니다</p>';
}
search.addEventListener('input',filterEnc);
filterEnc();
p.innerHTML+='<p class="v16-subtitle">열람: '+Object.keys(encViewed).length+'/'+ENCYCLOPEDIA.length+'</p>';
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-enc\').classList.remove(\'on\')">닫기</button>';
}

function renderFormationPanel(){
var p=createPanel('v16-form','🦅 진형 에디터','전투 진형을 선택하고 확인하세요');
var controls=document.createElement('div');controls.className='form-controls';
FORMATIONS.forEach(function(f){
var btn=document.createElement('button');btn.className='form-ctrl-btn'+(f.id===currentFormation?' active':'');
btn.textContent=f.icon+' '+f.name;
btn.onclick=function(){
controls.querySelectorAll('.form-ctrl-btn').forEach(function(b){b.classList.remove('active')});
btn.classList.add('active');currentFormation=f.id;saveFormation();drawFormation(f.id);
playSFX('form_place');
var usedForms;try{usedForms=JSON.parse(localStorage.getItem('krpg_used_forms'))||[]}catch(e){usedForms=[]}
if(usedForms.indexOf(f.id)<0){usedForms.push(f.id);localStorage.setItem('krpg_used_forms',JSON.stringify(usedForms));}
if(usedForms.length>=6)checkV16Ach('form_changer');
showToast(f.name+' 선택: '+f.desc,'#2a2438');
};
controls.appendChild(btn);
});
p.appendChild(controls);
var editor=document.createElement('div');editor.className='form-editor';
drawFormation(currentFormation);editor.appendChild(formCanvas);p.appendChild(editor);
var bonusInfo=document.createElement('div');bonusInfo.className='v16-card';
bonusInfo.innerHTML='<h4 style="color:#FFD700;font-size:13px;margin-bottom:6px">진형 보너스</h4>';
FORMATIONS.forEach(function(f){
var isActive=f.id===currentFormation;
bonusInfo.innerHTML+='<div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid #2a2438;'+(isActive?'color:#FFD700':'color:#5a5a6a')+'">'+
'<span style="font-size:11px">'+f.icon+' '+f.name+'</span>'+
'<span style="font-size:10px">'+f.desc+'</span></div>';
});
p.appendChild(bonusInfo);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-form\').classList.remove(\'on\')">닫기</button>';
}

function renderFactionMapPanel(){
var p=createPanel('v16-fmap','🗺️ 세력 관계도','고대 한반도 세력 간 관계');
var wrap=document.createElement('div');wrap.className='fmap-wrap';
drawFactionMap();wrap.appendChild(fmapCanvas);
var legend=document.createElement('div');legend.className='fmap-legend';
legend.innerHTML='<span class="fmap-leg-item" style="border-color:#4CAF50">━ 우호/동맹</span>'+
'<span class="fmap-leg-item" style="border-color:#f44336">━ 적대</span>'+
'<span class="fmap-leg-item" style="border-color:#FFD700">┅ 중립/교류</span>';
wrap.appendChild(legend);p.appendChild(wrap);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-fmap\').classList.remove(\'on\')">닫기</button>';
playSFX('fmap_hover');
}

function renderReplayPanel(){
var p=createPanel('v16-replay','📹 전투 리플레이','전투 기록을 다시 확인하세요');
loadBattleLogs();
if(battleLogs.length===0){
p.innerHTML+='<p style="text-align:center;color:#5a5a6a;font-size:12px;padding:30px">아직 기록된 전투가 없습니다.<br>전투를 진행하면 자동으로 기록됩니다.</p>';
}else{
var list=document.createElement('div');list.className='replay-list';
battleLogs.slice().reverse().forEach(function(log){
var item=document.createElement('div');item.className='replay-item';
item.innerHTML='<span class="rp-icon">'+(log.result==='win'?'⚔️':'💀')+'</span>'+
'<div class="rp-info"><div class="rp-title">'+log.title+'</div><div class="rp-date">'+log.date+'</div></div>'+
'<span style="font-size:10px;color:'+(log.result==='win'?'#4CAF50':'#f44336')+'">'+(log.result==='win'?'승리':'패배')+'</span>';
item.onclick=function(){showReplayDetail(log,p)};
list.appendChild(item);
});
p.appendChild(list);
}
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-replay\').classList.remove(\'on\')">닫기</button>';
playSFX('replay_play');
}

function showReplayDetail(log,panel){
var existing=panel.querySelector('.replay-detail');if(existing)existing.remove();
var d=document.createElement('div');d.className='replay-detail on';
d.innerHTML='<h4 style="color:#ff6644;font-size:13px;margin-bottom:8px">'+log.title+' ('+log.date+')</h4>'+
'<div class="replay-log">'+log.log.map(function(l){
return '<div class="'+(l.indexOf('아군')>=0?'rp-ally':'rp-enemy')+'">'+l+'</div>';
}).join('')+'</div>';
panel.querySelector('.replay-list').before(d);
}

function renderDailyPanel(){
var p=createPanel('v16-daily','📋 일일 임무','매일 도전하고 보상을 받으세요');
loadDailyState();
var streak=document.createElement('div');streak.className='daily-streak';
streak.innerHTML='🔥 연속 달성: '+(dailyState.streak||0)+'일';p.appendChild(streak);
var grid=document.createElement('div');grid.className='daily-grid';
DAILY_MISSIONS.forEach(function(m){
var prog=Math.min(dailyState[m.key]||0,m.target);
var done=prog>=m.target;
var card=document.createElement('div');card.className='daily-card'+(done?' done':'');
card.innerHTML='<div class="dc-icon">'+m.icon+'</div><div class="dc-title">'+m.title+'</div>'+
'<div class="dc-desc">'+m.desc+'</div>'+
'<div class="dc-prog"><div class="dc-fill" style="width:'+Math.round(prog/m.target*100)+'%"></div></div>'+
'<div style="font-size:9px;color:'+(done?'#4CAF50':'#8a7a6a')+';margin-top:4px">'+prog+'/'+m.target+(done?' ✓':'')+'</div>';
grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-daily\').classList.remove(\'on\')">닫기</button>';
}

function renderRankingPanel(){
var p=createPanel('v16-rank','🏆 랭킹 보드','역대 영웅들과 순위를 겨루세요');
var playerScore=getPlayerScore();var playerGrade=getPlayerGrade(playerScore);
var allPlayers=AI_PLAYERS.slice();
allPlayers.push({name:'나',score:playerScore,grade:playerGrade,isPlayer:true});
allPlayers.sort(function(a,b){return b.score-a.score});
var table=document.createElement('div');table.className='rank-table';
allPlayers.forEach(function(pl,i){
var row=document.createElement('div');row.className='rank-row'+(pl.isPlayer?' player':'');
var posClass=i===0?'gold':i===1?'silver':i===2?'bronze':'';
var gradeColors={S:'#FFD700',A:'#5FA0FF',B:'#66BB6A',C:'#ff9800',D:'#9E9E9E'};
row.innerHTML='<div class="rank-pos '+posClass+'">'+(i+1)+'</div>'+
'<div class="rank-name">'+(pl.isPlayer?'⭐ ':'')+pl.name+'</div>'+
'<div class="rank-score">'+pl.score.toLocaleString()+'점</div>'+
'<div class="rank-grade" style="background:'+(gradeColors[pl.grade]||'#555')+'22;color:'+(gradeColors[pl.grade]||'#555')+';border:1px solid '+(gradeColors[pl.grade]||'#555')+'44">'+pl.grade+'</div>';
table.appendChild(row);
if(pl.isPlayer&&i<3)checkV16Ach('rank_top3');
});
p.appendChild(table);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-rank\').classList.remove(\'on\')">닫기</button>';
playSFX('rank_view');
}

function renderGuidePanel(){
var p=createPanel('v16-guide','📋 전략 가이드','전투와 경영의 핵심 팁');
var section=document.createElement('div');section.className='guide-section';
var guideViewed={};try{guideViewed=JSON.parse(localStorage.getItem('krpg_guide_viewed'))||{}}catch(e){}
STRATEGY_GUIDE.forEach(function(g,i){
var item=document.createElement('div');item.className='guide-item'+(guideViewed[i]?' open':'');
item.innerHTML='<div class="gi-head"><span class="gi-icon">'+g.icon+'</span>'+
'<span class="gi-title">'+g.title+'</span></div>'+
'<div class="gi-body">'+g.body+'</div>';
item.onclick=function(){item.classList.toggle('open');playSFX('guide_open');
if(!guideViewed[i]){guideViewed[i]=true;localStorage.setItem('krpg_guide_viewed',JSON.stringify(guideViewed));
if(Object.keys(guideViewed).length>=12)checkV16Ach('guide_reader');
}};
section.appendChild(item);
});
p.appendChild(section);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-guide\').classList.remove(\'on\')">닫기</button>';
}

function renderStatsPanel(){
var p=createPanel('v16-stats','📊 통합 통계','나의 플레이 현황을 한눈에');
var st;try{st=JSON.parse(localStorage.getItem('krpg_stats'))||{}}catch(e){st={}}
var ach;try{ach=JSON.parse(localStorage.getItem('krpg_ach'))||[]}catch(e){ach=[]}
var techCnt=TECH_TREE.filter(function(t){return t.unlocked}).length;
var dash=document.createElement('div');dash.className='stats-dash';
var row1=document.createElement('div');row1.className='stats-row';
row1.innerHTML='<div class="stat-card"><div class="sc-val">'+(st.wins||0)+'</div><div class="sc-label">전투 승리</div></div>'+
'<div class="stat-card"><div class="sc-val">'+(st.quizOk||0)+'</div><div class="sc-label">퀴즈 정답</div></div>'+
'<div class="stat-card"><div class="sc-val">'+ach.length+'</div><div class="sc-label">업적 달성</div></div>';
dash.appendChild(row1);
var row2=document.createElement('div');row2.className='stats-row';
row2.innerHTML='<div class="stat-card"><div class="sc-val">'+techCnt+'</div><div class="sc-label">기술 연구</div></div>'+
'<div class="stat-card"><div class="sc-val">'+(st.gold||0)+'</div><div class="sc-label">보유 금</div></div>'+
'<div class="stat-card"><div class="sc-val">'+getPlayerScore().toLocaleString()+'</div><div class="sc-label">종합 점수</div></div>';
dash.appendChild(row2);
var chartWrap=document.createElement('div');chartWrap.className='stats-chart-wrap';
drawStatsRadar();chartWrap.appendChild(statsCanvas);
dash.appendChild(chartWrap);p.appendChild(dash);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-stats\').classList.remove(\'on\')">닫기</button>';
playSFX('stats_view');
}

// =============================================
// SECTION 16: KEYBOARD SHORTCUTS (8: Shift+T/H/B/F/V/D/K/G)
// =============================================
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
var map={
'KeyT':['v16-tech',renderTechTreePanel],
'KeyH':['v16-heroes',renderHeroPediaPanel],
'KeyB':['v16-enc',renderEncyclopediaPanel],
'KeyF':['v16-form',renderFormationPanel],
'KeyV':['v16-fmap',renderFactionMapPanel],
'KeyD':['v16-daily',renderDailyPanel],
'KeyK':['v16-rank',renderRankingPanel],
'KeyG':['v16-guide',renderGuidePanel]
};
if(map[e.code]){
e.preventDefault();var id=map[e.code][0],fn=map[e.code][1];
var el=document.getElementById(id);
if(el&&el.classList.contains('on')){el.classList.remove('on');}
else{fn();document.getElementById(id).classList.add('on');}
}
if(e.code==='KeyS'&&e.ctrlKey){
e.preventDefault();renderStatsPanel();document.getElementById('v16-stats').classList.add('on');
}
});

// =============================================
// SECTION 17: TOAST UTILITY
// =============================================
function showToast(msg,color){
var t=document.createElement('div');
t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:'+(color||'#333')+';color:#fff;padding:10px 20px;border-radius:20px;font-size:12px;z-index:9999;pointer-events:none;opacity:0;transition:opacity .3s;max-width:300px;text-align:center';
t.textContent=msg;document.body.appendChild(t);
requestAnimationFrame(function(){t.style.opacity='1'});
setTimeout(function(){t.style.opacity='0';setTimeout(function(){t.remove()},300)},2500);
}

// =============================================
// SECTION 18: QUICK ACTION BUTTONS (FAB)
// =============================================
function addV16Menu(){
var sidebar=document.querySelector('.sidebar-content,.action-buttons,[class*="menu"]');
if(!sidebar){setTimeout(addV16Menu,2000);return;}
var btns=[
{label:'🔬 기술트리',fn:function(){renderTechTreePanel();document.getElementById('v16-tech').classList.add('on')}},
{label:'👑 영웅도감',fn:function(){renderHeroPediaPanel();document.getElementById('v16-heroes').classList.add('on')}},
{label:'📖 백과사전',fn:function(){renderEncyclopediaPanel();document.getElementById('v16-enc').classList.add('on')}},
{label:'🦅 진형',fn:function(){renderFormationPanel();document.getElementById('v16-form').classList.add('on')}},
{label:'🗺️ 세력도',fn:function(){renderFactionMapPanel();document.getElementById('v16-fmap').classList.add('on')}},
{label:'📹 리플레이',fn:function(){renderReplayPanel();document.getElementById('v16-replay').classList.add('on')}},
{label:'📋 일일임무',fn:function(){renderDailyPanel();document.getElementById('v16-daily').classList.add('on')}},
{label:'🏆 랭킹',fn:function(){renderRankingPanel();document.getElementById('v16-rank').classList.add('on')}},
{label:'📋 공략',fn:function(){renderGuidePanel();document.getElementById('v16-guide').classList.add('on')}},
{label:'📊 통계',fn:function(){renderStatsPanel();document.getElementById('v16-stats').classList.add('on')}}
];
var container=document.createElement('div');
container.style.cssText='display:flex;flex-wrap:wrap;gap:4px;margin:8px 0;justify-content:center';
btns.forEach(function(b){
var btn=document.createElement('button');btn.textContent=b.label;
btn.style.cssText='padding:6px 10px;font-size:10px;border:1px solid #5a4a3a;border-radius:6px;background:#2a1a0a;color:#e8dcc8;cursor:pointer;font-family:inherit';
btn.onclick=b.fn;container.appendChild(btn);
});
sidebar.appendChild(container);
}

// =============================================
// SECTION 19: INIT
// =============================================
function v16Init(){
loadTechState();loadFormation();loadBattleLogs();loadDailyState();loadV16Ach();
initTechCanvas();initFormCanvas();initFmapCanvas();initStatsCanvas();
registerV16Quiz();
setTimeout(addV16Menu,1800);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',v16Init);}
else{v16Init();}

window._v16={
renderTechTreePanel:renderTechTreePanel,renderHeroPediaPanel:renderHeroPediaPanel,
renderEncyclopediaPanel:renderEncyclopediaPanel,renderFormationPanel:renderFormationPanel,
renderFactionMapPanel:renderFactionMapPanel,renderReplayPanel:renderReplayPanel,
renderDailyPanel:renderDailyPanel,renderRankingPanel:renderRankingPanel,
renderGuidePanel:renderGuidePanel,renderStatsPanel:renderStatsPanel,
recordBattle:recordBattle,updateDailyProgress:updateDailyProgress,
playSFX:playSFX,TECH_TREE:TECH_TREE,HEROES:HEROES,ENCYCLOPEDIA:ENCYCLOPEDIA,
V16_QUIZ:V16_QUIZ,V16_ACH:V16_ACH
};
})();
