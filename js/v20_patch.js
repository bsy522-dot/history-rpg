// v20_patch.js — 한국사 영웅전 v20.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v20-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:138;overflow-y:auto;padding:16px}',
'.v20-panel.on{display:block}',
'.v20-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v20-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v20-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v20-close:hover{background:#8B2A1A}',
'.v20-toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);padding:8px 20px;border-radius:20px;font-size:11px;font-weight:700;z-index:999;pointer-events:none;animation:v20fade 2s ease forwards}',
'@keyframes v20fade{0%{opacity:0;transform:translate(-50%,-10px)}10%{opacity:1;transform:translate(-50%,0)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-10px)}}',

'.morale-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.morale-wrap canvas{border:2px solid #6a3a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.morale-units{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;max-width:560px;margin:8px auto}',
'.mu-card{background:linear-gradient(135deg,rgba(30,15,15,.95),rgba(20,10,10,.98));border:2px solid #5a2a2a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.mu-card:hover{border-color:#FF6644;transform:translateY(-2px)}',
'.mu-card .mu-icon{font-size:28px}',
'.mu-card .mu-name{font-size:11px;color:#FFD700;font-weight:700;margin-top:2px}',
'.mu-card .mu-morale{font-size:9px;margin-top:2px}',
'.mu-bar{height:5px;background:#1a1a1e;border-radius:3px;overflow:hidden;margin-top:4px}',
'.mu-bar-fill{height:100%;border-radius:3px;transition:width .5s}',

'.weather-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.weather-wrap canvas{border:2px solid #3a4a6a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.weather-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:460px;margin:8px auto}',
'.wc-card{background:rgba(15,20,30,.9);border:2px solid #3a4a6a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.wc-card:hover{border-color:#5FA0FF}',
'.wc-card.active{border-color:#00E5FF;background:rgba(0,30,60,.9);box-shadow:0 0 12px rgba(0,229,255,.2)}',
'.wc-card .wc-icon{font-size:28px}',
'.wc-card .wc-name{font-size:10px;color:#5FA0FF;font-weight:700;margin-top:2px}',
'.wc-card .wc-eff{font-size:8px;color:#8a8aaa;margin-top:2px}',

'.marriage-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.marriage-wrap canvas{border:2px solid #6a3a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.marriage-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;max-width:560px;margin:8px auto}',
'.mg-card{background:linear-gradient(135deg,rgba(40,15,30,.95),rgba(25,10,20,.98));border:2px solid #6a3a5a;border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:all .3s}',
'.mg-card:hover{border-color:#FF5FA2}',
'.mg-card.married{border-color:#FFD700;background:linear-gradient(135deg,rgba(50,40,10,.9),rgba(30,25,5,.95))}',
'.mg-card .mg-icon{font-size:28px}',
'.mg-card .mg-name{font-size:11px;color:#FF5FA2;font-weight:700;margin-top:2px}',
'.mg-card .mg-nation{font-size:8px;color:#8a6a7a;margin-top:1px}',
'.mg-card .mg-buff{font-size:8px;color:#FFD700;margin-top:3px}',

'.caravan-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.caravan-wrap canvas{border:2px solid #5a4a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.caravan-routes{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;max-width:560px;margin:8px auto}',
'.cr-card{background:linear-gradient(135deg,rgba(30,25,10,.95),rgba(20,15,5,.98));border:2px solid #5a4a2a;border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:all .3s}',
'.cr-card:hover{border-color:#FFD700;transform:translateY(-2px)}',
'.cr-card.active-route{border-color:#4CAF50;box-shadow:0 0 10px rgba(76,175,80,.2)}',
'.cr-card .cr-icon{font-size:22px}',
'.cr-card .cr-name{font-size:10px;color:#FFD700;font-weight:700;margin-top:2px}',
'.cr-card .cr-goods{font-size:8px;color:#c4956a;margin-top:2px}',
'.cr-card .cr-profit{font-size:9px;color:#4CAF50;font-weight:700;margin-top:3px}',

'.prestige-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.prestige-wrap canvas{border:2px solid #5a3a6a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.prestige-works{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;max-width:560px;margin:8px auto}',
'.pw-card{background:linear-gradient(135deg,rgba(30,15,40,.95),rgba(20,10,25,.98));border:2px solid #5a3a6a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.pw-card:hover{border-color:#aa88ff;transform:translateY(-2px)}',
'.pw-card.completed{border-color:#FFD700;background:linear-gradient(135deg,rgba(40,35,15,.9),rgba(30,25,10,.95))}',
'.pw-card .pw-icon{font-size:24px}',
'.pw-card .pw-name{font-size:10px;color:#aa88ff;font-weight:700;margin-top:2px}',
'.pw-card .pw-pts{font-size:8px;color:#FFD700;margin-top:2px}',

'.pop-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.pop-wrap canvas{border:2px solid #3a5a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.pop-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:400px;margin:8px auto}',
'.ps-item{background:rgba(15,25,15,.9);border:1px solid #3a5a3a;border-radius:8px;padding:8px;text-align:center}',
'.ps-item .ps-val{font-size:18px;color:#4CAF50;font-weight:700}',
'.ps-item .ps-label{font-size:8px;color:#6a8a6a;margin-top:2px}',
'.pop-actions{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.pa-btn{padding:6px 14px;border:1px solid #3a5a3a;border-radius:6px;background:#1a2a1a;color:#c4dcc4;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.pa-btn:hover{border-color:#4CAF50;background:#1a3a1a}',

'.evolve-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.evolve-wrap canvas{border:2px solid #4a4a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.evolve-units{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;max-width:560px;margin:8px auto}',
'.eu-card{background:linear-gradient(135deg,rgba(25,25,20,.95),rgba(15,15,10,.98));border:2px solid #4a4a3a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.eu-card:hover{border-color:#FFD700}',
'.eu-card.max-tier{border-color:#FF5FA2;box-shadow:0 0 12px rgba(255,95,162,.2)}',
'.eu-card .eu-icon{font-size:28px}',
'.eu-card .eu-name{font-size:10px;color:#FFD700;font-weight:700;margin-top:2px}',
'.eu-card .eu-tier{font-size:8px;color:#aa88ff;margin-top:2px}',

'.wonder-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.wonder-wrap canvas{border:2px solid #6a5a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.wonder-powers{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;max-width:560px;margin:8px auto}',
'.wp-card{background:linear-gradient(135deg,rgba(40,30,10,.95),rgba(25,20,5,.98));border:2px solid #6a5a2a;border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:all .3s}',
'.wp-card:hover{border-color:#FFD700;transform:translateY(-2px)}',
'.wp-card.activated{border-color:#FFD700;background:linear-gradient(135deg,rgba(50,40,15,.9),rgba(35,30,10,.95));box-shadow:0 0 15px rgba(255,215,0,.3)}',
'.wp-card .wp-icon{font-size:28px}',
'.wp-card .wp-name{font-size:10px;color:#FFD700;font-weight:700;margin-top:2px}',
'.wp-card .wp-power{font-size:8px;color:#c4956a;margin-top:2px}',
'.wp-card .wp-status{font-size:8px;margin-top:3px;font-weight:700}'
].join('\n');
document.head.appendChild(css);

function v20Toast(msg,color){
var t=document.createElement('div');t.className='v20-toast';
t.style.background=color||'#2a5a2a';t.style.color='#fff';t.textContent=msg;
document.body.appendChild(t);setTimeout(function(){t.remove()},2200);
}

// ═══════════════════════════════════════════
// 1. 군대 사기 엔진 (Morale Engine)
// ═══════════════════════════════════════════
var MORALE_UNITS=[
{id:'hwanoong',name:'환웅 친위대',icon:'⚔️',base:85,factors:{commander:20,supply:10,victory:15,terrain:10,casualties:-20,flanked:-25}},
{id:'dangun',name:'단군 근위대',icon:'🛡️',base:90,factors:{commander:25,supply:8,victory:12,terrain:8,casualties:-15,flanked:-20}},
{id:'archer',name:'예맥 궁병대',icon:'🏹',base:75,factors:{commander:15,supply:12,victory:10,terrain:15,casualties:-25,flanked:-30}},
{id:'cavalry',name:'부여 기마대',icon:'🐎',base:80,factors:{commander:18,supply:15,victory:18,terrain:5,casualties:-18,flanked:-15}},
{id:'shaman',name:'무당 신관대',icon:'🔮',base:70,factors:{commander:10,supply:5,victory:8,terrain:5,casualties:-10,flanked:-35}},
{id:'scout',name:'옥저 척후대',icon:'👁️',base:72,factors:{commander:12,supply:8,victory:10,terrain:20,casualties:-22,flanked:-12}},
{id:'shield',name:'삼한 방패대',icon:'🪖',base:88,factors:{commander:15,supply:10,victory:10,terrain:8,casualties:-12,flanked:-18}},
{id:'siege',name:'고조선 공성대',icon:'🏗️',base:65,factors:{commander:10,supply:18,victory:20,terrain:-5,casualties:-28,flanked:-35}},
{id:'navy',name:'변한 수군',icon:'⛵',base:78,factors:{commander:15,supply:12,victory:15,terrain:25,casualties:-20,flanked:-20}},
{id:'elite',name:'화랑 정예대',icon:'🌟',base:92,factors:{commander:22,supply:8,victory:20,terrain:10,casualties:-10,flanked:-12}}
];

var moraleState;
function loadMorale(){
try{moraleState=JSON.parse(localStorage.getItem('krpg_v20_morale'))||{};}catch(e){moraleState={};}
if(!moraleState.units){
moraleState={units:{},rallies:3,routs:0,inspections:0};
MORALE_UNITS.forEach(function(u){moraleState.units[u.id]={current:u.base,status:'normal',rallied:false};});
}
}
function saveMorale(){localStorage.setItem('krpg_v20_morale',JSON.stringify(moraleState));}

function getMoraleColor(val){
if(val>=80) return '#4CAF50';
if(val>=60) return '#FF9800';
if(val>=40) return '#FF6644';
return '#FF1744';
}
function getMoraleLabel(val){
if(val>=90) return '사기충천';
if(val>=75) return '안정';
if(val>=55) return '동요';
if(val>=35) return '패닉';
return '붕괴';
}

