import {
    MoreHorizontal,

  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Suspense, lazy } from "react"
import Loadinng from "../loading/loading"
const PostDDContent = lazy(() => import('@/components/DropDown/parts/PostDDContent'))
  
  export default function DropdownList() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="menu" className=" rounded-full w-10 h-10 p-0"><MoreHorizontal /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <Suspense fallback={<Loadinng />}>
            <PostDDContent />
          </Suspense>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  