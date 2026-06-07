// v15_patch.js — 한국사 영웅전 v15.0 Enhancement Patch
(function(){
'use strict';

var css=document.createElement('style');
css.textContent=[
'.v15-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:125;overflow-y:auto;padding:16px}',
'.v15-panel.on{display:block}',
'.v15-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v15-subtitle{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v15-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v15-close:hover{background:#8B2A1A}',
'.v15-tabs{display:flex;gap:4px;max-width:540px;margin:0 auto 12px;flex-wrap:wrap;justify-content:center}',
'.v15-tab{font-size:10px;padding:6px 12px;border:1px solid #3a3a4a;border-radius:6px;background:#2a2438;color:#e8dcc8;cursor:pointer;font-family:inherit;transition:all .2s}',
'.v15-tab.active{border-color:#FFD700;background:#3a3448;color:#FFD700}',
'.eq-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;max-width:540px;margin:0 auto}',
'.eq-card{background:rgba(26,20,40,.9);border:2px solid #3a3a4a;border-radius:12px;padding:12px;text-align:center;cursor:pointer;transition:all .3s;position:relative}',
'.eq-card:hover{border-color:#FFD700;transform:translateY(-2px)}',
'.eq-card.equipped{border-color:#4CAF50;box-shadow:0 0 12px rgba(76,175,80,.3)}',
'.eq-card .eq-icon{font-size:28px;margin-bottom:4px}',
'.eq-card .eq-name{font-size:11px;color:#e8dcc8;font-weight:700}',
'.eq-card .eq-stat{font-size:10px;color:#8a7a6a;margin-top:4px}',
'.eq-card .eq-cost{font-size:9px;color:#FFD700;margin-top:2px}',
'.spy-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;max-width:540px;margin:0 auto}',
'.spy-card{background:rgba(20,12,30,.9);border:2px solid #4a3a6a;border-radius:10px;padding:14px;cursor:pointer;transition:all .3s}',
'.spy-card:hover{border-color:#9C27B0;transform:translateY(-2px)}',
'.spy-card .spy-icon{font-size:24px;margin-bottom:6px}',
'.spy-card .spy-name{font-size:12px;color:#ce93d8;font-weight:700}',
'.spy-card .spy-desc{font-size:10px;color:#8a7a8a;margin-top:4px}',
'.ritual-list{max-width:540px;margin:0 auto}',
'.ritual-item{background:rgba(30,20,10,.9);border:1px solid #5a4a2a;border-radius:8px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:border-color .3s}',
'.ritual-item:hover{border-color:#FFD700}',
'.ritual-item .ri-icon{font-size:28px}',
'.ritual-item .ri-info{flex:1}',
'.ritual-item .ri-name{font-size:12px;color:#e8dcc8;font-weight:700}',
'.ritual-item .ri-eff{font-size:10px;color:#8a7a6a;margin-top:2px}',
'.supply-bar{max-width:540px;margin:0 auto}',
'.supply-row{display:flex;align-items:center;gap:8px;margin-bottom:10px;padding:8px;background:rgba(20,30,20,.8);border-radius:8px;border:1px solid #3a4a3a}',
'.supply-row .sr-icon{font-size:20px}',
'.supply-row .sr-name{font-size:11px;color:#a0c8a0;width:60px}',
'.supply-row .sr-bar{flex:1;height:14px;background:#1a2a1a;border-radius:7px;overflow:hidden;position:relative}',
'.supply-row .sr-fill{height:100%;border-radius:7px;transition:width .5s}',
'.supply-row .sr-val{font-size:10px;color:#e8dcc8;width:40px;text-align:right}',
'.promo-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;max-width:540px;margin:0 auto}',
'.promo-card{background:rgba(20,20,35,.9);border:2px solid #3a4a5a;border-radius:10px;padding:12px;text-align:center;transition:all .3s}',
'.promo-card:hover{border-color:#2196F3}',
'.promo-card .pc-icon{font-size:28px;margin-bottom:4px}',
'.promo-card .pc-name{font-size:11px;color:#90CAF9;font-weight:700}',
'.promo-card .pc-rank{font-size:10px;color:#5a7a9a;margin-top:2px}',
'.card-area{max-width:540px;margin:0 auto}',
'.card-hand{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:12px}',
'.hist-card{width:90px;height:130px;background:rgba(40,30,20,.95);border:2px solid #5a4a3a;border-radius:10px;padding:8px;text-align:center;cursor:pointer;transition:all .3s;display:flex;flex-direction:column;justify-content:space-between}',
'.hist-card:hover{border-color:#FFD700;transform:translateY(-4px)}',
'.hist-card .hc-icon{font-size:22px}',
'.hist-card .hc-name{font-size:9px;color:#e8dcc8;font-weight:700}',
'.hist-card .hc-eff{font-size:8px;color:#8a7a6a}',
'.camp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;max-width:540px;margin:0 auto}',
'.camp-act{background:rgba(15,25,15,.9);border:2px solid #3a5a3a;border-radius:10px;padding:14px;text-align:center;cursor:pointer;transition:all .3s}',
'.camp-act:hover{border-color:#66BB6A;transform:translateY(-2px)}',
'.camp-act .ca-icon{font-size:26px;margin-bottom:6px}',
'.camp-act .ca-name{font-size:11px;color:#a5d6a7;font-weight:700}',
'.camp-act .ca-desc{font-size:9px;color:#6a8a6a;margin-top:4px}',
'.war-sim{max-width:560px;margin:0 auto;text-align:center}',
'.war-sim canvas{border:2px solid #3a3a4a;border-radius:8px;background:#0a0a14;display:block;margin:0 auto 12px}',
'.war-sim .ws-ctrl{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}',
'.war-sim .ws-btn{padding:8px 16px;border:1px solid #4a3a2a;border-radius:6px;background:#2a1a0a;color:#e8dcc8;font-size:11px;cursor:pointer;font-family:inherit}',
'.war-sim .ws-btn:hover{border-color:#FFD700;background:#3a2a1a}',
'.war-sim .ws-status{font-size:11px;color:#8a8a9a;margin-top:8px}'
].join('\n');
document.head.appendChild(css);

// ─── Equipment System (18 items) ───
var EQUIP_DATA=[
{id:'bronze_sword',name:'청동검',icon:'⚔️',slot:'weapon',atk:5,def:0,cost:100},
{id:'iron_sword',name:'철검',icon:'🗡️',slot:'weapon',atk:10,def:0,cost:250},
{id:'gojoseon_bow',name:'맥궁',icon:'🏹',slot:'weapon',atk:8,def:0,cost:200},
{id:'stone_axe',name:'돌도끼',icon:'🪓',slot:'weapon',atk:6,def:1,cost:80},
{id:'jade_dagger',name:'옥비수',icon:'💎',slot:'weapon',atk:12,def:0,cost:400},
{id:'bronze_spear',name:'청동창',icon:'🔱',slot:'weapon',atk:7,def:2,cost:150},
{id:'leather_armor',name:'가죽갑',icon:'🦺',slot:'armor',atk:0,def:4,cost:120},
{id:'bronze_armor',name:'청동갑옷',icon:'🛡️',slot:'armor',atk:0,def:8,cost:300},
{id:'iron_armor',name:'철갑',icon:'⚙️',slot:'armor',atk:0,def:12,cost:500},
{id:'wolf_pelt',name:'늑대가죽',icon:'🐺',slot:'armor',atk:2,def:5,cost:180},
{id:'tiger_cloak',name:'호피망토',icon:'🐅',slot:'armor',atk:3,def:6,cost:350},
{id:'bone_shield',name:'골방패',icon:'🦴',slot:'armor',atk:0,def:7,cost:160},
{id:'jade_pendant',name:'옥목걸이',icon:'📿',slot:'accessory',atk:2,def:2,cost:200},
{id:'bear_totem',name:'곰 토템',icon:'🐻',slot:'accessory',atk:4,def:4,cost:350},
{id:'eagle_feather',name:'독수리 깃',icon:'🦅',slot:'accessory',atk:5,def:1,cost:280},
{id:'dragon_scale',name:'용비늘',icon:'🐉',slot:'accessory',atk:3,def:6,cost:500},
{id:'sun_amulet',name:'태양 부적',icon:'☀️',slot:'accessory',atk:6,def:3,cost:450},
{id:'moon_ring',name:'달 반지',icon:'🌙',slot:'accessory',atk:1,def:5,cost:320}
];

var equipped={weapon:null,armor:null,accessory:null};
var inventory=[];

function getEquipBonus(){
var atk=0,def=0;
Object.keys(equipped).forEach(function(slot){
var id=equipped[slot];if(!id)return;
var item=EQUIP_DATA.find(function(e){return e.id===id});
if(item){atk+=item.atk;def+=item.def;}
});
return{atk:atk,def:def};
}

function buyEquip(id){
var item=EQUIP_DATA.find(function(e){return e.id===id});
if(!item)return;
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
var gold=state.gold||0;
if(gold<item.cost){showToast('금화가 부족합니다!','#F44336');return;}
if(inventory.indexOf(id)>=0){showToast('이미 보유 중입니다','#FF9800');return;}
state.gold=gold-item.cost;
localStorage.setItem('kRPG_state',JSON.stringify(state));
inventory.push(id);
saveEquipState();
playSFX('purchase');
showToast(item.name+' 구매 완료!','#4CAF50');
renderEquipPanel();
}

function equipItem(id){
var item=EQUIP_DATA.find(function(e){return e.id===id});
if(!item)return;
if(inventory.indexOf(id)<0){buyEquip(id);return;}
if(equipped[item.slot]===id){equipped[item.slot]=null;}
else{equipped[item.slot]=id;}
saveEquipState();
playSFX('equip');
renderEquipPanel();
}

function saveEquipState(){localStorage.setItem('kRPG_equip',JSON.stringify({equipped:equipped,inventory:inventory}))}
function loadEquipState(){var d=JSON.parse(localStorage.getItem('kRPG_equip')||'{}');if(d.equipped)equipped=d.equipped;if(d.inventory)inventory=d.inventory;}

// ─── Spy/Intelligence System (6 operations) ───
var SPY_OPS=[
{id:'scout',name:'정찰',icon:'👁️',desc:'적 진영 정보 수집',cost:50,rate:80},
{id:'sabotage',name:'파괴공작',icon:'💣',desc:'적 보급로 차단',cost:120,rate:55},
{id:'assassin',name:'암살',icon:'🗡️',desc:'적 장수 암살 시도',cost:200,rate:35},
{id:'diplomat',name:'이간책',icon:'📜',desc:'적국 간 이간질',cost:150,rate:60},
{id:'steal',name:'기밀탈취',icon:'📋',desc:'전략 문서 탈취',cost:100,rate:65},
{id:'spread',name:'유언비어',icon:'🗣️',desc:'적 백성에 소문 유포',cost:80,rate:70}
];
var spyCooldowns={};

function executeSpy(opId){
var op=SPY_OPS.find(function(o){return o.id===opId});
if(!op)return;
if(spyCooldowns[opId]&&Date.now()-spyCooldowns[opId]<60000){showToast('쿨다운 중... (1분)','#FF9800');return;}
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
if((state.gold||0)<op.cost){showToast('금화 부족!','#F44336');return;}
state.gold=(state.gold||0)-op.cost;
localStorage.setItem('kRPG_state',JSON.stringify(state));
spyCooldowns[opId]=Date.now();
if(Math.random()*100<op.rate){playSFX('spy_success');showToast('첩보 성공!','#4CAF50');checkAch('spy_master');}
else{playSFX('spy_fail');showToast('첩보 실패... 첩자가 발각되었습니다','#F44336');}
renderSpyPanel();
}

// ─── Ritual/Ceremony System (6 rituals) ───
var RITUALS=[
{id:'heaven',name:'천제(天祭)',icon:'⛩️',effect:'전군 사기 +20%',cost:200,cd:180000},
{id:'harvest',name:'추수제',icon:'🌾',effect:'식량 생산 +30%',cost:100,cd:120000},
{id:'ancestor',name:'조상제',icon:'🕯️',effect:'경험치 +15%',cost:150,cd:150000},
{id:'rain',name:'기우제',icon:'🌧️',effect:'가뮄 해소, 식량+50',cost:120,cd:120000},
{id:'war_rit',name:'출정제',icon:'⚔️',effect:'공격력 +25% (3전투)',cost:250,cd:200000},
{id:'peace',name:'화평제',icon:'🕊️',effect:'외교우호도 +15',cost:180,cd:160000}
];
var ritualCooldowns={};

function performRitual(rId){
var r=RITUALS.find(function(x){return x.id===rId});
if(!r)return;
if(ritualCooldowns[rId]&&Date.now()-ritualCooldowns[rId]<r.cd){
var remain=Math.ceil((r.cd-(Date.now()-ritualCooldowns[rId]))/1000);
showToast('재사용 대기: '+remain+'초','#FF9800');return;
}
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
if((state.gold||0)<r.cost){showToast('금화 부족!','#F44336');return;}
state.gold=(state.gold||0)-r.cost;
localStorage.setItem('kRPG_state',JSON.stringify(state));
ritualCooldowns[rId]=Date.now();
playSFX('ritual');
showToast('🙏 '+r.name+' 완료: '+r.effect,'#9C27B0');
checkAch('priest');
renderRitualPanel();
}

// ─── Supply Chain System (5 resources) ───
var SUPPLY_TYPES=[
{id:'food',name:'식량',icon:'🌾',color:'#66BB6A',max:1000},
{id:'iron',name:'철',icon:'⛏️',color:'#78909C',max:500},
{id:'wood',name:'목재',icon:'🪵',color:'#8D6E63',max:800},
{id:'gold_ore',name:'금',icon:'✨',color:'#FFD700',max:300},
{id:'horse',name:'군마',icon:'🐴',color:'#A1887F',max:200}
];
var supplies={food:500,iron:100,wood:300,gold_ore:50,horse:30};

function loadSupplies(){var d=JSON.parse(localStorage.getItem('kRPG_supply')||'null');if(d)supplies=d;}
function saveSupplies(){localStorage.setItem('kRPG_supply',JSON.stringify(supplies))}

function produceSupply(){
supplies.food=Math.min(1000,supplies.food+Math.floor(Math.random()*20+10));
supplies.iron=Math.min(500,supplies.iron+Math.floor(Math.random()*5+2));
supplies.wood=Math.min(800,supplies.wood+Math.floor(Math.random()*10+5));
supplies.gold_ore=Math.min(300,supplies.gold_ore+Math.floor(Math.random()*3+1));
supplies.horse=Math.min(200,supplies.horse+Math.floor(Math.random()*2+1));
saveSupplies();
}

// ─── Unit Promotion System (6 unit types) ───
var UNIT_TYPES=[
{id:'infantry',name:'보병',icon:'🗡️',ranks:['신병','전사','정예','근위병'],baseAtk:5,baseDef:5},
{id:'archer',name:'궁병',icon:'🏹',ranks:['습사','명궁','신궁','만궁'],baseAtk:8,baseDef:3},
{id:'cavalry',name:'기병',icon:'🐴',ranks:['기마병','돌격병','철기병','천기병'],baseAtk:7,baseDef:6},
{id:'shaman',name:'무당',icon:'🔮',ranks:['견습','무녀','대무','신녀'],baseAtk:4,baseDef:4},
{id:'siege',name:'공성병',icon:'🏗️',ranks:['인부','기술자','장인','대장인'],baseAtk:10,baseDef:2},
{id:'guard',name:'호위병',icon:'🛡️',ranks:['경비','수문장','금위','왕호위'],baseAtk:4,baseDef:9}
];
var unitLevels={infantry:0,archer:0,cavalry:0,shaman:0,siege:0,guard:0};

function loadUnitLevels(){var d=JSON.parse(localStorage.getItem('kRPG_units')||'null');if(d)unitLevels=d;}
function saveUnitLevels(){localStorage.setItem('kRPG_units',JSON.stringify(unitLevels))}

function promoteUnit(uid){
var u=UNIT_TYPES.find(function(x){return x.id===uid});
if(!u)return;
var lv=unitLevels[uid]||0;
if(lv>=3){showToast('최고 등급입니다!','#FF9800');return;}
var cost=(lv+1)*150;
var state=JSON.parse(localStorage.getItem('kRPG_state')||'{}');
if((state.gold||0)<cost){showToast('금화 부족! (필요: '+cost+')','#F44336');return;}
state.gold-=cost;
localStorage.setItem('kRPG_state',JSON.stringify(state));
unitLevels[uid]=lv+1;
saveUnitLevels();
playSFX('promote');
showToast(u.name+' → '+u.ranks[lv+1]+' 승급!','#2196F3');
checkAch('commander');
renderPromoPanel();
}

// ─── History Card Game (24 cards) ───
var HISTORY_CARDS=[
{id:'dangun',name:'단군왕검',icon:'👑',effect:'전체 능력 +10%',rarity:'legendary'},
{id:'hwanung',name:'환웅',icon:'☁️',effect:'날씨 효과 무시',rarity:'epic'},
{id:'ungnyeo',name:'웅녀',icon:'🐻',effect:'방어 +20%',rarity:'epic'},
{id:'jemul',name:'제물',icon:'🍖',effect:'식량 +100',rarity:'common'},
{id:'cheontong',name:'천통',icon:'⚡',effect:'공격 +15%',rarity:'rare'},
{id:'arrow_rain',name:'화살비',icon:'🏹',effect:'적 전체 피해',rarity:'rare'},
{id:'ambush',name:'매복',icon:'🌿',effect:'선제공격 보장',rarity:'rare'},
{id:'reinforce',name:'원군',icon:'🏃',effect:'아군 병력 +20%',rarity:'epic'},
{id:'wall',name:'성벽',icon:'🏰',effect:'방어 +30%',rarity:'rare'},
{id:'spy_card',name:'첩자',icon:'🕵️',effect:'적 카드 1장 확인',rarity:'common'},
{id:'trade',name:'교역',icon:'🤝',effect:'금화 +200',rarity:'common'},
{id:'plague',name:'역병',icon:'☠️',effect:'적 병력 -15%',rarity:'rare'},
{id:'drought',name:'가뮄',icon:'☀️',effect:'식량 -50 (양측)',rarity:'common'},
{id:'flood',name:'홍수',icon:'🌊',effect:'이동 불가 1턴',rarity:'common'},
{id:'tiger_hunt',name:'호랑이사냥',icon:'🐅',effect:'용맹 +25%',rarity:'rare'},
{id:'iron_forge',name:'제철',icon:'⚒️',effect:'무기 강화 +1',rarity:'rare'},
{id:'alliance',name:'동맹',icon:'🤲',effect:'외교 +20',rarity:'epic'},
{id:'betrayal',name:'배신',icon:'💔',effect:'적 동맹 파괴',rarity:'epic'},
{id:'oracle',name:'신탁',icon:'🔮',effect:'다음 이벤트 예지',rarity:'rare'},
{id:'harvest_card',name:'풍년',icon:'🌽',effect:'식량 +200',rarity:'common'},
{id:'bronze_tech',name:'청동기술',icon:'🔧',effect:'생산 +25%',rarity:'rare'},
{id:'horse_train',name:'마술(馬術)',icon:'🏇',effect:'기병 공격 +30%',rarity:'epic'},
{id:'shield_wall',name:'방패진',icon:'🛡️',effect:'피해 감소 40%',rarity:'epic'},
{id:'fire_arrow',name:'화전(火箭)',icon:'🔥',effect:'공성 피해 +50%',rarity:'legendary'}
];

var playerDeck=[];var playerHand=[];

function initCardGame(){
var saved=JSON.parse(localStorage.getItem('kRPG_cards')||'null');
if(saved){playerDeck=saved.deck||[];playerHand=saved.hand||[];}
else{playerDeck=HISTORY_CARDS.filter(function(c){return c.rarity==='common'}).map(function(c){return c.id});playerHand=playerDeck.slice(0,5);}
}

function drawCard(){
var available=HISTORY_CARDS.filter(function(c){return playerDeck.indexOf(c.id)<0});
if(available.length===0){showToast('모든 카드를 보유 중!','#FF9800');return;}
var card=available[Math.floor(Math.random()*available.length)];
playerDeck.push(card.id);
if(playerHand.length<8)playerHand.push(card.id);
saveCards();playSFX('card_draw');
showToast('새 카드: '+card.name+' ('+card.effect+')','#FFD700');
checkAch('collector');renderCardPanel();
}

function playCard(cardId){
var idx=playerHand.indexOf(cardId);if(idx<0)return;
var card=HISTORY_CARDS.find(function(c){return c.id===cardId});if(!card)return;
playerHand.splice(idx,1);saveCards();playSFX('card_play');
showToast('카드 사용: '+card.name+' → '+card.effect,'#4CAF50');
renderCardPanel();
}

function saveCards(){localStorage.setItem('kRPG_cards',JSON.stringify({deck:playerDeck,hand:playerHand}))}

// ─── Camp System (6 activities) ───
var CAMP_ACTS=[
{id:'rest',name:'휴식',icon:'😴',desc:'체력 회복 +30%',duration:3000},
{id:'train',name:'훈련',icon:'⚔️',desc:'공격/방어 +5',duration:5000},
{id:'craft',name:'제작',icon:'🔨',desc:'장비 재료 획득',duration:4000},
{id:'hunt',name:'사냥',icon:'🦌',desc:'식량 +50, 가죽 획득',duration:4000},
{id:'meditate',name:'명상',icon:'🧘',desc:'경험치 +20%',duration:6000},
{id:'feast',name:'연회',icon:'🍖',desc:'전군 사기 +30%',duration:5000}
];
var campBusy=false;

function doCampActivity(actId){
if(campBusy){showToast('활동 진행 중...','#FF9800');return;}
var act=CAMP_ACTS.find(function(a){return a.id===actId});if(!act)return;
campBusy=true;playSFX('camp');
showToast('야영: '+act.name+' 진행 중...','#8BC34A');
setTimeout(function(){campBusy=false;showToast('야영 완료: '+act.desc,'#4CAF50');checkAch('camper');renderCampPanel();},act.duration);
}

// ─── War Simulator (Canvas) ───
var warCanvas=null,warCtx=null,warRunning=false;
var warUnits={ally:[],enemy:[]};

function initWarSim(){
if(!warCanvas){warCanvas=document.createElement('canvas');warCanvas.width=520;warCanvas.height=300;}
warCtx=warCanvas.getContext('2d');
warUnits.ally=[];warUnits.enemy=[];
for(var i=0;i<15;i++){
warUnits.ally.push({x:30+Math.random()*100,y:20+Math.random()*260,hp:100,atk:8+Math.random()*4,spd:0.5+Math.random()*0.3,color:'#4CAF50'});
warUnits.enemy.push({x:390+Math.random()*100,y:20+Math.random()*260,hp:100,atk:7+Math.random()*5,spd:0.4+Math.random()*0.3,color:'#F44336'});
}
}

function startWarSim(){
if(warRunning)return;
warRunning=true;initWarSim();playSFX('war_start');
requestAnimationFrame(warLoop);
}

function warLoop(){
if(!warRunning)return;
warCtx.fillStyle='#0a0a14';warCtx.fillRect(0,0,520,300);
warUnits.ally=warUnits.ally.filter(function(u){return u.hp>0});
warUnits.enemy=warUnits.enemy.filter(function(u){return u.hp>0});
if(warUnits.ally.length===0||warUnits.enemy.length===0){
warRunning=false;
var won=warUnits.ally.length>0;
warCtx.fillStyle=won?'#4CAF50':'#F44336';
warCtx.font='bold 20px serif';warCtx.textAlign='center';
warCtx.fillText(won?'아군 승리!':'적군 승리...',260,150);
if(won)checkAch('war_winner');return;
}
warUnits.ally.forEach(function(u){
var nearest=null,dist=Infinity;
warUnits.enemy.forEach(function(e){var d=Math.hypot(e.x-u.x,e.y-u.y);if(d<dist){dist=d;nearest=e;}});
if(nearest){if(dist<20){nearest.hp-=u.atk*0.1;}else{u.x+=u.spd;var dy=nearest.y-u.y;u.y+=dy>0?u.spd*0.3:-u.spd*0.3;}}
warCtx.beginPath();warCtx.arc(u.x,u.y,5,0,Math.PI*2);warCtx.fillStyle=u.color;warCtx.fill();
});
warUnits.enemy.forEach(function(u){
var nearest=null,dist=Infinity;
warUnits.ally.forEach(function(a){var d=Math.hypot(a.x-u.x,a.y-u.y);if(d<dist){dist=d;nearest=a;}});
if(nearest){if(dist<20){nearest.hp-=u.atk*0.1;}else{u.x-=u.spd;var dy=nearest.y-u.y;u.y+=dy>0?u.spd*0.3:-u.spd*0.3;}}
warCtx.beginPath();warCtx.arc(u.x,u.y,5,0,Math.PI*2);warCtx.fillStyle=u.color;warCtx.fill();
});
warCtx.fillStyle='#e8dcc8';warCtx.font='10px monospace';warCtx.textAlign='left';
warCtx.fillText('아군: '+warUnits.ally.length,10,15);
warCtx.textAlign='right';warCtx.fillText('적군: '+warUnits.enemy.length,510,15);
requestAnimationFrame(warLoop);
}

function stopWarSim(){warRunning=false;}

// ─── Quiz (15 new questions: 106~120) ───
var V15_QUIZ=[
{q:'고조선의 건국 이념은?',a:['홍익인간','위화도회군','삼한통일','척화비'],c:0},
{q:'비파형동검은 어느 문화의 유물인가?',a:['고조선','가야','백제','신라'],c:0},
{q:'단군왕검이 건국한 해는?',a:['BC 2333','BC 108','BC 57','BC 37'],c:0},
{q:'고조선의 8조법 중 현재 전해지는 조항 수는?',a:['3조','5조','8조','2조'],c:0},
{q:'위만조선의 수도는?',a:['왕검성','평양','서라벌','위례성'],c:0},
{q:'고조선을 멸망시킨 나라는?',a:['한(漢)','진(秦)','연(燕)','흉노'],c:0},
{q:'고인돌은 어떤 시대의 유적인가?',a:['청동기','철기','구석기','신석기'],c:0},
{q:'단군신화에서 곰이 사람이 되기 위해 먹은 것은?',a:['숡과 마늘','인삼','도토리','베'],c:0},
{q:'고조선의 세력 범위에 포함되지 않는 지역은?',a:['제주도','요동','한반도 북부','만주'],c:0},
{q:'미송리형 토기는 어느 문화와 관련이 있는가?',a:['고조선','가야','삼한','옥저'],c:0},
{q:'고조선의 제정일치 지배자를 무엇이라 하는가?',a:['단군','거서간','이사금','마립간'],c:0},
{q:'위만은 어느 나라에서 망명해왔는가?',a:['연(燕)','진(秦)','한(漢)','조(趙)'],c:0},
{q:'한사군 설치 연도는?',a:['BC 108','BC 194','BC 57','AD 313'],c:0},
{q:'고조선 사회의 특징이 아닌 것은?',a:['과거제도','노비 존재','계급사회','농경사회'],c:0},
{q:'탁자식 고인돌이 주로 분포한 지역은?',a:['북방(요동,평안)','남방(전라)','제주도','경상도'],c:0}
];

function registerV15Quiz(){
if(window.QUIZ_DATA&&Array.isArray(window.QUIZ_DATA)){
V15_QUIZ.forEach(function(q){var exists=window.QUIZ_DATA.some(function(eq){return eq.q===q.q});if(!exists)window.QUIZ_DATA.push(q);});
}
}

// ─── Achievements (12 new) ───
var V15_ACH=[
{id:'equip_master',name:'장비의 달인',desc:'장비 10개 이상 보유',icon:'⚔️'},
{id:'spy_master',name:'첩보의 왕',desc:'첩보 작전 5회 성공',icon:'🕵️'},
{id:'priest',name:'대제사장',desc:'제사 10회 수행',icon:'⛩️'},
{id:'supplier',name:'보급왕',desc:'모든 자원 50% 이상',icon:'📦'},
{id:'commander',name:'대장군',desc:'유닛 3종 이상 최고 등급',icon:'⭐'},
{id:'collector',name:'카드 수집가',desc:'역사 카드 15장 이상',icon:'🃏'},
{id:'camper',name:'야영 전문가',desc:'야영 활동 10회',icon:'⛺'},
{id:'war_winner',name:'전쟁 영웅',desc:'전쟁 시뮬레이션 3회 승리',icon:'🏆'},
{id:'full_equip',name:'완전무장',desc:'모든 슬롯 장비 착용',icon:'🛡️'},
{id:'card_master',name:'카드 마스터',desc:'레전더리 카드 2장 보유',icon:'👑'},
{id:'ritual_all',name:'신과 함께',desc:'모든 제사 1회 이상 수행',icon:'🙏'},
{id:'all_promote',name:'정예군단',desc:'모든 유닛 1등급 이상',icon:'💪'}
];
var v15AchProgress={};

function loadV15Ach(){var d=JSON.parse(localStorage.getItem('kRPG_v15ach')||'{}');v15AchProgress=d;}
function checkAch(type){
if(!v15AchProgress[type])v15AchProgress[type]=0;
v15AchProgress[type]++;
localStorage.setItem('kRPG_v15ach',JSON.stringify(v15AchProgress));
var thresholds={spy_master:5,priest:10,camper:10,war_winner:3,commander:3,collector:15};
if(thresholds[type]&&v15AchProgress[type]>=thresholds[type]){
var ach=V15_ACH.find(function(a){return a.id===type});
if(ach)showToast('🏆 업적 달성: '+ach.name,'#FFD700');
}
}

// ─── SFX (10 sounds) ───
var audioCtx=null;
function getACtx(){if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();return audioCtx;}

function playSFX(type){
try{
var ctx=getACtx();var osc=ctx.createOscillator();var gain=ctx.createGain();
osc.connect(gain);gain.connect(ctx.destination);var now=ctx.currentTime;
gain.gain.setValueAtTime(0.15,now);
switch(type){
case'purchase':osc.frequency.setValueAtTime(523,now);osc.frequency.setValueAtTime(659,now+0.08);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.type='sine';break;
case'equip':osc.frequency.setValueAtTime(440,now);osc.frequency.setValueAtTime(880,now+0.1);gain.gain.exponentialRampToValueAtTime(0.001,now+0.25);osc.type='triangle';break;
case'spy_success':osc.frequency.setValueAtTime(330,now);osc.frequency.linearRampToValueAtTime(660,now+0.15);gain.gain.exponentialRampToValueAtTime(0.001,now+0.3);osc.type='sawtooth';break;
case'spy_fail':osc.frequency.setValueAtTime(200,now);osc.frequency.linearRampToValueAtTime(100,now+0.2);gain.gain.exponentialRampToValueAtTime(0.001,now+0.3);osc.type='square';break;
case'ritual':osc.frequency.setValueAtTime(220,now);osc.frequency.setValueAtTime(330,now+0.2);osc.frequency.setValueAtTime(440,now+0.4);gain.gain.exponentialRampToValueAtTime(0.001,now+0.6);osc.type='sine';break;
case'promote':osc.frequency.setValueAtTime(440,now);osc.frequency.setValueAtTime(554,now+0.1);osc.frequency.setValueAtTime(659,now+0.2);gain.gain.exponentialRampToValueAtTime(0.001,now+0.35);osc.type='triangle';break;
case'card_draw':osc.frequency.setValueAtTime(800,now);osc.frequency.exponentialRampToValueAtTime(400,now+0.1);gain.gain.exponentialRampToValueAtTime(0.001,now+0.15);osc.type='sine';break;
case'card_play':osc.frequency.setValueAtTime(600,now);osc.frequency.setValueAtTime(900,now+0.05);osc.frequency.setValueAtTime(1200,now+0.1);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.type='sine';break;
case'camp':osc.frequency.setValueAtTime(260,now);osc.frequency.setValueAtTime(290,now+0.15);gain.gain.exponentialRampToValueAtTime(0.001,now+0.4);osc.type='sine';break;
case'war_start':osc.frequency.setValueAtTime(150,now);osc.frequency.linearRampToValueAtTime(300,now+0.3);gain.gain.setValueAtTime(0.2,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.5);osc.type='sawtooth';break;
}
osc.start(now);osc.stop(now+0.7);
}catch(e){}
}

// ─── Panel Rendering ───
function createPanel(id,title,subtitle){
var el=document.getElementById(id);
if(!el){el=document.createElement('div');el.id=id;el.className='v15-panel';document.body.appendChild(el);}
el.innerHTML='<h2>'+title+'</h2>'+(subtitle?'<p class="v15-subtitle">'+subtitle+'</p>':'');
return el;
}

function renderEquipPanel(){
var p=createPanel('v15-equip','⚔️ 장비 시스템','무기 &middot; 방어구 &middot; 장신구');
var tabs='<div class="v15-tabs"><button class="v15-tab active" data-slot="weapon">무기</button><button class="v15-tab" data-slot="armor">방어구</button><button class="v15-tab" data-slot="accessory">장신구</button></div>';
p.innerHTML+=tabs;
var grid=document.createElement('div');grid.className='eq-grid';grid.id='eq-grid';
var slot='weapon';
EQUIP_DATA.filter(function(e){return e.slot===slot}).forEach(function(item){
var owned=inventory.indexOf(item.id)>=0;var isEq=equipped[item.slot]===item.id;
var card=document.createElement('div');card.className='eq-card'+(isEq?' equipped':'');
card.innerHTML='<div class="eq-icon">'+item.icon+'</div><div class="eq-name">'+item.name+'</div><div class="eq-stat">공+'+item.atk+' 방+'+item.def+'</div><div class="eq-cost">'+(owned?(isEq?'착용중':'착용하기'):'💰'+item.cost)+'</div>';
card.onclick=function(){equipItem(item.id)};grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<button class="v15-close" onclick="document.getElementById(\'v15-equip\').classList.remove(\'on\')">닫기</button>';
p.querySelectorAll('.v15-tab').forEach(function(tab){
tab.onclick=function(){
p.querySelectorAll('.v15-tab').forEach(function(t){t.classList.remove('active')});
tab.classList.add('active');var s=tab.getAttribute('data-slot');
var g=p.querySelector('.eq-grid');g.innerHTML='';
EQUIP_DATA.filter(function(e){return e.slot===s}).forEach(function(item){
var owned=inventory.indexOf(item.id)>=0;var isEq=equipped[item.slot]===item.id;
var card=document.createElement('div');card.className='eq-card'+(isEq?' equipped':'');
card.innerHTML='<div class="eq-icon">'+item.icon+'</div><div class="eq-name">'+item.name+'</div><div class="eq-stat">공+'+item.atk+' 방+'+item.def+'</div><div class="eq-cost">'+(owned?(isEq?'착용중':'착용하기'):'💰'+item.cost)+'</div>';
card.onclick=function(){equipItem(item.id)};g.appendChild(card);
});};
});
}

function renderSpyPanel(){
var p=createPanel('v15-spy','🕵️ 첩보 작전','정보 수집 &middot; 파괴공작 &middot; 암살 &middot; 이간책');
var grid=document.createElement('div');grid.className='spy-grid';
SPY_OPS.forEach(function(op){
var cd=spyCooldowns[op.id]&&Date.now()-spyCooldowns[op.id]<60000;
var card=document.createElement('div');card.className='spy-card';card.style.opacity=cd?'0.5':'1';
card.innerHTML='<div class="spy-icon">'+op.icon+'</div><div class="spy-name">'+op.name+'</div><div class="spy-desc">'+op.desc+'</div><div class="eq-cost">💰'+op.cost+' | 성공률 '+op.rate+'%</div>';
card.onclick=function(){executeSpy(op.id)};grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<button class="v15-close" onclick="document.getElementById(\'v15-spy\').classList.remove(\'on\')">닫기</button>';
}

function renderRitualPanel(){
var p=createPanel('v15-ritual','⛩️ 제사 의식','하늘에 제를 올려 축복을 받으세요');
var list=document.createElement('div');list.className='ritual-list';
RITUALS.forEach(function(r){
var cd=ritualCooldowns[r.id]&&Date.now()-ritualCooldowns[r.id]<r.cd;
var item=document.createElement('div');item.className='ritual-item';item.style.opacity=cd?'0.5':'1';
item.innerHTML='<div class="ri-icon">'+r.icon+'</div><div class="ri-info"><div class="ri-name">'+r.name+'</div><div class="ri-eff">'+r.effect+' | 💰'+r.cost+'</div></div>';
item.onclick=function(){performRitual(r.id)};list.appendChild(item);
});
p.appendChild(list);
p.innerHTML+='<button class="v15-close" onclick="document.getElementById(\'v15-ritual\').classList.remove(\'on\')">닫기</button>';
}

function renderSupplyPanel(){
var p=createPanel('v15-supply','📦 보급 관리','자원 현황 및 생산');
var bar=document.createElement('div');bar.className='supply-bar';
SUPPLY_TYPES.forEach(function(s){
var val=supplies[s.id]||0;var pct=Math.round(val/s.max*100);
var row=document.createElement('div');row.className='supply-row';
row.innerHTML='<div class="sr-icon">'+s.icon+'</div><div class="sr-name">'+s.name+'</div><div class="sr-bar"><div class="sr-fill" style="width:'+pct+'%;background:'+s.color+'"></div></div><div class="sr-val">'+val+'/'+s.max+'</div>';
bar.appendChild(row);
});
p.appendChild(bar);
var btn=document.createElement('button');btn.className='v15-close';btn.textContent='자원 생산';btn.style.background='#2E7D32';
btn.onclick=function(){produceSupply();renderSupplyPanel();p.classList.add('on');};
p.appendChild(btn);
p.innerHTML+='<button class="v15-close" onclick="document.getElementById(\'v15-supply\').classList.remove(\'on\')">닫기</button>';
}

function renderPromoPanel(){
var p=createPanel('v15-promo','⭐ 유닛 승급','병종을 훈련하여 강화하세요');
var grid=document.createElement('div');grid.className='promo-grid';
UNIT_TYPES.forEach(function(u){
var lv=unitLevels[u.id]||0;
var card=document.createElement('div');card.className='promo-card';
card.innerHTML='<div class="pc-icon">'+u.icon+'</div><div class="pc-name">'+u.name+'</div><div class="pc-rank">'+u.ranks[lv]+(lv<3?' → '+u.ranks[lv+1]:' (MAX)')+'</div><div class="eq-cost">'+(lv<3?'💰'+((lv+1)*150):'최고 등급')+'</div>';
card.onclick=function(){promoteUnit(u.id)};grid.appendChild(card);
});
p.appendChild(grid);
p.innerHTML+='<button class="v15-close" onclick="document.getElementById(\'v15-promo\').classList.remove(\'on\')">닫기</button>';
}

function renderCardPanel(){
var p=createPanel('v15-cards','🃏 역사 카드','카드를 수집하고 전투에 사용하세요');
var area=document.createElement('div');area.className='card-area';
var hand=document.createElement('div');hand.className='card-hand';
playerHand.forEach(function(cid){
var card=HISTORY_CARDS.find(function(c){return c.id===cid});if(!card)return;
var el=document.createElement('div');el.className='hist-card';
var rc=card.rarity==='legendary'?'#FFD700':card.rarity==='epic'?'#9C27B0':card.rarity==='rare'?'#2196F3':'#9E9E9E';
el.style.borderColor=rc;
el.innerHTML='<div class="hc-icon">'+card.icon+'</div><div class="hc-name">'+card.name+'</div><div class="hc-eff">'+card.effect+'</div>';
el.onclick=function(){playCard(cid)};hand.appendChild(el);
});
area.appendChild(hand);
var drawBtn=document.createElement('button');drawBtn.className='v15-close';drawBtn.textContent='카드 뽑기 (무료)';drawBtn.style.background='#1565C0';
drawBtn.onclick=function(){drawCard()};area.appendChild(drawBtn);
p.appendChild(area);
p.innerHTML+='<p class="v15-subtitle">보유: '+playerDeck.length+'/'+HISTORY_CARDS.length+'장</p>';
p.innerHTML+='<button class="v15-close" onclick="document.getElementById(\'v15-cards\').classList.remove(\'on\')">닫기</button>';
}

function renderCampPanel(){
var p=createPanel('v15-camp','⛺ 야영','부대를 쉬게 하고 준비하세요');
var grid=document.createElement('div');grid.className='camp-grid';
CAMP_ACTS.forEach(function(act){
var el=document.createElement('div');el.className='camp-act';
el.innerHTML='<div class="ca-icon">'+act.icon+'</div><div class="ca-name">'+act.name+'</div><div class="ca-desc">'+act.desc+'</div>';
el.onclick=function(){doCampActivity(act.id)};grid.appendChild(el);
});
p.appendChild(grid);
p.innerHTML+='<button class="v15-close" onclick="document.getElementById(\'v15-camp\').classList.remove(\'on\')">닫기</button>';
}

function renderWarPanel(){
var p=createPanel('v15-war','⚔️ 전쟁 시뮬레이터','실시간 전투를 관전하세요');
var sim=document.createElement('div');sim.className='war-sim';
initWarSim();sim.appendChild(warCanvas);
var ctrl=document.createElement('div');ctrl.className='ws-ctrl';
var b1=document.createElement('button');b1.className='ws-btn';b1.textContent='▶ 전투 시작';b1.onclick=startWarSim;
var b2=document.createElement('button');b2.className='ws-btn';b2.textContent='⏹ 중지';b2.onclick=stopWarSim;
var b3=document.createElement('button');b3.className='ws-btn';b3.textContent='🔄 재배치';b3.onclick=function(){initWarSim();warCtx.fillStyle='#0a0a14';warCtx.fillRect(0,0,520,300);};
ctrl.appendChild(b1);ctrl.appendChild(b2);ctrl.appendChild(b3);sim.appendChild(ctrl);
p.appendChild(sim);
p.innerHTML+='<button class="v15-close" onclick="document.getElementById(\'v15-war\').classList.remove(\'on\')">닫기</button>';
}

// ─── Keyboard Shortcuts (8: Shift+E/I/R/U/P/C/A/W) ───
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
var map={'KeyE':['v15-equip',renderEquipPanel],'KeyI':['v15-spy',renderSpyPanel],'KeyR':['v15-ritual',renderRitualPanel],'KeyU':['v15-supply',renderSupplyPanel],'KeyP':['v15-promo',renderPromoPanel],'KeyC':['v15-cards',renderCardPanel],'KeyA':['v15-camp',renderCampPanel],'KeyW':['v15-war',renderWarPanel]};
if(map[e.code]){
e.preventDefault();var id=map[e.code][0],fn=map[e.code][1];
var el=document.getElementById(id);
if(el&&el.classList.contains('on')){el.classList.remove('on');}
else{fn();document.getElementById(id).classList.add('on');}
}
});

// ─── Toast ───
function showToast(msg,color){
var t=document.createElement('div');
t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:'+(color||'#333')+';color:#fff;padding:10px 20px;border-radius:20px;font-size:12px;z-index:9999;pointer-events:none;opacity:0;transition:opacity .3s;max-width:300px;text-align:center';
t.textContent=msg;document.body.appendChild(t);
requestAnimationFrame(function(){t.style.opacity='1'});
setTimeout(function(){t.style.opacity='0';setTimeout(function(){t.remove()},300)},2500);
}

// ─── Menu Integration ───
function addV15Menu(){
var sidebar=document.querySelector('.sidebar-content,.action-buttons,[class*="menu"]');
if(!sidebar){setTimeout(addV15Menu,2000);return;}
var btns=[
{label:'⚔️ 장비',fn:function(){renderEquipPanel();document.getElementById('v15-equip').classList.add('on')}},
{label:'🕵️ 첩보',fn:function(){renderSpyPanel();document.getElementById('v15-spy').classList.add('on')}},
{label:'⛩️ 제사',fn:function(){renderRitualPanel();document.getElementById('v15-ritual').classList.add('on')}},
{label:'📦 보급',fn:function(){renderSupplyPanel();document.getElementById('v15-supply').classList.add('on')}},
{label:'⭐ 승급',fn:function(){renderPromoPanel();document.getElementById('v15-promo').classList.add('on')}},
{label:'🃏 카드',fn:function(){renderCardPanel();document.getElementById('v15-cards').classList.add('on')}},
{label:'⛺ 야영',fn:function(){renderCampPanel();document.getElementById('v15-camp').classList.add('on')}},
{label:'⚔️ 전쟁',fn:function(){renderWarPanel();document.getElementById('v15-war').classList.add('on')}}
];
var container=document.createElement('div');
container.style.cssText='display:flex;flex-wrap:wrap;gap:4px;margin:8px 0;justify-content:center';
btns.forEach(function(b){
var btn=document.createElement('button');btn.textContent=b.label;
btn.style.cssText='padding:6px 10px;font-size:10px;border:1px solid #5a4a3a;border-radius:6px;background:#2a1a0a;color:#e8dcc8;cursor:pointer;font-family:inherit';
btn.onclick=b.fn;container.appendChild(btn);
});
sidebar.appendChild(container);
}

// ─── Init ───
function v15Init(){
loadEquipState();loadSupplies();loadUnitLevels();loadV15Ach();initCardGame();registerV15Quiz();
setTimeout(addV15Menu,1500);
setInterval(produceSupply,60000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',v15Init);}
else{v15Init();}

window._v15={getEquipBonus:getEquipBonus,playSFX:playSFX,supplies:supplies,unitLevels:unitLevels,EQUIP_DATA:EQUIP_DATA,HISTORY_CARDS:HISTORY_CARDS,V15_QUIZ:V15_QUIZ,V15_ACH:V15_ACH};
})();
