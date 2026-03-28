'use client';

import Link from 'next/link';

export default function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav">
      <Link href="/" className="mobile-bottom-item">
        <span className="mobile-bottom-icon">🏠</span>
        <span>Home</span>
      </Link>
      <Link href="/#calculators" className="mobile-bottom-item">
        <span className="mobile-bottom-icon">🧮</span>
        <span>Tools</span>
      </Link>
      <Link href="/blog" className="mobile-bottom-item">
        <span className="mobile-bottom-icon">📝</span>
        <span>Blog</span>
      </Link>
      <Link href="/#search" className="mobile-bottom-item">
        <span className="mobile-bottom-icon">🔍</span>
        <span>Search</span>
      </Link>
    </nav>
  );
}
