'use client';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { BookUser, BookUserIcon, Mail, Target } from 'lucide-react';
import { LoginButton } from './auth/login-button';
import { useCurrentUser } from '@/hooks/use-current-user';

const Hero = () => {
    const user = useCurrentUser();
    const handleScroll = () => {
        const nextSection = document.getElementById("discover");
        
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
          }
    }
  return (
    <div className="daisy-hero min-h-screen" style={{backgroundImage:'url(/hero-bg.jpg)'}}>
       <div className='daisy-hero-overlay bg-opacity-75'></div>
       <div className='daisy-hero-content flex-col text-neutral-content'>
            <div>
                <h1 className='text-5xl font-bold'>
                    Get to where you want in life
                </h1>
                <p className='py-6'>
                    Find the right coach and mentor
                    to reach your goals.
                </p>
                {user ? (
                    <>
                        <Button className='bg-blue-500 mr-5 hover:bg-blue-950' onClick={handleScroll}><BookUserIcon className="mr-2 h-4 w-4" />Browse Coaches</Button>
                    </>
                ):(
                    <>
                    
                    <Link href="/auth/register">
                    <Button className='bg-blue-500 mr-5 hover:bg-blue-950'><Target className="mr-2 h-4 w-4" /> Get Started</Button>
                    </Link>
                    <Button className='bg-blue-500 mr-5 hover:bg-blue-950' onClick={handleScroll}><BookUserIcon className="mr-2 h-4 w-4" />Browse Coaches</Button>
                    </>
                )}
                
                
            </div>

        </div>
    </div>
  )
}

export default Hero