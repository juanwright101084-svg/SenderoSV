# SenderoSV

Rutas y miradores de El Salvador — Next.js 16 + Supabase.

Ejercicio guiado del Bootcamp Full Stack Junior (Kodigo, Módulo 4).
Esta es la **parte guiada** (Pasos 1–7). El Reto (`/zonas/[slug]`) queda pendiente de resolver.

## Poner en marcha

1. Instala dependencias:
   ```bash
   pnpm install
   ```
2. Crea un proyecto en [supabase.com](https://supabase.com), abre el **SQL Editor** y ejecuta completo el archivo `supabase-setup.sql` de este repo.
3. Copia `.env.local.example` a `.env.local` y coloca tu URL y llave pública de Supabase:
   ```bash
   cp .env.local.example .env.local
   ```
4. Levanta el servidor:
   ```bash
   pnpm dev
   ```

## Qué incluye

- `/` — Home con zonas y rutas (ISR, `revalidate = 60`)
- `/rutas/[id]` — Detalle de ruta (SSG + ISR, `generateStaticParams`, `generateMetadata`)
- `loading.tsx`, `error.tsx`, `not-found.tsx` — estados de carga, error y 404
- `src/lib/queries.ts` — capa de datos (`getZonas`, `getRutas`, `getRutaById`), con espacio dejado para las funciones del Reto
- El enlace a `/zonas/[slug]` en el detalle de cada ruta da 404 a propósito — es lo que resuelve el Reto

## Pendiente (El Reto)

Construir `/zonas/[slug]` siguiendo el enunciado del PDF: `getZonaBySlug`, `getRutasByZona`, la página con `generateStaticParams`/`generateMetadata`/`revalidate`, y convertir las tarjetas de zona en la home en enlaces.
