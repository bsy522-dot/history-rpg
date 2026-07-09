// v22_patch.js — 한국사 영웅전 v22.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v22-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:141;overflow-y:auto;padding:16px}',
'.v22-panel.on{display:block}',
'.v22-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v22-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v22-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v22-close:hover{background:#8B2A1A}',
'.v22-toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);padding:8px 20px;border-radius:20px;font-size:11px;font-weight:700;z-index:999;pointer-events:none;animation:v22fade 2s ease forwards}',
'@keyframes v22fade{0%{opacity:0;transform:translate(-50%,-10px)}10%{opacity:1;transform:translate(-50%,0)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-10px)}}',

'.spy-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.spy-wrap canvas{border:2px solid #4a3a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.spy-agents{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;max-width:580px;margin:8px auto}',
'.sa-card{background:linear-gradient(135deg,rgba(25,15,30,.95),rgba(15,10,20,.98));border:2px solid #4a3a5a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.sa-card:hover{border-color:#9966cc;transform:translateY(-2px)}',
'.sa-card.deployed{border-color:#FFD700;box-shadow:0 0 12px rgba(153,102,204,.25)}',
'.sa-card .sa-icon{font-size:28px}',
'.sa-card .sa-name{font-size:10px;color:#9966cc;font-weight:700;margin-top:2px}',
'.sa-card .sa-stat{font-size:8px;color:#8a7a6a;margin-top:2px}',

'.diplo-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.diplo-wrap canvas{border:2px solid #3a5a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.diplo-factions{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;max-width:580px;margin:8px auto}',
'.df-card{background:linear-gradient(135deg,rgba(15,25,25,.95),rgba(10,18,18,.98));border:2px solid #3a5a5a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.df-card:hover{border-color:#00bcd4;transform:translateY(-2px)}',
'.df-card.allied{border-color:#4CAF50;box-shadow:0 0 10px rgba(76,175,80,.2)}',
'.df-card.hostile{border-color:#FF4444;box-shadow:0 0 10px rgba(255,68,68,.2)}',
'.df-card .df-icon{font-size:24px}',
'.df-card .df-name{font-size:10px;color:#00bcd4;font-weight:700;margin-top:2px}',
'.df-card .df-rel{font-size:9px;margin-top:2px}',

'.bloodline-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.bloodline-wrap canvas{border:2px solid #5a4a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',

'.strategy-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.strategy-wrap canvas{border:2px solid #2a4a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.strat-books{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;max-width:580px;margin:8px auto}',
'.sb-card{background:linear-gradient(135deg,rgba(15,25,18,.95),rgba(10,18,12,.98));border:2px solid #2a4a3a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.sb-card:hover{border-color:#4CAF50;transform:translateY(-2px)}',
'.sb-card.learned{border-color:#FFD700;background:linear-gradient(135deg,rgba(35,30,10,.9),rgba(25,22,8,.95))}',
'.sb-card .sb-icon{font-size:22px}',
'.sb-card .sb-name{font-size:10px;color:#4CAF50;font-weight:700;margin-top:2px}',
'.sb-card .sb-eff{font-size:8px;color:#8a7a6a;margin-top:2px}',

'.formation-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.formation-wrap canvas{border:2px solid #5a3a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.form-btns{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.fm-btn{padding:6px 14px;border:1px solid #5a3a3a;border-radius:6px;background:#1a1214;color:#ff8866;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.fm-btn:hover{border-color:#ff8866;background:#2a1a1a}',
'.fm-btn.active{border-color:#FFD700;color:#FFD700;background:#2a2008}',

'.farm-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.farm-wrap canvas{border:2px solid #3a5a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.farm-controls{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.fc-btn{padding:6px 14px;border:1px solid #3a5a2a;border-radius:6px;background:#141a12;color:#8acc66;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.fc-btn:hover{border-color:#8acc66;background:#1a2a14}',
'.fc-btn.active{border-color:#FFD700;color:#FFD700;background:#2a2a08}',

'.ceremony-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.ceremony-wrap canvas{border:2px solid #5a5a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.cere-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;max-width:580px;margin:8px auto}',
'.cl-card{background:linear-gradient(135deg,rgba(25,25,15,.95),rgba(18,18,10,.98));border:2px solid #5a5a3a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.cl-card:hover{border-color:#ffc107;transform:translateY(-2px)}',
'.cl-card.completed{border-color:#FFD700;background:linear-gradient(135deg,rgba(40,38,12,.9),rgba(30,28,8,.95))}',
'.cl-card .cl-icon{font-size:24px}',
'.cl-card .cl-name{font-size:10px;color:#ffc107;font-weight:700;margin-top:2px}',
'.cl-card .cl-eff{font-size:8px;color:#8a7a6a;margin-top:2px}',

'.civtime-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.civtime-wrap canvas{border:2px solid #4a4a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.civtime-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.ct-btn{padding:6px 14px;border:1px solid #4a4a5a;border-radius:6px;background:#12121a;color:#8888cc;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.ct-btn:hover{border-color:#8888cc;background:#1a1a2a}',
'.ct-btn.active{border-color:#FFD700;color:#FFD700;background:#1a1a28}'
].join('\n');
document.head.appendChild(css);

var SFX22={};
function initSFX22(){
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
 SFX22.spy_deploy=mkSfx(380,'triangle',.2,.12);
 SFX22.spy_report=mkSfx(620,'sine',.3,.13);
 SFX22.diplo_ally=mkSfx(550,'sine',.4,.14);
 SFX22.diplo_hostile=mkSfx(180,'sawtooth',.25,.12);
 SFX22.blood_discover=mkSfx(700,'triangle',.35,.12);
 SFX22.strat_learn=mkSfx(880,'sine',.4,.13);
 SFX22.form_set=mkSfx(440,'square',.15,.11);
 SFX22.farm_harvest=mkSfx(520,'sine',.3,.14);
 SFX22.cere_perform=mkSfx(660,'triangle',.45,.15);
 SFX22.cere_complete=mkSfx(990,'sine',.5,.14);
 SFX22.civtime_switch=mkSfx(330,'triangle',.15,.1);
 SFX22.achieve_v22=mkSfx(1200,'sine',.5,.15);
}
initSFX22();
function playSfx22(name){if(SFX22[name])SFX22[name]();}

function toast22(msg,color){
 var t=document.createElement('div');t.className='v22-toast';
 t.style.background=color||'#2a5a2a';t.style.color='#fff';t.textContent=msg;
 document.body.appendChild(t);setTimeout(function(){t.remove()},2200);
}

var ST22=JSON.parse(localStorage.getItem('krpg_v22')||'{}');
function save22(){localStorage.setItem('krpg_v22',JSON.stringify(ST22));}

// ─── 1. 첩보정보망 관리기 Canvas 8요원 ───
var SPY_AGENTS=[
 {id:'scout',name:'정찰병',icon:'🔍',skill:'지형탐색',power:6,cost:10},
 {id:'assassin',name:'자객',icon:'🗡️',skill:'암살',power:14,cost:30},
 {id:'diplomat',name:'밀사',icon:'📜',skill:'외교공작',power:8,cost:20},
 {id:'saboteur',name:'파괴공작원',icon:'💥',skill:'시설파괴',power:12,cost:25},
 {id:'informer',name:'내통자',icon:'👤',skill:'정보수집',power:10,cost:15},
 {id:'poisoner',name:'독살자',icon:'🧪',skill:'독살',power:11,cost:22},
 {id:'thief',name:'도적',icon:'🦝',skill:'절도',power:9,cost:18},
 {id:'shadow',name:'그림자',icon:'🌑',skill:'잠입',power:13,cost:28}
];
if(!ST22.spies)ST22.spies={};
if(!ST22.spyMissions)ST22.spyMissions=0;

