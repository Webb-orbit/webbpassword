import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Dataserv from '../../appwrite/Data'
import { decodetoplain } from '../../hooks/usecodetoplain'
import { usesimtohrml } from '../../hooks/usesimtohrml'
import { useDispatch } from 'react-redux'
import { showtost } from '../../store/Storeslice'
import { usecretecode } from '../../hooks/usedecode'
import Boat from './Boat'

const Maintodo = () => {
  const [tododata, settododata] = useState({})
  const { slug, userid } = useParams()
  const textref = useRef(null)
  const [edited, setedited] = useState(false)
  const [splited, setsplited] = useState(true)
  const [editorpreview, seteditorpreview] = useState(false)
  const [mdtext, setmdtext] = useState("")
  const disp = useDispatch()
  const Navigate = useNavigate() 

  const usertodofetch = async () => {
    try {
      setedited(false)
      const todo = await Dataserv.gettodo(slug)
      console.log("todo", todo)
      const decoded = decodetoplain(todo.content, todo.code)
      const htmltext = usesimtohrml(decoded)
      textref.current.innerHTML = htmltext
      settododata(todo)
      setmdtext(decoded)
    } catch (error) {
      Navigate("/")
      console.log(error);
      disp(showtost({ "display": true, "mass": "invalid argument", icon: 'sports_volleyball', bg: "bg-red-500", time: '2000' }))
    }
  }

  const cancleedit = async()=>{
    try {
      const done = await usertodofetch()
      if(done){
        setedited(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const savetodo = async () => {
    try {
      if (mdtext.length > 50000) {
        disp(showtost({ "display": true, "mass": "content overloaded", icon: 'full_stacked_bar_chart', bg: "bg-red-500", time: '1000' }))
      } else {
        const dd = await usecretecode(mdtext, slug)
        const chack = await Dataserv.shbylikedouserid(userid, tododata.$id)
        const savedata = await Dataserv.updatetodo(tododata.$id, { content: dd })
        // start here
        if (chack.documents.length > 0 && chack.documents[0].autoupdate && savedata) {
          const updatepage = await Dataserv.updateshare(chack.documents[0].$id, { "sharedtodo": JSON.stringify(savedata) })
          if (updatepage) {
            await usertodofetch()
            disp(showtost({ "display": true, "mass": "todo and share page updated", icon: 'save', bg: "bg-green-500", time: '2000' }))
          }
        } else {
          if (savedata) {
            await usertodofetch()
            disp(showtost({ "display": true, "mass": "save", icon: 'save', bg: "bg-green-500", time: '1500' }))
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    usertodofetch()
  }, [slug])

  useEffect(() => {
    const htmltext = usesimtohrml(mdtext)
    textref.current.innerHTML = htmltext
  }, [mdtext])

  return (
    <>
    <div className="p-2 w-[90%] max-sm:w-[100%]" >
      <div>
        <div className='flex justify-between py-10'>
          <h2 className=' capitalize font-semibold text-neutral-400 text-[2rem]' >{tododata.title}</h2>
          <div>
          <button onClick={() => setedited(pre => !pre)} className='material-symbols-outlined'>edit</button>
          </div>
        </div>
        <div className='mt-20  flex flex-col max-sm:mt-0'>
          <div className={`  justify-between h-12 items-center bg-neutral-900 py-2 px-2 ${edited ? "flex" : "hidden"}`}>
            <div className='flex gap-4 h-full'>
              {!splited && <button onClick={() => seteditorpreview(true)} className={`h-full px-4   capitalize font-medium rounded-sm ${!editorpreview ? "bg-black" : "bg-neutral-700/70"}`}>editor</button>}
              {!splited && <button onClick={() => seteditorpreview(false)} className={`h-full px-4   capitalize font-medium rounded-sm ${editorpreview ? "bg-black" : "bg-neutral-700/70"}`}>preview</button>}
            </div>
            <div className='flex gap-2'>
              <button onClick={() => setsplited(pre => !pre)} className=" material-symbols-outlined">{!splited ? "splitscreen_left" : "fullscreen_portrait"}</button>
              <button onClick={savetodo} className="px-3 bg-green-500 rounded-sm font-medium" >save</button>
              <button onClick={cancleedit} className="material-symbols-outlined" >do_not_disturb_on</button>
            </div>
          </div>
          <div className=" flex w-full max-sm:flex-col">

            {edited && <div className={`${splited ? "w-1/2 max-sm:w-[100%]" : editorpreview ? "w-full" : "hidden"}`}>
              <textarea onChange={(e) => setmdtext(e.target.value)} value={mdtext} spellCheck="false" maxLength={50000} className=' w-full resize-none bg-neutral-900 whitespace-break-spaces p-2 h-[90vh] overflow-y-scroll editor outline-none'></textarea>
            </div>}

            <div className={`${edited ? splited ? "w-1/2 max-sm:w-[100%]" : editorpreview ? "hidden" : "w-full" : "w-[85%] max-sm:w-[100%]"}`}>
              <div ref={textref} className={` text-[1.1rem] max-sm:text-[0.9rem] text-neutral-200 whitespace-break-spaces ${edited && "w-[100%] h-[90vh] overflow-y-scroll editor p-2 "}`}></div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <Boat tododata={tododata}/>
    </>
  )
}

export default Maintodo
