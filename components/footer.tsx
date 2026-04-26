"use client"

import { useTranslations } from "next-intl"
import { Container } from "./container"
import { scrollToSection } from "@/lib/utils"
import { platform } from "node:os"

const CELL_COUNT = 8 * 10

type NavItem = {
  label: string
  href: string
}

type ContactItem = {
  label: string
  href?: string
  ariaLabel?: string
}

export function Footer() {
  const t = useTranslations("Footer")
  const tNav = useTranslations("Navbar")
  const tContact = useTranslations("Contact")

  const navItems: NavItem[] = [
    { label: tNav("items.about"), href: "about" },
    { label: tNav("items.experience"), href: "experience" },
    { label: tNav("items.projects"), href: "projects" },
    { label: tNav("items.techStack"), href: "tech-stack" },
    { label: tNav("items.certifications"), href: "certifications" },
    { label: tNav("items.contact"), href: "get-in-touch" },
  ]

  const contactItems: ContactItem[] = [
    {
      label: tContact("contactPoints.github"),
      href: "https://github.com/zangerls",
      ariaLabel: t("profileNewTab", {
        platform: tContact("contactPoints.github"),
      }),
    },
    {
      label: tContact("contactPoints.linkedIn"),
      href: "https://www.linkedin.com/in/szangerl/",
      ariaLabel: t("profileNewTab", {
        platform: tContact("contactPoints.linkedIn"),
      }),
    },
    { label: tContact("contactPoints.location") },
  ]
  return (
    <footer className="relative overflow-hidden border-t bg-white dark:bg-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_40%,transparent),linear-gradient(to_right,transparent,black_var(--gutter),black_calc(100%-var(--gutter)),transparent)] [mask-composite:intersect] [--gutter:--spacing(4)] md:[--gutter:--spacing(12)] lg:[--gutter:--spacing(20)] xl:[--gutter:--spacing(56)]"
      >
        <Container>
          <div className="@container relative">
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 right-full grid h-full translate-x-px grid-cols-4 md:grid-cols-8"
              style={{ width: "100cqw" }}
            >
              {Array.from({ length: CELL_COUNT }).map((_, i) => (
                <div key={i} className="aspect-square border-r border-b" />
              ))}
            </div>
            <div className="grid w-full grid-cols-4 md:grid-cols-8">
              {Array.from({ length: CELL_COUNT }).map((_, i) => (
                <div key={i} className="aspect-square border-r border-b" />
              ))}
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-full grid h-full grid-cols-4 md:grid-cols-8"
              style={{ width: "100cqw" }}
            >
              {Array.from({ length: CELL_COUNT }).map((_, i) => (
                <div key={i} className="aspect-square border-r border-b" />
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-1 gap-8 py-16 sm:grid-cols-3 sm:gap-0">
          <nav
            aria-label={t("navigation.aria")}
            className="flex flex-col items-center justify-center p-8 sm:items-start sm:pl-0"
          >
            <p className="mb-3 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              {t("navigation.title")}
            </p>
            <div className="flex w-fit flex-col items-center sm:items-start has-[button:hover]:[&>button:not(:hover)]:text-muted">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="w-fit py-1.5 text-left text-base text-foreground transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="order-last flex flex-col items-center justify-center gap-2 text-center sm:order-none">
            <p className="font-heading text-sm font-semibold tracking-widest uppercase">
              Simon Zangerl
            </p>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} — All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 sm:items-end sm:pr-0">
            <p className="mb-3 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              {t("contact")}
            </p>
            <ul className="flex w-fit flex-col items-center sm:items-end has-[a:hover]:[&_a:not(:hover)]:text-muted">
              {contactItems.map((item) => (
                <li key={item.label} className="w-fit">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.ariaLabel}
                      className="block w-fit py-1.5 text-right text-base text-foreground transition-all"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="block w-fit py-1.5 text-right text-base text-foreground">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}
