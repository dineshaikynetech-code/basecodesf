import { Skeleton } from "@/shared/components/ui/skeleton";

export function SmmPageSkeleton() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <div className="flex items-center space-x-4">
             <Skeleton className="h-12 w-12 rounded-full" /> {/* Profile pic */}
             <Skeleton className="h-4 w-[200px]" />         {/* Username */}
          </div>
          <Skeleton className="h-64 w-full rounded-xl" />    {/* Post Image */}
        </div>
      ))}
    </div>
  )
}