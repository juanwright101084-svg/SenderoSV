import Link from "next/link";
import RutaCard from "@/components/RutaCard";
import { getRutas, getZonas } from "@/lib/queries";

// ISR: la página es estática y se regenera en segundo plano cada 60 s
export const revalidate = 60;

export default async function HomePage() {
  const [zonas, rutas] = await Promise.all([getZonas(), getRutas()]);

  return (
    <div className="space-y-16">
      <section className="rounded-3xl border border-teal-900/40 bg-gradient-to-b from-teal-950/60 to-neutral-950 px-8 py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-stone-50 sm:text-5xl">
          SenderoSV
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-stone-300">
          Rutas y miradores de El Salvador, con distancia, dificultad y duración.
        </p>
        
                    <a href="#rutas"
          className="mt-8 inline-block rounded-full bg-teal-600 px-8 py-3 font-semibold text-white transition hover:bg-teal-500"
        >
          Ver rutas
        </a>
      </section>

      <section id="zonas" className="scroll-mt-8">
        <h2 className="mb-6 text-2xl font-bold text-stone-50">Zonas</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {zonas.map((z) => (
            <Link
              key={z.id}
              href={`/zonas/${z.slug}`}
              className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition hover:-translate-y-1 hover:border-neutral-700"
            >
              <h3 className="text-lg font-bold text-stone-50">{z.nombre}</h3>
              <p className="mt-1 text-sm text-stone-400">{z.descripcion}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="rutas" className="scroll-mt-8">
        <h2 className="mb-6 text-2xl font-bold text-stone-50">Todas las rutas</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rutas.map((r) => (
            <RutaCard key={r.id} ruta={r} />
          ))}
        </div>
      </section>
    </div>
  );
}