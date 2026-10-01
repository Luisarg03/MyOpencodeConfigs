# Memoria persistente (MCP `memory`, vault `~/.memories`)

El Markdown bajo `~/.memories/projects/<proyecto>/<tipo>/` es la fuente de verdad; `memory.db` (SQLite FTS5) es índice derivado. Nunca edites `memory.db` ni escribas `.md` a mano: todo pasa por tools `mcp__memory__*`. Commitea el vault al cerrar trabajo.

Resolver proyecto antes de leer:
- Usá `Memory project: <nombre>` declarado en el `AGENTS.md` más cercano.
- Si no existe, verificá el nombre contra `~/.memories/projects/`; no asumas que coincide con el basename.
- Si hay duda, listá esas carpetas y pedí aclaración antes de buscar o escribir.

Lectura:
- “Contextualizá este repo”, “estado del proyecto”, “quién soy”:
  usar primero `get_profile(project)`. Nunca `search_memory` para perfiles.
- Búsqueda temática normal:
  usar `search_memory(query, project)`; la respuesta puede incluir además
  el perfil si aporta contexto.
- Búsqueda exhaustiva, o búsqueda temática sin resultados:
  usar `export_memories(project)` y revisar todas las entradas exportadas,
  incluidos `profile` y `source`.
- Nunca afirmar “no hay datos” tras solo `search_memory`; afirmarlo recién
  después de `export_memories(project)` (salvo que el proyecto no exista).
- Usar `export_memories` sólo como fallback de exhaustividad o cuando se pida
  “todo”, “en detalle”, “confirmá si existe”, etc.; no para consultas comunes.
