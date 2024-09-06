/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "boxicons"

import logo from "../assets/logo.jpeg"
import { changeshare, showtost, updatebycreateone } from '../store/Storeslice'
import Dataserv from '../appwrite/Data'
import { decodetoplain } from '../hooks/usecodetoplain'
import Loading from './Loading'
import Tooglebtn from './Tooglebtn'
import Auth from '../appwrite/Auth'

const Sharepage = ({ passslug, passid }) => {
  const [generated, setgenerated] = useState(false)
  const [showwindow, setshowwindow] = useState(false)

  const [pritoogle, setpritoogle] = useState(false)
  const [shownametoggle, setshownametoggle] = useState(true)
  
  const [shareddoc, setshareddoc] = useState([])
  const [decodecon, setdecodecon] = useState({})
  const [copyid, setcopyid] = useState(null)

  const { userid, slug } = useParams()

  const showpage = useSelector(state => state.sharecompo.display)
  const dispach = useDispatch()


  const copyurl = () => {
    navigator.clipboard.writeText(`https://darkpassword.vercel.app/shared/${copyid}`)
    dispach(changeshare(false))
    dispach(showtost({ "display": true, "mass": "shared url copyed", icon: 'content_copy', bg: "bg-green-400", time: '1500' }))
  }
  const userinfofun = async()=>{
      let varifuer = false
      const auther = await Auth.getcurrentacc()
      if(auther.emailVerification || auther.phoneVerification){
        varifuer = true
      }
      let stringreturn = JSON.stringify({"creatorname":auther.name, "varyfit":varifuer})
     return stringreturn
  }

  const createshare = async () => {
    const useslug = slug ? slug : passslug
    const useriduse = userid ? userid : passid
    try {
      const privaeduserinfo = await userinfofun()
      const shared = await Dataserv.gettodo(useslug)
      let dataset = JSON.stringify(shared)
      const make = await Dataserv.createshare({ "sharedtodo": dataset, "privated": shownametoggle, "user": useriduse, "views": 0, "autoupdate":pritoogle, "linkedtodoid":shared.$id, "creatorinfo": privaeduserinfo})
      await Dataserv.updatetodo(shared.$id, { "shared": true })

      let parsedtodo = JSON.parse(make.sharedtodo)
      const decode = await decodetoplain(parsedtodo.content, parsedtodo.code)
      if (make.privated) {
        setdecodecon({decontent: decode, createdAt: make.$createdAt, view:make.views, creator:JSON.parse(make.creatorinfo).creatorname, vari:JSON.parse(make.creatorinfo).varyfit})
      }else{
        setdecodecon({decontent: decode, createdAt: make.$createdAt, view:make.views, creator:"ghost", vari: false})
      }
      setcopyid(make.$id)
      setshareddoc([parsedtodo])

      setshowwindow(true)
      setgenerated(true)
      dispach(updatebycreateone())
    } catch (error) {
      dispach(showtost({ "display": true, "mass": "an error accourd", icon: 'error', bg: "bg-red-400", time: '1500' }))
    }
  }

  const isgenerated = async () => {
    const slugpassis = slug ? slug : passslug
    try {
      const is = await Dataserv.gettodo(slugpassis)
      const shared = await is
      if (shared.shared) {
        const sharedpage = await Dataserv.shbylikedouserid(shared.colluserid, shared.$id )
        const pageis = sharedpage.documents[0]
        console.log(pageis);

        const decode = await decodetoplain(shared.content, shared.code)
        if (pageis.privated) {
          setdecodecon({decontent: decode, createdAt: pageis.$createdAt, view:pageis.views, creator:JSON.parse(pageis.creatorinfo).creatorname, vari:JSON.parse(pageis.creatorinfo).varyfit})
        }else{
          setdecodecon({decontent: decode, createdAt: pageis.$createdAt, view:pageis.views, creator:"ghost", vari: false})
        }
        setcopyid(pageis.$id)
        setshareddoc([shared])
        setshowwindow(true)
        setgenerated(true)
      } else {
        setshowwindow(true)
        setgenerated(false)
      }
    } catch (error) {
      console.log('>>>>>>>>>>>', error)
    }

  }

  const autoupdatetoggle = (dd)=>{
    setpritoogle(dd)
  }
  const privatedtoggle = (dd)=>{
    setshownametoggle(dd)
  }

  useEffect(() => {
    isgenerated()
  }, [showpage])

  return showpage ? (
    <>
      <div className=' poppins-regular w-full h-screen backdrop-blur-sm fixed top-0 flex justify-center items-center z-50'>
        <div className=' overflow-y-scroll editor bg-neutral-950 w-[45vw] h-[80vh] rounded-md  p-5 flex flex-col  max-sm:w-[100%] max-sm:h-screen '>

          <div className='flex justify-between items-center py-1'>
            <h3 className=' font-bold '>share page</h3>
            <button onClick={() => dispach(changeshare(false))}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className='h-full flex flex-col justify-around items-center max-sm:justify-center max-sm:gap-10'>
{showwindow?(

            generated ? (
              <>
                {shareddoc.map((e) => (
                  <div key={e.$id} className='w-full h-[60%] overflow-y-scroll editor p-2 bg-[#202020] rounded-md break-words max-sm:h-[70%] '>

<div className=' bg-[#202020] w-full min-h-screen max-h-full'>

<div className='h-full py-3  flex justify-center items-center w-full max-sm:min-h-full '>
  
<div className='mx-auto border-b-2 w-[80%] flex flex-col items-center select-none gap-2 pb-3 max-sm:px-4 max-sm:min-w-full '>
  <h2 className=' text-[1.5rem] self-start font-semibold poppins-regular capitalize text-neutral-300 max-sm:text-[1.2rem]'>{e.title}</h2>
  <time className='self-start poppins-regular text-[0.8rem] font-semibold capitalize'>created at: {decodecon.createdAt.substring(0,10)}</time>
  <div className=' self-start flex w-full justify-between'>
  <p className=' poppins-regular text-[0.8rem] capitalize '>views: {decodecon.view}</p>
  <p className='self-start poppins-regular text-[0.8rem] capitalize'>creator: {decodecon.creator}</p>
  </div>
</div>

</div>

<pre className=' pt-5 pb-20 w-[95%] text-[1rem] leading-[1.8rem] poppins-regular text-neutral-300 mx-auto break-words max-sm:text-[4vw]  max-sm:w-[95%]'>
  {decodecon.decontent}
</pre>

</div>
                  </div>

                ))}
                <div className='flex flex-col gap-2 w-[95%]'>

                  <div className=' flex justify-around'>

                    <Link target='_blank' to={`https://www.facebook.com/sharer/sharer.php?u=https://darkpassword.vercel.app/shared/${copyid}`}>
                      <box-icon color="white" type='logo' name='facebook-circle' size="2rem"></box-icon>
                    </Link>

                    <Link target='_blank' to={`https://www.linkedin.com/shareArticle?url=https://darkpassword.vercel.app/shared/${copyid}`}>
                      <box-icon color="white" type='logo' name='linkedin' size="2rem"></box-icon>
                    </Link>

                    <Link target='_blank' to={`https://www.reddit.com/submit?url=https://darkpassword.vercel.app/shared/${copyid}`}>
                      <box-icon color="white" type='logo' name='reddit' size="2rem"></box-icon>
                    </Link>

                    <Link target='_blank' to={`https://api.whatsapp.com/send/?text=https://darkpassword.vercel.app/shared/${copyid}&type=custom_url&app_absent=0`}>
                    <box-icon color="white" type='logo' size="2rem" name='whatsapp'></box-icon>
                    </Link>

                    <Link target='_blank' to={`https://twitter.com/intent/post?url=https://darkpassword.vercel.app/shared/${copyid}`}>
                      <box-icon color="white" type='logo' name='xing' size="2rem"></box-icon>
                    </Link>

                    <button onClick={copyurl} className=' group'>
                      <span className=" group-hover:text-green-300 text-[1.5rem] material-symbols-outlined">content_copy</span>
                    </button>


                  </div>

                  <div className='flex items-center p-2 justify-between font-[500]  bg-[#202020] rounded-sm overflow-hidden relative'>
                    <p className='text-[0.8rem] w-[90%]  overflow-hidden font-[500] select-all selection:text-green-400' >{`https://darkpassword.vercel.app/shared/${copyid}`}</p>
                    <Link to={`https://darkpassword.vercel.app/shared/${copyid}`} target='_blank' className='absolute right-1'>
                      <span className="material-symbols-outlined cursor-pointer p-1 rounded-full hover:bg-black text-[1.3rem]">open_in_new</span>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
              <img src={logo} className=' rounded-full w-[30%]' />

<div className=" self-start flex flex-col gap-2">
              <div className='flex self-start gap-2 items-center'>
              <Tooglebtn side={pritoogle} fun={()=>autoupdatetoggle(!pritoogle)}/>
                <p className=' font-semibold capitalize text-[0.9rem]'>autoupdate</p>
              </div>
              <div className='flex self-start gap-2 items-center'>
              <Tooglebtn side={shownametoggle} fun={()=>privatedtoggle(!shownametoggle)}/>
                <p className=' font-semibold capitalize text-[0.9rem]'>show name</p>
              </div>
</div>

              <button onClick={createshare} className='self-end px-3 py-2 text-neutral-100 bg-green-500 rounded-md font-semibold'>create link</button>
              </>
              
            )
          ):(<><Loading mas={"featching..."} ani={false}/></>) }
          </div>
        </div>
      </div>
    </>
  ) : null
}

export default Sharepage