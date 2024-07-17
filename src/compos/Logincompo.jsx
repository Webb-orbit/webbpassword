import { useState } from 'react'
import Auth from '../appwrite/Auth'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { storelogin } from '../store/Storeslice'

const Logincompo = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [erro, seterro] = useState("")
  const disp = useDispatch()
  const navia = useNavigate()

  const handelsub = async(e)=>{
    e.preventDefault()
    seterro("")
    try {
      let log = await Auth.login(email,password)
      console.log(log);
      if (log) {
        let data = await Auth.getcurrentacc()
        if (data) {
          console.log(data)
          disp(storelogin(data.$id))
          navia("/")
        }
      }
    } catch (error) {
      seterro(error)
    }
  }

  const oauthfungoogle = async()=>{
    await Auth.oauthgoogle()
  }

  const oauthfungithub = ()=>{
     Auth.oauthgithub()
  }

  return (
<>
<div className=' text-white w-full h-screen flex flex-col items-center justify-center '>
    <h1 className='text-[1.5rem] uppercase font-[600] font-mono tracking-[6px] select-none'>login</h1>
        <p className='text-[0.7rem] text-red-300'>{erro && erro.response?.message?erro.response?.message:null}</p>
        <p className='text-[0.7rem] text-red-300'>{navigator.onLine?(null):("OFFLINE")}</p>

    <div className='flex flex-row-reverse items-center justify-around w-full h-[60vh] max-sm:flex-col'>
    <div className='w-[30%] flex flex-col items-center justify-center gap-4 max-sm:w-[90%]'>
    <button onClick={oauthfungoogle} className=' rounded-md w-[80%] bg-blue-500 py-3 font-semibold capitalize'>login with google</button>
    <button onClick={oauthfungithub} className=' rounded-md w-[80%] bg-blue-500 py-3 font-semibold capitalize'>login with github</button>
        </div>
    <form onSubmit={handelsub} className='w-[50%] flex flex-col items-center justify-center p-5 gap-8'>
        <input className=' text-white bg-transparent border-x-2 border-blue-400 outline-none px-2 py-1 text-[0.9rem] w-[20rem]' type="text" placeholder='email' spellCheck="false"
        onChange={(e)=> setemail(e.target.value)}
        value={email}/>
        <input className='text-white bg-transparent border-x-2 border-blue-400 outline-none px-2 py-1 text-[0.9rem] w-[20rem]' type="text" placeholder='password' spellCheck="false" 
        onChange={(e)=> setpassword(e.target.value)}
        value={password}/>
        <button type='submit' className=' bg-blue-500 text-white px-10 py-1 outline-none rounded'>login</button>
    </form>
    </div>
    <p>log in with <Link  className='text-blue-300' to={"/phonelogin"}>phone</Link></p>
    <p>you dont have account <Link  className='text-blue-300' to={"/signup"}>signup now</Link></p>
    </div>
</>
  )
}

export default Logincompo