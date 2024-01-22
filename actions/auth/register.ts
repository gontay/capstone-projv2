'use server';
import bcrypt from "bcryptjs";
import * as z from "zod";
import {db} from "@/lib/db";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/auth/user";
import { generateVerficationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";


export const register = async(values: z.infer<typeof RegisterSchema>)=>{
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success){
        return {error : "Invalid fields"};
    }

    const {email, password, name} = validatedFields.data;
    const hashedPassword  = await bcrypt.hash(password, 10);

    const existingUser  = await getUserByEmail(email);

    if (existingUser){
        return{error: 'Email is already in use'};
    }

    await db.user.create({
        data:{
            name,
            email,
            password: hashedPassword,
        },
    });
    
    const verficationToken = await generateVerficationToken(email);
    await sendVerificationEmail(
        verficationToken.email,
        verficationToken.token,
    )

    return {success: "Registered Successfully confirmation email sent"};
}