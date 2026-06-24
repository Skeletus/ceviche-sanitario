import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7faf7] px-6 text-sanitary-ink">
      <section className="w-full max-w-lg rounded-lg border border-amber-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
          Acceso no autorizado
        </p>
        <h1 className="mt-3 text-3xl font-bold">No tienes permiso</h1>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Tu sesion fue reconocida, pero el rol del perfil no tiene permisos
          para abrir esta ruta o ejecutar esta operacion.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="rounded-md bg-sanitary-green px-4 py-2 text-sm font-semibold text-white"
            href="/dashboard"
          >
            Ir al dashboard
          </Link>
          <Link
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
            href="/login"
          >
            Volver al login
          </Link>
        </div>
      </section>
    </main>
  );
}
