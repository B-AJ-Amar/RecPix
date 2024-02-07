import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    TabsContent,
  } from "@/components/ui/tabs"
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function SignupTab() {
    return (
            <Card>
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
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
    )
}