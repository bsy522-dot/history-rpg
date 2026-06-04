// v14_patch.js — 한국사 영웅전 v14.0 Enhancement Patch
// Diplomacy + Resources + Weather + Fortress + Trade + Special Missions
// + Random Events + Tactical Map + Quiz 15 + Achievement 12 + SFX 8
(function(){
'use strict';

// =============================================
// SECTION 1: CSS INJECTION
// =============================================
var css=document.createElement('style');
css.textContent=[
'.v14-panel{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:120;overflow-y:auto;padding:16px}',
'.v14-panel.on{display:block}',
'.v14-panel h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.v14-subtitle{text-align:center;font-size:11px;color:#8a7a6a;margin-bottom:12px}',
'.v14-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v14-close:hover{background:#8B2A1A}',

'.dip-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-width:540px;margin:0 auto}',
'.dip-card{background:rgba(26,20,40,.9);border:2px solid #3a3a4a;border-radius:12px;padding:14px;text-align:center;cursor:pointer;transition:all .3s;position:relative}',
'.dip-card:hover{border-color:#5FA0FF;transform:translateY(-3px);box-shadow:0 6px 20px rgba(95,160,255,.1)}',
'.dip-icon{font-size:36px;margin-bottom:4px}',
'.dip-name{font-size:13px;font-weight:700;color:#5FA0FF;margin-bottom:2px}',
'.dip-rel{font-size:10px;margin-top:4px;padding:3px 10px;border-radius:8px;display:inline-block}',
'.dip-ally{background:rgba(42,90,42,.2);color:#88ff88;border:1px solid #88ff8844}',
'.dip-neutral{background:rgba(90,90,42,.2);color:#cccc44;border:1px solid #cccc4444}',
'.dip-hostile{background:rgba(90,42,42,.2);color:#ff8888;border:1px solid #ff888844}',
'.dip-vassal{background:rgba(42,42,90,.2);color:#8888ff;border:1px solid #8888ff44}',
'.dip-bar-wrap{width:100%;height:6px;background:#1a1a2e;border-radius:3px;overflow:hidden;margin-top:6px}',
'.dip-bar-fill{height:100%;border-radius:3px;transition:width .5s}',
'.dip-actions{display:flex;gap:4px;margin-top:8px;flex-wrap:wrap;justify-content:center}',
'.dip-act-btn{font-size:9px;padding:4px 8px;border:1px solid #3a3a4a;border-radius:4px;background:#2a2438;color:#e8dcc8;cursor:pointer;font-family:inherit}',
'.dip-act-btn:hover{border-color:#5FA0FF;background:#3a3448}',
'.dip-act-btn:disabled{opacity:.3;cursor:not-allowed}',
'.dip-detail{max-width:500px;margin:12px auto;background:rgba(26,20,40,.95);border:2px solid #5FA0FF;border-radius:12px;padding:16px;display:none}',
'.dip-detail.on{display:block}',

'.res-bar-area{max-width:500px;margin:0 auto 16px}',
'.res-row{display:flex;align-items:center;gap:8px;margin:6px 0;font-size:11px}',
'.res-icon{font-size:20px;width:28px;text-align:center}',
'.res-name{width:50px;color:#c4956a;font-weight:700}',
'.res-bar{flex:1;height:10px;background:#1a1a2e;border-radius:5px;overflow:hidden;border:1px solid #3a3a4a}',
'.res-bar-fill{height:100%;border-radius:5px;transition:width .5s}',
'.res-val{width:60px;text-align:right;color:#e8dcc8;font-weight:700;font-size:10px}',
'.res-income{font-size:9px;color:#88ff88;width:50px;text-align:right}',

'.wx-cards{display:flex;gap:10px;max-width:500px;margin:0 auto;flex-wrap:wrap;justify-content:center}',
'.wx-card{background:rgba(26,20,40,.9);border:2px solid #3a3a4a;border-radius:12px;padding:16px 20px;text-align:center;cursor:pointer;transition:all .3s;min-width:100px;flex:1}',
'.wx-card:hover{border-color:#FFD700;transform:translateY(-3px)}',
'.wx-card.active{border-color:#FFD700;background:rgba(42,36,56,.95);box-shadow:0 0 16px rgba(255,215,0,.1)}',
'.wx-icon{font-size:42px;margin-bottom:6px}',
'.wx-name{font-size:13px;font-weight:700;color:#FFD700;margin-bottom:2px}',
'.wx-effect{font-size:9px;color:#88ff88;margin-top:4px;padding:4px 8px;background:rgba(42,90,42,.12);border:1px solid rgba(42,90,42,.2);border-radius:6px}',
'.wx-canvas-wrap{max-width:500px;margin:12px auto;text-align:center}',
'.wx-canvas{width:100%;height:200px;border-radius:8px;border:1px solid #3a3a4a}',

'.fort-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;max-width:540px;margin:0 auto}',
'.fort-card{background:rgba(26,20,40,.9);border:2px solid #3a3a4a;border-radius:12px;padding:14px;text-align:center;cursor:pointer;transition:all .3s}',
'.fort-card:hover{border-color:#c4956a;transform:translateY(-3px)}',
'.fort-card.built{border-color:#FFD700;background:rgba(42,36,56,.95)}',
'.fort-card.locked{opacity:.35;cursor:not-allowed}',
'.fort-icon{font-size:36px;margin-bottom:4px}',
'.fort-name{font-size:12px;font-weight:700;color:#FFD700;margin-bottom:2px}',
'.fort-cost{font-size:9px;color:#c4956a;margin-top:4px}',
'.fort-bonus{font-size:9px;color:#88ff88;margin-top:4px;padding:3px 8px;background:rgba(42,90,42,.12);border-radius:4px}',
'.fort-lvl{font-size:9px;color:#aa88ff;margin-top:2px}',

'.trade-timeline{max-width:500px;margin:0 auto;position:relative;padding-left:40px}',
'.trade-line{position:absolute;left:18px;top:0;bottom:0;width:2px;background:linear-gradient(180deg,#5FA0FF,#FFD700,#5FA0FF)}',
'.trade-entry{position:relative;margin:14px 0;padding:14px;background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:10px;cursor:pointer;transition:all .3s}',
'.trade-entry:hover{border-color:#FFD700;background:rgba(42,36,56,.9)}',
'.trade-entry.active{border-color:#88ff88}',
'.trade-entry::before{content:"";position:absolute;left:-28px;top:18px;width:12px;height:12px;border-radius:50%;background:#5FA0FF;border:2px solid #0a0608}',
'.trade-entry.active::before{background:#88ff88}',
'.trade-from{font-size:9px;color:#5FA0FF;letter-spacing:1px;margin-bottom:2px}',
'.trade-name{font-size:13px;font-weight:700;color:#FFD700;margin-bottom:3px}',
'.trade-desc{font-size:10px;color:#8a7a6a;line-height:1.6}',
'.trade-yield{font-size:9px;color:#88ff88;margin-top:4px}',

'.mis-list{max-width:500px;margin:0 auto}',
'.mis-card{display:flex;align-items:center;gap:12px;background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:10px;padding:14px;margin:8px 0;cursor:pointer;transition:all .3s}',
'.mis-card:hover{border-color:#ff88aa;transform:translateY(-2px)}',
'.mis-card.done{border-color:#88ff88;opacity:.7}',
'.mis-card.locked{opacity:.35;cursor:not-allowed}',
'.mis-num{font-size:28px;min-width:36px;text-align:center}',
'.mis-info h4{color:#FFD700;font-size:12px;margin-bottom:3px}',
'.mis-info p{color:#8a7a6a;font-size:10px;line-height:1.5}',
'.mis-reward{font-size:9px;color:#88ff88;margin-top:2px}',

'.evt-log{max-width:500px;margin:0 auto}',
'.evt-entry{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:10px;padding:14px;margin:8px 0;transition:all .3s}',
'.evt-entry:hover{border-color:#aa88ff}',
'.evt-header{display:flex;align-items:center;gap:8px;margin-bottom:6px}',
'.evt-icon{font-size:24px}',
'.evt-title{font-size:13px;font-weight:700;color:#aa88ff}',
'.evt-time{font-size:8px;color:#5a5a6a;margin-left:auto}',
'.evt-desc{font-size:11px;color:#8a7a6a;line-height:1.7}',
'.evt-effect{font-size:9px;color:#FFD700;margin-top:6px;padding:4px 10px;background:rgba(255,215,0,.08);border:1px solid rgba(255,215,0,.15);border-radius:6px}',

'.tmap-wrap{max-width:500px;margin:0 auto;text-align:center}',
'.tmap-canvas{width:100%;border-radius:8px;border:1px solid #3a3a4a}',
'.tmap-legend{display:flex;gap:8px;justify-content:center;margin-top:8px;flex-wrap:wrap}',
'.tmap-leg{font-size:9px;display:flex;align-items:center;gap:4px;color:#8a7a6a}',
'.tmap-dot{width:8px;height:8px;border-radius:50%}',

'@keyframes achSlide14{from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}',
'@media(max-width:400px){.dip-grid,.fort-grid{grid-template-columns:repeat(auto-fill,minmax(120px,1fr))}.wx-cards{flex-direction:column}.wx-card{min-width:auto}}'
].join('\n');
document.head.appendChild(css);

// =============================================
// SECTION 2: DIPLOMACY DATA
// =============================================
var NATIONS=[
{id:'buyeo',nm:'&#48512;&#50668;(&#25206;&#39192;)',ic:'&#128081;',region:'&#47564;&#51452; &#49933;&#54868;&#44053;',
 desc:'&#44256;&#51312;&#49440; &#48513;&#48169;&#51032; &#44053;&#44397;. 5&#48512;&#51313; &#50672;&#47609;, &#50689;&#44256; &#51228;&#52380;&#54665;&#49324;. &#44256;&#44396;&#47140;&#183;&#48177;&#51228;&#51032; &#47784;&#52404;.',
 relation:55,maxRel:100,status:'neutral',
 exports:'&#47568;(&#44284;&#54616;&#47560;)&#183;&#47784;&#54588;&#183;&#44552;',imports:'&#52384;&#44592;&#183;&#49548;&#44552;&#183;&#44257;&#47932;'},
{id:'han',nm:'&#54620;(&#28450;)',ic:'&#127983;',region:'&#51473;&#50896;(&#51473;&#44397;)',
 desc:'&#44053;&#45824;&#54620; &#51473;&#50521; &#51228;&#44397;. &#54620; &#47924;&#51228;&#44032; &#44256;&#51312;&#49440;&#51012; &#52840;&#44277;&#54616;&#50668; &#54620;&#49324;&#44400;&#51012; &#49444;&#52824;&#54616;&#50688;&#45796;.',
 relation:20,maxRel:100,status:'hostile',
 exports:'&#48708;&#45800;&#183;&#52384;&#44592;&#183;&#44032;&#50864;&#183;&#50504;&#51109;',imports:'&#51064;&#49340;&#183;&#47784;&#54588;&#183;&#48152;&#47932;&#183;&#53945;&#49328;&#47932;'},
{id:'ye',nm:'&#50696;(&#28618;)',ic:'&#127811;',region:'&#44053;&#50896;&#46020; &#51068;&#45824;',
 desc:'&#46041;&#50696;&#50752; &#54632;&#44760;. &#47924;&#52380; &#51228;&#52380;&#54665;&#49324;, &#45800;&#44417;(&#51687;&#51008;&#54876;), &#48152;&#50612;(&#50612;&#47932;), &#44284;&#54616;&#47560;(&#51089;&#51008;&#47568;) &#53945;&#49328;.',
 relation:65,maxRel:100,status:'neutral',
 exports:'&#45800;&#44417;&#183;&#48152;&#50612;&#183;&#44284;&#54616;&#47560;',imports:'&#44257;&#47932;&#183;&#52384;&#44592;&#183;&#49548;&#44552;'},
{id:'okjeo',nm:'&#50725;&#51200;(&#27779;&#27836;)',ic:'&#127754;',region:'&#54632;&#44221;&#46020; &#46041;&#54644;&#50504;',
 desc:'&#46041;&#54644;&#50504; &#54644;&#50577; &#48512;&#51313;. &#48124;&#47728;&#45712;&#47532;&#54844;, &#49548;&#44552;&#183;&#50612;&#47932;&#183;&#49340;&#48288; &#53945;&#49328;. &#44256;&#44396;&#47140;&#50640; &#44277;&#47932;.',
 relation:70,maxRel:100,status:'vassal',
 exports:'&#49548;&#44552;&#183;&#50612;&#47932;&#183;&#49340;&#48288;',imports:'&#52384;&#44592;&#183;&#44257;&#47932;'},
{id:'samhan',nm:'&#49340;&#54620;(&#19977;&#38867;)',ic:'&#128301;',region:'&#54620;&#48152;&#46020; &#51473;&#45224;&#48512;',
 desc:'&#47560;&#54620;54&#44397;&#183;&#51652;&#54620;12&#44397;&#183;&#48320;&#54620;12&#44397; &#52509; 78&#44060; &#49548;&#44397;. &#52384; &#49373;&#49328;&#44284; &#44368;&#50669;&#51032; &#51473;&#49900;.',
 relation:60,maxRel:100,status:'neutral',
 exports:'&#52384;(&#52384;&#51221;)&#183;&#48260;&#183;&#44172;&#183;&#51649;&#47932;',imports:'&#44257;&#47932;&#183;&#47784;&#54588;&#183;&#49548;&#44552;'}
];

// =============================================
// SECTION 3: RESOURCE DATA
// =============================================
var RESOURCES=[
{id:'food',nm:'&#49885;&#47049;',ic:'&#127838;',val:500,max:2000,income:20,color:'#44bb44'},
{id:'iron',nm:'&#52384;',ic:'&#9904;&#65039;',val:200,max:1000,income:8,color:'#88aacc'},
{id:'wood',nm:'&#47785;&#51116;',ic:'&#127795;',val:350,max:1500,income:12,color:'#aa8844'},
{id:'gold',nm:'&#44552;',ic:'&#128176;',val:100,max:800,income:5,color:'#FFD700'}
];

// =============================================
// SECTION 4: WEATHER DATA
// =============================================
var WEATHERS=[
{id:'clear',nm:'&#47582;&#51020;',ic:'&#9728;&#65039;',effect:'&#44592;&#48376; &#49345;&#53468;. &#47784;&#46304; &#50976;&#45787; &#51221;&#49345; &#54876;&#46041;.',bonus:{atk:0,def:0,spd:0,acc:0},
 particles:{type:'none',count:0}},
{id:'rain',nm:'&#48708;',ic:'&#127783;&#65039;',effect:'&#44417;&#48337; &#47749;&#51473;&#47456; -15%, &#54868;&#44277; &#48520;&#44032;, &#48372;&#48337; &#48169;&#50612; +10%',bonus:{atk:0,def:10,spd:-1,acc:-15},
 particles:{type:'rain',count:80,color:'#6688cc',speed:8}},
{id:'snow',nm:'&#45576;',ic:'&#127784;&#65039;',effect:'&#51060;&#46041;&#47141; -1, &#44592;&#47560;&#48337; &#44277;&#44201; -20%, &#48372;&#48337; &#48169;&#50612; +5%',bonus:{atk:-10,def:5,spd:-1,acc:-5},
 particles:{type:'snow',count:50,color:'#ddeeff',speed:2}},
{id:'fog',nm:'&#50504;&#44060;',ic:'&#127787;&#65039;',effect:'&#49884;&#50556; -3, &#47784;&#46304; &#47749;&#51473;&#47456; -10%, &#44592;&#49845; &#49457;&#44277;&#47456; +20%',bonus:{atk:0,def:0,spd:0,acc:-10},
 particles:{type:'fog',count:30,color:'#aabbcc',speed:0.5}}
];

// =============================================
// SECTION 5: FORTRESS/BUILDING DATA
// =============================================
var BUILDINGS=[
{id:'wall',nm:'&#49457;&#44285;',ic:'&#127984;',desc:'&#46020;&#49884;&#47484; &#48169;&#50612;&#54616;&#45716; &#46028;&#49457;&#48317;. &#51201;&#51032; &#52840;&#44277; &#49884; &#48169;&#50612;&#47141;&#51012; &#45458;&#50668;&#51456;&#45796;.',
 cost:{food:100,iron:80,wood:150,gold:30},bonus:'&#51204;&#52404; &#48169;&#50612; +15%',effect:{def:15},lvl:0,maxLvl:3},
{id:'granary',nm:'&#44257;&#49885;&#52285;&#44256;',ic:'&#127806;',desc:'&#44257;&#49885;&#51012; &#51200;&#51109;&#54616;&#45716; &#52285;&#44256;. &#49885;&#47049; &#52572;&#45824;&#52824;&#50752; &#49688;&#51077;&#51012; &#45458;&#50668;&#51456;&#45796;.',
 cost:{food:50,iron:20,wood:100,gold:10},bonus:'&#49885;&#47049; &#49688;&#51077; +50%, &#52572;&#45824; +500',effect:{foodIncome:10,foodMax:500},lvl:0,maxLvl:3},
{id:'forge',nm:'&#45824;&#51109;&#44036;',ic:'&#128296;',desc:'&#47924;&#44592;&#50752; &#44049;&#50743;&#51012; &#51228;&#51089;&#54616;&#45716; &#45824;&#51109;&#44036;. &#44277;&#44201;&#47141;&#51012; &#45458;&#50668;&#51456;&#45796;.',
 cost:{food:80,iron:120,wood:80,gold:40},bonus:'&#51204;&#52404; &#44277;&#44201; +10%',effect:{atk:10},lvl:0,maxLvl:3},
{id:'barracks',nm:'&#50672;&#48337;&#51109;',ic:'&#9876;&#65039;',desc:'&#48337;&#49324;&#47484; &#54984;&#47144;&#54616;&#45716; &#50672;&#48337;&#51109;. &#50976;&#45787; &#52572;&#45824; &#44221;&#54744;&#52824;&#47484; &#45458;&#50668;&#51456;&#45796;.',
 cost:{food:120,iron:60,wood:120,gold:20},bonus:'&#44221;&#54744;&#52824; &#54925;&#46301; +20%',effect:{xp:20},lvl:0,maxLvl:3},
{id:'market',nm:'&#49884;&#51109;',ic:'&#127978;',desc:'&#47932;&#54408;&#51012; &#44368;&#50669;&#54616;&#45716; &#49884;&#51109;. &#44552; &#49688;&#51077;&#51012; &#45458;&#50668;&#51456;&#45796;.',
 cost:{food:60,iron:30,wood:90,gold:50},bonus:'&#44552; &#49688;&#51077; +100%, &#44368;&#50669; &#54624;&#51064;',effect:{goldIncome:5},lvl:0,maxLvl:3}
];

// =============================================
// SECTION 6: TRADE ROUTE DATA
// =============================================
var TRADE_ROUTES=[
{id:'silk',nm:'&#48708;&#45800;&#44600;',from:'&#51473;&#50896;(&#54620;)',to:'&#44256;&#51312;&#49440;',desc:'&#51473;&#50521;&#50500;&#49884;&#50500;&#47484; &#44144;&#52432; &#51473;&#50896;&#44620;&#51648; &#51060;&#50612;&#51648;&#45716; &#44368;&#50669;&#47196;. &#48708;&#45800;&#183;&#44552;&#183;&#50725;&#51012; &#44368;&#54872;.',
 yield:{gold:8,iron:3},active:false},
{id:'sea_japan',nm:'&#54644;&#49345;&#47196;(&#50780;)',from:'&#48320;&#54620;',to:'&#50780;(&#51068;&#48376;)',desc:'&#48320;&#54620;&#50640;&#49436; &#52384;&#51221;(&#45929;&#51060;&#49632;)&#51012; &#49688;&#52636;&#54616;&#44256; &#50725;&#183;&#44060;&#47112;&#47484; &#49688;&#51077;.',
 yield:{gold:6,food:5},active:false},
{id:'sea_china',nm:'&#54637;&#47196;(&#51473;&#44397;)',from:'&#47560;&#54620;',to:'&#54620;(&#45209;&#46993;)',desc:'&#54644;&#50577;&#51012; &#53685;&#54620; &#51473;&#44397; &#44400;&#54788;&#44284;&#51032; &#44368;&#50669;. &#44204;&#51649;&#47932;&#183;&#44257;&#47932;&#51012; &#49688;&#52636;.',
 yield:{gold:5,iron:4},active:false},
{id:'north',nm:'&#48513;&#48169;&#47196;',from:'&#48512;&#50668;',to:'&#44256;&#51312;&#49440;',desc:'&#47564;&#51452; &#44053;&#50669; &#50976;&#47785;&#48124;&#44284;&#51032; &#44368;&#50669;. &#47568;&#183;&#47784;&#54588;&#183;&#44552;&#51012; &#44368;&#54872;.',
 yield:{food:7,wood:5},active:false},
{id:'coastal',nm:'&#46041;&#54644;&#50504; &#54644;&#47196;',from:'&#50725;&#51200;',to:'&#44256;&#51312;&#49440;',desc:'&#46041;&#54644;&#50504;&#51012; &#46384;&#46972; &#50725;&#51200;&#51032; &#49548;&#44552;&#183;&#50612;&#47932;&#183;&#49340;&#48288;&#47484; &#44368;&#50669;.',
 yield:{food:8,gold:3},active:false},
{id:'inland',nm:'&#45236;&#47449;&#47196;',from:'&#50696;',to:'&#44256;&#51312;&#49440;',desc:'&#44053;&#50896;&#46020; &#49328;&#50501; &#51648;&#50669;&#50640;&#49436; &#45800;&#44417;&#183;&#48152;&#50612;&#183;&#44284;&#54616;&#47560;&#47484; &#44368;&#50669;.',
 yield:{wood:6,iron:3},active:false}
];

// =============================================
// SECTION 7: SPECIAL MISSIONS DATA
// =============================================
var MISSIONS=[
{id:'scout_m',nm:'&#51221;&#52272; &#51076;&#47924;',ic:'&#128065;&#65039;',desc:'&#52377;&#54980;&#48337;&#51012; &#48372;&#45236;&#50612; &#51201;&#51652;&#51032; &#48176;&#52824;&#50752; &#48337;&#47141;&#51012; &#54028;&#50501;&#54616;&#46972;.',
 hero:'&#52377;&#54980;&#48337;',reward:'&#51201; &#51652;&#54805; &#51221;&#48372; &#44277;&#44060;',diff:'&#52488;&#44553;',done:false},
{id:'sabotage_m',nm:'&#54980;&#48169; &#44277;&#51089;',ic:'&#128163;',desc:'&#51201;&#51032; &#48372;&#44553;&#47196;&#47484; &#52264;&#45800;&#54616;&#44256; &#45824;&#51109;&#44036;&#51012; &#54028;&#44340;&#54616;&#46972;.',
 hero:'&#54413;&#48177;',reward:'&#51201; &#44277;&#44201;&#47141; -20% (3&#53556;)',diff:'&#51473;&#44553;',done:false},
{id:'escort_m',nm:'&#54840;&#50948; &#51076;&#47924;',ic:'&#128110;',desc:'&#51456;&#50773;&#51032; &#45224;&#52380;&#51012; &#50504;&#51204;&#54616;&#44172; &#54840;&#50948;&#54616;&#46972;.',
 hero:'&#49457;&#44592;&#51109;&#44400;',reward:'&#51456;&#50773; &#54633;&#47448; + XP 200',diff:'&#44256;&#44553;',done:false},
{id:'rescue_m',nm:'&#44396;&#52636; &#51076;&#47924;',ic:'&#128591;',desc:'&#54252;&#47196;&#47196; &#51105;&#55180; &#50500;&#44400; &#48337;&#49324;&#47484; &#44396;&#52636;&#54616;&#46972;.',
 hero:'&#50868;&#49324;',reward:'&#48337;&#49324; 3&#47749; &#54633;&#47448;',diff:'&#44256;&#44553;',done:false},
{id:'diplomacy_m',nm:'&#50808;&#44368; &#49324;&#51208;',ic:'&#128220;',desc:'&#48512;&#50668; &#50773;&#50640;&#44172; &#49324;&#51208;&#51012; &#48372;&#45236;&#50612; &#46041;&#47609;&#51012; &#47610;&#50612;&#46972;.',
 hero:'&#45800;&#44400;&#50773;&#44160;',reward:'&#48512;&#50668; &#50864;&#54840;&#46020; +30',diff:'&#51473;&#44553;',done:false},
{id:'treasure_m',nm:'&#50976;&#47932; &#53456;&#49353;',ic:'&#128302;',desc:'&#44256;&#51064;&#46028; &#49549;&#50640; &#49704;&#44200;&#51652; &#44256;&#45824; &#50976;&#47932;&#51012; &#52286;&#50500;&#46972;.',
 hero:'&#52380;&#44400;',reward:'&#47004;&#45924; &#50976;&#47932; 1&#44060; &#54925;&#46301;',diff:'&#52488;&#44553;',done:false}
];

// =============================================
// SECTION 8: RANDOM EVENTS DATA
// =============================================
var EVENTS=[
{id:'ev1',nm:'&#54413;&#45380;',ic:'&#127808;',desc:'&#50732;&#54644; &#45453;&#49324;&#44032; &#51096; &#46104;&#50612; &#49885;&#47049;&#51060; &#45328;&#52432;&#54633;&#45768;&#45796;.',effect:'&#49885;&#47049; +200',apply:function(r){r[0].val=Math.min(r[0].val+200,r[0].max)}},
{id:'ev2',nm:'&#44032;&#47964;',ic:'&#9728;&#65039;',desc:'&#48708;&#44032; &#50724;&#51648; &#50506;&#50500; &#45453;&#49324;&#44032; &#53440;&#44201;&#51012; &#51077;&#50632;&#49845;&#45768;&#45796;.',effect:'&#49885;&#47049; -150',apply:function(r){r[0].val=Math.max(r[0].val-150,0)}},
{id:'ev3',nm:'&#52384;&#44305;&#49437; &#48156;&#44204;',ic:'&#9935;&#65039;',desc:'&#49352;&#47196;&#50868; &#52384;&#44305;&#49437;&#51060; &#48156;&#44204;&#46104;&#50632;&#49845;&#45768;&#45796;!',effect:'&#52384; +100',apply:function(r){r[1].val=Math.min(r[1].val+100,r[1].max)}},
{id:'ev4',nm:'&#49328;&#48520;',ic:'&#128293;',desc:'&#49328;&#48520;&#47196; &#47785;&#51116;&#44032; &#49548;&#49892;&#46104;&#50632;&#49845;&#45768;&#45796;.',effect:'&#47785;&#51116; -100',apply:function(r){r[2].val=Math.max(r[2].val-100,0)}},
{id:'ev5',nm:'&#49345;&#51064;&#51032; &#48169;&#47928;',ic:'&#128116;',desc:'&#50896;&#44144;&#47532;&#50640;&#49436; &#49345;&#51064;&#51060; &#50752;&#49436; &#44552;&#51012; &#44368;&#50669;&#54616;&#50688;&#49845;&#45768;&#45796;.',effect:'&#44552; +50',apply:function(r){r[3].val=Math.min(r[3].val+50,r[3].max)}},
{id:'ev6',nm:'&#50669;&#48337; &#48156;&#49373;',ic:'&#129440;',desc:'&#50669;&#48337;&#51060; &#48156;&#49373;&#54616;&#50668; &#48337;&#49324;&#46308;&#51060; &#50557;&#54644;&#51276;&#49845;&#45768;&#45796;.',effect:'&#51204;&#52404; HP -10%',apply:function(){}},
{id:'ev7',nm:'&#54588;&#45212;&#48124; &#50976;&#51077;',ic:'&#128694;',desc:'&#51204;&#46976;&#51012; &#54588;&#54620; &#54588;&#45212;&#48124;&#51060; &#46308;&#50612;&#50752; &#51064;&#44396;&#44032; &#45720;&#50632;&#49845;&#45768;&#45796;.',effect:'&#49885;&#47049; &#49548;&#48708; +30, &#44552; +20',apply:function(r){r[0].val=Math.max(r[0].val-30,0);r[3].val=Math.min(r[3].val+20,r[3].max)}},
{id:'ev8',nm:'&#50808;&#44368; &#49324;&#51208;',ic:'&#128235;',desc:'&#51060;&#50883; &#45208;&#46972;&#50640;&#49436; &#49324;&#51208;&#51060; &#50752;&#49436; &#49440;&#47932;&#51012; &#48148;&#52452;&#49845;&#45768;&#45796;.',effect:'&#44552; +30, &#52384; +20',apply:function(r){r[3].val=Math.min(r[3].val+30,r[3].max);r[1].val=Math.min(r[1].val+20,r[1].max)}},
{id:'ev9',nm:'&#54861;&#49688;',ic:'&#127754;',desc:'&#44053;&#51060; &#48276;&#46988;&#54616;&#50668; &#45453;&#44221;&#51648;&#44032; &#52840;&#49688;&#46104;&#50632;&#49845;&#45768;&#45796;.',effect:'&#49885;&#47049; -100, &#47785;&#51116; -50',apply:function(r){r[0].val=Math.max(r[0].val-100,0);r[2].val=Math.max(r[2].val-50,0)}},
{id:'ev10',nm:'&#44256;&#51064;&#46028; &#48156;&#44404;',ic:'&#127983;',desc:'&#44256;&#51064;&#46028;&#50640;&#49436; &#44256;&#45824; &#50976;&#47932;&#51060; &#48156;&#44404;&#46104;&#50632;&#49845;&#45768;&#45796;!',effect:'&#47004;&#45924; &#50976;&#47932; 1&#44060;',apply:function(){}},
{id:'ev11',nm:'&#50689;&#44256; &#51228;&#52380;&#54665;&#49324;',ic:'&#127881;',desc:'&#48512;&#50668;&#51032; &#50689;&#44256; &#51228;&#52380;&#54665;&#49324;&#44032; &#50676;&#47140; &#49324;&#44592;&#44032; &#50732;&#46992;&#49845;&#45768;&#45796;.',effect:'&#51204;&#52404; &#44277;&#44201; +10% (5&#53556;)',apply:function(){}},
{id:'ev12',nm:'&#47749;&#44417;&#51032; &#52636;&#54788;',ic:'&#127993;',desc:'&#48177;&#48156;&#48177;&#51473;&#51032; &#47749;&#44417;&#51060; &#45208;&#53440;&#45208; &#50500;&#44400;&#50640; &#54633;&#47448;&#54664;&#49845;&#45768;&#45796;.',effect:'&#44417;&#48337; &#44277;&#44201; +15%',apply:function(){}}
];

// =============================================
// SECTION 9: QUIZ V14 (15문, 90→105)
// =============================================
var QUIZ_V14=[
{q:'&#44256;&#51312;&#49440;&#51032; &#51473;&#44228;&#47924;&#50669;&#50640;&#49436; &#44032;&#51109; &#51473;&#50836;&#54620; &#44368;&#50669;&#54408;&#51008;?',a:['&#52384;&#44592;&#50752; &#48708;&#45800;','&#49548;&#44552;&#44284; &#45224;','&#48260;&#50752; &#44172;','&#50725;&#44284; &#44552;'],c:0},
{q:'&#48512;&#50668;&#51032; &#50556;&#54633; &#48277;&#47456;&#50640; &#51032;&#54616;&#47732; &#49332;&#51064;&#51088;&#50640; &#45824;&#54620; &#52376;&#48268;&#51008;?',a:['&#49324;&#54805;','12&#48176; &#48176;&#49345;','&#52628;&#48169;','&#50773;&#50640;&#44172; &#48372;&#44256;'],c:0},
{q:'&#46041;&#50696;&#51032; &#50669;&#50669;&#51012; &#52840;&#48276;&#54616;&#47732; &#51201;&#50857;&#46104;&#45716; &#44288;&#49845;&#51008;?',a:['&#52293;&#54868;(&#36012;&#31117;)','&#51204;&#51137; &#49440;&#54252;','&#51032;&#47168;','&#54217;&#54868; &#54801;&#49345;'],c:0},
{q:'&#49340;&#54620;&#50640;&#49436; &#52380;&#44400;&#51060; &#44288;&#51109;&#54616;&#45716; &#49888;&#49457;&#44396;&#50669;&#51012; &#47924;&#50631;&#51060;&#46972; &#54616;&#45716;&#44032;?',a:['&#49548;&#46020;(&#34311;&#22615;)','&#49888;&#49884;','&#50500;&#49324;&#45804;','&#54036;&#44288;&#54924;'],c:0},
{q:'&#44256;&#51312;&#49440; &#49884;&#45824; &#52384;&#44592; &#51228;&#51089; &#44592;&#49696;&#51012; &#51204;&#54028;&#54620; &#44397;&#44032;&#45716;?',a:['&#50672;&#45208;&#46972;','&#51652;&#45208;&#46972;','&#51312;&#45208;&#46972;','&#52488;&#45208;&#46972;'],c:0},
{q:'&#50725;&#51200;&#51032; &#47564;&#47588;&#51109;&#51228;(&#50696;&#49569; &#44396;&#50669;)&#45716; &#47924;&#50631;&#51012; &#51032;&#48120;&#54616;&#45716;&#44032;?',a:['&#44032;&#51313;&#44277;&#46041;&#47924;&#45924;','&#44060;&#51064;&#47924;&#45924;','&#50773;&#47497;&#47924;&#45924;','&#49888;&#51204; &#47924;&#45924;'],c:0},
{q:'&#49340;&#54620;&#50640;&#49436; &#45453;&#49324;&#51032; &#54413;&#50836;&#47484; &#48708;&#45716; &#51228;&#52380;&#54665;&#49324;&#51032; &#49884;&#44592;&#45716;?',a:['5&#50900;&#44284; 10&#50900;','1&#50900;&#44284; 7&#50900;','3&#50900;&#44284; 9&#50900;','4&#50900;&#44284; 12&#50900;'],c:0},
{q:'&#44256;&#51312;&#49440;&#51032; &#49464;&#47141; &#48276;&#50948;&#47484; &#52628;&#51221;&#54616;&#45716; &#45824;&#54364;&#51201; &#50976;&#47932;&#51008;?',a:['&#48708;&#54028;&#54805;&#46041;&#44160;&#44284; &#48124;&#47924;&#45740;&#53664;&#44592;','&#48177;&#51088; &#46020;&#44592;','&#44552; &#44288;','&#52397;&#51088; &#46020;&#44592;'],c:0},
{q:'&#54620; &#47924;&#51228;&#44032; &#44256;&#51312;&#49440; &#52840;&#44277; &#49884; &#50977;&#44400;&#51012; &#51060;&#45132; &#51109;&#49688;&#45716;?',a:['&#51340;&#51109;&#44400; &#49692;&#52404;','&#45572;&#49440;&#51109;&#44400; &#50577;&#48373;','&#45824;&#51109;&#44400; &#50948;&#52397;','&#54364;&#44592;&#51109;&#44400; &#44285;&#44144;&#48337;'],c:0},
{q:'&#44256;&#51312;&#49440; &#49884;&#45824;&#50640; &#54868;&#54224;&#52376;&#47100; &#49324;&#50857;&#46108; &#47932;&#54408;&#51008;?',a:['&#52384;&#51221;(&#37941;&#37755;, &#45929;&#51060;&#49632;)','&#50725;&#44396;&#49836;','&#44552; &#46041;&#51204;','&#51312;&#44060;'],c:0},
{q:'&#48512;&#50668;&#50640;&#49436; &#54805;&#48268;&#51012; &#45436;&#51032;&#54616;&#45716; &#54924;&#51032;&#45716;?',a:['&#51228;&#44032;&#54924;&#51032;(&#46021;&#54924;)','&#44397;&#51064;&#54924;&#51032;','&#50976;&#48124;&#54924;&#51032;','&#50773;&#54924;&#51032;'],c:0},
{q:'&#47560;&#54620; 54&#44397; &#51473; &#47749;&#47785;&#49345; &#47609;&#51452; &#50669;&#54624;&#51012; &#54620; &#45208;&#46972;&#45716;?',a:['&#47785;&#51648;&#44397;','&#49324;&#47196;&#44397;','&#44396;&#50556;&#44397;','&#47560;&#47785;&#44397;'],c:0},
{q:'&#48320;&#54620;(&#44032;&#50556;)&#51032; &#52384; &#49688;&#52636; &#45824;&#49345;&#44397;&#50640; &#54252;&#54632;&#46108; &#45208;&#46972;&#45716;?',a:['&#45209;&#46993;&#44284; &#50780;','&#48512;&#50668;&#50752; &#44256;&#44396;&#47140;','&#49888;&#46972;&#50752; &#48177;&#51228;','&#54620;&#45208;&#46972;&#50752; &#45817;'],c:0},
{q:'&#46041;&#50696;&#50640;&#49436; 10&#50900;&#50640; &#44060;&#52572;&#46104;&#45716; &#51228;&#52380;&#54665;&#49324;&#45716;?',a:['&#47924;&#52380;(&#33310;&#22825;)','&#50689;&#44256;','&#46041;&#47609;','&#44228;&#51208;&#51228;'],c:0},
{q:'&#44256;&#51312;&#49440; &#49884;&#45824;&#51032; &#44592;&#51109; &#47560;&#51648;&#47561; &#48169;&#50612;&#51204;&#51008;?',a:['&#50773;&#44160;&#49457; &#44277;&#48169;&#51204;','&#49332;&#49688;&#45824;&#52393;','&#54889;&#49328;&#48268; &#51204;&#53804;','&#45817;&#54252; &#54644;&#51204;'],c:0}
];

// =============================================
// SECTION 10: ACHIEVEMENTS V14 (12개, 48→60)
// =============================================
var ACH_V14=[
{id:'diplomat',nm:'&#50808;&#44368;&#51032; &#45804;&#51064;',ds:'&#50808;&#44368; &#54056;&#45328; &#50676;&#46988;',ic:'&#127760;'},
{id:'ally_first',nm:'&#52395; &#46041;&#47609;',ds:'&#54620; &#44397;&#44032;&#50752; &#50864;&#54840;&#46020; 80 &#51060;&#49345;',ic:'&#129309;'},
{id:'resource_rich',nm:'&#51088;&#50896;&#51032; &#50773;',ds:'&#47784;&#46304; &#51088;&#50896; 500 &#51060;&#49345;',ic:'&#128176;'},
{id:'builder_first',nm:'&#52395; &#44148;&#52629;',ds:'&#44148;&#47932; 1&#44060; &#44148;&#49444;',ic:'&#127984;'},
{id:'builder_all',nm:'&#44148;&#52629;&#51032; &#45804;&#51064;',ds:'&#47784;&#46304; &#44148;&#47932; &#44148;&#49444;',ic:'&#127983;'},
{id:'trader',nm:'&#44368;&#50669;&#50773;',ds:'&#44368;&#50669;&#47196; 3&#44060; &#51060;&#49345; &#54876;&#49457;&#54868;',ic:'&#128674;'},
{id:'weatherman',nm:'&#45216;&#50472; &#47560;&#49828;&#53552;',ds:'&#45216;&#50472; &#49884;&#49828;&#53596; &#50676;&#46988;',ic:'&#127782;&#65039;'},
{id:'mission_3',nm:'&#51076;&#47924; &#50756;&#49688;&#51088;',ds:'&#53945;&#49688;&#51076;&#47924; 3&#44060; &#50756;&#47308;',ic:'&#128065;&#65039;'},
{id:'mission_all',nm:'&#51076;&#47924; &#47560;&#49828;&#53552;',ds:'&#47784;&#46304; &#53945;&#49688;&#51076;&#47924; &#50756;&#47308;',ic:'&#127775;'},
{id:'event_5',nm:'&#50669;&#49324;&#51032; &#51613;&#51064;',ds:'&#46988;&#45924; &#51060;&#48292;&#53944; 5&#54924; &#44221;&#54744;',ic:'&#128220;'},
{id:'quiz_105',nm:'&#50669;&#49324; &#48149;&#49324;',ds:'&#53300;&#51592; 105&#47928; &#51221;&#45813; &#45572;&#51201;',ic:'&#127891;'},
{id:'all_v14',nm:'v14 &#47560;&#49828;&#53552;',ds:'v14 &#44592;&#45733; &#51204;&#48512; &#52404;&#54744;',ic:'&#128142;'}
];

// =============================================
// SECTION 11: DOM INJECTION
// =============================================
var panels={};
['diplomacy','resources','weather','fortress','trade','missions','events','tacmap'].forEach(function(id){
var el=document.createElement('div');
el.id='v14-'+id;
el.className='v14-panel';
el.setAttribute('role','dialog');
document.body.appendChild(el);
panels[id]=el;
});

// =============================================
// SECTION 12: STATE MANAGEMENT
// =============================================
function getV14State(){try{return JSON.parse(localStorage.getItem('krpg_v14'))||{}}catch(e){return{}}}
function saveV14State(s){localStorage.setItem('krpg_v14',JSON.stringify(s))}
function trackV14(key,val){var s=getV14State();if(!s.tracked)s.tracked={};s.tracked[key]=val;saveV14State(s);checkV14Ach()}
function loadStats14(){try{return JSON.parse(localStorage.getItem('krpg_stats'))||{}}catch(e){return{}}}
function loadAch14(){try{return JSON.parse(localStorage.getItem('krpg_ach'))||[]}catch(e){return[]}}

function getResources(){
var s=getV14State();
if(!s.resources){
s.resources=RESOURCES.map(function(r){return{id:r.id,val:r.val,max:r.max,income:r.income}});
saveV14State(s);
}
return s.resources;
}

// =============================================
// SECTION 13: RENDER - DIPLOMACY
// =============================================
function renderDiplomacy(){
var state=getV14State();
var rels=state.relations||{};
var p=panels.diplomacy;
p.innerHTML='<h2>&#127760; &#50808;&#44368; &#49884;&#49828;&#53596;</h2>'+
'<div class="v14-subtitle">&#51452;&#48320; &#44397;&#44032;&#50752;&#51032; &#50808;&#44368; &#44288;&#44228;&#47484; &#44288;&#47532;&#54616;&#49464;&#50836;. &#50864;&#54840;&#46020;&#47484; &#45458;&#50668; &#46041;&#47609;&#51012; &#47610;&#51004;&#49464;&#50836;.</div>'+
'<div class="dip-grid">'+NATIONS.map(function(n){
var rel=rels[n.id]||n.relation;
var st=rel>=80?'ally':rel>=40?'neutral':rel>=20?'hostile':'hostile';
var stLabel=rel>=80?'&#46041;&#47609;':rel>=40?'&#51473;&#47549;':'&#51201;&#45824;';
var barColor=rel>=80?'#88ff88':rel>=40?'#cccc44':'#ff8888';
return '<div class="dip-card" onclick="window._v14.showNation(\''+n.id+'\')" role="button" tabindex="0">'+
'<div class="dip-icon">'+n.ic+'</div>'+
'<div class="dip-name">'+n.nm+'</div>'+
'<div style="font-size:9px;color:#5a5a6a">'+n.region+'</div>'+
'<div class="dip-rel dip-'+st+'">'+stLabel+' ('+rel+')</div>'+
'<div class="dip-bar-wrap"><div class="dip-bar-fill" style="width:'+rel+'%;background:'+barColor+'"></div></div>'+
'</div>';
}).join('')+'</div>'+
'<div class="dip-detail" id="dip-detail-v14"></div>'+
'<button class="v14-close" onclick="document.getElementById(\'v14-diplomacy\').classList.remove(\'on\')">&#45803;&#44592;</button>';
trackV14('diplomacy_viewed',true);
}

function showNation(id){
var n=NATIONS.find(function(x){return x.id===id});if(!n)return;
var state=getV14State();var rels=state.relations||{};
var rel=rels[n.id]||n.relation;
if(typeof sfx==='function')sfx('diplo_view');
var dt=document.getElementById('dip-detail-v14');
dt.className='dip-detail on';
dt.innerHTML='<h3 style="color:#5FA0FF;font-size:15px;text-align:center">'+n.ic+' '+n.nm+'</h3>'+
'<p style="font-size:11px;color:#e8dcc8;line-height:2;margin:8px 0">'+n.desc+'</p>'+
'<div style="display:flex;gap:12px;margin:8px 0;flex-wrap:wrap">'+
'<div style="flex:1;font-size:10px;padding:8px;background:rgba(0,0,0,.2);border-radius:6px"><b style="color:#88ff88">&#49688;&#52636;&#54408;</b><br>'+n.exports+'</div>'+
'<div style="flex:1;font-size:10px;padding:8px;background:rgba(0,0,0,.2);border-radius:6px"><b style="color:#ff8888">&#49688;&#51077;&#54408;</b><br>'+n.imports+'</div>'+
'</div>'+
'<div class="dip-actions">'+
'<button class="dip-act-btn" onclick="window._v14.dipAction(\''+n.id+'\',\'gift\')"'+(rel>=95?' disabled':'')+'>&#127873; &#49440;&#47932; (+10)</button>'+
'<button class="dip-act-btn" onclick="window._v14.dipAction(\''+n.id+'\',\'trade\')"'+(rel<30?' disabled':'')+'>&#128230; &#44368;&#50669; (+5)</button>'+
'<button class="dip-act-btn" onclick="window._v14.dipAction(\''+n.id+'\',\'alliance\')"'+(rel<80?' disabled':'')+'>&#129309; &#46041;&#47609;</button>'+
'<button class="dip-act-btn" onclick="window._v14.dipAction(\''+n.id+'\',\'threaten\')">&#9876;&#65039; &#50948;&#54801; (-15)</button>'+
'</div>';
}

function dipAction(nationId,action){
var s=getV14State();if(!s.relations)s.relations={};
var n=NATIONS.find(function(x){return x.id===nationId});if(!n)return;
var rel=s.relations[nationId]||n.relation;
var delta=0;
if(action==='gift'){delta=10;var r=getResources();if(r[3].val>=20){r[3].val-=20;s.resources=r}else{showV14Toast('&#44552;&#51060; &#48512;&#51313;&#54633;&#45768;&#45796;!');return}}
if(action==='trade'){delta=5}
if(action==='alliance'){if(rel>=80){showV14Toast(n.nm+'&#44284; &#46041;&#47609; &#52404;&#44208;!');delta=5}else{return}}
if(action==='threaten'){delta=-15}
rel=Math.max(0,Math.min(100,rel+delta));
s.relations[nationId]=rel;saveV14State(s);
if(typeof sfx==='function')sfx(delta>0?'diplo_gift':'diplo_threaten');
showV14Toast(n.nm+' &#50864;&#54840;&#46020;: '+rel);
renderDiplomacy();
checkV14Ach();
}

// =============================================
// SECTION 14: RENDER - RESOURCES
// =============================================
function renderResources(){
var res=getResources();
var p=panels.resources;
p.innerHTML='<h2>&#128176; &#51088;&#50896; &#44288;&#47532;</h2>'+
'<div class="v14-subtitle">&#49885;&#47049;&#183;&#52384;&#183;&#47785;&#51116;&#183;&#44552; 4&#51333; &#51088;&#50896;&#51012; &#44288;&#47532;&#54616;&#50668; &#44148;&#47932;&#51012; &#44148;&#49444;&#54616;&#44256; &#44400;&#45824;&#47484; &#50977;&#49457;&#54616;&#49464;&#50836;</div>'+
'<div class="res-bar-area">'+RESOURCES.map(function(r,i){
var cur=res[i];
var pct=Math.round(cur.val/cur.max*100);
return '<div class="res-row">'+
'<span class="res-icon">'+r.ic+'</span>'+
'<span class="res-name">'+r.nm+'</span>'+
'<div class="res-bar"><div class="res-bar-fill" style="width:'+pct+'%;background:'+r.color+'"></div></div>'+
'<span class="res-val">'+cur.val+' / '+cur.max+'</span>'+
'<span class="res-income">+'+cur.income+'/&#53556;</span>'+
'</div>';
}).join('')+'</div>'+
'<div style="text-align:center;margin:12px 0"><button class="dip-act-btn" style="padding:8px 20px;font-size:11px" onclick="window._v14.collectResources()">&#128230; &#51088;&#50896; &#49688;&#51665; (+&#49688;&#51077;)</button></div>'+
'<button class="v14-close" onclick="document.getElementById(\'v14-resources\').classList.remove(\'on\')">&#45803;&#44592;</button>';
trackV14('resources_viewed',true);
}

function collectResources(){
var s=getV14State();
var res=getResources();
res.forEach(function(r,i){
r.val=Math.min(r.val+r.income,r.max);
});
s.resources=res;saveV14State(s);
if(typeof sfx==='function')sfx('resource_collect');
showV14Toast('&#51088;&#50896; &#49688;&#51665; &#50756;&#47308;!');
renderResources();
checkV14Ach();
}

// =============================================
// SECTION 15: RENDER - WEATHER
// =============================================
function renderWeather(){
var state=getV14State();
var current=state.currentWeather||'clear';
var p=panels.weather;
p.innerHTML='<h2>&#127782;&#65039; &#45216;&#50472; &#49884;&#49828;&#53596;</h2>'+
'<div class="v14-subtitle">&#45216;&#50472;&#50640; &#46384;&#46972; &#51204;&#53804;&#50640; &#45796;&#50577;&#54620; &#48372;&#45320;&#49828;/&#54168;&#45328;&#54000;&#44032; &#51201;&#50857;&#46121;&#45768;&#45796;</div>'+
'<div class="wx-cards">'+WEATHERS.map(function(w){
return '<div class="wx-card'+(current===w.id?' active':'')+'" onclick="window._v14.setWeather(\''+w.id+'\')" role="button" tabindex="0">'+
'<div class="wx-icon">'+w.ic+'</div>'+
'<div class="wx-name">'+w.nm+'</div>'+
'<div class="wx-effect">'+w.effect+'</div>'+
'</div>';
}).join('')+'</div>'+
'<div class="wx-canvas-wrap"><canvas class="wx-canvas" id="wx-cvs" width="500" height="200"></canvas></div>'+
'<button class="v14-close" onclick="document.getElementById(\'v14-weather\').classList.remove(\'on\')">&#45803;&#44592;</button>';
drawWeather(current);
trackV14('weather_viewed',true);
}

function drawWeather(id){
var cvs=document.getElementById('wx-cvs');if(!cvs)return;
var ctx=cvs.getContext('2d');
var w=500,h=200;ctx.clearRect(0,0,w,h);
var wx=WEATHERS.find(function(x){return x.id===id});
if(id==='clear'){
ctx.fillStyle='#1a2848';ctx.fillRect(0,0,w,h);
var grd=ctx.createLinearGradient(0,0,0,h);
grd.addColorStop(0,'#2a3858');grd.addColorStop(1,'#0a1428');
ctx.fillStyle=grd;ctx.fillRect(0,0,w,h);
ctx.fillStyle='#FFD700';ctx.beginPath();ctx.arc(250,60,30,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#FFD70033';ctx.beginPath();ctx.arc(250,60,45,0,Math.PI*2);ctx.fill();
for(var i=0;i<20;i++){ctx.fillStyle='rgba(255,255,255,'+(Math.random()*.5+.2)+')';ctx.beginPath();ctx.arc(Math.random()*w,Math.random()*100,Math.random()*1.5+.5,0,Math.PI*2);ctx.fill()}
}else if(id==='rain'){
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,w,h);
for(var i=0;i<60;i++){ctx.strokeStyle='rgba(100,136,204,'+(Math.random()*.4+.2)+')';ctx.lineWidth=1;ctx.beginPath();var rx=Math.random()*w,ry=Math.random()*h;ctx.moveTo(rx,ry);ctx.lineTo(rx-2,ry+12);ctx.stroke()}
ctx.fillStyle='#3a4a5a';for(var i=0;i<5;i++){ctx.beginPath();ctx.arc(60+i*100,30,25+Math.random()*15,0,Math.PI*2);ctx.fill()}
}else if(id==='snow'){
ctx.fillStyle='#1a1a2e';ctx.fillRect(0,0,w,h);
for(var i=0;i<40;i++){ctx.fillStyle='rgba(220,230,255,'+(Math.random()*.5+.3)+')';ctx.beginPath();ctx.arc(Math.random()*w,Math.random()*h,Math.random()*3+1,0,Math.PI*2);ctx.fill()}
ctx.fillStyle='#eef4ff';ctx.fillRect(0,h-20,w,20);
}else if(id==='fog'){
ctx.fillStyle='#1a1a2e';ctx.fillRect(0,0,w,h);
for(var i=0;i<8;i++){var fy=40+i*20;ctx.fillStyle='rgba(170,187,204,'+(0.08+Math.random()*0.06)+')';ctx.fillRect(0,fy,w,15+Math.random()*10)}
}
ctx.fillStyle='#c4956a';ctx.font='bold 12px sans-serif';ctx.textAlign='center';
ctx.fillText(wx?wx.nm+' - '+wx.effect:'',w/2,h-8);
}

function setWeather(id){
var s=getV14State();s.currentWeather=id;saveV14State(s);
if(typeof sfx==='function')sfx('weather_change');
showV14Toast(WEATHERS.find(function(w){return w.id===id}).nm+' &#49444;&#51221;!');
renderWeather();
}

// =============================================
// SECTION 16: RENDER - FORTRESS/BUILDINGS
// =============================================
function renderFortress(){
var state=getV14State();
var built=state.buildings||{};
var res=getResources();
var p=panels.fortress;
p.innerHTML='<h2>&#127984; &#44148;&#52629; &#49884;&#49828;&#53596;</h2>'+
'<div class="v14-subtitle">&#49457;&#44285;&#183;&#52285;&#44256;&#183;&#45824;&#51109;&#44036;&#183;&#50672;&#48337;&#51109;&#183;&#49884;&#51109;&#51012; &#44148;&#49444;&#54616;&#50668; &#44397;&#47141;&#51012; &#44053;&#54868;&#54616;&#49464;&#50836;</div>'+
'<div style="text-align:center;font-size:10px;color:#8a7a6a;margin-bottom:12px">'+
'&#127838; '+res[0].val+' | &#9904;&#65039; '+res[1].val+' | &#127795; '+res[2].val+' | &#128176; '+res[3].val+'</div>'+
'<div class="fort-grid">'+BUILDINGS.map(function(b){
var lvl=built[b.id]||0;
var isBuilt=lvl>0;
var maxed=lvl>=b.maxLvl;
var canBuild=!maxed&&res[0].val>=b.cost.food&&res[1].val>=b.cost.iron&&res[2].val>=b.cost.wood&&res[3].val>=b.cost.gold;
return '<div class="fort-card'+(isBuilt?' built':'')+((!canBuild&&!maxed)?' locked':'')+'" onclick="'+(canBuild?'window._v14.buildStructure(\''+b.id+'\')':'')+'" role="button" tabindex="0">'+
'<div class="fort-icon">'+b.ic+'</div>'+
'<div class="fort-name">'+b.nm+'</div>'+
'<div class="fort-bonus">'+b.bonus+'</div>'+
(maxed?'<div class="fort-lvl">MAX (Lv.'+lvl+')</div>':
'<div class="fort-lvl">'+(isBuilt?'Lv.'+lvl+' &#8594; '+(lvl+1):'&#48120;&#44148;&#49444;')+'</div>')+
'<div class="fort-cost">&#127838;'+b.cost.food+' &#9904;&#65039;'+b.cost.iron+' &#127795;'+b.cost.wood+' &#128176;'+b.cost.gold+'</div>'+
'</div>';
}).join('')+'</div>'+
'<button class="v14-close" onclick="document.getElementById(\'v14-fortress\').classList.remove(\'on\')">&#45803;&#44592;</button>';
trackV14('fortress_viewed',true);
}

function buildStructure(id){
var s=getV14State();if(!s.buildings)s.buildings={};
var b=BUILDINGS.find(function(x){return x.id===id});if(!b)return;
var lvl=s.buildings[id]||0;
if(lvl>=b.maxLvl)return;
var res=getResources();
if(res[0].val<b.cost.food||res[1].val<b.cost.iron||res[2].val<b.cost.wood||res[3].val<b.cost.gold){
showV14Toast('&#51088;&#50896;&#51060; &#48512;&#51313;&#54633;&#45768;&#45796;!');return;
}
res[0].val-=b.cost.food;res[1].val-=b.cost.iron;res[2].val-=b.cost.wood;res[3].val-=b.cost.gold;
s.resources=res;
s.buildings[id]=(lvl+1);
saveV14State(s);
if(typeof sfx==='function')sfx('build_complete');
showV14Toast(b.nm+' Lv.'+(lvl+1)+' &#44148;&#49444; &#50756;&#47308;!');
renderFortress();
checkV14Ach();
}

// =============================================
// SECTION 17: RENDER - TRADE ROUTES
// =============================================
function renderTrade(){
var state=getV14State();
var activeRoutes=state.activeRoutes||[];
var p=panels.trade;
p.innerHTML='<h2>&#128674; &#44368;&#50669; &#49884;&#49828;&#53596;</h2>'+
'<div class="v14-subtitle">&#44368;&#50669;&#47196;&#47484; &#54876;&#49457;&#54868;&#54616;&#50668; &#47588; &#53556; &#51088;&#50896;&#51012; &#50619;&#51004;&#49464;&#50836;</div>'+
'<div class="trade-timeline">'+
'<div class="trade-line"></div>'+
TRADE_ROUTES.map(function(t,i){
var isActive=activeRoutes.indexOf(t.id)>=0;
return '<div class="trade-entry'+(isActive?' active':'')+'" onclick="window._v14.toggleTrade(\''+t.id+'\')" role="button" tabindex="0">'+
'<div class="trade-from">'+t.from+' &#8594; '+t.to+'</div>'+
'<div class="trade-name">'+(isActive?'&#9989; ':'')+t.nm+'</div>'+
'<div class="trade-desc">'+t.desc+'</div>'+
'<div class="trade-yield">'+Object.keys(t.yield).map(function(k){
var icons={gold:'&#128176;',food:'&#127838;',iron:'&#9904;&#65039;',wood:'&#127795;'};
return (icons[k]||k)+'+'+t.yield[k]+'/&#53556;';
}).join(' ')+'</div>'+
'</div>';
}).join('')+
'</div>'+
'<button class="v14-close" onclick="document.getElementById(\'v14-trade\').classList.remove(\'on\')">&#45803;&#44592;</button>';
trackV14('trade_viewed',true);
}

function toggleTrade(id){
var s=getV14State();if(!s.activeRoutes)s.activeRoutes=[];
var idx=s.activeRoutes.indexOf(id);
if(idx>=0){s.activeRoutes.splice(idx,1);showV14Toast('&#44368;&#50669;&#47196; &#48708;&#54876;&#49457;&#54868;')}
else{s.activeRoutes.push(id);
var t=TRADE_ROUTES.find(function(x){return x.id===id});
if(t){
var res=getResources();
Object.keys(t.yield).forEach(function(k){
var ri={food:0,iron:1,wood:2,gold:3};
if(typeof ri[k]!=='undefined')res[ri[k]].income+=t.yield[k];
});
s.resources=res;
}
showV14Toast('&#44368;&#50669;&#47196; &#54876;&#49457;&#54868;!')}
saveV14State(s);
if(typeof sfx==='function')sfx('trade_toggle');
renderTrade();
checkV14Ach();
}

// =============================================
// SECTION 18: RENDER - SPECIAL MISSIONS
// =============================================
function renderMissions(){
var state=getV14State();
var completed=state.missionsCompleted||[];
var p=panels.missions;
p.innerHTML='<h2>&#128065;&#65039; &#53945;&#49688; &#51076;&#47924;</h2>'+
'<div class="v14-subtitle">&#50689;&#50885;&#51012; &#48372;&#45236;&#50612; &#53945;&#49688; &#51076;&#47924;&#47484; &#49688;&#54665;&#54616;&#49464;&#50836;</div>'+
'<div class="mis-list">'+MISSIONS.map(function(m,i){
var isDone=completed.indexOf(m.id)>=0;
var isLocked=i>0&&completed.indexOf(MISSIONS[i-1].id)<0&&!isDone;
return '<div class="mis-card'+(isDone?' done':'')+(isLocked?' locked':'')+'" onclick="'+(isLocked?'':'window._v14.startMission(\''+m.id+'\')')+'" role="button" tabindex="0">'+
'<div class="mis-num">'+m.ic+'</div>'+
'<div class="mis-info">'+
'<h4>'+m.nm+'</h4>'+
'<p>'+m.desc+'</p>'+
'<div style="font-size:9px;color:#8a7a6a;margin-top:2px">&#50689;&#50885;: '+m.hero+' | &#45212;&#51060;&#46020;: '+m.diff+'</div>'+
'<div class="mis-reward">'+(isDone?'&#9989; &#50756;&#47308;':'&#128161; &#48372;&#49345;: '+m.reward)+'</div>'+
'</div></div>';
}).join('')+'</div>'+
'<button class="v14-close" onclick="document.getElementById(\'v14-missions\').classList.remove(\'on\')">&#45803;&#44592;</button>';
trackV14('missions_viewed',true);
}

function startMission(id){
var s=getV14State();if(!s.missionsCompleted)s.missionsCompleted=[];
if(s.missionsCompleted.indexOf(id)>=0){showV14Toast('&#51060;&#48120; &#50756;&#47308;&#46108; &#51076;&#47924;&#51077;&#45768;&#45796;');return}
var m=MISSIONS.find(function(x){return x.id===id});if(!m)return;
s.missionsCompleted.push(id);saveV14State(s);
if(typeof sfx==='function')sfx('mission_complete');
showV14Toast(m.nm+' &#50756;&#47308;! '+m.reward);
renderMissions();
checkV14Ach();
}

// =============================================
// SECTION 19: RENDER - RANDOM EVENTS
// =============================================
function renderEvents(){
var state=getV14State();
var eventLog=state.eventLog||[];
var p=panels.events;
p.innerHTML='<h2>&#128220; &#50669;&#49324; &#51060;&#48292;&#53944;</h2>'+
'<div class="v14-subtitle">&#47588; &#53556; &#46988;&#45924;&#51004;&#47196; &#48156;&#49373;&#54616;&#45716; &#50669;&#49324;&#51201; &#49324;&#44148;&#46308;&#51077;&#45768;&#45796;</div>'+
'<div style="text-align:center;margin-bottom:12px"><button class="dip-act-btn" style="padding:8px 20px;font-size:11px" onclick="window._v14.triggerEvent()">&#127922; &#51060;&#48292;&#53944; &#48156;&#49373;</button></div>'+
'<div class="evt-log">'+
(eventLog.length===0?'<div style="text-align:center;color:#5a5a6a;font-size:11px;padding:20px">&#50500;&#51649; &#51060;&#48292;&#53944;&#44032; &#50630;&#49845;&#45768;&#45796;. &#48260;&#53948;&#51012; &#45580;&#47084; &#51060;&#48292;&#53944;&#47484; &#48156;&#49373;&#49884;&#53412;&#49464;&#50836;.</div>':
eventLog.slice().reverse().map(function(e){
return '<div class="evt-entry">'+
'<div class="evt-header">'+
'<span class="evt-icon">'+e.ic+'</span>'+
'<span class="evt-title">'+e.nm+'</span>'+
'<span class="evt-time">'+e.time+'</span>'+
'</div>'+
'<div class="evt-desc">'+e.desc+'</div>'+
'<div class="evt-effect">'+e.effect+'</div>'+
'</div>';
}).join(''))+
'</div>'+
'<button class="v14-close" onclick="document.getElementById(\'v14-events\').classList.remove(\'on\')">&#45803;&#44592;</button>';
trackV14('events_viewed',true);
}

function triggerEvent(){
var s=getV14State();if(!s.eventLog)s.eventLog=[];
var evt=EVENTS[Math.floor(Math.random()*EVENTS.length)];
var now=new Date();
var timeStr=(now.getMonth()+1)+'/'+now.getDate()+' '+now.getHours()+':'+String(now.getMinutes()).replace(/^(\d)$/,'0$1');
var entry={id:evt.id,nm:evt.nm,ic:evt.ic,desc:evt.desc,effect:evt.effect,time:timeStr};
s.eventLog.push(entry);
if(s.eventLog.length>20)s.eventLog=s.eventLog.slice(-20);
var res=getResources();
evt.apply(res);
s.resources=res;
saveV14State(s);
if(typeof sfx==='function')sfx('event_trigger');
showV14Toast(evt.ic+' '+evt.nm+'!');
renderEvents();
checkV14Ach();
}

// =============================================
// SECTION 20: RENDER - TACTICAL MAP
// =============================================
function renderTacMap(){
var p=panels.tacmap;
p.innerHTML='<h2>&#128506;&#65039; &#51204;&#49696; &#51648;&#46020;</h2>'+
'<div class="v14-subtitle">&#44256;&#51312;&#49440; &#49884;&#45824; &#49464;&#47141; &#48516;&#54252;&#50752; &#51452;&#50836; &#44144;&#51216;&#51012; &#54869;&#51064;&#54616;&#49464;&#50836;</div>'+
'<div class="tmap-wrap"><canvas class="tmap-canvas" id="tmap-cvs" width="500" height="400"></canvas></div>'+
'<div class="tmap-legend">'+
'<div class="tmap-leg"><div class="tmap-dot" style="background:#FFD700"></div> &#44256;&#51312;&#49440;</div>'+
'<div class="tmap-leg"><div class="tmap-dot" style="background:#5FA0FF"></div> &#48512;&#50668;</div>'+
'<div class="tmap-leg"><div class="tmap-dot" style="background:#ff6644"></div> &#54620;(&#28450;)</div>'+
'<div class="tmap-leg"><div class="tmap-dot" style="background:#88ff88"></div> &#49340;&#54620;</div>'+
'<div class="tmap-leg"><div class="tmap-dot" style="background:#aa88ff"></div> &#50696;/&#50725;&#51200;</div>'+
'</div>'+
'<button class="v14-close" onclick="document.getElementById(\'v14-tacmap\').classList.remove(\'on\')">&#45803;&#44592;</button>';
drawTacMap();
trackV14('tacmap_viewed',true);
}

function drawTacMap(){
var cvs=document.getElementById('tmap-cvs');if(!cvs)return;
var ctx=cvs.getContext('2d');
var w=500,h=400;
ctx.fillStyle='#0a1428';ctx.fillRect(0,0,w,h);
ctx.strokeStyle='#1a2a3a';ctx.lineWidth=1;
for(var i=0;i<25;i++){ctx.beginPath();ctx.moveTo(i*20,0);ctx.lineTo(i*20,h);ctx.stroke()}
for(var i=0;i<20;i++){ctx.beginPath();ctx.moveTo(0,i*20);ctx.lineTo(w,i*20);ctx.stroke()}

var territories=[
{nm:'&#44256;&#51312;&#49440;',x:200,y:150,r:60,color:'#FFD700'},
{nm:'&#48512;&#50668;',x:320,y:80,r:40,color:'#5FA0FF'},
{nm:'&#54620;(&#28450;)',x:80,y:100,r:50,color:'#ff6644'},
{nm:'&#47560;&#54620;',x:180,y:310,r:35,color:'#88ff88'},
{nm:'&#51652;&#54620;',x:280,y:320,r:30,color:'#88ff88'},
{nm:'&#48320;&#54620;',x:240,y:340,r:25,color:'#88ff88'},
{nm:'&#50696;',x:350,y:200,r:30,color:'#aa88ff'},
{nm:'&#50725;&#51200;',x:400,y:140,r:25,color:'#aa88ff'}
];

territories.forEach(function(t){
ctx.beginPath();ctx.arc(t.x,t.y,t.r,0,Math.PI*2);
ctx.fillStyle=t.color+'22';ctx.fill();
ctx.strokeStyle=t.color+'88';ctx.lineWidth=2;ctx.stroke();
ctx.fillStyle=t.color;ctx.beginPath();ctx.arc(t.x,t.y,5,0,Math.PI*2);ctx.fill();
ctx.fillStyle=t.color;ctx.font='bold 10px sans-serif';ctx.textAlign='center';
ctx.fillText(t.nm,t.x,t.y+t.r+14);
});

var routes=[
[200,150,80,100,'#ff664444'],[200,150,320,80,'#5FA0FF44'],
[200,150,350,200,'#aa88ff44'],[200,150,400,140,'#aa88ff44'],
[200,150,180,310,'#88ff8844'],[240,340,400,140,'#aa88ff44']
];
ctx.lineWidth=1;ctx.setLineDash([4,4]);
routes.forEach(function(r){ctx.strokeStyle=r[4];ctx.beginPath();ctx.moveTo(r[0],r[1]);ctx.lineTo(r[2],r[3]);ctx.stroke()});
ctx.setLineDash([]);

var cities=[
{nm:'&#50500;&#49324;&#45804;',x:200,y:135,icon:'&#127984;'},
{nm:'&#50773;&#44160;&#49457;',x:215,y:165,icon:'&#9876;&#65039;'},
{nm:'&#49888;&#49884;',x:180,y:120,icon:'&#127983;'}
];
cities.forEach(function(c){
ctx.font='14px sans-serif';ctx.textAlign='center';ctx.fillText(c.icon,c.x,c.y);
ctx.font='8px sans-serif';ctx.fillStyle='#e8dcc8';ctx.fillText(c.nm,c.x,c.y+12);
});

ctx.fillStyle='#c4956a';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
ctx.fillText('&#44256;&#51312;&#49440; &#49884;&#45824; &#49464;&#47141; &#48516;&#54252;&#46020; (BC 3C~BC 1C)',w/2,h-8);
}

// =============================================
// SECTION 21: ACHIEVEMENT CHECK
// =============================================
function checkV14Ach(){
var s=getV14State();var t=s.tracked||{};
var rels=s.relations||{};var bld=s.buildings||{};
var routes=s.activeRoutes||[];var missions=s.missionsCompleted||[];
var evtLog=s.eventLog||[];var res=getResources();
var stats=loadStats14();var ach=loadAch14();
var changed=false;

var hasAlly=NATIONS.some(function(n){return(rels[n.id]||n.relation)>=80});
var allRes=res.every(function(r){return r.val>=500});
var builtCount=Object.keys(bld).filter(function(k){return bld[k]>0}).length;

var checks={
diplomat:!!t.diplomacy_viewed,
ally_first:hasAlly,
resource_rich:allRes,
builder_first:builtCount>=1,
builder_all:builtCount>=BUILDINGS.length,
trader:routes.length>=3,
weatherman:!!t.weather_viewed,
mission_3:missions.length>=3,
mission_all:missions.length>=MISSIONS.length,
event_5:evtLog.length>=5,
quiz_105:(stats.quizOk||0)>=105,
all_v14:!!t.diplomacy_viewed&&!!t.resources_viewed&&!!t.weather_viewed&&!!t.fortress_viewed&&!!t.trade_viewed&&!!t.missions_viewed&&!!t.events_viewed&&!!t.tacmap_viewed
};

ACH_V14.forEach(function(a){
if(ach.indexOf(a.id)<0&&checks[a.id]){ach.push(a.id);changed=true;showV14AchToast(a)}
});
if(changed)localStorage.setItem('krpg_ach',JSON.stringify(ach));
}

// =============================================
// SECTION 22: TOAST & ACHIEVEMENT TOAST
// =============================================
function showV14Toast(msg){
var t=document.createElement('div');
t.style.cssText='position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(26,20,40,.95);border:1px solid #5FA0FF;border-radius:8px;padding:8px 20px;z-index:200;font-size:12px;color:#e8dcc8;pointer-events:none;animation:achSlide14 .5s ease';
t.textContent=msg;
document.body.appendChild(t);
setTimeout(function(){t.style.transition='opacity .5s';t.style.opacity='0';setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t)},600)},2000);
}

