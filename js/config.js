// ============================================================
// config.js — 한국사 영웅전 v7 Constants & Data
// ============================================================

// --- Type Advantage ---
function typeAdv(a,d){const m={'궁병':'a','보병':'i','기마병':'c'};const x=m[a],y=m[d];if(!x||!y)return 1;if((x==='a'&&y==='i')||(x==='i'&&y==='c')||(x==='c'&&y==='a'))return 1.5;if((x==='i'&&y==='a')||(x==='c'&&y==='i')||(x==='a'&&y==='c'))return .75;return 1}

const BTILE=56; // battle tile size (increased from 48 for richer visuals)

// --- Class Data (with MOV and RNG for tactical) ---
const CLS={
'궁병':{e:'🏹',c:'#2a6a3a',mov:4,rng:3,sk:[{n:'연사',d:'2회 연속 공격',mp:8,t:'multi',h:2,pw:.7,tg:'single',rng:3},{n:'화살비',d:'범위 공격(사거리3)',mp:15,t:'aoe_area',pw:.6,tg:'area',rng:3,rad:1}]},
'보병':{e:'⚔️',c:'#6a3a2a',mov:4,rng:1,sk:[{n:'강타',d:'강력한 일격',mp:6,t:'single',pw:2,tg:'single',rng:1},{n:'방패막기',d:'방어+50% (3턴)',mp:10,t:'buff_def',pw:1.5,tg:'self'}]},
'기마병':{e:'🐴',c:'#5a4a2a',mov:6,rng:1,sk:[{n:'돌진',d:'돌격+기절',mp:10,t:'charge',pw:1.8,st:true,tg:'single',rng:2},{n:'기동',d:'이동력+2 (3턴)',mp:8,t:'buff_mov',pw:2,tg:'self'}]},
'신장':{e:'👑',c:'#8a6a2a',mov:4,rng:2,sk:[{n:'천부인·뇌',d:'범위 번개(사거리4)',mp:20,t:'aoe_area',pw:1.3,tg:'area',rng:4,rad:1},{n:'홍익신광',d:'범위 회복(주변1칸)',mp:15,t:'heal_area',pw:1,tg:'area',rng:0,rad:1},{n:'천부인·화',d:'단일 강력 공격',mp:12,t:'single',pw:2.5,tg:'single',rng:2}]},
'풍백':{e:'🌬️',c:'#3a5a6a',mov:4,rng:2,sk:[{n:'폭풍',d:'범위 공격(사거리3)',mp:12,t:'aoe_area',pw:1,tg:'area',rng:3,rad:1},{n:'바람막이',d:'회피 증가 (2턴)',mp:8,t:'buff_eva',pw:1,tg:'self'}]},
'우사':{e:'🌧️',c:'#2a3a6a',mov:4,rng:2,sk:[{n:'폭우',d:'범위+속도감소(사거리3)',mp:14,t:'aoe_area',pw:.8,tg:'area',rng:3,rad:1},{n:'치유의 비',d:'범위 회복(주변1칸)',mp:10,t:'heal_area',pw:.8,tg:'area',rng:0,rad:1}]},
'운사':{e:'☁️',c:'#5a5a6a',mov:4,rng:2,sk:[{n:'뇌운',d:'강력 단일 공격',mp:10,t:'single',pw:2.2,tg:'single',rng:2},{n:'안개',d:'적 명중 감소(범위2)',mp:8,t:'debuff_area',pw:1,tg:'area',rng:3,rad:1}]},
'웅녀':{e:'🌸',c:'#8a4a6a',mov:3,rng:1,sk:[{n:'대지의 축복',d:'범위 회복(주변2칸)',mp:12,t:'heal_area',pw:1.2,tg:'area',rng:0,rad:2},{n:'곰의 힘',d:'강력 일격',mp:10,t:'single',pw:2.3,tg:'single',rng:1},{n:'생명의 빛',d:'부활+회복',mp:25,t:'revive',pw:1,tg:'single',rng:1}]},
'단군':{e:'🏛️',c:'#aa8a2a',mov:4,rng:2,sk:[{n:'홍익인간',d:'범위 대회복(주변2칸)',mp:25,t:'heal_area',pw:1.8,tg:'area',rng:0,rad:2},{n:'천부인의 힘',d:'범위 강력 공격(사거리3)',mp:30,t:'aoe_area',pw:1.6,tg:'area',rng:3,rad:1},{n:'왕의 명령',d:'범위 버프(주변2칸)',mp:20,t:'king_buff_area',pw:1,tg:'area',rng:0,rad:2}]},
'신하장군':{e:'⚔️',c:'#6a5a2a',mov:5,rng:1,sk:[{n:'진격',d:'돌격+기절',mp:8,t:'charge',pw:2,st:true,tg:'single',rng:2},{n:'호령',d:'주변 아군 공격력 증가',mp:12,t:'buff_atk_area',pw:1.4,tg:'area',rng:0,rad:2}]},
// === Promoted Classes ===
'명궁':{e:'🎯',c:'#2a8a3a',mov:4,rng:4,sk:[{n:'연사',d:'2회 연속 공격',mp:8,t:'multi',h:2,pw:.7,tg:'single',rng:4},{n:'화살비',d:'범위 공격(사거리4)',mp:15,t:'aoe_area',pw:.6,tg:'area',rng:4,rad:1},{n:'관통사',d:'강력한 관통 화살',mp:12,t:'single',pw:2.2,tg:'single',rng:4}]},
'신궁':{e:'🏹‍🔥',c:'#1a9a2a',mov:4,rng:5,sk:[{n:'연사',d:'3회 연속 공격',mp:8,t:'multi',h:3,pw:.7,tg:'single',rng:5},{n:'화살비',d:'범위 공격(사거리5)',mp:15,t:'aoe_area',pw:.8,tg:'area',rng:5,rad:2},{n:'관통사',d:'강력한 관통 화살',mp:12,t:'single',pw:2.5,tg:'single',rng:5},{n:'신의 일격',d:'필살의 화살',mp:25,t:'single',pw:3.5,tg:'single',rng:5}]},
'중보병':{e:'🛡️',c:'#8a4a2a',mov:4,rng:1,sk:[{n:'강타',d:'강력한 일격',mp:6,t:'single',pw:2.2,tg:'single',rng:1},{n:'방패막기',d:'방어+50% (3턴)',mp:10,t:'buff_def',pw:1.5,tg:'self'},{n:'대지분쇄',d:'범위 공격',mp:14,t:'aoe_area',pw:1.2,tg:'area',rng:1,rad:1}]},
'근위병':{e:'🏰',c:'#aa5a2a',mov:4,rng:1,sk:[{n:'강타',d:'강력한 일격',mp:6,t:'single',pw:2.5,tg:'single',rng:1},{n:'철벽',d:'방어+80% (3턴)',mp:10,t:'buff_def',pw:1.8,tg:'self'},{n:'대지분쇄',d:'범위 공격',mp:14,t:'aoe_area',pw:1.5,tg:'area',rng:1,rad:1},{n:'수호',d:'주변 아군 방어 증가',mp:16,t:'buff_def_area',pw:1.5,tg:'area',rng:0,rad:2}]},
'돌기병':{e:'🐎',c:'#7a5a2a',mov:7,rng:1,sk:[{n:'돌진',d:'돌격+기절',mp:10,t:'charge',pw:2,st:true,tg:'single',rng:2},{n:'기동',d:'이동력+2 (3턴)',mp:8,t:'buff_mov',pw:2,tg:'self'},{n:'연환마',d:'2연속 돌격',mp:15,t:'multi',h:2,pw:1.5,tg:'single',rng:2}]},
'철기병':{e:'🐴‍🔥',c:'#9a6a2a',mov:8,rng:1,sk:[{n:'돌진',d:'돌격+기절',mp:10,t:'charge',pw:2.3,st:true,tg:'single',rng:3},{n:'기동',d:'이동력+3 (3턴)',mp:8,t:'buff_mov',pw:3,tg:'self'},{n:'연환마',d:'3연속 돌격',mp:15,t:'multi',h:3,pw:1.5,tg:'single',rng:3},{n:'철기 돌파',d:'최강 돌격',mp:25,t:'charge',pw:3,st:true,tg:'single',rng:3}]},
'대풍사':{e:'🌪️',c:'#3a7a8a',mov:4,rng:3,sk:[{n:'폭풍',d:'범위 공격(사거리4)',mp:12,t:'aoe_area',pw:1.2,tg:'area',rng:4,rad:1},{n:'바람막이',d:'회피 증가 (3턴)',mp:8,t:'buff_eva',pw:1.5,tg:'self'},{n:'태풍',d:'강력 범위 공격',mp:20,t:'aoe_area',pw:1.5,tg:'area',rng:4,rad:2}]},
'대우사':{e:'🌊',c:'#2a5a8a',mov:4,rng:3,sk:[{n:'폭우',d:'범위+속도감소(사거리4)',mp:14,t:'aoe_area',pw:1,tg:'area',rng:4,rad:1},{n:'치유의 비',d:'범위 회복(주변2칸)',mp:10,t:'heal_area',pw:1.2,tg:'area',rng:0,rad:2},{n:'대우술',d:'강력 범위 회복',mp:22,t:'heal_area',pw:1.8,tg:'area',rng:0,rad:2}]},
'대운사':{e:'⛈️',c:'#6a5a8a',mov:4,rng:3,sk:[{n:'뇌운',d:'강력 단일 공격',mp:10,t:'single',pw:2.5,tg:'single',rng:3},{n:'안개',d:'적 명중 감소(범위2)',mp:8,t:'debuff_area',pw:1,tg:'area',rng:3,rad:2},{n:'천둥벽력',d:'최강 범위 공격',mp:25,t:'aoe_area',pw:1.6,tg:'area',rng:3,rad:2}]},
'지모신':{e:'🌺',c:'#aa4a8a',mov:3,rng:2,sk:[{n:'대지의 축복',d:'범위 회복(주변3칸)',mp:12,t:'heal_area',pw:1.5,tg:'area',rng:0,rad:3},{n:'곰의 힘',d:'강력 일격',mp:10,t:'single',pw:2.5,tg:'single',rng:1},{n:'생명의 빛',d:'부활+전체회복',mp:20,t:'revive',pw:1,tg:'single',rng:2},{n:'대지모신의 은총',d:'전체 부활+회복',mp:40,t:'heal_area',pw:2,tg:'area',rng:0,rad:3}]},
'천왕':{e:'👑‍✨',c:'#da9a2a',mov:5,rng:3,sk:[{n:'천부인·뇌',d:'범위 번개(사거리5)',mp:20,t:'aoe_area',pw:1.6,tg:'area',rng:5,rad:2},{n:'홍익신광',d:'범위 회복(주변2칸)',mp:15,t:'heal_area',pw:1.5,tg:'area',rng:0,rad:2},{n:'천부인·화',d:'단일 강력 공격',mp:12,t:'single',pw:3,tg:'single',rng:3},{n:'천왕강림',d:'최강 범위 공격+버프',mp:35,t:'aoe_area',pw:2,tg:'area',rng:4,rad:2}]},
'대장군':{e:'🗡️',c:'#8a7a2a',mov:5,rng:1,sk:[{n:'진격',d:'돌격+기절',mp:8,t:'charge',pw:2.3,st:true,tg:'single',rng:2},{n:'호령',d:'주변 아군 공격력+방어력 증가',mp:12,t:'king_buff_area',pw:1,tg:'area',rng:0,rad:2},{n:'대장군의 일격',d:'최강 공격',mp:20,t:'single',pw:3,tg:'single',rng:2}]},
// === Ch3/Ch4 New Classes ===
'한군병':{e:'🔴',c:'#8a2a2a',mov:4,rng:1,sk:[{n:'진형',d:'방어+50%',mp:8,t:'buff_def',pw:1.5,tg:'self'},{n:'연환격',d:'2회 공격',mp:12,t:'multi',h:2,pw:.8,tg:'single',rng:1}]},
'한군궁수':{e:'🏹',c:'#8a3a2a',mov:4,rng:4,sk:[{n:'화전',d:'불화살 범위공격',mp:14,t:'aoe_area',pw:.9,tg:'area',rng:4,rad:1},{n:'연사',d:'2회 사격',mp:10,t:'multi',h:2,pw:.7,tg:'single',rng:4}]},
'한군기병':{e:'🐴',c:'#8a4a2a',mov:6,rng:1,sk:[{n:'기병돌격',d:'돌격+기절',mp:10,t:'charge',pw:2,st:true,tg:'single',rng:2},{n:'포위',d:'범위 공격',mp:15,t:'aoe_area',pw:1,tg:'area',rng:2,rad:1}]},
'성주':{e:'🏯',c:'#6a6a3a',mov:3,rng:2,sk:[{n:'성벽 수비',d:'방어+80%',mp:12,t:'buff_def',pw:1.8,tg:'self'},{n:'투석',d:'범위 공격',mp:18,t:'aoe_area',pw:1.2,tg:'area',rng:4,rad:1},{n:'결사항전',d:'최강 단일공격',mp:25,t:'single',pw:3,tg:'single',rng:2}]},
'부여왕':{e:'👑',c:'#aa7a3a',mov:4,rng:2,sk:[{n:'천제의 후손',d:'범위 회복',mp:20,t:'heal_area',pw:1.5,tg:'area',rng:0,rad:2},{n:'왕의 무위',d:'강력 공격',mp:15,t:'single',pw:2.5,tg:'single',rng:2},{n:'건국의 의지',d:'범위 버프',mp:25,t:'king_buff_area',pw:1,tg:'area',rng:0,rad:2}]},
'옥저전사':{e:'🐚',c:'#3a6a6a',mov:4,rng:1,sk:[{n:'해안격',d:'강타',mp:8,t:'single',pw:2,tg:'single',rng:1},{n:'조공',d:'HP 회복',mp:10,t:'heal_area',pw:.8,tg:'area',rng:0,rad:1}]},
'동예무사':{e:'🏔️',c:'#4a5a3a',mov:5,rng:1,sk:[{n:'단궁술',d:'원거리 공격',mp:8,t:'single',pw:1.8,tg:'single',rng:3},{n:'책화',d:'평화 회복',mp:12,t:'heal_area',pw:1,tg:'area',rng:0,rad:1}]},
'삼한족장':{e:'🗿',c:'#5a5a4a',mov:4,rng:1,sk:[{n:'소도의 힘',d:'범위 버프',mp:15,t:'king_buff_area',pw:1,tg:'area',rng:0,rad:2},{n:'철기 일격',d:'강력 공격',mp:12,t:'single',pw:2.2,tg:'single',rng:1}]}
};

