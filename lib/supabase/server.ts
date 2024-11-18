import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { supabaseConfig } from './config';
import type { Database } from './schema';

export function createServerClient() {
  return createClient<Database>(
    supabaseConfig.url,
    supabaseConfig.anonKey,
    {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value;
        },
      },
    }
  );
}