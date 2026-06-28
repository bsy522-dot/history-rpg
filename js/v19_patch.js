// v19_patch.js — 한국사 영웅전 v19.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v19-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:137;overflow-y:auto;padding:16px}',
'.v19-panel.on{display:block}',
'.v19-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v19-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v19-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v19-close:hover{background:#8B2A1A}',

'.astro-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.astro-wrap canvas{border:2px solid #1a2a5a;border-radius:10px;background:#020818;display:block;margin:0 auto 12px;cursor:pointer}',
'.astro-info{font-size:11px;color:#8a8aaa;text-align:center;line-height:1.8;max-width:420px;margin:0 auto 12px;background:rgba(10,10,30,.8);border:1px solid #2a2a5a;border-radius:8px;padding:12px}',
'.astro-info strong{color:#5FA0FF}',
'.astro-btns{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.astro-btn{padding:6px 14px;border:1px solid #2a3a5a;border-radius:6px;background:#0a1a2a;color:#e8dcc8;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.astro-btn:hover{border-color:#5FA0FF}',
'.astro-btn.selected{border-color:#5FA0FF;background:#1a2a3a;color:#00E5FF}',

'.weather-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.weather-wrap canvas{border:2px solid #3a4a3a;border-radius:10px;background:#0a0a14;display:block;margin:0 auto 12px}',
'.weather-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:420px;margin:0 auto}',
'.wth-card{background:rgba(20,25,30,.9);border:1px solid #3a4a5a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.wth-card:hover{border-color:#FFD700;transform:translateY(-2px)}',
'.wth-card.active{border-color:#FFD700;box-shadow:0 0 10px rgba(255,215,0,.2)}',
'.wth-card .wt-icon{font-size:28px}',
'.wth-card .wt-name{font-size:10px;color:#c4956a;margin-top:2px}',
'.wth-card .wt-effect{font-size:8px;color:#8a8a6a;margin-top:2px}',

'.currency-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.currency-wrap canvas{border:2px solid #5a4a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.cur-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:420px;margin:0 auto}',
'.cur-card{background:rgba(25,20,10,.9);border:1px solid #5a4a2a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.cur-card:hover{border-color:#FFD700;transform:translateY(-2px)}',
'.cur-card .cc-icon{font-size:24px}',
'.cur-card .cc-name{font-size:10px;color:#FFD700;font-weight:700;margin-top:2px}',
'.cur-card .cc-val{font-size:14px;color:#e8dcc8;font-weight:700;margin-top:4px}',
'.cur-card .cc-rate{font-size:8px;color:#8a7a5a;margin-top:2px}',
'.cur-btns{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:10px 0}',

'.relation-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.relation-wrap canvas{border:2px solid #4a3a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px;cursor:pointer}',
'.rel-legend{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.rel-leg{font-size:9px;display:flex;align-items:center;gap:3px}',
'.rel-dot{width:8px;height:8px;border-radius:50%;display:inline-block}',

'.spirit-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-width:560px;margin:0 auto}',
'.spirit-card{background:linear-gradient(135deg,rgba(20,10,30,.95),rgba(10,5,20,.98));border:2px solid #5a3a6a;border-radius:12px;padding:14px;text-align:center;transition:all .3s;cursor:pointer}',
'.spirit-card:hover{border-color:#aa88ff;transform:translateY(-3px);box-shadow:0 6px 20px rgba(170,136,255,.15)}',
'.spirit-card.summoned{border-color:#FFD700;background:linear-gradient(135deg,rgba(40,30,10,.95),rgba(30,20,5,.98))}',
'.spirit-card .sp-icon{font-size:36px;margin-bottom:4px}',
'.spirit-card .sp-name{font-size:12px;color:#aa88ff;font-weight:700}',
'.spirit-card .sp-type{font-size:9px;color:#8a7a6a;margin-top:2px}',
'.spirit-card .sp-buff{font-size:9px;color:#4CAF50;margin-top:4px}',
'.spirit-card .sp-cost{font-size:8px;color:#FF9800;margin-top:2px}',

'.folk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;max-width:560px;margin:0 auto}',
'.folk-card{background:linear-gradient(135deg,rgba(30,25,15,.95),rgba(20,15,10,.98));border:2px solid #6a5a3a;border-radius:12px;padding:14px;text-align:center;transition:all .3s;cursor:pointer}',
'.folk-card:hover{border-color:#FF9800;transform:translateY(-3px)}',
'.folk-card .fk-icon{font-size:36px;margin-bottom:4px}',
'.folk-card .fk-name{font-size:12px;color:#FF9800;font-weight:700}',
'.folk-card .fk-desc{font-size:9px;color:#8a7a6a;margin-top:4px;line-height:1.5}',
'.folk-card .fk-score{font-size:10px;color:#FFD700;font-weight:700;margin-top:6px}',

'.qbattle-wrap{max-width:500px;margin:0 auto;text-align:center}',
'.qb-vs{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:12px}',
'.qb-player{background:rgba(20,15,30,.9);border:2px solid #3a5a3a;border-radius:12px;padding:12px;text-align:center;min-width:120px}',
'.qb-player.active{border-color:#FFD700;box-shadow:0 0 12px rgba(255,215,0,.2)}',
'.qb-player .qb-icon{font-size:28px}',
'.qb-player .qb-name{font-size:11px;color:#FFD700;font-weight:700;margin-top:2px}',
'.qb-player .qb-score{font-size:18px;color:#e8dcc8;font-weight:900;margin-top:4px}',
'.qb-question{background:rgba(20,15,30,.95);border:1px solid #5a4a3a;border-radius:10px;padding:16px;margin:12px 0}',
'.qb-question .qb-q{font-size:13px;color:#FFD700;margin-bottom:10px;line-height:1.8}',
'.qb-answer{display:block;width:100%;padding:8px 12px;margin:4px 0;border:1px solid #3a3a4a;border-radius:6px;background:#1a1428;color:#e8dcc8;font-family:inherit;font-size:11px;cursor:pointer;text-align:left;transition:all .2s}',
'.qb-answer:hover{border-color:#c4956a;background:#2a2438}',
'.qb-answer.correct{background:#2a5a2a;border-color:#4CAF50}',
'.qb-answer.wrong{background:#5a2a2a;border-color:#FF4444}',

'.mil-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;max-width:560px;margin:0 auto}',
'.mil-card{background:linear-gradient(135deg,rgba(25,15,10,.95),rgba(15,10,5,.98));border:2px solid #5a3a2a;border-radius:12px;padding:14px;text-align:center;transition:all .3s;cursor:pointer}',
'.mil-card:hover{border-color:#FF6644;transform:translateY(-3px)}',
'.mil-card.studied{border-color:#FFD700;background:linear-gradient(135deg,rgba(40,30,10,.95),rgba(30,20,5,.98))}',
'.mil-card .ml-icon{font-size:28px;margin-bottom:4px}',
'.mil-card .ml-name{font-size:12px;color:#FF6644;font-weight:700}',
'.mil-card .ml-author{font-size:9px;color:#8a7a6a;margin-top:2px}',
'.mil-card .ml-buff{font-size:9px;color:#4CAF50;margin-top:4px}',
'.mil-card .ml-prog{height:4px;background:#1a1a2e;border-radius:2px;overflow:hidden;margin-top:6px}',
'.mil-card .ml-prog-bar{height:100%;background:linear-gradient(90deg,#FF6644,#FFD700);border-radius:2px;transition:width .5s}'
].join('\n');
document.head.appendChild(css);

