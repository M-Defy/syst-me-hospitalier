import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { listPatients } from '../api/patients';
import { listLits, listSejours } from '../api/admissions';
import { listPrescriptions } from '../api/prescriptions';
import {
  IconUsers, IconAdmission, IconBed, IconPill,
} from '../components/icons';

const CAN_SEE_PRESCRIPTIONS = ['MEDECIN', 'INFIRMIER'];

export default function Dashboard() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [lits, setLits] = useState([]);
  const [sejours, setSejours] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    listPatients().then((data) => setPatients(Array.isArray(data) ? data : data.results || [])).catch(() => {});
    listLits().then((data) => setLits(Array.isArray(data) ? data : data.results || [])).catch(() => {});
    listSejours({ statut: 'EN_COURS' }).then((data) => setSejours(Array.isArray(data) ? data : data.results || [])).catch(() => {});
    if (CAN_SEE_PRESCRIPTIONS.includes(user?.role)) {
      listPrescriptions({ statut: 'ACTIVE' }).then((data) => setPrescriptions(Array.isArray(data) ? data : data.results || [])).catch(() => {});
    }
  }, [user]);

  const availableBeds = lits.filter((l) => l.statut === 'LIBRE').length;

  const stats = [
    { label: 'Patients', value: patients.length.toLocaleString('fr-FR'), sub: 'Dossiers actifs enregistrés', icon: IconUsers, accent: 'var(--blue-600)', accentSoft: 'var(--blue-100)' },
    { label: 'Séjours en cours', value: sejours.length, sub: 'Patients hospitalisés', icon: IconAdmission, accent: 'var(--green-600)', accentSoft: 'var(--green-100)' },
    { label: 'Lits disponibles', value: `${availableBeds} / ${lits.length}`, sub: 'Sur l\'ensemble des services', icon: IconBed, accent: 'var(--orange-600)', accentSoft: 'var(--orange-100)' },
    ...(CAN_SEE_PRESCRIPTIONS.includes(user?.role)
      ? [{ label: 'Prescriptions actives', value: prescriptions.length, sub: 'En cours de traitement', icon: IconPill, accent: 'var(--blue-600)', accentSoft: 'var(--blue-100)' }]
      : []),
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Bonjour, {user?.first_name || user?.username} 👋</div>
          <div className="page-subtitle">Voici un aperçu de l'activité hospitalière.</div>
        </div>
      </div>

      <div className="stat-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card" style={{ '--accent': s.accent, '--accent-soft': s.accentSoft }}>
            <div className="stat-card-top">
              <div className="stat-icon"><s.icon size={19} /></div>
            </div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

