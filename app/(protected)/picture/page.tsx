"use client"
import { testBuckets } from '@/actions/testupload';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { User } from 'lucide-react';
import React from 'react'

const PicturePage = () => {
    const user = useCurrentUser();
    const onSubmit = (formData: FormData) =>{
        testBuckets(formData);
    }

  return (
    <div>
        <Avatar>
        <AvatarImage src={user?.image||""}/>
        <AvatarFallback className="bg-slate-400">
            <User className="text-white"/>
        </AvatarFallback >
        </Avatar>
        <form action={onSubmit}>
        <input 
            id="image"
            type="file"
            name="image"
        ></input>
        <Button
          type='submit'
        >
            Submit
        </Button>
    </form>
    </div>
    
  )
}

export default PicturePage