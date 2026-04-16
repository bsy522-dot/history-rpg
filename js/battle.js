// ============================================================
// battle.js — 한국사 영웅전 v7 Tactical Battle System
// Farland Tactics-style visuals + Enhanced AI
// ============================================================
// Globals expected: C, X, G, $, BTILE, TERRAIN, CLS, ITEMS, STAGES,
//   sfx, startBGM, stopBGM, getSk, getEffMov, typeAdv, addInv,
//   checkPromotion, applyPromotion, showTacUI, hideTacUI, setTacInfo,
//   clearTacActions, showTacActions, showUnitInfo, showDL, startDlg,
//   doRecruit, completeArea, startArea, resetTitleHTML, DEF_ENEMY_POS
// ============================================================

// ===== TERRAIN TILE DRAWING HELPERS =====

function drawPlainsTile(sx,sy,gx,gy){
  const grad=X.createLinearGradient(sx,sy,sx,sy+BTILE);
  grad.addColorStop(0,'#5a7a30');grad.addColorStop(1,'#3a5a20');
  X.fillStyle=grad;X.fillRect(sx,sy,BTILE,BTILE);
  // Random grass tufts (2-4 small lines)
  const seed=(gx*7+gy*13)%5;
  X.strokeStyle='#4a6a28';X.lineWidth=1;
  for(let i=0;i<2+seed%3;i++){
    const tx=sx+8+((gx*11+gy*17+i*23)%((BTILE-16)|1));
    const ty=sy+BTILE-4-((gx*3+gy*7+i*13)%8);
    X.beginPath();X.moveTo(tx,ty);X.lineTo(tx-2,ty-5-i%3);X.stroke();
    X.beginPath();X.moveTo(tx+2,ty);X.lineTo(tx+4,ty-4-i%2);X.stroke();
  }
}

function drawForestTile(sx,sy,gx,gy){
  const grad=X.createLinearGradient(sx,sy,sx,sy+BTILE);
  grad.addColorStop(0,'#2a5028');grad.addColorStop(1,'#1a3818');
  X.fillStyle=grad;X.fillRect(sx,sy,BTILE,BTILE);
  // 2-3 trees with canopy + trunk + shadow
  const treeCount=2+((gx+gy)%2);
  for(let i=0;i<treeCount;i++){
    const tx=sx+12+i*((BTILE-24)/Math.max(1,treeCount-1));
    const ty=sy+BTILE*0.6;
    // Shadow ellipse
    X.fillStyle='rgba(0,0,0,0.2)';
    X.beginPath();X.ellipse(tx,ty+8,8,3,0,0,Math.PI*2);X.fill();
    // Trunk
    X.fillStyle='#5a3a1a';X.fillRect(tx-2,ty-2,4,12);
    // Canopy (two overlapping circles)
    X.fillStyle='#1a6020';
    X.beginPath();X.arc(tx,ty-4,9,0,Math.PI*2);X.fill();
    X.fillStyle='#2a7030';
    X.beginPath();X.arc(tx+3,ty-6,7,0,Math.PI*2);X.fill();
  }
}

function drawMountainTile(sx,sy,gx,gy){
  const grad=X.createLinearGradient(sx,sy,sx,sy+BTILE);
  grad.addColorStop(0,'#8a6a3a');grad.addColorStop(1,'#6a4a2a');
  X.fillStyle=grad;X.fillRect(sx,sy,BTILE,BTILE);
  // Mountain peak with shadow and snow
  const cx=sx+BTILE/2,peak=sy+6;
  // Shadow side
  X.fillStyle='#5a3a1a';
  X.beginPath();X.moveTo(cx,peak);X.lineTo(cx+4,peak+8);X.lineTo(sx+BTILE-6,sy+BTILE-4);X.lineTo(cx,sy+BTILE-4);X.closePath();X.fill();
  // Main mountain
  X.fillStyle='#7a5a2a';
  X.beginPath();X.moveTo(cx,peak);X.lineTo(sx+6,sy+BTILE-4);X.lineTo(sx+BTILE-6,sy+BTILE-4);X.closePath();X.fill();
  // Snow cap
  X.fillStyle='#e8e0d0';
  X.beginPath();X.moveTo(cx,peak);X.lineTo(cx-8,peak+12);X.lineTo(cx+8,peak+12);X.closePath();X.fill();
}

function drawWaterTile(sx,sy,gx,gy){
  const t=Date.now()*0.003;
  const grad=X.createLinearGradient(sx,sy,sx,sy+BTILE);
  grad.addColorStop(0,'#1a3a8a');grad.addColorStop(1,'#0a2a6a');
  X.fillStyle=grad;X.fillRect(sx,sy,BTILE,BTILE);
  // Wave lines
  X.strokeStyle='rgba(100,160,255,0.3)';X.lineWidth=1;
  for(let w=0;w<3;w++){
    X.beginPath();
    const wy=sy+10+w*14;
    for(let wx=sx;wx<sx+BTILE;wx+=4){
      const waveY=wy+Math.sin(t+gx*0.5+wx*0.08+w*1.5)*3;
      if(wx===sx)X.moveTo(wx,waveY);else X.lineTo(wx,waveY);
    }
    X.stroke();
  }
}

function drawFortTile(sx,sy,gx,gy){
  const grad=X.createLinearGradient(sx,sy,sx,sy+BTILE);
  grad.addColorStop(0,'#9a8a6a');grad.addColorStop(1,'#6a5a4a');
  X.fillStyle=grad;X.fillRect(sx,sy,BTILE,BTILE);
  // Wall structure
  X.fillStyle='#8a7a5a';X.fillRect(sx+4,sy+8,BTILE-8,BTILE-12);
  // Crenellations (3 teeth on top)
  for(let i=0;i<3;i++){
    X.fillStyle='#aa9a7a';
    X.fillRect(sx+6+i*((BTILE-16)/2),sy+4,10,8);
  }
  // Stone texture lines
  X.strokeStyle='rgba(0,0,0,0.15)';X.lineWidth=1;
  X.strokeRect(sx+4,sy+8,BTILE-8,BTILE-12);
  X.beginPath();X.moveTo(sx+4,sy+20);X.lineTo(sx+BTILE-4,sy+20);X.stroke();
  X.beginPath();X.moveTo(sx+4,sy+32);X.lineTo(sx+BTILE-4,sy+32);X.stroke();
}

function drawVillageTile(sx,sy,gx,gy){
  const grad=X.createLinearGradient(sx,sy,sx,sy+BTILE);
  grad.addColorStop(0,'#c4a06a');grad.addColorStop(1,'#a08050');
  X.fillStyle=grad;X.fillRect(sx,sy,BTILE,BTILE);
  // House: body + roof + door
  const hx=sx+BTILE*0.2,hy=sy+BTILE*0.35;
  const hw=BTILE*0.6,hh=BTILE*0.4;
  // House body
  X.fillStyle='#8a7a5a';X.fillRect(hx,hy,hw,hh);
  // Roof (triangle, red-brown)
  X.fillStyle='#8a3a1a';
  X.beginPath();X.moveTo(hx-4,hy);X.lineTo(hx+hw/2,hy-12);X.lineTo(hx+hw+4,hy);X.closePath();X.fill();
  // Door
  X.fillStyle='#5a3a1a';X.fillRect(hx+hw*0.35,hy+hh*0.3,hw*0.3,hh*0.7);
}

// ===== UNIT SPRITE DRAWING (Farland Tactics-style) =====

