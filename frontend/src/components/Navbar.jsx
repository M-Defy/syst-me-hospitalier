import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IconMenu, IconSearch, IconBell } from './icons';

function initials(name = '') {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

export default function Navbar({ title, breadcrumb, onOpenMobileMenu, showSearch }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <button className="navbar-menu-btn" onClick={onOpenMobileMenu} aria-label="Ouvrir le menu">
        <IconMenu size={20} />
      </button>

      <div>
        <div className="navbar-title">{title}</div>
        {breadcrumb && <div className="navbar-breadcrumb">{breadcrumb}</div>}
      </div>

      {showSearch && (
        <div className="navbar-search">
          <IconSearch size={16} />
          <input
            type="text"
            placeholder="Rechercher un patient, une chambre..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                navigate('/patients');
              }
            }}
          />
        </div>
      )}

      <div className="navbar-spacer" />

      <div className="navbar-actions">
        <button className="navbar-icon-btn" aria-label="Notifications">
          <IconBell size={18} />
          <span className="navbar-icon-dot" />
        </button>
        <div className="navbar-user">
          <div className="sidebar-avatar" style={{ background: 'var(--blue-100)', color: 'var(--blue-700)' }}>
            {initials(user?.nom || 'U')}
          </div>
          <div className="navbar-user-meta">
            <div className="navbar-user-name">Dr. {user?.nom}</div>
            <div className="navbar-user-role">{user?.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
