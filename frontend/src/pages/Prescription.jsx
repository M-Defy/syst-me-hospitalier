import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listPatients } from '../api/patients';
import { createPrescription } from '../api/prescriptions';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { IconPlus, IconTrash } from '../components/icons';

let uid = 0;
const newMedication = () => ({
  id: `med-${++uid}`,
  medicament: '', posologie: '',
});

export default function Prescription() {
  const navigate = useNavigate();
  const { notify } = useToast();
  const { user } = useAuth();
  const [patientId, setPatientId] = useState('');
  const [patients, setPatients] = useState([]);
  const [medications, setMedications] = useState([newMedication()]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    listPatients()
      .then((data) => setPatients(Array.isArray(data) ? data : data.results || []))
      .catch(() => {});
  }, []);

  const updateMed = (id, field) => (e) => {
    const value = e.target.value;
    setMedications((meds) => meds.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const addMedication = () => setMedications((meds) => [...meds, newMedication()]);
  const removeMedication = (id) => setMedications((meds) => (meds.length > 1 ? meds.filter((m) => m.id !== id) : meds));

  const validate = () => {
    const next = {};
    if (!patientId) next.patientId = 'Sélectionnez un patient.';
    medications.forEach((m) => {
      if (!m.medicament.trim() || !m.posologie.trim()) {
        next.medications = 'Chaque médicament doit avoir un nom et une posologie.';
      }
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  if (user?.role !== 'MEDECIN') {
    return (
      <div className="card">
        <div className="empty-state">
          <h4>Accès restreint</h4>
          <p>Seul un médecin peut créer une prescription.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      notify('Veuillez compléter les champs obligatoires.', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      for (const m of medications) {
        await createPrescription({ patient: patientId, medicament: m.medicament, posologie: m.posologie });
      }
      notify('Prescription enregistrée.', 'success');
      navigate('/patients');
    } catch (err) {
      notify(err.response?.data?.detail || 'Erreur lors de l\'enregistrement de la prescription.', 'error');
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="field span-2">
                <label htmlFor="patientId">Patient<span className="required">*</span></label>
                <select id="patientId" className={'input' + (errors.patientId ? ' has-error' : '')} value={patientId} onChange={(e) => setPatientId(e.target.value)}>
                  <option value="">Sélectionner un patient...</option>
                  {patients.map((p) => <option key={p.id} value={p.id}>{p.prenom} {p.nom}</option>)}
                </select>
                {errors.patientId && <span className="error-text">{errors.patientId}</span>}
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
              <div className="field span-2">
                <label>Posologie<span className="required">*</span></label>
                <input className="input" value={m.posologie} onChange={updateMed(m.id, 'posologie')} placeholder="Ex : 500 mg, 3x / jour pendant 7 jours" />
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

