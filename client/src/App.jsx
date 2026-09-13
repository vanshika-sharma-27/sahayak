import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import FamilyDashboard from "./pages/FamilyDashboard";
import PoliceDashboard from "./pages/PoliceDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import NgoDashboard from "./pages/NgoDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";

import MissingReport from "./pages/MissingReport";
import FoundReport from "./pages/FoundReport";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Role-based dashboard routes */}
        <Route
          path="/family-dashboard"
          element={
            <ProtectedRoute>
              <FamilyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/police-dashboard"
          element={
            <ProtectedRoute>
              <PoliceDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hospital-dashboard"
          element={
            <ProtectedRoute>
              <HospitalDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ngo-dashboard"
          element={
            <ProtectedRoute>
              <NgoDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer-dashboard"
          element={
            <ProtectedRoute>
              <VolunteerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Report routes */}
        <Route
          path="/missing-report"
          element={
            <ProtectedRoute>
              <MissingReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/found-report"
          element={
            <ProtectedRoute>
              <FoundReport />
            </ProtectedRoute>
          }
        />

        {/* Temporary common dashboard route */}
        <Route
          path="/dashboard"
          element={<Navigate to="/family-dashboard" replace />}
        />

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;