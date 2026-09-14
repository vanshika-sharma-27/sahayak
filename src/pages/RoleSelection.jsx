const roles = [
  {
    id: "family",
    icon: "👨‍👩‍👧",
    title: "Family",
    description: "Report and track a missing person.",
  },
  {
    id: "police",
    icon: "👮",
    title: "Police",
    description: "Review cases and verify possible matches.",
  },
  {
    id: "hospital",
    icon: "🏥",
    title: "Hospital",
    description: "Report found or unidentified persons.",
  },
  {
    id: "ngo",
    icon: "🤝",
    title: "NGO / Shelter",
    description: "Report found persons and assist identification.",
  },
  {
    id: "volunteer",
    icon: "🔎",
    title: "Volunteer",
    description: "Submit sightings and location information.",
  },
];

function RoleSelection({ onSelect }) {
  return (
    <div className="page centered-page">
      <div className="selection-container">
        <p className="eyebrow">WELCOME TO SAHAYAK</p>

        <h1>How would you like to continue?</h1>

        <p className="muted">
          Select your role to access the relevant
          Sahayak dashboard.
        </p>

        <div className="role-grid">
          {roles.map((role) => (
            <button
              key={role.id}
              className="role-card"
              onClick={() => onSelect(role.id)}
            >
              <div className="role-icon">
                {role.icon}
              </div>

              <h3>{role.title}</h3>

              <p>{role.description}</p>

              <span>Continue →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;