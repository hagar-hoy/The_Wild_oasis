import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qhxlwihazoqljmgyeawh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoeGx3aWhhem9xbGptZ3llYXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MjEwMjMsImV4cCI6MjEwNTk5NzAyM30.3tWcqgF9jms642qFgKLWz0OwaGrSWhoJBDdcxlVfCx0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
