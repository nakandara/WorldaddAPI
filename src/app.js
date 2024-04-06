import express from 'express';


import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/userModel.js'
import handlePostRequests from "post-request-handler"


// import exampleRoutes from './routes/exampleRoutes.js';
import UserRoutes from './routes/userRoutes.js'
// import genderRoutes from './routes/genderRoutes.js'
import profilePhotoRoutes from './routes/profilePhotoRoutes.js'
import contactRoutes from './routes/contactRoute.js'
import profileRoutes from './routes/profileRoutes.js'
import postRoutes from './routes/postRoutes.js'
// import { passport, sessionMiddleware } from './common/passport-setup.js';
import authRoute from './routes/authRoute.js'
// import {connectToDatabase} from './database/db.js'
import {connectToProjectDatabase} from './database/projectdb.js'
import session from 'express-session';
import { authenticateJWT } from './common/passport.js'
import multer  from 'multer';
import cors from 'cors';
import AWS from 'aws-sdk'
import fs from 'fs'
import https from 'https'


const app = express();

const upload = multer({ dest: 'uploads/' });

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1', // replace 'your-region' with your bucket's region
});





const s3 = new AWS.S3();


function uploadImageToS3(bucketName, file) {
  const params = {
    Bucket: "world-api-demo",
    Key: file.originalname,
    Body: fs.createReadStream(file.path),
    ContentType: file.mimetype,
  
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
}

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
    
      // await connectToDatabase();
      await connectToProjectDatabase();
  
     
    } catch (err) {
      console.error('Error starting the server', err);
      process.exit(1); // Exit the application on error
    }
  }
  
  startServer();
  app.post('/upload', upload.single('image'), async (req, res) => {
    console.log('AWS Configurationggggggggggggggg:', AWS.config);
    try {
      const imageUrl = await uploadImageToS3('your-bucket-name', req.file);
      res.send(imageUrl);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading image to S3');
    }
  });


  // const post_route = "http://localhost:2020/api/event/create"
  // app.use(handlePostRequests(post_route,{ accept_route: "http://localhost:8080"}))

  app.use(express.urlencoded({ extended: true }));
  app.use('/api/auth', authenticateJWT);


  app.use('/api', UserRoutes);
  // app.use('/api', exampleRoutes);
  // app.use('/api', genderRoutes);
  app.use('/api', profilePhotoRoutes);
  
  app.use('/api', profileRoutes);
  app.use('/api', contactRoutes);
  app.use('/api', postRoutes);
  app.use('/auth',authRoute)
  

 

  // app.get('/.well-known/pki-validation/773A1B6C4B08F5F9DB41F81B003990E0.txt', (req, res) => {
  //    res.sendFile('/home/ubuntu/apiworldapp/_work/WorldaddAPI/WorldaddAPI/773A1B6C4B08F5F9DB41F81B003990E0.txt')
    
  // });
  

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});



export default app;
