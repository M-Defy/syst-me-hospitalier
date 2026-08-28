import { useEffect, useMemo, useState } from 'react';
import { listLits } from '../api/admissions';
import { IconBed, IconEmpty } from '../components/icons';

const STATUS_META = {
  'LIBRE': { dot: '🟢', badge: 'badge-green', label: 'Libre' },
  'OCCUPE': { dot: '🔴', badge: 'badge-red', label: 'Occupé' },
};

export default function Beds() {
  const [service, setService] = useState('all');
  const [statut, setStatut] = useState('all');
  const [lits, setLits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    listLits()
      .then((data) => setLits(Array.isArray(data) ? data : data.results || []))
      .catch(() => setError('Impossible de charger la liste des lits.'))
      .finally(() => setIsLoading(false));
  }, []);

  const services = useMemo(() => [...new Set(lits.map((l) => l.service))].sort(), [lits]);

  const filtered = useMemo(() => lits.filter((l) =>
    (service === 'all' || l.service === service) &&
    (statut === 'all' || l.statut === statut)
  ), [lits, service, statut]);

  const counts = useMemo(() => ({
    total: lits.length,
    disponible: lits.filter((l) => l.statut === 'LIBRE').length,
    occupe: lits.filter((l) => l.statut === 'OCCUPE').length,
  }), [lits]);

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
              <option value="LIBRE">Libre</option>
              <option value="OCCUPE">Occupé</option>
            </select>
          </div>
        </div>

        {error && <div className="form-error-banner" role="alert" style={{ margin: '0 20px 16px' }}>{error}</div>}

        {isLoading ? (
          <div className="empty-state"><span className="loading-spinner" /></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><IconEmpty size={24} /></div>
            <h4>Aucun lit trouvé</h4>
            <p>Ajustez les filtres pour voir davantage de résultats.</p>
          </div>
        ) : (
          <div className="card-body">
            <div className="beds-grid">
              {filtered.map((l) => {
                const meta = STATUS_META[l.statut] || STATUS_META.LIBRE;
                return (
                  <div key={l.id} className="bed-card">
                    <div className="bed-card-top">
                      <div>
                        <div className="bed-card-room">Lit {l.numero}</div>
                      </div>
                      <span className={'badge ' + meta.badge}>{meta.dot} {meta.label}</span>
                    </div>
                    <div className="bed-card-meta">
                      <span>Service : <b>{l.service}</b></span>
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

