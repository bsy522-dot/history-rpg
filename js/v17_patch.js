// v17_patch.js — 한국사 영웅전 v17.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v17-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:135;overflow-y:auto;padding:16px}',
'.v17-panel.on{display:block}',
'.v17-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v17-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v17-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v17-close:hover{background:#8B2A1A}',

'.fog-canvas-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.fog-canvas-wrap canvas{border:2px solid #3a3a4a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px;cursor:pointer}',
'.fog-legend{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:12px}',
'.fog-legend span{font-size:10px;padding:3px 8px;border-radius:4px;border:1px solid #3a3a4a;background:rgba(26,20,40,.7)}',
'.fog-stats{text-align:center;font-size:12px;color:#c4956a;margin-bottom:8px}',
'.fog-btns{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',

'.dynasty-canvas-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.dynasty-canvas-wrap canvas{border:2px solid #5a4a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.dynasty-info{font-size:11px;color:#8a7a6a;text-align:center;line-height:1.8;max-width:400px;margin:0 auto 12px;background:rgba(20,15,10,.6);border:1px solid #3a3a2a;border-radius:8px;padding:12px}',
'.dynasty-info strong{color:#FFD700}',

'.squad-editor{max-width:560px;margin:0 auto}',
'.squad-slots{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:12px}',
'.squad-slot{background:rgba(20,15,30,.9);border:2px solid #3a3a5a;border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:all .3s;min-height:120px}',
'.squad-slot:hover{border-color:#5FA0FF;transform:translateY(-2px)}',
'.squad-slot.filled{border-color:#4CAF50}',
'.squad-slot .ss-icon{font-size:28px;margin-bottom:4px}',
'.squad-slot .ss-name{font-size:11px;color:#FFD700;font-weight:700}',
'.squad-slot .ss-class{font-size:9px;color:#8a7a8a;margin-top:2px}',
'.squad-slot .ss-equip{font-size:8px;color:#5FA0FF;margin-top:4px}',
'.squad-pool{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin:8px 0}',
'.pool-unit{padding:6px 12px;border:1px solid #4a3a5a;border-radius:6px;background:#1a1428;font-size:11px;cursor:pointer;transition:all .2s;color:#e8dcc8}',
'.pool-unit:hover{border-color:#FFD700;background:#2a2438}',
'.pool-unit.assigned{opacity:.4;cursor:not-allowed}',

'.alliance-wrap{max-width:560px;margin:0 auto}',
'.alliance-card{background:linear-gradient(135deg,rgba(20,30,20,.9),rgba(10,20,10,.95));border:2px solid #3a5a3a;border-radius:12px;padding:14px;margin-bottom:10px;display:flex;align-items:center;gap:12px;transition:all .3s}',
'.alliance-card:hover{border-color:#4CAF50;transform:translateY(-2px)}',
'.alliance-card.hostile{border-color:#5a3a3a;background:linear-gradient(135deg,rgba(30,20,20,.9),rgba(20,10,10,.95))}',
'.alliance-card .ac-icon{font-size:32px;flex-shrink:0}',
'.alliance-card .ac-info{flex:1}',
'.alliance-card .ac-name{font-size:13px;color:#FFD700;font-weight:700}',
'.alliance-card .ac-status{font-size:10px;margin-top:2px}',
'.alliance-card .ac-terms{font-size:9px;color:#8a7a6a;margin-top:4px;line-height:1.6}',
'.alliance-actions{display:flex;gap:4px;margin-top:6px}',
'.aa-btn{padding:4px 10px;border:1px solid #4a5a4a;border-radius:4px;background:#1a2a1a;color:#e8dcc8;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.aa-btn:hover{border-color:#4CAF50;background:#2a3a2a}',
'.aa-btn.hostile-btn{border-color:#5a3a3a;background:#2a1a1a}',
'.aa-btn.hostile-btn:hover{border-color:#F44336;background:#3a2a2a}',

'.victory-tracker{max-width:560px;margin:0 auto}',
'.vt-canvas-wrap{text-align:center}',
'.vt-canvas-wrap canvas{border:2px solid #3a3a4a;border-radius:10px;background:#0a0a14;display:block;margin:0 auto 12px}',
'.vt-conditions{display:grid;grid-template-columns:1fr;gap:10px;margin-top:12px}',
'.vt-card{background:rgba(20,15,30,.9);border:2px solid #3a3a5a;border-radius:10px;padding:14px;transition:all .3s}',
'.vt-card:hover{border-color:#FFD700}',
'.vt-card.achieved{border-color:#4CAF50;background:rgba(20,40,20,.9);box-shadow:0 0 15px rgba(76,175,80,.15)}',
'.vt-card h4{font-size:13px;color:#FFD700;margin-bottom:4px}',
'.vt-card p{font-size:10px;color:#8a7a8a;line-height:1.6}',
'.vt-bar{height:8px;background:#1a1a2e;border-radius:4px;overflow:hidden;margin:6px 0}',
'.vt-bar-fill{height:100%;border-radius:4px;transition:width .5s}',
'.vt-bar-mil{background:linear-gradient(90deg,#F44336,#FF5722)}',
'.vt-bar-cul{background:linear-gradient(90deg,#9C27B0,#E91E63)}',
'.vt-bar-eco{background:linear-gradient(90deg,#FF9800,#FFD700)}',
'.vt-bar-dip{background:linear-gradient(90deg,#2196F3,#00BCD4)}',
'.vt-pct{font-size:11px;color:#FFD700;font-weight:700}',

'.event-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-width:560px;margin:0 auto}',
'.event-card{background:linear-gradient(135deg,rgba(40,30,15,.95),rgba(25,18,8,.95));border:2px solid #6a5a3a;border-radius:12px;padding:14px;text-align:center;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}',
'.event-card:hover{border-color:#FFD700;transform:translateY(-3px);box-shadow:0 6px 20px rgba(196,149,106,.15)}',
'.event-card.triggered{border-color:#4CAF50;opacity:.7}',
'.event-card .ec-icon{font-size:32px;margin-bottom:6px}',
'.event-card .ec-name{font-size:11px;color:#FFD700;font-weight:700}',
'.event-card .ec-desc{font-size:9px;color:#8a7a6a;margin-top:4px;line-height:1.5}',
'.event-card .ec-effect{font-size:9px;color:#5FA0FF;margin-top:6px;font-weight:600}',

'.morale-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.morale-gauge{width:300px;height:300px;margin:0 auto 12px;position:relative}',
'.morale-gauge canvas{display:block;margin:0 auto}',
'.morale-factors{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;max-width:400px;margin:0 auto 12px}',
'.mf-item{background:rgba(26,20,40,.8);border:1px solid #3a3a4a;border-radius:8px;padding:8px;text-align:center;transition:all .3s}',
'.mf-item:hover{border-color:#FFD700}',
'.mf-item .mf-val{font-size:20px;font-weight:900}',
'.mf-item .mf-label{font-size:9px;color:#8a7a6a;margin-top:2px}',
'.morale-actions{display:flex;gap:6px;justify-content:center;flex-wrap:wrap}',
'.morale-btn{padding:8px 14px;border:1px solid #4a3a5a;border-radius:6px;background:#2a1a3a;color:#e8dcc8;font-size:11px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.morale-btn:hover{border-color:#FFD700;background:#3a2a4a}',

'.terrain-sim{max-width:560px;margin:0 auto;text-align:center}',
'.terrain-sim canvas{border:2px solid #3a3a4a;border-radius:10px;background:#0a0a14;display:block;margin:0 auto 12px;cursor:crosshair}',
'.terrain-palette{display:flex;gap:4px;justify-content:center;flex-wrap:wrap;margin-bottom:8px}',
'.tp-btn{padding:6px 12px;border:1px solid #3a4a3a;border-radius:6px;background:#1a2a1a;color:#e8dcc8;font-size:10px;cursor:pointer;transition:all .2s}',
'.tp-btn:hover,.tp-btn.active{border-color:#4CAF50;background:#2a3a2a;color:#FFD700}',
'.terrain-info{font-size:11px;color:#8a7a6a;max-width:400px;margin:0 auto 8px;line-height:1.6}'
].join('\n');
document.head.appendChild(css);

