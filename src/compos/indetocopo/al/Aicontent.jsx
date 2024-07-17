import { useEffect, useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { nanoid } from '@reduxjs/toolkit'
import Aiaettings from './Aiaettings'
import Clientbase from '../../../appwrite/client'
import { useSelector } from 'react-redux'
import { decodetoplain } from '../../../hooks/usecodetoplain'

const Aicontent = ({ opener, setopener}) => {
    const [responsearr, setresponsearr] = useState([])
    const [promt, setpromt] = useState("")
    const [loading, setloading] = useState(false)
    const [copyed, setcopyed] = useState(false)
    const [aisetting, setaisetting] = useState(false)
    const [notice, setnotice] = useState("")
    const { userdata } = useSelector(state => state.track)
    const { runer } = useSelector(state => state.updatetodolist)
    const [geminikey, setgeminikey] = useState("")
    const [clientdata, setclientdata] = useState({})


    const genAI = new GoogleGenerativeAI(geminikey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", });
    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 100,
        responseMimeType: "text/plain",
    };

    const run = async () => {
        try {
            setloading(true)
            const chatSession = model.startChat({
                generationConfig,
                history: responsearr,
            });
            await chatSession.sendMessage(promt);
            setresponsearr([...responsearr])
            setpromt("")
        } catch (error) {
            setcopyed(true)
            setnotice("something wrong")
            console.log(error);
        } finally {
            setloading(false)
            setTimeout(() => {
                setcopyed(false)
            }, 1200);
        }
    }

    const copyres = (id) => {
        setnotice("copy it")
        setcopyed(true)
        let copypara = responsearr[id].parts[0].text
        navigator.clipboard.writeText(copypara)
        setTimeout(() => {
            setcopyed(false)
        }, 900);
    }

    const newchat = () => {
        setresponsearr([])
        setpromt("")
    }

    const haveapikey = async () => {
        try {
            console.log("userdate", userdata);
            const haveapi = (await Clientbase.getclientbyuserid(userdata)).documents[0]
            console.log("haveapi", haveapi);
            if (haveapi.data !== null) {
                console.log("insite");
                const decode = decodetoplain(haveapi.data, haveapi.code)
                if(decode){
                    setgeminikey(decode)
                }
            } else {
                console.log("not have genimi")
                setaisetting(true)
            }
            setclientdata(haveapi)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        haveapikey()
    }, [runer])

    return (
        <div className={` bottom-16 right-10 w-[40%] min-h-[50vh] max-h-[80vh] bg-neutral-950 rounded-md overflow-hidden overflow-y-scroll editor flex flex-col justify-between outline outline-1 outline-neutral-500 ${opener ? "fixed" : "hidden"} max-sm:max-h-[60vh] max-sm:bottom-2 max-sm:w-[99%] max-sm:right-0`}>

            <div className='flex px-2 py-3 z-10 sticky  top-0 bg-neutral-900/70 backdrop-blur-sm justify-between items-center  text-[0.9rem]'>
                <p className=' w-[90%] font-medium capitalize poppins'>AI orbital</p>
                <div className=' flex items-center gap-6'>
                    <button onClick={newchat} className='px-1 rounded-sm bg-neutral-800 outline outline-1 outline-neutral-700 hover:bg-neutral-900 duration-75 text-nowrap uppercase text-[0.7rem]'>new chat</button>
                    <button onClick={() => setaisetting(pre => !pre)} className=" bg-neutral-800 p-1 hover:bg-black duration-150 rounded-full text-[1rem] material-symbols-outlined">settings</button>
                    <button onClick={() => setopener(false)} className="material-symbols-outlined">close</button>
                </div>
            </div>
    {aisetting && clientdata && <Aiaettings open={aisetting} setopen={setaisetting} data={clientdata} />}
            {copyed && <div className=' sticky z-20 select-none top-14 self-center px-3 py-1 rounded-sm bg-green-500 text-black capitalize font-semibold text-[0.9rem]'>
                {notice}
            </div>}
            <div className='py-10 '>
                {responsearr.map((e, i) => (
                    <div key={nanoid()} className='flex items-end flex-col'>
                        <div className={`p-2 m-2 w-fit max-w-[90%] rounded-md  ${e.role == "model" && " group  relative"} ${e.role == "model" ? " bg-neutral-900" : "bg-blue-600"}`}>
                            {e.role == "model" && <button onClick={() => copyres(i)} className=' hidden  group-hover:block bg-black p-1 rounded-sm text-[0.9rem] absolute top-1 right-1 material-symbols-outlined'>content_copy</button>}
                            <p className={` selection:text-white ${e.role == "model" ? " text-neutral-200" : "text-white"} whitespace-break-spaces`}>{e.parts[0].text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className=' sticky bottom-0 w-full flex justify-stretch items-center px-2 bg-neutral-950 border-t-2'>
                {loading && <div className="loader absolute bottom-20"></div>}
                <textarea onChange={(e) => setpromt(e.target.value)} value={promt} spellCheck="false" placeholder='ask ai anything' className=' editor placeholder:capitalize placeholder:text-[0.8rem]  outline-none py-1  bg-neutral-950 border-none resize-none w-full '></textarea>
                <button onClick={run} className='material-symbols-outlined'>send</button>
            </div>
        </div>
    )
}

export default Aicontent





