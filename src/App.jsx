import { useState } from "react";

import Landing from "./pages/Landing";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";

import FamilyDashboard from "./pages/FamilyDashboard";
import PoliceDashboard from "./pages/PoliceDashboard";
import OrganizationDashboard from "./pages/OrganizationDashboard";

import MissingReport from "./pages/MissingReport";
import FoundReport from "./pages/FoundReport";
import Matching from "./pages/Matching";
import CaseDetails from "./pages/CaseDetails";

function App() {
  const [page, setPage] = useState("landing");
  const [role, setRole] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const showSuccess = (message) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const startApp = () => {
    setPage("roles");
  };

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    setPage("login");
  };

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setRole(null);
    setSelectedCase(null);
    setPage("landing");
  };

  const handleReportSuccess = (data) => {
    showSuccess(`✓ Report ${data.id} submitted successfully`);
    setPage("dashboard");
  };

  const handleVerifyMatch = () => {
    showSuccess("✓ Possible match sent for police verification");
    setPage("dashboard");
  };

  const handleViewCase = (caseData) => {
    setSelectedCase(caseData);
    setPage("case-details");
  };

  const renderDashboard = () => {
    if (role === "family") {
      return (
        <FamilyDashboard
          onReport={() => setPage("missing-report")}
          onMatching={() => setPage("matching")}
          onViewCase={handleViewCase}
          onLogout={handleLogout}
        />
      );
    }

    if (role === "police") {
      return (
        <PoliceDashboard
          onMatching={() => setPage("matching")}
          onViewCase={handleViewCase}
          onLogout={handleLogout}
        />
      );
    }

    return (
      <OrganizationDashboard
        role={role}
        onReport={() => setPage("found-report")}
        onViewCase={handleViewCase}
        onLogout={handleLogout}
      />
    );
  };

  return (
    <>
      {successMessage && <div className="toast">{successMessage}</div>}

      {page === "landing" && <Landing onStart={startApp} />}

      {page === "roles" && (
        <RoleSelection
          onSelect={selectRole}
          onBack={() => setPage("landing")}
        />
      )}

      {page === "login" && (
        <Login
          role={role}
          onLogin={handleLogin}
          onBack={() => setPage("roles")}
        />
      )}

      {page === "dashboard" && renderDashboard()}

      {page === "missing-report" && (
        <MissingReport
          onSuccess={handleReportSuccess}
          onBack={() => setPage("dashboard")}
        />
      )}

      {page === "found-report" && (
        <FoundReport
          role={role}
          onSuccess={handleReportSuccess}
          onBack={() => setPage("dashboard")}
        />
      )}

      {page === "matching" && (
        <Matching
          onBack={() => setPage("dashboard")}
          onVerify={handleVerifyMatch}
        />
      )}

      {page === "case-details" && (
        <CaseDetails
          caseData={selectedCase}
          onBack={() => setPage("dashboard")}
        />
      )}
    </>
  );
}

export default App;