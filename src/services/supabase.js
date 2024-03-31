import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://aprthgulztsljuvimirz.supabase.co";
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABSE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseAuthUrl = "https://ptgevxelcojvdjvctirn.supabase.co";
const supabaseAuthKey = import.meta.env.VITE_REACT_APP_SUPABASE_AUTH_API_KEY;
export const supabaseAuth = createClient(supabaseAuthUrl, supabaseAuthKey);

export default supabase;
