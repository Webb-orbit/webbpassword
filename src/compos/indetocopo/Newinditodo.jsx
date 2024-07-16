import { useState } from "react"
import Sharepage from "../Sharepage"
import "./editor.css"
import Indisidebar from "./Indisidebar"
import Maintodo from "./Maintodo"

const Newinditodo = () => {
  const [togg, settogg] = useState(false)

  return (
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
  )
}

export default Newinditodo