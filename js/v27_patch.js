// v27_patch.js — 한국사 영웅전 v27.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v27-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:145;overflow-y:auto;padding:16px}',
'.v27-panel.on{display:block}',
'.v27-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v27-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v27-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v27-close:hover{background:#8B2A1A}',
'.v27-toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);padding:8px 20px;border-radius:20px;font-size:11px;font-weight:700;z-index:999;pointer-events:none;animation:v27fade 2s ease forwards}',
'@keyframes v27fade{0%{opacity:0;transform:translate(-50%,-10px)}10%{opacity:1;transform:translate(-50%,0)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-10px)}}',

'.astro-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.astro-wrap canvas{border:2px solid #1a2a4a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.astro-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.astro-btn{padding:5px 12px;border:1px solid #1a2a4a;border-radius:6px;background:#0a0a2a;color:#4488cc;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.astro-btn:hover{border-color:#4488cc}',
'.astro-btn.active{border-color:#FFD700;color:#FFD700}',

'.merit-wrap{max-width:600px;margin:0 auto;text-align:center}',
'.merit-wrap canvas{border:2px solid #4a2a1a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.merit-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px;max-width:600px;margin:8px auto}',
'.mr-card{background:linear-gradient(135deg,rgba(20,14,8,.95),rgba(14,10,4,.98));border:2px solid #4a2a1a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.mr-card:hover{border-color:#cc7744;transform:translateY(-2px)}',
'.mr-card.awarded{border-color:#FFD700}',
'.mr-card .mr-icon{font-size:24px}',
'.mr-card .mr-name{font-size:9px;color:#cc7744;font-weight:700;margin-top:2px}',

'.law-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.law-wrap canvas{border:2px solid #2a2a4a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.law-controls{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.law-btn{padding:6px 14px;border:1px solid #2a2a4a;border-radius:6px;background:#0a0a1a;color:#6666cc;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.law-btn:hover{border-color:#6666cc;background:#14142a}',

'.counter-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.counter-wrap canvas{border:2px solid #3a1a1a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.ctr-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.ctr-btn{padding:5px 12px;border:1px solid #3a1a1a;border-radius:6px;background:#140a0a;color:#cc4444;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.ctr-btn:hover{border-color:#cc4444}',
'.ctr-btn.active{border-color:#FFD700;color:#FFD700}',

'.farm-wrap{max-width:600px;margin:0 auto;text-align:center}',
'.farm-wrap canvas{border:2px solid #2a3a1a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.farm-controls{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.farm-btn{padding:6px 14px;border:1px solid #2a3a1a;border-radius:6px;background:#0a140a;color:#66aa44;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.farm-btn:hover{border-color:#66aa44;background:#142a10}',

'.library-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.library-wrap canvas{border:2px solid #3a2a4a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.lib-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;max-width:620px;margin:8px auto}',
'.lb-card{background:linear-gradient(135deg,rgba(16,12,22,.95),rgba(10,8,16,.98));border:2px solid #3a2a4a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.lb-card:hover{border-color:#8866cc;transform:translateY(-2px)}',
'.lb-card.read{border-color:#FFD700}',
'.lb-card .lb-icon{font-size:24px}',
'.lb-card .lb-name{font-size:9px;color:#8866cc;font-weight:700;margin-top:2px}',

'.med-wrap{max-width:600px;margin:0 auto;text-align:center}',
'.med-wrap canvas{border:2px solid #1a3a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.med-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px;max-width:600px;margin:8px auto}',
'.md-card{background:linear-gradient(135deg,rgba(10,18,14,.95),rgba(6,12,10,.98));border:2px solid #1a3a2a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.md-card:hover{border-color:#44aa66;transform:translateY(-2px)}',
'.md-card.discovered{border-color:#FFD700}',
'.md-card .md-icon{font-size:22px}',
'.md-card .md-name{font-size:9px;color:#44aa66;font-weight:700;margin-top:2px}',

'.bond-wrap{max-width:640px;margin:0 auto;text-align:center}',
'.bond-wrap canvas{border:2px solid #4a1a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.bond-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.bd-btn{padding:5px 12px;border:1px solid #4a1a3a;border-radius:6px;background:#140a14;color:#cc44aa;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.bd-btn:hover{border-color:#cc44aa}',
'.bd-btn.active{border-color:#FFD700;color:#FFD700}'
].join('\n');
document.head.appendChild(css);

function sfx27(type){
 try{
  var a=new(window.AudioContext||window.webkitAudioContext)();
  var o=a.createOscillator(),g=a.createGain();
  o.connect(g);g.connect(a.destination);
  var t=a.currentTime;
  var presets={
   star_observe:{f:880,w:'sine',a:0.12,d:0.6},
   star_map:{f:660,w:'sine',a:0.1,d:0.5},
   merit_award:{f:523,w:'triangle',a:0.15,d:0.7},
   merit_promote:{f:698,w:'triangle',a:0.12,d:0.5},
   law_enact:{f:440,w:'square',a:0.06,d:0.4},
   law_scroll:{f:330,w:'sine',a:0.08,d:0.3},
   counter_strike:{f:220,w:'sawtooth',a:0.1,d:0.3},
   counter_defend:{f:330,w:'square',a:0.08,d:0.35},
   farm_plant:{f:392,w:'sine',a:0.1,d:0.4},
   farm_harvest:{f:587,w:'triangle',a:0.12,d:0.5},
   library_open:{f:494,w:'sine',a:0.1,d:0.5},
   library_learn:{f:659,w:'sine',a:0.12,d:0.6},
   med_brew:{f:370,w:'triangle',a:0.1,d:0.4},
   med_cure:{f:554,w:'sine',a:0.12,d:0.5},
   bond_form:{f:440,w:'sine',a:0.1,d:0.5},
   bond_strengthen:{f:587,w:'triangle',a:0.13,d:0.6},
   quiz_correct_v27:{f:784,w:'sine',a:0.12,d:0.4},
   quiz_wrong_v27:{f:196,w:'sawtooth',a:0.08,d:0.3},
   achieve_v27:{f:880,w:'triangle',a:0.15,d:0.8},
   nav_v27:{f:440,w:'sine',a:0.06,d:0.2}
  };
  var p=presets[type]||presets.nav_v27;
  o.type=p.w;o.frequency.setValueAtTime(p.f,t);
  g.gain.setValueAtTime(p.a,t);
  g.gain.exponentialRampToValueAtTime(0.001,t+p.d);
  o.start(t);o.stop(t+p.d);
 }catch(e){}
}

function toast27(msg,color){
 var t=document.createElement('div');
 t.className='v27-toast';
 t.style.background='rgba(10,10,20,.92)';
 t.style.border='1px solid '+(color||'#c4956a');
 t.style.color=color||'#c4956a';
 t.textContent=msg;
 document.body.appendChild(t);
 setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t);},2200);
}

var ach27=JSON.parse(localStorage.getItem('krpg_ach')||'[]');
function unlockAch27(id,name){
 if(ach27.indexOf(id)>=0)return;
 ach27.push(id);
 localStorage.setItem('krpg_ach',JSON.stringify(ach27));
 sfx27('achieve_v27');
 toast27('🏆 업적 해금: '+name,'#FFD700');
}

// ═══════════════════════════════════════════════════════════
// 1. 고대 천문 관측소 Canvas 620x400
// ═══════════════════════════════════════════════════════════
var astroData=[
 {name:'북두칠성',season:'사계절',stars:7,myth:'하늘의 수레, 군주의 운명을 점침',x:0.3,y:0.25,bright:0.95},
 {name:'삼태성',season:'겨울',stars:3,myth:'삼정승(영의정·좌의정·우의정)을 상징',x:0.6,y:0.2,bright:0.8},
 {name:'견우성',season:'가을',stars:1,myth:'직녀와의 사랑, 칠석 전설의 주인공',x:0.75,y:0.35,bright:0.88},
 {name:'직녀성',season:'여름',stars:1,myth:'베짜기의 신, 하늘의 길쌈',x:0.55,y:0.4,bright:0.92},
 {name:'남두육성',season:'여름',stars:6,myth:'수명을 관장, 남쪽 하늘의 국자',x:0.4,y:0.55,bright:0.75},
 {name:'이십팔수',season:'사계절',stars:28,myth:'하늘을 28구역으로 나눈 별자리 체계',x:0.2,y:0.65,bright:0.7},
 {name:'태양성',season:'새벽',stars:1,myth:'삼족오가 사는 곳, 왕권의 상징',x:0.8,y:0.6,bright:1.0},
 {name:'혜성',season:'불규칙',stars:1,myth:'큰 변화의 전조, 왕조 교체 징조',x:0.5,y:0.75,bright:0.6},
 {name:'객성',season:'불규칙',stars:1,myth:'초신성 폭발, 손님별이라 불림',x:0.15,y:0.4,bright:0.65},
 {name:'자미원',season:'사계절',stars:15,myth:'천자의 거처, 궁궐 하늘의 중심',x:0.45,y:0.15,bright:0.85}
];
var astroSel=0;

