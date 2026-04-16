import { useState, useEffect, useCallback, useRef } from "react";

// ─── GAME DATA ───────────────────────────────────────────────
const TEAM_MEMBERS = [
  { role: "총괄 프로듀서", name: "박진우", desc: "프로젝트 방향성, 일정, 예산 총괄. 역사 고증과 게임성 사이의 균형을 잡는 핵심 의사결정자.", icon: "🎯" },
  { role: "시나리오 작가", name: "김서연", desc: "단군~조선까지 역사 스토리라인 집필. 사건의 인과관계를 자연스러운 서사로 풀어내는 역할.", icon: "📜" },
  { role: "역사 고증 자문", name: "이한솔 (사학과 박사)", desc: "모든 대사·사건·연도의 사실 확인. '재미를 위한 각색'의 허용 범위를 설정.", icon: "🏛️" },
  { role: "캐릭터 디자이너", name: "정유나", desc: "시대별 복장·갑옷·무기 고증 기반 캐릭터 일러스트. 영걸전 스타일의 초상화 제작.", icon: "🎨" },
  { role: "게임 디자이너", name: "최동현", desc: "턴제 전투 시스템, 밸런싱, 난이도 설계. '쉽지만 전략적인' 핵심 루프 담당.", icon: "⚔️" },
  { role: "프로그래머", name: "한지민", desc: "Unity/Godot 기반 개발. 전투 엔진, UI, 세이브/로드, 맵 이동 시스템 구현.", icon: "💻" },
  { role: "배경/맵 아티스트", name: "오승환", desc: "시대별 배경 일러스트와 전투맵 제작. 고조선 초원부터 조선 궁궐까지.", icon: "🗺️" },
  { role: "사운드 디자이너", name: "윤채원", desc: "시대별 BGM, 전투 효과음, UI 사운드. 국악 요소를 현대적으로 편곡.", icon: "🎵" },
];

