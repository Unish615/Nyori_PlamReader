-- Nyoria चिना (AI Palm Reading & Vedic Kundali Platform)
-- Database Migration: 001_initial_schema.sql
-- Compatible with Supabase PostgreSQL

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT NOT NULL,
    nwaran_name TEXT, -- न्वारनको नाम
    date_of_birth DATE,
    time_of_birth TIME,
    gender TEXT CHECK (gender IN ('male', 'female', 'other', 'unspecified')),
    country TEXT DEFAULT 'Nepal',
    district TEXT,
    city TEXT,
    birthplace TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    preferred_language TEXT NOT NULL DEFAULT 'ne' CHECK (preferred_language IN ('en', 'ne')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Palm Readings Table
CREATE TABLE IF NOT EXISTS public.palm_readings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    hand_type TEXT NOT NULL CHECK (hand_type IN ('left', 'right')),
    image_url TEXT NOT NULL,
    image_quality_status TEXT NOT NULL DEFAULT 'verified' CHECK (image_quality_status IN ('pending', 'verified', 'blurry', 'poor_lighting', 'no_hand_detected')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Palm Analysis Results Table
CREATE TABLE IF NOT EXISTS public.palm_analysis_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    palm_reading_id UUID NOT NULL REFERENCES public.palm_readings(id) ON DELETE CASCADE,
    life_line_interpretation JSONB NOT NULL,
    head_line_interpretation JSONB NOT NULL,
    heart_line_interpretation JSONB NOT NULL,
    fate_line_interpretation JSONB NOT NULL,
    sun_line_interpretation JSONB,
    marriage_line_interpretation JSONB,
    palm_shape_interpretation JSONB NOT NULL,
    finger_features_interpretation JSONB NOT NULL,
    mounts_interpretation JSONB,
    general_summary JSONB NOT NULL,
    personality_reading JSONB NOT NULL,
    career_reading JSONB NOT NULL,
    love_relationships_reading JSONB NOT NULL,
    financial_symbolism_reading JSONB NOT NULL,
    strengths_weaknesses JSONB NOT NULL,
    traditional_guidance JSONB NOT NULL,
    follow_up_questions JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Kundali Profiles Table
CREATE TABLE IF NOT EXISTS public.kundali_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    nwaran_name TEXT, -- न्वारनको नाम
    date_of_birth DATE NOT NULL,
    time_of_birth TIME NOT NULL,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    country TEXT NOT NULL DEFAULT 'Nepal',
    district TEXT NOT NULL,
    city TEXT NOT NULL,
    birthplace TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    timezone DOUBLE PRECISION NOT NULL DEFAULT 5.75, -- UTC+5:45 for Nepal
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Kundali Reports Table
CREATE TABLE IF NOT EXISTS public.kundali_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kundali_profile_id UUID NOT NULL REFERENCES public.kundali_profiles(id) ON DELETE CASCADE,
    lagna TEXT NOT NULL,
    lagna_lord TEXT NOT NULL,
    rashi TEXT NOT NULL,
    rashi_lord TEXT NOT NULL,
    nakshatra TEXT NOT NULL,
    nakshatra_pada INTEGER NOT NULL CHECK (nakshatra_pada BETWEEN 1 AND 4),
    tithi TEXT NOT NULL,
    yoga TEXT NOT NULL,
    karana TEXT NOT NULL,
    ayanamsa TEXT NOT NULL DEFAULT 'Lahiri (Chitra Paksha)',
    planetary_positions JSONB NOT NULL,
    houses JSONB NOT NULL,
    rashi_chart JSONB NOT NULL,
    navamsa_chart JSONB NOT NULL,
    vimshottari_dasha JSONB NOT NULL,
    current_dasha JSONB NOT NULL,
    manglik_dosha JSONB NOT NULL,
    traditional_yogas JSONB NOT NULL,
    planetary_strengths JSONB NOT NULL,
    house_interpretations JSONB NOT NULL,
    career_interpretation JSONB NOT NULL,
    marriage_interpretation JSONB NOT NULL,
    financial_interpretation JSONB NOT NULL,
    general_interpretation JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Chat Conversations Table
CREATE TABLE IF NOT EXISTS public.chat_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'New Conversation',
    language TEXT NOT NULL DEFAULT 'ne' CHECK (language IN ('en', 'ne')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Chat Messages Table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant')),
    text TEXT NOT NULL,
    audio_url TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Generated Reports Table
CREATE TABLE IF NOT EXISTS public.generated_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    report_type TEXT NOT NULL CHECK (report_type IN ('palm', 'kundali')),
    title TEXT NOT NULL,
    file_url TEXT,
    language TEXT NOT NULL DEFAULT 'ne' CHECK (language IN ('en', 'ne')),
    summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. User Preferences Table
CREATE TABLE IF NOT EXISTS public.user_preferences (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    dark_mode BOOLEAN DEFAULT TRUE,
    preferred_language TEXT DEFAULT 'ne' CHECK (preferred_language IN ('en', 'ne')),
    speech_rate REAL DEFAULT 1.0,
    preferred_voice TEXT,
    email_notifications BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for optimal performance
CREATE INDEX IF NOT EXISTS idx_palm_readings_user_id ON public.palm_readings(user_id);
CREATE INDEX IF NOT EXISTS idx_kundali_profiles_user_id ON public.kundali_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_kundali_reports_profile_id ON public.kundali_reports(kundali_profile_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id ON public.chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conv_id ON public.chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON public.activity_logs(user_id);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.palm_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.palm_analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kundali_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kundali_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can view and manage their own records
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own palm readings" ON public.palm_readings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own palm readings" ON public.palm_readings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own palm readings" ON public.palm_readings FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own palm results" ON public.palm_analysis_results FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.palm_readings pr WHERE pr.id = palm_reading_id AND pr.user_id = auth.uid())
);

CREATE POLICY "Users can view own kundali profiles" ON public.kundali_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own kundali profiles" ON public.kundali_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own kundali profiles" ON public.kundali_profiles FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own kundali reports" ON public.kundali_reports FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.kundali_profiles kp WHERE kp.id = kundali_profile_id AND kp.user_id = auth.uid())
);

CREATE POLICY "Users can view own chat conversations" ON public.chat_conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own chat conversations" ON public.chat_conversations FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own chat messages" ON public.chat_messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.chat_conversations cc WHERE cc.id = conversation_id AND cc.user_id = auth.uid())
);
CREATE POLICY "Users can insert own chat messages" ON public.chat_messages FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.chat_conversations cc WHERE cc.id = conversation_id AND cc.user_id = auth.uid())
);

CREATE POLICY "Users can view own preferences" ON public.user_preferences FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own generated reports" ON public.generated_reports FOR ALL USING (auth.uid() = user_id);

-- Admins can view everything
CREATE POLICY "Admins have full access to profiles" ON public.profiles FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);
