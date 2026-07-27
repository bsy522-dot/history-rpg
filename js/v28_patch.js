// v28_patch.js — 한국사 영웅전 v28.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v28-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:148;overflow-y:auto;padding:16px}',
'.v28-panel.on{display:block}',
'.v28-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v28-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v28-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v28-close:hover{background:#8B2A1A}',
'.v28-toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);padding:8px 20px;border-radius:20px;font-size:11px;font-weight:700;z-index:999;pointer-events:none;animation:v28fade 2s ease forwards}',
'@keyframes v28fade{0%{opacity:0;transform:translate(-50%,-10px)}10%{opacity:1;transform:translate(-50%,0)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-10px)}}',

'.inst-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.inst-wrap canvas{border:2px solid #3a2a1a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.inst-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.inst-btn{padding:5px 12px;border:1px solid #3a2a1a;border-radius:6px;background:#140a0a;color:#cc8844;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.inst-btn:hover{border-color:#cc8844}',
'.inst-btn.active{border-color:#FFD700;color:#FFD700}',

'.compat-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.compat-wrap canvas{border:2px solid #2a1a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.compat-info{font-size:11px;color:#8a7a9a;margin:8px 0;min-height:32px}',

'.route-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.route-wrap canvas{border:2px solid #1a2a3a;border-radius:10px;background:#04061a;display:block;margin:0 auto 12px}',
'.route-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.route-btn{padding:5px 12px;border:1px solid #1a2a3a;border-radius:6px;background:#0a0a1a;color:#4488aa;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.route-btn:hover{border-color:#4488aa}',

'.fest-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.fest-wrap canvas{border:2px solid #3a1a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.fest-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:6px;max-width:620px;margin:8px auto}',
'.fest-card{background:linear-gradient(135deg,rgba(20,10,14,.95),rgba(14,8,10,.98));border:2px solid #3a1a2a;border-radius:8px;padding:8px;text-align:center;cursor:pointer;transition:all .3s}',
'.fest-card:hover{border-color:#cc4488;transform:translateY(-2px)}',
'.fest-card.held{border-color:#FFD700}',
'.fest-card .fst-icon{font-size:22px}',
'.fest-card .fst-name{font-size:9px;color:#cc4488;font-weight:700;margin-top:2px}',

'.recov-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.recov-wrap canvas{border:2px solid #2a3a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.recov-btns{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.recov-btn{padding:6px 14px;border:1px solid #2a3a2a;border-radius:6px;background:#0a140a;color:#44aa66;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.recov-btn:hover{border-color:#44aa66;background:#142a14}',

'.treaty-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.treaty-wrap canvas{border:2px solid #2a2a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.treaty-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.treaty-btn{padding:5px 12px;border:1px solid #2a2a3a;border-radius:6px;background:#0a0a2a;color:#6688cc;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.treaty-btn:hover{border-color:#6688cc}',

'.sched-wrap{max-width:620px;margin:0 auto;text-align:center}',
'.sched-wrap canvas{border:2px solid #3a3a1a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.sched-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:6px;max-width:620px;margin:8px auto}',
'.sch-card{background:linear-gradient(135deg,rgba(18,16,8,.95),rgba(12,10,4,.98));border:2px solid #3a3a1a;border-radius:8px;padding:8px;text-align:center;cursor:pointer;transition:all .3s}',
'.sch-card:hover{border-color:#aaaa44;transform:translateY(-2px)}',
'.sch-card .sch-icon{font-size:22px}',
'.sch-card .sch-name{font-size:9px;color:#aaaa44;font-weight:700;margin-top:2px}',

'.defense-wrap{max-width:640px;margin:0 auto;text-align:center}',
'.defense-wrap canvas{border:2px solid #3a1a1a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.def-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.def-btn{padding:5px 12px;border:1px solid #3a1a1a;border-radius:6px;background:#140a0a;color:#cc6644;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.def-btn:hover{border-color:#cc6644}',
'.def-btn.active{border-color:#FFD700;color:#FFD700}'
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
function sfxInst(){sfx(523,.25,'triangle',.1);setTimeout(function(){sfx(659,.2,'triangle',.08)},80)}
function sfxCompat(){sfx(440,.3,'sine',.1);setTimeout(function(){sfx(554,.25,'sine',.08)},100)}
function sfxRoute(){sfx(330,.2,'square',.07);setTimeout(function(){sfx(440,.15,'square',.06)},60)}
function sfxFest(){sfx(587,.3,'triangle',.12);setTimeout(function(){sfx(784,.25,'triangle',.1)},80);setTimeout(function(){sfx(988,.2,'triangle',.08)},160)}
function sfxRecov(){sfx(349,.25,'sine',.1);setTimeout(function(){sfx(440,.2,'sine',.08)},100)}
function sfxTreaty(){sfx(392,.3,'triangle',.1);setTimeout(function(){sfx(523,.25,'triangle',.08)},80)}
function sfxSched(){sfx(466,.2,'sine',.09);setTimeout(function(){sfx(587,.15,'sine',.07)},70)}
function sfxDefense(){sfx(262,.3,'sawtooth',.06);setTimeout(function(){sfx(330,.25,'sawtooth',.05)},80)}
function sfxQuiz28(){sfx(698,.2,'triangle',.12);setTimeout(function(){sfx(880,.15,'triangle',.1)},60)}
function sfxQuizWrong28(){sfx(233,.3,'sawtooth',.08)}
function sfxAchieve28(){sfx(523,.15,'triangle',.12);setTimeout(function(){sfx(659,.15,'triangle',.1)},80);setTimeout(function(){sfx(784,.15,'triangle',.1)},160);setTimeout(function(){sfx(1047,.25,'triangle',.12)},240)}
function sfxNav28(){sfx(440,.1,'sine',.06)}
function sfxOpen28(){sfx(523,.15,'triangle',.08);setTimeout(function(){sfx(659,.1,'triangle',.06)},50)}
function sfxClose28(){sfx(330,.15,'sine',.06)}
function sfxHover28(){sfx(880,.05,'sine',.03)}
function sfxClick28(){sfx(660,.08,'triangle',.05)}
function sfxComplete28(){sfx(784,.2,'triangle',.1);setTimeout(function(){sfx(988,.15,'triangle',.08)},100)}
function sfxAlert28(){sfx(440,.15,'sawtooth',.06);setTimeout(function(){sfx(440,.15,'sawtooth',.06)},200)}
function sfxSelect28(){sfx(523,.1,'sine',.06)}

