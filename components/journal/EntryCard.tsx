import { entryProps } from '@/types'
import React from 'react'

interface EntryCardProps{
  entry: entryProps
}

const EntryCard = ({entry}:EntryCardProps) => {
  const {id, userId, title, content, dateTimeCreated, privacy } = entry

  return (
    <div className='daisy-card bg-slate-100 shadow-md'>
      <div className='daisy-card-body'>
        <div className='daisy-card-title'>
          {title}
        </div>
        <div>
        <p>{content}</p>
        </div>
        <div className='justify-end text-right'>
          <p className='text-xs'>Written on: {dateTimeCreated.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default EntryCard