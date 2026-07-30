// v29_patch.js — 한국사 영웅전 v29.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v29-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:149;overflow-y:auto;padding:16px}',
'.v29-panel.on{display:block}',
'.v29-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v29-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v29-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v29-close:hover{background:#8B2A1A}',
'.v29-toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);padding:8px 20px;border-radius:20px;font-size:11px;font-weight:700;z-index:999;pointer-events:none;animation:v29fade 2s ease forwards}',
'@keyframes v29fade{0%{opacity:0;transform:translate(-50%,-10px)}10%{opacity:1;transform:translate(-50%,0)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-10px)}}',

'.costume-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.costume-wrap canvas{border:2px solid #3a2a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.costume-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.costume-btn{padding:5px 12px;border:1px solid #3a2a3a;border-radius:6px;background:#140a14;color:#bb66aa;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.costume-btn:hover{border-color:#bb66aa}',
'.costume-btn.active{border-color:#FFD700;color:#FFD700}',

'.quote-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.quote-wrap canvas{border:2px solid #2a3a2a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.quote-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:6px;max-width:620px;margin:8px auto}',
'.qt-card{background:linear-gradient(135deg,rgba(14,18,10,.95),rgba(8,12,6,.98));border:2px solid #2a3a2a;border-radius:8px;padding:8px;text-align:center;cursor:pointer;transition:all .3s}',
'.qt-card:hover{border-color:#66aa44;transform:translateY(-2px)}',
'.qt-card .qt-name{font-size:10px;color:#66aa44;font-weight:700}',

'.relation-wrap{max-width:640px;margin:0 auto;text-align:center}',
'.relation-wrap canvas{border:2px solid #2a2a4a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.rel-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.rel-btn{padding:5px 12px;border:1px solid #2a2a4a;border-radius:6px;background:#0a0a2a;color:#7788cc;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.rel-btn:hover{border-color:#7788cc}',
'.rel-btn.active{border-color:#FFD700;color:#FFD700}',

'.goods-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.goods-wrap canvas{border:2px solid #3a3a1a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.goods-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.goods-btn{padding:5px 12px;border:1px solid #3a3a1a;border-radius:6px;background:#141208;color:#aa9944;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.goods-btn:hover{border-color:#aa9944}',

'.choke-wrap{max-width:640px;margin:0 auto;text-align:center}',
'.choke-wrap canvas{border:2px solid #3a1a2a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.choke-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.choke-btn{padding:5px 12px;border:1px solid #3a1a2a;border-radius:6px;background:#140a10;color:#cc5566;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.choke-btn:hover{border-color:#cc5566}',
'.choke-btn.active{border-color:#FFD700;color:#FFD700}',

'.growth-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.growth-wrap canvas{border:2px solid #1a3a3a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.growth-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.growth-btn{padding:5px 12px;border:1px solid #1a3a3a;border-radius:6px;background:#0a1414;color:#44aaaa;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.growth-btn:hover{border-color:#44aaaa}',
'.growth-btn.active{border-color:#FFD700;color:#FFD700}',

'.penalty-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.penalty-wrap canvas{border:2px solid #3a2a1a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.penalty-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.penalty-btn{padding:5px 12px;border:1px solid #3a2a1a;border-radius:6px;background:#140e08;color:#cc8844;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.penalty-btn:hover{border-color:#cc8844}',
'.penalty-btn.active{border-color:#FFD700;color:#FFD700}',

'.lineage-wrap{max-width:640px;margin:0 auto;text-align:center}',
'.lineage-wrap canvas{border:2px solid #3a1a3a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.lineage-info{font-size:11px;color:#9a6a9a;margin:8px 0;min-height:32px}'
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
function sfxCostume(){sfx(587,.25,'triangle',.1);setTimeout(function(){sfx(740,.2,'triangle',.08)},80)}
function sfxQuote(){sfx(440,.3,'sine',.1);setTimeout(function(){sfx(554,.25,'sine',.08)},100)}
function sfxRelation(){sfx(392,.25,'triangle',.09);setTimeout(function(){sfx(494,.2,'triangle',.07)},70)}
function sfxGoods(){sfx(523,.2,'sine',.08);setTimeout(function(){sfx(659,.15,'sine',.06)},60)}
function sfxChoke(){sfx(330,.3,'sawtooth',.06);setTimeout(function(){sfx(415,.25,'sawtooth',.05)},80)}
function sfxGrowth(){sfx(466,.25,'triangle',.1);setTimeout(function(){sfx(587,.2,'triangle',.08)},80)}
function sfxPenalty(){sfx(294,.3,'square',.06);setTimeout(function(){sfx(370,.25,'square',.05)},80)}
function sfxLineage(){sfx(523,.2,'triangle',.1);setTimeout(function(){sfx(659,.15,'triangle',.08)},60);setTimeout(function(){sfx(784,.15,'triangle',.08)},120)}
function sfxQuiz29(){sfx(698,.2,'triangle',.12);setTimeout(function(){sfx(880,.15,'triangle',.1)},60)}
function sfxQuizWrong29(){sfx(233,.3,'sawtooth',.08)}
function sfxAchieve29(){sfx(523,.15,'triangle',.12);setTimeout(function(){sfx(659,.15,'triangle',.1)},80);setTimeout(function(){sfx(784,.15,'triangle',.1)},160);setTimeout(function(){sfx(1047,.25,'triangle',.12)},240)}
function sfxNav29(){sfx(440,.1,'sine',.06)}
function sfxOpen29(){sfx(523,.15,'triangle',.08);setTimeout(function(){sfx(659,.1,'triangle',.06)},50)}
function sfxClose29(){sfx(330,.15,'sine',.06)}
function sfxHover29(){sfx(880,.05,'sine',.03)}
function sfxClick29(){sfx(660,.08,'triangle',.05)}
function sfxComplete29(){sfx(784,.2,'triangle',.1);setTimeout(function(){sfx(988,.15,'triangle',.08)},100)}
function sfxSelect29(){sfx(523,.1,'sine',.06)}

function toast(msg,color){
  var t=document.createElement('div');t.className='v29-toast';
  t.style.background=color||'#c4956a';t.style.color='#fff';t.textContent=msg;
  document.body.appendChild(t);setTimeout(function(){t.remove()},2200);
}

