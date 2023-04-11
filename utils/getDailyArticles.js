import { getDb } from '../models/db.js';

export default async function getDailyArticles(filter) {
  const now = new Date();
  let date;
  if (filter === 'yesterday') {
    date = `${now.getMonth() + 1}-${now.getDate() - 1}-${now.getFullYear()}`;
  } else if (filter === 'weekly') {
    return 'working on it';
  } else {
    date = `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}`;
  }

  let articles;

  try {
    const db = getDb();
    const collection = db.db.collection('dashboard');

    articles = await collection.find({ 'createdOn.date': date }).toArray();
  } catch (error) {
    console.error("Error:", error);
  } 
  return articles;
}