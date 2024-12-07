import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://awbjswgkzekltgpvfjjs.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3Ympzd2dremVrbHRncHZmampzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NjkxNTEsImV4cCI6MjA0OTE0NTE1MX0.A58wspkJTK06pVZtQ8Nth-Tdn4-P7YZJqsGEAZPkNg8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


