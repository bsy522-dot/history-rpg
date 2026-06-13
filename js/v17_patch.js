// v17_patch.js — 한국사 영웅전 v17.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v17-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:131;overflow-y:auto;padding:16px}',
'.v17-panel.on{display:block}',
'.v17-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v17-subtitle{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v17-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v17-close:hover{background:#8B2A1A}',
'.v17-tabs{display:flex;gap:4px;max-width:560px;margin:0 auto 12px;flex-wrap:wrap;justify-content:center}',
'.v17-tab{font-size:10px;padding:6px 12px;border:1px solid #3a3a4a;border-radius:6px;background:#2a2438;color:#e8dcc8;cursor:pointer;font-family:inherit;transition:all .2s}',
'.v17-tab.active{border-color:#FFD700;background:#3a3448;color:#FFD700}',
'.v17-canvas-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.v17-canvas-wrap canvas{border:2px solid #3a3a4a;border-radius:8px;background:#0a0a14;display:block;margin:0 auto 12px}',
'.v17-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-width:560px;margin:0 auto}',
'.v17-card{background:rgba(40,30,20,.9);border:2px solid #5a4a3a;border-radius:12px;padding:14px;text-align:center;cursor:pointer;transition:all .3s;position:relative}',
'.v17-card:hover{border-color:#FFD700;transform:translateY(-2px)}',
'.v17-card.done{border-color:#4CAF50;box-shadow:0 0 16px rgba(76,175,80,.2)}',
'.v17-card .vc-icon{font-size:36px;margin-bottom:6px}',
'.v17-card .vc-name{font-size:12px;color:#e8dcc8;font-weight:700}',
'.v17-card .vc-desc{font-size:9px;color:#8a7a6a;margin-top:4px}',
'.v17-card .vc-cost{font-size:9px;color:#FFD700;margin-top:4px}',
'.v17-card .vc-status{font-size:8px;color:#4CAF50;margin-top:4px;font-weight:700}',
'.v17-list-wrap{max-width:560px;margin:0 auto}',
'.v17-list-item{display:flex;align-items:center;gap:10px;background:rgba(20,15,30,.9);border:2px solid #3a3a5a;border-radius:10px;padding:12px;margin-bottom:8px;cursor:pointer;transition:all .3s}',
'.v17-list-item:hover{border-color:#5FA0FF}',
'.v17-list-item.active{border-color:#4CAF50;opacity:.85}',
'.v17-list-item .li-icon{font-size:28px}',
'.v17-list-item .li-info{flex:1}',
'.v17-list-item .li-name{font-size:12px;color:#e8dcc8;font-weight:700}',
'.v17-list-item .li-desc{font-size:10px;color:#8a7a8a;margin-top:2px}',
'.v17-list-item .li-extra{font-size:10px;color:#FFD700}'
].join('\n');
document.head.appendChild(css);

function createV17Panel(id,title,subtitle){
var existing=document.getElementById(id);
if(existing)existing.remove();
var p=document.createElement('div');p.id=id;p.className='v17-panel';
p.innerHTML='<h2>'+title+'</h2><p class="v17-subtitle">'+subtitle+'</p>';
document.body.appendChild(p);return p;
}

// ─── Toast ───
function v17Toast(msg,color){
var t=document.createElement('div');
t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:'+(color||'#333')+';color:#fff;padding:10px 20px;border-radius:20px;font-size:12px;z-index:9999;pointer-events:none;opacity:0;transition:opacity .3s;max-width:300px;text-align:center';
t.textContent=msg;document.body.appendChild(t);
requestAnimationFrame(function(){t.style.opacity='1'});
setTimeout(function(){t.style.opacity='0';setTimeout(function(){t.remove()},300)},2500);
}

// ─── SFX (10 types) ───
var actx=null;
function getAudioCtx(){if(!actx){actx=new(window.AudioContext||window.webkitAudioContext)();}return actx;}

function v17SFX(type){
try{
var ac=getAudioCtx();var osc=ac.createOscillator();var g=ac.createGain();
osc.connect(g);g.connect(ac.destination);g.gain.value=0.12;
var presets={
research:{f:659.25,t:'triangle',d:0.4},
lineage:{f:523.25,t:'sine',d:0.3},
council:{f:440,t:'triangle',d:0.35},
territory:{f:329.63,t:'sine',d:0.3},
season:{f:392,t:'triangle',d:0.25},
legend:{f:783.99,t:'sine',d:0.5},
tactic:{f:587.33,t:'triangle',d:0.3},
ruin:{f:493.88,t:'sine',d:0.4},
quiz_v17:{f:698.46,t:'sine',d:0.3},
ach_v17:{f:1046.5,t:'sine',d:0.5}
};
var p=presets[type]||{f:440,t:'sine',d:0.2};
osc.type=p.t;osc.frequency.value=p.f;
g.gain.setValueAtTime(0.12,ac.currentTime);
g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+p.d);
osc.start(ac.currentTime);osc.stop(ac.currentTime+p.d);
}catch(e){}
}

// ─── Achievements (12 new: 84→96) ───
var V17_ACH=[
{id:'researcher',name:'첫 기술 연구',desc:'기술 1개 연구 완료',icon:'🔬'},
{id:'tech_master',name:'기술의 완성',desc:'전체 기술 연구 완료',icon:'⚙️'},
{id:'historian',name:'역사 탐구자',desc:'왕계 3명 이상 확인',icon:'📜'},
{id:'politician',name:'정치가',desc:'신하 4명 이상 임명',icon:'🏛️'},
{id:'conqueror',name:'정복자',desc:'영토 4개 이상 점령',icon:'⚔️'},
{id:'world_ruler',name:'천하통일',desc:'전체 영토 점령',icon:'👑'},
{id:'lore_keeper',name:'설화 수집가',desc:'설화 6개 이상 수집',icon:'📖'},
{id:'strategist',name:'전략가',desc:'전술 4개 이상 습득',icon:'🗡️'},
{id:'explorer',name:'유적 탐험가',desc:'유적 1개 탐사 완료',icon:'🏚️'},
{id:'ruin_master',name:'고고학자',desc:'전체 유적 탐사 완료',icon:'⚱️'},
{id:'season_master',name:'사계의 달인',desc:'모든 계절을 경험',icon:'🌸'},
{id:'v17_complete',name:'v17 정복자',desc:'v17 모든 기능 체험',icon:'🚀'}
];

