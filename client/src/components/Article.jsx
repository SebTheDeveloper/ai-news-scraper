import { useEffect, useState } from "react";
import askQuestion from "../utils/askQuestion";
import Convo from "./Convo";
import { useUserContext } from "../context/UserContext";

export default function Article({ article }) {
  const [questionText, setQuestionText] = useState('');
  const [convoHistory, setConvoHistory] = useState({
    userSubmittedText: [],
    agentSubmittedText: []
  });
  const [isFromLocalStorage, setIsFromLocalStorage] = useState(false);
  const { toggleFavorite, itemInFavorites, updateConvoHistory, getKeyOfFavorite } = useUserContext()

  let { _id, title, createdOn, source, summary, categories, link} = article;

  const itemIsFavorited = itemInFavorites(article);

  useEffect(() => {
    if (itemIsFavorited) {
      const existingConvo = getKeyOfFavorite("convo", article)

      if (existingConvo?.userSubmittedText?.length > 0 && convoHistory.userSubmittedText.length === 0) {
        setIsFromLocalStorage(true)
        setConvoHistory(existingConvo)
      }
    }
  }, [])

  function handleInputChange(event) {
    setQuestionText(event.target.value);
  }

  async function handleQuestionSubmit(question, articleID, event) {
    event.preventDefault();
    if (questionText === '') {
      return
    }

    setQuestionText('');

    setConvoHistory(currHistory => ({
      userSubmittedText: [...currHistory.userSubmittedText, question],
      agentSubmittedText: currHistory.agentSubmittedText
    }));

    const response = await askQuestion(question, articleID, {
      userSubmittedText: [...convoHistory.userSubmittedText, question],
      agentSubmittedText: convoHistory.agentSubmittedText
    });
    setIsFromLocalStorage(false);
    
    setConvoHistory(currHistory => ({
      userSubmittedText: currHistory.userSubmittedText,
      agentSubmittedText: [...currHistory.agentSubmittedText, response]
    }));

    updateConvoHistory(article, {
      userSubmittedText: [...convoHistory.userSubmittedText, question],
      agentSubmittedText: [...convoHistory.agentSubmittedText, response],
    });
    
  }

  function handleToggleFavorite() {
    if (convoHistory.userSubmittedText?.length > 0) {
      toggleFavorite({
        ...article,
        convo: {
          userSubmittedText: convoHistory.userSubmittedText,
          agentSubmittedText: convoHistory.agentSubmittedText
        }
      })
    } else {
      toggleFavorite({
        ...article,
        convo: {
          userSubmittedText: [],
          agentSubmittedText: []
        }
      })
    }
  }

  return (
    <div className='article'>
      <h3>{title}</h3>
      <div className='content'>
        <p className='date'><span>Date:</span> {createdOn.date}</p>
        <p className='source'><span>Source:</span> {source}</p>
        <p className='ai-summary highlighted'><span>AI Summary:</span> {summary}</p>
        <p className='categories'><span>Categories:</span> {categories.join(', ')}</p>
      </div>
      <div className="article-card-bottom">
        <div className="ask-question">
          {convoHistory.userSubmittedText.length === 0 && <>
            <form onSubmit={event => handleQuestionSubmit(questionText, _id, event)}>
              <input
                type="text"
                value={questionText}
                onChange={handleInputChange}
              />
              <button type="submit">Ask a question</button>
            </form>
          </>}
          <div className="convo">
            <Convo
              isFromLocalStorage={isFromLocalStorage}
              questionText={questionText}
              article={article}
              userSubmittedText={convoHistory.userSubmittedText}
              agentSubmittedText={convoHistory.agentSubmittedText}
              handleQuestionSubmit={handleQuestionSubmit}
              handleInputChange={handleInputChange} />
          </div>
        </div>
        <div className='article-icons'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' onClick={handleToggleFavorite}>
            <title>Add to Favorites</title>
            {itemIsFavorited
              ?
              <path d="M5.8 21L7.4 14L2 9.2L9.2 8.6L12 2L14.8 8.6L22 9.2L18.8 12H18C14.9 12 12.4 14.3 12 17.3L5.8 21M17.8 21.2L22.6 16.4L21.3 15L17.7 18.6L16.2 17L15 18.2L17.8 21.2" />
              :
              <path d="M5.8 21L7.4 14L2 9.2L9.2 8.6L12 2L14.8 8.6L22 9.2L18.8 12H18C17.3 12 16.6 12.1 15.9 12.4L18.1 10.5L13.7 10.1L12 6.1L10.3 10.1L5.9 10.5L9.2 13.4L8.2 17.7L12 15.4L12.5 15.7C12.3 16.2 12.1 16.8 12.1 17.3L5.8 21M17 14V17H14V19H17V22H19V19H22V17H19V14H17Z" />}
          </svg>
          <a href={link} target='_blank' rel='noopener noreferrer'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <title>Go to Article</title>
              <path d='M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z' />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}