function drawUnitSprite(sx,sy,unit,isSelected,frameIdx){
  const isAlly=unit.ally;
  const isBoss=unit.isBoss;
  const scale=isBoss?1.3:1;
  const bx=sx,by=sy;

  // Animation: slight bob
  const bob=frameIdx?-2:0;

  // Determine colors based on class and ally/enemy
  const baseColor=isAlly?'#2a5a9a':'#9a2a2a';
  const armorColor=isAlly?'#3a6aaa':'#aa3a3a';
  const skinColor='#dab080';
  const hairColor=unit.cl.includes('왕')||unit.cl==='신장'||unit.cl==='단군'||unit.cl==='천왕'?'#FFD700':
                  unit.cl.includes('궁')?'#5a3a1a':
                  unit.cl.includes('기마')?'#3a2a1a':'#2a1a0a';

  X.save();
  X.translate(bx,by+bob);
  if(!isAlly&&!isBoss)X.scale(scale,scale);
  if(isBoss)X.scale(scale,scale);

  // Legs (two small rectangles)
  X.fillStyle=isAlly?'#1a3a6a':'#6a1a1a';
  X.fillRect(-5,8,4,8);X.fillRect(1,8,4,8);

  // Body (trapezoid)
  X.fillStyle=armorColor;
  X.beginPath();X.moveTo(-8,-2);X.lineTo(8,-2);X.lineTo(6,10);X.lineTo(-6,10);X.closePath();X.fill();
  // Armor highlight
  X.fillStyle='rgba(255,255,255,0.15)';
  X.fillRect(-6,-2,12,3);

  // Head
  X.fillStyle=skinColor;
  X.beginPath();X.arc(0,-8,7*scale,0,Math.PI*2);X.fill();

  // Hair
  X.fillStyle=hairColor;
  X.beginPath();X.arc(0,-11,6*scale,Math.PI,Math.PI*2);X.fill();

  // Eyes
  X.fillStyle='#1a1a1a';
  X.fillRect(-3,-9,2,2);X.fillRect(1,-9,2,2);

  // Class-specific weapon/features
  const cls=unit.cl;
  if(cls.includes('궁')||cls==='명궁'||cls==='신궁'||cls==='한군궁수'){
    // Bow
    X.strokeStyle=isAlly?'#8a6a2a':'#6a2a2a';X.lineWidth=2;
    X.beginPath();X.arc(12,0,10,Math.PI*0.3,Math.PI*0.7);X.stroke();
    // String
    X.strokeStyle='#aaa';X.lineWidth=1;
    X.beginPath();X.moveTo(12,-7);X.lineTo(12,7);X.stroke();
  }else if(cls.includes('보')||cls==='중보병'||cls==='근위병'||cls==='한군병'){
    // Sword
    X.fillStyle='#aaa';X.fillRect(10,-6,2,14);
    X.fillStyle='#8a6a2a';X.fillRect(8,-6,6,3); // guard
    // Shield (left side)
    X.fillStyle=isAlly?'#2a4a7a':'#7a2a2a';
    X.beginPath();X.arc(-10,2,7,0,Math.PI*2);X.fill();
    X.strokeStyle='#ccc';X.lineWidth=1;X.beginPath();X.arc(-10,2,7,0,Math.PI*2);X.stroke();
  }else if(cls.includes('기마')||cls.includes('돌기')||cls.includes('철기')||cls==='한군기병'){
    // Spear
    X.fillStyle='#8a6a2a';X.fillRect(8,-16,2,24);
    X.fillStyle='#ccc';
    X.beginPath();X.moveTo(9,-16);X.lineTo(6,-20);X.lineTo(12,-20);X.closePath();X.fill();
    // Horse (below, simplified)
    X.fillStyle=isAlly?'#6a5a3a':'#5a2a1a';
    X.beginPath();X.ellipse(0,16,10,5,0,0,Math.PI*2);X.fill();
    // Horse head
    X.fillStyle=isAlly?'#7a6a4a':'#6a3a2a';
    X.beginPath();X.ellipse(10,14,4,3,0.3,0,Math.PI*2);X.fill();
  }else if(cls==='신장'||cls==='천왕'||cls==='단군'||cls.includes('왕')){
    // Crown
    X.fillStyle='#FFD700';
    X.beginPath();X.moveTo(-5,-16);X.lineTo(-3,-20);X.lineTo(0,-17);X.lineTo(3,-20);X.lineTo(5,-16);X.closePath();X.fill();
    // Staff with glow
    X.fillStyle='#c4956a';X.fillRect(10,-12,2,20);
    // Glow orb
    const glowR=3+Math.sin(Date.now()*0.005)*1;
    X.fillStyle=`rgba(255,215,0,${0.5+Math.sin(Date.now()*0.003)*0.3})`;
    X.beginPath();X.arc(11,-14,glowR,0,Math.PI*2);X.fill();
  }else if(cls==='웅녀'||cls==='지모신'){
    // Long hair
    X.fillStyle='#3a2a1a';
    X.beginPath();X.moveTo(-6,-10);X.lineTo(-8,4);X.lineTo(-4,4);X.lineTo(-4,-6);X.closePath();X.fill();
    X.beginPath();X.moveTo(6,-10);X.lineTo(8,4);X.lineTo(4,4);X.lineTo(4,-6);X.closePath();X.fill();
    // Flower
    X.fillStyle='#ff88aa';
    X.beginPath();X.arc(5,-14,3,0,Math.PI*2);X.fill();
  }else if(cls==='풍백'||cls==='대풍사'){
    X.fillStyle='#6aaacc';X.fillRect(-7,-14,14,5); // hood
  }else if(cls==='우사'||cls==='대우사'){
    X.fillStyle='#4a6aaa';X.fillRect(-7,-14,14,5); // hood
  }else if(cls==='운사'||cls==='대운사'){
    X.fillStyle='#7a7aaa';X.fillRect(-7,-14,14,5); // hood
  }

  // Boss indicator
  if(isBoss){
    X.fillStyle='rgba(255,0,0,0.15)';
    X.beginPath();X.arc(0,0,20,0,Math.PI*2);X.fill();
  }

  X.restore();

  // Selection glow ring
  if(isSelected){
    const glowAlpha=0.4+Math.sin(Date.now()*0.005)*0.3;
    const glowRadius=BTILE*0.4+Math.sin(Date.now()*0.003)*2;
    X.strokeStyle=`rgba(255,215,0,${glowAlpha})`;X.lineWidth=2;
    X.beginPath();X.arc(bx,by+4,glowRadius,0,Math.PI*2);X.stroke();X.lineWidth=1;
  }

  // Acted indicator (diagonal hatching)
  if(unit.acted&&isAlly){
    X.save();
    X.globalAlpha=0.4;X.strokeStyle='#444';X.lineWidth=1;
    for(let i=-BTILE;i<BTILE;i+=6){
      X.beginPath();X.moveTo(bx+i-BTILE/2,by-BTILE/2);X.lineTo(bx+i+BTILE/2,by+BTILE/2);X.stroke();
    }
    X.restore();
  }
}

// ===== BATTLE INITIALIZATION =====

