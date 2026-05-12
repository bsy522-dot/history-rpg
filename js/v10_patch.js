// v10_patch.js — 한국사 영웅전 v10.0 Enhancement Patch
// Achievement System + Statistics + Turn Order + Extra Content + SFX
(function(){
'use strict';

// =============================================
// SECTION 1: CSS INJECTION
// =============================================
var css=document.createElement('style');
css.textContent=[
'.ach-toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,rgba(255,215,0,.15),rgba(196,149,106,.15));border:2px solid #FFD700;border-radius:12px;padding:12px 20px;z-index:200;text-align:center;min-width:220px;backdrop-filter:blur(8px);pointer-events:none;animation:achSlide .5s ease}',
'@keyframes achSlide{from{opacity:0;transform:translateX(-50%) translateY(-20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}',
'#ach-screen{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.96);z-index:120;overflow-y:auto;padding:16px}',
'#ach-screen.on{display:block}',
'#ach-screen h2{color:#c4956a;text-align:center;margin-bottom:16px;font-size:18px;letter-spacing:2px}',
'.ach-count{text-align:center;font-size:12px;color:#8a7a6a;margin-bottom:12px}',
'.ach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;max-width:600px;margin:0 auto}',
'.ach-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:10px;text-align:center;transition:all .3s}',
'.ach-card.unlocked{border-color:#FFD700;background:rgba(255,215,0,.08)}',
'.ach-card.locked{opacity:.4;filter:grayscale(.8)}',
'.ach-icon{font-size:28px;margin-bottom:4px}',
'.ach-name{font-size:11px;font-weight:700;color:#FFD700;margin-bottom:2px}',
'.ach-desc{font-size:9px;color:#8a7a6a}',
'#stats-v10{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.96);z-index:120;overflow-y:auto;padding:16px}',
'#stats-v10.on{display:block}',
'#stats-v10 h2{color:#c4956a;text-align:center;margin-bottom:16px;font-size:18px;letter-spacing:2px}',
'.sv10-ctr{max-width:400px;margin:0 auto}',
'.sv10-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:12px;margin:8px 0}',
'.sv10-card h3{color:#FFD700;font-size:13px;margin-bottom:8px}',
'.sv10-row{display:flex;justify-content:space-between;font-size:11px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.05)}',
'.sv10-row span:first-child{color:#8a7a6a}',
'.sv10-row span:last-child{color:#e8dcc8;font-weight:700}',
'#turn-order{position:fixed;top:50px;left:4px;width:44px;background:rgba(26,20,40,.88);border:1px solid #3a3a4a;border-radius:6px;padding:4px;z-index:38;display:none;max-height:320px;overflow-y:auto}',
'.to-u{width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:16px;border-radius:4px;margin:2px 0;border:1px solid transparent;position:relative}',
'.to-u.ally{border-color:rgba(42,90,42,.6)}',
'.to-u.enemy{border-color:rgba(106,42,42,.6)}',
'.to-u.active{border-color:#FFD700;background:rgba(255,215,0,.15)}',
'.to-hp{position:absolute;bottom:1px;left:2px;right:2px;height:2px;background:#333;border-radius:1px}',
'.to-hp-f{height:100%;border-radius:1px}',
'.v10-btn{padding:10px 40px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:14px;font-weight:700;color:#e8dcc8;background:#2a2438;cursor:pointer;min-width:180px;margin:4px 0}',
'.v10-btn:hover{background:#3a3448;border-color:#c4956a}',
'.v10-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}'
].join('\n');
document.head.appendChild(css);

// =============================================
// SECTION 2: ACHIEVEMENT DEFINITIONS (24개)
// =============================================
var ACH=[
{id:'first_blood',nm:'첫 승리',ds:'첫 전투에서 승리',ic:'⚔️'},
{id:'veteran',nm:'전장의 노장',ds:'10회 전투 승리',ic:'🎖️'},
{id:'scholar',nm:'역사 학자',ds:'퀴즈 10문 정답',ic:'📚'},
{id:'endurer',nm:'인내의 승리자',ds:'21일 시련 완료',ic:'🐻'},
{id:'ritualist',nm:'제천의 사제',ds:'제천의식 완료',ic:'🙏'},
{id:'ch1_clear',nm:'환웅편 완료',ds:'챕터 1 클리어',ic:'👑'},
{id:'ch2_clear',nm:'단군편 완료',ds:'챕터 2 클리어',ic:'🏛️'},
{id:'ch3_clear',nm:'위만편 완료',ds:'챕터 3 클리어',ic:'🏯'},
{id:'ch4_clear',nm:'부여삼한 완료',ds:'챕터 4 클리어',ic:'🗿'},
{id:'shopper',nm:'현명한 상인',ds:'상점에서 10회 구매',ic:'🏪'},
{id:'gold_hoarder',nm:'부의 축적',ds:'1000G 보유',ic:'💰'},
{id:'promoter',nm:'장수 승급',ds:'캐릭터 승급 달성',ic:'⬆️'},
{id:'healer',nm:'치유의 손',ds:'총 회복량 500+',ic:'💚'},
{id:'crit_master',nm:'일격필살',ds:'치명타 20회',ic:'💥'},
{id:'explorer',nm:'탐험가',ds:'마을 탐험 5회',ic:'🗺️'},
{id:'collector',nm:'수집가',ds:'장비 10개 수집',ic:'🎒'},
{id:'counter',nm:'반격의 달인',ds:'반격 10회',ic:'🛡️'},
{id:'speed',nm:'속전속결',ds:'5턴 이내 승리',ic:'⚡'},
{id:'quiz_master',nm:'퀴즈 마스터',ds:'퀴즈 만점 달성',ic:'🧠'},
{id:'item_user',nm:'약초술사',ds:'아이템 30회 사용',ic:'🧪'},
{id:'lvl10',nm:'성장',ds:'레벨 10 달성',ic:'📈'},
{id:'lvl20',nm:'전설의 영웅',ds:'레벨 20 달성',ic:'🌟'},
{id:'full_party',nm:'완전한 팀',ds:'6명 파티 편성',ic:'👥'},
{id:'all_clear',nm:'역사의 주인공',ds:'전 챕터 클리어',ic:'🏆'}
];

// =============================================
// SECTION 3: STATISTICS
// =============================================
function defSt(){return{wins:0,losses:0,totalDmg:0,totalHeal:0,crits:0,counters:0,quizOk:0,quizTot:0,endurWin:0,ritualWin:0,purchases:0,promotions:0,townsVisited:0,itemsCollected:0,itemsUsed:0,fastWins:0,perfectQuiz:0,turns:0,maxDmg:0,kills:0,battles:0}}
function ldSt(){try{return JSON.parse(localStorage.getItem('krpg_stats'))||defSt()}catch(e){return defSt()}}
function svSt(){localStorage.setItem('krpg_stats',JSON.stringify(st))}
var st=ldSt();
function ldAch(){try{return JSON.parse(localStorage.getItem('krpg_ach'))||[]}catch(e){return[]}}
function svAch(){localStorage.setItem('krpg_ach',JSON.stringify(ul))}
var ul=ldAch();

// =============================================
// SECTION 4: ACHIEVEMENT CHECK
// =============================================
function chkAch(){
var ck={
first_blood:st.wins>=1,veteran:st.wins>=10,scholar:st.quizOk>=10,
endurer:st.endurWin>=1,ritualist:st.ritualWin>=1,
ch1_clear:localStorage.getItem('krpg7_ch1_cleared')==='true',
ch2_clear:localStorage.getItem('krpg7_ch2_cleared')==='true',
ch3_clear:localStorage.getItem('krpg7_ch3_cleared')==='true',
ch4_clear:localStorage.getItem('krpg7_ch4_cleared')==='true',
shopper:st.purchases>=10,
gold_hoarder:typeof G!=='undefined'&&G.gold>=1000,
promoter:st.promotions>=1,healer:st.totalHeal>=500,
crit_master:st.crits>=20,explorer:st.townsVisited>=5,
collector:st.itemsCollected>=10,counter:st.counters>=10,
speed:st.fastWins>=1,quiz_master:st.perfectQuiz>=1,
item_user:st.itemsUsed>=30,
lvl10:typeof G!=='undefined'&&G.party&&G.party.some(function(c){return c.lv>=10}),
lvl20:typeof G!=='undefined'&&G.party&&G.party.some(function(c){return c.lv>=20}),
full_party:typeof G!=='undefined'&&G.party&&G.party.length>=6,
all_clear:localStorage.getItem('krpg7_ch1_cleared')==='true'&&localStorage.getItem('krpg7_ch2_cleared')==='true'&&localStorage.getItem('krpg7_ch3_cleared')==='true'&&localStorage.getItem('krpg7_ch4_cleared')==='true'
};
ACH.forEach(function(a){
if(ul.indexOf(a.id)<0&&ck[a.id]){ul.push(a.id);showToast(a)}
});
svAch();
}

function showToast(a){
if(typeof sfx==='function')sfx('quest');
var t=document.createElement('div');t.className='ach-toast';
t.innerHTML='<div style="font-size:28px">'+a.ic+'</div><div style="font-size:11px;color:#FFD700;font-weight:700">업적 달성!</div><div style="font-size:14px;color:#e8dcc8;font-weight:700">'+a.nm+'</div><div style="font-size:9px;color:#8a7a6a">'+a.ds+'</div>';
document.body.appendChild(t);
setTimeout(function(){t.style.transition='opacity .5s';t.style.opacity='0';setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t)},600)},3000);
}