// === Class Promotion Data ===
const PROMOTIONS={
'궁병':[{lv:8,to:'명궁',bonus:{mhp:20,atk:5,spd:2}},{lv:15,to:'신궁',bonus:{mhp:30,atk:8,spd:3,rng:1}}],
'보병':[{lv:8,to:'중보병',bonus:{mhp:30,atk:3,def:5}},{lv:15,to:'근위병',bonus:{mhp:50,atk:5,def:10}}],
'기마병':[{lv:8,to:'돌기병',bonus:{mhp:20,atk:5,spd:3,mov:1}},{lv:15,to:'철기병',bonus:{mhp:30,atk:8,spd:5,mov:1}}],
'풍백':[{lv:10,to:'대풍사',bonus:{mhp:25,atk:5,spd:3}}],
'우사':[{lv:10,to:'대우사',bonus:{mhp:25,atk:3,def:3,mp:10}}],
'운사':[{lv:10,to:'대운사',bonus:{mhp:25,atk:7,spd:2}}],
'웅녀':[{lv:12,to:'지모신',bonus:{mhp:35,atk:5,def:5,mp:15}}],
'단군':[{lv:20,to:'천왕',bonus:{mhp:50,atk:10,def:8,spd:5,mp:20,mov:1}}],
'신장':[{lv:20,to:'천왕',bonus:{mhp:50,atk:10,def:8,spd:5,mp:20,mov:1}}],
'신하장군':[{lv:12,to:'대장군',bonus:{mhp:30,atk:8,def:5,spd:3}}],
// Second-tier promotions
'명궁':[{lv:15,to:'신궁',bonus:{mhp:30,atk:8,spd:3,rng:1}}],
'중보병':[{lv:15,to:'근위병',bonus:{mhp:50,atk:5,def:10}}],
'돌기병':[{lv:15,to:'철기병',bonus:{mhp:30,atk:8,spd:5,mov:1}}]
};

