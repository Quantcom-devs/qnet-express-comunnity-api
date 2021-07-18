import Logger from './lib/logger';
import app from './app';
import Server from './server';
import serverConfig from './ServerConfig';

const server = new Server(serverConfig.SERVER_PORT, app);

server.listen().then(() => {
	Logger.info('Try a GET request to /health to test the app.');
}).catch(() => {
	process.exit(1);
});
