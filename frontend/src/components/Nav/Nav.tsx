import { ModeToggle } from '@/components/mode-toggle'
import { AvatarDropDown } from '@/components/User/AvatarDropDown';
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/Nav/sidebar"
import { Outlet } from 'react-router-dom';


 
function SearchBar() {
    return <Input className="mx-5 xl:mx-56" type="text" placeholder="Search" />;
}
export default function Nav() {

    return (
        <>
            <header className="px-4 flex  sticky top-0 left-0 mx-auto w-full z-50 items-center justify-between  py-3  bg-background  sm:px-12 ">
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

