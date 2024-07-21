import express from 'express';
import {savePost,getSaveById} from '../controllers/saveController.js'

const router = express.Router();

// Send OTP route
router.post('/save-post', savePost);
router.get('/get-save-post/:userId', getSaveById);

export default router;
