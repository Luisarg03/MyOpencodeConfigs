import type { Plugin } from "@opencode-ai/plugin"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

/**
 * Skill Loader Plugin — auto-inyecta instrucciones de carga de skills
 * en el prompt de cualquier subagente que tenga skills asignadas.
 *
 * Hook: tool.execute.before
 *   Cuando el orquestador llama task(subagent_type: "designer"|"fixer"|...),
 *   este plugin lee oh-my-opencode-slim.json para ver qué skills tiene
 *   ese agente y prepende al prompt las llamadas skill("nombre") necesarias.
 *
 * Efecto:
 *   - Designer arranca con skill("frontend-design"), skill("banner-design"), etc.
 *   - Fixer arranca con skill("codemap"), skill("refactor")
 *   - Oracle arranca con skill("simplify")
 *   - Cualquier agente con skills en el preset las carga automáticamente
 *   - Sin cambios en los prompts del orquestador
 *   - Sin skills nuevas que agregar manualmente
 */

const CONFIG_DIR = join(process.env.HOME || "/root", ".config", "opencode")
const PRESET_PATH = join(CONFIG_DIR, "oh-my-opencode-slim.json")

interface PresetConfig {
  preset: string
  presets?: Record<string, Record<string, { skills?: string[] }>>
}

function loadAgentSkills(): Record<string, string[]> {
  try {
    if (!existsSync(PRESET_PATH)) {
      console.warn("[skill-loader] Preset not found:", PRESET_PATH)
      return {}
    }

    const content = readFileSync(PRESET_PATH, "utf-8")
    const config: PresetConfig = JSON.parse(content)
    const preset = config.presets?.[config.preset]
    if (!preset) {
      console.warn("[skill-loader] Preset", config.preset, "not found")
      return {}
    }

    const result: Record<string, string[]> = {}
    for (const [agent, cfg] of Object.entries(preset)) {
      if (cfg && typeof cfg === "object" && Array.isArray(cfg.skills)) {
        result[agent] = cfg.skills
      }
    }

    console.log(
      "[skill-loader] Loaded skill mappings:",
      Object.entries(result)
        .filter(([, skills]) => skills.length > 0 && !(skills.length === 1 && skills[0] === "*"))
        .map(([a, s]) => `${a}(${s.filter((x) => x !== "*" && x !== "agent-browser").length})`)
        .join(", ") || "(none)",
    )

    return result
  } catch (err) {
    console.error("[skill-loader] Failed to load preset:", err)
    return {}
  }
}

// Skills that are built-in runtime capabilities, not file-based SKILL.md
const INTERNAL_SKILLS = new Set(["*", "agent-browser"])

export const SkillLoaderPlugin: Plugin = async () => {
  const agentSkills = loadAgentSkills()

  return {
    "tool.execute.before": async (input, output) => {
      // Only intercept task() calls (subagent delegation)
      if (input.tool !== "task") return

      const args = output.args as Record<string, unknown>
      const subagentType = args?.subagent_type as string | undefined
      if (!subagentType) return

      // Check if this agent has file-based skills assigned
      const allSkills = agentSkills[subagentType]
      if (!allSkills || allSkills.length === 0) return

      const fileSkills = allSkills.filter((s) => !INTERNAL_SKILLS.has(s))
      if (fileSkills.length === 0) return

      // Build auto-load instruction block
      const loadLines = fileSkills.map((s) => `  skill("${s}")`)
      const instruction = [
        "",
        "## Auto-Load Skills",
        `Tenes ${fileSkills.length} skill(s) asignadas. Cargalas al inicio llamando a \`skill()\`:`,
        "```",
        ...loadLines,
        "```",
        "Hace esto AL INICIO, antes de cualquier otra accion.",
        "Si alguna skill no se carga, continua sin ella.",
        "",
      ].join("\n")

      // Prepend to existing prompt
      const existingPrompt = (args.prompt as string) ?? ""
      args.prompt = instruction + existingPrompt

      console.log(
        `[skill-loader] Prepended ${fileSkills.length} skill loads to ${subagentType} task prompt`,
      )
    },
  }
}
