// ============================================================
// audio.js — 한국사 영웅전 v7 Audio System
// ============================================================
const AC=window.AudioContext||window.webkitAudioContext;
let ac=null,mGain=null,sGain=null;

function initAudio(){if(ac)return;ac=new AC();mGain=ac.createGain();mGain.gain.value=0.12;mGain.connect(ac.destination);sGain=ac.createGain();sGain.gain.value=0.25;sGain.connect(ac.destination)}

function pn(f,d,t='square',g=sGain){if(!ac)return;const o=ac.createOscillator(),gn=ac.createGain();o.type=t;o.frequency.setValueAtTime(f,ac.currentTime);gn.gain.setValueAtTime(.25,ac.currentTime);gn.gain.exponentialRampToValueAtTime(.001,ac.currentTime+d);o.connect(gn);gn.connect(g);o.start();o.stop(ac.currentTime+d)}

function sfx(t){
  if(!ac)return;
  switch(t){
    case'hit':pn(200,.1,'sawtooth');pn(100,.15);break;
    case'crit':pn(400,.05,'sawtooth');pn(600,.1);pn(300,.15,'sawtooth');break;
    case'heal':pn(400,.1,'sine');pn(500,.1,'sine');pn(600,.15,'sine');break;
    case'miss':pn(150,.2,'sine');break;
    case'lvl':[400,500,600,800].forEach((f,i)=>setTimeout(()=>pn(f,.2,'sine'),i*100));break;
    case'vic':[523,659,784,1047].forEach((f,i)=>setTimeout(()=>pn(f,.3,'sine'),i*150));break;
    case'def':pn(300,.15,'triangle');pn(400,.1,'triangle');break;
    case'skill':pn(500,.05,'sine');pn(700,.1,'sine');pn(900,.15,'sine');break;
    case'menu':pn(800,.05,'sine');break;
    case'sel':pn(600,.08,'sine');pn(900,.08,'sine');break;
    case'lose':[300,250,200,150].forEach((f,i)=>setTimeout(()=>pn(f,.4,'sawtooth'),i*200));break;
    case'move':pn(350,.06,'triangle');pn(450,.06,'triangle');break;
    case'phase':[400,500,600].forEach((f,i)=>setTimeout(()=>pn(f,.15,'sine'),i*120));break;
    case'quest':pn(523,.1,'sine');pn(659,.1,'sine');pn(784,.2,'sine');break;
    // --- New terrain SFX ---
    case'water_move':pn(100,.1,'sine');pn(150,.1,'sine');break;
    case'forest_move':{
      const buf=ac.createBuffer(1,ac.sampleRate*0.08,ac.sampleRate);
      const d=buf.getChannelData(0);
      for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*0.25;
      const src=ac.createBufferSource();src.buffer=buf;
      const gn=ac.createGain();gn.gain.setValueAtTime(.2,ac.currentTime);
      gn.gain.exponentialRampToValueAtTime(.001,ac.currentTime+0.08);
      src.connect(gn);gn.connect(sGain);src.start();break;
    }
    case'fort_move':pn(80,.12,'triangle');break;
    case'reinforce':pn(500,.15,'sine');setTimeout(()=>pn(600,.15,'sine'),150);setTimeout(()=>pn(700,.15,'sine'),300);break;
  }
}

let bgmI=null;
const BGMP={
  map:[262,294,330,349,330,294,262,247],
  battle:[330,330,392,392,440,392,330,262],
  boss:[220,220,262,220,196,220,262,220],
  peace:[349,330,294,262,294,330,349,392],
  kingdom:[262,330,392,523,392,330,262,196],
  epic:[392,440,523,587,523,440,392,330],
  // New BGM patterns
  tension:[196,220,196,165,196,220,262,220],
  village:[330,349,392,349,330,294,262,294],
  victory_fanfare:[523,523,659,659,784,784,1047,1047],
  // Extended chord progression patterns
  ch1_explore:[262,330,392,330,349,294,262,247,262,330,392,440,392,330,294,262],
  ch2_kingdom:[330,392,523,392,440,349,330,262,294,349,440,349,392,330,262,196],
  ch3_war:[220,262,330,262,220,196,165,196,220,262,294,330,294,262,220,196],
  ch4_epic:[392,494,587,494,523,440,392,330,349,440,523,587,659,587,523,440],
  boss_intense:[220,262,330,220,196,262,330,392,262,330,392,440,330,262,220,196],
  shop_calm:[349,392,440,392,349,330,294,262,294,330,349,392,440,523,440,392]
};

function playChord(notes,d=.3,t='sine'){notes.forEach(f=>pn(f,d,t,mGain))}

function startBGM(p){stopBGM();if(!ac)return;const n=BGMP[p]||BGMP.map;let i=0;bgmI=setInterval(()=>{pn(n[i%n.length],.25,'sine',mGain);if(i%4===0&&n.length>8)pn(n[i%n.length]/2,.4,'triangle',mGain);i++},280)}
function stopBGM(){if(bgmI){clearInterval(bgmI);bgmI=null}}

// Boss intensity boost
function setBGMIntensity(level){
  if(!mGain)return;
  mGain.gain.value = level==='boss' ? 0.18 : 0.12;
}