function showV14AchToast(a){
if(typeof sfx==='function')sfx('achievement_v14');
var t=document.createElement('div');
t.style.cssText='position:fixed;top:60px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,rgba(95,160,255,.15),rgba(255,215,0,.15));border:2px solid #5FA0FF;border-radius:12px;padding:12px 20px;z-index:200;text-align:center;min-width:220px;backdrop-filter:blur(8px);pointer-events:none;animation:achSlide14 .5s ease';
t.innerHTML='<div style="font-size:28px">'+a.ic+'</div><div style="font-size:11px;color:#5FA0FF;font-weight:700">&#50629;&#51201; &#45804;&#49457;!</div><div style="font-size:14px;color:#e8dcc8;font-weight:700">'+a.nm+'</div><div style="font-size:9px;color:#8a7a6a">'+a.ds+'</div>';
document.body.appendChild(t);
setTimeout(function(){t.style.transition='opacity .5s';t.style.opacity='0';setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t)},600)},3000);
}

// =============================================
// SECTION 23: MENU BUTTON INJECTION
// =============================================
var mnu=document.getElementById('menu-overlay');
if(mnu){
var v14btns=[
{txt:'&#127760; &#50808;&#44368;',fn:function(){mnu.classList.remove('on');renderDiplomacy();panels.diplomacy.classList.add('on')}},
{txt:'&#128176; &#51088;&#50896;',fn:function(){mnu.classList.remove('on');renderResources();panels.resources.classList.add('on')}},
{txt:'&#127782;&#65039; &#45216;&#50472;',fn:function(){mnu.classList.remove('on');renderWeather();panels.weather.classList.add('on')}},
{txt:'&#127984; &#44148;&#52629;',fn:function(){mnu.classList.remove('on');renderFortress();panels.fortress.classList.add('on')}},
{txt:'&#128674; &#44368;&#50669;',fn:function(){mnu.classList.remove('on');renderTrade();panels.trade.classList.add('on')}},
{txt:'&#128065;&#65039; &#51076;&#47924;',fn:function(){mnu.classList.remove('on');renderMissions();panels.missions.classList.add('on')}},
{txt:'&#128220; &#51060;&#48292;&#53944;',fn:function(){mnu.classList.remove('on');renderEvents();panels.events.classList.add('on')}},
{txt:'&#128506;&#65039; &#51204;&#49696;&#51648;&#46020;',fn:function(){mnu.classList.remove('on');renderTacMap();panels.tacmap.classList.add('on')}}
];
var closeBtn=mnu.querySelector('.menu-btn:last-child');
v14btns.forEach(function(b){
var btn=document.createElement('button');btn.className='menu-btn';btn.innerHTML=b.txt;
btn.onclick=b.fn;
if(closeBtn)mnu.insertBefore(btn,closeBtn);else mnu.appendChild(btn);
});
}

