import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Dataserv from '../../appwrite/Data'
import Auth from '../../appwrite/Auth'
import { useDispatch, useSelector } from "react-redux"
import { changevoice } from '../../store/Storeslice'
import { showtost } from '../../store/Storeslice'

const Sidespeeches = () => {
  const { todoids } = useParams()
  const [alltodoarr, setalltodoarr] = useState([])
  const [opener, setopener] = useState(false)
  const [user, setuser] = useState("")
  const disp = useDispatch()
  const nevi = useNavigate()
  const selector = useSelector(state => state.voiceis)
  const voices = speechSynthesis.getVoices();

  const fetchalltodos = async () => {
    try {
      const userdata = await Auth.getcurrentacc()
      let finduser = await userdata
      setuser(finduser.$id)
      const fss = await Dataserv.alltodos(finduser.$id)
      const allis = await fss
      const fliped = allis.documents.reverse()
      setalltodoarr(fliped)
    } catch (error) {
      nevi("/")
      disp(showtost({ "display": true, "mass": "page not found", icon: 'error', bg: "bg-red-400", time: '1500' }))
    }
  }

  const changevoicebtn = (voice) => {
    disp(changevoice(String(voice)))
    setopener(false)
  }

  useEffect(() => {
    fetchalltodos()
  }, [todoids])

  return (
    <>
      <div className={`fixed px-2 w-[20%] mt-14 h-[90vh] pb-20 overflow-y-scroll max-sm:pb-20 editor max-sm:w-full max-sm:h-[90vh] bg-neutral-950  ${selector.menubar ? "max-sm:block" : "max-sm:hidden"} z-10`}>
        <div className=' flex flex-col justify-center items-center '>
          <div className='  h-12 w-full flex justify-center items-center '>
            <button onClick={() => setopener(!opener)} className=' flex justify-between  whitespace-nowrap items-center w-[90%] h-[95%] border-2 border-neutral-600 rounded-md py-4 px-2'>
              <div className=' flex flex-col items-start text-neutral-300 text-[0.65rem] w-[80%] overflow-hidden '>
                <span className={` text-[1.2rem] material-symbols-outlined ${selector.speakingnow ? "text-green-500" : "text-neutral-100"}`}>record_voice_over</span>
                {selector.pekosa}
              </div>
              <span className={` text-[1rem] font-extrabold material-symbols-outlined `}>{opener ? "expand_less" : "expand_more"}</span>
            </button>
          </div>

          <div className={` border-2 border-t-0 border-r-0 pl-1 editor flex flex-col w-[90%] h-[20rem] overflow-y-scroll  bg-neutral-800/20 ${opener ? "flex" : "hidden"}`}>
            {voices.map((e) => (
              <button key={e.name} onClick={() => changevoicebtn(e.voiceURI)} className=' hover:text-green-500 font-medium text-[0.7rem] text-left poppins-regular py-2 my-1'>
                {e.name}
              </button>
            ))}
          </div>
        </div>

        <div className=' w-full '>
          <NavLink className={({ isActive }) => `${isActive ? "bg-neutral-500/30" : null} flex justify-between text-white whitespace-nowrap   py-2 px-2 poppins-regular select-none text-[0.9rem] capitalize  hover:bg-neutral-500/15 rounded-md  max-sm:w-[100%]`} to={`/blank`}>
            <p className=' w-[70%] overflow-hidden '>blank</p>
            <span className="material-symbols-outlined text-[1rem]">my_location</span>
          </NavLink>
          {alltodoarr.map((e) => (
            <div key={e.$id} className='my-2'>
              <NavLink className={({ isActive }) => `${isActive ? "bg-neutral-500/30" : null} flex justify-between text-white whitespace-nowrap   py-2 px-2 poppins-regular select-none text-[0.9rem] capitalize  hover:bg-neutral-500/15 rounded-md  max-sm:w-[100%]`} to={`/${user}/speech/${e.$id}`}>
                <p className=' w-[70%] overflow-hidden '>{e.title}</p>
                <span className="material-symbols-outlined text-[1rem]">chevron_right</span>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sidespeeches