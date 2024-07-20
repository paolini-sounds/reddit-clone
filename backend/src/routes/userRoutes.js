import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
import { getUserFeed } from '../controllers/postController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/:username', getUserProfile);
router.get('/feed', protectRoute, getUserFeed);

export default router;
