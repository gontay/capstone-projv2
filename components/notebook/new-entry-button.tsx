import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import NewEntryForm from './new-entry-form';

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
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>
        {children}
      </DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <NewEntryForm notebookId={notebookId}/>
      </DialogContent>
    </Dialog>
  )
}

export default NewEntryButton