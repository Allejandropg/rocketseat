import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));
// routes.post('/users', (req, res) => res.json({ id: 1 }));
routes.post('/users', UserController.store);

export default routes;
