"use client";

import {
  PUBLIC_STALL_STATUSES,
  STALL_STATUS_LABELS
} from "@/lib/public-stalls";
import type { StallStatus } from "@/types/stall";

type StallFiltersProps = {
  locationQuery: string;
  sanitaryStatus: StallStatus | "all";
  onLocationQueryChange: (value: string) => void;
  onSanitaryStatusChange: (value: StallStatus | "all") => void;
  onClear: () => void;
};

export function StallFilters({
  locationQuery,
  sanitaryStatus,
  onLocationQueryChange,
  onSanitaryStatusChange,
  onClear
}: StallFiltersProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[1fr_260px_auto] lg:items-end">
        <label className="block text-sm font-medium text-slate-700">
          Ubicacion o distrito
          <input
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sanitary-green focus:ring-2 focus:ring-sanitary-green/20"
            onChange={(event) => onLocationQueryChange(event.target.value)}
            placeholder="Mercado, avenida o distrito"
            type="search"
            value={locationQuery}
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Estado sanitario
          <select
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sanitary-green focus:ring-2 focus:ring-sanitary-green/20"
            onChange={(event) =>
              onSanitaryStatusChange(event.target.value as StallStatus | "all")
            }
            value={sanitaryStatus}
          >
            <option value="all">Todos los visibles</option>
            {PUBLIC_STALL_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STALL_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </label>

        <button
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sanitary-green hover:text-sanitary-green"
          onClick={onClear}
          type="button"
        >
          Limpiar filtros
        </button>
      </div>
    </section>
  );
}
