import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { PalmService } from '../services/palmService.js';

export class PalmController {
  static async uploadAndAnalyze(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id || 'usr-demo-01';
      const handType = (req.body.handType === 'left' ? 'left' : 'right') as 'left' | 'right';

      let buffer: Buffer | null = null;
      let mimeType = 'image/jpeg';
      let fileName = 'palm.jpg';

      if (req.file) {
        buffer = req.file.buffer;
        mimeType = req.file.mimetype;
        fileName = req.file.originalname;
      } else if (req.body.imageBase64) {
        // Base64 encoded payload from camera or frontend preview
        let base64String = req.body.imageBase64;
        if (base64String.includes('base64,')) {
          const parts = base64String.split('base64,');
          mimeType = parts[0].replace('data:', '').replace(';', '');
          base64String = parts[1];
        }
        buffer = Buffer.from(base64String, 'base64');
      }

      if (!buffer) {
        return res.status(400).json({
          success: false,
          error: 'Please upload a palm image file or provide imageBase64.'
        });
      }

      const result = await PalmService.processPalmReading({
        userId,
        handType,
        imageBuffer: buffer,
        mimeType,
        fileName
      });

      if (!result.success) {
        return res.status(422).json(result);
      }

      res.status(201).json(result);
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getHistory(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id || 'usr-demo-01';
      const history = PalmService.getHistory(userId);
      res.json({ success: true, data: history });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getById(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const reading = PalmService.getById(id);
      res.json({ success: true, data: reading });
    } catch (err: any) {
      res.status(404).json({ success: false, error: err.message });
    }
  }

  static async delete(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || 'usr-demo-01';
      const deleted = PalmService.delete(id, userId);
      res.json({ success: deleted });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
