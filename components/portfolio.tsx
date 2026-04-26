"use client"

import { useScroll } from "framer-motion"
import { StickyCard_001 } from "./ui/skiper-ui/skiper16"
import { useRef, useState } from "react"
import { Container } from "./container"
import { Crosshair } from "./crosshair"

type Project = {
  src: string
  title: string
  description: string
  github: string
  techStack: string[]
  href?: string
}

const projects: Project[] = [
  {
    src: "/going-in-circles.webp",
    title: "Going in Circles",
    description: "How many albums separate your favourite artists?",
    github: "https://github.com/zangerls/going-in-circles",
    techStack: ["Next.js", "shadcn", "motion", "Spotify Web API"],
  },
  {
    src: "/mozartle.webp",
    title: "Mozartle",
    description: "Guess today's opera in six guesses or fewer",
    github: "https://github.com/zangerls/mozartle",
    href: "https://mozartle.com",
    techStack: ["Next.js", "Vercel", "Postgres", "Supabase", "Prisma"],
  },
  {
    src: "/skipbo.webp",
    title: "Skip Bo",
    description: "Play the childhood classic online",
    github: "https://github.com/zangerls/skipbo",
    techStack: [".NET", "ASP.NET Core"],
  },
  {
    src: "/darinela.webp",
    title: "Darinela Vangelova",
    description:
      "Personal website of Bulgarian opera singer Darinela Vangelova",
    github: "https://github.com/zangerls/dv",
    href: "https://darinela.com",
    techStack: ["Next.js", "Vercel", "shadcn"],
  },
  {
    src: "/web-app-manifest-512x512.png",
    title: "Simon Zangerl",
    description: "I hope you enjoy it so far",
    github: "https://github.com/zangerls/portfolio",
    href: "https://simon-zangerl.com",
    techStack: ["Next.js", "Vercel", "shadcn", "motion"],
  },
]

export function Portfolio() {
  const container = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })
  return (
    <section id="projects" aria-label="Projects" ref={container}>
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
