import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const body = await req.json();
        const {notebookId, editorState} = body
        
        if (!editorState || !notebookId ){
            return new NextResponse('Missing notebook', {status: 400})
        }
        
        const dbnote  = await db.notebook.findUnique({
            where: {
                id: notebookId
            },
            select:{
                editorState: true
            }
        })

        if (dbnote !== editorState){
            await db.notebook.update({
                where: {
                    id: notebookId,
                },
                data:{
                    editorState: editorState
                }
            })
            // .then(()=>console.log("test",editorState))
        }

        return NextResponse.json({
            success: true
        }, {status: 200})
    }catch (error){
        return NextResponse.json({
            success: false
        }, {status: 500})
    }  
}