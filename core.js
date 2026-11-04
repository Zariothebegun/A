/* ============================================================
   CÉLULA ZERO — Motor Central: Estado, Som, Router, WebGL & FX (core.js)
   ============================================================ */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function fmtV(num, signed = true) {
  const n = Number(num) || 0;
  const abs = Math.abs(n).toFixed(2).replace('.', ',');
  if (Math.abs(n) < 0.005) return '0,00 V';
  if (!signed) return `${abs} V`;
  return `${n > 0 ? '+' : '−'}${abs} V`;
}

function gcd(a, b) {
  let x = Math.abs(a), y = Math.abs(b);
  while (y) { const t = y; y = x % y; x = t; }
  return x || 1;
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function icon(name, cls = '') {
  return `<svg class="ic ${cls}" aria-hidden="true"><use href="#ic-${esc(name)}"></use></svg>`;
}

/* ============================================================
   ESTADO PERSISTENTE (localStorage seguro + portabilidade offline)
   ============================================================ */
const STORAGE_KEY = 'celula_zero_state_v1';

function defaultState() {
  const missions = {};
  (CZ.MISSIONS || []).forEach(m => {
    missions[m.id] = { done: false, best: 0, stars: 0, attempts: 0 };
  });
  return {
    operatorName: 'Operador Alfa',
    schoolName: 'Ensino Secundário / Profissional',
    className: 'Química — Eletroquímica',
    started: false,
    createdAt: new Date().toISOString(),
    xp: 0,
    sound: true,
    reduced: false,
    missions,
    badges: [],
    codexRead: ['base'],
    codexChecks: [],
    labExperiments: 0,
    labNotes: []
  };
}

function loadState() {
  const base = defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    const merged = { ...base, ...parsed };
    merged.missions = { ...base.missions, ...(parsed.missions || {}) };
    return merged;
  } catch (_) {
    return base;
  }
}

let S = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(S));
  } catch (_) { /* modo privado / file:// restrito continua em memória */ }
  updateHUD();
}

function resetState() {
  S = defaultState();
  saveState();
}

function getCoreIntegrity() {
  const total = CZ.MISSIONS.length;
  const doneCount = CZ.MISSIONS.filter(m => S.missions[m.id]?.done).length;
  return { doneCount, total, pct: Math.round((doneCount / total) * 100) };
}

function getLevelInfo(xp = S.xp) {
  const levels = CZ.LEVELS;
  let cur = levels[0];
  let next = null;
  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i].min) {
      cur = levels[i];
      next = levels[i + 1] || null;
    }
  }
  const progress = next
    ? clamp(((xp - cur.min) / (next.min - cur.min)) * 100, 0, 100)
    : 100;
  return { ...cur, next, progress };
}

/* ============================================================
   ÁUDIO SINTETIZADO PROCEDURAL (WebAudio API — 0 Ficheiros Externos)
   ============================================================ */
const Sound = (() => {
  let ctx = null;

  function ensure() {
    if (!S.sound) return null;
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }

  function tone(freq, dur = 0.09, type = 'sine', gainVal = 0.07, delay = 0, slideTo = null) {
    const ac = ensure();
    if (!ac) return;
    const t0 = ac.currentTime + delay;
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gainVal, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function play(kind) {
    if (!S.sound) return;
    switch (kind) {
      case 'click':
        tone(560, 0.055, 'triangle', 0.05, 0, 740);
        break;
      case 'hover':
        tone(420, 0.03, 'sine', 0.02);
        break;
      case 'scan':
        tone(340, 0.14, 'sine', 0.055, 0, 920);
        break;
      case 'ok':
        tone(523.25, 0.09, 'triangle', 0.07, 0);
        tone(659.25, 0.12, 'triangle', 0.075, 0.07);
        break;
      case 'bad':
        tone(210, 0.16, 'sawtooth', 0.06, 0, 130);
        break;
      case 'power':
        tone(440, 0.08, 'sine', 0.06, 0, 880);
        tone(880, 0.14, 'triangle', 0.06, 0.07, 1174);
        break;
      case 'bossHit':
        tone(150, 0.18, 'sawtooth', 0.08, 0, 65);
        tone(740, 0.12, 'triangle', 0.06, 0.04, 980);
        break;
      case 'playerHit':
        tone(140, 0.25, 'sawtooth', 0.085, 0, 55);
        break;
      case 'levelup':
      case 'victory':
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
          tone(f, 0.18, 'triangle', 0.075, i * 0.085);
        });
        break;
    }
  }

  function syncIcon() {
    const useEl = $('#sound-ic use');
    if (useEl) useEl.setAttribute('href', S.sound ? '#ic-sound' : '#ic-mute');
  }

  function toggle() {
    S.sound = !S.sound;
    saveState();
    syncIcon();
    if (S.sound) play('ok');
    return S.sound;
  }

  return { play, toggle, syncIcon };
})();