function initTacBattle(tacBattleData){
  const tc=G.tac;
  tc.map=tacBattleData.tacMap.map(r=>[...r]);
  tc.mapH=tc.map.length;tc.mapW=tc.map[0].length;
  tc.waves=tacBattleData.enemies;tc.waveIdx=0;
  tc.turn=1;tc.phase='deploy';
  tc.animating=false;tc.animQ=[];
  tc.shake={x:0,y:0,t:0};
  // Setup allies from party
  tc.allies=G.party.filter(c=>c.alive).map((c,i)=>{
    c.acted=false;c.moved=false;c.stunned=false;c.buffs=[];
    const pos=tacBattleData.allyPos[i]||[1+i,tc.mapH-1];
    c.gx=pos[0];c.gy=pos[1];return c;
  });
  // Setup first wave of enemies
  loadTacWave(0,tacBattleData);
  // Skip deploy for small parties, go directly to ally phase
  if(tc.allies.length<=4){
    tc.phase='ally';tc.selUnit=null;
    showTacUI();setTacInfo('아군 페이즈 - 유닛을 선택하세요');
    $('tac-phase').textContent='아군 페이즈';
  }else{
    showDeployScreen(tacBattleData);
  }
  G.mode='tactical';
  startBGM(STAGES[G.stage]?.bmus||'battle');
}

function loadTacWave(idx,tacData){
  const tc=G.tac;tc.waveIdx=idx;
  const wave=tc.waves[idx];
  const positions=tacData?.enemyPos||DEF_ENEMY_POS;
  tc.enemies=wave.map((e,i)=>{
    const pos=positions[i]||[3+i,0];
    return{...e,alive:true,acted:false,moved:false,stunned:false,buffs:[],ally:false,
      gx:pos[0],gy:pos[1],_sx:0,_sy:0,enraged:false,
      mov:e.mov||(CLS[e.cl]||{}).mov||4,rng:e.rng||(CLS[e.cl]||{}).rng||1}
  });
}

// ===== DEPLOY SCREEN =====

function showDeployScreen(tacData){
  $('deploy-screen').style.display='block';
  $('deploy-max').textContent=tacData.allyPos.length;
  G.tac.maxDeploy=tacData.allyPos.length;
  G.tac.deploySlots=G.party.filter(c=>c.alive).map(c=>c.id);
  renderDeployList();
}

function renderDeployList(){
  const list=$('deploy-list');
  list.innerHTML=G.party.filter(c=>c.alive).map(c=>{
    const sel=G.tac.deploySlots.includes(c.id);
    return`<div class="deploy-unit ${sel?'selected':''}" onclick="toggleDeploy('${c.id}')">
      <div class="du-portrait">${c.portrait}</div>
      <div class="du-info"><div class="du-name">${c.nm} Lv.${c.lv}</div>
      <div>${c.cl} | HP:${c.hp}/${c.mhp} | ATK:${c.atk} DEF:${c.def} MOV:${c.mov}</div></div>
    </div>`
  }).join('');
}

window.toggleDeploy=function(id){
  const ds=G.tac.deploySlots;
  const idx=ds.indexOf(id);
  if(idx>=0)ds.splice(idx,1);
  else if(ds.length<G.tac.maxDeploy)ds.push(id);
  renderDeployList();
};

window.confirmDeploy=function(){
  if(G.tac.deploySlots.length===0){setTacInfo('최소 1명은 출격해야 합니다!');return}
  $('deploy-screen').style.display='none';
  const tc=G.tac;
  const tacData=STAGES[G.stage].tacBattle;
  tc.allies=tc.deploySlots.map((id,i)=>{
    const c=G.party.find(p=>p.id===id);
    const pos=tacData.allyPos[i]||[1+i,tc.mapH-1];
    c.gx=pos[0];c.gy=pos[1];c.acted=false;c.moved=false;return c;
  });
  tc.phase='ally';tc.selUnit=null;
  showTacUI();setTacInfo('아군 페이즈 - 유닛을 선택하세요');
  $('tac-phase').textContent='아군 페이즈';
};

// ===== MOVEMENT RANGE BFS =====

function calcMoveRange(unit){
  const tc=G.tac,map=tc.map,mw=tc.mapW,mh=tc.mapH;
  const mov=getEffMov(unit);
  const range=[],visited=new Map();
  const key=(x,y)=>x+','+y;
  const q=[[unit.gx,unit.gy,mov]];
  visited.set(key(unit.gx,unit.gy),mov);
  const occupied=new Set();
  [...tc.allies,...tc.enemies].forEach(u=>{if(u.alive&&u!==unit)occupied.add(key(u.gx,u.gy))});
  const enemyAdj=new Set(); // ZOC
  tc.enemies.filter(e=>e.alive).forEach(e=>{
    [[0,1],[0,-1],[1,0],[-1,0]].forEach(([dx,dy])=>{
      const nx=e.gx+dx,ny=e.gy+dy;
      if(nx>=0&&nx<mw&&ny>=0&&ny<mh)enemyAdj.add(key(nx,ny));
    });
  });
  while(q.length){
    const[cx,cy,rem]=q.shift();
    [[0,1],[0,-1],[1,0],[-1,0]].forEach(([dx,dy])=>{
      const nx=cx+dx,ny=cy+dy,k=key(nx,ny);
      if(nx<0||nx>=mw||ny<0||ny>=mh)return;
      const t=map[ny][nx],ter=TERRAIN[t];
      if(!ter||!ter.pass)return;
      const cost=ter.mc;const nrem=rem-cost;if(nrem<0)return;
      // ZOC: entering a tile adjacent to enemy stops further movement
      const isZoc=!unit.ally?false:enemyAdj.has(k);
      // Can't move through enemy-occupied tiles
      const occByEnemy=[...tc.enemies].some(e=>e.alive&&e.gx===nx&&e.gy===ny);
      const occByAlly=[...tc.allies].some(a=>a.alive&&a!==unit&&a.gx===nx&&a.gy===ny);
      if(occByEnemy)return; // can't enter enemy tile
      if(visited.has(k)&&visited.get(k)>=nrem)return;
      visited.set(k,nrem);
      if(!occByAlly)range.push({x:nx,y:ny}); // can pass through ally but not stop on ally
      if(!isZoc&&!occByAlly)q.push([nx,ny,nrem]); // ZOC stops further movement
      else if(isZoc&&!occByAlly){} // stopped by ZOC
    });
  }
  // Deduplicate
  const seen=new Set();
  return range.filter(p=>{const k=key(p.x,p.y);if(seen.has(k))return false;seen.add(k);return true});
}

// ===== ATTACK RANGE =====

function calcAtkRange(unit,rng){
  const result=[];const tc=G.tac;
  rng=rng||unit.rng;
  for(let dy=-rng;dy<=rng;dy++)for(let dx=-rng;dx<=rng;dx++){
    if(dx===0&&dy===0)continue;
    if(Math.abs(dx)+Math.abs(dy)>rng)continue;
    const nx=unit.gx+dx,ny=unit.gy+dy;
    if(nx<0||nx>=tc.mapW||ny<0||ny>=tc.mapH)continue;
    result.push({x:nx,y:ny});
  }
  return result;
}

// ===== RENDER TACTICAL BATTLE (MAJOR VISUAL UPGRADE) =====

