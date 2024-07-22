import Subreddit from '../models/subredditModel.js';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import createHttpError from 'http-errors';

export const createPost = async (req, res, next) => {
	const { name } = req.params;
	const { title, content } = req.body;
	const authUser = req.user;

	console.log('Name: ', name);

	try {
		if (!title || !content) {
			throw createHttpError.BadRequest('Title and content are required');
		}
		if (!name) {
			throw createHttpError.BadRequest('Subreddit name is required');
		}
		const user = await User.findById(authUser._id);
		if (!user) {
			throw createHttpError.NotFound('User not found');
		}
		const subreddit = await Subreddit.findOne({
			name: { $regex: name, $options: 'i' },
		});
		if (!subreddit) {
			throw createHttpError.NotFound('Subreddit not found');
		}
		const post = await Post.create({
			title,
			content,
			subreddit: subreddit._id,
			author: user._id,
		});
		console.log('Post: ', post);
		if (post) {
			await Subreddit.findByIdAndUpdate(subreddit._id, {
				$push: { posts: post._id },
			});
			await User.findByIdAndUpdate(user._id, { $push: { posts: post._id } });

			res.status(201).json(post);
		} else {
			throw createHttpError.InternalServerError('Error creating post');
		}
	} catch (error) {
		console.log('Error in createPost controller');
		next(error);
	}
};

export const getPost = async (req, res, next) => {
	const { id } = req.params;

	try {
		const post = await Post.findById(id);
		if (!post) {
			throw createHttpError.NotFound('Post not found');
		}
		res.status(200).json(post);
	} catch (error) {
		console.log('Error in getPost controller');
		next(error);
	}
};

export const getUserFeed = async (req, res, next) => {
	console.log('Req.query: ', req.query);
	const { page = 1, limit = 10 } = req.query;
	const authUser = req.user;
	console.log('page: ', page);
	console.log('limit: ', limit);

	try {
		const user = await User.findById(authUser._id).populate('subscriptions');
		if (!user) {
			throw createHttpError.NotFound('User not found');
		}

		let feed;
		let totalPosts;
		if (user.subscriptions.length > 0) {
			const subscriptionIds = user.subscriptions.map((sub) => sub._id);
			feed = await Post.find({ subreddit: { $in: subscriptionIds } })
				.sort({ createdAt: -1 })
				.skip((page - 1) * limit)
				.limit(parseInt(limit))
				.populate({ path: 'author', select: 'username _id' })
				.populate({ path: 'subreddit', select: 'name _id' });

			totalPosts = await Post.countDocuments({
				subreddit: { $in: subscriptionIds },
			});
		} else {
			feed = await Post.find()
				.sort({ createdAt: -1 })
				.skip((page - 1) * limit)
				.limit(parseInt(limit))
				.populate({ path: 'author', select: 'username' });

			totalPosts = await Post.countDocuments();
		}

		const hasNextPage = page * limit < totalPosts;

		res.status(200).json({
			feed,
			next: hasNextPage ? page + 1 : null,
		});
	} catch (error) {
		console.log('Error in getUserFeed controller:', error);
		next(error);
	}
};

export const getGenericFeed = async (req, res, next) => {
	const { page = 1, limit = 10 } = req.query;
	try {
		const feed = await Post.find()
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(parseInt(limit))
			.populate({ path: 'author', select: 'username' })
			.populate({ path: 'subreddit', select: 'name _id' });

		const totalPosts = await Post.countDocuments();
		const hasNextPage = page * limit < totalPosts;

		res.status(200).json({
			feed,
			next: hasNextPage ? page + 1 : null,
		});
	} catch (error) {
		console.log('Error in getAllRecentPosts controller');
		next(error);
	}
};

export const updatePost = async (req, res, next) => {
	const { id } = req.params;
	const update = req.body;
	const authUser = req.user;
	console.log('AuthUser: ', authUser);

	try {
		const user = await User.findById(authUser._id);
		if (!user) {
			throw createHttpError.NotFound('User not found');
		}
		const post = await Post.findById(id);
		if (!post) {
			throw createHttpError.NotFound('Post not found');
		}
		console.log('Post creator: ', post.author);
		if (!user._id.equals(post.author)) {
			throw createHttpError.Forbidden('Not authorized to update post');
		}
		const updatedPost = await Post.findByIdAndUpdate(id, update, {
			new: true,
			runValidators: true,
		});
		if (!updatedPost) {
			throw createHttpError.NotFound('Post not found');
		}
		res.status(200).json(updatedPost);
	} catch (error) {
		console.log('Error in updatePost controller');
		next(error);
	}
};

export const deletePost = async (req, res, next) => {
	const { id } = req.params;
	const authUser = req.user;

	try {
		const user = await User.findById(authUser._id);
		if (!user) {
			throw createHttpError.NotFound('User not found');
		}
		const post = await Post.findById(id);
		if (!post) {
			throw createHttpError.NotFound('Post not found');
		}
		if (!user._id.equals(post.author)) {
			throw createHttpError.Forbidden('Not authorized to delete post');
		}
		const deletedPost = await Post.findByIdAndDelete(id);
		if (!deletedPost) {
			throw createHttpError.NotFound('Post not found');
		}
		res.status(200).json({ message: 'Post deleted successfully' });
	} catch (error) {
		console.log('Error in deletePost controller');
		next(error);
	}
};

export const upvotePost = async (req, res, next) => {
	const { id } = req.params;
	const authUser = req.user;
	try {
		if (!authUser) {
			throw createHttpError.Unauthorized('User not authenticated');
		}
		const post = await Post.findById(id);
		if (!post) {
			throw createHttpError.NotFound('Post not found');
		}
		const user = await User.findById(authUser._id);
		if (!user) {
			throw createHttpError.NotFound('User not found');
		}
		const isUpvoted = user.upvotedPosts.includes(post._id);
		let update = '';
		if (isUpvoted) {
			await Post.findByIdAndUpdate(id, { $inc: { upvotes: -1 }, new: true });
			await User.findByIdAndUpdate(user._id, {
				$pull: { upvotedPosts: post._id },
				new: true,
			});
			update = 'un-upvoted';
		} else {
			await Post.findByIdAndUpdate(id, { $inc: { upvotes: 1 }, new: true });
			await User.findByIdAndUpdate(user._id, {
				$push: { upvotedPosts: post._id },
				new: true,
			});
			update = 'upvoted';
		}
		res.status(200).json({ message: `Post ${update} succesfully` });
	} catch (error) {
		console.log('Error in upvotePost controller');
		next(error);
	}
};
