// v25_patch.js — 한국사 영웅전 v25.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v25-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:144;overflow-y:auto;padding:16px}',
'.v25-panel.on{display:block}',
'.v25-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v25-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v25-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v25-close:hover{background:#8B2A1A}',
'.v25-toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);padding:8px 20px;border-radius:20px;font-size:11px;font-weight:700;z-index:999;pointer-events:none;animation:v25fade 2s ease forwards}',
'@keyframes v25fade{0%{opacity:0;transform:translate(-50%,-10px)}10%{opacity:1;transform:translate(-50%,0)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-10px)}}',

'.med-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.med-wrap canvas{border:2px solid #2a5a4a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.med-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;max-width:620px;margin:8px auto}',
'.md-card{background:linear-gradient(135deg,rgba(10,20,16,.95),rgba(6,14,10,.98));border:2px solid #2a5a4a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.md-card:hover{border-color:#44ccaa;transform:translateY(-2px)}',
'.md-card.mastered{border-color:#FFD700;background:linear-gradient(135deg,rgba(24,36,16,.9),rgba(18,28,10,.95))}',
'.md-card .md-icon{font-size:26px}',
'.md-card .md-name{font-size:10px;color:#44ccaa;font-weight:700;margin-top:2px}',
'.md-card .md-eff{font-size:8px;color:#8a7a6a;margin-top:2px}',

'.council-wrap{max-width:600px;margin:0 auto;text-align:center}',
'.council-wrap canvas{border:2px solid #5a3a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.cn-agenda{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;max-width:600px;margin:8px auto}',
'.cn-card{background:linear-gradient(135deg,rgba(22,14,10,.95),rgba(16,10,6,.98));border:2px solid #5a3a2a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.cn-card:hover{border-color:#cc7744;transform:translateY(-2px)}',
'.cn-card.resolved{border-color:#FFD700}',
'.cn-card .cn-icon{font-size:24px}',
'.cn-card .cn-name{font-size:10px;color:#cc7744;font-weight:700;margin-top:2px}',

'.natpower-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.natpower-wrap canvas{border:2px solid #3a2a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.np-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.np-btn{padding:5px 12px;border:1px solid #3a2a5a;border-radius:6px;background:#0a0818;color:#8866cc;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.np-btn:hover{border-color:#8866cc}',
'.np-btn.active{border-color:#FFD700;color:#FFD700}',

'.trait-wrap{max-width:600px;margin:0 auto;text-align:center}',
'.trait-wrap canvas{border:2px solid #5a4a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',

'.regiment-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.regiment-wrap canvas{border:2px solid #2a3a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.rg-controls{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.rg-btn{padding:6px 14px;border:1px solid #2a3a5a;border-radius:6px;background:#0a1018;color:#5588cc;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.rg-btn:hover{border-color:#5588cc;background:#101a28}',

'.arch-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.arch-wrap canvas{border:2px solid #4a4a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.ar-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px;max-width:620px;margin:8px auto}',
'.ar-card{background:linear-gradient(135deg,rgba(18,18,10,.95),rgba(12,12,6,.98));border:2px solid #4a4a2a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.ar-card:hover{border-color:#aaaa44;transform:translateY(-2px)}',
'.ar-card.visited{border-color:#FFD700}',
'.ar-card .ar-icon{font-size:26px}',
'.ar-card .ar-name{font-size:10px;color:#aaaa44;font-weight:700;margin-top:2px}',

'.mine-wrap{max-width:600px;margin:0 auto;text-align:center}',
'.mine-wrap canvas{border:2px solid #5a3a1a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.mn-controls{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.mn-btn{padding:6px 14px;border:1px solid #5a3a1a;border-radius:6px;background:#1a1208;color:#cc8844;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.mn-btn:hover{border-color:#cc8844;background:#2a1a10}',

'.heropower-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.heropower-wrap canvas{border:2px solid #5a2a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.hp-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.hp-btn{padding:5px 12px;border:1px solid #5a2a2a;border-radius:6px;background:#180a0a;color:#cc4444;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.hp-btn:hover{border-color:#cc4444}',
'.hp-btn.active{border-color:#FFD700;color:#FFD700}'
].join('\n');
document.head.appendChild(css);

function toast25(msg,bg){
 var t=document.createElement('div');t.className='v25-toast';
 t.style.background=bg||'rgba(20,30,26,.9)';t.style.color='#44ccaa';t.style.border='1px solid #2a5a4a';
 t.textContent=msg;document.body.appendChild(t);
 setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t);},2200);
}

// ─── SFX v25 (Web Audio API) ───
var actx25=null;
function sfx25(type){
 try{
  if(!actx25)actx25=new(window.AudioContext||window.webkitAudioContext)();
  var o=actx25.createOscillator(),g=actx25.createGain();
  o.connect(g);g.connect(actx25.destination);
  var presets={
   med_brew:{f:320,t:'sine',dur:0.3,gv:0.12},
   med_cure:{f:520,t:'sine',dur:0.4,gv:0.15},
   council_vote:{f:280,t:'triangle',dur:0.25,gv:0.1},
   council_resolve:{f:440,t:'sine',dur:0.5,gv:0.14},
   natpower_scan:{f:360,t:'sawtooth',dur:0.2,gv:0.08},
   trait_view:{f:400,t:'triangle',dur:0.3,gv:0.1},
   regiment_drill:{f:220,t:'square',dur:0.15,gv:0.08},
   regiment_form:{f:340,t:'triangle',dur:0.35,gv:0.12},
   arch_explore:{f:480,t:'sine',dur:0.3,gv:0.1},
   mine_dig:{f:180,t:'square',dur:0.2,gv:0.1},
   mine_found:{f:600,t:'sine',dur:0.5,gv:0.15},
   heropower_check:{f:380,t:'triangle',dur:0.25,gv:0.1},
   quiz_v25:{f:550,t:'sine',dur:0.3,gv:0.12},
   quiz_wrong_v25:{f:200,t:'sawtooth',dur:0.4,gv:0.1},
   achieve_v25:{f:660,t:'sine',dur:0.6,gv:0.15}
  };
  var p=presets[type]||presets.med_brew;
  o.type=p.t;o.frequency.value=p.f;
  g.gain.setValueAtTime(p.gv,actx25.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,actx25.currentTime+p.dur);
  o.start();o.stop(actx25.currentTime+p.dur);
 }catch(e){}
}

// ─── 업적 시스템 v25 ───
var ACH25=[
 {id:'v25_healer',name:'궁중의원',desc:'고대의학원 3종 이상 치료 시행',icon:'⚕️'},
 {id:'v25_council_master',name:'합의의달인',desc:'전쟁평의회 5건 이상 결의',icon:'📜'},
 {id:'v25_analyst',name:'국력분석가',desc:'세력국력비교 4세력 이상 비교',icon:'📊'},
 {id:'v25_trait_scout',name:'인재감별사',desc:'영웅특성매트릭스 6영웅 열람',icon:'🔍'},
 {id:'v25_commander',name:'군단편제관',desc:'군사편제관리 3종 이상 편성',icon:'⚔️'},
 {id:'v25_architect',name:'건축고고학자',desc:'고대건축양식 5종 이상 탐방',icon:'🏛️'},
 {id:'v25_miner',name:'광산개척자',desc:'전략자원광산 3회 이상 채굴',icon:'⛏️'},
 {id:'v25_powertrack',name:'전투력추적자',desc:'영웅전투력그래프 확인',icon:'📈'},
 {id:'v25_quiz_clear',name:'v25 퀴즈마스터',desc:'v25 퀴즈 S등급 달성',icon:'🏆'},
 {id:'v25_quiz_pass',name:'v25 퀴즈클리어',desc:'v25 퀴즈 완주',icon:'✅'},
 {id:'v25_multi',name:'만능전략가',desc:'v25 기능 5종 이상 사용',icon:'⭐'},
 {id:'v25_complete',name:'v25 완전정복',desc:'v25 전기능 체험 완료',icon:'👑'}
];

