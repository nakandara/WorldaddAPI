import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUrl = process.env.MONGODG_URI_PROJECTDB;

export const connectToProjectDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to database!');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
};
