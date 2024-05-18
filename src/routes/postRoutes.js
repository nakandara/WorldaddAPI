import express from 'express';
import multer  from 'multer';
const upload = multer({ dest: 'uploads/' });

import {createPost,getPosts,getAllPosts,getVerifyAllPosts,editPost,getPost,deletePost} from '../controllers/postController.js';

const router = express.Router();
router.post('/createPost', upload.array("image", 10),createPost);
router.get('/getPosts/:userId', getPosts);
router.get('/getAllPosts', getAllPosts);
router.get('/getVerifyAllPosts', getVerifyAllPosts);
router.get('/getPost/:postId', getPost);
router.put('/editPost/:postId',  editPost);
router.delete('/deletePost/:userId/:postId', deletePost);


export default router;
