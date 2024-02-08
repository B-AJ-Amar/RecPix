
import { AvatarDemo } from "./Avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {lazy , Suspense} from "react"
import Loadinng from "../loading/loading"


const AvaratarDDContent = lazy(() => import('@/components/DropDown/parts/AvatarDDContent'))

export function AvatarDropDown() {
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className=" w-max p-0 rounded-full" variant="outline"><AvatarDemo /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Suspense fallback={<Loadinng />}>
          <AvaratarDDContent />
        </Suspense>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
