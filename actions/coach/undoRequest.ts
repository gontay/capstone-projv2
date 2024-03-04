'use server'

import { db } from "@/lib/db"
import { getClientNotebooks, getCoachNotebooks } from "@/lib/utils"
import { RequestStatus } from "@prisma/client"

export const UndoRequest= async(requestId: string) => {
    const dbrequest =await db.request.findUnique({
        where: {
            id: requestId
        }
    })
    if (!dbrequest){
        return {error: "no such request"}
    }
    if (dbrequest.requestStatus === RequestStatus.PENDING){
        return {error: "Request not responded"}
    }
    const updatedRequest = await db.request.update({
        where:{
            id: requestId
        },
        data:{
            requestStatus: RequestStatus.PENDING
        }
    })
    console.log(updatedRequest.coachId)
    const ExistingCoachNotebooks = await getCoachNotebooks(updatedRequest.coachId);
    const ExistingClientNotebooks = await getClientNotebooks(updatedRequest.requestorId);
    if(ExistingClientNotebooks?.find((Notebook) => Notebook.coachId === updatedRequest.coachId) && ExistingCoachNotebooks?.find((Notebook) => Notebook.clientId === updatedRequest.requestorId)){
        await db.notebook.deleteMany({
            where: {
                AND: {
                coachId: ExistingClientNotebooks[0]?.coachId,
                clientId: ExistingClientNotebooks[0]?.clientId
            }
            }
                
        })
    }
        return {success: "done"}
}