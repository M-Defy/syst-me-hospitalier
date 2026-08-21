# SIH Hospital — Frontend

Frontend React du **Système d'Information Hospitalier (SIH)**, projet universitaire.
Ce dépôt contient **uniquement le frontend** : la partie backend (Django REST
Framework, PostgreSQL, etc.) est développée séparément par le reste de l'équipe.

## ✨ Fonctionnalités

- **Authentification** (mock) avec gestion de rôle : Administrateur, Médecin, Infirmier
- **Dashboard** : statistiques hospitalières, activité récente, alertes
- **Patients** : liste avec recherche/filtres, création de dossier, dossier patient détaillé
- **Historique des prescriptions** dans le dossier patient
- **Lits** : disponibilité en temps réel, filtres par service / statut / étage
- **Admissions** : formulaire multi-sections avec sélection de lit disponible
- **Sorties** : formulaire avec récapitulatif de confirmation avant validation
- **Prescriptions** : formulaire dynamique multi-médicaments
- Design system médical cohérent, responsive (desktop → mobile), accessible
  (focus visible, labels, contrastes, navigation clavier)

## 🛠️ Technologies

- React 18 + Vite
- React Router 6
- Axios (préparé pour une future connexion à l'API Django REST — non utilisé
  activement tant que le backend n'est pas branché)
- CSS moderne (design system par variables CSS, aucun framework CSS externe)

## 🚀 Installation

```bash
npm install
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

Build de production :

```bash
npm run build
npm run preview
```

## 👤 Comptes de démonstration

| Email | Mot de passe | Rôle |
|---|---|---|
| admin@sih.com | admin123 | Administrateur |
| medecin@sih.com | medecin123 | Médecin |
| infirmier@sih.com | infirmier123 | Infirmier |

## 🗂️ Structure du projet

```
sih-frontend/
├── package.json
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx              # point d'entrée React
    ├── App.jsx                # définition des routes
    ├── index.css              # design system (tokens + composants)
    ├── context/
    │   └── AuthContext.jsx    # authentification mock (login/logout/rôle)
    ├── components/
    │   ├── Layout.jsx         # coquille app (sidebar + navbar + contenu)
    │   ├── Sidebar.jsx
    │   ├── Navbar.jsx
    │   ├── Modal.jsx
    │   ├── Toast.jsx          # notifications (succès / erreur / info)
    │   ├── ProtectedRoute.jsx
    │   └── icons.jsx          # icônes SVG internes (aucune dépendance externe)
    ├── pages/
    │   ├── Login.jsx
    │   ├── Dashboard.jsx
    │   ├── Patients.jsx
    │   ├── CreatePatient.jsx
    │   ├── PatientDetails.jsx
    │   ├── Beds.jsx
    │   ├── Admission.jsx
    │   ├── Sortie.jsx
    │   └── Prescription.jsx
    └── data/
        └── mockData.js        # données fictives (patients, lits, prescriptions...)
```

## 🧭 Routes

| Route | Description |
|---|---|
| `/login` | Connexion |
| `/dashboard` | Tableau de bord |
| `/patients` | Liste des patients |
| `/patients/nouveau` | Création d'un patient |
| `/patients/:id` | Dossier patient |
| `/lits` | Disponibilité des lits |
| `/admissions` | Nouvelle admission |
| `/sorties` | Sortie patient |
| `/prescriptions` | Nouvelle prescription |

## 🧪 Données mockées

Toutes les données (`src/data/mockData.js`) sont fictives : 12 patients,
20 lits, plusieurs admissions, sorties et prescriptions. Aucune donnée réelle
n'est utilisée.

## 🔌 Connexion future à l'API Django REST

Le frontend n'appelle actuellement aucun backend : toutes les pages
fonctionnent avec les données mockées de `src/data/mockData.js`, afin de ne
jamais bloquer l'application tant que l'API n'est pas disponible. `axios`
est déjà installé et prêt à être utilisé pour brancher les futurs endpoints
Django REST Framework (authentification, patients, lits, admissions,
prescriptions) sans changement d'architecture majeur.
