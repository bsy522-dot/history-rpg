// ============================================================
// minigames.js — 한국사 영웅전 v9 Minigames (Endurance / Quiz / Ritual)
// ============================================================

// --- Endurance ---
function startEndurance(){G.mode='endurance';G.endDay=0;G.endHP=100;$('endurance-game').classList.add('on');nextED()}
function nextED(){
  G.endDay++;if(G.endDay>7){$('endurance-game').classList.remove('on');const st=STAGES[G.stage];
    startDlg(st.post||[{s:'',t:'21일 시련 완료!'}],()=>{doRecruit(st);completeArea()});return}
  $('endurance-day').textContent=`${G.endDay*3}일차 / 21일`;$('endurance-fill').style.width=(G.endDay/7*100)+'%';
  const evts=[{p:'배가 고프다... 술을 먹어 인내하라!',l:10},{p:'동굴이 춥다... 마늘을 먹어 버혀라!',l:12},{p:'밖에서 새소리가... 참아라!',l:8},{p:'호랑이가 유혹: "나가자!"',l:15}];
  const ev=evts[Math.floor(Math.random()*evts.length)];$('endurance-prompt').textContent=ev.p;
  const btn=$('endurance-btn');btn.style.display='none';
  setTimeout(()=>{btn.style.display='block';btn.onclick=()=>{G.endHP-=ev.l*(.5+Math.random()*.5);sfx('def');$('endurance-prompt').textContent='인내 성공!';btn.style.display='none';setTimeout(nextED,800)}},500+Math.random()*800);
}

// --- Quiz ---
const QUIZZES=[
  // Ch1-2 기존 문제
  {q:'고조선의 건국 연도는?',a:['BC 2333년','BC 1000년','BC 500년','BC 108년'],c:0},
  {q:'단군왕검의 어머니는?',a:['선녀','웅녀','호녀','학녀'],c:1},
  {q:'고조선의 법률 이름은?',a:['팔조법금','살수대첩','화랑도','골품제'],c:0},
  {q:'환웅이 가져온 신물은?',a:['삼신기','천부인','천부경','삼태극'],c:1},
  {q:'고조선의 수도는?',a:['평양','서울','아사달','개경'],c:2},
  // Ch3-4 신규 문제
  {q:'위만조선의 수도는?',a:['왕검성','아사달','개경','평양'],c:0},
  {q:'고조선을 멸망시킨 나라는?',a:['한나라','진나라','흉노','고구려'],c:0},
  {q:'부여의 제천행사 이름은?',a:['영고','무천','동맹','소도'],c:0},
  {q:'동예의 특산물이 아닌 것은?',a:['비단','단궁','과하마','반어피'],c:0},
  {q:'삼한의 신성구역을 듰라 하는가?',a:['소도','신시','신궁','사직'],c:0},
  // v8 추가 문제 10개
  {q:'팔조법금에서 남아있는 조항은 몇 개인가?',a:['3개','5개','8개','1개'],c:0},
  {q:'비파형동검은 어느 지역의 특징적 유물인가?',a:['고조선','일본','중국 중원','동남아'],c:0},
  {q:'세형동검은 비파형동검에 비해 어떤 특징이 있는가?',a:['더 가늘고 한반도 독자적','더 크고 무겁다','청동이 아닌 철제','중국에서 수입'],c:0},
  {q:'고인돌은 어떤 시대의 대표적 유적인가?',a:['청동기시대','구석기시대','철기시대','삼국시대'],c:0},
  {q:'환웅이 내려온 신성한 장소를 무엇이라 하는가?',a:['신시','소도','사직','태학'],c:0},
  {q:'부여의 제천행사는 영고, 고구려는 동맹이다. 동예의 제천행사는?',a:['무천','소도','팔관회','연등회'],c:0},
  {q:'삼한에서 제사를 주관하는 사람을 무엇이라 하는가?',a:['천군','마립간','거서간','이사금'],c:0},
  {q:'부여의 법률에서 남의 물건을 훔치면 어떤 벌을 받는가?',a:['12배 배상(1책12가)','사형','추방','태형 50대'],c:0},
  {q:'위만은 원래 어느 나라 출신인가?',a:['연나라(중국)','흉노','일본','고구려'],c:0},
  {q:'삼한 중 가장 큰 세력으로 목지국을 중심으로 한 것은?',a:['마한','진한','변한','가야'],c:0},
  // v9.0 추가 문제 10개 (고구려/백제/신라/가야 건국 관련)
  {q:'고구려의 건국 연도는?',a:['BC 37년','BC 57년','BC 18년','AD 42년'],c:0},
  {q:'백제의 건국 연도는?',a:['BC 18년','BC 37년','BC 57년','AD 42년'],c:0},
  {q:'신라의 건국 연도는?',a:['BC 57년','BC 37년','BC 18년','AD 42년'],c:0},
  {q:'가야를 건국한 왕은 누구인가?',a:['수로왕','주몽','온조왕','혁거세'],c:0},
  {q:'주몽은 어디에서 탈출하여 고구려를 건국했는가?',a:['부여','옥저','동예','마한'],c:0},
  {q:'온조왕이 백제를 건국한 곳은?',a:['위례성','한양','공주','부여'],c:0},
  {q:'혁거세를 왕으로 추대한 세력은?',a:['6촌장','5부족','8부족','3한'],c:0},
  {q:'부여에서 왕이 죽으면 함께 묻는 풍습을 무엇이라 하는가?',a:['순장','화장','풍장','석장'],c:0},
  {q:'삼한 중 철 생산으로 유명하여 낙랑·왜에 수출한 곳은?',a:['변한','마한','진한','예맥'],c:0},
  {q:'변한은 후에 어느 나라로 발전하였는가?',a:['가야','백제','신라','고구려'],c:0}
];
let quizIdx=0,quizCorrect=0;
function startQuiz(cb){G.quizCb=cb;quizIdx=0;quizCorrect=0;G._quizSet=[...QUIZZES].sort(()=>Math.random()-.5).slice(0,3);showQuizQ();$('quiz-screen').classList.add('on');G.mode='quiz'}
function showQuizQ(){
  if(quizIdx>=3){$('quiz-screen').classList.remove('on');
    if(quizCorrect>=2){sfx('quest');startDlg([{s:'현자',t:`${quizCorrect}/3 정답! 지혜로운 자이다.`}],()=>{if(G.quizCb)G.quizCb()})}
    else startDlg([{s:'현자',t:`아직 부족하다. 다시 도전하라.`}],()=>startQuiz(G.quizCb));return}
  const q=G._quizSet[quizIdx];$('quiz-question').textContent=`문제 ${quizIdx+1}/3: ${q.q}`;
  $('quiz-answers').innerHTML=q.a.map((a,i)=>`<button class="quiz-btn" onclick="answerQuiz(${i})">${a}</button>`).join('');
}
window.answerQuiz=function(i){const q=G._quizSet[quizIdx];const btns=$('quiz-answers').querySelectorAll('.quiz-btn');btns.forEach((b,j)=>{b.disabled=true;if(j===q.c)b.classList.add('correct');if(j===i&&j!==q.c)b.classList.add('wrong')});if(i===q.c){quizCorrect++;sfx('sel')}else sfx('miss');setTimeout(()=>{quizIdx++;showQuizQ()},1000)};

