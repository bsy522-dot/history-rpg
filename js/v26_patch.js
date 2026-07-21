// v26_patch.js — 한국사 영웅전 v26.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v26-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:145;overflow-y:auto;padding:16px}',
'.v26-panel.on{display:block}',
'.v26-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v26-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v26-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v26-close:hover{background:#8B2A1A}',
'.v26-toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);padding:8px 20px;border-radius:20px;font-size:11px;font-weight:700;z-index:999;pointer-events:none;animation:v26fade 2s ease forwards}',
'@keyframes v26fade{0%{opacity:0;transform:translate(-50%,-10px)}10%{opacity:1;transform:translate(-50%,0)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-10px)}}',

'.port-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.port-wrap canvas{border:2px solid #2a4a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.port-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;max-width:620px;margin:8px auto}',
'.pt-card{background:linear-gradient(135deg,rgba(10,16,24,.95),rgba(6,10,18,.98));border:2px solid #2a4a5a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.pt-card:hover{border-color:#44aacc;transform:translateY(-2px)}',
'.pt-card.upgraded{border-color:#FFD700;background:linear-gradient(135deg,rgba(24,28,16,.9),rgba(18,22,10,.95))}',
'.pt-card .pt-icon{font-size:26px}',
'.pt-card .pt-name{font-size:10px;color:#44aacc;font-weight:700;margin-top:2px}',

'.battle-wrap{max-width:600px;margin:0 auto;text-align:center}',
'.battle-wrap canvas{border:2px solid #5a2a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.bt-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.bt-btn{padding:5px 12px;border:1px solid #5a2a2a;border-radius:6px;background:#180a0a;color:#cc5544;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.bt-btn:hover{border-color:#cc5544}',
'.bt-btn.active{border-color:#FFD700;color:#FFD700}',

'.currency-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.currency-wrap canvas{border:2px solid #5a4a1a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.cur-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px;max-width:580px;margin:8px auto}',
'.cur-card{background:linear-gradient(135deg,rgba(22,18,10,.95),rgba(16,12,6,.98));border:2px solid #5a4a1a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.cur-card:hover{border-color:#ccaa44;transform:translateY(-2px)}',
'.cur-card.collected{border-color:#FFD700}',
'.cur-card .cur-icon{font-size:24px}',
'.cur-card .cur-name{font-size:9px;color:#ccaa44;font-weight:700;margin-top:2px}',

'.spy-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.spy-wrap canvas{border:2px solid #2a3a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.spy-controls{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.spy-btn{padding:6px 14px;border:1px solid #2a3a2a;border-radius:6px;background:#0a140a;color:#44aa44;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.spy-btn:hover{border-color:#44aa44;background:#102a10}',

'.succ-wrap{max-width:600px;margin:0 auto;text-align:center}',
'.succ-wrap canvas{border:2px solid #4a2a4a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.sc-controls{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.sc-btn{padding:6px 14px;border:1px solid #4a2a4a;border-radius:6px;background:#140a14;color:#aa44aa;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.sc-btn:hover{border-color:#aa44aa;background:#2a102a}',

'.fort-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.fort-wrap canvas{border:2px solid #4a3a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.ft-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;max-width:620px;margin:8px auto}',
'.ft-card{background:linear-gradient(135deg,rgba(18,14,10,.95),rgba(12,10,6,.98));border:2px solid #4a3a2a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.ft-card:hover{border-color:#cc8844;transform:translateY(-2px)}',
'.ft-card.built{border-color:#FFD700}',
'.ft-card .ft-icon{font-size:26px}',
'.ft-card .ft-name{font-size:10px;color:#cc8844;font-weight:700;margin-top:2px}',

'.artifact-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.artifact-wrap canvas{border:2px solid #5a3a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.af-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px;max-width:580px;margin:8px auto}',
'.af-card{background:linear-gradient(135deg,rgba(20,12,20,.95),rgba(14,8,14,.98));border:2px solid #5a3a5a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.af-card:hover{border-color:#cc66cc;transform:translateY(-2px)}',
'.af-card.appraised{border-color:#FFD700}',
'.af-card .af-icon{font-size:24px}',
'.af-card .af-name{font-size:9px;color:#cc66cc;font-weight:700;margin-top:2px}',

'.ritual-wrap{max-width:600px;margin:0 auto;text-align:center}',
'.ritual-wrap canvas{border:2px solid #3a2a1a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.rt-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px;max-width:600px;margin:8px auto}',
'.rt-card{background:linear-gradient(135deg,rgba(18,14,8,.95),rgba(12,10,4,.98));border:2px solid #3a2a1a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.rt-card:hover{border-color:#cc9944;transform:translateY(-2px)}',
'.rt-card.performed{border-color:#FFD700}',
'.rt-card .rt-icon{font-size:24px}',
'.rt-card .rt-name{font-size:9px;color:#cc9944;font-weight:700;margin-top:2px}'
].join('\n');
document.head.appendChild(css);

function toast26(msg,bg){
 var t=document.createElement('div');t.className='v26-toast';
 t.style.background=bg||'rgba(20,26,30,.9)';t.style.color='#44aacc';t.style.border='1px solid #2a4a5a';
 t.textContent=msg;document.body.appendChild(t);
 setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t);},2200);
}

// ─── SFX v26 (Web Audio API) ───
var actx26=null;
function sfx26(type){
 try{
  if(!actx26)actx26=new(window.AudioContext||window.webkitAudioContext)();
  var o=actx26.createOscillator(),g=actx26.createGain();
  o.connect(g);g.connect(actx26.destination);
  var presets={
   trade_port:{f:300,t:'sine',dur:0.3,gv:0.12},
   trade_deal:{f:520,t:'sine',dur:0.4,gv:0.14},
   battle_view:{f:240,t:'triangle',dur:0.25,gv:0.1},
   battle_compare:{f:440,t:'sine',dur:0.5,gv:0.14},
   currency_find:{f:580,t:'sine',dur:0.35,gv:0.13},
   currency_grade:{f:660,t:'sine',dur:0.45,gv:0.15},
   spy_mission:{f:200,t:'sawtooth',dur:0.2,gv:0.08},
   spy_success:{f:480,t:'sine',dur:0.4,gv:0.14},
   succession_resolve:{f:360,t:'triangle',dur:0.35,gv:0.12},
   fortress_build:{f:180,t:'square',dur:0.2,gv:0.1},
   fortress_siege:{f:140,t:'sawtooth',dur:0.5,gv:0.12},
   artifact_appraise:{f:420,t:'triangle',dur:0.3,gv:0.11},
   artifact_find:{f:620,t:'sine',dur:0.5,gv:0.15},
   ritual_perform:{f:340,t:'sine',dur:0.45,gv:0.13},
   quiz_v26:{f:550,t:'sine',dur:0.3,gv:0.12},
   quiz_wrong_v26:{f:200,t:'sawtooth',dur:0.4,gv:0.1},
   achieve_v26:{f:660,t:'sine',dur:0.6,gv:0.15}
  };
  var p=presets[type]||presets.trade_port;
  o.type=p.t;o.frequency.value=p.f;
  g.gain.setValueAtTime(p.gv,actx26.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,actx26.currentTime+p.dur);
  o.start();o.stop(actx26.currentTime+p.dur);
 }catch(e){}
}

// ─── 업적 시스템 v26 ───
var ACH26=[
 {id:'trade_navigator',name:'무역항해사',desc:'고대 무역항 4곳 이상 업그레이드',icon:'⚓'},
 {id:'battle_historian',name:'전투역사가',desc:'역사적 전투 5건 이상 열람',icon:'📖'},
 {id:'currency_collector',name:'화폐수집가',desc:'고대 화폐 6종 이상 수집',icon:'🪙'},
 {id:'spy_master',name:'첩보대가',desc:'첩보전 임무 5회 이상 성공',icon:'🕵️'},
 {id:'succession_resolver',name:'계승조정관',desc:'왕권 계승 분쟁 4건 이상 해결',icon:'👑'},
 {id:'fortress_architect',name:'축성기술자',desc:'고대 성곽 4종 이상 축성',icon:'🏯'},
 {id:'artifact_appraiser',name:'유물감정사',desc:'영웅 유물 6점 이상 감정',icon:'🔮'},
 {id:'ritual_priest',name:'제례사제',desc:'고대 제례 5회 이상 시행',icon:'🙏'},
 {id:'quiz_v26_master',name:'v26 퀴즈마스터',desc:'v26 퀴즈 S등급 달성',icon:'🏆'},
 {id:'quiz_v26_clear',name:'v26 퀴즈클리어',desc:'v26 퀴즈 완주',icon:'✅'},
 {id:'v26_explorer',name:'v26 탐험가',desc:'v26 기능 5종 이상 사용',icon:'⭐'},
 {id:'v26_complete',name:'v26 완전정복',desc:'v26 전기능 체험 완료',icon:'👑'}
];

