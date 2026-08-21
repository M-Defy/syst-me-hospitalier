// Toutes les données ci-dessous sont fictives — utilisées uniquement pour le
// développement du frontend, en attendant la connexion à l'API Django REST.

export const patients = [
  { id: 'p1', ipp: 'IPP-24001', nom: 'Andriamahefa', prenom: 'Sitraka', naissance: '1988-03-12', sexe: 'M', telephone: '034 12 345 67', email: 'sitraka.a@mail.mg', adresse: 'Lot II M 45, Antananarivo', contact: 'Voahangy Andriamahefa', telephoneContact: '033 44 556 78', service: 'Médecine générale', chambre: '204', lit: 'B', statut: 'Hospitalisé', groupeSanguin: 'O+', allergies: ['Pénicilline'], antecedents: ['Hypertension artérielle'], traitements: ['Amlodipine 5mg'], admission: '2026-08-12' },
  { id: 'p2', ipp: 'IPP-24002', nom: 'Rakoto', prenom: 'Miora', naissance: '1995-07-24', sexe: 'F', telephone: '032 55 667 89', email: 'miora.rakoto@mail.mg', adresse: 'Ambohipo, Antananarivo', contact: 'Jean Rakoto', telephoneContact: '034 66 778 90', service: 'Chirurgie', chambre: '112', lit: 'A', statut: 'Hospitalisé', groupeSanguin: 'A+', allergies: [], antecedents: ['Appendicectomie (2019)'], traitements: ['Paracétamol 1g'], admission: '2026-08-15' },
  { id: 'p3', ipp: 'IPP-24003', nom: 'Randria', prenom: 'Hery', naissance: '1972-11-02', sexe: 'M', telephone: '033 21 098 76', email: 'hery.randria@mail.mg', adresse: 'Analakely, Antananarivo', contact: 'Nirina Randria', telephoneContact: '032 88 990 11', service: 'Cardiologie', chambre: '301', lit: 'A', statut: 'Critique', groupeSanguin: 'B-', allergies: ['Aspirine'], antecedents: ['Infarctus du myocarde (2021)', 'Diabète type 2'], traitements: ['Metformine 850mg', 'Bisoprolol 5mg'], admission: '2026-08-16' },
  { id: 'p4', ipp: 'IPP-24004', nom: 'Rasoanaivo', prenom: 'Fara', naissance: '2001-01-30', sexe: 'F', telephone: '034 90 112 23', email: 'fara.r@mail.mg', adresse: 'Ivato, Antananarivo', contact: 'Lala Rasoanaivo', telephoneContact: '033 12 334 45', service: 'Pédiatrie', chambre: '405', lit: 'C', statut: 'Sorti', groupeSanguin: 'AB+', allergies: [], antecedents: [], traitements: [], admission: '2026-08-05' },
  { id: 'p5', ipp: 'IPP-24005', nom: 'Ravelojaona', prenom: 'Tojo', naissance: '1965-05-18', sexe: 'M', telephone: '032 44 556 90', email: 'tojo.r@mail.mg', adresse: 'Isotry, Antananarivo', contact: 'Bao Ravelojaona', telephoneContact: '034 55 667 12', service: 'Médecine générale', chambre: '206', lit: 'A', statut: 'Hospitalisé', groupeSanguin: 'O-', allergies: ['Iode'], antecedents: ['Asthme'], traitements: ['Salbutamol'], admission: '2026-08-17' },
  { id: 'p6', ipp: 'IPP-24006', nom: 'Andrianina', prenom: 'Lova', naissance: '1990-09-09', sexe: 'F', telephone: '033 77 889 01', email: 'lova.a@mail.mg', adresse: 'Antanimena, Antananarivo', contact: 'Rado Andrianina', telephoneContact: '032 66 778 23', service: 'Gynécologie', chambre: '502', lit: 'A', statut: 'Hospitalisé', groupeSanguin: 'A-', allergies: [], antecedents: [], traitements: ['Acide folique'], admission: '2026-08-18' },
  { id: 'p7', ipp: 'IPP-24007', nom: 'Rabemananjara', prenom: 'Njaka', naissance: '1958-02-14', sexe: 'M', telephone: '034 33 445 56', email: 'njaka.r@mail.mg', adresse: 'Tsaralalana, Antananarivo', contact: 'Hanta Rabemananjara', telephoneContact: '033 22 334 67', service: 'Cardiologie', chambre: '303', lit: 'B', statut: 'Hospitalisé', groupeSanguin: 'B+', allergies: ['Sulfamides'], antecedents: ['Insuffisance cardiaque'], traitements: ['Furosémide 40mg', 'Ramipril 5mg'], admission: '2026-08-10' },
  { id: 'p8', ipp: 'IPP-24008', nom: 'Rakotomalala', prenom: 'Zo', naissance: '1999-12-01', sexe: 'M', telephone: '032 11 223 34', email: 'zo.r@mail.mg', adresse: 'Ankorondrano, Antananarivo', contact: 'Mamy Rakotomalala', telephoneContact: '034 99 001 45', service: 'Urgences', chambre: '101', lit: 'A', statut: 'Critique', groupeSanguin: 'O+', allergies: [], antecedents: ['Traumatisme crânien récent'], traitements: ['Paracétamol IV'], admission: '2026-08-19' },
  { id: 'p9', ipp: 'IPP-24009', nom: 'Ranaivoson', prenom: 'Voahangy', naissance: '1982-06-27', sexe: 'F', telephone: '033 66 778 89', email: 'voahangy.r@mail.mg', adresse: 'Ambatobe, Antananarivo', contact: 'Solo Ranaivoson', telephoneContact: '032 44 556 78', service: 'Médecine générale', chambre: '207', lit: 'B', statut: 'Sorti', groupeSanguin: 'A+', allergies: [], antecedents: ['Gastrite chronique'], traitements: ['Oméprazole 20mg'], admission: '2026-08-02' },
  { id: 'p10', ipp: 'IPP-24010', nom: 'Rasolofo', prenom: 'Andry', naissance: '1975-08-08', sexe: 'M', telephone: '034 22 334 45', email: 'andry.r@mail.mg', adresse: 'Andraharo, Antananarivo', contact: 'Feno Rasolofo', telephoneContact: '033 88 990 12', service: 'Chirurgie', chambre: '114', lit: 'B', statut: 'Hospitalisé', groupeSanguin: 'B+', allergies: ['Latex'], antecedents: ['Hernie inguinale'], traitements: ['Ibuprofène 400mg'], admission: '2026-08-18' },
  { id: 'p11', ipp: 'IPP-24011', nom: 'Andriamampionona', prenom: 'Nomena', naissance: '2010-04-19', sexe: 'F', telephone: '032 99 001 23', email: 'famille.andriamampionona@mail.mg', adresse: 'Alarobia, Antananarivo', contact: 'Tiana Andriamampionona', telephoneContact: '034 77 889 34', service: 'Pédiatrie', chambre: '403', lit: 'A', statut: 'Hospitalisé', groupeSanguin: 'AB-', allergies: [], antecedents: [], traitements: ['Amoxicilline sirop'], admission: '2026-08-17' },
  { id: 'p12', ipp: 'IPP-24012', nom: 'Rakotobe', prenom: 'Faniry', naissance: '1993-10-05', sexe: 'F', telephone: '033 55 667 78', email: 'faniry.r@mail.mg', adresse: 'Mahamasina, Antananarivo', contact: 'Onja Rakotobe', telephoneContact: '032 33 445 89', service: 'Gynécologie', chambre: '504', lit: 'B', statut: 'Maintenance', allergies: [], antecedents: [], traitements: [], admission: '2026-08-01' },
];

