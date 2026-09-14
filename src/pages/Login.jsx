function Login({ role, onLogin, onBack }) {
  const roleNames = {
    family: "Family",
    police: "Police",
    hospital: "Hospital",
    ngo: "NGO / Shelter",
    volunteer: "Volunteer",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="page centered-page">
      <div className="auth-card">
        <div className="auth-icon">🧭</div>

        <p className="eyebrow">
          {roleNames[role]} PORTAL
        </p>

        <h1>Welcome Back</h1>

        <p className="muted">
          Sign in to continue to your dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>

          <input
            type="email"
            placeholder="demo@sahayak.in"
            defaultValue="demo@sahayak.in"
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="••••••••"
            defaultValue="123456"
            required
          />

          <button className="primary-btn full-width">
            Sign In →
          </button>
        </form>

        <p className="demo-note">
          Prototype Mode • Demo login
        </p>

        <button
          className="text-btn"
          onClick={onBack}
        >
          ← Change Role
        </button>
      </div>
    </div>
  );
}

export default Login;
