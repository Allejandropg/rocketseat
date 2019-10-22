import { Router } from 'express';

import Sessioncontroller from './app/controllers/Sessioncontroller';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ success: 'Hello World' }));
routes.post('/sessions', Sessioncontroller.store);
routes.use(authMiddleware);
routes.get('/students', authMiddleware, StudentController.read);
routes.post('/students', authMiddleware, StudentController.store);
routes.put('/students/:id', authMiddleware, StudentController.update);

export default routes;
