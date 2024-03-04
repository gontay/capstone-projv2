import TipTapEditor from '@/components/notebook/editor'
import UserProfile from '@/components/profile/user-profile'
import { getNotebookbyId, getUserProfile } from '@/lib/utils'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async({params}:any) => {
  //retreive notebook
  const notebook = await getNotebookbyId(params.id)
  const userProfile = await getUserProfile(notebook?.clientId)
  console.log("notebook",notebook)
  if(!notebook || !userProfile){
    redirect('/')
  }
  return (
    <div className='min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='border shadow-xl border-stone-200 rounded-lg p-4 flex items-center'>
          <UserProfile user={userProfile}/>
        <div className='h-4'></div>

        </div>
        <div className='border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full'>
          {notebook && <TipTapEditor notebook={notebook}/>}
        </div>
      </div>
    </div>
  )
}

export default page