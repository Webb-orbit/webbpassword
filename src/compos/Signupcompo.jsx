import { useState } from 'react'
import Auth from '../appwrite/Auth'
import { useDispatch } from 'react-redux'
import { storelogin } from '../store/Storeslice'
import { useNavigate, Link } from 'react-router-dom'
import googlelogo from "../assets/unnamed.png"
import githublogo from "../assets/github.png"

const Signupcompo = () => {
    const [email, setemail] = useState("")
    const [name, setname] = useState("")
    const [password, setpassword] = useState("")
    const [erro, seterro] = useState("")
    let disp = useDispatch()
    const navig = useNavigate()

    const handelsub= async(e)=>{
        seterro("")
        e.preventDefault()
        try {
            let up = await Auth.createaccount({'email':email,'password':password,'name':name})
            if (up) {
                let data = await Auth.getcurrentacc()
                if (data) {
                disp(storelogin(data.$id))
                navig("/")
                }
            }
        } catch (error) {
            seterro(error)
        }
    }

    const oauthfungoogle = async()=>{
        await Auth.oauthgoogle()
      }
    
      const oauthfungithub = async()=>{
        await Auth.oauthgithub()
      }
    

  return (
    <>
    <div className=' text-white w-full h-screen flex flex-col items-center justify-center '>
    <h1 className='text-[1.5rem] uppercase font-[600] font-mono tracking-[6px] select-none text-center '>signup</h1>
        <p className='text-[0.7rem] text-red-300'>{erro && erro.response.message?erro.response.message:null}</p>
        <p className='text-[0.7rem] text-red-300'>{navigator.onLine?(null):("OFFLINE")}</p>
        
    <div className='flex flex-row-reverse justify-around items-center w-full h-[60vh] max-sm:flex-col'>

        <div className='w-[30%] flex flex-col items-center justify-center gap-4 max-sm:w-[90%]'>
    <button onClick={oauthfungoogle} className='  rounded-md w-[80%] bg-neutral-800/90 py-3 font-semibold capitalize flex items-center justify-center gap-2'><img className='w-[1.4rem]' src={googlelogo} />login with google</button>
    <button onClick={oauthfungithub} className='  rounded-md w-[80%] bg-neutral-800/90 py-3 font-semibold capitalize flex items-center justify-center gap-2'><img className='w-[1.4rem]' src={githublogo} />login with github</button>
        </div>
            
    <form onSubmit={handelsub} className=' w-[50%] flex flex-col items-center justify-center p-5 gap-8'>
        <input className=' text-white bg-transparent border-x-2 border-blue-400 outline-none px-2 py-1 text-[0.9rem] w-[20rem]' type="text" placeholder='email' spellCheck="false" 
        value={email}
        onChange={(e)=> setemail(e.target.value)}
        />
        <input className='text-white bg-transparent border-x-2 border-blue-400 outline-none px-2 py-1 text-[0.9rem] w-[20rem]' type="text" placeholder='password' spellCheck="false" 
        onChange={(e)=> setpassword(e.target.value)}
        value={password}/>
        <input className=' text-white bg-transparent border-x-2 border-blue-400 outline-none px-2 py-1 text-[0.9rem] w-[20rem]' type="text" maxLength={40} placeholder='name' spellCheck="false" 
        onChange={(e)=> setname(e.target.value)}
        value={name}/>
        <button type='submit' className=' bg-neutral-700 text-white px-10 py-1 outline-none rounded'>signup</button>
    </form>
        </div>
    <p>create account useing <Link className='text-blue-300' to={"/phonelogin"}>phone</Link></p>
    </div>
    </>
  )
}

export default Signupcompo