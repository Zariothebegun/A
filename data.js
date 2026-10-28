/* ============================================================
   CÉLULA ZERO — Base de Dados Científica e de Jogo (data.js)
   Tudo rigorosamente em Português de Portugal (PT-PT)
   ============================================================ */
window.CZ = window.CZ || {};

CZ.TOPICS = {
  redox: 'Oxidação-Redução',
  galvanica: 'Pilhas Galvânicas',
  potenciais: 'Potenciais Padrão E°',
  nernst: 'Equação de Nernst',
  eletrolise: 'Eletrólise & Faraday',
  baterias: 'Baterias & Quotidiano',
  corrosao: 'Corrosão & Proteção'
};

/* Pares conjugados oxidante/redutor a 25 °C, 1 mol/dm³, 1 bar */
CZ.METALS = [
  {
    id: 'Li', sym: 'Li', name: 'Lítio', ion: 'Li⁺', z: 1, M: 6.94, e0: -3.04,
    salt: 'LiClO₄ (em eletrólito não aquoso)',
    color: '#cbd5e1', edge: '#94a3b8', solColor: 'rgba(148,163,184,0.12)',
    half: 'Li⁺ + e⁻ ⇌ Li(s)',
    note: 'Redutor mais forte da série; em baterias reais usa solventes orgânicos anidros (reage violentamente com água).'
  },
  {
    id: 'Mg', sym: 'Mg', name: 'Magnésio', ion: 'Mg²⁺', z: 2, M: 24.31, e0: -2.37,
    salt: 'MgSO₄(aq)',
    color: '#e2e8f0', edge: '#94a3b8', solColor: 'rgba(203,213,225,0.12)',
    half: 'Mg²⁺(aq) + 2 e⁻ ⇌ Mg(s)',
    note: 'Excelente ânodo de sacrifício para proteger cascos de navios e condutas subterrâneas em aço.'
  },
  {
    id: 'Al', sym: 'Al', name: 'Alumínio', ion: 'Al³⁺', z: 3, M: 26.98, e0: -1.66,
    salt: 'Al₂(SO₄)₃(aq)',
    color: '#dbeafe', edge: '#93c5fd', solColor: 'rgba(186,230,253,0.12)',
    half: 'Al³⁺(aq) + 3 e⁻ ⇌ Al(s)',
    note: 'Apesar do E° muito negativo, forma uma película passivante de Al₂O₃ que o protege da corrosão atmosférica.'
  },
  {
    id: 'Zn', sym: 'Zn', name: 'Zinco', ion: 'Zn²⁺', z: 2, M: 65.38, e0: -0.76,
    salt: 'ZnSO₄(aq)',
    color: '#94a3b8', edge: '#64748b', solColor: 'rgba(148,163,184,0.13)',
    half: 'Zn²⁺(aq) + 2 e⁻ ⇌ Zn(s)',
    note: 'Ânodo clássico da pilha de Daniell e da galvanização do ferro.'
  },
  {
    id: 'Fe', sym: 'Fe', name: 'Ferro', ion: 'Fe²⁺', z: 2, M: 55.85, e0: -0.44,
    salt: 'FeSO₄(aq)',
    color: '#78716c', edge: '#57534e', solColor: 'rgba(110,231,183,0.18)',
    half: 'Fe²⁺(aq) + 2 e⁻ ⇌ Fe(s)',
    note: 'Soluções de Fe²⁺ têm tom verde-pálido; oxida-se na presença de O₂ e humidade formando ferrugem.'
  },
  {
    id: 'Ni', sym: 'Ni', name: 'Níquel', ion: 'Ni²⁺', z: 2, M: 58.69, e0: -0.25,
    salt: 'NiSO₄(aq)',
    color: '#a8a29e', edge: '#78716c', solColor: 'rgba(52,211,153,0.24)',
    half: 'Ni²⁺(aq) + 2 e⁻ ⇌ Ni(s)',
    note: 'Usado em acumuladores Ni-MH e revestimentos eletrolíticos anticorrosivos.'
  },
  {
    id: 'H2', sym: 'Pt|H₂', name: 'Hidrogénio (EPH)', ion: 'H⁺', z: 2, M: 2.02, e0: 0.00,
    salt: 'HCl(aq) 1,0 mol/dm³',
    color: '#e5e7eb', edge: '#60a5fa', solColor: 'rgba(96,165,250,0.14)',
    half: '2 H⁺(aq) + 2 e⁻ ⇌ H₂(g)',
    note: 'Elétrodo Padrão de Hidrogénio (platina platinada, p(H₂)=1 bar, [H⁺]=1 M): referência universal E° = 0,00 V.'
  },
  {
    id: 'Cu', sym: 'Cu', name: 'Cobre', ion: 'Cu²⁺', z: 2, M: 63.55, e0: 0.34,
    salt: 'CuSO₄(aq)',
    color: '#d97706', edge: '#b45309', solColor: 'rgba(56,189,248,0.34)',
    half: 'Cu²⁺(aq) + 2 e⁻ ⇌ Cu(s)',
    note: 'Cátodo clássico da pilha de Daniell; solução aquosa azul intensa característica do ião hidratado Cu²⁺(aq).'
  },
  {
    id: 'Ag', sym: 'Ag', name: 'Prata', ion: 'Ag⁺', z: 1, M: 107.87, e0: 0.80,
    salt: 'AgNO₃(aq)',
    color: '#f8fafc', edge: '#cbd5e1', solColor: 'rgba(226,232,240,0.14)',
    half: 'Ag⁺(aq) + e⁻ ⇌ Ag(s)',
    note: 'Metal nobre de elevada condutividade; o ião Ag⁺ é um agente oxidante forte.'
  },
  {
    id: 'Au', sym: 'Au', name: 'Ouro', ion: 'Au³⁺', z: 3, M: 196.97, e0: 1.50,
    salt: 'AuCl₃(aq)',
    color: '#fbbf24', edge: '#d97706', solColor: 'rgba(251,191,36,0.25)',
    half: 'Au³⁺(aq) + 3 e⁻ ⇌ Au(s)',
    note: 'Elevadíssimo potencial padrão de redução: resiste à oxidação e mantém contactos elétricos intactos.'
  }
];

CZ.METAL_BY_ID = Object.fromEntries(CZ.METALS.map(m => [m.id, m]));

CZ.MISSIONS = [
  {
    id: 'm1', code: 'MÓDULO 01', title: 'Anatomia da Célula',
    icon: 'atom', accent: '#5eead4', xp: 140,
    desc: 'Inspeciona os 7 órgãos vitais da Pilha de Daniell e repara as fugas iónicas na ponte salina e nos elétrodos.'
  },
  {
    id: 'm2', code: 'MÓDULO 02', title: 'Caça-Eletrões',
    icon: 'bolt', accent: '#38bdf8', xp: 160,
    desc: ' Interceta impulsos de dados em tempo real: distingue oxidação, redução, oxidante e redutor sem perder vidas.'
  },
  {
    id: 'm3', code: 'MÓDULO 03', title: 'Engenharia de Pilhas',
    icon: 'beaker', accent: '#a78bfa', xp: 200,
    desc: 'Cumpre 4 contratos no simulador eletroquímico: calibra tensões, aplica proteção catódica e executa eletrólise.'
  },
  {
    id: 'm4', code: 'MÓDULO 04', title: 'Radar de Reações',
    icon: 'radar', accent: '#34d399', xp: 180,
    desc: 'Analisa sistemas redox com base na série eletroquímica e prevê quais reações ocorrem espontaneamente (ΔE° > 0).'
  },
  {
    id: 'm5', code: 'MÓDULO 05', title: 'Câmara de Validação',
    icon: 'quiz', accent: '#fbbf24', xp: 220,
    desc: 'Supera 10 questões científicas de nível exame nacional com apoio tático de 3 power-ups laboratoriais.'
  },
  {
    id: 'm6', code: 'BOSS FINAL', title: 'O Corrosor',
    icon: 'skull', accent: '#fb7185', xp: 350, boss: true,
    desc: 'Enfrenta a entidade entrópica que oxida a Célula Mestra num duelo eletroquímico em três fases críticas.'
  }
];

CZ.LEVELS = [
  { lvl: 1, min: 0, title: 'Cadete Iónico' },
  { lvl: 2, min: 150, title: 'Técnico de Semicélula' },
  { lvl: 3, min: 350, title: 'Operador Galvânico' },
  { lvl: 4, min: 600, title: 'Engenheiro de Daniell' },
  { lvl: 5, min: 900, title: 'Especialista de Nernst' },
  { lvl: 6, min: 1250, title: 'Comandante de Faraday' },
  { lvl: 7, min: 1650, title: 'Guardião Catódico' },
  { lvl: 8, min: 2100, title: 'Arquiteto Eletroquímico · Nota 20' }
];

CZ.BADGES = [
  { id: 'first_spark', icon: 'bolt', title: 'Primeira Faísca', desc: 'Concluíste o primeiro módulo de reparação da Célula Zero.' },
  { id: 'anatomist', icon: 'atom', title: 'Cirurgião Galvânico', desc: 'Diagnosticaste todos os 7 componentes da célula sem falhas.' },
  { id: 'electron_hunter', icon: 'flame', title: 'Combo Quântico', desc: 'Atingiste uma série de 6 respostas seguidas no Caça-Eletrões.' },
  { id: 'daniell_master', icon: 'beaker', title: 'Mestre de Daniell', desc: 'Cumpriste todos os contratos de Engenharia de Pilhas.' },
  { id: 'high_voltage', icon: 'sparkles', title: 'Alta Tensão (> 3,5 V)', desc: 'Montaste uma pilha com força eletromotriz superior a 3,50 V no simulador.' },
  { id: 'electrolyzer', icon: 'refresh', title: 'Inversor de Faraday', desc: 'Testaste o regime de eletrólise forçada no simulador.' },
  { id: 'radar_ace', icon: 'radar', title: 'Olho Termodinâmico', desc: 'Concluíste o Radar de Espontaneidade com precisão ≥ 80%.' },
  { id: 'quiz_flawless', icon: 'quiz', title: 'Rigor de Exame', desc: 'Obtiveste pelo menos 90% na Câmara de Validação.' },
  { id: 'corrosor_slayer', icon: 'shield', title: 'Purificador do Núcleo', desc: 'Derrotaste O Corrosor e estabilizaste a Célula Mestra.' },
  { id: 'archivist', icon: 'book', title: 'Leitor do Protocolo', desc: 'Validaste pelo menos 4 checkpoints científicos no Arquivo.' },
  { id: 'scholar_all', icon: 'award', title: 'Enciclopédia Viva', desc: 'Validaste todos os 12 capítulos do Arquivo Científico.' },
  { id: 'grade_20', icon: 'star', title: 'Excelência Nível 20', desc: 'Reparaste os 6 módulos da Célula Mestra (100% de integridade).' }
];