function getAch(){try{return JSON.parse(localStorage.getItem('krpg_ach'))||[];}catch(e){return[];}}
function saveAch(arr){localStorage.setItem('krpg_ach',JSON.stringify(arr));}
function unlockAch26(id){
 var arr=getAch();
 if(arr.indexOf(id)>=0)return;
 arr.push(id);saveAch(arr);
 var a=ACH26.filter(function(x){return x.id===id;})[0];
 if(a)toast26('🏆 '+a.name+' 해금!','rgba(40,32,10,.95)');
 sfx26('achieve_v26');
 try{var st=JSON.parse(localStorage.getItem('krpg_stats'))||{};st.achCount=arr.length;localStorage.setItem('krpg_stats',JSON.stringify(st));}catch(e){}
}

var v26usage={};
function trackUsage26(key){
 v26usage[key]=true;
 var cnt=Object.keys(v26usage).length;
 if(cnt>=5)unlockAch26('v26_explorer');
 if(cnt>=8)unlockAch26('v26_complete');
}

// ═══════════════════════════════════════════════════════
// 1. 고대 무역항 관리자 Canvas (620x400) — 8항구 교역량 Bar
// ═══════════════════════════════════════════════════════
var portData=[
 {name:'한강하구항',icon:'🏞️',volume:75,goods:['곡물','목재'],prosperity:68,gold:0},
 {name:'낙동강항',icon:'🌊',volume:82,goods:['철','옥'],prosperity:74,gold:0},
 {name:'서해안항',icon:'⛵',volume:90,goods:['비단','곡물'],prosperity:80,gold:0},
 {name:'동해안항',icon:'🐟',volume:65,goods:['해산물','목재'],prosperity:60,gold:0},
 {name:'압록강항',icon:'🏔️',volume:70,goods:['철','곡물'],prosperity:65,gold:0},
 {name:'두만강항',icon:'❄️',volume:55,goods:['목재','해산물'],prosperity:50,gold:0},
 {name:'제주항',icon:'🏝️',volume:60,goods:['해산물','옥'],prosperity:55,gold:0},
 {name:'울산항',icon:'⚓',volume:78,goods:['철','비단'],prosperity:72,gold:0}
];
var portUpgraded={},portSel=0;

function openTradePort(){
 trackUsage26('port');sfx26('trade_port');
 var p=document.getElementById('v26-port-panel');
 if(!p){
  p=document.createElement('div');p.id='v26-port-panel';p.className='v26-panel';
  p.innerHTML='<h2>⚓ 고대 무역항 관리자</h2><p class="v26-sub">8항구 교역량 분석 — 투자/업그레이드</p><div class="port-wrap"><canvas id="v26-port-cv" width="620" height="400"></canvas><div class="port-grid" id="v26-port-grid"></div></div><button class="v26-close" onclick="closeTradePort()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var grid=document.getElementById('v26-port-grid');
  portData.forEach(function(pt,i){
   var c=document.createElement('div');c.className='pt-card';
   c.innerHTML='<div class="pt-icon">'+pt.icon+'</div><div class="pt-name">'+pt.name+'</div>';
   c.onclick=function(){
    sfx26('trade_deal');portSel=i;
    portData[i].gold+=50;portData[i].volume=Math.min(100,portData[i].volume+3);
    portData[i].prosperity=Math.min(100,portData[i].prosperity+2);
    portUpgraded[i]=true;c.classList.add('upgraded');
    var cnt=Object.keys(portUpgraded).length;
    if(cnt>=4)unlockAch26('trade_navigator');
    toast26(pt.icon+' '+pt.name+' 투자 완료! 교역량 +3');
    drawPortChart();
   };
   grid.appendChild(c);
  });
 }
 p.classList.add('on');drawPortChart();
}
function closeTradePort(){var p=document.getElementById('v26-port-panel');if(p)p.classList.remove('on');}