// =============================================
// SECTION 5: DOM INJECTION
// =============================================
var achEl=document.createElement('div');achEl.id='ach-screen';
achEl.innerHTML='<h2>🏆 업적</h2><div class="ach-count" id="ach-cnt"></div><div class="ach-grid" id="ach-grid"></div><button class="v10-close" onclick="document.getElementById(\'ach-screen\').classList.remove(\'on\')">닫기</button>';
document.body.appendChild(achEl);

var stEl=document.createElement('div');stEl.id='stats-v10';
stEl.innerHTML='<h2>📊 전적 통계</h2><div class="sv10-ctr" id="sv10-c"></div><button class="v10-close" onclick="document.getElementById(\'stats-v10\').classList.remove(\'on\')">닫기</button>';
document.body.appendChild(stEl);

var toEl=document.createElement('div');toEl.id='turn-order';
document.body.appendChild(toEl);

function renderAch(){
var g=document.getElementById('ach-grid');if(!g)return;
var cnt=document.getElementById('ach-cnt');
if(cnt)cnt.textContent=ul.length+' / '+ACH.length+' 달성';
g.innerHTML=ACH.map(function(a){
var ok=ul.indexOf(a.id)>=0;
return '<div class="ach-card '+(ok?'unlocked':'locked')+'"><div class="ach-icon">'+(ok?a.ic:'🔒')+'</div><div class="ach-name">'+a.nm+'</div><div class="ach-desc">'+a.ds+'</div></div>';
}).join('');
}

