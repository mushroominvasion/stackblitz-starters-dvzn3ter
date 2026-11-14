
"use client";

import { useState } from "react";

export default function Home() {
  const [entry, setEntry] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [journey, setJourney] = useState(false);
  const [journeyType, setJourneyType] = useState("hill");
  const [loading, setLoading] = useState(false);

  function handlePhotos(files: FileList | null) {
    if (!files) return;

    const urls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setPhotos((previous) => [...previous, ...urls]);
  }

  function generateJourney() {
    if (!entry.trim()) return;

    setLoading(true);

    // Temporary journal interpretation.
    // We will replace this with an AI API later.
    const text = entry.toLowerCase();

    if (
      text.includes("stress") ||
      text.includes("hard") ||
      text.includes("difficult") ||
      text.includes("overwhelmed") ||
      text.includes("struggle")
    ) {
      setJourneyType("hill");
    } else if (
      text.includes("happy") ||
      text.includes("excited") ||
      text.includes("friend") ||
      text.includes("fun")
    ) {
      setJourneyType("flowers");
    } else if (
      text.includes("accomplished") ||
      text.includes("success") ||
      text.includes("finished") ||
      text.includes("proud")
    ) {
      setJourneyType("mountain");
    } else {
      setJourneyType("forest");
    }

    setTimeout(() => {
      setJourney(true);
      setLoading(false);
    }, 800);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">✿</span>
          <div>
            <h2>little steps</h2>
            <p>your GT journey</p>
          </div>
        </div>

        <nav className="navigation">
          <a className="nav-item active">⌂ Dashboard</a>
          <a className="nav-item">✎ Journal</a>
          <a className="nav-item">♡ Community</a>
          <a className="nav-item">✧ My Journey</a>
          <a className="nav-item">⚑ Opportunities</a>
          <a className="nav-item">☻ My Profile</a>
        </nav>

        <div className="sidebar-bottom">
          <div className="level-card">
            <span>🌱 Your adventure</span>
            <strong>Level 1 Explorer</strong>
            <div className="progress-track">
              <div className="progress-fill" />
            </div>
            <small>0 / 100 growth points</small>
          </div>
          <p className="privacy-note">🔒 Your journey belongs to you.</p>
        </div>
      </aside>

      <section className="main-content">
        <header className="topbar">
          <div>
            <span className="eyebrow">GEORGIA TECH STUDENT SPACE</span>
            <h1>Your little corner of the world.</h1>
            <p>Every day is another step in your journey.</p>
          </div>
          <div className="avatar">🌷</div>
        </header>

        <section className="welcome-card">
          <div>
            <span className="welcome-label">A NEW DAY, A NEW ADVENTURE</span>
            <h2>Welcome back, explorer!</h2>
            <p>
              Take a breath. Reflect on your day.
              Your journey is made of little steps.
            </p>
            <a href="#journal" className="welcome-button">
              Start journaling →
            </a>
          </div>
          <div className="welcome-art">
            🌳 🏡 🌳
            <div className="pixel-character">🧑‍🌾</div>
            <div>🌼 🌱 🌼</div>
          </div>
        </section>

        <div className="section-heading">
          <div>
            <h2>Today's adventure</h2>
            <p>What has your journey looked like today?</p>
          </div>
          <span className="date-label">YOUR PERSONAL JOURNEY</span>
        </div>

        <section className="journal-card" id="journal">
          <div className="journal-heading">
            <span className="journal-icon">✎</span>
            <div>
              <h3>Dear diary...</h3>
              <p>Write freely. This space is yours.</p>
            </div>
          </div>

          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="How was your day? What happened? What are you thinking about? What made you happy, frustrated, proud, or uncertain?"
          />

          <div className="photo-section">
            <label className="photo-upload">
              + Add photographs
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handlePhotos(e.target.files)}
                hidden
              />
            </label>
            <span>{photos.length} photos added</span>
          </div>

          {photos.length > 0 && (
            <div className="photo-preview">
              {photos.map((photo, index) => (
                <img key={index} src={photo} alt="Journal attachment" />
              ))}
            </div>
          )}

          <div className="journal-footer">
            <span>🔒 Only you can see this entry.</span>
            <button
              onClick={generateJourney}
              disabled={!entry.trim() || loading}
            >
              {loading ? "Preparing your journey..." : "Complete entry →"}
            </button>
          </div>
        </section>

        {journey && (
          <section className="journey-card">
            <div className="section-heading">
              <div>
                <span className="eyebrow">YOUR STORY, VISUALIZED</span>
                <h2>Your journey today ✨</h2>
                <p>Your character has a new adventure.</p>
              </div>
            </div>

            <div className={`pixel-world ${journeyType}`}>
              <div className="world-sun">☀</div>
              <div className="world-cloud">☁</div>
              <div className="world-hills">🌲　🌳　🌲</div>

              <svg
                viewBox="0 0 600 180"
                className="journey-svg"
                preserveAspectRatio="none"
              >
                <path
                  d={
                    journeyType === "hill"
                      ? "M 0 155 Q 130 155 200 85 Q 300 10 410 75 Q 500 115 600 45"
                      : "M 0 155 Q 140 115 250 145 Q 400 165 600 65"
                  }
                  fill="none"
                  stroke="#9b744b"
                  strokeWidth="13"
                  strokeLinecap="round"
                  strokeDasharray="5 5"
                />

                <path
                  d={
                    journeyType === "hill"
                      ? "M 0 155 Q 130 155 200 85 Q 300 10 410 75 Q 500 115 600 45"
                      : "M 0 155 Q 140 115 250 145 Q 400 165 600 65"
                  }
                  fill="none"
                  stroke="#e4c99b"
                  strokeWidth="7"
                  strokeDasharray="2 7"
                />

                <g>
                  <animateMotion
                    dur="4s"
                    fill="freeze"
                    path={
                      journeyType === "hill"
                        ? "M 0 155 Q 130 155 200 85 Q 300 10 410 75 Q 500 115 600 45"
                        : "M 0 155 Q 140 115 250 145 Q 400 165 600 65"
                    }
                  />
                  <text fontSize="28" textAnchor="middle" y="-5">🧑‍🌾</text>
                </g>
              </svg>

              <div className="world-grass">🌼　🌿　🌼　🌱　🌿　🌼</div>
            </div>

            <div className="journey-description">
              <h3>
                {journeyType === "hill" && "A hill worth climbing"}
                {journeyType === "flowers" && "A field of little joys"}
                {journeyType === "mountain" && "A mountain conquered"}
                {journeyType === "forest" && "A path of discovery"}
              </h3>
              <p>
                Your journey reflects the themes of your journal entry.
                Every step counts, even the difficult ones.
              </p>
            </div>

            <div className="action-plan">
              <h3>🌱 Your next little steps</h3>
              <p>Here are some things you could try:</p>
              <ul>
                <li>Take a moment to reflect on what you experienced.</li>
                <li>Identify one manageable next step.</li>
                <li>Reach out to someone who can support you.</li>
              </ul>
            </div>
          </section>
        )}

        <footer className="footer">
          Made with ♡ for the Georgia Tech community
        </footer>
      </section>
    </main>
  );
}
