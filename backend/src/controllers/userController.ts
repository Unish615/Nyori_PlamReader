import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { AuthService } from '../services/authService.js';
import { store } from '../services/store.js';

export class UserController {
  static async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id || 'usr-demo-01';
      const profile = await AuthService.getProfile(userId);
      res.json({ success: true, data: profile });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async updateProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id || 'usr-demo-01';
      const updated = await AuthService.updateProfile(userId, req.body);
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async deleteAccount(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id || 'usr-demo-01';
      store.users.delete(userId);
      res.json({ success: true, message: 'Account deleted successfully.' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
