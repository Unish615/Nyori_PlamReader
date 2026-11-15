import { en } from './en';
import { ne } from './ne';

export const translations = {
  en,
  ne
};

export type Language = 'en' | 'ne';
export type TranslationType = typeof en;
