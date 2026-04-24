import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToSection(id: string): void {
  const el = document.getElementById(id)
  if (!el) return

  const targetY = el.getBoundingClientRect().top + window.scrollY
  const startY = window.scrollY
  const distance = Math.abs(targetY - startY)

  const duration = Math.min(Math.max(distance, 300), 900)
  const startTime = performance.now()

  function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  function step(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + (targetY - startY) * easeInOut(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}
