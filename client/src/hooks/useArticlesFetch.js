import { useState, useEffect } from "react";
import getArticles from "../utils/getArticles";

export default function useArticlesFetch(articleTimeframe) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async (articleTimeframe) => {
    setLoading(true);
    const fetchedArticles = await getArticles(articleTimeframe);
    setArticles(fetchedArticles);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles(articleTimeframe);
  }, [articleTimeframe]);

  return { articles, loading };
}
