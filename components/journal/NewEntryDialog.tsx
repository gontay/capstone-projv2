import React from 'react'
import { Dialog, DialogTrigger,DialogContent, DialogClose, DialogFooter  } from '../ui/dialog'
import { Button } from '../ui/button'
import NewEntryForm from './new-entry-form'

const NewEntryDialog = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>New Entry</Button>
        </DialogTrigger>
        <DialogContent>
          <NewEntryForm/>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NewEntryDialog