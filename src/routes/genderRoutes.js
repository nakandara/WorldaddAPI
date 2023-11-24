import express from 'express';
import { createGender } from '../controllers/genderController.js';

const router = express.Router();

router.post('/createGender', createGender);

export default router;
