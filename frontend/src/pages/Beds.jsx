import { useMemo, useState } from 'react';
import { beds, services } from '../data/mockData';
import { IconBed, IconEmpty } from '../components/icons';

const STATUS_META = {
  'Disponible': { dot: '🟢', badge: 'badge-green' },
  'Occupé': { dot: '🔴', badge: 'badge-red' },
  'Maintenance': { dot: '🟠', badge: 'badge-orange' },
};

export default function Beds() {
  const [service, setService] = useState('all');
  const [statut, setStatut] = useState('all');
  const [etage, setEtage] = useState('all');

  const floors = useMemo(() => [...new Set(beds.map((b) => b.etage))].sort((a, b) => a - b), []);

  const filtered = useMemo(() => beds.filter((b) =>
    (service === 'all' || b.service === service) &&
    (statut === 'all' || b.statut === statut) &&
    (etage === 'all' || b.etage === Number(etage))
  ), [service, statut, etage]);

  const counts = useMemo(() => ({
    total: beds.length,
    disponible: beds.filter((b) => b.statut === 'Disponible').length,
    occupe: beds.filter((b) => b.statut === 'Occupé').length,
    maintenance: beds.filter((b) => b.statut === 'Maintenance').length,
  }), []);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Disponibilité des lits</div>
          <div className="page-subtitle">Suivi en temps réel de l'occupation des lits par service</div>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card" style={{ '--accent': 'var(--blue-600)', '--accent-soft': 'var(--blue-100)' }}>
          <div className="stat-card-top"><div className="stat-icon"><IconBed size={19} /></div></div>
          <div className="stat-value">{counts.total}</div>
          <div className="stat-label">Total lits</div>
        </div>
        <div className="stat-card" style={{ '--accent': 'var(--green-600)', '--accent-soft': 'var(--green-100)' }}>
          <div className="stat-card-top"><div className="stat-icon"><IconBed size={19} /></div></div>
          <div className="stat-value">{counts.disponible}</div>
          <div className="stat-label">Disponibles</div>
        </div>
        <div className="stat-card" style={{ '--accent': 'var(--red-600)', '--accent-soft': 'var(--red-100)' }}>
          <div className="stat-card-top"><div className="stat-icon"><IconBed size={19} /></div></div>
          <div className="stat-value">{counts.occupe}</div>
          <div className="stat-label">Occupés</div>
        </div>
        <div className="stat-card" style={{ '--accent': 'var(--orange-600)', '--accent-soft': 'var(--orange-100)' }}>
          <div className="stat-card-top"><div className="stat-icon"><IconBed size={19} /></div></div>
          <div className="stat-value">{counts.maintenance}</div>
          <div className="stat-label">Maintenance</div>
        </div>
      </div>

      <div className="card section-block">
        <div className="card-body" style={{ paddingBottom: 16 }}>
          <div className="filters-row">
            <select className="select-filter" value={service} onChange={(e) => setService(e.target.value)} aria-label="Filtrer par service">
              <option value="all">Tous les services</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="select-filter" value={statut} onChange={(e) => setStatut(e.target.value)} aria-label="Filtrer par statut">
              <option value="all">Tous les statuts</option>
              <option value="Disponible">Disponible</option>
              <option value="Occupé">Occupé</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <select className="select-filter" value={etage} onChange={(e) => setEtage(e.target.value)} aria-label="Filtrer par étage">
              <option value="all">Tous les étages</option>
              {floors.map((f) => <option key={f} value={f}>Étage {f}</option>)}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><IconEmpty size={24} /></div>
            <h4>Aucun lit trouvé</h4>
            <p>Ajustez les filtres pour voir davantage de résultats.</p>
          </div>
        ) : (
          <div className="card-body">
            <div className="beds-grid">
              {filtered.map((b) => {
                const meta = STATUS_META[b.statut];
                return (
                  <div key={b.id} className="bed-card">
                    <div className="bed-card-top">
                      <div>
                        <div className="bed-card-room">Chambre {b.chambre}</div>
                        <div className="bed-card-bed">Lit {b.lit}</div>
                      </div>
                      <span className={'badge ' + meta.badge}>{meta.dot} {b.statut}</span>
                    </div>
                    <div className="bed-card-meta">
                      <span>Service : <b>{b.service}</b></span>
                      <span>Étage : <b>{b.etage}</b></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