export const beds = [
  { id: 'b1', chambre: '101', lit: 'A', service: 'Urgences', etage: 1, statut: 'Occupé' },
  { id: 'b2', chambre: '101', lit: 'B', service: 'Urgences', etage: 1, statut: 'Disponible' },
  { id: 'b3', chambre: '112', lit: 'A', service: 'Chirurgie', etage: 1, statut: 'Occupé' },
  { id: 'b4', chambre: '112', lit: 'B', service: 'Chirurgie', etage: 1, statut: 'Disponible' },
  { id: 'b5', chambre: '114', lit: 'A', service: 'Chirurgie', etage: 1, statut: 'Disponible' },
  { id: 'b6', chambre: '114', lit: 'B', service: 'Chirurgie', etage: 1, statut: 'Occupé' },
  { id: 'b7', chambre: '204', lit: 'A', service: 'Médecine générale', etage: 2, statut: 'Disponible' },
  { id: 'b8', chambre: '204', lit: 'B', service: 'Médecine générale', etage: 2, statut: 'Occupé' },
  { id: 'b9', chambre: '206', lit: 'A', service: 'Médecine générale', etage: 2, statut: 'Occupé' },
  { id: 'b10', chambre: '206', lit: 'B', service: 'Médecine générale', etage: 2, statut: 'Disponible' },
  { id: 'b11', chambre: '207', lit: 'A', service: 'Médecine générale', etage: 2, statut: 'Disponible' },
  { id: 'b12', chambre: '207', lit: 'B', service: 'Médecine générale', etage: 2, statut: 'Disponible' },
  { id: 'b13', chambre: '301', lit: 'A', service: 'Cardiologie', etage: 3, statut: 'Occupé' },
  { id: 'b14', chambre: '303', lit: 'A', service: 'Cardiologie', etage: 3, statut: 'Disponible' },
  { id: 'b15', chambre: '303', lit: 'B', service: 'Cardiologie', etage: 3, statut: 'Occupé' },
  { id: 'b16', chambre: '305', lit: 'A', service: 'Cardiologie', etage: 3, statut: 'Maintenance' },
  { id: 'b17', chambre: '403', lit: 'A', service: 'Pédiatrie', etage: 4, statut: 'Occupé' },
  { id: 'b18', chambre: '405', lit: 'C', service: 'Pédiatrie', etage: 4, statut: 'Disponible' },
  { id: 'b19', chambre: '502', lit: 'A', service: 'Gynécologie', etage: 5, statut: 'Occupé' },
  { id: 'b20', chambre: '504', lit: 'B', service: 'Gynécologie', etage: 5, statut: 'Maintenance' },
];

