// v24_patch.js — 한국사 영웅전 v24.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v24-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:143;overflow-y:auto;padding:16px}',
'.v24-panel.on{display:block}',
'.v24-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v24-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v24-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v24-close:hover{background:#8B2A1A}',
'.v24-toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);padding:8px 20px;border-radius:20px;font-size:11px;font-weight:700;z-index:999;pointer-events:none;animation:v24fade 2s ease forwards}',
'@keyframes v24fade{0%{opacity:0;transform:translate(-50%,-10px)}10%{opacity:1;transform:translate(-50%,0)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-10px)}}',

'.tech-wrap{max-width:600px;margin:0 auto;text-align:center}',
'.tech-wrap canvas{border:2px solid #2a5a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.tech-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px;max-width:600px;margin:8px auto}',
'.tc-card{background:linear-gradient(135deg,rgba(10,24,10,.95),rgba(6,16,6,.98));border:2px solid #2a5a2a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.tc-card:hover{border-color:#44cc44;transform:translateY(-2px)}',
'.tc-card.researched{border-color:#FFD700;background:linear-gradient(135deg,rgba(30,40,10,.9),rgba(20,30,8,.95))}',
'.tc-card .tc-icon{font-size:26px}',
'.tc-card .tc-name{font-size:10px;color:#44cc44;font-weight:700;margin-top:2px}',
'.tc-card .tc-cost{font-size:8px;color:#8a7a6a;margin-top:2px}',

'.market-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.market-wrap canvas{border:2px solid #5a4a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.mk-controls{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.mk-btn{padding:6px 14px;border:1px solid #5a4a2a;border-radius:6px;background:#1a1610;color:#cc9944;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.mk-btn:hover{border-color:#cc9944;background:#2a2214}',

'.terrain-wrap{max-width:600px;margin:0 auto;text-align:center}',
'.terrain-wrap canvas{border:2px solid #3a5a6a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.terrain-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.tt-btn{padding:5px 12px;border:1px solid #3a5a6a;border-radius:6px;background:#0a1418;color:#66aacc;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.tt-btn:hover{border-color:#66aacc}',
'.tt-btn.active{border-color:#FFD700;color:#FFD700}',

'.faction-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.faction-wrap canvas{border:2px solid #5a2a4a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.faction-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;max-width:580px;margin:8px auto}',
'.fc-card{background:linear-gradient(135deg,rgba(24,10,20,.95),rgba(16,6,14,.98));border:2px solid #5a2a4a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.fc-card:hover{border-color:#cc44aa;transform:translateY(-2px)}',
'.fc-card.selected{border-color:#FFD700;box-shadow:0 0 12px rgba(255,215,0,.2)}',
'.fc-card .fc-icon{font-size:26px}',
'.fc-card .fc-name{font-size:10px;color:#cc44aa;font-weight:700;margin-top:2px}',

'.advisor-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.advisor-wrap canvas{border:2px solid #4a3a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',

'.title-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.title-wrap canvas{border:2px solid #5a5a2a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.title-ranks{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;max-width:580px;margin:8px auto}',
'.tr-card{background:linear-gradient(135deg,rgba(22,22,10,.95),rgba(14,14,6,.98));border:2px solid #5a5a2a;border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.tr-card:hover{border-color:#cccc44;transform:translateY(-2px)}',
'.tr-card.earned{border-color:#FFD700;background:linear-gradient(135deg,rgba(40,38,10,.9),rgba(30,28,6,.95))}',
'.tr-card .tr-icon{font-size:26px}',
'.tr-card .tr-name{font-size:10px;color:#cccc44;font-weight:700;margin-top:2px}',
'.tr-card .tr-req{font-size:8px;color:#8a7a6a;margin-top:2px}',

'.supply-wrap{max-width:580px;margin:0 auto;text-align:center}',
'.supply-wrap canvas{border:2px solid #4a5a3a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.supply-actions{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.sp-btn{padding:6px 14px;border:1px solid #4a5a3a;border-radius:6px;background:#101a10;color:#88cc66;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.sp-btn:hover{border-color:#88cc66;background:#1a2a14}',

'.league-wrap{max-width:600px;margin:0 auto;text-align:center}',
'.league-wrap canvas{border:2px solid #2a3a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.league-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:600px;margin:8px auto}',
'.ls-item{background:linear-gradient(135deg,rgba(10,14,24,.95),rgba(6,10,18,.98));border:2px solid #2a3a5a;border-radius:10px;padding:10px;text-align:center}',
'.ls-item .ls-val{font-size:22px;color:#5FA0FF;font-weight:700}',
'.ls-item .ls-label{font-size:9px;color:#8a7a6a;margin-top:2px}'
].join('\n');
document.head.appendChild(css);

function toast24(msg,bg){
 var t=document.createElement('div');t.className='v24-toast';
 t.style.background=bg||'rgba(26,40,20,.9)';t.style.color='#88cc66';t.style.border='1px solid #44cc44';
 t.textContent=msg;document.body.appendChild(t);
 setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t);},2200);
}

// ─── SFX v24 12종 Web Audio API ───
var audioCtx24=null;
function getACtx24(){if(!audioCtx24)try{audioCtx24=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}return audioCtx24;}
function playSfx24(type){
 var ctx=getACtx24();if(!ctx)return;
 var o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);
 var t=ctx.currentTime;g.gain.setValueAtTime(0.15,t);
 var cfg={
  tech_research:{f:523,ty:'triangle',d:.25,e:698},
  tech_complete:{f:659,ty:'triangle',d:.3,e:880},
  market_buy:{f:440,ty:'sine',d:.2,e:523},
  market_sell:{f:523,ty:'sine',d:.2,e:440},
  terrain_scan:{f:330,ty:'sawtooth',d:.2,e:440},
  faction_view:{f:392,ty:'triangle',d:.2,e:523},
  advisor_tip:{f:494,ty:'sine',d:.3,e:659},
  title_earn:{f:659,ty:'triangle',d:.4,e:880},
  supply_collect:{f:370,ty:'sine',d:.2,e:494},
  supply_use:{f:494,ty:'sine',d:.2,e:370},
  league_win:{f:523,ty:'triangle',d:.3,e:784},
  achieve_v24:{f:880,ty:'triangle',d:.5,e:1047}
 };
 var c=cfg[type]||cfg.tech_research;
 o.type=c.ty;o.frequency.setValueAtTime(c.f,t);o.frequency.linearRampToValueAtTime(c.e,t+c.d);
 g.gain.linearRampToValueAtTime(0,t+c.d+.05);o.start(t);o.stop(t+c.d+.1);
}

// ════════════════════════════════════════
// 1. 기술 연구 트리 (문명 벤치마크)
// ════════════════════════════════════════
var TECHS=[
 {id:'agriculture',name:'농업기술',icon:'\u{1F33E}',era:'고조선',cost:100,prereq:null,desc:'곡물 수확량 50% 증가',bonus:'식량+50%'},
 {id:'bronze',name:'청동제련',icon:'\u{1F528}',era:'고조선',cost:150,prereq:'agriculture',desc:'청동무기 제작 가능',bonus:'공격+20%'},
 {id:'irrigation',name:'관개수로',icon:'\u{1F4A7}',era:'고조선',cost:200,prereq:'agriculture',desc:'가뭄 피해 무효화',bonus:'식량안정'},
 {id:'ironwork',name:'철기제작',icon:'\u{2694}\u{FE0F}',era:'부여',cost:300,prereq:'bronze',desc:'철제무기 대량 생산',bonus:'공격+40%'},
 {id:'horsemanship',name:'기마술',icon:'\u{1F40E}',era:'부여',cost:250,prereq:'bronze',desc:'기병 유닛 해금',bonus:'이동+2'},
 {id:'writing',name:'문자체계',icon:'\u{1F4DC}',era:'고조선',cost:200,prereq:null,desc:'기록 보관 및 외교 가능',bonus:'연구+20%'},
 {id:'astronomy',name:'천문관측',icon:'\u{2B50}',era:'고구려',cost:350,prereq:'writing',desc:'계절 예측 정확도 향상',bonus:'농업효율+30%'},
 {id:'fortification',name:'축성술',icon:'\u{1F3F0}',era:'고구려',cost:400,prereq:'ironwork',desc:'성벽 방어력 대폭 증가',bonus:'방어+60%'},
 {id:'shipbuilding',name:'조선술',icon:'\u{26F5}',era:'백제',cost:350,prereq:'ironwork',desc:'해상 교역 및 수군 가능',bonus:'교역+40%'},
 {id:'medicine',name:'한의학',icon:'\u{1F48A}',era:'신라',cost:300,prereq:'writing',desc:'부상 회복 속도 2배',bonus:'힐링+100%'},
 {id:'philosophy',name:'유교사상',icon:'\u{1F4D6}',era:'삼한',cost:250,prereq:'writing',desc:'충성도 감소 무효화',bonus:'사기+30%'},
 {id:'siege_eng',name:'공성공학',icon:'\u{1F4A5}',era:'고구려',cost:450,prereq:'fortification',desc:'공성무기 3종 해금',bonus:'공성+80%'}
];

