import userModel, {IUser} from '../models/user.model';
import { hashPassword } from './auth.service';

interface User {
    email: string,
    password: string
}

async function createUser(user: User): Promise<IUser> {
	user.password = await hashPassword(user.password);
	const newUser = new userModel(user);

	return newUser.save();
}

function getUserByEmail(email: string): Promise<IUser | null> {
	return userModel.findOne({ email }).exec();
}


export default {
	createUser,
	getUserByEmail
};