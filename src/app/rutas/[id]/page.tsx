import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRutaById, getRutas } from "@/lib/queries";
import BotonNavegar from "@/components/BotonNavegar";

export const revalidate = 60;

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const rutas = await getRutas();
  return rutas.map((r) => ({ id: String(r.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const ruta = Number.isInteger(Number(id)) ? await getRutaById(Number(id)) : null;
  if (!ruta) return { title: "Ruta no encontrada" };
  return { title: ruta.nombre, description: ruta.descripcion };
}

export default async function RutaPage({ params }: Props) {
  const { id } = await params;
  const rutaId = Number(id);
  if (!Number.isInteger(rutaId)) notFound();

  const ruta = await getRutaById(rutaId);
  if (!ruta) notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <Link href="/" className="text-sm text-stone-400 hover:text-teal-400">
        &lt;- Volver al inicio
      </Link>

      {/* Imagen principal */}
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-neutral-800">
        {ruta.imagen_url && (
          <Image
            src={ruta.imagen_url}
            alt={ruta.nombre}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        )}
      </div>

      {/* Botón Navegar inmediatamente debajo de la imagen */}
      {ruta.latitud != null && ruta.longitud != null && (
        <BotonNavegar
          destinoLat={ruta.latitud}
          destinoLng={ruta.longitud}
          destinoNombre={ruta.nombre}
        />
      )}

      {/* Información detallada de la ruta */}
      <header className="space-y-3 pt-2">
        {ruta.zonas && (
          <Link
            href={`/zonas/${ruta.zonas.slug}`}
            className="text-sm font-semibold uppercase tracking-wide text-teal-400 hover:underline"
          >
            {ruta.zonas.nombre}
          </Link>
        )}
        <h1 className="text-4xl font-extrabold text-stone-50">{ruta.nombre}</h1>
        <p className="text-lg text-stone-300">{ruta.descripcion}</p>
        <p className="text-sm text-stone-500">
          {ruta.distancia_km} km - {ruta.duracion_horas} h - {ruta.elevacion_m} m -{" "}
          {ruta.dificultad}
        </p>
      </header>
    </article>
  );
}