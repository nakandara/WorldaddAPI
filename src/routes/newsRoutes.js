import express from 'express';
import upload from '../upload.js'
import { createNews,getNews } from '../controllers/newsController.js';

const router = express.Router();

router.post('/createnews', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), createNews);
router.get('/getNews', getNews);

export default router;
