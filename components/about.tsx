"use client"

import Image from "next/image"
import { Container } from "./container"
import { Crosshair, type CrosshairProps } from "./crosshair"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

type AboutCardProps = {
  label: string
  description: string
  image: {
    src: string
    alt: string
  }
  crosshair?: CrosshairProps["position"]
  index: number
}

const cards: AboutCardProps[] = [
  {
    label: "Purist at Heart",
    description: `I fell in love with software young. Spending hours on the family computer, setting up local game servers with friends, writing scripts and customizing everything there is.
      That obsession led me to SZU Ungargasse in Vienna, where I obtained my degree in engineering by diving into every field under the sun.
      Between CNC machines, building a miniature piston engine, electrical engineering, CAD, applied maths, business, software development,
      I am still the same software-obsessed kid who just loves building things and solving any problem.`,
    image: {
      src: "P.svg",
      alt: "Letter P",
    },
    crosshair: "top-left",
    index: 1,
  },
  {
    label: "Jack of All Trades",
    description: `Spending the early years of my career at a small company was the best thing that could've ever happened to me.
      A bit of everything landed on my plate: client consulting, maintaining existing pipelines, network configs, database design, UI/UX and building entirely new products from scratch handling everything from start to finish.
      All of which I worked out myself, with the docs open, step by step. That stretch is where I learned how I work best:
      Pick up whatever the problem needs, no excuses, because every problem has a solution waiting to be figured out.`,
    image: {
      src: "J.svg",
      alt: "Letter J",
    },
    crosshair: "bottom-left",
    index: 2,
  },
  {
    label: "Future Proof",
    description: `I follow the industry as closely as I can.
      New frameworks, architectural shifts, or where AI is actually heading - not to chase any trends, but because staying informed is non-negotiable when your job is to make good decisions.
      Clean abstractions, maintainable code, systems built to last without over-engineering for the unknown future. But what I've always been most proud of is simpler: I take on every challenge, every problem, every task. Not because I know everything - trust me, I don't - but because figuring things out under pressure is where I shine.`,
    image: {
      src: "F.svg",
      alt: "Letter F",
    },
    crosshair: "top-left",
    index: 3,
  },
]

function AboutCard({
  label,
  description,
  image,
  crosshair,
  index,
}: AboutCardProps) {
  const { theme } = useTheme()
  const num = index.toString().padStart(2, "0")

  return (
    <div className="group relative col-span-1">
      {crosshair && <Crosshair position={crosshair} />}

      <div className="flex flex-col gap-4 p-8 lg:hidden">
        <p className="font-heading text-xl font-semibold">{label}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <span className="self-end text-xl text-muted-foreground">{num}</span>
      </div>

      <div aria-hidden="true" className="relative hidden h-full lg:block">
        <span className="absolute right-3 bottom-3 z-2 text-xl text-muted-foreground transition-colors duration-300 group-hover:text-background">
          {num}
        </span>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 transition-opacity duration-300 group-hover:opacity-0">
          <Image
            src={image.src}
            height={100}
            width={100}
            alt=""
            className={cn(
              "h-[100px] w-auto",
              theme === "light" ? "invert" : ""
            )}
          />
          <p className="font-heading text-xl font-semibold">{label}</p>
        </div>

        <div className="absolute inset-0 overflow-hidden bg-foreground p-8 pb-14 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="font-heading text-xl font-semibold text-background">
            {label}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-background">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function About() {
  return (
    <Container>
      <section
        id="about"
        aria-label="About"
        className="grid grid-cols-1 divide-y border-x border-t lg:h-170 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
      >
        {cards.map((card) => (
          <AboutCard key={card.label} {...card} />
        ))}
      </section>
    </Container>
  )
}