// --- 1. 고대 복식 도감 Canvas 620x400 (10종 6축 Radar) ---
var COSTUME_DATA=[
  {name:'왕족 곤룡포',icon:'👑',axes:[95,90,60,95,80,70],desc:'용 문양 수놓은 왕의 예복, 최고 위엄'},
  {name:'무관 갑주',icon:'⚔️',axes:[70,50,95,80,90,85],desc:'전투용 철갑 복장, 실전 방어력 최상'},
  {name:'문관 관복',icon:'📜',axes:[85,80,40,90,50,60],desc:'문관의 공식 관복, 학문적 권위 상징'},
  {name:'농민 직의',icon:'🌾',axes:[30,70,60,20,95,90],desc:'삼베/무명 농사복, 실용성 최고'},
  {name:'무녀 무복',icon:'🔮',axes:[75,95,45,70,40,65],desc:'제사/굿 의식복, 영적 권위 상징'},
  {name:'상인 행상복',icon:'🛒',axes:[50,60,70,55,85,80],desc:'교역 활동에 적합한 이동복'},
  {name:'여왕 적의',icon:'💑',axes:[90,85,35,95,45,55],desc:'왕비/여왕 대례복, 최고 장식'},
  {name:'기마 전사복',icon:'🏇',axes:[60,40,90,65,80,95],desc:'기마전 특화 경갑, 기동성 최상'},
  {name:'승려 법복',icon:'☸️',axes:[65,90,30,60,70,50],desc:'불교/도교 수행복, 영성 상징'},
  {name:'첩보 야행복',icon:'🥷',axes:[40,55,85,35,75,90],desc:'야간 정탐용 은밀복, 위장 특화'}
];
var COSTUME_AXES=['위엄','영성','방어력','장식','실용성','기동성'];
var costumeSel=0;

function drawCostume(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#bb66aa';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('고대 복식 도감',W/2,28);
  c.font='11px sans-serif';c.fillStyle='#9a6a8a';
  c.fillText(COSTUME_DATA[costumeSel].icon+' '+COSTUME_DATA[costumeSel].name+' - '+COSTUME_DATA[costumeSel].desc,W/2,48);
  var cx=W/2,cy=210,R=120;
  for(var ring=5;ring>=1;ring--){
    c.beginPath();
    for(var i=0;i<6;i++){
      var a=-Math.PI/2+i*Math.PI/3,r=R*ring/5;
      if(i===0)c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
      else c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
    }
    c.closePath();c.strokeStyle='rgba(120,60,100,.2)';c.stroke();
  }
  for(var i=0;i<6;i++){
    var a=-Math.PI/2+i*Math.PI/3;
    c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));
    c.strokeStyle='rgba(120,60,100,.15)';c.stroke();
    var lx=cx+(R+18)*Math.cos(a),ly=cy+(R+18)*Math.sin(a);
    c.fillStyle='#9a6a8a';c.font='9px sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.fillText(COSTUME_AXES[i],lx,ly);
  }
  c.beginPath();
  var d=COSTUME_DATA[costumeSel].axes;
  for(var i=0;i<6;i++){
    var a=-Math.PI/2+i*Math.PI/3,r=R*d[i]/100;
    if(i===0)c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
    else c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
  }
  c.closePath();c.fillStyle='rgba(187,102,170,.25)';c.fill();
  c.strokeStyle='#bb66aa';c.lineWidth=2;c.stroke();
  for(var i=0;i<6;i++){
    var a=-Math.PI/2+i*Math.PI/3,r=R*d[i]/100;
    c.beginPath();c.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),4,0,Math.PI*2);
    c.fillStyle='#FFD700';c.fill();
  }
  var avg=0;for(var i=0;i<6;i++)avg+=d[i];avg=Math.round(avg/6);
  var grade=avg>=80?'S':avg>=70?'A':avg>=60?'B':avg>=50?'C':'D';
  var gc={S:'#FFD700',A:'#44cc88',B:'#4488cc',C:'#cc8844',D:'#cc4444'};
  c.fillStyle=gc[grade];c.font='bold 28px sans-serif';c.textAlign='center';
  c.fillText(grade,W/2,H-30);
  c.fillStyle='#9a6a8a';c.font='10px sans-serif';
  c.fillText('종합 '+avg+'점',W/2,H-12);
}

// --- 2. 영웅 명대사 아카이브 Canvas 620x400 ---
var QUOTE_DATA=[
  {hero:'단군',quote:'널리 인간을 이롭게 하라',axes:[95,90,80],desc:'홍익인간 건국 이념'},
  {hero:'환웅',quote:'하늘의 만백성을 이끌고 내려오리니',axes:[90,85,95],desc:'신시 하강 선언'},
  {hero:'주몬',quote:'나는 해모수의 아들이로다',axes:[85,70,95],desc:'건국 결의'},
  {hero:'을지문덕',quote:'살수에 물을 막으면 적은 무너지리라',axes:[80,95,75],desc:'살수대첩 전술'},
  {hero:'광개토',quote:'영토는 민족의 자존심이니라',axes:[90,80,90],desc:'영토 확장 선언'},
  {hero:'연개소문',quote:'민의 배를 채우는 것이 진정한 힘이니라',axes:[70,85,80],desc:'민생 정치 철학'},
  {hero:'김유신',quote:'삼국을 통일하여 백성의 고통을 끝내리라',axes:[85,80,90],desc:'통일 결의'},
  {hero:'선덕여왕',quote:'여자의 몬으로 하늘에 닿으리라',axes:[80,90,85],desc:'여왕 정치 선언'},
  {hero:'계백',quote:'명예로운 죽음이 부끄러운 삶보다 낫다',axes:[75,65,95],desc:'결사 항전 시 유언'},
  {hero:'대조영',quote:'발해의 망한 바다가 우리의 도해니라',axes:[85,75,85],desc:'발해 건국 선언'}
];
var QUOTE_AXES=['영감','지혜','용기'];
var quoteSel=0;

