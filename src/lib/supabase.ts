import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    "Faltan variables de entorno de Supabase. Revisa tu archivo .env.local"
  );
}

// Cliente único, reutilizable en cualquier Server Component
export const supabase = createClient(url, key);
