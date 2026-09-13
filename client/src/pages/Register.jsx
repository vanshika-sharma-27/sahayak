import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "family",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await api.post(
        "/auth/register",
        form
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="visual-logo">S</div>

        <h1>Join Sahayak</h1>

        <p>
          Become a part of the community helping
          families find their loved ones.
        </p>

        <div className="visual-points">
          <span>✓ Secure role-based account</span>
          <span>✓ Easy report submission</span>
          <span>✓ Community coordination</span>
        </div>
      </div>

      <div className="auth-card">
        <h1>Create Account</h1>

        <p className="form-subtitle">
          Register for the Sahayak platform
        </p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Minimum 6 characters"
            minLength="6"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label>Select Role</label>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="family">
              Family
            </option>

            <option value="police">
              Police
            </option>

            <option value="hospital">
              Hospital
            </option>

            <option value="ngo">
              NGO / Shelter
            </option>

            <option value="volunteer">
              Volunteer
            </option>
          </select>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <button
            className="primary-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>
        </form>

        <p className="bottom-text">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;