import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patients, beds, services, medecins } from '../data/mockData';
import { useToast } from '../components/Toast';

const TYPES = ['Urgence', 'Programmée', 'Transfert'];

const EMPTY = {
  patientId: '', type: '', date: '', heure: '', motif: '',
  service: '', chambre: '', litId: '', medecin: '',
};

export default function Admission() {
  const navigate = useNavigate();
  const { notify } = useToast();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => {
      const next = { ...f, [field]: value };
      if (field === 'service') next.litId = '';
      return next;
    });
  };

  const availableBeds = useMemo(
    () => beds.filter((b) => b.statut === 'Disponible' && (!form.service || b.service === form.service)),
    [form.service]
  );

  const selectedBed = beds.find((b) => b.id === form.litId);

  const validate = () => {
    const next = {};
    if (!form.patientId) next.patientId = 'Sélectionnez un patient.';
    if (!form.type) next.type = 'Le type d\'admission est requis.';
    if (!form.date) next.date = 'La date est requise.';
    if (!form.heure) next.heure = 'L\'heure est requise.';
    if (!form.motif.trim()) next.motif = 'Le motif est requis.';
    if (!form.service) next.service = 'Le service est requis.';
    if (!form.litId) next.litId = 'Sélectionnez un lit disponible.';
    if (!form.medecin) next.medecin = 'Le médecin responsable est requis.';
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
      notify('Admission enregistrée avec succès.', 'success');
      navigate('/patients');
    }, 500);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Nouvelle admission</div>
          <div className="page-subtitle">Enregistrer l'admission d'un patient dans un service</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-body">
            <div className="form-section-title"><span className="num">1</span> Patient</div>
            <div className="form-grid">
              <div className="field span-2">
                <label htmlFor="patientId">Sélection du patient<span className="required">*</span></label>
                <select id="patientId" className={'input' + (errors.patientId ? ' has-error' : '')} value={form.patientId} onChange={update('patientId')}>
                  <option value="">Sélectionner un patient...</option>
                  {patients.map((p) => <option key={p.id} value={p.id}>{p.prenom} {p.nom} — {p.ipp}</option>)}
                </select>
                {errors.patientId && <span className="error-text">{errors.patientId}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-body">
            <div className="form-section-title"><span className="num">2</span> Admission</div>
            <div className="form-grid cols-3">
              <div className="field">
                <label htmlFor="type">Type<span className="required">*</span></label>
                <select id="type" className={'input' + (errors.type ? ' has-error' : '')} value={form.type} onChange={update('type')}>
                  <option value="">Sélectionner...</option>
                  {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.type && <span className="error-text">{errors.type}</span>}
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
                <input id="motif" className={'input' + (errors.motif ? ' has-error' : '')} value={form.motif} onChange={update('motif')} placeholder="Ex : douleur thoracique aiguë" />
                {errors.motif && <span className="error-text">{errors.motif}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-body">
            <div className="form-section-title"><span className="num">3</span> Affectation</div>
            <div className="form-grid cols-3">
              <div className="field">
                <label htmlFor="service">Service<span className="required">*</span></label>
                <select id="service" className={'input' + (errors.service ? ' has-error' : '')} value={form.service} onChange={update('service')}>
                  <option value="">Sélectionner...</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service && <span className="error-text">{errors.service}</span>}
              </div>
              <div className="field span-2">
                <label htmlFor="lit">Lit disponible<span className="required">*</span></label>
                <select id="lit" className={'input' + (errors.litId ? ' has-error' : '')} value={form.litId} onChange={update('litId')}>
                  <option value="">
                    {availableBeds.length === 0 ? 'Aucun lit disponible dans ce service' : 'Sélectionner un lit...'}
                  </option>
                  {availableBeds.map((b) => (
                    <option key={b.id} value={b.id}>Chambre {b.chambre} — Lit {b.lit} ({b.service})</option>
                  ))}
                </select>
                {errors.litId && <span className="error-text">{errors.litId}</span>}
                {selectedBed && (
                  <span className="badge badge-green" style={{ width: 'fit-content', marginTop: 4 }}>
                    Lit {selectedBed.lit} — {selectedBed.statut}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-body">
            <div className="form-section-title"><span className="num">4</span> Médecin</div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="medecin">Médecin responsable<span className="required">*</span></label>
                <select id="medecin" className={'input' + (errors.medecin ? ' has-error' : '')} value={form.medecin} onChange={update('medecin')}>
                  <option value="">Sélectionner...</option>
                  {medecins.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
                {errors.medecin && <span className="error-text">{errors.medecin}</span>}
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
