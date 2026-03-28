import Link from 'next/link';
import NewsletterSection from '../components/NewsletterSection';

export default function BenchmarksPage() {
  const survivalBenchmarks = [
    { number: '₹5–15L', label: 'Seed Stage Monthly Burn', description: 'Typical monthly spend for a pre-PMF Indian startup with a lean team of 5-8 people.' },
    { number: '18 mo', label: 'Ideal Post-Round Runway', description: 'Enough time to hit the next major milestone and comfortably fundraise for 6 months.' },
    { number: '₹50L+', label: 'Pre-seed Check Size', description: 'Typical micro-VC or angel syndicate check size for an MVP-stage startup in India.' },
  ];

  const growthBenchmarks = [
    { number: '110%+', label: 'Good NRR for SaaS', description: 'Net Revenue Retention above 110% indicates strong product-market fit and healthy expansion revenue.' },
    { number: '10–15%', label: 'Target MoM Revenue', description: 'Expected monthly growth velocity for Seed to Pre-Series A startups actively scaling.' },
    { number: '< 5%', label: 'Monthly Logo Churn', description: 'For SMB/Mid-market SaaS. Anything higher indicates a "leaky bucket" that needs fixing before scaling.' },
  ];

  const fundraisingBenchmarks = [
    { number: '3:1', label: 'Healthy LTV:CAC Ratio', description: 'Customer Lifetime Value should be at least 3x the Cost of Acquisition. The golden metric for sustainable growth.' },
    { number: '< 12 mo', label: 'Ideal CAC Payback', description: 'Time it takes to recover acquisition costs. Less than 12 months is highly attractive to Series A investors.' },
    { number: '15–20%', label: 'Typical Seed Dilution', description: 'Percentage of equity typically given up in a standard Indian seed round.' },
  ];

  return (
    <>
      <section className="hero" style={{ padding: '8rem 0 4rem', minHeight: 'auto' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="hero-badge">📊 2026 Data</span>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Indian Startup <em>Benchmarks</em></h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)' }}>
            Know exactly what investors expect at your stage. Compare your metrics against industry standards for SaaS, D2C, and Tech startups in India.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '950px' }}>
          
          <div className="category-section" style={{ marginBottom: '4.5rem' }}>
            <h2 className="category-heading" style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>🔥 Survival & Runway</h2>
            <div className="benchmarks-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {survivalBenchmarks.map((b, i) => (
                <div key={i} className="benchmark-card" style={{ textAlign: 'left', alignItems: 'flex-start', padding: '2rem' }}>
                  <span className="benchmark-number" style={{ color: 'var(--color-gold)' }}>{b.number}</span>
                  <span className="benchmark-label" style={{ fontSize: '1.125rem', color: 'var(--color-text)', marginTop: '0.75rem', marginBottom: '0.5rem' }}>{b.label}</span>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.938rem', lineHeight: '1.5', margin: 0 }}>{b.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="category-section" style={{ marginBottom: '4.5rem' }}>
            <h2 className="category-heading" style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>📈 Growth & Retention</h2>
            <div className="benchmarks-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {growthBenchmarks.map((b, i) => (
                <div key={i} className="benchmark-card" style={{ textAlign: 'left', alignItems: 'flex-start', padding: '2rem' }}>
                  <span className="benchmark-number" style={{ color: 'var(--color-blue)' }}>{b.number}</span>
                  <span className="benchmark-label" style={{ fontSize: '1.125rem', color: 'var(--color-text)', marginTop: '0.75rem', marginBottom: '0.5rem' }}>{b.label}</span>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.938rem', lineHeight: '1.5', margin: 0 }}>{b.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="category-section" style={{ marginBottom: '4.5rem' }}>
            <h2 className="category-heading" style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>💰 Fundraising & Unit Economics</h2>
            <div className="benchmarks-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {fundraisingBenchmarks.map((b, i) => (
                <div key={i} className="benchmark-card" style={{ textAlign: 'left', alignItems: 'flex-start', padding: '2rem' }}>
                  <span className="benchmark-number" style={{ color: 'var(--color-green)' }}>{b.number}</span>
                  <span className="benchmark-label" style={{ fontSize: '1.125rem', color: 'var(--color-text)', marginTop: '0.75rem', marginBottom: '0.5rem' }}>{b.label}</span>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.938rem', lineHeight: '1.5', margin: 0 }}>{b.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2rem' }}>
            <Link href="/#calculators" className="btn btn-primary">Calculate Your Metrics Now →</Link>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