/* Missão 1 — 7 Órgãos da Célula Galvânica Zn/Cu */
CZ.M1_PARTS = [
  {
    id: 'anode', x: 185, y: 215, label: 'Ânodo de Zinco — Zn(s)',
    role: 'Elétrodo onde ocorre a OXIDAÇÃO. Na pilha galvânica é o polo negativo (−), pois liberta eletrões para o circuito externo.',
    eq: 'Zn(s) → Zn²⁺(aq) + 2 e⁻',
    trap: 'Erro comum: achar que o ânodo é sempre negativo. Na eletrólise o ânodo é positivo (+), mas continua a ser onde ocorre a oxidação!',
    q: 'O que acontece à massa da placa de zinco durante o funcionamento da pilha de Daniell?',
    opts: ['Diminui gradualmente devido à oxidação de Zn(s) a Zn²⁺(aq)', 'Aumenta por deposição de cobre metálico', 'Permanece rigorosamente constante'],
    ans: 0
  },
  {
    id: 'cathode', x: 615, y: 215, label: 'Cátodo de Cobre — Cu(s)',
    role: 'Elétrodo onde ocorre a REDUÇÃO. Na pilha galvânica é o polo positivo (+), atraindo os eletrões provenientes do circuito externo.',
    eq: 'Cu²⁺(aq) + 2 e⁻ → Cu(s)',
    trap: 'Mnemónica infalível: VOGAL com VOGAL (Ânodo = Oxidação) e CONSOANTE com CONSOANTE (Cátodo = Redução).',
    q: 'Que fenómeno se observa na superfície do cátodo de cobre?',
    opts: ['Corrosão com libertação de bolhas de hidrogénio', 'Deposição de cobre sólido avermelhado e aumento de massa', 'Dissolução total da placa metálica'],
    ans: 1
  },
  {
    id: 'wire', x: 295, y: 66, label: 'Condutor Metálico Externo',
    role: 'Transporta exclusivamente ELETRÕES livres do ânodo para o cátodo. Nunca transporta iões!',
    eq: 'Fluxo eletrónico: Ânodo (Zn) → Cátodo (Cu)',
    trap: 'Atenção: o sentido convencional da corrente elétrica (I) é oposto ao movimento real dos eletrões (vai do polo + para o polo −).',
    q: 'Que partículas asseguram a corrente elétrica no fio de cobre externo?',
    opts: ['Iões Cu²⁺ e Zn²⁺ em migração rápida', 'Apenas eletrões livres (e⁻)', 'Protões H⁺ vindos da ponte salina'],
    ans: 1
  },
  {
    id: 'load', x: 400, y: 58, label: 'Voltímetro / Carga Elétrica',
    role: 'Mede a diferença de potencial (força eletromotriz em circuito aberto) ou converte energia elétrica em trabalho útil/luz.',
    eq: 'E°célula = E°(Cu²⁺/Cu) − E°(Zn²⁺/Zn) = +0,34 − (−0,76) = 1,10 V',
    trap: 'Em condições padrão (25 °C, concentrações 1,0 mol/dm³), o voltímetro de alta impedância regista 1,10 V.',
    q: 'Qual é o valor de E°célula para a pilha de Daniell padrão?',
    opts: ['−1,10 V', '+0,42 V', '+1,10 V'],
    ans: 2
  },
  {
    id: 'saltbridge', x: 400, y: 175, label: 'Ponte Salina — KNO₃(aq)',
    role: 'Fecha o circuito interno e mantém a ELETRONEUTRALIDADE das soluções através da migração de iões espectadores (K⁺ e NO₃⁻).',
    eq: 'Aniões NO₃⁻ → Semicélula Anódica | Catiões K⁺ → Semicélula Catódica',
    trap: 'Sem ponte salina a tensão cai imediatamente para 0 V porque a acumulação de carga impede o fluxo adicional de eletrões!',
    q: 'Para onde migram os aniões nitrato (NO₃⁻) da ponte salina?',
    opts: ['Para o gobelé do ânodo, compensando o excesso de Zn²⁺ formado', 'Para o fio metálico externo', 'Para o cátodo, para sofrerem redução'],
    ans: 0
  },
  {
    id: 'anolyte', x: 225, y: 315, label: 'Solução Anódica — ZnSO₄(aq)',
    role: 'Meio eletrolítico condutor iónico onde mergulha o ânodo. A concentração [Zn²⁺] aumenta à medida que a pilha descarrega.',
    eq: '[Zn²⁺] aumenta com o progresso da reação espontânea',
    trap: 'Segundo a equação de Nernst, aumentar muito [Zn²⁺] diminui ligeiramente a força eletromotriz da pilha.',
    q: 'Como evolui a concentração de iões Zn²⁺(aq) durante a descarga?',
    opts: ['Diminui até se anular', 'Aumenta progressivamente', 'Transforma-se em iões cobre'],
    ans: 1
  },
  {
    id: 'catholyte', x: 575, y: 315, label: 'Solução Catódica — CuSO₄(aq)',
    role: 'Solução azul rica em iões Cu²⁺ hidratados. À medida que Cu²⁺ se reduz a Cu(s), a cor azul torna-se mais pálida.',
    eq: '[Cu²⁺] diminui → descoloração gradual do azul',
    trap: 'A diminuição da intensidade da cor azul é uma prova visual direta do consumo de Cu²⁺(aq)!',
    q: 'Porque é que a solução catódica perde intensidade da cor azul com o tempo?',
    opts: ['Porque a água evapora no cátodo', 'Porque os iões Cu²⁺(aq) azuis são consumidos, depositando-se como Cu(s)', 'Porque o vidro absorve o pigmento'],
    ans: 1
  }
];

/* Missão 2 — 24 Afirmações Científicas (Caça-Eletrões) */
CZ.M2_STATEMENTS = [
  { s: 'Na oxidação ocorre cedência (perda) de eletrões e aumento do número de oxidação.', isTrue: true, exp: 'Exato! Oxidar corresponde a perder eletrões, aumentando o n.º de oxidação.' },
  { s: 'Numa pilha galvânica, a oxidação ocorre sempre no cátodo.', isTrue: false, exp: 'Falso! A oxidação ocorre SEMPRE no ânodo (tanto em pilhas como na eletrólise).' },
  { s: 'O agente oxidante é a espécie química que sofre redução, captando eletrões.', isTrue: true, exp: 'Correto! Ao captar eletrões de outra espécie, provoca a oxidação dela.' },
  { s: 'Os eletrões atravessam a ponte salina nadando pela solução aquosa.', isTrue: false, exp: 'Falso! Na ponte salina e nas soluções movem-se apenas IÕES; os eletrões circulam pelo fio metálico externo.' },
  { s: 'Na pilha de Daniell, os eletrões fluem da placa de zinco para a placa de cobre.', isTrue: true, exp: 'Certo! O zinco tem menor E° (−0,76 V < +0,34 V), logo oxida-se e envia eletrões ao cobre.' },
  { s: 'O Elétrodo Padrão de Hidrogénio tem potencial E° convencionado igual a 0,00 V a qualquer temperatura.', isTrue: true, exp: 'Verdadeiro! Por convenção internacional da IUPAC, E°(H⁺/H₂) = 0,00 V.' },
  { s: 'Numa célula eletrolítica, o ânodo é o elétrodo ligado ao polo positivo (+) da fonte.', isTrue: true, exp: 'Exato! A fonte externa puxa eletrões do polo (+), forçando aí a oxidação (ânodo).' },
  { s: 'Uma reação redox espontânea a pressão e temperatura constantes apresenta ΔE > 0 e ΔG < 0.', isTrue: true, exp: 'Correto! Como ΔG = −nFE, um potencial de célula positivo implica ΔG negativo.' },
  { s: 'Retirar a ponte salina faz duplicar a tensão elétrica fornecida pela pilha.', isTrue: false, exp: 'Falso! Sem ponte salina o circuito interno abre e a corrente cessa de imediato.' },
  { s: 'No composto H₂SO₄, o número de oxidação do enxofre (S) é +6.', isTrue: true, exp: 'Certo! 2(+1) + x + 4(−2) = 0 ⇒ x = +6.' },
  { s: 'Quanto maior for o potencial padrão de redução E°, maior é o poder oxidante da forma oxidada.', isTrue: true, exp: 'Verdadeiro! Espécies como Au³⁺ ou Ag⁺ com E° elevado têm forte tendência a reduzir-se.' },
  { s: 'Na notação IUPAC Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s), a dupla barra || representa a ponte salina.', isTrue: true, exp: 'Exato! O ânodo escreve-se à esquerda, o cátodo à direita e || separa as duas semicélulas.' },
  { s: 'Quando uma bateria de telemóvel está a carregar na tomada, funciona como célula eletrolítica.', isTrue: true, exp: 'Correto! Durante a carga aplica-se energia elétrica externa para forçar a reação inversa não espontânea.' },
  { s: 'Proteger um casco de aço com blocos de magnésio chama-se proteção anódica por pintura.', isTrue: false, exp: 'Falso! Chama-se proteção catódica por ânodo de sacrifício (o Mg oxida-se em vez do Fe).' },
  { s: 'No ião permanganato (MnO₄⁻), o manganês apresenta número de oxidação +7.', isTrue: true, exp: 'Certo! x + 4(−2) = −1 ⇒ x = +7.' },
  { s: 'Duplicar o tamanho físico das placas metálicas duplica a força eletromotriz E° da pilha.', isTrue: false, exp: 'Falso! E° é uma propriedade intensiva (não depende da massa/área dos elétrodos, embora a corrente máxima dependa).' },
  { s: 'Na pilha de Daniell, os aniões da ponte salina migram para o compartimento do ânodo.', isTrue: true, exp: 'Verdadeiro! Compensam o excesso de carga positiva dos iões Zn²⁺ recém-formados.' },
  { s: 'O cobre metálico dissolve-se espontaneamente em HCl(aq) diluído libertando H₂(g).', isTrue: false, exp: 'Falso! Como E°(Cu²⁺/Cu) = +0,34 V > E°(H⁺/H₂) = 0,00 V, o H⁺ não consegue oxidar o cobre.' },
  { s: 'Numa substância elementar como O₂(g) ou Zn(s), o número de oxidação dos átomos é sempre zero.', isTrue: true, exp: 'Exato! Qualquer elemento no estado livre/elementar tem n.o. = 0.' },
  { s: 'Quando uma pilha atinge o equilíbrio químico (Q = K), a diferença de potencial passa a 0,00 V.', isTrue: true, exp: 'Correto! Uma "pilha gasta" é um sistema eletroquímico que atingiu o equilíbrio químico (E = 0 V).' },
  { s: 'A constante de Faraday (F ≈ 96 485 C/mol) representa a carga elétrica de 1 mole de eletrões.', isTrue: true, exp: 'Exato! F = N_A × e ≈ 96 485 C·mol⁻¹.' },
  { s: 'Na redução ocorre um aumento algébrico do número de oxidação da espécie.', isTrue: false, exp: 'Falso! Redução significa diminuição do número de oxidação por ganho de eletrões.' },
  { s: 'O zinco reduz os iões Ag⁺(aq) espontaneamente em solução aquosa.', isTrue: true, exp: 'Certo! ΔE° = +0,80 − (−0,76) = +1,56 V > 0.' },
  { s: 'A eletrólise da água pura sem eletrólito é extremamente rápida a 1,23 V.', isTrue: false, exp: 'Falso! A água pura tem baixíssima condutividade iónica e exige eletrólito + sobretensão.' }
];

