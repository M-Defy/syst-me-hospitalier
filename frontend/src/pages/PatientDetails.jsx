import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPatientById, getPrescriptionsForPatient } from '../data/mockData';
import { IconEdit, IconPill, IconAdmission, IconEmpty, IconChevronLeft } from '../components/icons';

const STATUS_BADGE = {
  'Hospitalisé': 'badge-blue',
  'Critique': 'badge-red',
  'Sorti': 'badge-gray',
  'Maintenance': 'badge-orange',
};

const PRESCRIPTION_BADGE = {
  Active: 'badge-green',
  Terminée: 'badge-gray',
  Annulée: 'badge-red',
};

function initials(nom, prenom) {
  return `${prenom?.[0] || ''}${nom?.[0] || ''}`.toUpperCase();
}

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = getPatientById(id);
  const prescriptions = patient ? getPrescriptionsForPatient(patient.id) : [];

  if (!patient) {
    return (
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon"><IconEmpty size={24} /></div>
          <h4>Dossier introuvable</h4>
          <p>Ce patient n'existe pas ou a été retiré des données de démonstration.</p>
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
              <span className={'badge ' + (STATUS_BADGE[patient.statut] || 'badge-gray')}>{patient.statut}</span>
            </div>
            <div className="text-secondary text-mono" style={{ marginTop: 3, fontSize: 13 }}>{patient.ipp}</div>
          </div>
          <div className="record-actions">
            <button className="btn btn-secondary btn-sm"><IconEdit size={15} /> Modifier</button>
            <Link to="/prescriptions" className="btn btn-secondary btn-sm"><IconPill size={15} /> Nouvelle prescription</Link>
            <Link to="/admissions" className="btn btn-primary btn-sm"><IconAdmission size={15} /> Créer admission</Link>
          </div>
        </div>

        <div className="info-grid">
          <div><div className="info-item-label">Date de naissance</div><div className="info-item-value">{new Date(patient.naissance).toLocaleDateString('fr-FR')}</div></div>
          <div><div className="info-item-label">Sexe</div><div className="info-item-value">{patient.sexe === 'M' ? 'Masculin' : 'Féminin'}</div></div>
          <div><div className="info-item-label">Téléphone</div><div className="info-item-value">{patient.telephone}</div></div>
          <div><div className="info-item-label">Service</div><div className="info-item-value">{patient.service}</div></div>
          <div><div className="info-item-label">Chambre</div><div className="info-item-value">{patient.chambre}</div></div>
          <div><div className="info-item-label">Lit</div><div className="info-item-value">{patient.lit}</div></div>
          <div><div className="info-item-label">Admission</div><div className="info-item-value">{patient.admission ? new Date(patient.admission).toLocaleDateString('fr-FR') : '—'}</div></div>
          <div><div className="info-item-label">Groupe sanguin</div><div className="info-item-value">{patient.groupeSanguin || '—'}</div></div>
        </div>
      </div>

      <div className="two-col section-block">
        <div className="card">
          <div className="card-header"><span className="section-title">Informations médicales</span></div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <div className="info-item-label" style={{ marginBottom: 8 }}>Allergies</div>
              {patient.allergies?.length ? (
                <div className="tag-list">{patient.allergies.map((a) => <span key={a} className="tag-pill" style={{ color: 'var(--red-600)', background: 'var(--red-100)', border: 'none' }}>{a}</span>)}</div>
              ) : <span className="text-secondary" style={{ fontSize: 13 }}>Aucune allergie connue</span>}
            </div>
            <div>
              <div className="info-item-label" style={{ marginBottom: 8 }}>Antécédents</div>
              {patient.antecedents?.length ? (
                <div className="tag-list">{patient.antecedents.map((a) => <span key={a} className="tag-pill">{a}</span>)}</div>
              ) : <span className="text-secondary" style={{ fontSize: 13 }}>Aucun antécédent renseigné</span>}
            </div>
            <div>
              <div className="info-item-label" style={{ marginBottom: 8 }}>Traitements en cours</div>
              {patient.traitements?.length ? (
                <div className="tag-list">{patient.traitements.map((a) => <span key={a} className="tag-pill" style={{ color: 'var(--green-600)', background: 'var(--green-100)', border: 'none' }}>{a}</span>)}</div>
              ) : <span className="text-secondary" style={{ fontSize: 13 }}>Aucun traitement en cours</span>}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="section-title">Séjour actuel</span></div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div><div className="info-item-label">Service</div><div className="info-item-value">{patient.service}</div></div>
            <div><div className="info-item-label">Chambre / Lit</div><div className="info-item-value">{patient.chambre} — {patient.lit}</div></div>
            <div><div className="info-item-label">Admission</div><div className="info-item-value">{patient.admission ? new Date(patient.admission).toLocaleDateString('fr-FR') : '—'}</div></div>
            <div><div className="info-item-label">Statut</div><span className={'badge ' + (STATUS_BADGE[patient.statut] || 'badge-gray')}>{patient.statut}</span></div>
          </div>
        </div>
      </div>

      <div className="card section-block">
        <div className="card-header">
          <span className="section-title">Historique des prescriptions</span>
          <Link to="/prescriptions" className="btn btn-primary btn-sm">+ Nouvelle prescription</Link>
        </div>
        {prescriptions.length === 0 ? (
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
                  <th>Date</th><th>Médecin</th><th>Médicament</th><th>Dosage</th><th>Fréquence</th><th>Durée</th><th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((p) => (
                  <tr key={p.id}>
                    <td>{new Date(p.date).toLocaleDateString('fr-FR')}</td>
                    <td>{p.medecin}</td>
                    <td className="cell-primary">{p.medicament}</td>
                    <td>{p.dosage}</td>
                    <td>{p.frequence}</td>
                    <td>{p.duree}</td>
                    <td><span className={'badge ' + (PRESCRIPTION_BADGE[p.statut] || 'badge-gray')}>{p.statut}</span></td>
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
