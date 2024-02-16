import { db } from "@/lib/db";

export const getNotebookEntriesbyNotebook= async(notebookId : string)=>{
    try{
        const notebookEntries = await db.notebookEntry.findMany({ where : {notebookId}});
        return notebookEntries;
    }catch{
        return null;
    }
};
