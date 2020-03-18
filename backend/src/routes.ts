import { Router } from 'express';

import * as UserController from './app/controller/UserController';

const routes = Router();

routes.get('/', (req, res) => res.send('Hello World'));

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

export default routes;
