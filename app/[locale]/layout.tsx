import { Geist, Geist_Mono, Poppins } from "next/font/google"

import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import ReactLenis from "lenis/react"
import { Navbar } from "@/components/navbar"
import { Metadata } from "next"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import { TooltipProvider } from "@/components/ui/tooltip"

const SITE_URL = "https://szangerl.com"

const poppinsHeading = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-heading",
})

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale, namespace: "Metadata" })

  const title = t("title")
  const description = t("description")
  const localePath = `/${locale}`

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: t("titleTemplate"),
      default: title,
    },
    description,
    applicationName: t("siteName"),
    authors: [{ name: "Simon Zangerl", url: SITE_URL }],
    creator: "Simon Zangerl",
    publisher: "Simon Zangerl",
    appleWebApp: { title: "S." },
    alternates: {
      canonical: localePath,
      languages: {
        en: "/en",
        de: "/de",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      url: localePath,
      title,
      description,
      locale: locale === "de" ? "de_AT" : "en_US",
      alternateLocale: locale === "de" ? ["en_US"] : ["de_AT"],
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontSans.variable,
        "font-mono",
        geistMono.variable,
        poppinsHeading.variable
      )}
    >
      <body>
        <NextIntlClientProvider>
          <ThemeProvider defaultTheme="dark" enableSystem={false}>
            <ReactLenis root>
              <TooltipProvider>
                <Navbar />
                {children}
              </TooltipProvider>
            </ReactLenis>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
