import { motion } from "framer-motion"
import { useEffect, useState } from "react"


const Screenloader = ({send = "dark password"}) => {
  const [loadmas, setloadmas] = useState("")
  useEffect(()=>{
    setloadmas(send)
  },[])
  return(
    <div className=' select-none w-full h-screen absolute top-0 bg-black flex justify-center flex-col gap-3 items-center'>
<motion.span 
  initial={{ scale: 1 }}
  animate={{ rotate: 180, scale: 1.3 }}
  transition={{
    type: "spring",
    stiffness: 500,
    damping: 20,
  }}
className="material-symbols-outlined animate-pulse1s">data_usage</motion.span>
<p className="poppins-regular text-[0.9rem] font-semibold capitalize">{loadmas}</p>
    </div>
  )
}

export default Screenloader