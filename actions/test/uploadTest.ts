"use server"
import storage from "@/lib/supabase";

export const uploadTest = async(file: any) => {
    const { data, error } = await storage
    .storage
    .from("capstone-project-test-upload")
    .upload("test",file);
}
