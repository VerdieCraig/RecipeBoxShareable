import { useEffect, useState } from 'react';
import { supabase } from './supabase';


export function useAuth() {
const [session, setSession] = useState<Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session'] | null>(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
supabase.auth.getSession().then(({ data }) => { setSession(data.session ?? null); setLoading(false); });
const { data: sub } = supabase.auth.onAuthStateChange((_evt, sess) => setSession(sess));
return () => sub.subscription.unsubscribe();
}, []);


return { session, loading };
}