import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IconEye, IconEyeOff, IconAlertTriangle, IconActivity } from '../components/icons';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    const dest = location.state?.from || '/dashboard';
    return <Navigate to={dest} replace />;
  }

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = 'L\'adresse email est requise.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Adresse email invalide.';
    if (!password) next.password = 'Le mot de passe est requis.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      const result = login(email, password);
      setIsSubmitting(false);
      if (result.success) {
        navigate(location.state?.from || '/dashboard', { replace: true });
      } else {
        setFormError(result.message);
      }
    }, 420);
  };

  return (
    <div className="login-shell">
      <aside className="login-aside">
        <div className="login-aside-top">
          <div className="sidebar-brand-mark">SIH</div>
          <div>
            <div className="sidebar-brand-name" style={{ fontSize: 16 }}>SIH Hospital</div>
            <div className="sidebar-brand-sub">Système d'Information Hospitalier</div>
          </div>
        </div>

        <div className="login-aside-content">
          <span className="eyebrow" style={{ color: '#7FC0E8' }}>Plateforme professionnelle</span>
          <h1>Une gestion hospitalière intégrée, sécurisée et efficace.</h1>
          <p>
            Dossier patient informatisé, gestion des lits en temps réel, admissions,
            sorties et prescriptions : une seule plateforme pour l'ensemble des équipes
            soignantes.
          </p>
        </div>

        <div className="login-pulse" aria-hidden="true">
          <svg viewBox="0 0 600 140" width="100%" height="140" preserveAspectRatio="none">
            <path
              className="pulse-path"
              d="M0 90 L110 90 L135 40 L160 120 L185 70 L210 90 L320 90 L345 20 L370 130 L395 90 L600 90"
              fill="none"
              stroke="#3E86B4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="login-aside-foot">© 2026 SIH Hospital — Projet universitaire, à des fins pédagogiques.</div>
      </aside>

      <main className="login-main">
        <div className="login-card">
          <div className="login-card-heading">
            <h2>Bienvenue</h2>
            <p>Connectez-vous à votre espace professionnel</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {formError && (
              <div className="form-error-banner" role="alert">
                <IconAlertTriangle size={16} />
                {formError}
              </div>
            )}

            <div className="field">
              <label htmlFor="email">Email professionnel<span className="required">*</span></label>
              <input
                id="email"
                type="email"
                className={'input' + (errors.email ? ' has-error' : '')}
                placeholder="prenom.nom@sih.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <span className="error-text" id="email-error">{errors.email}</span>}
            </div>

            <div className="field">
              <label htmlFor="password">Mot de passe<span className="required">*</span></label>
              <div className="input-password-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={'input' + (errors.password ? ' has-error' : '')}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
              </div>
              {errors.password && <span className="error-text" id="password-error">{errors.password}</span>}
            </div>

            <div className="checkbox-row">
              <label>
                <input type="checkbox" />
                Se souvenir de moi
              </label>
              <a href="#reset" onClick={(e) => e.preventDefault()}>Mot de passe oublié ?</a>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
              {isSubmitting ? <span className="loading-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> : <IconActivity size={16} />}
              {isSubmitting ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="login-demo-box">
            <strong>Comptes de démonstration</strong><br />
            admin@sih.com / admin123 — Administrateur<br />
            medecin@sih.com / medecin123 — Médecin<br />
            infirmier@sih.com / infirmier123 — Infirmier
          </div>
        </div>
      </main>
    </div>
  );
}
