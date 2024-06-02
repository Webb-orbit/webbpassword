import { motion } from 'framer-motion'

const Loading = ({ mas, ani=true }) => {
  return (
    <div className='w-full h-full flex items-center justify-center text-white'>
      <p className=' py-2 px-5 rounded-md'>
        {navigator.onLine ? (mas ? mas : "LOADING...") : ("OFLLINE...")}
      <motion.span
        animate={{
          rotate: [0, 180, 360]
        }}
        transition={{
          repeat: Infinity,
          times: [0, 0.5],
          duration:0.8
        }}
        className={` ${ani?"inline-block":"hidden"} text-[1.2rem] material-symbols-outlined text-neutral-200 `}>token</motion.span>
      </p>
    </div>
  )
}

export default Loading