import StatCard from "../components/StatCard";
import { demoMissingCases, demoFoundReports } from "../data/demoData";
import { getData } from "../utils/storage";

function PoliceDashboard({
  onMatching,
  onLogout,
}) {
  const missingCases = getData(
    "missingCases",
    demoMissingCases
  );

  const foundReports = getData(
    "foundReports",
    demoFoundReports
  );

  return (
    <div className="page">
      <div className="dashboard-container">
        <div className="dashboard-top">
          <div>
            <p className="eyebrow">
              POLICE DASHBOARD
            </p>

            <h1>Case Management</h1>

            <p className="muted">
              Review reports and verify possible matches.
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
            title="Missing Cases"
            value={missingCases.length}
            icon="📋"
          />

          <StatCard
            title="Found Reports"
            value={foundReports.length}
            icon="🏥"
          />

          <StatCard
            title="Pending Matches"
            value="1"
            icon="🔎"
          />

          <StatCard
            title="Resolved"
            value="0"
            icon="✓"
          />
        </div>

        <div className="police-highlight">
          <div>
            <span className="match-label">
              ACTION REQUIRED
            </span>

            <h2>Possible match awaiting verification</h2>

            <p>
              The matching engine has identified
              a potential connection between a missing
              case and a found-person report.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={onMatching}
          >
            Review Match →
          </button>
        </div>

        <section className="dashboard-section">
          <div className="section-heading">
            <h2>Recent Missing Cases</h2>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {missingCases.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.location}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PoliceDashboard;
