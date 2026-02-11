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

export default function PipelineVelocityCalculator() {
    // Sales Velocity Inputs
    const [leads, setLeads] = useState('');
    const [customers, setCustomers] = useState('');
    const [dealValue, setDealValue] = useState('');
    const [salesCycle, setSalesCycle] = useState('');

    // Channel Inputs
    const [ch1Name, setCh1Name] = useState('LinkedIn');
    const [ch1Spend, setCh1Spend] = useState('');
    const [ch1Cust, setCh1Cust] = useState('');

    const [ch2Name, setCh2Name] = useState('Cold Email');
    const [ch2Spend, setCh2Spend] = useState('');
    const [ch2Cust, setCh2Cust] = useState('');

    // Calculations
    const l = num(leads);
    const c = num(customers);
    const convRate = l && c && l > 0 ? (c / l) * 100 : null;

    const acv = num(dealValue);
    const cycle = num(salesCycle);

    // Velocity = (Active Leads * Deal Value * Win Rate %) / Length of Cycle (in Days)
    // Result is Revenue per Day. Multiply by 30 for Monthly Velocity.
    // Wait, standard formula: (Num Opportunities * ASP * Win Rate) / Cycle length
    // Here Leads = Opportunities? Assuming qualified leads.
    const velocity = l && acv && convRate !== null && cycle && cycle > 0
        ? (l * acv * (convRate / 100)) / (cycle / 30)
        : null;

    const cac1 = num(ch1Spend) && num(ch1Cust) ? num(ch1Spend) / num(ch1Cust) : null;
    const cac2 = num(ch2Spend) && num(ch2Cust) ? num(ch2Spend) / num(ch2Cust) : null;

    // Insight
    const getInsight = () => {
        if (velocity !== null) {
            return {
                type: 'good',
                verdict: 'Pipeline Health 📊',
                text: `Your Sales Velocity is ${fmt(velocity)} per month. This means your current pipeline will generate this much revenue every 30 days.`,
                steps: ['To increase this: Increase Leads, Win Rate, or Deal Value.', 'OR Decrease Sales Cycle (fastest way).']
            };
        }
        return null;
    };

    const insight = getInsight();

    const faqItems = [
        { question: 'What is Sales Velocity?', answer: 'It measures the speed of your revenue engine. It tells you how much revenue you can expect to close per month/day based on current pipeline metrics.' },
        { question: 'Why track CAC by Channel?', answer: 'Not all customers cost the same. LinkedIn might have a high CAC but high LTV (Enterprise). Cold email might be cheap but low conversion. Blended CAC hides these truths.' },
    ];

    return (
        <div className="calc-page">
            <div className="container">
                <div className="breadcrumb">
                    <Link href="/">Home</Link>
                    <span className="breadcrumb-sep">/</span>
                    <Link href="/#calculators">Calculators</Link>
                    <span className="breadcrumb-sep">/</span>
                    <span>Pipeline Velocity Calculator</span>
                </div>

                <h1>Pipeline Velocity Calculator</h1>
                <p className="calc-subtitle">Optimize your sales funnel. Track Conversion Rates, Sales Velocity, and Channel Efficiency.</p>

                <div className="ue-calc-layout">
                    <div className="calc-inputs" style={{ gridColumn: 'span 1' }}>
                        <h3>1. Sales Velocity</h3>
                        <div className="grid-2">
                            <CurrencyInput label="Active Leads (Pipeline)" value={leads} onChange={setLeads} prefix="" />
                            <CurrencyInput label="Won Deals (Customers)" value={customers} onChange={setCustomers} prefix="" />
                        </div>
                        <div className="grid-2">
                            <CurrencyInput label="Avg Deal Value (₹)" value={dealValue} onChange={setDealValue} />
                            <CurrencyInput label="Sales Cycle (Days)" value={salesCycle} onChange={setSalesCycle} prefix="" />
                        </div>

                        <div className="divider" style={{ margin: '30px 0' }}></div>

                        <h3>2. Channel CAC Comparison</h3>
                        <div className="grid-2">
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: '600' }}>Channel 1 Name</label>
                                <input type="text" value={ch1Name} onChange={(e) => setCh1Name(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0d1117', border: '1px solid #30363d', color: '#f0f0f0', borderRadius: '6px' }} />
                            </div>
                            <CurrencyInput label="Total Spend (₹)" value={ch1Spend} onChange={setCh1Spend} />
                        </div>
                        <CurrencyInput label="Customers Acquired" value={ch1Cust} onChange={setCh1Cust} prefix="" />

                        <div style={{ marginTop: '20px' }}></div>

                        <div className="grid-2">
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: '600' }}>Channel 2 Name</label>
                                <input type="text" value={ch2Name} onChange={(e) => setCh2Name(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0d1117', border: '1px solid #30363d', color: '#f0f0f0', borderRadius: '6px' }} />
                            </div>
                            <CurrencyInput label="Total Spend (₹)" value={ch2Spend} onChange={setCh2Spend} />
                        </div>
                        <CurrencyInput label="Customers Acquired" value={ch2Cust} onChange={setCh2Cust} prefix="" />

                    </div>

                    <div className="calc-results" style={{ gridColumn: 'span 1' }}>
                        <div className="ue-results-header">📊 Funnel Metrics</div>
                        <div className="ue-results-grid">
                            <ResultCard label="Lead-to-Win Rate" value={pct(convRate)} status={convRate > 5 ? 'healthy' : ''} />
                            <ResultCard label="Sales Velocity (Monthly)" value={fmt(velocity)} tooltip="Estimated revenue generated per month by current pipeline." />

                            <div style={{ gridColumn: 'span 2', marginTop: '20px', borderTop: '1px solid #30363d', paddingTop: '20px' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#f5a623', textTransform: 'uppercase', marginBottom: '10px' }}>Step 2: Channel Efficiency</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span>{ch1Name} CAC:</span>
                                    <span style={{ fontWeight: '700', color: cac1 && cac2 && cac1 < cac2 ? '#34d399' : '#f0f0f0' }}>{fmt(cac1)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{ch2Name} CAC:</span>
                                    <span style={{ fontWeight: '700', color: cac2 && cac1 && cac2 < cac1 ? '#34d399' : '#f0f0f0' }}>{fmt(cac2)}</span>
                                </div>
                            </div>
                        </div>
                        <InsightCard insight={insight} />
                    </div>
                </div>

                <AdPlaceholder />

                <div className="content-section">
                    <h2>Speed Kills (Competitors)</h2>
                    <p>Sales Velocity is the most under-rated metric. It combines Deal Size, Win Rate, and Cycle Time into one number.</p>
                    <h3>How to increase Sales Velocity?</h3>
                    <ol>
                        <li><strong>Increase Number of Leads</strong> (Hardest)</li>
                        <li><strong>Increase Deal Value</strong> (Medium)</li>
                        <li><strong>Increase Win Rate</strong> (Medium)</li>
                        <li><strong>Decrease Sales Cycle</strong> (Easiest & Most Impactful)</li>
                    </ol>
                    <p>Creating urgency or removing friction from the contract process can double your velocity without spending a rupee on marketing.</p>
                </div>

                <PremiumCTA />
                <FAQ items={faqItems} />
                <InternalLinks current="/calculators/pipeline-velocity-calculator" />
            </div>
        </div>
    );
}
