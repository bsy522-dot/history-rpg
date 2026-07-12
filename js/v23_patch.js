// v23_patch.js — 한국사 영웅전 v23.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v23-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:142;overflow-y:auto;padding:16px}',
'.v23-panel.on{display:block}',
'.v23-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v23-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v23-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v23-close:hover{background:#8B2A1A}',
'.v23-toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);padding:8px 20px;border-radius:20px;font-size:11px;font-weight:700;z-index:999;pointer-events:none;animation:v23fade 2s ease forwards}',
'@keyframes v23fade{0%{opacity:0;transform:translate(-50%,-10px)}10%{opacity:1;transform:translate(-50%,0)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-10px)}}',

'.weapon-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.weapon-wrap canvas{border:2px solid #6a3a1a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.weapon-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;max-width:580px;margin:8px auto}',
'.wp-card{background:linear-gradient(135deg,rgba(30,18,10,.95),rgba(18,10,6,.98));border:2px solid #6a3a1a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.wp-card:hover{border-color:#ff9944;transform:translateY(-2px)}',
'.wp-card.collected{border-color:#FFD700;background:linear-gradient(135deg,rgba(40,30,10,.9),rgba(28,22,8,.95))}',
'.wp-card .wp-icon{font-size:28px}',
'.wp-card .wp-name{font-size:10px;color:#ff9944;font-weight:700;margin-top:2px}',
'.wp-card .wp-stat{font-size:8px;color:#8a7a6a;margin-top:2px}',

'.bstat-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.bstat-wrap canvas{border:2px solid #3a4a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.bstat-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:620px;margin:8px auto}',
'.bs-item{background:linear-gradient(135deg,rgba(15,20,28,.95),rgba(10,14,20,.98));border:2px solid #3a4a5a;border-radius:10px;padding:10px;text-align:center}',
'.bs-item .bs-val{font-size:22px;color:#5FA0FF;font-weight:700}',
'.bs-item .bs-label{font-size:9px;color:#8a7a6a;margin-top:2px}',

'.treasury-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.treasury-wrap canvas{border:2px solid #5a5a1a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.treas-controls{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.tr-btn{padding:6px 14px;border:1px solid #5a5a1a;border-radius:6px;background:#1a1a10;color:#cccc44;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.tr-btn:hover{border-color:#cccc44;background:#2a2a14}',
'.tr-btn.active{border-color:#FFD700;color:#FFD700;background:#2a2a08}',

'.excav-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.excav-wrap canvas{border:2px solid #5a3a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.excav-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;max-width:400px;margin:8px auto}',
'.ex-cell{width:100%;aspect-ratio:1;border:2px solid #5a3a2a;border-radius:8px;background:#1a120a;color:#c4956a;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s;font-family:inherit}',
'.ex-cell:hover{border-color:#c4956a;background:#2a1a10}',
'.ex-cell.dug{border-color:#FFD700;background:linear-gradient(135deg,rgba(40,30,10,.9),rgba(28,20,8,.95))}',

'.train-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.train-wrap canvas{border:2px solid #4a2a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.train-units{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:580px;margin:8px auto}',
'.tu-card{background:linear-gradient(135deg,rgba(25,12,18,.95),rgba(15,8,12,.98));border:2px solid #4a2a3a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.tu-card:hover{border-color:#cc66aa;transform:translateY(-2px)}',
'.tu-card.maxed{border-color:#FFD700;background:linear-gradient(135deg,rgba(40,30,10,.9),rgba(28,22,8,.95))}',
'.tu-card .tu-icon{font-size:28px}',
'.tu-card .tu-name{font-size:10px;color:#cc66aa;font-weight:700;margin-top:2px}',
'.tu-card .tu-lvl{font-size:9px;color:#8a7a6a;margin-top:2px}',

'.hmap-wrap{max-width:600px;margin:0 auto;text-align:center}',
'.hmap-wrap canvas{border:2px solid #2a5a4a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.hmap-legend{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.hm-tag{padding:4px 10px;border-radius:12px;font-size:9px;cursor:pointer;transition:all .2s}',
'.hm-tag:hover{transform:scale(1.05)}',
'.hm-tag.active{box-shadow:0 0 8px rgba(255,215,0,.3)}',

'.awaken-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.awaken-wrap canvas{border:2px solid #5a2a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.awaken-heroes{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:580px;margin:8px auto}',
'.ah-card{background:linear-gradient(135deg,rgba(25,12,25,.95),rgba(15,8,15,.98));border:2px solid #5a2a5a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.ah-card:hover{border-color:#aa44dd;transform:translateY(-2px)}',
'.ah-card.awakened{border-color:#FFD700;background:linear-gradient(135deg,rgba(50,30,50,.9),rgba(35,20,35,.95));box-shadow:0 0 15px rgba(170,68,221,.3)}',
'.ah-card .ah-icon{font-size:28px}',
'.ah-card .ah-name{font-size:10px;color:#aa44dd;font-weight:700;margin-top:2px}',
'.ah-card .ah-stage{font-size:9px;color:#8a7a6a;margin-top:2px}',

'.dynasty-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.dynasty-wrap canvas{border:2px solid #4a4a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.dynasty-candidates{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;max-width:580px;margin:8px auto}',
'.dc-card{background:linear-gradient(135deg,rgba(22,22,10,.95),rgba(14,14,6,.98));border:2px solid #4a4a2a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.dc-card:hover{border-color:#bbaa44;transform:translateY(-2px)}',
'.dc-card.crowned{border-color:#FFD700;background:linear-gradient(135deg,rgba(50,48,15,.9),rgba(35,33,10,.95));box-shadow:0 0 15px rgba(255,215,0,.3)}',
'.dc-card .dc-icon{font-size:28px}',
'.dc-card .dc-name{font-size:10px;color:#bbaa44;font-weight:700;margin-top:2px}',
'.dc-card .dc-score{font-size:9px;color:#8a7a6a;margin-top:2px}'
].join('\n');
document.head.appendChild(css);

// ─── SFX ───
var SFX23={};
function initSFX23(){
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
 SFX23.weapon_select=mkSfx(440,'triangle',.2,.12);
 SFX23.weapon_collect=mkSfx(660,'sine',.35,.14);
 SFX23.stat_view=mkSfx(520,'sine',.25,.11);
 SFX23.treasury_collect=mkSfx(880,'sine',.3,.13);
 SFX23.treasury_spend=mkSfx(220,'sawtooth',.2,.1);
 SFX23.excavate=mkSfx(300,'triangle',.4,.13);
 SFX23.artifact_found=mkSfx(740,'sine',.5,.15);
 SFX23.train_complete=mkSfx(600,'square',.25,.12);
 SFX23.map_explore=mkSfx(480,'sine',.3,.11);
 SFX23.awaken=mkSfx(900,'sine',.6,.16);
 SFX23.dynasty_crown=mkSfx(1000,'sine',.5,.14);
 SFX23.achieve_v23=mkSfx(800,'sine',.4,.15);
}
initSFX23();

function playSfx23(name){if(SFX23[name])SFX23[name]();}

function toast23(msg,bg){
 var t=document.createElement('div');
 t.className='v23-toast';
 t.style.background=bg||'rgba(40,20,10,.9)';
 t.style.color='#FFD700';
 t.style.border='1px solid #c4956a44';
 t.textContent=msg;
 document.body.appendChild(t);
 setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t);},2200);
}

