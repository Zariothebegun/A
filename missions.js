/* ============================================================
   CÉLULA ZERO — Simulador Livre (#/lab) e Missões 1 a 6 (missions.js)
   ============================================================ */

function renderLab(root) {
  const metalOpts = CZ.METALS.map(m =>
    `<option value="${esc(m.id)}">${esc(m.name)} — ${esc(m.ion)}/${esc(m.sym)} (E° = ${fmtV(m.e0)})</option>`
  ).join('');

  root.innerHTML = `
    <div class="container view-enter">
      <div class="mission-head">
        <div class="mh-left">
          <a href="#/hub" class="mh-back" title="Mapa de Missões">${icon('chevron-left')}</a>
          <div>
            <div class="mh-code">BANCADA ELETROQUÍMICA INTERATIVA</div>
            <h1 class="mh-title">Simulador de Pilhas Galvânicas &amp; Eletrólise</h1>
          </div>
        </div>
        <div class="mh-right">
          <span class="hud-stat is-accent" id="lab-fem-chip">fem: +1,10 V</span>
          <a href="#/codex/potenciais" class="btn btn-sm">${icon('book')} Ver Fórmulas</a>
        </div>
      </div>

      <div class="preset-row">
        <button type="button" class="preset-btn" data-preset="daniell">⚡ Pilha de Daniell (Zn | Cu)</button>
        <button type="button" class="preset-btn" data-preset="max">🔥 Máxima Tensão (Li | Au · 4,54 V)</button>
        <button type="button" class="preset-btn" data-preset="eph">📏 Referência EPH (Zn | Pt,H₂)</button>
        <button type="button" class="preset-btn" data-preset="sacrificio">🛡️ Ânodo de Sacrifício (Mg | Fe)</button>
        <button type="button" class="preset-btn" data-preset="conc">🧪 Pilha de Concentração (Cu | Cu)</button>
      </div>

      <div class="split-layout">
        <div id="lab-stage-slot"></div>

        <div class="panel-box">
          <h3>${icon('sliders')} Controlo de Semicélulas &amp; Condições</h3>

          <div class="form-grid" style="margin-top:10px">
            <div>
              <label class="field-label" for="lab-left">Semicélula Esquerda</label>
              <select id="lab-left" class="cz-select">${metalOpts}</select>
            </div>
            <div>
              <label class="field-label" for="lab-right">Semicélula Direita</label>
              <select id="lab-right" class="cz-select">${metalOpts}</select>
            </div>
          </div>

          <div style="display:flex;gap:8px;margin:10px 0 16px">
            <button type="button" class="btn btn-sm" id="lab-swap" style="flex:1">${icon('refresh')} Trocar Esquerda ⇄ Direita</button>
          </div>

          <div class="slider-group">
            <div class="slider-head">
              <span>Concentração Esquerda <span id="lbl-ion-l">[Zn²⁺]</span></span>
              <strong id="val-cl">1,00 mol/dm³</strong>
            </div>
            <input type="range" class="cz-range" id="rng-cl" min="-3" max="0.301" step="0.05" value="0" />
          </div>

          <div class="slider-group">
            <div class="slider-head">
              <span>Concentração Direita <span id="lbl-ion-r">[Cu²⁺]</span></span>
              <strong id="val-cr">1,00 mol/dm³</strong>
            </div>
            <input type="range" class="cz-range" id="rng-cr" min="-3" max="0.301" step="0.05" value="0" />
          </div>

          <div class="slider-group">
            <div class="slider-head">
              <span>Temperatura do Sistema (T)</span>
              <strong id="val-temp">25 °C (298 K)</strong>
            </div>
            <input type="range" class="cz-range" id="rng-temp" min="0" max="80" step="1" value="25" />
          </div>

          <div class="toggle-row">
            <button type="button" class="toggle-pill is-on" id="tog-galv">Pilha Galvânica</button>
            <button type="button" class="toggle-pill" id="tog-elec">Modo Eletrólise</button>
          </div>

          <div class="toggle-row">
            <button type="button" class="toggle-pill is-on" id="tog-bridge">Ponte Salina: Ligada ✓</button>
          </div>

          <div class="cz-result" id="lab-nernst-box" style="margin-top:12px"></div>

          <button type="button" class="btn btn-primary" id="btn-log-exp" style="width:100%;margin-top:14px">
            ${icon('sparkles')} Registar Ensaio no Caderno (+15 XP)
          </button>

          <div id="lab-log-list" style="margin-top:14px;display:grid;gap:6px;font-family:var(--font-mono);font-size:0.75rem"></div>
        </div>
      </div>
    </div>
  `;

  const selL = $('#lab-left', root);
  const selR = $('#lab-right', root);
  const rngCL = $('#rng-cl', root);
  const rngCR = $('#rng-cr', root);
  const rngT = $('#rng-temp', root);
  const togGalv = $('#tog-galv', root);
  const togElec = $('#tog-elec', root);
  const togBridge = $('#tog-bridge', root);

  selL.value = 'Zn';
  selR.value = 'Cu';

  let mode = 'galvanic';
  let saltBridge = true;

  const stage = createCellStage($('#lab-stage-slot', root), {
    leftId: 'Zn', rightId: 'Cu', cLeft: 1.0, cRight: 1.0, tempC: 25
  });
  onCleanup(() => stage.destroy());

  function syncAll() {
    const cL = Math.pow(10, parseFloat(rngCL.value));
    const cR = Math.pow(10, parseFloat(rngCR.value));
    const tempC = parseFloat(rngT.value);

    stage.setParams({
      leftId: selL.value,
      rightId: selR.value,
      cLeft: cL,
      cRight: cR,
      tempC,
      mode,
      saltBridge
    });

    const { phys } = stage.getState();
    $('#lbl-ion-l', root).textContent = `[${phys.mL.ion}]`;
    $('#lbl-ion-r', root).textContent = `[${phys.mR.ion}]`;
    $('#val-cl', root).textContent = `${cL < 0.05 ? cL.toFixed(3) : cL.toFixed(2)} mol/dm³`.replace('.', ',');
    $('#val-cr', root).textContent = `${cR < 0.05 ? cR.toFixed(3) : cR.toFixed(2)} mol/dm³`.replace('.', ',');
    $('#val-temp', root).textContent = `${Math.round(tempC)} °C (${Math.round(tempC + 273.15)} K)`;

    $('#lab-fem-chip', root).textContent = !saltBridge
      ? 'Circuito Aberto (0,00 V)'
      : (mode === 'electrolysis' ? `Fonte DC: ${fmtV(phys.vApplied, false)}` : `fem: ${fmtV(phys.fem)}`);

    $('#lab-nernst-box', root).innerHTML = `
      <div><strong>Equação Global:</strong> ${esc(phys.globalEq)}</div>
      <div style="margin-top:4px;color:var(--teal)">
        E°padrão = ${fmtV(phys.e0Cell)} &nbsp;|&nbsp;
        ${mode === 'electrolysis'
          ? `V_mín necessária = ${fmtV(Math.abs(phys.fem), false)}`
          : `E(Nernst) = ${saltBridge ? fmtV(phys.fem) : '0,00 V'}`}
      </div>
      <div style="margin-top:4px;color:var(--text-muted);font-size:0.76rem">${esc(phys.mAn.note)}</div>
    `;

    if (saltBridge && mode === 'galvanic' && phys.fem > 3.5) {
      unlockBadge('high_voltage');
    }
    if (mode === 'electrolysis') {
      unlockBadge('electrolyzer');
    }
  }

  function renderLogs() {
    const list = $('#lab-log-list', root);
    if (!S.labNotes || !S.labNotes.length) {
      list.innerHTML = '';
      return;
    }
    list.innerHTML = `<div style="color:var(--text-muted);margin-top:4px">Últimos ensaios registados:</div>` +
      S.labNotes.slice(0, 4).map(n =>
        `<div style="padding:7px 10px;border-radius:8px;background:rgba(3,8,18,0.7);border:1px solid var(--border)">${esc(n)}</div>`
      ).join('');
  }

  [selL, selR].forEach(el => el.addEventListener('change', () => { Sound.play('click'); syncAll(); }));
  [rngCL, rngCR, rngT].forEach(el => el.addEventListener('input', syncAll));

  $('#lab-swap', root).addEventListener('click', () => {
    Sound.play('click');
    const tmp = selL.value;
    selL.value = selR.value;
    selR.value = tmp;
    syncAll();
  });

  togGalv.addEventListener('click', () => {
    Sound.play('click');
    mode = 'galvanic';
    togGalv.classList.add('is-on');
    togElec.classList.remove('is-on');
    syncAll();
  });

  togElec.addEventListener('click', () => {
    Sound.play('power');
    mode = 'electrolysis';
    togElec.classList.add('is-on');
    togGalv.classList.remove('is-on');
    syncAll();
  });

  togBridge.addEventListener('click', () => {
    Sound.play('click');
    saltBridge = !saltBridge;
    togBridge.classList.toggle('is-on', saltBridge);
    togBridge.textContent = saltBridge ? 'Ponte Salina: Ligada ✓' : 'Ponte Salina: Removida ✕';
    syncAll();
  });

  $$('[data-preset]', root).forEach(btn => {
    btn.addEventListener('click', () => {
      Sound.play('scan');
      const p = btn.getAttribute('data-preset');
      mode = 'galvanic';
      saltBridge = true;
      togGalv.classList.add('is-on');
      togElec.classList.remove('is-on');
      togBridge.classList.add('is-on');
      togBridge.textContent = 'Ponte Salina: Ligada ✓';
      rngT.value = '25';

      if (p === 'daniell') { selL.value = 'Zn'; selR.value = 'Cu'; rngCL.value = '0'; rngCR.value = '0'; }
      if (p === 'max') { selL.value = 'Li'; selR.value = 'Au'; rngCL.value = '0'; rngCR.value = '0'; }
      if (p === 'eph') { selL.value = 'Zn'; selR.value = 'H2'; rngCL.value = '0'; rngCR.value = '0'; }
      if (p === 'sacrificio') { selL.value = 'Mg'; selR.value = 'Fe'; rngCL.value = '0'; rngCR.value = '0'; }
      if (p === 'conc') { selL.value = 'Cu'; selR.value = 'Cu'; rngCL.value = '-2'; rngCR.value = '0'; }
      syncAll();
    });
  });

  $('#btn-log-exp', root).addEventListener('click', () => {
    const { phys } = stage.getState();
    const entry = `${phys.iupac} → ${mode === 'electrolysis' ? 'Eletrólise ' + fmtV(phys.vApplied, false) : fmtV(phys.fem)} (${Math.round(parseFloat(rngT.value))} °C)`;
    S.labNotes = [entry, ...(S.labNotes || [])].slice(0, 8);
    S.labExperiments = (S.labExperiments || 0) + 1;
    if (S.labExperiments <= 5) addXP(15, 'Ensaio registado no caderno!');
    else { Sound.play('ok'); toast('Ensaio guardado!', entry, 'beaker'); }
    saveState();
    renderLogs();
  });

  syncAll();
  renderLogs();
}

