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

'.bond-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.bond-wrap canvas{border:2px solid #5a3a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.bond-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;max-width:560px;margin:8px auto}',
'.bond-card{background:linear-gradient(135deg,rgba(30,20,40,.95),rgba(20,15,30,.98));border:2px solid #4a3a5a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.bond-card:hover{border-color:#FF5FA2;transform:translateY(-2px)}',
'.bond-card .bc-icon{font-size:28px}',
'.bond-card .bc-name{font-size:11px;color:#FFD700;font-weight:700;margin-top:2px}',
'.bond-card .bc-lv{font-size:9px;color:#FF5FA2;margin-top:2px}',
'.bond-prog{height:4px;background:#1a1a2e;border-radius:2px;overflow:hidden;margin-top:4px}',
'.bond-prog-bar{height:100%;background:linear-gradient(90deg,#FF5FA2,#FFD700);border-radius:2px;transition:width .5s}',

'.council-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.council-wrap canvas{border:2px solid #4a5a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.council-advisors{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.ca-card{background:rgba(20,25,15,.9);border:2px solid #4a5a3a;border-radius:10px;padding:10px;text-align:center;min-width:100px;cursor:pointer;transition:all .3s}',
'.ca-card:hover{border-color:#4CAF50}',
'.ca-card.selected{border-color:#FFD700;background:rgba(40,35,10,.9)}',
'.ca-card .ca-icon{font-size:24px}',
'.ca-card .ca-name{font-size:10px;color:#4CAF50;font-weight:700;margin-top:2px}',
'.ca-card .ca-role{font-size:8px;color:#8a8a6a;margin-top:1px}',
'.council-plan{max-width:400px;margin:8px auto;background:rgba(10,15,10,.8);border:1px solid #3a4a3a;border-radius:8px;padding:12px;text-align:left;font-size:10px;color:#c4dcc4;line-height:1.8}',
'.council-plan strong{color:#FFD700}',

'.replay-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.replay-wrap canvas{border:2px solid #3a4a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.replay-timeline{display:flex;gap:4px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.rt-turn{padding:4px 8px;border:1px solid #3a4a5a;border-radius:4px;background:#1a1a2a;color:#8a8aaa;font-size:9px;cursor:pointer;transition:all .2s}',
'.rt-turn:hover{border-color:#5FA0FF}',
'.rt-turn.active{border-color:#5FA0FF;background:#1a2a3a;color:#00E5FF}',
'.replay-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:400px;margin:8px auto}',
'.rs-item{background:rgba(15,20,30,.9);border:1px solid #3a3a5a;border-radius:8px;padding:8px;text-align:center}',
'.rs-item .rs-val{font-size:18px;color:#FFD700;font-weight:700}',
'.rs-item .rs-label{font-size:8px;color:#8a8aaa;margin-top:2px}',

'.age-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.age-wrap canvas{border:2px solid #5a4a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.age-cards{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.age-card{background:linear-gradient(135deg,rgba(30,25,10,.95),rgba(20,15,5,.98));border:2px solid #5a4a2a;border-radius:10px;padding:12px;text-align:center;min-width:90px;cursor:pointer;transition:all .3s}',
'.age-card:hover{border-color:#FFD700}',
'.age-card.current{border-color:#FFD700;box-shadow:0 0 12px rgba(255,215,0,.3)}',
'.age-card.locked{opacity:.4;cursor:not-allowed}',
'.age-card .ac-icon{font-size:28px}',
'.age-card .ac-name{font-size:10px;color:#FFD700;font-weight:700;margin-top:2px}',
'.age-card .ac-era{font-size:8px;color:#8a7a5a;margin-top:1px}',

'.spy-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.spy-wrap canvas{border:2px solid #3a3a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.spy-missions{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;max-width:560px;margin:8px auto}',
'.sm-card{background:linear-gradient(135deg,rgba(15,15,30,.95),rgba(10,10,20,.98));border:2px solid #3a3a5a;border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:all .3s}',
'.sm-card:hover{border-color:#aa88ff;transform:translateY(-2px)}',
'.sm-card.done{border-color:#4CAF50;opacity:.7}',
'.sm-card .sm-icon{font-size:24px}',
'.sm-card .sm-name{font-size:10px;color:#aa88ff;font-weight:700;margin-top:2px}',
'.sm-card .sm-risk{font-size:8px;color:#FF6644;margin-top:2px}',
'.sm-card .sm-reward{font-size:8px;color:#4CAF50;margin-top:2px}',

'.glyph-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.glyph-wrap canvas{border:2px solid #5a4a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.glyph-input{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.gi-btn{padding:6px 14px;border:1px solid #5a4a3a;border-radius:6px;background:#1a1a14;color:#e8dcc8;font-size:12px;cursor:pointer;font-family:inherit;min-width:40px;transition:all .2s}',
'.gi-btn:hover{border-color:#FFD700;background:#2a2a1a}',
'.gi-btn.correct{border-color:#4CAF50;background:#1a3a1a;color:#4CAF50}',
'.gi-btn.wrong{border-color:#FF4444;background:#3a1a1a;color:#FF4444}',
'.glyph-score{font-size:12px;color:#c4956a;margin:8px 0}',

'.calendar-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.calendar-wrap canvas{border:2px solid #3a5a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.cal-events{max-width:400px;margin:8px auto;background:rgba(10,20,10,.8);border:1px solid #3a4a3a;border-radius:8px;padding:10px;text-align:left;font-size:10px;line-height:1.8}',
'.cal-events strong{color:#4CAF50}',
'.cal-season-btns{display:flex;gap:6px;justify-content:center;margin:8px 0}',
'.csb{padding:6px 14px;border:1px solid #3a5a3a;border-radius:6px;background:#1a1a14;color:#e8dcc8;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.csb:hover{border-color:#4CAF50}',
'.csb.active{border-color:#4CAF50;background:#1a2a1a;color:#4CAF50}',

'.decree-wrap{max-width:560px;margin:0 auto}',
'.decree-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;max-width:560px;margin:0 auto}',
'.dec-card{background:linear-gradient(135deg,rgba(30,25,15,.95),rgba(25,20,10,.98));border:2px solid #6a5a3a;border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:all .3s}',
'.dec-card:hover{border-color:#FFD700;transform:translateY(-2px)}',
'.dec-card.issued{border-color:#4CAF50;opacity:.7}',
'.dec-card .dc-icon{font-size:24px}',
'.dec-card .dc-name{font-size:11px;color:#FFD700;font-weight:700;margin-top:2px}',
'.dec-card .dc-desc{font-size:8px;color:#8a7a5a;margin-top:2px;line-height:1.5}',
'.dec-card .dc-effect{font-size:8px;color:#4CAF50;margin-top:4px}'
].join('\n');
document.head.appendChild(css);

