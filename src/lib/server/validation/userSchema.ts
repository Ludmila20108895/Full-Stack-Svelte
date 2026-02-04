import Joi from 'joi';

export const userSchema = Joi.object({
	firstName: Joi.string().min(2).max(30).required(),
	lastName: Joi.string().min(2).max(30).required(),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().min(6).required()
});
export const loginSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().min(6).required()
});
