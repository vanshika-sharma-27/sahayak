import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";

const MissingReport = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    personName: "",
    age: "",
    gender: "Male",
    lastSeenLocation: "",
    lastSeenDate: "",
    clothingDescription: "",
    physicalDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
      setMessage("");

      await api.post("/cases/missing", {
        ...form,
        age: Number(form.age),
      });

      setMessage(
        "Missing-person report submitted successfully."
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Report submission failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page">
      <Navbar />

      <main className="form-page">
        <div className="form-heading">
          <p className="eyebrow">
            FAMILY SUPPORT
          </p>

          <h1>Report Missing Person</h1>

          <p>
            Enter accurate details to help the
            community identify the person.
          </p>
        </div>

        <form
          className="large-form-card"
          onSubmit={handleSubmit}
        >
          <div className="form-grid">
            <div className="input-group">
              <label>Person Name *</label>

              <input
                name="personName"
                placeholder="Enter person's name"
                value={form.personName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Age *</label>

              <input
                name="age"
                type="number"
                min="0"
                placeholder="Enter age"
                value={form.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Gender *</label>

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="input-group">
              <label>Last Seen Date *</label>

              <input
                name="lastSeenDate"
                type="date"
                value={form.lastSeenDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group full-width">
              <label>Last Seen Location *</label>

              <input
                name="lastSeenLocation"
                placeholder="Example: Sector 73, Noida"
                value={form.lastSeenLocation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group full-width">
              <label>Clothing Description *</label>

              <textarea
                name="clothingDescription"
                placeholder="Example: Red shirt, blue jeans, black shoes"
                value={form.clothingDescription}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group full-width">
              <label>Physical Description</label>

              <textarea
                name="physicalDescription"
                placeholder="Height, marks, hair, identity details etc."
                value={form.physicalDescription}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          {message && (
            <div className="success-box">
              {message}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit Missing Report"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default MissingReport;