function drawPortChart(){
 var cv=document.getElementById('v26-port-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=620,H=400;
 c.clearRect(0,0,W,H);c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 c.fillStyle='#c4956a';c.font='bold 14px sans-serif';c.textAlign='center';
 c.fillText('항구별 교역량 / 번영도',W/2,24);
 var ml=90,mr=20,mt=50,mb=50,cw=W-ml-mr,ch=H-mt-mb;
 c.strokeStyle='#3a3a4a';c.lineWidth=1;
 c.beginPath();c.moveTo(ml,mt);c.lineTo(ml,mt+ch);c.lineTo(ml+cw,mt+ch);c.stroke();
 var barH=ch/portData.length*0.7,gap=ch/portData.length;
 portData.forEach(function(pt,i){
  var y=mt+gap*i+(gap-barH)/2;
  var vw=cw*pt.volume/100,pw=cw*pt.prosperity/100;
  c.fillStyle=portUpgraded[i]?'rgba(68,170,204,0.85)':'rgba(68,170,204,0.5)';
  c.fillRect(ml,y,vw,barH/2-1);
  c.fillStyle=portUpgraded[i]?'rgba(204,170,68,0.85)':'rgba(204,170,68,0.5)';
  c.fillRect(ml,y+barH/2,pw,barH/2-1);
  c.fillStyle='#e8dcc8';c.font='bold 10px sans-serif';c.textAlign='left';
  c.fillText(pt.volume,ml+vw+4,y+barH/4+4);
  c.fillText(pt.prosperity,ml+pw+4,y+barH*3/4+4);
  c.fillStyle='#8a7a6a';c.font='10px sans-serif';c.textAlign='right';
  c.fillText(pt.name.substring(0,5),ml-6,y+barH/2+4);
  if(portUpgraded[i]){c.fillStyle='#FFD700';c.font='bold 10px sans-serif';c.textAlign='left';c.fillText('★',ml+vw+20,y+barH/4+4);}
 });
 c.fillStyle='#44aacc';c.font='10px sans-serif';c.textAlign='left';
 c.fillRect(ml+10,H-30,12,10);c.fillText('교역량',ml+26,H-21);
 c.fillStyle='#ccaa44';
 c.fillRect(ml+90,H-30,12,10);c.fillText('번영도',ml+106,H-21);
 c.fillStyle='#FFD700';c.fillText('★ = 투자완료',ml+170,H-21);
 // detail box for selected port
 var sel=portData[portSel];
 c.fillStyle='rgba(20,30,40,.8)';c.fillRect(W-170,mt,160,80);
 c.strokeStyle='#2a4a5a';c.strokeRect(W-170,mt,160,80);
 c.fillStyle='#44aacc';c.font='bold 11px sans-serif';c.textAlign='left';
 c.fillText(sel.icon+' '+sel.name,W-162,mt+16);
 c.fillStyle='#e8dcc8';c.font='10px sans-serif';
 c.fillText('교역품: '+sel.goods.join(', '),W-162,mt+34);
 c.fillText('교역량: '+sel.volume+' | 번영: '+sel.prosperity,W-162,mt+50);
 c.fillText('투자금: '+sel.gold+' Gold',W-162,mt+66);
}

// ═══════════════════════════════════════════════════════
// 2. 역사적 전투 재현기 Canvas (600x380) — 10전투 6축 Radar
// ═══════════════════════════════════════════════════════
var battleData=[
 {name:'살수대첩',icon:'🌊',axes:[85,95,98,90,95,96],year:'612',desc:'을지문덕이 수나라 대군을 격파'},
 {name:'광개토정복',icon:'⚔️',axes:[98,88,95,80,96,98],year:'396',desc:'광개토대왕의 대규모 정복 전쟁'},
 {name:'을지문덕대첩',icon:'🛡️',axes:[80,92,90,88,93,90],year:'612',desc:'청야전술로 수군을 물리침'},
 {name:'황산벌전투',icon:'🏔️',axes:[75,70,85,92,78,82],year:'660',desc:'계백의 결사대 5천 전투'},
 {name:'기벌포해전',icon:'🚢',axes:[70,85,80,75,80,78],year:'676',desc:'나당전쟁 해상 결전'},
 {name:'안시성전투',icon:'🏯',axes:[90,80,92,95,88,90],year:'645',desc:'고구려의 난공불락 성곽 방어'},
 {name:'한산도대첩',icon:'⛵',axes:[82,96,90,85,98,92],year:'1592',desc:'이순신의 학익진 해전'},
 {name:'행주대첩',icon:'🏰',axes:[72,90,85,88,85,88],year:'1593',desc:'권율의 행주산성 방어전'},
 {name:'명량해전',icon:'🌊',axes:[65,98,95,70,99,95],year:'1597',desc:'13척으로 133척을 물리침'},
 {name:'노량해전',icon:'⚓',axes:[88,82,90,78,92,94],year:'1598',desc:'이순신 최후의 해전'}
];
var battleAxes=['병력규모','전술혁신','역사적의의','지형활용','지휘관능력','영향력'];
var battleSel=[0],battleViewed=[];

function openBattleReenact(){
 trackUsage26('battle');sfx26('battle_view');
 var p=document.getElementById('v26-battle-panel');
 if(!p){
  p=document.createElement('div');p.id='v26-battle-panel';p.className='v26-panel';
  p.innerHTML='<h2>⚔️ 역사적 전투 재현기</h2><p class="v26-sub">10대 전투 6축 Radar 분석 — 비교 모드</p><div class="battle-wrap"><canvas id="v26-battle-cv" width="600" height="380"></canvas><div class="bt-tabs" id="v26-bt-tabs"></div></div><button class="v26-close" onclick="closeBattleReenact()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var tabs=document.getElementById('v26-bt-tabs');
  battleData.forEach(function(b,i){
   var btn=document.createElement('button');btn.className='bt-btn'+(battleSel.indexOf(i)>=0?' active':'');
   btn.textContent=b.icon+' '+b.name;
   btn.onclick=function(){
    sfx26('battle_compare');
    var idx=battleSel.indexOf(i);
    if(idx>=0){battleSel.splice(idx,1);btn.classList.remove('active');}
    else{if(battleSel.length>=2)battleSel.shift();battleSel.push(i);
     var btns=tabs.querySelectorAll('.bt-btn');
     for(var j=0;j<btns.length;j++)btns[j].classList.remove('active');
     battleSel.forEach(function(s){btns[s].classList.add('active');});
    }
    if(battleViewed.indexOf(i)<0)battleViewed.push(i);
    if(battleViewed.length>=5)unlockAch26('battle_historian');
    drawBattleRadar();
   };
   tabs.appendChild(btn);
  });
 }
 p.classList.add('on');drawBattleRadar();
}
function closeBattleReenact(){var p=document.getElementById('v26-battle-panel');if(p)p.classList.remove('on');}

function drawBattleRadar(){
 var cv=document.getElementById('v26-battle-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=600,H=380,cx=W/2,cy=H/2+15,R=130,n=6;
 c.clearRect(0,0,W,H);c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 var title=battleSel.map(function(s){return battleData[s].icon+' '+battleData[s].name;}).join(' vs ');
 c.fillStyle='#c4956a';c.font='bold 14px sans-serif';c.textAlign='center';
 c.fillText(title,cx,24);
 if(battleSel.length===1){c.fillStyle='#8a7a6a';c.font='11px sans-serif';c.fillText(battleData[battleSel[0]].desc,cx,42);}
 for(var lv=1;lv<=5;lv++){
  c.beginPath();
  for(var i=0;i<=n;i++){
   var a=-Math.PI/2+2*Math.PI*i/n,r=R*lv/5;
   if(i===0)c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));else c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
  }
  c.strokeStyle='rgba(90,42,42,'+(0.12+lv*0.06)+')';c.lineWidth=1;c.stroke();
 }
 for(var i=0;i<n;i++){
  var a=-Math.PI/2+2*Math.PI*i/n;
  c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));
  c.strokeStyle='rgba(90,42,42,0.3)';c.stroke();
  c.fillStyle='#cc5544';c.font='bold 9px sans-serif';c.textAlign='center';c.textBaseline='middle';
  c.fillText(battleAxes[i],cx+(R+24)*Math.cos(a),cy+(R+24)*Math.sin(a));
 }
 var colors=[{f:'rgba(204,85,68,0.2)',s:'#cc5544'},{f:'rgba(68,170,204,0.2)',s:'#44aacc'}];
 battleSel.forEach(function(si,ci){
  var d=battleData[si];
  c.beginPath();
  for(var i=0;i<=n;i++){
   var idx=i%n,a=-Math.PI/2+2*Math.PI*i/n,r=R*d.axes[idx]/100;
   if(i===0)c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));else c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
  }
  c.fillStyle=colors[ci].f;c.fill();
  c.strokeStyle=colors[ci].s;c.lineWidth=2;c.stroke();
  for(var i=0;i<n;i++){
   var a=-Math.PI/2+2*Math.PI*i/n,r=R*d.axes[i]/100;
   c.beginPath();c.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),3,0,Math.PI*2);
   c.fillStyle=colors[ci].s;c.fill();
  }
 });
 battleSel.forEach(function(si,ci){
  var d=battleData[si];
  c.fillStyle=colors[ci].s;c.font='bold 11px sans-serif';c.textAlign='center';
  c.fillRect(W/2-100+ci*120,H-24,12,12);
  c.fillText(d.icon+' '+d.name+' ('+d.year+')',W/2-84+ci*120,H-14);
 });
}

// ═══════════════════════════════════════════════════════
// 3. 고대 화폐 수집관 Canvas (580x360) — 10화폐 수집/등급
// ═══════════════════════════════════════════════════════
var currencyData=[
 {name:'명도전',icon:'🔑',rarity:90,era:'고조선',desc:'칼 모양의 청동 화폐'},
 {name:'반량전',icon:'⭕',rarity:75,era:'진한교류',desc:'원형 방공 동전'},
 {name:'오수전',icon:'🟤',rarity:70,era:'한사군',desc:'한나라 유통 화폐'},
 {name:'조선통보',icon:'💰',rarity:85,era:'고려',desc:'최초의 주조 동전'},
 {name:'건원중보',icon:'🪙',rarity:88,era:'고려',desc:'고려 최초 화폐'},
 {name:'해동통보',icon:'💮',rarity:72,era:'고려',desc:'해동 명칭의 화폐'},
 {name:'삼한통보',icon:'🔶',rarity:92,era:'고려',desc:'삼한 이름의 희귀 화폐'},
 {name:'동국통보',icon:'🔷',rarity:68,era:'고려',desc:'동국 명칭의 동전'},
 {name:'은병',icon:'🥈',rarity:95,era:'고려',desc:'은으로 주조한 병 형태'},
 {name:'쇄은',icon:'💎',rarity:98,era:'고려',desc:'잘게 부순 은 조각'}
];
var curCollected={},curGrades={};

function openCurrencyHall(){
 trackUsage26('currency');sfx26('currency_find');
 var p=document.getElementById('v26-currency-panel');
 if(!p){
  p=document.createElement('div');p.id='v26-currency-panel';p.className='v26-panel';
  p.innerHTML='<h2>🪙 고대 화폐 수집관</h2><p class="v26-sub">10종 고대 화폐 수집/감정 — 희귀도 분석</p><div class="currency-wrap"><canvas id="v26-cur-cv" width="580" height="360"></canvas><div class="cur-grid" id="v26-cur-grid"></div></div><button class="v26-close" onclick="closeCurrencyHall()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var grid=document.getElementById('v26-cur-grid');
  currencyData.forEach(function(cur,i){
   var cd=document.createElement('div');cd.className='cur-card';
   cd.innerHTML='<div class="cur-icon">'+cur.icon+'</div><div class="cur-name">'+cur.name+'</div>';
   cd.onclick=function(){
    sfx26('currency_grade');
    curCollected[i]=true;
    var r=Math.random()*100;
    var grade=r>90?'S':r>70?'A':r>45?'B':r>20?'C':'D';
    curGrades[i]=grade;cd.classList.add('collected');
    var cnt=Object.keys(curCollected).length;
    if(cnt>=6)unlockAch26('currency_collector');
    toast26(cur.icon+' '+cur.name+' 수집! 등급: '+grade);
    drawCurrencyChart();
   };
   grid.appendChild(cd);
  });
 }
 p.classList.add('on');drawCurrencyChart();
}
function closeCurrencyHall(){var p=document.getElementById('v26-currency-panel');if(p)p.classList.remove('on');}

