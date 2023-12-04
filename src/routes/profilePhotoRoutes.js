import express from 'express';

import {createProfilePhoto,getProfilePhoto,editProfilePhoto} from '../controllers/profilePhotoController.js';

const router = express.Router();
router.post('/createProfilePhoto',createProfilePhoto);
router.get('/getProfilePhoto/:userId', getProfilePhoto);
router.post('/editProfilePhoto/:userId', editProfilePhoto);


export default router;