function toast(msg,color){
  var t=document.createElement('div');t.className='v28-toast';
  t.style.background=color||'#c4956a';t.style.color='#fff';t.textContent=msg;
  document.body.appendChild(t);setTimeout(function(){t.remove()},2200);
}

// --- 1. 고대 음악 악기관 Canvas 620x400 ---
var INST_DATA=[
  {name:'가야금',icon:'🎶',axes:[95,70,80,90,85,75],desc:'12현 명주실 현악기, 가야국 기원'},
  {name:'거문고',icon:'🎵',axes:[85,90,70,80,75,85],desc:'6현 명주실 현악기, 고구려 왕산악'},
  {name:'대금',icon:'🎼',axes:[80,85,90,75,70,80],desc:'대나무 횡적, 신라 만파식적 전설'},
  {name:'해금',icon:'🎻',axes:[75,80,85,70,90,65],desc:'2현 찰현악기, 아쟁과 함께 사용'},
  {name:'피리',icon:'🔪',axes:[70,75,95,80,65,70],desc:'대나무 관악기, 향피리/당피리/세피리'},
  {name:'장구',icon:'🥁',axes:[90,65,75,95,80,90],desc:'모래시계형 양면고, 장단 주도'},
  {name:'북',icon:'🥁',axes:[85,60,70,90,95,85],desc:'원형 타악기, 전쟁/의식용'},
  {name:'소금',icon:'🎶',axes:[65,80,85,60,70,75],desc:'소형 횡적, 맑고 높은 음색'},
  {name:'아쟁',icon:'🎻',axes:[80,85,65,75,85,80],desc:'7현 찰현악기, 저음 담당'},
  {name:'단소',icon:'🎼',axes:[60,75,90,55,65,70],desc:'대나무 종적, 선비 풍류악기'},
  {name:'태평소',icon:'📯',axes:[75,70,80,85,60,65],desc:'더블리드 관악기, 취타/대취타'},
  {name:'편경',icon:'🔔',axes:[70,95,60,65,75,90],desc:'16매 경석 타악기, 궁중 아악'}
];
var INST_AXES=['멜로디','화성','음역','리듬','음량','합주'];
var instSel=0;

function drawInst(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);
  c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#c4956a';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('고대 음악 악기관',W/2,28);
  c.font='11px sans-serif';c.fillStyle='#8a7a6a';
  c.fillText(INST_DATA[instSel].name+' - '+INST_DATA[instSel].desc,W/2,48);

  var cx=W/2,cy=210,R=120;
  for(var ring=5;ring>=1;ring--){
    c.beginPath();
    for(var i=0;i<6;i++){
      var a=-Math.PI/2+i*Math.PI/3,r=R*ring/5;
      if(i===0)c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
      else c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
    }
    c.closePath();c.strokeStyle='rgba(100,80,60,.2)';c.stroke();
  }
  for(var i=0;i<6;i++){
    var a=-Math.PI/2+i*Math.PI/3;
    c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));
    c.strokeStyle='rgba(100,80,60,.15)';c.stroke();
    var lx=cx+(R+18)*Math.cos(a),ly=cy+(R+18)*Math.sin(a);
    c.fillStyle='#8a7a6a';c.font='9px sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.fillText(INST_AXES[i],lx,ly);
  }
  c.beginPath();
  var d=INST_DATA[instSel].axes;
  for(var i=0;i<6;i++){
    var a=-Math.PI/2+i*Math.PI/3,r=R*d[i]/100;
    if(i===0)c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
    else c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
  }
  c.closePath();c.fillStyle='rgba(204,136,68,.25)';c.fill();
  c.strokeStyle='#cc8844';c.lineWidth=2;c.stroke();
  for(var i=0;i<6;i++){
    var a=-Math.PI/2+i*Math.PI/3,r=R*d[i]/100;
    c.beginPath();c.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),4,0,Math.PI*2);
    c.fillStyle='#FFD700';c.fill();
  }
  var avg=0;for(var i=0;i<6;i++)avg+=d[i];avg=Math.round(avg/6);
  var grade=avg>=85?'S':avg>=75?'A':avg>=65?'B':avg>=55?'C':'D';
  var gc={S:'#FFD700',A:'#44cc88',B:'#4488cc',C:'#cc8844',D:'#cc4444'};
  c.fillStyle=gc[grade];c.font='bold 28px sans-serif';c.textAlign='center';
  c.fillText(grade,W/2,H-30);
  c.fillStyle='#8a7a6a';c.font='10px sans-serif';
  c.fillText('종합 '+avg+'점',W/2,H-12);
}

// --- 2. 영웅 전략 궁합도 Canvas 620x400 ---
var HEROES_10=['단군','환웅','주몽','을지문덕','광개토','연개소문','김유신','선덕여왕','계백','대조영'];
var COMPAT_DATA=[];
(function(){
  for(var i=0;i<10;i++){COMPAT_DATA[i]=[];
    for(var j=0;j<10;j++){
      if(i===j)COMPAT_DATA[i][j]=100;
      else{var base=40+Math.abs((i*7+j*13)%61);COMPAT_DATA[i][j]=Math.min(98,base);COMPAT_DATA[j][i]=COMPAT_DATA[i][j]}
    }
  }
})();
var compatHover={r:-1,c:-1};