var v17AchProgress=[];
function loadV17Ach(){v17AchProgress=JSON.parse(localStorage.getItem('kRPG_v17ach')||'[]');}
function saveV17Ach(){localStorage.setItem('kRPG_v17ach',JSON.stringify(v17AchProgress));}

function v17CheckAch(achId){
if(v17AchProgress.indexOf(achId)>=0)return;
var ach=V17_ACH.find(function(a){return a.id===achId});if(!ach)return;
v17AchProgress.push(achId);saveV17Ach();
v17SFX('ach_v17');
v17Toast('🏆 업적 해금: '+ach.name,'#FFD700');
var globalAch=JSON.parse(localStorage.getItem('krpg_ach')||'[]');
if(globalAch.indexOf('v17_'+achId)<0){globalAch.push('v17_'+achId);localStorage.setItem('krpg_ach',JSON.stringify(globalAch));}
}

function v17CheckAchOnce(achId){
if(v17AchProgress.indexOf(achId)<0)v17CheckAch(achId);
}

// ─── 1. Technology Research Tree (12 techs, Canvas 520x300) ───
var TECHS=[
{id:'agriculture',name:'농경기술',icon:'🌾',era:1,cost:200,desc:'식량 생산 +30%',prereq:null,cat:'economy'},
{id:'bronze_cast',name:'청동 주조',icon:'🔔',era:1,cost:250,desc:'청동 무기 해금',prereq:null,cat:'military'},
{id:'astronomy',name:'천문 역법',icon:'⭐',era:1,cost:300,desc:'계절 예측 가능',prereq:null,cat:'culture'},
{id:'irrigation',name:'관개 수로',icon:'💧',era:2,cost:350,desc:'가뭄 피해 -50%',prereq:'agriculture',cat:'economy'},
{id:'iron_smelt',name:'철기 제련',icon:'⚒️',era:2,cost:400,desc:'철제 무기/갑옷 해금, 공격 +20%',prereq:'bronze_cast',cat:'military'},
{id:'medicine',name:'약초 의학',icon:'🌿',era:2,cost:300,desc:'전투 후 HP 회복 +25%',prereq:'agriculture',cat:'culture'},
{id:'horse_breed',name:'기마술',icon:'🐎',era:2,cost:450,desc:'기병 이동력 +2',prereq:'bronze_cast',cat:'military'},
{id:'fortify',name:'축성술',icon:'🏰',era:3,cost:500,desc:'성벽 방어 +40%',prereq:'iron_smelt',cat:'military'},
{id:'writing',name:'문자 체계',icon:'📜',era:3,cost:400,desc:'외교 성공률 +20%',prereq:'astronomy',cat:'culture'},
{id:'navigation',name:'항해술',icon:'⛵',era:3,cost:450,desc:'해상 교역로 해금',prereq:'irrigation',cat:'economy'},
{id:'steel',name:'강철 제련',icon:'⚔️',era:4,cost:600,desc:'최강 무기 해금, 공격 +35%',prereq:'iron_smelt',cat:'military'},
{id:'philosophy',name:'홍익인간',icon:'💡',era:4,cost:550,desc:'전체 능력 +15%, 외교 +30',prereq:'writing',cat:'culture'}
];

var researchedTech=[];
function loadTech(){researchedTech=JSON.parse(localStorage.getItem('kRPG_tech')||'[]');}
function saveTech(){localStorage.setItem('kRPG_tech',JSON.stringify(researchedTech));}

function techNodePos(tech){
var eraX={1:60,2:180,3:320,4:460};
var baseX=eraX[tech.era]||60;
var sameEra=TECHS.filter(function(t){return t.era===tech.era});
var idx=sameEra.indexOf(tech);
var spacing=300/Math.max(sameEra.length,1);
var baseY=50+idx*spacing/(sameEra.length>1?1:1);
if(sameEra.length===1)baseY=150;
else if(sameEra.length===2)baseY=80+idx*140;
else baseY=40+idx*80;
return{x:baseX,y:baseY};
}

function researchTech(techId){
var tech=TECHS.find(function(t){return t.id===techId});
if(!tech)return;
if(researchedTech.indexOf(techId)>=0){v17Toast('이미 연구 완료!','#FF9800');return;}
if(tech.prereq&&researchedTech.indexOf(tech.prereq)<0){v17Toast('선행 기술을 먼저 연구하세요!','#F44336');return;}
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
if((state.gold||0)<tech.cost){v17Toast('금화 부족! ('+tech.cost+' 필요)','#F44336');return;}
state.gold=(state.gold||0)-tech.cost;
localStorage.setItem('kRPG_state',JSON.stringify(state));
researchedTech.push(techId);
saveTech();
v17SFX('research');
v17Toast('🔬 '+tech.name+' 연구 완료!','#2196F3');
v17CheckAchOnce('researcher');
if(researchedTech.length>=TECHS.length)v17CheckAch('tech_master');
renderTechPanel();document.getElementById('v17-tech').classList.add('on');
}

