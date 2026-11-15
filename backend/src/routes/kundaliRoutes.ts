import { Router } from 'express';
import { KundaliController } from '../controllers/kundaliController.js';
import { authenticate } from '../middleware/authMiddleware.js';

export const kundaliRouter = Router();

kundaliRouter.post('/generate', authenticate, KundaliController.generate);
kundaliRouter.get('/history', authenticate, KundaliController.getHistory);
kundaliRouter.get('/:id', authenticate, KundaliController.getById);
kundaliRouter.delete('/:id', authenticate, KundaliController.delete);
