import { Router } from 'express';

import Sessioncontroller from './app/controllers/Sessioncontroller';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrdersController from './app/controllers/HelpOrdersController';
import HelpStudentController from './app/controllers/HelpStudentController';

import authMiddleware from './app/middlewares/auth';
import studentMiddleware from './app/middlewares/student';

const routes = new Router();

// index
routes.get('/', (req, res) => res.json({ success: 'Hello World' }));

// Student checkin at academy
routes.get(
  '/students/:id/checkins',
  studentMiddleware,
  CheckinController.index
);
routes.post(
  '/students/:id/checkins',
  studentMiddleware,
  CheckinController.store
);

// Studant Help Order
routes.get(
  '/students/:id/help-orders',
  studentMiddleware,
  HelpStudentController.index
);
routes.post(
  '/students/:id/help-orders',
  studentMiddleware,
  HelpStudentController.store
);

// Admin login
routes.post('/sessions', Sessioncontroller.store);

// Authentication
routes.use(authMiddleware);

// Helpers Orders
routes.get('/help-orders/', HelpOrdersController.index);
routes.post('/help-orders/:id/answer', HelpOrdersController.store);

// Students
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

// Plans
routes.get('/plans', PlanController.index); // List
routes.post('/plans', PlanController.store); // Create
routes.put('/plans/:id', PlanController.update); // Update
routes.delete('/plans/:id', PlanController.delete); // Delete);

// Registration
routes.get('/registrations', RegistrationController.index); // List
routes.post('/registrations', RegistrationController.store); // Create
routes.put('/registrations/:id', RegistrationController.update); // Update
routes.delete('/registrations/:id', RegistrationController.delete); // Delete

export default routes;
