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
'.v16-tabs{display:flex;gap:4px;max-width:560px;margin:0 auto 12px;flex-wrap:wrap;justify-content:center}',
'.v16-tab{font-size:10px;padding:6px 12px;border:1px solid #3a3a4a;border-radius:6px;background:#2a2438;color:#e8dcc8;cursor:pointer;font-family:inherit;transition:all .2s}',
'.v16-tab.active{border-color:#FFD700;background:#3a3448;color:#FFD700}',
'.rel-canvas-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.rel-canvas-wrap canvas{border:2px solid #3a3a4a;border-radius:8px;background:#0a0a14;display:block;margin:0 auto 12px}',
'.tech-canvas-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.tech-canvas-wrap canvas{border:2px solid #3a3a4a;border-radius:8px;background:#0a0a14;display:block;margin:0 auto 12px}',
'.skill-tree-wrap{max-width:560px;margin:0 auto}',
'.hero-skill-card{background:rgba(26,20,40,.9);border:2px solid #3a3a4a;border-radius:10px;padding:12px;margin-bottom:10px}',
'.hero-skill-card h3{color:#FFD700;font-size:13px;margin-bottom:8px}',
'.skill-nodes{display:flex;gap:6px;flex-wrap:wrap}',
'.skill-node{width:70px;height:70px;border:2px solid #3a3a4a;border-radius:8px;background:#1a1428;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all .3s;text-align:center}',
'.skill-node:hover{border-color:#FFD700;transform:scale(1.05)}',
'.skill-node.unlocked{border-color:#4CAF50;background:#1a2a1a}',
'.skill-node.locked{opacity:.5;cursor:not-allowed}',
'.skill-node .sn-icon{font-size:20px}',
'.skill-node .sn-name{font-size:8px;color:#e8dcc8;margin-top:2px}',
'.skill-node .sn-lv{font-size:7px;color:#8a7a6a}',
'.territory-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.territory-wrap canvas{border:2px solid #3a3a4a;border-radius:8px;background:#0a0a14;display:block;margin:0 auto 12px}',
'.wonder-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-width:560px;margin:0 auto}',
'.wonder-card{background:rgba(40,30,20,.9);border:2px solid #5a4a3a;border-radius:12px;padding:14px;text-align:center;cursor:pointer;transition:all .3s;position:relative}',
'.wonder-card:hover{border-color:#FFD700;transform:translateY(-2px)}',
'.wonder-card.built{border-color:#4CAF50;box-shadow:0 0 16px rgba(76,175,80,.2)}',
'.wonder-card .wc-icon{font-size:36px;margin-bottom:6px}',
'.wonder-card .wc-name{font-size:12px;color:#e8dcc8;font-weight:700}',
'.wonder-card .wc-desc{font-size:9px;color:#8a7a6a;margin-top:4px}',
'.wonder-card .wc-cost{font-size:9px;color:#FFD700;margin-top:4px}',
'.wonder-card .wc-status{font-size:8px;color:#4CAF50;margin-top:4px;font-weight:700}',
'.battle-stats-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.battle-stats-wrap canvas{border:2px solid #3a3a4a;border-radius:8px;background:#0a0a14;display:block;margin:0 auto 12px}',
'.bs-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:400px;margin:0 auto 12px}',
'.bs-box{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:10px;text-align:center}',
'.bs-box .bs-val{font-size:22px;font-weight:900;color:#FFD700}',
'.bs-box .bs-label{font-size:9px;color:#8a7a6a;margin-top:2px}',
'.daily-wrap{max-width:560px;margin:0 auto}',
'.daily-mission{display:flex;align-items:center;gap:10px;background:rgba(20,15,30,.9);border:2px solid #3a3a5a;border-radius:10px;padding:12px;margin-bottom:8px;cursor:pointer;transition:all .3s}',
'.daily-mission:hover{border-color:#5FA0FF}',
'.daily-mission.completed{border-color:#4CAF50;opacity:.7}',
'.daily-mission .dm-icon{font-size:28px}',
'.daily-mission .dm-info{flex:1}',
'.daily-mission .dm-name{font-size:12px;color:#e8dcc8;font-weight:700}',
'.daily-mission .dm-desc{font-size:10px;color:#8a7a8a;margin-top:2px}',
'.daily-mission .dm-reward{font-size:10px;color:#FFD700}',
'.daily-mission .dm-check{font-size:20px;color:#4CAF50}',
'.bgm-wrap{max-width:560px;margin:0 auto}',
'.bgm-track{display:flex;align-items:center;gap:10px;background:rgba(15,10,25,.9);border:2px solid #4a3a6a;border-radius:10px;padding:12px;margin-bottom:8px;cursor:pointer;transition:all .3s}',
'.bgm-track:hover{border-color:#9C27B0}',
'.bgm-track.playing{border-color:#E040FB;box-shadow:0 0 12px rgba(224,64,251,.2)}',
'.bgm-track .bt-icon{font-size:24px}',
'.bgm-track .bt-info{flex:1}',
'.bgm-track .bt-name{font-size:12px;color:#CE93D8;font-weight:700}',
'.bgm-track .bt-desc{font-size:10px;color:#7a6a8a;margin-top:2px}',
'.bgm-track .bt-bpm{font-size:9px;color:#6a5a8a}',
'.timeline-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.timeline-wrap canvas{border:2px solid #3a3a4a;border-radius:8px;background:#0a0a14;display:block;margin:0 auto 12px}'
].join('\n');
document.head.appendChild(css);

function createPanel(id,title,subtitle){
var existing=document.getElementById(id);
if(existing)existing.remove();
var p=document.createElement('div');p.id=id;p.className='v16-panel';
p.innerHTML='<h2>'+title+'</h2><p class="v16-subtitle">'+subtitle+'</p>';
document.body.appendChild(p);return p;
}

// ─── 1. Hero Relationship System (Canvas) ───
var HEROES=[
{id:'dangun',name:'단군',icon:'👑',x:280,y:80,color:'#FFD700'},
{id:'hwanung',name:'환웅',icon:'⚡',x:140,y:160,color:'#4FC3F7'},
{id:'ungnyeo',name:'웅녀',icon:'🐻',x:420,y:160,color:'#F48FB1'},
{id:'haemosu',name:'해모수',icon:'☀️',x:80,y:280,color:'#FF9800'},
{id:'jumong',name:'주몽',icon:'🏹',x:200,y:320,color:'#66BB6A'},
{id:'yuri',name:'유리',icon:'🗡️',x:360,y:320,color:'#AB47BC'},
{id:'ondal',name:'온달',icon:'🛡️',x:480,y:280,color:'#5C6BC0'},
{id:'pyeonggang',name:'평강',icon:'👸',x:440,y:200,color:'#EC407A'}
];

var RELATIONS=[
{from:'hwanung',to:'ungnyeo',type:'love',label:'혼인'},
{from:'hwanung',to:'dangun',type:'parent',label:'부자'},
{from:'ungnyeo',to:'dangun',type:'parent',label:'모자'},
{from:'haemosu',to:'jumong',type:'parent',label:'부자'},
{from:'jumong',to:'yuri',type:'parent',label:'부자'},
{from:'dangun',to:'haemosu',type:'ally',label:'계승'},
{from:'ondal',to:'pyeonggang',type:'love',label:'혼인'},
{from:'jumong',to:'ondal',type:'ally',label:'동맹'},
{from:'dangun',to:'jumong',type:'ally',label:'후손'}
];