// ─── 1. Fog of War Canvas Map ───
var FOG_MAP_W=16,FOG_MAP_H=12;
var fogMap=[];
var fogExplored=0;
var FOG_TILES=[
{id:'plains',name:'평원',color:'#4a6a2a',char:'.',bonus:'이동 +1'},
{id:'forest',name:'숲',color:'#2a4a1a',char:'♣',bonus:'은폐 +30%'},
{id:'mountain',name:'산',color:'#6a5a4a',char:'▲',bonus:'방어 +40%'},
{id:'river',name:'강',color:'#2a4a6a',char:'~',bonus:'이동 -1'},
{id:'village',name:'마을',color:'#6a6a3a',char:'⌂',bonus:'보급 +20'},
{id:'fortress',name:'요새',color:'#8a6a3a',char:'■',bonus:'방어 +60%'},
{id:'ruins',name:'유적',color:'#5a4a5a',char:'◊',bonus:'유물 발견'},
{id:'cave',name:'동굴',color:'#3a3a4a',char:'○',bonus:'매복 가능'}
];

function initFogMap(){
fogMap=[];
var seed=parseInt(localStorage.getItem('kRPG_fogSeed')||String(Date.now()%10000));
localStorage.setItem('kRPG_fogSeed',String(seed));
for(var y=0;y<FOG_MAP_H;y++){
fogMap[y]=[];
for(var x=0;x<FOG_MAP_W;x++){
var r=((seed*131+x*37+y*73)%256)/256;
var tileIdx=r<.3?0:r<.45?1:r<.55?2:r<.65?3:r<.75?4:r<.82?5:r<.91?6:7;
fogMap[y][x]={tile:tileIdx,revealed:false};
}}
}

var fogRevealed=[];
function loadFog(){var d=JSON.parse(localStorage.getItem('kRPG_fog')||'null');if(d&&Array.isArray(d))fogRevealed=d;else fogRevealed=[];}
function saveFog(){localStorage.setItem('kRPG_fog',JSON.stringify(fogRevealed))}

function revealFog(cx,cy,radius){
var revealed=0;
for(var dy=-radius;dy<=radius;dy++){for(var dx=-radius;dx<=radius;dx++){
var nx=cx+dx,ny=cy+dy;
if(nx<0||nx>=FOG_MAP_W||ny<0||ny>=FOG_MAP_H)continue;
if(dx*dx+dy*dy>radius*radius)continue;
var key=nx+','+ny;
if(fogRevealed.indexOf(key)<0){fogRevealed.push(key);revealed++;}
}}
saveFog();
fogExplored=fogRevealed.length;
return revealed;
}

function drawFogMap(canvas){
var ctx=canvas.getContext('2d');
var W=canvas.width,H=canvas.height;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);
var tw=W/FOG_MAP_W,th=H/FOG_MAP_H;

for(var y=0;y<FOG_MAP_H;y++){for(var x=0;x<FOG_MAP_W;x++){
var key=x+','+y;
var isRevealed=fogRevealed.indexOf(key)>=0;
var px=x*tw,py=y*th;
if(isRevealed){
var tile=FOG_TILES[fogMap[y][x].tile];
ctx.fillStyle=tile.color;ctx.fillRect(px+1,py+1,tw-2,th-2);
ctx.fillStyle='#fff';ctx.font='bold '+Math.floor(th*.5)+'px monospace';ctx.textAlign='center';
ctx.fillText(tile.char,px+tw/2,py+th*.7);
}else{
ctx.fillStyle='#1a1a2a';ctx.fillRect(px+1,py+1,tw-2,th-2);
ctx.fillStyle='#2a2a3a';ctx.font=Math.floor(th*.4)+'px monospace';ctx.textAlign='center';
ctx.fillText('?',px+tw/2,py+th*.65);
}
}}

ctx.strokeStyle='#3a3a4a';ctx.lineWidth=0.5;
for(var gx=0;gx<=FOG_MAP_W;gx++){ctx.beginPath();ctx.moveTo(gx*tw,0);ctx.lineTo(gx*tw,H);ctx.stroke();}
for(var gy=0;gy<=FOG_MAP_H;gy++){ctx.beginPath();ctx.moveTo(0,gy*th);ctx.lineTo(W,gy*th);ctx.stroke();}

var pct=Math.round(fogRevealed.length/(FOG_MAP_W*FOG_MAP_H)*100);
ctx.fillStyle='#FFD700';ctx.font='bold 12px sans-serif';ctx.textAlign='center';
ctx.fillText('탐사율: '+pct+'% ('+fogRevealed.length+'/'+(FOG_MAP_W*FOG_MAP_H)+')',W/2,H-8);
}

// ─── 2. Dynasty Genealogy Canvas ───
var DYNASTY_NODES=[
{id:'hwanin',name:'환인',title:'천제',x:280,y:30,gen:0,icon:'☀️'},
{id:'hwanung',name:'환웅',title:'천왕',x:200,y:100,gen:1,icon:'☁️',parent:'hwanin'},
{id:'ungnyeo',name:'웅녀',title:'곰여인→인간',x:360,y:100,gen:1,icon:'🐻'},
{id:'dangun',name:'단군왕검',title:'고조선 건국',x:280,y:180,gen:2,icon:'👑',parent:'hwanung',mother:'ungnyeo'},
{id:'buyeo_king',name:'해부루',title:'부여왕',x:140,y:260,gen:3,icon:'⚔️',parent:'dangun'},
{id:'geumwa',name:'금와왕',title:'동부여왕',x:140,y:340,gen:4,icon:'🛡️',parent:'buyeo_king'},
{id:'haemosu',name:'해모수',title:'천제의 아들',x:350,y:260,gen:3,icon:'☀️'},
{id:'yuhwa',name:'유화',title:'하백의 딸',x:450,y:260,gen:3,icon:'💧'},
{id:'jumong',name:'주몽',title:'고구려 건국',x:400,y:340,gen:4,icon:'🏹',parent:'haemosu',mother:'yuhwa'},
{id:'biryu',name:'비류',title:'미추홀',x:340,y:420,gen:5,icon:'⛵',parent:'jumong'},
{id:'onjo',name:'온조',title:'백제 건국',x:460,y:420,gen:5,icon:'🏯',parent:'jumong'},
{id:'yuri',name:'유리왕',title:'고구려 2대왕',x:400,y:420,gen:5,icon:'👤',parent:'jumong'}
];

var DYNASTY_LINKS=[
['hwanin','hwanung'],['hwanung','dangun'],['ungnyeo','dangun'],
['dangun','buyeo_king'],['buyeo_king','geumwa'],
['haemosu','jumong'],['yuhwa','jumong'],
['jumong','biryu'],['jumong','onjo'],['jumong','yuri']
];

