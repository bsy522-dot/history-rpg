// v16_patch.js — 한국사 영웅전 v16.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v16-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:130;overflow-y:auto;padding:16px}',
'.v16-panel.on{display:block}',
'.v16-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v16-subtitle{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v16-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v16-close:hover{background:#8B2A1A}',
'.v16-tabs{display:flex;gap:4px;max-width:540px;margin:0 auto 12px;flex-wrap:wrap;justify-content:center}',
'.v16-tab{font-size:10px;padding:6px 12px;border:1px solid #3a3a4a;border-radius:6px;background:#2a2438;color:#e8dcc8;cursor:pointer;font-family:inherit;transition:all .2s}',
'.v16-tab.active{border-color:#FFD700;background:#3a3448;color:#FFD700}',
'.court-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-width:540px;margin:0 auto}',
'.court-card{background:rgba(30,18,8,.9);border:2px solid #5a4a2a;border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:all .3s;position:relative}',
'.court-card:hover{border-color:#FFD700;transform:translateY(-2px)}',
'.court-card.filled{border-color:#4CAF50;box-shadow:0 0 10px rgba(76,175,80,.2)}',
'.court-card .cc-icon{font-size:26px;margin-bottom:4px}',
'.court-card .cc-title{font-size:11px;color:#FFD700;font-weight:700}',
'.court-card .cc-name{font-size:10px;color:#a0c8a0;margin-top:2px}',
'.court-card .cc-loyalty{font-size:9px;color:#8a7a6a;margin-top:4px}',
'.court-loyalty-bar{height:6px;background:#1a1a2e;border-radius:3px;overflow:hidden;margin-top:4px}',
'.court-loyalty-fill{height:100%;border-radius:3px;transition:width .5s}',
'.decode-area{max-width:540px;margin:0 auto;text-align:center}',
'.decode-area canvas{border:2px solid #5a4a2a;border-radius:8px;background:#0f0a06;display:block;margin:0 auto 12px}',
'.decode-clue{font-size:11px;color:#c4956a;margin:8px 0;padding:8px;background:rgba(40,30,15,.8);border-radius:6px;max-width:400px;margin:8px auto}',
'.decode-opts{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:10px 0}',
'.decode-opt{padding:8px 16px;border:1px solid #5a4a2a;border-radius:6px;background:#2a1a0a;color:#e8dcc8;font-size:12px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.decode-opt:hover{border-color:#FFD700;background:#3a2a1a}',
'.decode-opt.correct{border-color:#4CAF50;background:#1a3a1a}',
'.decode-opt.wrong{border-color:#f44336;background:#3a1a1a}',
'.civlife-area{max-width:540px;margin:0 auto}',
'.civlife-stat{display:flex;align-items:center;gap:10px;margin-bottom:10px;padding:10px;background:rgba(20,20,35,.8);border-radius:8px;border:1px solid #3a3a5a}',
'.civlife-stat .cs-icon{font-size:22px}',
'.civlife-stat .cs-label{font-size:11px;color:#a0a0c0;width:70px}',
'.civlife-stat .cs-bar{flex:1;height:16px;background:#1a1a2e;border-radius:8px;overflow:hidden;position:relative}',
'.civlife-stat .cs-fill{height:100%;border-radius:8px;transition:width .5s}',
'.civlife-stat .cs-val{font-size:11px;color:#e8dcc8;width:50px;text-align:right;font-weight:700}',
'.civlife-actions{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:12px 0}',
'.civlife-btn{padding:8px 14px;border:1px solid #4a3a5a;border-radius:6px;background:#2a2438;color:#e8dcc8;font-size:11px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.civlife-btn:hover{border-color:#9C27B0;background:#3a3448}',
'.civlife-event{font-size:11px;color:#c4956a;text-align:center;padding:8px;background:rgba(40,30,15,.6);border-radius:6px;margin-top:8px;min-height:30px}',
'.report-area{max-width:540px;margin:0 auto;text-align:center}',
'.report-area canvas{border:2px solid #3a3a5a;border-radius:8px;background:#0a0a14;display:block;margin:0 auto 12px}',
'.report-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:400px;margin:12px auto}',
'.report-card{background:rgba(20,20,35,.9);border:1px solid #3a3a5a;border-radius:8px;padding:10px;text-align:center}',
'.report-card .rc-val{font-size:20px;color:#FFD700;font-weight:900}',
'.report-card .rc-label{font-size:9px;color:#7a7a9a;margin-top:4px}',
'.excav-area{max-width:540px;margin:0 auto}',
'.excav-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px}',
'.excav-site{background:rgba(25,18,10,.9);border:2px solid #5a4a2a;border-radius:10px;padding:14px;text-align:center;cursor:pointer;transition:all .3s;position:relative}',
'.excav-site:hover{border-color:#FF9800;transform:translateY(-2px)}',
'.excav-site.discovered{border-color:#FFD700;box-shadow:0 0 12px rgba(255,215,0,.2)}',
'.excav-site .es-icon{font-size:28px;margin-bottom:4px}',
'.excav-site .es-name{font-size:11px;color:#e8dcc8;font-weight:700}',
'.excav-site .es-depth{font-size:9px;color:#8a7a5a;margin-top:4px}',
'.excav-prog{height:6px;background:#1a1a10;border-radius:3px;overflow:hidden;margin-top:6px}',
'.excav-prog-fill{height:100%;background:linear-gradient(90deg,#FF9800,#FFD700);border-radius:3px;transition:width .5s}',
'.scenario-list{max-width:540px;margin:0 auto}',
'.scenario-item{background:rgba(20,15,30,.9);border:2px solid #4a3a5a;border-radius:10px;padding:14px;margin-bottom:10px;cursor:pointer;transition:all .3s}',
'.scenario-item:hover{border-color:#7C4DFF}',
'.scenario-item.completed{border-color:#4CAF50;opacity:.8}',
'.scenario-item .si-header{display:flex;align-items:center;gap:10px;margin-bottom:6px}',
'.scenario-item .si-icon{font-size:24px}',
'.scenario-item .si-title{font-size:13px;color:#b39ddb;font-weight:700}',
'.scenario-item .si-desc{font-size:10px;color:#7a7a8a;line-height:1.6}',
'.scenario-choice{display:flex;flex-direction:column;gap:6px;margin-top:10px}',
'.scenario-btn{padding:10px 14px;border:1px solid #5a4a6a;border-radius:6px;background:#2a2438;color:#e8dcc8;font-size:11px;cursor:pointer;font-family:inherit;text-align:left;transition:all .2s}',
'.scenario-btn:hover{border-color:#b39ddb;background:#3a3448}',
'.scenario-result{font-size:11px;color:#a5d6a7;margin-top:8px;padding:8px;background:rgba(20,40,20,.6);border-radius:6px}',
'.academy-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-width:540px;margin:0 auto}',
'.academy-card{background:rgba(15,20,30,.9);border:2px solid #3a4a6a;border-radius:10px;padding:14px;text-align:center;cursor:pointer;transition:all .3s}',
'.academy-card:hover{border-color:#2196F3;transform:translateY(-2px)}',
'.academy-card .ac-icon{font-size:26px;margin-bottom:6px}',
'.academy-card .ac-name{font-size:11px;color:#90CAF9;font-weight:700}',
'.academy-card .ac-desc{font-size:9px;color:#5a7a9a;margin-top:4px}',
'.academy-card .ac-level{font-size:10px;color:#FFD700;margin-top:6px}',
'.academy-prog{height:6px;background:#1a1a2e;border-radius:3px;overflow:hidden;margin-top:6px}',
'.academy-prog-fill{height:100%;background:linear-gradient(90deg,#2196F3,#00BCD4);border-radius:3px;transition:width .5s}',
'.chronicle-area{max-width:540px;margin:0 auto;text-align:center}',
'.chronicle-area canvas{border:2px solid #3a3a5a;border-radius:8px;background:#0a0a14;display:block;margin:0 auto 12px}',
'.chronicle-legend{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:8px}',
'.chronicle-leg{font-size:10px;display:flex;align-items:center;gap:4px}',
'.chronicle-dot{width:10px;height:10px;border-radius:50%;display:inline-block}'
].join('\n');
document.head.appendChild(css);