/* ============================================================
   TOASTS, MODAIS & CONFETTI ELETROQUÍMICO
   ============================================================ */
function toast(title, sub = '', iconName = 'sparkles') {
  const stack = $('#toast-stack');
  if (!stack) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `
    <div class="toast-ic">${icon(iconName)}</div>
    <div>
      <strong>${esc(title)}</strong>
      ${sub ? `<small>${esc(sub)}</small>` : ''}
    </div>
  `;
  stack.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    el.style.transition = 'all 0.28s ease';
    setTimeout(() => el.remove(), 300);
  }, 3600);
}

function openModal(innerHTML, opts = {}) {
  const root = $('#modal-root');
  if (!root) return;
  root.innerHTML = `
    <div class="modal-backdrop" data-close-modal></div>
    <div class="modal-dialog ${opts.wide ? 'is-wide' : ''}" role="dialog" aria-modal="true">
      <button type="button" class="icon-btn modal-close no-print" data-close-modal aria-label="Fechar janela">
        ${icon('close')}
      </button>
      ${innerHTML}
    </div>
  `;
  root.classList.add('is-open');
  $$('[data-close-modal]', root).forEach(btn => {
    btn.addEventListener('click', () => {
      Sound.play('click');
      closeModal();
    });
  });
}

function closeModal() {
  const root = $('#modal-root');
  if (!root) return;
  root.classList.remove('is-open');
  root.innerHTML = '';
  document.body.classList.remove('print-cert');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && $('#modal-root.is-open')) closeModal();
});

/* Confetti de iões luminosos em #fx-canvas */
let fxParticles = [];
let fxAnimating = false;

