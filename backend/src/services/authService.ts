import { store, UserRecord } from './store.js';
import { supabase } from '../config/supabase.js';

export class AuthService {
  static async register(data: {
    email: string;
    password?: string;
    fullName: string;
    nwaranName?: string;
    dateOfBirth?: string;
    timeOfBirth?: string;
    gender?: string;
    country?: string;
    district?: string;
    city?: string;
    birthplace?: string;
    preferredLanguage?: 'en' | 'ne';
  }) {
    // If live Supabase is active, register there
    if (supabase) {
      const { data: authData, error: authErr } = await supabase.auth.signUp({
        email: data.email,
        password: data.password || 'TemporaryPassword123!'
      });

      if (authErr) throw new Error(authErr.message);

      const userId = authData.user?.id;
      if (userId) {
        await supabase.from('profiles').insert({
          id: userId,
          email: data.email,
          full_name: data.fullName,
          nwaran_name: data.nwaranName,
          date_of_birth: data.dateOfBirth,
          time_of_birth: data.timeOfBirth,
          gender: data.gender || 'unspecified',
          country: data.country || 'Nepal',
          district: data.district,
          city: data.city,
          birthplace: data.birthplace,
          preferred_language: data.preferredLanguage || 'ne',
          role: 'user'
        });
        return { id: userId, email: data.email, fullName: data.fullName, role: 'user', preferredLanguage: data.preferredLanguage || 'ne' };
      }
    }

    // Fallback in-memory
    const existing = Array.from(store.users.values()).find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const newUser: UserRecord = {
      id: `usr-${Date.now()}`,
      email: data.email,
      passwordHash: data.password || 'demo1234',
      fullName: data.fullName,
      nwaranName: data.nwaranName,
      dateOfBirth: data.dateOfBirth,
      timeOfBirth: data.timeOfBirth,
      gender: data.gender || 'unspecified',
      country: data.country || 'Nepal',
      district: data.district,
      city: data.city,
      birthplace: data.birthplace,
      role: 'user',
      preferredLanguage: data.preferredLanguage || 'ne',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.users.set(newUser.id, newUser);
    store.logActivity(newUser.id, 'USER_REGISTERED', { email: data.email });

    return {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      nwaranName: newUser.nwaranName,
      role: newUser.role,
      preferredLanguage: newUser.preferredLanguage
    };
  }

  static async login(email: string, password?: string) {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: password || 'demo1234'
      });
      if (error) throw new Error(error.message);
      return data;
    }

    const user = Array.from(store.users.values()).find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      // Auto-create or return demo user if matches demo credentials
      if (email.toLowerCase().includes('demo')) {
        const demo = store.users.get('usr-demo-01')!;
        return { user: demo, token: 'demo-jwt-token' };
      }
      throw new Error('Invalid email or credentials.');
    }

    store.logActivity(user.id, 'USER_LOGGED_IN', { email });
    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        nwaranName: user.nwaranName,
        dateOfBirth: user.dateOfBirth,
        timeOfBirth: user.timeOfBirth,
        gender: user.gender,
        district: user.district,
        city: user.city,
        birthplace: user.birthplace,
        role: user.role,
        preferredLanguage: user.preferredLanguage
      },
      token: `jwt-${user.id}-${Date.now()}`
    };
  }

  static async getProfile(userId: string) {
    if (supabase) {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (!error && data) return data;
    }
    const user = store.users.get(userId) || store.users.get('usr-demo-01');
    return user;
  }

  static async updateProfile(userId: string, updates: Partial<UserRecord>) {
    const user = store.users.get(userId) || store.users.get('usr-demo-01');
    if (!user) throw new Error('User not found');

    const updated = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    store.users.set(user.id, updated);
    store.logActivity(user.id, 'PROFILE_UPDATED', updates);
    return updated;
  }
}
