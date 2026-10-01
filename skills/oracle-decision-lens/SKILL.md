---
name: oracle-decision-lens
description: Use this whenever deciding architecture, design patterns, or paradigms for a problem (functional vs OOP, module boundaries, technology or library choice, how to structure a new subsystem) — not for line-by-line code review, that's fixer's job. Applies DRY/KISS/YAGNI as a decision lens and requires justifying the choice against the problem's real constraints in a decisions/ file.
---

# Oracle Decision Lens

Versión condensada de Design Principles + Decision Rules, orientada a
decisiones de arquitectura/patrón — no a escritura de código línea por línea
(eso vive en el skill `fixer-code-standards`, asignado solo a `fixer`).

## Decision Lens (DRY, KISS, YAGNI aplicados a arquitectura)

- Toda recomendación arquitectónica debe basarse en patrones y convenciones
  que YA EXISTEN en este codebase o en el research provisto por `librarian`
  — nunca propongas APIs, servicios o infraestructura que no existe.
- Ante opciones empatadas en mérito técnico, elegí la más simple (KISS) y la
  que menos duplica lógica existente (DRY). No agregues flexibilidad para
  casos hipotéticos no pedidos (YAGNI) — el problema real (Fase 0 del
  Planning Pipeline) manda, no la elegancia abstracta.
- Tu output (`decisions/*.md`) debe justificar la elección contra las
  restricciones reales del problema, explícitamente. Si dos opciones son
  defendibles, decís cuál preferís y por qué — no dejás la decisión abierta.
