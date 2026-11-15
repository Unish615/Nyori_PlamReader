import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { store } from '../services/store.js';

export class ReportsController {
  static async getAll(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id || 'usr-demo-01';

      const kundalis = Array.from(store.kundaliRecords.values())
        .filter(r => r.userId === userId || userId === 'usr-demo-01')
        .map(k => ({
          id: k.id,
          type: 'kundali',
          title: `Kundali: ${k.profile.fullName} (${k.profile.nwaranName || 'न्वारन'})`,
          date: k.createdAt,
          details: {
            lagna: k.report.lagna.signNe,
            rashi: k.report.rashi.signNe,
            nakshatra: k.report.nakshatra.nameNe
          }
        }));

      const palms = Array.from(store.palmReadings.values())
        .filter(p => p.userId === userId || userId === 'usr-demo-01')
        .map(p => ({
          id: p.id,
          type: 'palm',
          title: `Palm Reading (${p.handType === 'right' ? 'दायाँ हात' : 'बायाँ हात'})`,
          date: p.createdAt,
          details: {
            handType: p.handType,
            quality: p.qualityStatus
          }
        }));

      const combined = [...kundalis, ...palms].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      res.json({ success: true, data: combined });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getById(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    if (id.startsWith('kun-')) {
      const k = store.kundaliRecords.get(id);
      if (k) return res.json({ success: true, type: 'kundali', data: k });
    } else if (id.startsWith('plm-')) {
      const p = store.palmReadings.get(id);
      if (p) return res.json({ success: true, type: 'palm', data: p });
    }
    res.status(404).json({ success: false, error: 'Report not found' });
  }

  static async delete(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    let deleted = false;
    if (id.startsWith('kun-')) {
      deleted = store.kundaliRecords.delete(id);
    } else if (id.startsWith('plm-')) {
      deleted = store.palmReadings.delete(id);
    }
    res.json({ success: deleted });
  }
}
