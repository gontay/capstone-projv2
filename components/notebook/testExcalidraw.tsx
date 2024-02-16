'use client'
import { useState, useEffect } from "react"
import {Excalidraw} from "@excalidraw/excalidraw"


const TestExcalidraw =  ()=>{
    //const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null)

    return (
        <div className="flex">
            <div className="w-[500px] h-[570px]">
                <Excalidraw
                    
                />

                
            </div>

        </div>
    )
}

export default TestExcalidraw