import AgentText from "./AgentText";
import UserText from "./UserText";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";

export default function Convo({
  isFromLocalStorage,
  questionText,
  article,
  userSubmittedText,
  agentSubmittedText,
  handleQuestionSubmit,
  handleInputChange,
}) {
  const { itemInFavorites, addToFavorites, updateConvoHistory } = useUserContext()

  useEffect(() => {
    if (userSubmittedText.length > 0) {
      if (!itemInFavorites(article)) {
        addToFavorites(article, {
          userSubmittedText,
          agentSubmittedText
        })
      } else {
        updateConvoHistory(article, {
          userSubmittedText,
          agentSubmittedText
        })
      }
    }
  }, [userSubmittedText, agentSubmittedText])

  return userSubmittedText.map((userText, index) => {
    const isLastTextNode = index + 1 === userSubmittedText.length;

    return (
      <div key={index} style={{display: 'flex', flexDirection: 'column'}}>
        <UserText userText={userText} />
        {!agentSubmittedText[index] && (
          <div id={"researching"}>researching...</div>
        )}
        {agentSubmittedText[index] && (
          <AgentText
            isFromLocalStorage={isFromLocalStorage}
            agentText={agentSubmittedText[index]}
            isLastTextNode={isLastTextNode}
            questionText={questionText}
            _id={article._id}
            handleQuestionSubmit={handleQuestionSubmit}
            handleInputChange={handleInputChange}
          />
        )}
      </div>
    );
  });
}
