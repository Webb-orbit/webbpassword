import React, { useEffect, useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { nanoid } from '@reduxjs/toolkit'

const Aicontent = ({ opener, setopener }) => {
    const [responsearr, setresponsearr] = useState([])
    const [promt, setpromt] = useState("")

    const apiKey = "AIzaSyD8nmI-MNBJg0ptoBXaWAflu5-6KAsMheU"
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", });
    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 100,
        responseMimeType: "text/plain",
    };

    const run = async()=> {
        const chatSession = model.startChat({
            generationConfig,
            history: responsearr,
        });

        try {
            const result = await chatSession.sendMessage(promt);
            if (result) {
                const resobj = [{
                    role: 'user',
                    parts: [{ text: promt }],
                },
                {
                    role: 'model',
                    parts: [{ text: result.response.text() }],
                }]
    
                setresponsearr(pre=>[...pre, ...resobj])
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className={` bottom-16 right-10 w-[40%] min-h-[50vh] max-h-[80vh] bg-neutral-950 rounded-md overflow-hidden overflow-y-scroll editor outline outline-1 outline-neutral-700 ${opener ? "fixed" : "hidden"}`}>

            <div className='flex p-2 z-10 sticky top-0 bg-neutral-900/20 backdrop-blur-sm justify-between items-start  text-[0.9rem]'>
                <p className=' w-[90%] font-medium capitalize poppins'>AI orbital</p>
                <div className=' flex items-center gap-6'>
                    <button onClick={() => setresponsearr([])} className='px-1 rounded-sm bg-neutral-800 outline outline-1 outline-neutral-700 uppercase text-[0.7rem]'>new</button>
                    <button onClick={() => setopener(false)} className="material-symbols-outlined">close</button>
                </div>
            </div>

            <div className='py-10 '>
                {responsearr.map((e) => (
                    <div key={nanoid()} className='flex items-end flex-col'>
                        <div className={`p-2 my-2 w-fit rounded-md  ${e.role == "model" && "max-w-[90%] group  relative"} ${e.role == "model" ? " bg-neutral-900" : "bg-neutral-800"}`}>
                            {e.role == "model" && <button className=' hidden  group-hover:block bg-black p-1 rounded-sm text-[0.9rem] absolute top-1 right-1 material-symbols-outlined'>content_copy</button>}
                            <p className=' whitespace-break-spaces'>{e.parts[0].text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className=' sticky bottom-0 w-full flex justify-stretch items-center px-2 bg-neutral-900'>
                <textarea onChange={(e) => setpromt(e.target.value)} value={promt} spellCheck="false" placeholder='ask ai anything' className=' editor  outline-none  bg-neutral-900 border-none resize-none w-full '></textarea>
                <button onClick={run} className='material-symbols-outlined'>send</button>
            </div>
        </div>
    )
}

export default Aicontent





