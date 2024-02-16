"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { User,LogOut, Settings, Target } from "lucide-react";
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar"
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";
import { UserRole } from "@prisma/client";

export const UserButton = () => {
    const user = useCurrentUser();
    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image||""}/>
                    <AvatarFallback className="bg-slate-400">
                        <User className="text-white"/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Link href="/profile/myProfile">
                    <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2"/>Settings
                    </DropdownMenuItem>
                </Link>
                {user?.role !== UserRole.COACH && (
                    <>
                    <Link href="/coach/onboard">
                    <DropdownMenuItem>
                        <Target className="h-4 w-4 mr-2"/>Become a Coach
                    </DropdownMenuItem>
                </Link>
                    </>
                )}
                {user?.role === UserRole.COACH && (
                    <>
                    <Link href="/coach/dashboard">
                    <DropdownMenuItem>
                        <Target className="h-4 w-4 mr-2"/>Coach Dashboard
                    </DropdownMenuItem>
                </Link>
                    </>
                )}
               
                <LogoutButton>
                    <DropdownMenuItem>
                        <LogOut className="h-4 w-4 mr-2"/>Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}