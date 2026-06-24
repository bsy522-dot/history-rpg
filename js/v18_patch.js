// v18_patch.js — 한국사 영웅전 v18.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v18-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:136;overflow-y:auto;padding:16px}',
'.v18-panel.on{display:block}',
'.v18-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v18-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v18-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v18-close:hover{background:#8B2A1A}',

'.duel-arena{max-width:560px;margin:0 auto;text-align:center}',
'.duel-arena canvas{border:2px solid #6a3a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px;cursor:pointer}',
'.duel-vs{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:12px}',
'.duel-fighter{background:rgba(20,15,30,.9);border:2px solid #5a4a3a;border-radius:12px;padding:14px;text-align:center;min-width:140px}',
'.duel-fighter.active{border-color:#FFD700;box-shadow:0 0 12px rgba(255,215,0,.3)}',
'.duel-fighter .df-icon{font-size:36px}',
'.duel-fighter .df-name{font-size:13px;color:#FFD700;font-weight:700;margin-top:4px}',
'.duel-fighter .df-hp{height:6px;background:#1a1a2e;border-radius:3px;overflow:hidden;margin-top:6px}',
'.duel-fighter .df-hp-bar{height:100%;background:linear-gradient(90deg,#4CAF50,#8BC34A);border-radius:3px;transition:width .5s}',
'.duel-actions{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:10px 0}',
'.da-btn{padding:8px 16px;border:1px solid #6a3a2a;border-radius:6px;background:#2a1a1a;color:#e8dcc8;font-size:11px;font-family:inherit;font-weight:700;cursor:pointer;transition:all .2s}',
'.da-btn:hover{border-color:#FF6644;background:#3a2a2a}',
'.da-btn:disabled{opacity:.3;cursor:not-allowed}',
'.duel-log{max-width:400px;margin:0 auto;max-height:120px;overflow-y:auto;background:rgba(10,8,20,.8);border:1px solid #3a3a4a;border-radius:8px;padding:8px;font-size:10px;text-align:left;line-height:1.8}',
'.duel-log .dl-atk{color:#FF6644}.duel-log .dl-def{color:#5FA0FF}.duel-log .dl-crit{color:#FFD700}',

'.wonder-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;max-width:560px;margin:0 auto}',
'.wonder-card{background:linear-gradient(135deg,rgba(26,20,40,.95),rgba(14,10,24,.98));border:2px solid #4a3a5a;border-radius:12px;padding:14px;text-align:center;transition:all .3s;cursor:pointer}',
'.wonder-card:hover{border-color:#aa88ff;transform:translateY(-3px)}',
'.wonder-card.built{border-color:#FFD700;background:linear-gradient(135deg,rgba(40,30,10,.95),rgba(30,20,5,.98))}',
'.wonder-card .wc-icon{font-size:36px;margin-bottom:6px}',
'.wonder-card .wc-name{font-size:12px;color:#FFD700;font-weight:700}',
'.wonder-card .wc-era{font-size:9px;color:#8a7a6a;margin-top:2px}',
'.wonder-card .wc-cost{font-size:9px;color:#aa88ff;margin-top:4px}',
'.wonder-prog{height:6px;background:#1a1a2e;border-radius:3px;overflow:hidden;margin-top:6px}',
'.wonder-prog-bar{height:100%;background:linear-gradient(90deg,#aa88ff,#FFD700);border-radius:3px;transition:width .5s}',
'.wonder-card .wc-buff{font-size:8px;color:#4CAF50;margin-top:4px}',

'.siege-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.siege-wrap canvas{border:2px solid #5a3a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.siege-weapons{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.sw-btn{padding:6px 14px;border:1px solid #6a4a2a;border-radius:6px;background:#1a1a14;color:#e8dcc8;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.sw-btn:hover{border-color:#FF9800;background:#2a2a1a}',
'.sw-btn.selected{border-color:#FF9800;background:#3a2a1a;color:#FFD700}',
'.siege-status{font-size:12px;color:#c4956a;margin:8px 0}',

'.hero-quests{max-width:560px;margin:0 auto}',
'.hq-card{background:linear-gradient(135deg,rgba(20,25,40,.95),rgba(10,15,30,.98));border:2px solid #3a4a6a;border-radius:12px;padding:14px;margin-bottom:10px;transition:all .3s}',
'.hq-card:hover{border-color:#5FA0FF;transform:translateY(-2px)}',
'.hq-card.completed{border-color:#4CAF50;opacity:.7}',
'.hq-header{display:flex;align-items:center;gap:10px}',
'.hq-icon{font-size:28px;flex-shrink:0}',
'.hq-info{flex:1}',
'.hq-name{font-size:13px;color:#FFD700;font-weight:700}',
'.hq-desc{font-size:10px;color:#8a8aaa;margin-top:2px;line-height:1.6}',
'.hq-reward{font-size:9px;color:#4CAF50;margin-top:4px}',
'.hq-prog{height:5px;background:#1a1a2e;border-radius:3px;overflow:hidden;margin-top:6px}',
'.hq-prog-bar{height:100%;background:linear-gradient(90deg,#5FA0FF,#00E5FF);border-radius:3px;transition:width .5s}',
'.hq-btn{margin-top:8px;padding:6px 16px;border:1px solid #3a5a6a;border-radius:4px;background:#1a2a3a;color:#e8dcc8;font-size:10px;cursor:pointer;font-family:inherit}',

'.supply-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.supply-wrap canvas{border:2px solid #3a5a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.supply-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0}',
'.sc-card{background:rgba(20,30,20,.9);border:1px solid #3a5a3a;border-radius:8px;padding:10px;text-align:center}',
'.sc-card .sc-icon{font-size:24px}',
'.sc-card .sc-name{font-size:10px;color:#4CAF50;margin-top:2px}',
'.sc-card .sc-val{font-size:16px;color:#FFD700;font-weight:700;margin-top:4px}',
'.sc-card .sc-rate{font-size:8px;color:#8a8a6a;margin-top:2px}',
'.supply-btns{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',

'.strat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;max-width:560px;margin:0 auto}',
'.strat-card{background:linear-gradient(135deg,rgba(30,20,10,.95),rgba(20,15,5,.98));border:2px solid #5a4a2a;border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:all .3s}',
'.strat-card:hover{border-color:#FF9800;transform:translateY(-2px)}',
'.strat-card.used{border-color:#4CAF50;opacity:.7}',
'.strat-card .st-num{font-size:9px;color:#8a7a5a;margin-bottom:2px}',
'.strat-card .st-name{font-size:12px;color:#FFD700;font-weight:700}',
'.strat-card .st-desc{font-size:9px;color:#8a8a6a;margin-top:4px;line-height:1.5}',
'.strat-card .st-effect{font-size:9px;color:#FF9800;margin-top:4px}',

'.martial-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-width:560px;margin:0 auto}',
'.martial-card{background:linear-gradient(135deg,rgba(30,15,15,.95),rgba(20,10,10,.98));border:2px solid #5a3a3a;border-radius:12px;padding:14px;text-align:center;transition:all .3s;cursor:pointer}',
'.martial-card:hover{border-color:#FF5FA2;transform:translateY(-3px)}',
'.martial-card.mastered{border-color:#FFD700;background:linear-gradient(135deg,rgba(40,30,10,.95),rgba(30,20,5,.98))}',
'.martial-card .mc-icon{font-size:32px;margin-bottom:4px}',
'.martial-card .mc-name{font-size:12px;color:#FF5FA2;font-weight:700}',
'.martial-card .mc-type{font-size:9px;color:#8a7a6a;margin-top:2px}',
'.martial-card .mc-stat{font-size:9px;color:#FFD700;margin-top:4px}',
'.martial-card .mc-prog{height:4px;background:#1a1a2e;border-radius:2px;overflow:hidden;margin-top:6px}',
'.martial-card .mc-prog-bar{height:100%;background:linear-gradient(90deg,#FF5FA2,#FFD700);border-radius:2px;transition:width .5s}',

