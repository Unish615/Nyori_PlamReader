# Nyoria चिना 🌟
### AI Palm Reading & Vedic Kundali Platform
> **English Tagline:** Discover What Your Hands Reveal.  
> **Nepali Tagline:** आफ्नो हातका रेखाहरूबाट परम्परागत व्याख्या जान्नुहोस्।

---

## Overview

**Nyoria चिना** is a full-stack, production-ready AI platform uniting traditional Vedic Astrology (ज्योतिष शास्त्र), canonical Palmistry (हस्तरेखा शास्त्र), voice recognition, text-to-speech (TTS), and modern computer vision.

The entire web application supports both **नेपाली (Nepali)** and **English** with persistent bilingual switching and zero-compromise localization.

---

## Key Features

1. **AI Palm Reading (हस्तरेखा परीक्षण)**
   - Upload image (JPG, PNG, WEBP up to 10 MB) or live webcam capture
   - Left-hand / Right-hand distinction (Destiny vs Active Karma)
   - Image quality validation (detects blur, inadequate lighting, hand presence)
   - Line detection: Life Line, Head Line, Heart Line, Fate Line, Sun Line, Marriage Lines, and Mounts
   - Interactive SVG palm line overlay with line selector tooltips
   - Structured traditional Vedic interpretations (Career, Love, Wealth, Strengths, Caution)

2. **Vedic Kundali Generation (मेरो कुण्डली)**
   - Collects Full Name, Nepali Naming Ceremony Name (न्वारनको नाम), Date of Birth, Time of Birth, District, City, and Exact Birthplace
   - Built-in coordinates dataset covering all 77 districts and major cities of Nepal
   - Deterministic astronomical calculation engine using **Lahiri Sidereal Ayanamsa (Chitra Paksha)**
   - Calculates Lagna, Rashi, Nakshatra, Pada, Tithi, Yoga, Karana, and exact planetary coordinates
   - SVG North Indian Diamond Chart (Lagna D-1 & Navamsa D-9)
   - Complete 120-year **Vimshottari Dasha** timeline with currently running Maha Dasha and Antardasha
   - Manglik Dosha analysis with classical Vedic cancellation rules
   - Traditional Yogas detection (Gajakesari, Budhaditya, Pancha Mahapurusha Yogas)

3. **AI Voice & Text Assistant (AI सहायक)**
   - Real-time voice input via Web Speech Recognition (`ne-NP` and `en-US`)
   - Text chat with follow-up questions and Vedic knowledge retrieval
   - Text-to-speech audio reader with play, pause, resume, stop, and speed control

4. **Multi-page PDF Export**
   - Instant client and server export of comprehensive reports in Nepali and English with authentic branding

5. **User & Admin Dashboards**
   - User Dashboard: saved readings, recent activity, metrics, profile settings
   - Admin Panel: user management, request metrics, system health logs

---

## Technology Stack

- **Frontend:** Next.js (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion, jsPDF & html2canvas
- **Backend:** Node.js, Express.js, TypeScript, Multer, Helmet, Rate Limiter, Zod
- **Database:** Supabase PostgreSQL, Row Level Security (RLS) policies, plus built-in zero-config store
- **AI & Speech:** Google Gemini Vision & Generative AI, Web Speech Recognition & SpeechSynthesis APIs

---

## Quick Start

### 1. Start Backend API
```bash
cd backend
npm install
npm run build
npm start
# API starts at http://localhost:5001
```

### 2. Start Frontend Web App
```bash
cd frontend
npm install
npm run dev
# Web app starts at http://localhost:3000
```

---

## Project Structure

```
Nyoria चिना/
├── backend/
│   ├── src/
│   │   ├── config/          # Environment & Supabase config
│   │   ├── controllers/     # Auth, Kundali, Palm, Assistant, User, Reports, Admin
│   │   ├── middleware/      # Auth, RateLimiter, ErrorHandler
│   │   ├── routes/          # Express REST routes
│   │   ├── services/        # Business logic & persistence
│   │   ├── utils/           # Astronomy engine, Palm analyzer, Nepal 77 districts
│   │   └── index.ts         # Server entry point
│   └── package.json
│
├── frontend/
│   ├── app/                 # Next.js App Router (18 static routes)
│   ├── components/          # Navbar, Footer, KundaliChart, PalmOverlay, AudioToolbar
│   ├── contexts/            # LanguageContext, AuthContext, ThemeContext
│   ├── locales/             # English (en) & authentic Nepali (ne) translation dictionaries
│   ├── lib/                 # PDF export & utilities
│   └── package.json
│
├── database/
│   ├── migrations/          # 001_initial_schema.sql (10 tables, RLS, indexes)
│   └── seed/                # 002_seed.sql
│
├── docs/
│   ├── api-documentation/   # Complete REST endpoint specs
│   └── setup-guide/         # Step-by-step installation instructions
│
├── .env.example
└── README.md
```

---

## License & Cultural Disclaimer
Palmistry and Kundali interpretations reflect traditional symbolic and cultural Vedic systems meant for educational and self-reflective awareness.