export const admissions = [
  { id: 'ad1', patient: 'Sitraka Andriamahefa', type: 'Programmée', date: '2026-08-12', heure: '09:15', service: 'Médecine générale', chambre: '204', lit: 'B', medecin: 'Dr. Rakoto', motif: 'Bilan tension artérielle' },
  { id: 'ad2', patient: 'Hery Randria', type: 'Urgence', date: '2026-08-16', heure: '22:40', service: 'Cardiologie', chambre: '301', lit: 'A', medecin: 'Dr. Rasoamanana', motif: 'Douleur thoracique aiguë' },
  { id: 'ad3', patient: 'Zo Rakotomalala', type: 'Urgence', date: '2026-08-19', heure: '07:05', service: 'Urgences', chambre: '101', lit: 'A', medecin: 'Dr. Randria', motif: 'Traumatisme crânien' },
  { id: 'ad4', patient: 'Lova Andrianina', type: 'Programmée', date: '2026-08-18', heure: '10:30', service: 'Gynécologie', chambre: '502', lit: 'A', medecin: 'Dr. Ravaka', motif: 'Suivi de grossesse' },
  { id: 'ad5', patient: 'Nomena Andriamampionona', type: 'Transfert', date: '2026-08-17', heure: '14:20', service: 'Pédiatrie', chambre: '403', lit: 'A', medecin: 'Dr. Ranaivo', motif: 'Transfert depuis CHU périphérique' },
];

