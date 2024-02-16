import { UserProps } from '@/types'
import Image from 'next/image';
import React from 'react'
import { Card, CardContent } from '../ui/card';

interface UserProfileProps{
    user: UserProps
  }

const UserProfile = async(
    {user} :UserProfileProps
) => {
    const {userId,name,image,bio} = user;
  return (
    <div>
    <Card className="w-[600px]">
        <CardContent>
        {image ?(<Image className='p-10'
        src={image}
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
    

        <p>{name}</p>
        <p>{bio}</p>
        </CardContent>
   
    </Card>
    </div>
  )
}

export default UserProfile