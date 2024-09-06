import { useEffect, useState } from 'react'
import Auth from '../appwrite/Auth'
import Loading from './Loading'
import {useDispatch } from 'react-redux'
import { showtost, storelogout } from '../store/Storeslice'
import { useNavigate } from 'react-router-dom'
import Dataserv from '../appwrite/Data'
import Clientbase from '../appwrite/client'

const Dangerzone = () => {
    const [emailphone, setemailphone] = useState()
    const [btnname, setbtnname] = useState("")
    const [load, setload] = useState(false)
    const disp = useDispatch()
    const returnto = useNavigate()

    const userdata = async()=>{
        let userd = await Auth.getcurrentacc()
        setemailphone(userd)
        setbtnname("delete account")
    }

    async function deleteTodos(todosdoc) {
      await Promise.all(todosdoc.map(async (e) => {
        await Dataserv.deletetodo(e.$id);
      }));
      disp(showtost({ "display": true, "mass": "All targets are deleted", icon: 'error', bg: "bg-white-500", time: '500' }));
      return true
    }
    
    async function deleteShares(sharesdoc) {
      
      await Promise.all(sharesdoc.map(async (e) => {
        await Dataserv.deleteshare(e.$id);
      }));
      disp(showtost({ "display": true, "mass": "All shares are deleted", icon: 'error', bg: "bg-white-500", time: '500' }));
      return true
    }

    const logouts = async()=>{
      try {
        let out = await Auth.logoutforall()
        if (out) {
          disp(storelogout())
          returnto("/")
        }
      } catch (error) {
        disp(showtost({"display":true, "mass":"something went missing", icon:'error', bg:"bg-red-500", time:'5000'}))
      }
    }

    const condelete = async()=>{
        if (btnname == "delete account" ) {
            setbtnname("confirm")
        }else{
          try {
            setbtnname("deleting...")
            setload(true)
            let todos = (await Dataserv.alltodos(emailphone.$id)).documents
            let shares = (await Dataserv.sharesbyid(emailphone.$id)).documents
            let users = (await Clientbase.getclientbyuserid(emailphone.$id)).documents

            let aa = await deleteTodos(todos);
            let bb = await deleteShares(shares);
            let dd = await Clientbase.deleteuser(users);

            if (aa && bb && dd) {
              console.log("done");
              logouts()
            }

            } catch (error) {
              console.log(error);
                disp(showtost({"display":true, "mass":"Something went wrong during the final countdown", icon:'error', bg:"bg-red-500", time:'5000'}))
            }
        }
    }




    useEffect(()=>{
        userdata()
    },[])

  return emailphone? (
    <div className='poppins-regular w-[90%] mx-auto p-7 rounded-md h-[100%] bg-neutral-950  mb-4 max-[800px]:flex-col max-[800px]:w-[95%] max-[800px]:px-1 max-[800px]:py-7'>
      <div className=' mb-4'>
        <h2 className=' uppercase text-[1.2rem] tracking-[2px] text-red-500 select-none font-bold'>dalete account</h2>
        <p className='text-[0.7rem] text-neutral-300'>{emailphone.email?emailphone.email:emailphone.phone}</p>
      </div>

      <div>
        
          {btnname!="delete account"?(<><p className='text-[0.9rem] uppercase text-neutral-200 font-semibold poppins-regular'>Deleting your account is final. Be sure before you proceed.</p></>):(<>
         <ul className=' ml-10 list-disc uppercase text-neutral-200 font-semibold poppins-regular max-sm:ml-0 max-sm:text-[0.8rem]'>
          <li>darkpassword delete your all target, shares and files</li>
          <li>Logging out for all devices</li>
          </ul> 
          </>)}
          
        <button onClick={condelete} className={`text-[0.8rem] rounded font-semibold capitalize mt-4 px-2 py-1 bg-red-600 text-neutral-100 ${load?"animate-pulse1s":null}`}>{btnname}</button>

        <button onClick={()=>setbtnname("delete account")} className={` ml-4 text-[0.8rem] rounded font-semibold capitalize mt-4 px-2 py-1 bg-green-600 text-neutral-100 ${btnname!="delete account"?"black":"hidden"}`}>keep account</button>
      </div>

    </div>
  ):<Loading/>
}

export default Dangerzone