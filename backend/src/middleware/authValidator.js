import Joi from 'joi';

export const validateLogin = (req, res, next) => {
	const loginSchema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});

	const { error } = loginSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};

export const validateSignup = (req, res, next) => {
	const signupSchema = Joi.object({
		username: Joi.string().alphanum().min(3).max(20).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(6).max(16).required(),
	});
	const { error } = signupSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};