// ─── SFX Engine (10 types) ───
var audioCtx=null;
function playSFX(type){
try{
if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();
var o=audioCtx.createOscillator(),g=audioCtx.createGain();
o.connect(g);g.connect(audioCtx.destination);
var now=audioCtx.currentTime;
var presets={
court_assign:{f:660,t:'triangle',d:.15,v:.12},
court_event:{f:440,t:'sine',d:.2,v:.1},
decode_correct:{f:880,t:'sine',d:.2,v:.15},
decode_wrong:{f:220,t:'sawtooth',d:.15,v:.08},
civlife_action:{f:550,t:'triangle',d:.12,v:.1},
report_open:{f:500,t:'sine',d:.18,v:.1},
excav_dig:{f:330,t:'square',d:.1,v:.08},
excav_find:{f:990,t:'sine',d:.3,v:.15},
scenario_choose:{f:600,t:'triangle',d:.15,v:.12},
academy_train:{f:770,t:'sine',d:.2,v:.12}
};
var p=presets[type]||presets.court_assign;
o.type=p.t;o.frequency.setValueAtTime(p.f,now);
g.gain.setValueAtTime(p.v,now);g.gain.exponentialRampToValueAtTime(.001,now+p.d);
o.start(now);o.stop(now+p.d);
}catch(e){}
}

// ─── 1. Royal Court System (12 positions) ───
var COURT_POS=[
{id:'prime',title:'상대등',icon:'👑',desc:'최고 정치 결정권자',bonus:'전체 능력 +3',slot:null,loyalty:100},
{id:'general',title:'대장군',icon:'⚔️',desc:'전군 총사령관',bonus:'공격력 +5',slot:null,loyalty:100},
{id:'minister',title:'국상',icon:'📜',desc:'국정 총괄 대신',bonus:'자원 수입 +20%',slot:null,loyalty:100},
{id:'spy_chief',title:'첩보수장',icon:'🕵️',desc:'첩보망 총괄',bonus:'첩보 성공률 +15%',slot:null,loyalty:100},
{id:'treasurer',title:'사도',icon:'💰',desc:'국고 재정 관리',bonus:'금 수입 +25%',slot:null,loyalty:100},
{id:'advisor',title:'좌보',icon:'🧠',desc:'왕의 참모',bonus:'퀴즈 힌트 제공',slot:null,loyalty:100},
{id:'priest',title:'천군',icon:'⛩️',desc:'제사와 의식 담당',bonus:'제사 효과 +30%',slot:null,loyalty:100},
{id:'architect',title:'장작감',icon:'🏗️',desc:'건축 총괄',bonus:'건축 비용 -20%',slot:null,loyalty:100},
{id:'diplomat',title:'행인',icon:'🤝',desc:'외교 사절 총괄',bonus:'외교 호감도 +10',slot:null,loyalty:100},
{id:'scholar',title:'박사',icon:'📚',desc:'학문과 교육 담당',bonus:'경험치 +15%',slot:null,loyalty:100},
{id:'commander',title:'비장',icon:'🛡️',desc:'수비대 사령관',bonus:'방어력 +4',slot:null,loyalty:100},
{id:'judge',title:'조의',icon:'⚖️',desc:'법과 형벌 담당',bonus:'반란 억제 +20%',slot:null,loyalty:100}
];

var COURT_CHARS=['단군','환웅','해모수','주몽','유리','온조','비류','부루','해부루','금와','대소','위구태'];

var courtState={positions:{},eventLog:[]};

function loadCourtState(){
try{var s=localStorage.getItem('hrpg_court');if(s)courtState=JSON.parse(s);}catch(e){}
if(!courtState.positions)courtState.positions={};
if(!courtState.eventLog)courtState.eventLog=[];
}
function saveCourtState(){
try{localStorage.setItem('hrpg_court',JSON.stringify(courtState));}catch(e){}
}

function assignCourt(posId){
var avail=COURT_CHARS.filter(function(c){
for(var k in courtState.positions){if(courtState.positions[k]===c)return false;}
return true;
});
if(avail.length===0){showToast('임명 가능한 인물이 없습니다','#f44336');return;}
var chosen=avail[Math.floor(Math.random()*avail.length)];
courtState.positions[posId]=chosen;
var pos=COURT_POS.find(function(p){return p.id===posId;});
courtState.eventLog.unshift({text:chosen+'을(를) '+pos.title+'에 임명',time:Date.now()});
if(courtState.eventLog.length>20)courtState.eventLog.length=20;
saveCourtState();
playSFX('court_assign');
showToast(chosen+' → '+pos.title+' 임명!','#4CAF50');
checkV16Ach('court_first');
var filled=Object.keys(courtState.positions).length;
if(filled>=12)checkV16Ach('court_full');
renderCourtPanel();
}

function dismissCourt(posId){
var name=courtState.positions[posId];
if(!name)return;
var pos=COURT_POS.find(function(p){return p.id===posId;});
courtState.eventLog.unshift({text:name+' '+pos.title+' 해임',time:Date.now()});
delete courtState.positions[posId];
saveCourtState();
showToast(name+' 해임됨','#FF9800');
renderCourtPanel();
}

function renderCourtPanel(){
var p=document.getElementById('v16-court');
if(!p){p=document.createElement('div');p.id='v16-court';p.className='v16-panel';document.body.appendChild(p);}
var filledCount=Object.keys(courtState.positions).length;
var html='<h2>👑 왕실 조정</h2><p class="v16-subtitle">'+filledCount+'/12 관직 임명 — 관리를 임명하여 국정을 강화하세요</p>';
html+='<div class="court-grid">';
COURT_POS.forEach(function(pos){
var name=courtState.positions[pos.id];
var filled=!!name;
html+='<div class="court-card'+(filled?' filled':'')+'" onclick="'+(filled?'window._v16.dismissCourt(\''+pos.id+'\')':'window._v16.assignCourt(\''+pos.id+'\')')+'">';
html+='<div class="cc-icon">'+pos.icon+'</div>';
html+='<div class="cc-title">'+pos.title+'</div>';
if(filled){
html+='<div class="cc-name">'+name+'</div>';
html+='<div class="cc-loyalty">충성: 100</div>';
html+='<div class="court-loyalty-bar"><div class="court-loyalty-fill" style="width:100%;background:#4CAF50"></div></div>';
}else{
html+='<div class="cc-name" style="color:#5a5a6a">빈 자리</div>';
html+='<div class="cc-loyalty">'+pos.bonus+'</div>';
}
html+='</div>';
});
html+='</div>';
if(courtState.eventLog.length>0){
html+='<div style="max-width:540px;margin:16px auto 0"><h3 style="font-size:12px;color:#8a7a6a;margin-bottom:6px">조정 기록</h3>';
courtState.eventLog.slice(0,8).forEach(function(ev){
html+='<div style="font-size:10px;color:#6a6a7a;padding:3px 0;border-bottom:1px solid #2a2438">'+ev.text+'</div>';
});
html+='</div>';
}
html+='<button class="v16-close" onclick="document.getElementById(\'v16-court\').classList.remove(\'on\')">닫기</button>';
p.innerHTML=html;
}