// --- Ritual ---
function startRitual(cb){G.ritualCb=cb;G.ritualRound=0;G.ritualSuccess=0;G.ritualAngle=0;$('ritual-game').classList.add('on');G.mode='ritual';$('ritual-round').textContent='1 / 5';animateRitual()}
let ritualAF=null;
function animateRitual(){G.ritualAngle+=0.03;if(G.ritualAngle>Math.PI*2)G.ritualAngle-=Math.PI*2;const m=$('ritual-marker'),r=60;m.style.left=(80+Math.cos(G.ritualAngle)*r-8)+'px';m.style.top=(80+Math.sin(G.ritualAngle)*r-8)+'px';if(G.mode==='ritual')ritualAF=requestAnimationFrame(animateRitual)}
window.ritualTap=function(){if(G.mode!=='ritual')return;let diff=Math.abs(G.ritualAngle-((-Math.PI/2+Math.PI*2)%(Math.PI*2)));if(diff>Math.PI)diff=Math.PI*2-diff;if(diff<0.4){G.ritualSuccess++;sfx('sel')}else sfx('miss');G.ritualRound++;$('ritual-round').textContent=`${G.ritualRound+1} / 5`;$('ritual-score').textContent=`성공: ${G.ritualSuccess}`;if(G.ritualRound>=5){cancelAnimationFrame(ritualAF);$('ritual-game').classList.remove('on');if(G.ritualSuccess>=3){sfx('quest');startDlg([{s:'',t:'제천의식 성공!'}],()=>{if(G.ritualCb)G.ritualCb()})}else startDlg([{s:'',t:'부족하다... 다시 시도한다.'}],()=>startRitual(G.ritualCb))}};
