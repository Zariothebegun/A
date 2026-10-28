/* ============================================================
   CÉLULA ZERO — Palco Vetorial Interativo da Célula Eletroquímica (cell.js)
   createCellStage(container, opts) — Animação física em tempo real
   ============================================================ */

function computeCellPhysics(st) {
  const mL = CZ.METAL_BY_ID[st.leftId] || CZ.METAL_BY_ID.Zn;
  const mR = CZ.METAL_BY_ID[st.rightId] || CZ.METAL_BY_ID.Cu;
  const T = (Number(st.tempC) || 25) + 273.15;
  const R = 8.31446;
  const F = 96485;

  /* Potenciais de Nernst individuais de redução: E = E° + (RT / zF) ln[M^z+] */
  const cL = clamp(Number(st.cLeft) || 1.0, 1e-5, 10);
  const cR = clamp(Number(st.cRight) || 1.0, 1e-5, 10);

  const eL = mL.e0 + ((R * T) / (mL.z * F)) * Math.log(cL);
  const eR = mR.e0 + ((R * T) / (mR.z * F)) * Math.log(cR);

  const n = lcm(mL.z, mR.z);
  const coefL = n / mL.z;
  const coefR = n / mR.z;

  const isElectro = st.mode === 'electrolysis';
  let anodeSide = 'left'; /* 'left' ou 'right' */

  if (!isElectro) {
    anodeSide = eR >= eL ? 'left' : 'right';
  } else {
    /* Na eletrólise forçamos a reação não espontânea inversa */
    anodeSide = eR >= eL ? 'right' : 'left';
  }

  const mAn = anodeSide === 'left' ? mL : mR;
  const mCat = anodeSide === 'left' ? mR : mL;
  const cAn = anodeSide === 'left' ? cL : cR;
  const cCat = anodeSide === 'left' ? cR : cL;
  const coefAn = n / mAn.z;
  const coefCat = n / mCat.z;

  const e0Cell = mCat.e0 - mAn.e0;
  const eCellRaw = (anodeSide === 'left' ? (eR - eL) : (eL - eR));
  const activeFlow = st.saltBridge && (isElectro || Math.abs(eCellRaw) > 0.004);
  const vApplied = isElectro ? +(Math.abs(eCellRaw) + 0.45).toFixed(2) : 0;

  const oxEq = `${coefAn > 1 ? coefAn + ' ' : ''}${mAn.sym}(s) → ${coefAn > 1 ? coefAn + ' ' : ''}${mAn.ion}(aq) + ${n} e⁻`;
  const redEq = `${coefCat > 1 ? coefCat + ' ' : ''}${mCat.ion}(aq) + ${n} e⁻ → ${coefCat > 1 ? coefCat + ' ' : ''}${mCat.sym}(s)`;
  const globalEq = `${coefAn > 1 ? coefAn + ' ' : ''}${mAn.sym}(s) + ${coefCat > 1 ? coefCat + ' ' : ''}${mCat.ion}(aq) → ${coefAn > 1 ? coefAn + ' ' : ''}${mAn.ion}(aq) + ${coefCat > 1 ? coefCat + ' ' : ''}${mCat.sym}(s)`;
  const iupac = `${mAn.sym}(s) | ${mAn.ion}(${cAn.toFixed(2).replace('.', ',')} M) || ${mCat.ion}(${cCat.toFixed(2).replace('.', ',')} M) | ${mCat.sym}(s)`;

  const dg = (-n * F * (isElectro ? -Math.abs(eCellRaw) : Math.abs(eCellRaw))) / 1000;

  return {
    mL, mR, mAn, mCat, cL, cR, T, n, coefL, coefR,
    eL, eR, e0Cell,
    fem: isElectro ? -Math.abs(eCellRaw) : Math.abs(eCellRaw),
    vApplied,
    anodeSide,
    isElectro,
    activeFlow,
    oxEq, redEq, globalEq, iupac, dg
  };
}

