import React from 'react'

interface NotebookEntryProps {
    id: string
    notebookId : string
    datetime : Date
    content: string
}

const NotebookEntry = ({
    id,
    notebookId,
    datetime,
    content,
}: NotebookEntryProps) => {
  return (
    <div>
      content: {content}
      posted on: {datetime.toLocaleTimeString()}
    </div>
  )
}

export default NotebookEntry