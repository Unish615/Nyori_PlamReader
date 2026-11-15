import { Router } from 'express';
import { store } from '../services/store.js';

export const planRouter = Router();

// Get plans
planRouter.get('/', (req, res) => {
  try {
    const plans = store.getPlans();
    res.json({ success: true, plans });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update plan
planRouter.put('/', (req, res) => {
  try {
    const { id, ...updates } = req.body;
    if (!id) return res.status(400).json({ success: false, error: 'Plan ID is required' });
    const updated = store.updatePlan(id, updates);
    res.json({ success: true, plan: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});
