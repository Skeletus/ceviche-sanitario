import Link from "next/link";

const capabilityCards = [
  {
    title: "Consulta de puestos autorizados",
    description:
      "Listado publico para identificar puestos con autorizacion vigente y estado sanitario visible."
  },
  {
    title: "Registro de vendedores",
    description:
      "Datos de identificacion y contacto para ordenar el proceso de formalizacion sanitaria."
  },
  {
    title: "Gestion de licencias",
    description:
      "Registro de licencias municipales asociadas a puestos y fechas de vigencia."
  },
  {
    title: "Supervision sanitaria",
    description:
      "Seguimiento del estado sanitario de puestos evaluados por la autoridad municipal."
  },
  {
    title: "Reportes ciudadanos",
    description:
      "Canal previsto para comunicar riesgos sanitarios observados en la via publica."
  },
  {
    title: "Panel administrativo",
    description:
      "Vista privada para revisar permisos, trazabilidad y gestion operativa del sistema."
  }
];

const values = [
  {
    title: "Transparencia",
    description: "Informacion publica clara para consultar puestos autorizados."
  },
  {
    title: "Trazabilidad",
    description:
      "Historial sanitario y administrativo orientado al seguimiento municipal."
  },
  {
    title: "Control sanitario",
    description: "Estados visibles que apoyan decisiones de supervision y consumo."
  },
  {
    title: "Acceso ciudadano",
    description: "Consulta abierta para reducir incertidumbre antes de comprar."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7faf7] text-slate-950">
      <header className="border-b border-emerald-100 bg-white/90">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <Link className="text-base font-bold text-sanitary-ink" href="/">
            Ceviche Sanitario
          </Link>
          <nav className="flex flex-wrap gap-2 text-sm">
            <Link
              className="rounded-md px-3 py-2 font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-sanitary-green"
              href="/stalls"
            >
              Puestos autorizados
            </Link>
            <Link
              className="rounded-md border border-slate-300 px-3 py-2 font-semibold text-slate-700 transition hover:border-sanitary-green hover:text-sanitary-green"
              href="/login"
            >
              Iniciar sesion
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
            Supervision municipal y consulta ciudadana
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-sanitary-ink sm:text-5xl">
            Ceviche Sanitario
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            Plataforma web para consultar puestos autorizados, registrar
            informacion sanitaria y apoyar la supervision municipal de
            vendedores de ceviche de pota.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="rounded-md bg-sanitary-green px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sanitary-ink focus:outline-none focus:ring-2 focus:ring-sanitary-green/30"
              href="/stalls"
            >
              Consultar puestos autorizados
            </Link>
            <Link
              className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-sanitary-green hover:text-sanitary-green focus:outline-none focus:ring-2 focus:ring-sanitary-green/20"
              href="/login"
            >
              Iniciar sesion
            </Link>
          </div>
        </div>

        <aside className="rounded-lg border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
            Valor publico
          </p>
          <h2 className="mt-3 text-2xl font-bold text-sanitary-ink">
            Informacion sanitaria clara para decisiones seguras
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            El sistema organiza datos de autorizacion, licencias y estado
            sanitario para que la ciudadania y la municipalidad consulten la
            misma informacion confiable.
          </p>
          <dl className="mt-6 grid gap-3 text-sm">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <dt className="font-semibold text-sanitary-ink">Consulta publica</dt>
              <dd className="mt-1 text-slate-600">
                Puestos visibles solo cuando cumplen criterios de publicacion.
              </dd>
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <dt className="font-semibold text-sanitary-ink">Gestion privada</dt>
              <dd className="mt-1 text-slate-600">
                Acceso por rol para vendedores, inspectores y administradores.
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="border-y border-emerald-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
              Funcionalidades principales
            </p>
            <h2 className="mt-3 text-3xl font-bold text-sanitary-ink">
              Herramientas para supervisar y consultar con claridad
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilityCards.map((capability) => (
              <article
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                key={capability.title}
              >
                <h2 className="text-lg font-semibold text-sanitary-ink">
                  {capability.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {capability.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-4 md:grid-cols-4">
          {values.map((value) => (
            <article
              className="rounded-lg border border-emerald-100 bg-emerald-50/60 p-5"
              key={value.title}
            >
              <h2 className="text-base font-bold text-sanitary-ink">
                {value.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-emerald-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-6 text-sm text-slate-600 sm:px-8 lg:px-10">
          Ceviche Sanitario
        </div>
      </footer>
    </main>
  );
}
