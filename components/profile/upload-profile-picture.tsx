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
import { Card, CardContent, CardHeader } from '../ui/card';
import Image from 'next/image';

const ProfilePictureUpload = () => {
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
    <Card className="w-[600px]">
      <CardHeader>
          <p className="text-2xl font-semibold text-center">
            Picture
          </p>
      </CardHeader>
      <CardContent >
        {user?.image ?(<Image className='p-10'
        src={user.image}
        width={500}
        height={333}
        alt='test'/>):
    (
      <Image className='p-10'
        src={"/profile-avatar.jpg"}
        width={500}
        height={333}
        alt='test'/>
    ) }
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
    </CardContent>
    </Card>
    </div>
    
  )
}

export default ProfilePictureUpload