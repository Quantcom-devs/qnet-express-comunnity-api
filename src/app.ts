import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morganMiddleware from './middleware/morganMiddleware';
import routes from './controllers/index';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Register middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morganMiddleware);

// Register routes
app.use('/api', routes);

app.use(errorHandler);

export default app;