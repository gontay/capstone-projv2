'use server'

import { db } from "@/lib/db"
import { getClientNotebooks, getCoachNotebooks } from "@/lib/utils"
import { RequestStatus } from "@prisma/client"

export const AcceptRequest= async(requestId: string) => {
    const updatedRequest = await db.request.update({
        where:{
            id: requestId
        },
        data:{
            requestStatus: RequestStatus.APPROVED
        }
    })
    console.log(updatedRequest.coachId)
    const ExistingCoachNotebooks = await getCoachNotebooks(updatedRequest.coachId);
    const ExistingClientNotebooks = await getClientNotebooks(updatedRequest.requestorId);
    if(ExistingClientNotebooks?.find((Notebook) => Notebook.coachId === updatedRequest.coachId) && ExistingCoachNotebooks?.find((Notebook) => Notebook.clientId === updatedRequest.requestorId)){
        return {error:  "something went wrong"}
    }
    const newNotebook = await db.notebook.create({
        data:{
          clientId: updatedRequest.requestorId,
          coachId: updatedRequest.coachId,
        },
    })
        return {success: "Client Accepted"}
}