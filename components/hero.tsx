"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Container } from "./container"
import { Badge } from "./ui/badge"
import { useTranslations } from "next-intl"

function AnimatedX({ highlighted = false }: { highlighted?: boolean }) {
  const stroke = "currentColor"
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="h-[40%]"
      fill="none"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      initial={{ opacity: 0.4 }}
      animate={{ opacity: highlighted ? 1 : 0.4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.line
        x1="5"
        y1="5"
        x2="19"
        y2="19"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <motion.line
        x1="19"
        y1="5"
        x2="5"
        y2="19"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.3 }}
      />
    </motion.svg>
  )
}

function AnimatedO({ highlighted = false }: { highlighted?: boolean }) {
  const stroke = "currentColor"
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="h-[40%]"
      fill="none"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      initial={{ opacity: 0.4 }}
      animate={{ opacity: highlighted ? 1 : 0.4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="7"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      />
    </motion.svg>
  )
}

const GAMES = {
  xl: [
    {
      x: [34, 58, 141, 51, 68],
      o: [140, 139, 96, 66],
      winLine: [34, 51, 68],
    },
    {
      x: [44, 99, 94, 114, 65],
      o: [115, 131, 116, 50, 117],
      winLine: [115, 116, 117],
    },
    {
      x: [74, 42, 132, 59, 76],
      o: [75, 113, 43, 36],
      winLine: [42, 59, 76],
    },
  ],
  lg: [
    {
      x: [26, 45, 109, 32, 58],
      o: [38, 110, 126, 127],
      winLine: [32, 45, 58],
    },
    {
      x: [50, 62, 33, 128],
      o: [44, 38, 43, 42],
      winLine: [42, 43, 44],
    },
    {
      x: [25, 45, 135, 38, 113, 124],
      o: [26, 137, 136, 117, 114],
      winLine: [113, 124, 135],
    },
  ],
  md: [
    {
      x: [41, 37, 106, 92],
      o: [42, 93, 31, 53],
      winLine: [31, 42, 53],
    },
    {
      x: [44, 43, 95, 23],
      o: [34, 45, 58, 56],
      winLine: [34, 45, 56],
    },
    {
      x: [34, 7, 30, 17, 38],
      o: [37, 11, 15, 14, 13],
      winLine: [13, 14, 15],
    },
  ],
  sm: [
    {
      x: [13, 40, 14, 45, 15],
      o: [19, 43, 16, 50],
      winLine: [13, 14, 15],
    },
    {
      x: [37, 19, 46, 50],
      o: [38, 45, 44, 52],
      winLine: [38, 45, 52],
    },
    {
      x: [44, 30, 19, 25, 13],
      o: [9, 14, 45, 22],
      winLine: [13, 19, 25],
    },
  ],
  xs: [
    {
      x: [9, 13, 25, 20, 30],
      o: [10, 5, 24, 28],
      winLine: [20, 25, 30],
    },
    {
      x: [27, 9, 26, 10, 11],
      o: [8, 20, 25, 24],
      winLine: [9, 10, 11],
    },
    {
      x: [5, 20, 11, 21],
      o: [25, 9, 19, 22],
      winLine: [19, 22, 25],
    },
  ],
}

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl"

function getBreakpoint(width: number): Breakpoint {
  if (width >= 1280) return "xl"
  if (width >= 1024) return "lg"
  if (width >= 768) return "md"
  if (width >= 640) return "sm"
  return "xs"
}

function getRowsForViewport(width: number) {
  if (width >= 1024) return 22
  if (width >= 768) return 18
  if (width >= 640) return 13
  return 12
}

function getColsForViewport(width: number) {
  if (width >= 1280) return 16
  if (width >= 1024) return 12
  if (width >= 768) return 10
  if (width >= 640) return 6
  return 4
}

type Coords = {
  x1: number
  x2: number
  y1: number
  y2: number
}

export function Hero() {
  const t = useTranslations("Hero")
  const [cols, setCols] = useState<number>(16)
  const [rows, setRows] = useState<number>(20)
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("xl")
  const [marks, setMarks] = useState<Record<number, "x" | "o">>({})
  const [winLine, setWinLine] = useState<number[]>([])
  const [lineCoords, setLineCoords] = useState<Coords | null>(null)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const cellRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    function update() {
      const w = window.innerWidth
      setCols(getColsForViewport(w))
      setRows(getRowsForViewport(w))
      setBreakpoint(getBreakpoint(w))
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    const games = GAMES[breakpoint]
    let gameIndex: number = 0
    let step: number = 0
    let paused: boolean = false
    let timeout: ReturnType<typeof setTimeout> | null = null

    function buildMoves(game: (typeof games)[number]) {
      const moves: Array<{ idx: number; mark: "x" | "o" }> = []
      const max = Math.max(game.x.length, game.o.length)
      for (let i = 0; i < max; i++) {
        if (i < game.x.length) moves.push({ idx: game.x[i], mark: "x" })
        if (i < game.o.length) moves.push({ idx: game.o[i], mark: "o" })
      }
      return moves
    }

    let moves = buildMoves(games[gameIndex])
    setMarks({})
    setWinLine([])

    const interval = setInterval(() => {
      if (paused) return

      if (step >= moves.length) {
        setWinLine(games[gameIndex].winLine)
        paused = true
        timeout = setTimeout(() => {
          gameIndex = (gameIndex + 1) % games.length
          moves = buildMoves(games[gameIndex])
          step = 0
          setMarks({})
          setWinLine([])
          setLineCoords(null)
          paused = false
        }, 1500)

        return
      }

      const { idx, mark } = moves[step]
      setMarks((prev) => ({ ...prev, [idx]: mark }))
      step++
    }, 1500)
    return () => {
      clearInterval(interval)
      if (timeout) clearTimeout(timeout)
    }
  }, [breakpoint])

  useEffect(() => {
    if (winLine.length === 0 || !gridRef.current) {
      setLineCoords(null)
      return
    }

    function compute() {
      const grid = gridRef.current
      if (!grid) return

      const gridRect = grid.getBoundingClientRect()
      const sorted = [...winLine].sort((a, b) => a - b)

      const first = cellRefs.current[sorted[0]]
      const last = cellRefs.current[sorted[sorted.length - 1]]
      if (!first || !last) return

      const fr = first.getBoundingClientRect()
      const lr = last.getBoundingClientRect()

      const cx1 = fr.left + fr.width / 2 - gridRect.left
      const cy1 = fr.top + fr.height / 2 - gridRect.top
      const cx2 = lr.left + lr.width / 2 - gridRect.left
      const cy2 = lr.top + lr.height / 2 - gridRect.top

      const dx = cx2 - cx1
      const dy = cy2 - cy1

      const len = Math.hypot(dx, dy) || 1
      const overhang = Math.min(fr.width, fr.height) * 0.35

      const ux = (dx / len) * overhang
      const uy = (dy / len) * overhang

      setLineCoords({
        x1: cx1 - ux,
        y1: cy1 - uy,
        x2: cx2 + ux,
        y2: cy2 + uy,
      })
    }

    compute()

    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [winLine, cols, rows])

  const totalCells = cols * rows

  return (
    <section
      id="home"
      className="relative h-[90vh] w-full overflow-hidden bg-background"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,white_35%,white_65%,transparent),linear-gradient(to_bottom,transparent,white_35%,white_65%,transparent)] [mask-composite:intersect]"
      >
        <Container>
          <div className="relative">
            <div
              ref={gridRef}
              className="relative grid w-full grid-cols-4 border-t border-l border-muted sm:grid-cols-6 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-16"
            >
              {Array.from({ length: totalCells }).map((_, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    cellRefs.current[i] = el
                  }}
                  className="relative flex aspect-square items-center justify-center border-r border-b border-muted p-2 text-xl"
                >
                  {marks[i] === "x" ? (
                    <AnimatedX
                      key={`x-${i}-${marks[i]}`}
                      highlighted={winLine.includes(i)}
                    />
                  ) : marks[i] === "o" ? (
                    <AnimatedO
                      key={`o-${i}-${marks[i]}`}
                      highlighted={winLine.includes(i)}
                    />
                  ) : null}
                </div>
              ))}
              {lineCoords && (
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                >
                  <motion.line
                    x1={lineCoords.x1}
                    y1={lineCoords.y1}
                    x2={lineCoords.x2}
                    y2={lineCoords.y2}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </svg>
              )}
            </div>
          </div>
        </Container>
      </div>

      <div className="relative flex h-full flex-col items-center justify-center">
        <Container>
          <div className="flex flex-col items-center justify-center gap-4">
            <Badge>{t("badge")}</Badge>
            <div className="text-center font-heading text-5xl font-semibold sm:text-6xl md:text-7xl lg:text-8xl">
              <p aria-hidden="true">{t("title.intro")}</p>
              <h1>{t("title.name")}</h1>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
