import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useState } from "react"
import { Logo } from "@/components/Nav/Logo"
function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Sheet>
            <SheetTrigger>
                <Logo />
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export { Sidebar }
