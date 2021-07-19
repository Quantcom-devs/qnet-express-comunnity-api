import { NextFunction, Request, Response } from 'express';
import userModel from '../models/user.model';
import { associateMethodToAction } from '../lib/actions.enum';
import { ERROR_RESPONSE } from '../network/response';
import { verifyToken } from '../services/auth.service';
import resourcesService from '../services/resources.service';
import permissionsService from '../services/permissions.service';

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

	if (!req.headers.authorization) {
		return ERROR_RESPONSE(res, 'Unauthorized access, Please send a token.', 401);
	}

	let user_id;

	try {
		user_id = (await verifyToken(req.headers.authorization)).id;
	} catch (e) {
		return ERROR_RESPONSE(res, 'Unauthorized access, Please send a valid token.', 401);
	}
	const user = await userModel.findById(user_id).exec();

	if (!user) {
		return ERROR_RESPONSE(res, 'User was not found.', 404);
	}

	const resource = await resourcesService.findResourceByName(req.originalUrl.split('/')[2]);

	if (!resource) {
		return ERROR_RESPONSE(res, 'Resource was not found.', 404);
	}

	const action = associateMethodToAction(req.method);
	const permissions = await permissionsService.findPermissionWithRelations(user.roleId, resource._id);

	if (!permissions) {
		return ERROR_RESPONSE(res, 'Security policy was not found.', 404);
	}

	switch (permissions[action]) {
		case 'ANY':
			return next();
		case 'NONE':
			return ERROR_RESPONSE(res, 'Forbidden action.', 403);
		case 'OWN':
			const id = req.params.id;
			if (!id) return ERROR_RESPONSE(res, 'UserId was not found.', 400);

			if (user._id !== id) {
				return ERROR_RESPONSE(res, 'Forbidden action.', 403);
			}
			next();

		default:
			break;
	}

	return next();
}