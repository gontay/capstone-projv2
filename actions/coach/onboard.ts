'use server'
import * as z from "zod";
import {db} from "@/lib/db";
import { CoachOnboardSchema } from "@/schemas";
import supabase from "@/lib/supabase";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { getCoachByUserId } from "@/data/coach/coach";
import { UserRole } from "@prisma/client";

export const onboard = async(values: z.infer<typeof CoachOnboardSchema>)=>{
    const user  = await currentUser();
    const validatedFields = CoachOnboardSchema.safeParse(values);
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

    if (userIsCoach){
        return {error: "User already is a coach contact support for assistance"}
    }

    await db.coach.create({
        data: {
            userId: dbUser.id,
            rate,
            introduction,
            areaOfExpertise: expertises,
            
        }
    })

    const userCoach = await db.user.update({
        where:{
            id: dbUser.id
        },
        data:{
            role: UserRole.COACH,
        }
    })

        return {success: "Coach Profile Created"}
}