function renderMoraleCanvas(canvas){
var W=540,H=340;canvas.width=W;canvas.height=H;
var ctx=canvas.getContext('2d');
var grd=ctx.createLinearGradient(0,0,0,H);
grd.addColorStop(0,'#12080a');grd.addColorStop(1,'#0a0608');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);

ctx.fillStyle='#c4956a';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('군대 사기 현황판',W/2,28);
ctx.fillStyle='#6a5a4a';ctx.font='10px sans-serif';
ctx.fillText('지휘관 근접·보급·승전·지형·피해·측면공격이 사기에 영향',W/2,46);

var barW=44,barH=180,startX=20,startY=70;
MORALE_UNITS.forEach(function(u,i){
var x=startX+i*(barW+10);
var data=moraleState.units[u.id];
var val=Math.max(0,Math.min(100,data.current));
var fillH=barH*(val/100);

ctx.fillStyle='#1a1a2e';ctx.fillRect(x,startY,barW,barH);
var grd2=ctx.createLinearGradient(0,startY+barH-fillH,0,startY+barH);
grd2.addColorStop(0,getMoraleColor(val));grd2.addColorStop(1,getMoraleColor(val)+'88');
ctx.fillStyle=grd2;ctx.fillRect(x,startY+barH-fillH,barW,fillH);

ctx.strokeStyle='#3a3a4a';ctx.lineWidth=1;ctx.strokeRect(x,startY,barW,barH);

[80,60,40].forEach(function(th){
var ly=startY+barH-(barH*th/100);
ctx.beginPath();ctx.moveTo(x,ly);ctx.lineTo(x+barW,ly);
ctx.strokeStyle='#3a3a4a44';ctx.setLineDash([2,2]);ctx.stroke();ctx.setLineDash([]);
});

ctx.fillStyle='#e8dcc8';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
ctx.fillText(u.icon,x+barW/2,startY+barH+16);
ctx.fillStyle=getMoraleColor(val);ctx.font='bold 10px sans-serif';
ctx.fillText(val+'%',x+barW/2,startY+barH+30);
ctx.fillStyle='#8a7a6a';ctx.font='8px sans-serif';
ctx.fillText(getMoraleLabel(val),x+barW/2,startY+barH+42);
});

ctx.fillStyle='#5a4a3a';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText('독려 잔여: '+moraleState.rallies+'/3  |  궤주: '+moraleState.routs+'회  |  사열: '+moraleState.inspections+'회',15,H-12);
}

function renderMoralePanel(){
var existing=document.getElementById('v20-morale');
if(existing){existing.innerHTML='';} else {
existing=document.createElement('div');existing.id='v20-morale';existing.className='v20-panel';
document.body.appendChild(existing);
}
var html='<h2>⚔️ 군대 사기 엔진</h2>';
html+='<p class="v20-sub">지휘관 근접·보급·승전·지형·피해·측면공격이 사기에 영향</p>';
html+='<div class="morale-wrap"><canvas id="v20-morale-cv"></canvas>';
html+='<div class="morale-units">';
MORALE_UNITS.forEach(function(u){
var d=moraleState.units[u.id];
var val=Math.max(0,Math.min(100,d.current));
html+='<div class="mu-card" data-uid="'+u.id+'">';
html+='<div class="mu-icon">'+u.icon+'</div>';
html+='<div class="mu-name">'+u.name+'</div>';
html+='<div class="mu-morale" style="color:'+getMoraleColor(val)+'">'+getMoraleLabel(val)+' '+val+'%</div>';
html+='<div class="mu-bar"><div class="mu-bar-fill" style="width:'+val+'%;background:'+getMoraleColor(val)+'"></div></div>';
html+='</div>';
});
html+='</div>';
html+='<div style="display:flex;gap:8px;justify-content:center;margin:12px 0;flex-wrap:wrap">';
html+='<button class="v20-close" style="margin:0;padding:8px 16px;font-size:11px" onclick="window._v20.rally()">📯 전군 독려 ('+moraleState.rallies+'/3)</button>';
html+='<button class="v20-close" style="margin:0;padding:8px 16px;font-size:11px;background:#2a2a5a" onclick="window._v20.inspect()">🎖️ 사열식</button>';
html+='<button class="v20-close" style="margin:0;padding:8px 16px;font-size:11px;background:#5a2a2a" onclick="window._v20.simBattle()">⚔️ 전투 시뮬</button>';
html+='</div></div>';
html+='<button class="v20-close" onclick="document.getElementById(\'v20-morale\').classList.remove(\'on\')">닫기</button>';
existing.innerHTML=html;
var cv=document.getElementById('v20-morale-cv');
if(cv) renderMoraleCanvas(cv);

existing.querySelectorAll('.mu-card').forEach(function(card){
card.onclick=function(){
var uid=card.getAttribute('data-uid');
var d=moraleState.units[uid];
d.current=Math.min(100,d.current+5);
v20SFX('morale_up');saveMorale();renderMoralePanel();
v20Toast('사기 +5 상승!','#2a5a2a');v20CheckAch('morale_boost');
};
});
}

function rally(){
if(moraleState.rallies<=0){v20Toast('독려 횟수 소진!','#5a2a2a');return;}
moraleState.rallies--;
MORALE_UNITS.forEach(function(u){
moraleState.units[u.id].current=Math.min(100,moraleState.units[u.id].current+15);
});
v20SFX('morale_rally');saveMorale();renderMoralePanel();
v20Toast('📯 전군 사기 +15!','#2a5a2a');v20CheckAch('morale_rally');
}

function inspect(){
moraleState.inspections++;
MORALE_UNITS.forEach(function(u){
moraleState.units[u.id].current=Math.min(100,moraleState.units[u.id].current+8);
});
v20SFX('morale_inspect');saveMorale();renderMoralePanel();
v20Toast('🎖️ 사열식 완료! 전군 사기 +8','#2a4a5a');v20CheckAch('morale_inspect');
}

function simBattle(){
var casualties=Math.floor(Math.random()*3);
var victory=Math.random()>0.4;
MORALE_UNITS.forEach(function(u){
var d=moraleState.units[u.id];
if(victory) d.current=Math.min(100,d.current+u.factors.victory);
else d.current=Math.max(0,d.current+u.factors.casualties);
if(casualties>1) d.current=Math.max(0,d.current-10);
});
if(!victory) moraleState.routs++;
v20SFX(victory?'morale_victory':'morale_rout');
saveMorale();renderMoralePanel();
v20Toast(victory?'⚔️ 전투 승리! 사기 상승':'💀 패배... 사기 하락',victory?'#2a5a2a':'#5a2a2a');
if(victory) v20CheckAch('battle_win_v20');
}

// ═══════════════════════════════════════════
// 2. 날씨/계절 전투 시스템
// ═══════════════════════════════════════════
var WEATHERS=[
{id:'clear',name:'맑음',icon:'☀️',effects:'전 병종 기본 전투력',atk:0,def:0,mov:0,desc:'화창한 하늘 아래 전투에 최적인 날씨'},
{id:'rain',name:'비',icon:'🌧️',effects:'화공-50%, 궁병-30%',atk:-10,def:0,mov:-1,desc:'빗물이 활시위를 적시고 화공을 무력화'},
{id:'snow',name:'눈',icon:'❄️',effects:'기병-40%, 이동-2',atk:-5,def:5,mov:-2,desc:'눈보라 속 기병 돌격이 둔화되나 방어 유리'},
{id:'fog',name:'안개',icon:'🌫️',effects:'시야-3, 매복+40%',atk:0,def:-10,mov:0,desc:'짙은 안개가 시야를 가리고 매복에 최적'},
{id:'storm',name:'폭풍',icon:'⛈️',effects:'전병종-20%, 수군불가',atk:-15,def:-15,mov:-1,desc:'천둥번개가 전장을 뒤흔들어 모든 부대에 불리'},
{id:'monsoon',name:'장마',icon:'🌊',effects:'도하불가, 공성-60%',atk:-8,def:0,mov:-3,desc:'장마철 하천 범람으로 도하와 공성이 불가'},
{id:'drought',name:'가뭄',icon:'🔥',effects:'보급-50%, 화공+30%',atk:5,def:-5,mov:0,desc:'메마른 대지에 화공이 위력을 발휘하나 보급 곤란'},
{id:'wind',name:'강풍',icon:'💨',effects:'궁병+20%, 화공방향제한',atk:3,def:0,mov:0,desc:'강한 바람이 화살 사거리를 늘리지만 역풍 주의'}
];

var weatherState;
function loadWeather(){
try{weatherState=JSON.parse(localStorage.getItem('krpg_v20_weather'))||{};}catch(e){weatherState={};}
if(!weatherState.current) weatherState={current:'clear',history:[],forecasts:0,season:'spring'};
}
function saveWeather(){localStorage.setItem('krpg_v20_weather',JSON.stringify(weatherState));}

function renderWeatherCanvas(canvas){
var W=540,H=300;canvas.width=W;canvas.height=H;
var ctx=canvas.getContext('2d');
var grd=ctx.createLinearGradient(0,0,0,H);
grd.addColorStop(0,'#0a1020');grd.addColorStop(1,'#0a0814');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);

ctx.fillStyle='#5FA0FF';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('전장 날씨 시스템',W/2,28);

var cur=null;WEATHERS.forEach(function(w){if(w.id===weatherState.current)cur=w;});
if(!cur) cur=WEATHERS[0];

ctx.fillStyle='#1a1a2e';
ctx.beginPath();ctx.arc(W/2,130,70,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#e8dcc8';ctx.font='48px sans-serif';ctx.fillText(cur.icon,W/2,145);
ctx.fillStyle='#FFD700';ctx.font='bold 14px sans-serif';ctx.fillText(cur.name,W/2,185);
ctx.fillStyle='#8a8aaa';ctx.font='10px sans-serif';ctx.fillText(cur.effects,W/2,200);

var stats=[
{label:'공격력',val:cur.atk,color:cur.atk>=0?'#4CAF50':'#FF6644'},
{label:'방어력',val:cur.def,color:cur.def>=0?'#4CAF50':'#FF6644'},
{label:'이동력',val:cur.mov,color:cur.mov>=0?'#4CAF50':'#FF6644'}
];
stats.forEach(function(s,i){
var sx=120+i*150;
ctx.fillStyle=s.color;ctx.font='bold 20px sans-serif';ctx.textAlign='center';
ctx.fillText((s.val>=0?'+':'')+s.val,sx,240);
ctx.fillStyle='#6a6a8a';ctx.font='9px sans-serif';
ctx.fillText(s.label,sx,255);
});

ctx.fillStyle='#3a3a5a';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText('계절: '+(weatherState.season==='spring'?'봄':weatherState.season==='summer'?'여름':weatherState.season==='autumn'?'가을':'겨울')+'  |  예보: '+weatherState.forecasts+'회',15,H-12);
}

