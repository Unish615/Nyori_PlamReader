'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { CreditManager } from '../lib/creditManager';
import { 
  X, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  Smartphone,
  Info
} from 'lucide-react';

interface Plan {
  id: string;
  nameEn: string;
  nameNe: string;
  priceNpr: number;
  billingPeriod: string;
  aiQuestionLimit: number;
  palmReadingLimit: number;
  kundaliLimit: number;
}

interface PaymentModalProps {
  plan: Plan | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function PaymentModal({ plan, isOpen, onClose, onSuccess }: PaymentModalProps) {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const isNe = language === 'ne';

  const [paymentMethod, setPaymentMethod] = useState<'esewa' | 'khalti'>('esewa');
  const [transactionRef, setTransactionRef] = useState('');
  const [note, setNote] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [qrSettings, setQrSettings] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setErrorMsg(null);
      setSuccessMsg(null);
      setTransactionRef('');
      setNote('');
      setScreenshotPreview(null);

      // Fetch active QR settings
      fetch('/api/payments/qr-settings')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.settings) {
            setQrSettings(data.settings);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen || !plan) return null;

  const activeQr = paymentMethod === 'esewa'
    ? (qrSettings?.esewaQrUrl || '/images/esewa-qr.svg')
    : (qrSettings?.khaltiQrUrl || '/images/khalti-qr.svg');

  const receiverName = paymentMethod === 'esewa'
    ? (qrSettings?.esewaName || 'Unish Gautam (Nyoria चिना)')
    : (qrSettings?.khaltiName || 'Unish Gautam (Nyoria चिना)');

  const receiverPhone = paymentMethod === 'esewa'
    ? (qrSettings?.esewaPhone || '9841000000')
    : (qrSettings?.khaltiPhone || '9841000000');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg(isNe ? 'फोटोको साइज १० MB भन्दा कम हुनुपर्छ।' : 'Screenshot file size must be less than 10MB.');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrorMsg(isNe ? 'कृपया JPG, PNG वा WEBP ढाँचाको फोटो अपलोड गर्नुहोस्।' : 'Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = () => {
      setScreenshotPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!transactionRef.trim()) {
      setErrorMsg(isNe ? 'कृपया कारोबार नम्बर (Transaction ID) लेख्नुहोस्।' : 'Transaction Reference ID is required.');
      return;
    }

    if (!screenshotPreview) {
      setErrorMsg(isNe ? 'कृपया भुक्तानी रसिदको स्क्रिनसट अपलोड गर्नुहोस्।' : 'Please upload the payment screenshot.');
      return;
    }

    setLoading(true);

