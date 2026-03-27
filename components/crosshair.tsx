import { cn } from "@/lib/utils"

type Props = {
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left"
}

export function Crosshair({ position }: Props) {
  const horizontalX = position.includes("left")
    ? "left-[-12px]"
    : "right-[-12px]"
  const horizontalY = position.includes("top") ? "top-[-1]" : "bottom-[-1]"

  const verticalX = position.includes("left") ? "left-[-1]" : "right-[-1]"
  const verticalY = position.includes("top") ? "top-[-12px]" : "bottom-[-12px]"

  return (
    <>
      <div
        className={cn(
          `${horizontalX} ${horizontalY}`,
          "absolute w-[24px] border-b border-muted-foreground"
        )}
      />
      <div
        className={cn(
          `${verticalX} ${verticalY}`,
          "absolute h-[24px] border-l border-muted-foreground"
        )}
      />
    </>
  )
}
