/* ============================================================
   CÉLULA ZERO — Leitor do Arquivo Científico, Widgets & Calculadoras (codex.js)
   ============================================================ */

function mountCodexWidget(container, type) {
  if (!container || !type) return;

  if (type === 'cell-demo') {
    container.innerHTML = `
      <div class="cz-widget">
        <h4>${icon('beaker')} Demonstração Interativa — Pilha Galvânica vs Eletrólise</h4>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">
          <button type="button" class="preset-btn" data-demo="daniell">Pilha de Daniell (Zn/Cu)</button>
          <button type="button" class="preset-btn" data-demo="nobridge">Retirar Ponte Salina</button>
          <button type="button" class="preset-btn" data-demo="electro">Forçar Eletrólise</button>
          <button type="button" class="preset-btn" data-demo="agcu">Pilha Cobre/Prata (Cu/Ag)</button>
        </div>
        <div data-demo-stage></div>
        <div class="cz-hint">Experimenta alternar os botões acima e observa o sentido dos eletrões e o sinal dos elétrodos!</div>
      </div>
    `;
    const stg = createCellStage($('[data-demo-stage]', container), { leftId: 'Zn', rightId: 'Cu' });
    onCleanup(() => stg.destroy());

    $$('[data-demo]', container).forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.play('click');
        const mode = btn.getAttribute('data-demo');
        if (mode === 'daniell') stg.setParams({ leftId: 'Zn', rightId: 'Cu', mode: 'galvanic', saltBridge: true });
        if (mode === 'nobridge') stg.setParams({ saltBridge: false, mode: 'galvanic' });
        if (mode === 'electro') { stg.setParams({ leftId: 'Zn', rightId: 'Cu', mode: 'electrolysis', saltBridge: true }); unlockBadge('electrolyzer'); }
        if (mode === 'agcu') stg.setParams({ leftId: 'Cu', rightId: 'Ag', mode: 'galvanic', saltBridge: true });
      });
    });
    return;
  }

  if (type === 'calc-fem') {
    const optsHTML = CZ.METALS.map(m =>
      `<option value="${esc(m.id)}">${esc(m.name)} — ${esc(m.ion)}/${esc(m.sym)} (${fmtV(m.e0)})</option>`
    ).join('');
    container.innerHTML = `
      <div class="cz-widget">
        <h4>${icon('sliders')} Calculadora de Força Eletromotriz Padrão (E°célula) e ΔG°</h4>
        <div class="cz-row">
          <div class="cz-field">
            <label>Semicélula 1</label>
            <select class="cz-select" data-f-m1>${optsHTML}</select>
          </div>
          <div class="cz-field">
            <label>Semicélula 2</label>
            <select class="cz-select" data-f-m2>${optsHTML}</select>
          </div>
        </div>
        <div class="cz-result" data-f-out></div>
        <div class="cz-hint">O simulador identifica automaticamente quem atua como ânodo (menor E°) e como cátodo (maior E°).</div>
      </div>
    `;
    const s1 = $('[data-f-m1]', container);
    const s2 = $('[data-f-m2]', container);
    s1.value = 'Zn';
    s2.value = 'Cu';

    const calc = () => {
      const m1 = CZ.METAL_BY_ID[s1.value];
      const m2 = CZ.METAL_BY_ID[s2.value];
      const cat = m2.e0 >= m1.e0 ? m2 : m1;
      const an = m2.e0 >= m1.e0 ? m1 : m2;
      const n = lcm(m1.z, m2.z);
      const e0 = cat.e0 - an.e0;
      const dg = (-n * 96485 * e0) / 1000;
      $('[data-f-out]', container).innerHTML =
        `Ânodo (−): <strong>${esc(an.sym)}</strong> (${fmtV(an.e0)}) · Cátodo (+): <strong>${esc(cat.sym)}</strong> (${fmtV(cat.e0)})<br/>` +
        `<strong>E°célula = ${fmtV(e0)}</strong> &nbsp;|&nbsp; n = ${n} mol e⁻ &nbsp;|&nbsp; <strong>ΔG° = ${dg.toFixed(1).replace('.', ',')} kJ/mol</strong>`;
    };
    s1.addEventListener('change', calc);
    s2.addEventListener('change', calc);
    calc();
    return;
  }

  if (type === 'calc-nernst') {
    container.innerHTML = `
      <div class="cz-widget">
        <h4>${icon('sliders')} Calculadora da Equação de Nernst — E = E° − (RT / nF) ln Q</h4>
        <div class="cz-row">
          <div class="cz-field">
            <label>E°célula padrão (V)</label>
            <input type="number" step="0.01" value="1.10" class="cz-input" data-n-e0 />
          </div>
          <div class="cz-field">
            <label>Eletrões transferidos (n)</label>
            <input type="number" min="1" max="12" step="1" value="2" class="cz-input" data-n-n />
          </div>
          <div class="cz-field">
            <label>Temperatura (°C)</label>
            <input type="number" min="-20" max="120" step="1" value="25" class="cz-input" data-n-t />
          </div>
          <div class="cz-field">
            <label>Quociente de Reação (Q)</label>
            <input type="number" min="0.000001" step="any" value="0.01" class="cz-input" data-n-q />
          </div>
        </div>
        <div class="cz-result" data-n-out></div>
        <div class="cz-hint">Experimenta Q = 0,01 (E sobe acima de E°!), Q = 1 (E = E°) e Q = 1000 (E desce!).</div>
      </div>
    `;
    const inputs = $$('input', container);
    const calc = () => {
      const e0 = parseFloat($('[data-n-e0]', container).value) || 0;
      const n = Math.max(1, parseInt($('[data-n-n]', container).value, 10) || 1);
      const tC = parseFloat($('[data-n-t]', container).value);
      const T = (isNaN(tC) ? 25 : tC) + 273.15;
      const Q = Math.max(1e-12, parseFloat($('[data-n-q]', container).value) || 1);
      const term = ((8.31446 * T) / (n * 96485)) * Math.log(Q);
      const E = e0 - term;
      $('[data-n-out]', container).innerHTML =
        `log₁₀(Q) = ${Math.log10(Q).toFixed(3).replace('.', ',')} &nbsp;|&nbsp; Termo de Nernst = ${term.toFixed(4).replace('.', ',')} V<br/>` +
        `<strong>Potencial Real E = ${E.toFixed(3).replace('.', ',')} V</strong> (${E > 0 ? 'Reação espontânea no sentido direto' : 'Não espontânea / invertida'})`;
    };
    inputs.forEach(i => i.addEventListener('input', calc));
    calc();
    return;
  }

  if (type === 'calc-faraday') {
    const metalOpts = CZ.METALS.filter(m => m.id !== 'H2').map(m =>
      `<option value="${esc(m.id)}">${esc(m.name)} (${esc(m.ion)} + ${m.z}e⁻ → ${esc(m.sym)}, M = ${m.M} g/mol)</option>`
    ).join('');
    container.innerHTML = `
      <div class="cz-widget">
        <h4>${icon('bolt')} Calculadora das Leis de Faraday — Eletrodeposição</h4>
        <div class="cz-row">
          <div class="cz-field">
            <label>Metal a Depositar</label>
            <select class="cz-select" data-fa-m>${metalOpts}</select>
          </div>
          <div class="cz-field">
            <label>Corrente I (Amperes)</label>
            <input type="number" min="0.1" step="0.5" value="5.0" class="cz-input" data-fa-i />
          </div>
          <div class="cz-field">
            <label>Tempo (minutos)</label>
            <input type="number" min="0.5" step="1" value="30" class="cz-input" data-fa-t />
          </div>
        </div>
        <div class="cz-result" data-fa-out></div>
        <div class="cz-hint">Fórmula aplicada: m = (I · t_seg · M) / (z · 96 485).</div>
      </div>
    `;
    const sel = $('[data-fa-m]', container);
    sel.value = 'Cu';
    const update = () => {
      const m = CZ.METAL_BY_ID[sel.value] || CZ.METAL_BY_ID.Cu;
      const I = Math.max(0, parseFloat($('[data-fa-i]', container).value) || 0);
      const tMin = Math.max(0, parseFloat($('[data-fa-t]', container).value) || 0);
      const tSec = tMin * 60;
      const Q = I * tSec;
      const ne = Q / 96485;
      const nMetal = ne / m.z;
      const mass = nMetal * m.M;
      $('[data-fa-out]', container).innerHTML =
        `Carga Q = <strong>${Math.round(Q).toLocaleString('pt-PT')} C</strong> &nbsp;|&nbsp; n(e⁻) = ${ne.toFixed(4).replace('.', ',')} mol<br/>` +
        `Quantidade de ${esc(m.sym)}: ${nMetal.toFixed(4).replace('.', ',')} mol &nbsp;⇒&nbsp; <strong>Massa depositada m = ${mass.toFixed(3).replace('.', ',')} g</strong>`;
    };
    sel.addEventListener('change', update);
    $$('input', container).forEach(i => i.addEventListener('input', update));
    update();
  }
}

