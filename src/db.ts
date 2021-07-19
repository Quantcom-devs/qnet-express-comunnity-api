import db from 'mongoose';
import Logger from './lib/logger';
import initAuth from './lib/initAuth';


export async function connectToDb(uri: string): Promise<void> {

	try {
		await db.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		Logger.info('[DB] Connected and ready to use!');

	} catch (error) {
		Logger.error('[DB] Error connecting to the database');
		Logger.error(error);
		throw new Error('Unable to connect to database');
	}

	Logger.info('Auth initialization starting...');
	await initAuth();
	Logger.info('Auth initialization finished');

}

