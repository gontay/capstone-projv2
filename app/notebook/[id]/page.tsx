import NewEntryButton from '@/components/notebook/new-entry-button'
import { Button } from '@/components/ui/button'
import { getNotebookEntriesbyNotebook } from '@/data/notebookEntry/notebookEntry'
import { Plus } from 'lucide-react'
import React from 'react'

const NotebookPage = async({params}:any) => {
  const entries = await getNotebookEntriesbyNotebook(params.id)

  return (
    <div>
      {entries ? (
        <p>No Entries.</p>
      ):(
        <p>something</p>
      )}
    
    <div>
    <NewEntryButton notebookId={params.id}><Button>Create Entry<Plus/></Button></NewEntryButton>
    </div>
    </div>
  )
}

export default NotebookPage