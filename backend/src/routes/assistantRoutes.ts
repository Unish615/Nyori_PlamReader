import { Router } from 'express';
import { AssistantController } from '../controllers/assistantController.js';
import { authenticate } from '../middleware/authMiddleware.js';

export const assistantRouter = Router();

assistantRouter.post('/chat', authenticate, AssistantController.chat);
assistantRouter.get('/conversations', authenticate, AssistantController.getConversations);
assistantRouter.get('/conversations/:id/messages', authenticate, AssistantController.getMessages);
