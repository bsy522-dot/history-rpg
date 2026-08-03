// v30_patch.js — 한국사 영웅전 v30.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v30-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:150;overflow-y:auto;padding:16px}',
'.v30-panel.on{display:block}',
'.v30-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v30-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v30-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v30-close:hover{background:#8B2A1A}',
'.v30-toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);padding:8px 20px;border-radius:20px;font-size:11px;font-weight:700;z-index:999;pointer-events:none;animation:v30fade 2s ease forwards}',
'@keyframes v30fade{0%{opacity:0;transform:translate(-50%,-10px)}10%{opacity:1;transform:translate(-50%,0)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-10px)}}',

'.food-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.food-wrap canvas{border:2px solid #3a2a1a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.food-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.food-btn{padding:5px 12px;border:1px solid #3a2a1a;border-radius:6px;background:#140e08;color:#cc9944;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.food-btn:hover{border-color:#cc9944}',
'.food-btn.active{border-color:#FFD700;color:#FFD700}',

'.supply-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.supply-wrap canvas{border:2px solid #2a3a2a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.supply-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.supply-btn{padding:5px 12px;border:1px solid #2a3a2a;border-radius:6px;background:#081008;color:#66aa66;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.supply-btn:hover{border-color:#66aa66}',
'.supply-btn.active{border-color:#FFD700;color:#FFD700}',

'.housing-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.housing-wrap canvas{border:2px solid #2a2a3a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.housing-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.housing-btn{padding:5px 12px;border:1px solid #2a2a3a;border-radius:6px;background:#0a0a1a;color:#8888cc;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.housing-btn:hover{border-color:#8888cc}',
'.housing-btn.active{border-color:#FFD700;color:#FFD700}',

'.fstyle-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.fstyle-wrap canvas{border:2px solid #3a1a2a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.fstyle-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.fstyle-btn{padding:5px 12px;border:1px solid #3a1a2a;border-radius:6px;background:#140a10;color:#cc5588;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.fstyle-btn:hover{border-color:#cc5588}',
'.fstyle-btn.active{border-color:#FFD700;color:#FFD700}',

'.metal-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.metal-wrap canvas{border:2px solid #3a3a2a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.metal-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.metal-btn{padding:5px 12px;border:1px solid #3a3a2a;border-radius:6px;background:#121208;color:#aaaa55;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.metal-btn:hover{border-color:#aaaa55}',
'.metal-btn.active{border-color:#FFD700;color:#FFD700}',

'.mstrategy-wrap{max-width:640px;margin:0 auto;text-align:center}',
'.mstrategy-wrap canvas{border:2px solid #1a2a3a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.mstrategy-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.mstrategy-btn{padding:5px 12px;border:1px solid #1a2a3a;border-radius:6px;background:#080e14;color:#5588cc;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.mstrategy-btn:hover{border-color:#5588cc}',
'.mstrategy-btn.active{border-color:#FFD700;color:#FFD700}',

'.geo-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.geo-wrap canvas{border:2px solid #2a3a1a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.geo-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.geo-btn{padding:5px 12px;border:1px solid #2a3a1a;border-radius:6px;background:#0a1008;color:#88aa44;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.geo-btn:hover{border-color:#88aa44}',
'.geo-btn.active{border-color:#FFD700;color:#FFD700}',

'.mastery-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.mastery-wrap canvas{border:2px solid #3a2a3a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.mastery-info{font-size:11px;color:#aa88cc;margin:8px 0;min-height:32px}'
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
function sfxNav30(){sfx(520,.15,'triangle',.1);sfx(780,.1,'sine',.06)}
function sfxClick30(){sfx(660,.1,'square',.08)}
function sfxClose30(){sfx(330,.2,'triangle',.08)}
function sfxQuiz30(){sfx(880,.15,'sine',.1);sfx(1100,.12,'triangle',.06)}
function sfxQuizWrong30(){sfx(220,.25,'sawtooth',.08)}
function sfxComplete30(){sfx(660,.12,'sine',.1);sfx(880,.12,'triangle',.08);sfx(1100,.15,'sine',.06)}
function sfxFood(){sfx(600,.12,'sine',.1);sfx(750,.1,'triangle',.06)}
function sfxSupply(){sfx(440,.15,'square',.08);sfx(550,.12,'triangle',.06)}
function sfxHousing(){sfx(500,.12,'sine',.1);sfx(630,.1,'triangle',.06)}
function sfxStyle(){sfx(720,.12,'triangle',.1);sfx(900,.1,'sine',.06)}
function sfxMetal(){sfx(380,.15,'sawtooth',.08);sfx(480,.12,'square',.06)}
function sfxStrategy(){sfx(560,.12,'square',.1);sfx(700,.1,'triangle',.06)}
function sfxGeo(){sfx(490,.12,'sine',.1);sfx(620,.1,'triangle',.06)}
function sfxMastery(){sfx(660,.15,'sine',.1);sfx(990,.12,'triangle',.08)}
function sfxAchieve30(){sfx(440,.1,'sine',.12);sfx(660,.1,'triangle',.1);sfx(880,.15,'sine',.08)}

function toast(msg,color){
  var t=document.createElement('div');
  t.className='v30-toast';t.textContent=msg;
  t.style.background=color||'#c4956a';t.style.color='#fff';
  document.body.appendChild(t);
  setTimeout(function(){if(t.parentElement)t.parentElement.removeChild(t)},2200);
}

// ===== DATA =====

var FOOD_DATA=[
  {name:'쌀밥',nutrition:90,taste:85,rarity:30,preservation:60,meaning:95,origin:'한반도',desc:'주식의 핵심. 제사와 일상의 기본 음식'},
  {name:'김치(저)',nutrition:75,taste:80,rarity:35,preservation:95,meaning:90,origin:'한반도',desc:'소금절임 채소. 월동 보존식의 원형'},
  {name:'떡',nutrition:80,taste:88,rarity:45,preservation:40,meaning:98,origin:'한반도',desc:'제례와 축제의 필수. 다양한 절기떡'},
  {name:'젓갈',nutrition:65,taste:70,rarity:50,preservation:98,origin:'해안지역',desc:'수산물 발효. 단백질 보충과 염장 기술'},
  {name:'조',nutrition:70,taste:55,rarity:25,preservation:85,meaning:80,origin:'만주',desc:'초기 농경 주곡. 척박한 땅에서도 재배'},
  {name:'포(육포)',nutrition:85,taste:75,rarity:55,preservation:90,meaning:60,origin:'유목지역',desc:'건조 보존육. 군량과 여행식'},
  {name:'술(막걸리)',nutrition:50,taste:82,rarity:40,preservation:70,meaning:92,origin:'한반도',desc:'곡물 발효주. 제천의식과 사교의 핵심'},
  {name:'약과',nutrition:60,taste:92,rarity:70,preservation:65,meaning:85,origin:'한반도',desc:'꿀과 기름의 과자. 상류층 제례용'},
  {name:'구이(적)',nutrition:88,taste:90,rarity:60,preservation:20,meaning:75,origin:'보편',desc:'직화 조리의 기본. 제례 핵심 음식'},
  {name:'죽',nutrition:72,taste:65,rarity:20,preservation:15,meaning:70,origin:'한반도',desc:'곡물 죽. 병자식이자 구황식'}
];

