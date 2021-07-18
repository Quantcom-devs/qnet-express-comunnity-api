import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import Logger from '../lib/logger';
import { ERROR_RESPONSE } from '../network/response';

export const errorHandler = (err: any, _req: Request, res: Response): Response => {
	try {
		Logger.warn('[Error handler middleware]');
		if (err.name === 'ValidationError') {

			return handleValidationError(err, res);
		}

		if (err.code && err.code == 11000) {
			return handleDuplicateKeyError(err, res);
		}

	} catch {
		return ERROR_RESPONSE(res, 'Unexpected server error', 500);
	}

	return ERROR_RESPONSE(res, 'Unexpected server error', 500);
};


function handleDuplicateKeyError(err: any, res: Response) {
	const field = Object.keys(err.keyValue);

	const error = `An account with that ${field} already exists.`;

	return ERROR_RESPONSE(res, { messages: error, fields: field }, 409);
}

function handleValidationError(err: Error.ValidationError, res: Response) {
	const errors = Object.values(err.errors as object).map((el) => el.message);
	const fields = Object.values(err.errors as object).map(el => el.path);

	if (errors.length > 1) {
		const formatedErrors = errors.join(' ');
		return ERROR_RESPONSE(res, { messages: formatedErrors, fields });
	}

	return ERROR_RESPONSE(res, { messages: errors, fields });
}
