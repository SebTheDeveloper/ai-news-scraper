export default async function askQuestion(question, articleID) {
  try {
    const response = await fetch('http://localhost:3000/api/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        articleID
      }),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.answer;
    } else {
      throw new Error('Request failed: ' + response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}