    const paymentRecord = {
      id: `pay-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId: user?.id || 'usr-client',
      userName: user?.fullName || (user?.email ? user.email.split('@')[0] : 'Valued User'),
      userEmail: user?.email || 'user@nyoriachina.com',
      planId: plan.id,
      planName: isNe ? plan.nameNe : plan.nameEn,
      amountNpr: plan.priceNpr,
      paymentMethod,
      transactionReference: transactionRef.trim(),
      screenshotUrl: screenshotPreview,
      note: note.trim() || undefined,
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    };

    // 1. Immediately persist to robust client storage so user request never disappears
    CreditManager.addPayment(paymentRecord);

    try {
      const res = await fetch('/api/payments/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentRecord)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || (isNe ? 'अनुरोध पेश गर्न सकिएन।' : 'Failed to submit payment request.'));
      }

      setSuccessMsg(isNe 
        ? 'तपाईंको भुक्तानी अनुरोध सफलतापूर्वक पेश भयो! हाम्रो एडमिन टिमले प्रमाणित गरेपछि तुरुन्तै सदस्यता सक्रिय हुनेछ।'
        : 'Payment request submitted successfully! Your plan will activate once approved by admin.'
      );

      if (onSuccess) onSuccess();

      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error submitting payment request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-gray-900 dark:text-gray-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-royal-600 to-gold-500 flex items-center justify-center text-white shadow-lg shadow-royal-600/30">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-devanagari">
              {isNe ? plan.nameNe : plan.nameEn} - NPR {plan.priceNpr}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t.payment.modalSubtitle}
            </p>
          </div>
        </div>

        {/* Important Bilingual Payment Notice (Section 18.E Mandatory) */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm space-y-1.5 font-devanagari">
          <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-400">
            <Clock className="w-4 h-4 shrink-0" />
            <span>{t.pricing.paymentNoticeTitle}</span>
          </div>
          <p className="leading-relaxed">
            {t.pricing.paymentNoticeText}
          </p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-sm space-y-3 font-devanagari">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
              <span>{successMsg}</span>
            </div>
            <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-emerald-700 dark:text-emerald-400">
                {isNe ? 'तुरुन्तै परीक्षण गर्न चाहनुहुन्छ?' : 'Want to test credits immediately?'}
              </span>
              <button
                type="button"
                onClick={() => {
                  CreditManager.activatePlan(plan.id, user?.id);
                  if (onSuccess) onSuccess();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition-all cursor-pointer"
              >
                {isNe ? 'तुरुन्त योजना सक्रिय गर्नुहोस्' : 'Instant Activate Plan'}
              </button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-800 dark:text-red-300 text-sm flex items-center gap-3 font-devanagari">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Step 1: Payment Method Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 font-devanagari">
              1. {t.payment.selectMethod}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('esewa')}
                className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border text-sm font-bold transition-all ${
                  paymentMethod === 'esewa'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-gray-200 dark:border-navy-700 hover:border-emerald-500/50 bg-gray-50 dark:bg-navy-800/60 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>eSewa</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('khalti')}
                className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border text-sm font-bold transition-all ${
                  paymentMethod === 'khalti'
                    ? 'border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400 shadow-md ring-2 ring-purple-500/20'
                    : 'border-gray-200 dark:border-navy-700 hover:border-purple-500/50 bg-gray-50 dark:bg-navy-800/60 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-purple-600" />
                <span>Khalti</span>
              </button>
            </div>
          </div>

          {/* Step 2: Display QR Code & Account Details */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-navy-800/50 border border-gray-200 dark:border-navy-700/80 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-36 h-36 bg-white p-2 rounded-2xl shadow-inner border border-gray-200 flex items-center justify-center shrink-0">
              {activeQr.startsWith('data:image') || activeQr.startsWith('http') || activeQr.startsWith('/') ? (
                <img src={activeQr} alt={`${paymentMethod} QR`} className="w-full h-full object-contain" />
              ) : (
                <div className="text-center text-xs text-gray-400">QR Code</div>
              )}
            </div>

            <div className="space-y-2 text-center sm:text-left text-xs sm:text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400 block text-[11px] font-medium font-devanagari">{t.payment.recipientName}</span>
                <span className="font-bold text-gray-900 dark:text-white font-devanagari">{receiverName}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 block text-[11px] font-medium font-devanagari">{t.payment.recipientNumber}</span>
                <span className="font-mono font-bold text-royal-600 dark:text-gold-400">{receiverPhone}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 block text-[11px] font-medium font-devanagari">{t.payment.amountToPay}</span>
                <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                  NPR {plan.priceNpr}
                </span>
              </div>
            </div>
          </div>

          {/* Step 3: Screenshot Upload */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 font-devanagari">
              2. {t.payment.uploadReceipt} <span className="text-red-500">*</span>
            </label>

            {screenshotPreview ? (
              <div className="relative rounded-2xl border border-gray-200 dark:border-navy-700 p-2 bg-gray-50 dark:bg-navy-800/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={screenshotPreview} alt="Receipt preview" className="w-16 h-16 object-cover rounded-xl border border-gray-300 dark:border-navy-600" />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 font-devanagari">
                    <CheckCircle2 className="w-4 h-4" /> {isNe ? 'रसिद लोड भयो' : 'Receipt uploaded'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setScreenshotPreview(null)}
                  className="px-3 py-1.5 rounded-xl text-xs text-red-500 hover:bg-red-500/10 transition-colors font-medium font-devanagari"
                >
                  {t.payment.changeReceipt}
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-navy-700 hover:border-royal-500 rounded-2xl cursor-pointer bg-gray-50/50 dark:bg-navy-800/30 hover:bg-royal-500/5 transition-all text-center">
                <Upload className="w-8 h-8 text-royal-500 mb-2" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-devanagari">
                  {t.payment.dragOrClick}
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Step 4: Transaction ID */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 font-devanagari">
              3. {t.payment.transactionId} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
              placeholder={t.payment.transactionIdPlaceholder}
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-navy-800/80 border border-gray-200 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-royal-500 text-sm font-mono"
              required
            />
          </div>

          {/* Step 5: Optional Note */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 font-devanagari">
              4. {t.payment.note}
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t.payment.notePlaceholder}
              className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-navy-800/80 border border-gray-200 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-royal-500 text-xs sm:text-sm font-devanagari"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !!successMsg}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-royal-600 via-royal-500 to-gold-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-royal-600/25 hover:shadow-royal-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-devanagari cursor-pointer"
          >
            {loading ? (
              <span>{t.payment.submitting}</span>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-gold-300" />
                <span>{t.payment.submitBtn}</span>
              </>
            )}
          </button>

          {/* Instant Test Activation Option */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                CreditManager.activatePlan(plan.id, user?.id);
                if (onSuccess) onSuccess();
                alert(isNe ? `${plan.nameNe} र क्रेडिटहरू सफलतापूर्वक सक्रिय भए!` : `${plan.nameEn} and credits activated successfully!`);
                onClose();
              }}
              className="text-xs text-royal-600 dark:text-gold-400 hover:underline font-semibold font-devanagari cursor-pointer"
            >
              {isNe ? '⚡ सिधै योजना सक्रिय गरी क्रेडिट परीक्षण गर्नुहोस् (Demo / Test Mode)' : '⚡ Instant Activate Plan & Test Credits (Demo / Test Mode)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