const CHAPTERS = [
  {
    id: 1, era: "고조선", year: "BC 2333", title: "단군, 하늘의 뜻을 잇다",
    color: "#4A6741",
    story: [
      "환인의 아들 환웅이 태백산 신단수 아래로 내려왔다.",
      "풍백, 우사, 운사를 거느리고 인간 세상을 다스리니, 이를 신시(神市)라 했다.",
      "곰과 호랑이가 사람이 되길 원했으나, 오직 곰만이 100일의 시련을 견뎠다.",
      "환웅과 웅녀 사이에서 단군왕검이 태어나, 아사달에 도읍을 정하고 조선을 세웠다.",
      "▶ 역사 포인트: BC 2333년은 한민족 최초의 국가 건국. 홍익인간(弘益人間) — '널리 인간을 이롭게 하라'는 건국 이념이 오늘날까지 대한민국 교육이념으로 이어진다."
    ],
    enemy: { name: "사나운 호랑이", hp: 45, maxHp: 45, atk: 8, def: 2, emoji: "🐯", 
      desc: "인내를 잃고 동굴을 뛰쳐나간 호랑이. 분노에 가득 차 있다." },
    player: { name: "단군왕검", hp: 120, maxHp: 120, atk: 15, def: 5, emoji: "👑",
      skills: [
        { name: "천부인 번개", dmg: 25, cost: 15, desc: "하늘의 힘을 빌려 번개를 내린다" },
        { name: "홍익의 빛", dmg: 0, heal: 30, cost: 10, desc: "널리 이로운 기운으로 회복한다" }
      ]},
    reward: "홍익검(弘益劍) 획득!"
  },
  {
    id: 2, era: "고구려", year: "BC 37", title: "주몽, 부여를 떠나다",
    color: "#8B2500",
    story: [
      "부여의 금와왕 궁에서 자란 주몽은 활 솜씨가 천하에 비길 데 없었다.",
      "그러나 금와왕의 아들들은 주몽을 시기하여 목숨을 노렸다.",
      "어머니 유화부인의 도움으로 부여를 탈출한 주몽은 남쪽으로 달렸다.",
      "엄리대수(지금의 압록강)에서 물고기와 자라가 다리를 놓아 강을 건넜다.",
      "졸본에 도읍을 정하고 고구려를 건국하니, 이때가 BC 37년이었다.",
      "▶ 역사 포인트: 고구려는 이후 700년간 동북아 최강국으로 군림한다. 광개토대왕, 을지문덕 등 전설적 인물들의 나라. 만주와 한반도 북부를 아우르는 대제국이었다."
    ],
    enemy: { name: "부여 추격대장 대소", hp: 65, maxHp: 65, atk: 12, def: 4, emoji: "⚔️",
      desc: "금와왕의 명을 받고 주몽을 추격하는 부여의 장수." },
    player: { name: "주몽", hp: 100, maxHp: 100, atk: 18, def: 4, emoji: "🏹",
      skills: [
        { name: "신궁 연사", dmg: 30, cost: 15, desc: "백발백중의 활로 세 발을 연달아 쏜다" },
        { name: "엄리대수 가호", dmg: 0, heal: 25, cost: 12, desc: "강의 정령이 주몽을 보호한다" }
      ]},
    reward: "주몽의 활 획득!"
  },
  {
    id: 3, era: "삼국시대", year: "612", title: "을지문덕, 살수에서 웃다",
    color: "#1B3A5C",
    story: [
      "수나라 양제는 113만 대군을 이끌고 고구려를 침략했다. 역사상 유례없는 대군이었다.",
      "을지문덕은 거짓 항복으로 적을 깊숙이 유인했다.",
      "지친 수나라 군대가 살수(청천강)를 건너는 순간, 상류의 둑을 터뜨렸다.",
      "30만 별동대 중 살아 돌아간 자는 고작 2,700명. 이것이 살수대첩이다.",
      "을지문덕은 양제에게 시(詩)를 보내 조롱하기까지 했다 — '그대의 신묘한 전략은 하늘의 이치를 꿰뚫고...'",
      "▶ 역사 포인트: 612년 살수대첩. 수나라는 이 패전의 후유증으로 결국 멸망한다. 한 나라의 전쟁이 다른 나라의 멸망을 불러온 대표적 사례."
    ],
    enemy: { name: "수나라 우문술 장군", hp: 80, maxHp: 80, atk: 14, def: 6, emoji: "🐉",
      desc: "수 양제의 명을 받은 30만 별동대의 총사령관." },
    player: { name: "을지문덕", hp: 110, maxHp: 110, atk: 16, def: 7, emoji: "🌊",
      skills: [
        { name: "살수 범람", dmg: 35, cost: 20, desc: "둑을 터뜨려 적진을 물바다로 만든다" },
        { name: "유인지계", dmg: 0, heal: 0, cost: 8, desc: "적의 방어를 3턴간 절반으로 낮춘다", debuff: true }
      ]},
    reward: "을지문덕의 지략서 획득!"
  },
  {
    id: 4, era: "고려", year: "1236", title: "팔만대장경, 불심으로 나라를 지키다",
    color: "#8B6914",
    story: [
      "몽골 제국의 침략으로 고려는 강화도로 천도했다.",
      "초조대장경이 몽골군에 의해 불타 없어진 뒤, 백성들은 절망했다.",
      "고려는 부처의 힘으로 외적을 물리치겠다는 일념으로 대장경 재조각에 착수했다.",
      "16년에 걸쳐 8만여 장의 목판에 새긴 것이 바로 팔만대장경이다.",
      "오자(誤字)가 단 한 글자도 없는 이 경판은 세계 인쇄 문화의 기적으로 남았다.",
      "▶ 역사 포인트: 1236~1251년 제작. 몽골에 대한 군사적 저항과 함께 문화적 저항을 동시에 보여준 사건. 현재 해인사에 보관, 유네스코 세계기록유산."
    ],
    enemy: { name: "몽골 살리타이", hp: 90, maxHp: 90, atk: 16, def: 5, emoji: "🏇",
      desc: "몽골 제국의 고려 침공군 선봉장. 기마 전술의 달인." },
    player: { name: "김윤후", hp: 100, maxHp: 100, atk: 14, def: 6, emoji: "🛡️",
      skills: [
        { name: "처인성 사격", dmg: 32, cost: 15, desc: "성벽 위에서 정확한 화살을 날린다" },
        { name: "불심 결계", dmg: 0, heal: 35, cost: 15, desc: "대장경의 기운이 아군을 감싼다" }
      ]},
    reward: "팔만대장경 부적 획득!"
  },
  {
    id: 5, era: "조선", year: "1592", title: "이순신, 바다를 뒤집다",
    color: "#003366",
    story: [
      "1592년 4월, 도요토미 히데요시의 15만 왜군이 부산포에 상륙했다.",
      "육지에서 조선군이 연패하며 선조는 의주까지 도망쳤다.",
      "그러나 바다에서는 달랐다. 전라좌수사 이순신이 거북선을 이끌고 출격했다.",
      "옥포, 사천, 한산도... 연전연승. 특히 한산도 대첩의 학익진은 세계 해전사의 걸작이었다.",
      "적의 보급로를 완전히 차단하여 왜군의 북진을 막았다.",
      "▶ 역사 포인트: 임진왜란(1592~1598). 이순신의 23전 23승은 세계 해전사에서 유례가 없다. 제해권 장악이 전쟁의 흐름을 바꾼 대표적 사례."
    ],
    enemy: { name: "와키자카 야스하루", hp: 100, maxHp: 100, atk: 18, def: 7, emoji: "⛵",
      desc: "일본 수군의 맹장. 한산도에서 이순신에 맞선 왜 수군 지휘관." },
    player: { name: "이순신", hp: 130, maxHp: 130, atk: 20, def: 8, emoji: "🐢",
      skills: [
        { name: "학익진 포격", dmg: 40, cost: 20, desc: "학의 날개 진형으로 적을 포위 사격한다" },
        { name: "거북선 돌격", dmg: 28, cost: 12, desc: "철갑 거북선으로 적 함대에 돌진한다" }
      ]},
    reward: "충무공의 장검 획득!"
  }
];

