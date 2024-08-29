import { useEffect, useState } from "react"
import Auth from "../appwrite/Auth"
import Dataserv from "../appwrite/Data"
import Sharepage from "./Sharepage"
import { useDispatch, useSelector } from "react-redux"
import { changeshare, showtost } from "../store/Storeslice"
import { Link, useNavigate } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import Tooglebtn from "./Tooglebtn"

const Profshares = () => {
  const [createlist, setcreatelist] = useState(false)

  const [displayer, setdisplayer] = useState(null)

  const [allsharesarr, setallsharesarr] = useState(null)
  const [accuserdata, setaccuserdata] = useState()
  const [unshred, setunshred] = useState(null)
  const [slug, setslug] = useState("")
  const [user, setuser] = useState("")

  const dispatch = useDispatch()
  const sharesupdater = useSelector(state => state.sharecompo.updater)
  const sharedcompodisplay = useSelector(state => state.sharecompo.display)
  const navy = useNavigate()


  const getallshares = async () => {
    const user = await Auth.getcurrentacc()
    let get = await Dataserv.sharesbyid(user.$id)
    const sharelist = get.documents.reverse()
    setaccuserdata(user)
    setallsharesarr(sharelist)
  }

  const uncreatedtodos = async () => {
    if (createlist == false) {
      const alltodos = await Dataserv.alltodosbyshared(accuserdata?.$id)
      console.log(alltodos);
      
      setunshred(null)
      setcreatelist(!createlist)
      if (alltodos) {
        setunshred(alltodos.documents)
      }
    } else {
      setcreatelist(!createlist)
    }
  }

  const createnewshare = (data) => {
    try {
      setslug(data.$id)
      setuser(data.colluserid)
      setcreatelist(!createlist)
      dispatch(changeshare(true))
    } catch (error) {
      dispatch(showtost({ "display": true, "mass": "an error accourd", icon: 'error', bg: "bg-red-400", time: '1500' }))
    }
  }

  const updatebtnfun = async(data)=>{
    try {
      const linktodo = await Dataserv.gettodo(data.linkedtodoid)
      const latesttodo = await JSON.stringify(linktodo)
      await Dataserv.updateshare(data.$id,{"sharedtodo": latesttodo })
      setdisplayer(Date.now().toString()) 
      dispatch(showtost({ "display": true, "mass": "share updated", icon: 'error', bg: "bg-green-400", time: '1500' }))
    } catch (error) {
      dispatch(showtost({ "display": true, "mass": "an error accourd", icon: 'error', bg: "bg-red-400", time: '1500' }))
    }
  }

  const deleteshare = async (data) => {
    try {
      await Dataserv.deleteshare(data.$id)
      await Dataserv.updatetodo(JSON.parse(data.sharedtodo).$id, { "shared": false })
      await getallshares()
      dispatch(showtost({ "display": true, "mass": "shared link removed", icon: 'error', bg: "bg-green-400", time: '1000' }))
    } catch (error) {
      dispatch(showtost({ "display": true, "mass": "an error accourd", icon: 'error', bg: "bg-red-400", time: '1500' }))
    }
  }

  const demosharepage = (data) => {
    try {
      setslug(JSON.parse(data.sharedtodo).$id)
      setuser(JSON.parse(data.sharedtodo).colluserid)
      dispatch(changeshare(true))
      setdisplayer(Date.now().toString()) 
    } catch (error) {
      dispatch(showtost({ "display": true, "mass": "an error accourd", icon: 'error', bg: "bg-red-400", time: '1500' }))
    }
  }

  const autoupfun = async (e) => {
    try {
      await Dataserv.updateshare(e.$id, { "autoupdate": !e.autoupdate })
      getallshares()  
      dispatch(showtost({ "display": true, "mass": "setting updated", icon: 'error', bg: "bg-green-400", time: '1500' }))
    } catch (error) {
      dispatch(showtost({ "display": true, "mass": "an error accourd to update", icon: 'error', bg: "bg-red-400", time: '1500' }))
    }
  }

  const privatedfun = async (e) => {
    try {
      await Dataserv.updateshare(e.$id, { "privated": !e.privated })
      getallshares()
      dispatch(showtost({ "display": true, "mass": "setting updated", icon: 'error', bg: "bg-green-400", time: '1500' }))
    } catch (error) {
      dispatch(showtost({ "display": true, "mass": "an error accourd to update", icon: 'error', bg: "bg-red-400", time: '1500' }))
    }
  }

  const displayerfun = (id) => {
    setdisplayer(id)
    if (id == displayer) {
      setdisplayer(Date.now().toString())
    }
  }

  useEffect(() => {
    getallshares()
  }, [sharesupdater])

  return (
    <>
      {sharedcompodisplay ? <Sharepage passslug={slug} passid={user} /> : null}
      <div className=' w-[90%] mx-auto p-7 rounded-md h-[100%] bg-[#0a0a0a] outline-1 outline outline-neutral-500/50 flex flex-col justify-between items-start mb-4 max-[800px]:flex-col max-[800px]:w-[95%] max-[800px]:px-1 max-[800px]:py-7'>

        <div className="w-full flex justify-between items-center relative px-2 z-20">
          <h1 className=' self-center uppercase text-[1.5rem] text-neutral-100 font-semibold max-sm:text-[0.9rem] poppins-regular'>manage your shares</h1>

          <button onClick={uncreatedtodos} className={` ${allsharesarr?null:"animate-pulse1s"} px-8 py-2 text-[1rem] border-none outline-none capitalize bg-green-500 poppins-regular text-white font-semibold rounded-md flex items-center justify-center max-sm:text-[0.7rem] max-sm:px-5 `}>
           <p>create new</p>
            <span className=" self-end font-semibold material-symbols-outlined max-sm:hidden">add</span>
            </button>

          <div className={`${createlist ? "absolute" : "hidden"} flex flex-col top-16 right-0 p-3 rounded-md bg-neutral-500/60 backdrop-blur-sm  w-[30rem] min-h-[40vh] max-h-[40vh] overflow-y-scroll editor max-sm:w-[95%]`}>

            <div className='flex justify-between items-center py-2 border-b-2 mb-2 '>
              <h3 className='font-bold capitalize '>create new share page</h3>
              <button onClick={() => setcreatelist(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {unshred == null ? <Skeleton duration={1} count={3} className=" h-10" baseColor="#252525" highlightColor="#444" /> : (
              unshred.length == 0 ? (<p className=" py-4 capitalize font-semibold">create a instance first</p>) : (
                unshred.map((e) => (
                  <button onClick={() => createnewshare(e)} key={e.$id} className=" font-semibold rounded-md bg-neutral-800 hover:bg-neutral-900 break-words px-3 py-2 my-1 text-left">{e.title}</button>
                ))
              )

            )}
          </div>
        </div>

        <div className="w-full px-2 mt-8">
          <div className="w-full flex justify-between items-center py-3 poppins-regular max-sm:justify-end">

            <div className="  w-[80%] flex justify-start gap-8 max-sm:hidden ">
              <p className="w-[30%] font-semibold capitalize overflow-x-hidden max-sm:text-[0.7rem]">name</p>
              <p className="w-[20%] font-semibold capitalize overflow-x-hidden max-sm:text-[0.7rem]">views</p>
              <p className="w-[25%] font-semibold capitalize overflow-x-hidden max-sm:text-[0.7rem]">created at</p>
            </div>

            <div> 
              <p className="font-semibold capitalize max-sm:text-[0.7rem]">Total shares: {allsharesarr?.length}</p>
            </div>

          </div>

          {allsharesarr == null ? <Skeleton duration={2} count={5} className=" h-10" baseColor="#202020" highlightColor="#444" /> : (allsharesarr.length == 0 ? <>
            <div className=" w-full flex flex-col justify-center items-center gap-5">
              <h3>no shares found</h3>
              <button onClick={uncreatedtodos} className="flex  items-center px-8 py-1 text-[0.9rem] border-none outline-none capitalize bg-green-500 poppins-regular text-white font-semibold rounded-sm max-sm:text-[0.7rem] max-sm:px-5 ">create new</button>
            </div>
          </> : allsharesarr.map((e) => (
            <div key={e.$id} className=" hover:bg-neutral-700/80 poppins-regular relative  w-[100%] flex justify-between items-center bg-neutral-600/20 my-4 px-2 rounded-md h-12 max-sm:h-full max-sm:p-2 max-sm:bg-neutral-900">
              <div className=" w-[80%] flex justify-start gap-8 text-[0.9rem] items-center max-sm:gap-2 max-sm:flex-col max-sm:w-[90%]">
              <Link target="_blank" to={`https://darkpassword.vercel.app/shared/${e.$id}`} className="w-[30%] flex items-center gap-3  hover:text-neutral-100 max-sm:w-full text-neutral-200 max-sm:hover:" >
                <p className=" text-[0.9rem] whitespace-nowrap  overflow-x-hidden max-sm:w-full">{JSON.parse(e.sharedtodo).title}</p>
                <span className="text-[0.9rem] material-symbols-outlined max-sm:hidden  ">open_in_new</span>
                
              </Link>
              <div className="w-[20%] flex gap-2 overflow-x-hidden max-sm:w-full">
                <p className=" hidden max-sm:inline-block capitalize text-[#A1A1A1] max-sm:text-[0.7rem]">views :</p>
                <p className="max-sm:text-[0.7rem] text-neutral-300">{e.views}</p>
              </div>
              <div className="w-[25%] flex gap-2 overflow-x-hidden max-sm:w-full">
                <p className=" hidden max-sm:inline-block capitalize text-[#A1A1A1] max-sm:text-[0.7rem]">created At :</p>
                <p className="max-sm:text-[0.7rem] text-neutral-300">{e.$createdAt.substring(0, 10)}</p>
              </div>
              </div>

              <div className="w-[20%] relative max-sm:w-[10%] max-sm:self-start">

                <div className=" flex justify-end w-full h-full items-center">
                  <button onClick={()=> navy(`/workspace/${e.user}/${JSON.parse(e.sharedtodo).$id}`)} className=" hover:text-white text-neutral-300 max-sm:hidden">
                    <span className=" text-[1.3rem] material-symbols-outlined">edit_square</span>
                  </button>
                  <button className=" hover:text-white text-neutral-300" onClick={() => displayerfun(e.$id)}>
                    <span className=" text-[1.3rem] material-symbols-outlined max-sm:hidden">tune</span>
                    <span className="text-[1.3rem] material-symbols-outlined hidden max-sm:block">more_horiz</span>
                  </button>
                </div>

                {displayer === e.$id ? (
                  <div className={` bg-neutral-900 w-[20rem] h-[10rem] absolute right-8 z-30 select-none rounded-md  max-sm:h-[50vh] max-sm:w-screen max-sm:fixed max-sm:bottom-0 max-sm:right-0 `}>
                    <div className="w-full h-full flex flex-col justify-around p-3 gap-1">
<div className=" hidden max-sm:flex self-end pb-2 justify-between w-full ">
  <p className=" w-[80%] text-nowrap overflow-x-hidden font-semibold capitalize">{JSON.parse(e.sharedtodo).title}</p>
  <button onClick={()=>setdisplayer(Date.now().toString())}><span className=" text-[1.3rem] material-symbols-outlined">cancel</span></button>
</div>
                      <button onClick={() => navy(`/workspace${e.user}/${JSON.parse(e.sharedtodo).$id}`)} className=" hidden max-sm:block  hover:text-neutral-300 max-sm:py-2 ">
                        <div className='flex justify-between items-center'>
                          <p className=" capitalize font-semibold text-[0.8em]">edit</p>
                          <span className=" material-symbols-outlined text-[1.2rem]">edit_square</span>
                        </div>
                      </button>

                      <div className='flex justify-between items-center max-sm:py-2'>
                        <p className=" capitalize font-semibold text-[0.8em]">autoupdate</p>
                        <Tooglebtn side={e.autoupdate} fun={() => autoupfun(e)} />
                      </div>

                      <div className='flex justify-between items-center max-sm:py-2'>
                        <p className=" capitalize font-semibold text-[0.8em]">show name</p>
                        <Tooglebtn side={e.privated} fun={() => privatedfun(e)} />
                      </div>

                      {!e.autoupdate?(
                        <button onClick={() => updatebtnfun(e)} className="  hover:text-neutral-300 max-sm:py-2 ">
                        <div className='flex justify-between items-center'>
                          <p className=" capitalize font-semibold text-[0.8em]">update</p>
                          <span className=" material-symbols-outlined text-[1.2rem]">upload</span>
                        </div>
                      </button>):null}

                      <button onClick={() => demosharepage(e)} className="  hover:text-neutral-300 max-sm:py-2 ">
                        <div className='flex justify-between items-center'>
                          <p className=" capitalize font-semibold text-[0.8em]">share</p>
                          <span className=" material-symbols-outlined text-[1.2rem]">share</span>
                        </div>
                      </button>

                      <button onClick={() => deleteshare(e)} className=" hover:text-neutral-300 max-sm:py-2 ">
                        <div className='flex justify-between items-center'>
                          <p className=" capitalize font-semibold text-[0.8em]">delete</p>
                          <span className=" material-symbols-outlined text-[1.2rem]">delete</span>
                        </div>
                      </button>

                    </div>
                  </div>
                ) : null}

              </div>
            </div>
          )))}


        </div>

      </div>
    </>
  )
}

export default Profshares