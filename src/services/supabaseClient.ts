/**
 * Techlink Assist - Supabase Client Bridge
 * 
 * Provides connectivity to the owner's Supabase PostgreSQL backend
 * when configured via .env variables:
 * - VITE_SUPABASE_URL
 * - VITE_SUPABASE_ANON_KEY
 */

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  url: string | null;
  mode: 'supabase_connected' | 'local_persistent_store';
}

export const getSupabaseStatus = (): SupabaseConfigStatus => {
  const url = import.meta.env.VITE_SUPABASE_URL || null;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY || null;

  const isConfigured = Boolean(url && key && url !== 'https://your-project.supabase.co');

  return {
    isConfigured,
    url: isConfigured ? url : null,
    mode: isConfigured ? 'supabase_connected' : 'local_persistent_store',
  };
};