var SUPPLY_DATA=[
  {name:'군량(곡물)',base:100,decay:3,weight:8,critical:90,desc:'전쟁의 기본. 1인 1일 약 3되'},
  {name:'수원(물)',base:80,decay:0,weight:10,critical:95,desc:'수원 확보가 진영 선택의 핵심'},
  {name:'화살/창',base:60,decay:1,weight:6,critical:75,desc:'소모성 무기. 야전 제조 가능'},
  {name:'갑옷/방패',base:40,decay:0.5,weight:9,critical:60,desc:'중장비. 후방 수리 시설 필요'},
  {name:'말 사료',base:70,decay:5,weight:7,critical:70,desc:'기병 운용의 핵심 보급품'},
  {name:'약재',base:30,decay:2,weight:3,critical:85,desc:'부상병 치료. 경량 고가치'},
  {name:'목재/연료',base:50,decay:0,weight:9,critical:55,desc:'축성, 방어시설, 취사용'},
  {name:'금속/철',base:35,decay:0,weight:10,critical:45,desc:'무기 수리와 야전 대장간용'}
];

var HOUSING_DATA=[
  {name:'수혈주거(움집)',durability:40,comfort:25,defense:30,construction:20,status:10,desc:'신석기~초기 철기. 반지하 구덩이'},
  {name:'고상주거',durability:45,comfort:35,defense:20,construction:35,status:25,desc:'습지 지역 기둥식 고상 가옥'},
  {name:'목조가옥',durability:55,comfort:50,defense:25,construction:50,status:40,desc:'철기 이후 일반 서민 주거'},
  {name:'토성 내 가옥',durability:65,comfort:55,defense:70,construction:60,status:50,desc:'방어 취락 내 거주 시설'},
  {name:'귀족 저택',durability:70,comfort:80,defense:45,construction:75,status:85,desc:'귀족층 대형 기와 가옥'},
  {name:'왕궁',durability:90,comfort:95,defense:85,construction:95,status:100,desc:'최고 권력의 상징. 다중 건물'},
  {name:'산성 내 거주',durability:80,comfort:35,defense:95,construction:70,status:55,desc:'군사 방어용 산성 내 시설'},
  {name:'해안 어촌',durability:35,comfort:40,defense:15,construction:30,status:20,desc:'해안가 어업 기반 취락'}
];

var FSTYLE_DATA=[
  {name:'단군',atk:70,def:90,speed:50,intel:95,charisma:98,endurance:75,tactics:85,spirit:100,type:'신성지도자',desc:'천하를 다스리는 신성한 통치력'},
  {name:'환웅',atk:80,def:85,speed:65,intel:90,charisma:95,endurance:80,tactics:80,spirit:95,type:'천상전사',desc:'하늘의 힘으로 전장을 지배'},
  {name:'주몽',atk:95,def:55,speed:90,intel:80,charisma:85,endurance:70,tactics:75,spirit:80,type:'기마궁사',desc:'신궁 사수. 기동력과 정확성'},
  {name:'을지문덕',atk:60,def:70,speed:75,intel:98,charisma:80,endurance:85,tactics:100,speed:70,type:'지략가',desc:'살수대첩. 심리전의 달인'},
  {name:'연개소문',atk:90,def:80,speed:70,intel:75,charisma:70,endurance:90,tactics:85,spirit:65,type:'철권통치',desc:'강력한 군사 통치와 국방'},
  {name:'김유신',atk:85,def:75,speed:65,intel:85,charisma:90,endurance:80,tactics:90,spirit:85,type:'통합전략가',desc:'삼국통일의 핵심 전략가'},
  {name:'광개토대왕',atk:95,def:65,speed:85,intel:80,charisma:92,endurance:85,tactics:80,spirit:90,type:'정복왕',desc:'영토 확장의 전설적 군주'},
  {name:'계백',atk:92,def:90,speed:55,intel:60,charisma:75,endurance:95,tactics:70,spirit:88,type:'결사항전',desc:'황산벌 5천 결사대. 불굴의 의지'},
  {name:'이사부',atk:75,def:60,speed:80,intel:90,charisma:70,endurance:75,tactics:88,spirit:70,type:'해양전략가',desc:'우산국 정복. 창의적 전술'},
  {name:'근초고왕',atk:85,def:70,speed:75,intel:85,charisma:88,endurance:70,tactics:82,spirit:78,type:'해양제왕',desc:'백제 전성기. 해상 무역과 군사'}
];

var METAL_DATA=[
  {name:'청동',hardness:55,rarity:45,workability:70,weapon:65,decoration:90,trade:75,desc:'의기와 무기 겸용. 한반도 비파형동검'},
  {name:'철',hardness:85,rarity:35,workability:60,weapon:95,decoration:30,trade:80,desc:'철기시대 핵심. 농기구와 무기'},
  {name:'금',hardness:15,rarity:95,workability:90,weapon:5,decoration:100,trade:100,desc:'왕관, 장신구. 최고 권위의 상징'},
  {name:'은',hardness:25,rarity:80,workability:85,weapon:10,decoration:90,trade:85,desc:'장신구와 제기. 화폐 대용'},
  {name:'구리',hardness:40,rarity:40,workability:75,weapon:35,decoration:70,trade:60,desc:'청동 원료. 단독 사용도 빈번'},
  {name:'주석',hardness:20,rarity:60,workability:80,weapon:15,decoration:50,trade:55,desc:'청동 합금의 핵심 원소'},
  {name:'납',hardness:10,rarity:30,workability:95,weapon:20,decoration:35,trade:40,desc:'합금재, 도금, 무게추 용도'},
  {name:'운철(유성철)',hardness:95,rarity:100,workability:30,weapon:90,decoration:85,trade:95,desc:'하늘에서 온 철. 신성한 무기 재료'}
];