function v19Toast(msg,c){var t=document.createElement('div');t.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:'+(c||'#c4956a')+'22;color:'+(c||'#c4956a')+';border:1px solid '+(c||'#c4956a')+'44;padding:10px 20px;border-radius:12px;font-size:12px;font-weight:700;z-index:200;pointer-events:none;animation:fadeIn .3s ease';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.remove()},2000)}

var actx;function v19SFX(type){try{if(!actx)actx=new(window.AudioContext||window.webkitAudioContext)();var o=actx.createOscillator(),g=actx.createGain();o.connect(g);g.connect(actx.destination);var f={astro_view:523,astro_predict:659,weather_change:220,weather_storm:110,currency_trade:440,currency_gain:554,relation_view:330,spirit_summon:880,spirit_buff:660,folk_play:392,folk_win:784,qbattle_correct:554,qbattle_wrong:165,mil_study:349,mil_master:698};o.frequency.value=f[type]||330;o.type=({weather_storm:'square',spirit_summon:'sawtooth',folk_play:'triangle'})[type]||'sine';g.gain.value=0.12;o.start();g.gain.exponentialRampToValueAtTime(0.001,actx.currentTime+0.3);o.stop(actx.currentTime+0.3)}catch(e){}}

function makePanel(id){var existing=document.getElementById(id);if(existing)existing.remove();var p=document.createElement('div');p.id=id;p.className='v19-panel';document.body.appendChild(p);return p}

// ─── 1. 고대 천문관 (Ancient Observatory Canvas) ───
var CONSTELLATIONS=[
{name:'북두칠성',stars:[[0.5,0.25],[0.52,0.28],[0.55,0.27],[0.58,0.29],[0.62,0.28],[0.66,0.30],[0.69,0.33]],color:'#5FA0FF',meaning:'왕의 수레, 방향 지시',season:'사계절',fortune:'통치력 +15%'},
{name:'삼태성',stars:[[0.3,0.4],[0.33,0.42],[0.36,0.44],[0.32,0.46],[0.35,0.48],[0.38,0.50]],color:'#FFD700',meaning:'하늘의 세 어머니, 탄생과 수호',season:'봄',fortune:'치유력 +20%'},
{name:'오제좌',stars:[[0.7,0.5],[0.72,0.48],[0.74,0.52],[0.76,0.49],[0.73,0.54]],color:'#FF5FA2',meaning:'다섯 제왕의 좌, 왕권의 상징',season:'가을',fortune:'외교력 +18%'},
{name:'직녀성',stars:[[0.2,0.3],[0.22,0.32],[0.18,0.34]],color:'#00E5FF',meaning:'길쌈과 직조의 신, 풍요의 별',season:'여름',fortune:'자원 수확 +25%'},
{name:'견우성',stars:[[0.8,0.35],[0.82,0.38],[0.78,0.37]],color:'#FF9800',meaning:'소를 끄는 목동, 농사의 별',season:'여름',fortune:'식량 생산 +22%'},
{name:'태미원',stars:[[0.45,0.6],[0.48,0.58],[0.51,0.6],[0.54,0.57],[0.50,0.63],[0.47,0.62]],color:'#aa88ff',meaning:'태미원 황제의 궁전, 정치의 별',season:'봄',fortune:'사기 +20%'},
{name:'천시원',stars:[[0.6,0.7],[0.63,0.68],[0.66,0.72],[0.62,0.74],[0.58,0.72]],color:'#4CAF50',meaning:'하늘의 시장, 교역과 상업의 별',season:'가을',fortune:'교역 수익 +30%'},
{name:'자미원',stars:[[0.4,0.15],[0.42,0.18],[0.44,0.13],[0.46,0.17],[0.38,0.17]],color:'#FF4444',meaning:'자미원 북극성 궁전, 천자의 별',season:'겨울',fortune:'전체 스탯 +10%'}
];
var astroState={viewed:[],predictions:0};

function saveAstro(){try{localStorage.setItem('krpg_v19_astro',JSON.stringify(astroState))}catch(e){}}
function loadAstro(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_astro'));if(d)astroState=d}catch(e){}}

function drawAstroCanvas(canvas,selectedIdx){
var ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
ctx.fillStyle='#020818';ctx.fillRect(0,0,W,H);
for(var i=0;i<120;i++){var sx=Math.sin(i*137.5)*W*0.5+W*0.5,sy=Math.cos(i*97.3)*H*0.5+H*0.5;var sz=Math.random()*1.5+0.3;ctx.fillStyle='rgba(200,200,255,'+(Math.random()*0.4+0.2)+')';ctx.beginPath();ctx.arc(sx,sy,sz,0,Math.PI*2);ctx.fill();}
CONSTELLATIONS.forEach(function(c,ci){
var isSelected=ci===selectedIdx;
ctx.strokeStyle=isSelected?c.color:c.color+'66';ctx.lineWidth=isSelected?2:1;
ctx.beginPath();
c.stars.forEach(function(s,si){
var x=s[0]*W,y=s[1]*H;
if(si===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
});
ctx.stroke();
c.stars.forEach(function(s){
var x=s[0]*W,y=s[1]*H;
ctx.fillStyle=isSelected?c.color:'#ffffff88';
ctx.beginPath();ctx.arc(x,y,isSelected?4:2.5,0,Math.PI*2);ctx.fill();
if(isSelected){ctx.fillStyle=c.color+'44';ctx.beginPath();ctx.arc(x,y,8,0,Math.PI*2);ctx.fill();}
});
if(isSelected){
var cx=c.stars.reduce(function(a,s){return a+s[0]},0)/c.stars.length*W;
var cy=c.stars.reduce(function(a,s){return a+s[1]},0)/c.stars.length*H;
ctx.fillStyle=c.color;ctx.font='bold 11px sans-serif';ctx.textAlign='center';
ctx.fillText(c.name,cx,cy-16);
}
});
ctx.fillStyle='#5a5a8a';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('고대 천문관 — 별자리를 선택하여 천문 예측을 확인하세요',W/2,H-10);
}

var selectedConstellation=0;
function renderAstroPanel(){
var p=makePanel('v19-astro');
p.innerHTML='<h2>🌌 고대 천문관</h2><p class="v19-sub">고대 한국인이 관측한 별자리를 탐험하고 천문 예측을 확인하라! (관측: '+astroState.viewed.length+'/'+CONSTELLATIONS.length+')</p>';
var wrap=document.createElement('div');wrap.className='astro-wrap';
var canvas=document.createElement('canvas');canvas.width=520;canvas.height=380;
canvas.onclick=function(ev){
var rect=canvas.getBoundingClientRect();var mx=(ev.clientX-rect.left)/rect.width;var my=(ev.clientY-rect.top)/rect.height;
var closest=-1,minD=Infinity;
CONSTELLATIONS.forEach(function(c,ci){
var cx=c.stars.reduce(function(a,s){return a+s[0]},0)/c.stars.length;
var cy=c.stars.reduce(function(a,s){return a+s[1]},0)/c.stars.length;
var d=Math.sqrt((mx-cx)*(mx-cx)+(my-cy)*(my-cy));
if(d<minD&&d<0.15){minD=d;closest=ci;}
});
if(closest>=0){selectedConstellation=closest;if(astroState.viewed.indexOf(closest)<0){astroState.viewed.push(closest);saveAstro();}v19SFX('astro_view');renderAstroPanel();document.getElementById('v19-astro').classList.add('on');}
};
wrap.appendChild(canvas);
drawAstroCanvas(canvas,selectedConstellation);

var btns=document.createElement('div');btns.className='astro-btns';
CONSTELLATIONS.forEach(function(c,i){
var btn=document.createElement('button');btn.className='astro-btn'+(selectedConstellation===i?' selected':'');
btn.textContent=c.name;
btn.onclick=function(){selectedConstellation=i;if(astroState.viewed.indexOf(i)<0){astroState.viewed.push(i);saveAstro();}v19SFX('astro_view');renderAstroPanel();document.getElementById('v19-astro').classList.add('on');};
btns.appendChild(btn);
});
wrap.appendChild(btns);

var con=CONSTELLATIONS[selectedConstellation];
var info=document.createElement('div');info.className='astro-info';
info.innerHTML='<strong>'+con.name+'</strong> ('+con.season+')<br>의미: '+con.meaning+'<br>천문 예측: <strong style="color:#4CAF50">'+con.fortune+'</strong>';
wrap.appendChild(info);

var predictBtn=document.createElement('button');predictBtn.className='astro-btn';predictBtn.style.cssText='margin:10px auto;display:block;padding:8px 20px;font-size:12px';
predictBtn.textContent='🔮 천문 예측 수행';
predictBtn.onclick=function(){
astroState.predictions++;saveAstro();v19SFX('astro_predict');
v19Toast('천문 예측: '+con.fortune+' 적용!','#5FA0FF');
if(astroState.viewed.length>=1)v19CheckAch('astro_first');
if(astroState.viewed.length>=8)v19CheckAch('astro_all');
if(astroState.predictions>=5)v19CheckAch('astro_master');
};
wrap.appendChild(predictBtn);
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-astro\').classList.remove(\'on\')">닫기</button>';
}

// ─── 2. 전투 기상 시스템 (Battle Weather System) ───
var WEATHERS=[
{name:'맑음',icon:'☀️',effect:'기본 전투력',stat:'효과 없음',atk:0,def:0,spd:0,color:'#FFD700'},
{name:'비',icon:'🌧️',effect:'궁병 명중 -20%',stat:'궁병 약화',atk:-3,def:0,spd:-1,color:'#5FA0FF'},
{name:'눈',icon:'❄️',effect:'이동력 -1, 방어 +10%',stat:'방어 유리',atk:0,def:5,spd:-2,color:'#00E5FF'},
{name:'안개',icon:'🌫️',effect:'시야 -2, 기습 +30%',stat:'첩보 유리',atk:2,def:-3,spd:0,color:'#8a8a8a'},
{name:'폭풍',icon:'⛈️',effect:'전체 피해 +15%',stat:'혼전 상태',atk:5,def:-5,spd:-1,color:'#aa88ff'},
{name:'가뭄',icon:'🏜️',effect:'HP회복 -50%, 사기 -10%',stat:'체력 소모',atk:0,def:-2,spd:0,color:'#FF9800'},
{name:'바람',icon:'🌪️',effect:'원거리 명중 -30%, 기병 +15%',stat:'기병 유리',atk:3,def:0,spd:2,color:'#4CAF50'},
{name:'번개',icon:'⚡',effect:'랜덤 피해, 사기 변동',stat:'불안정',atk:8,def:-4,spd:0,color:'#FFD700'}
];
var weatherState={current:0,history:[],battles:0};

function saveWeather(){try{localStorage.setItem('krpg_v19_weather',JSON.stringify(weatherState))}catch(e){}}
function loadWeather(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_weather'));if(d)weatherState=d}catch(e){}}

function drawWeatherCanvas(canvas){
var ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
var w=WEATHERS[weatherState.current];
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,W,H);
var grd=ctx.createRadialGradient(W/2,H*0.4,0,W/2,H*0.4,W*0.4);
grd.addColorStop(0,w.color+'33');grd.addColorStop(1,'transparent');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle=w.color;ctx.font='48px sans-serif';ctx.textAlign='center';ctx.fillText(w.icon,W/2,H*0.4);
ctx.fillStyle='#e8dcc8';ctx.font='bold 16px sans-serif';ctx.fillText(w.name,W/2,H*0.55);
ctx.fillStyle=w.color;ctx.font='11px sans-serif';ctx.fillText(w.effect,W/2,H*0.65);
var stats=['ATK '+(w.atk>=0?'+':'')+w.atk,'DEF '+(w.def>=0?'+':'')+w.def,'SPD '+(w.spd>=0?'+':'')+w.spd];
ctx.fillStyle='#8a8a6a';ctx.font='10px sans-serif';
stats.forEach(function(s,i){ctx.fillText(s,W*0.25+i*W*0.25,H*0.78);});
if(weatherState.history.length>1){
ctx.strokeStyle='#5a5a6a';ctx.lineWidth=1;ctx.beginPath();
var histLen=Math.min(10,weatherState.history.length);
for(var i=0;i<histLen;i++){
var hw=WEATHERS[weatherState.history[weatherState.history.length-histLen+i]];
var x=W*0.1+i*(W*0.8/(histLen-1||1)),y=H*0.9;
ctx.fillStyle=hw.color;ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();
}
}
}

function renderWeatherPanel(){
var p=makePanel('v19-weather');
p.innerHTML='<h2>🌤️ 전투 기상 시스템</h2><p class="v19-sub">날씨가 전투에 영향을 미친다! 현재 기상을 확인하고 전투에 활용하라 (전투: '+weatherState.battles+')</p>';
var wrap=document.createElement('div');wrap.className='weather-wrap';
var canvas=document.createElement('canvas');canvas.width=480;canvas.height=280;
wrap.appendChild(canvas);
drawWeatherCanvas(canvas);

var grid=document.createElement('div');grid.className='weather-grid';
WEATHERS.forEach(function(w,i){
var card=document.createElement('div');card.className='wth-card'+(weatherState.current===i?' active':'');
card.innerHTML='<div class="wt-icon">'+w.icon+'</div><div class="wt-name">'+w.name+'</div><div class="wt-effect">'+w.stat+'</div>';
card.onclick=function(){
weatherState.current=i;weatherState.history.push(i);if(weatherState.history.length>20)weatherState.history.shift();
weatherState.battles++;saveWeather();v19SFX('weather_change');
v19Toast(w.name+' 기상 적용! '+w.effect,w.color);
if(weatherState.battles>=1)v19CheckAch('weather_first');
if(weatherState.battles>=10)v19CheckAch('weather_master');
renderWeatherPanel();document.getElementById('v19-weather').classList.add('on');
};
grid.appendChild(card);
});
wrap.appendChild(grid);
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-weather\').classList.remove(\'on\')">닫기</button>';
}

// ─── 3. 고대 화폐 교역소 (Ancient Currency Exchange) ───
var CURRENCIES=[
{name:'조개화폐',icon:'🐚',era:'신석기',value:1,desc:'가장 오래된 교역 수단'},
{name:'명도전',icon:'🔪',era:'고조선',value:5,desc:'칼 모양의 청동화폐, 연나라 교역'},
{name:'반량전',icon:'🪙',era:'진한교류',value:3,desc:'진나라 동전, 한반도 유입'},
{name:'오수전',icon:'💰',era:'한사군',value:4,desc:'한나라 동전, 낙랑군 유통'},
{name:'포전',icon:'🧵',era:'삼한',value:2,desc:'삼베와 비단으로 거래'},
{name:'철전',icon:'⚙️',era:'철기시대',value:6,desc:'철제 화폐, 가야 지역 유통'}
];
var tradeState={holdings:[50,10,15,8,30,5],trades:0,profit:0};

function saveTrade(){try{localStorage.setItem('krpg_v19_trade',JSON.stringify(tradeState))}catch(e){}}
function loadTrade(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_trade'));if(d)tradeState=d}catch(e){}}

function drawTradeCanvas(canvas){
var ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#c4956a';ctx.font='bold 12px sans-serif';ctx.textAlign='center';
ctx.fillText('화폐 보유 현황',W/2,20);
var barW=W*0.12,gap=W*0.02;var startX=(W-CURRENCIES.length*(barW+gap))/2;
var maxVal=Math.max.apply(null,tradeState.holdings.concat([1]));
CURRENCIES.forEach(function(c,i){
var x=startX+i*(barW+gap),h=tradeState.holdings[i]/maxVal*(H*0.6);
var y=H*0.85-h;
var grd=ctx.createLinearGradient(x,y,x,H*0.85);
grd.addColorStop(0,'#FFD700');grd.addColorStop(1,'#8B6B3D');
ctx.fillStyle=grd;ctx.fillRect(x,y,barW,h);
ctx.strokeStyle='#5a4a2a';ctx.strokeRect(x,y,barW,h);
ctx.fillStyle='#e8dcc8';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText(c.icon,x+barW/2,H*0.92);
ctx.fillText(tradeState.holdings[i]+'',x+barW/2,y-4);
});
ctx.fillStyle='#4CAF50';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('총 거래: '+tradeState.trades+'회 | 총 수익: '+(tradeState.profit>=0?'+':'')+tradeState.profit,10,H-6);
}

function renderTradePanel(){
var p=makePanel('v19-trade');
p.innerHTML='<h2>💰 고대 화폐 교역소</h2><p class="v19-sub">6종 고대 화폐를 교환하여 부를 축적하라! (거래: '+tradeState.trades+'회)</p>';
var wrap=document.createElement('div');wrap.className='currency-wrap';
var canvas=document.createElement('canvas');canvas.width=520;canvas.height=240;
wrap.appendChild(canvas);
drawTradeCanvas(canvas);

var grid=document.createElement('div');grid.className='cur-grid';
CURRENCIES.forEach(function(c,i){
var card=document.createElement('div');card.className='cur-card';
card.innerHTML='<div class="cc-icon">'+c.icon+'</div><div class="cc-name">'+c.name+'</div><div class="cc-val">'+tradeState.holdings[i]+'개</div><div class="cc-rate">가치: '+c.value+' | '+c.era+'</div>';
grid.appendChild(card);
});
wrap.appendChild(grid);

var btns=document.createElement('div');btns.className='cur-btns';
var tradeBtn=document.createElement('button');tradeBtn.className='astro-btn';tradeBtn.textContent='🔄 랜덤 교역';
tradeBtn.onclick=function(){
var from=Math.floor(Math.random()*6),to=(from+1+Math.floor(Math.random()*5))%6;
if(tradeState.holdings[from]<5){v19Toast('보유량 부족!','#FF4444');return;}
var rate=CURRENCIES[to].value/CURRENCIES[from].value;
var give=5,get=Math.max(1,Math.floor(give*rate*(0.8+Math.random()*0.4)));
tradeState.holdings[from]-=give;tradeState.holdings[to]+=get;
tradeState.trades++;tradeState.profit+=get*CURRENCIES[to].value-give*CURRENCIES[from].value;
saveTrade();v19SFX('currency_trade');
v19Toast(CURRENCIES[from].name+' '+give+'→'+CURRENCIES[to].name+' '+get,'#FFD700');
if(tradeState.trades>=1)v19CheckAch('trade_first');
if(tradeState.trades>=20)v19CheckAch('trade_master');
renderTradePanel();document.getElementById('v19-trade').classList.add('on');
};
btns.appendChild(tradeBtn);

var harvestBtn=document.createElement('button');harvestBtn.className='astro-btn';harvestBtn.textContent='📦 화폐 수확';
harvestBtn.onclick=function(){
CURRENCIES.forEach(function(c,i){tradeState.holdings[i]+=Math.floor(Math.random()*5)+1;});
saveTrade();v19SFX('currency_gain');v19Toast('화폐 수확 완료!','#4CAF50');
renderTradePanel();document.getElementById('v19-trade').classList.add('on');
};
btns.appendChild(harvestBtn);
wrap.appendChild(btns);
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-trade\').classList.remove(\'on\')">닫기</button>';
}

// ─── 4. 영웅 관계도 (Hero Relationship Web Canvas) ───
var REL_HEROES=[
{name:'환인',icon:'🌅',x:0.5,y:0.1},{name:'환웅',icon:'⚡',x:0.3,y:0.25},{name:'웅녀',icon:'🐻',x:0.7,y:0.25},
{name:'단군',icon:'👑',x:0.5,y:0.4},{name:'해모수',icon:'☀️',x:0.2,y:0.5},{name:'유화',icon:'🌸',x:0.4,y:0.55},
{name:'주몽',icon:'🏹',x:0.3,y:0.7},{name:'온조',icon:'🏯',x:0.15,y:0.85},{name:'비류',icon:'🌊',x:0.45,y:0.85},
{name:'유리',icon:'🎵',x:0.6,y:0.7},{name:'광개토',icon:'🐉',x:0.75,y:0.55},{name:'을지문덕',icon:'🛡️',x:0.85,y:0.7}
];
var REL_LINKS=[
{from:0,to:1,type:'부자',color:'#FFD700'},{from:1,to:2,type:'혼인',color:'#FF5FA2'},{from:1,to:3,type:'부자',color:'#FFD700'},
{from:2,to:3,type:'모자',color:'#FF5FA2'},{from:4,to:5,type:'인연',color:'#FF5FA2'},{from:5,to:6,type:'모자',color:'#FFD700'},
{from:6,to:7,type:'부자',color:'#FFD700'},{from:6,to:8,type:'부자',color:'#FFD700'},{from:6,to:9,type:'부자',color:'#FFD700'},
{from:6,to:10,type:'계승',color:'#5FA0FF'},{from:10,to:11,type:'계승',color:'#5FA0FF'},
{from:3,to:4,type:'계승',color:'#5FA0FF'},{from:7,to:8,type:'경쟁',color:'#FF4444'}
];
var relSelected=-1;

function drawRelationCanvas(canvas){
var ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);
REL_LINKS.forEach(function(l){
var a=REL_HEROES[l.from],b=REL_HEROES[l.to];
var highlight=relSelected===l.from||relSelected===l.to;
ctx.strokeStyle=highlight?l.color:l.color+'44';ctx.lineWidth=highlight?2.5:1;
ctx.setLineDash(l.type==='경쟁'?[4,4]:[]);
ctx.beginPath();ctx.moveTo(a.x*W,a.y*H);ctx.lineTo(b.x*W,b.y*H);ctx.stroke();
ctx.setLineDash([]);
if(highlight){
var mx=(a.x+b.x)/2*W,my=(a.y+b.y)/2*H;
ctx.fillStyle=l.color;ctx.font='8px sans-serif';ctx.textAlign='center';ctx.fillText(l.type,mx,my-4);
}
});
REL_HEROES.forEach(function(h,i){
var x=h.x*W,y=h.y*H;
var isSelected=i===relSelected;
ctx.fillStyle=isSelected?'#2a2a4a':'#1a1428';ctx.strokeStyle=isSelected?'#FFD700':'#5a4a3a';ctx.lineWidth=isSelected?2:1;
ctx.beginPath();ctx.arc(x,y,18,0,Math.PI*2);ctx.fill();ctx.stroke();
if(isSelected){ctx.fillStyle='#FFD70022';ctx.beginPath();ctx.arc(x,y,24,0,Math.PI*2);ctx.fill();}
ctx.fillStyle='#e8dcc8';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.fillText(h.icon,x,y+5);
ctx.fillStyle=isSelected?'#FFD700':'#c4956a';ctx.font=(isSelected?'bold ':'')+' 9px sans-serif';ctx.fillText(h.name,x,y+32);
});
}

function renderRelationPanel(){
var p=makePanel('v19-relation');
p.innerHTML='<h2>🔗 영웅 관계도</h2><p class="v19-sub">한국 고대사 영웅들의 혈연·혼인·계승·경쟁 관계를 탐험하라!</p>';
var wrap=document.createElement('div');wrap.className='relation-wrap';
var canvas=document.createElement('canvas');canvas.width=520;canvas.height=420;
canvas.onclick=function(ev){
var rect=canvas.getBoundingClientRect();var mx=(ev.clientX-rect.left)/rect.width;var my=(ev.clientY-rect.top)/rect.height;
var closest=-1,minD=Infinity;
REL_HEROES.forEach(function(h,i){var d=Math.sqrt((mx-h.x)*(mx-h.x)+(my-h.y)*(my-h.y));if(d<minD&&d<0.08){minD=d;closest=i;}});
if(closest>=0){relSelected=closest;v19SFX('relation_view');renderRelationPanel();document.getElementById('v19-relation').classList.add('on');v19CheckAch('relation_view');}
};
wrap.appendChild(canvas);
drawRelationCanvas(canvas);

var legend=document.createElement('div');legend.className='rel-legend';
[{c:'#FFD700',t:'부자/모자'},{c:'#FF5FA2',t:'혼인/인연'},{c:'#5FA0FF',t:'계승'},{c:'#FF4444',t:'경쟁'}].forEach(function(l){
legend.innerHTML+='<span class="rel-leg"><span class="rel-dot" style="background:'+l.c+'"></span>'+l.t+'</span>';
});
wrap.appendChild(legend);

if(relSelected>=0){
var hero=REL_HEROES[relSelected];
var rels=REL_LINKS.filter(function(l){return l.from===relSelected||l.to===relSelected});
var info=document.createElement('div');info.className='astro-info';
info.innerHTML='<strong>'+hero.icon+' '+hero.name+'</strong><br>관계: '+rels.map(function(l){
var other=l.from===relSelected?REL_HEROES[l.to]:REL_HEROES[l.from];
return other.name+'('+l.type+')';
}).join(', ');
wrap.appendChild(info);
}
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-relation\').classList.remove(\'on\')">닫기</button>';
}

// ─── 5. 수호신 소환 (Guardian Spirit Summoning) ───
var SPIRITS=[
{name:'청룡',icon:'🐲',type:'동방 수호신',buff:'ATK +25%, 동쪽 지형 보너스',cost:100,element:'목'},
{name:'백호',icon:'🐯',type:'서방 수호신',buff:'DEF +25%, 서쪽 지형 보너스',cost:100,element:'금'},
{name:'주작',icon:'🦅',type:'남방 수호신',buff:'SPD +25%, 남쪽 지형 보너스',cost:100,element:'화'},
{name:'현무',icon:'🐢',type:'북방 수호신',buff:'HP +25%, 북쪽 지형 보너스',cost:100,element:'수'},
{name:'기린',icon:'🦄',type:'중앙 수호신',buff:'전체 스탯 +10%, 평화 효과',cost:150,element:'토'},
{name:'봉황',icon:'🕊️',type:'길조의 상징',buff:'치유 +40%, 사기 +20%',cost:120,element:'화'},
{name:'삼족오',icon:'☀️',type:'태양의 새',buff:'원거리 ATK +30%, 시야 +2',cost:130,element:'화'},
{name:'해태',icon:'🦁',type:'정의의 수호자',buff:'법술 DEF +35%, 반사 피해',cost:110,element:'토'}
];
var spiritState={summoned:[],totalSummons:0};

function saveSpirit(){try{localStorage.setItem('krpg_v19_spirit',JSON.stringify(spiritState))}catch(e){}}
function loadSpirit(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_spirit'));if(d)spiritState=d}catch(e){}}

function renderSpiritPanel(){
var p=makePanel('v19-spirit');
p.innerHTML='<h2>🐲 수호신 소환</h2><p class="v19-sub">사신과 영수를 소환하여 전투에서 신비한 힘을 얻어라! (소환: '+spiritState.summoned.length+'/'+SPIRITS.length+')</p>';
var grid=document.createElement('div');grid.className='spirit-grid';

SPIRITS.forEach(function(s,i){
var card=document.createElement('div');card.className='spirit-card'+(spiritState.summoned.indexOf(i)>=0?' summoned':'');
card.innerHTML='<div class="sp-icon">'+s.icon+'</div><div class="sp-name">'+s.name+'</div><div class="sp-type">'+s.type+' ('+s.element+')</div>'
+(spiritState.summoned.indexOf(i)>=0?'<div class="sp-buff">✅ '+s.buff+'</div>':'<div class="sp-buff">'+s.buff+'</div><div class="sp-cost">소환 비용: '+s.cost+' 영력</div>');

if(spiritState.summoned.indexOf(i)<0){
card.onclick=function(){
spiritState.summoned.push(i);spiritState.totalSummons++;saveSpirit();
v19SFX('spirit_summon');v19Toast(s.name+' 소환! '+s.buff,'#aa88ff');
if(spiritState.summoned.length>=1)v19CheckAch('spirit_first');
if(spiritState.summoned.length>=4)v19CheckAch('spirit_four');
if(spiritState.summoned.length>=8)v19CheckAch('spirit_all');
renderSpiritPanel();document.getElementById('v19-spirit').classList.add('on');
};
}
grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-spirit\').classList.remove(\'on\')">닫기</button>';
}

// ─── 6. 민속놀이 미니게임 (Folk Games Mini-games) ───
var FOLK_GAMES=[
{name:'윷놀이',icon:'🎲',desc:'4개의 윷을 던져 말을 움직이는 전통 보드게임',maxScore:0},
{name:'제기차기',icon:'⚽',desc:'제기를 차서 연속으로 올리는 전통놀이',maxScore:0},
{name:'연날리기',icon:'🪁',desc:'바람을 타고 연을 하늘 높이 날리는 놀이',maxScore:0},
{name:'투호',icon:'🏺',desc:'항아리에 화살을 던져 넣는 궁중 놀이',maxScore:0},
{name:'쌍륙',icon:'🎯',desc:'주사위를 굴려 말을 옮기는 고대 전략 게임',maxScore:0},
{name:'바둑',icon:'⚫',desc:'흑백돌로 영역을 차지하는 전략 게임',maxScore:0}
];
var folkState={scores:{},totalPlays:0};

function saveFolk(){try{localStorage.setItem('krpg_v19_folk',JSON.stringify(folkState))}catch(e){}}
function loadFolk(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_folk'));if(d)folkState=d}catch(e){}}

function playFolkGame(idx){
var game=FOLK_GAMES[idx];
var score=Math.floor(Math.random()*80)+20;
var prev=folkState.scores[idx]||0;
if(score>prev)folkState.scores[idx]=score;
folkState.totalPlays++;saveFolk();
v19SFX(score>=70?'folk_win':'folk_play');
v19Toast(game.name+' 점수: '+score+'점'+(score>prev?' (신기록!)':''),score>=70?'#FFD700':'#FF9800');
if(folkState.totalPlays>=1)v19CheckAch('folk_first');
if(folkState.totalPlays>=10)v19CheckAch('folk_master');
renderFolkPanel();document.getElementById('v19-folk').classList.add('on');
}

function renderFolkPanel(){
var p=makePanel('v19-folk');
p.innerHTML='<h2>🎲 민속놀이 미니게임</h2><p class="v19-sub">전통 놀이를 즐기며 휴식을 취하라! (플레이: '+folkState.totalPlays+'회)</p>';
var grid=document.createElement('div');grid.className='folk-grid';

FOLK_GAMES.forEach(function(g,i){
var card=document.createElement('div');card.className='folk-card';
var best=folkState.scores[i]||0;
card.innerHTML='<div class="fk-icon">'+g.icon+'</div><div class="fk-name">'+g.name+'</div><div class="fk-desc">'+g.desc+'</div>'
+'<div class="fk-score">최고: '+best+'점</div>';
card.onclick=function(){playFolkGame(i)};
grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-folk\').classList.remove(\'on\')">닫기</button>';
}

// ─── 7. 역사 퀴즈 대결 (History Quiz Battle) ───
var QB_OPPONENTS=[
{name:'세종대왕',icon:'📚',difficulty:1},{name:'이순신',icon:'⚓',difficulty:2},
{name:'을지문덕',icon:'🛡️',difficulty:3},{name:'광개토대왕',icon:'🐉',difficulty:4},{name:'강감찬',icon:'⚔️',difficulty:5}
];
var QB_QUESTIONS=[
{q:'환웅이 내려온 산은?',a:['태백산','백두산','금강산','한라산'],c:0},
{q:'고조선의 법률은?',a:['팔조법금','대명률','경국대전','삼국유사'],c:0},
{q:'부여의 12월 제천행사는?',a:['영고','동맹','무천','팔관회'],c:0},
{q:'주몽이 세운 나라는?',a:['고구려','백제','신라','가야'],c:0},
{q:'비파형동검의 재질은?',a:['청동','철','금','옥'],c:0},
{q:'삼한의 신성구역은?',a:['소도','서원','태학','국자감'],c:0},
{q:'고조선의 수도는?',a:['아사달','위례성','경주','평양'],c:0},
{q:'위만조선을 세운 위만의 출신은?',a:['연나라','진나라','한나라','초나라'],c:0},
{q:'단군의 어머니는?',a:['웅녀','유화','서왕모','선녀'],c:0},
{q:'고조선의 건국 연도는?',a:['BC 2333','BC 1000','BC 57','BC 37'],c:0}
];
var qbState={wins:{},totalBattles:0};

function saveQB(){try{localStorage.setItem('krpg_v19_qb',JSON.stringify(qbState))}catch(e){}}
function loadQB(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_qb'));if(d)qbState=d}catch(e){}}

var qbCurrent={opponent:-1,round:0,maxRound:5,playerScore:0,aiScore:0,questions:[],answered:false};

function startQBattle(oppIdx){
qbCurrent.opponent=oppIdx;qbCurrent.round=0;qbCurrent.playerScore=0;qbCurrent.aiScore=0;qbCurrent.answered=false;
var shuffled=QB_QUESTIONS.slice().sort(function(){return Math.random()-0.5});
qbCurrent.questions=shuffled.slice(0,5);
qbCurrent.maxRound=5;
nextQBRound();
}

function nextQBRound(){
if(qbCurrent.round>=qbCurrent.maxRound){
var won=qbCurrent.playerScore>qbCurrent.aiScore;
if(won){qbState.wins[qbCurrent.opponent]=(qbState.wins[qbCurrent.opponent]||0)+1;}
qbState.totalBattles++;saveQB();
v19SFX(won?'folk_win':'qbattle_wrong');
v19Toast(won?'🏆 퀴즈 대결 승리!':'💀 퀴즈 대결 패배...',won?'#FFD700':'#FF4444');
if(qbState.totalBattles>=1)v19CheckAch('qbattle_first');
if(Object.keys(qbState.wins).length>=5)v19CheckAch('qbattle_all');
renderQBattlePanel();document.getElementById('v19-qbattle').classList.add('on');
return;
}
qbCurrent.answered=false;
renderQBattleUI();
}

function renderQBattleUI(){
var p=document.getElementById('v19-qbattle');if(!p)return;
var opp=QB_OPPONENTS[qbCurrent.opponent];
var q=qbCurrent.questions[qbCurrent.round];
var area=document.getElementById('qb-area');if(!area)return;
area.innerHTML='';

var vs=document.createElement('div');vs.className='qb-vs';
vs.innerHTML='<div class="qb-player active"><div class="qb-icon">🧑</div><div class="qb-name">플레이어</div><div class="qb-score">'+qbCurrent.playerScore+'</div></div>'
+'<div style="font-size:20px;color:#FF6644;font-weight:900">VS</div>'
+'<div class="qb-player"><div class="qb-icon">'+opp.icon+'</div><div class="qb-name">'+opp.name+'</div><div class="qb-score">'+qbCurrent.aiScore+'</div></div>';
area.appendChild(vs);

var qDiv=document.createElement('div');qDiv.className='qb-question';
qDiv.innerHTML='<div style="font-size:10px;color:#8a7a6a;margin-bottom:6px">라운드 '+(qbCurrent.round+1)+'/'+qbCurrent.maxRound+'</div><div class="qb-q">'+q.q+'</div>';
q.a.forEach(function(a,ai){
var btn=document.createElement('button');btn.className='qb-answer';btn.textContent=a;
btn.onclick=function(){
if(qbCurrent.answered)return;qbCurrent.answered=true;
var correct=ai===q.c;
btn.classList.add(correct?'correct':'wrong');
if(correct){qbCurrent.playerScore++;v19SFX('qbattle_correct');}
else{v19SFX('qbattle_wrong');var btns=qDiv.querySelectorAll('.qb-answer');btns[q.c].classList.add('correct');}
var aiCorrect=Math.random()<(0.8-qbCurrent.opponent*0.05);
if(aiCorrect)qbCurrent.aiScore++;
setTimeout(function(){
var result=document.createElement('div');result.style.cssText='font-size:10px;color:#8a8a6a;margin-top:6px';
result.textContent=(correct?'✅ 정답!':'❌ 오답...')+' | '+opp.name+': '+(aiCorrect?'정답':'오답');
qDiv.appendChild(result);
setTimeout(function(){qbCurrent.round++;nextQBRound()},1200);
},400);
};
qDiv.appendChild(btn);
});
area.appendChild(qDiv);
}

function renderQBattlePanel(){
var p=makePanel('v19-qbattle');
p.innerHTML='<h2>🧠 역사 퀴즈 대결</h2><p class="v19-sub">역사 지식으로 AI 상대와 퀴즈 대결! (총 대결: '+qbState.totalBattles+'회)</p>';
var wrap=document.createElement('div');wrap.className='qbattle-wrap';

var area=document.createElement('div');area.id='qb-area';
var oppGrid=document.createElement('div');oppGrid.style.cssText='display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px;margin:12px auto;max-width:500px';
QB_OPPONENTS.forEach(function(o,i){
var card=document.createElement('div');
card.style.cssText='background:rgba(20,15,30,.9);border:1px solid #3a4a5a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s';
card.innerHTML='<div style="font-size:28px">'+o.icon+'</div><div style="font-size:10px;color:#FFD700;font-weight:700;margin-top:2px">'+o.name+'</div><div style="font-size:8px;color:#8a7a6a">난이도: '+'★'.repeat(o.difficulty)+'</div><div style="font-size:8px;color:#4CAF50;margin-top:2px">승: '+(qbState.wins[i]||0)+'</div>';
card.onmouseenter=function(){card.style.borderColor='#FFD700'};
card.onmouseleave=function(){card.style.borderColor='#3a4a5a'};
card.onclick=function(){startQBattle(i)};
oppGrid.appendChild(card);
});
area.appendChild(oppGrid);
wrap.appendChild(area);
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-qbattle\').classList.remove(\'on\')">닫기</button>';
}

// ─── 8. 병법서 연구실 (Military Strategy Library) ───
var MIL_BOOKS=[
{name:'손자병법',icon:'📕',author:'손무',buff:'전술 전체 +10%',chapters:13,desc:'전쟁의 기본 원리와 전략'},
{name:'오자병법',icon:'📗',author:'오기',buff:'보병 전투력 +15%',chapters:6,desc:'보병 전투 전문서'},
{name:'육도',icon:'📘',author:'태공망',buff:'지휘력 +20%',chapters:6,desc:'문무 겸비의 전략서'},
{name:'삼략',icon:'📙',author:'황석공',buff:'외교 +18%',chapters:3,desc:'상중하 세 가지 전략'},
{name:'사마법',icon:'📓',author:'사마양저',buff:'군율 +22%',chapters:5,desc:'군대 규율과 예법'},
{name:'위료자',icon:'📒',author:'위료',buff:'모략 +15%',chapters:5,desc:'기만과 계략의 병서'},
{name:'이위공문대',icon:'📔',author:'이정',buff:'기병 전투력 +18%',chapters:3,desc:'기마전 전문 대화록'},
{name:'무경총요',icon:'📖',author:'증공량',buff:'공성 +25%',chapters:10,desc:'공성전 백과사전'},
{name:'화랑세기',icon:'📜',author:'김대문',buff:'사기 +20%',chapters:7,desc:'화랑도 정신과 전투 철학'},
{name:'병학지남',icon:'🗞️',author:'유형원',buff:'진형 +22%',chapters:8,desc:'조선 병학의 집대성'},
{name:'무예도보통지',icon:'🗡️',author:'이덕무',buff:'무예 +18%',chapters:4,desc:'24반 무예 기술서'},
{name:'징비록',icon:'📝',author:'류성룡',buff:'방어 전략 +25%',chapters:16,desc:'임진왜란 전쟁 기록'}
];
var milState={study:{},mastered:[]};

function saveMil(){try{localStorage.setItem('krpg_v19_mil',JSON.stringify(milState))}catch(e){}}
function loadMil(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_mil'));if(d)milState=d}catch(e){}}

function renderMilPanel(){
var p=makePanel('v19-mil');
p.innerHTML='<h2>📚 병법서 연구실</h2><p class="v19-sub">고대 병법서를 연구하여 전투 능력을 향상시켜라! (마스터: '+milState.mastered.length+'/'+MIL_BOOKS.length+')</p>';
var grid=document.createElement('div');grid.className='mil-grid';

MIL_BOOKS.forEach(function(b,i){
var card=document.createElement('div');card.className='mil-card'+(milState.mastered.indexOf(i)>=0?' studied':'');
var prog=milState.study[i]||0;
card.innerHTML='<div class="ml-icon">'+b.icon+'</div><div class="ml-name">'+b.name+'</div><div class="ml-author">'+b.author+' | '+b.chapters+'편</div>'
+(milState.mastered.indexOf(i)>=0?'<div class="ml-buff">✅ '+b.buff+'</div>':'<div class="ml-buff">'+b.buff+'</div><div class="ml-prog"><div class="ml-prog-bar" style="width:'+(prog/3*100)+'%"></div></div><div style="font-size:8px;color:#8a7a6a;margin-top:2px">'+prog+'/3회 연구</div>');

if(milState.mastered.indexOf(i)<0){
card.onclick=function(){
milState.study[i]=(milState.study[i]||0)+1;
if(milState.study[i]>=3){
milState.mastered.push(i);v19SFX('mil_master');v19Toast(b.name+' 마스터! '+b.buff,'#FFD700');
if(milState.mastered.length>=1)v19CheckAch('mil_first');
if(milState.mastered.length>=6)v19CheckAch('mil_half');
if(milState.mastered.length>=12)v19CheckAch('mil_all');
}else{v19SFX('mil_study');v19Toast(b.name+' 연구 '+milState.study[i]+'/3','#FF6644');}
saveMil();renderMilPanel();document.getElementById('v19-mil').classList.add('on');
};
}
grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-mil\').classList.remove(\'on\')">닫기</button>';
}

// ─── Quiz v19 (+15 questions, 165→180) ───
var V19_QUIZ=[
{q:'고대 한국인이 왕의 수레로 여긴 별자리는?',a:['북두칠성','오리온','카시오페아','남두육성'],c:0},
{q:'사신(四神) 중 동쪽을 수호하는 신수는?',a:['청룡','백호','주작','현무'],c:0},
{q:'고조선에서 사용한 칼 모양의 화폐는?',a:['명도전','오수전','반량전','엽전'],c:0},
{q:'삼족오(三足烏)는 무엇의 상징인가?',a:['태양','달','별','바람'],c:0},
{q:'해태는 어떤 능력을 가진 신수인가?',a:['선악판별','날씨예측','길흉점','시간여행'],c:0},
{q:'윷놀이에서 가장 높은 점수는?',a:['모','걸','개','도'],c:0},
{q:'투호는 어디에 화살을 던지는 놀이인가?',a:['항아리','과녁','바구니','나무'],c:0},
{q:'손자병법의 저자는?',a:['손무','오기','한비자','공자'],c:0},
{q:'화랑세기의 저자로 알려진 인물은?',a:['김대문','김부식','일연','최치원'],c:0},
{q:'징비록을 쓴 인물은?',a:['류성룡','이순신','권율','곽재우'],c:0},
{q:'고대 천문관측기구 &quot;혼천의&quot;의 용도는?',a:['별자리관측','시간측정','방위측정','지진감지'],c:0},
{q:'봉황은 어떤 상황에 나타난다고 믿었는가?',a:['태평성대','전쟁','기근','홍수'],c:0},
{q:'고대 한국에서 쌍륙은 무엇에 해당하는가?',a:['보드게임','무예','음악','건축'],c:0},
{q:'무예도보통지에 기록된 무예의 수는?',a:['24반','18반','36반','12반'],c:0},
{q:'기린은 어떤 덕목의 상징인가?',a:['인(仁)','의(義)','예(禮)','지(智)'],c:0}
];

function registerV19Quiz(){
try{
var existing=JSON.parse(localStorage.getItem('krpg_quiz_pool'))||[];
var ids=existing.map(function(q){return q.q});
V19_QUIZ.forEach(function(q){if(ids.indexOf(q.q)<0)existing.push(q)});
localStorage.setItem('krpg_quiz_pool',JSON.stringify(existing));
}catch(e){}
if(typeof window.registerQuiz==='function'){window.registerQuiz(V19_QUIZ,'v19');}
}

// ─── Achievements (+12, 108→120) ───
var V19_ACH=[
{id:'astro_first',name:'첫 천문 관측',desc:'별자리 1개 관측'},
{id:'astro_all',name:'천문학자',desc:'모든 별자리 관측 완료'},
{id:'astro_master',name:'천문 예측가',desc:'천문 예측 5회 수행'},
{id:'weather_first',name:'기상 관찰자',desc:'첫 기상 전투 수행'},
{id:'weather_master',name:'기상 달인',desc:'기상 전투 10회 수행'},
{id:'trade_first',name:'첫 교역',desc:'첫 화폐 교역 완료'},
{id:'trade_master',name:'교역왕',desc:'화폐 교역 20회 달성'},
{id:'relation_view',name:'관계 탐험가',desc:'영웅 관계도 탐색'},
{id:'spirit_first',name:'첫 소환',desc:'수호신 1종 소환'},
{id:'spirit_all',name:'만신전',desc:'모든 수호신 소환'},
{id:'folk_first',name:'놀이꾼',desc:'민속놀이 첫 플레이'},
{id:'qbattle_first',name:'퀴즈 도전자',desc:'퀴즈 대결 첫 참가'}
];

var v19AchState=[];
function loadV19Ach(){try{v19AchState=JSON.parse(localStorage.getItem('krpg_v19_ach'))||[]}catch(e){v19AchState=[]}}
function saveV19Ach(){try{localStorage.setItem('krpg_v19_ach',JSON.stringify(v19AchState))}catch(e){}}

function v19CheckAch(id){
if(v19AchState.indexOf(id)>=0)return;
v19AchState.push(id);saveV19Ach();
var a=null;V19_ACH.forEach(function(ac){if(ac.id===id)a=ac});
if(a){v19Toast('🏆 업적 달성: '+a.name,'#FFD700');v19SFX('folk_win');}
try{
var global=JSON.parse(localStorage.getItem('krpg_ach'))||[];
if(global.indexOf('v19_'+id)<0){global.push('v19_'+id);localStorage.setItem('krpg_ach',JSON.stringify(global));}
}catch(e){}
}

// ─── Keyboard Shortcuts (8: Shift+1/2/3/4/5/6/7/8 via Digit keys) ───
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
var map={
'Digit1':['v19-astro',renderAstroPanel],
'Digit2':['v19-weather',renderWeatherPanel],
'Digit3':['v19-trade',renderTradePanel],
'Digit4':['v19-relation',renderRelationPanel],
'Digit5':['v19-spirit',renderSpiritPanel],
'Digit6':['v19-folk',renderFolkPanel],
'Digit7':['v19-qbattle',renderQBattlePanel],
'Digit8':['v19-mil',renderMilPanel]
};
if(map[e.code]){
e.preventDefault();var id=map[e.code][0],fn=map[e.code][1];
var el=document.getElementById(id);
if(el&&el.classList.contains('on')){el.classList.remove('on');}
else{fn();document.getElementById(id).classList.add('on');}
}
});

// ─── Quick Action Nav Bar (v19) ───
function addV19NavBar(){
var existing=document.getElementById('v19-nav-bar');
if(existing)existing.remove();
var bar=document.createElement('div');
bar.id='v19-nav-bar';
bar.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:127;display:flex;gap:0;overflow-x:auto;background:rgba(10,6,8,.95);border-top:1px solid #3a3a4a;padding:4px 8px;-webkit-overflow-scrolling:touch;scrollbar-width:none';

var actions=[
{label:'🌌',title:'천문관',fn:function(){renderAstroPanel();document.getElementById('v19-astro').classList.add('on')}},
{label:'🌤️',title:'기상',fn:function(){renderWeatherPanel();document.getElementById('v19-weather').classList.add('on')}},
{label:'💰',title:'교역소',fn:function(){renderTradePanel();document.getElementById('v19-trade').classList.add('on')}},
{label:'🔗',title:'관계도',fn:function(){renderRelationPanel();document.getElementById('v19-relation').classList.add('on')}},
{label:'🐲',title:'소환',fn:function(){renderSpiritPanel();document.getElementById('v19-spirit').classList.add('on')}},
{label:'🎲',title:'민속놀이',fn:function(){renderFolkPanel();document.getElementById('v19-folk').classList.add('on')}},
{label:'🧠',title:'퀴즈대결',fn:function(){renderQBattlePanel();document.getElementById('v19-qbattle').classList.add('on')}},
{label:'📚',title:'병법서',fn:function(){renderMilPanel();document.getElementById('v19-mil').classList.add('on')}}
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
function v19Init(){
loadAstro();loadWeather();loadTrade();loadSpirit();loadFolk();loadQB();loadMil();loadV19Ach();registerV19Quiz();
setTimeout(addV19NavBar,2800);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',v19Init);}
else{v19Init();}

window._v19={
CONSTELLATIONS:CONSTELLATIONS,WEATHERS:WEATHERS,CURRENCIES:CURRENCIES,REL_HEROES:REL_HEROES,
SPIRITS:SPIRITS,FOLK_GAMES:FOLK_GAMES,QB_OPPONENTS:QB_OPPONENTS,MIL_BOOKS:MIL_BOOKS,
V19_QUIZ:V19_QUIZ,V19_ACH:V19_ACH,v19SFX:v19SFX
};
})();