// ─── COMPONENTS ──────────────────────────────────────────────

const HealthBar = ({ current, max, color = "#e74c3c", label }) => {
  const pct = Math.max(0, (current / max) * 100);
  return (
    <div style={{ marginBottom: 4 }}>
      {label && <div style={{ fontSize: 11, color: "#aaa", marginBottom: 2 }}>{label}</div>}
      <div style={{ background: "#1a1a2e", borderRadius: 6, height: 14, overflow: "hidden", border: "1px solid #333", position: "relative" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}aa)`, transition: "width 0.5s ease", borderRadius: 6 }} />
        <span style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "#fff", lineHeight: "14px", fontWeight: 700, textShadow: "0 1px 2px #000" }}>
          {current} / {max}
        </span>
      </div>
    </div>
  );
};

const SPBar = ({ current, max }) => {
  const pct = Math.max(0, (current / max) * 100);
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ background: "#1a1a2e", borderRadius: 6, height: 10, overflow: "hidden", border: "1px solid #333", position: "relative" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, #3498db, #2ecc71)", transition: "width 0.5s ease", borderRadius: 6 }} />
        <span style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", fontSize: 9, color: "#fff", lineHeight: "10px", textShadow: "0 1px 2px #000" }}>
          SP {current}/{max}
        </span>
      </div>
    </div>
  );
};

// ─── MAIN APP ────────────────────────────────────────────────
export default function KoreanHistoryRPG() {
  const [screen, setScreen] = useState("title"); // title, team, storyIntro, battle, victory, chapterClear, gameEnd
  const [chapterIdx, setChapterIdx] = useState(0);
  const [storyLine, setStoryLine] = useState(0);
  const [playerHp, setPlayerHp] = useState(120);
  const [playerSp, setPlayerSp] = useState(50);
  const [enemyHp, setEnemyHp] = useState(45);
  const [battleLog, setBattleLog] = useState([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [shakeTarget, setShakeTarget] = useState(null); // "player" | "enemy"
  const [enemyDebuff, setEnemyDebuff] = useState(0);
  const [defending, setDefending] = useState(false);
  const [items, setItems] = useState([{ name: "회복약", count: 3, heal: 30 }]);
  const logRef = useRef(null);

  const chapter = CHAPTERS[chapterIdx];

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [battleLog]);

  const initBattle = useCallback(() => {
    const ch = CHAPTERS[chapterIdx];
    setPlayerHp(ch.player.hp);
    setPlayerSp(50);
    setEnemyHp(ch.enemy.hp);
    setBattleLog([`${ch.enemy.name}이(가) 나타났다!`]);
    setIsPlayerTurn(true);
    setAnimating(false);
    setEnemyDebuff(0);
    setDefending(false);
    setScreen("battle");
  }, [chapterIdx]);

  const shake = (target) => {
    setShakeTarget(target);
    setTimeout(() => setShakeTarget(null), 400);
  };

  const enemyTurn = useCallback((currentPlayerHp) => {
    setTimeout(() => {
      const ch = CHAPTERS[chapterIdx];
      const wasDefending = defending;
      let dmg = Math.max(1, ch.enemy.atk - ch.player.def - (wasDefending ? 5 : 0));
      dmg = dmg + Math.floor(Math.random() * 4) - 1;
      if (wasDefending) dmg = Math.max(1, Math.floor(dmg * 0.5));
      dmg = Math.max(1, dmg);
      const newHp = Math.max(0, currentPlayerHp - dmg);
      setPlayerHp(newHp);
      shake("player");
      setBattleLog(prev => [...prev, `${ch.enemy.name}의 공격! ${dmg} 데미지!${wasDefending ? " (방어 중!)" : ""}`]);
      setDefending(false);
      setAnimating(false);
      if (newHp <= 0) {
        setTimeout(() => {
          setBattleLog(prev => [...prev, "패배했다... 다시 도전하자!"]);
          setTimeout(() => initBattle(), 1500);
        }, 600);
      } else {
        setIsPlayerTurn(true);
      }
    }, 800);
  }, [chapterIdx, defending, initBattle]);

  const doAttack = () => {
    if (animating || !isPlayerTurn) return;
    setAnimating(true);
    setIsPlayerTurn(false);
    const defMod = enemyDebuff > 0 ? 0.5 : 1;
    let dmg = Math.max(1, Math.floor(chapter.player.atk - chapter.enemy.def * defMod));
    dmg = dmg + Math.floor(Math.random() * 5);
    const newEHp = Math.max(0, enemyHp - dmg);
    setEnemyHp(newEHp);
    shake("enemy");
    if (enemyDebuff > 0) setEnemyDebuff(prev => prev - 1);
    setBattleLog(prev => [...prev, `${chapter.player.name}의 공격! ${dmg} 데미지!`]);
    if (newEHp <= 0) {
      setTimeout(() => {
        setBattleLog(prev => [...prev, `${chapter.enemy.name}을(를) 물리쳤다!`]);
        setTimeout(() => setScreen("victory"), 1200);
      }, 500);
    } else {
      enemyTurn(playerHp);
    }
  };

  const doSkill = (skill) => {
    if (animating || !isPlayerTurn) return;
    if (playerSp < skill.cost) {
      setBattleLog(prev => [...prev, "SP가 부족하다!"]);
      return;
    }
    setAnimating(true);
    setIsPlayerTurn(false);
    setPlayerSp(prev => prev - skill.cost);
    if (skill.debuff) {
      setEnemyDebuff(3);
      setBattleLog(prev => [...prev, `${skill.name} 발동! 적의 방어력이 감소했다!`]);
      setTimeout(() => { setAnimating(false); enemyTurn(playerHp); }, 300);
      return;
    }
    if (skill.heal) {
      const healed = Math.min(skill.heal, chapter.player.maxHp - playerHp);
      const newHp = playerHp + healed;
      setPlayerHp(newHp);
      setBattleLog(prev => [...prev, `${skill.name}! HP ${healed} 회복!`]);
      if (enemyDebuff > 0) setEnemyDebuff(prev => prev - 1);
      enemyTurn(newHp);
      return;
    }
    const defMod = enemyDebuff > 0 ? 0.5 : 1;
    let dmg = Math.max(1, Math.floor(skill.dmg - chapter.enemy.def * defMod));
    dmg = dmg + Math.floor(Math.random() * 6);
    const newEHp = Math.max(0, enemyHp - dmg);
    setEnemyHp(newEHp);
    shake("enemy");
    if (enemyDebuff > 0) setEnemyDebuff(prev => prev - 1);
    setBattleLog(prev => [...prev, `${skill.name}! ${dmg} 데미지!`]);
    if (newEHp <= 0) {
      setTimeout(() => {
        setBattleLog(prev => [...prev, `${chapter.enemy.name}을(를) 물리쳤다!`]);
        setTimeout(() => setScreen("victory"), 1200);
      }, 500);
    } else {
      enemyTurn(playerHp);
    }
  };

  const doDefend = () => {
    if (animating || !isPlayerTurn) return;
    setAnimating(true);
    setIsPlayerTurn(false);
    setDefending(true);
    const spRecovered = Math.min(8, 50 - playerSp);
    setPlayerSp(prev => Math.min(50, prev + 8));
    setBattleLog(prev => [...prev, `방어 태세! SP ${spRecovered} 회복!`]);
    if (enemyDebuff > 0) setEnemyDebuff(prev => prev - 1);
    enemyTurn(playerHp);
  };

  const doItem = () => {
    if (animating || !isPlayerTurn) return;
    const item = items[0];
    if (!item || item.count <= 0) {
      setBattleLog(prev => [...prev, "아이템이 없다!"]);
      return;
    }
    setAnimating(true);
    setIsPlayerTurn(false);
    const healed = Math.min(item.heal, chapter.player.maxHp - playerHp);
    const newHp = playerHp + healed;
    setPlayerHp(newHp);
    setItems(prev => prev.map((it, i) => i === 0 ? { ...it, count: it.count - 1 } : it));
    setBattleLog(prev => [...prev, `${item.name} 사용! HP ${healed} 회복!`]);
    if (enemyDebuff > 0) setEnemyDebuff(prev => prev - 1);
    enemyTurn(newHp);
  };

  const nextChapter = () => {
    if (chapterIdx < CHAPTERS.length - 1) {
      setChapterIdx(prev => prev + 1);
      setStoryLine(0);
      setScreen("storyIntro");
      setItems(prev => prev.map(it => ({ ...it, count: 3 })));
    } else {
      setScreen("gameEnd");
    }
  };

  // ─── STYLES ──────────────────────────────────────────────
  const base = {
    width: "100%", minHeight: "100vh", background: "#0a0a14",
    fontFamily: "'Noto Serif KR', 'Nanum Myeongjo', Georgia, serif",
    color: "#e8dcc8", display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "20px", boxSizing: "border-box",
  };

  const btn = (bg = "#8B2500", hover = false) => ({
    padding: "10px 20px", background: bg, color: "#e8dcc8", border: "1px solid #5a3a1a",
    borderRadius: 6, cursor: "pointer", fontSize: 14, fontFamily: "inherit",
    transition: "all 0.2s", fontWeight: 600,
    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
  });

  const shakeAnim = {
    animation: "shake 0.4s ease-in-out",
  };

  // ─── TITLE SCREEN ──────────────────────────────────────
  if (screen === "title") {
    return (
      <div style={base}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700;900&display=swap');
          @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
          @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          @keyframes glow { 0%,100%{text-shadow:0 0 20px #c4956a55} 50%{text-shadow:0 0 40px #c4956aaa} }
          @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
          button:hover { filter: brightness(1.2); transform: translateY(-1px); }
          button:active { transform: translateY(1px); }
          * { box-sizing: border-box; }
        `}</style>
        <div style={{ textAlign: "center", animation: "fadeIn 1s ease" }}>
          <div style={{ fontSize: 14, letterSpacing: 8, color: "#8a7a6a", marginBottom: 12 }}>TURN-BASED RPG</div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 900, margin: 0, lineHeight: 1.2,
            background: "linear-gradient(180deg, #f4e4c1, #c4956a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "glow 3s ease-in-out infinite" }}>
            한국사 영웅전
          </h1>
          <div style={{ fontSize: "clamp(14px, 2.5vw, 18px)", color: "#8a7a6a", marginTop: 8, fontStyle: "italic" }}>
            단군에서 이순신까지 — 반만년 역사를 전장에서 체험하라
          </div>
          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <button onClick={() => { setChapterIdx(0); setStoryLine(0); setScreen("storyIntro"); }}
              style={{ ...btn("#6B1A0A"), padding: "14px 48px", fontSize: 18, letterSpacing: 4 }}>
              ⚔️ 새 이야기 시작
            </button>
            <button onClick={() => setScreen("team")} style={{ ...btn("#2a2a3e"), padding: "10px 36px" }}>
              🎭 제작팀 소개
            </button>
          </div>
          <div style={{ marginTop: 60, fontSize: 11, color: "#555", lineHeight: 1.8 }}>
            Chapter 1. 고조선 (BC 2333) → Chapter 2. 고구려 (BC 37) → Chapter 3. 삼국시대 (612)<br/>
            Chapter 4. 고려 (1236) → Chapter 5. 조선 (1592)
          </div>
        </div>
      </div>
    );
  }

  // ─── TEAM SCREEN ───────────────────────────────────────
  if (screen === "team") {
    return (
      <div style={{ ...base, justifyContent: "flex-start", paddingTop: 30 }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700;900&display=swap');
          button:hover { filter: brightness(1.2); transform: translateY(-1px); }
          * { box-sizing: border-box; }
        `}</style>
        <h2 style={{ fontSize: 28, textAlign: "center", marginBottom: 4,
          background: "linear-gradient(180deg, #f4e4c1, #c4956a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          🎭 제작팀 (8인 구성)
        </h2>
        <p style={{ color: "#777", fontSize: 13, textAlign: "center", marginBottom: 20 }}>각 역할의 전문가들이 역사와 재미 사이의 균형을 만듭니다</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12, maxWidth: 800, width: "100%" }}>
          {TEAM_MEMBERS.map((m, i) => (
            <div key={i} style={{
              background: "linear-gradient(135deg, #151520, #1a1a2e)", border: "1px solid #2a2a3e",
              borderRadius: 10, padding: 16, transition: "all 0.3s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 28 }}>{m.icon}</span>
                <div>
                  <div style={{ fontSize: 13, color: "#c4956a", fontWeight: 700 }}>{m.role}</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{m.name}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>{m.desc}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setScreen("title")} style={{ ...btn("#2a2a3e"), marginTop: 24 }}>← 타이틀로</button>
      </div>
    );
  }

  // ─── STORY INTRO ───────────────────────────────────────
  if (screen === "storyIntro") {
    const lines = chapter.story;
    const isLast = storyLine >= lines.length - 1;
    return (
      <div style={{ ...base, background: `linear-gradient(180deg, ${chapter.color}22, #0a0a14)` }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700;900&display=swap');
          @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
          @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
          button:hover { filter: brightness(1.2); transform: translateY(-1px); }
          * { box-sizing: border-box; }
        `}</style>
        <div style={{ maxWidth: 600, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: 6, color: "#8a7a6a", marginBottom: 6 }}>
            CHAPTER {chapter.id} · {chapter.era}
          </div>
          <div style={{ fontSize: 13, color: chapter.color, marginBottom: 4, fontWeight: 700 }}>{chapter.year}년</div>
          <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 24, lineHeight: 1.4,
            background: `linear-gradient(180deg, #f4e4c1, ${chapter.color})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {chapter.title}
          </h2>
          <div style={{
            background: "#0a0a14cc", border: `1px solid ${chapter.color}44`, borderRadius: 10,
            padding: 24, marginBottom: 24, minHeight: 100, display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <p style={{ fontSize: 15, lineHeight: 2, animation: "fadeIn 0.5s ease", margin: 0,
              color: lines[storyLine]?.startsWith("▶") ? "#c4956a" : "#e8dcc8",
              fontWeight: lines[storyLine]?.startsWith("▶") ? 700 : 400,
              fontStyle: lines[storyLine]?.startsWith("▶") ? "normal" : "normal" }}>
              {lines[storyLine]}
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            {!isLast ? (
              <button onClick={() => setStoryLine(prev => prev + 1)}
                style={{ ...btn(chapter.color), padding: "12px 36px", animation: "pulse 2s infinite" }}>
                다음 ▶
              </button>
            ) : (
              <button onClick={initBattle}
                style={{ ...btn("#8B2500"), padding: "12px 36px", fontSize: 16, letterSpacing: 2 }}>
                ⚔️ 전투 돌입!
              </button>
            )}
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 4, justifyContent: "center" }}>
            {lines.map((_, i) => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: "50%",
                background: i <= storyLine ? chapter.color : "#333",
                transition: "background 0.3s"
              }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── BATTLE SCREEN ─────────────────────────────────────
  if (screen === "battle") {
    return (
      <div style={{ ...base, background: `linear-gradient(180deg, ${chapter.color}15, #0a0a14)`, justifyContent: "flex-start", paddingTop: 16 }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700;900&display=swap');
          @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
          @keyframes fadeIn { from{opacity:0} to{opacity:1} }
          button:hover { filter: brightness(1.2); transform: translateY(-1px); }
          button:active { transform: translateY(1px); }
          button:disabled { opacity: 0.4; cursor: not-allowed; filter: none; transform: none; }
          * { box-sizing: border-box; }
        `}</style>
        <div style={{ maxWidth: 520, width: "100%" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: "#666", letterSpacing: 4 }}>CHAPTER {chapter.id} · {chapter.era} ({chapter.year})</span>
          </div>

          {/* Battle Arena */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "#0d0d1a", border: `1px solid ${chapter.color}33`, borderRadius: 12,
            padding: "20px 16px", marginBottom: 12, minHeight: 160, position: "relative",
            backgroundImage: `radial-gradient(circle at 50% 100%, ${chapter.color}11, transparent 70%)`
          }}>
            {/* Player */}
            <div style={{ textAlign: "center", flex: 1, ...(shakeTarget === "player" ? shakeAnim : {}) }}>
              <div style={{ fontSize: 48, marginBottom: 6 }}>{chapter.player.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{chapter.player.name}</div>
              <div style={{ width: 130, margin: "0 auto" }}>
                <HealthBar current={playerHp} max={chapter.player.maxHp} color="#27ae60" />
                <SPBar current={playerSp} max={50} />
              </div>
              {defending && <div style={{ fontSize: 10, color: "#3498db", marginTop: 2 }}>🛡️ 방어 중</div>}
            </div>

            {/* VS */}
            <div style={{ fontSize: 20, color: "#555", fontWeight: 900, padding: "0 8px" }}>VS</div>

            {/* Enemy */}
            <div style={{ textAlign: "center", flex: 1, ...(shakeTarget === "enemy" ? shakeAnim : {}) }}>
              <div style={{ fontSize: 48, marginBottom: 6 }}>{chapter.enemy.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#e74c3c", marginBottom: 4 }}>{chapter.enemy.name}</div>
              <div style={{ width: 130, margin: "0 auto" }}>
                <HealthBar current={enemyHp} max={chapter.enemy.maxHp} color="#e74c3c" />
              </div>
              {enemyDebuff > 0 && <div style={{ fontSize: 10, color: "#e67e22", marginTop: 2 }}>⬇ 방어력 감소 ({enemyDebuff}턴)</div>}
            </div>
          </div>

          {/* Battle Log */}
          <div ref={logRef} style={{
            background: "#0a0a14", border: "1px solid #222", borderRadius: 8,
            padding: 10, height: 90, overflowY: "auto", marginBottom: 12, fontSize: 12, lineHeight: 1.8
          }}>
            {battleLog.map((log, i) => (
              <div key={i} style={{ color: i === battleLog.length - 1 ? "#e8dcc8" : "#666" }}>{log}</div>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
            <button onClick={doAttack} disabled={!isPlayerTurn || animating}
              style={{ ...btn("#6B1A0A"), width: "100%", textAlign: "center" }}>
              ⚔️ 공격
            </button>
            <button onClick={doDefend} disabled={!isPlayerTurn || animating}
              style={{ ...btn("#1B3A5C"), width: "100%", textAlign: "center" }}>
              🛡️ 방어 (SP+8)
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {chapter.player.skills.map((skill, i) => (
              <button key={i} onClick={() => doSkill(skill)} disabled={!isPlayerTurn || animating || playerSp < skill.cost}
                style={{ ...btn(chapter.color), width: "100%", textAlign: "center", fontSize: 12, padding: "8px 6px" }}>
                ✨ {skill.name} <span style={{ fontSize: 10, opacity: 0.7 }}>(SP:{skill.cost})</span>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 8 }}>
            <button onClick={doItem} disabled={!isPlayerTurn || animating || items[0].count <= 0}
              style={{ ...btn("#2a5a2a"), width: "100%", textAlign: "center", fontSize: 12 }}>
              🧪 회복약 ({items[0].count}개) — HP +{items[0].heal}
            </button>
          </div>

          {/* Skill tooltips */}
          <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {chapter.player.skills.map((skill, i) => (
              <div key={i} style={{ fontSize: 10, color: "#666", background: "#111", padding: "4px 8px", borderRadius: 4, flex: 1, minWidth: 120 }}>
                <strong style={{ color: "#999" }}>{skill.name}</strong>: {skill.desc}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── VICTORY SCREEN ────────────────────────────────────
  if (screen === "victory") {
    return (
      <div style={{ ...base, background: `linear-gradient(180deg, ${chapter.color}22, #0a0a14)` }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700;900&display=swap');
          @keyframes fadeIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
          button:hover { filter: brightness(1.2); transform: translateY(-1px); }
          * { box-sizing: border-box; }
        `}</style>
        <div style={{ textAlign: "center", animation: "fadeIn 0.8s ease", maxWidth: 500 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🏆</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8,
            background: "linear-gradient(180deg, #f4d03f, #c4956a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            승리!
          </h2>
          <div style={{ fontSize: 16, marginBottom: 8, color: "#c4956a" }}>{chapter.enemy.name}을(를) 물리쳤다!</div>
          <div style={{
            background: "#151520", border: "1px solid #c4956a44", borderRadius: 10,
            padding: 20, margin: "16px auto", display: "inline-block"
          }}>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>보상 획득</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#f4d03f" }}>🎁 {chapter.reward}</div>
          </div>
          <div style={{
            background: "#0a0a14", border: `1px solid ${chapter.color}33`, borderRadius: 10,
            padding: 16, margin: "16px auto", maxWidth: 450, textAlign: "left"
          }}>
            <div style={{ fontSize: 12, color: "#c4956a", fontWeight: 700, marginBottom: 6 }}>📖 이 챕터의 역사</div>
            <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.8 }}>
              {chapter.story[chapter.story.length - 1]}
            </div>
          </div>
          <button onClick={nextChapter}
            style={{ ...btn("#6B1A0A"), padding: "14px 40px", fontSize: 16, marginTop: 16, letterSpacing: 2 }}>
            {chapterIdx < CHAPTERS.length - 1 ? "다음 챕터로 ▶" : "엔딩 보기 ▶"}
          </button>
        </div>
      </div>
    );
  }

  // ─── GAME END ──────────────────────────────────────────
  if (screen === "gameEnd") {
    return (
      <div style={base}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700;900&display=swap');
          @keyframes fadeIn { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
          @keyframes glow { 0%,100%{text-shadow:0 0 30px #c4956a44} 50%{text-shadow:0 0 60px #c4956aaa} }
          button:hover { filter: brightness(1.2); }
          * { box-sizing: border-box; }
        `}</style>
        <div style={{ textAlign: "center", animation: "fadeIn 1.5s ease", maxWidth: 560 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🇰🇷</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12,
            background: "linear-gradient(180deg, #f4e4c1, #c4956a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "glow 3s infinite" }}>
            한국사 영웅전 — 완결
          </h1>
          <div style={{ fontSize: 14, color: "#8a7a6a", lineHeight: 2, marginBottom: 24 }}>
            단군의 건국 (BC 2333)부터 이순신의 임진왜란 (1592)까지,<br/>
            약 4,000년의 역사를 함께 걸었습니다.
          </div>
          <div style={{
            background: "#151520", border: "1px solid #c4956a22", borderRadius: 12,
            padding: 20, marginBottom: 24, textAlign: "left"
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#c4956a", marginBottom: 12, textAlign: "center" }}>
              📜 여정의 기록
            </div>
            {CHAPTERS.map((ch, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0",
                borderBottom: i < CHAPTERS.length - 1 ? "1px solid #1a1a2e" : "none" }}>
                <span style={{ fontSize: 22 }}>{ch.player.emoji}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{ch.player.name} — {ch.era} ({ch.year})</div>
                  <div style={{ fontSize: 11, color: "#666" }}>{ch.title}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#555", lineHeight: 1.8, marginBottom: 20, fontStyle: "italic" }}>
            "역사를 잊은 민족에게 미래는 없다" — 단재 신채호
          </div>
          <button onClick={() => { setChapterIdx(0); setStoryLine(0); setScreen("title"); }}
            style={{ ...btn("#6B1A0A"), padding: "12px 40px" }}>
            처음으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return null;
}
