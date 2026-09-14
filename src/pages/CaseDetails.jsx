function CaseDetails({
  caseData,
  onBack,
}) {
  if (!caseData) {
    return null;
  }

  return (
    <div className="page">
      <div className="dashboard-container narrow">
        <button
          className="text-btn"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="case-details-card">
          <div className="case-detail-header">
            <div>
              <p className="eyebrow">
                CASE {caseData.id}
              </p>

              <h1>{caseData.name}</h1>

              <p className="muted">
                Missing Person Case
              </p>
            </div>

            <span className="status-badge searching">
              {caseData.status}
            </span>
          </div>

          <div className="details-grid">
            <div>
              <span>Age</span>
              <strong>{caseData.age}</strong>
            </div>

            <div>
              <span>Gender</span>
              <strong>{caseData.gender}</strong>
            </div>

            <div>
              <span>Last Seen</span>
              <strong>{caseData.location}</strong>
            </div>

            <div>
              <span>Date</span>
              <strong>{caseData.date}</strong>
            </div>

            <div>
              <span>Clothing</span>
              <strong>{caseData.clothing}</strong>
            </div>
          </div>

          <div className="description-box">
            <span>Description</span>

            <p>{caseData.description}</p>
          </div>

          <div className="timeline">
            <div className="timeline-item active">
              <strong>Report Submitted</strong>
              <span>Case created successfully</span>
            </div>

            <div className="timeline-item active">
              <strong>Searching</strong>
              <span>
                Case is currently being searched
              </span>
            </div>

            <div className="timeline-item">
              <strong>Possible Match</strong>
              <span>Awaiting match</span>
            </div>

            <div className="timeline-item">
              <strong>Verified</strong>
              <span>Police verification</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseDetails;