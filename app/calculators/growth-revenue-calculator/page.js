'use client';

import { useState } from 'react';
import CurrencyInput from '../../components/CurrencyInput';
import FAQ from '../../components/FAQ';
import AdPlaceholder from '../../components/AdPlaceholder';
import PremiumCTA from '../../components/PremiumCTA';
import InternalLinks from '../../components/InternalLinks';
import InsightCard from '../../components/InsightCard';
import Link from 'next/link';

const fmt = (v) => {
    if (v === null || v === undefined || isNaN(v)) return '—';
    return Number(v).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
};

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

export default function GrowthRevenueCalculator() {
    const [revenueType, setRevenueType] = useState('mrr');
    const [revenue, setRevenue] = useState('');

    // CMGR
    const [startRevenue, setStartRevenue] = useState('');
    const [endRevenue, setEndRevenue] = useState('');
    const [months, setMonths] = useState('');

    // Net New ARR
    const [newArr, setNewArr] = useState('');
    const [expansionArr, setExpansionArr] = useState('');
    const [churnArr, setChurnArr] = useState('');
    const [contractionArr, setContractionArr] = useState('');

    // ARPA
    const [arpaRevenue, setArpaRevenue] = useState('');
    const [totalCustomers, setTotalCustomers] = useState('');

    // Calculations
    const revVal = num(revenue);
    const mrr = revenueType === 'mrr' ? revVal : (revVal ? revVal / 12 : null);
    const arr = revenueType === 'arr' ? revVal : (revVal ? revVal * 12 : null);

    const startRev = num(startRevenue);
    const endRev = num(endRevenue);
    const m = num(months);
    const cmgr = startRev && endRev && m && startRev > 0 ? (Math.pow(endRev / startRev, 1 / m) - 1) * 100 : null;

    const nArr = num(newArr) || 0;
    const eArr = num(expansionArr) || 0;
    const cArr = num(churnArr) || 0;
    const conArr = num(contractionArr) || 0;
    const netNewArr = (newArr || expansionArr || churnArr || contractionArr) ? (nArr + eArr) - (cArr + conArr) : null;

    const quickRatio = (cArr + conArr) > 0 ? (nArr + eArr) / (cArr + conArr) : (nArr + eArr > 0 ? 99 : null);

    const tRev = num(arpaRevenue);
    const tCust = num(totalCustomers);
    const arpa = tRev && tCust && tCust > 0 ? tRev / tCust : null;

    const getInsight = () => {
        if (quickRatio === null) return null;

        if (quickRatio > 4) {
            return {
                type: 'good',
                verdict: 'Efficient Growth 🚀',
                text: `Your Quick Ratio of ${quickRatio.toFixed(1)} means for every ₹1 lost to churn, you add ₹${quickRatio.toFixed(1)} in new revenue. This is world-class efficiency.`,
                steps: ['Double down on sales & marketing.', 'You can afford higher CAC.']
            };
        }
        if (quickRatio >= 2) {
            return {
                type: 'good',
                verdict: 'Healthy Growth ✅',
                text: `A Quick Ratio of ${quickRatio.toFixed(1)} is good. You are growing faster than you are churning.`,
                steps: ['Focus on reducing churn to improve this ratio further.', 'Optimize upsells (Expansion ARR).']
            };
        }
        return {
            type: 'bad',
            verdict: 'High Churn Drag ⚠️',
            text: `A Quick Ratio of ${quickRatio.toFixed(1)} means churn is eating up most of your growth. You are filling a leaky bucket.`,
            steps: ['Fix retention before spending more on acquisition.', 'Investigate why customers are leaving (Exit interviews).']
        };
    };

    const insight = getInsight();

    const faqItems = [
        {
            question: 'What is a good CMGR for a seed-stage startup?',
            answer: 'Paul Graham (Y Combinator) suggests 5-7% weekly growth for very early stage. For Series A readiness in India, a CMGR (Monthly) of 15-20% is excellent, while 10% is good.'
        },
        {
            question: 'Why is Net New ARR important?',
            answer: 'It tells the "real" growth story. You might sign ₹10L in new deals, but if ₹8L churned out, your machine is broken. Net New ARR exposes the leak.'
        },
        {
            question: 'How do I calculate ARPA?',
            answer: 'Average Revenue Per Account = Total MRR / Total Active Customers. Tracking ARPA helps you see if you are successfully moving upmarket.'
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
                    <span>Growth & Revenue Calculator</span>
                </div>

                <h1>Growth & Revenue Calculator</h1>
                <p className="calc-subtitle">Track the pulse of your startup with essential SaaS metrics: ARR, CMGR, Net New ARR, and Quick Ratio.</p>

                <div className="ue-calc-layout">
                    <div className="calc-inputs" style={{ gridColumn: 'span 1' }}>
                        <h3>1. Revenue Baseline</h3>
                        <div className="input-group">
                            <label>Revenue Type</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className={`btn-toggle ${revenueType === 'mrr' ? 'active' : ''}`} onClick={() => setRevenueType('mrr')}>MRR</button>
                                <button className={`btn-toggle ${revenueType === 'arr' ? 'active' : ''}`} onClick={() => setRevenueType('arr')}>ARR</button>
                            </div>
                        </div>
                        <CurrencyInput label={`Current ${revenueType.toUpperCase()} (₹)`} value={revenue} onChange={setRevenue} placeholder="e.g. 500000" />

                        <div className="divider" style={{ margin: '30px 0' }}></div>

                        <h3>2. Growth Rate (CMGR)</h3>
                        <CurrencyInput label="Revenue at Start (₹)" value={startRevenue} onChange={setStartRevenue} />
                        <CurrencyInput label="Revenue at End (₹)" value={endRevenue} onChange={setEndRevenue} />
                        <CurrencyInput label="Months" value={months} onChange={setMonths} prefix="" />

                        <div className="divider" style={{ margin: '30px 0' }}></div>

                        <h3>3. Net New Flow (Monthly)</h3>
                        <div className="grid-2">
                            <CurrencyInput label="New Revenue (₹)" value={newArr} onChange={setNewArr} />
                            <CurrencyInput label="Expansion (₹)" value={expansionArr} onChange={setExpansionArr} />
                        </div>
                        <div className="grid-2">
                            <CurrencyInput label="Churned (₹)" value={churnArr} onChange={setChurnArr} />
                            <CurrencyInput label="Contraction (₹)" value={contractionArr} onChange={setContractionArr} />
                        </div>

                        <div className="divider" style={{ margin: '30px 0' }}></div>

                        <h3>4. ARPA</h3>
                        <div className="grid-2">
                            <CurrencyInput label="Total MRR (₹)" value={arpaRevenue} onChange={setArpaRevenue} />
                            <CurrencyInput label="Total Customers" value={totalCustomers} onChange={setTotalCustomers} prefix="" />
                        </div>
                    </div>

                    <div className="calc-results" style={{ gridColumn: 'span 1' }}>
                        <div className="ue-results-header">📊 Growth Metrics</div>
                        <div className="ue-results-grid">
                            <ResultCard label="ARR" value={fmt(arr)} />
                            <ResultCard label="MRR" value={fmt(mrr)} />
                            <ResultCard label="CMGR" value={pct(cmgr)} tooltip="Compounded Monthly Growth Rate" />
                            <ResultCard label="Net New Revenue" value={fmt(netNewArr)} status={netNewArr > 0 ? 'healthy' : 'danger'} />
                            <ResultCard label="SaaS Quick Ratio" value={quickRatio ? quickRatio.toFixed(2) : '—'} status={quickRatio > 4 ? 'healthy' : (quickRatio < 2 ? 'danger' : 'warning')} />
                            <ResultCard label="ARPA" value={fmt(arpa)} />
                        </div>
                        <InsightCard insight={insight} />
                    </div>
                </div>

                <AdPlaceholder />

                <div className="content-section">
                    <h2>Understanding the Growth Toolbox</h2>
                    <p>Metrics for tracking the speed and health of your SaaS startup.</p>
                    <h3>ARR & MRR</h3>
                    <p>The baseline of SaaS health. MRR (Monthly Recurring Revenue) is your operational heartbeat, while ARR (Annual Recurring Revenue) is your valuation driver.</p>
                    <h3>SaaS Quick Ratio</h3>
                    <p>Determines if you are growing efficiently or just churning customers. A ratio &gt; 4 is excellent (adding ₹4 for every ₹1 lost).</p>
                </div>

                <PremiumCTA />
                <FAQ items={faqItems} />
                <InternalLinks current="/calculators/growth-revenue-calculator" />
            </div>
        </div>
    );
}
