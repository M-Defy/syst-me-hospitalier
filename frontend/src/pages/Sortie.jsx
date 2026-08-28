import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patients, medecins } from '../data/mockData';
import { useToast } from '../components/Toast';
import Modal from '../components/Modal';

const EMPTY = { patientId: '', date: '', heure: '', motif: '', medecin: '', resume: '', observations: '' };

export default function Sortie() {
  const navigate = useNavigate();
  const { notify } = useToast();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const selectedPatient = patients.find((p) => p.id === form.patientId);

  const validate = () => {
    const next = {};
    if (!form.patientId) next.patientId = 'Sélectionnez un patient.';
    if (!form.date) next.date = 'La date est requise.';
    if (!form.heure) next.heure = 'L\'heure est requise.';
    if (!form.motif.trim()) next.motif = 'Le motif de sortie est requis.';
    if (!form.medecin) next.medecin = 'Le médecin est requis.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleReview = (e) => {
    e.preventDefault();
    if (!validate()) {
      notify('Veuillez compléter les champs obligatoires.', 'error');
      return;
    }
    setShowConfirm(true);
  };

  const confirmSortie = () => {
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirm(false);
      notify('Sortie validée avec succès.', 'success');
      navigate('/patients');
    }, 500);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Sortie patient</div>
          <div className="page-subtitle">Enregistrer la sortie d'un patient hospitalisé</div>
        </div>
      </div>

      <form onSubmit={handleReview} noValidate>
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-body">
            <div className="form-grid">
              <div className="field span-2">
                <label htmlFor="patientId">Patient<span className="required">*</span></label>
                <select id="patientId" className={'input' + (errors.patientId ? ' has-error' : '')} value={form.patientId} onChange={update('patientId')}>
                  <option value="">Sélectionner un patient...</option>
                  {patients.map((p) => <option key={p.id} value={p.id}>{p.prenom} {p.nom} — {p.ipp} ({p.service})</option>)}
                </select>
                {errors.patientId && <span className="error-text">{errors.patientId}</span>}
              </div>
              <div className="field">
                <label htmlFor="date">Date<span className="required">*</span></label>
                <input id="date" type="date" className={'input' + (errors.date ? ' has-error' : '')} value={form.date} onChange={update('date')} />
                {errors.date && <span className="error-text">{errors.date}</span>}
              </div>
              <div className="field">
                <label htmlFor="heure">Heure<span className="required">*</span></label>
                <input id="heure" type="time" className={'input' + (errors.heure ? ' has-error' : '')} value={form.heure} onChange={update('heure')} />
                {errors.heure && <span className="error-text">{errors.heure}</span>}
              </div>
              <div className="field span-2">
                <label htmlFor="motif">Motif<span className="required">*</span></label>
                <input id="motif" className={'input' + (errors.motif ? ' has-error' : '')} value={form.motif} onChange={update('motif')} placeholder="Ex : guérison, transfert, sortie contre avis médical" />
                {errors.motif && <span className="error-text">{errors.motif}</span>}
              </div>
              <div className="field span-2">
                <label htmlFor="medecin">Médecin<span className="required">*</span></label>
                <select id="medecin" className={'input' + (errors.medecin ? ' has-error' : '')} value={form.medecin} onChange={update('medecin')}>
                  <option value="">Sélectionner...</option>
                  {medecins.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
                {errors.medecin && <span className="error-text">{errors.medecin}</span>}
              </div>
              <div className="field span-2">
                <label htmlFor="resume">Résumé</label>
                <textarea id="resume" className="input" value={form.resume} onChange={update('resume')} placeholder="Résumé de l'hospitalisation..." />
              </div>
              <div className="field span-2">
                <label htmlFor="observations">Observations</label>
                <textarea id="observations" className="input" value={form.observations} onChange={update('observations')} placeholder="Consignes de suivi, recommandations..." />
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Annuler</button>
          <button type="submit" className="btn btn-primary">Valider la sortie</button>
        </div>
      </form>

      {showConfirm && (
        <Modal
          title="Confirmer la sortie"
          onClose={() => setShowConfirm(false)}
          footer={
            <>
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Annuler</button>
              <button className="btn btn-primary" onClick={confirmSortie} disabled={isSubmitting}>
                {isSubmitting && <span className="loading-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />}
                Confirmer la sortie
              </button>
            </>
          }
        >
          <div className="confirm-panel">
            Vous êtes sur le point de valider la sortie de{' '}
            <b>{selectedPatient?.prenom} {selectedPatient?.nom}</b> ({selectedPatient?.ipp}),
            prévue le <b>{form.date ? new Date(form.date).toLocaleDateString('fr-FR') : '—'}</b> à <b>{form.heure}</b>.
            <br /><br />
            Cette action mettra à jour le statut du patient et libérera son lit. Veuillez vérifier les informations avant de continuer.
          </div>
        </Modal>
      )}
    </div>
  );
}
