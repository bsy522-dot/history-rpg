// ============================================================
// engine.js — 한국사 영웅전 v9 Game Engine (State, Loop, Input)
// ============================================================

const C=document.getElementById('gameCanvas'),X=C.getContext('2d');
const mmC=document.getElementById('minimap'),mmX=mmC.getContext('2d');
const T=40; // tile size for exploration map
const isMobile='ontouchstart'in window||navigator.maxTouchPoints>0;
const $=id=>document.getElementById(id);

// --- Game State ---
let G={
  mode:'title',stage:0,party:[],inv:[],gold:0,
  cleared:[],episode:1,areaIdx:0,chapter:1,
  mapData:null,mapW:0,mapH:0,px:5,py:5,
  npcs:[],chests:[],heals:[],camX:0,camY:0,
  tac:{
    map:null,mapW:0,mapH:0,
    allies:[],enemies:[],
    phase:'ally',
    selUnit:null,selAction:null,
    moveRange:[],atkRange:[],skillRange:[],
    cursor:{x:0,y:0},
    camX:0,camY:0,
    animQ:[],animating:false,
    turn:1,
    pendingSkill:null,pendingItem:null,
    shake:{x:0,y:0,t:0},
    waves:null,waveIdx:0,
    rewards:null,
    deploySlots:[],maxDeploy:6
  },
  dlgQ:[],dlgI:0,dlgCb:null,dlgTyping:false,dlgLen:0,dlgTimer:0,
  endDay:0,endHP:100,saveMode:'save',_pm:null,
  quizCb:null,ritualCb:null,ritualRound:0,ritualSuccess:0,ritualAngle:0,
  // v9.0 new state
  difficulty:1,  // 0=easy, 1=normal, 2=hard
  battleSpeed:1  // 1 or 2
};

// v9.0: Difficulty setter
window.setDifficulty=function(level){
  G.difficulty=Math.max(0,Math.min(2,level));
  const d=DIFFICULTY[G.difficulty];
  if(typeof setTacInfo==='function')setTacInfo('난이도: '+d.name);
};

// v9.0: Battle speed toggle
window.toggleBattleSpeed=function(){
  G.battleSpeed=G.battleSpeed===1?2:1;
  const el=document.getElementById('battle-speed-btn');
  if(el)el.textContent=G.battleSpeed+'x';
  if(typeof setTacInfo==='function')setTacInfo('전투 속도: '+G.battleSpeed+'x');
};

// --- Canvas Sizing ---
function resize(){C.width=window.innerWidth;C.height=window.innerHeight}
resize();addEventListener('resize',resize);

// --- Exploration Map Rendering ---
function iX(gx,gy){return gx*T+T/2}
function iY(gx,gy){return gy*T+T/2}
function g2s(gx,gy){return{x:iX(gx,gy)-(G.camX-C.width/2),y:iY(gx,gy)-(G.camY-C.height/2)}}
function s2g(sx,sy){const wx=sx+G.camX-C.width/2,wy=sy+G.camY-C.height/2;return{x:Math.floor(wx/T),y:Math.floor(wy/T)}}
function dTile(gx,gy,col,hl){const s=g2s(gx,gy);X.fillStyle=col;X.fillRect(s.x-T/2,s.y-T/2,T,T);if(hl){X.fillStyle=hl;X.fillRect(s.x-T/2,s.y-T/2,T,T)}}
function dChar(sx,sy,ch,s=1,flash=false){
  if(!ch.alive){X.globalAlpha=.3}if(flash){X.globalAlpha=.5+Math.sin(Date.now()*.02)*.5}
  X.font=`${20*s}px serif`;X.textAlign='center';X.textBaseline='middle';X.fillText(ch.portrait,sx,sy-10*s);
  const bw=24*s,bh=3*s,bx=sx-bw/2,by=sy+5*s;
  X.fillStyle='#333';X.fillRect(bx,by,bw,bh);X.fillStyle=ch.hp/ch.mhp>.5?'#4a2':'#a22';X.fillRect(bx,by,bw*(ch.hp/ch.mhp),bh);
  X.globalAlpha=1;
}

