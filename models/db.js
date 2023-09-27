import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let dbConnection;

export const connectToDb = async () => {
  try {
    const username = encodeURIComponent(process.env.MONGO_USER);
    const password = encodeURIComponent(process.env.MONGO_PWD);

    const client = await MongoClient.connect(
      `mongodb+srv://${username}:${password}@cluster0.3ehxbbz.mongodb.net/?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );

    dbConnection = {
      client: client,
      db: client.db(),
    };

    console.log("Connected to the database");
    return dbConnection.client;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getDb = () => dbConnection;
