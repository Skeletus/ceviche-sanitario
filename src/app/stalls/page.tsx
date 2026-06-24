import Link from "next/link";
import { PublicStallList } from "@/components/stalls/PublicStallList";

export default function PublicStallsPage() {
  return (
    <main className="min-h-screen bg-[#f7faf7] text-sanitary-ink">
      <section className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
              Consulta ciudadana
            </p>
            <h1 className="mt-3 text-3xl font-bold">
              Puestos autorizados de ceviche de pota
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Revisa puestos de ceviche de pota publicados con estado sanitario
              autorizado antes de comprar. La consulta no expone datos sensibles
              de vendedores.
            </p>
          </div>

          <Link
            className="inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sanitary-green hover:text-sanitary-green"
            href="/"
          >
            Volver al inicio
          </Link>
        </div>

        <div className="mt-8">
          <PublicStallList />
        </div>
      </section>
    </main>
  );
}
