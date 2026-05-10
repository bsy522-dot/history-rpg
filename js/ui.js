// ===== ui.js — Korean History RPG v9 UI Functions =====

// --- Shop Mode ---
let shopMode='buy';

// --- Battle Log (v9.0) ---
let battleLog=[];

// --- Tactical UI ---
function showTacUI(){$('tac-ui').style.display='block';$('tac-unit-info').style.display='block'}
function hideTacUI(){$('tac-ui').style.display='none';$('tac-unit-info').style.display='none'}
function setTacInfo(t){$('tac-info').textContent=t}
function clearTacActions(){$('tac-actions').innerHTML=''}
function showTacActions(unit){
  if(!unit||unit.acted)return clearTacActions();
  const sk=getSk(unit),hi=G.inv.some(i=>ITEMS[i.id]?.t==='cons'&&i.q>0);
  const canMove=!unit.moved;
  $('tac-actions').innerHTML=
    `${canMove?'<button class="btn-move" onclick="tacAct(\'move\')" aria-label="이동">🦶 이동</button>':''}`+
    `<button class="btn-atk" onclick="tacAct('atk')" aria-label="공격">⚔️ 공격</button>`+
    `<button class="btn-skill" ${sk.length===0?'disabled':''} onclick="tacAct('skill')" aria-label="기술">✨ 기술</button>`+
    `<button class="btn-item" ${!hi?'disabled':''} onclick="tacAct('item')" aria-label="아이템">🎁 아이템</button>`+
    `<button class="btn-wait" onclick="tacAct('wait')" aria-label="대기">⏳ 대기</button>`;
}

// --- Unit Info Panel ---
function showUnitInfo(unit){
  if(!unit){$('tac-unit-info').style.display='none';return}
  $('tac-unit-info').style.display='block';
  $('tui-name').textContent=`${unit.portrait} ${unit.nm} Lv.${unit.lv}`;
  const ter=TERRAIN[G.tac.map[unit.gy]?.[unit.gx]]||TERRAIN[0];
  $('tui-stats').innerHTML=
    `<div class="tui-row"><span>HP</span><span>${unit.hp}/${unit.mhp}</span></div>`+
    `<div class="tui-row"><span>MP</span><span>${unit.mp}/${unit.mmp}</span></div>`+
    `<div class="tui-row"><span>ATK</span><span>${unit.atk}</span></div>`+
    `<div class="tui-row"><span>DEF</span><span>${unit.def}</span></div>`+
    `<div class="tui-row"><span>MOV</span><span>${getEffMov(unit)}</span></div>`+
    `<div class="tui-row"><span>RNG</span><span>${unit.rng}</span></div>`;
  $('tui-terrain').textContent=`지형: ${ter.n} (방어+${(ter.defB*100)|0}% 회피+${(ter.evaB*100)|0}%)`;
}

// --- Player Actions ---
window.tacAct=function(a){
  const tc=G.tac,u=tc.selUnit;if(!u||!u.ally||u.acted)return;sfx('sel');
  if(a==='move'){
    if(u.moved){setTacInfo('이미 이동했습니다');return}
    tc.moveRange=calcMoveRange(u);tc.atkRange=[];tc.skillRange=[];
    tc.phase='move_target';setTacInfo('이동할 위치를 선택하세요');clearTacActions();
  }else if(a==='atk'){
    tc.moveRange=[];tc.atkRange=calcAtkRange(u);tc.skillRange=[];
    tc.phase='target';tc.selAction='atk';setTacInfo('공격 대상을 선택하세요');clearTacActions();
  }else if(a==='skill'){
    showSkillMenu(u);
  }else if(a==='item'){
    showItemMenu(u);
  }else if(a==='wait'){
    u.acted=true;tc.moveRange=[];tc.atkRange=[];tc.selUnit=null;
    clearTacActions();checkAllyPhaseEnd();
  }
};

