import { Router } from 'express';

import Sessioncontroller from './app/controllers/Sessioncontroller';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// index
routes.get('/', (req, res) => res.json({ success: 'Hello World' }));

// Admin login
routes.post('/sessions', Sessioncontroller.store);

// Authentication
routes.use(authMiddleware);

// Students
routes.get('/students', authMiddleware, StudentController.index);
routes.post('/students', authMiddleware, StudentController.store);
routes.put('/students/:id', authMiddleware, StudentController.update);

export default routes;
