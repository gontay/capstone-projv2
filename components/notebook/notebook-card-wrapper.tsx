import React from 'react'
import { Button } from "@/components/ui/button";
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader
 } from "@/components/ui/card";
import { DialogClose } from "@/components/ui/dialog";
import { Header } from '@/components/header';

interface NotebookCardWrapperProps {
  children: React.ReactNode;
  headerLabel:  string;
};

const NotebookCardWrapper = ({
  children,
  headerLabel, 

}:NotebookCardWrapperProps) => {
  return (
    <Card className="w-[400px] h-full shadow-md">
            <CardHeader>
                <Header label={headerLabel}></Header>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
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
    </Card>
  )
}

export default NotebookCardWrapper

