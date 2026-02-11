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
        </div>
    );
}