function renderWeatherPanel(){
var existing=document.getElementById('v20-weather');
if(existing){existing.innerHTML='';} else {
existing=document.createElement('div');existing.id='v20-weather';existing.className='v20-panel';
document.body.appendChild(existing);
}
var html='<h2>🌤️ 날씨/계절 전투 시스템</h2>';
html+='<p class="v20-sub">날씨가 전투 공격력·방어력·이동력에 영향</p>';
html+='<div class="weather-wrap"><canvas id="v20-weather-cv"></canvas>';
html+='<div class="weather-cards">';
WEATHERS.forEach(function(w){
html+='<div class="wc-card'+(weatherState.current===w.id?' active':'')+'" data-wid="'+w.id+'">';
html+='<div class="wc-icon">'+w.icon+'</div>';
html+='<div class="wc-name">'+w.name+'</div>';
html+='<div class="wc-eff">'+w.effects+'</div>';
html+='</div>';
});
html+='</div>';
html+='<div style="display:flex;gap:8px;justify-content:center;margin:12px 0">';
html+='<button class="v20-close" style="margin:0;padding:8px 16px;font-size:11px;background:#2a3a5a" onclick="window._v20.randomWeather()">🎲 날씨 변화</button>';
html+='<button class="v20-close" style="margin:0;padding:8px 16px;font-size:11px;background:#3a4a2a" onclick="window._v20.changeSeason()">🍂 계절 전환</button>';
html+='</div></div>';
html+='<button class="v20-close" onclick="document.getElementById(\'v20-weather\').classList.remove(\'on\')">닫기</button>';
existing.innerHTML=html;
var cv=document.getElementById('v20-weather-cv');
if(cv) renderWeatherCanvas(cv);

existing.querySelectorAll('.wc-card').forEach(function(card){
card.onclick=function(){
weatherState.current=card.getAttribute('data-wid');
weatherState.forecasts++;
v20SFX('weather_change');saveWeather();renderWeatherPanel();
v20Toast('날씨 변경: '+card.querySelector('.wc-name').textContent,'#2a3a5a');
v20CheckAch('weather_set');
};
});
}

function randomWeather(){
var idx=Math.floor(Math.random()*WEATHERS.length);
weatherState.current=WEATHERS[idx].id;
weatherState.history.push(WEATHERS[idx].id);
v20SFX('weather_change');saveWeather();renderWeatherPanel();
v20Toast('🎲 날씨 변동: '+WEATHERS[idx].name,'#2a3a5a');v20CheckAch('weather_random');
}

function changeSeason(){
var seasons=['spring','summer','autumn','winter'];
var ci=seasons.indexOf(weatherState.season);
weatherState.season=seasons[(ci+1)%4];
var snames={spring:'봄',summer:'여름',autumn:'가을',winter:'겨울'};
v20SFX('weather_season');saveWeather();renderWeatherPanel();
v20Toast('🍂 계절 전환: '+snames[weatherState.season],'#4a3a2a');v20CheckAch('season_change');
}

// ═══════════════════════════════════════════
// 3. 외교 혼인/인질 시스템
// ═══════════════════════════════════════════
var MARRIAGE_CANDIDATES=[
{id:'buyeo_princess',name:'부여 공주',nation:'부여',icon:'👸',buff:'기병 공격력 +15%',trait:'용맹',trust:0},
{id:'han_noble',name:'한(漢) 귀족녀',nation:'한',icon:'🏛️',buff:'교역 수입 +20%',trait:'지혜',trust:0},
{id:'yemaek_chief',name:'예맥 족장녀',nation:'예맥',icon:'🏔️',buff:'궁병 사거리 +1',trait:'인내',trust:0},
{id:'okjeo_maiden',name:'옥저 무녀',nation:'옥저',icon:'🌊',buff:'치유력 +25%',trait:'자비',trust:0},
{id:'samhan_queen',name:'삼한 여왕',nation:'삼한',icon:'👑',buff:'외교 신뢰 +30%',trait:'카리스마',trust:0},
{id:'dongye_sage',name:'동예 현녀',nation:'동예',icon:'📜',buff:'연구 속도 +20%',trait:'총명',trust:0}
];
var HOSTAGES=[
{id:'prince1',name:'왕자 해부루',nation:'고조선',icon:'🤴',trustGain:25,risk:'탈출 위험 15%'},
{id:'prince2',name:'부여 세자',nation:'부여',icon:'👦',trustGain:30,risk:'보복 위험 20%'},
{id:'general1',name:'한 장군',nation:'한',icon:'🎖️',trustGain:20,risk:'전쟁 위험 25%'},
{id:'scholar1',name:'예맥 학자',nation:'예맥',icon:'📖',trustGain:15,risk:'외교 마찰 10%'}
];

var marriageState;
function loadMarriage(){
try{marriageState=JSON.parse(localStorage.getItem('krpg_v20_marriage'))||{};}catch(e){marriageState={};}
if(!marriageState.marriages) marriageState={marriages:{},hostages:{},proposals:0,exchanges:0};
}
function saveMarriage(){localStorage.setItem('krpg_v20_marriage',JSON.stringify(marriageState));}

function renderMarriageCanvas(canvas){
var W=540,H=320;canvas.width=W;canvas.height=H;
var ctx=canvas.getContext('2d');
var grd=ctx.createLinearGradient(0,0,0,H);
grd.addColorStop(0,'#1a0a14');grd.addColorStop(1,'#0a0608');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);

ctx.fillStyle='#FF5FA2';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('외교 혼인 & 인질 교환',W/2,28);

var marriedCount=Object.keys(marriageState.marriages).filter(function(k){return marriageState.marriages[k];}).length;
var hostageCount=Object.keys(marriageState.hostages).filter(function(k){return marriageState.hostages[k];}).length;

ctx.fillStyle='#1a1428';
ctx.beginPath();ctx.arc(170,140,60,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#FF5FA2';ctx.font='bold 36px sans-serif';
ctx.fillText(marriedCount+'/'+MARRIAGE_CANDIDATES.length,170,148);
ctx.fillStyle='#c4956a';ctx.font='10px sans-serif';
ctx.fillText('혼인 동맹',170,170);

ctx.fillStyle='#1a1428';
ctx.beginPath();ctx.arc(370,140,60,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#FF9800';ctx.font='bold 36px sans-serif';
ctx.fillText(hostageCount+'/'+HOSTAGES.length,370,148);
ctx.fillStyle='#c4956a';ctx.font='10px sans-serif';
ctx.fillText('인질 교환',370,170);

var cx=W/2,cy=240,r=50;
ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);
ctx.strokeStyle='#3a3a4a';ctx.lineWidth=8;ctx.stroke();
var trustTotal=0,maxTrust=0;
MARRIAGE_CANDIDATES.forEach(function(c){
var t=marriageState.marriages[c.id]?100:(c.trust||0);
trustTotal+=t;maxTrust+=100;
});
var ratio=maxTrust>0?trustTotal/maxTrust:0;
ctx.beginPath();ctx.arc(cx,cy,r,-Math.PI/2,-Math.PI/2+Math.PI*2*ratio);
ctx.strokeStyle='#FF5FA2';ctx.lineWidth=8;ctx.stroke();
ctx.fillStyle='#FFD700';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
ctx.fillText(Math.round(ratio*100)+'%',cx,cy+5);
ctx.fillStyle='#6a5a7a';ctx.font='9px sans-serif';
ctx.fillText('외교 신뢰도',cx,cy+20);

ctx.fillStyle='#5a3a5a';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText('청혼: '+marriageState.proposals+'회  |  인질교환: '+marriageState.exchanges+'회',15,H-12);
}

function renderMarriagePanel(){
var existing=document.getElementById('v20-marriage');
if(existing){existing.innerHTML='';} else {
existing=document.createElement('div');existing.id='v20-marriage';existing.className='v20-panel';
document.body.appendChild(existing);
}
var html='<h2>💍 외교 혼인 & 인질 교환</h2>';
html+='<p class="v20-sub">혼인 동맹으로 영구 버프, 인질 교환으로 신뢰 확보</p>';
html+='<div class="marriage-wrap"><canvas id="v20-marriage-cv"></canvas>';
html+='<h3 style="color:#FF5FA2;font-size:13px;margin:8px 0">혼인 후보</h3>';
html+='<div class="marriage-grid">';
MARRIAGE_CANDIDATES.forEach(function(c){
var married=marriageState.marriages[c.id];
html+='<div class="mg-card'+(married?' married':'')+'" data-cid="'+c.id+'">';
html+='<div class="mg-icon">'+c.icon+'</div>';
html+='<div class="mg-name">'+c.name+'</div>';
html+='<div class="mg-nation">'+c.nation+'</div>';
html+='<div class="mg-buff">'+(married?'✅ '+c.buff:'💍 청혼하기')+'</div>';
html+='</div>';
});
html+='</div>';
html+='<h3 style="color:#FF9800;font-size:13px;margin:12px 0">인질 교환</h3>';
html+='<div class="marriage-grid">';
HOSTAGES.forEach(function(h){
var exchanged=marriageState.hostages[h.id];
html+='<div class="mg-card'+(exchanged?' married':'')+'" data-hid="'+h.id+'" style="border-color:#5a4a2a">';
html+='<div class="mg-icon">'+h.icon+'</div>';
html+='<div class="mg-name">'+h.name+'</div>';
html+='<div class="mg-nation">'+h.nation+' | 신뢰+'+h.trustGain+'</div>';
html+='<div class="mg-buff" style="color:#FF9800">'+(exchanged?'✅ 교환완료':'🔄 교환하기')+'</div>';
html+='</div>';
});
html+='</div></div>';
html+='<button class="v20-close" onclick="document.getElementById(\'v20-marriage\').classList.remove(\'on\')">닫기</button>';
existing.innerHTML=html;
var cv=document.getElementById('v20-marriage-cv');
if(cv) renderMarriageCanvas(cv);

existing.querySelectorAll('.mg-card[data-cid]').forEach(function(card){
card.onclick=function(){
var cid=card.getAttribute('data-cid');
if(marriageState.marriages[cid]){v20Toast('이미 혼인 동맹 체결!','#5a3a5a');return;}
marriageState.marriages[cid]=true;marriageState.proposals++;
v20SFX('marriage_wed');saveMarriage();renderMarriagePanel();
var c=null;MARRIAGE_CANDIDATES.forEach(function(mc){if(mc.id===cid)c=mc;});
v20Toast('💍 '+c.name+' 혼인 성사! '+c.buff,'#5a2a4a');v20CheckAch('marriage_first');
var mc=Object.keys(marriageState.marriages).filter(function(k){return marriageState.marriages[k];}).length;
if(mc>=3) v20CheckAch('marriage_triple');
if(mc>=MARRIAGE_CANDIDATES.length) v20CheckAch('marriage_all');
};
});

existing.querySelectorAll('.mg-card[data-hid]').forEach(function(card){
card.onclick=function(){
var hid=card.getAttribute('data-hid');
if(marriageState.hostages[hid]){v20Toast('이미 교환 완료!','#5a4a2a');return;}
marriageState.hostages[hid]=true;marriageState.exchanges++;
v20SFX('marriage_hostage');saveMarriage();renderMarriagePanel();
v20Toast('🔄 인질 교환 완료!','#4a3a2a');v20CheckAch('hostage_exchange');
};
});
}