// --- Skill Menu ---
function showSkillMenu(ch){
  const sk=getSk(ch);
  $('skill-list').innerHTML=sk.map((s,i)=>`<button class="skill-btn" ${ch.mp<s.mp?'disabled':''} onclick="tacSelSkill(${i})">${s.n} <span style="color:#88aaff">MP ${s.mp}</span> <span style="color:#888;font-size:9px">사거리${s.rng||1}</span><br><span style="font-size:9px;color:#888">${s.d}</span></button>`).join('')+`<button class="skill-btn" onclick="$('skill-menu').style.display='none';showTacActions(G.tac.selUnit)" style="border-color:#888">취소</button>`;
  $('skill-menu').style.display='block';
}
window.tacSelSkill=function(i){
  const tc=G.tac,u=tc.selUnit,sk=getSk(u)[i];
  $('skill-menu').style.display='none';
  tc.pendingSkill=sk;
  if(sk.tg==='self'){
    execSelfSkill(u,sk);return;
  }
  const rng=sk.rng||u.rng;
  tc.skillRange=calcAtkRange(u,rng);tc.moveRange=[];tc.atkRange=[];
  tc.phase='skill_target';tc.selAction='skill';
  setTacInfo(`${sk.n} 대상을 선택하세요 (사거리 ${rng})`);clearTacActions();
};

// --- Item Menu ---
function showItemMenu(ch){
  const cons=G.inv.filter(i=>ITEMS[i.id]?.t==='cons'&&i.q>0&&(ITEMS[i.id].heal||ITEMS[i.id].hmp||ITEMS[i.id].rev));
  $('item-list').innerHTML=cons.map(i=>`<button class="item-btn" onclick="tacSelItem('${i.id}')">${ITEMS[i.id].n} x${i.q}<br><span style="font-size:9px;color:#888">${ITEMS[i.id].d}</span></button>`).join('')+`<button class="item-btn" onclick="$('item-menu').style.display='none';showTacActions(G.tac.selUnit)" style="border-color:#888">취소</button>`;
  $('item-menu').style.display='block';
}
window.tacSelItem=function(id){
  const tc=G.tac;
  $('item-menu').style.display='none';
  tc.pendingItem=id;
  // Show range 1 for item use
  tc.skillRange=calcAtkRange(tc.selUnit,1);tc.moveRange=[];tc.atkRange=[];
  // Include self
  tc.skillRange.push({x:tc.selUnit.gx,y:tc.selUnit.gy});
  tc.phase='item_target';tc.selAction='item';
  setTacInfo('아이템 사용 대상을 선택하세요');clearTacActions();
};

// --- Dialogue System ---
function startDlg(lines,cb){G.dlgQ=lines;G.dlgI=0;G.dlgCb=cb;G.dlgLen=0;G.dlgTyping=true;G.mode='dialogue';showDL();$('dlg').style.display='block'}
function showDL(){
  const l=G.dlgQ[G.dlgI];$('dlg-speaker').textContent=l.s||'';$('dlg-text').textContent='';G.dlgLen=0;G.dlgTyping=true;$('dlg-next').style.display='none';
  const p=$('dlg-portrait');
  const pm={'환웅':'👑','환인':'👴','풍백':'🌬️','우사':'🌧️','운사':'☁️','웅녀':'🌸','웅녀(곰)':'🐻','범족 부족장':'🐯','범족 선봉대장':'🐅','웅족 족장':'🐻','단군왕검':'👶','단군':'🏛️','마을 어른':'👨‍🌾','혼돈의 마물':'👹','비왕장군':'⚔️','건설 감독':'👷','대신':'📜','법관':'⚖️','현자':'🧙','예맥족 전사':'🛡️','예맥족 족장':'🛡️','상인':'🏪','위만':'⚔️','준왕의 신하':'📜','위만의 장수':'⚔️','진번국 족장':'🛡️','한나라 장수':'🔴','우거왕':'🏯','한나라 총사령관':'🔴','성기 대신':'📜','해모수':'☀️','동명왕':'👑','부여 대신':'📜','옥저 읍군':'🐚','동예 삼로':'🏔️','마한 진왕':'🗿','역사의 목소리':'📜','선비족 침략자':'🏇'};
  p.textContent=pm[l.s]||(l.s?'🧑':'📜');
}
function updDT(dt){if(!G.dlgTyping)return;const l=G.dlgQ[G.dlgI];G.dlgTimer+=dt;if(G.dlgTimer>30){G.dlgTimer=0;G.dlgLen++;$('dlg-text').textContent=l.t.substring(0,G.dlgLen);if(G.dlgLen>=l.t.length){G.dlgTyping=false;$('dlg-next').style.display='block'}}}
function advDlg(){if(G.dlgTyping){const l=G.dlgQ[G.dlgI];$('dlg-text').textContent=l.t;G.dlgTyping=false;$('dlg-next').style.display='block';return}G.dlgI++;if(G.dlgI<G.dlgQ.length)showDL();else{$('dlg').style.display='none';if(G.dlgCb){const cb=G.dlgCb;G.dlgCb=null;cb()}}}
$('dlg').addEventListener('click',()=>{if(G.mode==='dialogue')advDlg()});

