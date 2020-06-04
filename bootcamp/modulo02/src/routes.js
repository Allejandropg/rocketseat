import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

/*
routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Allejandro',
    email: 'alle401@gmail.com',
    password_hash: '123456',
  });
  res.json(user);
});
*/
// routes.get('/', (req, res) => res.json({ message: 'Hello word!' }));

export default routes;
