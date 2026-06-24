"use client";

import { useEffect, useMemo, useState } from "react";
import { getPublicAuthorizedStalls } from "@/lib/public-stalls";
import { StallCard } from "@/components/stalls/StallCard";
import { StallFilters } from "@/components/stalls/StallFilters";
import type { PublicStall, StallStatus } from "@/types/stall";

export function PublicStallList() {
  const [stalls, setStalls] = useState<PublicStall[]>([]);
  const [locationQuery, setLocationQuery] = useState("");
  const [sanitaryStatus, setSanitaryStatus] = useState<StallStatus | "all">(
    "all"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadStalls() {
      setErrorMessage("");

      try {
        const publicStalls = await getPublicAuthorizedStalls();

        if (!isMounted) {
          return;
        }

        setStalls(publicStalls);
      } catch {
        if (!isMounted) {
          return;
        }

        setErrorMessage("No se pudo cargar la lista de puestos autorizados.");
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
  }, []);

  const filteredStalls = useMemo(() => {
    const normalizedQuery = locationQuery.trim().toLowerCase();

    return stalls.filter((stall) => {
      const matchesLocation =
        !normalizedQuery ||
        stall.location_reference.toLowerCase().includes(normalizedQuery) ||
        stall.district.toLowerCase().includes(normalizedQuery);
      const matchesStatus =
        sanitaryStatus === "all" || stall.sanitary_status === sanitaryStatus;

      return matchesLocation && matchesStatus;
    });
  }, [locationQuery, sanitaryStatus, stalls]);

  function clearFilters() {
    setLocationQuery("");
    setSanitaryStatus("all");
  }

  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          Cargando puestos autorizados...
        </p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-700">
          Error de consulta
        </p>
        <h2 className="mt-3 text-2xl font-bold text-sanitary-ink">
          No se pudo cargar la informacion
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {errorMessage}
        </p>
      </section>
    );
  }

  return (
    <div className="grid gap-6">
      <StallFilters
        locationQuery={locationQuery}
        onClear={clearFilters}
        onLocationQueryChange={setLocationQuery}
        onSanitaryStatusChange={setSanitaryStatus}
        sanitaryStatus={sanitaryStatus}
      />

      <div className="flex flex-col gap-2 rounded-md border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-medium text-sanitary-ink">
          {filteredStalls.length} puestos visibles
        </span>
        <span>
          Se muestran unicamente registros publicados para consulta ciudadana.
        </span>
      </div>

      {stalls.length === 0 ? (
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-sanitary-ink">
            No hay puestos autorizados publicados
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Cuando la municipalidad autorice y publique puestos, apareceran en
            esta consulta ciudadana.
          </p>
        </section>
      ) : filteredStalls.length === 0 ? (
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-sanitary-ink">
            No se encontraron coincidencias
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Ajusta la ubicacion, distrito o estado sanitario para ampliar la
            busqueda.
          </p>
          <button
            className="mt-5 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sanitary-green hover:text-sanitary-green"
            onClick={clearFilters}
            type="button"
          >
            Limpiar filtros
          </button>
        </section>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredStalls.map((stall) => (
            <StallCard key={stall.id} stall={stall} />
          ))}
        </div>
      )}
    </div>
  );
}