function checkPromotion(ch){
  const promos=PROMOTIONS[ch.cl];if(!promos)return null;
  for(const p of promos){if(ch.lv>=p.lv)return p}
  return null;
}

function applyPromotion(ch,promo){
  const oldCl=ch.cl;ch.cl=promo.to;
  const newCls=CLS[promo.to];
  if(newCls){ch.portrait=newCls.e;ch.mov=newCls.mov||ch.mov;ch.rng=newCls.rng||ch.rng}
  const b=promo.bonus;
  if(b.mhp){ch.mhp+=b.mhp;ch.hp+=b.mhp}
  if(b.atk)ch.atk+=b.atk;
  if(b.def)ch.def+=b.def;
  if(b.spd)ch.spd+=b.spd;
  if(b.mp){ch.mmp+=b.mp;ch.mp+=b.mp}
  if(b.mov)ch.mov+=b.mov;
  if(b.rng)ch.rng+=b.rng;
  return oldCl;
}

// --- Items ---
const ITEMS={
'bronze_sword':{n:'동검(비파형)',t:'weapon',atk:5,d:'고조선 대표 무기',price:80},
'bronze_spear':{n:'동창',t:'weapon',atk:7,def:-1,d:'긴 창',price:100},
'horn_bow':{n:'각궁',t:'weapon',atk:6,spd:2,d:'뿔로 만든 활',price:120},
'cheonbuin':{n:'천부인',t:'weapon',atk:12,def:3,spd:3,d:'환인이 내린 신물',price:0},
'sehyung_sword':{n:'세형동검',t:'weapon',atk:10,spd:1,d:'세형동검',price:250},
'bronze_axe':{n:'청동도끼',t:'weapon',atk:14,spd:-2,d:'무거운 청동 도끼',price:300},
'spirit_bow':{n:'신궁',t:'weapon',atk:11,spd:3,d:'신시의 명궁',price:280},
'leather_armor':{n:'가죽갑',t:'armor',def:4,d:'가죽 갑옷',price:60},
'wood_armor':{n:'나무갑',t:'armor',def:6,spd:-2,d:'나무 갑옷',price:100},
'scale_armor':{n:'찰갑',t:'armor',def:8,spd:-3,d:'청동 찰갑',price:200},
'bear_armor':{n:'곰가죽갑',t:'armor',def:7,atk:2,d:'웅족 전통 갑옷',price:220},
'divine_robe':{n:'신의',t:'armor',def:5,hp:30,mp:20,d:'천상의 옷',price:350},
'wolf_fang':{n:'늑대이빨 목걸이',t:'accessory',atk:3,d:'야수의 기운',price:80},
'jade_ring':{n:'옥반지',t:'accessory',hp:20,mp:10,d:'신비한 옥',price:150},
'tiger_claw':{n:'호랑이 발톱',t:'accessory',atk:5,spd:2,d:'범족의 전리품',price:200},
'garlic_charm':{n:'마늘 부적',t:'accessory',def:4,hp:15,d:'시련의 증표',price:120},
'hp_pot':{n:'회복약',t:'cons',heal:60,d:'HP 60 회복',price:30},
'hp_pot2':{n:'고급 회복약',t:'cons',heal:150,d:'HP 150 회복',price:80},
'mp_pot':{n:'마력약',t:'cons',hmp:30,d:'MP 30 회복',price:40},
'revive':{n:'부활초',t:'cons',rev:true,rpct:.3,d:'부활(HP 30%)',price:150},
'antidote':{n:'해독제',t:'cons',cure:true,d:'상태이상 해제',price:25},
'ssuk':{n:'쑥',t:'cons',heal:30,d:'쑥으로 만든 약',price:15},
'garlic_medicine':{n:'마늘환',t:'cons',heal:20,hmp:15,d:'마늘 정제',price:20},
'cb_mirror':{n:'천부인 거울',t:'accessory',def:8,hp:30,mp:15,d:'마법 방어의 신물',price:0},
'cb_sword':{n:'천부인 검',t:'weapon',atk:18,spd:2,def:2,d:'최강의 신물 무기',price:0},
'cb_bell':{n:'천부인 방울',t:'accessory',hp:40,mp:25,d:'치유의 신물',price:0},
'asadal_armor':{n:'아사달 왕갑',t:'armor',def:12,hp:20,d:'고조선 왕의 갑옷',price:0},
'trade_silk':{n:'명주',t:'cons',heal:0,d:'교역품',price:50},
'stone_resource':{n:'건설 석재',t:'cons',heal:0,d:'석재',price:30},
'wood_resource':{n:'건설 목재',t:'cons',heal:0,d:'목재',price:25},
'iron_ore':{n:'철광석',t:'cons',heal:0,d:'광물',price:40},
'hp_pot3':{n:'최고급 회복약',t:'cons',heal:300,d:'HP 300 회복',price:200},
'mp_pot2':{n:'고급 마력약',t:'cons',hmp:60,d:'MP 60 회복',price:120},
'elixir':{n:'영약',t:'cons',heal:9999,hmp:9999,d:'전체 회복',price:500},
'king_seal':{n:'왕의 옥새',t:'accessory',atk:4,def:4,spd:2,hp:25,mp:15,d:'단군의 인장',price:0},
// === Ch3 위만조선편 아이템 ===
'iron_sword':{n:'철검',t:'weapon',atk:16,spd:1,d:'철기시대의 검',price:400},
'iron_spear':{n:'철창',t:'weapon',atk:18,def:-1,d:'긴 철창',price:450},
'iron_bow':{n:'철궁',t:'weapon',atk:14,spd:3,d:'철제 강궁',price:420},
'wiman_sword':{n:'위만의 검',t:'weapon',atk:22,spd:2,def:3,d:'위만왕의 보검',price:0},
'iron_armor':{n:'철갑',t:'armor',def:14,spd:-3,d:'철제 갑옷',price:500},
'wanggeom_armor':{n:'왕검성 갑옷',t:'armor',def:16,hp:30,d:'왕검성 수비병 갑옷',price:0},
'han_shield':{n:'한나라 방패',t:'accessory',def:8,hp:20,d:'한군의 방패',price:350},
'jade_amulet':{n:'비취 부적',t:'accessory',atk:3,def:3,spd:3,hp:20,mp:15,d:'신비한 비취',price:400},
'hp_pot4':{n:'신비의 영약',t:'cons',heal:500,d:'HP 500 회복',price:350},
'mp_pot3':{n:'고급 마력영약',t:'cons',hmp:100,d:'MP 100 회복',price:250},
'full_revive':{n:'완전부활초',t:'cons',rev:true,rpct:.8,d:'부활(HP 80%)',price:400},
// === Ch4 부여~삼한편 아이템 ===
'buyeo_sword':{n:'부여왕검',t:'weapon',atk:24,spd:2,d:'부여 왕실의 검',price:0},
'buyeo_bow':{n:'맥궁',t:'weapon',atk:20,spd:4,d:'맥족의 명궁',price:600},
'buyeo_armor':{n:'부여 갑주',t:'armor',def:18,hp:40,d:'부여 왕실 갑주',price:0},
'samhan_talisman':{n:'삼한 부적',t:'accessory',atk:5,def:5,spd:3,hp:30,mp:20,d:'삼한 통합의 상징',price:0},
'horse_armor':{n:'마갑',t:'armor',def:20,spd:-4,d:'기마병 전용 갑옷',price:700},
'dongye_jade':{n:'동예 옥',t:'accessory',hp:40,mp:30,d:'동해안의 명옥',price:500}
};