function drawCompat(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#aa88cc';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('영웅 전략 궁합도',W/2,28);
  c.font='10px sans-serif';c.fillStyle='#8a7a9a';
  c.fillText('영웅 조합별 전략 시너지 히트맵 (클릭으로 상세정보)',W/2,46);
  var ox=100,oy=65,cw=48,ch=30;
  c.save();c.font='9px sans-serif';c.fillStyle='#aa88cc';c.textAlign='right';
  for(var i=0;i<10;i++)c.fillText(HEROES_10[i],ox-6,oy+i*ch+ch/2+3);
  c.textAlign='center';
  for(var j=0;j<10;j++){c.save();c.translate(ox+j*cw+cw/2,oy-4);c.rotate(-Math.PI/4);c.fillText(HEROES_10[j],0,0);c.restore()}
  c.restore();
  for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
      var v=COMPAT_DATA[i][j],x=ox+j*cw,y=oy+i*ch;
      var hue=v>=80?120:v>=60?60:0;
      var sat=v>=80?60:v>=60?70:60;
      var lit=20+v*.3;
      c.fillStyle='hsl('+hue+','+sat+'%,'+lit+'%)';
      if(compatHover.r===i||compatHover.c===j)c.fillStyle='hsl('+hue+','+(sat+20)+'%,'+(lit+10)+'%)';
      c.fillRect(x+1,y+1,cw-2,ch-2);
      c.fillStyle=v>=70?'#fff':'#aaa';c.font='bold 10px sans-serif';c.textAlign='center';c.textBaseline='middle';
      c.fillText(v+'%',x+cw/2,y+ch/2);
    }
  }
  if(compatHover.r>=0&&compatHover.c>=0&&compatHover.r!==compatHover.c){
    var pair=HEROES_10[compatHover.r]+' + '+HEROES_10[compatHover.c];
    var val=COMPAT_DATA[compatHover.r][compatHover.c];
    var msg=val>=85?'최상 시너지!':val>=70?'좋은 조합':val>=55?'보통':'불화';
    c.fillStyle='#ddd';c.font='12px sans-serif';c.textAlign='center';
    c.fillText(pair+': '+val+'% ('+msg+')',W/2,H-14);
  }
}

// --- 3. 고대 교통로 분석기 Canvas 620x380 ---
var ROUTE_DATA=[
  {name:'관도(주간도)',dist:95,speed:80,safety:90,desc:'수도~지방 관설 간선도로'},
  {name:'해로(연안항로)',dist:85,speed:70,safety:55,desc:'해안선 따라 선박 이동'},
  {name:'하천로(수로)',dist:80,speed:90,safety:75,desc:'강/하천 이용 물자수송'},
  {name:'산간로(산척)',dist:60,speed:40,safety:80,desc:'산악지형 단축로'},
  {name:'파발마로',dist:70,speed:95,safety:65,desc:'긴급전령 고속전달망'},
  {name:'운하(인공수로)',dist:75,speed:85,safety:85,desc:'인공수로 물자대량수송'},
  {name:'교량도로',dist:50,speed:60,safety:50,desc:'강/계곡 횡단경로'},
  {name:'북방교역로',dist:90,speed:55,safety:45,desc:'북방 유목민족 교역로'}
];
var ROUTE_AXES=['거리범위','속도','안전성'];

function drawRoute(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#4488aa';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('고대 교통로 분석기',W/2,28);
  c.font='10px sans-serif';c.fillStyle='#6a8a9a';
  c.fillText('8노선 거리범위/속도/안전성 3축 분석',W/2,46);
  var barW=54,gap=14,startX=60,barAreaH=240,baseY=310;
  var colors=['#4488aa','#44aacc','#66ccaa'];
  for(var i=0;i<8;i++){
    var d=ROUTE_DATA[i];
    var vals=[d.dist,d.speed,d.safety];
    var bx=startX+i*(barW+gap);
    for(var a=0;a<3;a++){
      var bw=barW/3-1;
      var bh=vals[a]/100*barAreaH;
      var x=bx+a*(barW/3);
      c.fillStyle=colors[a];c.globalAlpha=.8;
      c.fillRect(x,baseY-bh,bw,bh);c.globalAlpha=1;
      c.fillStyle='#fff';c.font='8px sans-serif';c.textAlign='center';
      c.fillText(vals[a],x+bw/2,baseY-bh-4);
    }
    c.fillStyle='#6a8a9a';c.font='9px sans-serif';c.textAlign='center';
    c.save();c.translate(bx+barW/2,baseY+14);c.rotate(Math.PI/6);
    c.fillText(d.name,0,0);c.restore();
  }
  for(var i=0;i<=4;i++){
    var y=baseY-i*(barAreaH/4);
    c.beginPath();c.moveTo(startX-10,y);c.lineTo(W-20,y);
    c.strokeStyle='rgba(68,136,170,.15)';c.stroke();
    c.fillStyle='#4a6a7a';c.font='8px sans-serif';c.textAlign='right';
    c.fillText(i*25,startX-14,y+3);
  }
  var legY=H-20;
  for(var a=0;a<3;a++){
    c.fillStyle=colors[a];c.fillRect(W/2-100+a*70,legY-4,10,10);
    c.fillStyle='#8a9aaa';c.font='9px sans-serif';c.textAlign='left';
    c.fillText(ROUTE_AXES[a],W/2-87+a*70,legY+4);
  }
}

// --- 4. 왕실 축제 시뮬레이터 Canvas 620x400 ---
var FEST_DATA=[
  {name:'제천대제',icon:'⛩️',metrics:[95,90,85,80,90,70],desc:'하늘에 제사 지내는 최대 국가의례'},
  {name:'동맹제',icon:'🌟',metrics:[80,85,90,70,75,85],desc:'고구려 건국신화 기념 축제'},
  {name:'팔관회',icon:'🏯',metrics:[70,75,95,85,65,90],desc:'무예/사사/학문 8분야 경연'},
  {name:'추수감사제',icon:'🌾',metrics:[75,80,70,90,85,80],desc:'풍요로운 수확 감사 의례'},
  {name:'단오제',icon:'🎯',metrics:[85,70,80,75,80,75],desc:'단군 기림 국가창건 기념제'},
  {name:'선농제',icon:'🌱',metrics:[60,65,60,85,90,65],desc:'봄 파종 시작 농경의례'},
  {name:'무천제',icon:'⚔️',metrics:[90,80,85,60,70,80],desc:'군사 무예 경연/결투 대회'},
  {name:'수륙제',icon:'💧',metrics:[55,60,65,80,85,70],desc:'가뮄 해소 기우제'},
  {name:'영고제',icon:'🕯️',metrics:[70,90,75,65,60,85],desc:'조상영혼 기림 제사'},
  {name:'연등회',icon:'🏮',metrics:[65,70,90,75,70,95],desc:'정월대보름 등불축제'}
];
var FEST_AXES=['위엄','영성','문화성','민생','경제','참여도'];
var festSel=0;

