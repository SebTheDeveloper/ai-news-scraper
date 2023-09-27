import AgentText from "./AgentText";
import UserText from "./UserText";

export default function Convo({
  questionText,
  article,
  userSubmittedText,
  agentSubmittedText,
  handleQuestionSubmit,
  handleInputChange,
}) {

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
            agentText={agentSubmittedText[index]}
            typewriter={isLastTextNode ? true : false}
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
