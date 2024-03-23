import { currentUser } from '@/lib/auth'
import { getAverageRatings } from '@/lib/utils';
import { redirect } from 'next/navigation';
import React from 'react'

const CoachDashboardPage = async() => {
  const session = await currentUser();
  if(!session?.coach){
    redirect('/coach/onboard');
  }
  const rating = await getAverageRatings(session.coach.id)
  return (
    <div>
      CoachDashboardPage
      <div className='grid grid-cols-2 p-3'>
        <div className="daisy-card w-96 bg-neutral text-neutral-content m-3">
        <div className="daisy-card-body items-center text-center">
          <h2 className="daisy-card-title">What my clients are saying!</h2>
          <p>$100</p>
        </div>
      </div>
      <div className="daisy-card w-96 bg-neutral text-neutral-content m-3">
        <div className="daisy-card-body items-center text-center">
          <h2 className="daisy-card-title">My rating</h2>
          <p>{rating}</p>
        </div>
      </div>
      </div>

    </div>
  )
}

export default CoachDashboardPage