// ─── 2. Ancient Script Decoder (6 puzzles) ───
var DECODE_PUZZLES=[
{id:1,script:'天符印',hint:'환인이 환웅에게 내린 통치의 증표 3개',answer:'천부인',opts:['천부인','단군조','환웅검','신시인']},
{id:2,script:'弘益人間',hint:'고조선 건국 이념 — 널리 인간을 이롭게 하다',answer:'홍익인간',opts:['홍익인간','이화세계','재세이화','광명이세']},
{id:3,script:'阿斯達',hint:'단군왕검이 도읍을 세운 고조선의 수도',answer:'아사달',opts:['아사달','평양성','왕검성','개성']},
{id:4,script:'檀君王儉',hint:'고조선을 세운 최초의 왕, 곰과 호랑이 신화',answer:'단군왕검',opts:['단군왕검','환인천제','환웅천왕','해모수왕']},
{id:5,script:'八條禁法',hint:'고조선의 기본 법률, 현존 3조항만 전해짐',answer:'팔조금법',opts:['팔조금법','한율법','고조율','삼한법']},
{id:6,script:'祭天儀式',hint:'부여의 12월 축제, 하늘에 제사지내는 의식',answer:'영고',opts:['영고','동맹','무천','제천']}
];
var decodeState={solved:[],current:0};
function loadDecodeState(){
try{var s=localStorage.getItem('hrpg_decode');if(s)decodeState=JSON.parse(s);}catch(e){}
}
function saveDecodeState(){
try{localStorage.setItem('hrpg_decode',JSON.stringify(decodeState));}catch(e){}
}

function renderDecodePanel(){
var p=document.getElementById('v16-decode');
if(!p){p=document.createElement('div');p.id='v16-decode';p.className='v16-panel';document.body.appendChild(p);}
var puzzle=DECODE_PUZZLES[decodeState.current];
var solved=decodeState.solved.length;
var html='<h2>🔤 고대 문자 해독</h2><p class="v16-subtitle">'+solved+'/'+DECODE_PUZZLES.length+' 해독 완료</p>';
html+='<div class="decode-area">';
html+='<canvas id="v16-decode-canvas" width="400" height="180"></canvas>';
html+='<div class="decode-clue">💡 '+puzzle.hint+'</div>';
html+='<div class="decode-opts">';
puzzle.opts.forEach(function(opt){
var isSolved=decodeState.solved.indexOf(puzzle.id)>=0;
var isCorrect=opt===puzzle.answer;
var cls='decode-opt';
if(isSolved&&isCorrect)cls+=' correct';
html+='<button class="'+cls+'" onclick="window._v16.answerDecode(\''+opt+'\','+puzzle.id+')"'+(isSolved?' disabled':'')+'>'+opt+'</button>';
});
html+='</div>';
html+='<div style="display:flex;gap:8px;justify-content:center;margin-top:12px">';
html+='<button class="decode-opt" onclick="window._v16.prevDecode()" style="font-size:10px">◀ 이전</button>';
html+='<span style="font-size:11px;color:#8a7a6a;line-height:34px">'+(decodeState.current+1)+'/'+DECODE_PUZZLES.length+'</span>';
html+='<button class="decode-opt" onclick="window._v16.nextDecode()" style="font-size:10px">다음 ▶</button>';
html+='</div></div>';
html+='<button class="v16-close" onclick="document.getElementById(\'v16-decode\').classList.remove(\'on\')">닫기</button>';
p.innerHTML=html;
setTimeout(drawDecodeCanvas,50);
}

function drawDecodeCanvas(){
var c=document.getElementById('v16-decode-canvas');if(!c)return;
var ctx=c.getContext('2d');
ctx.fillStyle='#0f0a06';ctx.fillRect(0,0,400,180);
var puzzle=DECODE_PUZZLES[decodeState.current];
ctx.fillStyle='#1a1208';ctx.fillRect(20,10,360,160);
ctx.strokeStyle='#5a4a2a';ctx.lineWidth=2;ctx.strokeRect(20,10,360,160);
for(var i=0;i<8;i++){
ctx.beginPath();ctx.moveTo(20,10+i*20);ctx.lineTo(380,10+i*20);
ctx.strokeStyle='rgba(90,74,42,.2)';ctx.stroke();
}
var isSolved=decodeState.solved.indexOf(puzzle.id)>=0;
ctx.font='bold 48px serif';
ctx.fillStyle=isSolved?'#4CAF50':'#c4956a';
ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(puzzle.script,200,70);
if(isSolved){
ctx.font='bold 20px sans-serif';
ctx.fillStyle='#FFD700';
ctx.fillText('✓ '+puzzle.answer,200,130);
}else{
ctx.font='14px sans-serif';
ctx.fillStyle='#5a4a2a';
ctx.fillText('해독하세요...',200,130);
}
for(var j=0;j<20;j++){
ctx.fillStyle='rgba(196,149,106,'+(Math.random()*.1)+')';
ctx.fillRect(Math.random()*360+20,Math.random()*160+10,1,1);
}
}

function answerDecode(ans,id){
var puzzle=DECODE_PUZZLES.find(function(p){return p.id===id;});
if(!puzzle)return;
if(decodeState.solved.indexOf(id)>=0)return;
if(ans===puzzle.answer){
decodeState.solved.push(id);
saveDecodeState();
playSFX('decode_correct');
showToast('정답! '+puzzle.script+' = '+puzzle.answer,'#4CAF50');
checkV16Ach('decode_first');
if(decodeState.solved.length>=6)checkV16Ach('decode_master');
}else{
playSFX('decode_wrong');
showToast('오답입니다. 다시 생각해보세요','#f44336');
}
renderDecodePanel();
}

function prevDecode(){decodeState.current=Math.max(0,decodeState.current-1);renderDecodePanel();}
function nextDecode(){decodeState.current=Math.min(DECODE_PUZZLES.length-1,decodeState.current+1);renderDecodePanel();}

// ─── 3. Civilian Economy System ───
var civLife={population:500,tax:20,happiness:70,food:80,rebellion:0,turn:0,events:[]};
function loadCivLife(){
try{var s=localStorage.getItem('hrpg_civlife');if(s)civLife=JSON.parse(s);}catch(e){}
}
function saveCivLife(){
try{localStorage.setItem('hrpg_civlife',JSON.stringify(civLife));}catch(e){}
}