function drawQuote(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#66aa44';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('영웅 명대사 아카이브',W/2,28);
  var q=QUOTE_DATA[quoteSel];
  c.fillStyle='#FFD700';c.font='bold 14px sans-serif';
  c.fillText(q.hero,W/2,60);
  c.fillStyle='#e8dcc8';c.font='italic 13px sans-serif';
  c.fillText('“'+q.quote+'”',W/2,88);
  c.fillStyle='#6a8a5a';c.font='10px sans-serif';
  c.fillText(q.desc,W/2,108);
  var barW=360,startX=(W-barW)/2,barH=28,startY=135;
  var colors=['#cc8844','#44aa88','#cc4466'];
  for(var i=0;i<3;i++){
    var y=startY+i*(barH+20);
    c.fillStyle='#4a5a3a';c.font='11px sans-serif';c.textAlign='right';
    c.fillText(QUOTE_AXES[i],startX-10,y+barH/2+3);
    c.fillStyle='rgba(40,60,30,.5)';c.fillRect(startX,y,barW,barH);
    var bw=barW*q.axes[i]/100;
    var grad=c.createLinearGradient(startX,y,startX+bw,y);
    grad.addColorStop(0,colors[i]);grad.addColorStop(1,colors[i]+'cc');
    c.fillStyle=grad;c.fillRect(startX,y,bw,barH);
    c.fillStyle='#fff';c.font='bold 11px sans-serif';c.textAlign='left';
    c.fillText(q.axes[i],startX+bw+8,y+barH/2+3);
  }
  var avg=0;for(var i=0;i<3;i++)avg+=q.axes[i];avg=Math.round(avg/3);
  var grade=avg>=88?'S':avg>=80?'A':avg>=70?'B':avg>=60?'C':'D';
  var gc={S:'#FFD700',A:'#44cc88',B:'#4488cc',C:'#cc8844',D:'#cc4444'};
  c.fillStyle=gc[grade];c.font='bold 24px sans-serif';c.textAlign='center';
  c.fillText(grade+' 등급',W/2,H-55);
  c.fillStyle='#6a8a5a';c.font='10px sans-serif';
  c.fillText('명언 영향력: '+avg+'점',W/2,H-35);
  c.font='8px sans-serif';
  for(var h=0;h<10;h++){
    c.fillStyle=h===quoteSel?'#FFD700':'#3a5a2a';
    c.fillText(QUOTE_DATA[h].hero,30+h*58,H-14);
  }
}

// --- 3. 세력 관계 변천 타임라인 Canvas 640x400 ---
var ERA_DATA=[
  {name:'고조선 초기',year:'BC 2333',factions:['고조선','숙신','동호','산융','예맥'],relations:[[100,60,40,35,75],[60,100,50,45,55],[40,50,100,70,45],[35,45,70,100,30],[75,55,45,30,100]]},
  {name:'고조선 전성기',year:'BC 1000',factions:['고조선','연(燕)','진번','임둔','예맥'],relations:[[100,45,80,70,85],[45,100,55,50,40],[80,55,100,75,65],[70,50,75,100,60],[85,40,65,60,100]]},
  {name:'고조선 후기',year:'BC 300',factions:['고조선','한(漢)','부여','진한','변한'],relations:[[100,30,70,65,60],[30,100,40,45,50],[70,40,100,55,50],[65,45,55,100,80],[60,50,50,80,100]]},
  {name:'부여 시대',year:'BC 100',factions:['부여','고구려','옥저','동예','한(漢)'],relations:[[100,75,80,70,35],[75,100,60,55,25],[80,60,100,85,45],[70,55,85,100,40],[35,25,45,40,100]]},
  {name:'삼국 전기',year:'AD 100',factions:['고구려','백제','신라','가야','한(漢)'],relations:[[100,35,40,50,30],[35,100,40,55,50],[40,40,100,45,55],[50,55,45,100,60],[30,50,55,60,100]]},
  {name:'삼국 후기',year:'AD 600',factions:['고구려','백제','신라','당(唐)','왜(倭)'],relations:[[100,30,25,20,40],[30,100,20,35,60],[25,20,100,75,30],[20,35,75,100,25],[40,60,30,25,100]]}
];
var eraSel=0;

function drawRelation(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#7788cc';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('세력 관계 변천 타임라인',W/2,28);
  var era=ERA_DATA[eraSel];
  c.font='11px sans-serif';c.fillStyle='#6a7a9a';
  c.fillText(era.name+' ('+era.year+')',W/2,46);
  var n=era.factions.length;
  var ox=110,oy=65,cw=96,ch=50;
  c.save();c.font='10px sans-serif';c.fillStyle='#7788cc';c.textAlign='right';
  for(var i=0;i<n;i++)c.fillText(era.factions[i],ox-8,oy+i*ch+ch/2+3);
  c.textAlign='center';
  for(var j=0;j<n;j++){c.save();c.translate(ox+j*cw+cw/2,oy-6);c.rotate(-Math.PI/5);c.fillText(era.factions[j],0,0);c.restore()}
  c.restore();
  for(var i=0;i<n;i++){
    for(var j=0;j<n;j++){
      var v=era.relations[i][j],x=ox+j*cw,y=oy+i*ch;
      var hue=v>=70?120:v>=45?60:0;
      var sat=60,lit=18+v*.35;
      c.fillStyle='hsl('+hue+','+sat+'%,'+lit+'%)';
      c.fillRect(x+1,y+1,cw-2,ch-2);
      c.fillStyle=v>=60?'#fff':'#aaa';c.font='bold 11px sans-serif';c.textAlign='center';c.textBaseline='middle';
      c.fillText(v+'%',x+cw/2,y+ch/2-6);
      var label=v>=80?'우호':v>=60?'우호':v>=40?'중립':'적대';
      c.font='8px sans-serif';c.fillStyle=v>=60?'#aaffaa':v>=40?'#ffffaa':'#ffaaaa';
      c.fillText(label,x+cw/2,y+ch/2+8);
    }
  }
  c.fillStyle='#6a7a9a';c.font='10px sans-serif';c.textAlign='center';
  c.fillText('클릭으로 시대 전환 | '+era.factions.join(' · '),W/2,H-14);
}

// --- 4. 고대 무역품 가치 분석기 Canvas 620x400 ---
var GOODS_DATA=[
  {name:'비단',value:90,rare:75,demand:85,supply:40,icon:'🧣',desc:'고급 직물, 왕실/귀족 전용'},
  {name:'철기',value:85,rare:60,demand:95,supply:55,icon:'⚔️',desc:'무기/농기구 핵심 소재'},
  {name:'옥',value:95,rare:90,demand:70,supply:30,icon:'💎',desc:'의례용 고급 보석, 권위 상징'},
  {name:'소금',value:80,rare:50,demand:90,supply:65,icon:'🧂',desc:'생활필수품, 방부제 핵심'},
  {name:'금',value:98,rare:95,demand:80,supply:20,icon:'🥇',desc:'최고급 교역품, 화폐 대용'},
  {name:'곡물',value:70,rare:30,demand:95,supply:80,icon:'🌾',desc:'식량 기본, 조세 기준'},
  {name:'모피',value:75,rare:65,demand:70,supply:50,icon:'🧶',desc:'북방 교역 핵심품'},
  {name:'약재',value:85,rare:80,demand:75,supply:35,icon:'🌿',desc:'인삼/녹용 등 한반도 특산'},
  {name:'도자기',value:80,rare:70,demand:65,supply:45,icon:'🏺',desc:'고급 토기, 예술품 교역'},
  {name:'목재',value:55,rare:25,demand:80,supply:85,icon:'🪵',desc:'건축/조선 기본 자재'},
  {name:'철광석',value:75,rare:55,demand:85,supply:60,icon:'⛏️',desc:'제련 원료, 군사력 기반'},
  {name:'말(군마)',value:90,rare:85,demand:80,supply:25,icon:'🐎',desc:'기병 핵심, 북방 수입'}
];
var GOODS_AXES=['가치','희귀도','수요','공급'];

