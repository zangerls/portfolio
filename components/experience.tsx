"use client"

import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from "react"
import { Container } from "./container"
import { EncryptedText } from "./ui/encrypted-text"
import { Separator } from "./ui/separator"
import { Crosshair } from "./crosshair"
import { Dither } from "./ui/dither"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

type Task = {
  label: string
  description: string
}

type Job = {
  id: string
  company: string
  role: string
  atCompany: string
  fromTo: string
  /** An empty list renders the work-in-progress state instead of a task list. */
  tasks: Task[]
}

type ListItemProps = {
  label: string
  index: number
  setHovered: Dispatch<SetStateAction<number>>
}

/** Keeps the tab row filling the full width no matter how many jobs there are. */
const tabColumns: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
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

function WorkInProgress() {
  const t = useTranslations("Experience")

  return (
    <div className="relative mt-4 flex min-h-44 items-center justify-center overflow-hidden border border-dashed sm:min-h-56 lg:mt-8 lg:min-h-72">
      <Dither />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center lg:gap-4">
        <span className="flex items-center gap-2 text-xs tracking-widest text-muted-foreground uppercase lg:text-sm">
          <span
            aria-hidden="true"
            className="aspect-square h-2 animate-pulse bg-primary"
          />
          {t("wip.tag")}
        </span>
        <p className="font-heading text-xl font-semibold text-balance lg:text-3xl">
          {t("wip.label")}
        </p>
      </div>
    </div>
  )
}

export function Experience() {
  const t = useTranslations("Experience")
  const [activeJobIndex, setActiveJobIndex] = useState<number>(0)
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const jobs: Job[] = [
    {
      id: "kulturplanner",
      company: t("kulturplanner.company"),
      role: t("kulturplanner.role"),
      atCompany: t("kulturplanner.atCompany"),
      fromTo: t("kulturplanner.fromTo"),
      tasks: [
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
      ],
    },
    {
      id: "reebuild",
      company: t("reebuild.company"),
      role: t("reebuild.role"),
      atCompany: t("reebuild.atCompany"),
      fromTo: t("reebuild.fromTo"),
      tasks: [],
    },
  ]

  const job = jobs[activeJobIndex]
  const isWorkInProgress = job.tasks.length === 0

  function selectJob(index: number): void {
    setActiveJobIndex(index)
    setHoveredIndex(-1)
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ): void {
    const last = jobs.length - 1
    let next: number | null = null

    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = last

    if (next === null) return

    event.preventDefault()
    selectJob(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <Container>
      <section
        id="experience"
        aria-label={t("title")}
        className="border border-b-0"
      >
        <div
          role="tablist"
          aria-label={t("tabs.ariaLabel")}
          className={cn(
            "relative grid divide-x border-b lg:mt-12",
            tabColumns[jobs.length] ?? "grid-cols-3"
          )}
        >
          <Crosshair position="top-left" />
          {jobs.map((item, i) => {
            const isActive = i === activeJobIndex
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                role="tab"
                id={`experience-tab-${item.id}`}
                aria-selected={isActive}
                aria-controls={`experience-panel-${item.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectJob(i)}
                onKeyDown={(event) => handleTabKeyDown(event, i)}
                className={cn(
                  "group/tab relative flex min-w-0 flex-col gap-0.5 p-3 text-left transition-all lg:gap-1 lg:p-4",
                  isActive
                    ? "bg-primary/20 hover:bg-primary/25"
                    : "bg-primary/5 hover:bg-primary/10"
                )}
              >
                <span className="text-[10px] tracking-widest text-muted-foreground tabular-nums lg:text-xs">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "truncate font-heading text-sm font-semibold transition-colors lg:text-lg",
                    !isActive &&
                      "text-muted-foreground group-hover/tab:text-foreground"
                  )}
                >
                  {item.company}
                </span>
                <span className="hidden truncate text-[10px] text-muted-foreground tabular-nums sm:block lg:text-xs">
                  {item.fromTo}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`experience-panel-${job.id}`}
          aria-labelledby={`experience-tab-${job.id}`}
          tabIndex={isWorkInProgress ? 0 : -1}
          className="grid grid-cols-1 divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0"
        >
          <div className="col-span-1 p-4 lg:col-span-2 lg:p-12">
            <h2 className="font-heading text-2xl font-bold lg:text-4xl">
              {job.role}
            </h2>
            <div className="mt-2 flex items-center gap-2 lg:gap-4">
              <p className="text-sm text-muted-foreground lg:text-xl">
                {job.atCompany}
              </p>
              <Separator
                className="border-1 border-muted"
                orientation="vertical"
              />
              <p className="text-sm text-muted-foreground lg:text-xl">
                {job.fromTo}
              </p>
            </div>
            {isWorkInProgress ? (
              <WorkInProgress />
            ) : (
              <ul className="group/list mt-2 lg:mt-8">
                {job.tasks.map((item, i) => (
                  <ListItem
                    key={`${job.id}_${i}`}
                    label={item.label}
                    index={i}
                    setHovered={setHoveredIndex}
                  />
                ))}
              </ul>
            )}
          </div>
          <div className="relative col-span-1 flex h-52 items-center justify-center p-4 lg:h-auto">
            <Crosshair position="bottom-left" />
            <p className="text-sm lg:text-xl">
              {isWorkInProgress ? (
                <EncryptedText
                  key={job.id}
                  text={t("wip.description")}
                  revealDelayMs={5}
                  flipDelayMs={25}
                />
              ) : hoveredIndex < 0 ? (
                <span className="text-muted-foreground">
                  {t("showDescription")}
                </span>
              ) : (
                <EncryptedText
                  text={job.tasks.at(hoveredIndex)?.description || ""}
                  revealDelayMs={5}
                  flipDelayMs={25}
                />
              )}
            </p>
          </div>
        </div>
      </section>
    </Container>
  )
}
