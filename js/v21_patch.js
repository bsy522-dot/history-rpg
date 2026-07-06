// v21_patch.js — 한국사 영웅전 v21.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v21-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:139;overflow-y:auto;padding:16px}',
'.v21-panel.on{display:block}',
'.v21-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v21-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v21-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v21-close:hover{background:#8B2A1A}',
'.v21-toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);padding:8px 20px;border-radius:20px;font-size:11px;font-weight:700;z-index:999;pointer-events:none;animation:v21fade 2s ease forwards}',
'@keyframes v21fade{0%{opacity:0;transform:translate(-50%,-10px)}10%{opacity:1;transform:translate(-50%,0)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-10px)}}',

'.tboard-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.tboard-wrap canvas{border:2px solid #6a4a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.tboard-tools{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.tb-btn{padding:6px 14px;border:1px solid #5a3a1a;border-radius:6px;background:#1a2418;color:#c4dcc4;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.tb-btn:hover{border-color:#FFD700;background:#2a3a1a}',
'.tb-btn.active{border-color:#FFD700;color:#FFD700;background:#2a2a08}',
'.tboard-legend{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:4px;max-width:400px;margin:6px auto;font-size:9px;color:#8a7a6a}',
'.tl-item{display:flex;align-items:center;gap:4px}',
'.tl-dot{width:10px;height:10px;border-radius:3px;flex-shrink:0}',

'.forge-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.forge-wrap canvas{border:2px solid #6a3a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.forge-items{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;max-width:560px;margin:8px auto}',
'.fi-card{background:linear-gradient(135deg,rgba(30,18,10,.95),rgba(20,12,8,.98));border:2px solid #5a3a1a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.fi-card:hover{border-color:#FF8844;transform:translateY(-2px)}',
'.fi-card.enhanced{border-color:#FFD700;box-shadow:0 0 12px rgba(255,215,0,.2)}',
'.fi-card .fi-icon{font-size:28px}',
'.fi-card .fi-name{font-size:10px;color:#FF8844;font-weight:700;margin-top:2px}',
'.fi-card .fi-lv{font-size:8px;color:#FFD700;margin-top:2px}',
'.fi-card .fi-stat{font-size:8px;color:#8a7a6a;margin-top:2px}',
'.forge-actions{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.fa-btn{padding:8px 18px;border:1px solid #6a3a1a;border-radius:6px;background:#3a1a0a;color:#FFD700;font-size:11px;cursor:pointer;font-family:inherit;font-weight:700;transition:all .2s}',
'.fa-btn:hover{background:#5a2a1a;border-color:#FFD700}',

'.conquer-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.conquer-wrap canvas{border:2px solid #3a5a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.conquer-regions{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;max-width:560px;margin:8px auto}',
'.rg-card{background:linear-gradient(135deg,rgba(15,25,15,.95),rgba(10,18,10,.98));border:2px solid #3a5a3a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.rg-card:hover{border-color:#4CAF50;transform:translateY(-2px)}',
'.rg-card.conquered{border-color:#FFD700;background:linear-gradient(135deg,rgba(40,35,10,.9),rgba(30,25,5,.95))}',
'.rg-card .rg-icon{font-size:22px}',
'.rg-card .rg-name{font-size:10px;color:#4CAF50;font-weight:700;margin-top:2px}',
'.rg-card .rg-info{font-size:8px;color:#6a8a6a;margin-top:2px}',

'.chronicle-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.chronicle-wrap canvas{border:2px solid #5a4a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.chronicle-nav{display:flex;gap:8px;justify-content:center;margin:8px 0}',
'.cn-btn{padding:6px 16px;border:1px solid #5a4a3a;border-radius:6px;background:#1a1810;color:#c4956a;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.cn-btn:hover{border-color:#c4956a;background:#2a2818}',
'.cn-btn.active{border-color:#FFD700;color:#FFD700}',

'.loot-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.loot-wrap canvas{border:2px solid #5a5a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.loot-items{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px;max-width:560px;margin:8px auto}',
'.li-card{background:linear-gradient(135deg,rgba(25,25,10,.95),rgba(18,18,5,.98));border:2px solid #5a5a2a;border-radius:10px;padding:8px;text-align:center;transition:all .3s}',
'.li-card .li-icon{font-size:24px}',
'.li-card .li-name{font-size:9px;color:#FFD700;font-weight:700;margin-top:2px}',
'.li-card .li-qty{font-size:8px;color:#aaaa6a;margin-top:1px}',

'.constellation-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.constellation-wrap canvas{border:2px solid #3a3a6a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.const-heroes{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.ch-btn{padding:6px 14px;border:1px solid #3a3a6a;border-radius:8px;background:#0a0a1a;color:#8888ff;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.ch-btn:hover{border-color:#8888ff;background:#1a1a3a}',
'.ch-btn.active{border-color:#FFD700;color:#FFD700;background:#1a1a2a}',

'.palace-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.palace-wrap canvas{border:2px solid #6a5a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.palace-buildings{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;max-width:560px;margin:8px auto}',
'.pb-card{background:linear-gradient(135deg,rgba(30,25,15,.95),rgba(20,18,10,.98));border:2px solid #6a5a3a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.pb-card:hover{border-color:#c4956a;transform:translateY(-2px)}',
'.pb-card.built{border-color:#FFD700;background:linear-gradient(135deg,rgba(40,35,15,.9),rgba(30,28,10,.95))}',
'.pb-card .pb-icon{font-size:26px}',
'.pb-card .pb-name{font-size:10px;color:#c4956a;font-weight:700;margin-top:2px}',
'.pb-card .pb-lv{font-size:8px;color:#FFD700;margin-top:2px}',
'.pb-card .pb-eff{font-size:8px;color:#8a7a6a;margin-top:2px}',

'.warlog-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.warlog-wrap canvas{border:2px solid #6a2a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.warlog-entries{max-width:560px;margin:8px auto}',
'.wl-entry{background:linear-gradient(135deg,rgba(30,12,12,.95),rgba(20,8,8,.98));border:1px solid #5a2a2a;border-radius:8px;padding:10px;margin-bottom:6px;text-align:left}',
'.wl-entry .wl-title{font-size:11px;color:#FF6644;font-weight:700}',
'.wl-entry .wl-date{font-size:8px;color:#8a5a5a;margin-top:1px}',
'.wl-entry .wl-result{font-size:9px;color:#FFD700;margin-top:3px}',
'.wl-entry .wl-detail{font-size:8px;color:#8a6a6a;margin-top:2px;line-height:1.6}'
].join('\n');
document.head.appendChild(css);

var SFX21={};
function initSFX21(){
 var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
 var ctx=new AC();
 function mkSfx(freq,type,dur,vol){
  return function(){
   try{if(ctx.state==='suspended')ctx.resume();
   var o=ctx.createOscillator(),g=ctx.createGain();
   o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(vol||.15,ctx.currentTime);
   g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+dur);
   o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+dur);
   }catch(e){}
  };
 }
 SFX21.board_place=mkSfx(520,'triangle',.15,.12);
 SFX21.forge_hit=mkSfx(180,'sawtooth',.3,.14);
 SFX21.forge_success=mkSfx(880,'sine',.4,.12);
 SFX21.conquer_attack=mkSfx(220,'square',.25,.13);
 SFX21.conquer_win=mkSfx(660,'sine',.5,.15);
 SFX21.chronicle_turn=mkSfx(440,'triangle',.2,.1);
 SFX21.loot_collect=mkSfx(700,'sine',.2,.12);
 SFX21.skill_unlock=mkSfx(1000,'sine',.35,.13);
 SFX21.palace_build=mkSfx(330,'triangle',.3,.14);
 SFX21.palace_upgrade=mkSfx(550,'sine',.4,.12);
 SFX21.warlog_record=mkSfx(280,'square',.2,.1);
 SFX21.achieve_v21=mkSfx(1200,'sine',.5,.15);
}
initSFX21();
function playSfx21(name){if(SFX21[name])SFX21[name]();}

