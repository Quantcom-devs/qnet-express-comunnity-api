import { Router, Request, Response, response } from 'express';
import { SUCCESS_RESPONSE } from '../network/response';
import users from './users/user.controller';

const router = Router();

router.get('/health', async (req: Request, res: Response) => {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return SUCCESS_RESPONSE(res, `Server is up and running using [${Math.round(used * 100) / 100}]MB of RAM.`);
});

// Register all other routers.
router.use('/users', users);

export default router;