function getAch(){try{return JSON.parse(localStorage.getItem('krpg_ach'))||[];}catch(e){return[];}}
function saveAch(arr){localStorage.setItem('krpg_ach',JSON.stringify(arr));}
function unlockAch25(id){
 var arr=getAch();
 if(arr.indexOf(id)>=0)return;
 arr.push(id);saveAch(arr);
 var a=ACH25.filter(function(x){return x.id===id;})[0];
 if(a)toast25('🏆 '+a.name+' 해금!','rgba(40,32,10,.95)');
 sfx25('achieve_v25');
 try{var st=JSON.parse(localStorage.getItem('krpg_stats'))||{};st.achCount=arr.length;localStorage.setItem('krpg_stats',JSON.stringify(st));}catch(e){}
}

var v25usage={};
function trackUsage25(key){
 v25usage[key]=true;
 var cnt=Object.keys(v25usage).length;
 if(cnt>=5)unlockAch25('v25_multi');
 if(cnt>=8)unlockAch25('v25_complete');
}

// ═══════════════════════════════════════════════════════
// 1. 고대 의학원 Canvas (620x400) — 10종 치료법 효능 6축 Radar
// ═══════════════════════════════════════════════════════
var medData=[
 {name:'침술',icon:'🩺',axes:[85,60,70,90,80,75],desc:'경혈을 자극하여 기혈의 흐름을 조절'},
 {name:'약초',icon:'🌿',axes:[70,90,80,60,85,70],desc:'산야의 약초를 포제하여 병을 치료'},
 {name:'벼침',icon:'🔥',axes:[75,55,65,85,70,80],desc:'열을 가해 혈자리를 자극'},
 {name:'부항',icon:'⭕',axes:[65,50,75,80,65,85],desc:'음압으로 피부에 어혈을 제거'},
 {name:'추나',icon:'🦴',axes:[80,45,60,70,90,65],desc:'그 나라의 비술로 뼈와 관절을 바로잡는 술법'},
 {name:'명상',icon:'🧘',axes:[40,85,95,50,75,90],desc:'정신을 집중하여 몸과 마음을 치유'},
 {name:'식이요법',icon:'🍲',axes:[55,95,85,40,80,60],desc:'음식으로 병을 다스리는 요법'},
 {name:'온천',icon:'♨️',axes:[60,70,90,55,60,95],desc:'벸의 온천수로 몸을 달래는 치료'},
 {name:'주술의례',icon:'🔮',axes:[30,40,50,95,45,80],desc:'근장이 주술로 악귀를 몰아내는 의례'},
 {name:'해독술',icon:'🧪',axes:[90,65,55,75,85,50],desc:'독을 빼내고 해독제를 조제'}
];
var medAxes=['치료력','예방','회복력','부작용','지속성','환자편안'];
var medSel=0,medHistory=[];

function openMedAcademy(){
 trackUsage25('med');sfx25('med_brew');
 var p=document.getElementById('v25-med-panel');
 if(!p){
  p=document.createElement('div');p.id='v25-med-panel';p.className='v25-panel';
  p.innerHTML='<h2>🏥 고대 의학원</h2><p class="v25-sub">10종 치료법 효능 분석 — 6축 Radar</p><div class="med-wrap"><canvas id="v25-med-cv" width="620" height="400"></canvas><div class="med-grid" id="v25-med-grid"></div></div><button class="v25-close" onclick="closeMedAcademy()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var grid=document.getElementById('v25-med-grid');
  medData.forEach(function(m,i){
   var c=document.createElement('div');c.className='md-card';
   c.innerHTML='<div class="md-icon">'+m.icon+'</div><div class="md-name">'+m.name+'</div><div class="md-eff">'+m.desc.substring(0,12)+'...</div>';
   c.onclick=function(){medSel=i;sfx25('med_brew');drawMedRadar();
    medHistory.push(i);var unique=[];medHistory.forEach(function(x){if(unique.indexOf(x)<0)unique.push(x);});
    if(unique.length>=3)unlockAch25('v25_healer');
   };
   grid.appendChild(c);
  });
 }
 p.classList.add('on');drawMedRadar();
}
function closeMedAcademy(){var p=document.getElementById('v25-med-panel');if(p)p.classList.remove('on');}

function drawMedRadar(){
 var cv=document.getElementById('v25-med-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=620,H=400,cx=W/2,cy=H/2+10,R=140;
 c.clearRect(0,0,W,H);
 c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 c.fillStyle='#c4956a';c.font='bold 16px sans-serif';c.textAlign='center';
 c.fillText(medData[medSel].icon+' '+medData[medSel].name+' 효능 분석',cx,28);
 c.fillStyle='#8a7a6a';c.font='11px sans-serif';
 c.fillText(medData[medSel].desc,cx,48);
 var n=6;
 for(var lv=1;lv<=5;lv++){
  c.beginPath();
  for(var i=0;i<=n;i++){
   var a=-Math.PI/2+2*Math.PI*i/n,r=R*lv/5;
   var x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);
   if(i===0)c.moveTo(x,y);else c.lineTo(x,y);
  }
  c.strokeStyle='rgba(42,90,74,'+(0.15+lv*0.06)+')';c.lineWidth=1;c.stroke();
 }
 for(var i=0;i<n;i++){
  var a=-Math.PI/2+2*Math.PI*i/n;
  c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));
  c.strokeStyle='rgba(42,90,74,0.3)';c.stroke();
  var lx=cx+(R+22)*Math.cos(a),ly=cy+(R+22)*Math.sin(a);
  c.fillStyle='#44ccaa';c.font='bold 9px sans-serif';c.textAlign='center';c.textBaseline='middle';
  c.fillText(medAxes[i],lx,ly);
 }
 c.beginPath();
 var vals=medData[medSel].axes;
 for(var i=0;i<=n;i++){
  var idx=i%n,a=-Math.PI/2+2*Math.PI*i/n,r=R*vals[idx]/100;
  var x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);
  if(i===0)c.moveTo(x,y);else c.lineTo(x,y);
 }
 c.fillStyle='rgba(68,204,170,0.2)';c.fill();
 c.strokeStyle='#44ccaa';c.lineWidth=2;c.stroke();
 for(var i=0;i<n;i++){
  var a=-Math.PI/2+2*Math.PI*i/n,r=R*vals[i]/100;
  c.beginPath();c.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),4,0,Math.PI*2);
  c.fillStyle='#44ccaa';c.fill();
  c.fillStyle='#e8dcc8';c.font='bold 10px sans-serif';
  c.fillText(vals[i],cx+r*Math.cos(a),cy+r*Math.sin(a)-10);
 }
 var avg=0;vals.forEach(function(v){avg+=v;});avg=Math.round(avg/n);
 var grade=avg>=80?'S':avg>=65?'A':avg>=50?'B':avg>=35?'C':'D';
 var gc={S:'#FFD700',A:'#44ccaa',B:'#5FA0FF',C:'#cc9944',D:'#cc4444'};
 c.fillStyle=gc[grade];c.font='bold 28px sans-serif';c.fillText(grade,cx,H-30);
 c.fillStyle='#8a7a6a';c.font='11px sans-serif';c.fillText('종합효능 '+avg+'점',cx,H-12);
}

