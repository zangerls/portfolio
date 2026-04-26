"use client"

import { IconMoon, IconSun } from "@tabler/icons-react"
import { Switch } from "./ui/switch"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"

export function ThemeToggle() {
  const t = useTranslations("ThemeToggle")
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTheme("dark")}
        aria-label={t("aria.toggleDark")}
      >
        <IconMoon size="1.1rem" />
      </button>
      <Switch
        aria-label={t("aria.root")}
        checked={theme === "light"}
        onCheckedChange={(e) => setTheme(e ? "light" : "dark")}
      />
      <button
        onClick={() => setTheme("light")}
        aria-label={t("aria.toggleLight")}
      >
        <IconSun size="1.1rem" />
      </button>
    </div>
  )
}
