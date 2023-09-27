import express from "express";
import askQuestion from "../utils/askQuestion.js";
import getDailyArticles from "../utils/getDailyArticles.js";
import getDailyTldr from "../utils/getDailyTldr.js";
const router = express.Router();

router.post("/question", async (req, res) => {
  const question = req.body.question;
  const articleID = req.body.articleID;
  const convoHistory = req.body.convoHistory;

  try {
    if (question && articleID) {
      const response = await askQuestion({ question, articleID, convoHistory });
      if (response) {
        res.status(200).json({ answer: response });
      }
    } else if (question && req.body.daily) {
      const response = await askQuestion({ question, dailyNews: true });
      if (response) {
        res.status(200).json({ answer: response });
      }
    } else {
      throw new Error("Must provide question and articleID");
    }
  } catch (err) {
    console.log(`${err} - Source: /api/question`);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/news/:timeframe", async (req, res) => {
  try {
    const timeframe = req.params.timeframe;

    if (!["today", "yesterday", "favorites"].includes(timeframe)) {
      res.status(500).send({ message: "Invalid timeframe value" });
      return;
    }

    const dailyArticles = await getDailyArticles(timeframe);
    res.status(200).send(dailyArticles);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching daily articles" });
  }
});

router.get("/tldr", async (req, res) => {
  try {
    const dailyTldr = await getDailyTldr();
    if (!dailyTldr) {
      throw new Error("something went wrong.");
    }
    res.status(200).send(dailyTldr);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching daily tldr", error });
  }
});

export default router;