/* Missão 4 — 14 Sistemas Redox para o Radar de Espontaneidade */
CZ.REACTIONS = [
  {
    eq: 'Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)',
    oxPair: 'Zn²⁺/Zn (E° = −0,76 V)', redPair: 'Cu²⁺/Cu (E° = +0,34 V)',
    de0: +1.10, spont: true, oxidant: 'Cu²⁺(aq)', reductant: 'Zn(s)',
    exp: 'ΔE° = +0,34 − (−0,76) = +1,10 V > 0. O zinco tem maior poder redutor do que o cobre, reduzindo espontaneamente Cu²⁺.'
  },
  {
    eq: 'Cu(s) + Zn²⁺(aq) → Cu²⁺(aq) + Zn(s)',
    oxPair: 'Cu²⁺/Cu (E° = +0,34 V)', redPair: 'Zn²⁺/Zn (E° = −0,76 V)',
    de0: -1.10, spont: false, oxidant: 'Zn²⁺(aq)', reductant: 'Cu(s)',
    exp: 'ΔE° = −0,76 − (+0,34) = −1,10 V < 0. Reação não espontânea; só ocorreria fornecendo energia elétrica externa (eletrólise).'
  },
  {
    eq: 'Cu(s) + 2 Ag⁺(aq) → Cu²⁺(aq) + 2 Ag(s)',
    oxPair: 'Cu²⁺/Cu (E° = +0,34 V)', redPair: 'Ag⁺/Ag (E° = +0,80 V)',
    de0: +0.46, spont: true, oxidant: 'Ag⁺(aq)', reductant: 'Cu(s)',
    exp: 'ΔE° = +0,80 − (+0,34) = +0,46 V > 0. Forma-se uma árvore brilhante de cristais de prata sobre o fio de cobre e a solução fica azul!'
  },
  {
    eq: 'Mg(s) + Fe²⁺(aq) → Mg²⁺(aq) + Fe(s)',
    oxPair: 'Mg²⁺/Mg (E° = −2,37 V)', redPair: 'Fe²⁺/Fe (E° = −0,44 V)',
    de0: +1.93, spont: true, oxidant: 'Fe²⁺(aq)', reductant: 'Mg(s)',
    exp: 'ΔE° = −0,44 − (−2,37) = +1,93 V > 0. É este o princípio da proteção catódica do ferro com ânodos de magnésio!'
  },
  {
    eq: 'Ag(s) + H⁺(aq) → Ag⁺(aq) + ½ H₂(g)',
    oxPair: 'Ag⁺/Ag (E° = +0,80 V)', redPair: 'H⁺/H₂ (E° = 0,00 V)',
    de0: -0.80, spont: false, oxidant: 'H⁺(aq)', reductant: 'Ag(s)',
    exp: 'ΔE° = 0,00 − (+0,80) = −0,80 V < 0. A prata é um metal nobre e não reage com ácidos não oxidantes como HCl(aq).'
  },
  {
    eq: 'Zn(s) + 2 H⁺(aq) → Zn²⁺(aq) + H₂(g)',
    oxPair: 'Zn²⁺/Zn (E° = −0,76 V)', redPair: 'H⁺/H₂ (E° = 0,00 V)',
    de0: +0.76, spont: true, oxidant: 'H⁺(aq)', reductant: 'Zn(s)',
    exp: 'ΔE° = 0,00 − (−0,76) = +0,76 V > 0. O zinco reage vigorosamente com ácidos diluídos libertando hidrogénio gasoso.'
  },
  {
    eq: '2 Au(s) + 3 Cu²⁺(aq) → 2 Au³⁺(aq) + 3 Cu(s)',
    oxPair: 'Au³⁺/Au (E° = +1,50 V)', redPair: 'Cu²⁺/Cu (E° = +0,34 V)',
    de0: -1.16, spont: false, oxidant: 'Cu²⁺(aq)', reductant: 'Au(s)',
    exp: 'ΔE° = +0,34 − (+1,50) = −1,16 V < 0. O ouro não é oxidado por soluções de cobre.'
  },
  {
    eq: '2 Al(s) + 3 Ni²⁺(aq) → 2 Al³⁺(aq) + 3 Ni(s)',
    oxPair: 'Al³⁺/Al (E° = −1,66 V)', redPair: 'Ni²⁺/Ni (E° = −0,25 V)',
    de0: +1.41, spont: true, oxidant: 'Ni²⁺(aq)', reductant: 'Al(s)',
    exp: 'ΔE° = −0,25 − (−1,66) = +1,41 V > 0. Termodinamicamente espontânea (desde que removida a película de óxido do alumínio).'
  },
  {
    eq: 'Ni(s) + Fe²⁺(aq) → Ni²⁺(aq) + Fe(s)',
    oxPair: 'Ni²⁺/Ni (E° = −0,25 V)', redPair: 'Fe²⁺/Fe (E° = −0,44 V)',
    de0: -0.19, spont: false, oxidant: 'Fe²⁺(aq)', reductant: 'Ni(s)',
    exp: 'ΔE° = −0,44 − (−0,25) = −0,19 V < 0. O níquel é menos redutor do que o ferro, logo não reduz Fe²⁺.'
  },
  {
    eq: 'Fe(s) + Cu²⁺(aq) → Fe²⁺(aq) + Cu(s)',
    oxPair: 'Fe²⁺/Fe (E° = −0,44 V)', redPair: 'Cu²⁺/Cu (E° = +0,34 V)',
    de0: +0.78, spont: true, oxidant: 'Cu²⁺(aq)', reductant: 'Fe(s)',
    exp: 'ΔE° = +0,34 − (−0,44) = +0,78 V > 0. Um prego de ferro mergulhado em CuSO₄ fica rapidamente revestido de cobre avermelhado!'
  },
  {
    eq: '3 Ag(s) + Au³⁺(aq) → 3 Ag⁺(aq) + Au(s)',
    oxPair: 'Ag⁺/Ag (E° = +0,80 V)', redPair: 'Au³⁺/Au (E° = +1,50 V)',
    de0: +0.70, spont: true, oxidant: 'Au³⁺(aq)', reductant: 'Ag(s)',
    exp: 'ΔE° = +1,50 − (+0,80) = +0,70 V > 0. Mesmo sendo nobre, a prata é oxidada pelo ião ouro(III), que tem E° ainda superior.'
  },
  {
    eq: 'Fe(s) + Mg²⁺(aq) → Fe²⁺(aq) + Mg(s)',
    oxPair: 'Fe²⁺/Fe (E° = −0,44 V)', redPair: 'Mg²⁺/Mg (E° = −2,37 V)',
    de0: -1.93, spont: false, oxidant: 'Mg²⁺(aq)', reductant: 'Fe(s)',
    exp: 'ΔE° = −2,37 − (−0,44) = −1,93 V < 0. O ferro jamais desloca o magnésio dos seus sais em solução.'
  }
];