function drawGoods(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#aa9944';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('고대 무역품 가치 분석기',W/2,28);
  c.font='10px sans-serif';c.fillStyle='#8a8a5a';
  c.fillText('12교역품 가치/희귀도/수요/공급 4축 분석',W/2,46);
  var barGroupW=44,gap=6,startX=48,barAreaH=240,baseY=320;
  var colors=['#FFD700','#cc44aa','#44aacc','#66cc66'];
  for(var i=0;i<12;i++){
    var d=GOODS_DATA[i];
    var vals=[d.value,d.rare,d.demand,d.supply];
    var gx=startX+i*(barGroupW+gap);
    for(var a=0;a<4;a++){
      var bw=barGroupW/4-1;
      var bh=vals[a]/100*barAreaH;
      var x=gx+a*(barGroupW/4);
      c.fillStyle=colors[a];c.globalAlpha=.75;
      c.fillRect(x,baseY-bh,bw,bh);c.globalAlpha=1;
      c.fillStyle='#fff';c.font='7px sans-serif';c.textAlign='center';
      c.fillText(vals[a],x+bw/2,baseY-bh-3);
    }
    c.fillStyle='#8a8a5a';c.font='8px sans-serif';c.textAlign='center';
    c.save();c.translate(gx+barGroupW/2,baseY+12);c.rotate(Math.PI/5);
    c.fillText(d.icon+d.name,0,0);c.restore();
  }
  for(var i=0;i<=4;i++){
    var y=baseY-i*(barAreaH/4);
    c.beginPath();c.moveTo(startX-8,y);c.lineTo(W-15,y);
    c.strokeStyle='rgba(170,153,68,.12)';c.stroke();
    c.fillStyle='#6a6a3a';c.font='8px sans-serif';c.textAlign='right';
    c.fillText(i*25,startX-12,y+3);
  }
  var legY=H-14;
  for(var a=0;a<4;a++){
    c.fillStyle=colors[a];c.fillRect(W/2-120+a*60,legY-4,10,10);
    c.fillStyle='#8a8a5a';c.font='8px sans-serif';c.textAlign='left';
    c.fillText(GOODS_AXES[a],W/2-107+a*60,legY+4);
  }
}

// --- 5. 전략적 요충지 분석기 Canvas 640x400 ---
var CHOKE_DATA=[
  {name:'살수관',x:180,y:120,imp:95,icon:'⚔️',desc:'살수대첩 결전지, 북방 방어 핵심'},
  {name:'국내성',x:320,y:90,imp:90,icon:'🏰',desc:'고구려 수도, 정치/군사 중심'},
  {name:'한성',x:500,y:150,imp:85,icon:'🗼',desc:'북방 접경 전초기지'},
  {name:'우산성',x:150,y:250,imp:80,icon:'⛰️',desc:'백암산 산성, 천험 요새'},
  {name:'평양성',x:350,y:220,imp:88,icon:'🏙️',desc:'북방 관문, 교역 거점'},
  {name:'비사성',x:480,y:280,imp:75,icon:'⛺',desc:'산간 방어 전초기지'},
  {name:'한강 도하지',x:250,y:330,imp:82,icon:'🌊',desc:'강 횡단 전략 요충지'},
  {name:'대동강 하구',x:520,y:340,imp:78,icon:'⚓',desc:'해상 교역/군사 거점'}
];
var chokeSel=0;

function drawChoke(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#cc5566';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('전략적 요충지 분석기',W/2,28);
  c.font='10px sans-serif';c.fillStyle='#9a5a6a';
  c.fillText('8요충지 군사적 중요도 네트워크',W/2,46);
  for(var i=0;i<8;i++){
    for(var j=i+1;j<8;j++){
      var dx=CHOKE_DATA[i].x-CHOKE_DATA[j].x,dy=CHOKE_DATA[i].y-CHOKE_DATA[j].y;
      var dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<250){
        c.beginPath();c.moveTo(CHOKE_DATA[i].x,CHOKE_DATA[i].y);c.lineTo(CHOKE_DATA[j].x,CHOKE_DATA[j].y);
        var alpha=Math.max(.05,(250-dist)/250*.3);
        c.strokeStyle=i===chokeSel||j===chokeSel?'rgba(255,215,0,'+alpha*2+')':'rgba(204,85,102,'+alpha+')';
        c.lineWidth=i===chokeSel||j===chokeSel?2.5:1;c.stroke();
      }
    }
  }
  for(var i=0;i<8;i++){
    var d=CHOKE_DATA[i];
    var r=20+d.imp*.3;
    c.beginPath();c.arc(d.x,d.y,r,0,Math.PI*2);
    c.fillStyle=i===chokeSel?'rgba(255,215,0,.1)':'rgba(204,85,102,.06)';c.fill();
    c.strokeStyle=i===chokeSel?'rgba(255,215,0,.5)':'rgba(204,85,102,.25)';c.lineWidth=1.5;c.stroke();
    c.font='18px sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.fillText(d.icon,d.x,d.y-10);
    c.fillStyle=i===chokeSel?'#FFD700':'#cc5566';c.font='bold 10px sans-serif';
    c.fillText(d.name,d.x,d.y+10);
    c.fillStyle='#8a5a6a';c.font='9px sans-serif';
    c.fillText('중요도:'+d.imp,d.x,d.y+22);
  }
  var sel=CHOKE_DATA[chokeSel];
  c.fillStyle='#cc5566';c.font='12px sans-serif';c.textAlign='center';
  c.fillText(sel.icon+' '+sel.name+' | '+sel.desc+' | 중요도: '+sel.imp,W/2,H-14);
}

// --- 6. 영웅 성장 시뮬레이터 Canvas 620x400 ---
var GROWTH_HEROES=['단군','환웅','주몬','을지문덕','광개토','연개소문','김유신','선덕여왕','계백','대조영'];
var GROWTH_STATS=['무력','지력','통솔','체력','신망'];
var GROWTH_DATA=[];
(function(){
  for(var h=0;h<10;h++){
    var stats=[];
    for(var s=0;s<5;s++){
      var curve=[];
      var base=20+Math.abs((h*17+s*11)%31);
      var growth=1.2+Math.abs((h*7+s*13)%30)/20;
      for(var lv=0;lv<10;lv++){
        curve.push(Math.min(99,Math.round(base+growth*lv*lv*.15+lv*2)));
      }
      stats.push(curve);
    }
    GROWTH_DATA.push(stats);
  }
})();
var growthSel=0;

