import RequestDisplay from '@/components/coach/request-display'
import { currentUser } from '@/lib/auth'
import React from 'react'

const ClientRequestPage= async() => {
  const user = await currentUser();
  return (
    <div>
      <RequestDisplay coachId={user?.coach.id||''}/>
    </div>
  )
}

export default ClientRequestPage