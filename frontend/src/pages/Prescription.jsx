import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patients, medecins } from '../data/mockData';
import { useToast } from '../components/Toast';
import { IconPlus, IconTrash } from '../components/icons';

const FORMES = ['Comprimé', 'Sirop', 'Injection', 'Gélule', 'Pommade', 'Suppositoire'];
const VOIES = ['Orale', 'Intraveineuse', 'Intramusculaire', 'Sous-cutanée', 'Topique'];

let uid = 0;
const newMedication = () => ({
  id: `med-${++uid}`,
  medicament: '', dci: '', dosage: '', forme: '', voie: '',
  frequence: '', duree: '', dateDebut: '', dateFin: '', instructions: '',
});

export default function Prescription() {
  const navigate = useNavigate();
  const { notify } = useToast();
  const [patientId, setPatientId] = useState('');
  const [medecin, setMedecin] = useState('');
  const [medications, setMedications] = useState([newMedication()]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateMed = (id, field) => (e) => {
    const value = e.target.value;
    setMedications((meds) => meds.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const addMedication = () => setMedications((meds) => [...meds, newMedication()]);
  const removeMedication = (id) => setMedications((meds) => (meds.length > 1 ? meds.filter((m) => m.id !== id) : meds));

  const validate = () => {
    const next = {};
    if (!patientId) next.patientId = 'Sélectionnez un patient.';
    if (!medecin) next.medecin = 'Sélectionnez un médecin.';
    medications.forEach((m) => {
      if (!m.medicament.trim() || !m.dosage.trim() || !m.frequence.trim()) {
        next.medications = 'Chaque médicament doit avoir au minimum un nom, un dosage et une fréquence.';
      }
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      notify('Veuillez compléter les champs obligatoires.', 'error');
      return;
    }
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      notify('Prescription enregistrée.', 'success');
      navigate('/patients');
    }, 500);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Nouvelle prescription</div>
          <div className="page-subtitle">Prescrire un ou plusieurs médicaments pour un patient</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-body">
            <div className="form-grid">
              <div className="field">
                <label htmlFor="patientId">Patient<span className="required">*</span></label>
                <select id="patientId" className={'input' + (errors.patientId ? ' has-error' : '')} value={patientId} onChange={(e) => setPatientId(e.target.value)}>
                  <option value="">Sélectionner un patient...</option>
                  {patients.map((p) => <option key={p.id} value={p.id}>{p.prenom} {p.nom} — {p.ipp}</option>)}
                </select>
                {errors.patientId && <span className="error-text">{errors.patientId}</span>}
              </div>
              <div className="field">
                <label htmlFor="medecin">Médecin<span className="required">*</span></label>
                <select id="medecin" className={'input' + (errors.medecin ? ' has-error' : '')} value={medecin} onChange={(e) => setMedecin(e.target.value)}>
                  <option value="">Sélectionner...</option>
                  {medecins.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
                {errors.medecin && <span className="error-text">{errors.medecin}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="section-block-head">
          <span className="section-title">Médicaments</span>
        </div>
        {errors.medications && <div className="error-text" style={{ marginBottom: 10 }}>{errors.medications}</div>}

        {medications.map((m, idx) => (
          <div key={m.id} className="med-row">
            <div className="med-row-head">
              <span className="med-row-title">Médicament {idx + 1}</span>
              {medications.length > 1 && (
                <button type="button" className="remove-med-btn" onClick={() => removeMedication(m.id)}>
                  <IconTrash size={14} /> Supprimer
                </button>
              )}
            </div>
            <div className="form-grid cols-3">
              <div className="field">
                <label>Médicament<span className="required">*</span></label>
                <input className="input" value={m.medicament} onChange={updateMed(m.id, 'medicament')} placeholder="Ex : Amoxicilline" />
              </div>
              <div className="field">
                <label>DCI</label>
                <input className="input" value={m.dci} onChange={updateMed(m.id, 'dci')} placeholder="Dénomination commune internationale" />
              </div>
              <div className="field">
                <label>Dosage<span className="required">*</span></label>
                <input className="input" value={m.dosage} onChange={updateMed(m.id, 'dosage')} placeholder="Ex : 500 mg" />
              </div>
              <div className="field">
                <label>Forme</label>
                <select className="input" value={m.forme} onChange={updateMed(m.id, 'forme')}>
                  <option value="">Sélectionner...</option>
                  {FORMES.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Voie</label>
                <select className="input" value={m.voie} onChange={updateMed(m.id, 'voie')}>
                  <option value="">Sélectionner...</option>
                  {VOIES.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Fréquence<span className="required">*</span></label>
                <input className="input" value={m.frequence} onChange={updateMed(m.id, 'frequence')} placeholder="Ex : 3x / jour" />
              </div>
              <div className="field">
                <label>Durée</label>
                <input className="input" value={m.duree} onChange={updateMed(m.id, 'duree')} placeholder="Ex : 7 jours" />
              </div>
              <div className="field">
                <label>Date début</label>
                <input type="date" className="input" value={m.dateDebut} onChange={updateMed(m.id, 'dateDebut')} />
              </div>
              <div className="field">
                <label>Date fin</label>
                <input type="date" className="input" value={m.dateFin} onChange={updateMed(m.id, 'dateFin')} />
              </div>
              <div className="field span-2" style={{ gridColumn: '1 / -1' }}>
                <label>Instructions</label>
                <textarea className="input" value={m.instructions} onChange={updateMed(m.id, 'instructions')} placeholder="Ex : à prendre après les repas" />
              </div>
            </div>
          </div>
        ))}

        <button type="button" className="add-med-btn" onClick={addMedication}>
          <IconPlus size={16} /> Ajouter un médicament
        </button>

        <div className="form-actions" style={{ marginTop: 24 }}>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Annuler</button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting && <span className="loading-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />}
            Valider la prescription
          </button>
        </div>
      </form>
    </div>
  );
}
