'use client';

export default function InsightCard({ insight }) {
    if (!insight) return null;

    return (
        <div className={`insight-card ${insight.type}`}>
            <div className="insight-header">
                <div className={`insight-gauge ${insight.type}`} />
                <span className="insight-title">Founder's Verdict</span>
            </div>
            <div className="insight-verdict">{insight.verdict}</div>
            <div className="insight-text">{insight.text}</div>
            {insight.steps && (
                <div className="action-steps">
                    <h4>Actionable Steps:</h4>
                    <ul>
                        {insight.steps.map((step, i) => (
                            <li key={i} className="action-step-item">{step}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
