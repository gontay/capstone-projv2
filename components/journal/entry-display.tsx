import { getJournalEntries, getPublicJournalEntries } from '@/lib/utils'
import { entryProps } from '@/types'
import React from 'react'
import EntryCard from './EntryCard'

interface EntryDisplayProp{
    userId: string
    type: "profile"|"public"
}

const Entrydisplay = async({userId, type = "public"}:EntryDisplayProp) => {
    console.log(userId)
    if(type==="public"){
        var entries : entryProps[] = await getPublicJournalEntries(userId)
    }
    if(type==="profile"){
        var entries : entryProps[] = await getJournalEntries(userId)
    }
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