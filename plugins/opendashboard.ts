import type { Plugin } from "@opencode-ai/plugin"
import { tool } from "@opencode-ai/plugin"
import path from "node:path"

const PORT = Number(process.env.OPENDASHBOARD_PORT) || 8420
const REPO = process.env.OPENDASHBOARD_REPO ?? path.join(process.env.HOME ?? "", "Private/Projects/OpenCodeGlobal/OpenDashboard")

let childProcess: ReturnType<typeof Bun.spawn> | null = null

type Probe = "ours" | "foreign" | "free"

async function probe(): Promise<Probe> {
  try {
    const resp = await fetch(`http://127.0.0.1:${PORT}/api/health`)
    const body = await resp.json().catch(() => null)
    return body?.service === "opendashboard" ? "ours" : "foreign"
  } catch {
    return "free"
  }
}

async function healthcheck(timeoutMs: number = 5000): Promise<boolean> {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    if ((await probe()) === "ours") return true
    await new Promise((r) => setTimeout(r, 200))
  }
  return false
}

function log(
  ctx: { client: { app: { log: (opts: { body: { service: string; level: string; message: string } }) => void } } },
  level: string,
  message: string,
) {
  ctx.client.app.log({ body: { service: "opendashboard", level, message } })
}

function toast(
  ctx: { client: { tui: { showToast: (opts: { body: { title: string; message: string; variant: string; duration?: number } }) => void } } },
  variant: string,
  message: string,
) {
  setTimeout(() => {
    void ctx.client.tui.showToast({
      body: { title: "OpenDashboard", message, variant, duration: 3000 },
    })
  }, 500)
}

export const opendashboard: Plugin = async (ctx) => {
  const p = await probe()

  if (p === "ours") {
    log(ctx, "info", `reusing existing dashboard at http://127.0.0.1:${PORT}`)
    toast(ctx, "info", `http://127.0.0.1:${PORT}`)
    return {
      tool: { dashboard_url: dashboardUrlTool() },
      dispose() {},
    }
  }

  if (p === "foreign") {
    log(ctx, "warn", `port ${PORT} occupied by another service`)
    toast(ctx, "warning", `Port ${PORT} is in use. Set OPENDASHBOARD_PORT to a free port.`)
    return {
      tool: { dashboard_url: dashboardUrlTool() },
      dispose() {},
    }
  }

  // port is free — spawn
  // "ignore" not "pipe": uvicorn is long-running and unread pipes (~64KB buffer) block forever
  childProcess = Bun.spawn(["uv", "run", "--directory", REPO, "opendashboard", "--port", String(PORT)], {
    stdout: "ignore",
    stderr: "ignore",
  })

  const healthy = await healthcheck()
  if (healthy) {
    log(ctx, "info", `running at http://127.0.0.1:${PORT}`)
    toast(ctx, "success", `http://127.0.0.1:${PORT}`)
  } else {
    // boot race: other instance may have won
    if (childProcess?.exitCode != null && (await probe()) === "ours") {
      log(ctx, "info", `another instance won the race, reusing their dashboard`)
      childProcess = null
      toast(ctx, "info", `http://127.0.0.1:${PORT}`)
    } else {
      log(ctx, "error", "failed to start dashboard")
      toast(ctx, "error", "Failed to start OpenDashboard. Check logs for details.")
      if (childProcess) { childProcess.kill(); childProcess = null }
    }
  }

  return {
    tool: { dashboard_url: dashboardUrlTool() },
    dispose() {
      if (childProcess) { childProcess.kill(); childProcess = null }
    },
  }
}

function dashboardUrlTool() {
  return tool({
    description:
      "Returns the URL of the running OpenDashboard server. Use this when the user asks where the dashboard is or how to access it.",
    args: {},
    async execute() {
      const p = await probe()
      if (p === "ours") return `OpenDashboard running at http://127.0.0.1:${PORT}`
      if (p === "foreign") return `Port ${PORT} is occupied by another service. Set OPENDASHBOARD_PORT to a free port.`
      return "OpenDashboard is not running."
    },
  })
}