var heroAffinity={};
function loadAffinity(){heroAffinity=JSON.parse(localStorage.getItem('kRPG_affinity')||'{}');}
function saveAffinity(){localStorage.setItem('kRPG_affinity',JSON.stringify(heroAffinity));}
function getAffinity(h1,h2){var key=[h1,h2].sort().join('_');return heroAffinity[key]||0;}
function addAffinity(h1,h2,val){var key=[h1,h2].sort().join('_');heroAffinity[key]=(heroAffinity[key]||0)+val;saveAffinity();}

function renderRelPanel(){
var p=createPanel('v16-rel','🤝 영웅 관계도','영웅들 간의 관계와 호감도를 확인하세요');
var wrap=document.createElement('div');wrap.className='rel-canvas-wrap';
var cvs=document.createElement('canvas');cvs.width=560;cvs.height=400;wrap.appendChild(cvs);p.appendChild(wrap);
var ctx=cvs.getContext('2d');

RELATIONS.forEach(function(r){
var h1=HEROES.find(function(h){return h.id===r.from});
var h2=HEROES.find(function(h){return h.id===r.to});
if(!h1||!h2)return;
ctx.beginPath();
ctx.strokeStyle=r.type==='love'?'#F06292':r.type==='parent'?'#FFD700':'#4DD0E1';
ctx.lineWidth=r.type==='love'?3:2;
ctx.setLineDash(r.type==='ally'?[6,4]:[]);
ctx.moveTo(h1.x,h1.y);ctx.lineTo(h2.x,h2.y);ctx.stroke();
ctx.setLineDash([]);
var mx=(h1.x+h2.x)/2,my=(h1.y+h2.y)/2;
ctx.fillStyle='rgba(10,6,8,.8)';ctx.fillRect(mx-20,my-8,40,16);
ctx.fillStyle='#e8dcc8';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(r.label,mx,my);
});

HEROES.forEach(function(h){
ctx.beginPath();ctx.arc(h.x,h.y,26,0,Math.PI*2);
ctx.fillStyle='rgba(26,20,40,.9)';ctx.fill();
ctx.strokeStyle=h.color;ctx.lineWidth=3;ctx.stroke();
ctx.fillStyle='#fff';ctx.font='22px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(h.icon,h.x,h.y-4);
ctx.fillStyle=h.color;ctx.font='bold 10px sans-serif';
ctx.fillText(h.name,h.x,h.y+18);
var aff=getAffinity('dangun',h.id);
if(aff>0){
ctx.fillStyle='#4CAF50';ctx.font='8px sans-serif';
ctx.fillText('♥'+aff,h.x,h.y+28);
}
});

var legend=document.createElement('div');
legend.style.cssText='display:flex;gap:12px;justify-content:center;margin-top:8px;flex-wrap:wrap';
[{c:'#F06292',l:'혼인'},{c:'#FFD700',l:'혈연'},{c:'#4DD0E1',l:'동맹'}].forEach(function(item){
var s=document.createElement('span');s.style.cssText='font-size:10px;color:'+item.c;s.textContent='● '+item.l;legend.appendChild(s);
});
p.appendChild(legend);
var incBtn=document.createElement('button');incBtn.className='v16-close';incBtn.textContent='♥ 단군-주몽 호감도 +1';incBtn.style.background='#C62828';
incBtn.onclick=function(){addAffinity('dangun','jumong',1);playSFX16('affinity');showToast16('♥ 호감도 상승!','#E91E63');renderRelPanel();document.getElementById('v16-rel').classList.add('on');};
p.appendChild(incBtn);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-rel\').classList.remove(\'on\')">닫기</button>';
}

// ─── 2. Technology Research Tree (Canvas) ───
var TECH_TREE=[
{id:'farming',name:'농경술',icon:'🌾',tier:0,x:80,y:60,cost:100,prereq:null,desc:'식량 생산 +20%'},
{id:'bronze',name:'청동제련',icon:'⚒️',tier:0,x:240,y:60,cost:120,prereq:null,desc:'무기/방어구 제작 가능'},
{id:'pottery',name:'토기제작',icon:'🏺',tier:0,x:400,y:60,cost:80,prereq:null,desc:'저장 용량 +30%'},
{id:'irrigation',name:'관개수로',icon:'💧',tier:1,x:80,y:160,cost:200,prereq:'farming',desc:'식량 생산 +40%'},
{id:'iron',name:'철기제련',icon:'⚔️',tier:1,x:240,y:160,cost:250,prereq:'bronze',desc:'철제 무기 해금'},
{id:'writing',name:'문자발명',icon:'📜',tier:1,x:400,y:160,cost:180,prereq:'pottery',desc:'외교 효율 +25%'},
{id:'horsemanship',name:'기마술',icon:'🐎',tier:2,x:80,y:260,cost:300,prereq:'irrigation',desc:'기병 유닛 해금'},
{id:'steel',name:'강철제련',icon:'🔥',tier:2,x:240,y:260,cost:400,prereq:'iron',desc:'최상급 장비 해금'},
{id:'philosophy',name:'천문학',icon:'⭐',tier:2,x:400,y:260,cost:350,prereq:'writing',desc:'제사 효과 +50%'},
{id:'fortress',name:'성곽건축',icon:'🏰',tier:3,x:160,y:350,cost:500,prereq:'steel',desc:'방어력 전군 +30%'},
{id:'empire',name:'제국통일',icon:'👑',tier:3,x:340,y:350,cost:800,prereq:'philosophy',desc:'전체 스탯 +15%'}
];
var researchedTech=[];

function loadTech(){researchedTech=JSON.parse(localStorage.getItem('kRPG_tech')||'[]');}
function saveTech(){localStorage.setItem('kRPG_tech',JSON.stringify(researchedTech));}

function researchTech(techId){
var tech=TECH_TREE.find(function(t){return t.id===techId});
if(!tech)return;
if(researchedTech.indexOf(techId)>=0){showToast16('이미 연구 완료!','#FF9800');return;}
if(tech.prereq&&researchedTech.indexOf(tech.prereq)<0){showToast16('선행 기술을 먼저 연구하세요!','#F44336');return;}
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
if((state.gold||0)<tech.cost){showToast16('금화 부족! ('+tech.cost+'필요)','#F44336');return;}
state.gold=(state.gold||0)-tech.cost;
localStorage.setItem('kRPG_state',JSON.stringify(state));
researchedTech.push(techId);
saveTech();
playSFX16('research');
showToast16('🔬 '+tech.name+' 연구 완료!','#2196F3');
checkV16Ach('tech_first');
if(researchedTech.length>=TECH_TREE.length)checkV16Ach('tech_all');
renderTechPanel();document.getElementById('v16-tech').classList.add('on');
}

