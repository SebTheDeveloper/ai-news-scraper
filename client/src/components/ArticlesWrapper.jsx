import React, { useState, useEffect, lazy, Suspense } from 'react';
import useArticlesFetch from '../hooks/useArticlesFetch';
import UserContextProvider from "../context/UserContext";


export default function ArticlesWrapper({ categoryFilter }) {

  const [articleTimeframe, setArticleTimeframe] = useState('today');
  const [articles] = useArticlesFetch(articleTimeframe);
  const [filteredArticles, setFilteredArticles] = useState([]);

  function handleFilterChange(e) {
    const selectedTimeframe = e.target.value;
    if (selectedTimeframe !== articleTimeframe) {
      setArticleTimeframe(selectedTimeframe);
    }
  }

  useEffect(() => {
    if (categoryFilter === "") {
      setFilteredArticles(articles)
    } else {
      setFilteredArticles(() => articles.filter(article => article.categories.some(category => category.toLowerCase().includes(categoryFilter.toLowerCase()))))
    }
  }, [articles, categoryFilter])
  
  const LazyArticle = lazy(() => import('./Article'));

  return (
    <div className='articles-section'>
      <div className='view-articles'>
        <p>View Articles from</p>
        <select name='view-articles' onChange={handleFilterChange}>
          <option value='today'>Today</option>
          <option value='yesterday'>Yesterday</option>
          {/* <option value='favorites'>Favorites</option> */}
        </select>
      </div>
      {categoryFilter && <p style={{fontSize: '0.9em', opacity: '0.9', marginBottom: '2.5rem'}}>Filtering by Category: <span style={{color: 'var(--primary)'}}>{categoryFilter}</span> <span style={{opacity: '0.9', display: 'block', fontSize: '0.8em', marginTop: '0.8em'}}>{"("}{filteredArticles.length} {"results)"}</span></p>}
      <UserContextProvider>
        <Suspense fallback={<div></div>}>
          <div className='articles'>
            {filteredArticles.map(article => (
              <LazyArticle key={article._id} article={article} />
            ))}
            {filteredArticles.length === 0 && <div>No articles found...</div>}
          </div>
        </Suspense>
      </UserContextProvider>
    </div>
  )
}