var STRATEGY_DATA=[
  {name:'고조선',attack:70,defense:85,mobility:60,espionage:50,diplomacy:65,morale:90,desc:'만번한 이남 영토 수호. 방어 중심'},
  {name:'고구려',attack:95,defense:80,mobility:90,espionage:70,diplomacy:60,morale:95,desc:'기마 전법. 공격적 영토 확장'},
  {name:'백제',attack:75,defense:65,mobility:70,espionage:75,diplomacy:90,morale:70,desc:'해상력과 외교. 기동적 전략'},
  {name:'신라',attack:65,defense:75,mobility:55,espionage:85,diplomacy:95,morale:80,desc:'외교 동맹 활용. 점진적 확장'},
  {name:'가야',attack:60,defense:55,mobility:65,espionage:60,diplomacy:70,morale:65,desc:'철 생산력 기반. 연맹 방어'},
  {name:'부여',attack:70,defense:70,mobility:75,espionage:45,diplomacy:55,morale:85,desc:'기마 유목 전통. 기동전 강점'}
];

var GEO_DATA=[
  {name:'평야',military:40,agriculture:95,trade:80,habitation:90,fengshui:70,desc:'곡창지대. 대규모 농업과 인구 부양'},
  {name:'산지',military:90,agriculture:30,trade:25,habitation:40,fengshui:85,desc:'방어 요충. 산성 축조의 최적지'},
  {name:'강변',military:50,agriculture:85,trade:90,habitation:85,fengshui:95,desc:'수운 교통과 농업. 배산임수의 기본'},
  {name:'해안',military:45,agriculture:35,trade:95,habitation:70,fengshui:60,desc:'해상 교역과 어업의 중심지'},
  {name:'분지',military:70,agriculture:75,trade:55,habitation:80,fengshui:90,desc:'자연 방벽. 독립 세력 거점'},
  {name:'고원',military:65,agriculture:45,trade:30,habitation:35,fengshui:50,desc:'목축 적합. 전략적 감시 지점'},
  {name:'습지',military:55,agriculture:60,trade:40,habitation:25,fengshui:30,desc:'수전 방어 이점. 벼농사 적지'},
  {name:'협곡',military:95,agriculture:15,trade:20,habitation:20,fengshui:40,desc:'매복 전술의 최적지. 소수 병력 방어'}
];

var QUIZ_V30=[
  {q:'고대 한반도에서 주식으로 가장 먼저 재배된 곡물은?',a:['쌀','조','보리','밀'],c:1},
  {q:'청동기 시대 한반도 특유의 검 형태는?',a:['세형동검','환두대도','비파형동검','철검'],c:2},
  {q:'고조선의 주요 방어 전략은?',a:['기마 돌격','해상 봉쇄','만번한 라인 방어','산성 농성'],c:2},
  {q:'고대 한국에서 &quot;저(菹)&quot;는 무엇을 뜻하는가?',a:['젓갈','김치류 절임','말린 과일','발효주'],c:1},
  {q:'수혈주거(움집)가 주로 사용된 시대는?',a:['구석기','신석기~초기 철기','통일신라','고려'],c:1},
  {q:'고대 전쟁에서 군량의 1인 1일 소비량은 약?',a:['1되','3되','5되','10되'],c:1},
  {q:'운철(隕鐵)이란 무엇인가?',a:['산에서 캔 철','유성에서 온 철','강에서 건진 철','인공 합금'],c:1},
  {q:'을지문덕의 대표적 전투 스타일은?',a:['정면 돌격','기마 궁술','심리전과 유인책','해상 기습'],c:2},
  {q:'배산임수(背山臨水)의 풍수 의미는?',a:['산 위 거주','산을 등지고 물을 바라봄','강 위 다리집','바다 옆 거주'],c:1},
  {q:'고대 한반도에서 금이 가장 풍부하게 사용된 왕국은?',a:['고조선','고구려','신라','가야'],c:2},
  {q:'가야가 강국으로 성장한 핵심 자원은?',a:['금','옥','철','소금'],c:2},
  {q:'살수대첩에서 을지문덕이 수나라 군을 유인한 방법은?',a:['금은보화 뇌물','거짓 항복과 후퇴','해상 봉쇄','화공'],c:1},
  {q:'고대 한반도의 고상주거가 발달한 이유는?',a:['지진 대비','습기와 해충 방지','바람 피하기','장식 목적'],c:1},
  {q:'계백 장군의 황산벌 전투에서 결사대 수는?',a:['1천','3천','5천','1만'],c:2},
  {q:'고대 제철 기술에서 &quot;풀무&quot;의 역할은?',a:['철 운반','풍력 발전','공기 주입으로 온도 상승','철 냉각'],c:2}
];

var ACHIEVE_V30=[
  {id:'food_scholar',name:'음식문화 학자',desc:'음식문화 백과 10종 모두 열람'},
  {id:'supply_master',name:'병참 관리관',desc:'보급 시뮬레이터에서 8품목 모두 분석'},
  {id:'housing_expert',name:'주거건축 전문가',desc:'고대 주거양식 8종 비교 완료'},
  {id:'battle_dna',name:'전투 분석관',desc:'영웅 10인의 전투 스타일 DNA 확인'},
  {id:'metallurgist',name:'야금술사',desc:'제철야금술 8종 금속 모두 분석'},
  {id:'war_strategist',name:'전략 참모',desc:'6세력 군사전략 비교 완료'},
  {id:'geomancer',name:'풍수지리사',desc:'8지형 풍수분석 모두 열람'},
  {id:'history_sage',name:'역사 현자',desc:'종합 마스터리 A등급 이상 달성'},
  {id:'quiz_v30_master',name:'퀴즈 v30 마스터',desc:'v30 퀴즈 15문 전체 정답'},
  {id:'v30_explorer',name:'v30 탐험가',desc:'v30 전체 8개 기능 모두 열람'},
  {id:'ancient_gourmet',name:'고대 미식가',desc:'음식 맛 점수 85 이상 5종 확인'},
  {id:'iron_age',name:'철기시대 입문',desc:'철 금속 분석 후 경도 85 확인'}
];

// ===== DRAWING FUNCTIONS =====

