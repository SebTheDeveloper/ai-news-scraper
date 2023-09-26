import { load } from "cheerio";
import { getDb } from "../models/db.js";
import { Configuration, OpenAIApi } from "openai";
import { ObjectId } from "mongodb";
import fetchHTML from "./fetchHTML.js";

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

// Configured for TechCrunch
async function scrapeArticleText(url) {
  try {
    if (url != undefined) {
      const html = await fetchHTML(url);
      const $ = load(html);

      const paragraphs = $(".article-content").find("p");
      const text = paragraphs
        .map((i, element) => $(element).text())
        .get()
        .join("\n");

      return text;
    }
  } catch (error) {
    console.error(`Error scraping article text: ${error}`);
    return "";
  }
}

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

function formatConvoHistory(convoHistory) {
  let formattedMessages = [];

  for (let record of convoHistory) {
    formattedMessages.push({
      role: "user",
      content: record.user,
    });

    formattedMessages.push({
      role: "assistant",
      content: record.agent,
    });
  }

  return formattedMessages;
}

async function processQuestion(db, question, articleID, convoHistory) {
  const collection = db.db.collection("dashboard");

  let prompt = "";
  let answer = "";

  const article = await collection.findOne({ _id: new ObjectId(articleID) });
  const fullArticleText = await scrapeArticleText(article.link);

  prompt += `
      Title: ${article.title}
      Source: ${article.source}
      Date: ${article.createdOn.date}
      Summary: ${article.summary}
      Full Article Text: ${fullArticleText}
      `;

  const initialMessages = [
    {
      role: "system",
      content: `You are a helpful AI assistant that answers questions from the user based on a news article provided to you. The user will first give you the Title, Source, Date and Summary of each article. You will also receive the Full Article Text to review and answer questions based on. Then the user will ask a question or multiple questions. If you do not have information to answer the question, you may respond based on what you already know. If applicable, you will also receive any prior conversation history between you and the user. Questions will be formatted like the following example- [Question: What are the major arguments and opinions from this article?] Your answers will be succinct and broken up into readable chunks.`,
    },
    {
      role: "user",
      content: `${prompt}`,
    },
  ];

  if (convoHistory.length > 0) {
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

async function processDailyQuestion(db, question, date, convoHistory) {
  if (!date) {
    const now = new Date();
    date = `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}`;
  }

  const collection = db.db.collection("dashboard");
  const articles = await collection
    .find({ "createdOn.date": date })
    .limit(20)
    .toArray();

  let prompt = "";
  let answer = "";
  let articleNum = 1;

  for (const article of articles) {
    prompt += `
    Article #${articleNum++}
    Title: ${article.title}
    Link: ${article.link}
    Date: ${date}
    Summary: ${article.summary}

    `;
  }

  if (!prompt) return;

  answer = await getAnswer([
    {
      role: "system",
      content: `You are a helpful AI assistant that answers questions from the user based on a list of today's news articles.  You can only respond with information based on the articles that the user provides you. You must follow these instructions, do not reference information that is not in the context of the provided article list. The user will provide you with the Title, Link, Date and Summary of each article. If applicable, you will also receive any prior conversation history between you and the user. Then the user will ask a question or multiple questions like the following example- [Question: Can you break down all of the major news developments today into 3 paragraphs?] Your answers will be succinct and broken up into readable chunks.`,
    },
    {
      role: "user",
      content: `${prompt}
        Prior Conversation History: ${
          convoHistory.length > 0
            ? formattedConvoHistory(convoHistory)
            : "no prior conversation history available."
        }
        Question: ${question}`,
    },
  ]);

  return answer;
}

export default async function askQuestion({
  question,
  articleID,
  convoHistory,
  date = undefined,
  dailyNews = false,
}) {
  try {
    const db = getDb();
    let answer;

    if (dailyNews) {
      answer = await processDailyQuestion(db, question, date, convoHistory);
    } else {
      answer = await processQuestion(db, question, articleID, convoHistory);
    }

    return answer;
  } catch (error) {
    console.error("Error processing question:", error);
    return null;
  }
}
