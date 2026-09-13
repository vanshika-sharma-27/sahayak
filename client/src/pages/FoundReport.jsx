import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";

const FoundReport = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    personName: "",
    age: "",
    gender: "Male",
    foundLocation: "",
    foundDate: "",
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

      await api.post("/reports/found", {
        ...form,
        age: form.age
          ? Number(form.age)
          : null,
      });

      setMessage(
        "Found-person report submitted successfully."
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
            COMMUNITY SUPPORT
          </p>

          <h1>Report Found Person</h1>

          <p>
            Submit details of a found person or
            sighting to help identify a match.
          </p>
        </div>

        <form
          className="large-form-card"
          onSubmit={handleSubmit}
        >
          <div className="form-grid">
            <div className="input-group">
              <label>Person Name</label>

              <input
                name="personName"
                placeholder="If known"
                value={form.personName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Approximate Age</label>

              <input
                name="age"
                type="number"
                min="0"
                placeholder="If known"
                value={form.age}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Gender</label>

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
              <label>Found Date *</label>

              <input
                name="foundDate"
                type="date"
                value={form.foundDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group full-width">
              <label>Found Location *</label>

              <input
                name="foundLocation"
                placeholder="Example: Sector 62, Noida"
                value={form.foundLocation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group full-width">
              <label>Clothing Description *</label>

              <textarea
                name="clothingDescription"
                placeholder="Describe the clothing"
                value={form.clothingDescription}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group full-width">
              <label>Physical Description</label>

              <textarea
                name="physicalDescription"
                placeholder="Describe appearance or other details"
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
                : "Submit Found Report"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default FoundReport;