// === Shop stock per chapter ===
const SHOP_STOCK={
1:['hp_pot','hp_pot2','mp_pot','revive','antidote','ssuk','garlic_medicine','bronze_sword','bronze_spear','horn_bow','leather_armor','wood_armor','wolf_fang','jade_ring'],
2:['hp_pot','hp_pot2','hp_pot3','mp_pot','mp_pot2','revive','elixir','sehyung_sword','bronze_axe','spirit_bow','scale_armor','bear_armor','divine_robe','tiger_claw','garlic_charm'],
3:['hp_pot2','hp_pot3','hp_pot4','mp_pot2','mp_pot3','revive','full_revive','elixir','iron_sword','iron_spear','iron_bow','iron_armor','han_shield','jade_amulet'],
4:['hp_pot3','hp_pot4','mp_pot2','mp_pot3','full_revive','elixir','buyeo_bow','horse_armor','dongye_jade','iron_sword','iron_spear','iron_bow','iron_armor','jade_amulet']
};

// Exploration map tiles
const TC={0:'#556B2F',1:'#6B8E23',2:'#A08050',3:'#2244aa',4:'#8B6B3A',5:'#3a2510',6:'#4a3560',7:'#f4e4c1',8:'#8B1A0A',9:'#5a4a3a',10:'#2a1a30',11:'#c4956a',12:'#FFD700',13:'#44aa44',14:'#ddeeff',15:'#6a4a2a',16:'#8a7a5a'};
const TP={0:1,1:1,2:1,3:0,4:0,5:1,6:1,7:1,8:1,9:0,10:0,11:1,12:1,13:1,14:1,15:1,16:1};

