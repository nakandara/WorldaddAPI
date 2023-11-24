
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const  connectToProjectDatabase = async() =>{
  try {
    await mongoose.connect(process.env.MONGODG_URI_PROJECTDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoProjectDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas', err);
    process.exit(1);
  }
}