function drawCurrencyChart(){
 var cv=document.getElementById('v26-cur-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=580,H=360;
 c.clearRect(0,0,W,H);c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 c.fillStyle='#c4956a';c.font='bold 14px sans-serif';c.textAlign='center';
 c.fillText('고대 화폐 희귀도 + 수집 현황',W/2,24);
 // Bar chart for rarity
 var ml=70,mr=100,mt=50,mb=40,cw=W-ml-mr,ch=H-mt-mb;
 c.strokeStyle='#3a3a4a';c.lineWidth=1;
 c.beginPath();c.moveTo(ml,mt);c.lineTo(ml,mt+ch);c.lineTo(ml+cw,mt+ch);c.stroke();
 var bw=cw/currencyData.length*0.6;
 currencyData.forEach(function(cur,i){
  var x=ml+cw*(i+0.5)/currencyData.length;
  var bh=ch*cur.rarity/100;
  c.fillStyle=curCollected[i]?'rgba(204,170,68,0.85)':'rgba(204,170,68,0.35)';
  c.fillRect(x-bw/2,mt+ch-bh,bw,bh);
  c.fillStyle='#e8dcc8';c.font='bold 9px sans-serif';c.textAlign='center';
  c.fillText(cur.rarity,x,mt+ch-bh-6);
  c.fillStyle='#8a7a6a';c.font='8px sans-serif';
  c.fillText(cur.name.substring(0,3),x,mt+ch+14);
  if(curGrades[i]){
   var gc={S:'#FFD700',A:'#44ccaa',B:'#5FA0FF',C:'#cc9944',D:'#cc4444'};
   c.fillStyle=gc[curGrades[i]];c.font='bold 11px sans-serif';
   c.fillText(curGrades[i],x,mt+ch-bh-20);
  }
 });
 // Donut for collection progress
 var collected=Object.keys(curCollected).length;
 var total=currencyData.length;
 var dcx=W-55,dcy=H/2,dr=40;
 var pct=collected/total;
 c.beginPath();c.arc(dcx,dcy,dr,0,Math.PI*2);c.strokeStyle='#3a3a2a';c.lineWidth=8;c.stroke();
 if(pct>0){c.beginPath();c.arc(dcx,dcy,dr,-Math.PI/2,-Math.PI/2+Math.PI*2*pct);c.strokeStyle='#FFD700';c.lineWidth=8;c.stroke();}
 c.fillStyle='#FFD700';c.font='bold 14px sans-serif';c.textAlign='center';c.textBaseline='middle';
 c.fillText(collected+'/'+total,dcx,dcy);
 c.fillStyle='#8a7a6a';c.font='9px sans-serif';
 c.fillText('수집율',dcx,dcy+18);
}

// ═══════════════════════════════════════════════════════
// 4. 세력 간 첩보전 시뮬레이터 Canvas (620x380) — 히트맵
// ═══════════════════════════════════════════════════════
var spyFactions=['고조선','부여','고구려','옥저','동예','삼한'];
var spyTypes=['정찰','암살','파괴공작','내통','위장','선전'];
var spyRates=[
 [80,40,55,65,70,85],[60,75,50,70,45,60],[90,65,80,55,75,70],
 [50,30,45,80,55,40],[45,35,40,75,60,50],[70,50,65,60,80,75]
];
var spyMissions=0,spySuccesses=0,spyIntel=0;

function openSpySim(){
 trackUsage26('spy');sfx26('spy_mission');
 var p=document.getElementById('v26-spy-panel');
 if(!p){
  p=document.createElement('div');p.id='v26-spy-panel';p.className='v26-panel';
  p.innerHTML='<h2>🕵️ 세력 간 첩보전</h2><p class="v26-sub">6세력 × 6첩보유형 성공률 히트맵 — 임무 실행</p><div class="spy-wrap"><canvas id="v26-spy-cv" width="620" height="380"></canvas><div class="spy-controls" id="v26-spy-ctrl"></div></div><button class="v26-close" onclick="closeSpySim()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var ctrl=document.getElementById('v26-spy-ctrl');
  spyFactions.forEach(function(f,i){
   var b=document.createElement('button');b.className='spy-btn';
   b.textContent='🕵️ '+f+' 임무';
   b.onclick=function(){
    sfx26('spy_mission');spyMissions++;
    var typeIdx=Math.floor(Math.random()*6);
    var rate=spyRates[i][typeIdx];
    var success=Math.random()*100<rate;
    if(success){spySuccesses++;spyIntel+=10;sfx26('spy_success');toast26('✅ '+f+' '+spyTypes[typeIdx]+' 성공! 정보 +10');}
    else{toast26('❌ '+f+' '+spyTypes[typeIdx]+' 실패!','rgba(40,10,10,.95)');}
    if(spySuccesses>=5)unlockAch26('spy_master');
    drawSpyHeatmap();
   };
   ctrl.appendChild(b);
  });
 }
 p.classList.add('on');drawSpyHeatmap();
}
function closeSpySim(){var p=document.getElementById('v26-spy-panel');if(p)p.classList.remove('on');}

function drawSpyHeatmap(){
 var cv=document.getElementById('v26-spy-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=620,H=380;
 c.clearRect(0,0,W,H);c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 c.fillStyle='#c4956a';c.font='bold 14px sans-serif';c.textAlign='center';
 c.fillText('첩보 성공률 히트맵 (세력 × 유형)',W/2,24);
 var ml=80,mt=55,cols=6,rows=6;
 var cellW=(W-ml-30)/cols,cellH=(H-mt-80)/rows;
 spyTypes.forEach(function(t,i){
  c.fillStyle='#44aa44';c.font='bold 9px sans-serif';c.textAlign='center';
  c.fillText(t,ml+cellW*(i+0.5),mt-8);
 });
 spyFactions.forEach(function(f,ri){
  c.fillStyle='#e8dcc8';c.font='10px sans-serif';c.textAlign='right';
  c.fillText(f,ml-6,mt+cellH*(ri+0.5)+4);
  spyRates[ri].forEach(function(v,ci){
   var x=ml+cellW*ci,y=mt+cellH*ri;
   var ratio=v/100;
   var r=Math.round(20+60*ratio),g=Math.round(100+120*ratio),b2=Math.round(20+60*ratio);
   c.fillStyle='rgb('+r+','+g+','+b2+')';
   c.fillRect(x+1,y+1,cellW-2,cellH-2);
   c.fillStyle=v>=60?'#fff':'#aaa';c.font='bold 10px sans-serif';c.textAlign='center';
   c.fillText(v+'%',x+cellW/2,y+cellH/2+4);
  });
 });
 c.fillStyle='#44aa44';c.font='11px sans-serif';c.textAlign='center';
 c.fillText('임무: '+spyMissions+'회 | 성공: '+spySuccesses+'회 | 정보: '+spyIntel+'pt',W/2,H-20);
}

// ═══════════════════════════════════════════════════════
// 5. 왕권 계승 분쟁도 Canvas (600x380) — 네트워크 그래프
// ═══════════════════════════════════════════════════════
var succData=[
 {name:'고조선 말기',icon:'⭐',claimants:['준왕','위만','기씨후손'],stability:30,desc:'위만의 찬탈로 혼란'},
 {name:'부여 왕위쟁탈',icon:'🏰',claimants:['해부루','금와','대소'],stability:45,desc:'해부루계와 금와계 갈등'},
 {name:'고구려 초기',icon:'⚔️',claimants:['주몽','유리','비류'],stability:50,desc:'주몽 건국 후 왕자간 분쟁'},
 {name:'백제 건국',icon:'🚢',claimants:['온조','비류','우태'],stability:55,desc:'비류와 온조의 남하 분립'},
 {name:'신라 초기',icon:'👑',claimants:['박혁거세','석탈해','김알지'],stability:60,desc:'3성 교대 왕위 계승'},
 {name:'가야 연맹',icon:'🔥',claimants:['수로왕','탈해','이진아시'],stability:40,desc:'가야 연맹 내 주도권 다툼'},
 {name:'위만 찬탈',icon:'🗡️',claimants:['위만','준왕','한씨세력'],stability:25,desc:'위만이 준왕을 몰아내다'},
 {name:'기자 교체',icon:'📜',claimants:['기자','단군후손','토착세력'],stability:35,desc:'기자조선으로의 전환기'}
];
var succResolved={};

function openSuccession(){
 trackUsage26('succession');sfx26('succession_resolve');
 var p=document.getElementById('v26-succ-panel');
 if(!p){
  p=document.createElement('div');p.id='v26-succ-panel';p.className='v26-panel';
  p.innerHTML='<h2>👑 왕권 계승 분쟁도</h2><p class="v26-sub">8대 계승 시나리오 — 관계 네트워크 / 안정도</p><div class="succ-wrap"><canvas id="v26-succ-cv" width="600" height="380"></canvas><div class="sc-controls" id="v26-sc-ctrl"></div></div><button class="v26-close" onclick="closeSuccession()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var ctrl=document.getElementById('v26-sc-ctrl');
  succData.forEach(function(s,i){
   var b=document.createElement('button');b.className='sc-btn';
   b.textContent=s.icon+' '+s.name+' 해결';
   b.onclick=function(){
    sfx26('succession_resolve');
    succResolved[i]=true;
    succData[i].stability=Math.min(100,succData[i].stability+20);
    var cnt=Object.keys(succResolved).length;
    if(cnt>=4)unlockAch26('succession_resolver');
    toast26(s.icon+' '+s.name+' 분쟁 해결! 안정도 +20');
    drawSuccessionMap();
   };
   ctrl.appendChild(b);
  });
 }
 p.classList.add('on');drawSuccessionMap();
}
function closeSuccession(){var p=document.getElementById('v26-succ-panel');if(p)p.classList.remove('on');}

function drawSuccessionMap(){
 var cv=document.getElementById('v26-succ-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=600,H=380;
 c.clearRect(0,0,W,H);c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 c.fillStyle='#c4956a';c.font='bold 14px sans-serif';c.textAlign='center';
 c.fillText('왕권 계승 분쟁 네트워크 / 안정도',W/2,24);
 // Network-style layout: place scenarios in a circle, draw claimant nodes
 var cx=W/2,cy=H/2+10,R=120;
 succData.forEach(function(s,i){
  var a=-Math.PI/2+2*Math.PI*i/succData.length;
  var nx=cx+R*Math.cos(a),ny=cy+R*Math.sin(a);
  // Draw stability meter as filled circle
  var stab=s.stability/100;
  c.beginPath();c.arc(nx,ny,22,0,Math.PI*2);
  c.fillStyle=succResolved[i]?'rgba(68,204,68,0.3)':'rgba(170,68,170,0.2)';c.fill();
  c.strokeStyle=succResolved[i]?'#44cc44':'#aa44aa';c.lineWidth=2;c.stroke();
  // Stability arc
  if(stab>0){c.beginPath();c.arc(nx,ny,22,-Math.PI/2,-Math.PI/2+Math.PI*2*stab);c.strokeStyle='#FFD700';c.lineWidth=3;c.stroke();}
  c.fillStyle='#e8dcc8';c.font='bold 9px sans-serif';c.textAlign='center';c.textBaseline='middle';
  c.fillText(s.icon,nx,ny-4);
  c.fillStyle='#aa44aa';c.font='8px sans-serif';
  c.fillText(s.name.substring(0,5),nx,ny+10);
  c.fillStyle='#8a7a6a';c.font='8px sans-serif';
  c.fillText(s.stability+'%',nx,ny+20);
  // Draw lines to claimants
  s.claimants.forEach(function(cl,ci){
   var ca=a+(-0.15+ci*0.15);
   var clx=cx+(R+55)*Math.cos(ca),cly=cy+(R+55)*Math.sin(ca);
   c.beginPath();c.moveTo(nx,ny);c.lineTo(clx,cly);
   c.strokeStyle='rgba(170,68,170,0.3)';c.lineWidth=1;c.stroke();
   c.beginPath();c.arc(clx,cly,4,0,Math.PI*2);
   c.fillStyle='#cc66cc';c.fill();
   c.fillStyle='#cc66cc';c.font='7px sans-serif';c.textAlign='center';
   c.fillText(cl.substring(0,3),clx,cly+12);
  });
 });
 var resolved=Object.keys(succResolved).length;
 c.fillStyle='#FFD700';c.font='11px sans-serif';c.textAlign='center';
 c.fillText('해결: '+resolved+'/'+succData.length+'건',W/2,H-14);
}

// ═══════════════════════════════════════════════════════
// 6. 고대 축성술 시뮬레이터 Canvas (620x400) — 8성곽 6축 Radar
// ═══════════════════════════════════════════════════════
var fortData=[
 {name:'토성',icon:'🧱',axes:[60,55,40,70,65,75],desc:'흙으로 쌓은 기본 성곽'},
 {name:'석성',icon:'🪨',axes:[85,90,70,80,80,60],desc:'돌로 축조한 견고한 성'},
 {name:'산성',icon:'🏔️',axes:[90,80,55,85,95,50],desc:'산지에 축조한 천험의 성'},
 {name:'평지성',icon:'🏰',axes:[70,65,60,90,50,85],desc:'평야에 세운 주거 중심 성'},
 {name:'수성',icon:'🌊',axes:[80,75,65,60,85,55],desc:'수로를 활용한 방어 성곽'},
 {name:'해안성',icon:'⚓',axes:[75,70,75,55,70,65],desc:'해안 방어를 위한 성곽'},
 {name:'관문성',icon:'🚪',axes:[95,85,80,50,90,45],desc:'교통 요지를 차단하는 관문'},
 {name:'도성',icon:'👑',axes:[80,75,90,95,60,90],desc:'수도를 둘러싼 국가 최대 성곽'}
];
var fortAxes=['방어력','내구성','건설비용','주둔병력','전략위치','보급용이'];
var fortSel=0,fortBuilt={},fortSiegeLog=[];

function openFortSim(){
 trackUsage26('fortress');sfx26('fortress_build');
 var p=document.getElementById('v26-fort-panel');
 if(!p){
  p=document.createElement('div');p.id='v26-fort-panel';p.className='v26-panel';
  p.innerHTML='<h2>🏯 고대 축성술 시뮬레이터</h2><p class="v26-sub">8종 성곽 6축 Radar — 축성/공성 시뮬</p><div class="fort-wrap"><canvas id="v26-fort-cv" width="620" height="400"></canvas><div class="ft-grid" id="v26-ft-grid"></div></div><button class="v26-close" onclick="closeFortSim()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var grid=document.getElementById('v26-ft-grid');
  fortData.forEach(function(f,i){
   var cd=document.createElement('div');cd.className='ft-card';
   cd.innerHTML='<div class="ft-icon">'+f.icon+'</div><div class="ft-name">'+f.name+'</div>';
   cd.onclick=function(){
    sfx26('fortress_build');fortSel=i;
    fortBuilt[i]=true;cd.classList.add('built');
    var cnt=Object.keys(fortBuilt).length;
    if(cnt>=4)unlockAch26('fortress_architect');
    // Siege simulation
    var def=fortData[i].axes[0]+fortData[i].axes[1];
    var atkPower=Math.floor(Math.random()*120)+60;
    var resist=def>atkPower;
    if(resist){sfx26('fortress_siege');toast26(f.icon+' '+f.name+' 축성! 공성 방어 성공! (방어 '+def+' > 공격 '+atkPower+')');}
    else{toast26(f.icon+' '+f.name+' 축성! 공성 방어 실패 (방어 '+def+' < 공격 '+atkPower+')','rgba(40,10,10,.95)');}
    fortSiegeLog.push({fort:f.name,resist:resist});
    drawFortRadar();
   };
   grid.appendChild(cd);
  });
 }
 p.classList.add('on');drawFortRadar();
}
function closeFortSim(){var p=document.getElementById('v26-fort-panel');if(p)p.classList.remove('on');}

function drawFortRadar(){
 var cv=document.getElementById('v26-fort-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=620,H=400,cx=W/2,cy=H/2+15,R=130,n=6;
 c.clearRect(0,0,W,H);c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 var f=fortData[fortSel];
 c.fillStyle='#c4956a';c.font='bold 16px sans-serif';c.textAlign='center';
 c.fillText(f.icon+' '+f.name+' 축성 분석',cx,28);
 c.fillStyle='#8a7a6a';c.font='11px sans-serif';c.fillText(f.desc,cx,46);
 for(var lv=1;lv<=5;lv++){
  c.beginPath();
  for(var i=0;i<=n;i++){
   var a=-Math.PI/2+2*Math.PI*i/n,r=R*lv/5;
   if(i===0)c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));else c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
  }
  c.strokeStyle='rgba(74,58,42,'+(0.12+lv*0.06)+')';c.lineWidth=1;c.stroke();
 }
 for(var i=0;i<n;i++){
  var a=-Math.PI/2+2*Math.PI*i/n;
  c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));
  c.strokeStyle='rgba(74,58,42,0.3)';c.stroke();
  c.fillStyle='#cc8844';c.font='bold 9px sans-serif';c.textAlign='center';c.textBaseline='middle';
  c.fillText(fortAxes[i],cx+(R+24)*Math.cos(a),cy+(R+24)*Math.sin(a));
 }
 c.beginPath();
 for(var i=0;i<=n;i++){
  var idx=i%n,a=-Math.PI/2+2*Math.PI*i/n,r=R*f.axes[idx]/100;
  if(i===0)c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));else c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
 }
 c.fillStyle='rgba(204,136,68,0.2)';c.fill();
 c.strokeStyle='#cc8844';c.lineWidth=2;c.stroke();
 for(var i=0;i<n;i++){
  var a=-Math.PI/2+2*Math.PI*i/n,r=R*f.axes[i]/100;
  c.beginPath();c.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),4,0,Math.PI*2);
  c.fillStyle='#cc8844';c.fill();
  c.fillStyle='#e8dcc8';c.font='bold 10px sans-serif';
  c.fillText(f.axes[i],cx+r*Math.cos(a),cy+r*Math.sin(a)-10);
 }
 var avg=0;f.axes.forEach(function(v){avg+=v;});avg=Math.round(avg/n);
 var grade=avg>=80?'S':avg>=65?'A':avg>=50?'B':avg>=35?'C':'D';
 var gc={S:'#FFD700',A:'#cc8844',B:'#5FA0FF',C:'#cc9944',D:'#cc4444'};
 c.fillStyle=gc[grade];c.font='bold 26px sans-serif';c.fillText(grade,cx,H-28);
 c.fillStyle='#8a7a6a';c.font='11px sans-serif';c.fillText('종합 '+avg+'점 | 공성 기록: '+fortSiegeLog.length+'회',cx,H-10);
}