function drawDynastyCanvas(canvas){
var ctx=canvas.getContext('2d');
ctx.clearRect(0,0,560,460);
ctx.fillStyle='#0a0814';ctx.fillRect(0,0,560,460);

ctx.fillStyle='#3a3a4a';ctx.font='bold 10px monospace';ctx.textAlign='center';
ctx.fillText('고조선 ~ 삼국 왕조 계보도',280,16);

DYNASTY_LINKS.forEach(function(link){
var n1=DYNASTY_NODES.find(function(n){return n.id===link[0]});
var n2=DYNASTY_NODES.find(function(n){return n.id===link[1]});
if(!n1||!n2)return;
ctx.beginPath();ctx.moveTo(n1.x,n1.y+18);ctx.lineTo(n2.x,n2.y-18);
ctx.strokeStyle='rgba(196,149,106,0.4)';ctx.lineWidth=2;ctx.setLineDash([4,4]);
ctx.stroke();ctx.setLineDash([]);
});

DYNASTY_NODES.forEach(function(n){
ctx.beginPath();ctx.arc(n.x,n.y,20,0,Math.PI*2);
var grad=ctx.createRadialGradient(n.x,n.y,5,n.x,n.y,20);
var baseColor=n.gen===0?'#FFD700':n.gen<=2?'#C4956A':n.gen<=3?'#8a7a5a':'#5a6a8a';
grad.addColorStop(0,baseColor);grad.addColorStop(1,baseColor+'44');
ctx.fillStyle=grad;ctx.fill();
ctx.strokeStyle=baseColor;ctx.lineWidth=2;ctx.stroke();

ctx.fillStyle='#fff';ctx.font='14px sans-serif';ctx.textAlign='center';
ctx.fillText(n.icon,n.x,n.y+5);

ctx.fillStyle='#e8dcc8';ctx.font='bold 10px sans-serif';
ctx.fillText(n.name,n.x,n.y+34);
ctx.fillStyle='#8a7a6a';ctx.font='8px sans-serif';
ctx.fillText(n.title,n.x,n.y+44);
});
}

// ─── 3. Squad Editor (6 slots, unit assignment) ───
var UNIT_POOL=[
{id:'warrior',name:'보병',icon:'🗡️',cls:'근접',atk:12,def:10,spd:3},
{id:'archer',name:'궁병',icon:'🏹',cls:'원거리',atk:14,def:6,spd:4},
{id:'cavalry',name:'기병',icon:'🐴',cls:'돌격',atk:16,def:8,spd:6},
{id:'shaman',name:'무당',icon:'🔮',cls:'지원',atk:8,def:5,spd:3,heal:15},
{id:'general',name:'장군',icon:'⚔️',cls:'지휘',atk:15,def:12,spd:4,lead:10},
{id:'scout',name:'척후병',icon:'👁️',cls:'정찰',atk:10,def:7,spd:7},
{id:'shield',name:'방패병',icon:'🛡️',cls:'방어',atk:8,def:18,spd:2},
{id:'siege',name:'공성병',icon:'💣',cls:'공성',atk:20,def:4,spd:1},
{id:'monk',name:'승려',icon:'📿',cls:'치유',atk:5,def:8,spd:3,heal:20},
{id:'spy',name:'첩자',icon:'🥷',cls:'은밀',atk:13,def:5,spd:8}
];

var squadSlots=[null,null,null,null,null,null];
function loadSquad(){var d=JSON.parse(localStorage.getItem('kRPG_squad')||'null');if(d&&Array.isArray(d))squadSlots=d;}
function saveSquad(){localStorage.setItem('kRPG_squad',JSON.stringify(squadSlots))}

function assignUnit(slotIdx,unitId){
for(var i=0;i<squadSlots.length;i++){if(squadSlots[i]===unitId)squadSlots[i]=null;}
squadSlots[slotIdx]=unitId;
saveSquad();v17SFX('squad_assign');
v17CheckAch('squad_builder');
}

function removeUnit(slotIdx){
squadSlots[slotIdx]=null;saveSquad();
}

// ─── 4. Alliance System ───
var ALLIANCE_NATIONS=[
{id:'buyeo',name:'부여',icon:'🐎',attitude:40,desc:'동쪽의 기마 민족. 영고 축제로 유명'},
{id:'han_dynasty',name:'한(漢)',icon:'🏯',attitude:-30,desc:'서쪽의 대제국. 고조선과 긴장 관계'},
{id:'yemaek',name:'예맥',icon:'🗻',attitude:20,desc:'산간 민족. 무천 축제'},
{id:'okjeo',name:'옥저',icon:'🐟',attitude:50,desc:'동해안 어로 민족. 민며느리제'},
{id:'samhan',name:'삼한',icon:'🌾',attitude:35,desc:'남방의 연맹체. 소도 제사'}
];

var allianceState={};
function loadAlliance(){var d=JSON.parse(localStorage.getItem('kRPG_alliance')||'null');if(d)allianceState=d;else{ALLIANCE_NATIONS.forEach(function(n){allianceState[n.id]={attitude:n.attitude,treaty:null,tradeOpen:false}});}}
function saveAlliance(){localStorage.setItem('kRPG_alliance',JSON.stringify(allianceState))}

function diplomaticAction(nationId,action){
var state=allianceState[nationId];if(!state)return;
var gState=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
switch(action){
case'gift':
if((gState.gold||0)<100){v17Toast('금화 부족! (100G 필요)','#F44336');return;}
gState.gold-=100;localStorage.setItem('kRPG_state',JSON.stringify(gState));
state.attitude=Math.min(100,state.attitude+15);
v17Toast('🎁 선물 전달! 우호도 +15','#4CAF50');break;
case'trade':
if(state.attitude<20){v17Toast('우호도 20 이상 필요','#F44336');return;}
state.tradeOpen=!state.tradeOpen;
v17Toast(state.tradeOpen?'📦 교역 개시!':'교역 중단','#FF9800');break;
case'treaty':
if(state.attitude<60){v17Toast('우호도 60 이상 필요','#F44336');return;}
state.treaty='alliance';
v17Toast('🤝 동맹 체결!','#4CAF50');break;
case'threaten':
state.attitude=Math.max(-100,state.attitude-20);
v17Toast('⚔️ 위협! 우호도 -20','#F44336');break;
}
saveAlliance();v17SFX('diplomacy');
v17CheckAch('alliance_master');
}

// ─── 5. Victory Condition Tracker (Canvas) ───
var VICTORY_CONDITIONS=[
{id:'military',name:'군사 정복',icon:'⚔️',desc:'전투 30승 달성, 모든 챕터 클리어',color:'#F44336',target:100},
{id:'cultural',name:'문화 승리',icon:'🏛️',desc:'문화점수 200+, 모든 유산 건설',color:'#9C27B0',target:100},
{id:'economic',name:'경제 번영',icon:'💰',desc:'금화 5000+ 보유, 교역로 6개 개방',color:'#FF9800',target:100},
{id:'diplomatic',name:'외교 승리',icon:'🤝',desc:'5개국 동맹, 평균 우호도 60+',color:'#2196F3',target:100}
];

function calcVictoryProgress(){
var stats=JSON.parse(localStorage.getItem('kRPG_stats')||'{}');
var gState=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
var culture=JSON.parse(localStorage.getItem('kRPG_culture')||'{}');
var milPct=Math.min(100,((stats.wins||0)/30)*100);
var culPct=Math.min(100,((culture.score||0)/200)*100);
var ecoPct=Math.min(100,((gState.gold||0)/5000)*100);
var dipPct=0;
var totalAtt=0,treatyCount=0;
ALLIANCE_NATIONS.forEach(function(n){
var s=allianceState[n.id];if(s){totalAtt+=s.attitude;if(s.treaty==='alliance')treatyCount++;}
});
dipPct=Math.min(100,(treatyCount/5*50)+(Math.max(0,totalAtt/5)/60*50));
return [milPct,culPct,ecoPct,dipPct];
}

function drawVictoryCanvas(canvas){
var ctx=canvas.getContext('2d');
ctx.clearRect(0,0,500,280);
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,500,280);

ctx.fillStyle='#3a3a4a';ctx.font='bold 10px monospace';ctx.textAlign='center';
ctx.fillText('승리 조건 달성률',250,18);

var progress=calcVictoryProgress();
var barW=400,barH=30,startX=50,startY=40;

