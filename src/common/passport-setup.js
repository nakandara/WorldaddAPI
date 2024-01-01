
import  passport from '../common/passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import cookieSession from 'cookie-session';
import session from 'express-session'; 
// Configure cookie session
const sessionMiddleware = session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Session lasts for 1 day
    },
  });
  
passport.use(
  new GoogleStrategy(
    {
      clientID: '775938270547-r04ajoo56tpl8jt99fs7aa5757fgf0fq.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8080/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Verify callback implementation
      // This function gets called after successful Google authentication
      // Handle user creation or retrieval logic here
      // Example:
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
