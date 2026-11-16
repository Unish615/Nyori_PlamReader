/**
 * Nyoria चिना - In-Memory & Serverless Shared Store
 * Synchronized with backend models for Subscriptions, Credits, QR Payments, and Astrological calculations.
 */

export interface UserRecord {
  id: string;
  email: string;
  passwordHash?: string;
  fullName: string;
  nwaranName?: string;
  dateOfBirth?: string;
  timeOfBirth?: string;
  gender?: string;
  country?: string;
  district?: string;
  city?: string;
  birthplace?: string;
  role: 'user' | 'admin';
  preferredLanguage: 'en' | 'ne';
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlan {
  id: string;
  nameEn: string;
  nameNe: string;
  priceNpr: number;
  billingPeriod: 'free' | 'one_time' | 'monthly' | 'yearly';
  validityDays: number | null;
  aiQuestionLimit: number;
  palmReadingLimit: number;
  kundaliLimit: number;
  featuresEn: string[];
  featuresNe: string[];
  isActive: boolean;
  isRecommended: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  status: 'active' | 'expired' | 'cancelled';
  billingPeriod: string;
  startDate: string;
  expiryDate: string | null;
}

export interface UserCredits {
  userId: string;
  aiQuestions: number;
  palmReadings: number;
  kundalis: number;
  lastResetDate: string;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  action: 'deduct' | 'grant' | 'reset' | 'admin_adjust';
  usageType: 'ai_question' | 'palm_reading' | 'kundali' | 'plan_activation';
  amount: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
}

export interface PaymentTransaction {
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
  adminId?: string;
  approvedAt?: string;
  createdAt: string;
}

export interface PaymentQrSettings {
  esewaQrUrl: string;
  esewaPhone: string;
  esewaName: string;
  esewaEnabled: boolean;
  khaltiQrUrl: string;
  khaltiPhone: string;
  khaltiName: string;
  khaltiEnabled: boolean;
  instructionsEn: string;
  instructionsNe: string;
}

const INITIAL_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-free',
    nameEn: 'Free Plan',
    nameNe: 'निःशुल्क योजना',
    priceNpr: 0,
    billingPeriod: 'free',
    validityDays: null,
    aiQuestionLimit: 3,
    palmReadingLimit: 1,
    kundaliLimit: 0,
    featuresEn: [
      '3 AI assistant questions',
      '1 basic palm reading',
      'Basic Kundali preview',
      'Nepali & English support',
      'No premium PDF downloads'
    ],
    featuresNe: [
      '३ AI सहायक प्रश्नहरू',
      '१ आधारभूत हस्तरेखा परीक्षण',
      'साधारण कुण्डली अवलोकन',
      'नेपाली र अङ्ग्रेजी समर्थन',
      'PDF डाउनलोड उपलब्ध छैन'
    ],
    isActive: true,
    isRecommended: false
  },
  {
    id: 'plan-basic',
    nameEn: 'Basic Plan',
    nameNe: 'आधारभूत योजना',
    priceNpr: 100,
    billingPeriod: 'one_time',
    validityDays: 365,
    aiQuestionLimit: 30,
    palmReadingLimit: 3,
    kundaliLimit: 2,
    featuresEn: [
      '30 AI assistant questions',
      '3 detailed palm readings',
      '2 Kundali reports',
      'PDF report downloads',
      'Voice questions enabled',
      'Full Nepali & English support'
    ],
    featuresNe: [
      '३० AI सहायक प्रश्नहरू',
      '३ विस्तृत हस्तरेखा परीक्षण',
      '२ कुण्डली प्रतिवेदन',
      'PDF रिपोर्ट डाउनलोड',
      'आवाजद्वारा प्रश्न सोध्ने सुविधा',
      'पूर्ण नेपाली र अङ्ग्रेजी समर्थन'
    ],
    isActive: true,
    isRecommended: false
  },
  {
    id: 'plan-premium',
    nameEn: 'Premium Plan',
    nameNe: 'प्रिमियम योजना',
    priceNpr: 299,
    billingPeriod: 'monthly',
    validityDays: 30,
    aiQuestionLimit: 200,
    palmReadingLimit: 10,
    kundaliLimit: 10,
    featuresEn: [
      '200 AI assistant questions / mo',
      '10 palm readings / mo',
      '10 Kundali reports / mo',
      'PDF downloads',
      'Voice assistant enabled',
      'Complete report history',
      'Detailed AI interpretations'
    ],
    featuresNe: [
      '२०० AI प्रश्नहरू प्रतिमहिना',
      '१० हस्तरेखा परीक्षण प्रतिमहिना',
      '१० कुण्डली प्रतिवेदन प्रतिमहिना',
      'PDF डाउनलोड सुविधा',
      'आवाज सहायक सक्रिय',
      'सम्पूर्ण रिपोर्ट इतिहास',
      'विस्तृत AI व्याख्या'
    ],
    isActive: true,
    isRecommended: true
  },
  {
    id: 'plan-ultimate',
    nameEn: 'Ultimate Plan',
    nameNe: 'अल्टिमेट योजना',
    priceNpr: 599,
    billingPeriod: 'monthly',
    validityDays: 30,
    aiQuestionLimit: 600,
    palmReadingLimit: 30,
    kundaliLimit: 30,
    featuresEn: [
      '600 AI assistant questions / mo',
      '30 palm readings / mo',
      '30 Kundali reports / mo',
      'Unlimited PDF downloads',
      'Voice assistant enabled',
      'Priority AI processing',
      'Complete report history',
      'Dedicated premium support'
    ],
    featuresNe: [
      '६०० AI प्रश्नहरू प्रतिमहिना',
      '३० हस्तरेखा परीक्षण प्रतिमहिना',
      '३० कुण्डली प्रतिवेदन प्रतिमहिना',
      'असीमित PDF डाउनलोड',
      'आवाज सहायक सक्रिय',
      'प्राथमिकता प्राप्त AI प्रशोधन',
      'सम्पूर्ण रिपोर्ट इतिहास',
      'समर्पित प्रिमियम सहयोग'
    ],
    isActive: true,
    isRecommended: false
  }
];