function openTechTree(){
 var p=document.getElementById('v24-tech-panel');
 if(!p){
  p=document.createElement('div');p.id='v24-tech-panel';p.className='v24-panel';
  var html='<div class="tech-wrap"><h2>\u{1F4DA} 기술 연구 트리</h2><p class="v24-sub">문명의 기술 발전 12종 (연구 포인트로 해금)</p>';
  html+='<canvas id="v24-tech-canvas" width="600" height="400"></canvas>';
  html+='<div class="tech-grid" id="v24-tech-grid"></div>';
  html+='<button class="v24-close" onclick="closeTechTree()">닫기</button></div>';
  p.innerHTML=html;document.body.appendChild(p);
 }
 p.classList.add('on');
 renderTechTree();renderTechCanvas();
 playSfx24('tech_research');checkAch24('tech_viewer');
}
function closeTechTree(){var p=document.getElementById('v24-tech-panel');if(p)p.classList.remove('on');}

function renderTechTree(){
 var grid=document.getElementById('v24-tech-grid');if(!grid)return;
 var researched=JSON.parse(localStorage.getItem('krpg_v24_techs')||'[]');
 var rp=parseInt(localStorage.getItem('krpg_v24_rp')||'500');
 var html='<div style="text-align:center;margin-bottom:8px"><span style="font-size:12px;color:#44cc44">\u{1F52C} 연구 포인트: <b style="color:#FFD700">'+rp+'</b></span></div>';
 TECHS.forEach(function(t){
  var done=researched.indexOf(t.id)>=0;
  var canR=!done&&rp>=t.cost&&(!t.prereq||researched.indexOf(t.prereq)>=0);
  html+='<div class="tc-card'+(done?' researched':'')+'" onclick="researchTech(\''+t.id+'\')" style="'+(canR?'cursor:pointer':'cursor:default;opacity:'+(done?'1':'.5'))+'">';
  html+='<div class="tc-icon">'+t.icon+'</div>';
  html+='<div class="tc-name">'+t.name+'</div>';
  html+='<div class="tc-cost">'+(done?'✅ 완료':'필요: '+t.cost+'RP')+'</div>';
  html+='</div>';
 });
 grid.innerHTML=html;
}

function renderTechCanvas(){
 var c=document.getElementById('v24-tech-canvas');if(!c)return;
 var ctx=c.getContext('2d');var W=c.width,H=c.height;
 ctx.clearRect(0,0,W,H);
 var researched=JSON.parse(localStorage.getItem('krpg_v24_techs')||'[]');
 ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);
 ctx.strokeStyle='#2a5a2a';ctx.lineWidth=1;
 for(var i=0;i<W;i+=40){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,H);ctx.stroke();}
 for(var j=0;j<H;j+=40){ctx.beginPath();ctx.moveTo(0,j);ctx.lineTo(W,j);ctx.stroke();}
 var eras=['고조선','부여','고구려','백제','신라','삼한'];
 var eraColors=['#44cc44','#66aacc','#cc6644','#aa88ff','#FFD700','#cc44aa'];
 ctx.font='bold 14px sans-serif';ctx.textAlign='center';
 eras.forEach(function(e,i){
  var x=50+i*95;
  ctx.fillStyle=eraColors[i]+'44';ctx.fillRect(x-40,20,80,360);
  ctx.fillStyle=eraColors[i];ctx.fillText(e,x,16);
 });
 var positions={};
 TECHS.forEach(function(t,i){
  var eraIdx=eras.indexOf(t.era);if(eraIdx<0)eraIdx=0;
  var samEra=TECHS.filter(function(tt,ti){return tt.era===t.era&&ti<=i;}).length;
  var x=50+eraIdx*95;var y=50+samEra*70;
  positions[t.id]={x:x,y:y};
 });
 TECHS.forEach(function(t){
  if(t.prereq&&positions[t.prereq]&&positions[t.id]){
   var from=positions[t.prereq],to=positions[t.id];
   ctx.beginPath();ctx.moveTo(from.x,from.y);
   ctx.bezierCurveTo(from.x+40,from.y,to.x-40,to.y,to.x,to.y);
   ctx.strokeStyle=researched.indexOf(t.id)>=0?'#FFD700':'#3a5a3a';ctx.lineWidth=2;ctx.stroke();
  }
 });
 TECHS.forEach(function(t){
  var pos=positions[t.id];if(!pos)return;
  var done=researched.indexOf(t.id)>=0;
  ctx.beginPath();ctx.arc(pos.x,pos.y,18,0,Math.PI*2);
  ctx.fillStyle=done?'rgba(40,60,20,.9)':'rgba(15,20,10,.9)';ctx.fill();
  ctx.strokeStyle=done?'#FFD700':'#2a5a2a';ctx.lineWidth=2;ctx.stroke();
  ctx.font='16px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillStyle='#e8dcc8';ctx.fillText(t.icon,pos.x,pos.y);
  ctx.font='8px sans-serif';ctx.fillStyle=done?'#FFD700':'#44cc44';ctx.fillText(t.name,pos.x,pos.y+26);
 });
 ctx.font='bold 11px sans-serif';ctx.textAlign='left';ctx.fillStyle='#44cc44';
 ctx.fillText('연구 완료: '+researched.length+'/'+TECHS.length,10,H-10);
}

function researchTech(id){
 var researched=JSON.parse(localStorage.getItem('krpg_v24_techs')||'[]');
 var rp=parseInt(localStorage.getItem('krpg_v24_rp')||'500');
 if(researched.indexOf(id)>=0)return;
 var tech=TECHS.find(function(t){return t.id===id;});if(!tech)return;
 if(tech.prereq&&researched.indexOf(tech.prereq)<0){toast24('❌ 선행 기술 필요: '+TECHS.find(function(t){return t.id===tech.prereq;}).name);return;}
 if(rp<tech.cost){toast24('❌ 연구 포인트 부족');return;}
 rp-=tech.cost;researched.push(id);
 localStorage.setItem('krpg_v24_techs',JSON.stringify(researched));
 localStorage.setItem('krpg_v24_rp',String(rp));
 playSfx24('tech_complete');toast24('✅ '+tech.name+' 연구 완료! ('+tech.bonus+')');
 renderTechTree();renderTechCanvas();
 if(researched.length>=6)checkAch24('tech_6');
 if(researched.length>=12)checkAch24('tech_master');
}

// ════════════════════════════════════════
// 2. 자원 교환 시장 (에이지 벤치마크)
// ════════════════════════════════════════
var RESOURCES=['금','식량','철','옥','목재','가죽'];
var MARKET_RATES={};

function initMarketRates(){
 RESOURCES.forEach(function(r){MARKET_RATES[r]=Math.floor(Math.random()*80)+40;});
}
initMarketRates();

