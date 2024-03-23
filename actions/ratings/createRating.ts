'use server';

import * as z from "zod";
import {db} from "@/lib/db";
import { RatingSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { checkCoachRelationship } from "@/lib/utils";
import { use } from "react";

export const CreateRating= async(values: z.infer<typeof RatingSchema>, coachId:string)=>{
    const user = await currentUser();
    const validatedFields = RatingSchema.safeParse(values);
   
    if(!validatedFields.success){
        return {error: "invalid fields"}
    }
    if(!user){
        return {error: "not authorised"}
    }
    const relationship = await checkCoachRelationship(coachId, user.id)
    if(relationship === false){
        return {error: "cannot review coach you have not worked with"}
    }
    const alrRated = await db.rating.findMany({
        where:{
                coachId: coachId,
                authorId: user.id
        }
    })

    if(alrRated.length > 0){
        return {error: "already reviewed coach"}
    }
    
    const {rating, review}= validatedFields.data;

    await db.rating.create({
        data:{
            coachId: coachId,
            authorId: user?.id,
            rating: rating,
            review: review,
        }
    }
    )
    return {success: "Rating Added"}
}