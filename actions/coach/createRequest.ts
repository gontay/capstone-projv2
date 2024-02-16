'use server'
import * as z from "zod";
import {db} from "@/lib/db";
import { CoachRequestSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { getCoachById } from "@/data/coach/coach";
import { RequestStatus, UserRole } from "@prisma/client";
import { error } from "console";
import { getExistingRequest, getRequestByCoachId } from "@/data/requests/request";

export const createRequest = async(values: z.infer<typeof CoachRequestSchema>, coachId : string)=>{
    const user  = await currentUser();
    const validatedFields = CoachRequestSchema.safeParse(values);
    if (!validatedFields.success){
        return {error : "Invalid fields"};
    }

    if (!user){
        return {error: "Account Required! Please create account"}
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser){
        return {error: "Unauthorized"}
    }
    console.log("coach",coachId)
    console.log("user", user.id)
    const existingRequest = await getExistingRequest( user.id, coachId)
    if(!existingRequest){
        await db.request.create({
            data:{
                requestorId : user.id,
                coachId: coachId,
                message: values.message,
                requestStatus: RequestStatus.PENDING,
            }
        })
    
        return {success: "Request has been sent to coach! Pending approval."}
    }
    return {error: "Request already exists. Please contact support"}
    
}