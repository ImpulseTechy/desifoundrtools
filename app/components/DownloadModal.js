'use client';

import { useState } from 'react';

export default function DownloadModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

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
    <div 
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem'
      }}
      onClick={(e) => {
        if (e.target.className === 'modal-overlay') onClose();
      }}
    >
      <div 
        style={{
          background: '#161b22', /* var(--color-bg-card) */
          border: '1px solid #30363d', /* var(--color-border-light) */
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          maxWidth: '400px',
          width: '100%',
          position: 'relative',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.6)'
        }}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: '#9ca3af',
            fontSize: '1.5rem',
            lineHeight: 1,
            cursor: 'pointer',
            padding: '0.25rem'
          }}
          aria-label="Close"
        >
          ✕
        </button>

        <div style={{ textAlign: 'center', marginBottom: submitted ? '0' : '1.5rem' }}>
          <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem', color: '#ffffff' }}>📗 Free Download!</h2>
          <h3 style={{ fontSize: '1.15rem', color: '#f5a623', marginBottom: '1rem', fontWeight: '700' }}>Indian Startup Finance Handbook 2026</h3>
          {!submitted && (
            <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6', margin: '0' }}>
              Email do — PDF link bhej denge turant!<br/>
              1,000+ founders already downloaded.
            </p>
          )}
        </div>

        {submitted ? (
          <div style={{ 
            padding: '1.5rem', 
            background: 'rgba(16, 185, 129, 0.1)', 
            border: '1px solid #10b981', 
            borderRadius: '12px', 
            color: '#10b981', 
            fontSize: '1.1rem', 
            fontWeight: '500', 
            textAlign: 'center',
            lineHeight: '1.5'
          }}>
            ✅ Check karo inbox!<br/>PDF link bhej diya. 📗
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <input
              type="text"
              name="b_91900dd5777f9d1bf53583645_a646f092cc"
              tabIndex="-1"
              value=""
              style={{ position: 'absolute', left: '-5000px' }}
              aria-hidden="true"
              readOnly
            />

            <div style={{ position: 'relative' }}>
              <input
                type="email"
                name="EMAIL"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="your@startup.com"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '8px',
                  border: `1px solid ${errorMsg ? '#ef4444' : '#30363d'}`,
                  background: '#0d1117',
                  color: '#ffffff',
                  fontSize: '1.05rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {errorMsg && (
                <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '6px', fontWeight: '500' }}>
                  {errorMsg}
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.875rem',
                backgroundColor: '#F59E0B',
                color: '#000000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.05rem',
                fontWeight: '700',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: isLoading ? 0.8 : 1
              }}
            >
              {isLoading ? 'Sending...' : 'Send Karo Free →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