/* ============================================================
   DISPATCHER DAS 6 MISSÕES NARRATIVAS
   ============================================================ */
function renderMission(root, id) {
  const m = CZ.MISSIONS.find(x => x.id === id) || CZ.MISSIONS[0];
  if (m.id === 'm1') return renderM1(root, m);
  if (m.id === 'm2') return renderM2(root, m);
  if (m.id === 'm3') return renderM3(root, m);
  if (m.id === 'm4') return renderM4(root, m);
  if (m.id === 'm5') return renderM5(root, m);
  if (m.id === 'm6') return renderM6(root, m);
}

/* ------------------------------------------------------------
   MÓDULO 01 — ANATOMIA DA CÉLULA (7 Hotspots + Micro-diagnóstico)
   ------------------------------------------------------------ */
function renderM1(root, m) {
  let solved = new Set();
  let mistakes = 0;
  let current = CZ.M1_PARTS[0];

  function draw() {
    root.innerHTML = `
      <div class="container view-enter">
        ${missionHeadHTML(m, `<span class="hud-stat is-accent" id="m1-prog">0 / ${CZ.M1_PARTS.length} Órgãos Reparados</span>`)}

        <div class="split-layout">
          <div id="m1-stage"></div>

          <div class="panel-box">
            <h3>${icon('atom')} Consola de Diagnóstico Estrutural</h3>
            <p style="color:var(--text-muted);font-size:0.86rem;margin-top:0">
              Clica nos pontos numerados (1 a 7) sobre o diagrama da Pilha de Daniell e valida a função de cada componente:
            </p>
            <div class="part-chips" id="m1-chips"></div>
            <div id="m1-detail"></div>
          </div>
        </div>
      </div>
    `;

    const stage = createCellStage($('#m1-stage', root), {
      leftId: 'Zn', rightId: 'Cu',
      hotspots: CZ.M1_PARTS,
      onHotspot: (part) => selectPart(part)
    });
    onCleanup(() => stage.destroy());

    function renderChipsAndDetail() {
      $('#m1-prog', root).textContent = `${solved.size} / ${CZ.M1_PARTS.length} Órgãos Reparados`;
      $('#m1-chips', root).innerHTML = CZ.M1_PARTS.map((p, i) => `
        <button type="button" class="part-chip ${solved.has(p.id) ? 'is-found' : ''} ${current.id === p.id ? 'is-active' : ''}" data-pid="${esc(p.id)}">
          ${i + 1}. ${esc(p.label.split('—')[0].trim())} ${solved.has(p.id) ? '✓' : ''}
        </button>
      `).join('');

      $$('[data-pid]', root).forEach(b => {
        b.addEventListener('click', () => {
          Sound.play('click');
          const found = CZ.M1_PARTS.find(x => x.id === b.getAttribute('data-pid'));
          if (found) selectPart(found);
        });
      });

      const isDone = solved.has(current.id);
      $('#m1-detail', root).innerHTML = `
        <div class="cz-widget" style="margin-top:8px">
          <h4>${esc(current.label)}</h4>
          <p style="font-size:0.9rem;color:var(--text-soft);margin:0 0 10px">${esc(current.role)}</p>
          <div class="formula-box" style="margin:8px 0;padding:10px 12px;font-size:0.82rem">${esc(current.eq)}</div>
          <p style="font-size:0.8rem;color:var(--amber);margin:6px 0 14px">⚠️ ${esc(current.trap)}</p>

          <div style="border-top:1px solid var(--border);padding-top:12px">
            <strong style="display:block;font-size:0.88rem;margin-bottom:10px">${esc(current.q)}</strong>
            <div class="options-list">
              ${current.opts.map((opt, idx) => `
                <button type="button" class="opt-btn ${isDone && idx === current.ans ? 'is-correct' : ''}" data-ans="${idx}" ${isDone ? 'disabled' : ''}>
                  <span class="opt-key">${idx + 1}</span>
                  <span>${esc(opt)}</span>
                </button>
              `).join('')}
            </div>
            <div id="m1-fb"></div>
          </div>
        </div>
      `;

      $$('[data-ans]', root).forEach(btn => {
        btn.addEventListener('click', () => {
          const pickIdx = parseInt(btn.getAttribute('data-ans'), 10);
          if (pickIdx === current.ans) {
            Sound.play('ok');
            solved.add(current.id);
            stage.markFound(current.id);
            if (solved.size === CZ.M1_PARTS.length) {
              finishM1();
              return;
            }
            const nextUnsolved = CZ.M1_PARTS.find(p => !solved.has(p.id));
            if (nextUnsolved) current = nextUnsolved;
            stage.setActive(current.id);
            renderChipsAndDetail();
          } else {
            mistakes++;
            Sound.play('bad');
            btn.classList.add('is-wrong');
            $('#m1-fb', root).innerHTML = `<div class="feedback-banner is-bad">Resposta incorreta — relê a função científica deste órgão acima!</div>`;
          }
        });
      });
    }

    function selectPart(part) {
      current = part;
      stage.setActive(part.id);
      renderChipsAndDetail();
    }

    function finishM1() {
      const score = clamp(Math.round(100 - mistakes * 10), 60, 100);
      const stars = mistakes === 0 ? 3 : (mistakes <= 2 ? 2 : 1);
      if (mistakes === 0) unlockBadge('anatomist');
      const { earnedXP } = completeMission('m1', { score, stars, xp: m.xp });
      root.innerHTML = `<div class="container">${missionCompleteScreen({
        mission: m, score, stars, earnedXP, nextId: 'm2',
        summary: 'Todos os 7 componentes da Pilha de Daniell foram diagnosticados e selados com sucesso!'
      })}</div>`;
      bindRetry(root, () => renderM1(root, m));
    }

    stage.setActive(current.id);
    renderChipsAndDetail();
  }

  draw();
}

