"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createVendor, getVendorByProfileId } from "@/lib/vendors";
import type { Profile } from "@/types/auth";
import type { Vendor } from "@/types/vendor";

type VendorRegistrationFormProps = {
  profile: Profile;
};

type FormErrors = {
  document_number?: string;
  phone?: string;
  address?: string;
};

export function VendorRegistrationForm({
  profile
}: VendorRegistrationFormProps) {
  const [documentNumber, setDocumentNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [existingVendor, setExistingVendor] = useState<Vendor | null>(null);
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
        const vendor = await getVendorByProfileId(profile.id);

        if (!isMounted) {
          return;
        }

        if (vendor) {
          setExistingVendor(vendor);
          setDocumentNumber(vendor.document_number);
          setPhone(vendor.phone);
          setAddress(vendor.address ?? "");
        }
      } catch {
        if (!isMounted) {
          return;
        }

        setErrorMessage("No se pudo consultar el registro de vendedor.");
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

    if (!documentNumber.trim()) {
      nextErrors.document_number = "El numero de documento es obligatorio.";
    }

    if (!phone.trim()) {
      nextErrors.phone = "El telefono es obligatorio.";
    }

    if (!address.trim()) {
      nextErrors.address = "La direccion o referencia es obligatoria.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      const vendor = await getVendorByProfileId(profile.id);

      if (vendor) {
        setExistingVendor(vendor);
        setDocumentNumber(vendor.document_number);
        setPhone(vendor.phone);
        setAddress(vendor.address ?? "");
        setErrorMessage("Este perfil ya tiene datos de vendedor registrados.");
        return;
      }

      const createdVendor = await createVendor({
        profile_id: profile.id,
        document_number: documentNumber,
        phone,
        address
      });

      setExistingVendor(createdVendor);
      setSuccessMessage("Datos de vendedor registrados correctamente.");
    } catch {
      setErrorMessage(
        "No se pudo registrar el vendedor. Revisa los datos e intenta nuevamente."
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          Consultando datos de vendedor...
        </p>
      </section>
    );
  }

  if (existingVendor) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Este perfil ya tiene datos de vendedor registrados.
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
            Datos registrados
          </p>
          <h2 className="mt-3 text-2xl font-bold text-sanitary-ink">
            {profile.full_name}
          </h2>
          <p className="mt-2 text-sm text-slate-600">{profile.email}</p>
        </div>

        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <dt className="font-medium text-slate-500">Documento</dt>
            <dd className="mt-1 font-semibold text-slate-800">
              {existingVendor.document_number}
            </dd>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <dt className="font-medium text-slate-500">Telefono</dt>
            <dd className="mt-1 font-semibold text-slate-800">
              {existingVendor.phone}
            </dd>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <dt className="font-medium text-slate-500">Direccion</dt>
            <dd className="mt-1 font-semibold text-slate-800">
              {existingVendor.address}
            </dd>
          </div>
        </dl>

        <Link
          className="mt-6 inline-flex rounded-md bg-sanitary-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-sanitary-ink"
          href="/dashboard/vendor"
        >
          Ir al dashboard de vendedor
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
          Registro de vendedor
        </p>
        <h2 className="mt-3 text-2xl font-bold text-sanitary-ink">
          Datos de identificacion y contacto
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Los nombres y correo se toman del perfil autenticado. Registra solo
          los datos operativos del vendedor.
        </p>
      </div>

      <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">
        <p className="font-semibold text-slate-800">{profile.full_name}</p>
        <p className="mt-1 text-slate-600">{profile.email}</p>
      </div>

      <div className="mt-6 grid gap-4">
        <label className="block text-sm font-medium text-slate-700">
          Numero de documento
          <input
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sanitary-green focus:ring-2 focus:ring-sanitary-green/20"
            onChange={(event) => setDocumentNumber(event.target.value)}
            placeholder="DNI o RUC"
            type="text"
            value={documentNumber}
          />
          {errors.document_number ? (
            <span className="mt-1 block text-sm text-red-700">
              {errors.document_number}
            </span>
          ) : null}
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Telefono
          <input
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sanitary-green focus:ring-2 focus:ring-sanitary-green/20"
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Numero de contacto"
            type="tel"
            value={phone}
          />
          {errors.phone ? (
            <span className="mt-1 block text-sm text-red-700">
              {errors.phone}
            </span>
          ) : null}
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Direccion o referencia de contacto
          <textarea
            className="mt-2 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sanitary-green focus:ring-2 focus:ring-sanitary-green/20"
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Direccion, referencia o zona habitual de contacto"
            value={address}
          />
          {errors.address ? (
            <span className="mt-1 block text-sm text-red-700">
              {errors.address}
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
        {isSaving ? "Guardando..." : "Guardar datos de vendedor"}
      </button>
    </form>
  );
}
