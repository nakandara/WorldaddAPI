import express from 'express';
import upload from '../middleware/uploadConfig.js';
import { createPost, getPosts, getAllPosts, getVerifyAllPosts, editPost, getPost, deletePost } from '../controllers/postController.js';

const router = express.Router();
router.post('/createPost', upload.array('image', 10), createPost); // Accept up to 10 images
router.get('/getPosts/:userId', getPosts);
router.get('/getAllPosts', getAllPosts);
router.get('/getVerifyAllPosts', getVerifyAllPosts);
router.get('/getPost/:postId', getPost);
router.put('/editPost/:postId', editPost);
router.delete('/deletePost/:userId/:postId', deletePost);

export default router;
