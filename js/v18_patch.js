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

'.council-wrap{max-width:560px;margin:0 auto}',
'.council-canvas-wrap{text-align:center}',
'.council-canvas-wrap canvas{border:2px solid #5a4a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.council-cards{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}',
'.council-card{background:linear-gradient(135deg,rgba(30,20,10,.95),rgba(15,10,5,.95));border:2px solid #5a4a3a;border-radius:12px;padding:14px;transition:all .3s;cursor:pointer}',
'.council-card:hover{border-color:#FFD700;transform:translateY(-2px)}',
'.council-card .cc-icon{font-size:28px;margin-bottom:6px;display:block;text-align:center}',
'.council-card .cc-name{font-size:12px;color:#FFD700;font-weight:700;text-align:center}',
'.council-card .cc-role{font-size:9px;color:#c4956a;text-align:center;margin:4px 0}',
'.council-card .cc-advice{font-size:10px;color:#e8dcc8;line-height:1.7;margin-top:8px;background:rgba(0,0,0,.3);border-radius:6px;padding:8px;border-left:3px solid #FFD700}',
'.council-overall{text-align:center;margin-top:12px;padding:14px;background:rgba(20,15,10,.8);border:1px solid #3a3a4a;border-radius:10px}',
'.council-overall h4{color:#FFD700;font-size:13px;margin-bottom:6px}',
'.council-overall p{font-size:11px;color:#c4956a;line-height:1.8}',

'.timeline-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.timeline-wrap canvas{border:2px solid #3a4a5a;border-radius:10px;background:#0a0a14;display:block;margin:0 auto 12px;cursor:pointer}',
'.timeline-legend{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.timeline-legend span{font-size:9px;padding:3px 8px;border-radius:4px;border:1px solid #3a3a4a;background:rgba(26,20,40,.7)}',
'.timeline-detail{font-size:11px;color:#8a7a6a;text-align:center;line-height:1.8;max-width:400px;margin:8px auto;background:rgba(20,15,10,.6);border:1px solid #3a3a2a;border-radius:8px;padding:12px;display:none}',
'.timeline-detail.on{display:block}',
'.timeline-detail strong{color:#FFD700}',
'.timeline-detail em{color:#5FA0FF;font-style:normal}',

'.supply-wrap{max-width:560px;margin:0 auto}',
'.supply-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}',
'.supply-card{background:linear-gradient(135deg,rgba(20,30,15,.95),rgba(10,20,8,.95));border:2px solid #3a5a3a;border-radius:12px;padding:14px;text-align:center;transition:all .3s}',
'.supply-card:hover{border-color:#4CAF50}',
'.supply-card .sp-icon{font-size:32px;margin-bottom:4px}',
'.supply-card .sp-name{font-size:12px;color:#FFD700;font-weight:700}',
'.supply-card .sp-amount{font-size:22px;color:#4CAF50;font-weight:900;margin:6px 0}',
'.supply-card .sp-rate{font-size:9px;color:#8a7a6a}',
'.supply-bar{height:8px;background:#1a2a1a;border-radius:4px;overflow:hidden;margin:6px 0}',
'.supply-bar-fill{height:100%;border-radius:4px;transition:width .5s;background:linear-gradient(90deg,#4CAF50,#8BC34A)}',
'.supply-btns{display:flex;gap:4px;margin-top:6px;justify-content:center}',
'.sp-btn{padding:4px 10px;border:1px solid #3a5a3a;border-radius:4px;background:#1a2a1a;color:#e8dcc8;font-size:10px;cursor:pointer;font-family:inherit}',
'.sp-btn:hover{border-color:#4CAF50;background:#2a3a2a}',
'.supply-canvas-wrap{text-align:center;margin-top:12px}',
'.supply-canvas-wrap canvas{border:2px solid #3a5a3a;border-radius:10px;background:#0a0a14;display:block;margin:0 auto}',

'.scout-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.scout-wrap canvas{border:2px solid #3a3a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px;cursor:pointer}',
'.scout-stats{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.scout-stats span{font-size:10px;padding:3px 8px;border-radius:4px;border:1px solid #3a3a5a;background:rgba(20,15,30,.7);color:#c4956a}',
'.scout-btns{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.scout-legend{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.scout-legend span{font-size:9px;padding:3px 8px;border-radius:4px;border:1px solid #3a3a4a;background:rgba(26,20,40,.7)}',

'.forge-wrap{max-width:560px;margin:0 auto}',
'.forge-items{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px}',
'.forge-card{background:linear-gradient(135deg,rgba(40,20,10,.95),rgba(25,12,5,.95));border:2px solid #6a4a2a;border-radius:12px;padding:14px;text-align:center;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}',
'.forge-card:hover{border-color:#FF9800;transform:translateY(-3px);box-shadow:0 6px 20px rgba(255,152,0,.15)}',
'.forge-card.crafted{border-color:#FFD700;background:linear-gradient(135deg,rgba(60,40,10,.95),rgba(40,25,5,.95))}',
'.forge-card .fc-icon{font-size:36px;margin-bottom:6px;display:block}',
'.forge-card .fc-name{font-size:12px;color:#FFD700;font-weight:700}',
'.forge-card .fc-rarity{font-size:9px;margin-top:2px;font-weight:600}',
'.forge-card .fc-desc{font-size:9px;color:#8a7a6a;margin-top:6px;line-height:1.5}',
'.forge-card .fc-mats{font-size:9px;color:#FF9800;margin-top:6px}',
'.forge-card .fc-craft{display:inline-block;margin-top:8px;padding:4px 14px;border:1px solid #6a4a2a;border-radius:4px;background:#3a2a1a;color:#FFD700;font-size:10px;cursor:pointer;font-family:inherit}',
'.forge-card .fc-craft:hover{background:#5a3a2a}',
'.forge-card .fc-craft:disabled{opacity:.4;cursor:not-allowed}',
'.forge-mats-pool{text-align:center;margin-bottom:12px;padding:10px;background:rgba(20,15,10,.7);border:1px solid #3a3a2a;border-radius:8px}',
'.forge-mats-pool span{font-size:10px;padding:3px 8px;border-radius:4px;border:1px solid #4a3a2a;background:rgba(40,25,10,.7);color:#FF9800;margin:2px}',

'.theater-wrap{max-width:560px;margin:0 auto}',
'.theater-scenes{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}',
'.theater-card{background:linear-gradient(135deg,rgba(30,15,40,.95),rgba(15,8,25,.95));border:2px solid #5a3a6a;border-radius:12px;padding:14px;text-align:center;cursor:pointer;transition:all .3s}',
'.theater-card:hover{border-color:#aa88ff;transform:translateY(-3px);box-shadow:0 6px 20px rgba(170,136,255,.15)}',
'.theater-card.watched{border-color:#4CAF50;opacity:.8}',
'.theater-card .tc-icon{font-size:32px;margin-bottom:6px}',
'.theater-card .tc-name{font-size:11px;color:#FFD700;font-weight:700}',
'.theater-card .tc-era{font-size:9px;color:#aa88ff;margin-top:2px}',
'.theater-stage{display:none;max-width:500px;margin:12px auto;background:rgba(5,3,8,.98);border:2px solid #5a3a6a;border-radius:12px;padding:20px;text-align:center}',
'.theater-stage.on{display:block}',
'.theater-stage .ts-title{font-size:16px;color:#FFD700;font-weight:700;margin-bottom:12px}',
'.theater-stage .ts-scene{font-size:48px;margin-bottom:12px;line-height:1.5}',
'.theater-stage .ts-narration{font-size:12px;color:#e8dcc8;line-height:2;margin-bottom:12px}',
'.theater-stage .ts-fact{font-size:10px;color:#5FA0FF;line-height:1.6;background:rgba(20,20,40,.6);border-radius:6px;padding:8px;margin-top:8px}',

'.report-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.report-wrap canvas{border:2px solid #3a3a4a;border-radius:10px;background:#0a0a14;display:block;margin:0 auto 12px}',
'.report-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0}',
'.report-stat{background:rgba(20,15,30,.9);border:1px solid #3a3a5a;border-radius:8px;padding:10px;text-align:center}',
'.report-stat .rs-val{font-size:20px;color:#FFD700;font-weight:900}',
'.report-stat .rs-label{font-size:9px;color:#8a7a6a;margin-top:4px}',
'.report-dl{display:inline-block;margin-top:8px;padding:8px 20px;border:1px solid #5a3a1a;border-radius:6px;background:#2a2438;color:#FFD700;font-size:12px;cursor:pointer;font-family:inherit;font-weight:700}',
'.report-dl:hover{background:#3a3448;border-color:#FFD700}',

'.training-wrap{max-width:560px;margin:0 auto}',
'.training-drills{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:12px}',
'.training-card{background:linear-gradient(135deg,rgba(20,25,35,.95),rgba(10,15,25,.95));border:2px solid #3a4a5a;border-radius:12px;padding:14px;text-align:center;cursor:pointer;transition:all .3s}',
'.training-card:hover{border-color:#5FA0FF;transform:translateY(-2px)}',
'.training-card.active{border-color:#FFD700;box-shadow:0 0 15px rgba(255,215,0,.15)}',
'.training-card .td-icon{font-size:32px;margin-bottom:6px}',
'.training-card .td-name{font-size:12px;color:#FFD700;font-weight:700}',
'.training-card .td-desc{font-size:9px;color:#8a7a6a;margin-top:4px;line-height:1.5}',
'.training-card .td-level{font-size:10px;color:#5FA0FF;margin-top:6px;font-weight:600}',
'.training-arena{display:none;max-width:480px;margin:12px auto;text-align:center}',
'.training-arena.on{display:block}',
'.training-arena canvas{border:2px solid #4a5a6a;border-radius:10px;background:#0a0a14;display:block;margin:0 auto 12px;cursor:pointer}',
'.training-result{font-size:12px;color:#FFD700;margin:8px 0;padding:8px;background:rgba(20,15,10,.7);border-radius:6px}',