// ============================
// TACTICAL BATTLE MAP TERRAIN
// ============================
// 0=Plains 1=Forest 2=Mountain 3=Water 4=Fort 5=Village
const TERRAIN={
  0:{n:'평지',c:'#556B2F',mc:1,defB:0,evaB:0,pass:true},
  1:{n:'숲',c:'#2a5020',mc:2,defB:.2,evaB:.1,pass:true},
  2:{n:'산',c:'#8B6B3A',mc:3,defB:.3,evaB:.05,pass:true},
  3:{n:'물',c:'#2244aa',mc:99,defB:0,evaB:0,pass:false},
  4:{n:'요새',c:'#8a7a5a',mc:1,defB:.5,evaB:.15,pass:true},
  5:{n:'마을',c:'#c4956a',mc:1,defB:.1,evaB:0,pass:true,heal:true}
};

// --- Character Factory ---
function mkCh(id,nm,cl,lv,ally,ex={}){
  const cls=CLS[cl]||{};
  const b={id,nm,cl,lv,exp:0,exn:lv*30+50,mhp:50+lv*12+(ex.hp||0),hp:0,mmp:20+lv*5+(ex.mp||0),mp:0,atk:10+lv*3+(ex.atk||0),def:5+lv*2+(ex.def||0),spd:8+lv+(ex.spd||0),
    mov:cls.mov||4,rng:cls.rng||1,
    ally,alive:true,acted:false,moved:false,stunned:false,buffs:[],
    weapon:ex.weapon||null,armor:ex.armor||null,acc:ex.acc||null,
    portrait:(cls).e||'🧑',gx:0,gy:0,_sx:0,_sy:0,isLeader:ex.leader||false};
  const w=ITEMS[b.weapon],a=ITEMS[b.armor],c=ITEMS[b.acc];
  if(w){b.atk+=(w.atk||0);b.def+=(w.def||0);b.spd+=(w.spd||0)}
  if(a){b.atk+=(a.atk||0);b.def+=(a.def||0);b.spd+=(a.spd||0);b.mhp+=(a.hp||0);b.mmp+=(a.mp||0)}
  if(c){b.atk+=(c.atk||0);b.def+=(c.def||0);b.spd+=(c.spd||0);b.mhp+=(c.hp||0);b.mmp+=(c.mp||0)}
  b.hp=b.mhp;b.mp=b.mmp;return b;
}
function getSk(ch){return(CLS[ch.cl]||{}).sk||[]}
function getMovBonus(ch){const mb=ch.buffs.find(b=>b.t==='mov');return mb?mb.v:0}
function getEffMov(ch){return ch.mov+getMovBonus(ch)}

