import express from'express';
import dashboardRouter from'./routes/dashboard.js';
import apiRouter from'./routes/api.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.redirect('/dashboard');
});

app.use('/dashboard', dashboardRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
