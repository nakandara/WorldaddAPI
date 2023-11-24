import express from 'express';
import {connectToDatabase} from './database/db.js'
import {connectToProjectDatabase} from './database/projectdb.js'

const app = express();

app.use(express.json());

async function startServer() {
    try {
      // Connect to the database
      await connectToDatabase();
      await connectToProjectDatabase();
  
      // Start your server or perform other initialization tasks
      // ...
    } catch (err) {
      console.error('Error starting the server', err);
      process.exit(1); // Exit the application on error
    }
  }
  
  startServer();

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

export default app;
