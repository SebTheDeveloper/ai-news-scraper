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

    if (existingTldr.length === 1 && existingTldr[0].tldr === "") {
      return;
    }

    if (existingTldr.length >= 1) {
      return { tldr: existingTldr[0].tldr };
    }

    const articles = await collection
      .find({ "createdOn.date": today })
      .sort({ "createdOn.time": -1 })
      .toArray();

    if (articles.length === 0) {
      return { tldr: "Uh oh, no articles were found from today" };
    }

    // Ensure createTldr is not being called multiple times while processing
    const placeholder = {
      createdOn: {
        date: today,
      },
      tldr: "",
    };
    const result = await collection.insertOne(placeholder);

    const tldrText = await createTldr(articles);

    const updateResult = await collection.updateOne(
      { _id: result.insertedId },
      { $set: { tldr: tldrText } }
    );

    if (updateResult.modifiedCount !== 1) {
      throw new Error("Failed to update tldr");
    }

    return { tldr: tldrText };
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
      content: `You are an ai that gives a "TLDR summary" of today's news articles. You will receive a list of articles from today that includes the original article title, a link to the article, the source it came from, today's date and a summary of each article. Your job is to give a "Too Long, Didn't Read" explanation based on all of the articles from today. You may provide the link to any articles that you reference in your answer. You must respond in markdown and only markdown. I do not want you to respond with something like "Okay sure, here is the markdown for that-". No. I want you to respond in markdown and only markdown. You will start with an h1 that says something like "Today's TLDR report for {today's date}". Following that, you will put all of your information in either an ordered or an unordered list.`,
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
