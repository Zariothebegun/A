/* ============================================================
   CÉLULA ZERO — Ecrãs Principais: Intro, Hub, Perfil, Glossário & Certificado (screens.js)
   ============================================================ */

function renderIntro(root) {
  const integ = getCoreIntegrity();

  root.innerHTML = `
    <div class="container view-enter">
      <section class="intro-hero">
        <div>
          <div class="kicker">
            <span class="kicker-dot"></span>
            UNIDADE DE DEFESA ELETROQUÍMICA · LISBOA 2087
          </div>
          <h1 class="intro-title">
            Salva a <span class="grad">Célula Mestra</span> da oxidação total.
          </h1>
          <p class="intro-story">
            Em <strong>2087</strong>, toda a rede energética limpa depende da <strong>Célula Zero</strong>.
            Uma anomalia entrópica conhecida como <strong>O Corrosor</strong> sabotou as pontes salinas,
            inverteu potenciais de elétrodo e acelerou a ferrugem do reator central.
            Domina as leis da <strong>oxidação-redução, pilhas galvânicas, equação de Nernst e eletrólise</strong>
            ao longo de seis módulos interativos para restaurar a corrente!
          </p>

          <div class="intro-cta-row">
            <button type="button" class="btn btn-primary btn-lg" id="btn-start">
              ${icon('play')} ${S.started ? 'Continuar Operação' : 'Iniciar Protocolo'}
            </button>
            <a href="#/lab" class="btn btn-lg" id="btn-go-lab">
              ${icon('beaker')} Simulador de Pilhas
            </a>
            <button type="button" class="btn btn-violet btn-lg" id="btn-pres">
              ${icon('sparkles')} Guião de Apresentação
            </button>
            <button type="button" class="btn btn-lg" id="btn-how">
              ${icon('help')} Como Jogar
            </button>
          </div>

          <div class="intro-metrics">
            <div class="metric-tile">
              <strong>6</strong>
              <span>Missões + Boss</span>
            </div>
            <div class="metric-tile">
              <strong>10</strong>
              <span>Semicélulas Reais</span>
            </div>
            <div class="metric-tile">
              <strong>12</strong>
              <span>Capítulos + Cálculos</span>
            </div>
            <div class="metric-tile">
              <strong>100%</strong>
              <span>Offline &amp; PT-PT</span>
            </div>
          </div>
        </div>

        <div class="reactor-showcase" id="reactor-card">
          <svg class="reactor-svg" id="reactor-svg" viewBox="0 0 400 400" aria-label="Núcleo Reator Célula Zero">
            <defs>
              <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#5eead4" stop-opacity="0.55"/>
                <stop offset="55%" stop-color="#38bdf8" stop-opacity="0.18"/>
                <stop offset="100%" stop-color="#040711" stop-opacity="0"/>
              </radialGradient>
              <linearGradient id="ringTeal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#5eead4"/>
                <stop offset="50%" stop-color="#38bdf8"/>
                <stop offset="100%" stop-color="#a78bfa"/>
              </linearGradient>
            </defs>

            <circle cx="200" cy="200" r="180" fill="url(#coreGlow)"/>
            <circle cx="200" cy="200" r="162" fill="none" stroke="rgba(148,163,184,0.16)" stroke-width="1"/>
            <g style="transform-origin:200px 200px;animation:czSpin 22s linear infinite">
              <circle cx="200" cy="200" r="144" fill="none" stroke="url(#ringTeal)" stroke-width="2.2" stroke-dasharray="36 16 10 16"/>
              <circle cx="200" cy="56" r="5" fill="#5eead4"/>
              <circle cx="200" cy="344" r="5" fill="#38bdf8"/>
            </g>
            <g style="transform-origin:200px 200px;animation:czSpin 15s linear infinite reverse">
              <circle cx="200" cy="200" r="112" fill="none" stroke="${integ.pct === 100 ? '#34d399' : '#fb7185'}" stroke-width="2" stroke-dasharray="18 14" opacity="0.8"/>
              <circle cx="312" cy="200" r="4.5" fill="${integ.pct === 100 ? '#34d399' : '#fb7185'}"/>
            </g>
            <ellipse cx="200" cy="200" rx="88" ry="34" fill="none" stroke="rgba(94,234,212,0.45)" stroke-width="1.6" transform="rotate(32 200 200)"/>
            <ellipse cx="200" cy="200" rx="88" ry="34" fill="none" stroke="rgba(56,189,248,0.45)" stroke-width="1.6" transform="rotate(-32 200 200)"/>

            <!-- Núcleo Hexagonal -->
            <polygon points="200,136 255,168 255,232 200,264 145,232 145,168"
                     fill="rgba(7,16,34,0.9)" stroke="#5eead4" stroke-width="2.5"/>
            <path d="M206 156 L178 198 H199 L192 242 L222 198 H201 Z" fill="#5eead4"/>
            <text x="200" y="294" text-anchor="middle" fill="#cbd5e1" font-family="JetBrains Mono" font-size="11" letter-spacing="2">ΔE° = +1,10 V · DANIELL</text>
          </svg>

          <div class="reactor-telemetry">
            <div class="tele-box">
              <small>Integridade</small>
              <strong>${integ.pct}% (${integ.doneCount}/6)</strong>
            </div>
            <div class="tele-box">
              <small>Potencial E°</small>
              <strong>+1,10 V → +4,54 V</strong>
            </div>
            <div class="tele-box ${integ.pct < 100 ? 'is-warn' : ''}">
              <small>Estado Corrosor</small>
              <strong>${integ.pct === 100 ? 'NEUTRALIZADO' : 'ATIVO'}</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  $('#btn-start', root)?.addEventListener('click', () => {
    Sound.play('power');
    S.started = true;
    saveState();
    go('#/hub');
  });

  $('#btn-how', root)?.addEventListener('click', () => {
    Sound.play('click');
    openHowToPlay();
  });

  $('#btn-pres', root)?.addEventListener('click', () => {
    Sound.play('click');
    openPresentationGuide();
  });

  /* Efeito parallax suave no reator ao mover o rato */
  const card = $('#reactor-card', root);
  const svg = $('#reactor-svg', root);
  if (card && svg) {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const dx = ((e.clientX - r.left) / r.width - 0.5) * 12;
      const dy = ((e.clientY - r.top) / r.height - 0.5) * 12;
      svg.style.transform = `perspective(600px) rotateY(${dx.toFixed(1)}deg) rotateX(${(-dy).toFixed(1)}deg)`;
    });
    card.addEventListener('pointerleave', () => {
      svg.style.transform = 'none';
    });
  }
}

function renderHub(root) {
  const integ = getCoreIntegrity();
  const lvl = getLevelInfo(S.xp);
  const coreColor = integ.pct === 100 ? '#34d399' : (integ.pct >= 50 ? '#5eead4' : '#fb7185');

  const cardsHTML = CZ.MISSIONS.map(m => {
    const ms = S.missions[m.id] || { done: false, best: 0, stars: 0 };
    const starsHTML = [1, 2, 3].map(i =>
      `<span class="${i <= (ms.stars || 0) ? 'is-lit' : ''}">${icon('star')}</span>`
    ).join('');
    return `
      <a href="#/mission/${esc(m.id)}" class="mission-card ${ms.done ? 'is-done' : ''} ${m.boss ? 'is-boss' : ''}" style="--m-accent:${esc(m.accent)}">
        <div>
          <div class="mc-head">
            <span class="mc-icon">${icon(m.icon)}</span>
            <span class="mc-code">${esc(m.code)} · +${m.xp} XP</span>
          </div>
          <h3 class="mc-title">${esc(m.title)}</h3>
          <p class="mc-desc">${esc(m.desc)}</p>
        </div>
        <div class="mc-foot">
          <span class="stars" aria-label="${ms.stars || 0} de 3 estrelas">${starsHTML}</span>
          <span style="color:${ms.done ? '#34d399' : 'var(--text-soft)'}">
            ${ms.done ? `Reparado · ${ms.best}%` : 'Iniciar →'}
          </span>
        </div>
      </a>
    `;
  }).join('');

  root.innerHTML = `
    <div class="container view-enter">
      <div class="hub-top">
        <div class="glass-card master-core-card">
          <div class="kicker"><span class="kicker-dot"></span> NÚCLEO MESTRE</div>
          <svg class="master-core-svg" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(148,163,184,0.16)" stroke-width="10"/>
            <circle cx="100" cy="100" r="82" fill="none" stroke="${coreColor}" stroke-width="10"
                    stroke-linecap="round"
                    stroke-dasharray="${(2 * Math.PI * 82).toFixed(1)}"
                    stroke-dashoffset="${((1 - integ.pct / 100) * 2 * Math.PI * 82).toFixed(1)}"
                    transform="rotate(-90 100 100)"/>
            <text x="100" y="96" text-anchor="middle" fill="#ffffff" font-family="Space Grotesk" font-weight="700" font-size="32">${integ.pct}%</text>
            <text x="100" y="118" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono" font-size="10">${integ.doneCount}/6 MÓDULOS</text>
          </svg>
          <div style="font-size:0.84rem;color:var(--text-soft)">
            ${integ.pct === 100
              ? 'Célula Mestra estabilizada! Certificado de Excelência disponível.'
              : 'Repara os módulos infetados para purificar o reator.'}
          </div>
        </div>

        <div class="glass-card hub-brief">
          <div>
            <div class="kicker"><span class="kicker-dot"></span> CENTRAL DE OPERAÇÕES · ${esc(lvl.title)}</div>
            <h1 class="section-title" style="margin-bottom:8px">Mapa de Reparação Eletroquímica</h1>
            <p class="section-lead">
              Podes avançar pela ordem narrativa (Módulo 01 → Boss Final) ou abrir diretamente qualquer módulo,
              o <strong>Simulador Livre</strong> ou o <strong>Arquivo Científico</strong> durante a tua apresentação.
            </p>
          </div>

          <div class="hub-quick-row">
            <a href="#/lab" class="btn btn-primary">${icon('beaker')} Abrir Simulador Livre</a>
            <a href="#/codex" class="btn">${icon('book')} Arquivo (12 Capítulos)</a>
            <button type="button" class="btn btn-violet" id="hub-guide">${icon('sparkles')} Guião Nota 20</button>
            <button type="button" class="btn" id="hub-cert">${icon('award')} Certificado</button>
          </div>
        </div>
      </div>

      <div class="missions-grid">
        ${cardsHTML}
      </div>
    </div>
  `;

  $$('.mission-card', root).forEach(el => {
    el.addEventListener('click', () => Sound.play('click'));
  });
  $('#hub-guide', root)?.addEventListener('click', () => {
    Sound.play('click');
    openPresentationGuide();
  });
  $('#hub-cert', root)?.addEventListener('click', () => {
    Sound.play('click');
    openCertificateModal();
  });
}

function renderGlossary(root) {
  const cats = ['Todos', ...Array.from(new Set(CZ.GLOSSARY.map(g => g.cat)))];
  let activeCat = 'Todos';
  let query = '';

  root.innerHTML = `
    <div class="container view-enter">
      <div class="kicker"><span class="kicker-dot"></span> LÉXICO CIENTÍFICO RIGOROSO</div>
      <h1 class="section-title">Glossário de Eletroquímica (${CZ.GLOSSARY.length} Termos)</h1>
      <p class="section-lead">Pesquisa definições, fórmulas e acede diretamente ao capítulo correspondente do Arquivo.</p>

      <div class="glossary-controls">
        <input type="search" class="cz-input" id="gloss-search" placeholder="Pesquisar termo, fórmula ou conceito (ex.: ânodo, Nernst, ponte salina)…" style="max-width:420px" />
        <div style="display:flex;flex-wrap:wrap;gap:6px" id="gloss-cats">
          ${cats.map(c => `<button type="button" class="part-chip ${c === 'Todos' ? 'is-active' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`).join('')}
        </div>
      </div>

      <div class="glossary-grid" id="gloss-grid"></div>
    </div>
  `;

  const grid = $('#gloss-grid', root);

  function draw() {
    const q = query.trim().toLowerCase();
    const list = CZ.GLOSSARY.filter(item => {
      const matchCat = activeCat === 'Todos' || item.cat === activeCat;
      const matchQ = !q || item.term.toLowerCase().includes(q) || item.def.toLowerCase().includes(q) || item.formula.toLowerCase().includes(q);
      return matchCat && matchQ;
    });

    if (!list.length) {
      grid.innerHTML = `<div class="panel-box" style="grid-column:1/-1;text-align:center">Nenhum termo encontrado para «${esc(query)}».</div>`;
      return;
    }

    grid.innerHTML = list.map(item => `
      <article class="term-card">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span class="term-cat">${esc(item.cat)}</span>
          <a href="#/codex/${esc(item.codex)}" style="color:var(--teal);font-size:0.76rem;text-decoration:none;font-family:var(--font-mono)">Ver capítulo →</a>
        </div>
        <h3>${esc(item.term)}</h3>
        <p>${esc(item.def)}</p>
        <span class="term-formula">${esc(item.formula)}</span>
      </article>
    `).join('');
  }

  $('#gloss-search', root).addEventListener('input', (e) => {
    query = e.target.value;
    draw();
  });

  $$('[data-cat]', root).forEach(btn => {
    btn.addEventListener('click', () => {
      Sound.play('click');
      activeCat = btn.getAttribute('data-cat');
      $$('[data-cat]', root).forEach(b => b.classList.toggle('is-active', b === btn));
      draw();
    });
  });

  draw();
}

function renderProfile(root) {
  const integ = getCoreIntegrity();
  const lvl = getLevelInfo(S.xp);

  root.innerHTML = `
    <div class="container view-enter">
      <div class="kicker"><span class="kicker-dot"></span> DOSSIER DO OPERADOR</div>
      <h1 class="section-title">Perfil, Distintivos &amp; Certificado</h1>

      <div class="stats-row" style="margin-top:18px">
        <div class="stat-pill"><strong>NV ${lvl.lvl}</strong><span>${esc(lvl.title)}</span></div>
        <div class="stat-pill"><strong>${S.xp} XP</strong><span>Experiência Acumulada</span></div>
        <div class="stat-pill"><strong>${integ.doneCount}/${integ.total}</strong><span>Módulos Reparados</span></div>
        <div class="stat-pill"><strong>${S.badges.length}/${CZ.BADGES.length}</strong><span>Distintivos</span></div>
      </div>

      <div class="profile-grid">
        <div class="glass-card profile-card">
          <h3 style="margin-top:0;font-family:var(--font-display)">Identificação no Certificado</h3>
          <p style="color:var(--text-muted);font-size:0.88rem;margin-top:0">
            Personaliza os teus dados para o Certificado Oficial (guardados localmente no teu navegador).
          </p>
          <div class="form-grid">
            <div>
              <label class="field-label" for="inp-name">Nome do Aluno / Operador</label>
              <input id="inp-name" class="cz-input" type="text" maxlength="60" value="${esc(S.operatorName)}" />
            </div>
            <div>
              <label class="field-label" for="inp-school">Escola / Instituição</label>
              <input id="inp-school" class="cz-input" type="text" maxlength="80" value="${esc(S.schoolName)}" />
            </div>
            <div>
              <label class="field-label" for="inp-class">Turma / Disciplina</label>
              <input id="inp-class" class="cz-input" type="text" maxlength="60" value="${esc(S.className)}" />
            </div>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:18px">
            <button type="button" class="btn btn-primary" id="btn-save-prof">${icon('check')} Guardar Dados</button>
            <button type="button" class="btn btn-violet" id="btn-open-cert">${icon('award')} Ver / Imprimir Certificado</button>
          </div>

          <hr style="border:none;border-top:1px solid var(--border);margin:22px 0" />
          <h4 style="margin:0 0 8px;font-family:var(--font-display);font-size:0.96rem">Ferramentas de Sala de Aula</h4>
          <p style="color:var(--text-muted);font-size:0.82rem;margin:0 0 12px">
            Em apresentação ao vivo num computador novo da escola, podes ativar o modo demonstração completo com 1 clique:
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:10px">
            <button type="button" class="btn btn-sm" id="btn-demo-unlock">${icon('sparkles')} Modo Apresentação (100%)</button>
            <button type="button" class="btn btn-sm btn-danger" id="btn-reset">${icon('refresh')} Repor Progresso a Zero</button>
          </div>
        </div>

        <div class="glass-card profile-card">
          <h3 style="margin-top:0;font-family:var(--font-display)">Galeria de Distintivos (${S.badges.length}/${CZ.BADGES.length})</h3>
          <div class="badges-grid">
            ${CZ.BADGES.map(b => {
              const un = S.badges.includes(b.id);
              return `
                <div class="badge-item ${un ? 'is-unlocked' : ''}">
                  <div class="b-ic">${icon(b.icon)}</div>
                  <strong>${esc(b.title)}</strong>
                  <small>${esc(b.desc)}</small>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  $('#btn-save-prof', root).addEventListener('click', () => {
    S.operatorName = $('#inp-name', root).value.trim() || 'Operador Alfa';
    S.schoolName = $('#inp-school', root).value.trim() || 'Ensino Secundário / Profissional';
    S.className = $('#inp-class', root).value.trim() || 'Química — Eletroquímica';
    saveState();
    Sound.play('ok');
    toast('Perfil atualizado!', `Registado em nome de ${S.operatorName}`, 'check');
  });

  $('#btn-open-cert', root).addEventListener('click', () => {
    S.operatorName = $('#inp-name', root).value.trim() || S.operatorName;
    S.schoolName = $('#inp-school', root).value.trim() || S.schoolName;
    S.className = $('#inp-class', root).value.trim() || S.className;
    saveState();
    Sound.play('click');
    openCertificateModal();
  });

  $('#btn-demo-unlock', root).addEventListener('click', () => {
    CZ.MISSIONS.forEach(m => {
      S.missions[m.id] = { done: true, best: 100, stars: 3, attempts: Math.max(1, S.missions[m.id]?.attempts || 1) };
    });
    S.badges = CZ.BADGES.map(b => b.id);
    S.codexChecks = CZ.CODEX_LIST.map(c => c.id);
    S.codexRead = CZ.CODEX_LIST.map(c => c.id);
    S.xp = Math.max(S.xp, 2250);
    saveState();
    Sound.play('victory');
    confettiBurst(80);
    toast('Modo Apresentação Ativado!', 'Todos os módulos, distintivos e certificado desbloqueados.', 'sparkles');
    renderProfile(root);
  });

  $('#btn-reset', root).addEventListener('click', () => {
    if (confirm('Tens a certeza de que queres repor todo o progresso, XP e distintivos a zero?')) {
      resetState();
      Sound.play('click');
      toast('Progresso reposto.', 'O protocolo voltou ao estado inicial.', 'refresh');
      renderProfile(root);
    }
  });
}

function openHowToPlay() {
  openModal(`
    <div class="kicker"><span class="kicker-dot"></span> MANUAL DO OPERADOR</div>
    <h2 class="section-title" style="font-size:1.75rem">Como Funciona o CÉLULA ZERO</h2>
    <p style="color:var(--text-soft)">
      Este projeto substitui os slides tradicionais por um laboratório interativo e jogo científico em tempo real:
    </p>
    <div style="display:grid;gap:12px;margin:18px 0">
      <div class="callout" style="margin:0">
        <strong>1. Seis Módulos Narrativos (#/hub):</strong> Inspeciona a anatomia da célula, caça eletrões em modo arcade, cumpre contratos de engenharia no simulador, prevê reações espontâneas, supera o quiz com power-ups e derrota <em>O Corrosor</em>.
      </div>
      <div class="callout" style="margin:0">
        <strong>2. Simulador Eletroquímico Completo (#/lab):</strong> Testa 10 semicélulas reais (Li a Au), altera concentrações e temperatura (Equação de Nernst em direto!), retira a ponte salina ou comuta para Eletrólise. Pressiona a tecla <code>E</code> para ecrã inteiro!
      </div>
      <div class="callout" style="margin:0">
        <strong>3. Arquivo de 12 Capítulos + Calculadoras (#/codex):</strong> Teoria completa com calculadoras interativas de <em>fem/Gibbs</em>, <em>Nernst</em> e <em>Leis de Faraday</em>, além de leitura em voz alta e checkpoints de XP.
      </div>
    </div>
    <div style="display:flex;justify-content:flex-end;gap:10px">
      <button type="button" class="btn btn-primary" data-close-modal>Entendido — Vamos Começar!</button>
    </div>
  `);
}

function openPresentationGuide() {
  openModal(`
    <div class="kicker"><span class="kicker-dot"></span> ROTEIRO DE APRESENTAÇÃO ORAL · NOTA 20</div>
    <h2 class="section-title" style="font-size:1.75rem">Guião de Aula (8 a 12 Minutos)</h2>
    <p style="color:var(--text-soft)">
      Usa estes atalhos diretos enquanto explicas à turma e ao professor — sem precisares de um único slide PowerPoint:
    </p>
    <ol style="color:var(--text-soft);line-height:1.75;padding-left:20px">
      <li><strong>Min 0–1 · Impacto Visual (Intro):</strong> Mostra o reator 2087 e coloca a questão central: <em>«Como transformar uma reação espontânea de oxidação-redução numa corrente elétrica controlada?»</em></li>
      <li><strong>Min 1–3 · Anatomia da Pilha de Daniell:</strong> <a href="#/mission/m1" onclick="closeModal()" style="color:var(--teal)">Abrir Módulo 01 →</a> Clica no ânodo de Zn, cátodo de Cu, fio externo e ponte salina de KNO₃ explicando porque os eletrões vão pelo fio e os iões pela ponte.</li>
      <li><strong>Min 3–6 · Demonstração Ao Vivo no Simulador:</strong> <a href="#/lab" onclick="closeModal()" style="color:var(--teal)">Abrir Simulador →</a>
        <ul>
          <li>Mostra Zn/Cu (+1,10 V) e desliga a <strong>Ponte Salina</strong> ao vivo → tensão cai a 0,00 V!</li>
          <li>Muda para <strong>Lítio + Ouro</strong> (+4,54 V) e explica a Série Eletroquímica.</li>
          <li>Altera concentrações para demonstrar a <strong>Equação de Nernst</strong> e comuta para <strong>Eletrólise</strong> mostrando a inversão de sinal (+/−) nos elétrodos!</li>
        </ul>
      </li>
      <li><strong>Min 6–8 · Aplicações Reais &amp; Calculadoras:</strong> <a href="#/codex/eletrolise" onclick="closeModal()" style="color:var(--teal)">Abrir Leis de Faraday →</a> e <a href="#/codex/ambiente" onclick="closeModal()" style="color:var(--teal)">Corrosão / Ânodo de Sacrifício →</a>.</li>
      <li><strong>Min 8–11 · Interação com a Turma:</strong> <a href="#/mission/m2" onclick="closeModal()" style="color:var(--teal)">Caça-Eletrões →</a> ou <a href="#/mission/m6" onclick="closeModal()" style="color:var(--teal)">Boss Final: O Corrosor →</a> convidando colegas/professor a responder!</li>
    </ol>
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-top:16px">
      <a href="#/lab" onclick="closeModal()" class="btn btn-primary">${icon('beaker')} Ir para o Simulador</a>
      <button type="button" class="btn" data-close-modal>Fechar Guião</button>
    </div>
  `, { wide: true });
}

function openCertificateModal() {
  const integ = getCoreIntegrity();
  const lvl = getLevelInfo(S.xp);
  const dateStr = new Date(S.createdAt || Date.now()).toLocaleDateString('pt-PT', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  openModal(`
    <div class="certificate">
      <div class="cert-seal">${icon('award')}</div>
      <div class="cert-kicker">UNIDADE CIENTÍFICA CÉLULA ZERO · PROTOCOLO ELETROQUÍMICO</div>
      <h2 class="cert-title">Certificado de Proficiência em Eletroquímica</h2>
      <p style="margin:4px 0 0;color:var(--text-muted);font-size:0.9rem">Certifica-se que o(a) operador(a)</p>
      <div class="cert-name">${esc(S.operatorName)}</div>
      <p style="margin:6px auto 0;max-width:58ch;font-size:0.92rem;color:var(--text-soft)">
        de <strong>${esc(S.schoolName)}</strong> (${esc(S.className)}) demonstrou domínio científico e experimental
        sobre reações de oxidação-redução, células galvânicas, potenciais padrão, equação de Nernst,
        eletrólise e proteção contra a corrosão.
      </p>

      <div class="cert-meta-grid">
        <div class="cert-meta-box">
          <small>Patente Atingida</small>
          <strong>NV ${lvl.lvl} · ${esc(lvl.title)}</strong>
        </div>
        <div class="cert-meta-box">
          <small>Integridade do Núcleo</small>
          <strong>${integ.pct}% (${integ.doneCount}/6)</strong>
        </div>
        <div class="cert-meta-box">
          <small>Experiência Total</small>
          <strong>${S.xp} XP</strong>
        </div>
        <div class="cert-meta-box">
          <small>Distintivos</small>
          <strong>${S.badges.length} / ${CZ.BADGES.length}</strong>
        </div>
      </div>

      <div class="cert-signatures">
        <div>Emitido em ${esc(dateStr)}</div>
        <div>Código de Verificação: CZ-${String(S.xp).padStart(4, '0')}-${integ.doneCount}M</div>
      </div>
    </div>

    <div class="no-print" style="display:flex;justify-content:flex-end;gap:10px;margin-top:18px">
      <button type="button" class="btn" data-close-modal>Fechar</button>
      <button type="button" class="btn btn-primary" id="btn-print-cert">
        ${icon('print')} Imprimir / Guardar PDF
      </button>
    </div>
  `, { wide: true });

  $('#btn-print-cert')?.addEventListener('click', () => {
    document.body.classList.add('print-cert');
    window.print();
  });
}
