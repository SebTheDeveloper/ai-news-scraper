import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let dbConnection;

export const connectToDb = async () => {
  try {
    const username = encodeURIComponent(process.env.MONGO_USER);
    const password = encodeURIComponent(process.env.MONGO_PWD);

    const client = await MongoClient.connect(`mongodb://${username}:${password}@127.0.0.1:27017/scraperDashboard`, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    dbConnection = {
      client: client,
      db: client.db()
    };

    console.log('Connected to the database');
    return dbConnection.client;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export const getDb = () => dbConnection;