export const sorties = [
  { id: 's1', patient: 'Fara Rasoanaivo', date: '2026-08-15', heure: '11:00', medecin: 'Dr. Rakoto', motif: 'Guérison', resume: 'Évolution favorable, traitement terminé.' },
  { id: 's2', patient: 'Voahangy Ranaivoson', date: '2026-08-09', heure: '16:45', medecin: 'Dr. Rasoamanana', motif: 'Guérison', resume: 'Gastrite résolue sous traitement.' },
];

export const prescriptionsData = [
  { id: 'pr1', patientId: 'p1', date: '2026-08-12', medecin: 'Dr. Rakoto', medicament: 'Amlodipine', dosage: '5 mg', frequence: '1x / jour', duree: '30 jours', statut: 'Active' },
  { id: 'pr2', patientId: 'p1', date: '2026-08-13', medecin: 'Dr. Rakoto', medicament: 'Paracétamol', dosage: '1 g', frequence: '3x / jour', duree: '5 jours', statut: 'Terminée' },
  { id: 'pr3', patientId: 'p3', date: '2026-08-16', medecin: 'Dr. Rasoamanana', medicament: 'Bisoprolol', dosage: '5 mg', frequence: '1x / jour', duree: '60 jours', statut: 'Active' },
  { id: 'pr4', patientId: 'p3', date: '2026-08-17', medecin: 'Dr. Rasoamanana', medicament: 'Metformine', dosage: '850 mg', frequence: '2x / jour', duree: '90 jours', statut: 'Active' },
  { id: 'pr5', patientId: 'p7', date: '2026-08-10', medecin: 'Dr. Ravaka', medicament: 'Furosémide', dosage: '40 mg', frequence: '1x / jour', duree: '14 jours', statut: 'Annulée' },
  { id: 'pr6', patientId: 'p2', date: '2026-08-15', medecin: 'Dr. Randria', medicament: 'Paracétamol', dosage: '1 g', frequence: '3x / jour', duree: '3 jours', statut: 'Active' },
];

export const recentActivity = [
  { id: 'a1', type: 'admission', text: 'Nouvelle admission — Nomena Andriamampionona', time: 'Il y a 25 min' },
  { id: 'a2', type: 'prescription', text: 'Prescription ajoutée — Miora Rakoto', time: 'Il y a 1 h' },
  { id: 'a3', type: 'sortie', text: 'Sortie validée — Fara Rasoanaivo', time: 'Il y a 3 h' },
  { id: 'a4', type: 'patient', text: 'Nouveau patient créé — Andry Rasolofo', time: 'Hier, 17:20' },
  { id: 'a5', type: 'admission', text: 'Admission urgence — Zo Rakotomalala', time: 'Aujourd\'hui, 07:05' },
];

export const alerts = [
  { id: 'al1', level: 'warning', text: 'Lit 305 (Cardiologie) bientôt disponible', sub: 'Maintenance prévue terminée demain' },
  { id: 'al2', level: 'critical', text: 'Prescription à vérifier — Hery Randria', sub: 'Interaction potentielle avec Aspirine (allergie connue)' },
  { id: 'al3', level: 'warning', text: 'Stock faible — Amoxicilline sirop', sub: 'Pharmacie centrale à notifier' },
];

export const services = ['Médecine générale', 'Chirurgie', 'Cardiologie', 'Pédiatrie', 'Gynécologie', 'Urgences'];

export const medecins = ['Dr. Rakoto', 'Dr. Rasoamanana', 'Dr. Randria', 'Dr. Ravaka', 'Dr. Ranaivo'];

export function getPatientById(id) {
  return patients.find((p) => p.id === id);
}

export function getPrescriptionsForPatient(id) {
  return prescriptionsData.filter((p) => p.patientId === id);
}
