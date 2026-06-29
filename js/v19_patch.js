// v19_patch.js — 한국사 영웅전 v19.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v19-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:138;overflow-y:auto;padding:16px}',
'.v19-panel.on{display:block}',
'.v19-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v19-sub{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v19-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v19-close:hover{background:#8B2A1A}',

'.astro-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.astro-wrap canvas{border:2px solid #2a3a5a;border-radius:10px;background:#040810;display:block;margin:0 auto 12px;cursor:pointer}',
'.astro-tabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.astro-tab{padding:6px 14px;border:1px solid #2a3a5a;border-radius:6px;background:#0a0a1e;color:#e8dcc8;font-size:10px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.astro-tab:hover{border-color:#5FA0FF}',
'.astro-tab.selected{border-color:#5FA0FF;background:#0a1a2e;color:#00E5FF}',
'.astro-info{font-size:11px;color:#8a8aaa;text-align:center;line-height:1.8;max-width:400px;margin:0 auto 12px;background:rgba(10,10,30,.8);border:1px solid #2a2a4a;border-radius:8px;padding:12px}',
'.astro-info strong{color:#5FA0FF}',

'.chronicle-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.chronicle-wrap canvas{border:2px solid #5a3a2a;border-radius:10px;background:#0a0a0e;display:block;margin:0 auto 12px}',
'.chron-cards{display:grid;grid-template-columns:1fr;gap:8px;max-width:480px;margin:0 auto}',
'.chron-card{background:linear-gradient(135deg,rgba(30,20,10,.95),rgba(20,15,5,.98));border:1px solid #4a3a2a;border-radius:10px;padding:10px 14px;text-align:left;transition:all .3s;cursor:pointer}',
'.chron-card:hover{border-color:#FF9800;transform:translateY(-2px)}',
'.chron-card.viewed{border-color:#4CAF50;opacity:.75}',
'.chron-card .cc-year{font-size:9px;color:#FF9800;font-weight:700}',
'.chron-card .cc-title{font-size:12px;color:#FFD700;font-weight:700;margin-top:2px}',
'.chron-card .cc-desc{font-size:10px;color:#8a8a6a;margin-top:2px;line-height:1.5}',

'.diplo-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.diplo-wrap canvas{border:2px solid #3a4a3a;border-radius:10px;background:#0a100a;display:block;margin:0 auto 12px}',
'.diplo-nations{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px;margin:8px 0}',
'.dn-card{background:rgba(15,25,15,.9);border:1px solid #3a5a3a;border-radius:8px;padding:10px;text-align:center;cursor:pointer;transition:all .2s}',
'.dn-card:hover{border-color:#4CAF50;transform:scale(1.05)}',
'.dn-card.allied{border-color:#FFD700;background:rgba(40,30,10,.9)}',
'.dn-card .dn-icon{font-size:24px}',
'.dn-card .dn-name{font-size:10px;color:#4CAF50;font-weight:700;margin-top:2px}',
'.dn-card .dn-rel{font-size:9px;color:#8a8a6a;margin-top:2px}',
'.diplo-actions{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:10px 0}',

'.cipher-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.cipher-wrap canvas{border:2px solid #4a3a5a;border-radius:10px;background:#0a0814;display:block;margin:0 auto 12px}',
'.cipher-input{display:flex;gap:4px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.ci-char{width:36px;height:40px;border:2px solid #4a3a5a;border-radius:6px;background:#1a1428;color:#FFD700;font-size:16px;font-weight:700;text-align:center;line-height:40px;cursor:pointer;transition:all .2s;font-family:inherit}',
'.ci-char:hover{border-color:#aa88ff}',
'.ci-char.solved{border-color:#4CAF50;color:#4CAF50;background:#1a2a1a}',
'.cipher-keys{display:flex;gap:4px;justify-content:center;flex-wrap:wrap;margin:8px 0}',
'.ck-btn{width:32px;height:32px;border:1px solid #3a3a5a;border-radius:4px;background:#1a1a2a;color:#e8dcc8;font-size:13px;cursor:pointer;font-family:inherit;transition:all .2s}',
'.ck-btn:hover{border-color:#aa88ff;background:#2a2a3a}',

'.armory-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;max-width:560px;margin:0 auto}',
'.armory-card{background:linear-gradient(135deg,rgba(25,20,10,.95),rgba(18,14,6,.98));border:2px solid #5a4a2a;border-radius:12px;padding:12px;text-align:center;transition:all .3s;cursor:pointer}',
'.armory-card:hover{border-color:#FF9800;transform:translateY(-3px)}',
'.armory-card.collected{border-color:#FFD700;background:linear-gradient(135deg,rgba(40,35,15,.95),rgba(30,25,8,.98))}',
'.armory-card .ac-icon{font-size:32px;margin-bottom:4px}',
'.armory-card .ac-name{font-size:11px;color:#FFD700;font-weight:700}',
'.armory-card .ac-era{font-size:9px;color:#8a7a5a;margin-top:2px}',
'.armory-card .ac-stat{font-size:9px;color:#FF9800;margin-top:4px}',

'.sentiment-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.sentiment-wrap canvas{border:2px solid #3a4a5a;border-radius:10px;background:#0a0a14;display:block;margin:0 auto 12px}',
'.sent-sliders{max-width:400px;margin:0 auto}',
'.ss-row{display:flex;align-items:center;gap:8px;margin:6px 0}',
'.ss-label{font-size:10px;color:#8a8aaa;width:60px;text-align:right}',
'.ss-slider{flex:1;-webkit-appearance:none;height:6px;border-radius:3px;background:#1a1a2e;outline:none}',
'.ss-slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#5FA0FF;cursor:pointer}',
'.ss-val{font-size:10px;color:#FFD700;width:30px}',

'.board-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.board-wrap canvas{border:2px solid #4a4a3a;border-radius:10px;background:#0a0a0e;display:block;margin:0 auto 12px;cursor:pointer}',
'.board-status{font-size:12px;color:#c4956a;margin:8px 0}',
'.board-controls{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0}',

'.jukebox-wrap{max-width:560px;margin:0 auto;text-align:center}',
'.jb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;margin:8px 0}',
'.jb-card{background:linear-gradient(135deg,rgba(20,15,30,.95),rgba(12,10,20,.98));border:1px solid #4a3a5a;border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:all .3s}',
'.jb-card:hover{border-color:#aa88ff;transform:translateY(-2px)}',
'.jb-card.playing{border-color:#FFD700;box-shadow:0 0 12px rgba(255,215,0,.2)}',
'.jb-card .jb-icon{font-size:28px}',
'.jb-card .jb-name{font-size:10px;color:#aa88ff;font-weight:700;margin-top:4px}',
'.jb-card .jb-info{font-size:8px;color:#6a6a8a;margin-top:2px}'
].join('\n');
document.head.appendChild(css);

