import { Router } from 'express';
import { store } from '../services/store.js';

export const creditRouter = Router();

// Get user credits & subscription
creditRouter.get('/', (req, res) => {
  try {
    const userId = (req.query.userId as string) || 'usr-demo-01';
    const credits = store.getUserCredits(userId);
    const subscription = store.getUserSubscription(userId);
    res.json({ success: true, credits, subscription });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin manual adjust
creditRouter.post('/adjust', (req, res) => {
  try {
    const { userId = 'usr-demo-01', questions = 0, palms = 0, kundalis = 0, reason = 'Admin adjustment', adminId = 'usr-admin-01' } = req.body;
    const credits = store.manualAdjustCredits(userId, Number(questions), Number(palms), Number(kundalis), reason, adminId);
    res.json({ success: true, credits });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});