function drawFood(cv,selIdx){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#0a0814';c.fillRect(0,0,W,H);
  c.fillStyle='#cc9944';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('고대 음식문화 백과',W/2,28);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('10종 고대 음식 6축 Radar 분석',W/2,46);

  var d=FOOD_DATA[selIdx];
  var cx=W/2,cy=200,r=100;
  var axes=['영양','맛','희소','보존','의미','기원적가치'];
  var vals=[d.nutrition,d.taste,d.rarity,d.preservation,d.meaning||50,50+Math.random()*30];
  var n=6;

  for(var ring=1;ring<=4;ring++){
    c.beginPath();
    for(var i=0;i<=n;i++){
      var angle=-Math.PI/2+(2*Math.PI/n)*(i%n);
      var rr=r*ring/4;
      var px=cx+Math.cos(angle)*rr,py=cy+Math.sin(angle)*rr;
      if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
    }
    c.closePath();c.strokeStyle='rgba(204,153,68,.15)';c.lineWidth=1;c.stroke();
  }

  for(var i=0;i<n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*i;
    var ex=cx+Math.cos(angle)*r,ey=cy+Math.sin(angle)*r;
    c.beginPath();c.moveTo(cx,cy);c.lineTo(ex,ey);c.strokeStyle='rgba(204,153,68,.2)';c.stroke();
    var lx=cx+Math.cos(angle)*(r+18),ly=cy+Math.sin(angle)*(r+18);
    c.fillStyle='#aa8844';c.font='10px sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.fillText(axes[i],lx,ly);
  }

  c.beginPath();
  for(var i=0;i<=n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*(i%n);
    var v=vals[i%n]/100;
    var px=cx+Math.cos(angle)*r*v,py=cy+Math.sin(angle)*r*v;
    if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
  }
  c.closePath();c.fillStyle='rgba(204,153,68,.25)';c.fill();
  c.strokeStyle='#cc9944';c.lineWidth=2;c.stroke();

  for(var i=0;i<n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*i;
    var v=vals[i]/100;
    var px=cx+Math.cos(angle)*r*v,py=cy+Math.sin(angle)*r*v;
    c.beginPath();c.arc(px,py,4,0,Math.PI*2);c.fillStyle='#FFD700';c.fill();
  }

  c.fillStyle='#e8dcc8';c.font='bold 14px sans-serif';c.textAlign='center';
  c.fillText(d.name,W/2,340);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText(d.desc,W/2,360);
  var avg=Math.round(vals.reduce(function(a,b){return a+b},0)/n);
  var grade=avg>=80?'S':avg>=65?'A':avg>=50?'B':avg>=35?'C':'D';
  c.fillStyle=grade==='S'?'#FFD700':grade==='A'?'#44cc88':grade==='B'?'#5588cc':'#cc8844';
  c.font='bold 13px sans-serif';
  c.fillText('종합 '+avg+'점 ('+grade+'등급)',W/2,385);
}

function drawSupply(cv,selIdx){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#66aa66';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('전쟁 병참보급 시뮬레이터',W/2,28);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('보급품별 거리에 따른 잔존량 라인차트',W/2,46);

  var chartL=80,chartR=W-40,chartT=70,chartB=H-60;
  var cw=chartR-chartL,ch=chartB-chartT;
  c.strokeStyle='rgba(102,170,102,.3)';c.lineWidth=1;
  c.beginPath();c.moveTo(chartL,chartT);c.lineTo(chartL,chartB);c.lineTo(chartR,chartB);c.stroke();

  var distances=[0,50,100,200,300,500];
  for(var i=0;i<distances.length;i++){
    var x=chartL+cw*i/(distances.length-1);
    c.fillStyle='#6a8a6a';c.font='9px sans-serif';c.textAlign='center';
    c.fillText(distances[i]+'리',x,chartB+16);
    c.beginPath();c.moveTo(x,chartT);c.lineTo(x,chartB);c.strokeStyle='rgba(102,170,102,.1)';c.stroke();
  }

  for(var j=0;j<=4;j++){
    var y=chartB-ch*j/4;
    c.fillStyle='#6a8a6a';c.font='9px sans-serif';c.textAlign='right';
    c.fillText((j*25)+'%',chartL-8,y+3);
    c.beginPath();c.moveTo(chartL,y);c.lineTo(chartR,y);c.strokeStyle='rgba(102,170,102,.08)';c.stroke();
  }

  var colors=['#66aa66','#44cc88','#88cc44','#aaaa44','#cc8844','#cc6644','#8888cc','#cc44aa'];
  SUPPLY_DATA.forEach(function(s,si){
    var isSelected=(si===selIdx);
    c.beginPath();
    c.lineWidth=isSelected?3:1;
    c.strokeStyle=isSelected?colors[si]:'rgba('+parseInt(colors[si].substr(1,2),16)+','+parseInt(colors[si].substr(3,2),16)+','+parseInt(colors[si].substr(5,2),16)+',.3)';
    for(var di=0;di<distances.length;di++){
      var remaining=Math.max(0,s.base-s.decay*distances[di]/10-s.weight*distances[di]/100);
      remaining=Math.min(100,remaining);
      var x=chartL+cw*di/(distances.length-1);
      var y=chartB-ch*remaining/100;
      if(di===0)c.moveTo(x,y);else c.lineTo(x,y);
    }
    c.stroke();
    if(isSelected){
      var lastR=Math.max(0,s.base-s.decay*500/10-s.weight*500/100);
      c.fillStyle=colors[si];c.font='9px sans-serif';c.textAlign='left';
      c.fillText(s.name,chartR+4,chartB-ch*Math.min(100,lastR)/100+3);
    }
  });

  var sel=SUPPLY_DATA[selIdx];
  c.fillStyle='#e8dcc8';c.font='bold 12px sans-serif';c.textAlign='center';
  c.fillText(sel.name+' — 기본'+sel.base+'% | 소모율:'+sel.decay+'/10리 | 중량:'+sel.weight,W/2,H-20);
  c.font='10px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText(sel.desc,W/2,H-6);
}

