import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			return res
				.status(401)
				.json({ error: 'Unauthorized: No token provided.' });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.userId).select('-password');
		if (!user) {
			return res.status(404).json({ error: 'User not found.' });
		}

		req.user = user;
		next();
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			return res
				.status(401)
				.json({ error: 'Unauthorized: Token has expired.' });
		} else if (error.name === 'JsonWebTokenError') {
			return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
		} else {
			console.error('Error in protectRoute middleware:', error.message);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}
};

export default protectRoute;
