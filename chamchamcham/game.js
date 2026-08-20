/* 참참참 vs Claude — 웹캠 고개 방향 인식 게임 (외부 라이브러리 없음)
 *
 * 인식 원리
 *  1. 프레임을 160x120 으로 줄이고 좌우 반전해 그린다 (캔버스 좌표 = 거울 화면 좌표).
 *  2. YCbCr 스킨톤 필터로 얼굴 픽셀을 고르고 무게중심 x 를 구한다.
 *  3. 고개를 "회전"하면 머리 실루엣은 제자리여도 보이는 살색 영역이 한쪽으로 쏠리므로
 *     이 무게중심이 움직인다. 이동이든 회전이든 신호는 같은 스칼라 하나다.
 *  4. 방향에 따른 부호는 사람/카메라마다 다르므로 고정하지 않고
 *     정면·왼쪽·오른쪽 세 자세를 실제로 학습해서 기준값으로 삼는다.
 */
(() => {
'use strict';

const $ = id => document.getElementById(id);
const video=$('video'), ovl=$('ovl'), hint=$('hint'), badge=$('badge'), cue=$('cue');
const call=$('call'), talkBox=$('talk'), hand=$('hand'), face=$('face');
const pClaude=$('pClaude'), pMe=$('pMe'), lifebar=$('lifebar');
const meter=$('meter'), needle=$('needle'), mkLeft=$('mkLeft'), mkCenter=$('mkCenter'), mkRight=$('mkRight');
const beats=[$('b1'),$('b2'),$('b3')];
const btnCam=$('btnCam'), btnCalib=$('btnCalib'), btnStart=$('btnStart'), btnReset=$('btnReset'), btnDiag=$('btnDiag');
const kb=$('kb'), sfx=$('sfx'), sens=$('sens'), sensOut=$('sensOut');
const sRound=$('sRound'), sWin=$('sWin'), sStreak=$('sStreak'), sBest=$('sBest');

const CFG = {
  procW:160, procH:120,
  minSkin:60,          // 얼굴로 인정할 최소 스킨 픽셀 가중합
  smooth:5,            // 중앙값 스무딩 창
  minSpread:4.5,       // 학습된 좌우 기준값의 최소 간격 (px, 160 기준)
  beat0:820, beatMin:430, beatStep:28,
  hold:1500, lives:3
};

const S = {
  run:false, cal:null, samples:[], dir:'none', locked:'none', busy:false,
  round:0, wins:0, streak:0, best:0, lives:CFG.lives, caught:0, hist:[], timers:[]
};

const LINES = {
  ready:['자, 간다. 눈 크게 떠.','이번엔 못 피할걸?','너 방금 오른쪽 갔지. 기억해뒀어.','고개 준비. 들어간다.','손목 풀었다.'],
  win:['잡았다! 방금 티 났어.','읽혔어. 패턴 단순하네.','내 예측 적중.','거봐, 거기 갈 줄 알았어.'],
  lose:['어라, 피했네.','운 좋았다.','인정. 반사신경 좋네.','이번 건 내 실수.'],
  none:['고개를 안 돌렸잖아. 무효, 다시.','움직여야 게임이지. 다시 간다.'],
  overWin:['내가 이겼다. 재도전?','세 번 잡았어. 게임 끝!'],
  overLose:['…네가 이겼어. 잘하네.','완패 인정. 리셋하고 다시 붙자.']
};
const pick = a => a[(Math.random()*a.length)|0];
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---------- 소리 ----------
let actx = null;
function beep(f=440, d=.09, v=.15){
  if(!sfx.checked) return;
  try{
    actx = actx || new (window.AudioContext||window.webkitAudioContext)();
    if(actx.state === 'suspended') actx.resume();
    const o = actx.createOscillator(), g = actx.createGain();
    o.type='square'; o.frequency.value=f;
    g.gain.setValueAtTime(v, actx.currentTime);
    g.gain.exponentialRampToValueAtTime(.001, actx.currentTime+d);
    o.connect(g).connect(actx.destination); o.start(); o.stop(actx.currentTime+d+.02);
  }catch(e){}
}

// ---------- 카메라 ----------
const proc = document.createElement('canvas');
proc.width = CFG.procW; proc.height = CFG.procH;
const pctx = proc.getContext('2d', {willReadFrequently:true});
const octx = ovl.getContext('2d');

function camBlocked(reason, detail){
  hint.innerHTML = '<b>'+reason+'</b><br>'+detail+'<br><br>키보드 모드로 전환했습니다 — ← → 키로 고개를 돌리세요.';
  hint.classList.remove('off');
  kb.checked = true; kb.dispatchEvent(new Event('change'));
  talk('카메라가 막혔네. 키보드로 붙자 — ← → 로 고개 돌려.');
  showDiag();
}

async function startCam(){
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    camBlocked('이 페이지에는 카메라 API가 없습니다',
      window.isSecureContext
        ? '브라우저가 이 페이지에 카메라 기능을 허용하지 않았습니다.'
        : '카메라는 https 또는 localhost 에서만 열립니다. 지금 주소는 ' + location.protocol + ' 입니다.');
    return;
  }
  try{
    const st = await navigator.mediaDevices.getUserMedia({
      video:{ width:{ideal:640}, height:{ideal:480}, facingMode:'user' }, audio:false
    });
    video.srcObject = st;
    await video.play();
    hint.classList.add('off');
    btnCam.disabled = true; btnCalib.disabled = false;
    setCall('“고개 인식 학습”을 눌러 세 자세를 가르쳐 주세요');
    talk('먼저 네 고개 움직임을 배울게.');
    S.run = true; loop();
  }catch(err){
    const why = {
      NotAllowedError: window.top !== window.self
        ? '이 페이지가 다른 사이트 안에 삽입되어 있어 카메라 권한이 차단되었습니다. 파일을 내려받아 localhost 에서 열어주세요.'
        : '카메라 권한이 거부되었습니다. 주소창 왼쪽 자물쇠 → 카메라 → 허용으로 바꾼 뒤 새로고침하세요.',
      NotFoundError:'연결된 카메라를 찾지 못했습니다.',
      NotReadableError:'다른 앱(줌, 팀즈, 카메라 앱 등)이 카메라를 쓰고 있습니다. 그 앱을 끄고 다시 시도하세요.',
      OverconstrainedError:'요청한 해상도를 지원하지 않는 카메라입니다.',
      SecurityError:'브라우저 보안 정책으로 차단되었습니다.'
    }[err.name] || err.message;
    camBlocked('카메라를 열 수 없습니다 ('+err.name+')', why);
  }
}

async function showDiag(){
  const d = $('diag'); d.hidden = false;
  let perm='확인 불가', cams='확인 불가';
  try{ perm = (await navigator.permissions.query({name:'camera'})).state; }catch(e){}
  try{
    const list = await navigator.mediaDevices.enumerateDevices();
    cams = list.filter(v => v.kind === 'videoinput').length + '개';
  }catch(e){}
  d.innerHTML = [
    '<b>카메라 진단</b>',
    '주소            ' + location.protocol + '//' + location.host,
    '보안 컨텍스트    ' + (window.isSecureContext ? '예 (카메라 가능)' : '아니오 (https/localhost 필요)'),
    '다른 페이지 안   ' + (window.top !== window.self ? '예 (iframe — 권한이 막힐 수 있음)' : '아니오'),
    'mediaDevices    ' + (navigator.mediaDevices ? '있음' : '없음'),
    '카메라 권한      ' + perm,
    '카메라 장치      ' + cams
  ].join('\n');
}

// ---------- 프레임 분석 ----------
function analyze(){
  pctx.save();
  pctx.translate(CFG.procW, 0); pctx.scale(-1, 1);
  pctx.drawImage(video, 0, 0, CFG.procW, CFG.procH);
  pctx.restore();

  const d = pctx.getImageData(0, 0, CFG.procW, CFG.procH).data;
  let sx=0, sy=0, n=0;
  for(let y=0; y<CFG.procH; y+=2){
    for(let x=0; x<CFG.procW; x+=2){
      const i=(y*CFG.procW+x)*4, r=d[i], g=d[i+1], b=d[i+2];
      const Y  = .299*r + .587*g + .114*b;
      const Cb = 128 - .168736*r - .331264*g + .5*b;
      const Cr = 128 + .5*r - .418688*g - .081312*b;
      // 조명/화이트밸런스 편차를 견디도록 넉넉하게 잡는다
      if(Y>40 && Cb>=70 && Cb<=135 && Cr>=130 && Cr<=185 && r>g && r>b){
        const w = y < CFG.procH*.72 ? 1 : .3;   // 얼굴이 있는 위쪽에 가중
        sx += x*w; sy += y*w; n += w;
      }
    }
  }
  return n < CFG.minSkin ? null : { x:sx/n, y:sy/n, n };
}
const median = a => { const s=a.slice().sort((p,q)=>p-q); return s[(s.length/2)|0]; };

// ---------- 학습된 기준값으로 방향 판정 ----------
function classify(x){
  const c = S.cal; if(!c) return 'center';
  const t = sens.value/100;                       // 0.25 ~ 0.80
  const rl = (x - c.center) / (c.left  - c.center);   // 왼쪽 기준 대비 진행률
  const rr = (x - c.center) / (c.right - c.center);
  if(rl >= t && rl >= rr) return 'left';
  if(rr >= t) return 'right';
  return 'center';
}

function loop(){
  if(!S.run) return;
  const f = analyze();
  if(f){
    S.samples.push(f.x);
    if(S.samples.length > CFG.smooth) S.samples.shift();
    const mx = median(S.samples);
    if(!kb.checked && S.cal) S.dir = classify(mx);
    drawOverlay(mx, f.y);
    drawMeter(mx);
    if(!S.cal && !kb.checked) badge.textContent = '얼굴 인식됨 · 학습 필요';
  }else{
    S.samples.length = 0;
    if(!kb.checked){ S.dir = 'none'; octx.clearRect(0,0,ovl.width,ovl.height); }
  }
  if(S.cal || kb.checked) paintBadge();
  requestAnimationFrame(loop);
}

function drawOverlay(mx, my){
  if(ovl.width !== ovl.clientWidth){ ovl.width = ovl.clientWidth; ovl.height = ovl.clientHeight; }
  const W=ovl.width, H=ovl.height, px=mx/CFG.procW*W, py=my/CFG.procH*H;
  octx.clearRect(0,0,W,H);
  octx.strokeStyle='#FFD23F'; octx.lineWidth=2;
  octx.beginPath(); octx.arc(px, py, 17, 0, Math.PI*2); octx.stroke();
}

// 게이지는 항상 왼쪽 마크가 화면 왼쪽에 오도록 축 방향을 맞춘다
function meterScale(){
  const c = S.cal;
  const lo = Math.min(c.left, c.right, c.center), hi = Math.max(c.left, c.right, c.center);
  const pad = (hi-lo)*0.5 + 2;
  const flip = c.left > c.right;
  return v => {
    let t = (v - (lo-pad)) / ((hi+pad) - (lo-pad)) * 100;
    if(flip) t = 100 - t;
    return Math.max(0, Math.min(100, t));
  };
}
function drawMeter(mx){
  if(!S.cal) return;
  needle.style.left = meterScale()(mx) + '%';
}
function placeMarks(){
  if(!S.cal) return;
  meter.hidden = false;
  const pos = meterScale();
  mkLeft.style.left = pos(S.cal.left) + '%';
  mkCenter.style.left = pos(S.cal.center) + '%';
  mkRight.style.left = pos(S.cal.right) + '%';
}

const KO = { left:'◀ 왼쪽', right:'오른쪽 ▶', center:'가운데', none:'얼굴 미인식' };
const paintBadge = () => { badge.textContent = KO[S.dir] || '— — —'; };

// ---------- 3단계 학습 ----------
async function measure(label, sub){
  cue.hidden = false;
  for(let t=3; t>0; t--){
    cue.innerHTML = label + ' <b>' + t + '</b>';
    setCall(sub);
    beep(420, .05);
    await sleep(800);
  }
  cue.textContent = label + ' — 측정 중';
  const vals = [];
  const t0 = performance.now();
  while(performance.now() - t0 < 1100){
    const f = analyze(); if(f) vals.push(f.x);
    await sleep(45);
  }
  beep(900, .1);
  if(vals.length < 6) throw new Error('얼굴을 인식하지 못했습니다. 조명을 얼굴 정면으로 밝히고 다시 시도하세요.');
  return median(vals);
}

async function calibrate(){
  if(kb.checked){ btnStart.disabled = false; setCall('키보드 모드 — ← → 로 고개를 돌리세요'); return; }
  if(S.busy) return;
  S.busy = true; btnCalib.disabled = true; btnStart.disabled = true;
  S.cal = null; meter.hidden = true;
  try{
    const center = await measure('정면을 보세요', '① 정면 — 카메라를 똑바로');
    const left   = await measure('고개를 왼쪽으로', '② 왼쪽 — 게임에서 할 동작 그대로 크게');
    const right  = await measure('고개를 오른쪽으로', '③ 오른쪽 — 게임에서 할 동작 그대로 크게');

    if(Math.abs(left - right) < CFG.minSpread)
      throw new Error('좌우 차이가 너무 작습니다 (' + Math.abs(left-right).toFixed(1) + 'px). 고개를 더 크게 돌리고 다시 학습하세요.');
    if((left - center) * (right - center) >= 0)
      throw new Error('왼쪽과 오른쪽이 같은 방향으로 측정됐습니다. 정면 자세를 유지한 채 다시 학습하세요.');

    S.cal = { center, left, right };
    placeMarks();
    btnStart.disabled = false;
    setCall('학습 완료 — 고개를 돌려 게이지가 따라오는지 확인하세요');
    talk('배웠어. 이제 네 고개가 어디로 가는지 보여.');
    beep(1180, .16);
  }catch(err){
    setCall('학습 실패');
    talk(err.message);
    badge.textContent = '학습 필요';
  }finally{
    cue.hidden = true;
    btnCalib.disabled = false;
    btnCalib.textContent = '고개 인식 다시 학습';
    S.busy = false;
  }
}

// ---------- Claude AI (1차 마르코프 예측) ----------
function choose(){
  const h = S.hist;
  if(h.length >= 3 && Math.random() > .22){
    const last = h[h.length-1];
    let L=0, R=0;
    for(let i=0; i<h.length-1; i++) if(h[i] === last) h[i+1]==='left' ? L++ : R++;
    if(L !== R) return L > R ? 'left' : 'right';
    const tl = h.filter(v => v==='left').length;
    if(tl*2 !== h.length) return tl*2 > h.length ? 'left' : 'right';
  }
  return Math.random() < .5 ? 'left' : 'right';
}

// ---------- 라운드 ----------
const later = (fn, ms) => S.timers.push(setTimeout(fn, ms));
const clearAll = () => { S.timers.forEach(clearTimeout); S.timers = []; };

function start(){
  clearAll();
  Object.assign(S, {round:0, wins:0, streak:0, lives:CFG.lives, caught:0, hist:[]});
  render(); btnStart.disabled = true; next();
}
function next(){
  if(S.lives <= 0) return;
  S.round++; render(); resetVisuals();
  talk(pick(LINES.ready)); setCall('준비…');
  later(() => runBeat(0, Math.max(CFG.beatMin, CFG.beat0 - (S.round-1)*CFG.beatStep)), 700);
}
function runBeat(i, gap){
  if(i < 2){
    beats[i].classList.add('on'); beep(520+i*80, .07); setCall('참'.repeat(i+1));
    later(() => beats[i].classList.remove('on'), gap*.6);
    later(() => runBeat(i+1, gap), gap);
  }else{
    S.locked = S.dir;                       // 공개 전에 먼저 고정 — 보고 피할 수 없다
    const atk = choose();
    beats[2].classList.add('hit'); beep(760, .16, .2);
    hand.classList.add('point'); hand.classList.toggle('left', atk === 'left');
    setCall('참!');
    later(() => judge(atk), 260);
  }
}
function judge(atk){
  const me = S.locked;
  if(me !== 'left' && me !== 'right'){
    setCall(me === 'none' ? '무효 — 얼굴이 보이지 않았습니다' : '무효 — 고개를 돌리지 않았습니다');
    talk(pick(LINES.none));
    later(() => { S.round--; next(); }, CFG.hold);
    return;
  }
  S.hist.push(me); if(S.hist.length > 40) S.hist.shift();
  if(me === atk){
    S.lives--; S.caught++; S.streak = 0;
    face.classList.add('win','shake'); pMe.classList.add('caught'); pClaude.classList.add('dodged');
    setCall(`걸렸다! Claude ${KO[atk]} · 나 ${KO[me]}`, 'caught');
    talk(pick(LINES.win)); beep(180, .3, .2);
  }else{
    S.wins++; S.streak++; S.best = Math.max(S.best, S.streak);
    face.classList.add('lose'); pMe.classList.add('dodged'); pClaude.classList.add('caught');
    setCall(`성공! Claude ${KO[atk]} · 나 ${KO[me]}`, 'dodged');
    talk(pick(LINES.lose)); beep(980, .12); later(() => beep(1240, .14), 110);
  }
  render();
  later(() => { S.lives <= 0 ? over() : next(); }, CFG.hold);
}
function over(){
  face.classList.add('win');
  setCall(`게임 오버 — 성공 ${S.wins}회 · 최고 연속 ${S.best}회`, 'caught');
  talk(pick(S.wins >= 8 ? LINES.overLose : LINES.overWin));
  btnStart.disabled = false; btnStart.textContent = '다시 시작';
}
function resetVisuals(){
  beats.forEach(b => b.classList.remove('on','hit'));
  hand.classList.remove('point','left');
  face.classList.remove('win','lose','shake');
  pMe.classList.remove('caught','dodged'); pClaude.classList.remove('caught','dodged');
}
function setCall(t, cls=''){ call.textContent = t; call.className = 'call ' + cls; }
function talk(t){ talkBox.textContent = t; }
function render(){
  sRound.textContent = S.round; sWin.textContent = S.wins;
  sStreak.textContent = S.streak; sBest.textContent = S.best;
  lifebar.textContent = '목숨 ' + ('❤︎'.repeat(Math.max(0,S.lives)) || '없음') + '   ·   Claude 획득 ' + S.caught;
}

// ---------- 입력 ----------
let kbT = null;
addEventListener('keydown', e => {
  if(!kb.checked) return;
  if(e.key === 'ArrowLeft') S.dir = 'left';
  else if(e.key === 'ArrowRight') S.dir = 'right';
  else return;
  e.preventDefault(); paintBadge();
  clearTimeout(kbT);
  kbT = setTimeout(() => { S.dir = 'center'; paintBadge(); }, 900);
});
kb.addEventListener('change', () => {
  if(kb.checked){
    btnStart.disabled = false; S.dir = 'center';
    setCall('키보드 모드 — ← → 로 고개를 돌리세요');
  }else{
    S.dir = 'none';
    if(!S.cal){ btnStart.disabled = true; setCall('고개 인식 학습이 필요합니다'); }
  }
  paintBadge();
});
sens.addEventListener('input', () => {
  const v = +sens.value;
  sensOut.textContent = v <= 35 ? '예민' : v <= 55 ? '보통' : v <= 68 ? '둔감' : '많이 둔감';
});
btnCam.addEventListener('click', startCam);
btnCalib.addEventListener('click', calibrate);
btnStart.addEventListener('click', start);
btnDiag.addEventListener('click', showDiag);
btnReset.addEventListener('click', () => {
  clearAll(); resetVisuals();
  Object.assign(S, {round:0, wins:0, streak:0, lives:CFG.lives, caught:0, hist:[]});
  render(); btnStart.textContent = '게임 시작'; btnStart.disabled = !(S.cal || kb.checked);
  setCall('리셋 완료'); talk('언제든 다시 붙자.');
});

render();
sens.dispatchEvent(new Event('input'));
})();
