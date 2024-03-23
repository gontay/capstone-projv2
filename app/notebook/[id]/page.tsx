import TipTapEditor from '@/components/notebook/editor'
import UserProfile from '@/components/profile/user-profile'
import { Button } from '@/components/ui/button'
import { currentRole, currentUser } from '@/lib/auth'
import { getNotebookbyId, getUserProfile } from '@/lib/utils'
import { UserRole } from '@prisma/client'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async({params}:any) => {
  //retreive notebook
  const user= await currentUser();
  if(!user || user.role != UserRole.COACH){
    redirect("/")
  }
  const notebook = await getNotebookbyId(params.id)
  if(!notebook){
    redirect("/")
  }
  if(user?.coach.id != notebook.coachId){
    redirect("/")
  }
  const userProfile = await getUserProfile(notebook?.clientId)
  console.log("notebook",notebook)
  if(!notebook || !userProfile){
    redirect('/')
  }
  return (
    <div className='min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='border shadow-xl border-stone-200 rounded-lg p-4 flex items-center space-x-5 '>
          <UserProfile user={userProfile}/>
          <Link href={`/profile/${notebook.clientId}`}><Button>View Profile</Button> </Link>
        <div className='h-4'></div>

        </div>
        <div className='border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full'>
          {notebook && <TipTapEditor notebook={notebook} client={userProfile}/>}
        </div>
      </div>
    </div>
  )
}

export default page