VICTORY_CONDITIONS.forEach(function(vc,i){
var y=startY+i*60;
ctx.fillStyle=vc.color+'44';ctx.fillRect(startX,y,barW,barH);
var fillW=barW*progress[i]/100;
var grad=ctx.createLinearGradient(startX,y,startX+fillW,y);
grad.addColorStop(0,vc.color+'88');grad.addColorStop(1,vc.color);
ctx.fillStyle=grad;ctx.fillRect(startX,y,fillW,barH);
ctx.strokeStyle=vc.color+'88';ctx.strokeRect(startX,y,barW,barH);

ctx.fillStyle='#e8dcc8';ctx.font='bold 11px sans-serif';ctx.textAlign='left';
ctx.fillText(vc.icon+' '+vc.name,startX+6,y+20);
ctx.textAlign='right';ctx.fillStyle='#FFD700';
ctx.fillText(Math.round(progress[i])+'%',startX+barW-6,y+20);

ctx.fillStyle='#5a5a6a';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText(vc.desc,startX,y+barH+12);
});
}

// ─── 6. Historical Event Cards (12 events) ───
var EVENT_CARDS=[
{id:'flood',name:'대홍수',icon:'🌊',desc:'강이 범람하여 농경지가 침수',effect:'식량 -30, 제방 건설 기회',type:'disaster'},
{id:'harvest',name:'풍년',icon:'🌾',desc:'하늘이 도와 대풍년이 들다',effect:'식량 +50, 사기 +10',type:'bless'},
{id:'meteor',name:'별똥별',icon:'☄️',desc:'하늘에서 불덩이가 떨어지다',effect:'문화 +20, 천문학 발전',type:'wonder'},
{id:'plague',name:'역병',icon:'🦠',desc:'원인 모를 병이 퍼지다',effect:'인구 -20%, 의술 발전',type:'disaster'},
{id:'emissary',name:'사절단 도착',icon:'📜',desc:'먼 나라에서 사절이 오다',effect:'외교 +15, 교역 기회',type:'diplomacy'},
{id:'iron_vein',name:'철광맥 발견',icon:'⛏️',desc:'산에서 풍부한 철광맥 발견',effect:'철 +40, 무기 생산 +25%',type:'resource'},
{id:'rebellion',name:'반란',icon:'🔥',desc:'불만을 품은 백성이 봉기',effect:'사기 -20, 개혁 기회',type:'disaster'},
{id:'trade_ship',name:'무역선 도착',icon:'⛵',desc:'먼 바다에서 무역선이 도착',effect:'금화 +200, 희귀 물품',type:'trade'},
{id:'eclipse',name:'일식',icon:'🌑',desc:'해가 가려지니 백성이 두려워하다',effect:'사기 -10, 천문 +15',type:'wonder'},
{id:'hero_born',name:'영웅 탄생',icon:'⭐',desc:'하늘의 기운을 받고 영웅이 태어나다',effect:'장수 1명 획득, 사기 +20',type:'bless'},
{id:'drought',name:'가뭄',icon:'🏜️',desc:'비가 오지 않아 땅이 갈라지다',effect:'식량 -40, 관개 필요',type:'disaster'},
{id:'ancient_scroll',name:'고대 두루마리',icon:'📜',desc:'유적에서 고대 문서를 발견',effect:'기술 연구 -50% 비용',type:'resource'}
];

var triggeredEvents=[];
function loadEvents(){var d=JSON.parse(localStorage.getItem('kRPG_events')||'[]');if(Array.isArray(d))triggeredEvents=d;}
function saveEvents(){localStorage.setItem('kRPG_events',JSON.stringify(triggeredEvents))}

function triggerEvent(eventId){
if(triggeredEvents.indexOf(eventId)>=0){v17Toast('이미 발생한 이벤트!','#FF9800');return;}
var ev=EVENT_CARDS.find(function(e){return e.id===eventId});if(!ev)return;
triggeredEvents.push(eventId);saveEvents();
v17SFX('event_trigger');
v17Toast(ev.icon+' '+ev.name+': '+ev.effect,'#c4956a');
v17CheckAch('event_master');
}

// ─── 7. Morale System (Army morale gauge) ───
var moraleState={value:70,factors:{leadership:15,supply:10,victory:10,weather:5,rest:10,faith:10,discipline:10}};
function loadMorale(){var d=JSON.parse(localStorage.getItem('kRPG_morale')||'null');if(d)moraleState=d;}
function saveMorale(){localStorage.setItem('kRPG_morale',JSON.stringify(moraleState))}

function drawMoraleGauge(canvas){
var ctx=canvas.getContext('2d');
ctx.clearRect(0,0,300,300);

var cx=150,cy=150,R=120;
ctx.beginPath();ctx.arc(cx,cy,R,0.75*Math.PI,0.25*Math.PI);
ctx.strokeStyle='#1a1a2a';ctx.lineWidth=20;ctx.lineCap='round';ctx.stroke();

var pct=moraleState.value/100;
var startAngle=0.75*Math.PI;
var endAngle=startAngle+(0.25*Math.PI-0.75*Math.PI+2*Math.PI)*pct;
ctx.beginPath();ctx.arc(cx,cy,R,startAngle,endAngle);
var color=pct>0.7?'#4CAF50':pct>0.4?'#FF9800':'#F44336';
ctx.strokeStyle=color;ctx.lineWidth=20;ctx.lineCap='round';ctx.stroke();

ctx.fillStyle='#FFD700';ctx.font='bold 36px sans-serif';ctx.textAlign='center';
ctx.fillText(moraleState.value,cx,cy+10);
ctx.fillStyle='#8a7a6a';ctx.font='11px sans-serif';
ctx.fillText('군 사기',cx,cy+28);

var grade=moraleState.value>=90?'S':moraleState.value>=70?'A':moraleState.value>=50?'B':moraleState.value>=30?'C':'D';
var gradeColor=grade==='S'?'#FFD700':grade==='A'?'#4CAF50':grade==='B'?'#2196F3':grade==='C'?'#FF9800':'#F44336';
ctx.fillStyle=gradeColor;ctx.font='bold 18px sans-serif';
ctx.fillText('등급: '+grade,cx,cy+50);
}

function adjustMorale(factor,delta){
moraleState.factors[factor]=Math.max(0,Math.min(20,(moraleState.factors[factor]||0)+delta));
var total=0;var keys=Object.keys(moraleState.factors);
keys.forEach(function(k){total+=moraleState.factors[k]});
moraleState.value=Math.min(100,Math.max(0,total));
saveMorale();v17SFX('morale_change');
v17CheckAch('morale_master');
}

// ─── 8. Terrain Battle Simulator (Canvas) ───
var TERRAIN_TYPES=[
{id:'grass',name:'초원',color:'#4a7a2a',def:0,mov:1,icon:'🌱'},
{id:'forest',name:'숲',color:'#2a5a1a',def:20,mov:2,icon:'🌲'},
{id:'hill',name:'언덕',color:'#7a6a3a',def:15,mov:2,icon:'⛰️'},
{id:'water',name:'강',color:'#2a4a7a',def:-10,mov:3,icon:'🌊'},
{id:'sand',name:'사막',color:'#8a7a4a',def:0,mov:2,icon:'🏜️'},
{id:'fort',name:'요새',color:'#5a4a3a',def:40,mov:1,icon:'🏰'},
{id:'swamp',name:'늪',color:'#3a5a4a',def:-5,mov:3,icon:'🌿'},
{id:'road',name:'도로',color:'#6a6a5a',def:0,mov:0,icon:'🛤️'}
];