function drawHousing(cv,selIdx){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#8888cc';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('고대 주거양식 비교도',W/2,28);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('8종 주거 5축 Radar (내구/쾌적/방어/건축/사회적위치)',W/2,46);

  var d=HOUSING_DATA[selIdx];
  var cx=W/2,cy=195,r=100;
  var axes=['내구성','쾌적성','방어력','건축 난이도','사회적 지위'];
  var vals=[d.durability,d.comfort,d.defense,d.construction,d.status];
  var n=5;

  for(var ring=1;ring<=4;ring++){
    c.beginPath();
    for(var i=0;i<=n;i++){
      var angle=-Math.PI/2+(2*Math.PI/n)*(i%n);
      var rr=r*ring/4;
      var px=cx+Math.cos(angle)*rr,py=cy+Math.sin(angle)*rr;
      if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
    }
    c.closePath();c.strokeStyle='rgba(136,136,204,.15)';c.lineWidth=1;c.stroke();
  }

  for(var i=0;i<n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*i;
    var ex=cx+Math.cos(angle)*r,ey=cy+Math.sin(angle)*r;
    c.beginPath();c.moveTo(cx,cy);c.lineTo(ex,ey);c.strokeStyle='rgba(136,136,204,.2)';c.stroke();
    var lx=cx+Math.cos(angle)*(r+22),ly=cy+Math.sin(angle)*(r+22);
    c.fillStyle='#8888cc';c.font='10px sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.fillText(axes[i],lx,ly);
  }

  c.beginPath();
  for(var i=0;i<=n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*(i%n);
    var v=vals[i%n]/100;
    var px=cx+Math.cos(angle)*r*v,py=cy+Math.sin(angle)*r*v;
    if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
  }
  c.closePath();c.fillStyle='rgba(136,136,204,.25)';c.fill();
  c.strokeStyle='#8888cc';c.lineWidth=2;c.stroke();

  for(var i=0;i<n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*i;
    var v=vals[i]/100;
    var px=cx+Math.cos(angle)*r*v,py=cy+Math.sin(angle)*r*v;
    c.beginPath();c.arc(px,py,4,0,Math.PI*2);c.fillStyle='#FFD700';c.fill();
  }

  c.fillStyle='#e8dcc8';c.font='bold 14px sans-serif';c.textAlign='center';
  c.fillText(d.name,W/2,335);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText(d.desc,W/2,355);
  var avg=Math.round(vals.reduce(function(a,b){return a+b},0)/n);
  var grade=avg>=75?'S':avg>=60?'A':avg>=45?'B':avg>=30?'C':'D';
  c.fillStyle=grade==='S'?'#FFD700':grade==='A'?'#44cc88':grade==='B'?'#5588cc':'#cc8844';
  c.font='bold 13px sans-serif';
  c.fillText('종합 '+avg+'점 ('+grade+'등급)',W/2,380);
}

function drawFightStyle(cv,selIdx){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#cc5588';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('영웅 전투스타일 DNA',W/2,28);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('10영웅 8축 분석 + 유형 분류',W/2,46);

  var d=FSTYLE_DATA[selIdx];
  var cx=W/2,cy=200,r=105;
  var axes=['공격','방어','속도','지능','카리스마','지구력','전술','정신력'];
  var vals=[d.atk,d.def,d.speed,d.intel,d.charisma,d.endurance,d.tactics,d.spirit];
  var n=8;

  for(var ring=1;ring<=4;ring++){
    c.beginPath();
    for(var i=0;i<=n;i++){
      var angle=-Math.PI/2+(2*Math.PI/n)*(i%n);
      var rr=r*ring/4;
      var px=cx+Math.cos(angle)*rr,py=cy+Math.sin(angle)*rr;
      if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
    }
    c.closePath();c.strokeStyle='rgba(204,85,136,.15)';c.lineWidth=1;c.stroke();
  }

  for(var i=0;i<n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*i;
    var ex=cx+Math.cos(angle)*r,ey=cy+Math.sin(angle)*r;
    c.beginPath();c.moveTo(cx,cy);c.lineTo(ex,ey);c.strokeStyle='rgba(204,85,136,.2)';c.stroke();
    var lx=cx+Math.cos(angle)*(r+20),ly=cy+Math.sin(angle)*(r+20);
    c.fillStyle='#cc5588';c.font='10px sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.fillText(axes[i],lx,ly);
  }

  c.beginPath();
  for(var i=0;i<=n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*(i%n);
    var v=vals[i%n]/100;
    var px=cx+Math.cos(angle)*r*v,py=cy+Math.sin(angle)*r*v;
    if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
  }
  c.closePath();c.fillStyle='rgba(204,85,136,.2)';c.fill();
  c.strokeStyle='#cc5588';c.lineWidth=2;c.stroke();

  for(var i=0;i<n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*i;
    var v=vals[i]/100;
    var px=cx+Math.cos(angle)*r*v,py=cy+Math.sin(angle)*r*v;
    c.beginPath();c.arc(px,py,4,0,Math.PI*2);c.fillStyle='#FFD700';c.fill();
  }

  c.fillStyle='#e8dcc8';c.font='bold 14px sans-serif';c.textAlign='center';
  c.fillText(d.name+' — '+d.type,W/2,345);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText(d.desc,W/2,365);
  var avg=Math.round(vals.reduce(function(a,b){return a+b},0)/n);
  c.fillStyle='#FFD700';c.font='bold 12px sans-serif';
  c.fillText('전투력 지수: '+avg,W/2,388);
}

function drawMetal(cv,selIdx){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#aaaa55';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('고대 제철야금술',W/2,28);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('8종 금속 6축 Bar 분석',W/2,46);

  var d=METAL_DATA[selIdx];
  var axes=['경도','희소성','가공성','무기적합','장식성','교역가치'];
  var vals=[d.hardness,d.rarity,d.workability,d.weapon,d.decoration,d.trade];
  var barY=70,barH=22,gap=8;
  var barL=120,barMaxW=W-barL-60;
  var colors=['#cc8844','#aaaa55','#FFD700','#cccccc','#cc55aa','#55aa88'];

  for(var i=0;i<axes.length;i++){
    var y=barY+i*(barH+gap);
    c.fillStyle='#8a8a6a';c.font='10px sans-serif';c.textAlign='right';
    c.fillText(axes[i],barL-10,y+barH/2+3);
    c.fillStyle='rgba(170,170,85,.1)';c.fillRect(barL,y,barMaxW,barH);
    var bw=barMaxW*vals[i]/100;
    var grd=c.createLinearGradient(barL,y,barL+bw,y);
    grd.addColorStop(0,colors[i]);grd.addColorStop(1,'rgba('+parseInt(colors[i].substr(1,2),16)+','+parseInt(colors[i].substr(3,2),16)+','+parseInt(colors[i].substr(5,2),16)+',.5)');
    c.fillStyle=grd;c.fillRect(barL,y,bw,barH);
    c.strokeStyle=colors[i];c.lineWidth=1;c.strokeRect(barL,y,bw,barH);
    c.fillStyle='#e8dcc8';c.font='bold 10px sans-serif';c.textAlign='left';
    c.fillText(vals[i],barL+bw+6,y+barH/2+3);
  }

  c.fillStyle='#e8dcc8';c.font='bold 14px sans-serif';c.textAlign='center';
  c.fillText(d.name,W/2,310);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText(d.desc,W/2,330);
  var avg=Math.round(vals.reduce(function(a,b){return a+b},0)/vals.length);
  var grade=avg>=70?'S':avg>=55?'A':avg>=40?'B':avg>=25?'C':'D';
  c.fillStyle=grade==='S'?'#FFD700':grade==='A'?'#44cc88':'#5588cc';
  c.font='bold 13px sans-serif';
  c.fillText('종합 가치: '+avg+' ('+grade+'등급)',W/2,355);
}