// ═══════════════════════════════════════════
// 4. 교역 대상단 시스템 (Trade Caravans)
// ═══════════════════════════════════════════
var TRADE_ROUTES=[
{id:'buyeo_silk',name:'부여 비단길',icon:'🐪',from:'고조선',to:'부여',goods:'비단·모피',profit:120,distance:5,risk:'야만족 습격 15%'},
{id:'han_metal',name:'한나라 철기로',icon:'⚒️',from:'고조선',to:'한',goods:'철기·청동기',profit:200,distance:8,risk:'국경 검문 30%'},
{id:'yemaek_herb',name:'예맥 약초로',icon:'🌿',from:'고조선',to:'예맥',goods:'약초·인삼',profit:90,distance:3,risk:'산적 10%'},
{id:'okjeo_fish',name:'옥저 해산물로',icon:'🐟',from:'고조선',to:'옥저',goods:'해산물·소금',profit:150,distance:6,risk:'해적 20%'},
{id:'samhan_jade',name:'삼한 옥석로',icon:'💎',from:'고조선',to:'삼한',goods:'옥·보석',profit:250,distance:9,risk:'도적단 25%'},
{id:'dongye_grain',name:'동예 곡물로',icon:'🌾',from:'고조선',to:'동예',goods:'곡물·가축',profit:80,distance:4,risk:'홍수 10%'},
{id:'japan_pearl',name:'왜 진주로',icon:'🦪',from:'삼한',to:'왜',goods:'진주·조개',profit:180,distance:10,risk:'폭풍 30%'},
{id:'xiongnu_horse',name:'흉노 말교역로',icon:'🐴',from:'부여',to:'흉노',goods:'군마·가죽',profit:220,distance:7,risk:'유목민 습격 20%'}
];

var tradeState;
function loadTrade(){
try{tradeState=JSON.parse(localStorage.getItem('krpg_v20_trade'))||{};}catch(e){tradeState={};}
if(!tradeState.routes) tradeState={routes:{},totalProfit:0,caravans:0,raids:0};
}
function saveTrade(){localStorage.setItem('krpg_v20_trade',JSON.stringify(tradeState));}

function renderTradeCanvas(canvas){
var W=540,H=340;canvas.width=W;canvas.height=H;
var ctx=canvas.getContext('2d');
var grd=ctx.createLinearGradient(0,0,0,H);
grd.addColorStop(0,'#14100a');grd.addColorStop(1,'#0a0808');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);

ctx.fillStyle='#FFD700';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('교역 대상단 네트워크',W/2,28);

var nodes=[
{name:'고조선',x:270,y:120,color:'#FFD700'},
{name:'부여',x:400,y:80,color:'#FF9800'},
{name:'한',x:140,y:80,color:'#F44336'},
{name:'예맥',x:420,y:180,color:'#4CAF50'},
{name:'옥저',x:400,y:260,color:'#2196F3'},
{name:'삼한',x:180,y:260,color:'#9C27B0'},
{name:'동예',x:350,y:220,color:'#00BCD4'},
{name:'흉노',x:100,y:160,color:'#795548'}
];

TRADE_ROUTES.forEach(function(route){
var fromN=null,toN=null;
nodes.forEach(function(n){if(n.name===route.from)fromN=n;if(n.name===route.to)toN=n;});
if(fromN&&toN){
var active=tradeState.routes[route.id];
ctx.beginPath();ctx.moveTo(fromN.x,fromN.y);ctx.lineTo(toN.x,toN.y);
ctx.strokeStyle=active?'#FFD70066':'#3a3a3a44';ctx.lineWidth=active?3:1;
ctx.setLineDash(active?[]:[4,4]);ctx.stroke();ctx.setLineDash([]);
if(active){
var mx=(fromN.x+toN.x)/2,my=(fromN.y+toN.y)/2;
ctx.fillStyle='#FFD700';ctx.font='12px sans-serif';ctx.textAlign='center';
ctx.fillText('🐪',mx,my);
}
}
});

nodes.forEach(function(n){
ctx.beginPath();ctx.arc(n.x,n.y,18,0,Math.PI*2);
ctx.fillStyle=n.color+'33';ctx.fill();
ctx.strokeStyle=n.color;ctx.lineWidth=2;ctx.stroke();
ctx.fillStyle='#e8dcc8';ctx.font='bold 9px sans-serif';ctx.textAlign='center';
ctx.fillText(n.name,n.x,n.y+4);
});

ctx.fillStyle='#5a4a2a';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText('총 수익: '+tradeState.totalProfit+'금  |  파견: '+tradeState.caravans+'회  |  습격: '+tradeState.raids+'회',15,H-12);
}

function renderTradePanel(){
var existing=document.getElementById('v20-trade');
if(existing){existing.innerHTML='';} else {
existing=document.createElement('div');existing.id='v20-trade';existing.className='v20-panel';
document.body.appendChild(existing);
}
var html='<h2>🐪 교역 대상단 네트워크</h2>';
html+='<p class="v20-sub">교역로를 개설하고 대상단을 파견하여 금을 획득</p>';
html+='<div class="caravan-wrap"><canvas id="v20-trade-cv"></canvas>';
html+='<div class="caravan-routes">';
TRADE_ROUTES.forEach(function(r){
var active=tradeState.routes[r.id];
html+='<div class="cr-card'+(active?' active-route':'')+'" data-rid="'+r.id+'">';
html+='<div class="cr-icon">'+r.icon+'</div>';
html+='<div class="cr-name">'+r.name+'</div>';
html+='<div class="cr-goods">'+r.goods+'</div>';
html+='<div class="cr-profit">'+(active?'✅ 활성 +'+r.profit+'금':'🐪 파견: +'+r.profit+'금')+'</div>';
html+='</div>';
});
html+='</div>';
html+='<button class="v20-close" style="margin:12px auto;padding:8px 16px;font-size:11px;background:#5a4a1a" onclick="window._v20.collectTrade()">💰 수익 징수</button>';
html+='</div>';
html+='<button class="v20-close" onclick="document.getElementById(\'v20-trade\').classList.remove(\'on\')">닫기</button>';
existing.innerHTML=html;
var cv=document.getElementById('v20-trade-cv');
if(cv) renderTradeCanvas(cv);

existing.querySelectorAll('.cr-card').forEach(function(card){
card.onclick=function(){
var rid=card.getAttribute('data-rid');
if(tradeState.routes[rid]){v20Toast('이미 개설된 교역로!','#5a4a2a');return;}
tradeState.routes[rid]=true;tradeState.caravans++;
var raided=Math.random()<0.2;
if(raided){tradeState.raids++;v20SFX('trade_raid');v20Toast('⚠️ 교역로 습격 발생!','#5a2a2a');}
else{v20SFX('trade_open');v20Toast('🐪 교역로 개설 성공!','#4a3a1a');}
saveTrade();renderTradePanel();v20CheckAch('trade_first');
var ac=Object.keys(tradeState.routes).filter(function(k){return tradeState.routes[k];}).length;
if(ac>=4) v20CheckAch('trade_network');
if(ac>=TRADE_ROUTES.length) v20CheckAch('trade_master');
};
});
}

function collectTrade(){
var profit=0;
TRADE_ROUTES.forEach(function(r){if(tradeState.routes[r.id]) profit+=r.profit;});
tradeState.totalProfit+=profit;
v20SFX('trade_collect');saveTrade();renderTradePanel();
v20Toast('💰 수익 징수: +'+profit+'금 (총 '+tradeState.totalProfit+'금)','#4a3a1a');
if(tradeState.totalProfit>=1000) v20CheckAch('trade_rich');
}

// ═══════════════════════════════════════════
// 5. 문화 위업 트랙 (Cultural Prestige)
// ═══════════════════════════════════════════
var GREAT_WORKS=[
{id:'dangun_myth',name:'단군신화 기록',icon:'📜',pts:30,category:'문학',desc:'건국신화를 죽간에 기록하여 후대에 전함'},
{id:'bronze_mirror',name:'다뉴세문경',icon:'🪞',pts:40,category:'공예',desc:'정밀한 기하학 문양의 청동 거울 제작'},
{id:'dolmen',name:'고인돌 축조',icon:'🪨',pts:50,category:'건축',desc:'거석문화의 정수, 거대 고인돌 축조'},
{id:'ritual_dance',name:'영고 제천무',icon:'💃',pts:25,category:'무용',desc:'부여의 영고 축제에서 춤과 노래'},
{id:'bronze_bell',name:'세형동검 문화',icon:'🔔',pts:45,category:'야금',desc:'한반도 특유의 세형 동검 주조 기술'},
{id:'jade_crown',name:'비파형 옥관',icon:'👑',pts:35,category:'보석공예',desc:'비취옥으로 만든 왕관 제작'},
{id:'star_map',name:'천문도 제작',icon:'⭐',pts:55,category:'천문학',desc:'별자리를 관측하고 천문도를 제작'},
{id:'pottery',name:'빗살무늬토기',icon:'🏺',pts:30,category:'도예',desc:'신석기 시대의 상징적 토기 문양 발전'},
{id:'wall_paint',name:'고분벽화',icon:'🎨',pts:40,category:'회화',desc:'무덤 내부에 생활상과 사신도 벽화'},
{id:'music',name:'가야금 원형',icon:'🎵',pts:35,category:'음악',desc:'현악기의 원형을 개발하여 궁중 음악 발전'}
];

