import { CoachProps } from '@/types'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User } from 'lucide-react';
import CoachRequestButton from './request-button';
import { Button } from '../ui/button';
import { currentUser } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';
import NewRatingDialog from '../ratings/new-rating-dialog';
import { checkCoachRelationship } from '@/lib/utils';
import ReviewDisplay from '../ratings/ReviewDisplay';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';

interface CoachProfileProps{
  coach: CoachProps
}

const CoachProfile = async (
  {coach} : CoachProfileProps
) => {
  const {coachid ,name, rate, introduction, expertise, image} = coach;
  var relationship = false
  const user = await currentUser();
  if(user){
    const GotRelationship = await checkCoachRelationship(coachid, user?.id)
    if(GotRelationship){
      relationship = true;
    }
  }
  if(user?.role === UserRole.COACH){
    if(user.coach.id === coachid){
      redirect('/coach/dashboard');
    }
  }
  
  return (
    <>
    <Card className="w-[600px]">
      <CardContent className=' flex items-center gap-2 p-2'>
           {image ?(<Image className='rounded-md'
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
        <div>
        <p>Name: {name}</p>
          <p>rate: {rate}</p>
          <p>Introduction: {introduction}</p>
          <div>Expertise: {expertise.map((expertise,index)=>
          <div className="daisy-badge daisy-badge-primary m-2" key={index}>{expertise}</div>)}</div>
        </div>
         
          {user && !relationship &&
                      <CoachRequestButton coachId={coachid}>
                      <Button>Request</Button>
                      </CoachRequestButton>}
          {!user && <Link href="/auth/login"><Button>Log in to send a request</Button></Link>}
        {relationship ? (
          <NewRatingDialog coachId={coachid}/>
          )
        :(
          <></>
        )}
      </CardContent>
        
      </Card>
        <div className='daisy-divider'></div>
        <div className='space-y-3'>
        <h2 className='font-semibold'>What people are saying about {coach.name}</h2>
        <ReviewDisplay coachid={coachid}/>
        </div>
    </>
    
        
  )
}

export default CoachProfile