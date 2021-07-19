import userModel, { IUser } from '../models/user.model';
import { hashPassword } from './auth.service';
import rolesService from './roles.service';

interface User {
	email: string,
	password: string
}

async function createUser(user: User): Promise<IUser> {

	const basicRole = await rolesService.findRoleByName('user');

	if (!basicRole) {
		throw new Error('Unexpected role.')
	}

	user.password = await hashPassword(user.password);
	const newUser = new userModel({
		...user,
		roleId: basicRole?._id
	});

	return newUser.save();
}

function getUserByEmail(email: string): Promise<IUser | null> {
	return userModel.findOne({ email }).exec();
}



export default {
	createUser,
	getUserByEmail
};