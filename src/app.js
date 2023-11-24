import express from 'express';
import {connectToDatabase} from './database/db.js'
import {connectToProjectDatabase} from './database/projectdb.js'
import cors from 'cors';
import { authenticateJWT } from './common/passport.js'
import { OAuth2Client } from 'google-auth-library';

const googleClientId = "327746728050-s21vp9i9uu5674us70o91cj6qqggs0ib.apps.googleusercontent.com";
const googleClientSecret = "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";
const googleRedirectUri = 'http://localhost:8080/auth/google/callback';

const googleOAuth2Client = new OAuth2Client(googleClientId, googleClientSecret, googleRedirectUri);



const app = express();
app.use(cors());
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

app.use('/api/auth', authenticateJWT);

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

export default app;
