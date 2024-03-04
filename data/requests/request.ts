import { db} from "@/lib/db";
import { RequestStatus } from "@prisma/client";

export const getRequestByCoachId = async(coachId : string)=>{
    try{
        const allRequests = await db.request.findMany({
            where:{
                coachId: coachId,
                //requestStatus: RequestStatus.PENDING
            },
            select:{
                id: true,
                coachId: true,
                requestorId: true,
                message: true,
                requestStatus: true,
                requestor:{
                    select:{
                        name: true
                    }    
                }
            }
        })
        return allRequests
    }catch{
        return null;
    }
}


export const getExistingRequest = async(userId : string, coachId: string)=>{
    try{
        const allRequests = await db.request.findFirst({
            where:{
                AND:[
                    {requestorId: userId,},
                    {coachId: coachId}
                    ] 
            },
        })
        return allRequests
    }catch{
        return false;
    }
}