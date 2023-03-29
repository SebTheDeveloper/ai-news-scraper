import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('This will be the dashboard endpoint');
});

export default router;
