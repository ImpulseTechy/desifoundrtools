import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="footer-brand-link" aria-label="Desi Founder Tools home">
            <Image
              src="/desi-founder-tools-logo.svg"
              alt=""
              width={36}
              height={36}
              className="footer-brand-mark"
            />
            <span className="footer-brand-copy">
              <span className="footer-brand-name">Desi Founder Tools</span>
              <span className="footer-brand-meta">Clarity before the pitch</span>
            </span>
          </Link>

          <p className="footer-text">
            © {new Date().getFullYear()} <span>Desi Founder Tools</span>. All rights reserved.
          </p>
        </div>

        <ul className="footer-links">
          <li><Link href="/#about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/privacy">Privacy Policy</Link></li>
          <li><Link href="/disclaimer">Disclaimer</Link></li>
        </ul>

        <p className="footer-tagline">
          <em>Built for founders who take their numbers seriously.</em>
        </p>
      </div>
    </footer>
  );
}
