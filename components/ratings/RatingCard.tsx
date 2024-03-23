import { ratingProps } from '@/types'
import React from 'react'

interface RatingCardProps{
    content: ratingProps
  }

const RatingCard = ({content}: RatingCardProps) => {
    const {id,authorId,coachId,rating, review} = content
    return (
    <div className='daisy-card bg-white shadow-md'>
      <div className='daisy-card-body'>
        <div className='daisy-card-title'>
        <p>{review}</p>
        </div>
        <div className='justify-end text-right'>
        <p className='text-sm'>{rating}/5</p>
        </div>
        </div>
    </div>
  )
}

export default RatingCard