function rMap(){
  const st=STAGES[G.stage],map=G.mapData;if(!map)return;
  const mh=map.length,mw=map[0].length;
  X.fillStyle=st.bg||'#0a0608';X.fillRect(0,0,C.width,C.height);
  const ps={x:iX(G.px,G.py),y:iY(G.px,G.py)};
  G.camX+=(ps.x-G.camX)*.15;G.camY+=(ps.y-G.camY)*.15;
  for(let gy=0;gy<mh;gy++)for(let gx=0;gx<mw;gx++){
    let col=TC[map[gy][gx]]||'#333';const r=((gx*7+gy*13)%17)/17;
    const br=parseInt(col.slice(1,3),16),bg2=parseInt(col.slice(3,5),16),bb=parseInt(col.slice(5,7),16);
    col=`rgb(${Math.max(0,Math.min(255,br+((r-.5)*12)|0))},${Math.max(0,Math.min(255,bg2+((r-.5)*12)|0))},${Math.max(0,Math.min(255,bb+((r-.5)*12)|0))})`;
    let hl=null;
    if(G.heals?.some(h=>h.x===gx&&h.y===gy))hl='rgba(100,255,100,0.15)';
    if(G.chests?.find(c=>c.x===gx&&c.y===gy&&!c.opened))hl='rgba(255,215,0,0.2)';
    dTile(gx,gy,col,hl);
    const t=map[gy][gx],sv=g2s(gx,gy);
    if(t===5){X.fillStyle='#2a5020';X.beginPath();X.moveTo(sv.x,sv.y-14);X.lineTo(sv.x-7,sv.y-2);X.lineTo(sv.x+7,sv.y-2);X.closePath();X.fill()}
    if(t===4){X.fillStyle='#6a5a3a';X.beginPath();X.moveTo(sv.x,sv.y-10);X.lineTo(sv.x-9,sv.y+2);X.lineTo(sv.x+9,sv.y+2);X.closePath();X.fill()}
    if(t===9||t===10){X.fillStyle=t===9?'#4a3a2a':'#2a1a20';X.fillRect(sv.x-T*.25,sv.y-8,T*.5,8)}
  }
  G.chests?.forEach(c=>{if(c.opened)return;const sv=g2s(c.x,c.y);X.fillStyle='#8B6914';X.fillRect(sv.x-5,sv.y-7,10,7);X.fillStyle='#FFD700';X.fillRect(sv.x-1,sv.y-5,2,2)});
  G.heals?.forEach(h=>{const sv=g2s(h.x,h.y);X.fillStyle=`rgba(100,255,100,${.3+Math.sin(Date.now()*.003)*.2})`;X.beginPath();X.arc(sv.x,sv.y,5,0,Math.PI*2);X.fill()});
  G.npcs?.forEach(n=>{if(n.gone)return;const sv=g2s(n.x,n.y);X.font='18px serif';X.textAlign='center';X.fillText(n.e,sv.x,sv.y-2);X.font='9px sans-serif';X.fillStyle='#FFD700';X.fillText(n.nm,sv.x,sv.y+11)});
  const ps2=g2s(G.px,G.py);
  if(G.party[0]){dChar(ps2.x,ps2.y-4,G.party[0],.85);X.font='9px sans-serif';X.textAlign='center';X.fillStyle='#FFD700';X.fillText(G.party[0].nm,ps2.x,ps2.y+14)}
  rMini(map,mw,mh);
}
function rMini(map,mw,mh){mmX.fillStyle='#0a0608';mmX.fillRect(0,0,90,90);const tw=90/mw,th=90/mh;for(let y=0;y<mh;y++)for(let x=0;x<mw;x++){mmX.fillStyle=TC[map[y][x]]||'#333';mmX.fillRect(x*tw,y*th,tw+.5,th+.5)}mmX.fillStyle='#FFD700';mmX.fillRect(G.px*tw-1,G.py*th-1,3,3)}

// --- Inventory ---
function addInv(id,q){const ex=G.inv.find(i=>i.id===id);if(ex)ex.q+=q;else G.inv.push({id,q})}

