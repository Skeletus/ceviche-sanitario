"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { getRoleLabel } from "@/lib/roles";
import { getVendorByProfileId } from "@/lib/vendors";
import type { UserRole } from "@/types/auth";
import type { Vendor } from "@/types/vendor";

const VENDOR_ONLY: readonly UserRole[] = ["vendor"];

function VendorDashboardContent({
  profile
}: {
  profile: {
    id: string;
    full_name: string;
    email: string;
    role: UserRole;
  };
}) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadVendor() {
      try {
        const currentVendor = await getVendorByProfileId(profile.id);

        if (!isMounted) {
          return;
        }

        setVendor(currentVendor);
      } catch {
        if (!isMounted) {
          return;
        }

        setErrorMessage("No se pudo consultar el estado del vendedor.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadVendor();

    return () => {
      isMounted = false;
    };
  }, [profile.id]);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
            Panel de vendedor
          </p>
          <h1 className="mt-3 text-3xl font-bold">
            Bienvenido, {profile.full_name}
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-700">
            Desde esta vista puedes revisar tus datos de vendedor y acceder a
            los siguientes pasos del proceso sanitario.
          </p>
        </section>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Perfil autenticado</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-slate-500">Correo</dt>
              <dd className="mt-1 text-slate-800">{profile.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Rol</dt>
              <dd className="mt-1 text-slate-800">
                {getRoleLabel(profile.role)}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      {errorMessage ? (
        <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMessage}
        </div>
      ) : null}

      <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Estado del registro</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {isLoading
                ? "Consultando datos registrados..."
                : vendor
                  ? "Tus datos de vendedor ya estan registrados."
                  : "No hay datos de vendedor registrados por el momento."}
            </p>
          </div>

          <Link
            className="inline-flex rounded-md bg-sanitary-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-sanitary-ink"
            href="/vendor/register"
          >
            {vendor ? "Ver mis datos" : "Registrar datos"}
          </Link>
        </div>

        {vendor ? (
          <dl className="mt-6 grid gap-4 text-sm md:grid-cols-3">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <dt className="font-medium text-slate-500">Documento</dt>
              <dd className="mt-1 font-semibold text-slate-800">
                {vendor.document_number}
              </dd>
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <dt className="font-medium text-slate-500">Telefono</dt>
              <dd className="mt-1 font-semibold text-slate-800">
                {vendor.phone}
              </dd>
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <dt className="font-medium text-slate-500">Direccion</dt>
              <dd className="mt-1 font-semibold text-slate-800">
                {vendor.address}
              </dd>
            </div>
          </dl>
        ) : null}
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Mis puestos</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Consulta los puestos ambulantes asociados a tu registro.
          </p>
          <Link
            className="mt-4 inline-flex rounded-md bg-sanitary-green px-3 py-2 text-sm font-semibold text-white transition hover:bg-sanitary-ink"
            href="/dashboard/vendor/stalls"
          >
            Ver puestos
          </Link>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Registrar puesto</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Agrega un puesto ambulante para evaluacion municipal.
          </p>
          <Link
            className="mt-4 inline-flex rounded-md bg-sanitary-green px-3 py-2 text-sm font-semibold text-white transition hover:bg-sanitary-ink"
            href="/vendor/stalls/new"
          >
            Registrar puesto
          </Link>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Mis licencias</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Revisa las licencias municipales de tus puestos.
          </p>
          <Link
            className="mt-4 inline-flex rounded-md bg-sanitary-green px-3 py-2 text-sm font-semibold text-white transition hover:bg-sanitary-ink"
            href="/dashboard/vendor/licenses"
          >
            Ver licencias
          </Link>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Actualizar licencia</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Registra o actualiza la licencia municipal de un puesto.
          </p>
          <Link
            className="mt-4 inline-flex rounded-md bg-sanitary-green px-3 py-2 text-sm font-semibold text-white transition hover:bg-sanitary-ink"
            href="/vendor/licenses"
          >
            Actualizar licencia
          </Link>
        </article>
      </section>
    </section>
  );
}

export default function VendorDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={VENDOR_ONLY}>
      {({ profile }) => (
        <main className="min-h-screen bg-[#f7faf7] text-sanitary-ink">
          <AppNavbar profile={profile} />
          <VendorDashboardContent profile={profile} />
        </main>
      )}
    </ProtectedRoute>
  );
}
