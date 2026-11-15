'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { PaymentModal } from '../../components/PaymentModal';
import { 
  Sparkles, 
  Check, 
  Star, 
  ShieldCheck, 
  Clock, 
  Compass, 
  Hand, 
  Bot, 
  HelpCircle,
  FileText
} from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  nameEn: string;
  nameNe: string;
  priceNpr: number;
  billingPeriod: string;
  aiQuestionLimit: number;
  palmReadingLimit: number;
  kundaliLimit: number;
  featuresEn: string[];
  featuresNe: string[];
  isActive: boolean;
  isRecommended: boolean;
}

export default function PricingPage() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const isNe = language === 'ne';

  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentPlanId, setCurrentPlanId] = useState<string>('plan-free');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPlansAndCredits = () => {
    Promise.all([
      fetch('/api/plans').then(res => res.json()),
      fetch(`/api/credits?userId=${user?.id || 'usr-demo-01'}`).then(res => res.json())
    ]).then(([plansData, creditsData]) => {
      if (plansData.success && plansData.plans) {
        setPlans(plansData.plans);
      }
      if (creditsData.success && creditsData.subscription) {
        setCurrentPlanId(creditsData.subscription.planId);
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchPlansAndCredits();
  }, [user]);

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (plan.id === 'plan-free') return; // Free plan is default
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const getBillingLabel = (period: string) => {
    if (period === 'free') return t.pricing.free;
    if (period === 'one_time') return t.pricing.oneTime;
    if (period === 'monthly') return t.pricing.monthly;
    return t.pricing.yearly;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-bgLight dark:bg-bgDark transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-600/10 dark:bg-royal-600/20 text-royal-600 dark:text-gold-400 text-xs font-semibold tracking-wide border border-royal-600/20">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span className="font-devanagari">{isNe ? 'पारदर्शी परम्परागत सेवा शुल्क' : 'Vedic Wisdom & AI Precision'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white font-devanagari">
            {t.pricing.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-devanagari">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Section 18.E: Mandatory Bilingual Notice Card */}
        <div className="max-w-4xl mx-auto p-5 sm:p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-2 font-devanagari shadow-sm">
          <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-400 text-sm sm:text-base">
            <Clock className="w-5 h-5 shrink-0" />
            <span>{t.pricing.paymentNoticeTitle}</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed">
            {t.pricing.paymentNoticeText}
          </p>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {plans.map((plan) => {
            const isCurrent = currentPlanId === plan.id;
            const isRec = plan.isRecommended;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 ${
                  isRec
                    ? 'bg-gradient-to-b from-royal-950 via-navy-900 to-navy-950 text-white border-2 border-gold-500 shadow-2xl shadow-royal-600/20 scale-[1.02] z-10'
                    : 'bg-white dark:bg-navy-900/90 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-navy-700/80 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Recommended Badge */}
                {isRec && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold-500 to-amber-500 text-navy-950 text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1 font-devanagari">
                    <Star className="w-3.5 h-3.5 fill-navy-950" />
                    <span>{t.pricing.recommended}</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Name & Tagline */}
                  <div>
                    <h3 className="text-xl font-bold font-devanagari">
                      {isNe ? plan.nameNe : plan.nameEn}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        {plan.priceNpr === 0 ? t.pricing.free : `NPR ${plan.priceNpr}`}
                      </span>
                      {plan.priceNpr > 0 && (
                        <span className={`text-xs font-medium font-devanagari ${isRec ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                          / {getBillingLabel(plan.billingPeriod)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Credit Limits Summary */}
                  <div className={`p-3.5 rounded-2xl text-xs space-y-1.5 font-devanagari ${
                    isRec ? 'bg-royal-900/60 border border-royal-700/60' : 'bg-gray-50 dark:bg-navy-800/60 border border-gray-100 dark:border-navy-700/50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Bot className="w-3.5 h-3.5 text-royal-500 dark:text-gold-400" />
                        <span>{t.pricing.questionsLimit}:</span>
                      </span>
                      <span className="font-bold">{plan.aiQuestionLimit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Hand className="w-3.5 h-3.5 text-royal-500 dark:text-gold-400" />
                        <span>{t.pricing.palmLimit}:</span>
                      </span>
                      <span className="font-bold">{plan.palmReadingLimit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-royal-500 dark:text-gold-400" />
                        <span>{t.pricing.kundaliLimit}:</span>
                      </span>
                      <span className="font-bold">{plan.kundaliLimit}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    <span className={`text-[11px] font-bold uppercase tracking-wider block font-devanagari ${
                      isRec ? 'text-gold-400' : 'text-gray-400'
                    }`}>
                      {t.pricing.featuresTitle}
                    </span>
                    <ul className="space-y-2.5 text-xs font-devanagari">
                      {(isNe ? plan.featuresNe : plan.featuresEn).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isRec ? 'text-gold-400' : 'text-emerald-500'
                          }`} />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 pt-4 border-t border-gray-100 dark:border-navy-800/80">
                  {isCurrent ? (
                    <button
                      disabled
                      className="w-full py-3 px-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider cursor-default flex items-center justify-center gap-1.5 font-devanagari"
                    >
                      <Check className="w-4 h-4" />
                      <span>{t.pricing.currentPlan}</span>
                    </button>
                  ) : plan.priceNpr === 0 ? (
                    <button
                      disabled
                      className="w-full py-3 px-4 rounded-2xl bg-gray-100 dark:bg-navy-800 text-gray-400 dark:text-gray-500 font-medium text-xs cursor-default font-devanagari"
                    >
                      {t.pricing.freePlanActive}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSelectPlan(plan)}
                      className={`w-full py-3 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-200 font-devanagari ${
                        isRec
                          ? 'bg-gradient-to-r from-gold-500 via-amber-500 to-gold-400 text-navy-950 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-[1.02]'
                          : 'bg-royal-600 hover:bg-royal-700 text-white shadow-md shadow-royal-600/20 hover:scale-[1.02]'
                      }`}
                    >
                      {t.pricing.purchaseBtn}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature FAQs & Guarantee */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-gray-200 dark:border-navy-800 text-center space-y-4 font-devanagari">
          <div className="flex items-center justify-center gap-2 text-royal-600 dark:text-gold-400 font-semibold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>{isNe ? 'सुरक्षित तथा १००% प्रमाणित म्यानुअल QR भुक्तानी' : 'Secure Manual QR Verification System'}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            {isNe
              ? 'सबै भुक्तानीहरू eSewa र Khalti मार्फत व्यक्तिगत QR कोड प्रयोग गरी गरिन्छ। तपाईंको अनुरोध पेश भएपछि एडमिन टिमले तत्काल प्रमाणीकरण गरी खातामा क्रेडिट थप्नेछ।'
              : 'Payments are securely processed via personal eSewa and Khalti QR codes. Upon submitting your receipt, our administrative team quickly approves and allocates your credits.'
            }
          </p>
        </div>

      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={modalOpen}
        plan={selectedPlan}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          fetchPlansAndCredits();
        }}
      />
    </div>
  );
}