function openSpyNetwork(){
 var p=document.getElementById('v22-spy');
 if(p){p.classList.add('on');renderSpyCanvas();playSfx22('spy_deploy');return;}
 p=document.createElement('div');p.id='v22-spy';p.className='v22-panel on';
 var h='<h2>🕵️ 첩보 정보망</h2>';
 h+='<div class="v22-sub">8명의 첩보원을 배치하여 적진의 정보를 수집하세요</div>';
 h+='<div class="spy-wrap"><canvas id="spy-canvas" width="580" height="380"></canvas></div>';
 h+='<div class="spy-agents" id="spy-agents"></div>';
 h+='<div style="display:flex;gap:8px;justify-content:center;margin:8px 0">';
 h+='<button class="fm-btn" onclick="runSpyMission()">첩보 임무 실행</button>';
 h+='<button class="fm-btn" onclick="resetSpyNetwork()">정보망 초기화</button>';
 h+='</div>';
 h+='<button class="v22-close" onclick="closeSpyNetwork()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 renderSpyAgents();renderSpyCanvas();playSfx22('spy_deploy');
}

function renderSpyAgents(){
 var div=document.getElementById('spy-agents');if(!div)return;div.innerHTML='';
 SPY_AGENTS.forEach(function(ag){
  var deployed=ST22.spies[ag.id]||false;
  var card=document.createElement('div');card.className='sa-card'+(deployed?' deployed':'');
  card.innerHTML='<div class="sa-icon">'+ag.icon+'</div><div class="sa-name">'+ag.name+'</div>'
   +'<div class="sa-stat">'+ag.skill+' | 전투력 '+ag.power+'</div>'
   +'<div class="sa-stat">'+(deployed?'✅ 배치됨':'대기 중')+'</div>';
  card.onclick=function(){toggleSpy(ag.id);};
  div.appendChild(card);
 });
}

function toggleSpy(id){
 ST22.spies[id]=!ST22.spies[id];save22();
 renderSpyAgents();renderSpyCanvas();
 playSfx22(ST22.spies[id]?'spy_deploy':'spy_report');
 var deployed=Object.keys(ST22.spies).filter(function(k){return ST22.spies[k];}).length;
 if(deployed>=4)checkAch22('spy_4');
 if(deployed>=8)checkAch22('spy_master');
}

function runSpyMission(){
 var deployed=Object.keys(ST22.spies).filter(function(k){return ST22.spies[k];}).length;
 if(deployed===0){toast22('배치된 첩보원이 없습니다','#5a2a2a');return;}
 var totalPower=SPY_AGENTS.filter(function(a){return ST22.spies[a.id];}).reduce(function(s,a){return s+a.power;},0);
 var success=Math.random()*100<(40+totalPower*2);
 ST22.spyMissions=(ST22.spyMissions||0)+1;save22();
 if(success){
  playSfx22('spy_report');toast22('첩보 성공! 전투력 '+totalPower+' 정보 획득','#2a5a2a');
  if(ST22.spyMissions>=10)checkAch22('spy_veteran');
 }else{
  playSfx22('spy_deploy');toast22('첩보 실패... 요원 은신 중','#5a2a2a');
 }
 renderSpyCanvas();
}

function resetSpyNetwork(){ST22.spies={};ST22.spyMissions=0;save22();renderSpyAgents();renderSpyCanvas();toast22('정보망 초기화','#5a3a1a');}

function renderSpyCanvas(){
 var cv=document.getElementById('spy-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,580,380);
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,580,380);
 ctx.fillStyle='#9966cc';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('첩보 정보망 현황',290,24);
 var cx=290,cy=200,r=120;
 ctx.strokeStyle='#2a2a3a';ctx.lineWidth=1;
 for(var ring=1;ring<=3;ring++){
  ctx.beginPath();ctx.arc(cx,cy,r*ring/3,0,Math.PI*2);ctx.stroke();
 }
 SPY_AGENTS.forEach(function(ag,i){
  var angle=(i/SPY_AGENTS.length)*Math.PI*2-Math.PI/2;
  var deployed=ST22.spies[ag.id]||false;
  var dist=deployed?r*0.85:r*0.4;
  var ax=cx+Math.cos(angle)*dist,ay=cy+Math.sin(angle)*dist;
  ctx.strokeStyle=deployed?'#9966cc44':'#2a2a3a';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(ax,ay);ctx.stroke();
  ctx.fillStyle=deployed?'#9966cc':'#3a3a4a';
  ctx.beginPath();ctx.arc(ax,ay,16,0,Math.PI*2);ctx.fill();
  if(deployed){ctx.strokeStyle='#FFD700';ctx.lineWidth=2;ctx.beginPath();ctx.arc(ax,ay,18,0,Math.PI*2);ctx.stroke();}
  ctx.fillStyle='#fff';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(ag.icon,ax,ay);
  ctx.fillStyle=deployed?'#c4956a':'#5a5a6a';ctx.font='9px sans-serif';ctx.textBaseline='top';
  ctx.fillText(ag.name,ax,ay+22);
 });
 ctx.fillStyle='#FFD700';ctx.beginPath();ctx.arc(cx,cy,8,0,Math.PI*2);ctx.fill();
 ctx.fillStyle='#0a0814';ctx.font='bold 8px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
 ctx.fillText('본진',cx,cy);
 var deployed=Object.keys(ST22.spies).filter(function(k){return ST22.spies[k];}).length;
 ctx.fillStyle='#8a7a6a';ctx.font='10px sans-serif';ctx.textAlign='left';ctx.textBaseline='top';
 ctx.fillText('배치: '+deployed+'/8 | 임무: '+(ST22.spyMissions||0)+'회',12,360);
}

function closeSpyNetwork(){var p=document.getElementById('v22-spy');if(p)p.classList.remove('on');}

// ─── 2. 외교동맹 관계도 Canvas 8세력 ───
var DIPLO_FACTIONS=[
 {id:'gojoseon',name:'고조선',icon:'🏛️',power:90,color:'#FFD700'},
 {id:'buyeo',name:'부여',icon:'🐴',power:70,color:'#4CAF50'},
 {id:'goguryeo',name:'고구려',icon:'⚔️',power:85,color:'#FF4444'},
 {id:'baekje',name:'백제',icon:'🌸',power:65,color:'#E91E63'},
 {id:'silla',name:'신라',icon:'👑',power:60,color:'#2196F3'},
 {id:'gaya',name:'가야',icon:'🛡️',power:50,color:'#FF9800'},
 {id:'okjeo',name:'옥저',icon:'🐟',power:35,color:'#00BCD4'},
 {id:'dongye',name:'동예',icon:'🏔️',power:40,color:'#8BC34A'}
];
if(!ST22.diplomacy)ST22.diplomacy={};

function openDiplomacy(){
 var p=document.getElementById('v22-diplo');
 if(p){p.classList.add('on');renderDiploCanvas();playSfx22('diplo_ally');return;}
 p=document.createElement('div');p.id='v22-diplo';p.className='v22-panel on';
 var h='<h2>🤝 외교동맹 관계도</h2>';
 h+='<div class="v22-sub">세력 간 동맹과 적대 관계를 관리하세요</div>';
 h+='<div class="diplo-wrap"><canvas id="diplo-canvas" width="580" height="400"></canvas></div>';
 h+='<div class="diplo-factions" id="diplo-factions"></div>';
 h+='<button class="v22-close" onclick="closeDiplomacy()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 renderDiploFactions();renderDiploCanvas();playSfx22('diplo_ally');
}

