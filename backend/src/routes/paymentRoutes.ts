import { Router } from 'express';
import { store } from '../services/store.js';

export const paymentRouter = Router();

// Get QR Settings
paymentRouter.get('/qr-settings', (req, res) => {
  try {
    const settings = store.getQrSettings();
    res.json({ success: true, settings });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update QR Settings (Admin)
paymentRouter.put('/qr-settings', (req, res) => {
  try {
    const updated = store.updateQrSettings(req.body);
    res.json({ success: true, settings: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Submit Payment Request
paymentRouter.post('/request', (req, res) => {
  try {
    const {
      userId = 'usr-demo-01',
      userName = 'Unish Gautam',
      userEmail = 'unish@nyoriachina.com',
      planId,
      paymentMethod,
      transactionReference,
      screenshotUrl,
      note
    } = req.body;

    if (!planId) return res.status(400).json({ success: false, error: 'Plan is required' });
    if (!paymentMethod) return res.status(400).json({ success: false, error: 'Payment method is required' });
    if (!transactionReference) return res.status(400).json({ success: false, error: 'Transaction Reference ID is required' });
    if (!screenshotUrl) return res.status(400).json({ success: false, error: 'Payment screenshot is required' });

    const payment = store.submitPaymentRequest({
      userId,
      userName,
      userEmail,
      planId,
      paymentMethod,
      transactionReference,
      screenshotUrl,
      note
    });

    res.json({ success: true, transaction: payment });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get user payments
paymentRouter.get('/my', (req, res) => {
  try {
    const userId = (req.query.userId as string) || 'usr-demo-01';
    const payments = store.getUserPayments(userId);
    res.json({ success: true, payments });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin get all payments
paymentRouter.get('/admin', (req, res) => {
  try {
    const payments = store.getAllPayments();
    res.json({ success: true, payments });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin approve payment
paymentRouter.post('/approve', (req, res) => {
  try {
    const { paymentId, adminId = 'usr-admin-01' } = req.body;
    if (!paymentId) return res.status(400).json({ success: false, error: 'Payment ID is required' });

    const result = store.approvePayment(paymentId, adminId);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Admin reject payment
paymentRouter.post('/reject', (req, res) => {
  try {
    const { paymentId, reason, adminId = 'usr-admin-01' } = req.body;
    if (!paymentId) return res.status(400).json({ success: false, error: 'Payment ID is required' });

    const result = store.rejectPayment(paymentId, reason, adminId);
    res.json({ success: true, payment: result });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});