function drawGrowth(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#44aaaa';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('영웅 성장 시뮬레이터',W/2,28);
  c.font='11px sans-serif';c.fillStyle='#5a8a8a';
  c.fillText(GROWTH_HEROES[growthSel]+' - Lv.1→Lv.50 5스탯 성장 곡선',W/2,46);
  var ox=70,oy=60,gw=W-100,gh=260;
  for(var i=0;i<=4;i++){
    var y=oy+gh-i*(gh/4);
    c.beginPath();c.moveTo(ox,y);c.lineTo(ox+gw,y);
    c.strokeStyle='rgba(68,170,170,.12)';c.stroke();
    c.fillStyle='#4a7a7a';c.font='8px sans-serif';c.textAlign='right';
    c.fillText(i*25,ox-8,y+3);
  }
  for(var lv=0;lv<10;lv++){
    var x=ox+lv*(gw/9);
    c.beginPath();c.moveTo(x,oy);c.lineTo(x,oy+gh);
    c.strokeStyle='rgba(68,170,170,.08)';c.stroke();
    c.fillStyle='#4a7a7a';c.font='8px sans-serif';c.textAlign='center';
    c.fillText('Lv.'+(lv*5+5),x,oy+gh+14);
  }
  var lineColors=['#cc4444','#4488cc','#44cc88','#cccc44','#cc88ff'];
  var d=GROWTH_DATA[growthSel];
  for(var s=0;s<5;s++){
    c.beginPath();
    for(var lv=0;lv<10;lv++){
      var x=ox+lv*(gw/9);
      var y=oy+gh-d[s][lv]/100*gh;
      if(lv===0)c.moveTo(x,y);else c.lineTo(x,y);
    }
    c.strokeStyle=lineColors[s];c.lineWidth=2;c.stroke();
    for(var lv=0;lv<10;lv++){
      var x=ox+lv*(gw/9);
      var y=oy+gh-d[s][lv]/100*gh;
      c.beginPath();c.arc(x,y,3,0,Math.PI*2);
      c.fillStyle=lineColors[s];c.fill();
    }
  }
  for(var s=0;s<5;s++){
    c.fillStyle=lineColors[s];c.fillRect(W/2-130+s*52,H-28,10,10);
    c.fillStyle='#5a8a8a';c.font='9px sans-serif';c.textAlign='left';
    c.fillText(GROWTH_STATS[s],W/2-117+s*52,H-20);
  }
  var finalAvg=0;for(var s=0;s<5;s++)finalAvg+=d[s][9];finalAvg=Math.round(finalAvg/5);
  c.fillStyle='#44aaaa';c.font='bold 11px sans-serif';c.textAlign='center';
  c.fillText('Lv.50 평균: '+finalAvg+'점',W/2,H-6);
}

// --- 7. 고대 형벌 법제도 Canvas 620x400 ---
var PENALTY_DATA=[
  {name:'태형(태장)',axes:[60,70,80,75,90],desc:'무대기로 타격하는 경형'},
  {name:'장형(장형)',axes:[70,65,85,70,85],desc:'큰 나무무대기로 타격'},
  {name:'도형(비수형)',axes:[80,75,70,65,80],desc:'비단/명주 적는 형벌'},
  {name:'유형(유배형)',axes:[85,80,65,60,75],desc:'먼 지역으로 추방하는 형'},
  {name:'사형',axes:[95,60,90,40,70],desc:'최고형, 참수/교수형'},
  {name:'참형(할형)',axes:[90,55,95,35,65],desc:'사지 절단 형벌'},
  {name:'연좌(연대책)',axes:[85,50,75,45,90],desc:'가족까지 처벌하는 법'},
  {name:'속전(벌금형)',axes:[40,85,50,90,60],desc:'재산으로 상은 상쇼하는 법'}
];
var PENALTY_AXES=['엄격성','공정성','억제력','교화성','전통성'];
var penaltySel=0;

function drawPenalty(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#cc8844';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('고대 형벌 법제도',W/2,28);
  c.font='11px sans-serif';c.fillStyle='#8a6a4a';
  c.fillText(PENALTY_DATA[penaltySel].name+' - '+PENALTY_DATA[penaltySel].desc,W/2,48);
  var cx=W/2,cy=215,R=120;
  for(var ring=5;ring>=1;ring--){
    c.beginPath();
    for(var i=0;i<5;i++){
      var a=-Math.PI/2+i*Math.PI*2/5,r=R*ring/5;
      if(i===0)c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
      else c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
    }
    c.closePath();c.strokeStyle='rgba(140,90,50,.2)';c.stroke();
  }
  for(var i=0;i<5;i++){
    var a=-Math.PI/2+i*Math.PI*2/5;
    c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));
    c.strokeStyle='rgba(140,90,50,.15)';c.stroke();
    var lx=cx+(R+20)*Math.cos(a),ly=cy+(R+20)*Math.sin(a);
    c.fillStyle='#8a6a4a';c.font='10px sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.fillText(PENALTY_AXES[i],lx,ly);
  }
  c.beginPath();
  var d=PENALTY_DATA[penaltySel].axes;
  for(var i=0;i<5;i++){
    var a=-Math.PI/2+i*Math.PI*2/5,r=R*d[i]/100;
    if(i===0)c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
    else c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
  }
  c.closePath();c.fillStyle='rgba(204,136,68,.25)';c.fill();
  c.strokeStyle='#cc8844';c.lineWidth=2;c.stroke();
  for(var i=0;i<5;i++){
    var a=-Math.PI/2+i*Math.PI*2/5,r=R*d[i]/100;
    c.beginPath();c.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),4,0,Math.PI*2);
    c.fillStyle='#FFD700';c.fill();
  }
  var avg=0;for(var i=0;i<5;i++)avg+=d[i];avg=Math.round(avg/5);
  var grade=avg>=80?'S':avg>=70?'A':avg>=60?'B':avg>=50?'C':'D';
  var gc={S:'#FFD700',A:'#44cc88',B:'#4488cc',C:'#cc8844',D:'#cc4444'};
  c.fillStyle=gc[grade];c.font='bold 24px sans-serif';c.textAlign='center';
  c.fillText(grade,W/2,H-30);
  c.fillStyle='#8a6a4a';c.font='10px sans-serif';
  c.fillText('법적 영향력: '+avg+'점',W/2,H-12);
}

