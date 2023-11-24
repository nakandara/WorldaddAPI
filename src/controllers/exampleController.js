import { getDatabase } from '../database/db.js';

export const getExample = async (req, res) => {
  try {
    const database = getDatabase();
    const collection = database.collection('users');
    const result = await collection.find({}).toArray();
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error('Error performing database operation', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const postExample = (req, res) => {
  // Logic to handle POST request for /example route
  const data = req.body;
  // Process the data and send a response
  res.json(data);
};
