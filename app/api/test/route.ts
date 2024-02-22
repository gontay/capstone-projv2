import { NextResponse } from "next/server";
import storage from "@/lib/supabase";

export async function POST(request: Request ){
    const res = await request.json()
    var value  = JSON.stringify(res)
    console.log('this', value)

    const { data, error } = await storage
    .storage
    .from("capstone-project-test-bucket")
    .upload("file/something1.json", value, {
        upsert: true
    });


    return Response.json({res})
}

export async function GET(){
    const { data} = await storage
    .storage
    .from("capstone-project-test-bucket")
    .getPublicUrl("file/something1.json")
    
    console.log(data.publicUrl)
    const dta  = await fetch(data.publicUrl).then(res => res.json())
    console.log(dta)
    return NextResponse.json( dta , {status: 200})
}