function drawStrategy(cv,selIdx){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#5588cc';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('세력별 군사전략 비교',W/2,28);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('6세력 6축 Radar (공격/방어/기동/첩보/외교/사기)',W/2,46);

  var colors=['#cc8844','#cc4444','#4488cc','#44cc88','#ccaa44','#aa88cc'];
  var cx=W/2,cy=210,r=110;
  var axes=['공격력','방어력','기동력','첩보력','외교력','사기'];
  var n=6;

  for(var ring=1;ring<=4;ring++){
    c.beginPath();
    for(var i=0;i<=n;i++){
      var angle=-Math.PI/2+(2*Math.PI/n)*(i%n);
      var rr=r*ring/4;
      var px=cx+Math.cos(angle)*rr,py=cy+Math.sin(angle)*rr;
      if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
    }
    c.closePath();c.strokeStyle='rgba(85,136,204,.12)';c.lineWidth=1;c.stroke();
  }

  for(var i=0;i<n;i++){
    var angle=-Math.PI/2+(2*Math.PI/n)*i;
    var ex=cx+Math.cos(angle)*r,ey=cy+Math.sin(angle)*r;
    c.beginPath();c.moveTo(cx,cy);c.lineTo(ex,ey);c.strokeStyle='rgba(85,136,204,.2)';c.stroke();
    var lx=cx+Math.cos(angle)*(r+22),ly=cy+Math.sin(angle)*(r+22);
    c.fillStyle='#5588cc';c.font='10px sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.fillText(axes[i],lx,ly);
  }

  STRATEGY_DATA.forEach(function(s,si){
    var vals=[s.attack,s.defense,s.mobility,s.espionage,s.diplomacy,s.morale];
    var isSelected=(si===selIdx);
    c.beginPath();
    for(var i=0;i<=n;i++){
      var angle=-Math.PI/2+(2*Math.PI/n)*(i%n);
      var v=vals[i%n]/100;
      var px=cx+Math.cos(angle)*r*v,py=cy+Math.sin(angle)*r*v;
      if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
    }
    c.closePath();
    if(isSelected){
      c.fillStyle='rgba('+parseInt(colors[si].substr(1,2),16)+','+parseInt(colors[si].substr(3,2),16)+','+parseInt(colors[si].substr(5,2),16)+',.2)';
      c.fill();
      c.strokeStyle=colors[si];c.lineWidth=2.5;
    }else{
      c.strokeStyle='rgba('+parseInt(colors[si].substr(1,2),16)+','+parseInt(colors[si].substr(3,2),16)+','+parseInt(colors[si].substr(5,2),16)+',.25)';
      c.lineWidth=1;
    }
    c.stroke();
  });

  var sel=STRATEGY_DATA[selIdx];
  c.fillStyle='#e8dcc8';c.font='bold 14px sans-serif';c.textAlign='center';
  c.fillText(sel.name,W/2,365);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText(sel.desc,W/2,385);
}

function drawGeo(cv,selIdx){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#88aa44';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('고대 지리풍수 분석기',W/2,28);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('8지형 5축 Bar (군사/농업/교역/거주/풍수)',W/2,46);

  var d=GEO_DATA[selIdx];
  var axes=['군사','농업','교역','거주','풍수'];
  var vals=[d.military,d.agriculture,d.trade,d.habitation,d.fengshui];
  var barY=70,barH=28,gap=12;
  var barL=90,barMaxW=W-barL-60;
  var colors=['#cc4444','#44cc44','#4488cc','#ccaa44','#aa44cc'];

  for(var i=0;i<axes.length;i++){
    var y=barY+i*(barH+gap);
    c.fillStyle='#8a8a6a';c.font='11px sans-serif';c.textAlign='right';
    c.fillText(axes[i],barL-10,y+barH/2+4);
    c.fillStyle='rgba(136,170,68,.08)';c.fillRect(barL,y,barMaxW,barH);
    var bw=barMaxW*vals[i]/100;
    var grd=c.createLinearGradient(barL,y,barL+bw,y);
    grd.addColorStop(0,colors[i]);grd.addColorStop(1,'rgba('+parseInt(colors[i].substr(1,2),16)+','+parseInt(colors[i].substr(3,2),16)+','+parseInt(colors[i].substr(5,2),16)+',.4)');
    c.fillStyle=grd;c.fillRect(barL,y,bw,barH);
    c.strokeStyle=colors[i];c.lineWidth=1;c.strokeRect(barL,y,bw,barH);
    c.fillStyle='#e8dcc8';c.font='bold 11px sans-serif';c.textAlign='left';
    c.fillText(vals[i],barL+bw+8,y+barH/2+4);
  }

  c.fillStyle='#e8dcc8';c.font='bold 14px sans-serif';c.textAlign='center';
  c.fillText(d.name+' 지형',W/2,320);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText(d.desc,W/2,340);
  var avg=Math.round(vals.reduce(function(a,b){return a+b},0)/vals.length);
  var grade=avg>=75?'S':avg>=60?'A':avg>=45?'B':avg>=30?'C':'D';
  c.fillStyle=grade==='S'?'#FFD700':grade==='A'?'#44cc88':'#5588cc';
  c.font='bold 13px sans-serif';
  c.fillText('종합 적합도: '+avg+' ('+grade+'등급)',W/2,365);
}

