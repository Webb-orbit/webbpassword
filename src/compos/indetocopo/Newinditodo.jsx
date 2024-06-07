import {useEffect, useRef, useState } from "react"
import "../../editor.css"


const Newinditodo = () => {
  const [plain, setplain] = useState("")
  const textref = useRef(null)
  
  function escapee(str) {
    return str.replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
}

  const texttomd = ()=>{
    let htm = plain
    .replace(/\((.*?)\)\[(.*?)\]/gim, "<a data-md='not' target='_blank' href='$1'>$2</a>")
    
    .replace(/^# (.*$)/gim, "<h1 data-md='not'>$1</h1>")
    .replace(/^## (.*$)/gim, "<h2 data-md='not'>$1</h2>")
    .replace(/^### (.*$)/gim, "<h3 data-md='not'>$1</h3>")
    
    .replace(/^\*\*(.*$)/gim, "<ul data-md='not'><li>$1</li></ul>")
    .replace(/<\/ul>\s*<ul>/gim, "")
    
    .replace(/^\d\.(.*$)/gim, "<ol data-md='not'><li>$1</li></ol>")
    .replace(/<\/ol>\s*<ol>/gim, "")
    
    .replace(/\*(.*)\*/gim, "<b data-md='not'>$1</b>")
    
    .replace(/^>(.*$)/gim, '<blockquote data-md="not">$1</blockquote>') 
    .replace(/<\/blockquote>\s*<blockquote>/gim, '<br/>')
    
    .replace(/`([\s\S]*?)`/gim, (_, p1) => `<pre data-md='not' ><code>${escapee(p1)}</code></pre>`)
    
    .replace(/^---/gm, "<hr data-md='not' />")
    .replace(/\n/gim, "<br data-md='not' />")

    textref.current.innerHTML = htm
  }

  useEffect(()=>{
    texttomd()
  },[plain])
    
  return (
    <div className="flex min-h-[10rem] h-full justify-around poppins-regular items-stretch">
      <textarea spellCheck="false" onChange={(e)=>setplain(e.target.value)} className=" resize-none p-5 w-[45%] bg-black  "></textarea>

      <div ref={textref} className=" whitespace-pre-wrap break-words p-5 w-[45%] bg-[#242424]"></div>
    </div>
  )
}

export default Newinditodo