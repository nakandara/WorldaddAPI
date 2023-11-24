import express from 'express';

import { registerUser ,getUser,updateUsers,deleteUser,loginUser} from '../controllers/userController.js';

const router = express.Router();


router.post('/createUser', registerUser);
router.get('/auth/getUser', getUser);
router.post('/login', loginUser);
router.post('/updateUser/:user_id', updateUsers);
router.delete('/deleteUser/:user_id', deleteUser);

export default router;
