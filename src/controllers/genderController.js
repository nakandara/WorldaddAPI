import Gender from '../models/gender.js';
import { getDatabase } from '../database/db.js';

export const createGender = async (req, res) => {
  try {
    const database = getDatabase();

    const { name,userID} = req.body;
    console.log(name);
    
    const newGender = new Gender({ name,userID });
    await newGender.save();
    res.status(200).json({ success: true, message: 'Gender created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};