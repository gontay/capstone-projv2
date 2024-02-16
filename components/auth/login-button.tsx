"use client";

import { useRouter } from "next/navigation";
import { 
    Dialog,
    DialogContent, 
    DialogTrigger 
} from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild? :  boolean;
    action? : "login" | "register"
}

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild,
    action = "login",
}: LoginButtonProps) => {
    const router = useRouter();
        const onClick= () => {
            if(action === "login"){
                router.push("/auth/login");
            }
            if(action === "register"){
                router.push("/auth/register");
            }
            
        }
    if (mode === "modal"){
        if (action === "login"){
            return (
                <Dialog>
                    <DialogTrigger asChild={asChild}>
                        {children}
                    </DialogTrigger>
                    <DialogContent className="p-0 w-auto bg-transparent border-none">
                        <LoginForm/>
                    </DialogContent>
                </Dialog>
            )
        }
        if (action === "register"){
            return (
                <Dialog>
                    <DialogTrigger asChild={asChild}>
                        {children}
                    </DialogTrigger>
                    <DialogContent className="p-0 w-auto bg-transparent border-none">
                        <RegisterForm/>
                    </DialogContent>
                </Dialog>
            )
        }
       
    };
    

    return (
        <span onClick={onClick}className="cursor-pointer">
            {children}
        </span>
    );
}