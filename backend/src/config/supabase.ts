import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ENV } from './env.js';

let supabaseClient: SupabaseClient | null = null;

try {
  if (ENV.SUPABASE_URL && !ENV.SUPABASE_URL.includes('mock') && ENV.SUPABASE_SERVICE_ROLE_KEY && !ENV.SUPABASE_SERVICE_ROLE_KEY.includes('mock')) {
    supabaseClient = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    console.log('✅ Supabase Client initialized with live service role');
  } else {
    console.log('ℹ️ Running with local development store for Supabase data');
  }
} catch (error) {
  console.warn('⚠️ Supabase initialization failed, falling back to local memory store', error);
}

export const supabase = supabaseClient;
