import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { AssistantService } from '../services/assistantService.js';

export class AssistantController {
  static async chat(req: AuthenticatedRequest, res: Response) {
    try {
      const { message, conversationId, language } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ success: false, error: 'Message text is required.' });
      }

      const userId = req.user?.id || 'usr-demo-01';
      const result = await AssistantService.handleChat({
        userId,
        conversationId,
        message,
        language
      });

      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getConversations(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id || 'usr-demo-01';
      const convs = AssistantService.getConversations(userId);
      res.json({ success: true, data: convs });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getMessages(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const msgs = AssistantService.getMessages(id);
      res.json({ success: true, data: msgs });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
