import Link from 'next/link';

export default function CalculatorCard({ icon, title, description, href }) {
    return (
        <Link href={href} className="tool-card">
            <div className="tool-card-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
            <span className="tool-card-link">
                Try Calculator →
            </span>
        </Link>
    );
}
