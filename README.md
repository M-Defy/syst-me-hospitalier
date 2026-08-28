# Système d'Information Hospitalier (SIH) — Projet d'examen

Projet réalisé pour l'Ingénierie des Logiciels — Licence 2 Informatique.

## Équipe
| Rôle | Membre |
|---|---|
| Chef de Projet / Product Owner | Miohitra (M-Defy) |
| Lead Backend / Architecte | Tsiry (Niffty77) |
| Développeur Backend | Séverin(Saefjaos) |
| Développeur Frontend / UI-UX | Tsanta(TSANTANIAINAKely) |
| DevOps / QA / Documentation | Antsa |

## Documentation
- [Document de spécifications](docs/Document_Specifications_SIH_v1.docx)
- [WBS et planning](docs/wbs_issues.csv)
- Wiki du projet : voir l'onglet **Wiki** de ce dépôt

## Stack technique
- **Backend** : Django + Django REST Framework
- **Frontend** : React.js
- **Base de données** : PostgreSQL
- **Hébergement** : Render (backend + BDD) / Vercel (frontend)
- **CI/CD** : GitHub Actions

## Déploiement
- Backend (API) : [lien à compléter après déploiement]
- Frontend : [lien à compléter après déploiement]

## Installation locale

### Prérequis
- Python 3.12+
- Node.js 20+
- (optionnel) PostgreSQL — une base SQLite locale est utilisée par défaut si `DATABASE_URL` n'est pas défini

### Backend (Django)
```bash
python -m venv .venv
source .venv/bin/activate          # sous Windows : .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env                # puis adapter les valeurs si besoin

python manage.py migrate
python manage.py createsuperuser    # pour créer un premier compte (rôle à définir via l'admin)
python manage.py runserver
```
L'API est alors disponible sur `http://localhost:8000/api/`, l'admin Django sur `http://localhost:8000/admin/`.

Lancer les tests :
```bash
python manage.py test
```

### Frontend (React + Vite)
```bash
cd frontend
cp .env.example .env                # définit VITE_API_URL (par défaut http://localhost:8000/api)
npm install
npm run dev
```
L'application est alors disponible sur `http://localhost:5173`.

### Variables d'environnement

| Variable | Emplacement | Description | Défaut |
|---|---|---|---|
| `DJANGO_SECRET_KEY` | racine `.env` | Clé secrète Django | valeur de dev insécure |
| `DJANGO_DEBUG` | racine `.env` | Mode debug | `True` |
| `DJANGO_ALLOWED_HOSTS` | racine `.env` | Hôtes autorisés (séparés par des virgules) | `localhost,127.0.0.1` |
| `DJANGO_CORS_ALLOWED_ORIGINS` | racine `.env` | Origines autorisées pour le frontend (CORS) | `http://localhost:5173,http://127.0.0.1:5173` |
| `DATABASE_URL` | racine `.env` | URL de connexion PostgreSQL (ex: `postgres://user:pass@host:5432/db`) | SQLite local (`db.sqlite3`) |
| `VITE_API_URL` | `frontend/.env` | URL de base de l'API consommée par le frontend | `http://localhost:8000/api` |

### Rôles utilisateurs (RBAC)
Les comptes se créent via `python manage.py createsuperuser` ou l'admin Django (`/admin/`), avec un rôle parmi :
- `MEDECIN`
- `INFIRMIER`
- `ADMINISTRATIF`

## Périmètre du projet
Version MVP réduite à 4 modules : Authentification/RBAC, Dossier Patient, Admissions, Prescriptions.
Voir le document de spécifications pour le détail du périmètre et des exclusions justifiées.

## Architecture du dépôt
```
config/           # Projet Django (settings, urls, wsgi/asgi)
users/            # Authentification, modèle Utilisateur, RBAC
patients/         # Dossier patient
admissions/       # Lits et séjours (admission / sortie)
prescriptions/    # Prescriptions médicales
frontend/         # Application React (Vite)
```

## Intégration continue
Le workflow [`ci.yml`](.github/workflows/ci.yml) exécute, à chaque push/PR vers `main` :
- les vérifications Django (`check`, `makemigrations --check`, `test`)
- l'installation et le build du frontend (`npm install`, `npm run build`)

