"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
    href?:  string;
    label:  string;
}


export const BackButton = ({href, label}:BackButtonProps) =>{
    if(href){
    return (
        <Button
                variant="link"
                className="font-normal w-full"
                size="sm"
                asChild
            >
                <Link href={href}>{label}</Link>
            </Button>
    )
    }
    if(href === undefined){
        return(
        <Button
            variant="link"
            className="font-normal w-full"
            size="sm"
            asChild
        >
            {label}
        </Button>
        );
    } 
    
};