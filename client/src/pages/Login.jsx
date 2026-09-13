import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: form.email.trim(),
        password: form.password,
      });

      const token = response.data?.token;
      const user = response.data?.user;

      if (!token || !user) {
        setError("Invalid response from server.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setSuccess("Login successful. Redirecting...");

      const role = String(user.role || "").toLowerCase();

      if (role === "family") {
        navigate("/family-dashboard", { replace: true });
      } else if (role === "police") {
        navigate("/police-dashboard", { replace: true });
      } else if (role === "hospital") {
        navigate("/hospital-dashboard", { replace: true });
      } else if (role === "ngo" || role === "shelter") {
        navigate("/ngo-dashboard", { replace: true });
      } else if (role === "volunteer") {
        navigate("/volunteer-dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        setError(
          error.response.data?.message ||
            `Login failed. Server returned ${error.response.status}.`
        );
      } else if (error.request) {
        setError(
          "Backend server is not running. Please start the server on port 5000."
        );
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="visual-logo">S</div>

        <h1>Welcome to Sahayak</h1>

        <p>
          Connecting families, police, hospitals, NGOs and
          volunteers for faster help.
        </p>

        <div className="visual-points">
          <span>✓ Role-based access</span>
          <span>✓ Missing-person reports</span>
          <span>✓ Smart possible matching</span>
          <span>✓ Police verification workflow</span>
        </div>
      </div>

      <div className="auth-card">
        <h1>Login</h1>

        <p className="form-subtitle">
          Login to your Sahayak account
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />

          {error && (
            <div className="error-box" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="success-box" role="status">
              {success}
            </div>
          )}

          <button
            className="primary-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="bottom-text">
          Don’t have an account?{" "}
          <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;