function renderAstroCanvas(){
 var c=document.getElementById('v27-astro-canvas');if(!c)return;
 var x=c.getContext('2d'),W=c.width,H=c.height;
 x.fillStyle='#04061a';x.fillRect(0,0,W,H);
 x.font='bold 14px sans-serif';x.fillStyle='#4488cc';x.textAlign='center';
 x.fillText('고대 천문 관측소 — 별자리 성도',W/2,24);
 x.font='10px sans-serif';x.fillStyle='#335588';
 x.fillText('고조선 천문학: 하늘의 뜻을 읽는 기술',W/2,40);

 for(var i=0;i<80;i++){
  var sx=Math.random()*W,sy=50+Math.random()*(H-80);
  var sa=Math.random()*0.3+0.1;
  x.beginPath();x.arc(sx,sy,Math.random()*1.2+0.3,0,Math.PI*2);
  x.fillStyle='rgba(180,200,255,'+sa+')';x.fill();
 }

 astroData.forEach(function(d,i){
  var cx=40+d.x*(W-80),cy=50+d.y*(H-100);
  var r=d.bright*8+4;
  var glow=x.createRadialGradient(cx,cy,0,cx,cy,r*3);
  glow.addColorStop(0,i===astroSel?'rgba(255,215,0,0.6)':'rgba(100,150,255,0.3)');
  glow.addColorStop(1,'rgba(0,0,20,0)');
  x.fillStyle=glow;x.fillRect(cx-r*3,cy-r*3,r*6,r*6);

  x.beginPath();x.arc(cx,cy,r,0,Math.PI*2);
  x.fillStyle=i===astroSel?'#FFD700':'rgba(180,200,255,'+(d.bright*0.8+0.2)+')';
  x.fill();

  if(d.stars>1){
   for(var s=0;s<Math.min(d.stars,6);s++){
    var a=s*(Math.PI*2/Math.min(d.stars,6));
    var sx2=cx+Math.cos(a)*(r+8),sy2=cy+Math.sin(a)*(r+8);
    x.beginPath();x.arc(sx2,sy2,1.5,0,Math.PI*2);
    x.fillStyle='rgba(180,200,255,0.5)';x.fill();
    x.beginPath();x.moveTo(cx,cy);x.lineTo(sx2,sy2);
    x.strokeStyle='rgba(100,150,255,0.15)';x.lineWidth=0.5;x.stroke();
   }
  }

  x.font='9px sans-serif';x.textAlign='center';
  x.fillStyle=i===astroSel?'#FFD700':'#6688aa';
  x.fillText(d.name,cx,cy+r+14);
 });

 var sel=astroData[astroSel];
 var infoY=H-80;
 x.fillStyle='rgba(10,20,40,0.85)';
 x.fillRect(10,infoY-8,W-20,74);
 x.strokeStyle='#1a3a5a';x.lineWidth=1;x.strokeRect(10,infoY-8,W-20,74);
 x.font='bold 13px sans-serif';x.fillStyle='#FFD700';x.textAlign='left';
 x.fillText('★ '+sel.name,20,infoY+8);
 x.font='10px sans-serif';x.fillStyle='#88aacc';
 x.fillText('관측 계절: '+sel.season+' | 주요 항성: '+sel.stars+'개 | 밝기: '+(sel.bright*100).toFixed(0)+'%',20,infoY+26);
 x.fillStyle='#aabbcc';
 x.fillText('신화: '+sel.myth,20,infoY+44);
 var grade=sel.bright>=0.9?'S':sel.bright>=0.75?'A':sel.bright>=0.6?'B':'C';
 x.font='bold 20px sans-serif';x.textAlign='right';
 x.fillStyle=grade==='S'?'#FFD700':grade==='A'?'#44cc88':'#4488cc';
 x.fillText(grade,W-20,infoY+14);
 x.font='9px sans-serif';x.fillText('관측등급',W-20,infoY+28);
}

function openAstroObs(){
 sfx27('star_observe');
 var p=document.getElementById('v27-astro-panel');
 if(!p){
  p=document.createElement('div');p.id='v27-astro-panel';p.className='v27-panel';
  p.innerHTML='<h2>🌌 고대 천문 관측소</h2><p class="v27-sub">고조선 천문학 — 10대 별자리 관측 성도</p><div class="astro-wrap"><canvas id="v27-astro-canvas" width="620" height="400"></canvas><div class="astro-tabs" id="v27-astro-tabs"></div></div><button class="v27-close" onclick="closeAstroObs()">닫기</button>';
  document.body.appendChild(p);
  var tabs=p.querySelector('#v27-astro-tabs');
  astroData.forEach(function(d,i){
   var b=document.createElement('button');b.className='astro-btn'+(i===0?' active':'');
   b.textContent=d.name;b.onclick=function(){
    astroSel=i;sfx27('star_map');
    tabs.querySelectorAll('.astro-btn').forEach(function(bt,j){bt.className='astro-btn'+(j===i?' active':'');});
    renderAstroCanvas();
   };tabs.appendChild(b);
  });
 }
 p.classList.add('on');renderAstroCanvas();
 unlockAch27('astro_observer','천문 관측자');
}
function closeAstroObs(){var p=document.getElementById('v27-astro-panel');if(p)p.classList.remove('on');}

// ═══════════════════════════════════════════════════════════
// 2. 영웅 무공 훈장관 Canvas 600x380
// ═══════════════════════════════════════════════════════════
var meritHeroes=[
 {name:'단군',icon:'👑',merits:[{name:'천강공훈',val:95},{name:'건국대훈',val:100},{name:'통합공로',val:90},{name:'문화창시',val:88},{name:'외교수완',val:75}]},
 {name:'환웅',icon:'⚡',merits:[{name:'천강공훈',val:100},{name:'건국대훈',val:92},{name:'통합공로',val:85},{name:'문화창시',val:95},{name:'외교수완',val:70}]},
 {name:'치우',icon:'🔥',merits:[{name:'전투무훈',val:100},{name:'군사지휘',val:98},{name:'영토확장',val:95},{name:'병기혁신',val:90},{name:'용맹무쌍',val:100}]},
 {name:'해모수',icon:'☀️',merits:[{name:'천강공훈',val:88},{name:'건국대훈',val:85},{name:'통합공로',val:78},{name:'문화창시',val:72},{name:'외교수완',val:80}]},
 {name:'주몽',icon:'🏹',merits:[{name:'건국대훈',val:95},{name:'군사지휘',val:90},{name:'영토확장',val:88},{name:'통합공로',val:82},{name:'용맹무쌍',val:92}]},
 {name:'을지문덕',icon:'🛡️',merits:[{name:'전투무훈',val:98},{name:'군사지휘',val:100},{name:'방어공로',val:100},{name:'전략혁신',val:95},{name:'충절',val:100}]},
 {name:'연개소문',icon:'⚔️',merits:[{name:'군사지휘',val:95},{name:'영토확장',val:88},{name:'정치수완',val:90},{name:'방어공로',val:92},{name:'용맹무쌍',val:85}]},
 {name:'온조왕',icon:'🏰',merits:[{name:'건국대훈',val:90},{name:'통합공로',val:82},{name:'도시건설',val:88},{name:'외교수완',val:85},{name:'문화창시',val:78}]},
 {name:'박혁거세',icon:'✨',merits:[{name:'건국대훈',val:92},{name:'통합공로',val:88},{name:'문화창시',val:85},{name:'외교수완',val:82},{name:'성덕',val:90}]},
 {name:'광개토대왕',icon:'🗡️',merits:[{name:'영토확장',val:100},{name:'군사지휘',val:98},{name:'전투무훈',val:95},{name:'통합공로',val:92},{name:'문화창시',val:85}]}
];
var meritSel=0;

