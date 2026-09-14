import { useState } from "react";
import { addData } from "../utils/storage";

function FoundReport({ role, onSuccess, onBack }) {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    location: "",
    clothing: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReport = {
      id: `FR-${Date.now().toString().slice(-4)}`,
      ...form,
      status: "Unverified",
      reportedBy:
        role === "hospital"
          ? "Hospital"
          : role === "ngo"
          ? "NGO"
          : "Volunteer",
    };

    addData("foundReports", newReport);

    onSuccess(newReport);
  };

  return (
    <div className="page">
      <div className="form-page">
        <button className="text-btn" onClick={onBack}>
          ← Back
        </button>

        <div className="form-header">
          <p className="eyebrow">FOUND PERSON REPORT</p>

          <h1>Report Found Person</h1>

          <p className="muted">
            Enter the available details so the system can compare them with
            missing cases.
          </p>
        </div>

        <form className="report-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Available Information</h3>

            <div className="form-grid">
              <div>
                <label htmlFor="age">Approximate Age</label>

                <input
                  id="age"
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Approximate age"
                  required
                />
              </div>

              <div>
                <label htmlFor="gender">Gender</label>

                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="location">Location</label>

                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Found location"
                  required
                />
              </div>

              <div>
                <label htmlFor="clothing">Clothing</label>

                <input
                  id="clothing"
                  name="clothing"
                  value={form.clothing}
                  onChange={handleChange}
                  placeholder="e.g. Blue shirt"
                  required
                />
              </div>
            </div>

            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="5"
              placeholder="Describe the person and circumstances..."
              required
            />
          </div>

          <button type="submit" className="primary-btn">
            Submit Found Report →
          </button>
        </form>
      </div>
    </div>
  );
}

export default FoundReport;