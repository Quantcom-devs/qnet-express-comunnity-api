import { randomBytes } from 'crypto';
import dotenv from 'dotenv';
import Logger from './lib/logger';

class ServerConfig {
	private static instance: ServerConfig;
	private PORT: number;
	private MONGODB_URI: string;
	private JWT_SECRET: string;

	private constructor() {
		Logger.info('Loading enviroment variables...');
		this.loadEnviroment();

		this.PORT = parseInt(process.env.PORT || '3000');
		this.MONGODB_URI = process.env.MONGODB_URI ?? 'localhost';

		if (!process.env.JWT_SECRET) {
			Logger.warn('No JWT secret was defined, generating random secret...');
			this.JWT_SECRET = randomBytes(64).toString('hex');
			Logger.debug(`Current JWT secret: ${this.JWT_SECRET}`);
		} else {
			this.JWT_SECRET = process.env.JWT_SECRET;
		}

	}

	private loadEnviroment() {
		dotenv.config();

		if (!process.env.MONGODB_URI) {
			throw new Error('No mongodb uri was found. stopping server.');
		}

	}

	public static getInstance(): ServerConfig {
		if (!ServerConfig.instance) {
			ServerConfig.instance = new ServerConfig();
		}

		return ServerConfig.instance;
	}


	public get SERVER_PORT(): number {
		return this.PORT;
	}

	public get DB_URI(): string {
		return this.MONGODB_URI;
	}

	public get JWT_SECRET_STRING(): string {
		return this.JWT_SECRET;
	}


}

export default ServerConfig.getInstance();