function rTacBattle(){
  const tc=G.tac,map=tc.map;if(!map)return;
  const mw=tc.mapW,mh=tc.mapH;
  // Calculate camera center
  const totalW=mw*BTILE,totalH=mh*BTILE;
  const offX=Math.max(0,(C.width-totalW)/2);
  const offY=Math.max(0,(C.height-totalH)/2 - 30);
  X.fillStyle='#0a0608';X.fillRect(0,0,C.width,C.height);
  X.save();
  if(tc.shake.t>0){X.translate(tc.shake.x,tc.shake.y);tc.shake.t-=16;tc.shake.x=(Math.random()-.5)*tc.shake.t*.3;tc.shake.y=(Math.random()-.5)*tc.shake.t*.2}

  // Draw tiles with rich terrain
  for(let gy=0;gy<mh;gy++)for(let gx=0;gx<mw;gx++){
    const t=map[gy][gx],ter=TERRAIN[t];
    const sx=offX+gx*BTILE,sy=offY+gy*BTILE;
    // Depth shadow
    X.fillStyle='rgba(0,0,0,0.12)';
    X.fillRect(sx+2,sy+2,BTILE,BTILE);
    // Terrain-specific rendering
    switch(t){
      case 0:drawPlainsTile(sx,sy,gx,gy);break;
      case 1:drawForestTile(sx,sy,gx,gy);break;
      case 2:drawMountainTile(sx,sy,gx,gy);break;
      case 3:drawWaterTile(sx,sy,gx,gy);break;
      case 4:drawFortTile(sx,sy,gx,gy);break;
      case 5:drawVillageTile(sx,sy,gx,gy);break;
      default:X.fillStyle=ter?.c||'#333';X.fillRect(sx,sy,BTILE,BTILE);
    }
    // Subtle grid inset
    X.strokeStyle='rgba(0,0,0,0.1)';X.strokeRect(sx,sy,BTILE,BTILE);
  }

  // Draw movement range (blue overlay)
  tc.moveRange.forEach(p=>{
    const sx=offX+p.x*BTILE,sy=offY+p.y*BTILE;
    X.fillStyle='rgba(50,100,255,0.25)';X.fillRect(sx+1,sy+1,BTILE-2,BTILE-2);
  });
  // Draw attack range (red overlay)
  tc.atkRange.forEach(p=>{
    const sx=offX+p.x*BTILE,sy=offY+p.y*BTILE;
    X.fillStyle='rgba(255,50,50,0.2)';X.fillRect(sx+1,sy+1,BTILE-2,BTILE-2);
  });
  // Draw skill range (purple overlay)
  tc.skillRange.forEach(p=>{
    const sx=offX+p.x*BTILE,sy=offY+p.y*BTILE;
    X.fillStyle='rgba(150,50,255,0.25)';X.fillRect(sx+1,sy+1,BTILE-2,BTILE-2);
  });

  // Draw units with sprites
  const frameIdx=Math.floor(Date.now()/500)%2;
  const allUnits=[...tc.allies.filter(u=>u.alive),...tc.enemies.filter(u=>u.alive)];
  allUnits.forEach(u=>{
    const sx=offX+u.gx*BTILE+BTILE/2,sy=offY+u.gy*BTILE+BTILE/2;
    u._sx=sx;u._sy=sy;
    const isSel=tc.selUnit===u;
    X.globalAlpha=u.acted?.5:1;
    drawUnitSprite(sx,sy,u,isSel,frameIdx);
    X.globalAlpha=1;
    // HP bar (gradient)
    const bw=BTILE*.75,bh=4;const bx2=sx-bw/2,by2=sy+BTILE*.32;
    X.fillStyle='#222';X.fillRect(bx2-1,by2-1,bw+2,bh+2);
    const hpPct=u.hp/u.mhp;
    const hpGrad=X.createLinearGradient(bx2,by2,bx2+bw*hpPct,by2);
    if(hpPct>0.5){hpGrad.addColorStop(0,'#2a8a2a');hpGrad.addColorStop(1,'#4aca4a');}
    else if(hpPct>0.25){hpGrad.addColorStop(0,'#8a8a2a');hpGrad.addColorStop(1,'#caca2a');}
    else{hpGrad.addColorStop(0,'#8a2a2a');hpGrad.addColorStop(1,'#ca4a4a');}
    X.fillStyle=hpGrad;X.fillRect(bx2,by2,bw*hpPct,bh);
    // Name
    X.font='9px sans-serif';X.textAlign='center';
    X.fillStyle=u.ally?'#88bbff':'#ff8888';
    X.fillText(u.nm,sx,sy+BTILE*.48);
    // Stunned
    if(u.stunned){X.font='10px serif';X.fillText('\uD83D\uDCAB',sx+12,sy-12)}
    // Buffs
    if(u.buffs.length>0){X.fillStyle='#FFD700';X.font='8px serif';X.fillText('\u2726',sx+14,sy+2)}
  });

  // Draw cursor
  if(tc.phase==='ally'||tc.phase==='target'||tc.phase==='skill_target'){
    const cx=offX+tc.cursor.x*BTILE,cy=offY+tc.cursor.y*BTILE;
    X.strokeStyle=`rgba(255,215,0,${.5+Math.sin(Date.now()*.005)*.3})`;X.lineWidth=2;
    X.strokeRect(cx+1,cy+1,BTILE-2,BTILE-2);X.lineWidth=1;
  }
  X.restore();
  // Turn/Wave info
  X.font='10px sans-serif';X.textAlign='center';X.fillStyle='#c4956a';
  let info=`턴 ${tc.turn}`;
  if(tc.waves&&tc.waves.length>1)info+=` | Wave ${tc.waveIdx+1}/${tc.waves.length}`;
  X.fillText(info,C.width/2,18);
}

// ===== DAMAGE CALCULATION (lv scaling 0.08 -> 0.06) =====

function calcDmg(a,d,pw=1){
  const ta=typeAdv(a.cl,d.cl);
  const ab=a.buffs.find(b=>b.t==='atk')?.v||1;
  const db=d.buffs.find(b=>b.t==='def')?.v||1;
  const ter=TERRAIN[G.tac.map?.[d.gy]?.[d.gx]]||TERRAIN[0];
  const defBonus=1+ter.defB;
  const base=a.atk*(1+a.lv*.06)*ab*pw;
  const red=d.def*.5*db*defBonus;
  const v=.9+Math.random()*.2;
  const evaChance=ter.evaB+(d.buffs.find(b=>b.t==='eva')?.v||0)*.1;
  if(Math.random()<evaChance)return{dmg:0,crit:false,ta,miss:true};
  const cr=Math.random()<.1;
  return{dmg:Math.max(1,Math.floor((base-red)*ta*v*(cr?1.8:1))),crit:cr,ta,miss:false}
}

function fDmg(u,d,tp='phys',cr=false){
  const el=document.createElement('div');el.className=`float-dmg ${cr?'dmg-crit':'dmg-'+tp}`;
  el.textContent=tp==='heal'?`+${d}`:(tp==='miss'?'MISS':`-${d}`);
  el.style.left=(u._sx||C.width/2)+(Math.random()-.5)*20+'px';
  el.style.top=(u._sy||C.height/2)-30+'px';
  $('float-container').appendChild(el);setTimeout(()=>el.remove(),800);
}

function shake(i=200){G.tac.shake={x:0,y:0,t:i}}

// ===== EXECUTE ACTIONS =====

