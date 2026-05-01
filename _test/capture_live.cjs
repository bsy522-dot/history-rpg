const puppeteer = require('C:/Users/user/AppData/Local/Temp/pp/node_modules/puppeteer');

(async () => {
  console.log('[START] Puppeteer 실행');
  const b = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-web-security', '--disable-dev-shm-usage'],
    headless: true
  });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 720 });

  // 콘솔 에러 수집
  const errors = [];
  p.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  p.on('pageerror', err => errors.push(err.message));

  // 1. 타이틀
  console.log('[1/3] 페이지 로드 중...');
  await p.goto('http://localhost:8765/korean-rpg-v8.html', {
    waitUntil: 'networkidle0',
    timeout: 20000
  });
  await new Promise(r => setTimeout(r, 4000));
  await p.screenshot({ path: 'D:/AI/04_게임/한국사RPG/_test/live_01_title.png' });
  console.log('[1/3] live_01_title.png 저장 완료');

  // 2. EP1 클릭 후 전투
  console.log('[2/3] EP.1 버튼 클릭...');
  const clicked = await p.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) {
      if (b.textContent.includes('EP.1') || b.textContent.includes('환웅')) {
        console.log('클릭 대상:', b.textContent.trim());
        b.click();
        return b.textContent.trim();
      }
    }
    return null;
  });
  console.log('[2/3] 클릭된 버튼:', clicked || '(없음)');

  // 오프닝 다이얼로그 클릭으로 진행 (최대 10번, 1초 간격)
  for (let i = 0; i < 10; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const hasDialogue = await p.evaluate(() => {
      const txt = document.body.innerText;
      return txt.includes('터치하여 계속') || txt.includes('계속');
    });
    if (hasDialogue) {
      await p.click('body');
      console.log(`  다이얼로그 클릭 ${i+1}회`);
    }
  }
  await new Promise(r => setTimeout(r, 3000));
  await p.screenshot({ path: 'D:/AI/04_게임/한국사RPG/_test/live_02_battle.png' });
  console.log('[2/3] live_02_battle.png 저장 완료');

  // 3. 마을 씬: 추가로 최대 20회 다이얼로그 클릭 + 전투 진행 대기
  console.log('[3/3] 마을 씬 대기 (전투/다이얼로그 클릭 진행)...');
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 1500));
    await p.click('body');
    const txt = await p.evaluate(() => document.body.innerText.slice(0, 50));
    console.log(`  ${i+1}회 클릭 | 화면: ${txt.replace(/\n/g,' ').slice(0,50)}`);
  }
  await new Promise(r => setTimeout(r, 3000));
  await p.screenshot({ path: 'D:/AI/04_게임/한국사RPG/_test/live_03_town.png' });
  console.log('[3/3] live_03_town.png 저장 완료');

  await b.close();

  // 결과 보고
  console.log('\n=== 완료 ===');
  if (errors.length > 0) {
    console.log('콘솔 에러 (' + errors.length + '건):');
    errors.forEach((e, i) => console.log(`  [${i+1}] ${e}`));
  } else {
    console.log('콘솔 에러 없음');
  }
})().catch(err => {
  console.error('[FATAL]', err.message);
  process.exit(1);
});
