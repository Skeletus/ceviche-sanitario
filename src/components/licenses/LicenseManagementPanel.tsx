"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LICENSE_STATUSES,
  LICENSE_STATUS_LABELS,
  getLicensesByVendorId,
  saveLicense
} from "@/lib/licenses";
import { getStallsByVendorId } from "@/lib/stalls";
import { getVendorByProfileId } from "@/lib/vendors";
import type { LicenseStatus, LicenseWithStall } from "@/types/license";
import type { Profile } from "@/types/auth";
import type { Stall } from "@/types/stall";
import type { Vendor } from "@/types/vendor";

type LicenseManagementPanelProps = {
  profile: Profile;
};

type FormErrors = {
  stall_id?: string;
  license_number?: string;
  expires_at?: string;
  issued_at?: string;
  status?: string;
};

const STATUS_CLASSES: Record<LicenseStatus, string> = {
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

function LicenseStatusBadge({ status }: { status: LicenseStatus }) {
  return (
    <span
      className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${STATUS_CLASSES[status]}`}
    >
      {LICENSE_STATUS_LABELS[status]}
    </span>
  );
}

export function LicenseManagementPanel({
  profile
}: LicenseManagementPanelProps) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [licenses, setLicenses] = useState<LicenseWithStall[]>([]);
  const [selectedStallId, setSelectedStallId] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [issuedAt, setIssuedAt] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [status, setStatus] = useState<LicenseStatus>("active");
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  function fillFormFromLicense(
    stallId: string,
    currentLicenses: LicenseWithStall[]
  ) {
    const currentLicense = currentLicenses.find(
      (license) => license.stall_id === stallId
    );

    if (!currentLicense) {
      setLicenseNumber("");
      setIssuedAt("");
      setExpiresAt("");
      setStatus("active");
      return;
    }

    setLicenseNumber(currentLicense.license_number);
    setIssuedAt(currentLicense.issued_at ?? "");
    setExpiresAt(currentLicense.expires_at);
    setStatus(currentLicense.status);
  }

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setErrorMessage("");

      try {
        const currentVendor = await getVendorByProfileId(profile.id);

        if (!isMounted) {
          return;
        }

        setVendor(currentVendor);

        if (!currentVendor) {
          return;
        }

        const [vendorStalls, vendorLicenses] = await Promise.all([
          getStallsByVendorId(currentVendor.id),
          getLicensesByVendorId(currentVendor.id)
        ]);

        if (!isMounted) {
          return;
        }

        setStalls(vendorStalls);
        setLicenses(vendorLicenses);

        if (vendorStalls.length > 0) {
          setSelectedStallId(vendorStalls[0].id);
          fillFormFromLicense(vendorStalls[0].id, vendorLicenses);
        }
      } catch {
        if (!isMounted) {
          return;
        }

        setErrorMessage("No se pudo cargar la informacion de licencias.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [profile.id]);

  function handleStallChange(stallId: string) {
    setSelectedStallId(stallId);
    setSuccessMessage("");
    setErrorMessage("");
    setErrors({});
    fillFormFromLicense(stallId, licenses);
  }

  function validateForm() {
    const nextErrors: FormErrors = {};

    if (!selectedStallId) {
      nextErrors.stall_id = "Selecciona un puesto.";
    }

    if (!licenseNumber.trim()) {
      nextErrors.license_number = "El numero de licencia es obligatorio.";
    }

    if (!expiresAt) {
      nextErrors.expires_at = "La fecha de vencimiento es obligatoria.";
    }

    if (issuedAt && expiresAt && issuedAt > expiresAt) {
      nextErrors.issued_at =
        "La fecha de emision no puede ser posterior al vencimiento.";
    }

    if (!LICENSE_STATUSES.includes(status)) {
      nextErrors.status = "Selecciona un estado de licencia valido.";
    }

    if (!stalls.some((stall) => stall.id === selectedStallId)) {
      nextErrors.stall_id = "El puesto seleccionado no pertenece al vendedor.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!vendor) {
      setErrorMessage("Primero debes registrar tus datos de vendedor.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const alreadyExists = licenses.some(
      (license) => license.stall_id === selectedStallId
    );

    setIsSaving(true);

    try {
      await saveLicense({
        stall_id: selectedStallId,
        license_number: licenseNumber,
        issued_at: issuedAt || null,
        expires_at: expiresAt,
        status
      });

      const updatedLicenses = await getLicensesByVendorId(vendor.id);
      setLicenses(updatedLicenses);
      fillFormFromLicense(selectedStallId, updatedLicenses);
      setSuccessMessage(
        alreadyExists
          ? "Licencia actualizada correctamente."
          : "Licencia registrada correctamente."
      );
    } catch {
      setErrorMessage(
        "No se pudo guardar la licencia. Revisa los datos e intenta nuevamente."
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          Cargando datos de licencias...
        </p>
      </section>
    );
  }

  if (!vendor) {
    return (
      <section className="rounded-lg border border-amber-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
          Registro pendiente
        </p>
        <h2 className="mt-3 text-2xl font-bold text-sanitary-ink">
          Primero debes registrar tus datos de vendedor
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          La licencia municipal se asocia a puestos de un vendedor registrado.
          Completa primero tus datos de identificacion para continuar.
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

  if (stalls.length === 0) {
    return (
      <section className="rounded-lg border border-amber-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
          Puesto requerido
        </p>
        <h2 className="mt-3 text-2xl font-bold text-sanitary-ink">
          Primero debes registrar un puesto antes de cargar una licencia
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Cuando tengas al menos un puesto registrado, podras cargar o actualizar
          su licencia municipal.
        </p>
        <Link
          className="mt-6 inline-flex rounded-md bg-sanitary-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-sanitary-ink"
          href="/vendor/stalls/new"
        >
          Registrar puesto
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-8">
      <form
        className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
            Licencia municipal
          </p>
          <h2 className="mt-3 text-2xl font-bold text-sanitary-ink">
            Registro y actualizacion de licencia
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Selecciona uno de tus puestos y registra los datos de autorizacion
            municipal. Si el puesto ya tiene licencia, se actualizara.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700 md:col-span-2">
            Puesto
            <select
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sanitary-green focus:ring-2 focus:ring-sanitary-green/20"
              onChange={(event) => handleStallChange(event.target.value)}
              value={selectedStallId}
            >
              {stalls.map((stall) => (
                <option key={stall.id} value={stall.id}>
                  {stall.name} - {stall.district}
                </option>
              ))}
              </select>
            <span className="mt-1 block text-xs font-normal text-slate-500">
              Solo se muestran puestos asociados a tu registro de vendedor.
            </span>
            {errors.stall_id ? (
              <span className="mt-1 block text-sm text-red-700">
                {errors.stall_id}
              </span>
            ) : null}
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Numero de licencia
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sanitary-green focus:ring-2 focus:ring-sanitary-green/20"
              onChange={(event) => setLicenseNumber(event.target.value)}
              placeholder="LIC-MUN-2026-001"
              type="text"
              value={licenseNumber}
            />
            <span className="mt-1 block text-xs font-normal text-slate-500">
              Escribe el numero tal como figura en la autorizacion municipal.
            </span>
            {errors.license_number ? (
              <span className="mt-1 block text-sm text-red-700">
                {errors.license_number}
              </span>
            ) : null}
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Estado
            <select
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sanitary-green focus:ring-2 focus:ring-sanitary-green/20"
              onChange={(event) =>
                setStatus(event.target.value as LicenseStatus)
              }
              value={status}
            >
              {LICENSE_STATUSES.map((licenseStatus) => (
                <option key={licenseStatus} value={licenseStatus}>
                  {LICENSE_STATUS_LABELS[licenseStatus]}
                </option>
              ))}
              </select>
            <span className="mt-1 block text-xs font-normal text-slate-500">
              Mantener este dato actualizado mejora la consulta ciudadana.
            </span>
            {errors.status ? (
              <span className="mt-1 block text-sm text-red-700">
                {errors.status}
              </span>
            ) : null}
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Fecha de emision
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sanitary-green focus:ring-2 focus:ring-sanitary-green/20"
              onChange={(event) => setIssuedAt(event.target.value)}
              type="date"
              value={issuedAt}
            />
            {errors.issued_at ? (
              <span className="mt-1 block text-sm text-red-700">
                {errors.issued_at}
              </span>
            ) : null}
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Fecha de vencimiento
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sanitary-green focus:ring-2 focus:ring-sanitary-green/20"
              onChange={(event) => setExpiresAt(event.target.value)}
              type="date"
              value={expiresAt}
            />
            {errors.expires_at ? (
              <span className="mt-1 block text-sm text-red-700">
                {errors.expires_at}
              </span>
            ) : null}
          </label>
        </div>

        {errorMessage ? (
          <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {errorMessage}
          </div>
        ) : null}

        {successMessage ? (
          <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {successMessage}
          </div>
        ) : null}

        <button
          className="mt-6 rounded-md bg-sanitary-green px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sanitary-ink disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={isSaving}
          type="submit"
        >
          {isSaving ? "Guardando..." : "Guardar licencia"}
        </button>
      </form>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
              Mis licencias
            </p>
            <h2 className="mt-3 text-2xl font-bold text-sanitary-ink">
              Licencias registradas
            </h2>
          </div>
        </div>

        {licenses.length === 0 ? (
          <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-600">
            No hay licencias registradas por el momento.
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            {licenses.map((license) => (
              <article
                className="rounded-md border border-slate-200 bg-slate-50 p-4"
                key={license.id}
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-sanitary-ink">
                      {license.stalls?.name ?? "Puesto sin nombre"}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      Licencia: {license.license_number}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Emision: {formatDate(license.issued_at)} - Vencimiento:{" "}
                      {formatDate(license.expires_at)}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Estado sanitario del puesto:{" "}
                      {license.stalls?.sanitary_status ?? "Sin estado"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    <LicenseStatusBadge status={license.status} />
                    <button
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-sanitary-green hover:text-sanitary-green"
                      onClick={() => handleStallChange(license.stall_id)}
                      type="button"
                    >
                      Actualizar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
