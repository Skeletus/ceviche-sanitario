"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthError, getCurrentProfile } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import type { AuthenticatedProfile, UserRole } from "@/types/auth";

type ProtectedRouteProps = {
  allowedRoles?: readonly UserRole[];
  children: (auth: AuthenticatedProfile) => React.ReactNode;
};

export function ProtectedRoute({
  allowedRoles,
  children
}: ProtectedRouteProps) {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthenticatedProfile | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const currentAuth = await getCurrentProfile();

        if (!isMounted) {
          return;
        }

        if (
          allowedRoles &&
          !hasRole(currentAuth.profile.role, allowedRoles)
        ) {
          router.replace("/unauthorized");
          return;
        }

        setAuth(currentAuth);
        setIsLoading(false);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        if (error instanceof AuthError) {
          if (error.status === 401) {
            router.replace("/login");
            return;
          }

          if (error.status === 403) {
            router.replace("/unauthorized");
            return;
          }

          setErrorMessage(error.message);
          setIsLoading(false);
          return;
        }

        setErrorMessage("No se pudo validar la sesion.");
        setIsLoading(false);
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [allowedRoles, router]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf7] px-6 text-sanitary-ink">
        <div className="rounded-lg border border-slate-200 bg-white px-5 py-4 text-sm shadow-sm">
          Validando sesion y permisos...
        </div>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf7] px-6">
        <section className="w-full max-w-lg rounded-lg border border-red-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-700">
            Perfil no disponible
          </p>
          <h1 className="mt-3 text-2xl font-bold text-sanitary-ink">
            No se pudo cargar el perfil
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {errorMessage}
          </p>
          <Link
            className="mt-6 inline-flex rounded-md bg-sanitary-green px-4 py-2 text-sm font-semibold text-white"
            href="/login"
          >
            Volver al login
          </Link>
        </section>
      </main>
    );
  }

  if (!auth) {
    return null;
  }

  return <>{children(auth)}</>;
}
