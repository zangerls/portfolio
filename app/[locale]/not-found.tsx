"use client"

import { Container } from "@/components/container"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { useState } from "react"

const AI_MOVE_DELAY_MS = 500
const WIN_HIGHLIGHT_MS = 1000

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function findWinningLine(positions: number[]): number[] | null {
  return (
    WINNING_LINES.find((line) => line.every((i) => positions.includes(i))) ??
    null
  )
}

export default function NotFound() {
  const t = useTranslations("NotFound")
  const [x, setX] = useState<number[]>([])
  const [o, setO] = useState<number[]>([])
  const [aiPending, setAiPending] = useState<boolean>(false)

  function handleMove(index: number) {
    if (aiPending) return
    if (x.includes(index) || o.includes(index)) return

    const nextX = [...x, index]
    setX(nextX)

    const xWin = findWinningLine(nextX)
    if (xWin) {
      setAiPending(true)
      setX(xWin)
      setO([])

      setTimeout(() => {
        setX([])
        setAiPending(false)
      }, WIN_HIGHLIGHT_MS)
      return
    }

    const taken = new Set([...nextX, ...o])
    const available = Array.from({ length: 9 }, (_, i) => i).filter(
      (i) => !taken.has(i)
    )
    if (available.length === 0) {
      setAiPending(true)

      setTimeout(() => {
        setX([])
        setO([])
        setAiPending(false)
      }, AI_MOVE_DELAY_MS)
      return
    }

    setAiPending(true)
    setTimeout(() => {
      const aiMove = available[Math.floor(Math.random() * available.length)]
      const nextO = [...o, aiMove]
      setO(nextO)

      const oWin = findWinningLine(nextO)
      if (oWin) {
        setX([])
        setO(oWin)

        setTimeout(() => {
          setO([])
          setAiPending(false)
        }, WIN_HIGHLIGHT_MS)
      } else {
        setAiPending(false)
      }
    }, AI_MOVE_DELAY_MS)
  }

  return (
    <main className="flex min-h-svh items-center">
      <Container>
        <div className="grid grid-cols-1 gap-12 py-32 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col items-start gap-6">
            <p className="font-heading text-7xl md:text-9xl">404</p>
            <h1 className="text-2xl md:text-4xl">{t("title")}</h1>
            <p className="max-w-prose text-muted-foreground">
              {t("description")}
            </p>
            <Link
              href="/"
              className="mt-2 border border-foreground px-4 py-2 transition-colors hover:bg-foreground hover:text-background"
            >
              {t("backHome")}
            </Link>
          </div>
          <div aria-hidden="true" className="flex items-center justify-center">
            <div className="grid aspect-square w-full max-w-sm grid-cols-3 grid-rows-3 border">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  onClick={() => handleMove(i)}
                  key={i}
                  className={cn(
                    "flex items-center justify-center font-mono text-xl",
                    i % 3 !== 2 && "border-r",
                    i < 6 && "border-b"
                  )}
                >
                  {o.includes(i) ? "o" : x.includes(i) ? "x" : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