var prestigeState;
function loadPrestige(){
try{prestigeState=JSON.parse(localStorage.getItem('krpg_v20_prestige'))||{};}catch(e){prestigeState={};}
if(!prestigeState.works) prestigeState={works:{},totalPts:0,level:1,patronage:0};
}
function savePrestige(){localStorage.setItem('krpg_v20_prestige',JSON.stringify(prestigeState));}

function getPrestigeLevel(pts){
if(pts>=400) return {lv:5,name:'문명의 빛',color:'#FFD700'};
if(pts>=280) return {lv:4,name:'문화 대국',color:'#FF5FA2'};
if(pts>=180) return {lv:3,name:'문화 강국',color:'#aa88ff'};
if(pts>=80) return {lv:2,name:'문화 발흥',color:'#4CAF50'};
return {lv:1,name:'원시 부족',color:'#8a8a8a'};
}

function renderPrestigeCanvas(canvas){
var W=540,H=320;canvas.width=W;canvas.height=H;
var ctx=canvas.getContext('2d');
var grd=ctx.createLinearGradient(0,0,0,H);
grd.addColorStop(0,'#120a18');grd.addColorStop(1,'#0a0610');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);

ctx.fillStyle='#aa88ff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('문화 위업 트랙',W/2,28);

var info=getPrestigeLevel(prestigeState.totalPts);
var nextThresholds=[0,80,180,280,400,999];
var nextPts=nextThresholds[info.lv]||400;
var prevPts=nextThresholds[info.lv-1]||0;
var progress=(prestigeState.totalPts-prevPts)/Math.max(1,nextPts-prevPts);

ctx.fillStyle='#1a1428';
var barX=40,barY=55,barW=460,barH=24;
ctx.fillRect(barX,barY,barW,barH);
var grd2=ctx.createLinearGradient(barX,0,barX+barW*progress,0);
grd2.addColorStop(0,'#5a3a8a');grd2.addColorStop(1,info.color);
ctx.fillStyle=grd2;ctx.fillRect(barX,barY,barW*Math.min(1,progress),barH);
ctx.strokeStyle='#4a3a6a';ctx.lineWidth=1;ctx.strokeRect(barX,barY,barW,barH);

ctx.fillStyle='#e8dcc8';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
ctx.fillText(info.name+' Lv.'+info.lv+' — '+prestigeState.totalPts+'pt',W/2,barY+16);

var completed=Object.keys(prestigeState.works).filter(function(k){return prestigeState.works[k];}).length;

var categories={};
GREAT_WORKS.forEach(function(w){
if(!categories[w.category]) categories[w.category]={total:0,done:0};
categories[w.category].total++;
if(prestigeState.works[w.id]) categories[w.category].done++;
});

var catArr=Object.keys(categories);
var catBarW=Math.min(60,Math.floor((W-60)/catArr.length)-8);
catArr.forEach(function(cat,i){
var cx=40+i*(catBarW+8);
var cd=categories[cat];
var ratio=cd.total>0?cd.done/cd.total:0;

ctx.fillStyle='#1a1428';ctx.fillRect(cx,100,catBarW,140);
var fh=140*ratio;
ctx.fillStyle=ratio>=1?'#FFD700':'#5a3a8a';
ctx.fillRect(cx,100+140-fh,catBarW,fh);
ctx.strokeStyle='#3a2a4a';ctx.lineWidth=1;ctx.strokeRect(cx,100,catBarW,140);

ctx.fillStyle='#8a7a9a';ctx.font='8px sans-serif';ctx.textAlign='center';
ctx.fillText(cat,cx+catBarW/2,254);
ctx.fillStyle='#c4956a';ctx.font='bold 9px sans-serif';
ctx.fillText(cd.done+'/'+cd.total,cx+catBarW/2,268);
});

ctx.fillStyle='#4a3a5a';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText('위업 달성: '+completed+'/'+GREAT_WORKS.length+'  |  후원: '+prestigeState.patronage+'회  |  총 문화점수: '+prestigeState.totalPts+'pt',15,H-12);
}

function renderPrestigePanel(){
var existing=document.getElementById('v20-prestige');
if(existing){existing.innerHTML='';} else {
existing=document.createElement('div');existing.id='v20-prestige';existing.className='v20-panel';
document.body.appendChild(existing);
}
var html='<h2>🎭 문화 위업 트랙</h2>';
html+='<p class="v20-sub">위대한 문화 작품을 완성하여 문화 승리를 향해 전진</p>';
html+='<div class="prestige-wrap"><canvas id="v20-prestige-cv"></canvas>';
html+='<div class="prestige-works">';
GREAT_WORKS.forEach(function(w){
var done=prestigeState.works[w.id];
html+='<div class="pw-card'+(done?' completed':'')+'" data-wid="'+w.id+'">';
html+='<div class="pw-icon">'+w.icon+'</div>';
html+='<div class="pw-name">'+w.name+'</div>';
html+='<div class="pw-pts">'+(done?'✅ +'+w.pts+'pt':'🎨 제작: +'+w.pts+'pt')+'</div>';
html+='</div>';
});
html+='</div>';
html+='<button class="v20-close" style="margin:12px auto;padding:8px 16px;font-size:11px;background:#4a2a6a" onclick="window._v20.patronize()">🏛️ 문화 후원 (+15pt)</button>';
html+='</div>';
html+='<button class="v20-close" onclick="document.getElementById(\'v20-prestige\').classList.remove(\'on\')">닫기</button>';
existing.innerHTML=html;
var cv=document.getElementById('v20-prestige-cv');
if(cv) renderPrestigeCanvas(cv);

existing.querySelectorAll('.pw-card').forEach(function(card){
card.onclick=function(){
var wid=card.getAttribute('data-wid');
if(prestigeState.works[wid]){v20Toast('이미 완성된 위업!','#4a2a6a');return;}
prestigeState.works[wid]=true;
var w=null;GREAT_WORKS.forEach(function(gw){if(gw.id===wid)w=gw;});
prestigeState.totalPts+=w.pts;
v20SFX('prestige_create');savePrestige();renderPrestigePanel();
v20Toast('🎨 '+w.name+' 완성! +'+w.pts+'pt','#4a2a6a');v20CheckAch('prestige_first');
var dc=Object.keys(prestigeState.works).filter(function(k){return prestigeState.works[k];}).length;
if(dc>=5) v20CheckAch('prestige_5');
if(dc>=GREAT_WORKS.length) v20CheckAch('prestige_master');
};
});
}

function patronize(){
prestigeState.patronage++;prestigeState.totalPts+=15;
v20SFX('prestige_patron');savePrestige();renderPrestigePanel();
v20Toast('🏛️ 문화 후원! +15pt','#4a2a6a');v20CheckAch('prestige_patron');
}

// ═══════════════════════════════════════════
// 6. 인구/경제 시뮬레이션
// ═══════════════════════════════════════════
var popState;
function loadPop(){
try{popState=JSON.parse(localStorage.getItem('krpg_v20_pop'))||{};}catch(e){popState={};}
if(!popState.population) popState={
population:500,farmers:200,miners:80,soldiers:100,scholars:30,merchants:50,artisans:40,
food:1000,iron:300,gold:500,culture:100,
taxRate:10,happiness:70,growthRate:2,turns:0
};
}
function savePop(){localStorage.setItem('krpg_v20_pop',JSON.stringify(popState));}

function renderPopCanvas(canvas){
var W=540,H=360;canvas.width=W;canvas.height=H;
var ctx=canvas.getContext('2d');
var grd=ctx.createLinearGradient(0,0,0,H);
grd.addColorStop(0,'#0a140a');grd.addColorStop(1,'#0a0a08');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);

ctx.fillStyle='#4CAF50';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('인구 & 경제 시뮬레이션',W/2,28);

ctx.fillStyle='#1a2a1a';
ctx.beginPath();ctx.arc(130,110,50,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#4CAF50';ctx.font='bold 24px sans-serif';ctx.textAlign='center';
ctx.fillText(popState.population,130,115);
ctx.fillStyle='#6a8a6a';ctx.font='9px sans-serif';
ctx.fillText('총 인구',130,135);

var jobs=[
{name:'농민',count:popState.farmers,color:'#8BC34A',icon:'🌾'},
{name:'광부',count:popState.miners,color:'#FF9800',icon:'⛏️'},
{name:'병사',count:popState.soldiers,color:'#F44336',icon:'⚔️'},
{name:'학자',count:popState.scholars,color:'#2196F3',icon:'📖'},
{name:'상인',count:popState.merchants,color:'#FFD700',icon:'💰'},
{name:'장인',count:popState.artisans,color:'#9C27B0',icon:'🔨'}
];

var total=0;jobs.forEach(function(j){total+=j.count;});
var startAngle=-Math.PI/2;
var cx=400,cy=110,r=50;
jobs.forEach(function(j){
var angle=Math.PI*2*(j.count/Math.max(1,total));
ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,startAngle,startAngle+angle);ctx.closePath();
ctx.fillStyle=j.color+'cc';ctx.fill();
startAngle+=angle;
});
ctx.beginPath();ctx.arc(cx,cy,25,0,Math.PI*2);
ctx.fillStyle='#0a140a';ctx.fill();

jobs.forEach(function(j,i){
var lx=230+Math.floor(i/3)*160;
var ly=85+(i%3)*20;
ctx.fillStyle=j.color;ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText(j.icon+' '+j.name+': '+j.count,lx,ly);
});

