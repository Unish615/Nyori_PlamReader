import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

export const userRouter = Router();

userRouter.get('/profile', authenticate, UserController.getProfile);
userRouter.put('/profile', authenticate, UserController.updateProfile);
userRouter.delete('/account', authenticate, UserController.deleteAccount);
