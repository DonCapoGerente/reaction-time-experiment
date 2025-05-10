// A1
let trials = [], errors = 0, startTime = null, currentTrial = 0;
const SCRIPT_URL = 'https://script.google.com/.../exec';

function randomPause(min=2000,max=6000){return Math.random()*(max-min)+min;}

function sendData(payload){
  fetch(SCRIPT_URL,{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify(payload)
  });
}

document.getElementById('startButton').onclick = () => runSimpleRT();

document.addEventListener('keydown',e=>{
  if(!startTime){ errors++; return; }
  const rt = performance.now()-startTime;
  trials.push(rt);
  sendData({ subjectId:'S01', runType:currentRun.name, trial:currentTrial, rt, error:false });
  startTime = null; updateDisplay(); setTimeout(currentRun, randomPause());
});

function updateDisplay(){
  const m = trials.reduce((a,b)=>a+b)/trials.length;
  const sd = Math.sqrt(trials.map(x=>Math.pow(x-m,2)).reduce((a,b)=>a+b)/trials.length);
  document.getElementById('results').textContent =
    `Trials:${trials.length} Errors:${errors} Mean:${m.toFixed(1)}ms SD:${sd.toFixed(1)}ms`;
}

// A1:
function runSimpleRT(){ currentRun=runSimpleRT; trials=[],errors=0; currentTrial=0;
  function show(){ currentTrial++; const rect=document.getElementById('stimulus');
    let t0=performance.now(); const fade=()=>{
      let t=(performance.now()-t0)/3000;
      if(t<1){ rect.style.backgroundColor=`rgba(0,0,0,${t})`; requestAnimationFrame(fade); }
      else startTime=performance.now();
    }; fade();
  }
  show();
}
