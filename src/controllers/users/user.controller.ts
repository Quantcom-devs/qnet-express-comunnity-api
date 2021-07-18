import {
	Router, Request, Response, response, NextFunction,
} from 'express';
import Logger from '../../lib/logger';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../../network/response';
import { CREDENTIALS_VALIDATION } from './user.validation';
import userService from '../../services/user.service';
import { comparePasswords } from '../../services/auth.service';

const router = Router();

/**
 *
 */
router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
	try {
		await CREDENTIALS_VALIDATION.validateAsync(req.body);
	} catch (e) {
		Logger.error(e);
		return ERROR_RESPONSE(res, 'Bad request, please verify your data.');
	}

	try {
		await userService.createUser(req.body);
	} catch (e) {
		return next(e);
	}

	return SUCCESS_RESPONSE(res, 'User created successfully', 201);
});

router.post('/login', async (req: Request, res: Response) => {
	try {
		await CREDENTIALS_VALIDATION.validateAsync(req.body);
	} catch (e) {
		Logger.error(e);
		return ERROR_RESPONSE(res, 'Bad request, please verify your data.');
	}

	const user = await userService.getUserByEmail(req.body.email);

	if (!user) {
		return ERROR_RESPONSE(res, 'User was not found on the database.', 404);
	}

	if (!(await comparePasswords(user.password, req.body.password))) {
		return ERROR_RESPONSE(res, 'Password does not match', 401);
	}
});

export default router;
