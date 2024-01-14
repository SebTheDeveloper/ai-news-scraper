export default async function askQuestion(question, articleID, convoHistory) {
  try {
    const response = await fetch("/demos/ai-news-buddy/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        articleID,
        convoHistory,
      }),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.answer;
    } else {
      throw new Error("Ask Question Request failed: " + response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
