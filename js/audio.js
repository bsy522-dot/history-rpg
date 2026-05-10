// ============================================================
// audio.js — 한국사 영웅전 v9 Audio System
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
  shop_calm:[349,392,440,392,349,330,294,262,294,330,349,392,440,523,440,392],
  // v9.0 dawn pattern
  dawn:[262,294,330,392,440,392,330,294,349,392,440,523,440,392,349,330]
};

function playChord(notes,d=.3,t='sine'){notes.forEach(f=>pn(f,d,t,mGain))}

// v9.0: playChordProgression for richer BGM harmonics
function playChordProgression(key,type){
  if(!ac)return;
  const roots={C:262,D:294,E:330,F:349,G:392,A:440,B:494};
  const root=roots[key]||262;
  const progressions={
    major:[[1,1.25,1.5],[1.5,1.875,2.25],[1.33,1.67,2],[1,1.25,1.5]],
    minor:[[1,1.2,1.5],[1.33,1.6,2],[1.5,1.8,2.25],[1,1.2,1.5]],
    epic:[[1,1.25,1.5,2],[1.33,1.67,2,2.67],[1.5,1.875,2.25,3],[1,1.25,1.5,2]]
  };
  const prog=progressions[type]||progressions.major;
  prog.forEach((chord,i)=>{
    setTimeout(()=>{
      chord.forEach(mul=>pn(root*mul,.5,'sine',mGain));
    },i*600);
  });
}

function startBGM(p){stopBGM();if(!ac)return;const n=BGMP[p]||BGMP.map;let i=0;bgmI=setInterval(()=>{pn(n[i%n.length],.25,'sine',mGain);if(i%4===0&&n.length>8)pn(n[i%n.length]/2,.4,'triangle',mGain);i++},280)}
function stopBGM(){if(bgmI){clearInterval(bgmI);bgmI=null}}

// Boss intensity boost
function setBGMIntensity(level){
  if(!mGain)return;
  mGain.gain.value = level==='boss' ? 0.18 : 0.12;
}

// v9.0: Ambient SFX for environment sounds
function ambientSFX(type){
  if(!ac)return;
  switch(type){
    case'wind':{
      // White noise filtered with bandpass for wind
      const buf=ac.createBuffer(1,ac.sampleRate*1.5,ac.sampleRate);
      const d=buf.getChannelData(0);
      for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1);
      const src=ac.createBufferSource();src.buffer=buf;
      const bp=ac.createBiquadFilter();bp.type='bandpass';bp.frequency.value=400;bp.Q.value=0.5;
      const gn=ac.createGain();gn.gain.setValueAtTime(0,ac.currentTime);
      gn.gain.linearRampToValueAtTime(0.06,ac.currentTime+0.3);
      gn.gain.linearRampToValueAtTime(0.03,ac.currentTime+0.8);
      gn.gain.linearRampToValueAtTime(0,ac.currentTime+1.5);
      src.connect(bp);bp.connect(gn);gn.connect(sGain);src.start();src.stop(ac.currentTime+1.5);
      break;
    }
    case'water':{
      // Bubbling water: low-frequency oscillators with random modulation
      for(let i=0;i<5;i++){
        setTimeout(()=>{
          const f=80+Math.random()*120;
          pn(f,0.2+Math.random()*0.15,'sine');
        },i*200+Math.random()*100);
      }
      break;
    }
    case'birds':{
      // Bird chirps: high-frequency short tones
      const chirps=[[1200,0.05],[1400,0.04],[1100,0.06],[1500,0.03],[1300,0.05]];
      chirps.forEach(([f,dur],i)=>{
        setTimeout(()=>pn(f,dur,'sine'),i*180+Math.random()*80);
      });
      break;
    }
    case'fire':{
      // Crackling fire: noise bursts
      for(let i=0;i<8;i++){
        setTimeout(()=>{
          const buf=ac.createBuffer(1,ac.sampleRate*0.04,ac.sampleRate);
          const d=buf.getChannelData(0);
          for(let j=0;j<d.length;j++)d[j]=(Math.random()*2-1)*0.3;
          const src=ac.createBufferSource();src.buffer=buf;
          const hp=ac.createBiquadFilter();hp.type='highpass';hp.frequency.value=2000;
          const gn=ac.createGain();gn.gain.setValueAtTime(0.08,ac.currentTime);
          gn.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.04);
          src.connect(hp);hp.connect(gn);gn.connect(sGain);src.start();
        },i*120+Math.random()*60);
      }
      break;
    }
  }
}
