import { getJournalEntries } from '@/lib/utils'
import { entryProps } from '@/types'
import React from 'react'
import EntryCard from './EntryCard'

interface EntryDisplayProp{
    userId: string
}

const Entrydisplay = async({userId}:EntryDisplayProp) => {
    console.log(userId)
    const entries : entryProps[] = await getJournalEntries(userId)
    console.log("entries", entries)
  return (
    <div className='grid grid-cols-1 gap-2 px-2'>
        {entries[0] ? (
            <>
             {
                entries.map((entry)=>
                <EntryCard entry={entry} key={entry.id}/>)
            }
            </>
        ):(
            <div>
                No Entries Created
            </div>
        )}
    </div>
  )
}

export default Entrydisplay