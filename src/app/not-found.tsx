import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md space-y-4 py-20 text-center">
      <p className="text-5xl">🧭</p>
      <h2 className="text-2xl font-bold">Esta página no existe</h2>
      <p className="text-stone-600">Puede que el enlace esté roto o que la ruta no esté lista todavía.</p>
      <Link
        href="/"
        className="inline-block rounded-full bg-teal-700 px-6 py-2 font-semibold text-white hover:bg-teal-800"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
