import { Geist, Geist_Mono, Poppins } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import ReactLenis from "lenis/react"
import { Navbar } from "@/components/navbar"
import { Metadata } from "next"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
        <ThemeProvider defaultTheme="dark" enableSystem={false}>
          <ReactLenis root>
            <Navbar />
            {children}
          </ReactLenis>
        </ThemeProvider>
      </body>
    </html>
  )
}
