import joi from 'joi';

export const CREDENTIALS_VALIDATION = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required()
});