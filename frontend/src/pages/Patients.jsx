import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { patients, services } from '../data/mockData';
import { IconSearch, IconPlus, IconEmpty } from '../components/icons';

const STATUS_BADGE = {
  'Hospitalisé': 'badge-blue',
  'Critique': 'badge-red',
  'Sorti': 'badge-gray',
  'Maintenance': 'badge-orange',
};

function initials(nom, prenom) {
  return `${prenom?.[0] || ''}${nom?.[0] || ''}`.toUpperCase();
}

function age(naissance) {
  const diff = Date.now() - new Date(naissance).getTime();
  return Math.floor(diff / (365.25 * 24 * 3600 * 1000));
}

export default function Patients() {
  const [query, setQuery] = useState('');
  const [service, setService] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return patients.filter((p) => {
      const matchesQuery =
        !q ||
        p.nom.toLowerCase().includes(q) ||
        p.prenom.toLowerCase().includes(q) ||
        p.ipp.toLowerCase().includes(q);
      const matchesService = service === 'all' || p.service === service;
      return matchesQuery && matchesService;
    });
  }, [query, service]);

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
                placeholder="Rechercher par nom, prénom ou IPP..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Rechercher un patient"
              />
            </div>
            <select className="select-filter" value={service} onChange={(e) => setService(e.target.value)} aria-label="Filtrer par service">
              <option value="all">Tous les services</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><IconEmpty size={24} /></div>
            <h4>Aucun patient trouvé</h4>
            <p>Modifiez votre recherche ou vos filtres, ou créez un nouveau dossier patient.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>IPP</th>
                  <th>Patient</th>
                  <th>Date de naissance</th>
                  <th>Sexe</th>
                  <th>Téléphone</th>
                  <th>Service</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td><span className="text-mono">{p.ipp}</span></td>
                    <td>
                      <div className="table-avatar-cell">
                        <div className="mini-avatar">{initials(p.nom, p.prenom)}</div>
                        <div>
                          <div className="cell-primary">{p.prenom} {p.nom}</div>
                          <div className="cell-secondary">{age(p.naissance)} ans</div>
                        </div>
                      </div>
                    </td>
                    <td>{new Date(p.naissance).toLocaleDateString('fr-FR')}</td>
                    <td>{p.sexe}</td>
                    <td>{p.telephone}</td>
                    <td>{p.service}</td>
                    <td><span className={'badge ' + (STATUS_BADGE[p.statut] || 'badge-gray')}>{p.statut}</span></td>
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
