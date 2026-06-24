const sections = [
  {
    title: "Consulta de puestos autorizados",
    description:
      "Listado público para que la ciudadanía identifique puestos con autorización y estado sanitario visible."
  },
  {
    title: "Registro de vendedores",
    description:
      "Base para formalizar vendedores ambulantes y asociarlos con sus puestos y licencias municipales."
  },
  {
    title: "Reportes sanitarios",
    description:
      "Canal ciudadano para registrar riesgos observados y adjuntar evidencias en una fase posterior."
  },
  {
    title: "Inspecciones municipales",
    description:
      "Flujo preparado para registrar controles sanitarios, observaciones y cambios de estado del puesto."
  },
  {
    title: "Panel administrativo",
    description:
      "Vista inicial para consolidar indicadores, reportes e historial operativo del MVP."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7faf7] text-slate-950">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
            Proyecto Final de Carrera III
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Sistema de supervisión sanitaria para vendedores de ceviche de pota
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            MVP web orientado a apoyar el registro de vendedores ambulantes, la
            consulta de puestos autorizados, el reporte de riesgos sanitarios y
            la gestión inicial de inspecciones municipales.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={section.title}
            >
              <h2 className="text-lg font-semibold text-sanitary-ink">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {section.description}
              </p>
            </article>
          ))}
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
          Esta pantalla es una base visual del MVP. La integración con Supabase,
          autenticación, reportes, inspecciones y panel administrativo se
          implementará en las siguientes iteraciones.
        </div>
      </section>
    </main>
  );
}
