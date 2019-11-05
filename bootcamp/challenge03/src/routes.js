import { Router } from 'express';

import Sessioncontroller from './app/controllers/Sessioncontroller';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// index
routes.get('/', (req, res) => res.json({ success: 'Hello World' }));

// Admin login
routes.post('/sessions', Sessioncontroller.store);

// Authentication
routes.use(authMiddleware);

// Students
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

// Student checkin at academy
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

// Plans
routes.get('/plans', PlanController.index); // List
routes.post('/plans', PlanController.store); // Create
routes.put('/plans/:id', PlanController.update); // Update
routes.delete('/plans/:id', PlanController.delete); // Delete);

// Enrollment
routes.get('/enrollments', EnrollmentController.index); // List
routes.post('/enrollments', EnrollmentController.store); // Create
routes.put('/enrollments/:id', EnrollmentController.update); // Update
routes.delete('/enrollments/:id', EnrollmentController.delete); // Delete

export default routes;
