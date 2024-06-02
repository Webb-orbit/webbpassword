import  { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Dataserv from '../appwrite/Data'
import { Link } from 'react-router-dom'
import Sidespeeches from '../compos/text-speech/Sidespeeches'
import Readonly from '../compos/text-speech/Readonly'
import { useDispatch } from 'react-redux'
import { menuopener } from '../store/Storeslice'
import { showtost } from '../store/Storeslice'

const SpeechTheTodos = () => {
    const {todoids,userid} = useParams()
    const [onetodoinfo, setonetodoinfo] = useState([])
    const [myid, setmyid] = useState("")
    const disp = useDispatch()
    const nevi = useNavigate()

    const todoinfo = async()=>{
      try {
        let dom = await Dataserv.gettodo(todoids)
        if (dom ) {
          let res = await dom
          setmyid(userid)
          setonetodoinfo(res)
        }
      } catch (error) {
        nevi("/")
        disp(showtost({ "display": true, "mass": "page not found", icon: 'error', bg: "bg-red-400", time: '1500' }))
      }
    }

    const menuopenerfun = ()=>{
        disp(menuopener())
      }

    useEffect(()=>{
        todoinfo()
    },[todoids])

  return (
    <>
    <div className=' px-12 flex justify-between items-center w-full py-5 max-sm:px-4 bg-black fixed '>
        <Link to={`/${myid}/todo/${onetodoinfo.$id}`} className=' text-[0.9rem] text-neutral-200 font-normal whitespace-nowrap overflow-hidden max-sm:text-[0.7rem] capitalize max-sm:w-[70%]' ><span className='font-medium text-green-500' >Go-back - </span>{onetodoinfo.title}</Link>

        <button onClick={menuopenerfun} className='hidden max-sm:block'>
        <span className="material-symbols-outlined">menu</span>
        </button>
    </div>

    <div className='flex px-2 w-full py-3 justify-between items-center h-[90vh] max-sm:flex-col'>

<div className=' w-[20%] max-sm:w-[100%] self-start '>
    <Sidespeeches />
</div>

    <div className=' max-sm:z-2 w-[100%] h-[100%] flex flex-col justify-between items-center'>
    <Readonly/>
    <Outlet/>
    </div>

    </div>
    </>
  )
}

export default SpeechTheTodos