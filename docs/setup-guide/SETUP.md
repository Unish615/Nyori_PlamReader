# Nyoria चिना - Installation & Setup Guide

## Prerequisites
- Node.js (v18+ or v20+ or v26+)
- npm or pnpm
- Git

---

## 1. Clone & Directory Navigation
```bash
cd "Nyoria चिना"
```

---

## 2. Backend Setup
```bash
cd backend
npm install
npm run build
npm start
```
The backend server runs on `http://localhost:5001`.

### Environment Configuration (`backend/.env`)
```env
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-spiritual-key

# Optional: Add your Google Gemini API key for live AI vision
GEMINI_API_KEY=your-gemini-key

# Optional: Add your Supabase project keys
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Open your browser at:
`http://localhost:3000`

---

## 4. Supabase Database Migration (Optional for Cloud)
Run the SQL migration in your Supabase SQL Editor:
- `database/migrations/001_initial_schema.sql`
- `database/seed/seed.sql`

*Note: The platform features an intelligent zero-config local memory engine that automatically provides functional database storage out of the box.*