// ═══════════════════════════════════════════════════════
// 2. 전쟁 평의회 Canvas (600x380) — 10안건 투표 결의
// ═══════════════════════════════════════════════════════
var councilAgendas=[
 {name:'선제공격',icon:'⚔️',risk:80,reward:90,desc:'적 영토에 선제 공격을 가한다'},
 {name:'방어강화',icon:'🛡️',risk:30,reward:60,desc:'성벽과 방어시설을 강화한다'},
 {name:'첩보파견',icon:'🕵️',risk:50,reward:70,desc:'첩자를 보내 적의 정보를 수집한다'},
 {name:'외교동맹',icon:'🤝',risk:40,reward:75,desc:'이웃 세력과 동맹을 체결한다'},
 {name:'군비확장',icon:'🏹',risk:55,reward:80,desc:'군대 규모를 확장한다'},
 {name:'교역개방',icon:'🚢',risk:35,reward:65,desc:'교역로를 개방하여 부를 축적한다'},
 {name:'제천의식',icon:'🙏',risk:20,reward:50,desc:'하늘에 제사를 올려 사기를 높인다'},
 {name:'포로사면',icon:'⚖️',risk:45,reward:55,desc:'전쟁 포로를 사면하여 독불장군을 회유한다'},
 {name:'병법개혁',icon:'📖',risk:60,reward:85,desc:'새로운 전술과 병법을 도입한다'},
 {name:'천도',icon:'🌍',risk:70,reward:95,desc:'수도를 전략적 요충지로 이전한다'}
];
var councilVotes={},councilResolved=0;

function openWarCouncil(){
 trackUsage25('council');sfx25('council_vote');
 var p=document.getElementById('v25-council-panel');
 if(!p){
  p=document.createElement('div');p.id='v25-council-panel';p.className='v25-panel';
  p.innerHTML='<h2>🏛️ 전쟁 평의회</h2><p class="v25-sub">10안건 투표 결의 — 위험도/보상 분석</p><div class="council-wrap"><canvas id="v25-council-cv" width="600" height="380"></canvas><div class="cn-agenda" id="v25-cn-grid"></div></div><button class="v25-close" onclick="closeWarCouncil()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var grid=document.getElementById('v25-cn-grid');
  councilAgendas.forEach(function(a,i){
   var c=document.createElement('div');c.className='cn-card';
   c.innerHTML='<div class="cn-icon">'+a.icon+'</div><div class="cn-name">'+a.name+'</div>';
   c.onclick=function(){
    sfx25('council_resolve');
    councilVotes[i]=(councilVotes[i]||0)+1;
    councilResolved++;
    if(councilResolved>=5)unlockAch25('v25_council_master');
    c.classList.add('resolved');
    drawCouncilChart();
    toast25('📜 '+a.name+' 결의 통과!');
   };
   grid.appendChild(c);
  });
 }
 p.classList.add('on');drawCouncilChart();
}
function closeWarCouncil(){var p=document.getElementById('v25-council-panel');if(p)p.classList.remove('on');}

function drawCouncilChart(){
 var cv=document.getElementById('v25-council-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=600,H=380;
 c.clearRect(0,0,W,H);c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 c.fillStyle='#c4956a';c.font='bold 14px sans-serif';c.textAlign='center';
 c.fillText('안건별 위험도 vs 보상 분석',W/2,24);
 var ml=60,mr=30,mt=50,mb=50,cw=W-ml-mr,ch=H-mt-mb;
 c.strokeStyle='#3a3a4a';c.lineWidth=1;
 c.beginPath();c.moveTo(ml,mt);c.lineTo(ml,mt+ch);c.lineTo(ml+cw,mt+ch);c.stroke();
 for(var i=0;i<=5;i++){
  var y=mt+ch-ch*i/5;
  c.beginPath();c.moveTo(ml,y);c.lineTo(ml+cw,y);c.strokeStyle='rgba(58,58,74,0.3)';c.stroke();
  c.fillStyle='#5a5a6a';c.font='9px sans-serif';c.textAlign='right';
  c.fillText((i*20)+'',ml-6,y+3);
 }
 var bw=cw/councilAgendas.length*0.35;
 councilAgendas.forEach(function(a,i){
  var x=ml+cw*(i+0.5)/councilAgendas.length;
  var rh=ch*a.risk/100,rwh=ch*a.reward/100;
  c.fillStyle='rgba(204,68,68,0.7)';c.fillRect(x-bw-1,mt+ch-rh,bw,rh);
  c.fillStyle='rgba(68,204,170,0.7)';c.fillRect(x+1,mt+ch-rwh,bw,rwh);
  c.fillStyle='#8a7a6a';c.font='8px sans-serif';c.textAlign='center';
  c.fillText(a.name.substring(0,4),x,mt+ch+14);
  if(councilVotes[i]){
   c.fillStyle='#FFD700';c.font='bold 10px sans-serif';
   c.fillText('✓',x,mt+ch-Math.max(rh,rwh)-6);
  }
 });
 c.fillStyle='#cc4444';c.font='10px sans-serif';c.textAlign='left';
 c.fillRect(ml+10,H-30,12,10);c.fillText('위험도',ml+26,H-21);
 c.fillStyle='#44ccaa';
 c.fillRect(ml+80,H-30,12,10);c.fillText('보상',ml+96,H-21);
 c.fillStyle='#FFD700';c.fillText('✓ = 결의통과 ('+councilResolved+'건)',ml+140,H-21);
}

// ═══════════════════════════════════════════════════════
// 3. 세력 국력 비교 Canvas (620x400) — 8세력 7축 비교 Bar
// ═══════════════════════════════════════════════════════
var natPowers=[
 {name:'고조선',icon:'⭐',vals:[85,70,90,80,75,65,88]},
 {name:'부여',icon:'🏰',vals:[70,80,65,75,85,60,72]},
 {name:'고구려',icon:'⚔️',vals:[90,85,80,70,90,75,82]},
 {name:'백제',icon:'🚢',vals:[75,65,85,90,70,80,78]},
 {name:'신라',icon:'👑',vals:[65,75,95,85,60,90,80]},
 {name:'가야',icon:'🔥',vals:[60,90,55,65,80,50,68]},
 {name:'옥저',icon:'🌾',vals:[45,50,60,55,40,70,52]},
 {name:'동예',icon:'🌊',vals:[40,55,50,60,35,75,48]}
];
var npAxes=['군사력','경제력','문화력','외교력','기술력','인구','종합국력'];
var npSel=[0,2],npCompared=[];

function openNatPower(){
 trackUsage25('natpower');sfx25('natpower_scan');
 var p=document.getElementById('v25-natpower-panel');
 if(!p){
  p=document.createElement('div');p.id='v25-natpower-panel';p.className='v25-panel';
  p.innerHTML='<h2>📊 세력 국력 비교</h2><p class="v25-sub">8세력 7축 국력 비교 — 듀얼 Radar</p><div class="natpower-wrap"><canvas id="v25-np-cv" width="620" height="400"></canvas><div class="np-tabs" id="v25-np-tabs"></div></div><button class="v25-close" onclick="closeNatPower()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var tabs=document.getElementById('v25-np-tabs');
  natPowers.forEach(function(np,i){
   var b=document.createElement('button');b.className='np-btn'+(npSel.indexOf(i)>=0?' active':'');
   b.textContent=np.icon+' '+np.name;
   b.onclick=function(){
    sfx25('natpower_scan');
    var idx=npSel.indexOf(i);
    if(idx>=0){npSel.splice(idx,1);b.classList.remove('active');}
    else{if(npSel.length>=2)npSel.shift();npSel.push(i);
     var btns=tabs.querySelectorAll('.np-btn');
     for(var j=0;j<btns.length;j++)btns[j].classList.remove('active');
     npSel.forEach(function(s){btns[s].classList.add('active');});
    }
    npCompared.push(i);
    var unique=[];npCompared.forEach(function(x){if(unique.indexOf(x)<0)unique.push(x);});
    if(unique.length>=4)unlockAch25('v25_analyst');
    drawNatPower();
   };
   tabs.appendChild(b);
  });
 }
 p.classList.add('on');drawNatPower();
}
function closeNatPower(){var p=document.getElementById('v25-natpower-panel');if(p)p.classList.remove('on');}

function drawNatPower(){
 var cv=document.getElementById('v25-np-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=620,H=400,cx=W/2,cy=H/2+15,R=140,n=7;
 c.clearRect(0,0,W,H);c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 var title=npSel.map(function(s){return natPowers[s].icon+' '+natPowers[s].name;}).join(' vs ');
 c.fillStyle='#c4956a';c.font='bold 14px sans-serif';c.textAlign='center';
 c.fillText(title,cx,26);
 for(var lv=1;lv<=5;lv++){
  c.beginPath();
  for(var i=0;i<=n;i++){
   var a=-Math.PI/2+2*Math.PI*i/n,r=R*lv/5;
   if(i===0)c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));else c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
  }
  c.strokeStyle='rgba(58,42,90,'+(0.12+lv*0.05)+')';c.lineWidth=1;c.stroke();
 }
 for(var i=0;i<n;i++){
  var a=-Math.PI/2+2*Math.PI*i/n;
  c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));
  c.strokeStyle='rgba(58,42,90,0.3)';c.stroke();
  c.fillStyle='#8866cc';c.font='bold 9px sans-serif';c.textAlign='center';c.textBaseline='middle';
  c.fillText(npAxes[i],cx+(R+24)*Math.cos(a),cy+(R+24)*Math.sin(a));
 }
 var colors=[{f:'rgba(204,68,170,0.2)',s:'#cc44aa'},{f:'rgba(68,170,204,0.2)',s:'#44aacc'}];
 npSel.forEach(function(si,ci){
  var d=natPowers[si];
  c.beginPath();
  for(var i=0;i<=n;i++){
   var idx=i%n,a=-Math.PI/2+2*Math.PI*i/n,r=R*d.vals[idx]/100;
   if(i===0)c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));else c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
  }
  c.fillStyle=colors[ci].f;c.fill();
  c.strokeStyle=colors[ci].s;c.lineWidth=2;c.stroke();
  for(var i=0;i<n;i++){
   var a=-Math.PI/2+2*Math.PI*i/n,r=R*d.vals[i]/100;
   c.beginPath();c.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),3,0,Math.PI*2);
   c.fillStyle=colors[ci].s;c.fill();
  }
 });
 npSel.forEach(function(si,ci){
  var d=natPowers[si];
  c.fillStyle=colors[ci].s;c.font='bold 11px sans-serif';
  c.fillRect(W/2-100+ci*120,H-28,12,12);
  c.fillText(d.icon+' '+d.name+' ('+d.vals[6]+'점)',W/2-84+ci*120,H-18);
 });
}

