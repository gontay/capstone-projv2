import NewEntryButton from '@/components/notebook/new-entry-button'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const NotebookPage = async({params}:any) => {

  return (
    <div>page {params.id}
    <NewEntryButton notebookId={params.id}><Button>CreateEntry<Plus/></Button></NewEntryButton>
    </div>
  )
}

export default NotebookPage