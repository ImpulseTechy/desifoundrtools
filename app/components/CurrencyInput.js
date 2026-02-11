'use client';

export default function CurrencyInput({ label, value, onChange, prefix = '₹', suffix, placeholder = '0' }) {
    return (
        <div className="input-group">
            <label>{label}</label>
            <div className={`input-wrapper ${!prefix ? 'no-prefix' : ''}`}>
                {prefix && <span className="input-prefix">{prefix}</span>}
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    min="0"
                    step="any"
                />
                {suffix && <span className="input-suffix">{suffix}</span>}
            </div>
        </div>
    );
}
