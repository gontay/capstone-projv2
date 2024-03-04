import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any){
    const {params} = context;
    try{
        const notebookId = params.notebookId
        //console.log(notebookId)
        const dbnote  = await db.notebook.findUnique({
            where: {
                id: notebookId
            },
            select:{
                editorState: true
            }
        })
        // console.log(dbnote)
        const test = NextResponse.json(
            dbnote
        ,{status: 200})
        console.log(test)
        return test
    }catch(error){
        return NextResponse.json({
            success: false
        }, {status: 500})
    }
}