import React, { Suspense, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "../Nav/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const LoginTab = React.lazy(() => import('@/components/auth/login'));
const SignupTab = React.lazy(() => import('@/components/auth/sinup'));

export default function AuthCard() {
  const { login } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler = () => {
    login(usernameRef.current?.value || "",passwordRef.current?.value || "")
      .then((message) => {
        if (message) toast.error(message);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <div className="h-screen">
      <div className="max-[680px]:px-0 flex sticky top-0 left-0 mx-auto w-full z-50 items-center justify-between py-3 px-1 sm:px-12 bg-background">
        <Logo />
        <ModeToggle />
      </div>
      <div className="flex flex-col items-center justify-center">
        <Tabs defaultValue="login" className="w-[400px] overflow-y-scroll no-scrollbar max-h-[75%] mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <Suspense fallback={<div>Loading...</div>}>
              <TabsTrigger value="login">Login</TabsTrigger>
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </Suspense>
          </TabsList>
          <Suspense fallback={<div>Loading...</div>}>
            <TabsContent value="login">
              <LoginTab usernameRef={usernameRef} passwordRef={passwordRef} loginHandler={loginHandler} />
            </TabsContent>
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <TabsContent value="signup">
              <SignupTab />
            </TabsContent>
          </Suspense>
        </Tabs>
      </div>
    </div>
  );
}
