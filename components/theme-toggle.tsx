"use client"

import { IconCircleFilled, IconMoon } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const t = useTranslations("ThemeToggle")
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label={t("aria.root")} disabled>
        <IconCircleFilled />
      </Button>
    )
  }

  const isLight = theme === "light"

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("aria.root")}
          onClick={() => setTheme(isLight ? "dark" : "light")}
        >
          <IconCircleFilled
            className={cn(isLight && "hidden")}
            aria-label={t("aria.toggleLight")}
            aria-hidden={isLight}
          />
          <IconMoon
            className={cn(!isLight && "hidden")}
            aria-label={t("aria.toggleDark")}
            aria-hidden={!isLight}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {!isLight ? t("aria.toggleLight") : t("aria.toggleDark")}
      </TooltipContent>
    </Tooltip>
  )
}
