// v31_patch.js — 한국사 영웅전 v31.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v31-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:150;overflow-y:auto;padding:16px}',
'.v31-panel.on{display:block}',
'.v31-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v31-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v31-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v31-close:hover{background:#8B2A1A}',
'.v31-toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);padding:8px 20px;border-radius:20px;font-size:11px;font-weight:700;z-index:999;pointer-events:none;animation:v31fade 2s ease forwards}',
'@keyframes v31fade{0%{opacity:0;transform:translate(-50%,-10px)}10%{opacity:1;transform:translate(-50%,0)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-10px)}}',

'.astro-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.astro-wrap canvas{border:2px solid #2a2a4a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.astro-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.astro-btn{padding:5px 12px;border:1px solid #2a2a4a;border-radius:6px;background:#0a0a1e;color:#7788cc;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.astro-btn:hover{border-color:#7788cc}',
'.astro-btn.active{border-color:#FFD700;color:#FFD700}',

'.weapon-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.weapon-wrap canvas{border:2px solid #4a2a1a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.weapon-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.weapon-btn{padding:5px 12px;border:1px solid #4a2a1a;border-radius:6px;background:#140a08;color:#cc7744;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.weapon-btn:hover{border-color:#cc7744}',
'.weapon-btn.active{border-color:#FFD700;color:#FFD700}',

'.envoy-wrap{max-width:640px;margin:0 auto;text-align:center}',
'.envoy-wrap canvas{border:2px solid #2a3a2a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.envoy-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.envoy-btn{padding:5px 12px;border:1px solid #2a3a2a;border-radius:6px;background:#081008;color:#66aa88;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.envoy-btn:hover{border-color:#66aa88}',
'.envoy-btn.active{border-color:#FFD700;color:#FFD700}',

'.terrain-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.terrain-wrap canvas{border:2px solid #3a3a1a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.terrain-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.terrain-btn{padding:5px 12px;border:1px solid #3a3a1a;border-radius:6px;background:#121208;color:#aaaa44;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.terrain-btn:hover{border-color:#aaaa44}',
'.terrain-btn.active{border-color:#FFD700;color:#FFD700}',

'.myth-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.myth-wrap canvas{border:2px solid #3a1a3a;border-radius:10px;background:#0a040a;display:block;margin:0 auto 12px}',
'.myth-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.myth-btn{padding:5px 12px;border:1px solid #3a1a3a;border-radius:6px;background:#140a14;color:#aa66cc;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.myth-btn:hover{border-color:#aa66cc}',
'.myth-btn.active{border-color:#FFD700;color:#FFD700}',

'.timeline-wrap{max-width:640px;margin:0 auto;text-align:center}',
'.timeline-wrap canvas{border:2px solid #1a3a3a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',

'.skill-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.skill-wrap canvas{border:2px solid #2a3a1a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.skill-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.skill-btn{padding:5px 12px;border:1px solid #2a3a1a;border-radius:6px;background:#0a1008;color:#88cc44;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.skill-btn:hover{border-color:#88cc44}',
'.skill-btn.active{border-color:#FFD700;color:#FFD700}',

'.civindex-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.civindex-wrap canvas{border:2px solid #3a2a3a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.civindex-info{font-size:11px;color:#aa88cc;margin:8px 0;min-height:32px}'
].join('\n');
document.head.appendChild(css);

