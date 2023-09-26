import TelegramBot from "node-telegram-bot-api";
import { config as dotenvConfig } from "dotenv";
import axios from "axios";

dotenvConfig();

export default function startTelegramBot() {
  const token = process.env.TG_BOT_KEY;
  const bot = new TelegramBot(token, { polling: true });

  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      "Welcome to my bot! Send a message, and I will see what the server has to say about it."
    );
  });

  bot.onText(/\/ai/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Some AI Stuff");
  });

  bot.onText(/\/price/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Show me the money!");
  });

  bot.onText(/\/newsTech/, async (msg) => {
    const chatId = msg.chat.id;
    const response = await axios.get("http://localhost:3000/api/news/today");

    const articles = response.data;

    for (const article of articles) {
      const articleText = `
      Title: ${article.title}\nLink: ${article.link}\n
      Source: ${article.source}\nSummary: ${article.summary}\n
      Categories: ${article.categories}\n`;

      await bot.sendMessage(chatId, articleText);
    }
  });

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userMessageId = msg.message_id;

    if (msg.text && msg.text.startsWith("d")) {
      await bot.deleteMessage(chatId, userMessageId);
    }
  });

  console.log("Telegram bot service running...");
}
