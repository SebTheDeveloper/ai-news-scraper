import { getDb } from '../models/db.js';

export default async function getDailyArticles(filter) {
  const now = new Date();
  const todaysDate = `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}`;
  let articles;

  try {
    const db = getDb();
    const collection = db.db.collection('dashboard');

    if (filter) {
      articles = await collection.find(filter).limit(30).toArray();
    } else {
      articles = await collection.find({ 'createdOn.date': todaysDate }).toArray();
    }
  } catch (error) {
    console.error("Error:", error);
  } 
  return articles;
}