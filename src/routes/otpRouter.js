import express from 'express';
import { sendOtp, verifyOtp ,getOtp} from '../controllers/otpController.js'

const router = express.Router();

// Send OTP route
router.post('/send-otp', sendOtp);

// Verify OTP route
router.post('/verify-otp', verifyOtp);
router.get('/get-otp/:userId', getOtp);

export default router;
