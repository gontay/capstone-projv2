'use server'
import * as z from "zod";
import { CoachRejectSchema } from "@/schemas";
import { db } from "@/lib/db"
import { RequestStatus } from "@prisma/client"
import { getClientNotebooks, getCoachNotebooks } from "@/lib/utils";

export const RejectRequest= async(requestId: string, values: z.infer<typeof CoachRejectSchema>) => {

    const updatedRequest = await db.request.update({
        where:{
            id: requestId
        },
        data:{
            requestStatus: RequestStatus.REJECTED,
            rejectionReason : values.reason
        }
    })
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