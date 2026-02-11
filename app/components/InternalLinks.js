import Link from 'next/link';

export default function InternalLinks({ current }) {
    const links = [
        { href: '/calculators/growth-revenue-calculator', label: 'Growth & Revenue Toolbox' },
        { href: '/calculators/efficiency-calculator', label: 'Efficiency Toolbox' },
        { href: '/calculators/retention-calculator', label: 'Retention Toolbox' },
        { href: '/calculators/pipeline-velocity-calculator', label: 'Pipeline Velocity Toolbox' },
        { href: '/calculators/runway-calculator', label: 'Runway Calculator' },
        { href: '/calculators/burn-rate-calculator', label: 'Burn Rate Calculator' },
        { href: '/calculators/break-even-calculator', label: 'Break-Even Calculator' },
        { href: '/calculators/cap-table-calculator', label: 'Cap Table Calculator' },
        { href: '/calculators/hardware-cost-calculator', label: 'Hardware Cost Calculator' },
        { href: '/calculators/unit-economics-calculator', label: 'Unit Economics Calculator' },
    ];

    return (
        <div className="internal-links">
            <h3>More Tools for Founders</h3>
            <div className="links-grid">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`internal-link ${current === link.href ? 'active' : ''}`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
            <style jsx>{`
        .internal-links {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid var(--color-border);
        }
        
        .internal-links h3 {
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
          color: var(--color-text-bright);
        }

        .links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1rem;
        }

        .internal-link {
          display: block;
          padding: 0.75rem 1rem;
          background: var(--color-bg-subtle);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          color: var(--color-text-secondary);
          font-size: 0.938rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .internal-link:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
          background: var(--color-bg-card-hover);
        }

        .internal-link.active {
          background: var(--color-gold-glow);
          border-color: var(--color-gold);
          color: var(--color-gold);
        }
      `}</style>
        </div>
    );
}