// ═══════════════════════════════════════════════════════
// 4. 영웅 특성 매트릭스 Canvas (600x400) — 10영웅 8특성 히트맵
// ═══════════════════════════════════════════════════════
var traitHeroes=[
 {name:'단군',traits:[95,60,90,85,70,95,80,90]},
 {name:'환웅',traits:[80,85,75,90,65,80,95,75]},
 {name:'주몽',traits:[90,95,60,70,90,65,70,85]},
 {name:'을지문덕',traits:[85,80,95,75,85,70,65,80]},
 {name:'광개토대왕',traits:[95,90,70,80,95,75,85,90]},
 {name:'금와',traits:[70,75,85,60,65,90,80,70]},
 {name:'해모수',traits:[85,70,65,95,80,60,75,80]},
 {name:'위만',traits:[75,85,80,70,75,55,90,65]},
 {name:'비류',traits:[60,65,70,85,55,80,60,75]},
 {name:'온조',traits:[70,60,80,90,65,85,70,80]}
];
var traitNames=['통솔력','무력','지혜','외교','전투','인덕','재정','카리스마'];
var traitViewed=[];

function openTraitMatrix(){
 trackUsage25('trait');sfx25('trait_view');
 var p=document.getElementById('v25-trait-panel');
 if(!p){
  p=document.createElement('div');p.id='v25-trait-panel';p.className='v25-panel';
  p.innerHTML='<h2>🔍 영웅 특성 매트릭스</h2><p class="v25-sub">10영웅 × 8특성 히트맵 — 셀 클릭 상세보기</p><div class="trait-wrap"><canvas id="v25-trait-cv" width="600" height="400"></canvas></div><button class="v25-close" onclick="closeTraitMatrix()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var cv=document.getElementById('v25-trait-cv');
  cv.onclick=function(e){
   var rect=cv.getBoundingClientRect(),sx=600/rect.width,sy=400/rect.height;
   var mx=(e.clientX-rect.left)*sx,my=(e.clientY-rect.top)*sy;
   var ml=80,mt=50,cw=480,ch=300;
   var col=Math.floor((mx-ml)/(cw/8)),row=Math.floor((my-mt)/(ch/10));
   if(col>=0&&col<8&&row>=0&&row<10){
    sfx25('trait_view');
    if(traitViewed.indexOf(row)<0)traitViewed.push(row);
    if(traitViewed.length>=6)unlockAch25('v25_trait_scout');
    toast25(traitHeroes[row].name+' '+traitNames[col]+': '+traitHeroes[row].traits[col]+'점');
   }
  };
 }
 p.classList.add('on');drawTraitMatrix();
}
function closeTraitMatrix(){var p=document.getElementById('v25-trait-panel');if(p)p.classList.remove('on');}