var resources=[
{name:'식량',val:popState.food,icon:'🌾',color:'#8BC34A'},
{name:'철',val:popState.iron,icon:'⚒️',color:'#FF9800'},
{name:'금',val:popState.gold,icon:'💰',color:'#FFD700'},
{name:'문화',val:popState.culture,icon:'🎭',color:'#aa88ff'}
];
resources.forEach(function(res,i){
var rx=30+i*130,ry=185;
ctx.fillStyle='#1a2a1a';ctx.fillRect(rx,ry,110,50);ctx.strokeStyle='#3a5a3a';ctx.lineWidth=1;ctx.strokeRect(rx,ry,110,50);
ctx.fillStyle=res.color;ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText(res.val,rx+55,ry+22);
ctx.fillStyle='#6a8a6a';ctx.font='9px sans-serif';
ctx.fillText(res.icon+' '+res.name,rx+55,ry+40);
});

ctx.fillStyle='#6a8a6a';ctx.font='9px sans-serif';ctx.textAlign='left';
var happyColor=popState.happiness>=70?'#4CAF50':popState.happiness>=40?'#FF9800':'#F44336';
ctx.fillText('행복도: ',30,265);ctx.fillStyle=happyColor;ctx.fillText(popState.happiness+'%',75,265);
ctx.fillStyle='#6a8a6a';ctx.fillText('  |  세율: '+popState.taxRate+'%  |  성장률: '+popState.growthRate+'%/턴  |  턴: '+popState.turns,115,265);

var barY=280,barH=40;
ctx.fillStyle='#1a1a1e';ctx.fillRect(30,barY,480,barH);
var happyW=480*(popState.happiness/100);
ctx.fillStyle=happyColor+'88';ctx.fillRect(30,barY,happyW,barH);
ctx.strokeStyle='#3a5a3a';ctx.lineWidth=1;ctx.strokeRect(30,barY,480,barH);
ctx.fillStyle='#e8dcc8';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
ctx.fillText('민심: '+(popState.happiness>=70?'안정':popState.happiness>=40?'불안':'폭동 위험')+' ('+popState.happiness+'%)',270,barY+24);

ctx.fillStyle='#3a5a3a';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText('경과 턴: '+popState.turns+'  |  다음 턴: 식량 +'+(popState.farmers*2)+', 철 +'+(popState.miners*3)+', 금 +'+(popState.merchants*4),15,H-12);
}

function renderPopPanel(){
var existing=document.getElementById('v20-pop');
if(existing){existing.innerHTML='';} else {
existing=document.createElement('div');existing.id='v20-pop';existing.className='v20-panel';
document.body.appendChild(existing);
}
var html='<h2>🏘️ 인구 & 경제 시뮬레이션</h2>';
html+='<p class="v20-sub">인구를 관리하고 자원을 생산하여 국력을 키우세요</p>';
html+='<div class="pop-wrap"><canvas id="v20-pop-cv"></canvas>';
html+='<div class="pop-stats">';
html+='<div class="ps-item"><div class="ps-val">'+popState.population+'</div><div class="ps-label">총 인구</div></div>';
html+='<div class="ps-item"><div class="ps-val">'+popState.happiness+'%</div><div class="ps-label">민심</div></div>';
html+='<div class="ps-item"><div class="ps-val">'+popState.turns+'</div><div class="ps-label">경과 턴</div></div>';
html+='</div>';
html+='<div class="pop-actions">';
html+='<button class="pa-btn" onclick="window._v20.nextTurn()">⏭️ 다음 턴</button>';
html+='<button class="pa-btn" onclick="window._v20.recruit(\'farmers\')">🌾 농민 모집</button>';
html+='<button class="pa-btn" onclick="window._v20.recruit(\'miners\')">⛏️ 광부 모집</button>';
html+='<button class="pa-btn" onclick="window._v20.recruit(\'soldiers\')">⚔️ 병사 징집</button>';
html+='<button class="pa-btn" onclick="window._v20.recruit(\'scholars\')">📖 학자 임용</button>';
html+='<button class="pa-btn" onclick="window._v20.recruit(\'merchants\')">💰 상인 유치</button>';
html+='<button class="pa-btn" onclick="window._v20.recruit(\'artisans\')">🔨 장인 영입</button>';
html+='<button class="pa-btn" onclick="window._v20.adjustTax(1)">📈 세율+</button>';
html+='<button class="pa-btn" onclick="window._v20.adjustTax(-1)">📉 세율-</button>';
html+='</div></div>';
html+='<button class="v20-close" onclick="document.getElementById(\'v20-pop\').classList.remove(\'on\')">닫기</button>';
existing.innerHTML=html;
var cv=document.getElementById('v20-pop-cv');
if(cv) renderPopCanvas(cv);
}

function nextTurn(){
popState.turns++;
popState.food+=popState.farmers*2;
popState.iron+=popState.miners*3;
popState.gold+=popState.merchants*4-Math.floor(popState.population*popState.taxRate/100);
popState.culture+=popState.scholars*2+popState.artisans;
var growth=Math.floor(popState.population*popState.growthRate/100);
if(popState.food>=popState.population){popState.population+=growth;popState.food-=popState.population;}
else{popState.happiness=Math.max(0,popState.happiness-10);popState.population=Math.max(100,popState.population-Math.floor(growth/2));}
if(popState.taxRate>20) popState.happiness=Math.max(0,popState.happiness-3);
else if(popState.taxRate<5) popState.happiness=Math.min(100,popState.happiness+2);
popState.gold+=Math.floor(popState.population*popState.taxRate/100);
v20SFX('pop_turn');savePop();renderPopPanel();
v20Toast('⏭️ 턴 '+popState.turns+' 진행!','#2a4a2a');v20CheckAch('pop_turn');
if(popState.turns>=10) v20CheckAch('pop_10turns');
if(popState.population>=2000) v20CheckAch('pop_2000');
}

function recruit(type){
if(popState.gold<50){v20Toast('금이 부족합니다! (필요: 50)','#5a2a2a');return;}
popState.gold-=50;popState[type]+=10;popState.population+=10;
v20SFX('pop_recruit');savePop();renderPopPanel();
var names={farmers:'농민',miners:'광부',soldiers:'병사',scholars:'학자',merchants:'상인',artisans:'장인'};
v20Toast('👥 '+names[type]+' +10 모집!','#2a4a2a');
}

function adjustTax(dir){
popState.taxRate=Math.max(0,Math.min(50,popState.taxRate+dir*5));
v20SFX('pop_tax');savePop();renderPopPanel();
v20Toast('세율 조정: '+popState.taxRate+'%','#3a3a2a');
}

// ═══════════════════════════════════════════
// 7. 시대별 유닛 진화 시스템
// ═══════════════════════════════════════════
var EVOLVE_UNITS=[
{id:'infantry',name:'보병',tiers:['석기 투사','청동 보병','철기 정예병','중갑 무사','근위 정예대'],icons:['🏹','⚔️','🗡️','🛡️','⚜️'],stats:[10,18,28,40,55]},
{id:'archer',name:'궁병',tiers:['투석병','단궁병','장궁병','강궁 사수','신궁대'],icons:['🪨','🏹','🎯','💫','🌟'],stats:[8,15,25,38,52]},
{id:'cavalry',name:'기병',tiers:['말 조련사','경기병','중기병','철갑 기마','용기대'],icons:['🐎','🏇','⚔️','🛡️','🐉'],stats:[12,22,34,48,65]},
{id:'siege',name:'공성',tiers:['투석기','충차','운제','공성탑','화포대'],icons:['🪨','🪵','🪜','🏗️','💥'],stats:[15,25,38,52,70]},
{id:'shaman',name:'무당',tiers:['약초술사','기우사','신관','대제사장','천제'],icons:['🌿','🌧️','🔮','👑','⚡'],stats:[5,12,20,32,45]},
{id:'navy',name:'수군',tiers:['뗏목 어부','범선 수부','전선 수군','판옥선대','거북선'],icons:['🪵','⛵','🚢','⚓','🐢'],stats:[10,18,30,44,60]}
];

var evolveState;
function loadEvolve(){
try{evolveState=JSON.parse(localStorage.getItem('krpg_v20_evolve'))||{};}catch(e){evolveState={};}
if(!evolveState.units){
evolveState={units:{},upgrades:0};
EVOLVE_UNITS.forEach(function(u){evolveState.units[u.id]={tier:0};});
}
}
function saveEvolve(){localStorage.setItem('krpg_v20_evolve',JSON.stringify(evolveState));}

function renderEvolveCanvas(canvas){
var W=540,H=320;canvas.width=W;canvas.height=H;
var ctx=canvas.getContext('2d');
var grd=ctx.createLinearGradient(0,0,0,H);
grd.addColorStop(0,'#10100a');grd.addColorStop(1,'#0a0a08');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);

ctx.fillStyle='#FFD700';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('시대별 유닛 진화 계통도',W/2,28);

EVOLVE_UNITS.forEach(function(u,ui){
var y=55+ui*44;
var tier=evolveState.units[u.id].tier;

ctx.fillStyle='#6a6a5a';ctx.font='bold 10px sans-serif';ctx.textAlign='right';
ctx.fillText(u.name,55,y+14);

u.tiers.forEach(function(t,ti){
var x=70+ti*95;
var unlocked=ti<=tier;
ctx.fillStyle=unlocked?(ti===tier?'#2a2a1a':'#1a2a1a'):'#1a1a1e';
ctx.fillRect(x,y,85,28);
ctx.strokeStyle=unlocked?(ti===tier?'#FFD700':'#4CAF50'):'#3a3a3a';
ctx.lineWidth=ti===tier?2:1;
ctx.strokeRect(x,y,85,28);

ctx.fillStyle=unlocked?'#e8dcc8':'#4a4a4a';ctx.font='12px sans-serif';ctx.textAlign='left';
ctx.fillText(u.icons[ti],x+4,y+16);
ctx.fillStyle=unlocked?(ti===tier?'#FFD700':'#4CAF50'):'#4a4a4a';
ctx.font='8px sans-serif';
ctx.fillText(t,x+20,y+12);
ctx.fillStyle=unlocked?'#c4956a':'#3a3a3a';ctx.font='7px sans-serif';
ctx.fillText('전투력: '+u.stats[ti],x+20,y+22);

if(ti<u.tiers.length-1){
ctx.beginPath();ctx.moveTo(x+85,y+14);ctx.lineTo(x+95,y+14);
ctx.strokeStyle=ti<tier?'#4CAF50':'#3a3a3a';ctx.lineWidth=1;ctx.stroke();
}
});
});

