import { createClient } from '@/lib/supabase/server';

export interface AuthSession {
  user: {
    id: string;
    email: string;
    role: string;
    status: string;
    first_name: string | null;
    last_name: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

export async function getSession(): Promise<AuthSession | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return null;
  }

  return {
    user: {
      id: profile.id,
      email: profile.email,
      role: profile.role,
      status: profile.status,
      first_name: profile.first_name,
      last_name: profile.last_name,
      createdAt: new Date(profile.created_at),
      updatedAt: new Date(profile.updated_at),
    },
  };
}
