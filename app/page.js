import CalculatorCard from './components/CalculatorCard';
import NewsletterSection from './components/NewsletterSection';

export default function HomePage() {
  const survivalTools = [
    {
      icon: '🔥',
      title: 'Burn Rate Calculator',
      description: 'Distinguish Gross vs Net Burn. Ensure your spending is generating efficient growth.',
      href: '/calculators/burn-rate-calculator',
      category: 'Survival',
      categoryColor: 'red',
      outputPreview: 'Monthly burn, Net burn, Runway impact',
      timeEstimate: '⏱ ~2 min to complete',
      isPopular: true,
    },
    {
      icon: '⏳',
      title: 'Runway Calculator (Survival)',
      description: 'Includes Post-GST Runway, Zero-Revenue Stress Test, and Default Alive status.',
      href: '/calculators/runway-calculator',
      category: 'Survival',
      categoryColor: 'red',
      outputPreview: 'Months of runway, Default Alive status',
      timeEstimate: '⏱ ~2 min to complete',
      isPopular: true,
    },
  ];

  const growthTools = [
    {
      icon: '🚀',
      title: 'Growth & Revenue Toolbox',
      description: 'Track ARR, MRR, CMGR, and Net New ARR to measure the true speed of your startup.',
      href: '/calculators/growth-revenue-calculator',
      category: 'Growth',
      categoryColor: 'blue',
      outputPreview: 'ARR, MRR, CMGR, Net New ARR',
      timeEstimate: '⏱ ~2 min to complete',
    },
    {
      icon: '💎',
      title: 'Efficiency Toolbox',
      description: 'VC favorites: Burn Multiple, Magic Number, and Rule of 40. Measure capital efficiency.',
      href: '/calculators/efficiency-calculator',
      category: 'Growth',
      categoryColor: 'blue',
      outputPreview: 'Burn Multiple, Magic Number, Rule of 40 score',
      timeEstimate: '⏱ ~2 min to complete',
    },
    {
      icon: '🧲',
      title: 'Retention Toolbox',
      description: 'Analyze Logo Churn, GRR, and NRR. Fix your "leaky bucket" before scaling.',
      href: '/calculators/retention-calculator',
      category: 'Growth',
      categoryColor: 'blue',
      outputPreview: 'Logo Churn rate, GRR, NRR score',
      timeEstimate: '⏱ ~2 min to complete',
    },
    {
      icon: '⚡',
      title: 'Pipeline Velocity Toolbox',
      description: 'Optimize Sales Velocity and compare CAC by Channel (LinkedIn vs Cold Outreach).',
      href: '/calculators/pipeline-velocity-calculator',
      category: 'Growth',
      categoryColor: 'blue',
      outputPreview: 'Sales Velocity score, CAC by channel',
      timeEstimate: '⏱ ~2 min to complete',
    },
  ];

  const fundraisingTools = [
    {
      icon: '📈',
      title: 'Unit Economics Calculator',
      description: 'Calculate LTV:CAC, Contribution Margin, and Payback Period. The "Golden Ratio" check.',
      href: '/calculators/unit-economics-calculator',
      category: 'Fundraising',
      categoryColor: 'green',
      outputPreview: 'LTV:CAC ratio, Payback period in months',
      timeEstimate: '⏱ ~2 min to complete',
      isPopular: true,
    },
    {
      icon: '📊',
      title: 'Cap Table Dilution Calculator',
      description: 'Understand how new fundraising rounds dilute your ownership stake and plan accordingly.',
      href: '/calculators/cap-table-dilution-calculator',
      category: 'Fundraising',
      categoryColor: 'green',
      outputPreview: 'Post-round ownership %, total dilution',
      timeEstimate: '⏱ ~2 min to complete',
    },
    {
      icon: '⚖️',
      title: 'Break-Even Calculator',
      description: 'Calculate the exact number of units you need to sell to cover your fixed and variable costs.',
      href: '/calculators/break-even-calculator',
      category: 'Fundraising',
      categoryColor: 'green',
      outputPreview: 'Units to break even, months to profitability',
      timeEstimate: '⏱ ~2 min to complete',
    },
    {
      icon: '🔧',
      title: 'Hardware Startup Cost Calculator',
      description: 'Estimate per-unit cost including BOM, manufacturing, GST, and set your selling price.',
      href: '/calculators/hardware-startup-cost-calculator',
      category: 'Fundraising',
      categoryColor: 'green',
      outputPreview: 'True unit cost, recommended selling price',
      timeEstimate: '⏱ ~2 min to complete',
    },
  ];

  const laalaTools = [
    {
      icon: '🏪',
      title: 'Dukaan Profit Calculator',
      description: 'Roz ka hisaab — ek baar mein. Kitna maal kharida, kitna becha, aur haath mein kya bachha.',
      href: '/laala-calculators#dukaan-profit',
      category: 'Laala Tools',
      categoryColor: 'gold',
      isPopular: true,
    },
    {
      icon: '🧾',
      title: 'GST Calculator',
      description: 'GST ka hisaab — seedha aur simple. Buyer ho ya seller — dono ke liye ek hi jagah.',
      href: '/laala-calculators#gst-calculator',
      category: 'Laala Tools',
      categoryColor: 'gold',
    },
    {
      icon: '📈',
      title: 'Markup & Selling Price Calculator',
      description: 'Sahi daam lagao — na zyada, na kam. Cost price se selling price ka seedha hisaab.',
      href: '/laala-calculators#markup-calculator',
      category: 'Laala Tools',
      categoryColor: 'gold',
    },
    {
      icon: '🏦',
      title: 'EMI Calculator',
      description: 'Loan ki kist kitni banti hai? Afford hoga ya nahi — pehle hi pata karo.',
      href: '/laala-calculators#emi-calculator',
      category: 'Laala Tools',
      categoryColor: 'gold',
    },
    {
      icon: '👷',
      title: 'Staff Salary Calculator',
      description: 'Basic salary se lekar PF, ESIC aur actual cost — sab ek baar mein calculate karo.',
      href: '/laala-calculators#staff-salary',
      category: 'Laala Tools',
      categoryColor: 'gold',
    },
  ];

  const testimonials = [
    {
      stars: 5,
      quote: 'Finally a financial tool that understands Indian startup realities. The GST-aware runway calculator saved my pitch preparation.',
      name: 'Priya S.',
      role: 'SaaS Founder',
      city: 'Bangalore',
    },
    {
      stars: 5,
      quote: 'Used the Cap Table calculator before my seed round. Understood dilution clearly for the first time without hiring a CA.',
      name: 'Arjun M.',
      role: 'D2C Founder',
      city: 'Mumbai',
    },
    {
      stars: 5,
      quote: 'The burn rate calculator with INR defaults is exactly what I needed. No more confusing dollar-based tools.',
      name: 'Sneha R.',
      role: 'EdTech Founder',
      city: 'Pune',
    },
  ];

  const benchmarks = [
    { number: '₹5–15L', label: 'Seed Stage Monthly Burn' },
    { number: '3:1', label: 'Healthy LTV:CAC Ratio' },
    { number: '18 mo', label: 'Ideal Post-Round Runway' },
    { number: '110%+', label: 'Good NRR for SaaS' },
    { number: '10–15%', label: 'Target MoM Revenue Growth' },
    { number: '< 12 mo', label: 'Ideal CAC Payback Period' },
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
            <a href="#calculators" className="btn btn-secondary">See All Tools</a>
          </div>
          <div className="trust-bar">
            <span className="trust-pill">🔧 Free Tools</span>
            <span className="trust-pill">⚡ No Signup Needed</span>
            <span className="trust-pill">🇮🇳 GST-Aware</span>
            <span className="trust-pill">₹ INR-Based</span>
            <span className="trust-pill">📊 Investor-Grade</span>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-heading">Built for Founders Like You</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">
                  {'⭐'.repeat(t.stars)}
                </div>
                <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testimonial-author">
                  <span className="testimonial-name">— {t.name}</span>
                  <span className="testimonial-role">{t.role}, {t.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how-it-works-section">
        <div className="container">
          <h2 className="section-heading">How It Works</h2>
          <p className="section-subtext">Get investor-grade clarity in under 2 minutes</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">🎯</div>
              <h3>Choose Your Metric</h3>
              <p>Pick from free India-specific calculators built for your startup stage</p>
            </div>
            <div className="step-connector">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M0 12H36M36 12L28 4M36 12L28 20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">🔢</div>
              <h3>Enter Your Numbers</h3>
              <p>INR-based inputs, pre-filled with realistic Indian startup defaults</p>
            </div>
            <div className="step-connector">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M0 12H36M36 12L28 4M36 12L28 20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">📊</div>
              <h3>Get Investor-Grade Clarity</h3>
              <p>Instant results with Indian startup benchmarks so you know exactly where you stand</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR SECTIONS */}
      <section className="section" id="calculators">
        <div className="container">

          {/* Survival */}
          <div className="category-section">
            <h2 className="category-heading">🔥 Survival Metrics</h2>
            <p className="category-subtext">Start here — most critical for early-stage founders</p>
            <div className="tools-grid tools-grid--2col">
              {survivalTools.map((tool) => (
                <CalculatorCard key={tool.href} {...tool} />
              ))}
            </div>
          </div>

          {/* Growth */}
          <div className="category-section">
            <h2 className="category-heading">📈 Growth Metrics</h2>
            <p className="category-subtext">Track and optimize your startup&apos;s velocity</p>
            <div className="tools-grid tools-grid--2col">
              {growthTools.map((tool) => (
                <CalculatorCard key={tool.href} {...tool} />
              ))}
            </div>
          </div>

          {/* Fundraising */}
          <div className="category-section">
            <h2 className="category-heading">💰 Fundraising &amp; Economics</h2>
            <p className="category-subtext">Prepare for investor conversations</p>
            <div className="tools-grid tools-grid--2col">
              {fundraisingTools.map((tool) => (
                <CalculatorCard key={tool.href} {...tool} />
              ))}
            </div>
          </div>

          {/* Laala Ki Dukaan */}
          <div className="category-section">
            <h2 className="category-heading">🧔 Laala Ki Dukaan</h2>
            <p className="category-subtext">Roz ke kaam ke calculators — bilkul seedhe, bilkul free</p>
            <div className="tools-grid tools-grid--2col">
              {laalaTools.map((tool) => (
                <CalculatorCard key={tool.href} {...tool} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* INDIA BENCHMARKS */}
      <section className="section-alt benchmarks-section">
        <div className="container">
          <h2 className="section-heading">Indian Startup Benchmarks 2026</h2>
          <p className="section-subtext">Know what investors expect at your stage</p>
          <div className="benchmarks-grid">
            {benchmarks.map((b, i) => (
              <div key={i} className="benchmark-card">
                <span className="benchmark-number">{b.number}</span>
                <span className="benchmark-label">{b.label}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="/benchmarks" className="btn btn-outline">📊 View Full India Benchmarks →</a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <NewsletterSection />

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