function drawMastery(cv){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#aa88cc';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('종합 역사지식 마스터리',W/2,28);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText('8분야 반원게이지 + 종합등급',W/2,46);

  var fields=['음식문화','병참전략','주거건축','전투전술','야금기술','군사전략','지리풍수','역사퀴즈'];
  var scores=[72,68,65,78,60,75,70,80];
  var colors=['#cc9944','#66aa66','#8888cc','#cc5588','#aaaa55','#5588cc','#88aa44','#aa88cc'];

  var cols=4,rows=2;
  var gw=(W-60)/cols,gh=140;
  var startX=30,startY=65;

  for(var i=0;i<fields.length;i++){
    var col=i%cols,row=Math.floor(i/cols);
    var cx=startX+col*gw+gw/2;
    var cy=startY+row*gh+gh/2+10;
    var gr=gw/2-12;

    c.beginPath();c.arc(cx,cy,gr,Math.PI,0);
    c.strokeStyle='rgba(170,136,204,.2)';c.lineWidth=8;c.stroke();

    var pct=scores[i]/100;
    c.beginPath();c.arc(cx,cy,gr,Math.PI,Math.PI+Math.PI*pct);
    c.strokeStyle=colors[i];c.lineWidth=8;
    c.lineCap='round';c.stroke();c.lineCap='butt';

    c.fillStyle=colors[i];c.font='bold 16px sans-serif';c.textAlign='center';
    c.fillText(scores[i],cx,cy+2);

    c.fillStyle='#e8dcc8';c.font='10px sans-serif';
    c.fillText(fields[i],cx,cy+20);

    var grade=scores[i]>=80?'S':scores[i]>=65?'A':scores[i]>=50?'B':'C';
    c.fillStyle=grade==='S'?'#FFD700':grade==='A'?'#44cc88':'#5588cc';
    c.font='bold 9px sans-serif';
    c.fillText(grade+'등급',cx,cy+34);
  }

  var total=Math.round(scores.reduce(function(a,b){return a+b},0)/scores.length);
  var tgrade=total>=80?'S':total>=65?'A':total>=50?'B':total>=35?'C':'D';
  c.fillStyle='#FFD700';c.font='bold 18px sans-serif';c.textAlign='center';
  c.fillText('종합 마스터리: '+total+'점 ('+tgrade+'등급)',W/2,H-20);
}

// ===== PANEL BUILDERS =====

