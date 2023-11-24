import express from 'express';
import upload from '../upload.js'
import {createPost,getPosts,editPost,getPost,deletePost} from '../controllers/postController.js';

const router = express.Router();
router.post('/createPost', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]),createPost);
router.get('/getPosts/:userId', getPosts);
router.get('/getPost/:userId/:postId', getPost);
router.post('/editPost/:userId/:postId', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), editPost);
router.post('/deletePost/:userId/:postId', deletePost);


export default router;
