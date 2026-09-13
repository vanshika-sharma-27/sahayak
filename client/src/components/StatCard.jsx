const StatCard = ({
  title,
  value,
  icon,
  color = "blue",
}) => {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-card-content">
        <p className="stat-card-title">{title}</p>

        <h2 className="stat-card-value">{value}</h2>
      </div>

      {icon && (
        <div className="stat-card-icon">
          {icon}
        </div>
      )}
    </div>
  );
};

export default StatCard;