// =============================================
// SECTION 24: KEYBOARD SHORTCUTS (+6종)
// =============================================
document.addEventListener('keydown',function(ev){
if(ev.target.tagName==='INPUT'||ev.target.tagName==='TEXTAREA')return;
if(ev.ctrlKey||ev.altKey||ev.metaKey)return;
if(!ev.shiftKey)return;
var key=ev.key.toUpperCase();
if(key==='D'){panels.diplomacy.classList.toggle('on');if(panels.diplomacy.classList.contains('on'))renderDiplomacy();ev.preventDefault()}
if(key==='R'){panels.resources.classList.toggle('on');if(panels.resources.classList.contains('on'))renderResources();ev.preventDefault()}
if(key==='W'){panels.weather.classList.toggle('on');if(panels.weather.classList.contains('on'))renderWeather();ev.preventDefault()}
if(key==='B'){panels.fortress.classList.toggle('on');if(panels.fortress.classList.contains('on'))renderFortress();ev.preventDefault()}
if(key==='A'){panels.trade.classList.toggle('on');if(panels.trade.classList.contains('on'))renderTrade();ev.preventDefault()}
if(key==='M'){panels.tacmap.classList.toggle('on');if(panels.tacmap.classList.contains('on'))renderTacMap();ev.preventDefault()}
});

