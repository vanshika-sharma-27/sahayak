import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import CaseCard from "../components/CaseCard";

const Dashboard = () => {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [missingCases, setMissingCases] = useState([]);
  const [foundReports, setFoundReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const loadData = async () => {
  try {
    setLoading(true);
    setError("");

    const [
      missingResponse,
      foundResponse,
    ] = await Promise.all([
      api.get("/cases/missing"),
      api.get("/reports/found"),
    ]);

    setMissingCases(
      Array.isArray(missingResponse.data)
        ? missingResponse.data
        : missingResponse.data?.cases || []
    );

    setFoundReports(
      Array.isArray(foundResponse.data)
        ? foundResponse.data
        : foundResponse.data?.reports || []
    );
  } catch (error) {
    setError(
      error.response?.data?.message ||
        "Unable to load dashboard data."
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        missingResponse,
        foundResponse,
      ] = await Promise.all([
        api.get("/cases/missing"),
        api.get("/reports/found"),
      ]);

      setMissingCases(
        Array.isArray(missingResponse.data)
          ? missingResponse.data
          : missingResponse.data?.cases || []
      );

      setFoundReports(
        Array.isArray(foundResponse.data)
          ? foundResponse.data
          : foundResponse.data?.reports || []
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, []);

  const pendingReports = foundReports.filter(
    (report) =>
      report.verificationStatus === "pending"
  );

  const roleName = {
    family: "Family Dashboard",
    police: "Police Dashboard",
    hospital: "Hospital Dashboard",
    ngo: "NGO / Shelter Dashboard",
    volunteer: "Volunteer Dashboard",
  };

  return (
    <div className="app-page">
      <Navbar />

      <main className="dashboard-container">
        <section className="welcome-area">
          <div>
            <p className="eyebrow">
              SAHAYAK PLATFORM
            </p>

            <h1>
              Welcome,{" "}
              {user?.name || "User"} 👋
            </h1>

            <p>
              {roleName[user?.role] ||
                "Your Dashboard"}
            </p>
          </div>

          <div className="role-badge">
            {user?.role || "user"}
          </div>
        </section>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <section className="stats-grid">
          <StatCard
            title="Missing Cases"
            value={missingCases.length}
            icon="🔎"
            color="blue"
          />

          <StatCard
            title="Found Reports"
            value={foundReports.length}
            icon="📋"
            color="green"
          />

          <StatCard
            title="Pending Verification"
            value={pendingReports.length}
            icon="⏳"
            color="orange"
          />

          <StatCard
            title="Active Platform"
            value="24/7"
            icon="🛡️"
            color="purple"
          />
        </section>

        <section className="quick-actions">
          <h2>Quick Actions</h2>

          <div className="action-grid">
            {user?.role === "family" && (
              <Link
                to="/missing-report"
                className="action-card"
              >
                <span>🔎</span>

                <div>
                  <h3>
                    Report Missing Person
                  </h3>

                  <p>
                    Submit details of a
                    missing person.
                  </p>
                </div>
              </Link>
            )}

            {[
              "police",
              "hospital",
              "ngo",
              "volunteer",
            ].includes(user?.role) && (
              <Link
                to="/found-report"
                className="action-card"
              >
                <span>📍</span>

                <div>
                  <h3>
                    Report Found Person
                  </h3>

                  <p>
                    Submit found-person or
                    sighting details.
                  </p>
                </div>
              </Link>
            )}

            <button
              type="button"
              className="action-card refresh-card"
              onClick={loadData}
            >
              <span>🔄</span>

              <div>
                <h3>Refresh Reports</h3>

                <p>
                  Load the latest available
                  reports.
                </p>
              </div>
            </button>
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <div>
              <h2>Missing Person Cases</h2>

              <p>
                All available missing-person
                reports
              </p>
            </div>
          </div>

          {loading ? (
            <div className="empty-box">
              Loading cases...
            </div>
          ) : missingCases.length === 0 ? (
            <div className="empty-box">
              No missing-person cases available.
            </div>
          ) : (
            <div className="cases-grid">
              {missingCases.map((item) => (
                <CaseCard
                  key={item._id}
                  item={item}
                />
              ))}
            </div>
          )}
        </section>

        <section className="content-section">
          <div className="section-heading">
            <div>
              <h2>Found Person Reports</h2>

              <p>
                Reports submitted by hospitals,
                NGOs and volunteers
              </p>
            </div>
          </div>

          {loading ? (
            <div className="empty-box">
              Loading reports...
            </div>
          ) : foundReports.length === 0 ? (
            <div className="empty-box">
              No found-person reports available.
            </div>
          ) : (
            <div className="cases-grid">
              {foundReports.map((report) => (
                <div
                  className="case-card"
                  key={report._id}
                >
                  <div className="case-header">
                    <h3>
                      {report.personName ||
                        "Unknown Person"}
                    </h3>

                    <span
                      className={`status ${
                        report.verificationStatus ||
                        "pending"
                      }`}
                    >
                      {report.verificationStatus ||
                        "pending"}
                    </span>
                  </div>

                  <div className="case-details">
                    <p>
                      <strong>Age:</strong>{" "}
                      {report.age || "Unknown"}
                    </p>

                    <p>
                      <strong>Gender:</strong>{" "}
                      {report.gender || "Unknown"}
                    </p>

                    <p>
                      <strong>Location:</strong>{" "}
                      {report.foundLocation ||
                        "Unknown"}
                    </p>

                    <p>
                      <strong>Clothing:</strong>{" "}
                      {report.clothingDescription ||
                        "Not available"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;