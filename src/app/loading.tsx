export default function Loading() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Cargando">
      <div className="h-48 animate-pulse rounded-3xl bg-stone-200" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 animate-pulse rounded-2xl bg-stone-200" />
        ))}
      </div>
    </div>
  );
}
