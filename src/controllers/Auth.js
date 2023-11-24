import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User, { IUser, Role } from '../models/User';

dotenv.config();

const loginFailed = async (req, res) => {
    req.logout((err) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Logout failed' });
        } else {
            res.redirect("http://localhost:3000"|| '/');
        }
    });
};

const loginSuccess = async (req, res) => {
    if (req.user) {
        try {
            const displayName = req.user.displayName;
            const lastName = req.user.name.familyName;
            const email = req.user.emails?.[0]?.value || 'unknown@example.com';
            let user = await User.findOne({ email });

            if (!user) {
                const hashedPassword = await bcrypt.hash('Google_login_secret', 10);
                user = new User({
                    firstName: displayName,
                    lastName: lastName,
                    email: email,
                    language: 'English',
                    role: Role.REGULAR_USER,
                    password: hashedPassword
                });

                await user.save();
            }

         
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '');
            res.json({ token, user });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ success: false, message: 'An error occurred during login' });
        }
    }
};

const logout = async (req, res) => {
    req.logout((err) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Logout failed' });
        } else {
            res.redirect(`${process.env.WEBSITE_URL}/sign-in` || '/');
        }
    });
};

export default { loginSuccess, loginFailed, logout };
