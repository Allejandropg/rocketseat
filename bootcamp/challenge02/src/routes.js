import { Router } from 'express';

import Sessioncontroller from './app/controllers/Sessioncontroller';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ success: 'Hello World' }));
routes.post('/sessions', Sessioncontroller.store);
routes.use(authMiddleware);
routes.get('/students', (req, res) => {
  return res.json({ success: 'Hello Student' });
});
routes.post('/students', authMiddleware, StudentController.store);

export default routes;
