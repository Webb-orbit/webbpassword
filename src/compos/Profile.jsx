import { useEffect, useState } from 'react'
import Auth from '../appwrite/Auth'
import { useDispatch } from 'react-redux'
import { showtost, storelogout } from '../store/Storeslice'
import { useNavigate } from 'react-router-dom'
import Boxcompo from './Boxcompo'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const Profile = () => {
const [datas, setdatas] = useState(null)
const [logdatas, setlogdatas] = useState([])
const [logourl, setlogourl] = useState("")
const [newname, setnewname] = useState("")
const [emupcon, setemupcon] = useState(false)
const [editname, seteditname] = useState(false)

const [updateemail, setupdateemail] = useState("")
const [updatepass, setupdatepass] = useState("")
const [oathpro, setoathpro] = useState(null)

const disp = useDispatch()
const navia  = useNavigate()
const loca = String(`${window.location.origin}/varify`)

const getlogos = async(nam)=>{
    let logo = await Auth.getlogo(nam)
    if (logo) {
      setlogourl(logo.href)
  }
}

  const currentfun = async()=>{
    let getuser = await Auth.getcurrentacc()
    if (getuser) {
      setdatas(getuser)
      getlogos(getuser.name)
      console.log("getuser",getuser.name);
    }
  }


  const usersessions = async()=>{
    let logs = await Auth.Listsessions()
    if (logs) {
      setlogdatas(logs.sessions)
    }
  }

  const appwritelogout = async()=>{
    let out = await Auth.logout()
    if (out) {
     disp(storelogout())
     navia("/")
    }
   }

  const time = ()=>{
    if (datas) {
      let date = String(datas.registration)
      let regx = /\d{4}-\d{2}-\d{2}/
      let timeis = date.match(regx) 
      return timeis
    }
  }

  const editnamefun = async()=>{
    let newnameis = newname
    if (newnameis) {
      let sandname  = await Auth.updatename(newnameis)
      if (sandname) {
      currentfun()
      getlogos(newnameis)
      seteditname(false)
      setnewname("")
      }
    }else{
      setnewname(datas.name)
      seteditname(true)
    }
  }

  const emailva = async ()=>{
    try {
      let work = await Auth.emailvarify(loca)
      if (work) {
        disp(showtost({"display":true, "mass":"chack your email and varify email", icon:'contact_mail', bg:"bg-green-500", time:'4000'}))
      }
    } catch (error) {
      disp(showtost({"display":true, "mass":"an error occurred try again some time leter", icon:'error', bg:"bg-red-500", time:'4000'}))
    }
  }

  const updateemailfun = async()=>{
    if (updateemail=="" && updatepass=="") return
    try {
     let ipdat =  await Auth.updateemail(updateemail, updatepass)
     if (ipdat) {
       currentfun()
       setupdateemail("")
       setupdatepass("")
       setemupcon(false)
       disp(showtost({"display":true, "mass":"email updated", icon:'error', bg:"bg-green-500", time:'2000'})) 
     }
    } catch (error) {
      console.error('>>>>>>>>>>>', error)
      disp(showtost({"display":true, "mass":"an error occurred", icon:'error', bg:"bg-red-500", time:'4000'}))
    }
  }

  const getacc = async()=>{
    let sesson = await Auth.getSession()
    setoathpro(sesson)
  }
  


  useEffect(()=>{
    getacc()
    currentfun()
    usersessions()
  },[])

  return datas?  (
    <>
    <Boxcompo
    mass={"update email"}
    visiblety={emupcon}
    setvisiblety={setemupcon}
    child={
      <>
      <div className='flex flex-col items-center justify-center h-full gap-3'>
        <input className=' text-black' type="text" value={updateemail} onChange={(e)=> setupdateemail(e.target.value) } placeholder='new email' />
        <input className=' text-black' type="text" value={updatepass} onChange={(e)=> setupdatepass(e.target.value) } placeholder='password' />
        <button onClick={updateemailfun}>update</button>
      </div>
      </>
    }>
    </Boxcompo>

<div className=' w-[90%] mx-auto p-7 rounded-md h-[100%] bg-neutral-900 flex justify-between items-start mb-4 max-[800px]:flex-col max-[800px]:w-[95%] max-[800px]:px-1 max-[800px]:py-7'>

<div className='w-[70%] h-full rounded-md p-2 max-[800px]:w-full'>
<div className='flex items-center w-full justify-between '>
  <div className=' flex items-center  gap-7'>
  <div className=' bg-slate-900 w-[3rem] rounded-full select-none'>
  <img src={logourl} className='w-full rounded-full' />
  </div>
  <div className='text-gray-200'>
  <p className='capitalize font-semibold text-[2rem] select-none max-[800px]:text-[3vw]'>{datas.name}</p>
  <p className='text-[0.8rem] flex items-center gap-2 max-[800px]:text-[2vw]'>{datas.email?`Signed in as ${datas.email}`:null}</p>

  <p className='text-[0.8rem] flex items-center gap-2'>{datas.phone?`Signed in as ${datas.phone}`:null}</p>
  </div>
  </div>
<button className=' px-2 py-1/2   rounded-sm text-neutral-100 hover:scale-105 text-[0.8rem] bg-red-500' onClick={appwritelogout}>logout</button>
</div>

  <div className={`w-[80%] p-4 mt-[3rem]  max-[800px]:w-full max-[800px]:p-1`}>
  <div className=' flex items-center justify-between px-3 py-2 hover:bg-neutral-800 rounded-md max-[800px]:hover:bg-transparent'>
    <div className=' flex gap-20'>
    <p className=' capitalize max-[800px]:text-[2.5vw]'>Name:</p>
    <div className='flex items-start'>
    {editname?null:<p className=' max-[800px]:text-[3vw]'>{datas.name}</p>}
    {editname?<input onChange={(e)=>setnewname(e.target.value)} type="text" maxLength={40} autoFocus spellCheck="false" value={newname} className=' bg-transparent border-r-[2px] border-l-[2px] px-[0.3rem] h-full outline-none max-[800px]:text-[3vw]'/>:null}
    </div>
    </div>
    <span onClick={editnamefun} className="material-symbols-outlined select-none text-[1.2rem] p-2 rounded-full hover:bg-neutral-700 cursor-pointer max-[800px]:hover:bg-transparent max-[800px]:active:bg-neutral-800 ">{editname?'save':'edit_road'}</span>
  </div>
{datas.email?
<div className=' flex items-center justify-between px-3 py-2 hover:bg-neutral-800 rounded-md max-[800px]:hover:bg-transparent'>
    <div className=' flex gap-20'>
    <p className=' capitalize max-[800px]:text-[2.5vw]'>Email:</p>
    <p className='flex items-center gap-2 max-[800px]:text-[3vw]'>{datas.email}{datas.emailVerification?<span className="material-symbols-outlined text-[1rem] bg-green-400 rounded-full text-black">check_circle</span>:<span className="material-symbols-outlined text-[1rem] bg-red-500 rounded-full text-black">error</span>}</p>
    </div>
    {!datas.emailVerification?(<button onClick={emailva} className='text-[0.7rem] rounded-sm hover:bg-neutral-600 text-neutral-200 px-1.5 '>verifiy email</button>):null}
  </div>:null}

{datas.phone?
<div className=' flex items-center justify-between px-3 py-2 hover:bg-neutral-800 rounded-md max-[800px]:hover:bg-transparent'>
    <div className=' flex gap-20'>
    <p className=' capitalize max-[800px]:text-[2.5vw]'>phone:</p>
    <p className='flex items-center gap-2 max-[800px]:text-[3vw]'>{datas.phone}{datas.phoneVerification?<span className="material-symbols-outlined text-[1rem] bg-green-400 rounded-full text-black">check_circle</span>:<span className="material-symbols-outlined text-[1rem] bg-red-500 rounded-full text-black">error</span>}</p>
    </div>

  </div>:null}

  <div className=' flex items-center justify-between px-3 py-2 hover:bg-neutral-800 rounded-md max-[800px]:hover:bg-transparent'>
    <div className=' flex gap-20'>
    <p className=' capitalize max-[800px]:text-[2.5vw]'>Joined:</p>
    <p className='flex items-center gap-2 max-[800px]:text-[3vw]'>{time()}</p>
    </div>
  </div>
</div>
</div>

<div className=' flex flex-col-reverse justify-between items-center gap-8 max-h-[80vh] editor overflow-y-scroll rounded-md p-2 max-[800px]:self-center max-[800px]:w-full '>
<div className='w-[100%] sessons rounded-md border-[2px] py-2 px-1 border-white/70'>
  <h3 className=' font-semibold capitalize text-neutral-200 text-[1.3rem]'>your devices</h3>
  <p className='text-[0.7rem]'>Where you’re signed in</p>
{logdatas.map((e)=>(
<div key={e.$id} className='relative bg-neutral-600/50 p-2 my-2 backdrop-blur-sm rounded-md w-max max-sm:w-full'>
{e.current?<span className="material-symbols-outlined absolute select-none right-1 top-1 text-[1rem] text-green-400 cursor-default">offline_bolt</span>:null}
<p className=' capitalize text-neutral-300 font-semibold text-[0.9rem]'>{e.clientType}: {e.clientName}</p>
<p className='capitalize text-[0.9rem] font-light'>{e.deviceName}: {e.osName} {e.osVersion}</p>
<div className='flex items-center mt-1'>
<p className=' capitalize text-[0.9rem]'>{e.provider}: </p> 
<p className='text-[0.9rem]'> {e.providerUid}</p>
</div>

</div>
))}
</div>
{oathpro?.provider == "email"?
<div className='w-full flex justify-between items-center py-8'>
<button onClick={()=>setemupcon(true)} className=' w-full rounded-sm p-1 bg-green-500 text-black font-semibold capitalize text-[0.7rem]'>update email</button>
</div>:null}

</div>


</div>

    </>
  ):(
    <>
    <div className='w-[95%] mx-auto p-7 rounded-md h-[25rem]'>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">

      <div className='flex w-[50%] gap-7 justify-center max-sm:w-full'>
      <Skeleton circle  width={"3rem"} height={"3rem"}/>
      <div className='w-full mb-4'>
      <Skeleton count={1}  width={""}  height={"1.5rem"}/>
      <Skeleton count={1} height={"1rem"}  width={"50%"}  />
      </div>
      </div>
      <Skeleton count={5} />
      </SkeletonTheme>
    </div>
    </>
  )
}

export default Profile