import React, { useState, lazy, Suspense } from 'react';
import useArticlesFetch from '../hooks/useArticlesFetch';
const LazyArticle = lazy(() => import('./Article'));


export default function ArticlesWrapper() {

  const [articleTimeframe, setArticleTimeframe] = useState('today');
  let [articles, setArticles] = useArticlesFetch(articleTimeframe);

  function handleFilterChange(e) {
    const selectedTimeframe = e.target.value;
    if (selectedTimeframe !== articleTimeframe) {
      setArticleTimeframe(selectedTimeframe);
    }
  }

  return (
    <div className='articles-section'>
      <div className='view-articles'>
        <p>View Articles from</p>
        <select name='view-articles' onChange={handleFilterChange}>
          <option value='today'>Today</option>
          <option value='yesterday'>Yesterday</option>
          <option value='weekly'>This Week</option>
        </select>
      </div>
      <div className='articles'>
        {articles.map(article => (
        <Suspense key={article._id} fallback={<div>Loading article...</div>}>
        <LazyArticle article={article} />
        </Suspense>
        ))}
        {articles.length === 0 && <div>No articles found...</div>}
      </div>
    </div>
  )
}