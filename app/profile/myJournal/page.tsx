import NewEntryDialog from '@/components/journal/NewEntryDialog'
import Entrydisplay from '@/components/journal/entry-display'
import ProfileSettingPage from '@/components/profile/update-profile-settings'
import ProfilePictureUpload from '@/components/profile/upload-profile-picture'
import { currentUser } from '@/lib/auth'
import React from 'react'

const MyJournalPage = async() => {
  const user = await currentUser();
  if(!user){
    return null
  }
  return (
    <div className='flex-row space-x-10'>
      <div className='flex space-x-80'>
      <h1 className='text-xl font-extrabold'>My Journal Entries</h1>
      <div className='text-right'>
          <NewEntryDialog/>
        </div>
      </div>
        
        <div className='daisy-divider min-w-full'></div>
        <div>
          <Entrydisplay userId={user?.id} type='profile'/>
        </div>
    </div>
  )
}

export default MyJournalPage