function renderDiploFactions(){
 var div=document.getElementById('diplo-factions');if(!div)return;div.innerHTML='';
 DIPLO_FACTIONS.forEach(function(f){
  var rel=ST22.diplomacy[f.id]||'neutral';
  var card=document.createElement('div');
  card.className='df-card'+(rel==='ally'?' allied':rel==='hostile'?' hostile':'');
  var relText=rel==='ally'?'🤝 동맹':rel==='hostile'?'⚔️ 적대':'⚖️ 중립';
  var relColor=rel==='ally'?'#4CAF50':rel==='hostile'?'#FF4444':'#8a7a6a';
  card.innerHTML='<div class="df-icon">'+f.icon+'</div><div class="df-name">'+f.name+'</div>'
   +'<div class="df-rel" style="color:'+relColor+'">'+relText+'</div>'
   +'<div class="sa-stat">전력: '+f.power+'</div>';
  card.onclick=function(){cycleDiplo(f.id);};
  div.appendChild(card);
 });
}

function cycleDiplo(id){
 var cur=ST22.diplomacy[id]||'neutral';
 var next=cur==='neutral'?'ally':cur==='ally'?'hostile':'neutral';
 ST22.diplomacy[id]=next;save22();
 playSfx22(next==='ally'?'diplo_ally':next==='hostile'?'diplo_hostile':'civtime_switch');
 renderDiploFactions();renderDiploCanvas();
 var allies=Object.values(ST22.diplomacy).filter(function(v){return v==='ally';}).length;
 if(allies>=3)checkAch22('diplo_3ally');
 if(allies>=6)checkAch22('diplo_peace');
}

