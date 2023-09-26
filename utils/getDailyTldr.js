import { getDb } from "../models/db.js";
import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

export default async function getDailyTldr() {
  const now = new Date();
  const today = `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}`;

  try {
    const db = getDb();
    const collection = db.db.collection("dashboard");

    const existingTldr = await collection
      .find({ "createdOn.date": today, tldr: { $exists: true } })
      .toArray();

    if (existingTldr.length >= 1) {
      return { tldr: existingTldr[0].tldr };
    }

    const articles = await collection
      .find({ "createdOn.date": today })
      .sort({ "createdOn.time": -1 })
      .toArray();

    const tldr = await createTldr(articles);

    const newTldr = {
      createdOn: {
        date: today,
      },
      tldr,
    };
    await collection.insertOne(newTldr);

    return { tldr };
  } catch (error) {
    console.error("Error:", error);
    return { tldr: "Something went wrong. TLDR unable to complete." };
  }
}

async function createTldr(articles) {
  try {
    let formattedArticles = "";

    for (let article of articles) {
      formattedArticles += `\n
        Title: ${article.title}
        Link: ${article.link}
        Source: ${article.source}
        Date: ${article.createdOn.date}
        Summary: ${article.summary}
      `;
    }

    let messages = [];

    messages.push({
      role: "system",
      content: `You are an ai that gives a "TLDR summary" of today's news articles. You will receive a list of articles from today that includes the original article title, a link to the article, the source it came from, today's date and a summary of each article. Your job is to give a "Too Long, Didn't Read" explanation based on all of the articles from today. You may provide the link to any articles that you reference in your answer. You must respond in markdown and only markdown. I do not want you to respond with something like "Okay sure, here is the markdown for that-". No. I want you to respond in markdown and only markdown.`,
    });

    messages.push({
      role: "user",
      content: formattedArticles,
    });

    const result = await openai.createChatCompletion({
      model: "gpt-4",
      messages,
    });
    return result.data.choices[0].message.content;
  } catch (error) {
    console.error(`Error while generating tldr: ${error.message}`);
    return "try again";
  }
}