function renderTechPanel(){
var p=createPanel('v16-tech','🔬 기술 연구 트리','고조선의 기술을 발전시키세요');
var wrap=document.createElement('div');wrap.className='tech-canvas-wrap';
var cvs=document.createElement('canvas');cvs.width=500;cvs.height=400;wrap.appendChild(cvs);p.appendChild(wrap);
var ctx=cvs.getContext('2d');

TECH_TREE.forEach(function(tech){
if(tech.prereq){
var parent=TECH_TREE.find(function(t){return t.id===tech.prereq});
if(parent){
ctx.beginPath();ctx.moveTo(parent.x,parent.y+20);ctx.lineTo(tech.x,tech.y-20);
ctx.strokeStyle=researchedTech.indexOf(tech.id)>=0?'#4CAF50':'#3a3a4a';ctx.lineWidth=2;ctx.stroke();
var mx=(parent.x+tech.x)/2,my=(parent.y+tech.y)/2;
ctx.beginPath();ctx.moveTo(mx,my-4);ctx.lineTo(mx-4,my+4);ctx.lineTo(mx+4,my+4);ctx.closePath();
ctx.fillStyle=researchedTech.indexOf(tech.id)>=0?'#4CAF50':'#5a5a6a';ctx.fill();
}
}
});

TECH_TREE.forEach(function(tech){
var researched=researchedTech.indexOf(tech.id)>=0;
var available=!tech.prereq||researchedTech.indexOf(tech.prereq)>=0;
ctx.beginPath();ctx.roundRect(tech.x-35,tech.y-25,70,50,8);
ctx.fillStyle=researched?'rgba(30,60,30,.95)':available?'rgba(26,20,40,.95)':'rgba(20,15,25,.6)';
ctx.fill();ctx.strokeStyle=researched?'#4CAF50':available?'#FFD700':'#3a3a4a';ctx.lineWidth=2;ctx.stroke();
ctx.fillStyle='#fff';ctx.font='18px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(tech.icon,tech.x,tech.y-6);
ctx.fillStyle=researched?'#4CAF50':'#e8dcc8';ctx.font='bold 9px sans-serif';
ctx.fillText(tech.name,tech.x,tech.y+14);
if(researched){ctx.fillStyle='#4CAF50';ctx.font='bold 8px sans-serif';ctx.fillText('✓',tech.x+28,tech.y-16);}
});

cvs.onclick=function(e){
var rect=cvs.getBoundingClientRect();
var mx=e.clientX-rect.left,my=e.clientY-rect.top;
var sx=cvs.width/rect.width,sy=cvs.height/rect.height;
mx*=sx;my*=sy;
TECH_TREE.forEach(function(tech){
if(Math.abs(mx-tech.x)<35&&Math.abs(my-tech.y)<25){researchTech(tech.id);}
});
};

p.innerHTML+='<p class="v16-subtitle">연구완료: '+researchedTech.length+'/'+TECH_TREE.length+' — 기술 노드를 클릭하면 연구합니다</p>';
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-tech\').classList.remove(\'on\')">닫기</button>';
}

// ─── 3. Hero Skill Tree ───
var HERO_SKILLS={
dangun:[
{id:'ds1',name:'천부인',icon:'🔱',tier:1,cost:50,desc:'공격력 +10%',stat:'atk',val:10},
{id:'ds2',name:'신시개국',icon:'🏰',tier:2,cost:120,desc:'방어력 +15%',stat:'def',val:15},
{id:'ds3',name:'홍익인간',icon:'✨',tier:3,cost:250,desc:'전체 치유 +20%',stat:'heal',val:20},
{id:'ds4',name:'아사달',icon:'👑',tier:4,cost:500,desc:'전 스탯 +25%',stat:'all',val:25}
],
jumong:[
{id:'js1',name:'활쏘기',icon:'🏹',tier:1,cost:50,desc:'원거리 +15%',stat:'ranged',val:15},
{id:'js2',name:'비류수',icon:'🌊',tier:2,cost:120,desc:'회피율 +10%',stat:'dodge',val:10},
{id:'js3',name:'졸본성',icon:'⚔️',tier:3,cost:250,desc:'크리티컬 +20%',stat:'crit',val:20},
{id:'js4',name:'고구려건국',icon:'👑',tier:4,cost:500,desc:'전 스탯 +25%',stat:'all',val:25}
],
haemosu:[
{id:'hs1',name:'오룡거',icon:'☀️',tier:1,cost:50,desc:'이동력 +1',stat:'move',val:1},
{id:'hs2',name:'천궁',icon:'🌟',tier:2,cost:120,desc:'공격력 +20%',stat:'atk',val:20},
{id:'hs3',name:'해의기운',icon:'🔥',tier:3,cost:250,desc:'화염 공격 해금',stat:'fire',val:30},
{id:'hs4',name:'부여건국',icon:'👑',tier:4,cost:500,desc:'전 스탯 +25%',stat:'all',val:25}
]
};
var heroSkillLevels={};
function loadHeroSkills(){heroSkillLevels=JSON.parse(localStorage.getItem('kRPG_hero_skills')||'{}');}
function saveHeroSkills(){localStorage.setItem('kRPG_hero_skills',JSON.stringify(heroSkillLevels));}

function unlockHeroSkill(heroId,skillId){
var skills=HERO_SKILLS[heroId];if(!skills)return;
var idx=skills.findIndex(function(s){return s.id===skillId});if(idx<0)return;
var skill=skills[idx];
if(!heroSkillLevels[heroId])heroSkillLevels[heroId]={};
if(heroSkillLevels[heroId][skillId]){showToast16('이미 해금됨!','#FF9800');return;}
if(idx>0){
var prev=skills[idx-1];
if(!heroSkillLevels[heroId][prev.id]){showToast16('이전 스킬을 먼저 해금하세요!','#F44336');return;}
}
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
if((state.gold||0)<skill.cost){showToast16('금화 부족!','#F44336');return;}
state.gold=(state.gold||0)-skill.cost;
localStorage.setItem('kRPG_state',JSON.stringify(state));
heroSkillLevels[heroId][skillId]=true;
saveHeroSkills();
playSFX16('skill_unlock');
showToast16('✨ '+skill.name+' 해금!','#9C27B0');
checkV16Ach('skill_first');
var total=0;Object.keys(heroSkillLevels).forEach(function(hid){total+=Object.keys(heroSkillLevels[hid]||{}).length;});
if(total>=12)checkV16Ach('skill_master');
renderSkillTreePanel();document.getElementById('v16-skill').classList.add('on');
}

function renderSkillTreePanel(){
var p=createPanel('v16-skill','⭐ 영웅 스킬 트리','영웅들의 고유 능력을 성장시키세요');
var wrap=document.createElement('div');wrap.className='skill-tree-wrap';
Object.keys(HERO_SKILLS).forEach(function(heroId){
var hero=HEROES.find(function(h){return h.id===heroId});
var skills=HERO_SKILLS[heroId];
var card=document.createElement('div');card.className='hero-skill-card';
card.innerHTML='<h3>'+((hero&&hero.icon)||'')+' '+(hero?hero.name:heroId)+' 스킬 트리</h3>';
var nodes=document.createElement('div');nodes.className='skill-nodes';
skills.forEach(function(skill,idx){
var unlocked=heroSkillLevels[heroId]&&heroSkillLevels[heroId][skill.id];
var available=idx===0||( heroSkillLevels[heroId]&&heroSkillLevels[heroId][skills[idx-1].id]);
var node=document.createElement('div');
node.className='skill-node'+(unlocked?' unlocked':(!available?' locked':''));
node.innerHTML='<div class="sn-icon">'+skill.icon+'</div><div class="sn-name">'+skill.name+'</div><div class="sn-lv">'+(unlocked?'✓ 해금':skill.cost+' 금')+'</div>';
if(!unlocked&&available){
node.onclick=(function(hid,sid){return function(){unlockHeroSkill(hid,sid);};})(heroId,skill.id);
}
node.title=skill.desc;
nodes.appendChild(node);
if(idx<skills.length-1){
var arrow=document.createElement('div');arrow.style.cssText='display:flex;align-items:center;font-size:16px;color:'+(unlocked?'#4CAF50':'#3a3a4a');arrow.textContent='→';nodes.appendChild(arrow);
}
});
card.appendChild(nodes);wrap.appendChild(card);
});
p.appendChild(wrap);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-skill\').classList.remove(\'on\')">닫기</button>';
}

