
import { CoachProps } from '@/types'
import { redirect } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import { User } from 'lucide-react';
import Image from 'next/image';

interface CoachCardProps{
  coach :  CoachProps;
}

const CoachCard = ({coach}: CoachCardProps) => {
  const {coachid,name, rate, introduction, expertise,image} = coach;


  return (
    <div className="daisy-card w-96 bg-base-100 shadow-xl m-3" >
  <figure>
    {image ?(<Image
        src={image}
        width={500}
        height={333}
        alt='test'/>):
    (
      <Image
        src={"/profile-avatar.jpg"}
        width={500}
        height={333}
        alt='test'/>
    ) }
    
    </figure>
  <div className="daisy-card-body">
    <h2 className="daisy-card-title">
      {name}
      <div className="daisy-badge daisy-badge-primary">${rate}/month</div>
    </h2>
    <p>{introduction}</p>
    <div className="daisy-card-actions justify-end">
      {expertise.map((expertise,index)=>
      <div className="daisy-badge daisy-badge-outline" key={index}>{expertise}</div>)}
    </div>
    <div>
      <Link href={`coach/${coachid}`}>
        <Button>View more</Button>
      </Link>
      
    </div>
  </div>
</div>
  )
}

export default CoachCard