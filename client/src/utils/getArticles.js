export default async function getArticles(articleTimeframe) {
  try {
    const response = await fetch(`/demos/ai-news-buddy/api/news/${articleTimeframe}`);

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const articles = await response.json();
    return articles;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}