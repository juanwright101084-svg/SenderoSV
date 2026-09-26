import { cache } from "react";
import { supabase } from "./supabase";
import type { Ruta, Zona } from "./types";

const RUTA_SELECT = "*, zonas(nombre, slug)";

export const getZonas = cache(async (): Promise<Zona[]> => {
  const { data, error } = await supabase
    .from("zonas")
    .select("*")
    .order("nombre")
    .overrideTypes<Zona[], { merge: false }>();

  if (error) throw new Error(`No se pudieron cargar las zonas: ${error.message}`);
  return data;
});

export const getRutas = cache(async (): Promise<Ruta[]> => {
  const { data, error } = await supabase
    .from("rutas")
    .select(RUTA_SELECT)
    .order("created_at", { ascending: false })
    .overrideTypes<Ruta[], { merge: false }>();

  if (error) throw new Error(`No se pudieron cargar las rutas: ${error.message}`);
  return data;
});

export const getRutaById = cache(async (id: number): Promise<Ruta | null> => {
  const { data, error } = await supabase
    .from("rutas")
    .select(RUTA_SELECT)
    .eq("id", id)
    .maybeSingle<Ruta>();

  if (error) throw new Error(`Error al buscar la ruta: ${error.message}`);
  return data;
});

// Devuelve la zona que tiene ese slug, o null si no existe
export const getZonaBySlug = cache(async (slug: string): Promise<Zona | null> => {
  const { data, error } = await supabase
    .from("zonas")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<Zona>();

  if (error) throw new Error(`Error al buscar la zona: ${error.message}`);
  return data;
});

// Devuelve las rutas de una zona, ordenadas por nombre
export const getRutasByZona = cache(async (zonaId: number): Promise<Ruta[]> => {
  const { data, error } = await supabase
    .from("rutas")
    .select(RUTA_SELECT)
    .eq("zona_id", zonaId)
    .order("nombre")
    .overrideTypes<Ruta[], { merge: false }>();

  if (error) throw new Error(`No se pudieron cargar las rutas de la zona: ${error.message}`);
  return data;
});
