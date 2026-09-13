import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="brand-box">
        <div className="brand-icon">S</div>

        <div>
          <h2>Sahayak</h2>
          <p>Missing Person Coordination</p>
        </div>
      </div>

      <div className="nav-right">
        <span className="user-role">
          {user?.role || "User"}
        </span>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;