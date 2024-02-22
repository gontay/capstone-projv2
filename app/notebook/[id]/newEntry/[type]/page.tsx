import NewEntryForm from '@/components/notebook/new-entry-form'
import React from 'react'

const EditorPage = async (params:any) => {
  return (
    <div>
    <NewEntryForm notebookId={params.params.id} type={params.params.type}/>
    </div>
  )
}

export default EditorPage