function v19Toast(msg,c){var t=document.createElement('div');t.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:'+(c||'#c4956a')+'22;color:'+(c||'#c4956a')+';border:1px solid '+(c||'#c4956a')+'44;padding:10px 20px;border-radius:12px;font-size:12px;font-weight:700;z-index:200;pointer-events:none;animation:fadeIn .3s ease';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.remove()},2000)}

var actx;function v19SFX(type){try{if(!actx)actx=new(window.AudioContext||window.webkitAudioContext)();var o=actx.createOscillator(),g=actx.createGain();o.connect(g);g.connect(actx.destination);var f={star_view:523,star_select:659,chron_open:294,chron_view:370,diplo_talk:349,diplo_ally:440,cipher_key:494,cipher_solve:660,armory_view:330,armory_collect:554,sent_adjust:262,sent_good:523,board_place:392,board_win:784,music_play:440,music_stop:220};o.frequency.value=f[type]||330;o.type=({star_view:'sine',board_place:'square',cipher_key:'triangle',music_play:'sine'})[type]||'sine';g.gain.value=0.12;o.start();g.gain.exponentialRampToValueAtTime(0.001,actx.currentTime+0.3);o.stop(actx.currentTime+0.3)}catch(e){}}

function makePanel19(id){var existing=document.getElementById(id);if(existing)existing.remove();var p=document.createElement('div');p.id=id;p.className='v19-panel';document.body.appendChild(p);return p}

// ─── 1. 고대 천문관 (Ancient Observatory Canvas) ───
var CONSTELLATIONS=[
{name:'각수(角宿)',stars:2,season:'봄',guardian:'청룡',desc:'봄의 시작을 알리는 별, 동방 청룡의 뿔. 농사 시작의 기준점.',x:0.2,y:0.3},
{name:'항수(亢宿)',stars:4,season:'봄',guardian:'청룡',desc:'청룡의 목. 가뭄과 홍수를 예측하는 별자리.',x:0.25,y:0.25},
{name:'저수(氐宿)',stars:4,season:'봄',guardian:'청룡',desc:'청룡의 가슴. 천자의 행궁으로 여행과 외교를 관장.',x:0.3,y:0.2},
{name:'방수(房宿)',stars:4,season:'봄',guardian:'청룡',desc:'청룡의 배. 하늘의 재상으로 정사의 길흉을 나타냄.',x:0.35,y:0.22},
{name:'심수(心宿)',stars:3,season:'여름',guardian:'청룡',desc:'청룡의 심장. 천왕의 자리, 전갈자리의 안타레스.',x:0.4,y:0.18},
{name:'미수(尾宿)',stars:9,season:'여름',guardian:'청룡',desc:'청룡의 꼬리. 후궁과 자손을 관장하는 별.',x:0.45,y:0.15},
{name:'기수(箕宿)',stars:4,season:'여름',guardian:'청룡',desc:'키질하는 도구. 바람을 관장하며 흉년을 예고.',x:0.5,y:0.2},
{name:'두수(斗宿)',stars:6,season:'여름',guardian:'현무',desc:'북방 현무의 머리. 하늘의 재물과 식록을 관장.',x:0.55,y:0.35},
{name:'우수(牛宿)',stars:6,season:'가을',guardian:'현무',desc:'견우성. 칠월 칠석 견우직녀 설화의 별.',x:0.6,y:0.4},
{name:'여수(女宿)',stars:4,season:'가을',guardian:'현무',desc:'직녀성. 길쌈과 여성의 일을 관장하는 별.',x:0.65,y:0.45},
{name:'허수(虛宿)',stars:2,season:'가을',guardian:'현무',desc:'하늘의 빈 곳. 애도와 눈물, 장례를 관장.',x:0.7,y:0.5},
{name:'위수(危宿)',stars:3,season:'가을',guardian:'현무',desc:'지붕 위의 별. 건축과 성벽을 관장.',x:0.75,y:0.45},
{name:'실수(室宿)',stars:2,season:'겨울',guardian:'현무',desc:'하늘의 집. 제사와 종묘를 관장하는 별.',x:0.8,y:0.4},
{name:'벽수(壁宿)',stars:2,season:'겨울',guardian:'현무',desc:'하늘의 벽. 학문과 서적을 관장.',x:0.82,y:0.35},
{name:'규수(奎宿)',stars:16,season:'겨울',guardian:'백호',desc:'서방 백호의 머리. 문장과 무기고를 관장.',x:0.78,y:0.55},
{name:'누수(婁宿)',stars:3,season:'겨울',guardian:'백호',desc:'백호의 목. 목축과 희생 제물을 관장.',x:0.72,y:0.6},
{name:'위수(胃宿)',stars:3,season:'봄',guardian:'백호',desc:'하늘의 창고. 곡식과 보급을 관장.',x:0.66,y:0.65},
{name:'묘수(昴宿)',stars:7,season:'봄',guardian:'백호',desc:'좀생이별(플레이아데스). 장수를 예측.',x:0.58,y:0.7},
{name:'필수(畢宿)',stars:8,season:'봄',guardian:'백호',desc:'그물별. 사냥과 군사 훈련을 관장.',x:0.5,y:0.72},
{name:'자수(觜宿)',stars:3,season:'여름',guardian:'백호',desc:'백호의 입. 전쟁과 군율을 관장.',x:0.42,y:0.7},
{name:'삼수(參宿)',stars:7,season:'여름',guardian:'백호',desc:'오리온의 삼태성. 형벌과 변경을 관장.',x:0.35,y:0.65},
{name:'정수(井宿)',stars:8,season:'여름',guardian:'주작',desc:'남방 주작의 머리. 수리와 법률을 관장.',x:0.28,y:0.6},
{name:'귀수(鬼宿)',stars:4,season:'여름',guardian:'주작',desc:'귀신의 수레. 적성(積屍)이 포함된 무서운 별.',x:0.22,y:0.55},
{name:'유수(柳宿)',stars:8,season:'가을',guardian:'주작',desc:'주작의 부리. 주방과 음식을 관장.',x:0.18,y:0.5},
{name:'성수(星宿)',stars:7,season:'가을',guardian:'주작',desc:'주작의 목. 의복과 직물을 관장.',x:0.15,y:0.45},
{name:'장수(張宿)',stars:6,season:'가을',guardian:'주작',desc:'주작의 날개. 연회와 음악을 관장.',x:0.13,y:0.4},
{name:'익수(翼宿)',stars:22,season:'겨울',guardian:'주작',desc:'주작의 날개깃. 음악과 연극을 관장.',x:0.15,y:0.35},
{name:'진수(軫宿)',stars:4,season:'겨울',guardian:'주작',desc:'주작의 꼬리 수레. 바람과 죽음을 관장.',x:0.18,y:0.32}
];
var astroFilter='전체';var astroViewed=[];
function saveAstro(){try{localStorage.setItem('krpg_v19_astro',JSON.stringify(astroViewed))}catch(e){}}
function loadAstro(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_astro'));if(d)astroViewed=d}catch(e){}}

function drawAstroCanvas(canvas){
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
var grd=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*0.55);
grd.addColorStop(0,'#080818');grd.addColorStop(1,'#020208');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
for(var i=0;i<120;i++){ctx.fillStyle='rgba(255,255,255,'+(Math.random()*0.4+0.1)+')';ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H,Math.random()*1.2+0.3,0,Math.PI*2);ctx.fill();}
var guardColors={'청룡':'#4CAF50','현무':'#5FA0FF','백호':'#FFD700','주작':'#FF5FA2'};
var filtered=CONSTELLATIONS.filter(function(c){return astroFilter==='전체'||c.guardian===astroFilter||c.season===astroFilter});
filtered.forEach(function(c,ci){
var cx=W*c.x,cy=H*c.y;
var color=guardColors[c.guardian]||'#888';
var viewed=astroViewed.indexOf(c.name)>=0;
ctx.fillStyle=viewed?color+'88':color+'44';ctx.beginPath();ctx.arc(cx,cy,viewed?6:4,0,Math.PI*2);ctx.fill();
if(viewed){ctx.strokeStyle=color;ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,10,0,Math.PI*2);ctx.stroke();}
ctx.fillStyle=viewed?'#e8dcc8':'#6a6a8a';ctx.font=(viewed?'bold ':'')+' 8px sans-serif';ctx.textAlign='center';ctx.fillText(c.name.split('(')[0],cx,cy-12);
for(var s=0;s<c.stars&&s<5;s++){var sx=cx-8+s*4,sy=cy+8;ctx.fillStyle=color;ctx.beginPath();ctx.arc(sx,sy,1.5,0,Math.PI*2);ctx.fill();}
});
ctx.fillStyle='#c4956a';ctx.font='11px sans-serif';ctx.textAlign='center';
ctx.fillText('28수 천문도 (관측: '+astroViewed.length+'/28)',W/2,H-8);
var guardians=[{name:'청룡',x:0.12,y:0.12,c:'#4CAF50'},{name:'현무',x:0.88,y:0.12,c:'#5FA0FF'},{name:'백호',x:0.88,y:0.88,c:'#FFD700'},{name:'주작',x:0.12,y:0.88,c:'#FF5FA2'}];
guardians.forEach(function(g){ctx.fillStyle=g.c;ctx.font='bold 10px sans-serif';ctx.fillText(g.name,W*g.x,H*g.y);});
}

