import { ImageResponse } from "next/og"
import { getTranslations } from "next-intl/server"
import { hasLocale } from "next-intl"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Simon Zangerl — Portfolio"

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale, namespace: "Metadata" })

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        background: "#0a0a0a",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 36, opacity: 0.6 }}>
        szangerl.com
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 96,
            fontWeight: 600,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {t("title")}
        </div>
        <div
          style={{
            fontSize: 32,
            opacity: 0.7,
            maxWidth: 1000,
            lineHeight: 1.3,
          }}
        >
          {t("description")}
        </div>
      </div>
    </div>,
    size
  )
}
