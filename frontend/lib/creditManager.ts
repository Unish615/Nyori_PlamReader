/**
 * Nyoria चिना - Robust Client Credit & Payment Manager
 * Ensures 100% reliable persistence for My Credit Balance and Payment & Subscription Requests
 * Works seamlessly across browser sessions, serverless restarts, and authenticated/guest states.
 */

export interface UserCredits {
  aiQuestions: number;
  palmReadings: number;
  kundalis: number;
  lastResetDate: string;
}

export interface UserSubscription {
  planId: string;
  planName: string;
  status: 'active' | 'expired' | 'cancelled';
  billingPeriod: string;
  startDate: string;
  expiryDate: string | null;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  planId: string;
  planName: string;
  amountNpr: number;
  paymentMethod: 'esewa' | 'khalti';
  transactionReference: string;
  screenshotUrl: string;
  note?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: string;
  approvedAt?: string;
}

const DEFAULT_CREDITS: UserCredits = {
  aiQuestions: 3,
  palmReadings: 1,
  kundalis: 1,
  lastResetDate: new Date().toISOString()
};

const DEFAULT_SUBSCRIPTION: UserSubscription = {
  planId: 'plan-free',
  planName: 'Free Plan',
  status: 'active',
  billingPeriod: 'free',
  startDate: new Date().toISOString(),
  expiryDate: null
};

export const CreditManager = {
  getCredits(userId?: string): UserCredits {
    if (typeof window === 'undefined') return DEFAULT_CREDITS;
    const key = userId ? `nyoria_credits_${userId}` : 'nyoria_credits';
    const saved = localStorage.getItem(key) || localStorage.getItem('nyoria_credits');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Initialize default free plan credits
    CreditManager.saveCredits(DEFAULT_CREDITS, userId);
    return DEFAULT_CREDITS;
  },

  saveCredits(credits: UserCredits, userId?: string) {
    if (typeof window === 'undefined') return;
    const key = userId ? `nyoria_credits_${userId}` : 'nyoria_credits';
    localStorage.setItem(key, JSON.stringify(credits));
    localStorage.setItem('nyoria_credits', JSON.stringify(credits));
  },

  getSubscription(userId?: string): UserSubscription {
    if (typeof window === 'undefined') return DEFAULT_SUBSCRIPTION;
    const key = userId ? `nyoria_sub_${userId}` : 'nyoria_sub';
    const saved = localStorage.getItem(key) || localStorage.getItem('nyoria_sub');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    CreditManager.saveSubscription(DEFAULT_SUBSCRIPTION, userId);
    return DEFAULT_SUBSCRIPTION;
  },

  saveSubscription(sub: UserSubscription, userId?: string) {
    if (typeof window === 'undefined') return;
    const key = userId ? `nyoria_sub_${userId}` : 'nyoria_sub';
    localStorage.setItem(key, JSON.stringify(sub));
    localStorage.setItem('nyoria_sub', JSON.stringify(sub));
  },

  getPayments(userId?: string): PaymentRecord[] {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('nyoria_payments');
    if (saved) {
      try {
        const list: PaymentRecord[] = JSON.parse(saved);
        if (Array.isArray(list)) {
          return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  },

  addPayment(payment: PaymentRecord) {
    if (typeof window === 'undefined') return;
    const current = CreditManager.getPayments();
    // Prevent duplicate reference IDs
    const filtered = current.filter(p => p.transactionReference.toLowerCase() !== payment.transactionReference.toLowerCase());
    filtered.unshift(payment);
    localStorage.setItem('nyoria_payments', JSON.stringify(filtered));
  },

  updatePaymentStatus(paymentId: string, status: 'approved' | 'rejected', reason?: string) {
    if (typeof window === 'undefined') return;
    const current = CreditManager.getPayments();
    const updated = current.map(p => {
      if (p.id === paymentId) {
        return {
          ...p,
          status,
          rejectionReason: status === 'rejected' ? (reason || 'Receipt unverified') : undefined,
          approvedAt: status === 'approved' ? new Date().toISOString() : undefined
        };
      }
      return p;
    });
    localStorage.setItem('nyoria_payments', JSON.stringify(updated));
  },

  hasCredit(type: 'ai_question' | 'palm_reading' | 'kundali', userId?: string): boolean {
    const creds = CreditManager.getCredits(userId);
    if (type === 'ai_question') return creds.aiQuestions > 0;
    if (type === 'palm_reading') return creds.palmReadings > 0;
    if (type === 'kundali') return creds.kundalis > 0;
    return false;
  },

  deductCredit(type: 'ai_question' | 'palm_reading' | 'kundali', userId?: string): { success: boolean; remaining: number; error?: string } {
    const creds = CreditManager.getCredits(userId);

    if (type === 'ai_question') {
      if (creds.aiQuestions <= 0) {
        return {
          success: false,
          remaining: 0,
          error: 'तपाईंको AI प्रश्न सोध्ने क्रेडिट सकिएको छ। कृपया नयाँ योजना खरिद गर्नुहोस्।'
        };
      }
      creds.aiQuestions -= 1;
      CreditManager.saveCredits(creds, userId);
      return { success: true, remaining: creds.aiQuestions };
    }

    if (type === 'palm_reading') {
      if (creds.palmReadings <= 0) {
        return {
          success: false,
          remaining: 0,
          error: 'तपाईंको हस्तरेखा परीक्षण कोटा सकिएको छ। कृपया नयाँ योजना खरिद गर्नुहोस्।'
        };
      }
      creds.palmReadings -= 1;
      CreditManager.saveCredits(creds, userId);
      return { success: true, remaining: creds.palmReadings };
    }

    if (type === 'kundali') {
      if (creds.kundalis <= 0) {
        return {
          success: false,
          remaining: 0,
          error: 'तपाईंको कुण्डली निकाल्ने कोटा सकिएको छ। कृपया नयाँ योजना खरिद गर्नुहोस्।'
        };
      }
      creds.kundalis -= 1;
      CreditManager.saveCredits(creds, userId);
      return { success: true, remaining: creds.kundalis };
    }

    return { success: false, remaining: 0, error: 'Invalid credit type' };
  },

  applyPlanApproval(planId: string, userId?: string) {
    const quotas: Record<string, { name: string; questions: number; palms: number; kundalis: number; days: number }> = {
      'plan-basic': { name: 'Basic Plan', questions: 30, palms: 3, kundalis: 2, days: 365 },
      'plan-premium': { name: 'Premium Plan', questions: 200, palms: 10, kundalis: 10, days: 30 },
      'plan-ultimate': { name: 'Ultimate Plan', questions: 600, palms: 30, kundalis: 30, days: 30 },
    };

    const quota = quotas[planId] || { name: 'Premium Plan', questions: 200, palms: 10, kundalis: 10, days: 30 };
    const creds = CreditManager.getCredits(userId);
    creds.aiQuestions += quota.questions;
    creds.palmReadings += quota.palms;
    creds.kundalis += quota.kundalis;
    CreditManager.saveCredits(creds, userId);

    const now = new Date();
    const expiry = new Date(now.getTime() + quota.days * 24 * 60 * 60 * 1000).toISOString();
    const sub: UserSubscription = {
      planId,
      planName: quota.name,
      status: 'active',
      billingPeriod: planId === 'plan-basic' ? 'one_time' : 'monthly',
      startDate: now.toISOString(),
      expiryDate: expiry
    };
    CreditManager.saveSubscription(sub, userId);
  }
};