function renderAstroPanel(){
var p=makePanel19('v19-astro');
p.innerHTML='<h2>⭐ 고대 천문관</h2><p class="v19-sub">28수 별자리를 관측하고 하늘의 비밀을 풀어라! (관측: '+astroViewed.length+'/28)</p>';
var wrap=document.createElement('div');wrap.className='astro-wrap';
var canvas=document.createElement('canvas');canvas.width=520;canvas.height=400;
canvas.onclick=function(ev){
var rect=canvas.getBoundingClientRect();var mx=(ev.clientX-rect.left)/rect.width*520;var my=(ev.clientY-rect.top)/rect.height*400;
var filtered=CONSTELLATIONS.filter(function(c){return astroFilter==='전체'||c.guardian===astroFilter||c.season===astroFilter});
filtered.forEach(function(c){
var cx=520*c.x,cy=400*c.y;
if(Math.abs(mx-cx)<15&&Math.abs(my-cy)<15){
if(astroViewed.indexOf(c.name)<0){astroViewed.push(c.name);saveAstro();v19SFX('star_select');
if(astroViewed.length>=1)v19CheckAch('astro_first');if(astroViewed.length>=14)v19CheckAch('astro_half');if(astroViewed.length>=28)v19CheckAch('astro_all');}
v19Toast(c.name+' — '+c.desc,'#5FA0FF');drawAstroCanvas(canvas);
}
});
};
wrap.appendChild(canvas);drawAstroCanvas(canvas);
var tabs=document.createElement('div');tabs.className='astro-tabs';
['전체','청룡','현무','백호','주작','봄','여름','가을','겨울'].forEach(function(f){
var btn=document.createElement('button');btn.className='astro-tab'+(astroFilter===f?' selected':'');btn.textContent=f;
btn.onclick=function(){astroFilter=f;v19SFX('star_view');renderAstroPanel();document.getElementById('v19-astro').classList.add('on');};
tabs.appendChild(btn);
});
wrap.appendChild(tabs);
var info=document.createElement('div');info.className='astro-info';
info.innerHTML='<strong>고조선의 천문 관측</strong><br>고조선 사람들은 28수 별자리로 하늘을 4구역(청룡/현무/백호/주작)으로 나누어 농사의 시기와 국가의 길흥을 점쳤다.<br>별을 클릭하여 관측하라!';
wrap.appendChild(info);
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-astro\').classList.remove(\'on\')">닫기</button>';
}

// ─── 2. 전쟁 연대기 (War Chronicle Timeline Canvas) ───
var WAR_CHRONICLES=[
{year:'BC 2333',title:'환웅의 범족 토벌',desc:'환웅이 범족(호랑이 부족)을 물리치고 신시를 건설하다.',icon:'⚡',era:'신시'},
{year:'BC 2000',title:'고조선 번경 수비',desc:'단군이 아사달의 번경을 수비하고 영토를 확장하다.',icon:'👑',era:'고조선'},
{year:'BC 1500',title:'청동기 무기 혁명',desc:'비파형동검의 대량 제작으로 군사력 대폭 강화.',icon:'⚔️',era:'청동기'},
{year:'BC 1000',title:'요동 진출',desc:'고조선이 요동 반도로 진출하여 세력을 확장하다.',icon:'🏹',era:'고조선'},
{year:'BC 800',title:'요서 영토 확보',desc:'고조선이 요서 지방까지 영토를 넓혀 최대 판도를 달성.',icon:'🗺️',era:'고조선'},
{year:'BC 400',title:'연나라와의 충돌',desc:'전국시대 연나라와 고조선 서부 경계 충돌.',icon:'🗡️',era:'고조선'},
{year:'BC 300',title:'진개의 침공',desc:'진나라 장수 진개가 고조선 서부를 공격하다.',icon:'⚔️',era:'고조선'},
{year:'BC 194',title:'위만의 반란',desc:'연나라 유민 위만이 준왕을 몰아내고 정권을 찬탈.',icon:'🗡️',era:'위만조선'},
{year:'BC 128',title:'창해군 설치',desc:'한 무제가 고조선 남부에 창해군을 설치하다.',icon:'🏯',era:'위만조선'},
{year:'BC 109',title:'한 무제의 침공',desc:'한 무제가 5만 대군으로 위만조선을 침공하다.',icon:'⚔️',era:'위만조선'},
{year:'BC 108',title:'왕검성 함락',desc:'위만조선의 수도 왕검성이 함락, 고조선 멸망.',icon:'🏰',era:'위만조선'},
{year:'BC 86',title:'부여 건국',desc:'동명왕이 부여를 건국, 고조선의 전통을 계승.',icon:'🏛️',era:'부여'},
{year:'BC 57',title:'삼한 정립',desc:'마한단군이 나타나고 진한변한이 정립, 삼국의 서막.',icon:'⚖️',era:'삼한'},
{year:'BC 37',title:'주몬의 고구려 건국',desc:'부여에서 탈출한 주몽이 고구려를 건국하다.',icon:'🏹',era:'삼국'},
{year:'BC 18',title:'백제 건국',desc:'온조가 위례성에 백제를 건국하다.',icon:'🏯',era:'삼국'},
{year:'AD 42',title:'가야 건국',desc:'김수로왕이 금관가야를 건국, 6가야 통합.',icon:'👑',era:'삼국'}
];
var chronViewed=[];
function saveChron(){try{localStorage.setItem('krpg_v19_chron',JSON.stringify(chronViewed))}catch(e){}}
function loadChron(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_chron'));if(d)chronViewed=d}catch(e){}}

function drawChronCanvas(canvas){
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a0e';ctx.fillRect(0,0,W,H);
ctx.strokeStyle='#3a2a1a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(W*0.06,H*0.5);ctx.lineTo(W*0.94,H*0.5);ctx.stroke();
var n=WAR_CHRONICLES.length;
WAR_CHRONICLES.forEach(function(c,i){
var x=W*0.06+i*(W*0.88/(n-1));var y=H*0.5;var above=i%2===0;var dy=above?-40:40;
var viewed=chronViewed.indexOf(i)>=0;
ctx.fillStyle=viewed?'#FFD700':'#5a4a3a';ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fill();
ctx.strokeStyle=viewed?'#c4956a44':'#2a2a3a';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+dy);ctx.stroke();
ctx.fillStyle=viewed?'#FFD700':'#6a5a4a';ctx.font='bold 7px sans-serif';ctx.textAlign='center';
ctx.fillText(c.year,x,y+dy+(above?-6:12));
ctx.fillStyle=viewed?'#e8dcc8':'#4a4a5a';ctx.font='7px sans-serif';
var titleShort=c.title.length>6?c.title.substr(0,6)+'…':c.title;
ctx.fillText(titleShort,x,y+dy+(above?-16:22));
});
ctx.fillStyle='#c4956a';ctx.font='11px sans-serif';ctx.textAlign='center';
ctx.fillText('전쟁 연대기 (기록: '+chronViewed.length+'/'+n+')',W/2,H*0.95);
}