// --- AudioContext SFX ---
var actx=null;
function getACtx(){if(!actx)try{actx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return actx}
function sfx(freq,dur,type,vol){
  var c=getACtx();if(!c)return;
  var o=c.createOscillator(),g=c.createGain();
  o.type=type||'sine';o.frequency.value=freq;g.gain.value=vol||.12;
  o.connect(g);g.connect(c.destination);
  o.start();g.gain.exponentialRampToValueAtTime(.001,c.currentTime+dur);
  o.stop(c.currentTime+dur);
}
function sfxNav31(){sfx(540,.15,'triangle',.1);sfx(810,.1,'sine',.06)}
function sfxClick31(){sfx(680,.1,'square',.08)}
function sfxClose31(){sfx(340,.2,'triangle',.08)}
function sfxQuiz31(){sfx(900,.15,'sine',.1);sfx(1120,.12,'triangle',.06)}
function sfxQuizWrong31(){sfx(230,.25,'sawtooth',.08)}
function sfxComplete31(){sfx(680,.12,'sine',.1);sfx(900,.12,'triangle',.08);sfx(1120,.15,'sine',.06)}
function sfxAstro(){sfx(460,.15,'sine',.1);sfx(580,.12,'triangle',.06)}
function sfxWeapon(){sfx(350,.12,'sawtooth',.08);sfx(440,.1,'square',.06)}
function sfxEnvoy(){sfx(520,.12,'sine',.1);sfx(650,.1,'triangle',.06)}
function sfxTerrain(){sfx(400,.15,'square',.08);sfx(500,.12,'triangle',.06)}
function sfxMyth(){sfx(620,.12,'triangle',.1);sfx(780,.1,'sine',.06)}
function sfxTimeline(){sfx(480,.12,'sine',.1);sfx(600,.1,'triangle',.06)}
function sfxSkillTree(){sfx(560,.15,'sine',.1);sfx(840,.12,'triangle',.08)}
function sfxCivIndex(){sfx(700,.12,'triangle',.1);sfx(880,.1,'sine',.06)}
function sfxAchieve31(){sfx(460,.1,'sine',.12);sfx(680,.1,'triangle',.1);sfx(900,.15,'sine',.08)}

function toast(msg,color){
  var t=document.createElement('div');
  t.className='v31-toast';t.textContent=msg;
  t.style.background=color||'#c4956a';t.style.color='#fff';
  document.body.appendChild(t);
  setTimeout(function(){if(t.parentElement)t.parentElement.removeChild(t)},2200);
}

// ===== DATA =====

var ASTRO_MONTHS=[
  {name:'정월',terms:['입춘','우수'],farm:'농기구 정비, 종자 선별',stars:'북두칠성 관측'},
  {name:'2월',terms:['경칩','춘분'],farm:'보리 파종, 발밴 준비',stars:'오리온자리 하강'},
  {name:'3월',terms:['청명','곡우'],farm:'벼 파종, 밭 경작 시작',stars:'봉황성 관측'},
  {name:'4월',terms:['입하','소만'],farm:'모내기 이식, 보리 수확',stars:'전갈자리 남중'},
  {name:'5월',terms:['망종','하지'],farm:'모내기 완료, 볼보리 수확',stars:'하지 측정, 낮 가장 김'},
  {name:'6월',terms:['소서','대서'],farm:'김매기, 보리 타작',stars:'은하수 관측 최적기'},
  {name:'7월',terms:['입추','처서'],farm:'추수 준비, 건조 시작',stars:'견우직녀 관측'},
  {name:'8월',terms:['백로','추분'],farm:'벼 수확, 추수감사제',stars:'추분 측정, 밤낮 같음'},
  {name:'9월',terms:['한로','상강'],farm:'만추 수확, 가을 파종',stars:'천궁의 별 관측 좋음'},
  {name:'10월',terms:['입동','소설'],farm:'김장 담그기, 월동 준비',stars:'오리온자리 상승'},
  {name:'11월',terms:['대설','동지'],farm:'농한기, 농기구 수리',stars:'동지 측정, 밤 가장 김'},
  {name:'12월',terms:['소한','대한'],farm:'새해 준비, 제천의식',stars:'북극성 최고 고도'}
];

var WEAPON_DATA=[
  {name:'환웅의 천부인검',atk:95,dur:90,spd:70,rng:60,spc:98,rar:99,hero:'환웅',desc:'하늘에서 내린 신성한 검. 천부인 3종 중 하나'},
  {name:'단군의 신단수궁',atk:80,dur:85,spd:75,rng:95,spc:90,rar:95,hero:'단군',desc:'신단수 나무로 만든 신성한 활'},
  {name:'주몽의 비류창',atk:88,dur:75,spd:85,rng:70,spc:85,rar:90,hero:'주몽',desc:'비류수처럼 빠른 창술의 상징'},
  {name:'을지문덕의 지략도',atk:70,dur:95,spd:60,rng:50,spc:95,rar:88,hero:'을지문덕',desc:'살수대첩의 전략이 담긴 지휘도'},
  {name:'연개소문의 삼련도',atk:92,dur:80,spd:88,rng:55,spc:80,rar:85,hero:'연개소문',desc:'세 자루의 검을 동시에 휘두르는 무기'},
  {name:'김유신의 만파식적검',atk:90,dur:88,spd:82,rng:65,spc:92,rar:92,hero:'김유신',desc:'파도를 잠재우는 신비의 검'},
  {name:'광개토대왕의 정복대도',atk:98,dur:85,spd:75,rng:60,spc:75,rar:80,hero:'광개토대왕',desc:'영토 확장의 상징적 대검'},
  {name:'계백의 결사극',atk:85,dur:60,spd:90,rng:55,spc:88,rar:75,hero:'계백',desc:'황산벌 결사대의 불굴의 무기'},
  {name:'이사부의 해전목우',atk:75,dur:90,spd:65,rng:85,spc:90,rar:88,hero:'이사부',desc:'우산국 정복에 쓴 목우전술 무기'},
  {name:'근초고왕의 칠지도',atk:82,dur:92,spd:70,rng:75,spc:95,rar:98,hero:'근초고왕',desc:'일곱 왕에게 헌상한 전설적 7지검'}
];

var ENVOY_DATA=[
  {from:'고구려',to:'당',success:45,risk:80,reward:90,envoy:'연개소문',skills:[70,85,60,90,75,80],desc:'생존을 건 절박한 외교. 당의 침략 저지'},
  {from:'백제',to:'왼',success:72,risk:55,reward:75,envoy:'백제 사신',skills:[60,70,80,85,70,65],desc:'해상 교역과 군사 동맹 추진'},
  {from:'신라',to:'당',success:80,risk:60,reward:95,envoy:'김춘추',skills:[55,90,85,95,80,70],desc:'나당 동맹의 초석. 삼국통일 기반'},
  {from:'가야',to:'왼',success:65,risk:50,reward:70,envoy:'가야 사신',skills:[50,65,75,70,80,60],desc:'철 교역 중심의 실리적 외교'},
  {from:'고조선',to:'연',success:40,risk:85,reward:60,envoy:'고조선 사신',skills:[65,60,55,75,50,70],desc:'위만조선 이전 대연 외교'},
  {from:'부여',to:'한',success:55,risk:65,reward:55,envoy:'부여 사신',skills:[60,55,70,65,60,75],desc:'한군현과의 관계 유지 외교'},
  {from:'고구려',to:'돌굴',success:70,risk:70,reward:80,envoy:'고구려 사신',skills:[75,80,65,80,70,85],desc:'북방 유목민과의 군사 동맹'},
  {from:'백제',to:'남조',success:75,risk:45,reward:85,envoy:'백제 사신',skills:[55,75,90,80,85,60],desc:'문화 교류와 불교 전래의 창구'}
];

var TERRAIN_DATA=[
  {name:'평야',mods:[110,130,100,110,50,90]},
  {name:'산악',mods:[80,50,120,40,20,130]},
  {name:'강변',mods:[90,70,85,70,120,100]},
  {name:'숲',mods:[95,60,110,50,30,140]},
  {name:'늑지',mods:[60,30,70,20,80,110]},
  {name:'성벽',mods:[130,40,90,150,30,60]},
  {name:'고원',mods:[90,100,110,60,20,100]},
  {name:'해안',mods:[85,50,80,60,140,95]}
];
var TERRAIN_UNITS=['보병','기병','궁병','공성','수군','첩자'];

var MYTH_DATA=[
  {name:'단군신화',history:98,education:95,drama:85,culture:100,mystery:90,desc:'환웅과 웹녀의 아들 단군. 고조선 건국'},
  {name:'주몽신화',history:95,education:90,drama:95,culture:90,mystery:85,desc:'알에서 태어나 고구려를 세운 주몽'},
  {name:'혁거세신화',history:90,education:85,drama:80,culture:85,mystery:88,desc:'알에서 태어나 신라를 세운 박혁거세'},
  {name:'수로왕신화',history:85,education:80,drama:82,culture:80,mystery:85,desc:'하늘에서 내려온 금합의 가야 건국'},
  {name:'해모수신화',history:88,education:82,drama:90,culture:85,mystery:92,desc:'해모수와 유화 부인의 천상 연기'},
  {name:'곰녀전설',history:80,education:88,drama:75,culture:95,mystery:95,desc:'곰이 사람이 된 변환. 인내와 수양의 교훈'},
  {name:'천부인전설',history:85,education:90,drama:70,culture:90,mystery:98,desc:'하늘에서 내린 세 가지 신물. 통치의 상징'},
  {name:'삼족오전설',history:82,education:78,drama:80,culture:88,mystery:90,desc:'세 발 달린 까마귀. 태양숭배의 상징'},
  {name:'연오랑세오녀',history:78,education:75,drama:92,culture:82,mystery:80,desc:'해와 달이 된 부부. 신라 설화'},
  {name:'바리공주',history:75,education:85,drama:95,culture:78,mystery:88,desc:'버림받은 공주의 저승 여행. 무속신화'}
];

var TIMELINE_DATA={
  periods:['고조선초기','고조선전성','위만조선','삼한형성','고구려건국','백제건국','신라건국','가야연맹'],
  factions:[
    {name:'고조선',color:'#cc8844',values:[60,90,85,40,10,5,5,5]},
    {name:'고구려',color:'#cc4444',values:[0,5,10,20,65,75,85,90]},
    {name:'백제',color:'#4488cc',values:[0,0,5,15,30,70,75,72]},
    {name:'신라',color:'#44cc88',values:[0,0,5,15,20,35,60,68]},
    {name:'가야',color:'#cc44aa',values:[0,0,0,10,25,50,55,60]},
    {name:'부여',color:'#aaaa44',values:[10,20,30,45,55,45,35,25]}
  ]
};

var SKILL_DATA=[
  {name:'단군',branches:[60,95,90,85,98,80]},
  {name:'환웅',branches:[75,80,85,70,90,95]},
  {name:'주몽',branches:[95,75,80,55,50,85]},
  {name:'을지문덕',branches:[65,100,85,70,60,90]},
  {name:'연개소문',branches:[90,80,95,50,55,75]},
  {name:'김유신',branches:[85,88,90,85,70,78]},
  {name:'광개토대왕',branches:[92,78,95,75,80,70]},
  {name:'계백',branches:[88,55,80,40,35,90]},
  {name:'이사부',branches:[70,90,75,65,60,95]},
  {name:'근초고왕',branches:[80,82,85,90,88,72]}
];
var SKILL_BRANCHES=['무예','지략','통솔','외교','내정','특수'];

var CIV_KPIS=[
  {name:'군사력',value:78,color:'#cc4444'},
  {name:'경제력',value:65,color:'#44cc88'},
  {name:'문화수준',value:82,color:'#cc8844'},
  {name:'외교영향',value:58,color:'#4488cc'},
  {name:'기술발전',value:70,color:'#aaaa44'},
  {name:'교육보급',value:55,color:'#aa66cc'},
  {name:'복지수준',value:48,color:'#66aaaa'},
  {name:'인프라',value:62,color:'#cc6644'}
];

var QUIZ_V31=[
  {q:'고대 한반도 음력에서 24절기 중 낮이 가장 긴 날은?',a:['춘분','하지','추분','동지'],c:1},
  {q:'환웅의 천부인검의 가장 높은 능력치는?',a:['공격력','희소성','내구도','속도'],c:1},
  {q:'신라가 당과의 외교에서 성공률이 높았던 이유는?',a:['군사력 우위','문화적 상징성','나당 동맹 전략','무역 독점'],c:2},
  {q:'산악 지형에서 가장 높은 전투 보너스를 받는 병종은?',a:['기병','보병','첩자','궁병'],c:2},
  {q:'단군신화에서 곰이 사람이 되기 위해 먹은 것은?',a:['쌀과 보리','쏑과 마늘','버섯과 과일','약충과 산삼'],c:1},
  {q:'고조선의 국력이 가장 높았던 시기는?',a:['고조선초기','고조선전성기','위만조선','삼한형성기'],c:1},
  {q:'연개소문의 삼련도는 몇 자루의 검인가?',a:['1자루','2자루','3자루','5자루'],c:2},
  {q:'늑지 지형에서 가장 불리한 병종은?',a:['보병','공성병기','수군','첩자'],c:1},
  {q:'근초고왕의 칠지도는 어느 나라 왕에게 헌상한 것인가?',a:['당','원','한','일본'],c:3},
  {q:'24절기 중 &quot;경칩&quot;은 무슨 뜻인가?',a:['비가 오는 날','단오가 빌라지는 날','개구리가 깨어나는 날','바람이 봈 날'],c:2},
  {q:'삼족오는 무엇을 상징하는가?',a:['달','별','태양','물'],c:2},
  {q:'영웅 스킬트리에서 을지문덕의 가장 높은 스킬은?',a:['무예','지략','통솔','외교'],c:1},
  {q:'백제의 대남조 외교의 주요 목적은?',a:['군사 동맹','문화교류와 불교전래','철 교역','영토 확장'],c:1},
  {q:'성벽 지형에서 가장 높은 전투 보너스를 받는 병종은?',a:['보병','공성병기','기병','수군'],c:1},
  {q:'고대 문명발전 지수에서 가장 낮은 KPI는?',a:['군사력','복지수준','문화수준','경제력'],c:1}
];

var ACHIEVE_V31=[
  {id:'v31_astro_master',name:'천문역법 학자',desc:'천문역법 12개월 모두 열람'},
  {id:'v31_weapon_master',name:'전설무기 수집가',desc:'전설무기 10종 모두 확인'},
  {id:'v31_envoy_master',name:'외교 대사',desc:'외교 사신단 8개 임무 모두 분석'},
  {id:'v31_terrain_master',name:'지형전투 전문가',desc:'지형효과 8종 모두 분석'},
  {id:'v31_myth_master',name:'신화전설 학자',desc:'신화전설 10종 모두 열람'},
  {id:'v31_timeline_view',name:'역사 연대기 통찰',desc:'세력 국력변천 타임라인 확인'},
  {id:'v31_skill_master',name:'스킬트리 분석가',desc:'영웅 10인의 스킬트리 모두 확인'},
  {id:'v31_civ_index',name:'문명발전 평가관',desc:'문명발전 지수 대시보드 확인'},
  {id:'v31_quiz_master',name:'퀴즈 v31 마스터',desc:'v31 퀴즈 15문 전체 정답'},
  {id:'v31_explorer',name:'v31 탐험가',desc:'v31 전체 8개 기능 모두 열람'},
  {id:'v31_star_gazer',name:'별자리 관측가',desc:'천문역법에서 하지/동지 확인'},
  {id:'v31_diplomat',name:'외교전문가',desc:'성공률 70% 이상 임무 3개 확인'}
];

// ===== ACHIEVEMENT SYSTEM =====

function getAch(){
  try{return JSON.parse(localStorage.getItem('krpg_ach'))||[]}catch(e){return[]}
}
function addAch(id){
  var list=getAch();
  if(list.indexOf(id)===-1){
    list.push(id);
    localStorage.setItem('krpg_ach',JSON.stringify(list));
    var a=ACHIEVE_V31.filter(function(x){return x.id===id})[0];
    if(a){sfxAchieve31();toast('업적 달성: '+a.name,'#FFD700')}
  }
}

// Track viewed features
var viewed31={astro:new Set(),weapon:new Set(),envoy:new Set(),terrain:new Set(),myth:new Set(),timeline:false,skill:new Set(),civ:false};

function checkAchievements(){
  if(viewed31.astro.size>=12)addAch('v31_astro_master');
  if(viewed31.weapon.size>=10)addAch('v31_weapon_master');
  if(viewed31.envoy.size>=8)addAch('v31_envoy_master');
  if(viewed31.terrain.size>=8)addAch('v31_terrain_master');
  if(viewed31.myth.size>=10)addAch('v31_myth_master');
  if(viewed31.timeline)addAch('v31_timeline_view');
  if(viewed31.skill.size>=10)addAch('v31_skill_master');
  if(viewed31.civ)addAch('v31_civ_index');
  // star gazer
  if(viewed31.astro.has(4)&&viewed31.astro.has(10))addAch('v31_star_gazer');
  // diplomat
  var highSuccess=ENVOY_DATA.filter(function(e,i){return viewed31.envoy.has(i)&&e.success>=70});
  if(highSuccess.length>=3)addAch('v31_diplomat');
  // explorer
  if(viewed31.astro.size>0&&viewed31.weapon.size>0&&viewed31.envoy.size>0&&viewed31.terrain.size>0&&viewed31.myth.size>0&&viewed31.timeline&&viewed31.skill.size>0&&viewed31.civ)addAch('v31_explorer');
}

// ===== DRAWING FUNCTIONS =====

function drawAstro(cv,selIdx){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#7788cc';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('고대 천문역법 시뮬레이터',W/2,24);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('12개월 음력 순환 + 24절기 + 별자리',W/2,42);

  var d=ASTRO_MONTHS[selIdx];

  // Draw circular star chart
  var cx=200,cy=210,r=120;

  // Background starfield
  var rng=selIdx*137;
  for(var s=0;s<60;s++){
    var sx=30+((rng+s*73)%560);
    var sy=55+((rng+s*97)%330);
    var sb=0.3+((rng+s*31)%70)/100;
    c.beginPath();c.arc(sx,sy,0.5+((rng+s*17)%3)*0.4,0,Math.PI*2);
    c.fillStyle='rgba(200,210,255,'+sb+')';c.fill();
  }

  // Zodiac circle
  for(var ring=1;ring<=3;ring++){
    c.beginPath();c.arc(cx,cy,r*ring/3,0,Math.PI*2);
    c.strokeStyle='rgba(119,136,204,'+(0.1+ring*0.05)+')';c.lineWidth=1;c.stroke();
  }

  // 12 month divisions
  for(var i=0;i<12;i++){
    var angle=-Math.PI/2+(2*Math.PI/12)*i;
    var ex=cx+Math.cos(angle)*r,ey=cy+Math.sin(angle)*r;
    c.beginPath();c.moveTo(cx,cy);c.lineTo(ex,ey);
    c.strokeStyle='rgba(119,136,204,.15)';c.lineWidth=1;c.stroke();
    // Month label
    var lx=cx+Math.cos(angle)*(r+16),ly=cy+Math.sin(angle)*(r+16);
    c.fillStyle=i===selIdx?'#FFD700':'#6678aa';
    c.font=i===selIdx?'bold 10px sans-serif':'9px sans-serif';
    c.textAlign='center';c.textBaseline='middle';
    c.fillText(ASTRO_MONTHS[i].name,lx,ly);
  }

  // Highlight selected month arc
  var startAngle=-Math.PI/2+(2*Math.PI/12)*selIdx;
  var endAngle=startAngle+(2*Math.PI/12);
  c.beginPath();c.moveTo(cx,cy);c.arc(cx,cy,r,startAngle,endAngle);c.closePath();
  c.fillStyle='rgba(119,136,204,.15)';c.fill();
  c.strokeStyle='#7788cc';c.lineWidth=2;c.stroke();

  // Constellation dots for selected month
  for(var j=0;j<8;j++){
    var ca=startAngle+(endAngle-startAngle)*(0.15+j*0.1);
    var cr=r*(0.3+((selIdx*7+j*13)%50)/100);
    var px=cx+Math.cos(ca)*cr,py=cy+Math.sin(ca)*cr;
    c.beginPath();c.arc(px,py,2,0,Math.PI*2);c.fillStyle='#aabbff';c.fill();
    if(j>0){
      var pa=startAngle+(endAngle-startAngle)*(0.15+(j-1)*0.1);
      var pr=r*(0.3+((selIdx*7+(j-1)*13)%50)/100);
      var ppx=cx+Math.cos(pa)*pr,ppy=cy+Math.sin(pa)*pr;
      c.beginPath();c.moveTo(ppx,ppy);c.lineTo(px,py);
      c.strokeStyle='rgba(170,187,255,.3)';c.lineWidth=1;c.stroke();
    }
  }

  // Right side info panel
  var infoX=380,infoY=75;
  c.fillStyle='#FFD700';c.font='bold 14px sans-serif';c.textAlign='left';
  c.fillText(d.name+' (음력)',infoX,infoY);

  c.fillStyle='#aabbcc';c.font='12px sans-serif';
  c.fillText('절기: '+d.terms[0]+' / '+d.terms[1],infoX,infoY+28);

  c.fillStyle='#88aa88';c.font='11px sans-serif';
  c.fillText('농사: '+d.farm,infoX,infoY+56);

  c.fillStyle='#8888cc';c.font='11px sans-serif';
  var starLines=d.stars;
  c.fillText('별: '+starLines,infoX,infoY+82);

  // Draw solar term bar
  var allTerms=['입춘','우수','경칩','춘분','청명','곡우','입하','소만','망종','하지','소서','대서','입추','처서','백로','추분','한로','상강','입동','소설','대설','동지','소한','대한'];
  var termIdx1=allTerms.indexOf(d.terms[0]);
  var termIdx2=allTerms.indexOf(d.terms[1]);

  c.fillStyle='#8a7a6a';c.font='10px sans-serif';c.textAlign='center';
  c.fillText('24절기 연간 위치',W/2,H-55);

  var barL=40,barR=W-40,barY=H-38,barH=14;
  c.fillStyle='rgba(119,136,204,.1)';c.fillRect(barL,barY,barR-barL,barH);
  for(var i=0;i<24;i++){
    var x=barL+(barR-barL)*i/24;
    var isActive=(i===termIdx1||i===termIdx2);
    c.fillStyle=isActive?'#FFD700':'rgba(119,136,204,.3)';
    c.fillRect(x,barY,Math.max((barR-barL)/24-1,2),barH);
    if(i%4===0){
      c.fillStyle='#6678aa';c.font='7px sans-serif';c.textAlign='center';
      c.fillText(allTerms[i],x+(barR-barL)/48,barY+barH+10);
    }
  }

  // Season indicator
  var season=selIdx<3?'봄':selIdx<6?'여름':selIdx<9?'가을':'겨울';
  var seasonColors={'봄':'#88cc88','여름':'#cc8844','가을':'#ccaa44','겨울':'#6688cc'};
  c.fillStyle=seasonColors[season];c.font='bold 13px sans-serif';c.textAlign='left';
  c.fillText('계절: '+season,infoX,infoY+112);

  viewed31.astro.add(selIdx);checkAchievements();
}

function drawWeapon(cv,selIdx){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
  c.fillStyle='#cc7744';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('영웅 전설무기 도감',W/2,24);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('10종 전설무기 6축 Radar 분석',W/2,42);

  var d=WEAPON_DATA[selIdx];
  var cx=W/2,cy=200,r=105;
  var axes=['공격력','내구도','속도','사거리','특수효과','희소성'];
  var vals=[d.atk,d.dur,d.spd,d.rng,d.spc,d.rar];
  var n=6;

  for(var ring=1;ring<=4;ring++){
    c.beginPath();
    for(var i=0;i<=n;i++){
      var angle=-Math.PI/2+(2*Math.PI/n)*(i%n);
      var rr=r*ring/4;
      var px=cx+Math.cos(angle)*rr,py=cy+Math.sin(angle)*rr;
      if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
    }
    c.closePath();c.strokeStyle='rgba(204,119,68,.15)';c.lineWidth=1;c.stroke();
  }

  for(var i=0;i<n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*i;
    var ex=cx+Math.cos(angle)*r,ey=cy+Math.sin(angle)*r;
    c.beginPath();c.moveTo(cx,cy);c.lineTo(ex,ey);c.strokeStyle='rgba(204,119,68,.2)';c.stroke();
    var lx=cx+Math.cos(angle)*(r+20),ly=cy+Math.sin(angle)*(r+20);
    c.fillStyle='#cc7744';c.font='10px sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.fillText(axes[i],lx,ly);
  }

  c.beginPath();
  for(var i=0;i<=n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*(i%n);
    var v=vals[i%n]/100;
    var px=cx+Math.cos(angle)*r*v,py=cy+Math.sin(angle)*r*v;
    if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
  }
  c.closePath();c.fillStyle='rgba(204,119,68,.25)';c.fill();
  c.strokeStyle='#cc7744';c.lineWidth=2;c.stroke();

  for(var i=0;i<n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*i;
    var v=vals[i]/100;
    var px=cx+Math.cos(angle)*r*v,py=cy+Math.sin(angle)*r*v;
    c.beginPath();c.arc(px,py,4,0,Math.PI*2);c.fillStyle='#FFD700';c.fill();
  }

  c.fillStyle='#e8dcc8';c.font='bold 14px sans-serif';c.textAlign='center';
  c.fillText(d.name,W/2,340);
  c.font='11px sans-serif';c.fillStyle='#aa8866';
  c.fillText('소유자: '+d.hero+' | '+d.desc,W/2,360);
  var avg=Math.round(vals.reduce(function(a,b){return a+b},0)/n);
  var grade=avg>=90?'S':avg>=80?'A':avg>=70?'B':avg>=60?'C':'D';
  c.fillStyle=grade==='S'?'#FFD700':grade==='A'?'#44cc88':grade==='B'?'#5588cc':'#cc8844';
  c.font='bold 13px sans-serif';
  c.fillText('종합 '+avg+'점 ('+grade+'등급)',W/2,385);

  viewed31.weapon.add(selIdx);checkAchievements();
}

function drawEnvoy(cv,selIdx){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#66aa88';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('고대 외교 사신단 관리기',W/2,24);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('8개 외교 임무 성공/위험/보상 분석',W/2,42);

  var d=ENVOY_DATA[selIdx];

  // Bar chart for all missions
  var chartL=80,chartR=W-50,chartT=65,chartB=220;
  var cw=chartR-chartL;
  var barW=cw/ENVOY_DATA.length-8;
  var colors=['#cc4444','#4488cc','#44cc88','#cc44aa','#cc8844','#aaaa44','#8888cc','#44aacc'];

  // Grid lines
  for(var j=0;j<=4;j++){
    var y=chartB-(chartB-chartT)*j/4;
    c.fillStyle='#5a6a5a';c.font='9px sans-serif';c.textAlign='right';
    c.fillText((j*25)+'%',chartL-8,y+3);
    c.beginPath();c.moveTo(chartL,y);c.lineTo(chartR,y);c.strokeStyle='rgba(102,170,136,.08)';c.lineWidth=1;c.stroke();
  }
  c.beginPath();c.moveTo(chartL,chartT);c.lineTo(chartL,chartB);c.lineTo(chartR,chartB);c.strokeStyle='rgba(102,170,136,.3)';c.stroke();

  // Bars: success rate, risk, reward grouped
  ENVOY_DATA.forEach(function(e,i){
    var x=chartL+i*(barW+8)+4;
    var isSel=(i===selIdx);
    var bw=barW/3;

    // Success bar
    var sh=(chartB-chartT)*e.success/100;
    c.fillStyle=isSel?'#44cc88':'rgba(68,204,136,.3)';
    c.fillRect(x,chartB-sh,bw-1,sh);

    // Risk bar
    var rh=(chartB-chartT)*e.risk/100;
    c.fillStyle=isSel?'#cc4444':'rgba(204,68,68,.3)';
    c.fillRect(x+bw,chartB-rh,bw-1,rh);

    // Reward bar
    var rwh=(chartB-chartT)*e.reward/100;
    c.fillStyle=isSel?'#FFD700':'rgba(255,215,0,.3)';
    c.fillRect(x+bw*2,chartB-rwh,bw-1,rwh);

    c.fillStyle=isSel?'#e8dcc8':'#6a7a6a';c.font='8px sans-serif';c.textAlign='center';
    c.fillText(e.from+'→'+e.to,x+barW/2,chartB+12);
  });

  // Legend
  c.fillStyle='#44cc88';c.fillRect(chartL,chartB+22,8,8);
  c.fillStyle='#aabbaa';c.font='9px sans-serif';c.textAlign='left';c.fillText('성공률',chartL+12,chartB+30);
  c.fillStyle='#cc4444';c.fillRect(chartL+55,chartB+22,8,8);
  c.fillStyle='#aabbaa';c.fillText('위험도',chartL+67,chartB+30);
  c.fillStyle='#FFD700';c.fillRect(chartL+110,chartB+22,8,8);
  c.fillStyle='#aabbaa';c.fillText('보상도',chartL+122,chartB+30);

  // Envoy skills radar (bottom section)
  var cx2=W/2,cy2=320,r2=60;
  var skillAxes=['무력','지혜','언변','협상','인내','용기'];
  var sn=6;
  for(var ring=1;ring<=3;ring++){
    c.beginPath();
    for(var i=0;i<=sn;i++){
      var angle=-Math.PI/2+(2*Math.PI/sn)*(i%sn);
      var rr=r2*ring/3;
      var px=cx2+Math.cos(angle)*rr,py=cy2+Math.sin(angle)*rr;
      if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
    }
    c.closePath();c.strokeStyle='rgba(102,170,136,.12)';c.lineWidth=1;c.stroke();
  }
  for(var i=0;i<sn;i++){
    var angle=-Math.PI/2+(2*Math.PI/sn)*i;
    var ex=cx2+Math.cos(angle)*r2,ey=cy2+Math.sin(angle)*r2;
    c.beginPath();c.moveTo(cx2,cy2);c.lineTo(ex,ey);c.strokeStyle='rgba(102,170,136,.15)';c.stroke();
    var lx=cx2+Math.cos(angle)*(r2+14),ly=cy2+Math.sin(angle)*(r2+14);
    c.fillStyle='#66aa88';c.font='9px sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.fillText(skillAxes[i],lx,ly);
  }
  c.beginPath();
  for(var i=0;i<=sn;i++){
    var angle=-Math.PI/2+(2*Math.PI/sn)*(i%sn);
    var v=d.skills[i%sn]/100;
    var px=cx2+Math.cos(angle)*r2*v,py=cy2+Math.sin(angle)*r2*v;
    if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
  }
  c.closePath();c.fillStyle='rgba(102,170,136,.2)';c.fill();
  c.strokeStyle='#66aa88';c.lineWidth=2;c.stroke();

  c.fillStyle='#e8dcc8';c.font='bold 12px sans-serif';c.textAlign='center';
  c.fillText(d.from+' → '+d.to+' | 사신: '+d.envoy,W/2,395);

  viewed31.envoy.add(selIdx);checkAchievements();
}

function drawTerrain(cv,selIdx){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#aaaa44';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('전투 지형효과 분석기',W/2,24);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('8지형 x 6병종 전투 보정치 히트맵',W/2,42);

  // Heatmap
  var hmL=100,hmT=60,cellW=68,cellH=34;
  var hmW=cellW*TERRAIN_UNITS.length,hmH=cellH*TERRAIN_DATA.length;

  // Column headers (unit types)
  c.fillStyle='#aaaa44';c.font='bold 10px sans-serif';c.textAlign='center';
  TERRAIN_UNITS.forEach(function(u,i){
    c.fillText(u,hmL+i*cellW+cellW/2,hmT-8);
  });

  // Rows
  TERRAIN_DATA.forEach(function(t,ti){
    var y=hmT+ti*cellH;
    var isSel=(ti===selIdx);

    // Row label
    c.fillStyle=isSel?'#FFD700':'#aaaa44';c.font=isSel?'bold 11px sans-serif':'10px sans-serif';
    c.textAlign='right';
    c.fillText(t.name,hmL-10,y+cellH/2+3);

    // Cells
    t.mods.forEach(function(mod,ui){
      var x=hmL+ui*cellW;
      // Color based on modifier value
      var r,g,b;
      if(mod>=120){r=60;g=180;b=60}      // Strong bonus - green
      else if(mod>=100){r=100;g=140;b=60} // Slight bonus - yellow-green
      else if(mod>=80){r=170;g=170;b=60}  // Slight penalty - yellow
      else if(mod>=60){r=200;g=120;b=40}  // Medium penalty - orange
      else{r=180;g=50;b=50}               // Heavy penalty - red

      var alpha=isSel?0.7:0.4;
      c.fillStyle='rgba('+r+','+g+','+b+','+alpha+')';
      c.fillRect(x+1,y+1,cellW-2,cellH-2);

      if(isSel){
        c.strokeStyle='#FFD700';c.lineWidth=1;c.strokeRect(x+1,y+1,cellW-2,cellH-2);
      }

      c.fillStyle=isSel?'#fff':'#ccc';c.font=isSel?'bold 11px sans-serif':'10px sans-serif';
      c.textAlign='center';c.textBaseline='middle';
      c.fillText(mod+'%',x+cellW/2,y+cellH/2);
    });
  });

  // Selected terrain details
  var sel=TERRAIN_DATA[selIdx];
  var bestUnit=0,worstUnit=0;
  sel.mods.forEach(function(m,i){
    if(m>sel.mods[bestUnit])bestUnit=i;
    if(m<sel.mods[worstUnit])worstUnit=i;
  });

  c.fillStyle='#e8dcc8';c.font='bold 13px sans-serif';c.textAlign='center';
  c.fillText(sel.name+' 지형 분석',W/2,hmT+hmH+30);
  c.font='11px sans-serif';c.fillStyle='#88aa44';
  c.fillText('최적 병종: '+TERRAIN_UNITS[bestUnit]+' ('+sel.mods[bestUnit]+'%) | 불리: '+TERRAIN_UNITS[worstUnit]+' ('+sel.mods[worstUnit]+'%)',W/2,hmT+hmH+48);

  // Legend
  var legY=hmT+hmH+62;
  var legItems=[{label:'120%+',color:'rgba(60,180,60,.6)'},{label:'100-119%',color:'rgba(100,140,60,.6)'},{label:'80-99%',color:'rgba(170,170,60,.6)'},{label:'60-79%',color:'rgba(200,120,40,.6)'},{label:'<60%',color:'rgba(180,50,50,.6)'}];
  var legX=W/2-legItems.length*50/2;
  legItems.forEach(function(item,i){
    c.fillStyle=item.color;c.fillRect(legX+i*100,legY,12,12);
    c.fillStyle='#8a8a6a';c.font='9px sans-serif';c.textAlign='left';
    c.fillText(item.label,legX+i*100+16,legY+10);
  });

  viewed31.terrain.add(selIdx);checkAchievements();
}

function drawMyth(cv,selIdx){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#0a040a';c.fillRect(0,0,W,H);
  c.fillStyle='#aa66cc';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('고대 신화전설 아카이브',W/2,24);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('10신화 5축 Radar (역사/교육/드라마/문화/신비)',W/2,42);

  var d=MYTH_DATA[selIdx];
  var cx=W/2,cy=200,r=105;
  var axes=['역사적가치','교육성','드라마성','문화영향','신비성'];
  var vals=[d.history,d.education,d.drama,d.culture,d.mystery];
  var n=5;

  for(var ring=1;ring<=4;ring++){
    c.beginPath();
    for(var i=0;i<=n;i++){
      var angle=-Math.PI/2+(2*Math.PI/n)*(i%n);
      var rr=r*ring/4;
      var px=cx+Math.cos(angle)*rr,py=cy+Math.sin(angle)*rr;
      if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
    }
    c.closePath();c.strokeStyle='rgba(170,102,204,.15)';c.lineWidth=1;c.stroke();
  }

  for(var i=0;i<n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*i;
    var ex=cx+Math.cos(angle)*r,ey=cy+Math.sin(angle)*r;
    c.beginPath();c.moveTo(cx,cy);c.lineTo(ex,ey);c.strokeStyle='rgba(170,102,204,.2)';c.stroke();
    var lx=cx+Math.cos(angle)*(r+22),ly=cy+Math.sin(angle)*(r+22);
    c.fillStyle='#aa66cc';c.font='10px sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.fillText(axes[i],lx,ly);
  }

  c.beginPath();
  for(var i=0;i<=n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*(i%n);
    var v=vals[i%n]/100;
    var px=cx+Math.cos(angle)*r*v,py=cy+Math.sin(angle)*r*v;
    if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
  }
  c.closePath();c.fillStyle='rgba(170,102,204,.2)';c.fill();
  c.strokeStyle='#aa66cc';c.lineWidth=2;c.stroke();

  for(var i=0;i<n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*i;
    var v=vals[i]/100;
    var px=cx+Math.cos(angle)*r*v,py=cy+Math.sin(angle)*r*v;
    c.beginPath();c.arc(px,py,4,0,Math.PI*2);c.fillStyle='#FFD700';c.fill();
  }

  c.fillStyle='#e8dcc8';c.font='bold 14px sans-serif';c.textAlign='center';
  c.fillText(d.name,W/2,340);
  c.font='11px sans-serif';c.fillStyle='#9a7aaa';
  c.fillText(d.desc,W/2,360);
  var avg=Math.round(vals.reduce(function(a,b){return a+b},0)/n);
  var grade=avg>=90?'S':avg>=80?'A':avg>=70?'B':avg>=60?'C':'D';
  c.fillStyle=grade==='S'?'#FFD700':grade==='A'?'#44cc88':grade==='B'?'#aa66cc':'#cc8844';
  c.font='bold 13px sans-serif';
  c.fillText('종합 '+avg+'점 ('+grade+'등급)',W/2,385);

  viewed31.myth.add(selIdx);checkAchievements();
}

function drawTimeline(cv){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#55aaaa';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('세력 국력변천 타임라인',W/2,24);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('6세력 8시기 국력 변화 멀티라인 차트',W/2,42);

  var chartL=80,chartR=W-40,chartT=65,chartB=H-60;
  var cw=chartR-chartL,ch=chartB-chartT;
  var periods=TIMELINE_DATA.periods;
  var factions=TIMELINE_DATA.factions;
  var np=periods.length;

  // Grid
  c.strokeStyle='rgba(85,170,170,.3)';c.lineWidth=1;
  c.beginPath();c.moveTo(chartL,chartT);c.lineTo(chartL,chartB);c.lineTo(chartR,chartB);c.stroke();

  for(var j=0;j<=4;j++){
    var y=chartB-ch*j/4;
    c.fillStyle='#5a8a8a';c.font='9px sans-serif';c.textAlign='right';
    c.fillText((j*25),chartL-8,y+3);
    c.beginPath();c.moveTo(chartL,y);c.lineTo(chartR,y);c.strokeStyle='rgba(85,170,170,.08)';c.stroke();
  }

  for(var i=0;i<np;i++){
    var x=chartL+cw*i/(np-1);
    c.fillStyle='#5a8a8a';c.font='8px sans-serif';c.textAlign='center';
    c.save();c.translate(x,chartB+12);c.rotate(Math.PI/6);
    c.fillText(periods[i],0,0);
    c.restore();
    c.beginPath();c.moveTo(x,chartT);c.lineTo(x,chartB);c.strokeStyle='rgba(85,170,170,.06)';c.lineWidth=1;c.stroke();
  }

  // Draw each faction as area + line
  factions.forEach(function(f){
    // Area fill
    c.beginPath();
    c.moveTo(chartL,chartB);
    for(var i=0;i<np;i++){
      var x=chartL+cw*i/(np-1);
      var y=chartB-ch*f.values[i]/100;
      if(i===0)c.lineTo(x,y);else c.lineTo(x,y);
    }
    c.lineTo(chartR,chartB);c.closePath();
    var hr=parseInt(f.color.substr(1,2),16),hg=parseInt(f.color.substr(3,2),16),hb=parseInt(f.color.substr(5,2),16);
    c.fillStyle='rgba('+hr+','+hg+','+hb+',.12)';c.fill();

    // Line
    c.beginPath();
    for(var i=0;i<np;i++){
      var x=chartL+cw*i/(np-1);
      var y=chartB-ch*f.values[i]/100;
      if(i===0)c.moveTo(x,y);else c.lineTo(x,y);
    }
    c.strokeStyle=f.color;c.lineWidth=2;c.stroke();

    // Dots
    for(var i=0;i<np;i++){
      var x=chartL+cw*i/(np-1);
      var y=chartB-ch*f.values[i]/100;
      c.beginPath();c.arc(x,y,3,0,Math.PI*2);c.fillStyle=f.color;c.fill();
    }

    // Label at end
    var lastY=chartB-ch*f.values[np-1]/100;
    c.fillStyle=f.color;c.font='10px sans-serif';c.textAlign='left';
    c.fillText(f.name,chartR+5,lastY+3);
  });

  viewed31.timeline=true;checkAchievements();
}

function drawSkillTree(cv,selIdx){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#88cc44';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('영웅 특기 스킬트리',W/2,24);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('10영웅 6분야 스킬 트리 다이어그램',W/2,42);

  var d=SKILL_DATA[selIdx];
  var branches=SKILL_BRANCHES;
  var nb=branches.length;

  // Tree structure: center hero node, branches radiate outward
  var cx=W/2,cy=200;

  // Central hero node
  c.beginPath();c.arc(cx,cy,28,0,Math.PI*2);
  c.fillStyle='rgba(136,204,68,.2)';c.fill();
  c.strokeStyle='#88cc44';c.lineWidth=2;c.stroke();
  c.fillStyle='#FFD700';c.font='bold 12px sans-serif';c.textAlign='center';c.textBaseline='middle';
  c.fillText(d.name,cx,cy);

  // Branch nodes
  var branchR=130;
  for(var i=0;i<nb;i++){
    var angle=-Math.PI/2+(2*Math.PI/nb)*i;
    var bx=cx+Math.cos(angle)*branchR;
    var by=cy+Math.sin(angle)*branchR;
    var val=d.branches[i];
    var mastery=val>=90?'Master':val>=75?'Expert':val>=60?'Adept':val>=40?'Novice':'Basic';
    var mColor=val>=90?'#FFD700':val>=75?'#44cc88':val>=60?'#88cc44':val>=40?'#aaaa44':'#888888';

    // Connection line
    c.beginPath();c.moveTo(cx,cy);c.lineTo(bx,by);
    c.strokeStyle='rgba(136,204,68,.3)';c.lineWidth=2;c.stroke();

    // Skill nodes along the branch (progression)
    var nodeCount=Math.ceil(val/20);
    for(var j=1;j<=5;j++){
      var t=j/6;
      var nx=cx+Math.cos(angle)*branchR*t;
      var ny=cy+Math.sin(angle)*branchR*t;
      var unlocked=j<=nodeCount;
      c.beginPath();c.arc(nx,ny,5,0,Math.PI*2);
      c.fillStyle=unlocked?mColor:'rgba(80,80,80,.5)';c.fill();
      c.strokeStyle=unlocked?mColor:'#444';c.lineWidth=1;c.stroke();
    }

    // Branch endpoint
    c.beginPath();c.arc(bx,by,18,0,Math.PI*2);
    c.fillStyle='rgba('+parseInt(mColor.substr(1,2),16)+','+parseInt(mColor.substr(3,2),16)+','+parseInt(mColor.substr(5,2),16)+',.2)';
    c.fill();
    c.strokeStyle=mColor;c.lineWidth=2;c.stroke();

    c.fillStyle=mColor;c.font='bold 10px sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.fillText(val,bx,by-2);

    // Branch label
    var lx=cx+Math.cos(angle)*(branchR+34);
    var ly=cy+Math.sin(angle)*(branchR+34);
    c.fillStyle='#88cc44';c.font='10px sans-serif';
    c.fillText(branches[i],lx,ly);

    // Mastery label
    c.fillStyle=mColor;c.font='8px sans-serif';
    c.fillText(mastery,lx,ly+12);
  }

  // Summary
  var avg=Math.round(d.branches.reduce(function(a,b){return a+b},0)/nb);
  var grade=avg>=85?'S':avg>=70?'A':avg>=55?'B':avg>=40?'C':'D';
  c.fillStyle='#e8dcc8';c.font='bold 13px sans-serif';c.textAlign='center';c.textBaseline='alphabetic';
  c.fillText(d.name+' 종합 스킬: '+avg+'점 ('+grade+'등급)',W/2,385);

  viewed31.skill.add(selIdx);checkAchievements();
}

function drawCivIndex(cv){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#aa88cc';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('종합 문명발전 지수',W/2,24);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('8 KPI 반원게이지 + 가중 복합 등급',W/2,42);

  var cols=4,rows=2;
  var gaugeW=130,gaugeH=100;
  var startX=(W-cols*gaugeW)/2;
  var startY=65;

  CIV_KPIS.forEach(function(kpi,i){
    var col=i%cols,row=Math.floor(i/cols);
    var cx=startX+col*gaugeW+gaugeW/2;
    var cy=startY+row*(gaugeH+50)+gaugeH/2+20;
    var r=40;

    // Semi-circle background
    c.beginPath();c.arc(cx,cy,r,-Math.PI,0);
    c.strokeStyle='rgba(170,136,204,.15)';c.lineWidth=8;c.stroke();

    // Semi-circle fill based on value
    var endAngle=-Math.PI+Math.PI*kpi.value/100;
    c.beginPath();c.arc(cx,cy,r,-Math.PI,endAngle);
    var hr=parseInt(kpi.color.substr(1,2),16),hg=parseInt(kpi.color.substr(3,2),16),hb=parseInt(kpi.color.substr(5,2),16);
    c.strokeStyle=kpi.color;c.lineWidth=8;c.stroke();

    // Value text
    c.fillStyle=kpi.color;c.font='bold 18px sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.fillText(kpi.value,cx,cy-4);

    // Label
    c.fillStyle='#e8dcc8';c.font='10px sans-serif';
    c.fillText(kpi.name,cx,cy+18);

    // Grade
    var grade=kpi.value>=80?'S':kpi.value>=65?'A':kpi.value>=50?'B':kpi.value>=35?'C':'D';
    c.fillStyle=grade==='S'?'#FFD700':grade==='A'?'#44cc88':grade==='B'?'#5588cc':grade==='C'?'#cc8844':'#cc4444';
    c.font='bold 9px sans-serif';
    c.fillText(grade+'등급',cx,cy+32);
  });

  // Composite score
  var weights=[0.18,0.15,0.12,0.12,0.13,0.10,0.10,0.10];
  var total=0;
  CIV_KPIS.forEach(function(kpi,i){total+=kpi.value*weights[i]});
  total=Math.round(total);
  var tgrade=total>=80?'S':total>=65?'A':total>=50?'B':total>=35?'C':'D';
  c.fillStyle='#FFD700';c.font='bold 18px sans-serif';c.textAlign='center';c.textBaseline='alphabetic';
  c.fillText('종합 문명지수: '+total+'점 ('+tgrade+'등급)',W/2,H-20);

  viewed31.civ=true;checkAchievements();
}

// ===== PANEL BUILDERS =====

function buildAstroPanel(wrap){
  wrap.className='astro-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  var sel=0;drawAstro(cv,sel);
  var tabs=document.createElement('div');tabs.className='astro-tabs';
  ASTRO_MONTHS.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='astro-btn'+(i===0?' active':'');
    btn.textContent=d.name;
    btn.onclick=function(){
      sel=i;drawAstro(cv,sel);sfxAstro();
      tabs.querySelectorAll('.astro-btn').forEach(function(b,bi){b.className='astro-btn'+(bi===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildWeaponPanel(wrap){
  wrap.className='weapon-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  var sel=0;drawWeapon(cv,sel);
  var tabs=document.createElement('div');tabs.className='weapon-tabs';
  WEAPON_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='weapon-btn'+(i===0?' active':'');
    btn.textContent=d.name;
    btn.onclick=function(){
      sel=i;drawWeapon(cv,sel);sfxWeapon();
      tabs.querySelectorAll('.weapon-btn').forEach(function(b,bi){b.className='weapon-btn'+(bi===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildEnvoyPanel(wrap){
  wrap.className='envoy-wrap';
  var cv=document.createElement('canvas');cv.width=640;cv.height=400;wrap.appendChild(cv);
  var sel=0;drawEnvoy(cv,sel);
  var tabs=document.createElement('div');tabs.className='envoy-tabs';
  ENVOY_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='envoy-btn'+(i===0?' active':'');
    btn.textContent=d.from+'→'+d.to;
    btn.onclick=function(){
      sel=i;drawEnvoy(cv,sel);sfxEnvoy();
      tabs.querySelectorAll('.envoy-btn').forEach(function(b,bi){b.className='envoy-btn'+(bi===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildTerrainPanel(wrap){
  wrap.className='terrain-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  var sel=0;drawTerrain(cv,sel);
  var tabs=document.createElement('div');tabs.className='terrain-tabs';
  TERRAIN_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='terrain-btn'+(i===0?' active':'');
    btn.textContent=d.name;
    btn.onclick=function(){
      sel=i;drawTerrain(cv,sel);sfxTerrain();
      tabs.querySelectorAll('.terrain-btn').forEach(function(b,bi){b.className='terrain-btn'+(bi===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildMythPanel(wrap){
  wrap.className='myth-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  var sel=0;drawMyth(cv,sel);
  var tabs=document.createElement('div');tabs.className='myth-tabs';
  MYTH_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='myth-btn'+(i===0?' active':'');
    btn.textContent=d.name;
    btn.onclick=function(){
      sel=i;drawMyth(cv,sel);sfxMyth();
      tabs.querySelectorAll('.myth-btn').forEach(function(b,bi){b.className='myth-btn'+(bi===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildTimelinePanel(wrap){
  wrap.className='timeline-wrap';
  var cv=document.createElement('canvas');cv.width=640;cv.height=400;wrap.appendChild(cv);
  drawTimeline(cv);
}

function buildSkillTreePanel(wrap){
  wrap.className='skill-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  var sel=0;drawSkillTree(cv,sel);
  var tabs=document.createElement('div');tabs.className='skill-tabs';
  SKILL_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='skill-btn'+(i===0?' active':'');
    btn.textContent=d.name;
    btn.onclick=function(){
      sel=i;drawSkillTree(cv,sel);sfxSkillTree();
      tabs.querySelectorAll('.skill-btn').forEach(function(b,bi){b.className='skill-btn'+(bi===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildCivIndexPanel(wrap){
  wrap.className='civindex-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  drawCivIndex(cv);
  var info=document.createElement('div');info.className='civindex-info';info.textContent='각 분야의 문명발전 지수를 높여 종합 등급을 올리세요';
  wrap.appendChild(info);
}

function buildQuiz31(wrap){
  var idx=0,score=0;
  var qDiv=document.createElement('div');qDiv.style.cssText='max-width:580px;margin:0 auto;text-align:center';
  wrap.appendChild(qDiv);
  function showQ(){
    if(idx>=QUIZ_V31.length){
      var grade=score>=14?'S':score>=12?'A':score>=10?'B':score>=7?'C':'D';
      qDiv.innerHTML='<h3 style="color:#FFD700;font-size:20px;margin:20px 0">퀴즈 v31 완료!</h3>'+
        '<p style="color:#cc8844;font-size:16px">'+score+'/'+QUIZ_V31.length+' 정답 ('+grade+'등급)</p>'+
        '<button onclick="this.parentElement.parentElement.querySelector(\'button.v31-close\')&&this.parentElement.parentElement.querySelector(\'button.v31-close\').click()" style="margin-top:16px;padding:10px 24px;border:1px solid #5a3a1a;border-radius:6px;background:#6B1A0A;color:#e8dcc8;font-size:13px;cursor:pointer;font-family:inherit">닫기</button>';
      if(score>=14){sfxComplete31();addAch('v31_quiz_master')}
      try{
        var st=JSON.parse(localStorage.getItem('krpg_stats'))||{};
        st.quizOk=(st.quizOk||0)+score;
        localStorage.setItem('krpg_stats',JSON.stringify(st));
      }catch(e){}
      return;
    }
    var q=QUIZ_V31[idx];
    var html='<p style="color:#e8dcc8;font-size:14px;margin:16px 0">'+(idx+1)+'/'+QUIZ_V31.length+'. '+q.q+'</p>';
    q.a.forEach(function(a,ai){
      html+='<button class="quiz31-opt" data-i="'+ai+'" style="display:block;width:100%;max-width:400px;margin:8px auto;padding:10px;border:1px solid #3a3a4a;border-radius:8px;background:rgba(20,16,30,.9);color:#e8dcc8;font-size:12px;cursor:pointer;font-family:inherit;transition:all .2s">'+a+'</button>';
    });
    qDiv.innerHTML=html;
    qDiv.querySelectorAll('.quiz31-opt').forEach(function(btn){
      btn.onclick=function(){
        var sel=parseInt(btn.dataset.i);
        if(sel===q.c){score++;sfxQuiz31();toast('정답! ✅','#44cc88');btn.style.borderColor='#44cc88';btn.style.background='rgba(68,204,136,.2)'}
        else{sfxQuizWrong31();toast('오답! ❌ 정답: '+q.a[q.c],'#cc4444');btn.style.borderColor='#cc4444';btn.style.background='rgba(204,68,68,.2)'}
        setTimeout(function(){idx++;showQ()},1200);
      };
    });
  }
  showQ();
}

// ===== BUILD PANELS =====

function buildPanels(){
  var panels=[
    {id:'v31-astro',title:'고대 천문역법 시뮬레이터',sub:'12개월 음력 순환 + 24절기 + 별자리',builder:buildAstroPanel},
    {id:'v31-weapon',title:'영웅 전설무기 도감',sub:'10종 전설무기 6축 Radar 분석',builder:buildWeaponPanel},
    {id:'v31-envoy',title:'고대 외교 사신단 관리기',sub:'8개 외교 임무 성공/실패 분석',builder:buildEnvoyPanel},
    {id:'v31-terrain',title:'전투 지형효과 분석기',sub:'8지형 x 6병종 히트맵 보정치',builder:buildTerrainPanel},
    {id:'v31-myth',title:'고대 신화전설 아카이브',sub:'10신화 5축 Radar 분석',builder:buildMythPanel},
    {id:'v31-timeline',title:'세력 국력변천 타임라인',sub:'6세력 8시기 멀티라인 차트',builder:buildTimelinePanel},
    {id:'v31-skilltree',title:'영웅 특기 스킬트리',sub:'10영웅 6분야 스킬 트리 다이어그램',builder:buildSkillTreePanel},
    {id:'v31-civindex',title:'종합 문명발전 지수',sub:'8 KPI 반원게이지 + 가중 복합 등급',builder:buildCivIndexPanel},
    {id:'v31-quiz31',title:'역사 퀴즈 v31',sub:'15문항 — 천문/무기/외교/지형/신화',builder:buildQuiz31}
  ];

  panels.forEach(function(p){
    var panel=document.createElement('div');panel.id=p.id;panel.className='v31-panel';
    var h2=document.createElement('h2');h2.textContent=p.title;panel.appendChild(h2);
    var sub=document.createElement('p');sub.className='v31-sub';sub.textContent=p.sub;panel.appendChild(sub);
    var wrap=document.createElement('div');panel.appendChild(wrap);
    p.builder(wrap);
    var closeBtn=document.createElement('button');closeBtn.className='v31-close';closeBtn.textContent='닫기';
    closeBtn.onclick=function(){panel.classList.remove('on');sfxClose31()};
    panel.appendChild(closeBtn);
    document.body.appendChild(panel);
  });

  // --- Nav buttons (append to existing nav bar) ---
  var navBar=document.querySelector('.v7-nav-bar')||document.querySelector('.v8-nav-bar')||document.querySelector('[class*="nav-bar"]');
  if(!navBar){
    var allBars=document.querySelectorAll('div[style*="position"]');
    for(var i=0;i<allBars.length;i++){
      var s=allBars[i].style;
      if(s.position==='fixed'&&(s.bottom==='0'||s.bottom==='0px')&&allBars[i].children.length>3){
        navBar=allBars[i];break;
      }
    }
  }
  if(!navBar){
    var bttns=document.querySelectorAll('button[onclick*="v30"],button[onclick*="v29"],button[onclick*="v28"]');
    if(bttns.length>0)navBar=bttns[0].parentElement;
  }
  if(navBar){
    var btns=[
      {id:'v31-astro',label:'✨천문',color:'#7788cc'},
      {id:'v31-weapon',label:'⚔️무기',color:'#cc7744'},
      {id:'v31-envoy',label:'📜외교',color:'#66aa88'},
      {id:'v31-terrain',label:'⛰️지형',color:'#aaaa44'},
      {id:'v31-myth',label:'🔮신화',color:'#aa66cc'},
      {id:'v31-timeline',label:'📈국력',color:'#55aaaa'},
      {id:'v31-skilltree',label:'🌳스킬',color:'#88cc44'},
      {id:'v31-civindex',label:'🏛️문명',color:'#aa88cc'},
      {id:'v31-quiz31',label:'❓퀴즈v31',color:'#cc8844'}
    ];
    btns.forEach(function(b){
      var btn=document.createElement('button');
      btn.style.cssText='padding:4px 6px;border:1px solid '+b.color+';border-radius:4px;background:rgba(10,6,8,.8);color:'+b.color+';font-size:9px;cursor:pointer;font-family:inherit;margin:2px;white-space:nowrap';
      btn.textContent=b.label;
      btn.onclick=function(){
        var p=document.getElementById(b.id);
        if(p){p.classList.add('on');sfxNav31()}
      };
      navBar.appendChild(btn);
    });
  }
}

// --- Keyboard shortcuts ---
document.addEventListener('keydown',function(e){
  if(!e.shiftKey)return;
  var panels={
    'KeyQ':'v31-astro','KeyW':'v31-weapon','KeyE':'v31-envoy','KeyR':'v31-terrain',
    'KeyT':'v31-myth','KeyY':'v31-timeline','KeyU':'v31-skilltree','KeyI':'v31-civindex','Digit9':'v31-quiz31'
  };
  var id=panels[e.code];
  if(id){
    e.preventDefault();
    var p=document.getElementById(id);
    if(p){
      if(p.classList.contains('on')){p.classList.remove('on');sfxClose31()}
      else{p.classList.add('on');sfxNav31()}
    }
  }
});

// --- URL param support ---
function checkUrlParams(){
  var params=new URLSearchParams(window.location.search);
  var openMap={
    'astroCalendar':'v31-astro','legendWeapon':'v31-weapon','envoyManager':'v31-envoy',
    'terrainEffect':'v31-terrain','mythArchive':'v31-myth','powerTimeline':'v31-timeline',
    'skillTree':'v31-skilltree','civIndex':'v31-civindex','quizv31':'v31-quiz31'
  };
  var open=params.get('open');
  if(open&&openMap[open]){
    var p=document.getElementById(openMap[open]);
    if(p)setTimeout(function(){p.classList.add('on')},500);
  }
}

// --- Init ---
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',function(){buildPanels();checkUrlParams()});
}else{
  buildPanels();checkUrlParams();
}
})();
