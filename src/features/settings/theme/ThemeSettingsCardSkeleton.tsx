import { Skeleton } from "@/shared/components/ui/skeleton"
import ResponsiveGrid from "@/shared/layouts/ResponsiveGrid"
import { ThemeCardSkeleton } from "./components/ThemeCardSkeleton"

export function ThemeSettingsCardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
     
      <header>
        <Skeleton className="h-7 w-48 mb-2" />
        <Skeleton className="h-4 w-full max-w-md" />
      </header>

    
      <ResponsiveGrid>
        {/* We render 4 or 8 items to fill the initial view */}
        {Array.from({ length: 8 }).map((_, i) => (
          <ThemeCardSkeleton key={i} />
        ))}
      </ResponsiveGrid>
    </div>
  )
}