function renderChronPanel(){
var p=makePanel19('v19-chron');
p.innerHTML='<h2>📜 전쟁 연대기</h2><p class="v19-sub">고조선부터 삼국시대까지 16건 주요 전쟁 기록 (열람: '+chronViewed.length+'/16)</p>';
var wrap=document.createElement('div');wrap.className='chronicle-wrap';
var canvas=document.createElement('canvas');canvas.width=520;canvas.height=180;
wrap.appendChild(canvas);drawChronCanvas(canvas);
var cards=document.createElement('div');cards.className='chron-cards';
WAR_CHRONICLES.forEach(function(c,i){
var card=document.createElement('div');card.className='chron-card'+(chronViewed.indexOf(i)>=0?' viewed':'');
card.innerHTML='<div class="cc-year">'+c.icon+' '+c.year+' \xB7 '+c.era+'</div><div class="cc-title">'+c.title+'</div><div class="cc-desc">'+c.desc+'</div>';
card.onclick=function(){
if(chronViewed.indexOf(i)<0){chronViewed.push(i);saveChron();v19SFX('chron_view');
if(chronViewed.length>=1)v19CheckAch('chron_first');if(chronViewed.length>=8)v19CheckAch('chron_half');if(chronViewed.length>=16)v19CheckAch('chron_all');}
v19Toast(c.title+' — '+c.year,'#FF9800');renderChronPanel();document.getElementById('v19-chron').classList.add('on');
};
cards.appendChild(card);
});
wrap.appendChild(cards);
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-chron\').classList.remove(\'on\')">닫기</button>';
}

