import { useAuth } from '../context/AuthContext';
import { patients, beds, admissions, prescriptionsData, recentActivity, alerts } from '../data/mockData';
import {
  IconUsers, IconAdmission, IconBed, IconPill,
  IconAlertTriangle, IconActivity, IconDoorOut, IconUsers as IconPatientPlus,
} from '../components/icons';

const ACTIVITY_STYLES = {
  admission: { icon: IconAdmission, bg: 'var(--blue-100)', color: 'var(--blue-700)' },
  prescription: { icon: IconPill, bg: 'var(--green-100)', color: 'var(--green-600)' },
  sortie: { icon: IconDoorOut, bg: 'var(--orange-100)', color: 'var(--orange-600)' },
  patient: { icon: IconPatientPlus, bg: 'var(--blue-100)', color: 'var(--blue-700)' },
};

export default function Dashboard() {
  const { user } = useAuth();

  const availableBeds = beds.filter((b) => b.statut === 'Disponible').length;
  const activePrescriptions = prescriptionsData.filter((p) => p.statut === 'Active').length;

  const stats = [
    { label: 'Patients', value: patients.length.toLocaleString('fr-FR'), sub: 'Dossiers actifs enregistrés', icon: IconUsers, accent: 'var(--blue-600)', accentSoft: 'var(--blue-100)', trend: '+4.2%', trendDir: 'up' },
    { label: 'Admissions', value: admissions.length, sub: 'Cette semaine', icon: IconAdmission, accent: 'var(--green-600)', accentSoft: 'var(--green-100)', trend: '+2', trendDir: 'up' },
    { label: 'Lits disponibles', value: `${availableBeds} / ${beds.length}`, sub: 'Sur l\'ensemble des services', icon: IconBed, accent: 'var(--orange-600)', accentSoft: 'var(--orange-100)', trend: 'Stable', trendDir: 'flat' },
    { label: 'Prescriptions actives', value: activePrescriptions, sub: 'En cours de traitement', icon: IconPill, accent: 'var(--blue-600)', accentSoft: 'var(--blue-100)', trend: '+6', trendDir: 'up' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Bonjour, Dr. {user?.nom} 👋</div>
          <div className="page-subtitle">Voici un aperçu de l'activité hospitalière.</div>
        </div>
      </div>

      <div className="stat-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card" style={{ '--accent': s.accent, '--accent-soft': s.accentSoft }}>
            <div className="stat-card-top">
              <div className="stat-icon"><s.icon size={19} /></div>
              <span className={'stat-trend ' + s.trendDir}>{s.trend}</span>
            </div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="two-col section-block">
        <div className="card">
          <div className="card-header">
            <span className="section-title">Activité récente</span>
            <IconActivity size={17} color="var(--ink-300)" />
          </div>
          <div className="card-body">
            <ul>
              {recentActivity.map((a) => {
                const style = ACTIVITY_STYLES[a.type] || ACTIVITY_STYLES.patient;
                const Icon = style.icon;
                return (
                  <li key={a.id} className="list-item">
                    <div className="list-item-icon" style={{ background: style.bg, color: style.color }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="list-item-title">{a.text}</div>
                    </div>
                    <div className="list-item-time">{a.time}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="section-title">Alertes</span>
            <IconAlertTriangle size={17} color="var(--orange-600)" />
          </div>
          <div className="card-body">
            {alerts.map((a) => (
              <div key={a.id} className={'alert-item' + (a.level === 'critical' ? ' critical' : '')}>
                <IconAlertTriangle size={16} color={a.level === 'critical' ? 'var(--red-600)' : 'var(--orange-600)'} />
                <div>
                  <div className="alert-item-text">{a.text}</div>
                  <div className="alert-item-sub">{a.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