function openMarket(){
 var p=document.getElementById('v24-market-panel');
 if(!p){
  p=document.createElement('div');p.id='v24-market-panel';p.className='v24-panel';
  p.innerHTML='<div class="market-wrap"><h2>\u{1F3EA} 고대 교역 시장</h2><p class="v24-sub">6종 자원 교환 시장 (시세 변동)</p><canvas id="v24-market-canvas" width="580" height="360"></canvas><div class="mk-controls" id="v24-mk-ctrl"></div><button class="v24-close" onclick="closeMarket()">닫기</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 renderMarket();playSfx24('market_buy');checkAch24('market_viewer');
}
function closeMarket(){var p=document.getElementById('v24-market-panel');if(p)p.classList.remove('on');}

function renderMarket(){
 var c=document.getElementById('v24-market-canvas');if(!c)return;
 var ctx=c.getContext('2d');var W=c.width,H=c.height;
 ctx.clearRect(0,0,W,H);ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);
 var wallet=JSON.parse(localStorage.getItem('krpg_v24_wallet')||'{"금":1000,"식량":800,"철":500,"옥":200,"목재":600,"가죽":400}');
 var barW=60,gap=20,startX=50;
 ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillStyle='#cc9944';
 ctx.fillText('고대 교역 시장 - 시세 차트',W/2,24);
 var colors=['#FFD700','#44cc44','#8899aa','#aa88ff','#8B6B3D','#cc8844'];
 RESOURCES.forEach(function(r,i){
  var x=startX+i*(barW+gap);
  var rate=MARKET_RATES[r];
  var barH=rate*2.2;
  var grad=ctx.createLinearGradient(x,H-50-barH,x,H-50);
  grad.addColorStop(0,colors[i]);grad.addColorStop(1,colors[i]+'44');
  ctx.fillStyle=grad;
  ctx.beginPath();ctx.roundRect(x,H-50-barH,barW,barH,4);ctx.fill();
  ctx.strokeStyle=colors[i];ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(x,H-50-barH,barW,barH,4);ctx.stroke();
  ctx.font='bold 16px sans-serif';ctx.textAlign='center';ctx.fillStyle=colors[i];
  ctx.fillText(rate,x+barW/2,H-55-barH);
  ctx.font='11px sans-serif';ctx.fillStyle='#e8dcc8';ctx.fillText(r,x+barW/2,H-30);
  ctx.font='9px sans-serif';ctx.fillStyle='#8a7a6a';
  ctx.fillText('보유: '+(wallet[r]||0),x+barW/2,H-16);
 });
 ctx.font='9px sans-serif';ctx.fillStyle='#5a5a6a';ctx.textAlign='left';
 ctx.fillText('시세는 거래마다 변동됩니다',10,H-4);

 var ctrl=document.getElementById('v24-mk-ctrl');if(!ctrl)return;
 var html='';
 RESOURCES.forEach(function(r,i){
  html+='<button class="mk-btn" onclick="tradeResource(\''+r+'\',\'buy\')">매입 '+r+'</button>';
  html+='<button class="mk-btn" onclick="tradeResource(\''+r+'\',\'sell\')">매각 '+r+'</button>';
 });
 html+='<button class="mk-btn" style="border-color:#FFD700;color:#FFD700" onclick="refreshMarketRates()">\u{1F504} 시세 갱신</button>';
 ctrl.innerHTML=html;
}

function tradeResource(res,action){
 var wallet=JSON.parse(localStorage.getItem('krpg_v24_wallet')||'{"금":1000,"식량":800,"철":500,"옥":200,"목재":600,"가죽":400}');
 var rate=MARKET_RATES[res];
 if(action==='buy'){
  if((wallet['금']||0)<rate){toast24('❌ 금 부족');return;}
  wallet['금']-=rate;wallet[res]=(wallet[res]||0)+100;
  playSfx24('market_buy');toast24('✅ '+res+' 100 매입 ('+rate+'금)');
 }else{
  if((wallet[res]||0)<100){toast24('❌ '+res+' 부족');return;}
  wallet[res]-=100;wallet['금']=(wallet['금']||0)+rate;
  playSfx24('market_sell');toast24('✅ '+res+' 100 매각 (+'+rate+'금)');
 }
 localStorage.setItem('krpg_v24_wallet',JSON.stringify(wallet));
 var st=JSON.parse(localStorage.getItem('krpg_v24_trades')||'{"count":0}');
 st.count++;localStorage.setItem('krpg_v24_trades',JSON.stringify(st));
 if(st.count>=10)checkAch24('trader_10');
 MARKET_RATES[res]=Math.max(20,Math.min(120,MARKET_RATES[res]+Math.floor((Math.random()-.5)*20)));
 renderMarket();
}

function refreshMarketRates(){initMarketRates();renderMarket();toast24('\u{1F504} 시세 갱신 완료');}

// ════════════════════════════════════════
// 3. 전투 지형 효과 시뮬레이터
// ════════════════════════════════════════
var TERRAINS=[
 {id:'plain',name:'평원',icon:'\u{1F33F}',atk:100,def:100,spd:100,desc:'기본 지형. 보너스/페널티 없음'},
 {id:'forest',name:'숲',icon:'\u{1F332}',atk:80,def:130,spd:70,desc:'방어력 증가, 이동속도 감소'},
 {id:'mountain',name:'산악',icon:'⛰️',atk:90,def:150,spd:50,desc:'최고 방어력, 이동 제한'},
 {id:'river',name:'하천',icon:'\u{1F30A}',atk:60,def:80,spd:40,desc:'도하 시 큰 페널티'},
 {id:'marsh',name:'습지',icon:'\u{1F344}',atk:70,def:90,spd:30,desc:'최저 이동속도, 매복 적합'},
 {id:'castle',name:'성채',icon:'\u{1F3F0}',atk:110,def:180,spd:80,desc:'최고 방어 보너스'},
 {id:'desert',name:'사막',icon:'\u{1F3DC}️',atk:95,def:70,spd:90,desc:'방어 불리, 이동 자유'},
 {id:'coast',name:'해안',icon:'\u{1F3D6}️',atk:85,def:85,spd:110,desc:'수군 보너스, 균형형'}
];

function openTerrainSim(){
 var p=document.getElementById('v24-terrain-panel');
 if(!p){
  p=document.createElement('div');p.id='v24-terrain-panel';p.className='v24-panel';
  p.innerHTML='<div class="terrain-wrap"><h2>\u{1F5FA}️ 전투 지형 효과 시뮬레이터</h2><p class="v24-sub">8종 지형별 공격/방어/속도 보너스 분석</p><canvas id="v24-terrain-canvas" width="600" height="380"></canvas><div class="terrain-tabs" id="v24-terrain-tabs"></div><button class="v24-close" onclick="closeTerrainSim()">닫기</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 renderTerrainSim('all');playSfx24('terrain_scan');checkAch24('terrain_viewer');
}
function closeTerrainSim(){var p=document.getElementById('v24-terrain-panel');if(p)p.classList.remove('on');}

function renderTerrainSim(selected){
 var c=document.getElementById('v24-terrain-canvas');if(!c)return;
 var ctx=c.getContext('2d');var W=c.width,H=c.height;
 ctx.clearRect(0,0,W,H);ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);
 ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillStyle='#66aacc';
 ctx.fillText('지형별 전투 보너스 비교 (%)',W/2,24);
 var metrics=['공격','방어','속도'];
 var metricColors=['#cc4444','#4488cc','#44cc44'];
 var barW=16,groupW=barW*3+8,gap=10,startX=40;
 TERRAINS.forEach(function(t,i){
  var gx=startX+i*(groupW+gap);
  metrics.forEach(function(m,mi){
   var val=mi===0?t.atk:mi===1?t.def:t.spd;
   var barH=val*2;
   var x=gx+mi*(barW+2);
   ctx.fillStyle=metricColors[mi]+'88';
   ctx.beginPath();ctx.roundRect(x,H-50-barH,barW,barH,2);ctx.fill();
   ctx.strokeStyle=metricColors[mi];ctx.lineWidth=1;
   ctx.beginPath();ctx.roundRect(x,H-50-barH,barW,barH,2);ctx.stroke();
   ctx.font='bold 9px sans-serif';ctx.textAlign='center';ctx.fillStyle=metricColors[mi];
   ctx.fillText(val+'%',x+barW/2,H-54-barH);
  });
  ctx.font='20px sans-serif';ctx.textAlign='center';ctx.fillStyle='#e8dcc8';
  ctx.fillText(t.icon,gx+groupW/2,H-30);
  ctx.font='9px sans-serif';ctx.fillStyle='#8a7a6a';
  ctx.fillText(t.name,gx+groupW/2,H-14);
 });
 ctx.beginPath();ctx.setLineDash([4,4]);ctx.strokeStyle='#FFD700';ctx.lineWidth=1;
 ctx.moveTo(startX-10,H-50-200);ctx.lineTo(W-10,H-50-200);ctx.stroke();
 ctx.setLineDash([]);
 ctx.font='9px sans-serif';ctx.fillStyle='#FFD700';ctx.textAlign='left';
 ctx.fillText('100% 기준선',W-80,H-50-204);
 ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillStyle='#cc4444';ctx.fillText('■ 공격',10,H-4);
 ctx.fillStyle='#4488cc';ctx.fillText('■ 방어',70,H-4);
 ctx.fillStyle='#44cc44';ctx.fillText('■ 속도',130,H-4);

 var tabs=document.getElementById('v24-terrain-tabs');if(!tabs)return;
 var html='';
 TERRAINS.forEach(function(t){
  html+='<button class="tt-btn'+(selected===t.id?' active':'')+'" onclick="selectTerrain24(\''+t.id+'\')">'+t.icon+' '+t.name+'</button>';
 });
 tabs.innerHTML=html;
 if(selected!=='all'){
  var sel=TERRAINS.find(function(t){return t.id===selected;});
  if(sel){
   ctx.fillStyle='rgba(10,8,20,.85)';ctx.fillRect(W/2-140,50,280,80);
   ctx.strokeStyle='#66aacc';ctx.lineWidth=2;ctx.strokeRect(W/2-140,50,280,80);
   ctx.font='bold 13px sans-serif';ctx.textAlign='center';ctx.fillStyle='#66aacc';
   ctx.fillText(sel.icon+' '+sel.name,W/2,72);
   ctx.font='11px sans-serif';ctx.fillStyle='#e8dcc8';
   ctx.fillText(sel.desc,W/2,92);
   ctx.font='10px sans-serif';ctx.fillStyle='#FFD700';
   ctx.fillText('공:'+sel.atk+'% | 방:'+sel.def+'% | 속:'+sel.spd+'%',W/2,112);
  }
 }
}

