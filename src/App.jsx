import { useEffect, useState } from "react"
import { Analytics } from '@vercel/analytics/react';
import Auth from "./appwrite/Auth"
import { useDispatch } from "react-redux"
import { storelogin, storelogout } from "./store/Storeslice"
import { Outlet } from "react-router-dom"
import Navbar from "./compos/Navbar"
import Noty from "./compos/Noty"
import { SpeedInsights } from "@vercel/speed-insights/react"
import Screenloader from "./compos/Screenloader";
import Dataserv from "./appwrite/Data";
import Clientbase from "./appwrite/client";

function App() {
  let disp = useDispatch()
  const [loding, setloding] = useState(true)

const init = async()=>{
  try {
    let current = await Auth.getcurrentacc()
    if (current) {
      let user = (await Clientbase.getclientbyuserid(current.$id)).documents
      if (user.length > 0) {
        console.log("have", user);
        disp(storelogin(current.$id))
      }else{
        const newuser = await Clientbase.createclient(current.$id)
        if (newuser) {
          console.log("newmade", newuser);
          disp(storelogin(current.$id))
        }
      }
    }else{
      disp(storelogout())
    }
  } catch (error) {
    console.log(error);
  } finally{
    setloding(false)
  }
}

  useEffect(()=>{
init()
  },[])


   return loding?(
    <Screenloader send={"dark password"}/>
  ):( 
   <>
   <Navbar/>
   <Noty/>
   <SpeedInsights/>
   <Analytics />
   <Outlet/>
  </>
    )
}


export default App
