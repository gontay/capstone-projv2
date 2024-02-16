"use server"
import {v4 as uuidv4} from "uuid";
import { currentUser } from "@/lib/auth";
import storage from "@/lib/supabase";
import { getUserById } from "@/data/auth/user";
import { db } from "@/lib/db";
import { update } from "@/auth";

export const uploadCertificate = async(formData: FormData) =>{
    const user  = await currentUser();

    if (!user){
        return {error: "Unauthorized"}
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser){
        return {error: "Unauthorized"}
    }

    const fileList: FileList = formData.getAll('fileList');
    
    for (const file of fileList){
        var fileId = uuidv4()
        const { data, error } = await storage
        .storage
        .from("capstone-project-certifications")
        .upload(user?.id+"/"+ fileId, file, {
            upsert: true
        });

        const url = storage
        .storage
        .from("capstone-project-certifications")
        .getPublicUrl(user?.id+"/"+fileId);
 

        const updatedUser = await db.coach.update({
            where:{
                userId: dbUser?.id,
            },
            data:{
                certification: {
                    push: url.data.publicUrl
                }
            },
            
        });
    }
    return {success: "Certifications sent for vetting!"}
}

