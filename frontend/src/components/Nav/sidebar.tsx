import { Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose 
  } from "@/components/ui/sheet"
import { useState } from "react"
import { Logo } from "@/components/Nav/Logo"
import { Button } from "../ui/button"
import { useNavigate } from 'react-router-dom';
function Sidebar() {
    const navigate = useNavigate();
    const [selectedNavItem, setselectedNavItem] = useState('0');

    function handleClick({index}) {
        setselectedNavItem(index);
        navigate(navLinks[index].path);
    }

    const navLinks = [
        {name: "Home", path: "/"},
        {name: "Explore", path: "/explore"},
        {name: "Trending", path: "/trending"},
        {name: "Profile", path: "/profile"},
        {name: "Saved", path: "/saved"},
    ]
    
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
                </SheetHeader>
                <div className=" flex flex-col py-7 " >

                    { navLinks.map((item, index) => (
                        <SheetClose asChild>
                            <Button key={index} onClick={() => {handleClick({index})}} variant={selectedNavItem == index ? "secondary" : "ghost"}>{item.name}</Button>
                        </SheetClose>

                    ))}

                </div>
               
                    <SheetDescription className=" absolute bottom-5 flex justify-center ">
                    © 2024, B A.J Amar. All Rights Reserved
                    </SheetDescription>

            
            </SheetContent>
        </Sheet>
    )
}

export { Sidebar }