// ─── 3. 외교 회담장 (Diplomacy Summit Canvas) ───
var DIPLO_NATIONS=[
{name:'부여',icon:'🥌',rel:50,trait:'군사 강국',resource:'철기'},
{name:'예맥',icon:'🏹',rel:60,trait:'궁술 명가',resource:'활'},
{name:'옥저',icon:'⚓',rel:45,trait:'해산물 풍부',resource:'소금'},
{name:'동예',icon:'🎭',rel:55,trait:'무천 축제',resource:'비단'},
{name:'삼한',icon:'🌾',rel:40,trait:'농업 발달',resource:'쌓'}
];
var diploState={relations:{},alliances:[],treaties:0};
function saveDiplo(){try{localStorage.setItem('krpg_v19_diplo',JSON.stringify(diploState))}catch(e){}}
function loadDiplo(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_diplo'));if(d)diploState=d}catch(e){}}

function drawDiploCanvas(canvas){
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a100a';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#FFD700';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('고조선',W/2,H*0.15);
ctx.fillStyle='#c4956a';ctx.beginPath();ctx.arc(W/2,H*0.22,12,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#FFD700';ctx.font='16px sans-serif';ctx.fillText('⭐',W/2,H*0.23+4);
var positions=[{x:0.15,y:0.65},{x:0.35,y:0.85},{x:0.5,y:0.65},{x:0.65,y:0.85},{x:0.85,y:0.65}];
DIPLO_NATIONS.forEach(function(n,i){
var px=W*positions[i].x,py=H*positions[i].y;
var rel=diploState.relations[n.name]||n.rel;var allied=diploState.alliances.indexOf(n.name)>=0;
ctx.strokeStyle=allied?'#FFD700':rel>70?'#4CAF50':rel>40?'#FF9800':'#FF4444';ctx.lineWidth=allied?3:1.5;
ctx.setLineDash(allied?[]:[5,3]);ctx.beginPath();ctx.moveTo(W/2,H*0.22+12);ctx.lineTo(px,py-12);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle=allied?'rgba(40,30,10,.9)':'rgba(15,25,15,.9)';ctx.beginPath();ctx.arc(px,py,16,0,Math.PI*2);ctx.fill();
ctx.strokeStyle=allied?'#FFD700':'#3a5a3a';ctx.lineWidth=2;ctx.stroke();
ctx.fillStyle='#e8dcc8';ctx.font='16px sans-serif';ctx.textAlign='center';ctx.fillText(n.icon,px,py+5);
ctx.fillStyle=allied?'#FFD700':'#4CAF50';ctx.font='bold 9px sans-serif';ctx.fillText(n.name,px,py+30);
ctx.fillStyle=rel>70?'#4CAF50':rel>40?'#FF9800':'#FF4444';ctx.font='8px sans-serif';ctx.fillText('❤️ '+rel,px,py+40);
});
}

function renderDiploPanel(){
var p=makePanel19('v19-diplo');
p.innerHTML='<h2>🤝 외교 회담장</h2><p class="v19-sub">주변 5국과 외교 회담을 진행하라! (조약: '+diploState.treaties+', 동맹: '+diploState.alliances.length+')</p>';
var wrap=document.createElement('div');wrap.className='diplo-wrap';
var canvas=document.createElement('canvas');canvas.width=520;canvas.height=300;
wrap.appendChild(canvas);drawDiploCanvas(canvas);
var nations=document.createElement('div');nations.className='diplo-nations';
DIPLO_NATIONS.forEach(function(n){
var rel=diploState.relations[n.name]||n.rel;var allied=diploState.alliances.indexOf(n.name)>=0;
var card=document.createElement('div');card.className='dn-card'+(allied?' allied':'');
card.innerHTML='<div class="dn-icon">'+n.icon+'</div><div class="dn-name">'+n.name+'</div><div class="dn-rel">❤️ '+rel+' \xB7 '+n.trait+'</div>'+(allied?'<div style="font-size:8px;color:#FFD700;margin-top:2px">⭐ 동맹</div>':'');
card.onclick=function(){
var newRel=Math.min(100,(diploState.relations[n.name]||n.rel)+15);
diploState.relations[n.name]=newRel;
if(newRel>=80&&diploState.alliances.indexOf(n.name)<0){diploState.alliances.push(n.name);v19SFX('diplo_ally');v19Toast(n.name+'과 동맹 체결!','#FFD700');
if(diploState.alliances.length>=1)v19CheckAch('diplo_first_ally');if(diploState.alliances.length>=5)v19CheckAch('diplo_all_ally');
}else{v19SFX('diplo_talk');v19Toast(n.name+' 외교: 우호도 '+newRel,'#4CAF50');}
diploState.treaties++;saveDiplo();renderDiploPanel();document.getElementById('v19-diplo').classList.add('on');
};
nations.appendChild(card);
});
wrap.appendChild(nations);
var btns=document.createElement('div');btns.className='diplo-actions';
var resetBtn=document.createElement('button');resetBtn.className='da-btn';resetBtn.textContent='🔄 관계 초기화';
resetBtn.onclick=function(){diploState.relations={};diploState.alliances=[];saveDiplo();v19Toast('외교 관계 초기화!','#FF6644');renderDiploPanel();document.getElementById('v19-diplo').classList.add('on');};
btns.appendChild(resetBtn);wrap.appendChild(btns);
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-diplo\').classList.remove(\'on\')">닫기</button>';
}

// ─── 4. 고대 암호 해독기 (Ancient Cipher Decoder) ───
var CIPHER_PUZZLES=[
{title:'단군의 비밀 칙령',cipher:'⚡🌾🏛️⭐🗡️',answer:'홍익인간',hint:'환웅이 태백산에서 펼 이념',difficulty:1},
{title:'비파형동검 명문',cipher:'🗡️👑🏹🏰⚔️',answer:'고조선건국',hint:'단군왕검이 세운 나라',difficulty:2},
{title:'팔조법금 암호',cipher:'⚖️📜👑🌾🤝',answer:'법을지켜라',hint:'고조선의 8조 법률',difficulty:2},
{title:'위만의 밀서',cipher:'🗡️🏰⚔️👑📜',answer:'왕검성함락',hint:'BC 108년의 대사건',difficulty:3},
{title:'주몽의 유언',cipher:'🏹🌾⚡👑🏛️',answer:'고구려건국',hint:'부여에서 탈출한 영웅이 세운 나라',difficulty:3},
{title:'온조의 결의',cipher:'🏯👑🌾🤝🏰',answer:'위례성백제',hint:'온조가 건국한 곳',difficulty:3}
];
var cipherState={solved:[],attempts:0};
function saveCipher(){try{localStorage.setItem('krpg_v19_cipher',JSON.stringify(cipherState))}catch(e){}}
function loadCipher(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_cipher'));if(d)cipherState=d}catch(e){}}

function renderCipherPanel(){
var p=makePanel19('v19-cipher');
p.innerHTML='<h2>🔐 고대 암호 해독기</h2><p class="v19-sub">고대 암호문을 해독하여 역사의 비밀을 밝혀라! (해독: '+cipherState.solved.length+'/'+CIPHER_PUZZLES.length+')</p>';
var wrap=document.createElement('div');wrap.className='cipher-wrap';

CIPHER_PUZZLES.forEach(function(pz,pi){
if(cipherState.solved.indexOf(pi)>=0){
wrap.innerHTML+='<div style="background:rgba(20,30,20,.8);border:1px solid #4CAF50;border-radius:8px;padding:10px;margin:6px auto;max-width:400px;text-align:center"><div style="font-size:9px;color:#4CAF50">✅ 해독 완료</div><div style="font-size:12px;color:#FFD700;font-weight:700">'+pz.title+'</div><div style="font-size:10px;color:#8a8a6a;margin-top:2px">답: '+pz.answer+'</div></div>';
return;
}
var box=document.createElement('div');
box.style.cssText='background:rgba(20,15,30,.8);border:1px solid #4a3a5a;border-radius:8px;padding:12px;margin:8px auto;max-width:400px;text-align:center';
box.innerHTML='<div style="font-size:12px;color:#aa88ff;font-weight:700;margin-bottom:6px">'+pz.title+' (★'.repeat(pz.difficulty)+')</div>'
+'<div style="font-size:20px;letter-spacing:6px;margin:8px 0">'+pz.cipher+'</div>'
+'<div style="font-size:9px;color:#6a6a8a;margin-bottom:6px">힌트: '+pz.hint+'</div>';

var inputDiv=document.createElement('div');inputDiv.className='cipher-input';
var inputField=document.createElement('input');
inputField.type='text';inputField.maxLength=pz.answer.length+2;
inputField.style.cssText='width:200px;padding:8px;border:1px solid #4a3a5a;border-radius:6px;background:#1a1428;color:#FFD700;font-size:14px;text-align:center;font-family:inherit';
inputField.placeholder='답을 입력하세요';
inputDiv.appendChild(inputField);

var submitBtn=document.createElement('button');submitBtn.className='da-btn';submitBtn.textContent='확인';
submitBtn.onclick=function(){
cipherState.attempts++;
if(inputField.value.trim()===pz.answer){
cipherState.solved.push(pi);saveCipher();v19SFX('cipher_solve');v19Toast('🔓 '+pz.title+' 해독 성공!','#FFD700');
if(cipherState.solved.length>=1)v19CheckAch('cipher_first');if(cipherState.solved.length>=3)v19CheckAch('cipher_half');if(cipherState.solved.length>=6)v19CheckAch('cipher_all');
renderCipherPanel();document.getElementById('v19-cipher').classList.add('on');
}else{v19SFX('cipher_key');v19Toast('❌ 틀렸습니다. 다시 시도하세요!','#FF4444');}
};
inputDiv.appendChild(submitBtn);
box.appendChild(inputDiv);
wrap.appendChild(box);
});

p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-cipher\').classList.remove(\'on\')">닫기</button>';
}

// ─── 5. 무장 갤러리 (Armory Gallery) ───
var ARMORY_ITEMS=[
{name:'비파형동검',icon:'🗡️',era:'청동기',stat:'ATK+18',desc:'고조선 특유의 청동검. 만달리가 비파 모양.'},
{name:'세형동검',icon:'⚔️',era:'철기',stat:'ATK+22',desc:'한반도에서 발전한 독자적 청동검 유형.'},
{name:'철제 갑옷',icon:'🛡️',era:'철기',stat:'DEF+20',desc:'철기시대 비늘갑옷. 방어력이 뛰어남.'},
{name:'청동 투구',icon:'⛑️',era:'청동기',stat:'DEF+15',desc:'청동으로 만든 전쟁 투구. 이마에 미나리 달림.'},
{name:'각궁',icon:'🏹',era:'고조선',stat:'ATK+14, 사거리+2',desc:'뿔과 나무로 만든 복합궁. 주몽의 신궁.'},
{name:'철제 창',icon:'🔱',era:'철기',stat:'ATK+16, 사거리+1',desc:'철기시대의 긴 창. 보병의 주무기.'},
{name:'다뉴세문경',icon:'🪞',era:'청동기',stat:'문화+25%',desc:'청동으로 만든 정밀한 거울. 제사용.'},
{name:'철제 도끼',icon:'🪓',era:'철기',stat:'ATK+20',desc:'철기시대 한손 도끼. 근접전 특화.'},
{name:'금관',icon:'👑',era:'삼한',stat:'사기+30%',desc:'왕의 권위를 상징하는 금제 관모.'},
{name:'방패',icon:'🛡️',era:'고조선',stat:'DEF+18, 반격+10%',desc:'나무와 가죽으로 만든 원형 방패.'},
{name:'환두대도',icon:'⚔️',era:'고구려',stat:'ATK+28',desc:'고구려의 장수가 사용하는 대형 환두대도.'},
{name:'마갑',icon:'🐴',era:'고구려',stat:'DEF+25, 이동+2',desc:'민북복 스타일의 기병용 고장갑옷.'},
{name:'철제 방울',icon:'🧊',era:'부여',stat:'DEF+12',desc:'부여 병사의 표준 장비. 철제 첨갑옷.'},
{name:'돌도끼',icon:'🪨',era:'석기',stat:'ATK+6',desc:'선사시대 돌을 갈아 만든 최초의 무기.'},
{name:'보습',icon:'💎',era:'삼한',stat:'재력+20',desc:'옥으로 만든 상서로운 꽃과 새 모양의 비녀.'},
{name:'화살통',icon:'🏹',era:'삼국',stat:'범위공격+15%',desc:'불화살을 담는 특수 화살통. 공성전 무기.'}
];
var armoryCollected=[];
function saveArmory(){try{localStorage.setItem('krpg_v19_armory',JSON.stringify(armoryCollected))}catch(e){}}
function loadArmory(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_armory'));if(d)armoryCollected=d}catch(e){}}

function renderArmoryPanel(){
var p=makePanel19('v19-armory');
p.innerHTML='<h2>⚔️ 무장 갤러리</h2><p class="v19-sub">고대 무기와 갑옷을 수집하라! (수집: '+armoryCollected.length+'/'+ARMORY_ITEMS.length+')</p>';
var grid=document.createElement('div');grid.className='armory-grid';
ARMORY_ITEMS.forEach(function(item,i){
var card=document.createElement('div');card.className='armory-card'+(armoryCollected.indexOf(i)>=0?' collected':'');
card.innerHTML='<div class="ac-icon">'+item.icon+'</div><div class="ac-name">'+item.name+'</div><div class="ac-era">'+item.era+'</div><div class="ac-stat">'+item.stat+'</div>'
+(armoryCollected.indexOf(i)>=0?'<div style="font-size:8px;color:#4CAF50;margin-top:4px">✅ 수집 완료</div>':'');
if(armoryCollected.indexOf(i)<0){
card.onclick=function(){
armoryCollected.push(i);saveArmory();v19SFX('armory_collect');v19Toast(item.name+' 수집! '+item.stat,'#FFD700');
if(armoryCollected.length>=1)v19CheckAch('armory_first');if(armoryCollected.length>=8)v19CheckAch('armory_half');if(armoryCollected.length>=16)v19CheckAch('armory_all');
renderArmoryPanel();document.getElementById('v19-armory').classList.add('on');
};
}
grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-armory\').classList.remove(\'on\')">닫기</button>';
}

// ─── 6. 민심 게이지 (Public Sentiment Radar Canvas) ───
var SENTIMENT_AXES=[
{name:'경제',icon:'💰',color:'#FFD700'},
{name:'군사',icon:'⚔️',color:'#FF6644'},
{name:'문화',icon:'🎭',color:'#aa88ff'},
{name:'외교',icon:'🤝',color:'#4CAF50'},
{name:'치안',icon:'🛡️',color:'#5FA0FF'},
{name:'복지',icon:'❤️',color:'#FF5FA2'}
];
var sentValues={};
function saveSentiment(){try{localStorage.setItem('krpg_v19_sent',JSON.stringify(sentValues))}catch(e){}}
function loadSentiment(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_sent'));if(d)sentValues=d}catch(e){}}

function drawSentimentCanvas(canvas){
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,W,H);
var cx=W/2,cy=H/2,R=Math.min(W,H)*0.38;var n=SENTIMENT_AXES.length;
for(var r=1;r<=5;r++){
ctx.strokeStyle='#1a1a2a';ctx.lineWidth=1;ctx.beginPath();
for(var i=0;i<=n;i++){var a=Math.PI*2*i/n-Math.PI/2;var rr=R*r/5;var px=cx+rr*Math.cos(a);var py=cy+rr*Math.sin(a);if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}
ctx.stroke();
}
for(var j=0;j<n;j++){var angle=Math.PI*2*j/n-Math.PI/2;ctx.strokeStyle='#2a2a3a';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+R*Math.cos(angle),cy+R*Math.sin(angle));ctx.stroke();
ctx.fillStyle=SENTIMENT_AXES[j].color;ctx.font='bold 10px sans-serif';ctx.textAlign='center';
var lx=cx+(R+18)*Math.cos(angle);var ly=cy+(R+18)*Math.sin(angle);
ctx.fillText(SENTIMENT_AXES[j].icon+' '+SENTIMENT_AXES[j].name,lx,ly+3);
}
ctx.fillStyle='rgba(95,160,255,.15)';ctx.strokeStyle='#5FA0FF';ctx.lineWidth=2;ctx.beginPath();
SENTIMENT_AXES.forEach(function(ax,i){
var val=sentValues[ax.name]||50;var a=Math.PI*2*i/n-Math.PI/2;var rr=R*val/100;
var px=cx+rr*Math.cos(a);var py=cy+rr*Math.sin(a);
if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
});
ctx.closePath();ctx.fill();ctx.stroke();
var total=0;SENTIMENT_AXES.forEach(function(ax){total+=(sentValues[ax.name]||50)});var avg=Math.round(total/n);
var grade=avg>=80?'S':avg>=65?'A':avg>=50?'B':avg>=35?'C':'D';
ctx.fillStyle='#FFD700';ctx.font='bold 16px sans-serif';ctx.textAlign='center';ctx.fillText(grade+'등급',cx,cy-6);
ctx.fillStyle='#c4956a';ctx.font='10px sans-serif';ctx.fillText('민심 평균: '+avg+'%',cx,cy+10);
}

function renderSentimentPanel(){
var p=makePanel19('v19-sent');
p.innerHTML='<h2>📊 민심 게이지</h2><p class="v19-sub">6분야 민심을 관리하여 왕국을 안정시켜라!</p>';
var wrap=document.createElement('div');wrap.className='sentiment-wrap';
var canvas=document.createElement('canvas');canvas.width=400;canvas.height=400;
wrap.appendChild(canvas);drawSentimentCanvas(canvas);
var sliders=document.createElement('div');sliders.className='sent-sliders';
SENTIMENT_AXES.forEach(function(ax){
var row=document.createElement('div');row.className='ss-row';
var label=document.createElement('span');label.className='ss-label';label.textContent=ax.icon+' '+ax.name;
var slider=document.createElement('input');slider.type='range';slider.className='ss-slider';slider.min='0';slider.max='100';slider.value=sentValues[ax.name]||50;
var val=document.createElement('span');val.className='ss-val';val.textContent=(sentValues[ax.name]||50)+'%';
slider.oninput=function(){
sentValues[ax.name]=parseInt(slider.value);val.textContent=slider.value+'%';saveSentiment();drawSentimentCanvas(canvas);v19SFX('sent_adjust');
var total=0;SENTIMENT_AXES.forEach(function(a2){total+=(sentValues[a2.name]||50)});var avg=Math.round(total/SENTIMENT_AXES.length);
if(avg>=80)v19CheckAch('sent_good');
};
row.appendChild(label);row.appendChild(slider);row.appendChild(val);sliders.appendChild(row);
});
wrap.appendChild(sliders);
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-sent\').classList.remove(\'on\')">닫기</button>';
}

// ─── 7. 전략 보드게임 (Strategy Board Canvas) ───
var boardState={grid:null,turn:'player',playerScore:0,aiScore:0,wins:0};
function initBoard(){boardState.grid=[];for(var r=0;r<8;r++){boardState.grid[r]=[];for(var c=0;c<8;c++)boardState.grid[r][c]=0;}boardState.turn='player';boardState.playerScore=0;boardState.aiScore=0;}
function saveBoard(){try{localStorage.setItem('krpg_v19_board',JSON.stringify({wins:boardState.wins}))}catch(e){}}
function loadBoard(){try{var d=JSON.parse(localStorage.getItem('krpg_v19_board'));if(d)boardState.wins=d.wins||0}catch(e){}}

function drawBoardCanvas(canvas){
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a0a0e';ctx.fillRect(0,0,W,H);
var cellW=W/8,cellH=H/8;
for(var r=0;r<8;r++)for(var c=0;c<8;c++){
var alt=(r+c)%2===0;
ctx.fillStyle=alt?'#1a1a14':'#14140a';ctx.fillRect(c*cellW,r*cellH,cellW,cellH);
ctx.strokeStyle='#2a2a1a';ctx.strokeRect(c*cellW,r*cellH,cellW,cellH);
if(boardState.grid&&boardState.grid[r]&&boardState.grid[r][c]===1){
ctx.fillStyle='#5FA0FF';ctx.beginPath();ctx.arc(c*cellW+cellW/2,r*cellH+cellH/2,cellW*0.35,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#fff';ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.fillText('⭐',c*cellW+cellW/2,r*cellH+cellH/2+4);
}else if(boardState.grid&&boardState.grid[r]&&boardState.grid[r][c]===2){
ctx.fillStyle='#FF6644';ctx.beginPath();ctx.arc(c*cellW+cellW/2,r*cellH+cellH/2,cellW*0.35,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#fff';ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.fillText('⚔️',c*cellW+cellW/2,r*cellH+cellH/2+4);
}
}
}

function renderBoardPanel(){
if(!boardState.grid)initBoard();
var p=makePanel19('v19-board');
p.innerHTML='<h2>🎯 전략 보드게임</h2><p class="v19-sub">8\xD78 전장에서 AI와 영토 쟁탈전! (승리: '+boardState.wins+')</p>';
var wrap=document.createElement('div');wrap.className='board-wrap';
var canvas=document.createElement('canvas');canvas.width=400;canvas.height=400;
canvas.onclick=function(ev){
if(boardState.turn!=='player')return;
var rect=canvas.getBoundingClientRect();var mx=(ev.clientX-rect.left)/rect.width*400;var my=(ev.clientY-rect.top)/rect.height*400;
var c=Math.floor(mx/50),r=Math.floor(my/50);
if(r>=0&&r<8&&c>=0&&c<8&&boardState.grid[r][c]===0){
boardState.grid[r][c]=1;boardState.playerScore++;v19SFX('board_place');
drawBoardCanvas(canvas);
boardState.turn='ai';
setTimeout(function(){aiMove(canvas)},400);
}
};
wrap.appendChild(canvas);drawBoardCanvas(canvas);
var status=document.createElement('div');status.className='board-status';
status.textContent='아군(파랑): '+boardState.playerScore+' vs 적(빨강): '+boardState.aiScore+' — '+(boardState.turn==='player'?'아군 차례':'적 차례');
wrap.appendChild(status);
var btns=document.createElement('div');btns.className='board-controls';
var resetBtn=document.createElement('button');resetBtn.className='da-btn';resetBtn.textContent='🔄 새 게임';
resetBtn.onclick=function(){initBoard();renderBoardPanel();document.getElementById('v19-board').classList.add('on');};
btns.appendChild(resetBtn);wrap.appendChild(btns);
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="document.getElementById(\'v19-board\').classList.remove(\'on\')">닫기</button>';
}

function aiMove(canvas){
var empty=[];for(var r=0;r<8;r++)for(var c=0;c<8;c++){if(boardState.grid[r][c]===0)empty.push([r,c]);}
if(empty.length===0){checkBoardEnd();return;}
var best=null,bestScore=-1;
empty.forEach(function(pos){var score=0;var r=pos[0],c=pos[1];
for(var dr=-1;dr<=1;dr++)for(var dc=-1;dc<=1;dc++){if(dr===0&&dc===0)continue;var nr=r+dr,nc=c+dc;if(nr>=0&&nr<8&&nc>=0&&nc<8&&boardState.grid[nr][nc]===2)score+=2;if(nr>=0&&nr<8&&nc>=0&&nc<8&&boardState.grid[nr][nc]===1)score+=1;}
if(score>bestScore||(score===bestScore&&Math.random()>0.5)){bestScore=score;best=pos;}
});
if(!best)best=empty[Math.floor(Math.random()*empty.length)];
boardState.grid[best[0]][best[1]]=2;boardState.aiScore++;
v19SFX('board_place');drawBoardCanvas(canvas);boardState.turn='player';
checkBoardEnd();
renderBoardPanel();document.getElementById('v19-board').classList.add('on');
}

function checkBoardEnd(){
var empty=0;for(var r=0;r<8;r++)for(var c=0;c<8;c++){if(boardState.grid[r][c]===0)empty++;}
if(empty===0){
if(boardState.playerScore>boardState.aiScore){boardState.wins++;saveBoard();v19SFX('board_win');v19Toast('🏆 승리! 영토 확보!','#FFD700');
if(boardState.wins>=1)v19CheckAch('board_first');if(boardState.wins>=5)v19CheckAch('board_master');}
else{v19Toast('패배... 적이 영토를 장악!','#FF4444');}
}
}

// ─── 8. 고대 음악 연주기 (Ancient Music Jukebox) ───
var ANCIENT_SONGS=[
{name:'환웅의 하강',icon:'⚡',bpm:70,key:'C',notes:[262,294,330,262,330,349,392,349,330,294,262],desc:'환웅이 태백산으로 내려오는 장엄한 하강의 멜로디'},
{name:'단군 건국가',icon:'👑',bpm:90,key:'G',notes:[392,440,494,523,494,440,392,330,294,330,392],desc:'고조선 건국의 영광을 노래한 장엄한 행진곡'},
{name:'웅녀의 고백',icon:'🌸',bpm:60,key:'Am',notes:[220,262,294,330,294,262,220,196,220,262,220],desc:'곰에서 사람으로 변한 웅녀의 애절한 노래'},
{name:'전쟁의 북소리',icon:'🥁',bpm:120,key:'Dm',notes:[294,349,440,523,440,349,294,262,294,349,294],desc:'전쟁터에 울려 퍼지는 북과 나팔의 전쟁곡'},
{name:'영고 축제',icon:'🎭',bpm:100,key:'F',notes:[349,392,440,349,330,294,262,294,330,349,262],desc:'부여 12월 영고 축제의 흥겨운 축하곡'},
{name:'살수의 진혼가',icon:'🌊',bpm:65,key:'Em',notes:[330,294,262,220,196,220,262,294,330,392,330],desc:'살수대첩의 승리를 기리는 비장한 멜로디'},
{name:'황조가',icon:'🍃',bpm:55,key:'Am',notes:[220,247,262,294,262,247,220,196,175,196,220],desc:'유리왕이 창작한 한국 최고()의 서정시'},
{name:'고조선 행진곡',icon:'⚔️',bpm:110,key:'D',notes:[294,330,370,294,440,370,330,294,247,294,330],desc:'고조선 군대의 행진 박자에 맞춰 울리는 군악'}
];
var musicState={playing:-1,listened:[]};
var musicOsc=null,musicGain=null,musicInterval=null;

function stopMusic(){if(musicOsc){try{musicOsc.stop()}catch(e){}}if(musicInterval){clearInterval(musicInterval);musicInterval=null;}musicState.playing=-1;}

function playAncientSong(idx){
stopMusic();
if(!actx)actx=new(window.AudioContext||window.webkitAudioContext)();
var song=ANCIENT_SONGS[idx];musicState.playing=idx;
if(musicState.listened.indexOf(idx)<0){musicState.listened.push(idx);
try{localStorage.setItem('krpg_v19_music',JSON.stringify(musicState.listened))}catch(e){}
if(musicState.listened.length>=1)v19CheckAch('music_first');if(musicState.listened.length>=8)v19CheckAch('music_all');
}
var noteIdx=0;var interval=60000/song.bpm;
musicInterval=setInterval(function(){
if(noteIdx>=song.notes.length){noteIdx=0;}
var o=actx.createOscillator();var g=actx.createGain();o.connect(g);g.connect(actx.destination);
o.frequency.value=song.notes[noteIdx];o.type='sine';g.gain.value=0.1;
o.start();g.gain.exponentialRampToValueAtTime(0.001,actx.currentTime+interval/1000*0.8);
o.stop(actx.currentTime+interval/1000*0.9);
noteIdx++;
},interval);
v19SFX('music_play');
}

function renderMusicPanel(){
var p=makePanel19('v19-music');
try{var d=JSON.parse(localStorage.getItem('krpg_v19_music'));if(d)musicState.listened=d}catch(e){}
p.innerHTML='<h2>🎵 고대 음악 연주기</h2><p class="v19-sub">8곡의 고대 악기 음악을 감상하라! (감상: '+musicState.listened.length+'/8)</p>';
var wrap=document.createElement('div');wrap.className='jukebox-wrap';
var grid=document.createElement('div');grid.className='jb-grid';
ANCIENT_SONGS.forEach(function(s,i){
var card=document.createElement('div');card.className='jb-card'+(musicState.playing===i?' playing':'');
card.innerHTML='<div class="jb-icon">'+s.icon+'</div><div class="jb-name">'+s.name+'</div><div class="jb-info">'+s.key+' \xB7 '+s.bpm+'BPM</div>'
+(musicState.listened.indexOf(i)>=0?'<div style="font-size:8px;color:#4CAF50;margin-top:2px">✅</div>':'');
card.onclick=function(){
if(musicState.playing===i){stopMusic();v19SFX('music_stop');}else{playAncientSong(i);}
renderMusicPanel();document.getElementById('v19-music').classList.add('on');
};
grid.appendChild(card);
});
wrap.appendChild(grid);
var stopBtn=document.createElement('button');stopBtn.className='da-btn';stopBtn.textContent='⏹ 정지';stopBtn.style.cssText='display:block;margin:12px auto';
stopBtn.onclick=function(){stopMusic();v19SFX('music_stop');renderMusicPanel();document.getElementById('v19-music').classList.add('on');};
wrap.appendChild(stopBtn);
p.appendChild(wrap);
p.innerHTML+='<button class="v19-close" onclick="stopMusic();document.getElementById(\'v19-music\').classList.remove(\'on\')">닫기</button>';
}

// ─── Quiz v19 (+15, 165→180) ───
var V19_QUIZ=[
{q:'고조선 사람들이 하늘을 나눈 4구역의 수호신이 아닌 것은?',a:['봉황','청룡','현무','주작'],c:0},
{q:'28수 별자리에서 겁우직녀 설화의 겁우성이 속한 별자리는?',a:['우수','심수','벽수','각수'],c:0},
{q:'고조선의 대표적 청동기 무기는?',a:['비파형동검','철검','환두대도','돌도끼'],c:0},
{q:'위만조선을 멸망시킨 중국 황제는?',a:['한 무제','진 시황','한 고조','수 양제'],c:0},
{q:'부여의 12월 제천행사 이름은?',a:['영고','동맹','무천','제천'],c:0},
{q:'삼한의 신성 구역으로 죄인도 잡아갈 수 없었던 곳은?',a:['소도','서원','사찰','보루'],c:0},
{q:'고구려 기병이 입었던 갑옷은?',a:['마갑','민복','가죽갑','철갑'],c:0},
{q:'황조가를 지은 왕은?',a:['유리왕','광개토대왕','박혁거세','온조왕'],c:0},
{q:'고조선의 법률 8조 중 전해지는 조항의 수는?',a:['3조','모두 8조','5조','1조'],c:0},
{q:'환웅이 데리고 온 세 신하의 이름이 아닌 것은?',a:['범족','풍백','우사','운사'],c:0},
{q:'반구대 암각화가 있는 지역은?',a:['울산','경주','부여','광주'],c:0},
{q:'고조선의 수도 아사달이 위치했다고 추정되는 곳은?',a:['평양/요동','서울','부여','경주'],c:0},
{q:'BC 108년에 함락한 위만조선의 수도는?',a:['왕검성','아사달','위례성','평양성'],c:0},
{q:'고대 전쟁에서 성문을 부수는 데 사용한 무기는?',a:['충차','투석기','운제','노포'],c:0},
{q:'삼한 중 마한의 단군이 다스리던 곳은?',a:['목지국','사로국','기저국','건마국'],c:0}
];

function registerV19Quiz(){
try{
var existing=JSON.parse(localStorage.getItem('krpg_quiz_pool'))||[];
var ids=existing.map(function(q){return q.q});
V19_QUIZ.forEach(function(q){if(ids.indexOf(q.q)<0)existing.push(q)});
localStorage.setItem('krpg_quiz_pool',JSON.stringify(existing));
}catch(e){}
if(typeof window.registerQuiz==='function'){window.registerQuiz(V19_QUIZ,'v19');}
}

// ─── Achievements (+12, 108→120) ───
var V19_ACH=[
{id:'astro_first',name:'첫 별 관측',desc:'별자리 1개 관측'},
{id:'astro_all',name:'천문학자',desc:'28수 전부 관측'},
{id:'chron_first',name:'역사 기록가',desc:'전쟁 연대기 1건 열람'},
{id:'chron_all',name:'전쟁 박사',desc:'모든 전쟁 기록 열람'},
{id:'diplo_first_ally',name:'첫 동맹',desc:'외교로 첫 동맹 체결'},
{id:'diplo_all_ally',name:'외교의 달인',desc:'모든 국가와 동맹'},
{id:'cipher_first',name:'암호 입문',desc:'암호 1개 해독'},
{id:'cipher_all',name:'암호 해독가',desc:'모든 암호 해독'},
{id:'armory_first',name:'무기 수집가',desc:'무장 1개 수집'},
{id:'armory_all',name:'무장 완성',desc:'모든 무장 수집'},
{id:'board_first',name:'첫 전략 승리',desc:'보드게임 첫 승리'},
{id:'music_all',name:'음악 감상가',desc:'모든 고대 음악 감상'}
];

var v19AchState=[];
function loadV19Ach(){try{v19AchState=JSON.parse(localStorage.getItem('krpg_v19_ach'))||[]}catch(e){v19AchState=[]}}
function saveV19Ach(){try{localStorage.setItem('krpg_v19_ach',JSON.stringify(v19AchState))}catch(e){}}

function v19CheckAch(id){
if(v19AchState.indexOf(id)>=0)return;
v19AchState.push(id);saveV19Ach();
var a=null;V19_ACH.forEach(function(ac){if(ac.id===id)a=ac});
if(a){v19Toast('🏆 업적 달성: '+a.name,'#FFD700');v19SFX('cipher_solve');}
try{
var global=JSON.parse(localStorage.getItem('krpg_ach'))||[];
if(global.indexOf('v19_'+id)<0){global.push('v19_'+id);localStorage.setItem('krpg_ach',JSON.stringify(global));}
}catch(e){}
}

// ─── Keyboard Shortcuts (Shift+Q/R/S/U/V/W/X/Y) ───
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
var map={
'KeyQ':['v19-astro',renderAstroPanel],
'KeyR':['v19-chron',renderChronPanel],
'KeyS':['v19-diplo',renderDiploPanel],
'KeyU':['v19-cipher',renderCipherPanel],
'KeyV':['v19-armory',renderArmoryPanel],
'KeyW':['v19-sent',renderSentimentPanel],
'KeyX':['v19-board',renderBoardPanel],
'KeyY':['v19-music',renderMusicPanel]
};
if(map[e.code]){
e.preventDefault();var id=map[e.code][0],fn=map[e.code][1];
var el=document.getElementById(id);
if(el&&el.classList.contains('on')){el.classList.remove('on');if(id==='v19-music')stopMusic();}
else{fn();document.getElementById(id).classList.add('on');}
}
});

// ─── Quick Action Nav Bar (v19) ───
function addV19NavBar(){
var existing=document.getElementById('v19-nav-bar');
if(existing)existing.remove();
var bar=document.createElement('div');
bar.id='v19-nav-bar';
bar.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:128;display:flex;gap:0;overflow-x:auto;background:rgba(10,6,8,.94);border-top:1px solid #3a3a4a;padding:4px 8px;-webkit-overflow-scrolling:touch;scrollbar-width:none';

var actions=[
{label:'⭐',title:'천문관',fn:function(){renderAstroPanel();document.getElementById('v19-astro').classList.add('on')}},
{label:'📜',title:'연대기',fn:function(){renderChronPanel();document.getElementById('v19-chron').classList.add('on')}},
{label:'🤝',title:'외교',fn:function(){renderDiploPanel();document.getElementById('v19-diplo').classList.add('on')}},
{label:'🔐',title:'암호',fn:function(){renderCipherPanel();document.getElementById('v19-cipher').classList.add('on')}},
{label:'⚔️',title:'무장',fn:function(){renderArmoryPanel();document.getElementById('v19-armory').classList.add('on')}},
{label:'📊',title:'민심',fn:function(){renderSentimentPanel();document.getElementById('v19-sent').classList.add('on')}},
{label:'🎯',title:'보드',fn:function(){renderBoardPanel();document.getElementById('v19-board').classList.add('on')}},
{label:'🎵',title:'음악',fn:function(){renderMusicPanel();document.getElementById('v19-music').classList.add('on')}}
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
loadAstro();loadChron();loadDiplo();loadCipher();loadArmory();loadSentiment();loadBoard();loadV19Ach();registerV19Quiz();
setTimeout(addV19NavBar,2800);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',v19Init);}
else{v19Init();}

window._v19={
CONSTELLATIONS:CONSTELLATIONS,WAR_CHRONICLES:WAR_CHRONICLES,DIPLO_NATIONS:DIPLO_NATIONS,
CIPHER_PUZZLES:CIPHER_PUZZLES,ARMORY_ITEMS:ARMORY_ITEMS,SENTIMENT_AXES:SENTIMENT_AXES,
ANCIENT_SONGS:ANCIENT_SONGS,V19_QUIZ:V19_QUIZ,V19_ACH:V19_ACH,v19SFX:v19SFX
};
})();
