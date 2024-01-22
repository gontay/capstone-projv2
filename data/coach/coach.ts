import { db} from "@/lib/db";

export const getCoachByUserId = async(userId : string)=>{
    try{
        const user = await db.coach.findUnique({ where : {userId}});
        return user;
    }catch{
        return null;
    }
};