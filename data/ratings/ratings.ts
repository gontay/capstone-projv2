import { db } from "@/lib/db"

export const getRatingsbyCoachid = async(coachId : string) =>{
    try{
        const ratings = db.rating.findMany({
            where:{
                coachId
            }
        })
        return ratings
    }catch{
        return false
    }
}

export const getAverageRatingByCoachId = async(coachId: string)=>{
    try{
        const ratings = await db.rating.aggregate({
            _avg:{rating:true},
            where:{coachId}
        })
        return ratings._avg.rating
    }catch{
        return false
    }
}