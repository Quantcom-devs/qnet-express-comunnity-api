import bcrypt from 'bcrypt';
import { IUser } from '../models/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import serverConfig from '../ServerConfig';
import Logger from '../lib/logger';

export function hashPassword(pwd: string): Promise<string> {
	return bcrypt.hash(pwd, 10);
}

export function comparePasswords(pwd: string, pwdEncrypted: string): Promise<boolean> {
	return bcrypt.compare(pwd, pwdEncrypted);
}

export function generateJWT(user: IUser): string {
	return jwt.sign({ id: user._id }, serverConfig.JWT_SECRET_STRING, { expiresIn: '1800s' });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function verifyToken(token: string): any {
	token = token.split(' ')[1];

	try {
		return jwt.verify(token, serverConfig.JWT_SECRET_STRING);
	} catch (e) {
		Logger.error(e);
		throw new Error('Token validation failed.');
	}
}

