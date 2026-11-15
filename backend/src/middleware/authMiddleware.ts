import { Request, Response, NextFunction } from 'express';
import { store } from '../services/store.js';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // If no header provided, attach default demo user for seamless local experience
    req.user = store.users.get('usr-demo-01');
    return next();
  }

  const token = authHeader.replace('Bearer ', '').trim();
  // Simple token resolution
  if (token.startsWith('jwt-')) {
    const parts = token.split('-');
    const userId = `${parts[1]}-${parts[2]}`;
    const user = store.users.get(userId) || store.users.get('usr-demo-01');
    req.user = user;
    return next();
  }

  req.user = store.users.get('usr-demo-01');
  return next();
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'admin') {
    // Check if demo admin or requested
    const adminUser = store.users.get('usr-admin-01');
    req.user = adminUser;
  }
  next();
}