'@media(max-width:480px){.council-cards{grid-template-columns:1fr}.supply-grid{grid-template-columns:1fr}.training-drills{grid-template-columns:1fr}}'
].join('\n');
document.head.appendChild(css);

function v18Toast(msg,color){
var t=document.createElement('div');t.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:'+(color||'#c4956a')+'dd;color:#fff;font-size:13px;font-weight:700;padding:10px 20px;border-radius:8px;z-index:999;pointer-events:none;animation:fadeIn .3s';
t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.remove()},1800);
}

function v18SFX(type){
try{
var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
var ctx=new AC();var o=ctx.createOscillator();var g=ctx.createGain();o.connect(g);g.connect(ctx.destination);
var presets={
council_open:{f:440,t:'sine',d:.15,v:.12},council_advice:{f:660,t:'triangle',d:.2,v:.1},
timeline_scroll:{f:350,t:'sine',d:.1,v:.08},timeline_click:{f:520,t:'triangle',d:.12,v:.1},
supply_collect:{f:600,t:'square',d:.1,v:.08},supply_produce:{f:480,t:'triangle',d:.15,v:.1},
scout_deploy:{f:400,t:'sawtooth',d:.12,v:.08},scout_discover:{f:700,t:'sine',d:.2,v:.12},
forge_craft:{f:300,t:'sawtooth',d:.25,v:.1},forge_upgrade:{f:800,t:'triangle',d:.2,v:.12},
theater_open:{f:520,t:'sine',d:.2,v:.1},theater_scene:{f:440,t:'triangle',d:.3,v:.08}
};
var p=presets[type]||{f:440,t:'sine',d:.15,v:.1};
o.type=p.t;o.frequency.setValueAtTime(p.f,ctx.currentTime);g.gain.setValueAtTime(p.v,ctx.currentTime);
g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+p.d);o.start();o.stop(ctx.currentTime+p.d);
}catch(e){}
}

// ─── Achievement System ───
var V18_ACH=[
{id:'council_first',name:'첫 자문회의',desc:'전략 자문회의를 처음 열었다',icon:'🏛️'},
{id:'council_all',name:'사방 자문관',desc:'4명 자문관의 조언을 모두 확인',icon:'📜'},
{id:'timeline_explorer',name:'시간여행자',desc:'역사 연표를 처음 탐험했다',icon:'⏳'},
{id:'timeline_10',name:'역사 박사',desc:'연표에서 10개 사건을 확인',icon:'🎓'},
{id:'supply_manager',name:'보급 담당관',desc:'군량미 관리소를 처음 열었다',icon:'🌾'},
{id:'supply_full',name:'풍요의 시대',desc:'4종 보급품을 모두 최대치로 채움',icon:'📦'},
{id:'scout_first',name:'첫 정찰병',desc:'정찰망에 첫 첩보원을 배치',icon:'🔭'},
{id:'scout_master',name:'정찰의 달인',desc:'정찰 지도를 50% 이상 밝힘',icon:'🗺️'},
{id:'forge_first',name:'대장장이 견습',desc:'첫 전설무기를 제련했다',icon:'🔨'},
{id:'forge_3',name:'명검 수집가',desc:'전설무기 3종 이상 제련 완료',icon:'⚔️'},
{id:'theater_first',name:'첫 관람',desc:'역사 명장면을 처음 관람했다',icon:'🎭'},
{id:'training_first',name:'훈련병',desc:'병영 훈련소에서 첫 훈련 완료',icon:'🏋️'}
];

function loadV18Ach(){try{return JSON.parse(localStorage.getItem('krpg_v18_ach'))||[];}catch(e){return[];}}
function saveV18Ach(a){localStorage.setItem('krpg_v18_ach',JSON.stringify(a));}
function v18CheckAch(id){
var a=loadV18Ach();if(a.indexOf(id)>=0)return;a.push(id);saveV18Ach(a);
var info=null;V18_ACH.forEach(function(x){if(x.id===id)info=x;});
if(info)v18Toast(info.icon+' 업적: '+info.name,'#FFD700');
var allAch=[];try{allAch=JSON.parse(localStorage.getItem('krpg_ach'))||[];}catch(e){}
if(allAch.indexOf('v18_'+id)<0){allAch.push('v18_'+id);localStorage.setItem('krpg_ach',JSON.stringify(allAch));}
}

// ─── Quiz System ───
var V18_QUIZ=[
{q:'고조선의 8조법금 중 현재 전해지는 것은 몇 조인가?',a:['3조','5조','7조','8조'],c:0},
{q:'위만이 조선에 들어온 경로는?',a:['해로','육로(패수)','북방초원로','한강수로'],c:1},
{q:'고조선의 대표적 청동기 유물은?',a:['비파형동검','세형동검','동경','동탁'],c:0},
{q:'부여의 제천행사 이름은?',a:['무천','동맹','영고','팔관회'],c:2},
{q:'고조선 멸망 후 설치된 한사군에 포함되지 않는 것은?',a:['낙랑군','임둔군','대방군','진번군'],c:2},
{q:'삼한 중 변한에서 발전한 나라는?',a:['백제','신라','가야','발해'],c:2},
{q:'고조선의 수도 왕검성의 위치로 유력한 곳은?',a:['평양','서울','개성','부여'],c:0},
{q:'단군왕검이 나라를 세운 해는 기원전 몇 년인가?',a:['2333','2000','1500','1000'],c:0},
{q:'옥저의 결혼 풍습은?',a:['서옥제','민며느리제','데릴사위제','족외혼'],c:1},
{q:'동예의 특산물이 아닌 것은?',a:['단궁','과하마','반어피','비단'],c:3},
{q:'고조선의 세력범위를 알 수 있는 유물은?',a:['비파형동검','빗살무늬토기','미송리식토기','가락바퀴'],c:0},
{q:'부여의 왕 아래 관직이 아닌 것은?',a:['마가','우가','저가','신가'],c:3},
{q:'삼한의 제사장 역할을 한 것은?',a:['천군','무당','사제','도사'],c:0},
{q:'고조선에서 도둑질의 처벌은?',a:['노비','사형','추방','벌금 50만전'],c:3},
{q:'철기문화를 처음 수용한 한반도 국가는?',a:['고조선','부여','고구려','백제'],c:0}
];

function registerV18Quiz(){
if(window.KRPG_QUIZ&&Array.isArray(window.KRPG_QUIZ)){
V18_QUIZ.forEach(function(q){window.KRPG_QUIZ.push(q);});
}else{
window.KRPG_QUIZ=V18_QUIZ.slice();
}
}

// ═══════════════════════════════════════════════
// 1. 전략 자문회의 (Strategic Council)
// ═══════════════════════════════════════════════
var COUNCIL_MEMBERS=[
{id:'military',name:'을지무공',role:'군사 자문관',icon:'⚔️',color:'#F44336',
 getAdvice:function(s){
  var w=s.wins||0;var b=s.battles||0;
  if(w<3)return '전투 경험이 부족합니다. 먼저 약한 적과 전투하여 경험을 쌓으십시오. 병사들의 사기가 올라갈 것입니다.';
  if(w<10)return '전투력이 성장하고 있습니다. 편대 편성을 강화하고, 기병과 궁병의 비율을 조절하십시오. 지형 이점을 활용하면 승률이 오를 것입니다.';
  return '대장군께서는 이미 백전노장입니다. 이제 적의 약점을 파고들어 승리조건을 달성할 때입니다. 전설무기를 갖추면 천하무적이 될 것입니다.';
 }},
{id:'culture',name:'해모수',role:'문화 자문관',icon:'🎭',color:'#9C27B0',
 getAdvice:function(s){
  var q=s.quizOk||0;
  if(q<10)return '역사 지식을 쌓으십시오. 퀴즈를 풀어 지혜를 높이면 외교에서도 우위를 점할 수 있습니다. 역사 연표를 먼저 살펴보시길 권합니다.';
  if(q<50)return '문화 역량이 커지고 있습니다. 역사 명장면을 관람하여 영감을 얻고, 문화유산을 발전시키십시오. 제사를 통한 신앙 역시 중요합니다.';
  return '탁월한 학식입니다. 이제 문화 승리를 노려볼 만합니다. 연표의 모든 사건을 탐험하고, 왕조의 계보를 완성하십시오.';
 }},
{id:'economy',name:'위만',role:'경제 자문관',icon:'💰',color:'#FF9800',
 getAdvice:function(s){
  var supply=loadSupply();var total=supply.grain+supply.weapons+supply.medicine+supply.horses;
  if(total<200)return '보급이 위험합니다! 군량미 관리소를 열어 자원을 확보하십시오. 보급 없이는 장기전을 버틸 수 없습니다.';
  if(total<500)return '자원이 안정되고 있습니다. 교역을 활성화하고, 무기 생산을 늘리십시오. 대장간에서 전설무기를 제련하면 전투력이 크게 올라갑니다.';
  return '경제 기반이 탄탄합니다. 잉여 자원을 외교 선물로 활용하여 동맹을 강화하거나, 병력 증강에 투입하십시오.';
 }},
{id:'diplomacy',name:'유화부인',role:'외교 자문관',icon:'🕊️',color:'#2196F3',
 getAdvice:function(s){
  var ach=loadV18Ach();var scouted=ach.indexOf('scout_first')>=0;
  if(!scouted)return '정찰망을 구축하십시오. 적의 동태를 파악하지 못하면 외교에서 불리해집니다. 첩보원을 배치하여 정보를 수집하십시오.';
  return '정찰 활동이 활발합니다. 수집된 정보를 바탕으로 동맹을 강화하고, 적대 세력을 고립시키십시오. 선물 외교와 위협을 적절히 섞으면 효과적입니다.';
 }}
];