function drawFest(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#cc4488';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('왕실 축제 시뮬레이터',W/2,28);
  c.font='10px sans-serif';c.fillStyle='#9a6a7a';
  c.fillText(FEST_DATA[festSel].icon+' '+FEST_DATA[festSel].name+' - '+FEST_DATA[festSel].desc,W/2,46);
  var barW=80,gap=10,startX=60,barH=16;
  var metrics=FEST_DATA[festSel].metrics;
  for(var i=0;i<6;i++){
    var y=70+i*(barH+22);
    c.fillStyle='#9a6a7a';c.font='10px sans-serif';c.textAlign='right';
    c.fillText(FEST_AXES[i],startX-8,y+barH/2+3);
    c.fillStyle='rgba(60,30,40,.5)';c.fillRect(startX,y,W-startX-40,barH);
    var bw=(W-startX-40)*metrics[i]/100;
    var grad=c.createLinearGradient(startX,y,startX+bw,y);
    grad.addColorStop(0,'#cc4488');grad.addColorStop(1,'#ff66aa');
    c.fillStyle=grad;c.fillRect(startX,y,bw,barH);
    c.fillStyle='#fff';c.font='bold 10px sans-serif';c.textAlign='left';
    c.fillText(metrics[i],startX+bw+6,y+barH/2+3);
  }
  var avg=0;for(var i=0;i<6;i++)avg+=metrics[i];avg=Math.round(avg/6);
  var grade=avg>=85?'S':avg>=75?'A':avg>=65?'B':avg>=55?'C':'D';
  var gc={S:'#FFD700',A:'#44cc88',B:'#4488cc',C:'#cc8844',D:'#cc4444'};
  c.fillStyle=gc[grade];c.font='bold 24px sans-serif';c.textAlign='center';
  c.fillText(grade+' 등급',W/2,H-60);
  c.fillStyle='#8a7a8a';c.font='11px sans-serif';
  c.fillText('종합 점수: '+avg+'점',W/2,H-38);
  // mini bar for all 10 festivals
  c.fillStyle='#6a4a5a';c.font='8px sans-serif';c.textAlign='center';
  for(var f=0;f<10;f++){
    var fx=40+f*56,fy=H-18;
    var fa=0;for(var k=0;k<6;k++)fa+=FEST_DATA[f].metrics[k];fa=Math.round(fa/6);
    c.fillStyle=f===festSel?'#FFD700':'#4a3a4a';
    c.fillRect(fx,fy-fa*.2,50,3);
    c.fillStyle=f===festSel?'#FFD700':'#6a4a5a';
    c.fillText(FEST_DATA[f].name.slice(0,3),fx+25,fy+10);
  }
}

// --- 5. 전쟁 피해 복구 플래너 Canvas 620x380 ---
var RECOV_DATA=[
  {name:'수도권',dmg:75,recov:30,icon:'🏯'},
  {name:'남부지방',dmg:60,recov:45,icon:'🏘️'},
  {name:'북부접경',dmg:90,recov:15,icon:'⚔️'},
  {name:'해안항구',dmg:50,recov:60,icon:'⛵'},
  {name:'산간요새',dmg:40,recov:70,icon:'⛰️'},
  {name:'농경평야',dmg:65,recov:40,icon:'🌾'},
  {name:'군사성채',dmg:85,recov:20,icon:'🏰'},
  {name:'변경교역지',dmg:55,recov:50,icon:'🛒'}
];

function drawRecov(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#44aa66';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('전쟁 피해 복구 플래너',W/2,28);
  c.font='10px sans-serif';c.fillStyle='#6a9a7a';
  c.fillText('8지역 피해도 vs 복구율 게이지 (클릭으로 복구 투입)',W/2,46);
  for(var i=0;i<8;i++){
    var d=RECOV_DATA[i],y=65+i*38;
    c.fillStyle='#6a9a7a';c.font='11px sans-serif';c.textAlign='right';
    c.fillText(d.icon+' '+d.name,110,y+12);
    // damage bar (red)
    c.fillStyle='rgba(80,20,20,.5)';c.fillRect(120,y,W-160,14);
    var dmgW=(W-160)*d.dmg/100;
    c.fillStyle='rgba(204,68,68,.7)';c.fillRect(120,y,dmgW,14);
    // recovery overlay (green)
    var recW=(W-160)*d.recov/100;
    c.fillStyle='rgba(68,170,102,.6)';c.fillRect(120,y,recW,14);
    c.fillStyle='#fff';c.font='bold 9px sans-serif';c.textAlign='left';
    c.fillText('피해'+d.dmg+'% / 복구'+d.recov+'%',125,y+11);
    // status
    var ratio=d.recov/d.dmg*100;
    var status=ratio>=80?'완료임박':ratio>=50?'진행중':'위급';
    var sc=ratio>=80?'#44cc88':ratio>=50?'#cccc44':'#cc4444';
    c.fillStyle=sc;c.font='bold 9px sans-serif';c.textAlign='right';
    c.fillText(status+' ('+Math.round(ratio)+'%)',W-30,y+11);
  }
  var totalDmg=0,totalRec=0;
  for(var i=0;i<8;i++){totalDmg+=RECOV_DATA[i].dmg;totalRec+=RECOV_DATA[i].recov}
  var overallRatio=Math.round(totalRec/totalDmg*100);
  var grade=overallRatio>=80?'S':overallRatio>=60?'A':overallRatio>=45?'B':overallRatio>=30?'C':'D';
  var gc={S:'#FFD700',A:'#44cc88',B:'#4488cc',C:'#cc8844',D:'#cc4444'};
  c.fillStyle=gc[grade];c.font='bold 20px sans-serif';c.textAlign='center';
  c.fillText('복구 등급: '+grade+' ('+overallRatio+'%)',W/2,H-20);
}

// --- 6. 고대 외교 문서관 Canvas 620x400 ---
var TREATY_DATA=[
  {name:'고조선-연(북방연합)',axes:[80,70,90,65,75],desc:'북방 유목민과의 상호불가침 조약'},
  {name:'부여-고구려(계승)',axes:[90,85,70,80,60],desc:'부여 왕권 고구려 계승 문서'},
  {name:'블연-중국(한무제)',axes:[75,80,85,70,90],desc:'중국 한나라와의 무역 협정'},
  {name:'삼한-일본(교역)',axes:[65,75,80,85,70],desc:'왕군 일본 열도와의 교역 문서'},
  {name:'고조선-진번(연합)',axes:[85,65,75,90,80],desc:'진번과의 군사동맹 문서'},
  {name:'빠제-중국(조공)',axes:[70,90,65,75,85],desc:'빠제 중국 조공 외교문서'},
  {name:'신라-당(조공)',axes:[60,80,90,70,75],desc:'신라 당나라 조공부로 사절 문서'},
  {name:'가야-신라(합병)',axes:[90,60,70,85,80],desc:'신라 가야 합병 조약문'},
  {name:'고구려-수(평화)',axes:[75,85,80,60,90],desc:'고구려 수나라 평화협정'},
  {name:'발해-당(보호)',axes:[80,70,75,90,65],desc:'발해 당나라 보호국 요청문서'}
];
var TREATY_AXES=['군사영향','경제효과','문화교류','주권보장','지속성'];
var treatySel=0;

