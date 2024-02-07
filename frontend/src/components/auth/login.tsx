import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginTabProps {
    usernameRef: React.RefObject<HTMLInputElement>;
    passwordRef: React.RefObject<HTMLInputElement>;
    loginHandler: () => void;
}

export default function LoginTab({usernameRef, passwordRef, loginHandler}: LoginTabProps) {
    return (
            <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
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
    )
}