function renderDiploCanvas(){
 var cv=document.getElementById('diplo-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,580,400);
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,580,400);
 ctx.fillStyle='#00bcd4';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('세력 관계도',290,24);
 var cx=290,cy=210,r=140;
 DIPLO_FACTIONS.forEach(function(f,i){
  var angle=(i/DIPLO_FACTIONS.length)*Math.PI*2-Math.PI/2;
  var fx=cx+Math.cos(angle)*r,fy=cy+Math.sin(angle)*r;
  DIPLO_FACTIONS.forEach(function(f2,j){
   if(j<=i)return;
   var rel1=ST22.diplomacy[f.id]||'neutral';
   var rel2=ST22.diplomacy[f2.id]||'neutral';
   if(rel1===rel2&&rel1!=='neutral'){
    var angle2=(j/DIPLO_FACTIONS.length)*Math.PI*2-Math.PI/2;
    var fx2=cx+Math.cos(angle2)*r,fy2=cy+Math.sin(angle2)*r;
    ctx.strokeStyle=rel1==='ally'?'rgba(76,175,80,.3)':'rgba(255,68,68,.3)';
    ctx.lineWidth=2;ctx.setLineDash(rel1==='hostile'?[4,4]:[]);
    ctx.beginPath();ctx.moveTo(fx,fy);ctx.lineTo(fx2,fy2);ctx.stroke();
    ctx.setLineDash([]);
   }
  });
 });
 DIPLO_FACTIONS.forEach(function(f,i){
  var angle=(i/DIPLO_FACTIONS.length)*Math.PI*2-Math.PI/2;
  var fx=cx+Math.cos(angle)*r,fy=cy+Math.sin(angle)*r;
  var rel=ST22.diplomacy[f.id]||'neutral';
  var sz=14+f.power/10;
  ctx.fillStyle=f.color+'44';ctx.beginPath();ctx.arc(fx,fy,sz+4,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=f.color;ctx.beginPath();ctx.arc(fx,fy,sz,0,Math.PI*2);ctx.fill();
  if(rel==='ally'){ctx.strokeStyle='#4CAF50';ctx.lineWidth=3;ctx.beginPath();ctx.arc(fx,fy,sz+2,0,Math.PI*2);ctx.stroke();}
  if(rel==='hostile'){ctx.strokeStyle='#FF4444';ctx.lineWidth=3;ctx.beginPath();ctx.arc(fx,fy,sz+2,0,Math.PI*2);ctx.stroke();}
  ctx.fillStyle='#fff';ctx.font='16px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(f.icon,fx,fy);
  ctx.fillStyle='#e8dcc8';ctx.font='bold 10px sans-serif';ctx.textBaseline='top';
  ctx.fillText(f.name,fx,fy+sz+6);
 });
 var allies=Object.values(ST22.diplomacy).filter(function(v){return v==='ally';}).length;
 var hostiles=Object.values(ST22.diplomacy).filter(function(v){return v==='hostile';}).length;
 ctx.fillStyle='#8a7a6a';ctx.font='10px sans-serif';ctx.textAlign='left';ctx.textBaseline='top';
 ctx.fillText('동맹: '+allies+' | 적대: '+hostiles+' | 중립: '+(8-allies-hostiles),12,385);
}

function closeDiplomacy(){var p=document.getElementById('v22-diplo');if(p)p.classList.remove('on');}

// ─── 3. 영웅 가계도 혈통 Canvas 6세대 ───
var BLOODLINE=[
 {gen:0,name:'환인',title:'천제',icon:'☀️',x:290,y:40},
 {gen:1,name:'환웅',title:'천왕',icon:'⚡',x:170,y:110,parent:0},
 {gen:1,name:'웅녀',title:'곰족 여인',icon:'🐻',x:410,y:110,parent:0},
 {gen:2,name:'단군왕검',title:'고조선 시조',icon:'👑',x:290,y:180,parent:1},
 {gen:3,name:'부루',title:'태자',icon:'🏰',x:170,y:250,parent:3},
 {gen:3,name:'부소',title:'왕자',icon:'⚔️',x:410,y:250,parent:3},
 {gen:4,name:'해모수',title:'북부여왕',icon:'🌟',x:100,y:320,parent:4},
 {gen:4,name:'금와',title:'동부여왕',icon:'🐸',x:290,y:320,parent:4},
 {gen:4,name:'위만',title:'위만조선왕',icon:'🗡️',x:480,y:320,parent:5},
 {gen:5,name:'주몽',title:'고구려 시조',icon:'🏹',x:100,y:390,parent:6},
 {gen:5,name:'비류',title:'비류백제',icon:'🌊',x:220,y:390,parent:7},
 {gen:5,name:'온조',title:'백제 시조',icon:'🌸',x:360,y:390,parent:7},
 {gen:5,name:'우거왕',title:'위만조선 말왕',icon:'💀',x:480,y:390,parent:8}
];

function openBloodline(){
 var p=document.getElementById('v22-blood');
 if(p){p.classList.add('on');renderBloodCanvas();playSfx22('blood_discover');return;}
 p=document.createElement('div');p.id='v22-blood';p.className='v22-panel on';
 var h='<h2>👪 영웅 가계도</h2>';
 h+='<div class="v22-sub">고조선 건국 시조부터 삼국 시조까지의 혈통을 탐구하세요</div>';
 h+='<div class="bloodline-wrap"><canvas id="blood-canvas" width="580" height="440"></canvas></div>';
 h+='<button class="v22-close" onclick="closeBloodline()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 renderBloodCanvas();playSfx22('blood_discover');
 checkAch22('bloodline_viewer');
}

function renderBloodCanvas(){
 var cv=document.getElementById('blood-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,580,440);
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,580,440);
 ctx.fillStyle='#c4956a';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('고대 영웅 가계도',290,20);
 BLOODLINE.forEach(function(b){
  if(b.parent!==undefined){
   var par=BLOODLINE[b.parent];
   ctx.strokeStyle='#5a4a3a';ctx.lineWidth=2;
   ctx.beginPath();ctx.moveTo(par.x,par.y+16);ctx.lineTo(b.x,b.y-16);ctx.stroke();
  }
 });
 var genColors=['#FFD700','#FF8844','#4CAF50','#2196F3','#9C27B0','#FF5722'];
 BLOODLINE.forEach(function(b){
  var col=genColors[b.gen]||'#888';
  ctx.fillStyle=col+'33';ctx.beginPath();ctx.arc(b.x,b.y,22,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=col;ctx.beginPath();ctx.arc(b.x,b.y,18,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=col;ctx.lineWidth=2;ctx.beginPath();ctx.arc(b.x,b.y,20,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle='#fff';ctx.font='16px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(b.icon,b.x,b.y);
  ctx.fillStyle='#e8dcc8';ctx.font='bold 9px sans-serif';ctx.textBaseline='top';
  ctx.fillText(b.name,b.x,b.y+24);
  ctx.fillStyle='#8a7a6a';ctx.font='8px sans-serif';
  ctx.fillText(b.title,b.x,b.y+36);
 });
}

function closeBloodline(){var p=document.getElementById('v22-blood');if(p)p.classList.remove('on');}

// ─── 4. 병법서 연구소 Canvas 12병법 ───
var STRATEGY_BOOKS=[
 {id:'sunzi',name:'손자병법',icon:'📖',effect:'공격+15%',stat:15},
 {id:'wuzi',name:'오자병법',icon:'📗',effect:'방어+12%',stat:12},
 {id:'liutao',name:'육도삼략',icon:'📕',effect:'전략+18%',stat:18},
 {id:'simafa',name:'사마법',icon:'📘',effect:'군율+10%',stat:10},
 {id:'weiliao',name:'위료자',icon:'📙',effect:'사기+14%',stat:14},
 {id:'sanshiliu',name:'삼십육계',icon:'📓',effect:'기만+20%',stat:20},
 {id:'zhanguo',name:'전국책',icon:'📔',effect:'외교+16%',stat:16},
 {id:'yijing',name:'역경 병법',icon:'🔮',effect:'예측+13%',stat:13},
 {id:'guiguzi',name:'귀곡자',icon:'🏔️',effect:'첩보+17%',stat:17},
 {id:'huangshi',name:'황석공삼략',icon:'📜',effect:'통솔+11%',stat:11},
 {id:'taigong',name:'태공망병법',icon:'🎣',effect:'지휘+19%',stat:19},
 {id:'wubeizhi',name:'무비지',icon:'⚔️',effect:'종합+10%',stat:10}
];
if(!ST22.strategies)ST22.strategies={};

function openStrategyLib(){
 var p=document.getElementById('v22-strat');
 if(p){p.classList.add('on');renderStratCanvas();playSfx22('strat_learn');return;}
 p=document.createElement('div');p.id='v22-strat';p.className='v22-panel on';
 var h='<h2>📚 병법서 연구소</h2>';
 h+='<div class="v22-sub">고대 병법서를 연구하여 군사력을 강화하세요</div>';
 h+='<div class="strategy-wrap"><canvas id="strat-canvas" width="580" height="360"></canvas></div>';
 h+='<div class="strat-books" id="strat-books"></div>';
 h+='<button class="v22-close" onclick="closeStrategyLib()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 renderStratBooks();renderStratCanvas();playSfx22('strat_learn');
}

function renderStratBooks(){
 var div=document.getElementById('strat-books');if(!div)return;div.innerHTML='';
 STRATEGY_BOOKS.forEach(function(b){
  var learned=ST22.strategies[b.id]||false;
  var card=document.createElement('div');card.className='sb-card'+(learned?' learned':'');
  card.innerHTML='<div class="sb-icon">'+b.icon+'</div><div class="sb-name">'+b.name+'</div>'
   +'<div class="sb-eff">'+b.effect+'</div>'
   +'<div class="sa-stat">'+(learned?'✅ 습득':'미연구')+'</div>';
  card.onclick=function(){learnStrategy(b.id);};
  div.appendChild(card);
 });
}

function learnStrategy(id){
 if(ST22.strategies[id]){toast22('이미 습득한 병법입니다','#5a3a1a');return;}
 var success=Math.random()>0.25;
 if(success){
  ST22.strategies[id]=true;save22();
  var b=STRATEGY_BOOKS.find(function(s){return s.id===id;});
  playSfx22('strat_learn');toast22(b.name+' 습득 완료! '+b.effect,'#2a5a2a');
  var learned=Object.keys(ST22.strategies).filter(function(k){return ST22.strategies[k];}).length;
  if(learned>=6)checkAch22('strat_6');
  if(learned>=12)checkAch22('strat_master');
 }else{
  toast22('연구 실패... 다시 도전하세요','#5a2a2a');
 }
 renderStratBooks();renderStratCanvas();
}

function renderStratCanvas(){
 var cv=document.getElementById('strat-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,580,360);
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,580,360);
 ctx.fillStyle='#4CAF50';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('병법 연구 현황',290,24);
 var barW=38,gap=8,startX=20;
 STRATEGY_BOOKS.forEach(function(b,i){
  var learned=ST22.strategies[b.id]||false;
  var x=startX+i*(barW+gap);var maxH=240;
  var h=learned?maxH*(b.stat/20):maxH*0.05;
  ctx.fillStyle='#1a2a1a';ctx.fillRect(x,50,barW,maxH);
  var grd=ctx.createLinearGradient(0,50+maxH-h,0,50+maxH);
  grd.addColorStop(0,learned?'#4CAF50':'#2a3a2a');
  grd.addColorStop(1,learned?'#2E7D32':'#1a2a1a');
  ctx.fillStyle=grd;ctx.fillRect(x,50+maxH-h,barW,h);
  if(learned){
   ctx.fillStyle='#FFD700';ctx.font='bold 9px sans-serif';ctx.textAlign='center';
   ctx.fillText('+'+b.stat+'%',x+barW/2,50+maxH-h-8);
  }
  ctx.fillStyle='#8a7a6a';ctx.font='9px sans-serif';ctx.textAlign='center';
  ctx.fillText(b.icon,x+barW/2,310);
  ctx.fillStyle='#5a5a6a';ctx.font='7px sans-serif';
  ctx.fillText(b.name.slice(0,3),x+barW/2,325);
 });
 var learned=Object.keys(ST22.strategies).filter(function(k){return ST22.strategies[k];}).length;
 ctx.fillStyle='#8a7a6a';ctx.font='10px sans-serif';ctx.textAlign='left';
 ctx.fillText('습득: '+learned+'/12',12,350);
}

function closeStrategyLib(){var p=document.getElementById('v22-strat');if(p)p.classList.remove('on');}

// ─── 5. 전투진형 편성기 Canvas 8진형 ───
var FORMATIONS=[
 {id:'crane',name:'학익진',icon:'🦅',desc:'양 날개를 펼쳐 적을 포위',power:85,
  units:[[4,1],[2,2],[6,2],[1,3],[7,3],[0,4],[8,4],[3,5],[5,5],[4,6]]},
 {id:'fish',name:'어린진',icon:'🐟',desc:'물고기 비늘처럼 촘촘한 방어',power:90,
  units:[[4,1],[3,2],[5,2],[2,3],[4,3],[6,3],[1,4],[3,4],[5,4],[7,4]]},
 {id:'arrow',name:'추형진',icon:'🔺',desc:'화살촉 모양의 돌격 대형',power:95,
  units:[[4,1],[3,2],[5,2],[4,3],[2,4],[6,4],[3,5],[5,5],[1,6],[7,6]]},
 {id:'circle',name:'원진',icon:'⭕',desc:'사방을 방어하는 원형 대형',power:80,
  units:[[4,1],[2,2],[6,2],[1,4],[7,4],[2,6],[6,6],[4,7],[3,4],[5,4]]},
 {id:'crescent',name:'언월진',icon:'🌙',desc:'반달 모양으로 적을 감싸는 진형',power:88,
  units:[[0,4],[1,3],[2,2],[3,1],[4,1],[5,1],[6,2],[7,3],[8,4],[4,3]]},
 {id:'wedge',name:'쐐기진',icon:'🔻',desc:'적 전열을 관통하는 쐐기형',power:92,
  units:[[4,1],[4,2],[3,3],[5,3],[4,4],[2,5],[6,5],[4,6],[1,7],[7,7]]},
 {id:'square',name:'방진',icon:'⬜',desc:'사각형 방어 진형',power:78,
  units:[[2,2],[4,2],[6,2],[2,4],[6,4],[2,6],[4,6],[6,6],[4,4],[3,3]]},
 {id:'zigzag',name:'사행진',icon:'🐍',desc:'뱀처럼 유연하게 이동하는 진형',power:82,
  units:[[2,1],[3,2],[4,3],[5,4],[4,5],[3,6],[2,7],[3,3],[5,2],[4,6]]}
];
if(!ST22.formation)ST22.formation='crane';

function openFormation(){
 var p=document.getElementById('v22-form');
 if(p){p.classList.add('on');renderFormCanvas();playSfx22('form_set');return;}
 p=document.createElement('div');p.id='v22-form';p.className='v22-panel on';
 var h='<h2>🗡️ 전투진형 편성기</h2>';
 h+='<div class="v22-sub">8가지 고대 전투진형을 연구하고 편성하세요</div>';
 h+='<div class="formation-wrap"><canvas id="form-canvas" width="580" height="400"></canvas></div>';
 h+='<div class="form-btns" id="form-btns"></div>';
 h+='<button class="v22-close" onclick="closeFormation()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 renderFormBtns();renderFormCanvas();playSfx22('form_set');
 checkAch22('formation_viewer');
}

function renderFormBtns(){
 var div=document.getElementById('form-btns');if(!div)return;div.innerHTML='';
 FORMATIONS.forEach(function(f){
  var b=document.createElement('button');
  b.className='fm-btn'+(ST22.formation===f.id?' active':'');
  b.textContent=f.icon+' '+f.name;
  b.onclick=function(){ST22.formation=f.id;save22();renderFormBtns();renderFormCanvas();playSfx22('form_set');};
  div.appendChild(b);
 });
}

function renderFormCanvas(){
 var cv=document.getElementById('form-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,580,400);
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,580,400);
 var f=FORMATIONS.find(function(fm){return fm.id===ST22.formation;});
 if(!f)f=FORMATIONS[0];
 ctx.fillStyle='#ff8866';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText(f.icon+' '+f.name+' (전투력: '+f.power+')',290,24);
 ctx.fillStyle='#8a7a6a';ctx.font='11px sans-serif';
 ctx.fillText(f.desc,290,44);
 var gridSize=9,cellSize=36,offX=(580-gridSize*cellSize)/2,offY=60;
 for(var gy=0;gy<=gridSize;gy++){
  ctx.strokeStyle='#1a1a2a';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(offX,offY+gy*cellSize);ctx.lineTo(offX+gridSize*cellSize,offY+gy*cellSize);ctx.stroke();
  ctx.beginPath();ctx.moveTo(offX+gy*cellSize,offY);ctx.lineTo(offX+gy*cellSize,offY+gridSize*cellSize);ctx.stroke();
 }
 f.units.forEach(function(u,i){
  var ux=offX+u[0]*cellSize+cellSize/2,uy=offY+u[1]*cellSize+cellSize/2;
  var isLeader=i===0;
  ctx.fillStyle=isLeader?'#FFD700':'#ff8866';
  ctx.beginPath();ctx.arc(ux,uy,14,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=isLeader?'#FFD70044':'#ff886644';
  ctx.beginPath();ctx.arc(ux,uy,18,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#0a0814';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(isLeader?'장':''+(i+1),ux,uy);
 });
 ctx.fillStyle='#c4956a';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.textBaseline='top';
 ctx.fillText('⚔️ 클릭하여 진형을 전환하세요',290,offY+gridSize*cellSize+12);
 var bx=40,by=offY+gridSize*cellSize+35;
 ctx.fillStyle='#5a4a3a';ctx.font='9px sans-serif';ctx.textAlign='left';
 FORMATIONS.forEach(function(fm,i){
  var col=i<4?0:1;var row=i%4;
  ctx.fillStyle=fm.id===ST22.formation?'#FFD700':'#5a4a3a';
  ctx.fillText(fm.icon+' '+fm.name+' ('+fm.power+')',bx+col*280,by+row*14);
 });
}

function closeFormation(){var p=document.getElementById('v22-form');if(p)p.classList.remove('on');}

// ─── 6. 사계절 농경 시뮬레이터 Canvas ───
var SEASONS=[
 {id:'spring',name:'봄',icon:'🌱',color:'#4CAF50',crops:['벼','보리','조','기장'],task:'파종'},
 {id:'summer',name:'여름',icon:'☀️',color:'#FF9800',crops:['콩','팥','수수','피'],task:'관개'},
 {id:'autumn',name:'가을',icon:'🍂',color:'#FF5722',crops:['벼','조','콩','기장'],task:'수확'},
 {id:'winter',name:'겨울',icon:'❄️',color:'#2196F3',crops:['저장','건조','발효','직조'],task:'보관'}
];
if(!ST22.farm)ST22.farm={season:0,harvests:0,stores:{}};

function openFarming(){
 var p=document.getElementById('v22-farm');
 if(p){p.classList.add('on');renderFarmCanvas();playSfx22('farm_harvest');return;}
 p=document.createElement('div');p.id='v22-farm';p.className='v22-panel on';
 var h='<h2>🌾 사계절 농경 시뮬레이터</h2>';
 h+='<div class="v22-sub">고대 한반도의 농경을 체험하세요. 계절마다 다른 작물을 경작합니다</div>';
 h+='<div class="farm-wrap"><canvas id="farm-canvas" width="580" height="380"></canvas></div>';
 h+='<div class="farm-controls" id="farm-controls"></div>';
 h+='<div style="display:flex;gap:8px;justify-content:center;margin:8px 0">';
 h+='<button class="fc-btn" onclick="advanceSeason()">다음 계절로</button>';
 h+='<button class="fc-btn" onclick="harvestAll()">작업 수행</button>';
 h+='</div>';
 h+='<button class="v22-close" onclick="closeFarming()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 renderFarmCanvas();playSfx22('farm_harvest');
}

function advanceSeason(){
 ST22.farm.season=(ST22.farm.season+1)%4;save22();
 renderFarmCanvas();playSfx22('civtime_switch');
 toast22(SEASONS[ST22.farm.season].icon+' '+SEASONS[ST22.farm.season].name+'이 왔습니다','#2a4a2a');
}

function harvestAll(){
 var s=SEASONS[ST22.farm.season];
 s.crops.forEach(function(c){
  ST22.farm.stores[c]=(ST22.farm.stores[c]||0)+Math.floor(Math.random()*20+10);
 });
 ST22.farm.harvests=(ST22.farm.harvests||0)+1;save22();
 playSfx22('farm_harvest');
 toast22(s.task+' 완료! 작물 '+s.crops.length+'종 획득','#2a5a2a');
 if(ST22.farm.harvests>=4)checkAch22('farm_cycle');
 if(ST22.farm.harvests>=20)checkAch22('farm_master');
 renderFarmCanvas();
}

function renderFarmCanvas(){
 var cv=document.getElementById('farm-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,580,380);
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,580,380);
 var s=SEASONS[ST22.farm.season];
 ctx.fillStyle=s.color;ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText(s.icon+' '+s.name+' — '+s.task,290,24);
 var fieldW=120,fieldH=80,startX=50,startY=50;
 SEASONS.forEach(function(sn,si){
  var col=si%2,row=Math.floor(si/2);
  var fx=startX+col*(fieldW+40),fy=startY+row*(fieldH+30);
  var isCurrent=si===ST22.farm.season;
  ctx.fillStyle=isCurrent?sn.color+'33':'#1a1a2a';
  ctx.strokeStyle=isCurrent?sn.color:'#2a2a3a';ctx.lineWidth=isCurrent?2:1;
  ctx.beginPath();ctx.roundRect(fx,fy,fieldW,fieldH,8);ctx.fill();ctx.stroke();
  ctx.fillStyle=isCurrent?'#fff':sn.color;ctx.font='24px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(sn.icon,fx+fieldW/2,fy+30);
  ctx.fillStyle=isCurrent?'#FFD700':'#5a5a6a';ctx.font='bold 10px sans-serif';ctx.textBaseline='top';
  ctx.fillText(sn.name+' ('+sn.task+')',fx+fieldW/2,fy+55);
  ctx.fillStyle='#8a7a6a';ctx.font='8px sans-serif';
  ctx.fillText(sn.crops.join(', '),fx+fieldW/2,fy+70);
 });
 var storeX=380,storeY=50;
 ctx.fillStyle='#c4956a';ctx.font='bold 12px sans-serif';ctx.textAlign='left';ctx.textBaseline='top';
 ctx.fillText('📦 창고 현황',storeX,storeY);
 var stores=ST22.farm.stores||{};
 var storeKeys=Object.keys(stores);
 if(storeKeys.length===0){
  ctx.fillStyle='#5a5a6a';ctx.font='10px sans-serif';
  ctx.fillText('창고가 비어있습니다',storeX,storeY+20);
 }else{
  storeKeys.forEach(function(k,i){
   var barMax=160,val=Math.min(stores[k],100);
   ctx.fillStyle='#1a2a1a';ctx.fillRect(storeX,storeY+20+i*22,barMax,14);
   ctx.fillStyle='#4CAF50';ctx.fillRect(storeX,storeY+20+i*22,barMax*(val/100),14);
   ctx.fillStyle='#e8dcc8';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';
   ctx.fillText(k+' '+stores[k],storeX+4,storeY+27+i*22);
  });
 }
 ctx.fillStyle='#8a7a6a';ctx.font='10px sans-serif';ctx.textAlign='left';ctx.textBaseline='top';
 ctx.fillText('수확 횟수: '+(ST22.farm.harvests||0),12,365);
}

function closeFarming(){var p=document.getElementById('v22-farm');if(p)p.classList.remove('on');}

// ─── 7. 왕실 의례 행사관 Canvas 10의례 ───
var CEREMONIES=[
 {id:'enthrone',name:'즉위식',icon:'👑',effect:'왕권+20',power:20,desc:'새 왕의 취임을 선포'},
 {id:'sacrifice',name:'제천대제',icon:'⛩️',effect:'신앙+25',power:25,desc:'하늘에 제사를 올림'},
 {id:'harvest_fest',name:'추수감사제',icon:'🌾',effect:'민심+15',power:15,desc:'풍년을 감사하는 축제'},
 {id:'military',name:'열병식',icon:'⚔️',effect:'군위+18',power:18,desc:'군사력을 과시'},
 {id:'wedding',name:'왕실혼례',icon:'💒',effect:'외교+22',power:22,desc:'동맹을 위한 정략혼'},
 {id:'funeral',name:'왕릉 조성',icon:'🏔️',effect:'충성+16',power:16,desc:'선왕의 능을 조성'},
 {id:'new_year',name:'세시풍속',icon:'🎊',effect:'문화+14',power:14,desc:'새해맞이 행사'},
 {id:'scholar',name:'인재등용',icon:'📜',effect:'지식+20',power:20,desc:'현자를 관직에 등용'},
 {id:'envoy',name:'사신접견',icon:'🤝',effect:'외교+17',power:17,desc:'외국 사신을 맞이'},
 {id:'fortify',name:'축성의례',icon:'🏰',effect:'방어+19',power:19,desc:'성벽 완공 기념'}
];
if(!ST22.ceremonies)ST22.ceremonies={};

function openCeremony(){
 var p=document.getElementById('v22-cere');
 if(p){p.classList.add('on');renderCereCanvas();playSfx22('cere_perform');return;}
 p=document.createElement('div');p.id='v22-cere';p.className='v22-panel on';
 var h='<h2>🎎 왕실 의례 행사관</h2>';
 h+='<div class="v22-sub">왕실의 주요 의례를 거행하여 국력을 강화하세요</div>';
 h+='<div class="ceremony-wrap"><canvas id="cere-canvas" width="580" height="360"></canvas></div>';
 h+='<div class="cere-list" id="cere-list"></div>';
 h+='<button class="v22-close" onclick="closeCeremony()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 renderCereList();renderCereCanvas();playSfx22('cere_perform');
}

function renderCereList(){
 var div=document.getElementById('cere-list');if(!div)return;div.innerHTML='';
 CEREMONIES.forEach(function(c){
  var done=ST22.ceremonies[c.id]||0;
  var card=document.createElement('div');card.className='cl-card'+(done>0?' completed':'');
  card.innerHTML='<div class="cl-icon">'+c.icon+'</div><div class="cl-name">'+c.name+'</div>'
   +'<div class="cl-eff">'+c.effect+'</div>'
   +'<div class="sa-stat">'+(done>0?'거행 '+done+'회':'미거행')+'</div>';
  card.onclick=function(){performCeremony(c.id);};
  div.appendChild(card);
 });
}

function performCeremony(id){
 var c=CEREMONIES.find(function(ce){return ce.id===id;});if(!c)return;
 ST22.ceremonies[id]=(ST22.ceremonies[id]||0)+1;save22();
 playSfx22('cere_complete');
 toast22(c.icon+' '+c.name+' 거행! '+c.effect,'#5a5a0a');
 var performed=Object.keys(ST22.ceremonies).filter(function(k){return ST22.ceremonies[k]>0;}).length;
 if(performed>=5)checkAch22('cere_5');
 if(performed>=10)checkAch22('cere_all');
 renderCereList();renderCereCanvas();
}

function renderCereCanvas(){
 var cv=document.getElementById('cere-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,580,360);
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,580,360);
 ctx.fillStyle='#ffc107';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('왕실 의례 수행 현황',290,24);
 var cx=160,cy=200,r=120;
 var axes=CEREMONIES.length;
 for(var ring=1;ring<=4;ring++){
  ctx.strokeStyle='#2a2a3a';ctx.lineWidth=1;ctx.beginPath();
  for(var ai=0;ai<=axes;ai++){
   var a=(ai/axes)*Math.PI*2-Math.PI/2;
   var rx=cx+Math.cos(a)*r*ring/4,ry=cy+Math.sin(a)*r*ring/4;
   if(ai===0)ctx.moveTo(rx,ry);else ctx.lineTo(rx,ry);
  }
  ctx.stroke();
 }
 for(var ai=0;ai<axes;ai++){
  var a=(ai/axes)*Math.PI*2-Math.PI/2;
  ctx.strokeStyle='#2a2a3a';ctx.beginPath();ctx.moveTo(cx,cy);
  ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);ctx.stroke();
 }
 ctx.fillStyle='#ffc10744';ctx.beginPath();
 CEREMONIES.forEach(function(c,i){
  var done=Math.min(ST22.ceremonies[c.id]||0,5);
  var a=(i/axes)*Math.PI*2-Math.PI/2;
  var px=cx+Math.cos(a)*r*(done/5),py=cy+Math.sin(a)*r*(done/5);
  if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
 });
 ctx.closePath();ctx.fill();
 ctx.strokeStyle='#ffc107';ctx.lineWidth=2;ctx.beginPath();
 CEREMONIES.forEach(function(c,i){
  var done=Math.min(ST22.ceremonies[c.id]||0,5);
  var a=(i/axes)*Math.PI*2-Math.PI/2;
  var px=cx+Math.cos(a)*r*(done/5),py=cy+Math.sin(a)*r*(done/5);
  if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
 });
 ctx.closePath();ctx.stroke();
 CEREMONIES.forEach(function(c,i){
  var a=(i/axes)*Math.PI*2-Math.PI/2;
  var lx=cx+Math.cos(a)*(r+18),ly=cy+Math.sin(a)*(r+18);
  ctx.fillStyle='#c4956a';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(c.icon,lx,ly);
 });
 var totalPower=0;var performed=0;
 CEREMONIES.forEach(function(c){
  var done=ST22.ceremonies[c.id]||0;
  if(done>0){performed++;totalPower+=c.power*done;}
 });
 ctx.fillStyle='#e8dcc8';ctx.font='bold 12px sans-serif';ctx.textAlign='left';ctx.textBaseline='top';
 ctx.fillText('의례 현황',370,50);
 ctx.fillStyle='#8a7a6a';ctx.font='10px sans-serif';
 ctx.fillText('거행 의례: '+performed+'/'+CEREMONIES.length,370,70);
 ctx.fillText('누적 국력: +'+totalPower,370,88);
 var grade=totalPower>200?'S':totalPower>120?'A':totalPower>60?'B':totalPower>20?'C':'D';
 ctx.fillStyle=grade==='S'?'#FFD700':grade==='A'?'#4CAF50':'#8a7a6a';
 ctx.font='bold 24px sans-serif';
 ctx.fillText(grade+'등급',370,115);
 ctx.fillStyle='#5a4a3a';ctx.font='9px sans-serif';
 CEREMONIES.forEach(function(c,i){
  if(i>=7)return;
  var done=ST22.ceremonies[c.id]||0;
  ctx.fillStyle=done>0?'#c4956a':'#3a3a4a';
  ctx.fillText(c.icon+' '+c.name+': '+(done>0?done+'회':'미거행'),370,160+i*20);
 });
}

function closeCeremony(){var p=document.getElementById('v22-cere');if(p)p.classList.remove('on');}

// ─── 8. 문명 연표 비교기 Canvas ───
var CIVILIZATIONS=[
 {id:'gojoseon',name:'고조선',color:'#FFD700',start:-2333,end:-108,events:[
  {year:-2333,name:'건국'},{year:-1500,name:'청동기'},{year:-400,name:'철기도입'},{year:-194,name:'위만집권'},{year:-108,name:'멸망'}
 ]},
 {id:'china',name:'중국',color:'#FF4444',start:-2100,end:0,events:[
  {year:-2100,name:'하(夏)'},{year:-1600,name:'상(商)'},{year:-1046,name:'주(周)'},{year:-221,name:'진(秦)'},{year:-206,name:'한(漢)'}
 ]},
 {id:'japan',name:'일본',color:'#2196F3',start:-660,end:0,events:[
  {year:-660,name:'신화건국'},{year:-300,name:'야요이'},{year:-100,name:'소국시대'}
 ]},
 {id:'rome',name:'로마',color:'#9C27B0',start:-753,end:0,events:[
  {year:-753,name:'건국'},{year:-509,name:'공화정'},{year:-27,name:'제정'}
 ]},
 {id:'egypt',name:'이집트',color:'#FF9800',start:-3100,end:-30,events:[
  {year:-3100,name:'통일'},{year:-2560,name:'피라미드'},{year:-1550,name:'신왕국'},{year:-332,name:'프톨레마이오스'},{year:-30,name:'멸망'}
 ]},
 {id:'mesopotamia',name:'메소포타미아',color:'#795548',start:-3500,end:-539,events:[
  {year:-3500,name:'수메르'},{year:-2334,name:'아카드'},{year:-1894,name:'바빌론'},{year:-911,name:'앗시리아'},{year:-539,name:'페르시아 정복'}
 ]}
];
if(!ST22.civView)ST22.civView='all';

function openCivTimeline(){
 var p=document.getElementById('v22-civtime');
 if(p){p.classList.add('on');renderCivCanvas();playSfx22('civtime_switch');return;}
 p=document.createElement('div');p.id='v22-civtime';p.className='v22-panel on';
 var h='<h2>🌍 문명 연표 비교기</h2>';
 h+='<div class="v22-sub">고조선과 세계 문명의 흥망성쇠를 비교합니다</div>';
 h+='<div class="civtime-wrap"><canvas id="civ-canvas" width="580" height="420"></canvas></div>';
 h+='<div class="civtime-tabs" id="civ-tabs"></div>';
 h+='<button class="v22-close" onclick="closeCivTimeline()">닫기</button>';
 p.innerHTML=h;document.body.appendChild(p);
 renderCivTabs();renderCivCanvas();playSfx22('civtime_switch');
 checkAch22('civ_compare');
}

function renderCivTabs(){
 var div=document.getElementById('civ-tabs');if(!div)return;div.innerHTML='';
 var tabs=[{id:'all',name:'전체 비교'}];
 CIVILIZATIONS.forEach(function(c){tabs.push({id:c.id,name:c.name});});
 tabs.forEach(function(t){
  var b=document.createElement('button');b.className='ct-btn'+(ST22.civView===t.id?' active':'');
  b.textContent=t.name;
  b.onclick=function(){ST22.civView=t.id;save22();renderCivTabs();renderCivCanvas();playSfx22('civtime_switch');};
  div.appendChild(b);
 });
}

function renderCivCanvas(){
 var cv=document.getElementById('civ-canvas');if(!cv)return;
 var ctx=cv.getContext('2d');ctx.clearRect(0,0,580,420);
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,580,420);
 ctx.fillStyle='#8888cc';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('🌍 문명 연표 비교',290,20);
 var timeStart=-3500,timeEnd=100,timeRange=timeEnd-timeStart;
 var chartX=60,chartW=490,chartY=50,barH=40,gap=8;
 var civs=ST22.civView==='all'?CIVILIZATIONS:CIVILIZATIONS.filter(function(c){return c.id===ST22.civView||c.id==='gojoseon';});
 ctx.strokeStyle='#3a3a4a';ctx.lineWidth=1;
 for(var yr=-3500;yr<=0;yr+=500){
  var tx=chartX+((yr-timeStart)/timeRange)*chartW;
  ctx.beginPath();ctx.moveTo(tx,chartY);ctx.lineTo(tx,chartY+civs.length*(barH+gap));ctx.stroke();
  ctx.fillStyle='#5a5a6a';ctx.font='8px sans-serif';ctx.textAlign='center';ctx.textBaseline='top';
  ctx.fillText('BC'+Math.abs(yr),tx,chartY+civs.length*(barH+gap)+4);
 }
 civs.forEach(function(c,i){
  var y=chartY+i*(barH+gap);
  var x1=chartX+((c.start-timeStart)/timeRange)*chartW;
  var x2=chartX+((c.end-timeStart)/timeRange)*chartW;
  ctx.fillStyle=c.color+'33';ctx.fillRect(x1,y,x2-x1,barH);
  var grd=ctx.createLinearGradient(x1,y,x2,y);
  grd.addColorStop(0,c.color+'88');grd.addColorStop(0.5,c.color);grd.addColorStop(1,c.color+'88');
  ctx.fillStyle=grd;ctx.fillRect(x1,y+8,x2-x1,barH-16);
  ctx.fillStyle='#e8dcc8';ctx.font='bold 10px sans-serif';ctx.textAlign='right';ctx.textBaseline='middle';
  ctx.fillText(c.name,chartX-6,y+barH/2);
  c.events.forEach(function(ev){
   var ex=chartX+((ev.year-timeStart)/timeRange)*chartW;
   ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(ex,y+barH/2,3,0,Math.PI*2);ctx.fill();
   if(civs.length<=3){
    ctx.fillStyle='#8a7a6a';ctx.font='7px sans-serif';ctx.textAlign='center';ctx.textBaseline='bottom';
    ctx.fillText(ev.name,ex,y);
   }
  });
 });
 if(ST22.civView==='all'){
  ctx.fillStyle='#FFD700';ctx.font='bold 9px sans-serif';ctx.textAlign='left';ctx.textBaseline='top';
  ctx.fillText('💡 고조선은 이집트·메소포타미아와 동시대 문명입니다',12,400);
 }
}

function closeCivTimeline(){var p=document.getElementById('v22-civtime');if(p)p.classList.remove('on');}

// ─── 퀴즈 v22 +15문항 (210→225) ───
var QUIZ22=[
 {q:'삼십육계 중 &quot;주위상&quot;은 무슨 뜻인가?',a:['도망이 상책','공격이 상책','방어가 상책','기만이 상책'],c:0},
 {q:'고조선과 동시대의 중국 왕조는?',a:['상(商)나라','한(漢)나라','수(隋)나라','당(唐)나라'],c:0},
 {q:'손자병법의 저자로 알려진 인물은?',a:['손무','오기','장량','제갈량'],c:0},
 {q:'고대 한반도에서 가장 널리 재배된 곡물은?',a:['조','밀','옥수수','감자'],c:0},
 {q:'학익진은 어떤 동물의 모양을 본뜬 진형인가?',a:['학','독수리','호랑이','용'],c:0},
 {q:'부여의 4출도(四出道)란 무엇인가?',a:['4개의 지방 행정구','4개의 성문','4방위 도로','4개의 제사터'],c:0},
 {q:'고조선의 청동기 문화를 대표하는 유물은?',a:['비파형동검','무문토기','빗살무늬토기','철기'],c:0},
 {q:'제천대제에서 하늘에 바치는 주된 제물은?',a:['소','닭','돼지','양'],c:0},
 {q:'고대 첩보전에서 &quot;이간계&quot;의 목적은?',a:['적 내부 분열','적진 잠입','성벽 파괴','화공'],c:0},
 {q:'환웅이 내려온 태백산 꼭대기의 나무는?',a:['신단수','소나무','은행나무','전나무'],c:0},
 {q:'고조선의 영역에서 발견된 독특한 토기는?',a:['미송리식토기','빗살무늬토기','적색마연토기','흑도'],c:0},
 {q:'문명의 4대 발상지에 포함되지 않는 곳은?',a:['한반도','이집트','메소포타미아','인더스'],c:0},
 {q:'고대 전쟁에서 &quot;복병&quot;이란?',a:['숨어서 기습하는 병사','보급병','정찰병','공병'],c:0},
 {q:'단군왕검의 아들로 전해지는 인물은?',a:['부루','주몽','온조','비류'],c:0},
 {q:'고조선 시대 한반도의 대표적인 금속은?',a:['청동','금','은','주석'],c:0}
];

function injectQuiz22(){
 if(typeof window.QUIZ_POOL==='undefined')window.QUIZ_POOL=[];
 QUIZ22.forEach(function(q){
  var exists=window.QUIZ_POOL.some(function(eq){return eq.q===q.q;});
  if(!exists)window.QUIZ_POOL.push(q);
 });
}
injectQuiz22();

// ─── 업적 v22 +12개 (144→156) ───
var ACH22=[
 {id:'spy_4',name:'첩보원 배치자',desc:'4명의 첩보원을 배치'},
 {id:'spy_master',name:'정보망 총책',desc:'전체 8명 첩보원 배치'},
 {id:'spy_veteran',name:'첩보 베테랑',desc:'첩보 임무 10회 수행'},
 {id:'diplo_3ally',name:'동맹 외교관',desc:'3개 세력과 동맹 체결'},
 {id:'diplo_peace',name:'평화의 사절',desc:'6개 세력과 동맹 체결'},
 {id:'bloodline_viewer',name:'혈통 탐구자',desc:'영웅 가계도를 열람'},
 {id:'strat_6',name:'병법 연구자',desc:'병법서 6권 습득'},
 {id:'strat_master',name:'병법의 달인',desc:'전체 12권 병법서 습득'},
 {id:'formation_viewer',name:'진형 연구가',desc:'전투진형 편성기를 열람'},
 {id:'farm_cycle',name:'농부',desc:'4번의 계절 작업 수행'},
 {id:'farm_master',name:'농경의 신',desc:'20번의 계절 작업 수행'},
 {id:'cere_5',name:'의례 관리관',desc:'5가지 의례를 거행'},
 {id:'cere_all',name:'대제사장',desc:'전체 10가지 의례 거행'},
 {id:'civ_compare',name:'문명 비교학자',desc:'문명 연표 비교기를 열람'}
];

function checkAch22(id){
 var ach=JSON.parse(localStorage.getItem('krpg_ach')||'[]');
 if(ach.indexOf(id)>=0)return;
 var a=ACH22.find(function(ac){return ac.id===id;});if(!a)return;
 ach.push(id);localStorage.setItem('krpg_ach',JSON.stringify(ach));
 playSfx22('achieve_v22');toast22('🏆 업적 해금: '+a.name,'#5a3a0a');
}

// ─── 키보드 단축키 Shift+Q/W/E/R/A/S/D/F ───
document.addEventListener('keydown',function(e){
 if(!e.shiftKey)return;
 var panels={
  'Q':openSpyNetwork,'W':openDiplomacy,'E':openBloodline,'R':openStrategyLib,
  'A':openFormation,'S':openFarming,'D':openCeremony,'F':openCivTimeline,
  'q':openSpyNetwork,'w':openDiplomacy,'e':openBloodline,'r':openStrategyLib,
  'a':openFormation,'s':openFarming,'d':openCeremony,'f':openCivTimeline
 };
 if(panels[e.key]){e.preventDefault();panels[e.key]();}
});

// ─── 전역 함수 노출 ───
window.openSpyNetwork=openSpyNetwork;
window.closeSpyNetwork=closeSpyNetwork;
window.runSpyMission=runSpyMission;
window.resetSpyNetwork=resetSpyNetwork;
window.toggleSpy=toggleSpy;
window.openDiplomacy=openDiplomacy;
window.closeDiplomacy=closeDiplomacy;
window.cycleDiplo=cycleDiplo;
window.openBloodline=openBloodline;
window.closeBloodline=closeBloodline;
window.openStrategyLib=openStrategyLib;
window.closeStrategyLib=closeStrategyLib;
window.learnStrategy=learnStrategy;
window.openFormation=openFormation;
window.closeFormation=closeFormation;
window.openFarming=openFarming;
window.closeFarming=closeFarming;
window.advanceSeason=advanceSeason;
window.harvestAll=harvestAll;
window.openCeremony=openCeremony;
window.closeCeremony=closeCeremony;
window.performCeremony=performCeremony;
window.openCivTimeline=openCivTimeline;
window.closeCivTimeline=closeCivTimeline;

})();
