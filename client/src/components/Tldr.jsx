import ReactMarkdown from "react-markdown"
import getDailyTldr from "../utils/getDailyTldr"
import { useEffect, useState } from "react";

export default function Tldr() {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    if (!markdownContent) {
      getDailyTldr().then(tldr => setMarkdownContent(tldr))
      console.log('hi')
    }
  }, [])

  return <div className="markdown">
    <ReactMarkdown linkTarget={"_blank"}>
      {markdownContent}
    </ReactMarkdown>
  </div>
}