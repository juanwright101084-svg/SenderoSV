-- =====================================================
-- SenderoSV - esquema + RLS + datos de ejemplo
-- Pegar completo en Supabase → SQL Editor → Run
-- =====================================================

-- 1) TABLAS ------------------------------------------------
create table public.zonas (
  id bigint generated always as identity primary key,
  nombre text not null,
  slug text not null unique,
  descripcion text
);

create table public.rutas (
  id bigint generated always as identity primary key,
  nombre text not null,
  descripcion text not null,
  distancia_km numeric not null,
  dificultad text not null check (dificultad in ('Fácil', 'Moderada', 'Difícil')),
  duracion_horas numeric not null,
  elevacion_m int not null,
  imagen_url text,
  zona_id bigint not null references public.zonas(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- 2) RLS (Row Level Security) ------------------------------
alter table public.zonas enable row level security;
alter table public.rutas enable row level security;

-- Solo LECTURA pública. Sin políticas de insert/update/delete,
-- el rol "anon" no puede modificar nada (RLS deniega por defecto).
create policy "Lectura pública de zonas"
on public.zonas for select
to anon, authenticated
using (true);

create policy "Lectura pública de rutas"
on public.rutas for select
to anon, authenticated
using (true);

-- 3) DATOS DE EJEMPLO --------------------------------------
insert into public.zonas (nombre, slug, descripcion) values
('Occidente', 'occidente', 'Volcanes, lagos y pueblos coloniales'),
('Oriente', 'oriente', 'Costa, montaña y grandes vistas al mar'),
('Central', 'central', 'Cerca de la capital, ideal para medio día');

insert into public.rutas
  (nombre, descripcion, distancia_km, dificultad, duracion_horas, elevacion_m, imagen_url, zona_id)
values
(
  'Volcán de Santa Ana',
  'El punto más alto de El Salvador, con una laguna cratérica turquesa en la cima.',
  10, 'Difícil', 5, 950, 'https://picsum.photos/seed/santaana/800/600',
  (select id from public.zonas where slug = 'occidente')
),
(
  'Cerro Verde',
  'Sendero corto y accesible con miradores hacia el volcán de Izalco.',
  4, 'Fácil', 2, 250, 'https://picsum.photos/seed/cerroverde/800/600',
  (select id from public.zonas where slug = 'occidente')
),
(
  'Laguna de Alegría',
  'Caminata hasta una laguna de aguas turquesas dentro de un cráter volcánico.',
  6, 'Moderada', 3, 400, 'https://picsum.photos/seed/alegria/800/600',
  (select id from public.zonas where slug = 'oriente')
),
(
  'Cerro El Pital',
  'La cumbre más alta del país, con niebla, pinares y clima frío todo el año.',
  8, 'Moderada', 4, 600, 'https://picsum.photos/seed/pital/800/600',
  (select id from public.zonas where slug = 'oriente')
),
(
  'Puerta del Diablo',
  'Formación rocosa con miradores hacia el Valle de las Hamacas, a minutos de San Salvador.',
  2, 'Fácil', 1, 120, 'https://picsum.photos/seed/puertadeldiablo/800/600',
  (select id from public.zonas where slug = 'central')
),
(
  'Volcán de San Salvador (El Boquerón)',
  'Sendero alrededor del cráter del volcán que domina la capital.',
  5, 'Moderada', 2.5, 300, 'https://picsum.photos/seed/boqueron/800/600',
  (select id from public.zonas where slug = 'central')
);
