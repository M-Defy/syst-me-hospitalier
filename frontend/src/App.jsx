import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import CreatePatient from './pages/CreatePatient';
import PatientDetails from './pages/PatientDetails';
import Beds from './pages/Beds';
import Admission from './pages/Admission';
import Sortie from './pages/Sortie';
import Prescription from './pages/Prescription';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/nouveau" element={<CreatePatient />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
        <Route path="/lits" element={<Beds />} />
        <Route path="/admissions" element={<Admission />} />
        <Route path="/sorties" element={<Sortie />} />
        <Route path="/prescriptions" element={<Prescription />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