/* ------------------------------------------------------------
   MÓDULO 02 — CAÇA-ELETRÕES (Arcade V/F com Combo, Vidas & Timer)
   ------------------------------------------------------------ */
function renderM2(root, m) {
  const TOTAL = 10;
  const deck = shuffle(CZ.M2_STATEMENTS).slice(0, TOTAL);
  let idx = 0;
  let lives = 3;
  let combo = 0;
  let maxCombo = 0;
  let correctCount = 0;
  let locked = false;
  let timeLeft = 100; /* % */
  let timer = null;

  function clearTick() {
    if (timer) { clearInterval(timer); timer = null; }
  }
  onCleanup(clearTick);

  function startRound() {
    clearTick();
    if (idx >= deck.length || lives <= 0) {
      return finish();
    }
    locked = false;
    timeLeft = 100;
    const item = deck[idx];
    const hearts = Array.from({ length: 3 }, (_, i) =>
      `<span style="color:${i < lives ? '#fb7185' : 'rgba(148,163,184,0.22)'}">${icon('heart')}</span>`
    ).join(' ');

    root.innerHTML = `
      <div class="container view-enter">
        ${missionHeadHTML(m, `
          <span class="hud-stat">${hearts}</span>
          <span class="hud-stat is-accent">Combo x${combo}</span>
          <span class="hud-stat">Impulso ${idx + 1}/${TOTAL}</span>
        `)}

        <div class="arcade-arena">
          <div class="timer-bar-wrap"><div class="timer-bar" id="m2-bar"></div></div>
          <div class="kicker" style="margin-bottom:12px"><span class="kicker-dot"></span> INTERCETAÇÃO DE DADOS · TECLAS [V] / [F]</div>

          <div class="statement-card">
            <p class="statement-text">«${esc(item.s)}»</p>
          </div>

          <div class="vf-buttons">
            <button type="button" class="vf-btn is-true" id="btn-v">✓ VERDADEIRO (V)</button>
            <button type="button" class="vf-btn is-false" id="btn-f">✕ FALSO (F)</button>
          </div>

          <div id="m2-fb"></div>
        </div>
      </div>
    `;

    $('#btn-v', root).addEventListener('click', () => answer(true));
    $('#btn-f', root).addEventListener('click', () => answer(false));

    timer = setInterval(() => {
      if (locked) return;
      timeLeft -= 0.75;
      const bar = $('#m2-bar', root);
      if (bar) bar.style.width = `${Math.max(0, timeLeft)}%`;
      if (timeLeft <= 0) {
        answer(null);
      }
    }, 100);
  }

  function answer(val) {
    if (locked) return;
    locked = true;
    clearTick();

    const item = deck[idx];
    const ok = val === item.isTrue;
    $('#btn-v', root).disabled = true;
    $('#btn-f', root).disabled = true;

    if (ok) {
      correctCount++;
      combo++;
      maxCombo = Math.max(maxCombo, combo);
      if (maxCombo >= 6) unlockBadge('electron_hunter');
      Sound.play('ok');
    } else {
      lives--;
      combo = 0;
      Sound.play('bad');
    }

    $('#m2-fb', root).innerHTML = `
      <div class="feedback-banner ${ok ? '' : 'is-bad'}" style="text-align:left">
        <strong>${val === null ? 'Tempo esgotado!' : (ok ? 'Impulso Validado!' : 'Erro de Polaridade!')}</strong>
        ${esc(item.exp)}
        <div style="margin-top:12px;text-align:right">
          <button type="button" class="btn btn-primary btn-sm" id="m2-next">
            ${idx + 1 >= TOTAL || lives <= 0 ? 'Ver Resultado Final →' : 'Próximo Impulso →'}
          </button>
        </div>
      </div>
    `;

    $('#m2-next', root).addEventListener('click', () => {
      idx++;
      startRound();
    });
  }

  function onKey(e) {
    if ($('#modal-root.is-open')) return;
    if (!locked) {
      if (e.key === 'v' || e.key === 'V' || e.key === 'ArrowLeft') answer(true);
      if (e.key === 'f' || e.key === 'F' || e.key === 'ArrowRight') answer(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      const nxt = $('#m2-next', root);
      if (nxt) { e.preventDefault(); nxt.click(); }
    }
  }
  document.addEventListener('keydown', onKey);
  onCleanup(() => document.removeEventListener('keydown', onKey));

  function finish() {
    clearTick();
    const score = Math.round((correctCount / TOTAL) * 100);
    if (lives <= 0 && correctCount < 5) {
      awardBest('m2', score);
      root.innerHTML = `
        <div class="container">
          <div class="complete-card view-enter">
            <div class="kicker" style="color:var(--rose)">FALHA DE CONTENÇÃO</div>
            <h2 class="section-title">Escudo Eletrónico Esgotado</h2>
            <p class="section-lead" style="margin:0 auto 20px">Acertaste ${correctCount} em ${TOTAL} impulsos (Combo máx: x${maxCombo}). Tenta novamente!</p>
            <button type="button" class="btn btn-primary" data-retry>${icon('refresh')} Tentar Novamente</button>
          </div>
        </div>
      `;
      bindRetry(root, () => renderM2(root, m));
      return;
    }

    const stars = score >= 90 ? 3 : (score >= 70 ? 2 : 1);
    const { earnedXP } = completeMission('m2', { score, stars, xp: m.xp });
    root.innerHTML = `<div class="container">${missionCompleteScreen({
      mission: m, score, stars, earnedXP, nextId: 'm3',
      summary: `Intercetaste ${correctCount}/${TOTAL} impulsos científicos com um combo máximo de x${maxCombo}!`
    })}</div>`;
    bindRetry(root, () => renderM2(root, m));
  }

  startRound();
}

/* ------------------------------------------------------------
   MÓDULO 03 — ENGENHARIA DE PILHAS (4 Contratos no Simulador)
   ------------------------------------------------------------ */
function renderM3(root, m) {
  const CONTRACTS = [
    {
      title: 'Contrato 1/4 — Padrão Histórico de Daniell',
      goal: 'Configura a clássica Pilha de Daniell em modo Galvânico com ponte salina ativa (Zinco e Cobre, E° = +1,10 V).',
      check: (st) => {
        const ids = [st.leftId, st.rightId].sort().join('+');
        return st.mode === 'galvanic' && st.saltBridge && ids === 'Cu+Zn';
      },
      okMsg: 'Pilha de Daniell operacional a +1,10 V!'
    },
    {
      title: 'Contrato 2/4 — Alimentação de Emergência (> 3,10 V)',
      goal: 'O escudo precisa de alta tensão! Escolhe um par de elétrodos em modo Galvânico que forneça E°célula superior a +3,10 V.',
      check: (st) => st.mode === 'galvanic' && st.saltBridge && st.phys.fem > 3.10,
      okMsg: 'Alta tensão estabilizada acima de 3,10 V!'
    },
    {
      title: 'Contrato 3/4 — Proteção Catódica do Ferro',
      goal: 'Mantém o Ferro (Fe) numa das semicélulas em modo Galvânico e protege-o ligando-o a um ânodo de sacrifício mais redutor (Zn, Al, Mg ou Li) para que o Fe seja o CÁTODO!',
      check: (st) => {
        const hasFe = st.leftId === 'Fe' || st.rightId === 'Fe';
        return st.mode === 'galvanic' && st.saltBridge && hasFe && st.phys.mCat.id === 'Fe' && st.phys.mAn.id !== 'Fe';
      },
      okMsg: 'Ferro protegido como cátodo! O ânodo de sacrifício sofre a oxidação no lugar dele.'
    },
    {
      title: 'Contrato 4/4 — Regeneração por Eletrólise',
      goal: 'Agora inverte o processo: ativa o Modo Eletrólise (com ponte salina ligada) em dois elétrodos distintos para forçar a recarga química!',
      check: (st) => st.mode === 'electrolysis' && st.saltBridge && st.leftId !== st.rightId,
      okMsg: 'Regime eletrolítico validado! Repara como o ânodo passou a (+) e o cátodo a (−).'
    }
  ];

  let step = 0;
  const optsHTML = CZ.METALS.map(x => `<option value="${esc(x.id)}">${esc(x.name)} (${fmtV(x.e0)})</option>`).join('');

  root.innerHTML = `
    <div class="container view-enter">
      ${missionHeadHTML(m, `<span class="hud-stat is-accent" id="m3-step">Contrato 1 / 4</span>`)}

      <div class="split-layout">
        <div id="m3-stage"></div>

        <div class="panel-box">
          <div class="kicker" id="m3-kicker"><span class="kicker-dot"></span> CONTRATO ATIVO</div>
          <h3 id="m3-ctitle" style="margin-top:10px"></h3>
          <p id="m3-cgoal" style="color:var(--text-soft);font-size:0.92rem"></p>

          <div class="form-grid">
            <div>
              <label class="field-label">Elétrodo Esquerdo</label>
              <select id="m3-l" class="cz-select">${optsHTML}</select>
            </div>
            <div>
              <label class="field-label">Elétrodo Direito</label>
              <select id="m3-r" class="cz-select">${optsHTML}</select>
            </div>
          </div>

          <div class="toggle-row">
            <button type="button" class="toggle-pill is-on" id="m3-galv">Pilha Galvânica</button>
            <button type="button" class="toggle-pill" id="m3-elec">Modo Eletrólise</button>
          </div>

          <button type="button" class="btn btn-primary" id="m3-verify" style="width:100%;margin-top:10px">
            ${icon('check')} Validar Configuração do Reator
          </button>

          <div id="m3-fb"></div>
        </div>
      </div>
    </div>
  `;

  const selL = $('#m3-l', root);
  const selR = $('#m3-r', root);
  selL.value = 'Fe';
  selR.value = 'Cu';
  let mode = 'galvanic';

  const stage = createCellStage($('#m3-stage', root), { leftId: 'Fe', rightId: 'Cu' });
  onCleanup(() => stage.destroy());

  function syncStage() {
    stage.setParams({ leftId: selL.value, rightId: selR.value, mode, saltBridge: true });
  }

  function loadContract() {
    const c = CONTRACTS[step];
    $('#m3-step', root).textContent = `Contrato ${step + 1} / ${CONTRACTS.length}`;
    $('#m3-ctitle', root).textContent = c.title;
    $('#m3-cgoal', root).textContent = c.goal;
    $('#m3-fb', root).innerHTML = '';
  }

  selL.addEventListener('change', () => { Sound.play('click'); syncStage(); });
  selR.addEventListener('change', () => { Sound.play('click'); syncStage(); });

  $('#m3-galv', root).addEventListener('click', () => {
    Sound.play('click');
    mode = 'galvanic';
    $('#m3-galv', root).classList.add('is-on');
    $('#m3-elec', root).classList.remove('is-on');
    syncStage();
  });

  $('#m3-elec', root).addEventListener('click', () => {
    Sound.play('power');
    mode = 'electrolysis';
    $('#m3-elec', root).classList.add('is-on');
    $('#m3-galv', root).classList.remove('is-on');
    syncStage();
  });

  $('#m3-verify', root).addEventListener('click', () => {
    const st = stage.getState();
    const c = CONTRACTS[step];
    if (c.check(st)) {
      Sound.play('ok');
      $('#m3-fb', root).innerHTML = `
        <div class="feedback-banner">
          <strong>${esc(c.okMsg)}</strong>
          <div style="margin-top:10px">
            <button type="button" class="btn btn-primary btn-sm" id="m3-next">
              ${step + 1 >= CONTRACTS.length ? 'Concluir Engenharia →' : 'Avançar para o Próximo Contrato →'}
            </button>
          </div>
        </div>
      `;
      $('#m3-next', root).addEventListener('click', () => {
        step++;
        if (step >= CONTRACTS.length) {
          unlockBadge('daniell_master');
          unlockBadge('electrolyzer');
          const { earnedXP } = completeMission('m3', { score: 100, stars: 3, xp: m.xp });
          root.innerHTML = `<div class="container">${missionCompleteScreen({
            mission: m, score: 100, stars: 3, earnedXP, nextId: 'm4',
            summary: 'Cumpriste os 4 contratos de engenharia: Daniell, Alta Tensão, Proteção Catódica e Eletrólise!'
          })}</div>`;
          bindRetry(root, () => renderM3(root, m));
        } else {
          loadContract();
        }
      });
    } else {
      Sound.play('bad');
      $('#m3-fb', root).innerHTML = `
        <div class="feedback-banner is-bad">
          Configuração ainda não satisfaz os requisitos do contrato. Observa os valores de E° e quem está como Ânodo/Cátodo no diagrama!
        </div>
      `;
    }
  });

  syncStage();
  loadContract();
}

/* ------------------------------------------------------------
   MÓDULO 04 — RADAR DE ESPONTANEIDADE (ΔE° & ΔG°)
   ------------------------------------------------------------ */
function renderM4(root, m) {
  const TOTAL = 8;
  const deck = shuffle(CZ.REACTIONS).slice(0, TOTAL);
  let idx = 0;
  let hits = 0;
  let answered = false;

  function renderRound() {
    if (idx >= TOTAL) {
      const score = Math.round((hits / TOTAL) * 100);
      const stars = score >= 85 ? 3 : (score >= 65 ? 2 : 1);
      if (score >= 80) unlockBadge('radar_ace');
      const { earnedXP } = completeMission('m4', { score, stars, xp: m.xp });
      root.innerHTML = `<div class="container">${missionCompleteScreen({
        mission: m, score, stars, earnedXP, nextId: 'm5',
        summary: `Analisaste ${TOTAL} sistemas redox na série eletroquímica com ${score}% de precisão!`
      })}</div>`;
      bindRetry(root, () => renderM4(root, m));
      return;
    }

    answered = false;
    const r = deck[idx];

    root.innerHTML = `
      <div class="container view-enter">
        ${missionHeadHTML(m, `
          <span class="hud-stat is-accent">Precisão: ${hits}/${idx}</span>
          <span class="hud-stat">Sistema ${idx + 1}/${TOTAL}</span>
        `)}

        <div class="radar-box">
          <div class="kicker"><span class="kicker-dot"></span> VARRIMENTO TERMODINÂMICO PADRÃO (25 °C, 1 M)</div>
          <div class="rxn-equation">${esc(r.eq)}</div>

          <div class="pairs-compare">
            <div class="pair-tile">
              <small style="color:var(--text-muted);display:block">Par da espécie que oxida na equação</small>
              <strong style="color:var(--amber)">${esc(r.oxPair)}</strong>
            </div>
            <div class="pair-tile">
              <small style="color:var(--text-muted);display:block">Par da espécie que reduz na equação</small>
              <strong style="color:var(--teal)">${esc(r.redPair)}</strong>
            </div>
          </div>

          <p style="text-align:center;color:var(--text-soft);margin:0 0 16px">
            No sentido em que está escrita, esta reação redox é <strong>espontânea</strong> em condições padrão?
          </p>

          <div class="vf-buttons">
            <button type="button" class="vf-btn is-true" data-spont="true">
              ⚡ ESPONTÂNEA (ΔE° &gt; 0 · ΔG° &lt; 0)
            </button>
            <button type="button" class="vf-btn is-false" data-spont="false">
              ⛔ NÃO ESPONTÂNEA (ΔE° &lt; 0 · ΔG° &gt; 0)
            </button>
          </div>

          <div id="m4-fb"></div>
        </div>
      </div>
    `;

    $$('[data-spont]', root).forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const pick = btn.getAttribute('data-spont') === 'true';
        const ok = pick === r.spont;
        if (ok) { hits++; Sound.play('ok'); }
        else Sound.play('bad');

        $('#m4-fb', root).innerHTML = `
          <div class="feedback-banner ${ok ? '' : 'is-bad'}">
            <strong>${ok ? 'Diagnóstico Exato!' : 'Sinal Termodinâmico Invertido!'}</strong>
            ΔE° = ${fmtV(r.de0)}. ${esc(r.exp)}
            <div style="margin-top:6px;font-family:var(--font-mono);font-size:0.8rem;color:var(--teal)">
              Oxidante da reação direta: ${esc(r.oxidant)} · Redutor: ${esc(r.reductant)}
            </div>
            <div style="margin-top:12px;text-align:right">
              <button type="button" class="btn btn-primary btn-sm" id="m4-next">Próximo Sistema →</button>
            </div>
          </div>
        `;
        $('#m4-next', root).addEventListener('click', () => {
          idx++;
          renderRound();
        });
      });
    });
  }

  renderRound();
}

