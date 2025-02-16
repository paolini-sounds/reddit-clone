import Subreddit from '../models/subredditModel.js';
import User from '../models/userModel.js';
import createHttpError from 'http-errors';

export const getAllSubreddits = async (req, res, next) => {
	try {
		const subreddits = await Subreddit.find({});
		res.status(200).json(subreddits);
	} catch (error) {
		console.log('Error in getAllSubreddits controller');
		next(error);
	}
};

export const getSubbreddit = async (req, res, next) => {
	const { name } = req.params;

	try {
		const subreddit = await Subreddit.aggregate([
			{ $match: { name: { $regex: name, $options: 'i' } } },
			{
				$lookup: {
					from: 'posts',
					let: { subredditId: '$_id' },
					pipeline: [
						{ $match: { $expr: { $eq: ['$subreddit', '$$subredditId'] } } },
						{ $sort: { createdAt: -1 } },
						{
							$lookup: {
								from: 'users',
								localField: 'author',
								foreignField: '_id',
								as: 'author',
							},
						},
						{ $unwind: '$author' },
						{
							$project: {
								'author._id': 1,
								'author.username': 1,
								title: 1,
								content: 1,
								createdAt: 1,
								upvotes: 1,
								comments: 1,
							},
						}, // Include author's _id and username
					],
					as: 'posts',
				},
			},
		]);

		if (!subreddit || subreddit.length === 0) {
			throw createHttpError.NotFound('Subreddit not found');
		}

		res.status(200).json(subreddit[0]);
	} catch (error) {
		console.log('Error in getSubreddit controller');
		next(error);
	}
};

export const seedSubreddits = async (req, res, next) => {
	const subreddits = [
		{
			name: 'Programming',
			description:
				'A community for programmers to share ideas and ask for help.',
		},
		{
			name: 'Technology',
			description:
				'The latest news and discussions about technology and gadgets.',
		},
		{
			name: 'Movies',
			description:
				'A place to discuss movies, from blockbusters to independent films.',
		},
		{
			name: 'Books',
			description:
				'Recommendations and discussions about books and literature.',
		},
		{
			name: 'Travel',
			description: 'Share travel experiences, tips, and advice.',
		},
		{
			name: 'Food',
			description:
				'A subreddit for food lovers to share recipes and food photos.',
		},
		{
			name: 'Fitness',
			description: 'Tips and advice on fitness, workouts, and healthy living.',
		},
		{
			name: 'Music',
			description:
				'Share and discover new music and discuss your favorite artists.',
		},
		{
			name: 'Photography',
			description:
				'A community for photographers to share their work and get feedback.',
		},
		{
			name: 'Gaming',
			description:
				'Discussions about video games, gaming news, and gaming culture.',
		},
	];

	try {
		await Subreddit.insertMany(subreddits);
		console.log('Seed data inserted successfully');
		res.status(201).json({ message: 'Seed data inserted successfully' });
	} catch (error) {
		console.error('Error seeding data:', error);
		next(error);
	}
};

export const createSubreddit = async (req, res, next) => {
	const { name, description } = req.body;
	const user = req.user;

	try {
		if (!user) {
			throw createHttpError.Unauthorized('Unauthorized to create subreddit');
		}

		const existingSubreddit = await Subreddit.findOne({
			name: { $regex: name, $options: 'i' },
		});
		if (existingSubreddit) {
			throw createHttpError.Conflict('Subreddit already exists');
		}
		const newSubreddit = await Subreddit.create({
			creator: user._id,
			name,
			description,
		});
		if (newSubreddit) {
			await newSubreddit.save();
			res.status(201).json(newSubreddit);
		} else {
			throw createHttpError.InternalServerError('Error creating subreddit');
		}
	} catch (error) {
		console.log('Error in createSubreddit controller');
		next(error);
	}
};

export const updateSubreddit = async (req, res, next) => {
	const { id } = req.params;
	const update = req.body;
	const user = req.user;

	try {
		const subreddit = await Subreddit.findById(id);
		if (!subreddit) {
			throw createHttpError.NotFound('Subreddit not found');
		}

		if (!user._id.equals(subreddit.creator)) {
			throw createHttpError.Unauthorized('Unauthorized to update subreddit');
		}
		const updatedSubreddit = await Subreddit.findByIdAndUpdate(id, update, {
			new: true,
		});
		if (!updatedSubreddit) {
			throw createHttpError.NotFound('Subreddit not found');
		}
		res.status(200).json(updatedSubreddit);
	} catch (error) {
		console.log('Error in updateSubreddit controller');
		next(error);
	}
};

export const deleteSubreddit = async (req, res, next) => {
	const { id } = req.params;
	const user = req.user;

	try {
		const subreddit = await Subreddit.findById(id);
		if (!subreddit) {
			throw createHttpError.NotFound('Subreddit not found');
		}

		if (!user._id.equals(subreddit.creator)) {
			throw createHttpError.Unauthorized('Unauthorized to update subreddit');
		}
		const deletedSubreddit = await Subreddit.findByIdAndDelete(id);
		if (!deletedSubreddit) {
			throw createHttpError.NotFound('Subreddit not found');
		}
		res.status(200).json({ message: 'Subreddit deleted successfully' });
	} catch (error) {
		console.log('Error in deleteSubreddit controller');
		next(error);
	}
};

export const subscribeUnsubScribeSubreddit = async (req, res, next) => {
	const { name } = req.params;
	const authUser = req.user;
	try {
		const subreddit = await Subreddit.findOne({
			name: { $regex: name, $options: 'i' },
		});
		const user = await User.findById(authUser._id);
		if (!user) {
			throw createHttpError.NotFound('User not found');
		}
		if (!subreddit) {
			throw createHttpError.NotFound('Subreddit not found');
		}
		if (!user.subscriptions.includes(subreddit._id)) {
			user.subscriptions.push(subreddit._id);
			subreddit.subscribers.push(user._id);
		} else {
			user.subscriptions = user.subscriptions.filter(
				(sub) => !sub.equals(subreddit._id)
			);
			subreddit.subscribers = subreddit.subscribers.filter(
				(sub) => !sub.equals(user._id)
			);
		}

		await subreddit.save();
		await user.save();
		// Refetch the updated subreddit to get the latest subscribers
		const updatedSubreddit = await Subreddit.findById(subreddit._id);

		res.status(200).json(updatedSubreddit);
	} catch (error) {}
};