function selectTerrain24(id){renderTerrainSim(id);playSfx24('terrain_scan');}

// ════════════════════════════════════════
// 4. 세력 정보 프로필 (문명백과사전)
// ════════════════════════════════════════
var FACTIONS=[
 {id:'gojoseon',name:'고조선',icon:'\u{1F451}',leader:'단군왕검',era:'BC 2333~BC 108',pop:50,mil:60,cul:70,eco:55,dip:65,tec:50},
 {id:'buyeo',name:'부여',icon:'\u{1F40E}',leader:'해모수',era:'BC 2세기~AD 494',pop:40,mil:65,cul:55,eco:50,dip:60,tec:45},
 {id:'goguryeo',name:'고구려',icon:'\u{1F985}',leader:'주몽',era:'BC 37~AD 668',pop:70,mil:95,cul:80,eco:65,dip:55,tec:75},
 {id:'baekje',name:'백제',icon:'\u{1F338}',leader:'온조',era:'BC 18~AD 660',pop:60,mil:70,cul:90,eco:80,dip:85,tec:70},
 {id:'silla',name:'신라',icon:'\u{1F31F}',leader:'박혁거세',era:'BC 57~AD 935',pop:65,mil:75,cul:85,eco:75,dip:70,tec:80},
 {id:'gaya',name:'가야',icon:'\u{2694}️',leader:'수로왕',era:'AD 42~AD 562',pop:35,mil:60,cul:65,eco:85,dip:45,tec:80},
 {id:'okjeo',name:'옥저',icon:'\u{1F3E0}',leader:'부족장',era:'BC 3세기~AD 5세기',pop:25,mil:30,cul:35,eco:40,dip:50,tec:25},
 {id:'dongye',name:'동예',icon:'\u{1F3AF}',leader:'부족장',era:'BC 3세기~AD 5세기',pop:20,mil:35,cul:40,eco:35,dip:40,tec:30}
];

function openFactionProfile(){
 var p=document.getElementById('v24-faction-panel');
 if(!p){
  p=document.createElement('div');p.id='v24-faction-panel';p.className='v24-panel';
  p.innerHTML='<div class="faction-wrap"><h2>\u{1F3DB}️ 세력 정보 프로필</h2><p class="v24-sub">8세력 6축 능력치 Radar 비교</p><canvas id="v24-faction-canvas" width="580" height="400"></canvas><div class="faction-cards" id="v24-faction-cards"></div><button class="v24-close" onclick="closeFactionProfile()">닫기</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 renderFactionProfile(null);playSfx24('faction_view');checkAch24('faction_viewer');
}
function closeFactionProfile(){var p=document.getElementById('v24-faction-panel');if(p)p.classList.remove('on');}

function renderFactionProfile(selectedId){
 var c=document.getElementById('v24-faction-canvas');if(!c)return;
 var ctx=c.getContext('2d');var W=c.width,H=c.height;
 ctx.clearRect(0,0,W,H);ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);
 var cx=W/2,cy=H/2+10,R=130;
 var axes=['인구','군사','문화','경제','외교','기술'];
 var n=axes.length;
 for(var lev=1;lev<=5;lev++){
  ctx.beginPath();
  for(var a=0;a<n;a++){
   var angle=-Math.PI/2+a*(2*Math.PI/n);
   var r=R*lev/5;
   var x=cx+r*Math.cos(angle),y=cy+r*Math.sin(angle);
   a===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  }
  ctx.closePath();ctx.strokeStyle='#2a2a3a';ctx.lineWidth=1;ctx.stroke();
 }
 axes.forEach(function(a,i){
  var angle=-Math.PI/2+i*(2*Math.PI/n);
  ctx.beginPath();ctx.moveTo(cx,cy);
  ctx.lineTo(cx+R*Math.cos(angle),cy+R*Math.sin(angle));
  ctx.strokeStyle='#3a3a4a';ctx.stroke();
  ctx.font='11px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#8a7a6a';
  ctx.fillText(a,cx+(R+20)*Math.cos(angle),cy+(R+20)*Math.sin(angle));
 });
 var factionColors=['#FFD700','#66aacc','#cc4444','#aa88ff','#cccc44','#cc8844','#88ccaa','#cc88cc'];
 var sel=selectedId?FACTIONS.find(function(f){return f.id===selectedId;}):null;
 var drawList=sel?[sel]:FACTIONS.slice(0,4);
 drawList.forEach(function(f,fi){
  var vals=[f.pop,f.mil,f.cul,f.eco,f.dip,f.tec];
  var color=factionColors[FACTIONS.indexOf(f)];
  ctx.beginPath();
  vals.forEach(function(v,i){
   var angle=-Math.PI/2+i*(2*Math.PI/n);
   var r=R*v/100;
   var x=cx+r*Math.cos(angle),y=cy+r*Math.sin(angle);
   i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  });
  ctx.closePath();ctx.fillStyle=color+'22';ctx.fill();
  ctx.strokeStyle=color;ctx.lineWidth=2;ctx.stroke();
  vals.forEach(function(v,i){
   var angle=-Math.PI/2+i*(2*Math.PI/n);
   var r=R*v/100;
   ctx.beginPath();ctx.arc(cx+r*Math.cos(angle),cy+r*Math.sin(angle),3,0,Math.PI*2);
   ctx.fillStyle=color;ctx.fill();
  });
 });
 ctx.font='bold 13px sans-serif';ctx.textAlign='center';ctx.fillStyle='#cc44aa';
 ctx.fillText(sel?sel.icon+' '+sel.name+' ('+sel.leader+')':'세력을 선택하여 비교하세요',W/2,20);
 if(sel){
  ctx.font='10px sans-serif';ctx.fillStyle='#8a7a6a';
  ctx.fillText(sel.era,W/2,36);
 }

 var cards=document.getElementById('v24-faction-cards');if(!cards)return;
 var html='';
 FACTIONS.forEach(function(f){
  html+='<div class="fc-card'+(selectedId===f.id?' selected':'')+'" onclick="viewFaction24(\''+f.id+'\')">';
  html+='<div class="fc-icon">'+f.icon+'</div>';
  html+='<div class="fc-name">'+f.name+'</div>';
  html+='<div style="font-size:8px;color:#8a7a6a">'+f.leader+'</div>';
  html+='</div>';
 });
 cards.innerHTML=html;
}

function viewFaction24(id){renderFactionProfile(id);playSfx24('faction_view');}

