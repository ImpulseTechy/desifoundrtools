'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setErrorMsg('Email daalna zaroori hai!');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Valid email daalo');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    const formData = new FormData();
    formData.append('EMAIL', email);
    formData.append('b_91900dd5777f9d1bf53583645_a646f092cc', '');

    try {
      await fetch('https://desifoundertools.us5.list-manage.com/subscribe/post?u=91900dd5777f9d1bf53583645&id=a646f092cc&f_id=00fd73e0f0', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      setSubmitted(true);
    } catch (error) {
      setErrorMsg('Kuch problem hua, dobara try karo!');
    } finally {
      setIsLoading(false);
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
            <div className="newsletter-success" style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '12px', color: '#10b981', fontSize: '1.1rem', fontWeight: '500' }}>
              ✅ Swagat hai! Check karo inbox — welcome email bhej diya! 🎉
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form" style={{ position: 'relative' }}>
              <input
                type="text"
                name="b_91900dd5777f9d1bf53583645_a646f092cc"
                tabIndex="-1"
                value=""
                style={{ position: 'absolute', left: '-5000px' }}
                aria-hidden="true"
                readOnly
              />
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <input
                  type="email"
                  name="EMAIL"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="your@startup.com"
                  className="newsletter-input"
                  style={{ borderColor: errorMsg ? '#ef4444' : undefined, width: '100%' }}
                />
                {errorMsg && (
                  <span style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '6px', textAlign: 'left', fontWeight: '500' }}>
                    {errorMsg}
                  </span>
                )}
              </div>
              <button 
                type="submit" 
                className="btn newsletter-btn" 
                disabled={isLoading} 
                style={{ backgroundColor: '#F59E0B', color: '#000000', alignSelf: 'flex-start' }}
              >
                {isLoading ? 'Sending...' : 'Get Free Monthly Benchmarks →'}
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
