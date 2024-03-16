import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { DialogClose } from '../ui/dialog';
import { Button } from '../ui/button';

interface JournalCardWrapperProps{
    children: React.ReactNode;
    headerLabel:  string;
}

const JournalCardWrapper = ({
    children,
    headerLabel, 
}:JournalCardWrapperProps) => {
  return (
    <Card>
        <CardHeader>
            {headerLabel}
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
  )
}

export default JournalCardWrapper