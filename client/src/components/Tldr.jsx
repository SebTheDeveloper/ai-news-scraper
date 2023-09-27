import ReactMarkdown from "react-markdown"
import getDailyTldr from "../utils/getDailyTldr"
import { useEffect, useState } from "react";

export default function Tldr() {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    if (!markdownContent) {
      getDailyTldr()
        .then(tldr => setMarkdownContent(tldr))
    }
  }, [])
  

  return <div className="markdown">
    {!markdownContent && <div id="researching" style={{fontSize:'1.25rem'}}>Generating TLDR...</div>}
    <ReactMarkdown linkTarget={"_blank"}>
      {markdownContent}
    </ReactMarkdown>
  </div>
}