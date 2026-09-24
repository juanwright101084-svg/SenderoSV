"use client";

import type { Ruta } from "@/lib/types";

interface BotonNavegarProps {
  destinoLat: Ruta["latitud"];
  destinoLng: Ruta["longitud"];
  destinoNombre?: string;
}

export default function BotonNavegar({
  destinoLat,
  destinoLng,
  destinoNombre,
}: BotonNavegarProps) {
  // Si la ruta no cuenta con coordenadas guardadas en la base de datos
  if (!destinoLat || !destinoLng) {
    return (
      <button
        disabled
        className="w-full mt-4 px-4 py-2.5 bg-neutral-800 text-stone-500 font-medium rounded-2xl cursor-not-allowed text-center text-sm"
      >
        Ubicación GPS no disponible
      </button>
    );
  }

  // URL de la API de Google Maps: al no definir 'origin', tomará el GPS/IP actual del usuario
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinoLat},${destinoLng}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2.5 w-full mt-4 px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-stone-950 font-semibold rounded-2xl shadow-lg shadow-teal-500/10 transition-all duration-200 text-sm active:scale-[0.99]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          clipRule="evenodd"
        />
      </svg>
      Navegar a {destinoNombre || "la ruta"} con Google Maps
    </a>
  );
}