/* ------------------------------------------------------------
   MÓDULO 05 — CÂMARA DE VALIDAÇÃO (Quiz de 10 Questões + 3 Power-Ups)
   ------------------------------------------------------------ */
function renderM5(root, m) {
  const TOTAL = 10;
  const questions = shuffle(CZ.QUIZ).slice(0, TOTAL);
  let idx = 0;
  let hits = 0;
  let pu50 = true;
  let puHint = true;
  let puShield = true;
  let shieldActive = false;
  let locked = false;

  function renderQ() {
    if (idx >= TOTAL) {
      const score = Math.round((hits / TOTAL) * 100);
      const stars = score >= 90 ? 3 : (score >= 70 ? 2 : 1);
      if (score >= 90) unlockBadge('quiz_flawless');
      const { earnedXP } = completeMission('m5', { score, stars, xp: m.xp });
      root.innerHTML = `<div class="container">${missionCompleteScreen({
        mission: m, score, stars, earnedXP, nextId: 'm6',
        summary: `Superaste ${hits} em ${TOTAL} questões científicas de nível exame nacional!`
      })}</div>`;
      bindRetry(root, () => renderM5(root, m));
      return;
    }

    locked = false;
    shieldActive = false;
    const q = questions[idx];
    const opts = shuffle(q.o.map((text, origIdx) => ({
      text,
      isCorrect: origIdx === q.a
    })));

    root.innerHTML = `
      <div class="container view-enter">
        ${missionHeadHTML(m, `
          <span class="hud-stat is-accent">Certas: ${hits}/${idx}</span>
          <span class="hud-stat">Questão ${idx + 1}/${TOTAL}</span>
        `)}

        <div class="quiz-wrap">
          <div class="powerups-bar">
            <button type="button" class="pu-btn" id="pu-50" ${!pu50 ? 'disabled' : ''}>
              ${icon('sliders')} 50/50 Químico
            </button>
            <button type="button" class="pu-btn" id="pu-hint" ${!puHint ? 'disabled' : ''}>
              ${icon('sparkles')} Pista Científica
            </button>
            <button type="button" class="pu-btn" id="pu-shield" ${!puShield ? 'disabled' : ''}>
              ${icon('shield')} Escudo Iónico (2.ª hipótese)
            </button>
          </div>

          <div class="quiz-card">
            <span class="kicker"><span class="kicker-dot"></span> ${esc(CZ.TOPICS[q.topic] || 'Eletroquímica')} · NÍVEL ${q.diff}</span>
            <h2 class="quiz-q">${esc(q.q)}</h2>

            <div id="quiz-hint-slot"></div>

            <div class="options-list" id="quiz-opts">
              ${opts.map((o, i) => `
                <button type="button" class="opt-btn" data-opt-i="${i}" data-correct="${o.isCorrect ? '1' : '0'}">
                  <span class="opt-key">${i + 1}</span>
                  <span>${esc(o.text)}</span>
                </button>
              `).join('')}
            </div>

            <div id="quiz-fb"></div>
          </div>
        </div>
      </div>
    `;

    $('#pu-50', root)?.addEventListener('click', () => {
      if (!pu50 || locked) return;
      pu50 = false;
      $('#pu-50', root).disabled = true;
      Sound.play('power');
      const wrongs = $$('[data-correct="0"]', root);
      shuffle(wrongs).slice(0, 2).forEach(b => b.classList.add('is-eliminated'));
    });

    $('#pu-hint', root)?.addEventListener('click', () => {
      if (!puHint || locked) return;
      puHint = false;
      $('#pu-hint', root).disabled = true;
      Sound.play('scan');
      $('#quiz-hint-slot', root).innerHTML = `<div class="callout" style="margin:0 0 14px"><strong>Pista Laboratorial:</strong> ${esc(q.hint)}</div>`;
    });

    $('#pu-shield', root)?.addEventListener('click', () => {
      if (!puShield || locked) return;
      puShield = false;
      shieldActive = true;
      $('#pu-shield', root).disabled = true;
      Sound.play('power');
      toast('Escudo Iónico Ativo!', 'Se falhares nesta questão tens direito a uma 2.ª tentativa imediata.', 'shield');
    });

    $$('[data-opt-i]', root).forEach(btn => {
      btn.addEventListener('click', () => choose(btn));
    });

    function choose(btn) {
      if (locked || btn.classList.contains('is-eliminated')) return;
      const isOk = btn.getAttribute('data-correct') === '1';

      if (!isOk && shieldActive) {
        shieldActive = false;
        Sound.play('bad');
        btn.classList.add('is-eliminated');
        toast('Escudo absorveu o erro!', 'Escolhe outra opção!', 'shield');
        return;
      }

      locked = true;
      $$('[data-opt-i]', root).forEach(b => {
        b.disabled = true;
        if (b.getAttribute('data-correct') === '1') b.classList.add('is-correct');
      });

      if (isOk) {
        hits++;
        Sound.play('ok');
      } else {
        btn.classList.add('is-wrong');
        Sound.play('bad');
      }

      $('#quiz-fb', root).innerHTML = `
        <div class="feedback-banner ${isOk ? '' : 'is-bad'}">
          <strong>${isOk ? 'Resposta Certa!' : 'Resposta Incorreta.'}</strong> ${esc(q.exp)}
          <div style="margin-top:12px;text-align:right">
            <button type="button" class="btn btn-primary btn-sm" id="quiz-next">
              ${idx + 1 >= TOTAL ? 'Concluir Validação →' : 'Próxima Questão →'}
            </button>
          </div>
        </div>
      `;
      $('#quiz-next', root).addEventListener('click', () => {
        idx++;
        renderQ();
      });
    }
  }

  function onQuizKey(e) {
    if ($('#modal-root.is-open')) return;
    if (!locked && ['1', '2', '3', '4'].includes(e.key)) {
      const b = $(`[data-opt-i="${parseInt(e.key, 10) - 1}"]`, root);
      if (b) b.click();
    } else if (locked && (e.key === 'Enter' || e.key === ' ')) {
      const nxt = $('#quiz-next', root);
      if (nxt) { e.preventDefault(); nxt.click(); }
    }
  }
  document.addEventListener('keydown', onQuizKey);
  onCleanup(() => document.removeEventListener('keydown', onQuizKey));

  renderQ();
}

