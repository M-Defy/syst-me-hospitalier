import client from './client';

export function listPatients(params = {}) {
  return client.get('/patients/', { params }).then((res) => res.data);
}

export function getPatient(id) {
  return client.get(`/patients/${id}/`).then((res) => res.data);
}

export function createPatient(payload) {
  return client.post('/patients/', payload).then((res) => res.data);
}

export function updatePatient(id, payload) {
  return client.patch(`/patients/${id}/`, payload).then((res) => res.data);
}
