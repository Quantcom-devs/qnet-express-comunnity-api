import {
	Router, Request, Response, NextFunction,
} from 'express';
import Logger from '../../lib/logger';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../../network/response';
import { CREDENTIALS_VALIDATION } from './user.validation';
import userService from '../../services/user.service';
import { comparePasswords, generateJWT } from '../../services/auth.service';
import { auth } from '../../middleware/auth.middleware';

const router = Router();

/**
 *
 */
router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
	try {
		await CREDENTIALS_VALIDATION.validateAsync(req.body);
	} catch (e) {

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

	if (!(await comparePasswords(req.body.password, user.password))) {
		return ERROR_RESPONSE(res, 'Password does not match', 401);
	}

	return SUCCESS_RESPONSE(res, { token: generateJWT(user) }, 200);
});


router.get('/test', auth, (req: Request, res: Response) => {
	return res.status(200).json({
		hey: 'Hello there'
	});
});

export default router;
