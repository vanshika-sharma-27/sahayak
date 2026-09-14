import { useState } from "react";
import { addData } from "../utils/storage";

function MissingReport({ onSuccess, onBack }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    location: "",
    date: "",
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

    const newCase = {
      id: `SH-${Date.now().toString().slice(-4)}`,
      ...form,
      status: "Searching",
      reportedBy: "Family",
    };

    addData("missingCases", newCase);

    onSuccess(newCase);
  };

  return (
    <div className="page">
      <div className="form-page">
        <button className="text-btn" onClick={onBack}>
          ← Back to Dashboard
        </button>

        <div className="form-header">
          <p className="eyebrow">FAMILY REPORT</p>

          <h1>Report Missing Person</h1>

          <p className="muted">
            Provide as much information as possible to help generate relevant
            matches.
          </p>
        </div>

        <form className="report-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Personal Information</h3>

            <div className="form-grid">
              <div>
                <label htmlFor="name">Full Name</label>

                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="age">Age</label>

                <input
                  id="age"
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Age"
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
                <label htmlFor="location">Last Seen Location</label>

                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Noida"
                  required
                />
              </div>

              <div>
                <label htmlFor="date">Last Seen Date</label>

                <input
                  id="date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
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
              placeholder="Physical description, identifying marks, last known details..."
              rows="5"
              required
            />
          </div>

          <button type="submit" className="primary-btn">
            Submit Missing Report →
          </button>
        </form>
      </div>
    </div>
  );
}

export default MissingReport;