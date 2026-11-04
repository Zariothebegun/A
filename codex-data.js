/* ============================================================
   CÉLULA ZERO — Arquivo Científico Completo: 12 Capítulos (codex-data.js)
   Rigor de 12.º Ano / Ensino Secundário & Profissional (PT-PT)
   ============================================================ */
window.CZ = window.CZ || {};

CZ.CODEX_LIST = [
  {
    id: 'base',
    num: '01',
    title: 'O Que É uma Célula Química?',
    subtitle: 'Da energia das ligações químicas à corrente elétrica ordenada',
    readTime: '3 min',
    tag: 'Fundamentos',
    widget: 'cell-demo',
    html: `
      <p>Quando mergulhamos uma placa de zinco diretamente numa solução azul de sulfato de cobre(II), ocorre uma reação espontânea de oxidação-redução: o zinco dissolve-se, deposita-se cobre avermelhado e liberta-se <strong>calor</strong>. Os eletrões passam diretamente dos átomos de zinco para os iões Cu²⁺ à superfície da placa — não há trabalho elétrico aproveitável.</p>
      <div class="callout">
        <strong>Ideia-Chave da Eletroquímica:</strong> Se separarmos fisicamente a oxidação e a redução em dois compartimentos (semicélulas) ligados por um fio condutor e uma ponte salina, obrigamos os eletrões a viajar pelo circuito externo, convertendo <strong>energia química diretamente em energia elétrica</strong>!
      </div>
      <h3>Os Dois Regimes das Células Eletroquímicas</h3>
      <table class="codex-table">
        <thead>
          <tr><th>Característica</th><th>Célula Galvânica (Pilha)</th><th>Célula Eletrolítica (Eletrólise)</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Conversão energética</strong></td><td>Energia Química → Energia Elétrica</td><td>Energia Elétrica → Energia Química</td></tr>
          <tr><td><strong>Espontaneidade</strong></td><td>Reação espontânea (ΔG &lt; 0)</td><td>Reação forçada / não espontânea (ΔG &gt; 0)</td></tr>
          <tr><td><strong>Potencial de célula</strong></td><td>E_célula &gt; 0 V</td><td>Exige fonte externa V_aplicada &gt; |E_célula|</td></tr>
          <tr><td><strong>Ânodo (Oxidação)</strong></td><td>Polo Negativo (−)</td><td>Polo Positivo (+)</td></tr>
          <tr><td><strong>Cátodo (Redução)</strong></td><td>Polo Positivo (+)</td><td>Polo Negativo (−)</td></tr>
        </tbody>
      </table>
      <h3>Condutores de 1.ª e de 2.ª Espécie</h3>
      <ul>
        <li><strong>Condutores eletrónicos (1.ª espécie):</strong> Metais e grafite — conduzem corrente através do movimento ordenado de <em>eletrões livres</em> sem transformação química.</li>
        <li><strong>Condutores eletrolíticos (2.ª espécie):</strong> Soluções aquosas de sais/ácidos/bases ou sais fundidos — conduzem corrente através da migração de <em>iões positivos (catiões) e negativos (aniões)</em>.</li>
      </ul>
    `,
    checkpoint: {
      q: 'Porque é que mergulhar zinco diretamente em CuSO₄(aq) num único copo não acende uma lâmpada?',
      o: [
        'Porque não há reação química entre zinco e cobre',
        'Porque a transferência de eletrões ocorre diretamente por contacto microscópico, dissipando a energia como calor sem percorrer um circuito externo',
        'Porque a água destrói todos os eletrões'
      ],
      a: 1,
      exp: 'Para obter corrente elétrica útil é indispensável separar espacialmente as duas semirreações em semicélulas distintas.'
    }
  },
  {
    id: 'anatomia',
    num: '02',
    title: 'Anatomia e Polaridade dos Elétrodos',
    subtitle: 'Ânodo, cátodo, elétrodos ativos vs inertes e fluxo de partículas',
    readTime: '4 min',
    tag: 'Estrutura',
    html: `
      <p>Toda a célula eletroquímica é constituída por duas <strong>semicélulas</strong>. Cada semicélula reúne um condutor eletrónico (o <strong>elétrodo</strong>) em contacto com um condutor iónico (o <strong>eletrólito</strong>), formando um par conjugado oxidante/redutor.</p>
      <div class="formula-box">
        Regra Universal IUPAC:  ÂNODO ≡ OXIDAÇÃO (Vogal-Vogal)   |   CÁTODO ≡ REDUÇÃO (Consoante-Consoante)
      </div>
      <h3>Porque Muda o Sinal (+/−) entre Pilha e Eletrólise?</h3>
      <ul>
        <li><strong>Na Pilha Galvânica:</strong> O ânodo sofre oxidação espontânea e liberta eletrões na placa metálica, acumulando carga negativa → <strong>Ânodo (−)</strong>. O cátodo consome eletrões na redução → <strong>Cátodo (+)</strong>.</li>
        <li><strong>Na Célula Eletrolítica:</strong> O gerador externo liga o seu terminal positivo ao elétrodo de onde <em>retira</em> eletrões, forçando aí a oxidação → <strong>Ânodo (+)</strong>. O terminal negativo injeta eletrões no outro elétrodo, forçando a redução → <strong>Cátodo (−)</strong>.</li>
      </ul>
      <div class="callout is-warn">
        <strong>Atenção em Apresentações e Exames:</strong> Tanto nas pilhas como na eletrólise, no circuito externo os eletrões movem-se <strong>sempre do ânodo para o cátodo</strong>!
      </div>
      <h3>Tipos de Elétrodos</h3>
      <ul>
        <li><strong>Elétrodos ativos:</strong> Participam na reação (ex.: placas de Zn(s), Cu(s), Ag(s)), variando de massa.</li>
        <li><strong>Elétrodos inertes:</strong> Platina <code>Pt(s)</code> ou grafite <code>C(s)</code>; servem apenas de superfície condutora quando tanto o oxidante como o redutor estão em solução (ex.: <code>Fe³⁺/Fe²⁺</code>) ou são gases (ex.: <code>H⁺/H₂</code>).</li>
      </ul>
    `,
    checkpoint: {
      q: 'Numa célula onde ambas as espécies do par Fe³⁺(aq)/Fe²⁺(aq) estão dissolvidas, que elétrodo devemos mergulhar na solução?',
      o: [
        'Um elétrodo inerte de platina Pt(s) ou grafite C(s)',
        'Um elétrodo de sódio metálico Na(s)',
        'Nenhum elétrodo, basta mergulhar plástico'
      ],
      a: 0,
      exp: 'Como não existe metal sólido no par Fe³⁺/Fe²⁺, usa-se platina ou grafite para transferir eletrões sem interferir quimicamente.'
    }
  },
  {
    id: 'redox',
    num: '03',
    title: 'Reações Redox e Número de Oxidação',
    subtitle: 'Regras de determinação de n.o., acerto de equações e dismutação',
    readTime: '5 min',
    tag: 'Química Geral',
    html: `
      <p>As reações de <strong>oxidação-redução (redox)</strong> envolvem transferência efetiva ou formal de eletrões entre espécies químicas. Para acompanhar rigorosamente essa transferência usamos o <strong>número de oxidação (n.o.)</strong>.</p>
      <h3>Regras Essenciais do Número de Oxidação</h3>
      <ol>
        <li>Em qualquer <strong>substância elementar</strong> (ex.: <code>Zn(s)</code>, <code>O₂(g)</code>, <code>Cl₂(g)</code>), o n.o. é <strong>0</strong>.</li>
        <li>Num <strong>ião monoatómico</strong>, o n.o. iguala a carga do ião (ex.: <code>Cu²⁺</code> → +2; <code>Cl⁻</code> → −1).</li>
        <li>O <strong>flúor</strong> tem sempre −1; os metais alcalinos (Grupo 1) têm +1 e os alcalinoterrosos (Grupo 2) têm +2 nos seus compostos.</li>
        <li>O <strong>oxigénio</strong> tem −2 na generalidade dos compostos, exceto nos peróxidos como <code>H₂O₂</code> (−1), superóxidos (−½) e com flúor (+2).</li>
        <li>O <strong>hidrogénio</strong> tem +1 ligado a não-metais e −1 nos hidretos metálicos (ex.: <code>NaH</code>).</li>
        <li>A <strong>soma algébrica</strong> dos n.o. de todos os átomos iguala zero numa molécula neutra ou a carga global num ião poliatómico.</li>
      </ol>
      <div class="formula-box">
        Exemplo no ião dicromato (Cr₂O₇²⁻):  2 · n.o.(Cr) + 7 · (−2) = −2  ⇒  2 · n.o.(Cr) = +12  ⇒  n.o.(Cr) = +6
      </div>
      <h3>Método do Ião-Eletrão em Meio Ácido</h3>
      <p>1) Separar as duas semirreações; 2) Acertar átomos diferentes de O e H; 3) Acertar O adicionando <code>H₂O</code>; 4) Acertar H adicionando <code>H⁺</code>; 5) Acertar cargas adicionando <code>e⁻</code>; 6) Multiplicar para igualar eletrões cedidos e captados e somar!</p>
    `,
    checkpoint: {
      q: 'Na reação 2 Fe³⁺(aq) + Sn²⁺(aq) → 2 Fe²⁺(aq) + Sn⁴⁺(aq), qual é o agente oxidante?',
      o: [
        'Sn²⁺(aq), porque perde eletrões',
        'Fe³⁺(aq), porque capta eletrões reduzindo-se a Fe²⁺(aq)',
        'Fe²⁺(aq), porque é um produto'
      ],
      a: 1,
      exp: 'O Fe³⁺ passa de +3 para +2 (sofre redução ao captar eletrões do Sn²⁺), logo Fe³⁺ é o agente oxidante!'
    }
  },
  {
    id: 'daniell',
    num: '04',
    title: 'A Pilha de Daniell ao Microscópio',
    subtitle: 'História, semirreações, balanço de massa e notação IUPAC',
    readTime: '4 min',
    tag: 'Caso Clássico',
    html: `
      <p>Inventada em <strong>1836</strong> pelo químico britânico <strong>John Frederic Daniell</strong> para eliminar o problema da polarização por bolhas de hidrogénio na pilha de Volta, a pilha de Daniell tornou-se a fonte fiável de energia das redes telegráficas do século XIX.</p>
      <div class="formula-box">
        Ânodo (−) Oxidação:   Zn(s) → Zn²⁺(aq) + 2 e⁻
        <br/>Cátodo (+) Redução:   Cu²⁺(aq) + 2 e⁻ → Cu(s)
        <br/>─────────────────────────────────────────────────
        <br/>Equação Global:       Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)     (E°célula = +1,10 V)
      </div>
      <h3>Diagrama Celular (Convenção IUPAC)</h3>
      <div class="formula-box">
        Zn(s) | Zn²⁺(aq, 1,0 mol·dm⁻³) || Cu²⁺(aq, 1,0 mol·dm⁻³) | Cu(s)
      </div>
      <ul>
        <li><code>|</code> representa uma interface (fronteira de fase) entre sólido e solução.</li>
        <li><code>||</code> representa a ponte salina que elimina o potencial de junção líquida.</li>
        <li>Evidências experimentais durante a descarga: <strong>corrosão/diminuição da massa de Zn</strong>, <strong>deposição avermelhada/aumento da massa de Cu</strong> e <strong>atenuação da cor azul</strong> da solução de CuSO₄.</li>
      </ul>
    `,
    checkpoint: {
      q: 'Se durante o funcionamento de uma pilha de Daniell o ânodo de zinco perder 0,10 mol de Zn(s), quantas moles de Cu(s) se depositam no cátodo?',
      o: [
        '0,20 mol de Cu(s)',
        '0,10 mol de Cu(s)',
        '0,05 mol de Cu(s)'
      ],
      a: 1,
      exp: 'A estequiometria entre Zn e Cu é 1 : 1 (ambos envolvem 2 eletrões), logo depositam-se exatamente 0,10 mol de Cu(s) (6,355 g).'
    }
  },
  {
    id: 'potenciais',
    num: '05',
    title: 'Potenciais Padrão E° e Série Eletroquímica',
    subtitle: 'Elétrodo Padrão de Hidrogénio, cálculo da fem e relação com ΔG°',
    readTime: '5 min',
    tag: 'Termodinâmica',
    widget: 'calc-fem',
    html: `
      <p>É fisicamente impossível medir o potencial absoluto de uma única semicélula isolada. Por isso, a IUPAC escolheu uma referência universal — o <strong>Elétrodo Padrão de Hidrogénio (EPH)</strong> — atribuindo-lhe <code>E°(H⁺/H₂) = 0,00 V</code> em condições padrão (1 bar, [H⁺] = 1 mol/dm³, 25 °C).</p>
      <div class="formula-box">
        E°célula = E°(cátodo, redução) − E°(ânodo, redução)
        <br/>ΔG° = −n · F · E°célula     (com F = 96 485 C·mol⁻¹)
      </div>
      <h3>Como Ler a Série Eletroquímica num Segundo</h3>
      <ul>
        <li><strong>Maior E° (ex.: Au³⁺/Au = +1,50 V):</strong> Forte tendência para sofrer redução → a forma oxidada (<code>Au³⁺</code>) é um <strong>oxidante forte</strong>; o metal (<code>Au</code>) é muito pouco reativo (nobre).</li>
        <li><strong>Menor E° (ex.: Li⁺/Li = −3,04 V):</strong> Forte tendência para sofrer oxidação → a forma reduzida (<code>Li</code>) é um <strong>redutor fortíssimo</strong>.</li>
        <li><strong>Regra da Espontaneidade:</strong> Uma reação redox é espontânea em condições padrão sempre que <code>E°(par que reduz) &gt; E°(par que oxida)</code>, isto é, <code>ΔE° &gt; 0</code>.</li>
      </ul>
      <div class="callout is-warn">
        <strong>Regra de Ouro:</strong> Os valores de <code>E°</code> são propriedades <em>intensivas</em> (J/C). Quando multiplicas uma semirreação por 2 ou 3 para acertar eletrões, <strong>NUNCA multiplicas o valor de E°</strong>!
      </div>
    `,
    checkpoint: {
      q: 'Sabendo que E°(Al³⁺/Al) = −1,66 V e E°(Cu²⁺/Cu) = +0,34 V, quanto vale E°célula da pilha Al/Cu?',
      o: [
        '+2,00 V',
        '+4,34 V',
        '−2,00 V'
      ],
      a: 0,
      exp: 'E°célula = E°(Cu²⁺/Cu) − E°(Al³⁺/Al) = +0,34 − (−1,66) = +2,00 V (sem multiplicar por 2 nem por 3!).'
    }
  },
  {
    id: 'ponte',
    num: '06',
    title: 'Ponte Salina e Eletroneutralidade',
    subtitle: 'Porque para a corrente sem ponte salina e como escolher o sal ideal',
    readTime: '3 min',
    tag: 'Mecanismo Iónico',
    html: `
      <p>Imagina a pilha de Daniell sem ponte salina: nos primeiros microssegundos em que saem eletrões do zinco para o cobre, o gobelé do zinco fica carregado positivamente (excesso de <code>Zn²⁺</code>) e o gobelé do cobre fica carregado negativamente (excesso de <code>SO₄²⁻</code> não compensado). Essa diferença de potencial interna trava de imediato qualquer novo eletrão!</p>
      <h3>Requisitos de um Bom Eletrólito na Ponte Salina</h3>
      <ul>
        <li><strong>Inércia química e redox:</strong> Não pode precipitar nem oxidar/reduzir espécies das semicélulas (por exemplo, usar <code>KNO₃</code> em vez de <code>KCl</code> quando existe <code>Ag⁺</code> ou <code>Pb²⁺</code>).</li>
        <li><strong>Mobilidades iónicas semelhantes:</strong> Os iões <code>K⁺</code> e <code>NO₃⁻</code> (ou <code>K⁺</code> e <code>Cl⁻</code>) movem-se quase à mesma velocidade em água, minimizando potenciais de junção líquida!</li>
      </ul>
      <div class="formula-box">
        Sentido de migração interna (sempre igual!):
        <br/>• ANIÕES (−) migram para o ÂNODO   |   • CATIÕES (+) migram para o CÁTODO
      </div>
    `,
    checkpoint: {
      q: 'Qual é o par de iões mais adequado para uma ponte salina onde uma das semicélulas contém AgNO₃(aq)?',
      o: [
        'K⁺ e Cl⁻ (cloreto de potássio)',
        'K⁺ e NO₃⁻ (nitrato de potássio)',
        'Na⁺ e S²⁻ (sulfureto de sódio)'
      ],
      a: 1,
      exp: 'KNO₃ é solúvel, inerte e não precipita Ag⁺ (ao contrário de Cl⁻ e S²⁻, que formam AgCl e Ag₂S insolúveis).'
    }
  },
  {
    id: 'eletrolise',
    num: '07',
    title: 'Eletrólise e Leis de Faraday',
    subtitle: 'Eletrólise ígnea vs aquosa, galvanoplastia e estequiometria da carga elétrica',
    readTime: '6 min',
    tag: 'Processos Industriais',
    widget: 'calc-faraday',
    html: `
      <p>Na <strong>eletrólise</strong> usamos energia elétrica contínua para forçar reações químicas não espontâneas (<code>ΔG &gt; 0</code>). É graças à eletrólise que a humanidade produz alumínio metálico (processo Hall-Héroult), cloro, soda cáustica, hidrogénio verde e cobre puro a 99,99%.</p>
      <h3>Competição de Descarga em Meio Aquoso</h3>
      <p>Numa solução aquosa a própria <strong>água</strong> pode oxidar-se ou reduzir-se! Regra prática em elétrodos inertes:</p>
      <ul>
        <li><strong>No Cátodo (−):</strong> Catiões de metais ativos (Grupos 1, 2 e Al³⁺) <em>não</em> se reduzem em água; reduz-se a água libertando <code>H₂(g)</code> e formando <code>OH⁻</code>. Catiões de metais com maior E° (<code>Cu²⁺</code>, <code>Ag⁺</code>, <code>Au³⁺</code>) depositam-se como metal!</li>
        <li><strong>No Ânodo (+):</strong> Aniões oxigenados de elevado estado de oxidação (<code>SO₄²⁻</code>, <code>NO₃⁻</code>, <code>PO₄³⁻</code>) não se oxidam; oxida-se a água libertando <code>O₂(g)</code> e formando <code>H⁺</code>. Haletos concentrados (<code>Cl⁻</code>, <code>Br⁻</code>, <code>I⁻</code>) oxidam-se a halogénio (<code>Cl₂</code>, etc.).</li>
      </ul>
      <h3>Leis Quantitativas de Michael Faraday (1834)</h3>
      <div class="formula-box">
        Q = I · t     |     n(e⁻) = Q / F     |     m = (I · t · M) / (z · F)
        <br/>onde: I = corrente (A), t = tempo (s), M = massa molar (g/mol), z = eletrões por ião, F = 96 485 C/mol
      </div>
    `,
    checkpoint: {
      q: 'Que gases se recolhem nos elétrodos inertes durante a eletrólise de uma solução aquosa diluída de Na₂SO₄?',
      o: [
        'Sódio gasoso e enxofre gasoso',
        'Hidrogénio H₂(g) no cátodo e Oxigénio O₂(g) no ânodo (eletrólise efetiva da água)',
        'Apenas vapor de mercúrio'
      ],
      a: 1,
      exp: 'Nem Na⁺ nem SO₄²⁻ descarregam em água: ocorre apenas a redução e oxidação da água (com Na₂SO₄ a assegurar a condutividade iónica).'
    }
  },
  {
    id: 'fatores',
    num: '08',
    title: 'Equação de Nernst, Concentração e Temperatura',
    subtitle: 'Células reais fora das condições padrão e pilhas de concentração',
    readTime: '5 min',
    tag: 'Cálculo Avançado',
    widget: 'calc-nernst',
    html: `
      <p>Raramente uma pilha opera exatamente a <code>1,0 mol/dm³</code> durante a sua vida útil! À medida que os reagentes são consumidos e os produtos se acumulam, o quociente da reação <code>Q</code> aumenta e a tensão diminui gradualmente segundo a célebre equação deduzida por <strong>Walther Nernst</strong> (Prémio Nobel 1920):</p>
      <div class="formula-box">
        E = E° − (R · T / (n · F)) · ln(Q)
        <br/>A 25 °C (298,15 K):   E = E° − (0,05916 / n) · log₁₀(Q)
      </div>
      <h3>Consequências Práticas Diretas</h3>
      <ul>
        <li><strong> Se Q &lt; 1 (excesso de reagentes aquosos):</strong> <code>log Q &lt; 0</code> ⇒ <strong><code>E &gt; E°</code></strong> (a fem supera o valor padrão!).</li>
        <li><strong>Se Q = 1 (condições padrão):</strong> <code>log 1 = 0</code> ⇒ <strong><code>E = E°</code></strong>.</li>
        <li><strong>Se Q &gt; 1 (acumulação de produtos):</strong> <code>log Q &gt; 0</code> ⇒ <strong><code>E &lt; E°</code></strong>.</li>
        <li><strong>No Equilíbrio Químico (Q = K):</strong> <strong><code>E = 0,00 V</code></strong> ⇒ <code>log₁₀(K) = (n · E°) / 0,05916</code> (a 25 °C).</li>
      </ul>
      <div class="callout">
        <strong>Sabias que os nossos neurónios são células de concentração?</strong> O potencial de repouso das membranas celulares (~ −70 mV) resulta de gradientes de concentração de iões K⁺ e Na⁺ descritos pela equação de Nernst!
      </div>
    `,
    checkpoint: {
      q: 'Na pilha Zn | Zn²⁺(0,01 M) || Cu²⁺(1,0 M) | Cu a 25 °C (E° = 1,10 V, n = 2), qual é o valor aproximado de E?',
      o: [
        '1,10 − 0,0296 × (−2) ≈ 1,16 V',
        '1,10 − 0,0296 × (+2) ≈ 1,04 V',
        '0,00 V'
      ],
      a: 0,
      exp: 'Q = [Zn²⁺]/[Cu²⁺] = 0,01 / 1,0 = 10⁻². Logo log₁₀(Q) = −2 e E = 1,10 − (0,0592/2)×(−2) ≈ +1,16 V!'
    }
  },
  {
    id: 'baterias',
    num: '09',
    title: 'Baterias Modernas e Pilhas de Combustível',
    subtitle: 'Alcalinas, Chumbo-Ácido, Ião-Lítio e Hidrogénio Verde',
    readTime: '5 min',
    tag: 'Tecnologia',
    html: `
      <p>Na linguagem científica, uma <strong>bateria</strong> é uma associação de várias células eletroquímicas ligadas em série (para somar tensões) ou em paralelo (para somar capacidades de corrente).</p>
      <table class="codex-table">
        <thead>
          <tr><th>Tecnologia</th><th>Tensão/Célula</th><th>Tipo</th><th>Destaques Químicos</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Pilha Alcalina (Zn/MnO₂)</strong></td><td>1,5 V</td><td>Primária</td><td>Eletrólito KOH em pasta; maior capacidade que a velha pilha Leclanché ácida.</td></tr>
          <tr><td><strong>Chumbo-Ácido (Pb/PbO₂)</strong></td><td>2,0 V (×6 = 12 V)</td><td>Secundária</td><td>Fornece picos enormes de corrente para motores de arranque; reciclável a &gt;98%.</td></tr>
          <tr><td><strong>Ião-Lítio (Grafite/LiCoO₂ ou LFP)</strong></td><td>3,2 – 3,7 V</td><td>Secundária</td><td>Intercalação reversível de iões Li⁺ ("cadeira de baloiço"); Prémio Nobel da Química 2019 (Goodenough, Whittingham, Yoshino).</td></tr>
          <tr><td><strong>Pilha de Combustível H₂/O₂</strong></td><td>~0,7 – 1,23 V</td><td>Contínua</td><td>Oxida H₂ no ânodo e reduz O₂ no cátodo; produz apenas água pura!</td></tr>
        </tbody>
      </table>
      <div class="callout">
        <strong>Prémio Nobel da Química 2019:</strong> As baterias de ião-lítio revolucionaram o mundo portátil porque não assentam na dissolução de placas pesadas, mas sim na <em>intercalação</em> limpa de iões Li⁺ entre lamelas de grafite e óxidos/fosfatos de metais de transição!
      </div>
    `,
    checkpoint: {
      q: 'Porque é que uma bateria automóvel clássica de chumbo-ácido fornece 12 V se cada célula Pb/PbO₂ tem apenas 2,0 V?',
      o: [
        'Porque contém internamente 6 células galvânicas ligadas em série (6 × 2,0 V = 12 V)',
        'Porque usa um transformador magnético de corrente alternada',
        'Porque multiplica o potencial usando água destilada'
      ],
      a: 0,
      exp: 'Ligar células eletroquímicas em série soma as respetivas forças eletromotrizes individuais.'
    }
  },
  {
    id: 'ambiente',
    num: '10',
    title: 'Corrosão, Proteção Catódica e Sustentabilidade',
    subtitle: 'Como evitar milhares de milhões de euros em perdas por ferrugem e reciclar metais críticos',
    readTime: '4 min',
    tag: 'Engenharia & Ambiente',
    html: `
      <p>Estima-se que a <strong>corrosão metálica</strong> custe cerca de 3% a 4% do PIB mundial todos os anos! A ferrugem do ferro num meio húmido arejado funciona exatamente como uma microscópica pilha em curto-circuito à superfície da peça:</p>
      <div class="formula-box">
        Zona Anódica:    Fe(s) → Fe²⁺(aq) + 2 e⁻
        <br/>Zona Catódica:   O₂(g) + 2 H₂O(l) + 4 e⁻ → 4 OH⁻(aq)
        <br/>Precipitação e oxidação posterior → Fe₂O₃ · x H₂O(s) (ferrugem porosa, não protetora!)
      </div>
      <h3>Estratégias Eletroquímicas de Combate à Corrosão</h3>
      <ul>
        <li><strong>Barreiras físicas:</strong> Pinturas epóxi, esmaltes, vernizes ou óleos (impedem o contacto com O₂ e H₂O).</li>
        <li><strong>Passivação e Anodização:</strong> Metais como o alumínio e o crómio (no aço inoxidável) formam espontaneamente uma película de óxido impermeável e autorregenerável (<code>Al₂O₃</code>, <code>Cr₂O₃</code>).</li>
        <li><strong>Proteção Catódica por Ânodo de Sacrifício:</strong> Ligar eletricamente o aço a blocos de <strong>Zinco</strong> ou <strong>Magnésio</strong> (menor E°). O bloco sacrifica-se oxidando-se e mantém o aço reduzido!</li>
        <li><strong>Proteção por Corrente Impressa:</strong> Usar um retificador DC ligado a um ânodo inerte para injetar eletrões continuamente em grandes gasodutos ou pontes.</li>
      </ul>
    `,
    checkpoint: {
      q: 'Porque é que a ferrugem do ferro não protege o metal subjacente, ao contrário do óxido de alumínio?',
      o: [
        'Porque a ferrugem (Fe₂O₃·xH₂O) é quebradiça, porosa e descama, deixando entrar continuamente água e oxigénio',
        'Porque a ferrugem é um gás volátil',
        'Porque o ferro tem E° superior ao do ouro'
      ],
      a: 0,
      exp: 'A camada de ferrugem expande e esfarela, expondo sempre ferro fresco à oxidação, enquanto o Al₂O₃ é compacto e aderente.'
    }
  },
  {
    id: 'erros',
    num: '11',
    title: 'Os 10 Erros Mais Comuns em Testes e Exames',
    subtitle: 'Armadilhas conceptuais desmascaradas para garantires o 20',
    readTime: '4 min',
    tag: 'Preparação 20 Valores',
    html: `
      <ol>
        <li><strong>"Os eletrões passam pela ponte salina":</strong> FALSO! Na solução e na ponte salina circulam <em>apenas iões</em>. Eletrões livres só viajam nos condutores metálicos.</li>
        <li><strong>"Multiplicar E° pelos coeficientes estequiométricos":</strong> FALSO! <code>E°</code> nunca se multiplica; <code>ΔG°</code> sim.</li>
        <li><strong>"O ânodo é sempre negativo":</strong> FALSO! Na eletrólise o ânodo é positivo (+). O que nunca muda é: <em>Ânodo = Oxidação</em>.</li>
        <li><strong>"Confundir a espécie oxidante com o elemento":</strong> Num par como <code>Ag⁺/Ag</code>, o oxidante é <code>Ag⁺(aq)</code> e NUNCA <code>Ag(s)</code> (a prata metálica não consegue ganhar mais eletrões!).</li>
        <li><strong>"Trocar o sentido convencional da corrente com o fluxo de eletrões":</strong> Os eletrões vão do polo (−) ao (+); a corrente convencional <code>I</code> vai do (+) ao (−).</li>
        <li><strong>"Esquecer a água na eletrólise aquosa":</strong> Na eletrólise de <code>NaCl(aq)</code> forma-se <code>H₂(g)</code> no cátodo, não sódio metálico!</li>
        <li><strong>"Achar que aumentar o tamanho da placa aumenta a voltagem":</strong> A área dos elétrodos aumenta a corrente máxima e a capacidade (Ah), mas não altera <code>E°</code>!</li>
        <li><strong>"Confundir E° = 0 V com pilha morta":</strong> Uma pilha de concentração tem <code>E° = 0 V</code> mas tem <code>E &gt; 0 V</code> enquanto as concentrações diferirem!</li>
        <li><strong>"Usar minutos em vez de segundos em Q = I · t":</strong> O ampere é coulomb por <em>segundo</em> (C/s) — converte sempre o tempo para segundos!</li>
        <li><strong>"Esquecer os sólidos puros em Q":</strong> Na equação de Nernst, sólidos puros (<code>Zn(s)</code>, <code>Cu(s)</code>) e líquidos puros têm atividade unitária (= 1) e não entram na fração de <code>Q</code>!</li>
      </ol>
    `,
    checkpoint: {
      q: 'Na expressão do quociente da reação Q para Zn(s) + 2 Ag⁺(aq) → Zn²⁺(aq) + 2 Ag(s), qual é a fórmula correta?',
      o: [
        'Q = [Zn²⁺] / [Ag⁺]²',
        'Q = ([Zn²⁺] · [Ag]²) / ([Zn] · [Ag⁺]²)',
        'Q = [Ag⁺] / [Zn²⁺]'
      ],
      a: 0,
      exp: 'Sólidos puros têm atividade 1 e os coeficientes estequiométricos passam a expoentes: Q = [Zn²⁺] / [Ag⁺]²!'
    }
  },
  {
    id: 'problemas',
    num: '12',
    title: 'Problemas Resolvidos Passo a Passo',
    subtitle: 'Três exercícios modelo completos prontos a explicar no quadro',
    readTime: '6 min',
    tag: 'Resolução Guiada',
    html: `
      <h3>Problema 1 — Pilha Galvânica e Energia de Gibbs</h3>
      <p><strong>Enunciado:</strong> Constrói-se uma pilha padrão com <code>Mg(s)/Mg²⁺(1 M)</code> (E° = −2,37 V) e <code>Cu(s)/Cu²⁺(1 M)</code> (E° = +0,34 V). Determina as semirreações, a notação IUPAC, <code>E°célula</code> e <code>ΔG°</code>.</p>
      <div class="formula-box">
        1. Como E°(Cu²⁺/Cu) &gt; E°(Mg²⁺/Mg), o cobre é o cátodo (+) e o magnésio é o ânodo (−).
        <br/>2. Ânodo: Mg(s) → Mg²⁺(aq) + 2 e⁻  |  Cátodo: Cu²⁺(aq) + 2 e⁻ → Cu(s)  (n = 2 mol e⁻)
        <br/>3. Notação IUPAC: Mg(s) | Mg²⁺(aq, 1 M) || Cu²⁺(aq, 1 M) | Cu(s)
        <br/>4. E°célula = +0,34 − (−2,37) = +2,71 V
        <br/>5. ΔG° = −n · F · E° = −2 × 96 485 × 2,71 ≈ −5,23 × 10⁵ J/mol = −523 kJ/mol (&lt; 0, muito espontânea!)
      </div>

      <h3>Problema 2 — Equação de Nernst fora do Padrão</h3>
      <p><strong>Enunciado:</strong> Calcula a força eletromotriz a 25 °C da célula <code>Fe(s) | Fe²⁺(0,20 M) || Ag⁺(0,010 M) | Ag(s)</code>. Dados: E°(Fe²⁺/Fe) = −0,44 V; E°(Ag⁺/Ag) = +0,80 V.</p>
      <div class="formula-box">
        1. Equação global: Fe(s) + 2 Ag⁺(aq) → Fe²⁺(aq) + 2 Ag(s)   ⇒   n = 2
        <br/>2. E°célula = +0,80 − (−0,44) = +1,24 V
        <br/>3. Q = [Fe²⁺] / [Ag⁺]² = 0,20 / (0,010)² = 0,20 / 10⁻⁴ = 2000
        <br/>4. E = 1,24 − (0,05916 / 2) × log₁₀(2000) = 1,24 − 0,02958 × 3,301 ≈ 1,24 − 0,098 = +1,14 V
      </div>

      <h3>Problema 3 — Eletrólise Industrial (Cromagem)</h3>
      <p><strong>Enunciado:</strong> Para cromar um para-choques a partir de uma solução de Cr³⁺(aq) faz-se passar uma corrente constante de <code>15,0 A</code> durante <code>40,0 minutos</code>. Qual a massa máxima de crómio depositada? (M(Cr) = 52,0 g/mol; F = 96 485 C/mol).</p>
      <div class="formula-box">
        1. Converter tempo para segundos: t = 40,0 × 60 = 2400 s
        <br/>2. Carga elétrica total: Q = I · t = 15,0 × 2400 = 36 000 C
        <br/>3. Moles de eletrões: n(e⁻) = 36 000 / 96 485 = 0,3731 mol e⁻
        <br/>4. Semirreação catódica: Cr³⁺(aq) + 3 e⁻ → Cr(s)  ⇒  z = 3
        <br/>5. n(Cr) = 0,3731 / 3 = 0,1244 mol  ⇒  m(Cr) = 0,1244 × 52,0 = 6,47 g de Cr(s)
      </div>
    `,
    checkpoint: {
      q: 'No Problema 3, se a corrente duplicasse para 30,0 A mantendo os mesmos 40,0 minutos, que massa de crómio se depositaria?',
      o: [
        'O dobro: 12,9 g de Cr(s)',
        'Metade: 3,24 g de Cr(s)',
        'Exatamente a mesma massa: 6,47 g'
      ],
      a: 0,
      exp: 'Pela 1.ª Lei de Faraday, a massa depositada é diretamente proporcional à carga Q = I·t; duplicar I duplica m!'
    }
  }
];

CZ.CODEX = CZ.CODEX_LIST;
CZ.CODEX_BY_ID = Object.fromEntries(CZ.CODEX_LIST.map(c => [c.id, c]));
