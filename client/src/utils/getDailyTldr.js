export default async function getDailyTldr() {
  try {
    const response = await fetch(`http://localhost:3000/api/tldr`);

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const articles = await response.json();
    return articles.tldr;
  } catch (error) {
    console.error("Error fetching data:", error);
    return "";
  }
}
