"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { Container } from "./container"
import { EncryptedText } from "./ui/encrypted-text"
import { Separator } from "./ui/separator"
import { Crosshair } from "./crosshair"

type Task = {
  label: string
  description: string
}

const tasks: Task[] = [
  {
    label: "Built next-gen product from scratch",
    description:
      "Researched enigma.js/nebula.js, prototyped a standalone web app integrating Qlik Sense, got approval, then solo-built a full Next.js application that replaced the company's legacy Qlik dashboard product. Company pivoted from on-prem to SaaS on the back of this.",
  },
  {
    label: "End-to-end ownership",
    description:
      "Sole developer responsible for architecture, frontend, backend, database design, auth, deployment, virtual proxy config, and the network layer between Qlik and the web app. Took ownership of a key result for two consecutive OKR cycles.",
  },
  {
    label: "Enterprise operations & client projects",
    description:
      "Maintained and developed business intelligence solutions for major theatres and opera houses across Austria, Germany, and Switzerland. Handled feature requests, custom builds, performance optimizations, troubleshooting, and on-call incident response for production outages.",
  },
  {
    label: "Data pipeline development",
    description:
      "Built, maintained, and monitored ETL pipelines from scratch. Maintained legacy pipeline integrations during transition period.",
  },
  {
    label: "Product features post-launch",
    description:
      "Designed and built a report builder (custom dashboards with persistence, publishing, cross-user sharing) and an email scheduling engine (configurable recipients, schedules, templated dashboard snapshots).",
  },
  {
    label: "Client-facing consulting",
    description:
      "Led customer meetings for pipeline integrations, advised on CRM system integrations with partners, handled onboarding and demos for the new product.",
  },
  {
    label: "Design & UX",
    description:
      "Owned all product design decisions, replacing dense multi-dashboard Qlik apps with a cleaner, more focused UI.",
  },
]

type ListItemProps = {
  label: string
  index: number
  setHovered: Dispatch<SetStateAction<number>>
}

function ListItem({ label, index, setHovered }: ListItemProps) {
  return (
    <li
      className="group/item py-2 lg:py-4"
      onClick={() => setHovered(index)}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(-1)}
    >
      <div className="flex items-center gap-4">
        <div className="aspect-square h-2 bg-primary transition-all group-hover/item:bg-primary! group-hover/list:bg-muted" />
        <p className="cursor-pointer font-heading text-lg font-semibold transition-all group-hover/item:text-primary! group-hover/list:text-muted lg:text-2xl">
          {label}
        </p>
      </div>
    </li>
  )
}

export function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1)

  return (
    <Container>
      <div className="grid grid-cols-1 divide-x border border-b-0 lg:grid-cols-3">
        <div className="relative col-span-1 p-4 lg:col-span-2 lg:p-12">
          <Crosshair position="top-left" />
          <p className="font-heading text-2xl font-bold lg:text-4xl">
            Fullstack Engineer
          </p>
          <div className="mt-2 flex items-center gap-2 lg:gap-4">
            <p className="text-sm text-muted-foreground lg:text-xl">
              at Kulturplanner
            </p>
            <Separator
              className="border-1 border-muted"
              orientation="vertical"
            />
            <p className="text-sm text-muted-foreground lg:text-xl">
              2022 - Current
            </p>
          </div>
          <ul className="group/list mt-2 lg:mt-8">
            {tasks.map((item, i) => (
              <ListItem
                key={i}
                label={item.label}
                index={i}
                setHovered={setHoveredIndex}
              />
            ))}
          </ul>
        </div>
        <div className="relative col-span-1 flex items-center justify-center p-4">
          <Crosshair position="bottom-left" />
          <p className="text-sm lg:text-xl">
            {hoveredIndex < 0 ? (
              <span className="text-muted-foreground">
                Click or hover task to see details
              </span>
            ) : (
              <EncryptedText
                text={tasks.at(hoveredIndex)?.description || ""}
                revealDelayMs={5}
                flipDelayMs={25}
              />
            )}
          </p>
        </div>
      </div>
    </Container>
  )
}