// ═══════════════════════════════════════════════════════
// 7. 영웅 유물 감정소 Canvas (580x360) — 12유물 5축 Bar
// ═══════════════════════════════════════════════════════
var artifactData=[
 {name:'환웅천부인',icon:'☀️',metrics:[95,60,98,80,95],desc:'환웅이 하늘에서 가져온 3개의 천부인'},
 {name:'단군조의',icon:'👑',metrics:[98,50,95,85,90],desc:'단군의 건국 의례에 쓰인 법의'},
 {name:'주몽신궁',icon:'🏹',metrics:[90,95,90,75,80],desc:'주몽의 전설적 활'},
 {name:'광개토왕비',icon:'🪨',metrics:[100,40,100,90,70],desc:'광개토대왕의 업적을 기록한 비석'},
 {name:'을지문덕방패',icon:'🛡️',metrics:[85,90,88,70,75],desc:'살수대첩의 명장 방패'},
 {name:'해모수천마',icon:'🐎',metrics:[80,85,82,65,95],desc:'해모수가 타고 온 천마'},
 {name:'금와왕관',icon:'👑',metrics:[88,55,85,92,80],desc:'금와왕의 황금 왕관'},
 {name:'비류신검',icon:'🗡️',metrics:[75,92,78,60,70],desc:'비류가 지닌 전설의 검'},
 {name:'온조건국인',icon:'🔏',metrics:[92,45,90,88,75],desc:'온조의 백제 건국 옥새'},
 {name:'유리왕옥피리',icon:'🎵',metrics:[70,30,80,95,90],desc:'유리왕의 옥으로 만든 피리'},
 {name:'대무신왕천둥창',icon:'⚡',metrics:[82,98,85,60,85],desc:'대무신왕의 천둥 소리 나는 창'},
 {name:'호동왕자낙랑북',icon:'🥁',metrics:[78,70,92,80,88],desc:'호동왕자의 자명고 파괴 이야기'}
];
var artifactMetrics=['역사성','전투력','희귀도','상태','영적가치'];
var artAppraised={};

