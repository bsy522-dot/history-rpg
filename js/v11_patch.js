// v11_patch.js — 한국사 영웅전 v11.0 Enhancement Patch
// Encyclopedia + Daily Quest + Combo Skills + Relationships + Quiz+15 + Timeline + SFX + Haptic
(function(){
'use strict';

// =============================================
// SECTION 1: CSS INJECTION
// =============================================
var css=document.createElement('style');
css.id='v11-styles';
css.textContent=[
'#encyclopedia{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,8,30,.97);z-index:3000;display:none;flex-direction:column;color:#e8dcc8;font-family:inherit;overflow:hidden}',
'#encyclopedia.open{display:flex}',
'#enc-header{display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:2px solid #5a3e1b;background:rgba(30,18,6,.8)}',
'#enc-header h2{margin:0;font-size:1.3rem;color:#f5c842;flex:1}',
'.enc-search{background:#1a1208;border:1px solid #5a3e1b;color:#e8dcc8;padding:8px 14px;border-radius:20px;font-size:.95rem;width:200px;outline:none}',
'.enc-search:focus{border-color:#f5c842}',
'.enc-cats{display:flex;gap:8px;padding:12px 20px;background:rgba(20,12,4,.6);flex-wrap:wrap}',
'.enc-cat-btn{padding:6px 16px;border-radius:14px;border:1px solid #5a3e1b;background:transparent;color:#c8b48a;cursor:pointer;font-size:.85rem;transition:all .2s}',
'.enc-cat-btn.active,.enc-cat-btn:hover{background:#5a3e1b;color:#f5c842;border-color:#f5c842}',
'.enc-cat-btn[data-cat=person]{border-color:#7a9fd4}',
'.enc-cat-btn[data-cat=person].active{background:#2a4a7a;color:#aad4ff;border-color:#aad4ff}',
'.enc-cat-btn[data-cat=event]{border-color:#d47a7a}',
'.enc-cat-btn[data-cat=event].active{background:#7a2a2a;color:#ffaaaa;border-color:#ffaaaa}',
'.enc-cat-btn[data-cat=artifact]{border-color:#d4c47a}',
'.enc-cat-btn[data-cat=artifact].active{background:#7a6a2a;color:#ffe87a;border-color:#ffe87a}',
'.enc-cat-btn[data-cat=place]{border-color:#7ad4a4}',
'.enc-cat-btn[data-cat=place].active{background:#2a7a5a;color:#aaffcc;border-color:#aaffcc}',
'.enc-cat-btn[data-cat=culture]{border-color:#c47ad4}',
'.enc-cat-btn[data-cat=culture].active{background:#6a2a7a;color:#e8aaff;border-color:#e8aaff}',
'#enc-grid{flex:1;overflow-y:auto;padding:16px 20px;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px}',
'.enc-card{background:rgba(30,20,8,.8);border:1px solid #3a2a0e;border-radius:10px;padding:14px;cursor:pointer;transition:all .25s;position:relative;overflow:hidden}',
'.enc-card:hover{border-color:#f5c842;transform:translateY(-2px);box-shadow:0 6px 20px rgba(245,200,66,.15)}',
'.enc-card[data-cat=person]{border-left:3px solid #7a9fd4}',
'.enc-card[data-cat=event]{border-left:3px solid #d47a7a}',
'.enc-card[data-cat=artifact]{border-left:3px solid #d4c47a}',
'.enc-card[data-cat=place]{border-left:3px solid #7ad4a4}',
'.enc-card[data-cat=culture]{border-left:3px solid #c47ad4}',
'.enc-card .enc-nm{font-size:1.05rem;font-weight:bold;color:#f5c842;margin-bottom:4px}',
'.enc-card .enc-era{font-size:.75rem;color:#8a7a5a;margin-bottom:6px}',
'.enc-card .enc-desc{font-size:.85rem;color:#c8b48a;line-height:1.4}',
'.enc-card .enc-cat-badge{position:absolute;top:10px;right:10px;font-size:.7rem;padding:2px 8px;border-radius:8px;background:rgba(0,0,0,.4)}',
'.enc-detail{display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:3100;background:rgba(0,0,0,.85);align-items:center;justify-content:center}',
'.enc-detail.open{display:flex}',
'.enc-detail-box{background:#1a1208;border:2px solid #5a3e1b;border-radius:14px;padding:28px;max-width:520px;width:90%;color:#e8dcc8;position:relative}',
'.enc-detail-box h3{color:#f5c842;margin:0 0 8px;font-size:1.3rem}',
'.enc-detail-box .enc-detail-era{color:#8a7a5a;font-size:.8rem;margin-bottom:14px}',
'.enc-detail-box p{line-height:1.8;color:#c8b48a}',
'.enc-close,.enc-detail-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#c8b48a;font-size:1.4rem;cursor:pointer;line-height:1}',
'.enc-close:hover,.enc-detail-close:hover{color:#f5c842}',
'#daily-quest{position:fixed;bottom:20px;right:20px;width:280px;background:rgba(10,8,30,.95);border:2px solid #5a3e1b;border-radius:14px;z-index:2000;display:none;flex-direction:column;overflow:hidden}',
'#daily-quest.open{display:flex}',
'#dq-header{display:flex;align-items:center;padding:12px 14px;border-bottom:1px solid #3a2a0e;background:rgba(30,18,6,.7)}',
'#dq-header h3{margin:0;font-size:1rem;color:#f5c842;flex:1}',
'#dq-list{padding:10px;display:flex;flex-direction:column;gap:8px;max-height:340px;overflow-y:auto}',
'.dq-card{background:rgba(30,20,8,.7);border:1px solid #3a2a0e;border-radius:8px;padding:10px 12px;transition:border-color .2s}',
'.dq-card.done{border-color:#4a7a4a;background:rgba(20,40,20,.5)}',
'.dq-card .dq-top{display:flex;align-items:center;gap:6px;margin-bottom:6px}',
'.dq-card .dq-icon{font-size:1.1rem}',
'.dq-card .dq-nm{font-size:.9rem;font-weight:bold;color:#e8dcc8;flex:1}',
'.dq-card.done .dq-nm{color:#7ad47a}',
'.dq-card .dq-reward{font-size:.75rem;color:#f5c842}',
'.dq-card .dq-desc{font-size:.78rem;color:#8a7a5a;margin-bottom:6px}',
'.dq-bar-wrap{background:rgba(0,0,0,.4);border-radius:4px;height:6px;overflow:hidden}',
'.dq-bar{height:100%;border-radius:4px;background:linear-gradient(90deg,#5a9e5a,#8ada8a);transition:width .4s}',
'.dq-card.done .dq-bar{background:linear-gradient(90deg,#2a7a2a,#5ada5a)}',
'.dq-prog-text{font-size:.72rem;color:#6a5a3a;margin-top:3px;text-align:right}',
'#combo-info{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;max-width:95vw;background:rgba(10,8,30,.97);border:2px solid #7a4af0;border-radius:16px;z-index:2500;display:none;flex-direction:column;overflow:hidden}',
'#combo-info.open{display:flex}',
'#combo-header{padding:14px 18px;border-bottom:1px solid #4a2a80;display:flex;align-items:center}',
'#combo-header h3{margin:0;color:#c87aff;flex:1;font-size:1.1rem}',
'#combo-list{padding:12px;display:flex;flex-direction:column;gap:10px;max-height:380px;overflow-y:auto}',
'.combo-card{background:rgba(40,20,80,.6);border:1px solid #4a2a80;border-radius:10px;padding:12px;transition:all .25s}',
'.combo-card.available{border-color:#c87aff;box-shadow:0 0 12px rgba(200,122,255,.3)}',
'.combo-card .combo-nm{font-size:1rem;font-weight:bold;color:#e8aaff;margin-bottom:4px}',
'.combo-card .combo-parts{font-size:.78rem;color:#8a6aaa;margin-bottom:6px}',
'.combo-card .combo-eff{font-size:.82rem;color:#c8b4e8;line-height:1.4}',
'.combo-card .combo-status{font-size:.75rem;padding:2px 10px;border-radius:8px;display:inline-block;margin-top:6px}',
'.combo-card.available .combo-status{background:#4a1a80;color:#e8aaff}',
'.combo-card:not(.available) .combo-status{background:#1a1a2a;color:#6a5a8a}',
'#relations{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,8,30,.97);z-index:3000;display:none;flex-direction:column;color:#e8dcc8}',
'#relations.open{display:flex}',
'#rel-header{display:flex;align-items:center;padding:16px 20px;border-bottom:2px solid #5a3e1b;background:rgba(30,18,6,.8)}',
'#rel-header h2{margin:0;color:#f5c842;flex:1;font-size:1.3rem}',
'#rel-body{flex:1;overflow:auto;padding:20px;display:flex;flex-direction:column;gap:18px}',
'#rel-svg-wrap{display:flex;justify-content:center}',
'#rel-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px}',
'.rel-item{background:rgba(30,20,8,.7);border:1px solid #3a2a0e;border-radius:8px;padding:10px 14px;display:flex;align-items:center;gap:10px}',
'.rel-item .rel-from,.rel-item .rel-to{font-weight:bold;font-size:.9rem}',
'.rel-item .rel-arrow{font-size:1rem}',
'.rel-item.family .rel-arrow{color:#f5c842}',
'.rel-item.ally .rel-arrow{color:#7ad4a4}',
'.rel-item.mentor .rel-arrow{color:#7aa4d4}',
'.rel-item.rival .rel-arrow{color:#d47a7a}',
'.rel-item .rel-rdesc{font-size:.78rem;color:#8a7a5a;margin-left:auto;text-align:right;max-width:120px}',
'#chapter-timeline{padding:14px 18px;margin:10px 0;background:rgba(20,12,4,.7);border-radius:10px;border:1px solid #3a2a0e}',
'#chapter-timeline h3{margin:0 0 14px;color:#f5c842;font-size:.95rem}',
'.tl-wrap{display:flex;align-items:center;gap:0;overflow-x:auto;padding:4px 0}',
'.tl-node{display:flex;flex-direction:column;align-items:center;min-width:80px}',
'.tl-dot{width:18px;height:18px;border-radius:50%;border:2px solid #5a3e1b;background:#1a1208;position:relative;z-index:1;flex-shrink:0}',
'.tl-dot.done{background:#f5c842;border-color:#c8a020}',
'.tl-dot.current{background:#ff8c42;border-color:#ff6c20;box-shadow:0 0 8px rgba(255,140,66,.5)}',
'.tl-label{font-size:.68rem;color:#8a7a5a;margin-top:6px;text-align:center;max-width:76px}',
'.tl-label .tl-era{font-size:.6rem;color:#5a4a2a;display:block}',
'.tl-line{flex:1;height:2px;background:#3a2a0e;min-width:20px}',
'.tl-line.done{background:#c8a020}',
'.v11-toast{position:fixed;top:80px;left:50%;transform:translateX(-50%) translateY(-20px);background:#1a3a1a;border:1px solid #4a7a4a;color:#aaffaa;padding:10px 24px;border-radius:20px;font-size:.9rem;z-index:9999;opacity:0;transition:all .4s;pointer-events:none}',
'.v11-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}',
'.high-contrast #encyclopedia,.high-contrast #relations,.high-contrast #combo-info,.high-contrast #daily-quest{background:#000;border-color:#fff}',
'.high-contrast .enc-card,.high-contrast .dq-card,.high-contrast .combo-card,.high-contrast .rel-item{background:#111;border-color:#aaa;color:#fff}',
'.high-contrast .enc-card .enc-nm,.high-contrast #enc-header h2{color:#fff}',
'@media(prefers-reduced-motion:reduce){.enc-card,.dq-bar,.v11-toast,.combo-card{transition:none!important}}',
'@media(max-width:400px){#enc-grid{grid-template-columns:1fr}#daily-quest{width:calc(100% - 20px);left:10px;right:10px}#combo-info{width:calc(100% - 20px)}}'
].join('\n');
document.head.appendChild(css);

// =============================================
// SECTION 2: ENCYCLOPEDIA DATA (35 entries)
// =============================================
var ENC=[
{id:'p01',cat:'person',nm:'환웅',era:'신화시대',desc:'천신 환인의 아들, 신시를 건설한 하늘의 사자',detail:'환웅은 천신 환인의 아들로, 무리 3,000명을 이끌고 태백산 신단수 아래에 내려왔다. 그는 신시(神市)를 건설하고 풍백\xB7우사\xB7운사를 거느리며 인간 세상을 다스렸다. 곡식\xB7생명\xB7질병\xB7형벌\xB7선악 등 360여 가지 인간사를 주관하였다.'},
{id:'p02',cat:'person',nm:'단군왕검',era:'BC 2333년경',desc:'고조선의 건국자, 우리 민족의 시조',detail:'단군왕검은 환웅과 웅녀 사이에서 태어나 BC 2333년에 아사달을 도읍으로 고조선을 건국하였다. 홍익인간(弘益人間)의 이념을 바탕으로 나라를 다스렸다.'},
{id:'p03',cat:'person',nm:'을지문덕',era:'AD 612년',desc:'살수대첩을 승리로 이끈 고구려의 명장',detail:'을지문덕은 고구려의 대장군으로, 612년 수나라 양제의 113만 대군이 침공했을 때 살수(청천강)에서 적을 섬멸하였다. 30만 5천 명 중 살아 돌아간 자가 2,700명에 불과하였다.'},
{id:'p04',cat:'person',nm:'주몽(동명성왕)',era:'BC 37년',desc:'고구려 건국시조, 활의 신이라 불린 영웅',detail:'주몽은 해모수와 유화 사이에서 태어난 영웅으로, 부여에서 박해를 피해 남하하여 BC 37년에 졸본에서 고구려를 건국하였다. 사후 동명성왕으로 추존되었다.'},
{id:'p05',cat:'person',nm:'온조왕',era:'BC 18년',desc:'백제의 건국시조, 위례성에 도읍을 정한 왕',detail:'온조는 주몽의 아들로, 형 비류와 함께 남하하여 한강 유역의 위례성에 도읍을 정하고 BC 18년에 백제를 건국하였다. 10신하의 도움으로 나라를 안정시켰다.'},
{id:'p06',cat:'person',nm:'박혁거세',era:'BC 57년',desc:'신라 건국시조, 알에서 태어난 하늘의 아들',detail:'박혁거세는 BC 57년에 경주 나정 근처에서 큰 알에서 태어났다고 전해진다. 진한 6촌의 추대를 받아 13세에 왕위에 올랐으며 신라를 건국하였다.'},
{id:'p07',cat:'person',nm:'김수로왕',era:'AD 42년',desc:'금관가야 건국시조, 철의 왕국을 세운 영웅',detail:'김수로왕은 42년에 구지봉에서 황금 알에서 태어나 금관가야를 건국하였다. 풍부한 철을 바탕으로 한반도 최고의 철기 문화를 발전시켰다.'},
{id:'p08',cat:'person',nm:'위만',era:'BC 194년',desc:'위만조선을 수립한 중국계 망명자',detail:'위만은 중국 연나라 출신으로, BC 194년에 준왕을 몰아내고 왕검성을 점령하여 위만조선을 수립하였다. 철기 문화를 적극 수용하여 강력한 군사력을 갖추었다.'},
{id:'e01',cat:'event',nm:'고조선 건국',era:'BC 2333년',desc:'단군왕검이 아사달에 고조선을 세운 한민족 최초의 국가',detail:'BC 2333년, 단군왕검은 아사달을 도읍으로 삼아 고조선을 건국하였다. 홍익인간의 건국 이념은 한국 민족 정신의 기반이 되었다.'},
{id:'e02',cat:'event',nm:'살수대첩',era:'AD 612년',desc:'을지문덕이 수나라 113만 대군을 섬멸한 역사적 대승',detail:'612년 수나라 양제는 113만 대군을 이끌고 고구려를 침공하였다. 을지문덕은 청야전술과 유인작전으로 수군을 깊이 끌어들인 후, 살수를 건너는 적군을 기습하여 30만 5천 명 중 2,700명만 살아돌아갔다.'},
{id:'e03',cat:'event',nm:'위만의 집권',era:'BC 194년',desc:'위만이 준왕을 몰아내고 위만조선을 수립한 사건',detail:'BC 194년, 연나라 출신 망명자 위만은 고조선의 준왕으로부터 서쪽 변방 수비를 맡게 되었다. 그는 세력을 키운 후 반란을 일으켰다.'},
{id:'e04',cat:'event',nm:'한사군 설치',era:'BC 108년',desc:'한 무제가 위만조선 멸망 후 설치한 네 군현',detail:'BC 108년, 한 무제는 대규모 원정군을 보내 위만조선을 멸망시키고 낙랑\xB7임둘\xB7진번\xB7현도의 네 군을 설치하였다. 낙랑군은 313년 고구려에 의해 축출될 때까지 약 400년간 존속하였다.'},
{id:'e05',cat:'event',nm:'삼한의 형성',era:'BC 1세기~AD 1세기',desc:'마한\xB7변한\xB7진한이 형성된 한반도 남부의 정치체',detail:'고조선 멸망 이후 한반도 남부에 삼한이 발전하였다. 마한 54개 소국, 진한 12개, 변한 12개로 구성되었다.'},
{id:'e06',cat:'event',nm:'부여 건국',era:'BC 2세기경',desc:'만주 슑화강 유역에 세워진 한민족 고대 국가',detail:'부여는 BC 2세기경 만주 슑화강 유역에 건국된 고대 국가이다. 농업과 목축을 기반으로 하였으며 12월 영고 제천행사를 거행하였다.'},
{id:'e07',cat:'event',nm:'가야 연맹 성립',era:'AD 42년',desc:'김수로왕을 중심으로 6가야가 결성한 연맹 국가',detail:'42년, 구지가를 부르자 하늘에서 6개의 황금 알이 내려왔고, 금관가야를 맹주로 한 가야 연맹이 형성되었다. 562년 대가야 멸망으로 역사에서 사라졌다.'},
{id:'e08',cat:'event',nm:'고구려-수 전쟁',era:'AD 598~614년',desc:'수나라의 거듭된 침공을 고구려가 물리친 전쟁',detail:'598년부터 614년까지 수나라는 네 차례에 걸쳐 고구려를 침공하였다. 이 전쟁으로 수나라는 국력을 소진하여 멸망하였다.'},
{id:'a01',cat:'artifact',nm:'비파형동검',era:'BC 10~BC 4세기',desc:'고조선 특유의 청동검, 비파 모양의 칼날',detail:'비파형동검은 고조선과 만주 지역에서 출토되는 청동 단검으로, 칼날 중간에 돌기가 있어 악기 비파를 닮았다. 고조선 문화권의 대표적 유물이다.'},
{id:'a02',cat:'artifact',nm:'세형동검',era:'BC 4~BC 1세기',desc:'한반도 특유의 청동검, 날씨하고 섬세한 칼날',detail:'세형동검은 비파형동검에서 발전한 한반도 독자적인 청동 단검이다. 청동거울\xB7청동방울과 함께 의례용 도구로 사용되었다.'},
{id:'a03',cat:'artifact',nm:'고인돌(지석묘)',era:'BC 2000~BC 300년',desc:'청동기 시대 지배 계층의 무덤, 거석 문화의 산물',detail:'고인돌은 청동기 시대 지배 계층의 무뎄으로, 한국은 세계 고인돌의 약 40%가 밀집해 있다. 고창\xB7화순\xB7강화의 고인돌은 유네스코 세계문화유산이다.'},
{id:'a04',cat:'artifact',nm:'반달돌칼',era:'BC 1500~BC 300년',desc:'청동기 시대 수확 도구, 반달 모양의 석제 낫',detail:'반달돌칼은 청동기 시대에 곡식을 수확하는 데 사용한 돌로 만든 농기구이다. 농경 사회의 발전을 보여주는 중요한 유물이다.'},
{id:'a05',cat:'artifact',nm:'빗살무늬토기',era:'BC 6000~BC 1500년',desc:'신석기 시대 대표 토기, 빗살 모양의 문양이 특징',detail:'빗살무늬토기는 신석기 시대를 대표하는 토기로, 표면에 빗살 모양의 기하학적 문양이 새겨져 있다. 식료품 저장과 음식 조리에 사용되었다.'},
{id:'a06',cat:'artifact',nm:'민무늬토기',era:'BC 1500~BC 300년',desc:'청동기 시대 대표 토기, 문양 없는 실용적 토기',detail:'민무늬토기는 청동기 시대를 대표하는 토기로, 표면에 아무 문양이 없다. 무델의 고인돌이나 돌무지무뎄에서 함께 출토된다.'},
{id:'a07',cat:'artifact',nm:'미송리식토기',era:'BC 1500~BC 800년',desc:'고조선 문화권의 특징적 토기',detail:'미송리식토기는 평안북도 의주 미송리 동굴에서 처음 발견된 청동기 시대의 토기이다. 비파형동검\xB7고인돌과 함께 고조선 문화권 설정의 주요 기준이 된다.'},
{id:'l01',cat:'place',nm:'아사달',era:'BC 2333년~',desc:'단군왕검이 고조선을 건국한 최초의 수도',detail:'아사달은 단군왕검이 BC 2333년에 고조선을 건국하며 도읍으로 삼은 곳이다. 이름의 뜻은 "아침의 땅" 또는 "동쪽의 땅"으로 해석된다.'},
{id:'l02',cat:'place',nm:'신시',era:'신화시대',desc:'환웅이 하늘에서 내려와 건설한 신들의 도시',detail:'신시(神市)는 환웅이 무리 3,000명을 이끌고 태백산 신단수 아래에 세운 도시이다. 한국 문명의 발상지로 여겨진다.'},
{id:'l03',cat:'place',nm:'위례성',era:'BC 18년~AD 475년',desc:'백제의 초기 수도, 한강 유역의 전략 요충지',detail:'위례성은 온조왕이 BC 18년에 백제를 건국하며 도읍으로 삼은 곳이다. 현재 서울 송파구 풍납토성과 몽촌토성 일대로 비정된다.'},
{id:'l04',cat:'place',nm:'국내성',era:'AD 3~427년',desc:'고구려가 졸본에서 천도한 두 번째 수도',detail:'국내성은 고구려의 두 번째 수도로, 현재 중국 지린성 지안 일대이다. 광개토대왕릉비\xB7장군총 등 고구려 유적이 집중되어 있으며 유네스코 세계문화유산이다.'},
{id:'l05',cat:'place',nm:'금관가야',era:'AD 42~532년',desc:'가야 연맹의 맹주, 풍부한 철 자원으로 번성',detail:'금관가야는 김수로왕이 건국한 가야 연맹의 맹주로, 경남 김해 지역에 위치하였다. 풍부한 철 자원으로 번성하였다.'},
{id:'l06',cat:'place',nm:'부여(나라)',era:'BC 2세기~AD 494년',desc:'만주 슑화강 유역의 고대 한민족 국가',detail:'부여는 만주 슑화강 유역에 자리 잡은 고대 한민족 국가로, 고구려\xB7백제의 모태가 된 나라이다. 494년 고구려에 흡수되었다.'},
{id:'c01',cat:'culture',nm:'8조법금',era:'고조선 시대',desc:'고조선의 8가지 법률 조항, 한국 최초의 성문법',detail:'8조법금은 고조선의 법률 체계로, 살인자는 사형, 상해를 입힌 자는 곡물로 배상, 도둑은 노비로 삼는 등 세 조항만 전해진다. 한국 최초의 성문법이다.'},
{id:'c02',cat:'culture',nm:'제천행사',era:'삼한\xB7삼국 시대',desc:'하늘에 제사를 드리는 고대 한국의 축제',detail:'고대 한국에서는 하늘에 제사를 드리는 제천행사가 성대하게 열렸다. 부여 영고, 고구려 동맹, 동예 무천이 대표적이다.'},
{id:'c03',cat:'culture',nm:'소도',era:'삼한 시대',desc:'삼한의 신성 구역, 죄인도 잡을 수 없는 성역',detail:'소도(蘇涂)는 삼한 시대에 하늘에 제사를 지내는 신성한 구역으로, 천군이 관할하였다. 정치 지배자와 별도로 천군이 소도를 다스렸는데, 제정 분리를 보여준다.'},
{id:'c04',cat:'culture',nm:'서옥제',era:'고구려 시대',desc:'고구려의 혼인 풍습, 사위가 처가에서 사는 제도',detail:'서옥제는 고구려의 혼인 풍습으로, 결혼한 남자가 처가 뒷뜨에 작은 집(서옥)을 짓고 살다가 자녀가 장성하면 돌아가는 제도이다. 모계 중심 사회의 흔적이다.'},
{id:'c05',cat:'culture',nm:'순장',era:'부여\xB7삼국 시대',desc:'왕이나 귀족이 죽으면 신하나 종을 함께 뮻는 풍습',detail:'순장은 왕이나 귀족이 사망할 때 살아있는 사람을 함께 뮻는 풍습이다. 부여에서는 최대 100명까지 순장하였다고 기록되어 있다. 신라 502년 지증왕 때 금지되었다.'},
{id:'c06',cat:'culture',nm:'골장제(세골장)',era:'옥저 시대',desc:'옥저의 2차 장례 풍습, 뼈를 추려 가족 공동 목관에 안치',detail:'골장제는 옥저의 독특한 장례 풍습이다. 사람이 죽으면 가매장하였다가 뼈를 추려 가족 공동의 큰 목관에 안치하였다. 가족 공동체 의식과 조상 숭배 사상을 반영한다.'}
];

// =============================================
// SECTION 3: DAILY QUEST SYSTEM
// =============================================
var DQ_DEFS=[
{id:'dq_win',nm:'승리의 기운',desc:'전투에서 1번 승리하라',icon:'⚔️',target:1,xp:50,gold:30},
{id:'dq_quiz3',nm:'역사 박사',desc:'퀴즈를 3번 정답 맞혀라',icon:'📚',target:3,xp:60,gold:20},
{id:'dq_item5',nm:'아이템 수집가',desc:'아이템을 5번 사용하라',icon:'🎒',target:5,xp:40,gold:25},
{id:'dq_dmg100',nm:'파괴의 신',desc:'총 100 이상 피해를 입혀라',icon:'💥',target:100,xp:70,gold:40},
{id:'dq_heal50',nm:'치유의 손길',desc:'아군을 50 이상 회복시켜라',icon:'💊',target:50,xp:55,gold:35},
{id:'dq_fast',nm:'신속의 장군',desc:'10턴 이내로 승리하라',icon:'⚡',target:1,xp:80,gold:50},
{id:'dq_counter3',nm:'반격의 달인',desc:'반격을 3번 발동하라',icon:'🛡️',target:3,xp:65,gold:30}
];
var dSt={date:'',quests:[],progress:{}};
function todayStr(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function dateSeed(){var d=new Date();return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()}
function seedRand(s){var x=Math.sin(s+1)*10000;return x-Math.floor(x)}
function selectDQ(){var s=dateSeed(),pool=DQ_DEFS.slice(),out=[],r=s;while(out.length<3&&pool.length>0){r=Math.floor(seedRand(r)*10000);var idx=r%pool.length;out.push(pool.splice(idx,1)[0])}return out}
function loadDQ(){try{var raw=localStorage.getItem('krpg_daily');if(raw)dSt=JSON.parse(raw)}catch(e){}if(dSt.date!==todayStr()){dSt.date=todayStr();dSt.quests=selectDQ();dSt.progress={};saveDQ()}}
function saveDQ(){try{localStorage.setItem('krpg_daily',JSON.stringify(dSt))}catch(e){}}
function incDQ(qid,amt){if(!amt)amt=1;if(!dSt.quests)return;var ch=false;for(var i=0;i<dSt.quests.length;i++){var q=dSt.quests[i];if(q.id===qid){var p=dSt.progress[q.id]||0;if(p>=q.target)continue;dSt.progress[q.id]=Math.min(p+amt,q.target);ch=true;if(dSt.progress[q.id]>=q.target)onDQComplete(q)}}if(ch){saveDQ();renderDQ()}}
function onDQComplete(q){showV11Toast('일일 퀴스트 완료: '+q.nm+' (+'+q.xp+'XP, +'+q.gold+'골드)');sfxDailyComplete();triggerHaptic('success')}
function showV11Toast(msg){var t=document.getElementById('v11-toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},3000)}
function renderDQ(){var list=document.getElementById('dq-list');if(!list)return;list.innerHTML='';if(!dSt.quests)return;for(var i=0;i<dSt.quests.length;i++){var q=dSt.quests[i];var p=dSt.progress[q.id]||0;var done=p>=q.target;var pct=Math.min(100,Math.round(p/q.target*100));var card=document.createElement('div');card.className='dq-card'+(done?' done':'');card.innerHTML='<div class="dq-top"><span class="dq-icon">'+q.icon+'</span><span class="dq-nm">'+q.nm+(done?' ✓':'')+'</span><span class="dq-reward">+'+q.xp+'XP</span></div><div class="dq-desc">'+q.desc+'</div><div class="dq-bar-wrap"><div class="dq-bar" style="width:'+pct+'%"></div></div><div class="dq-prog-text">'+p+' / '+q.target+'</div>';list.appendChild(card)}}

// =============================================
// SECTION 4: COMBO SKILL SYSTEM
// =============================================
var COMBOS=[
{id:'combo_cheonji',nm:'천지개벽',parts:['환웅','웅녀'],eff:'전체 적에게 대규모 범위 피해. 기절 확률 30%.', dmg:200,type:'aoe'},
{id:'combo_gunguik',nm:'건국의 기운',parts:['단군','환웅'],eff:'아군 전체 HP 완전 회복 + 공격력 20% 증가.',dmg:0,type:'heal'},
{id:'combo_salsu',nm:'살수의 계략',parts:['을지문덕','강이식'],eff:'적 전체 방어력 -40%, 명중률 -30% 디버프 3턴.',dmg:80,type:'debuff'},
{id:'combo_ohaeng',nm:'오행진',parts:['주몽','을지문덕'],eff:'적 전체 중간 피해 + 2턴 기절 + 방어력 약화.',dmg:150,type:'stun'},
{id:'combo_samhan',nm:'삼한통합',parts:['주몽','온조','박혁거세'],eff:'아군 전체 공+30%, 방+30%, 치명타+20% 버프 5턴.',dmg:0,type:'buff'},
{id:'combo_cheonha',nm:'천하무적',parts:['주몽','고건무'],eff:'단일 적에게 강력한 피해 + 방어 무시.',dmg:350,type:'single'}
];
function getAvailCombos(names){if(!names)names=[];var r=[];for(var i=0;i<COMBOS.length;i++){var c=COMBOS[i],ok=true;for(var j=0;j<c.parts.length;j++){if(names.indexOf(c.parts[j])<0){ok=false;break}}r.push({def:c,available:ok})}return r}
function renderCombos(names){var list=document.getElementById('combo-list');if(!list)return;list.innerHTML='';var combos=getAvailCombos(names);for(var i=0;i<combos.length;i++){var item=combos[i],c=item.def;var card=document.createElement('div');card.className='combo-card'+(item.available?' available':'');card.innerHTML='<div class="combo-nm">'+c.nm+'</div><div class="combo-parts">참여: '+c.parts.join(' + ')+'</div><div class="combo-eff">'+c.eff+'</div><span class="combo-status">'+(item.available?'발동 가능':'조건 미충족')+'</span>';list.appendChild(card)}}

// =============================================
// SECTION 5: CHARACTER RELATIONSHIPS
// =============================================
var RELS=[
{from:'환인',to:'환웅',type:'family',desc:'부자 관계'},
{from:'환웅',to:'웅녀',type:'family',desc:'부부 관계'},
{from:'환웅',to:'단군',type:'family',desc:'부자 관계'},
{from:'주몽',to:'온조',type:'family',desc:'부자 관계'},
{from:'주몽',to:'고건무',type:'mentor',desc:'왕과 충신'},
{from:'을지문덕',to:'강이식',type:'ally',desc:'전우 관계'},
{from:'온조',to:'박혁거세',type:'rival',desc:'백제-신라 경쟁'},
{from:'주몽',to:'박혁거세',type:'rival',desc:'고구려-신라 경쟁'},
{from:'위만',to:'단군',type:'rival',desc:'찬탈자와 정통 왕'},
{from:'김수로',to:'온조',type:'ally',desc:'가야-백제 교류'},
{from:'박혁거세',to:'김수로',type:'ally',desc:'신라-가야 연대'},
{from:'환웅',to:'주몽',type:'mentor',desc:'하늘의 혈통 계승'},
{from:'주몽',to:'을지문덕',type:'mentor',desc:'건국 영웅의 후예'},
{from:'단군',to:'환웅',type:'mentor',desc:'사제지간'},
{from:'을지문덕',to:'주몽',type:'mentor',desc:'선조와 후손 영웅'}
];
var RTC={family:'#f5c842',ally:'#7ad4a4',mentor:'#7aa4d4',rival:'#d47a7a'};
var RTL={family:'가족',ally:'동맹',mentor:'사제',rival:'적대'};

function renderRels(){
var body=document.getElementById('rel-body');if(!body)return;body.innerHTML='';
var names=[];for(var i=0;i<RELS.length;i++){if(names.indexOf(RELS[i].from)<0)names.push(RELS[i].from);if(names.indexOf(RELS[i].to)<0)names.push(RELS[i].to)}
var W=560,H=340,cx=W/2,cy=H/2,R=140,np={};
for(var n=0;n<names.length;n++){var ang=(2*Math.PI*n/names.length)-Math.PI/2;np[names[n]]={x:cx+R*Math.cos(ang),y:cy+R*Math.sin(ang)}}
var svgW=document.createElement('div');svgW.id='rel-svg-wrap';
var s='<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:'+W+'px;">';
for(var l=0;l<RELS.length;l++){var r=RELS[l],p1=np[r.from],p2=np[r.to];if(!p1||!p2)continue;s+='<line x1="'+p1.x+'" y1="'+p1.y+'" x2="'+p2.x+'" y2="'+p2.y+'" stroke="'+RTC[r.type]+'" stroke-width="2" opacity="0.6"/>'}
for(var nn=0;nn<names.length;nn++){var p=np[names[nn]];s+='<g><circle cx="'+p.x+'" cy="'+p.y+'" r="18" fill="rgba(30,18,6,.9)" stroke="#5a3e1b" stroke-width="2"/><text x="'+p.x+'" y="'+p.y+'" font-size="10" fill="#e8dcc8" text-anchor="middle" dominant-baseline="central">'+names[nn]+'</text></g>'}
s+='</svg>';svgW.innerHTML=s;body.appendChild(svgW);
var ld=document.createElement('div');ld.id='rel-list';
for(var ri=0;ri<RELS.length;ri++){var rv=RELS[ri];var item=document.createElement('div');item.className='rel-item '+rv.type;item.innerHTML='<span class="rel-from">'+rv.from+'</span><span class="rel-arrow">'+(rv.type==='rival'?'⚔':'↔')+'</span><span class="rel-to">'+rv.to+'</span><span class="rel-rdesc">['+RTL[rv.type]+'] '+rv.desc+'</span>';ld.appendChild(item)}
body.appendChild(ld)}

// =============================================
// SECTION 6: QUIZ +15 QUESTIONS (40->55)
// =============================================
if(typeof QUIZZES!=='undefined'){
[{q:'광개토대왕이 정복한 지역이 아닌 것은?',a:['요동반도','한강 이남','숙신','후연'],c:1},
{q:'장수왕의 남하정책으로 백제가 천도한 곳은?',a:['사비','웅진','국내성','위례성'],c:1},
{q:'근초고왕 시기 백제가 정복한 북방 지역은?',a:['평양','국내성','황해도','요동'],c:0},
{q:'가야가 주변국에 주로 수출한 자원은?',a:['금','철','비단','쌀'],c:1},
{q:'고구려의 5부족 연맹 중 왕족이 속한 부는?',a:['동부','서부','계루부','연나부'],c:2},
{q:'백제 22부 관등제에서 최고 관등은?',a:['이벌찬','좌평','대아찬','각간'],c:1},
{q:'신라 골품제에서 왕족이 속한 품은?',a:['6두품','성골','5두품','진골'],c:1},
{q:'가야 악기 가야금을 만든 것으로 알려진 인물은?',a:['우륙','왕산악','옥보고','백결'],c:0},
{q:'고구려 최초의 교육기관은?',a:['국자감','태학','향교','서당'],c:1},
{q:'고구려에 불교를 전래한 국가는?',a:['당나라','신라','전진','백제'],c:2},
{q:'율령을 반포하여 국가체제를 정비한 신라의 왕은?',a:['진흥왕','법흥왕','내물왕','지증왕'],c:1},
{q:'대가야가 멸망한 연도는?',a:['532년','562년','612년','668년'],c:1},
{q:'신라의 청소년 조직으로 인재를 양성한 제도는?',a:['화랑도','정방','집사부','상대등'],c:0},
{q:'진흥왕이 영토 확장 후 세운 비석을 통칭하는 말은?',a:['순수비','척경비','공덕비','능비'],c:0},
{q:'삼국 중 한강 유역을 마지막으로 차지한 나라는?',a:['고구려','백제','신라','가야'],c:2}
].forEach(function(q){QUIZZES.push(q)})}

// =============================================
// SECTION 7: CHAPTER TIMELINE
// =============================================
var TL_CH=[
{label:'고조선 건국',era:'BC 2333',idx:0},
{label:'위만조선',era:'BC 194',idx:1},
{label:'삼한 시대',era:'BC 1세기',idx:2},
{label:'살수대첩',era:'AD 612',idx:3}
];
function renderTL(cur){
if(typeof cur==='undefined')cur=0;
var wrap=document.getElementById('chapter-timeline');if(!wrap)return;
var h='<h3>📅 역사 연대표</h3><div class="tl-wrap">';
for(var i=0;i<TL_CH.length;i++){
var c=TL_CH[i],dotCls=i<cur?'done':(i===cur?'current':''),lineCls=i<cur?'done':'';
if(i>0)h+='<div class="tl-line '+lineCls+'"></div>';
h+='<div class="tl-node"><div class="tl-dot '+dotCls+'"></div><div class="tl-label">'+c.label+'<span class="tl-era">'+c.era+'</span></div></div>'
}
h+='</div>';wrap.innerHTML=h}

// =============================================
// SECTION 8: SFX (Web Audio API)
// =============================================
var _ac11=null;
function getAC(){if(!_ac11){try{_ac11=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}return _ac11}
function pn11(freq,start,dur,vol,type,ctx){if(!ctx)return;try{var o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.type=type||'sine';o.frequency.setValueAtTime(freq,start);g.gain.setValueAtTime(vol||.18,start);g.gain.exponentialRampToValueAtTime(.001,start+dur);o.start(start);o.stop(start+dur+.05)}catch(e){}}
function sfxCombo(){var c=getAC();if(!c)return;var t=c.currentTime;[261.63,329.63,392,523.25,659.25].forEach(function(f,i){pn11(f,t+i*.09,.4,.22,'sawtooth',c)})}
function sfxEncOpen(){var c=getAC();if(!c)return;var t=c.currentTime;pn11(880,t,.5,.12,'sine',c);pn11(1174,t+.08,.4,.10,'sine',c);pn11(1318,t+.16,.6,.09,'sine',c)}
function sfxDailyComplete(){var c=getAC();if(!c)return;var t=c.currentTime;[523.25,659.25,783.99,1046.5].forEach(function(f,i){pn11(f,t+i*.12,.35,.2,'triangle',c)});pn11(1318.51,t+.5,.6,.15,'sine',c)}
function sfxRelView(){var c=getAC();if(!c)return;var t=c.currentTime;[220,277.18,329.63,440].forEach(function(f){pn11(f,t,2.0,.05,'sine',c)})}

// =============================================
// SECTION 9: HAPTIC FEEDBACK
// =============================================
function triggerHaptic(type){if(!navigator.vibrate)return;var p={light:10,medium:25,heavy:50,success:[10,30,10],combo:[10,20,10,20,50]};try{navigator.vibrate(p[type]||10)}catch(e){}}

// =============================================
// SECTION 10: KEYBOARD SHORTCUTS
// =============================================
function togglePanel(id,sfnOpen){var el=document.getElementById(id);if(!el)return;var isOpen=el.classList.contains('open');if(isOpen){el.classList.remove('open')}else{el.classList.add('open');if(sfnOpen)sfnOpen()}}
document.addEventListener('keydown',function(e){
if(e.target&&(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'))return;
var k=e.key.toUpperCase();
if(k==='E'){togglePanel('encyclopedia',function(){sfxEncOpen();renderEnc('','all')})}
else if(k==='Q'&&!e.ctrlKey){togglePanel('daily-quest');renderDQ()}
else if(k==='C'&&!e.ctrlKey){togglePanel('combo-info',function(){var p=[];if(typeof G!=='undefined'&&G.party)p=G.party.map(function(u){return u.nm});renderCombos(p)})}
else if(k==='R'&&!e.ctrlKey){togglePanel('relations',function(){renderRels();sfxRelView()})}
else if(k==='H'&&!e.ctrlKey){document.body.classList.toggle('high-contrast')}
});

// =============================================
// SECTION 11: DOM INJECTION
// =============================================
var curEncCat='all';

function renderEnc(q,cat){
var grid=document.getElementById('enc-grid');if(!grid)return;grid.innerHTML='';
var CL={person:'인물',event:'사건',artifact:'유물',place:'지역',culture:'문화'};
var sq=(q||'').toLowerCase();
for(var i=0;i<ENC.length;i++){
var e=ENC[i];
if(cat&&cat!=='all'&&e.cat!==cat)continue;
if(sq&&e.nm.toLowerCase().indexOf(sq)<0&&e.desc.toLowerCase().indexOf(sq)<0)continue;
var card=document.createElement('div');card.className='enc-card';card.setAttribute('data-cat',e.cat);
card.innerHTML='<div class="enc-nm">'+e.nm+'</div><div class="enc-era">'+e.era+'</div><div class="enc-desc">'+e.desc+'</div><span class="enc-cat-badge">'+(CL[e.cat]||e.cat)+'</span>';
(function(entry){card.addEventListener('click',function(){showEncDetail(entry)})})(e);
grid.appendChild(card)}}

function showEncDetail(entry){
var d=document.getElementById('enc-detail');if(!d)return;
document.getElementById('enc-d-nm').textContent=entry.nm;
document.getElementById('enc-d-era').textContent=entry.era;
document.getElementById('enc-d-detail').textContent=entry.detail;
d.classList.add('open')}

function injectDOM(){
if(!document.getElementById('v11-toast')){var t=document.createElement('div');t.id='v11-toast';t.className='v11-toast';document.body.appendChild(t)}

if(!document.getElementById('encyclopedia')){
var enc=document.createElement('div');enc.id='encyclopedia';
enc.innerHTML='<div id="enc-header"><h2>📖 역사 도감</h2><input type="text" class="enc-search" id="enc-search-input" placeholder="검색..."><button class="enc-close" id="enc-close-btn" aria-label="닫기">✕</button></div><div class="enc-cats"><button class="enc-cat-btn active" data-cat="all">전체</button><button class="enc-cat-btn" data-cat="person">인물</button><button class="enc-cat-btn" data-cat="event">사건</button><button class="enc-cat-btn" data-cat="artifact">유물</button><button class="enc-cat-btn" data-cat="place">지역</button><button class="enc-cat-btn" data-cat="culture">문화</button></div><div id="enc-grid"></div><div class="enc-detail" id="enc-detail"><div class="enc-detail-box"><h3 id="enc-d-nm"></h3><div class="enc-detail-era" id="enc-d-era"></div><p id="enc-d-detail"></p><button class="enc-detail-close" id="enc-detail-close">✕</button></div></div>';
document.body.appendChild(enc)}

if(!document.getElementById('daily-quest')){
var dq=document.createElement('div');dq.id='daily-quest';
dq.innerHTML='<div id="dq-header"><h3>📋 일일 퀴스트</h3><button class="enc-close" id="dq-close-btn">✕</button></div><div id="dq-list"></div>';
document.body.appendChild(dq)}

if(!document.getElementById('combo-info')){
var ci=document.createElement('div');ci.id='combo-info';
ci.innerHTML='<div id="combo-header"><h3>⚡ 연계 스킬</h3><button class="enc-close" id="combo-close-btn">✕</button></div><div id="combo-list"></div>';
document.body.appendChild(ci)}

if(!document.getElementById('relations')){
var rel=document.createElement('div');rel.id='relations';
rel.innerHTML='<div id="rel-header"><h2>🤝 인물 관계도</h2><button class="enc-close" id="rel-close-btn">✕</button></div><div id="rel-body"></div>';
document.body.appendChild(rel)}

if(!document.getElementById('chapter-timeline')){var tl=document.createElement('div');tl.id='chapter-timeline';document.body.appendChild(tl);renderTL(0)}

wireClose('enc-close-btn','encyclopedia');wireClose('enc-detail-close','enc-detail');wireClose('dq-close-btn','daily-quest');wireClose('combo-close-btn','combo-info');wireClose('rel-close-btn','relations');

var catBtns=document.querySelectorAll('.enc-cat-btn');
for(var cb=0;cb<catBtns.length;cb++){catBtns[cb].addEventListener('click',function(e){
curEncCat=e.currentTarget.getAttribute('data-cat');
var bs=document.querySelectorAll('.enc-cat-btn');for(var i=0;i<bs.length;i++)bs[i].classList.remove('active');
e.currentTarget.classList.add('active');
var sv='';var si=document.getElementById('enc-search-input');if(si)sv=si.value;
renderEnc(sv,curEncCat)})}

var si=document.getElementById('enc-search-input');
if(si){si.addEventListener('input',function(){renderEnc(this.value,curEncCat)})}

renderEnc('','all')}

function wireClose(btnId,panelId){var b=document.getElementById(btnId),p=document.getElementById(panelId);if(b&&p)b.addEventListener('click',function(){p.classList.remove('open')})}

// =============================================
// SECTION 12: MENU HOOKS
// =============================================
function injectMenuBtns(){
var menu=document.getElementById('menu-overlay');if(!menu)return;
if(document.getElementById('v11-menu-btns'))return;
var wrap=document.createElement('div');wrap.id='v11-menu-btns';wrap.style.cssText='display:flex;flex-direction:column;gap:8px;margin-top:12px;';
var defs=[
{label:'📖 역사 도감',fn:function(){sfxEncOpen();togglePanel('encyclopedia');renderEnc('',curEncCat)}},
{label:'📋 일일 퀴스트',fn:function(){togglePanel('daily-quest');renderDQ()}},
{label:'🤝 인물 관계도',fn:function(){sfxRelView();togglePanel('relations');renderRels()}}
];
for(var b=0;b<defs.length;b++){
var btn=document.createElement('button');btn.className='v10-btn';btn.textContent=defs[b].label;
(function(fn){btn.addEventListener('click',fn)})(defs[b].fn);
wrap.appendChild(btn)}

var tlDiv=document.createElement('div');tlDiv.id='chapter-timeline';tlDiv.style.marginTop='14px';
wrap.appendChild(tlDiv);
var cls=menu.querySelectorAll('.menu-btn,.v10-btn');var last=cls[cls.length-1];
if(last&&last.parentNode===menu){menu.insertBefore(wrap,last)}else{menu.appendChild(wrap)}
renderTL(0)}

function hookVictory(){
if(typeof window.onVictoryContinue==='function'){
var _vc=window.onVictoryContinue;
window.onVictoryContinue=function(){incDQ('dq_win',1);incDQ('dq_fast',1);triggerHaptic('success');_vc.apply(this,arguments)}}}

function hookQuiz(){
if(typeof window.answerQuiz==='function'){
var _aq=window.answerQuiz;
window.answerQuiz=function(i){
try{var q=(typeof G!=='undefined'&&G._quizSet)?G._quizSet[typeof quizIdx!=='undefined'?quizIdx:0]:null;if(q&&i===q.c){incDQ('dq_quiz3',1);triggerHaptic('light')}}catch(e){}
_aq.apply(this,arguments)}}}

setInterval(function(){var today=todayStr();if(dSt.date&&dSt.date!==today){loadDQ();renderDQ()}},30000);

// =============================================
// SECTION 13: EXPORTS
// =============================================
window._v11={
encyclopediaData:ENC,dailyQuestState:dSt,comboDefs:COMBOS,relations:RELS,
renderEncyclopedia:renderEnc,renderDailyQuest:renderDQ,renderRelations:renderRels,
renderTimeline:renderTL,triggerHaptic:triggerHaptic,getAvailableCombos:getAvailCombos,
incrementDailyProgress:incDQ,
sfx:{comboAttack:sfxCombo,encyclopediaOpen:sfxEncOpen,dailyComplete:sfxDailyComplete,relationshipView:sfxRelView}
};

// =============================================
// INIT
// =============================================
function init(){loadDQ();injectDOM();injectMenuBtns();hookVictory();hookQuiz();
if(window._v10&&typeof window._v10.currentChapter!=='undefined'){renderTL(window._v10.currentChapter)}}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init)}else{init()}

})();