/* Missão 5 — Banco Completo de 40 Questões de Escolha Múltipla */
CZ.QUIZ = [
  {
    id: 1, topic: 'redox', diff: 1,
    q: 'Numa reação de oxidação-redução, a espécie química que funciona como agente redutor:',
    o: ['Cede eletrões e vê o seu número de oxidação aumentar', 'Capta eletrões e vê o seu número de oxidação diminuir', 'Cede protões sem alterar o seu número de oxidação', 'Mantém o número de oxidação constante ao longo da reação'],
    a: 0, hint: 'Quem reduz outra espécie entrega-lhe eletrões.',
    exp: 'O agente redutor provoca a redução de outra espécie cedendo-lhe eletrões; consequentemente, ele próprio sofre oxidação (aumenta o n.o.).'
  },
  {
    id: 2, topic: 'galvanica', diff: 1,
    q: 'Qual é a afirmação universalmente verdadeira tanto para células galvânicas como para células eletrolíticas?',
    o: ['O ânodo é sempre o elétrodo negativo (−)', 'Os eletrões circulam sempre através da solução aquosa', 'A oxidação ocorre sempre no ânodo e a redução ocorre sempre no cátodo', 'A força eletromotriz padrão é sempre negativa'],
    a: 2, hint: 'Pensa na regra vogal-vogal / consoante-consoante.',
    exp: 'Por definição IUPAC, o ânodo é o local da oxidação e o cátodo é o local da redução em qualquer célula eletroquímica; apenas o sinal (+/−) inverte entre pilha e eletrólise.'
  },
  {
    id: 3, topic: 'galvanica', diff: 1,
    q: 'Considere a pilha padrão Zn(s) | Zn²⁺(aq, 1 M) || Cu²⁺(aq, 1 M) | Cu(s). Sabendo que E°(Zn²⁺/Zn) = −0,76 V e E°(Cu²⁺/Cu) = +0,34 V, qual é o valor de E°célula?',
    o: ['+0,42 V', '+1,10 V', '−1,10 V', '−0,42 V'],
    a: 1, hint: 'E°célula = E°(cátodo) − E°(ânodo).',
    exp: 'E°célula = E°(Cu²⁺/Cu) − E°(Zn²⁺/Zn) = +0,34 − (−0,76) = +1,10 V.'
  },
  {
    id: 4, topic: 'galvanica', diff: 1,
    q: 'Qual é a função principal da ponte salina numa pilha eletroquímica?',
    o: ['Conduzir eletrões livres diretamente entre os dois gobelés', 'Aumentar a temperatura das soluções para acelerar a reação', 'Manter a eletroneutralidade elétrica das semicélulas por migração iónica', 'Oxidar o metal do cátodo'],
    a: 2, hint: 'Sem ela acumulam-se cargas opostas nos dois gobelés.',
    exp: 'A ponte salina fornece catiões ao compartimento catódico e aniões ao compartimento anódico, impedindo a polarização por carga espacial.'
  },
  {
    id: 5, topic: 'redox', diff: 1,
    q: 'Qual é o número de oxidação do crómio no ião dicromato, Cr₂O₇²⁻?',
    o: ['+3', '+6', '+7', '+12'],
    a: 1, hint: '2x + 7(−2) = −2.',
    exp: 'Sabendo que o oxigénio tem n.o. = −2: 2x + 7×(−2) = −2 ⇔ 2x − 14 = −2 ⇔ 2x = +12 ⇔ x = +6.'
  },
  {
    id: 6, topic: 'potenciais', diff: 2,
    q: 'Dados E°(Mg²⁺/Mg) = −2,37 V, E°(Fe²⁺/Fe) = −0,44 V e E°(Ag⁺/Ag) = +0,80 V, qual destas espécies é o agente REDUTOR mais forte?',
    o: ['Ag⁺(aq)', 'Ag(s)', 'Mg(s)', 'Mg²⁺(aq)'],
    a: 2, hint: 'O redutor é a forma reduzida do par com menor E°.',
    exp: 'Quanto menor for E°, maior a tendência da forma reduzida para perder eletrões. Como −2,37 V é o menor potencial e Mg(s) é quem pode ceder eletrões (Mg²⁺ já está oxidado!), a resposta é Mg(s).'
  },
  {
    id: 7, topic: 'potenciais', diff: 2,
    q: 'Usando os mesmos potenciais [E°(Mg²⁺/Mg)=−2,37 V, E°(Fe²⁺/Fe)=−0,44 V, E°(Ag⁺/Ag)=+0,80 V], qual é o agente OXIDANTE mais forte?',
    o: ['Ag⁺(aq)', 'Ag(s)', 'Mg²⁺(aq)', 'Fe(s)'],
    a: 0, hint: 'O oxidante capta eletrões: tem de estar na forma oxidada e ter elevado E°.',
    exp: 'O par Ag⁺/Ag tem o maior E° (+0,80 V), e a espécie capaz de captar eletrões (reduzir-se) é o catião Ag⁺(aq), nunca a prata metálica Ag(s)!'
  },
  {
    id: 8, topic: 'potenciais', diff: 2,
    q: 'Considere a reação Cu(s) + 2 Ag⁺(aq) → Cu²⁺(aq) + 2 Ag(s), com E°(Cu²⁺/Cu)=+0,34 V e E°(Ag⁺/Ag)=+0,80 V. Como se calcula corretamente E°célula?',
    o: ['2 × (+0,80) − (+0,34) = +1,26 V', '(+0,80) − (+0,34) = +0,46 V', '(+0,34) − (+0,80) = −0,46 V', '2 × (+0,80) + (+0,34) = +1,94 V'],
    a: 1, hint: 'Os potenciais padrão E° são grandezas intensivas: NUNCA se multiplicam pelos coeficientes estequiométricos!',
    exp: 'Erro clássico de exame! Como E° = −ΔG°/(nF), ao multiplicar a equação por 2 duplicam tanto ΔG° como n, mantendo E° inalterado: +0,80 − 0,34 = +0,46 V.'
  },
  {
    id: 9, topic: 'nernst', diff: 2,
    q: 'Na pilha Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s) a 25 °C, que alteração faz AUMENTAR a força eletromotriz E acima de 1,10 V?',
    o: ['Aumentar [Cu²⁺] e diminuir [Zn²⁺]', 'Aumentar [Zn²⁺] e diminuir [Cu²⁺]', 'Cortar a placa de cobre a meio', 'Retirar a ponte salina'],
    a: 0, hint: 'Pela equação de Nernst, Q = [Zn²⁺]/[Cu²⁺]; diminuir Q aumenta E.',
    exp: 'E = E° − (0,0592/2)·log([Zn²⁺]/[Cu²⁺]). Ao aumentar [Cu²⁺] (reagente) e diminuir [Zn²⁺] (produto), Q < 1, log Q < 0 e E torna-se superior a E°!'
  },
  {
    id: 10, topic: 'nernst', diff: 2,
    q: 'Qual é o valor da força eletromotriz E de qualquer pilha galvânica no instante em que a reação atinge o equilíbrio químico?',
    o: ['Igual a E°célula', '1,00 V', '0,00 V', 'Infinito'],
    a: 2, hint: 'No equilíbrio químico ΔG = 0 e Q = K.',
    exp: 'No equilíbrio termodinâmico ΔG = 0; como ΔG = −nFE, resulta obrigatoriamente E = 0,00 V (a pilha está completamente descarregada).'
  },
  {
    id: 11, topic: 'galvanica', diff: 1,
    q: 'Na representação esquemática IUPAC de uma célula galvânica, o que aparece à esquerda da dupla barra vertical (||)?',
    o: ['O cátodo, onde ocorre a redução', 'O ânodo, onde ocorre a oxidação', 'O voltímetro digital', 'Os produtos gasosos apenas'],
    a: 1, hint: 'Ordem alfabética: Ânodo à esquerda → Cátodo à direita.',
    exp: 'Por convenção da IUPAC escreve-se à esquerda o elétrodo anódico (M(s) | Mⁿ⁺(aq)) e à direita o elétrodo catódico (Nᵐ⁺(aq) | N(s)).'
  },
  {
    id: 12, topic: 'eletrolise', diff: 2,
    q: 'Durante a eletrólise de cloreto de sódio fundido (NaCl ígneo) com elétrodos inertes, que produtos se formam no cátodo e no ânodo, respetivamente?',
    o: ['H₂(g) no cátodo e O₂(g) no ânodo', 'Na(l) no cátodo e Cl₂(g) no ânodo', 'Cl₂(g) no cátodo e Na(l) no ânodo', 'NaOH no cátodo e HCl no ânodo'],
    a: 1, hint: 'Não há água no meio ígneo! Os catiões Na⁺ vão ao cátodo (−) reduzir-se.',
    exp: 'No NaCl fundido só existem iões Na⁺ e Cl⁻. No cátodo (−): Na⁺ + e⁻ → Na(l); no ânodo (+): 2 Cl⁻ → Cl₂(g) + 2 e⁻.'
  },
  {
    id: 13, topic: 'eletrolise', diff: 3,
    q: 'Já na eletrólise de uma solução AQUOSA concentrada de NaCl(aq), porque não se obtém sódio metálico no cátodo?',
    o: ['Porque a água é reduzida muito mais facilmente do que o ião Na⁺, libertando H₂(g) e OH⁻(aq)', 'Porque o NaCl não se dissocia em água', 'Porque os iões Na⁺ migram para o ânodo', 'Porque o cloro impede a passagem de corrente'],
    a: 0, hint: 'Compara E°(Na⁺/Na) = −2,71 V com a redução da água (−0,83 V a pH 7).',
    exp: 'A água tem um potencial de redução muito superior ao de Na⁺ (−0,83 V vs −2,71 V), pelo que no cátodo ocorre 2 H₂O(l) + 2 e⁻ → H₂(g) + 2 OH⁻(aq) (processo cloro-álcali).'
  },
  {
    id: 14, topic: 'eletrolise', diff: 3,
    q: 'Uma corrente constante de 2,00 A atravessa uma célula de CuSO₄(aq) durante 965 s (F = 96 500 C/mol; M(Cu) = 63,5 g/mol). Qual é a massa de cobre depositada no cátodo?',
    o: ['1,27 g', '0,635 g', '0,318 g', '2,54 g'],
    a: 1, hint: 'Q = I·t = 1930 C ⇒ n(e⁻) = 0,020 mol; cada Cu²⁺ precisa de 2 e⁻.',
    exp: 'Q = 2,00 × 965 = 1930 C. n(e⁻) = 1930 / 96500 = 0,020 mol. Como Cu²⁺ + 2 e⁻ → Cu, n(Cu) = 0,010 mol ⇒ m = 0,010 × 63,5 = 0,635 g.'
  },
  {
    id: 15, topic: 'corrosao', diff: 2,
    q: 'Porque é que o aço galvanizado (revestido com zinco) continua protegido da ferrugem mesmo quando sofre um risco profundo que expõe o ferro?',
    o: ['Porque o zinco tem menor E° (−0,76 V < −0,44 V) e oxida-se preferencialmente, funcionando como ânodo de sacrifício', 'Porque o zinco é mais nobre que o ouro', 'Porque o risco fecha magneticamente', 'Porque o ferro oxida o oxigénio a ozono'],
    a: 0, hint: 'Compara E°(Zn²⁺/Zn) = −0,76 V com E°(Fe²⁺/Fe) = −0,44 V.',
    exp: 'Formando um par bimetálico húmido, o zinco (menor E°) torna-se o ânodo e cede eletrões ao ferro (cátodo), impedindo a formação de Fe²⁺.'
  },
  {
    id: 16, topic: 'corrosao', diff: 2,
    q: 'Pelo contrário, numa lata de folha-de-flandres (ferro revestido com estanho, E°(Sn²⁺/Sn) = −0,14 V), o que acontece se o revestimento riscar?',
    o: ['O estanho sacrifica-se para salvar o ferro', 'A corrosão do ferro acelera drasticamente porque o ferro passa a ser o ânodo face ao estanho', 'Não ocorre qualquer reação mesmo em água salgada', 'Forma-se hidrogénio sólido'],
    a: 1, hint: 'E°(Fe²⁺/Fe) = −0,44 V é inferior a E°(Sn²⁺/Sn) = −0,14 V!',
    exp: 'Como o ferro tem menor E° do que o estanho, quando ambos contactam o eletrólito o ferro funciona como ânodo e o estanho como cátodo, acelerando a ferrugem no ponto do risco!'
  },
  {
    id: 17, topic: 'redox', diff: 2,
    q: 'Qual das seguintes equações químicas NÃO representa uma reação de oxidação-redução?',
    o: ['Zn(s) + 2 HCl(aq) → ZnCl₂(aq) + H₂(g)', 'AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq)', '2 Mg(s) + O₂(g) → 2 MgO(s)', 'CuO(s) + H₂(g) → Cu(s) + H₂O(g)'],
    a: 1, hint: 'Verifica em qual equação nenhum elemento altera o seu número de oxidação.',
    exp: 'A reação entre AgNO₃ e NaCl é uma reação de precipitação pura: Ag(+1), N(+5), O(−2), Na(+1) e Cl(−1) mantêm exatamente os mesmos números de oxidação!'
  },
  {
    id: 18, topic: 'redox', diff: 2,
    q: 'No peróxido de hidrogénio (água oxigenada, H₂O₂), qual é o número de oxidação do oxigénio?',
    o: ['−2', '−1', '0', '+2'],
    a: 1, hint: 'Nos peróxidos existe uma ligação covalente simples O—O.',
    exp: 'Nos peróxidos o hidrogénio mantém +1, logo 2(+1) + 2x = 0 ⇒ x = −1. Por estar num estado intermédio entre −2 e 0, o H₂O₂ pode atuar como oxidante ou como redutor (dismutação)!'
  },
  {
    id: 19, topic: 'baterias', diff: 2,
    q: 'Qual é a grande vantagem química do lítio que explica o seu domínio nas baterias de veículos elétricos e telemóveis?',
    o: ['Tem o potencial E° mais negativo (−3,04 V) e a menor massa molar de todos os metais (6,94 g/mol), conferindo elevadíssima densidade energética', 'É o metal mais denso e pesado da Tabela Periódica', 'Funciona com água do mar pura a 5 V sem separador', 'Nunca sofre oxidação nem redução'],
    a: 0, hint: 'Combina alta tensão por célula (~3,7 V) com massa muito reduzida.',
    exp: 'A combinação de E° = −3,04 V com M = 6,94 g/mol permite armazenar muita energia elétrica por quilograma (alta energia específica).'
  },
  {
    id: 20, topic: 'baterias', diff: 2,
    q: 'Numa pilha de combustível de hidrogénio-oxigénio (PEMFC), qual é o único produto químico formado na reação global 2 H₂(g) + O₂(g) → ?',
    o: ['Dióxido de carbono, CO₂(g)', 'Água pura, 2 H₂O(l)', 'Ácido sulfúrico, H₂SO₄(aq)', 'Metano, CH₄(g)'],
    a: 1, hint: 'Hidrogénio + Oxigénio sem carbono envolvido.',
    exp: 'As células de combustível convertem diretamente a energia química de H₂ e O₂ em eletricidade e calor, tendo apenas água (H₂O) como emissão local!'
  },
  {
    id: 21, topic: 'potenciais', diff: 1,
    q: 'Porque se utiliza uma lâmina de platina (Pt) no Elétrodo Padrão de Hidrogénio?',
    o: ['Porque a platina oxida-se facilmente a Pt⁴⁺', 'Porque H₂ é um gás e precisa de um condutor sólido eletricamente ativo mas quimicamente inerte onde ocorra a transferência de eletrões', 'Para colorir a solução de azul', 'Para substituir a ponte salina'],
    a: 1, hint: 'Um gás não pode ser ligado diretamente a um fio de crocodilo!',
    exp: 'A platina platinada é inerte (não participa na reação redox) e catalisa rapidamente o equilíbrio 2 H⁺(aq) + 2 e⁻ ⇌ H₂(g) na sua superfície.'
  },
  {
    id: 22, topic: 'redox', diff: 2,
    q: 'Ao acertar em meio ácido a semirreação MnO₄⁻(aq) + 8 H⁺(aq) + n e⁻ → Mn²⁺(aq) + 4 H₂O(l), qual é o valor de n?',
    o: ['2 eletrões', '3 eletrões', '5 eletrões', '7 eletrões'],
    a: 2, hint: 'Verifica a conservação da carga elétrica total ou a variação do n.o. do Mn (+7 → +2).',
    exp: 'À direita a carga total é +2. À esquerda é (−1) + (+8) − n = +7 − n. Igualando: 7 − n = 2 ⇒ n = 5 eletrões!'
  },
  {
    id: 23, topic: 'galvanica', diff: 2,
    q: 'Porque NÃO devemos usar KCl(aq) na ponte salina de uma pilha que contenha AgNO₃(aq) numa das semicélulas?',
    o: ['Porque K⁺ explode em contacto com nitrato', 'Porque os iões Cl⁻ reagem com Ag⁺ precipitando cloreto de prata insolúvel, AgCl(s)', 'Porque KCl não conduz corrente em água', 'Porque KCl é um isolante covalente'],
    a: 1, hint: 'Ag⁺(aq) + Cl⁻(aq) → ?',
    exp: 'O cloreto precipita Ag⁺ como AgCl(s), entupindo o tampão poroso da ponte salina e alterando drasticamente [Ag⁺]. Usa-se por isso KNO₃ ou NH₄NO₃!'
  },
  {
    id: 24, topic: 'nernst', diff: 3,
    q: 'Numa pilha de concentração Cu(s) | Cu²⁺(0,010 M) || Cu²⁺(1,0 M) | Cu(s) a 25 °C, quanto vale E°célula e a pilha funciona?',
    o: ['E°célula = 0,00 V, mas a pilha funciona com E ≈ +0,059 V porque as concentrações são diferentes', 'E°célula = +0,34 V e não funciona', 'E°célula = 0,00 V e nunca passa corrente', 'E°célula = +1,10 V'],
    a: 0, hint: 'Ambos os elétrodos são do mesmo par Cu²⁺/Cu, mas Q = 0,010 / 1,0 = 10⁻²!',
    exp: 'Como o par é idêntico nos dois lados, E° = 0,34 − 0,34 = 0,00 V. Porém, por Nernst: E = 0 − (0,0592/2)·log(10⁻²) = +0,0592 V > 0! Oxida na solução diluída e reduz na concentrada até igualar concentrações.'
  },
  {
    id: 25, topic: 'eletrolise', diff: 2,
    q: 'Na purificação (afinação) eletrolítica industrial do cobre, como são montados os elétrodos em solução de CuSO₄?',
    o: ['Ânodo de cobre impuro (+) e cátodo de cobre puro (−)', 'Ânodo de cobre puro (+) e cátodo de cobre impuro (−)', 'Dois elétrodos de grafite sem cobre', 'Ânodo de ouro e cátodo de zinco'],
    a: 0, hint: 'Queremos dissolver a placa impura e depositar Cu puro a 99,99% na placa fina.',
    exp: 'No ânodo (+) o cobre impuro oxida-se a Cu²⁺(aq) (metais nobres como Ag e Au caem nas lamas anódicas valiosas!) e no cátodo (−) deposita-se cobre eletrolítico ultralimpo.'
  },
  {
    id: 26, topic: 'baterias', diff: 1,
    q: 'Qual é a diferença fundamental entre pilhas primárias e acumuladores (pilhas secundárias)?',
    o: ['As primárias têm apenas um elétrodo', 'As secundárias são recarregáveis porque as reações nos elétrodos são eletricamente reversíveis', 'As primárias produzem corrente alternada de 230 V', 'As secundárias não usam reações redox'],
    a: 1, hint: 'Pilha alcalina descartável vs bateria de ião-lítio.',
    exp: 'Nas baterias secundárias a morfologia dos produtos permite aplicar uma fonte externa e reverter as semirreações com segurança ao longo de centenas de ciclos.'
  },
  {
    id: 27, topic: 'baterias', diff: 2,
    q: 'Na bateria de chumbo-ácido de um automóvel, durante a DESCARGA ambos os elétrodos (Pb e PbO₂) convertem-se no mesmo sólido aderente. Qual?',
    o: ['Sulfato de chumbo(II), PbSO₄(s)', 'Chumbo líquido puro, Pb(l)', 'Enxofre elementar, S₈(s)', 'Óxido de hidrogénio sólido'],
    a: 0, hint: 'O eletrólito é H₂SO₄(aq), cuja densidade diminui na descarga!',
    exp: 'No ânodo: Pb + SO₄²⁻ → PbSO₄ + 2 e⁻; no cátodo: PbO₂ + 4 H⁺ + SO₄²⁻ + 2 e⁻ → PbSO₄ + 2 H₂O. Cada célula fornece ~2,0 V (6 células em série = 12 V).'
  },
  {
    id: 28, topic: 'redox', diff: 2,
    q: 'Na reação Cl₂(g) + 2 OH⁻(aq) → Cl⁻(aq) + ClO⁻(aq) + H₂O(l), o que acontece ao cloro?',
    o: ['Sofre apenas oxidação', 'Sofre apenas redução', 'Sofre dismutação (auto-oxidação-redução), passando simultaneamente de 0 para −1 e +1', 'Não sofre variação do número de oxidação'],
    a: 2, hint: 'Determina o n.o. do Cl em Cl₂ (0), Cl⁻ (−1) e ClO⁻ (+1).',
    exp: 'Quando a mesma espécie química se oxida e se reduz simultaneamente numa reação (aqui produzindo lixívia!), ocorre uma reação de dismutação.'
  },
  {
    id: 29, topic: 'potenciais', diff: 2,
    q: 'Qual é a relação termodinâmica exata entre a variação da energia de Gibbs padrão (ΔG°) e a força eletromotriz padrão (E°célula)?',
    o: ['ΔG° = +n · F · E°célula', 'ΔG° = −n · F · E°célula', 'ΔG° = −R · T · E°célula', 'ΔG° = E°célula / F'],
    a: 1, hint: 'O trabalho elétrico útil máximo é negativo para processos espontâneos.',
    exp: 'ΔG° = −nFE°célula, onde n é o número de moles de eletrões transferidos na equação acertada e F = 96 485 C/mol.'
  },
  {
    id: 30, topic: 'eletrolise', diff: 2,
    q: 'Na galvanoplastia (ex.: pratear uma colher de latão por eletrólise em solução de Ag⁺), onde deve ser ligada a colher?',
    o: ['Ao polo negativo (−) da fonte externa, funcionando como cátodo', 'Ao polo positivo (+) da fonte externa, funcionando como ânodo', 'Dentro da ponte salina sem ligação elétrica', 'Em paralelo com o voltímetro desligado'],
    a: 0, hint: 'Queremos que Ag⁺ + e⁻ → Ag(s) ocorra na superfície da colher!',
    exp: 'Para depositar metal sólido (redução dos catiões Ag⁺), o objeto a revestir tem obrigatoriamente de ser o cátodo, ligado ao polo negativo (−) do gerador.'
  },
  {
    id: 31, topic: 'corrosao', diff: 1,
    q: 'Quais são os dois reagentes ambientais indispensáveis para a formação comum da ferrugem aeróbia do ferro?',
    o: ['Azoto N₂(g) e luz ultravioleta', 'Oxigénio O₂(g) e água H₂O(l)', 'Árgon Ar(g) e hélio He(g)', 'Apenas vácuo seco'],
    a: 1, hint: 'Num deserto completamente seco ou em água fervida isenta de O₂ o ferro quase não enferruja.',
    exp: 'A corrosão do ferro é uma micro-célula galvânica: o Fe oxida-se nas zonas anódicas e o O₂ dissolvido em água reduz-se nas zonas catódicas (O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻).'
  },
  {
    id: 32, topic: 'galvanica', diff: 2,
    q: 'Na equação global acertada entre Al(s) e Cu²⁺(aq), quantos eletrões são transferidos no mínimo múltiplo comum?',
    o: ['2 eletrões', '3 eletrões', '5 eletrões', '6 eletrões'],
    a: 3, hint: 'Al perde 3 e⁻ e cada Cu²⁺ ganha 2 e⁻; m.m.c.(3, 2) = ?',
    exp: '2 Al(s) → 2 Al³⁺ + 6 e⁻ e 3 Cu²⁺ + 6 e⁻ → 3 Cu(s). São transferidos n = 6 mol de eletrões por mole de reação escrita!'
  },
  {
    id: 33, topic: 'eletrolise', diff: 3,
    q: 'Duas células eletrolíticas ligadas em SÉRIE contêm AgNO₃(aq) e CuSO₄(aq). Se na primeira se depositarem 0,10 mol de Ag(s), quantas moles de Cu(s) se depositam na segunda?',
    o: ['0,10 mol de Cu', '0,050 mol de Cu', '0,20 mol de Cu', '0,30 mol de Cu'],
    a: 1, hint: 'Em série passa exatamente a mesma carga Q (mesmo n de eletrões = 0,10 mol)!',
    exp: '0,10 mol de Ag exigem 0,10 mol de e⁻ (Ag⁺ + e⁻ → Ag). Com esses mesmos 0,10 mol de e⁻, como Cu²⁺ exige 2 e⁻ por ião, formam-se 0,10 / 2 = 0,050 mol de Cu(s) (2.ª Lei de Faraday).'
  },
  {
    id: 34, topic: 'baterias', diff: 1,
    q: 'Porque não devem as pilhas e baterias usadas ser colocadas no lixo doméstico indiferenciado?',
    o: ['Porque contêm metais pesados/eletrólitos tóxicos ou reativos e recursos estratégicos (Li, Co, Ni, Pb) que devem ser reciclados no Pilhão', 'Porque se transformam em ouro no aterro', 'Porque aumentam a rede Wi-Fi', 'Porque são 100% feitas de madeira'],
    a: 0, hint: 'Economia circular + prevenção de contaminação de solos e águas.',
    exp: 'A deposição seletiva (Ecopilha / Pilhão) evita lixiviação tóxica e recupera até 95% de metais críticos como cobalto, níquel, lítio e chumbo.'
  },
  {
    id: 35, topic: 'redox', diff: 1,
    q: 'Na reação Fe₂O₃(s) + 3 CO(g) → 2 Fe(l) + 3 CO₂(g) nos altos-fornos siderúrgicos, qual é o agente redutor?',
    o: ['Fe₂O₃(s)', 'CO(g)', 'Fe(l)', 'CO₂(g)'],
    a: 1, hint: 'Qual é o reagente cujo carbono passa de +2 para +4?',
    exp: 'O monóxido de carbono, CO(g), oxida-se a CO₂(g) (C passa de +2 a +4), cedendo eletrões para reduzir o ferro de +3 (em Fe₂O₃) para 0 (Fe metálico).'
  },
  {
    id: 36, topic: 'potenciais', diff: 2,
    q: 'Temos 3 recipientes: queremos guardar uma solução de CuSO₄(aq) sem que reaja com as paredes do recipiente. Qual destes metais podemos usar?',
    o: ['Recipiente de Zinco (E° = −0,76 V)', 'Recipiente de Ferro (E° = −0,44 V)', 'Recipiente de Prata (E° = +0,80 V)', 'Recipiente de Magnésio (E° = −2,37 V)'],
    a: 2, hint: 'Para NÃO haver reação, E°(metal) tem de ser superior a E°(Cu²⁺/Cu) = +0,34 V!',
    exp: 'Zinco, ferro e magnésio têm E° < +0,34 V e seriam corroídos pelo Cu²⁺! A prata tem E° = +0,80 V > +0,34 V, pelo que ΔE° = −0,46 V < 0 (não reage).'
  },
  {
    id: 37, topic: 'nernst', diff: 2,
    q: 'Numa pilha a 25 °C onde o catião H⁺ é reagente da semirreação catódica (2 H⁺ + 2 e⁻ → H₂), o que acontece ao potencial do cátodo se o pH da solução aumentar?',
    o: ['O potencial diminui, porque aumentar o pH significa diminuir [H⁺]', 'O potencial aumenta linearmente', 'O potencial passa sempre a +10 V', 'O pH não tem qualquer relação com [H⁺]'],
    a: 0, hint: '[H⁺] = 10⁻ᵖᴴ; menos reagente H⁺ dificulta a redução.',
    exp: 'A 25 °C, E(H⁺/H₂) = −0,0592 × pH (para p(H₂)=1 bar). Subir o pH reduz [H⁺] e faz diminuir o potencial de redução.'
  },
  {
    id: 38, topic: 'eletrolise', diff: 2,
    q: 'Na eletrólise da água acidulada com H₂SO₄ diluído, qual é a proporção volumétrica entre H₂(g) recolhido no cátodo e O₂(g) recolhido no ânodo (mesmas P e T)?',
    o: ['1 volume de H₂ para 1 volume de O₂', '2 volumes de H₂ para 1 volume de O₂', '1 volume de H₂ para 2 volumes de O₂', '4 volumes de H₂ para 1 volume de O₂'],
    a: 1, hint: 'Equação global: 2 H₂O(l) → 2 H₂(g) + O₂(g).',
    exp: 'Pela estequiometria de 2 H₂O(l) → 2 H₂(g) + O₂(g) e pela Lei de Avogadro, o volume de hidrogénio no cátodo é exatamente o dobro do volume de oxigénio no ânodo!'
  },
  {
    id: 39, topic: 'galvanica', diff: 2,
    q: 'Qual é o sentido convencional da corrente elétrica (I) no circuito externo de uma pilha em descarga?',
    o: ['Do polo positivo (cátodo) para o polo negativo (ânodo)', 'Do polo negativo (ânodo) para o polo positivo (cátodo)', 'Apenas dentro do vidro do gobelé', 'Não existe sentido convencional'],
    a: 0, hint: 'O sentido convencional de I foi definido antes da descoberta do eletrão, como o movimento de cargas positivas.',
    exp: 'Os eletrões reais movem-se do ânodo (−) para o cátodo (+), logo o sentido convencional da corrente elétrica I é do cátodo (+) para o ânodo (−).'
  },
  {
    id: 40, topic: 'potenciais', diff: 3,
    q: 'Se ligarmos uma pilha Zn/Cu (E° = 1,10 V) a uma fonte externa regulável com tensão oposta de 1,50 V (> 1,10 V), o que sucede?',
    o: ['A reação inverte-se: passa a ocorrer eletrólise, depositando Zn(s) e oxidando Cu(s)', 'A pilha mantém exatamente o sentido espontâneo', 'Os eletrões desaparecem do universo', 'A ponte salina solidifica em diamante'],
    a: 0, hint: 'Quando V_aplicada > E_pilha em oposição, forçamos a reação não espontânea!',
    exp: 'Aplicar uma tensão oposta superior à fem da célula inverte o fluxo de eletrões, convertendo a célula galvânica numa célula eletrolítica (exatamente o que sucede ao recarregar uma bateria!).'
  }
];

