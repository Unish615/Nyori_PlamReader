import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { KundaliService } from '../services/kundaliService.js';
import { z } from 'zod';

const kundaliSchema = z.object({
  fullName: z.string().min(2),
  nwaranName: z.string().optional(),
  dateOfBirth: z.string(), // YYYY-MM-DD
  timeOfBirth: z.string(), // HH:MM
  gender: z.string().optional(),
  country: z.string().optional(),
  district: z.string(),
  city: z.string().optional(),
  birthplace: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  timezone: z.number().optional()
});

export class KundaliController {
  static async generate(req: AuthenticatedRequest, res: Response) {
    try {
      const validated = kundaliSchema.parse(req.body);
      const userId = req.user?.id || 'usr-demo-01';
      const result = KundaliService.generate({
        ...validated,
        userId
      });
      res.status(201).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async getHistory(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id || 'usr-demo-01';
      const history = KundaliService.getHistory(userId);
      res.json({ success: true, data: history });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getById(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const record = KundaliService.getById(id);
      res.json({ success: true, data: record });
    } catch (err: any) {
      res.status(404).json({ success: false, error: err.message });
    }
  }

  static async delete(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || 'usr-demo-01';
      const deleted = KundaliService.delete(id, userId);
      res.json({ success: deleted });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
