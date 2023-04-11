import { useState, useEffect } from 'react';
import getArticles from '../utils/getArticles';

export default function useArticlesFetch(articleTimeframe) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const fetchedArticles = await getArticles(articleTimeframe);
      setArticles(fetchedArticles);
    }

    fetchArticles();
  }, [articleTimeframe]);

  return [articles, setArticles];
}