function renderCouncilPanel(){
var existing=document.getElementById('v18-council');if(existing)existing.remove();
var p=document.createElement('div');p.id='v18-council';p.className='v18-panel';
var stats;try{stats=JSON.parse(localStorage.getItem('krpg_stats'))||{};}catch(e){stats={};}
p.innerHTML='<h2>&#127963;&#65039; 전략 자문회의</h2><p class="v18-sub">4명의 자문관이 현재 상황을 분석합니다</p>';
document.body.appendChild(p);

var wrap=document.createElement('div');wrap.className='council-wrap';

var canvasWrap=document.createElement('div');canvasWrap.className='council-canvas-wrap';
var canvas=document.createElement('canvas');canvas.width=400;canvas.height=400;
canvasWrap.appendChild(canvas);wrap.appendChild(canvasWrap);

drawCouncilRadar(canvas,stats);

var cards=document.createElement('div');cards.className='council-cards';
COUNCIL_MEMBERS.forEach(function(m){
var card=document.createElement('div');card.className='council-card';
var advice=m.getAdvice(stats);
card.innerHTML='<span class="cc-icon">'+m.icon+'</span><div class="cc-name">'+m.name+'</div><div class="cc-role">'+m.role+'</div><div class="cc-advice">&ldquo;'+advice+'&rdquo;</div>';
card.onclick=function(){v18SFX('council_advice');v18Toast(m.name+' 자문관의 의견을 확인했습니다','#c4956a');};
cards.appendChild(card);
});
wrap.appendChild(cards);

var overall=document.createElement('div');overall.className='council-overall';
var w=stats.wins||0;var q=stats.quizOk||0;var supply=loadSupply();var total=supply.grain+supply.weapons+supply.medicine+supply.horses;
var score=Math.min(100,Math.floor(w*5+q*2+total/10));
var grade=score>=80?'S':score>=60?'A':score>=40?'B':score>=20?'C':'D';
overall.innerHTML='<h4>종합 국력 평가: '+grade+'등급 ('+score+'/100)</h4><p>군사: '+w+'승 | 문화: '+q+'문 | 경제: '+total+' 보급 | 외교: 활동중</p>';
wrap.appendChild(overall);

p.appendChild(wrap);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-council\').classList.remove(\'on\')">닫기</button>';

v18SFX('council_open');v18CheckAch('council_first');
var advisorsSeen=[];
COUNCIL_MEMBERS.forEach(function(){advisorsSeen.push(true);});
if(advisorsSeen.length>=4)v18CheckAch('council_all');
}

function drawCouncilRadar(canvas,stats){
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
var cx=W/2,cy=H/2,r=140;
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,W,H);

var labels=['군사력','문화력','경제력','외교력'];
var colors=['#F44336','#9C27B0','#FF9800','#2196F3'];
var w=stats.wins||0;var q=stats.quizOk||0;var supply=loadSupply();var total=supply.grain+supply.weapons+supply.medicine+supply.horses;
var scouts=loadScout();var scoutPct=0;scouts.forEach(function(row){row.forEach(function(c){if(c>0)scoutPct++;});});scoutPct=Math.floor(scoutPct/120*100);
var values=[Math.min(100,w*8),Math.min(100,q*3),Math.min(100,total/8),Math.min(100,scoutPct*2)];

for(var ring=1;ring<=4;ring++){
ctx.beginPath();ctx.strokeStyle='rgba(90,80,60,.3)';ctx.lineWidth=1;
for(var i=0;i<4;i++){
var angle=-Math.PI/2+i*(Math.PI*2/4);
var x=cx+Math.cos(angle)*r*ring/4;var y=cy+Math.sin(angle)*r*ring/4;
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}ctx.closePath();ctx.stroke();
}

for(var i=0;i<4;i++){
var angle=-Math.PI/2+i*(Math.PI*2/4);
ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(angle)*r,cy+Math.sin(angle)*r);
ctx.strokeStyle='rgba(90,80,60,.4)';ctx.lineWidth=1;ctx.stroke();
ctx.fillStyle=colors[i];ctx.font='bold 11px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(labels[i],cx+Math.cos(angle)*(r+20),cy+Math.sin(angle)*(r+20));
}

ctx.beginPath();
for(var i=0;i<4;i++){
var angle=-Math.PI/2+i*(Math.PI*2/4);
var val=values[i]/100*r;
var x=cx+Math.cos(angle)*val;var y=cy+Math.sin(angle)*val;
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.closePath();
ctx.fillStyle='rgba(255,215,0,.15)';ctx.fill();
ctx.strokeStyle='#FFD700';ctx.lineWidth=2;ctx.stroke();

for(var i=0;i<4;i++){
var angle=-Math.PI/2+i*(Math.PI*2/4);
var val=values[i]/100*r;
ctx.beginPath();ctx.arc(cx+Math.cos(angle)*val,cy+Math.sin(angle)*val,4,0,Math.PI*2);
ctx.fillStyle=colors[i];ctx.fill();
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
ctx.fillText(Math.floor(values[i])+'%',cx+Math.cos(angle)*(val+15),cy+Math.sin(angle)*(val+15));
}

ctx.fillStyle='#c4956a';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
ctx.fillText('국력 레이더',cx,25);
}

// ═══════════════════════════════════════════════
// 2. 역사 연표 탐험기 (History Timeline Explorer)
// ═══════════════════════════════════════════════
var TIMELINE_EVENTS=[
{year:-2333,name:'단군 건국',desc:'환인의 아들 환웅이 하늘에서 내려와 인간 세상을 다스리고, 곰녀와 결혼하여 단군왕검이 태어남. 아사달에 도읍하여 고조선 건국.',icon:'👑',era:'고조선'},
{year:-1122,name:'기자 동래설',desc:'은나라 기자가 조선으로 와서 예의와 농사, 누에치기를 가르쳤다는 전승. 역사적 실체에 대해서는 논쟁이 있음.',icon:'📜',era:'고조선'},
{year:-800,name:'비파형동검 전성기',desc:'고조선 고유의 비파형동검이 요동~한반도 서북부에 광범위하게 분포. 독자적 청동기 문화권 형성.',icon:'⚔️',era:'고조선'},
{year:-400,name:'철기 문화 수용',desc:'중국으로부터 철기 기술이 전래되어 농업 생산력이 비약적으로 증가. 사회 분화 가속.',icon:'🔨',era:'고조선'},
{year:-300,name:'고조선 전성기',desc:'연나라와 대등한 세력으로 성장. 동방의 강국으로 중국 문헌에 기록됨.',icon:'🏰',era:'고조선'},
{year:-194,name:'위만의 집권',desc:'연나라 출신 위만이 준왕을 몰아내고 왕위를 차지. 중계무역을 장악하여 부강해짐.',icon:'🗡️',era:'위만조선'},
{year:-128,name:'예군 남려 항복',desc:'예군 남려가 28만 명을 이끌고 한나라에 항복. 창해군 설치. 고조선의 영향력 약화.',icon:'🏳️',era:'위만조선'},
{year:-109,name:'한무제 침공',desc:'한무제가 육해 양면으로 고조선을 침공. 왕검성 포위전이 1년간 지속됨.',icon:'⚔️',era:'위만조선'},
{year:-108,name:'고조선 멸망',desc:'내부 분열로 우거왕이 살해되고 고조선 멸망. 한사군(낙랑, 진번, 임둔, 현도) 설치.',icon:'💀',era:'위만조선'},
{year:-86,name:'부여 건국',desc:'동명왕이 부여를 건국했다는 전승. 만주 송화강 유역에서 성장한 예맥족의 국가.',icon:'🦌',era:'부여'},
{year:-75,name:'현도군 축출',desc:'고구려 세력이 성장하여 현도군을 서쪽으로 밀어냄. 한의 동방 지배력 약화 시작.',icon:'🛡️',era:'열국'},
{year:-59,name:'부여 영고',desc:'부여의 대규모 제천행사. 12월에 하늘에 제사 지내고 가무음주를 즐김. 형벌 사면.',icon:'🎪',era:'부여'},
{year:-57,name:'신라 건국',desc:'박혁거세가 사로6촌장의 추대로 서라벌에 건국. 삼국 중 가장 먼저 건국 기록.',icon:'🌟',era:'삼한'},
{year:-37,name:'고구려 건국',desc:'주몽이 졸본에 고구려를 건국. 부여에서 남하하여 새 나라를 세움.',icon:'🏹',era:'열국'},
{year:-18,name:'백제 건국',desc:'온조가 위례성에 백제를 건국. 주몽의 아들로 고구려에서 남하.',icon:'🏯',era:'열국'},
{year:-6,name:'가야 건국',desc:'수로왕이 김해 지역에 금관가야를 건국. 철 생산과 해상 교역으로 성장.',icon:'⛵',era:'삼한'},
{year:3,name:'고구려 국내성 천도',desc:'유리왕이 졸본에서 국내성(집안)으로 수도를 옮김. 고구려 발전의 전환점.',icon:'🏗️',era:'열국'},
{year:32,name:'부여 왕인 전쟁',desc:'부여가 주변 세력과의 전쟁에서 승리하며 세력 확장. 동부여의 흥성.',icon:'⚔️',era:'부여'},
{year:42,name:'가야 연맹 형성',desc:'6가야가 연맹체를 형성하여 낙동강 유역의 패권을 장악.',icon:'🤝',era:'삼한'},
{year:53,name:'고구려 태조왕 즉위',desc:'태조왕이 즉위하여 고구려를 정복왕국으로 발전시킴. 옥저, 동예 복속.',icon:'👑',era:'열국'}
];

var timelineViewed=[];
function loadTimeline(){try{timelineViewed=JSON.parse(localStorage.getItem('krpg_v18_timeline'))||[];}catch(e){timelineViewed=[];}}
function saveTimeline(){localStorage.setItem('krpg_v18_timeline',JSON.stringify(timelineViewed));}