// --- Episode Banner ---
function showEpBanner(ep,cb){
  const el=$('episode-banner');el.querySelector('.ep-num').textContent=`에피소드 ${ep.ep}-${ep.sub}`;
  el.querySelector('.ep-title').textContent=ep.title;el.querySelector('.ep-desc').textContent=ep.desc;
  el.classList.add('on');G.mode='banner';
  const handler=()=>{el.classList.remove('on');el.removeEventListener('click',handler);cb()};
  setTimeout(()=>el.addEventListener('click',handler),500);
}

// --- HUD ---
function updHUD(){$('hud-party').innerHTML=G.party.map(c=>{const hp=(c.hp/c.mhp*100).toFixed(0),mp=(c.mp/c.mmp*100).toFixed(0);return`<div class="hud-char" ${c.alive?'':'style="opacity:.4"'}><div class="hud-char-name">${c.portrait} ${c.nm} ${c.lv}</div><div class="hud-bar"><div class="hud-bar-hp" style="width:${hp}%"></div></div><div class="hud-bar"><div class="hud-bar-mp" style="width:${mp}%"></div></div></div>`}).join('')}

// --- Menu/Save/Load ---
window.toggleMenu=function(){const m=$('menu-overlay');if(m.classList.contains('on')){m.classList.remove('on');if(G.mode==='menu')G.mode=G._pm||'map'}else{G._pm=G.mode;G.mode='menu';m.classList.add('on');sfx('menu')}};
window.openStatusScreen=function(){
  $('menu-overlay').classList.remove('on');$('status-screen').style.display='block';G.mode='status';
  $('status-content').innerHTML=G.party.map(c=>{const sk=getSk(c);const promo=checkPromotion(c);const promoInfo=promo&&c.cl!==promo.to?`<div class="equip-row" style="color:#ff88ff">다음 승급: Lv.${promo.lv} → ${promo.to}</div>`:(PROMOTIONS[c.cl]?`<div class="equip-row" style="color:#888">다음 승급: ${PROMOTIONS[c.cl].map(p=>`Lv.${p.lv}→${p.to}`).join(', ')}</div>`:'');return`<div class="status-card"><h3>${c.portrait} ${c.nm} (${c.cl}) Lv.${c.lv}</h3><div class="stat-row"><span>HP</span><span>${c.hp}/${c.mhp}</span></div><div class="stat-row"><span>MP</span><span>${c.mp}/${c.mmp}</span></div><div class="stat-row"><span>ATK</span><span>${c.atk}</span></div><div class="stat-row"><span>DEF</span><span>${c.def}</span></div><div class="stat-row"><span>MOV</span><span>${c.mov}</span></div><div class="stat-row"><span>RNG</span><span>${c.rng}</span></div><div class="stat-row"><span>EXP</span><span>${c.exp}/${c.exn}</span></div><div class="equip-row">무기: ${c.weapon?ITEMS[c.weapon]?.n:'없음'}</div><div class="equip-row">갑옷: ${c.armor?ITEMS[c.armor]?.n:'없음'}</div><div class="equip-row">장신구: ${c.acc?ITEMS[c.acc]?.n:'없음'}</div><div class="equip-row">기술: ${sk.map(s=>`${s.n}(사거리${s.rng||1})`).join(', ')||'없음'}</div>${promoInfo}</div>`}).join('')+`<div class="status-card"><h3>소지금: ${G.gold}G</h3><h4 style="color:#c4956a;margin-top:4px">인벤토리</h4>${G.inv.filter(i=>i.q>0).map(i=>`<div class="stat-row"><span>${ITEMS[i.id]?.n}</span><span>x${i.q}</span></div>`).join('')||'비어있음'}</div>`};
