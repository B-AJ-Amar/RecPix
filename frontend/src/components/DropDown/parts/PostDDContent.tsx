
import {
    Download,
    User,
    AlertCircle,
    EyeOff,
    UserCheck,
    UserMinus,
    Plus,

  } from "lucide-react"
  
  import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
  } from "@/components/ui/dropdown-menu"
  

export default function PostDDContent(){
    return (
        <>
            <DropdownMenuLabel>Username</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Username's Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <UserCheck className="mr-2 h-4 w-4" />
                <span>Follow</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>Save</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                <span>Download</span>
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
        </>
    )
}