function renderTimelinePanel(){
var existing=document.getElementById('v18-timeline');if(existing)existing.remove();
var p=document.createElement('div');p.id='v18-timeline';p.className='v18-panel';
loadTimeline();
p.innerHTML='<h2>&#9203; 역사 연표 탐험기</h2><p class="v18-sub">고조선부터 삼국 건국까지 &#8212; 20대 역사 사건</p>';
document.body.appendChild(p);

var wrap=document.createElement('div');wrap.className='timeline-wrap';
var canvas=document.createElement('canvas');canvas.width=540;canvas.height=600;
wrap.appendChild(canvas);
drawTimeline(canvas);

var legend=document.createElement('div');legend.className='timeline-legend';
['👑 고조선','🗡️ 위만조선','🦌 부여','🌟 삼한','🏹 열국'].forEach(function(t){
var s=document.createElement('span');s.textContent=t;legend.appendChild(s);
});
wrap.appendChild(legend);

var detail=document.createElement('div');detail.id='v18-timeline-detail';detail.className='timeline-detail';
wrap.appendChild(detail);

canvas.onclick=function(e){
var rect=canvas.getBoundingClientRect();
var mx=(e.clientX-rect.left)*(canvas.width/rect.width);
var my=(e.clientY-rect.top)*(canvas.height/rect.height);
var nodeR=8,startY=50,gap=27;
for(var i=0;i<TIMELINE_EVENTS.length;i++){
var ev=TIMELINE_EVENTS[i];
var x=270,y=startY+i*gap;
if(Math.abs(mx-x)<20&&Math.abs(my-y)<15){
if(timelineViewed.indexOf(i)<0){timelineViewed.push(i);saveTimeline();}
var det=document.getElementById('v18-timeline-detail');
det.className='timeline-detail on';
det.innerHTML='<strong>'+ev.icon+' '+ev.name+'</strong> <em>(기원전 '+Math.abs(ev.year)+'년)</em><br><br>'+ev.desc;
v18SFX('timeline_click');
if(timelineViewed.length>=10)v18CheckAch('timeline_10');
drawTimeline(canvas);
break;
}
}
};

p.appendChild(wrap);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-timeline\').classList.remove(\'on\')">닫기</button>';
v18SFX('timeline_scroll');v18CheckAch('timeline_explorer');
}

function drawTimeline(canvas){
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,W,H);

var startY=50,gap=27,lineX=270;
ctx.strokeStyle='rgba(196,149,106,.4)';ctx.lineWidth=2;
ctx.beginPath();ctx.moveTo(lineX,startY-10);ctx.lineTo(lineX,startY+TIMELINE_EVENTS.length*gap+10);ctx.stroke();

var eraColors={'고조선':'#FFD700','위만조선':'#FF5722','부여':'#8BC34A','삼한':'#E91E63','열국':'#2196F3'};

TIMELINE_EVENTS.forEach(function(ev,i){
var y=startY+i*gap;
var viewed=timelineViewed.indexOf(i)>=0;
var col=eraColors[ev.era]||'#888';

ctx.beginPath();ctx.arc(lineX,y,6,0,Math.PI*2);
ctx.fillStyle=viewed?col:'#3a3a4a';ctx.fill();
ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.stroke();

ctx.fillStyle=viewed?'#e8dcc8':'#5a5a6a';
ctx.font=(viewed?'bold ':'')+' 10px sans-serif';
var side=i%2===0?-1:1;
ctx.textAlign=side<0?'right':'left';
var textX=lineX+side*20;
ctx.fillText(ev.icon+' '+ev.name,textX,y+4);

ctx.fillStyle='#5a5a6a';ctx.font='8px sans-serif';
ctx.fillText('BC '+Math.abs(ev.year),textX,y+15);
});

ctx.fillStyle='#c4956a';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
ctx.fillText('역사 연표 ('+timelineViewed.length+'/'+TIMELINE_EVENTS.length+' 탐험)',W/2,25);
}

// ═══════════════════════════════════════════════
// 3. 군량미 관리소 (Supply Depot)
// ═══════════════════════════════════════════════
var SUPPLY_TYPES=[
{id:'grain',name:'군량미',icon:'🌾',max:200,rate:5,color:'#8BC34A'},
{id:'weapons',name:'무기',icon:'⚔️',max:150,rate:3,color:'#F44336'},
{id:'medicine',name:'약재',icon:'🌿',max:100,rate:2,color:'#4CAF50'},
{id:'horses',name:'군마',icon:'🐴',max:80,rate:1,color:'#FF9800'}
];

function loadSupply(){
try{return JSON.parse(localStorage.getItem('krpg_v18_supply'))||{grain:50,weapons:20,medicine:10,horses:5};}
catch(e){return{grain:50,weapons:20,medicine:10,horses:5};}
}
function saveSupply(s){localStorage.setItem('krpg_v18_supply',JSON.stringify(s));}

function renderSupplyPanel(){
var existing=document.getElementById('v18-supply');if(existing)existing.remove();
var p=document.createElement('div');p.id='v18-supply';p.className='v18-panel';
var supply=loadSupply();
p.innerHTML='<h2>&#127806; 군량미 관리소</h2><p class="v18-sub">보급품 4종을 관리하여 전쟁을 대비하십시오</p>';
document.body.appendChild(p);

var wrap=document.createElement('div');wrap.className='supply-wrap';

var grid=document.createElement('div');grid.className='supply-grid';
SUPPLY_TYPES.forEach(function(st){
var card=document.createElement('div');card.className='supply-card';
var amt=supply[st.id]||0;
var pct=Math.floor(amt/st.max*100);
card.innerHTML='<div class="sp-icon">'+st.icon+'</div><div class="sp-name">'+st.name+'</div><div class="sp-amount">'+amt+'</div><div class="sp-rate">턴당 +'+st.rate+' / 최대 '+st.max+'</div><div class="supply-bar"><div class="supply-bar-fill" style="width:'+pct+'%;background:linear-gradient(90deg,'+st.color+','+st.color+'aa)"></div></div><div class="supply-btns"><button class="sp-btn" data-id="'+st.id+'" data-action="collect">수집 +'+st.rate+'</button><button class="sp-btn" data-id="'+st.id+'" data-action="boost">긴급조달 +'+(st.rate*3)+'</button></div>';
grid.appendChild(card);
});
wrap.appendChild(grid);

wrap.addEventListener('click',function(e){
var btn=e.target.closest('.sp-btn');if(!btn)return;
var id=btn.dataset.id;var action=btn.dataset.action;
var supply=loadSupply();var st=null;SUPPLY_TYPES.forEach(function(s){if(s.id===id)st=s;});if(!st)return;
var add=action==='boost'?st.rate*3:st.rate;
supply[id]=Math.min(st.max,supply[id]+add);
saveSupply(supply);
v18SFX(action==='boost'?'supply_produce':'supply_collect');
v18Toast(st.icon+' '+st.name+' +'+add,'#4CAF50');
var allFull=true;SUPPLY_TYPES.forEach(function(s){if(supply[s.id]<s.max)allFull=false;});
if(allFull)v18CheckAch('supply_full');
renderSupplyPanel();document.getElementById('v18-supply').classList.add('on');
});

var canvasWrap=document.createElement('div');canvasWrap.className='supply-canvas-wrap';
var canvas=document.createElement('canvas');canvas.width=480;canvas.height=240;
canvasWrap.appendChild(canvas);wrap.appendChild(canvasWrap);
drawSupplyChart(canvas,supply);

p.appendChild(wrap);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-supply\').classList.remove(\'on\')">닫기</button>';
v18SFX('supply_collect');v18CheckAch('supply_manager');
}

function drawSupplyChart(canvas,supply){
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,W,H);

ctx.fillStyle='#c4956a';ctx.font='bold 13px sans-serif';ctx.textAlign='center';
ctx.fillText('보급 현황',W/2,22);

var barW=60,gap=30,startX=(W-SUPPLY_TYPES.length*(barW+gap)+gap)/2;
var maxH=150,baseY=H-30;

SUPPLY_TYPES.forEach(function(st,i){
var x=startX+i*(barW+gap);
var amt=supply[st.id]||0;
var h=amt/st.max*maxH;
ctx.fillStyle='rgba(40,40,60,.6)';ctx.fillRect(x,baseY-maxH,barW,maxH);
var grd=ctx.createLinearGradient(x,baseY-h,x,baseY);
grd.addColorStop(0,st.color);grd.addColorStop(1,st.color+'66');
ctx.fillStyle=grd;ctx.fillRect(x,baseY-h,barW,h);
ctx.strokeStyle=st.color;ctx.lineWidth=1;ctx.strokeRect(x,baseY-maxH,barW,maxH);
ctx.fillStyle='#e8dcc8';ctx.font='bold 12px sans-serif';ctx.textAlign='center';
ctx.fillText(amt+'',x+barW/2,baseY-h-8);
ctx.fillStyle='#8a7a6a';ctx.font='10px sans-serif';
ctx.fillText(st.icon+st.name,x+barW/2,baseY+15);
});
}

// ═══════════════════════════════════════════════
// 4. 정찰망 구축기 (Scout Network)
// ═══════════════════════════════════════════════
var SCOUT_W=12,SCOUT_H=10;
var SCOUT_TERRAIN=[
{id:0,name:'미탐사',icon:'❓',color:'#1a1a2e'},
{id:1,name:'평원',icon:'🌿',color:'#4a6a3a'},
{id:2,name:'산악',icon:'⛰️',color:'#6a5a4a'},
{id:3,name:'강',icon:'🌊',color:'#2a4a6a'},
{id:4,name:'마을',icon:'🏘️',color:'#6a6a3a'},
{id:5,name:'적진',icon:'🔴',color:'#6a2a2a'},
{id:6,name:'유적',icon:'🏛️',color:'#5a4a6a'},
{id:7,name:'첩보원',icon:'🔭',color:'#2a3a6a'}
];

function loadScout(){
try{var d=JSON.parse(localStorage.getItem('krpg_v18_scout'));if(d&&d.length===SCOUT_H)return d;}catch(e){}
var grid=[];for(var r=0;r<SCOUT_H;r++){var row=[];for(var c=0;c<SCOUT_W;c++){row.push(0);}grid.push(row);}
return grid;
}
function saveScout(g){localStorage.setItem('krpg_v18_scout',JSON.stringify(g));}