function renderMeritCanvas(){
 var c=document.getElementById('v27-merit-canvas');if(!c)return;
 var x=c.getContext('2d'),W=c.width,H=c.height;
 x.fillStyle='#0a0814';x.fillRect(0,0,W,H);
 x.font='bold 14px sans-serif';x.fillStyle='#cc7744';x.textAlign='center';
 x.fillText('영웅 무공 훈장관',W/2,24);

 var hero=meritHeroes[meritSel];
 x.font='bold 16px sans-serif';x.fillStyle='#FFD700';
 x.fillText(hero.icon+' '+hero.name,W/2,50);

 var cx=W/2,cy=180,R=100;
 var axes=hero.merits;
 var n=axes.length;
 for(var ring=1;ring<=4;ring++){
  x.beginPath();
  for(var j=0;j<=n;j++){
   var a=-Math.PI/2+(j%n)*(Math.PI*2/n);
   var rr=R*ring/4;
   if(j===0)x.moveTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr);
   else x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr);
  }
  x.strokeStyle='rgba(100,60,30,'+(ring===4?0.4:0.15)+')';x.lineWidth=1;x.stroke();
 }

 for(var j=0;j<n;j++){
  var a=-Math.PI/2+j*(Math.PI*2/n);
  x.beginPath();x.moveTo(cx,cy);
  x.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);
  x.strokeStyle='rgba(100,60,30,0.25)';x.lineWidth=1;x.stroke();
  x.font='10px sans-serif';x.fillStyle='#aa7744';x.textAlign='center';
  x.fillText(axes[j].name,cx+Math.cos(a)*(R+18),cy+Math.sin(a)*(R+18)+4);
 }

 x.beginPath();
 for(var j=0;j<=n;j++){
  var a=-Math.PI/2+(j%n)*(Math.PI*2/n);
  var rr=R*axes[j%n].val/100;
  if(j===0)x.moveTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr);
  else x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr);
 }
 x.fillStyle='rgba(204,119,68,0.25)';x.fill();
 x.strokeStyle='#cc7744';x.lineWidth=2;x.stroke();

 for(var j=0;j<n;j++){
  var a=-Math.PI/2+j*(Math.PI*2/n);
  var rr=R*axes[j].val/100;
  x.beginPath();x.arc(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr,4,0,Math.PI*2);
  x.fillStyle='#FFD700';x.fill();
 }

 var avg=0;axes.forEach(function(a){avg+=a.val;});avg/=n;
 var grade=avg>=95?'S':avg>=85?'A':avg>=75?'B':avg>=60?'C':'D';
 x.font='bold 12px sans-serif';x.fillStyle='#cc7744';x.textAlign='center';
 x.fillText('평균 무공: '+(avg).toFixed(1)+' / 100',W/2,H-50);
 x.font='bold 22px sans-serif';
 x.fillStyle=grade==='S'?'#FFD700':grade==='A'?'#44cc88':grade==='B'?'#4488cc':'#888';
 x.fillText(grade+'등급',W/2,H-22);

 var barY=H-90;
 x.font='9px sans-serif';
 axes.forEach(function(a,i){
  var bx=20,by=barY-(n-1-i)*0;
 });
}

function openMeritHall(){
 sfx27('merit_award');
 var p=document.getElementById('v27-merit-panel');
 if(!p){
  p=document.createElement('div');p.id='v27-merit-panel';p.className='v27-panel';
  p.innerHTML='<h2>🎖️ 영웅 무공 훈장관</h2><p class="v27-sub">10대 영웅 무공 5축 Radar — 훈장 등급 평가</p><div class="merit-wrap"><canvas id="v27-merit-canvas" width="600" height="380"></canvas><div class="merit-grid" id="v27-merit-grid"></div></div><button class="v27-close" onclick="closeMeritHall()">닫기</button>';
  document.body.appendChild(p);
  var grid=p.querySelector('#v27-merit-grid');
  meritHeroes.forEach(function(h,i){
   var c=document.createElement('div');c.className='mr-card'+(i===0?' awarded':'');
   c.innerHTML='<div class="mr-icon">'+h.icon+'</div><div class="mr-name">'+h.name+'</div>';
   c.onclick=function(){
    meritSel=i;sfx27('merit_promote');
    grid.querySelectorAll('.mr-card').forEach(function(cd,j){cd.className='mr-card'+(j===i?' awarded':'');});
    renderMeritCanvas();
   };grid.appendChild(c);
  });
 }
 p.classList.add('on');renderMeritCanvas();
 unlockAch27('merit_viewer','무공 감찰관');
}
function closeMeritHall(){var p=document.getElementById('v27-merit-panel');if(p)p.classList.remove('on');}

// ═══════════════════════════════════════════════════════════
// 3. 고대 법전 편찬소 Canvas 620x400
// ═══════════════════════════════════════════════════════════
var lawCodes=[
 {name:'팔조법금',era:'고조선',articles:8,desc:'살인·상해·절도 등 8개 조항, 현전 3조항',severity:70,justice:60,coverage:40,culture:80,enforce:65},
 {name:'부여 사출도',era:'부여',articles:4,desc:'사출도(4개 부족 행정구역)를 통한 통치법',severity:55,justice:65,coverage:50,culture:70,enforce:60},
 {name:'고구려 율령',era:'고구려',articles:20,desc:'소수림왕 때 제정, 중앙집권 강화 법령',severity:75,justice:70,coverage:70,culture:65,enforce:80},
 {name:'백제 법률',era:'백제',articles:15,desc:'근초고왕 시기 법률 정비, 관직 16등급',severity:60,justice:72,coverage:65,culture:75,enforce:70},
 {name:'신라 율령',era:'신라',articles:18,desc:'법흥왕 때 율령 반포, 골품제 법제화',severity:65,justice:55,coverage:75,culture:85,enforce:75},
 {name:'가야 관습법',era:'가야',articles:10,desc:'철기 생산·교역 관련 관습법 체계',severity:45,justice:60,coverage:35,culture:60,enforce:50},
 {name:'동예 책화',era:'동예',articles:5,desc:'타 부족 영역 침범 시 노예·소·말로 배상',severity:80,justice:50,coverage:30,culture:55,enforce:70},
 {name:'옥저 민며느리제',era:'옥저',articles:3,desc:'혼인 관련 관습법, 매매혼 규정',severity:40,justice:35,coverage:25,culture:50,enforce:55}
];
var lawSel=0;

function renderLawCanvas(){
 var c=document.getElementById('v27-law-canvas');if(!c)return;
 var x=c.getContext('2d'),W=c.width,H=c.height;
 x.fillStyle='#0a0814';x.fillRect(0,0,W,H);
 x.font='bold 14px sans-serif';x.fillStyle='#6666cc';x.textAlign='center';
 x.fillText('고대 법전 편찬소 — 법률 체계 비교',W/2,24);

 var law=lawCodes[lawSel];
 x.font='bold 16px sans-serif';x.fillStyle='#FFD700';
 x.fillText('📜 '+law.name+' ('+law.era+')',W/2,50);
 x.font='10px sans-serif';x.fillStyle='#8888aa';
 x.fillText(law.desc,W/2,68);

 var metrics=[
  {name:'엄격성',val:law.severity,color:'#cc4444'},
  {name:'공정성',val:law.justice,color:'#44cc88'},
  {name:'적용범위',val:law.coverage,color:'#4488cc'},
  {name:'문화반영',val:law.culture,color:'#ccaa44'},
  {name:'집행력',val:law.enforce,color:'#aa44cc'}
 ];

 var barW=420,barH=28,startX=100,startY=95;
 metrics.forEach(function(m,i){
  var by=startY+i*52;
  x.font='11px sans-serif';x.fillStyle='#8888aa';x.textAlign='right';
  x.fillText(m.name,startX-10,by+18);
  x.fillStyle='rgba(30,30,60,0.5)';
  x.fillRect(startX,by,barW,barH);
  var fillW=barW*m.val/100;
  var grad=x.createLinearGradient(startX,by,startX+fillW,by);
  grad.addColorStop(0,m.color+'88');grad.addColorStop(1,m.color);
  x.fillStyle=grad;x.fillRect(startX,by,fillW,barH);
  x.strokeStyle=m.color+'44';x.lineWidth=1;x.strokeRect(startX,by,barW,barH);
  x.font='bold 11px sans-serif';x.fillStyle='#fff';x.textAlign='left';
  x.fillText(m.val+'%',startX+fillW+8,by+18);
 });

 var avg=(law.severity+law.justice+law.coverage+law.culture+law.enforce)/5;
 var grade=avg>=75?'S':avg>=60?'A':avg>=45?'B':avg>=30?'C':'D';
 x.font='10px sans-serif';x.fillStyle='#8888aa';x.textAlign='center';
 x.fillText('조항 수: '+law.articles+'개 | 종합 법체계 점수: '+avg.toFixed(1),W/2,H-42);
 x.font='bold 22px sans-serif';
 x.fillStyle=grade==='S'?'#FFD700':grade==='A'?'#44cc88':grade==='B'?'#4488cc':'#888';
 x.fillText(grade,W/2,H-14);
}

function openLawCodex(){
 sfx27('law_enact');
 var p=document.getElementById('v27-law-panel');
 if(!p){
  p=document.createElement('div');p.id='v27-law-panel';p.className='v27-panel';
  p.innerHTML='<h2>📜 고대 법전 편찬소</h2><p class="v27-sub">8개 고대 법전 — 5축 법체계 분석</p><div class="law-wrap"><canvas id="v27-law-canvas" width="620" height="400"></canvas><div class="law-controls" id="v27-law-tabs"></div></div><button class="v27-close" onclick="closeLawCodex()">닫기</button>';
  document.body.appendChild(p);
  var tabs=p.querySelector('#v27-law-tabs');
  lawCodes.forEach(function(l,i){
   var b=document.createElement('button');b.className='law-btn'+(i===0?' active':'');
   b.textContent=l.name;b.onclick=function(){
    lawSel=i;sfx27('law_scroll');
    tabs.querySelectorAll('.law-btn').forEach(function(bt){bt.className='law-btn';});
    b.className='law-btn active';renderLawCanvas();
   };tabs.appendChild(b);
  });
 }
 p.classList.add('on');renderLawCanvas();
 unlockAch27('law_scholar','법학자');
}
function closeLawCodex(){var p=document.getElementById('v27-law-panel');if(p)p.classList.remove('on');}

