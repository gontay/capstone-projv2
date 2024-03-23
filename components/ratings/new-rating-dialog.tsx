import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import NewRatingForm from './new-rating-form'

interface NewRatingDialogProps{
    coachId: string
}

const NewRatingDialog = ({coachId}: NewRatingDialogProps) => {


  return (
    <Dialog>
        <DialogTrigger>
          <Button>Review</Button>
        </DialogTrigger>
        <DialogContent>
          <NewRatingForm coachId={coachId}/>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default NewRatingDialog