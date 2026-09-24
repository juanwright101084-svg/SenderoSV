import Image from "next/image";
import Link from "next/link";
import type { Ruta } from "@/lib/types";

const COLOR_DIFICULTAD: Record<string, string> = {
  "Fácil": "bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30",
  "Moderada": "bg-amber-500/15 text-amber-400 ring-1 ring-inset ring-amber-500/30",
  "Difícil": "bg-rose-500/15 text-rose-400 ring-1 ring-inset ring-rose-500/30",
};

export default function RutaCard({ ruta }: { ruta: Ruta }) {
  return (
    <Link
      href={`/rutas/${ruta.id}`}
      className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-sm transition hover:-translate-y-1 hover:border-neutral-700 hover:shadow-lg hover:shadow-black/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-800">
        {ruta.imagen_url && (
          <Image
            src={ruta.imagen_url}
            alt={ruta.nombre}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${
            COLOR_DIFICULTAD[ruta.dificultad] ?? "bg-stone-100/15 text-stone-300"
          }`}
        >
          {ruta.dificultad}
        </span>
      </div>
      <div className="space-y-2 p-5">
        {ruta.zonas && (
          <span className="text-xs font-semibold uppercase tracking-wide text-teal-400">
            {ruta.zonas.nombre}
          </span>
        )}
        <h3 className="text-lg font-bold text-stone-50">{ruta.nombre}</h3>
        <p className="line-clamp-2 text-sm text-stone-400">{ruta.descripcion}</p>
        <p className="text-sm text-stone-500">
          {ruta.distancia_km} km - {ruta.duracion_horas} h
        </p>
      </div>
    </Link>
  );
}
