'use client';

import { useState } from 'react';

export default function FAQ({ items }) {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            {items.map((item, i) => (
                <div className="faq-item" key={i}>
                    <button
                        className="faq-question"
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        aria-expanded={openIndex === i}
                    >
                        {item.question}
                        <svg
                            className={`faq-icon ${openIndex === i ? 'open' : ''}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                    </button>
                    {openIndex === i && (
                        <div className="faq-answer">{item.answer}</div>
                    )}
                </div>
            ))}
        </div>
    );
}