function drawTreaty(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#6688cc';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('고대 외교 문서관',W/2,28);
  c.font='10px sans-serif';c.fillStyle='#6a7a9a';
  c.fillText(TREATY_DATA[treatySel].name+' - '+TREATY_DATA[treatySel].desc,W/2,46);
  var d=TREATY_DATA[treatySel].axes;
  var barW=80,startX=110;
  for(var i=0;i<5;i++){
    var y=65+i*50;
    c.fillStyle='#6a7a9a';c.font='11px sans-serif';c.textAlign='right';
    c.fillText(TREATY_AXES[i],startX-8,y+10);
    c.fillStyle='rgba(40,40,80,.5)';c.fillRect(startX,y,W-startX-50,16);
    var bw=(W-startX-50)*d[i]/100;
    var grad=c.createLinearGradient(startX,y,startX+bw,y);
    grad.addColorStop(0,'#4466aa');grad.addColorStop(1,'#6688cc');
    c.fillStyle=grad;c.fillRect(startX,y,bw,16);
    c.fillStyle='#fff';c.font='bold 10px sans-serif';c.textAlign='left';
    c.fillText(d[i],startX+bw+6,y+12);
  }
  var avg=0;for(var i=0;i<5;i++)avg+=d[i];avg=Math.round(avg/5);
  var grade=avg>=85?'S':avg>=75?'A':avg>=65?'B':avg>=55?'C':'D';
  var gc={S:'#FFD700',A:'#44cc88',B:'#4488cc',C:'#cc8844',D:'#cc4444'};
  c.fillStyle=gc[grade];c.font='bold 22px sans-serif';c.textAlign='center';
  c.fillText(grade,W/2,H-60);
  c.fillStyle='#6a7a9a';c.font='10px sans-serif';
  c.fillText('외교 영향력: '+avg+'점',W/2,H-40);
  // mini list
  c.font='8px sans-serif';
  for(var t=0;t<10;t++){
    var tx=30+t*58,ty=H-18;
    c.fillStyle=t===treatySel?'#FFD700':'#4a4a6a';
    c.fillText((t+1)+'.'+TREATY_DATA[t].name.slice(0,4),tx,ty);
  }
}

// --- 7. 영웅 훈련 스케줄러 Canvas 620x400 ---
var SCHED_HEROES=['단군','환웅','주몽','을지문덕','광개토','연개소문','김유신','선덕여왕','계백','대조영'];
var SCHED_AXES=['무력','지혀','통솔','체력','신앉'];
var schedSel=0;
var SCHED_DATA=[];
(function(){
  for(var h=0;h<10;h++){
    var week=[];
    for(var d=0;d<7;d++){
      var v=[];
      for(var a=0;a<5;a++)v.push(20+Math.abs((h*13+d*7+a*11)%61));
      week.push(v);
    }
    SCHED_DATA.push(week);
  }
})();
var DAYS=['월','화','수','목','금','토','일'];

function drawSched(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#aaaa44';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('영웅 훈련 스케줄러',W/2,28);
  c.font='10px sans-serif';c.fillStyle='#8a8a5a';
  c.fillText(SCHED_HEROES[schedSel]+' - 주간 5축 훈련 스케줄 Radar',W/2,46);
  var cx=W/2,cy=200,R=110;
  for(var ring=5;ring>=1;ring--){
    c.beginPath();
    for(var i=0;i<5;i++){
      var a=-Math.PI/2+i*Math.PI*2/5,r=R*ring/5;
      if(i===0)c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
      else c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
    }
    c.closePath();c.strokeStyle='rgba(120,120,40,.2)';c.stroke();
  }
  for(var i=0;i<5;i++){
    var a=-Math.PI/2+i*Math.PI*2/5;
    c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));
    c.strokeStyle='rgba(120,120,40,.15)';c.stroke();
    var lx=cx+(R+20)*Math.cos(a),ly=cy+(R+20)*Math.sin(a);
    c.fillStyle='#8a8a5a';c.font='10px sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.fillText(SCHED_AXES[i],lx,ly);
  }
  var dayColors=['#cc4444','#cc8844','#44cc88','#4488cc','#8844cc','#cc44aa','#FFD700'];
  var w=SCHED_DATA[schedSel];
  for(var d=0;d<7;d++){
    c.beginPath();
    for(var i=0;i<5;i++){
      var a=-Math.PI/2+i*Math.PI*2/5,r=R*w[d][i]/100;
      if(i===0)c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
      else c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
    }
    c.closePath();c.strokeStyle=dayColors[d];c.lineWidth=1.5;c.globalAlpha=.6;c.stroke();c.globalAlpha=1;
  }
  c.beginPath();
  var avg=[];for(var i=0;i<5;i++){var s=0;for(var d=0;d<7;d++)s+=w[d][i];avg.push(s/7)}
  for(var i=0;i<5;i++){
    var a=-Math.PI/2+i*Math.PI*2/5,r=R*avg[i]/100;
    if(i===0)c.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
    else c.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
  }
  c.closePath();c.fillStyle='rgba(170,170,68,.2)';c.fill();c.strokeStyle='#aaaa44';c.lineWidth=2;c.stroke();
  // legend
  for(var d=0;d<7;d++){
    c.fillStyle=dayColors[d];c.fillRect(W/2-140+d*40,H-30,10,10);
    c.fillStyle='#8a8a5a';c.font='9px sans-serif';c.textAlign='left';
    c.fillText(DAYS[d],W/2-127+d*40,H-22);
  }
  var totalAvg=0;for(var i=0;i<5;i++)totalAvg+=avg[i];totalAvg=Math.round(totalAvg/5);
  c.fillStyle='#aaaa44';c.font='bold 11px sans-serif';c.textAlign='center';
  c.fillText('주간 평균: '+totalAvg+'점',W/2,H-8);
}

