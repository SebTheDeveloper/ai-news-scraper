import express from 'express';
import askQuestion from '../utils/askQuestion.js';
import getDailyArticles from '../utils/getDailyArticles.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is for APIs');
});

router.post('/question', (req, res) => {
  const question = req.body.question;
  const articleID = req.body.articleID;

  try {
    if (question && articleID) {
      askQuestion({ question, articleID });
      res.sendStatus(200);
    } else if (question && req.body.daily) {
      askQuestion({ question, dailyNews: true});
      res.sendStatus(200);
    } else {
      throw new Error('Must provide question and articleID');
    }
  } catch (err) {
    console.log(`${err} - Source: /api/question`);
    res.sendStatus(400);
  }  
});

router.get('/news/today/all', async (req, res) => {
  try {
    const dailyArticles = await getDailyArticles();
    res.status(200).send(dailyArticles);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Error fetching daily articles' });
  }
});

export default router;