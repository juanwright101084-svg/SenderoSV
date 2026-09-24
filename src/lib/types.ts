export interface Zona {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
}

export type Dificultad = "Fácil" | "Moderada" | "Difícil";

export interface Ruta {
  id: number;
  nombre: string;
  descripcion: string;
  distancia_km: number;
  dificultad: Dificultad;
  duracion_horas: number;
  elevacion_m: number;
  imagen_url: string | null;
  zona_id: number;
  created_at: string;
  latitud: number | null;
  longitud: number | null;
  zonas: Pick<Zona, "nombre" | "slug"> | null;
}