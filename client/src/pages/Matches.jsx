import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";

const Matches = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadMatches = async () => {
    try {
      setLoading(true);
      setError("");

      if (!id) {
        setError("Missing case ID is not available.");
        return;
      }

      const response = await api.get(
        `/cases/matches/${id}`
      );

      setData(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load possible matches."
      );
    } finally {
      setLoading(false);
    }
  };

  loadMatches();
}, [id]);
  const matches = data?.matches || [];

  return (
    <div className="app-page">
      <Navbar />

      <main className="form-page">
        <Link
          to="/dashboard"
          className="back-link"
        >
          ← Back to Dashboard
        </Link>

        <div className="form-heading">
          <p className="eyebrow">
            MATCHING SYSTEM
          </p>

          <h1>Possible Matches</h1>

          <p>
            These results are suggestions only.
            Final verification must be done by
            authorized police personnel.
          </p>
        </div>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {loading ? (
          <div className="empty-box">
            Loading possible matches...
          </div>
        ) : matches.length === 0 ? (
          <div className="empty-box">
            No possible matches found.
          </div>
        ) : (
          <div className="match-list">
            {matches.map((item) => {
              const report = item.report;

              return (
                <div
                  className="match-card"
                  key={report?._id}
                >
                  <div className="match-top">
                    <div>
                      <h2>
                        {report?.personName ||
                          "Unknown Person"}
                      </h2>

                      <p>
                        Found at:{" "}
                        {report?.foundLocation ||
                          "Unknown location"}
                      </p>
                    </div>

                    <div className="score-badge">
                      {item.score || 0}%
                    </div>
                  </div>

                  <div className="match-details">
                    <p>
                      <strong>Age:</strong>{" "}
                      {report?.age || "Unknown"}
                    </p>

                    <p>
                      <strong>Gender:</strong>{" "}
                      {report?.gender || "Unknown"}
                    </p>

                    <p>
                      <strong>Clothing:</strong>{" "}
                      {report?.clothingDescription ||
                        "Not available"}
                    </p>

                    <p>
                      <strong>Verification:</strong>{" "}
                      {report?.verificationStatus ||
                        "Pending"}
                    </p>
                  </div>

                  <div className="match-note">
                    Possible match generated using
                    age, gender, location and
                    clothing details.
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Matches;