// ════════════════════════════════════════
// 5. 전략 AI 어드바이저
// ════════════════════════════════════════
var STRATEGIES=[
 {id:'attack',name:'전면공격',icon:'\u{1F525}',desc:'적의 약점을 집중 공략합니다',terrain:'평원',unit:'보병+기병',risk:70,reward:90,tip:'적 병력이 분산되었을 때 효과적'},
 {id:'defend',name:'수비태세',icon:'\u{1F6E1}️',desc:'성채에서 적을 기다립니다',terrain:'성채',unit:'궁병+보병',risk:20,reward:50,tip:'병력 열세일 때 최적의 선택'},
 {id:'ambush',name:'매복작전',icon:'\u{1F332}',desc:'숲에서 기습합니다',terrain:'숲',unit:'척후병+궁병',risk:50,reward:80,tip:'적이 행군 중일 때 사용'},
 {id:'siege',name:'공성전',icon:'\u{1F3F0}',desc:'성벽을 돌파합니다',terrain:'성채',unit:'공성병+보병',risk:60,reward:95,tip:'공성공학 기술 필요'},
 {id:'flank',name:'측면우회',icon:'\u{1F5FA}️',desc:'적의 측면을 돌아 포위합니다',terrain:'평원',unit:'기병',risk:55,reward:85,tip:'기병 다수 보유 시 효과적'},
 {id:'naval',name:'수군작전',icon:'⛵',desc:'해상에서 기습합니다',terrain:'해안',unit:'수군',risk:45,reward:75,tip:'조선술 기술 필요'},
 {id:'retreat',name:'전략적후퇴',icon:'\u{1F3C3}',desc:'병력을 보전하며 후퇴합니다',terrain:'모든',unit:'모든',risk:10,reward:30,tip:'압도적 병력 차이 시'},
 {id:'diplo',name:'외교협상',icon:'\u{1F91D}',desc:'전쟁 없이 문제를 해결합니다',terrain:'모든',unit:'없음',risk:5,reward:60,tip:'문화력이 높을 때 성공률 증가'}
];

function openAdvisor(){
 var p=document.getElementById('v24-advisor-panel');
 if(!p){
  p=document.createElement('div');p.id='v24-advisor-panel';p.className='v24-panel';
  p.innerHTML='<div class="advisor-wrap"><h2>\u{1F9D9} 전략 AI 어드바이저</h2><p class="v24-sub">8종 전략 위험도/보상 분석 Canvas</p><canvas id="v24-advisor-canvas" width="580" height="380"></canvas><button class="v24-close" onclick="closeAdvisor()">닫기</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 renderAdvisor();playSfx24('advisor_tip');checkAch24('advisor_viewer');
}
function closeAdvisor(){var p=document.getElementById('v24-advisor-panel');if(p)p.classList.remove('on');}

function renderAdvisor(){
 var c=document.getElementById('v24-advisor-canvas');if(!c)return;
 var ctx=c.getContext('2d');var W=c.width,H=c.height;
 ctx.clearRect(0,0,W,H);ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);
 ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillStyle='#aa88ff';
 ctx.fillText('전략 위험도 vs 보상 분석',W/2,24);
 var dotR=18;
 ctx.strokeStyle='#3a3a4a';ctx.lineWidth=1;
 ctx.beginPath();ctx.moveTo(50,H-50);ctx.lineTo(W-20,H-50);ctx.stroke();
 ctx.beginPath();ctx.moveTo(50,H-50);ctx.lineTo(50,30);ctx.stroke();
 ctx.font='10px sans-serif';ctx.fillStyle='#8a7a6a';ctx.textAlign='center';
 ctx.fillText('위험도 →',W/2,H-30);
 ctx.save();ctx.translate(18,H/2);ctx.rotate(-Math.PI/2);ctx.fillText('보상 →',0,0);ctx.restore();
 for(var g=0;g<=100;g+=25){
  var gx=50+(W-70)*g/100;
  ctx.fillStyle='#3a3a4a';ctx.fillText(g,gx,H-36);
  var gy=H-50-(H-80)*g/100;
  ctx.textAlign='right';ctx.fillText(g,42,gy+4);ctx.textAlign='center';
 }
 var sColors=['#cc4444','#4488cc','#44cc44','#FFD700','#cc8844','#66aacc','#888888','#aa88ff'];
 STRATEGIES.forEach(function(s,i){
  var x=50+(W-70)*s.risk/100;
  var y=H-50-(H-80)*s.reward/100;
  ctx.beginPath();ctx.arc(x,y,dotR,0,Math.PI*2);
  ctx.fillStyle=sColors[i]+'44';ctx.fill();
  ctx.strokeStyle=sColors[i];ctx.lineWidth=2;ctx.stroke();
  ctx.font='14px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillStyle='#e8dcc8';ctx.fillText(s.icon,x,y);
  ctx.font='9px sans-serif';ctx.textBaseline='top';ctx.fillStyle=sColors[i];
  ctx.fillText(s.name,x,y+dotR+4);
 });
 ctx.beginPath();ctx.setLineDash([4,4]);ctx.strokeStyle='#FFD700';ctx.lineWidth=1;
 ctx.moveTo(50,H-50);ctx.lineTo(W-20,30);ctx.stroke();
 ctx.setLineDash([]);
 ctx.font='8px sans-serif';ctx.fillStyle='#FFD700';ctx.textAlign='right';
 ctx.fillText('이상적 전략선 (위험=보상)',W-25,34);
}

// ════════════════════════════════════════
// 6. 영웅 칭호/작위 시스템 (영걸전 벤치마크)
// ════════════════════════════════════════
var TITLES=[
 {id:'recruit',name:'신병',icon:'\u{1F476}',rank:1,req:'시작',xp:0},
 {id:'soldier',name:'병졸',icon:'\u{1F482}',rank:2,req:'전투 3승',xp:300},
 {id:'captain',name:'대장',icon:'\u{1F396}️',rank:3,req:'전투 10승',xp:1000},
 {id:'general',name:'장군',icon:'\u{2694}️',rank:4,req:'전투 20승',xp:3000},
 {id:'commander',name:'대장군',icon:'\u{1F31F}',rank:5,req:'전투 30승+기술6종',xp:6000},
 {id:'duke',name:'제후',icon:'\u{1F451}',rank:6,req:'영토3지역+재정5000금',xp:10000},
 {id:'king',name:'왕',icon:'\u{1F451}',rank:7,req:'전투 50승+기술 전체',xp:20000},
 {id:'emperor',name:'천자',icon:'\u{1F30D}',rank:8,req:'모든 업적 달성',xp:50000},
 {id:'sage',name:'성인',icon:'\u{1F4D6}',rank:9,req:'퀴즈 200문 정답',xp:80000},
 {id:'legend',name:'전설',icon:'⚡',rank:10,req:'모든 콘텐츠 완료',xp:100000}
];

function openTitleSystem(){
 var p=document.getElementById('v24-title-panel');
 if(!p){
  p=document.createElement('div');p.id='v24-title-panel';p.className='v24-panel';
  p.innerHTML='<div class="title-wrap"><h2>\u{1F3C5} 영웅 칭호/작위 시스템</h2><p class="v24-sub">10단계 작위 승급 (경험치 기반)</p><canvas id="v24-title-canvas" width="580" height="360"></canvas><div class="title-ranks" id="v24-title-ranks"></div><button class="v24-close" onclick="closeTitleSystem()">닫기</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 renderTitleSystem();playSfx24('title_earn');checkAch24('title_viewer');
}
function closeTitleSystem(){var p=document.getElementById('v24-title-panel');if(p)p.classList.remove('on');}

function renderTitleSystem(){
 var c=document.getElementById('v24-title-canvas');if(!c)return;
 var ctx=c.getContext('2d');var W=c.width,H=c.height;
 ctx.clearRect(0,0,W,H);ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);
 var xp=parseInt(localStorage.getItem('krpg_v24_xp')||'0');
 var currentRank=0;
 TITLES.forEach(function(t,i){if(xp>=t.xp)currentRank=i;});
 ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillStyle='#cccc44';
 ctx.fillText('작위 승급 프로그레스',W/2,24);
 var barY=50,barH=30,barX=40,barW=W-80;
 ctx.fillStyle='#1a1a10';ctx.beginPath();ctx.roundRect(barX,barY,barW,barH,8);ctx.fill();
 ctx.strokeStyle='#5a5a2a';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(barX,barY,barW,barH,8);ctx.stroke();
 var maxXP=TITLES[TITLES.length-1].xp;
 var fillW=Math.min(barW,barW*xp/maxXP);
 var grad=ctx.createLinearGradient(barX,0,barX+fillW,0);
 grad.addColorStop(0,'#5a5a1a');grad.addColorStop(1,'#FFD700');
 ctx.fillStyle=grad;ctx.beginPath();ctx.roundRect(barX,barY,fillW,barH,8);ctx.fill();
 TITLES.forEach(function(t,i){
  var tx=barX+barW*t.xp/maxXP;
  ctx.beginPath();ctx.moveTo(tx,barY);ctx.lineTo(tx,barY+barH);
  ctx.strokeStyle=i<=currentRank?'#FFD700':'#3a3a2a';ctx.lineWidth=1;ctx.stroke();
 });
 ctx.font='bold 11px sans-serif';ctx.textAlign='center';ctx.fillStyle='#FFD700';
 ctx.fillText('XP: '+xp+' / '+maxXP,W/2,barY+barH/2+4);
 ctx.font='bold 16px sans-serif';ctx.fillStyle='#FFD700';
 ctx.fillText('현재 작위: '+TITLES[currentRank].icon+' '+TITLES[currentRank].name+' (Rank '+TITLES[currentRank].rank+')',W/2,barY+barH+30);
 var startY=barY+barH+50;
 TITLES.forEach(function(t,i){
  var y=startY+i*24;
  var earned=i<=currentRank;
  ctx.font='12px sans-serif';ctx.textAlign='left';
  ctx.fillStyle=earned?'#FFD700':'#3a3a4a';
  ctx.fillText((earned?'✅':'\u{1F512}')+' '+t.icon+' '+t.name+' (Rank '+t.rank+')',50,y);
  ctx.textAlign='right';ctx.fillStyle=earned?'#8a7a6a':'#2a2a3a';
  ctx.fillText(t.req+' | '+t.xp+'XP',W-50,y);
 });

 var ranks=document.getElementById('v24-title-ranks');if(!ranks)return;
 var html='<div style="text-align:center;margin-bottom:8px"><button class="mk-btn" style="border-color:#FFD700;color:#FFD700" onclick="earnXP24(500)">+500 XP 획득 (모의전투)</button></div>';
 ranks.innerHTML=html;
}