// ═══════════════════════════════════════════════════════════
// 4. 전장 병종 상성도 Canvas 620x380
// ═══════════════════════════════════════════════════════════
var unitTypes=[
 {name:'보병',icon:'🗡️',strong:['궁병','공성병'],weak:['기병','기마궁'],stats:{atk:70,def:80,spd:50,rng:10,cost:30}},
 {name:'궁병',icon:'🏹',strong:['기병','척후병'],weak:['보병','기마궁'],stats:{atk:75,def:40,spd:45,rng:90,cost:40}},
 {name:'기병',icon:'🐎',strong:['보병','공성병'],weak:['궁병','창병'],stats:{atk:85,def:60,spd:95,rng:15,cost:70}},
 {name:'창병',icon:'🔱',strong:['기병','기마궁'],weak:['궁병','공성병'],stats:{atk:65,def:85,spd:40,rng:20,cost:35}},
 {name:'기마궁',icon:'🏇',strong:['궁병','보병'],weak:['창병','척후병'],stats:{atk:80,def:50,spd:90,rng:80,cost:80}},
 {name:'공성병',icon:'⚙️',strong:['보병','창병'],weak:['기병','척후병'],stats:{atk:95,def:30,spd:15,rng:95,cost:90}},
 {name:'척후병',icon:'👁️',strong:['공성병','기마궁'],weak:['보병','기병'],stats:{atk:55,def:45,spd:100,rng:60,cost:45}},
 {name:'승병',icon:'☸️',strong:['보병','척후병'],weak:['기병','궁병'],stats:{atk:72,def:75,spd:55,rng:15,cost:50}}
];
var counterSel=0;

function renderCounterCanvas(){
 var c=document.getElementById('v27-counter-canvas');if(!c)return;
 var x=c.getContext('2d'),W=c.width,H=c.height;
 x.fillStyle='#0a0814';x.fillRect(0,0,W,H);
 x.font='bold 14px sans-serif';x.fillStyle='#cc4444';x.textAlign='center';
 x.fillText('전장 병종 상성도',W/2,24);

 var n=unitTypes.length;
 var cx=220,cy=195,R=130;

 for(var i=0;i<n;i++){
  var a=-Math.PI/2+i*(Math.PI*2/n);
  var ux=cx+Math.cos(a)*R,uy=cy+Math.sin(a)*R;
  var isSel=(i===counterSel);

  x.beginPath();x.arc(ux,uy,isSel?28:22,0,Math.PI*2);
  x.fillStyle=isSel?'rgba(204,68,68,0.3)':'rgba(40,20,20,0.6)';
  x.fill();x.strokeStyle=isSel?'#FFD700':'#5a2a2a';x.lineWidth=isSel?2:1;x.stroke();

  x.font=isSel?'18px sans-serif':'14px sans-serif';x.textAlign='center';
  x.fillStyle='#fff';x.fillText(unitTypes[i].icon,ux,uy+4);
  x.font='9px sans-serif';x.fillStyle=isSel?'#FFD700':'#aa6666';
  x.fillText(unitTypes[i].name,ux,uy+(isSel?38:30));
 }

 var sel=unitTypes[counterSel];
 sel.strong.forEach(function(sName){
  var ti=unitTypes.findIndex(function(u){return u.name===sName;});
  if(ti<0)return;
  var a1=-Math.PI/2+counterSel*(Math.PI*2/n),a2=-Math.PI/2+ti*(Math.PI*2/n);
  var x1=cx+Math.cos(a1)*R,y1=cy+Math.sin(a1)*R;
  var x2=cx+Math.cos(a2)*R,y2=cy+Math.sin(a2)*R;
  x.beginPath();x.moveTo(x1,y1);x.lineTo(x2,y2);
  x.strokeStyle='rgba(68,204,68,0.5)';x.lineWidth=2;
  x.setLineDash([5,3]);x.stroke();x.setLineDash([]);
  var mx=(x1+x2)/2,my=(y1+y2)/2;
  x.font='8px sans-serif';x.fillStyle='#44cc44';x.textAlign='center';
  x.fillText('▶ 강함',mx,my-4);
 });

 sel.weak.forEach(function(wName){
  var ti=unitTypes.findIndex(function(u){return u.name===wName;});
  if(ti<0)return;
  var a1=-Math.PI/2+counterSel*(Math.PI*2/n),a2=-Math.PI/2+ti*(Math.PI*2/n);
  var x1=cx+Math.cos(a1)*R,y1=cy+Math.sin(a1)*R;
  var x2=cx+Math.cos(a2)*R,y2=cy+Math.sin(a2)*R;
  x.beginPath();x.moveTo(x1,y1);x.lineTo(x2,y2);
  x.strokeStyle='rgba(204,68,68,0.5)';x.lineWidth=2;
  x.setLineDash([5,3]);x.stroke();x.setLineDash([]);
  var mx=(x1+x2)/2,my=(y1+y2)/2;
  x.font='8px sans-serif';x.fillStyle='#cc4444';x.textAlign='center';
  x.fillText('◀ 약함',mx,my-4);
 });

 var statX=460,statY=60;
 var st=sel.stats,sn=['공격','방어','속도','사거리','비용'];
 var sv=[st.atk,st.def,st.spd,st.rng,st.cost];
 x.font='bold 12px sans-serif';x.fillStyle='#FFD700';x.textAlign='left';
 x.fillText(sel.icon+' '+sel.name+' 스탯',statX,statY);
 sn.forEach(function(n,i){
  var by=statY+18+i*32;
  x.font='9px sans-serif';x.fillStyle='#aa6666';x.textAlign='left';
  x.fillText(n,statX,by);
  var bw=120,bh=14;
  x.fillStyle='rgba(40,20,20,0.5)';x.fillRect(statX,by+4,bw,bh);
  var fw=bw*sv[i]/100;
  x.fillStyle=sv[i]>=80?'#cc4444':sv[i]>=50?'#ccaa44':'#666';
  x.fillRect(statX,by+4,fw,bh);
  x.font='bold 9px sans-serif';x.fillStyle='#fff';
  x.fillText(sv[i],statX+fw+4,by+15);
 });

 x.font='9px sans-serif';x.fillStyle='#886666';x.textAlign='center';
 x.fillText('강함 ▶ '+sel.strong.join(', ')+' | 약함 ◀ '+sel.weak.join(', '),W/2,H-14);
}

function openCounterChart(){
 sfx27('counter_strike');
 var p=document.getElementById('v27-counter-panel');
 if(!p){
  p=document.createElement('div');p.id='v27-counter-panel';p.className='v27-panel';
  p.innerHTML='<h2>⚔️ 전장 병종 상성도</h2><p class="v27-sub">8병종 상성 관계 + 스탯 비교</p><div class="counter-wrap"><canvas id="v27-counter-canvas" width="620" height="380"></canvas><div class="ctr-tabs" id="v27-counter-tabs"></div></div><button class="v27-close" onclick="closeCounterChart()">닫기</button>';
  document.body.appendChild(p);
  var tabs=p.querySelector('#v27-counter-tabs');
  unitTypes.forEach(function(u,i){
   var b=document.createElement('button');b.className='ctr-btn'+(i===0?' active':'');
   b.textContent=u.icon+u.name;b.onclick=function(){
    counterSel=i;sfx27('counter_defend');
    tabs.querySelectorAll('.ctr-btn').forEach(function(bt,j){bt.className='ctr-btn'+(j===i?' active':'');});
    renderCounterCanvas();
   };tabs.appendChild(b);
  });
 }
 p.classList.add('on');renderCounterCanvas();
 unlockAch27('counter_strategist','상성 전략가');
}
function closeCounterChart(){var p=document.getElementById('v27-counter-panel');if(p)p.classList.remove('on');}

