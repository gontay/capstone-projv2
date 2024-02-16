'use server'
import * as z from "zod";
import { CoachRejectSchema } from "@/schemas";
import { db } from "@/lib/db"
import { RequestStatus } from "@prisma/client"

export const RejectRequest= async(requestId: string, values: z.infer<typeof CoachRejectSchema>) => {

    await db.request.update({
        where:{
            id: requestId
        },
        data:{
            requestStatus: RequestStatus.REJECTED,
            rejectionReason : values.reason
        }
    })

    return {success: "done"}
}