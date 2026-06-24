"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LICENSE_STATUS_LABELS } from "@/lib/licenses";
import {
  STALL_STATUS_LABELS,
  getPublicStallById
} from "@/lib/public-stalls";
import type { PublicStall } from "@/types/stall";

type StallDetailProps = {
  stallId: string;
};

const SANITARY_STATUS_CLASSES = {
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  authorized: "border-emerald-200 bg-emerald-50 text-emerald-800",
  observed: "border-orange-200 bg-orange-50 text-orange-800",
  suspended: "border-red-200 bg-red-50 text-red-800",
  closed: "border-slate-200 bg-slate-100 text-slate-700"
};

const LICENSE_STATUS_CLASSES = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-800",
  expired: "border-amber-200 bg-amber-50 text-amber-800",
  revoked: "border-red-200 bg-red-50 text-red-800"
};

function formatDate(value?: string | null) {
  if (!value) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(value));
}

export function StallDetail({ stallId }: StallDetailProps) {
  const [stall, setStall] = useState<PublicStall | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadStall() {
      try {
        const currentStall = await getPublicStallById(stallId);

        if (!isMounted) {
          return;
        }

        setStall(currentStall);
      } catch {
        if (!isMounted) {
          return;
        }

        setErrorMessage("No se pudo cargar el detalle sanitario del puesto.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadStall();

    return () => {
      isMounted = false;
    };
  }, [stallId]);

  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Cargando detalle sanitario...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-700">
          Error de consulta
        </p>
        <h1 className="mt-3 text-2xl font-bold text-sanitary-ink">
          No se pudo cargar el detalle
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {errorMessage}
        </p>
        <Link
          className="mt-6 inline-flex rounded-md bg-sanitary-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-sanitary-ink"
          href="/stalls"
        >
          Volver al listado
        </Link>
      </section>
    );
  }

  if (!stall) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-sanitary-ink">
          Puesto no disponible
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          El puesto no existe, no esta publicado o no tiene estado autorizado.
        </p>
        <Link
          className="mt-6 inline-flex rounded-md bg-sanitary-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-sanitary-ink"
          href="/stalls"
        >
          Volver al listado
        </Link>
      </section>
    );
  }

  const license = stall.licenses[0];

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
            Detalle sanitario
          </p>
          <h1 className="mt-3 text-3xl font-bold text-sanitary-ink">
            {stall.name}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {stall.location_reference}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            {stall.district}
          </p>
        </div>

        <span
          className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${SANITARY_STATUS_CLASSES[stall.sanitary_status]}`}
        >
          {STALL_STATUS_LABELS[stall.sanitary_status]}
        </span>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-lg font-semibold text-sanitary-ink">
            Ubicacion
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-slate-500">Referencia</dt>
              <dd className="mt-1 text-slate-800">
                {stall.location_reference}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Distrito</dt>
              <dd className="mt-1 text-slate-800">{stall.district}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">
                Ultima actualizacion
              </dt>
              <dd className="mt-1 text-slate-800">
                {formatDate(stall.updated_at)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-lg font-semibold text-sanitary-ink">
            Licencia municipal
          </h2>
          {license ? (
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-medium text-slate-500">Numero</dt>
                <dd className="mt-1 text-slate-800">
                  {license.license_number}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Emision</dt>
                <dd className="mt-1 text-slate-800">
                  {formatDate(license.issued_at)}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Vencimiento</dt>
                <dd className="mt-1 text-slate-800">
                  {formatDate(license.expires_at)}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Estado</dt>
                <dd className="mt-2">
                  <span
                    className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${LICENSE_STATUS_CLASSES[license.status]}`}
                  >
                    {LICENSE_STATUS_LABELS[license.status]}
                  </span>
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-4 text-sm leading-6 text-slate-600">
              No hay licencia municipal visible para este puesto.
            </p>
          )}
        </div>
      </section>

      {!license ? (
        <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          No existe informacion sanitaria suficiente para confirmar licencia
          municipal publicada.
        </div>
      ) : null}

      <Link
        className="mt-8 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sanitary-green hover:text-sanitary-green"
        href="/stalls"
      >
        Volver al listado
      </Link>
    </article>
  );
}
