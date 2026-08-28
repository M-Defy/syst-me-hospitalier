import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { createPatient } from '../api/patients';

const EMPTY = {
  nom: '', prenom: '', date_naissance: '', sexe: '', adresse: '', contact_urgence: '',
};

export default function CreatePatient() {
  const navigate = useNavigate();
  const { notify } = useToast();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.nom.trim()) next.nom = 'Le nom est requis.';
    if (!form.prenom.trim()) next.prenom = 'Le prénom est requis.';
    if (!form.date_naissance) next.date_naissance = 'La date de naissance est requise.';
    if (!form.sexe) next.sexe = 'Le sexe est requis.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      notify('Veuillez corriger les champs en erreur.', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      await createPatient(form);
      notify('Patient créé avec succès.', 'success');
      navigate('/patients');
    } catch (err) {
      notify(err.response?.data?.detail || 'Erreur lors de la création du patient.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Nouveau patient</div>
          <div className="page-subtitle">Créer un dossier patient informatisé</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-body">
            <div className="form-section-title"><span className="num">1</span> Informations personnelles</div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="nom">Nom<span className="required">*</span></label>
                <input id="nom" className={'input' + (errors.nom ? ' has-error' : '')} value={form.nom} onChange={update('nom')} placeholder="Andriamahefa" />
                {errors.nom && <span className="error-text">{errors.nom}</span>}
              </div>
              <div className="field">
                <label htmlFor="prenom">Prénom<span className="required">*</span></label>
                <input id="prenom" className={'input' + (errors.prenom ? ' has-error' : '')} value={form.prenom} onChange={update('prenom')} placeholder="Sitraka" />
                {errors.prenom && <span className="error-text">{errors.prenom}</span>}
              </div>
              <div className="field">
                <label htmlFor="date_naissance">Date de naissance<span className="required">*</span></label>
                <input id="date_naissance" type="date" className={'input' + (errors.date_naissance ? ' has-error' : '')} value={form.date_naissance} onChange={update('date_naissance')} />
                {errors.date_naissance && <span className="error-text">{errors.date_naissance}</span>}
              </div>
              <div className="field">
                <label htmlFor="sexe">Sexe<span className="required">*</span></label>
                <select id="sexe" className={'input' + (errors.sexe ? ' has-error' : '')} value={form.sexe} onChange={update('sexe')}>
                  <option value="">Sélectionner...</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                  <option value="AUTRE">Autre</option>
                </select>
                {errors.sexe && <span className="error-text">{errors.sexe}</span>}
              </div>
              <div className="field span-2">
                <label htmlFor="adresse">Adresse</label>
                <input id="adresse" className="input" value={form.adresse} onChange={update('adresse')} placeholder="Lot II M 45, Antananarivo" />
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-body">
            <div className="form-section-title"><span className="num">2</span> Contact d'urgence</div>
            <div className="form-grid">
              <div className="field span-2">
                <label htmlFor="contact_urgence">Contact d'urgence</label>
                <input id="contact_urgence" className="input" value={form.contact_urgence} onChange={update('contact_urgence')} placeholder="Nom et téléphone du contact" />
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/patients')}>Annuler</button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting && <span className="loading-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />}
            Enregistrer le patient
          </button>
        </div>
      </form>
    </div>
  );
}

