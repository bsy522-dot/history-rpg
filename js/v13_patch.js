// v13_patch.js — 한국사 영웅전 v13.0 Enhancement Patch
// Equipment Enhancement + Hero Talents + Formation Presets + Hero Chronicles + Battle Stats Dashboard + Archery Minigame + Quiz + Achievements + SFX
(function(){
'use strict';

// =============================================
// SECTION 1: CSS INJECTION
// =============================================
var css=document.createElement('style');
css.textContent=[
'.v13-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:120;overflow-y:auto;padding:16px}',
'.v13-overlay.on{display:block}',
'.v13-overlay h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v13-close{position:fixed;top:10px;right:14px;z-index:130;width:36px;height:36px;border-radius:50%;border:1px solid #5a3a1a;background:#1a1428;color:#FFD700;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center}',
'.v13-close:hover{border-color:#FFD700;transform:scale(1.1)}',
'.v13-wrap{max-width:520px;margin:0 auto}',

'#v13-enhance h2::after{content:" \\2694\\FE0F";font-size:16px}',
'.enh-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}',
'.enh-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:12px;text-align:center;cursor:pointer;transition:all .3s}',
'.enh-card:hover{border-color:#c4956a;transform:translateY(-2px)}',
'.enh-card .enh-icon{font-size:28px;margin-bottom:4px}',
'.enh-card .enh-name{font-size:11px;font-weight:700;color:#FFD700;margin-bottom:2px}',
'.enh-card .enh-lv{font-size:10px;color:#88aa88}',
'.enh-card .enh-stats{font-size:9px;color:#8a7a6a;margin-top:4px;line-height:1.6}',
'.enh-detail{background:rgba(26,20,40,.95);border:2px solid #c4956a;border-radius:12px;padding:20px;margin:12px auto;max-width:400px;display:none}',
'.enh-detail.on{display:block}',
'.enh-detail h3{color:#FFD700;font-size:15px;text-align:center;margin-bottom:8px}',
'.enh-bar{height:8px;background:#1a1a2e;border-radius:4px;overflow:hidden;margin:6px 0}',
'.enh-bar-fill{height:100%;border-radius:4px;transition:width .5s}',
'.enh-btn{display:block;width:100%;padding:10px;border:1px solid #5a3a1a;border-radius:6px;background:linear-gradient(180deg,#3a2a18,#2a1a08);color:#FFD700;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;margin-top:8px}',
'.enh-btn:hover{border-color:#FFD700;background:linear-gradient(180deg,#5a3a18,#3a2a08)}',
'.enh-btn:disabled{opacity:.4;cursor:not-allowed}',
'.enh-result{text-align:center;font-size:14px;font-weight:700;margin-top:8px;min-height:24px}',
'.enh-success{color:#4f4;animation:v13pop .5s}',
'.enh-fail{color:#f44;animation:v13shake .4s}',
'@keyframes v13pop{0%{transform:scale(0.5);opacity:0}50%{transform:scale(1.3)}100%{transform:scale(1);opacity:1}}',
'@keyframes v13shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}',

'#v13-talents h2::after{content:" \\1F31F";font-size:16px}',
'.tal-hero-sel{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:12px}',
'.tal-hero-btn{padding:6px 12px;border:1px solid #3a3a4a;border-radius:6px;background:#1a1428;color:#e8dcc8;font-family:inherit;font-size:11px;cursor:pointer;font-weight:700}',
'.tal-hero-btn.active{border-color:#FFD700;background:#2a1a38;color:#FFD700}',
'.tal-tree{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
'.tal-branch{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:12px}',
'.tal-branch h4{font-size:12px;margin-bottom:6px;display:flex;align-items:center;gap:4px}',
'.tal-node{display:flex;align-items:center;gap:6px;padding:6px;margin:4px 0;border:1px solid #2a2438;border-radius:6px;cursor:pointer;transition:all .2s}',
'.tal-node:hover{border-color:#5a4a6a}',
'.tal-node.unlocked{border-color:#4a8a4a;background:rgba(42,90,42,.12)}',
'.tal-node.locked{opacity:.5}',
'.tal-node-icon{font-size:18px}',
'.tal-node-info{flex:1}',
'.tal-node-name{font-size:10px;font-weight:700;color:#e8dcc8}',
'.tal-node-desc{font-size:9px;color:#8a7a6a}',
'.tal-points{text-align:center;font-size:12px;color:#FFD700;margin:8px 0;font-weight:700}',

'#v13-formation h2::after{content:" \\2694\\FE0F";font-size:16px}',
'.fmt-grid{display:grid;grid-template-columns:1fr;gap:10px}',
'.fmt-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:10px;padding:14px;cursor:pointer;transition:all .3s}',
'.fmt-card:hover{border-color:#c4956a;transform:translateY(-2px)}',
'.fmt-card.active{border-color:#FFD700;background:rgba(42,36,56,.9)}',
'.fmt-card h3{font-size:13px;color:#FFD700;margin-bottom:4px;display:flex;align-items:center;gap:6px}',
'.fmt-card p{font-size:10px;color:#8a7a6a;line-height:1.7}',
'.fmt-card .fmt-bonus{font-size:10px;color:#88aa88;margin-top:6px;padding:6px;background:rgba(42,90,42,.12);border:1px solid rgba(42,90,42,.25);border-radius:6px}',
'.fmt-canvas{display:block;margin:8px auto;border:1px solid #3a3a4a;border-radius:6px}',

'#v13-chronicles h2::after{content:" \\1F4DC";font-size:16px}',
'.chr-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px}',
'.chr-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:14px;text-align:center;cursor:pointer;transition:all .3s}',
'.chr-card:hover{border-color:#FFD700;transform:translateY(-2px)}',
'.chr-icon{font-size:36px;margin-bottom:6px}',
'.chr-name{font-size:12px;font-weight:700;color:#FFD700;margin-bottom:2px}',
'.chr-title{font-size:9px;color:#c4956a}',
'.chr-detail{background:linear-gradient(180deg,#2a1a3a,#1a1428);border:2px solid #c4956a;border-radius:12px;padding:20px;margin:12px auto;max-width:440px;display:none}',
'.chr-detail.on{display:block}',
'.chr-detail h3{font-size:16px;color:#FFD700;text-align:center;margin-bottom:4px}',
'.chr-detail .chr-sub{font-size:11px;color:#c4956a;text-align:center;margin-bottom:10px}',
'.chr-detail .chr-bio{font-size:12px;color:#e8dcc8;line-height:2;margin-bottom:10px}',
'.chr-detail .chr-ability{font-size:11px;color:#88aa88;padding:8px;background:rgba(42,90,42,.12);border:1px solid rgba(42,90,42,.25);border-radius:6px}',

'#v13-battlestats h2::after{content:" \\1F4CA";font-size:16px}',
'.bs-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px}',
'.bs-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:12px;text-align:center}',
'.bs-card .bs-val{font-size:22px;font-weight:900;color:#FFD700}',
'.bs-card .bs-lbl{font-size:10px;color:#8a7a6a;margin-top:2px}',
'.bs-canvas{display:block;margin:0 auto;border:1px solid #3a3a4a;border-radius:8px}',
'.bs-section{margin-top:12px}',
'.bs-section h3{font-size:13px;color:#c4956a;margin-bottom:8px;text-align:center}',
'.bs-mvp{display:flex;align-items:center;gap:12px;background:rgba(42,36,56,.6);border:1px solid #5a4a6a;border-radius:8px;padding:12px;margin:8px auto;max-width:300px}',
'.bs-mvp-icon{font-size:32px}',
'.bs-mvp-info{flex:1}',
'.bs-mvp-name{font-size:13px;font-weight:700;color:#FFD700}',
'.bs-mvp-stat{font-size:10px;color:#8a7a6a}',

'#v13-archery h2::after{content:" \\1F3AF";font-size:16px}',
'.arc-canvas{display:block;margin:0 auto;border:2px solid #5a3a1a;border-radius:8px;background:#1a2a1a;touch-action:none}',
'.arc-hud{display:flex;gap:12px;justify-content:center;margin:8px 0;flex-wrap:wrap}',
'.arc-hud span{font-size:12px;font-weight:700;padding:4px 12px;border:1px solid #3a3a4a;border-radius:6px;background:rgba(26,20,40,.9)}',
'.arc-hud .arc-score{color:#FFD700}',
'.arc-hud .arc-wind{color:#5fa0ff}',
'.arc-hud .arc-arrows{color:#ff5fa2}',
'.arc-start{display:block;width:200px;margin:12px auto;padding:12px;border:2px solid #5a3a1a;border-radius:8px;background:linear-gradient(180deg,#3a2a18,#2a1a08);color:#FFD700;font-family:inherit;font-size:14px;font-weight:700;cursor:pointer}',
'.arc-start:hover{border-color:#FFD700}',
'.arc-result{text-align:center;margin:8px 0;min-height:24px}',
'.arc-rank{font-size:16px;font-weight:900}',
'.arc-rank-s{color:#FFD700}',
'.arc-rank-a{color:#FF5FA2}',
'.arc-rank-b{color:#5FA0FF}',
'.arc-rank-c{color:#aa88ff}',
'.arc-rank-d{color:#8a7a6a}',

'.v13-menu-btns{position:fixed;top:44px;left:4px;z-index:55;display:flex;flex-direction:column;gap:3px}',
'.v13-mbtn{width:32px;height:32px;border-radius:6px;border:1px solid #3a3a4a;background:rgba(26,20,40,.85);color:#e8dcc8;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}',
'.v13-mbtn:hover{border-color:#FFD700;transform:scale(1.1)}',
'.v13-toast{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(26,20,40,.95);border:2px solid #c4956a;border-radius:12px;padding:16px 24px;z-index:200;font-size:14px;font-weight:700;color:#FFD700;text-align:center;display:none;animation:v13pop .5s}',
'.v13-toast.on{display:block}'
].join('\n');
document.head.appendChild(css);

// =============================================
// SECTION 2: WEB AUDIO SFX
// =============================================
var actx=null;
function getACtx(){if(!actx){try{actx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}return actx}
function sfx(type){
var a=getACtx();if(!a)return;
var o=a.createOscillator(),g=a.createGain(),now=a.currentTime;
g.connect(a.destination);o.connect(g);
switch(type){
case'enhance_success':o.frequency.setValueAtTime(523,now);o.frequency.linearRampToValueAtTime(1047,now+.15);g.gain.setValueAtTime(.25,now);g.gain.linearRampToValueAtTime(0,now+.3);o.type='triangle';o.start(now);o.stop(now+.3);break;
case'enhance_fail':o.frequency.setValueAtTime(220,now);o.frequency.linearRampToValueAtTime(110,now+.25);g.gain.setValueAtTime(.2,now);g.gain.linearRampToValueAtTime(0,now+.3);o.type='sawtooth';o.start(now);o.stop(now+.3);break;
case'talent_unlock':o.frequency.setValueAtTime(659,now);o.frequency.setValueAtTime(784,now+.1);o.frequency.setValueAtTime(1047,now+.2);g.gain.setValueAtTime(.2,now);g.gain.linearRampToValueAtTime(0,now+.35);o.type='sine';o.start(now);o.stop(now+.35);break;
case'formation_set':o.frequency.setValueAtTime(440,now);o.frequency.linearRampToValueAtTime(660,now+.12);g.gain.setValueAtTime(.18,now);g.gain.linearRampToValueAtTime(0,now+.2);o.type='square';o.start(now);o.stop(now+.2);break;
case'arrow_shoot':o.frequency.setValueAtTime(880,now);o.frequency.linearRampToValueAtTime(220,now+.15);g.gain.setValueAtTime(.3,now);g.gain.linearRampToValueAtTime(0,now+.2);o.type='sawtooth';o.start(now);o.stop(now+.2);break;
case'arrow_hit':o.frequency.setValueAtTime(150,now);g.gain.setValueAtTime(.3,now);g.gain.linearRampToValueAtTime(0,now+.1);o.type='square';o.start(now);o.stop(now+.1);var o2=a.createOscillator(),g2=a.createGain();g2.connect(a.destination);o2.connect(g2);o2.frequency.setValueAtTime(600,now+.05);g2.gain.setValueAtTime(.15,now+.05);g2.gain.linearRampToValueAtTime(0,now+.2);o2.type='triangle';o2.start(now+.05);o2.stop(now+.2);break;
}
}

// =============================================
// SECTION 3: EQUIPMENT ENHANCEMENT DATA
// =============================================
var ENH_RATES=[100,95,90,80,70,55,40,25,15,8];
var ENH_COSTS=[50,80,120,180,260,360,500,700,1000,1500];
var ENH_BONUS=[
{atk:1},{atk:2},{atk:3,def:1},{atk:4,def:2},{atk:6,def:3,spd:1},
{atk:8,def:4,spd:1},{atk:10,def:5,spd:2},{atk:13,def:7,spd:2},{atk:16,def:9,spd:3},{atk:20,def:12,spd:4}
];

function getEnhData(){
try{return JSON.parse(localStorage.getItem('krpg_enhance'))||{}}catch(e){return{}}
}
function saveEnhData(d){localStorage.setItem('krpg_enhance',JSON.stringify(d))}

function getEquipList(){
if(typeof ITEMS==='undefined')return[];
var list=[];
for(var k in ITEMS){
if(ITEMS[k].t==='weapon'||ITEMS[k].t==='armor'||ITEMS[k].t==='accessory'){
list.push({id:k,name:ITEMS[k].n,type:ITEMS[k].t,atk:ITEMS[k].atk||0,def:ITEMS[k].def||0,spd:ITEMS[k].spd||0,desc:ITEMS[k].d||''});
}
}
if(list.length===0){
list=[
{id:'bronze_sword',name:'동검(비파형)',type:'weapon',atk:5,def:0,spd:0,desc:'고조선 대표 무기'},
{id:'bronze_spear',name:'동창',type:'weapon',atk:7,def:-1,spd:0,desc:'긴 창'},
{id:'horn_bow',name:'각궁',type:'weapon',atk:6,def:0,spd:2,desc:'뿔로 만든 활'},
{id:'sehyung_sword',name:'세형동검',type:'weapon',atk:10,def:0,spd:1,desc:'세형동검'},
{id:'bronze_axe',name:'청동도끼',type:'weapon',atk:14,def:0,spd:-2,desc:'무거운 청동 도끼'},
{id:'spirit_bow',name:'신궁',type:'weapon',atk:11,def:0,spd:3,desc:'신시의 명궁'},
{id:'leather_armor',name:'가죽갑옷',type:'armor',atk:0,def:5,spd:0,desc:'기본 방어구'},
{id:'bronze_armor',name:'청동갑',type:'armor',atk:0,def:10,spd:-1,desc:'청동 갑옷'},
{id:'iron_armor',name:'철갑',type:'armor',atk:0,def:15,spd:-2,desc:'단단한 철 갑옷'},
{id:'tiger_pelt',name:'호피갑',type:'armor',atk:2,def:8,spd:1,desc:'호랑이 가죽'},
{id:'jade_ring',name:'곡옥반지',type:'accessory',atk:0,def:0,spd:3,desc:'속도 증가'},
{id:'bear_charm',name:'곰 부적',type:'accessory',atk:3,def:3,spd:0,desc:'곰의 힘이 깃든 부적'}
];
}
return list;
}

function renderEnhance(){
var el=document.getElementById('v13-enhance');if(!el)return;
var data=getEnhData();
var list=getEquipList();
var gold=(typeof G!=='undefined'&&G.party?G.party.reduce(function(s,c){return s+(c.gold||0)},0):0);
try{var st=JSON.parse(localStorage.getItem('krpg_stats'))||{};gold=gold||st.gold||500}catch(e){gold=500}
var icons={weapon:'⚔️',armor:'🛡️',accessory:'💍'};
var h='<div class="v13-wrap">';
h+='<p style="text-align:center;font-size:12px;color:#FFD700;margin-bottom:12px">💰 보유 금화: <b id="enh-gold">'+gold+'</b>G</p>';
h+='<div class="enh-grid">';
list.forEach(function(item){
var lv=data[item.id]||0;
h+='<div class="enh-card" onclick="window._v13.showEnhDetail(\''+item.id+'\')">';
h+='<div class="enh-icon">'+(icons[item.type]||'⚔️')+'</div>';
h+='<div class="enh-name">'+item.name+(lv>0?' <span style="color:#4f4">+'+lv+'</span>':'')+'</div>';
h+='<div class="enh-lv">'+(lv>0?'⭐'.repeat(Math.min(lv,5))+(lv>5?'+':''):'미강화')+'</div>';
h+='<div class="enh-stats">';
if(item.atk)h+='공격+'+item.atk;
if(item.def>0)h+=' 방어+'+item.def;
if(item.spd>0)h+=' 속도+'+item.spd;
if(lv>0){var b=ENH_BONUS[lv-1];h+='<br>강화: 공+'+(b.atk||0)+' 방+'+(b.def||0)+' 속+'+(b.spd||0)}
h+='</div></div>';
});
h+='</div><div class="enh-detail" id="enh-detail"></div></div>';
el.querySelector('.v13-wrap').innerHTML=h;
}

function showEnhDetail(itemId){
var det=document.getElementById('enh-detail');if(!det)return;
var list=getEquipList();
var item=null;list.forEach(function(i){if(i.id===itemId)item=i});
if(!item){det.classList.remove('on');return}
var data=getEnhData();
var lv=data[itemId]||0;
if(lv>=10){
det.innerHTML='<h3>'+item.name+' +'+lv+'</h3><p style="text-align:center;color:#FFD700;font-size:13px">최대 강화 달성! ✨</p>';
det.classList.add('on');return;
}
var rate=ENH_RATES[lv];
var cost=ENH_COSTS[lv];
var nextBonus=ENH_BONUS[lv];
var h='<h3>'+item.name+(lv>0?' +'+lv:'')+'</h3>';
h+='<p style="font-size:11px;color:#e8dcc8;text-align:center;margin-bottom:8px">'+item.desc+'</p>';
h+='<p style="font-size:11px;color:#8a7a6a;text-align:center">다음 단계: +'+(lv+1)+' → 공+'+(nextBonus.atk||0)+' 방+'+(nextBonus.def||0)+' 속+'+(nextBonus.spd||0)+'</p>';
h+='<div class="enh-bar"><div class="enh-bar-fill" style="width:'+rate+'%;background:linear-gradient(90deg,'+(rate>50?'#4a8a4a':'#8a4a2a')+','+(rate>50?'#6aba6a':'#ba6a3a')+')"></div></div>';
h+='<p style="text-align:center;font-size:10px;color:'+(rate>50?'#88aa88':'#aa6644')+'">성공확률: '+rate+'% | 비용: '+cost+'G</p>';
h+='<button class="enh-btn" onclick="window._v13.doEnhance(\''+itemId+'\')">⚔️ 강화하기 ('+cost+'G)</button>';
h+='<div class="enh-result" id="enh-result"></div>';
det.innerHTML=h;
det.classList.add('on');
det.dataset.item=itemId;
}

function doEnhance(itemId){
var data=getEnhData();
var lv=data[itemId]||0;
if(lv>=10)return;
var cost=ENH_COSTS[lv];
var rate=ENH_RATES[lv];
var st;try{st=JSON.parse(localStorage.getItem('krpg_stats'))||{}}catch(e){st={}}
var gold=st.gold||500;
if(gold<cost){
document.getElementById('enh-result').innerHTML='<span class="enh-fail">금화가 부족합니다!</span>';
return;
}
st.gold=gold-cost;
localStorage.setItem('krpg_stats',JSON.stringify(st));
var success=Math.random()*100<rate;
if(success){
data[itemId]=lv+1;
saveEnhData(data);
sfx('enhance_success');
document.getElementById('enh-result').innerHTML='<span class="enh-success">✨ 강화 성공! +'+(lv+1)+'</span>';
checkAch('enhance_first');
if(lv+1>=5)checkAch('enhance_5');
if(lv+1>=10)checkAch('enhance_max');
}else{
sfx('enhance_fail');
document.getElementById('enh-result').innerHTML='<span class="enh-fail">❌ 강화 실패...</span>';
}
var ge=document.getElementById('enh-gold');if(ge)ge.textContent=st.gold;
setTimeout(function(){showEnhDetail(itemId);renderEnhance()},1200);
}

// =============================================
// SECTION 4: HERO TALENT TREE
// =============================================
var TALENT_TREES={
'궁병':{name:'궁병',branches:[
{name:'공격',icon:'⚔️',color:'#aa4444',talents:[
{id:'atk1',name:'정밀 사격',desc:'공격력 +3',stat:{atk:3},req:null},
{id:'atk2',name:'관통사',desc:'공격력 +5, 사거리 +1',stat:{atk:5},req:'atk1'},
{id:'atk3',name:'난사',desc:'크리티컬 +15%',stat:{crit:15},req:'atk2'}
]},
{name:'방어',icon:'🛡️',color:'#4444aa',talents:[
{id:'def1',name:'경갑 수련',desc:'방어력 +3',stat:{def:3},req:null},
{id:'def2',name:'회피 사격',desc:'회피률 +10%',stat:{eva:10},req:'def1'}
]},
{name:'지원',icon:'💚',color:'#44aa44',talents:[
{id:'sup1',name:'원거리 지원',desc:'MP +10',stat:{mp:10},req:null},
{id:'sup2',name:'연합 사격',desc:'팀버프 +5%',stat:{team:5},req:'sup1'}
]},
{name:'특수',icon:'✨',color:'#aa88ff',talents:[
{id:'spc1',name:'속사',desc:'이동력 +1',stat:{mov:1},req:null},
{id:'spc2',name:'연사',desc:'스킬 데미지 +20%',stat:{skdmg:20},req:'spc1'}
]}
]},
'보병':{name:'보병',branches:[
{name:'공격',icon:'⚔️',color:'#aa4444',talents:[
{id:'atk1',name:'강타 수련',desc:'공격력 +4',stat:{atk:4},req:null},
{id:'atk2',name:'대지 분쇄',desc:'범위 데미지 +15%',stat:{aoe:15},req:'atk1'}
]},
{name:'방어',icon:'🛡️',color:'#4444aa',talents:[
{id:'def1',name:'무거운 갑옷',desc:'방어력 +5',stat:{def:5},req:null},
{id:'def2',name:'철벽',desc:'방어력 +8, 이동력 -1',stat:{def:8,mov:-1},req:'def1'},
{id:'def3',name:'불굴의 의지',desc:'HP 20% 이하시 방어 2배',stat:{laststand:1},req:'def2'}
]},
{name:'지원',icon:'💚',color:'#44aa44',talents:[
{id:'sup1',name:'방패 방어',desc:'인접 아군 방어 +3',stat:{aura_def:3},req:null}
]},
{name:'특수',icon:'✨',color:'#aa88ff',talents:[
{id:'spc1',name:'돌파',desc:'기절 확률 +15%',stat:{stun:15},req:null}
]}
]},
'기마병':{name:'기마병',branches:[
{name:'공격',icon:'⚔️',color:'#aa4444',talents:[
{id:'atk1',name:'돌격 강화',desc:'돌격 데미지 +20%',stat:{charge:20},req:null},
{id:'atk2',name:'철기 돌파',desc:'공격력 +6',stat:{atk:6},req:'atk1'}
]},
{name:'방어',icon:'🛡️',color:'#4444aa',talents:[
{id:'def1',name:'기마 회피',desc:'회피률 +12%',stat:{eva:12},req:null}
]},
{name:'지원',icon:'💚',color:'#44aa44',talents:[
{id:'sup1',name:'전장 지휘',desc:'범위 버프 효과 +10%',stat:{buffpow:10},req:null}
]},
{name:'특수',icon:'✨',color:'#aa88ff',talents:[
{id:'spc1',name:'빠른 기동',desc:'이동력 +2',stat:{mov:2},req:null},
{id:'spc2',name:'전격',desc:'철수 후 추가 이동',stat:{retreat:1},req:'spc1'}
]}
]}
};
var DEFAULT_TALENT_TREE={name:'기본',branches:[
{name:'공격',icon:'⚔️',color:'#aa4444',talents:[{id:'atk1',name:'강화',desc:'공격력 +3',stat:{atk:3},req:null}]},
{name:'방어',icon:'🛡️',color:'#4444aa',talents:[{id:'def1',name:'강인',desc:'방어력 +3',stat:{def:3},req:null}]},
{name:'지원',icon:'💚',color:'#44aa44',talents:[{id:'sup1',name:'회복',desc:'HP +15',stat:{hp:15},req:null}]},
{name:'특수',icon:'✨',color:'#aa88ff',talents:[{id:'spc1',name:'민첩',desc:'속도 +2',stat:{spd:2},req:null}]}
]};

function getTalentData(){try{return JSON.parse(localStorage.getItem('krpg_talents'))||{}}catch(e){return{}}}
function saveTalentData(d){localStorage.setItem('krpg_talents',JSON.stringify(d))}
function getTalentPoints(){try{var st=JSON.parse(localStorage.getItem('krpg_stats'))||{};return st.talentPoints||3}catch(e){return 3}}
function setTalentPoints(n){try{var st=JSON.parse(localStorage.getItem('krpg_stats'))||{};st.talentPoints=n;localStorage.setItem('krpg_stats',JSON.stringify(st))}catch(e){}}

var currentTalentHero='궁병';

function renderTalents(){
var el=document.getElementById('v13-talents');if(!el)return;
var data=getTalentData();
var pts=getTalentPoints();
var heroClasses=Object.keys(TALENT_TREES);
var h='<div class="v13-wrap">';
h+='<div class="tal-points">특성 포인트: <span id="tal-pts">'+pts+'</span>P</div>';
h+='<div class="tal-hero-sel">';
heroClasses.forEach(function(cls){
h+='<button class="tal-hero-btn'+(cls===currentTalentHero?' active':'')+'" onclick="window._v13.selectTalentHero(\''+cls+'\')">'+cls+'</button>';
});
h+='</div>';
var tree=TALENT_TREES[currentTalentHero]||DEFAULT_TALENT_TREE;
var heroData=data[currentTalentHero]||[];
h+='<div class="tal-tree">';
tree.branches.forEach(function(branch){
h+='<div class="tal-branch">';
h+='<h4><span style="color:'+branch.color+'">'+branch.icon+'</span> '+branch.name+'</h4>';
branch.talents.forEach(function(t){
var unlocked=heroData.indexOf(t.id)>=0;
var canUnlock=!unlocked&&pts>0&&(!t.req||heroData.indexOf(t.req)>=0);
h+='<div class="tal-node'+(unlocked?' unlocked':(canUnlock?'':' locked'))+'" onclick="window._v13.unlockTalent(\''+currentTalentHero+'\',\''+t.id+'\')">';
h+='<span class="tal-node-icon">'+(unlocked?'✅':canUnlock?'🔓':'🔒')+'</span>';
h+='<div class="tal-node-info"><div class="tal-node-name">'+t.name+'</div><div class="tal-node-desc">'+t.desc+'</div></div>';
h+='</div>';
});
h+='</div>';
});
h+='</div></div>';
el.querySelector('.v13-wrap').innerHTML=h;
}

function selectTalentHero(cls){currentTalentHero=cls;renderTalents()}

function unlockTalent(cls,talId){
var data=getTalentData();
var pts=getTalentPoints();
if(pts<=0)return;
var tree=TALENT_TREES[cls]||DEFAULT_TALENT_TREE;
var talent=null;
tree.branches.forEach(function(b){b.talents.forEach(function(t){if(t.id===talId)talent=t})});
if(!talent)return;
var heroData=data[cls]||[];
if(heroData.indexOf(talId)>=0)return;
if(talent.req&&heroData.indexOf(talent.req)<0)return;
heroData.push(talId);
data[cls]=heroData;
saveTalentData(data);
setTalentPoints(pts-1);
sfx('talent_unlock');
checkAch('talent_first');
var total=0;for(var k in data)total+=data[k].length;
if(total>=10)checkAch('talent_10');
renderTalents();
}

// =============================================
// SECTION 5: FORMATION PRESETS
// =============================================
var FORMATIONS=[
{id:'arrow',name:'화살촉 진형',icon:'△',desc:'궁병을 후방에 배치하고 보병이 전방을 방어하는 공격형 진형',bonus:'궁병 공격력 +15%, 보병 방어력 +10%',layout:[[0,0,0,1,0,0,0],[0,0,1,0,1,0,0],[0,1,0,0,0,1,0],[1,0,0,0,0,0,1],[0,0,2,2,2,0,0]]},
{id:'shield',name:'방어 진형',icon:'🛡️',desc:'보병이 전방을 두껍게 방어하고 후방에서 회복/원거리 공격',bonus:'전체 방어력 +20%, 이동력 -1',layout:[[2,2,2,2,2,2,2],[0,0,0,0,0,0,0],[0,1,0,1,0,1,0],[0,0,1,0,1,0,0],[0,0,0,0,0,0,0]]},
{id:'charge',name:'돌격 진형',icon:'⚡',desc:'기마병을 선두로 빠르게 돌파하는 소탕전 진형',bonus:'기마병 공격력 +20%, 첫 턴 이동력 +2',layout:[[0,0,0,1,0,0,0],[0,0,1,1,1,0,0],[0,0,0,1,0,0,0],[0,2,0,0,0,2,0],[0,0,0,0,0,0,0]]},
{id:'lure',name:'유인 진형',icon:'🎯',desc:'소수 병력으로 유인 후 매복병이 측면에서 공격',bonus:'측면 공격 데미지 +25%, 유인병 방어 +15%',layout:[[0,0,0,0,0,0,0],[0,0,0,2,0,0,0],[1,0,0,0,0,0,1],[0,0,0,2,0,0,0],[0,1,0,0,0,1,0]]},
{id:'mixed',name:'혼합 진형',icon:'⚖️',desc:'공방 균형을 맞춘 범용적 진형. 어떤 상황에도 대응 가능',bonus:'전체 능력치 +5%',layout:[[0,1,0,1,0,1,0],[0,0,0,0,0,0,0],[0,2,0,0,0,2,0],[0,0,0,1,0,0,0],[0,0,2,0,2,0,0]]}
];

function getFormationData(){try{return JSON.parse(localStorage.getItem('krpg_formation'))||'mixed'}catch(e){return'mixed'}}
function saveFormationData(id){localStorage.setItem('krpg_formation',id)}

function renderFormation(){
var el=document.getElementById('v13-formation');if(!el)return;
var current=getFormationData();
var h='<div class="v13-wrap"><div class="fmt-grid">';
FORMATIONS.forEach(function(f){
h+='<div class="fmt-card'+(f.id===current?' active':'')+'" onclick="window._v13.selectFormation(\''+f.id+'\')">';
h+='<h3>'+f.icon+' '+f.name+'</h3>';
h+='<p>'+f.desc+'</p>';
h+='<div class="fmt-bonus">효과: '+f.bonus+'</div>';
h+='<canvas class="fmt-canvas" id="fmt-cv-'+f.id+'" width="140" height="100"></canvas>';
h+='</div>';
});
h+='</div></div>';
el.querySelector('.v13-wrap').innerHTML=h;
FORMATIONS.forEach(function(f){drawFormationCanvas(f)});
}

function drawFormationCanvas(f){
var cv=document.getElementById('fmt-cv-'+f.id);if(!cv)return;
var ctx=cv.getContext('2d');
ctx.clearRect(0,0,140,100);
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,140,100);
ctx.strokeStyle='#2a2438';ctx.lineWidth=0.5;
for(var i=0;i<7;i++){ctx.beginPath();ctx.moveTo(i*20,0);ctx.lineTo(i*20,100);ctx.stroke()}
for(var j=0;j<5;j++){ctx.beginPath();ctx.moveTo(0,j*20);ctx.lineTo(140,j*20);ctx.stroke()}
f.layout.forEach(function(row,ri){
row.forEach(function(cell,ci){
if(cell===0)return;
var cx=ci*20+10,cy=ri*20+10;
ctx.beginPath();ctx.arc(cx,cy,6,0,Math.PI*2);
ctx.fillStyle=cell===1?'#4a8a4a':'#5a6aaa';ctx.fill();
ctx.strokeStyle=cell===1?'#6aba6a':'#8a9ada';ctx.lineWidth=1.5;ctx.stroke();
});
});
}

function selectFormation(id){
saveFormationData(id);
sfx('formation_set');
checkAch('formation_first');
renderFormation();
}

// =============================================
// SECTION 6: HERO CHRONICLES
// =============================================
var CHRONICLES=[
{id:'hwanwoong',name:'환웅',icon:'👑',title:'신시의 지배자',bio:'환인의 서자로 태백산 신시에 내려와 인간 세상을 다스렸다. 풍백, 우사, 운사를 거느리고 곡식, 형벌, 질병, 선악 등 360여 가지 일을 다스렸다. 천부인 세 개를 지니고 홍익인간의 이념으로 세상을 다스린 신성한 존재.',ability:'천부인 세 개로 번개, 비, 구름을 자유로이 다룰 수 있다.'},
{id:'ungnyeo',name:'웅녀',icon:'🌸',title:'대지의 어머니',bio:'곰이었던 시절 쓰과 마늘만으로 21일을 견딘 끝에 인간이 된 여인. 환웅과 혹인하여 단군을 낳았다. 대지의 힘과 생명의 축복을 다룰 수 있는 치유의 신.',ability:'대지의 축복으로 범위 회복과 부활 능력을 지닌다.'},
{id:'dangun',name:'단군왕검',icon:'🏛️',title:'고조선의 건국자',bio:'BC 2333년 고조선을 건국한 전설적인 왕. 환웅과 웅녀의 아들로, 홍익인간의 이념으로 나라를 세운 신성한 왕. 아사달에 도읍을 정하고 1500년간 다스렸다.',ability:'홍익인간의 대회복 + 범위 버프로 아군 전체를 강화한다.'},
{id:'pungbaek',name:'풍백',icon:'🌬️',title:'바람의 신',bio:'환웅을 따라 태백산에 내려온 풍의 신. 바람을 다스려 농작물을 돕고 적의 공격을 흘어놓는다. 태풍부터 산들바람까지 모든 바람을 지휘한다.',ability:'폭풍으로 범위 공격, 바람막이로 회피 버프'},
{id:'usa',name:'우사',icon:'🌧️',title:'비의 신',bio:'환웅을 따라 태백산에 내려온 비의 신. 폭우로 적을 공격하고 치유의 비로 아군을 회복시킨다. 농업의 핵심인 물을 관장하는 중요한 신.',ability:'폭우로 범위 공격+감속, 치유의 비로 범위 회복'},
{id:'unsa',name:'운사',icon:'☁️',title:'구름의 신',bio:'환웅을 따라 태백산에 내려온 구름의 신. 뇌운과 안개를 다스려 적을 혼란에 빠뜨린다. 뜨거운 번개로 강력한 단일 공격도 가능.',ability:'뇌운으로 강력 단일 공격, 안개로 적 명중 감소'},
{id:'haemosu',name:'해모수',icon:'☀️',title:'해의 신자',bio:'부여 건국 신화에 등장하는 해의 신자. 오룡을 타고 내려와 부여를 건국했다고 전해진다. 동명왕의 아버지로도 알려져 있다.',ability:'해의 빛으로 전장을 밝히고 아군에게 용기를 불어넣는다'},
{id:'geumwa',name:'금와왕',icon:'🐸',title:'부여의 왕',bio:'부여의 왕으로 금색 개구리에서 태어났다는 전설. 해부루의 따로 유화를 발견하고 부여를 강대하게 만든 왕.',ability:'금개구리의 신비한 힘으로 방어력을 높인다'},
{id:'jumong',name:'주몽',icon:'🏹',title:'부여의 명궁',bio:'활을 잘 쏘다하여 “주몽”이라 불린 부여의 왕자. 후에 남하하여 고구려를 건국했다. 백발백중의 활술로 이름을 떨쳤다.',ability:'백발백중의 활술로 원거리에서 정밀 사격'},
{id:'biryeo',name:'비류',icon:'🎭',title:'고조선 이전의 상단',bio:'BC 2000년경 고조선 이전의 조기 부족 사회를 이끈던 족장. 선민들과 함께 청동기 문화를 발전시킨 지도자.',ability:'부족 결속력으로 아군 전체의 사기를 높인다'},
{id:'wiman',name:'위만',icon:'⚔️',title:'위만조선의 왕',bio:'BC 194년 준왕을 몰아내고 왕검성을 차지하여 위만조선을 세운 장군. 철기 문화와 공성전에 능했으며 한반도 진번 확대의 야심을 가졌다.',ability:'철기병을 이끄는 공성전 전문가'},
{id:'ugeo',name:'우거',icon:'🏰',title:'고조선 마지막 왕',bio:'위만조선의 손자인 우거왕. 한무제의 침공에 맞서 왕검성을 1년간 사수하며 고조선의 마지막을 지킨 비운의 왕.',ability:'성벽 방어의 대가로 방어력이 극대화된다'}
];

function renderChronicles(){
var el=document.getElementById('v13-chronicles');if(!el)return;
var h='<div class="v13-wrap"><div class="chr-grid">';
CHRONICLES.forEach(function(c){
h+='<div class="chr-card" onclick="window._v13.showChronicle(\''+c.id+'\')">';
h+='<div class="chr-icon">'+c.icon+'</div>';
h+='<div class="chr-name">'+c.name+'</div>';
h+='<div class="chr-title">'+c.title+'</div>';
h+='</div>';
});
h+='</div><div class="chr-detail" id="chr-detail"></div></div>';
el.querySelector('.v13-wrap').innerHTML=h;
}

function showChronicle(id){
var det=document.getElementById('chr-detail');if(!det)return;
var c=null;CHRONICLES.forEach(function(ch){if(ch.id===id)c=ch});
if(!c){det.classList.remove('on');return}
var h='<h3>'+c.icon+' '+c.name+'</h3>';
h+='<div class="chr-sub">'+c.title+'</div>';
h+='<div class="chr-bio">'+c.bio+'</div>';
h+='<div class="chr-ability">💠 특수 능력: '+c.ability+'</div>';
det.innerHTML=h;
det.classList.add('on');
checkAch('chronicle_first');
}

// =============================================
// SECTION 7: BATTLE STATISTICS DASHBOARD
// =============================================
function getBattleStats(){
try{
var logs=JSON.parse(localStorage.getItem('krpg_battle_logs'))||[];
var stats={total:logs.length,wins:0,losses:0,totalDmg:0,totalTurns:0,heroDmg:{},heroKills:{}};
logs.forEach(function(l){
if(l.result==='win')stats.wins++;else stats.losses++;
stats.totalTurns+=l.turns||0;
(l.actions||[]).forEach(function(a){
if(a.dmg&&a.actor){
stats.totalDmg+=a.dmg;
stats.heroDmg[a.actor]=(stats.heroDmg[a.actor]||0)+a.dmg;
}
if(a.type==='kill'&&a.actor){
stats.heroKills[a.actor]=(stats.heroKills[a.actor]||0)+1;
}
});
});
return stats;
}catch(e){return{total:0,wins:0,losses:0,totalDmg:0,totalTurns:0,heroDmg:{},heroKills:{}}}
}

function renderBattleStats(){
var el=document.getElementById('v13-battlestats');if(!el)return;
var s=getBattleStats();
var winRate=s.total>0?Math.round(s.wins/s.total*100):0;
var avgTurns=s.total>0?Math.round(s.totalTurns/s.total*10)/10:0;
var mvp=null,mvpDmg=0;
for(var k in s.heroDmg){if(s.heroDmg[k]>mvpDmg){mvpDmg=s.heroDmg[k];mvp=k}}

var h='<div class="v13-wrap">';
h+='<div class="bs-cards">';
h+='<div class="bs-card"><div class="bs-val">'+s.total+'</div><div class="bs-lbl">총 전투</div></div>';
h+='<div class="bs-card"><div class="bs-val" style="color:'+(winRate>=50?'#4f4':'#f44')+'">'+winRate+'%</div><div class="bs-lbl">승률</div></div>';
h+='<div class="bs-card"><div class="bs-val">'+s.totalDmg+'</div><div class="bs-lbl">총 데미지</div></div>';
h+='<div class="bs-card"><div class="bs-val">'+avgTurns+'</div><div class="bs-lbl">평균 턴</div></div>';
h+='</div>';

if(mvp){
h+='<div class="bs-section"><h3>🏆 MVP</h3>';
h+='<div class="bs-mvp"><div class="bs-mvp-icon">⚔️</div>';
h+='<div class="bs-mvp-info"><div class="bs-mvp-name">'+mvp+'</div>';
h+='<div class="bs-mvp-stat">총 데미지: '+mvpDmg+'</div></div></div></div>';
}

h+='<div class="bs-section"><h3>전투 기록 차트</h3>';
h+='<canvas class="bs-canvas" id="bs-chart" width="480" height="200"></canvas>';
h+='</div></div>';
el.querySelector('.v13-wrap').innerHTML=h;
checkAch('stats_view');
setTimeout(drawBattleChart,100);
}

function drawBattleChart(){
var cv=document.getElementById('bs-chart');if(!cv)return;
var ctx=cv.getContext('2d');
var logs;try{logs=JSON.parse(localStorage.getItem('krpg_battle_logs'))||[]}catch(e){logs=[]}
ctx.clearRect(0,0,480,200);
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,480,200);
if(logs.length===0){
ctx.fillStyle='#5a5a6a';ctx.font='13px sans-serif';ctx.textAlign='center';
ctx.fillText('전투 기록이 없습니다',240,100);
return;
}
var last10=logs.slice(-10);
var barW=36,gap=12,startX=20;
ctx.fillStyle='#3a3a4a';ctx.font='9px sans-serif';ctx.textAlign='center';
for(var i=0;i<10;i++){
var x=startX+i*(barW+gap);
ctx.fillStyle='#2a2438';ctx.fillRect(x,20,barW,150);
}
last10.forEach(function(l,i){
var x=startX+i*(barW+gap);
var turns=l.turns||1;
var h=Math.min(turns*10,150);
var isWin=l.result==='win';
var grd=ctx.createLinearGradient(x,170-h,x,170);
grd.addColorStop(0,isWin?'#4a8a4a':'#8a3a2a');
grd.addColorStop(1,isWin?'#2a5a2a':'#5a1a0a');
ctx.fillStyle=grd;
ctx.fillRect(x,170-h,barW,h);
ctx.fillStyle=isWin?'#6aba6a':'#ba5a3a';
ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText(isWin?'승':'패',x+barW/2,185);
ctx.fillStyle='#8a7a6a';ctx.fillText(turns+'T',x+barW/2,170-h-4);
});
ctx.fillStyle='#c4956a';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('최근 10전투',startX,14);
}

// =============================================
// SECTION 8: ARCHERY MINIGAME
// =============================================
var arcState={active:false,score:0,arrows:10,wind:0,power:0,angle:Math.PI/4,phase:'aim',trail:[],targets:[],animId:null};

function renderArchery(){
var el=document.getElementById('v13-archery');if(!el)return;
var h='<div class="v13-wrap">';
h+='<div class="arc-hud">';
h+='<span class="arc-score">🎯 점수: <b id="arc-score">0</b></span>';
h+='<span class="arc-wind">🌬️ 바람: <b id="arc-wind">0</b></span>';
h+='<span class="arc-arrows">🏹 화살: <b id="arc-arrows">10</b></span>';
h+='</div>';
h+='<canvas class="arc-canvas" id="arc-canvas" width="480" height="320"></canvas>';
h+='<button class="arc-start" id="arc-start" onclick="window._v13.startArchery()">🏹 활쏘기 시작</button>';
h+='<div class="arc-result" id="arc-result"></div>';
h+='</div>';
el.querySelector('.v13-wrap').innerHTML=h;
drawArcheryBg();
}

function drawArcheryBg(){
var cv=document.getElementById('arc-canvas');if(!cv)return;
var ctx=cv.getContext('2d');
ctx.fillStyle='#1a2a1a';ctx.fillRect(0,0,480,320);
var grd=ctx.createLinearGradient(0,0,0,200);
grd.addColorStop(0,'#0a1a2a');grd.addColorStop(1,'#1a3a2a');
ctx.fillStyle=grd;ctx.fillRect(0,0,480,200);
ctx.fillStyle='#2a4a2a';ctx.fillRect(0,200,480,120);
ctx.fillStyle='#3a5a3a';
ctx.beginPath();ctx.moveTo(0,200);
for(var i=0;i<=480;i+=20){ctx.lineTo(i,200+Math.sin(i*0.02)*8)}
ctx.lineTo(480,320);ctx.lineTo(0,320);ctx.fill();
drawTarget(ctx,380,160);
ctx.fillStyle='#c4956a';ctx.font='14px sans-serif';ctx.textAlign='center';
ctx.fillText('클릭/터치로 발사!',240,280);
}

function drawTarget(ctx,x,y){
var rings=[{r:30,c:'#ffffff'},{r:24,c:'#444444'},{r:18,c:'#4488ff'},{r:12,c:'#ff4444'},{r:6,c:'#FFD700'}];
rings.forEach(function(ring){
ctx.beginPath();ctx.arc(x,y,ring.r,0,Math.PI*2);ctx.fillStyle=ring.c;ctx.fill();
ctx.strokeStyle='#00000044';ctx.lineWidth=1;ctx.stroke();
});
}

function startArchery(){
arcState={active:true,score:0,arrows:10,wind:Math.round((Math.random()-0.5)*6*10)/10,power:50,angle:Math.PI/4,phase:'aim',trail:[],animId:null};
var cv=document.getElementById('arc-canvas');if(!cv)return;
cv.onmousedown=cv.ontouchstart=function(e){e.preventDefault();shootArrow()};
updateArcheryHud();
drawArcheryScene();
document.getElementById('arc-start').style.display='none';
document.getElementById('arc-result').innerHTML='';
checkAch('archery_first');
}

function updateArcheryHud(){
var s=document.getElementById('arc-score');if(s)s.textContent=arcState.score;
var w=document.getElementById('arc-wind');if(w)w.textContent=arcState.wind>0?'+'+arcState.wind:arcState.wind;
var a=document.getElementById('arc-arrows');if(a)a.textContent=arcState.arrows;
}

function drawArcheryScene(){
var cv=document.getElementById('arc-canvas');if(!cv)return;
var ctx=cv.getContext('2d');
ctx.fillStyle='#1a2a1a';ctx.fillRect(0,0,480,320);
var grd=ctx.createLinearGradient(0,0,0,200);
grd.addColorStop(0,'#0a1a2a');grd.addColorStop(1,'#1a3a2a');
ctx.fillStyle=grd;ctx.fillRect(0,0,480,200);
ctx.fillStyle='#2a4a2a';ctx.fillRect(0,200,480,120);
drawTarget(ctx,380,160);
ctx.fillStyle='#8B6B3D';ctx.fillRect(40,220,8,60);
ctx.beginPath();ctx.moveTo(44,220);ctx.quadraticCurveTo(20,250,44,280);
ctx.strokeStyle='#c4956a';ctx.lineWidth=3;ctx.stroke();
arcState.trail.forEach(function(t,i){
ctx.beginPath();ctx.arc(t.x,t.y,2,0,Math.PI*2);
ctx.fillStyle='rgba(255,215,0,'+(0.3+i/arcState.trail.length*0.7)+')';ctx.fill();
});
if(arcState.phase==='aim'){
var pw=arcState.power;
ctx.strokeStyle='rgba(255,215,0,0.5)';ctx.lineWidth=1;ctx.setLineDash([4,4]);
ctx.beginPath();ctx.moveTo(50,240);
var dx=Math.cos(-Math.PI/5)*pw*2,dy=Math.sin(-Math.PI/5)*pw*2;
ctx.lineTo(50+dx,240+dy);ctx.stroke();
ctx.setLineDash([]);
}
}

function shootArrow(){
if(!arcState.active||arcState.arrows<=0||arcState.phase!=='aim')return;
arcState.arrows--;arcState.phase='fly';
sfx('arrow_shoot');
var ax=50,ay=240,vx=8+Math.random()*2,vy=-6-Math.random()*2;
var windEffect=arcState.wind*0.15;
arcState.trail=[];
function animate(){
ax+=vx+windEffect;ay+=vy;vy+=0.18;
arcState.trail.push({x:ax,y:ay});
if(arcState.trail.length>30)arcState.trail.shift();
drawArcheryScene();
var cv=document.getElementById('arc-canvas');
var ctx=cv.getContext('2d');
ctx.beginPath();ctx.moveTo(ax-6,ay);ctx.lineTo(ax+6,ay-2);ctx.lineTo(ax+6,ay+2);ctx.closePath();
ctx.fillStyle='#c4956a';ctx.fill();
var tx=380,ty=160;
var dist=Math.sqrt((ax-tx)*(ax-tx)+(ay-ty)*(ay-ty));
if(dist<30){
sfx('arrow_hit');
var pts=0;
if(dist<6)pts=100;else if(dist<12)pts=80;else if(dist<18)pts=50;else if(dist<24)pts=30;else pts=10;
arcState.score+=pts;
ctx.fillStyle='#FFD700';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('+'+pts,ax,ay-16);
arcState.phase='aim';
arcState.wind=Math.round((Math.random()-0.5)*6*10)/10;
updateArcheryHud();
if(arcState.arrows<=0)endArchery();
return;
}
if(ax>500||ay>350){
arcState.phase='aim';
arcState.wind=Math.round((Math.random()-0.5)*6*10)/10;
updateArcheryHud();
if(arcState.arrows<=0)endArchery();
return;
}
arcState.animId=requestAnimationFrame(animate);
}
animate();
}

function endArchery(){
arcState.active=false;
var cv=document.getElementById('arc-canvas');if(cv){cv.onmousedown=null;cv.ontouchstart=null}
var rank,cls;
if(arcState.score>=800){rank='S';cls='arc-rank-s'}
else if(arcState.score>=600){rank='A';cls='arc-rank-a'}
else if(arcState.score>=400){rank='B';cls='arc-rank-b'}
else if(arcState.score>=200){rank='C';cls='arc-rank-c'}
else{rank='D';cls='arc-rank-d'}
document.getElementById('arc-result').innerHTML='<div class="arc-rank '+cls+'">등급: '+rank+' | 점수: '+arcState.score+'점</div>';
document.getElementById('arc-start').style.display='block';
document.getElementById('arc-start').textContent='🏹 다시 시작';
if(arcState.score>=500)checkAch('archery_500');
if(arcState.score>=800)checkAch('archery_master');
try{
var st=JSON.parse(localStorage.getItem('krpg_stats'))||{};
st.archeryBest=Math.max(st.archeryBest||0,arcState.score);
localStorage.setItem('krpg_stats',JSON.stringify(st));
}catch(e){}
}

// =============================================
// SECTION 9: QUIZ V13 (+15 questions, 75→90)
// =============================================
var QUIZ_V13=[
{q:'해모수가 타고 온 동물은?',a:['오맨마','백마','흩마','빨간마'],c:0,e:'해모수는 다섯 마리가 끄는 오맨마를 타고 하늘에서 내려왔다고 전해진다.'},
{q:'부여의 영고 제천은 어느 달에 열렸는가?',a:['정월','삼월','시월','십이월'],c:3,e:'영고는 부여의 12월 제천으로, 나라의 안녕과 풍년을 빌었다.'},
{q:'고조선의 범금 8조에서 살인의 별은?',a:['사형','유배','노비로 삼음','벌금 납부'],c:0,e:'8조법은 사회 질서 유지를 위한 법으로, 살인자는 사형에 처해졌다.'},
{q:'동예의 특산물로 유명한 것은?',a:['반어','단궁','과하마','비단'],c:2,e:'동예는 과하마(화살통 조랑말)로 유명했으며, 단궁도 특산물이었다.'},
{q:'위만조선의 도읍은?',a:['아사달','왕검성','평양성','한양'],c:1,e:'위만은 준왕을 몰아내고 왕검성을 도읍으로 정했다.'},
{q:'한사군 4군 중 가장 먼저 설치된 것은?',a:['낙랑군','진번군','현도군','임둔군'],c:0,e:'낙랑군은 BC 108년 한무제가 고조선을 멸망시키고 가장 먼저 설치했다.'},
{q:'옥저의 특특한 장제 풍습은?',a:['순장','골장제','화장','매장'],c:1,e:'골장제는 뿔을 난 후 나무 굴에 묻었다가 뒤에 비움으로 처리하는 옥저의 관습이다.'},
{q:'변한(번한)의 중심 지역은?',a:['한반도 남부','충청도','경기도','한반도 북부'],c:0,e:'변한은 한반도 남부 냙동강 유역을 중심으로 발전했다.'},
{q:'고조선의 비파형 동검의 재료는?',a:['철','청동','돌','블리스터 강철'],c:1,e:'비파형 동검은 청동으로 만들어졌으며, 고조선의 대표적인 무기이다.'},
{q:'단군이 건국한 해는 BC 몇 년?',a:['BC 2333','뱂 1000','BC 108','BC 57'],c:0,e:'단군은 BC 2333년에 고조선을 건국했다고 전해진다.'},
{q:'삼한의 신성한 영역을 뭐라 부르는가?',a:['소도','성전','사원','묘주'],c:0,e:'소도는 삼한의 신성 지역으로, 천군이 주관하며 범죄자도 도망칠 수 있었다.'},
{q:'부여에서 도둑질을 하면 어떻게 되었나?',a:['물건의 12배 배상','무고 1년','참수형','지역 추방'],c:0,e:'부여에서는 도둑질을 하면 훔친 물건의 12배를 배상해야 했다.'},
{q:'환웅이 인간 세상에서 다스린 일의 수는?',a:['120가지','240가지','360가지','500가지'],c:2,e:'환웅은 곡식, 형벌, 질병, 선악 등 360여 가지 일을 다스렸다.'},
{q:'마한의 특징적인 제천 행사는?',a:['영고','무천','동맹','수렷날'],c:1,e:'무천은 마한의 대표적 제천 행사로, 5월과 10월에 열렸다.'},
{q:'진한의 중심 지역은 현재의 어디인가?',a:['경주','부산','울산','광주'],c:0,e:'진한은 현재의 경주 지역을 중심으로 발전했으며, 후에 신라로 발전했다.'}
];

// =============================================
// SECTION 10: ACHIEVEMENTS V13 (+12, 36→48)
// =============================================
var ACH_V13=[
{id:'enhance_first',n:'첫 강화',d:'장비를 처음으로 강화',icon:'⚔️'},
{id:'enhance_5',n:'장인 정신',d:'장비를 +5까지 강화',icon:'🔥'},
{id:'enhance_max',n:'전설의 무기',d:'장비를 +10까지 강화',icon:'✨'},
{id:'talent_first',n:'첫 특성',d:'특성을 처음으로 해금',icon:'🌟'},
{id:'talent_10',n:'특성 마스터',d:'특성 10개 해금',icon:'💠'},
{id:'formation_first',n:'진형 설계사',d:'진형을 처음으로 선택',icon:'⚔️'},
{id:'chronicle_first',n:'역사 탐구자',d:'영웅 열전을 처음으로 읽음',icon:'📜'},
{id:'stats_view',n:'분석가',d:'전투 통계를 처음으로 열람',icon:'📊'},
{id:'archery_first',n:'첫 활쏘기',d:'활쏘기 미니게임을 처음으로 시작',icon:'🏹'},
{id:'archery_500',n:'명궁수',d:'활쏘기에서 500점 달성',icon:'🎯'},
{id:'archery_master',n:'백발백중',d:'활쏘기에서 800점 달성',icon:'🥇'},
{id:'quiz_90',n:'역사 박사',d:'퀸즈 90문제 전부 도전',icon:'🎓'}
];

function checkAch(id){
try{
var ach=JSON.parse(localStorage.getItem('krpg_ach'))||[];
if(ach.indexOf(id)>=0)return;
ach.push(id);
localStorage.setItem('krpg_ach',JSON.stringify(ach));
var a=null;ACH_V13.forEach(function(x){if(x.id===id)a=x});
if(a)showToast(a.icon+' 업적 달성: '+a.n);
}catch(e){}
}

function showToast(msg){
var t=document.getElementById('v13-toast');
if(!t){t=document.createElement('div');t.id='v13-toast';t.className='v13-toast';document.body.appendChild(t)}
t.textContent=msg;t.classList.add('on');
setTimeout(function(){t.classList.remove('on')},2500);
}

// =============================================
// SECTION 11: HTML INJECTION
// =============================================
var overlays=['enhance','talents','formation','chronicles','battlestats','archery'];
overlays.forEach(function(name){
var div=document.createElement('div');
div.id='v13-'+name;div.className='v13-overlay';
div.setAttribute('role','dialog');div.setAttribute('aria-label',name);
div.innerHTML='<button class="v13-close" onclick="this.parentElement.classList.remove(\'on\')" aria-label="닫기">✕</button><h2></h2><div class="v13-wrap"></div>';
document.body.appendChild(div);
});

document.getElementById('v13-enhance').querySelector('h2').textContent='장비 강화';
document.getElementById('v13-talents').querySelector('h2').textContent='영웅 특성 트리';
document.getElementById('v13-formation').querySelector('h2').textContent='전투 진형';
document.getElementById('v13-chronicles').querySelector('h2').textContent='영웅 열전';
document.getElementById('v13-battlestats').querySelector('h2').textContent='전투 통계';
document.getElementById('v13-archery').querySelector('h2').textContent='활쏘기 대회';

// =============================================
// SECTION 12: MENU BUTTONS
// =============================================
function injectMenuButtons(){
if(document.getElementById('v13-menu'))return;
var bar=document.createElement('div');bar.id='v13-menu';bar.className='v13-menu-btns';
var btns=[
{icon:'⚔️',title:'장비 강화',fn:'enhance'},
{icon:'🌟',title:'특성 트리',fn:'talents'},
{icon:'⚖️',title:'진형 설정',fn:'formation'},
{icon:'📜',title:'영웅 열전',fn:'chronicles'},
{icon:'📊',title:'전투 통계',fn:'battlestats'},
{icon:'🏹',title:'활쏘기',fn:'archery'}
];
btns.forEach(function(b){
var btn=document.createElement('button');
btn.className='v13-mbtn';btn.textContent=b.icon;btn.title=b.title;
btn.setAttribute('aria-label',b.title);
btn.onclick=function(){
var el=document.getElementById('v13-'+b.fn);
if(el){
el.classList.toggle('on');
if(el.classList.contains('on')){
if(b.fn==='enhance')renderEnhance();
else if(b.fn==='talents')renderTalents();
else if(b.fn==='formation')renderFormation();
else if(b.fn==='chronicles')renderChronicles();
else if(b.fn==='battlestats')renderBattleStats();
else if(b.fn==='archery')renderArchery();
}
}
};
bar.appendChild(btn);
});
document.body.appendChild(bar);
}

setTimeout(injectMenuButtons,2000);

// =============================================
// SECTION 13: KEYBOARD SHORTCUTS
// =============================================
document.addEventListener('keydown',function(e){
if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
var map={'KeyH':'enhance','KeyT':'talents','KeyJ':'formation','KeyN':'chronicles','KeyO':'battlestats'};
if(e.altKey)return;
var fn=map[e.code];
if(fn){
var el=document.getElementById('v13-'+fn);
if(el){el.classList.toggle('on');
if(el.classList.contains('on')){
if(fn==='enhance')renderEnhance();
else if(fn==='talents')renderTalents();
else if(fn==='formation')renderFormation();
else if(fn==='chronicles')renderChronicles();
else if(fn==='battlestats')renderBattleStats();
}}
}
});

// =============================================
// SECTION 14: QUIZ/ACHIEVEMENT REGISTRATION
// =============================================
if(typeof window._v10!=='undefined'){
ACH_V13.forEach(function(a){if(window._v10.achDefs){window._v10.achDefs.push(a)}});
}
if(typeof window._v10!=='undefined'&&window._v10.quizPool){
QUIZ_V13.forEach(function(q){window._v10.quizPool.push(q)});
}

// =============================================
// SECTION 15: EXPORTS
// =============================================
window._v13={
renderEnhance:renderEnhance,
showEnhDetail:showEnhDetail,
doEnhance:doEnhance,
renderTalents:renderTalents,
selectTalentHero:selectTalentHero,
unlockTalent:unlockTalent,
renderFormation:renderFormation,
selectFormation:selectFormation,
renderChronicles:renderChronicles,
showChronicle:showChronicle,
renderBattleStats:renderBattleStats,
renderArchery:renderArchery,
startArchery:startArchery,
formations:FORMATIONS,
chronicles:CHRONICLES,
achV13:ACH_V13,
quizV13:QUIZ_V13,
talentTrees:TALENT_TREES,
enhRates:ENH_RATES,
sfx:sfx,
checkAch:checkAch,
showToast:showToast
};

})();
