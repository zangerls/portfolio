"use client"

import { useState } from "react"
import { IconMenu2, IconX } from "@tabler/icons-react"
import { Container } from "./container"
import { ThemeToggle } from "./theme-toggle"
import { Separator } from "./ui/separator"

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

function scrollToSection(id: string): void {
  const el = document.getElementById(id)
  if (!el) return

  const targetY = el.getBoundingClientRect().top + window.scrollY
  const startY = window.scrollY
  const distance = Math.abs(targetY - startY)

  // Scale duration: 300ms minimum, 1ms per pixel, capped at 900ms
  const duration = Math.min(Math.max(distance, 300), 900)
  const startTime = performance.now()

  function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  function step(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + (targetY - startY) * easeInOut(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

export function Navbar() {
  const [open, setOpen] = useState(false)

  function handleNav(href: string) {
    setOpen(false)
    scrollToSection(href)
  }

  return (
    <header className="fixed z-10 w-full border-b bg-linear-to-t from-background/60 to-background py-4 backdrop-blur-lg">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <button
            className="h-8 w-8 bg-foreground"
            onClick={() => handleNav("home")}
          />

          <div className="group hidden md:flex">
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.href)}
                className="px-4 text-sm transition-all group-hover:text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <button
            className="relative h-[2rem] w-[2rem] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className={`absolute inset-0 transition-all duration-200 ${
                open ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
            >
              <IconX size="2rem" />
            </span>
            <span
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
        className="overflow-hidden transition-all duration-300 ease-in-out md:hidden"
        style={{
          height: open ? "calc(100dvh - 4rem)" : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <Container>
          <nav className="flex flex-col py-2">
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
