import express from 'express';

import exampleRoutes from './routes/exampleRoutes.js';
import UserRoutes from './routes/userRoutes.js'
import genderRoutes from './routes/genderRoutes.js'
import profilePhotoRoutes from './routes/profilePhotoRoutes.js'



import {connectToDatabase} from './database/db.js'
import {connectToProjectDatabase} from './database/projectdb.js'
import session from 'express-session';
import { authenticateJWT } from './common/passport.js'
import { OAuth2Client } from 'google-auth-library';
import cors from 'cors';

const googleClientId = "327746728050-s21vp9i9uu5674us70o91cj6qqggs0ib.apps.googleusercontent.com";
const googleClientSecret = "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";
const googleRedirectUri = 'http://localhost:8080/auth/google/callback';

const googleOAuth2Client = new OAuth2Client(googleClientId, googleClientSecret, googleRedirectUri);

const app = express();
app.use(cors());
app.use(
    session({
        secret:`${process.env.JWT_SECRET}`, 
        resave: false,
        saveUninitialized: false
    })
  );

app.use(express.json());



async function startServer() {
    try {
    
      await connectToDatabase();
      await connectToProjectDatabase();
  
     
    } catch (err) {
      console.error('Error starting the server', err);
      process.exit(1); // Exit the application on error
    }
  }
  
  startServer();

  app.use('/api/auth', authenticateJWT);

  app.use('/api', UserRoutes);
  app.use('/api', exampleRoutes);
  app.use('/api', genderRoutes);
  app.use('/api', profilePhotoRoutes);


app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});
app.get('/auth/google', (req, res) => {
  const url = googleOAuth2Client.generateAuthUrl({
    access_type: 'offline', // Request a refresh token
    scope: ['openid', 'profile', 'email'], // Requested scopes
  });
  res.redirect(url);
});



app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const { tokens } = await googleOAuth2Client.getToken(code);
    const accessToken = tokens.access_token;
    
    const idToken = tokens.id_token;
    const refreshToken = tokens.refresh_token;

    console.log(accessToken, 'Access Token');
    console.log(refreshToken, 'Refresh Token');

    res.status(200).json({ message: 'Successfully authenticated with Google' });
  } catch (error) {
    console.error('Error during OAuth 2.0 token exchange:', error);
    res.status(500).json({ error: 'OAuth 2.0 token exchange failed' });
  }
});

export default app;