function buildFoodPanel(wrap){
  wrap.className='food-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  var sel=0;drawFood(cv,sel);
  var tabs=document.createElement('div');tabs.className='food-tabs';
  FOOD_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='food-btn'+(i===0?' active':'');
    btn.textContent=d.name;
    btn.onclick=function(){
      sel=i;drawFood(cv,sel);sfxFood();
      tabs.querySelectorAll('.food-btn').forEach(function(b,bi){b.className='food-btn'+(bi===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildSupplyPanel(wrap){
  wrap.className='supply-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  var sel=0;drawSupply(cv,sel);
  var tabs=document.createElement('div');tabs.className='supply-tabs';
  SUPPLY_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='supply-btn'+(i===0?' active':'');
    btn.textContent=d.name;
    btn.onclick=function(){
      sel=i;drawSupply(cv,sel);sfxSupply();
      tabs.querySelectorAll('.supply-btn').forEach(function(b,bi){b.className='supply-btn'+(bi===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildHousingPanel(wrap){
  wrap.className='housing-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  var sel=0;drawHousing(cv,sel);
  var tabs=document.createElement('div');tabs.className='housing-tabs';
  HOUSING_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='housing-btn'+(i===0?' active':'');
    btn.textContent=d.name;
    btn.onclick=function(){
      sel=i;drawHousing(cv,sel);sfxHousing();
      tabs.querySelectorAll('.housing-btn').forEach(function(b,bi){b.className='housing-btn'+(bi===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildFightStylePanel(wrap){
  wrap.className='fstyle-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  var sel=0;drawFightStyle(cv,sel);
  var tabs=document.createElement('div');tabs.className='fstyle-tabs';
  FSTYLE_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='fstyle-btn'+(i===0?' active':'');
    btn.textContent=d.name;
    btn.onclick=function(){
      sel=i;drawFightStyle(cv,sel);sfxStyle();
      tabs.querySelectorAll('.fstyle-btn').forEach(function(b,bi){b.className='fstyle-btn'+(bi===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildMetalPanel(wrap){
  wrap.className='metal-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  var sel=0;drawMetal(cv,sel);
  var tabs=document.createElement('div');tabs.className='metal-tabs';
  METAL_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='metal-btn'+(i===0?' active':'');
    btn.textContent=d.name;
    btn.onclick=function(){
      sel=i;drawMetal(cv,sel);sfxMetal();
      tabs.querySelectorAll('.metal-btn').forEach(function(b,bi){b.className='metal-btn'+(bi===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildStrategyPanel(wrap){
  wrap.className='mstrategy-wrap';
  var cv=document.createElement('canvas');cv.width=640;cv.height=400;wrap.appendChild(cv);
  var sel=0;drawStrategy(cv,sel);
  var tabs=document.createElement('div');tabs.className='mstrategy-tabs';
  STRATEGY_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='mstrategy-btn'+(i===0?' active':'');
    btn.textContent=d.name;
    btn.onclick=function(){
      sel=i;drawStrategy(cv,sel);sfxStrategy();
      tabs.querySelectorAll('.mstrategy-btn').forEach(function(b,bi){b.className='mstrategy-btn'+(bi===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildGeoPanel(wrap){
  wrap.className='geo-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  var sel=0;drawGeo(cv,sel);
  var tabs=document.createElement('div');tabs.className='geo-tabs';
  GEO_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='geo-btn'+(i===0?' active':'');
    btn.textContent=d.name;
    btn.onclick=function(){
      sel=i;drawGeo(cv,sel);sfxGeo();
      tabs.querySelectorAll('.geo-btn').forEach(function(b,bi){b.className='geo-btn'+(bi===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildMasteryPanel(wrap){
  wrap.className='mastery-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  drawMastery(cv);
  var info=document.createElement('div');info.className='mastery-info';info.textContent='각 분야의 마스터리 점수를 높여 종합 등급을 올리세요';
  wrap.appendChild(info);
}

function buildQuiz30(wrap){
  var idx=0,score=0;
  var qDiv=document.createElement('div');qDiv.style.cssText='max-width:580px;margin:0 auto;text-align:center';
  wrap.appendChild(qDiv);
  function showQ(){
    if(idx>=QUIZ_V30.length){
      var grade=score>=14?'S':score>=12?'A':score>=10?'B':score>=7?'C':'D';
      qDiv.innerHTML='<h3 style="color:#FFD700;font-size:20px;margin:20px 0">퀴즈 v30 완료!</h3>'+
        '<p style="color:#cc8844;font-size:16px">'+score+'/'+QUIZ_V30.length+' 정답 ('+grade+'등급)</p>'+
        '<button onclick="this.parentElement.parentElement.querySelector(\'button.v30-close\')&&this.parentElement.parentElement.querySelector(\'button.v30-close\').click()" style="margin-top:16px;padding:10px 24px;border:1px solid #5a3a1a;border-radius:6px;background:#6B1A0A;color:#e8dcc8;font-size:13px;cursor:pointer;font-family:inherit">닫기</button>';
      if(score>=14)sfxComplete30();
      return;
    }
    var q=QUIZ_V30[idx];
    var html='<p style="color:#e8dcc8;font-size:14px;margin:16px 0">'+(idx+1)+'/'+QUIZ_V30.length+'. '+q.q+'</p>';
    q.a.forEach(function(a,ai){
      html+='<button class="quiz30-opt" data-i="'+ai+'" style="display:block;width:100%;max-width:400px;margin:8px auto;padding:10px;border:1px solid #3a3a4a;border-radius:8px;background:rgba(20,16,30,.9);color:#e8dcc8;font-size:12px;cursor:pointer;font-family:inherit;transition:all .2s">'+a+'</button>';
    });
    qDiv.innerHTML=html;
    qDiv.querySelectorAll('.quiz30-opt').forEach(function(btn){
      btn.onclick=function(){
        var sel=parseInt(btn.dataset.i);
        if(sel===q.c){score++;sfxQuiz30();toast('정답! ✅','#44cc88');btn.style.borderColor='#44cc88';btn.style.background='rgba(68,204,136,.2)'}
        else{sfxQuizWrong30();toast('오답! ❌ 정답: '+q.a[q.c],'#cc4444');btn.style.borderColor='#cc4444';btn.style.background='rgba(204,68,68,.2)'}
        setTimeout(function(){idx++;showQ()},1200);
      };
    });
  }
  showQ();
}

// ===== BUILD PANELS =====

function buildPanels(){
  var panels=[
    {id:'v30-food',title:'고대 음식문화 백과',sub:'10종 고대 음식 6축 Radar 분석',builder:buildFoodPanel},
    {id:'v30-supply',title:'전쟁 병참보급 시뮬레이터',sub:'8종 보급품 거리별 잔존량 라인차트',builder:buildSupplyPanel},
    {id:'v30-housing',title:'고대 주거양식 비교도',sub:'8종 주거 5축 Radar 분석',builder:buildHousingPanel},
    {id:'v30-fstyle',title:'영웅 전투스타일 DNA',sub:'10영웅 8축 분석 + 유형 분류',builder:buildFightStylePanel},
    {id:'v30-metal',title:'고대 제철야금술',sub:'8종 금속 6축 Bar 분석',builder:buildMetalPanel},
    {id:'v30-strategy',title:'세력별 군사전략 비교',sub:'6세력 6축 Radar 오버레이',builder:buildStrategyPanel},
    {id:'v30-geo',title:'고대 지리풍수 분석기',sub:'8지형 5축 Bar 분석',builder:buildGeoPanel},
    {id:'v30-mastery',title:'종합 역사지식 마스터리',sub:'8분야 반원게이지 + 종합등급',builder:buildMasteryPanel},
    {id:'v30-quiz30',title:'역사 퀴즈 v30',sub:'15문항 — 고대 생활문화 & 전략',builder:buildQuiz30}
  ];

  panels.forEach(function(p){
    var panel=document.createElement('div');panel.id=p.id;panel.className='v30-panel';
    var h2=document.createElement('h2');h2.textContent=p.title;panel.appendChild(h2);
    var sub=document.createElement('p');sub.className='v30-sub';sub.textContent=p.sub;panel.appendChild(sub);
    var wrap=document.createElement('div');panel.appendChild(wrap);
    p.builder(wrap);
    var closeBtn=document.createElement('button');closeBtn.className='v30-close';closeBtn.textContent='닫기';
    closeBtn.onclick=function(){panel.classList.remove('on');sfxClose30()};
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
    var bttns=document.querySelectorAll('button[onclick*="v29"],button[onclick*="v28"],button[onclick*="v27"]');
    if(bttns.length>0)navBar=bttns[0].parentElement;
  }
  if(navBar){
    var btns=[
      {id:'v30-food',label:'🍚음식',color:'#cc9944'},
      {id:'v30-supply',label:'⚔️병참',color:'#66aa66'},
      {id:'v30-housing',label:'🏠주거',color:'#8888cc'},
      {id:'v30-fstyle',label:'🗡️전투DNA',color:'#cc5588'},
      {id:'v30-metal',label:'⚒️야금',color:'#aaaa55'},
      {id:'v30-strategy',label:'🏴전략',color:'#5588cc'},
      {id:'v30-geo',label:'🌏풍수',color:'#88aa44'},
      {id:'v30-mastery',label:'📊마스터리',color:'#aa88cc'},
      {id:'v30-quiz30',label:'❓퀴즈v30',color:'#cc8844'}
    ];
    btns.forEach(function(b){
      var btn=document.createElement('button');
      btn.style.cssText='padding:4px 6px;border:1px solid '+b.color+';border-radius:4px;background:rgba(10,6,8,.8);color:'+b.color+';font-size:9px;cursor:pointer;font-family:inherit;margin:2px;white-space:nowrap';
      btn.textContent=b.label;
      btn.onclick=function(){
        var p=document.getElementById(b.id);
        if(p){p.classList.add('on');sfxNav30()}
      };
      navBar.appendChild(btn);
    });
  }
}

// --- Keyboard shortcuts ---
document.addEventListener('keydown',function(e){
  if(!e.shiftKey)return;
  var panels={
    'KeyA':'v30-food','KeyS':'v30-supply','KeyD':'v30-housing','KeyF':'v30-fstyle',
    'KeyG':'v30-metal','KeyH':'v30-strategy','KeyJ':'v30-geo','KeyK':'v30-mastery','Digit0':'v30-quiz30'
  };
  var id=panels[e.code];
  if(id){
    e.preventDefault();
    var p=document.getElementById(id);
    if(p){
      if(p.classList.contains('on')){p.classList.remove('on');sfxClose30()}
      else{p.classList.add('on');sfxNav30()}
    }
  }
});

// --- URL param support ---
function checkUrlParams(){
  var params=new URLSearchParams(window.location.search);
  var openMap={
    'foodCulture':'v30-food','supplyLine':'v30-supply','housingStyle':'v30-housing',
    'fightDNA':'v30-fstyle','metallurgy':'v30-metal','militaryStrategy':'v30-strategy',
    'geoFengshui':'v30-geo','mastery':'v30-mastery','quizv30':'v30-quiz30'
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
