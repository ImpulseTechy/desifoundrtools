'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const calculators = [
    { name: 'Burn Rate Calculator', href: '/calculators/burn-rate-calculator' },
    { name: 'Runway Calculator', href: '/calculators/runway-calculator' },
    { name: 'Break-Even Calculator', href: '/calculators/break-even-calculator' },
    { name: 'Cap Table Dilution', href: '/calculators/cap-table-dilution-calculator' },
    { name: 'Hardware Startup Cost', href: '/calculators/hardware-startup-cost-calculator' },
    { name: 'Unit Economics', href: '/calculators/unit-economics-calculator' },
  ];

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="header-logo" aria-label="Desi Founder Tools home">
            <Image
              src="/desi-founder-tools-logo.svg"
              alt=""
              width={42}
              height={42}
              priority
              className="header-logo-mark"
            />
            <span className="header-logo-copy">
              <span className="header-logo-title">
                Desi <span>Founder</span> Tools
              </span>
              <span className="header-logo-tag">Investor-grade startup finance for India</span>
            </span>
          </Link>

          <nav>
            <ul className="header-nav">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#calculators">Calculators</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/#about">About</Link></li>
            </ul>
          </nav>

          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        {calculators.map((calc) => (
          <Link key={calc.href} href={calc.href} onClick={() => setMenuOpen(false)}>
            {calc.name}
          </Link>
        ))}
        <Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link>
      </div>
    </>
  );
}