function execAttack(a,t){
  const{dmg,crit,ta,miss}=calcDmg(a,t);
  if(miss){sfx('miss');fDmg(t,0,'miss');setTacInfo(`${a.nm}의 공격! ${t.nm} 회피!`)}
  else{sfx(crit?'crit':'hit');shake(crit?300:150);t.hp=Math.max(0,t.hp-dmg);fDmg(t,dmg,'phys',crit);
    let m=`${a.nm}\u2192${t.nm} ${dmg}피해!`;if(crit)m+=' [크리티컬!]';if(ta>1)m+=' [유리!]';if(ta<1)m+=' [불리]';setTacInfo(m);
    if(t.hp<=0){t.alive=false;t.hp=0}
    chkEnrage(t);
  }
  a.acted=true;G.tac.atkRange=[];G.tac.moveRange=[];G.tac.selUnit=null;
  clearTacActions();
  setTimeout(()=>{if(!checkBattleEnd())checkAllyPhaseEnd()},600);
}

function execSkill(a,t,sk){
  a.mp-=sk.mp;sfx('skill');
  if(sk.t==='single'||sk.t==='charge'){
    const{dmg,crit,miss}=calcDmg(a,t,sk.pw);
    if(miss){fDmg(t,0,'miss');setTacInfo(`${a.nm}의 ${sk.n}! ${t.nm} 회피!`)}
    else{shake(300);t.hp=Math.max(0,t.hp-dmg);fDmg(t,dmg,'magic',crit);
      let m=`${a.nm}의 ${sk.n}! ${t.nm}에게 ${dmg}피해!`;
      if(sk.st&&t.alive){t.stunned=true;m+=' [기절!]'}
      setTacInfo(m);if(t.hp<=0){t.alive=false;t.hp=0}chkEnrage(t)}
  }else if(sk.t==='multi'){
    let total=0;
    for(let h=0;h<(sk.h||2);h++){
      setTimeout(()=>{if(!t.alive)return;const{dmg}=calcDmg(a,t,sk.pw);t.hp=Math.max(0,t.hp-dmg);fDmg(t,dmg,'phys');sfx('hit');shake(100);total+=dmg;if(t.hp<=0){t.alive=false;t.hp=0}},h*200);
    }
    setTacInfo(`${a.nm}의 ${sk.n}! ${sk.h||2}연타!`);
  }else if(sk.t==='drain'){
    const{dmg}=calcDmg(a,t,sk.pw);shake(300);t.hp=Math.max(0,t.hp-dmg);fDmg(t,dmg,'magic');
    const hl=Math.floor(dmg*.3);a.hp=Math.min(a.mhp,a.hp+hl);fDmg(a,hl,'heal');
    setTacInfo(`${a.nm}의 ${sk.n}! ${dmg}피해+${hl}흡수!`);if(t.hp<=0){t.alive=false;t.hp=0}
  }else if(sk.t==='aoe_area'){
    // Hit all enemies in radius around target
    const rad=sk.rad||1;const tc=G.tac;
    const targets=[...tc.enemies.filter(e=>e.alive&&Math.abs(e.gx-t.gx)+Math.abs(e.gy-t.gy)<=rad)];
    shake(400);
    targets.forEach((et,i)=>setTimeout(()=>{
      const{dmg}=calcDmg(a,et,sk.pw);et.hp=Math.max(0,et.hp-dmg);fDmg(et,dmg,'magic');
      if(et.hp<=0){et.alive=false;et.hp=0}
    },i*100));
    setTacInfo(`${a.nm}의 ${sk.n}! 범위 공격!`);
  }else if(sk.t==='heal_area'){
    const rad=sk.rad||1;const tc=G.tac;
    const targets=tc.allies.filter(al=>al.alive&&Math.abs(al.gx-a.gx)+Math.abs(al.gy-a.gy)<=rad);
    targets.forEach((al,i)=>setTimeout(()=>{
      const hl=Math.floor(a.atk*sk.pw*.5+a.lv*3);al.hp=Math.min(al.mhp,al.hp+hl);fDmg(al,hl,'heal');sfx('heal');
    },i*100));
    setTacInfo(`${a.nm}의 ${sk.n}! 범위 회복!`);
  }else if(sk.t==='revive'){
    if(!t.alive){t.alive=true;t.hp=Math.floor(t.mhp*.5);fDmg(t,t.hp,'heal');sfx('heal');setTacInfo(`${a.nm}의 ${sk.n}! ${t.nm} 부활!`)}
  }else if(sk.t.includes('buff')){
    execBuffSkill(a,sk);
  }else if(sk.t.includes('debuff')){
    execDebuffSkill(a,t,sk);
  }
  a.acted=true;G.tac.skillRange=[];G.tac.selUnit=null;clearTacActions();
  setTimeout(()=>{if(!checkBattleEnd())checkAllyPhaseEnd()},700);
}

function execSelfSkill(u,sk){
  u.mp-=sk.mp;sfx('skill');
  if(sk.t==='buff_def'){u.buffs.push({t:'def',turns:3,v:sk.pw});setTacInfo(`${u.nm}의 ${sk.n}! 방어력 증가!`)}
  else if(sk.t==='buff_eva'){u.buffs.push({t:'eva',turns:3,v:sk.pw});setTacInfo(`${u.nm}의 ${sk.n}! 회피 증가!`)}
  else if(sk.t==='buff_mov'){u.buffs.push({t:'mov',turns:3,v:sk.pw});setTacInfo(`${u.nm}의 ${sk.n}! 이동력 증가!`)}
  u.acted=true;G.tac.selUnit=null;clearTacActions();
  setTimeout(()=>checkAllyPhaseEnd(),500);
}

function execBuffSkill(a,sk){
  const rad=sk.rad||2;const tc=G.tac;
  const targets=tc.allies.filter(al=>al.alive&&Math.abs(al.gx-a.gx)+Math.abs(al.gy-a.gy)<=rad);
  if(sk.t==='buff_atk_area'){targets.forEach(al=>al.buffs.push({t:'atk',turns:3,v:sk.pw}));setTacInfo(`${a.nm}의 ${sk.n}! 범위 공격력 증가!`)}
  else if(sk.t==='buff_def_area'){targets.forEach(al=>al.buffs.push({t:'def',turns:3,v:sk.pw}));setTacInfo(`${a.nm}의 ${sk.n}! 범위 방어력 증가!`)}
  else if(sk.t==='king_buff_area'){targets.forEach(al=>{al.buffs.push({t:'atk',turns:3,v:1.3});al.buffs.push({t:'def',turns:3,v:1.3})});setTacInfo(`${a.nm}의 ${sk.n}! 범위 능력 강화!`)}
  sfx('skill');
}

function execDebuffSkill(a,t,sk){
  const rad=sk.rad||1;const tc=G.tac;
  const targets=tc.enemies.filter(e=>e.alive&&Math.abs(e.gx-t.gx)+Math.abs(e.gy-t.gy)<=rad);
  targets.forEach(e=>e.buffs.push({t:'acc_down',turns:2,v:.7}));
  setTacInfo(`${a.nm}의 ${sk.n}! 적 명중 감소!`);sfx('skill');
}

function execItemUse(id,t){
  const it=ITEMS[id],inv=G.inv.find(i=>i.id===id);if(!inv||inv.q<=0)return;inv.q--;
  if(it.heal&&t.alive){t.hp=Math.min(t.mhp,t.hp+it.heal);fDmg(t,it.heal,'heal');sfx('heal');setTacInfo(`${it.n} 사용! HP ${it.heal} 회복!`)}
  if(it.hmp&&t.alive){t.mp=Math.min(t.mmp,t.mp+(it.hmp||0));if(it.hmp)fDmg(t,it.hmp,'heal')}
  if(it.rev&&!t.alive){t.alive=true;t.hp=Math.floor(t.mhp*it.rpct);fDmg(t,t.hp,'heal');sfx('heal');setTacInfo(`${t.nm} 부활!`)}
  const u=G.tac.selUnit;if(u)u.acted=true;
  G.tac.skillRange=[];G.tac.selUnit=null;clearTacActions();
  setTimeout(()=>checkAllyPhaseEnd(),500);
}

