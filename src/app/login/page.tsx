import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f7faf7] text-sanitary-ink">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center gap-8 px-6 py-10 sm:px-8 lg:grid lg:grid-cols-[1fr_420px] lg:items-center lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
            Acceso privado
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Ingresa al panel de gestion sanitaria
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Accede con tu cuenta registrada para revisar las opciones
            disponibles segun tu rol en Ceviche Sanitario.
          </p>
          <Link
            className="mt-8 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sanitary-green hover:text-sanitary-green"
            href="/"
          >
            Volver al inicio
          </Link>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
