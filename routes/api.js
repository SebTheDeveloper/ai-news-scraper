import express from 'express';
import askQuestion from '../utils/askQuestion.js';
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
    } else {
      throw new Error('Must provide question and articleID');
    }
  } catch (err) {
    console.log(`${err} - Source: /api/question`);
    res.sendStatus(400);
  }  
});

export default router;