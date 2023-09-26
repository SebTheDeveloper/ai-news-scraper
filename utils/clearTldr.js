import { getDb } from "../models/db.js";

export default async function getDailyTldr() {
  const now = new Date();
  const today = `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}`;

  try {
    const db = getDb();
    const collection = db.db.collection("dashboard");

    const deletedTldr = await collection
      .deleteOne({ "createdOn.date": today, tldr: { $exists: true } })
      .toArray();

    console.log("deleted tldr");
  } catch (error) {
    console.error("Error:", error);
  }
}
