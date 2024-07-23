import express from 'express';
import {
	login,
	register,
	logout,
	getMe,
} from '../controllers/authController.js';
import protectRoute from '../middleware/protectRoute.js';
import { validateLogin, validateSignup } from '../middleware/authValidator.js';

const router = express.Router();

router.get('/getme', protectRoute, getMe);
router.post('/register', validateSignup, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

export default router;
