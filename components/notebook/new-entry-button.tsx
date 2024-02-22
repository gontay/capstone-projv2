
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import NewEntryForm from './new-entry-form';
import { Button } from '../ui/button';
import Link from 'next/link';

interface NewEntryButtonProps {
    notebookId : string
    children: React.ReactNode;
    asChild? :  boolean;

}

const NewEntryButton = ({
    notebookId,
    children,
    asChild,
}:NewEntryButtonProps) => {
  const editorTypes = ["MDX","TXT","excalidraw" ]
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>
        {children}
      </DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <Link href={`/notebook/${notebookId}/newEntry/${editorTypes[0]}`}><Button>Markdown Editor</Button></Link>
        <Link href={`/notebook/${notebookId}/newEntry/${editorTypes[1]}`}><Button>Plaintext Editor</Button></Link>
        <Link href={`/notebook/${notebookId}/newEntry/${editorTypes[2]}`}><Button>Free drawn Editor</Button></Link>
      </DialogContent>
    </Dialog>
  )
}

export default NewEntryButton