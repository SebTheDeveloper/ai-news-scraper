import React, { useState, lazy, Suspense } from 'react';
import useArticlesFetch from '../hooks/useArticlesFetch';


export default function ArticlesWrapper() {

  const [articleTimeframe, setArticleTimeframe] = useState('today');
  let [articles, setArticles, fetchArticles] = useArticlesFetch(articleTimeframe);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  function handleFilterChange(e) {
    const selectedTimeframe = e.target.value;
    if (selectedTimeframe !== articleTimeframe) {
      setArticleTimeframe(selectedTimeframe);
    }
  }

  async function handleGetArticles() {
    setIsButtonDisabled(!isButtonDisabled);
    const newsIsProcessed = await fetch('http://localhost:3000/api/scrape-and-summarize-daily-news', {
      method: 'POST'
    });
    if (newsIsProcessed.status === 200) {
      setIsButtonDisabled(!isButtonDisabled);
      await fetchArticles(articleTimeframe)
    }
  }
  
  const LazyArticle = lazy(() => import('./Article'));

  return (
    <div className='articles-section'>
      <div className='view-articles'>
        <p>View Articles from</p>
        <select name='view-articles' onChange={handleFilterChange}>
          <option value='today'>Today</option>
          <option value='yesterday'>Yesterday</option>
          <option value='favorites'>Favorites</option>
        </select>
      </div>
      <div className='articles'>
        {articles.map(article => (
        <Suspense key={article._id}>
        <LazyArticle article={article} />
        </Suspense>
        ))}
        {articles.length === 0 && <>
          <div>No articles found...</div>
          {articleTimeframe === 'today' && 
          <button
            onClick={handleGetArticles}
            disabled={isButtonDisabled}
            style={{
              pointerEvents: isButtonDisabled ? 'none' : 'auto',
              animation: isButtonDisabled ? 'loading 2s ease-in-out infinite' : 'none',
              maxWidth: '300px',
              boxShadow: 'inset 0 0 16px rgb(0,0,0)'
            }}
          >
            {isButtonDisabled ? `Processing Today's News with AI...` :`Scrape and Summarize Today's Articles`}
          </button>}
        </>}
      </div>
    </div>
  )
}