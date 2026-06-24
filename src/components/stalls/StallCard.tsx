"use client";

import Link from "next/link";
import {
  STALL_STATUS_LABELS
} from "@/lib/public-stalls";
import {
  LICENSE_STATUS_LABELS
} from "@/lib/licenses";
import type { PublicStall } from "@/types/stall";

type StallCardProps = {
  stall: PublicStall;
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

export function StallCard({ stall }: StallCardProps) {
  const license = stall.licenses[0];

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-sanitary-ink">
            {stall.name}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {stall.location_reference}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            {stall.district}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <span
            className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${SANITARY_STATUS_CLASSES[stall.sanitary_status]}`}
          >
            {STALL_STATUS_LABELS[stall.sanitary_status]}
          </span>
          {license ? (
            <span
              className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${LICENSE_STATUS_CLASSES[license.status]}`}
            >
              Licencia {LICENSE_STATUS_LABELS[license.status]}
            </span>
          ) : (
            <span className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
              Sin licencia visible
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Actualizado: {formatDate(stall.updated_at)}
        </p>
        <Link
          className="inline-flex rounded-md bg-sanitary-green px-3 py-2 text-sm font-semibold text-white transition hover:bg-sanitary-ink"
          href={`/stalls/${stall.id}`}
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