function civAction(action){
playSFX('civlife_action');
var msg='';
switch(action){
case 'feast':
civLife.happiness=Math.min(100,civLife.happiness+15);
civLife.food=Math.max(0,civLife.food-10);
msg='잔치를 열어 행복도 +15, 식량 -10';break;
case 'recruit':
civLife.population=Math.min(9999,civLife.population+50);
civLife.food=Math.max(0,civLife.food-5);
msg='이주민 유치: 인구 +50, 식량 -5';break;
case 'tax_up':
civLife.tax=Math.min(50,civLife.tax+5);
civLife.happiness=Math.max(0,civLife.happiness-8);
msg='세율 인상: 세금 +5%, 행복도 -8';break;
case 'tax_down':
civLife.tax=Math.max(0,civLife.tax-5);
civLife.happiness=Math.min(100,civLife.happiness+5);
msg='세율 인하: 세금 -5%, 행복도 +5';break;
case 'farm':
civLife.food=Math.min(100,civLife.food+20);
msg='농경 확대: 식량 +20';break;
case 'suppress':
civLife.rebellion=Math.max(0,civLife.rebellion-30);
civLife.happiness=Math.max(0,civLife.happiness-10);
msg='반란 진압: 반란위험 -30, 행복도 -10';break;
}
civLife.events.unshift(msg);
if(civLife.events.length>10)civLife.events.length=10;
civAdvanceTurn();
saveCivLife();
checkV16Ach('civlife_action');
if(civLife.population>=2000)checkV16Ach('civlife_prosper');
renderCivLifePanel();
}

function civAdvanceTurn(){
civLife.turn++;
var taxIncome=Math.floor(civLife.population*civLife.tax/100);
civLife.food=Math.max(0,civLife.food-Math.floor(civLife.population/100));
if(civLife.happiness<30)civLife.rebellion=Math.min(100,civLife.rebellion+5);
if(civLife.food<20){civLife.happiness=Math.max(0,civLife.happiness-5);civLife.events.unshift('식량 부족! 민심 하락');}
if(civLife.rebellion>70){civLife.population=Math.max(100,civLife.population-30);civLife.events.unshift('반란 발생! 인구 -30');}
var growth=Math.floor(civLife.population*(civLife.happiness/1000));
civLife.population=Math.min(9999,civLife.population+growth);
}

function renderCivLifePanel(){
var p=document.getElementById('v16-civlife');
if(!p){p=document.createElement('div');p.id='v16-civlife';p.className='v16-panel';document.body.appendChild(p);}
var stats=[
{icon:'👥',label:'인구',val:civLife.population,max:9999,color:'#2196F3'},
{icon:'💰',label:'세율',val:civLife.tax,max:50,color:'#FFD700'},
{icon:'😊',label:'행복도',val:civLife.happiness,max:100,color:'#4CAF50'},
{icon:'🌾',label:'식량',val:civLife.food,max:100,color:'#FF9800'},
{icon:'⚠️',label:'반란위험',val:civLife.rebellion,max:100,color:'#f44336'}
];
var html='<h2>🏘️ 민생 경제</h2><p class="v16-subtitle">턴 '+civLife.turn+' — 인구 '+civLife.population+'명</p>';
html+='<div class="civlife-area">';
stats.forEach(function(s){
var pct=Math.round(s.val/s.max*100);
html+='<div class="civlife-stat"><div class="cs-icon">'+s.icon+'</div><div class="cs-label">'+s.label+'</div>';
html+='<div class="cs-bar"><div class="cs-fill" style="width:'+pct+'%;background:'+s.color+'"></div></div>';
html+='<div class="cs-val">'+s.val+'</div></div>';
});
html+='<div class="civlife-actions">';
html+='<button class="civlife-btn" onclick="window._v16.civAction(\'feast\')">🎉 잔치 개최</button>';
html+='<button class="civlife-btn" onclick="window._v16.civAction(\'recruit\')">👥 이주민 유치</button>';
html+='<button class="civlife-btn" onclick="window._v16.civAction(\'tax_up\')">📈 세율 인상</button>';
html+='<button class="civlife-btn" onclick="window._v16.civAction(\'tax_down\')">📉 세율 인하</button>';
html+='<button class="civlife-btn" onclick="window._v16.civAction(\'farm\')">🌾 농경 확대</button>';
html+='<button class="civlife-btn" onclick="window._v16.civAction(\'suppress\')">🛡️ 반란 진압</button>';
html+='</div>';
if(civLife.events.length>0){
html+='<div class="civlife-event">';
civLife.events.slice(0,5).forEach(function(ev){html+='<div>'+ev+'</div>';});
html+='</div>';
}
html+='</div>';
html+='<button class="v16-close" onclick="document.getElementById(\'v16-civlife\').classList.remove(\'on\')">닫기</button>';
p.innerHTML=html;
}

// ─── 4. Battle Report (Canvas Radar Chart) ───
var battleStats={wins:0,losses:0,kills:0,damage:0,healing:0,turns:0,combos:0};
function loadBattleStats(){
try{var s=localStorage.getItem('hrpg_bstats');if(s)battleStats=JSON.parse(s);}catch(e){}
}
function saveBattleStats(){
try{localStorage.setItem('hrpg_bstats',JSON.stringify(battleStats));}catch(e){}
}

function renderReportPanel(){
var p=document.getElementById('v16-report');
if(!p){p=document.createElement('div');p.id='v16-report';p.className='v16-panel';document.body.appendChild(p);}
var html='<h2>📊 전장 보고서</h2><p class="v16-subtitle">전투 통계 종합 분석</p>';
html+='<div class="report-area">';
html+='<canvas id="v16-radar" width="360" height="360"></canvas>';
html+='<div class="report-cards">';
html+='<div class="report-card"><div class="rc-val">'+battleStats.wins+'</div><div class="rc-label">승리</div></div>';
html+='<div class="report-card"><div class="rc-val">'+battleStats.losses+'</div><div class="rc-label">패배</div></div>';
html+='<div class="report-card"><div class="rc-val">'+battleStats.kills+'</div><div class="rc-label">격파</div></div>';
html+='<div class="report-card"><div class="rc-val">'+battleStats.damage+'</div><div class="rc-label">총 피해</div></div>';
html+='<div class="report-card"><div class="rc-val">'+battleStats.healing+'</div><div class="rc-label">총 치유</div></div>';
html+='<div class="report-card"><div class="rc-val">'+battleStats.turns+'</div><div class="rc-label">총 턴</div></div>';
html+='</div></div>';
html+='<button class="v16-close" onclick="document.getElementById(\'v16-report\').classList.remove(\'on\')">닫기</button>';
p.innerHTML=html;
playSFX('report_open');
checkV16Ach('report_view');
setTimeout(drawRadarChart,50);
}

