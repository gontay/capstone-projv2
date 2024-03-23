
import { ratingProps } from '@/types'
import React from 'react'
import RatingCard from './RatingCard'
import { getRatings } from '@/lib/utils'

interface ReviewDisplayProps{
    coachid: string
}
const ReviewDisplay = async({coachid}:ReviewDisplayProps) => {
  const ratings: ratingProps[] = await getRatings(coachid)
  return (
    <div className='grid grid-cols-1 gap-2 px-2'>
        {ratings[0] ? (
           <>
           {
             ratings.map((rating)=>
              <RatingCard content={rating} key={rating.id}/>)
          }
          </>
        ):(
          <p>No reviews yet</p>
        )}
    </div>
  )
}

export default ReviewDisplay