var terrainGrid=[];
var currentTerrainBrush=0;
function initTerrainGrid(){
terrainGrid=[];
for(var y=0;y<10;y++){terrainGrid[y]=[];for(var x=0;x<14;x++){terrainGrid[y][x]=0;}}
}
function loadTerrain(){var d=JSON.parse(localStorage.getItem('kRPG_terrain')||'null');if(d&&Array.isArray(d))terrainGrid=d;else initTerrainGrid();}
function saveTerrain(){localStorage.setItem('kRPG_terrain',JSON.stringify(terrainGrid))}

function drawTerrainSim(canvas){
var ctx=canvas.getContext('2d');
var W=canvas.width,H=canvas.height;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,W,H);

var tw=W/14,th=(H-30)/10;
for(var y=0;y<10;y++){for(var x=0;x<14;x++){
var t=TERRAIN_TYPES[terrainGrid[y][x]];
ctx.fillStyle=t.color;ctx.fillRect(x*tw+1,y*th+1,tw-2,th-2);
ctx.fillStyle='#fff';ctx.font=Math.floor(th*.5)+'px sans-serif';ctx.textAlign='center';
ctx.fillText(t.icon,x*tw+tw/2,y*th+th*.65);
}}

ctx.strokeStyle='#3a3a4a';ctx.lineWidth=0.5;
for(var gx=0;gx<=14;gx++){ctx.beginPath();ctx.moveTo(gx*tw,0);ctx.lineTo(gx*tw,10*th);ctx.stroke();}
for(var gy=0;gy<=10;gy++){ctx.beginPath();ctx.moveTo(0,gy*th);ctx.lineTo(W,gy*th);ctx.stroke();}

ctx.fillStyle='#FFD700';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
ctx.fillText('전장 지형 시뮬레이터 — 클릭하여 지형 배치',W/2,H-10);
}

// ─── Quiz (15 new questions: 136~150) ───
var V17_QUIZ=[
{q:'고조선의 건국 연도로 알려진 것은?',a:['BC 2333','BC 1000','BC 500','AD 42'],c:0},
{q:'환웅이 데리고 온 세 신하는?',a:['풍백, 우사, 운사','신라, 백제, 고구려','이, 박, 김','해, 달, 별'],c:0},
{q:'단군왕검이 다스린 이념은?',a:['홍익인간','정전법','균역법','천명사상'],c:0},
{q:'고조선의 8조법 중 현재 전해지는 조항 수는?',a:['3조','5조','7조','8조'],c:0},
{q:'부여의 가축 이름으로 관직을 지은 것이 아닌 것은?',a:['양가','마가','우가','저가'],c:0},
{q:'동예의 특산물로 유명한 것은?',a:['단궁, 과하마, 반어피','비단, 도자기','철기, 칠기','금, 은'],c:0},
{q:'삼한에서 천군이 다스리는 신성구역은?',a:['소도','서당','국학','태학'],c:0},
{q:'변한 지역에서 나중에 성장한 나라는?',a:['가야','신라','백제','고구려'],c:0},
{q:'고조선의 수도 아사달의 추정 위치는?',a:['평양 일대','서울','경주','부산'],c:0},
{q:'삼한의 제정분리를 보여주는 증거는?',a:['천군과 주수의 분리','왕과 재상','문관과 무관','중앙과 지방'],c:0},
{q:'고인돌이 가장 많이 발견된 나라는?',a:['한국','중국','일본','인도'],c:0},
{q:'비파형 동검이 출토되는 주요 지역은?',a:['요동~한반도','일본 열도','동남아','시베리아'],c:0},
{q:'옥저에서 시행된 장례 풍습은?',a:['가족 공동묘(세골장)','화장','수장','토장'],c:0},
{q:'청동기 시대의 대표적 토기는?',a:['민무늬토기','빗살무늬토기','가야토기','백자'],c:0},
{q:'전쟁에서 사기(모럴)가 중요한 이유는?',a:['전투력에 직접 영향','무기 성능 향상','지형 변화','날씨 변화'],c:0}
];

function registerV17Quiz(){
if(window.QUIZ_DATA&&Array.isArray(window.QUIZ_DATA)){
V17_QUIZ.forEach(function(q){var exists=window.QUIZ_DATA.some(function(eq){return eq.q===q.q});if(!exists)window.QUIZ_DATA.push(q);});
}
}

// ─── Achievements (12 new: 85~96) ───
var V17_ACH=[
{id:'fog_explorer',name:'탐험가',desc:'전쟁안개 50% 탐사',icon:'🗺️'},
{id:'fog_complete',name:'지도 완성자',desc:'전쟁안개 100% 탐사',icon:'🌍'},
{id:'dynasty_scholar',name:'계보학자',desc:'왕조 계보도 5회 열람',icon:'👑'},
{id:'squad_builder',name:'편대 편성관',desc:'편대 6슬롯 모두 배치',icon:'🎖️'},
{id:'alliance_master',name:'동맹의 달인',desc:'외교 행동 10회 수행',icon:'🤝'},
{id:'alliance_all',name:'만국평화',desc:'5개국 모두 동맹',icon:'🕊️'},
{id:'victory_mil',name:'정복자',desc:'군사 승리조건 100%',icon:'⚔️'},
{id:'victory_any',name:'승리자',desc:'아무 승리조건 1개 달성',icon:'🏆'},
{id:'event_master',name:'역사의 증인',desc:'이벤트 8개 이상 경험',icon:'📜'},
{id:'morale_master',name:'사기충천',desc:'사기 90 이상 달성',icon:'🔥'},
{id:'terrain_artist',name:'지형 설계가',desc:'전장 지형 40칸 이상 배치',icon:'🗻'},
{id:'v17_explorer',name:'v17 탐험가',desc:'v17 기능 8개 모두 사용',icon:'🌟'}
];

var v17AchProgress={};
function loadV17Ach(){var d=JSON.parse(localStorage.getItem('kRPG_v17ach')||'{}');v17AchProgress=d;}
function saveV17Ach(){localStorage.setItem('kRPG_v17ach',JSON.stringify(v17AchProgress))}

function v17CheckAch(type){
if(!v17AchProgress[type])v17AchProgress[type]=0;
v17AchProgress[type]++;saveV17Ach();
var thresholds={fog_explorer:1,fog_complete:1,dynasty_scholar:5,squad_builder:6,alliance_master:10,alliance_all:5,victory_mil:1,victory_any:1,event_master:8,morale_master:1,terrain_artist:40,v17_explorer:8};
if(thresholds[type]&&v17AchProgress[type]>=thresholds[type]){
var ach=V17_ACH.find(function(a){return a.id===type});
if(ach)v17Toast('🏆 업적 달성: '+ach.name,'#FFD700');
}
}

// ─── SFX Engine (12 sounds) ───
var v17Audio=null;
function getV17Ctx(){if(!v17Audio)v17Audio=new(window.AudioContext||window.webkitAudioContext)();return v17Audio;}