function confettiBurst(count = 65) {
  const canvas = $('#fx-canvas');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#5eead4', '#38bdf8', '#a78bfa', '#fbbf24', '#34d399', '#fb7185'];
  const cx = canvas.width * 0.5;
  const cy = canvas.height * 0.36;

  for (let i = 0; i < count; i++) {
    const ang = Math.random() * Math.PI * 2;
    const spd = 3 + Math.random() * 9;
    fxParticles.push({
      x: cx, y: cy,
      vx: Math.cos(ang) * spd,
      vy: Math.sin(ang) * spd - 3,
      size: 3 + Math.random() * 5,
      color: colors[i % colors.length],
      life: 1,
      decay: 0.012 + Math.random() * 0.014
    });
  }

  if (!fxAnimating) {
    fxAnimating = true;
    const ctx = canvas.getContext('2d');
    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fxParticles = fxParticles.filter(p => p.life > 0);
      for (const p of fxParticles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18;
        p.vx *= 0.99;
        p.life -= p.decay;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (fxParticles.length > 0) {
        requestAnimationFrame(step);
      } else {
        fxAnimating = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    requestAnimationFrame(step);
  }
}

/* ============================================================
   XP, NÍVEIS, DISTINTIVOS E CONCLUSÃO DE MISSÕES
   ============================================================ */
function addXP(amount, reason = '') {
  if (!amount || amount <= 0) return;
  const before = getLevelInfo(S.xp).lvl;
  S.xp += Math.round(amount);
  const afterInfo = getLevelInfo(S.xp);
  saveState();
  if (afterInfo.lvl > before) {
    Sound.play('levelup');
    toast(`Subida de Patente: Nível ${afterInfo.lvl}!`, afterInfo.title, 'award');
    confettiBurst(50);
  } else if (reason) {
    toast(`+${Math.round(amount)} XP`, reason, 'bolt');
  }
}

function unlockBadge(id) {
  if (S.badges.includes(id)) return false;
  const b = CZ.BADGES.find(x => x.id === id);
  if (!b) return false;
  S.badges.push(id);
  saveState();
  Sound.play('power');
  toast(`Distintivo Desbloqueado: ${b.title}`, b.desc, b.icon || 'award');
  return true;
}

function awardBest(missionId, score) {
  const m = S.missions[missionId];
  if (!m) return;
  if (score > (m.best || 0)) m.best = Math.round(score);
  saveState();
}

function completeMission(missionId, { score = 100, stars = 3, xp = 150 } = {}) {
  if (!S.missions[missionId]) {
    S.missions[missionId] = { done: false, best: 0, stars: 0, attempts: 0 };
  }
  const m = S.missions[missionId];
  const firstTime = !m.done;
  m.done = true;
  m.attempts = (m.attempts || 0) + 1;
  m.best = Math.max(m.best || 0, Math.round(score));
  m.stars = Math.max(m.stars || 0, clamp(stars, 1, 3));

  const earnedXP = firstTime ? xp : Math.round(xp * 0.35);
  addXP(earnedXP, firstTime ? 'Módulo reparado!' : 'Treino de aperfeiçoamento');

  unlockBadge('first_spark');
  const integ = getCoreIntegrity();
  if (integ.doneCount === integ.total) {
    unlockBadge('grade_20');
  }
  saveState();
  Sound.play('victory');
  confettiBurst(75);
  return { firstTime, earnedXP };
}

/* ============================================================
   HUD & ROUTER SPA
   ============================================================ */
function updateHUD() {
  const info = getLevelInfo(S.xp);
  const lvlEl = $('#hud-lvl');
  const xpEl = $('#hud-xp');
  const fillEl = $('#hud-xp-fill');
  if (lvlEl) lvlEl.textContent = `NV ${info.lvl}`;
  if (xpEl) xpEl.textContent = `${S.xp} XP`;
  if (fillEl) fillEl.style.width = `${info.progress}%`;
  Sound.syncIcon();

  const h = location.hash || '#/';
  let key = '';
  if (h.startsWith('#/hub') || h.startsWith('#/mission')) key = 'hub';
  else if (h.startsWith('#/lab')) key = 'lab';
  else if (h.startsWith('#/codex')) key = 'codex';
  else if (h.startsWith('#/glossary')) key = 'glossary';
  else if (h.startsWith('#/profile')) key = 'profile';

  $$('[data-nav]').forEach(a => {
    a.classList.toggle('is-active', a.getAttribute('data-nav') === key);
  });
}

let cleanups = [];
function onCleanup(fn) {
  if (typeof fn === 'function') cleanups.push(fn);
}
function runCleanups() {
  while (cleanups.length) {
    try { cleanups.pop()(); } catch (_) {}
  }
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (_) {}
  }
}

function go(hash) {
  if (location.hash === hash) {
    router();
  } else {
    location.hash = hash;
  }
}

function router() {
  runCleanups();
  const app = $('#app');
  if (!app) return;

  const raw = (location.hash || '#/').replace(/^#/, '');
  const parts = raw.split('/').filter(Boolean);
  updateHUD();
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

  if (parts.length === 0) {
    renderIntro(app);
  } else if (parts[0] === 'hub') {
    renderHub(app);
  } else if (parts[0] === 'lab') {
    renderLab(app);
  } else if (parts[0] === 'mission') {
    renderMission(app, parts[1] || 'm1');
  } else if (parts[0] === 'codex') {
    renderCodex(app, parts[1] || 'base');
  } else if (parts[0] === 'glossary') {
    renderGlossary(app);
  } else if (parts[0] === 'profile') {
    renderProfile(app);
  } else {
    renderHub(app);
  }
}

window.addEventListener('hashchange', router);

/* ============================================================
   HELPERS DE MISSÃO (usados por missions.js)
   ============================================================ */
function missionHeadHTML(m, rightHTML = '') {
  return `
    <div class="mission-head">
      <div class="mh-left">
        <a href="#/hub" class="mh-back" title="Voltar ao Mapa de Missões">${icon('chevron-left')}</a>
        <div>
          <div class="mh-code">${esc(m.code)}</div>
          <h1 class="mh-title">${esc(m.title)}</h1>
        </div>
      </div>
      <div class="mh-right">
        ${rightHTML}
      </div>
    </div>
  `;
}

function missionCompleteScreen({ mission, score, stars, summary, earnedXP, nextId }) {
  const starIcons = [1, 2, 3].map(i =>
    `<span style="color:${i <= stars ? '#fbbf24' : 'rgba(148,163,184,0.25)'}">${icon('star')}</span>`
  ).join('');
  return `
    <div class="complete-card view-enter">
      <div class="kicker"><span class="kicker-dot"></span> ${esc(mission.code)} SINCRONIZADO</div>
      <h2 class="section-title" style="margin-top:12px">${esc(mission.title)} — Concluído!</h2>
      <div class="complete-stars">${starIcons}</div>
      <p class="section-lead" style="margin:0 auto 20px">${esc(summary)}</p>
      <div class="stats-row" style="max-width:460px;margin:0 auto 24px;grid-template-columns:repeat(2,1fr)">
        <div class="stat-pill"><strong>${Math.round(score)}%</strong><span>Desempenho</span></div>
        <div class="stat-pill"><strong>+${earnedXP} XP</strong><span>Experiência</span></div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
        <button type="button" class="btn" data-retry>${icon('refresh')} Repetir Módulo</button>
        <a href="#/hub" class="btn">${icon('grid')} Mapa da Célula</a>
        ${nextId
          ? `<a href="#/mission/${esc(nextId)}" class="btn btn-primary">Próximo Módulo ${icon('chevron-right')}</a>`
          : `<button type="button" class="btn btn-primary" onclick="openCertificateModal()">${icon('award')} Emitir Certificado</button>`
        }
      </div>
    </div>
  `;
}

function bindRetry(container, fn) {
  const btn = $('[data-retry]', container);
  if (btn) {
    btn.addEventListener('click', () => {
      Sound.play('click');
      fn();
    });
  }
}

/* ============================================================
   SHADER WEBGL DE PLASMA IRIDESCENTE + PARTÍCULAS IÓNICAS
   ============================================================ */
let pointer = { x: 0.5, y: 0.5, px: -999, py: -999 };

function initGL() {
  const canvas = $('#gl-canvas');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { antialias: false, depth: false, stencil: false });
  if (!gl) return;

  const vsSrc = `
    attribute vec2 a_pos;
    void main() {
      gl_Position = vec4(a_pos, 0.0, 1.0);
    }
  `;

  const fsSrc = `
    precision mediump float;
    uniform vec2 u_res;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_purity;

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res.xy;
      vec2 p = (gl_FragCoord.xy - 0.5 * u_res.xy) / min(u_res.x, u_res.y);
      vec2 m = (u_mouse - 0.5) * 1.4;

      float t = u_time * 0.22;
      float d = length(p - m * 0.35);

      float v1 = sin(p.x * 3.1 + t) + cos(p.y * 2.7 - t * 1.1);
      float v2 = sin((p.x + p.y) * 2.4 - t * 0.8 + sin(d * 3.5 - t));
      float wave = (v1 + v2) * 0.25;

      vec3 deep = vec3(0.015, 0.028, 0.072);
      vec3 teal = vec3(0.06, 0.34, 0.33);
      vec3 cyan = vec3(0.05, 0.22, 0.42);
      vec3 corr = vec3(0.26, 0.05, 0.14);

      vec3 accent = mix(corr, teal, clamp(0.35 + u_purity * 0.65, 0.0, 1.0));
      vec3 col = mix(deep, cyan, smoothstep(-0.7, 0.8, wave));
      col = mix(col, accent, smoothstep(0.05, 0.95, sin(wave * 3.1415 + t) * 0.5 + 0.5) * 0.48);

      float glow = exp(-d * 2.8) * 0.16;
      col += vec3(0.18, 0.72, 0.68) * glow;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  }

  const vs = compile(gl.VERTEX_SHADER, vsSrc);
  const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
  if (!vs || !fs) return;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(prog, 'a_pos');
  const uRes = gl.getUniformLocation(prog, 'u_res');
  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uMouse = gl.getUniformLocation(prog, 'u_mouse');
  const uPurity = gl.getUniformLocation(prog, 'u_purity');

  function resize() {
    const scale = 0.5; /* meio-resolução para 60fps fluídos em qualquer portátil escolar */
    canvas.width = Math.max(2, Math.floor(window.innerWidth * scale));
    canvas.height = Math.max(2, Math.floor(window.innerHeight * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);

  const tStart = performance.now();
  function render() {
    if (!document.hidden) {
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - tStart) * 0.001);
      gl.uniform2f(uMouse, pointer.x, 1.0 - pointer.y);
      gl.uniform1f(uPurity, getCoreIntegrity().pct / 100);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    if (!S.reduced) requestAnimationFrame(render);
  }
  render();
}

function initFX() {
  const glow = $('#cursor-glow');
  window.addEventListener('pointermove', (e) => {
    pointer.x = e.clientX / Math.max(1, window.innerWidth);
    pointer.y = e.clientY / Math.max(1, window.innerHeight);
    pointer.px = e.clientX;
    pointer.py = e.clientY;
    if (glow) {
      glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }
  }, { passive: true });

  initGL();

  const ionCanvas = $('#ion-canvas');
  if (!ionCanvas) return;
  const ctx = ionCanvas.getContext('2d');
  let w = 0, h = 0;

  function resizeIons() {
    w = ionCanvas.width = window.innerWidth;
    h = ionCanvas.height = window.innerHeight;
  }
  resizeIons();
  window.addEventListener('resize', resizeIons);

  const count = Math.min(34, Math.max(16, Math.floor(window.innerWidth / 48)));
  const ions = Array.from({ length: count }, (_, i) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: -0.15 - Math.random() * 0.32,
    r: 1.6 + Math.random() * 2.2,
    pos: i % 2 === 0
  }));

  function stepIons() {
    if (!document.hidden) {
      ctx.clearRect(0, 0, w, h);
      for (const p of ions) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -12) { p.y = h + 12; p.x = Math.random() * w; }
        if (p.x < -12) p.x = w + 12;
        if (p.x > w + 12) p.x = -12;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.pos ? 'rgba(94, 234, 212, 0.38)' : 'rgba(56, 189, 248, 0.34)';
        ctx.fill();
      }
    }
    if (!S.reduced) requestAnimationFrame(stepIons);
  }
  stepIons();
}
