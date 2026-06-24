"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { getStallsByVendorId } from "@/lib/stalls";
import { getVendorByProfileId } from "@/lib/vendors";
import type { Stall, StallStatus } from "@/types/stall";
import type { UserRole } from "@/types/auth";
import type { Vendor } from "@/types/vendor";

const VENDOR_ONLY: readonly UserRole[] = ["vendor"];

const STATUS_LABELS: Record<StallStatus, string> = {
  pending: "Pendiente",
  authorized: "Autorizado",
  observed: "Observado",
  suspended: "Suspendido",
  closed: "Cerrado"
};

const STATUS_CLASSES: Record<StallStatus, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  authorized: "border-emerald-200 bg-emerald-50 text-emerald-800",
  observed: "border-orange-200 bg-orange-50 text-orange-800",
  suspended: "border-red-200 bg-red-50 text-red-800",
  closed: "border-slate-200 bg-slate-100 text-slate-700"
};

function formatDate(value?: string) {
  if (!value) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(value));
}

function StatusBadge({ status }: { status: StallStatus }) {
  return (
    <span
      className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${STATUS_CLASSES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function VendorStallsContent({ profileId }: { profileId: string }) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadStalls() {
      try {
        const currentVendor = await getVendorByProfileId(profileId);

        if (!isMounted) {
          return;
        }

        setVendor(currentVendor);

        if (!currentVendor) {
          return;
        }

        const vendorStalls = await getStallsByVendorId(currentVendor.id);

        if (!isMounted) {
          return;
        }

        setStalls(vendorStalls);
      } catch {
        if (!isMounted) {
          return;
        }

        setErrorMessage("No se pudo cargar el listado de puestos.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadStalls();

    return () => {
      isMounted = false;
    };
  }, [profileId]);

  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Consultando puestos...</p>
      </section>
    );
  }

  if (!vendor) {
    return (
      <section className="rounded-lg border border-amber-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
          Registro pendiente
        </p>
        <h2 className="mt-3 text-2xl font-bold">
          Primero debes registrar tus datos de vendedor
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Completa tus datos de vendedor para poder registrar y consultar tus
          puestos ambulantes.
        </p>
        <Link
          className="mt-6 inline-flex rounded-md bg-sanitary-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-sanitary-ink"
          href="/vendor/register"
        >
          Registrar mis datos
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
            Mis puestos
          </p>
          <h2 className="mt-3 text-2xl font-bold text-sanitary-ink">
            Puestos registrados
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Consulta los puestos asociados a tu registro de vendedor.
          </p>
        </div>

        <Link
          className="inline-flex rounded-md bg-sanitary-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-sanitary-ink"
          href="/vendor/stalls/new"
        >
          Registrar nuevo puesto
        </Link>
      </div>

      {errorMessage ? (
        <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMessage}
        </div>
      ) : null}

      {stalls.length === 0 ? (
        <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-600">
          Aun no tienes puestos registrados.
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
          <div className="grid grid-cols-1 divide-y divide-slate-200">
            {stalls.map((stall) => (
              <article className="p-4" key={stall.id}>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-sanitary-ink">
                      {stall.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {stall.location_reference}
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {stall.district}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-sm lg:justify-end">
                    <StatusBadge status={stall.sanitary_status} />
                    <span className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {stall.is_public ? "Publico" : "No publico"}
                    </span>
                    <span className="inline-flex rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {formatDate(stall.created_at)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default function VendorStallsPage() {
  return (
    <ProtectedRoute allowedRoles={VENDOR_ONLY}>
      {({ profile }) => (
        <main className="min-h-screen bg-[#f7faf7] text-sanitary-ink">
          <AppNavbar profile={profile} />

          <section className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8 lg:px-10">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
                HU07
              </p>
              <h1 className="mt-3 text-3xl font-bold">
                Puestos del vendedor
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Revisa los puestos ambulantes vinculados a tu registro de
                vendedor.
              </p>
            </div>

            <VendorStallsContent profileId={profile.id} />
          </section>
        </main>
      )}
    </ProtectedRoute>
  );
}
