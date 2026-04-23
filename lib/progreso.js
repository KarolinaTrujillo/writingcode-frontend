    const STORAGE_KEY = 'writingcode_progreso';

export function getProgreso() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch { return {}; }
}

export function marcarLeccionCompletada(id_leccion) {
  const progreso = getProgreso();
  progreso[id_leccion] = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso));
}

export function leccionCompletada(id_leccion) {
  return !!getProgreso()[id_leccion];
}

export function getProgresoModulo(lecciones) {
  const progreso = getProgreso();
  const completadas = lecciones.filter(l => progreso[l.id_leccion]).length;
  return { completadas, total: lecciones.length };
}