"use client"
import { testBuckets } from '@/actions/auth/testupload';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

const PicturePage = () => {
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
    const user = useCurrentUser();
    const onSubmit = (formData: FormData) =>{
        console.log(formData.get("image"));
        testBuckets(formData)
        .then((data)=>{
          if (data.error){
            setError(data.error);
          }
          
          if(data.success){
            update();
            setSuccess(data.success);
          }
        })
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
    <FormError message={error}/>
    <FormSuccess message={success}/>
    </div>
    
  )
}

export default PicturePage