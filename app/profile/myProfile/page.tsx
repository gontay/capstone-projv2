import CoachDisplay from '@/components/profile/coach-display'
import ProfileSettingPage from '@/components/profile/update-profile-settings'
import ProfilePictureUpload from '@/components/profile/upload-profile-picture'
import React from 'react'

const MyProfilePage = () => {
  return (
    <div>
        <ProfileSettingPage/>
        <ProfilePictureUpload/>
        <CoachDisplay/>
    </div>
  )
}

export default MyProfilePage