import express from "express";
import cors from "cors";
import cron from "node-cron";
import { connectToDb } from "./models/db.js";
import dashboardRouter from "./routes/dashboard.js";
import apiRouter from "./routes/api.js";
import path from "path";
import { fileURLToPath } from "url";
// import startTelegramBot from "./controllers/telegramBot.js";
import getDailyTldr from "./utils/getDailyTldr.js";
import techCrunchScraper from "./controllers/techCrunchScraper.js";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

cron.schedule("0 7,11,3 * * *", async () => {
  try {
    const scrapedAndProcessed = await techCrunchScraper();
    const tldr = await getDailyTldr();

    if (!scrapedAndProcessed || !tldr) {
      throw new Error("something went wrong.");
    }
  } catch (err) {
    console.error(err);
  }
});

app.use("/dashboard", dashboardRouter);
app.use("/api", apiRouter);

const staticPath = path.resolve(__dirname, "client/dist");
app.use(express.static(staticPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

const startServer = async () => {
  try {
    const dbClient = await connectToDb();

    // startTelegramBot();

    const handleShutdown = async (signal) => {
      console.log(
        `\n${signal} signal received. Closing MongoDB connection and shutting down server...`
      );
      try {
        await dbClient.close();
        console.log("MongoDB connection closed");
      } catch (err) {
        console.error("Error closing MongoDB connection:", err);
      }
      process.exit(signal === "uncaughtException" ? 1 : 0);
    };

    process.on("SIGINT", handleShutdown);
    process.on("SIGTERM", handleShutdown);
    process.on("uncaughtException", handleShutdown);

    app.listen(port, () => {
      console.log(`Backend server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

startServer();