function renderStats(){
var el=document.getElementById('sv10-c');if(!el)return;
var wr=st.battles?Math.round(st.wins/st.battles*100):0;
el.innerHTML=
'<div class="sv10-card"><h3>⚔️ 전투</h3>'+
'<div class="sv10-row"><span>총 전투</span><span>'+st.battles+'회</span></div>'+
'<div class="sv10-row"><span>승리</span><span>'+st.wins+'회</span></div>'+
'<div class="sv10-row"><span>패배</span><span>'+st.losses+'회</span></div>'+
'<div class="sv10-row"><span>승률</span><span>'+wr+'%</span></div>'+
'<div class="sv10-row"><span>총 피해량</span><span>'+st.totalDmg+'</span></div>'+
'<div class="sv10-row"><span>최대 단일 피해</span><span>'+st.maxDmg+'</span></div>'+
'<div class="sv10-row"><span>총 회복량</span><span>'+st.totalHeal+'</span></div>'+
'<div class="sv10-row"><span>치명타</span><span>'+st.crits+'회</span></div>'+
'<div class="sv10-row"><span>반격</span><span>'+st.counters+'회</span></div>'+
'<div class="sv10-row"><span>처치</span><span>'+st.kills+'회</span></div>'+
'<div class="sv10-row"><span>총 턴</span><span>'+st.turns+'</span></div>'+
'</div>'+
'<div class="sv10-card"><h3>📚 학습</h3>'+
'<div class="sv10-row"><span>퀴즈 정답</span><span>'+st.quizOk+'/'+st.quizTot+'</span></div>'+
'<div class="sv10-row"><span>시련 완료</span><span>'+st.endurWin+'회</span></div>'+
'<div class="sv10-row"><span>제천의식</span><span>'+st.ritualWin+'회</span></div>'+
'</div>'+
'<div class="sv10-card"><h3>🏪 경제</h3>'+
'<div class="sv10-row"><span>구매 횟수</span><span>'+st.purchases+'회</span></div>'+
'<div class="sv10-row"><span>아이템 사용</span><span>'+st.itemsUsed+'회</span></div>'+
'<div class="sv10-row"><span>승급</span><span>'+st.promotions+'회</span></div>'+
'</div>'+
'<div class="sv10-card"><h3>🏆 업적</h3>'+
'<div class="sv10-row"><span>달성</span><span>'+ul.length+'/'+ACH.length+'</span></div>'+
'</div>';
}

