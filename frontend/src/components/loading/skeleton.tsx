import { Skeleton } from "@/components/ui/skeleton"
 
export function SkeletonPost() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className=" h-80  w-full mb-4 rounded-md px-4" />
   
    </div>
  )
}

