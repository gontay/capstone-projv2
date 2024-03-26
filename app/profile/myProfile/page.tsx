import CoachDisplay from '@/components/profile/coach-display'
import ClientRequestDisplay from '@/components/profile/request-display'
import ProfileSettingPage from '@/components/profile/update-profile-settings'
import ProfilePictureUpload from '@/components/profile/upload-profile-picture'
import React from 'react'

const MyProfilePage = () => {
  return (
    <div className='grid 2xl:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 grid-cols-1 space-x-2 space-y-2'>
        <ProfilePictureUpload/>
        <ProfileSettingPage/>
        <CoachDisplay/>
        <ClientRequestDisplay/>
    </div>
  )
}

export default MyProfilePage