// --- 8. 고대 방어시설 네트워크 Canvas 640x400 ---
var DEF_DATA=[
  {name:'산성',x:160,y:100,r:70,str:90,icon:'⛰️'},
  {name:'퇀성',x:320,y:80,r:60,str:85,icon:'🏰'},
  {name:'성벽',x:480,y:120,r:65,str:80,icon:'🧱'},
  {name:'보루',x:200,y:220,r:50,str:70,icon:'🗼'},
  {name:'수성',x:400,y:200,r:55,str:75,icon:'🌊'},
  {name:'목책',x:130,y:320,r:45,str:60,icon:'🪵'},
  {name:'첨후진지',x:350,y:310,r:50,str:65,icon:'⛺'},
  {name:'봉화대',x:520,y:280,r:40,str:55,icon:'🔥'}
];
var defSel=0;

function drawDefense(cv){
  var c=cv.getContext('2d'),W=cv.width,H=cv.height;
  c.clearRect(0,0,W,H);c.fillStyle='#04061a';c.fillRect(0,0,W,H);
  c.fillStyle='#cc6644';c.font='bold 16px sans-serif';c.textAlign='center';
  c.fillText('고대 방어시설 네트워크',W/2,28);
  c.font='10px sans-serif';c.fillStyle='#9a6a4a';
  c.fillText('8시설 커버리지 및 시너지 네트워크 (클릭으로 선택)',W/2,46);
  // draw connections
  for(var i=0;i<8;i++){
    for(var j=i+1;j<8;j++){
      var dx=DEF_DATA[i].x-DEF_DATA[j].x,dy=DEF_DATA[i].y-DEF_DATA[j].y;
      var dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<220){
        c.beginPath();c.moveTo(DEF_DATA[i].x,DEF_DATA[i].y);c.lineTo(DEF_DATA[j].x,DEF_DATA[j].y);
        var alpha=Math.max(.05,(220-dist)/220*.3);
        c.strokeStyle=i===defSel||j===defSel?'rgba(255,215,0,'+alpha*2+')':'rgba(204,102,68,'+alpha+')';
        c.lineWidth=i===defSel||j===defSel?2:1;c.stroke();
      }
    }
  }
  // draw facilities
  for(var i=0;i<8;i++){
    var d=DEF_DATA[i];
    c.beginPath();c.arc(d.x,d.y,d.r,0,Math.PI*2);
    c.fillStyle=i===defSel?'rgba(255,215,0,.08)':'rgba(204,102,68,.06)';c.fill();
    c.strokeStyle=i===defSel?'rgba(255,215,0,.4)':'rgba(204,102,68,.2)';c.lineWidth=1;c.stroke();
    c.font='20px sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.fillText(d.icon,d.x,d.y-8);
    c.fillStyle=i===defSel?'#FFD700':'#cc6644';c.font='bold 10px sans-serif';
    c.fillText(d.name,d.x,d.y+14);
    c.fillStyle='#8a6a4a';c.font='9px sans-serif';
    c.fillText('방어력:'+d.str,d.x,d.y+26);
  }
  // selected info
  var sel=DEF_DATA[defSel];
  c.fillStyle='#cc6644';c.font='12px sans-serif';c.textAlign='center';
  c.fillText(sel.icon+' '+sel.name+' | 방어력: '+sel.str+' | 커버범위: '+sel.r+'m',W/2,H-14);
}

// --- Quiz v28: 15 questions (300 -> 315) ---
var QUIZ_V28=[
  {q:'고대 한반도에서 가야금을 처음 만든 나라는?',a:['가야','신라','백제','고구려'],c:0},
  {q:'고구려의 대표적 관악기는?',a:['거문고','가야금','해금','피리'],c:0},
  {q:'고조선의 관도(주간도로) 중심지는?',a:['아사달','국내성','서라벌','위례성'],c:0},
  {q:'파발마로의 주요 목적은?',a:['긴급전령 전달','물자 수송','백성 이동','상업 교역'],c:0},
  {q:'제천대제의 주요 목적은?',a:['하늘에 제사','왕의 대관식','전쟁 승리 기념','조상 추모'],c:0},
  {q:'팔관회에서 경연하는 분야 수는?',a:['8분야','5분야','10분야','4분야'],c:0},
  {q:'빠제가 중국에 보낸 외교 형식은?',a:['조공','합병','동맹','전쟁'],c:0},
  {q:'산성의 주요 방어 장점은?',a:['높은 지형 활용','물로 둘러싸임','철벽 방어','함정 사격'],c:0},
  {q:'봉화대의 주요 기능은?',a:['원거리 신호 전달','물자 저장','병사 주둥','배 정박'],c:0},
  {q:'고대 외교문서에서 조공이란?',a:['공물 바침','군사동맹','문화교류','평화협정'],c:0},
  {q:'편경의 재료인 경석의 수는?',a:['16매','12매','8매','24매'],c:0},
  {q:'장구의 형태는?',a:['모래시계형','원통형','사각형','타원형'],c:0},
  {q:'고대 변경 교역지의 주요 교역 대상은?',a:['북방 유목민','중국 상인','일본 어부','동남아 해상'],c:0},
  {q:'영웅 훈련에서 신망이 높으면?',a:['민심 장악 용이','공격력 증가','방어력 증가','이동속도 증가'],c:0},
  {q:'퇀성과 산성의 차이점은?',a:['평지 vs 산지','목재 vs 석재','작은 vs 큰','해안 vs 내륙'],c:0}
];

// --- Achievements v28: 12 new (216 -> 228) ---
var ACH_V28=[
  {id:'instrument_explorer',name:'악기 탐험가',desc:'악기관 12악기 모두 조회'},
  {id:'compat_master',name:'궁합 대사',desc:'궁합도 전체 조합 확인'},
  {id:'route_analyst',name:'교통 분석가',desc:'교통로 8노선 분석 완료'},
  {id:'festival_host',name:'축제 주최자',desc:'축제 10종 모두 개최'},
  {id:'recovery_planner',name:'복구 전문가',desc:'복구율 80% 이상 달성'},
  {id:'diplomat',name:'외교 문서관',desc:'외교문서 10종 열람'},
  {id:'training_optimizer',name:'훈련 최적화사',desc:'훈련 스케줄 10영웅 완료'},
  {id:'defense_architect',name:'방어 건축가',desc:'방어시설 8종 모두 확인'},
  {id:'quiz_v28_master',name:'v28 퀵즈 마스터',desc:'v28 퀵즈 15문 모두 정답'},
  {id:'v28_explorer',name:'v28 탐험가',desc:'v28 8기능 모두 열람'},
  {id:'v28_complete',name:'v28 완전정복',desc:'v28 모든 콘텐츠 완료'},
  {id:'history_scholar_v28',name:'역사 학자 v28',desc:'v28 전체 성적 S등급'}
];

