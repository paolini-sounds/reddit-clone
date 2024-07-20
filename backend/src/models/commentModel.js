import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
