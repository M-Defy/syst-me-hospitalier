import client from './client';

export function listLits(params = {}) {
  return client.get('/lits/', { params }).then((res) => res.data);
}

export function listLitsDisponibles() {
  return client.get('/lits/disponibles/').then((res) => res.data);
}

export function listSejours(params = {}) {
  return client.get('/sejours/', { params }).then((res) => res.data);
}

export function createSejour(payload) {
  return client.post('/sejours/', payload).then((res) => res.data);
}

export function sortirSejour(id, payload = {}) {
  return client.post(`/sejours/${id}/sortie/`, payload).then((res) => res.data);
}