ctx.fillStyle='#4a4a3a';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText('총 승급: '+evolveState.upgrades+'회',15,H-12);
}

function renderEvolvePanel(){
var existing=document.getElementById('v20-evolve');
if(existing){existing.innerHTML='';} else {
existing=document.createElement('div');existing.id='v20-evolve';existing.className='v20-panel';
document.body.appendChild(existing);
}
var html='<h2>🏛️ 시대별 유닛 진화</h2>';
html+='<p class="v20-sub">시대가 발전할수록 유닛이 진화합니다</p>';
html+='<div class="evolve-wrap"><canvas id="v20-evolve-cv"></canvas>';
html+='<div class="evolve-units">';
EVOLVE_UNITS.forEach(function(u){
var tier=evolveState.units[u.id].tier;
var maxTier=tier>=u.tiers.length-1;
html+='<div class="eu-card'+(maxTier?' max-tier':'')+'" data-uid="'+u.id+'">';
html+='<div class="eu-icon">'+u.icons[tier]+'</div>';
html+='<div class="eu-name">'+u.tiers[tier]+'</div>';
html+='<div class="eu-tier">'+(maxTier?'★ 최종 진화':'▲ 클릭하여 진화')+'</div>';
html+='</div>';
});
html+='</div></div>';
html+='<button class="v20-close" onclick="document.getElementById(\'v20-evolve\').classList.remove(\'on\')">닫기</button>';
existing.innerHTML=html;
var cv=document.getElementById('v20-evolve-cv');
if(cv) renderEvolveCanvas(cv);

existing.querySelectorAll('.eu-card').forEach(function(card){
card.onclick=function(){
var uid=card.getAttribute('data-uid');
var u=null;EVOLVE_UNITS.forEach(function(eu){if(eu.id===uid)u=eu;});
var tier=evolveState.units[uid].tier;
if(tier>=u.tiers.length-1){v20Toast('이미 최종 진화!','#5a4a2a');return;}
evolveState.units[uid].tier++;evolveState.upgrades++;
v20SFX('evolve_up');saveEvolve();renderEvolvePanel();
v20Toast('⬆️ '+u.name+' → '+u.tiers[tier+1]+'!','#3a3a1a');v20CheckAch('evolve_first');
var allMax=true;EVOLVE_UNITS.forEach(function(eu){if(evolveState.units[eu.id].tier<eu.tiers.length-1)allMax=false;});
if(allMax) v20CheckAch('evolve_all_max');
};
});
}

// ═══════════════════════════════════════════
// 8. 불가사의 활성화 파워
// ═══════════════════════════════════════════
var WONDER_POWERS=[
{id:'oracle',name:'천제단',icon:'🔮',power:'안개 타일 3칸 자동 탐색',effect:'정찰력 +30%',cost:100,category:'정보'},
{id:'great_wall',name:'장성',icon:'🧱',power:'외적 침입 속도 -50%',effect:'방어력 +20%',cost:150,category:'방어'},
{id:'library',name:'대학서고',icon:'📚',power:'연구 속도 +40%',effect:'지식 자원 +2/턴',cost:120,category:'학문'},
{id:'temple',name:'제천신전',icon:'⛩️',power:'전군 사기 매 턴 +5',effect:'영웅 경험치 +15%',cost:130,category:'신앙'},
{id:'market',name:'대교역장',icon:'🏪',power:'교역 수익 2배',effect:'금 자원 +3/턴',cost:140,category:'경제'},
{id:'fortress',name:'산성요새',icon:'🏰',power:'수비 시 전투력 +50%',effect:'HP 회복 +10%/턴',cost:160,category:'군사'},
{id:'monument',name:'건국기념비',icon:'🗿',power:'문화점수 +20/턴',effect:'외교 신뢰 +10%',cost:110,category:'문화'},
{id:'harbor',name:'대항구',icon:'⚓',power:'해상 교역로 수익 +80%',effect:'수군 이동력 +2',cost:145,category:'해양'}
];

var wonderState;
function loadWonder(){
try{wonderState=JSON.parse(localStorage.getItem('krpg_v20_wonder'))||{};}catch(e){wonderState={};}
if(!wonderState.wonders){
wonderState={wonders:{},totalActivated:0,totalInvested:0};
}
}
function saveWonder(){localStorage.setItem('krpg_v20_wonder',JSON.stringify(wonderState));}

function renderWonderCanvas(canvas){
var W=540,H=340;canvas.width=W;canvas.height=H;
var ctx=canvas.getContext('2d');
var grd=ctx.createLinearGradient(0,0,0,H);
grd.addColorStop(0,'#14100a');grd.addColorStop(1,'#0a0808');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);

ctx.fillStyle='#FFD700';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('불가사의 활성화 파워',W/2,28);
ctx.fillStyle='#6a5a3a';ctx.font='10px sans-serif';
ctx.fillText('불가사의 건설 완료 시 고유 글로벌 패시브 효과 발동',W/2,46);

var cols=4,cellW=120,cellH=65,startX=(W-cols*cellW)/2,startY=65;
WONDER_POWERS.forEach(function(w,i){
var col=i%cols,row=Math.floor(i/cols);
var x=startX+col*cellW+5,y=startY+row*(cellH+8);
var activated=wonderState.wonders[w.id];

if(activated){
ctx.fillStyle='rgba(40,35,10,.9)';ctx.fillRect(x,y,cellW-10,cellH);
ctx.strokeStyle='#FFD700';ctx.lineWidth=2;
ctx.shadowColor='#FFD70066';ctx.shadowBlur=8;
ctx.strokeRect(x,y,cellW-10,cellH);
ctx.shadowBlur=0;
} else {
ctx.fillStyle='rgba(20,18,10,.9)';ctx.fillRect(x,y,cellW-10,cellH);
ctx.strokeStyle='#4a3a2a';ctx.lineWidth=1;ctx.strokeRect(x,y,cellW-10,cellH);
}

ctx.fillStyle='#e8dcc8';ctx.font='18px sans-serif';ctx.textAlign='center';
ctx.fillText(w.icon,x+(cellW-10)/2,y+22);
ctx.fillStyle=activated?'#FFD700':'#8a7a5a';ctx.font='bold 9px sans-serif';
ctx.fillText(w.name,x+(cellW-10)/2,y+38);
ctx.fillStyle=activated?'#4CAF50':'#5a4a3a';ctx.font='7px sans-serif';
ctx.fillText(activated?'✅ 활성':'비용: '+w.cost,x+(cellW-10)/2,y+52);
});

var activated=Object.keys(wonderState.wonders).filter(function(k){return wonderState.wonders[k];}).length;
ctx.fillStyle='#5a4a2a';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText('활성화: '+activated+'/'+WONDER_POWERS.length+'  |  총 투자: '+wonderState.totalInvested,15,H-12);
}

function renderWonderPanel(){
var existing=document.getElementById('v20-wonder');
if(existing){existing.innerHTML='';} else {
existing=document.createElement('div');existing.id='v20-wonder';existing.className='v20-panel';
document.body.appendChild(existing);
}
var html='<h2>🏛️ 불가사의 활성화 파워</h2>';
html+='<p class="v20-sub">불가사의를 건설하여 고유 글로벌 패시브 효과를 해금</p>';
html+='<div class="wonder-wrap"><canvas id="v20-wonder-cv"></canvas>';
html+='<div class="wonder-powers">';
WONDER_POWERS.forEach(function(w){
var activated=wonderState.wonders[w.id];
html+='<div class="wp-card'+(activated?' activated':'')+'" data-wid="'+w.id+'">';
html+='<div class="wp-icon">'+w.icon+'</div>';
html+='<div class="wp-name">'+w.name+'</div>';
html+='<div class="wp-power">'+w.power+'</div>';
html+='<div class="wp-status" style="color:'+(activated?'#4CAF50':'#c4956a')+'">'+(activated?'✅ 활성':'🔨 건설: '+w.cost+' 자원')+'</div>';
html+='</div>';
});
html+='</div></div>';
html+='<button class="v20-close" onclick="document.getElementById(\'v20-wonder\').classList.remove(\'on\')">닫기</button>';
existing.innerHTML=html;
var cv=document.getElementById('v20-wonder-cv');
if(cv) renderWonderCanvas(cv);

existing.querySelectorAll('.wp-card').forEach(function(card){
card.onclick=function(){
var wid=card.getAttribute('data-wid');
if(wonderState.wonders[wid]){v20Toast('이미 활성화된 불가사의!','#5a4a1a');return;}
var w=null;WONDER_POWERS.forEach(function(wp){if(wp.id===wid)w=wp;});
wonderState.wonders[wid]=true;wonderState.totalActivated++;wonderState.totalInvested+=w.cost;
v20SFX('wonder_activate');saveWonder();renderWonderPanel();
v20Toast('🏛️ '+w.name+' 활성화! '+w.effect,'#4a3a1a');v20CheckAch('wonder_first');
var ac=Object.keys(wonderState.wonders).filter(function(k){return wonderState.wonders[k];}).length;
if(ac>=4) v20CheckAch('wonder_4');
if(ac>=WONDER_POWERS.length) v20CheckAch('wonder_all');
};
});
}

