// v11_patch.js — 한국사 영웅전 v11.0 Enhancement Patch
// History Encyclopedia + Character Compendium + Timeline + Daily Challenge + Strategy Guide + Quiz + SFX
(function(){
'use strict';

// =============================================
// SECTION 1: CSS INJECTION
// =============================================
var css=document.createElement('style');
css.textContent=[
'#v11-encyclopedia{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:120;overflow-y:auto;padding:16px}',
'#v11-encyclopedia.on{display:block}',
'#v11-encyclopedia h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.enc-tabs{display:flex;gap:4px;justify-content:center;margin-bottom:12px;flex-wrap:wrap}',
'.enc-tab{padding:6px 14px;border:1px solid #5a3a1a;border-radius:6px;background:#1a1428;color:#e8dcc8;font-family:inherit;font-size:11px;cursor:pointer;font-weight:700}',
'.enc-tab.active{background:#3a2a48;border-color:#c4956a;color:#FFD700}',
'.enc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;max-width:700px;margin:0 auto}',
'.enc-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:12px;cursor:pointer;transition:all .3s}',
'.enc-card:hover{border-color:#c4956a;background:rgba(42,36,56,.9)}',
'.enc-card .enc-icon{font-size:24px;float:left;margin-right:8px}',
'.enc-card .enc-title{font-size:12px;font-weight:700;color:#FFD700;margin-bottom:2px}',
'.enc-card .enc-desc{font-size:10px;color:#8a7a6a;line-height:1.6}',
'.enc-detail{display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(180deg,#2a1a3a,#1a1428);border:2px solid #c4956a;border-radius:12px;padding:20px;z-index:130;max-width:420px;width:90%;max-height:80vh;overflow-y:auto}',
'.enc-detail.on{display:block}',
'.enc-detail h3{color:#FFD700;font-size:16px;margin-bottom:8px;text-align:center}',
'.enc-detail .enc-body{font-size:12px;color:#e8dcc8;line-height:2}',
'.enc-detail .enc-meta{font-size:10px;color:#8a7a6a;margin-top:8px;padding-top:8px;border-top:1px solid #3a3a4a}',

'#v11-charbook{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:120;overflow-y:auto;padding:16px}',
'#v11-charbook.on{display:block}',
'#v11-charbook h2{color:#c4956a;text-align:center;margin-bottom:12px;font-size:18px;letter-spacing:2px}',
'.cb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;max-width:600px;margin:0 auto}',
'.cb-card{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:10px;text-align:center;cursor:pointer;transition:all .3s}',
'.cb-card:hover{border-color:#FFD700;transform:translateY(-2px)}',
'.cb-card .cb-port{font-size:32px;margin-bottom:4px}',
'.cb-card .cb-name{font-size:12px;font-weight:700;color:#FFD700}',
'.cb-card .cb-class{font-size:9px;color:#8a7a6a}',
'.cb-card .cb-lore{font-size:9px;color:#6a5a4a;margin-top:4px;line-height:1.4}',

'#v11-timeline{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:120;overflow-y:auto;padding:16px}',
'#v11-timeline.on{display:block}',
'#v11-timeline h2{color:#c4956a;text-align:center;margin-bottom:12px;font-size:18px;letter-spacing:2px}',
'.tl-container{max-width:500px;margin:0 auto;position:relative;padding-left:40px}',
'.tl-line{position:absolute;left:18px;top:0;bottom:0;width:2px;background:linear-gradient(180deg,#FFD700,#c4956a,#8a6a3a)}',
'.tl-item{position:relative;margin-bottom:16px;padding-left:20px}',
'.tl-dot{position:absolute;left:-28px;top:4px;width:12px;height:12px;border-radius:50%;border:2px solid #FFD700;background:#1a1428}',
'.tl-dot.major{background:#FFD700;width:14px;height:14px;left:-29px}',
'.tl-year{font-size:11px;font-weight:700;color:#FFD700;margin-bottom:2px}',
'.tl-event{font-size:11px;color:#e8dcc8;line-height:1.6}',
'.tl-detail{font-size:9px;color:#8a7a6a;margin-top:2px;line-height:1.5}',

'#v11-daily{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:120;overflow-y:auto;padding:16px}',
'#v11-daily.on{display:block}',
'#v11-daily h2{color:#c4956a;text-align:center;margin-bottom:8px;font-size:18px;letter-spacing:2px}',
'.daily-card{background:rgba(26,20,40,.9);border:1px solid #c4956a;border-radius:12px;padding:16px;max-width:400px;margin:12px auto;text-align:center}',
'.daily-card h3{color:#FFD700;font-size:16px;margin-bottom:8px}',
'.daily-card .daily-desc{font-size:12px;color:#e8dcc8;line-height:1.8;margin-bottom:12px}',
'.daily-reward{font-size:11px;color:#8a7a6a;margin-top:8px}',
'.daily-reward b{color:#FFD700}',
'.daily-btn{padding:10px 24px;border:1px solid #5a3a1a;border-radius:6px;background:#6B1A0A;color:#e8dcc8;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer}',
'.daily-btn:disabled{opacity:.4;cursor:not-allowed}',
'.daily-streak{font-size:10px;color:#c4956a;margin-top:8px}',

'#v11-guide{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,6,8,.97);z-index:120;overflow-y:auto;padding:16px}',
'#v11-guide.on{display:block}',
'#v11-guide h2{color:#c4956a;text-align:center;margin-bottom:12px;font-size:18px;letter-spacing:2px}',
'.guide-section{background:rgba(26,20,40,.9);border:1px solid #3a3a4a;border-radius:8px;padding:12px;max-width:500px;margin:8px auto}',
'.guide-section h3{color:#FFD700;font-size:14px;margin-bottom:8px}',
'.guide-section p{font-size:11px;color:#e8dcc8;line-height:1.8;margin-bottom:6px}',
'.guide-table{width:100%;border-collapse:collapse;margin:8px 0}',
'.guide-table th{font-size:10px;color:#c4956a;text-align:left;padding:4px 6px;border-bottom:1px solid #3a3a4a}',
'.guide-table td{font-size:10px;color:#e8dcc8;padding:4px 6px;border-bottom:1px solid #2a2438}',
'.guide-tip{font-size:10px;color:#88aa88;padding:6px;background:rgba(42,90,42,.15);border:1px solid rgba(42,90,42,.3);border-radius:6px;margin:6px 0}',

'.v11-close{display:block;margin:16px auto 0;padding:10px 32px;border:1px solid #5a3a1a;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;color:#e8dcc8;background:#6B1A0A;cursor:pointer}',
'.v11-close:hover{background:#8B2A1A}',
'.v11-overlay-bg{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);z-index:125}',
'.v11-overlay-bg.on{display:block}'
].join('\n');
document.head.appendChild(css);

// =============================================
// SECTION 2: HISTORY ENCYCLOPEDIA DATA (30 entries)
// =============================================
var ENC_DATA=[
{cat:'인물',ic:'👑',nm:'환웅',body:'환인천제의 서자로, 천부인 3개를 가지고 풍백·우사·운사와 함께 태백산에 내려왔다. 신시를 세우고 곡식·생명·질병·형벌·선악 등 360여 가지 일을 주관하며 인간을 다스렸다. 웅녀와 결혼하여 단군왕검을 낳았다.',era:'BC 2400년경',src:'삼국유사, 제왕운기'},
{cat:'인물',ic:'🏛️',nm:'단군왕검',body:'환웅과 웅녀 사이에서 태어난 고조선의 시조. BC 2333년 아사달에 도읍하여 고조선을 건국하였다. 팔조법금을 제정하고 1,500년간 나라를 다스린 후 산신이 되었다고 전해진다.',era:'BC 2333년',src:'삼국유사, 동국통감'},
{cat:'인물',ic:'🏯',nm:'위만',body:'연나라 출신으로 BC 194년 무리 1000여 명을 이끌고 고조선에 망명하였다. 준왕의 신임을 받아 서쪽 변경을 지키다가 반란을 일으켜 왕위를 찬탈하고 위만조선을 세웠다. 철기 문화를 바탕으로 중계무역을 독점하였다.',era:'BC 194년',src:'사기 조선열전'},
{cat:'인물',ic:'👴',nm:'환인',body:'천제(天帝)로 하늘나라를 다스리는 최고신. 아들 환웅이 인간 세상에 뜻을 두는 것을 보고 삼위태백을 내려다보며 홍익인간할 만하다 판단, 천부인 3개를 내려 인간 세상에 보냈다.',era:'신화시대',src:'삼국유사'},
{cat:'인물',ic:'🌸',nm:'웅녀',body:'곰이 환웅에게 인간이 되기를 빌어, 쑥과 마늘만 먹으며 21일 동안 동굴에서 견딘 끝에 여인이 되었다. 환웅과 결혼하여 단군왕검을 낳았다. 호랑이는 견디지 못하고 뛰쳐나갔다.',era:'신화시대',src:'삼국유사'},
{cat:'인물',ic:'⚔️',nm:'성기장군',body:'위만조선 말기 왕검성을 지킨 충신 장군. 한나라 대군에 맞서 끝까지 항전하였으나 내부 분열로 인해 패배하였다. 고조선 멸망의 비극적 인물.',era:'BC 108년',src:'사기 조선열전'},
{cat:'인물',ic:'🌬️',nm:'풍백',body:'바람을 관장하는 신. 환웅이 인간 세상에 내려올 때 함께한 3신 중 하나. 농경에 필요한 바람을 다스려 곡식의 풍요를 관장하였다.',era:'신화시대',src:'삼국유사'},
{cat:'인물',ic:'🌧️',nm:'우사',body:'비를 관장하는 신. 환웅과 함께 내려와 비와 물을 다스렸다. 농경 사회에서 가장 중요한 수확을 좌우하는 역할을 담당하였다.',era:'신화시대',src:'삼국유사'},

{cat:'유물',ic:'🗡️',nm:'비파형동검',body:'고조선의 대표적인 청동기 유물. 칼날의 형태가 비파(악기) 모양을 닮아 비파형동검이라 부른다. 만주와 한반도 북부에서 주로 출토되며, 고조선의 세력 범위를 추정하는 중요한 자료이다.',era:'BC 15~BC 4세기',src:'고고학 발굴 자료'},
{cat:'유물',ic:'⚔️',nm:'세형동검',body:'비파형동검이 발전된 형태로, 한반도에서 독자적으로 발전하였다. 칼날이 더 가늘고 직선적이며, 한국식 동검이라고도 부른다. 고조선 후기의 독자적 청동기 문화를 보여준다.',era:'BC 4~BC 1세기',src:'고고학 발굴 자료'},
{cat:'유물',ic:'🪙',nm:'천부인',body:'환인이 환웅에게 내린 3개의 신물. 거울(경), 방울(령), 칼(검) 등으로 해석되며, 정치·종교·군사의 권위를 상징한다. 청동기 시대 제정일치 사회의 통치 도구를 반영한다.',era:'신화시대',src:'삼국유사'},
{cat:'유물',ic:'🪨',nm:'고인돌',body:'청동기 시대의 대표적 무덤 형태. 한반도에 세계 고인돌의 약 40%가 집중 분포해 있다. 지배층의 무덤으로 추정되며 당시의 계급사회 형성을 보여주는 중요한 유적이다.',era:'BC 2000~BC 300년',src:'UNESCO 세계유산'},
{cat:'유물',ic:'🏺',nm:'미송리식토기',body:'고조선 지역에서 출토되는 독특한 토기. 팽이 모양의 바닥이 특징이며, 고조선의 문화권을 파악하는 데 중요한 유물이다.',era:'BC 10~BC 4세기',src:'고고학 발굴 자료'},

{cat:'사건',ic:'📜',nm:'고조선 건국',body:'BC 2333년, 단군왕검이 아사달(현재의 평양 또는 요동 지역)에 도읍하여 고조선을 건국하였다. 한국 역사에서 최초의 국가로, 개천절(10월 3일)의 기원이 되는 사건이다.',era:'BC 2333년',src:'삼국유사, 동국통감'},
{cat:'사건',ic:'⚖️',nm:'팔조법금 제정',body:'고조선의 법률로 원래 8개 조항이었으나 현재 3개만 전해진다. &quot;사람을 죽이면 사형&quot;, &quot;상해를 입히면 곡물로 배상&quot;, &quot;도둑질하면 노비가 되거나 50만 전 배상&quot;. 당시의 사회 질서와 사유재산 인정을 보여준다.',era:'BC 2333년경',src:'한서 지리지'},
{cat:'사건',ic:'🏗️',nm:'신시 건설',body:'환웅이 태백산(현재 백두산 또는 묘향산)에 내려와 세운 최초의 도시. 곡식, 생명, 질병, 형벌, 선악 등 인간의 360여 가지 일을 주관하는 통치 중심지였다.',era:'BC 2400년경',src:'삼국유사'},
{cat:'사건',ic:'⚔️',nm:'왕검성 전투',body:'BC 109~108년 한 무제가 육군 5만 + 수군 7천을 보내 고조선을 침공. 왕검성에서 1년간 항전하였으나 내부 반란으로 우거왕이 살해되고 고조선이 멸망하였다.',era:'BC 109~108년',src:'사기 조선열전'},
{cat:'사건',ic:'🔥',nm:'위만의 정변',body:'BC 194년 연나라 출신 위만이 고조선 준왕의 신임을 이용해 반란을 일으키고 왕위를 찬탈. 준왕은 남으로 도망하여 마한왕이 되었다고 전해진다.',era:'BC 194년',src:'사기 조선열전'},
{cat:'사건',ic:'🌾',nm:'부여 건국',body:'고조선 멸망 전후로 만주 쑹화강 유역에서 건국된 국가. 왕을 중심으로 마가·우가·저가·구가의 4부족 연맹체제로 운영되었다. 영고라는 제천행사를 지냈다.',era:'BC 2세기경',src:'삼국지 위서 동이전'},
{cat:'사건',ic:'🗿',nm:'삼한 성립',body:'고조선 멸망 후 한반도 중남부에 형성된 마한·진한·변한의 세 집단. 각각 54국·12국·12국으로 구성되었으며, 후에 백제·신라·가야로 발전하였다.',era:'BC 1세기경',src:'삼국지 위서 동이전'},

{cat:'문화',ic:'🙏',nm:'제천행사',body:'하늘에 제사를 지내는 행사. 부여의 영고(12월), 고구려의 동맹(10월), 동예의 무천(10월)이 대표적이다. 농경의 풍요를 기원하고, 공동체의 결속을 다지는 역할을 하였다.',era:'BC 3~AD 3세기',src:'삼국지 위서 동이전'},
{cat:'문화',ic:'⛩️',nm:'소도',body:'삼한에서 천군이 다스리는 신성한 구역. 큰 나무를 세우고 방울과 북을 매달았다. 죄인이 이곳에 도망쳐도 잡아갈 수 없었으며, 제정분리 사회의 특징을 보여준다.',era:'BC 1~AD 3세기',src:'삼국지 위서 동이전'},
{cat:'문화',ic:'💀',nm:'순장',body:'부여에서 왕이 죽으면 시종을 함께 묻는 풍습. 최대 100명까지 순장했다고 전해진다. 고대 왕권의 절대성과 내세관을 보여주는 장제 풍습이다.',era:'BC 2~AD 3세기',src:'삼국지 위서 동이전'},
{cat:'문화',ic:'🏡',nm:'골장제',body:'옥저의 독특한 장례 풍습. 죽은 사람을 임시로 매장한 뒤 뼈만 추려 가족 공동의 큰 목곽에 안치하였다. 가족 중심의 공동체 의식을 보여준다.',era:'BC 1~AD 3세기',src:'삼국지 위서 동이전'},
{cat:'문화',ic:'💍',nm:'민며느리혼',body:'옥저의 혼인 풍습. 어린 소녀를 남자 집에 데려가 키운 후 성인이 되면 혼인하는 제도. 여성의 노동력 확보와 가부장 사회의 특성을 보여준다.',era:'BC 1~AD 3세기',src:'삼국지 위서 동이전'},
{cat:'문화',ic:'🚫',nm:'책화',body:'동예의 법률. 다른 부족의 영역을 침범하면 소·말·노비로 배상해야 하는 제도. 씨족 사회의 폐쇄성과 영역 의식을 보여주며 &quot;책화&quot;(責禍)라 불렸다.',era:'BC 1~AD 3세기',src:'삼국지 위서 동이전'},
{cat:'문화',ic:'🐴',nm:'과하마',body:'동예의 특산물 중 하나인 작은 말. 키가 작아 과일나무 아래(果下)를 지날 수 있다고 하여 과하마라 불렸다. 동예의 산간 지형에 적합한 품종이었다.',era:'BC 1~AD 3세기',src:'삼국지 위서 동이전'},
{cat:'문화',ic:'🎣',nm:'반어피',body:'동예의 특산물로, 바다표범(물개)의 가죽. 방한용으로 중국에까지 수출되었으며, 동해안의 풍부한 해양 자원을 보여준다.',era:'BC 1~AD 3세기',src:'삼국지 위서 동이전'},
{cat:'문화',ic:'🏹',nm:'단궁',body:'동예의 특산물인 짧은 활. 산간 지형에서 기동성이 좋아 사냥과 전투에 유용하였다. 맥궁(貊弓)이라고도 불렸다.',era:'BC 1~AD 3세기',src:'삼국지 위서 동이전'},
{cat:'문화',ic:'⚒️',nm:'철기문화',body:'BC 4세기경부터 한반도에 전래된 철기 문화. 중국 전국시대 연나라를 통해 유입되었으며, 농기구와 무기 제작에 혁신을 가져왔다. 위만조선은 철기를 바탕으로 강성해졌다.',era:'BC 4세기~',src:'고고학 발굴 자료'}
];

// =============================================
// SECTION 3: CHARACTER COMPENDIUM DATA
// =============================================
var CHAR_DATA=[
{nm:'환웅',port:'👑',cl:'신장',lore:'환인의 아들. 3000명을 이끌고 태백산에 내려와 신시를 세웠다. 풍백·우사·운사를 거느리고 인간 세계를 다스린다.',tier:'SSR',ch:1},
{nm:'풍백',port:'🌬️',cl:'풍백',lore:'바람의 신. 환웅의 신하로 농경에 필요한 바람을 관장한다. 범위 공격과 회피 버프에 능하다.',tier:'SR',ch:1},
{nm:'우사',port:'🌧️',cl:'우사',lore:'비의 신. 비와 물을 다스려 농경의 풍요를 관장한다. 범위 회복과 속도 감소 기술을 사용한다.',tier:'SR',ch:1},
{nm:'운사',port:'☁️',cl:'운사',lore:'구름의 신. 뇌운을 다루며 강력한 단일 공격과 디버프에 능하다. 안개로 적의 명중률을 낮춘다.',tier:'SR',ch:1},
{nm:'웅녀',port:'🌸',cl:'웅녀',lore:'곰에서 인간이 된 여인. 21일의 시련을 견뎌 환웅의 배필이 되었다. 강력한 회복과 부활 기술을 보유.',tier:'SSR',ch:1},
{nm:'단군왕검',port:'🏛️',cl:'단군',lore:'고조선의 시조. 환웅과 웅녀의 아들. 홍익인간의 이념으로 나라를 세웠다. 전체 회복과 범위 버프의 달인.',tier:'SSR',ch:2},
{nm:'궁병',port:'🏹',cl:'궁병',lore:'고조선의 기본 원거리 유닛. 활을 사용하여 먼 거리에서 적을 공격한다. 명궁, 신궁으로 승급 가능.',tier:'R',ch:1},
{nm:'보병',port:'⚔️',cl:'보병',lore:'고조선의 기본 근거리 유닛. 검과 방패로 무장하여 공격과 방어를 겸비한다. 중보병, 근위병으로 승급.',tier:'R',ch:1},
{nm:'기마병',port:'🐴',cl:'기마병',lore:'기동력이 뛰어난 유닛. 돌격으로 적을 기절시키고 높은 이동력으로 전장을 누빈다. 돌기병, 철기병으로 승급.',tier:'R',ch:1},
{nm:'성기장군',port:'⚔️',cl:'신하장군',lore:'위만조선의 충신. 왕검성을 끝까지 지킨 비운의 장수. 돌격과 호령 기술로 아군을 이끈다.',tier:'SR',ch:3},
{nm:'부여왕',port:'👑',cl:'부여왕',lore:'부여의 건국자. 천제의 후손을 자처하며 4부족을 통합하였다. 범위 회복과 건국의 의지로 강력한 지원.',tier:'SSR',ch:4},
{nm:'삼한족장',port:'🗿',cl:'삼한족장',lore:'삼한의 지도자. 소도의 힘으로 범위 버프를 걸고 철기 일격으로 강력한 공격을 가한다.',tier:'SR',ch:4}
];

// =============================================
// SECTION 4: TIMELINE DATA
// =============================================
var TIMELINE=[
{yr:'BC 2400년경',ev:'환웅의 하강',dt:'환인의 아들 환웅이 천부인 3개를 가지고 태백산에 내려와 신시를 건설.',major:true},
{yr:'BC 2333년',ev:'고조선 건국',dt:'단군왕검이 아사달에 도읍하여 우리 역사 최초의 국가 고조선을 건국. 개천절의 기원.',major:true},
{yr:'BC 2000년경',ev:'청동기 시대 시작',dt:'한반도에 청동기 문화가 전래. 비파형동검, 고인돌 등이 제작됨.',major:false},
{yr:'BC 1500년경',ev:'팔조법금 제정',dt:'고조선의 법률 체계 정비. 사유재산 인정, 생명 존중 사상 반영.',major:false},
{yr:'BC 1000년경',ev:'고조선 영토 확장',dt:'요동~한반도 북부에 걸친 넓은 영토를 지배. 중국 문헌에 조선 기록 등장.',major:false},
{yr:'BC 400년경',ev:'철기문화 전래',dt:'연나라를 통해 철기가 전래. 농업 생산력 증가, 군사력 강화.',major:true},
{yr:'BC 300년경',ev:'세형동검 발전',dt:'비파형동검이 독자적으로 발전하여 한국식 동검(세형동검)이 등장.',major:false},
{yr:'BC 194년',ev:'위만의 정변',dt:'연나라 출신 위만이 준왕을 몰아내고 위만조선을 건국. 철기문화 기반 중계무역 독점.',major:true},
{yr:'BC 128년',ev:'예군남려 항복',dt:'예군 남려가 한나라에 귀순. 창해군 설치 시도 → 실패.',major:false},
{yr:'BC 109년',ev:'한 무제의 침공',dt:'한 무제가 육군 5만 + 수군 7천으로 고조선 침공 시작. 왕검성 포위.',major:true},
{yr:'BC 108년',ev:'고조선 멸망',dt:'내부 분열로 우거왕 피살, 왕검성 함락. 한사군(낙랑·진번·임둔·현도) 설치.',major:true},
{yr:'BC 2세기경',ev:'부여 건국',dt:'만주 쑹화강 유역에서 부여 건국. 4가 체제(마가·우가·저가·구가)로 운영.',major:true},
{yr:'BC 1세기경',ev:'삼한 성립',dt:'한반도 중남부에 마한(54국)·진한(12국)·변한(12국) 형성.',major:true},
{yr:'BC 57년',ev:'신라 건국',dt:'박혁거세가 6촌장의 추대로 사로국(신라) 건국.',major:false},
{yr:'BC 37년',ev:'고구려 건국',dt:'주몽이 부여에서 탈출하여 졸본에 고구려 건국.',major:false},
{yr:'BC 18년',ev:'백제 건국',dt:'온조왕이 위례성에 백제 건국. 주몽의 아들.',major:false},
{yr:'AD 42년',ev:'가야 건국',dt:'김수로왕이 금관가야 건국. 변한에서 발전.',major:false}
];

// =============================================
// SECTION 5: DAILY CHALLENGE SYSTEM
// =============================================
var DAILY_CHALLENGES=[
{nm:'역사 학자의 시험',desc:'오늘의 역사 퀴즈 5문제에 도전하세요. 4문제 이상 맞추면 보상!',type:'quiz',count:5,reward:{xp:50,gold:100}},
{nm:'고조선의 수호자',desc:'제한 시간 내에 적을 모두 처치하세요. 빠른 승리가 관건!',type:'speed',reward:{xp:80,gold:150}},
{nm:'지혜의 탐구',desc:'역사 도감에서 10개 항목을 열람하고 지식을 쌓으세요.',type:'explore',count:10,reward:{xp:30,gold:50}},
{nm:'전략가의 도전',desc:'병종 상성을 활용하여 효율적으로 전투에서 승리하세요.',type:'strategy',reward:{xp:60,gold:120}},
{nm:'수집가의 길',desc:'전투에서 아이템 3개 이상을 획득하세요.',type:'collect',count:3,reward:{xp:40,gold:80}},
{nm:'불굴의 전사',desc:'파티원이 한 명도 쓰러지지 않고 전투에서 승리하세요.',type:'perfect',reward:{xp:100,gold:200}},
{nm:'연대기 여행',desc:'역사 연표의 모든 사건을 순서대로 확인하세요.',type:'timeline',reward:{xp:25,gold:40}},
{nm:'현자의 깨달음',desc:'퀴즈에서 3연속 정답을 달성하세요.',type:'streak',count:3,reward:{xp:70,gold:130}},
{nm:'탐험가의 발자취',desc:'마을 탐험에서 모든 NPC와 대화하세요.',type:'talk',reward:{xp:45,gold:90}},
{nm:'무쌍의 전사',desc:'한 전투에서 치명타를 5회 이상 달성하세요.',type:'crit',count:5,reward:{xp:90,gold:180}},
{nm:'절약의 달인',desc:'아이템을 사용하지 않고 전투에서 승리하세요.',type:'noitem',reward:{xp:75,gold:140}},
{nm:'풍요의 계절',desc:'상점에서 장비를 3개 이상 구매하세요.',type:'shop',count:3,reward:{xp:35,gold:60}},
{nm:'완벽한 지식',desc:'퀴즈 3문제를 모두 정답으로 맞추세요 (만점).',type:'perfect_quiz',reward:{xp:85,gold:170}},
{nm:'속전속결',desc:'5턴 이내에 전투에서 승리하세요.',type:'fast_win',reward:{xp:95,gold:190}}
];

function getDailyChallenge(){
var d=new Date();
var seed=d.getFullYear()*10000+((d.getMonth()+1)*100)+d.getDate();
return DAILY_CHALLENGES[seed%DAILY_CHALLENGES.length];
}

function getDailyState(){
try{return JSON.parse(localStorage.getItem('krpg_daily'))||{}}catch(e){return{}}
}

function saveDailyState(s){localStorage.setItem('krpg_daily',JSON.stringify(s))}

function isDailyCompleted(){
var s=getDailyState();
var today=new Date().toISOString().slice(0,10);
return s.lastDate===today&&s.completed;
}

function completeDailyChallenge(){
var ch=getDailyChallenge();
var s=getDailyState();
var today=new Date().toISOString().slice(0,10);
if(s.lastDate===today&&s.completed)return;
s.lastDate=today;
s.completed=true;
s.streak=(s.streakDate===yesterday()?s.streak||0:0)+1;
s.streakDate=today;
s.totalCompleted=(s.totalCompleted||0)+1;
saveDailyState(s);
if(typeof sfx==='function')sfx('daily_complete');
if(typeof window._v10!=='undefined'){
var st=window._v10.stats;
st.quizOk=(st.quizOk||0)+ch.reward.xp;
}
}

function yesterday(){var d=new Date();d.setDate(d.getDate()-1);return d.toISOString().slice(0,10)}

// =============================================
// SECTION 6: DOM INJECTION
// =============================================
// Encyclopedia
var encEl=document.createElement('div');encEl.id='v11-encyclopedia';
encEl.setAttribute('role','dialog');encEl.setAttribute('aria-label','역사 도감');
document.body.appendChild(encEl);

// Detail overlay
var encBg=document.createElement('div');encBg.className='v11-overlay-bg';encBg.id='v11-enc-bg';
encBg.onclick=function(){encBg.classList.remove('on');document.querySelector('.enc-detail.on')&&document.querySelector('.enc-detail.on').classList.remove('on')};
document.body.appendChild(encBg);

var encDt=document.createElement('div');encDt.className='enc-detail';encDt.id='v11-enc-detail';
document.body.appendChild(encDt);

// Character book
var cbEl=document.createElement('div');cbEl.id='v11-charbook';
cbEl.setAttribute('role','dialog');cbEl.setAttribute('aria-label','캐릭터 도감');
document.body.appendChild(cbEl);

// Timeline
var tlEl=document.createElement('div');tlEl.id='v11-timeline';
tlEl.setAttribute('role','dialog');tlEl.setAttribute('aria-label','역사 연표');
document.body.appendChild(tlEl);

// Daily challenge
var dcEl=document.createElement('div');dcEl.id='v11-daily';
dcEl.setAttribute('role','dialog');dcEl.setAttribute('aria-label','일일 도전');
document.body.appendChild(dcEl);

// Guide
var gdEl=document.createElement('div');gdEl.id='v11-guide';
gdEl.setAttribute('role','dialog');gdEl.setAttribute('aria-label','전략 가이드');
document.body.appendChild(gdEl);

// =============================================
// SECTION 7: RENDER FUNCTIONS
// =============================================
function renderEncyclopedia(cat){
var curCat=cat||'전체';
var items=curCat==='전체'?ENC_DATA:ENC_DATA.filter(function(e){return e.cat===curCat});
var cats=['전체','인물','유물','사건','문화'];
encEl.innerHTML='<h2>&#128214; 역사 도감</h2>'+
'<div class="enc-tabs">'+cats.map(function(c){return '<button class="enc-tab'+(c===curCat?' active':'')+'" onclick="window._v11.renderEnc(\''+c+'\')">'+c+' ('+( c==='전체'?ENC_DATA.length:ENC_DATA.filter(function(e){return e.cat===c}).length)+')</button>'}).join('')+'</div>'+
'<div class="enc-grid">'+items.map(function(e,i){
return '<div class="enc-card" onclick="window._v11.showEncDetail('+ENC_DATA.indexOf(e)+')" role="button" tabindex="0" aria-label="'+e.nm+' 상세보기">'+
'<span class="enc-icon">'+e.ic+'</span>'+
'<div class="enc-title">'+e.nm+'</div>'+
'<div class="enc-desc">'+e.body.substring(0,50)+'...</div>'+
'</div>';
}).join('')+'</div>'+
'<button class="v11-close" onclick="document.getElementById(\'v11-encyclopedia\').classList.remove(\'on\')" aria-label="닫기">닫기</button>';
}

function showEncDetail(idx){
var e=ENC_DATA[idx];
if(typeof sfx==='function')sfx('sel');
encDt.innerHTML='<h3>'+e.ic+' '+e.nm+'</h3>'+
'<div class="enc-body">'+e.body+'</div>'+
'<div class="enc-meta">&#128197; 시기: '+e.era+'<br>&#128218; 출전: '+e.src+'<br>&#127991;&#65039; 분류: '+e.cat+'</div>'+
'<button class="v11-close" onclick="document.getElementById(\'v11-enc-detail\').classList.remove(\'on\');document.getElementById(\'v11-enc-bg\').classList.remove(\'on\')" aria-label="닫기">닫기</button>';
encDt.classList.add('on');
document.getElementById('v11-enc-bg').classList.add('on');
}

function renderCharBook(){
cbEl.innerHTML='<h2>&#128101; 캐릭터 도감</h2>'+
'<div class="cb-grid">'+CHAR_DATA.map(function(c,i){
var tierColor=c.tier==='SSR'?'#FFD700':c.tier==='SR'?'#aa88ff':'#8a8a8a';
return '<div class="cb-card" role="button" tabindex="0" aria-label="'+c.nm+' 상세보기">'+
'<div class="cb-port">'+c.port+'</div>'+
'<div class="cb-name" style="color:'+tierColor+'">'+c.nm+'</div>'+
'<div class="cb-class">'+c.cl+' &middot; <span style="color:'+tierColor+'">'+c.tier+'</span></div>'+
'<div class="cb-lore">'+c.lore.substring(0,40)+'...</div>'+
'</div>';
}).join('')+'</div>'+
'<button class="v11-close" onclick="document.getElementById(\'v11-charbook\').classList.remove(\'on\')" aria-label="닫기">닫기</button>';
}

function renderTimeline(){
tlEl.innerHTML='<h2>&#128197; 역사 연표</h2>'+
'<div class="tl-container">'+
'<div class="tl-line"></div>'+
TIMELINE.map(function(t){
return '<div class="tl-item">'+
'<div class="tl-dot'+(t.major?' major':'')+'"></div>'+
'<div class="tl-year">'+t.yr+'</div>'+
'<div class="tl-event"'+(t.major?' style="font-weight:700;color:#FFD700"':'')+'>'+t.ev+'</div>'+
'<div class="tl-detail">'+t.dt+'</div>'+
'</div>';
}).join('')+
'</div>'+
'<button class="v11-close" onclick="document.getElementById(\'v11-timeline\').classList.remove(\'on\')" aria-label="닫기">닫기</button>';
}

function renderDaily(){
var ch=getDailyChallenge();
var done=isDailyCompleted();
var st=getDailyState();
var streak=st.streak||0;
var total=st.totalCompleted||0;
dcEl.innerHTML='<h2>&#127775; 일일 도전</h2>'+
'<div class="daily-card">'+
'<h3>'+(done?'&#9989; ':'&#128293; ')+ch.nm+'</h3>'+
'<div class="daily-desc">'+ch.desc+'</div>'+
'<div class="daily-reward">보상: <b>'+ch.reward.xp+' XP</b> + <b>'+ch.reward.gold+' G</b></div>'+
(done?'<div style="color:#4f4;font-size:12px;margin-top:8px;font-weight:700">&#9989; 오늘의 도전 완료!</div>':
'<button class="daily-btn" onclick="window._v11.completeDaily()" aria-label="도전 완료">도전 완료 체크</button>')+
'<div class="daily-streak">&#128293; 연속 '+streak+'일 &middot; 총 '+total+'회 완료</div>'+
'</div>'+
'<button class="v11-close" onclick="document.getElementById(\'v11-daily\').classList.remove(\'on\')" aria-label="닫기">닫기</button>';
}

function renderGuide(){
gdEl.innerHTML='<h2>&#128220; 전략 가이드</h2>'+
'<div class="guide-section">'+
'<h3>&#9876;&#65039; 병종 상성</h3>'+
'<p>3종 기본 병과는 가위바위보 관계입니다.</p>'+
'<table class="guide-table"><tr><th>공격 병종</th><th>우위 대상</th><th>배율</th></tr>'+
'<tr><td>&#127993; 궁병</td><td>&#9876;&#65039; 보병</td><td style="color:#4f4">x1.5</td></tr>'+
'<tr><td>&#9876;&#65039; 보병</td><td>&#128052; 기마병</td><td style="color:#4f4">x1.5</td></tr>'+
'<tr><td>&#128052; 기마병</td><td>&#127993; 궁병</td><td style="color:#4f4">x1.5</td></tr>'+
'</table>'+
'<div class="guide-tip">&#128161; 팁: 상성 우위 시 피해량 50% 증가, 열위 시 25% 감소</div>'+
'</div>'+

'<div class="guide-section">'+
'<h3>&#127966;&#65039; 지형 효과</h3>'+
'<table class="guide-table"><tr><th>지형</th><th>방어 보너스</th><th>회피 보너스</th><th>이동 비용</th></tr>'+
'<tr><td>&#127795; 숲</td><td>+20%</td><td>+15%</td><td>2칸</td></tr>'+
'<tr><td>&#9968;&#65039; 산</td><td>+30%</td><td>+10%</td><td>통과불가</td></tr>'+
'<tr><td>&#127984; 요새</td><td>+40%</td><td>+20%</td><td>1칸</td></tr>'+
'<tr><td>&#127754; 물</td><td>-10%</td><td>-10%</td><td>3칸</td></tr>'+
'<tr><td>&#127807; 평지</td><td>0%</td><td>0%</td><td>1칸</td></tr>'+
'</table>'+
'<div class="guide-tip">&#128161; 팁: 궁병은 숲에, 보병은 요새에 배치하면 생존력이 크게 향상됩니다.</div>'+
'</div>'+

'<div class="guide-section">'+
'<h3>&#128200; 승급 시스템</h3>'+
'<p>캐릭터는 일정 레벨에 도달하면 상위 클래스로 승급합니다.</p>'+
'<table class="guide-table"><tr><th>기본</th><th>1차 승급 (Lv.8)</th><th>2차 승급 (Lv.15)</th></tr>'+
'<tr><td>궁병</td><td>명궁 (사거리+1)</td><td>신궁 (3연사)</td></tr>'+
'<tr><td>보병</td><td>중보병 (방어+)</td><td>근위병 (수호)</td></tr>'+
'<tr><td>기마병</td><td>돌기병 (이동+1)</td><td>철기병 (3연돌)</td></tr>'+
'</table>'+
'<div class="guide-tip">&#128161; 팁: 승급 시 능력치 보너스와 새로운 기술을 획득합니다. 경험치를 집중하세요.</div>'+
'</div>'+

'<div class="guide-section">'+
'<h3>&#9881;&#65039; 전투 팁</h3>'+
'<div class="guide-tip">&#128161; ZOC(통제 영역): 적 유닛 옆을 지나갈 때 이동이 멈춥니다. 우회하거나 먼저 처치하세요.</div>'+
'<div class="guide-tip">&#128161; 집중 공격: 적을 분산 공격하지 말고 한 명씩 집중하여 처치하세요.</div>'+
'<div class="guide-tip">&#128161; 힐러 보호: 우사/웅녀 같은 회복 유닛은 후방에 배치하고 보호하세요.</div>'+
'<div class="guide-tip">&#128161; 지형 활용: 숲/요새에 유닛을 배치하면 방어·회피가 크게 증가합니다.</div>'+
'<div class="guide-tip">&#128161; 반격 주의: 적 궁병의 사거리 밖에서 이동 후 공격하면 반격을 피할 수 있습니다.</div>'+
'<div class="guide-tip">&#128161; 증원 대비: 일부 전투에서 적 증원이 등장합니다. 무리하게 전진하지 마세요.</div>'+
'</div>'+

'<div class="guide-section">'+
'<h3>&#9000; 키보드 단축키</h3>'+
'<table class="guide-table"><tr><th>키</th><th>기능</th></tr>'+
'<tr><td>&#8593;&#8595;&#8592;&#8594; / WASD</td><td>이동</td></tr>'+
'<tr><td>Enter / Space</td><td>상호작용 / 대화 진행</td></tr>'+
'<tr><td>Esc</td><td>메뉴 / 취소</td></tr>'+
'<tr><td>E</td><td>역사 도감</td></tr>'+
'<tr><td>C</td><td>캐릭터 도감</td></tr>'+
'<tr><td>L</td><td>역사 연표</td></tr>'+
'<tr><td>D</td><td>일일 도전</td></tr>'+
'<tr><td>G</td><td>전략 가이드</td></tr>'+
'<tr><td>?</td><td>키보드 도움말</td></tr>'+
'</table>'+
'</div>'+
'<button class="v11-close" onclick="document.getElementById(\'v11-guide\').classList.remove(\'on\')" aria-label="닫기">닫기</button>';
}

// =============================================
// SECTION 8: MENU BUTTON INJECTION
// =============================================
var mnu=document.getElementById('menu-overlay');
if(mnu){
var btns=[
{txt:'&#128214; 역사 도감',fn:function(){mnu.classList.remove('on');renderEncyclopedia();encEl.classList.add('on')}},
{txt:'&#128101; 캐릭터 도감',fn:function(){mnu.classList.remove('on');renderCharBook();cbEl.classList.add('on')}},
{txt:'&#128197; 역사 연표',fn:function(){mnu.classList.remove('on');renderTimeline();tlEl.classList.add('on')}},
{txt:'&#127775; 일일 도전',fn:function(){mnu.classList.remove('on');renderDaily();dcEl.classList.add('on')}},
{txt:'&#128220; 전략 가이드',fn:function(){mnu.classList.remove('on');renderGuide();gdEl.classList.add('on')}}
];
var closeBtn=mnu.querySelector('.menu-btn:last-child');
btns.forEach(function(b){
var btn=document.createElement('button');btn.className='menu-btn';btn.innerHTML=b.txt;
btn.onclick=b.fn;
if(closeBtn)mnu.insertBefore(btn,closeBtn);
else mnu.appendChild(btn);
});
}

// =============================================
// SECTION 9: KEYBOARD SHORTCUTS
// =============================================
document.addEventListener('keydown',function(e){
if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
var key=e.key.toLowerCase();
if(key==='e'&&!e.ctrlKey&&!e.altKey){
if(encEl.classList.contains('on')){encEl.classList.remove('on');return}
renderEncyclopedia();encEl.classList.add('on');
if(typeof sfx==='function')sfx('menu');
e.preventDefault();
}
if(key==='c'&&!e.ctrlKey&&!e.altKey){
if(cbEl.classList.contains('on')){cbEl.classList.remove('on');return}
renderCharBook();cbEl.classList.add('on');
if(typeof sfx==='function')sfx('menu');
e.preventDefault();
}
if(key==='l'&&!e.ctrlKey&&!e.altKey){
if(tlEl.classList.contains('on')){tlEl.classList.remove('on');return}
renderTimeline();tlEl.classList.add('on');
if(typeof sfx==='function')sfx('menu');
e.preventDefault();
}
if(key==='d'&&!e.ctrlKey&&!e.altKey){
if(dcEl.classList.contains('on')){dcEl.classList.remove('on');return}
renderDaily();dcEl.classList.add('on');
if(typeof sfx==='function')sfx('menu');
e.preventDefault();
}
if(key==='g'&&!e.ctrlKey&&!e.altKey){
if(gdEl.classList.contains('on')){gdEl.classList.remove('on');return}
renderGuide();gdEl.classList.add('on');
if(typeof sfx==='function')sfx('menu');
e.preventDefault();
}
});

// =============================================
// SECTION 10: ADDITIONAL SFX (4종)
// =============================================
if(typeof window.sfx==='function'&&typeof ac!=='undefined'){
var _sfx11=window.sfx;
window.sfx=function(t){
if(t==='encyclopedia'&&ac&&typeof pn==='function'){
pn(392,.1,'sine');setTimeout(function(){pn(494,.1,'sine')},80);setTimeout(function(){pn(587,.15,'sine')},160);return;
}
if(t==='daily_complete'&&ac&&typeof pn==='function'){
[523,659,784,1047,1319].forEach(function(f,i){setTimeout(function(){pn(f,.15,'sine')},i*80)});return;
}
if(t==='timeline_scroll'&&ac&&typeof pn==='function'){
pn(349,.08,'sine');pn(440,.08,'sine');return;
}
if(t==='guide_tip'&&ac&&typeof pn==='function'){
pn(587,.1,'triangle');setTimeout(function(){pn(784,.1,'triangle')},100);return;
}
_sfx11(t);
};
}

// =============================================
// SECTION 11: ADDITIONAL QUIZ QUESTIONS (10문, 총 60문)
// =============================================
if(typeof QUIZZES!=='undefined'){
[
{q:'고조선의 청동기 문화를 대표하는 토기는?',a:['미송리식토기','빗살무늬토기','민무늬토기','채색토기'],c:0},
{q:'고인돌의 분포가 가장 집중된 지역은?',a:['한반도','유럽','인도','아프리카'],c:0},
{q:'환웅이 인간 세상에서 주관한 일의 수는?',a:['360가지','100가지','500가지','72가지'],c:0},
{q:'부여의 4가(加) 체제에 해당하지 않는 것은?',a:['용가','마가','우가','저가'],c:0},
{q:'삼한의 총 소국 수의 합은?',a:['78국','54국','100국','36국'],c:0},
{q:'고조선 멸망 후 설치된 한사군이 아닌 것은?',a:['대방군','낙랑군','진번군','현도군'],c:0},
{q:'위만조선이 중계무역에서 독점한 자원은?',a:['철기','비단','도자기','향료'],c:0},
{q:'단군신화에서 곰이 인간이 되기 위해 먹은 것은?',a:['쑥과 마늘','인삼과 꿀','쌀과 보리','약초와 물'],c:0},
{q:'고조선의 세력 범위를 추정하는 가장 중요한 유물은?',a:['비파형동검','빗살무늬토기','고인돌','세형동검'],c:0},
{q:'삼한에서 제사를 주관하는 종교 지도자를?',a:['천군','제사장','무당','현자'],c:0}
].forEach(function(q){QUIZZES.push(q)});
}

// =============================================
// SECTION 12: EXPORTS
// =============================================
window._v11={
renderEnc:renderEncyclopedia,
showEncDetail:showEncDetail,
renderCharBook:renderCharBook,
renderTimeline:renderTimeline,
renderDaily:renderDaily,
renderGuide:renderGuide,
completeDaily:function(){completeDailyChallenge();renderDaily()},
encData:ENC_DATA,
charData:CHAR_DATA,
timeline:TIMELINE,
dailyChallenges:DAILY_CHALLENGES
};

})();
