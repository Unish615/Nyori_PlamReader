import { Router } from 'express';
import { ReportsController } from '../controllers/reportsController.js';
import { authenticate } from '../middleware/authMiddleware.js';

export const reportsRouter = Router();

reportsRouter.get('/', authenticate, ReportsController.getAll);
reportsRouter.get('/:id', authenticate, ReportsController.getById);
reportsRouter.delete('/:id', authenticate, ReportsController.delete);
