import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import UserRoutes from './routes/userRoutes.js';
import profilePhotoRoutes from './routes/profilePhotoRoutes.js';
import contactRoutes from './routes/contactRoute.js';
import profileRoutes from './routes/profileRoutes.js';
import postRoutes from './routes/postRoutes.js';
import otpRouter from './routes/otpRouter.js';
import authRoute from './routes/authRoute.js';
import { connectToProjectDatabase } from './database/projectdb.js';
import { authenticateJWT } from './common/passport.js';

dotenv.config();

const app = express();

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the view engine to ejs
app.set('view engine', 'ejs');
// Set the path to the views directory
app.set('views', path.join(__dirname, 'views'));

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: '775938270547-r04ajoo56tpl8jt99fs7aa5757fgf0fq.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8080/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        const email = profile._json.email;
        if (!email) {
          return done(new Error('Email not found in profile'), false);
        }
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

async function startServer() {
  try {
    await connectToProjectDatabase();
  } catch (err) {
    console.error('Error starting the server', err);
    process.exit(1);
  }
}

startServer();

app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authenticateJWT);
app.use('/api', UserRoutes);
app.use('/api', profilePhotoRoutes);
app.use('/api', profileRoutes);
app.use('/api', contactRoutes);
app.use('/api', postRoutes);
app.use('/api', otpRouter);
app.use('/auth', authRoute);

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.get('/view', (req, res) => {
  res.render('index', { data: 'Some data' });
});

export default app;
