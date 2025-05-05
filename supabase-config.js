import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// Supabase Konfiguration
const supabaseUrl = 'https://wgfdtcjdeiuuaridxfct.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnZmR0Y2pkZWl1dWFyaWR4ZmN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MTEzOTcsImV4cCI6MjA2MTk4NzM5N30.5l7lFKATCMVIPjEqfjopZ90gSk9eF6zHooV7-ejhtpg'
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }; 