// --- Panel builder ---
function buildPanels(){
  var nav=document.querySelector('.v27-nav')||document.querySelector('.v26-nav')||document.querySelector('.v25-nav')||document.querySelector('.v24-nav')||document.querySelector('.v23-nav')||document.querySelector('.v22-nav')||document.querySelector('.v21-nav')||document.querySelector('.v20-nav')||document.querySelector('.v19-nav')||document.querySelector('.v18-nav')||document.querySelector('.v17-nav')||document.querySelector('.v16-nav')||document.querySelector('.v15-nav')||document.querySelector('.v14-nav')||document.querySelector('.sg30-bottom-bar');
  if(!nav){
    var allBtns=document.querySelectorAll('button');
    for(var i=0;i<allBtns.length;i++){
      if(allBtns[i].parentElement&&allBtns[i].parentElement.style&&(allBtns[i].parentElement.style.position==='fixed'||allBtns[i].parentElement.classList.contains('krpg-nav'))){
        nav=allBtns[i].parentElement;break;
      }
    }
  }
  var sections=[
    {id:'inst',label:'🎶 악기관',title:'고대 음악 악기관',sub:'12악기 6축 Radar 분석',build:buildInst,sfx:sfxInst},
    {id:'compat',label:'🤝 궁합도',title:'영웅 전략 궁합도',sub:'10영웅 10x10 시너지 히트맵',build:buildCompat,sfx:sfxCompat},
    {id:'route',label:'🛣️ 교통로',title:'고대 교통로 분석기',sub:'8노선 거리/속도/안전성 3축 Bar',build:buildRoute,sfx:sfxRoute},
    {id:'fest',label:'🎊 축제',title:'왕실 축제 시뮬레이터',sub:'10축제 6지표 분석',build:buildFest,sfx:sfxFest},
    {id:'recov',label:'🛠️ 복구',title:'전쟁 피해 복구 플래너',sub:'8지역 피해도 vs 복구율',build:buildRecov,sfx:sfxRecov},
    {id:'treaty',label:'📜 외교문서',title:'고대 외교 문서관',sub:'10조약 5축 영향력 Bar',build:buildTreaty,sfx:sfxTreaty},
    {id:'sched',label:'📋 훈련',title:'영웅 훈련 스케줄러',sub:'10영웅 주간 5축 Radar',build:buildSched,sfx:sfxSched},
    {id:'defense',label:'🏰 방어망',title:'고대 방어시설 네트워크',sub:'8시설 커버리지 네트워크',build:buildDefense,sfx:sfxDefense},
    {id:'quiz28',label:'❓ 퀵즈v28',title:'퀵즈 v28',sub:'15문항 (총 315문)',build:buildQuiz28,sfx:sfxQuiz28}
  ];

  sections.forEach(function(sec){
    var panel=document.createElement('div');panel.className='v28-panel';panel.id='v28-'+sec.id;
    var h2=document.createElement('h2');h2.textContent=sec.title;panel.appendChild(h2);
    var sub=document.createElement('div');sub.className='v28-sub';sub.textContent=sec.sub;panel.appendChild(sub);
    var wrap=document.createElement('div');wrap.id='v28-'+sec.id+'-wrap';panel.appendChild(wrap);
    sec.build(wrap);
    var closeBtn=document.createElement('button');closeBtn.className='v28-close';closeBtn.textContent='닫기';
    closeBtn.onclick=function(){panel.classList.remove('on');sfxClose28()};
    panel.appendChild(closeBtn);
    document.body.appendChild(panel);

    if(nav){
      var btn=document.createElement('button');
      btn.textContent=sec.label;
      btn.style.cssText='padding:6px 10px;border:1px solid #4a3a2a;border-radius:6px;background:rgba(40,30,20,.8);color:#cc8844;font-size:10px;cursor:pointer;font-family:inherit;margin:2px;transition:all .2s';
      btn.onmouseover=function(){this.style.borderColor='#cc8844';sfxHover28()};
      btn.onmouseout=function(){this.style.borderColor='#4a3a2a'};
      btn.onclick=function(){panel.classList.add('on');sec.sfx();sfxOpen28()};
      nav.appendChild(btn);
    }
  });
}

