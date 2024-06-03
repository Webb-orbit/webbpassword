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

function App() {
  let disp = useDispatch()
  const [loding, setloding] = useState(true)



  useEffect(()=>{
    Auth.getcurrentacc().then((e)=>{
      if (e) {
        disp(storelogin(e.$id))
      } else {
        disp(storelogout())
      }
    })
    .finally(()=> setloding(false))
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
