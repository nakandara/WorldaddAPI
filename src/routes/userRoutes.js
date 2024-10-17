import express from 'express';

import { registerUser ,getUser,updateUsers,getUserById,resetGetPassword,deleteUser,resetPassword,loginUser,forgotPassword} from '../controllers/userController.js';

const router = express.Router();


router.post('/createUser', registerUser);
router.get('/auth/getUser', getUser);
router.get('/auth/getUserById/:user_id', getUserById);
router.post('/auth/login', loginUser);
router.post('/updateUser/:user_id', updateUsers);
router.delete('/deleteUser/:user_id', deleteUser);


router.post('/forgot-password', forgotPassword);
router.get('/reset-password/:id/:token', resetGetPassword);
router.post('/reset-password/:id/:token', resetPassword);

export default router;
