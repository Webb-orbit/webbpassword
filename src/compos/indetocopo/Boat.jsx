import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dataserv from '../../appwrite/Data'
import { useDispatch } from 'react-redux'
import { changeshare, showtost } from '../../store/Storeslice'
import Aicontent from './al/Aicontent'

const Boat = ({ tododata }) => {
    const [menubar, setmenubar] = useState(false)
    const disp = useDispatch()
    const nevi = useNavigate()
    const [markopener, setmarkopener] = useState(false)
    const [alopener, setalopener] = useState(false)

    const deletetodo = async () => {
        try {
            if (tododata.shared) {
                const shares = await Dataserv.sharesbyid(tododata.colluserid)
                const byid = await shares.documents
                const targetsh = byid.filter((e) => {
                    let pars = JSON.parse(e.sharedtodo)
                    return pars.$id == tododata.$id
                })
                const deleteedshared = targetsh[0].$id
                const deletetarget = await Dataserv.deletetodo(tododata.$id)
                const detshare = await Dataserv.deleteshare(deleteedshared)

                if (deletetarget && detshare) {
                    nevi("/")
                    disp(showtost({ "display": true, "mass": "share link and target both deleted", icon: 'delete', bg: "bg-black", time: '2000' }))
                }
            } else {
                const deletetarget = await Dataserv.deletetodo(tododata.$id)
                if (deletetarget) {
                    nevi("/")
                    disp(showtost({ "display": true, "mass": "target deleted", icon: 'delete', bg: "bg-red-400", time: '1500' }))
                }

            }

        } catch (error) {
            disp(showtost({ "display": true, "mass": "an error accourd", icon: 'error', bg: "bg-red-400", time: '1500' }))
            console.error(error);
        }
    }

    const gospeech = () => {
        try {
            nevi(`/${tododata.colluserid}/speech/${tododata.$id}`)
        } catch (error) {
            disp(showtost({ "display": true, "mass": "an error accourd", icon: 'error', bg: "bg-red-400", time: '1500' }))
        }
    }

    const goshare = () => {
        try {
            disp(changeshare(true))
        } catch (error) {
            disp(showtost({ "display": true, "mass": "an error accourd", icon: 'error', bg: "bg-red-400", time: '1500' }))
        }
    }

    const closemark = ()=>{
        setmenubar(false) 
        setmarkopener(false)
    }

    return (
        <>
            <div className='fixed bottom-5 right-10 w-fit h-fit rounded-md'>
                <button onClick={() => setmenubar(pre => !pre)} className=" text-[1.6rem] text-neutral-100 material-symbols-outlined bg-neutral-800 p-2 rounded-full">more_horiz</button>

                <div className={` fixed bottom-16 w-[18%] outline select-none outline-1 outline-neutral-500 bg-neutral-900 px-2 py-4 rounded-md  flex-col gap-2 right-10 ${menubar ? "flex" : "hidden"}`}>

                    <button onClick={() => setmarkopener(pre => !pre)} className=' hover:bg-neutral-800 rounded-md px-2 py-1 flex items-center gap-5'><span className='text-[1.2rem] material-symbols-outlined text-neutral-300'>category_search</span>
                        <span className=' capitalize font-semibold'>markdown syntex</span></button>

                    <button onClick={() => setalopener(pre => !pre)} className=' hover:bg-neutral-800 rounded-md px-2 py-1 flex items-center gap-5'><span className='text-[1.2rem] material-symbols-outlined text-neutral-300'>format_overline</span>
                        <span className=' capitalize font-semibold'>Ask AI</span></button>

                    <button onClick={goshare} className=' hover:bg-neutral-800 rounded-md px-2 py-1 flex items-center gap-5'><span className='text-[1.2rem] material-symbols-outlined text-neutral-300'>share</span>
                        <span className=' capitalize font-semibold'>share</span></button>

                    <button onClick={gospeech} className=' hover:bg-neutral-800 rounded-md px-2 py-1 flex items-center gap-5'><span className='text-[1.2rem] material-symbols-outlined text-neutral-300'>text_to_speech</span>
                        <span className=' capitalize font-semibold'>listen</span></button>

                    <button onClick={deletetodo} className=' hover:bg-neutral-800 rounded-md px-2 py-1 flex items-center gap-5'><span className='text-[1.2rem] material-symbols-outlined text-red-400'>delete</span>
                        <span className=' capitalize font-semibold text-red-400'>delete</span></button>

                </div>
            </div>

             <Aicontent opener={alopener} setopener={setalopener} />

            <div className={` bottom-16 p-3 bg-neutral-950 outline outline-1 outline-neutral-400 right-10 w-[40%] h-[50vh] rounded-md overflow-y-scroll editor ${markopener ? "fixed" : "hidden"}`}>
                    <div className='flex justify-between items-start p-2'>
                        <p className=' w-[90%] font-medium capitalize poppins'>markdown syntex</p>
                        <button onClick={closemark} className="material-symbols-outlined">close</button>
                    </div>
                    <pre className=' font-semibold bg-transparent text-[1rem]'>
                        <p>H1 heading == # text</p>
                        <p>H2 heading == ## text</p>
                        <p>H3 heading == ### text</p>
                        <p>Bulleted list == ** text</p>
                        <p>Numbered list == **</p>
                        <p>Bold == *text*</p>
                        <p>Code block == ``` code ```</p>
                        <p>Blockquote == &gt; text</p>
                        <p>link == &gt; [URL](NAME)</p>
                        <p>Text divider == ---</p>
                        <p>api key == AIzaSyD8nmI-MNBJg0ptoBXaWAflu5-6KAsMheU </p>
                    </pre>
                </div>
        </>
    )
}

export default Boat