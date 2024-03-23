import { db } from "@/lib/db";

export const getPublicJournalEntriesbyUserId = async(userId : string) =>{
    try{
        const Entries = db.entry.findMany({
            where:{
                userId,
                privacy: false
            }
        })
        return Entries
    }catch{
        return false
    }
}

export const getJournalEntriesbyUserId = async(userId : string) =>{
    try{
        const Entries = db.entry.findMany({
            where:{
                userId,
            }
        })
        return Entries
    }catch{
        return false
    }
}