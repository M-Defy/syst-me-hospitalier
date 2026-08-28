import client from './client';

export function listPrescriptions(params = {}) {
  return client.get('/prescriptions/', { params }).then((res) => res.data);
}

export function createPrescription(payload) {
  return client.post('/prescriptions/', payload).then((res) => res.data);
}

export function annulerPrescription(id, motif_annulation) {
  return client.post(`/prescriptions/${id}/annuler/`, { motif_annulation }).then((res) => res.data);
}
