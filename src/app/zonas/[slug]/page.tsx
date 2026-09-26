import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getZonaBySlug, getRutasByZona, getZonas } from "@/lib/queries";
import RutaCard from "@/components/RutaCard";

export const revalidate = 60;

// En Next.js 16 `params` es una Promise → hay que hacer await
type Props = { params: Promise<{ slug: string }> };

// SSG: genera en build una página por cada zona existente
export async function generateStaticParams() {
  const zonas = await getZonas();
  return zonas.map((z) => ({ slug: z.slug }));
}

// SEO dinámico: título distinto por zona
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const zona = await getZonaBySlug(slug);
  if (!zona) return { title: "Zona no encontrada" };
  return { title: zona.nombre, description: zona.descripcion ?? undefined };
}

export default async function ZonaPage({ params }: Props) {
  const { slug } = await params;

  const zona = await getZonaBySlug(slug);
  if (!zona) notFound();

  const rutas = await getRutasByZona(zona.id);

  return (
    <div className="space-y-8">
      <Link href="/" className="text-sm text-stone-400 hover:text-teal-400">
        &lt;- Volver al inicio
      </Link>

      <header className="space-y-3">
        <span className="text-sm font-semibold uppercase tracking-wide text-teal-400">
          Zona
        </span>
        <h1 className="text-4xl font-extrabold text-stone-50">{zona.nombre}</h1>
        {zona.descripcion && (
          <p className="text-lg text-stone-300">{zona.descripcion}</p>
        )}
      </header>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-stone-50">
          Rutas en {zona.nombre}
        </h2>
        {rutas.length === 0 ? (
          <p className="text-stone-400">Todavía no hay rutas registradas en esta zona.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rutas.map((r) => (
              <RutaCard key={r.id} ruta={r} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}