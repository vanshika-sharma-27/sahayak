import { demoMissingCases, demoFoundReports } from "../data/demoData";
import { getData } from "../utils/storage";
import { calculateMatch } from "../utils/matching";
import StatusBadge from "../components/StatusBadge";

function Matching({ onBack, onVerify }) {
  const missingCases =
    getData("missingCases", demoMissingCases);

  const foundReports =
    getData("foundReports", demoFoundReports);

  const results = [];

  missingCases.forEach((missing) => {
    foundReports.forEach((found) => {
      const result = calculateMatch(missing, found);

      if (result.isMatch) {
        results.push({
          missing,
          found,
          ...result,
        });
      }
    });
  });

  return (
    <div className="page">
      <div className="dashboard-container">
        <button
          className="text-btn"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

        <div className="page-heading">
          <div>
            <p className="eyebrow">
              MATCHING ENGINE
            </p>

            <h1>Possible Matches</h1>

            <p className="muted">
              Matches are generated using available
              report information and require human verification.
            </p>
          </div>

          <div className="match-count">
            {results.length}
            <span>Possible Matches</span>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="empty-state">
            <div>🔎</div>
            <h3>No possible matches yet</h3>
            <p>
              Submit more reports to generate
              possible matches.
            </p>
          </div>
        ) : (
          <div className="match-list">
            {results.map((result, index) => (
              <div
                className="match-card"
                key={index}
              >
                <div className="match-top">
                  <div>
                    <span className="match-label">
                      POSSIBLE MATCH
                    </span>

                    <h2>
                      {result.score}% Match
                    </h2>
                  </div>

                  <div className="score-circle">
                    {result.score}%
                  </div>
                </div>

                <div className="match-persons">
                  <div className="person-box">
                    <span>Missing Case</span>

                    <h3>
                      {result.missing.name}
                    </h3>

                    <p>
                      {result.missing.age} years •{" "}
                      {result.missing.gender}
                    </p>

                    <p>
                      📍 {result.missing.location}
                    </p>

                    <p>
                      👕 {result.missing.clothing}
                    </p>
                  </div>

                  <div className="match-arrow">
                    ↔️
                  </div>

                  <div className="person-box">
                    <span>Found Report</span>

                    <h3>
                      Report {result.found.id}
                    </h3>

                    <p>
                      {result.found.age} years •{" "}
                      {result.found.gender}
                    </p>

                    <p>
                      📍 {result.found.location}
                    </p>

                    <p>
                      👕 {result.found.clothing}
                    </p>
                  </div>
                </div>

                <div className="factors">
                  <strong>Matching Factors</strong>

                  <div>
                    {result.factors.map(
                      (factor) => (
                        <span key={factor}>
                          ✓ {factor}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="match-footer">
                  <StatusBadge status="Pending Verification" />

                  <button
                    className="primary-btn"
                    onClick={() =>
                      onVerify(result)
                    }
                  >
                    Send for Police Verification
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Matching;

