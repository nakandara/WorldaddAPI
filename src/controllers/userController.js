import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (req, res) => {
    const { name, email, password, method } = req.body;

    console.log(name, email, password, method, 'u77777777');
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email });
      
        if (existingUser && method === 'FACEBOOK') {
            console.log('User already exists for Facebook login');
            const token = jwt.sign({ userId: existingUser?._id }, process.env.JWT_SECRET || '');
            return res.json({ token, existingUser }); // Return or terminate here
        } else if (existingUser) {
            console.log('User with this email already exists');
            return res.status(409).json({ success: false, error: 'User with this email already exists' });
        }

        // If user doesn't exist, create a new one
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser?._id }, process.env.JWT_SECRET || '');

        res.status(200).json({ success: true, token, newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
          
            res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ success: false, error: 'Invalid credentials' });
          
        }

        const token = jwt.sign({ userId: user?._id }, process.env.JWT_SECRET || '');

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
};



export const getUser = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database

        res.status(200).json(req.user );
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
};

export const updateUsers = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const user = await User.findById(userId);

        if (!user) {
           res.status(404).json({ success: false, error: 'Something went wrong' });
        }

        user.set(req.body);
        const updatedUser = await user.save();
        
        res.status(200).json({ success: true,updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const user = await User.findByIdAndDelete(userId);
    
        if (!user) {
            res.status(404).json({ success: false, error: 'User not found' });
        }
    
        res.status(200).json({ user, message: 'Deleted User Account' });
    } catch (error) {
        console.error(error);
       res.status(500).json({ success: false, error: 'Something went wrong' });
    }
};


