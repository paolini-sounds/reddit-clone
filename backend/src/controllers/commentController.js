import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import createHttpError from 'http-errors';

export const createComment = async (req, res, next) => {
	const { id } = req.params;
	const { content } = req.body;
	const authUser = req.user;

	try {
		if (!content) {
			throw createHttpError.BadRequest('Content is required');
		}
		if (!id) {
			throw createHttpError.BadRequest(
				'Subreddit name and post id is required'
			);
		}
		const user = await User.findById(authUser._id);
		if (!user) {
			throw createHttpError.NotFound('User not found');
		}
		const post = await Post.findById(id);
		if (!post) {
			throw createHttpError.NotFound('Post not found');
		}
		const comment = await Comment.create({
			content,
			user: user._id,
		});
		if (comment) {
			await Post.findByIdAndUpdate(post._id, {
				$push: { comments: comment._id },
			});
		} else {
			throw createHttpError.InternalServerError('Error creating comment');
		}
		res.status(201).json(comment);
	} catch (error) {
		console.log('Error in createComment controller');
		next(error);
	}
};

export const getComment = async (req, res, next) => {
	const { id, commentId } = req.params;
	try {
		const comment = await Comment.findById(commentId);
		if (!comment) {
			throw createHttpError.NotFound('Comment not found');
		}
		res.status(200).json(comment);
	} catch (error) {
		console.log('Error in getComment controller');
		next(error);
	}
};

export const getAllComments = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!id) {
			throw createHttpError.BadRequest('Post id is required');
		}
		const post = await Post.findById(id).populate('comments');
		if (!post) {
			throw createHttpError.NotFound('Post not found');
		}
		res.status(200).json(post.comments);
	} catch (error) {
		console.log('Error in getAllComments controller');
		next(error);
	}
};

export const updateComment = async (req, res, next) => {
	const { id, commentId } = req.params;
	const update = req.body;
	const authUser = req.user;

	try {
		if (!update) {
			throw createHttpError.BadRequest('Content is required');
		}
		const user = await User.findById(authUser._id);
		if (!user) {
			throw createHttpError.NotFound('User not found');
		}
		const comment = await Comment.findById(commentId);

		if (!comment) {
			throw createHttpError.NotFound('Comment not found');
		}
		if (!user._id.equals(comment.user)) {
			throw createHttpError.Forbidden(
				'User not authorized to update this comment'
			);
		}
		const updatedComment = await Comment.findByIdAndUpdate(commentId, update, {
			new: true,
			runValidators: true,
		});

		res.status(200).json(updatedComment);
	} catch (error) {
		console.log('Error in updateComment controller');
		next(error);
	}
};

export const deleteComment = async (req, res, next) => {
	const { id, commentId } = req.params;
	const authUser = req.user;
	try {
		const user = await User.findById(authUser._id);
		if (!user) {
			throw createHttpError.NotFound('User not found');
		}
		const comment = await Comment.findById(commentId);

		if (!comment) {
			throw createHttpError.NotFound('Comment not found');
		}
		if (!user._id.equals(comment.user)) {
			throw createHttpError.Forbidden(
				'User not authorized to delete this comment'
			);
		}
		await Comment.findByIdAndDelete(commentId);
		res.status(200).json({ message: 'Comment deleted' });
	} catch (error) {
		console.log('Error in deleteComment controller');
		next(error);
	}
};
