import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://cbpdizdmebasivufwuer.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNicGRpemRtZWJhc2l2dWZ3dWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NDkwODUsImV4cCI6MjAyNTAyNTA4NX0.5KkqZDo6pIg60zjDj5DxVeAXG6_ATMsyFtZ78aIeYG0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