// ─── 4. Territory Map (Canvas) ───
var TERRITORIES=[
{id:'gojoseon',name:'고조선',x:260,y:120,r:50,color:'#FFD700',pop:50000},
{id:'buyeo',name:'부여',x:380,y:80,r:30,color:'#4FC3F7',pop:15000},
{id:'okjeo',name:'옥저',x:440,y:150,r:22,color:'#81C784',pop:8000},
{id:'ye',name:'예',x:420,y:220,r:24,color:'#A5D6A7',pop:9000},
{id:'mahan',name:'마한',x:200,y:300,r:35,color:'#FF8A65',pop:20000},
{id:'byeonhan',name:'변한',x:320,y:320,r:28,color:'#CE93D8',pop:12000},
{id:'jinhan',name:'진한',x:420,y:300,r:28,color:'#90CAF9',pop:11000},
{id:'dongye',name:'동예',x:460,y:250,r:20,color:'#A1887F',pop:6000},
{id:'nakrang',name:'낙랑',x:140,y:180,r:28,color:'#EF5350',pop:18000}
];

function renderTerritoryPanel(){
var p=createPanel('v16-territory','🗺️ 세력 영토 지도','고조선과 주변 세력의 영토를 확인하세요');
var wrap=document.createElement('div');wrap.className='territory-wrap';
var cvs=document.createElement('canvas');cvs.width=560;cvs.height=400;wrap.appendChild(cvs);p.appendChild(wrap);
var ctx=cvs.getContext('2d');

ctx.fillStyle='#0d1117';ctx.fillRect(0,0,560,400);
ctx.strokeStyle='#1a2a3a';ctx.lineWidth=1;
for(var gx=0;gx<560;gx+=40){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,400);ctx.stroke();}
for(var gy=0;gy<400;gy+=40){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(560,gy);ctx.stroke();}

TERRITORIES.forEach(function(t){
ctx.beginPath();ctx.arc(t.x,t.y,t.r,0,Math.PI*2);
var grad=ctx.createRadialGradient(t.x,t.y,0,t.x,t.y,t.r);
grad.addColorStop(0,t.color+'66');grad.addColorStop(1,t.color+'11');
ctx.fillStyle=grad;ctx.fill();
ctx.strokeStyle=t.color;ctx.lineWidth=2;ctx.stroke();
ctx.fillStyle='#fff';ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(t.name,t.x,t.y-4);
ctx.fillStyle=t.color;ctx.font='9px sans-serif';
ctx.fillText((t.pop/1000).toFixed(0)+'k',t.x,t.y+10);
});

var allies=[{from:'gojoseon',to:'buyeo'},{from:'gojoseon',to:'mahan'}];
var enemies=[{from:'gojoseon',to:'nakrang'}];
allies.forEach(function(a){
var t1=TERRITORIES.find(function(t){return t.id===a.from});
var t2=TERRITORIES.find(function(t){return t.id===a.to});
if(t1&&t2){ctx.beginPath();ctx.setLineDash([4,4]);ctx.strokeStyle='#4CAF5066';ctx.lineWidth=1;ctx.moveTo(t1.x,t1.y);ctx.lineTo(t2.x,t2.y);ctx.stroke();ctx.setLineDash([]);}
});
enemies.forEach(function(a){
var t1=TERRITORIES.find(function(t){return t.id===a.from});
var t2=TERRITORIES.find(function(t){return t.id===a.to});
if(t1&&t2){ctx.beginPath();ctx.setLineDash([4,4]);ctx.strokeStyle='#F4433666';ctx.lineWidth=1;ctx.moveTo(t1.x,t1.y);ctx.lineTo(t2.x,t2.y);ctx.stroke();ctx.setLineDash([]);}
});

ctx.fillStyle='#e8dcc8';ctx.font='bold 14px sans-serif';ctx.textAlign='left';
ctx.fillText('🗺️ 고조선 시대 세력도',12,24);

p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-territory\').classList.remove(\'on\')">닫기</button>';
}

// ─── 5. Civilization Wonders (6 wonders) ───
var WONDERS=[
{id:'altar_heaven',name:'천단(天壇)',icon:'⛩️',desc:'하늘에 제사 올리는 거대 제단',cost:600,effect:'제사 효과 2배',built:false},
{id:'bronze_tower',name:'청동대탑',icon:'🗼',desc:'고조선 최대의 청동 건축물',cost:800,effect:'방어력 전군 +20%',built:false},
{id:'jade_palace',name:'옥궁(玉宮)',icon:'🏛️',desc:'비취옥으로 장식된 왕궁',cost:1000,effect:'외교 우호도 +30',built:false},
{id:'star_observatory',name:'첨성대',icon:'🔭',desc:'천문 관측을 위한 석조 구조물',cost:700,effect:'기술 연구 비용 -20%',built:false},
{id:'great_wall',name:'장성(長城)',icon:'🧱',desc:'북방 유목민 방어용 성벽',cost:900,effect:'적 침략 확률 -50%',built:false},
{id:'sacred_forest',name:'신단수(神壇樹)',icon:'🌳',desc:'신성한 박달나무 성지',cost:500,effect:'전군 사기 +30%',built:false}
];
var builtWonders=[];
function loadWonders(){builtWonders=JSON.parse(localStorage.getItem('kRPG_wonders')||'[]');}
function saveWonders(){localStorage.setItem('kRPG_wonders',JSON.stringify(builtWonders));}

function buildWonder(wId){
var w=WONDERS.find(function(x){return x.id===wId});if(!w)return;
if(builtWonders.indexOf(wId)>=0){showToast16('이미 건설 완료!','#FF9800');return;}
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
if((state.gold||0)<w.cost){showToast16('금화 부족! ('+w.cost+'필요)','#F44336');return;}
state.gold=(state.gold||0)-w.cost;
localStorage.setItem('kRPG_state',JSON.stringify(state));
builtWonders.push(wId);
saveWonders();
playSFX16('wonder');
showToast16('🏛️ '+w.name+' 건설 완료!','#FF6F00');
checkV16Ach('wonder_first');
if(builtWonders.length>=WONDERS.length)checkV16Ach('wonder_all');
renderWonderPanel();document.getElementById('v16-wonder').classList.add('on');
}

