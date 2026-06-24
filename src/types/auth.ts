export type UserRole = "citizen" | "vendor" | "inspector" | "admin";

export type Profile = {
  id: string;
  auth_user_id: string | null;
  full_name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
};

export type RoleMenuItem = {
  title: string;
  description: string;
  href?: string;
};

export type AuthenticatedProfile = {
  profile: Profile;
  email: string;
};
