'use client';

import { useState } from 'react';
import CurrencyInput from '../../components/CurrencyInput';
import FAQ from '../../components/FAQ';
import AdPlaceholder from '../../components/AdPlaceholder';
import PremiumCTA from '../../components/PremiumCTA';
import InternalLinks from '../../components/InternalLinks';
import InsightCard from '../../components/InsightCard';
import Link from 'next/link';

const pct = (v) => {
    if (v === null || v === undefined || isNaN(v)) return '—';
    return Number(v).toFixed(2) + '%';
};

const num = (v) => (v === '' || v === undefined ? null : Number(v));

/* Result Card Component */
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

export default function RetentionCalculator() {
    // Inputs
    const [startMrr, setStartMrr] = useState('');
    const [churnMrr, setChurnMrr] = useState('');
    const [contractionMrr, setContractionMrr] = useState('');
    const [expansionMrr, setExpansionMrr] = useState('');

    const [startCustomers, setStartCustomers] = useState('');
    const [churnCustomers, setChurnCustomers] = useState('');

    // Calculations
    const sMrr = num(startMrr);
    const cMrr = num(churnMrr) || 0;
    const conMrr = num(contractionMrr) || 0;
    const eMrr = num(expansionMrr) || 0;

    const grr = sMrr && sMrr > 0 ? ((sMrr - cMrr - conMrr) / sMrr) * 100 : null;
    const nrr = sMrr && sMrr > 0 ? ((sMrr + eMrr - cMrr - conMrr) / sMrr) * 100 : null;

    const sCust = num(startCustomers);
    const cCust = num(churnCustomers);
    const logoChurn = sCust && cCust && sCust > 0 ? (cCust / sCust) * 100 : null;

    // Consultant Logic
    const getInsight = () => {
        if (nrr !== null) {
            if (nrr > 120) return { type: 'good', verdict: 'World-Class Retention 💎', text: `NRR of ${nrr.toFixed(1)}% is phenomenal. Your business grows automatically even without new sales. VCs pay a premium for this.`, steps: ['Focus on upselling more features.', 'Keep customer success teams happy.'] };
            if (nrr >= 100) return { type: 'good', verdict: 'Healthy Retention ✅', text: `NRR of ${nrr.toFixed(1)}% means you are keeping more value than you lose.`, steps: ['Aim for 110%+ to reach top-tier status.', 'Reduce contraction churn.'] };
            return { type: 'bad', verdict: 'Leaky Bucket ⚠️', text: `NRR of ${nrr.toFixed(1)}% (<100%) means your revenue base is shrinking. You are fighting gravity.`, steps: ['Fix the product/market fit issues.', 'Improve onboarding/support.'] };
        }
        if (logoChurn !== null) {
            if (logoChurn > 5) return { type: 'bad', verdict: 'High Churn Rate ⚠️', text: `Logo Churn of ${logoChurn.toFixed(1)}% monthly is dangerous. You lose half your customers every year.`, steps: ['Interview churned users immediately.', 'Check if you are selling to the wrong ICP.'] };
        }
        return null;
    };

    const insight = getInsight();

    const faqItems = [
        { question: 'What is the difference between GRR and NRR?', answer: 'GRR (Gross Revenue Retention) only measures retained revenue (max 100%). NRR (Net Revenue Retention) includes expansion revenue (upsells), so it can exceed 100%. NRR drives valuation.' },
        { question: 'What is a good NRR benchmark?', answer: 'For Enterprise SaaS: >120% is best-in-class, 100-110% is good. For SMB SaaS: >100% is excellent, 90% is acceptable.' },
        { question: 'Why is Logo Churn different from Revenue Churn?', answer: 'You might lose 10 small customers (High Logo Churn) but keep 1 big enterprise customer (Low Revenue Churn). Tracking both tells you WHO is leaving.' }
    ];

    return (
        <div className="calc-page">
            <div className="container">
                <div className="breadcrumb">
                    <Link href="/">Home</Link>
                    <span className="breadcrumb-sep">/</span>
                    <Link href="/#calculators">Calculators</Link>
                    <span className="breadcrumb-sep">/</span>
                    <span>Retention Calculator</span>
                </div>

                <h1>Retention Calculator</h1>
                <p className="calc-subtitle">Measure the "stickiness" of your SaaS. Track NRR, GRR, and Logo Churn.</p>

                <div className="ue-calc-layout">
                    <div className="calc-inputs" style={{ gridColumn: 'span 1' }}>
                        <h3>1. Revenue Retention (Monthly/Annual)</h3>
                        <CurrencyInput label="Starting MRR (₹)" value={startMrr} onChange={setStartMrr} />
                        <div className="grid-2">
                            <CurrencyInput label="Churned MRR (₹)" value={churnMrr} onChange={setChurnMrr} />
                            <CurrencyInput label="Contraction MRR (₹)" value={contractionMrr} onChange={setContractionMrr} />
                        </div>
                        <CurrencyInput label="Expansion MRR (₹)" value={expansionMrr} onChange={setExpansionMrr} placeholder="Upsells/Cross-sells" />

                        <div className="divider" style={{ margin: '30px 0' }}></div>

                        <h3>2. Logo Retention</h3>
                        <div className="grid-2">
                            <CurrencyInput label="Start Customers" value={startCustomers} onChange={setStartCustomers} prefix="" />
                            <CurrencyInput label="Churned Customers" value={churnCustomers} onChange={setChurnCustomers} prefix="" />
                        </div>

                    </div>

                    <div className="calc-results" style={{ gridColumn: 'span 1' }}>
                        <div className="ue-results-header">📊 Retention Scorecard</div>
                        <div className="ue-results-grid">
                            <ResultCard label="Net Revenue Retention (NRR)" value={pct(nrr)} status={nrr >= 100 ? 'healthy' : 'danger'} tooltip="(Start + Expansion - Churn - Contraction) / Start" />
                            <ResultCard label="Gross Revenue Retention (GRR)" value={pct(grr)} status={grr >= 90 ? 'healthy' : 'warning'} tooltip="Max 100%. (Start - Churn - Contraction) / Start" />
                            <ResultCard label="Logo Churn Rate" value={pct(logoChurn)} status={logoChurn < 2 ? 'healthy' : 'danger'} tooltip="% of customers lost" />
                        </div>
                        <InsightCard insight={insight} />
                    </div>
                </div>

                <AdPlaceholder />

                <div className="content-section">
                    <h2>The Single Most Important Metric: NRR</h2>
                    <p>Net Revenue Retention (NRR) is the #1 metric that determines SaaS valuations in 2024. Why?</p>
                    <ul>
                        <li><strong>NRR &gt; 100%:</strong> Your company grows even if you stop sales and marketing. This is the "flywheel" effect.</li>
                        <li><strong>NRR &lt; 100%:</strong> You are on a treadmill. You have to run (sell) fast just to stay in the same place.</li>
                    </ul>
                </div>

                <PremiumCTA />
                <FAQ items={faqItems} />
                <InternalLinks current="/calculators/retention-calculator" />
            </div>
        </div>
    );
}
