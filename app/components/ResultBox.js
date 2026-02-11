export default function ResultBox({ results }) {
    return (
        <div className="result-box">
            <h3>Results</h3>
            {results.map((item, i) => (
                <div className="result-item" key={i}>
                    <div className="result-label">{item.label}</div>
                    <div className={`result-value ${item.small ? 'small' : ''}`}>{item.value}</div>
                </div>
            ))}
        </div>
    );
}
