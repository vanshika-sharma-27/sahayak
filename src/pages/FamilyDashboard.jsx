import StatCard from "../components/StatCard";
import CaseCard from "../components/CaseCard";
import { demoMissingCases } from "../data/demoData";
import { getData } from "../utils/storage";

function FamilyDashboard({
  onReport,
  onMatching,
  onLogout,
}) {
  const cases = getData(
    "missingCases",
    demoMissingCases
  );

  return (
    <div className="page">
      <div className="dashboard-container">
        <div className="dashboard-top">
          <div>
            <p className="eyebrow">
              FAMILY DASHBOARD
            </p>

            <h1>Welcome back 👋</h1>

            <p className="muted">
              Track your missing-person cases and
              receive possible match updates.
            </p>
          </div>

          <button
            className="text-btn"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>

        <div className="stats-grid">
          <StatCard
            title="Active Cases"
            value={cases.length}
            icon="📋"
          />

          <StatCard
            title="Possible Matches"
            value="1"
            icon="🔎"
          />

          <StatCard
            title="Resolved"
            value="0"
            icon="✓"
          />
        </div>

        <div className="dashboard-actions">
          <button
            className="primary-btn"
            onClick={onReport}
          >
            + Report Missing Person
          </button>

          <button
            className="secondary-btn"
            onClick={onMatching}
          >
            View Possible Matches
          </button>
        </div>

        <section className="dashboard-section">
          <div className="section-heading">
            <h2>My Cases</h2>
            <span>{cases.length} cases</span>
          </div>

          <div className="case-grid">
            {cases.map((item) => (
              <CaseCard
                key={item.id}
                caseData={item}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default FamilyDashboard;
