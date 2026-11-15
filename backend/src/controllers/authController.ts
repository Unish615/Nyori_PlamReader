import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).optional(),
  fullName: z.string().min(2),
  nwaranName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  timeOfBirth: z.string().optional(),
  gender: z.string().optional(),
  country: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  birthplace: z.string().optional(),
  preferredLanguage: z.enum(['en', 'ne']).optional()
});

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const validated = registerSchema.parse(req.body);
      const user = await AuthService.register(validated);
      res.status(201).json({ success: true, user });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required.' });
      }
      const result = await AuthService.login(email, password);
      res.json({ success: true, ...result });
    } catch (err: any) {
      res.status(401).json({ success: false, error: err.message });
    }
  }

  static async logout(req: Request, res: Response) {
    res.json({ success: true, message: 'Logged out successfully.' });
  }

  static async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    res.json({
      success: true,
      message: `Password reset link sent to ${email || 'your registered email'}.`
    });
  }
}
