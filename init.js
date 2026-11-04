/* ============================================================
   CÉLULA ZERO — Arranque do Protocolo e Ligações Globais (init.js)
   ============================================================ */
(function bootSequence() {
  const boot = document.getElementById('boot');
  const bar = document.getElementById('boot-bar');
  const statusEl = document.getElementById('boot-status');
  const skipBtn = document.getElementById('boot-skip');

  const STEPS = [
    { label: 'A ligar o núcleo…', width: 12 },
    { label: 'A calibrar sensores iónicos…', width: 34 },
    { label: 'A carregar o Arquivo científico…', width: 58 },
    { label: 'A sincronizar o operador…', width: 82 },
    { label: 'Protocolo pronto.', width: 100 }
  ];

  let finished = false;
  const timers = [];
  const reduced = S.reduced || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stepDelay = reduced ? 60 : 320;

  function endBoot() {
    if (finished) return;
    finished = true;
    timers.forEach(clearTimeout);

    if (bar) bar.style.width = '100%';
    if (statusEl) statusEl.textContent = 'Protocolo pronto.';

    document.body.classList.remove('is-booting');
    document.documentElement.classList.add('is-ready');

    if (boot) {
      boot.classList.add('is-done');
      timers.push(setTimeout(() => boot.remove(), 800));
    }

    /* Primeira rota só depois do arranque, para as animações começarem visíveis */
    router();
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      Sound.play('click');
      endBoot();
    });
  }

  if (reduced) {
    endBoot();
  } else {
    STEPS.forEach((step, i) => {
      timers.push(setTimeout(() => {
        if (finished) return;
        if (bar) bar.style.width = `${step.width}%`;
        if (statusEl) statusEl.textContent = step.label;
      }, i * stepDelay));
    });
    timers.push(setTimeout(endBoot, STEPS.length * stepDelay + 240));
  }

  /* O fundo começa a desenhar cedo, mas não bloqueia o arranque */
  requestAnimationFrame(() => {
    try { initFX(); } catch (err) { console.warn('FX indisponível:', err); }
  });
})();

/* ============================================================
   LIGAÇÕES GLOBAIS DO HUD E ATALHOS
   ============================================================ */

/* Perfil a partir do chip de XP */
const xpChip = document.getElementById('xp-chip');
if (xpChip) {
  xpChip.addEventListener('click', () => {
    Sound.play('click');
    go('#/profile');
  });
}

/* Guião de apresentação Nota 20 */
const guideBtn = document.getElementById('guide-btn');
if (guideBtn) {
  guideBtn.addEventListener('click', () => {
    Sound.play('click');
    openPresentationGuide();
  });
}

/* Som sintetizado WebAudio */
const soundBtn = document.getElementById('sound-btn');
if (soundBtn) {
  soundBtn.addEventListener('click', () => {
    const on = Sound.toggle();
    toast(on ? 'Som ativado.' : 'Som desativado.', '', on ? 'sound' : 'mute');
  });
}

/* Feedback sonoro suave nos links da navegação */
document.querySelectorAll('.hud-nav a, .mobile-nav a, .hud-brand').forEach(link => {
  link.addEventListener('click', () => Sound.play('click'));
});

/* Tecla E expande o diagrama da célula visível */
document.addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === 'e' || e.key === 'E') {
    const btn = document.querySelector('.cell-stage [data-expand]');
    if (btn) {
      e.preventDefault();
      btn.click();
    }
  }
});

/* Impressão limpa do certificado sem o resto da página */
function syncPrintMode() {
  const hasCert = !!document.querySelector('.modal-root.is-open .certificate');
  document.body.classList.toggle('print-cert', hasCert);
}
window.addEventListener('beforeprint', syncPrintMode);
window.addEventListener('afterprint', () => document.body.classList.remove('print-cert'));

/* Atalho de emergência: duplo clique no fundo fecha modais */
document.getElementById('modal-root')?.addEventListener('dblclick', (e) => {
  if (e.target.classList.contains('modal-backdrop')) closeModal();
});

/* Garante que a data de criação existe para o certificado */
if (!S.createdAt) {
  S.createdAt = new Date().toISOString();
  saveState();
}

/* Ficheiro .nojekyll garante que o GitHub Pages serve todas as pastas sem filtros */
console.info('%cCÉLULA ZERO%c · protocolo eletroquímico carregado',
  'background:#5eead4;color:#04120f;padding:2px 6px;border-radius:3px;font-weight:700',
  'color:#9aa8c7');