function earnXP24(amount){
 var xp=parseInt(localStorage.getItem('krpg_v24_xp')||'0');
 var oldRank=0;TITLES.forEach(function(t,i){if(xp>=t.xp)oldRank=i;});
 xp+=amount;localStorage.setItem('krpg_v24_xp',String(xp));
 var newRank=0;TITLES.forEach(function(t,i){if(xp>=t.xp)newRank=i;});
 if(newRank>oldRank){
  playSfx24('title_earn');toast24('\u{1F451} 승급! '+TITLES[newRank].icon+' '+TITLES[newRank].name,'#3a3a0a');
  checkAch24('title_rank_'+TITLES[newRank].rank);
 }else{
  playSfx24('supply_collect');toast24('+'+amount+' XP 획득');
 }
 renderTitleSystem();
}

// ════════════════════════════════════════
// 7. 군량/보급 관리 시스템
// ════════════════════════════════════════
var SUPPLY_TYPES=[
 {id:'grain',name:'곡물',icon:'\u{1F33E}',max:10000,daily:-50,desc:'병사 식량'},
 {id:'water',name:'수원',icon:'\u{1F4A7}',max:8000,daily:-30,desc:'식수 공급'},
 {id:'arrows',name:'화살',icon:'\u{1F3F9}',max:5000,daily:-20,desc:'궁병 소모품'},
 {id:'medicine_s',name:'약재',icon:'\u{1F48A}',max:3000,daily:-10,desc:'부상병 치료'},
 {id:'fodder',name:'마초',icon:'\u{1F33F}',max:6000,daily:-25,desc:'군마 사료'},
 {id:'wood_s',name:'목재',icon:'\u{1FAB5}',max:8000,daily:-15,desc:'건설/수리 자재'}
];

function openSupplyMgmt(){
 var p=document.getElementById('v24-supply-panel');
 if(!p){
  p=document.createElement('div');p.id='v24-supply-panel';p.className='v24-panel';
  p.innerHTML='<div class="supply-wrap"><h2>\u{1F4E6} 군량/보급 관리</h2><p class="v24-sub">6종 보급품 재고 + 일일소모 추적</p><canvas id="v24-supply-canvas" width="580" height="360"></canvas><div class="supply-actions" id="v24-supply-act"></div><button class="v24-close" onclick="closeSupplyMgmt()">닫기</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 renderSupply();playSfx24('supply_collect');checkAch24('supply_viewer');
}
function closeSupplyMgmt(){var p=document.getElementById('v24-supply-panel');if(p)p.classList.remove('on');}

function renderSupply(){
 var c=document.getElementById('v24-supply-canvas');if(!c)return;
 var ctx=c.getContext('2d');var W=c.width,H=c.height;
 ctx.clearRect(0,0,W,H);ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);
 var stocks=JSON.parse(localStorage.getItem('krpg_v24_supply')||'null');
 if(!stocks){stocks={};SUPPLY_TYPES.forEach(function(s){stocks[s.id]=Math.floor(s.max*0.7);});localStorage.setItem('krpg_v24_supply',JSON.stringify(stocks));}
 ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillStyle='#88cc66';
 ctx.fillText('보급품 재고 현황',W/2,24);
 var barW=60,gap=20,startX=50;
 var colors=['#FFD700','#4488cc','#cc8844','#44cc88','#88cc44','#8B6B3D'];
 SUPPLY_TYPES.forEach(function(s,i){
  var x=startX+i*(barW+gap);
  var stock=stocks[s.id]||0;
  var pct=stock/s.max;
  var barH=Math.max(2,pct*220);
  var grad=ctx.createLinearGradient(x,H-60-barH,x,H-60);
  grad.addColorStop(0,colors[i]);grad.addColorStop(1,colors[i]+'44');
  ctx.fillStyle=grad;
  ctx.beginPath();ctx.roundRect(x,H-60-barH,barW,barH,4);ctx.fill();
  var warnColor=pct<0.2?'#cc4444':pct<0.5?'#cccc44':'#44cc44';
  ctx.strokeStyle=warnColor;ctx.lineWidth=2;
  ctx.beginPath();ctx.roundRect(x,H-60-barH,barW,barH,4);ctx.stroke();
  ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.fillStyle=warnColor;
  ctx.fillText(Math.round(pct*100)+'%',x+barW/2,H-65-barH);
  ctx.font='9px sans-serif';ctx.fillStyle='#8a7a6a';
  ctx.fillText(stock+'/'+s.max,x+barW/2,H-48-barH);
  ctx.font='18px sans-serif';ctx.fillStyle='#e8dcc8';
  ctx.fillText(s.icon,x+barW/2,H-38);
  ctx.font='9px sans-serif';ctx.fillStyle='#8a7a6a';
  ctx.fillText(s.name,x+barW/2,H-20);
  ctx.fillStyle=s.daily<0?'#cc4444':'#44cc44';
  ctx.fillText(s.daily+'/일',x+barW/2,H-8);
 });
 var totalPct=0;SUPPLY_TYPES.forEach(function(s){totalPct+=(stocks[s.id]||0)/s.max;});
 totalPct=totalPct/SUPPLY_TYPES.length;
 var grade=totalPct>=0.8?'S':totalPct>=0.6?'A':totalPct>=0.4?'B':totalPct>=0.2?'C':'D';
 var gradeColor=grade==='S'?'#FFD700':grade==='A'?'#44cc44':grade==='B'?'#cccc44':grade==='C'?'#cc8844':'#cc4444';
 ctx.font='bold 18px sans-serif';ctx.textAlign='right';ctx.fillStyle=gradeColor;
 ctx.fillText('보급 등급: '+grade,W-20,24);

 var act=document.getElementById('v24-supply-act');if(!act)return;
 var html='';
 SUPPLY_TYPES.forEach(function(s){
  html+='<button class="sp-btn" onclick="resupply24(\''+s.id+'\')">'+s.icon+' '+s.name+' 보급</button>';
 });
 html+='<button class="sp-btn" style="border-color:#cc4444;color:#cc4444" onclick="consumeSupply24()">⏱️ 하루 경과</button>';
 act.innerHTML=html;
}

function resupply24(id){
 var stocks=JSON.parse(localStorage.getItem('krpg_v24_supply')||'{}');
 var type=SUPPLY_TYPES.find(function(s){return s.id===id;});if(!type)return;
 var add=Math.floor(type.max*0.2);
 stocks[id]=Math.min(type.max,(stocks[id]||0)+add);
 localStorage.setItem('krpg_v24_supply',JSON.stringify(stocks));
 playSfx24('supply_collect');toast24('✅ '+type.name+' +'+add+' 보급 완료');
 renderSupply();checkAch24('supply_resupply');
}

