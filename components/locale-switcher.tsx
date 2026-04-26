"use client"

import { useTransition } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { IconLanguage } from "@tabler/icons-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

type Locale = (typeof routing.locales)[number]

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher")
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const [isPending, startTransition] = useTransition()

  function setLocale(next: string): void {
    if (next === locale) return
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- params are compatible at runtime
        { pathname, params },
        { locale: next as Locale }
      )
    })
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("aria.root")}
          aria-busy={isPending}
        >
          <IconLanguage size="1.25rem" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={locale} onValueChange={setLocale}>
          {routing.locales.map((l) => (
            <DropdownMenuRadioItem key={l} value={l}>
              {t(`locales.${l}`)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
