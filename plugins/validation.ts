import type { Plugin } from "@opencode-ai/plugin"
import { extname } from "path"

async function tryRun(promise: Promise<unknown>): Promise<{
  ok: boolean
  stdout: string
  stderr: string
  exitCode: number
}> {
  try {
    const r = (await promise) as {
      exitCode: number
      stdout: string | Buffer
      stderr: string | Buffer
    }
    const ec = typeof r.exitCode === "number" ? r.exitCode : 1
    const decode = (v: string | Buffer): string =>
      typeof v === "string" ? v : new TextDecoder().decode(v)
    return {
      ok: ec === 0,
      exitCode: ec,
      stdout: decode(r.stdout),
      stderr: decode(r.stderr),
    }
  } catch {
    return { ok: false, exitCode: -1, stdout: "", stderr: "" }
  }
}

function err(label: string, r: { stderr: string; stdout: string }): string {
  const msg = (r.stderr || r.stdout || "").trim().slice(0, 2000)
  return msg ? `${label}: ${msg}` : ""
}

export const ValidationPlugin: Plugin = async ({ $, directory }) => {
  console.log("[validation] Plugin loaded — Python-only mode")

  return {
    "tool.execute.after": async (input, output) => {
      const tool = String(input?.tool ?? "").toLowerCase()
      if (tool !== "write" && tool !== "edit") return

      const args = input?.args
      if (!args || typeof args !== "object") return

      const filePath = (args as Record<string, unknown>).filePath ??
                       (args as Record<string, unknown>).path
      if (typeof filePath !== "string" || !filePath) return

      const ext = extname(filePath).toLowerCase()
      if (ext !== ".py") return

      const results: Record<string, "PASS" | "FAIL" | "SKIP"> = {}
      const errors: string[] = []

      // Syntax check: python3 -m py_compile
      {
        const r = await tryRun(
          $`python3 -m py_compile ${filePath}`.quiet().nothrow().timeout(10_000),
        )
        results.syntax = r.ok ? "PASS" : "FAIL"
        if (!r.ok) {
          const e = err("syntax", r)
          if (e) errors.push(e)
        }
      }

      // Linter: ruff (fast Rust-based)
      {
        const r = await tryRun(
          $`ruff check --quiet ${filePath}`.quiet().nothrow().timeout(15_000),
        )
        if (r.exitCode === -1) {
          results.lint = "SKIP"
        } else {
          results.lint = r.ok ? "PASS" : "FAIL"
          if (!r.ok) {
            const e = err("ruff", r)
            if (e) errors.push(e)
          }
        }
      }

      // Fallback: flake8 (if ruff not available)
      if (results.lint === "SKIP") {
        const r = await tryRun(
          $`flake8 ${filePath}`.quiet().nothrow().timeout(15_000),
        )
        if (r.exitCode !== -1) {
          results.lint = r.ok ? "PASS" : "FAIL"
          if (!r.ok) {
            const e = err("flake8", r)
            if (e) errors.push(e)
          }
        }
      }

      output.metadata = output.metadata || {}
      output.metadata.validation = {
        file: filePath,
        ext,
        results,
        ...(errors.length > 0 ? { errors } : {}),
      }

      const failed = Object.values(results).some((v) => v === "FAIL")
      if (failed) {
        output.title = `\u26A0\uFE0F ${tool} ${filePath} [validation: FAIL]`
      }
    },
  }
}