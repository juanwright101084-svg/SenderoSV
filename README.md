# SenderoSV 🏔️

> Rutas y miradores de El Salvador — Next.js 16 + Supabase

Catálogo interactivo de senderos, volcanes y miradores de El Salvador con información detallada de cada ruta (distancia, dificultad, duración y elevación), filtrado por zona geográfica, navegación GPS y una intro cinematográfica con video.

Proyecto desarrollado como parte del **Bootcamp Full Stack Junior** (Kodigo, Módulo 4), con funcionalidades adicionales más allá del enunciado original.

**🔗 Demo en vivo:** [senderosv.vercel.app](https://senderosv.vercel.app)

---

## ✨ Características

### Funcionalidades base (Parte guiada + Reto)
- 🗺️ **Home con zonas y rutas** — ISR con `revalidate = 60`.
- 📍 **Detalle de ruta** (`/rutas/[id]`) — SSG + ISR, `generateStaticParams` y `generateMetadata` para SEO dinámico.
- 🌎 **Navegación por zonas** (`/zonas/[slug]`) — Página dinámica con todas las rutas agrupadas por región.
- ⚠️ **Estados de carga, error y 404** — `loading.tsx`, `error.tsx`, `not-found.tsx`.
- 🎨 **Etiquetas de dificultad con color** — Fácil (verde), Moderada (ámbar), Difícil (rojo).
- 🔗 **Navegación cruzada** — Cada ruta enlaza a su zona, y cada zona muestra todas sus rutas.

### Extras implementados
- 🎬 **Intro con video** — Pantalla de bienvenida con video de surf de fondo, texto animado y transición suave hacia la HomePage. Se muestra una sola vez por sesión usando `sessionStorage`.
- 📱 **Botón "Navegar" con GPS/IP** — En cada detalle de ruta, abre Google Maps con la ubicación del destino. Detecta la ubicación del usuario automáticamente:
  - **GPS** en móviles (Geolocation API).
  - **IP** en computadoras (fallback automático).

---

## 🚀 Puesta en marcha

### 1. Instala dependencias

```bash
pnpm install

2. Configura Supabase
Crea un proyecto nuevo en supabase.com.

Abre el SQL Editor → New query.

Copia y ejecuta el archivo supabase-setup.sql completo de este repositorio.

Verifica en Table Editor que existan las tablas zonas y rutas con sus datos y RLS activo.

3. Configura las variables de entorno
Copia el archivo de ejemplo y coloca tus credenciales:

bash
cp .env.local.example .env.local
Edita .env.local:

env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxx
4. Levanta el servidor
bash
pnpm dev
Abre http://localhost:3000 en tu navegador.

📁 Estructura del proyecto
text
senderos/
├── public/
│   └── videos/
│       └── surf.mp4                  # Video de la intro
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Layout raíz (header, footer, AppWrapper)
│   │   ├── page.tsx                  # Home — ISR
│   │   ├── loading.tsx               # Estado de carga
│   │   ├── error.tsx                 # Estado de error
│   │   ├── not-found.tsx             # Página 404 personalizada
│   │   ├── rutas/
│   │   │   └── [id]/page.tsx         # Detalle de ruta — SSG + ISR
│   │   └── zonas/
│   │       └── [slug]/page.tsx       # Rutas por zona — SSG + ISR
│   ├── components/
│   │   ├── AppWrapper.tsx            # Wrapper cliente para la intro
│   │   ├── BotonNavegar.tsx          # Botón GPS/IP → Google Maps
│   │   ├── IntroVideo.tsx            # Pantalla de bienvenida con video
│   │   └── RutaCard.tsx              # Tarjeta de ruta reutilizable
│   └── lib/
│       ├── queries.ts                # Capa de datos (Supabase)
│       ├── supabase.ts               # Cliente de Supabase
│       └── types.ts                  # Tipos TypeScript
├── supabase-setup.sql                # Schema, RLS y datos de ejemplo
└── next.config.ts
🛠️ Stack Tecnológico
Tecnología	Uso
Next.js 16	Framework con App Router, Server Components, ISR y SSG
TypeScript	Tipado estático
Tailwind CSS	Estilos utilitarios con tema oscuro personalizado
Supabase	Base de datos PostgreSQL con RLS
React 19	cache(), Server Components, Hooks
Vercel	Deploy y hosting
📖 Rutas de la aplicación
Ruta	Descripción	Estrategia
/	Home con zonas y todas las rutas	ISR (revalidate = 60)
/rutas/[id]	Detalle de una ruta	SSG + ISR
/zonas/[slug]	Rutas agrupadas por zona	SSG + ISR
🎨 Patrones aplicados
Server Components con async/await para consultas de datos.

cache() de React para evitar consultas duplicadas.

ISR con revalidate = 60 en todas las páginas.

SSG mediante generateStaticParams() en rutas dinámicas.

SEO dinámico con generateMetadata() por ruta.

Client Components solo donde se requiere interactividad.

sessionStorage para controlar la intro (una vez por sesión).

Row Level Security (RLS) en Supabase con políticas de solo lectura pública.

notFound() para manejar entidades inexistentes.

🎬 Intro con video
La intro muestra un video de surf con overlay oscuro y mensaje de bienvenida. Comportamiento:

Se muestra una vez por sesión (sessionStorage).

Se salta automáticamente al terminar (16 seg) o al hacer clic en "Explorar ahora".

Transición suave de 1 segundo al desaparecer.

Video optimizado con compresión H.264 a 1080p.

Para reemplazar el video, coloca tu archivo en public/videos/surf.mp4 — siempre en minúsculas (compatibilidad con Linux/Vercel).

🧭 Botón de navegación GPS/IP
En cada detalle de ruta, el botón "Navegar" abre Google Maps con la ubicación del destino. Detecta la ubicación del usuario automáticamente:

Móvil → Geolocation API (GPS real).

Escritorio → IP pública como fallback (aproximada a nivel de ciudad).

Si el usuario deniega el permiso o no hay GPS disponible, el botón muestra un estado deshabilitado con el mensaje "Ubicación GPS no disponible".

🚢 Deploy
El proyecto está desplegado en Vercel con deploy automático en cada git push a main.

Para hacer tu propio deploy:

Sube el proyecto a GitHub.

Importa el repositorio en vercel.com.

Configura las variables de entorno:

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

Deploy automático en cada push.

✅ Checklist completado
Parte guiada (Pasos 1–7)
☑ Proyecto Next.js 16 + Supabase configurado.
☑ Esquema de BD con tablas zonas y rutas.
☑ RLS activo con políticas de solo lectura.
☑ Home muestra las 3 zonas y las 6 rutas.
☑ Cada tarjeta lleva a /rutas/[id].
☑ Etiqueta de dificultad con color dinámico.
☑ Página 404 personalizada.
☑ Estados loading.tsx y error.tsx.
El Reto
☑ getZonaBySlug() y getRutasByZona() en queries.ts.
☑ Página /zonas/[slug]/page.tsx funcional.
☑ generateStaticParams(), generateMetadata() y revalidate = 60.
☑ Zona inexistente muestra 404 personalizada.
☑ Enlace desde detalle de ruta hacia su zona funcionando.
☑ Tarjetas de zona en la home convertidas en enlaces.
Extras
☑ Intro con video y transición suave.
☑ Botón de navegación GPS/IP → Google Maps.
👨‍💻 Autor
Juan Guzman
Bootcamp Full Stack Junior — Kodigo, Módulo 4