// =============================================
// SECTION 25: SFX (+8종)
// =============================================
if(typeof window.sfx==='function'&&typeof ac!=='undefined'){
var _sfx14=window.sfx;
window.sfx=function(t){
if(t==='diplo_view'&&ac&&typeof pn==='function'){
pn(392,.08,'sine');setTimeout(function(){pn(494,.08,'sine')},80);setTimeout(function(){pn(587,.1,'sine')},160);return;
}
if(t==='diplo_gift'&&ac&&typeof pn==='function'){
[523,587,659,784].forEach(function(f,i){setTimeout(function(){pn(f,.12,'sine')},i*70)});return;
}
if(t==='diplo_threaten'&&ac&&typeof pn==='function'){
pn(220,.12,'square');setTimeout(function(){pn(196,.12,'square')},100);setTimeout(function(){pn(165,.15,'square')},200);return;
}
if(t==='resource_collect'&&ac&&typeof pn==='function'){
[440,494,554,659].forEach(function(f,i){setTimeout(function(){pn(f,.1,'triangle')},i*50)});return;
}
if(t==='weather_change'&&ac&&typeof pn==='function'){
pn(330,.08,'sine');setTimeout(function(){pn(392,.1,'sine')},120);setTimeout(function(){pn(494,.12,'sine')},240);return;
}
if(t==='build_complete'&&ac&&typeof pn==='function'){
[262,330,392,523].forEach(function(f,i){setTimeout(function(){pn(f,.15,'square')},i*80)});return;
}
if(t==='trade_toggle'&&ac&&typeof pn==='function'){
pn(440,.08,'triangle');setTimeout(function(){pn(554,.1,'triangle')},80);return;
}
if(t==='mission_complete'&&ac&&typeof pn==='function'){
[330,392,494,587,659,784].forEach(function(f,i){setTimeout(function(){pn(f,.15,'sine')},i*60)});return;
}
if(t==='event_trigger'&&ac&&typeof pn==='function'){
pn(294,.1,'triangle');setTimeout(function(){pn(370,.1,'triangle')},100);setTimeout(function(){pn(440,.12,'triangle')},200);return;
}
if(t==='achievement_v14'&&ac&&typeof pn==='function'){
[523,659,784,987,1175].forEach(function(f,i){setTimeout(function(){pn(f,.18,'sine')},i*55)});return;
}
_sfx14(t);
};
}

