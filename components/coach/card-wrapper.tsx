'use client';

import { Button } from "../ui/button";
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader
 } from "../ui/card";
import { DialogClose } from "../ui/dialog";
import { BackButton } from "./back-button";
import { Header } from "@/components/header";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel:  string;
    backButtonLabel?:  string|undefined;
    backButtonHref?: string;
};

export const CardWrapper = ({
    children,
    headerLabel, 
    backButtonLabel,
    backButtonHref,
}: CardWrapperProps) => {
    return (
        <Card className="h-full w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel}></Header>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {backButtonHref ? (
                        <CardFooter>
                            <BackButton
                                label={backButtonLabel}
                                href={backButtonHref}
                            />
                        </CardFooter>
            ):(
                <CardFooter>
                    <DialogClose asChild>
                    <Button 
                        type="button" 
                        variant="link"
                        className="font-normal w-full"
                        size="sm">
                        Close
                    </Button>
                    </DialogClose>
                </CardFooter>
            )}

        </Card>
    )
}