window.closeStatusScreen=function(){$('status-screen').style.display='none';G.mode=G._pm||'map'};
window.openSaveScreen=function(mode){
  G.saveMode=mode;$('menu-overlay').classList.remove('on');$('save-screen').style.display='block';$('save-title').textContent=mode==='save'?'저장':'불러오기';G.mode='save';
  const c=$('save-slots');c.innerHTML='';
  // Auto-save slot (slot 0) - load only
  const autoData=localStorage.getItem('krpg7_auto');
  if(autoData){
    const sl=document.createElement('div');sl.className='save-slot';
    const p=JSON.parse(autoData);
    sl.innerHTML=`<h4>자동저장</h4><p>Ch${p.chapter||1} ${p.sid||'?'} ${p.pn||'?'} Lv.${p.plv||'?'} ${p.date||''}</p>`;
    sl.style.borderColor='#c4956a';
    if(mode==='load'){sl.onclick=()=>{loadGame(0);closeSaveScreen()}}
    else{sl.style.opacity='.6';sl.title='자동저장 슬롯은 직접 저장할 수 없습니다'}
    c.appendChild(sl);
  }
  for(let i=1;i<=5;i++){const d=localStorage.getItem(`krpg7_${i}`),sl=document.createElement('div');sl.className='save-slot';
    if(d){const p=JSON.parse(d);sl.innerHTML=`<h4>슬롯 ${i}</h4><p>Ch${p.chapter||1} ${p.sid||'?'} ${p.pn||'?'} Lv.${p.plv||'?'} ${p.date||''}</p>`}
    else sl.innerHTML=`<h4>슬롯 ${i}</h4><p>비어있음</p>`;
    sl.onclick=()=>{if(mode==='save'){saveGame(i);closeSaveScreen();startDlg([{s:'',t:'저장 완료!'}],()=>{G.mode=G._pm||'map'})}else if(d){loadGame(i);closeSaveScreen()}};c.appendChild(sl)}};
window.closeSaveScreen=function(){$('save-screen').style.display='none';if(G.mode==='save')G.mode=G._pm||'map'};
window.autoSave=function(){try{saveGame(0);const ind=document.getElementById('autosave-indicator');if(ind){ind.style.display='block';ind.textContent='자동저장';setTimeout(()=>ind.style.display='none',1500)}}catch(e){}};
function saveGame(s){const d={stage:G.stage,chapter:G.chapter,sid:STAGES[G.stage]?.id,party:G.party.map(c=>({id:c.id,nm:c.nm,cl:c.cl,lv:c.lv,exp:c.exp,exn:c.exn,mhp:c.mhp,hp:c.hp,mmp:c.mmp,mp:c.mp,atk:c.atk,def:c.def,spd:c.spd,mov:c.mov,rng:c.rng,weapon:c.weapon,armor:c.armor,acc:c.acc,alive:c.alive,isLeader:c.isLeader})),inv:G.inv,gold:G.gold,cleared:G.cleared,difficulty:G.difficulty,pn:G.party.map(c=>c.nm).join(','),plv:G.party[0]?.lv,date:new Date().toLocaleString('ko-KR')};const key=s===0?'krpg7_auto':`krpg7_${s}`;localStorage.setItem(key,JSON.stringify(d))}
function loadGame(s){const r=localStorage.getItem(s===0?'krpg7_auto':`krpg7_${s}`);if(!r)return;const d=JSON.parse(r);G.chapter=d.chapter||1;G.difficulty=d.difficulty||1;G.party=d.party.map(c=>{const ch=mkCh(c.id,c.nm,c.cl,c.lv,true,{weapon:c.weapon,armor:c.armor,acc:c.acc,leader:c.isLeader});ch.exp=c.exp;ch.exn=c.exn;ch.hp=c.hp;ch.mp=c.mp;ch.alive=c.alive!==false;ch.atk=c.atk;ch.def=c.def;ch.spd=c.spd;ch.mhp=c.mhp;ch.mmp=c.mmp;return ch});G.inv=d.inv||[];G.gold=d.gold||0;G.cleared=d.cleared||[];$('title-screen').style.display='none';startArea(d.stage)}

