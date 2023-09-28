export default async function askQuestion(question, articleID, convoHistory) {
  try {
    const response = await fetch("https://webxpert.io/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        articleID,
        convoHistory: convoHistory
          ? convoHistory
          : "no conversation history found.",
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
