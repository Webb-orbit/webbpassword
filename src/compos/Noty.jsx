import React, {useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { delettost } from '../store/Storeslice'

const Noty = () => {
  const disp = useDispatch()
  const {time, color, mas, display, icon} = useSelector(state=> state.tost)

  if (display) {
    setTimeout(()=>{
      disp(delettost())
    },time)
  }
      

  return display?(<motion.div 
    initial={{ scale: 0}}
  animate={{ scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 1000,
    damping: 35
  }}

  className={` z-[999] w-[30rem]  h-[4rem] select-none rounded-md bg-black fixed bottom-3 p-2 right-2 text-white max-sm:w-[90%] max-sm:right-0`}>
        <div className='w-full h-full relative '>
            <div className='flex gap-1 items-center'>
            <span className={`material-symbols-outlined rounded-full p-1 text-[1.3rem] ${color}`}>{icon}</span>
        <p className='poppins-regular font-semibold  text-[1rem] capitalize max-sm:font-medium'>{mas}</p>
            </div>
        <div className={`w-full h-[0.30rem] absolute rounded-md bottom-0 bg-slate-400 `}>
        <motion.div 
        layout
        initial={{ width:"0%" }}
        animate={{ width:"100%"}}
        transition={{ duration: `${time/1000}` }}
        className={` h-full rounded-md  ${color}`}></motion.div>

        </div>
        </div>
    </motion.div>
  ):(null)
  
}

export default Noty