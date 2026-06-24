"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { VendorRegistrationForm } from "@/components/vendor/VendorRegistrationForm";
import type { UserRole } from "@/types/auth";

const VENDOR_ONLY: readonly UserRole[] = ["vendor"];

export default function VendorRegisterPage() {
  return (
    <ProtectedRoute allowedRoles={VENDOR_ONLY}>
      {({ profile }) => (
        <main className="min-h-screen bg-[#f7faf7] text-sanitary-ink">
          <AppNavbar profile={profile} />

          <section className="mx-auto w-full max-w-4xl px-6 py-8 sm:px-8 lg:px-10">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
                HU06
              </p>
              <h1 className="mt-3 text-3xl font-bold">
                Mis datos de vendedor
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Registra tus datos de identificacion y contacto para iniciar el
                proceso de formalizacion sanitaria.
              </p>
            </div>

            <VendorRegistrationForm profile={profile} />
          </section>
        </main>
      )}
    </ProtectedRoute>
  );
}
