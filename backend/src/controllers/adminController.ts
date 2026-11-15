import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { store } from '../services/store.js';

export class AdminController {
  static async getStats(req: AuthenticatedRequest, res: Response) {
    try {
      const totalUsers = store.users.size;
      const totalKundalis = store.kundaliRecords.size;
      const totalPalms = store.palmReadings.size;
      const totalChats = store.chatConversations.size;

      const recentActivity = store.activityLogs.slice(0, 15);

      res.json({
        success: true,
        data: {
          metrics: {
            totalUsers,
            totalKundalis,
            totalPalms,
            totalChats,
            systemHealth: '100% Operational',
            astronomyEngine: 'Lahiri Ayanamsa v2026 Active',
            aiVisionEngine: 'Gemini Vision & Vedic Rules Active'
          },
          recentActivity
        }
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getUsers(req: AuthenticatedRequest, res: Response) {
    try {
      const usersList = Array.from(store.users.values()).map(u => ({
        id: u.id,
        email: u.email,
        fullName: u.fullName,
        nwaranName: u.nwaranName,
        role: u.role,
        preferredLanguage: u.preferredLanguage,
        createdAt: u.createdAt
      }));
      res.json({ success: true, data: usersList });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async updateUserRole(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const user = store.users.get(id);
      if (!user) return res.status(404).json({ success: false, error: 'User not found' });
      user.role = role === 'admin' ? 'admin' : 'user';
      res.json({ success: true, data: user });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
