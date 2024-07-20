import exp from 'constants';
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	subreddit: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Subreddit',
	},
	upvotes: {
		type: Number,
		default: 0,
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
		},
	],
});

const Post = mongoose.model('Post', postSchema);

export default Post;
