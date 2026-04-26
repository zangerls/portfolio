"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { Container } from "./container"
import { EncryptedText } from "./ui/encrypted-text"
import { Separator } from "./ui/separator"
import { Crosshair } from "./crosshair"
import { useTranslations } from "next-intl"

type Task = {
  label: string
  description: string
}

type ListItemProps = {
  label: string
  index: number
  setHovered: Dispatch<SetStateAction<number>>
}

function ListItem({ label, index, setHovered }: ListItemProps) {
  return (
    <li>
      <button
        className="group/item flex w-full items-center gap-4 py-2 text-left lg:py-4"
        onClick={() => setHovered(index)}
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(-1)}
        aria-label={`View details for: ${label}`}
      >
        <div className="aspect-square h-2 shrink-0 bg-primary transition-all group-hover/item:bg-primary! group-hover/list:bg-muted" />
        <span className="font-heading text-lg font-semibold transition-all group-hover/item:text-primary! group-hover/list:text-muted lg:text-2xl">
          {label}
        </span>
      </button>
    </li>
  )
}

export function Experience() {
  const t = useTranslations("Experience")
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1)

  const tasks: Task[] = [
    {
      label: t("kulturplanner.tasks.nextGen.title"),
      description: t("kulturplanner.tasks.nextGen.description"),
    },
    {
      label: t("kulturplanner.tasks.e2e.title"),
      description: t("kulturplanner.tasks.e2e.description"),
    },
    {
      label: t("kulturplanner.tasks.enterprise.title"),
      description: t("kulturplanner.tasks.enterprise.description"),
    },
    {
      label: t("kulturplanner.tasks.pipelines.title"),
      description: t("kulturplanner.tasks.pipelines.description"),
    },
    {
      label: t("kulturplanner.tasks.features.title"),
      description: t("kulturplanner.tasks.features.description"),
    },
    {
      label: t("kulturplanner.tasks.consulting.title"),
      description: t("kulturplanner.tasks.consulting.description"),
    },
    {
      label: t("kulturplanner.tasks.design.title"),
      description: t("kulturplanner.tasks.design.description"),
    },
  ]

  return (
    <Container>
      <section
        id="experience"
        aria-label={t("title")}
        className="grid grid-cols-1 divide-x border border-b-0 lg:grid-cols-3"
      >
        <div className="relative col-span-1 p-4 lg:col-span-2 lg:p-12">
          <Crosshair position="top-left" />
          <h2 className="font-heading text-2xl font-bold lg:text-4xl">
            {t("kulturplanner.role")}
          </h2>
          <div className="mt-2 flex items-center gap-2 lg:gap-4">
            <p className="text-sm text-muted-foreground lg:text-xl">
              {t("kulturplanner.atCompany")}
            </p>
            <Separator
              className="border-1 border-muted"
              orientation="vertical"
            />
            <p className="text-sm text-muted-foreground lg:text-xl">
              {t("kulturplanner.fromTo")}
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
        <div className="relative col-span-1 flex h-52 items-center justify-center p-4 lg:h-auto">
          <Crosshair position="bottom-left" />
          <p className="text-sm lg:text-xl">
            {hoveredIndex < 0 ? (
              <span className="text-muted-foreground">
                {t("showDescription")}
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
      </section>
    </Container>
  )
}
