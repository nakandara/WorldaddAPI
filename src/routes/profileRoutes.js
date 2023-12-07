import express from 'express';

import {createProfile,getProfile,updateProfile} from '../controllers/profileController.js';

const router = express.Router();


router.post('/createProfile', createProfile);
router.get('/getProfile/:userId', getProfile);
router.post('/updateProfile/:userId',updateProfile);
//router.post('/createProfilePhoto', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]),updateProfile);


export default router;
