function OrganizationDashboard({ onReport, onLogout }) {
  return (
    <div className="page">
      <div className="dashboard-page">
        <div className="form-header">
          <p className="eyebrow">ORGANIZATION DASHBOARD</p>

          <h1>Welcome to Sahayak</h1>

          <p className="muted">
            Report a found person and help families find their loved ones.
          </p>
        </div>

        <div className="dashboard-actions">
          <button
            className="primary-btn"
            onClick={onReport}
            type="button"
          >
            Report Found Person →
          </button>

          <button
            className="text-btn"
            onClick={onLogout}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrganizationDashboard;