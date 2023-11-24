import express from 'express';
import upload from '../upload.js'
import {createProfilePhoto,getProfilePhoto,editProfilePhoto} from '../controllers/profilePhotoController.js';

const router = express.Router();
router.post('/createProfilePhoto', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]),createProfilePhoto);
router.get('/getProfilePhoto/:userId', getProfilePhoto);
router.post('/editProfilePhoto/:userId', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), editProfilePhoto);


export default router;