function openArtifactHall(){
 trackUsage26('artifact');sfx26('artifact_appraise');
 var p=document.getElementById('v26-artifact-panel');
 if(!p){
  p=document.createElement('div');p.id='v26-artifact-panel';p.className='v26-panel';
  p.innerHTML='<h2>🔮 영웅 유물 감정소</h2><p class="v26-sub">12점 전설 유물 5축 감정 — 발견 확률</p><div class="artifact-wrap"><canvas id="v26-art-cv" width="580" height="360"></canvas><div class="af-grid" id="v26-af-grid"></div></div><button class="v26-close" onclick="closeArtifactHall()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var grid=document.getElementById('v26-af-grid');
  artifactData.forEach(function(af,i){
   var cd=document.createElement('div');cd.className='af-card';
   cd.innerHTML='<div class="af-icon">'+af.icon+'</div><div class="af-name">'+af.name.substring(0,5)+'</div>';
   cd.onclick=function(){
    sfx26('artifact_find');artSel26=i;
    artAppraised[i]=true;cd.classList.add('appraised');
    var cnt=Object.keys(artAppraised).length;
    if(cnt>=6)unlockAch26('artifact_appraiser');
    toast26(af.icon+' '+af.name+' 감정 완료!');
    drawArtifactChart();
   };
   grid.appendChild(cd);
  });
 }
 p.classList.add('on');drawArtifactChart();
}
var artSel26=0;
function closeArtifactHall(){var p=document.getElementById('v26-artifact-panel');if(p)p.classList.remove('on');}

