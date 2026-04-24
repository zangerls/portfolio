"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { IconArrowUpRight } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

type TechData = {
  name: string
  image: {
    src: string
    height: number
    width: number
    invert?: boolean
    className?: string
  }
  items: { label: string; href: string }[]
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
      { label: "TypeScript", href: "https://www.typescriptlang.org/" },
      { label: "Next.js", href: "https://nextjs.org/" },
      { label: "React", href: "https://react.dev/" },
      { label: "Playwright", href: "https://playwright.dev/" },
      { label: "Jest", href: "https://jestjs.io/" },
      { label: "Tailwind", href: "https://tailwindcss.com/" },
      { label: "Zod", href: "https://zod.dev/" },
      { label: "Prisma", href: "https://www.prisma.io/orm" },
      { label: "shadcn", href: "https://ui.shadcn.com/" },
      { label: "Express", href: "https://expressjs.com/" },
      { label: "Next-intl", href: "https://next-intl.dev/" },
      { label: "Mantine", href: "https://mantine.dev/" },
      { label: "ai SDK", href: "https://ai-sdk.dev/" },
      { label: "Motion", href: "https://motion.dev/" },
    ],
  },
  {
    name: "Python",
    image: { src: "/python.svg", height: 256, width: 256 },
    items: [
      { label: "Pydantic", href: "https://docs.pydantic.dev/latest/" },
      { label: "psycopg", href: "https://www.psycopg.org/" },
      { label: "Flask", href: "https://flask.palletsprojects.com/en/stable/" },
      { label: "gunicorn", href: "https://gunicorn.org/" },
      { label: "Pandas", href: "https://pandas.pydata.org/" },
      { label: "Numpy", href: "https://numpy.org/" },
      { label: "Matplotlib", href: "https://matplotlib.org/" },
      { label: "Seaborn", href: "https://seaborn.pydata.org/" },
      { label: "Pika", href: "https://pika.readthedocs.io/en/stable/" },
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
      { label: "C#", href: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
      { label: ".NET", href: "https://dotnet.microsoft.com/" },
      { label: "ASP.NET Core", href: "https://dotnet.microsoft.com/en-us/apps/aspnet" },
      { label: "SignalR", href: "https://dotnet.microsoft.com/en-us/apps/aspnet/signalr" },
      { label: "xUnit", href: "https://xunit.net/" },
    ],
  },
  {
    name: "Databases",
    image: { src: "/postgres-dark.svg", height: 298, width: 298, invert: true },
    items: [
      { label: "Postgres", href: "https://www.postgresql.org/" },
      { label: "MySQL", href: "https://www.mysql.com/" },
      { label: "MariaDB", href: "https://mariadb.org/" },
      {
        label: "Microsoft SQL Server",
        href: "https://www.microsoft.com/en/sql-server",
      },
      { label: "MongoDB", href: "https://www.mongodb.com/" },
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
      { label: "Figma", href: "https://www.figma.com" },
      { label: "Linux", href: "https://github.com/torvalds/linux" },
      { label: "Docker", href: "https://www.docker.com/" },
      { label: "Vercel", href: "https://vercel.com/" },
      { label: "Supabase", href: "https://supabase.com/" },
      { label: "Amazon Web Services", href: "https://aws.amazon.com/" },
      { label: "Github", href: "https://github.com/" },
      { label: "Jira", href: "https://www.atlassian.com/software/jira" },
      {
        label: "Confluence",
        href: "https://www.atlassian.com/software/confluence",
      },
      { label: "Bitbucket", href: "https://bitbucket.org/product/" },
      { label: "RabbitMQ", href: "https://www.rabbitmq.com/" },
      { label: "Qlik Sense", href: "https://www.qlik.com/us" },
      { label: "Zitadel", href: "https://zitadel.com/" },
      { label: "Auth0", href: "https://auth0.com/" },
      {
        label: "Microsoft Dynamics 365",
        href: "https://www.microsoft.com/en/dynamics-365",
      },
      { label: "Mailchimp", href: "https://mailchimp.com/" },
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
  return (
    <div className="group/parent mr-8 ml-16 flex flex-col gap-2 pt-20 lg:gap-6">
      {data[group].items.map((item, i) => (
        <a
          key={i}
          className="group/item flex cursor-pointer items-center gap-3 font-heading text-3xl text-foreground transition-all group-hover/parent:text-muted hover:text-foreground lg:text-6xl"
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.label}
          <IconArrowUpRight
            size="3rem"
            className="group-hover/item:opacity-100 lg:opacity-0"
          />
        </a>
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
