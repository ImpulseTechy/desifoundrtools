'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-inner">
          <h2>Stay Ahead of Every Investor Meeting</h2>
          <p className="newsletter-subtext">
            Monthly startup finance benchmarks, new calculators, and guides — free for Indian founders.
          </p>
          {submitted ? (
            <div className="newsletter-success">
              ✅ You&apos;re in! First issue lands in your inbox soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@startup.com"
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn newsletter-btn">
                Get Free Monthly Benchmarks →
              </button>
            </form>
          )}
          <p className="newsletter-disclaimer">
            🔒 No spam. Unsubscribe anytime. Read by 500+ Indian founders.
          </p>
        </div>
      </div>
    </section>
  );
}
