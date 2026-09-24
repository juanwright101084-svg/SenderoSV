"use client";

import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-md space-y-4 py-20 text-center">
      <h2 className="text-2xl font-bold">Algo salió mal</h2>
      <p className="text-stone-600">
        No pudimos cargar la información. Inténtalo de nuevo en unos segundos.
      </p>
      <button
        onClick={() => retry()}
        className="rounded-full bg-teal-700 px-6 py-2 font-semibold text-white hover:bg-teal-800"
      >
        Reintentar
      </button>
    </div>
  );
}
