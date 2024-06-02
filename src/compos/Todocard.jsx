import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import Dataserv from "../appwrite/Data"
import { useDispatch } from "react-redux"
import { showtost, updatelistto } from "../store/Storeslice"
import { decodetoplain } from "../hooks/usecodetoplain"



const Todocard = ({ info, reference }) => {
  const navig = useNavigate()
  const disp = useDispatch()

  const gotodo = () => {
    navig(`${info.colluserid}/todo/${info.$id}`)
  }

  const deletetoso = async (id) => {
    try {
      console.log(info);
      if (info.shared) {
        let ishared = await Dataserv.shbylikedouserid(info.colluserid, id)
        let sharedoc = ishared.documents[0]
        if (ishared.total > 0) {
        console.log(ishared);
        let dele = await Dataserv.deletetodo(id)
        let deleteshare  = await Dataserv.deleteshare(sharedoc.$id)
        if (dele && deleteshare) {
          disp(updatelistto())
          disp(showtost({ "display": true, "mass": "share link and target both deleted", icon: 'delete', bg: "bg-red-400", time: '1500' }))
        }
      }
    } else {
      let dele = await Dataserv.deletetodo(id)
      if (dele) {
        disp(updatelistto())
        disp(showtost({ "display": true, "mass": "deleted", icon: 'delete', bg: "bg-red-400", time: '1500' }))
      }
    }
  } catch (error) {
    console.log(error);
    disp(showtost({ "display": true, "mass": "fail to delete", icon: 'delete', bg: "bg-red-400", time: '1500' }))
  }
  }

  const scrw = window.outerWidth


  return scrw > 640 ? (
    <motion.div
      dragConstraints={reference} drag dragTransition={{ bounceStiffness: 900, bounceDamping: 200 }} whileDrag={{ scale: 1.02 }}
      className=" select-none bg-opacity-70 backdrop-blur-[2px] bg-black-400 border-[1px] border-white rounded p-1 opacity-100  overflow-hidden text-white w-[15rem] h-[15rem] bg-black relative ">

      <div className="flex justify-between py-2">
        <h3 className=" w-[80%] overflow-hidden font-semibold poppins-regular text-neutral-200 whitespace-nowrap capitalize text-[1rem]">{info?.title}</h3>
        <div className="flex items-center">
          <span onClick={gotodo} className="material-symbols-outlined text-[1.1rem] text-neutral-400 hover:text-neutral-200  cursor-pointer">open_jam</span>
          <span onClick={() => deletetoso(info.$id)} className="material-symbols-outlined text-[1.1rem] text-neutral-400 hover:text-neutral-200  cursor-pointer">delete</span>
        </div>
      </div>
      <p className="text-[0.7rem] text-justify">{decodetoplain(info.content, info.code)}</p>
    </motion.div>
  ) : (
    <div className=" select-none bg-opacity-50 backdrop-blur-[2px] bg-black-400 border-[1px] border-white rounded p-1 opacity-100  overflow-hidden text-white bg-black relative w-[90%] min-h-36 max-h-36  break-words flex flex-col  ">
      <div className="flex justify-between h-8">
        <h3 className=" w-[80%] overflow-hidden font-semibold poppins-regular text-neutral-200  whitespace-nowrap capitalize text-[1.1rem]">{info?.title}</h3>
        <span onClick={() => deletetoso(info.$id)} className="material-symbols-outlined text-[1.1rem] text-neutral-400 hover:text-neutral-200  cursor-pointer">delete</span>
      </div>

      <Link className="h-full w-full" to={`${info.colluserid}/todo/${info.$id}`}>
        <p className="text-[0.7rem] text-justify">{decodetoplain(info.content, info.code)}</p>
      </Link>

    </div>
  )
}

export default Todocard