// =============================================
// SECTION 6: TURN ORDER
// =============================================
function renderTO(){
var el=document.getElementById('turn-order');
if(!el||typeof G==='undefined'||!G.tac)return;
var units=[];
if(G.tac.allies)units=units.concat(G.tac.allies.filter(function(u){return u.alive}));
if(G.tac.enemies)units=units.concat(G.tac.enemies.filter(function(u){return u.alive}));
units.sort(function(a,b){return(b.spd||0)-(a.spd||0)});
el.innerHTML='<div style="font-size:7px;color:#8a7a6a;text-align:center;margin-bottom:2px;letter-spacing:1px">행동순</div>'+
units.slice(0,8).map(function(u){
var hp=Math.max(0,Math.round(u.hp/u.mhp*100));
var act=G.tac.selUnit&&G.tac.selUnit.id===u.id;
return '<div class="to-u '+(u.ally?'ally':'enemy')+(act?' active':'')+'" title="'+u.nm+' Lv.'+u.lv+'">'+u.portrait+'<div class="to-hp"><div class="to-hp-f" style="width:'+hp+'%;background:'+(u.ally?'#4a2':'#a42')+'"></div></div></div>';
}).join('');
}

// =============================================
// SECTION 7: FUNCTION HOOKS
// =============================================
var mnu=document.getElementById('menu-overlay');
if(mnu){
var ab=document.createElement('button');ab.className='v10-btn';ab.textContent='🏆 업적';
ab.onclick=function(){mnu.classList.remove('on');renderAch();document.getElementById('ach-screen').classList.add('on')};
var sb=document.createElement('button');sb.className='v10-btn';sb.textContent='📊 전적';
sb.onclick=function(){mnu.classList.remove('on');renderStats();document.getElementById('stats-v10').classList.add('on')};
var cls=mnu.querySelectorAll('.menu-btn');var last=cls[cls.length-1];
if(last){mnu.insertBefore(sb,last);mnu.insertBefore(ab,sb)}
}

// Hook victory
if(typeof window.onVictoryContinue==='function'){
var _vc=window.onVictoryContinue;
window.onVictoryContinue=function(){st.wins++;st.battles++;svSt();chkAch();_vc.apply(this,arguments)};
}

// Hook shop buy
if(typeof window.shopBuy==='function'){
var _sb=window.shopBuy;
window.shopBuy=function(id){_sb.apply(this,arguments);st.purchases++;svSt();chkAch()};
}