function renderTechPanel(){
var p=createV17Panel('v17-tech','🔬 기술 연구 트리','고조선의 기술을 발전시키세요');
var wrap=document.createElement('div');wrap.className='v17-canvas-wrap';
var cvs=document.createElement('canvas');cvs.width=520;cvs.height=300;wrap.appendChild(cvs);p.appendChild(wrap);
var ctx=cvs.getContext('2d');

// draw connections
TECHS.forEach(function(tech){
if(tech.prereq){
var parent=TECHS.find(function(t){return t.id===tech.prereq});
if(parent){
var pp=techNodePos(parent),tp=techNodePos(tech);
ctx.beginPath();ctx.moveTo(pp.x+30,pp.y);ctx.lineTo(tp.x-30,tp.y);
ctx.strokeStyle=researchedTech.indexOf(tech.id)>=0?'#4CAF50':'#3a3a4a';ctx.lineWidth=2;ctx.stroke();
var mx=(pp.x+tp.x)/2,my=(pp.y+tp.y)/2;
ctx.beginPath();ctx.moveTo(mx,my-4);ctx.lineTo(mx-4,my+4);ctx.lineTo(mx+4,my+4);ctx.closePath();
ctx.fillStyle=researchedTech.indexOf(tech.id)>=0?'#4CAF50':'#5a5a6a';ctx.fill();
}
}
});

// draw nodes
TECHS.forEach(function(tech){
var pos=techNodePos(tech);
var researched=researchedTech.indexOf(tech.id)>=0;
var available=!tech.prereq||researchedTech.indexOf(tech.prereq)>=0;
ctx.beginPath();ctx.roundRect(pos.x-30,pos.y-22,60,44,8);
ctx.fillStyle=researched?'rgba(30,60,30,.95)':available?'rgba(26,20,40,.95)':'rgba(20,15,25,.6)';
ctx.fill();
var catColor={economy:'#4CAF50',military:'#F44336',culture:'#9C27B0'};
ctx.strokeStyle=researched?'#4CAF50':available?(catColor[tech.cat]||'#FFD700'):'#3a3a4a';ctx.lineWidth=2;ctx.stroke();
ctx.fillStyle='#fff';ctx.font='16px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(tech.icon,pos.x,pos.y-5);
ctx.fillStyle=researched?'#4CAF50':'#e8dcc8';ctx.font='bold 8px sans-serif';
ctx.fillText(tech.name,pos.x,pos.y+12);
if(researched){ctx.fillStyle='#4CAF50';ctx.font='bold 8px sans-serif';ctx.fillText('✓',pos.x+24,pos.y-14);}
else if(available){ctx.fillStyle='#FFD700';ctx.font='7px sans-serif';ctx.fillText(tech.cost+'금',pos.x,pos.y+22);}
});

// era labels
ctx.fillStyle='#6a5a4a';ctx.font='bold 9px sans-serif';ctx.textAlign='center';
[{x:60,l:'1시대'},{x:180,l:'2시대'},{x:320,l:'3시대'},{x:460,l:'4시대'}].forEach(function(e){
ctx.fillText(e.l,e.x,292);
});

cvs.onclick=function(e){
var rect=cvs.getBoundingClientRect();
var mx=(e.clientX-rect.left)*(cvs.width/rect.width);
var my=(e.clientY-rect.top)*(cvs.height/rect.height);
TECHS.forEach(function(tech){
var pos=techNodePos(tech);
if(Math.abs(mx-pos.x)<30&&Math.abs(my-pos.y)<22){researchTech(tech.id);}
});
};

p.innerHTML+='<p class="v17-subtitle">연구완료: '+researchedTech.length+'/'+TECHS.length+' &mdash; 기술 노드를 클릭하면 연구합니다</p>';
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-tech\').classList.remove(\'on\')">닫기</button>';
}

// ─── 2. Royal Lineage System (12 rulers, Canvas 520x310) ───
var LINEAGE=[
{id:'hwanin',name:'환인(桓因)',icon:'☀️',era:'상고시대',title:'하늘의 왕 천제',period:'신화시대',bonus:'전체 복 +10%'},
{id:'hwanung',name:'환웅(桓雄)',icon:'⛅',era:'상고시대',title:'풍백 우사 운사',period:'신화시대',bonus:'날씨 제어'},
{id:'dangun',name:'단군왕검',icon:'👑',era:'BC 2333',title:'고조선 건국자',period:'BC 2333 ~ BC 1286',bonus:'전체 능력 +15%'},
{id:'dangun2',name:'부루',icon:'🏛️',era:'BC 1286',title:'치수법 전수',period:'BC 1286 ~ ?',bonus:'건축 +20%'},
{id:'dangun3',name:'가륵',icon:'📜',era:'초기 고조선',title:'가림토 문자',period:'초기',bonus:'문화 +25%'},
{id:'dangun8',name:'우서한',icon:'⚔️',era:'중기 고조선',title:'군사 개혁',period:'중기',bonus:'군사 +20%'},
{id:'dangun22',name:'색블루',icon:'🌾',era:'중기 고조선',title:'농업 진흥',period:'중기',bonus:'식량 +30%'},
{id:'dangun44',name:'구물',icon:'🏰',era:'후기 고조선',title:'장당경 천도',period:'후기',bonus:'방어 +25%'},
{id:'dangun47',name:'고열가',icon:'🔚',era:'BC 238',title:'마지막 단군',period:'BC 295 ~ BC 238',bonus:'경험치 +20%'},
{id:'wiman',name:'위만',icon:'⚡',era:'BC 194',title:'왕위 찬탈',period:'BC 194 ~ ?',bonus:'첩보 +30%'},
{id:'ugeo',name:'우거왕',icon:'🛡️',era:'BC 128',title:'한 무제 항전',period:'BC 128 ~ BC 108',bonus:'방어 +35%'},
{id:'buyeo_king',name:'해모수',icon:'🌅',era:'BC 86',title:'북부여 시조',period:'BC 86 ~ ?',bonus:'카리스마 +25%'}
];

var lineageViewed=[];
function loadLineage(){lineageViewed=JSON.parse(localStorage.getItem('kRPG_lineage')||'[]');}
function saveLineage(){localStorage.setItem('kRPG_lineage',JSON.stringify(lineageViewed));}

function viewLineage(rulerId){
if(lineageViewed.indexOf(rulerId)<0){
lineageViewed.push(rulerId);
saveLineage();
v17SFX('lineage');
v17Toast('📜 왕계 확인: '+LINEAGE.find(function(r){return r.id===rulerId}).name,'#FF9800');
if(lineageViewed.length>=3)v17CheckAchOnce('historian');
}
}

