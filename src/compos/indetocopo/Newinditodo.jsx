import {useEffect, useRef, useState } from "react"
import "../../editor.css"


const Newinditodo = () => {
  const [plain, setplain] = useState("")
  const textref = useRef(null)

  const texttomd = ()=>{
    let htm = plain
    .replace(/\((.*?)\)\[(.*?)\]/gim, "<a href=$1>$2</a>")

    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    
    .replace(/^\*\*(.*$)/gim, "<ul><li>$1</li></ul>")
    .replace(/<\/ul>\s*<ul>/gim, "")

    .replace(/^\d\.(.*$)/gim, "<ol><li>$1</li></ol>")
    .replace(/<\/ol>\s*<ol>/gim, "")

    .replace(/\*(.*)\*/gim, "<b>$1</b>")

    .replace(/^>(.*$)/gim, '<blockquote>$1</blockquote>') 
    .replace(/<\/blockquote>\s*<blockquote>/gim, '<br/>')

    .replace(/`([\s\S]*?)`/gim, '<pre><code>$1</code></pre>')
    .replace(/`(.*?)`/gim, '<code>$1</code>')
    
    .replace(/^---/gm, "<hr/>")

    .replace(/\n/gim, "<br/>")
    
    
    textref.current.innerHTML = htm
    console.log(textref.current.ariaRowIndex);
  }

  useEffect(()=>{
    texttomd()
  },[plain])
    
  return (
    <div className="flex min-h-[10rem]  h-full justify-around poppins-regular items-stretch">
      <textarea onChange={(e)=>setplain(e.target.value)} className=" resize-none p-5 w-[45%] bg-black  "></textarea>

      <div ref={textref} className=" p-5 w-[45%] bg-[#242424]  "></div>
    </div>
  )
}

export default Newinditodo