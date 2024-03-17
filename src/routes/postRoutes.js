import express from 'express';
import multer  from 'multer';
const upload = multer({ dest: 'uploads/' });

import {createPost,getPosts,getAllPosts,editPost,getPost,deletePost} from '../controllers/postController.js';

const router = express.Router();
router.post('/createPost', upload.single('image'),createPost);
router.get('/getPosts/:userId', getPosts);
router.get('/getAllPosts', getAllPosts);
router.get('/getPost/:postId', getPost);
router.post('/editPost/:userId/:postId',  editPost);
router.post('/deletePost/:userId/:postId', deletePost);


export default router;
