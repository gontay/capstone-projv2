import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const CoachDashboardPage = async() => {
  const session = await currentUser();
  if(!session?.coach){
    redirect('/coach/onboard');
  }
  return (
    <div>
      CoachDashboardPage
      <div className='grid grid-cols-2 p-3'>
        <div className="daisy-card w-96 bg-neutral text-neutral-content m-3">
        <div className="daisy-card-body items-center text-center">
          <h2 className="daisy-card-title">Money!</h2>
          <p>$100</p>
        </div>
      </div>
      <div className="daisy-card w-96 bg-neutral text-neutral-content m-3">
        <div className="daisy-card-body items-center text-center">
          <h2 className="daisy-card-title">Clients!</h2>
          <p>10</p>
        </div>
      </div>
      </div>

    </div>
  )
}

export default CoachDashboardPage