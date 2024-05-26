// src/models/Otp.js
import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  veryOTP: { type: Boolean, default: false },
}, { timestamps: true });

const Otp = mongoose.model('Otp', otpSchema);

export default Otp;
