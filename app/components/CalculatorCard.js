import Link from 'next/link';

export default function CalculatorCard({ icon, title, description, href, category, categoryColor, outputPreview, timeEstimate, isPopular }) {
    return (
        <Link href={href} className={`tool-card ${categoryColor ? `tool-card--${categoryColor}` : ''}`}>
            {isPopular && <span className="popular-badge">🏆 Most Popular</span>}
            {category && <span className={`category-badge category-badge--${categoryColor}`}>{category}</span>}
            <div className="tool-card-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
            {outputPreview && (
                <p className="output-preview">📤 Output: {outputPreview}</p>
            )}
            {timeEstimate && (
                <p className="time-estimate">{timeEstimate}</p>
            )}
            <span className="tool-card-link">
                Try Calculator →
            </span>
        </Link>
    );
}
