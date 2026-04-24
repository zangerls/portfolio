import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export function Container({
  children,
  withBorder,
}: {
  children: ReactNode
  withBorder?: boolean
}) {
  return (
    <div
      className={cn(
        withBorder && "border-x",
        "mx-4 md:mx-12 lg:mx-20 xl:mx-56"
      )}
    >
      {children}
    </div>
  )
}
