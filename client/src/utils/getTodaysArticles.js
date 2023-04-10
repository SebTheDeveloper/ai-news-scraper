export default async function getTodaysArticles() {
  try {
    const response = await fetch('http://localhost:3000/api/news/today/all');

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