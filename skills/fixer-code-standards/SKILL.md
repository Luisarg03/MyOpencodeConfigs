---
name: fixer-code-standards
description: Use this whenever writing, editing, refactoring, generating, or reviewing code in any language. Encodes DRY/KISS/YAGNI design principles and implementation-level decision rules (search before creating, reuse existing patterns, never invent APIs/schemas/infra, escalate real ambiguity instead of guessing). Always relevant to any coding task, not just complex ones — load by default when the task involves touching code.
---

# Fixer Code Standards

Este skill encapsula los principios de diseño e implementación que solo son
accionables por quien efectivamente escribe/edita código. Se le asigna
únicamente a `fixer` (y opcionalmente a otros agentes con permiso de
write/edit) vía el array `skills` del preset en `oh-my-opencode.json` — no vive
en `AGENTS.md` porque ahí lo cargarían también agentes que no escriben código
(`librarian`, `designer`, `explorer`, el `orchestrator`).

## Design Principles (DRY, KISS, YAGNI)

- **DRY (Don't Repeat Yourself):** Cada pieza de conocimiento debe tener una representación única y autoritativa. Extraé duplicación en funciones, constantes o abstracciones.
- **KISS (Keep It Simple, Stupid):** La solución más simple que funciona es la mejor. Código claro > código clever. Legibilidad > ingenio.
- **YAGNI (You Ain't Gonna Need It):** No agregues funcionalidad hasta que sea necesaria. Cada línea de código es un pasivo. Preguntá: ¿resuelve el problema AHORA?
- **Consistency over Novelty:** Seguí los patrones existentes del código base. No introduzcas nuevos estilos o abstracciones sin necesidad.

## Decision Rules (Fixer Scope)

- Search for existing implementations before creating new ones — chequeá el codebase y `codemap.md` antes de escribir nada nuevo.
- Reuse existing patterns, abstractions, and conventions whenever possible.
- Never invent APIs, interfaces, schemas, services, permissions, configurations, or infrastructure. Si necesitás algo que no existe, PARÁ y reportá al orquestador en vez de fabricarlo.
- Si mientras implementás encontrás ambigüedad real sobre el requerimiento (no sobre el "cómo" sino sobre el "qué" se pide), no adivines: devolvé la tarea al orquestador con la pregunta puntual en vez de resolverla por tu cuenta.

## Python-specific (si el archivo es .py)

- Cumplimiento Flake8 sin excepciones (E/W/F rules, cero warnings antes de marcar la tarea como completa).
- Nivel de código: profesional, world-class, simple, claro. La solución más directa y legible gana sobre la más "inteligente".
- Nombres de variables/funciones/clases en inglés, descriptivos, sin abreviaturas crípticas.
- Type hints obligatorios en firmas públicas.
- Funciones cortas, una sola responsabilidad. Si necesita un comentario para explicar qué hace, probablemente debería dividirse o renombrarse.

## Python / UV Workflow

When working with Python projects, use **UV** instead of legacy tools (venv, pip, pipenv, poetry).
UV es más rápido, moderno, y reemplaza todo el toolchain clásico de Python.

### Reglas UV

- **Entorno virtual:** `uv venv` — nunca `python -m venv` o `virtualenv`
- **Instalar paquetes:** `uv add <paquete>` (si hay `pyproject.toml`) o `uv pip install <paquete>` (modo pip)
- **Sincronizar dependencias:** `uv sync` (lee `pyproject.toml` y `uv.lock`)
- **Ejecutar scripts/comandos:** `uv run <comando>` — no necesita activar el venv manualmente
- **Inicializar proyecto:** `uv init` crea estructura moderna con `pyproject.toml`
- **Lockfile:** `uv lock` genera `uv.lock` — siempre hacer commit
- **Shell en venv:** si es necesario un shell interactivo, `uv venv` crea el `.venv/`, y entonces sí `.venv/bin/activate`. Pero preferí `uv run` siempre que se pueda.
- **Tests:** `uv run pytest` (no `python -m pytest`)
- **Lint/typecheck:** `uv run flake8 .` es el estándar de estilo obligatorio (ver abajo); `uv run mypy .` para typecheck. Si el proyecto ya usa `ruff` como linter, `ruff` debe correr en modo compatible con las reglas de Flake8, no reemplazarlas.
- **Compatibilidad:** Si el proyecto legacy tiene `requirements.txt`, usar `uv pip install -r requirements.txt`

### Estilo y Calidad de Código Python (obligatorio)

- Todo código Python debe cumplir **Flake8** sin excepciones (E/W/F rules). Cero warnings antes de marcar una tarea como completa.
- Nivel de código: profesional, world-class, simple y claro. Preferir la solución más directa y legible sobre la más "inteligente".
- Nombres de variables, funciones, clases: en inglés, descriptivos, sin abreviaturas crípticas.
- Docstrings en inglés, formato consistente (Google o NumPy style, el que ya use el proyecto).
- Funciones cortas y con una sola responsabilidad. Si una función necesita un comentario para explicar qué hace, probablemente debería dividirse o renombrarse.
- Type hints obligatorios en firmas de función pública.
- `uv run flake8 .` debe correr como parte del hook de validación automática (ver Validation Pipeline) en cada write/edit de archivos `.py`.

### Qué NO hacer

- No uses `python -m venv`
- No uses `pip install` directamente
- No actives venv manualmente a menos que sea estrictamente necesario
- No uses `poetry` ni `pipenv`
- No generes `Pipfile` o `Pipfile.lock`
- No uses `setup.py` para proyectos nuevos — siempre `pyproject.toml`
- No ignores warnings de Flake8 con `# noqa` salvo justificación explícita documentada en el mismo comentario.

### Inicialización de proyecto nuevo

```
uv init mi-proyecto
cd mi-proyecto
uv add <dependencias>
uv run <comando>
```

### Proyecto existente con pyproject.toml

```
uv sync          # instala todo de pyproject.toml + uv.lock
uv add requests  # agrega dependencia
uv run pytest    # ejecuta tests
```

### Proyecto legacy (requirements.txt)

```
uv venv
uv pip install -r requirements.txt
```