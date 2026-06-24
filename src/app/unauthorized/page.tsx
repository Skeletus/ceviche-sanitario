import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7faf7] px-6 text-sanitary-ink">
      <section className="w-full max-w-lg rounded-lg border border-amber-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
          Acceso restringido
        </p>
        <h1 className="mt-3 text-3xl font-bold">
          No tienes permisos para esta seccion
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Tu sesion esta activa, pero tu rol no permite acceder a esta ruta.
          Puedes volver al panel principal o iniciar sesion con una cuenta
          autorizada.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="rounded-md bg-sanitary-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-sanitary-ink"
            href="/dashboard"
          >
            Ir al dashboard
          </Link>
          <Link
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sanitary-green hover:text-sanitary-green"
            href="/login"
          >
            Volver al login
          </Link>
        </div>
      </section>
    </main>
  );
}
