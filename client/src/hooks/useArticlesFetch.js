import { useState, useEffect } from 'react';
import getArticles from '../utils/getArticles';

export default function useArticlesFetch(articleTimeframe) {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async (articleTimeframe) => {
    const fetchedArticles = await getArticles(articleTimeframe);
    setArticles(fetchedArticles);
  };

  useEffect(() => {
    fetchArticles(articleTimeframe);
  }, [articleTimeframe]);

  return [articles, setArticles, fetchArticles];
}
