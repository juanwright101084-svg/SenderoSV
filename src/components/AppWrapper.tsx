"use client";

import { useState, useEffect } from "react";
import IntroVideo from "./IntroVideo";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  // Opcional: Guardar en sessionStorage para que no salga el video cada vez que cambias de página
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleFinishIntro = () => {
    setShowIntro(false);
    sessionStorage.setItem("hasSeenIntro", "true"); // Para que no vuelva a salir en la misma sesión
  };

  return (
    <>
      {showIntro && <IntroVideo onFinish={handleFinishIntro} />}
      <div className={showIntro ? "h-screen overflow-hidden" : ""}>
        {children}
      </div>
    </>
  );
}