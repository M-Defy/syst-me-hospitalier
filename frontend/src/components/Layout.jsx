import { useEffect, useState } from 'react';
import { Outlet, useLocation, matchPath } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const PAGE_META = [
  { path: '/dashboard', title: 'Dashboard', breadcrumb: 'Accueil / Dashboard', search: true },
  { path: '/patients', title: 'Patients', breadcrumb: 'Accueil / Patients', search: true },
  { path: '/patients/nouveau', title: 'Nouveau patient', breadcrumb: 'Accueil / Patients / Nouveau patient' },
  { path: '/patients/:id', title: 'Dossier patient', breadcrumb: 'Accueil / Patients / Dossier' },
  { path: '/lits', title: 'Disponibilité des lits', breadcrumb: 'Accueil / Lits' },
  { path: '/admissions', title: 'Admissions', breadcrumb: 'Accueil / Admissions' },
  { path: '/sorties', title: 'Sorties', breadcrumb: 'Accueil / Sorties' },
  { path: '/prescriptions', title: 'Prescriptions', breadcrumb: 'Accueil / Prescriptions' },
];

function getMeta(pathname) {
  const found = PAGE_META.find((m) => matchPath({ path: m.path, end: true }, pathname));
  return found || { title: 'SIH Hospital', breadcrumb: '' };
}

export default function Layout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const meta = getMeta(location.pathname);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const shellClass = [
    'app-shell',
    collapsed ? 'is-collapsed' : '',
    mobileOpen ? 'is-sidebar-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={shellClass}>
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="app-main">
        <Navbar
          title={meta.title}
          breadcrumb={meta.breadcrumb}
          showSearch={meta.search}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