function chkEnrage(t){if(t.isBoss&&t.enrageAt&&t.alive&&t.hp/t.mhp<=t.enrageAt&&!t.enraged){t.enraged=true;t.atk=Math.floor(t.atk*1.5);t.spd+=3;setTacInfo(`${t.nm} 분노! 공격력 대폭 증가!`)}}

// ===== PHASE MANAGEMENT =====

function checkAllyPhaseEnd(){
  const tc=G.tac;
  if(tc.allies.every(u=>!u.alive||u.acted)){
    // All allies acted -> Enemy phase
    setTimeout(startEnemyPhase,500);
  }else{
    tc.phase='ally';setTacInfo('아군 페이즈 - 유닛을 선택하세요');
    $('tac-phase').textContent='아군 페이즈';
  }
}

function startEnemyPhase(){
  const tc=G.tac;tc.phase='enemy';
  $('tac-phase').textContent='적군 페이즈';setTacInfo('적의 차례...');
  clearTacActions();sfx('phase');
  tc.enemies.filter(e=>e.alive).forEach(e=>{e.acted=false;e.moved=false;if(e.stunned){e.stunned=false;e.acted=true}});
  // Decay buffs
  [...tc.allies,...tc.enemies].forEach(u=>u.buffs=u.buffs.filter(b=>{b.turns--;return b.turns>0}));
  setTimeout(()=>processEnemyAI(0),600);
}

function processEnemyAI(idx){
  const tc=G.tac;
  const activeEnemies=tc.enemies.filter(e=>e.alive&&!e.acted);
  if(idx>=activeEnemies.length){
    // End enemy phase
    setTimeout(startNewTurn,500);return;
  }
  const en=activeEnemies[idx];
  enemyAI(en,()=>setTimeout(()=>processEnemyAI(idx+1),400));
}

// ===== ENEMY AI (MAJOR UPGRADE) =====
// - Focus fire: prefer targets with <30% HP
// - Ranged units stay at max range
// - Boss skill usage at 60% (was 35%)
// - Terrain preference when moving

function enemyAI(en,cb){
  const tc=G.tac;
  const targets=tc.allies.filter(a=>a.alive);
  if(!targets.length){checkBattleEnd();cb();return}

  // Find nearest target
  let nearest=null,minDist=999,bestTarget=null;
  targets.forEach(t=>{const d=Math.abs(t.gx-en.gx)+Math.abs(t.gy-en.gy);if(d<minDist){minDist=d;nearest=t}});

  // Focus fire: prefer low-HP targets within reach
  const lowHP=targets.filter(t=>t.hp/t.mhp<0.3);
  if(lowHP.length>0){
    let cDist=999;
    lowHP.forEach(t=>{
      const d=Math.abs(t.gx-en.gx)+Math.abs(t.gy-en.gy);
      if(d<cDist){cDist=d;bestTarget=t}
    });
    if(cDist>getEffMov(en)+en.rng)bestTarget=null;
  }
  bestTarget=bestTarget||nearest;

  // Skill chance: boss 60%, normal 35%
  const skillChance=en.isBoss?0.6:0.35;
  const distToTarget=Math.abs(bestTarget.gx-en.gx)+Math.abs(bestTarget.gy-en.gy);

  if(distToTarget<=en.rng){
    // In range - attack or use skill
    if(en.skills?.length&&Math.random()<skillChance&&en.mp>=(en.skills[0].mp||0)){
      const sk=en.skills[Math.floor(Math.random()*en.skills.length)];
      if(en.mp>=(sk.mp||0)){
        en.mp-=sk.mp;sfx('skill');
        if(sk.t==='aoe_area'){
          shake(300);const rad=sk.rad||1;
          const hits=targets.filter(t=>Math.abs(t.gx-bestTarget.gx)+Math.abs(t.gy-bestTarget.gy)<=rad);
          hits.forEach((t,i)=>setTimeout(()=>{const{dmg}=calcDmg(en,t,sk.pw);t.hp=Math.max(0,t.hp-dmg);fDmg(t,dmg,'magic');if(t.hp<=0){t.alive=false;t.hp=0}},i*100));
          setTacInfo(`${en.nm}의 ${sk.n}!`);
        }else{
          const{dmg,crit,miss}=calcDmg(en,bestTarget,sk.pw);
          if(miss){fDmg(bestTarget,0,'miss')}
          else{shake(250);bestTarget.hp=Math.max(0,bestTarget.hp-dmg);fDmg(bestTarget,dmg,'magic',crit);
            if(sk.st&&bestTarget.alive)bestTarget.stunned=true;
            if(bestTarget.hp<=0){bestTarget.alive=false;bestTarget.hp=0}
          }
          setTacInfo(`${en.nm}의 ${sk.n}!`);
        }
        en.acted=true;
        setTimeout(()=>{checkBattleEnd();cb()},500);return;
      }
    }
    // Normal attack
    const{dmg,crit,miss}=calcDmg(en,bestTarget);
    if(miss){sfx('miss');fDmg(bestTarget,0,'miss');setTacInfo(`${en.nm}\u2192${bestTarget.nm} 회피!`)}
    else{sfx(crit?'crit':'hit');shake(crit?250:120);bestTarget.hp=Math.max(0,bestTarget.hp-dmg);fDmg(bestTarget,dmg,'phys',crit);
      setTacInfo(`${en.nm}\u2192${bestTarget.nm} ${dmg}피해!`);if(bestTarget.hp<=0){bestTarget.alive=false;bestTarget.hp=0}}
    en.acted=true;
    setTimeout(()=>{checkBattleEnd();cb()},500);
  }else{
    // Move toward target
    const moveRange=calcEnemyMoveRange(en);
    if(moveRange.length>0){
      // Ranged units: stop at max range instead of getting adjacent
      const isRanged=en.rng>=3;
      let bestTile=null,bestDist=999;
      moveRange.forEach(p=>{
        const d=Math.abs(p.x-bestTarget.gx)+Math.abs(p.y-bestTarget.gy);
        if(isRanged){
          // Ranged: prefer tiles at exactly max range
          if(d<=en.rng&&d>=en.rng-1&&d<bestDist){bestDist=d;bestTile=p}
          else if(!bestTile&&d<bestDist){bestDist=d;bestTile=p}
        }else{
          // Melee: prefer tiles with terrain bonus when equidistant
          const curDefB=TERRAIN[tc.map[p.y]?.[p.x]]?.defB||0;
          const bestDefB=bestTile?TERRAIN[tc.map[bestTile.y]?.[bestTile.x]]?.defB||0:0;
          if(d<bestDist||(d===bestDist&&curDefB>bestDefB)){
            bestDist=d;bestTile=p;
          }
        }
      });
      if(bestTile){sfx('move');en.gx=bestTile.x;en.gy=bestTile.y;}
    }
    // Try attack after move
    const distAfter=Math.abs(bestTarget.gx-en.gx)+Math.abs(bestTarget.gy-en.gy);
    if(distAfter<=en.rng){
      setTimeout(()=>{
        // Re-check focus fire after move: prefer low-HP in new range
        let atkTarget=bestTarget;
        const inRangeTargets=targets.filter(t=>t.alive&&Math.abs(t.gx-en.gx)+Math.abs(t.gy-en.gy)<=en.rng);
        const lowHPInRange=inRangeTargets.filter(t=>t.hp/t.mhp<0.3);
        if(lowHPInRange.length>0){atkTarget=lowHPInRange[0]}

        // Try skill after move for bosses
        if(en.isBoss&&en.skills?.length&&Math.random()<0.4&&en.mp>=(en.skills[0].mp||0)){
          const sk=en.skills[Math.floor(Math.random()*en.skills.length)];
          if(en.mp>=(sk.mp||0)){
            en.mp-=sk.mp;sfx('skill');
            if(sk.t==='aoe_area'){
              shake(300);const rad=sk.rad||1;
              const hits=targets.filter(t=>t.alive&&Math.abs(t.gx-atkTarget.gx)+Math.abs(t.gy-atkTarget.gy)<=rad);
              hits.forEach((t,i)=>setTimeout(()=>{const{dmg}=calcDmg(en,t,sk.pw);t.hp=Math.max(0,t.hp-dmg);fDmg(t,dmg,'magic');if(t.hp<=0){t.alive=false;t.hp=0}},i*100));
              setTacInfo(`${en.nm}의 ${sk.n}!`);
            }else{
              const{dmg,crit,miss}=calcDmg(en,atkTarget,sk.pw);
              if(miss){fDmg(atkTarget,0,'miss')}
              else{shake(250);atkTarget.hp=Math.max(0,atkTarget.hp-dmg);fDmg(atkTarget,dmg,'magic',crit);
                if(sk.st&&atkTarget.alive)atkTarget.stunned=true;
                if(atkTarget.hp<=0){atkTarget.alive=false;atkTarget.hp=0}
              }
              setTacInfo(`${en.nm}의 ${sk.n}!`);
            }
            en.acted=true;
            setTimeout(()=>{checkBattleEnd();cb()},400);return;
          }
        }

        // Normal attack after move
        const{dmg,crit,miss}=calcDmg(en,atkTarget);
        if(miss){sfx('miss');fDmg(atkTarget,0,'miss')}
        else{sfx(crit?'crit':'hit');shake(crit?250:120);atkTarget.hp=Math.max(0,atkTarget.hp-dmg);fDmg(atkTarget,dmg,'phys',crit);
          if(atkTarget.hp<=0){atkTarget.alive=false;atkTarget.hp=0}}
        setTacInfo(`${en.nm}\u2192${atkTarget.nm} ${miss?'회피!':dmg+'피해!'}`);
        en.acted=true;setTimeout(()=>{checkBattleEnd();cb()},400);
      },300);
    }else{
      en.acted=true;cb();
    }
  }
}