// Helper functions
function mkTacMap(rows){return rows.map(r=>[...r])}
function defTacBattle(enemies,tacMap,allyPos,enemyPos,opts={}){return{enemies,tacMap,allyPos,enemyPos,...opts}}

// ============================================================
// TACTICAL MAPS — ALL EXPANDED TO 12x10
// ============================================================
// Each map is 12 wide x 10 tall (was 10x8)
// More terrain variety for longer, more strategic battles

const TACMAP_PLAINS=mkTacMap([
  [0,0,1,0,0,0,0,0,1,0,0,0],
  [0,0,0,0,1,0,0,1,0,0,0,0],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,2,0,0,0,0,2,0,0,0],
  [0,0,1,0,0,1,1,0,0,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,0,1,0],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,1,0,0,1,0,0,0,0],
  [0,0,1,0,0,0,0,0,1,0,0,0]
]);

const TACMAP_FOREST=mkTacMap([
  [1,1,0,0,0,0,0,0,0,0,1,1],
  [1,0,0,1,0,0,0,0,1,0,0,1],
  [0,0,1,0,0,1,1,0,0,1,0,0],
  [0,1,0,0,1,0,0,1,0,0,1,0],
  [0,0,0,1,0,0,0,0,1,0,0,0],
  [0,0,1,0,0,0,0,0,0,1,0,0],
  [0,1,0,0,1,1,1,1,0,0,1,0],
  [0,0,1,0,0,0,0,0,0,1,0,0],
  [1,0,0,1,0,0,0,0,1,0,0,1],
  [1,1,0,0,0,0,0,0,0,0,1,1]
]);

