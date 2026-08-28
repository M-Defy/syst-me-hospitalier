import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';

const EMPTY = {
  nom: '', prenom: '', naissance: '', sexe: '', telephone: '', email: '', adresse: '',
  ipp: '', contact: '', telephoneContact: '',
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
    if (!form.naissance) next.naissance = 'La date de naissance est requise.';
    if (!form.sexe) next.sexe = 'Le sexe est requis.';
    if (!form.telephone.trim()) next.telephone = 'Le téléphone est requis.';
    else if (!/^[0-9+ ]{7,}$/.test(form.telephone.trim())) next.telephone = 'Numéro de téléphone invalide.';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Adresse email invalide.';
    if (!form.ipp.trim()) next.ipp = 'L\'IPP est requis.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      notify('Veuillez corriger les champs en erreur.', 'error');
      return;
    }
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      notify('Patient créé avec succès.', 'success');
      navigate('/patients');
    }, 500);
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
                <label htmlFor="naissance">Date de naissance<span className="required">*</span></label>
                <input id="naissance" type="date" className={'input' + (errors.naissance ? ' has-error' : '')} value={form.naissance} onChange={update('naissance')} />
                {errors.naissance && <span className="error-text">{errors.naissance}</span>}
              </div>
              <div className="field">
                <label htmlFor="sexe">Sexe<span className="required">*</span></label>
                <select id="sexe" className={'input' + (errors.sexe ? ' has-error' : '')} value={form.sexe} onChange={update('sexe')}>
                  <option value="">Sélectionner...</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
                {errors.sexe && <span className="error-text">{errors.sexe}</span>}
              </div>
              <div className="field">
                <label htmlFor="telephone">Téléphone<span className="required">*</span></label>
                <input id="telephone" className={'input' + (errors.telephone ? ' has-error' : '')} value={form.telephone} onChange={update('telephone')} placeholder="034 12 345 67" />
                {errors.telephone && <span className="error-text">{errors.telephone}</span>}
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" className={'input' + (errors.email ? ' has-error' : '')} value={form.email} onChange={update('email')} placeholder="patient@mail.mg" />
                {errors.email && <span className="error-text">{errors.email}</span>}
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
            <div className="form-section-title"><span className="num">2</span> Informations administratives</div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="ipp">IPP<span className="required">*</span></label>
                <input id="ipp" className={'input' + (errors.ipp ? ' has-error' : '')} value={form.ipp} onChange={update('ipp')} placeholder="IPP-24013" />
                <span className="field-hint">Identifiant permanent du patient</span>
                {errors.ipp && <span className="error-text">{errors.ipp}</span>}
              </div>
              <div className="field">
                <label htmlFor="contact">Personne à contacter</label>
                <input id="contact" className="input" value={form.contact} onChange={update('contact')} placeholder="Nom du contact" />
              </div>
              <div className="field">
                <label htmlFor="telephoneContact">Téléphone du contact</label>
                <input id="telephoneContact" className="input" value={form.telephoneContact} onChange={update('telephoneContact')} placeholder="032 00 000 00" />
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
