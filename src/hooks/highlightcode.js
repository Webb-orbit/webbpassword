import hljs from "highlight.js"

export const highlightcode = (code)=>{
    if(!code) return null
    const highlightedCode = hljs.highlight(code ,{ language: 'JavaScript' }).value
      console.log(highlightedCode);
      return highlightedCode
}