import Navbar from "../components/Navbar";

function Landing({ onStart }) {
  return (
    <div className="page">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            MISSING PERSON COORDINATION PLATFORM
          </div>

          <h1>
            Together, We Can
            <span> Find Them.</span>
          </h1>

          <p>
            Sahayak connects families, police, hospitals,
            NGOs and volunteers on one centralized platform
            to coordinate missing-person cases.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={onStart}
            >
              Get Started →
            </button>

            <button
              className="secondary-btn"
              onClick={onStart}
            >
              Explore Platform
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle">
            🧭
          </div>

          <div className="floating-card card-one">
            👮 Police
          </div>

          <div className="floating-card card-two">
            👨‍👩‍👧 Family
          </div>

          <div className="floating-card card-three">
            🏥 Hospital
          </div>
        </div>
      </section>

      <section className="impact-section">
        <div>
          <strong>5</strong>
          <span>Stakeholder Roles</span>
        </div>

        <div>
          <strong>1</strong>
          <span>Centralized Platform</span>
        </div>

        <div>
          <strong>24/7</strong>
          <span>Community Support</span>
        </div>
      </section>
    </div>
  );
}

export default Landing;
