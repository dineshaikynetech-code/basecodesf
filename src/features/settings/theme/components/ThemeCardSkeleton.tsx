import { Skeleton } from "@/shared/components/ui/skeleton"

export function ThemeCardSkeleton() {
  return (
    <div className="rounded-xl border overflow-hidden flex flex-col h-full bg-card/50">
      {/* Mimics the Preview Strip */}
      <Skeleton className="h-24 w-full rounded-none" />
      
      <div className="p-4 space-y-3">
        {/* Mimics the Title */}
        <Skeleton className="h-5 w-3/4 rounded-md" />
        {/* Mimics the Description */}
        <Skeleton className="h-3 w-1/2 rounded-md" />
        {/* <Skeleton className="h-3 w-1/2 rounded-md" />
        <Skeleton className="h-3 w-1/2 rounded-md" /> */}
      </div>
    </div>
  )
}