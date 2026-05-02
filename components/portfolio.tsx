"use client"

import { useScroll } from "framer-motion"
import { StickyCard_001 } from "./ui/skiper-ui/skiper16"
import { useRef, useState } from "react"
import { Container } from "./container"
import { Crosshair } from "./crosshair"
import { useTranslations } from "next-intl"

type Project = {
  src: string
  title: string
  description: string
  github: string
  techStack: string[]
  href?: string
}

export function Portfolio() {
  const t = useTranslations("Portfolio")
  const container = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  const projects: Project[] = [
    {
      src: "/going-in-circles.webp",
      title: t("projects.goingInCircles.title"),
      description: t("projects.goingInCircles.description"),
      github: "https://github.com/zangerls/going-in-circles",
      techStack: ["Next.js", "shadcn", "motion", "Spotify Web API"],
    },
    {
      src: "/mozartle.webp",
      title: t("projects.mozartle.title"),
      description: t("projects.mozartle.description"),
      github: "https://github.com/zangerls/mozartle",
      href: "https://mozartle.com",
      techStack: ["Next.js", "Vercel", "Postgres", "Supabase", "Prisma"],
    },
    {
      src: "/skipbo.webp",
      title: t("projects.skipBo.title"),
      description: t("projects.skipBo.description"),
      href: "https://flip-bo.com",
      github: "https://github.com/zangerls/skipbo",
      techStack: [
        ".NET",
        "ASP.NET Core",
        "xUnit",
        "SignalR",
        "Hetzner",
        "Docker",
        "nginx",
      ],
    },
    {
      src: "/everything-is-a-coin.webp",
      title: t("projects.everythingIsACoin.title"),
      description: t("projects.everythingIsACoin.description"),
      github: "https://github.com/zangerls/everything-is-a-coin",
      techStack: ["React Native", "Expo"],
    },
    {
      src: "/darinela.webp",
      title: t("projects.darinela.title"),
      description: t("projects.darinela.description"),
      github: "https://github.com/zangerls/dv",
      href: "https://darinela.com",
      techStack: ["Next.js", "Vercel", "shadcn", "next-intl", "Figma"],
    },
    {
      src: "/simon-zangerl.webp",
      title: t("projects.simon.title"),
      description: t("projects.simon.description"),
      github: "https://github.com/zangerls/portfolio",
      href: "https://szangerl.com",
      techStack: ["Next.js", "Vercel", "shadcn", "motion", "Figma"],
    },
  ]

  return (
    <section id="projects" aria-label={t("title")} ref={container}>
      <Container withBorder>
        <div className="relative border-t pb-82 lg:pb-100">
          <Crosshair position="bottom-left" />
          {projects.map((project, i) => {
            const targetScale = Math.max(
              0.5,
              1 - (projects.length - i - 1) * 0.1
            )
            return (
              <StickyCard_001
                key={`p_${i}`}
                i={i}
                {...project}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                tapped={activeIndex === i}
                onTap={() => setActiveIndex(activeIndex === i ? null : i)}
              />
            )
          })}
        </div>
      </Container>
    </section>
  )
}
