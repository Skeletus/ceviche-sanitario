"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createStall, INITIAL_STALL_STATUS } from "@/lib/stalls";
import { getVendorByProfileId } from "@/lib/vendors";
import type { Profile } from "@/types/auth";
import type { Vendor } from "@/types/vendor";

type StallRegistrationFormProps = {
  profile: Profile;
};

type FormErrors = {
  name?: string;
  location_reference?: string;
  district?: string;
};

export function StallRegistrationForm({
  profile
}: StallRegistrationFormProps) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [name, setName] = useState("");
  const [locationReference, setLocationReference] = useState("");
  const [district, setDistrict] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadVendor() {
      setErrorMessage("");

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

        setErrorMessage("No se pudo verificar tu registro de vendedor.");
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

  function validateForm() {
    const nextErrors: FormErrors = {};

    if (!name.trim()) {
      nextErrors.name = "El nombre del puesto es obligatorio.";
    }

    if (!locationReference.trim()) {
      nextErrors.location_reference =
        "La direccion o referencia de ubicacion es obligatoria.";
    }

    if (!district.trim()) {
      nextErrors.district = "El distrito es obligatorio.";
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

    setIsSaving(true);

    try {
      await createStall({
        vendor_id: vendor.id,
        name,
        location_reference: locationReference,
        district
      });

      setName("");
      setLocationReference("");
      setDistrict("");
      setErrors({});
      setSuccessMessage(
        "Puesto registrado correctamente con estado sanitario pendiente."
      );
    } catch {
      setErrorMessage(
        "No se pudo registrar el puesto. Revisa los datos e intenta nuevamente."
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          Verificando datos de vendedor...
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
          Para asociar un puesto a tu cuenta, completa antes tus datos de
          identificacion y contacto como vendedor.
        </p>
        {errorMessage ? (
          <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {errorMessage}
          </div>
        ) : null}
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
    <form
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
          Registro de puesto
        </p>
        <h2 className="mt-3 text-2xl font-bold text-sanitary-ink">
          Ubicacion y datos del puesto ambulante
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          El puesto quedara asociado a tu registro de vendedor y empezara con
          estado sanitario pendiente. No sera publico hasta ser evaluado.
        </p>
      </div>

      <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">
        <p className="font-semibold text-slate-800">{profile.full_name}</p>
        <p className="mt-1 text-slate-600">
          Vendedor asociado: {vendor.document_number}
        </p>
        <p className="mt-1 text-slate-600">
          Estado inicial: {INITIAL_STALL_STATUS}
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        <label className="block text-sm font-medium text-slate-700">
          Nombre del puesto
          <input
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sanitary-green focus:ring-2 focus:ring-sanitary-green/20"
            onChange={(event) => setName(event.target.value)}
            placeholder="Ceviche de Pota San Pedro"
            type="text"
            value={name}
          />
          {errors.name ? (
            <span className="mt-1 block text-sm text-red-700">
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Direccion o referencia de ubicacion
          <textarea
            className="mt-2 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sanitary-green focus:ring-2 focus:ring-sanitary-green/20"
            onChange={(event) => setLocationReference(event.target.value)}
            placeholder="Frente al mercado, esquina o referencia visible"
            value={locationReference}
          />
          {errors.location_reference ? (
            <span className="mt-1 block text-sm text-red-700">
              {errors.location_reference}
            </span>
          ) : null}
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Distrito
          <input
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sanitary-green focus:ring-2 focus:ring-sanitary-green/20"
            onChange={(event) => setDistrict(event.target.value)}
            placeholder="Lima Cercado"
            type="text"
            value={district}
          />
          {errors.district ? (
            <span className="mt-1 block text-sm text-red-700">
              {errors.district}
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
          <Link className="ml-2 font-semibold underline" href="/dashboard/vendor/stalls">
            Ver mis puestos
          </Link>
        </div>
      ) : null}

      <button
        className="mt-6 rounded-md bg-sanitary-green px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sanitary-ink disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={isSaving}
        type="submit"
      >
        {isSaving ? "Guardando..." : "Guardar puesto"}
      </button>
    </form>
  );
}
