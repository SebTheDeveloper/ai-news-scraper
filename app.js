import express from'express';
import cors from 'cors';
import { connectToDb } from './models/db.js';
import dashboardRouter from'./routes/dashboard.js';
import apiRouter from'./routes/api.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
   res.redirect('/dashboard');
});

app.use('/dashboard', dashboardRouter);
app.use('/api', apiRouter);

const startServer = async () => {
   try {
     const dbClient = await connectToDb();
 
     const handleShutdown = async (signal) => {
       console.log(`\n${signal} signal received. Closing MongoDB connection and shutting down server...`);
       try {
         await dbClient.close();
         console.log('MongoDB connection closed');
       } catch (err) {
         console.error('Error closing MongoDB connection:', err);
       }
       process.exit(signal === 'uncaughtException' ? 1 : 0);
     };

     process.on('SIGINT', handleShutdown);
     process.on('SIGTERM', handleShutdown);
     process.on('uncaughtException', handleShutdown);
 
     app.listen(port, () => {
       console.log(`Server running on port ${port}`);
     });
   } catch (error) {
     console.error('Failed to connect to the database:', error);
   }
 };
 
 startServer();
 