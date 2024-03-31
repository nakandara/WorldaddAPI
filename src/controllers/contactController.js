import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Contact from '../models/contact.js';

dotenv.config();

export const createContact = async (req, res) => {
    const { userId, name, email, message } = req.body;
    console.log(userId, name, email, message);

    try {
      

        if (!userId || !name || !email || !message) {
            
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

     
        const user = await User.findOne({ userId });
        console.log(user,'..........');
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Create a new contact instance using the Contact model
        const newContact = new Contact({
            userId,
            name,
            email,
            message,
        });

        // Save the contact to the database
        await newContact.save();

        // You might want to send a response indicating success
        res.status(201).json({ success: true, message: 'Contact created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
};
