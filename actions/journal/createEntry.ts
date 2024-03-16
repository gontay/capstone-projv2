'use server';

import * as z from "zod";
import {db} from "@/lib/db";
import { JournalEntrySchema } from "@/schemas";
import { currentUser } from "@/lib/auth";

export const CreateEntry= async(values: z.infer<typeof JournalEntrySchema>)=>{
    const user = await currentUser();
    const validatedFields = JournalEntrySchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "invalid fields"}
    }
    if(!user){
        return {error: "not authorised"}
    }
    
    const {title, content, privacy}= validatedFields.data;

    await db.entry.create({
        data:{
            userId: user?.id,
            title,
            content,
            privacy: privacy,
        }
    }
    )
    return {success: "Entry Added"}
}