// ═══════════════════════════════════════════════════════════
// 5. 고대 농경 달력 Canvas 600x380
// ═══════════════════════════════════════════════════════════
var farmMonths=[
 {month:'1월(정월)',task:'농기구 수리, 종자 선별',crop:'없음',activity:20,fertility:30,rain:25},
 {month:'2월(중춘)',task:'밭갈기, 씨뿌리기 준비',crop:'보리파종',activity:45,fertility:40,rain:35},
 {month:'3월(계춘)',task:'벼 파종, 논갈이',crop:'벼/조/기장',activity:75,fertility:55,rain:50},
 {month:'4월(초여름)',task:'모내기, 잡초 제거',crop:'벼/콩/팥',activity:90,fertility:65,rain:60},
 {month:'5월(중하)',task:'논 물관리, 해충방제',crop:'벼 생장기',activity:85,fertility:75,rain:70},
 {month:'6월(계하)',task:'보리 수확, 풀베기',crop:'보리수확',activity:95,fertility:80,rain:80},
 {month:'7월(초가을)',task:'벼 이삭패기, 관개',crop:'벼 출수기',activity:80,fertility:85,rain:75},
 {month:'8월(중추)',task:'벼 수확, 탈곡',crop:'벼/조/수수',activity:100,fertility:90,rain:50},
 {month:'9월(계추)',task:'가을갈이, 겨울작물',crop:'무/배추',activity:70,fertility:70,rain:40},
 {month:'10월(상동)',task:'가을걷이 마무리, 저장',crop:'콩/팥수확',activity:55,fertility:50,rain:30},
 {month:'11월(중동)',task:'농한기, 짚공예',crop:'없음',activity:25,fertility:35,rain:20},
 {month:'12월(계동)',task:'제천행사, 다음해 계획',crop:'없음',activity:15,fertility:25,rain:15}
];

function renderFarmCanvas(){
 var c=document.getElementById('v27-farm-canvas');if(!c)return;
 var x=c.getContext('2d'),W=c.width,H=c.height;
 x.fillStyle='#0a0814';x.fillRect(0,0,W,H);
 x.font='bold 14px sans-serif';x.fillStyle='#66aa44';x.textAlign='center';
 x.fillText('고대 농경 달력 — 월별 농사 활동',W/2,24);

 var chartX=60,chartY=50,chartW=W-100,chartH=220;
 x.strokeStyle='rgba(50,80,30,0.3)';x.lineWidth=1;
 for(var i=0;i<=4;i++){
  var yy=chartY+chartH-i*(chartH/4);
  x.beginPath();x.moveTo(chartX,yy);x.lineTo(chartX+chartW,yy);x.stroke();
  x.font='8px sans-serif';x.fillStyle='#556644';x.textAlign='right';
  x.fillText((i*25)+'%',chartX-4,yy+3);
 }

 var bw=chartW/12-4;
 var colors={activity:'#66aa44',fertility:'#aa8844',rain:'#4488cc'};
 var legends=[{key:'activity',label:'농사활동'},{key:'fertility',label:'토양비옥도'},{key:'rain',label:'강수량'}];

 farmMonths.forEach(function(m,i){
  var bx=chartX+i*(chartW/12)+2;
  var vals=[
   {v:m.activity,c:colors.activity},
   {v:m.fertility,c:colors.fertility},
   {v:m.rain,c:colors.rain}
  ];
  var subW=bw/3;
  vals.forEach(function(vd,j){
   var bh=chartH*vd.v/100;
   var by=chartY+chartH-bh;
   x.fillStyle=vd.c+'88';x.fillRect(bx+j*subW,by,subW-1,bh);
   x.fillStyle=vd.c;x.fillRect(bx+j*subW,by,subW-1,3);
  });
  x.font='8px sans-serif';x.fillStyle='#88aa66';x.textAlign='center';
  x.save();x.translate(bx+bw/2,chartY+chartH+12);x.rotate(-0.3);
  x.fillText(m.month.substring(0,3),0,0);x.restore();
 });

 var ly=chartY+chartH+30;
 x.font='9px sans-serif';x.textAlign='left';
 legends.forEach(function(l,i){
  var lx=chartX+i*120;
  x.fillStyle=colors[l.key];x.fillRect(lx,ly,10,10);
  x.fillStyle='#88aa66';x.fillText(l.label,lx+14,ly+9);
 });

 x.font='10px sans-serif';x.fillStyle='#556644';x.textAlign='center';
 x.fillText('🌾 고조선 농경사회: 벼·조·기장·콩·보리 5곡 중심',W/2,H-40);

 var peakMonth=farmMonths.reduce(function(a,b){return a.activity>b.activity?a:b;});
 x.fillStyle='#88aa66';
 x.fillText('최대 활동월: '+peakMonth.month+' ('+peakMonth.task+')',W/2,H-22);
}

function openFarmCalendar(){
 sfx27('farm_plant');
 var p=document.getElementById('v27-farm-panel');
 if(!p){
  p=document.createElement('div');p.id='v27-farm-panel';p.className='v27-panel';
  p.innerHTML='<h2>🌾 고대 농경 달력</h2><p class="v27-sub">12월 농사활동 + 토양비옥도 + 강수량</p><div class="farm-wrap"><canvas id="v27-farm-canvas" width="600" height="380"></canvas></div><button class="v27-close" onclick="closeFarmCalendar()">닫기</button>';
  document.body.appendChild(p);
 }
 p.classList.add('on');renderFarmCanvas();
 unlockAch27('farm_planner','농경 달력 관리자');
}
function closeFarmCalendar(){var p=document.getElementById('v27-farm-panel');if(p)p.classList.remove('on');}

// ═══════════════════════════════════════════════════════════
// 6. 왕실 도서관 Canvas 620x400
// ═══════════════════════════════════════════════════════════
var libraryScrolls=[
 {name:'천부경',icon:'📖',category:'경전',era:'환국/고조선',pages:81,wisdom:95,rarity:100,desc:'하늘·땅·사람의 이치를 담은 81자 경전'},
 {name:'삼일신고',icon:'📜',category:'경전',era:'고조선',pages:366,wisdom:90,rarity:95,desc:'환웅이 전한 하늘의 가르침'},
 {name:'참전계경',icon:'🗞️',category:'윤리',era:'고조선',pages:366,wisdom:85,rarity:88,desc:'8조 윤리강령, 세상을 다스리는 가르침'},
 {name:'단군세기',icon:'📚',category:'역사',era:'고조선',pages:1000,wisdom:80,rarity:92,desc:'47대 단군의 역사 기록'},
 {name:'환단고기',icon:'📕',category:'역사',era:'고대',pages:2000,wisdom:88,rarity:98,desc:'환국-배달-고조선 역사 총서'},
 {name:'부도지',icon:'📗',category:'우주론',era:'신라',pages:500,wisdom:92,rarity:90,desc:'마고성 창세 신화, 우주 기원론'},
 {name:'징심록',icon:'📘',category:'수양',era:'고조선',pages:200,wisdom:78,rarity:75,desc:'마음 다스리기, 수행 지침서'},
 {name:'삼성기',icon:'📙',category:'역사',era:'고대',pages:800,wisdom:82,rarity:85,desc:'환인-환웅-단군 삼성의 기록'},
 {name:'조대기',icon:'📒',category:'역사',era:'고구려',pages:600,wisdom:75,rarity:80,desc:'고구려 건국 이전의 고대사 기록'},
 {name:'규원사화',icon:'📓',category:'역사',era:'조선',pages:400,wisdom:72,rarity:70,desc:'북애자가 편찬한 단군 이전 역사서'}
];
var libSel=0;

function renderLibraryCanvas(){
 var c=document.getElementById('v27-lib-canvas');if(!c)return;
 var x=c.getContext('2d'),W=c.width,H=c.height;
 x.fillStyle='#0a0814';x.fillRect(0,0,W,H);
 x.font='bold 14px sans-serif';x.fillStyle='#8866cc';x.textAlign='center';
 x.fillText('왕실 도서관 — 고대 문헌 컬렉션',W/2,24);

 var scroll=libraryScrolls[libSel];
 x.font='bold 16px sans-serif';x.fillStyle='#FFD700';
 x.fillText(scroll.icon+' '+scroll.name,W/2,52);
 x.font='10px sans-serif';x.fillStyle='#8877aa';
 x.fillText(scroll.category+' | '+scroll.era+' | '+scroll.pages+'쪽',W/2,70);
 x.fillText(scroll.desc,W/2,86);

 var metrics=[
  {name:'지혜 가치',val:scroll.wisdom,color:'#8866cc'},
  {name:'희귀도',val:scroll.rarity,color:'#cc6688'},
  {name:'분량(상대)',val:Math.min(scroll.pages/20,100),color:'#6688cc'}
 ];

 var barW=440,barH=32,startX=100,startY=110;
 metrics.forEach(function(m,i){
  var by=startY+i*55;
  x.font='11px sans-serif';x.fillStyle='#8877aa';x.textAlign='right';
  x.fillText(m.name,startX-10,by+20);
  x.fillStyle='rgba(30,20,40,0.5)';
  x.fillRect(startX,by,barW,barH);
  var fillW=barW*m.val/100;
  var grad=x.createLinearGradient(startX,by,startX+fillW,by);
  grad.addColorStop(0,m.color+'66');grad.addColorStop(1,m.color);
  x.fillStyle=grad;x.fillRect(startX,by,fillW,barH);
  x.strokeStyle=m.color+'44';x.lineWidth=1;x.strokeRect(startX,by,barW,barH);
  x.font='bold 11px sans-serif';x.fillStyle='#fff';x.textAlign='left';
  x.fillText(m.val>=100?'MAX':m.val.toFixed(0)+'%',startX+fillW+8,by+20);
 });

 var shelfY=290;
 x.font='10px sans-serif';x.fillStyle='#6655aa';x.textAlign='center';
 x.fillText('— 서가 전경 —',W/2,shelfY);
 var shelfW=50;
 libraryScrolls.forEach(function(s,i){
  var sx=30+i*(shelfW+6),sy=shelfY+10;
  var isSel=(i===libSel);
  x.fillStyle=isSel?'rgba(136,102,204,0.3)':'rgba(20,16,30,0.6)';
  x.fillRect(sx,sy,shelfW,65);
  x.strokeStyle=isSel?'#FFD700':'#3a2a4a';x.lineWidth=isSel?2:1;
  x.strokeRect(sx,sy,shelfW,65);
  x.font='18px sans-serif';x.fillStyle='#fff';x.textAlign='center';
  x.fillText(s.icon,sx+shelfW/2,sy+28);
  x.font='8px sans-serif';x.fillStyle=isSel?'#FFD700':'#6655aa';
  x.fillText(s.name.substring(0,4),sx+shelfW/2,sy+48);
  var stars=s.rarity>=95?'★★★':s.rarity>=80?'★★':'★';
  x.fillStyle='#FFD700';x.font='7px sans-serif';
  x.fillText(stars,sx+shelfW/2,sy+60);
 });
}

