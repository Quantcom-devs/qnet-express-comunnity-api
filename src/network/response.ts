import { Response } from 'express';

export function SUCCESS_RESPONSE(res: Response, message: unknown, code = 200): Response {
	return res.status(code).json({
		error: '',
		message
	});
}

export function ERROR_RESPONSE(res: Response, error: unknown, code = 400): Response {
	return res.status(code).json({
		error,
		message: ''
	});
}