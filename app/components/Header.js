'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const calculators = [
    { name: 'Burn Rate Calculator', href: '/calculators/burn-rate-calculator' },
    { name: 'Runway Calculator', href: '/calculators/runway-calculator' },
    { name: 'Break-Even Calculator', href: '/calculators/break-even-calculator' },
    { name: 'Cap Table Dilution', href: '/calculators/cap-table-dilution-calculator' },
    { name: 'Hardware Startup Cost', href: '/calculators/hardware-startup-cost-calculator' },
    { name: 'Unit Economics', href: '/calculators/unit-economics-calculator' },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <>
      <header className="header" id="search">
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

          {searchOpen ? (
            <div className="search-bar" ref={searchRef}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search calculators and guides..."
                className="search-input"
              />
              <button
                className="search-close"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                ✕
              </button>
            </div>
          ) : (
            <nav>
              <ul className="header-nav">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/#calculators">Calculators</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/resources">Resources</Link></li>
                <li><Link href="/benchmarks">Benchmarks</Link></li>
                <li><Link href="/shark-tank-glossary">Glossary</Link></li>
                <li><Link href="/laala-calculators">Laala Calculators</Link></li>
                <li><Link href="/#about">About</Link></li>
                <li>
                  <button
                    className="search-toggle"
                    onClick={() => setSearchOpen(true)}
                    aria-label="Open search"
                  >
                    🔍
                  </button>
                </li>
              </ul>
            </nav>
          )}

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
        <Link href="/#calculators" onClick={() => setMenuOpen(false)}>Calculators</Link>
        <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
        <Link href="/resources" onClick={() => setMenuOpen(false)}>Resources</Link>
        <Link href="/benchmarks" onClick={() => setMenuOpen(false)}>Benchmarks</Link>
        <Link href="/shark-tank-glossary" onClick={() => setMenuOpen(false)}>Glossary</Link>
        <Link href="/laala-calculators" onClick={() => setMenuOpen(false)}>Laala Calculators</Link>
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
