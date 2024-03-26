import { db} from "@/lib/db";
import { UserRole } from "@prisma/client";

export const getCoachByUserId = async(userId : string)=>{
    try{
        const user = await db.coach.findUnique({ where : {userId}});
        return user;
    }catch{
        return null;
    }
};

export const getCoachNameById = async(id : string)=>{
  try{
      const coachName = await db.coach.findUnique({ where : {id},
      select:{
        user:{
          select: {
            name: true
          }
        }
      }});
      return coachName;
  }catch{
      return null;
  }
};

export const getCoachProfileByCoachId = async(id : string)=>{
  try{
      const coach = await db.coach.findUnique({ where : {
        id: id,
      },
      select:{
        id:true,
        areaOfExpertise:true,
        introduction: true,
        coachType: true,
        rate: true,
        certification: true,
        certified: true,
        user:{
          select:{
            name:true,
            image:true ,
          }
        }
      },
      });
      console.log("dbcoach", coach)
      return coach;
  }catch{
      console.log("dbcoach", null)
      return null;
  }
};

export const getAllCoach = async() =>{
    try{
        const allCoaches= await db.user.findMany({
            where:{
                role: UserRole.COACH
            },
            select:{
              name: true,
              image: true,
              Coach:{
                select: {
                  id: true,
                  rate: true,
                  introduction: true,
                  areaOfExpertise: true
                }
              }
        
            },
          })
        return allCoaches;
    }catch{
        return null;
    }
}
