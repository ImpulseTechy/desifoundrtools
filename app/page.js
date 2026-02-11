import CalculatorCard from './components/CalculatorCard';

export default function HomePage() {
  const tools = [
    {
      icon: '🚀',
      title: 'Growth & Revenue Toolbox',
      description: 'Track ARR, MRR, CMGR, and Net New ARR to measure the true speed of your startup.',
      href: '/calculators/growth-revenue-calculator',
    },
    {
      icon: '💎',
      title: 'Efficiency Toolbox',
      description: 'VC favorites: Burn Multiple, Magic Number, and Rule of 40. Measure capital efficiency.',
      href: '/calculators/efficiency-calculator',
    },
    {
      icon: '🧲',
      title: 'Retention Toolbox',
      description: 'Analyze Logo Churn, GRR, and NRR. Fix your "leaky bucket" before scaling.',
      href: '/calculators/retention-calculator',
    },
    {
      icon: '⚡',
      title: 'Pipeline Velocity Toolbox',
      description: 'Optimize Sales Velocity and compare CAC by Channel (LinkedIn vs Cold Outreach).',
      href: '/calculators/pipeline-velocity-calculator',
    },
    {
      icon: '⏳',
      title: 'Runway Calculator (Survival)',
      description: 'Includes Post-GST Runway, Zero-Revenue Stress Test, and Default Alive status.',
      href: '/calculators/runway-calculator',
    },
    {
      icon: '🔥',
      title: 'Burn Rate Calculator',
      description: 'Distinguish Gross vs Net Burn. Ensure your spending is generating efficient growth.',
      href: '/calculators/burn-rate-calculator',
    },
    {
      icon: '📈',
      title: 'Unit Economics Calculator',
      description: 'Calculate LTV:CAC, Contribution Margin, and Payback Period. The "Golden Ratio" check.',
      href: '/calculators/unit-economics-calculator',
    },
    {
      icon: '📊',
      title: 'Cap Table Dilution Calculator',
      description: 'Understand how new fundraising rounds dilute your ownership stake and plan accordingly.',
      href: '/calculators/cap-table-dilution-calculator',
    },
    {
      icon: '⚖️',
      title: 'Break-Even Calculator',
      description: 'Calculate the exact number of units you need to sell to cover your fixed and variable costs.',
      href: '/calculators/break-even-calculator',
    },
    {
      icon: '🔧',
      title: 'Hardware Startup Cost Calculator',
      description: 'Estimate per-unit cost including BOM, manufacturing, GST, and set your selling price.',
      href: '/calculators/hardware-startup-cost-calculator',
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <span className="hero-badge">🇮🇳 Built for Indian Founders</span>
          <h1>Know Your Numbers <em>Before You Pitch.</em></h1>
          <p>Investor-level financial clarity for Indian founders. <br />SaaS Metrics, Burn Rate, Runway, and more — free forever.</p>
          <div className="hero-actions">
            <a href="#calculators" className="btn btn-primary">Start Calculating →</a>
            <a href="/calculators/growth-revenue-calculator" className="btn btn-secondary">Explore Growth Toolbox</a>
          </div>
        </div>
      </section>

      {/* FEATURED TOOLS */}
      <section className="section" id="calculators">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Investor-Grade Calculators</h2>
          <p style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto', marginBottom: '3rem', color: 'var(--color-text-muted)' }}>
            Financial tools designed for founders who take their numbers seriously.
          </p>
          <div className="tools-grid">
            {tools.map((tool) => (
              <CalculatorCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY STARTUP FINANCE MATTERS */}
      <section className="section-alt">
        <div className="container">
          <div className="why-section">
            <h2>Why Startup Finance Matters</h2>
            <p>
              India has one of the fastest-growing startup ecosystems in the world, yet over 90% of startups fail within the first five years — often due to poor financial planning rather than a bad product. Understanding your burn rate, managing runway, and planning for equity dilution are not optional skills — they are survival skills. Whether you are a student founder building from a hostel room or a bootstrapped entrepreneur in a tier-2 city, financial literacy gives you the clarity to make informed decisions, negotiate better with investors, and build a sustainable business. These tools are built to help you do exactly that — quickly, clearly, and for free.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-section">
            <h2>Built by a Founder, for Founders</h2>
            <p>
              Desi Founder Tools was created to solve a real problem: making financial planning accessible for early-stage Indian entrepreneurs. No jargon, no complexity — just practical tools that help you build with confidence.
            </p>
            <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)', fontSize: '0.938rem' }}>
              For founders who take their numbers seriously.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
