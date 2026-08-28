import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listPatients } from '../api/patients';
import { listLitsDisponibles, createSejour } from '../api/admissions';
import { useToast } from '../components/Toast';

const EMPTY = { patient: '', lit: '' };

export default function Admission() {
  const navigate = useNavigate();
  const { notify } = useToast();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patients, setPatients] = useState([]);
  const [availableBeds, setAvailableBeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([listPatients(), listLitsDisponibles()])
      .then(([patientsData, litsData]) => {
        setPatients(Array.isArray(patientsData) ? patientsData : patientsData.results || []);
        setAvailableBeds(Array.isArray(litsData) ? litsData : litsData.results || []);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.patient) next.patient = 'Sélectionnez un patient.';
    if (!form.lit) next.lit = 'Sélectionnez un lit disponible.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      notify('Veuillez compléter les champs obligatoires.', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      await createSejour({ patient: form.patient, lit: form.lit });
      notify('Admission enregistrée avec succès.', 'success');
      navigate('/patients');
    } catch (err) {
      const detail = err.response?.data?.non_field_errors?.[0] || err.response?.data?.detail || 'Erreur lors de la création de l\'admission.';
      notify(detail, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Nouvelle admission</div>
          <div className="page-subtitle">Enregistrer l'admission d'un patient dans un lit disponible</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-body">
            <div className="form-section-title"><span className="num">1</span> Patient</div>
            <div className="form-grid">
              <div className="field span-2">
                <label htmlFor="patient">Sélection du patient<span className="required">*</span></label>
                <select id="patient" className={'input' + (errors.patient ? ' has-error' : '')} value={form.patient} onChange={update('patient')} disabled={isLoading}>
                  <option value="">Sélectionner un patient...</option>
                  {patients.map((p) => <option key={p.id} value={p.id}>{p.prenom} {p.nom}</option>)}
                </select>
                {errors.patient && <span className="error-text">{errors.patient}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-body">
            <div className="form-section-title"><span className="num">2</span> Affectation d'un lit</div>
            <div className="form-grid">
              <div className="field span-2">
                <label htmlFor="lit">Lit disponible<span className="required">*</span></label>
                <select id="lit" className={'input' + (errors.lit ? ' has-error' : '')} value={form.lit} onChange={update('lit')} disabled={isLoading}>
                  <option value="">
                    {availableBeds.length === 0 ? 'Aucun lit disponible' : 'Sélectionner un lit...'}
                  </option>
                  {availableBeds.map((b) => (
                    <option key={b.id} value={b.id}>Lit {b.numero} ({b.service})</option>
                  ))}
                </select>
                {errors.lit && <span className="error-text">{errors.lit}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Annuler</button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting && <span className="loading-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />}
            Enregistrer l'admission
          </button>
        </div>
      </form>
    </div>
  );
}