function openRoyalLibrary(){
 sfx27('library_open');
 var p=document.getElementById('v27-lib-panel');
 if(!p){
  p=document.createElement('div');p.id='v27-lib-panel';p.className='v27-panel';
  p.innerHTML='<h2>📚 왕실 도서관</h2><p class="v27-sub">10대 고대 문헌 — 지혜·희귀도·분량 분석</p><div class="library-wrap"><canvas id="v27-lib-canvas" width="620" height="400"></canvas><div class="lib-grid" id="v27-lib-grid"></div></div><button class="v27-close" onclick="closeRoyalLibrary()">닫기</button>';
  document.body.appendChild(p);
  var grid=p.querySelector('#v27-lib-grid');
  libraryScrolls.forEach(function(s,i){
   var c=document.createElement('div');c.className='lb-card'+(i===0?' read':'');
   c.innerHTML='<div class="lb-icon">'+s.icon+'</div><div class="lb-name">'+s.name+'</div>';
   c.onclick=function(){
    libSel=i;sfx27('library_learn');
    grid.querySelectorAll('.lb-card').forEach(function(cd,j){cd.className='lb-card'+(j===i?' read':'');});
    renderLibraryCanvas();
   };grid.appendChild(c);
  });
 }
 p.classList.add('on');renderLibraryCanvas();
 unlockAch27('library_reader','왕실 사서');
}
function closeRoyalLibrary(){var p=document.getElementById('v27-lib-panel');if(p)p.classList.remove('on');}

// ═══════════════════════════════════════════════════════════
// 7. 고대 의술 약전 Canvas 600x380
// ═══════════════════════════════════════════════════════════
var medicines=[
 {name:'인삼',icon:'🌿',type:'보약',effect:'기력 회복',potency:95,gather:60,rarity:85,desc:'산삼 채취, 원기 보충의 최고약'},
 {name:'쑥(艾)',icon:'🍃',type:'해열',effect:'열병 치료',potency:70,gather:90,rarity:30,desc:'단군신화의 쑥, 해열·소독 만능약'},
 {name:'당귀',icon:'🌱',type:'보혈',effect:'혈액 순환',potency:80,gather:55,rarity:65,desc:'귀향의 뜻, 혈허증에 사용'},
 {name:'감초',icon:'🫚',type:'해독',effect:'독 해소',potency:65,gather:80,rarity:40,desc:'약방의 감초, 모든 약의 조화제'},
 {name:'녹용',icon:'🦌',type:'강장',effect:'뼈 강화',potency:90,gather:25,rarity:90,desc:'사슴뿔의 녹용, 관절·뼈 강화'},
 {name:'침술',icon:'📍',type:'경락',effect:'기 흐름 회복',potency:85,gather:70,rarity:50,desc:'경혈 자극으로 기혈 소통'},
 {name:'부항',icon:'🏺',type:'사혈',effect:'어혈 제거',potency:60,gather:85,rarity:25,desc:'항아리를 이용한 부항 치료'},
 {name:'온천욕',icon:'♨️',type:'치유',effect:'피로 회복',potency:75,gather:40,rarity:55,desc:'광천수 온천, 피부·근골격 치유'},
 {name:'꿀(蜜)',icon:'🍯',type:'외상',effect:'상처 치유',potency:55,gather:50,rarity:45,desc:'천연 항생 물질, 상처 소독'},
 {name:'웅담',icon:'🐻',type:'강심',effect:'심장 강화',potency:88,gather:15,rarity:95,desc:'곰의 쓸개, 해독·강심 효과'}
];
var medSel=0;

function renderMedCanvas(){
 var c=document.getElementById('v27-med-canvas');if(!c)return;
 var x=c.getContext('2d'),W=c.width,H=c.height;
 x.fillStyle='#0a0814';x.fillRect(0,0,W,H);
 x.font='bold 14px sans-serif';x.fillStyle='#44aa66';x.textAlign='center';
 x.fillText('고대 의술 약전',W/2,24);

 var med=medicines[medSel];
 x.font='bold 16px sans-serif';x.fillStyle='#FFD700';
 x.fillText(med.icon+' '+med.name+' ('+med.type+')',W/2,52);
 x.font='10px sans-serif';x.fillStyle='#669977';
 x.fillText(med.desc,W/2,70);

 var cx=W/2,cy=190,R=90;
 var axes=[
  {name:'약효',val:med.potency},
  {name:'채취용이',val:med.gather},
  {name:'희귀도',val:med.rarity}
 ];
 var n=axes.length;

 for(var ring=1;ring<=4;ring++){
  x.beginPath();
  for(var j=0;j<=n;j++){
   var a=-Math.PI/2+(j%n)*(Math.PI*2/n);
   var rr=R*ring/4;
   if(j===0)x.moveTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr);
   else x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr);
  }
  x.strokeStyle='rgba(30,80,50,'+(ring===4?0.4:0.15)+')';x.lineWidth=1;x.stroke();
 }

 for(var j=0;j<n;j++){
  var a=-Math.PI/2+j*(Math.PI*2/n);
  x.beginPath();x.moveTo(cx,cy);
  x.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);
  x.strokeStyle='rgba(30,80,50,0.25)';x.lineWidth=1;x.stroke();
  x.font='10px sans-serif';x.fillStyle='#44aa66';x.textAlign='center';
  x.fillText(axes[j].name+' ('+axes[j].val+')',cx+Math.cos(a)*(R+22),cy+Math.sin(a)*(R+22)+4);
 }

 x.beginPath();
 for(var j=0;j<=n;j++){
  var a=-Math.PI/2+(j%n)*(Math.PI*2/n);
  var rr=R*axes[j%n].val/100;
  if(j===0)x.moveTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr);
  else x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr);
 }
 x.fillStyle='rgba(68,170,102,0.25)';x.fill();
 x.strokeStyle='#44aa66';x.lineWidth=2;x.stroke();

 for(var j=0;j<n;j++){
  var a=-Math.PI/2+j*(Math.PI*2/n);
  var rr=R*axes[j].val/100;
  x.beginPath();x.arc(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr,4,0,Math.PI*2);
  x.fillStyle='#FFD700';x.fill();
 }

 x.font='11px sans-serif';x.fillStyle='#669977';x.textAlign='center';
 x.fillText('효능: '+med.effect+' | 유형: '+med.type,W/2,H-40);
 var avg=(med.potency+med.gather+med.rarity)/3;
 var grade=avg>=80?'S':avg>=60?'A':avg>=45?'B':'C';
 x.font='bold 20px sans-serif';
 x.fillStyle=grade==='S'?'#FFD700':grade==='A'?'#44cc88':'#4488cc';
 x.fillText(grade+'등급 약재',W/2,H-16);
}

function openMedicinePharma(){
 sfx27('med_brew');
 var p=document.getElementById('v27-med-panel');
 if(!p){
  p=document.createElement('div');p.id='v27-med-panel';p.className='v27-panel';
  p.innerHTML='<h2>🏥 고대 의술 약전</h2><p class="v27-sub">10종 약재/치료법 — 약효·채취·희귀도 3축 Radar</p><div class="med-wrap"><canvas id="v27-med-canvas" width="600" height="380"></canvas><div class="med-grid" id="v27-med-grid"></div></div><button class="v27-close" onclick="closeMedicinePharma()">닫기</button>';
  document.body.appendChild(p);
  var grid=p.querySelector('#v27-med-grid');
  medicines.forEach(function(m,i){
   var c=document.createElement('div');c.className='md-card'+(i===0?' discovered':'');
   c.innerHTML='<div class="md-icon">'+m.icon+'</div><div class="md-name">'+m.name+'</div>';
   c.onclick=function(){
    medSel=i;sfx27('med_cure');
    grid.querySelectorAll('.md-card').forEach(function(cd,j){cd.className='md-card'+(j===i?' discovered':'');});
    renderMedCanvas();
   };grid.appendChild(c);
  });
 }
 p.classList.add('on');renderMedCanvas();
 unlockAch27('med_herbalist','약초학자');
}
function closeMedicinePharma(){var p=document.getElementById('v27-med-panel');if(p)p.classList.remove('on');}