// Hook quiz answer
if(typeof window.answerQuiz==='function'){
var _aq=window.answerQuiz;
window.answerQuiz=function(i){
st.quizTot++;
try{var q=(typeof G!=='undefined'&&G._quizSet)?G._quizSet[typeof quizIdx!=='undefined'?quizIdx:0]:null;if(q&&i===q.c)st.quizOk++}catch(e){}
svSt();_aq.apply(this,arguments);chkAch();
};
}

// Hook showTacUI/hideTacUI for turn order
if(typeof showTacUI==='function'){
var _st=showTacUI;
showTacUI=function(){_st.apply(this,arguments);var to=document.getElementById('turn-order');if(to)to.style.display='block';renderTO()};
}
if(typeof hideTacUI==='function'){
var _ht=hideTacUI;
hideTacUI=function(){_ht.apply(this,arguments);var to=document.getElementById('turn-order');if(to)to.style.display='none'};
}

// =============================================
// SECTION 8: EXTRA QUIZ QUESTIONS (10문)
// =============================================
if(typeof QUIZZES!=='undefined'){
[{q:'고구려의 건국 신화에서 주몽의 어머니는?',a:['유화','웅녀','소서노','허황옥'],c:0},
{q:'백제를 건국한 온조왕의 형은?',a:['비류','주몽','혁거세','수로왕'],c:0},
{q:'고조선의 8조법 중 남아있는 3조에 해당하지 않는 것은?',a:['부정한 자는 구제함','사람을 죽인 자는 사형','도둑은 12배 배상','상해를 입힌 자는 곡물로 배상'],c:0},
{q:'철기시대의 대표적인 무기는?',a:['세형동검','비파형동검','돌도끼','뿔화살촉'],c:0},
{q:'고조선의 위치로 가장 유력한 설은?',a:['대동강 유역 중심설','한반도 남부설','일본 열도설','중국 산동성설'],c:0},
{q:'부여의 특산물로 유명한 것은?',a:['모피(모피옥)','비단','철기','소금'],c:0},
{q:'진한은 후에 어느 나라로 발전했는가?',a:['신라','백제','고구려','가야'],c:0},
{q:'삼한에서 군장의 세력이 미치지 못하는 신성구역을?',a:['소도','신시','아사달','태백산'],c:0},
{q:'옥저의 특징적인 풍습은?',a:['민며느리혼(골장제)','순장','제천행사','철기 교역'],c:0},
{q:'동예의 법률에서 다른 부족의 영역을 침범하면?',a:['책화(보상)','사형','추방','노비로 삼음'],c:0}
].forEach(function(q){QUIZZES.push(q)});
}

// =============================================
// SECTION 9: ADDITIONAL SFX
// =============================================
if(typeof window.sfx==='function'&&typeof ac!=='undefined'){
var _sfx=window.sfx;
window.sfx=function(t){
if(t==='achievement'&&ac&&typeof pn==='function'){
pn(523,.1,'sine');setTimeout(function(){pn(659,.1,'sine')},100);setTimeout(function(){pn(784,.2,'sine')},200);setTimeout(function(){pn(1047,.3,'sine')},300);return;
}
if(t==='battle_start'&&ac&&typeof pn==='function'){
[392,392,523,392,330,392,523,659].forEach(function(f,i){setTimeout(function(){pn(f,.15,'sine')},i*100)});return;
}
if(t==='chapter_clear'&&ac&&typeof pn==='function'){
[523,523,659,784,659,784,1047,1047].forEach(function(f,i){setTimeout(function(){pn(f,.2,'sine')},i*150)});return;
}
if(t==='promote'&&ac&&typeof pn==='function'){
[262,330,392,523,659,784].forEach(function(f,i){setTimeout(function(){pn(f,.15,'sine')},i*80)});return;
}
_sfx(t);
};
}

// =============================================
// SECTION 10: PERIODIC CHECK + EXPORTS
// =============================================
setInterval(function(){chkAch()},15000);
chkAch();

window._v10={stats:st,unlocked:ul,achDefs:ACH,renderAch:renderAch,renderStats:renderStats,checkAch:chkAch};
})();
