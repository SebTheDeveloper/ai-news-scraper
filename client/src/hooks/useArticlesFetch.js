import { useState, useEffect } from 'react';
import getTodaysArticles from '../utils/getTodaysArticles';

export default function useArticlesFetch() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const fetchedArticles = await getTodaysArticles();
      setArticles(fetchedArticles);
    }

    fetchArticles();
  }, []);

  return [articles, setArticles];
}
