import { Request, Response } from 'express';

export function SUCCESS_RESPONSE( res: Response, message: any, code = 200) {
	return res.status(code).json({
		error: '',
		message
	});
}

export function ERROR_RESPONSE(res: Response, error: any, code = 400) {
	return res.status(code).json({
		error,
		message: ''
	});
}