function v17SFX(type){
try{
var ctx=getV17Ctx();var osc=ctx.createOscillator();var gain=ctx.createGain();
osc.connect(gain);gain.connect(ctx.destination);var now=ctx.currentTime;
gain.gain.setValueAtTime(0.12,now);
switch(type){
case'fog_reveal':osc.type='sine';osc.frequency.setValueAtTime(330,now);osc.frequency.setValueAtTime(440,now+0.08);osc.frequency.setValueAtTime(554,now+0.16);gain.gain.exponentialRampToValueAtTime(0.001,now+0.3);break;
case'dynasty_open':osc.type='triangle';osc.frequency.setValueAtTime(262,now);osc.frequency.linearRampToValueAtTime(523,now+0.3);gain.gain.exponentialRampToValueAtTime(0.001,now+0.45);break;
case'squad_assign':osc.type='square';osc.frequency.setValueAtTime(200,now);osc.frequency.setValueAtTime(300,now+0.05);osc.frequency.setValueAtTime(400,now+0.1);gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);break;
case'diplomacy':osc.type='sine';osc.frequency.setValueAtTime(392,now);osc.frequency.setValueAtTime(494,now+0.12);osc.frequency.setValueAtTime(587,now+0.24);gain.gain.exponentialRampToValueAtTime(0.001,now+0.4);break;
case'victory_progress':osc.type='sine';osc.frequency.setValueAtTime(523,now);osc.frequency.setValueAtTime(659,now+0.1);osc.frequency.setValueAtTime(784,now+0.2);gain.gain.exponentialRampToValueAtTime(0.001,now+0.4);break;
case'event_trigger':osc.type='triangle';osc.frequency.setValueAtTime(440,now);osc.frequency.setValueAtTime(330,now+0.1);osc.frequency.setValueAtTime(554,now+0.2);gain.gain.exponentialRampToValueAtTime(0.001,now+0.35);break;
case'morale_change':osc.type='sawtooth';osc.frequency.setValueAtTime(220,now);osc.frequency.linearRampToValueAtTime(440,now+0.15);gain.gain.setValueAtTime(0.06,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.25);break;
case'terrain_place':osc.type='square';osc.frequency.setValueAtTime(150,now);osc.frequency.setValueAtTime(200,now+0.04);gain.gain.setValueAtTime(0.05,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.1);break;
case'morale_boost':osc.type='sine';osc.frequency.setValueAtTime(440,now);osc.frequency.setValueAtTime(554,now+0.08);osc.frequency.setValueAtTime(659,now+0.16);osc.frequency.setValueAtTime(880,now+0.24);gain.gain.exponentialRampToValueAtTime(0.001,now+0.45);break;
case'alliance_treaty':osc.type='sine';osc.frequency.setValueAtTime(523,now);osc.frequency.setValueAtTime(659,now+0.15);osc.frequency.setValueAtTime(784,now+0.3);gain.gain.exponentialRampToValueAtTime(0.001,now+0.5);break;
case'event_card':osc.type='triangle';osc.frequency.setValueAtTime(349,now);osc.frequency.setValueAtTime(440,now+0.1);osc.frequency.setValueAtTime(523,now+0.2);gain.gain.exponentialRampToValueAtTime(0.001,now+0.35);break;
case'achieve_v17':osc.type='sine';osc.frequency.setValueAtTime(523,now);osc.frequency.setValueAtTime(659,now+0.08);osc.frequency.setValueAtTime(784,now+0.16);osc.frequency.setValueAtTime(1047,now+0.24);gain.gain.exponentialRampToValueAtTime(0.001,now+0.5);break;
}
osc.start(now);osc.stop(now+0.7);
}catch(e){}
}

// ─── Toast ───
function v17Toast(msg,color){
var t=document.createElement('div');
t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:'+(color||'#333')+';color:#fff;padding:10px 20px;border-radius:20px;font-size:12px;z-index:9999;pointer-events:none;opacity:0;transition:opacity .3s;max-width:320px;text-align:center;font-family:inherit';
t.textContent=msg;document.body.appendChild(t);
requestAnimationFrame(function(){t.style.opacity='1'});
setTimeout(function(){t.style.opacity='0';setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t)},300)},2500);
}

// ─── Panel Rendering ───
function v17Panel(id,title,sub){
var el=document.getElementById(id);
if(!el){el=document.createElement('div');el.id=id;el.className='v17-panel';document.body.appendChild(el);}
el.innerHTML='<h2>'+title+'</h2>'+(sub?'<p class="v17-sub">'+sub+'</p>':'');
return el;
}

function renderFogPanel(){
var p=v17Panel('v17-fog','🗺️ 전쟁안개 탐사','미지의 영토를 탐험하세요 &middot; 탐사율: '+Math.round(fogRevealed.length/(FOG_MAP_W*FOG_MAP_H)*100)+'%');
var wrap=document.createElement('div');wrap.className='fog-canvas-wrap';
var canvas=document.createElement('canvas');canvas.width=560;canvas.height=360;
initFogMap();drawFogMap(canvas);

canvas.onclick=function(e){
var rect=canvas.getBoundingClientRect();
var mx=Math.floor((e.clientX-rect.left)/rect.width*FOG_MAP_W);
var my=Math.floor((e.clientY-rect.top)/rect.height*FOG_MAP_H);
var n=revealFog(mx,my,2);
if(n>0){v17SFX('fog_reveal');v17Toast('🔍 '+n+'칸 탐사 완료!','#2196F3');}
drawFogMap(canvas);
var pct=fogRevealed.length/(FOG_MAP_W*FOG_MAP_H);
if(pct>=0.5)v17CheckAch('fog_explorer');
if(pct>=1.0)v17CheckAch('fog_complete');
};
wrap.appendChild(canvas);

var legend=document.createElement('div');legend.className='fog-legend';
FOG_TILES.forEach(function(t){
var span=document.createElement('span');span.textContent=t.char+' '+t.name+' ('+t.bonus+')';
span.style.borderColor=t.color;legend.appendChild(span);
});
wrap.appendChild(legend);

var btns=document.createElement('div');btns.className='fog-btns';
var scoutBtn=document.createElement('button');scoutBtn.className='tp-btn';scoutBtn.textContent='🔭 정찰 (반경 3)';
scoutBtn.onclick=function(){
var cx=Math.floor(Math.random()*FOG_MAP_W),cy=Math.floor(Math.random()*FOG_MAP_H);
var n=revealFog(cx,cy,3);v17SFX('fog_reveal');
v17Toast('정찰: ('+cx+','+cy+') 주변 '+n+'칸 발견!','#4CAF50');
drawFogMap(canvas);
};
btns.appendChild(scoutBtn);
var fullBtn=document.createElement('button');fullBtn.className='tp-btn';fullBtn.textContent='🌍 전체 탐사 (200G)';
fullBtn.onclick=function(){
var gState=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
if((gState.gold||0)<200){v17Toast('금화 부족!','#F44336');return;}
gState.gold-=200;localStorage.setItem('kRPG_state',JSON.stringify(gState));
for(var y=0;y<FOG_MAP_H;y++){for(var x=0;x<FOG_MAP_W;x++){var key=x+','+y;if(fogRevealed.indexOf(key)<0)fogRevealed.push(key);}}
saveFog();drawFogMap(canvas);v17SFX('fog_reveal');
v17Toast('🌍 전체 지도 완성!','#FFD700');
v17CheckAch('fog_complete');
};
btns.appendChild(fullBtn);
wrap.appendChild(btns);
p.appendChild(wrap);
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-fog\').classList.remove(\'on\')">닫기</button>';
}

function renderDynastyPanel(){
var p=v17Panel('v17-dynasty','👑 왕조 계보도','고조선에서 삼국까지의 혈통');
var wrap=document.createElement('div');wrap.className='dynasty-canvas-wrap';
var canvas=document.createElement('canvas');canvas.width=560;canvas.height=460;
drawDynastyCanvas(canvas);wrap.appendChild(canvas);

var info=document.createElement('div');info.className='dynasty-info';
info.innerHTML='<strong>환인(천제)</strong>의 아들 <strong>환웅</strong>이 인간 세상에 내려와 <strong>웅녀</strong>와 만나 <strong>단군왕검</strong>을 낳다.<br>단군의 후예 <strong>해부루</strong>가 부여를 세우고, <strong>해모수</strong>와 <strong>유화</strong>의 아들 <strong>주몽</strong>이 고구려를 건국.<br>주몽의 아들 <strong>비류</strong>와 <strong>온조</strong>는 남하하여 <strong>백제</strong>를 세우다.';
wrap.appendChild(info);
p.appendChild(wrap);
v17CheckAch('dynasty_scholar');
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-dynasty\').classList.remove(\'on\')">닫기</button>';
}

