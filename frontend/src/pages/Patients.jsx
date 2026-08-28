import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { listPatients } from '../api/patients';
import { IconSearch, IconPlus, IconEmpty } from '../components/icons';

function initials(nom, prenom) {
  return `${prenom?.[0] || ''}${nom?.[0] || ''}`.toUpperCase();
}

function age(naissance) {
  if (!naissance) return '—';
  const diff = Date.now() - new Date(naissance).getTime();
  return Math.floor(diff / (365.25 * 24 * 3600 * 1000));
}

export default function Patients() {
  const [query, setQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError('');
    const handle = window.setTimeout(() => {
      listPatients(query ? { search: query } : {})
        .then((data) => {
          if (!cancelled) setPatients(Array.isArray(data) ? data : data.results || []);
        })
        .catch(() => {
          if (!cancelled) setError('Impossible de charger la liste des patients.');
        })
        .finally(() => {
          if (!cancelled) setIsLoading(false);
        });
    }, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [query]);

  const filtered = useMemo(() => patients, [patients]);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Patients</div>
          <div className="page-subtitle">Gestion du dossier patient informatisé</div>
        </div>
        <Link to="/patients/nouveau" className="btn btn-primary">
          <IconPlus size={16} /> Nouveau patient
        </Link>
      </div>

      <div className="card">
        <div className="card-body" style={{ paddingBottom: 16 }}>
          <div className="filters-row">
            <div className="search-input-wrap">
              <IconSearch size={16} />
              <input
                type="text"
                placeholder="Rechercher par nom ou prénom..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Rechercher un patient"
              />
            </div>
          </div>
        </div>

        {error && <div className="form-error-banner" role="alert" style={{ margin: '0 20px 16px' }}>{error}</div>}

        {isLoading ? (
          <div className="empty-state">
            <span className="loading-spinner" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><IconEmpty size={24} /></div>
            <h4>Aucun patient trouvé</h4>
            <p>Modifiez votre recherche, ou créez un nouveau dossier patient.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date de naissance</th>
                  <th>Sexe</th>
                  <th>Contact d'urgence</th>
                  <th>Adresse</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="table-avatar-cell">
                        <div className="mini-avatar">{initials(p.nom, p.prenom)}</div>
                        <div>
                          <div className="cell-primary">{p.prenom} {p.nom}</div>
                          <div className="cell-secondary">{age(p.date_naissance)} ans</div>
                        </div>
                      </div>
                    </td>
                    <td>{p.date_naissance ? new Date(p.date_naissance).toLocaleDateString('fr-FR') : '—'}</td>
                    <td>{p.sexe}</td>
                    <td>{p.contact_urgence || '—'}</td>
                    <td>{p.adresse || '—'}</td>
                    <td>
                      <Link to={`/patients/${p.id}`} className="btn btn-secondary btn-sm">Voir dossier</Link>
                    </td>
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

