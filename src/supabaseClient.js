import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://udrftsnbnkpgnhdabqnt.supabase.co'; 
const supabaseKey = 'sb_publishable_i7TA532L30Cdr2eyZT9N7w_T8JM2wSd'; 

export const supabase = createClient(supabaseUrl, supabaseKey);