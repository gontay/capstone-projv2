import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { DialogClose } from '../ui/dialog';
import { Button } from '../ui/button';

interface RatingCardWrapperProps{
    children: React.ReactNode;
    headerLabel:  string;
}

const RatingCardWrapper = ({
    children,
    headerLabel, 
}:RatingCardWrapperProps) => {
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

export default RatingCardWrapper