function renderSquadPanel(){
var p=v17Panel('v17-squad','🎖️ 편대 편성','전투에 투입할 편대를 편성하세요 &middot; 배치: '+squadSlots.filter(function(s){return s!==null}).length+'/6');
var editor=document.createElement('div');editor.className='squad-editor';

var selectedSlot=null;
var slots=document.createElement('div');slots.className='squad-slots';
squadSlots.forEach(function(unitId,i){
var slot=document.createElement('div');slot.className='squad-slot'+(unitId?' filled':'');
if(unitId){
var unit=UNIT_POOL.find(function(u){return u.id===unitId});
if(unit){
slot.innerHTML='<div class="ss-icon">'+unit.icon+'</div><div class="ss-name">'+unit.name+'</div><div class="ss-class">'+unit.cls+' | 공'+unit.atk+' 방'+unit.def+' 속'+unit.spd+'</div>';
slot.onclick=function(){removeUnit(i);renderSquadPanel();document.getElementById('v17-squad').classList.add('on');};
}
}else{
slot.innerHTML='<div class="ss-icon" style="opacity:.3">➕</div><div class="ss-name" style="color:#5a5a6a">빈 슬롯</div><div class="ss-class">클릭하여 배치</div>';
slot.onclick=function(){selectedSlot=i;showPool();};
}
slots.appendChild(slot);
});
editor.appendChild(slots);

var poolDiv=document.createElement('div');poolDiv.id='v17-pool';poolDiv.style.display='none';
function showPool(){
poolDiv.style.display='block';poolDiv.innerHTML='<p style="font-size:11px;color:#c4956a;margin:8px 0">슬롯 '+(selectedSlot+1)+'에 배치할 유닛 선택:</p>';
var pool=document.createElement('div');pool.className='squad-pool';
UNIT_POOL.forEach(function(unit){
var isAssigned=squadSlots.indexOf(unit.id)>=0;
var btn=document.createElement('button');btn.className='pool-unit'+(isAssigned?' assigned':'');
btn.textContent=unit.icon+' '+unit.name+' (공'+unit.atk+')';
btn.disabled=isAssigned;
btn.onclick=function(){if(!isAssigned&&selectedSlot!==null){assignUnit(selectedSlot,unit.id);renderSquadPanel();document.getElementById('v17-squad').classList.add('on');}};
pool.appendChild(btn);
});
poolDiv.appendChild(pool);
}
editor.appendChild(poolDiv);

var totalStats=document.createElement('div');
totalStats.style.cssText='text-align:center;margin:12px 0;font-size:11px;color:#8a7a6a';
var totalAtk=0,totalDef=0;
squadSlots.forEach(function(uid){if(uid){var u=UNIT_POOL.find(function(x){return x.id===uid});if(u){totalAtk+=u.atk;totalDef+=u.def;}}});
totalStats.textContent='편대 합산 — 총 공격: '+totalAtk+' | 총 방어: '+totalDef;
editor.appendChild(totalStats);

p.appendChild(editor);
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-squad\').classList.remove(\'on\')">닫기</button>';
}

function renderAlliancePanel(){
var p=v17Panel('v17-alliance','🤝 동맹 체결','외교를 통해 동맹을 구축하세요');
var wrap=document.createElement('div');wrap.className='alliance-wrap';

ALLIANCE_NATIONS.forEach(function(nation){
var state=allianceState[nation.id]||{attitude:0,treaty:null,tradeOpen:false};
var isHostile=state.attitude<0;
var card=document.createElement('div');card.className='alliance-card'+(isHostile?' hostile':'');

var statusText=state.treaty==='alliance'?'🤝 동맹':state.tradeOpen?'📦 교역 중':state.attitude>=60?'😊 우호적':state.attitude>=20?'😐 중립':state.attitude>=0?'😑 경계':'😠 적대';
var attColor=state.attitude>30?'#4CAF50':state.attitude>0?'#FF9800':'#F44336';

card.innerHTML='<div class="ac-icon">'+nation.icon+'</div><div class="ac-info"><div class="ac-name">'+nation.name+'</div><div class="ac-status" style="color:'+attColor+'">'+statusText+' (우호도: '+state.attitude+')</div><div class="ac-terms">'+nation.desc+'</div></div>';

var actions=document.createElement('div');actions.className='alliance-actions';
[{act:'gift',label:'🎁 선물',cls:''},{act:'trade',label:'📦 교역',cls:''},{act:'treaty',label:'🤝 동맹',cls:''},{act:'threaten',label:'⚔️ 위협',cls:' hostile-btn'}].forEach(function(a){
var btn=document.createElement('button');btn.className='aa-btn'+a.cls;btn.textContent=a.label;
btn.onclick=function(){diplomaticAction(nation.id,a.act);renderAlliancePanel();document.getElementById('v17-alliance').classList.add('on');};
actions.appendChild(btn);
});
card.appendChild(actions);
wrap.appendChild(card);
});
p.appendChild(wrap);
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-alliance\').classList.remove(\'on\')">닫기</button>';
}

function renderVictoryPanel(){
var p=v17Panel('v17-victory','🏆 승리 조건 추적','문명 승리를 향해 진행하세요');
var tracker=document.createElement('div');tracker.className='victory-tracker';
var cWrap=document.createElement('div');cWrap.className='vt-canvas-wrap';
var canvas=document.createElement('canvas');canvas.width=500;canvas.height=280;
drawVictoryCanvas(canvas);cWrap.appendChild(canvas);
tracker.appendChild(cWrap);

var progress=calcVictoryProgress();
var conds=document.createElement('div');conds.className='vt-conditions';
VICTORY_CONDITIONS.forEach(function(vc,i){
var card=document.createElement('div');card.className='vt-card'+(progress[i]>=100?' achieved':'');
card.innerHTML='<h4>'+vc.icon+' '+vc.name+'</h4><p>'+vc.desc+'</p><div class="vt-bar"><div class="vt-bar-fill vt-bar-'+vc.id.substring(0,3)+'" style="width:'+progress[i]+'%"></div></div><span class="vt-pct">'+Math.round(progress[i])+'%</span>';
conds.appendChild(card);
if(progress[i]>=100)v17CheckAch('victory_any');
});
tracker.appendChild(conds);
p.appendChild(tracker);
v17SFX('victory_progress');
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-victory\').classList.remove(\'on\')">닫기</button>';
}

