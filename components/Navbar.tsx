import { currentUser } from '@/lib/auth';
import { PersonStanding } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LoginButton } from './auth/login-button';
import { Button } from './ui/button';
import { UserButton } from './auth/user-button';

const Navbar = async() => {
    const user = await currentUser();
  return (
    <div className='bg-zinc-100 daisy-navbar sticky'>
        <div className='container flex items-center justify-between'>
        <Link href='/'><PersonStanding/></Link>
        {user ? (
            <div className='flex items-center justify-between'>
            <UserButton/>
            </div>
        ):( 
            <div>
            <LoginButton>
            <Button variant="link" className='mr-5'>Sign-up</Button>
            </LoginButton>
            <Link href="/auth/login">
            <Button variant="link" className='mr-5'>Log in</Button>
            </Link>
            </div>
        )}
        </div>
    </div>
  )
}

export default Navbar