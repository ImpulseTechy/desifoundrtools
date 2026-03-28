'use client';

import { useState } from 'react';
import DownloadModal from '../components/DownloadModal';

export default function ResourcesClient() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="calc-page">
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Free Resources 📚</h1>
        <p className="calc-subtitle" style={{ textAlign: 'center', margin: '0 auto 3rem auto' }}>
          Indian founders ke liye — bilkul free
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '500px', margin: '0 auto' }}>
          {/* Resource Card */}
          <div style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'var(--color-gold-glow)',
                border: '1px solid rgba(245, 166, 35, 0.15)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem'
              }}>
                📗
              </div>
              <span style={{
                padding: '0.4rem 0.8rem',
                background: 'var(--color-gold-glow)',
                color: 'var(--color-gold)',
                border: '1px solid rgba(245, 166, 35, 0.2)',
                borderRadius: '100px',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.05em'
              }}>
                FREE DOWNLOAD
              </span>
            </div>
            
            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-text-bright)', marginBottom: '0.75rem' }}>
              Indian Startup Finance Handbook 2026
            </h2>
            
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
              Burn rate, runway, LTV:CAC, cap table — sab kuch India context mein. GST-aware. INR-based. 47 pages.
            </p>
            
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: '500' }}>
              47 pages • INR-based • GST-aware • Free
            </div>
            
            <button 
              onClick={() => setModalOpen(true)}
              className="btn" 
              style={{ width: '100%', backgroundColor: '#F59E0B', color: '#000000', fontWeight: '700' }}
            >
              Download Free →
            </button>
          </div>
        </div>
      </div>
      
      <DownloadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
