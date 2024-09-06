import {useState } from 'react'

const Time = () => {
const [color, setcolor] = useState(true)

    const tomeis = (()=>{
        let t = new Date()
        let munth = t.toUTCString()
        return munth.substring(0, 17)
    })()


  return (
    <>
    <div className=' absolute top-2 right-2 w-fit'>
    <time onClick={()=>setcolor(!color)} className={` max-sm:text-[1rem] select-none poppins-regular  uppercase font-[600] text-[2rem] p-2 ${color?"text-neutral-300":"text-neutral-400"}`}
    >{tomeis}</time>
    </div>
    </>
  )
}

export default Time