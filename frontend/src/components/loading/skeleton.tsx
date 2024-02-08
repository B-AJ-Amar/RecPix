import { Skeleton } from "@/components/ui/skeleton"
 
export function SkeletonPost() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className=" h-80  w-full mb-4 rounded-md px-4" />
   
    </div>
  )
}




export function SkeletonHome (){
  return(
    <div className=" px-9  cloumns-1  min-[480px]:columns-2  md:columns-3  lg:columns-4">

        {Array.from({ length: 10 }, (_, index) => (
            <SkeletonPost key={index} />
          ))}
    </div>
  )
}