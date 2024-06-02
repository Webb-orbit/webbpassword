import { useState } from 'react'

const Tooglebtn = ({side, fun}) => {
  const [sider, setsider] = useState(side)

  const funs = ()=>{
    setsider(!sider);
    fun();
  }
  return (
    <button onClick={funs}>
    <div className={`w-[3rem] p-1 rounded-full flex items-center ${sider?"justify-end":"justify-start"} ${sider?"bg-green-300":" bg-slate-300"}`}>
        <div className=' w-[1.2rem] bg-slate-800 h-4 rounded-full'></div>
    </div>
    </button>
  )
}

export default Tooglebtn