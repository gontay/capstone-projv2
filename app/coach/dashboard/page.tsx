import ReviewTable from '@/components/coach/review-table';
import { currentUser } from '@/lib/auth'
import { getAverageRatings, getRatings } from '@/lib/utils';
import { ratingProps } from '@/types';
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
      <div className='grid grid-cols-1 text-center p-3 space-x-2 space-y-2'>
        
        <div className="daisy-card w-96 bg-slate-100 shadow-lg">
        <div className="daisy-card-body items-center text-center">
          <h2 className="daisy-card-title">My rating</h2>
          {rating ? (
        <div>
        {rating}/5
        </div>):(
          <div>
            no rating yet
          </div>
        )}
        </div>
      </div>
      <ReviewTable/>
      </div>
      </div>
  )
}

export default CoachDashboardPage