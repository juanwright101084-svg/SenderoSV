"use client";

import { useState } from "react";

interface IntroVideoProps {
  onFinish: () => void;
}

export default function IntroVideo({ onFinish }: IntroVideoProps) {
  const [isFading, setIsFading] = useState(false);

  const handleFinish = () => {
    setIsFading(true);
    setTimeout(() => {
      onFinish();
    }, 1000); // 1 segundo de transición suave
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-1000 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Video de fondo - z-0 para que esté detrás del texto */}
      <video
        autoPlay
        muted
        playsInline
        onEnded={handleFinish}
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-70"
      >
        <source src="/videos/surf.mp4" type="video/mp4" />
      </video>

      {/* Overlay oscuro para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 z-[1] bg-black/40" />

      {/* Contenido superpuesto - z-10 para estar por encima */}
      <div className="relative z-10 px-6 text-center">
        <h1 className="mb-4 text-4xl font-extrabold text-white drop-shadow-2xl md:text-6xl">
          ¿Quieres conocer El Salvador?
        </h1>
        <p className="mb-8 text-xl text-stone-100 drop-shadow-lg md:text-2xl">
          Ven y explora con nosotros{" "}
          <span className="font-bold text-teal-400">SenderoSV</span>
        </p>

        <button
          onClick={handleFinish}
          className="rounded-full bg-teal-600 px-8 py-3 font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:bg-teal-500"
        >
          Explorar ahora
        </button>
      </div>
    </div>
  );
}