import { createClient } from "@supabase/supabase-js/dist/index.cjs";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default supabase;