class MemoryStore {
  users: Map<string, UserRecord> = new Map();
  plans: Map<string, SubscriptionPlan> = new Map();
  userSubscriptions: Map<string, UserSubscription> = new Map();
  userCredits: Map<string, UserCredits> = new Map();
  creditTransactions: CreditTransaction[] = [];
  paymentTransactions: Map<string, PaymentTransaction> = new Map();
  qrSettings: PaymentQrSettings;
  activityLogs: any[] = [];

  constructor() {
    const adminUser: UserRecord = {
      id: 'usr-admin-01',
      email: 'admin@nyoriachina.com',
      passwordHash: 'admin1234',
      fullName: 'Admin Jyotish',
      nwaranName: '',
      role: 'admin',
      preferredLanguage: 'ne',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.set(adminUser.id, adminUser);

    INITIAL_PLANS.forEach(p => this.plans.set(p.id, p));

    this.qrSettings = {
      esewaQrUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%2341A124"/><text x="50%25" y="45%25" dominant-baseline="middle" text-anchor="middle" font-size="22" font-weight="bold" fill="white">eSewa QR</text><text x="50%25" y="65%25" dominant-baseline="middle" text-anchor="middle" font-size="14" fill="white">Unish Gautam</text></svg>',
      esewaPhone: '9841000000',
      esewaName: 'Unish Gautam (Nyoria चिना)',
      esewaEnabled: true,
      khaltiQrUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%235C2D91"/><text x="50%25" y="45%25" dominant-baseline="middle" text-anchor="middle" font-size="22" font-weight="bold" fill="white">Khalti QR</text><text x="50%25" y="65%25" dominant-baseline="middle" text-anchor="middle" font-size="14" fill="white">Unish Gautam</text></svg>',
      khaltiPhone: '9841000000',
      khaltiName: 'Unish Gautam (Nyoria चिना)',
      khaltiEnabled: true,
      instructionsEn: 'Scan using eSewa or Khalti app, pay exact NPR amount, take a screenshot of payment receipt, and enter your Transaction Reference ID below.',
      instructionsNe: 'तपाईंको eSewa वा Khalti एपबाट QR स्क्यान गरी तोकिएको रकम भुक्तानी गर्नुहोस्। त्यसपछि रसिदको स्क्रिनसट अपलोड गरी कारोबार नम्बर (Transaction ID) पेश गर्नुहोस्।'
    };
  }

  logActivity(userId: string, action: string, details: any, ipAddress?: string) {
    this.activityLogs.unshift({
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      action,
      details,
      ipAddress,
      createdAt: new Date().toISOString()
    });
  }

  getPlans(): SubscriptionPlan[] {
    return Array.from(this.plans.values());
  }

  getPlan(planId: string): SubscriptionPlan | undefined {
    return this.plans.get(planId);
  }

  updatePlan(planId: string, updates: Partial<SubscriptionPlan>): SubscriptionPlan {
    const plan = this.plans.get(planId);
    if (!plan) throw new Error('Plan not found');
    const updated = { ...plan, ...updates };
    this.plans.set(planId, updated);
    return updated;
  }

  getUserSubscription(userId: string): UserSubscription {
    let sub = this.userSubscriptions.get(userId);
    if (!sub) {
      sub = {
        id: `sub-${Date.now()}`,
        userId,
        planId: 'plan-free',
        planName: 'Free Plan',
        status: 'active',
        billingPeriod: 'free',
        startDate: new Date().toISOString(),
        expiryDate: null
      };
      this.userSubscriptions.set(userId, sub);
    }
    return sub;
  }

  getUserCredits(userId: string): UserCredits {
    let credits = this.userCredits.get(userId);
    if (!credits) {
      credits = {
        userId,
        aiQuestions: 3,
        palmReadings: 1,
        kundalis: 1,
        lastResetDate: new Date().toISOString()
      };
      this.userCredits.set(userId, credits);
    }
    return credits;
  }

  checkAndDeductCredit(userId: string, type: 'ai_question' | 'palm_reading' | 'kundali'): { success: boolean; remaining: number; error?: string } {
    const credits = this.getUserCredits(userId);

    if (type === 'ai_question') {
      if (credits.aiQuestions <= 0) {
        return { success: false, remaining: 0, error: 'तपाईंको AI प्रश्न सोध्ने कोटा सकिएको छ। कृपया योजना अपग्रेड गर्नुहोस्।' };
      }
      credits.aiQuestions -= 1;
      this.creditTransactions.unshift({
        id: `ctx-${Date.now()}`,
        userId,
        action: 'deduct',
        usageType: 'ai_question',
        amount: 1,
        balanceAfter: credits.aiQuestions,
        description: 'Deducted 1 AI question credit',
        createdAt: new Date().toISOString()
      });
      return { success: true, remaining: credits.aiQuestions };
    }

    if (type === 'palm_reading') {
      if (credits.palmReadings <= 0) {
        return { success: false, remaining: 0, error: 'तपाईंको हस्तरेखा परीक्षण कोटा सकिएको छ। कृपया योजना अपग्रेड गर्नुहोस्।' };
      }
      credits.palmReadings -= 1;
      this.creditTransactions.unshift({
        id: `ctx-${Date.now()}`,
        userId,
        action: 'deduct',
        usageType: 'palm_reading',
        amount: 1,
        balanceAfter: credits.palmReadings,
        description: 'Deducted 1 palm reading credit',
        createdAt: new Date().toISOString()
      });
      return { success: true, remaining: credits.palmReadings };
    }

    if (type === 'kundali') {
      if (credits.kundalis <= 0) {
        return { success: false, remaining: 0, error: 'तपाईंको कुण्डली निकाल्ने कोटा सकिएको छ। कृपया योजना अपग्रेड गर्नुहोस्।' };
      }
      credits.kundalis -= 1;
      this.creditTransactions.unshift({
        id: `ctx-${Date.now()}`,
        userId,
        action: 'deduct',
        usageType: 'kundali',
        amount: 1,
        balanceAfter: credits.kundalis,
        description: 'Deducted 1 Kundali generation credit',
        createdAt: new Date().toISOString()
      });
      return { success: true, remaining: credits.kundalis };
    }

    return { success: false, remaining: 0, error: 'Invalid credit type' };
  }

  getQrSettings(): PaymentQrSettings {
    return this.qrSettings;
  }

  updateQrSettings(updates: Partial<PaymentQrSettings>): PaymentQrSettings {
    this.qrSettings = { ...this.qrSettings, ...updates };
    return this.qrSettings;
  }

  submitPaymentRequest(params: {
    userId: string;
    userName: string;
    userEmail: string;
    planId: string;
    paymentMethod: 'esewa' | 'khalti';
    transactionReference: string;
    screenshotUrl: string;
    note?: string;
  }): PaymentTransaction {
    const trimmedRef = params.transactionReference.trim();
    if (!trimmedRef) throw new Error('Transaction Reference ID is required');
    if (!params.screenshotUrl) throw new Error('Payment screenshot is required');

    for (const p of this.paymentTransactions.values()) {
      if (p.transactionReference.toLowerCase() === trimmedRef.toLowerCase()) {
        throw new Error('This Transaction Reference ID has already been submitted.');
      }
    }

    const plan = this.plans.get(params.planId);
    if (!plan) throw new Error('Selected subscription plan not found');

    const paymentId = `pay-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const record: PaymentTransaction = {
      id: paymentId,
      userId: params.userId,
      userName: params.userName || 'Unish Gautam',
      userEmail: params.userEmail,
      planId: plan.id,
      planName: plan.nameEn,
      amountNpr: plan.priceNpr,
      paymentMethod: params.paymentMethod,
      transactionReference: trimmedRef,
      screenshotUrl: params.screenshotUrl,
      note: params.note,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    this.paymentTransactions.set(paymentId, record);
    this.logActivity(params.userId, 'PAYMENT_SUBMITTED', { paymentId, planId: plan.id, ref: trimmedRef });
    return record;
  }

  approvePayment(paymentId: string, adminId: string): { success: boolean; payment: PaymentTransaction; credits: UserCredits } {
    const payment = this.paymentTransactions.get(paymentId);
    if (!payment) throw new Error('Payment transaction not found');
    if (payment.status !== 'pending') throw new Error(`Cannot approve payment with status: ${payment.status}`);

    const plan = this.plans.get(payment.planId);
    if (!plan) throw new Error('Associated plan not found');

    const now = new Date();
    let expiryDate: string | null = null;
    if (plan.validityDays) {
      const exp = new Date(now.getTime() + plan.validityDays * 24 * 60 * 60 * 1000);
      expiryDate = exp.toISOString();
    }

    this.userSubscriptions.set(payment.userId, {
      id: `sub-${Date.now()}`,
      userId: payment.userId,
      planId: plan.id,
      planName: plan.nameEn,
      status: 'active',
      billingPeriod: plan.billingPeriod,
      startDate: now.toISOString(),
      expiryDate
    });

    const userCreds = this.getUserCredits(payment.userId);
    userCreds.aiQuestions += plan.aiQuestionLimit;
    userCreds.palmReadings += plan.palmReadingLimit;
    userCreds.kundalis += plan.kundaliLimit;
    userCreds.lastResetDate = now.toISOString();

    this.creditTransactions.unshift({
      id: `ctx-${Date.now()}`,
      userId: payment.userId,
      action: 'grant',
      usageType: 'plan_activation',
      amount: plan.priceNpr,
      balanceAfter: userCreds.aiQuestions,
      description: `Activated ${plan.nameEn} (Granted ${plan.aiQuestionLimit} questions, ${plan.palmReadingLimit} palms, ${plan.kundaliLimit} kundalis)`,
      createdAt: now.toISOString()
    });

    payment.status = 'approved';
    payment.adminId = adminId;
    payment.approvedAt = now.toISOString();

    this.logActivity(adminId, 'PAYMENT_APPROVED', { paymentId, userId: payment.userId, planId: plan.id });
    return { success: true, payment, credits: userCreds };
  }

  rejectPayment(paymentId: string, reason: string, adminId: string): PaymentTransaction {
    const payment = this.paymentTransactions.get(paymentId);
    if (!payment) throw new Error('Payment transaction not found');
    if (payment.status !== 'pending') throw new Error(`Cannot reject payment with status: ${payment.status}`);

    payment.status = 'rejected';
    payment.rejectionReason = reason || 'Payment receipt could not be verified in eSewa/Khalti account.';
    payment.adminId = adminId;

    this.logActivity(adminId, 'PAYMENT_REJECTED', { paymentId, reason });
    return payment;
  }

  manualAdjustCredits(userId: string, questions: number, palms: number, kundalis: number, reason: string, adminId: string): UserCredits {
    const credits = this.getUserCredits(userId);
    credits.aiQuestions = Math.max(0, credits.aiQuestions + questions);
    credits.palmReadings = Math.max(0, credits.palmReadings + palms);
    credits.kundalis = Math.max(0, credits.kundalis + kundalis);

    this.creditTransactions.unshift({
      id: `ctx-${Date.now()}`,
      userId,
      action: 'admin_adjust',
      usageType: 'plan_activation',
      amount: questions + palms + kundalis,
      balanceAfter: credits.aiQuestions,
      description: `Admin adjustment by ${adminId}: ${reason}`,
      createdAt: new Date().toISOString()
    });

    this.logActivity(adminId, 'MANUAL_CREDIT_ADJUSTMENT', { userId, questions, palms, kundalis, reason });
    return credits;
  }

  getUserPayments(userId: string): PaymentTransaction[] {
    return Array.from(this.paymentTransactions.values())
      .filter(p => p.userId === userId || userId === 'usr-demo-01')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getAllPayments(): PaymentTransaction[] {
    return Array.from(this.paymentTransactions.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

// Preserve store singleton on globalThis for development hot reload & serverless re-invocation
const globalForStore = globalThis as unknown as { nyoriaStore?: MemoryStore };
export const store = globalForStore.nyoriaStore ?? new MemoryStore();
if (process.env.NODE_ENV !== 'production') globalForStore.nyoriaStore = store;
