import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listSejours, sortirSejour } from '../api/admissions';
import { useToast } from '../components/Toast';
import Modal from '../components/Modal';

export default function Sortie() {
  const navigate = useNavigate();
  const { notify } = useToast();
  const [sejours, setSejours] = useState([]);
  const [sejourId, setSejourId] = useState('');
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listSejours({ statut: 'EN_COURS' })
      .then((data) => setSejours(Array.isArray(data) ? data : data.results || []))
      .finally(() => setIsLoading(false));
  }, []);

  const selectedSejour = sejours.find((s) => String(s.id) === String(sejourId));

  const validate = () => {
    const next = {};
    if (!sejourId) next.sejourId = 'Sélectionnez un séjour en cours.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleReview = (e) => {
    e.preventDefault();
    if (!validate()) {
      notify('Veuillez sélectionner un séjour.', 'error');
      return;
    }
    setShowConfirm(true);
  };

  const confirmSortie = async () => {
    setIsSubmitting(true);
    try {
      await sortirSejour(sejourId);
      notify('Sortie validée avec succès.', 'success');
      navigate('/patients');
    } catch (err) {
      notify(err.response?.data?.error || 'Erreur lors de la validation de la sortie.', 'error');
    } finally {
      setIsSubmitting(false);
      setShowConfirm(false);
    }
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
                <label htmlFor="sejourId">Séjour en cours<span className="required">*</span></label>
                <select id="sejourId" className={'input' + (errors.sejourId ? ' has-error' : '')} value={sejourId} onChange={(e) => setSejourId(e.target.value)} disabled={isLoading}>
                  <option value="">
                    {isLoading ? 'Chargement...' : sejours.length === 0 ? 'Aucun séjour en cours' : 'Sélectionner un séjour...'}
                  </option>
                  {sejours.map((s) => (
                    <option key={s.id} value={s.id}>
                      Séjour #{s.id} — Patient #{s.patient} — Lit {s.lit ?? '—'}
                    </option>
                  ))}
                </select>
                {errors.sejourId && <span className="error-text">{errors.sejourId}</span>}
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
            Vous êtes sur le point de valider la sortie du séjour <b>#{selectedSejour?.id}</b>
            (patient #{selectedSejour?.patient}).
            <br /><br />
            Cette action mettra à jour le statut du séjour et libérera réellement le lit associé.
          </div>
        </Modal>
      )}
    </div>
  );
}