function renderCodex(root, chapterId = 'base') {
  const ch = CZ.CODEX_BY_ID[chapterId] || CZ.CODEX_LIST[0];
  const idx = CZ.CODEX_LIST.indexOf(ch);
  const prev = CZ.CODEX_LIST[idx - 1] || null;
  const next = CZ.CODEX_LIST[idx + 1] || null;

  if (!S.codexRead.includes(ch.id)) {
    S.codexRead.push(ch.id);
    saveState();
  }

  const checked = S.codexChecks.includes(ch.id);

  root.innerHTML = `
    <div class="container view-enter">
      <div class="codex-layout">
        <aside class="codex-sidebar">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <strong style="font-family:var(--font-display);font-size:0.98rem">Arquivo Científico</strong>
            <span style="font-family:var(--font-mono);font-size:0.74rem;color:var(--teal)">${S.codexChecks.length}/${CZ.CODEX_LIST.length} ✓</span>
          </div>
          <input type="search" class="cz-input" id="codex-search" placeholder="Filtrar capítulos…" style="padding:8px 11px;font-size:0.84rem" />
          <nav class="codex-list" id="codex-nav-list">
            ${CZ.CODEX_LIST.map(c => `
              <a href="#/codex/${esc(c.id)}" class="codex-link ${c.id === ch.id ? 'is-active' : ''}" data-title="${esc((c.title + ' ' + c.subtitle + ' ' + c.tag).toLowerCase())}">
                <span><span class="codex-num">${esc(c.num)}</span> ${esc(c.title)}</span>
                ${S.codexChecks.includes(c.id) ? `<span style="color:#34d399">${icon('check')}</span>` : ''}
              </a>
            `).join('')}
          </nav>
        </aside>

        <article class="codex-article">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px">
            <span class="kicker"><span class="kicker-dot"></span> CAPÍTULO ${esc(ch.num)} · ${esc(ch.tag)} · ${esc(ch.readTime)}</span>
            <button type="button" class="btn btn-sm" id="btn-tts">
              ${icon('sound')} <span id="tts-label">Ouvir Capítulo</span>
            </button>
          </div>

          <h2>${esc(ch.title)}</h2>
          <p style="font-size:1.05rem;color:var(--teal);margin-top:0">${esc(ch.subtitle)}</p>

          <div id="codex-body">${ch.html}</div>
          <div id="codex-widget-slot"></div>

          <!-- Checkpoint de Validação Científica -->
          <div class="cz-widget" id="checkpoint-box" style="border-color:${checked ? 'rgba(52,211,153,0.45)' : 'rgba(94,234,212,0.28)'}">
            <h4>
              ${checked ? icon('check') : icon('bolt')}
              Checkpoint do Capítulo ${esc(ch.num)} ${checked ? '(Validado ✓)' : '(+35 XP)'}
            </h4>
            <p style="color:var(--text);font-weight:600;margin:0 0 12px">${esc(ch.checkpoint.q)}</p>
            <div class="options-list" id="cp-opts">
              ${ch.checkpoint.o.map((opt, i) => `
                <button type="button" class="opt-btn ${checked && i === ch.checkpoint.a ? 'is-correct' : ''}" data-cp-idx="${i}">
                  <span class="opt-key">${String.fromCharCode(65 + i)}</span>
                  <span>${esc(opt)}</span>
                </button>
              `).join('')}
            </div>
            <div id="cp-feedback" style="${checked ? '' : 'display:none'}" class="feedback-banner">
              ${checked ? `<strong>Validado:</strong> ${esc(ch.checkpoint.exp)}` : ''}
            </div>
          </div>

          <div class="codex-pager">
            ${prev
              ? `<a href="#/codex/${esc(prev.id)}" class="btn">${icon('chevron-left')} ${esc(prev.num)}. ${esc(prev.title)}</a>`
              : `<span></span>`
            }
            ${next
              ? `<a href="#/codex/${esc(next.id)}" class="btn btn-primary">${esc(next.num)}. ${esc(next.title)} ${icon('chevron-right')}</a>`
              : `<a href="#/hub" class="btn btn-primary">Voltar às Missões ${icon('chevron-right')}</a>`
            }
          </div>
        </article>
      </div>
    </div>
  `;

  mountCodexWidget($('#codex-widget-slot', root), ch.widget);

  /* Filtro rápido da barra lateral */
  $('#codex-search', root).addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    $$('#codex-nav-list .codex-link', root).forEach(a => {
      const hay = a.getAttribute('data-title') || '';
      a.style.display = !q || hay.includes(q) ? 'flex' : 'none';
    });
  });

  /* Leitura em voz alta (Web Speech API) */
  const ttsBtn = $('#btn-tts', root);
  if (!('speechSynthesis' in window)) {
    ttsBtn.style.display = 'none';
  } else {
    let speaking = false;
    ttsBtn.addEventListener('click', () => {
      if (speaking) {
        window.speechSynthesis.cancel();
        speaking = false;
        $('#tts-label', root).textContent = 'Ouvir Capítulo';
        return;
      }
      window.speechSynthesis.cancel();
      const plain = `${ch.title}. ${ch.subtitle}. ${$('#codex-body', root).innerText}`;
      const ut = new SpeechSynthesisUtterance(plain);
      ut.lang = 'pt-PT';
      ut.rate = 1.02;
      ut.onend = () => {
        speaking = false;
        const lbl = $('#tts-label', root);
        if (lbl) lbl.textContent = 'Ouvir Capítulo';
      };
      speaking = true;
      $('#tts-label', root).textContent = 'Parar Leitura';
      window.speechSynthesis.speak(ut);
    });
  }

  /* Resposta ao Checkpoint */
  $$('[data-cp-idx]', root).forEach(btn => {
    btn.addEventListener('click', () => {
      const idxPicked = parseInt(btn.getAttribute('data-cp-idx'), 10);
      const ok = idxPicked === ch.checkpoint.a;
      const fb = $('#cp-feedback', root);
      fb.style.display = 'block';

      $$('[data-cp-idx]', root).forEach(b => b.classList.remove('is-correct', 'is-wrong'));
      if (ok) {
        btn.classList.add('is-correct');
        fb.className = 'feedback-banner';
        fb.innerHTML = `<strong>Correto!</strong> ${esc(ch.checkpoint.exp)}`;
        Sound.play('ok');
        if (!S.codexChecks.includes(ch.id)) {
          S.codexChecks.push(ch.id);
          addXP(35, `Capítulo ${ch.num} validado!`);
          if (S.codexChecks.length >= 4) unlockBadge('archivist');
          if (S.codexChecks.length >= CZ.CODEX_LIST.length) unlockBadge('scholar_all');
          saveState();
        }
      } else {
        btn.classList.add('is-wrong');
        fb.className = 'feedback-banner is-bad';
        fb.innerHTML = `<strong>Revisa o conceito:</strong> Tenta novamente analisando a explicação acima no texto!`;
        Sound.play('bad');
      }
    });
  });
}
