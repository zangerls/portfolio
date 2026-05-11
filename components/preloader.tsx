"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

const greetings: string[] = [
  "hello",
  "bonjour",
  "你好",
  "hola",
  "ciao",
  "здравей",
  "servus",
  "hej",
  "ahoj",
  "salut",
]

export function Preloader() {
  const [index, setIndex] = useState<number>(0)
  const [done, setDone] = useState<boolean>(false)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        setIndex((i) => {
          if (i + 1 >= greetings.length) {
            clearInterval(interval)
            setDone(true)
            return i
          }
          return i + 1
        })
      }, 150)
    }, 500)

    return () => {
      clearTimeout(startDelay)
      clearInterval(interval)
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground"
        >
          {index === 0 ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="font-heading text-5xl font-semibold text-background sm:text-7xl"
            >
              {greetings[index]}
            </motion.span>
          ) : (
            <span className="font-heading text-5xl font-semibold text-background sm:text-7xl">
              {greetings[index]}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