function renderScoutPanel(){
var existing=document.getElementById('v18-scout');if(existing)existing.remove();
var p=document.createElement('div');p.id='v18-scout';p.className='v18-panel';
var grid=loadScout();
p.innerHTML='<h2>&#128301; 정찰망 구축기</h2><p class="v18-sub">첩보원을 배치하여 적의 동태를 파악하십시오</p>';
document.body.appendChild(p);

var wrap=document.createElement('div');wrap.className='scout-wrap';
var canvas=document.createElement('canvas');canvas.width=480;canvas.height=400;
wrap.appendChild(canvas);
drawScoutMap(canvas,grid);

var explored=0,total=SCOUT_W*SCOUT_H;
grid.forEach(function(row){row.forEach(function(c){if(c>0)explored++;});});
var pct=Math.floor(explored/total*100);

var stats=document.createElement('div');stats.className='scout-stats';
stats.innerHTML='<span>탐사율: '+pct+'% ('+explored+'/'+total+')</span><span>첩보원: '+countScouts(grid)+'명 배치</span>';
wrap.appendChild(stats);

var btns=document.createElement('div');btns.className='scout-btns';
var deployBtn=document.createElement('button');deployBtn.className='sp-btn';deployBtn.textContent='🔭 첩보원 배치 (랜덤)';
deployBtn.onclick=function(){
var empty=[];
grid.forEach(function(row,r){row.forEach(function(c,ci){if(c===0)empty.push([r,ci]);});});
if(empty.length===0){v18Toast('모든 지역이 탐사되었습니다!','#4CAF50');return;}
var pos=empty[Math.floor(Math.random()*empty.length)];
grid[pos[0]][pos[1]]=7;
revealAround(grid,pos[0],pos[1]);
saveScout(grid);v18SFX('scout_deploy');v18Toast('첩보원 배치 완료!','#2196F3');
v18CheckAch('scout_first');
explored=0;grid.forEach(function(row){row.forEach(function(c){if(c>0)explored++;});});
if(explored>=total*0.5)v18CheckAch('scout_master');
renderScoutPanel();document.getElementById('v18-scout').classList.add('on');
};
btns.appendChild(deployBtn);

var massBtn=document.createElement('button');massBtn.className='sp-btn';massBtn.textContent='🗺️ 대규모 정찰';
massBtn.onclick=function(){
for(var i=0;i<5;i++){
var empty=[];grid.forEach(function(row,r){row.forEach(function(c,ci){if(c===0)empty.push([r,ci]);});});
if(empty.length===0)break;
var pos=empty[Math.floor(Math.random()*empty.length)];
var types=[1,1,1,2,2,3,4,5,6];
grid[pos[0]][pos[1]]=types[Math.floor(Math.random()*types.length)];
}
saveScout(grid);v18SFX('scout_discover');v18Toast('5개 지역 정찰 완료!','#5FA0FF');
explored=0;grid.forEach(function(row){row.forEach(function(c){if(c>0)explored++;});});
if(explored>=total*0.5)v18CheckAch('scout_master');
renderScoutPanel();document.getElementById('v18-scout').classList.add('on');
};
btns.appendChild(massBtn);
wrap.appendChild(btns);

var legend=document.createElement('div');legend.className='scout-legend';
SCOUT_TERRAIN.forEach(function(t){
if(t.id===0)return;
var s=document.createElement('span');s.textContent=t.icon+' '+t.name;legend.appendChild(s);
});
wrap.appendChild(legend);

canvas.onclick=function(e){
var rect=canvas.getBoundingClientRect();
var mx=(e.clientX-rect.left)*(canvas.width/rect.width);
var my=(e.clientY-rect.top)*(canvas.height/rect.height);
var cellW=canvas.width/SCOUT_W,cellH=(canvas.height-40)/SCOUT_H;
var col=Math.floor(mx/cellW),row=Math.floor((my-30)/cellH);
if(row>=0&&row<SCOUT_H&&col>=0&&col<SCOUT_W&&grid[row][col]===0){
var types=[1,1,1,2,2,3,4,5,6];
grid[row][col]=types[Math.floor(Math.random()*types.length)];
saveScout(grid);v18SFX('scout_discover');
drawScoutMap(canvas,grid);
explored=0;grid.forEach(function(r2){r2.forEach(function(c2){if(c2>0)explored++;});});
if(explored>=total*0.5)v18CheckAch('scout_master');
}
};

p.appendChild(wrap);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-scout\').classList.remove(\'on\')">닫기</button>';
v18SFX('scout_deploy');
}

function countScouts(grid){var c=0;grid.forEach(function(row){row.forEach(function(v){if(v===7)c++;});});return c;}

function revealAround(grid,r,c){
for(var dr=-1;dr<=1;dr++){for(var dc=-1;dc<=1;dc++){
var nr=r+dr,nc=c+dc;
if(nr>=0&&nr<SCOUT_H&&nc>=0&&nc<SCOUT_W&&grid[nr][nc]===0){
var types=[1,1,1,2,2,3,4,5,6];
grid[nr][nc]=types[Math.floor(Math.random()*types.length)];
}
}}
}

function drawScoutMap(canvas,grid){
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);
var cellW=W/SCOUT_W,cellH=(H-40)/SCOUT_H;

ctx.fillStyle='#c4956a';ctx.font='bold 13px sans-serif';ctx.textAlign='center';
ctx.fillText('정찰 지도',W/2,18);

for(var r=0;r<SCOUT_H;r++){
for(var c=0;c<SCOUT_W;c++){
var x=c*cellW,y=30+r*cellH;
var t=SCOUT_TERRAIN[grid[r][c]]||SCOUT_TERRAIN[0];
ctx.fillStyle=t.color;ctx.fillRect(x+1,y+1,cellW-2,cellH-2);
ctx.strokeStyle='#2a2a3a';ctx.lineWidth=0.5;ctx.strokeRect(x+1,y+1,cellW-2,cellH-2);
if(grid[r][c]>0){
ctx.font='14px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(t.icon,x+cellW/2,y+cellH/2);
}else{
ctx.fillStyle='rgba(255,255,255,.06)';ctx.fillRect(x+1,y+1,cellW-2,cellH-2);
}
}
}
}

// ═══════════════════════════════════════════════
// 5. 전설무기 제련소 (Legendary Forge)
// ═══════════════════════════════════════════════
var LEGENDARY_WEAPONS=[
{id:'sword_king',name:'단군검',icon:'🗡️',rarity:'SSR',color:'#FFD700',desc:'단군왕검의 성검. 공격력 +50, 사기 +20',mats:{iron:30,gold:10,spirit:5},atk:50,bonus:'사기 +20'},
{id:'bow_wind',name:'환웅의 바람활',icon:'🏹',rarity:'SSR',color:'#FFD700',desc:'바람의 신이 깃든 활. 명중률 +30%, 사거리 +2',mats:{iron:20,feather:15,spirit:5},atk:35,bonus:'명중 +30%'},
{id:'spear_thunder',name:'뇌신창',icon:'🔱',rarity:'SR',color:'#aa88ff',desc:'번개의 힘을 담은 창. 공격력 +40, 범위공격',mats:{iron:25,crystal:8,spirit:3},atk:40,bonus:'범위공격'},
{id:'shield_earth',name:'지모신방패',icon:'🛡️',rarity:'SR',color:'#aa88ff',desc:'대지의 여신이 가호하는 방패. 방어력 +40, 반격',mats:{iron:30,stone:20,spirit:3},atk:0,bonus:'방어 +40'},
{id:'helm_bear',name:'곰녀의 왕관',icon:'👑',rarity:'SR',color:'#aa88ff',desc:'곰 토템의 힘이 깃든 왕관. 체력 +100, 재생',mats:{gold:15,bone:10,spirit:3},atk:0,bonus:'HP +100'},
{id:'ring_tiger',name:'호랑이 어금니',icon:'💍',rarity:'R',color:'#5FA0FF',desc:'호랑이의 힘이 깃든 반지. 속도 +20, 크리티컬 +15%',mats:{bone:10,fang:5,gold:5},atk:15,bonus:'속도 +20'},
{id:'pendant_sun',name:'태양의 부적',icon:'☀️',rarity:'R',color:'#5FA0FF',desc:'태양신의 가호. 모든 능력치 +10',mats:{gold:10,crystal:5,spirit:2},atk:10,bonus:'전능력 +10'},
{id:'drum_war',name:'전쟁의 북',icon:'🥁',rarity:'R',color:'#5FA0FF',desc:'전투 시작 시 아군 사기 +30',mats:{wood:15,leather:10,iron:5},atk:0,bonus:'사기 +30'},
{id:'flag_victory',name:'승리의 깃발',icon:'🚩',rarity:'R',color:'#5FA0FF',desc:'지휘관의 깃발. 아군 공격력 +15%',mats:{silk:10,gold:5,iron:5},atk:0,bonus:'공격 +15%'},
{id:'mirror_bronze',name:'청동경',icon:'🪞',rarity:'N',color:'#8a7a6a',desc:'신비로운 힘이 깃든 거울. 마법방어 +20',mats:{iron:10,gold:3},atk:0,bonus:'마방 +20'},
{id:'bell_temple',name:'제천종',icon:'🔔',rarity:'N',color:'#8a7a6a',desc:'제사에 쓰이는 종. 회복력 +25',mats:{iron:15,gold:2},atk:0,bonus:'회복 +25'},
{id:'jade_seal',name:'옥새',icon:'🟢',rarity:'N',color:'#8a7a6a',desc:'왕의 인장. 경험치 획득 +20%',mats:{jade:5,gold:5},atk:0,bonus:'EXP +20%'}
];