function consumeSupply24(){
 var stocks=JSON.parse(localStorage.getItem('krpg_v24_supply')||'{}');
 var crisis=false;
 SUPPLY_TYPES.forEach(function(s){
  stocks[s.id]=Math.max(0,(stocks[s.id]||0)+s.daily);
  if(stocks[s.id]<=0)crisis=true;
 });
 localStorage.setItem('krpg_v24_supply',JSON.stringify(stocks));
 if(crisis){playSfx24('supply_use');toast24('⚠️ 보급품 고갈! 긴급 보급 필요','#3a1a1a');}
 else{playSfx24('supply_use');toast24('⏱️ 하루 경과 - 보급품 소모');}
 renderSupply();
}

// ════════════════════════════════════════
// 8. 역사 퀴즈 리그 (실력 추적)
// ════════════════════════════════════════
function openQuizLeague(){
 var p=document.getElementById('v24-league-panel');
 if(!p){
  p=document.createElement('div');p.id='v24-league-panel';p.className='v24-panel';
  p.innerHTML='<div class="league-wrap"><h2>\u{1F3C6} 퀵즈 리그 실력 트래커</h2><p class="v24-sub">누적 퀵즈 성적 분석 + v24 15문항</p><canvas id="v24-league-canvas" width="600" height="380"></canvas><div class="league-stats" id="v24-league-stats"></div><div id="v24-quiz-area24"></div><button class="mk-btn" style="display:block;margin:12px auto;border-color:#FFD700;color:#FFD700" onclick="startQuiz24()">\u{1F4DD} v24 퀵즈 시작 (15문항)</button><button class="v24-close" onclick="closeQuizLeague()">닫기</button></div>';
  document.body.appendChild(p);
 }
 p.classList.add('on');
 renderLeague();playSfx24('league_win');checkAch24('league_viewer');
}
function closeQuizLeague(){var p=document.getElementById('v24-league-panel');if(p)p.classList.remove('on');}

function renderLeague(){
 var c=document.getElementById('v24-league-canvas');if(!c)return;
 var ctx=c.getContext('2d');var W=c.width,H=c.height;
 ctx.clearRect(0,0,W,H);ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);
 var history=JSON.parse(localStorage.getItem('krpg_v24_quiz_history')||'[]');
 ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillStyle='#5FA0FF';
 ctx.fillText('퀵즈 실력 추이 (최근 20회)',W/2,24);
 if(history.length===0){
  ctx.font='13px sans-serif';ctx.fillStyle='#5a5a6a';
  ctx.fillText('아직 퀵즈 기록이 없습니다',W/2,H/2);
 }else{
  var last20=history.slice(-20);
  var lineY=50,lineH=H-100;
  ctx.strokeStyle='#2a3a5a';ctx.lineWidth=1;
  for(var g=0;g<=100;g+=25){
   var gy=lineY+lineH*(1-g/100);
   ctx.beginPath();ctx.moveTo(50,gy);ctx.lineTo(W-20,gy);ctx.stroke();
   ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillStyle='#5a5a6a';
   ctx.fillText(g+'%',45,gy+4);
  }
  ctx.beginPath();ctx.strokeStyle='#5FA0FF';ctx.lineWidth=2;
  last20.forEach(function(h,i){
   var x=60+i*(W-80)/(Math.max(1,last20.length-1));
   var y=lineY+lineH*(1-h.pct/100);
   if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
  });
  ctx.stroke();
  last20.forEach(function(h,i){
   var x=60+i*(W-80)/(Math.max(1,last20.length-1));
   var y=lineY+lineH*(1-h.pct/100);
   ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);
   ctx.fillStyle=h.pct>=80?'#FFD700':h.pct>=60?'#44cc44':'#cc4444';
   ctx.fill();
  });
  var avg=0;history.forEach(function(h){avg+=h.pct;});avg=Math.round(avg/history.length);
  var avgY=lineY+lineH*(1-avg/100);
  ctx.beginPath();ctx.setLineDash([4,4]);ctx.strokeStyle='#FFD700';
  ctx.moveTo(50,avgY);ctx.lineTo(W-20,avgY);ctx.stroke();ctx.setLineDash([]);
  ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillStyle='#FFD700';
  ctx.fillText('평균 '+avg+'%',W-60,avgY-6);
 }
 var stats=document.getElementById('v24-league-stats');if(!stats)return;
 var totalQ=0,totalC=0;history.forEach(function(h){totalQ+=h.total;totalC+=h.correct;});
 var grade=history.length===0?'-':totalC/Math.max(1,totalQ)>=0.9?'S':totalC/Math.max(1,totalQ)>=0.7?'A':totalC/Math.max(1,totalQ)>=0.5?'B':'C';
 stats.innerHTML='<div class="ls-item"><div class="ls-val">'+history.length+'</div><div class="ls-label">회차</div></div>'+
  '<div class="ls-item"><div class="ls-val">'+totalC+'/'+totalQ+'</div><div class="ls-label">정답/총문항</div></div>'+
  '<div class="ls-item"><div class="ls-val" style="color:'+(grade==='S'?'#FFD700':grade==='A'?'#44cc44':'#cc8844')+'">'+grade+'</div><div class="ls-label">종합등급</div></div>';
}

// ─── 퀴즈 v24 15문항 (240→255 누적) ───
var QUIZ24=[
 {q:'고조선의 첽건 신화에서 환웅이 인간 세상으로 내려온 장소는?',a:['태백산 신단수','백두산 천지','한라산 봉우리'],c:0},
 {q:'고구려의 건국 신화에서 주몽이 탈출할 때 다리를 만들어준 동물들은?',a:['물고기와 거북이','용과 봉황','토끼와 사슴'],c:0},
 {q:'병법서 손자병법에서 “적을 알고 나를 알면” 결과는?',a:['백전백승','한번만 이기면 된다','전쟁을 피할 수 있다'],c:0},
 {q:'철기시대 철의 제련 온도는 약 몇 도인가?',a:['약 1200~1500도','약 800~1000도','약 500~700도'],c:0},
 {q:'고조선의 8조법금에서 살인자에 대한 처벌은?',a:['사형','유배','벌금'],c:0},
 {q:'부여의 영고 법적 범죄 처벌법으로 도둑은?',a:'12배 배상,사형,유배'.split(','),c:0},
 {q:'고구려의 대표적인 성공 방어 방식은?',a:['산성 축성술','수성 해자','평지 목책'],c:0},
 {q:'백제가 해상 무역으로 교류한 나라는?',a:['일본과 중국 남조','로마와 이집트','인도와 페르시아'],c:0},
 {q:'신라 화랑도의 세속오계 중 “사군이신”의 뜻은?',a:['충성으로 임금을 섬길 것','부모에게 효도할 것','살생을 함부로 죽이지 말 것'],c:0},
 {q:'가야가 철 생산으로 유명한 이유는?',a:['낚동강 유역의 풍부한 철광석','중국에서 기술 수입','외계인의 도움'],c:0},
 {q:'고조선의 빗살무늬 토기의 용도는?',a:['식량 저장','제사 의식','무기 제작'],c:0},
 {q:'고구려 광개토대왕의 업적 중 가장 대표적인 것은?',a:['만주 진출과 영토 확장','해상 무역 개척','불교 공인'],c:0},
 {q:'삼한의 변한이 위치한 지역은?',a:['한반도 남동부 (낚동강 유역)','한반도 북부','제주도'],c:0},
 {q:'고조선 시대 청동검의 주요 재료는?',a:['동과 주석의 합금','철과 니켈의 합금','금과 은의 합금'],c:0},
 {q:'부여의 대표적인 제천 행사 영고의 개최 시기는?',a:['음력 12월','음력 5월','음력 1월'],c:0}
];

function startQuiz24(){
 var area=document.getElementById('v24-quiz-area24');if(!area)return;
 renderQuiz24Item(0,0,area);
}

