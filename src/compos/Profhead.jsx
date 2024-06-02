import { useEffect, useState } from 'react'
import Auth from '../appwrite/Auth'


const Profhead = () => {
const [datas, setdatas] = useState([])

    const setvalue = async()=>{
        let data = await Auth.getcurrentacc()
        let suc  = await data
        setdatas(suc)
    }

    useEffect(()=>{
        setvalue()
    },[])

    return datas? (
        <>
            <div className=' w-full bg-transparent text-gray-200 h-[15vh] flex items-start justify-center flex-col px-20 poppins-regular tracking-[1.5px] max-[800px]:h-[20vh] max-sm:px-6 max-sm:h-[5rem]'>
                <h1 className=' capitalize font-semibold text-[2rem] select-none max-[800px]:text-[5vw] text-nowrap overflow-x-hidden w-[90%]'>wellcome {datas.name}</h1>
                <p className=' ml-4 text-[0.6rem] max-[800px]:text-[2vw] max-[800px]:ml-1'>ID: {datas.$id}</p>
            </div>
        </>
    ):null
}

export default Profhead