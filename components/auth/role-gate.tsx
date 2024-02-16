"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";
import { redirect } from "next/navigation";
interface RoleGateProps{
    children: React.ReactNode;
    allowedRole: UserRole;
    mode: string;
};

export const RoleGate = ({
    children,
    allowedRole,
    mode,
}: RoleGateProps) =>{
    const role = useCurrentRole();

    if(role !== allowedRole && mode === "block"){
        
        return (
            <FormError message="Access Denied! No Permission to view content!"/>
        )
    }

    if(role !== allowedRole && mode === "redirect"){
        redirect('/')
    }

    return(
        <>
            {children}
        </>
    )
}