var forgeMaterials={iron:20,gold:5,spirit:0,feather:3,crystal:2,stone:5,bone:3,fang:1,wood:10,leather:5,silk:3,jade:2};

function loadForge(){try{return JSON.parse(localStorage.getItem('krpg_v18_forge'))||{crafted:[],mats:Object.assign({},forgeMaterials)};}catch(e){return{crafted:[],mats:Object.assign({},forgeMaterials)};}}
function saveForge(f){localStorage.setItem('krpg_v18_forge',JSON.stringify(f));}

function renderForgePanel(){
var existing=document.getElementById('v18-forge');if(existing)existing.remove();
var p=document.createElement('div');p.id='v18-forge';p.className='v18-panel';
var forge=loadForge();
p.innerHTML='<h2>&#128296; 전설무기 제련소</h2><p class="v18-sub">고대의 재료를 모아 전설무기를 제련하십시오</p>';
document.body.appendChild(p);

var wrap=document.createElement('div');wrap.className='forge-wrap';

var matsPool=document.createElement('div');matsPool.className='forge-mats-pool';
matsPool.innerHTML='<b style="color:#FFD700;font-size:11px">보유 재료:</b><br>';
var matNames={iron:'철',gold:'금',spirit:'영혼석',feather:'깃털',crystal:'수정',stone:'돌',bone:'뼈',fang:'어금니',wood:'목재',leather:'가죽',silk:'비단',jade:'옥'};
Object.keys(forge.mats).forEach(function(k){
matsPool.innerHTML+='<span>'+matNames[k]+': '+forge.mats[k]+'</span> ';
});
wrap.appendChild(matsPool);

var items=document.createElement('div');items.className='forge-items';
LEGENDARY_WEAPONS.forEach(function(w){
var card=document.createElement('div');card.className='forge-card'+(forge.crafted.indexOf(w.id)>=0?' crafted':'');
var canCraft=true;
if(forge.crafted.indexOf(w.id)>=0)canCraft=false;
else{Object.keys(w.mats).forEach(function(m){if(!forge.mats[m]||forge.mats[m]<w.mats[m])canCraft=false;});}
var matsStr=[];Object.keys(w.mats).forEach(function(m){matsStr.push(matNames[m]+' '+w.mats[m]);});
card.innerHTML='<span class="fc-icon">'+w.icon+'</span><div class="fc-name">'+w.name+'</div><div class="fc-rarity" style="color:'+w.color+'">'+w.rarity+'</div><div class="fc-desc">'+w.desc+'</div><div class="fc-mats">재료: '+matsStr.join(', ')+'</div>'+(forge.crafted.indexOf(w.id)>=0?'<div style="color:#4CAF50;font-size:10px;margin-top:6px;font-weight:700">✅ 제련 완료</div>':'<button class="fc-craft"'+(canCraft?'':' disabled')+' data-id="'+w.id+'">⚒️ 제련</button>');
items.appendChild(card);
});
wrap.appendChild(items);

wrap.addEventListener('click',function(e){
var btn=e.target.closest('.fc-craft');if(!btn||btn.disabled)return;
var id=btn.dataset.id;var forge=loadForge();
var weapon=null;LEGENDARY_WEAPONS.forEach(function(w){if(w.id===id)weapon=w;});if(!weapon)return;
Object.keys(weapon.mats).forEach(function(m){forge.mats[m]-=weapon.mats[m];});
forge.crafted.push(id);saveForge(forge);
v18SFX('forge_craft');v18Toast(weapon.icon+' '+weapon.name+' 제련 완료!','#FFD700');
v18CheckAch('forge_first');
if(forge.crafted.length>=3)v18CheckAch('forge_3');
renderForgePanel();document.getElementById('v18-forge').classList.add('on');
});

var collectBtn=document.createElement('button');collectBtn.className='sp-btn';collectBtn.style.cssText='display:block;margin:12px auto;padding:8px 20px';
collectBtn.textContent='⛏️ 재료 채집 (랜덤 +3~8)';
collectBtn.onclick=function(){
var forge=loadForge();var keys=Object.keys(forge.mats);
for(var i=0;i<3;i++){
var k=keys[Math.floor(Math.random()*keys.length)];
forge.mats[k]+=Math.floor(Math.random()*6)+3;
}
saveForge(forge);v18SFX('forge_upgrade');v18Toast('재료 채집 완료!','#FF9800');
renderForgePanel();document.getElementById('v18-forge').classList.add('on');
};
wrap.appendChild(collectBtn);

p.appendChild(wrap);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-forge\').classList.remove(\'on\')">닫기</button>';
v18SFX('forge_craft');
}

// ═══════════════════════════════════════════════
// 6. 역사 명장면 극장 (History Theater)
// ═══════════════════════════════════════════════
var THEATER_SCENES=[
{id:'creation',name:'천지창조 — 환인의 뜻',era:'신화시대',icon:'🌅',
 scene:'☁️🌤️⛰️🏔️🌄',
 narration:'태초에 환인(桓因)이 삼위태백을 내려다보니, 인간 세상을 널리 이롭게 할 만하였다. 아들 환웅에게 천부인 세 개를 주어 내려보내니...',
 fact:'삼국유사에 기록된 건국 신화. 홍익인간의 이념이 담겨 있다.'},
{id:'bear_woman',name:'곰의 시련 — 21일',era:'신화시대',icon:'🐻',
 scene:'🐻🧄🌿🕯️🌑',
 narration:'환웅이 이르기를, &ldquo;100일 동안 햇빛을 보지 않고 쑥과 마늘만 먹으면 사람이 되리라.&rdquo; 곰은 삼칠일(21일)을 견뎌 여인이 되었으나, 호랑이는 견디지 못하고 뛰쳐나갔다.',
 fact:'인내와 변화의 상징. 토테미즘에서 농경사회로의 전환을 의미한다.'},
{id:'dangun',name:'단군 건국',era:'BC 2333',icon:'👑',
 scene:'👑🏛️⛰️🌄🎺',
 narration:'환웅과 웅녀 사이에서 태어난 단군왕검이 아사달에 도읍을 정하고 나라 이름을 조선이라 하니, 이것이 우리 겨레의 첫 나라 고조선이다.',
 fact:'기원전 2333년. 대한민국 건국 기원(개천절 10월 3일)의 역사적 근거.'},
{id:'bronze',name:'청동의 노래',era:'BC 1000~',icon:'⚔️',
 scene:'🔥⚒️🗡️🛡️✨',
 narration:'대장장이가 주석과 구리를 녹여 비파형동검을 만드니, 그 칼날이 번개처럼 빛났다. 이 검을 든 자가 곧 고조선의 지배자였다.',
 fact:'비파형동검은 중국 동검과 다른 고조선 고유 양식. 요동~한반도에 분포.'},
{id:'wiman',name:'위만의 쿠데타',era:'BC 194',icon:'🗡️',
 scene:'🌧️🏃‍♂️⚔️🏰🔥',
 narration:'연나라에서 망명한 위만이 상투를 틀고 조선의 복장을 입어 준왕의 신임을 얻었다. 그러나 세력을 키운 위만은 왕검성을 급습하여 준왕을 내쫓고 스스로 왕이 되었다.',
 fact:'위만은 철기를 활용해 고조선을 더욱 강성하게 만들었으나, 한과의 갈등을 초래.'},
{id:'fall',name:'왕검성의 최후',era:'BC 108',icon:'💀',
 scene:'🏰⚔️🔥💨💀',
 narration:'한무제의 대군이 육해로 밀려왔다. 1년간의 치열한 공방전 끝에 내부 배신이 이어지고, 마침내 우거왕이 살해당하니 고조선 2000년 역사가 막을 내렸다.',
 fact:'내부 분열이 멸망의 직접 원인. 한사군이 설치되나 곧 현지 저항에 직면.'},
{id:'buyeo',name:'부여의 영고',era:'BC 86~',icon:'🎪',
 scene:'🦌🎵🔥🙏🌙',
 narration:'12월이 되면 부여의 백성들이 모여 하늘에 제사를 지내고, 밤새 노래하고 춤추며 술을 마셨다. 죄인을 풀어주고 한 해의 풍년을 빌었으니, 이를 영고(迎鼓)라 하였다.',
 fact:'부여의 대표적 제천행사. 순장 풍습도 있었으며, 사출도라는 4부족 연합 구조.'},
{id:'jumong',name:'주몽의 남하',era:'BC 37',icon:'🏹',
 scene:'🐎🏹🌊⛰️🏰',
 narration:'부여를 탈출한 주몽이 남쪽으로 달려 엄리대수에 이르렀다. 강을 건너지 못해 탄식하니, 물고기와 자라가 다리를 놓아주었다. 졸본에 이르러 고구려를 세우니...',
 fact:'주몽 건국 신화. 부여와의 연결성과 함께 새로운 국가 탄생을 상징.'},
{id:'ondal',name:'온조와 비류',era:'BC 18',icon:'🏯',
 scene:'👥🏃‍♂️🌊🏗️🏯',
 narration:'주몽의 두 아들 비류와 온조가 남쪽으로 내려왔다. 비류는 미추홀에, 온조는 위례성에 자리 잡았다. 비류의 땅은 습하고 짠 물이 많아 백성이 떠나니, 온조의 백제만이 번성하였다.',
 fact:'백제 건국 신화. 고구려와의 혈연관계를 강조하며, 한강 유역 정착을 설명.'},
{id:'gaya',name:'알에서 태어난 왕',era:'BC 42',icon:'🥚',
 scene:'🥚✨👑🌊⛵',
 narration:'구지봉에서 하늘의 소리가 들리니, &ldquo;거북아 거북아 머리를 내어라. 내지 않으면 구워 먹으리라.&rdquo; 하늘에서 붉은 보자기에 싸인 금합이 내려오고, 그 안의 금란에서 수로왕이 태어났다.',
 fact:'구지가는 한국 최초의 서사시. 가야의 건국 신화이자 해상왕국의 시작.'},
{id:'iron',name:'철의 시대',era:'BC 300~',icon:'⚒️',
 scene:'🔥⚒️🌾🗡️📈',
 narration:'철기가 전래되니 농기구가 달라졌다. 나무 쟁기 대신 철 쟁기로 깊이 갈 수 있었고, 수확이 크게 늘었다. 잉여 생산물은 계급 분화를 낳고, 강한 나라가 약한 나라를 삼켰다.',
 fact:'철기 도입은 생산력 혁명을 일으켜 국가 형성을 촉진. 변한은 철 수출국.'},
{id:'dolmen',name:'거석의 비밀',era:'BC 1000~',icon:'🪨',
 scene:'🪨🔨💪🙏🌅',
 narration:'수백 명이 힘을 합쳐 거대한 돌을 옮기고, 그 위에 평평한 바위를 올렸다. 이것은 족장의 무덤이자 하늘과 땅을 잇는 제단이었다. 고인돌은 힘과 신앙의 상징이었다.',
 fact:'한반도에 세계 고인돌의 40% 이상이 분포. 강화 고인돌은 세계문화유산.'}
];

