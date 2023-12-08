import express from 'express';

import {createPost,getPosts,editPost,getPost,deletePost} from '../controllers/postController.js';

const router = express.Router();
router.post('/createPost',createPost);
router.get('/getPosts/:userId', getPosts);
router.get('/getPost/:postId', getPost);
router.post('/editPost/:userId/:postId',  editPost);
router.post('/deletePost/:userId/:postId', deletePost);


export default router;
