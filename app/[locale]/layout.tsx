import { Geist, Geist_Mono, Poppins } from "next/font/google"

import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import ReactLenis from "lenis/react"
import { Navbar } from "@/components/navbar"
import { Metadata } from "next"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import { TooltipProvider } from "@/components/ui/tooltip"

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

export const metadata: Metadata = {
  title: {
    template: "%s | S.",
    default: "About Me | Simon Zangerl",
  },
  description: "Portfolio of Simon Zangerl",
  authors: [{ name: "Simon Zangerl", url: "https://simon-zangerl.com" }],
  creator: "Simon Zangerl",
  publisher: "Simon Zangerl",
  appleWebApp: {
    title: "S.",
  },
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
      lang="en"
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
