"use server";
import { signOut } from "@/auth";

export const logout = async () =>{
    // server action before user log out.
    await signOut();
};