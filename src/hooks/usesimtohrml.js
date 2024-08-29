import { highlightcode } from "./highlightcode";

export const usesimtohrml = (markdown) => {
    function escapee(str) {
        return str.replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/# /g, '&num; ')
            .replace(/\*/g, '&ast;')
            .replace(/\[/g, '&lbrack;')
            .replace(/\]/g, '&rbrack;')
            .replace(/}/g, '&rbrace;')
            .replace(/{/g, '&lbrace;')
            .replace(/```/g, '&grave;')
            .replace(/'/g, '&#039;');
    }
    let html = markdown
    .replace(/```([\s\S]*?)```/gim, (_, p1) => `<pre class='pre'><code>${escapee(p1)}</code></pre>`)
        .replace(/`([\s\S]*?)`/gim, (_, p1) => `<pre class='inline'><code>${escapee(p1)}</code></pre>`)
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a class='a' target='_blank' href='$1'>$2</a>")
        .replace(/^# (.*$)/gim, "<h1 class='h1'>$1</h1>")
        .replace(/^## (.*$)/gim, "<h2 class='h2'>$1</h2>")
        .replace(/^### (.*$)/gim, "<h3 class='h3'>$1</h3>")
        .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
        .replace(/^\*(.*$)/gim, "<ul><li>$1</li></ul>")
        .replace(/<\/ul>\s*<ul>/gim, "")
        .replace(/^\^(.*$)/gim, "<ol><li>$1</li></ol>")
        .replace(/<\/ol>\s*<ol>/gim, "")
        .replace(/^>(.*$)/gim, '<blockquote class="blok" >$1</blockquote>')
        .replace(/<\/blockquote>\n<blockquote>/gim, '<br/>')
        .replace(/^---/gm, "<hr />")
        .replace(/\n/gim, "<br />");

    return html
}
