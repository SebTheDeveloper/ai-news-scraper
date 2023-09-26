import express from 'express';
import askQuestion from '../utils/askQuestion.js';
import getDailyArticles from '../utils/getDailyArticles.js';
import techCrunchScraper from '../controllers/techCrunchScraper.js'
const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is for APIs');
});

router.post('/question', async (req, res) => {
  const question = req.body.question;
  const articleID = req.body.articleID;
  const convoHistory = req.body.convoHistory;

  try {
    if (question && articleID) {
      const response = await askQuestion({ question, articleID, convoHistory });
      if (response) {
        res.status(200).json({answer: response})
      }
    } else if (question && req.body.daily) {
      const response = await askQuestion({ question, dailyNews: true});
      if (response) {
        res.status(200).json({answer: response})
      }
    } else {
      throw new Error('Must provide question and articleID');
    }
  } catch (err) {
    console.log(`${err} - Source: /api/question`);
    res.status(500).send({ message: 'Internal server error' });
  }  
});

router.get('/news/:timeframe', async (req, res) => {
  try {
    const timeframe = req.params.timeframe;
    
    if (!['today', 'yesterday', 'favorites'].includes(timeframe)) {
      res.status(500).send({ message: 'Invalid timeframe value' });
      return;
    }

    const dailyArticles = await getDailyArticles(timeframe);
    res.status(200).send(dailyArticles);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error fetching daily articles' });
  }
});


router.post('/scrape-and-summarize-daily-news', async (req, res) => {
  try {
    const isSuccessful = await techCrunchScraper();

    if (!isSuccessful) {
      throw new Error();
    }
    res.status(200).send({ message: 'Daily news processed successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error fetching daily articles' });
  }
});

export default router;