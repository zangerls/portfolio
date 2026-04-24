"use client"

import { useState } from "react"
import { IconMenu2, IconX } from "@tabler/icons-react"
import { Container } from "./container"
import { ThemeToggle } from "./theme-toggle"
import { Separator } from "./ui/separator"
import Image from "next/image"
import { scrollToSection } from "@/lib/utils"

type NavbarItem = {
  label: string
  href: string
}

const items: NavbarItem[] = [
  { label: "About", href: "about" },
  { label: "Experience", href: "experience" },
  { label: "Projects", href: "projects" },
  { label: "Tech Stack", href: "tech-stack" },
  { label: "Certifications", href: "certifications" },
  { label: "Get In Touch", href: "get-in-touch" },
]


export function Navbar() {
  const [open, setOpen] = useState<boolean>(false)

  function handleNav(href: string): void {
    setOpen(false)
    scrollToSection(href)
  }

  return (
    <header className="fixed z-10 w-full border-b bg-linear-to-t from-background/60 to-background py-4 backdrop-blur-lg">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <button
            className="relative h-8 w-8 bg-foreground"
            onClick={() => handleNav("home")}
            aria-label="Go to top"
          >
            <Image
              src="/logo.webp"
              alt="Simon Zangerl — Portfolio home"
              width={32}
              height={32}
              className="invert-0 dark:invert"
            />
          </button>

          <nav aria-label="Main navigation" className="group hidden lg:flex">
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.href)}
                className="px-4 text-sm transition-all group-hover:text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <ThemeToggle />
          </div>

          <button
            className="relative h-[2rem] w-[2rem] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span
              aria-hidden="true"
              className={`absolute inset-0 transition-all duration-200 ${
                open ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
            >
              <IconX size="2rem" />
            </span>
            <span
              aria-hidden="true"
              className={`absolute inset-0 transition-all duration-200 ${
                open ? "scale-75 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <IconMenu2 size="2rem" />
            </span>
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className="overflow-hidden transition-all duration-300 ease-in-out lg:hidden"
        aria-hidden={!open}
        style={{
          height: open ? "calc(100dvh - 4rem)" : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <Container>
          <nav aria-label="Mobile navigation" className="flex flex-col py-2">
            {items.map((item, i) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.href)}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                className={`py-3 text-left text-sm text-muted-foreground transition-all duration-200 hover:text-foreground ${
                  open
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Separator className="my-2" />
            <div
              style={{
                transitionDelay: open ? `${items.length * 40}ms` : "0ms",
              }}
              className={`py-2 transition-all duration-200 ${
                open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              }`}
            >
              <ThemeToggle />
            </div>
          </nav>
        </Container>
      </div>
    </header>
  )
}
