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
 
export function AuthCard() {
  return (
    <>
    <span className="absolute top-5 left-1/2 -translate-x-1/2"><Logo /></span>
    <span className=" absolute top-2 right-5"><ModeToggle /></span>
    <div className="flex items-center justify-center h-screen ">
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
                <Input id="username"  />
                </div>
                <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password"  />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Login</Button>
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
                <Label htmlFor="su_username">username</Label>
                <Input id="su_username" />
                </div>

                <div className="space-y-1">
                <Label htmlFor="su_email">email</Label>
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
    </>
  )
}