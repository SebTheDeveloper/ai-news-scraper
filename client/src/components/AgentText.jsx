import useTypewriterEffect from '../hooks/useTypewriterEffect';

export default function AgentText({ agentText, typewriter, isLastTextNode = false, _id, questionText, handleQuestionSubmit, handleInputChange }) {
  let typedAnswer, isTyping;

  if (agentText && typewriter) {
    ({ typedAnswer, isTyping } = useTypewriterEffect(agentText));
  }

  if (agentText) {
    return (
      <>
        <div id='agent' style={{ color: 'var(--primary)', animation: isLastTextNode ? 'fade-in 1.75s ease-in-out' : "none" }}>
          { typewriter ? typedAnswer : agentText }
        </div>
        {typewriter && !isTyping &&
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