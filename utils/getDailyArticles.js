import { getDb } from "../models/db.js";

export default async function getDailyArticles(filter) {
  const now = new Date();

  if (filter === "yesterday") {
    now.setDate(String(now.getDate() - 1));
  }

  const date = `${String(now.getMonth() + 1)}-${String(now.getDate())}-${String(
    now.getFullYear()
  )}`;

  let articles;

  try {
    const db = getDb();
    const collection = db.db.collection("dashboard");

    articles = await collection
      .find({ "createdOn.date": date, tldr: { $exists: false } })
      .sort({ "createdOn.time": -1 })
      .toArray();
  } catch (error) {
    console.error("Error:", error);
  }
  return articles;
}
