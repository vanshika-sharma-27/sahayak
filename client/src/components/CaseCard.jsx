import { Link } from "react-router-dom";

const CaseCard = ({ item }) => {
  return (
    <div className="case-card">
      <div className="case-header">
        <h3>{item.personName}</h3>

        <span className={`status ${item.status}`}>
          {item.status}
        </span>
      </div>

      <div className="case-details">
        <p>
          <strong>Age:</strong> {item.age}
        </p>

        <p>
          <strong>Gender:</strong> {item.gender}
        </p>

        <p>
          <strong>Last Seen:</strong>{" "}
          {item.lastSeenLocation}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {item.lastSeenDate
            ? new Date(
                item.lastSeenDate
              ).toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      <Link
        className="small-link"
        to={`/matches/${item._id}`}
      >
        View Possible Matches →
      </Link>
    </div>
  );
};

export default CaseCard;