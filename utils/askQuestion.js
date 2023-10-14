import { getDb } from "../models/db.js";
import { Configuration, OpenAIApi } from "openai";
import { ObjectId } from "mongodb";

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

const getAnswer = async (messages) => {
  try {
    const result = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });
    return result.data.choices[0].message.content;
  } catch (error) {
    console.error(`Error while generating summary: ${error.message}`);
    return "try again";
  }
};

function formatConvoHistory({ agentSubmittedText, userSubmittedText }) {
  let formattedMessages = [];

  for (let i = 0; i < userSubmittedText.length; i++) {
    formattedMessages.push({
      role: "user",
      content: userSubmittedText[i],
    });

    if (agentSubmittedText[i]) {
      formattedMessages.push({
        role: "assistant",
        content: agentSubmittedText[i],
      });
    }
  }

  return formattedMessages;
}

async function processQuestion(db, question, articleID, convoHistory) {
  const collection = db.db.collection("dashboard");

  let prompt = "";
  let answer = "";

  const article = await collection.findOne({ _id: new ObjectId(articleID) });

  prompt += `
      Title: ${article.title}
      Source: ${article.source}
      Date: ${article.createdOn.date}
      Summary: ${article.summary}
      Full Article Text: ${article.fullText}
      `;

  const initialMessages = [
    {
      role: "system",
      content: `You are a helpful AI assistant that answers questions from the user based on a news article provided to you. The user will first give you the Title, Source, Date and Summary of each article. You will also receive the Full Article Text to review and answer questions based on. Then the user will ask a question or multiple questions. If you do not have information to answer the question, you may respond based on what you already know. If applicable, you will also receive any prior conversation history between you and the user. Questions will be formatted like the following example- [Question: What are the major arguments and opinions from this article?] Your answers will be succinct and broken up into readable chunks. Always give shorter answers rather than long ones.`,
    },
    {
      role: "user",
      content: `${prompt}`,
    },
  ];
  if (convoHistory.userSubmittedText.length > 0) {
    const priorConvo = formatConvoHistory(convoHistory);
    for (let record of priorConvo) {
      initialMessages.push(record);
    }
  }

  initialMessages.push({
    role: "user",
    content: `\n Question: ${question}`,
  });

  answer = await getAnswer(initialMessages);

  return answer;
}

export default async function askQuestion({
  question,
  articleID,
  convoHistory,
}) {
  try {
    const db = getDb();
    const answer = await processQuestion(db, question, articleID, convoHistory);
    return answer;
  } catch (error) {
    console.error("Error processing question:", error);
    return null;
  }
}
