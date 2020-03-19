import { Router } from 'express';

import * as UserController from './app/controllers/UserController';

import { authMiddleware } from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.remove);

export default routes;
