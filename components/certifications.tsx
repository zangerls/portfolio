"use client"

import Image from "next/image"
import { Container } from "./container"
import { cn } from "@/lib/utils"
import {
  IconArrowRight,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons-react"
import { Button } from "./ui/button"
import { useEffect, useRef, useState } from "react"
import { Crosshair } from "./crosshair"
import { Progress } from "./ui/progress"
import { useFormatter, useTranslations } from "next-intl"

type Certification = {
  id: string
  src: string
  name: string
  description: string
}

export function Certifications() {
  const t = useTranslations("Certifications")
  const format = useFormatter()
  const [certificationId, setCertificationId] = useState<string>("google")
  const [progress, setProgress] = useState<number>(0)
  const [hovered, setHovered] = useState<boolean>(false)
  const startTimeRef = useRef<number>(Date.now())
  const pausedElapsedRef = useRef<number>(0)

  const pseudoMatrix: (Certification | undefined)[] = [
    undefined,
    {
      id: "google",
      src: "google.svg",
      name: t("certificates.google.title"),
      description: t("certificates.google.description"),
    },
    undefined,
    {
      id: "qlik",
      src: "qlik.svg",
      name: t("certificates.qlik.title"),
      description: t("certificates.qlik.description"),
    },
    {
      id: "ebcl",
      src: "ebcl.svg",
      name: t("certificates.ebcl.title"),
      description: t("certificates.ebcl.description"),
    },
    undefined,
    {
      id: "cambridge",
      src: "language.svg",
      name: t("certificates.cambridge.title"),
      description: t("certificates.cambridge.description"),
    },
    undefined,
    undefined,
    {
      id: "szu",
      src: "szu.svg",
      name: t("certificates.szu.title"),
      description: t("certificates.szu.description"),
    },
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    {
      id: "sap",
      src: "sap.svg",
      name: t("certificates.sap.title"),
      description: t("certificates.sap.description"),
    },
  ]

  const simplifiedCerts = pseudoMatrix.filter((x) => x?.id).map((x) => x!.id)

  const certification = pseudoMatrix.find((c) => c?.id === certificationId)!

  function resetTimer(nextId?: string) {
    startTimeRef.current = Date.now()
    pausedElapsedRef.current = 0
    setProgress(0)
    if (nextId !== undefined) setCertificationId(nextId)
  }

  function handleNext(): void {
    const index = simplifiedCerts.indexOf(certificationId)
    const nextId =
      simplifiedCerts[(index === -1 ? 0 : index + 1) % simplifiedCerts.length]
    resetTimer(nextId)
  }

  useEffect(() => {
    if (hovered) {
      pausedElapsedRef.current = Date.now() - startTimeRef.current
      return
    }

    startTimeRef.current = Date.now() - pausedElapsedRef.current

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const newProgress = Math.min((elapsed / 5000) * 100, 100)
      setProgress(newProgress)

      if (elapsed >= 5000) {
        startTimeRef.current = Date.now()
        setCertificationId((current) => {
          const index = simplifiedCerts.indexOf(current)
          return simplifiedCerts[
            (index === -1 ? 0 : index + 1) % simplifiedCerts.length
          ]
        })
      }
    }, 50)

    return () => clearInterval(interval)
  }, [hovered])

  return (
    <Container>
      <section
        id="certifications"
        aria-label={t("title")}
        className="grid grid-cols-1 divide-x border-l lg:grid-cols-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative col-span-1 flex flex-col justify-between border-b lg:col-span-2">
          <Progress
            value={progress}
            className="absolute bottom-0 left-0 w-full"
            aria-label={`Certification slideshow progress: ${format.number(progress / 100, { style: "percent", roundingMode: "floor" })}`}
          />
          <Crosshair position="top-right" />
          <h2 className="p-4 font-heading text-xl font-semibold lg:text-3xl">
            {t("title")}
          </h2>
          <div className="mx-4 min-h-56 self-center text-center lg:min-h-1">
            <div className="flex items-end justify-center xl:mx-16">
              <p className="font-heading text-2xl font-semibold md:text-3xl xl:text-4xl">
                {certification.name}
              </p>
            </div>
            <p className="mx-7 mt-2 text-muted-foreground xl:mx-16">
              {certification.description}
            </p>
          </div>
          <div className="flex self-end">
            <Button
              size="icon-lg"
              variant="ghost"
              className="z-3 lg:hidden"
              onClick={() => setHovered((h) => !h)}
              aria-label={
                hovered ? t("playButtons.resume") : t("playButtons.pause")
              }
            >
              {hovered ? <IconPlayerPlay /> : <IconPlayerPause />}
            </Button>
            <Button
              size="icon-lg"
              className="z-3"
              onClick={handleNext}
              aria-label={t("playButtons.next")}
            >
              <IconArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-4 divide-x divide-y">
            {pseudoMatrix.map((element, i) =>
              element ? (
                <button
                  key={i}
                  onClick={() => resetTimer(element.id)}
                  aria-label={t("matrix.tile.ariaLabel", {
                    certificate: element.name,
                  })}
                  aria-pressed={element.id === certificationId}
                  className={cn(
                    "cursor-pointer bg-primary/5 hover:bg-primary/10",
                    element.id === certificationId &&
                      "bg-primary/20 hover:bg-primary/30",
                    "relative col-span-1 flex aspect-square w-full items-center justify-center transition-all"
                  )}
                >
                  <div className="relative aspect-square w-[40%]">
                    <Image
                      src={element.src}
                      alt=""
                      fill
                      className="invert dark:invert-0"
                    />
                  </div>
                </button>
              ) : (
                <div
                  key={i}
                  aria-hidden="true"
                  className="relative col-span-1 flex aspect-square w-full items-center justify-center transition-all"
                />
              )
            )}
          </div>
        </div>
      </section>
    </Container>
  )
}
