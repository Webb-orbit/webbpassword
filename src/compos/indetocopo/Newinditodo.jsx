import {useEffect, useRef, useState } from "react"
import "./editor.css"
import { usesimtohrml } from "../../hooks/usesimtohrml"

const Newinditodo = () => {
  const [plain, setplain] = useState("")
  const textref = useRef(null)


  const texttomd = ()=>{
   let htm = usesimtohrml(plain)
    textref.current.innerHTML = htm
  }

  useEffect(()=>{
    texttomd()
  },[plain])
    
  return (
    <div className="flex min-h-[10rem] h-full justify-around  items-stretch">
      <textarea spellCheck="false" onChange={(e)=>setplain(e.target.value)} className=" resize-none p-5 w-[45%] bg-black  "></textarea>
      <div ref={textref} className=" whitespace-pre-wrap break-words p-5 w-[45%] bg-[#242424]"></div>
    </div>
  )
}

export default Newinditodo