"use client"

import Image from "next/image"
import { Container } from "./container"
import { cn } from "@/lib/utils"
import { IconArrowRight } from "@tabler/icons-react"
import { Button } from "./ui/button"
import { useEffect, useRef, useState } from "react"
import { Crosshair } from "./crosshair"
import { Progress } from "./ui/progress"

const pseudoMatrix = [
  undefined,
  {
    id: "google",
    src: "google.svg",
    name: "Google Data Analytics",
    description: "Passed in June 2021",
  },
  undefined,
  {
    id: "qlik",
    src: "qlik.svg",
    name: "QlikSense Data Architect Masterclass",
    description: "Passed in June 2022",
  },
  {
    id: "ebcl",
    src: "ebcl.svg",
    name: "European Business Competence* Licence",
    description: "Passed both level A and B in 2018 and 2019 respectively",
  },
  undefined,
  {
    id: "cambridge",
    src: "language.svg",
    name: "Cambridge Assessment | Business Vantage C1",
    description: "Passed with distinction in December 2018",
  },
  undefined,
  undefined,
  {
    id: "szu",
    src: "szu.svg",
    name: "Engineering Degree in Computer Science and Industrial Management",
    description: "Graduated with distinction in May 2021",
  },
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  {
    id: "sap",
    src: "sap.svg",
    name: "SAP (Enterprise Resource Planning) Certification",
    description: "Passed in January 2021",
  },
]

const simplifiedCerts = pseudoMatrix.filter((x) => x?.id).map((x) => x!.id)

export function Certifications() {
  const [certificationId, setCertificationId] = useState<string>("google")
  const [progress, setProgress] = useState<number>(0)
  const [hovered, setHovered] = useState<boolean>(false)
  const startTimeRef = useRef<number>(Date.now())
  const pausedElapsedRef = useRef<number>(0)

  const certification = pseudoMatrix.find((c) => c?.id === certificationId)

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
      <div
        id="certifications"
        className="grid grid-cols-1 divide-x border-l md:grid-cols-2 lg:grid-cols-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative col-span-1 flex flex-col justify-between border-b lg:col-span-2">
          <Progress
            value={progress}
            className="absolute bottom-0 left-0 w-full"
          />
          <Crosshair position="top-right" />
          <p className="p-4 font-heading text-xl font-semibold lg:text-3xl">
            Certifications
          </p>
          <div className="self-center text-center">
            <p className="font-heading text-2xl font-semibold lg:mx-32 lg:text-3xl">
              {certification?.name}
            </p>
            <p className="mt-2 text-muted-foreground lg:mx-56">
              {certification?.description}
            </p>
          </div>
          <Button size="icon-lg" className="z-10 self-end" onClick={handleNext}>
            <IconArrowRight />
          </Button>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-4 divide-x divide-y">
            {pseudoMatrix.map((element, i) => (
              <div
                onClick={!!element ? () => resetTimer(element.id) : undefined}
                role={element?.name ?? "button"}
                key={i}
                className={cn(
                  element && "cursor-pointer bg-primary/5 hover:bg-primary/10",
                  element?.id === certificationId &&
                    "bg-primary/20 hover:bg-primary/30",
                  "relative col-span-1 flex aspect-square w-full items-center justify-center transition-all"
                )}
              >
                {element && (
                  <div className="relative aspect-square w-[40%]">
                    <Image
                      src={element.src}
                      alt={element.name}
                      fill
                      className="invert dark:invert-0"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}