// ─── 1. 영웅무기도감 Canvas 12종 6축 Radar ───
var WEAPONS=[
 {id:'chunchu_sword',name:'천추검',icon:'⚔️',hero:'단군',atk:95,def:30,spd:70,rng:40,dur:85,magic:60,desc:'신시를 수호하던 전설의 검'},
 {id:'hwanwoong_axe',name:'환웅의 신부',icon:'🪓',hero:'환웅',atk:90,def:50,spd:45,rng:30,dur:95,magic:80,desc:'천부인 3종 중 하나인 신성한 도끼'},
 {id:'jumong_bow',name:'주몽의 활',icon:'🏹',hero:'주몽',atk:85,def:15,spd:90,rng:95,dur:60,magic:40,desc:'백발백중의 신궁이 사용한 활'},
 {id:'gwanggaeto_spear',name:'광개토대왕창',icon:'🔱',hero:'광개토대왕',atk:88,def:45,spd:65,rng:70,dur:90,magic:35,desc:'대륙을 정복한 왕의 창'},
 {id:'eulji_shield',name:'을지문덕의 방패',icon:'🛡️',hero:'을지문덕',atk:25,def:98,spd:35,rng:15,dur:95,magic:50,desc:'살수대첩의 수호 방패'},
 {id:'yeonggae_halberd',name:'연개소문의 극',icon:'⚔️',hero:'연개소문',atk:92,def:40,spd:55,rng:60,dur:80,magic:45,desc:'삼국을 호령한 대막리지의 극'},
 {id:'seondeok_orb',name:'선덕여왕의 신주',icon:'🔮',hero:'선덕여왕',atk:40,def:30,spd:50,rng:80,dur:70,magic:98,desc:'첨성대의 별빛을 담은 마법 구슬'},
 {id:'gyebaek_blade',name:'계백의 쌍검',icon:'⚔️',hero:'계백',atk:93,def:20,spd:95,rng:35,dur:55,magic:30,desc:'황산벌의 결사대 쌍검'},
 {id:'daejooyoung_mace',name:'대조영의 철퇴',icon:'🔨',hero:'대조영',atk:96,def:55,spd:40,rng:25,dur:92,magic:25,desc:'발해를 건국한 장수의 철퇴'},
 {id:'haemosu_lance',name:'해모수의 용광검',icon:'⚔️',hero:'해모수',atk:88,def:35,spd:75,rng:50,dur:78,magic:70,desc:'천제의 아들이 쓴 빛나는 검'},
 {id:'biru_dagger',name:'비류의 해신단도',icon:'🗡️',hero:'비류',atk:70,def:25,spd:92,rng:20,dur:65,magic:55,desc:'바다를 건너온 왕자의 단도'},
 {id:'onjo_banner',name:'온조의 건국기',icon:'⚐',hero:'온조',atk:50,def:60,spd:40,rng:90,dur:88,magic:75,desc:'백제를 세운 온조왕의 깃발'}
];

var weaponCollected={};

