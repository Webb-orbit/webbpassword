import { useState } from 'react'
import Clientbase from '../../../appwrite/client'
import { useDispatch } from 'react-redux'
import { showtost, updatelistto } from '../../../store/Storeslice'
import { usecriptapi } from '../../../hooks/useapitocode'
import { decodetoplain } from '../../../hooks/usecodetoplain'
import { Link } from 'react-router-dom'


const Aiaettings = ({setopen, data }) => {
    const [apikey, setapikey] = useState("")
    const disp = useDispatch()

    const upload = async()=>{
        if (!apikey) return
        console.log("data",data);
        try {
            const cript = await usecriptapi(apikey, data.$id)
            const updateapi = await Clientbase.updateclient(data.$id,{data:cript})
            if (updateapi) {
                disp(showtost({"display":true, "mass":"api added sussesfully", icon:'eco', bg:"bg-green-500", time:'1500'}))
                disp(updatelistto())
            }
        } catch (error) {
            console.log(error);
            disp(showtost({"display":true, "mass":"something wrong", icon:'error', bg:"bg-red-500", time:'1500'}))
        }
    }

    return (
        <div className='bottom-16 right-10 w-[40%] h-[60vh]  fixed bg-neutral-950 z-20 max-sm:h-[50vh] max-sm:bottom-2 max-sm:w-[99%] max-sm:right-0'>
            <div className=' select-none flex px-2 py-3 z-10 sticky  top-0 bg-neutral-900/70 backdrop-blur-sm justify-between items-center  text-[0.9rem]'>
                <p className=' w-[90%] font-medium capitalize poppins'>settings</p>
                <div className=' flex items-center gap-6'>
                    <button onClick={() => setopen(false)} className="material-symbols-outlined">close</button>
                </div>
            </div>

            <div className='p-2 flex flex-col gap-6'>
                <div>
                    <h2 className=' capitalize'>add gemini api key</h2>
                    <p>Don't have gemini api key? <Link to={"https://aistudio.google.com/app"} target='_blank' className=' text-blue-400'>get key</Link></p>
                </div>
                <div className=' flex items-center gap-2 justify-center outline outline-1 outline-neutral-400 w-[55%] self-center rounded-md'>
                    <input maxLength={150} placeholder='add or update keys'  value={apikey} onChange={(e)=> setapikey(e.target.value)} className=' w-full placeholder:capitalize p-2 bg-transparent outline-none rounded-md text-[0.9rem]  h-full border-none' type="text" />
                    <button onClick={upload} className=' h-full capitalize font-medium  p-2 rounded text-[1rem]'>add</button>
                </div>
                <div className=' flex justify-center'>
                    <p className=' px-2 py-1 rounded-md bg-neutral-800'>{data.data? decodetoplain(data.data, data.code):"not provided any apikey"}</p>
                </div>
            </div>
        </div>
    )
}

export default Aiaettings