// --- 8. 왕실 혈통 순위도 Canvas 640x400 ---
var LINEAGE_DATA=[
  {name:'단군왕검',legitimacy:98,bloodline:100,merit:95,support:90,desc:'건국 시조, 최고 정통성'},
  {name:'부루',legitimacy:85,bloodline:90,merit:70,support:75,desc:'단군 장자, 정식 후계'},
  {name:'우서',legitimacy:80,bloodline:90,merit:65,support:70,desc:'단군 차자, 울 궀전 관리'},
  {name:'원검',legitimacy:65,bloodline:75,merit:80,support:60,desc:'샐방 후손, 군사 재능'},
  {name:'해모수의 아들',legitimacy:90,bloodline:85,merit:85,support:80,desc:'신화적 혈통, 고구려 시조'},
  {name:'비류왕',legitimacy:70,bloodline:70,merit:75,support:65,desc:'부여 왕조, 독립 통치'},
  {name:'온조왕',legitimacy:75,bloodline:65,merit:90,support:85,desc:'백제 건국, 실력파'},
  {name:'혁거세',legitimacy:80,bloodline:80,merit:70,support:75,desc:'신라 왕족, 기획력'},
  {name:'진흥왕',legitimacy:85,bloodline:85,merit:80,support:70,desc:'신라 황금기, 슷작갈문'},
  {name:'대무예',legitimacy:60,bloodline:55,merit:95,support:90,desc:'발해 건국, 군사적 재능 최고'}
];
var lineageHover=-1;

function drawLineage(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#aa66cc';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('왕실 혈통 순위도',W/2,28);
  c.font='10px sans-serif';c.fillStyle='#8a6a9a';
  c.fillText('10왕족 정통성/혈통/공적/지지도 4축 히트맵',W/2,46);
  var sorted=LINEAGE_DATA.map(function(d,i){
    var score=Math.round((d.legitimacy+d.bloodline+d.merit+d.support)/4);
    return {idx:i,name:d.name,score:score,data:d};
  }).sort(function(a,b){return b.score-a.score});
  var barH=28,startY=60,startX=130;
  var axes=['정통성','혈통','공적','지지도'];
  var colors=['#cc66aa','#aa88cc','#6688cc','#44aacc'];
  for(var r=0;r<10;r++){
    var d=sorted[r],y=startY+r*(barH+6);
    c.fillStyle=lineageHover===d.idx?'#FFD700':'#8a6a9a';
    c.font='10px sans-serif';c.textAlign='right';
    c.fillText((r+1)+'. '+d.name,startX-8,y+barH/2+3);
    var vals=[d.data.legitimacy,d.data.bloodline,d.data.merit,d.data.support];
    var totalW=W-startX-50;
    var accum=0;
    for(var a=0;a<4;a++){
      var segW=totalW*vals[a]/400;
      c.fillStyle=colors[a];c.globalAlpha=lineageHover===d.idx?.9:.65;
      c.fillRect(startX+accum,y,segW,barH);
      c.globalAlpha=1;
      accum+=segW;
    }
    var grade=d.score>=85?'S':d.score>=75?'A':d.score>=65?'B':d.score>=55?'C':'D';
    var gc={S:'#FFD700',A:'#44cc88',B:'#4488cc',C:'#cc8844',D:'#cc4444'};
    c.fillStyle=gc[grade];c.font='bold 10px sans-serif';c.textAlign='left';
    c.fillText(grade+' '+d.score+'점',startX+accum+6,y+barH/2+3);
  }
  var legY=H-12;
  for(var a=0;a<4;a++){
    c.fillStyle=colors[a];c.fillRect(W/2-110+a*55,legY-4,10,10);
    c.fillStyle='#8a6a9a';c.font='8px sans-serif';c.textAlign='left';
    c.fillText(axes[a],W/2-97+a*55,legY+4);
  }
}

// --- Quiz v29: 15 questions (315 -> 330) ---
var QUIZ_V29=[
  {q:'고대 왕의 예복인 곤룡포의 문양은?',a:['용','봉황','호랑이','학'],c:0},
  {q:'고조선 건국 이념 홍익인간의 뜻은?',a:['널리 인간을 이롭게 함','하늘을 경배함','왕을 섭김','전쟁을 승리함'],c:0},
  {q:'살수대첩에서 결전을 승리로 이끄 장수는?',a:['을지문덕','광개토','김유신','연개소문'],c:0},
  {q:'고대 비단의 주 사용처는?',a:['왕실/귀족 의복','백성 농복','군대 군복','어린이 옷'],c:0},
  {q:'고구려의 수도 국내성의 위치는?',a:['지금의 집안','지금의 평양','지금의 경주','지금의 서울'],c:0},
  {q:'고대 형벌 중 재산으로 상을 상쇼하는 법은?',a:['속전','태형','사형','유형'],c:0},
  {q:'연좌제의 특징은?',a:['가족까지 처벌','본인만 처벌','벌금 처벌','추방 처벌'],c:0},
  {q:'고대 교역품 중 가장 가치 높은 것은?',a:['금','철기','곡물','모피'],c:0},
  {q:'발해를 건국한 인물은?',a:['대조영','광개토','주몬','단군'],c:0},
  {q:'고대 무녀의 복장인 무복의 주요 역할은?',a:['제사/굿 의식','전투 방어','농사 작업','외교 활동'],c:0},
  {q:'고대 세력 관계에서 고조선과 예맥의 관계는?',a:['우호적','적대적','무관심','종속적'],c:0},
  {q:'영웅 성장에서 신망 스탯이 높으면?',a:['민심 장악 용이','공격력 증가','방어력 증가','이동속도 증가'],c:0},
  {q:'왕실 혈통에서 정통성이 가장 높은 인물은?',a:['단군왕검','부루','온조왕','대무예'],c:0},
  {q:'군마(말)의 주요 수입지는?',a:['북방 초원','남방 해안','서역 사막','동역 산간'],c:0},
  {q:'기마 전사복의 가장 큰 특징은?',a:['기동성 최상','방어력 최상','위엄 최상','장식 최상'],c:0}
];

// --- Achievements v29: 12 new (228 -> 240) ---
var ACH_V29=[
  {id:'costume_collector',name:'복식 수집가',desc:'복식 도감 10종 모두 조회'},
  {id:'quote_scholar',name:'명언 학자',desc:'명대사 10영웅 모두 열람'},
  {id:'era_historian',name:'시대 역사가',desc:'세력관계 6시대 모두 분석'},
  {id:'trade_expert',name:'교역 전문가',desc:'무역품 12종 모두 분석'},
  {id:'strategist_v29',name:'요충지 전략가',desc:'요충지 8고소 모두 확인'},
  {id:'growth_master',name:'성장 마스터',desc:'성장곡선 10영웅 모두 분석'},
  {id:'law_expert',name:'법 전문가',desc:'형벌제도 8종 모두 열람'},
  {id:'lineage_master',name:'혈통 대사',desc:'왕실혈통 10왕족 모두 분석'},
  {id:'quiz_v29_master',name:'v29 퀴즈 마스터',desc:'v29 퀴즈 15문 모두 정답'},
  {id:'v29_explorer',name:'v29 탐험가',desc:'v29 8기능 모두 열람'},
  {id:'v29_complete',name:'v29 완전정복',desc:'v29 모든 콘텐츠 완료'},
  {id:'history_scholar_v29',name:'역사 학자 v29',desc:'v29 전체 성적 S등급'}
];

