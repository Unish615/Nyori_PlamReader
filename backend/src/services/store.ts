/**
 * In-Memory persistence layer
 * Provides robust zero-config database storage for local runs, testing, and fallback when Supabase is not configured.
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

export interface PalmRecord {
  id: string;
  userId: string;
  handType: 'left' | 'right';
  imageUrl: string;
  qualityStatus: string;
  analysis: any;
  createdAt: string;
}

export interface KundaliRecord {
  id: string;
  userId: string;
  profile: any;
  report: any;
  createdAt: string;
}

export interface ChatMessageRecord {
  id: string;
  conversationId: string;
  sender: 'user' | 'assistant';
  text: string;
  audioUrl?: string;
  createdAt: string;
}

export interface ChatConversationRecord {
  id: string;
  userId: string;
  title: string;
  language: 'en' | 'ne';
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLogRecord {
  id: string;
  userId: string;
  action: string;
  details: any;
  ipAddress?: string;
  createdAt: string;
}

class MemoryStore {
  users: Map<string, UserRecord> = new Map();
  palmReadings: Map<string, PalmRecord> = new Map();
  kundaliRecords: Map<string, KundaliRecord> = new Map();
  chatConversations: Map<string, ChatConversationRecord> = new Map();
  chatMessages: Map<string, ChatMessageRecord[]> = new Map();
  activityLogs: ActivityLogRecord[] = [];

  constructor() {
    // Seed standard demo users
    const demoUser: UserRecord = {
      id: 'usr-demo-01',
      email: 'demo@nyoriachina.com',
      passwordHash: 'demo1234',
      fullName: 'Sujan Sharma',
      nwaranName: 'शिव प्रसाद',
      dateOfBirth: '1996-05-14',
      timeOfBirth: '06:30',
      gender: 'male',
      country: 'Nepal',
      district: 'Kathmandu',
      city: 'Kathmandu',
      birthplace: 'Pashupatinath, Kathmandu',
      role: 'user',
      preferredLanguage: 'ne',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.set(demoUser.id, demoUser);

    const adminUser: UserRecord = {
      id: 'usr-admin-01',
      email: 'admin@nyoriachina.com',
      passwordHash: 'admin1234',
      fullName: 'Admin Jyotish',
      nwaranName: 'गुरुदेव',
      dateOfBirth: '1985-01-01',
      timeOfBirth: '12:00',
      gender: 'other',
      country: 'Nepal',
      district: 'Kathmandu',
      city: 'Kathmandu',
      birthplace: 'Kathmandu',
      role: 'admin',
      preferredLanguage: 'ne',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.set(adminUser.id, adminUser);
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
}

export const store = new MemoryStore();
