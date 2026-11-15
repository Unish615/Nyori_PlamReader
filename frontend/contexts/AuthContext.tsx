'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  fullName: string;
  nwaranName?: string;
  role: 'user' | 'admin';
  preferredLanguage?: 'en' | 'ne';
  dateOfBirth?: string;
  timeOfBirth?: string;
  district?: string;
  city?: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  logout: () => void;
  updateUser: (updated: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check saved session
    const savedUser = localStorage.getItem('nyoria_user');
    const savedToken = localStorage.getItem('nyoria_token');

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default initial mock demo user so user can explore immediately
      const defaultUser: User = {
        id: 'usr-demo-01',
        email: 'demo@nyoriachina.com',
        fullName: 'Sujan Sharma',
        nwaranName: 'शिव प्रसाद',
        role: 'user',
        preferredLanguage: 'ne',
        dateOfBirth: '1996-05-14',
        timeOfBirth: '06:30',
        district: 'Kathmandu',
        city: 'Kathmandu'
      };
      setUser(defaultUser);
      setToken('jwt-usr-demo-01');
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('nyoria_user', JSON.stringify(data.user));
        localStorage.setItem('nyoria_token', data.token);
        return true;
      }
    } catch (e) {
      console.warn('Backend login request fallback to offline login', e);
      const offlineUser: User = {
        id: `usr-${Date.now()}`,
        email,
        fullName: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'user',
        preferredLanguage: 'ne'
      };
      setUser(offlineUser);
      setToken('mock-token');
      localStorage.setItem('nyoria_user', JSON.stringify(offlineUser));
      localStorage.setItem('nyoria_token', 'mock-token');
      return true;
    }
    return false;
  };

  const register = async (formData: any): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setToken('jwt-registered-token');
        localStorage.setItem('nyoria_user', JSON.stringify(data.user));
        localStorage.setItem('nyoria_token', 'jwt-registered-token');
        return true;
      }
    } catch (e) {
      console.warn('Registration offline fallback', e);
      const offlineUser: User = {
        id: `usr-${Date.now()}`,
        email: formData.email,
        fullName: formData.fullName,
        nwaranName: formData.nwaranName,
        role: 'user',
        preferredLanguage: formData.preferredLanguage || 'ne'
      };
      setUser(offlineUser);
      setToken('mock-token');
      localStorage.setItem('nyoria_user', JSON.stringify(offlineUser));
      localStorage.setItem('nyoria_token', 'mock-token');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('nyoria_user');
    localStorage.removeItem('nyoria_token');
  };

  const updateUser = (updated: Partial<User>) => {
    if (!user) return;
    const merged = { ...user, ...updated };
    setUser(merged);
    localStorage.setItem('nyoria_user', JSON.stringify(merged));
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
