import ShoutoutClient from 'shoutout-sdk';
import Otp from '../models/otp.js';

// ShoutOUT SDK configuration
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjNzVjNjI0MC03YmNjLTExZWYtOTlhZi1iNzYzOGExOTFhZGMiLCJzdWIiOiJTSE9VVE9VVF9BUElfVVNFUiIsImlhdCI6MTcyNzMzMDQ5MiwiZXhwIjoyMDQyODYzMjkyLCJzY29wZXMiOnsiYWN0aXZpdGllcyI6WyJyZWFkIiwid3JpdGUiXSwibWVzc2FnZXMiOlsicmVhZCIsIndyaXRlIl0sImNvbnRhY3RzIjpbInJlYWQiLCJ3cml0ZSJdfSwic29fdXNlcl9pZCI6IjU3NTMxOCIsInNvX3VzZXJfcm9sZSI6InVzZXIiLCJzb19wcm9maWxlIjoiYWxsIiwic29fdXNlcl9uYW1lIjoiIiwic29fYXBpa2V5Ijoibm9uZSJ9.2eDVKOlcYE_dS8NsN1czrO_4x-Ea-CDbGjA3hwhPdWU';
const debug = true;
const verifySSL = false;
const client = new ShoutoutClient(apiKey, debug, verifySSL);

// Store OTP and phone number in memory
const otpStore = {};

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP
function sendOTP(phoneNumber, otp) {
  const message = {
    content: { sms: `Your OTP code is ${otp}` },
    destinations: [phoneNumber],
    source: "ShoutDEMO",
    transports: ["SMS"]
  };

  return new Promise((resolve, reject) => {
    client.sendMessage(message, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

export const sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  
  // Generate OTP
  const otp = generateOTP();
  
  try {
    // Send OTP
    await sendOTP(phoneNumber, otp);
    // Store OTP and phone number in memory
    otpStore[phoneNumber] = otp;
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP', error });
  }
};

export const verifyOtp = async (req, res) => {
    const { phoneNumber, otp, userId } = req.body;
  
    // Check if OTP and phone number exist in memory
    if (otpStore[phoneNumber] && otpStore[phoneNumber] === otp) {
      // If OTP is correct, remove it from memory
      delete otpStore[phoneNumber];
      
      // Save to database
      const otpData = new Otp({
        userId,
        phoneNumber,
        veryOTP: true,
      });
  
      try {
        await otpData.save();
        res.status(200).json({ message: 'OTP verified successfully' });
      } catch (error) {
        console.error('Error saving OTP data:', error);
        res.status(500).json({ message: 'Failed to save OTP data', error });
      }
    } else {
      res.status(401).json({ message: 'Invalid OTP' });
    }
  };

  // Get OTP data
export const getOtp = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the OTP data from the database
    const otpData = await Otp.find({ userId });

    if (otpData.length > 0) {
      res.status(200).json(otpData);
    } else {
      res.status(404).json({ message: 'No OTP data found' });
    }
  } catch (error) {
    console.error('Error fetching OTP data:', error);
    res.status(500).json({ message: 'Failed to fetch OTP data', error });
  }
};