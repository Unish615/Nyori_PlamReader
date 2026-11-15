import { Router } from 'express';
import { AdminController } from '../controllers/adminController.js';
import { authenticate, requireAdmin } from '../middleware/authMiddleware.js';

export const adminRouter = Router();

adminRouter.get('/stats', authenticate, requireAdmin, AdminController.getStats);
adminRouter.get('/users', authenticate, requireAdmin, AdminController.getUsers);
adminRouter.put('/users/:id/role', authenticate, requireAdmin, AdminController.updateUserRole);
