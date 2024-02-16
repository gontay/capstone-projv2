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

interface CoachProfileProps{
  coach: CoachProps
}

const CoachProfile = async (
  {coach} : CoachProfileProps
) => {
  const {coachid ,name, rate, introduction, expertise, image} = coach;
  const user = await currentUser();
  if(user?.role === UserRole.COACH){
    if(user.coach.id === coachid){
      redirect('/coach/dashboard');
    }
  }
  return (
        <div>
          <Avatar>
                    <AvatarImage src={image||""}/>
                    <AvatarFallback className="bg-slate-400">
                        <User className="text-white"/>
                    </AvatarFallback>
                    
                </Avatar>Name: {name}
          <p>rate: {rate}</p>
          <p>Introduction {introduction}</p>
          <div>Expertise: {expertise.map((expertise,index)=>
          <div className="daisy-badge daisy-badge-primary m-2" key={index}>{expertise}</div>)}</div>
          {user ? (
                      <CoachRequestButton coachId={coachid}>
                      <Button>Request</Button>
                      </CoachRequestButton>
          ):(
            <Link href="/auth/login"><Button>Log in to send a request</Button></Link>
          )}

        </div>
  )

}

export default CoachProfile