// ===== ENEMY MOVEMENT RANGE =====

function calcEnemyMoveRange(unit){
  const tc=G.tac,map=tc.map,mw=tc.mapW,mh=tc.mapH;
  const mov=getEffMov(unit);
  const range=[],visited=new Map();
  const key=(x,y)=>x+','+y;
  const q=[[unit.gx,unit.gy,mov]];visited.set(key(unit.gx,unit.gy),mov);
  const occupied=new Set();
  [...tc.allies,...tc.enemies].forEach(u=>{if(u.alive&&u!==unit)occupied.add(key(u.gx,u.gy))});
  while(q.length){
    const[cx,cy,rem]=q.shift();
    [[0,1],[0,-1],[1,0],[-1,0]].forEach(([dx,dy])=>{
      const nx=cx+dx,ny=cy+dy,k=key(nx,ny);
      if(nx<0||nx>=mw||ny<0||ny>=mh)return;
      const t=map[ny][nx],ter=TERRAIN[t];
      if(!ter||!ter.pass)return;
      const cost=ter.mc;const nrem=rem-cost;if(nrem<0)return;
      if(occupied.has(k))return;
      if(visited.has(k)&&visited.get(k)>=nrem)return;
      visited.set(k,nrem);range.push({x:nx,y:ny});
      q.push([nx,ny,nrem]);
    });
  }
  const seen=new Set();
  return range.filter(p=>{const k=key(p.x,p.y);if(seen.has(k))return false;seen.add(k);return true});
}

// ===== TURN MANAGEMENT (with reinforcement system) =====

function startNewTurn(){
  const tc=G.tac;tc.turn++;
  tc.allies.filter(a=>a.alive).forEach(a=>{a.acted=false;a.moved=false});

  // Reinforcement check
  const stData=STAGES[G.stage]?.tacBattle;
  if(stData?.reinforcements){
    stData.reinforcements.forEach(r=>{
      if(r.turn===tc.turn){
        r.enemies.forEach((e,i)=>{
          const pos=r.positions[i]||[0,0];
          tc.enemies.push({...e,alive:true,acted:false,moved:false,stunned:false,
            buffs:[],ally:false,gx:pos[0],gy:pos[1],_sx:0,_sy:0,enraged:false,
            mov:e.mov||(CLS[e.cl]||{}).mov||4,rng:e.rng||(CLS[e.cl]||{}).rng||1});
        });
        setTacInfo('\u26A0\uFE0F 적 증원 등장!');sfx('phase');
      }
    });
  }

  tc.phase='ally';tc.selUnit=null;
  $('tac-phase').textContent='아군 페이즈';
  setTacInfo(`턴 ${tc.turn} - 아군 페이즈`);
  sfx('phase');
}

// ===== BATTLE END CHECK =====

function checkBattleEnd(){
  const tc=G.tac;
  const ae=tc.enemies.filter(e=>e.alive);
  const aa=tc.allies.filter(a=>a.alive);
  if(!ae.length){
    if(tc.waves&&tc.waveIdx<tc.waves.length-1){
      setTacInfo('Wave 클리어!');
      setTimeout(()=>{
        const tacData=STAGES[G.stage].tacBattle;
        loadTacWave(tc.waveIdx+1,tacData);
        tc.allies.forEach(a=>{a.acted=false;a.moved=false});
        tc.phase='ally';setTacInfo(`Wave ${tc.waveIdx+1} 시작!`);
        $('tac-phase').textContent='아군 페이즈';
      },1000);return true;
    }
    setTimeout(showVic,500);return true;
  }
  // Defeat: leader dead or all dead
  const leader=tc.allies.find(a=>a.isLeader);
  if((leader&&!leader.alive)||!aa.length){setTimeout(showDef,500);return true}
  return false;
}

// ===== VICTORY / DEFEAT =====