// ═══════════════════════════════════════════════════════════
// 8. 영웅 우정 유대망 Canvas 640x400
// ═══════════════════════════════════════════════════════════
var bondHeroes=[
 {name:'단군',icon:'👑',x:0.5,y:0.15},
 {name:'환웅',icon:'⚡',x:0.25,y:0.25},
 {name:'치우',icon:'🔥',x:0.75,y:0.25},
 {name:'해모수',icon:'☀️',x:0.15,y:0.5},
 {name:'주몽',icon:'🏹',x:0.85,y:0.5},
 {name:'을지문덕',icon:'🛡️',x:0.3,y:0.7},
 {name:'연개소문',icon:'⚔️',x:0.7,y:0.7},
 {name:'온조왕',icon:'🏰',x:0.45,y:0.85},
 {name:'박혁거세',icon:'✨',x:0.6,y:0.55},
 {name:'광개토대왕',icon:'🗡️',x:0.5,y:0.42}
];
var bonds=[
 {a:0,b:1,type:'부자',strength:100,desc:'환웅의 아들 단군'},
 {a:0,b:3,type:'계승',strength:70,desc:'단군 이후 해모수 계승'},
 {a:1,b:2,type:'라이벌',strength:85,desc:'환웅과 치우의 탁록 대전'},
 {a:3,b:4,type:'부자',strength:95,desc:'해모수의 아들 주몽'},
 {a:4,b:7,type:'형제',strength:80,desc:'주몽의 아들 온조'},
 {a:4,b:6,type:'계승',strength:65,desc:'고구려 계승 라인'},
 {a:5,b:6,type:'동료',strength:75,desc:'고구려의 양대 명장'},
 {a:5,b:9,type:'계승',strength:60,desc:'고구려 무장 계보'},
 {a:6,b:9,type:'선후배',strength:72,desc:'고구려 정복왕 계보'},
 {a:7,b:8,type:'라이벌',strength:55,desc:'백제-신라 건국 경쟁'},
 {a:8,b:9,type:'동맹',strength:50,desc:'삼국시대 외교관계'},
 {a:0,b:9,type:'정신계승',strength:88,desc:'건국의 정신 계승'}
];
var bondSel=0;

function renderBondCanvas(){
 var c=document.getElementById('v27-bond-canvas');if(!c)return;
 var x=c.getContext('2d'),W=c.width,H=c.height;
 x.fillStyle='#0a0814';x.fillRect(0,0,W,H);
 x.font='bold 14px sans-serif';x.fillStyle='#cc44aa';x.textAlign='center';
 x.fillText('영웅 우정 유대망 — 관계 네트워크',W/2,24);

 var colors={
  '부자':'#FFD700','계승':'#44cccc','라이벌':'#cc4444',
  '형제':'#44cc44','동료':'#4488cc','선후배':'#aa88cc',
  '동맹':'#88cc44','정신계승':'#cc88cc'
 };

 bonds.forEach(function(b,i){
  var ha=bondHeroes[b.a],hb=bondHeroes[b.b];
  var ax=40+ha.x*(W-80),ay=40+ha.y*(H-80);
  var bx=40+hb.x*(W-80),by=40+hb.y*(H-80);
  var isSel=(bondSel===i);
  x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);
  x.strokeStyle=(colors[b.type]||'#888')+(isSel?'':'66');
  x.lineWidth=isSel?3:1+b.strength/50;
  x.stroke();

  if(isSel){
   var mx=(ax+bx)/2,my=(ay+by)/2;
   x.font='9px sans-serif';x.fillStyle=colors[b.type]||'#888';x.textAlign='center';
   x.fillText(b.type+' ('+b.strength+'%)',mx,my-8);
   x.fillStyle='#aaa';x.fillText(b.desc,mx,my+6);
  }
 });

 bondHeroes.forEach(function(h,i){
  var hx=40+h.x*(W-80),hy=40+h.y*(H-80);
  var isConn=bonds.some(function(b,bi){return bi===bondSel&&(b.a===i||b.b===i);});

  x.beginPath();x.arc(hx,hy,isConn?24:18,0,Math.PI*2);
  x.fillStyle=isConn?'rgba(204,68,170,0.3)':'rgba(30,15,25,0.6)';
  x.fill();x.strokeStyle=isConn?'#FFD700':'#4a1a3a';x.lineWidth=isConn?2:1;x.stroke();

  x.font=isConn?'16px sans-serif':'13px sans-serif';x.textAlign='center';
  x.fillStyle='#fff';x.fillText(h.icon,hx,hy+4);
  x.font='9px sans-serif';x.fillStyle=isConn?'#FFD700':'#aa4488';
  x.fillText(h.name,hx,hy+(isConn?32:24));
 });

 x.font='9px sans-serif';x.fillStyle='#884466';x.textAlign='center';
 var sel=bonds[bondSel];
 x.fillText('선택: '+bondHeroes[sel.a].name+' ↔ '+bondHeroes[sel.b].name+' ('+sel.type+', 유대강도 '+sel.strength+'%)',W/2,H-10);
}

function openBondNetwork(){
 sfx27('bond_form');
 var p=document.getElementById('v27-bond-panel');
 if(!p){
  p=document.createElement('div');p.id='v27-bond-panel';p.className='v27-panel';
  p.innerHTML='<h2>💞 영웅 우정 유대망</h2><p class="v27-sub">10영웅 12관계 — 유대 네트워크 그래프</p><div class="bond-wrap"><canvas id="v27-bond-canvas" width="640" height="400"></canvas><div class="bond-tabs" id="v27-bond-tabs"></div></div><button class="v27-close" onclick="closeBondNetwork()">닫기</button>';
  document.body.appendChild(p);
  var tabs=p.querySelector('#v27-bond-tabs');
  bonds.forEach(function(b,i){
   var btn=document.createElement('button');btn.className='bd-btn'+(i===0?' active':'');
   btn.textContent=bondHeroes[b.a].name+'↔'+bondHeroes[b.b].name;
   btn.onclick=function(){
    bondSel=i;sfx27('bond_strengthen');
    tabs.querySelectorAll('.bd-btn').forEach(function(bt,j){bt.className='bd-btn'+(j===i?' active':'');});
    renderBondCanvas();
   };tabs.appendChild(btn);
  });
 }
 p.classList.add('on');renderBondCanvas();
 unlockAch27('bond_connector','인연의 끈');
}
function closeBondNetwork(){var p=document.getElementById('v27-bond-panel');if(p)p.classList.remove('on');}

// ═══════════════════════════════════════════════════════════
// 퀴즈 v27 — 15문항 (285→300)
// ═══════════════════════════════════════════════════════════
var quiz27=[
 {q:'고조선의 천문 관측 기록에서 중심이 되는 별자리 체계는?',a:['이십팔수','십이지','칠정산','오행성'],c:0},
 {q:'팔조법금에서 현재까지 전해지는 조항 수는?',a:['3조항','5조항','8조항','2조항'],c:0},
 {q:'에이지오브엠파이어에서 영감을 받은 병종 상성에서 창병이 강한 상대는?',a:['기병','보병','궁병','공성병'],c:0},
 {q:'고대 한국 농경에서 가장 활동이 활발한 달은?',a:['8월(추수기)','4월(모내기)','6월(보리수확)','10월(가을걷이)'],c:0},
 {q:'천부경의 전체 글자 수는?',a:['81자','108자','64자','100자'],c:0},
 {q:'단군신화에서 웅녀가 동굴에서 먹은 약재는?',a:['쑥과 마늘','인삼과 녹용','당귀와 감초','쑥과 인삼'],c:0},
 {q:'환웅과 단군의 관계는?',a:['부자','형제','스승제자','군신'],c:0},
 {q:'고구려의 양대 명장으로 꼽히는 인물은?',a:['을지문덕과 연개소문','주몽과 대무신왕','광개토와 장수왕','명림답부와 을파소'],c:0},
 {q:'문명 게임처럼 기술 연구 트리가 있다면, 고조선의 핵심 기술은?',a:['청동제련','증기기관','화약','나침반'],c:0},
 {q:'삼족오는 어떤 천체와 관련된 신화적 상징인가?',a:['태양','달','북극성','혜성'],c:0},
 {q:'고대 한국에서 전염병 방역에 사용된 주요 약재는?',a:['쑥(쑥뜸)','녹용','웅담','꿀'],c:0},
 {q:'영걸전 스타일 RPG에서 진형 전투의 핵심 개념은?',a:['병종 상성과 지형 활용','단순 공격력 비교','레벨 차이','장비 등급'],c:0},
 {q:'고조선 건국 연도(기원전)로 전해지는 것은?',a:['기원전 2333년','기원전 1000년','기원전 3000년','기원전 500년'],c:0},
 {q:'SimCity에서 영감을 받은 도시 관리 요소 중 고대 한국에 해당하는 것은?',a:['성곽 방어와 시장 교역','고속도로 건설','원자력 발전','공항 운영'],c:0},
 {q:'환단고기에 기록된 고대 국가의 순서는?',a:['환국→배달→고조선','고조선→배달→환국','배달→환국→고조선','환국→고조선→배달'],c:0}
];
var quiz27State={idx:0,score:0,done:false,answers:[]};

