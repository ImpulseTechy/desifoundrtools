import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <p className="footer-text">
                    © {new Date().getFullYear()} <span>Desi Founder Tools</span>. All rights reserved.
                </p>
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