'.territory-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.territory-wrap canvas{border:2px solid #3a4a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.terr-era-btns{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.te-btn{padding:6px 14px;border:1px solid #3a4a5a;border-radius:6px;background:#1a1a2a;color:#e8dcc8;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.te-btn:hover{border-color:#5FA0FF}',
'.te-btn.selected{border-color:#5FA0FF;background:#1a2a3a;color:#00E5FF}',
'.terr-info{font-size:11px;color:#8a8aaa;text-align:center;line-height:1.8;max-width:400px;margin:0 auto 12px;background:rgba(10,15,30,.8);border:1px solid #3a3a5a;border-radius:8px;padding:12px}',
'.terr-info strong{color:#5FA0FF}'
].join('\n');
document.head.appendChild(css);

function v18Toast(msg,c){var t=document.createElement('div');t.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:'+(c||'#c4956a')+'22;color:'+(c||'#c4956a')+';border:1px solid '+(c||'#c4956a')+'44;padding:10px 20px;border-radius:12px;font-size:12px;font-weight:700;z-index:200;pointer-events:none;animation:fadeIn .3s ease';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.remove()},2000)}

var actx;function v18SFX(type){try{if(!actx)actx=new(window.AudioContext||window.webkitAudioContext)();var o=actx.createOscillator(),g=actx.createGain();o.connect(g);g.connect(actx.destination);var f={duel_clash:220,duel_crit:880,duel_win:523,wonder_build:330,wonder_done:660,siege_fire:110,siege_hit:165,quest_done:440,supply_gain:294,strat_use:392,martial_train:349,territory_view:262};o.frequency.value=f[type]||330;o.type=({duel_clash:'sawtooth',siege_fire:'square',martial_train:'triangle'})[type]||'sine';g.gain.value=0.12;o.start();g.gain.exponentialRampToValueAtTime(0.001,actx.currentTime+0.3);o.stop(actx.currentTime+0.3)}catch(e){}}

// ─── Panel creation ───
function makePanel(id){var existing=document.getElementById(id);if(existing)existing.remove();var p=document.createElement('div');p.id=id;p.className='v18-panel';document.body.appendChild(p);return p}

// ─── 1. 일기토 결투장 (Duel Arena) ───
var DUEL_HEROES=[
{name:'환웅',icon:'⚡',hp:120,atk:28,def:18,spd:15,skill:'천부삼인',sdmg:45},
{name:'단군',icon:'👑',hp:140,atk:25,def:22,spd:12,skill:'홍익인간',sdmg:40},
{name:'주몽',icon:'🏹',hp:100,atk:35,def:14,spd:20,skill:'신궁',sdmg:55},
{name:'해모수',icon:'☀️',hp:130,atk:30,def:16,spd:14,skill:'천마술',sdmg:48},
{name:'유화',icon:'🌸',hp:90,atk:20,def:25,spd:18,skill:'수신의가호',sdmg:35},
{name:'을지문덕',icon:'🛡️',hp:150,atk:22,def:28,spd:10,skill:'살수대첩',sdmg:50},
{name:'연개소문',icon:'🗡️',hp:110,atk:34,def:15,spd:17,skill:'삼검술',sdmg:52},
{name:'김유신',icon:'⚔️',hp:135,atk:26,def:20,spd:13,skill:'화랑도',sdmg:42},
{name:'광개토대왕',icon:'🐉',hp:160,atk:32,def:24,spd:11,skill:'대제정벌',sdmg:58},
{name:'온조',icon:'🏯',hp:115,atk:24,def:19,spd:16,skill:'위례성건국',sdmg:38}
];
var duelState={hero:0,enemy:0,heroHp:0,enemyHp:0,turn:'hero',log:[],fighting:false,wins:0,streak:0};

function saveDuel(){try{localStorage.setItem('krpg_v18_duel',JSON.stringify({wins:duelState.wins,streak:duelState.streak}))}catch(e){}}
function loadDuel(){try{var d=JSON.parse(localStorage.getItem('krpg_v18_duel'));if(d){duelState.wins=d.wins||0;duelState.streak=d.streak||0}}catch(e){}}

function renderDuelPanel(){
var p=makePanel('v18-duel');
p.innerHTML='<h2>⚔️ 일기토 결투장</h2><p class="v18-sub">영걸전 스타일 1:1 결투 — 영웅을 선택하고 상대에 도전하라! (승리:'+duelState.wins+' 연승:'+duelState.streak+')</p>';

var arena=document.createElement('div');arena.className='duel-arena';arena.id='duel-arena-main';

var selectDiv=document.createElement('div');selectDiv.style.cssText='margin-bottom:12px';
selectDiv.innerHTML='<div style="font-size:11px;color:#c4956a;margin-bottom:6px">영웅 선택:</div>';
var heroSel=document.createElement('div');heroSel.style.cssText='display:flex;gap:6px;flex-wrap:wrap;justify-content:center';
DUEL_HEROES.forEach(function(h,i){
var btn=document.createElement('button');btn.className='da-btn';btn.textContent=h.icon+' '+h.name;
btn.onclick=function(){duelState.hero=i;startDuel();};
heroSel.appendChild(btn);
});
selectDiv.appendChild(heroSel);
arena.appendChild(selectDiv);

arena.innerHTML+='<div id="duel-battle-area"></div>';
p.appendChild(arena);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-duel\').classList.remove(\'on\')">닫기</button>';
}

function startDuel(){
duelState.enemy=(duelState.hero+1+Math.floor(Math.random()*(DUEL_HEROES.length-1)))%DUEL_HEROES.length;
var h=DUEL_HEROES[duelState.hero],e=DUEL_HEROES[duelState.enemy];
duelState.heroHp=h.hp;duelState.enemyHp=e.hp;duelState.turn='hero';duelState.log=[];duelState.fighting=true;

var area=document.getElementById('duel-battle-area');if(!area)return;
area.innerHTML='';

var vs=document.createElement('div');vs.className='duel-vs';
vs.innerHTML='<div class="duel-fighter active" id="df-hero"><div class="df-icon">'+h.icon+'</div><div class="df-name">'+h.name+'</div><div style="font-size:9px;color:#8a8a6a">ATK:'+h.atk+' DEF:'+h.def+' SPD:'+h.spd+'</div><div class="df-hp"><div class="df-hp-bar" id="df-hero-hp" style="width:100%"></div></div><div style="font-size:9px;color:#4CAF50" id="df-hero-hp-txt">HP: '+h.hp+'/'+h.hp+'</div></div>'
+'<div style="font-size:24px;color:#FF6644;font-weight:900">VS</div>'
+'<div class="duel-fighter" id="df-enemy"><div class="df-icon">'+e.icon+'</div><div class="df-name">'+e.name+'</div><div style="font-size:9px;color:#8a8a6a">ATK:'+e.atk+' DEF:'+e.def+' SPD:'+e.spd+'</div><div class="df-hp"><div class="df-hp-bar" id="df-enemy-hp" style="width:100%"></div></div><div style="font-size:9px;color:#FF6644" id="df-enemy-hp-txt">HP: '+e.hp+'/'+e.hp+'</div></div>';
area.appendChild(vs);

var acts=document.createElement('div');acts.className='duel-actions';acts.id='duel-acts';
acts.innerHTML='<button class="da-btn" onclick="duelAction(\'attack\')">⚔️ 공격</button><button class="da-btn" onclick="duelAction(\'defend\')">🛡️ 방어</button><button class="da-btn" onclick="duelAction(\'skill\')">✨ '+h.skill+'</button><button class="da-btn" onclick="duelAction(\'feint\')">🎭 허실</button>';
area.appendChild(acts);

var log=document.createElement('div');log.className='duel-log';log.id='duel-log';
log.innerHTML='<div style="color:#c4956a">⚔️ 일기토 개시! '+h.name+' vs '+e.name+'</div>';
area.appendChild(log);
}

window.duelAction=function(type){
if(!duelState.fighting)return;
var h=DUEL_HEROES[duelState.hero],e=DUEL_HEROES[duelState.enemy];
var log=document.getElementById('duel-log');if(!log)return;

var crit=Math.random()<0.15;
var dmg=0,msg='';

if(type==='attack'){
dmg=Math.max(1,h.atk-e.def/2+Math.floor(Math.random()*8));
if(crit){dmg=Math.floor(dmg*1.8);msg='<span class="dl-crit">💥 '+h.name+'의 회심의 일격! '+dmg+' 피해!</span>';}
else{msg='<span class="dl-atk">'+h.icon+' '+h.name+'가 공격! '+dmg+' 피해</span>';}
v18SFX('duel_clash');
}else if(type==='defend'){
dmg=0;msg='<span class="dl-def">🛡️ '+h.name+'가 방어 자세! (다음 피해 50% 감소)</span>';
duelState._defending=true;
}else if(type==='skill'){
dmg=h.sdmg+Math.floor(Math.random()*10);
msg='<span class="dl-crit">✨ '+h.name+'의 '+h.skill+'! '+dmg+' 피해!</span>';
v18SFX('duel_crit');
}else if(type==='feint'){
if(Math.random()<0.5){dmg=Math.floor(h.atk*1.5);msg='<span class="dl-crit">🎭 허실 성공! '+h.name+'의 기습 '+dmg+' 피해!</span>';v18SFX('duel_crit');}
else{dmg=0;msg='<span class="dl-def">🎭 허실 실패! '+h.name+'가 빈틈을 보였다!</span>';duelState._vulnerable=true;}
}

duelState.enemyHp=Math.max(0,duelState.enemyHp-dmg);
log.innerHTML+='<div>'+msg+'</div>';
updateDuelHP();

if(duelState.enemyHp<=0){
duelState.fighting=false;duelState.wins++;duelState.streak++;saveDuel();
log.innerHTML+='<div style="color:#FFD700;font-size:12px;font-weight:700">🏆 '+h.name+' 승리! (총 '+duelState.wins+'승, '+duelState.streak+'연승)</div>';
v18SFX('duel_win');
if(duelState.wins>=1)v18CheckAch('duel_first');
if(duelState.wins>=10)v18CheckAch('duel_master');
if(duelState.streak>=5)v18CheckAch('duel_streak');
var acts=document.getElementById('duel-acts');if(acts)acts.innerHTML='<button class="da-btn" onclick="renderDuelPanel();document.getElementById(\'v18-duel\').classList.add(\'on\')">🔄 다시 도전</button>';
return;
}

setTimeout(function(){enemyDuelTurn(log)},600);
};

function enemyDuelTurn(log){
if(!duelState.fighting)return;
var h=DUEL_HEROES[duelState.hero],e=DUEL_HEROES[duelState.enemy];
var actions=['attack','attack','attack','skill'];
var act=actions[Math.floor(Math.random()*actions.length)];
var dmg=0,msg='';
var defMult=duelState._defending?0.5:1;
var vulnMult=duelState._vulnerable?1.5:1;
duelState._defending=false;duelState._vulnerable=false;

if(act==='attack'){
dmg=Math.max(1,Math.floor((e.atk-h.def/2+Math.floor(Math.random()*8))*defMult*vulnMult));
var crit=Math.random()<0.12;
if(crit){dmg=Math.floor(dmg*1.6);msg='<span class="dl-crit">💥 '+e.name+'의 반격! '+dmg+' 피해!</span>';}
else{msg='<span class="dl-atk">'+e.icon+' '+e.name+'가 반격! '+dmg+' 피해</span>';}
v18SFX('duel_clash');
}else{
dmg=Math.floor((e.sdmg+Math.floor(Math.random()*8))*defMult*vulnMult);
msg='<span class="dl-crit">✨ '+e.name+'의 '+e.skill+'! '+dmg+' 피해!</span>';
v18SFX('duel_crit');
}

duelState.heroHp=Math.max(0,duelState.heroHp-dmg);
log.innerHTML+='<div>'+msg+'</div>';
log.scrollTop=log.scrollHeight;
updateDuelHP();

if(duelState.heroHp<=0){
duelState.fighting=false;duelState.streak=0;saveDuel();
log.innerHTML+='<div style="color:#FF4444;font-size:12px;font-weight:700">💀 '+h.name+' 패배... 연승 기록 초기화</div>';
var acts=document.getElementById('duel-acts');if(acts)acts.innerHTML='<button class="da-btn" onclick="renderDuelPanel();document.getElementById(\'v18-duel\').classList.add(\'on\')">🔄 재도전</button>';
}
}

function updateDuelHP(){
var h=DUEL_HEROES[duelState.hero],e=DUEL_HEROES[duelState.enemy];
var hb=document.getElementById('df-hero-hp');if(hb)hb.style.width=Math.max(0,duelState.heroHp/h.hp*100)+'%';
var eb=document.getElementById('df-enemy-hp');if(eb)eb.style.width=Math.max(0,duelState.enemyHp/e.hp*100)+'%';
var ht=document.getElementById('df-hero-hp-txt');if(ht)ht.textContent='HP: '+duelState.heroHp+'/'+h.hp;
var et=document.getElementById('df-enemy-hp-txt');if(et)et.textContent='HP: '+duelState.enemyHp+'/'+e.hp;
if(duelState.enemyHp/e.hp<0.3){var eb2=document.getElementById('df-enemy-hp');if(eb2)eb2.style.background='linear-gradient(90deg,#FF4444,#FF6644)';}
if(duelState.heroHp/h.hp<0.3){var hb2=document.getElementById('df-hero-hp');if(hb2)hb2.style.background='linear-gradient(90deg,#FF4444,#FF6644)';}
}

// ─── 2. 불가사의 건설 (Wonders Construction) ───
var WONDERS=[
{name:'고인돌 천문대',icon:'🪨',era:'석기시대',cost:200,buff:'문화+15%',desc:'거석문화의 정수, 천체 관측 구조물'},
{name:'환웅 제천단',icon:'⛩️',era:'신시시대',cost:350,buff:'사기+20%',desc:'하늘에 제사를 올리는 성소'},
{name:'아사달 왕궁',icon:'🏛️',era:'고조선',cost:500,buff:'외교+25%',desc:'단군왕검의 수도 아사달 대궁전'},
{name:'비파형동검 제련소',icon:'⚔️',era:'청동기',cost:400,buff:'공격+18%',desc:'고조선 특유의 비파형 청동검 제조'},
{name:'반구대 암각화',icon:'🎨',era:'선사시대',cost:250,buff:'지식+20%',desc:'울산 반구대의 선사시대 암각화'},
{name:'고조선 성벽',icon:'🏰',era:'철기시대',cost:600,buff:'방어+30%',desc:'왕검성을 둘러싼 대규모 방어 성벽'},
{name:'부여 영고전',icon:'🎭',era:'부여',cost:300,buff:'생산+15%',desc:'12월 영고 축제의 대제전 건물'},
{name:'삼한 소도',icon:'🌿',era:'삼한',cost:280,buff:'치유+20%',desc:'천군이 다스리는 신성 구역'}
];
var wonderState={built:[],progress:{}};

function saveWonders(){try{localStorage.setItem('krpg_v18_wonders',JSON.stringify(wonderState))}catch(e){}}
function loadWonders(){try{var d=JSON.parse(localStorage.getItem('krpg_v18_wonders'));if(d){wonderState=d}}catch(e){}}

function renderWonderPanel(){
var p=makePanel('v18-wonder');
p.innerHTML='<h2>🏛️ 불가사의 건설</h2><p class="v18-sub">문명의 불가사의를 건설하여 왕국에 영구 버프를 부여하라! (건설: '+wonderState.built.length+'/'+WONDERS.length+')</p>';
var grid=document.createElement('div');grid.className='wonder-grid';

WONDERS.forEach(function(w,i){
var card=document.createElement('div');card.className='wonder-card'+(wonderState.built.indexOf(i)>=0?' built':'');
var prog=wonderState.progress[i]||0;
card.innerHTML='<div class="wc-icon">'+w.icon+'</div><div class="wc-name">'+w.name+'</div><div class="wc-era">'+w.era+'</div>'
+(wonderState.built.indexOf(i)>=0?'<div class="wc-buff">✅ '+w.buff+'</div>':'<div class="wc-cost">비용: '+w.cost+' 자원</div><div class="wonder-prog"><div class="wonder-prog-bar" style="width:'+Math.min(100,prog/w.cost*100)+'%"></div></div>');

if(wonderState.built.indexOf(i)<0){
card.onclick=function(){
wonderState.progress[i]=(wonderState.progress[i]||0)+50;
if(wonderState.progress[i]>=w.cost){
wonderState.built.push(i);v18SFX('wonder_done');v18Toast(w.name+' 건설 완료! '+w.buff,'#FFD700');
if(wonderState.built.length>=1)v18CheckAch('wonder_first');
if(wonderState.built.length>=4)v18CheckAch('wonder_half');
if(wonderState.built.length>=8)v18CheckAch('wonder_all');
}else{v18SFX('wonder_build');v18Toast(w.name+' 건설 진행: '+Math.floor(wonderState.progress[i]/w.cost*100)+'%','#aa88ff');}
saveWonders();renderWonderPanel();document.getElementById('v18-wonder').classList.add('on');
};
}
grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-wonder\').classList.remove(\'on\')">닫기</button>';
}

// ─── 3. 공성전 시뮬레이터 (Siege Warfare Canvas) ───
var SIEGE_WEAPONS=[
{name:'투석기',icon:'🪨',dmg:25,range:3,reload:2,desc:'큰 바위를 발사하는 원거리 무기'},
{name:'충차',icon:'🐏',dmg:40,range:1,reload:3,desc:'성문을 부수는 파성추'},
{name:'운제',icon:'🪜',dmg:10,range:1,reload:1,desc:'성벽을 오르는 사다리'},
{name:'화전',icon:'🔥',dmg:30,range:2,reload:2,desc:'불화살로 성벽을 태운다'},
{name:'노포',icon:'🏹',dmg:20,range:4,reload:1,desc:'대형 쇠뇌 연사 무기'},
{name:'지도',icon:'⛏️',dmg:35,range:0,reload:4,desc:'성벽 아래 터널 굴착'}
];
var siegeState={wallHP:500,maxWallHP:500,weapon:0,cooldowns:[0,0,0,0,0,0],victories:0};

function saveSiege(){try{localStorage.setItem('krpg_v18_siege',JSON.stringify({victories:siegeState.victories}))}catch(e){}}
function loadSiege(){try{var d=JSON.parse(localStorage.getItem('krpg_v18_siege'));if(d){siegeState.victories=d.victories||0}}catch(e){}}

function drawSiegeCanvas(canvas){
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#4a3a2a';ctx.fillRect(W*0.55,H*0.2,W*0.12,H*0.6);
ctx.fillStyle='#5a4a3a';ctx.fillRect(W*0.5,H*0.15,W*0.22,H*0.12);
for(var i=0;i<5;i++){ctx.fillStyle='#6a5a4a';ctx.fillRect(W*0.5+i*W*0.044,H*0.08,W*0.02,H*0.08);}
ctx.fillStyle='#3a2a1a';ctx.fillRect(W*0.57,H*0.5,W*0.08,H*0.3);
var hpPct=siegeState.wallHP/siegeState.maxWallHP;
ctx.fillStyle=hpPct>0.5?'#4CAF50':hpPct>0.25?'#FF9800':'#FF4444';
ctx.fillRect(W*0.45,H*0.88,W*0.3*hpPct,H*0.04);
ctx.strokeStyle='#8a7a6a';ctx.strokeRect(W*0.45,H*0.88,W*0.3,H*0.04);
ctx.fillStyle='#e8dcc8';ctx.font='10px sans-serif';ctx.textAlign='center';
ctx.fillText('성벽 HP: '+siegeState.wallHP+'/'+siegeState.maxWallHP,W*0.6,H*0.86);
var sw=SIEGE_WEAPONS[siegeState.weapon];
ctx.fillStyle='#FFD700';ctx.font='24px sans-serif';ctx.fillText(sw.icon,W*0.2,H*0.55);
ctx.fillStyle='#c4956a';ctx.font='10px sans-serif';ctx.fillText(sw.name,W*0.2,H*0.68);
ctx.fillStyle='#1a3a1a';ctx.fillRect(0,H*0.82,W*0.4,H*0.18);
ctx.fillStyle='#2a4a2a';for(var j=0;j<8;j++){ctx.fillRect(j*W*0.05,H*0.78,W*0.04,H*0.04);}
}

function renderSiegePanel(){
var p=makePanel('v18-siege');
p.innerHTML='<h2>🏰 공성전 시뮬레이터</h2><p class="v18-sub">공성 무기를 선택하고 성벽을 돌파하라! (승리: '+siegeState.victories+')</p>';
var wrap=document.createElement('div');wrap.className='siege-wrap';

var canvas=document.createElement('canvas');canvas.width=520;canvas.height=300;
wrap.appendChild(canvas);
drawSiegeCanvas(canvas);

var weapons=document.createElement('div');weapons.className='siege-weapons';
SIEGE_WEAPONS.forEach(function(w,i){
var btn=document.createElement('button');btn.className='sw-btn'+(siegeState.weapon===i?' selected':'');
btn.textContent=w.icon+' '+w.name+(siegeState.cooldowns[i]>0?' ('+siegeState.cooldowns[i]+'턴)':'');
btn.disabled=siegeState.cooldowns[i]>0;
btn.onclick=function(){siegeState.weapon=i;renderSiegePanel();document.getElementById('v18-siege').classList.add('on');};
weapons.appendChild(btn);
});
wrap.appendChild(weapons);

var fireBtn=document.createElement('button');fireBtn.className='da-btn';fireBtn.style.cssText='display:block;margin:10px auto;padding:10px 30px;font-size:13px';
fireBtn.textContent='🔥 발사!';fireBtn.disabled=siegeState.cooldowns[siegeState.weapon]>0||siegeState.wallHP<=0;
fireBtn.onclick=function(){
var w=SIEGE_WEAPONS[siegeState.weapon];
var dmg=w.dmg+Math.floor(Math.random()*15);
siegeState.wallHP=Math.max(0,siegeState.wallHP-dmg);
siegeState.cooldowns[siegeState.weapon]=w.reload;
for(var i=0;i<siegeState.cooldowns.length;i++){if(i!==siegeState.weapon&&siegeState.cooldowns[i]>0)siegeState.cooldowns[i]--;}
v18SFX('siege_fire');v18Toast(w.name+' 발사! '+dmg+' 피해!','#FF6644');
if(siegeState.wallHP<=0){
siegeState.victories++;saveSiege();
v18Toast('🏆 성벽 돌파! 공성 승리!','#FFD700');v18SFX('siege_hit');
if(siegeState.victories>=1)v18CheckAch('siege_first');
if(siegeState.victories>=5)v18CheckAch('siege_master');
siegeState.wallHP=siegeState.maxWallHP;siegeState.cooldowns=[0,0,0,0,0,0];
}
renderSiegePanel();document.getElementById('v18-siege').classList.add('on');
};
wrap.appendChild(fireBtn);

var status=document.createElement('div');status.className='siege-status';
status.textContent='선택: '+SIEGE_WEAPONS[siegeState.weapon].icon+' '+SIEGE_WEAPONS[siegeState.weapon].name+' — '+SIEGE_WEAPONS[siegeState.weapon].desc;
wrap.appendChild(status);
p.appendChild(wrap);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-siege\').classList.remove(\'on\')">닫기</button>';
}

// ─── 4. 영웅 개인서사 (Hero Personal Quests) ───
var HERO_QUESTS=[
{hero:'환웅',icon:'⚡',quest:'천부인 3종 수집',desc:'하늘에서 가져온 풍백, 우사, 운사의 천부인을 모아라.',reward:'스킬 피해 +20%',steps:3},
{hero:'단군',icon:'👑',quest:'아사달 건국 선언',desc:'곰녀와의 만남, 신시 건설, 조선 건국 3단계를 완수하라.',reward:'전체 HP +15%',steps:3},
{hero:'주몽',icon:'🏹',quest:'비류수 탈출기',desc:'부여 탈출, 비류수 도하, 졸본 도착까지의 여정.',reward:'명중률 +25%',steps:3},
{hero:'해모수',icon:'☀️',quest:'천마 길들이기',desc:'천마를 발견하고, 시험하고, 교감하여 타는 것을 배워라.',reward:'이동력 +2',steps:3},
{hero:'유화',icon:'🌸',quest:'태양의 빛 받기',desc:'금와왕의 궁전에서 태양의 축복을 세 번 받아라.',reward:'치유량 +30%',steps:3},
{hero:'을지문덕',icon:'🛡️',quest:'살수 전략 수립',desc:'정보 수집, 유인 작전, 최종 반격의 3단계 전략.',reward:'방어력 +20%',steps:3},
{hero:'연개소문',icon:'🗡️',quest:'삼검의 비밀',desc:'세 자루의 검을 단련하고 합일의 경지에 도달하라.',reward:'공격력 +22%',steps:3},
{hero:'김유신',icon:'⚔️',quest:'화랑 수련 완성',desc:'무예, 학문, 풍월도의 3가지 수련을 마스터하라.',reward:'경험치 +25%',steps:3},
{hero:'광개토대왕',icon:'🐉',quest:'4방 정벌 완수',desc:'동서남북 4방향을 정벌하여 최대 영토를 확보하라.',reward:'전체 스탯 +10%',steps:4},
{hero:'온조',icon:'🏯',quest:'위례성 건설기',desc:'토지 확보, 성벽 건설, 백성 정착의 3단계를 완수하라.',reward:'자원 수확 +20%',steps:3},
{hero:'비류',icon:'🌊',quest:'미추홀 개척',desc:'해안 탐사, 마을 건설, 교역로 개설의 3단계.',reward:'교역 수익 +25%',steps:3},
{hero:'유리',icon:'🎵',quest:'황조가 완성',desc:'이별의 아픔을 시로 승화시키는 3단계 창작 여정.',reward:'사기 +20%',steps:3}
];
var questState={progress:{},completed:[]};

function saveQuests(){try{localStorage.setItem('krpg_v18_quests',JSON.stringify(questState))}catch(e){}}
function loadQuests(){try{var d=JSON.parse(localStorage.getItem('krpg_v18_quests'));if(d){questState=d}}catch(e){}}

function renderQuestPanel(){
var p=makePanel('v18-quest');
p.innerHTML='<h2>📖 영웅 개인서사</h2><p class="v18-sub">각 영웅의 개인 퀘스트를 완수하고 특별 보상을 얻어라! (완료: '+questState.completed.length+'/'+HERO_QUESTS.length+')</p>';
var list=document.createElement('div');list.className='hero-quests';

HERO_QUESTS.forEach(function(q,i){
var card=document.createElement('div');card.className='hq-card'+(questState.completed.indexOf(i)>=0?' completed':'');
var prog=questState.progress[i]||0;
card.innerHTML='<div class="hq-header"><div class="hq-icon">'+q.icon+'</div><div class="hq-info"><div class="hq-name">'+q.hero+': '+q.quest+'</div><div class="hq-desc">'+q.desc+'</div><div class="hq-reward">보상: '+q.reward+'</div></div></div>'
+'<div class="hq-prog"><div class="hq-prog-bar" style="width:'+(prog/q.steps*100)+'%"></div></div>'
+'<div style="font-size:9px;color:#5FA0FF;text-align:right;margin-top:2px">'+prog+'/'+q.steps+'단계</div>';

if(questState.completed.indexOf(i)<0){
var btn=document.createElement('button');btn.className='hq-btn';btn.textContent='▶ 다음 단계 진행';
btn.onclick=function(ev){
ev.stopPropagation();
questState.progress[i]=(questState.progress[i]||0)+1;
if(questState.progress[i]>=q.steps){
questState.completed.push(i);v18SFX('quest_done');v18Toast(q.hero+' 서사 완료! '+q.reward,'#FFD700');
if(questState.completed.length>=1)v18CheckAch('quest_first');
if(questState.completed.length>=6)v18CheckAch('quest_half');
if(questState.completed.length>=12)v18CheckAch('quest_all');
}else{v18SFX('supply_gain');v18Toast(q.hero+' 서사 '+questState.progress[i]+'/'+q.steps+' 진행','#5FA0FF');}
saveQuests();renderQuestPanel();document.getElementById('v18-quest').classList.add('on');
};
card.appendChild(btn);
}
list.appendChild(card);
});
p.appendChild(list);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-quest\').classList.remove(\'on\')">닫기</button>';
}

// ─── 5. 군량 병참도 (Supply Line Canvas) ───
var SUPPLY_TYPES=[
{name:'식량',icon:'🌾',rate:12,max:999,color:'#4CAF50'},
{name:'무기',icon:'⚔️',rate:6,max:500,color:'#FF6644'},
{name:'약초',icon:'🌿',rate:8,max:300,color:'#00E5A0'},
{name:'군마',icon:'🐴',rate:3,max:200,color:'#FF9800'}
];
var supplyState={amounts:[100,30,50,10],history:[[100],[30],[50],[10]]};

function saveSupply(){try{localStorage.setItem('krpg_v18_supply',JSON.stringify(supplyState))}catch(e){}}
function loadSupply(){try{var d=JSON.parse(localStorage.getItem('krpg_v18_supply'));if(d){supplyState=d}}catch(e){}}

function drawSupplyCanvas(canvas){
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,W,H);
ctx.strokeStyle='#2a2a3a';ctx.lineWidth=1;
for(var i=0;i<=5;i++){var y=H*0.1+i*(H*0.7/5);ctx.beginPath();ctx.moveTo(W*0.08,y);ctx.lineTo(W*0.95,y);ctx.stroke();}
ctx.fillStyle='#5a5a6a';ctx.font='8px sans-serif';ctx.textAlign='right';
for(var j=0;j<=5;j++){var val=Math.floor(200-j*40);ctx.fillText(val+'',W*0.07,H*0.1+j*(H*0.7/5)+3);}
SUPPLY_TYPES.forEach(function(st,si){
var hist=supplyState.history[si]||[];if(hist.length<2)return;
ctx.strokeStyle=st.color;ctx.lineWidth=2;ctx.beginPath();
var maxH=200;
for(var k=0;k<hist.length;k++){
var x=W*0.08+k*(W*0.87/(hist.length-1||1));
var y=H*0.1+(1-Math.min(hist[k],maxH)/maxH)*(H*0.7);
if(k===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.stroke();
var last=hist[hist.length-1];
var lx=W*0.08+(hist.length-1)*(W*0.87/(hist.length-1||1));
var ly=H*0.1+(1-Math.min(last,maxH)/maxH)*(H*0.7);
ctx.fillStyle=st.color;ctx.beginPath();ctx.arc(lx,ly,4,0,Math.PI*2);ctx.fill();
ctx.fillStyle=st.color;ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText(st.icon+' '+last,lx+6,ly+3);
});
ctx.fillStyle='#c4956a';ctx.font='11px sans-serif';ctx.textAlign='center';ctx.fillText('보급 추이 (최근 턴)',W/2,H*0.96);
}

function renderSupplyPanel(){
var p=makePanel('v18-supply');
p.innerHTML='<h2>🌾 군량 병참도</h2><p class="v18-sub">보급선을 관리하여 전투력을 유지하라!</p>';
var wrap=document.createElement('div');wrap.className='supply-wrap';

var canvas=document.createElement('canvas');canvas.width=520;canvas.height=280;
wrap.appendChild(canvas);
drawSupplyCanvas(canvas);

var cards=document.createElement('div');cards.className='supply-cards';
SUPPLY_TYPES.forEach(function(st,i){
cards.innerHTML+='<div class="sc-card"><div class="sc-icon">'+st.icon+'</div><div class="sc-name">'+st.name+'</div><div class="sc-val">'+supplyState.amounts[i]+'</div><div class="sc-rate">+'+st.rate+'/턴 (최대 '+st.max+')</div></div>';
});
wrap.appendChild(cards);

var btns=document.createElement('div');btns.className='supply-btns';
var harvestBtn=document.createElement('button');harvestBtn.className='da-btn';harvestBtn.textContent='📦 보급 수확';
harvestBtn.onclick=function(){
SUPPLY_TYPES.forEach(function(st,i){
supplyState.amounts[i]=Math.min(st.max,supplyState.amounts[i]+st.rate+Math.floor(Math.random()*5));
supplyState.history[i].push(supplyState.amounts[i]);
if(supplyState.history[i].length>15)supplyState.history[i].shift();
});
v18SFX('supply_gain');v18Toast('보급 수확 완료!','#4CAF50');
saveSupply();renderSupplyPanel();document.getElementById('v18-supply').classList.add('on');
if(supplyState.amounts[0]>=500)v18CheckAch('supply_master');
};
btns.appendChild(harvestBtn);

var warBtn=document.createElement('button');warBtn.className='da-btn';warBtn.textContent='⚔️ 전쟁 소비';
warBtn.onclick=function(){
supplyState.amounts[0]=Math.max(0,supplyState.amounts[0]-20);
supplyState.amounts[1]=Math.max(0,supplyState.amounts[1]-10);
supplyState.amounts[2]=Math.max(0,supplyState.amounts[2]-8);
supplyState.amounts[3]=Math.max(0,supplyState.amounts[3]-3);
SUPPLY_TYPES.forEach(function(st,i){supplyState.history[i].push(supplyState.amounts[i]);if(supplyState.history[i].length>15)supplyState.history[i].shift();});
v18SFX('siege_fire');v18Toast('전쟁 보급 소비!','#FF6644');
saveSupply();renderSupplyPanel();document.getElementById('v18-supply').classList.add('on');
};
btns.appendChild(warBtn);
wrap.appendChild(btns);
p.appendChild(wrap);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-supply\').classList.remove(\'on\')">닫기</button>';
}

// ─── 6. 삼십육계 모략관 (36 Stratagems) ───
var STRATAGEMS=[
{num:'제1계',name:'만천과해',desc:'하늘을 가리고 바다를 건넌다',effect:'기습 공격 성공률 +40%',category:'승전계'},
{num:'제2계',name:'위위구조',desc:'위나라를 포위하여 조나라를 구한다',effect:'아군 지원 병력 +30%',category:'승전계'},
{num:'제3계',name:'차도살인',desc:'빌린 칼로 사람을 죽인다',effect:'적 내부 반란 유발',category:'승전계'},
{num:'제6계',name:'성동격서',desc:'동쪽을 떠들썩하게 하고 서쪽을 친다',effect:'적 방어력 -25%',category:'적전계'},
{num:'제7계',name:'무중생유',desc:'없는 것에서 있는 것을 만든다',effect:'허위 병력 위장 효과',category:'적전계'},
{num:'제10계',name:'소리장도',desc:'웃음 속에 칼을 숨긴다',effect:'외교 기습 공격 +50%',category:'공전계'},
{num:'제13계',name:'타초경사',desc:'풀을 쳐서 뱀을 놀라게 한다',effect:'적 매복 발견 +35%',category:'공전계'},
{num:'제15계',name:'조호이산',desc:'호랑이를 유인하여 산을 떠나게 한다',effect:'적 장수 유인 효과',category:'혼전계'},
{num:'제19계',name:'부저추신',desc:'아궁이 밑 장작을 뺀다',effect:'적 보급선 차단 -40%',category:'혼전계'},
{num:'제25계',name:'투량환주',desc:'대들보를 훔치고 기둥을 바꾼다',effect:'적 핵심 장수 무력화',category:'병전계'},
{num:'제31계',name:'미인계',desc:'미인을 이용한 계략',effect:'적 사기 -30%',category:'패전계'},
{num:'제36계',name:'주위상',desc:'달아남이 상책이다',effect:'퇴각 시 피해 0%',category:'패전계'}
];
var stratState={used:[]};

function saveStrat(){try{localStorage.setItem('krpg_v18_strat',JSON.stringify(stratState))}catch(e){}}
function loadStrat(){try{var d=JSON.parse(localStorage.getItem('krpg_v18_strat'));if(d){stratState=d}}catch(e){}}

function renderStratPanel(){
var p=makePanel('v18-strat');
p.innerHTML='<h2>📜 삼십육계 모략관</h2><p class="v18-sub">고대 병법의 정수! 계략 카드를 사용하여 전투를 유리하게 이끌어라 (사용: '+stratState.used.length+'/'+STRATAGEMS.length+')</p>';
var grid=document.createElement('div');grid.className='strat-grid';

STRATAGEMS.forEach(function(s,i){
var card=document.createElement('div');card.className='strat-card'+(stratState.used.indexOf(i)>=0?' used':'');
card.innerHTML='<div class="st-num">'+s.num+' · '+s.category+'</div><div class="st-name">'+s.name+'</div><div class="st-desc">'+s.desc+'</div><div class="st-effect">⚡ '+s.effect+'</div>';
if(stratState.used.indexOf(i)<0){
card.onclick=function(){
stratState.used.push(i);v18SFX('strat_use');v18Toast(s.name+' 발동! '+s.effect,'#FF9800');
if(stratState.used.length>=1)v18CheckAch('strat_first');
if(stratState.used.length>=6)v18CheckAch('strat_half');
if(stratState.used.length>=12)v18CheckAch('strat_all');
saveStrat();renderStratPanel();document.getElementById('v18-strat').classList.add('on');
};
}
grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-strat\').classList.remove(\'on\')">닫기</button>';
}

// ─── 7. 고대 무예 수련장 (Ancient Martial Arts) ───
var MARTIAL_ARTS=[
{name:'검술',icon:'⚔️',type:'근접',stat:'ATK+12',desc:'고조선 비파형동검 검술'},
{name:'궁술',icon:'🏹',type:'원거리',stat:'명중+15%',desc:'주몽의 신궁 궁술 전수'},
{name:'창술',icon:'🔱',type:'근접',stat:'ATK+10, 사거리+1',desc:'장창으로 적을 찌르는 기법'},
{name:'격투',icon:'👊',type:'근접',stat:'반격+20%',desc:'맨손 격투와 관절기'},
{name:'승마',icon:'🐴',type:'기동',stat:'이동+3',desc:'기마전사의 기마 기술'},
{name:'방패술',icon:'🛡️',type:'방어',stat:'DEF+15',desc:'큰 방패로 아군을 보호'},
{name:'투석',icon:'🪨',type:'원거리',stat:'범위공격+10%',desc:'투석기 조작과 석탄 투척'},
{name:'기마궁',icon:'🏇',type:'기동',stat:'ATK+8, 이동+2',desc:'말 위에서 활을 쏘는 파르티안 사법'},
{name:'진법',icon:'🎯',type:'전술',stat:'아군DEF+10%',desc:'진형 배치와 대형 전환 기술'},
{name:'도술',icon:'✨',type:'특수',stat:'회복+20',desc:'신선도의 기공과 도술'},
{name:'수전',icon:'⚓',type:'수상',stat:'수상전+30%',desc:'배 위에서의 전투 기술'},
{name:'첩보',icon:'🕵️',type:'특수',stat:'정보+25%',desc:'적진 잠입과 정보 수집'}
];
var martialState={training:{},mastered:[]};

function saveMartial(){try{localStorage.setItem('krpg_v18_martial',JSON.stringify(martialState))}catch(e){}}
function loadMartial(){try{var d=JSON.parse(localStorage.getItem('krpg_v18_martial'));if(d){martialState=d}}catch(e){}}

function renderMartialPanel(){
var p=makePanel('v18-martial');
p.innerHTML='<h2>🥋 고대 무예 수련장</h2><p class="v18-sub">12종 고대 무예를 수련하여 전투력을 강화하라! (마스터: '+martialState.mastered.length+'/'+MARTIAL_ARTS.length+')</p>';
var grid=document.createElement('div');grid.className='martial-grid';

MARTIAL_ARTS.forEach(function(m,i){
var card=document.createElement('div');card.className='martial-card'+(martialState.mastered.indexOf(i)>=0?' mastered':'');
var prog=martialState.training[i]||0;
card.innerHTML='<div class="mc-icon">'+m.icon+'</div><div class="mc-name">'+m.name+'</div><div class="mc-type">'+m.type+'</div><div class="mc-stat">'+m.stat+'</div>'
+(martialState.mastered.indexOf(i)>=0?'<div style="font-size:9px;color:#FFD700;margin-top:4px">✅ 마스터</div>':'<div class="mc-prog"><div class="mc-prog-bar" style="width:'+(prog/5*100)+'%"></div></div><div style="font-size:8px;color:#8a7a6a;margin-top:2px">'+prog+'/5회 수련</div>');

if(martialState.mastered.indexOf(i)<0){
card.onclick=function(){
martialState.training[i]=(martialState.training[i]||0)+1;
if(martialState.training[i]>=5){
martialState.mastered.push(i);v18SFX('martial_train');v18Toast(m.name+' 마스터! '+m.stat,'#FFD700');
if(martialState.mastered.length>=1)v18CheckAch('martial_first');
if(martialState.mastered.length>=6)v18CheckAch('martial_half');
if(martialState.mastered.length>=12)v18CheckAch('martial_all');
}else{v18SFX('martial_train');v18Toast(m.name+' 수련 '+martialState.training[i]+'/5','#FF5FA2');}
saveMartial();renderMartialPanel();document.getElementById('v18-martial').classList.add('on');
};
}
grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-martial\').classList.remove(\'on\')">닫기</button>';
}

// ─── 8. 영토 변천도 (Territory Evolution Canvas) ───
var TERRITORY_ERAS=[
{name:'신시시대',year:'BC 2333~',color:'#4CAF50',regions:[{x:0.45,y:0.3,r:0.08,name:'신시'},{x:0.5,y:0.25,r:0.05,name:'태백산'}],desc:'환웅이 태백산에 신시를 세운 초기 영역. 풍백·우사·운사와 함께 인간세상을 다스림.',area:'약 100리'},
{name:'고조선 초기',year:'BC 2333~1000',color:'#FF9800',regions:[{x:0.45,y:0.3,r:0.12,name:'아사달'},{x:0.5,y:0.2,r:0.06,name:'백두산'},{x:0.4,y:0.4,r:0.07,name:'요동'}],desc:'단군왕검이 아사달에 도읍을 정하고 건국. 요동 지방까지 세력 확장.',area:'약 1,000리'},
{name:'고조선 전성기',year:'BC 1000~300',color:'#FFD700',regions:[{x:0.45,y:0.3,r:0.15,name:'왕검성'},{x:0.3,y:0.35,r:0.1,name:'요서'},{x:0.5,y:0.2,r:0.08,name:'송화강'},{x:0.55,y:0.45,r:0.08,name:'한반도북부'}],desc:'비파형동검 문화권의 최대 영역. 요서~한반도 북부까지 광대한 영토.',area:'약 3,000리'},
{name:'위만조선',year:'BC 194~108',color:'#5FA0FF',regions:[{x:0.5,y:0.3,r:0.12,name:'왕검성'},{x:0.45,y:0.4,r:0.08,name:'요동'},{x:0.55,y:0.45,r:0.06,name:'낙랑'}],desc:'위만이 정권을 찬탈한 후의 영역. 중국 유민 유입, 철기문화 발전.',area:'약 2,000리'},
{name:'부여·삼한',year:'BC 200~AD 100',color:'#aa88ff',regions:[{x:0.5,y:0.2,r:0.1,name:'부여'},{x:0.55,y:0.5,r:0.06,name:'마한'},{x:0.62,y:0.5,r:0.05,name:'변한'},{x:0.6,y:0.45,r:0.05,name:'진한'},{x:0.45,y:0.35,r:0.06,name:'고구려초기'}],desc:'고조선 해체 후 여러 세력으로 분화. 부여·고구려·삼한이 각축.',area:'다국가 병립'},
{name:'삼국시대 초기',year:'BC 37~AD 200',color:'#FF5FA2',regions:[{x:0.48,y:0.28,r:0.12,name:'고구려'},{x:0.52,y:0.5,r:0.08,name:'백제'},{x:0.6,y:0.5,r:0.07,name:'신라'},{x:0.63,y:0.55,r:0.04,name:'가야'}],desc:'주몽의 고구려, 온조의 백제, 박혁거세의 신라가 정립. 삼국시대 개막.',area:'한반도+만주'}
];
var terrEra=0;

function drawTerritoryCanvas(canvas){
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a1e';ctx.fillRect(0,0,W,H);
ctx.strokeStyle='#1a2a3a';ctx.lineWidth=0.5;
for(var i=0;i<20;i++){ctx.beginPath();ctx.moveTo(i*W/20,0);ctx.lineTo(i*W/20,H);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i*H/20);ctx.lineTo(W,i*H/20);ctx.stroke();}
ctx.fillStyle='#1a3a2a';ctx.beginPath();ctx.moveTo(W*0.25,H*0.1);ctx.lineTo(W*0.75,H*0.1);ctx.lineTo(W*0.8,H*0.3);ctx.lineTo(W*0.7,H*0.5);ctx.lineTo(W*0.65,H*0.7);ctx.lineTo(W*0.6,H*0.85);ctx.lineTo(W*0.55,H*0.9);ctx.lineTo(W*0.45,H*0.85);ctx.lineTo(W*0.4,H*0.7);ctx.lineTo(W*0.35,H*0.5);ctx.lineTo(W*0.2,H*0.3);ctx.closePath();ctx.fill();
ctx.strokeStyle='#2a4a3a';ctx.lineWidth=1;ctx.stroke();
ctx.fillStyle='#0a1a2a';ctx.beginPath();ctx.moveTo(W*0.1,H*0.15);ctx.lineTo(W*0.25,H*0.1);ctx.lineTo(W*0.2,H*0.4);ctx.lineTo(W*0.1,H*0.5);ctx.closePath();ctx.fill();ctx.stroke();

var era=TERRITORY_ERAS[terrEra];
era.regions.forEach(function(r){
ctx.fillStyle=era.color+'44';ctx.beginPath();ctx.arc(W*r.x,H*r.y,W*r.r,0,Math.PI*2);ctx.fill();
ctx.strokeStyle=era.color;ctx.lineWidth=2;ctx.stroke();
ctx.fillStyle=era.color;ctx.beginPath();ctx.arc(W*r.x,H*r.y,3,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#e8dcc8';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.fillText(r.name,W*r.x,H*r.y-W*r.r-6);
});

ctx.fillStyle=era.color;ctx.font='bold 13px sans-serif';ctx.textAlign='center';
ctx.fillText(era.name+' ('+era.year+')',W/2,H*0.96);
}

function renderTerritoryPanel(){
var p=makePanel('v18-territory');
p.innerHTML='<h2>🗺️ 영토 변천도</h2><p class="v18-sub">시대별로 변화하는 한국 고대사의 영토를 살펴보라!</p>';
var wrap=document.createElement('div');wrap.className='territory-wrap';

var canvas=document.createElement('canvas');canvas.width=480;canvas.height=400;
wrap.appendChild(canvas);
drawTerritoryCanvas(canvas);

var btns=document.createElement('div');btns.className='terr-era-btns';
TERRITORY_ERAS.forEach(function(e,i){
var btn=document.createElement('button');btn.className='te-btn'+(terrEra===i?' selected':'');
btn.textContent=e.name;
btn.onclick=function(){terrEra=i;v18SFX('territory_view');renderTerritoryPanel();document.getElementById('v18-territory').classList.add('on');
if(i>=5)v18CheckAch('territory_all');};
btns.appendChild(btn);
});
wrap.appendChild(btns);

var info=document.createElement('div');info.className='terr-info';
var era=TERRITORY_ERAS[terrEra];
info.innerHTML='<strong>'+era.name+'</strong> ('+era.year+')<br>'+era.desc+'<br>영역: <strong>'+era.area+'</strong>';
wrap.appendChild(info);
p.appendChild(wrap);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-territory\').classList.remove(\'on\')">닫기</button>';
}

// ─── Quiz v18 (+15 questions, 150→165) ───
var V18_QUIZ=[
{q:'일기토에서 1:1 결투를 벌이는 영걸전의 핵심 시스템은?',a:['일기토','단체전','진형전','궁술전'],c:0},
{q:'고조선의 대표적 무기인 비파형동검은 어떤 금속으로 만들어졌는가?',a:['청동','철','금','은'],c:0},
{q:'삼십육계에서 &quot;하늘을 가리고 바다를 건넌다&quot;는 계략은?',a:['만천과해','성동격서','미인계','소리장도'],c:0},
{q:'환웅이 신시를 세운 산은?',a:['태백산','백두산','금강산','지리산'],c:0},
{q:'고조선의 수도 아사달의 추정 위치가 아닌 곳은?',a:['제주도','평양','요동','하얼빈'],c:0},
{q:'불가사의 &quot;반구대 암각화&quot;가 있는 지역은?',a:['울산','경주','부여','서울'],c:0},
{q:'공성전에서 성문을 부수는 데 사용하는 무기는?',a:['충차','투석기','운제','노포'],c:0},
{q:'부여의 12월 제천행사 이름은?',a:['영고','동맹','무천','10월제'],c:0},
{q:'삼한의 신성구역으로 죄인도 잡아갈 수 없었던 곳은?',a:['소도','서원','태학','향교'],c:0},
{q:'주몽이 건국한 나라는?',a:['고구려','백제','신라','가야'],c:0},
{q:'광개토대왕의 업적을 기록한 비석이 있는 곳은?',a:['집안','평양','서울','경주'],c:0},
{q:'위만조선을 세운 위만의 출신지는?',a:['연나라','진나라','한나라','초나라'],c:0},
{q:'온조가 세운 백제의 첫 수도는?',a:['위례성','웅진','사비','한성'],c:0},
{q:'고조선의 법률 8조 중 전해지는 조항 수는?',a:['3조','5조','8조','1조'],c:0},
{q:'환웅이 인간세상에 올 때 데려온 무리의 수는?',a:['3,000명','1,000명','5,000명','100명'],c:0}
];

function registerV18Quiz(){
try{
var existing=JSON.parse(localStorage.getItem('krpg_quiz_pool'))||[];
var ids=existing.map(function(q){return q.q});
V18_QUIZ.forEach(function(q){if(ids.indexOf(q.q)<0)existing.push(q)});
localStorage.setItem('krpg_quiz_pool',JSON.stringify(existing));
}catch(e){}
if(typeof window.registerQuiz==='function'){window.registerQuiz(V18_QUIZ,'v18');}
}

// ─── Achievements (+12, 96→108) ───
var V18_ACH=[
{id:'duel_first',name:'첫 일기토',desc:'일기토에서 첫 승리'},
{id:'duel_master',name:'일기토 달인',desc:'일기토 10승 달성'},
{id:'duel_streak',name:'연전연승',desc:'일기토 5연승 달성'},
{id:'wonder_first',name:'첫 불가사의',desc:'불가사의 1개 건설 완료'},
{id:'wonder_all',name:'문명의 건설자',desc:'모든 불가사의 건설 완료'},
{id:'siege_first',name:'첫 공성전',desc:'공성전 첫 승리'},
{id:'siege_master',name:'공성 달인',desc:'공성전 5승 달성'},
{id:'quest_first',name:'영웅의 시작',desc:'영웅 개인서사 1개 완료'},
{id:'quest_all',name:'서사의 주인공',desc:'모든 영웅 서사 완료'},
{id:'strat_first',name:'모략의 시작',desc:'계략 카드 1개 사용'},
{id:'martial_first',name:'무예 입문',desc:'무예 1종 마스터'},
{id:'territory_all',name:'영토 학자',desc:'모든 시대 영토 확인'}
];

var v18AchState=[];
function loadV18Ach(){try{v18AchState=JSON.parse(localStorage.getItem('krpg_v18_ach'))||[]}catch(e){v18AchState=[]}}
function saveV18Ach(){try{localStorage.setItem('krpg_v18_ach',JSON.stringify(v18AchState))}catch(e){}}

function v18CheckAch(id){
if(v18AchState.indexOf(id)>=0)return;
v18AchState.push(id);saveV18Ach();
var a=null;V18_ACH.forEach(function(ac){if(ac.id===id)a=ac});
if(a){v18Toast('🏆 업적 달성: '+a.name,'#FFD700');v18SFX('quest_done');}
try{
var global=JSON.parse(localStorage.getItem('krpg_ach'))||[];
if(global.indexOf('v18_'+id)<0){global.push('v18_'+id);localStorage.setItem('krpg_ach',JSON.stringify(global));}
}catch(e){}
}

// ─── Keyboard Shortcuts (8: Shift+F/G/H/I/K/L/N/O) ───
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
var map={
'KeyF':['v18-duel',renderDuelPanel],
'KeyG':['v18-wonder',renderWonderPanel],
'KeyH':['v18-siege',renderSiegePanel],
'KeyI':['v18-quest',renderQuestPanel],
'KeyK':['v18-supply',renderSupplyPanel],
'KeyL':['v18-strat',renderStratPanel],
'KeyN':['v18-martial',renderMartialPanel],
'KeyO':['v18-territory',renderTerritoryPanel]
};
if(map[e.code]){
e.preventDefault();var id=map[e.code][0],fn=map[e.code][1];
var el=document.getElementById(id);
if(el&&el.classList.contains('on')){el.classList.remove('on');}
else{fn();document.getElementById(id).classList.add('on');}
}
});

// ─── Quick Action Nav Bar (append to v17 bar or create new) ───
function addV18NavBar(){
var existing=document.getElementById('v18-nav-bar');
if(existing)existing.remove();
var bar=document.createElement('div');
bar.id='v18-nav-bar';
bar.style.cssText='position:fixed;bottom:42px;left:0;right:0;z-index:126;display:flex;gap:0;overflow-x:auto;background:rgba(10,6,8,.92);border-top:1px solid #4a3a2a;padding:4px 8px;-webkit-overflow-scrolling:touch;scrollbar-width:none';

var actions=[
{label:'⚔️',title:'일기토',fn:function(){renderDuelPanel();document.getElementById('v18-duel').classList.add('on')}},
{label:'🏛️',title:'불가사의',fn:function(){renderWonderPanel();document.getElementById('v18-wonder').classList.add('on')}},
{label:'🏰',title:'공성전',fn:function(){renderSiegePanel();document.getElementById('v18-siege').classList.add('on')}},
{label:'📖',title:'서사',fn:function(){renderQuestPanel();document.getElementById('v18-quest').classList.add('on')}},
{label:'🌾',title:'병참',fn:function(){renderSupplyPanel();document.getElementById('v18-supply').classList.add('on')}},
{label:'📜',title:'모략',fn:function(){renderStratPanel();document.getElementById('v18-strat').classList.add('on')}},
{label:'🥋',title:'무예',fn:function(){renderMartialPanel();document.getElementById('v18-martial').classList.add('on')}},
{label:'🗺️',title:'영토',fn:function(){renderTerritoryPanel();document.getElementById('v18-territory').classList.add('on')}}
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
function v18Init(){
loadDuel();loadWonders();loadSiege();loadQuests();loadSupply();loadStrat();loadMartial();loadV18Ach();registerV18Quiz();
setTimeout(addV18NavBar,2500);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',v18Init);}
else{v18Init();}

window._v18={
DUEL_HEROES:DUEL_HEROES,WONDERS:WONDERS,SIEGE_WEAPONS:SIEGE_WEAPONS,HERO_QUESTS:HERO_QUESTS,
SUPPLY_TYPES:SUPPLY_TYPES,STRATAGEMS:STRATAGEMS,MARTIAL_ARTS:MARTIAL_ARTS,TERRITORY_ERAS:TERRITORY_ERAS,
V18_QUIZ:V18_QUIZ,V18_ACH:V18_ACH,duelState:duelState,v18SFX:v18SFX
};
})();