function drawRadarChart(){
var c=document.getElementById('v16-radar');if(!c)return;
var ctx=c.getContext('2d');
var cx=180,cy=180,r=130;
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,360,360);
var labels=['공격력','방어력','전술','지휘력','사기','지구력'];
var maxVals=[100,100,100,100,100,100];
var vals=[
Math.min(100,battleStats.kills*5+battleStats.damage/10),
Math.min(100,battleStats.wins*8+20),
Math.min(100,battleStats.combos*3+battleStats.turns/2),
Math.min(100,Object.keys(courtState.positions).length*8+10),
Math.min(100,civLife.happiness),
Math.min(100,battleStats.wins*4+battleStats.kills*2)
];
for(var ring=4;ring>=1;ring--){
ctx.beginPath();
for(var i=0;i<6;i++){
var angle=Math.PI*2*i/6-Math.PI/2;
var rr=r*ring/4;
var x=cx+rr*Math.cos(angle);
var y=cy+rr*Math.sin(angle);
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.closePath();ctx.strokeStyle='rgba(90,74,42,.3)';ctx.stroke();
}
for(var i=0;i<6;i++){
var angle=Math.PI*2*i/6-Math.PI/2;
ctx.beginPath();ctx.moveTo(cx,cy);
ctx.lineTo(cx+r*Math.cos(angle),cy+r*Math.sin(angle));
ctx.strokeStyle='rgba(90,74,42,.2)';ctx.stroke();
ctx.font='11px sans-serif';ctx.fillStyle='#c4956a';ctx.textAlign='center';ctx.textBaseline='middle';
var lx=cx+(r+20)*Math.cos(angle);
var ly=cy+(r+20)*Math.sin(angle);
ctx.fillText(labels[i],lx,ly);
}
ctx.beginPath();
for(var i=0;i<6;i++){
var angle=Math.PI*2*i/6-Math.PI/2;
var v=vals[i]/maxVals[i];
var x=cx+r*v*Math.cos(angle);
var y=cy+r*v*Math.sin(angle);
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.closePath();
ctx.fillStyle='rgba(196,149,106,.2)';ctx.fill();
ctx.strokeStyle='#c4956a';ctx.lineWidth=2;ctx.stroke();
for(var i=0;i<6;i++){
var angle=Math.PI*2*i/6-Math.PI/2;
var v=vals[i]/maxVals[i];
var x=cx+r*v*Math.cos(angle);
var y=cy+r*v*Math.sin(angle);
ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);
ctx.fillStyle='#FFD700';ctx.fill();
}
}

// ─── 5. Ruin Excavation System (8 sites) ───
var EXCAV_SITES=[
{id:'gojoseon_palace',name:'고조선 왕궁터',icon:'🏛️',depth:5,reward:'왕검의 옥새',era:'BC 2333'},
{id:'dolmen_field',name:'고인돌 유적',icon:'🪨',depth:3,reward:'거석 문명의 비밀',era:'BC 1500'},
{id:'bronze_forge',name:'청동기 제작소',icon:'⚒️',depth:4,reward:'비파형동검 원본',era:'BC 1000'},
{id:'shaman_shrine',name:'소도 성역',icon:'⛩️',depth:4,reward:'천군의 방울',era:'BC 500'},
{id:'iron_mine',name:'철광산 유적',icon:'⛏️',depth:5,reward:'철기 제작 비급',era:'BC 300'},
{id:'buyeo_tomb',name:'부여 왕릉',icon:'⚰️',depth:6,reward:'금동관 유물',era:'BC 200'},
{id:'samhan_village',name:'삼한 마을터',icon:'🏘️',depth:3,reward:'두레 공동체 기록',era:'BC 100'},
{id:'wanggeom_wall',name:'왕검성 성벽',icon:'🧱',depth:5,reward:'성곽 방어 설계도',era:'BC 108'}
];

var excavState={progress:{},found:[]};
function loadExcavState(){
try{var s=localStorage.getItem('hrpg_excav');if(s)excavState=JSON.parse(s);}catch(e){}
if(!excavState.progress)excavState.progress={};
if(!excavState.found)excavState.found=[];
}
function saveExcavState(){
try{localStorage.setItem('hrpg_excav',JSON.stringify(excavState));}catch(e){}
}

function digSite(siteId){
var site=EXCAV_SITES.find(function(s){return s.id===siteId;});
if(!site)return;
if(!excavState.progress[siteId])excavState.progress[siteId]=0;
if(excavState.found.indexOf(siteId)>=0){showToast('이미 발굴 완료된 유적입니다','#FF9800');return;}
excavState.progress[siteId]++;
playSFX('excav_dig');
if(excavState.progress[siteId]>=site.depth){
excavState.found.push(siteId);
playSFX('excav_find');
showToast('🏆 '+site.name+' 발굴 완료! '+site.reward+' 발견!','#FFD700');
checkV16Ach('excav_first');
if(excavState.found.length>=8)checkV16Ach('excav_master');
}else{
showToast(site.name+' 발굴 중... ('+excavState.progress[siteId]+'/'+site.depth+')','#FF9800');
}
saveExcavState();
renderExcavPanel();
}

function renderExcavPanel(){
var p=document.getElementById('v16-excav');
if(!p){p=document.createElement('div');p.id='v16-excav';p.className='v16-panel';document.body.appendChild(p);}
var html='<h2>⛏️ 유적 발굴</h2><p class="v16-subtitle">'+excavState.found.length+'/'+EXCAV_SITES.length+' 유적 발굴 완료</p>';
html+='<div class="excav-area"><div class="excav-grid">';
EXCAV_SITES.forEach(function(site){
var prog=excavState.progress[site.id]||0;
var done=excavState.found.indexOf(site.id)>=0;
var pct=Math.round(prog/site.depth*100);
html+='<div class="excav-site'+(done?' discovered':'')+'" onclick="window._v16.digSite(\''+site.id+'\')">';
html+='<div class="es-icon">'+(done?'🏆':site.icon)+'</div>';
html+='<div class="es-name">'+site.name+'</div>';
html+='<div class="es-depth">'+(done?site.reward:site.era+' · 깊이 '+site.depth+'층')+'</div>';
html+='<div class="excav-prog"><div class="excav-prog-fill" style="width:'+pct+'%"></div></div>';
html+='</div>';
});
html+='</div></div>';
html+='<button class="v16-close" onclick="document.getElementById(\'v16-excav\').classList.remove(\'on\')">닫기</button>';
p.innerHTML=html;
}

// ─── 6. History Scenarios (6 branching choices) ───
var SCENARIOS=[
{id:'migration',icon:'🚶',title:'환웅의 하강 결정',desc:'환웅이 인간 세상으로 내려가려 합니다. 어떤 방식으로 내려갈까요?',
choices:[{text:'태백산 신시에 정착 — 안전하지만 세력 확장이 느림',result:'신시를 세우고 풍백·우사·운사와 함께 다스림. 안정 +20, 확장 -10'},{text:'여러 부족을 돌며 순행 — 위험하지만 넓은 영향력',result:'순행으로 넓은 세력권 확보. 확장 +30, 위험 +15'}]},
{id:'bear_tiger',icon:'🐻',title:'곰과 호랑이의 시험',desc:'동굴에서 100일간 마늘과 쑥만 먹으라는 시험. 호랑이가 포기하고 나갔습니다.',
choices:[{text:'곰을 격려하고 끝까지 도움 — 인내를 가르침',result:'곰이 여인으로 변하여 단군의 어머니가 됨. 덕망 +25'},{text:'시험 기간을 50일로 단축 — 관대함을 보임',result:'속도는 빨랐지만 인내심의 교훈이 약해짐. 속도 +15, 덕망 -5'}]},
{id:'capital',icon:'🏛️',title:'수도 선정 회의',desc:'고조선의 수도를 어디에 세울 것인가 논쟁이 벌어집니다.',
choices:[{text:'아사달 — 산 속 방어에 유리한 지역',result:'아사달에 도읍. 방어 +20, 교역 -10'},{text:'평양 근처 평지 — 농경과 교역에 유리',result:'평야 도읍. 교역 +25, 방어 -5'}]},
{id:'bronze_iron',icon:'⚔️',title:'청동기에서 철기로',desc:'새로운 철기 기술이 전해졌습니다. 국가 방침을 정해야 합니다.',
choices:[{text:'즉시 철기 도입 — 군사력 급성장',result:'군사력이 크게 향상. 공격 +30, 전통 -10'},{text:'점진적 전환 — 기존 청동기 장인 보호',result:'안정적 전환. 공격 +15, 민심 +10'}]},
{id:'trade_war',icon:'🤝',title:'한(漢)과의 외교',desc:'한나라가 교역을 제안했지만, 속국을 요구합니다.',
choices:[{text:'교역만 수용, 속국 거부 — 독립 유지',result:'독립을 지킴. 존엄 +30, 교역 +10'},{text:'임시 조공으로 시간 벌기 — 군비 확충',result:'시간을 벌어 군비 강화. 군사 +20, 존엄 -15'}]},
{id:'succession',icon:'👑',title:'왕위 계승 위기',desc:'왕이 갑자기 승하하고, 두 왕자가 왕위를 주장합니다.',
choices:[{text:'장자 계승 원칙 — 전통과 안정',result:'장자가 왕위 계승. 안정 +25, 혁신 -5'},{text:'능력 기반 선출 — 현명한 자가 다스림',result:'능력 있는 왕자가 등극. 혁신 +20, 내전위험 +10'}]}
];