// =============================================
// SECTION 26: QUIZ INJECTION
// =============================================
if(typeof QUIZZES!=='undefined'){
QUIZ_V14.forEach(function(q){QUIZZES.push(q)});
}

// =============================================
// SECTION 27: ACHIEVEMENT REGISTRATION
// =============================================
if(typeof window._v10!=='undefined'&&window._v10.achDefs){
ACH_V14.forEach(function(a){window._v10.achDefs.push(a)});
}

// =============================================
// SECTION 28: KEYBOARD HELP UPDATE
// =============================================
var kbHelp=document.getElementById('kb-help');
if(kbHelp){
var extra14=[
{key:'Shift+D',desc:'&#50808;&#44368; &#49884;&#49828;&#53596;'},
{key:'Shift+R',desc:'&#51088;&#50896; &#44288;&#47532;'},
{key:'Shift+W',desc:'&#45216;&#50472; &#49884;&#49828;&#53596;'},
{key:'Shift+B',desc:'&#44148;&#52629; &#49884;&#49828;&#53596;'},
{key:'Shift+A',desc:'&#44368;&#50669; &#49884;&#49828;&#53596;'},
{key:'Shift+M',desc:'&#51204;&#49696; &#51648;&#46020;'}
];
var closeBtn14=kbHelp.querySelector('.kb-close');
extra14.forEach(function(e){
var row=document.createElement('div');row.className='kb-row';
row.innerHTML='<span class="kb-key">'+e.key+'</span> '+e.desc;
if(closeBtn14)kbHelp.insertBefore(row,closeBtn14);else kbHelp.appendChild(row);
});
}

// =============================================
// SECTION 29: EXPORTS
// =============================================
window._v14={
renderDiplomacy:renderDiplomacy,
showNation:showNation,
dipAction:dipAction,
renderResources:renderResources,
collectResources:collectResources,
renderWeather:renderWeather,
setWeather:setWeather,
renderFortress:renderFortress,
buildStructure:buildStructure,
renderTrade:renderTrade,
toggleTrade:toggleTrade,
renderMissions:renderMissions,
startMission:startMission,
renderEvents:renderEvents,
triggerEvent:triggerEvent,
renderTacMap:renderTacMap,
nations:NATIONS,
resources:RESOURCES,
weathers:WEATHERS,
buildings:BUILDINGS,
tradeRoutes:TRADE_ROUTES,
missions:MISSIONS,
events:EVENTS,
achV14:ACH_V14,
quizV14:QUIZ_V14
};

})();
