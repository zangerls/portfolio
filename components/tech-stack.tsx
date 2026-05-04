"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

type Level = "expert" | "proficient" | "familiar" | "exploring"

type TechItem = {
  label: string
  level: Level
  years: number
}

type TechData = {
  name: string
  image: {
    src: string
    height: number
    width: number
    invert?: boolean
    className?: string
  }
  items: TechItem[]
}

const data: TechData[] = [
  {
    name: "Node.js",
    image: {
      src: "/nodejs.svg",
      height: 512,
      width: 512,
      className: "h-36 w-36 sm:h-48 sm:w-48 lg:h-64 lg:w-64",
    },
    items: [
      { label: "TypeScript", level: "expert", years: 6 },
      { label: "Next.js", level: "expert", years: 4 },
      { label: "React", level: "expert", years: 5 },
      { label: "Playwright", level: "proficient", years: 2 },
      { label: "Jest", level: "proficient", years: 4 },
      { label: "Tailwind", level: "expert", years: 4 },
      { label: "Zod", level: "proficient", years: 3 },
      { label: "Prisma", level: "proficient", years: 2 },
      { label: "shadcn", level: "proficient", years: 2 },
      { label: "Express", level: "proficient", years: 7 },
      { label: "Next-intl", level: "expert", years: 3 },
      { label: "Mantine", level: "expert", years: 4 },
      { label: "ai SDK", level: "exploring", years: 1 },
      { label: "Motion", level: "exploring", years: 1 },
    ],
  },
  {
    name: "Python",
    image: { src: "/python.svg", height: 256, width: 256 },
    items: [
      { label: "Pydantic", level: "proficient", years: 2 },
      { label: "psycopg", level: "proficient", years: 3 },
      { label: "Flask", level: "proficient", years: 3 },
      { label: "gunicorn", level: "familiar", years: 1 },
      { label: "Pandas", level: "proficient", years: 6 },
      { label: "Numpy", level: "proficient", years: 6 },
      { label: "Matplotlib", level: "familiar", years: 3 },
      { label: "Seaborn", level: "familiar", years: 3 },
      { label: "Pika", level: "familiar", years: 1 },
    ],
  },
  {
    name: "C# / .NET",
    image: {
      src: "/dotnet.svg",
      height: 512,
      width: 512,
    },
    items: [
      { label: "C#", level: "proficient", years: 2 },
      { label: ".NET", level: "proficient", years: 2 },
      { label: "ASP.NET Core", level: "proficient", years: 2 },
      { label: "Entity Framework Core", level: "proficient", years: 2 },
      { label: "SignalR", level: "familiar", years: 1 },
      { label: "xUnit", level: "proficient", years: 2 },
    ],
  },
  {
    name: "Databases",
    image: { src: "/postgres-dark.svg", height: 298, width: 298, invert: true },
    items: [
      { label: "Postgres", level: "proficient", years: 2 },
      { label: "MySQL", level: "proficient", years: 4 },
      { label: "MariaDB", level: "proficient", years: 7 },
      { label: "Microsoft SQL Server", level: "proficient", years: 4 },
      { label: "MongoDB", level: "proficient", years: 3 },
    ],
  },

  {
    name: "Tools & Services",
    image: {
      src: "/figma.svg",
      height: 444,
      width: 444,
      className: "h-36 w-36 sm:h-48 sm:w-48 lg:h-64 lg:w-64",
    },
    items: [
      { label: "Figma", level: "proficient", years: 5 },
      { label: "Linux", level: "proficient", years: 5 },
      { label: "Docker", level: "proficient", years: 4 },
      { label: "Vercel", level: "proficient", years: 2 },
      { label: "Supabase", level: "familiar", years: 1 },
      { label: "Amazon Web Services", level: "familiar", years: 3 },
      { label: "Github", level: "proficient", years: 6 },
      { label: "Jira", level: "proficient", years: 4 },
      { label: "Confluence", level: "proficient", years: 4 },
      { label: "Bitbucket", level: "proficient", years: 4 },
      { label: "RabbitMQ", level: "familiar", years: 2 },
      { label: "Qlik Sense", level: "expert", years: 4 },
      { label: "Zitadel", level: "familiar", years: 1 },
      { label: "Auth0", level: "proficient", years: 3 },
      { label: "Microsoft Dynamics 365", level: "familiar", years: 3 },
      { label: "Mailchimp", level: "familiar", years: 3 },
    ],
  },
]

type GroupLayout = {
  contentHeight: number
  scrollDistance: number
  scrollStart: number
  scrollEnd: number
}