/* ------------------------------------------------------------
   MÓDULO 06 — BOSS FINAL: O CORROSOR (3 Fases + Arte SVG Original)
   ------------------------------------------------------------ */
function renderM6(root, m) {
  const p1 = shuffle(CZ.BOSS_Q.filter(q => q.phase === 1)).slice(0, 3);
  const p2 = shuffle(CZ.BOSS_Q.filter(q => q.phase === 2)).slice(0, 4);
  const p3 = shuffle(CZ.BOSS_Q.filter(q => q.phase === 3)).slice(0, 3);
  const battleDeck = [...p1, ...p2, ...p3]; /* 10 turnos decisivos */

  let turn = 0;
  let bossHP = 100;
  let shieldHP = 100;
  let locked = false;

  function renderTurn() {
    if (bossHP <= 0 || turn >= battleDeck.length) {
      if (shieldHP > 0) return victory();
    }
    if (shieldHP <= 0) {
      return defeat();
    }

    locked = false;
    const cur = battleDeck[turn];
    const opts = shuffle(cur.o.map((t, i) => ({ text: t, ok: i === cur.a })));
    const phaseColor = cur.phase === 1 ? '#fb923c' : (cur.phase === 2 ? '#f43f5e' : '#c084fc');

    root.innerHTML = `
      <div class="container view-enter">
        ${missionHeadHTML(m, `
          <span class="hud-stat is-danger">FASE ${cur.phase} / 3</span>
          <span class="hud-stat">Turno ${turn + 1}/${battleDeck.length}</span>
        `)}

        <div class="boss-arena">
          <div class="boss-stage-card" id="boss-card">
            <div class="kicker" style="border-color:${phaseColor};color:${phaseColor}">
              ENTIDADE ENTRÓPICA · O CORROSOR
            </div>

            <!-- Arte Vetorial Original do Boss O Corrosor -->
            <svg class="boss-svg" viewBox="0 0 320 300" aria-label="Boss O Corrosor">
              <defs>
                <radialGradient id="bossAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="${phaseColor}" stop-opacity="0.5"/>
                  <stop offset="100%" stop-color="#090612" stop-opacity="0"/>
                </radialGradient>
              </defs>
              <circle cx="160" cy="150" r="130" fill="url(#bossAura)"/>
              <g style="transform-origin:160px 150px;animation:czSpin ${14 - cur.phase * 3}s linear infinite">
                <polygon points="160,28 190,62 242,48 232,100 282,126 246,166 268,216 214,222 192,270 160,236 128,270 106,222 52,216 74,166 38,126 88,100 78,48 130,62"
                         fill="rgba(36,12,26,0.88)" stroke="${phaseColor}" stroke-width="2.5"/>
              </g>
              <polygon points="160,72 222,115 204,196 116,196 98,115" fill="#160917" stroke="#fda4af" stroke-width="2"/>
              <!-- Olhos incandescentes de óxido -->
              <polygon points="122,132 150,142 128,154" fill="${phaseColor}"/>
              <polygon points="198,132 170,142 192,154" fill="${phaseColor}"/>
              <!-- Fenda de descarga -->
              <path d="M126 176 L144 168 L160 180 L176 168 L194 176" fill="none" stroke="#fecdd3" stroke-width="3" stroke-linecap="round"/>
              <text x="160" y="290" text-anchor="middle" fill="#fda4af" font-family="JetBrains Mono" font-size="10.5">ATAQUE: ${esc(cur.attack)}</text>
            </svg>

            <div class="hp-bars">
              <div class="hp-row">
                <div class="hp-label">
                  <span style="color:#fda4af">Integridade d'O Corrosor (Fe₂O₃·xH₂O)</span>
                  <strong>${Math.max(0, bossHP)}%</strong>
                </div>
                <div class="hp-track"><div class="hp-fill is-boss" style="width:${Math.max(0, bossHP)}%"></div></div>
              </div>
              <div class="hp-row">
                <div class="hp-label">
                  <span style="color:var(--teal)">Escudo Catódico da Célula Zero</span>
                  <strong>${Math.max(0, shieldHP)}%</strong>
                </div>
                <div class="hp-track"><div class="hp-fill is-player" style="width:${Math.max(0, shieldHP)}%"></div></div>
              </div>
            </div>
          </div>

          <div class="quiz-card" style="display:flex;flex-direction:column;justify-content:space-between">
            <div>
              <div class="kicker" style="color:var(--rose);border-color:rgba(251,113,133,0.35)">
                ⚡ ${esc(cur.attack)}
              </div>
              <h2 class="quiz-q" style="margin-top:14px">${esc(cur.q)}</h2>

              <div class="options-list">
                ${opts.map((o, i) => `
                  <button type="button" class="opt-btn" data-bopt="${i}" data-ok="${o.ok ? '1' : '0'}">
                    <span class="opt-key">${i + 1}</span>
                    <span>${esc(o.text)}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <div id="boss-fb"></div>
          </div>
        </div>
      </div>
    `;

    $$('[data-bopt]', root).forEach(btn => {
      btn.addEventListener('click', () => {
        if (locked) return;
        locked = true;
        const ok = btn.getAttribute('data-ok') === '1';

        $$('[data-bopt]', root).forEach(b => {
          b.disabled = true;
          if (b.getAttribute('data-ok') === '1') b.classList.add('is-correct');
        });

        if (ok) {
          bossHP = Math.max(0, bossHP - 10);
          Sound.play('bossHit');
          $('#boss-card', root)?.classList.add('is-hit');
        } else {
          btn.classList.add('is-wrong');
          shieldHP = Math.max(0, shieldHP - 25);
          Sound.play('playerHit');
        }

        $('#boss-fb', root).innerHTML = `
          <div class="feedback-banner ${ok ? '' : 'is-bad'}">
            <strong>${ok ? 'Contra-Ataque Catódico Certeiro! (−10% HP Boss)' : 'Dano Corrosivo no Escudo! (−25% Escudo)'}</strong>
            ${esc(cur.exp)}
            <div style="margin-top:12px;text-align:right">
              <button type="button" class="btn btn-primary btn-sm" id="boss-next">Continuar Duelo →</button>
            </div>
          </div>
        `;
        $('#boss-next', root).addEventListener('click', () => {
          turn++;
          renderTurn();
        });
      });
    });
  }

  function defeat() {
    awardBest('m6', 100 - bossHP);
    root.innerHTML = `
      <div class="container">
        <div class="complete-card view-enter" style="border-color:rgba(251,113,133,0.5)">
          <div class="kicker" style="color:var(--rose)">ESCUDO PERFURADO</div>
          <h2 class="section-title">O Corrosor oxidou o núcleo!</h2>
          <p class="section-lead" style="margin:0 auto 22px">
            Reduziste a integridade d'O Corrosor até ${bossHP}%. Recalibra os potenciais padrão e volta ao ataque!
          </p>
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
            <button type="button" class="btn btn-primary" data-retry>${icon('refresh')} Reenfrentar O Corrosor</button>
            <a href="#/codex" class="btn">${icon('book')} Rever Arquivo</a>
          </div>
        </div>
      </div>
    `;
    bindRetry(root, () => renderM6(root, m));
  }

  function victory() {
    const score = clamp(Math.round(shieldHP), 60, 100);
    const stars = shieldHP >= 75 ? 3 : (shieldHP >= 50 ? 2 : 1);
    unlockBadge('corrosor_slayer');
    const { earnedXP } = completeMission('m6', { score, stars, xp: m.xp });
    root.innerHTML = `<div class="container">${missionCompleteScreen({
      mission: m, score, stars, earnedXP, nextId: null,
      summary: 'O Corrosor foi neutralizado por proteção catódica total! A Célula Zero volta a iluminar a rede de 2087!'
    })}</div>`;
    bindRetry(root, () => renderM6(root, m));
  }

  renderTurn();
}