// --- Chapter Select ---
window.openChapterSelect=function(){initAudio();$('title-screen').style.display='none';
  const ch1Done=localStorage.getItem('krpg7_ch1_cleared')==='true';
  const ch2Done=localStorage.getItem('krpg7_ch2_cleared')==='true';
  const ch3Done=localStorage.getItem('krpg7_ch3_cleared')==='true';
  $('ch1-status').className=ch1Done?'ch-status done':'ch-status new';$('ch1-status').textContent=ch1Done?'클리어 완료':'시작';
  if(ch1Done){$('ch2-card').classList.remove('locked');$('ch2-status').className=ch2Done?'ch-status done':'ch-status new';$('ch2-status').textContent=ch2Done?'클리어 완료':'시작'}
  else{$('ch2-card').classList.add('locked');$('ch2-status').className='ch-status lock';$('ch2-status').innerHTML='&#128274; 챕터1 클리어 필요'}
  if(ch2Done){$('ch3-card').classList.remove('locked');$('ch3-status').className=ch3Done?'ch-status done':'ch-status new';$('ch3-status').textContent=ch3Done?'클리어 완료':'시작'}
  else{$('ch3-card').classList.add('locked');$('ch3-status').className='ch-status lock';$('ch3-status').innerHTML='&#128274; 챕터2 클리어 필요'}
  if(ch3Done){$('ch4-card').classList.remove('locked');$('ch4-status').className='ch-status new';$('ch4-status').textContent='시작'}
  else{$('ch4-card').classList.add('locked');$('ch4-status').className='ch-status lock';$('ch4-status').innerHTML='&#128274; 챕터3 클리어 필요'}
  $('chapter-select').classList.add('on')};
window.closeChapterSelect=function(){$('chapter-select').classList.remove('on');$('title-screen').style.display='flex';resetTitleHTML()};
window.selectChapter=function(ch){
  if(ch===2&&localStorage.getItem('krpg7_ch1_cleared')!=='true'){sfx('miss');return}
  if(ch===3&&localStorage.getItem('krpg7_ch2_cleared')!=='true'){sfx('miss');return}
  if(ch===4&&localStorage.getItem('krpg7_ch3_cleared')!=='true'){sfx('miss');return}
  $('chapter-select').classList.remove('on');G.cleared=[];G.party=[];G.inv=[];G.gold=0;G.chapter=ch;
  if(ch===1){G.stage=0;showEpBanner(EPISODES[0],()=>startArea(0))}
  else if(ch===2){G.stage=CH2_START;showEpBanner(EPISODES.find(e=>e.areas.some(a=>a.ch2Init)),()=>startArea(CH2_START))}
  else if(ch===3){G.stage=CH3_START;showEpBanner(EPISODES.find(e=>e.areas.some(a=>a.ch3Init)),()=>startArea(CH3_START))}
  else if(ch===4){G.stage=CH4_START;showEpBanner(EPISODES.find(e=>e.areas.some(a=>a.ch4Init)),()=>startArea(CH4_START))}};

