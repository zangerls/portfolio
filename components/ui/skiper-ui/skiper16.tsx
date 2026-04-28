"use client"

import { motion, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Button } from "../button"
import { Badge } from "../badge"
import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react"
import { useTranslations } from "next-intl"

const StickyCard_001 = ({
  i,
  title,
  description,
  github,
  href,
  src,
  techStack,
  progress,
  range,
  targetScale,
  tapped,
  onTap,
}: {
  i: number
  title: string
  description: string
  github: string
  href?: string
  src: string
  techStack: string[]
  progress: any
  range: [number, number]
  targetScale: number
  tapped: boolean
  onTap: () => void
}) => {
  const t = useTranslations("Portfolio")
  const container = useRef<HTMLDivElement>(null)
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      ref={container}
      className="pointer-events-none sticky top-0 flex items-center justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 20 + 250}px)`,
        }}
        className="group pointer-events-auto relative -top-1/4 flex aspect-square w-80 origin-top flex-col overflow-hidden lg:w-[512px]"
        onClick={onTap}
        role="button"
        tabIndex={0}
        aria-pressed={tapped}
        aria-label={
          tapped
            ? `${title} — ${description}`
            : t("viewDetailsFor", { title: title })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onTap()
          }
        }}
      >
        <Image
          src={src}
          alt=""
          aria-hidden="true"
          fill
          className={`object-cover transition-[filter] duration-300 lg:brightness-100 lg:group-hover:brightness-40 ${tapped ? "brightness-40" : "brightness-100"}`}
        />

        <div
          aria-hidden="true"
          className={`absolute right-3 bottom-3 flex items-center gap-1 bg-black/40 px-2.5 py-1 text-xs text-white/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${tapped ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          <span>{t("tap")}</span>
        </div>

        <div
          aria-hidden="true"
          className={`absolute bottom-4 left-0 flex w-full flex-wrap items-center justify-center gap-1.5 px-4 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 ${tapped ? "opacity-100" : "opacity-0"}`}
        >
          {techStack.map((tech) => (
            <Badge key={tech} className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div
          aria-hidden="true"
          className={`absolute top-[50%] left-[50%] flex w-full translate-[-50%] flex-col p-6 text-center transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 ${tapped ? "opacity-100" : "opacity-0"}`}
        >
          <p className="font-heading text-2xl font-bold text-background lg:text-3xl dark:text-foreground">
            {title}
          </p>
          <p className="lg:text-md mt-1 mb-3 text-sm text-background dark:text-foreground">
            {description}
          </p>
          <div className="flex w-full items-center justify-center gap-2">
            {href && (
              <Button variant="default" asChild>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t("visit")}
                  <IconArrowUpRight />
                </a>
              </Button>
            )}
            <Button variant="default" asChild>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {t("source")}
                <IconBrandGithub />
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export { StickyCard_001 }

/**
 * Skiper 16 StickyCard_001 — React + Framer Motion
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