const TACMAP_MOUNTAIN=mkTacMap([
  [0,0,2,2,0,0,0,0,2,2,0,0],
  [0,0,0,2,0,0,0,0,2,0,0,0],
  [0,0,0,0,0,1,1,0,0,0,0,0],
  [2,0,0,1,0,0,0,0,1,0,0,2],
  [2,0,0,0,0,2,2,0,0,0,0,2],
  [0,0,0,0,2,0,0,2,0,0,0,0],
  [2,0,0,1,0,0,0,0,1,0,0,2],
  [0,0,0,0,0,1,1,0,0,0,0,0],
  [0,0,0,2,0,0,0,0,2,0,0,0],
  [0,0,2,2,0,0,0,0,2,2,0,0]
]);

const TACMAP_FORTRESS=mkTacMap([
  [4,4,3,3,3,3,3,3,3,3,4,4],
  [4,0,0,0,5,5,5,5,0,0,0,4],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,4,4,4,4,0,1,0,0],
  [0,0,0,0,4,0,0,4,0,0,0,0],
  [0,0,1,0,4,4,4,4,0,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0]
]);

const TACMAP_HEAVEN=mkTacMap([
  [0,0,0,0,0,4,4,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0]
]);

const TACMAP_BOSS=mkTacMap([
  [0,0,1,4,4,4,4,4,4,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [1,0,0,2,0,0,0,0,2,0,0,1],
  [0,0,0,0,0,1,1,0,0,0,0,0],
  [0,0,2,0,0,0,0,0,0,2,0,0],
  [0,0,0,0,1,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0]
]);

// Ch3/Ch4 tactical maps (12x10)
const TACMAP_WANGGEOM=mkTacMap([
  [4,4,4,3,3,3,3,3,3,4,4,4],
  [4,0,0,0,4,4,4,4,0,0,0,4],
  [4,0,0,0,0,0,0,0,0,0,0,4],
  [0,0,1,0,4,0,0,4,0,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,1,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,5,0,0,0,0,5,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0]
]);

const TACMAP_RIVER=mkTacMap([
  [1,0,0,3,3,3,3,3,3,0,0,1],
  [0,0,0,3,0,0,0,0,3,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [1,0,0,0,1,0,0,1,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [1,0,0,0,1,0,0,1,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,3,0,0,0,0,3,0,0,0],
  [1,0,0,3,3,3,3,3,3,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0]
]);

const TACMAP_BUYEO=mkTacMap([
  [1,1,0,0,4,4,4,4,0,0,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,2,0,5,0,0,5,0,2,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,2,0,5,0,0,5,0,2,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,0,0,0,0,0,0,0,0,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0]
]);

const TACMAP_SAMHAN=mkTacMap([
  [2,2,0,0,0,0,0,0,0,0,2,2],
  [2,0,0,1,0,0,0,0,1,0,0,2],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,0,0,0,1,1,0,0,0,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,0,1,0],
  [0,0,0,0,5,0,0,5,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0]
]);

// Default positions for 12x10 maps
const DEF_ALLY_POS=[[3,8],[4,8],[5,8],[6,8],[7,8],[4,9],[5,9],[6,9]];
const DEF_ENEMY_POS=[[4,0],[5,0],[6,0],[7,0],[4,1],[5,1],[6,1],[7,1]];
