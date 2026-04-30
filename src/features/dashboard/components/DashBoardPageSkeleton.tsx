import { Skeleton } from "@/shared/components/ui/skeleton";

export function DashboardPageSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" /> 
        ))}
      </div>
      <Skeleton className="h-[400px] w-full" /> {/* Large Chart area */}
    </div>
  )
}