function renderLineagePanel(){
var p=createV17Panel('v17-lineage','👑 왕계도','고조선 역대 왕의 계보를 확인하세요');
var wrap=document.createElement('div');wrap.className='v17-canvas-wrap';
var cvs=document.createElement('canvas');cvs.width=520;cvs.height=310;wrap.appendChild(cvs);p.appendChild(wrap);
var ctx=cvs.getContext('2d');

var cols=4,rows=3;
LINEAGE.forEach(function(ruler,i){
var col=i%cols,row=Math.floor(i/cols);
var cx=65+col*130,cy=55+row*95;

// connection to next
if(i<LINEAGE.length-1){
var nc=(i+1)%cols,nr=Math.floor((i+1)/cols);
var nx=65+nc*130,ny=55+nr*95;
ctx.beginPath();ctx.strokeStyle='#5a4a3a';ctx.lineWidth=1;ctx.setLineDash([4,3]);
ctx.moveTo(cx+20,cy);ctx.lineTo(nx-20,ny);ctx.stroke();ctx.setLineDash([]);
}

var viewed=lineageViewed.indexOf(ruler.id)>=0;
ctx.beginPath();ctx.arc(cx,cy,24,0,Math.PI*2);
ctx.fillStyle=viewed?'rgba(30,50,30,.9)':'rgba(26,20,40,.9)';ctx.fill();
ctx.strokeStyle=viewed?'#4CAF50':'#FFD700';ctx.lineWidth=2;ctx.stroke();

ctx.fillStyle='#fff';ctx.font='18px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(ruler.icon,cx,cy-3);
ctx.fillStyle=viewed?'#4CAF50':'#e8dcc8';ctx.font='bold 8px sans-serif';
ctx.fillText(ruler.name.split('(')[0],cx,cy+18);
ctx.fillStyle='#6a5a4a';ctx.font='7px sans-serif';
ctx.fillText(ruler.era,cx,cy+28);
});

cvs.onclick=function(e){
var rect=cvs.getBoundingClientRect();
var mx=(e.clientX-rect.left)*(cvs.width/rect.width);
var my=(e.clientY-rect.top)*(cvs.height/rect.height);
LINEAGE.forEach(function(ruler,i){
var col=i%cols,row=Math.floor(i/cols);
var cx=65+col*130,cy=55+row*95;
if(Math.sqrt(Math.pow(mx-cx,2)+Math.pow(my-cy,2))<24){
viewLineage(ruler.id);
renderLineagePanel();document.getElementById('v17-lineage').classList.add('on');
}
});
};

p.innerHTML+='<p class="v17-subtitle">확인: '+lineageViewed.length+'/'+LINEAGE.length+' &mdash; 왕을 클릭하면 상세 정보가 표시됩니다</p>';
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-lineage\').classList.remove(\'on\')">닫기</button>';
}

// ─── 3. Court Council System (8 ministers) ───
var MINISTERS=[
{id:'prime',name:'국상(國相)',icon:'🏛️',role:'총리',effect:'전체 효율 +10%',loyalty:80},
{id:'general',name:'대장군',icon:'⚔️',role:'군사 총사령관',effect:'군사력 +25%',loyalty:70},
{id:'treasurer',name:'대사농',icon:'💰',role:'재정 담당',effect:'세수 +20%',loyalty:75},
{id:'diplomat',name:'사신',icon:'🤝',role:'외교 담당',effect:'외교 성공률 +25%',loyalty:65},
{id:'scholar',name:'태학박사',icon:'📖',role:'교육/문화',effect:'연구 속도 +30%',loyalty:85},
{id:'spy_chief',name:'첩보대장',icon:'🕵️',role:'첩보/정보',effect:'첩보 성공률 +20%',loyalty:55},
{id:'priest_m',name:'대무(大巫)',icon:'🔮',role:'제사/의례',effect:'제사 효과 +25%',loyalty:90},
{id:'builder',name:'대장장이',icon:'🔨',role:'건축/제조',effect:'건축 속도 +30%',loyalty:80}
];

var appointedMinisters=[];
function loadCourt(){appointedMinisters=JSON.parse(localStorage.getItem('kRPG_court')||'[]');}
function saveCourt(){localStorage.setItem('kRPG_court',JSON.stringify(appointedMinisters));}

function appointMinister(mId){
var minister=MINISTERS.find(function(m){return m.id===mId});if(!minister)return;
if(appointedMinisters.indexOf(mId)>=0){v17Toast('이미 임명됨!','#FF9800');return;}
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
var cost=100;
if((state.gold||0)<cost){v17Toast('금화 부족! ('+cost+' 필요)','#F44336');return;}
state.gold=(state.gold||0)-cost;
localStorage.setItem('kRPG_state',JSON.stringify(state));
appointedMinisters.push(mId);
saveCourt();
v17SFX('council');
v17Toast('🏛️ '+minister.name+' 임명 완료!','#9C27B0');
if(appointedMinisters.length>=4)v17CheckAchOnce('politician');
renderCourtPanel();document.getElementById('v17-court').classList.add('on');
}