var scenarioState={completed:{},choices:{}};
function loadScenarioState(){
try{var s=localStorage.getItem('hrpg_scenario');if(s)scenarioState=JSON.parse(s);}catch(e){}
if(!scenarioState.completed)scenarioState.completed={};
if(!scenarioState.choices)scenarioState.choices={};
}
function saveScenarioState(){
try{localStorage.setItem('hrpg_scenario',JSON.stringify(scenarioState));}catch(e){}
}

function chooseScenario(scenId,choiceIdx){
if(scenarioState.completed[scenId])return;
scenarioState.completed[scenId]=true;
scenarioState.choices[scenId]=choiceIdx;
saveScenarioState();
playSFX('scenario_choose');
var scen=SCENARIOS.find(function(s){return s.id===scenId;});
showToast(scen.title+' — 결정 완료!','#7C4DFF');
checkV16Ach('scenario_first');
var completedCount=Object.keys(scenarioState.completed).length;
if(completedCount>=6)checkV16Ach('scenario_master');
renderScenarioPanel();
}

function renderScenarioPanel(){
var p=document.getElementById('v16-scenario');
if(!p){p=document.createElement('div');p.id='v16-scenario';p.className='v16-panel';document.body.appendChild(p);}
var completedCount=Object.keys(scenarioState.completed).length;
var html='<h2>📖 역사 시나리오</h2><p class="v16-subtitle">'+completedCount+'/'+SCENARIOS.length+' 시나리오 완료 — 역사적 결정을 내리세요</p>';
html+='<div class="scenario-list">';
SCENARIOS.forEach(function(scen){
var done=scenarioState.completed[scen.id];
var choiceIdx=scenarioState.choices[scen.id];
html+='<div class="scenario-item'+(done?' completed':'')+'">';
html+='<div class="si-header"><div class="si-icon">'+scen.icon+'</div><div class="si-title">'+scen.title+(done?' ✓':'')+'</div></div>';
html+='<div class="si-desc">'+scen.desc+'</div>';
if(done){
var choice=scen.choices[choiceIdx];
html+='<div class="scenario-result">선택: '+choice.text+'<br>결과: '+choice.result+'</div>';
}else{
html+='<div class="scenario-choice">';
scen.choices.forEach(function(ch,idx){
html+='<button class="scenario-btn" onclick="window._v16.chooseScenario(\''+scen.id+'\','+idx+')">'+ch.text+'</button>';
});
html+='</div>';
}
html+='</div>';
});
html+='</div>';
html+='<button class="v16-close" onclick="document.getElementById(\'v16-scenario\').classList.remove(\'on\')">닫기</button>';
p.innerHTML=html;
}

// ─── 7. Military Academy (6 training types) ───
var ACADEMY_DRILLS=[
{id:'archery',name:'궁술 훈련',icon:'🏹',desc:'원거리 사격 정확도 향상',maxLv:10,xpPer:5},
{id:'swordsmanship',name:'검술 훈련',icon:'⚔️',desc:'근접 전투 기술 연마',maxLv:10,xpPer:5},
{id:'formation',name:'진형 훈련',icon:'🛡️',desc:'부대 대형 변환 숙련',maxLv:10,xpPer:5},
{id:'horsemanship',name:'기마술 훈련',icon:'🐴',desc:'기병 기동력 강화',maxLv:10,xpPer:5},
{id:'siege',name:'공성 훈련',icon:'🏰',desc:'성벽 공략 기술 습득',maxLv:10,xpPer:5},
{id:'stealth',name:'잠입 훈련',icon:'🌙',desc:'은밀 작전 수행 능력',maxLv:10,xpPer:5}
];
var academyState={levels:{},totalXP:0};
function loadAcademyState(){
try{var s=localStorage.getItem('hrpg_academy');if(s)academyState=JSON.parse(s);}catch(e){}
if(!academyState.levels)academyState.levels={};
}
function saveAcademyState(){
try{localStorage.setItem('hrpg_academy',JSON.stringify(academyState));}catch(e){}
}

function trainDrill(drillId){
var drill=ACADEMY_DRILLS.find(function(d){return d.id===drillId;});
if(!drill)return;
var lv=academyState.levels[drillId]||0;
if(lv>=drill.maxLv){showToast(drill.name+' 최고 레벨 달성!','#FFD700');return;}
academyState.levels[drillId]=lv+1;
academyState.totalXP+=drill.xpPer;
saveAcademyState();
playSFX('academy_train');
showToast(drill.name+' Lv.'+(lv+1)+' 달성! (+'+drill.xpPer+' XP)','#2196F3');
checkV16Ach('academy_first');
var total=0;
ACADEMY_DRILLS.forEach(function(d){total+=(academyState.levels[d.id]||0);});
if(total>=60)checkV16Ach('academy_master');
renderAcademyPanel();
}

function renderAcademyPanel(){
var p=document.getElementById('v16-academy');
if(!p){p=document.createElement('div');p.id='v16-academy';p.className='v16-panel';document.body.appendChild(p);}
var totalLv=0;
ACADEMY_DRILLS.forEach(function(d){totalLv+=(academyState.levels[d.id]||0);});
var html='<h2>🎯 군사 훈련소</h2><p class="v16-subtitle">총 훈련 레벨: '+totalLv+'/60 · 누적 XP: '+academyState.totalXP+'</p>';
html+='<div class="academy-grid">';
ACADEMY_DRILLS.forEach(function(drill){
var lv=academyState.levels[drill.id]||0;
var pct=Math.round(lv/drill.maxLv*100);
html+='<div class="academy-card" onclick="window._v16.trainDrill(\''+drill.id+'\')">';
html+='<div class="ac-icon">'+drill.icon+'</div>';
html+='<div class="ac-name">'+drill.name+'</div>';
html+='<div class="ac-desc">'+drill.desc+'</div>';
html+='<div class="ac-level">Lv.'+lv+'/'+drill.maxLv+'</div>';
html+='<div class="academy-prog"><div class="academy-prog-fill" style="width:'+pct+'%"></div></div>';
html+='</div>';
});
html+='</div>';
html+='<button class="v16-close" onclick="document.getElementById(\'v16-academy\').classList.remove(\'on\')">닫기</button>';
p.innerHTML=html;
}

