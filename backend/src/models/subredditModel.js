import { subscribe } from 'diagnostics_channel';
import mongoose from 'mongoose';

const subredditSchema = new mongoose.Schema(
	{
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		description: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
			unique: true,
		},
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Post',
			},
		],
		subscribers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{ timestamps: true }
);
subredditSchema.index({ name: 'text' });
const Subreddit = mongoose.model('Subreddit', subredditSchema);

export default Subreddit;