/* Missão 6 — 16 Perguntas de Combate contra O Corrosor (3 Fases) */
CZ.BOSS_Q = [
  {
    phase: 1, attack: 'ONDA DE FERRUGEM ÁCIDA',
    q: 'O Corrosor injeta ácido num tanque de aço! Qual destes blocos devemos soldar ao aço para o proteger por ânodo de sacrifício (E°Fe = −0,44 V)?',
    o: ['Cobre (E° = +0,34 V)', 'Magnésio (E° = −2,37 V)', 'Prata (E° = +0,80 V)', 'Ouro (E° = +1,50 V)'],
    a: 1, exp: 'O magnésio tem E° muito inferior ao ferro (−2,37 V < −0,44 V), oxidando-se no lugar do aço!'
  },
  {
    phase: 1, attack: 'RUPTURA DA PONTE IÓNICA',
    q: 'O Corrosor drena a ponte salina de KNO₃! O que acontece de imediato na célula se não a repusermos?',
    o: ['A diferença de potencial útil cai a zero por acumulação de cargas nas soluções', 'Os eletrões passam a saltar pelo ar a 100 V', 'O cátodo transforma-se em sódio', 'A corrente triplica'],
    a: 0, exp: 'Sem migração de iões na ponte salina, perde-se a eletroneutralidade e o fluxo eletrónico estanca instantaneamente.'
  },
  {
    phase: 1, attack: 'INVERSÃO DE POLARIDADE FANTASMA',
    q: 'Numa pilha Ni(s) | Ni²⁺(aq) || Ag⁺(aq) | Ag(s) [E°Ni = −0,25 V; E°Ag = +0,80 V], qual é a fem padrão E°célula?',
    o: ['+0,55 V', '+1,05 V', '+1,85 V', '−1,05 V'],
    a: 1, exp: 'E°célula = +0,80 − (−0,25) = +1,05 V (atenção: não se multiplica +0,80 por 2!).'
  },
  {
    phase: 1, attack: 'SABOTAGEM ESTEQUIOMÉTRICA',
    q: 'Quantos eletrões são trocados na reação global acertada entre Mg(s) e Au³⁺(aq)?',
    o: ['2 eletrões', '3 eletrões', '5 eletrões', '6 eletrões'],
    a: 3, exp: '3 Mg(s) + 2 Au³⁺(aq) → 3 Mg²⁺(aq) + 2 Au(s): m.m.c.(2, 3) = 6 eletrões.'
  },
  {
    phase: 1, attack: 'NEVOEIRO DE OXIDAÇÃO',
    q: 'No agente corrosivo ácido nítrico (HNO₃), qual é o número de oxidação do azoto (N)?',
    o: ['+3', '+5', '−3', '+6'],
    a: 1, exp: '+1 + x + 3(−2) = 0 ⇒ x = +5.'
  },
  {
    phase: 2, attack: 'DRENAGEM DE NERNST',
    q: 'O Corrosor aumentou [Zn²⁺] para 10 M e baixou [Cu²⁺] para 0,001 M na pilha Zn/Cu! Como varia E relativamente a 1,10 V (a 25 °C)?',
    o: ['Diminui cerca de 0,12 V, ficando próximo de 0,98 V', 'Aumenta para 2,20 V', 'Mantém-se exatamente em 1,10 V', 'Passa a +10,0 V'],
    a: 0, exp: 'Q = 10 / 10⁻³ = 10⁴. E = 1,10 − (0,0592/2)·log(10⁴) = 1,10 − 0,0296 × 4 ≈ 0,98 V!'
  },
  {
    phase: 2, attack: 'CURTO-CIRCUITO CLORETO',
    q: 'O Corrosor tenta misturar KCl numa semicélula de AgNO₃! Que precipitado bloquearia o reator?',
    o: ['KNO₃(s)', 'AgCl(s)', 'Ag₂O(s)', 'Cl₂O₇(s)'],
    a: 1, exp: 'Ag⁺(aq) + Cl⁻(aq) → AgCl(s), um precipitado branco muito insolúvel!'
  },
  {
    phase: 2, attack: 'DESCARGA FORÇADA',
    q: 'Ativamos o modo ELETRÓLISE para regenerar a Célula Mestra! Nesse modo, qual é o sinal e o processo no ÂNODO?',
    o: ['Polo positivo (+), onde ocorre OXIDAÇÃO', 'Polo negativo (−), onde ocorre REDUÇÃO', 'Polo negativo (−), onde ocorre OXIDAÇÃO', 'Neutro (0), sem reação'],
    a: 0, exp: 'Na eletrólise o ânodo está ligado ao polo (+) do gerador, continuando a ser o local da oxidação!'
  },
  {
    phase: 2, attack: 'PULSO DE FARADAY',
    q: 'Para regenerar 1,0 mol de Al(s) a partir de Al³⁺ na eletrólise ígnea, de quantos Faradays (moles de e⁻) precisamos?',
    o: ['1 F (96 485 C)', '2 F (192 970 C)', '3 F (289 455 C)', '6 F (578 910 C)'],
    a: 2, exp: 'Al³⁺ + 3 e⁻ → Al(s): 1 mol de Al exige exatamente 3 mol de eletrões = 3 F!'
  },
  {
    phase: 2, attack: 'CONTAMINAÇÃO DE COBRE',
    q: 'Qual destes metais NÃO sofre corrosão ao mergulhar numa solução de FeSO₄(aq) (E°Fe = −0,44 V)?',
    o: ['Zinco (E° = −0,76 V)', 'Alumínio (E° = −1,66 V)', 'Níquel (E° = −0,25 V)', 'Magnésio (E° = −2,37 V)'],
    a: 2, exp: 'Como E°(Ni²⁺/Ni) = −0,25 V > −0,44 V, o níquel é menos redutor que o ferro e não reduz Fe²⁺.'
  },
  {
    phase: 2, attack: 'ARMADILHA TERMODINÂMICA',
    q: 'Se uma célula apresenta E°célula = +0,50 V e n = 2 mol de eletrões, qual é o sinal de ΔG° e da constante de equilíbrio K?',
    o: ['ΔG° < 0 e K > 1', 'ΔG° > 0 e K < 1', 'ΔG° = 0 e K = 1', 'ΔG° > 0 e K > 1'],
    a: 0, exp: 'E° > 0 implica ΔG° = −nFE° < 0 e K = exp(−ΔG°/RT) > 1 (reação extensa no sentido direto)!'
  },
  {
    phase: 3, attack: 'SOBRECARGA FINAL DO CORROSOR',
    q: 'Golpe Crítico! Qual combinação entre os nossos elétrodos produz a MAIOR força eletromotriz teórica padrão?',
    o: ['Lítio (−3,04 V) e Ouro (+1,50 V) → ΔE° = 4,54 V', 'Zinco (−0,76 V) e Cobre (+0,34 V) → ΔE° = 1,10 V', 'Magnésio (−2,37 V) e Prata (+0,80 V) → ΔE° = 3,17 V', 'Ferro (−0,44 V) e Níquel (−0,25 V) → ΔE° = 0,19 V'],
    a: 0, exp: 'E°máx = +1,50 − (−3,04) = +4,54 V — os dois extremos da nossa série eletroquímica!'
  },
  {
    phase: 3, attack: 'ESPELHO DE DISMUTAÇÃO',
    q: 'O Corrosor liberta peróxido H₂O₂ → H₂O + ½ O₂! Como atua o oxigénio do H₂O₂ nesta reação?',
    o: ['Oxida-se a O₂ (0) e reduz-se a H₂O (−2) simultaneamente (dismutação)', 'Apenas o hidrogénio muda de número de oxidação', 'Não há transferência de eletrões', 'Transforma-se em azoto'],
    a: 0, exp: 'O oxigénio passa de −1 no H₂O₂ para −2 na água (redução) e 0 no O₂ (oxidação): dismutação clássica!'
  },
  {
    phase: 3, attack: 'TEMPESTADE CLORO-ÁLCALI',
    q: 'Na eletrólise industrial de salmoura NaCl(aq), como varia o pH junto ao cátodo durante a operação?',
    o: ['Aumenta (torna-se alcalino) devido à formação de OH⁻ na redução da água', 'Diminui para pH = 0', 'Fica congelado em pH = 7,00', 'Não existe cátodo'],
    a: 0, exp: '2 H₂O(l) + 2 e⁻ → H₂(g) + 2 OH⁻(aq): a produção de iões hidróxido eleva fortemente o pH catódico!'
  },
  {
    phase: 3, attack: 'COLAPSO DO ACUMULADOR',
    q: 'Numa bateria de ião-lítio em DESCARGA, como se movem os iões Li⁺ e os eletrões e⁻?',
    o: ['Ambos vão do ânodo de grafite para o cátodo de óxido metálico: Li⁺ pelo eletrólito interno e e⁻ pelo circuito externo', 'Li⁺ vai pelo fio de cobre externo e e⁻ pelo eletrólito', 'Movem-se em sentidos opostos para o exterior', 'Ficam imóveis nos polos'],
    a: 0, exp: 'Na descarga o ânodo oxida-se libertando e⁻ para o circuito externo e Li⁺ através do separador poroso até intercalar no cátodo!'
  },
  {
    phase: 3, attack: 'EXECUÇÃO DO PROTOCOLO ZERO',
    q: 'Último selo! Uma corrente de 9,65 A passa durante 100 s numa solução de AgNO₃ (F = 96 500 C/mol; M(Ag) = 108 g/mol). Que massa de prata pura sela o núcleo?',
    o: ['1,08 g', '0,54 g', '10,8 g', '2,16 g'],
    a: 0, exp: 'Q = 9,65 × 100 = 965 C ⇒ n(e⁻) = 965 / 96500 = 0,010 mol ⇒ n(Ag) = 0,010 mol ⇒ m = 1,08 g! Núcleo selado!'
  }
];

