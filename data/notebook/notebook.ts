import { db} from "@/lib/db";
import exp from "constants";


export const getNotebookByClientId = async(clientId : string)=>{
    try{
        const userNotebooks = await db.notebook.findMany({ where : {clientId}});
        return userNotebooks;
    }catch{
        return null;
    }
};

export const getNotebookByCoachId = async(coachId : string)=>{
  try{
      const coachNotebooks = await db.notebook.findMany({ where : {coachId}});
      return coachNotebooks;
  }catch{
      return null;
  }
};

export const getClientsByCoachId = async(coachId : string)=>{
    try{
        const clients = await db.notebook.findMany({ where : {coachId: coachId},
        select:{
            id:true,
            clientId: true,
            client:{
                select:{
                    name:true,
                    image: true,
                    bio: true,
                }
            }
        }});
        return clients;
    }catch{
        return null;
    }
  };
  
  export const getNotebookById = async(id : string)=>{
    try{
        const notebook = await db.notebook.findUnique({ where: {id}});
        return notebook;
    }catch{
        return null;
    }
};
