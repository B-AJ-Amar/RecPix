import React, {useState} from 'react'
import { ModeToggle } from '@/components/mode-toggle'
import { AvatarDropDown } from '@/components/User/AvatarDropDown';
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/Nav/sidebar"
import { Outlet } from 'react-router-dom';



 
function SearchBar() {
    return <Input className="mx-5 xl:mx-56" type="text" placeholder="Search" />;
}
export default function Nav() {
   
    // TODO : naav for not authenticated user
    const [selectedNavItem, setselectedNavItem] = useState('0');
    // const isMobile = useBreakpointValue({ base: true, md: false });
    console.log(selectedNavItem);
    return (
        <>
            {/* TODO:  bg-opacity-40 backdrop-blur-md  */}
            <header className="max-[680px]:px-0 flex  sticky top-0 left-0 mx-auto w-full z-50 items-center justify-between  py-3 px-1 sm:px-12  bg-background ">
                <Sidebar />
                <SearchBar />
                <div className=' items-center justify-center space-x-2 flex'>
                    <AvatarDropDown />
                    <ModeToggle />
                </div>
            </header>
            <Outlet />
        </>
    )
}

