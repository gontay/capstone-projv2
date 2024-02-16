'use client'
import { Check, X } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import RequestForm from './request-form'
import RejectForm from './reject-form'
import { AcceptRequest } from '@/actions/coach/acceptRequest'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface RequestResponseButtonProps{
    type?: "Accept"| "Reject",
    requestId: string
}

const RequestResponseButton = ({
        type =  "Accept",
        requestId,
    }:RequestResponseButtonProps) => {
    const router = useRouter();
    const handleClick = () => {
        if(type === "Accept"){
            console.log(requestId)
            AcceptRequest(requestId).then((data)=> {
                if(data.error){
                    toast.error(data.error);
                }
                if(data.success){
                    toast.success(data.success);
                    router.refresh();
                }
            });
        }
    }

    if(type === "Accept"){
        return (
        <Button className='bg-emerald-600' onClick={handleClick}><Check className='text-white'/></Button>
        )
    }
    if(type === "Reject"){
        return (
            <Dialog>
        <DialogTrigger>
            <Button className='bg-red-600'><X className='text-white'/></Button>
        </DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
            <RejectForm requestId={requestId}/>
        </DialogContent>
        </Dialog>
        )
    }
}

export default RequestResponseButton