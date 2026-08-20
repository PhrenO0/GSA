/* 참참참 vs Claude — 웹캠 얼굴 방향 인식 게임 (외부 라이브러리 없음) */
(() => {
'use strict';

// ---------- DOM ----------
const $ = id => document.getElementById(id);
const video = $('video'), overlay = $('overlay');
const camHint = $('camHint'), dirBadge = $('dirBadge');
const statusEl = $('status'), talkEl = $('claudeTalk');
const handEl = $('claudeHand'), faceEl = $('claudeFace'), claudePanel = $('claudePanel');
const beats = [$('beat1'), $('beat2'), $('beat3')];
const btnCam = $('btnCam'), btnCalib = $('btnCalib'), btnStart = $('btnStart'), btnReset = $('btnReset');
const kbMode = $('kbMode'), sfxOn = $('sfx');
const sRound = $('sRound'), sWin = $('sWin'), sStreak = $('sStreak'), sBest = $('sBest');
const playerLives = $('playerLives'), claudeScore = $('claudeScore');

// ---------- 설정 ----------
const CFG = {
  procW: 160, procH: 120,      // 분석용 축소 해상도
  minSkinPx: 90,               // 얼굴로 인정할 최소 스킨 픽셀 수
  thresholdRatio: 0.055,       // 중앙 대비 이동 판정 임계 (프레임 너비 비율)
  smooth: 5,                   // 중앙값 스무딩 창
  beatStart: 820,              // 첫 라운드 박자 간격(ms)
  beatMin: 430,
  beatStep: 28,                // 라운드마다 빨라지는 양
  revealHold: 1500,            // 결과 표시 시간
  startLives: 3
};

// ---------- 상태 ----------
const S = {
  stream:null, running:false, calibrated:false, phase:'idle',
  baseX:null, baseY:null, spread:0,
  samples:[], dir:'none', lockedDir:'none',
  round:0, wins:0, streak:0, best:0, lives:CFG.startLives, caught:0,
  history:[],           // 플레이어가 실제로 돌린 방향 기록
  timers:[]
};

// ---------- 대사 ----------
const LINES = {
  ready:['자, 간다. 눈 크게 떠.','이번엔 못 피할걸?','너 방금 오른쪽 갔지? 기억해뒀어.','고개 준비. 참참참 들어간다.','손목 풀었다.'],
  win:['잡았다! 방금 티 났어.','읽혔어. 너 패턴 단순해.','내 예측 적중.','거봐, 거기 갈 줄 알았어.','한 번 더 갈까?'],
  lose:['어라, 피했네.','운 좋았다.','인정. 반사신경 좋네.','이번 건 내 실수.','다음 판은 안 봐준다.'],
  none:['고개를 안 돌렸잖아. 무효야, 다시.','움직여야 게임이지. 다시 간다.'],
  over_win:['내가 이겼다. 재도전?','3번 잡았어. 게임 끝!'],
  over_lose:['…네가 이겼어. 잘하네.','완패 인정. 리셋하고 다시 붙자.']
};
const pick = a => a[(Math.random()*a.length)|0];

// ---------- 사운드 ----------
let actx = null;
function beep(freq=440, dur=0.09, vol=0.15){
  if(!sfxOn.checked) return;
  try{
    actx = actx || new (window.AudioContext||window.webkitAudioContext)();
    if(actx.state === 'suspended') actx.resume();
    const o = actx.createOscillator(), g = actx.createGain();
    o.type='square'; o.frequency.value=freq;
    g.gain.setValueAtTime(vol, actx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime+dur);
    o.connect(g).connect(actx.destination);
    o.start(); o.stop(actx.currentTime+dur+0.02);
  }catch(e){}
}

// ---------- 웹캠 ----------
const proc = document.createElement('canvas');
proc.width = CFG.procW; proc.height = CFG.procH;
const pctx = proc.getContext('2d', { willReadFrequently:true });
const octx = overlay.getContext('2d');

function camBlocked(reason, detail){
  camHint.innerHTML = '<b>'+reason+'</b><br>'+detail+'<br><br>키보드 모드로 전환했습니다 — ← → 키로 고개를 돌리세요.';
  camHint.classList.remove('hide');
  kbMode.checked = true; kbMode.dispatchEvent(new Event('change'));
  talk('카메라가 막혔네. 키보드로 붙자 — ← → 로 고개 돌려.');
  showDiag();
}

async function startCam(){
  // 보안 컨텍스트(https / localhost)가 아니면 카메라 API 자체가 존재하지 않는다
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    camBlocked('이 페이지에는 카메라 API가 없습니다',
      window.isSecureContext
        ? '브라우저가 이 페이지에 카메라 기능을 허용하지 않았습니다.'
        : '카메라는 https 또는 localhost 에서만 열립니다. 지금 주소는 ' + location.protocol + ' 입니다.');
    return;
  }
  try{
    S.stream = await navigator.mediaDevices.getUserMedia({
      video:{ width:{ideal:640}, height:{ideal:480}, facingMode:'user' }, audio:false
    });
    video.srcObject = S.stream;
    await video.play();
    camHint.classList.add('hide');
    btnCam.disabled = true; btnCalib.disabled = false;
    setStatus('얼굴을 화면 중앙에 두고 "얼굴 정렬"을 누르세요');
    S.running = true;
    loop();
  }catch(err){
    const why = {
      NotAllowedError: window.top !== window.self
        ? '이 페이지가 다른 사이트 안에 삽입되어 있어 카메라 권한이 차단되었습니다. localhost 에서 직접 열어주세요.'
        : '카메라 권한이 거부되었습니다. 주소창 왼쪽 자물쇠 → 카메라 → 허용으로 바꾼 뒤 새로고침하세요.',
      NotFoundError: '연결된 카메라를 찾지 못했습니다.',
      NotReadableError: '다른 앱(줌, 팀즈, 카메라 앱 등)이 카메라를 쓰고 있습니다. 그 앱을 끄고 다시 시도하세요.',
      OverconstrainedError: '요청한 해상도를 지원하지 않는 카메라입니다.',
      SecurityError: '브라우저 보안 정책으로 차단되었습니다.'
    }[err.name] || err.message;
    camBlocked('카메라를 열 수 없습니다 (' + err.name + ')', why);
  }
}

async function showDiag(){
  const d = $('diag'); if(!d) return;
  d.hidden = false;
  let perm = '확인 불가', cams = '확인 불가';
  try{ perm = (await navigator.permissions.query({name:'camera'})).state; }catch(e){}
  try{
    const list = await navigator.mediaDevices.enumerateDevices();
    cams = list.filter(v => v.kind === 'videoinput').length + '개';
  }catch(e){}
  d.textContent = [
    '카메라 진단',
    '주소            ' + location.protocol + '//' + location.host,
    '보안 컨텍스트    ' + (window.isSecureContext ? '예 (카메라 가능)' : '아니오 (https/localhost 필요)'),
    '다른 페이지 안   ' + (window.top !== window.self ? '예 (iframe — 권한이 막힐 수 있음)' : '아니오'),
    'mediaDevices    ' + (navigator.mediaDevices ? '있음' : '없음'),
    '카메라 권한      ' + perm,
    '카메라 장치      ' + cams
  ].join('\n');
}

// ---------- 스킨 픽셀 기반 얼굴 위치 추정 ----------
function analyzeFrame(){
  // 좌우 반전해서 그린다 → 캔버스 좌표 = 사용자가 보는 거울 화면 좌표
  pctx.save();
  pctx.translate(CFG.procW, 0); pctx.scale(-1, 1);
  pctx.drawImage(video, 0, 0, CFG.procW, CFG.procH);
  pctx.restore();

  const d = pctx.getImageData(0, 0, CFG.procW, CFG.procH).data;
  let sx=0, sy=0, n=0;
  for(let y=0; y<CFG.procH; y+=2){
    for(let x=0; x<CFG.procW; x+=2){
      const i = (y*CFG.procW + x) * 4;
      const r=d[i], g=d[i+1], b=d[i+2];
      const Y  = 0.299*r + 0.587*g + 0.114*b;
      const Cb = 128 - 0.168736*r - 0.331264*g + 0.5*b;
      const Cr = 128 + 0.5*r - 0.418688*g - 0.081312*b;
      if(Y > 55 && Cb >= 77 && Cb <= 130 && Cr >= 132 && Cr <= 178 && r > g && r > b){
        // 상단(얼굴/머리) 가중치
        const w = y < CFG.procH*0.7 ? 1 : 0.35;
        sx += x*w; sy += y*w; n += w;
      }
    }
  }
  if(n < CFG.minSkinPx/2) return null;
  return { x: sx/n, y: sy/n, n };
}

function median(arr){
  const a = arr.slice().sort((p,q)=>p-q);
  return a[(a.length/2)|0];
}

function loop(){
  if(!S.running) return;
  const f = analyzeFrame();
  if(f){
    S.samples.push(f.x);
    if(S.samples.length > CFG.smooth) S.samples.shift();
    const mx = median(S.samples);
    if(S.calibrated && !kbMode.checked){
      const thr = Math.max(CFG.procW*CFG.thresholdRatio, S.spread*2.2);
      const dx = mx - S.baseX;
      S.dir = dx >  thr ? 'right' : dx < -thr ? 'left' : 'center';
    }
    drawOverlay(mx, f.y);
  }else{
    if(!kbMode.checked) S.dir = 'none';
    octx.clearRect(0,0,overlay.width,overlay.height);
  }
  updateBadge();
  requestAnimationFrame(loop);
}

function drawOverlay(mx, my){
  if(overlay.width !== overlay.clientWidth){
    overlay.width = overlay.clientWidth; overlay.height = overlay.clientHeight;
  }
  const W = overlay.width, H = overlay.height;
  const px = mx / CFG.procW * W, py = my / CFG.procH * H;
  octx.clearRect(0,0,W,H);
  // 십자 마커 (오버레이는 CSS로 반전되므로 텍스트는 그리지 않음)
  octx.strokeStyle = '#4cc4ff'; octx.lineWidth = 2;
  octx.beginPath(); octx.arc(px, py, 16, 0, Math.PI*2); octx.stroke();
  if(S.calibrated && S.baseX != null){
    const bx = S.baseX / CFG.procW * W;
    const thr = Math.max(CFG.procW*CFG.thresholdRatio, S.spread*2.2) / CFG.procW * W;
    octx.strokeStyle = 'rgba(255,255,255,.25)'; octx.lineWidth = 1;
    octx.setLineDash([6,6]);
    [bx-thr, bx+thr].forEach(x => { octx.beginPath(); octx.moveTo(x,0); octx.lineTo(x,H); octx.stroke(); });
    octx.setLineDash([]);
  }
}

const DIR_KO = { left:'⬅ 왼쪽', right:'오른쪽 ➡', center:'가운데', none:'얼굴 미인식' };
function updateBadge(){ dirBadge.textContent = DIR_KO[S.dir] || '–'; }

// ---------- 캘리브레이션 ----------
function calibrate(){
  if(kbMode.checked){
    S.calibrated = true; btnStart.disabled = false;
    setStatus('키보드 모드 준비 완료. 게임 시작을 누르세요.');
    return;
  }
  S.calibrated = false; btnCalib.disabled = true;
  const xs = [];
  let t = 3;
  setStatus('정면을 보세요… ' + t);
  const iv = setInterval(() => {
    const f = analyzeFrame();
    if(f) xs.push(f.x);
    t -= 0.1;
    if(t > 0){ setStatus('정면을 보세요… ' + t.toFixed(1)); return; }
    clearInterval(iv);
    btnCalib.disabled = false;
    if(xs.length < 8){
      setStatus('얼굴을 인식하지 못했습니다. 조명을 밝게 하거나 키보드 모드를 쓰세요.');
      return;
    }
    S.baseX = xs.reduce((a,b)=>a+b,0) / xs.length;
    const varr = xs.reduce((a,b)=>a+(b-S.baseX)**2, 0) / xs.length;
    S.spread = Math.sqrt(varr);
    S.calibrated = true;
    btnStart.disabled = false;
    beep(880, .12);
    setStatus('정렬 완료! 고개를 좌우로 돌려 배지를 확인한 뒤 시작하세요.');
    talk('좋아, 네 정면 위치 외웠어.');
  }, 100);
}

// ---------- Claude AI (1차 마르코프 예측) ----------
function claudeChoose(){
  const h = S.history;
  const eps = 0.22;                       // 무작위성(공정성)
  if(h.length >= 3 && Math.random() > eps){
    const last = h[h.length-1];
    let L=0, R=0;
    for(let i=0; i<h.length-1; i++){
      if(h[i] === last){ h[i+1] === 'left' ? L++ : R++; }
    }
    if(L !== R) return L > R ? 'left' : 'right';   // 예측 지점을 찌른다
    // 전체 편향으로 폴백
    const tl = h.filter(v=>v==='left').length;
    if(tl*2 !== h.length) return tl*2 > h.length ? 'left' : 'right';
  }
  return Math.random() < 0.5 ? 'left' : 'right';
}

// ---------- 라운드 진행 ----------
function later(fn, ms){ S.timers.push(setTimeout(fn, ms)); }
function clearTimers(){ S.timers.forEach(clearTimeout); S.timers = []; }

function startGame(){
  clearTimers();
  S.round = 0; S.wins = 0; S.streak = 0; S.lives = CFG.startLives; S.caught = 0; S.history = [];
  renderScore();
  btnStart.disabled = true;
  nextRound();
}

function nextRound(){
  if(S.lives <= 0) return;
  S.round++; S.phase = 'beat';
  renderScore();
  resetVisuals();
  talk(pick(LINES.ready));
  setStatus('준비…');

  const gap = Math.max(CFG.beatMin, CFG.beatStart - (S.round-1)*CFG.beatStep);
  later(() => runBeat(0, gap), 700);
}

function runBeat(i, gap){
  if(i < 2){
    beats[i].classList.add('on');
    beep(520 + i*80, .07);
    setStatus('참'.repeat(i+1));
    later(() => { beats[i].classList.remove('on'); }, gap*0.6);
    later(() => runBeat(i+1, gap), gap);
  }else{
    // 마지막 "참!" — 이 순간의 방향을 그대로 채택 (동시 판정)
    S.lockedDir = S.dir;
    const attack = claudeChoose();
    beats[2].classList.add('hit');
    beep(760, .16, .2);
    point(attack);
    setStatus('참!');
    later(() => judge(attack), 260);
  }
}

function judge(attack){
  S.phase = 'reveal';
  const me = S.lockedDir;
  if(me !== 'left' && me !== 'right'){
    setStatus('무효 — 고개를 돌리지 않았어요', '');
    talk(pick(LINES.none));
    later(() => { S.round--; nextRound(); }, CFG.revealHold);
    return;
  }
  S.history.push(me);
  if(S.history.length > 40) S.history.shift();

  if(me === attack){
    S.lives--; S.caught++; S.streak = 0;
    faceEl.classList.add('win','shake');
    setStatus(`걸렸다! Claude ${DIR_KO[attack]} / 나 ${DIR_KO[me]}`, 'lose');
    talk(pick(LINES.win));
    beep(180, .3, .2);
  }else{
    S.wins++; S.streak++; S.best = Math.max(S.best, S.streak);
    faceEl.classList.add('lose');
    setStatus(`성공! Claude ${DIR_KO[attack]} / 나 ${DIR_KO[me]}`, 'win');
    talk(pick(LINES.lose));
    beep(980, .12); later(()=>beep(1240,.14), 110);
  }
  renderScore();

  later(() => {
    if(S.lives <= 0) gameOver();
    else nextRound();
  }, CFG.revealHold);
}

function gameOver(){
  S.phase = 'over';
  faceEl.classList.add('win');
  setStatus(`게임 오버 — 성공 ${S.wins}회 / 최고 연속 ${S.best}회`, 'lose');
  talk(pick(S.wins >= 8 ? LINES.over_lose : LINES.over_win));
  btnStart.disabled = false;
  btnStart.textContent = '다시 시작';
}

// ---------- 표시 ----------
function point(dir){
  handEl.classList.add('point');
  handEl.classList.toggle('left', dir === 'left');
  claudePanel.classList.add(dir === 'left' ? 'attack-left' : 'attack-right');
}
function resetVisuals(){
  beats.forEach(b => b.classList.remove('on','hit'));
  handEl.classList.remove('point','left');
  claudePanel.classList.remove('attack-left','attack-right');
  faceEl.classList.remove('win','lose','shake');
}
function setStatus(t, cls=''){ statusEl.textContent = t; statusEl.className = 'status ' + cls; }
function talk(t){ talkEl.textContent = t; }
function renderScore(){
  sRound.textContent = S.round; sWin.textContent = S.wins;
  sStreak.textContent = S.streak; sBest.textContent = S.best;
  playerLives.textContent = '목숨 ' + ('❤️'.repeat(Math.max(0,S.lives)) || '없음');
  claudeScore.textContent = '획득 ' + S.caught;
}

// ---------- 키보드 모드 ----------
let kbTimer = null;
window.addEventListener('keydown', e => {
  if(!kbMode.checked) return;
  if(e.key === 'ArrowLeft') S.dir = 'left';
  else if(e.key === 'ArrowRight') S.dir = 'right';
  else return;
  e.preventDefault();
  updateBadge();
  clearTimeout(kbTimer);
  kbTimer = setTimeout(() => { S.dir = 'center'; updateBadge(); }, 900);
});
kbMode.addEventListener('change', () => {
  if(kbMode.checked){
    S.calibrated = true; btnStart.disabled = false; S.dir = 'center';
    setStatus('키보드 모드 — ← → 로 고개를 돌리세요.');
  }else{
    S.dir = 'none';
    if(S.baseX == null){ S.calibrated = false; btnStart.disabled = true; setStatus('웹캠 정렬이 필요합니다.'); }
  }
  updateBadge();
});

// ---------- 버튼 ----------
btnCam.addEventListener('click', startCam);
const btnDiag = $('btnDiag'); if(btnDiag) btnDiag.addEventListener('click', showDiag);
btnCalib.addEventListener('click', calibrate);
btnStart.addEventListener('click', startGame);
btnReset.addEventListener('click', () => {
  clearTimers(); resetVisuals();
  S.round=0; S.wins=0; S.streak=0; S.lives=CFG.startLives; S.caught=0; S.history=[]; S.phase='idle';
  renderScore(); btnStart.textContent = '게임 시작';
  btnStart.disabled = !S.calibrated;
  setStatus('리셋 완료.'); talk('언제든 다시 붙자.');
});

renderScore();
})();