function renderCourtPanel(){
var p=createV17Panel('v17-court','🏛️ 조정 회의','신하를 임명하고 조정을 운영하세요');
var grid=document.createElement('div');grid.className='v17-grid';
MINISTERS.forEach(function(m){
var appointed=appointedMinisters.indexOf(m.id)>=0;
var card=document.createElement('div');card.className='v17-card'+(appointed?' done':'');
card.innerHTML='<div class="vc-icon">'+m.icon+'</div><div class="vc-name">'+m.name+'</div><div class="vc-desc">'+m.role+'</div><div class="vc-desc">'+m.effect+'</div><div class="vc-cost">'+(appointed?'':'100 금화')+'</div>'+(appointed?'<div class="vc-status">✓ 임명됨 (충성:'+m.loyalty+')</div>':'<div class="vc-desc">충성도: '+m.loyalty+'</div>');
if(!appointed){card.onclick=(function(id){return function(){appointMinister(id);};})(m.id);}
grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<p class="v17-subtitle">임명: '+appointedMinisters.length+'/'+MINISTERS.length+'</p>';
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-court\').classList.remove(\'on\')">닫기</button>';
}

// ─── 4. Territory Expansion Map (8 regions, Canvas 520x320) ───
var TERRITORIES=[
{id:'asadal',name:'아사달',icon:'🏛️',x:260,y:80,color:'#FFD700',pop:5000,def:80},
{id:'liaodong',name:'요동',icon:'⚔️',x:120,y:60,color:'#4CAF50',pop:3000,def:60},
{id:'pyongyang',name:'평양',icon:'🏰',x:300,y:120,color:'#2196F3',pop:4000,def:70},
{id:'hanban',name:'한반도 중부',icon:'🌳',x:320,y:180,color:'#FF9800',pop:2500,def:50},
{id:'manchuria',name:'만주',icon:'🏔️',x:180,y:40,color:'#9C27B0',pop:2000,def:55},
{id:'east_sea',name:'동해안',icon:'🌊',x:400,y:140,color:'#00BCD4',pop:1500,def:40},
{id:'south',name:'남방(삼한)',icon:'🌾',x:300,y:250,color:'#8BC34A',pop:3500,def:45},
{id:'jeju',name:'탐라',icon:'🌴',x:260,y:290,color:'#FF5722',pop:800,def:30}
];

var ADJACENCY={
asadal:['liaodong','pyongyang','manchuria'],
liaodong:['asadal','manchuria'],
pyongyang:['asadal','hanban','east_sea'],
hanban:['pyongyang','south','east_sea'],
manchuria:['asadal','liaodong'],
east_sea:['pyongyang','hanban'],
south:['hanban','jeju'],
jeju:['south']
};

var conqueredTerr=[];
function loadTerr(){conqueredTerr=JSON.parse(localStorage.getItem('kRPG_terr')||'["asadal"]');}
function saveTerr(){localStorage.setItem('kRPG_terr',JSON.stringify(conqueredTerr));}

function conquerTerritory(tId){
var terr=TERRITORIES.find(function(t){return t.id===tId});if(!terr)return;
if(conqueredTerr.indexOf(tId)>=0){v17Toast('이미 점령한 영토!','#FF9800');return;}
var adj=ADJACENCY[tId]||[];
var reachable=adj.some(function(a){return conqueredTerr.indexOf(a)>=0;});
if(!reachable){v17Toast('인접 영토를 먼저 점령하세요!','#F44336');return;}
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
var cost=terr.def*5;
if((state.gold||0)<cost){v17Toast('금화 부족! ('+cost+' 필요)','#F44336');return;}
state.gold=(state.gold||0)-cost;
localStorage.setItem('kRPG_state',JSON.stringify(state));
conqueredTerr.push(tId);
saveTerr();
v17SFX('territory');
v17Toast('⚔️ '+terr.name+' 점령!','#4CAF50');
if(conqueredTerr.length>=4)v17CheckAchOnce('conqueror');
if(conqueredTerr.length>=TERRITORIES.length)v17CheckAch('world_ruler');
renderTerrPanel();document.getElementById('v17-terr').classList.add('on');
}

function renderTerrPanel(){
var p=createV17Panel('v17-terr','🗺️ 영토 확장','고조선의 영토를 넓혀가세요');
var wrap=document.createElement('div');wrap.className='v17-canvas-wrap';
var cvs=document.createElement('canvas');cvs.width=520;cvs.height=320;wrap.appendChild(cvs);p.appendChild(wrap);
var ctx=cvs.getContext('2d');

ctx.fillStyle='#0d1117';ctx.fillRect(0,0,520,320);
ctx.strokeStyle='#1a2a3a';ctx.lineWidth=1;
for(var gx=0;gx<520;gx+=40){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,320);ctx.stroke();}
for(var gy=0;gy<320;gy+=40){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(520,gy);ctx.stroke();}

// draw adjacency lines
Object.keys(ADJACENCY).forEach(function(fromId){
var from=TERRITORIES.find(function(t){return t.id===fromId});
if(!from)return;
ADJACENCY[fromId].forEach(function(toId){
var to=TERRITORIES.find(function(t){return t.id===toId});
if(!to)return;
ctx.beginPath();ctx.setLineDash([4,4]);
var bothOwned=conqueredTerr.indexOf(fromId)>=0&&conqueredTerr.indexOf(toId)>=0;
ctx.strokeStyle=bothOwned?'#4CAF5066':'#3a3a4a44';ctx.lineWidth=1;
ctx.moveTo(from.x,from.y);ctx.lineTo(to.x,to.y);ctx.stroke();ctx.setLineDash([]);
});
});

TERRITORIES.forEach(function(t){
var owned=conqueredTerr.indexOf(t.id)>=0;
ctx.beginPath();ctx.arc(t.x,t.y,28,0,Math.PI*2);
var grad=ctx.createRadialGradient(t.x,t.y,0,t.x,t.y,28);
grad.addColorStop(0,(owned?t.color:'#555')+'66');grad.addColorStop(1,(owned?t.color:'#333')+'22');
ctx.fillStyle=grad;ctx.fill();
ctx.strokeStyle=owned?t.color:'#555';ctx.lineWidth=owned?3:1;ctx.stroke();
ctx.fillStyle='#fff';ctx.font='18px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(t.icon,t.x,t.y-6);
ctx.fillStyle=owned?t.color:'#888';ctx.font='bold 9px sans-serif';
ctx.fillText(t.name,t.x,t.y+12);
ctx.fillStyle='#6a6a6a';ctx.font='7px sans-serif';
ctx.fillText('인구:'+t.pop+' 방어:'+t.def,t.x,t.y+22);
});

ctx.fillStyle='#e8dcc8';ctx.font='bold 12px sans-serif';ctx.textAlign='left';
ctx.fillText('🗺️ 고조선 영토 확장도',10,16);

cvs.onclick=function(e){
var rect=cvs.getBoundingClientRect();
var mx=(e.clientX-rect.left)*(cvs.width/rect.width);
var my=(e.clientY-rect.top)*(cvs.height/rect.height);
TERRITORIES.forEach(function(t){
if(Math.sqrt(Math.pow(mx-t.x,2)+Math.pow(my-t.y,2))<28){conquerTerritory(t.id);}
});
};

p.innerHTML+='<p class="v17-subtitle">점령: '+conqueredTerr.length+'/'+TERRITORIES.length+' &mdash; 인접 영토를 클릭하면 점령합니다</p>';
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-terr\').classList.remove(\'on\')">닫기</button>';
}

// ─── 5. Season Cycle System (4 seasons) ───
var SEASONS=[
{id:'spring',name:'봄',icon:'🌸',food:'+20%',morale:'+10%',move:'+1',atk:'0%'},
{id:'summer',name:'여름',icon:'☀️',food:'+30%',morale:'-5%',move:'0',atk:'+10%'},
{id:'autumn',name:'가을',icon:'🍂',food:'+40%',morale:'+15%',move:'0',atk:'+5%'},
{id:'winter',name:'겨울',icon:'❄️',food:'-20%',morale:'-10%',move:'-1',atk:'-10%'}
];

var currentSeason=0;
var seasonsExperienced=[];
function loadSeason(){
var s=JSON.parse(localStorage.getItem('kRPG_season')||'{}');
currentSeason=s.current||0;
seasonsExperienced=s.experienced||[];
}
function saveSeason(){localStorage.setItem('kRPG_season',JSON.stringify({current:currentSeason,experienced:seasonsExperienced}));}

function advanceSeason(){
currentSeason=(currentSeason+1)%4;
var sid=SEASONS[currentSeason].id;
if(seasonsExperienced.indexOf(sid)<0){seasonsExperienced.push(sid);}
saveSeason();
v17SFX('season');
v17Toast(SEASONS[currentSeason].icon+' '+SEASONS[currentSeason].name+'이(가) 왔습니다!','#2196F3');
if(seasonsExperienced.length>=4)v17CheckAchOnce('season_master');
renderSeasonPanel();document.getElementById('v17-season').classList.add('on');
}

function renderSeasonPanel(){
var p=createV17Panel('v17-season','🌸 계절 시스템','계절에 따라 전략을 세우세요');
var wrap=document.createElement('div');wrap.className='v17-list-wrap';
SEASONS.forEach(function(s,i){
var active=i===currentSeason;
var el=document.createElement('div');el.className='v17-list-item'+(active?' active':'');
el.innerHTML='<div class="li-icon">'+s.icon+'</div><div class="li-info"><div class="li-name">'+s.name+(active?' (현재)':'')+'</div><div class="li-desc">식량: '+s.food+' | 사기: '+s.morale+'</div><div class="li-extra">이동: '+s.move+' | 공격: '+s.atk+'</div></div>';
wrap.appendChild(el);
});
p.appendChild(wrap);
var advBtn=document.createElement('button');advBtn.className='v17-close';advBtn.textContent='⏭️ 계절 진행';advBtn.style.background='#1565C0';
advBtn.onclick=function(){advanceSeason();};
p.appendChild(advBtn);
p.innerHTML+='<p class="v17-subtitle">경험한 계절: '+seasonsExperienced.length+'/4</p>';
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-season\').classList.remove(\'on\')">닫기</button>';
}

// ─── 6. Legend Collection (12 legends) ───
var LEGENDS=[
{id:'creation',name:'천지창조',icon:'🌍',era:'태초'},
{id:'bear_tiger',name:'곰과 호랑이',icon:'🐻',era:'환웅시대'},
{id:'flood_myth',name:'대홍수',icon:'🌊',era:'상고시대'},
{id:'dangun_myth',name:'단군신화',icon:'👑',era:'BC 2333'},
{id:'ondal',name:'바보 온달',icon:'🐴',era:'고구려'},
{id:'jumong',name:'주몽 설화',icon:'🏹',era:'BC 37'},
{id:'yonogaeo',name:'연오랑 세오녀',icon:'🌅',era:'신라시대'},
{id:'seolmundae',name:'설문대할망',icon:'🌋',era:'제주도'},
{id:'gyeonhwon',name:'견훤 설화',icon:'🐛',era:'후백제'},
{id:'hwangcheon',name:'바리데기',icon:'💀',era:'신화시대'},
{id:'cheoyong',name:'처용 설화',icon:'🎭',era:'신라'},
{id:'samjoko',name:'삼족오',icon:'☀️',era:'고구려'}
];

var collectedLegends=[];
function loadLegends(){collectedLegends=JSON.parse(localStorage.getItem('kRPG_legends')||'[]');}
function saveLegends(){localStorage.setItem('kRPG_legends',JSON.stringify(collectedLegends));}

function collectLegend(lId){
if(collectedLegends.indexOf(lId)>=0){v17Toast('이미 수집한 설화!','#FF9800');return;}
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
var cost=50;
if((state.gold||0)<cost){v17Toast('금화 부족! ('+cost+' 필요)','#F44336');return;}
state.gold=(state.gold||0)-cost;
localStorage.setItem('kRPG_state',JSON.stringify(state));
collectedLegends.push(lId);
saveLegends();
v17SFX('legend');
var legend=LEGENDS.find(function(l){return l.id===lId});
v17Toast('📖 '+legend.name+' 수집!','#FF6F00');
if(collectedLegends.length>=6)v17CheckAchOnce('lore_keeper');
renderLegendsPanel();document.getElementById('v17-legends').classList.add('on');
}

function renderLegendsPanel(){
var p=createV17Panel('v17-legends','📖 설화 수집','고대 설화를 수집하세요');
var grid=document.createElement('div');grid.className='v17-grid';
LEGENDS.forEach(function(l){
var collected=collectedLegends.indexOf(l.id)>=0;
var card=document.createElement('div');card.className='v17-card'+(collected?' done':'');
card.innerHTML='<div class="vc-icon">'+l.icon+'</div><div class="vc-name">'+l.name+'</div><div class="vc-desc">'+l.era+'</div>'+(collected?'<div class="vc-status">✓ 수집 완료</div>':'<div class="vc-cost">50 금화</div>');
if(!collected){card.onclick=(function(id){return function(){collectLegend(id);};})(l.id);}
grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<p class="v17-subtitle">수집: '+collectedLegends.length+'/'+LEGENDS.length+'</p>';
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-legends\').classList.remove(\'on\')">닫기</button>';
}

// ─── 7. Art of War / Strategy Manual (8 tactics) ───
var TACTICS=[
{id:'frontal',name:'정면 돌파',icon:'⚔️',desc:'적 정면으로 전력 돌격. 공격력 +30%, 방어 -20%',cost:150},
{id:'flank',name:'측면 우회',icon:'🔄',desc:'적 측면을 우회 공격. 명중률 +25%',cost:180},
{id:'ambush_t',name:'매복 기습',icon:'🌿',desc:'적을 매복 기습. 첫 공격 2배 데미지',cost:200},
{id:'defense',name:'철벽 방어',icon:'🛡️',desc:'방어 진형. 방어력 +50%, 공격 -10%',cost:160},
{id:'guerrilla',name:'유격전',icon:'🏃',desc:'소규모 유격전. 회피율 +30%',cost:220},
{id:'fire_atk',name:'화공(火攻)',icon:'🔥',desc:'화공 전술. 적 진영 파괴, 지속 데미지',cost:250},
{id:'naval',name:'수전(水戰)',icon:'⛵',desc:'수상 전투. 해상 공격력 +40%',cost:200},
{id:'retreat',name:'전략적 후퇴',icon:'🏳️',desc:'전략적 후퇴. 피해 최소화, 다음 턴 +20%',cost:120}
];

var learnedTactics=[];
function loadTactics(){learnedTactics=JSON.parse(localStorage.getItem('kRPG_tactics')||'[]');}
function saveTactics(){localStorage.setItem('kRPG_tactics',JSON.stringify(learnedTactics));}

function learnTactic(tId){
var tactic=TACTICS.find(function(t){return t.id===tId});if(!tactic)return;
if(learnedTactics.indexOf(tId)>=0){v17Toast('이미 습득한 전술!','#FF9800');return;}
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
if((state.gold||0)<tactic.cost){v17Toast('금화 부족! ('+tactic.cost+' 필요)','#F44336');return;}
state.gold=(state.gold||0)-tactic.cost;
localStorage.setItem('kRPG_state',JSON.stringify(state));
learnedTactics.push(tId);
saveTactics();
v17SFX('tactic');
v17Toast('🗡️ '+tactic.name+' 습득!','#F44336');
if(learnedTactics.length>=4)v17CheckAchOnce('strategist');
renderTacticsPanel();document.getElementById('v17-art').classList.add('on');
}

function renderTacticsPanel(){
var p=createV17Panel('v17-art','🗡️ 병법서','전투 전술을 습득하세요');
var wrap=document.createElement('div');wrap.className='v17-list-wrap';
TACTICS.forEach(function(t){
var learned=learnedTactics.indexOf(t.id)>=0;
var el=document.createElement('div');el.className='v17-list-item'+(learned?' active':'');
el.innerHTML='<div class="li-icon">'+t.icon+'</div><div class="li-info"><div class="li-name">'+t.name+(learned?' ✓':'')+'</div><div class="li-desc">'+t.desc+'</div><div class="li-extra">'+(learned?'습득 완료':t.cost+' 금화')+'</div></div>';
if(!learned){el.onclick=(function(id){return function(){learnTactic(id);};})(t.id);}
wrap.appendChild(el);
});
p.appendChild(wrap);
p.innerHTML+='<p class="v17-subtitle">습득: '+learnedTactics.length+'/'+TACTICS.length+'</p>';
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-art\').classList.remove(\'on\')">닫기</button>';
}

// ─── 8. Ancient Ruin Exploration (6 ruins, Canvas 520x280) ───
var RUINS=[
{id:'dolmen',name:'고인돌 유적',icon:'🪨',difficulty:30},
{id:'cave_paint',name:'반구대 암각화',icon:'🎨',difficulty:40},
{id:'bronze_site',name:'비파형동검 유적',icon:'🗡️',difficulty:50},
{id:'altar',name:'제천 유적',icon:'⛩️',difficulty:45},
{id:'fort_ruins',name:'왕검성 터',icon:'🏚️',difficulty:70},
{id:'tomb',name:'적석총',icon:'⚱️',difficulty:60}
];

var exploredRuins=[];
function loadRuins(){exploredRuins=JSON.parse(localStorage.getItem('kRPG_ruins')||'[]');}
function saveRuins(){localStorage.setItem('kRPG_ruins',JSON.stringify(exploredRuins));}

function exploreRuin(rId){
var ruin=RUINS.find(function(r){return r.id===rId});if(!ruin)return;
if(exploredRuins.indexOf(rId)>=0){v17Toast('이미 탐사 완료!','#FF9800');return;}
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
var cost=ruin.difficulty*3;
if((state.gold||0)<cost){v17Toast('금화 부족! ('+cost+' 필요)','#F44336');return;}
// success chance based on difficulty
var roll=Math.random()*100;
if(roll<ruin.difficulty){
v17Toast('탐사 실패! 다시 도전하세요. (난이도:'+ruin.difficulty+'%)','#F44336');
return;
}
state.gold=(state.gold||0)-cost;
localStorage.setItem('kRPG_state',JSON.stringify(state));
exploredRuins.push(rId);
saveRuins();
v17SFX('ruin');
v17Toast('🏚️ '+ruin.name+' 탐사 성공!','#FF6F00');
v17CheckAchOnce('explorer');
if(exploredRuins.length>=RUINS.length)v17CheckAch('ruin_master');
renderRuinsPanel();document.getElementById('v17-ruins').classList.add('on');
}

function renderRuinsPanel(){
var p=createV17Panel('v17-ruins','🏚️ 고대 유적 탐사','고대 유적을 탐사하세요');
var wrap=document.createElement('div');wrap.className='v17-canvas-wrap';
var cvs=document.createElement('canvas');cvs.width=520;cvs.height=280;wrap.appendChild(cvs);p.appendChild(wrap);
var ctx=cvs.getContext('2d');

ctx.fillStyle='#0d1117';ctx.fillRect(0,0,520,280);

RUINS.forEach(function(ruin,i){
var col=i%3,row=Math.floor(i/3);
var cx=90+col*170,cy=70+row*140;
var explored=exploredRuins.indexOf(ruin.id)>=0;

ctx.beginPath();ctx.roundRect(cx-60,cy-50,120,100,12);
ctx.fillStyle=explored?'rgba(30,60,30,.9)':'rgba(40,30,20,.9)';ctx.fill();
ctx.strokeStyle=explored?'#4CAF50':'#8a7a6a';ctx.lineWidth=2;ctx.stroke();

ctx.fillStyle='#fff';ctx.font='28px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(ruin.icon,cx,cy-12);

ctx.fillStyle=explored?'#4CAF50':'#e8dcc8';ctx.font='bold 10px sans-serif';
ctx.fillText(ruin.name,cx,cy+16);

ctx.fillStyle=explored?'#4CAF50':'#FFD700';ctx.font='8px sans-serif';
ctx.fillText(explored?'✓ 탐사 완료':'난이도: '+ruin.difficulty+'%',cx,cy+30);

if(!explored){
ctx.fillStyle='#8a7a6a';ctx.font='7px sans-serif';
ctx.fillText('비용: '+(ruin.difficulty*3)+' 금화',cx,cy+40);
}
});

cvs.onclick=function(e){
var rect=cvs.getBoundingClientRect();
var mx=(e.clientX-rect.left)*(cvs.width/rect.width);
var my=(e.clientY-rect.top)*(cvs.height/rect.height);
RUINS.forEach(function(ruin,i){
var col=i%3,row=Math.floor(i/3);
var cx=90+col*170,cy=70+row*140;
if(Math.abs(mx-cx)<60&&Math.abs(my-cy)<50){exploreRuin(ruin.id);}
});
};

p.innerHTML+='<p class="v17-subtitle">탐사: '+exploredRuins.length+'/'+RUINS.length+' &mdash; 유적을 클릭하면 탐사합니다</p>';
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-ruins\').classList.remove(\'on\')">닫기</button>';
}

// ─── 9. Quiz (15 new questions: 135→150) ───
var V17_QUIZ=[
{q:'고조선의 수도 아사달의 추정 위치는?',a:'평양 또는 요녕성',o:['평양 또는 요녕성','경주','서울','부여']},
{q:'홍익인간의 뜻은?',a:'널리 인간을 이롭게 하라',o:['널리 인간을 이롭게 하라','하늘을 공경하라','땅을 다스려라','전쟁에서 이겨라']},
{q:'청동기 시대의 대표적 무덤 양식은?',a:'고인돌',o:['고인돌','적석총','벽돌무덤','옹관묘']},
{q:'고조선의 대표적 청동기 유물은?',a:'비파형동검',o:['비파형동검','세형동검','철검','옥검']},
{q:'고조선의 왕위를 찬탈한 인물은?',a:'위만',o:['위만','기자','주몽','온조']},
{q:'위만조선 멸망 후 설치된 것은?',a:'한사군',o:['한사군','삼한','가야연맹','진국']},
{q:'8조법금으로 알 수 있는 고조선 사회의 특징은?',a:'사유재산과 생명 존중',o:['사유재산과 생명 존중','노비제 폐지','왕권 약화','불교 수용']},
{q:'환웅이 내려온 곳은?',a:'태백산 신단수',o:['태백산 신단수','한라산','금강산','설악산']},
{q:'고조선과 중국 간 중계무역에 사용된 화폐는?',a:'명도전',o:['명도전','오수전','반량전','도전']},
{q:'한 무제의 침략에 맞서 싸운 고조선 왕은?',a:'우거왕',o:['우거왕','위만','준왕','단군']},
{q:'부여의 12월 제천행사는?',a:'영고',o:['영고','동맹','무천','제사']},
{q:'북방식 고인돌의 다른 이름은?',a:'탁자식 고인돌',o:['탁자식 고인돌','바둑판식','기반식','남방식']},
{q:'고조선이 한과 진 사이에서 한 경제활동은?',a:'중계무역 독점',o:['중계무역 독점','조공무역','해상무역','실크로드 무역']},
{q:'전설에 의하면 단군의 수명은?',a:'1908세',o:['1908세','1000세','500세','3000세']},
{q:'고조선 남쪽의 소국 연맹체를 통칭하면?',a:'삼한',o:['삼한','삼국','가야','진국']}
];

function registerV17Quiz(){
if(typeof window.quizBank==='undefined')window.quizBank=[];
V17_QUIZ.forEach(function(q){
var exists=window.quizBank.some(function(eq){return eq.q===q.q});
if(!exists)window.quizBank.push(q);
});
}

// ─── Keyboard Shortcuts (Shift+Digit1~8) ───
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
var map={
'Digit1':['v17-tech',renderTechPanel],
'Digit2':['v17-lineage',renderLineagePanel],
'Digit3':['v17-court',renderCourtPanel],
'Digit4':['v17-terr',renderTerrPanel],
'Digit5':['v17-season',renderSeasonPanel],
'Digit6':['v17-legends',renderLegendsPanel],
'Digit7':['v17-art',renderTacticsPanel],
'Digit8':['v17-ruins',renderRuinsPanel]
};
if(map[e.code]){
e.preventDefault();var id=map[e.code][0],fn=map[e.code][1];
var el=document.getElementById(id);
if(el&&el.classList.contains('on')){el.classList.remove('on');}
else{fn();document.getElementById(id).classList.add('on');}
}
});

// ─── Menu Integration ───
function addV17Menu(){
var sidebar=document.querySelector('.sidebar-content,.action-buttons,[class*="menu"]');
if(!sidebar){setTimeout(addV17Menu,2000);return;}
var btns=[
{label:'🔬 기술',fn:function(){renderTechPanel();document.getElementById('v17-tech').classList.add('on');}},
{label:'👑 왕계',fn:function(){renderLineagePanel();document.getElementById('v17-lineage').classList.add('on');}},
{label:'🏛️ 조정',fn:function(){renderCourtPanel();document.getElementById('v17-court').classList.add('on');}},
{label:'🗺️ 영토',fn:function(){renderTerrPanel();document.getElementById('v17-terr').classList.add('on');}},
{label:'🌸 계절',fn:function(){renderSeasonPanel();document.getElementById('v17-season').classList.add('on');}},
{label:'📖 설화',fn:function(){renderLegendsPanel();document.getElementById('v17-legends').classList.add('on');}},
{label:'🗡️ 병법',fn:function(){renderTacticsPanel();document.getElementById('v17-art').classList.add('on');}},
{label:'🏚️ 유적',fn:function(){renderRuinsPanel();document.getElementById('v17-ruins').classList.add('on');}}
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

// ─── FAB Quick Actions ───
function addV17FAB(){
var fab=document.createElement('div');
fab.style.cssText='position:fixed;bottom:60px;right:8px;display:flex;flex-direction:column;gap:4px;z-index:120';
var fabBtns=[
{label:'🔬',fn:function(){renderTechPanel();document.getElementById('v17-tech').classList.add('on');}},
{label:'👑',fn:function(){renderLineagePanel();document.getElementById('v17-lineage').classList.add('on');}},
{label:'🏛',fn:function(){renderCourtPanel();document.getElementById('v17-court').classList.add('on');}},
{label:'🗺',fn:function(){renderTerrPanel();document.getElementById('v17-terr').classList.add('on');}},
{label:'🌸',fn:function(){renderSeasonPanel();document.getElementById('v17-season').classList.add('on');}},
{label:'📖',fn:function(){renderLegendsPanel();document.getElementById('v17-legends').classList.add('on');}},
{label:'🗡',fn:function(){renderTacticsPanel();document.getElementById('v17-art').classList.add('on');}},
{label:'🏚',fn:function(){renderRuinsPanel();document.getElementById('v17-ruins').classList.add('on');}}
];
fabBtns.forEach(function(b){
var btn=document.createElement('button');btn.textContent=b.label;
btn.style.cssText='width:36px;height:36px;border-radius:50%;border:1px solid #5a4a3a;background:rgba(26,20,40,.85);color:#e8dcc8;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s';
btn.onmouseenter=function(){btn.style.borderColor='#FFD700';btn.style.transform='scale(1.15)';};
btn.onmouseleave=function(){btn.style.borderColor='#5a4a3a';btn.style.transform='scale(1)';};
btn.onclick=b.fn;fab.appendChild(btn);
});
document.body.appendChild(fab);
}

// ─── Init ───
function v17Init(){
loadTech();loadLineage();loadCourt();loadTerr();loadSeason();loadLegends();loadTactics();loadRuins();loadV17Ach();
registerV17Quiz();
setTimeout(addV17Menu,2000);
setTimeout(addV17FAB,2500);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',v17Init);}
else{v17Init();}

window._v17={TECHS:TECHS,LINEAGE:LINEAGE,MINISTERS:MINISTERS,TERRITORIES:TERRITORIES,SEASONS:SEASONS,LEGENDS:LEGENDS,TACTICS:TACTICS,RUINS:RUINS,V17_QUIZ:V17_QUIZ,V17_ACH:V17_ACH,v17Toast:v17Toast,v17SFX:v17SFX,v17AchProgress:v17AchProgress};
})();
