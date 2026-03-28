'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

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

    try {
      // Save to Supabase
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          { 
            email: email.toLowerCase().trim(),
            subscribed_at: new Date().toISOString()
          }
        ]);

      if (error) {
        // Check if email already exists
        if (error.code === '23505') {
          setErrorMsg('Ye email already subscribed hai!');
          return;
        }
        throw error;
      }

      // Send Welcome Email using EmailJS
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          service_id: process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_KEY,
          template_id: process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE,
          user_id: process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY,
          template_params: {
            to_email: email.trim(),
            user_email: email.trim(),
            reply_to: 'hello@desifoundertools.com' // Optional but good practice
          }
        })
      });

      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
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
