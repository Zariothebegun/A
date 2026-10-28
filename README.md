# CÉLULA ZERO — Protocolo Eletroquímico 2087

Site-jogo interativo, imersivo e totalmente em **português de Portugal (PT-PT)** sobre **células químicas / eletroquímica**, criado para uma apresentação escolar de excelência (**nota 20**) — sem slides, sem instalações e sem dependências externas em tempo de execução.

> Em 2087, a entidade entrópica **O Corrosor** infetou a Célula Mestra. O jogador repara seis módulos científicos, usa um simulador eletroquímico em tempo real e enfrenta o boss final para restaurar a corrente.

---

## Abrir o projeto

### Opção recomendada — GitHub Pages

Depois de ativado nas definições do repositório, o site fica disponível em:

**https://zariothebegun.github.io/A/**

Basta abrir o endereço em qualquer navegador moderno (Chrome, Edge, Firefox ou Safari).

### Opção offline / pen USB / OneDrive

1. Descarrega ou sincroniza a pasta completa do repositório.
2. Abre o ficheiro **`index.html`** no navegador.
3. Não é necessário servidor, administrador, instalação nem ligação à internet — as fontes tipográficas estão incluídas localmente na pasta `fonts/`.

---

## O que explorar

| Rota | Experiência |
|---|---|
| `#/` | Intro cinematográfica 2087 com reator animado e telemetria |
| `#/hub` | Mapa de missões e integridade da Célula Mestra |
| `#/mission/m1` | **Módulo 01 — Anatomia da Célula:** 7 componentes interativos da Pilha de Daniell |
| `#/mission/m2` | **Módulo 02 — Caça-Eletrões:** jogo arcade Verdadeiro/Falso com timer, vidas e combo |
| `#/mission/m3` | **Módulo 03 — Engenharia de Pilhas:** 4 contratos no simulador |
| `#/mission/m4` | **Módulo 04 — Radar de Reações:** espontaneidade, ΔE° e ΔG° |
| `#/mission/m5` | **Módulo 05 — Câmara de Validação:** quiz de 10 perguntas sorteadas de um banco de 40, com 3 power-ups |
| `#/mission/m6` | **Módulo 06 — Boss Final: O Corrosor:** duelo em 3 fases |
| `#/lab` | Simulador livre com 10 semicélulas, Nernst, temperatura, ponte salina e eletrólise |
| `#/codex` | Arquivo Científico com 12 capítulos, checkpoints e calculadoras |
| `#/glossary` | Glossário pesquisável com 30 termos |
| `#/profile` | Perfil, XP, níveis, 12 distintivos e certificado imprimível |

### Conteúdo científico incluído

- Oxidação, redução, agentes oxidante/redutor e número de oxidação;
- Pilha de Daniell, semirreações, balanço de massa/cor e notação IUPAC;
- Potenciais padrão de redução E°, Elétrodo Padrão de Hidrogénio e série eletroquímica;
- Ponte salina e eletroneutralidade;
- Relação ΔG° = −nFE° e espontaneidade;
- Equação de Nernst, concentração, temperatura, pH e pilhas de concentração;
- Eletrólise ígnea/aquosa, competição de descarga, galvanoplastia e afinação do cobre;
- Leis de Faraday com cálculos de massa, carga e tempo;
- Baterias alcalinas, chumbo-ácido, ião-lítio e pilhas de combustível;
- Corrosão, proteção catódica, ânodos de sacrifício e passivação;
- 10 erros frequentes em testes/exames e 3 problemas resolvidos passo a passo;
- Banco de 40 perguntas de quiz + 16 perguntas de boss, todas com explicação.

---

## Guião rápido de apresentação (8–12 minutos)

Também disponível dentro do site no botão **“Guião 20”**.

1. **0–1 min — Intro (`#/`):** apresenta o problema: como transformar uma reação redox espontânea em corrente elétrica útil?
2. **1–3 min — Módulo 01 (`#/mission/m1`):** clica no ânodo de zinco, cátodo de cobre, fio externo e ponte salina. Sublinha: **eletrões pelo fio; iões pela ponte salina**.
3. **3–6 min — Simulador (`#/lab`):**
   - começa em Zn/Cu = **+1,10 V**;
   - retira a ponte salina ao vivo → **0,00 V**;
   - muda para Li/Au = **+4,54 V**;
   - altera concentrações para mostrar **Nernst**;
   - ativa **Eletrólise** e mostra a inversão dos sinais (+/−), mantendo ânodo = oxidação.
