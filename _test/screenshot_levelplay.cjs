const puppeteer = require('C:\\Users\\user\\AppData\\Local\\Temp\\pp\\node_modules\\puppeteer');
(async () => {
  const browser = await puppeteer.launch({args:['--no-sandbox','--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setViewport({width:1280, height:720});

  // 1) LevelPlay 메인
  await page.goto('http://localhost:5070/', {waitUntil:'networkidle2', timeout:15000});
  await new Promise(r=>setTimeout(r,5000));
  await page.screenshot({path:'D:\\AI\\04_게임\\한국사RPG\\_test\\ss_levelplay_main.png'});
  console.log('1/2 done: ss_levelplay_main.png');

  // 2) RPG v8 타이틀
  await page.goto('http://localhost:5070/games/korean-rpg-v8/', {waitUntil:'networkidle2', timeout:15000});
  await new Promise(r=>setTimeout(r,5000));
  await page.screenshot({path:'D:\\AI\\04_게임\\한국사RPG\\_test\\ss_levelplay_rpg_title.png'});
  console.log('2/2 done: ss_levelplay_rpg_title.png');

  await browser.close();
  console.log('ALL OK');
})().catch(e=>{console.error('ERR',e.message);process.exit(1);});