function renderEventPanel(){
var p=v17Panel('v17-events','📜 역사 이벤트 카드','이벤트를 발동하여 역사를 바꾸세요 &middot; 발생: '+triggeredEvents.length+'/'+EVENT_CARDS.length);
var grid=document.createElement('div');grid.className='event-cards';
EVENT_CARDS.forEach(function(ev){
var isTriggered=triggeredEvents.indexOf(ev.id)>=0;
var card=document.createElement('div');card.className='event-card'+(isTriggered?' triggered':'');
card.innerHTML='<div class="ec-icon">'+ev.icon+'</div><div class="ec-name">'+ev.name+'</div><div class="ec-desc">'+ev.desc+'</div><div class="ec-effect">'+ev.effect+'</div>';
card.onclick=function(){triggerEvent(ev.id);renderEventPanel();document.getElementById('v17-events').classList.add('on');};
grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-events\').classList.remove(\'on\')">닫기</button>';
}

function renderMoralePanel(){
var p=v17Panel('v17-morale','🔥 전투 사기','군대의 사기를 관리하세요 &middot; 현재: '+moraleState.value+'/100');
var wrap=document.createElement('div');wrap.className='morale-wrap';
var canvas=document.createElement('canvas');canvas.width=300;canvas.height=300;
drawMoraleGauge(canvas);wrap.appendChild(canvas);

var factors=document.createElement('div');factors.className='morale-factors';
var factorNames={leadership:'통솔력',supply:'보급',victory:'승리',weather:'날씨',rest:'휴식',faith:'신앙',discipline:'규율'};
var factorIcons={leadership:'👑',supply:'📦',victory:'⚔️',weather:'🌤️',rest:'🛏️',faith:'⛩️',discipline:'📏'};
Object.keys(moraleState.factors).forEach(function(key){
var item=document.createElement('div');item.className='mf-item';
var valColor=moraleState.factors[key]>=15?'#4CAF50':moraleState.factors[key]>=8?'#FF9800':'#F44336';
item.innerHTML='<div class="mf-val" style="color:'+valColor+'">'+factorIcons[key]+' '+moraleState.factors[key]+'</div><div class="mf-label">'+factorNames[key]+'</div>';
factors.appendChild(item);
});
wrap.appendChild(factors);

var actions=document.createElement('div');actions.className='morale-actions';
[{label:'📢 격려 연설',factor:'leadership',delta:3},{label:'📦 보급 강화',factor:'supply',delta:3},
{label:'⛩️ 제천 의식',factor:'faith',delta:5},{label:'🛏️ 휴식 명령',factor:'rest',delta:4}
].forEach(function(a){
var btn=document.createElement('button');btn.className='morale-btn';btn.textContent=a.label;
btn.onclick=function(){adjustMorale(a.factor,a.delta);v17SFX('morale_boost');
renderMoralePanel();document.getElementById('v17-morale').classList.add('on');};
actions.appendChild(btn);
});
wrap.appendChild(actions);
p.appendChild(wrap);
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-morale\').classList.remove(\'on\')">닫기</button>';
}

function renderTerrainPanel(){
var p=v17Panel('v17-terrain','🗻 전장 지형 시뮬레이터','지형을 배치하고 전술을 세우세요');
var sim=document.createElement('div');sim.className='terrain-sim';

var palette=document.createElement('div');palette.className='terrain-palette';
TERRAIN_TYPES.forEach(function(t,i){
var btn=document.createElement('button');btn.className='tp-btn'+(i===currentTerrainBrush?' active':'');
btn.textContent=t.icon+' '+t.name;
btn.onclick=function(){currentTerrainBrush=i;palette.querySelectorAll('.tp-btn').forEach(function(b,j){b.className='tp-btn'+(j===i?' active':'')});};
palette.appendChild(btn);
});
sim.appendChild(palette);

var canvas=document.createElement('canvas');canvas.width=560;canvas.height=340;
drawTerrainSim(canvas);

canvas.onclick=function(e){
var rect=canvas.getBoundingClientRect();
var mx=Math.floor((e.clientX-rect.left)/rect.width*14);
var my=Math.floor((e.clientY-rect.top)/rect.height*10);
if(mx>=0&&mx<14&&my>=0&&my<10){
terrainGrid[my][mx]=currentTerrainBrush;
saveTerrain();v17SFX('terrain_place');
drawTerrainSim(canvas);
var placed=0;terrainGrid.forEach(function(row){row.forEach(function(c){if(c!==0)placed++})});
if(placed>=40)v17CheckAch('terrain_artist');
}
};
sim.appendChild(canvas);

var info=document.createElement('div');info.className='terrain-info';
var t=TERRAIN_TYPES[currentTerrainBrush];
info.textContent='선택: '+t.icon+' '+t.name+' — 방어 보너스: '+t.def+'% | 이동 비용: '+t.mov;
sim.appendChild(info);

var resetBtn=document.createElement('button');resetBtn.className='tp-btn';resetBtn.textContent='🔄 초기화';
resetBtn.onclick=function(){initTerrainGrid();saveTerrain();drawTerrainSim(canvas);v17Toast('지형 초기화 완료','#FF9800');};
sim.appendChild(resetBtn);

p.appendChild(sim);
p.innerHTML+='<button class="v17-close" onclick="document.getElementById(\'v17-terrain\').classList.remove(\'on\')">닫기</button>';
}

// ─── Keyboard Shortcuts (8: Shift+A/B/C/D/E/J/M/P) ───
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
var map={
'KeyA':['v17-fog',renderFogPanel],
'KeyB':['v17-dynasty',renderDynastyPanel],
'KeyC':['v17-squad',renderSquadPanel],
'KeyD':['v17-alliance',renderAlliancePanel],
'KeyE':['v17-victory',renderVictoryPanel],
'KeyJ':['v17-events',renderEventPanel],
'KeyM':['v17-morale',renderMoralePanel],
'KeyP':['v17-terrain',renderTerrainPanel]
};
if(map[e.code]){
e.preventDefault();var id=map[e.code][0],fn=map[e.code][1];
var el=document.getElementById(id);
if(el&&el.classList.contains('on')){el.classList.remove('on');}
else{fn();document.getElementById(id).classList.add('on');}
}
});

// ─── Quick Action Buttons (Bottom scroll nav bar) ───
function addV17NavBar(){
var existing=document.getElementById('v17-nav-bar');
if(existing)existing.remove();
var bar=document.createElement('div');
bar.id='v17-nav-bar';
bar.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:125;display:flex;gap:0;overflow-x:auto;background:rgba(10,6,8,.95);border-top:1px solid #3a3a4a;padding:4px 8px;-webkit-overflow-scrolling:touch;scrollbar-width:none';

var actions=[
{label:'🗺️',title:'전쟁안개',fn:function(){renderFogPanel();document.getElementById('v17-fog').classList.add('on')}},
{label:'👑',title:'계보도',fn:function(){renderDynastyPanel();document.getElementById('v17-dynasty').classList.add('on')}},
{label:'🎖️',title:'편대',fn:function(){renderSquadPanel();document.getElementById('v17-squad').classList.add('on')}},
{label:'🤝',title:'동맹',fn:function(){renderAlliancePanel();document.getElementById('v17-alliance').classList.add('on')}},
{label:'🏆',title:'승리조건',fn:function(){renderVictoryPanel();document.getElementById('v17-victory').classList.add('on')}},
{label:'📜',title:'이벤트',fn:function(){renderEventPanel();document.getElementById('v17-events').classList.add('on')}},
{label:'🔥',title:'사기',fn:function(){renderMoralePanel();document.getElementById('v17-morale').classList.add('on')}},
{label:'🗻',title:'지형',fn:function(){renderTerrainPanel();document.getElementById('v17-terrain').classList.add('on')}}
];

actions.forEach(function(a){
var btn=document.createElement('button');
btn.style.cssText='flex:0 0 auto;width:48px;height:40px;border:none;border-radius:6px;background:transparent;color:#e8dcc8;font-size:16px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;padding:2px 4px;transition:background .2s';
btn.innerHTML='<span style="font-size:16px">'+a.label+'</span><span style="font-size:7px;color:#8a7a6a">'+a.title+'</span>';
btn.onclick=a.fn;
btn.onmouseenter=function(){btn.style.background='rgba(196,149,106,.15)'};
btn.onmouseleave=function(){btn.style.background='transparent'};
bar.appendChild(btn);
});

document.body.appendChild(bar);
}

// ─── Init ───
function v17Init(){
loadFog();loadSquad();loadAlliance();loadEvents();loadMorale();loadTerrain();loadV17Ach();registerV17Quiz();
setTimeout(addV17NavBar,2000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',v17Init);}
else{v17Init();}

window._v17={
FOG_TILES:FOG_TILES,DYNASTY_NODES:DYNASTY_NODES,UNIT_POOL:UNIT_POOL,ALLIANCE_NATIONS:ALLIANCE_NATIONS,
VICTORY_CONDITIONS:VICTORY_CONDITIONS,EVENT_CARDS:EVENT_CARDS,TERRAIN_TYPES:TERRAIN_TYPES,
V17_QUIZ:V17_QUIZ,V17_ACH:V17_ACH,moraleState:moraleState,v17SFX:v17SFX
};
})();
