import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import logo from "../assets/logo.jpeg"
import { changeshare } from '../store/Storeslice'
const Navbar = () => {
  let selet= useSelector(state=>state.track.status)
  const {slug} = useParams()
  const disp = useDispatch()

  return (
    <>
    <div className={ ` w-full bg-neutral-950 text-white z-10 h-14 flex  items-center  justify-between px-[5%] border-b-[1px]`}>
      <Link to={"/"}>
        <img src={logo} className=' w-[2.5rem] h-[2.5rem] rounded-full cursor-pointer'/>
      </Link>
      <div className='flex items-center gap-4'> 
      {slug && <button onClick={()=>disp(changeshare(true))} className='px-3 bg-green-500 text-black py-1 rounded-md font-medium capitalize text-[0.9rem]'>share</button>}

        {!selet?(
          <div className=' flex gap-6 '>
          <p className=' text-[0.9rem] hover:text-blue-300 '><Link to={"/login"} className='flex items-center'><span className="material-symbols-outlined">login</span>login</Link></p>
          <p className=' text-[0.9rem] text-white'><Link to={"/signup"} className=' rounded-md bg-blue-600 py-1 px-3'>signup</Link></p>
          </div>
        ):(<Link to={"/account/info"}><span className={` hover:text-neutral-200 text-[1.9rem] rounded-full  material-symbols-outlined `}>account_circle</span></Link>)}
        </div>
    </div>
    </>
  )
}

export default Navbar