// --- Map Movement ---
const keys={};
addEventListener('keydown',e=>{keys[e.key]=true;e.preventDefault()});
addEventListener('keyup',e=>{keys[e.key]=false});
let mvT=0;
function updMove(dt){if(G.mode!=='map')return;mvT+=dt;if(mvT<150)return;let dx=0,dy=0;if(keys.ArrowUp||keys.w||keys.W)dy=-1;if(keys.ArrowDown||keys.s||keys.S)dy=1;if(keys.ArrowLeft||keys.a||keys.A)dx=-1;if(keys.ArrowRight||keys.d||keys.D)dx=1;if(dx||dy){mvT=0;tryMove(dx,dy)}}
window.tryMove=function(dx,dy){
  if(G.mode!=='map')return;const nx=G.px+dx,ny=G.py+dy,map=G.mapData;if(!map)return;if(ny<0||ny>=map.length||nx<0||nx>=map[0].length)return;if(!TP[map[ny][nx]])return;G.px=nx;G.py=ny;
  const ch=G.chests?.find(c=>c.x===nx&&c.y===ny&&!c.opened);
  if(ch){ch.opened=true;addInv(ch.item,ch.qty||ch.q||1);sfx('quest');startDlg([{s:'',t:`보물 상자! ${ITEMS[ch.item].n} x${ch.qty||ch.q||1} 획득!`}],()=>{G.mode='map'});return}
  const hs=G.heals?.find(h=>h.x===nx&&h.y===ny);if(hs){G.party.forEach(c=>{c.hp=c.mhp;c.mp=c.mmp;c.alive=true});sfx('heal')}
  if(map&&map[ny]&&map[ny][nx]===5){
    if(!G._shopVisited||G._shopVisited!==`${nx},${ny}`){
      G._shopVisited=`${nx},${ny}`;
      startDlg([{s:'상인',t:'여행자여! 이곳은 마을 상점이오. 필요한 물건이 있으면 말하시오!'}],()=>{openShop()});return;
    }
  }else{G._shopVisited=null}
};
window.interactNearby=function(){if(G.mode!=='map')return;const n=G.npcs?.find(n=>!n.gone&&Math.abs(n.x-G.px)+Math.abs(n.y-G.py)<=2);if(n)interactNPC(n)};
function interactNPC(n){
  sfx('menu');
  startDlg(n.lines,()=>{
    if(n.battle){
      n.gone=true;
      const st=STAGES[G.stage];
      if(st.tacBattle){initTacBattle(st.tacBattle)}
      else{if(st.post?.length)startDlg(st.post,()=>{doRecruit(st);completeArea()});
        else{doRecruit(st);completeArea()}}
    }else if(n.endurance){n.gone=true;startEndurance()}
    else if(n.quiz){n.gone=true;startQuiz(()=>{const st=STAGES[G.stage];if(st.post?.length)startDlg(st.post,()=>{doRecruit(st);completeArea()});else{doRecruit(st);completeArea()}})}
    else{const st=STAGES[G.stage];
      if(st.noFight){n.gone=true;if(st.post?.length)startDlg(st.post,()=>{doRecruit(st);completeArea()});else{doRecruit(st);completeArea()}}
      else if(st.isFinal){n.gone=true;saveChapterData(st.finalChapter);showEnding(st.finalChapter)}
      else G.mode='map'}
  });
}

// --- Click/Touch ---
let tSX=0,tSY=0;
C.addEventListener('click',e=>{
  initAudio();const r=C.getBoundingClientRect(),cx=e.clientX-r.left,cy=e.clientY-r.top;
  if(G.mode==='tactical'){handleTacClick(cx,cy);return}
  if(G.mode==='map'){const gr=s2g(cx,cy);const n=G.npcs?.find(n=>!n.gone&&n.x===gr.x&&n.y===gr.y);if(n&&Math.abs(n.x-G.px)+Math.abs(n.y-G.py)<=2)interactNPC(n);else if(gr.x>=0&&gr.y>=0){const dx=Math.sign(gr.x-G.px),dy=Math.sign(gr.y-G.py);tryMove(dx,dy)}}
});
C.addEventListener('touchstart',e=>{initAudio();tSX=e.touches[0].clientX;tSY=e.touches[0].clientY});
C.addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX-tSX,dy=e.changedTouches[0].clientY-tSY;
  if(Math.abs(dx)<10&&Math.abs(dy)<10){
    const r=C.getBoundingClientRect();
    const cx=e.changedTouches[0].clientX-r.left,cy=e.changedTouches[0].clientY-r.top;
    if(G.mode==='tactical'){handleTacClick(cx,cy);return}
    return;
  }
  if(G.mode==='map'){Math.abs(dx)>Math.abs(dy)?tryMove(dx>0?1:-1,0):tryMove(0,dy>0?1:-1)}
});
addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===' '){if(G.mode==='map')interactNearby();else if(G.mode==='dialogue')advDlg()}
  if(e.key==='Escape'){if(G.mode==='map'||G.mode==='menu')toggleMenu();
    else if(G.mode==='tactical'&&G.tac.phase!=='enemy'){
      G.tac.selUnit=null;G.tac.moveRange=[];G.tac.atkRange=[];G.tac.skillRange=[];
      G.tac.phase='ally';clearTacActions();$('skill-menu').style.display='none';$('item-menu').style.display='none';
    }
  }
});

