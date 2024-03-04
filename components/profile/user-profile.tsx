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
        <CardContent className=' flex items-center gap-2 p-2'>
          <div className='p-2'>
          {image ?(<Image className=''
        src={image}
        width={200}
        height={233}
        alt='test'/>):
        (
        <Image className=''
            src={"/profile-avatar.jpg"}
            width={200}
            height={233}
            alt='test'/>
        ) }
          </div>
        
        <div>
          <p className='text-2xl font-extrabold'>{name}</p>
          <div>
          {bio? (<p>{bio}</p>):
          (<p>{name} has not added a bio</p>)}
          </div>
        </div>
        <div className=''>{bio}</div>
        </CardContent>
   
    </Card>
    </div>
  )
}

export default UserProfile