function v19Toast(msg,c){var t=document.createElement('div');t.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:'+(c||'#c4956a')+'22;color:'+(c||'#c4956a')+';border:1px solid '+(c||'#c4956a')+'44;padding:10px 20px;border-radius:12px;font-size:12px;font-weight:700;z-index:200;pointer-events:none;animation:fadeIn .3s ease';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.remove()},2000)}

var actx;function v19SFX(type){try{if(!actx)actx=new(window.AudioContext||window.webkitAudioContext)();var o=actx.createOscillator(),g=actx.createGain();o.connect(g);g.connect(actx.destination);var f={bond_up:440,bond_max:880,council_plan:330,council_done:523,replay_view:294,replay_turn:349,age_advance:660,age_research:392,spy_send:220,spy_success:523,glyph_correct:440,glyph_wrong:165,calendar_ritual:349,calendar_season:262,decree_issue:392,decree_effect:523};o.frequency.value=f[type]||330;o.type=({spy_send:'sawtooth',glyph_wrong:'square',age_advance:'triangle'})[type]||'sine';g.gain.value=0.12;o.start();g.gain.exponentialRampToValueAtTime(0.001,actx.currentTime+0.3);o.stop(actx.currentTime+0.3)}catch(e){}}

function makePanel(id){var existing=document.getElementById(id);if(existing)existing.remove();var p=document.createElement('div');p.id=id;p.className='v19-panel';document.body.appendChild(p);return p}

// ─── 1. 영웅 인연 관계도 (Hero Bond Canvas) ───
var BOND_HEROES=[
{name:'환웅',icon:'⚡',bonds:{1:0,4:0,5:0}},
{name:'단군',icon:'👑',bonds:{0:0,4:0}},
{name:'주몽',icon:'🏹',bonds:{3:0,9:0}},
{name:'해모수',icon:'☀️',bonds:{2:0,4:0}},
{name:'유화',icon:'🌸',bonds:{0:0,1:0,3:0}},
{name:'을지문덕',icon:'🛡️',bonds:{7:0}},
{name:'연개소문',icon:'🗡️',bonds:{7:0,8:0}},
{name:'김유신',icon:'⚔️',bonds:{5:0,6:0}},
{name:'광개토대왕',icon:'🐉',bonds:{6:0,9:0}},
{name:'온조',icon:'🏯',bonds:{2:0,10:0,11:0}},
{name:'비류',icon:'🌊',bonds:{9:0}},
{name:'유리',icon:'🎵',bonds:{2:0,9:0}}
];
var bondState={levels:{},interactions:0};

function saveBond(){try{localStorage.setItem('krpg_v19_bond',JSON.stringify(bondState))}catch(e){}}
function loadBond(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_bond'));if(d)bondState=d}catch(e){}}

function drawBondCanvas(canvas){
var ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a1e';ctx.fillRect(0,0,W,H);
var cx=W/2,cy=H/2,r=Math.min(W,H)*0.36;
BOND_HEROES.forEach(function(h,i){
var angle=-Math.PI/2+i*(2*Math.PI/BOND_HEROES.length);
var x=cx+r*Math.cos(angle),y=cy+r*Math.sin(angle);
h._x=x;h._y=y;
});
BOND_HEROES.forEach(function(h,i){
Object.keys(h.bonds).forEach(function(k){
var j=parseInt(k);if(j<=i)return;
var lv=getBondLevel(i,j);
var alpha=0.15+lv*0.15;
ctx.strokeStyle='rgba(255,95,162,'+Math.min(alpha,0.8)+')';
ctx.lineWidth=1+lv*0.5;
ctx.beginPath();ctx.moveTo(h._x,h._y);ctx.lineTo(BOND_HEROES[j]._x,BOND_HEROES[j]._y);ctx.stroke();
if(lv>0){
var mx=(h._x+BOND_HEROES[j]._x)/2,my=(h._y+BOND_HEROES[j]._y)/2;
ctx.fillStyle='#FF5FA2';ctx.font='8px sans-serif';ctx.textAlign='center';
var hearts='';for(var hh=0;hh<Math.min(lv,5);hh++)hearts+='♥';
ctx.fillText(hearts,mx,my-4);
}
});
});
BOND_HEROES.forEach(function(h,i){
ctx.fillStyle='rgba(20,15,30,.9)';ctx.beginPath();ctx.arc(h._x,h._y,20,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='#5a3a5a';ctx.lineWidth=2;ctx.stroke();
ctx.fillStyle='#e8dcc8';ctx.font='16px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(h.icon,h._x,h._y);
ctx.fillStyle='#FFD700';ctx.font='bold 8px sans-serif';ctx.textBaseline='top';
ctx.fillText(h.name,h._x,h._y+22);
});
ctx.fillStyle='#c4956a';ctx.font='11px sans-serif';ctx.textAlign='center';ctx.textBaseline='bottom';
ctx.fillText('❤️ 영웅 인연 관계도 (교류: '+bondState.interactions+'회)',W/2,H-6);
}

function getBondLevel(i,j){
var key=Math.min(i,j)+'_'+Math.max(i,j);
return bondState.levels[key]||0;
}

function increaseBond(i,j){
var key=Math.min(i,j)+'_'+Math.max(i,j);
bondState.levels[key]=(bondState.levels[key]||0)+1;
bondState.interactions++;
saveBond();
}

function renderBondPanel(){
var p=makePanel('v19-bond');
p.innerHTML='<h2>❤️ 영웅 인연 관계도</h2><p class="v19-sub">영웅들 사이의 인연을 깊게 하여 특별 합공 버프를 해금하라!</p>';
var wrap=document.createElement('div');wrap.className='bond-wrap';
var canvas=document.createElement('canvas');canvas.width=480;canvas.height=400;
wrap.appendChild(canvas);
drawBondCanvas(canvas);
var cards=document.createElement('div');cards.className='bond-cards';
BOND_HEROES.forEach(function(h,i){
var card=document.createElement('div');card.className='bond-card';
var totalLv=0;Object.keys(h.bonds).forEach(function(k){totalLv+=getBondLevel(i,parseInt(k))});
card.innerHTML='<div class="bc-icon">'+h.icon+'</div><div class="bc-name">'+h.name+'</div><div class="bc-lv">♥ 총 인연: '+totalLv+'</div><div class="bond-prog"><div class="bond-prog-bar" style="width:'+Math.min(100,totalLv*20)+'%"></div></div>';
card.onclick=function(){
var keys=Object.keys(h.bonds);
if(keys.length>0){
var target=parseInt(keys[Math.floor(Math.random()*keys.length)]);
increaseBond(i,target);
v19SFX('bond_up');
v19Toast(h.name+' ♥ '+BOND_HEROES[target].name+' 인연 상승!','#FF5FA2');
if(getBondLevel(i,target)>=5){v19SFX('bond_max');v19CheckAch('bond_max');}
if(bondState.interactions>=1)v19CheckAch('bond_first');
if(bondState.interactions>=20)v19CheckAch('bond_master');
renderBondPanel();document.getElementById('v19-bond').classList.add('on');
}
};
cards.appendChild(card);
});
wrap.appendChild(cards);
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-bond\').classList.remove(\'on\')">닫기</button>';
}

// ─── 2. 전쟁 전야 회의실 (War Council Canvas) ───
var ADVISORS=[
{name:'풍백',icon:'🌬️',role:'군사 참모',advice:'측면 기습으로 적의 보급로를 차단하십시오.',buff:'공격+15%'},
{name:'우사',icon:'🌧️',role:'방어 참모',advice:'비가 오면 궁병의 명중률이 떨어집니다. 방어 진형을 권합니다.',buff:'방어+20%'},
{name:'운사',icon:'☁️',role:'병참 참모',advice:'보급선을 확보하고 장기전에 대비하십시오.',buff:'보급+25%'},
{name:'단군',icon:'👑',role:'왕',advice:'백성의 묵시적 지지가 승리의 열쇠입니다.',buff:'사기+30%'},
{name:'주몬',icon:'🏹',role:'선봉장',advice:'고지를 선점하고 궁병으로 제압하십시오.',buff:'명중+20%'}
];
var councilState={plans:[],selectedAdvisor:-1,sessions:0};

function saveCouncil(){try{localStorage.setItem('krpg_v19_council',JSON.stringify(councilState))}catch(e){}}
function loadCouncil(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_council'));if(d)councilState=d}catch(e){}}

function drawCouncilCanvas(canvas){
var ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#1a1a0a';ctx.beginPath();
ctx.ellipse(W/2,H*0.55,W*0.38,H*0.25,0,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='#4a3a2a';ctx.lineWidth=3;ctx.stroke();
ctx.fillStyle='#2a2a1a';ctx.fillRect(W*0.2,H*0.35,W*0.6,H*0.05);
ctx.fillStyle='#3a2a1a';ctx.fillRect(W*0.25,H*0.32,W*0.5,H*0.04);
ADVISORS.forEach(function(a,i){
var angle=-Math.PI*0.8+i*(Math.PI*0.4);
var x=W/2+W*0.3*Math.cos(angle),y=H*0.55+H*0.2*Math.sin(angle);
ctx.fillStyle=councilState.selectedAdvisor===i?'rgba(255,215,0,.2)':'rgba(20,25,15,.8)';
ctx.beginPath();ctx.arc(x,y,18,0,Math.PI*2);ctx.fill();
ctx.strokeStyle=councilState.selectedAdvisor===i?'#FFD700':'#4a5a3a';
ctx.lineWidth=2;ctx.stroke();
ctx.fillStyle='#e8dcc8';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(a.icon,x,y);
ctx.fillStyle='#c4956a';ctx.font='8px sans-serif';ctx.textBaseline='top';
ctx.fillText(a.name,x,y+20);
});
ctx.fillStyle='#FFD700';ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.textBaseline='top';
ctx.fillText('⚔️ 전쟁 전야 회의실',W/2,H*0.06);
ctx.fillStyle='#8a7a6a';ctx.font='9px sans-serif';
ctx.fillText('회의 횟수: '+councilState.sessions,W/2,H*0.92);
}

function renderCouncilPanel(){
var p=makePanel('v19-council');
p.innerHTML='<h2>⚔️ 전쟁 전야 회의실</h2><p class="v19-sub">참모의 조언을 듣고 전투 전략을 수립하라! (회의: '+councilState.sessions+'회)</p>';
var wrap=document.createElement('div');wrap.className='council-wrap';
var canvas=document.createElement('canvas');canvas.width=520;canvas.height=320;
wrap.appendChild(canvas);
drawCouncilCanvas(canvas);
var advisors=document.createElement('div');advisors.className='council-advisors';
ADVISORS.forEach(function(a,i){
var card=document.createElement('div');card.className='ca-card'+(councilState.selectedAdvisor===i?' selected':'');
card.innerHTML='<div class="ca-icon">'+a.icon+'</div><div class="ca-name">'+a.name+'</div><div class="ca-role">'+a.role+'</div>';
card.onclick=function(){
councilState.selectedAdvisor=i;
renderCouncilPanel();document.getElementById('v19-council').classList.add('on');
};
advisors.appendChild(card);
});
wrap.appendChild(advisors);

if(councilState.selectedAdvisor>=0){
var a=ADVISORS[councilState.selectedAdvisor];
var plan=document.createElement('div');plan.className='council-plan';
plan.innerHTML='<strong>'+a.icon+' '+a.name+' ('+a.role+')</strong><br><br>「'+a.advice+'」<br><br>→ 전투 버프: <strong>'+a.buff+'</strong>';
wrap.appendChild(plan);
var applyBtn=document.createElement('button');applyBtn.className='da-btn';applyBtn.style.cssText='display:block;margin:10px auto;padding:8px 24px';
applyBtn.textContent='✅ 전략 채택';
applyBtn.onclick=function(){
councilState.sessions++;councilState.plans.push(councilState.selectedAdvisor);
councilState.selectedAdvisor=-1;
v19SFX('council_done');v19Toast('전략 채택! '+a.buff+' 적용','#4CAF50');
if(councilState.sessions>=1)v19CheckAch('council_first');
if(councilState.sessions>=10)v19CheckAch('council_master');
saveCouncil();renderCouncilPanel();document.getElementById('v19-council').classList.add('on');
};
wrap.appendChild(applyBtn);
}
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-council\').classList.remove(\'on\')">닫기</button>';
}

// ─── 3. 전투 리플레이 분석 (Battle Replay Canvas) ───
var replayState={battles:[],currentBattle:-1,viewing:0};
function saveReplay(){try{localStorage.setItem('krpg_v19_replay',JSON.stringify(replayState))}catch(e){}}
function loadReplay(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_replay'));if(d)replayState=d}catch(e){}}

function generateSampleBattles(){
if(replayState.battles.length>0)return;
var names=['환웅의 강림','아사달 공방전','범족 토벌','살수대첩','왕검성 공방'];
for(var i=0;i<5;i++){
var turns=[];var tc=5+Math.floor(Math.random()*8);
for(var t=0;t<tc;t++){
turns.push({
turn:t+1,
allyHP:Math.max(10,100-t*Math.floor(Math.random()*12)),
enemyHP:Math.max(0,100-t*Math.floor(Math.random()*15)-5),
action:['attack','skill','defend','move'][Math.floor(Math.random()*4)],
dmg:Math.floor(Math.random()*25)+5
});
}
replayState.battles.push({name:names[i],turns:turns,result:turns[turns.length-1].enemyHP<=0?'win':'loss',totalDmg:turns.reduce(function(s,t){return s+t.dmg},0),maxCombo:Math.floor(Math.random()*5)+1});
}
saveReplay();
}

function drawReplayCanvas(canvas){
var ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a1e';ctx.fillRect(0,0,W,H);
if(replayState.currentBattle<0||!replayState.battles[replayState.currentBattle])return;
var b=replayState.battles[replayState.currentBattle];
var turns=b.turns;
ctx.strokeStyle='#2a2a3a';ctx.lineWidth=0.5;
for(var i=0;i<=5;i++){var y=H*0.1+i*(H*0.7/5);ctx.beginPath();ctx.moveTo(W*0.08,y);ctx.lineTo(W*0.92,y);ctx.stroke();}
ctx.strokeStyle='#4CAF50';ctx.lineWidth=2;ctx.beginPath();
turns.forEach(function(t,i){
var x=W*0.08+i*(W*0.84/(turns.length-1||1));
var y=H*0.1+(1-t.allyHP/100)*(H*0.7);
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
});
ctx.stroke();
ctx.strokeStyle='#FF6644';ctx.lineWidth=2;ctx.beginPath();
turns.forEach(function(t,i){
var x=W*0.08+i*(W*0.84/(turns.length-1||1));
var y=H*0.1+(1-t.enemyHP/100)*(H*0.7);
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
});
ctx.stroke();
if(replayState.viewing<turns.length){
var vt=turns[replayState.viewing];
var vx=W*0.08+replayState.viewing*(W*0.84/(turns.length-1||1));
ctx.strokeStyle='#FFD70088';ctx.lineWidth=1;ctx.setLineDash([4,4]);
ctx.beginPath();ctx.moveTo(vx,H*0.05);ctx.lineTo(vx,H*0.85);ctx.stroke();
ctx.setLineDash([]);
}
ctx.fillStyle='#4CAF50';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText('● 아군 HP',W*0.1,H*0.92);
ctx.fillStyle='#FF6644';ctx.fillText('● 적군 HP',W*0.3,H*0.92);
ctx.fillStyle='#FFD700';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
ctx.fillText(b.name+' ('+(b.result==='win'?'승리':'패배')+')',W/2,H*0.04);
}

function renderReplayPanel(){
var p=makePanel('v19-replay');
generateSampleBattles();
p.innerHTML='<h2>📊 전투 리플레이 분석</h2><p class="v19-sub">과거 전투를 다시 보며 전략적 인사이트를 얻어라!</p>';
var wrap=document.createElement('div');wrap.className='replay-wrap';

var btns=document.createElement('div');btns.style.cssText='display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:8px';
replayState.battles.forEach(function(b,i){
var btn=document.createElement('button');btn.className='da-btn'+(replayState.currentBattle===i?' selected':'');
btn.style.cssText=replayState.currentBattle===i?'border-color:#5FA0FF;color:#00E5FF':'';
btn.textContent=(b.result==='win'?'🏆':'💀')+' '+b.name;
btn.onclick=function(){replayState.currentBattle=i;replayState.viewing=0;v19SFX('replay_view');
if(i>=0)v19CheckAch('replay_first');
renderReplayPanel();document.getElementById('v19-replay').classList.add('on');};
btns.appendChild(btn);
});
wrap.appendChild(btns);

var canvas=document.createElement('canvas');canvas.width=520;canvas.height=280;
wrap.appendChild(canvas);
if(replayState.currentBattle>=0)drawReplayCanvas(canvas);

if(replayState.currentBattle>=0){
var b=replayState.battles[replayState.currentBattle];
var timeline=document.createElement('div');timeline.className='replay-timeline';
b.turns.forEach(function(t,i){
var tb=document.createElement('button');tb.className='rt-turn'+(replayState.viewing===i?' active':'');
tb.textContent='T'+t.turn;
tb.onclick=function(){replayState.viewing=i;v19SFX('replay_turn');renderReplayPanel();document.getElementById('v19-replay').classList.add('on');};
timeline.appendChild(tb);
});
wrap.appendChild(timeline);

var stats=document.createElement('div');stats.className='replay-stats';
stats.innerHTML='<div class="rs-item"><div class="rs-val">'+b.totalDmg+'</div><div class="rs-label">총 피해</div></div><div class="rs-item"><div class="rs-val">'+b.turns.length+'</div><div class="rs-label">총 턴</div></div><div class="rs-item"><div class="rs-val">'+b.maxCombo+'</div><div class="rs-label">최고 콤보</div></div>';
wrap.appendChild(stats);
if(replayState.viewing<b.turns.length){
var vt=b.turns[replayState.viewing];
var info=document.createElement('div');info.style.cssText='font-size:10px;color:#8a8aaa;margin-top:6px';
info.textContent='T'+vt.turn+': '+{attack:'⚔️ 공격',skill:'✨ 스킬',defend:'🛡️ 방어',move:'👣 이동'}[vt.action]+' | 피해: '+vt.dmg+' | 아군HP: '+vt.allyHP+'% | 적HP: '+vt.enemyHP+'%';
wrap.appendChild(info);
}
}
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-replay\').classList.remove(\'on\')">닫기</button>';
}

// ─── 4. 시대 발전기 (Age Advancement Canvas) ───
var AGES=[
{name:'신석기',icon:'🪨',era:'BC 8000~',req:0,buff:'기본 채집',desc:'돌도끼와 채집으로 생활하는 시대'},
{name:'청동기',icon:'🔱',era:'BC 1500~',req:100,buff:'공격+10%',desc:'청동 무기와 비파형동검 제작'},
{name:'철기시대',icon:'⚔️',era:'BC 400~',req:300,buff:'공격+20%, 방어+10%',desc:'철제 무기와 농기구의 혁명'},
{name:'국가형성기',icon:'🏛️',era:'BC 200~',req:600,buff:'외교+15%, 무역+20%',desc:'고조선의 중앙집권화와 법률 정비'},
{name:'전성기',icon:'👑',era:'BC 100~',req:1000,buff:'전체+15%',desc:'광개토대왕의 영토 확장 시대'},
{name:'문화융성기',icon:'🌟',era:'AD 100~',req:1500,buff:'문화+30%, 공격+10%',desc:'삼국의 문화적 융성과 국제 교류'}
];
var ageState={current:0,research:0,advanced:0};

function saveAge(){try{localStorage.setItem('krpg_v19_age',JSON.stringify(ageState))}catch(e){}}
function loadAge(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_age'));if(d)ageState=d}catch(e){}}

function drawAgeCanvas(canvas){
var ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,W,H);
var barY=H*0.4,barH=30;
ctx.fillStyle='#1a1a2e';ctx.fillRect(W*0.05,barY,W*0.9,barH);
AGES.forEach(function(a,i){
var x=W*0.05+i*(W*0.9/(AGES.length-1));
ctx.fillStyle=i<=ageState.current?'#FFD700':'#3a3a4a';
ctx.beginPath();ctx.arc(x,barY+barH/2,12,0,Math.PI*2);ctx.fill();
if(i<=ageState.current){ctx.strokeStyle='#FFD700';ctx.lineWidth=2;ctx.stroke();}
ctx.fillStyle='#e8dcc8';ctx.font='12px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(a.icon,x,barY+barH/2);
ctx.fillStyle=i<=ageState.current?'#FFD700':'#5a5a6a';ctx.font='8px sans-serif';ctx.textBaseline='top';
ctx.fillText(a.name,x,barY+barH+6);
});
if(ageState.current<AGES.length-1){
var next=AGES[ageState.current+1];
var pct=ageState.research/next.req;
ctx.fillStyle='#2a2a3a';ctx.fillRect(W*0.15,H*0.7,W*0.7,12);
ctx.fillStyle='#FFD700';ctx.fillRect(W*0.15,H*0.7,W*0.7*Math.min(1,pct),12);
ctx.strokeStyle='#5a4a2a';ctx.strokeRect(W*0.15,H*0.7,W*0.7,12);
ctx.fillStyle='#e8dcc8';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.textBaseline='top';
ctx.fillText('다음 시대: '+next.name+' ('+ageState.research+'/'+next.req+')',W/2,H*0.75);
}
ctx.fillStyle='#c4956a';ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.textBaseline='top';
ctx.fillText('현재 시대: '+AGES[ageState.current].name+' ('+AGES[ageState.current].era+')',W/2,H*0.08);
ctx.fillStyle='#8a7a6a';ctx.font='9px sans-serif';
ctx.fillText('버프: '+AGES[ageState.current].buff,W/2,H*0.18);
}

function renderAgePanel(){
var p=makePanel('v19-age');
p.innerHTML='<h2>🏛️ 시대 발전기</h2><p class="v19-sub">연구를 통해 다음 시대로 발전하라! (현재: '+AGES[ageState.current].name+')</p>';
var wrap=document.createElement('div');wrap.className='age-wrap';
var canvas=document.createElement('canvas');canvas.width=520;canvas.height=260;
wrap.appendChild(canvas);
drawAgeCanvas(canvas);
var cards=document.createElement('div');cards.className='age-cards';
AGES.forEach(function(a,i){
var card=document.createElement('div');card.className='age-card'+(i===ageState.current?' current':'')+(i>ageState.current+1?' locked':'');
card.innerHTML='<div class="ac-icon">'+a.icon+'</div><div class="ac-name">'+a.name+'</div><div class="ac-era">'+a.era+'</div>';
cards.appendChild(card);
});
wrap.appendChild(cards);
var resBtn=document.createElement('button');resBtn.className='da-btn';resBtn.style.cssText='display:block;margin:10px auto;padding:10px 30px;font-size:13px';
resBtn.textContent='🔬 연구 (+50)';
resBtn.disabled=ageState.current>=AGES.length-1;
resBtn.onclick=function(){
ageState.research+=50;v19SFX('age_research');
if(ageState.current<AGES.length-1&&ageState.research>=AGES[ageState.current+1].req){
ageState.current++;ageState.research=0;ageState.advanced++;
v19SFX('age_advance');v19Toast('🏛️ '+AGES[ageState.current].name+' 시대 도래!','#FFD700');
if(ageState.advanced>=1)v19CheckAch('age_first');
if(ageState.current>=5)v19CheckAch('age_max');
}else{v19Toast('연구 진행: '+ageState.research+'/'+AGES[ageState.current+1].req,'#FFD700');}
saveAge();renderAgePanel();document.getElementById('v19-age').classList.add('on');
};
wrap.appendChild(resBtn);
var info=document.createElement('div');info.style.cssText='font-size:10px;color:#8a7a6a;text-align:center;margin-top:8px';
info.textContent=AGES[ageState.current].desc;
wrap.appendChild(info);
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-age\').classList.remove(\'on\')">닫기</button>';
}

// ─── 5. 첩보 네트워크 (Spy Network Canvas) ───
var SPY_MISSIONS=[
{name:'적진 정찰',icon:'🔍',risk:20,reward:'적 병력 확인',intel:30,desc:'적 진영의 병력 배치를 파악'},
{name:'보급로 교란',icon:'📦',risk:35,reward:'적 보급 -20%',intel:25,desc:'적의 보급선을 혼란에 빠트린다'},
{name:'이간접 포섭',icon:'🤝',risk:40,reward:'적 관70 포섭',intel:40,desc:'적의 첩자를 역으로 포섭한다'},
{name:'문서 탈취',icon:'📜',risk:50,reward:'적 작전계획 확보',intel:50,desc:'적의 기밀 문서를 빼낸다'},
{name:'요인 암살',icon:'🗡️',risk:70,reward:'적 장수 제거',intel:60,desc:'적의 핵심 장수를 제거한다'},
{name:'선전포고',icon:'📣',risk:15,reward:'적 사기 -15%',intel:20,desc:'적진에 선전포고문을 믿린다'},
{name:'매복 정보',icon:'🌲',risk:30,reward:'매복 발각 +40%',intel:35,desc:'적의 매복 지점을 사전 파악'},
{name:'내부 반란 선동',icon:'🔥',risk:60,reward:'적 병력 분열',intel:55,desc:'적 내부의 불만 세력을 선동'}
];
var spyState={completed:[],intel:0,agents:3};

function saveSpy(){try{localStorage.setItem('krpg_v19_spy',JSON.stringify(spyState))}catch(e){}}
function loadSpy(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_spy'));if(d)spyState=d}catch(e){}}

function drawSpyCanvas(canvas){
var ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a1e';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#aa88ff';ctx.font='bold 12px sans-serif';ctx.textAlign='center';
ctx.fillText('🕵️ 첩보 네트워크',W/2,20);
var cx=W/2,cy=H/2;
ctx.fillStyle='rgba(170,136,255,.1)';ctx.beginPath();ctx.arc(cx,cy,H*0.35,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='#3a3a5a';ctx.lineWidth=1;ctx.stroke();
ctx.fillStyle='rgba(170,136,255,.05)';ctx.beginPath();ctx.arc(cx,cy,H*0.22,0,Math.PI*2);ctx.fill();ctx.stroke();
SPY_MISSIONS.forEach(function(m,i){
var angle=-Math.PI/2+i*(2*Math.PI/SPY_MISSIONS.length);
var r=H*0.28;
var x=cx+r*Math.cos(angle),y=cy+r*Math.sin(angle);
var done=spyState.completed.indexOf(i)>=0;
ctx.fillStyle=done?'rgba(76,175,80,.2)':'rgba(30,30,50,.8)';
ctx.beginPath();ctx.arc(x,y,16,0,Math.PI*2);ctx.fill();
ctx.strokeStyle=done?'#4CAF50':'#5a5a6a';ctx.lineWidth=1.5;ctx.stroke();
ctx.fillStyle='#e8dcc8';ctx.font='12px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(m.icon,x,y);
});
ctx.fillStyle='#FFD700';ctx.beginPath();ctx.arc(cx,cy,8,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#0a0a1e';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText('🕵️',cx,cy);
ctx.fillStyle='#8a7a6a';ctx.font='9px sans-serif';ctx.textBaseline='bottom';
ctx.fillText('첩보량: '+spyState.intel+' | 요원: '+spyState.agents+'명',W/2,H-6);
}

function renderSpyPanel(){
var p=makePanel('v19-spy');
p.innerHTML='<h2>🕵️ 첩보 네트워크</h2><p class="v19-sub">첩자를 파견하여 적의 정보를 수집하라! (완료: '+spyState.completed.length+'/'+SPY_MISSIONS.length+', 첩보량: '+spyState.intel+')</p>';
var wrap=document.createElement('div');wrap.className='spy-wrap';
var canvas=document.createElement('canvas');canvas.width=480;canvas.height=360;
wrap.appendChild(canvas);
drawSpyCanvas(canvas);
var missions=document.createElement('div');missions.className='spy-missions';
SPY_MISSIONS.forEach(function(m,i){
var card=document.createElement('div');card.className='sm-card'+(spyState.completed.indexOf(i)>=0?' done':'');
card.innerHTML='<div class="sm-icon">'+m.icon+'</div><div class="sm-name">'+m.name+'</div><div class="sm-risk">⚠️ 위험: '+m.risk+'%</div><div class="sm-reward">✅ '+m.reward+'</div>';
if(spyState.completed.indexOf(i)<0){
card.onclick=function(){
if(spyState.agents<=0){v19Toast('요원이 부족합니다!','#FF4444');return;}
var success=Math.random()*100>m.risk;
if(success){
spyState.completed.push(i);spyState.intel+=m.intel;
v19SFX('spy_success');v19Toast(m.name+' 성공! 첩보+'+m.intel,'#4CAF50');
if(spyState.completed.length>=1)v19CheckAch('spy_first');
if(spyState.completed.length>=8)v19CheckAch('spy_master');
}else{
spyState.agents=Math.max(0,spyState.agents-1);
v19SFX('glyph_wrong');v19Toast(m.name+' 실패! 요원 -1','#FF4444');
}
saveSpy();renderSpyPanel();document.getElementById('v19-spy').classList.add('on');
};
}
missions.appendChild(card);
});
wrap.appendChild(missions);
var recruitBtn=document.createElement('button');recruitBtn.className='da-btn';recruitBtn.style.cssText='display:block;margin:10px auto';
recruitBtn.textContent='🕵️ 요원 충원 (첩보 -30)';
recruitBtn.disabled=spyState.intel<30;
recruitBtn.onclick=function(){spyState.intel-=30;spyState.agents++;v19SFX('spy_send');v19Toast('요원 춨원! 현재 '+spyState.agents+'명','#aa88ff');saveSpy();renderSpyPanel();document.getElementById('v19-spy').classList.add('on');};
wrap.appendChild(recruitBtn);
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-spy\').classList.remove(\'on\')">닫기</button>';
}

// ─── 6. 고대 문자 해독기 (Ancient Glyph Puzzle Canvas) ───
var GLYPH_PUZZLES=[
{glyph:'天',answer:'하늘',hint:'하늘 천',options:['하늘','땅','사람','물'],era:'갑골문'},
{glyph:'地',answer:'땅',hint:'땅 지',options:['땅','하늘','산','바다'],era:'갑골문'},
{glyph:'王',answer:'임금',hint:'임금 왕',options:['임금','신하','백성','병사'],era:'갑골문'},
{glyph:'民',answer:'백성',hint:'백성 민',options:['백성','군대','장군','임금'],era:'금문'},
{glyph:'兵',answer:'병사',hint:'병사 병',options:['병사','장군','백성','농민'],era:'금문'},
{glyph:'城',answer:'성',hint:'성 성',options:['성','궁','집','다리'],era:'금문'},
{glyph:'弓',answer:'활',hint:'활 궁',options:['활','검','창','방패'],era:'전서'},
{glyph:'馬',answer:'말',hint:'말 마',options:['말','소','양','개'],era:'갑골문'},
{glyph:'山',answer:'산',hint:'뼕 산',options:['산','강','바다','들'],era:'전서'},
{glyph:'水',answer:'물',hint:'물 수',options:['물','불','나무','흙'],era:'갑골문'},
{glyph:'火',answer:'불',hint:'불 화',options:['불','물','흙','나무'],era:'갑골문'},
{glyph:'剑',answer:'검',hint:'검 검',options:['검','활','방패','창'],era:'금문'}
];
var glyphState={solved:[],current:0,score:0,total:0};

function saveGlyph(){try{localStorage.setItem('krpg_v19_glyph',JSON.stringify(glyphState))}catch(e){}}
function loadGlyph(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_glyph'));if(d)glyphState=d}catch(e){}}

function drawGlyphCanvas(canvas){
var ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,W,H);
if(glyphState.current>=GLYPH_PUZZLES.length){
ctx.fillStyle='#FFD700';ctx.font='bold 18px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText('🌟 모든 문자 해독 완료!',W/2,H*0.4);
ctx.fillStyle='#c4956a';ctx.font='14px sans-serif';
ctx.fillText('점수: '+glyphState.score+'/'+GLYPH_PUZZLES.length,W/2,H*0.55);
return;
}
var puzzle=GLYPH_PUZZLES[glyphState.current];
ctx.fillStyle='#1a1a2e';ctx.strokeStyle='#5a4a3a';ctx.lineWidth=3;
var bx=W*0.3,by=H*0.15,bw=W*0.4,bh=H*0.5;
ctx.fillRect(bx,by,bw,bh);ctx.strokeRect(bx,by,bw,bh);
ctx.fillStyle='#FFD700';ctx.font='bold 64px serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(puzzle.glyph,W/2,H*0.4);
ctx.fillStyle='#8a7a6a';ctx.font='10px sans-serif';ctx.textBaseline='top';
ctx.fillText('시대: '+puzzle.era+' | 힌트: '+puzzle.hint,W/2,H*0.7);
ctx.fillStyle='#c4956a';ctx.font='9px sans-serif';
ctx.fillText((glyphState.current+1)+'/'+GLYPH_PUZZLES.length+' | 점수: '+glyphState.score,W/2,H*0.9);
}

function renderGlyphPanel(){
var p=makePanel('v19-glyph');
p.innerHTML='<h2>🔤 고대 문자 해독기</h2><p class="v19-sub">고대 한자를 해독하여 역사의 비밀을 풀어라! (해독: '+glyphState.solved.length+'/'+GLYPH_PUZZLES.length+')</p>';
var wrap=document.createElement('div');wrap.className='glyph-wrap';
var canvas=document.createElement('canvas');canvas.width=400;canvas.height=300;
wrap.appendChild(canvas);
drawGlyphCanvas(canvas);

if(glyphState.current<GLYPH_PUZZLES.length){
var puzzle=GLYPH_PUZZLES[glyphState.current];
var input=document.createElement('div');input.className='glyph-input';
var shuffled=puzzle.options.slice();
for(var si=shuffled.length-1;si>0;si--){var sj=Math.floor(Math.random()*(si+1));var tmp=shuffled[si];shuffled[si]=shuffled[sj];shuffled[sj]=tmp;}
shuffled.forEach(function(opt){
var btn=document.createElement('button');btn.className='gi-btn';btn.textContent=opt;
btn.onclick=function(){
glyphState.total++;
if(opt===puzzle.answer){
glyphState.solved.push(glyphState.current);glyphState.score++;glyphState.current++;
v19SFX('glyph_correct');v19Toast('정답! '+puzzle.glyph+' = '+puzzle.answer,'#4CAF50');
if(glyphState.solved.length>=1)v19CheckAch('glyph_first');
if(glyphState.solved.length>=12)v19CheckAch('glyph_master');
}else{
glyphState.current++;
v19SFX('glyph_wrong');v19Toast('오답! 정답: '+puzzle.answer,'#FF4444');
}
saveGlyph();renderGlyphPanel();document.getElementById('v19-glyph').classList.add('on');
};
input.appendChild(btn);
});
wrap.appendChild(input);
}else{
var resetBtn=document.createElement('button');resetBtn.className='da-btn';resetBtn.style.cssText='display:block;margin:10px auto';
resetBtn.textContent='🔄 다시 도전';
resetBtn.onclick=function(){glyphState.current=0;glyphState.score=0;glyphState.solved=[];saveGlyph();renderGlyphPanel();document.getElementById('v19-glyph').classList.add('on');};
wrap.appendChild(resetBtn);
}
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-glyph\').classList.remove(\'on\')">닫기</button>';
}

// ─── 7. 제천 달력 (Ritual Calendar Canvas) ───
var SEASONS=[
{name:'봄',icon:'🌸',months:[1,2,3],color:'#FF9ECD',events:['파종제','화전 신록제','봄방 훈련']},
{name:'여름',icon:'☀️',months:[4,5,6],color:'#FFD700',events:['단오제','수확기도제','환웅 신시제']},
{name:'가을',icon:'🍂',months:[7,8,9],color:'#FF9800',events:['추수감사제','영고(부여)','동맹(고구려)']},
{name:'겨울',icon:'❄️',months:[10,11,12],color:'#87CEEB',events:['동지제','무천(동예)','연말 대제']}
];
var calendarState={season:0,ritualsDone:[],blessings:0};

function saveCalendar(){try{localStorage.setItem('krpg_v19_calendar',JSON.stringify(calendarState))}catch(e){}}
function loadCalendar(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_calendar'));if(d)calendarState=d}catch(e){}}

function drawCalendarCanvas(canvas){
var ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);
var cx=W/2,cy=H/2,r=Math.min(W,H)*0.35;
for(var i=0;i<12;i++){
var angle=-Math.PI/2+i*(Math.PI*2/12);
var x=cx+r*Math.cos(angle),y=cy+r*Math.sin(angle);
var si=Math.floor(i/3);
var s=SEASONS[si];
ctx.fillStyle=calendarState.season===si?s.color+'44':'rgba(20,20,30,.8)';
ctx.beginPath();ctx.arc(x,y,16,0,Math.PI*2);ctx.fill();
ctx.strokeStyle=calendarState.season===si?s.color:'#3a3a4a';ctx.lineWidth=1.5;ctx.stroke();
ctx.fillStyle='#e8dcc8';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText((i+1)+'월',x,y);
}
SEASONS.forEach(function(s,si){
var angle=-Math.PI/2+si*(Math.PI*2/4)+Math.PI/6;
var x=cx+(r*0.55)*Math.cos(angle),y=cy+(r*0.55)*Math.sin(angle);
ctx.fillStyle=s.color;ctx.font='16px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(s.icon,x,y);
ctx.font='8px sans-serif';ctx.fillText(s.name,x,y+14);
});
ctx.fillStyle='#FFD700';ctx.font='bold 11px sans-serif';ctx.textAlign='center';ctx.textBaseline='top';
ctx.fillText('🌙 제천 달력 | '+SEASONS[calendarState.season].icon+' '+SEASONS[calendarState.season].name,W/2,H*0.04);
ctx.fillStyle='#8a7a6a';ctx.font='9px sans-serif';ctx.textBaseline='bottom';
ctx.fillText('축복: '+calendarState.blessings+'회 | 수행 제사: '+calendarState.ritualsDone.length+'회',W/2,H-6);
}

function renderCalendarPanel(){
var p=makePanel('v19-calendar');
p.innerHTML='<h2>🌙 제천 달력</h2><p class="v19-sub">계절별 제천 의식을 수행하여 하늘의 축복을 받아라!</p>';
var wrap=document.createElement('div');wrap.className='calendar-wrap';
var canvas=document.createElement('canvas');canvas.width=400;canvas.height=400;
wrap.appendChild(canvas);
drawCalendarCanvas(canvas);
var seasonBtns=document.createElement('div');seasonBtns.className='cal-season-btns';
SEASONS.forEach(function(s,i){
var btn=document.createElement('button');btn.className='csb'+(calendarState.season===i?' active':'');
btn.textContent=s.icon+' '+s.name;
btn.onclick=function(){calendarState.season=i;v19SFX('calendar_season');renderCalendarPanel();document.getElementById('v19-calendar').classList.add('on');};
seasonBtns.appendChild(btn);
});
wrap.appendChild(seasonBtns);
var s=SEASONS[calendarState.season];
var events=document.createElement('div');events.className='cal-events';
events.innerHTML='<strong>'+s.icon+' '+s.name+' 의식</strong><br>';
s.events.forEach(function(e,ei){
var key=calendarState.season+'_'+ei;
var done=calendarState.ritualsDone.indexOf(key)>=0;
events.innerHTML+=(done?'✅':'○')+' '+e+(done?' (완료)':' — <span style="color:#FFD700;cursor:pointer" onclick="doRitual('+calendarState.season+','+ei+')">수행하기</span>')+'<br>';
});
wrap.appendChild(events);
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-calendar\').classList.remove(\'on\')">닫기</button>';
}

window.doRitual=function(si,ei){
var key=si+'_'+ei;
if(calendarState.ritualsDone.indexOf(key)>=0)return;
calendarState.ritualsDone.push(key);calendarState.blessings++;
v19SFX('calendar_ritual');v19Toast('제천 의식 완료! 축복+1','#FFD700');
if(calendarState.blessings>=1)v19CheckAch('ritual_first');
if(calendarState.blessings>=12)v19CheckAch('ritual_master');
saveCalendar();renderCalendarPanel();document.getElementById('v19-calendar').classList.add('on');
};

// ─── 8. 왕의 칙령 (Royal Decrees) ───
var DECREES=[
{name:'세금 감면령',icon:'💰',desc:'백성의 세금을 낮춰 만족도를 높인다',effect:'백성 만족도 +20%',category:'민생'},
{name:'군비 확충령',icon:'⚔️',desc:'군사력을 강화하여 방어력을 높인다',effect:'군사력 +25%',category:'군사'},
{name:'풀년 축제령',icon:'🎉',desc:'국가적 축제를 열어 사기를 북돋운다',effect:'사기 +30%',category:'문화'},
{name:'교역 장려령',icon:'🛥️',desc:'교역을 장려하여 경제를 활성화한다',effect:'경제 수입 +20%',category:'경제'},
{name:'교육 진흥령',icon:'📚',desc:'학문을 장려하여 기술 발전을 촉진한다',effect:'연구 속도 +30%',category:'학문'},
{name:'토목 동원령',icon:'🏗️',desc:'대규모 건축 프로젝트를 시작한다',effect:'건축 속도 +40%',category:'건설'},
{name:'통금령',icon:'🌃',desc:'야간 통행을 금지하여 치안을 강화한다',effect:'치안 +25%, 경제 -10%',category:'치안'},
{name:'대사면령',icon:'⚖️',desc:'죄인들을 사면하여 민심을 수습한다',effect:'백성 충성 +15%',category:'법률'},
{name:'화전 제도령',icon:'💱',desc:'통일 화폐를 제정하여 교역을 편리하게 한다',effect:'교역 효율 +20%',category:'경제'},
{name:'봉수 정비령',icon:'🔥',desc:'봉화대 네트워크를 정비하여 정보 전달을 빠르게 한다',effect:'정보 속도 +35%',category:'군사'},
{name:'여민 구호령',icon:'🏠',desc:'난민을 받아들여 인구를 늘린다',effect:'인구 +15%',category:'민생'},
{name:'어전 대연령',icon:'🍽️',desc:'왕궁 대연을 열어 신하의 충성을 확인한다',effect:'신하 충성 +20%',category:'외교'}
];
var decreeState={issued:[]};

function saveDecree(){try{localStorage.setItem('krpg_v19_decree',JSON.stringify(decreeState))}catch(e){}}
function loadDecree(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_decree'));if(d)decreeState=d}catch(e){}}

function renderDecreePanel(){
var p=makePanel('v19-decree');
p.innerHTML='<h2>👑 왕의 칙령</h2><p class="v19-sub">왕명을 발하여 왕국을 다스려라! (발령: '+decreeState.issued.length+'/'+DECREES.length+')</p>';
var grid=document.createElement('div');grid.className='decree-grid';
DECREES.forEach(function(d,i){
var card=document.createElement('div');card.className='dec-card'+(decreeState.issued.indexOf(i)>=0?' issued':'');
card.innerHTML='<div class="dc-icon">'+d.icon+'</div><div class="dc-name">'+d.name+'</div><div class="dc-desc">'+d.desc+'</div><div class="dc-effect">→ '+d.effect+'</div>';
if(decreeState.issued.indexOf(i)<0){
card.onclick=function(){
decreeState.issued.push(i);
v19SFX('decree_issue');v19Toast('칙령 발령! '+d.effect,'#FFD700');
if(decreeState.issued.length>=1)v19CheckAch('decree_first');
if(decreeState.issued.length>=6)v19CheckAch('decree_half');
if(decreeState.issued.length>=12)v19CheckAch('decree_all');
saveDecree();renderDecreePanel();document.getElementById('v19-decree').classList.add('on');
};
}
grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-decree\').classList.remove(\'on\')">닫기</button>';
}

// ─── Quiz v19 (+15 questions, 165→180) ───
var V19_QUIZ=[
{q:'영웅 인연 시스템에서 호감도를 높이면 얻을 수 있는 효과는?',a:['합공 버프','체력 회복','경험치 증가','골드 획득'],c:0},
{q:'전쟁 전야 회의에서 조언을 제공하는 풍백의 역할은?',a:['군사 참모','방어 참모','병참 참모','외교 사절'],c:0},
{q:'시대 발전기에서 청동기 다음 시대는?',a:['철기시대','신석기','국가형성기','문화융성기'],c:0},
{q:'첩보 네트워크에서 가장 위험도가 높은 임무는?',a:['요인 암살','적진 정찰','문서 탈취','보급로 교란'],c:0},
{q:'고대 문자 ‘王’의 뜻은?',a:['임금','백성','병사','장군'],c:0},
{q:'부여의 12월 제천행사인 ‘영고’는 어느 계절에 해당하는가?',a:['가을','봄','여름','겨울'],c:0},
{q:'왕의 칉령 중 ‘교역 장려령’의 효과는?',a:['경제 수입 +20%','군사력 +25%','백성 만족도 +20%','사기 +30%'],c:0},
{q:'전투 리플레이 분석에서 확인할 수 있는 정보가 아닌 것은?',a:['날씨 정보','턴별 HP 추이','총 피해','최고 콤보'],c:0},
{q:'신석기의 주요 생활 방식은?',a:['채집과 사냥','농경','무역','공업'],c:0},
{q:'연개소문의 무예 ‘삼검술’은 몇 자루의 검을 사용하는가?',a:['3','‍2','1','5'],c:0},
{q:'제천 달력에서 ‘동맹’은 어느 나라의 제천행사인가?',a:['고구려','부여','동예','삼한'],c:0},
{q:'첩보 요원을 추가로 춨원하려면 필요한 첩보량은?',a:['30','‍50','10','100'],c:0},
{q:'고대 문자 ‘弓’의 뜻은?',a:['활','검','창','방패'],c:0},
{q:'시대 발전기의 최고 단계인 ‘문화융성기’의 버프는?',a:['문화+30%, 공격+10%','공격+20%','방어+30%','보급+25%'],c:0},
{q:'왕의 칉령 중 ‘통금령’의 부작용은?',a:['경제 -10%','사기 -10%','문화 -5%','없음'],c:0}
];

function registerV19Quiz(){
try{
var existing=JSON.parse(localStorage.getItem('krpg_quiz_pool'))||[];
var ids=existing.map(function(q){return q.q});
V19_QUIZ.forEach(function(q){if(ids.indexOf(q.q)<0)existing.push(q)});
localStorage.setItem('krpg_quiz_pool',JSON.stringify(existing));
}catch(e){}
if(typeof window.registerQuiz==='function')window.registerQuiz(V19_QUIZ,'v19');
}

// ─── Achievements (+12, 108→120) ───
var V19_ACH=[
{id:'bond_first',name:'첫 인연',desc:'영웅 인연 첫 교류'},
{id:'bond_master',name:'인연의 달인',desc:'영웅 교류 20회 달성'},
{id:'bond_max',name:'깊은 유대',desc:'영웅 인연 5레벨 달성'},
{id:'council_first',name:'첫 회의',desc:'전쟁 회의 첫 수행'},
{id:'council_master',name:'전략가',desc:'회의 10회 달성'},
{id:'replay_first',name:'분석가',desc:'전투 리플레이 첫 시청'},
{id:'age_first',name:'시대 발전',desc:'첫 시대 발전 달성'},
{id:'age_max',name:'문화융성',desc:'최고 시대 도달'},
{id:'spy_first',name:'첩보원',desc:'첩보 임무 첫 성공'},
{id:'glyph_first',name:'문자 해독',desc:'고대 문자 첫 해독'},
{id:'ritual_first',name:'첫 제천',desc:'제천 의식 첫 수행'},
{id:'decree_first',name:'첫 칉령',desc:'왕의 칉령 첫 발령'}
];

var v19AchState=[];
function loadV19Ach(){try{v19AchState=JSON.parse(localStorage.getItem('krpg_v19_ach'))||[]}catch(e){v19AchState=[]}}
function saveV19Ach(){try{localStorage.setItem('krpg_v19_ach',JSON.stringify(v19AchState))}catch(e){}}

function v19CheckAch(id){
if(v19AchState.indexOf(id)>=0)return;
v19AchState.push(id);saveV19Ach();
var a=null;V19_ACH.forEach(function(ac){if(ac.id===id)a=ac});
if(a){v19Toast('🏆 업적 달성: '+a.name,'#FFD700');v19SFX('decree_effect');}
try{
var global=JSON.parse(localStorage.getItem('krpg_ach'))||[];
if(global.indexOf('v19_'+id)<0){global.push('v19_'+id);localStorage.setItem('krpg_ach',JSON.stringify(global));}
}catch(e){}
}

// ─── Keyboard Shortcuts (8: Shift+Q/R/V/B/U/Y/X/Z) ───
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
var map={
'KeyQ':['v19-bond',renderBondPanel],
'KeyR':['v19-council',renderCouncilPanel],
'KeyV':['v19-replay',renderReplayPanel],
'KeyB':['v19-age',renderAgePanel],
'KeyU':['v19-spy',renderSpyPanel],
'KeyY':['v19-glyph',renderGlyphPanel],
'KeyX':['v19-calendar',renderCalendarPanel],
'KeyZ':['v19-decree',renderDecreePanel]
};
if(map[e.code]){
e.preventDefault();var id=map[e.code][0],fn=map[e.code][1];
var el=document.getElementById(id);
if(el&&el.classList.contains('on')){el.classList.remove('on');}
else{fn();document.getElementById(id).classList.add('on');}
}
});

// ─── Quick Action Nav Bar ───
function addV19NavBar(){
var existing=document.getElementById('v19-nav-bar');
if(existing)existing.remove();
var bar=document.createElement('div');
bar.id='v19-nav-bar';
bar.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:127;display:flex;gap:0;overflow-x:auto;background:rgba(10,6,8,.94);border-top:1px solid #4a3a2a;padding:4px 8px;-webkit-overflow-scrolling:touch;scrollbar-width:none';

var actions=[
{label:'❤️',title:'인연',fn:function(){renderBondPanel();document.getElementById('v19-bond').classList.add('on')}},
{label:'⚔️',title:'회의',fn:function(){renderCouncilPanel();document.getElementById('v19-council').classList.add('on')}},
{label:'📊',title:'리플',fn:function(){renderReplayPanel();document.getElementById('v19-replay').classList.add('on')}},
{label:'🏛️',title:'시대',fn:function(){renderAgePanel();document.getElementById('v19-age').classList.add('on')}},
{label:'🕵️',title:'첩보',fn:function(){renderSpyPanel();document.getElementById('v19-spy').classList.add('on')}},
{label:'🔤',title:'해독',fn:function(){renderGlyphPanel();document.getElementById('v19-glyph').classList.add('on')}},
{label:'🌙',title:'달력',fn:function(){renderCalendarPanel();document.getElementById('v19-calendar').classList.add('on')}},
{label:'👑',title:'칉령',fn:function(){renderDecreePanel();document.getElementById('v19-decree').classList.add('on')}}
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
loadBond();loadCouncil();loadReplay();loadAge();loadSpy();loadGlyph();loadCalendar();loadDecree();loadV19Ach();registerV19Quiz();
setTimeout(addV19NavBar,2800);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',v19Init);}
else{v19Init();}

window._v19={
BOND_HEROES:BOND_HEROES,ADVISORS:ADVISORS,AGES:AGES,SPY_MISSIONS:SPY_MISSIONS,
GLYPH_PUZZLES:GLYPH_PUZZLES,SEASONS:SEASONS,DECREES:DECREES,
V19_QUIZ:V19_QUIZ,V19_ACH:V19_ACH,v19SFX:v19SFX
};
})();
