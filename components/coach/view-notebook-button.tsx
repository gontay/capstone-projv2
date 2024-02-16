import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'


interface ViewNotebookButtonProps{
    notebookId: string
}

const ViewNotebookButton = (
    {notebookId}: ViewNotebookButtonProps
) => {
  return (
    <Link href={`/notebook/${notebookId}`}><Button>View NoteBook</Button></Link>
  )
}

export default ViewNotebookButton