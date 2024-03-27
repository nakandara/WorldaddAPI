import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODG_URI_USERDB;

if (!uri) {
  console.error('MongoDB connection string is not defined.');
  process.exit(1); // Exit the application if the connection string is not defined
}

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let database;

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoUserDB Atlas');
    database = client.db('test');
  } catch (err) {
    console.error('Error connecting to MongoDB User Atlas', err);
  }
}

export function getDatabase() {
  return database;
}
