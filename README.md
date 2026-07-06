<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/OpenCode-Configs-6C47FF?style=for-the-badge&logo=codeium&logoColor=white&labelColor=1a1a2e">
    <img alt="OpenCode Configs" src="https://img.shields.io/badge/OpenCode-Configs-6C47FF?style=for-the-badge&logo=codeium&logoColor=white&labelColor=f0f0ff">
  </picture>
</p>

<p align="center">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Luisarg03/MyOpencodeConfigs?style=flat-square&color=6C47FF">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/Luisarg03/MyOpencodeConfigs?style=flat-square&color=FF6B6B">
  <img alt="Static Badge" src="https://img.shields.io/badge/297-files-4ECDC4?style=flat-square">
  <img alt="plugins" src="https://img.shields.io/badge/8-plugins-45B7D1?style=flat-square">
  <img alt="skills" src="https://img.shields.io/badge/19-skills-96CEB4?style=flat-square">
  <img alt="agents" src="https://img.shields.io/badge/2-custom_agents-FFEAA7?style=flat-square">
</p>

<h1 align="center">🎛️ My OpenCode Configs</h1>

<p align="center">
  <em>Configuración personal de OpenCode — orquestación multi-agente, plugins, skills, comandos y prompts para un flujo de desarrollo asistido por IA optimizado, paralelo y consistente.</em>
</p>

---

## 📋 Tabla de Contenidos

- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Flujo de Trabajo con Agentes](#-flujo-de-trabajo-con-agentes)
- [Pipeline de Planeación](#-pipeline-de-planeación)
- [Decisiones Arquitectónicas](#-decisiones-arquitectónicas)
- [Flujo de Procesamiento de una Solicitud](#-flujo-de-procesamiento-de-una-solicitud)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Componentes](#-componentes)
- [Comandos](#-comandos)
- [Plugins](#-plugins)
- [Skills](#-skills)
- [Modelo de Delegación](#-modelo-de-delegación-6-capas)
- [Instalación y Uso](#-instalación-y-uso)
- [Diagrama de Contexto de la Sesión](#-diagrama-de-contexto-de-la-sesión)
- [Filosofía de Diseño](#-filosofía-de-diseño)
- [Roadmap](#-roadmap--próximos-pasos)

---

## 🏗️ Arquitectura del Sistema

```mermaid
graph TB
    classDef config fill:#EEEAFF,stroke:#6C47FF,stroke-width:2px,color:#4A2DBF
    classDef plugin fill:#E8F4F8,stroke:#45B7D1,stroke-width:2px,color:#1a1a2e
    classDef agent fill:#FFF8E0,stroke:#D4A017,stroke-width:2px,color:#1a1a2e
    classDef skill fill:#E8F5EE,stroke:#5BA87A,stroke-width:2px,color:#1a1a2e
    classDef command fill:#FFE8E8,stroke:#D14545,stroke-width:2px,color:#1a1a2e

    subgraph Config["📁 Config Layer"]
        OC[opencode.jsonc<br/>Config principal]
        OH[oh-my-opencode-slim.json<br/>Preset de agentes]
        AG[AGENTS.md<br/>Instrucciones globales]
        DC[dcp.jsonc<br/>Context pruning]
        TUI[tui.json<br/>UI config]
    end

    subgraph Plugins["🔌 Plugin Layer"]
        DP[delegation.ts<br/>6-capas: tracking, block,<br/>auto-allow, prompts,<br/>hints, reminders]
        SL[skill-loader.ts<br/>Auto-carga skills<br/>por tipo de agente]
        PT[ponytail.mjs<br/>Modo lazy dev<br/>persistente]
        PR[principles.ts<br/>DRY/KISS/YAGNI<br/>en system prompt]
        VC[validation.ts<br/>Python lint+typecheck<br/>automático]
        RT[rtk.ts<br/>Optimización de<br/>comandos bash]
        SK[strip-cache-key.ts<br/>Compatibilidad<br/>de providers]
        CV[caveman/<br/>plugin.js]
        DR[documenter.ts<br/>Skills documentación]
        RF[refactor.ts<br/>Skills refactoring]
    end

    subgraph Agents["🤖 Agent Layer"]
        ORQ[Orchestrator<br/>Router principal<br/>write:deny / edit:deny]
        FX[fixer<br/>Implementación<br/>rápida]
        DG[designer<br/>UI/UX]
        EX[explorer<br/>Búsqueda código]
        LB[librarian<br/>Research docs]
        OR[oracle<br/>Arquitectura]
        DV[documenter<br/>Documentación]
        RF2[refactor<br/>Refactoring]
    end

    subgraph Skills["🧠 Skill Layer<br/>19 skills total"]
        SK1[codemap<br/>simplify<br/>pdf]
        SK2[frontend-design<br/>design-system<br/>ui-ux-pro-max<br/>+5 más]
        SK3[fixer-code-standards<br/>oracle-decision-lens]
        SK4[documentation-writer<br/>design-doc-mermaid<br/>doc-coauthoring]
    end

    subgraph Commands["⚡ Command Layer"]
        PM[ponytail<br/>Lazy mode]
        CM[caveman<br/>Modo cavernícola]
    end

    Config -->|carga| Plugins
    Plugins -->|inyecta| Agents
    Agents -->|usa| Skills
    Commands -->|modifica| Agents

    class OC,OH,AG,DC,TUI config
    class DP,SL,PT,PR,VC,RT,SK,CV,DR,RF plugin
    class ORQ,FX,DG,EX,LB,OR,DV,RF2 agent
    class SK1,SK2,SK3,SK4 skill
    class PM,CM command
```

---

## 🔄 Flujo de Trabajo con Agentes

```mermaid
sequenceDiagram
    autonumber
    participant U as 👤 Usuario
    participant O as 🧠 Orchestrator
    participant E as 🔍 Explorer
    participant L as 📚 Librarian
    participant R as 🏛️ Oracle
    participant D as 🎨 Designer
    participant F as ⚡ Fixer
    participant V as ✅ Validation

    U->>O: Solicitud (feature, bug, refactor)
    
    rect rgb(246, 244, 255)
        Note over O: Fase 0 — Problem Framing
        O->>O: Analiza tipo de problema<br/>restricciones, escala<br/>revisa codemap
    end

    alt Patrón existente en codemap
        O->>F: Implementación directa
    else Problema nuevo
        rect rgb(244, 251, 252)
            O->>E: Búsqueda paralela<br/>(glob, grep, AST)
            E-->>O: Archivos relevantes
        end
        
        par Librarian Research
            O->>L: Investigar patrones<br/>de la industria
            L-->>O: 2-4 opciones con tradeoffs
        and Explorer scan
            O->>E: Escaneo de código<br/>relacionado
            E-->>O: Contexto del codebase
        end

        rect rgb(255, 246, 246)
            Note over O,R: Fase 2 — Architecture Decision
            O->>R: Evaluar opciones vs<br/>restricciones reales
            R-->>O: Decisión + archivo<br/>en decisions/
        end
    end

    rect rgb(244, 252, 251)
        Note over O,F: Gate de Implementación
        O->>F: Implementar solución
    end

    alt Involucra UI
        F->>D: Diseñar componentes
        D-->>F: UI implementada
    end

    F->>V: Validación automática<br/>(linter + typecheck + test)
    V-->>F: Resultados

    alt Validación falla
        F->>F: Corregir errores
        F->>V: Re-validar
    end

    F-->>O: Implementación completa
    O-->>U: Resultado verificado
```

---

## 📐 Pipeline de Planeación

```mermaid
flowchart LR
    classDef phase fill:#EEEAFF,stroke:#6C47FF,stroke-width:2px,color:#4A2DBF
    classDef research fill:#E8F4F8,stroke:#45B7D1,stroke-width:2px,color:#1a1a2e
    classDef decision fill:#FFE8E8,stroke:#D14545,stroke-width:2px,color:#1a1a2e
    classDef success fill:#E8F5EE,stroke:#5BA87A,stroke-width:2px,color:#1a1a2e
    classDef gate fill:#FFF8E0,stroke:#D4A017,stroke-width:2px,color:#1a1a2e

    Start(["📝 Solicitud"]) --> F0
    
    subgraph F0["Fase 0 — Problem Framing (Orquestador)"]
        direction TB
        T1["Tipo de problema<br/>CRUD / pipeline / integración / UI"]
        T2["Restricciones reales<br/>escala / latencia / mantenedor / vida útil"]
        T3["Consultar codemap<br/>¿patrón existente?"]
    end
    
    F0 --> Check{"¿Patrón<br/>previo<br/>aplicable?"}
    
    Check -->|"Sí ✅"| Direct["Saltar Fase 1 y 2<br/>→ Directo a Fixer"]
    Check -->|"No ❌"| F1
    
    subgraph F1["Fase 1 — Research (Librarian)"]
        direction TB
        R1["Brief con: problema + restricciones"]
        R2["Buscar prior art:<br/>foros / RFCs / blogs de ingeniería"]
        R3["Output: 2-4 opciones<br/>con tradeoffs explícitos"]
    end
    
    F1 --> F2
    
    subgraph F2["Fase 2 — Architecture Decision (Oracle)"]
        direction TB
        D1["Comparar opciones vs<br/>restricciones reales"]
        D2["Output obligatorio:<br/>decisions/YYYY-MM-DD-slug.md"]
        D3["Contenido: Problem, Options,<br/>Decision + rationale, Rejected"]
    end
    
    F2 --> Gate{"Gate de<br/>Implementación"}
    
    Gate -->|"Archivo decisión OK ✅"| Impl["→ Fixer implementa"]
    Gate -->|"Sin archivo ❌"| Block["BLOQUEADO<br/>Crear decisión primero"]
    
    Direct --> Impl
    
    Impl --> End(["✅ Hecho"])

    class F0 phase
    class T1,T2,T3 phase
    class F1 research
    class R1,R2,R3 research
    class F2 decision
    class D1,D2,D3 decision
    class Direct,Impl,End success
    class Check,Gate gate
    class Block gate
```

---

## 📋 Decisiones Arquitectónicas

El directorio `decisions/` es el repositorio de registros de decisión arquitectónica (ADR). Cada vez que el **Pipeline de Planeación** detecta un problema sin patrón previo, el flujo documenta la decisión en un archivo con marca de tiempo.

Este archivo no solo justifica *qué* se decidió, sino *por qué* — atado a las restricciones reales del proyecto, no a preferencias abstractas.

```mermaid
flowchart TB
    classDef trigger fill:#FFF8E0,stroke:#D4A017,stroke-width:2px,color:#1a1a2e
    classDef process fill:#E8F4F8,stroke:#45B7D1,stroke-width:2px,color:#1a1a2e
    classDef artifact fill:#EEEAFF,stroke:#6C47FF,stroke-width:2px,color:#4A2DBF
    classDef gate fill:#FFE8E8,stroke:#D14545,stroke-width:2px,color:#1a1a2e
    classDef success fill:#E8F5EE,stroke:#5BA87A,stroke-width:2px,color:#1a1a2e

    Problem["🔍 Problema sin<br/>patrón conocido"] --> F0["🧠 Fase 0<br/>Problem Framing"]
    F0 --> Research["📚 Fase 1<br/>Research (Librarian)"]
    Research --> AD["🏛️ Fase 2<br/>Architecture Decision (Oracle)"]
    AD --> File["📄 decisions/<br/>YYYY-MM-DD-slug.md"]
    File --> Valid{"🔒 Gate:<br/>¿Archivo OK?"}
    Valid -->|"✅ Sí"| Impl["⚡ Implementación (Fixer)"]
    Valid -.->|"❌ No — revisar"| AD
    
    subgraph Structure["Estructura del archivo ADR"]
        direction TB
        S1["Problem (1-2 líneas)"]
        S2["Options considered"]
        S3["Decision + rationale"]
        S4["Rejected + why"]
    end
    
    File -.->|"contiene"| Structure

    class Problem trigger
    class F0,Research,AD process
    class File,Structure,S1,S2,S3,S4 artifact
    class Valid gate
    class Impl success
```

> **Regla:** `@fixer` no puede implementar una feature no-trivial sin un archivo de decisión correspondiente. Si el archivo existe pero es más viejo que cambios en el codemap del módulo afectado, la decisión debe revisarse.

---

## ⚙️ Flujo de Procesamiento de una Solicitud

```mermaid
flowchart TB
    classDef orchestrator fill:#6C47FF,color:#fff,stroke-width:2px
    classDef fixer fill:#4ECDC4,color:#fff,stroke-width:2px
    classDef explorer fill:#45B7D1,color:#fff,stroke-width:2px
    classDef librarian fill:#96CEB4,color:#fff,stroke-width:2px
    classDef designer fill:#FF6B6B,color:#fff,stroke-width:2px
    classDef oracle fill:#FFEAA7,color:#1a1a2e,stroke-width:2px
    classDef verification fill:#1a1a2e,color:#fff,stroke-width:2px
    classDef data fill:#4ECDC4,color:#fff,stroke-width:2px

    User(["👤 Usuario"]) -->|"1. Prompt"| O["🧠 Orchestrator"]
    
    O -->|"2. Analiza"| D{"3. ¿Delegar?"}
    
    D -->|"Write/edit archivos"| FX["⚡ Fixer<br/>2x más rápido<br/>1/2 costo"]
    D -->|"Búsqueda 3+ archivos"| EX["🔍 Explorer<br/>10x más barato<br/>parallel"]
    D -->|"Research docs/APIs"| LB["📚 Librarian<br/>10x más barato"]
    D -->|"UI/UX"| DG["🎨 Designer<br/>Gratis"]
    D -->|"Arquitectura"| OR["🏛️ Oracle<br/>Mismo costo"]
    D -->|"Git / 1 read / pequeño"| O
    
    FX -->|"4a. Skill auto-load"| Skills["🧠 Skills"]
    EX -->|"4b. Glob/Grep/AST"| Files["📁 Codebase"]
    LB -->|"4c. Web research"| Web["🌐 Web/Docs"]
    
    subgraph Verification["✅ Verification Pipeline"]
        V1["Linter (Flake8/Ruff)"]
        V2["Typecheck"]
        V3["Unit tests"]
        V4["Truth verification"]
    end
    
    FX -.->|"Auto-trigger"| Verification
    DG -->|"UI review"| Verification
    
    Verification -->|"PASS ✅"| Final["Resultado verificado"]
    Verification -->|"FAIL ❌"| FX
    
    FX -->|"5. Resultado"| O
    O -->|"6. Respuesta"| User

    class O orchestrator
    class FX fixer
    class EX explorer
    class LB librarian
    class DG designer
    class OR oracle
    class Verification verification
    class V1,V2,V3,V4 verification
    class Skills,Files,Web data
    class Final success
```

---

## 📁 Estructura del Proyecto

```
MyOpencodeConfigs/
├── 📄 opencode.jsonc            # Config principal — plugins, agentes, MCPs, permisos
├── 📄 oh-my-opencode-slim.json  # Preset de agentes — modelos, skills, MCPs
├── 📄 AGENTS.md                 # Instrucciones globales para todos los agentes
├── 📄 dcp.jsonc                 # Dynamic Context Pruning — gestión de contexto
├── 📄 tui.json                  # Configuración de UI
├── 📄 package.json              # Dependencia @opencode-ai/plugin
│
├── 🤖 agents/                   # Definiciones de agentes personalizados
│   ├── documenter.md
│   └── refactor.md
│
├── ⚡ commands/                 # Comandos slash (/caveman, /ponytail, ...)
│   ├── caveman.md
│   ├── caveman-commit.md
│   ├── caveman-review.md
│   ├── ponytail.md
│   ├── ponytail-review.md
│   ├── ponytail-audit.md
│   ├── ponytail-debt.md
│   └── ponytail-help.md
│
├── 🔌 plugins/                  # Plugins OpenCode (TypeScript/ESM)
│   ├── delegation.ts           # 6 capas de orquestación + circuit breaker
│   ├── skill-loader.ts         # Auto-carga de skills por agente
│   ├── ponytail.mjs            # Persistencia del modo lazy
│   ├── principles.ts           # Inyección DRY/KISS/YAGNI
│   ├── validation.ts           # Validación automática Python
│   ├── rtk.ts                  # Optimización de comandos bash
│   ├── strip-cache-key.ts      # Compatibilidad con providers
│   ├── documenter.ts           # Skills de documentación
│   ├── refactor.ts             # Skills de refactoring
│   └── caveman/                # Plugin modo cavernícola
│
├── 💬 prompts/                  # Prompts reutilizables
│   ├── build.md
│   ├── validate-code.md
│   └── verify-truth.md
│
├── 🧠 skills/                   # 19 skills especializados
│   ├── codemap/                # Mapas de código
│   ├── simplify/               # Simplificación de código
│   ├── pdf/                    # Procesamiento PDF
│   ├── refactor/               # Refactoring quirúrgico
│   ├── design-doc-mermaid/     # Diagramas Mermaid
│   ├── documentation-writer/   # Documentación Diátaxis
│   ├── frontend-design/        # Diseño frontend
│   ├── design-system/          # Sistemas de diseño
│   ├── design/                 # Diseño general
│   ├── banner-design/          # Banners
│   ├── brand/                  # Branding
│   ├── slides/                 # Presentaciones
│   ├── ui-styling/             # Estilos UI
│   ├── ui-ux-pro-max/          # UX avanzado
│   ├── webapp-testing/         # Testing web
│   ├── xlsx/                   # Excel/Spreadsheets
│   ├── doc-coauthoring/        # Coautoría docs
│   └── oracle-decision-lens/   # Decisiones arquitectura
│
├── 📜 scripts/                  # Scripts auxiliares
│   ├── opencode-slim-patched-dist.mjs
│   └── patch-plugin.mjs
│
└── 📋 decisions/                # Archivos de decisión arquitectónica (ADR)
```

---

## 🧩 Componentes

### 🤖 Agentes

| Agente | Modelo(s) | Skills | Costo | Rol |
|--------|-----------|--------|-------|-----|
| **Orchestrator** | `deepseek-v4-flash-free` | codemap, pdf, simplify | — | Router principal. Analiza, delega, verifica. |
| **Fixer** | `deepseek-v4-flash-free` | fixer-code-standards, codemap, simplify | ½ costo | Implementación rápida, writes/edits. |
| **Explorer** | `deepseek-v4-flash-free` | — | ¹⁄₁₀ costo | Búsqueda de código (glob, grep, AST). |
| **Librarian** | `deepseek-v4-flash-free` | — | ¹⁄₁₀ costo | Research de documentación y APIs. |
| **Designer** | `mimo-v2.5-free` → `deepseek-v4-flash-free` | frontend-design, banner-design, brand, design, design-system, slides, ui-styling, ui-ux-pro-max | **Gratis** | UI/UX, componentes visuales. |
| **Oracle** | `nemotron-3-ultra-free` → `deepseek-v4-flash-free` | simplify, oracle-decision-lens | Mismo | Arquitectura, decisiones, code review. |
| **Documenter** | `deepseek-v4-flash-free` | simplify, doc-coauthoring, documentation-writer, design-doc-mermaid, pdf | — | Documentación técnica. |
| **Validator** | `deepseek-v4-flash-free` | codemap, simplify | — | Verificación de verdad (anti-hallucination). |
| **Observer** | `mimo-v2.5-free` → `deepseek-v4-flash-free` | — | — | Observabilidad. |

### 🔌 Plugins y Hooks

Cada plugin se conecta a uno o más hooks del ciclo de vida de OpenCode. El diagrama siguiente muestra cómo los plugins intervienen en cada etapa de la ejecución:

```mermaid
flowchart TB
    classDef stage fill:#EEEAFF,stroke:#6C47FF,stroke-width:1px,color:#4A2DBF
    classDef plugin fill:#E8F4F8,stroke:#45B7D1,stroke-width:1px,color:#1a1a2e

    H1["event<br/><i>session starts</i>"]
    H2["chat.params<br/><i>before request</i>"]
    H3["system.transform<br/><i>build prompt</i>"]
    H4["tool.execute.before<br/><i>before tool runs</i>"]
    H5["permission.ask<br/><i>confirm action</i>"]
    H6["tool.execute.after<br/><i>after tool runs</i>"]
    H7["command.execute<br/><i>slash commands</i>"]

    H1 --> H2 --> H3 --> H4 --> H5 --> H6 --> H7

    P1["delegation.ts"] --- H1
    P2["strip-cache-key.ts"] --- H2
    P2b["delegation.ts"] --- H2
    P3["principles.ts"] --- H3
    P3b["ponytail.mjs"] --- H3
    P3c["documenter.ts"] --- H3
    P3d["refactor.ts"] --- H3
    P3e["delegation.ts"] --- H3
    P4["delegation.ts"] --- H4
    P4b["skill-loader.ts"] --- H4
    P4c["rtk.ts"] --- H4
    P5["delegation.ts"] --- H5
    P5b["documenter.ts"] --- H5
    P6["delegation.ts"] --- H6
    P6b["validation.ts"] --- H6
    P7["ponytail.mjs"] --- H7
    P7b["refactor.ts"] --- H7
    P7c["caveman"] --- H7

    class H1,H2,H3,H4,H5,H6,H7 stage
    class P1,P2,P2b,P3,P3b,P3c,P3d,P3e,P4,P4b,P4c,P5,P5b,P6,P6b,P7,P7b,P7c plugin
```

### 🔌 Tabla de Plugins

| Plugin | Hooks | Función |
|--------|-------|---------|
| **delegation** | 7 hooks | Orquestación multi-agente: tracking de sesiones, bloqueo de re-delegación, auto-allow bash, system prompts, hints, reminders + circuit breaker |
| **skill-loader** | `tool.execute.before` | Lee `oh-my-opencode-slim.json` y auto-carga skills en el prompt del subagente |
| **ponytail** | `system.transform`, `command.execute` | Inyecta y persiste el modo lazy senior dev (`/ponytail lite\|full\|ultra\|off`) |
| **principles** | `system.transform` | Inyecta DRY/KISS/YAGNI + Consistencia en el prompt de TODOS los agentes |
| **validation** | `tool.execute.after` | Valida automáticamente archivos `.py` (syntax + ruff/flake8) tras write/edit |
| **rtk** | `tool.execute.before` | Reescribe comandos bash con `rtk` para ahorrar tokens |
| **strip-cache-key** | `chat.params` | Elimina `promptCacheKey` para compatibilidad con providers estrictos |
| **documenter** | `system.transform`, `permission.ask` | Inyecta skills de documentación y restringe writes a archivos .md/.mmd |
| **refactor** | `system.transform`, `command.execute` | Inyecta skill de refactoring al detectar `@refactor` |
| **caveman** | `command.execute` | Modo cavernícola — respuestas ultra-tersas |

### ⚡ Comandos (Slash)

| Comando | Descripción |
|---------|-------------|
| `/caveman [level]` | Activa modo cavernícola — respuestas ultra-tersas |
| `/caveman-commit` | Genera mensaje de commit estilo caveman (Conventional Commits) |
| `/caveman-review` | Code review estilo caveman — una línea por hallazgo |
| `/ponytail [level]` | Activa modo lazy senior dev (lite/full/ultra/off) |
| `/ponytail-review` | Review de over-engineering — qué se puede borrar |
| `/ponytail-audit` | Auditoría de deuda técnica |
| `/ponytail-debt` | Reporte de deuda técnica |
| `/ponytail-help` | Ayuda del modo ponytail |

---

## 🏛️ Modelo de Delegación (6 Capas)

El plugin `delegation.ts` implementa un sistema de 6 capas para garantizar que la orquestación sea eficiente, económica y libre de loops:

```mermaid
flowchart LR
    classDef tracking fill:#EEEAFF,stroke:#6C47FF,stroke-width:2px,color:#4A2DBF
    classDef block fill:#FFE8E8,stroke:#D14545,stroke-width:2px,color:#1a1a2e
    classDef auto fill:#E8F5EE,stroke:#5BA87A,stroke-width:2px,color:#1a1a2e
    classDef prompt fill:#E8F4F8,stroke:#45B7D1,stroke-width:2px,color:#1a1a2e
    classDef hint fill:#FFF8E0,stroke:#D4A017,stroke-width:2px,color:#1a1a2e
    classDef breaker fill:#FFE8E8,stroke:#D14545,stroke-width:2px,color:#1a1a2e

    subgraph L1["1a: Event Tracking"]
        EV["event → session.created<br/>Rastrea padre→hijo"]
    end
    subgraph L1b["1b: Agent Tracking"]
        CM["chat.message → sessionID→agent name"]
    end
    subgraph L2["2: HARD BLOCK 🚫"]
        TB["tool.execute.before<br/>Sabotea args de task/subtask<br/>para subagentes"]
    end
    subgraph L3["3: Auto-Allow"]
        PA["permission.ask → bash<br/>Prevents headless hangs"]
    end
    subgraph L4["4: System Prompts"]
        ST["system.transform →<br/>reglas de delegación en XML"]
    end
    subgraph L5["5: Tool Hints"]
        TD["tool.definition →<br/>hints de delegación en descripciones"]
    end
    subgraph L6["6: Reminders + Breaker"]
        TA["tool.execute.after →<br/>reminders post-hoc +<br/>circuit breaker de fixer"]
    end

    L1 --> L1b --> L2 --> L3 --> L4 --> L5 --> L6

    class L1,L1b tracking
    class L2 block
    class L3 auto
    class L4 prompt
    class L5 hint
    class L6 breaker
```

---

## 🚀 Instalación y Uso

### Prerrequisitos

- [OpenCode](https://opencode.ai) instalado
- Node.js ≥ 18

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Luisarg03/MyOpencodeConfigs.git
cd MyOpencodeConfigs

# Instalar dependencias
npm install
```

### Configuración

Este repo está diseñado para usarse como carpeta de config global de OpenCode en `~/.config/opencode/`, o bien referenciarse desde tu `opencode.jsonc`:

```jsonc
{
  "plugin": [
    "oh-my-opencode-slim",
    "./plugins/delegation.ts",
    "./plugins/skill-loader.ts",
    "./plugins/ponytail.mjs",
    "./plugins/principles.ts",
    "./plugins/validation.ts",
    "./plugins/rtk.ts",
    "./plugins/strip-cache-key.ts",
    "./plugins/documenter.ts",
    "./plugins/refactor.ts",
    "./plugins/caveman/plugin.js"
  ],
  "instructions": ["./AGENTS.md"]
}
```

### Variables de Entorno

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `CONTEXT7_API_KEY` | Solo para MCP Context7 | API key para el MCP opcional de Context7 |

### Comandos Rápidos

```bash
# Modo lazy (no escribas código que no hace falta)
/ponytail full

# Modo cavernícola (respuestas ultra-tersas)
/caveman

# Code review anti-overengineering
/ponytail-review

# Generar commit message
/caveman-commit
```

---

## 🧠 Filosofía de Diseño

Este proyecto sigue tres principios fundamentales, inyectados en el system prompt de todos los agentes vía `principles.ts`:

| Principio | Descripción |
|-----------|-------------|
| **DRY** | Cada pieza de conocimiento tiene una representación única. Código duplicado → extraer. |
| **KISS** | La solución más simple que funciona es la mejor. Claridad > ingenio. |
| **YAGNI** | No agregues funcionalidad hasta que sea estrictamente necesaria. Cada línea es un pasivo. |

Además, el modo **ponytail** (lazy senior dev) añade una escalera de 6 preguntas antes de escribir cualquier código:

1. ¿Esto necesita construirse? (YAGNI)
2. ¿La stdlib lo hace? Usarla.
3. ¿Una feature nativa de la plataforma lo cubre? Usarla.
4. ¿Una dependencia ya instalada lo resuelve? Usarla.
5. ¿Puede ser una línea? Hacerlo una línea.
6. Solo entonces: escribir el mínimo código que funciona.

---

## 📊 Diagrama de Contexto de la Sesión

```mermaid
flowchart TB
    classDef runtime fill:#EEEAFF,stroke:#6C47FF,stroke-width:2px,color:#4A2DBF
    classDef assembly fill:#E8F4F8,stroke:#45B7D1,stroke-width:2px,color:#1a1a2e
    classDef agent fill:#FFF8E0,stroke:#D4A017,stroke-width:2px,color:#1a1a2e
    classDef skill fill:#E8F5EE,stroke:#5BA87A,stroke-width:2px,color:#1a1a2e
    classDef prompt fill:#EEEAFF,stroke:#6C47FF,stroke-width:2px,color:#4A2DBF

    subgraph OpenCode["OpenCode Runtime"]
        direction TB
        Config["Config<br/>(opencode.jsonc)"] -->|"carga"| PluginEngine["Plugin Engine"]
        PluginEngine -->|"ejecuta hooks"| Session["Chat Session"]
        Session -->|"transforma"| SystemPrompt["System Prompt"]
    end
    
    subgraph PromptAssembly["Assembly del System Prompt"]
        direction TB
        AM["AGENTS.md<br/>(instrucciones base)"]
        DP["principles.ts<br/>(DRY/KISS/YAGNI)"]
        DL["delegation.ts<br/>(reglas orquestación)"]
        PT["ponytail.mjs<br/>(modo lazy)"]
        SK["skill-loader.ts<br/>(skills del agente)"]
        DC["dcp.jsonc<br/>(context pruning)"]
        
        AM -->|"unshift"| SP[("🧠 System Prompt<br/>Final")]
        DP -->|"push"| SP
        DL -->|"push"| SP
        PT -->|"unshift"| SP
        SK -->|"prepend"| PromptAgent["Prompt del Subagente"]
        DC -->|"monitorea"| SP
    end
    
    SystemPrompt -->|"construye"| PromptAssembly
    PromptAgent -->|"ejecuta"| Agent["Subagente"]
    Agent -->|"skills"| Skills["🧠 Skills"]

    class OpenCode,Config,PluginEngine,Session runtime
    class PromptAssembly,AM,DP,DL,PT,SK,DC assembly
    class SP prompt
    class PromptAgent,Agent agent
    class Skills skill
```

---

## 🛣️ Roadmap / Próximos Pasos

- [ ] Más skills especializados (testing, seguridad, DevOps)
- [ ] Integración con más MCPs externos
- [ ] Pipeline de CI/CD para validar configs
- [ ] Template de decisiones arquitectónicas pre-rellenado
- [ ] Dashboard de estadísticas de uso de agentes

---

<p align="center">
  <sub><strong>MyOpencodeConfigs</strong> · <a href="https://github.com/Luisarg03/MyOpencodeConfigs">github.com/Luisarg03/MyOpencodeConfigs</a> · Built with ❤️ for OpenCode</sub>
</p>
<p align="center">
  <sub>Documentación estructurada según <a href="https://diataxis.fr/">Diátaxis</a> (Tutorial · How-to · Reference · Explanation) · Diagramas con Mermaid</sub>
</p>
