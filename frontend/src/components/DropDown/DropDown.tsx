import {
    MoreHorizontal,
    Download,
    User,
    AlertCircle,
    EyeOff,
    UserCheck,
    UserMinus,

  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  export function DropdownList() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className=" rounded-full w-10 h-10 p-0"><MoreHorizontal /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Username</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Username's Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              <span>Save</span>
            </DropdownMenuItem>
            {/* TODO: Unfollow */}
            <DropdownMenuItem>
              <UserCheck className="mr-2 h-4 w-4" />
              <span>Follow</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <EyeOff className="mr-2 h-4 w-4" />
              <span>Hide</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AlertCircle className="mr-2 h-4 w-4" />
              <span>Report</span>
            </DropdownMenuItem>

          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  