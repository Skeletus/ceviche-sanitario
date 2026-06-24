import type { Session, User } from "@supabase/supabase-js";
import { hasRole, isUserRole } from "@/lib/roles";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type { AuthenticatedProfile, Profile, UserRole } from "@/types/auth";

type RawProfile = Omit<Profile, "role"> & {
  role: string;
};

export class AuthError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured || !supabase) {
    throw new AuthError("Supabase no esta configurado.", 500);
  }

  return supabase;
}

export async function getCurrentSession(): Promise<Session | null> {
  const client = getSupabaseClient();
  const { data, error } = await client.auth.getSession();

  if (error) {
    throw new AuthError(error.message, 401);
  }

  return data.session;
}

async function findProfileByUser(user: User): Promise<Profile | null> {
  const client = getSupabaseClient();
  const profileFields = "id, auth_user_id, full_name, email, role, is_active";

  const byAuthUser = await client
    .from("profiles")
    .select(profileFields)
    .eq("auth_user_id", user.id)
    .maybeSingle<RawProfile>();

  if (byAuthUser.error) {
    throw new AuthError(byAuthUser.error.message, 500);
  }

  const profile = byAuthUser.data ?? (await findProfileByEmail(user.email));

  if (!profile) {
    return null;
  }

  if (!isUserRole(profile.role)) {
    throw new AuthError("El perfil tiene un rol no reconocido.", 403);
  }

  if (!profile.is_active) {
    throw new AuthError("El perfil del usuario esta inactivo.", 403);
  }

  return {
    ...profile,
    role: profile.role
  };
}

async function findProfileByEmail(email?: string): Promise<RawProfile | null> {
  if (!email) {
    return null;
  }

  const client = getSupabaseClient();
  const { data, error } = await client
    .from("profiles")
    .select("id, auth_user_id, full_name, email, role, is_active")
    .eq("email", email)
    .maybeSingle<RawProfile>();

  if (error) {
    throw new AuthError(error.message, 500);
  }

  return data;
}

export async function getCurrentProfile(
  session?: Session | null
): Promise<AuthenticatedProfile> {
  const currentSession = session ?? (await getCurrentSession());

  if (!currentSession?.user) {
    throw new AuthError("No hay una sesion autenticada.", 401);
  }

  const profile = await findProfileByUser(currentSession.user);

  if (!profile) {
    throw new AuthError("No se encontro un perfil asociado al usuario.", 404);
  }

  return {
    profile,
    email: currentSession.user.email ?? profile.email
  };
}

export function getBearerToken(headers: Headers) {
  const authorization = headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length);
}

export async function requireAuth(accessToken?: string | null) {
  const client = getSupabaseClient();

  if (accessToken) {
    const { data, error } = await client.auth.getUser(accessToken);

    if (error || !data.user) {
      throw new AuthError("Token de sesion invalido o expirado.", 401);
    }

    const profile = await findProfileByUser(data.user);

    if (!profile) {
      throw new AuthError("No se encontro un perfil asociado al usuario.", 404);
    }

    return {
      user: data.user,
      profile
    };
  }

  const session = await getCurrentSession();

  if (!session?.user) {
    throw new AuthError("No hay una sesion autenticada.", 401);
  }

  const profile = await findProfileByUser(session.user);

  if (!profile) {
    throw new AuthError("No se encontro un perfil asociado al usuario.", 404);
  }

  return {
    user: session.user,
    profile
  };
}

export async function requireRole(
  allowedRoles: readonly UserRole[],
  accessToken?: string | null
) {
  const auth = await requireAuth(accessToken);

  if (!hasRole(auth.profile.role, allowedRoles)) {
    throw new AuthError("El rol autenticado no tiene permiso.", 403);
  }

  return auth;
}