function renderWonderPanel(){
var p=createPanel('v16-wonder','🏛️ 문명 불가사의','고조선의 위대한 건축물을 건설하세요');
var grid=document.createElement('div');grid.className='wonder-grid';
WONDERS.forEach(function(w){
var built=builtWonders.indexOf(w.id)>=0;
var card=document.createElement('div');card.className='wonder-card'+(built?' built':'');
card.innerHTML='<div class="wc-icon">'+w.icon+'</div><div class="wc-name">'+w.name+'</div><div class="wc-desc">'+w.desc+'</div><div class="wc-cost">'+(built?'':''+w.cost+' 금화')+'</div>'+(built?'<div class="wc-status">✓ 건설 완료</div>':'<div class="wc-cost">효과: '+w.effect+'</div>');
if(!built){card.onclick=(function(id){return function(){buildWonder(id);};})(w.id);}
grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<p class="v16-subtitle">건설: '+builtWonders.length+'/'+WONDERS.length+'</p>';
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-wonder\').classList.remove(\'on\')">닫기</button>';
}

// ─── 6. Battle Statistics Dashboard (Canvas) ───
function getBattleStats(){
var st=JSON.parse(localStorage.getItem('krpg_stats')||'{}');
return{wins:st.wins||0,losses:st.losses||0,kills:st.kills||0,dmgDealt:st.dmgDealt||0,dmgTaken:st.dmgTaken||0,crits:st.crits||0,heals:st.heals||0,turns:st.totalTurns||0};
}

function renderBattleStatsPanel(){
var p=createPanel('v16-bstats','📊 전투 통계','전투 기록과 통계를 확인하세요');
var stats=getBattleStats();

var summary=document.createElement('div');summary.className='bs-summary';
[{v:stats.wins,l:'승리'},{v:stats.losses,l:'패배'},{v:stats.kills,l:'처치'},{v:stats.dmgDealt,l:'준 데미지'},{v:stats.crits,l:'크리티컬'},{v:stats.heals,l:'치유량'}].forEach(function(item){
var box=document.createElement('div');box.className='bs-box';
box.innerHTML='<div class="bs-val">'+item.v+'</div><div class="bs-label">'+item.l+'</div>';
summary.appendChild(box);
});
p.appendChild(summary);

var wrap=document.createElement('div');wrap.className='battle-stats-wrap';
var cvs=document.createElement('canvas');cvs.width=500;cvs.height=300;wrap.appendChild(cvs);p.appendChild(wrap);
var ctx=cvs.getContext('2d');

var labels=['승리','패배','처치','크리티컬','치유'];
var values=[stats.wins,stats.losses,stats.kills,stats.crits,stats.heals];
var maxVal=Math.max.apply(null,values.map(function(v){return v||1;}))||1;
var cx=250,cy=150,r=110;
ctx.strokeStyle='#2a2a3a';ctx.lineWidth=1;
for(var ring=1;ring<=4;ring++){
ctx.beginPath();
for(var i=0;i<=labels.length;i++){
var angle=Math.PI*2*(i%labels.length)/labels.length-Math.PI/2;
var rx=cx+Math.cos(angle)*r*(ring/4);
var ry=cy+Math.sin(angle)*r*(ring/4);
if(i===0)ctx.moveTo(rx,ry);else ctx.lineTo(rx,ry);
}
ctx.stroke();
}

ctx.beginPath();
ctx.fillStyle='rgba(255,215,0,.2)';ctx.strokeStyle='#FFD700';ctx.lineWidth=2;
labels.forEach(function(label,i){
var angle=Math.PI*2*i/labels.length-Math.PI/2;
var val=values[i]/maxVal;
var px=cx+Math.cos(angle)*r*val;
var py=cy+Math.sin(angle)*r*val;
if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
});
ctx.closePath();ctx.fill();ctx.stroke();

labels.forEach(function(label,i){
var angle=Math.PI*2*i/labels.length-Math.PI/2;
var lx=cx+Math.cos(angle)*(r+20);
var ly=cy+Math.sin(angle)*(r+20);
ctx.fillStyle='#e8dcc8';ctx.font='11px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(label+' ('+values[i]+')',lx,ly);
});

var winRate=stats.wins+stats.losses>0?Math.round(stats.wins/(stats.wins+stats.losses)*100):0;
ctx.fillStyle='#FFD700';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('⚔ '+winRate+'% 승률',cx,cy);

p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-bstats\').classList.remove(\'on\')">닫기</button>';
}

// ─── 7. Daily Missions ───
var DAILY_MISSIONS=[
{id:'dm_battle',name:'일일 전투',icon:'⚔️',desc:'전투 1회 완료',reward:100,check:function(){var s=JSON.parse(localStorage.getItem('krpg_stats')||'{}');return(s.wins||0)>0;}},
{id:'dm_quiz',name:'퀴즈 도전',icon:'📚',desc:'퀴즈 3문제 맞추기',reward:80,check:function(){var s=JSON.parse(localStorage.getItem('krpg_stats')||'{}');return(s.quizOk||0)>=3;}},
{id:'dm_equip',name:'장비 강화',icon:'⚔️',desc:'장비 1개 장착하기',reward:60,check:function(){var d=JSON.parse(localStorage.getItem('kRPG_equip')||'{}');return d.inventory&&d.inventory.length>0;}},
{id:'dm_tech',name:'기술 연구',icon:'🔬',desc:'기술 1개 연구하기',reward:120,check:function(){return researchedTech.length>0;}},
{id:'dm_card',name:'카드 수집',icon:'🃏',desc:'역사카드 뽑기',reward:70,check:function(){return true;}},
{id:'dm_spy',name:'첩보 활동',icon:'🕵️',desc:'첩보작전 1회 실행',reward:90,check:function(){return true;}}
];
var dailyCompleted=[];
function loadDaily(){
var d=JSON.parse(localStorage.getItem('kRPG_daily')||'{}');
if(d.date===new Date().toDateString()){dailyCompleted=d.completed||[];}
else{dailyCompleted=[];saveDaily();}
}
function saveDaily(){localStorage.setItem('kRPG_daily',JSON.stringify({date:new Date().toDateString(),completed:dailyCompleted}));}

function claimDaily(mId){
if(dailyCompleted.indexOf(mId)>=0){showToast16('이미 완료!','#FF9800');return;}
var m=DAILY_MISSIONS.find(function(x){return x.id===mId});if(!m)return;
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
state.gold=(state.gold||0)+m.reward;
localStorage.setItem('kRPG_state',JSON.stringify(state));
dailyCompleted.push(mId);
saveDaily();
playSFX16('daily_claim');
showToast16('🌟 +'+m.reward+' 금화!','#FFD700');
checkV16Ach('daily_first');
if(dailyCompleted.length>=DAILY_MISSIONS.length)checkV16Ach('daily_all');
renderDailyPanel();document.getElementById('v16-daily').classList.add('on');
}

function renderDailyPanel(){
var p=createPanel('v16-daily','🌟 일일 도전','매일 도전하고 보상을 받으세요');
var wrap=document.createElement('div');wrap.className='daily-wrap';
DAILY_MISSIONS.forEach(function(m){
var done=dailyCompleted.indexOf(m.id)>=0;
var el=document.createElement('div');el.className='daily-mission'+(done?' completed':'');
el.innerHTML='<div class="dm-icon">'+m.icon+'</div><div class="dm-info"><div class="dm-name">'+m.name+'</div><div class="dm-desc">'+m.desc+'</div><div class="dm-reward">💰 '+m.reward+' 금화</div></div>'+(done?'<div class="dm-check">✓</div>':'');
if(!done){el.onclick=(function(id){return function(){claimDaily(id);};})(m.id);}
wrap.appendChild(el);
});
p.appendChild(wrap);
p.innerHTML+='<p class="v16-subtitle">완료: '+dailyCompleted.length+'/'+DAILY_MISSIONS.length+'</p>';
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-daily\').classList.remove(\'on\')">닫기</button>';
}

// ─── 8. BGM System (10 tracks, Web Audio) ───
var actx=null;var currentBGM=null;var bgmGain=null;
function getAudioCtx(){if(!actx){actx=new(window.AudioContext||window.webkitAudioContext)();bgmGain=actx.createGain();bgmGain.gain.value=0.3;bgmGain.connect(actx.destination);}return actx;}

var BGM_TRACKS=[
{id:'main_theme',name:'고조선의 새벽',desc:'장엄한 메인 테마',bpm:72,key:'C',
notes:[261.63,329.63,392,523.25,392,329.63,261.63,196,261.63,329.63,392,523.25,659.25,523.25,392,329.63]},
{id:'battle_march',name:'출정의 북소리',desc:'전투 준비 행진곡',bpm:120,key:'Dm',
notes:[293.66,349.23,440,349.23,293.66,440,523.25,440,349.23,293.66,261.63,293.66,349.23,440,523.25,587.33]},
{id:'village_peace',name:'마을의 평화',desc:'고요한 마을 테마',bpm:60,key:'F',
notes:[349.23,440,523.25,440,349.23,293.66,261.63,293.66,349.23,440,349.23,293.66,261.63,196,261.63,293.66]},
{id:'boss_battle',name:'대장군의 분노',desc:'보스전 긴박한 곡',bpm:140,key:'Am',
notes:[440,523.25,659.25,523.25,440,392,349.23,392,440,523.25,659.25,783.99,659.25,523.25,440,392]},
{id:'victory',name:'승리의 팡파레',desc:'전투 승리 축하',bpm:100,key:'G',
notes:[392,493.88,587.33,783.99,587.33,493.88,392,493.88,587.33,783.99,987.77,783.99,587.33,493.88,392,587.33]},
{id:'night_camp',name:'야영의 밤',desc:'캠프파이어 잔잔한 곡',bpm:55,key:'Eb',
notes:[311.13,369.99,415.30,369.99,311.13,261.63,233.08,261.63,311.13,369.99,415.30,466.16,415.30,369.99,311.13,261.63]},
{id:'exploration',name:'미지의 땅',desc:'새 영토 탐험 테마',bpm:85,key:'Bb',
notes:[233.08,293.66,349.23,466.16,349.23,293.66,233.08,174.61,233.08,293.66,349.23,466.16,587.33,466.16,349.23,293.66]},
{id:'ritual_hymn',name:'제천의 찬가',desc:'신성한 제사 의식곡',bpm:50,key:'D',
notes:[293.66,329.63,392,440,523.25,440,392,329.63,293.66,261.63,293.66,392,440,523.25,587.33,523.25]},
{id:'diplomacy',name:'사신의 길',desc:'외교/대화 테마',bpm:65,key:'Em',
notes:[329.63,392,493.88,392,329.63,293.66,329.63,392,493.88,587.33,493.88,392,329.63,293.66,261.63,329.63]},
{id:'epic_finale',name:'고조선의 영광',desc:'엔딩/피날레 곡',bpm:90,key:'A',
notes:[440,523.25,659.25,880,659.25,523.25,440,392,440,523.25,659.25,880,1046.50,880,659.25,523.25]}
];

function playBGM(trackId){
var ac=getAudioCtx();
if(currentBGM){currentBGM.stop=true;}
var track=BGM_TRACKS.find(function(t){return t.id===trackId});if(!track)return;
var bgm={stop:false,id:trackId};currentBGM=bgm;
var beatDur=60/track.bpm;
var noteIdx=0;
function playNote(){
if(bgm.stop||!currentBGM||currentBGM.id!==trackId)return;
var osc=ac.createOscillator();
var env=ac.createGain();
osc.type='triangle';
osc.frequency.value=track.notes[noteIdx%track.notes.length];
env.gain.setValueAtTime(0,ac.currentTime);
env.gain.linearRampToValueAtTime(0.15,ac.currentTime+0.05);
env.gain.linearRampToValueAtTime(0,ac.currentTime+beatDur*0.8);
osc.connect(env);env.connect(bgmGain);
osc.start(ac.currentTime);osc.stop(ac.currentTime+beatDur);
noteIdx++;
setTimeout(playNote,beatDur*1000);
}
playNote();
playSFX16('bgm_play');
showToast16('🎵 '+track.name+' 재생 중','#9C27B0');
}

function stopBGM(){
if(currentBGM){currentBGM.stop=true;currentBGM=null;}
showToast16('⏹ BGM 정지','#666');
}

function renderBGMPanel(){
var p=createPanel('v16-bgm','🎵 배경음악','한국사 영웅전 OST를 감상하세요');
var wrap=document.createElement('div');wrap.className='bgm-wrap';
BGM_TRACKS.forEach(function(track){
var playing=currentBGM&&currentBGM.id===track.id&&!currentBGM.stop;
var el=document.createElement('div');el.className='bgm-track'+(playing?' playing':'');
el.innerHTML='<div class="bt-icon">'+(playing?'▶️':'🎶')+'</div><div class="bt-info"><div class="bt-name">'+track.name+'</div><div class="bt-desc">'+track.desc+'</div><div class="bt-bpm">'+track.bpm+' BPM • '+track.key+'</div></div>';
el.onclick=(function(tid,isPlaying){return function(){
if(isPlaying){stopBGM();}else{playBGM(tid);}
renderBGMPanel();document.getElementById('v16-bgm').classList.add('on');
};})(track.id,playing);
wrap.appendChild(el);
});
p.appendChild(wrap);
var stopBtn=document.createElement('button');stopBtn.className='v16-close';stopBtn.textContent='⏹ 정지';stopBtn.style.background='#424242';
stopBtn.onclick=function(){stopBGM();renderBGMPanel();document.getElementById('v16-bgm').classList.add('on');};
p.appendChild(stopBtn);
p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-bgm\').classList.remove(\'on\')">닫기</button>';
}

// ─── 9. Interactive Timeline (Canvas) ───
var TIMELINE_EVENTS=[
{year:-2333,name:'단군 건국',desc:'고조선 건국, 아사달 도읍',color:'#FFD700'},
{year:-1122,name:'기자조선',desc:'기자 동래설',color:'#4FC3F7'},
{year:-400,name:'철기 보급',desc:'철기 문화 유입',color:'#78909C'},
{year:-194,name:'위만조선',desc:'위만의 왕위 찬탈',color:'#FF8A65'},
{year:-108,name:'한사군 설치',desc:'위만조선 멸망, 한의 군현 설치',color:'#EF5350'},
{year:-57,name:'신라 건국',desc:'박혁거세, 사로국 건국',color:'#66BB6A'},
{year:-37,name:'고구려 건국',desc:'주몽, 졸본에서 건국',color:'#AB47BC'},
{year:-18,name:'백제 건국',desc:'온조, 위례성에서 건국',color:'#42A5F5'},
{year:42,name:'가야 건국',desc:'김수로, 금관가야 건국',color:'#FFA726'},
{year:372,name:'태학 설립',desc:'고구려 소수림왕, 교육기관 설립',color:'#26A69A'},
{year:427,name:'평양 천도',desc:'고구려 장수왕, 평양 천도',color:'#7E57C2'},
{year:612,name:'살수대첩',desc:'을지문덕, 수나라 대군 격파',color:'#D32F2F'}
];

function renderTimelinePanel(){
var p=createPanel('v16-timeline','📅 역사 연대기','고조선부터 삼국시대까지 인터랙티브 타임라인');
var wrap=document.createElement('div');wrap.className='timeline-wrap';
var cvs=document.createElement('canvas');cvs.width=540;cvs.height=420;wrap.appendChild(cvs);p.appendChild(wrap);
var ctx=cvs.getContext('2d');

var minYear=TIMELINE_EVENTS[0].year;
var maxYear=TIMELINE_EVENTS[TIMELINE_EVENTS.length-1].year;
var range=maxYear-minYear;
var lineY=210;

ctx.strokeStyle='#5a4a3a';ctx.lineWidth=3;
ctx.beginPath();ctx.moveTo(30,lineY);ctx.lineTo(510,lineY);ctx.stroke();

for(var y=Math.ceil(minYear/500)*500;y<=maxYear;y+=500){
var tx=30+(y-minYear)/range*480;
ctx.strokeStyle='#3a3a4a';ctx.lineWidth=1;
ctx.beginPath();ctx.moveTo(tx,lineY-6);ctx.lineTo(tx,lineY+6);ctx.stroke();
ctx.fillStyle='#6a5a4a';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText((y<0?'BC'+Math.abs(y):'AD'+y),tx,lineY+18);
}

TIMELINE_EVENTS.forEach(function(ev,i){
var tx=30+(ev.year-minYear)/range*480;
var side=i%2===0?-1:1;
var ty=lineY+side*(40+Math.random()*30);

ctx.beginPath();ctx.arc(tx,lineY,5,0,Math.PI*2);
ctx.fillStyle=ev.color;ctx.fill();
ctx.strokeStyle='#0a0608';ctx.lineWidth=2;ctx.stroke();

ctx.beginPath();ctx.moveTo(tx,lineY);ctx.lineTo(tx,ty);
ctx.strokeStyle=ev.color+'88';ctx.lineWidth=1;ctx.stroke();

ctx.fillStyle='rgba(10,6,8,.85)';
var tw=ctx.measureText(ev.name).width+16;
ctx.fillRect(tx-tw/2,ty-10+(side>0?4:-20),tw,18);
ctx.strokeStyle=ev.color;ctx.lineWidth=1;
ctx.strokeRect(tx-tw/2,ty-10+(side>0?4:-20),tw,18);

ctx.fillStyle=ev.color;ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(ev.name,tx,ty+(side>0?3:-11));

ctx.fillStyle='#8a7a6a';ctx.font='8px sans-serif';
ctx.fillText((ev.year<0?'BC'+Math.abs(ev.year):'AD'+ev.year),tx,ty+(side>0?18:-26));
});

ctx.fillStyle='#c4956a';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
ctx.fillText('📅 한국사 연대기 (BC2333 ~ AD612)',270,24);

p.innerHTML+='<button class="v16-close" onclick="document.getElementById(\'v16-timeline\').classList.remove(\'on\')">닫기</button>';
}

// ─── 10. SFX (12 sounds) ───
function playSFX16(type){
try{
var ac=getAudioCtx();var osc=ac.createOscillator();var g=ac.createGain();
osc.connect(g);g.connect(ac.destination);g.gain.value=0.12;
var presets={
affinity:{f:523.25,t:'sine',d:0.3},research:{f:659.25,t:'triangle',d:0.4},
skill_unlock:{f:783.99,t:'sine',d:0.5},wonder:{f:440,t:'triangle',d:0.6},
daily_claim:{f:880,t:'sine',d:0.3},bgm_play:{f:392,t:'triangle',d:0.2},
territory:{f:329.63,t:'sine',d:0.3},battle_stat:{f:587.33,t:'triangle',d:0.3},
timeline:{f:493.88,t:'sine',d:0.4},quiz_v16:{f:698.46,t:'sine',d:0.3},
ach_v16:{f:1046.5,t:'sine',d:0.5},menu_v16:{f:261.63,t:'triangle',d:0.15}
};
var p=presets[type]||{f:440,t:'sine',d:0.2};
osc.type=p.t;osc.frequency.value=p.f;
g.gain.setValueAtTime(0.12,ac.currentTime);
g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+p.d);
osc.start(ac.currentTime);osc.stop(ac.currentTime+p.d);
}catch(e){}
}

// ─── Quiz v16 (+15 questions: 120→135) ───
var V16_QUIZ=[
{q:'고조선의 건국 연도는?',a:'BC 2333',o:['BC 2333','BC 1122','BC 194','BC 57']},
{q:'단군의 어머니 웅녀는 어떤 동물이 변한 것인가?',a:'곰',o:['곰','호랑이','독수리','늑대']},
{q:'환웅이 내려온 산은?',a:'태백산',o:['태백산','한라산','설악산','지리산']},
{q:'고조선의 첫 도읍지는?',a:'아사달',o:['아사달','평양','서울','경주']},
{q:'위만조선을 멸망시킨 나라는?',a:'한나라',o:['한나라','수나라','당나라','원나라']},
{q:'주몽이 건국한 나라는?',a:'고구려',o:['고구려','백제','신라','가야']},
{q:'살수대첩의 영웅은?',a:'을지문덕',o:['을지문덕','연개소문','관창','김유신']},
{q:'문명 불가사의 최대 건설 비용은?',a:'1000 금화',o:['1000 금화','800 금화','500 금화','600 금화']},
{q:'기술 트리의 최종 기술은?',a:'제국통일',o:['제국통일','성골건축','강철제련','천문학']},
{q:'고조선 주변 세력이 아닌 것은?',a:'발해',o:['발해','부여','옥저','남랑']},
{q:'BGM 트랙 중 가장 빠른 BPM의 곡은?',a:'대장군의 분노',o:['대장군의 분노','출정의 북소리','승리의 팡파레','미지의 땅']},
{q:'영웅 관계도에서 단군의 부모는?',a:'환웅과 웅녀',o:['환웅과 웅녀','해모수와 유화','주몽과 소서노','온달과 평강']},
{q:'유닉 승급의 병종 수는?',a:'6종',o:['6종','4종','8종','10종']},
{q:'역사카드의 최고 등급은?',a:'전설(Legendary)',o:['전설(Legendary)','영웅(Epic)','희귀(Rare)','일반(Common)']},
{q:'고조선 영토 지도에서 적대 세력은?',a:'납랑',o:['납랑','부여','옥저','마한']}
];

function registerV16Quiz(){
if(typeof window.quizBank==='undefined')window.quizBank=[];
V16_QUIZ.forEach(function(q){
var exists=window.quizBank.some(function(eq){return eq.q===q.q});
if(!exists)window.quizBank.push(q);
});
}

// ─── Achievements (+12: 72→84) ───
var V16_ACH=[
{id:'tech_first',name:'첫 기술 연구',desc:'기술 1개 연구',icon:'🔬'},
{id:'tech_all',name:'문명의 꽃',desc:'전체 기술 연구 완료',icon:'🌸'},
{id:'skill_first',name:'첫 스킬 해금',desc:'영웅 스킬 1개 해금',icon:'⭐'},
{id:'skill_master',name:'스킬 마스터',desc:'영웅 스킬 12개 해금',icon:'🏆'},
{id:'wonder_first',name:'첫 불가사의',desc:'불가사의 1개 건설',icon:'🏛️'},
{id:'wonder_all',name:'건축의 왕',desc:'전체 불가사의 건설',icon:'👑'},
{id:'daily_first',name:'첫 일일도전',desc:'일일 도전 1개 완료',icon:'🌟'},
{id:'daily_all',name:'일일완번',desc:'모든 일일 도전 완료',icon:'🔥'},
{id:'bgm_listen',name:'음악 감상가',desc:'BGM 1곡 재생',icon:'🎵'},
{id:'territory_view',name:'세력 탐험가',desc:'세력 영토 지도 확인',icon:'🗺️'},
{id:'rel_check',name:'관계 분석가',desc:'영웅 관계도 확인',icon:'🤝'},
{id:'v16_explorer',name:'v16 탐험가',desc:'v16 모든 기능 확인',icon:'🚀'}
];

var v16AchUnlocked=[];
function loadV16Ach(){v16AchUnlocked=JSON.parse(localStorage.getItem('kRPG_v16ach')||'[]');}
function saveV16Ach(){localStorage.setItem('kRPG_v16ach',JSON.stringify(v16AchUnlocked));}

function checkV16Ach(achId){
if(v16AchUnlocked.indexOf(achId)>=0)return;
var ach=V16_ACH.find(function(a){return a.id===achId});if(!ach)return;
v16AchUnlocked.push(achId);saveV16Ach();
playSFX16('ach_v16');
showToast16('🏆 업적 해금: '+ach.name,'#FFD700');
var globalAch=JSON.parse(localStorage.getItem('krpg_ach')||'[]');
if(globalAch.indexOf('v16_'+achId)<0){globalAch.push('v16_'+achId);localStorage.setItem('krpg_ach',JSON.stringify(globalAch));}
}

// ─── Toast ───
function showToast16(msg,color){
var t=document.createElement('div');
t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:'+(color||'#333')+';color:#fff;padding:10px 20px;border-radius:20px;font-size:12px;z-index:9999;pointer-events:none;opacity:0;transition:opacity .3s;max-width:300px;text-align:center';
t.textContent=msg;document.body.appendChild(t);
requestAnimationFrame(function(){t.style.opacity='1'});
setTimeout(function(){t.style.opacity='0';setTimeout(function(){t.remove()},300)},2500);
}

// ─── Keyboard Shortcuts (8: Shift+T/K/S/M/W/B/D/L) ───
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
var map={
'KeyT':['v16-tech',renderTechPanel],
'KeyK':['v16-skill',renderSkillTreePanel],
'KeyS':['v16-bstats',renderBattleStatsPanel],
'KeyM':['v16-territory',renderTerritoryPanel],
'KeyW':['v16-wonder',renderWonderPanel],
'KeyB':['v16-bgm',renderBGMPanel],
'KeyD':['v16-daily',renderDailyPanel],
'KeyL':['v16-timeline',renderTimelinePanel]
};
if(map[e.code]){
e.preventDefault();var id=map[e.code][0],fn=map[e.code][1];
var el=document.getElementById(id);
if(el&&el.classList.contains('on')){el.classList.remove('on');}
else{fn();document.getElementById(id).classList.add('on');}
}
if(e.code==='KeyR'&&!e.ctrlKey){
e.preventDefault();var relEl=document.getElementById('v16-rel');
if(relEl&&relEl.classList.contains('on')){relEl.classList.remove('on');}
else{renderRelPanel();document.getElementById('v16-rel').classList.add('on');}
}
});

