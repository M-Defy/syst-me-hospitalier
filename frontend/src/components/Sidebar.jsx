import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  IconHome, IconUsers, IconAdmission, IconBed, IconPill, IconDoorOut,
  IconSettings, IconChevronLeft, IconLogOut,
} from './icons';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: IconHome },
  { to: '/patients', label: 'Patients', icon: IconUsers },
  { to: '/admissions', label: 'Admissions', icon: IconAdmission },
  { to: '/lits', label: 'Lits', icon: IconBed },
  { to: '/prescriptions', label: 'Prescriptions', icon: IconPill },
  { to: '/sorties', label: 'Sorties', icon: IconDoorOut },
];

function initials(name = '') {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  const { user, logout } = useAuth();

  return (
    <>
      <aside className="sidebar">
        <button className="sidebar-collapse-btn" onClick={onToggleCollapse} aria-label={collapsed ? 'Étendre le menu' : 'Réduire le menu'}>
          <IconChevronLeft size={14} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>

        <div className="sidebar-brand">
          <div className="sidebar-brand-mark">SIH</div>
          <div className="sidebar-brand-text">
            <div className="sidebar-brand-name">SIH Hospital</div>
            <div className="sidebar-brand-sub">Système d'Information Hospitalier</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Navigation</div>
          <ul>
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onCloseMobile}
                  className={({ isActive }) => 'sidebar-link' + (isActive ? ' is-active' : '')}
                >
                  <span className="sidebar-link-icon"><Icon size={19} /></span>
                  <span className="sidebar-link-label">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="sidebar-section-label">Système</div>
          <ul>
            <li>
              <a className="sidebar-link" onClick={(e) => e.preventDefault()} href="#parametres" aria-disabled="true">
                <span className="sidebar-link-icon"><IconSettings size={19} /></span>
                <span className="sidebar-link-label">Paramètres</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{initials(user?.nom || 'U')}</div>
            <div className="sidebar-user-meta">
              <div className="sidebar-user-name">Dr. {user?.nom}</div>
              <div className="sidebar-user-role">{user?.role}</div>
            </div>
          </div>
          <button className="sidebar-logout" onClick={logout}>
            <IconLogOut size={16} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
      <div className={'sidebar-backdrop' + (mobileOpen ? ' is-visible' : '')} onClick={onCloseMobile} />
    </>
  );
}
