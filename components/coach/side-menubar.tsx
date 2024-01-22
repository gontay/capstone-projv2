import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { auth } from '@/auth'
import { currentUser } from '@/lib/auth'
import { User } from 'lucide-react'



const SideMenubar = async() => {
    const user = await currentUser();
  return (
    <ul className="daisy-menu bg-base-200 w-56 h-full">
  <li>
    <div>
        <Link href={`/coach/dashboard`}>
        <Avatar>
            <AvatarImage src={user?.image} alt="@shadcn"/>
            <AvatarFallback className="bg-slate-400">
                        <User className="text-white"/>
                    </AvatarFallback>
        </Avatar>
        <h2 className="daisy-menu-title">{user?.name}</h2>
        </Link>
    </div>
    <ul>
      <li><a>Update Details</a></li>
      <li><a>Get Certified</a></li>
      <li><a>Schedule</a></li>
      <li><a>Clients</a></li>
      <li><a>Notes</a></li>
    </ul>
  </li>
</ul>
  )
}

export default SideMenubar