// --- Area Init ---
function startArea(idx){
  G.stage=idx;const st=STAGES[idx];if(!st)return;
  if(st.ch2Init&&(!G.party.length||G.chapter===2))initCh2Party();
  if(st.ch3Init&&(!G.party.length||G.chapter===3))initCh3Party();
  if(st.ch4Init&&(!G.party.length||G.chapter===4))initCh4Party();
  if(st.initParty&&(idx===0||!G.party.length)){G.party=st.initParty();G.inv=[{id:'hp_pot',q:3},{id:'mp_pot',q:2},{id:'ssuk',q:3}];G.gold=100}
  G.mapData=st.map.map(r=>[...r]);G.mapH=st.map.length;G.mapW=st.map[0].length;
  G.px=st.ps.x;G.py=st.ps.y;
  G.npcs=st.npcs.map(n=>({...n,gone:false,lines:[...n.lines]}));
  G.chests=(st.chests||[]).map(c=>({...c,opened:false,qty:c.qty||c.q||1}));
  G.heals=[...(st.heals||[])];
  G.camX=iX(G.px,G.py);G.camY=iY(G.px,G.py);
  $('hud').style.display='block';$('minimap').style.display='block';
  $('hud-stage').textContent=`${st.id} ${st.name}`;
  hideTacUI();
  if(isMobile)$('dpad').style.display='block';
  if(st.pre?.length)startDlg(st.pre,()=>{G.mode='map';startBGM(st.mus||'map')});
  else{G.mode='map';startBGM(st.mus||'map')}
  updHUD();
}

function completeArea(){
  if(!G.cleared.includes(G.stage))G.cleared.push(G.stage);
  const st=STAGES[G.stage];
  if(st.isFinal){saveChapterData(st.finalChapter);showEnding(st.finalChapter);return}
  G.stage++;const next=STAGES[G.stage],prev=st;
  if(next&&next._ep!==prev._ep)showEpBanner(next._ep,()=>startArea(G.stage));
  else startArea(G.stage);
}

// --- Game Loop ---
let lt=0;
function loop(t){
  const dt=t-lt;lt=t;X.clearRect(0,0,C.width,C.height);
  if(G.mode==='map'){updMove(dt);rMap();updHUD()}
  else if(G.mode==='tactical'){rTacBattle();updHUD()}
  else if(G.mode==='dialogue'){
    if(G.tac.map&&$('tac-ui').style.display==='block')rTacBattle();
    else if(G.mapData)rMap();
    else{X.fillStyle='#0a0608';X.fillRect(0,0,C.width,C.height);for(let i=0;i<50;i++){const x=(Math.sin(i*127.1+t*.0001)*.5+.5)*C.width,y=(Math.cos(i*311.7+t*.00008)*.5+.5)*C.height*.6;X.fillStyle=`rgba(255,220,180,${.3+Math.sin(t*.002+i)*.3})`;X.fillRect(x,y,1.5,1.5)}}
    updDT(dt);updHUD()
  }
  else if(G.mode==='title'){X.fillStyle='#0a0608';X.fillRect(0,0,C.width,C.height);for(let i=0;i<80;i++){const x=(Math.sin(i*127.1+t*.00005)*.5+.5)*C.width,y=(Math.cos(i*311.7+t*.00004)*.5+.5)*C.height;X.fillStyle=`rgba(255,220,180,${.2+Math.sin(t*.001+i*.5)*.3})`;X.fillRect(x,y,2,2)}X.fillStyle='#1a0e08';X.beginPath();X.moveTo(0,C.height);for(let x=0;x<=C.width;x+=20){const h=C.height*.7+Math.sin(x*.008)*40+Math.sin(x*.003)*80;X.lineTo(x,h)}X.lineTo(C.width,C.height);X.closePath();X.fill()}
  else if(G.mode==='menu'||G.mode==='status'||G.mode==='save'||G.mode==='shop'){if(G.mapData)rMap();else{X.fillStyle='#0a0608';X.fillRect(0,0,C.width,C.height)}}
  else if(G.mode==='victory'||G.mode==='defeat'){if(G.tac.map)rTacBattle();else{X.fillStyle='#0a0608';X.fillRect(0,0,C.width,C.height)}}
  else if(G.mode==='endurance'||G.mode==='banner'||G.mode==='quiz'||G.mode==='ritual'){X.fillStyle='#0a0608';X.fillRect(0,0,C.width,C.height);for(let i=0;i<40;i++){const x=(Math.sin(i*97+t*.0001)*.5+.5)*C.width,y=(Math.cos(i*211+t*.00007)*.5+.5)*C.height;X.fillStyle=`rgba(255,200,100,${.1+Math.sin(t*.003+i)*.08})`;X.fillRect(x,y,2,2)}}
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
