'use server'
import * as z from "zod";
import {db} from "@/lib/db";
import { CoachUpdateSchema } from "@/schemas";
import supabase from "@/lib/supabase";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { getCoachByUserId } from "@/data/coach/coach";
import { UserRole } from "@prisma/client";

export const updateCoachDetails = async(values: z.infer<typeof CoachUpdateSchema>)=>{
    const user  = await currentUser();
    const validatedFields = CoachUpdateSchema.safeParse(values);
    if (!validatedFields.success){
        return {error : "Invalid fields"};
    }
    console.log("values:" , values)

    const {rate, introduction, expertises}= validatedFields.data;

    if (!user){
        return {error: "Unauthorized"}
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser){
        return {error: "Unauthorized"}
    }

    const userIsCoach = await getCoachByUserId(dbUser.id);

    await db.coach.update({
        where: {
            userId: dbUser.id,
        },
        data: {
            rate,
            introduction,
            areaOfExpertise: expertises,
            
        }
    })

        return {success: "Profile Updated!"}
}


