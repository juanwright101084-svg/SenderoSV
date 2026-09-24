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

// RETO: aquí abajo tú vas a agregar getZonaBySlug() y getRutasByZona().
// Revisa el enunciado del Reto en la guía para ver la firma exacta que necesitas.