// ─── 8. Faction Chronicle (Canvas timeline graph) ───
var CHRONICLE_DATA=[
{era:'BC 2333',event:'고조선 건국',factions:{gojoseon:80,buyeo:0,samhan:0}},
{era:'BC 1500',event:'고인돌 문화 확산',factions:{gojoseon:85,buyeo:10,samhan:5}},
{era:'BC 1000',event:'청동기 전성기',factions:{gojoseon:90,buyeo:20,samhan:10}},
{era:'BC 700',event:'비파형동검 보급',factions:{gojoseon:88,buyeo:30,samhan:15}},
{era:'BC 500',event:'철기 도입기',factions:{gojoseon:82,buyeo:45,samhan:25}},
{era:'BC 400',event:'위만 집권',factions:{gojoseon:70,buyeo:55,samhan:35}},
{era:'BC 300',event:'한반도 남부 발전',factions:{gojoseon:65,buyeo:60,samhan:50}},
{era:'BC 200',event:'부여 전성기',factions:{gojoseon:55,buyeo:80,samhan:55}},
{era:'BC 108',event:'고조선 멸망',factions:{gojoseon:10,buyeo:75,samhan:65}},
{era:'BC 57',event:'삼한 발전',factions:{gojoseon:5,buyeo:70,samhan:80}},
{era:'BC 37',event:'고구려 건국',factions:{gojoseon:0,buyeo:60,samhan:85}},
{era:'BC 18',event:'백제 건국',factions:{gojoseon:0,buyeo:50,samhan:90}}
];

function renderChroniclePanel(){
var p=document.getElementById('v16-chronicle');
if(!p){p=document.createElement('div');p.id='v16-chronicle';p.className='v16-panel';document.body.appendChild(p);}
var html='<h2>📜 세력 연대기</h2><p class="v16-subtitle">고조선부터 삼국시대까지 세력 흥망 그래프</p>';
html+='<div class="chronicle-area">';
html+='<canvas id="v16-chronicle-canvas" width="520" height="300"></canvas>';
html+='<div class="chronicle-legend">';
html+='<div class="chronicle-leg"><span class="chronicle-dot" style="background:#c4956a"></span> 고조선</div>';
html+='<div class="chronicle-leg"><span class="chronicle-dot" style="background:#5FA0FF"></span> 부여</div>';
html+='<div class="chronicle-leg"><span class="chronicle-dot" style="background:#FF5FA2"></span> 삼한</div>';
html+='</div></div>';
html+='<button class="v16-close" onclick="document.getElementById(\'v16-chronicle\').classList.remove(\'on\')">닫기</button>';
p.innerHTML=html;
setTimeout(drawChronicle,50);
}

function drawChronicle(){
var c=document.getElementById('v16-chronicle-canvas');if(!c)return;
var ctx=c.getContext('2d');
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,520,300);
var ml=50,mr=20,mt=20,mb=40;
var w=520-ml-mr,h=300-mt-mb;
ctx.strokeStyle='rgba(90,74,42,.3)';ctx.lineWidth=1;
for(var i=0;i<=4;i++){
var y=mt+h*i/4;
ctx.beginPath();ctx.moveTo(ml,y);ctx.lineTo(ml+w,y);ctx.stroke();
ctx.fillStyle='#5a5a6a';ctx.font='9px sans-serif';ctx.textAlign='right';
ctx.fillText((100-25*i)+'',ml-5,y+3);
}
var n=CHRONICLE_DATA.length;
var factions=[
{key:'gojoseon',color:'#c4956a',label:'고조선'},
{key:'buyeo',color:'#5FA0FF',label:'부여'},
{key:'samhan',color:'#FF5FA2',label:'삼한'}
];
factions.forEach(function(fac){
ctx.beginPath();ctx.strokeStyle=fac.color;ctx.lineWidth=2;
for(var i=0;i<n;i++){
var x=ml+w*i/(n-1);
var y=mt+h*(1-CHRONICLE_DATA[i].factions[fac.key]/100);
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.stroke();
ctx.beginPath();ctx.strokeStyle='transparent';
ctx.moveTo(ml,mt+h);
for(var i=0;i<n;i++){
var x=ml+w*i/(n-1);
var y=mt+h*(1-CHRONICLE_DATA[i].factions[fac.key]/100);
ctx.lineTo(x,y);
}
ctx.lineTo(ml+w,mt+h);ctx.closePath();
var grad=ctx.createLinearGradient(0,mt,0,mt+h);
grad.addColorStop(0,fac.color+'33');grad.addColorStop(1,fac.color+'05');
ctx.fillStyle=grad;ctx.fill();
for(var i=0;i<n;i++){
var x=ml+w*i/(n-1);
var y=mt+h*(1-CHRONICLE_DATA[i].factions[fac.key]/100);
ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);
ctx.fillStyle=fac.color;ctx.fill();
}
});
ctx.fillStyle='#5a5a6a';ctx.font='8px sans-serif';ctx.textAlign='center';
for(var i=0;i<n;i+=2){
var x=ml+w*i/(n-1);
ctx.save();ctx.translate(x,mt+h+12);ctx.rotate(-Math.PI/6);
ctx.fillText(CHRONICLE_DATA[i].era,0,0);
ctx.restore();
}
}

// ─── Quiz v16 (+15 questions, 120→135) ───
var V16_QUIZ=[
{q:'고조선의 건국 이념으로, &quot;널리 인간을 이롭게 하다&quot;라는 뜻의 사자성어는?',a:['홍익인간','위민정치','이화세계','천부사상'],c:0},
{q:'환웅이 환인에게 받은 세 가지 보물을 통칭하는 말은?',a:['천부인','신기삼보','환국보','선인인'],c:0},
{q:'고조선의 법률로 현재 3개 조항만 전해지는 법은?',a:['8조법','12율령','고조율법','단군법전'],c:0},
{q:'부여의 12월 제천행사의 이름은?',a:['영고','동맹','무천','제천'],c:0},
{q:'고조선에서 죄인이 피할 수 있었던 신성 지역의 이름은?',a:['소도','신시','신단','천부'],c:0},
{q:'고조선의 마지막 수도이자 한(漢)에 함락된 성의 이름은?',a:['왕검성','아사달','위례성','평양성'],c:0},
{q:'위만이 고조선을 장악할 때 이용한 직책은?',a:['박사','상','대부','비장'],c:0},
{q:'고조선의 청동기 문화를 대표하는 칼의 형태는?',a:['비파형동검','세형동검','직검','환두대도'],c:0},
{q:'고인돌의 다른 이름으로, 큰 돌을 이용한 무덤 양식은?',a:['지석묘','석관묘','적석총','옹관묘'],c:0},
{q:'삼한 중 철 생산으로 유명하여 왜와 교역한 나라는?',a:['변한','마한','진한','예'],c:0},
{q:'동예의 10월 제천행사 이름은?',a:['무천','영고','동맹','제천'],c:0},
{q:'옥저의 독특한 혼인 풍습으로, 신부가 신랑 집에서 자라는 제도는?',a:['민며느리제','서옥제','데릴사위제','족외혼'],c:0},
{q:'부여에서 전쟁이 나면 길흉을 점치는 데 사용한 동물은?',a:['소','거북','사슴','매'],c:0},
{q:'고조선의 범금8조에서 &quot;남의 물건을 훔친 자&quot;에 대한 처벌은?',a:['노비로 삼음','사형','유배','벌금 50만전'],c:0},
{q:'환웅이 다스린 세 가지 자연의 신(풍백·우사·운사)이 관장한 것은?',a:['바람·비·구름','산·강·바다','불·물·흙','해·달·별'],c:0}
];

