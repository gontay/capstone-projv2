"use server"
import {v4 as uuidv4} from "uuid";
import { currentUser } from "@/lib/auth";
import storage from "@/lib/supabase";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { update } from "@/auth";

export const testBuckets = async(formData: FormData) =>{
    const user  = await currentUser();
    if (!user){
        return {error: "Unauthorized"}
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser){
        return {error: "Unauthorized"}
    }

    const file = formData.get("image");
    const imageId = uuidv4()
    console.log("file",file);

    const { data, error } = await storage
    .storage
    .from("capstone-project-avatars")
    .upload(user?.id+"/"+ imageId, file, {
        upsert: true
    });

    const url = storage
    .storage
    .from("capstone-project-avatars")
    .getPublicUrl(user?.id+"/"+imageId);

    console.log(url.data.publicUrl);

    const updatedUser = await db.user.update({
        where:{
            id: dbUser?.id,
        },
        data:{
            image: url.data.publicUrl
        },
        
    });

    update({
        user: {
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            image: updatedUser.image
        }
    })

}