// --- Panel builder ---
function buildPanels(){
  var nav=document.querySelector('.v28-nav')||document.querySelector('.v27-nav')||document.querySelector('.v26-nav')||document.querySelector('.v25-nav')||document.querySelector('.v24-nav')||document.querySelector('.v23-nav')||document.querySelector('.v22-nav')||document.querySelector('.v21-nav')||document.querySelector('.v20-nav')||document.querySelector('.v19-nav')||document.querySelector('.v18-nav')||document.querySelector('.v17-nav')||document.querySelector('.v16-nav')||document.querySelector('.v15-nav')||document.querySelector('.v14-nav')||document.querySelector('.sg30-bottom-bar');
  if(!nav){
    var allBtns=document.querySelectorAll('button');
    for(var i=0;i<allBtns.length;i++){
      if(allBtns[i].parentElement&&allBtns[i].parentElement.style&&(allBtns[i].parentElement.style.position==='fixed'||allBtns[i].parentElement.classList.contains('krpg-nav'))){
        nav=allBtns[i].parentElement;break;
      }
    }
  }
  var sections=[
    {id:'costume',label:'👑 복식',title:'고대 복식 도감',sub:'10종 복식 6축 Radar 분석',build:buildCostume,sfx:sfxCostume},
    {id:'quote',label:'📜 명언',title:'영웅 명대사 아카이브',sub:'10영웅 명언 영감/지혜/용기 3축 Bar',build:buildQuotePanel,sfx:sfxQuote},
    {id:'relation',label:'🌐 세력관계',title:'세력 관계 변천 타임라인',sub:'6시대 5세력 관계 히트맵',build:buildRelation,sfx:sfxRelation},
    {id:'goods',label:'💰 무역품',title:'고대 무역품 가치 분석기',sub:'12교역품 4축 비교 Bar',build:buildGoods,sfx:sfxGoods},
    {id:'choke',label:'⛔ 요충지',title:'전략적 요충지 분석기',sub:'8요충지 군사 네트워크',build:buildChoke,sfx:sfxChoke},
    {id:'growth',label:'📈 성장',title:'영웅 성장 시뮬레이터',sub:'10영웅 Lv.1→Lv.50 5스탯 라인차트',build:buildGrowthPanel,sfx:sfxGrowth},
    {id:'penalty',label:'⚖️ 형벌',title:'고대 형벌 법제도',sub:'8형벌 5축 Radar 분석',build:buildPenaltyPanel,sfx:sfxPenalty},
    {id:'lineage',label:'👑 혈통',title:'왕실 혈통 순위도',sub:'10왕족 4축 정통성 히트맵',build:buildLineagePanel,sfx:sfxLineage},
    {id:'quiz29',label:'❓ 퀴즈v29',title:'퀴즈 v29',sub:'15문항 (총 330문)',build:buildQuiz29,sfx:sfxQuiz29}
  ];

  sections.forEach(function(sec){
    var panel=document.createElement('div');panel.className='v29-panel';panel.id='v29-'+sec.id;
    var h2=document.createElement('h2');h2.textContent=sec.title;panel.appendChild(h2);
    var sub=document.createElement('div');sub.className='v29-sub';sub.textContent=sec.sub;panel.appendChild(sub);
    var wrap=document.createElement('div');wrap.id='v29-'+sec.id+'-wrap';panel.appendChild(wrap);
    sec.build(wrap);
    var closeBtn=document.createElement('button');closeBtn.className='v29-close';closeBtn.textContent='닫기';
    closeBtn.onclick=function(){panel.classList.remove('on');sfxClose29()};
    panel.appendChild(closeBtn);
    document.body.appendChild(panel);

    if(nav){
      var btn=document.createElement('button');
      btn.textContent=sec.label;
      btn.style.cssText='padding:6px 10px;border:1px solid #4a3a2a;border-radius:6px;background:rgba(40,30,20,.8);color:#cc8844;font-size:10px;cursor:pointer;font-family:inherit;margin:2px;transition:all .2s';
      btn.onmouseover=function(){this.style.borderColor='#cc8844';sfxHover29()};
      btn.onmouseout=function(){this.style.borderColor='#4a3a2a'};
      btn.onclick=function(){panel.classList.add('on');sec.sfx();sfxOpen29()};
      nav.appendChild(btn);
    }
  });
}

