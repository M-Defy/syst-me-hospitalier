import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPatient } from '../api/patients';
import { listPrescriptions } from '../api/prescriptions';
import { useAuth } from '../context/AuthContext';
import { IconPill, IconAdmission, IconEmpty, IconChevronLeft } from '../components/icons';

const PRESCRIPTION_BADGE = {
  ACTIVE: 'badge-green',
  ANNULEE: 'badge-red',
};

function initials(nom, prenom) {
  return `${prenom?.[0] || ''}${nom?.[0] || ''}`.toUpperCase();
}

const CAN_SEE_HISTORY = ['MEDECIN', 'INFIRMIER'];

export default function PatientDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    getPatient(id)
      .then((data) => {
        if (cancelled) return;
        setPatient(data);
        if (CAN_SEE_HISTORY.includes(user?.role)) {
          return listPrescriptions({ patient: id }).then((list) => {
            if (!cancelled) setPrescriptions(Array.isArray(list) ? list : list.results || []);
          });
        }
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => { cancelled = true; };
  }, [id, user]);

  if (isLoading) {
    return (
      <div className="card"><div className="empty-state"><span className="loading-spinner" /></div></div>
    );
  }

  if (notFound || !patient) {
    return (
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon"><IconEmpty size={24} /></div>
          <h4>Dossier introuvable</h4>
          <p>Ce patient n'existe pas ou vous n'avez pas les droits pour le consulter.</p>
          <Link to="/patients" className="btn btn-secondary btn-sm" style={{ marginTop: 14 }}>
            <IconChevronLeft size={15} /> Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link to="/patients" className="text-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
        <IconChevronLeft size={15} /> Retour aux patients
      </Link>

      <div className="card card-pad">
        <div className="record-header">
          <div className="record-avatar">{initials(patient.nom, patient.prenom)}</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>{patient.prenom} {patient.nom}</h2>
            </div>
            <div className="text-secondary text-mono" style={{ marginTop: 3, fontSize: 13 }}>Dossier #{patient.id}</div>
          </div>
          <div className="record-actions">
            {user?.role === 'MEDECIN' && (
              <Link to="/prescriptions" className="btn btn-secondary btn-sm"><IconPill size={15} /> Nouvelle prescription</Link>
            )}
            <Link to="/admissions" className="btn btn-primary btn-sm"><IconAdmission size={15} /> Créer admission</Link>
          </div>
        </div>

        <div className="info-grid">
          <div><div className="info-item-label">Date de naissance</div><div className="info-item-value">{patient.date_naissance ? new Date(patient.date_naissance).toLocaleDateString('fr-FR') : '—'}</div></div>
          <div><div className="info-item-label">Sexe</div><div className="info-item-value">{patient.sexe === 'M' ? 'Masculin' : patient.sexe === 'F' ? 'Féminin' : 'Autre'}</div></div>
          <div><div className="info-item-label">Adresse</div><div className="info-item-value">{patient.adresse || '—'}</div></div>
          <div><div className="info-item-label">Contact d'urgence</div><div className="info-item-value">{patient.contact_urgence || '—'}</div></div>
          <div><div className="info-item-label">Créé le</div><div className="info-item-value">{patient.date_creation ? new Date(patient.date_creation).toLocaleString('fr-FR') : '—'}</div></div>
          <div><div className="info-item-label">Dernière modification</div><div className="info-item-value">{patient.date_modification ? new Date(patient.date_modification).toLocaleString('fr-FR') : '—'}</div></div>
        </div>
      </div>

      <div className="card section-block">
        <div className="card-header">
          <span className="section-title">Historique des prescriptions</span>
          {user?.role === 'MEDECIN' && <Link to="/prescriptions" className="btn btn-primary btn-sm">+ Nouvelle prescription</Link>}
        </div>
        {!CAN_SEE_HISTORY.includes(user?.role) ? (
          <div className="empty-state">
            <div className="empty-state-icon"><IconPill size={22} /></div>
            <h4>Accès restreint</h4>
            <p>L'historique médical est réservé au personnel soignant (médecin, infirmier).</p>
          </div>
        ) : prescriptions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><IconPill size={22} /></div>
            <h4>Aucune prescription enregistrée</h4>
            <p>Les prescriptions de ce patient apparaîtront ici.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th><th>Médicament</th><th>Posologie</th><th>Statut</th><th>Motif d'annulation</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((p) => (
                  <tr key={p.id}>
                    <td>{new Date(p.date_prescription).toLocaleDateString('fr-FR')}</td>
                    <td className="cell-primary">{p.medicament}</td>
                    <td>{p.posologie}</td>
                    <td><span className={'badge ' + (PRESCRIPTION_BADGE[p.statut] || 'badge-gray')}>{p.statut}</span></td>
                    <td>{p.motif_annulation || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