var watchedScenes=[];
function loadTheater(){try{watchedScenes=JSON.parse(localStorage.getItem('krpg_v18_theater'))||[];}catch(e){watchedScenes=[];}}
function saveTheater(){localStorage.setItem('krpg_v18_theater',JSON.stringify(watchedScenes));}

function renderTheaterPanel(){
var existing=document.getElementById('v18-theater');if(existing)existing.remove();
var p=document.createElement('div');p.id='v18-theater';p.className='v18-panel';
loadTheater();
p.innerHTML='<h2>&#127917; 역사 명장면 극장</h2><p class="v18-sub">고대 역사의 12대 명장면을 관람하십시오 ('+watchedScenes.length+'/12 관람)</p>';
document.body.appendChild(p);

var wrap=document.createElement('div');wrap.className='theater-wrap';

var stage=document.createElement('div');stage.id='v18-theater-stage';stage.className='theater-stage';
wrap.appendChild(stage);

var scenes=document.createElement('div');scenes.className='theater-scenes';
THEATER_SCENES.forEach(function(sc){
var card=document.createElement('div');card.className='theater-card'+(watchedScenes.indexOf(sc.id)>=0?' watched':'');
card.innerHTML='<div class="tc-icon">'+sc.icon+'</div><div class="tc-name">'+sc.name+'</div><div class="tc-era">'+sc.era+'</div>';
card.onclick=function(){
if(watchedScenes.indexOf(sc.id)<0){watchedScenes.push(sc.id);saveTheater();}
var stg=document.getElementById('v18-theater-stage');
stg.className='theater-stage on';
stg.innerHTML='<div class="ts-title">'+sc.icon+' '+sc.name+'</div><div class="ts-scene">'+sc.scene+'</div><div class="ts-narration">'+sc.narration+'</div><div class="ts-fact">&#128218; '+sc.fact+'</div><button class="v18-close" style="margin-top:12px" onclick="document.getElementById(\'v18-theater-stage\').classList.remove(\'on\')">닫기</button>';
v18SFX('theater_scene');v18CheckAch('theater_first');
card.classList.add('watched');
};
scenes.appendChild(card);
});
wrap.appendChild(scenes);

p.appendChild(wrap);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-theater\').classList.remove(\'on\')">닫기</button>';
v18SFX('theater_open');
}

// ═══════════════════════════════════════════════
// 7. 전쟁 보고서 생성기 (War Report Generator)
// ═══════════════════════════════════════════════
function renderReportPanel(){
var existing=document.getElementById('v18-report');if(existing)existing.remove();
var p=document.createElement('div');p.id='v18-report';p.className='v18-panel';
var stats;try{stats=JSON.parse(localStorage.getItem('krpg_stats'))||{};}catch(e){stats={};}
var supply=loadSupply();var forge=loadForge();var ach=loadV18Ach();
var allAch=[];try{allAch=JSON.parse(localStorage.getItem('krpg_ach'))||[];}catch(e){}

p.innerHTML='<h2>&#128220; 전쟁 보고서</h2><p class="v18-sub">전체 전쟁 통계를 확인하고 PNG로 다운로드하십시오</p>';
document.body.appendChild(p);

var wrap=document.createElement('div');wrap.className='report-wrap';

var summary=document.createElement('div');summary.className='report-summary';
var metrics=[
{val:stats.wins||0,label:'전투 승리'},
{val:stats.quizOk||0,label:'퀴즈 정답'},
{val:allAch.length,label:'업적 달성'},
{val:forge.crafted.length,label:'무기 제련'},
{val:supply.grain+supply.weapons+supply.medicine+supply.horses,label:'총 보급량'},
{val:timelineViewed.length,label:'연표 탐험'}
];
metrics.forEach(function(m){
var s=document.createElement('div');s.className='report-stat';
s.innerHTML='<div class="rs-val">'+m.val+'</div><div class="rs-label">'+m.label+'</div>';
summary.appendChild(s);
});
wrap.appendChild(summary);

var canvas=document.createElement('canvas');canvas.width=600;canvas.height=380;
wrap.appendChild(canvas);
drawWarReport(canvas,stats,supply,forge,allAch);

var dlBtn=document.createElement('button');dlBtn.className='report-dl';dlBtn.textContent='📥 PNG 다운로드';
dlBtn.onclick=function(){
var link=document.createElement('a');link.download='war_report_'+new Date().toISOString().slice(0,10)+'.png';
link.href=canvas.toDataURL('image/png');link.click();
v18Toast('보고서 다운로드 완료!','#4CAF50');
};
wrap.appendChild(dlBtn);

var copyBtn=document.createElement('button');copyBtn.className='report-dl';copyBtn.style.marginLeft='8px';copyBtn.textContent='📋 클립보드 복사';
copyBtn.onclick=function(){
canvas.toBlob(function(blob){
if(navigator.clipboard&&navigator.clipboard.write){
navigator.clipboard.write([new ClipboardItem({'image/png':blob})]).then(function(){v18Toast('클립보드에 복사됨!','#2196F3');});
}else{v18Toast('이 브라우저에서는 지원되지 않습니다','#F44336');}
});
};
wrap.appendChild(copyBtn);

p.appendChild(wrap);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-report\').classList.remove(\'on\')">닫기</button>';
}

function drawWarReport(canvas,stats,supply,forge,allAch){
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
var grd=ctx.createLinearGradient(0,0,W,H);
grd.addColorStop(0,'#0a0814');grd.addColorStop(1,'#1a1428');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);

ctx.strokeStyle='#3a3a4a';ctx.lineWidth=2;ctx.strokeRect(10,10,W-20,H-20);
ctx.strokeStyle='#5a4a3a';ctx.lineWidth=1;ctx.strokeRect(15,15,W-30,H-30);

ctx.fillStyle='#FFD700';ctx.font='bold 20px sans-serif';ctx.textAlign='center';
ctx.fillText('⚔️ 한국사 영웅전 — 전쟁 보고서 ⚔️',W/2,50);

var date=new Date();
ctx.fillStyle='#8a7a6a';ctx.font='11px sans-serif';
ctx.fillText(date.getFullYear()+'년 '+(date.getMonth()+1)+'월 '+date.getDate()+'일 작성',W/2,70);

ctx.strokeStyle='#5a4a3a';ctx.lineWidth=1;
ctx.beginPath();ctx.moveTo(40,80);ctx.lineTo(W-40,80);ctx.stroke();

var metrics=[
{label:'전투 승리',val:stats.wins||0,color:'#F44336',max:50},
{label:'퀴즈 정답',val:stats.quizOk||0,color:'#4CAF50',max:165},
{label:'업적 달성',val:allAch.length,color:'#FFD700',max:108},
{label:'무기 제련',val:forge.crafted.length,color:'#FF9800',max:12},
{label:'총 보급량',val:supply.grain+supply.weapons+supply.medicine+supply.horses,color:'#2196F3',max:530},
{label:'연표 탐험',val:timelineViewed.length,color:'#9C27B0',max:20}
];

var barW=65,barGap=20,startX=50,maxH=160,baseY=290;

metrics.forEach(function(m,i){
var x=startX+i*(barW+barGap);
var h=Math.min(1,m.val/m.max)*maxH;
ctx.fillStyle='rgba(40,40,60,.5)';ctx.fillRect(x,baseY-maxH,barW,maxH);
var g2=ctx.createLinearGradient(x,baseY-h,x,baseY);
g2.addColorStop(0,m.color);g2.addColorStop(1,m.color+'44');
ctx.fillStyle=g2;ctx.fillRect(x,baseY-h,barW,h);
ctx.strokeStyle=m.color+'88';ctx.lineWidth=1;ctx.strokeRect(x,baseY-maxH,barW,maxH);

ctx.fillStyle='#fff';ctx.font='bold 13px sans-serif';ctx.textAlign='center';
ctx.fillText(m.val+'',x+barW/2,baseY-h-10);
ctx.fillStyle='#c4956a';ctx.font='9px sans-serif';
ctx.fillText(m.label,x+barW/2,baseY+14);
});

var totalScore=Math.floor((stats.wins||0)*5+(stats.quizOk||0)*2+allAch.length*3+forge.crafted.length*10+(supply.grain+supply.weapons+supply.medicine+supply.horses)/5+timelineViewed.length*5);
var grade=totalScore>=500?'S':totalScore>=350?'A':totalScore>=200?'B':totalScore>=100?'C':'D';
ctx.fillStyle='#FFD700';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('종합 점수: '+totalScore+'점 ('+grade+'등급)',W/2,340);

ctx.fillStyle='#5a5a6a';ctx.font='9px sans-serif';
ctx.fillText('한국사 영웅전 v18.0 | PRIME Holdings',W/2,365);
}

