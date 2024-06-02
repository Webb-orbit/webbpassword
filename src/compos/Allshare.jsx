import { Link, useParams } from 'react-router-dom'
import Dataserv from '../appwrite/Data'
import { useEffect, useState } from 'react'
import { decodetoplain } from '../hooks/usecodetoplain'
import Screenloader from "./Screenloader"
import { useDispatch } from 'react-redux'
import { showtost } from '../store/Storeslice'
import Noty from './Noty'
import logo from "../assets/logo.jpeg"

const Allshare = () => {
  const { shareid } = useParams()
  const [data, setdata] = useState({})
  const [tododata, settododata] = useState({})
  const [decoed, setdecoed] = useState({})
  const [showshare, setshowshare] = useState(false)
  const dispach = useDispatch()


  const getpost = async () => {
    const get = await Dataserv.getshare(shareid)
    const datais = await get
    let setup = JSON.parse(datais.sharedtodo)
    const decodecon = await decodetoplain(setup.content, setup.code)
    const createtime = datais.$createdAt.substring(0,10)
       
    if (datais.privated && datais.creatorinfo) {
      let auther = JSON.parse(datais.creatorinfo)
      setdecoed({decontent:decodecon, createdAt: createtime, isauther:{authername:auther.creatorname, uservari: auther.varyfit}})
      settododata(setup)
      setdata(datais)
    }else{
      setdecoed({decontent:decodecon, createdAt: createtime, isauther:{authername:"ghost", uservari: false}})
      settododata(setup)
      setdata(datais)
    }
  }

  const viewsupdateer =  async()=>{
    let viewer = await Dataserv.getshare(shareid)
    const prev = viewer.views==null?Number(0):Number(viewer.views)
    setTimeout(async()=>{
     await Dataserv.updateshare(shareid,{"views":prev+1})
    },5000)
  }

  const copyurl = () => {
    navigator.clipboard.writeText(`https://darkpassword.vercel.app/shared/${shareid}`)
    setshowshare(false)
    dispach(showtost({ "display": true, "mass": "shared url copyed", icon: 'content_copy', bg: "bg-green-500", time: '1500' }))
  }

  useEffect(() => {
    getpost()
    viewsupdateer()
  }, [])
  
  return decoed.decontent? (
    <>
<Noty/>

    <div className='bg-[#202020]  flex px-3 capitalize py-1 justify-between items-center max-sm:fixed w-[100%] max-sm:top-0'>
      <h3 className=' w-[50%] overflow-x-hidden text-nowrap poppins-regular text-[0.8rem] text-neutral-100'>{tododata.title}</h3>
      <div className=' flex justify-center items-center gap-2'>

<button onClick={()=> setshowshare(pre=> !pre)} className=' appearance-none flex justify-center items-center h-full p-1  hover:bg-[#353535] rounded-md'>
      <span className="material-symbols-outlined text-neutral-300 text-[1.2rem]">send</span>
</button>

      <Link to={"https://darkpassword.vercel.app/"} target='_blank'>
      <button className=' capitalize font-medium flex justify-between gap-1 items-center text-[0.7rem] p-2 bg-[#202020] outline-1 outline outline-neutral-400/50 rounded-lg hover:bg-[#303030] duration-75'>build with <img src={logo} className='w-4 rounded-full' /></button>
      </Link>
      </div>
    </div>

    <div className={` flex justify-around right-20 bg-black w-[20rem] h-[5rem] p-4 rounded-lg items-center max-sm:right-1 max-sm:top-20 ${showshare?"absolute":"hidden"} `}>

                    <Link target='_blank' to={`https://www.facebook.com/sharer/sharer.php?u=https://darkpassword.vercel.app/shared/${shareid}`}>
                      <box-icon color="white" type='logo' name='facebook-circle' size="1.5rem"></box-icon>
                    </Link>

                    <Link target='_blank' to={`https://www.linkedin.com/shareArticle?url=https://darkpassword.vercel.app/shared/${shareid}`}>
                      <box-icon color="white" type='logo' name='linkedin' size="1.5rem"></box-icon>
                    </Link>

                    <Link target='_blank' to={`https://www.reddit.com/submit?url=https://darkpassword.vercel.app/shared/${shareid}`}>
                      <box-icon color="white" type='logo' name='reddit' size="1.5rem"></box-icon>
                    </Link>

                    <Link target='_blank' to={`https://api.whatsapp.com/send/?text=https://darkpassword.vercel.app/shared/${shareid}&type=custom_url&app_absent=0`}>
                    <box-icon color="white" type='logo' size="1.5rem" name='whatsapp'></box-icon>
                    </Link>

                    <Link target='_blank' to={`https://twitter.com/intent/post?url=https://darkpassword.vercel.app/shared/${shareid}`}>
                      <box-icon color="white" type='logo' name='xing' size="1.5rem"></box-icon>
                    </Link>

                    <button onClick={copyurl} className='group'>
                      <span className=" group-hover:text-green-300 text-[1.4rem] material-symbols-outlined">content_copy</span>
                    </button>


                  </div>


    <div className=' bg-[#202020] w-full min-h-screen max-h-full max-sm:mt-10'>

      <div className=' min-h-[15rem]  flex justify-center items-center w-full max-sm:min-h-[10rem] '>
        
      <div className='mx-auto border-b-2 min-w-[35%] flex flex-col items-center select-none gap-2 pb-3 max-sm:px-4 max-sm:min-w-full '>
        <h2 className=' text-[2.5rem] self-start font-semibold poppins-regular capitalize text-neutral-300 max-sm:text-[1.2rem]'>{tododata.title}</h2>
        <time className='self-start poppins-regular text-[0.8rem] font-semibold capitalize'>created at: {decoed.createdAt}</time>
        <div className=' self-start flex w-full justify-between'>
        <p className=' poppins-regular text-[0.8rem] capitalize '>views: {data.views}</p>
        <p className='self-start poppins-regular text-[0.8rem] capitalize'>creator: {decoed.isauther.authername}</p>
        </div>
      </div>

      </div>

      <pre className=' pt-5 pb-20 w-[55%] text-[1rem] leading-[1.8rem] poppins-regular text-neutral-300 mx-auto break-words max-sm:text-[4vw]  max-sm:w-[95%]'>
        {decoed.decontent}
      </pre>

    </div>
    </>
  ):<Screenloader send={"dark password"} />
}

export default Allshare