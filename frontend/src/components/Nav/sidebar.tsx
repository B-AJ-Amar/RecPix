import { Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from "@/components/ui/sheet"
import { useState } from "react"
import { Logo } from "@/components/Nav/Logo"
import { Button } from "../ui/button"

import {
    DropdownMenuSeparator,
  } from "@/components/ui/dropdown-menu"
function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Sheet>
                <span className=" flex flex-row">
            <SheetTrigger>
                <Menu className="cursor-pointer"/>
            </SheetTrigger>
                </span>
                &nbsp;
                <Logo className=" hidden md:block"/>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle><Logo /></SheetTitle>
                    {/* <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription> */}
                </SheetHeader>
                <div className=" flex flex-col py-7 " >
                    <Button variant={"secondary"}  >Home</Button>
                    <Button variant={"ghost"} >Explore</Button>
                    <Button variant={"ghost"}>Trending</Button>
                    <DropdownMenuSeparator />
                    <Button variant={"ghost"}>Profile</Button>
                    <Button variant={"ghost"}>Saved</Button>

                </div>
               
                    <SheetDescription className=" absolute bottom-5 flex justify-center ">
                    © 2024, B A.J Amar. All Rights Reserved
                    </SheetDescription>

            
            </SheetContent>
        </Sheet>
    )
}

export { Sidebar }
