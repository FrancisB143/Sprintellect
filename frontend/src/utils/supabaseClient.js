import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zgjojnmnstrsxtoiknwy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpnam9qbm1uc3Ryc3h0b2lrbnd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MjAyMjMsImV4cCI6MjA4ODI5NjIyM30.Durs9yOJfvRLEsxTqXxwtyaOWocvJ4cWeulW23Cgj2Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
