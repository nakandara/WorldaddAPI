import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODG_URI_USERDB;

export const connectToProjectDatabase = async () => {
  try {

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to database!');
  } catch (err) {
    
    console.error('Error connecting to MongoDB', err);
    process.exit(1);

  }
};

