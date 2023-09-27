import useTypewriterEffect from '../hooks/useTypewriterEffect';

export default function AgentText({ existingChat, agentText, isLastTextNode = false, _id, questionText, handleQuestionSubmit, handleInputChange }) {
  let typedAnswer, isTyping;

  if (agentText && isLastTextNode) {
    ({ typedAnswer, isTyping } = useTypewriterEffect(agentText));
  }

  if (agentText) {
    return (
      <>
        <div id='agent' style={{ color: 'var(--primary)', animation: isLastTextNode ? 'fade-in 0.3s ease-in-out' : "none" }}>
          { isLastTextNode ? typedAnswer : agentText }
        </div>
        {isLastTextNode && !isTyping &&
          <form
            className="agent-response"
            onSubmit={(event) =>
              handleQuestionSubmit(questionText, _id, event)
            }
          >
            <input
              type="text"
              value={questionText}
              onChange={handleInputChange}
            />
            <button type="submit">Respond</button>
          </form>}
      </>
    )
  } else return <></>
}