function renderQuiz27(){
 var c=document.getElementById('v27-quiz-content');if(!c)return;
 if(quiz27State.done){
  var pct=Math.round(quiz27State.score/quiz27.length*100);
  var grade=pct>=90?'S':pct>=70?'A':pct>=50?'B':pct>=30?'C':'D';
  c.innerHTML='<div style="text-align:center;padding:30px 0"><p style="font-size:22px;color:#FFD700;font-weight:bold">퀴즈 v27 완료!</p><p style="font-size:16px;color:#c4956a;margin:12px 0">'+quiz27State.score+'/'+quiz27.length+' ('+pct+'%) — '+grade+'등급</p><button class="v27-close" onclick="quiz27State={idx:0,score:0,done:false,answers:[]};renderQuiz27();" style="margin:16px auto">다시 풀기</button></div>';
  if(pct>=90)unlockAch27('quiz_v27_s','퀴즈v27 S등급');
  if(pct>=70)unlockAch27('quiz_v27_master','퀴즈v27 마스터');
  return;
 }
 var q=quiz27[quiz27State.idx];
 var html='<p style="color:#8a7a6a;font-size:11px;margin-bottom:8px">Q'+(quiz27State.idx+1)+'/'+quiz27.length+' (현재 '+quiz27State.score+'점)</p>';
 html+='<p style="color:#e8dcc8;font-size:14px;font-weight:bold;margin-bottom:16px;line-height:1.6">'+q.q+'</p>';
 q.a.forEach(function(a,i){
  html+='<button onclick="answerQuiz27('+i+')" style="display:block;width:100%;max-width:400px;margin:6px auto;padding:10px 16px;border:1px solid #3a3a4a;border-radius:8px;background:rgba(26,20,40,.8);color:#c4956a;font-size:12px;cursor:pointer;font-family:inherit;text-align:left">'+String.fromCharCode(9312+i)+' '+a+'</button>';
 });
 c.innerHTML=html;
}

function openQuiz27(){
 sfx27('nav_v27');
 var p=document.getElementById('v27-quiz-panel');
 if(!p){
  p=document.createElement('div');p.id='v27-quiz-panel';p.className='v27-panel';
  p.innerHTML='<h2>📝 역사 퀴즈 v27</h2><p class="v27-sub">15문항 — 천문·법전·병종·농경·문헌·의술·유대 총정리</p><div id="v27-quiz-content" style="max-width:500px;margin:0 auto;padding:20px 0"></div><button class="v27-close" onclick="closeQuiz27()">닫기</button>';
  document.body.appendChild(p);
 }
 p.classList.add('on');renderQuiz27();
}
function closeQuiz27(){var p=document.getElementById('v27-quiz-panel');if(p)p.classList.remove('on');}
function answerQuiz27(i){
 var q=quiz27[quiz27State.idx];
 if(i===q.c){quiz27State.score++;sfx27('quiz_correct_v27');toast27('정답! ✓','#44cc88');}
 else{sfx27('quiz_wrong_v27');toast27('오답 ✗ 정답: '+q.a[q.c],'#cc4444');}
 quiz27State.answers.push(i);quiz27State.idx++;
 try{var st=JSON.parse(localStorage.getItem('krpg_stats'))||{};st.quizOk=(st.quizOk||0)+(i===q.c?1:0);localStorage.setItem('krpg_stats',JSON.stringify(st));}catch(e){}
 if(quiz27State.idx>=quiz27.length)quiz27State.done=true;
 renderQuiz27();
}

// ═══════════════════════════════════════════════════════════
// 업적 v27 — 12종 (204→216)
// ═══════════════════════════════════════════════════════════
// astro_observer, merit_viewer, law_scholar, counter_strategist,
// farm_planner, library_reader, med_herbalist, bond_connector,
// quiz_v27_master, quiz_v27_s, v27_explorer, v27_complete

function checkV27Complete(){
 var needed=['astro_observer','merit_viewer','law_scholar','counter_strategist','farm_planner','library_reader','med_herbalist','bond_connector'];
 var all=needed.every(function(id){return ach27.indexOf(id)>=0;});
 if(all)unlockAch27('v27_complete','v27 완전정복');
}
setInterval(checkV27Complete,10000);

// ─── 하단 네비바 버튼 추가 (기존 nav에 append, 신규생성 금지) ───
function appendNavButtons27(){
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
  {label:'🌌천문관측',fn:'openAstroObs'},
  {label:'🎖️무공훈장',fn:'openMeritHall'},
  {label:'📜법전편찬',fn:'openLawCodex'},
  {label:'⚔️병종상성',fn:'openCounterChart'},
  {label:'🌾농경달력',fn:'openFarmCalendar'},
  {label:'📚도서관',fn:'openRoyalLibrary'},
  {label:'🏥의술약전',fn:'openMedicinePharma'},
  {label:'💞유대망',fn:'openBondNetwork'},
  {label:'📝퀴즈v27',fn:'openQuiz27'}
 ];
 btns.forEach(function(b){
  var btn=document.createElement('button');
  btn.textContent=b.label;
  btn.style.cssText='background:rgba(26,20,40,.85);color:#c4956a;border:1px solid #3a3a4a;border-radius:8px;padding:6px 8px;font-size:9px;cursor:pointer;font-family:inherit;margin:2px;';
  btn.onclick=function(){if(window[b.fn])window[b.fn]();};
  existingNav.appendChild(btn);
 });
}

setTimeout(appendNavButtons27,2200);

// ─── 키보드 단축키 Shift+1~8+9 (v27) ───
document.addEventListener('keydown',function(e){
 if(!e.shiftKey)return;
 var map={
  '1':openAstroObs,'2':openMeritHall,'3':openLawCodex,'4':openCounterChart,
  '5':openFarmCalendar,'6':openRoyalLibrary,'7':openMedicinePharma,'8':openBondNetwork,
  '9':openQuiz27
 };
 if(map[e.key]){e.preventDefault();map[e.key]();}
});

// ─── ESC 닫기 v27 ───
document.addEventListener('keydown',function(e){
 if(e.key==='Escape'){
  ['v27-astro-panel','v27-merit-panel','v27-law-panel','v27-counter-panel','v27-farm-panel','v27-lib-panel','v27-med-panel','v27-bond-panel','v27-quiz-panel'].forEach(function(id){
   var p=document.getElementById(id);if(p)p.classList.remove('on');
  });
 }
});

// ─── URL 파라미터 처리 v27 ───
(function(){
 var params=new URLSearchParams(window.location.search);
 var openMap={
  'astro':openAstroObs,'merit':openMeritHall,'lawcodex':openLawCodex,
  'counter':openCounterChart,'farmcalendar':openFarmCalendar,'library':openRoyalLibrary,
  'medicine':openMedicinePharma,'bondnetwork':openBondNetwork,'quiz27':openQuiz27
 };
 var openParam=params.get('open');
 if(openParam&&openMap[openParam])setTimeout(function(){openMap[openParam]();},1400);
})();

// ─── localStorage v27 키 초기화 ───
(function(){
 try{
  if(!localStorage.getItem('krpg_v27_init')){
   localStorage.setItem('krpg_v27_init','1');
   var st=JSON.parse(localStorage.getItem('krpg_stats'))||{};
   st.v27=true;localStorage.setItem('krpg_stats',JSON.stringify(st));
  }
 }catch(e){}
})();

// ─── 전역 함수 노출 ───
window.openAstroObs=openAstroObs;
window.closeAstroObs=closeAstroObs;
window.openMeritHall=openMeritHall;
window.closeMeritHall=closeMeritHall;
window.openLawCodex=openLawCodex;
window.closeLawCodex=closeLawCodex;
window.openCounterChart=openCounterChart;
window.closeCounterChart=closeCounterChart;
window.openFarmCalendar=openFarmCalendar;
window.closeFarmCalendar=closeFarmCalendar;
window.openRoyalLibrary=openRoyalLibrary;
window.closeRoyalLibrary=closeRoyalLibrary;
window.openMedicinePharma=openMedicinePharma;
window.closeMedicinePharma=closeMedicinePharma;
window.openBondNetwork=openBondNetwork;
window.closeBondNetwork=closeBondNetwork;
window.openQuiz27=openQuiz27;
window.closeQuiz27=closeQuiz27;
window.answerQuiz27=answerQuiz27;

})();
