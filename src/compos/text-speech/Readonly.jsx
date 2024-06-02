import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Dataserv from '../../appwrite/Data'
import { decodetoplain } from "../../hooks/usecodetoplain"
import { useDispatch, useSelector } from 'react-redux'
import { menuopener, updatespeaking } from '../../store/Storeslice'
import Auth from '../../appwrite/Auth'
import { showtost } from '../../store/Storeslice'

const Readonly = () => {
  const { todoids, userid } = useParams()

  const [plaintext, setplaintext] = useState(null)
  const [displey, setdispley] = useState("")
  const [loader, setloader] = useState(false)
  const [playindi, setplayindi] = useState(false)
  const [volumebar, setvolumebar] = useState(false)

  const selectedvoice = useSelector(state => state.voiceis.pekosa)
  const disp = useDispatch()
  const preref = useRef(null)
  const nevi = useNavigate()


  const synth = speechSynthesis
  const utterance = new SpeechSynthesisUtterance();
  const voicesobj = synth.getVoices()


  const gettodofun = async () => {
    try {
      setloader(false)
      disp(menuopener(false))
      let user = await Auth.getcurrentacc()
      let useri = await user.$id
      if (userid == useri) {
        const fetchtodo = await Dataserv.gettodo(todoids)
        const restodo = await fetchtodo
        const decode = await decodetoplain(restodo.content, restodo.code)
        setplaintext(decode)
        setdispley(decode)
        setloader(true)
      } else {
        nevi("/")
        disp(showtost({ "display": true, "mass": "Invalid Argument", icon: 'error', bg: "bg-red-400", time: '1500' }))
      }

    } catch (error) {
      nevi("/")
      disp(showtost({ "display": true, "mass": "page not found", icon: 'error', bg: "bg-red-400", time: '1500' }))
    }
  }


  const readtodo = () => {
    if ((synth.paused) || (playindi == false)) {
      utterance.voice = voicesobj.filter(function (voice) { return voice.voiceURI == selectedvoice })[0]
      utterance.text = plaintext
      disp(updatespeaking(true))
      setplayindi(true)
      synth.resume()
      synth.speak(utterance);
    } else {
      console.info("else")
      synth.pause()
      setplayindi(false)
      disp(updatespeaking(false))
    }
  }

  const restart = () => {
    synth.cancel()
    utterance.voice = voicesobj.filter(function (voice) { return voice.voiceURI == selectedvoice })[0]
    utterance.text = plaintext
    synth.speak(utterance);
    setplayindi(true)
    disp(updatespeaking(true))
  }

  utterance.addEventListener("end", () => {
    synth.cancel()
    setplayindi(false)
    disp(updatespeaking(false))
  });

  utterance.onboundary = (e) => {
    let para = utterance.text
    let lengh = Number(utterance.text.length)

    let past = para.substring(0, e.charIndex + e.charLength)
    let unspokenWords = para.slice((e.charIndex + e.charLength), lengh)
    preref.current.innerHTML = `<span style="color: red;">${past}</span>${unspokenWords}`

  }


  useEffect(() => {
    synth.cancel()
    setplayindi(false)
    disp(updatespeaking(false))
    gettodofun()
  }, [todoids])

  useEffect(() => {
    synth.cancel()
    setplayindi(false)
    disp(updatespeaking(false))
    disp(menuopener())
  }, [selectedvoice])


  return loader ? (
    <>
      <div className=' flex justify-center w-[75%]  max-sm:w-full max-sm:h-[100%] mt-12 '>
        <pre ref={preref} className='poppins-regular py-6 overflow-y-scroll w-[100%] editor text-[1rem] text-neutral-200 leading-[1.9rem] max-sm:text-[0.8rem] pb-16  '>{displey}</pre>
      </div>

      <div className={` bg-neutral-500/30 px-8 py-2 rounded-full ${volumebar?"block":"hidden"}`}>
        <input type="radio" name="volume"/>
        <input type="radio" name="volume"/>
        <input type="radio" name="volume"/>
        <input type="radio" name="volume"/>
        <input type="radio" name="volume"/>
      </div>

      <div className='h-[3rem] w-[100%] flex gap-4 items-center justify-center py-2 bg-neutral-950/90 max-sm:py-2 max-sm:backdrop:blur-sm  max-sm:w-full fixed bottom-0'>

        <button className='justify-self-end' onClick={()=>setvolumebar(!volumebar)} ><span className=' p-1 border-[2px] rounded-full text-[1.2rem] text-neutral-100 material-symbols-outlined hover:text-neutral-800 hover:bg-neutral-100 max-sm:hover:bg-transparent max-sm:hover:text-white max-sm:active:bg-neutral-100 max-sm:active:text-neutral-900'>volume_up</span></button>

        <button onClick={readtodo} ><span className={`p-1 border-[2px] rounded-full text-[1.2rem] ${playindi ? " text-green-500" : "text-neutral-100"}  material-symbols-outlined hover:border-neutral-400  max-sm:hover:bg-transparent  max-sm:active:bg-neutral-100 max-sm:active:text-neutral-900`}>{playindi ? "stop" : "fiber_manual_record"}</span></button>

        <button onClick={restart}><span className='p-1 border-[2px] rounded-full text-[1.2rem] text-neutral-100 material-symbols-outlined hover:text-neutral-800 hover:bg-neutral-100 max-sm:hover:bg-transparent max-sm:hover:text-white max-sm:active:bg-neutral-100 max-sm:active:text-neutral-900'>restart_alt</span></button>

      </div>
    </>
  ) : null
}

export default Readonly