function drawTraitMatrix(){
 var cv=document.getElementById('v25-trait-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=600,H=400;
 c.clearRect(0,0,W,H);c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 c.fillStyle='#c4956a';c.font='bold 14px sans-serif';c.textAlign='center';
 c.fillText('영웅 특성 히트맵',W/2,24);
 var ml=80,mt=50,cw=480,ch=300,cols=8,rows=10;
 var cellW=cw/cols,cellH=ch/rows;
 traitNames.forEach(function(t,i){
  c.fillStyle='#cc9944';c.font='bold 9px sans-serif';c.textAlign='center';
  c.save();c.translate(ml+cellW*(i+0.5),mt-8);
  c.fillText(t,0,0);c.restore();
 });
 traitHeroes.forEach(function(h,ri){
  c.fillStyle='#e8dcc8';c.font='10px sans-serif';c.textAlign='right';
  c.fillText(h.name,ml-6,mt+cellH*(ri+0.5)+4);
  h.traits.forEach(function(v,ci){
   var x=ml+cellW*ci,y=mt+cellH*ri;
   var ratio=v/100;
   var r=Math.round(40+180*ratio),g=Math.round(60+80*(1-ratio)),b=Math.round(30+40*(1-ratio));
   c.fillStyle='rgb('+r+','+g+','+b+')';
   c.fillRect(x+1,y+1,cellW-2,cellH-2);
   c.fillStyle=v>=70?'#fff':'#ccc';c.font='bold 10px sans-serif';c.textAlign='center';
   c.fillText(v,x+cellW/2,y+cellH/2+4);
  });
 });
}

// ═══════════════════════════════════════════════════════
// 5. 군사 편제 관리 Canvas (620x380) — 8병종 편제/배치
// ═══════════════════════════════════════════════════════
var regiments=[
 {name:'중장보병',icon:'🛡️',atk:60,def:85,spd:40,mor:70,cnt:500},
 {name:'경보병',icon:'🗡️',atk:70,def:50,spd:75,mor:65,cnt:400},
 {name:'철기병',icon:'🐎',atk:90,def:60,spd:95,mor:80,cnt:200},
 {name:'궁병',icon:'🏹',atk:75,def:35,spd:55,mor:60,cnt:300},
 {name:'공성병',icon:'🪨',atk:95,def:30,spd:20,mor:55,cnt:150},
 {name:'척후병',icon:'👁️',atk:45,def:40,spd:90,mor:70,cnt:100},
 {name:'창병',icon:'🔱',atk:80,def:70,spd:50,mor:75,cnt:350},
 {name:'근위병',icon:'⭐',atk:85,def:90,spd:45,mor:95,cnt:80}
];
var regFormed={};

function openRegiment(){
 trackUsage25('regiment');sfx25('regiment_drill');
 var p=document.getElementById('v25-regiment-panel');
 if(!p){
  p=document.createElement('div');p.id='v25-regiment-panel';p.className='v25-panel';
  p.innerHTML='<h2>⚔️ 군사 편제 관리</h2><p class="v25-sub">8병종 편제/배치 — 공/방/속/사기 4축</p><div class="regiment-wrap"><canvas id="v25-reg-cv" width="620" height="380"></canvas><div class="rg-controls" id="v25-rg-ctrl"></div></div><button class="v25-close" onclick="closeRegiment()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var ctrl=document.getElementById('v25-rg-ctrl');
  regiments.forEach(function(r,i){
   var b=document.createElement('button');b.className='rg-btn';
   b.textContent=r.icon+' '+r.name+' 편성';
   b.onclick=function(){
    sfx25('regiment_form');
    regFormed[i]=true;
    var cnt=Object.keys(regFormed).length;
    if(cnt>=3)unlockAch25('v25_commander');
    toast25(r.icon+' '+r.name+' 편성 완료!');
    drawRegimentChart();
   };
   ctrl.appendChild(b);
  });
 }
 p.classList.add('on');drawRegimentChart();
}
function closeRegiment(){var p=document.getElementById('v25-regiment-panel');if(p)p.classList.remove('on');}

function drawRegimentChart(){
 var cv=document.getElementById('v25-reg-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=620,H=380;
 c.clearRect(0,0,W,H);c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 c.fillStyle='#c4956a';c.font='bold 14px sans-serif';c.textAlign='center';
 c.fillText('병종별 전투력 분석',W/2,24);
 var ml=70,mr=20,mt=50,mb=50,cw=W-ml-mr,ch=H-mt-mb;
 c.strokeStyle='#3a3a4a';c.lineWidth=1;
 c.beginPath();c.moveTo(ml,mt);c.lineTo(ml,mt+ch);c.lineTo(ml+cw,mt+ch);c.stroke();
 var axes4=['공격','방어','속도','사기'];
 var colors4=['#cc4444','#5588cc','#44cc88','#cc9944'];
 var bw=cw/regiments.length/5;
 regiments.forEach(function(r,i){
  var x0=ml+cw*(i+0.5)/regiments.length-bw*2;
  var vals=[r.atk,r.def,r.spd,r.mor];
  vals.forEach(function(v,vi){
   var bh=ch*v/100;
   c.fillStyle=colors4[vi];c.globalAlpha=regFormed[i]?1:0.4;
   c.fillRect(x0+bw*vi,mt+ch-bh,bw-1,bh);
  });
  c.globalAlpha=1;
  c.fillStyle='#8a7a6a';c.font='8px sans-serif';c.textAlign='center';
  c.fillText(r.name.substring(0,3),ml+cw*(i+0.5)/regiments.length,mt+ch+14);
  c.fillText(r.cnt+'명',ml+cw*(i+0.5)/regiments.length,mt+ch+26);
  if(regFormed[i]){
   c.fillStyle='#FFD700';c.font='bold 10px sans-serif';
   c.fillText('★',ml+cw*(i+0.5)/regiments.length,mt-4);
  }
 });
 axes4.forEach(function(a,i){
  c.fillStyle=colors4[i];c.font='10px sans-serif';c.textAlign='left';
  c.fillRect(ml+10+i*70,H-22,10,10);c.fillText(a,ml+24+i*70,H-13);
 });
}

// ═══════════════════════════════════════════════════════
// 6. 고대 건축 양식 도감 Canvas (620x400) — 10종 건축양식
// ═══════════════════════════════════════════════════════
var archStyles=[
 {name:'고인돌',icon:'🪨',era:'고조선',vals:[90,30,70,95,40,85]},
 {name:'지상가옥',icon:'🏠',era:'부여',vals:[60,70,80,75,65,70]},
 {name:'반지하가옥',icon:'🏚️',era:'옥저',vals:[55,80,85,70,60,65]},
 {name:'구들가옥',icon:'🛖',era:'고구려',vals:[75,65,60,80,75,80]},
 {name:'산성',icon:'🏔️',era:'고구려',vals:[95,45,50,85,90,90]},
 {name:'궁전',icon:'🏛️',era:'백제',vals:[85,90,95,70,85,75]},
 {name:'불탑',icon:'🗼',era:'신라',vals:[80,85,90,90,70,95]},
 {name:'토성',icon:'🧱',era:'가야',vals:[70,55,45,80,85,60]},
 {name:'방어독',icon:'🏯',era:'고조선',vals:[85,40,55,75,95,70]},
 {name:'제천단',icon:'⛩️',era:'고조선',vals:[70,60,95,90,50,95]}
];
var archAxes=['구조','장식','문화적가치','내구성','군사적가치','상징성'];
var archVisited=[];

function openArchGuide(){
 trackUsage25('arch');sfx25('arch_explore');
 var p=document.getElementById('v25-arch-panel');
 if(!p){
  p=document.createElement('div');p.id='v25-arch-panel';p.className='v25-panel';
  p.innerHTML='<h2>🏛️ 고대 건축 양식 도감</h2><p class="v25-sub">10종 고대 건축양식 6축 Radar 분석</p><div class="arch-wrap"><canvas id="v25-arch-cv" width="620" height="400"></canvas><div class="ar-grid" id="v25-ar-grid"></div></div><button class="v25-close" onclick="closeArchGuide()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var grid=document.getElementById('v25-ar-grid');
  archStyles.forEach(function(a,i){
   var cd=document.createElement('div');cd.className='ar-card';
   cd.innerHTML='<div class="ar-icon">'+a.icon+'</div><div class="ar-name">'+a.name+'</div>';
   cd.onclick=function(){
    sfx25('arch_explore');archSel25=i;
    if(archVisited.indexOf(i)<0)archVisited.push(i);
    if(archVisited.length>=5)unlockAch25('v25_architect');
    cd.classList.add('visited');
    drawArchRadar();
   };
   grid.appendChild(cd);
  });
 }
 p.classList.add('on');drawArchRadar();
}
var archSel25=0;
function closeArchGuide(){var p=document.getElementById('v25-arch-panel');if(p)p.classList.remove('on');}

function drawArchRadar(){
 var cv=document.getElementById('v25-arch-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=620,H=400,cx=W/2,cy=H/2+15,R=140,n=6;
 c.clearRect(0,0,W,H);c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 var a=archStyles[archSel25];
 c.fillStyle='#c4956a';c.font='bold 16px sans-serif';c.textAlign='center';
 c.fillText(a.icon+' '+a.name+' ('+a.era+')',cx,28);
 for(var lv=1;lv<=5;lv++){
  c.beginPath();
  for(var i=0;i<=n;i++){
   var ang=-Math.PI/2+2*Math.PI*i/n,r=R*lv/5;
   if(i===0)c.moveTo(cx+r*Math.cos(ang),cy+r*Math.sin(ang));else c.lineTo(cx+r*Math.cos(ang),cy+r*Math.sin(ang));
  }
  c.strokeStyle='rgba(74,74,42,'+(0.12+lv*0.06)+')';c.lineWidth=1;c.stroke();
 }
 for(var i=0;i<n;i++){
  var ang=-Math.PI/2+2*Math.PI*i/n;
  c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+R*Math.cos(ang),cy+R*Math.sin(ang));
  c.strokeStyle='rgba(74,74,42,0.3)';c.stroke();
  c.fillStyle='#aaaa44';c.font='bold 9px sans-serif';c.textAlign='center';c.textBaseline='middle';
  c.fillText(archAxes[i],cx+(R+24)*Math.cos(ang),cy+(R+24)*Math.sin(ang));
 }
 c.beginPath();
 for(var i=0;i<=n;i++){
  var idx=i%n,ang=-Math.PI/2+2*Math.PI*i/n,r=R*a.vals[idx]/100;
  if(i===0)c.moveTo(cx+r*Math.cos(ang),cy+r*Math.sin(ang));else c.lineTo(cx+r*Math.cos(ang),cy+r*Math.sin(ang));
 }
 c.fillStyle='rgba(170,170,68,0.2)';c.fill();
 c.strokeStyle='#aaaa44';c.lineWidth=2;c.stroke();
 for(var i=0;i<n;i++){
  var ang=-Math.PI/2+2*Math.PI*i/n,r=R*a.vals[i]/100;
  c.beginPath();c.arc(cx+r*Math.cos(ang),cy+r*Math.sin(ang),4,0,Math.PI*2);
  c.fillStyle='#aaaa44';c.fill();
  c.fillStyle='#e8dcc8';c.font='bold 10px sans-serif';
  c.fillText(a.vals[i],cx+r*Math.cos(ang),cy+r*Math.sin(ang)-10);
 }
 var avg=0;a.vals.forEach(function(v){avg+=v;});avg=Math.round(avg/n);
 var grade=avg>=80?'S':avg>=65?'A':avg>=50?'B':avg>=35?'C':'D';
 var gc={S:'#FFD700',A:'#aaaa44',B:'#5FA0FF',C:'#cc9944',D:'#cc4444'};
 c.fillStyle=gc[grade];c.font='bold 26px sans-serif';c.fillText(grade,cx,H-28);
 c.fillStyle='#8a7a6a';c.font='11px sans-serif';c.fillText('종합 '+avg+'점',cx,H-10);
}

// ═══════════════════════════════════════════════════════
// 7. 전략 자원 광산 Canvas (600x380) — 8광산 채굴 시뮬
// ═══════════════════════════════════════════════════════
var mines=[
 {name:'금광',icon:'🥇',resource:'금',yield:15,depth:80,risk:60},
 {name:'철광',icon:'⚙️',resource:'철',yield:30,depth:50,risk:30},
 {name:'동광',icon:'🥉',resource:'동',yield:25,depth:55,risk:35},
 {name:'옥광',icon:'💎',resource:'옥',yield:10,depth:90,risk:70},
 {name:'소금광',icon:'⚡',resource:'소금',yield:20,depth:65,risk:45},
 {name:'석탄광',icon:'⛫',resource:'석탄',yield:40,depth:40,risk:25},
 {name:'은광',icon:'⚪',resource:'은',yield:12,depth:75,risk:55},
 {name:'주사광',icon:'🟥',resource:'주사',yield:18,depth:70,risk:50}
];
var mineCount=0,mineStock={};

function openMineSim(){
 trackUsage25('mine');sfx25('mine_dig');
 var p=document.getElementById('v25-mine-panel');
 if(!p){
  p=document.createElement('div');p.id='v25-mine-panel';p.className='v25-panel';
  p.innerHTML='<h2>⛏️ 전략 자원 광산</h2><p class="v25-sub">8광산 채굴 시뮬레이션 — 수확량/깊이/위험도</p><div class="mine-wrap"><canvas id="v25-mine-cv" width="600" height="380"></canvas><div class="mn-controls" id="v25-mn-ctrl"></div></div><button class="v25-close" onclick="closeMineSim()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var ctrl=document.getElementById('v25-mn-ctrl');
  mines.forEach(function(m,i){
   var b=document.createElement('button');b.className='mn-btn';
   b.textContent=m.icon+' '+m.name+' 채굴';
   b.onclick=function(){
    sfx25('mine_found');mineCount++;
    mineStock[m.resource]=(mineStock[m.resource]||0)+m.yield;
    if(mineCount>=3)unlockAch25('v25_miner');
    toast25(m.icon+' '+m.resource+' +'+m.yield+' 획득!');
    drawMineChart();
   };
   ctrl.appendChild(b);
  });
 }
 p.classList.add('on');drawMineChart();
}
function closeMineSim(){var p=document.getElementById('v25-mine-panel');if(p)p.classList.remove('on');}

function drawMineChart(){
 var cv=document.getElementById('v25-mine-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=600,H=380;
 c.clearRect(0,0,W,H);c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 c.fillStyle='#c4956a';c.font='bold 14px sans-serif';c.textAlign='center';
 c.fillText('광산별 수확량/깊이/위험도 + 보유 재고',W/2,24);
 var ml=70,mr=30,mt=50,mb=60,cw=W-ml-mr,ch=H-mt-mb;
 c.strokeStyle='#3a3a4a';c.lineWidth=1;
 c.beginPath();c.moveTo(ml,mt);c.lineTo(ml,mt+ch);c.lineTo(ml+cw,mt+ch);c.stroke();
 for(var lv=0;lv<=5;lv++){
  var y=mt+ch-ch*lv/5;
  c.beginPath();c.moveTo(ml,y);c.lineTo(ml+cw,y);c.strokeStyle='rgba(58,58,74,0.2)';c.stroke();
  c.fillStyle='#5a5a6a';c.font='9px sans-serif';c.textAlign='right';
  c.fillText((lv*20)+'',ml-6,y+3);
 }
 var bw=cw/mines.length/4;
 mines.forEach(function(m,i){
  var x0=ml+cw*(i+0.5)/mines.length-bw*1.5;
  var vals3=[m.yield*100/40,m.depth,m.risk];
  var cols3=['#cc9944','#5588cc','#cc4444'];
  vals3.forEach(function(v,vi){
   var bh=ch*v/100;
   c.fillStyle=cols3[vi];c.fillRect(x0+bw*vi,mt+ch-bh,bw-1,bh);
  });
  c.fillStyle='#8a7a6a';c.font='8px sans-serif';c.textAlign='center';
  var cx_=ml+cw*(i+0.5)/mines.length;
  c.fillText(m.name.substring(0,3),cx_,mt+ch+14);
  var stock=mineStock[m.resource]||0;
  if(stock>0){c.fillStyle='#FFD700';c.font='bold 9px sans-serif';c.fillText(m.resource+':'+stock,cx_,mt+ch+26);}
 });
 c.fillStyle='#cc9944';c.font='10px sans-serif';c.textAlign='left';
 c.fillRect(ml+10,H-20,10,10);c.fillText('수확량',ml+24,H-11);
 c.fillStyle='#5588cc';c.fillRect(ml+80,H-20,10,10);c.fillText('깊이',ml+94,H-11);
 c.fillStyle='#cc4444';c.fillRect(ml+140,H-20,10,10);c.fillText('위험도',ml+154,H-11);
 c.fillStyle='#FFD700';c.fillText('총 채굴: '+mineCount+'회',ml+220,H-11);
}

// ═══════════════════════════════════════════════════════
// 8. 영웅 전투력 그래프 Canvas (620x380) — 10영웅 전투력 추이
// ═══════════════════════════════════════════════════════
var heroPowerData=[
 {name:'단군',powers:[50,58,65,72,78,85,90,92,95,98]},
 {name:'환웅',powers:[55,62,68,74,80,84,88,91,93,96]},
 {name:'주몽',powers:[40,52,60,70,78,85,92,95,97,99]},
 {name:'을지문덕',powers:[45,55,65,72,80,86,90,93,95,97]},
 {name:'광개토',powers:[48,58,68,76,84,90,94,96,98,100]},
 {name:'금와',powers:[42,50,56,64,70,75,80,84,87,90]},
 {name:'해모수',powers:[46,54,62,68,76,82,86,90,93,95]},
 {name:'위만',powers:[38,48,58,66,74,80,85,88,91,93]},
 {name:'비류',powers:[35,44,52,60,66,72,76,80,83,86]},
 {name:'온조',powers:[36,46,54,62,70,76,80,84,87,90]}
];
var hpColors=['#cc4444','#44ccaa','#cc9944','#5588cc','#FFD700','#8866cc','#cc7744','#44cc88','#aa88ff','#cc44aa'];
var hpSel=[0,2,4];

function openHeroPower(){
 trackUsage25('heropower');sfx25('heropower_check');
 unlockAch25('v25_powertrack');
 var p=document.getElementById('v25-heropower-panel');
 if(!p){
  p=document.createElement('div');p.id='v25-heropower-panel';p.className='v25-panel';
  p.innerHTML='<h2>📈 영웅 전투력 그래프</h2><p class="v25-sub">10영웅 전투력 성장 추이 — 10레벨 라인차트</p><div class="heropower-wrap"><canvas id="v25-hp-cv" width="620" height="380"></canvas><div class="hp-tabs" id="v25-hp-tabs"></div></div><button class="v25-close" onclick="closeHeroPower()">닫기 (ESC)</button>';
  document.body.appendChild(p);
  var tabs=document.getElementById('v25-hp-tabs');
  heroPowerData.forEach(function(h,i){
   var b=document.createElement('button');b.className='hp-btn'+(hpSel.indexOf(i)>=0?' active':'');
   b.textContent=h.name;b.style.color=hpColors[i];b.style.borderColor=hpColors[i]+'88';
   b.onclick=function(){
    sfx25('heropower_check');
    var idx=hpSel.indexOf(i);
    if(idx>=0){hpSel.splice(idx,1);b.classList.remove('active');}
    else{hpSel.push(i);b.classList.add('active');}
    drawHeroPower();
   };
   tabs.appendChild(b);
  });
 }
 p.classList.add('on');drawHeroPower();
}
function closeHeroPower(){var p=document.getElementById('v25-heropower-panel');if(p)p.classList.remove('on');}

function drawHeroPower(){
 var cv=document.getElementById('v25-hp-cv');if(!cv)return;
 var c=cv.getContext('2d'),W=620,H=380;
 c.clearRect(0,0,W,H);c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
 c.fillStyle='#c4956a';c.font='bold 14px sans-serif';c.textAlign='center';
 c.fillText('영웅 전투력 성장 추이',W/2,24);
 var ml=60,mr=20,mt=50,mb=50,cw=W-ml-mr,ch=H-mt-mb,pts=10;
 c.strokeStyle='#3a3a4a';c.lineWidth=1;
 c.beginPath();c.moveTo(ml,mt);c.lineTo(ml,mt+ch);c.lineTo(ml+cw,mt+ch);c.stroke();
 for(var i=0;i<=5;i++){
  var y=mt+ch-ch*i/5;
  c.beginPath();c.moveTo(ml,y);c.lineTo(ml+cw,y);c.strokeStyle='rgba(58,58,74,0.2)';c.stroke();
  c.fillStyle='#5a5a6a';c.font='9px sans-serif';c.textAlign='right';
  c.fillText((i*20)+'',ml-6,y+3);
 }
 for(var i=0;i<pts;i++){
  c.fillStyle='#5a5a6a';c.font='9px sans-serif';c.textAlign='center';
  c.fillText('Lv.'+(i+1),ml+cw*i/(pts-1),mt+ch+16);
 }
 hpSel.forEach(function(si){
  var d=heroPowerData[si];
  c.beginPath();
  d.powers.forEach(function(v,i){
   var x=ml+cw*i/(pts-1),y=mt+ch-ch*v/100;
   if(i===0)c.moveTo(x,y);else c.lineTo(x,y);
  });
  c.strokeStyle=hpColors[si];c.lineWidth=2;c.stroke();
  d.powers.forEach(function(v,i){
   var x=ml+cw*i/(pts-1),y=mt+ch-ch*v/100;
   c.beginPath();c.arc(x,y,3,0,Math.PI*2);c.fillStyle=hpColors[si];c.fill();
  });
  var lx=ml+cw+6,ly=mt+ch-ch*d.powers[pts-1]/100;
  c.fillStyle=hpColors[si];c.font='bold 9px sans-serif';c.textAlign='left';
  c.fillText(d.name,lx,ly);
 });
}

// ═══════════════════════════════════════════════════════
// 퀴즈 v25 (+15문항, 255→270)
// ═══════════════════════════════════════════════════════
var quiz25=[
 {q:'고조선의 건국 신화에서 환웅이 신단수 아래로 내려온 곳은?',a:['태백산','한라산','믐라산','백두산'],c:0},
 {q:'고조선의 8조법금 중 사람을 죽인 자에 대한 처벌은?',a:['사형','유배','벌금','노예'],c:0},
 {q:'비파형동검은 어느 시대의 대표적 청동기 유물인가?',a:['고조선','부여','신라','고려'],c:0},
 {q:'고조선의 수도였던 아사달은 현재 어느 지역으로 추정되는가?',a:['평양','하얼빈','부여','개성'],c:0},
 {q:'부여의 제천 행사인 영고는 몇 월에 열렸는가?',a:['정월(1월)','삼월(3월)','시월(10월)','유월(6월)'],c:2},
 {q:'고구려 광개토대왕비의 특징적인 문자 형태는?',a:['해서체','예서체','행서체','초서체'],c:0},
 {q:'을지문덕이 살수대첩에서 물리친 수나라 장수는?',a:['우중문','창링','우중문','내호아'],c:0},
 {q:'백제의 근초고왕이 해상으로 진출하여 교역한 지역은?',a:['요서','산동','정역미상'],c:2},
 {q:'신라의 화백제도에서 최고 계급인 성골의 성은?',a:['박','석','김','최'],c:2},
 {q:'고조선의 무천력 단군영업이라 하면 국토를 몬 년간 다스렸는가?',a:['1,500년','미상','약 2,000년','약 1,000년'],c:0},
 {q:'부여의 특산물로 유명한 모피 가공품의 재료는?',a:['담비','면','비단','타조'],c:0},
 {q:'고조선 철기 문화의 대표적 유물인 세형동검의 특징은?',a:['좋은 절삭 날','넘은 탈','찼따란 희균이 누라','반달 모양'],c:0},
 {q:'우리나라 최초의 병법서로 알려진 것은?',a:['병학지남','육도삼략','무경총요','천자문'],c:2},
 {q:'고조선의 제천의식에서 하늘의 신을 부르는 말은?',a:['천신','환인','하백','상제'],c:1},
 {q:'진한의 3소국 중 마한이 위치한 지역은?',a:['한반도 중부~남부','동해안','북부','제주도'],c:0}
];
var quiz25State={idx:0,score:0,done:false};

function openQuiz25(){
 var p=document.getElementById('v25-quiz-panel');
 if(!p){
  p=document.createElement('div');p.id='v25-quiz-panel';p.className='v25-panel';
  p.innerHTML='<h2>📝 한국사 퀵즈 v25</h2><p class="v25-sub">15문항 — 고조선/부여/삼국시대 심화</p><div id="v25-quiz-area" style="max-width:500px;margin:0 auto;text-align:center;padding:20px"></div><button class="v25-close" onclick="closeQuiz25()">닫기 (ESC)</button>';
  document.body.appendChild(p);
 }
 quiz25State={idx:0,score:0,done:false};
 p.classList.add('on');renderQuiz25();
}
function closeQuiz25(){var p=document.getElementById('v25-quiz-panel');if(p)p.classList.remove('on');}

function renderQuiz25(){
 var area=document.getElementById('v25-quiz-area');if(!area)return;
 if(quiz25State.done){
  var pct=Math.round(quiz25State.score/quiz25.length*100);
  var grade=pct>=90?'S':pct>=70?'A':pct>=50?'B':pct>=30?'C':'D';
  unlockAch25('v25_quiz_pass');
  if(grade==='S')unlockAch25('v25_quiz_clear');
  area.innerHTML='<h3 style="color:#FFD700;font-size:22px">'+grade+' 등급</h3><p style="color:#e8dcc8;margin:8px 0">'+quiz25State.score+'/'+quiz25.length+' 정답 ('+pct+'%)</p><button class="v25-close" onclick="quiz25State.idx=0;quiz25State.score=0;quiz25State.done=false;renderQuiz25();">다시 풀기</button>';
  try{var st=JSON.parse(localStorage.getItem('krpg_stats'))||{};st.quizOk=(st.quizOk||0)+quiz25State.score;localStorage.setItem('krpg_stats',JSON.stringify(st));}catch(e){}
  return;
 }
 var q=quiz25[quiz25State.idx];
 var html='<p style="color:#FFD700;font-size:12px;margin-bottom:6px">Q'+(quiz25State.idx+1)+'/'+quiz25.length+'</p>';
 html+='<p style="color:#e8dcc8;font-size:14px;margin-bottom:16px;line-height:1.6">'+q.q+'</p>';
 q.a.forEach(function(a,i){
  html+='<button onclick="answerQuiz25('+i+')" style="display:block;width:100%;margin:6px 0;padding:10px;border:1px solid #3a3a4a;border-radius:8px;background:rgba(26,20,40,.8);color:#e8dcc8;font-size:12px;cursor:pointer;font-family:inherit;text-align:left">'+'❶❷❸❹'[i]+' '+a+'</button>';
 });
 area.innerHTML=html;
}
function answerQuiz25(i){
 var q=quiz25[quiz25State.idx];
 if(i===q.c){quiz25State.score++;sfx25('quiz_v25');toast25('✅ 정답!');}
 else{sfx25('quiz_wrong_v25');toast25('❌ 오답! 정답: '+q.a[q.c],'rgba(40,10,10,.95)');}
 quiz25State.idx++;
 if(quiz25State.idx>=quiz25.length)quiz25State.done=true;
 renderQuiz25();
}

// ─── 하단 네비바 버튼 추가 (기존 nav에 append, 신규생성 금지) ───
function appendNavButtons25(){
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
  {label:'🏥의학원',fn:'openMedAcademy'},
  {label:'🏛️평의회',fn:'openWarCouncil'},
  {label:'📊국력비교',fn:'openNatPower'},
  {label:'🔍특성',fn:'openTraitMatrix'},
  {label:'⚔️편제',fn:'openRegiment'},
  {label:'🏛️건축',fn:'openArchGuide'},
  {label:'⛏️광산',fn:'openMineSim'},
  {label:'📈전투력',fn:'openHeroPower'},
  {label:'📝퀵즈v25',fn:'openQuiz25'}
 ];
 btns.forEach(function(b){
  var btn=document.createElement('button');
  btn.textContent=b.label;
  btn.style.cssText='background:rgba(26,20,40,.85);color:#c4956a;border:1px solid #3a3a4a;border-radius:8px;padding:6px 8px;font-size:9px;cursor:pointer;font-family:inherit;margin:2px;';
  btn.onclick=function(){if(window[b.fn])window[b.fn]();};
  existingNav.appendChild(btn);
 });
}

setTimeout(appendNavButtons25,2000);

// ─── 키보드 단축키 Shift+Q/W/E/R/A/S/D/F (v25) ───
document.addEventListener('keydown',function(e){
 if(!e.shiftKey)return;
 var map={
  'Q':openMedAcademy,'W':openWarCouncil,'E':openNatPower,'R':openTraitMatrix,
  'A':openRegiment,'S':openArchGuide,'D':openMineSim,'F':openHeroPower
 };
 if(map[e.key]){e.preventDefault();map[e.key]();}
});

// ─── ESC 닫기 v25 ───
document.addEventListener('keydown',function(e){
 if(e.key==='Escape'){
  ['v25-med-panel','v25-council-panel','v25-natpower-panel','v25-trait-panel','v25-regiment-panel','v25-arch-panel','v25-mine-panel','v25-heropower-panel','v25-quiz-panel'].forEach(function(id){
   var p=document.getElementById(id);if(p)p.classList.remove('on');
  });
 }
});

// ─── URL 파라미터 처리 v25 ───
(function(){
 var params=new URLSearchParams(window.location.search);
 var openMap={
  'medacademy':openMedAcademy,'warcouncil':openWarCouncil,'natpower':openNatPower,
  'traitmatrix':openTraitMatrix,'regiment':openRegiment,'archguide':openArchGuide,
  'minesim':openMineSim,'heropower':openHeroPower,'quiz25':openQuiz25
 };
 var openParam=params.get('open');
 if(openParam&&openMap[openParam])setTimeout(function(){openMap[openParam]();},1200);
})();

// ─── 전역 함수 노출 ───
window.openMedAcademy=openMedAcademy;
window.closeMedAcademy=closeMedAcademy;
window.openWarCouncil=openWarCouncil;
window.closeWarCouncil=closeWarCouncil;
window.openNatPower=openNatPower;
window.closeNatPower=closeNatPower;
window.openTraitMatrix=openTraitMatrix;
window.closeTraitMatrix=closeTraitMatrix;
window.openRegiment=openRegiment;
window.closeRegiment=closeRegiment;
window.openArchGuide=openArchGuide;
window.closeArchGuide=closeArchGuide;
window.openMineSim=openMineSim;
window.closeMineSim=closeMineSim;
window.openHeroPower=openHeroPower;
window.closeHeroPower=closeHeroPower;
window.openQuiz25=openQuiz25;
window.closeQuiz25=closeQuiz25;
window.answerQuiz25=answerQuiz25;

})();
