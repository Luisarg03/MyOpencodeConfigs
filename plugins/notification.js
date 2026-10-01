// Tracks the orchestrator session (the one with no parentID) so we only
// notify when THAT session goes idle, not for every subagent session.
let orchestratorSessionId = null

export const NotificationPlugin = async ({ project, client, $, directory, worktree }) => {
  return {
    event: async ({ event }) => {
      // Track the orchestrator session: created without a parentID.
      if (event.type === "session.created") {
        const props = event.properties
        const info = props?.info ?? props
        const id = info?.id
        const parentId = info?.parentID
        if (id && !parentId) {
          orchestratorSessionId = id
          console.log(`NotificationPlugin: orchestrator session tracked: ${id}`)
        }
        return
      }

      // Send notification on orchestrator session completion only.
      if (event.type === "session.idle") {
        const id =
          event.sessionID ??
          event.properties?.info?.id ??
          event.properties?.sessionID ??
          event.properties?.id
        if (!id || id !== orchestratorSessionId) {
          console.log(
            `NotificationPlugin: skipping notification for session ${id} (orchestrator: ${orchestratorSessionId})`
          )
          return
        }
        try {
          if (process.platform === "darwin") {
            // macOS
            await $`osascript -e 'display notification "Session completed!" with title "opencode"'`
          } else if (process.platform === "linux") {
            // Linux (libnotify)
            // Use notify-send if available. Wrap in try/catch to avoid throwing to caller.
            await $`notify-send "opencode" "Session completed!"`
          } else {
            // Unsupported platform: noop
          }
        } catch (err) {
          // Do not re-throw: plugin must not break event dispatch for others
          console.error("NotificationPlugin: failed to send notification:", err)
        }
      }
    },
  }
}