// --- Shop System ---
window.openShop=function(){
  G._pm=G.mode;G.mode='shop';
  $('shop-screen').style.display='block';
  shopMode='buy';
  $('shop-buy-tab').classList.add('active');
  $('shop-sell-tab').classList.remove('active');
  renderShop();sfx('menu');
};
window.closeShop=function(){
  $('shop-screen').style.display='none';
  G.mode=G._pm||'map';
};
window.shopTab=function(tab){
  shopMode=tab;
  $('shop-buy-tab').classList.toggle('active',tab==='buy');
  $('shop-sell-tab').classList.toggle('active',tab==='sell');
  renderShop();sfx('sel');
};
function renderShop(){
  $('shop-gold').textContent=`소지금: ${G.gold}G`;
  const list=$('shop-list');
  if(shopMode==='buy'){
    const stock=SHOP_STOCK[G.chapter]||SHOP_STOCK[1];
    list.innerHTML=stock.map(id=>{
      const it=ITEMS[id];if(!it||!it.price)return'';
      const canBuy=G.gold>=it.price;
      return`<div class="shop-item" style="${canBuy?'':'opacity:.5'}" onclick="${canBuy?`shopBuy('${id}')`:''}">
        <div><div class="si-name">${it.n}</div><div class="si-desc">${it.d}${it.atk?' ATK+'+it.atk:''}${it.def?' DEF+'+it.def:''}${it.hp?' HP+'+it.hp:''}${it.heal?' 회복:'+it.heal:''}</div></div>
        <div class="si-price">${it.price}G</div></div>`;
    }).join('');
  }else{
    // Sell mode - show inventory
    const sellable=G.inv.filter(i=>i.q>0&&ITEMS[i.id]);
    if(!sellable.length){list.innerHTML='<div style="text-align:center;color:#888;padding:20px">판매할 아이템이 없습니다</div>';return}
    list.innerHTML=sellable.map(inv=>{
      const it=ITEMS[inv.id];
      const sellPrice=Math.floor((it.price||0)*0.5);
      if(!sellPrice)return`<div class="shop-item" style="opacity:.5"><div><div class="si-name">${it.n} x${inv.q}</div><div class="si-desc">판매 불가</div></div><div class="si-price">-</div></div>`;
      return`<div class="shop-item" onclick="shopSell('${inv.id}')">
        <div><div class="si-name">${it.n} x${inv.q}</div><div class="si-desc">${it.d}</div></div>
        <div class="si-price">${sellPrice}G</div></div>`;
    }).join('');
  }
}
window.shopBuy=function(id){
  const it=ITEMS[id];if(!it||G.gold<it.price)return;
  G.gold-=it.price;addInv(id,1);sfx('sel');renderShop();
};
window.shopSell=function(id){
  const inv=G.inv.find(i=>i.id===id);const it=ITEMS[id];
  if(!inv||inv.q<=0||!it)return;
  const sellPrice=Math.floor((it.price||0)*0.5);if(!sellPrice)return;
  inv.q--;G.gold+=sellPrice;sfx('sel');renderShop();
};

// ===== v9.0: Dark Mode Toggle =====
window.toggleDarkMode=function(){
  document.body.classList.toggle('light-mode');
  const isLight=document.body.classList.contains('light-mode');
  localStorage.setItem('krpg-theme',isLight?'light':'dark');
  const btn=document.getElementById('theme-toggle');
  if(btn)btn.textContent=isLight?'🌙':'☀️';
};

function initTheme(){
  const saved=localStorage.getItem('krpg-theme');
  if(saved==='light'){
    document.body.classList.add('light-mode');
    const btn=document.getElementById('theme-toggle');
    if(btn)btn.textContent='🌙';
  }
}

// ===== v9.0: Battle Log =====
function addBattleLog(msg){
  battleLog.push(msg);
  if(battleLog.length>15)battleLog.shift();
  renderBattleLog();
}
function renderBattleLog(){
  const el=document.getElementById('battle-log');
  if(!el)return;
  el.innerHTML='<h4 style="color:#c4956a;margin:0 0 4px;font-size:10px">전투 기록</h4>'+
    battleLog.map(m=>`<div style="font-size:9px;color:#aaa;padding:1px 0;border-bottom:1px solid #2a2438">${m}</div>`).join('');
  el.scrollTop=el.scrollHeight;
}

// ===== v9.0: Keyboard Help Overlay =====
window.showKeyboardHelp=function(){
  const el=document.getElementById('kb-help');
  if(!el)return;
  el.style.display=el.style.display==='flex'?'none':'flex';
};

// Listen for '?' key to show keyboard help
addEventListener('keydown',function(e){
  if(e.key==='?'){
    if(typeof showKeyboardHelp==='function')showKeyboardHelp();
  }
});

// ===== v9.0: Difficulty selector rendering =====
function renderDifficultySelector(){
  const el=document.getElementById('difficulty-selector');
  if(!el)return;
  el.innerHTML=DIFFICULTY.map((d,i)=>
    `<button class="title-btn${i===G.difficulty?' title-btn-active':''}" style="padding:8px 16px;font-size:12px;margin:0 4px;${i===G.difficulty?'border-color:#FFD700;color:#FFD700':''}" onclick="setDifficulty(${i});renderDifficultySelector()">${d.name}</button>`
  ).join('');
}
window.renderDifficultySelector=renderDifficultySelector;

// Initialize theme on load
initTheme();
