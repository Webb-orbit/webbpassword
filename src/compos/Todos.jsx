import { useEffect, useRef, useState } from "react"
import Dataserv from "../appwrite/Data"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loading from "./Loading"
import Todocard from "./Todocard"
import { showtost } from "../store/Storeslice"

const Todos = () => {
  const [formtitle, setformtitle] = useState("")
  const [loadlist, setloadlist] = useState("")
  const [arrtodos, setarrtodos] = useState([])
  const selet = useSelector(state => state.track)
  const navia = useNavigate()
  const refer = useRef(null)
  const disp = useDispatch() 
  const updater = useSelector(state=>state.updatetodolist.runer)
  let todoinputref = useRef(null)
  
  const gettodos = async () => {
    let quries = selet.userdata
    try {
      let todos = await Dataserv.alltodos(quries)
      if (todos) {
        let fliparr = todos.documents.reverse()
        setarrtodos(fliparr)
      }  
    } catch (error) {
      disp(showtost({"display":true, "mass":"an error occurred, no data found", icon:'error', bg:"bg-red-400", time:'1500'}))
    }
  }


  let handelsubmit = async () => {
    if (formtitle == "") return todoinputref.current.className = "border-2  border-red-400 rounded-sm"
    todoinputref.current.className = "border-2  border-white rounded-sm"
    try {
      let data = await Dataserv.createtodo({ 'title': formtitle, 'content': "", "colluserid": selet.userdata })
      setformtitle("")
      if (data) {
        navia(`${selet.userdata}/todo/${data.$id}`)
      }
    } catch (error) {
      disp(showtost({"display":true, "mass":"an error occurred", icon:'error', bg:"bg-red-400", time:'1500'}))
    }
  }

  const unauther = () => {
    disp(showtost({"display":true, "mass":"login or signup to continue", icon:'no_accounts', bg:"bg-red-500", time:'3000'}))
  }

  const managesubmites = (e) => {
    e.preventDefault()
    if (selet.status) {
      handelsubmit()
    } else {
      unauther()
    }
  }

  const listmasfun = () => {
    selet.status ? (setloadlist("No todos created")) : (setloadlist("sign in to see todos"))
  }

  const arrangefun = ()=>{
    if (arrtodos.length !=0) {
      setloadlist("sorting...")
      setarrtodos([])
      gettodos()
    }else{
      setloadlist("No todos found")
    }
    
  }

  useEffect(() => {
    if (selet.status) gettodos()
    listmasfun()
  }, [updater])

  return (
    <>
      <div className=" h-full w-full flex items-center justify-between flex-col z-[2]">
        <div className=" select-none h-[20vh]  w-full flex flex-col items-center justify-center">
          <h2 className=" uppercase text-white font-semibold text-[3rem] max-sm:text-[2rem]">target</h2>

          <div className="flex items-center justify-between px-[5%] w-full ">
            <div>
              <form ref={todoinputref} onSubmit={managesubmites} className=" flex items-center justify-between  border-2  border-white rounded-sm">
                <input className="w-[20rem] outline-none py-1 px-3 text-[0.9rem] border-0 bg-transparent backdrop-blur-sm text-white max-sm:w-[60vw] " spellCheck="false" type="text"
                  placeholder="set targets"
                  value={formtitle}
                  maxLength={50}
                  onChange={(e) => setformtitle(e.target.value)}
                />
                <button className="py-1 px-3 text-[0.9rem] uppercase outline-none text-white backdrop-blur-sm border-none hover:text-blue-200 " type="submit">add</button>
              </form>
            </div>

            <div className="  text-white text-[2rem] flex items-center justify-center ">
              <button className="max-sm:hidden flex items-center justify-center" onClick={arrangefun}><span className=" text-[1.1rem] p-2 rounded-full hover:bg-white hover:text-black material-symbols-outlined max-sm:active:bg-neutral-400 max-sm:bg-white max-sm:text-black">grid_view</span></button>
              <button className="flex items-center justify-center" onClick={()=> navia("/blank")}><span className=" text-[1.1rem] p-2 rounded-full hover:bg-white hover:text-black material-symbols-outlined max-sm:active:bg-neutral-400 max-sm:bg-white max-sm:text-black">speech_to_text</span></button>
            </div>

          </div>

        </div>

        <div className=" h-[80vh] w-full" ref={refer}>
          {arrtodos.length != 0 ? (
            <div style={{ scrollbarWidth: "none" }} className={` w-full h-full flex items-center flex-wrap justify-start gap-4 relative  px-10 py-6 overflow-scroll max-sm:px-0 max-sm:flex-nowrap max-sm:flex-col max-sm:justify-start max-sm:items-center max-sm:gap-8`} >
              {arrtodos?.map((e) => (
                <Todocard key={e.$id} info={e} reference={refer} />
              ))}
            </div>
          ) : (<Loading mas={loadlist} />)}

        </div>
      </div>
    </>
  )
}

export default Todos