function buildInst(wrap){
  wrap.className='inst-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  drawInst(cv);
  var tabs=document.createElement('div');tabs.className='inst-tabs';
  INST_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='inst-btn'+(i===0?' active':'');
    btn.textContent=d.icon+' '+d.name;
    btn.onclick=function(){instSel=i;drawInst(cv);sfxSelect28();
      tabs.querySelectorAll('.inst-btn').forEach(function(b,j){b.className='inst-btn'+(j===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildCompat(wrap){
  wrap.className='compat-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  drawCompat(cv);
  var info=document.createElement('div');info.className='compat-info';info.textContent='영웅 조합을 클릭하여 상세 시너지 확인';
  wrap.appendChild(info);
  cv.onclick=function(e){
    var rect=cv.getBoundingClientRect();
    var mx=(e.clientX-rect.left)*(620/rect.width);
    var my=(e.clientY-rect.top)*(400/rect.height);
    var ox=100,oy=65,cw=48,ch=30;
    var col=Math.floor((mx-ox)/cw),row=Math.floor((my-oy)/ch);
    if(col>=0&&col<10&&row>=0&&row<10){
      compatHover={r:row,c:col};drawCompat(cv);sfxClick28();
      if(row!==col){
        var v=COMPAT_DATA[row][col];
        var msg=v>=85?'최상 시너지!':v>=70?'좋은 조합':v>=55?'보통':'불화';
        info.textContent=HEROES_10[row]+' + '+HEROES_10[col]+': '+v+'% - '+msg;
      }
    }
  };
}

function buildRoute(wrap){
  wrap.className='route-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=380;wrap.appendChild(cv);
  drawRoute(cv);
  var tabs=document.createElement('div');tabs.className='route-tabs';
  ROUTE_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='route-btn';
    btn.textContent=d.name;
    btn.onclick=function(){sfxRoute();toast(d.name+': '+d.desc,'#4488aa')};
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildFest(wrap){
  wrap.className='fest-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  drawFest(cv);
  var grid=document.createElement('div');grid.className='fest-grid';
  FEST_DATA.forEach(function(d,i){
    var card=document.createElement('div');card.className='fest-card';
    card.innerHTML='<div class="fst-icon">'+d.icon+'</div><div class="fst-name">'+d.name+'</div>';
    card.onclick=function(){festSel=i;drawFest(cv);sfxFest();card.classList.add('held')};
    grid.appendChild(card);
  });
  wrap.appendChild(grid);
}

function buildRecov(wrap){
  wrap.className='recov-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=380;wrap.appendChild(cv);
  drawRecov(cv);
  var btns=document.createElement('div');btns.className='recov-btns';
  RECOV_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='recov-btn';
    btn.textContent=d.icon+' '+d.name+' 복구투입';
    btn.onclick=function(){
      d.recov=Math.min(100,d.recov+10);drawRecov(cv);sfxRecov();
      toast(d.name+' 복구 +10% (현재 '+d.recov+'%)','#44aa66');
    };
    btns.appendChild(btn);
  });
  wrap.appendChild(btns);
}

function buildTreaty(wrap){
  wrap.className='treaty-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  drawTreaty(cv);
  var tabs=document.createElement('div');tabs.className='treaty-tabs';
  TREATY_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='treaty-btn';
    btn.textContent=(i+1)+'. '+d.name;
    btn.onclick=function(){treatySel=i;drawTreaty(cv);sfxTreaty()};
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildSched(wrap){
  wrap.className='sched-wrap';
  var cv=document.createElement('canvas');cv.width=620;cv.height=400;wrap.appendChild(cv);
  drawSched(cv);
  var grid=document.createElement('div');grid.className='sched-grid';
  SCHED_HEROES.forEach(function(name,i){
    var card=document.createElement('div');card.className='sch-card';
    card.innerHTML='<div class="sch-icon">⚔️</div><div class="sch-name">'+name+'</div>';
    card.onclick=function(){schedSel=i;drawSched(cv);sfxSched()};
    grid.appendChild(card);
  });
  wrap.appendChild(grid);
}

function buildDefense(wrap){
  wrap.className='defense-wrap';
  var cv=document.createElement('canvas');cv.width=640;cv.height=400;wrap.appendChild(cv);
  drawDefense(cv);
  var tabs=document.createElement('div');tabs.className='def-tabs';
  DEF_DATA.forEach(function(d,i){
    var btn=document.createElement('button');btn.className='def-btn'+(i===0?' active':'');
    btn.textContent=d.icon+' '+d.name;
    btn.onclick=function(){defSel=i;drawDefense(cv);sfxDefense();
      tabs.querySelectorAll('.def-btn').forEach(function(b,j){b.className='def-btn'+(j===i?' active':'')});
    };
    tabs.appendChild(btn);
  });
  wrap.appendChild(tabs);
}

function buildQuiz28(wrap){
  var idx=0,score=0;
  var qDiv=document.createElement('div');qDiv.style.cssText='max-width:580px;margin:0 auto;text-align:center';
  wrap.appendChild(qDiv);
  function showQ(){
    if(idx>=QUIZ_V28.length){
      var grade=score>=14?'S':score>=12?'A':score>=10?'B':score>=7?'C':'D';
      qDiv.innerHTML='<h3 style="color:#FFD700;font-size:20px;margin:20px 0">퀵즈 v28 완료!</h3>'+
        '<p style="color:#cc8844;font-size:16px">'+score+'/'+QUIZ_V28.length+' 정답 ('+grade+'등급)</p>'+
        '<button onclick="this.parentElement.parentElement.querySelector(\'button.v28-close\')&&this.parentElement.parentElement.querySelector(\'button.v28-close\').click()" style="margin-top:16px;padding:10px 24px;border:1px solid #5a3a1a;border-radius:6px;background:#6B1A0A;color:#e8dcc8;font-size:13px;cursor:pointer;font-family:inherit">닫기</button>';
      if(score>=14)sfxComplete28();
      return;
    }
    var q=QUIZ_V28[idx];
    var html='<p style="color:#e8dcc8;font-size:14px;margin:16px 0">'+(idx+1)+'/'+QUIZ_V28.length+'. '+q.q+'</p>';
    q.a.forEach(function(a,ai){
      html+='<button class="quiz28-opt" data-i="'+ai+'" style="display:block;width:100%;max-width:400px;margin:8px auto;padding:10px;border:1px solid #3a3a4a;border-radius:8px;background:rgba(20,16,30,.9);color:#e8dcc8;font-size:12px;cursor:pointer;font-family:inherit;transition:all .2s">'+a+'</button>';
    });
    qDiv.innerHTML=html;
    qDiv.querySelectorAll('.quiz28-opt').forEach(function(btn){
      btn.onclick=function(){
        var sel=parseInt(btn.dataset.i);
        if(sel===q.c){score++;sfxQuiz28();toast('정답! ✅','#44cc88');btn.style.borderColor='#44cc88';btn.style.background='rgba(68,204,136,.2)'}
        else{sfxQuizWrong28();toast('오답! ❌ 정답: '+q.a[q.c],'#cc4444');btn.style.borderColor='#cc4444';btn.style.background='rgba(204,68,68,.2)'}
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
    'KeyA':'v28-inst','KeyS':'v28-compat','KeyD':'v28-route','KeyF':'v28-fest',
    'KeyG':'v28-recov','KeyH':'v28-treaty','KeyJ':'v28-sched','KeyK':'v28-defense','Digit0':'v28-quiz28'
  };
  var id=panels[e.code];
  if(id){
    e.preventDefault();
    var p=document.getElementById(id);
    if(p){
      if(p.classList.contains('on')){p.classList.remove('on');sfxClose28()}
      else{p.classList.add('on');sfxNav28()}
    }
  }
});

// --- URL param support ---
function checkUrlParams(){
  var params=new URLSearchParams(window.location.search);
  var openMap={
    'instrument':'v28-inst','herocompat':'v28-compat','transport':'v28-route',
    'festival':'v28-fest','recovery':'v28-recov','treaty':'v28-treaty',
    'herotrain':'v28-sched','defnetwork':'v28-defense','quizv28':'v28-quiz28'
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
