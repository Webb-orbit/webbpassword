import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Dataserv from '../appwrite/Data'
import Loading from './Loading'
import { useDispatch} from 'react-redux'
import { changeshare, showtost } from '../store/Storeslice'
import { usecretecode } from '../hooks/usedecode'
import { decodetoplain } from '../hooks/usecodetoplain'
import { textformater } from '../hooks/usetexteff'
import { motion } from 'framer-motion'
import Auth from '../appwrite/Auth'
import Screenloader from './Screenloader'

const Inditodo2 = () => {
    const { slug, userid } = useParams()
    const disp = useDispatch()
    const nevi = useNavigate()
    const [fetchedata, setfetchedata] = useState(null)
    const [areavalue, setareavalue] = useState('')
    const [toggledit, settoggledit] = useState(true)
    const [letters, setletters] = useState(0)
    const arearef = useRef(null)
    const [unsaved, setunsaved] = useState(false)
    const [databasecontent, setdatabasecontent] = useState("")
    const [userids, setuserids] = useState("")
    const [uploading, setuploading] = useState(false)


    const fetchtodo = async () => {
        try {
            const useris = await Auth.getcurrentacc()
            const id = await useris.$id
            setuserids(id)

            if (id == userid) {
                const data = await Dataserv.gettodo(slug)
                setfetchedata(data)
                let darkcomp = decodetoplain(data.content, data.code)
                let formatedtext = textformater(data.content)
                setdatabasecontent(darkcomp)
                setareavalue(formatedtext)
                data.content == ""?settoggledit(false):null
                setTimeout(()=>{setareavalue(darkcomp)},100)
            }else{
                nevi("/error")
                disp(showtost({ "display": true, "mass": "Invalid Argument", icon: 'error', bg: "bg-red-500", time: '1500' }))
            }

        } catch (error) {
            nevi("/")
            disp(showtost({ "display": true, "mass": "page not found", icon: 'error', bg: "bg-red-500", time: '1500' }))
        }
    }

    const savetarget = async () => {
        try {
            if (letters > 50000) {
                disp(showtost({ "display": true, "mass": "content overloaded", icon: 'full_stacked_bar_chart', bg: "bg-red-500", time: '1000' }))
            } else {
            setuploading(true)
            const dd = await usecretecode(areavalue, slug)
                const chack = await Dataserv.shbylikedouserid(userids,fetchedata.$id)
                const savedata = await Dataserv.updatetodo(fetchedata.$id, { content: dd })
                // start here
                if (chack.documents.length > 0 && chack.documents[0].autoupdate && savedata) {
                    const updatepage = await Dataserv.updateshare(chack.documents[0].$id, {"sharedtodo": JSON.stringify(savedata)})
                    if (updatepage) {
                        await fetchtodo()
                        settoggledit(true)
                        setunsaved(false)
                        setuploading(false)
                        disp(showtost({ "display": true, "mass": "todo and share page updated", icon: 'save', bg: "bg-green-500", time: '2000' }))
                    }
                }else{
                    if (savedata) {
                        await fetchtodo()
                        settoggledit(true)
                        setunsaved(false)
                        setuploading(false)
                        disp(showtost({ "display": true, "mass": "save", icon: 'save', bg: "bg-green-500", time: '1500' }))
                    }
                }
            }
        } catch (error) {
            settoggledit(true)
            setunsaved(false)
            setuploading(false)
            disp(showtost({ "display": true, "mass": "an error accourd", icon: 'error', bg: "bg-red-400", time: '1500' }))
        }
    }

    const deletetodo = async () => {
        try {
            
            if (fetchedata.shared) {
                const shares = await Dataserv.sharesbyid(fetchedata.colluserid)
                const byid = await shares.documents
                const targetsh = byid.filter((e) => {
                    let pars = JSON.parse(e.sharedtodo)
                  return pars.$id == fetchedata.$id
                })
                const deleteedshared = targetsh[0].$id
                const deletetarget = await Dataserv.deletetodo(fetchedata.$id)
                const detshare = await Dataserv.deleteshare(deleteedshared)

                if (deletetarget && detshare) {
                    nevi("/")
                    disp(showtost({ "display": true, "mass": "share link and target both deleted", icon: 'delete', bg: "bg-black", time: '2000' }))
                }
            }else{
                const deletetarget = await Dataserv.deletetodo(fetchedata.$id)
                if (deletetarget) {
                    nevi("/")
                    disp(showtost({ "display": true, "mass": "target deleted", icon: 'delete', bg: "bg-red-400", time: '1500' }))
                }

            }

        } catch (error) {
            disp(showtost({ "display": true, "mass": "an error accourd", icon: 'error', bg: "bg-red-400", time: '1500' }))
        }
    }

    const gospeech = ()=>{
        try {
            nevi(`/${userids}/speech/${fetchedata.$id}`)
        } catch (error) {
            disp(showtost({ "display": true, "mass": "an error accourd", icon: 'error', bg: "bg-red-400", time: '1500' }))
        }
    }
    const goshare = ()=>{
        try {
            disp(changeshare(true))
        } catch (error) {
            disp(showtost({ "display": true, "mass": "an error accourd", icon: 'error', bg: "bg-red-400", time: '1500' }))
        }
    }

    useEffect(() => {
        fetchtodo()
    }, [slug])

    useEffect(() => {
        let len = Array.from(areavalue)
        let truelen = len.length
        setletters(truelen)
        areavalue != databasecontent ? setunsaved(true) : setunsaved(false)
    }, [areavalue])



    return fetchedata ? (
        <>
            <div className=' p-4 w-[95%] mx-auto max-sm:p-2 max-sm:text-left '>
                <h1 className=' w-full break-words text-neutral-300 font-semibold tracking-[2px] text-[2rem] max-sm:text-[1.5rem]'>{fetchedata.title}</h1>
            </div>
            <div className=' w-[100%] h-screen  flex items-center justify-center poppins-regular max-sm:h-full'>
                <div className=' flex justify-between items-center w-[90%] h-[90vh]  max-sm:w-full max-sm:flex-col-reverse max-sm:gap-4'>
                    <div className=' w-[90%] h-[100%] flex flex-col  max-sm:w-[95%]'>
                        <p className=' self-end text-[0.6rem] p-1'>{letters} / 50000</p>
                        <div className=' h-full overflow-hidden flex items-center justify-center'>
                            <h1 className="absolute select-none text-neutral-900/50 text-[10rem] uppercase  font-semibold z-[-1] opacity-60 max-sm:text-[20vw]">Target.</h1>
                            
                            <textarea placeholder='start writing' ref={arearef} value={areavalue} readOnly={toggledit} onChange={(e) => setareavalue(e.target.value)} autoFocus={!toggledit} className=' placeholder-neutral-400 placeholder-opacity-90 editor text-[1rem] text-neutral-200 w-[100%] bg-transparent selection:text-amber-500 resize-none border-2 px-2 py-3 outline-none self-stretch max-sm:text-[0.8rem] max-sm:border-0 pb-[30rem] ' spellCheck="false" name="editor"></textarea>
                        </div>
                    </div>

                    <div className='w-[5%] flex flex-col justify-center items-center gap-4 max-sm:flex-row'>
                        <button onClick={() => settoggledit(!toggledit)}><span className={`p-1 border-[2px] rounded-full text-[1.2rem] text-neutral-100 material-symbols-outlined hover:text-neutral-800 hover:bg-neutral-100  max-sm:hover: ${!toggledit ? "bg-neutral-100 text-neutral-800" : null}`}>edit</span></button>

                        <button onClick={savetarget} className={`${unsaved ? "relative" : null}`}>
                            <div className={`absolute right-0 w-2 h-2 rounded-full ${unsaved ? "bg-red-500" : "bg-transparent"} `}></div>
                            {uploading ? (<motion.span
                                        animate={{
                                            rotate: [0, 180, 360]   
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            times: [0, 0.5]
                                        }}
                                        className=" p-1 border-[2px] rounded-full text-[1.2rem] material-symbols-outlined  ">progress_activity</motion.span>):(
                                            <span className='p-1 border-[2px] rounded-full text-[1.2rem] text-neutral-100 material-symbols-outlined hover:text-neutral-800 hover:bg-neutral-100 max-sm:hover:bg-transparent max-sm:hover:text-white max-sm:active:bg-neutral-100 max-sm:active:text-neutral-900'>save</span>
                                        )}

                        </button>

                        <button onClick={deletetodo}><span className='p-1 border-[2px] rounded-full text-[1.2rem] text-neutral-100 material-symbols-outlined hover:text-neutral-800 hover:bg-neutral-100 max-sm:hover:bg-transparent max-sm:hover:text-white max-sm:active:bg-neutral-100 max-sm:active:text-neutral-900'>delete</span></button>

                        <button onClick={gospeech}><span className='p-1 border-[2px] rounded-full text-[1.2rem] text-neutral-100 material-symbols-outlined hover:text-neutral-800 hover:bg-neutral-100 max-sm:hover:bg-transparent max-sm:hover:text-white max-sm:active:bg-neutral-100 max-sm:active:text-neutral-900'>speech_to_text</span></button>

                        <button onClick={goshare}><span className='p-1 border-[2px] rounded-full text-[1.2rem] text-neutral-100 material-symbols-outlined hover:text-neutral-800 hover:bg-neutral-100 max-sm:hover:bg-transparent max-sm:hover:text-white max-sm:active:bg-neutral-100 max-sm:active:text-neutral-900'>share</span></button>
                        
                    </div>

                </div>
            </div>
        </>
    ) : (<Screenloader send={"loading..."}/>)
}

export default Inditodo2