function ItemsList({ group }: { group: number }) {
  const t = useTranslations("TechStack")
  return (
    <div className="group/parent mr-4 ml-6 flex flex-col gap-2 pt-20 sm:mr-8 sm:ml-16 lg:gap-6">
      {data[group].items.map((item, i) => (
        <div
          key={i}
          className="group/item flex items-center gap-2 font-heading text-3xl text-foreground transition-all group-hover/parent:text-muted hover:text-foreground lg:gap-4 lg:text-5xl 2xl:text-6xl"
        >
          <span className="leading">{item.label}</span>
          <span
            aria-hidden
            className="flex items-center gap-2 font-sans text-xs leading-none tracking-widest text-muted-foreground uppercase opacity-100 transition-opacity duration-200 lg:text-sm lg:opacity-0 lg:group-hover/item:opacity-100"
          >
            <span className="h-px w-3 bg-muted-foreground/60 lg:w-6" />
            <span>{t(`proficiency.${item.level}`)}</span>
            <span className="hidden text-muted-foreground/50 lg:inline">·</span>
            <span className="hidden tabular-nums whitespace-nowrap lg:inline">
              {t("pluralizationYears", { years: item.years })}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

export function TechStack() {
  const scrollSectionRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)

  const [groupLayouts, setGroupLayouts] = useState<GroupLayout[]>([])
  const [totalScrollDistance, setTotalScrollDistance] = useState<number>(0)
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [viewportHeight, setViewportHeight] = useState<number>(0)

  const measure = useCallback(() => {
    const measureContainer = measureRef.current
    const rightPanel = rightPanelRef.current
    if (!measureContainer || !rightPanel) return

    const vh = rightPanel.offsetHeight
    setViewportHeight(vh)

    const groupEls = measureContainer.children
    const layouts: GroupLayout[] = []
    let accumulated = 0

    for (let i = 0; i < data.length; i++) {
      const el = groupEls[i] as HTMLElement
      if (!el) continue
      const contentHeight = el.scrollHeight
      const scrollDistance = i === 0 ? contentHeight : vh + contentHeight
      layouts.push({
        contentHeight,
        scrollDistance,
        scrollStart: accumulated,
        scrollEnd: accumulated + scrollDistance,
      })
      accumulated += scrollDistance
    }

    setGroupLayouts(layouts)
    setTotalScrollDistance(accumulated)
  }, [])

  useEffect(() => {
    measure()
    const observer = new ResizeObserver(measure)
    if (measureRef.current) observer.observe(measureRef.current)
    if (rightPanelRef.current) observer.observe(rightPanelRef.current)
    return () => observer.disconnect()
  }, [measure])

  useEffect(() => {
    const handleScroll = () => {
      const section = scrollSectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const stickyOffset = window.innerHeight * 0.2
      setScrollProgress(Math.max(0, -rect.top - stickyOffset))
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  let activeGroup = 0
  let itemTranslateY = 0

  if (groupLayouts.length > 0) {
    for (let i = 0; i < groupLayouts.length; i++) {
      const layout = groupLayouts[i]
      if (scrollProgress < layout.scrollEnd || i === groupLayouts.length - 1) {
        activeGroup = i
        const localProgress = Math.max(
          0,
          Math.min(scrollProgress - layout.scrollStart, layout.scrollDistance)
        )
        const entryRunway = i === 0 ? 0 : viewportHeight
        itemTranslateY = entryRunway - localProgress
        break
      }
    }
  }

  return (
    <section id="tech-stack" aria-label="Tech Stack">
      <div
        ref={scrollSectionRef}
        style={{ height: `calc(60vh + 20vh + ${totalScrollDistance}px)` }}
      >
        <div className="sticky top-[20vh] h-[60vh] overflow-hidden border-y-1">
          <div className="grid h-full grid-cols-1 lg:grid-cols-2">
            <div className="relative flex h-full w-full items-center justify-center border-r">
              {data.map((category, i) => (
                <div
                  key={i}
                  className={cn(
                    data[activeGroup].name !== category.name
                      ? "opacity-0 blur-md"
                      : "opacity-100 blur-none",
                    "absolute transition-all"
                  )}
                  aria-hidden={data[activeGroup].name !== category.name}
                >
                  <Image
                    className={cn(
                      category.image.invert
                        ? "dark:invert"
                        : "invert dark:invert-0",
                      category.image.className ??
                        "h-24 w-24 sm:h-36 sm:w-36 lg:h-48 lg:w-48",
                      "object-contain"
                    )}
                    src={category.image.src}
                    width={category.image.width}
                    height={category.image.height}
                    alt={category.name}
                  />
                </div>
              ))}
            </div>

            <div
              ref={rightPanelRef}
              className="relative h-full w-full overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0"
                style={{ transform: `translateY(${itemTranslateY}px)` }}
              >
                <ItemsList group={activeGroup} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible fixed top-0 right-0 left-1/2"
      >
        {data.map((_, i) => (
          <div key={i}>
            <ItemsList group={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
