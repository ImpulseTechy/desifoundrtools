'use client';

import { useState } from 'react';
import CurrencyInput from '../../components/CurrencyInput';
import FAQ from '../../components/FAQ';
import AdPlaceholder from '../../components/AdPlaceholder';
import PremiumCTA from '../../components/PremiumCTA';
import InternalLinks from '../../components/InternalLinks';
import InsightCard from '../../components/InsightCard';
import Link from 'next/link';

/* Result Card */
function ResultCard({ label, value, tooltip, status }) {
    return (
        <div className={`ue-result-card ${status || ''}`}>
            <div className="ue-result-label">
                {label}
                {tooltip && (
                    <span className="ue-tooltip-wrap"> ℹ️
                        <span className="ue-tooltip-text">{tooltip}</span>
                    </span>
                )}
            </div>
            <div className="ue-result-value">{value}</div>
        </div>
    );
}

export default function BurnRateCalculator() {
    const [expenses, setExpenses] = useState('');
    const [revenue, setRevenue] = useState('');

    const e = Number(expenses) || 0;
    const r = Number(revenue) || 0;

    const netBurn = e - r;
    const grossBurn = e;

    // Burn Multiple = Net Burn / Net New Revenue (But here we only have Total Revenue)
    // Standard Burn Multiple usually requires Net New ARR. 
    // However, for simple burn rate, sometimes Burn Multiple is defined as Burn/Revenue (Inverse of efficiency)?
    // No, standard is Net Burn / Net New ARR.
    // Let's stick to "Burn / Revenue" ratio if user doesn't provide Net New ARR.
    // Or just simple "Expense Coverage" = Revenue / Expenses %

    // User asked for "Burn Multiple: Net Burn / Net New ARR" in Efficiency Toolbox.
    // Here in Burn Rate calculator, let's keep it simple: Gross vs Net.

    const formatCurrency = (val) => '₹' + Number(val).toLocaleString('en-IN');

    /* ── Consultant Logic ── */
    const getInsight = () => {
        if (!expenses) return null;

        if (netBurn <= 0) {
            return {
                type: 'good',
                verdict: 'Profitable (Default Alive) 🚀',
                text: 'You are profitable! Your revenue covers all expenses. You are in control.',
                steps: ['Reinvest profits into growth.', 'Build a cash reserve.']
            };
        }

        if (r === 0) {
            return {
                type: 'warning',
                verdict: 'Pre-Revenue Burn',
                text: `You are burning ${formatCurrency(netBurn)} monthly with no revenue. Ensure you have 18+ months runway.`,
                steps: ['Validate PMF quickly.', 'Keep fixed costs low.']
            };
        }

        // Revenue < Expenses
        const coverage = (r / e) * 100;

        if (coverage > 80) {
            return {
                type: 'good',
                verdict: 'Near Profitability ✅',
                text: `Your revenue covers ${coverage.toFixed(0)}% of your expenses. You are very close to break-even.`,
                steps: ['Push sales to close the gap.', 'Avoid increasing costs until profitable.']
            };
        }

        return {
            type: 'warning',
            verdict: 'High Burn ⚠️',
            text: `You are burning ${formatCurrency(netBurn)} net every month. Your revenue only covers ${coverage.toFixed(0)}% of costs.`,
            steps: ['Monitor runway closely.', 'Focus on high-margin revenue.']
        };
    };

    const insight = getInsight();

    const faqItems = [
        {
            question: 'Gross Burn vs Net Burn?',
            answer: 'Gross Burn is total money spent. Net Burn is money lost (Spend - Revenue). Investors care about Net Burn for survival, but Gross Burn for efficiency.'
        },
        {
            question: 'What is a good burn rate?',
            answer: 'It depends on your stage. Seed stage: ₹3-5 Lakhs/mo. Series A: ₹30-50 Lakhs/mo. The key is that Burn should generate Growth.'
        }
    ];

    return (
        <div className="calc-page">
            <div className="container">
                <div className="breadcrumb">
                    <Link href="/">Home</Link>
                    <span className="breadcrumb-sep">/</span>
                    <Link href="/#calculators">Calculators</Link>
                    <span className="breadcrumb-sep">/</span>
                    <span>Burn Rate Calculator</span>
                </div>

                <h1>Burn Rate Calculator</h1>
                <p className="calc-subtitle">Understand your cash burn. Measure Gross vs Net Burn.</p>

                <div className="ue-calc-layout">
                    <div className="calc-inputs" style={{ gridColumn: 'span 1' }}>
                        <h3>Monthly Financials</h3>
                        <CurrencyInput label="Total Monthly Expenses (Gross Burn) (₹)" value={expenses} onChange={setExpenses} />
                        <CurrencyInput label="Total Monthly Revenue (₹)" value={revenue} onChange={setRevenue} />
                    </div>

                    <div className="calc-results" style={{ gridColumn: 'span 1' }}>
                        <div className="ue-results-header">🔥 Burn Analysis</div>
                        <div className="ue-results-grid">
                            <ResultCard label="Net Burn Rate" value={netBurn <= 0 ? 'Profitable' : formatCurrency(netBurn)} status={netBurn <= 0 ? 'healthy' : 'warning'} tooltip="Expenses - Revenue" />
                            <ResultCard label="Gross Burn Rate" value={formatCurrency(grossBurn)} tooltip="Total Expenses" />
                            {r > 0 && <ResultCard label="Revenue vs Expense" value={((r / e) * 100).toFixed(0) + '%'} tooltip="% of costs covered by revenue" />}
                        </div>
                        <InsightCard insight={insight} />
                    </div>
                </div>

                <AdPlaceholder />

                <div className="content-section">
                    <h2>Gross vs Net Burn</h2>
                    <p>Investors often ask for both.</p>
                    <ul>
                        <li><strong>Gross Burn</strong> tells them how big your operation is.</li>
                        <li><strong>Net Burn</strong> tells them how long you can survive.</li>
                    </ul>
                </div>

                <PremiumCTA />
                <FAQ items={faqItems} />
                <InternalLinks current="/calculators/burn-rate-calculator" />
            </div>
        </div>
    );
}
