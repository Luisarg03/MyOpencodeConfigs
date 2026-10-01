---
description: Show where the OpenDashboard service is running
---
Call the dashboard_url tool to determine where OpenDashboard is running.

- If it returns a URL, report it to the user, concisely, in Spanish.
- If it says the service is not running, report that and note the plugin
  spawns it automatically on opencode startup (port 8420, override via
  OPENDASHBOARD_PORT).
