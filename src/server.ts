import { Express } from 'express';
import { connectToDb } from './db';
import Logger from './lib/logger';
import serverConfig from './ServerConfig';

export default class Server {

	PORT: number;
	APP: Express;

	/**
	 * Creates a new server object for it to start listening to connections.
	 * @param port Port in which the server will be running
	 * @param app Express app instance of the server.
	 */
	constructor(port: number, app: Express) {
		this.PORT = port;
		this.APP = app;
	}

	/**
	 * Start listening new connections on the given port.
	 */
	async listen():Promise<void> {
		this.APP.listen(this.PORT, () => {
			Logger.info(`Server is up and running at [PORT]: [${this.PORT}]`);
		});

		await connectToDb(serverConfig.DB_URI);
	}

}