"use client"

import { IconMoon, IconSun } from "@tabler/icons-react"
import { Switch } from "./ui/switch"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setTheme("dark")} aria-label="Toggle dark-mode">
        <IconMoon size="1.1rem" />
      </button>
      <Switch
        aria-label="Toggle color scheme"
        checked={theme === "light"}
        onCheckedChange={(e) => setTheme(e ? "light" : "dark")}
      />
      <button onClick={() => setTheme("light")} aria-label="Toggle light-mode">
        <IconSun size="1.1rem" />
      </button>
    </div>
  )
}
