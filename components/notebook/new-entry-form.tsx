'use client'
import { Excalidraw } from '@excalidraw/excalidraw'
import React from 'react'
import ExcalidrawEntryEditor from './excalidraw-entry-editor'
import MdxEntryEditor from './mdx-entry-editor'
import TextEntryEditor from './text-entry-editor'


interface NewEntryFormProps{
    notebookId : string
    type: "MDX"|"TXT"|"excalidraw"
}

const NewEntryForm = ({
  notebookId,
  type
}:NewEntryFormProps) => {
  if(type === "excalidraw"){
    return (
      <div className='h-[500px] w-[500px] shadow-md rounded-sm'>
        <ExcalidrawEntryEditor/>
      </div>
    )
  }
  if(type === "MDX"){
    return (
      <div>
        <MdxEntryEditor/>
      </div>
    )
  }
  if(type === "TXT"){
    return (
      <div>
        <TextEntryEditor/>
      </div>
    )
  }
}

export default NewEntryForm