function buildCostume(wrap){
  wrap.className='costume-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  drawCostume(cv);
  var tabs=document.createElement('div');tabs.className='costume-tabs';
  COSTUME_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='costume-btn'+(i===0?' active':'');
    btn.textContent=d.icon+' '+d.name;
    btn.onclick=function(){costumeSel=i;drawCostume(cv);sfxSelect29();
      tabs.querySelectorAll('.costume-btn').forEach(function(b,j){b.className='costume-btn'+(j===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildQuotePanel(wrap){
  wrap.className='quote-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  drawQuote(cv);
  var grid=document.createElement('div');grid.className='quote-grid';
  QUOTE_DATA.forEach(function(d,i){
    var card=document.createElement('div');card.className='qt-card';
    card.innerHTML='<div class="qt-name">⚔️ '+d.hero+'</div>';
    card.onclick=function(){quoteSel=i;drawQuote(cv);sfxQuote()};
    grid.appendChild(card);
  });
  wrap.appendChild(grid);
}

function buildRelation(wrap){
  wrap.className='relation-wrap';
  var cv=document.createElement('canvas');cv.width=640;cv.height=400;wrap.appendChild(cv);
  drawRelation(cv);
  var tabs=document.createElement('div');tabs.className='rel-tabs';
  ERA_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='rel-btn'+(i===0?' active':'');
    btn.textContent=d.name+' ('+d.year+')';
    btn.onclick=function(){eraSel=i;drawRelation(cv);sfxRelation();
      tabs.querySelectorAll('.rel-btn').forEach(function(b,j){b.className='rel-btn'+(j===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildGoods(wrap){
  wrap.className='goods-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  drawGoods(cv);
  var tabs=document.createElement('div');tabs.className='goods-tabs';
  GOODS_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='goods-btn';
    btn.textContent=d.icon+' '+d.name;
    btn.onclick=function(){sfxGoods();toast(d.name+': '+d.desc,'#aa9944')};
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildChoke(wrap){
  wrap.className='choke-wrap';
  var cv=document.createElement('canvas');cv.width=640;cv.height=400;wrap.appendChild(cv);
  drawChoke(cv);
  var tabs=document.createElement('div');tabs.className='choke-tabs';
  CHOKE_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='choke-btn'+(i===0?' active':'');
    btn.textContent=d.icon+' '+d.name;
    btn.onclick=function(){chokeSel=i;drawChoke(cv);sfxChoke();
      tabs.querySelectorAll('.choke-btn').forEach(function(b,j){b.className='choke-btn'+(j===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildGrowthPanel(wrap){
  wrap.className='growth-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  drawGrowth(cv);
  var tabs=document.createElement('div');tabs.className='growth-tabs';
  GROWTH_HEROES.forEach(function(name,i){
    var btn=document.createElement('button');btn.className='growth-btn'+(i===0?' active':'');
    btn.textContent='⚔️ '+name;
    btn.onclick=function(){growthSel=i;drawGrowth(cv);sfxGrowth();
      tabs.querySelectorAll('.growth-btn').forEach(function(b,j){b.className='growth-btn'+(j===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildPenaltyPanel(wrap){
  wrap.className='penalty-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  drawPenalty(cv);
  var tabs=document.createElement('div');tabs.className='penalty-tabs';
  PENALTY_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='penalty-btn'+(i===0?' active':'');
    btn.textContent='⚖️ '+d.name;
    btn.onclick=function(){penaltySel=i;drawPenalty(cv);sfxPenalty();
      tabs.querySelectorAll('.penalty-btn').forEach(function(b,j){b.className='penalty-btn'+(j===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildLineagePanel(wrap){
  wrap.className='lineage-wrap';
  var cv=document.createElement('canvas');cv.width=640;cv.height=400;wrap.appendChild(cv);
  drawLineage(cv);
  var info=document.createElement('div');info.className='lineage-info';info.textContent='왕족 클릭으로 상세 혈통 확인';
  wrap.appendChild(info);
  cv.onclick=function(e){
    var rect=cv.getBoundingClientRect();
    var my=(e.clientY-rect.top)*(400/rect.height);
    var startY=60,barH=28,gap=6;
    var row=Math.floor((my-startY)/(barH+gap));
    if(row>=0&&row<10){
      var sorted=LINEAGE_DATA.map(function(d,i){
        var score=Math.round((d.legitimacy+d.bloodline+d.merit+d.support)/4);
        return {idx:i,score:score,data:d};
      }).sort(function(a,b){return b.score-a.score});
      var sel=sorted[row];
      lineageHover=sel.idx;drawLineage(cv);sfxClick29();
      info.textContent=sel.data.name+': '+sel.data.desc+' (정통'+sel.data.legitimacy+'/혈통'+sel.data.bloodline+'/공적'+sel.data.merit+'/지지'+sel.data.support+')';
    }
  };
}

function buildQuiz29(wrap){
  var idx=0,score=0;
  var qDiv=document.createElement('div');qDiv.style.cssText='max-width:580px;margin:0 auto;text-align:center';
  wrap.appendChild(qDiv);
  function showQ(){
    if(idx>=QUIZ_V29.length){
      var grade=score>=14?'S':score>=12?'A':score>=10?'B':score>=7?'C':'D';
      qDiv.innerHTML='<h3 style="color:#FFD700;font-size:20px;margin:20px 0">퀴즈 v29 완료!</h3>'+
        '<p style="color:#cc8844;font-size:16px">'+score+'/'+QUIZ_V29.length+' 정답 ('+grade+'등급)</p>'+
        '<button onclick="this.parentElement.parentElement.querySelector(\'button.v29-close\')&&this.parentElement.parentElement.querySelector(\'button.v29-close\').click()" style="margin-top:16px;padding:10px 24px;border:1px solid #5a3a1a;border-radius:6px;background:#6B1A0A;color:#e8dcc8;font-size:13px;cursor:pointer;font-family:inherit">닫기</button>';
      if(score>=14)sfxComplete29();
      return;
    }
    var q=QUIZ_V29[idx];
    var html='<p style="color:#e8dcc8;font-size:14px;margin:16px 0">'+(idx+1)+'/'+QUIZ_V29.length+'. '+q.q+'</p>';
    q.a.forEach(function(a,ai){
      html+='<button class="quiz29-opt" data-i="'+ai+'" style="display:block;width:100%;max-width:400px;margin:8px auto;padding:10px;border:1px solid #3a3a4a;border-radius:8px;background:rgba(20,16,30,.9);color:#e8dcc8;font-size:12px;cursor:pointer;font-family:inherit;transition:all .2s">'+a+'</button>';
    });
    qDiv.innerHTML=html;
    qDiv.querySelectorAll('.quiz29-opt').forEach(function(btn){
      btn.onclick=function(){
        var sel=parseInt(btn.dataset.i);
        if(sel===q.c){score++;sfxQuiz29();toast('정답! ✅','#44cc88');btn.style.borderColor='#44cc88';btn.style.background='rgba(68,204,136,.2)'}
        else{sfxQuizWrong29();toast('오답! ❌ 정답: '+q.a[q.c],'#cc4444');btn.style.borderColor='#cc4444';btn.style.background='rgba(204,68,68,.2)'}
        setTimeout(function(){idx++;showQ()},1200);
      };
    });
  }
  showQ();
}

// --- Keyboard shortcuts ---
document.addEventListener('keydown',function(e){
  if(!e.shiftKey)return;
  var panels={
    'KeyQ':'v29-costume','KeyW':'v29-quote','KeyE':'v29-relation','KeyR':'v29-goods',
    'KeyT':'v29-choke','KeyY':'v29-growth','KeyU':'v29-penalty','KeyI':'v29-lineage','Digit9':'v29-quiz29'
  };
  var id=panels[e.code];
  if(id){
    e.preventDefault();
    var p=document.getElementById(id);
    if(p){
      if(p.classList.contains('on')){p.classList.remove('on');sfxClose29()}
      else{p.classList.add('on');sfxNav29()}
    }
  }
});

// --- URL param support ---
function checkUrlParams(){
  var params=new URLSearchParams(window.location.search);
  var openMap={
    'costume':'v29-costume','heroQuote':'v29-quote','eraRelation':'v29-relation',
    'tradeGoods':'v29-goods','chokepoint':'v29-choke','heroGrowth':'v29-growth',
    'penaltyLaw':'v29-penalty','royalLineage':'v29-lineage','quizv29':'v29-quiz29'
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
