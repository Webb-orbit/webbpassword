import { useEffect, useRef } from 'react'
import Sidespeeches from './Sidespeeches'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { menuopener, updatespeaking } from '../../store/Storeslice'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.jpeg"

const Blankspeech = () => {
  const [displey, setdispley] = useState("")
  const [playindi, setplayindi] = useState(false)
  const selectedvoice = useSelector(state => state.voiceis.pekosa)
  const disp = useDispatch()
  const preref = useRef(null)

  const synth = speechSynthesis
  const utterance = new SpeechSynthesisUtterance();
  const voicesobj = synth.getVoices()


  const readtodo = () => {
    if ((synth.paused) || (playindi == false)) {
      utterance.voice = voicesobj.filter(function (voice) { return voice.voiceURI == selectedvoice })[0]
      utterance.text = displey
      disp(updatespeaking(true))
      setplayindi(true)
      synth.resume()
      synth.speak(utterance);
    } else {
      synth.pause()
      setplayindi(false)
      disp(updatespeaking(false))
    }
  }

  const restart = () => {
    synth.cancel()
    utterance.voice = voicesobj.filter(function (voice) { return voice.voiceURI == selectedvoice })[0]
    utterance.text = displey
    synth.speak(utterance);
    setplayindi(true)
    disp(updatespeaking(true))
  }

  const prient = () => {
    navigator.clipboard
    .readText()
    .then((clipText) => (setdispley(clipText)));
    synth.cancel()
    setplayindi(false)
    disp(updatespeaking(false))
  }

  const menuopenerfun = () => {
    disp(menuopener())
  }

  utterance.addEventListener("end", () => {
    synth.cancel()
    setplayindi(false)
    disp(updatespeaking(false))
  });

  utterance.onboundary = (e)=>{
    let para = utterance.text
    let lengh = Number(utterance.text.length)
    let past =  para.substring(0, e.charIndex + e.charLength)
    let unspokenWords = para.slice((e.charIndex + e.charLength), lengh)
    preref.current.innerHTML = `<span style="color: lightgreen;">${past}</span>${unspokenWords}`
  }


  useEffect(() => {
    synth.cancel()
    setplayindi(false)
    disp(updatespeaking(false))
  }, [selectedvoice])

  return (
    <>
      <div className=' px-12 flex justify-between items-center w-full py-5 max-sm:px-4 bg-black fixed'>
        <Link to={"/"}>
          <img src={logo} className=' w-[2.5rem] h-[2.5rem] rounded-full cursor-pointer' />
        </Link>

        <button onClick={menuopenerfun} className='hidden max-sm:block'>
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      <div className='flex px-2 w-full py-3 justify-between items-center h-[90vh] max-sm:flex-col'>

        <div className='w-[20%] max-sm:w-[100%] self-start  '>
          <Sidespeeches />
        </div>

        <div className=' max-sm:z-2 w-[100%] h-[100%] flex flex-col justify-between items-center'>


          <div className=' flex justify-center w-[75%] mt-10 max-sm:w-full max-sm:h-[100%] '>
            <pre ref={preref}  spellCheck={false} className=' bottom-0 outline-none bg-transparent poppins-regular py-10 break-words w-[100%] editor text-[1rem] text-neutral-200 leading-[1.9rem] max-sm:text-[0.8rem] max-sm:pb-16 '>{displey}</pre>
          </div>

          <div className='h-[10%] w-[100%] flex gap-4 items-center justify-center py-2 bg-neutral-950/90 max-sm:py-2 max-sm:backdrop:blur-sm  max-sm:w-full fixed bottom-0'>

            <button onClick={prient} ><span className='p-1 border-[2px] rounded-full text-[1.2rem] text-neutral-100 material-symbols-outlined hover:text-neutral-800 hover:bg-neutral-100 max-sm:hover:bg-transparent max-sm:hover:text-white max-sm:active:bg-neutral-100 max-sm:active:text-neutral-900'>print</span></button>

            <button onClick={readtodo} ><span className={`p-1 border-[2px] rounded-full text-[1.2rem] ${playindi ? " text-green-500" : "text-neutral-100"}  material-symbols-outlined hover:border-neutral-400  max-sm:hover:bg-transparent  max-sm:active:bg-neutral-100 max-sm:active:text-neutral-900`}>{playindi ? "stop" : "fiber_manual_record"}</span></button>

            <button onClick={restart}><span className='p-1 border-[2px] rounded-full text-[1.2rem] text-neutral-100 material-symbols-outlined hover:text-neutral-800 hover:bg-neutral-100 max-sm:hover:bg-transparent max-sm:hover:text-white max-sm:active:bg-neutral-100 max-sm:active:text-neutral-900'>restart_alt</span></button>
            <p className=' absolute bottom-[2px] select-none text-[0.6rem] max-sm:text-[0.4rem] text-neutral-400 poppins-regular'>Dark password can't work properly in Low-end mobiles | May 2024</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blankspeech