function drawArtifactChart(){
 var cv=document.getElementById('v26-art-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=580,H=360;
 c.clearRect(0,0,W,H);c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 var af=artifactData[artSel26];
 c.fillStyle='#c4956a';c.font='bold 14px sans-serif';c.textAlign='center';
 c.fillText(af.icon+' '+af.name+' 감정 결과',W/2,24);
 c.fillStyle='#8a7a6a';c.font='11px sans-serif';c.fillText(af.desc,W/2,42);
 // Horizontal bar chart for 5 metrics
 var ml=90,mr=40,mt=60,mb=40,cw=W-ml-mr,ch=H-mt-mb;
 var barH=ch/artifactMetrics.length*0.65,gap=ch/artifactMetrics.length;
 var metricColors=['#cc66cc','#cc4444','#FFD700','#44ccaa','#8866cc'];
 artifactMetrics.forEach(function(m,i){
  var y=mt+gap*i+(gap-barH)/2;
  var v=af.metrics[i];
  var bw=cw*v/100;
  c.fillStyle=artAppraised[artSel26]?metricColors[i]:(metricColors[i]+'66');
  c.fillRect(ml,y,bw,barH);
  c.fillStyle='#e8dcc8';c.font='bold 10px sans-serif';c.textAlign='left';
  c.fillText(v,ml+bw+6,y+barH/2+4);
  c.fillStyle='#cc66cc';c.font='10px sans-serif';c.textAlign='right';
  c.fillText(m,ml-6,y+barH/2+4);
 });
 var avg=0;af.metrics.forEach(function(v){avg+=v;});avg=Math.round(avg/artifactMetrics.length);
 var grade=avg>=85?'S':avg>=70?'A':avg>=55?'B':avg>=40?'C':'D';
 var gc={S:'#FFD700',A:'#cc66cc',B:'#5FA0FF',C:'#cc9944',D:'#cc4444'};
 c.fillStyle=gc[grade];c.font='bold 24px sans-serif';c.textAlign='center';
 c.fillText(grade+' 등급',W/2,H-16);
 c.fillStyle='#8a7a6a';c.font='10px sans-serif';
 c.fillText('종합 '+avg+'점 | 감정: '+Object.keys(artAppraised).length+'/'+artifactData.length+'점',W/2,H-2);
}

// ═══════════════════════════════════════════════════════
// 8. 고대 제례 의식관 Canvas (600x380) — 10제례 6축 Radar
// ═══════════════════════════════════════════════════════
var ritualData=[
 {name:'제천대제',icon:'🌅',axes:[95,90,85,70,80,90],desc:'하늘에 올리는 최대 제사',morale:20,faith:25},
 {name:'영고',icon:'🥁',axes:[80,85,60,90,75,70],desc:'부여의 12월 제천행사',morale:15,faith:20},
 {name:'동맹',icon:'🤝',axes:[85,75,80,85,70,75],desc:'고구려의 10월 제천행사',morale:18,faith:18},
 {name:'무천',icon:'💃',axes:[75,70,65,95,85,60],desc:'동예의 10월 제천행사',morale:12,faith:15},
 {name:'10월제',icon:'🍂',axes:[70,65,75,80,90,55],desc:'삼한의 가을 수확 감사제',morale:10,faith:12},
 {name:'농경제',icon:'🌾',axes:[60,50,55,85,95,45],desc:'풍년을 기원하는 농사 제사',morale:8,faith:10},
 {name:'선조제',icon:'🏛️',axes:[65,80,90,60,50,80],desc:'조상신에게 올리는 제사',morale:10,faith:22},
 {name:'천문제',icon:'⭐',axes:[55,95,70,45,65,85],desc:'천문 관측에 따른 의례',morale:5,faith:18},
 {name:'풍년제',icon:'🎊',axes:[70,55,50,90,90,50],desc:'풍작을 축하하는 축제',morale:20,faith:8},
 {name:'전승제',icon:'⚔️',axes:[90,60,80,50,40,95],desc:'전쟁 승리를 기념하는 제례',morale:25,faith:15}
];
var ritualAxes=['규모','종교성','정치성','민속성','계절성','비용'];
var ritualSel=0,ritualPerformed={},totalMorale=0,totalFaith=0;

function openRitualHall(){
 trackUsage26('ritual');sfx26('ritual_perform');
 var p=document.getElementById('v26-ritual-panel');
 if(!p){
  p=document.createElement('div');p.id='v26-ritual-panel';p.className='v26-panel';
  p.innerHTML='<h2>🙏 고대 제례 의식관</h2><p class="v26-sub">10대 제례 6축 Radar — 사기/신앙 보너스</p><div class="ritual-wrap"><canvas id="v26-ritual-cv" width="600" height="380"></canvas><div class="rt-grid" id="v26-rt-grid"></div></div><button class="v26-close" onclick="closeRitualHall()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var grid=document.getElementById('v26-rt-grid');
  ritualData.forEach(function(r,i){
   var cd=document.createElement('div');cd.className='rt-card';
   cd.innerHTML='<div class="rt-icon">'+r.icon+'</div><div class="rt-name">'+r.name+'</div>';
   cd.onclick=function(){
    sfx26('ritual_perform');ritualSel=i;
    ritualPerformed[i]=true;cd.classList.add('performed');
    totalMorale+=r.morale;totalFaith+=r.faith;
    var cnt=Object.keys(ritualPerformed).length;
    if(cnt>=5)unlockAch26('ritual_priest');
    toast26(r.icon+' '+r.name+' 시행! 사기+'+r.morale+' 신앙+'+r.faith);
    drawRitualRadar();
   };
   grid.appendChild(cd);
  });
 }
 p.classList.add('on');drawRitualRadar();
}
function closeRitualHall(){var p=document.getElementById('v26-ritual-panel');if(p)p.classList.remove('on');}

function drawRitualRadar(){
 var cv=document.getElementById('v26-ritual-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=600,H=380,cx=W/2,cy=H/2+10,R=120,n=6;
 c.clearRect(0,0,W,H);c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 var r=ritualData[ritualSel];
 c.fillStyle='#c4956a';c.font='bold 16px sans-serif';c.textAlign='center';
 c.fillText(r.icon+' '+r.name,cx,26);
 c.fillStyle='#8a7a6a';c.font='11px sans-serif';c.fillText(r.desc,cx,44);
 for(var lv=1;lv<=5;lv++){
  c.beginPath();
  for(var i=0;i<=n;i++){
   var a=-Math.PI/2+2*Math.PI*i/n,rd=R*lv/5;
   if(i===0)c.moveTo(cx+rd*Math.cos(a),cy+rd*Math.sin(a));else c.lineTo(cx+rd*Math.cos(a),cy+rd*Math.sin(a));
  }
  c.strokeStyle='rgba(58,42,26,'+(0.12+lv*0.06)+')';c.lineWidth=1;c.stroke();
 }
 for(var i=0;i<n;i++){
  var a=-Math.PI/2+2*Math.PI*i/n;
  c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));
  c.strokeStyle='rgba(58,42,26,0.3)';c.stroke();
  c.fillStyle='#cc9944';c.font='bold 9px sans-serif';c.textAlign='center';c.textBaseline='middle';
  c.fillText(ritualAxes[i],cx+(R+24)*Math.cos(a),cy+(R+24)*Math.sin(a));
 }
 c.beginPath();
 for(var i=0;i<=n;i++){
  var idx=i%n,a=-Math.PI/2+2*Math.PI*i/n,rd=R*r.axes[idx]/100;
  if(i===0)c.moveTo(cx+rd*Math.cos(a),cy+rd*Math.sin(a));else c.lineTo(cx+rd*Math.cos(a),cy+rd*Math.sin(a));
 }
 c.fillStyle='rgba(204,153,68,0.2)';c.fill();
 c.strokeStyle='#cc9944';c.lineWidth=2;c.stroke();
 for(var i=0;i<n;i++){
  var a=-Math.PI/2+2*Math.PI*i/n,rd=R*r.axes[i]/100;
  c.beginPath();c.arc(cx+rd*Math.cos(a),cy+rd*Math.sin(a),4,0,Math.PI*2);
  c.fillStyle='#cc9944';c.fill();
  c.fillStyle='#e8dcc8';c.font='bold 10px sans-serif';
  c.fillText(r.axes[i],cx+rd*Math.cos(a),cy+rd*Math.sin(a)-10);
 }
 // Morale / Faith tracker
 c.fillStyle='#44cc88';c.font='bold 11px sans-serif';c.textAlign='center';
 c.fillText('총 사기: +'+totalMorale,cx-80,H-14);
 c.fillStyle='#ccaa44';
 c.fillText('총 신앙: +'+totalFaith,cx+80,H-14);
 var performed=Object.keys(ritualPerformed).length;
 c.fillStyle='#8a7a6a';c.font='10px sans-serif';
 c.fillText('시행: '+performed+'/'+ritualData.length+'회',cx,H-2);
}

// ═══════════════════════════════════════════════════════
// 퀴즈 v26 (+15문항, 270→285)
// ═══════════════════════════════════════════════════════
var quiz26=[
 {q:'고조선 시대 한강 하구는 어떤 교역의 중심지였는가?',a:['곡물/목재 교역','비단 수출','철 수입','옥 가공'],c:0},
 {q:'살수대첩에서 을지문덕이 사용한 핵심 전술은?',a:['청야전술','화공','기습','포위'],c:0},
 {q:'명도전은 어떤 형태의 고대 화폐인가?',a:['칼 모양','원형','반달형','삼각형'],c:0},
 {q:'고조선의 첩보 활동에서 가장 효과적이었던 방식은?',a:['정찰','암살','내통','선전'],c:0},
 {q:'위만이 고조선의 왕위를 찬탈한 방법은?',a:['군사 쿠데타','선거','혈연 계승','신탁'],c:0},
 {q:'고구려 산성의 가장 큰 장점은 무엇인가?',a:['지형을 이용한 방어','낮은 건설 비용','넓은 주둔 공간','보급 용이'],c:0},
 {q:'환웅이 하늘에서 가져온 천부인은 몇 개인가?',a:['3개','5개','7개','1개'],c:0},
 {q:'부여의 제천행사 영고는 몇 월에 열렸는가?',a:['12월','1월','10월','5월'],c:0},
 {q:'광개토대왕비에 기록된 주요 정복 대상국은?',a:['백제/신라/왜','고조선/한','가야/동예','부여/옥저'],c:0},
 {q:'고대 한반도에서 은병을 화폐로 사용한 시대는?',a:['고려','고조선','신라','조선'],c:0},
 {q:'안시성 전투에서 고구려가 막아낸 적국은?',a:['당나라','수나라','한나라','거란'],c:0},
 {q:'삼한의 소도는 어떤 역할을 하는 장소였는가?',a:['제사/신성구역','군사 훈련장','교역 시장','왕궁'],c:0},
 {q:'고조선의 토성 축성에 주로 사용된 기법은?',a:['판축법','석축법','벽돌쌓기','목재축조'],c:0},
 {q:'고구려 동맹 제천행사가 열린 달은?',a:['10월','12월','정월','5월'],c:0},
 {q:'이순신 장군의 명량해전에서 조선 수군의 전선 수는?',a:['13척','23척','100척','50척'],c:0}
];
var quiz26State={idx:0,score:0,done:false};

