import Joi from 'joi';

export const validatePost = (req, res, next) => {
	const postSchema = Joi.object({
		title: Joi.string().min(3).max(100).required(),
		content: Joi.string().min(3).required(),
	});
	const { error } = postSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};
