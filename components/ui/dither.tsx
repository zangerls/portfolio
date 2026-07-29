import { cn } from "@/lib/utils"

export function Dither({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden text-muted-foreground",
        className
      )}
    >
      <div className="dither-field dither-field--fine absolute inset-0" />
      <div className="dither-field dither-field--coarse absolute inset-0" />
    </div>
  )
}