function showVic(){
  const st=STAGES[G.stage];stopBGM();sfx('vic');G.mode='victory';hideTacUI();
  let te=st.rewards.exp,tg=st.rewards.gold;G.gold+=tg;
  // Collect enemy exp/gold
  const tc=G.tac;
  tc.waves.forEach(wave=>wave.forEach(e=>{te+=e.exp||0;tg+=e.gold||0}));
  let rh=`<div class="reward-item"><span>경험치:</span> +${te}</div><div class="reward-item"><span>골드:</span> +${tg}G</div>`;
  // === Item drops from enemies ===
  const droppedItems=[];
  tc.waves.forEach(wave=>wave.forEach(e=>{
    if(e.drops&&e.drops.length>0){
      e.drops.forEach(d=>{
        if(Math.random()<d.rate){
          droppedItems.push(d.id);
          addInv(d.id,1);
          rh+=`<div class="reward-item" style="color:#88ff88">드롭: <span>${ITEMS[d.id]?.n||d.id}</span> 획득!</div>`;
        }
      });
    }
  }));
  // === Level up + Promotion check ===
  const promoQueue=[];
  G.party.filter(c=>c.alive).forEach(c=>{c.exp+=te;while(c.exp>=c.exn){c.exp-=c.exn;c.lv++;c.exn=c.lv*30+50;c.mhp+=12;c.hp=c.mhp;c.mmp+=5;c.mp=c.mmp;c.atk+=3;c.def+=2;c.spd+=1;rh+=`<div class="reward-item" style="color:#FFD700">${c.nm} 레벨업! Lv.${c.lv}</div>`;sfx('lvl');
    // Check class promotion
    const promo=checkPromotion(c);
    if(promo&&c.cl!==promo.to){
      const oldCl=applyPromotion(c,promo);
      rh+=`<div class="reward-item" style="color:#ff88ff;font-weight:700">${c.nm}: ${oldCl} \u2192 ${promo.to} 승급!</div>`;
      promoQueue.push({nm:c.nm,oldCl,newCl:promo.to,portrait:c.portrait});
    }
  }});
  st.rewards.items?.forEach(ri=>{addInv(ri.id,ri.q);rh+=`<div class="reward-item"><span>${ITEMS[ri.id].n}</span> x${ri.q} 획득!</div>`});
  $('victory-rewards').innerHTML=rh;$('victory-screen').classList.add('on');
  // Show promotion popups after a delay
  if(promoQueue.length>0){
    setTimeout(()=>showPromoPopups(promoQueue,0),500);
  }
}

function showPromoPopups(queue,idx){
  if(idx>=queue.length)return;
  const p=queue[idx];
  const popup=document.createElement('div');
  popup.className='promo-popup';
  popup.innerHTML=`<div style="font-size:36px;margin-bottom:8px">${p.portrait}</div><h3>승급!</h3><p>${p.nm}이(가)<br><span style="color:#aaa">${p.oldCl}</span> \u2192 <span style="color:#FFD700;font-weight:900">${p.newCl}</span><br>으로 승급했습니다!</p><button onclick="this.parentElement.remove()">확인</button>`;
  document.body.appendChild(popup);
  popup.querySelector('button').addEventListener('click',()=>showPromoPopups(queue,idx+1));
}

function showDef(){stopBGM();sfx('lose');G.mode='defeat';hideTacUI();$('defeat-screen').classList.add('on')}

window.onVictoryContinue=function(){
  $('victory-screen').classList.remove('on');const st=STAGES[G.stage];
  G.party.forEach(c=>{if(c.alive){c.hp=c.mhp;c.mp=c.mmp}});
  if(st.post?.length)startDlg(st.post,()=>{doRecruit(st);completeArea()});
  else{doRecruit(st);completeArea()}
};

window.retryStage=function(){$('defeat-screen').classList.remove('on');G.party.forEach(c=>{c.alive=true;c.hp=c.mhp;c.mp=c.mmp;c.acted=false;c.moved=false;c.stunned=false;c.buffs=[]});startArea(G.stage)};

window.backToTitle=function(){$('defeat-screen').classList.remove('on');stopBGM();G.mode='title';$('title-screen').style.display='flex';resetTitleHTML()};

// ===== CLICK HANDLER FOR TACTICAL BATTLE =====

function handleTacClick(cx,cy){
  const tc=G.tac;if(!tc.map)return;
  const mw=tc.mapW,mh=tc.mapH;
  const totalW=mw*BTILE,totalH=mh*BTILE;
  const offX=Math.max(0,(C.width-totalW)/2);
  const offY=Math.max(0,(C.height-totalH)/2 - 30);
  const gx=Math.floor((cx-offX)/BTILE),gy=Math.floor((cy-offY)/BTILE);
  if(gx<0||gx>=mw||gy<0||gy>=mh)return;
  tc.cursor.x=gx;tc.cursor.y=gy;
  // Show unit info on hover
  const unit=[...tc.allies,...tc.enemies].find(u=>u.alive&&u.gx===gx&&u.gy===gy);
  if(unit)showUnitInfo(unit);

  if(tc.phase==='ally'){
    // Select ally unit
    const ally=tc.allies.find(a=>a.alive&&!a.acted&&a.gx===gx&&a.gy===gy);
    if(ally){sfx('sel');tc.selUnit=ally;showTacActions(ally);showUnitInfo(ally);
      setTacInfo(`${ally.nm} 선택됨`);tc.moveRange=[];tc.atkRange=[];tc.skillRange=[]}
    else{tc.selUnit=null;clearTacActions();tc.moveRange=[];tc.atkRange=[];tc.skillRange=[]}
  }else if(tc.phase==='move_target'){
    const valid=tc.moveRange.some(p=>p.x===gx&&p.y===gy);
    if(valid&&tc.selUnit){
      sfx('move');tc.selUnit.gx=gx;tc.selUnit.gy=gy;tc.selUnit.moved=true;
      tc.moveRange=[];tc.phase='ally';showTacActions(tc.selUnit);setTacInfo(`${tc.selUnit.nm} 이동 완료 - 행동을 선택하세요`);
    }else{
      // Cancel move
      tc.moveRange=[];tc.phase='ally';
      if(tc.selUnit)showTacActions(tc.selUnit);
    }
  }else if(tc.phase==='target'){
    const enemy=tc.enemies.find(e=>e.alive&&e.gx===gx&&e.gy===gy);
    if(enemy&&tc.atkRange.some(p=>p.x===gx&&p.y===gy)){
      execAttack(tc.selUnit,enemy);
    }else{tc.atkRange=[];tc.phase='ally';if(tc.selUnit)showTacActions(tc.selUnit)}
  }else if(tc.phase==='skill_target'){
    const inRange=tc.skillRange.some(p=>p.x===gx&&p.y===gy);
    if(inRange){
      const sk=tc.pendingSkill;
      if(sk.tg==='area'){
        // AoE: target the clicked tile (enemies in radius)
        const fakeTarget={gx,gy};
        if(sk.t.includes('heal')||sk.t.includes('buff')){
          execSkill(tc.selUnit,fakeTarget,sk);
        }else{
          // Find enemy at or near target
          const target=tc.enemies.find(e=>e.alive&&e.gx===gx&&e.gy===gy)||{gx,gy};
          execSkill(tc.selUnit,target,sk);
        }
      }else{
        // Single target
        const target=[...tc.enemies,...tc.allies].find(u=>u.alive&&u.gx===gx&&u.gy===gy);
        if(target)execSkill(tc.selUnit,target,sk);
        else{tc.skillRange=[];tc.phase='ally';if(tc.selUnit)showTacActions(tc.selUnit)}
      }
    }else{tc.skillRange=[];tc.phase='ally';if(tc.selUnit)showTacActions(tc.selUnit)}
  }else if(tc.phase==='item_target'){
    const inRange=tc.skillRange.some(p=>p.x===gx&&p.y===gy);
    if(inRange){
      const target=[...tc.allies].find(u=>u.gx===gx&&u.gy===gy);
      if(target)execItemUse(tc.pendingItem,target);
      else{tc.skillRange=[];tc.phase='ally';if(tc.selUnit)showTacActions(tc.selUnit)}
    }else{tc.skillRange=[];tc.phase='ally';if(tc.selUnit)showTacActions(tc.selUnit)}
  }
}
