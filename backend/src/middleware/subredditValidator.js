import Joi from 'joi';
import createHttpError from 'http-errors';

export const validateSubreddit = (req, res, next) => {
	const subredditSchema = Joi.object({
		name: Joi.string().alphanum().min(3).max(20).required(),
		description: Joi.string().required(),
	});
	const { error } = subredditSchema.validate(req.body);
	if (error) {
		throw createHttpError(400, error.details[0].message);
	}

	next();
};