4. **6–8 min — Arquivo (`#/codex/eletrolise` e `#/codex/ambiente`):** demonstra Faraday e proteção catódica com ânodo de sacrifício.
5. **8–11 min — Interação com a turma:** Caça-Eletrões (`#/mission/m2`) ou Boss Final (`#/mission/m6`), convidando colegas/professor a responder.
6. **Fecho:** mostra progresso no Hub, distintivos e certificado em `#/profile`.

### Atalhos úteis ao vivo

- **Tecla E** — expandir/recolher o diagrama da célula em ecrã inteiro;
- **Teclas 1–4** — responder no quiz/boss;
- **V / F ou ← / →** — Verdadeiro/Falso no Caça-Eletrões;
- **Enter / Espaço** — avançar após feedback;
- **Esc** — fechar janelas modais;
- **Perfil → “Modo Apresentação (100%)”** — desbloqueia tudo num computador novo da escola antes da aula, se precisares de mostrar o estado final/certificado.

---

## Estrutura técnica

```text
.
├── index.html       # shell, HUD, sprite SVG, boot e ordem dos scripts
├── fonts.css        # @font-face locais (Space Grotesk, Inter, JetBrains Mono)
├── fonts/           # ficheiros WOFF2 variáveis, offline
├── styles.css       # sistema visual, intro, hub, perfil, certificado e impressão
├── game.css         # missões, célula, laboratório, radar, quiz, boss e Arquivo
├── data.js          # metais/E°, missões, quiz (40), boss (16), glossário (30)
├── codex-data.js    # 12 capítulos científicos e checkpoints
├── core.js          # estado/XP, som WebAudio, router, WebGL, partículas e FX
├── cell.js          # diagrama SVG animado da célula eletroquímica
├── screens.js       # intro, hub, glossário, perfil e certificado
├── codex.js         # leitor do Arquivo, leitura em voz alta e calculadoras
├── missions.js      # simulador livre e missões 1–6
└── init.js          # sequência de arranque e ligações globais
```

- **Sem bibliotecas externas em runtime** e sem pedidos de rede obrigatórios.
- Fundo com **shader WebGL** de plasma iridescente, partículas iónicas em canvas, som sintetizado por **WebAudio** e animações físicas dos eletrões/iões.
- Progresso guardado no navegador com `localStorage` (XP, missões, distintivos, capítulos e caderno de laboratório).
- Ordem obrigatória dos scripts: `data.js → codex-data.js → core.js → cell.js → screens.js → codex.js → missions.js → init.js`.

---

## Publicar/atualizar no GitHub Pages

O repositório está preparado para publicação estática a partir da raiz (`index.html` na raiz e ficheiro `.nojekyll`).

1. Faz commit e push das alterações para o GitHub.
2. No repositório, abre **Settings → Pages**.
3. Em **Build and deployment**, escolhe **Deploy from a branch**.
4. Seleciona a branch publicada e a pasta **`/ (root)`**, depois **Save**.
5. Aguarda a mensagem de deployment e abre **https://zariothebegun.github.io/A/**.

Se o endereço devolver 404 nos primeiros minutos, aguarda a conclusão do deployment em **Actions** e atualiza a página.

---

## Resolução rápida de problemas

- **Abriu e ficou no ecrã de arranque:** clica em “Saltar arranque →”.
- **Sem som:** o áudio só começa após interação do utilizador; verifica o botão de som no canto superior direito.
- **Progresso de outro aluno no mesmo PC:** vai a `#/profile` → “Repor Progresso a Zero”.
- **Precisas de mostrar tudo concluído:** `#/profile` → “Modo Apresentação (100%)”.
- **Certificado:** `#/profile` → personaliza nome/escola/turma → “Ver / Imprimir Certificado”.
