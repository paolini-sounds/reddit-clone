import User from '../models/userModel.js';

export const getUserProfile = async (req, res) => {
	const { username } = req.params;

	try {
		const user = await User.findOne({ username })
			.select('-password')
			.populate('subscriptions', 'name')
			.populate('posts', 'upvotes');
		if (!user) return res.status(404).json({ message: 'User not found :(' });
		user.totalUpvotes = user.posts.reduce((acc, post) => acc + post.upvotes, 0);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.log('Error in getUserProfile: ', error.message);
	}
};
