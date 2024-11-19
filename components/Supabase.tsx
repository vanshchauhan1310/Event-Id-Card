import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://aqszqiulptnilnieyteg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxc3pxaXVscHRuaWxuaWV5dGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwODUxMzMsImV4cCI6MjA0NjY2MTEzM30.3P-G1zklGcqKST9wUTPLdtYLQDCTBlNbwVnOkCT4_Ms';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});