/* Glossário Científico — 30 Termos em PT-PT */
CZ.GLOSSARY = [
  { term: 'Oxidação', cat: 'Redox', formula: 'M → Mⁿ⁺ + n e⁻', codex: 'redox', def: 'Processo químico em que uma espécie cede (perde) eletrões, verificando-se um aumento algébrico do seu número de oxidação.' },
  { term: 'Redução', cat: 'Redox', formula: 'Ox + n e⁻ → Red', codex: 'redox', def: 'Processo químico em que uma espécie capta (ganha) eletrões, verificando-se uma diminuição algébrica do seu número de oxidação.' },
  { term: 'Agente Oxidante', cat: 'Redox', formula: 'Capta e⁻ (sofre redução)', codex: 'redox', def: 'Espécie química que provoca a oxidação de outra ao captar eletrões dela, sofrendo ela própria redução.' },
  { term: 'Agente Redutor', cat: 'Redox', formula: 'Cede e⁻ (sofre oxidação)', codex: 'redox', def: 'Espécie química que provoca a redução de outra ao ceder-lhe eletrões, sofrendo ela própria oxidação.' },
  { term: 'Número de Oxidação (n.o.)', cat: 'Redox', formula: 'Σ n.o. = carga da espécie', codex: 'redox', def: 'Carga elétrica formal que um átomo adquiriria se os eletrões de cada ligação fossem atribuídos ao átomo mais eletronegativo.' },
  { term: 'Dismutação', cat: 'Redox', formula: '2 H₂O₂ → 2 H₂O + O₂', codex: 'redox', def: 'Reação redox em que um mesmo elemento químico numa dada espécie é simultaneamente oxidado e reduzido.' },
  { term: 'Célula Galvânica (Pilha)', cat: 'Pilhas', formula: 'ΔG < 0  ⇒  E > 0', codex: 'anatomia', def: 'Dispositivo eletroquímico que converte energia química em energia elétrica através de uma reação redox espontânea.' },
  { term: 'Célula Eletrolítica', cat: 'Eletrólise', formula: 'ΔG > 0 (fonte externa)', codex: 'eletrolise', def: 'Dispositivo onde uma fonte elétrica externa força a ocorrência de uma reação redox não espontânea.' },
  { term: 'Ânodo', cat: 'Pilhas', formula: 'Local da Oxidação', codex: 'anatomia', def: 'Elétrodo onde ocorre sempre a semirreação de oxidação. É negativo (−) nas pilhas galvânicas e positivo (+) na eletrólise.' },
  { term: 'Cátodo', cat: 'Pilhas', formula: 'Local da Redução', codex: 'anatomia', def: 'Elétrodo onde ocorre sempre a semirreação de redução. É positivo (+) nas pilhas galvânicas e negativo (−) na eletrólise.' },
  { term: 'Ponte Salina', cat: 'Pilhas', formula: 'KNO₃(aq) / KCl(aq)', codex: 'ponte', def: 'Tubo em U contendo um eletrólito inerte gelificado que fecha o circuito interno e assegura a eletroneutralidade das soluções.' },
  { term: 'Pilha de Daniell', cat: 'Pilhas', formula: 'Zn | Zn²⁺ || Cu²⁺ | Cu', codex: 'daniell', def: 'Célula galvânica histórica inventada por John Frederic Daniell (1836) baseada nos pares Zn²⁺/Zn e Cu²⁺/Cu (E° = 1,10 V).' },
  { term: 'Força Eletromotriz (fem)', cat: 'Potenciais', formula: 'E_célula = E_cátodo − E_ânodo', codex: 'potenciais', def: 'Diferença de potencial máxima entre os terminais de uma pilha em circuito aberto (corrente nula).' },
  { term: 'Potencial Padrão de Redução (E°)', cat: 'Potenciais', formula: '25 °C, 1 mol/dm³, 1 bar', codex: 'potenciais', def: 'Tendência relativa de um par conjugado para sofrer redução, medida face ao Elétrodo Padrão de Hidrogénio em condições padrão.' },
  { term: 'Elétrodo Padrão de Hidrogénio (EPH)', cat: 'Potenciais', formula: 'E°(H⁺/H₂) = 0,00 V', codex: 'potenciais', def: 'Elétrodo de referência primário constituído por platina platinada mergulhada em [H⁺] = 1 M sob H₂(g) a 1 bar.' },
  { term: 'Série Eletroquímica', cat: 'Potenciais', formula: 'Ordenação por E°', codex: 'potenciais', def: 'Tabela que ordena os pares oxidante/redutor segundo os seus potenciais padrão de redução, permitindo prever espontaneidade.' },
  { term: 'Notação Esquema IUPAC', cat: 'Pilhas', formula: 'Ânodo | Sol. || Sol. | Cátodo', codex: 'daniell', def: 'Representação simbólica de uma célula: uma barra vertical | indica mudança de fase e duas barras || indicam a ponte salina.' },
  { term: 'Equação de Nernst', cat: 'Termodinâmica', formula: 'E = E° − (RT/nF) ln Q', codex: 'fatores', def: 'Relação matemática que permite calcular o potencial de uma célula fora das condições padrão em função da temperatura e de Q.' },
  { term: 'Energia de Gibbs (ΔG)', cat: 'Termodinâmica', formula: 'ΔG = −n · F · E', codex: 'potenciais', def: 'Potencial termodinâmico que mede o trabalho elétrico máximo útil (a P e T constantes); ΔG < 0 indica espontaneidade.' },
  { term: 'Constante de Faraday (F)', cat: 'Eletrólise', formula: 'F ≈ 96 485 C·mol⁻¹', codex: 'eletrolise', def: 'Módulo da carga elétrica transportada por uma mole de eletrões (F = N_A × e).' },
  { term: 'Leis de Faraday', cat: 'Eletrólise', formula: 'm = (I · t · M) / (z · F)', codex: 'eletrolise', def: 'Estabelecem que a massa formada ou consumida num elétrodo é diretamente proporcional à carga elétrica Q = I·t que atravessa a célula.' },
  { term: 'Pilha de Concentração', cat: 'Termodinâmica', formula: 'E° = 0 V, mas E > 0 V', codex: 'fatores', def: 'Célula constituída por duas semicélulas quimicamente iguais mas com diferentes concentrações iónicas, gerando fem até igualarem.' },
  { term: 'Galvanoplastia', cat: 'Eletrólise', formula: 'Eletrodeposição catódica', codex: 'eletrolise', def: 'Técnica eletrolítica usada para revestir uma peça condutora (cátodo) com uma camada fina de outro metal (cromagem, prateação, douradura).' },
  { term: 'Eletrólito', cat: 'Pilhas', formula: 'Condutor de 2.ª espécie', codex: 'base', def: 'Substância fundida ou dissolvida que contém iões móveis capazes de conduzir corrente elétrica.' },
  { term: 'Elétrodo Inerte', cat: 'Pilhas', formula: 'Pt(s) ou Grafite C(s)', codex: 'anatomia', def: 'Condutor sólido que permite trocar eletrões com espécies em solução/gás sem participar quimicamente na reação global.' },
  { term: 'Acumulador (Bateria Secundária)', cat: 'Baterias', formula: 'Descarga ⇄ Carga', codex: 'baterias', def: 'Gerador eletroquímico reversível que funciona como célula galvânica na descarga e como célula eletrolítica na recarga.' },
  { term: 'Pilha de Combustível', cat: 'Baterias', formula: '2 H₂ + O₂ → 2 H₂O', codex: 'baterias', def: 'Célula galvânica aberta alimentada continuamente por reagentes externos (ex.: hidrogénio e oxigénio) sem se esgotar.' },
  { term: 'Corrosão Metálica', cat: 'Corrosão', formula: 'Oxidação indesejada', codex: 'ambiente', def: 'Deterioração espontânea de um metal (como a ferrugem do ferro) por reação eletroquímica com agentes oxidantes do meio ambiente.' },
  { term: 'Proteção Catódica', cat: 'Corrosão', formula: 'Ânodo de Sacrifício (Zn, Mg)', codex: 'ambiente', def: 'Método que impede a corrosão de uma estrutura metálica tornando-a o cátodo de uma célula através de um metal mais redutor ou corrente impressa.' },
  { term: 'Passivação', cat: 'Corrosão', formula: 'Película Al₂O₃ / Cr₂O₃', codex: 'ambiente', def: 'Formação espontânea de uma camada superficial de óxido ultrafina, compacta e aderente que protege metais como Al, Ti ou aço inox.' }
];