function renderQuiz24Item(idx,score,area){
 if(!area)area=document.getElementById('v24-quiz-area24');if(!area)return;
 if(idx>=QUIZ24.length){
  area.innerHTML='<div style="text-align:center;padding:20px"><p style="font-size:18px;color:#FFD700;margin-bottom:12px">퀵즈 완료!</p><p style="font-size:14px;color:#c4956a">'+score+'/'+QUIZ24.length+'문 정답 ('+Math.round(score/QUIZ24.length*100)+'%)</p></div>';
  var st=JSON.parse(localStorage.getItem('krpg_stats')||'{}');
  st.quizOk=(st.quizOk||0)+score;localStorage.setItem('krpg_stats',JSON.stringify(st));
  var history=JSON.parse(localStorage.getItem('krpg_v24_quiz_history')||'[]');
  history.push({correct:score,total:QUIZ24.length,pct:Math.round(score/QUIZ24.length*100)});
  localStorage.setItem('krpg_v24_quiz_history',JSON.stringify(history));
  if(score>=12)checkAch24('quiz24_12');
  if(score>=15)checkAch24('quiz24_perfect');
  renderLeague();
  return;
 }
 var q=QUIZ24[idx];
 var html='<div style="padding:16px"><p style="font-size:13px;color:#5FA0FF;margin-bottom:12px">문제 '+(idx+1)+'/'+QUIZ24.length+'</p><p style="font-size:14px;color:#e8dcc8;margin-bottom:16px;line-height:1.6">'+q.q+'</p>';
 q.a.forEach(function(a,i){
  html+='<button onclick="answerQuiz24('+idx+','+i+','+score+')" style="display:block;width:100%;text-align:left;padding:10px 14px;margin:6px 0;border:1px solid #2a3a5a;border-radius:8px;background:rgba(10,14,24,.6);color:#e8dcc8;font-size:12px;cursor:pointer;font-family:inherit">'+(i+1)+'. '+a+'</button>';
 });
 html+='</div>';
 area.innerHTML=html;
}

function answerQuiz24(idx,ans,score){
 var correct=QUIZ24[idx].c===ans;
 if(correct){score++;playSfx24('league_win');toast24('✅ 정답!');}
 else{playSfx24('supply_use');toast24('❌ 오답...');}
 renderQuiz24Item(idx+1,score);
}

// ─── 업적 v24 +12개 (168→180) ───
var ACH24=[
 {id:'tech_viewer',name:'기술 탐구자',desc:'기술 연구 트리 열람'},
 {id:'tech_6',name:'반번의 기술',desc:'6종 기술 연구'},
 {id:'tech_master',name:'전체 기술 완료',desc:'12종 기술 모두 연구'},
 {id:'market_viewer',name:'시장 방문자',desc:'고대 교역 시장 열람'},
 {id:'trader_10',name:'교역의 달인',desc:'10회 교역 완료'},
 {id:'terrain_viewer',name:'지형 분석가',desc:'전투 지형 시뮬 열람'},
 {id:'faction_viewer',name:'세력 연구가',desc:'세력 정보 프로필 열람'},
 {id:'advisor_viewer',name:'전략 상담가',desc:'전략 AI 어드바이저 열람'},
 {id:'title_viewer',name:'작위 탐색자',desc:'칭호/작위 시스템 열람'},
 {id:'supply_viewer',name:'보급관',desc:'군량/보급 관리 열람'},
 {id:'supply_resupply',name:'보급 완료',desc:'보급품 보급 실행'},
 {id:'league_viewer',name:'퀵즈 리그 참가',desc:'퀵즈 리그 열람'}
];

function checkAch24(id){
 var ach=JSON.parse(localStorage.getItem('krpg_ach')||'[]');
 if(ach.indexOf(id)>=0)return;
 var a=ACH24.find(function(ac){return ac.id===id;});if(!a)return;
 ach.push(id);localStorage.setItem('krpg_ach',JSON.stringify(ach));
 playSfx24('achieve_v24');toast24('\u{1F3C6} 업적 해금: '+a.name,'#5a3a0a');
}

// ─── 네비게이션 (기존 네비바에 append - 하단 고정 네비바 미생성) ───
function appendNavButtons24(){
 var existingNav=document.querySelector('[id$="-bottom-bar"]')||document.querySelector('.v22-bottom-bar')||document.querySelector('[class*="bottom-bar"]');
 if(!existingNav){
  var allBars=document.querySelectorAll('div[style*="position:fixed"][style*="bottom"]');
  if(allBars.length>0)existingNav=allBars[allBars.length-1];
 }
 if(!existingNav){
  existingNav=document.createElement('div');
  existingNav.id='v24-nav-container';
  existingNav.style.cssText='display:flex;gap:4px;justify-content:center;flex-wrap:wrap;padding:8px;margin:12px auto;max-width:600px';
  var gameArea=document.querySelector('.game-container')||document.querySelector('#game')||document.querySelector('[class*="container"]');
  if(gameArea)gameArea.appendChild(existingNav);
  else document.body.appendChild(existingNav);
 }
 var buttons=[
  {label:'\u{1F4DA}기술',fn:'openTechTree'},
  {label:'\u{1F3EA}시장',fn:'openMarket'},
  {label:'\u{1F5FA}️지형',fn:'openTerrainSim'},
  {label:'\u{1F3DB}️세력',fn:'openFactionProfile'},
  {label:'\u{1F9D9}전략',fn:'openAdvisor'},
  {label:'\u{1F3C5}작위',fn:'openTitleSystem'},
  {label:'\u{1F4E6}보급',fn:'openSupplyMgmt'},
  {label:'\u{1F3C6}리그',fn:'openQuizLeague'}
 ];
 buttons.forEach(function(b){
  if(document.querySelector('[data-v24-nav="'+b.fn+'"]'))return;
  var btn=document.createElement('button');
  btn.setAttribute('data-v24-nav',b.fn);
  btn.textContent=b.label;
  btn.style.cssText='padding:4px 8px;border:1px solid #3a3a4a;border-radius:4px;background:rgba(26,20,40,.8);color:#c4956a;font-size:9px;cursor:pointer;font-family:inherit';
  btn.onclick=function(){if(window[b.fn])window[b.fn]();};
  existingNav.appendChild(btn);
 });
}

setTimeout(appendNavButtons24,1800);

// ─── 키보드 단축키 Shift+1/2/3/4/5/6/7/8 ───
document.addEventListener('keydown',function(e){
 if(!e.shiftKey)return;
 var panels={
  '!':openTechTree,'@':openMarket,'#':openTerrainSim,'$':openFactionProfile,
  '%':openAdvisor,'^':openTitleSystem,'&':openSupplyMgmt,'*':openQuizLeague
 };
 if(panels[e.key]){e.preventDefault();panels[e.key]();}
});

// ─── ESC 닫기 ───
document.addEventListener('keydown',function(e){
 if(e.key==='Escape'){
  ['v24-tech-panel','v24-market-panel','v24-terrain-panel','v24-faction-panel','v24-advisor-panel','v24-title-panel','v24-supply-panel','v24-league-panel'].forEach(function(id){
   var p=document.getElementById(id);if(p)p.classList.remove('on');
  });
 }
});

// ─── URL 파라미터 처리 ───
(function(){
 var params=new URLSearchParams(window.location.search);
 var openMap={
  'techtree':openTechTree,'market':openMarket,'terrainsim':openTerrainSim,
  'faction':openFactionProfile,'advisor':openAdvisor,'titles':openTitleSystem,
  'supply':openSupplyMgmt,'quizleague':openQuizLeague
 };
 var openParam=params.get('open');
 if(openParam&&openMap[openParam])setTimeout(function(){openMap[openParam]();},1000);
})();

// ─── 전역 함수 노출 ───
window.openTechTree=openTechTree;
window.closeTechTree=closeTechTree;
window.researchTech=researchTech;
window.openMarket=openMarket;
window.closeMarket=closeMarket;
window.tradeResource=tradeResource;
window.refreshMarketRates=refreshMarketRates;
window.openTerrainSim=openTerrainSim;
window.closeTerrainSim=closeTerrainSim;
window.selectTerrain24=selectTerrain24;
window.openFactionProfile=openFactionProfile;
window.closeFactionProfile=closeFactionProfile;
window.viewFaction24=viewFaction24;
window.openAdvisor=openAdvisor;
window.closeAdvisor=closeAdvisor;
window.openTitleSystem=openTitleSystem;
window.closeTitleSystem=closeTitleSystem;
window.earnXP24=earnXP24;
window.openSupplyMgmt=openSupplyMgmt;
window.closeSupplyMgmt=closeSupplyMgmt;
window.resupply24=resupply24;
window.consumeSupply24=consumeSupply24;
window.openQuizLeague=openQuizLeague;
window.closeQuizLeague=closeQuizLeague;
window.startQuiz24=startQuiz24;
window.renderQuiz24Item=renderQuiz24Item;
window.answerQuiz24=answerQuiz24;

})();
