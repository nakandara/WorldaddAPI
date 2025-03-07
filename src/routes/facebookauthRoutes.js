import express from 'express';
import { loginFacebook } from '../controllers/facebookauthController.js';

const router = express.Router();

router.post('/login-facebook', loginFacebook);

export default router;