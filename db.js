// db.js
import { createClient } from "@supabase/supabase-js";

const DB_URL = process.env.SUPABASE_URL;
const DB_KEY = process.env.SUPABASE_KEY;

if (!DB_URL || !DB_KEY) {
  throw new Error(
    "Supabase URL or KEY is not defined. Please set both environment variables."
  );
}

const supabase = createClient(DB_URL, DB_KEY);
console.log(`[database]: connected to Supabase`);

export { supabase };
