import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { ModeToggle } from "@/components/mode-toggle"
import { Logo } from "../Nav/Logo"
import { useAuth } from "@/contexts/AuthContext"
import { useRef } from "react"
import {toast} from "sonner"

export function AuthCard() {
    const { login, error } = useAuth();
    const usernameRef = useRef('');
    const passwordRef = useRef('');

    const loginHandler = () => {
        login(usernameRef.current.value, passwordRef.current.value).then(message => {
            console.log("3333333")
            if (message) toast.error(message)
        })
    }
    return (
        <div className=" h-screen">
        <div className="max-[680px]:px-0 flex  sticky top-0 left-0 mx-auto w-full z-50 items-center justify-between  py-3 px-1 sm:px-12  bg-background ">
            <Logo />
            <ModeToggle />
        </div>
        <div className="flex flex-col items-center justify-center ">
            <Tabs defaultValue="login" className="w-[400px] overflow-y-scroll no-scrollbar max-h-[75%] mx-auto ">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                    Already have account ?
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" ref={usernameRef} />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" ref={passwordRef} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={loginHandler}>Login</Button>
                </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="signup">
                <Card>
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    <CardDescription>
                    you dont have an eccount ?  
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                    <Label htmlFor="su_username">Username</Label>
                    <Input id="su_username" />
                    </div>

                    <div className="space-y-1">
                    <Label htmlFor="su_email">Email</Label>
                    <Input id="su_email" type="email" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="su_pass">Password</Label>
                    <Input id="su_pass" type="password" />
                    </div>

                    <div className="space-y-1">
                    <Label htmlFor="su_repass">Confirm Password</Label>
                    <Input id="su_repass" type="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Signup</Button>
                </CardFooter>
                </Card>
            </TabsContent>
            </Tabs>
        </div>
        </div>
    )
}