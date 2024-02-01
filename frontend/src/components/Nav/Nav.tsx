import React, {useState} from 'react'
import { ModeToggle } from '@/components/mode-toggle'
import { AvatarDemo } from '../User/Avatar';
import { DropdownMenuDemo } from '@/components/User/AvatarDropDown';
import { Input } from "@/components/ui/input"
function Logo(){
    return (
        <h1 className=" text-primary font-semibold text-xl">RecPix</h1>
    )
}

 
function SearchBar() {
    return <Input className="mx-5 xl:mx-56" type="text" placeholder="Search" />;
}
export default function Nav() {
   
    
    const [selectedNavItem, setselectedNavItem] = useState('0');
    // const isMobile = useBreakpointValue({ base: true, md: false });
    console.log(selectedNavItem);
    return (
                    <>
        <header className="max-[680px]:px-0 border-b-2 flex backdrop:blur-md  bg-transparent  sticky top-0 left-0 mx-auto w-full z-50 items-center justify-between  py-3 px-1 sm:px-12   ">
            <Logo />
           
            <SearchBar />
            <div className=' items-center justify-center space-x-2 flex'>
                <DropdownMenuDemo />
                <ModeToggle />
                
            </div>
        </header>
        </>
    )
}

