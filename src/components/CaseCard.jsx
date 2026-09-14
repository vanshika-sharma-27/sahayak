import StatusBadge from "./StatusBadge";

function CaseCard({ caseData, onClick }) {
  return (
    <div className="case-card">
      <div className="case-header">
        <span className="case-id">
          {caseData.id}
        </span>

        <StatusBadge status={caseData.status} />
      </div>

      <h3>{caseData.name}</h3>

      <p>
        {caseData.age} years • {caseData.gender}
      </p>

      <p>📍 {caseData.location}</p>

      <p>👕 {caseData.clothing}</p>

      {onClick && (
        <button
          className="secondary-btn"
          onClick={() => onClick(caseData)}
        >
          View Details
        </button>
      )}
    </div>
  );
}

export default CaseCard;