function toast21(msg,color){
 var t=document.createElement('div');t.className='v21-toast';
 t.style.background=color||'#2a5a2a';t.style.color='#fff';t.textContent=msg;
 document.body.appendChild(t);setTimeout(function(){t.remove()},2200);
}

var ST21=JSON.parse(localStorage.getItem('krpg_v21')||'{}');
function save21(){localStorage.setItem('krpg_v21',JSON.stringify(ST21));}

// ─── 1. 전장 전술보드 Canvas 12x12 ───
var BOARD_TOOLS=[
 {id:'ally',name:'아군',color:'#4CAF50',icon:'⚔️'},
 {id:'enemy',name:'적군',color:'#FF4444',icon:'☠️'},
 {id:'archer',name:'궁병',color:'#5FA0FF',icon:'🏹'},
 {id:'cavalry',name:'기마',color:'#FF8844',icon:'🐎'},
 {id:'wall',name:'성벽',color:'#8a8a8a',icon:'🧱'},
 {id:'forest',name:'숲',color:'#2a6a2a',icon:'🌲'},
 {id:'mountain',name:'산',color:'#6a4a2a',icon:'⛰️'},
 {id:'water',name:'수로',color:'#2244aa',icon:'🌊'},
 {id:'trap',name:'함정',color:'#aa4400',icon:'⚠️'},
 {id:'eraser',name:'지우기',color:'#333',icon:'❌'}
];
var boardGrid=ST21.boardGrid||Array(144).fill(null);
var boardTool='ally';

function openTacticalBoard(){
 var p=document.getElementById('v21-tboard');
 if(p){p.classList.add('on');renderBoard();playSfx21('board_place');return;}
 p=document.createElement('div');p.id='v21-tboard';p.className='v21-panel on';
 var h='<h2>⚔️ 전장 전술보드</h2>';
 h+='<div class="v21-sub">12×12 전장을 설계하고 전술을 시뮬레이션하세요</div>';
 h+='<div class="tboard-wrap"><canvas id="tboard-canvas" width="480" height="480"></canvas></div>';
 h+='<div class="tboard-tools" id="tboard-tools"></div>';
 h+='<div class="tboard-legend" id="tboard-legend"></div>';
 h+='<div style="display:flex;gap:8px;justify-content:center;margin:8px 0">';
 h+='<button class="tb-btn" onclick="clearBoard()">초기화</button>';
 h+='<button class="tb-btn" onclick="analyzeBoard()">전투력 분석</button>';
 h+='</div>';
 h+='<button class="v21-close" onclick="closeTacticalBoard()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 var toolsDiv=document.getElementById('tboard-tools');
 BOARD_TOOLS.forEach(function(t){
  var b=document.createElement('button');b.className='tb-btn'+(boardTool===t.id?' active':'');
  b.textContent=t.icon+' '+t.name;
  b.onclick=function(){boardTool=t.id;
   document.querySelectorAll('#tboard-tools .tb-btn').forEach(function(btn,i){btn.className='tb-btn'+(BOARD_TOOLS[i].id===boardTool?' active':'');});
  };
  toolsDiv.appendChild(b);
 });
 var legend=document.getElementById('tboard-legend');
 BOARD_TOOLS.slice(0,9).forEach(function(t){
  var d=document.createElement('div');d.className='tl-item';
  d.innerHTML='<span class="tl-dot" style="background:'+t.color+'"></span>'+t.icon+' '+t.name;
  legend.appendChild(d);
 });
 var cv=document.getElementById('tboard-canvas');
 cv.addEventListener('click',function(e){
  var rect=cv.getBoundingClientRect();
  var sx=480/rect.width,sy=480/rect.height;
  var cx=(e.clientX-rect.left)*sx,cy=(e.clientY-rect.top)*sy;
  var gx=Math.floor(cx/40),gy=Math.floor(cy/40);
  if(gx<0||gx>11||gy<0||gy>11)return;
  var idx=gy*12+gx;
  if(boardTool==='eraser'){boardGrid[idx]=null;}else{boardGrid[idx]=boardTool;}
  ST21.boardGrid=boardGrid;save21();
  renderBoard();playSfx21('board_place');
 });
 renderBoard();playSfx21('board_place');
}

function renderBoard(){
 var cv=document.getElementById('tboard-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,480,480);
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,480,480);
 for(var i=0;i<=12;i++){
  ctx.strokeStyle='#2a2a3a';ctx.lineWidth=1;ctx.beginPath();
  ctx.moveTo(i*40,0);ctx.lineTo(i*40,480);ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,i*40);ctx.lineTo(480,i*40);ctx.stroke();
 }
 for(var y=0;y<12;y++){for(var x=0;x<12;x++){
  var v=boardGrid[y*12+x];if(!v)continue;
  var tool=BOARD_TOOLS.find(function(t){return t.id===v;});
  if(!tool)continue;
  ctx.fillStyle=tool.color+'33';ctx.fillRect(x*40+1,y*40+1,38,38);
  ctx.fillStyle=tool.color;ctx.beginPath();ctx.arc(x*40+20,y*40+20,12,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#fff';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(tool.icon,x*40+20,y*40+20);
 }}
 ctx.fillStyle='#c4956a';ctx.font='bold 10px sans-serif';ctx.textAlign='left';
 var allies=boardGrid.filter(function(v){return v==='ally'||v==='archer'||v==='cavalry';}).length;
 var enemies=boardGrid.filter(function(v){return v==='enemy';}).length;
 ctx.fillText('아군: '+allies+'  적군: '+enemies,8,478);
}

function clearBoard(){boardGrid=Array(144).fill(null);ST21.boardGrid=boardGrid;save21();renderBoard();toast21('전장 초기화','#5a3a1a');}

function analyzeBoard(){
 var allies=boardGrid.filter(function(v){return v==='ally';}).length;
 var archers=boardGrid.filter(function(v){return v==='archer';}).length;
 var cavalry=boardGrid.filter(function(v){return v==='cavalry';}).length;
 var enemies=boardGrid.filter(function(v){return v==='enemy';}).length;
 var walls=boardGrid.filter(function(v){return v==='wall';}).length;
 var power=(allies*10+archers*12+cavalry*15);
 var defense=walls*8;
 var grade=power>100?'S':power>70?'A':power>40?'B':power>20?'C':'D';
 toast21('전투력: '+power+' (방어+'+defense+') '+grade+'등급','#2a5a2a');
 checkAch21('board_analyst');
}

function closeTacticalBoard(){var p=document.getElementById('v21-tboard');if(p)p.classList.remove('on');}

// ─── 2. 영웅장비 대장간 Canvas ───
var FORGE_ITEMS=[
 {id:'sword',name:'청동검',icon:'⚔️',stat:'공격+12',base:12,type:'atk'},
 {id:'bow',name:'각궁',icon:'🏹',stat:'공격+10',base:10,type:'atk'},
 {id:'spear',name:'창',icon:'🔱',stat:'공격+14',base:14,type:'atk'},
 {id:'shield',name:'방패',icon:'🛡️',stat:'방어+15',base:15,type:'def'},
 {id:'armor',name:'갑옷',icon:'🫡',stat:'방어+20',base:20,type:'def'},
 {id:'helmet',name:'투구',icon:'⛑️',stat:'방어+8',base:8,type:'def'},
 {id:'ring',name:'금반지',icon:'💍',stat:'마력+10',base:10,type:'mag'},
 {id:'amulet',name:'부적',icon:'🧧',stat:'마력+12',base:12,type:'mag'},
 {id:'boots',name:'경화',icon:'🥾',stat:'이동+2',base:2,type:'spd'},
 {id:'cloak',name:'망토',icon:'🧥',stat:'회피+5',base:5,type:'eva'},
 {id:'drum',name:'전고',icon:'🥁',stat:'사기+10',base:10,type:'mor'},
 {id:'banner',name:'군기',icon:'🚩',stat:'사기+15',base:15,type:'mor'}
];
if(!ST21.forge)ST21.forge={};

function openForge(){
 var p=document.getElementById('v21-forge');
 if(p){p.classList.add('on');renderForgeCanvas();playSfx21('forge_hit');return;}
 p=document.createElement('div');p.id='v21-forge';p.className='v21-panel on';
 var h='<h2>⚔️ 영웅장비 대장간</h2>';
 h+='<div class="v21-sub">장비를 강화하여 영웅들을 무장하세요</div>';
 h+='<div class="forge-wrap"><canvas id="forge-canvas" width="560" height="340"></canvas></div>';
 h+='<div class="forge-items" id="forge-items"></div>';
 h+='<button class="v21-close" onclick="closeForge()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 renderForgeItems();renderForgeCanvas();playSfx21('forge_hit');
}

function renderForgeItems(){
 var div=document.getElementById('forge-items');if(!div)return;div.innerHTML='';
 FORGE_ITEMS.forEach(function(it){
  var lv=ST21.forge[it.id]||0;
  var card=document.createElement('div');card.className='fi-card'+(lv>0?' enhanced':'');
  var bonus=lv*Math.ceil(it.base*0.3);
  card.innerHTML='<div class="fi-icon">'+it.icon+'</div><div class="fi-name">'+it.name+'</div>'
   +'<div class="fi-lv">'+(lv>0?'★'.repeat(Math.min(lv,5))+' Lv.'+lv:'미강화')+'</div>'
   +'<div class="fi-stat">'+it.stat+(bonus>0?' (+'+bonus+')':'')+'</div>';
  card.onclick=function(){forgeEnhance(it.id);};
  div.appendChild(card);
 });
}

function forgeEnhance(id){
 var it=FORGE_ITEMS.find(function(i){return i.id===id;});if(!it)return;
 var lv=ST21.forge[id]||0;
 if(lv>=10){toast21('최대 강화 달성!','#5a3a1a');return;}
 var success=Math.random()>0.3;
 if(success){
  ST21.forge[id]=(lv||0)+1;save21();
  playSfx21('forge_success');toast21(it.name+' 강화 성공! Lv.'+(lv+1),'#2a5a2a');
  if(lv+1>=5)checkAch21('forge_master');
  if(lv+1>=10)checkAch21('forge_legend');
 }else{
  playSfx21('forge_hit');toast21(it.name+' 강화 실패...','#5a2a2a');
 }
 renderForgeItems();renderForgeCanvas();
}

function renderForgeCanvas(){
 var cv=document.getElementById('forge-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,560,340);
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,560,340);
 ctx.fillStyle='#c4956a';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('장비 강화 현황',280,24);
 var barW=36,gap=10,startX=30;
 FORGE_ITEMS.forEach(function(it,i){
  var lv=ST21.forge[it.id]||0;
  var x=startX+i*(barW+gap);var maxH=260;var h=maxH*(lv/10);
  ctx.fillStyle='#1a1a2a';ctx.fillRect(x,40,barW,maxH);
  var grd=ctx.createLinearGradient(0,40+maxH-h,0,40+maxH);
  grd.addColorStop(0,it.type==='atk'?'#FF4444':it.type==='def'?'#4444FF':it.type==='mag'?'#aa44ff':'#44aa44');
  grd.addColorStop(1,it.type==='atk'?'#AA2222':it.type==='def'?'#2222AA':it.type==='mag'?'#6622aa':'#226622');
  ctx.fillStyle=grd;ctx.fillRect(x,40+maxH-h,barW,h);
  ctx.fillStyle='#FFD700';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
  ctx.fillText('Lv.'+lv,x+barW/2,40+maxH-h-6);
  ctx.fillStyle='#8a7a6a';ctx.font='9px sans-serif';
  ctx.fillText(it.icon,x+barW/2,320);
 });
}

function closeForge(){var p=document.getElementById('v21-forge');if(p)p.classList.remove('on');}

// ─── 3. 세력 영토 정복맵 Canvas ───
var REGIONS=[
 {id:'asadal',name:'아사달',icon:'🏰',power:30,reward:'금+200'},
 {id:'sinsi',name:'신시',icon:'⛩️',power:25,reward:'병력+10'},
 {id:'buyeo',name:'부여',icon:'🏯',power:45,reward:'기마병 해금'},
 {id:'okjeo',name:'옥저',icon:'🌾',power:20,reward:'식량+500'},
 {id:'dongye',name:'동예',icon:'🐯',power:35,reward:'궁병 해금'},
 {id:'mahan',name:'마한',icon:'🎭',power:40,reward:'문화+100'},
 {id:'jinhan',name:'진한',icon:'⚒️',power:50,reward:'철기 기술'},
 {id:'byeonhan',name:'변한',icon:'⚓',power:35,reward:'교역로 해금'},
 {id:'nakrang',name:'낙랑',icon:'🏛️',power:60,reward:'외교권 획득'},
 {id:'imdun',name:'임둔',icon:'⛰️',power:40,reward:'방어+20'}
];
if(!ST21.conquered)ST21.conquered=[];

function openConquestMap(){
 var p=document.getElementById('v21-conquer');
 if(p){p.classList.add('on');renderConquestCanvas();playSfx21('conquer_attack');return;}
 p=document.createElement('div');p.id='v21-conquer';p.className='v21-panel on';
 var h='<h2>🗺️ 세력 영토 정복맵</h2>';
 h+='<div class="v21-sub">고조선의 영토를 확장하세요 (정복: '+ST21.conquered.length+'/'+REGIONS.length+')</div>';
 h+='<div class="conquer-wrap"><canvas id="conquer-canvas" width="560" height="400"></canvas></div>';
 h+='<div class="conquer-regions" id="conquer-regions"></div>';
 h+='<button class="v21-close" onclick="closeConquestMap()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 renderConquestRegions();renderConquestCanvas();playSfx21('conquer_attack');
}

function renderConquestRegions(){
 var div=document.getElementById('conquer-regions');if(!div)return;div.innerHTML='';
 REGIONS.forEach(function(r){
  var conquered=ST21.conquered.indexOf(r.id)>=0;
  var card=document.createElement('div');card.className='rg-card'+(conquered?' conquered':'');
  card.innerHTML='<div class="rg-icon">'+r.icon+'</div><div class="rg-name">'+r.name+'</div>'
   +'<div class="rg-info">'+(conquered?'✔ 정복완료':'전투력: '+r.power)+'</div>'
   +'<div class="rg-info">보상: '+r.reward+'</div>';
  if(!conquered){card.onclick=function(){attemptConquest(r.id);};}
  div.appendChild(card);
 });
}

function attemptConquest(id){
 var r=REGIONS.find(function(rg){return rg.id===id;});if(!r)return;
 var roll=Math.floor(Math.random()*100);
 var chance=Math.max(30,90-r.power);
 if(roll<chance){
  ST21.conquered.push(id);save21();
  playSfx21('conquer_win');toast21(r.name+' 정복 성공! '+r.reward,'#2a5a2a');
  if(ST21.conquered.length>=5)checkAch21('conqueror_5');
  if(ST21.conquered.length>=10)checkAch21('conqueror_all');
 }else{
  playSfx21('conquer_attack');toast21(r.name+' 정복 실패... 전력을 강화하세요','#5a2a2a');
 }
 renderConquestRegions();renderConquestCanvas();
}

function renderConquestCanvas(){
 var cv=document.getElementById('conquer-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,560,400);
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,560,400);
 ctx.fillStyle='#c4956a';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('한반도 세력 영토 현황',280,24);
 var positions=[
  {x:280,y:80},{x:200,y:120},{x:350,y:100},{x:150,y:180},{x:380,y:160},
  {x:180,y:260},{x:300,y:240},{x:240,y:300},{x:400,y:280},{x:320,y:340}
 ];
 REGIONS.forEach(function(r,i){
  var pos=positions[i];var conquered=ST21.conquered.indexOf(r.id)>=0;
  ctx.fillStyle=conquered?'rgba(76,175,80,.3)':'rgba(100,50,50,.3)';
  ctx.beginPath();ctx.arc(pos.x,pos.y,28,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=conquered?'#4CAF50':'#6a3a3a';ctx.lineWidth=2;ctx.stroke();
  ctx.fillStyle=conquered?'#FFD700':'#FF4444';ctx.beginPath();ctx.arc(pos.x,pos.y,14,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#fff';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(r.icon,pos.x,pos.y);
  ctx.fillStyle=conquered?'#4CAF50':'#8a5a5a';ctx.font='9px sans-serif';ctx.textBaseline='top';
  ctx.fillText(r.name,pos.x,pos.y+20);
 });
 for(var i=0;i<REGIONS.length-1;i++){
  var a=positions[i],b=positions[i+1];
  ctx.strokeStyle='#2a2a3a';ctx.lineWidth=1;ctx.setLineDash([4,4]);
  ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
  ctx.setLineDash([]);
 }
 ctx.fillStyle='#c4956a';ctx.font='11px sans-serif';ctx.textAlign='center';ctx.textBaseline='bottom';
 ctx.fillText('정복: '+ST21.conquered.length+'/'+REGIONS.length,280,395);
}

function closeConquestMap(){var p=document.getElementById('v21-conquer');if(p)p.classList.remove('on');}

// ─── 4. 역사 연대기 스크롤 Canvas ───
var CHRONICLE_EVENTS=[
 {year:'BC 2333',title:'고조선 건국',desc:'단군왕검이 아사달에 도읍을 정하고 고조선을 건국',color:'#FFD700'},
 {year:'BC 2000',title:'청동기 시대',desc:'청동 기술 발전, 비파형 동검 제작',color:'#c4956a'},
 {year:'BC 1500',title:'철기 도입',desc:'철기 문화 시작, 세형동검 발달',color:'#5FA0FF'},
 {year:'BC 1000',title:'팔조법금',desc:'8조항의 법률 제정, 고조선 법치 확립',color:'#4CAF50'},
 {year:'BC 700',title:'부여 건국',desc:'동명왕이 부여를 건국, 만주 지역 지배',color:'#FF5FA2'},
 {year:'BC 400',title:'옥저동예',desc:'옥저와 동예의 문화 발전',color:'#aa88ff'},
 {year:'BC 300',title:'삼한 성립',desc:'마한진한변한 78국, 한반도 남부 연맹체',color:'#FF8844'},
 {year:'BC 194',title:'위만의 침입',desc:'연나라 위만이 준왕을 몰아내고 왕위 창탈',color:'#FF4444'},
 {year:'BC 108',title:'고조선 멸망',desc:'한 무제의 침공으로 왕검성 함락',color:'#888'},
 {year:'BC 57',title:'신라 건국',desc:'박혀거세가 경주에 신라를 건국',color:'#00E5FF'},
 {year:'BC 37',title:'고구려 건국',desc:'주몽이 졸본부여에 고구려를 건국',color:'#FF6644'},
 {year:'BC 18',title:'백제 건국',desc:'온조가 위례성에 백제를 건국',color:'#FFD700'}
];
var chroniclePage=0;

function openChronicle(){
 var p=document.getElementById('v21-chronicle');
 if(p){p.classList.add('on');renderChronicleCanvas();playSfx21('chronicle_turn');return;}
 p=document.createElement('div');p.id='v21-chronicle';p.className='v21-panel on';
 var h='<h2>📜 역사 연대기 스크롤</h2>';
 h+='<div class="v21-sub">BC 2333~BC 18 한국사 주요 사건을 타임라인으로 탐색하세요</div>';
 h+='<div class="chronicle-wrap"><canvas id="chronicle-canvas" width="560" height="380"></canvas></div>';
 h+='<div class="chronicle-nav">';
 h+='<button class="cn-btn" onclick="chronicleNav(-1)">◀ 이전</button>';
 h+='<button class="cn-btn" id="chronicle-page-btn">페이지 1/3</button>';
 h+='<button class="cn-btn" onclick="chronicleNav(1)">다음 ▶</button>';
 h+='</div>';
 h+='<button class="v21-close" onclick="closeChronicle()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 renderChronicleCanvas();playSfx21('chronicle_turn');
}

function chronicleNav(dir){
 chroniclePage=Math.max(0,Math.min(2,chroniclePage+dir));
 var btn=document.getElementById('chronicle-page-btn');
 if(btn)btn.textContent='페이지 '+(chroniclePage+1)+'/3';
 renderChronicleCanvas();playSfx21('chronicle_turn');
}

function renderChronicleCanvas(){
 var cv=document.getElementById('chronicle-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,560,380);
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,560,380);
 var start=chroniclePage*4,end=Math.min(start+4,CHRONICLE_EVENTS.length);
 ctx.strokeStyle='#3a3a4a';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(40,190);ctx.lineTo(520,190);ctx.stroke();
 for(var i=start;i<end;i++){
  var ev=CHRONICLE_EVENTS[i];var idx=i-start;
  var x=80+idx*130;var above=idx%2===0;
  ctx.fillStyle=ev.color;ctx.beginPath();ctx.arc(x,190,8,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=ev.color+'88';ctx.lineWidth=1;ctx.beginPath();
  ctx.moveTo(x,190);ctx.lineTo(x,above?100:280);ctx.stroke();
  ctx.fillStyle=ev.color;ctx.font='bold 12px sans-serif';ctx.textAlign='center';
  ctx.fillText(ev.year,x,above?80:310);
  ctx.fillStyle='#e8dcc8';ctx.font='bold 11px sans-serif';
  ctx.fillText(ev.title,x,above?95:325);
  ctx.fillStyle='#8a7a6a';ctx.font='9px sans-serif';
  var words=ev.desc.split('');var line='';var ly=above?110:340;
  for(var w=0;w<words.length;w++){
   line+=words[w];
   if(line.length>=12||w===words.length-1){ctx.fillText(line,x,ly);ly+=12;line='';}
  }
 }
 ctx.fillStyle='#5a4a3a';ctx.font='10px sans-serif';ctx.textAlign='center';
 ctx.fillText('역사 연대기 ('+(start+1)+'~'+end+' / '+CHRONICLE_EVENTS.length+'건)',280,375);
 checkAch21('chronicle_reader');
}

function closeChronicle(){var p=document.getElementById('v21-chronicle');if(p)p.classList.remove('on');}

// ─── 5. 전투 보상 창고 Canvas ───
var LOOT_TYPES=[
 {id:'gold',name:'금',icon:'🪙',rarity:'common'},
 {id:'iron',name:'철광석',icon:'⚒️',rarity:'common'},
 {id:'jade',name:'옥',icon:'💎',rarity:'rare'},
 {id:'silk',name:'비단',icon:'🧵',rarity:'common'},
 {id:'herb',name:'약초',icon:'🌿',rarity:'common'},
 {id:'scroll',name:'병서',icon:'📜',rarity:'rare'},
 {id:'gem',name:'보석',icon:'💎',rarity:'epic'},
 {id:'relic',name:'유물',icon:'🏺',rarity:'epic'},
 {id:'bronze',name:'청동',icon:'🪙',rarity:'common'},
 {id:'horse',name:'군마',icon:'🐎',rarity:'rare'},
 {id:'food',name:'군량',icon:'🍚',rarity:'common'},
 {id:'talisman',name:'부적',icon:'🧧',rarity:'epic'}
];
if(!ST21.loot)ST21.loot={};

function openLootVault(){
 var p=document.getElementById('v21-loot');
 if(p){p.classList.add('on');renderLootCanvas();playSfx21('loot_collect');return;}
 p=document.createElement('div');p.id='v21-loot';p.className='v21-panel on';
 var h='<h2>🏰 전투 보상 창고</h2>';
 h+='<div class="v21-sub">전투에서 획득한 전리품을 관리하세요</div>';
 h+='<div class="loot-wrap"><canvas id="loot-canvas" width="560" height="300"></canvas></div>';
 h+='<div style="display:flex;gap:8px;justify-content:center;margin:8px 0">';
 h+='<button class="tb-btn" onclick="collectRandomLoot()">탐색 전리품 획득</button>';
 h+='</div>';
 h+='<div class="loot-items" id="loot-items"></div>';
 h+='<button class="v21-close" onclick="closeLootVault()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 renderLootItems();renderLootCanvas();playSfx21('loot_collect');
}

function collectRandomLoot(){
 var item=LOOT_TYPES[Math.floor(Math.random()*LOOT_TYPES.length)];
 var qty=item.rarity==='epic'?1:item.rarity==='rare'?Math.floor(Math.random()*3)+1:Math.floor(Math.random()*10)+1;
 ST21.loot[item.id]=(ST21.loot[item.id]||0)+qty;save21();
 playSfx21('loot_collect');toast21(item.icon+' '+item.name+' x'+qty+' 획득!','#2a5a2a');
 renderLootItems();renderLootCanvas();
 var total=Object.keys(ST21.loot).length;
 if(total>=6)checkAch21('loot_collector');
 if(total>=12)checkAch21('loot_master');
}

function renderLootItems(){
 var div=document.getElementById('loot-items');if(!div)return;div.innerHTML='';
 LOOT_TYPES.forEach(function(lt){
  var qty=ST21.loot[lt.id]||0;if(qty===0)return;
  var card=document.createElement('div');card.className='li-card';
  var rarCol=lt.rarity==='epic'?'#aa44ff':lt.rarity==='rare'?'#5FA0FF':'#c4956a';
  card.innerHTML='<div class="li-icon">'+lt.icon+'</div><div class="li-name" style="color:'+rarCol+'">'+lt.name+'</div>'
   +'<div class="li-qty">x'+qty+'</div>';
  div.appendChild(card);
 });
}

function renderLootCanvas(){
 var cv=document.getElementById('loot-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,560,300);
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,560,300);
 ctx.fillStyle='#c4956a';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('전리품 보유 현황',280,24);
 var items=LOOT_TYPES.filter(function(lt){return(ST21.loot[lt.id]||0)>0;});
 if(items.length===0){ctx.fillStyle='#5a4a3a';ctx.font='12px sans-serif';ctx.fillText('아직 전리품이 없습니다',280,150);return;}
 var maxQty=Math.max.apply(null,items.map(function(lt){return ST21.loot[lt.id]||0;}));
 var barW=Math.min(40,400/items.length-4);
 var startX=(560-items.length*(barW+4))/2;
 items.forEach(function(lt,i){
  var qty=ST21.loot[lt.id]||0;var x=startX+i*(barW+4);var maxH=220;
  var h=maxH*(qty/Math.max(maxQty,1));
  ctx.fillStyle='#1a1a2a';ctx.fillRect(x,40,barW,maxH);
  var rarCol=lt.rarity==='epic'?'#aa44ff':lt.rarity==='rare'?'#5FA0FF':'#c4956a';
  ctx.fillStyle=rarCol;ctx.fillRect(x,40+maxH-h,barW,h);
  ctx.fillStyle='#FFD700';ctx.font='bold 9px sans-serif';ctx.textAlign='center';
  ctx.fillText('x'+qty,x+barW/2,40+maxH-h-4);
  ctx.fillStyle='#8a7a6a';ctx.font='10px sans-serif';
  ctx.fillText(lt.icon,x+barW/2,278);
 });
}

function closeLootVault(){var p=document.getElementById('v21-loot');if(p)p.classList.remove('on');}

// ─── 6. 영웅 스킬 별자리 Canvas ───
var HEROES_SKILLS=[
 {id:'hwanwoong',name:'환웅',icon:'⚡',skills:[
  {name:'천롱',x:280,y:60},{name:'풍백술',x:200,y:120},{name:'우사술',x:360,y:120},
  {name:'운사술',x:280,y:180},{name:'신시건설',x:180,y:240},{name:'인간사랑',x:380,y:240},
  {name:'제천의식',x:280,y:300}
 ]},
 {id:'dangun',name:'단군',icon:'👑',skills:[
  {name:'건국',x:280,y:60},{name:'홍익인간',x:200,y:120},{name:'팔조법',x:360,y:120},
  {name:'아사달',x:280,y:180},{name:'선인통치',x:180,y:240},{name:'문화발전',x:380,y:240},
  {name:'통일의지',x:280,y:300}
 ]},
 {id:'jumong',name:'주몽',icon:'🏹',skills:[
  {name:'신궁',x:280,y:60},{name:'기마술',x:200,y:120},{name:'지략',x:360,y:120},
  {name:'탈출',x:280,y:180},{name:'건국의민',x:180,y:240},{name:'확장',x:380,y:240},
  {name:'태양의아들',x:280,y:300}
 ]},
 {id:'onjo',name:'온조',icon:'🏯',skills:[
  {name:'개척',x:280,y:60},{name:'성축',x:200,y:120},{name:'농업',x:360,y:120},
  {name:'외교',x:280,y:180},{name:'해상교역',x:180,y:240},{name:'병법',x:380,y:240},
  {name:'백제건국',x:280,y:300}
 ]}
];
var currentHeroSkill=0;
if(!ST21.skills)ST21.skills={};

function openConstellation(){
 var p=document.getElementById('v21-const');
 if(p){p.classList.add('on');renderConstellationCanvas();playSfx21('skill_unlock');return;}
 p=document.createElement('div');p.id='v21-const';p.className='v21-panel on';
 var h='<h2>⭐ 영웅 스킬 별자리</h2>';
 h+='<div class="v21-sub">영웅의 스킬을 별자리처럼 해금하세요</div>';
 h+='<div class="constellation-wrap"><canvas id="const-canvas" width="560" height="380"></canvas></div>';
 h+='<div class="const-heroes" id="const-heroes"></div>';
 h+='<button class="v21-close" onclick="closeConstellation()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 var heroDiv=document.getElementById('const-heroes');
 HEROES_SKILLS.forEach(function(hero,i){
  var b=document.createElement('button');b.className='ch-btn'+(i===currentHeroSkill?' active':'');
  b.textContent=hero.icon+' '+hero.name;
  b.onclick=function(){currentHeroSkill=i;
   document.querySelectorAll('#const-heroes .ch-btn').forEach(function(btn,j){btn.className='ch-btn'+(j===currentHeroSkill?' active':'');});
   renderConstellationCanvas();
  };
  heroDiv.appendChild(b);
 });
 renderConstellationCanvas();playSfx21('skill_unlock');
}

function renderConstellationCanvas(){
 var cv=document.getElementById('const-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,560,380);
 ctx.fillStyle='#050510';ctx.fillRect(0,0,560,380);
 for(var s=0;s<60;s++){
  ctx.fillStyle='rgba(255,255,255,'+(Math.random()*.3+.1)+')';
  ctx.beginPath();ctx.arc(Math.random()*560,Math.random()*380,Math.random()*1.5+.3,0,Math.PI*2);ctx.fill();
 }
 var hero=HEROES_SKILLS[currentHeroSkill];
 var key=hero.id;var unlocked=ST21.skills[key]||[];
 ctx.fillStyle='#FFD700';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText(hero.icon+' '+hero.name+'의 별자리',280,30);
 for(var i=0;i<hero.skills.length-1;i++){
  var a=hero.skills[i],b=hero.skills[i+1];
  ctx.strokeStyle=unlocked.indexOf(a.name)>=0&&unlocked.indexOf(b.name)>=0?'#FFD70088':'#2a2a4a';
  ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
 }
 hero.skills.forEach(function(sk,i){
  var isUnlocked=unlocked.indexOf(sk.name)>=0;
  ctx.fillStyle=isUnlocked?'rgba(255,215,0,.2)':'rgba(60,60,100,.3)';
  ctx.beginPath();ctx.arc(sk.x,sk.y,22,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=isUnlocked?'#FFD700':'#4a4a6a';ctx.lineWidth=2;ctx.stroke();
  ctx.fillStyle=isUnlocked?'#FFD700':'#6a6a8a';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(sk.name,sk.x,sk.y);
 });
 ctx.fillStyle='#5a4a6a';ctx.font='10px sans-serif';ctx.textBaseline='bottom';
 ctx.fillText('해금: '+unlocked.length+'/'+hero.skills.length+' — 별을 클릭하여 해금',280,375);

 cv.onclick=function(e){
  var rect=cv.getBoundingClientRect();
  var sx=560/rect.width,sy=380/rect.height;
  var mx=(e.clientX-rect.left)*sx,my=(e.clientY-rect.top)*sy;
  hero.skills.forEach(function(sk,i){
   var dx=mx-sk.x,dy=my-sk.y;
   if(dx*dx+dy*dy<22*22){
    if(!ST21.skills[key])ST21.skills[key]=[];
    if(ST21.skills[key].indexOf(sk.name)<0){
     if(i===0||ST21.skills[key].indexOf(hero.skills[i-1].name)>=0){
      ST21.skills[key].push(sk.name);save21();
      playSfx21('skill_unlock');toast21(sk.name+' 스킬 해금!','#2a2a5a');
      renderConstellationCanvas();
      if(ST21.skills[key].length>=7)checkAch21('constellation_master');
     }else{toast21('이전 스킬을 먼저 해금하세요','#5a3a1a');}
    }
   }
  });
 };
}

function closeConstellation(){var p=document.getElementById('v21-const');if(p)p.classList.remove('on');}

// ─── 7. 왕궁 건설 시뮬레이터 Canvas ───
var PALACE_BUILDINGS=[
 {id:'throne',name:'정전',icon:'🏛️',cost:100,effect:'위엄+20'},
 {id:'barracks',name:'병영',icon:'⚔️',cost:80,effect:'병력+15'},
 {id:'granary',name:'곡창',icon:'🌾',cost:60,effect:'식량저장+100'},
 {id:'wall',name:'성벽',icon:'🧱',cost:120,effect:'방어+25'},
 {id:'market',name:'시장',icon:'🏪',cost:70,effect:'금+50/턴'},
 {id:'temple',name:'제천단',icon:'⛩️',cost:90,effect:'사기+20'},
 {id:'academy',name:'학당',icon:'📚',cost:85,effect:'기술+10'},
 {id:'stable',name:'마구간',icon:'🐎',cost:75,effect:'기병생산'},
 {id:'tower',name:'망루',icon:'🗼',cost:65,effect:'정찰범위+3'},
 {id:'garden',name:'후원',icon:'🌸',cost:50,effect:'민심+15'}
];
if(!ST21.palace)ST21.palace={};

function openPalaceBuilder(){
 var p=document.getElementById('v21-palace');
 if(p){p.classList.add('on');renderPalaceCanvas();playSfx21('palace_build');return;}
 p=document.createElement('div');p.id='v21-palace';p.className='v21-panel on';
 var builtCount=Object.keys(ST21.palace).filter(function(k){return ST21.palace[k]>0;}).length;
 var h='<h2>🏰 왕궁 건설 시뮬레이터</h2>';
 h+='<div class="v21-sub">왕궁을 건설하고 업그레이드하세요 (건물: '+builtCount+'/'+PALACE_BUILDINGS.length+')</div>';
 h+='<div class="palace-wrap"><canvas id="palace-canvas" width="560" height="360"></canvas></div>';
 h+='<div class="palace-buildings" id="palace-buildings"></div>';
 h+='<button class="v21-close" onclick="closePalaceBuilder()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 renderPalaceBuildings();renderPalaceCanvas();playSfx21('palace_build');
}

function renderPalaceBuildings(){
 var div=document.getElementById('palace-buildings');if(!div)return;div.innerHTML='';
 PALACE_BUILDINGS.forEach(function(b){
  var lv=ST21.palace[b.id]||0;
  var card=document.createElement('div');card.className='pb-card'+(lv>0?' built':'');
  card.innerHTML='<div class="pb-icon">'+b.icon+'</div><div class="pb-name">'+b.name+'</div>'
   +'<div class="pb-lv">'+(lv>0?'Lv.'+lv:'미건설')+'</div>'
   +'<div class="pb-eff">'+b.effect+'</div>';
  card.onclick=function(){buildPalace(b.id);};
  div.appendChild(card);
 });
}

function buildPalace(id){
 var b=PALACE_BUILDINGS.find(function(bg){return bg.id===id;});if(!b)return;
 var lv=ST21.palace[id]||0;
 if(lv>=5){toast21('최대 레벨 달성!','#5a3a1a');return;}
 ST21.palace[id]=(lv||0)+1;save21();
 playSfx21(lv===0?'palace_build':'palace_upgrade');
 toast21(b.name+(lv===0?' 건설 완료!':' Lv.'+(lv+1)+' 업그레이드!'),'#2a5a2a');
 var builtCount=Object.keys(ST21.palace).filter(function(k){return ST21.palace[k]>0;}).length;
 if(builtCount>=5)checkAch21('palace_5');
 if(builtCount>=10)checkAch21('palace_all');
 renderPalaceBuildings();renderPalaceCanvas();
}

function renderPalaceCanvas(){
 var cv=document.getElementById('palace-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,560,360);
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,560,360);
 ctx.fillStyle='#c4956a';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('왕궁 건설 현황',280,24);
 var cols=5,rows=2,cellW=96,cellH=140;
 var startX=(560-cols*cellW)/2,startY=40;
 PALACE_BUILDINGS.forEach(function(b,i){
  var lv=ST21.palace[b.id]||0;
  var col=i%cols,row=Math.floor(i/cols);
  var x=startX+col*cellW,y=startY+row*cellH;
  ctx.fillStyle=lv>0?'rgba(40,35,15,.6)':'rgba(20,20,30,.4)';
  ctx.strokeStyle=lv>0?'#c4956a':'#3a3a4a';ctx.lineWidth=1;
  ctx.beginPath();ctx.roundRect(x+4,y+4,cellW-8,cellH-8,8);ctx.fill();ctx.stroke();
  ctx.fillStyle='#fff';ctx.font='28px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(b.icon,x+cellW/2,y+44);
  ctx.fillStyle=lv>0?'#FFD700':'#5a4a3a';ctx.font='bold 10px sans-serif';ctx.textBaseline='top';
  ctx.fillText(b.name,x+cellW/2,y+68);
  if(lv>0){
   ctx.fillStyle='#c4956a';ctx.font='9px sans-serif';
   ctx.fillText('Lv.'+lv,x+cellW/2,y+84);
   for(var s=0;s<5;s++){
    ctx.fillStyle=s<lv?'#FFD700':'#2a2a3a';
    ctx.fillRect(x+cellW/2-25+s*11,y+98,9,4);
   }
  }else{
   ctx.fillStyle='#3a3a4a';ctx.font='9px sans-serif';
   ctx.fillText('미건설',x+cellW/2,y+84);
  }
 });
}

function closePalaceBuilder(){var p=document.getElementById('v21-palace');if(p)p.classList.remove('on');}

// ─── 8. 전쟁사 연감 Canvas ───
var WAR_HISTORY=[
 {title:'환웅의 강림 전쟁',date:'BC 2400',result:'승리',detail:'환웅이 범족을 물리치고 신시를 건설. 비바람이 범족을 흐트림.'},
 {title:'단군의 통일 전쟁',date:'BC 2333',result:'승리',detail:'단군왕검이 고조선을 건국하고 주변 부족을 통일.'},
 {title:'고조선-연 국경 분쟁',date:'BC 300',result:'패탴',detail:'연나라 장수 진개의 침공으로 요동지역 상실.'},
 {title:'위만의 반란',date:'BC 194',result:'패배',detail:'위만이 준왕을 몰아내고 왕위를 창탈.'},
 {title:'왕검성 공방전',date:'BC 109',result:'방어 성공',detail:'한 무제의 1차 침공을 1년간 방어.'},
 {title:'왕검성 함락',date:'BC 108',result:'패배',detail:'내부 배신으로 왕검성 함락. 고조선 멸망.'},
 {title:'부여-선비 전쟁',date:'BC 100',result:'승리',detail:'부여가 선비족을 물리치고 만주 지배력 확대.'},
 {title:'주몽의 탈출전',date:'BC 37',result:'승리',detail:'주몽이 부여를 탈출하여 고구려를 건국.'},
 {title:'온조의 남천',date:'BC 18',result:'승리',detail:'온조가 위례성에 백제를 건국.'},
 {title:'삼한의 저항',date:'BC 50',result:'항전 중',detail:'삼한 78국이 연합하여 외세 침공에 저항.'}
];

function openWarAnnals(){
 var p=document.getElementById('v21-warlog');
 if(p){p.classList.add('on');renderWarCanvas();playSfx21('warlog_record');return;}
 p=document.createElement('div');p.id='v21-warlog';p.className='v21-panel on';
 var h='<h2>📚 전쟁사 연감</h2>';
 h+='<div class="v21-sub">고조선부터 삼한까지 주요 전쟁 기록</div>';
 h+='<div class="warlog-wrap"><canvas id="warlog-canvas" width="560" height="320"></canvas></div>';
 h+='<div class="warlog-entries" id="warlog-entries"></div>';
 h+='<button class="v21-close" onclick="closeWarAnnals()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 renderWarEntries();renderWarCanvas();playSfx21('warlog_record');
 checkAch21('war_scholar');
}

function renderWarEntries(){
 var div=document.getElementById('warlog-entries');if(!div)return;div.innerHTML='';
 WAR_HISTORY.forEach(function(w){
  var entry=document.createElement('div');entry.className='wl-entry';
  var rCol=w.result==='승리'?'#4CAF50':w.result==='패배'?'#FF4444':'#FFD700';
  entry.innerHTML='<div class="wl-title">'+w.title+'</div>'
   +'<div class="wl-date">'+w.date+'</div>'
   +'<div class="wl-result" style="color:'+rCol+'">'+w.result+'</div>'
   +'<div class="wl-detail">'+w.detail+'</div>';
  div.appendChild(entry);
 });
}

function renderWarCanvas(){
 var cv=document.getElementById('warlog-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,560,320);
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,560,320);
 ctx.fillStyle='#c4956a';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('전쟁 승패 분석',280,24);
 var wins=WAR_HISTORY.filter(function(w){return w.result==='승리';}).length;
 var losses=WAR_HISTORY.filter(function(w){return w.result==='패배';}).length;
 var draws=WAR_HISTORY.length-wins-losses;
 var total=WAR_HISTORY.length;
 var cx=160,cy=180,r=80;
 var angles=[wins/total*Math.PI*2,losses/total*Math.PI*2,draws/total*Math.PI*2];
 var colors=['#4CAF50','#FF4444','#FFD700'];
 var labels=['승리 '+wins,'패배 '+losses,'기타 '+draws];
 var startA=-Math.PI/2;
 angles.forEach(function(a,i){
  ctx.fillStyle=colors[i];ctx.beginPath();ctx.moveTo(cx,cy);
  ctx.arc(cx,cy,r,startA,startA+a);ctx.closePath();ctx.fill();
  startA+=a;
 });
 ctx.fillStyle='#0a0814';ctx.beginPath();ctx.arc(cx,cy,40,0,Math.PI*2);ctx.fill();
 ctx.fillStyle='#FFD700';ctx.font='bold 16px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
 ctx.fillText(total+'전',cx,cy);
 labels.forEach(function(l,i){
  ctx.fillStyle=colors[i];ctx.font='bold 11px sans-serif';ctx.textAlign='left';
  ctx.fillRect(320,60+i*30,14,14);
  ctx.fillStyle='#e8dcc8';ctx.textBaseline='middle';
  ctx.fillText(l,340,67+i*30);
 });
 var barY=200;
 ctx.fillStyle='#8a7a6a';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.textBaseline='top';
 ctx.fillText('시대별 전쟁 타임라인',420,barY-15);
 WAR_HISTORY.forEach(function(w,i){
  var x=320+i*22;var rCol=w.result==='승리'?'#4CAF50':w.result==='패배'?'#FF4444':'#FFD700';
  ctx.fillStyle=rCol;ctx.fillRect(x,barY,18,12);
  ctx.fillStyle='#5a4a3a';ctx.font='7px sans-serif';ctx.textAlign='center';
  ctx.fillText(i+1,x+9,barY+16);
 });
}

function closeWarAnnals(){var p=document.getElementById('v21-warlog');if(p)p.classList.remove('on');}

// ─── 퀴즈 v21 +15문항 (195→210) ───
var QUIZ21=[
 {q:'고조선의 대표적인 무기 재료는?',a:['청동','철','돌','나무'],c:0},
 {q:'고조선의 수도 아사달은 어디에 위치했다고 추정되는가?',a:['평양','서울','개성','부여'],c:0},
 {q:'고조선의 법률인 팔조법금에서 현재 전해지는 조항은 몇 개?',a:['3개','5개','8개','2개'],c:0},
 {q:'부여의 제천행사인 영고는 몇 월에 열렸는가?',a:['12월','정월','5월','10월'],c:0},
 {q:'고조선에서 제사장이 있는 지역을 뭐라고 불렀는가?',a:['소도','신시','사직','성읍'],c:0},
 {q:'위만조선을 침공한 중국의 황제는?',a:['한 무제','진시황','고조','태종'],c:0},
 {q:'고구려를 건국한 주몽의 아버지는?',a:['해모수','금와','동명왕','의자왕'],c:0},
 {q:'동예에서 열린 제천행사의 이름은?',a:['무천','영고','동맹','수릿날'],c:0},
 {q:'백제를 건국한 온조의 형은?',a:['비류','유리','주몽','대무신'],c:0},
 {q:'고조선의 대표적인 무덤은?',a:['고인돌','선돌','탑','비석'],c:0},
 {q:'삼한의 총 국가 수는?',a:['78국','50국','100국','30국'],c:0},
 {q:'부여의 특산품으로 유명한 것은?',a:['말(마)','모피','곡물','도자기'],c:0},
 {q:'고조선의 세형동검의 특징은?',a:['좁고 날카로움','굵은 형태','마름모 형태','원형'],c:0},
 {q:'옥저의 장례 풍습으로 알려진 것은?',a:['골장제','화장','산장','순장'],c:0},
 {q:'고조선의 건국 신화에서 곰이 사람이 되기 위해 먹은 것은?',a:['쑥과 마늘','벼와 과일','물과 빵','사슴고기'],c:0}
];

function injectQuiz21(){
 if(typeof window.QUIZ_POOL==='undefined')window.QUIZ_POOL=[];
 QUIZ21.forEach(function(q){
  var exists=window.QUIZ_POOL.some(function(eq){return eq.q===q.q;});
  if(!exists)window.QUIZ_POOL.push(q);
 });
}
injectQuiz21();

// ─── 업적 v21 +12개 (132→144) ───
var ACH21=[
 {id:'board_analyst',name:'전장 분석가',desc:'전술보드에서 전투력 분석 수행'},
 {id:'forge_master',name:'대장장이',desc:'장비 1개를 Lv.5까지 강화'},
 {id:'forge_legend',name:'전설의 대장장',desc:'장비 1개를 Lv.10까지 강화'},
 {id:'conqueror_5',name:'영토 확장자',desc:'5개 지역 정복 완료'},
 {id:'conqueror_all',name:'한반도 통일자',desc:'전체 10개 지역 정복'},
 {id:'chronicle_reader',name:'역사 탐구자',desc:'역사 연대기를 열람'},
 {id:'loot_collector',name:'전리품 수집가',desc:'6종류 이상 전리품 수집'},
 {id:'loot_master',name:'보물 창고지기',desc:'전체 12종 전리품 수집'},
 {id:'constellation_master',name:'별자리 완성자',desc:'영웅 1인의 스킬 전체 해금'},
 {id:'palace_5',name:'궁성 건축가',desc:'5개 건물 건설 완료'},
 {id:'palace_all',name:'왕궁 완성자',desc:'전체 10개 건물 건설'},
 {id:'war_scholar',name:'전쟁사 학자',desc:'전쟁사 연감을 열람'}
];

function checkAch21(id){
 var ach=JSON.parse(localStorage.getItem('krpg_ach')||'[]');
 if(ach.indexOf(id)>=0)return;
 var a=ACH21.find(function(ac){return ac.id===id;});if(!a)return;
 ach.push(id);localStorage.setItem('krpg_ach',JSON.stringify(ach));
 playSfx21('achieve_v21');toast21('🏆 업적 해금: '+a.name,'#5a3a0a');
}

// ─── 키보드 단축키 Shift+1~8 ───
document.addEventListener('keydown',function(e){
 if(!e.shiftKey)return;
 var panels={
  '1':openTacticalBoard,'2':openForge,'3':openConquestMap,'4':openChronicle,
  '!':openTacticalBoard,'@':openForge,'#':openConquestMap,'$':openChronicle,
  '5':openLootVault,'6':openConstellation,'7':openPalaceBuilder,'8':openWarAnnals,
  '%':openLootVault,'^':openConstellation,'&':openPalaceBuilder,'*':openWarAnnals
 };
 if(panels[e.key]){e.preventDefault();panels[e.key]();}
});

// ─── 하단 네비게이션 바 ───
var navBar=document.createElement('div');
navBar.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:137;display:flex;overflow-x:auto;background:rgba(10,6,8,.95);border-top:1px solid #3a2a1a;padding:4px 2px;gap:2px;-webkit-overflow-scrolling:touch';
var NAV21=[
 {label:'⚔️전술보드',fn:'openTacticalBoard'},
 {label:'🔨대장간',fn:'openForge'},
 {label:'🗺️정복맵',fn:'openConquestMap'},
 {label:'📜연대기',fn:'openChronicle'},
 {label:'🏰창고',fn:'openLootVault'},
 {label:'⭐별자리',fn:'openConstellation'},
 {label:'🏛️왕궁',fn:'openPalaceBuilder'},
 {label:'📚전쟁사',fn:'openWarAnnals'}
];
NAV21.forEach(function(n){
 var b=document.createElement('button');
 b.style.cssText='flex-shrink:0;padding:6px 10px;border:1px solid #3a2a1a;border-radius:6px;background:#1a1418;color:#c4956a;font-size:10px;font-family:inherit;cursor:pointer;white-space:nowrap';
 b.textContent=n.label;
 b.onclick=function(){window[n.fn]();};
 navBar.appendChild(b);
});
document.body.appendChild(navBar);

// ─── 전역 함수 노출 ───
window.openTacticalBoard=openTacticalBoard;
window.closeTacticalBoard=closeTacticalBoard;
window.clearBoard=clearBoard;
window.analyzeBoard=analyzeBoard;
window.openForge=openForge;
window.closeForge=closeForge;
window.openConquestMap=openConquestMap;
window.closeConquestMap=closeConquestMap;
window.openChronicle=openChronicle;
window.closeChronicle=closeChronicle;
window.chronicleNav=chronicleNav;
window.openLootVault=openLootVault;
window.closeLootVault=closeLootVault;
window.collectRandomLoot=collectRandomLoot;
window.openConstellation=openConstellation;
window.closeConstellation=closeConstellation;
window.openPalaceBuilder=openPalaceBuilder;
window.closePalaceBuilder=closePalaceBuilder;
window.buildPalace=buildPalace;
window.openWarAnnals=openWarAnnals;
window.closeWarAnnals=closeWarAnnals;
window.forgeEnhance=forgeEnhance;
window.attemptConquest=attemptConquest;

})();
