const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

async function fetcher(path) {
  const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  const json = await res.json();
  return json.data;
}

async function poster(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  return json;
}

export const api = {
  getCursos:           () => fetcher('/cursos'),
  getCurso:            (id) => fetcher(`/cursos/${id}`),
  getModulosByCurso:   (id) => fetcher(`/cursos/${id}/modulos`),
  getLeccionesByModulo:(id) => fetcher(`/modulos/${id}/lecciones`),
  getLeccion:          (id) => fetcher(`/lecciones/${id}`),
  getEjerciciosByLeccion:(id) => fetcher(`/lecciones/${id}/ejercicios`),
  getEjercicio:        (id) => fetcher(`/ejercicios/${id}`),
  verificarRespuesta:  (id, respuesta) => poster(`/ejercicios/${id}/verificar`, { respuesta }),
  getDockerHubPopular: () => fetcher('/dockerhub/popular'),
  getDockerHubImagen:  (img) => fetcher(`/dockerhub/${img}`),
};
