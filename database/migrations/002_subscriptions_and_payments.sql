-- Nyoria चिना - Migration 002: Subscription, Pricing, Credit Management & Manual QR Payment System
-- Compatible with Supabase PostgreSQL

-- 1. Subscription Plans Table
CREATE TABLE IF NOT EXISTS public.subscription_plans (
    id TEXT PRIMARY KEY, -- 'plan-free', 'plan-basic', 'plan-premium', 'plan-ultimate'
    name_en TEXT NOT NULL,
    name_ne TEXT NOT NULL,
    price_npr INTEGER NOT NULL DEFAULT 0,
    billing_period TEXT NOT NULL DEFAULT 'monthly' CHECK (billing_period IN ('free', 'one_time', 'monthly', 'yearly')),
    validity_days INTEGER, -- NULL for free, 365 or NULL for one-time basic, 30 for monthly
    ai_question_limit INTEGER NOT NULL DEFAULT 3,
    palm_reading_limit INTEGER NOT NULL DEFAULT 1,
    kundali_limit INTEGER NOT NULL DEFAULT 0,
    features_en JSONB NOT NULL DEFAULT '[]'::jsonb,
    features_ne JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_recommended BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Initial 4 Plans
INSERT INTO public.subscription_plans (id, name_en, name_ne, price_npr, billing_period, validity_days, ai_question_limit, palm_reading_limit, kundali_limit, features_en, features_ne, is_active, is_recommended)
VALUES
  (
    'plan-free',
    'Free Plan',
    'निःशुल्क योजना',
    0,
    'free',
    NULL,
    3,
    1,
    0,
    '["3 AI assistant questions", "1 basic palm reading", "Basic Kundali preview", "Nepali & English support", "No premium PDF downloads"]'::jsonb,
    '["३ AI सहायक प्रश्नहरू", "१ आधारभूत हस्तरेखा परीक्षण", "साधारण कुण्डली अवलोकन", "नेपाली र अङ्ग्रेजी समर्थन", "PDF डाउनलोड उपलब्ध छैन"]'::jsonb,
    TRUE,
    FALSE
  ),
  (
    'plan-basic',
    'Basic Plan',
    'आधारभूत योजना',
    100,
    'one_time',
    365,
    30,
    3,
    2,
    '["30 AI assistant questions", "3 detailed palm readings", "2 complete Kundali reports", "Full PDF report downloads", "Voice questions enabled", "Nepali & English support"]'::jsonb,
    '["३० AI सहायक प्रश्नहरू", "३ विस्तृत हस्तरेखा परीक्षण", "२ पूर्ण कुण्डली प्रतिवेदन", "सम्पूर्ण PDF डाउनलोड सुविधा", "आवाजद्वारा प्रश्न सोध्ने सुविधा", "नेपाली र अङ्ग्रेजी समर्थन"]'::jsonb,
    TRUE,
    FALSE
  ),
  (
    'plan-premium',
    'Premium Plan',
    'प्रिमियम योजना',
    299,
    'monthly',
    30,
    200,
    10,
    10,
    '["200 AI assistant questions / mo", "10 palm readings / mo", "10 Kundali reports / mo", "Premium PDF downloads", "Voice assistant enabled", "Complete report history", "Detailed AI interpretations"]'::jsonb,
    '["२०० AI प्रश्नहरू प्रतिमहिना", "१० हस्तरेखा परीक्षण प्रतिमहिना", "१० कुण्डली प्रतिवेदन प्रतिमहिना", "प्रिमियम PDF डाउनलोड", "आवाज सहायक सक्रिय", "सम्पूर्ण रिपोर्ट इतिहास", "विस्तृत AI शास्त्रीय फलकथन"]'::jsonb,
    TRUE,
    TRUE
  ),
  (
    'plan-ultimate',
    'Ultimate Plan',
    'अल्टिमेट योजना',
    599,
    'monthly',
    30,
    600,
    30,
    30,
    '["600 AI assistant questions / mo", "30 palm readings / mo", "30 Kundali reports / mo", "Unlimited PDF downloads", "Voice assistant enabled", "Priority AI processing", "Complete report history", "Premium dedicated support"]'::jsonb,
    '["६०० AI प्रश्नहरू प्रतिमहिना", "३० हस्तरेखा परीक्षण प्रतिमहिना", "३० कुण्डली प्रतिवेदन प्रतिमहिना", "असीमित PDF डाउनलोड", "आवाज सहायक सक्रिय", "प्राथमिकता प्राप्त AI प्रशोधन", "सम्पूर्ण रिपोर्ट इतिहास", "विशेष समर्पित सहयोग"]'::jsonb,
    TRUE,
    FALSE
  )
ON CONFLICT (id) DO UPDATE SET
  price_npr = EXCLUDED.price_npr,
  ai_question_limit = EXCLUDED.ai_question_limit,
  palm_reading_limit = EXCLUDED.palm_reading_limit,
  kundali_limit = EXCLUDED.kundali_limit,
  updated_at = NOW();

-- 2. User Subscriptions Table
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id TEXT NOT NULL REFERENCES public.subscription_plans(id),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
    billing_period TEXT NOT NULL DEFAULT 'monthly',
    start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expiry_date TIMESTAMPTZ, -- NULL for free, date for basic/monthly
    auto_renew BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. User Credits Table
CREATE TABLE IF NOT EXISTS public.user_credits (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    ai_questions_balance INTEGER NOT NULL DEFAULT 3,
    palm_readings_balance INTEGER NOT NULL DEFAULT 1,
    kundalis_balance INTEGER NOT NULL DEFAULT 0,
    last_reset_date TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Credit Transactions Table (Audit trail of every credit deduction/grant)
CREATE TABLE IF NOT EXISTS public.credit_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL CHECK (action IN ('deduct', 'grant', 'reset', 'admin_adjust')),
    usage_type TEXT NOT NULL CHECK (usage_type IN ('ai_question', 'palm_reading', 'kundali', 'plan_activation')),
    amount INTEGER NOT NULL,
    balance_after INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Payment Transactions Table (Manual QR Code payments)
CREATE TABLE IF NOT EXISTS public.payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id TEXT NOT NULL REFERENCES public.subscription_plans(id),
    plan_name TEXT NOT NULL,
    amount_npr INTEGER NOT NULL,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('esewa', 'khalti')),
    transaction_reference TEXT NOT NULL UNIQUE,
    screenshot_url TEXT NOT NULL,
    note TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    rejection_reason TEXT,
    admin_id UUID REFERENCES public.profiles(id),
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. QR Code Management Settings (Singleton table)
CREATE TABLE IF NOT EXISTS public.payment_qr_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    esewa_qr_url TEXT NOT NULL DEFAULT '/images/qr-esewa-demo.svg',
    esewa_phone TEXT NOT NULL DEFAULT '98XXXXXXXX',
    esewa_name TEXT NOT NULL DEFAULT 'Nyoria चिना (Unish Gautam)',
    esewa_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    khalti_qr_url TEXT NOT NULL DEFAULT '/images/qr-khalti-demo.svg',
    khalti_phone TEXT NOT NULL DEFAULT '98XXXXXXXX',
    khalti_name TEXT NOT NULL DEFAULT 'Nyoria चिना (Unish Gautam)',
    khalti_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    instructions_en TEXT NOT NULL DEFAULT 'Scan the QR code using your eSewa or Khalti app, pay the exact amount, and upload the payment receipt screenshot with your transaction reference number.',
    instructions_ne TEXT NOT NULL DEFAULT 'तपाईंको eSewa वा Khalti एपबाट QR कोड स्क्यान गरी तोकिएको रकम भुक्तानी गर्नुहोस् र भुक्तानी रसिदको स्क्रिनसट तथा कारोबार नम्बर (Transaction Reference ID) यहाँ पेश गर्नुहोस्।',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.payment_qr_settings (id, esewa_enabled, khalti_enabled)
VALUES (1, TRUE, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 7. Payment Audit Logs Table
CREATE TABLE IF NOT EXISTS public.payment_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES public.profiles(id),
    action TEXT NOT NULL, -- 'approve_payment', 'reject_payment', 'edit_plan', 'update_qr'
    target_payment_id UUID REFERENCES public.payment_transactions(id),
    target_user_id UUID REFERENCES public.profiles(id),
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning fast lookups
CREATE INDEX IF NOT EXISTS idx_payment_transactions_user_id ON public.payment_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_status ON public.payment_transactions(status);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_ref ON public.payment_transactions(transaction_reference);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user ON public.credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user ON public.user_subscriptions(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_qr_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read subscription plans" ON public.subscription_plans FOR SELECT USING (true);
CREATE POLICY "Public read QR settings" ON public.payment_qr_settings FOR SELECT USING (true);

CREATE POLICY "Users read own subscription" ON public.user_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own credits" ON public.user_credits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own credit transactions" ON public.credit_transactions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users view own payments" ON public.payment_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own payments" ON public.payment_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins full access
CREATE POLICY "Admins full access plans" ON public.subscription_plans FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);
CREATE POLICY "Admins full access payments" ON public.payment_transactions FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);
CREATE POLICY "Admins full access QR" ON public.payment_qr_settings FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);
