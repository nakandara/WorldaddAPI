import express from 'express';

import {incrementReactionCount} from '../controllers/reactions.js';

const router = express.Router();
router.post('/increment', incrementReactionCount);


export default router;
