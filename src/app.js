import express from 'express';


import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/userModel.js'
import handlePostRequests from "post-request-handler"

import exampleRoutes from './routes/exampleRoutes.js';
import UserRoutes from './routes/userRoutes.js'
import genderRoutes from './routes/genderRoutes.js'
import profilePhotoRoutes from './routes/profilePhotoRoutes.js'
import contactRoutes from './routes/contactRoute.js'
import profileRoutes from './routes/profileRoutes.js'
import postRoutes from './routes/postRoutes.js'
// import { passport, sessionMiddleware } from './common/passport-setup.js';
import authRoute from './routes/authRoute.js'
import {connectToDatabase} from './database/db.js'
import {connectToProjectDatabase} from './database/projectdb.js'
import session from 'express-session';
import { authenticateJWT } from './common/passport.js'

import cors from 'cors';



const app = express();

app.set('view engine', 'ejs');
app.use(express.json({ limit: '10mb' })); // Set the limit as required
app.use(express.json({ limit: '10mb' })); // Set the limit as required
app.use(cors());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  })
);



passport.use(
  new GoogleStrategy(
    {
      clientID: '775938270547-r04ajoo56tpl8jt99fs7aa5757fgf0fq.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8080/auth/google/callback',
      scope: ['profile', 'email'], // Replace with your callback URL
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        const email = profile._json.email;


        if (!email) {
          return done(new Error('Email not found in profile'), false);
        }

        // Check if the user exists in the database
        let user = await User.findOne({ email });

        if (!user) {
          // If the user does not exist, create a new user in the database
          user = await User.create({
            name: profile.displayName,
            email,
            // Optionally, you can add more fields from the profile if needed
          });
        }

        // Return the user object
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);





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

  app.use(express.urlencoded({ extended: true }));
  app.use('/api/auth', authenticateJWT);

  app.use('/api', UserRoutes);
  app.use('/api', exampleRoutes);
  app.use('/api', genderRoutes);
  app.use('/api', profilePhotoRoutes);
  app.use('/api', profileRoutes);
  app.use('/api', contactRoutes);
  app.use('/api', postRoutes);
  app.use('/auth',authRoute)
  





app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});


export default app;