function registerV16Quiz(){
if(typeof window.registerQuiz==='function'){
window.registerQuiz(V16_QUIZ);
}else{
window._v16Quiz=V16_QUIZ;
}
}

// ─── Achievements (+12, 72→84) ───
var V16_ACH=[
{id:'court_first',name:'첫 임명',desc:'관직에 첫 인물 임명',icon:'👑'},
{id:'court_full',name:'조정 완성',desc:'12개 관직 전부 임명',icon:'🏛️'},
{id:'decode_first',name:'해독가',desc:'고대 문자 첫 해독 성공',icon:'🔤'},
{id:'decode_master',name:'해독 대가',desc:'6개 문자 모두 해독',icon:'📜'},
{id:'civlife_action',name:'민생 관리자',desc:'민생 정책 첫 시행',icon:'🏘️'},
{id:'civlife_prosper',name:'번영의 도시',desc:'인구 2000명 달성',icon:'🌟'},
{id:'report_view',name:'전략 분석가',desc:'전장 보고서 열람',icon:'📊'},
{id:'excav_first',name:'발굴 시작',desc:'첫 유적 발굴 완료',icon:'⛏️'},
{id:'excav_master',name:'고고학자',desc:'8개 유적 모두 발굴',icon:'🏆'},
{id:'scenario_first',name:'역사의 기로',desc:'첫 역사 시나리오 결정',icon:'📖'},
{id:'scenario_master',name:'역사 결정자',desc:'6개 시나리오 모두 완료',icon:'⚖️'},
{id:'academy_first',name:'훈련병',desc:'군사 훈련 첫 완료',icon:'🎯'}
];

var v16AchState={};
function loadV16Ach(){
try{var s=localStorage.getItem('hrpg_v16_ach');if(s)v16AchState=JSON.parse(s);}catch(e){}
}
function saveV16Ach(){
try{localStorage.setItem('hrpg_v16_ach',JSON.stringify(v16AchState));}catch(e){}
}
function checkV16Ach(id){
if(v16AchState[id])return;
var ach=V16_ACH.find(function(a){return a.id===id;});
if(!ach)return;
v16AchState[id]=Date.now();
saveV16Ach();
showToast('🏆 업적 달성: '+ach.icon+' '+ach.name,'#FFD700');
}

// ─── Keyboard Shortcuts (8: Shift+Q/O/L/B/X/H/N/F) ───
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
var map={
'KeyQ':['v16-court',renderCourtPanel],
'KeyO':['v16-decode',renderDecodePanel],
'KeyL':['v16-civlife',renderCivLifePanel],
'KeyB':['v16-report',renderReportPanel],
'KeyX':['v16-excav',renderExcavPanel],
'KeyH':['v16-scenario',renderScenarioPanel],
'KeyN':['v16-academy',renderAcademyPanel],
'KeyF':['v16-chronicle',renderChroniclePanel]
};
if(map[e.code]){
e.preventDefault();var id=map[e.code][0],fn=map[e.code][1];
var el=document.getElementById(id);
if(el&&el.classList.contains('on')){el.classList.remove('on');}
else{fn();document.getElementById(id).classList.add('on');}
}
});

// ─── Toast ───
function showToast(msg,color){
var t=document.createElement('div');
t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:'+(color||'#333')+';color:#fff;padding:10px 20px;border-radius:20px;font-size:12px;z-index:9999;pointer-events:none;opacity:0;transition:opacity .3s;max-width:300px;text-align:center';
t.textContent=msg;document.body.appendChild(t);
requestAnimationFrame(function(){t.style.opacity='1'});
setTimeout(function(){t.style.opacity='0';setTimeout(function(){t.remove()},300)},2500);
}

// ─── Menu Integration ───
function addV16Menu(){
var sidebar=document.querySelector('.sidebar-content,.action-buttons,[class*="menu"]');
if(!sidebar){setTimeout(addV16Menu,2500);return;}
var btns=[
{label:'👑 조정',fn:function(){renderCourtPanel();document.getElementById('v16-court').classList.add('on')}},
{label:'🔤 해독',fn:function(){renderDecodePanel();document.getElementById('v16-decode').classList.add('on')}},
{label:'🏘️ 민생',fn:function(){renderCivLifePanel();document.getElementById('v16-civlife').classList.add('on')}},
{label:'📊 보고서',fn:function(){renderReportPanel();document.getElementById('v16-report').classList.add('on')}},
{label:'⛏️ 발굴',fn:function(){renderExcavPanel();document.getElementById('v16-excav').classList.add('on')}},
{label:'📖 시나리오',fn:function(){renderScenarioPanel();document.getElementById('v16-scenario').classList.add('on')}},
{label:'🎯 훈련소',fn:function(){renderAcademyPanel();document.getElementById('v16-academy').classList.add('on')}},
{label:'📜 연대기',fn:function(){renderChroniclePanel();document.getElementById('v16-chronicle').classList.add('on')}}
];
var container=document.createElement('div');
container.style.cssText='display:flex;flex-wrap:wrap;gap:4px;margin:8px 0;justify-content:center';
btns.forEach(function(b){
var btn=document.createElement('button');btn.textContent=b.label;
btn.style.cssText='padding:6px 10px;font-size:10px;border:1px solid #4a3a2a;border-radius:6px;background:#1a2a1a;color:#e8dcc8;cursor:pointer;font-family:inherit';
btn.onclick=b.fn;container.appendChild(btn);
});
sidebar.appendChild(container);
}

// ─── Init ───
function v16Init(){
loadCourtState();loadDecodeState();loadCivLife();loadBattleStats();
loadExcavState();loadScenarioState();loadAcademyState();loadV16Ach();
registerV16Quiz();
setTimeout(addV16Menu,2000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',v16Init);}
else{v16Init();}

window._v16={
assignCourt:assignCourt,dismissCourt:dismissCourt,
answerDecode:answerDecode,prevDecode:prevDecode,nextDecode:nextDecode,
civAction:civAction,
digSite:digSite,
chooseScenario:chooseScenario,
trainDrill:trainDrill,
renderCourtPanel:renderCourtPanel,renderDecodePanel:renderDecodePanel,
renderCivLifePanel:renderCivLifePanel,renderReportPanel:renderReportPanel,
renderExcavPanel:renderExcavPanel,renderScenarioPanel:renderScenarioPanel,
renderAcademyPanel:renderAcademyPanel,renderChroniclePanel:renderChroniclePanel,
playSFX:playSFX,V16_QUIZ:V16_QUIZ,V16_ACH:V16_ACH
};
})();