function openWeaponCodex(){
 playSfx23('weapon_select');
 var p=document.getElementById('v23-weapon-panel');
 if(!p){
  p=document.createElement('div');p.id='v23-weapon-panel';p.className='v23-panel';
  p.innerHTML='<div class="weapon-wrap"><h2>⚔️ 영웅무기도감</h2><p class="v23-sub">12종 전설의 무기 — 6축 Radar로 성능 비교</p><canvas id="v23-weapon-cv" width="580" height="400"></canvas><div id="v23-weapon-info" style="color:#8a7a6a;font-size:11px;margin:8px 0"></div><div class="weapon-grid" id="v23-weapon-grid"></div><button class="v23-close" onclick="closeWeaponCodex()">닫기 [ESC]</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 var saved=localStorage.getItem('krpg_v23_weapons');
 if(saved)try{weaponCollected=JSON.parse(saved);}catch(e){}
 renderWeaponGrid();
 drawWeaponRadar(0);
 checkAch23('weapon_viewer');
}

function closeWeaponCodex(){var p=document.getElementById('v23-weapon-panel');if(p)p.classList.remove('on');}

function renderWeaponGrid(){
 var g=document.getElementById('v23-weapon-grid');if(!g)return;
 g.innerHTML='';
 WEAPONS.forEach(function(w,i){
  var d=document.createElement('div');d.className='wp-card'+(weaponCollected[w.id]?' collected':'');
  d.innerHTML='<div class="wp-icon">'+w.icon+'</div><div class="wp-name">'+w.name+'</div><div class="wp-stat">'+w.hero+'</div>';
  d.onclick=function(){drawWeaponRadar(i);playSfx23('weapon_select');};
  g.appendChild(d);
 });
}

function drawWeaponRadar(idx){
 var cv=document.getElementById('v23-weapon-cv');if(!cv)return;
 var ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
 ctx.clearRect(0,0,W,H);
 var w=WEAPONS[idx],cx=W/2,cy=H/2+10,R=140;
 var axes=['공격','방어','속도','사정거리','내구','마법'];
 var vals=[w.atk,w.def,w.spd,w.rng,w.dur,w.magic];
 var n=axes.length;
 // draw grid
 for(var ring=1;ring<=5;ring++){
  ctx.beginPath();
  for(var i=0;i<=n;i++){
   var ang=-Math.PI/2+i*(Math.PI*2/n);
   var r=R*ring/5;
   var x=cx+Math.cos(ang)*r,y=cy+Math.sin(ang)*r;
   if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
  }
  ctx.strokeStyle='rgba(100,80,60,.2)';ctx.lineWidth=1;ctx.stroke();
 }
 // draw axes
 for(var i=0;i<n;i++){
  var ang=-Math.PI/2+i*(Math.PI*2/n);
  ctx.beginPath();ctx.moveTo(cx,cy);
  ctx.lineTo(cx+Math.cos(ang)*R,cy+Math.sin(ang)*R);
  ctx.strokeStyle='rgba(100,80,60,.3)';ctx.stroke();
  var lx=cx+Math.cos(ang)*(R+18),ly=cy+Math.sin(ang)*(R+18);
  ctx.fillStyle='#8a7a6a';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(axes[i],lx,ly);
 }
 // draw data polygon
 ctx.beginPath();
 for(var i=0;i<=n;i++){
  var ang=-Math.PI/2+(i%n)*(Math.PI*2/n);
  var r=vals[i%n]/100*R;
  var x=cx+Math.cos(ang)*r,y=cy+Math.sin(ang)*r;
  if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
 }
 ctx.fillStyle='rgba(255,153,68,.15)';ctx.fill();
 ctx.strokeStyle='#ff9944';ctx.lineWidth=2;ctx.stroke();
 // dots
 for(var i=0;i<n;i++){
  var ang=-Math.PI/2+i*(Math.PI*2/n);
  var r=vals[i]/100*R;
  ctx.beginPath();ctx.arc(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r,4,0,Math.PI*2);
  ctx.fillStyle='#FFD700';ctx.fill();
 }
 // title
 ctx.fillStyle='#c4956a';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
 ctx.fillText(w.icon+' '+w.name,cx,30);
 ctx.fillStyle='#8a7a6a';ctx.font='11px sans-serif';
 ctx.fillText(w.hero+' — '+w.desc,cx,50);
 // info
 var info=document.getElementById('v23-weapon-info');
 if(info)info.textContent='공격:'+w.atk+' 방어:'+w.def+' 속도:'+w.spd+' 사정:'+w.rng+' 내구:'+w.dur+' 마법:'+w.magic;
}

function collectWeapon(id){
 weaponCollected[id]=true;
 localStorage.setItem('krpg_v23_weapons',JSON.stringify(weaponCollected));
 playSfx23('weapon_collect');toast23('⚔️ 무기 수집: '+WEAPONS.find(function(w){return w.id===id;}).name);
 renderWeaponGrid();
 var cnt=Object.keys(weaponCollected).length;
 if(cnt>=6)checkAch23('weapon_6');
 if(cnt>=12)checkAch23('weapon_master');
}

// ─── 2. 전투통계 대시보드 Canvas ───
var battleStats={wins:0,losses:0,totalDmg:0,totalHeal:0,criticals:0,perfectWins:0};

function openBattleStats(){
 playSfx23('stat_view');
 var p=document.getElementById('v23-bstat-panel');
 if(!p){
  p=document.createElement('div');p.id='v23-bstat-panel';p.className='v23-panel';
  p.innerHTML='<div class="bstat-wrap"><h2>📊 전투통계 대시보드</h2><p class="v23-sub">6대 전투 지표 분석</p><canvas id="v23-bstat-cv" width="620" height="380"></canvas><div class="bstat-summary" id="v23-bstat-sum"></div><div style="margin:12px auto;text-align:center"><button class="tr-btn" onclick="simulateBattle23()">모의 전투 시뮬레이션</button> <button class="tr-btn" onclick="resetBattleStats()">초기화</button></div><button class="v23-close" onclick="closeBattleStats()">닫기 [ESC]</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 var saved=localStorage.getItem('krpg_v23_bstats');
 if(saved)try{battleStats=JSON.parse(saved);}catch(e){}
 drawBattleStatsChart();
 checkAch23('stat_viewer');
}

function closeBattleStats(){var p=document.getElementById('v23-bstat-panel');if(p)p.classList.remove('on');}

function simulateBattle23(){
 var win=Math.random()>.35;
 if(win){battleStats.wins++;battleStats.totalDmg+=Math.floor(Math.random()*500+200);battleStats.totalHeal+=Math.floor(Math.random()*200+50);battleStats.criticals+=Math.floor(Math.random()*5);if(Math.random()>.7)battleStats.perfectWins++;}
 else{battleStats.losses++;battleStats.totalDmg+=Math.floor(Math.random()*300+100);battleStats.totalHeal+=Math.floor(Math.random()*150+30);}
 localStorage.setItem('krpg_v23_bstats',JSON.stringify(battleStats));
 playSfx23(win?'train_complete':'treasury_spend');
 toast23(win?'⚔️ 승리!':'❌ 패배...');
 drawBattleStatsChart();
 if(battleStats.wins>=10)checkAch23('battle_10');
 if(battleStats.perfectWins>=5)checkAch23('perfect_5');
}

function resetBattleStats(){
 battleStats={wins:0,losses:0,totalDmg:0,totalHeal:0,criticals:0,perfectWins:0};
 localStorage.setItem('krpg_v23_bstats',JSON.stringify(battleStats));
 drawBattleStatsChart();
}

function drawBattleStatsChart(){
 var cv=document.getElementById('v23-bstat-cv');if(!cv)return;
 var ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
 ctx.clearRect(0,0,W,H);
 var metrics=[
  {label:'승리',val:battleStats.wins,color:'#4CAF50',max:Math.max(battleStats.wins,battleStats.losses,1)*1.3},
  {label:'패배',val:battleStats.losses,color:'#FF4444',max:Math.max(battleStats.wins,battleStats.losses,1)*1.3},
  {label:'총 데미지',val:battleStats.totalDmg,color:'#ff9944',max:Math.max(battleStats.totalDmg,1)*1.2},
  {label:'총 힌링',val:battleStats.totalHeal,color:'#66ccaa',max:Math.max(battleStats.totalHeal,1)*1.2},
  {label:'크리티컬',val:battleStats.criticals,color:'#FFD700',max:Math.max(battleStats.criticals,1)*1.3},
  {label:'퍼펙트승',val:battleStats.perfectWins,color:'#aa44dd',max:Math.max(battleStats.perfectWins,1)*1.3}
 ];
 var barW=60,gap=30,startX=(W-metrics.length*(barW+gap)+gap)/2,maxH=H-100;
 ctx.fillStyle='#c4956a';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('전투 성과 분석',W/2,30);
 metrics.forEach(function(m,i){
  var x=startX+i*(barW+gap);
  var h=m.max>0?m.val/m.max*maxH:0;if(h<2&&m.val>0)h=2;
  var y=H-50-h;
  var grad=ctx.createLinearGradient(x,y,x,H-50);
  grad.addColorStop(0,m.color);grad.addColorStop(1,m.color+'44');
  ctx.fillStyle=grad;
  ctx.beginPath();ctx.roundRect(x,y,barW,h,4);ctx.fill();
  ctx.fillStyle=m.color;ctx.font='bold 13px sans-serif';ctx.textAlign='center';
  ctx.fillText(m.val.toLocaleString(),x+barW/2,y-8);
  ctx.fillStyle='#8a7a6a';ctx.font='10px sans-serif';
  ctx.fillText(m.label,x+barW/2,H-35);
 });
 // summary panel
 var sum=document.getElementById('v23-bstat-sum');
 if(sum){
  var total=battleStats.wins+battleStats.losses;
  var winRate=total>0?Math.round(battleStats.wins/total*100):0;
  var avgDmg=battleStats.wins>0?Math.round(battleStats.totalDmg/battleStats.wins):0;
  sum.innerHTML='<div class="bs-item"><div class="bs-val">'+winRate+'%</div><div class="bs-label">승률</div></div><div class="bs-item"><div class="bs-val">'+avgDmg+'</div><div class="bs-label">평균 데미지</div></div><div class="bs-item"><div class="bs-val">'+(battleStats.criticals)+'</div><div class="bs-label">크리티컬</div></div>';
 }
}

// ─── 3. 왕국재정관리 Canvas ───
var treasury={gold:5000,food:3000,iron:1000,jade:500,income:[],expense:[]};
var treasuryTurn=0;

function openTreasury(){
 playSfx23('treasury_collect');
 var p=document.getElementById('v23-treasury-panel');
 if(!p){
  p=document.createElement('div');p.id='v23-treasury-panel';p.className='v23-panel';
  p.innerHTML='<div class="treasury-wrap"><h2>🏦 왕국재정관리</h2><p class="v23-sub">수입/지출 관리 — 국고를 부강하게</p><canvas id="v23-treas-cv" width="580" height="360"></canvas><div class="treas-controls"><button class="tr-btn" onclick="collectTax()">세금 수거</button><button class="tr-btn" onclick="tradeGoods()">교역</button><button class="tr-btn" onclick="buildInfra()">건설 투자</button><button class="tr-btn" onclick="recruitArmy()">군사 모집</button></div><div id="v23-treas-log" style="max-width:580px;margin:8px auto;font-size:10px;color:#8a7a6a;max-height:100px;overflow-y:auto"></div><button class="v23-close" onclick="closeTreasury()">닫기 [ESC]</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 var saved=localStorage.getItem('krpg_v23_treasury');
 if(saved)try{treasury=JSON.parse(saved);}catch(e){}
 drawTreasuryChart();
 checkAch23('treasury_viewer');
}

function closeTreasury(){var p=document.getElementById('v23-treasury-panel');if(p)p.classList.remove('on');}

function saveTreasury(){localStorage.setItem('krpg_v23_treasury',JSON.stringify(treasury));}

function collectTax(){
 var amt=Math.floor(Math.random()*800+400);
 treasury.gold+=amt;treasury.food+=Math.floor(amt*.3);
 treasury.income.push({type:'세금',amt:amt,turn:treasuryTurn++});
 playSfx23('treasury_collect');toast23('💰 세금 +'+amt+'금');
 saveTreasury();drawTreasuryChart();
 if(treasury.gold>=10000)checkAch23('gold_10k');
}

function tradeGoods(){
 if(treasury.food<500){toast23('❌ 식량 부족');return;}
 treasury.food-=500;treasury.gold+=800;treasury.jade+=50;
 treasury.income.push({type:'교역',amt:800,turn:treasuryTurn++});
 playSfx23('treasury_collect');toast23('🚢 교역 완료');
 saveTreasury();drawTreasuryChart();
 checkAch23('trade_complete');
}

function buildInfra(){
 if(treasury.gold<1500){toast23('❌ 금 부족');return;}
 treasury.gold-=1500;treasury.iron-=200;
 treasury.expense.push({type:'건설',amt:1500,turn:treasuryTurn++});
 playSfx23('treasury_spend');toast23('🏗️ 건설 투자 완료');
 saveTreasury();drawTreasuryChart();
 checkAch23('build_infra');
}

function recruitArmy(){
 if(treasury.gold<1000||treasury.food<800){toast23('❌ 자원 부족');return;}
 treasury.gold-=1000;treasury.food-=800;treasury.iron-=300;
 treasury.expense.push({type:'군사',amt:1000,turn:treasuryTurn++});
 playSfx23('treasury_spend');toast23('⚔️ 군사 모집 완료');
 saveTreasury();drawTreasuryChart();
}

function drawTreasuryChart(){
 var cv=document.getElementById('v23-treas-cv');if(!cv)return;
 var ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
 ctx.clearRect(0,0,W,H);
 ctx.fillStyle='#c4956a';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('국고 현황',W/2,28);
 var resources=[
  {name:'금',val:treasury.gold,color:'#FFD700',icon:'💰'},
  {name:'식량',val:treasury.food,color:'#4CAF50',icon:'🌾'},
  {name:'철',val:treasury.iron,color:'#90A4AE',icon:'⚙️'},
  {name:'옥',val:treasury.jade,color:'#66BB6A',icon:'💎'}
 ];
 var barW=100,gap=20,startX=(W-resources.length*(barW+gap)+gap)/2;
 var maxVal=Math.max.apply(null,resources.map(function(r){return r.val;}))||1;
 resources.forEach(function(r,i){
  var x=startX+i*(barW+gap);
  var h=r.val/maxVal*(H-120);if(h<2&&r.val>0)h=2;
  var y=H-60-h;
  var grad=ctx.createLinearGradient(x,y,x,H-60);
  grad.addColorStop(0,r.color);grad.addColorStop(1,r.color+'33');
  ctx.fillStyle=grad;
  ctx.beginPath();ctx.roundRect(x,y,barW,h,4);ctx.fill();
  ctx.fillStyle=r.color;ctx.font='bold 12px sans-serif';ctx.textAlign='center';
  ctx.fillText(r.icon+' '+r.val.toLocaleString(),x+barW/2,y-10);
  ctx.fillStyle='#8a7a6a';ctx.font='10px sans-serif';
  ctx.fillText(r.name,x+barW/2,H-42);
 });
 // log
 var log=document.getElementById('v23-treas-log');
 if(log){
  var recent=treasury.income.concat(treasury.expense).slice(-8);
  log.innerHTML=recent.map(function(e){
   var isIncome=treasury.income.indexOf(e)>=0;
   return '<div style="color:'+(isIncome?'#4CAF50':'#FF4444')+'">'+(isIncome?'+':'-')+e.amt+' ('+e.type+')</div>';
  }).join('');
 }
}

// ─── 4. 고대유물발굴 Canvas 8구역 ───
var ARTIFACTS=[
 {id:'a1',name:'비파형동검',icon:'⚔️',era:'고조선',rarity:'S',desc:'청동기 시대 의식용 검'},
 {id:'a2',name:'반달돌칼',icon:'🌙',era:'선사시대',rarity:'A',desc:'반달 모양의 신석기 돌칼'},
 {id:'a3',name:'뿌무늬거울',icon:'🪞',era:'고조선',rarity:'S',desc:'천부인 — 빛을 반사하는 신기'},
 {id:'a4',name:'빗살무늬토기',icon:'🏺',era:'신석기',rarity:'B',desc:'빗살무늬 토기 파편'},
 {id:'a5',name:'청동방울',icon:'✨',era:'철기시대',rarity:'A',desc:'정교한 문양의 청동 거울'},
 {id:'a6',name:'고인돌버섬',icon:'🪶',era:'고조선',rarity:'A',desc:'하늘에 제사 지내던 돌버섬'}
];

var excavations={};

function openExcavation(){
 playSfx23('excavate');
 var p=document.getElementById('v23-excav-panel');
 if(!p){
  p=document.createElement('div');p.id='v23-excav-panel';p.className='v23-panel';
  p.innerHTML='<div class="excav-wrap"><h2>⛏️ 고대유물발굴</h2><p class="v23-sub">8구역 발굴 — 유물을 찾아라</p><canvas id="v23-excav-cv" width="580" height="360"></canvas><div class="excav-grid" id="v23-excav-grid"></div><div id="v23-excav-result" style="text-align:center;font-size:11px;color:#c4956a;margin:8px 0"></div><button class="v23-close" onclick="closeExcavation()">닫기 [ESC]</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 var saved=localStorage.getItem('krpg_v23_excav');
 if(saved)try{excavations=JSON.parse(saved);}catch(e){}
 renderExcavGrid();
 drawExcavMap();
 checkAch23('excav_viewer');
}

function closeExcavation(){var p=document.getElementById('v23-excav-panel');if(p)p.classList.remove('on');}

function renderExcavGrid(){
 var g=document.getElementById('v23-excav-grid');if(!g)return;
 g.innerHTML='';
 var zones=['평양성','ArchSite B','바위그림','Stone Circle','고인돌','Iron Forge','토기요','Jade Mine'];
 zones.forEach(function(z,i){
  var d=document.createElement('button');
  d.className='ex-cell'+(excavations['z'+i]?' dug':'');
  d.textContent=excavations['z'+i]?'✨':'⛏️';
  d.onclick=function(){digZone(i);};
  g.appendChild(d);
 });
}

function digZone(idx){
 if(excavations['z'+idx]){toast23('이미 발굴한 구역');return;}
 var found=Math.random()>.3;
 excavations['z'+idx]=true;
 localStorage.setItem('krpg_v23_excav',JSON.stringify(excavations));
 if(found){
  var art=ARTIFACTS[Math.floor(Math.random()*ARTIFACTS.length)];
  playSfx23('artifact_found');
  toast23('✨ 유물 발견: '+art.name+' ('+art.rarity+'급)');
  var res=document.getElementById('v23-excav-result');
  if(res)res.textContent=art.icon+' '+art.name+' — '+art.desc+' ('+art.era+')';
 } else {
  playSfx23('excavate');
  toast23('⛏️ 토기 파편만 발견...');
 }
 renderExcavGrid();
 drawExcavMap();
 var cnt=Object.keys(excavations).length;
 if(cnt>=4)checkAch23('excav_4');
 if(cnt>=8)checkAch23('excav_master');
}

function drawExcavMap(){
 var cv=document.getElementById('v23-excav-cv');if(!cv)return;
 var ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
 ctx.clearRect(0,0,W,H);
 ctx.fillStyle='#c4956a';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('발굴 현황 지도',W/2,28);
 var zones=[{x:80,y:80},{x:220,y:100},{x:380,y:80},{x:500,y:110},{x:100,y:220},{x:260,y:250},{x:420,y:230},{x:500,y:260}];
 zones.forEach(function(z,i){
  var dug=!!excavations['z'+i];
  ctx.beginPath();ctx.arc(z.x,z.y,20,0,Math.PI*2);
  ctx.fillStyle=dug?'rgba(255,215,0,.3)':'rgba(90,58,26,.3)';ctx.fill();
  ctx.strokeStyle=dug?'#FFD700':'#5a3a1a';ctx.lineWidth=2;ctx.stroke();
  ctx.fillStyle=dug?'#FFD700':'#8a7a6a';ctx.font='18px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(dug?'✨':'⛏️',z.x,z.y);
 });
 var cnt=Object.keys(excavations).length;
 ctx.fillStyle='#8a7a6a';ctx.font='11px sans-serif';ctx.textBaseline='alphabetic';
 ctx.fillText('발굴 진행: '+cnt+'/8 구역',W/2,H-20);
}

// ─── 5. 군사훈련소 Canvas 6병종 5훈련 ───
var UNITS=[
 {id:'infantry',name:'보병',icon:'⚔️',stats:{str:40,def:50,spd:30,morale:60,skill:35}},
 {id:'cavalry',name:'기병',icon:'🏇',stats:{str:60,def:35,spd:80,morale:55,skill:45}},
 {id:'archer',name:'궁병',icon:'🏹',stats:{str:55,def:20,spd:50,morale:45,skill:70}},
 {id:'spearman',name:'창병',icon:'🔱',stats:{str:50,def:60,spd:35,morale:50,skill:40}},
 {id:'siege',name:'공성병',icon:'🏰',stats:{str:70,def:45,spd:15,morale:40,skill:55}},
 {id:'scout',name:'척후병',icon:'👁️',stats:{str:25,def:15,spd:90,morale:65,skill:60}}
];

var unitLevels={};

function openTraining(){
 playSfx23('train_complete');
 var p=document.getElementById('v23-train-panel');
 if(!p){
  p=document.createElement('div');p.id='v23-train-panel';p.className='v23-panel';
  p.innerHTML='<div class="train-wrap"><h2>🏫 군사훈련소</h2><p class="v23-sub">6병종 — 훈련으로 전투력 강화</p><canvas id="v23-train-cv" width="580" height="360"></canvas><div class="train-units" id="v23-train-grid"></div><button class="v23-close" onclick="closeTraining()">닫기 [ESC]</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 var saved=localStorage.getItem('krpg_v23_training');
 if(saved)try{unitLevels=JSON.parse(saved);}catch(e){}
 renderTrainGrid();
 drawTrainChart(0);
 checkAch23('train_viewer');
}

function closeTraining(){var p=document.getElementById('v23-train-panel');if(p)p.classList.remove('on');}

function renderTrainGrid(){
 var g=document.getElementById('v23-train-grid');if(!g)return;
 g.innerHTML='';
 UNITS.forEach(function(u,i){
  var lv=unitLevels[u.id]||1;
  var d=document.createElement('div');d.className='tu-card'+(lv>=10?' maxed':'');
  d.innerHTML='<div class="tu-icon">'+u.icon+'</div><div class="tu-name">'+u.name+'</div><div class="tu-lvl">Lv.'+lv+(lv>=10?' MAX':'')+'</div>';
  d.onclick=function(){trainUnit(u.id,i);};
  g.appendChild(d);
 });
}

function trainUnit(id,idx){
 var lv=unitLevels[id]||1;
 if(lv>=10){toast23('최대 레벨!');return;}
 unitLevels[id]=(lv||1)+1;
 localStorage.setItem('krpg_v23_training',JSON.stringify(unitLevels));
 playSfx23('train_complete');
 toast23('🏫 '+UNITS.find(function(u){return u.id===id;}).name+' Lv.'+(unitLevels[id]));
 renderTrainGrid();drawTrainChart(idx);
 var total=UNITS.reduce(function(s,u){return s+(unitLevels[u.id]||1);},0);
 if(total>=30)checkAch23('train_30');
 if(total>=60)checkAch23('train_master');
}

function drawTrainChart(idx){
 var cv=document.getElementById('v23-train-cv');if(!cv)return;
 var ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
 ctx.clearRect(0,0,W,H);
 var u=UNITS[idx],lv=unitLevels[u.id]||1;
 var cx=W/2,cy=H/2+15,R=120;
 var axes=['공격','방어','속도','사기','기술'];
 var baseVals=[u.stats.str,u.stats.def,u.stats.spd,u.stats.morale,u.stats.skill];
 var vals=baseVals.map(function(v){return Math.min(v+lv*5,100);});
 var n=axes.length;
 for(var ring=1;ring<=5;ring++){
  ctx.beginPath();
  for(var i=0;i<=n;i++){
   var ang=-Math.PI/2+i*(Math.PI*2/n);
   var r=R*ring/5;
   if(i===0)ctx.moveTo(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r);
   else ctx.lineTo(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r);
  }
  ctx.strokeStyle='rgba(80,40,60,.2)';ctx.lineWidth=1;ctx.stroke();
 }
 for(var i=0;i<n;i++){
  var ang=-Math.PI/2+i*(Math.PI*2/n);
  ctx.beginPath();ctx.moveTo(cx,cy);
  ctx.lineTo(cx+Math.cos(ang)*R,cy+Math.sin(ang)*R);
  ctx.strokeStyle='rgba(80,40,60,.3)';ctx.stroke();
  var lx=cx+Math.cos(ang)*(R+18),ly=cy+Math.sin(ang)*(R+18);
  ctx.fillStyle='#8a7a6a';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(axes[i],lx,ly);
 }
 ctx.beginPath();
 for(var i=0;i<=n;i++){
  var ang=-Math.PI/2+(i%n)*(Math.PI*2/n);
  var r=vals[i%n]/100*R;
  if(i===0)ctx.moveTo(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r);
  else ctx.lineTo(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r);
 }
 ctx.fillStyle='rgba(204,102,170,.15)';ctx.fill();
 ctx.strokeStyle='#cc66aa';ctx.lineWidth=2;ctx.stroke();
 for(var i=0;i<n;i++){
  var ang=-Math.PI/2+i*(Math.PI*2/n);
  var r=vals[i]/100*R;
  ctx.beginPath();ctx.arc(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r,4,0,Math.PI*2);
  ctx.fillStyle='#FFD700';ctx.fill();
 }
 ctx.fillStyle='#cc66aa';ctx.font='bold 16px sans-serif';ctx.textAlign='center';ctx.textBaseline='alphabetic';
 ctx.fillText(u.icon+' '+u.name+' Lv.'+lv,cx,28);
}

// ─── 6. 역사지도탐험 Canvas 12지역 ───
var REGIONS=[
 {id:'asadal',name:'아사달',x:280,y:120,color:'#FFD700',desc:'고조선 수도'},
 {id:'buyeo',name:'부여',x:380,y:90,color:'#FF5FA2',desc:'부여국 중심지'},
 {id:'jolbon',name:'졸본',x:420,y:140,color:'#aa44dd',desc:'고구려 초기 수도'},
 {id:'wiryeseong',name:'위례성',x:300,y:230,color:'#5FA0FF',desc:'백제 초기 수도'},
 {id:'seorabeol',name:'서라벌',x:370,y:260,color:'#66BB6A',desc:'신라 수도'},
 {id:'gaya',name:'가야',x:340,y:290,color:'#FF9800',desc:'가야연맹 중심'},
 {id:'okjeo',name:'옥저',x:450,y:100,color:'#78909C',desc:'동해안 부족국가'},
 {id:'dongye',name:'동예',x:430,y:170,color:'#8D6E63',desc:'무천 지역 부족국가'},
 {id:'mahan',name:'마한',x:250,y:280,color:'#AB47BC',desc:'삼한 중 최대 세력'},
 {id:'jinhan',name:'진한',x:390,y:280,color:'#26A69A',desc:'신라의 모체'},
 {id:'byeonhan',name:'변한',x:350,y:310,color:'#EF5350',desc:'철기 생산 중심'},
 {id:'nakrang',name:'낙랑',x:320,y:160,color:'#42A5F5',desc:'한사군 설치 지역'}
];

var exploredRegions={};

function openHistoryMap(){
 playSfx23('map_explore');
 var p=document.getElementById('v23-hmap-panel');
 if(!p){
  p=document.createElement('div');p.id='v23-hmap-panel';p.className='v23-panel';
  p.innerHTML='<div class="hmap-wrap"><h2>🗺️ 역사지도탐험</h2><p class="v23-sub">12지역 — 고대 한반도 탐험</p><canvas id="v23-hmap-cv" width="600" height="380"></canvas><div class="hmap-legend" id="v23-hmap-legend"></div><div id="v23-hmap-info" style="text-align:center;font-size:11px;color:#8a7a6a;margin:8px 0"></div><button class="v23-close" onclick="closeHistoryMap()">닫기 [ESC]</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 var saved=localStorage.getItem('krpg_v23_regions');
 if(saved)try{exploredRegions=JSON.parse(saved);}catch(e){}
 drawHistoryMap(-1);
 renderMapLegend();
 checkAch23('map_viewer');
}

function closeHistoryMap(){var p=document.getElementById('v23-hmap-panel');if(p)p.classList.remove('on');}

function renderMapLegend(){
 var lg=document.getElementById('v23-hmap-legend');if(!lg)return;
 lg.innerHTML='';
 REGIONS.forEach(function(r,i){
  var tag=document.createElement('span');
  tag.className='hm-tag'+(exploredRegions[r.id]?' active':'');
  tag.style.background=r.color+'22';tag.style.color=r.color;tag.style.border='1px solid '+r.color+'66';
  tag.textContent=r.name;
  tag.onclick=function(){exploreRegion(i);};
  lg.appendChild(tag);
 });
}

function exploreRegion(idx){
 var r=REGIONS[idx];
 exploredRegions[r.id]=true;
 localStorage.setItem('krpg_v23_regions',JSON.stringify(exploredRegions));
 playSfx23('map_explore');
 toast23('🗺️ '+r.name+' 탐험 완료!');
 drawHistoryMap(idx);
 renderMapLegend();
 var cnt=Object.keys(exploredRegions).length;
 if(cnt>=6)checkAch23('map_6');
 if(cnt>=12)checkAch23('map_master');
}

function drawHistoryMap(highlight){
 var cv=document.getElementById('v23-hmap-cv');if(!cv)return;
 var ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
 ctx.clearRect(0,0,W,H);
 ctx.fillStyle='#c4956a';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('고대 한반도 지도',W/2,24);
 // peninsula outline
 ctx.beginPath();
 ctx.moveTo(200,60);ctx.quadraticCurveTo(320,40,480,70);ctx.quadraticCurveTo(500,180,460,300);
 ctx.quadraticCurveTo(400,350,320,340);ctx.quadraticCurveTo(220,330,180,280);
 ctx.quadraticCurveTo(170,180,200,60);
 ctx.strokeStyle='rgba(196,149,106,.25)';ctx.lineWidth=2;ctx.stroke();
 ctx.fillStyle='rgba(196,149,106,.05)';ctx.fill();
 // regions
 REGIONS.forEach(function(r,i){
  var explored=!!exploredRegions[r.id];
  var isHL=i===highlight;
  ctx.beginPath();ctx.arc(r.x,r.y,isHL?18:14,0,Math.PI*2);
  ctx.fillStyle=explored?r.color+'44':'rgba(60,50,40,.3)';ctx.fill();
  ctx.strokeStyle=explored?r.color:'#3a3a3a';ctx.lineWidth=isHL?3:2;ctx.stroke();
  if(isHL){ctx.beginPath();ctx.arc(r.x,r.y,24,0,Math.PI*2);ctx.strokeStyle=r.color+'66';ctx.lineWidth=1;ctx.stroke();}
  ctx.fillStyle=explored?r.color:'#5a5a5a';ctx.font=(isHL?'bold ':'')+' 9px sans-serif';ctx.textAlign='center';ctx.textBaseline='top';
  ctx.fillText(r.name,r.x,r.y+18);
 });
 // info
 if(highlight>=0){
  var r=REGIONS[highlight];
  var info=document.getElementById('v23-hmap-info');
  if(info)info.textContent=r.name+' — '+r.desc;
 }
 var cnt=Object.keys(exploredRegions).length;
 ctx.fillStyle='#8a7a6a';ctx.font='11px sans-serif';ctx.textBaseline='alphabetic';
 ctx.fillText('탐험: '+cnt+'/12 지역',W/2,H-10);
}

// ─── 7. 전설영웅각성 Canvas 6영웅 3단계 ───
var HEROES_AW=[
 {id:'dangun',name:'단군',icon:'👑',stages:['국조','신시왕','천제'],power:[80,92,100]},
 {id:'hwanung',name:'환웅',icon:'⚡',stages:['천장','풍백주','천제자'],power:[75,88,98]},
 {id:'jumong',name:'주몬',icon:'🏹',stages:['신궁','고구려왕','태양신'],power:[78,90,99]},
 {id:'eulji',name:'을지문덕',icon:'🛡️',stages:['장군','대장군','불패의 수호자'],power:[72,86,96]},
 {id:'gwanggaeto',name:'광개토',icon:'🌍',stages:['태자','대왕','천하의 군주'],power:[82,94,100]},
 {id:'geumwa',name:'금와',icon:'🐸',stages:['왕자','부여왕','수호왕'],power:[68,82,93]}
];

var heroAwakening={};

function openAwakening(){
 playSfx23('awaken');
 var p=document.getElementById('v23-awaken-panel');
 if(!p){
  p=document.createElement('div');p.id='v23-awaken-panel';p.className='v23-panel';
  p.innerHTML='<div class="awaken-wrap"><h2>✨ 전설영웅각성</h2><p class="v23-sub">6영웅 3단계 — 각성으로 전력 해방</p><canvas id="v23-awaken-cv" width="580" height="360"></canvas><div class="awaken-heroes" id="v23-awaken-grid"></div><button class="v23-close" onclick="closeAwakening()">닫기 [ESC]</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 var saved=localStorage.getItem('krpg_v23_awaken');
 if(saved)try{heroAwakening=JSON.parse(saved);}catch(e){}
 renderAwakenGrid();
 drawAwakenChart(0);
 checkAch23('awaken_viewer');
}

function closeAwakening(){var p=document.getElementById('v23-awaken-panel');if(p)p.classList.remove('on');}

function renderAwakenGrid(){
 var g=document.getElementById('v23-awaken-grid');if(!g)return;
 g.innerHTML='';
 HEROES_AW.forEach(function(h,i){
  var stage=heroAwakening[h.id]||0;
  var d=document.createElement('div');d.className='ah-card'+(stage>=3?' awakened':'');
  d.innerHTML='<div class="ah-icon">'+h.icon+'</div><div class="ah-name">'+h.name+'</div><div class="ah-stage">'+(stage>=3?'★ 최종각성':'☆ '+stage+'/3 단계')+'</div>';
  d.onclick=function(){awakenHero(h.id,i);};
  g.appendChild(d);
 });
}

function awakenHero(id,idx){
 var stage=heroAwakening[id]||0;
 if(stage>=3){toast23('이미 최종 각성!');return;}
 heroAwakening[id]=stage+1;
 localStorage.setItem('krpg_v23_awaken',JSON.stringify(heroAwakening));
 var h=HEROES_AW.find(function(x){return x.id===id;});
 playSfx23('awaken');
 toast23('✨ '+h.name+' → '+h.stages[stage]+' 각성!');
 renderAwakenGrid();drawAwakenChart(idx);
 var total=HEROES_AW.reduce(function(s,x){return s+(heroAwakening[x.id]||0);},0);
 if(total>=6)checkAch23('awaken_6');
 if(total>=18)checkAch23('awaken_master');
}

function drawAwakenChart(idx){
 var cv=document.getElementById('v23-awaken-cv');if(!cv)return;
 var ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
 ctx.clearRect(0,0,W,H);
 ctx.fillStyle='#aa44dd';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 ctx.fillText('영웅 각성 단계',W/2,28);
 HEROES_AW.forEach(function(h,i){
  var stage=heroAwakening[h.id]||0;
  var bw=70,gap=16,sx=(W-HEROES_AW.length*(bw+gap)+gap)/2;
  var x=sx+i*(bw+gap);
  // 3 stage bars
  for(var s=0;s<3;s++){
   var y=H-80-s*50;
   ctx.fillStyle=s<stage?'rgba(170,68,221,.6)':'rgba(60,30,60,.3)';
   ctx.beginPath();ctx.roundRect(x,y,bw,40,4);ctx.fill();
   ctx.strokeStyle=s<stage?'#aa44dd':'#3a1a3a';ctx.lineWidth=1;ctx.stroke();
   ctx.fillStyle=s<stage?'#FFD700':'#5a4a5a';ctx.font='9px sans-serif';ctx.textAlign='center';
   ctx.fillText(h.stages[s],x+bw/2,y+24);
   ctx.fillStyle=s<stage?'#aa44dd':'#4a3a4a';ctx.font='bold 10px sans-serif';
   ctx.fillText(h.power[s],x+bw/2,y+14);
  }
  ctx.fillStyle=i===idx?'#FFD700':'#8a7a6a';ctx.font='10px sans-serif';
  ctx.fillText(h.icon+' '+h.name,x+bw/2,H-30);
 });
}

// ─── 8. 왕조계승시뮬 Canvas 8후보 ───
var CANDIDATES=[
 {id:'c1',name:'태자 나무',icon:'👑',lineage:90,military:60,wisdom:75,charisma:80,support:70,diplomacy:65},
 {id:'c2',name:'왕자 바람',icon:'🌊',lineage:85,military:55,wisdom:80,charisma:70,support:75,diplomacy:80},
 {id:'c3',name:'장군 철산',icon:'⚔️',lineage:40,military:95,wisdom:60,charisma:85,support:80,diplomacy:45},
 {id:'c4',name:'학자 명월',icon:'📚',lineage:30,military:25,wisdom:98,charisma:60,support:55,diplomacy:90},
 {id:'c5',name:'왕비 한빛',icon:'💑',lineage:80,military:30,wisdom:85,charisma:90,support:85,diplomacy:75},
 {id:'c6',name:'재상 그름자',icon:'🎭',lineage:50,military:40,wisdom:70,charisma:95,support:90,diplomacy:85},
 {id:'c7',name:'호족 돌바람',icon:'🌬️',lineage:70,military:65,wisdom:55,charisma:50,support:60,diplomacy:70},
 {id:'c8',name:'신관 별빛',icon:'⭐',lineage:20,military:20,wisdom:92,charisma:75,support:65,diplomacy:60}
];

var crownedCandidate=null;

function openDynasty(){
 playSfx23('dynasty_crown');
 var p=document.getElementById('v23-dynasty-panel');
 if(!p){
  p=document.createElement('div');p.id='v23-dynasty-panel';p.className='v23-panel';
  p.innerHTML='<div class="dynasty-wrap"><h2>👑 왕조계승시뮬</h2><p class="v23-sub">8후보 — 계승점수 6축 분석</p><canvas id="v23-dynasty-cv" width="580" height="360"></canvas><div class="dynasty-candidates" id="v23-dynasty-grid"></div><button class="v23-close" onclick="closeDynasty()">닫기 [ESC]</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 var saved=localStorage.getItem('krpg_v23_dynasty');
 if(saved)crownedCandidate=saved;
 renderDynastyGrid();
 drawDynastyChart(0);
 checkAch23('dynasty_viewer');
}

function closeDynasty(){var p=document.getElementById('v23-dynasty-panel');if(p)p.classList.remove('on');}

function renderDynastyGrid(){
 var g=document.getElementById('v23-dynasty-grid');if(!g)return;
 g.innerHTML='';
 CANDIDATES.forEach(function(c,i){
  var total=c.lineage+c.military+c.wisdom+c.charisma+c.support+c.diplomacy;
  var d=document.createElement('div');d.className='dc-card'+(crownedCandidate===c.id?' crowned':'');
  d.innerHTML='<div class="dc-icon">'+c.icon+'</div><div class="dc-name">'+c.name+'</div><div class="dc-score">계승점수: '+total+'</div>';
  d.onclick=function(){crownCandidate(c.id,i);};
  g.appendChild(d);
 });
}

function crownCandidate(id,idx){
 crownedCandidate=id;
 localStorage.setItem('krpg_v23_dynasty',id);
 var c=CANDIDATES.find(function(x){return x.id===id;});
 playSfx23('dynasty_crown');
 toast23('👑 '+c.name+' 즉위!');
 renderDynastyGrid();drawDynastyChart(idx);
 checkAch23('dynasty_crown');
}

function drawDynastyChart(idx){
 var cv=document.getElementById('v23-dynasty-cv');if(!cv)return;
 var ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
 ctx.clearRect(0,0,W,H);
 var c=CANDIDATES[idx],cx=W/2,cy=H/2+15,R=130;
 var axes=['혈통','무력','지혜','카리스마','지지도','외교'];
 var vals=[c.lineage,c.military,c.wisdom,c.charisma,c.support,c.diplomacy];
 var n=axes.length;
 for(var ring=1;ring<=5;ring++){
  ctx.beginPath();
  for(var i=0;i<=n;i++){
   var ang=-Math.PI/2+i*(Math.PI*2/n);
   var r=R*ring/5;
   if(i===0)ctx.moveTo(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r);
   else ctx.lineTo(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r);
  }
  ctx.strokeStyle='rgba(80,80,40,.2)';ctx.lineWidth=1;ctx.stroke();
 }
 for(var i=0;i<n;i++){
  var ang=-Math.PI/2+i*(Math.PI*2/n);
  ctx.beginPath();ctx.moveTo(cx,cy);
  ctx.lineTo(cx+Math.cos(ang)*R,cy+Math.sin(ang)*R);
  ctx.strokeStyle='rgba(80,80,40,.3)';ctx.stroke();
  var lx=cx+Math.cos(ang)*(R+18),ly=cy+Math.sin(ang)*(R+18);
  ctx.fillStyle='#8a7a6a';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(axes[i],lx,ly);
 }
 ctx.beginPath();
 for(var i=0;i<=n;i++){
  var ang=-Math.PI/2+(i%n)*(Math.PI*2/n);
  var r=vals[i%n]/100*R;
  if(i===0)ctx.moveTo(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r);
  else ctx.lineTo(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r);
 }
 ctx.fillStyle='rgba(187,170,68,.15)';ctx.fill();
 ctx.strokeStyle='#bbaa44';ctx.lineWidth=2;ctx.stroke();
 for(var i=0;i<n;i++){
  var ang=-Math.PI/2+i*(Math.PI*2/n);
  var r=vals[i]/100*R;
  ctx.beginPath();ctx.arc(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r,4,0,Math.PI*2);
  ctx.fillStyle='#FFD700';ctx.fill();
 }
 ctx.fillStyle='#bbaa44';ctx.font='bold 16px sans-serif';ctx.textAlign='center';ctx.textBaseline='alphabetic';
 ctx.fillText(c.icon+' '+c.name,cx,28);
 var total=c.lineage+c.military+c.wisdom+c.charisma+c.support+c.diplomacy;
 ctx.fillStyle='#8a7a6a';ctx.font='11px sans-serif';
 ctx.fillText('계승점수: '+total+'/600',cx,48);
}

// ─── 퀴즈 v23 +15문 (225→240) ───
var QUIZ23=[
 {q:'고조선의 건국 신화에서 환웅이 가져온 천부인 3종은?',a:['천부인, 천부경, 천부방울','검, 창, 방패','천부인, 천부검, 천부창'],c:0},
 {q:'살수대첩에서 수나라 군을 물리친 고구려 장군은?',a:['을지문덕','연개소문','양만춘'],c:0},
 {q:'고구려의 광개토대왕이 세운 비석의 이름은?',a:['광개토대왕릉비','백제사비','단양수경비'],c:0},
 {q:'부여의 대표적인 제천 의식의 이름은?',a:['영고','동맹','무천'],c:0},
 {q:'고조선의 8조법금 중 사형에 해당하는 죄목이 아닌 것은?',a:['도둑질','살인','상해'],c:0},
 {q:'고구려 초기 수도였던 졸본성의 현재 위치는?',a:['중국 럄닝성 환런','평양','경주'],c:0},
 {q:'신라의 화랑도 제도에서 ‘국선’의 의미는?',a:['화랑의 리더','왕의 친위병','신관'],c:0},
 {q:'백제의 건국 설화에서 온조와 함께 남하한 형제는?',a:['비류','부루','해모수'],c:0},
 {q:'가야연맹에서 철기 생산으로 유명했던 국가는?',a:['변한','마한','진한'],c:0},
 {q:'동예의 대표적인 풍습인 ‘무천’은 어떤 행사인가?',a:['추수감사 제천 의식','전쟁 축하 행사','왕의 대관식'],c:0},
 {q:'고조선 후기에 설치된 한사군의 수는?',a:['4군','3군','2군'],c:0},
 {q:'고구려의 방어 시설로 유명한 천리장성의 총 길이는?',a:['약 16km','약 8km','약 25km'],c:0},
 {q:'삼한 중 가장 많은 소국으로 구성된 나라는?',a:['마한(54국)','진한(12국)','변한(12국)'],c:0},
 {q:'환웅의 풍백, 우사, 운사가 관장하는 것은?',a:['바람, 비, 구름','불, 물, 땅','하늘, 땅, 바다'],c:0},
 {q:'고조선의 단군이 도읍으로 정한 아사달의 의미는?',a:['아침의 땅','별의 때','하늘의 도시'],c:0}
];

function openQuiz23(){
 var p=document.getElementById('v23-quiz-panel');
 if(!p){
  p=document.createElement('div');p.id='v23-quiz-panel';p.className='v23-panel';
  p.innerHTML='<div style="max-width:580px;margin:0 auto"><h2>📝 한국사 퀴즈 v23</h2><p class="v23-sub">15문항 (225→240 누적)</p><div id="v23-quiz-area"></div><button class="v23-close" onclick="closeQuiz23()">닫기</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 renderQuiz23(0,0);
}

function closeQuiz23(){var p=document.getElementById('v23-quiz-panel');if(p)p.classList.remove('on');}

function renderQuiz23(idx,score){
 var area=document.getElementById('v23-quiz-area');if(!area)return;
 if(idx>=QUIZ23.length){
  area.innerHTML='<div style="text-align:center;padding:20px"><p style="font-size:18px;color:#FFD700;margin-bottom:12px">퀴즈 완료!</p><p style="font-size:14px;color:#c4956a">'+score+'/'+QUIZ23.length+'문 정답</p></div>';
  var st=JSON.parse(localStorage.getItem('krpg_stats')||'{}');
  st.quizOk=(st.quizOk||0)+score;localStorage.setItem('krpg_stats',JSON.stringify(st));
  if(score>=12)checkAch23('quiz23_12');
  if(score>=15)checkAch23('quiz23_perfect');
  return;
 }
 var q=QUIZ23[idx];
 var html='<div style="padding:16px"><p style="font-size:13px;color:#c4956a;margin-bottom:12px">문제 '+(idx+1)+'/'+QUIZ23.length+'</p><p style="font-size:14px;color:#e8dcc8;margin-bottom:16px;line-height:1.6">'+q.q+'</p>';
 q.a.forEach(function(a,i){
  html+='<button onclick="answerQuiz23('+idx+','+i+','+score+')" style="display:block;width:100%;text-align:left;padding:10px 14px;margin:6px 0;border:1px solid #3a3a4a;border-radius:8px;background:rgba(26,20,40,.6);color:#e8dcc8;font-size:12px;cursor:pointer;font-family:inherit">'+(i+1)+'. '+a+'</button>';
 });
 html+='</div>';
 area.innerHTML=html;
}

function answerQuiz23(idx,ans,score){
 var correct=QUIZ23[idx].c===ans;
 if(correct){score++;playSfx23('weapon_collect');toast23('✅ 정답!');}
 else{playSfx23('treasury_spend');toast23('❌ 오답...');}
 renderQuiz23(idx+1,score);
}

// ─── 업적 v23 +12개 (156→168) ───
var ACH23=[
 {id:'weapon_viewer',name:'무기 수집가',desc:'영웅무기도감 열람'},
 {id:'weapon_6',name:'무기 6종 수집',desc:'6종 무기 수집'},
 {id:'weapon_master',name:'무기의 대가',desc:'전체 12종 무기 수집'},
 {id:'stat_viewer',name:'전투 분석가',desc:'전투통계 대시보드 열람'},
 {id:'battle_10',name:'전쟁의 장군',desc:'10승 달성'},
 {id:'treasury_viewer',name:'재정관리관',desc:'왕국재정관리 열람'},
 {id:'gold_10k',name:'황금만냥자',desc:'금 10,000 달성'},
 {id:'excav_4',name:'탐험가',desc:'4구역 발굴'},
 {id:'excav_master',name:'고고학자',desc:'전체 8구역 발굴'},
 {id:'train_30',name:'군사 교관',desc:'훈련 총레벨 30 달성'},
 {id:'map_6',name:'지도제작자',desc:'6지역 탐험'},
 {id:'awaken_6',name:'각성의 시작',desc:'각성 포인트 6 달성'}
];

function checkAch23(id){
 var ach=JSON.parse(localStorage.getItem('krpg_ach')||'[]');
 if(ach.indexOf(id)>=0)return;
 var a=ACH23.find(function(ac){return ac.id===id;});if(!a)return;
 ach.push(id);localStorage.setItem('krpg_ach',JSON.stringify(ach));
 playSfx23('achieve_v23');toast23('🏆 업적 해금: '+a.name,'#5a3a0a');
}

// ─── 네비게이션 (기존 네비바에 append) ───
function appendNavButtons(){
 var existingNav=document.querySelector('[id$="-bottom-bar"]')||document.querySelector('.v22-bottom-bar')||document.querySelector('[class*="bottom-bar"]');
 if(!existingNav){
  var allBars=document.querySelectorAll('div[style*="position:fixed"][style*="bottom"]');
  if(allBars.length>0)existingNav=allBars[allBars.length-1];
 }
 if(!existingNav){
  existingNav=document.createElement('div');
  existingNav.id='v23-nav-container';
  existingNav.style.cssText='display:flex;gap:4px;justify-content:center;flex-wrap:wrap;padding:8px;margin:12px auto;max-width:600px';
  var gameArea=document.querySelector('.game-container')||document.querySelector('#game')||document.querySelector('[class*="container"]');
  if(gameArea)gameArea.appendChild(existingNav);
  else document.body.appendChild(existingNav);
 }
 var buttons=[
  {label:'⚔️무기',fn:'openWeaponCodex'},
  {label:'📊전투',fn:'openBattleStats'},
  {label:'🏦재정',fn:'openTreasury'},
  {label:'⛏️발굴',fn:'openExcavation'},
  {label:'🏫훈련',fn:'openTraining'},
  {label:'🗺️지도',fn:'openHistoryMap'},
  {label:'✨각성',fn:'openAwakening'},
  {label:'👑계승',fn:'openDynasty'}
 ];
 buttons.forEach(function(b){
  if(document.querySelector('[data-v23-nav="'+b.fn+'"]'))return;
  var btn=document.createElement('button');
  btn.setAttribute('data-v23-nav',b.fn);
  btn.textContent=b.label;
  btn.style.cssText='padding:4px 8px;border:1px solid #3a3a4a;border-radius:4px;background:rgba(26,20,40,.8);color:#c4956a;font-size:9px;cursor:pointer;font-family:inherit';
  btn.onclick=function(){if(window[b.fn])window[b.fn]();};
  existingNav.appendChild(btn);
 });
}

setTimeout(appendNavButtons,1500);

// ─── 키보드 단축키 Shift+G/H/J/K/Z/X/C/V ───
document.addEventListener('keydown',function(e){
 if(!e.shiftKey)return;
 var panels={
  'G':openWeaponCodex,'H':openBattleStats,'J':openTreasury,'K':openExcavation,
  'Z':openTraining,'X':openHistoryMap,'C':openAwakening,'V':openDynasty,
  'g':openWeaponCodex,'h':openBattleStats,'j':openTreasury,'k':openExcavation,
  'z':openTraining,'x':openHistoryMap,'c':openAwakening,'v':openDynasty
 };
 if(panels[e.key]){e.preventDefault();panels[e.key]();}
});

// ─── ESC 닫기 ───
document.addEventListener('keydown',function(e){
 if(e.key==='Escape'){
  ['v23-weapon-panel','v23-bstat-panel','v23-treasury-panel','v23-excav-panel','v23-train-panel','v23-hmap-panel','v23-awaken-panel','v23-dynasty-panel','v23-quiz-panel'].forEach(function(id){
   var p=document.getElementById(id);if(p)p.classList.remove('on');
  });
 }
});

// ─── URL 파라미터 처리 ───
(function(){
 var params=new URLSearchParams(window.location.search);
 var openMap={
  'weaponcodex':openWeaponCodex,'battlestats':openBattleStats,'treasury':openTreasury,
  'excavation':openExcavation,'training':openTraining,'historymap':openHistoryMap,
  'awakening':openAwakening,'dynasty':openDynasty
 };
 var openParam=params.get('open');
 if(openParam&&openMap[openParam])setTimeout(function(){openMap[openParam]();},800);
})();

// ─── 전역 함수 노출 ───
window.openWeaponCodex=openWeaponCodex;
window.closeWeaponCodex=closeWeaponCodex;
window.collectWeapon=collectWeapon;
window.openBattleStats=openBattleStats;
window.closeBattleStats=closeBattleStats;
window.simulateBattle23=simulateBattle23;
window.resetBattleStats=resetBattleStats;
window.openTreasury=openTreasury;
window.closeTreasury=closeTreasury;
window.collectTax=collectTax;
window.tradeGoods=tradeGoods;
window.buildInfra=buildInfra;
window.recruitArmy=recruitArmy;
window.openExcavation=openExcavation;
window.closeExcavation=closeExcavation;
window.digZone=digZone;
window.openTraining=openTraining;
window.closeTraining=closeTraining;
window.trainUnit=trainUnit;
window.openHistoryMap=openHistoryMap;
window.closeHistoryMap=closeHistoryMap;
window.exploreRegion=exploreRegion;
window.openAwakening=openAwakening;
window.closeAwakening=closeAwakening;
window.awakenHero=awakenHero;
window.openDynasty=openDynasty;
window.closeDynasty=closeDynasty;
window.crownCandidate=crownCandidate;
window.openQuiz23=openQuiz23;
window.closeQuiz23=closeQuiz23;
window.answerQuiz23=answerQuiz23;

})();