function openQuiz26(){
 var p=document.getElementById('v26-quiz-panel');
 if(!p){
  p=document.createElement('div');p.id='v26-quiz-panel';p.className='v26-panel';
  p.innerHTML='<h2>📝 한국사 퀴즈 v26</h2><p class="v26-sub">15문항 — 무역/전투/화폐/첩보/축성/유물/제례</p><div id="v26-quiz-area" style="max-width:500px;margin:0 auto;text-align:center;padding:20px"></div><button class="v26-close" onclick="closeQuiz26()">닫기 (ESC)</button>';
  document.body.appendChild(p);
 }
 quiz26State={idx:0,score:0,done:false};
 p.classList.add('on');renderQuiz26();
}
function closeQuiz26(){var p=document.getElementById('v26-quiz-panel');if(p)p.classList.remove('on');}

function renderQuiz26(){
 var area=document.getElementById('v26-quiz-area');if(!area)return;
 if(quiz26State.done){
  var pct=Math.round(quiz26State.score/quiz26.length*100);
  var grade=pct>=90?'S':pct>=70?'A':pct>=50?'B':pct>=30?'C':'D';
  unlockAch26('quiz_v26_clear');
  if(grade==='S')unlockAch26('quiz_v26_master');
  area.innerHTML='<h3 style="color:#FFD700;font-size:22px">'+grade+' 등급</h3><p style="color:#e8dcc8;margin:8px 0">'+quiz26State.score+'/'+quiz26.length+' 정답 ('+pct+'%)</p><button class="v26-close" onclick="quiz26State.idx=0;quiz26State.score=0;quiz26State.done=false;renderQuiz26();">다시 풀기</button>';
  try{var st=JSON.parse(localStorage.getItem('krpg_stats'))||{};st.quizOk=(st.quizOk||0)+quiz26State.score;localStorage.setItem('krpg_stats',JSON.stringify(st));}catch(e){}
  return;
 }
 var q=quiz26[quiz26State.idx];
 var html='<p style="color:#FFD700;font-size:12px;margin-bottom:6px">Q'+(quiz26State.idx+1)+'/'+quiz26.length+'</p>';
 html+='<p style="color:#e8dcc8;font-size:14px;margin-bottom:16px;line-height:1.6">'+q.q+'</p>';
 q.a.forEach(function(a,i){
  html+='<button onclick="answerQuiz26('+i+')" style="display:block;width:100%;margin:6px 0;padding:10px;border:1px solid #3a3a4a;border-radius:8px;background:rgba(26,20,40,.8);color:#e8dcc8;font-size:12px;cursor:pointer;font-family:inherit;text-align:left">'+'❶❷❸❹'[i]+' '+a+'</button>';
 });
 area.innerHTML=html;
}
function answerQuiz26(i){
 var q=quiz26[quiz26State.idx];
 if(i===q.c){quiz26State.score++;sfx26('quiz_v26');toast26('정답!');}
 else{sfx26('quiz_wrong_v26');toast26('오답! 정답: '+q.a[q.c],'rgba(40,10,10,.95)');}
 quiz26State.idx++;
 if(quiz26State.idx>=quiz26.length)quiz26State.done=true;
 renderQuiz26();
}

// ─── 하단 네비바 버튼 추가 (기존 nav에 append, 신규생성 금지) ───
function appendNavButtons26(){
 var existingNav=document.querySelector('[class*="bottom-bar"],[class*="bottomNav"],[class*="nav-bar"],[id*="bottom"]');
 if(!existingNav){
  var allNavs=document.querySelectorAll('div,nav');
  for(var i=0;i<allNavs.length;i++){
   var s=allNavs[i].style;
   if(s&&s.position==='fixed'&&(s.bottom==='0px'||s.bottom==='0')){existingNav=allNavs[i];break;}
  }
 }
 if(!existingNav)return;

 var btns=[
  {label:'⚓무역항',fn:'openTradePort'},
  {label:'⚔️전투재현',fn:'openBattleReenact'},
  {label:'🪙화폐관',fn:'openCurrencyHall'},
  {label:'🕵️첩보전',fn:'openSpySim'},
  {label:'👑계승분쟁',fn:'openSuccession'},
  {label:'🏯축성술',fn:'openFortSim'},
  {label:'🔮유물감정',fn:'openArtifactHall'},
  {label:'🙏제례관',fn:'openRitualHall'},
  {label:'📝퀴즈v26',fn:'openQuiz26'}
 ];
 btns.forEach(function(b){
  var btn=document.createElement('button');
  btn.textContent=b.label;
  btn.style.cssText='background:rgba(26,20,40,.85);color:#c4956a;border:1px solid #3a3a4a;border-radius:8px;padding:6px 8px;font-size:9px;cursor:pointer;font-family:inherit;margin:2px;';
  btn.onclick=function(){if(window[b.fn])window[b.fn]();};
  existingNav.appendChild(btn);
 });
}

setTimeout(appendNavButtons26,2000);

// ─── 키보드 단축키 Shift+G/H/J/K/L/Z/X/C (v26) ───
document.addEventListener('keydown',function(e){
 if(!e.shiftKey)return;
 var map={
  'G':openTradePort,'H':openBattleReenact,'J':openCurrencyHall,'K':openSpySim,
  'L':openSuccession,'Z':openFortSim,'X':openArtifactHall,'C':openRitualHall
 };
 if(map[e.key]){e.preventDefault();map[e.key]();}
});

// ─── ESC 닫기 v26 ───
document.addEventListener('keydown',function(e){
 if(e.key==='Escape'){
  ['v26-port-panel','v26-battle-panel','v26-currency-panel','v26-spy-panel','v26-succ-panel','v26-fort-panel','v26-artifact-panel','v26-ritual-panel','v26-quiz-panel'].forEach(function(id){
   var p=document.getElementById(id);if(p)p.classList.remove('on');
  });
 }
});

// ─── URL 파라미터 처리 v26 ───
(function(){
 var params=new URLSearchParams(window.location.search);
 var openMap={
  'tradeport':openTradePort,'battlereenact':openBattleReenact,'currency':openCurrencyHall,
  'espionage':openSpySim,'succession':openSuccession,'fortification':openFortSim,
  'artifact':openArtifactHall,'ritual':openRitualHall,'quiz26':openQuiz26
 };
 var openParam=params.get('open');
 if(openParam&&openMap[openParam])setTimeout(function(){openMap[openParam]();},1200);
})();

// ─── localStorage v26 키 초기화 ───
(function(){
 try{
  if(!localStorage.getItem('krpg_v26_init')){
   localStorage.setItem('krpg_v26_init','1');
   var st=JSON.parse(localStorage.getItem('krpg_stats'))||{};
   st.v26=true;localStorage.setItem('krpg_stats',JSON.stringify(st));
  }
 }catch(e){}
})();

// ─── 전역 함수 노출 ───
window.openTradePort=openTradePort;
window.closeTradePort=closeTradePort;
window.openBattleReenact=openBattleReenact;
window.closeBattleReenact=closeBattleReenact;
window.openCurrencyHall=openCurrencyHall;
window.closeCurrencyHall=closeCurrencyHall;
window.openSpySim=openSpySim;
window.closeSpySim=closeSpySim;
window.openSuccession=openSuccession;
window.closeSuccession=closeSuccession;
window.openFortSim=openFortSim;
window.closeFortSim=closeFortSim;
window.openArtifactHall=openArtifactHall;
window.closeArtifactHall=closeArtifactHall;
window.openRitualHall=openRitualHall;
window.closeRitualHall=closeRitualHall;
window.openQuiz26=openQuiz26;
window.closeQuiz26=closeQuiz26;
window.answerQuiz26=answerQuiz26;

})();