// ═══════════════════════════════════════════════
// 8. 병영 훈련소 (Training Grounds)
// ═══════════════════════════════════════════════
var TRAINING_DRILLS=[
{id:'sword',name:'검술 훈련',icon:'⚔️',desc:'검을 휘둘러 허수아비를 베어라. 타이밍이 핵심!',color:'#F44336',
 stat:'공격력 +5',xpGain:20},
{id:'archery',name:'궁술 훈련',icon:'🏹',desc:'움직이는 과녁의 중심을 맞혀라. 집중력이 필요!',color:'#4CAF50',
 stat:'명중률 +5%',xpGain:25},
{id:'riding',name:'기마술 훈련',icon:'🐎',desc:'말 위에서 장애물을 피해라. 반사 신경을 키워라!',color:'#FF9800',
 stat:'속도 +3',xpGain:15}
];

var trainingLevels={sword:0,archery:0,riding:0};
function loadTraining(){try{trainingLevels=JSON.parse(localStorage.getItem('krpg_v18_training'))||{sword:0,archery:0,riding:0};}catch(e){trainingLevels={sword:0,archery:0,riding:0};}}
function saveTraining(){localStorage.setItem('krpg_v18_training',JSON.stringify(trainingLevels));}

function renderTrainingPanel(){
var existing=document.getElementById('v18-training');if(existing)existing.remove();
var p=document.createElement('div');p.id='v18-training';p.className='v18-panel';
loadTraining();
p.innerHTML='<h2>&#127947;&#65039; 병영 훈련소</h2><p class="v18-sub">3종 훈련으로 병사들의 능력을 강화하십시오</p>';
document.body.appendChild(p);

var wrap=document.createElement('div');wrap.className='training-wrap';

var drills=document.createElement('div');drills.className='training-drills';
TRAINING_DRILLS.forEach(function(d){
var card=document.createElement('div');card.className='training-card';
card.innerHTML='<div class="td-icon">'+d.icon+'</div><div class="td-name">'+d.name+'</div><div class="td-desc">'+d.desc+'</div><div class="td-level" style="color:'+d.color+'">Lv.'+trainingLevels[d.id]+' | '+d.stat+'</div>';
card.onclick=function(){startTraining(d,wrap);};
drills.appendChild(card);
});
wrap.appendChild(drills);

var arena=document.createElement('div');arena.id='v18-training-arena';arena.className='training-arena';
wrap.appendChild(arena);

p.appendChild(wrap);
p.innerHTML+='<button class="v18-close" onclick="document.getElementById(\'v18-training\').classList.remove(\'on\')">닫기</button>';
}

function startTraining(drill,wrap){
var arena=document.getElementById('v18-training-arena');
arena.className='training-arena on';
arena.innerHTML='';

var canvas=document.createElement('canvas');canvas.width=400;canvas.height=300;
arena.appendChild(canvas);

var ctx=canvas.getContext('2d');
var score=0,timeLeft=10,targets=[],running=true;
var interval=null;

function spawnTarget(){
targets.push({
x:Math.random()*(canvas.width-40)+20,
y:Math.random()*(canvas.height-60)+30,
r:15+Math.random()*10,
life:2
});
}

function draw(){
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle='#c4956a';ctx.font='bold 12px sans-serif';ctx.textAlign='left';
ctx.fillText(drill.icon+' '+drill.name+' | 점수: '+score,10,20);
ctx.textAlign='right';ctx.fillText('남은 시간: '+timeLeft.toFixed(1)+'초',canvas.width-10,20);

var barW=canvas.width-20;
ctx.fillStyle='#1a1a2e';ctx.fillRect(10,canvas.height-15,barW,8);
ctx.fillStyle=drill.color;ctx.fillRect(10,canvas.height-15,barW*(timeLeft/10),8);

targets.forEach(function(t){
ctx.beginPath();ctx.arc(t.x,t.y,t.r,0,Math.PI*2);
ctx.fillStyle=t.life>1?'rgba(255,100,50,.8)':'rgba(255,50,50,.9)';
ctx.fill();ctx.strokeStyle='#FFD700';ctx.lineWidth=2;ctx.stroke();

ctx.beginPath();ctx.arc(t.x,t.y,t.r*0.5,0,Math.PI*2);
ctx.fillStyle='rgba(255,215,0,.6)';ctx.fill();

ctx.beginPath();ctx.arc(t.x,t.y,t.r*0.2,0,Math.PI*2);
ctx.fillStyle='#fff';ctx.fill();
});
}

canvas.onclick=function(e){
if(!running)return;
var rect=canvas.getBoundingClientRect();
var mx=(e.clientX-rect.left)*(canvas.width/rect.width);
var my=(e.clientY-rect.top)*(canvas.height/rect.height);
for(var i=targets.length-1;i>=0;i--){
var t=targets[i];
var dist=Math.sqrt((mx-t.x)*(mx-t.x)+(my-t.y)*(my-t.y));
if(dist<=t.r){
score+=Math.floor((1-dist/t.r)*30)+10;
targets.splice(i,1);
v18SFX('forge_upgrade');
break;
}
}
};

for(var i=0;i<3;i++)spawnTarget();

var last=performance.now();
function loop(){
if(!running)return;
var now=performance.now();var dt=(now-last)/1000;last=now;
timeLeft-=dt;
if(timeLeft<=0){
running=false;
endTraining(drill,score,arena);
return;
}
targets.forEach(function(t){t.life-=dt;});
targets=targets.filter(function(t){return t.life>0;});
if(Math.random()<0.15)spawnTarget();
draw();
requestAnimationFrame(loop);
}
loop();
}

function endTraining(drill,score,arena){
loadTraining();
var grade=score>=200?'S':score>=150?'A':score>=100?'B':score>=50?'C':'D';
trainingLevels[drill.id]++;
saveTraining();

arena.innerHTML='<div class="training-result">'+drill.icon+' '+drill.name+' 완료!<br>점수: '+score+' ('+grade+'등급)<br>'+drill.stat+' 획득! (Lv.'+trainingLevels[drill.id]+')</div>';
v18Toast(drill.icon+' 훈련 완료! '+grade+'등급','#FFD700');
v18CheckAch('training_first');
}

// ─── Keyboard Shortcuts (8: Shift+F/G/H/I/K/N/O/R) ───
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
var map={
'KeyF':['v18-council',renderCouncilPanel],
'KeyG':['v18-timeline',renderTimelinePanel],
'KeyH':['v18-supply',renderSupplyPanel],
'KeyI':['v18-scout',renderScoutPanel],
'KeyK':['v18-forge',renderForgePanel],
'KeyN':['v18-theater',renderTheaterPanel],
'KeyO':['v18-report',renderReportPanel],
'KeyR':['v18-training',renderTrainingPanel]
};
if(map[e.code]){
e.preventDefault();var id=map[e.code][0],fn=map[e.code][1];
var el=document.getElementById(id);
if(el&&el.classList.contains('on')){el.classList.remove('on');}
else{fn();document.getElementById(id).classList.add('on');}
}
});

// ─── Quick Action Buttons (Bottom scroll nav bar extension) ───
function addV18NavBar(){
var existing=document.getElementById('v18-nav-bar');
if(existing)existing.remove();

var v17bar=document.getElementById('v17-nav-bar');
var container=v17bar||document.body;

var actions=[
{label:'🏛️',title:'자문회의',fn:function(){renderCouncilPanel();document.getElementById('v18-council').classList.add('on')}},
{label:'⏳',title:'연표',fn:function(){renderTimelinePanel();document.getElementById('v18-timeline').classList.add('on')}},
{label:'🌾',title:'보급',fn:function(){renderSupplyPanel();document.getElementById('v18-supply').classList.add('on')}},
{label:'🔭',title:'정찰',fn:function(){renderScoutPanel();document.getElementById('v18-scout').classList.add('on')}},
{label:'⚒️',title:'제련소',fn:function(){renderForgePanel();document.getElementById('v18-forge').classList.add('on')}},
{label:'🎭',title:'극장',fn:function(){renderTheaterPanel();document.getElementById('v18-theater').classList.add('on')}},
{label:'📊',title:'보고서',fn:function(){renderReportPanel();document.getElementById('v18-report').classList.add('on')}},
{label:'🏋️',title:'훈련소',fn:function(){renderTrainingPanel();document.getElementById('v18-training').classList.add('on')}}
];

if(v17bar){
actions.forEach(function(a){
var btn=document.createElement('button');
btn.style.cssText='flex:0 0 auto;width:48px;height:40px;border:none;border-radius:6px;background:transparent;color:#e8dcc8;font-size:16px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;padding:2px 4px;transition:background .2s';
btn.innerHTML='<span style="font-size:16px">'+a.label+'</span><span style="font-size:7px;color:#8a7a6a">'+a.title+'</span>';
btn.onclick=a.fn;
btn.onmouseenter=function(){btn.style.background='rgba(196,149,106,.15)'};
btn.onmouseleave=function(){btn.style.background='transparent'};
v17bar.appendChild(btn);
});
}else{
var bar=document.createElement('div');
bar.id='v18-nav-bar';
bar.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:126;display:flex;gap:0;overflow-x:auto;background:rgba(10,6,8,.95);border-top:1px solid #3a3a4a;padding:4px 8px;-webkit-overflow-scrolling:touch;scrollbar-width:none';
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
}

// ─── Init ───
function v18Init(){
loadTimeline();loadTraining();registerV18Quiz();
setTimeout(addV18NavBar,2500);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',v18Init);}
else{v18Init();}

window._v18={
COUNCIL_MEMBERS:COUNCIL_MEMBERS,TIMELINE_EVENTS:TIMELINE_EVENTS,
SUPPLY_TYPES:SUPPLY_TYPES,SCOUT_TERRAIN:SCOUT_TERRAIN,
LEGENDARY_WEAPONS:LEGENDARY_WEAPONS,THEATER_SCENES:THEATER_SCENES,
TRAINING_DRILLS:TRAINING_DRILLS,V18_QUIZ:V18_QUIZ,V18_ACH:V18_ACH,
v18SFX:v18SFX
};
})();
