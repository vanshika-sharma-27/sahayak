function Navbar({ onHome }) {
  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={onHome}
      >
        🧭 SAHAYAK
      </div>

      <div className="nav-tagline">
        One Platform. Multiple Helpers.
      </div>
    </nav>
  );
}

export default Navbar;