function createCellStage(container, opts = {}) {
  const st = {
    leftId: opts.leftId || 'Zn',
    rightId: opts.rightId || 'Cu',
    cLeft: opts.cLeft ?? 1.0,
    cRight: opts.cRight ?? 1.0,
    tempC: opts.tempC ?? 25,
    mode: opts.mode || 'galvanic',
    saltBridge: opts.saltBridge !== undefined ? opts.saltBridge : true,
    scan: !!opts.scan,
    note: opts.note || '',
    hotspots: opts.hotspots || [],
    foundIds: new Set(),
    activeId: null,
    onHotspot: opts.onHotspot || null,
    femOverride: null
  };

  const root = document.createElement('div');
  root.className = `cell-stage ${st.scan ? 'is-scan' : ''}`;
  container.innerHTML = '';
  container.appendChild(root);

  root.innerHTML = `
    <div class="cell-toolbar">
      <div class="cell-badges" data-badges></div>
      <div style="display:flex;gap:8px;align-items:center">
        <button type="button" class="btn btn-sm" data-scan-btn title="Alternar Raio-X Iónico">
          ${icon('radar')} <span>Scan Iónico</span>
        </button>
        <button type="button" class="btn btn-sm" data-expand title="Expandir diagrama (Tecla E)">
          ${icon('expand')}
        </button>
      </div>
    </div>

    <div class="cell-svg-wrap">
      <svg class="cell-svg" viewBox="0 0 800 430" role="img" aria-label="Diagrama interativo da célula eletroquímica">
        <defs>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="rgba(255,255,255,0.16)"/>
            <stop offset="50%" stop-color="rgba(255,255,255,0.03)"/>
            <stop offset="100%" stop-color="rgba(94,234,212,0.10)"/>
          </linearGradient>
          <linearGradient id="bridgeGel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(94,234,212,0.32)"/>
            <stop offset="100%" stop-color="rgba(56,189,248,0.16)"/>
          </linearGradient>
          <filter id="glowSoft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <!-- Bancada laboratorial -->
        <line x1="50" y1="392" x2="750" y2="392" stroke="rgba(148,163,184,0.22)" stroke-width="2"/>

        <!-- Fio Condutor Externo -->
        <path id="wire-path" d="M 185 155 L 185 62 L 615 62 L 615 155" fill="none" stroke="#475569" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M 185 155 L 185 62 L 615 62 L 615 155" fill="none" stroke="rgba(94,234,212,0.45)" stroke-width="1.6" stroke-dasharray="6 6"/>

        <!-- Gobelé Esquerdo -->
        <g data-beaker-left>
          <rect x="105" y="232" width="190" height="152" rx="14" data-sol-left fill="rgba(148,163,184,0.16)"/>
          <ellipse cx="200" cy="232" rx="95" ry="7" fill="rgba(255,255,255,0.12)"/>
          <path d="M 100 175 L 100 374 Q 100 388 114 388 L 286 388 Q 300 388 300 374 L 300 175" fill="url(#glassGrad)" stroke="rgba(226,232,240,0.42)" stroke-width="2.5"/>
        </g>

        <!-- Gobelé Direito -->
        <g data-beaker-right>
          <rect x="505" y="232" width="190" height="152" rx="14" data-sol-right fill="rgba(56,189,248,0.32)"/>
          <ellipse cx="600" cy="232" rx="95" ry="7" fill="rgba(255,255,255,0.14)"/>
          <path d="M 500 175 L 500 374 Q 500 388 514 388 L 686 388 Q 700 388 700 374 L 700 175" fill="url(#glassGrad)" stroke="rgba(226,232,240,0.42)" stroke-width="2.5"/>
        </g>

        <!-- Placa Metálica Esquerda -->
        <g data-plate-left>
          <rect x="163" y="150" width="44" height="196" rx="6" data-metal-left fill="#94a3b8" stroke="#64748b" stroke-width="2"/>
          <text x="185" y="205" text-anchor="middle" fill="#0f172a" font-family="Space Grotesk" font-weight="700" font-size="16" data-sym-left>Zn</text>
        </g>

        <!-- Placa Metálica Direita -->
        <g data-plate-right>
          <rect x="593" y="150" width="44" height="196" rx="6" data-metal-right fill="#d97706" stroke="#b45309" stroke-width="2"/>
          <text x="615" y="205" text-anchor="middle" fill="#0f172a" font-family="Space Grotesk" font-weight="700" font-size="16" data-sym-right>Cu</text>
        </g>

        <!-- Ponte Salina em U -->
        <g data-bridge-group>
          <path d="M 262 292 L 262 178 Q 262 146 294 146 L 506 146 Q 538 146 538 178 L 538 292"
                fill="none" stroke="rgba(226,232,240,0.45)" stroke-width="28" stroke-linecap="round"/>
          <path d="M 262 292 L 262 178 Q 262 146 294 146 L 506 146 Q 538 146 538 178 L 538 292"
                fill="none" stroke="url(#bridgeGel)" stroke-width="22" stroke-linecap="round"/>
          <!-- Tampões de algodão/agar poroso -->
          <rect x="249" y="284" width="26" height="12" rx="4" fill="rgba(241,245,249,0.65)"/>
          <rect x="525" y="284" width="26" height="12" rx="4" fill="rgba(241,245,249,0.65)"/>
          <text x="400" y="151" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono" font-size="11" font-weight="600">PONTE SALINA · KNO₃(aq)</text>
        </g>

        <!-- Camada de Iões Animados (Scan / Dinâmica) -->
        <g data-ions-layer></g>

        <!-- Camada Raio-X extra (Scan Mode) -->
        <g class="scan-layer" data-scan-layer>
          <rect x="112" y="346" width="176" height="28" rx="7" fill="rgba(3,8,18,0.84)" stroke="rgba(94,234,212,0.4)"/>
          <text x="200" y="364" text-anchor="middle" fill="#5eead4" font-family="JetBrains Mono" font-size="11" data-scan-left>E° = −0,76 V</text>
          <rect x="512" y="346" width="176" height="28" rx="7" fill="rgba(3,8,18,0.84)" stroke="rgba(56,189,248,0.4)"/>
          <text x="600" y="364" text-anchor="middle" fill="#38bdf8" font-family="JetBrains Mono" font-size="11" data-scan-right>E° = +0,34 V</text>
        </g>

        <!-- Voltímetro / Fonte DC Central no Topo -->
        <g transform="translate(400, 62)">
          <!-- Halo luminoso proporcional à tensão -->
          <circle r="44" fill="rgba(94,234,212,0.14)" data-meter-halo filter="url(#glowSoft)"/>
          <rect x="-74" y="-32" width="148" height="64" rx="14" fill="#071022" stroke="#5eead4" stroke-width="2" data-meter-box/>
          <text x="0" y="-11" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono" font-size="9.5" letter-spacing="1.2" data-meter-label>VOLTÍMETRO</text>
          <text x="0" y="15" text-anchor="middle" fill="#5eead4" font-family="JetBrains Mono" font-weight="700" font-size="20" data-meter-val>+1,10 V</text>
        </g>

        <!-- Etiquetas de Polaridade Esquerda / Direita -->
        <g transform="translate(185, 124)">
          <rect x="-78" y="-15" width="156" height="26" rx="13" fill="rgba(4,10,22,0.88)" stroke="rgba(94,234,212,0.45)" data-tag-box-left/>
          <text x="0" y="3" text-anchor="middle" fill="#5eead4" font-family="JetBrains Mono" font-size="10.5" font-weight="700" data-tag-left>ÂNODO (−) · OXIDAÇÃO</text>
        </g>
        <g transform="translate(615, 124)">
          <rect x="-78" y="-15" width="156" height="26" rx="13" fill="rgba(4,10,22,0.88)" stroke="rgba(56,189,248,0.45)" data-tag-box-right/>
          <text x="0" y="3" text-anchor="middle" fill="#38bdf8" font-family="JetBrains Mono" font-size="10.5" font-weight="700" data-tag-right>CÁTODO (+) · REDUÇÃO</text>
        </g>

        <!-- Legendas das Soluções na Base -->
        <text x="200" y="414" text-anchor="middle" fill="#cbd5e1" font-family="JetBrains Mono" font-size="11.5" data-caption-left>ZnSO₄(aq) · 1,00 M</text>
        <text x="600" y="414" text-anchor="middle" fill="#cbd5e1" font-family="JetBrains Mono" font-size="11.5" data-caption-right>CuSO₄(aq) · 1,00 M</text>

        <!-- Partículas Eletrónicas e⁻ no Fio -->
        <g data-electrons></g>

        <!-- Hotspots Interativos (Missão 1) -->
        <g data-hotspots></g>
      </svg>
    </div>

    <div class="cell-readout" data-readout></div>
    <div class="cell-note" data-note style="display:none"></div>
  `;

  const svg = $('.cell-svg', root);
  const wirePath = $('#wire-path', root);
  const eGroup = $('[data-electrons]', root);
  const ionsLayer = $('[data-ions-layer]', root);
  const hsGroup = $('[data-hotspots]', root);

  /* Criar 7 partículas de eletrões e⁻ */
  const eNodes = Array.from({ length: 7 }, (_, i) => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.innerHTML = `
      <circle r="7" fill="#5eead4" filter="url(#glowSoft)"/>
      <text y="3" text-anchor="middle" fill="#031312" font-family="JetBrains Mono" font-size="8.5" font-weight="800">e⁻</text>
    `;
    eGroup.appendChild(g);
    return { el: g, t: i / 7 };
  });

  /* Criar 6 iões migrando na ponte salina e soluções */
  const bridgeIons = [
    { label: 'K⁺', pos: true, t: 0.15 },
    { label: 'K⁺', pos: true, t: 0.55 },
    { label: 'NO₃⁻', pos: false, t: 0.35 },
    { label: 'NO₃⁻', pos: false, t: 0.78 }
  ].map(item => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.innerHTML = `
      <circle r="10" fill="${item.pos ? 'rgba(56,189,248,0.25)' : 'rgba(251,191,36,0.24)'}" stroke="${item.pos ? '#38bdf8' : '#fbbf24'}" stroke-width="1.2"/>
      <text y="3" text-anchor="middle" fill="#f8fafc" font-family="JetBrains Mono" font-size="8" font-weight="700">${item.label}</text>
    `;
    ionsLayer.appendChild(g);
    return { ...item, el: g };
  });

  let phys = computeCellPhysics(st);
  let rafId = null;
  let destroyed = false;

  function renderStatic() {
    phys = computeCellPhysics(st);
    const displayV = st.femOverride !== null ? st.femOverride : (phys.isElectro ? phys.vApplied : phys.fem);

    /* Soluções e Placas */
    $('[data-sol-left]', root).setAttribute('fill', phys.mL.solColor);
    $('[data-sol-right]', root).setAttribute('fill', phys.mR.solColor);
    $('[data-metal-left]', root).setAttribute('fill', phys.mL.color);
    $('[data-metal-left]', root).setAttribute('stroke', phys.mL.edge);
    $('[data-metal-right]', root).setAttribute('fill', phys.mR.color);
    $('[data-metal-right]', root).setAttribute('stroke', phys.mR.edge);
    $('[data-sym-left]', root).textContent = phys.mL.sym;
    $('[data-sym-right]', root).textContent = phys.mR.sym;

    /* Ponte salina visível ou removida */
    $('[data-bridge-group]', root).style.opacity = st.saltBridge ? '1' : '0.14';
    ionsLayer.style.opacity = st.saltBridge ? '1' : '0';

    /* Etiquetas de polaridade (diferenciam Pilha vs Eletrólise!) */
    const leftIsAnode = phys.anodeSide === 'left';
    const anSign = phys.isElectro ? '(+)' : '(−)';
    const catSign = phys.isElectro ? '(−)' : '(+)';

    $('[data-tag-left]', root).textContent = leftIsAnode
      ? `ÂNODO ${anSign} · OXIDAÇÃO`
      : `CÁTODO ${catSign} · REDUÇÃO`;
    $('[data-tag-right]', root).textContent = !leftIsAnode
      ? `ÂNODO ${anSign} · OXIDAÇÃO`
      : `CÁTODO ${catSign} · REDUÇÃO`;

    $('[data-tag-left]', root).setAttribute('fill', leftIsAnode ? '#fbbf24' : '#5eead4');
    $('[data-tag-right]', root).setAttribute('fill', !leftIsAnode ? '#fbbf24' : '#5eead4');

    /* Voltímetro vs Fonte DC */
    const meterBox = $('[data-meter-box]', root);
    const meterLabel = $('[data-meter-label]', root);
    const meterVal = $('[data-meter-val]', root);
    const meterHalo = $('[data-meter-halo]', root);

    if (!st.saltBridge) {
      meterLabel.textContent = 'CIRCUITO ABERTO';
      meterVal.textContent = '0,00 V';
      meterVal.setAttribute('fill', '#fb7185');
      meterBox.setAttribute('stroke', '#fb7185');
      meterHalo.setAttribute('opacity', '0.08');
    } else if (phys.isElectro) {
      meterLabel.textContent = 'FONTE DC EXTERNA';
      meterVal.textContent = fmtV(displayV, false);
      meterVal.setAttribute('fill', '#c4b5fd');
      meterBox.setAttribute('stroke', '#a78bfa');
      meterHalo.setAttribute('opacity', '0.45');
    } else {
      meterLabel.textContent = 'VOLTÍMETRO (fem)';
      meterVal.textContent = fmtV(displayV, true);
      meterVal.setAttribute('fill', displayV > 0.004 ? '#5eead4' : '#94a3b8');
      meterBox.setAttribute('stroke', displayV > 0.004 ? '#5eead4' : '#64748b');
      meterHalo.setAttribute('opacity', String(clamp(Math.abs(displayV) / 3.2, 0.12, 0.75)));
    }

    /* Legendas inferiores */
    $('[data-caption-left]', root).textContent = `${phys.mL.salt} · [${phys.mL.ion}] = ${phys.cL.toFixed(2).replace('.', ',')} M`;
    $('[data-caption-right]', root).textContent = `${phys.mR.salt} · [${phys.mR.ion}] = ${phys.cR.toFixed(2).replace('.', ',')} M`;

    /* Scan Layer */
    root.classList.toggle('is-scan', st.scan);
    $('[data-scan-left]', root).textContent = `E°(${phys.mL.ion}/${phys.mL.sym}) = ${fmtV(phys.mL.e0)}`;
    $('[data-scan-right]', root).textContent = `E°(${phys.mR.ion}/${phys.mR.sym}) = ${fmtV(phys.mR.e0)}`;

    /* Badges no topo */
    const badgesEl = $('[data-badges]', root);
    badgesEl.innerHTML = `
      <span class="cell-pill ${!st.saltBridge ? 'is-dead' : (phys.isElectro ? 'is-electrolysis' : 'is-galvanic')}">
        ${!st.saltBridge ? 'Ponte Salina Removida' : (phys.isElectro ? 'Modo: Célula Eletrolítica (ΔG > 0)' : 'Modo: Pilha Galvânica (ΔG < 0)')}
      </span>
      <span class="cell-pill">T = ${Math.round(st.tempC)} °C</span>
      <span class="cell-pill">n = ${phys.n} mol e⁻</span>
    `;

    /* Readout inferior */
    $('[data-readout]', root).innerHTML = `
      <div class="ro-item">
        <small>Semirreação Anódica (Oxidação)</small>
        <strong>${esc(phys.oxEq)}</strong>
      </div>
      <div class="ro-item">
        <small>Semirreação Catódica (Redução)</small>
        <strong>${esc(phys.redEq)}</strong>
      </div>
      <div class="ro-item">
        <small>Notação IUPAC &amp; Energia de Gibbs</small>
        <strong>${esc(phys.iupac)} · ΔG = ${phys.dg.toFixed(0)} kJ/mol</strong>
      </div>
    `;

    /* Nota pedagógica opcional */
    const noteEl = $('[data-note]', root);
    if (st.note) {
      noteEl.style.display = 'block';
      noteEl.textContent = st.note;
    } else {
      noteEl.style.display = 'none';
    }

    renderHotspots();
  }

  function renderHotspots() {
    hsGroup.innerHTML = '';
    if (!st.hotspots || !st.hotspots.length) return;
    st.hotspots.forEach((h, idx) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const isFound = st.foundIds.has(h.id);
      const isActive = st.activeId === h.id;
      g.setAttribute('class', `cell-hotspot ${isFound ? 'is-found' : ''} ${isActive ? 'is-active' : ''}`);
      g.setAttribute('transform', `translate(${h.x}, ${h.y})`);
      g.innerHTML = `
        <circle class="hs-ring" r="17" fill="none" stroke="${isFound ? '#34d399' : '#fbbf24'}" stroke-width="2"/>
        <circle class="hs-core" r="12" fill="${isFound ? '#34d399' : '#5eead4'}" stroke="#041311" stroke-width="2"/>
        <text y="4" text-anchor="middle" fill="#041311" font-family="JetBrains Mono" font-size="10.5" font-weight="800">${idx + 1}</text>
      `;
      g.addEventListener('click', () => {
        Sound.play('scan');
        if (st.onHotspot) st.onHotspot(h);
      });
      hsGroup.appendChild(g);
    });
  }

  /* Ponto sobre o fio externo M 185 155 L 185 62 L 615 62 L 615 155
     (calculado manualmente: compatível com qualquer navegador, sem depender
      da API de geometria SVG getPointAtLength) */
  function wirePoint(t) {
    const total = 616; /* 93 + 430 + 93 */
    let d = ((t % 1) + 1) % 1 * total;
    if (d < 93) return { x: 185, y: 155 - d };
    d -= 93;
    if (d < 430) return { x: 185 + d, y: 62 };
    d -= 430;
    return { x: 615, y: 62 + d };
  }

  /* Loop de animação contínua para eletrões e iões */
  function animate() {
    if (destroyed) return;
    const speed = phys.activeFlow
      ? clamp(0.0016 + Math.abs(phys.fem || 1) * 0.0014, 0.0018, 0.0065)
      : 0;
    const dir = phys.anodeSide === 'left' ? 1 : -1; /* Left→Right = +1, Right→Left = -1 */

    for (const node of eNodes) {
      node.el.style.opacity = phys.activeFlow ? '1' : '0.22';
      if (!S.reduced && speed > 0) {
        node.t = (node.t + speed * dir + 1) % 1;
      }
      const pt = wirePoint(node.t);
      node.el.setAttribute('transform', `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)})`);
    }

    /* Migração dos iões na ponte salina: K⁺ para o cátodo, NO₃⁻ para o ânodo */
    for (const ion of bridgeIons) {
      if (!S.reduced && phys.activeFlow) {
        const goRight = (ion.pos && phys.anodeSide === 'left') || (!ion.pos && phys.anodeSide === 'right');
        ion.t = (ion.t + (goRight ? 0.0022 : -0.0022) + 1) % 1;
      }
      /* Curva parametrizada sobre o arco da ponte salina (x: 262..538) */
      const x = 262 + ion.t * (538 - 262);
      const arch = Math.sin(ion.t * Math.PI);
      const y = 270 - arch * 124;
      ion.el.setAttribute('transform', `translate(${x.toFixed(1)}, ${y.toFixed(1)})`);
    }

    rafId = requestAnimationFrame(animate);
  }

  /* Botões da barra superior do diagrama */
  $('[data-scan-btn]', root).addEventListener('click', () => {
    Sound.play('scan');
    st.scan = !st.scan;
    root.classList.toggle('is-scan', st.scan);
  });

  $('[data-expand]', root).addEventListener('click', () => {
    Sound.play('click');
    root.classList.toggle('is-fullscreen');
  });

  renderStatic();
  rafId = requestAnimationFrame(animate);

  return {
    setMetals(leftId, rightId) {
      if (leftId) st.leftId = leftId;
      if (rightId) st.rightId = rightId;
      renderStatic();
    },
    setParams(patch = {}) {
      Object.assign(st, patch);
      renderStatic();
    },
    setFem(val) {
      st.femOverride = val;
      renderStatic();
    },
    setMode(mode) {
      st.mode = mode;
      renderStatic();
    },
    setScan(flag) {
      st.scan = !!flag;
      root.classList.toggle('is-scan', st.scan);
    },
    setNote(txt) {
      st.note = txt || '';
      renderStatic();
    },
    setHotspots(list, cb) {
      st.hotspots = list || [];
      if (cb) st.onHotspot = cb;
      renderHotspots();
    },
    markFound(id) {
      st.foundIds.add(id);
      renderHotspots();
    },
    setActive(id) {
      st.activeId = id;
      renderHotspots();
    },
    expand() {
      root.classList.toggle('is-fullscreen');
    },
    getState() {
      return { ...st, phys };
    },
    destroy() {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
    }
  };
}