// ─── Menu Integration ───
function addV16Menu(){
var sidebar=document.querySelector('.sidebar-content,.action-buttons,[class*="menu"]');
if(!sidebar){setTimeout(addV16Menu,2000);return;}
var btns=[
{label:'🤝 관계',fn:function(){renderRelPanel();document.getElementById('v16-rel').classList.add('on');checkV16Ach('rel_check');}},
{label:'🔬 기술',fn:function(){renderTechPanel();document.getElementById('v16-tech').classList.add('on');}},
{label:'⭐ 스킬',fn:function(){renderSkillTreePanel();document.getElementById('v16-skill').classList.add('on');}},
{label:'🗺️ 세력',fn:function(){renderTerritoryPanel();document.getElementById('v16-territory').classList.add('on');checkV16Ach('territory_view');}},
{label:'🏛️ 불가사의',fn:function(){renderWonderPanel();document.getElementById('v16-wonder').classList.add('on');}},
{label:'📊 전투통계',fn:function(){renderBattleStatsPanel();document.getElementById('v16-bstats').classList.add('on');}},
{label:'🌟 일일도전',fn:function(){renderDailyPanel();document.getElementById('v16-daily').classList.add('on');}},
{label:'🎵 BGM',fn:function(){renderBGMPanel();document.getElementById('v16-bgm').classList.add('on');checkV16Ach('bgm_listen');}},
{label:'📅 연대기',fn:function(){renderTimelinePanel();document.getElementById('v16-timeline').classList.add('on');}}
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
function addV16FAB(){
var fab=document.createElement('div');
fab.style.cssText='position:fixed;bottom:60px;left:8px;display:flex;flex-direction:column;gap:4px;z-index:120';
var fabBtns=[
{label:'🤝',fn:function(){renderRelPanel();document.getElementById('v16-rel').classList.add('on');checkV16Ach('rel_check');}},
{label:'🔬',fn:function(){renderTechPanel();document.getElementById('v16-tech').classList.add('on');}},
{label:'⭐',fn:function(){renderSkillTreePanel();document.getElementById('v16-skill').classList.add('on');}},
{label:'🗺',fn:function(){renderTerritoryPanel();document.getElementById('v16-territory').classList.add('on');checkV16Ach('territory_view');}},
{label:'🏛',fn:function(){renderWonderPanel();document.getElementById('v16-wonder').classList.add('on');}},
{label:'📊',fn:function(){renderBattleStatsPanel();document.getElementById('v16-bstats').classList.add('on');}},
{label:'🌟',fn:function(){renderDailyPanel();document.getElementById('v16-daily').classList.add('on');}},
{label:'🎵',fn:function(){renderBGMPanel();document.getElementById('v16-bgm').classList.add('on');checkV16Ach('bgm_listen');}},
{label:'📅',fn:function(){renderTimelinePanel();document.getElementById('v16-timeline').classList.add('on');}}
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
function v16Init(){
loadAffinity();loadTech();loadHeroSkills();loadWonders();loadDaily();loadV16Ach();
registerV16Quiz();
setTimeout(addV16Menu,2000);
setTimeout(addV16FAB,2500);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',v16Init);}
else{v16Init();}

window._v16={HEROES:HEROES,RELATIONS:RELATIONS,TECH_TREE:TECH_TREE,HERO_SKILLS:HERO_SKILLS,TERRITORIES:TERRITORIES,WONDERS:WONDERS,BGM_TRACKS:BGM_TRACKS,TIMELINE_EVENTS:TIMELINE_EVENTS,V16_QUIZ:V16_QUIZ,V16_ACH:V16_ACH,playBGM:playBGM,stopBGM:stopBGM,playSFX16:playSFX16};
})();
