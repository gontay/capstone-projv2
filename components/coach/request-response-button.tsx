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
import { UndoRequest } from '@/actions/coach/undoRequest'

interface RequestResponseButtonProps{
    type?: "Accept"| "Reject" |"Undo",
    variant?: "default"|"outline"|"link",
    className?: string
    requestId: string
}

const RequestResponseButton = ({
        type =  "Accept",
        className,
        variant = "default",
        requestId,
    }:RequestResponseButtonProps) => {
    const router = useRouter();
    const handleClick = () => {
        if(type === "Accept"){
            console.log(requestId)
            AcceptRequest(requestId).then((data)=> {
                if(data.error){
                    toast.error(data.error);
                    router.refresh();
                }
                if(data.success){
                    toast.success(data.success);
                    router.refresh();
                }
            });
        }
        if(type === "Undo"){
            console.log(requestId)
            UndoRequest(requestId).then((data)=> {
                if(data.error){
                    toast.error(data.error);
                    router.refresh();
                }
                if(data.success){
                    toast.success(data.success);
                    router.refresh();
                }
            });
        }
    }
    if(type === "Undo"){
        return (
        <Button className= {className} variant={variant} onClick={handleClick}>Undo</Button>
        )
    }

    if(type === "Accept"){
        return (
        <Button className= {className} variant={variant} onClick={handleClick}>Accept</Button>
        )
    }
    if(type === "Reject"){
        return (
            <Dialog>
        <DialogTrigger>
            <Button className= {className} variant={variant}>Reject</Button>
        </DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
            <RejectForm requestId={requestId}/>
        </DialogContent>
        </Dialog>
        )
    }
}

export default RequestResponseButton