// ═══════════════════════════════════════════
// Quizzes (+15)
// ═══════════════════════════════════════════
var V20_QUIZ=[
{q:'군대 사기가 0%로 떨어지면 발생하는 현상은?',a:['궤주(壞走)','항복','탈영','반란'],c:0},
{q:'빗속 전투에서 가장 큰 피해를 입는 병종은?',a:['궁병','기병','보병','무당'],c:0},
{q:'고조선의 대표적 혼인 외교 대상국은?',a:['부여','왜','흉노','한'],c:0},
{q:'비단길 교역에서 고조선이 주로 수출한 물품은?',a:['인삼','도자기','비단','철기'],c:0},
{q:'다뉴세문경은 어떤 문화 카테고리에 속하는가?',a:['공예','문학','건축','음악'],c:0},
{q:'인구 경제에서 세율을 높이면 어떤 수치가 하락하는가?',a:['행복도','인구','식량','철'],c:0},
{q:'유닛 진화 시스템에서 보병의 최종 진화 단계는?',a:['근위 정예대','철기 정예병','중갑 무사','왕의 친위대'],c:0},
{q:'천제단 불가사의의 고유 효과는?',a:['안개 타일 자동 탐색','교역 수익 2배','연구 속도 증가','사기 회복'],c:0},
{q:'장마철 전투에서 불가능해지는 행동 2가지는?',a:['도하·공성','기병돌격·화공','매복·정찰','후퇴·보급'],c:0},
{q:'외교 인질 교환 시 가장 높은 신뢰를 얻는 인물은?',a:['부여 세자','한 장군','왕자 해부루','예맥 학자'],c:0},
{q:'삼한 여왕과의 혼인 동맹 시 획득하는 버프는?',a:['외교 신뢰 +30%','기병 +15%','교역 +20%','연구 +20%'],c:0},
{q:'흉노 말교역로의 주요 거래 물품은?',a:['군마·가죽','비단·모피','철기·청동기','진주·조개'],c:0},
{q:'빗살무늬토기는 어느 시대의 유물인가?',a:['신석기','구석기','청동기','철기'],c:0},
{q:'인구 시뮬에서 식량이 인구보다 적을 때 발생하는 현상은?',a:['민심 하락·인구 감소','금 증가','병사 탈영','문화 상승'],c:0},
{q:'거북선은 수군 유닛의 몇 번째 진화 단계인가?',a:['5단계','4단계','3단계','2단계'],c:0}
];

function registerV20Quiz(){
var existing=[];
try{existing=JSON.parse(localStorage.getItem('krpg_quiz'))||[];}catch(e){existing=[];}
var ids=existing.map(function(q){return q.q;});
V20_QUIZ.forEach(function(q){if(ids.indexOf(q.q)<0)existing.push(q);});
localStorage.setItem('krpg_quiz',JSON.stringify(existing));
if(typeof window.registerQuiz==='function')window.registerQuiz(V20_QUIZ,'v20');
}

// ═══════════════════════════════════════════
// Achievements (+12)
// ═══════════════════════════════════════════
var V20_ACH=[
{id:'morale_boost',name:'사기 고양자',desc:'유닛 사기를 직접 올려보세요',icon:'📯'},
{id:'morale_rally',name:'전군 독려',desc:'독려로 전군 사기를 올리세요',icon:'🎺'},
{id:'weather_set',name:'날씨 관측관',desc:'날씨를 직접 설정해보세요',icon:'🌤️'},
{id:'marriage_first',name:'첫 혼인 동맹',desc:'첫 외교 혼인을 성사시키세요',icon:'💍'},
{id:'trade_first',name:'교역로 개척자',desc:'첫 교역로를 개설하세요',icon:'🐪'},
{id:'trade_rich',name:'부유한 왕국',desc:'교역 총수익 1000금 달성',icon:'💰'},
{id:'prestige_first',name:'문화 개척자',desc:'첫 문화 위업을 완성하세요',icon:'🎨'},
{id:'prestige_master',name:'문화 대가',desc:'모든 문화 위업 완성',icon:'🏆'},
{id:'pop_turn',name:'국정 운영자',desc:'인구경제 첫 턴을 진행하세요',icon:'🏘️'},
{id:'evolve_first',name:'유닛 진화',desc:'유닛을 처음 진화시키세요',icon:'⬆️'},
{id:'wonder_first',name:'불가사의 건축가',desc:'불가사의를 처음 활성화하세요',icon:'🏛️'},
{id:'v20_explorer',name:'v20 탐험가',desc:'v20의 8개 기능 모두 열어보세요',icon:'🗺️'}
];

function loadV20Ach(){
var existing=[];
try{existing=JSON.parse(localStorage.getItem('krpg_achievements'))||[];}catch(e){existing=[];}
var ids=existing.map(function(a){return a.id;});
V20_ACH.forEach(function(a){if(ids.indexOf(a.id)<0)existing.push({id:a.id,name:a.name,desc:a.desc,icon:a.icon,unlocked:false});});
localStorage.setItem('krpg_achievements',JSON.stringify(existing));
}

function v20CheckAch(id){
var a=null;V20_ACH.forEach(function(ac){if(ac.id===id)a=ac;});
if(!a)return;
var existing=[];
try{existing=JSON.parse(localStorage.getItem('krpg_achievements'))||[];}catch(e){existing=[];}
var found=false;
existing.forEach(function(ac){if(ac.id===id){if(!ac.unlocked){ac.unlocked=true;found=true;}}});
if(found){
localStorage.setItem('krpg_achievements',JSON.stringify(existing));
v20Toast('🏆 업적 해금: '+a.name,'#5a4a1a');v20SFX('achieve_v20');
}
}

// ═══════════════════════════════════════════
// SFX
// ═══════════════════════════════════════════
var actx;
function v20SFX(type){
try{
if(!actx) actx=new(window.AudioContext||window.webkitAudioContext)();
var o=actx.createOscillator(),g=actx.createGain();
o.connect(g);g.connect(actx.destination);
var f={
morale_up:440,morale_rally:660,morale_inspect:523,morale_victory:880,morale_rout:165,
weather_change:349,weather_season:294,weather_random:392,
marriage_wed:523,marriage_hostage:330,
trade_open:440,trade_raid:220,trade_collect:660,
prestige_create:523,prestige_patron:440,
pop_turn:349,pop_recruit:440,pop_tax:262,
evolve_up:660,
wonder_activate:880,
achieve_v20:784
};
o.frequency.value=f[type]||330;
o.type=({morale_rout:'sawtooth',trade_raid:'square',weather_change:'triangle',evolve_up:'triangle',wonder_activate:'triangle'})[type]||'sine';
g.gain.value=0.12;
o.start();
g.gain.exponentialRampToValueAtTime(0.001,actx.currentTime+0.3);
o.stop(actx.currentTime+0.3);
}catch(e){}
}

// ═══════════════════════════════════════════
// Keyboard Shortcuts
// ═══════════════════════════════════════════
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
var map={
'Digit1':['v20-morale',renderMoralePanel],
'Digit2':['v20-weather',renderWeatherPanel],
'Digit3':['v20-marriage',renderMarriagePanel],
'Digit4':['v20-trade',renderTradePanel],
'Digit5':['v20-prestige',renderPrestigePanel],
'Digit6':['v20-pop',renderPopPanel],
'Digit7':['v20-evolve',renderEvolvePanel],
'Digit8':['v20-wonder',renderWonderPanel]
};
if(map[e.code]){
e.preventDefault();var id=map[e.code][0],fn=map[e.code][1];
var el=document.getElementById(id);
if(el&&el.classList.contains('on')){el.classList.remove('on');}
else{fn();document.getElementById(id).classList.add('on');}
}
});

// ═══════════════════════════════════════════
// Quick Action Nav Bar
// ═══════════════════════════════════════════
function addV20NavBar(){
var existing=document.getElementById('v20-nav-bar');
if(existing) existing.remove();
var prev=document.getElementById('v19-nav-bar');
if(prev) prev.style.bottom='44px';

var bar=document.createElement('div');
bar.id='v20-nav-bar';
bar.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:128;display:flex;gap:0;overflow-x:auto;background:rgba(10,6,8,.94);border-top:1px solid #5a3a2a;padding:4px 8px;-webkit-overflow-scrolling:touch;scrollbar-width:none';

var actions=[
{label:'📯',title:'사기',fn:function(){renderMoralePanel();document.getElementById('v20-morale').classList.add('on')}},
{label:'🌤️',title:'날씨',fn:function(){renderWeatherPanel();document.getElementById('v20-weather').classList.add('on')}},
{label:'💍',title:'혼인',fn:function(){renderMarriagePanel();document.getElementById('v20-marriage').classList.add('on')}},
{label:'🐪',title:'교역',fn:function(){renderTradePanel();document.getElementById('v20-trade').classList.add('on')}},
{label:'🎭',title:'문화',fn:function(){renderPrestigePanel();document.getElementById('v20-prestige').classList.add('on')}},
{label:'🏘️',title:'인구',fn:function(){renderPopPanel();document.getElementById('v20-pop').classList.add('on')}},
{label:'⬆️',title:'진화',fn:function(){renderEvolvePanel();document.getElementById('v20-evolve').classList.add('on')}},
{label:'🏛️',title:'고대',fn:function(){renderWonderPanel();document.getElementById('v20-wonder').classList.add('on')}}
];

actions.forEach(function(a){
var btn=document.createElement('button');
btn.style.cssText='flex:0 0 auto;width:48px;height:40px;border:none;border-radius:6px;background:transparent;color:#e8dcc8;font-size:16px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;padding:2px 4px;transition:background .2s';
btn.innerHTML='<span style="font-size:16px">'+a.label+'</span><span style="font-size:7px;color:#8a7a6a">'+a.title+'</span>';
btn.onclick=a.fn;
btn.onmouseenter=function(){btn.style.background='rgba(196,149,106,.15)';};
btn.onmouseleave=function(){btn.style.background='transparent';};
bar.appendChild(btn);
});

document.body.appendChild(bar);
}

// ═══════════════════════════════════════════
// Init
// ═══════════════════════════════════════════
function v20Init(){
loadMorale();loadWeather();loadMarriage();loadTrade();loadPrestige();loadPop();loadEvolve();loadWonder();
loadV20Ach();registerV20Quiz();
setTimeout(addV20NavBar,3000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',v20Init);}
else{v20Init();}

window._v20={
MORALE_UNITS:MORALE_UNITS,WEATHERS:WEATHERS,MARRIAGE_CANDIDATES:MARRIAGE_CANDIDATES,
HOSTAGES:HOSTAGES,TRADE_ROUTES:TRADE_ROUTES,GREAT_WORKS:GREAT_WORKS,
EVOLVE_UNITS:EVOLVE_UNITS,WONDER_POWERS:WONDER_POWERS,
V20_QUIZ:V20_QUIZ,V20_ACH:V20_ACH,v20SFX:v20SFX,
rally:rally,inspect:inspect,simBattle:simBattle,
randomWeather:randomWeather,changeSeason:changeSeason,
collectTrade:collectTrade,patronize:patronize,
nextTurn:nextTurn,recruit:recruit,adjustTax:adjustTax
};
})();
