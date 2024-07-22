import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';

import User from '../models/userModel.js';
import generateTokenAndSetCookie from '../util/generateToken.js';

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const existingUsername = await User.findOne({ username });
		if (existingUsername) {
			console.log('Error in register controller');
			throw createHttpError.Conflict('Username already exists');
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			console.log('Error in register controller');
			throw createHttpError.Conflict(
				'User already registered with this email.'
			);
		}

		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				email: newUser.email,
				username: newUser.username,
			});
		} else {
			throw createHttpError.InternalServerError('Error creating user');
		}
	} catch (error) {
		console.log('Error in register controller');
		next(error);
	}
};

export const login = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			throw createHttpError.NotFound('User not found');
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw createHttpError.Unauthorized('Invalid credentials');
		}
		generateTokenAndSetCookie(user._id, res);
		res.status(200).json({
			_id: user._id,
			email: user.email,
			username: user.username,
		});
	} catch (error) {
		console.log('Error in login controller');
		next(error);
	}
};

export const logout = async (req, res) => {
	try {
		res.cookie('jwt', '', { maxAge: 0 });
		res.status(200).json({ message: 'Logged out successfully.' });
	} catch (error) {
		console.log('Error in logout controller.', error.message);
		res.status(500).json({ error: error.message });
	}
};

export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select('-password');
		res.status(200).json(user);
	} catch (error) {
		console.log('Error in getMe controller.', error.message);
		res.status(500).json({ error: error.message });
	}
};
