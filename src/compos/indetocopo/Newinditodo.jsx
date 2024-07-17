import { useEffect, useState } from "react"
import Sharepage from "../Sharepage"
import "./editor.css"
import Indisidebar from "./Indisidebar"
import Maintodo from "./Maintodo"
import { useNavigate, useParams } from "react-router-dom"
import Auth from "../../appwrite/Auth"
import { useDispatch } from "react-redux"
import { showtost } from "../../store/Storeslice"
import Screenloader from "../Screenloader"

const Newinditodo = () => {
  const [togg, settogg] = useState(false)
  const {slug, userid} = useParams()
  const naviget = useNavigate()
  const disp = useDispatch()
  const [load, setload] = useState(true)

  useEffect(()=>{
    (async()=>{
      try {
        const realuser = (await Auth.getcurrentacc()).$id
        if(realuser !== userid){
          naviget("/")
          disp(showtost({ "display": true, "mass": "invalid argument", icon: 'sports_volleyball', bg: "bg-red-500", time: '2000' }))
        }
      } catch (error) {
        naviget("/")
        disp(showtost({ "display": true, "mass": "something wrong", icon: 'error', bg: "bg-red-500", time: '2000' }))
      } finally{
        setload(false)
      }
    })()
  },[slug])
  return !load? (
    <>
      <Sharepage />
      <div className=" flex p-2 gap-10">
          <div className="sticky top-0 max-sm:absolute max-sm:mt-[4rem]">
            <button onClick={()=>settogg(pre=>!pre)} className="hidden max-sm:inline-block material-symbols-outlined">menu</button>
            <Indisidebar toggle={togg} settoggle={settogg}/>
          </div>
        <Maintodo />
      </div>
    </>
  ): <Screenloader />
}

export default Newinditodo