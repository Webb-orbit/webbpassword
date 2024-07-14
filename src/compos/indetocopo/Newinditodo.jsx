import Sharepage from "../Sharepage"
import "./editor.css"
import Indisidebar from "./Indisidebar"
import Maintodo from "./Maintodo"

const Newinditodo = () => {


  return (
    <>
    <Sharepage/>
    <div className=" flex p-2 gap-10">
      <div className="sticky top-0">
      <Indisidebar/>
      </div>
      <Maintodo/>
    </div>
    </>
  )
}

export default Newinditodo